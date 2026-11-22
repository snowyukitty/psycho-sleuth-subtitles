/**
 * Pure-JavaScript raw LZMA1 decoder (RFC-compatible with Python lzma FORMAT_RAW).
 * Used to decompress UnityFS data blocks (comp_type = 1) strictly locally.
 */

const K_NUM_STATES = 12;
const K_NUM_POS_STATES_MAX = 16;
const K_ALIGN_SIZE = 16;
const K_BIT_MODEL_TOTAL_BITS = 11;
const K_BIT_MODEL_TOTAL = 1 << K_BIT_MODEL_TOTAL_BITS; // 2048
const K_HALF_PROB = K_BIT_MODEL_TOTAL >>> 1; // 1024
const K_NUM_MOVE_BITS = 5;
const K_TOP_VALUE = 0x01000000;
const K_LEN_LOW_SIZE = 8;
const K_LEN_MID_SIZE = 8;
const K_LEN_HIGH_SIZE = 256;

function initProbs(len) {
  const arr = new Uint16Array(len);
  arr.fill(K_HALF_PROB);
  return arr;
}

class LenDecoder {
  constructor() {
    this.choice = initProbs(2);
    this.low = initProbs(K_NUM_POS_STATES_MAX * K_LEN_LOW_SIZE);
    this.mid = initProbs(K_NUM_POS_STATES_MAX * K_LEN_MID_SIZE);
    this.high = initProbs(K_LEN_HIGH_SIZE);
  }

  decode(rc, posState) {
    if (rc.bit(this.choice, 0) === 0) {
      return rc.bitTree(this.low, posState << 3, 3);
    }
    if (rc.bit(this.choice, 1) === 0) {
      return 8 + rc.bitTree(this.mid, posState << 3, 3);
    }
    return 16 + rc.bitTree(this.high, 0, 8);
  }
}

class RangeDecoder {
  constructor(src) {
    if (src.length < 5) {
      throw new Error('Truncated LZMA range stream header');
    }
    if (src[0] !== 0) {
      throw new Error('Invalid LZMA range stream leading byte');
    }
    this.src = src;
    this.pos = 5;
    this.range = 0xFFFFFFFF;
    this.code = (((src[1] << 24) | (src[2] << 16) | (src[3] << 8) | src[4]) >>> 0);
  }

  normalize() {
    if (this.range < K_TOP_VALUE) {
      if (this.pos >= this.src.length) {
        throw new Error('Truncated LZMA compressed block');
      }
      this.range = (this.range * 256);
      this.code = (((this.code << 8) | this.src[this.pos++]) >>> 0);
    }
  }

  bit(probs, idx) {
    const prob = probs[idx];
    const bound = Math.floor(this.range / K_BIT_MODEL_TOTAL) * prob;
    if (this.code < bound) {
      this.range = bound;
      probs[idx] = prob + ((K_BIT_MODEL_TOTAL - prob) >>> K_NUM_MOVE_BITS);
      this.normalize();
      return 0;
    }
    this.range -= bound;
    this.code = (this.code - bound) >>> 0;
    probs[idx] = prob - (prob >>> K_NUM_MOVE_BITS);
    this.normalize();
    return 1;
  }

  directBits(count) {
    let res = 0;
    for (let i = 0; i < count; i++) {
      this.range = Math.floor(this.range / 2);
      res = (res * 2);
      if (this.code >= this.range) {
        this.code = (this.code - this.range) >>> 0;
        res += 1;
      }
      this.normalize();
    }
    return res;
  }

  bitTree(probs, offset, numBits) {
    let m = 1;
    for (let i = 0; i < numBits; i++) {
      m = (m << 1) | this.bit(probs, offset + m);
    }
    return m - (1 << numBits);
  }

  reverseBitTree(probs, offset, numBits) {
    let m = 1;
    let symbol = 0;
    for (let i = 0; i < numBits; i++) {
      const b = this.bit(probs, offset + m);
      m = (m << 1) | b;
      symbol |= (b << i);
    }
    return symbol;
  }
}

export function decodeLzmaRaw(props, compressed, uncompressedSize) {
  if (!(props instanceof Uint8Array) || props.length < 5) {
    throw new Error('Invalid LZMA1 properties header');
  }
  if (!Number.isSafeInteger(uncompressedSize) || uncompressedSize < 0) {
    throw new Error(`Invalid LZMA uncompressed size: ${uncompressedSize}`);
  }
  const d = props[0];
  if (d >= 225) {
    throw new Error(`Unsupported LZMA1 properties byte: ${d}`);
  }
  const lc = d % 9;
  const rem = (d / 9) | 0;
  const lp = rem % 5;
  const pb = (rem / 5) | 0;
  if (lc + lp > 4 && lc > 8) {
    throw new Error('Invalid LZMA1 lc/lp combination');
  }

  const out = new Uint8Array(uncompressedSize);
  if (uncompressedSize === 0) {
    return out;
  }

  const rc = new RangeDecoder(compressed);
  const posMask = (1 << pb) - 1;
  const litPosMask = (1 << lp) - 1;
  const lcShift = 8 - lc;
  const numLitStates = 1 << (lc + lp);
  const litProbs = initProbs(numLitStates * 0x300);

  const isMatch = initProbs(K_NUM_STATES * K_NUM_POS_STATES_MAX);
  const isRep = initProbs(K_NUM_STATES);
  const isRepG0 = initProbs(K_NUM_STATES);
  const isRepG1 = initProbs(K_NUM_STATES);
  const isRepG2 = initProbs(K_NUM_STATES);
  const isRep0Long = initProbs(K_NUM_STATES * K_NUM_POS_STATES_MAX);
  const posSlotDecoder = initProbs(4 * 64);
  const posDecoders = initProbs(115);
  const alignDecoder = initProbs(K_ALIGN_SIZE);

  const lenDecoder = new LenDecoder();
  const repLenDecoder = new LenDecoder();

  let state = 0;
  let rep0 = 1;
  let rep1 = 1;
  let rep2 = 1;
  let rep3 = 1;
  let outPos = 0;

  while (outPos < uncompressedSize) {
    const posState = outPos & posMask;
    const statePos = (state << 4) + posState;

    if (rc.bit(isMatch, statePos) === 0) {
      const prevByte = outPos > 0 ? out[outPos - 1] : 0;
      const litCtx = (((outPos & litPosMask) << lc) + (prevByte >>> lcShift)) * 0x300;
      let symbol = 1;

      if (state >= 7) {
        if (rep0 > outPos) {
          throw new Error(`Invalid LZMA matched literal distance: ${rep0} > ${outPos}`);
        }
        let matchByte = out[outPos - rep0];
        do {
          const matchBit = (matchByte >>> 7) & 1;
          matchByte = (matchByte << 1) & 0xFF;
          const b = rc.bit(litProbs, litCtx + (((1 + matchBit) << 8) + symbol));
          symbol = (symbol << 1) | b;
          if (matchBit !== b) {
            while (symbol < 0x100) {
              symbol = (symbol << 1) | rc.bit(litProbs, litCtx + symbol);
            }
            break;
          }
        } while (symbol < 0x100);
      } else {
        while (symbol < 0x100) {
          symbol = (symbol << 1) | rc.bit(litProbs, litCtx + symbol);
        }
      }

      out[outPos++] = symbol & 0xFF;
      state = state < 4 ? 0 : (state < 10 ? state - 3 : state - 6);
      continue;
    }

    let len;
    if (rc.bit(isRep, state) !== 0) {
      if (rc.bit(isRepG0, state) === 0) {
        if (rc.bit(isRep0Long, statePos) === 0) {
          if (rep0 > outPos) {
            throw new Error(`Invalid LZMA short-rep distance: ${rep0} > ${outPos}`);
          }
          state = state < 7 ? 9 : 11;
          out[outPos] = out[outPos - rep0];
          outPos++;
          continue;
        }
      } else {
        let dist;
        if (rc.bit(isRepG1, state) === 0) {
          dist = rep1;
        } else {
          if (rc.bit(isRepG2, state) === 0) {
            dist = rep2;
          } else {
            dist = rep3;
            rep3 = rep2;
          }
          rep2 = rep1;
        }
        rep1 = rep0;
        rep0 = dist;
      }
      len = 2 + repLenDecoder.decode(rc, posState);
      state = state < 7 ? 8 : 11;
    } else {
      rep3 = rep2;
      rep2 = rep1;
      rep1 = rep0;
      len = 2 + lenDecoder.decode(rc, posState);
      state = state < 7 ? 7 : 10;
      const lenToPos = (len - 2) < 4 ? (len - 2) : 3;
      const posSlot = rc.bitTree(posSlotDecoder, lenToPos << 6, 6);
      if (posSlot >= 4) {
        const numDirect = (posSlot >>> 1) - 1;
        let dist = (2 | (posSlot & 1)) * Math.pow(2, numDirect);
        if (posSlot < 14) {
          dist += rc.reverseBitTree(posDecoders, dist - posSlot, numDirect);
        } else {
          dist += rc.directBits(numDirect - 4) * K_ALIGN_SIZE;
          dist += rc.reverseBitTree(alignDecoder, 0, 4);
        }
        if (dist === 0xFFFFFFFF) {
          throw new Error('Unexpected LZMA end-of-stream marker before uncompressed size');
        }
        rep0 = dist + 1;
      } else {
        rep0 = posSlot + 1;
      }
    }

    if (rep0 < 1 || rep0 > outPos) {
      throw new Error(`Invalid LZMA match distance: ${rep0} (outPos=${outPos})`);
    }
    if (outPos + len > uncompressedSize) {
      throw new Error(`LZMA match overflows uncompressed size: ${outPos + len} > ${uncompressedSize}`);
    }
    for (let i = 0; i < len; i++) {
      out[outPos] = out[outPos - rep0];
      outPos++;
    }
  }

  // Consume optional LZMA1 end-of-stream marker (dist === 0xFFFFFFFF) emitted by liblzma/Python lzma.
  if (rc.pos < compressed.length || rc.code !== 0) {
    const posState = outPos & posMask;
    const statePos = (state << 4) + posState;
    if (rc.bit(isMatch, statePos) === 1 && rc.bit(isRep, state) === 0) {
      const len = 2 + lenDecoder.decode(rc, posState);
      const lenToPos = (len - 2) < 4 ? (len - 2) : 3;
      const posSlot = rc.bitTree(posSlotDecoder, lenToPos << 6, 6);
      if (posSlot >= 14) {
        const numDirect = (posSlot >>> 1) - 1;
        let dist = (2 | (posSlot & 1)) * Math.pow(2, numDirect);
        dist += rc.directBits(numDirect - 4) * K_ALIGN_SIZE;
        dist += rc.reverseBitTree(alignDecoder, 0, 4);
        if (dist === 0xFFFFFFFF && rc.pos === compressed.length && rc.code === 0) {
          return out;
        }
      }
    }
    throw new Error(`Trailing or corrupt LZMA stream state (pos=${rc.pos}/${compressed.length}, code=${rc.code})`);
  }
  return out;
}
