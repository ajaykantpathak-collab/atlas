/**
 * devanagari.ts — deterministic Devanagari syllabifier + matra counter for Hindi chhand scanning.
 *
 * CORPUS GROUNDING (every rule cites the Atlas CBSE corpus node that teaches it):
 * - c10_hin_sp_cbse_16_005 PREREQ_CONCEPT: ह्रस्व (अ, इ, उ) = 1 मात्रा, दीर्घ (आ, ई, ऊ, ए, ऐ, ओ, औ) = 2 मात्रा,
 *   अनुस्वार/विसर्ग = 1 मात्रा, संयुक्त व्यंजन का पहला व्यंजन आधी मात्रा (पर CBSE में प्रायः पूर्ण मात्रा माना जाता है)।
 * - c10_hin_sp_cbse_16_005 WORKED_EXAMPLE_1: "गुरु गोविंद दोऊ खड़े" = 13 मात्रा; "काके लागूँ पायँ" = 11 मात्रा
 *   (explicit note: "लोक-उच्चारण 'पायँ' सहित"); "बलिहारी गुरु आपने / गोविंद दियो बताय" = 13 / 11.
 * - c10_hin_ks_cbse_01_005 DIAGNOSTIC_ANSWER_5: "मैया मोरी दाऊ बहुत खिझायो" = 20 मात्रा.
 * - c11_hin_a_cbse_14_003 DIAGNOSTIC_ANSWER_3: "बादल को घिरते देखा है" = 16 मात्रा.
 * - c7_hin_cbse_06_003: गिरधर कविराय की कुंडलिया की प्रत्येक पंक्ति = 24 मात्रा (बराबर-समय लय).
 *
 * DETERMINISM: pure functions; same input -> same output. No fuzzy matching, no LLM.
 */

const IND_SHORT = new Set(['अ', 'इ', 'उ', 'ऋ', 'ऌ', '\u0962']); // अ इ उ ऋ ऌ ॢ = 1 मात्रा (R2/R10)
const IND_LONG = new Set(['आ', 'ई', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'ऽ', '\u0960', '\u0961']); // आ ई ऊ ए ऐ ओ औ = 2 (R2)
const MATRA_SHORT = new Set(['\u093F', '\u0941', '\u0943', '\u0945', '\u0949']); // ि ु ृ ऍ ऑ = 1
const MATRA_LONG = new Set(['\u093E', '\u0940', '\u0942', '\u0944', '\u0947', '\u0948', '\u094B', '\u094C']); // ा ी ू ॅ े ै ो ौ = 2

function isConsonant(cp: number): boolean {
  return (
    (cp >= 0x0915 && cp <= 0x0939) || // क..ह
    (cp >= 0x0958 && cp <= 0x095F) || // nukta forms क़..य़
    (cp >= 0x0978 && cp <= 0x097F) // extended consonants
  );
}
const isHalant = (cp: number): boolean => cp === 0x094D; // ्
const isNukta = (cp: number): boolean => cp === 0x093C; // ़
const isAnusvara = (cp: number): boolean => cp === 0x0902; // ं
const isChandrabindu = (cp: number): boolean => cp === 0x0901; // ँ
const isVisarga = (cp: number): boolean => cp === 0x0903; // ः

function isDevLetterish(cp: number): boolean {
  return (
    (cp >= 0x0901 && cp <= 0x094F) ||
    (cp >= 0x0950 && cp <= 0x095F) ||
    (cp >= 0x0960 && cp <= 0x097F)
  );
}

type Seg = {
  text: string;
  cp: number;
  kind: 'cons' | 'halant' | 'nukta' | 'vshort' | 'vlong' | 'anus' | 'chand' | 'visarga' | 'other';
};

function segmentChars(text: string): Seg[] {
  const segs: Seg[] = [];
  for (const ch of Array.from(text)) {
    const cp = ch.codePointAt(0)!;
    let kind: Seg['kind'] = 'other';
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

type Word = { text: string; segs: Seg[] };

function splitWords(line: string): Word[] {
  const words: Word[] = [];
  let cur = '';
  for (const ch of Array.from(line)) {
    const cp = ch.codePointAt(0)!;
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

export type Syllable = {
  /** original text (consonant cluster + vowel sign + nasal marks) */
  text: string;
  /** weight: 1 = laghu, 2 = guru */
  matras: 1 | 2;
};

/**
 * R9 (narrowed): a word-final consonant merges with the next word's identical
 * initial consonant ONLY when it already closes a syllable — i.e. the segment
 * before it is anusvara/chandrabindu/halant (the obligatory schwa-deletion
 * environment, = द्वित्व व्यंजन संधि of recitation). Anchors:
 *   "गोविंद दोऊ" (ं+द → merge, 13 मात्रा) YES;
 *   "कनक कनक" (open क#क → both counted, 13 मात्रा) NO;
 *   "राम मधु" (ा+म → no merge) NO.
 */
function geminationSet(words: Word[]): Set<number> {
  const set = new Set<number>();
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

/**
 * Syllabify one line of Devanagari into weighted syllables (laghu=1, guru=2).
 * Cross-word geminated consonants (R9) are absorbed (no syllable of their own).
 */
export function syllables(line: string): Syllable[] {
  const out: Syllable[] = [];
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
        let nucleus: 'short' | 'long' | 'none' = 'none';
        let text = s.text;
        // vowel sign?
        while (i < segs.length) {
          const t = segs[i];
          if (t.kind === 'nukta') { text += t.text; i++; continue; }
          if (t.kind === 'vshort') { nucleus = 'short'; text += t.text; i++; break; }
          if (t.kind === 'vlong') { nucleus = 'long'; text += t.text; i++; break; }
          break;
        }
        let weight: number;
        if (nucleus === 'short') weight = 1; // R2
        else if (nucleus === 'long') weight = 2; // R2
        else {
          // no vowel sign: inherent अ (R2 = 1) or halant consonant (R3 = 1, CBSE full matra)
          const atWordEnd = i >= segs.length;
          if (gemFinal && atWordEnd) {
            continue; // R9: absorbed into next word's identical onset — no syllable
          }
          weight = 1;
          // consume halant chain: each halant consonant is its own 1-matra unit (R3)
          while (i < segs.length && segs[i].kind === 'halant') {
            text += segs[i].text;
            i++;
            if (i < segs.length && segs[i].kind === 'cons') {
              // the halant consonant: emit current, continue loop with next consonant
              break;
            }
          }
        }
        // nasal / visarga marks on this syllable
        while (i < segs.length) {
          const t = segs[i];
          if (t.kind === 'anus') {
            text += t.text; i++;
            const wordFinal = i >= segs.length;
            if (!wordFinal && nucleus !== 'long') weight += 1; // R4 (R6: word-final = 0)
          } else if (t.kind === 'chand') {
            text += t.text; i++; // R5: +0; R6 word-final: +0
          } else if (t.kind === 'visarga') {
            text += t.text; weight += 1; i++; // R7
          } else break;
        }
        out.push({ text, matras: weight >= 2 ? 2 : 1 });
        prevO = /ो$|ौ$/.test(text);
      } else if (s.kind === 'vshort' || s.kind === 'vlong') {
        // standalone vowel (R10): अ इ उ ऋ = 1; आ ई ऊ ए ऐ ओ औ = 2 (कोई = को(2)+इ(1))
        let weight = s.kind === 'vshort' ? 1 : 2;
        let text = s.text;
        if (prevO && (s.text === 'ई' || s.text === 'ए')) weight = 1; // R10: कोई/सोई → को(2)+इ(1)
        prevO = false;
        i++;
        while (i < segs.length) {
          const t = segs[i];
          if (t.kind === 'anus') {
            text += t.text; i++;
            if (i < segs.length && weight === 1) weight = 2; // R4
          } else if (t.kind === 'chand') {
            text += t.text; i++; // R5
          } else if (t.kind === 'visarga') {
            text += t.text; weight += 1; i++; // R7
          } else break;
        }
        out.push({ text, matras: weight >= 2 ? 2 : 1 });
      } else {
        i++; // stray halant/other — skip
      }
    }
  }
  return out;
}

/**
 * Count matras of a single line: sum of syllable weights (R2-R7, R9, R10).
 */
export function matras(line: string): number {
  return syllables(line).reduce((n, s) => n + s.matras, 0);
}

/** Varna-gana shapes (Pingala), used ONLY to name 3-matra chunks shown as steps. */
const GANA_SHAPES: Array<[string, string]> = [
  ['य', 'lgg'], ['म', 'ggg'], ['त', 'ggl'], ['र', 'glg'], ['भ', 'gll'], ['ज', 'lgl'], ['स', 'llg'], ['न', 'lll'],
];

/**
 * ganaPattern(line): the line's laghu/guru matra stream chunked into 3-matra ganas
 * ("गण-विभाजन (3 मात्रा = 1 गण)" — c10_hin_ks_cbse_01_005). Returns e.g. "य र त +1".
 * This is the DISPLAY sequence for the matra table (steps), not a hard constraint.
 */
export function ganaPattern(line: string): string {
  let stream = '';
  for (const s of syllables(line)) stream += s.matras === 1 ? 'l' : 'gg';
  const labels: string[] = [];
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

/** Per-syllable laghu/guru string, e.g. "G L L G" — the steps shown per line. */
export function guruLaghu(line: string): string {
  return syllables(line).map(s => (s.matras >= 2 ? 'G' : 'L')).join(' ');
}

/** Word list of a line (non-letter characters split), for yati/word-boundary display. */
export function words(line: string): string[] {
  return splitWords(String(line ?? '')).map(w => w.text);
}
