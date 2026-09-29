/**
 * devanagari.mjs — plain-JS twin of devanagari.ts (byte-equivalent logic).
 * Deterministic Devanagari syllabifier + matra counter for Hindi chhand scanning.
 * Rules and corpus citations: see LIT_HINDI_ENGINE.md and devanagari.ts header.
 */

const IND_SHORT = new Set(['अ', 'इ', 'उ', 'ऋ', 'ऌ', '\u0962']);
const IND_LONG = new Set(['आ', 'ई', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'ऽ', '\u0960', '\u0961']);
const MATRA_SHORT = new Set(['\u093F', '\u0941', '\u0943', '\u0945', '\u0949']);
const MATRA_LONG = new Set(['\u093E', '\u0940', '\u0942', '\u0944', '\u0947', '\u0948', '\u094B', '\u094C']);

function isConsonant(cp) {
  return (
    (cp >= 0x0915 && cp <= 0x0939) ||
    (cp >= 0x0958 && cp <= 0x095F) ||
    (cp >= 0x0978 && cp <= 0x097F)
  );
}
const isHalant = (cp) => cp === 0x094D;
const isNukta = (cp) => cp === 0x093C;
const isAnusvara = (cp) => cp === 0x0902;
const isChandrabindu = (cp) => cp === 0x0901;
const isVisarga = (cp) => cp === 0x0903;

function isDevLetterish(cp) {
  return (
    (cp >= 0x0901 && cp <= 0x094F) ||
    (cp >= 0x0950 && cp <= 0x095F) ||
    (cp >= 0x0960 && cp <= 0x097F)
  );
}

function segmentChars(text) {
  const segs = [];
  for (const ch of Array.from(text)) {
    const cp = ch.codePointAt(0);
    let kind = 'other';
    if (isConsonant(cp)) kind = 'cons';
    else if (isHalant(cp)) kind = 'halant';
    else if (isNukta(cp)) kind = 'nukta';
    else if (isAnusvara(cp)) kind = 'anus';
    else if (isChandrabindu(cp)) kind = 'chand';
    else if (isVisarga(cp)) kind = 'visarga';
    else if (IND_SHORT.has(ch) || MATRA_SHORT.has(ch)) kind = 'vshort';
    else if (IND_LONG.has(ch) || MATRA_LONG.has(ch)) kind = 'vlong';
    segs.push({ text: ch, cp, kind });
  }
  return segs;
}

function splitWords(line) {
  const words = [];
  let cur = '';
  for (const ch of Array.from(String(line ?? ''))) {
    const cp = ch.codePointAt(0);
    if (isDevLetterish(cp)) {
      cur += ch;
    } else if (cur) {
      words.push({ text: cur, segs: segmentChars(cur) });
      cur = '';
    }
  }
  if (cur) words.push({ text: cur, segs: segmentChars(cur) });
  return words;
}

/**
 * R9 (narrowed): a word-final consonant merges with the next word's identical
 * initial consonant ONLY when it already closes a syllable — i.e. the segment
 * before it is anusvara/chandrabindu/halant (the obligatory schwa-deletion
 * environment, = द्वित्व व्यंजन संधि of recitation). Anchors:
 *   "गोविंद दोऊ" (ं+द → merge, 13 मात्रा) YES;
 *   "कनक कनक" (open क#क → both counted, 13 मात्रा) NO;
 *   "राम मधु" (ा+म → no merge) NO.
 */
function geminationSet(words) {
  const set = new Set();
  for (let w = 0; w < words.length - 1; w++) {
    const a = words[w].segs;
    const b = words[w + 1].segs;
    if (a.length < 2 || b.length < 1) continue;
    const last = a[a.length - 1];
    const prev = a[a.length - 2];
    if (
      last.kind === 'cons' && b[0].kind === 'cons' && last.cp === b[0].cp &&
      (prev.kind === 'anus' || prev.kind === 'chand' || prev.kind === 'halant')
    ) set.add(w);
  }
  return set;
}

export function syllables(line) {
  const out = [];
  const text0 = String(line ?? '');
  if (!text0) return out;
  const words = splitWords(text0);
  const gem = geminationSet(words);
  // R10 (कोई-exception): standalone long ई/ए directly after a ो/ौ-ending syllable
  // is pronounced short (कोई = को(2)+इ(1) = 3 मात्रा) — Braj/Avadhi recitation convention.
  let prevO = false;

  for (let w = 0; w < words.length; w++) {
    const segs = words[w].segs;
    const gemFinal = gem.has(w);
    let i = 0;
    while (i < segs.length) {
      const s = segs[i];
      if (s.kind === 'cons') {
        i++;
        let nucleus = 'none';
        let text = s.text;
        while (i < segs.length) {
          const t = segs[i];
          if (t.kind === 'nukta') { text += t.text; i++; continue; }
          if (t.kind === 'vshort') { nucleus = 'short'; text += t.text; i++; break; }
          if (t.kind === 'vlong') { nucleus = 'long'; text += t.text; i++; break; }
          break;
        }
        let weight;
        if (nucleus === 'short') weight = 1;
        else if (nucleus === 'long') weight = 2;
        else {
          const atWordEnd = i >= segs.length;
          if (gemFinal && atWordEnd) {
            continue; // R9: absorbed into next word's identical onset
          }
          weight = 1;
          while (i < segs.length && segs[i].kind === 'halant') {
            text += segs[i].text;
            i++;
            if (i < segs.length && segs[i].kind === 'cons') break;
          }
        }
        while (i < segs.length) {
          const t = segs[i];
          if (t.kind === 'anus') {
            text += t.text; i++;
            const wordFinal = i >= segs.length;
            if (!wordFinal && nucleus !== 'long') weight += 1;
          } else if (t.kind === 'chand') {
            text += t.text; i++;
          } else if (t.kind === 'visarga') {
            text += t.text; weight += 1; i++;
          } else break;
        }
        out.push({ text, matras: weight >= 2 ? 2 : 1 });
        prevO = /ो$|ौ$/.test(text);
      } else if (s.kind === 'vshort' || s.kind === 'vlong') {
        let weight = s.kind === 'vshort' ? 1 : 2;
        let text = s.text;
        if (prevO && (s.text === 'ई' || s.text === 'ए')) weight = 1; // R10: कोई/सोई → को(2)+इ(1)
        prevO = false;
        i++;
        while (i < segs.length) {
          const t = segs[i];
          if (t.kind === 'anus') {
            text += t.text; i++;
            if (i < segs.length && weight === 1) weight = 2;
          } else if (t.kind === 'chand') {
            text += t.text; i++;
          } else if (t.kind === 'visarga') {
            text += t.text; weight += 1; i++;
          } else break;
        }
        out.push({ text, matras: weight >= 2 ? 2 : 1 });
      } else {
        i++;
      }
    }
  }
  return out;
}

export function matras(line) {
  return syllables(line).reduce((n, s) => n + s.matras, 0);
}

const GANA_SHAPES = [
  ['य', 'lgg'], ['म', 'ggg'], ['त', 'ggl'], ['र', 'glg'], ['भ', 'gll'], ['ज', 'lgl'], ['स', 'llg'], ['न', 'lll'],
];

export function ganaPattern(line) {
  let stream = '';
  for (const s of syllables(line)) stream += s.matras === 1 ? 'l' : 'gg';
  const labels = [];
  let pos = 0;
  while (stream.length - pos >= 3) {
    const chunk = stream.slice(pos, pos + 3);
    const hit = GANA_SHAPES.find(([, shape]) => shape === chunk);
    labels.push(hit ? hit[0] : '?');
    pos += 3;
  }
  const rest = stream.length - pos;
  let out = labels.join(' ');
  if (rest > 0) out += (out ? ' +' : '+') + rest;
  return out || '(खाली)';
}

export function guruLaghu(line) {
  return syllables(line).map(s => (s.matras >= 2 ? 'G' : 'L')).join(' ');
}

export function words(line) {
  return splitWords(String(line ?? '')).map(w => w.text);
}
