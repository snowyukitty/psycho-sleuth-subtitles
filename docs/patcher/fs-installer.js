/**
 * Browser File System Access API installer interoperable with Install.cmd / Restore.cmd.
 * Uses the exact `.psycho-sleuth-subtitles/` directory layout, `original/`, `transaction.json`,
 * and redundant `installed.json` / `installed.json.bak` receipts.
 */
import {
  BUILDS,
  PAIRS,
  canonicalPair,
  buildTargets,
} from './builds.js';
import { patchAllAssets, sha256Hex } from './subtitles-core.js';

export const STATE_DIR = '.psycho-sleuth-subtitles';
export const VERSION = '0.2.0-preview.2';

function splitRel(rel) {
  const parts = rel.split('/').filter(Boolean);
  if (!parts.length || parts.some((p) => p === '.' || p === '..' || p.includes('\\') || p.includes(':'))) {
    throw new Error(`Unsafe relative path: ${rel}`);
  }
  return parts;
}

async function getFileHandleAt(dirHandle, rel, create = false) {
  const parts = splitRel(rel);
  let cur = dirHandle;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = await cur.getDirectoryHandle(parts[i], { create });
  }
  return await cur.getFileHandle(parts[parts.length - 1], { create });
}

async function tryGetDir(dirHandle, name) {
  try {
    return await dirHandle.getDirectoryHandle(name, { create: false });
  } catch (err) {
    if (err && err.name === 'NotFoundError') return null;
    throw err;
  }
}

async function readBytes(dirHandle, rel) {
  const fh = await getFileHandleAt(dirHandle, rel, false);
  const file = await fh.getFile();
  return new Uint8Array(await file.arrayBuffer());
}

async function tryReadBytes(dirHandle, rel) {
  try {
    return await readBytes(dirHandle, rel);
  } catch (err) {
    if (err && err.name === 'NotFoundError') return null;
    throw err;
  }
}

async function tryReadJson(dirHandle, rel) {
  const bytes = await tryReadBytes(dirHandle, rel);
  if (!bytes) return null;
  try {
    const obj = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    return (obj && typeof obj === 'object' && !Array.isArray(obj)) ? obj : null;
  } catch {
    return null;
  }
}

async function writeBytes(dirHandle, rel, bytes) {
  const fh = await getFileHandleAt(dirHandle, rel, true);
  const writable = await fh.createWritable();
  try {
    await writable.write(bytes);
    await writable.close();
  } catch (err) {
    try {
      await writable.abort();
    } catch {
      // ignore abort failure
    }
    throw err;
  }
}

async function writeJson(dirHandle, rel, value) {
  const encoded = new TextEncoder().encode(`${JSON.stringify(value, null, 2)}\n`);
  await writeBytes(dirHandle, rel, encoded);
}

async function tryRemoveEntry(dirHandle, name) {
  try {
    await dirHandle.removeEntry(name);
  } catch (err) {
    if (!err || err.name !== 'NotFoundError') throw err;
  }
}

function mapsEqual(a, b) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => a[k] === b[k]);
}

function isValidReceipt(data, targets, expectedMap) {
  if (!data || !data.hashes || typeof data.hashes !== 'object' || Array.isArray(data.hashes)) {
    return false;
  }
  const rh = data.hashes;
  const rKeys = Object.keys(rh);
  if (rKeys.length !== targets.length || !targets.every((k) => typeof rh[k] === 'string')) {
    return false;
  }
  const pair = data.pair;
  if (mapsEqual(rh, expectedMap)) {
    return pair === 'clean';
  }
  if (typeof pair !== 'string' || !pair) return false;
  try {
    return canonicalPair(pair) in PAIRS;
  } catch {
    return false;
  }
}

export async function resolveGameDataDir(pickedHandle) {
  const sub = await tryGetDir(pickedHandle, 'Psycho Sleuth_Data');
  if (sub) {
    const shared = await tryReadBytes(sub, 'sharedassets0.assets');
    if (shared !== null) {
      return { rootHandle: pickedHandle, dataHandle: sub, hasParentRoot: true };
    }
  }
  const directShared = await tryReadBytes(pickedHandle, 'sharedassets0.assets');
  if (directShared !== null) {
    return { rootHandle: null, dataHandle: pickedHandle, hasParentRoot: false };
  }
  const err = new Error('Selected folder is not Psycho-Sleuth or Psycho Sleuth_Data.');
  err.code = 'NOT_GAME_FOLDER';
  throw err;
}

async function hashTargets(dataHandle, targets) {
  const result = {};
  for (const rel of targets) {
    const bytes = await readBytes(dataHandle, rel);
    result[rel] = await sha256Hex(bytes);
  }
  return result;
}

async function verifyBackups(stateHandle, expectedMap) {
  const origDir = await tryGetDir(stateHandle, 'original');
  if (!origDir) return false;
  for (const [rel, expectedSha] of Object.entries(expectedMap)) {
    const bytes = await tryReadBytes(origDir, rel);
    if (!bytes) return false;
    if ((await sha256Hex(bytes)) !== expectedSha) return false;
  }
  return true;
}

async function verifyRuntimeForBuild(dataHandle, rootHandle, hasParentRoot, build) {
  const verified = [];
  const skipped = [];
  for (const [rel, expectedSha] of Object.entries(build.runtimeChecks)) {
    if (rel.startsWith('../')) {
      if (!hasParentRoot || !rootHandle) {
        skipped.push(rel.slice(3));
        continue;
      }
      const bytes = await tryReadBytes(rootHandle, rel.slice(3));
      if (!bytes || (await sha256Hex(bytes)) !== expectedSha) {
        return { matched: false, verified, skipped };
      }
      verified.push(rel);
    } else {
      const bytes = await tryReadBytes(dataHandle, rel);
      if (!bytes || (await sha256Hex(bytes)) !== expectedSha) {
        return { matched: false, verified, skipped };
      }
      verified.push(rel);
    }
  }
  return { matched: verified.length > 0, verified, skipped };
}

export async function inspectDirectory(pickedHandle, onProgress = () => {}) {
  onProgress('Scanning selected folder...', 0.1);
  const resolved = await resolveGameDataDir(pickedHandle);
  const { rootHandle, dataHandle, hasParentRoot } = resolved;

  let matchedBuild = null;
  let runtimeSummary = null;
  onProgress('Checking game build signatures...', 0.25);
  for (const build of BUILDS) {
    const rt = await verifyRuntimeForBuild(dataHandle, rootHandle, hasParentRoot, build);
    if (rt.matched) {
      matchedBuild = build;
      runtimeSummary = rt;
      break;
    }
  }

  if (!matchedBuild) {
    return {
      ...resolved,
      status: 'unsupported',
      build: null,
      currentPair: null,
      backupValid: false,
      runtimeSummary,
      reasonCode: 'UNSUPPORTED_BUILD',
    };
  }

  const targets = buildTargets(matchedBuild);
  const expectedMap = Object.fromEntries(targets.map((rel) => [rel, matchedBuild.files[rel].sha256]));
  const stateHandle = await tryGetDir(dataHandle, STATE_DIR);
  const backupValid = stateHandle ? await verifyBackups(stateHandle, expectedMap) : false;

  onProgress('Hashing target game assets...', 0.55);
  let currentHashes;
  try {
    currentHashes = await hashTargets(dataHandle, targets);
  } catch (err) {
    return {
      ...resolved,
      status: 'unsupported',
      build: matchedBuild,
      currentPair: null,
      backupValid,
      runtimeSummary,
      reasonCode: 'MISSING_TARGET_FILE',
      error: err,
    };
  }

  const transaction = stateHandle ? await tryReadJson(stateHandle, 'transaction.json') : null;
  if (transaction) {
    return {
      ...resolved,
      status: 'interrupted',
      build: matchedBuild,
      expectedMap,
      currentHashes,
      currentPair: null,
      backupValid,
      runtimeSummary,
      reasonCode: 'INTERRUPTED_JOURNAL',
    };
  }

  if (mapsEqual(currentHashes, expectedMap)) {
    return {
      ...resolved,
      status: 'clean',
      build: matchedBuild,
      expectedMap,
      currentHashes,
      currentPair: null,
      backupValid,
      runtimeSummary,
    };
  }

  if (stateHandle) {
    const receipt = await tryReadJson(stateHandle, 'installed.json');
    if (isValidReceipt(receipt, targets, expectedMap) && mapsEqual(currentHashes, receipt.hashes)) {
      return {
        ...resolved,
        status: 'installed',
        build: matchedBuild,
        expectedMap,
        currentHashes,
        currentPair: receipt.pair,
        backupValid,
        runtimeSummary,
      };
    }
    const backupReceipt = await tryReadJson(stateHandle, 'installed.json.bak');
    if (isValidReceipt(backupReceipt, targets, expectedMap) && mapsEqual(currentHashes, backupReceipt.hashes)) {
      return {
        ...resolved,
        status: 'installed',
        build: matchedBuild,
        expectedMap,
        currentHashes,
        currentPair: backupReceipt.pair,
        backupValid,
        runtimeSummary,
      };
    }
  }

  return {
    ...resolved,
    status: 'unsupported',
    build: matchedBuild,
    expectedMap,
    currentHashes,
    currentPair: null,
    backupValid,
    runtimeSummary,
    reasonCode: 'MODIFIED_OR_UNKNOWN_ASSETS',
  };
}

export async function applyPair(inspection, pair, onProgress = () => {}) {
  pair = canonicalPair(pair);
  const { dataHandle, build, expectedMap } = inspection;
  if (!build || !expectedMap) {
    throw new Error('Unsupported or modified game installation.');
  }
  if (inspection.status === 'unsupported') {
    throw new Error('Modified or unsupported game assets detected. Verify integrity in Steam first.');
  }
  if (inspection.status !== 'clean' && !inspection.backupValid) {
    throw new Error('Original backups are missing or damaged. Verify integrity in Steam first.');
  }

  // Re-verify runtime checks right before modifying files.
  const rt = await verifyRuntimeForBuild(dataHandle, inspection.rootHandle, inspection.hasParentRoot, build);
  if (!rt.matched) {
    throw new Error('Runtime files changed (possible Steam update). No game files modified.');
  }

  const targets = buildTargets(build);
  const stateHandle = await dataHandle.getDirectoryHandle(STATE_DIR, { create: true });
  const origHandle = await stateHandle.getDirectoryHandle('original', { create: true });

  onProgress('Verifying and saving clean backups...', 0.12);
  const originalsByRel = {};
  for (const rel of targets) {
    let bytes = await tryReadBytes(origHandle, rel);
    const expectedSha = expectedMap[rel];
    if (!bytes || (await sha256Hex(bytes)) !== expectedSha) {
      if (inspection.status !== 'clean') {
        throw new Error(`Original backup missing or corrupt for ${rel}; aborted safely.`);
      }
      bytes = await readBytes(dataHandle, rel);
      if ((await sha256Hex(bytes)) !== expectedSha) {
        throw new Error(`Game file ${rel} does not match expected Steam hash.`);
      }
      await writeBytes(origHandle, rel, bytes);
      const verifyBackup = await readBytes(origHandle, rel);
      if ((await sha256Hex(verifyBackup)) !== expectedSha) {
        throw new Error(`Backup verification failed for ${rel}.`);
      }
    }
    originalsByRel[rel] = bytes;
  }

  const beforeHashes = await hashTargets(dataHandle, targets);

  onProgress('Building dual-subtitle assets locally...', 0.25);
  const { outputs, hashes: afterHashes, report } = await patchAllAssets(
    originalsByRel,
    pair,
    build,
    (_stage, frac) => onProgress('Building dual-subtitle assets locally...', 0.25 + frac * 0.45),
  );

  onProgress('Recording recovery journal...', 0.72);
  await writeJson(stateHandle, 'transaction.json', {
    version: VERSION,
    before: beforeHashes,
    after: afterHashes,
  });

  onProgress('Writing patched game files...', 0.76);
  for (let i = 0; i < targets.length; i++) {
    const rel = targets[i];
    await writeBytes(dataHandle, rel, outputs[rel]);
    const checkHash = await sha256Hex(await readBytes(dataHandle, rel));
    if (checkHash !== afterHashes[rel]) {
      throw new Error(`Post-write verification mismatch on ${rel}; run Restore to recover.`);
    }
    onProgress(`Verified ${rel}`, 0.76 + ((i + 1) / targets.length) * 0.18);
  }

  onProgress('Writing install receipts...', 0.96);
  const receipt = {
    version: VERSION,
    pair,
    hashes: afterHashes,
    report,
    build_id: build.id,
    source: 'web-patcher',
  };
  await writeJson(stateHandle, 'installed.json', receipt);
  await writeJson(stateHandle, 'installed.json.bak', receipt);
  await tryRemoveEntry(stateHandle, 'transaction.json');

  onProgress('Complete', 1.0);
  return { pair, buildId: build.id, hashes: afterHashes, report };
}

export async function restoreOriginal(inspection, onProgress = () => {}) {
  const { dataHandle, build, expectedMap } = inspection;
  if (!build || !expectedMap) {
    throw new Error('Cannot restore an unsupported build.');
  }
  const targets = buildTargets(build);
  const currentHashes = await hashTargets(dataHandle, targets);
  if (mapsEqual(currentHashes, expectedMap)) {
    const stateHandle = await tryGetDir(dataHandle, STATE_DIR);
    if (stateHandle) {
      await writeJson(stateHandle, 'installed.json', { version: VERSION, pair: 'clean', hashes: expectedMap });
      await writeJson(stateHandle, 'installed.json.bak', { version: VERSION, pair: 'clean', hashes: expectedMap });
      await tryRemoveEntry(stateHandle, 'transaction.json');
    }
    onProgress('Already clean', 1.0);
    return { restored: true, changed: false };
  }

  const stateHandle = await tryGetDir(dataHandle, STATE_DIR);
  if (!stateHandle || !(await verifyBackups(stateHandle, expectedMap))) {
    throw new Error('Verified original backups were not found. Run Steam -> Verify integrity of game files.');
  }
  const origHandle = await stateHandle.getDirectoryHandle('original', { create: false });

  onProgress('Recording recovery journal...', 0.15);
  await writeJson(stateHandle, 'transaction.json', {
    version: VERSION,
    before: currentHashes,
    after: expectedMap,
  });

  onProgress('Restoring verified original files...', 0.25);
  for (let i = 0; i < targets.length; i++) {
    const rel = targets[i];
    const origBytes = await readBytes(origHandle, rel);
    if ((await sha256Hex(origBytes)) !== expectedMap[rel]) {
      throw new Error(`Original backup hash mismatch on ${rel}; aborted.`);
    }
    await writeBytes(dataHandle, rel, origBytes);
    const writtenHash = await sha256Hex(await readBytes(dataHandle, rel));
    if (writtenHash !== expectedMap[rel]) {
      throw new Error(`Post-restore verification mismatch on ${rel}.`);
    }
    onProgress(`Restored ${rel}`, 0.25 + ((i + 1) / targets.length) * 0.65);
  }

  onProgress('Finalizing clean receipt...', 0.94);
  const cleanReceipt = { version: VERSION, pair: 'clean', hashes: expectedMap };
  await writeJson(stateHandle, 'installed.json', cleanReceipt);
  await writeJson(stateHandle, 'installed.json.bak', cleanReceipt);
  await tryRemoveEntry(stateHandle, 'transaction.json');

  onProgress('Restored cleanly', 1.0);
  return { restored: true, changed: true };
}
