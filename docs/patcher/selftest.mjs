/**
 * Zero-asset Node.js self-test for the Browser Web Patcher modules.
 * Runs locally and in CI (docs-verify.yml) without any copyrighted game assets.
 */
import assert from 'node:assert/strict';
import { isEastAsianWide } from './eaw-table.js';
import { decodeLzmaRaw } from './lzma-dec.js';
import {
  readAlignedStr,
  writeAlignedStr,
  lz4DecompressBlock,
  unpackUnityFSBytes,
  packUnityFSUncompressed,
  parseSerializedV22,
  replaceSerializedObjects,
} from './unityfs.js';
import { BUILDS, PAIRS, canonicalPair, LANGUAGES } from './builds.js';
import {
  pyRound,
  balance,
  secondary,
  compose,
  height,
  parseSrt,
  mergeSrt,
  patchCatalog,
  patchLevel0,
} from './subtitles-core.js';
import {
  resolveGameDataDir,
  inspectDirectory,
  applyPair,
  restoreOriginal,
} from './fs-installer.js';

// 1. East Asian Width parity
assert.equal(isEastAsianWide('A'.codePointAt(0)), false);
assert.equal(isEastAsianWide('偵'.codePointAt(0)), true);
assert.equal(isEastAsianWide('あ'.codePointAt(0)), true);
assert.equal(isEastAsianWide('　'.codePointAt(0)), true);
assert.equal(isEastAsianWide('「'.codePointAt(0)), true);

// 2. pyRound banker's rounding
assert.equal(pyRound(22.5), 22);
assert.equal(pyRound(23.5), 24);
assert.equal(pyRound(19.6), 20);

// 3. Language pairs matrix
assert.equal(Object.keys(PAIRS).length, 12);
assert.equal(canonicalPair('zh-en'), 'zh-Hant-en');
assert.equal(canonicalPair('zh-ja'), 'zh-Hant-ja');
assert.throws(() => canonicalPair('ja-ja'), /two different/i);

// 4. Text composition & SRT merging
assert.equal(balance('<color=#FFF>Hi'), '<color=#FFF>Hi</color>');
assert.equal(secondary('<size=0>ruby</size><b>Note</b>'), '<b>Note</b>');
const dual = compose('Inspect the ledger.', '調査事件簿。', '');
assert.equal(dual, 'Inspect the ledger.\n<speed=0><size=28><color=#B8D8F0>調査事件簿。</color></size></speed>');
assert.ok(height('Test line', 32, 1120) > 40);

const srtA = parseSrt('\ufeff1\r\n00:00:01,000 --> 00:00:03,000\r\nHello\r\n');
const srtB = parseSrt('1\n00:00:02,000 --> 00:00:04,000\n世界\n');
const merged = mergeSrt(srtA, srtB);
assert.equal(merged.length, 3);
assert.equal(merged[0][0], 1000);
assert.equal(merged[0][1], 2000);
assert.equal(merged[0][2], 'Hello');
assert.equal(merged[1][0], 2000);
assert.equal(merged[1][1], 3000);
assert.ok(merged[1][2].includes('Hello') && merged[1][2].includes('世界'));

// 5. LZ4 literal + match decompression & fail-closed checks
// Token 0x50 => 5 literal bytes 'Hello', then match offset=5, len=4+0=4? No: token 0x50 + 'Hello' + offset(5) + len=0 -> 'HelloHell'
const lz4Sample = new Uint8Array([0x50, 72, 101, 108, 108, 111, 5, 0]);
const lz4Out = lz4DecompressBlock(lz4Sample, 9);
assert.equal(new TextDecoder().decode(lz4Out), 'HelloHell');
assert.throws(() => lz4DecompressBlock(lz4Sample, 8), /overflow|trailing/i);

// 6. Real raw LZMA1 vector (compressed with Python lzma FORMAT_RAW, lc=3 lp=0 pb=2):
// Payload is 78-byte string 'PsychoSleuth-LZMA1-Test!\n\n' * 3
const lzmaProps = new Uint8Array([0x5D, 0x00, 0x00, 0x08, 0x00]);
const lzmaRaw = Uint8Array.from(atob('ACgcyyZFKuOp+K7GOtJjCMDnBnP2NGs4jVdR5Y7458Rg1///6TKAAA=='), (c) => c.charCodeAt(0));
const lzmaDecoded = decodeLzmaRaw(lzmaProps, lzmaRaw, 78);
assert.equal(new TextDecoder().decode(lzmaDecoded), 'PsychoSleuth-LZMA1-Test!\n\n'.repeat(3));
assert.throws(() => decodeLzmaRaw(lzmaProps, lzmaRaw.subarray(0, 10), 78), /Truncated/i);

// 7. Aligned strings & UnityFS round-trip
const sBytes = writeAlignedStr('Detective');
assert.equal(sBytes.length, 16); // 4 len + 9 + 3 pad
const [sVal, sEnd] = readAlignedStr(sBytes, 0);
assert.equal(sVal, 'Detective');
assert.equal(sEnd, 16);

const fakeCab = new Uint8Array(64);
for (let i = 0; i < fakeCab.length; i++) fakeCab[i] = i & 0xFF;
const meta = {
  sig: 'UnityFS',
  ver: 8,
  uVer: '5.x.x',
  uRev: '6000.1.17f1',
  flags: 0x243,
  dataHash: new Uint8Array(16),
  nodes: [[0n, BigInt(fakeCab.length), 4, 'CAB-selftest']],
  lzmaProps,
};
const bundle = packUnityFSUncompressed(fakeCab, meta);
const unpacked = unpackUnityFSBytes(bundle);
assert.deepEqual(unpacked.cab, fakeCab);
assert.equal(unpacked.meta.nodes[0][3], 'CAB-selftest');

// 8. Catalog & level0 prechecks (fail-closed)
const build = BUILDS[0];
const needle = new TextEncoder().encode(build.catalogNeedle);
const fakeCat = new Uint8Array(128);
fakeCat.set(needle, 16);
new DataView(fakeCat.buffer).setUint32(16 + 44, build.files[build.videosPath].size, true);
const patchedCat = patchCatalog(fakeCat, 222222, build);
assert.equal(new DataView(patchedCat.buffer).getUint32(16 + 44, true), 222222);

new DataView(fakeCat.buffer).setUint32(16 + 44, 999, true);
assert.throws(() => patchCatalog(fakeCat, 222222, build), /Unexpected original video bundle size/);

// 9. SerializedFile v22 & patchLevel0 check
function buildMinimalLevel0(pathId, charLimit) {
  const verStr = new TextEncoder().encode('6000.1.17f1\0');
  const headerPre = 48 + verStr.length + 5 + 4 + 23 + 4; // 1 type (classId=114), numObjs=1
  const alignedTable = (headerPre + 3) & ~3;
  const objTableSize = 24;
  const mData = (alignedTable + objTableSize + 15) & ~15;
  const objSize = 80;
  const buf = new Uint8Array(mData + objSize);
  const v = new DataView(buf.buffer);
  v.setUint32(8, 22, false);
  v.setUint32(20, 48, false);
  v.setBigUint64(24, BigInt(buf.length), false);
  v.setBigUint64(32, BigInt(mData), false);
  buf.set(verStr, 48);
  let p = 48 + verStr.length + 5;
  v.setInt32(p, 1, true); p += 4;
  v.setInt32(p, 114, true); p += 7 + 16; // enableTypeTree=0, classId=114, no script hash if no... wait script hash + type hash!
  // Let's actually place type accurately via helper below
  void alignedTable;
}
void buildMinimalLevel0;

function makeSerializedWithTwoObjs() {
  const ver = new TextEncoder().encode('6000.1.17f1\0');
  // 1 type: classId=114 (+39 bytes when enableTypeTree=0)
  const metaPos = 48;
  const afterVer = metaPos + ver.length;
  const afterPlatform = afterVer + 5;
  const afterTypeCount = afterPlatform + 4;
  const afterType = afterTypeCount + 7 + 32; // 16 + 16 hashes
  const afterObjCount = afterType + 4;
  const objTablePos = (afterObjCount + 3) & ~3;
  const mData = (objTablePos + 2 * 24 + 15) & ~15;
  const obj1Size = 80;
  const obj2Size = 32;
  const total = mData + obj1Size + obj2Size;
  const buf = new Uint8Array(total);
  const v = new DataView(buf.buffer);
  v.setUint32(8, 22, false);
  v.setUint32(20, 48, false);
  v.setBigUint64(24, BigInt(total), false);
  v.setBigUint64(32, BigInt(mData), false);
  buf.set(ver, metaPos);
  v.setInt32(afterPlatform, 1, true);
  v.setInt32(afterTypeCount, 114, true);
  v.setInt32(afterType, 2, true);
  v.setBigInt64(objTablePos, build.level0PathId, true);
  v.setBigUint64(objTablePos + 8, 0n, true);
  v.setUint32(objTablePos + 16, obj1Size, true);
  v.setUint32(objTablePos + 20, 0, true);
  v.setBigInt64(objTablePos + 24, 99999n, true);
  v.setBigUint64(objTablePos + 32, BigInt(obj1Size), true);
  v.setUint32(objTablePos + 40, obj2Size, true);
  v.setUint32(objTablePos + 44, 0, true);
  v.setInt32(mData + 72, 256, true);
  v.setUint32(mData + obj1Size, 0xCAFEBABE, true);
  return buf;
}

const minLvl = makeSerializedWithTwoObjs();
const parsedLvl = parseSerializedV22(minLvl);
assert.equal(parsedLvl.objs.length, 2);
const patchedLvl = patchLevel0(minLvl, build);
assert.equal(new DataView(patchedLvl.buffer).getInt32(parsedLvl.mData + 72, true), -1);
assert.throws(() => patchLevel0(patchedLvl, build), /Unexpected subtitle character limit/);

const replaced = replaceSerializedObjects(minLvl, new Map([[build.level0PathId, new Uint8Array(84)]]));
const parsedRep = parseSerializedV22(replaced);
assert.equal(parsedRep.objs[1].byteStart % 16, 0);
assert.equal(new DataView(replaced.buffer).getUint32(parsedRep.mData + parsedRep.objs[1].byteStart, true), 0xCAFEBABE);

// 10. In-memory FileSystemHandle structural contract check (resolveGameDataDir + unsupported refusal)
class MemFileHandle {
  constructor(name, map, key) { this.kind = 'file'; this.name = name; this.map = map; this.key = key; }
  async getFile() {
    const bytes = this.map.get(this.key);
    if (!bytes) { const e = new Error('Missing'); e.name = 'NotFoundError'; throw e; }
    return { async arrayBuffer() { return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength); } };
  }
  async createWritable() {
    let buf = new Uint8Array(0);
    return {
      write: async (data) => { buf = new Uint8Array(data); },
      close: async () => { this.map.set(this.key, buf); },
      abort: async () => {},
    };
  }
}
class MemDirHandle {
  constructor(name, rootMap, prefix = '') {
    this.kind = 'directory'; this.name = name; this.rootMap = rootMap; this.prefix = prefix;
  }
  async getDirectoryHandle(name, { create = false } = {}) {
    const sub = this.prefix ? `${this.prefix}/${name}` : name;
    const exists = Array.from(this.rootMap.keys()).some((k) => k === sub || k.startsWith(`${sub}/`));
    if (!exists && !create) { const e = new Error('Missing dir'); e.name = 'NotFoundError'; throw e; }
    if (create && !exists) this.rootMap.set(`${sub}/.dir`, new Uint8Array(0));
    return new MemDirHandle(name, this.rootMap, sub);
  }
  async getFileHandle(name, { create = false } = {}) {
    const key = this.prefix ? `${this.prefix}/${name}` : name;
    if (!this.rootMap.has(key) && !create) { const e = new Error('Missing file'); e.name = 'NotFoundError'; throw e; }
    return new MemFileHandle(name, this.rootMap, key);
  }
  async removeEntry(name) {
    const key = this.prefix ? `${this.prefix}/${name}` : name;
    this.rootMap.delete(key);
  }
}

const mem = new Map([
  ['Psycho Sleuth_Data/sharedassets0.assets', new Uint8Array(8)],
  ['Psycho Sleuth_Data/globalgamemanagers', new Uint8Array(8)],
]);
const rootMem = new MemDirHandle('Psycho-Sleuth', mem);
const resDir = await resolveGameDataDir(rootMem);
assert.equal(resDir.hasParentRoot, true);
const insp = await inspectDirectory(rootMem);
assert.equal(insp.status, 'unsupported');
await assert.rejects(() => applyPair(insp, 'ja-zh-Hant'), /unsupported/i);
await assert.rejects(() => restoreOriginal(insp), /unsupported/i);

console.log(`PASS: web-patcher selftest (${Object.keys(LANGUAGES).length} langs, 12 pairs, LZ4, UnityFS, SerializedFile v22, FS fail-closed)`);
