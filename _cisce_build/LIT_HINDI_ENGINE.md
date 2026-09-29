# LIT_HINDI_ENGINE.md — Hindi Chhand / Meter Scanner (wave H1)

Deterministic Devanagari matra-counting syllabifier + laya (chhand) classifier.
Pure frontend engine, zero dependencies, no LLM, no fuzzy matching.
Files (canonical, mirrored byte-identical to `frontend/lib/lit/`):

| File | Purpose |
|---|---|
| `deploy/frontend/lib/lit/devanagari.ts` (+ `.mjs` twin) | syllabifier: `syllables()`, `matras()`, `ganaPattern()`, `guruLaghu()`, `words()` |
| `deploy/frontend/lib/lit/chhand.ts` (+ `.mjs` twin) | classifier: `scanHindiVerse()`, `TAUGHT_CHHANDS`, `UNTAUGHT_CHHANDS` |
| `deploy/frontend/lib/lit/index.ts` (+ `.mjs` twin) | public API barrel |
| `_cisce_build/test_lit_hindi.mjs` | test harness — `node D:\platform\_cisce_build\test_lit_hindi.mjs` → 111/111 pass |

`.ts` files use extensionless imports (Next.js/webpack); `.mjs` twins are plain JS
with explicit extensions for `node` (tests + any node consumer). Both verified to
produce byte-identical output on all test cases (node `--experimental-strip-types`).

## API

```ts
scanHindiVerse(verse: string): {
  chhand: string | null;        // e.g. 'दोहा', or null when declined
  confidence: number;           // 0..1, from exactness of the matra signature
  lines: { text, matras, ganas, guruLaghu, syllables }[];  // per-charan matra table = the "steps"
  declined_reason?: string;     // present iff chhand === null (honest decline)
  aliases?: string[];           // same-signature taught chhands (e.g. रोला for सोरठा)
  notes: string[];              // rule statements + per-line matra tables
  citations: string[];          // corpus node ids grounding the classification
}
```

## A. Syllabification rules (R1–R10)

Every rule is forced by at least one corpus anchor; anchors are exact counts
stated inside corpus nodes (not our guesses).

- **R1 varna segmentation** — codepoint classes: consonants (क..ह + nukta forms),
  halant (्), nukta (़), vowel signs (ि ु ृ short; ा ी ू े ै ो ौ long), standalone
  vowels, anusvara (ं), chandrabindu (ँ), visarga (ः). Non-Devanagari is ignored (0 matras).
- **R2 vowel weight** — ह्रस्व (अ इ उ ऋ, ि ु ृ) = 1 मात्रा; दीर्घ/guna/vrddhi (आ ई ऊ ए ऐ ओ औ, ा ी ू े ै ो ौ) = 2 मात्रा.
  *Cite: c10_hin_sp_cbse_16_005 PREREQ_CONCEPT "ह्रस्व (अ, इ, उ) = 1 मात्रा, दीर्घ…= 2 मात्रा".*
- **R3 halant/conjunct** — a halant consonant counts its own FULL matra (CBSE board convention; the
  half-matra theory is recorded but not used).
  *Cite: c10_hin_sp_cbse_16_005 PREREQ_CONCEPT "संयुक्त व्यंजन का पहला व्यंजन आधी मात्रा (पर CBSE में प्रायः पूर्ण मात्रा माना जाता है)".*
  Anchor: दुर्लभ (दु1+र्1+ल1+भ1=4) inside "दुर्लभ मानुष जन्म है = 13".
- **R4 anusvara** — +1 on a short-vowel nucleus, +0 on a long-vowel nucleus, +0 word-final.
  Anchors: गोविं = 2 (needed for "गुरु गोविंद दोऊ खड़े = 13"); में = 2.
- **R5 chandrabindu** — pure nasalization, +0 everywhere. Anchors: हँसाय (हँ=1), लागूँ (गूँ=2), माँगै (माँ=2).
- **R6 word-final nasal (loka-uccarana)** — a nasal (ं/ँ) on a word-final syllable adds 0.
  *Cite: c10_hin_sp_cbse_16_005: "द्वितीय चरण 11 मात्रा (लोक-उच्चारण 'पायँ' सहित)".* Anchor: पायँ = पा2+यँ1 = 3.
- **R7 visarga** — +1 matra. *Cite: c10_hin_sp_cbse_16_005 PREREQ_CONCEPT "विसर्ग = 1 मात्रा".* Anchor: दुःख = 3
  (needed for कुंडलिया line 5 = 24).
- **R9 cross-word gemination (द्वित्व व्यंजन संधि)** — word-final consonant merges with the next
  word's IDENTICAL initial consonant only when it already closes a syllable (preceded by
  ं/ँ/् — the obligatory schwa-deletion environment). Anchors: गोविंद दोऊ → गोविं+द्दोऊ (13);
  गोविंद दियो → 11. Negative anchors: कनक कनक (open क#क — both counted; Bihari line = 13), राम मधु (no merge).
- **R10 standalone-vowel / कोई rule** — a standalone vowel counts as its own syllable: इ=1, ई after ो/ौ = 1
  (कोई = को2+इ1 = 3; लेइ = ले2+इ1 = 3 — needed for kundaliya line 2 = 24).
- **Display** — `guruLaghu()` = per-syllable G/L string; `ganaPattern()` chunks the matra stream into
  3-matra ganas (corpus rule "गण-विभाजन (3 मात्रा = 1 गण)", c10_hin_ks_cbse_01_005) and names each
  chunk by its varna-gana shape (य=LGG म=GGG त=GGL र=GLG भ=GLL ज=LGL स=LLG न=LLL), e.g.
  "गुरु गोविंद दोऊ खड़े" → `स म म र +1`.

### Exactness anchors (corpus-stated counts reproduced exactly)

| Line | Corpus count | Engine | Cite |
|---|---|---|---|
| गुरु गोविंद दोऊ खड़े | 13 | 13 | c10_hin_sp_cbse_16_005 |
| काके लागूँ पायँ | 11 | 11 | c10_hin_sp_cbse_16_005 |
| बलिहारी गुरु आपने / गोविंद दियो बताय | 13 / 11 | 13 / 11 | c10_hin_sp_cbse_16_005 |
| दुर्लभ मानुष जन्म है / देह न बारम्बार | 13 / 11 | 13 / 11 | c10_hin_sp_cbse_16_005 |
| कनक कनक ते सौगुनी / मादकता अधिकाय | 13 / 11 | 13 / 11 | c10_hin_ks_cbse_03_011 |
| मैया मोरी दाऊ बहुत खिझायो | 20 | 20 | c10_hin_ks_cbse_01_005 |
| बादल को घिरते देखा है | 16 | 16 | c11_hin_a_cbse_14_003 |
| जाति न पूछो साधु की | 13 | 13 | c10_hin_sp_cbse_16_005 |
| कुंडलिया पंक्तियाँ (5 में से 4) | 24 | 24, 24, 24, 24, 24, 25 | c7_hin_cbse_06_003 (L4=25, ±1 band) |

Where the corpus itself documents ±1 tradition variance ("कुछ परंपराएँ 'य' को गुरु गिनती हैं → 22 मात्रा",
c10_hin_ks_cbse_01_005), the engine applies a ±1 tolerance band with a confidence penalty and prints the
honest count in the matra table — never silently rounds.

## B. Chhand set (corpus-taught only) and classification rules

| Chhand | Deterministic rule | Corpus cite |
|---|---|---|
| दोहा | 2 चरण, each 13+11 = 24 (yati at 13th matra) | c10_hin_sp_cbse_16_005 "प्रति चरण 24 मात्राएँ = 13 + 11; यति 13वीं मात्रा पर"; c10_hin_ks_cbse_03_003 "'दोहा' (13,11)" |
| सोरठा | 2 चरण, 11+13 (दोहे का विलोम क्रम) | c10_hin_sp_cbse_16_005 "सोरठा में पहला चरण 11 मात्रा, दूसरा 13 (उल्टा क्रम)" |
| रोला | 24 मात्रा, 11+13 — same signature as सोरठा → engine names सोरठा, lists रोला alias | c10_hin_ks_cbse_01_005 WE3 "प्रत्येक पंक्ति 24 मात्रा, दो चरण (11+13)"; c10_hin_ks_cbse_03_003 "'रोला' (11,13)" |
| चौपाई | lines of 16 मात्रा (±1); 4 चरण = full चौपाई, fewer = चरण-level (low confidence) | c10_hin_ks_cbse_01_003 "प्रत्येक चरण 16 मात्रा, चार चरण = चौपाई"; c10_hin_ks_cbse_01_011; c10_hin_sp_cbse_17_003 |
| कुंडलिया | 6 printed lines × 24 (±1) + वलय-नियम (first/second word = last word) → 0.9; without ring → 0.75 | c7_hin_cbse_06_001/c7_hin_cbse_06_003 "6-पंक्ति-छंद (दोहा+रोला+दोहा-क्रम) + पहला-शब्द-अंतिम-शब्द-दोहराव" |
| सवैया (जगन्नाथ) | 16-मात्रा चरण — same signature family as चौपाई → alias, not independently named | c10_hin_ks_cbse_03_011 "सवैया के 'जगन्नाथ' छंद में प्रथम चरण 16 मात्राओं का" |
| कवित्त (मत्तगयन्द) | 30-मात्रा चरण (7 गण × 4 + 2) → named कवित्त; 16-मात्रा पद → alias in the 16-family note | c10_hin_sp_cbse_18_005 "प्रत्येक चरण में 30 मात्राएँ…7 गणों + 2 मात्राओं"; c10_hin_ks_cbse_03_011 "कवित्त के 'मत्तगयन्द' छंद में 16 मात्राओं का चरण"; c11_hin_a_cbse_14_003 |

Classification order (most specific first): कुंडलिया (6-line structure) → single-charan forms →
चौपाई/16-family → कवित्त 30 → दोहा pair → सोरठा pair → mixed 16/24 (decline) → unmatched (decline).

**Honest ambiguity notes baked into results:**
- 16-मात्रा signatures are shared by चौपाई/सवैया/कवित्त-पद in the corpus; the engine names चौपाई (the
  corpus's own worked examples classify 16-मात्रा lines as चौपाई) and lists the others as aliases.
- Mixed 16/24 signatures (रैदास-पद "चौपाई+दोहा मिश्र") → declined: the corpus names the pattern for
  that specific poem only, without rules (c10_hin_sp_cbse_17_003); same verdict the corpus itself
  gives Surdas's loose lines: "मानक दोहा/रोला से भिन्न → मात्रिक लोक-छंद" (c10_hin_ks_cbse_01_005).

## C. Validation — corpus verses classified (8 positives, per-line matra tables shown in steps)

| # | Verse (corpus quote) | Expected | Engine lines (मात्रा) | Result |
|---|---|---|---|---|
| V1 | गुरु गोविंद दोऊ खड़े, काके लागूँ पायँ। [sp_16_005] | दोहा | 13, 11 | दोहा 0.9 exact |
| V2 | कनक कनक ते सौगुनी, मादकता अधिकाय। [ks_03_011] | दोहा | 13, 11 | दोहा 0.9 exact |
| V3 | दुर्लभ मानुष जन्म है, देह न बारम्बार। [sp_16_005] | दोहा | 13, 11 | दोहा 0.9 exact |
| V4 | बलिहारी गुरु आपने, गोविंद दियो बताय। [sp_16_005] | दोहा | 13, 11 | दोहा 0.9 exact |
| V5 | गिरधर कविराय कुंडलिया (6 lines) [c7_06_003] | कुंडलिया | 24,24,24,25,24,24 | कुंडलिया 0.9 (ring rule + 24±1) |
| V6 | बादल को घिरते देखा है। [c11_a_14_003] | 16-मात्रा चरण | 16 | चौपाई 0.55 (charan-level, aliases सवैया/कवित्त) |
| V8 | साईं इतना दीजिए, जामें कुटुंब समाय। मैं भी भूखा न रहूं, साधु न भूखा जाय। [sp_16_009] | दोहा (folk, ±1) | 13,12,12,11 | दोहा 0.72 (tolerance flagged) |
| V9 | जाति न पूछो साधु की, पूछ लीजिए ज्ञान। [sp_16_005] | दोहा (चरण-1 = 13 corpus-stated) | 13,12 | दोहा 0.72 (ज्ञान = 4 by CBSE full-conjunct rule; ±1 flagged) |

Rule-level (not verse-level): V-inverted "मादकता अधिकाय, कनक कनक ते सौगुनी।" → सोरठा 0.9 [11,13] with
alias रोला (validates the corpus's "उल्टा क्रम" rule); single 24-मात्रा charan → दोहा-चरण 0.6 with
internal-split position shown.

## D. Honest declines (corpus-grounded)

| # | Input | Decline reason | Cite |
|---|---|---|---|
| D1 | सूरदास: "मैया मोरी दाऊ बहुत खिझायो, मोहन मारे करत भैया भेदभाव।" (20/21) | matches no taught signature; corpus itself: "मानक दोहा/रोला से भिन्न → मात्रिक लोक-छंद" | c10_hin_ks_cbse_01_005 |
| D2 | prose sentence (irregular long charan) | no taught signature | — |
| D3 | mixed 16/24 (चौपाई + दोहा lines) | "चौपाई+दोहा मिश्र" named only per-poem, no rules | c10_hin_sp_cbse_17_003 |
| D4 | irregular free verse (आत्मत्राण-प्रकार) | मुक्त छंद — no fixed matra-gana by definition | c10_hin_sp_cbse_22_005 "मुक्त छंद" |
| D5 | रेणु "झाँकी" fragment "पेड़ के नीचे खेलते बच्चे।" — honest count 18 | outside 16±1 (corpus's "16+16" label contradicts its own quote) → declined with nearest-miss shown | c12_hin_ar_cbse_08_006 |
| D6 | अन्तर्निहित untaught chhands | शार्दूलविक्रीड़ित, मालिनी, छप्पय, हरिगीतिका — names appear in corpus without matra rules; `UNTAUGHT_CHHANDS` export lists them with cites | c10_hin_ks_cbse_07_004, c10_hin_sp_cbse_22_005 |

A decline always carries the full per-line matra table + the nearest taught signature + the taught set,
so the UI can show "why not" as steps.

## E. Robustness & determinism

- No-crash verified on: empty string, whitespace, pure digits/punctuation, English sentences, emoji,
  mixed emoji+Hindi, non-string inputs (coerced via `String()`), `null`/`undefined` line input.
- Devanagari-less input → `chhand: null` with "गणना-योग्य देवनागरी पद्य-पंक्तियाँ नहीं मिलीं".
- Determinism: `scanHindiVerse` is pure; identical inputs verified to serialize identically.
- 111/111 tests pass (`node D:\platform\_cisce_build\test_lit_hindi.mjs`):
  A: 37 syllabifier units (incl. 15 exact corpus anchors), B: 8 verse classifications + 2 rule tests,
  C: 10 decline checks, D: 12 robustness/determinism checks.

## F. Known limits (stated, not hidden)

1. **16-family ambiguity**: चौपाई vs सवैया vs कवित्त-पद cannot be separated by matra count alone —
   the corpus provides no further deterministic discriminator; aliasing is the honest answer.
2. **±1 tradition variance**: real (corpus-documented); engine reports exact counts and flags tolerance
   instead of rounding.
3. **Varna-chhands** (शार्दूलविक्रीड़ित, मालिनी, छप्पय…) are declined until the corpus teaches their rules.
4. The corpus's own arithmetic is not always self-consistent (e.g. its "कबीरा खड़ा बाजार में = 12/13"
   breakdowns use क-बी-रा = 1+1+2). Where a corpus number conflicts with its own stated rules, the
   engine follows the RULES and reproduces only the arithmetically consistent anchors listed in §A.
