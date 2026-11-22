/**
 * Core dual-subtitle composition, layout fitting, SRT merging, and binary patching.
 * 1:1 port of subtitles.py + catalog/level0 safety checks.
 */
import { isEastAsianWide } from './eaw-table.js';
import {
  LANGUAGES,
  PAIRS,
  TEXT_COLUMNS,
  SRT_SUFFIXES,
  SCENARIOS_REL,
  SHARED_REL,
  CATALOG_REL,
  LEVEL0_REL,
  canonicalPair,
} from './builds.js';
import {
  readAlignedStr,
  writeAlignedStr,
  unpackUnityFSBytes,
  packUnityFSUncompressed,
  parseSerializedV22,
  findMonoBehaviourByName,
  replaceSerializedObjects,
} from './unityfs.js';

export const BOOK = '異病偵探對白資料表.book';
export const COLOR = '#B8D8F0';
export const CONTINUES = new Set(['Next', 'Input', 'InputBr']);
export const BREAKS = new Set([
  'Selection', 'SelectionClick', 'Jump', 'JumpRandom', 'JumpSubroutine',
  'Think', 'Wrong', 'If', 'ElseIf', 'Else', 'EndIf', 'EndScenario',
  'Explore', 'ExploreStart', 'Battle', 'GotIt', 'WaitInput',
]);
export const BOXES = {
  '對白框_一般': [1120, 175, 32],
  '對白框_生氣': [1120, 175, 32],
  '對白框_影片': [1120, 135, 38],
  '對白框_宣布': [1120, 300, 38],
  '對白框_正中央': [1520, 900, 38],
};
export const READABLE_EFF_FLOOR = { '對白框_影片': 18 };

const TAG_COLS = ['align', 'speed', 'color', 'size'];
const RE_ALL_TAGS = /<[^>]+>/g;
const RE_BR = /^<br\s*\/?>$/i;
const RE_SIZE_OPEN = /^<size=([^>]+)>$/i;
const RE_NUM = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
const RE_NUMERIC_SIZE = /<size=(\d+)>/g;
const RE_KEEP_MARKUP = /<\/?([A-Za-z][A-Za-z0-9_-]*)(?:[ =][^>]*)?>/g;
const RE_STRIP_LAYOUT = /<\/?(?:size|speed|align)(?:=[^>]*)?>/g;
const RE_ZERO_SIZE = /^0(?:\.0+)?%?$/;
const KEEP_TAGS = new Set(['color', 'b', 'i', 'u', 's', 'br']);
const textEncoder = new TextEncoder();

export function pyRound(x) {
  const f = Math.floor(x);
  const diff = x - f;
  if (Math.abs(diff - 0.5) < 1e-12) {
    return (f % 2 === 0) ? f : f + 1;
  }
  return Math.round(x);
}

function cmpTuple(a, b) {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }
  return a.length - b.length;
}

export function presentationStack(text, tags = TAG_COLS, initial = []) {
  const stack = [...initial];
  const re = new RegExp(`<(/?)(${tags.join('|')})(?:=[^>]*)?>`, 'gi');
  let m;
  while ((m = re.exec(text)) !== null) {
    const closing = m[1];
    const tag = m[2].toLowerCase();
    if (!closing) {
      stack.push([tag, m[0]]);
    } else {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i][0] === tag) {
          stack.splice(i, 1);
          break;
        }
      }
    }
  }
  return stack;
}

export function balance(text, tags = ['speed', 'color', 'size']) {
  const stack = presentationStack(text, tags);
  let suffix = '';
  for (let i = stack.length - 1; i >= 0; i--) {
    suffix += `</${stack[i][0]}>`;
  }
  return text + suffix;
}

export function secondary(text) {
  const visible = [];
  const hidden = [];
  const parts = text.split(/(<[^>]+>)/);
  for (const token of parts) {
    if (!token) continue;
    const size = RE_SIZE_OPEN.exec(token);
    if (size) {
      const prev = hidden.length ? hidden[hidden.length - 1] : false;
      hidden.push(prev || RE_ZERO_SIZE.test(size[1]));
    } else if (token.toLowerCase() === '</size>') {
      if (hidden.length) hidden.pop();
    } else if (!hidden.length || !hidden[hidden.length - 1]) {
      visible.push(token);
    }
  }
  let out = visible.join('');
  out = out.replace(RE_STRIP_LAYOUT, '');
  out = out.replace(RE_KEEP_MARKUP, (full, tagName) => (
    KEEP_TAGS.has(tagName.toLowerCase()) ? full : ''
  ));
  return balance(out.trim());
}

function closePresentation(text) {
  const stack = presentationStack(text, TAG_COLS);
  let leadingAlign = 0;
  while (leadingAlign < stack.length && stack[leadingAlign][0] === 'align') {
    leadingAlign++;
  }
  const innerStack = stack.slice(leadingAlign);
  let closeSuffix = '';
  for (let i = innerStack.length - 1; i >= 0; i--) {
    closeSuffix += `</${innerStack[i][0]}>`;
  }
  const innerAlign = innerStack.filter(([tag]) => tag === 'align').map(([, open]) => open);
  return [text + closeSuffix, innerAlign, leadingAlign];
}

export function compose(top, bottom, command = '', size = 28) {
  top = top.trim();
  bottom = bottom.trim();
  if (!top || !bottom || top === bottom) {
    const t = top || bottom;
    return t ? balance(t, TAG_COLS) : '';
  }
  const secClean = secondary(bottom);
  if (!secClean) {
    return balance(top, TAG_COLS);
  }
  const [topClosed, innerAlign, leadingAlign] = closePresentation(top);
  let sec = (command !== '' && command !== 'L2DCharacter')
    ? `<size=24><color=${COLOR}>${secClean}</color></size>`
    : `<speed=0><size=${size}><color=${COLOR}>${secClean}</color></size></speed>`;
  if (innerAlign.length) {
    sec = innerAlign.join('') + sec + '</align>'.repeat(innerAlign.length);
  }
  return `${topClosed}\n${sec}${'</align>'.repeat(leadingAlign)}`;
}

function nextSize(spec, cur, base) {
  const s = spec.trim();
  if (s.endsWith('%')) {
    const raw = s.slice(0, -1).trim();
    if (!RE_NUM.test(raw)) return cur;
    return Math.max(0.0, (base * Number(raw)) / 100.0);
  }
  if (!RE_NUM.test(s)) return cur;
  if (s.startsWith('+') || s.startsWith('-')) {
    return Math.max(0.0, cur + Number(s));
  }
  return Math.max(0.0, Number(s));
}

export function height(text, base, width) {
  const stack = [[Number(base), false]];
  let pen = 0;
  let tallest = 0;
  let total = 0;
  const parts = text.split(/(<[^>]+>)/);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('<') && part.endsWith('>')) {
      if (RE_BR.test(part)) {
        if (!stack[stack.length - 1][1]) {
          total += (tallest || stack[stack.length - 1][0]) * 1.448;
          pen = 0;
          tallest = 0;
        }
        continue;
      }
      const match = RE_SIZE_OPEN.exec(part);
      if (match) {
        const [cur, hidden] = stack[stack.length - 1];
        const val = nextSize(match[1], cur, Number(base));
        stack.push([val, hidden || val <= 0]);
      } else if (part.toLowerCase() === '</size>' && stack.length > 1) {
        stack.pop();
      }
      continue;
    }
    if (stack[stack.length - 1][1]) continue;
    const cur = stack[stack.length - 1][0];
    const tokens = part.match(/[A-Za-z0-9]+|[^A-Za-z0-9]/gu) || [];
    for (const token of tokens) {
      if (token === '\n') {
        total += (tallest || cur) * 1.448;
        pen = 0;
        tallest = 0;
        continue;
      }
      let advance = 0;
      for (const c of token) {
        advance += cur * (isEastAsianWide(c.codePointAt(0)) ? 1 : 0.65);
      }
      if (pen && pen + advance > width) {
        total += (tallest || cur) * 1.448;
        pen = 0;
        tallest = 0;
      }
      pen += advance;
      tallest = Math.max(tallest, cur);
    }
  }
  return total + tallest * 1.448;
}

function visibleMinSize(lines, defaultSize, pctBase = null) {
  const base = Number(pctBase === null ? defaultSize : pctBase);
  let minSize = null;
  for (const line of lines) {
    const stack = [[Number(defaultSize), false]];
    for (const part of line.split(/(<[^>]+>)/)) {
      if (!part) continue;
      if (part.startsWith('<') && part.endsWith('>')) {
        const match = RE_SIZE_OPEN.exec(part);
        if (match) {
          const [cur, hidden] = stack[stack.length - 1];
          const val = nextSize(match[1], cur, base);
          stack.push([val, hidden || val <= 0]);
        } else if (part.toLowerCase() === '</size>' && stack.length > 1) {
          stack.pop();
        }
        continue;
      }
      if (stack[stack.length - 1][1] || !part.trim()) continue;
      const cur = Math.max(1.0, stack[stack.length - 1][0]);
      minSize = minSize === null ? cur : Math.min(minSize, cur);
    }
  }
  return minSize === null ? defaultSize : minSize;
}

const RE_COMPACT_SEC = new RegExp(
  `\\n((?:<align(?:=[^>]*)?>)*<speed=0><size=28><color=${COLOR}>)`,
);

export function fitPages(rows, header, report, composedRows = null) {
  const indexes = TEXT_COLUMNS.map((k) => header.indexOf(k));
  const winCol = header.indexOf('WindowType');
  const pctrlCol = header.indexOf('PageCtrl');
  const colCell = (row, idx) => (idx >= 0 && idx < row.length ? row[idx].trim() : '');

  let page = [];
  let winType = '對白框_一般';

  function buildCandidate(original, width, base, mode, size) {
    const candidate = [];
    for (let i = 0; i < page.length; i++) {
      const row = page[i];
      let text = original[i];
      if (!row[indexes[0]].trim()) {
        candidate.push(text);
        continue;
      }
      if (mode >= 1) {
        text = text.replace(RE_COMPACT_SEC, '　$1');
      }
      if (mode >= 2 && (colCell(row, pctrlCol) === 'Next' || colCell(row, pctrlCol) === 'Input') && text.endsWith('\n')) {
        text = text.slice(0, -1) + '　';
      }
      const safe = balance(text, ['speed', 'color', 'size']);
      const scaled = safe.replace(RE_NUMERIC_SIZE, (_full, numStr) => {
        const num = parseInt(numStr, 10);
        return num === 0 ? '<size=0>' : `<size=${Math.max(1, pyRound((num * size) / base))}>`;
      });
      candidate.push(`<size=${size}>${scaled}</size>`);
    }
    let whole = '';
    for (let i = 0; i < page.length; i++) {
      whole += candidate[i] + (colCell(page[i], pctrlCol) === 'InputBr' ? '\n' : '');
    }
    return [candidate, height(whole, base, width), visibleMinSize(candidate, size, base)];
  }

  function finish() {
    if (!page.length) return;
    if (!page.some((r) => r[indexes[0]].trim())) {
      page = [];
      return;
    }
    const [width, limit, base] = BOXES[winType];
    const original = page.map((r) => r[indexes[0]]);
    for (let i = 0; i < page.length - 1; i++) {
      const pctrl = colCell(page[i], pctrlCol);
      if (pctrl === 'Next' || pctrl === 'Input') {
        original[i] += '\n';
      }
    }
    const variants = [];
    const seen = new Set();
    for (const colI of indexes) {
      const key = page.map((r) => (r[indexes[0]].trim() ? '' : r[colI])).join('\u0000');
      if (!seen.has(key)) {
        seen.add(key);
        variants.push(colI);
      }
    }
    const effFloor = READABLE_EFF_FLOOR[winType] ?? 20;
    const modes = page.length > 1 ? [0, 1, 2] : [0, 1];
    let bestFitting = null; // [scoreTuple, mode, candidate]
    let bestOverflow = null; // [ovTuple, mode, candidate]

    for (const mode of modes) {
      const start = mode === 0 ? base : Math.min(base, 28);
      for (let size = start; size > 15; size -= 2) {
        const [cand, measured0, effMin] = buildCandidate(original, width, base, mode, size);
        let measured = measured0;
        for (const colI of variants) {
          let alt = '';
          for (let i = 0; i < page.length; i++) {
            const t = page[i][indexes[0]].trim() ? cand[i] : page[i][colI];
            alt += t + (colCell(page[i], pctrlCol) === 'InputBr' ? '\n' : '');
          }
          const m = height(alt, base, width);
          if (m > measured) measured = m;
        }
        if (measured <= limit) {
          const tier = effMin >= effFloor ? 1 : 0;
          const score = tier ? [1, -mode, effMin, size] : [0, effMin, -mode, size];
          if (!bestFitting || cmpTuple(score, bestFitting[0]) > 0) {
            bestFitting = [score, mode, cand];
          }
        } else {
          const ov = [measured - limit, mode, -effMin, -size];
          if (!bestOverflow || cmpTuple(ov, bestOverflow[0]) < 0) {
            bestOverflow = [ov, mode, cand];
          }
        }
      }
    }

    let bestMode;
    let candidate;
    if (bestFitting) {
      [, bestMode, candidate] = bestFitting;
    } else {
      report.layout_estimate_overflow_pages += 1;
      [, bestMode, candidate] = bestOverflow;
    }
    if (bestMode >= 1) {
      report.compact_pages = (report.compact_pages || 0) + 1;
    }
    for (let i = 0; i < page.length; i++) {
      const row = page[i];
      if (!row[indexes[0]].trim()) continue;
      for (const idx of indexes) {
        row[idx] = candidate[i];
      }
    }
    page = [];
  }

  const maxIdx = Math.max(...indexes);
  for (let rIdx = 1; rIdx < rows.length; rIdx++) {
    const { cells: row, footer } = rows[rIdx];
    const fLow = footer[0] | footer[1];
    if (fLow || row.length <= maxIdx) {
      finish();
      continue;
    }
    const cmd = colCell(row, header.indexOf('Command'));
    const newWin = colCell(row, winCol);
    if (BREAKS.has(cmd) || cmd === 'Selection' || cmd === 'ToastPopup' || cmd === 'Explore' || cmd === 'Jump'
        || cmd.startsWith('*') || (newWin in BOXES && newWin !== winType)) {
      finish();
    }
    if (newWin in BOXES) winType = newWin;
    if (cmd !== '' && cmd !== 'L2DCharacter') continue;

    if (!row[indexes[0]].trim()) {
      const pctrl = colCell(row, pctrlCol);
      if (!CONTINUES.has(pctrl) || indexes.some((i) => row[i].trim())) {
        finish();
      } else if (pctrl === 'InputBr') {
        page.push(row);
      }
      continue;
    }
    if ((composedRows !== null && !composedRows.has(row)) || !indexes.every((i) => row[i] === row[indexes[0]])) {
      finish();
      continue;
    }
    page.push(row);
    if (!CONTINUES.has(colCell(row, pctrlCol))) {
      finish();
    }
  }
  finish();
}

export function readGrid(buf, pos) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const rowCount = view.getUint32(pos, true);
  pos += 4;
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    const index = view.getInt32(pos, true);
    const len = view.getUint32(pos + 4, true);
    pos += 8;
    const cells = [];
    for (let j = 0; j < len; j++) {
      const [t, nextPos] = readAlignedStr(buf, pos);
      cells.push(t);
      pos = nextPos;
    }
    const footer = buf.subarray(pos, pos + 8);
    pos += 8;
    rows.push({ index, cells, footer });
  }
  let name;
  [name, pos] = readAlignedStr(buf, pos);
  const metadata = buf.subarray(pos, pos + 12);
  pos += 12;
  const start = pos;
  const colInfoLen = view.getUint32(pos, true);
  pos += 4 + colInfoLen * 4;
  const grpCount = view.getUint32(pos, true);
  pos += 4;
  for (let i = 0; i < grpCount; i++) {
    const gLen = view.getUint32(pos, true);
    pos += 4;
    for (let j = 0; j < gLen; j++) {
      [, pos] = readAlignedStr(buf, pos);
    }
  }
  return [rows, name, metadata, buf.subarray(start, pos), pos];
}

export function writeGrid(rows, name, metadata, tail) {
  const chunks = [];
  let total = 4;
  const hdr = new Uint8Array(4);
  new DataView(hdr.buffer).setUint32(0, rows.length, true);
  chunks.push(hdr);

  let utf16Len = 0;
  for (const { index, cells, footer } of rows) {
    const rowHdr = new Uint8Array(8);
    const rv = new DataView(rowHdr.buffer);
    rv.setInt32(0, index, true);
    rv.setUint32(4, cells.length, true);
    chunks.push(rowHdr);
    total += 8;
    for (const s of cells) {
      utf16Len += s.length;
      const b = writeAlignedStr(s);
      chunks.push(b);
      total += b.length;
    }
    chunks.push(footer);
    total += footer.length;
  }
  const nameBytes = writeAlignedStr(name);
  chunks.push(nameBytes);
  total += nameBytes.length;

  const metaOut = new Uint8Array(12);
  metaOut.set(metadata.subarray(0, 12), 0);
  new DataView(metaOut.buffer).setInt32(4, utf16Len, true);
  chunks.push(metaOut, tail);
  total += 12 + tail.length;

  const out = new Uint8Array(total);
  let ofs = 0;
  for (const c of chunks) {
    out.set(c, ofs);
    ofs += c.length;
  }
  return out;
}

export function patchBook(buf, pair, report) {
  pair = canonicalPair(pair);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let [, pos] = readAlignedStr(buf, 28);
  const sheets = view.getUint32(pos + 4, true);
  pos += 8;
  const outChunks = [buf.subarray(0, pos)];
  let totalOut = pos;

  for (let sIdx = 0; sIdx < sheets; sIdx++) {
    let rows, name, metadata, tail;
    [rows, name, metadata, tail, pos] = readGrid(buf, pos);
    const header = rows.length ? rows[0].cells : [];
    const colReq = ['Command', ...TEXT_COLUMNS];
    if (colReq.every((k) => header.includes(k))) {
      const [colAName, colBName] = PAIRS[pair];
      const a = header.indexOf(colAName);
      const b = header.indexOf(colBName);
      const columns = TEXT_COLUMNS.map((k) => header.indexOf(k));
      const command = header.indexOf('Command');
      const winCol = header.indexOf('WindowType');
      const pctrlCol = header.indexOf('PageCtrl');
      const composedRows = new Set();
      let page = [];
      let winType = '對白框_一般';
      const maxReqIdx = Math.max(...columns, command);

      function flushPage() {
        if (!page.length) return;
        const partial = page.some(([, t, bot]) => (t.trim() || bot.trim()) && (Boolean(t.trim()) !== Boolean(bot.trim())));
        if (partial) {
          for (const [, t, bot] of page) {
            if (Boolean(t.trim()) !== Boolean(bot.trim())) {
              report.missing_dialogue_translation_rows += 1;
            }
          }
          page = [];
          return;
        }
        let openA = [];
        let openB = [];
        for (const [cells, top, bottom, cmd, pctrl] of page) {
          const prefixA = openA.map(([, tag]) => tag).join('');
          const prefixB = openB.map(([, tag]) => tag).join('');
          const nextOpenA = presentationStack(top, TAG_COLS, openA);
          const nextOpenB = presentationStack(bottom, TAG_COLS, openB);
          if (top.trim() && bottom.trim()) {
            const text = compose(prefixA + top, prefixB + bottom, cmd);
            for (const index of columns) {
              cells[index] = text;
            }
            composedRows.add(cells);
            report.dialogue_rows += 1;
          }
          if (!CONTINUES.has(pctrl)) {
            openA = [];
            openB = [];
          } else {
            openA = nextOpenA;
            openB = nextOpenB;
          }
        }
        page = [];
      }

      for (let rIdx = 1; rIdx < rows.length; rIdx++) {
        const { cells, footer } = rows[rIdx];
        if ((footer[0] | footer[1]) || cells.length <= maxReqIdx) {
          flushPage();
          continue;
        }
        const cmd = cells[command].trim();
        const newWin = (winCol >= 0 && winCol < cells.length) ? cells[winCol].trim() : '';
        if (BREAKS.has(cmd) || cmd.startsWith('*') || (newWin in BOXES && newWin !== winType)) {
          flushPage();
        }
        if (newWin in BOXES) winType = newWin;
        if (cmd === '' || cmd === 'L2DCharacter') {
          const pctrl = (pctrlCol >= 0 && pctrlCol < cells.length) ? cells[pctrlCol].trim() : '';
          page.push([cells, cells[a], cells[b], cmd, pctrl]);
          if (!CONTINUES.has(pctrl)) {
            flushPage();
          }
          continue;
        }
        if (cmd !== 'Selection' && cmd !== 'ToastPopup' && cmd !== 'Explore' && cmd !== 'Jump') {
          continue;
        }
        flushPage();
        const top = cells[a];
        const bottom = cells[b];
        if (!top.trim() && !bottom.trim()) continue;
        if (!top.trim() || !bottom.trim()) {
          report.missing_dialogue_translation_rows += 1;
          continue;
        }
        const text = compose(top, bottom, cmd);
        for (const index of columns) {
          cells[index] = text;
        }
        composedRows.add(cells);
        report.dialogue_rows += 1;
      }
      flushPage();
      fitPages(rows, header, report, composedRows);
    }
    const gBytes = writeGrid(rows, name, metadata, tail);
    outChunks.push(gBytes);
    totalOut += gBytes.length;
  }

  const tailRest = buf.subarray(pos);
  outChunks.push(tailRest);
  totalOut += tailRest.length;

  const out = new Uint8Array(totalOut);
  let ofs = 0;
  for (const c of outChunks) {
    out.set(c, ofs);
    ofs += c.length;
  }
  return out;
}

export function patchScenarios(raw, pair, report) {
  const info = parseSerializedV22(raw);
  const obj = findMonoBehaviourByName(raw, info, BOOK);
  const start = info.mData + obj.byteStart;
  const updated = patchBook(raw.subarray(start, start + obj.byteSize), pair, report);
  return replaceSerializedObjects(raw, new Map([[obj.pathId, updated]]));
}

export function parseSrt(text) {
  const normalized = text
    .replace(/^\ufeff+/, '')
    .replace(/\r\r\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
  const re = /^[ \t]*(\d+)[ \t]*\n([0-9:,.]+[ \t]+-->[ \t]+[0-9:,.]+)[ \t]*(?:\n|$)/gm;
  const matches = [];
  let m;
  while ((m = re.exec(normalized)) !== null) {
    matches.push({ idx: m.index, end: re.lastIndex, g1: m[1], g2: m[2] });
  }
  const arrowCount = (normalized.match(/-->/g) || []).length;
  if (arrowCount !== matches.length || (matches.length && normalized.slice(0, matches[0].idx).trim())) {
    throw new Error('Unsupported SRT syntax; refusing to discard subtitle text');
  }
  if (!matches.length && normalized) {
    throw new Error('Nonempty subtitle text has no supported SRT cues');
  }
  return matches.map((cur, i) => {
    const nextStart = i + 1 < matches.length ? matches[i + 1].idx : normalized.length;
    return [cur.g1, cur.g2.trim(), normalized.slice(cur.end, nextStart).trim()];
  });
}

export function milliseconds(stamp) {
  const m = /^(\d+):(\d{2}):(\d{2})[,.](\d{3})$/.exec(stamp.trim());
  if (!m) {
    throw new Error('Unsupported SRT timestamp');
  }
  const h = Number(m[1]);
  const mi = Number(m[2]);
  const s = Number(m[3]);
  const ms = Number(m[4]);
  return ((h * 60 + mi) * 60 + s) * 1000 + ms;
}

export function timestamp(ms) {
  const remMs = ms % 1000;
  const totalSec = (ms - remMs) / 1000;
  const remSec = totalSec % 60;
  const totalMin = (totalSec - remSec) / 60;
  const remMin = totalMin % 60;
  const hours = (totalMin - remMin) / 60;
  return `${String(hours).padStart(2, '0')}:${String(remMin).padStart(2, '0')}:${String(remSec).padStart(2, '0')},${String(remMs).padStart(3, '0')}`;
}

export function timeline(blocks) {
  const result = [];
  for (const [, times, text] of blocks) {
    if (!text) continue;
    const parts = times.split('-->');
    if (parts.length !== 2) throw new Error('Invalid SRT cue times');
    const start = milliseconds(parts[0]);
    const end = milliseconds(parts[1]);
    if (start >= end) {
      throw new Error('Invalid subtitle interval');
    }
    result.push([start, end, text]);
  }
  return result;
}

export function mergeSrt(leftBlocks, rightBlocks) {
  const left = timeline(leftBlocks);
  const right = timeline(rightBlocks);
  const pointSet = new Set();
  for (const cues of [left, right]) {
    for (const [a, b] of cues) {
      pointSet.add(a);
      pointSet.add(b);
    }
  }
  const boundaries = Array.from(pointSet).sort((x, y) => x - y);
  const merged = [];
  for (let i = 0; i + 1 < boundaries.length; i++) {
    const start = boundaries[i];
    const end = boundaries[i + 1];
    const a = left.filter(([x, y]) => x <= start && end <= y).map(([, , t]) => t).join('\n');
    const b = right.filter(([x, y]) => x <= start && end <= y).map(([, , t]) => t).join('\n');
    if (!a && !b) continue;
    let text = balance(a || b);
    if (a && b && a !== b) {
      text = `${balance(a)}\n<size=82%><color=${COLOR}>${secondary(b)}</color></size>`;
    }
    if (merged.length && merged[merged.length - 1][1] === start && merged[merged.length - 1][2] === text) {
      merged[merged.length - 1][1] = end;
    } else {
      merged.push([start, end, text]);
    }
  }
  return merged;
}

export function patchVideos(raw, pair, report) {
  pair = canonicalPair(pair);
  const info = parseSerializedV22(raw);
  const assets = new Map();
  for (const obj of info.objs) {
    if (obj.classId === 49) {
      const start = info.mData + obj.byteStart;
      const payload = raw.subarray(start, start + obj.byteSize);
      const [name, p] = readAlignedStr(payload, 0);
      const [text, end] = readAlignedStr(payload, p);
      assets.set(name, [obj.pathId, text, payload.subarray(end)]);
    }
  }

  const replacements = new Map();
  const colPair = PAIRS[pair];
  const outSuffixes = Object.values(SRT_SUFFIXES);
  const sortedNames = Array.from(assets.keys()).sort();
  for (const base of sortedNames) {
    if (['_en', '_ja', '_ko', '_zh-CN'].some((s) => base.endsWith(s))) continue;
    const names = colPair.map((k) => base + SRT_SUFFIXES[k]);
    if (names.some((n) => !assets.has(n))) continue;
    if (!names.some((n) => assets.get(n)[1].includes('-->'))) continue;
    const [left, right] = names.map((n) => parseSrt(assets.get(n)[1]));
    if (!timeline(left).length || !timeline(right).length) {
      report.unpaired_video_sets += 1;
    }
    if (!timeline(left).length && !timeline(right).length) continue;
    const merged = mergeSrt(left, right);
    const blocks = merged.map(([start, end, text], idx) => (
      `${idx + 1}\n${timestamp(start)} --> ${timestamp(end)}\n${text}`
    ));
    const joined = (`${blocks.join('\n\n')}\n`).replace(/\n/g, '\r\n');
    const joinedAligned = writeAlignedStr(joined);
    for (const sfx of outSuffixes) {
      const targetName = base + sfx;
      if (assets.has(targetName)) {
        const [pid, , tail] = assets.get(targetName);
        const nameAligned = writeAlignedStr(targetName);
        const rec = new Uint8Array(nameAligned.length + joinedAligned.length + tail.length);
        rec.set(nameAligned, 0);
        rec.set(joinedAligned, nameAligned.length);
        rec.set(tail, nameAligned.length + joinedAligned.length);
        replacements.set(pid, rec);
      }
    }
    report.video_sets += 1;
    report.video_cues += blocks.length;
  }
  return replaceSerializedObjects(raw, replacements);
}

function findByteSubsequenceCount(haystack, needleBytes) {
  let count = 0;
  let firstIdx = -1;
  const limit = haystack.length - needleBytes.length;
  outer: for (let i = 0; i <= limit; i++) {
    if (haystack[i] !== needleBytes[0]) continue;
    for (let j = 1; j < needleBytes.length; j++) {
      if (haystack[i + j] !== needleBytes[j]) continue outer;
    }
    if (firstIdx === -1) firstIdx = i;
    count++;
    if (count > 1) return [count, firstIdx];
  }
  return [count, firstIdx];
}

export function patchCatalog(rawCatalog, videoByteLength, profile) {
  const catalog = new Uint8Array(rawCatalog);
  const needleBytes = textEncoder.encode(profile.catalogNeedle);
  const [count, idx] = findByteSubsequenceCount(catalog, needleBytes);
  if (count !== 1) {
    throw new Error('Unsupported Addressables catalog');
  }
  const view = new DataView(catalog.buffer, catalog.byteOffset, catalog.byteLength);
  const expectedOrigVideoSize = profile.files[profile.videosPath].size;
  const oldSize = view.getUint32(idx + 44, true);
  if (oldSize !== expectedOrigVideoSize) {
    throw new Error(`Unexpected original video bundle size in catalog: ${oldSize} != ${expectedOrigVideoSize}`);
  }
  view.setUint32(idx + 40, 0, true);
  view.setUint32(idx + 44, videoByteLength, true);
  return catalog;
}

export function patchLevel0(rawLevel0, profile) {
  const level = new Uint8Array(rawLevel0);
  const info = parseSerializedV22(level);
  const matches = info.objs.filter(
    (o) => o.pathId === profile.level0PathId && o.classId === 114,
  );
  if (matches.length !== 1) {
    throw new Error('Unsupported video subtitle component');
  }
  const offset = info.mData + matches[0].byteStart + 72;
  const view = new DataView(level.buffer, level.byteOffset, level.byteLength);
  if (view.getInt32(offset, true) !== 256) {
    throw new Error('Unexpected subtitle character limit');
  }
  view.setInt32(offset, -1, true);
  return level;
}

export async function sha256Hex(bytes) {
  const buf = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  const arr = new Uint8Array(buf);
  let hex = '';
  for (let i = 0; i < arr.length; i++) {
    hex += arr[i].toString(16).padStart(2, '0');
  }
  return hex;
}

export async function patchAllAssets(originalsByRel, pair, profile, onProgress = () => {}) {
  pair = canonicalPair(pair);
  const report = {
    dialogue_rows: 0,
    missing_dialogue_translation_rows: 0,
    layout_estimate_overflow_pages: 0,
    video_sets: 0,
    video_cues: 0,
    unpaired_video_sets: 0,
  };
  const videosRel = profile.videosPath;

  onProgress('scenarios', 0.15);
  const { cab: scenCab, meta: scenMeta } = unpackUnityFSBytes(originalsByRel[SCENARIOS_REL]);
  if (scenMeta.nodes.length !== 1) {
    throw new Error('Unsupported scenario bundle layout');
  }
  const patchedScenCab = patchScenarios(scenCab, pair, report);
  const patchedScenarios = packUnityFSUncompressed(patchedScenCab, scenMeta);

  onProgress('shared', 0.45);
  const patchedShared = patchScenarios(originalsByRel[SHARED_REL], pair, report);

  onProgress('videos', 0.72);
  const { cab: vidCab, meta: vidMeta } = unpackUnityFSBytes(originalsByRel[videosRel]);
  if (vidMeta.nodes.length !== 1) {
    throw new Error('Unsupported subtitle bundle layout');
  }
  const patchedVideo = packUnityFSUncompressed(patchVideos(vidCab, pair, report), vidMeta);

  onProgress('catalog', 0.85);
  const patchedCatalog = patchCatalog(originalsByRel[CATALOG_REL], patchedVideo.length, profile);

  onProgress('level0', 0.92);
  const patchedLevel0 = patchLevel0(originalsByRel[LEVEL0_REL], profile);

  const outputs = {
    [SCENARIOS_REL]: patchedScenarios,
    [SHARED_REL]: patchedShared,
    [videosRel]: patchedVideo,
    [CATALOG_REL]: patchedCatalog,
    [LEVEL0_REL]: patchedLevel0,
  };

  const hashes = {};
  for (const [rel, bytes] of Object.entries(outputs)) {
    hashes[rel] = await sha256Hex(bytes);
  }

  return { outputs, hashes, report, scenCabHash: await sha256Hex(patchedScenCab) };
}
