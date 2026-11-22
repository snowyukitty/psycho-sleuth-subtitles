/**
 * Minimal UnityFS and SerializedFile v22 parser/writer for hash-pinned builds.
 * 1:1 port of unity.py using pure Uint8Array / DataView / BigInt.
 */
import { decodeLzmaRaw } from './lzma-dec.js';

const textDecoder = new TextDecoder('utf-8', { fatal: true });
const textDecoderLossy = new TextDecoder('utf-8', { fatal: false });
const asciiDecoder = new TextDecoder('ascii');
const textEncoder = new TextEncoder();

export function readAlignedStr(buf, pos) {
  if (pos + 4 > buf.length) {
    throw new Error('Aligned string length out of bounds');
  }
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const length = view.getUint32(pos, true);
  pos += 4;
  if (pos + length > buf.length) {
    throw new Error('String length exceeds asset bounds');
  }
  const s = textDecoder.decode(buf.subarray(pos, pos + length));
  pos += (length + 3) & ~3;
  return [s, pos];
}

export function writeAlignedStr(s) {
  const raw = textEncoder.encode(s);
  const length = raw.length;
  const padded = (length + 3) & ~3;
  const out = new Uint8Array(4 + padded);
  new DataView(out.buffer).setUint32(0, length, true);
  out.set(raw, 4);
  return out;
}

export function lz4DecompressBlock(src, uncompressedSize) {
  if (uncompressedSize < 0) {
    throw new Error(`Negative LZ4 uncompressed size: ${uncompressedSize}`);
  }
  if (uncompressedSize === 0) {
    if (src.length > 0) {
      throw new Error(`Trailing data in empty LZ4 block: ${src.length} bytes`);
    }
    return new Uint8Array(0);
  }
  const dst = new Uint8Array(uncompressedSize);
  let dstPos = 0;
  let pos = 0;
  const srcLen = src.length;

  while (pos < srcLen) {
    if (dstPos >= uncompressedSize) {
      throw new Error(`Trailing data after LZ4 block: ${srcLen - pos} bytes`);
    }
    const token = src[pos++];
    let litLen = token >>> 4;
    if (litLen === 15) {
      while (true) {
        if (pos >= srcLen) throw new Error('Truncated LZ4 literal length');
        const b = src[pos++];
        litLen += b;
        if (b !== 255) break;
      }
    }
    if (pos + litLen > srcLen) {
      throw new Error('Truncated LZ4 literal data');
    }
    if (dstPos + litLen > uncompressedSize) {
      throw new Error(`LZ4 literal exceeds uncompressed size: ${dstPos + litLen} > ${uncompressedSize}`);
    }
    dst.set(src.subarray(pos, pos + litLen), dstPos);
    pos += litLen;
    dstPos += litLen;

    if (pos >= srcLen) break;
    if (dstPos === uncompressedSize) {
      throw new Error(`Trailing data after LZ4 block: ${srcLen - pos} bytes`);
    }
    if (pos + 2 > srcLen) {
      throw new Error('Truncated LZ4 match offset');
    }
    const offset = src[pos] | (src[pos + 1] << 8);
    pos += 2;
    if (offset === 0 || offset > dstPos) {
      throw new Error(`Invalid LZ4 match offset: ${offset} (output=${dstPos})`);
    }
    let matchLen = (token & 0x0F) + 4;
    if ((token & 0x0F) === 15) {
      while (true) {
        if (pos >= srcLen) throw new Error('Truncated LZ4 match length');
        const b = src[pos++];
        matchLen += b;
        if (b !== 255) break;
      }
    }
    if (dstPos + matchLen > uncompressedSize) {
      throw new Error(`LZ4 match overflows uncompressed size: ${dstPos + matchLen} > ${uncompressedSize}`);
    }
    let matchStart = dstPos - offset;
    for (let i = 0; i < matchLen; i++) {
      dst[dstPos++] = dst[matchStart++];
    }
  }

  if (pos !== srcLen) {
    throw new Error(`Trailing data after LZ4 block: ${srcLen - pos} bytes`);
  }
  if (dstPos !== uncompressedSize) {
    throw new Error(`LZ4 block output size mismatch: ${dstPos} != ${uncompressedSize}`);
  }
  return dst;
}

export function unpackUnityFSBytes(data) {
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let pos = 0;

  function readCStr() {
    const end = data.indexOf(0, pos);
    if (end === -1) {
      throw new Error('Unterminated UnityFS header string');
    }
    const s = textDecoderLossy.decode(data.subarray(pos, end));
    pos = end + 1;
    return s;
  }

  const sig = readCStr();
  if (sig !== 'UnityFS') {
    throw new Error('Expected UnityFS bundle');
  }
  const ver = view.getUint32(pos, false);
  pos += 4;
  const uVer = readCStr();
  const uRev = readCStr();
  const size = view.getBigInt64(pos, false);
  const cBlocksSize = view.getUint32(pos + 8, false);
  const uBlocksSize = view.getUint32(pos + 12, false);
  const flags = view.getUint32(pos + 16, false);
  pos += 20;

  if (ver >= 7) {
    pos = (pos + 15) & ~15;
  }
  const compType = flags & 0x3F;
  if (flags & 0x80) {
    throw new Error('End-of-file block metadata is unsupported');
  }
  if (pos + cBlocksSize > data.length) {
    throw new Error('Truncated UnityFS blocks_info');
  }
  const blocksInfoBytes = data.subarray(pos, pos + cBlocksSize);
  pos += cBlocksSize;

  let blocksInfo;
  if (compType === 2 || compType === 3) {
    blocksInfo = lz4DecompressBlock(blocksInfoBytes, uBlocksSize);
  } else if (compType === 0) {
    if (blocksInfoBytes.length !== uBlocksSize) {
      throw new Error(`Uncompressed blocks_info size mismatch: ${blocksInfoBytes.length} != ${uBlocksSize}`);
    }
    blocksInfo = blocksInfoBytes;
  } else {
    throw new Error(`Unsupported blocks_info compression type: ${compType}`);
  }

  const biView = new DataView(blocksInfo.buffer, blocksInfo.byteOffset, blocksInfo.byteLength);
  const dataHash = new Uint8Array(blocksInfo.subarray(0, 16));
  let bpos = 16;
  const numBlocks = biView.getUint32(bpos, false);
  bpos += 4;
  const blocks = [];
  for (let i = 0; i < numBlocks; i++) {
    const bUsize = biView.getUint32(bpos, false);
    const bCsize = biView.getUint32(bpos + 4, false);
    const bFlags = biView.getUint16(bpos + 8, false);
    bpos += 10;
    blocks.push([bUsize, bCsize, bFlags]);
  }
  const numNodes = biView.getUint32(bpos, false);
  bpos += 4;
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    const nOfs = biView.getBigInt64(bpos, false);
    const nSize = biView.getBigInt64(bpos + 8, false);
    const nFlags = biView.getUint32(bpos + 16, false);
    bpos += 20;
    const end = blocksInfo.indexOf(0, bpos);
    if (end === -1) {
      throw new Error('Unterminated UnityFS node name');
    }
    const nName = textDecoderLossy.decode(blocksInfo.subarray(bpos, end));
    bpos = end + 1;
    nodes.push([nOfs, nSize, nFlags, nName]);
  }

  if (flags & 0x200) {
    pos = (pos + 15) & ~15;
  }

  const outChunks = [];
  let totalLen = 0;
  let lzmaProps = new Uint8Array([0x5D, 0x00, 0x00, 0x08, 0x00]);
  for (const [bUsize, bCsize, bFlags] of blocks) {
    const bComp = bFlags & 0x3F;
    if (pos + bCsize > data.length) {
      throw new Error('Truncated UnityFS block chunk');
    }
    const chunk = data.subarray(pos, pos + bCsize);
    pos += bCsize;
    let decoded;
    if (bComp === 0) {
      if (chunk.length !== bUsize) {
        throw new Error(`Uncompressed block size mismatch: ${chunk.length} != ${bUsize}`);
      }
      decoded = chunk;
    } else if (bComp === 2 || bComp === 3) {
      decoded = lz4DecompressBlock(chunk, bUsize);
    } else if (bComp === 1) {
      if (chunk.length < 5) {
        throw new Error('Truncated LZMA block header');
      }
      lzmaProps = new Uint8Array(chunk.subarray(0, 5));
      decoded = decodeLzmaRaw(lzmaProps, chunk.subarray(5), bUsize);
    } else {
      throw new Error(`Unsupported block compression type: ${bComp}`);
    }
    outChunks.push(decoded);
    totalLen += decoded.length;
  }

  const cab = new Uint8Array(totalLen);
  let writeOfs = 0;
  for (const c of outChunks) {
    cab.set(c, writeOfs);
    writeOfs += c.length;
  }

  return {
    cab,
    meta: {
      sig,
      ver,
      uVer,
      uRev,
      flags,
      size,
      dataHash,
      nodes,
      lzmaProps,
    },
  };
}

export function packUnityFSUncompressed(cabBytes, meta) {
  const usize = cabBytes.length;
  const [, , nFlags, nName] = meta.nodes[0];
  const nNameBytes = textEncoder.encode(nName);

  const bi = new Uint8Array(16 + 4 + 10 + 4 + 20 + nNameBytes.length + 1);
  const biView = new DataView(bi.buffer);
  bi.set(meta.dataHash, 0);
  biView.setUint32(16, 1, false); // 1 block
  biView.setUint32(20, usize, false);
  biView.setUint32(24, usize, false);
  biView.setUint16(28, 0x00, false); // 0x00 = Uncompressed
  biView.setUint32(30, 1, false); // 1 node
  biView.setBigInt64(34, 0n, false);
  biView.setBigInt64(42, BigInt(usize), false);
  biView.setUint32(50, nFlags, false);
  bi.set(nNameBytes, 54);
  bi[54 + nNameBytes.length] = 0;

  const flags = (meta.flags & ~0x3F) >>> 0;
  const sigBytes = textEncoder.encode(meta.sig);
  const uVerBytes = textEncoder.encode(meta.uVer);
  const uRevBytes = textEncoder.encode(meta.uRev);
  const headerPrefixLen = sigBytes.length + 1 + 4 + uVerBytes.length + 1 + uRevBytes.length + 1;
  const headerEnd = headerPrefixLen + 20;
  const pad1 = meta.ver >= 7 ? (((headerEnd + 15) & ~15) - headerEnd) : 0;
  const afterBi = headerEnd + pad1 + bi.length;
  const pad2 = (flags & 0x200) ? (((afterBi + 15) & ~15) - afterBi) : 0;
  const totalSize = afterBi + pad2 + usize;

  const out = new Uint8Array(totalSize);
  const outView = new DataView(out.buffer);
  let p = 0;
  out.set(sigBytes, p);
  p += sigBytes.length + 1;
  outView.setUint32(p, meta.ver, false);
  p += 4;
  out.set(uVerBytes, p);
  p += uVerBytes.length + 1;
  out.set(uRevBytes, p);
  p += uRevBytes.length + 1;
  outView.setBigInt64(p, BigInt(totalSize), false);
  outView.setUint32(p + 8, bi.length, false);
  outView.setUint32(p + 12, bi.length, false);
  outView.setUint32(p + 16, flags, false);
  p += 20 + pad1;
  out.set(bi, p);
  p += bi.length + pad2;
  out.set(cabBytes, p);
  return out;
}

export function parseSerializedV22(buf) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const mVer = view.getUint32(8, false);
  if (mVer !== 22) {
    throw new Error(`Expected SerializedFile v22, got v${mVer}`);
  }
  const mMeta = view.getUint32(20, false);
  const mFile = Number(view.getBigUint64(24, false));
  const mData = Number(view.getBigUint64(32, false));

  let pos = 48;
  const end = buf.indexOf(0, pos);
  if (end === -1) {
    throw new Error('Unterminated Unity version in SerializedFile');
  }
  asciiDecoder.decode(buf.subarray(pos, end));
  pos = end + 1;
  pos += 4; // targetPlatform
  const enableTypeTree = buf[pos++];
  const numTypes = view.getInt32(pos, true);
  pos += 4;

  const types = [];
  for (let i = 0; i < numTypes; i++) {
    const classId = view.getInt32(pos, true);
    const isStripped = buf[pos + 4];
    const scriptTypeIdx = view.getInt16(pos + 5, true);
    pos += 7;
    if ((enableTypeTree === 0 && (classId === 114 || scriptTypeIdx >= 0 || classId < 0))
        || (enableTypeTree === 1 && classId === 114)) {
      pos += 16;
    }
    pos += 16;
    if (enableTypeTree) {
      const numNodes = view.getInt32(pos, true);
      const strBufSize = view.getInt32(pos + 4, true);
      pos += 8 + numNodes * 32 + strBufSize;
      const numDeps = view.getInt32(pos, true);
      pos += 4 + numDeps * 4;
    }
    types.push([classId, isStripped, scriptTypeIdx]);
  }

  const numObjs = view.getInt32(pos, true);
  pos += 4;
  pos = (pos + 3) & ~3;
  const objTablePos = pos;
  const objs = [];
  for (let i = 0; i < numObjs; i++) {
    const pathId = view.getBigInt64(pos, true);
    const byteStart = Number(view.getBigUint64(pos + 8, true));
    const byteSize = view.getUint32(pos + 16, true);
    const typeId = view.getUint32(pos + 20, true);
    pos += 24;
    objs.push({
      index: i,
      pathId,
      byteStart,
      byteSize,
      typeId,
      classId: types[typeId][0],
    });
  }
  return { mMeta, mFile, mData, objTablePos, objs };
}

export function findMonoBehaviourByName(buf, info, targetName) {
  const mData = info.mData;
  const targetBytes = writeAlignedStr(targetName);
  for (const o of info.objs) {
    if (o.classId === 114 && o.byteSize >= 28 + targetBytes.length) {
      const absStart = mData + o.byteStart;
      let match = true;
      for (let j = 0; j < targetBytes.length; j++) {
        if (buf[absStart + 28 + j] !== targetBytes[j]) {
          match = false;
          break;
        }
      }
      if (match) return o;
    }
  }
  throw new Error(`MonoBehaviour '${targetName}' not found in SerializedFile`);
}

export function replaceSerializedObjects(buf, replacements) {
  const info = parseSerializedV22(buf);
  const mData = info.mData;
  const objs = info.objs;
  const objTablePos = info.objTablePos;

  const sortedObjs = [...objs].sort((a, b) => a.byteStart - b.byteStart);
  const dataLen = buf.length - mData;

  const headerBuf = new Uint8Array(buf.subarray(0, mData));
  const chunks = [headerBuf];
  let totalOutLen = headerBuf.length;
  let curDataOfs = 0;
  let cumulativeDelta = 0;
  const newStarts = new Map();
  const newSizes = new Map();

  for (let idx = 0; idx < sortedObjs.length; idx++) {
    const o = sortedObjs[idx];
    const pid = o.pathId;
    const bStart = o.byteStart;
    const bSize = o.byteSize;
    const nextStart = idx + 1 < sortedObjs.length ? sortedObjs[idx + 1].byteStart : dataLen;

    newStarts.set(pid, bStart + cumulativeDelta);
    if (!replacements.has(pid)) {
      newSizes.set(pid, bSize);
      continue;
    }

    if (bStart > curDataOfs) {
      const slice = buf.subarray(mData + curDataOfs, mData + bStart);
      chunks.push(slice);
      totalOutLen += slice.length;
    }

    const newPayload = replacements.get(pid);
    const newSize = newPayload.length;
    newSizes.set(pid, newSize);

    const origSpan = nextStart - bStart;
    let padLen = 0;
    if (idx + 1 < sortedObjs.length) {
      padLen = (((origSpan - newSize) % 16) + 16) % 16;
    }

    const newSpan = newSize + padLen;
    chunks.push(newPayload);
    totalOutLen += newPayload.length;
    if (padLen > 0) {
      chunks.push(new Uint8Array(padLen));
      totalOutLen += padLen;
    }

    cumulativeDelta += newSpan - origSpan;
    curDataOfs = nextStart;
  }

  if (curDataOfs < dataLen) {
    const tail = buf.subarray(mData + curDataOfs);
    chunks.push(tail);
    totalOutLen += tail.length;
  }

  const headerView = new DataView(headerBuf.buffer, headerBuf.byteOffset, headerBuf.byteLength);
  for (const o of objs) {
    const pid = o.pathId;
    const entryPos = objTablePos + o.index * 24;
    headerView.setBigInt64(entryPos, pid, true);
    headerView.setBigUint64(entryPos + 8, BigInt(newStarts.get(pid)), true);
    headerView.setUint32(entryPos + 16, newSizes.get(pid), true);
    headerView.setUint32(entryPos + 20, o.typeId, true);
  }

  headerView.setBigUint64(24, BigInt(totalOutLen), false);

  const out = new Uint8Array(totalOutLen);
  let outPos = 0;
  for (const c of chunks) {
    out.set(c, outPos);
    outPos += c.length;
  }
  return out;
}
