# LIT_ENGLISH_ENGINE — the English literature engines (wave H1)

> Files: `deploy/frontend/lib/lit/englishMeter.ts`, `deploy/frontend/lib/lit/formatCheck.ts`,
> `deploy/frontend/lib/lit/index.ts` (+ compiled `.mjs` twins of each).
> Harness: `_cisce_build/test_lit_english.mjs` — **181 checks, ALL GREEN**
> (includes TS↔.mjs twin parity: every fixture produces byte-identical output
> from the `.ts` source and the compiled `.mjs`).
> Mirror: `frontend/lib/lit/*` byte-identical (cmp-verified).
> Note: `lib/lit/index.ts` / `index.mjs` are shared with the Hindi chhand
> engine (wave H1) — the merged file exports both engines; the Hindi exports
> are untouched.

Deterministic only: rule tables + regex + edit distance. No LLM, no network,
no invented poems or formats. Both engines follow the spirit of
`SOLVER_STEP_CONTRACT.md`: every result carries `steps`
(method line → per-item evidence → verification → interpretation), declines
honestly, and never leaks node ids into student-facing strings.

---

## 1. `scanEnglishPoem(text)` — the metre scanner

### Pipeline

1. **Tokenise** — lines → stanzas (blank-line split); words cleaned to
   letters + internal apostrophes (emoji/Hindi tolerated, never crash).
2. **Syllables** — irregular dictionary first, then vowel-group heuristic:
   - irregular dictionary (~200 entries): the commonest irregulars in the
     corpus poems + function words. Poetic scansion values fixed by the
     corpus poems themselves: `fire`=1 (Frost's "…end in fire" scans 8),
     `every`=2, `hour`=1, `flower`=2, `buried`=2, `rued`=1, `quiet`=2,
     `poem`=2, `idea`=3, `symmetry`=3, `dissatisfied`=4 …
   - heuristic: `[aeiouy]+` vowel groups; +1 for medial hiatus
     (io/ia/eo/ua/uo/iu) except -tion/-sion/-cial/-tial and n+io (opinion);
     −1 silent final `e`; +1 for consonant+`le`; −1 for `-ed` unless stem ends
     t/d or a vowel (carried=2, tried=1); −1 for `-es` unless after a
     sibilant (boxes=2, makes=1); contraction tails stripped (I've→i).
3. **Stress** — per word, one of:
   - scansion override table (~70 scansion-critical words: `tyger`=/x,
     `immortal`=x/x, `diverged`=x/, `hemlock`=/x, `destruction`=x/x …),
   - function words (≈100, incl. contractions "i've/don't" and archaic
     "thy/thine/doth") → all unstressed,
   - suffix shift rules: stress the syllable before -tion/-sion, -ic, -ity,
     -ify/-ical/-ious/-eous/-ial/-ian; -y antepenult rule (des·ti·ny),
   - defaults: 2 syl → first; longer → antepenult.
4. **Beat promotion** — when 3+ unstressed syllables pile up before a stress
   ("in the FOR-ests **OF** the NIGHT"), the stress moves one seat earlier
   (the preposition is promoted) — the standard scansion repair, deterministic.
5. **Foot classification** — the line's stress pattern (e.g. `x/x/x/x/`) is
   matched against canonical foot templates by weighted edit distance:
   iamb `x/`, trochee `/x`, anapest `xx/`, dactyl `/xx`, with the English
   licences: initial inversion (`/x x/`), catalexis (`/x /x /`), feminine
   endings, anacrusis. Weighting rules:
   - deleting the pattern's FIRST syllable costs 1.6 (weak evidence),
   - triple-meter readings carry a 2.5× scepticism penalty (the taught
     anthology is entirely duple — Frost iambic, Blake trochaic; near-exact
     triples still win because 0 × 2.5 = 0),
   - ties prefer a template whose length equals the pattern (pure
     substitution > deletion), then iambic, then fewer feet.
6. **Two-pass poem verdict** —
   - Pass 1: only "strict" lines (best reading beats every alternative family
     by ≥ 0.5 cost) vote, weighted by fit.
   - Pass 2: ambiguous lines (e.g. `xx/x/` — iambic in Frost, trochaic in
     Blake) resolve to the poem's dominant family when one of their
     alternatives matches; per-line fields are rewritten and `alts` keeps the
     honest alternative readings.
   - Final family = fit-weighted argmax over the resolved tally; feet range =
     dominant count + "with <other> lines"; confidence =
     share × (0.6 + 0.4 × avgFit).
7. **Approximate rhyme** — spelling-based per stanza (last vowel group, final
   silent-e excluded, `ue`→`oo`, doubled letters collapsed). Labelled
   "spelling rhyme (approximate)" in the steps; misses are allowed (heart/part
   needs phonetics).
8. **Steps** — method line, rule line, per-line
   `Line "…" → N syllables → pattern … → iambic trimeter` (first 12 lines,
   full breakdown in `stanzas`), verification (share/fit/rhyme),
   interpretation.

### Verdicts and declines

| Condition | Result |
|---|---|
| empty input | declined `"empty"` |
| < 2 verse lines | declined `"too_short"` |
| avg > 15 words/line or any line > 25 words | declined `"prose_like"` |
| ≥ 70% of lines fit dominant family | `regular_meter` |
| 50–70% | `mixed_meter` |
| < 50%, or wildly varying lines (range ≥ 8 syllables with share < 85%, or average ≥ 11 syllables with range ≥ 6) | `free_verse` (confidence 0, honest notes) |

### Corpus validation (what the scanner ACTUALLY says)

All five poems are corpus-taught; texts tested are the public-domain
canonicals (Frost 1916/1920/1923, Blake 1794, Whitman 1855). Copyrighted
corpus poems (Amanda, The Ball Poem) are deliberately NOT embedded — no
invented texts.

| Poem | Corpus anchor | Syllables/line (as counted) | Scanner verdict | Confidence | Rhyme |
|---|---|---|---|---|---|
| Dust of Snow (Frost) | First Flight; analysis method in `c10_hin_sp_cbse_19_007`, c11 eng_w poetry nodes | 4,4,4,5 / 5,4,4,6 | `regular_meter` — **iambic dimeter (with trimeter lines)** | 0.83 | ABAB / ABCB |
| Fire and Ice (Frost) | First Flight (same anchors) | 8,4,8,8,8,8,8,4,4 | `regular_meter` — **iambic tetrameter (with dimeter lines)**, all 9 lines iambic | 0.94 | ABAA / ABACA |
| The Road Not Taken (Frost) | `c12_eng_k_cbse_13_007` (quotes), c11 eng_w/eng_h nodes | 9,9,8,9,9 / 9,9,10,8,9 | `regular_meter` — **iambic tetrameter** (8/10 lines clean iambs) | 0.73 | ABACD / ABCDE |
| The Tyger (Blake) | 10 ICSE/ISC nodes incl. `c12_eng_k_cbse_08_003` | 7,7,7,8,7,6,7,7 | `regular_meter` — **trochaic tetrameter (with dimeter and trimeter lines)** (catalectic lines land at 6–7 syllables) | 0.71 | AABC / ABCC |
| Animals (Whitman) | 4 ICSE nodes (`c10_eng_icse_15_007` …) + First Flight | 9–22 (range 13) | **`free_verse`**, confidence 0, note explains long varied lines | 0 | all distinct (no rhyme) |

**On the Dust of Snow hypothesis:** the tasking hypothesised "tetrameter/
trimeter iambic". The scanner does NOT confirm tetrameter: the syllable counts
(4–6) look tetrameter-ish, but the stress analysis gives 2–3 beats per line
("the WAY a CROW" = 2 iambs), so it reports **iambic dimeter (with trimeter
lines)**. This matches the standard scholarly description of the poem (iambic
dimeter/trimeter) and is the honest reading. The Tyger correctly lands on
trochaic tetrameter, and Whitman correctly on free verse.

**Known limitations (documented, not hidden):** stress estimates for
function-word-heavy lines undercount beats (the engine's per-line table is
the evidence, not a promise); triple meters are penalised by design (duple
anthology); spelling rhyme misses sound-rhymes with different spellings;
`fire`/`every` class words are dictionary-fixed to their poetic values.

---

## 2. `checkWritingFormat(text, format)` — the writing format-checker

### Scope (honest)

Deterministic rubric beats ONLY — scaffold presence/absence + WHERE found
(line number + matched snippet). **No quality judgement of prose**: no
grammar, style, truth or content scoring. Format ids:
`formal_letter`, `informal_letter`, `article`, `report`, `notice`, `story`
(case/space/dash-insensitive). Anything else is declined with the taught list
(`essay`, `diary`, `email` etc. → `unknown_format`; email IS taught in ICSE
`c9_eng_icse_03_003` but is out of scope for this wave's six formats).

### Rubrics (grounded in the corpus)

Sources: ICSE letter skeleton `c10_eng_icse_02_001` (7 mandatory parts;
sender address optional in informal letters), register rules
`c10_eng_icse_02_002` (Yours faithfully/sincerely vs With love; "never Hey in
a formal letter"), notice+email layout `c9_eng_icse_03_003` (≤50 words),
composition template `c9_eng_icse_01_001` (opening/body/closing ¶s),
CBSE writing-skills nodes (`c11_eng_h_cbse_04_014`,
`c12_eng_f_cbse_01_014`) for article/report conventions.

| Format | Mandatory beats | Optional beats | Word band |
|---|---|---|---|
| formal_letter | sender's address, date, receiver's address, subject line, formal salutation, ≥2 body paragraphs, complimentary close, signature/name, word band 100–150 | formal register (no Hey/Hi) | 100–150 |
| informal_letter | date, informal salutation (Dear <name>), ≥2 body paragraphs, informal closing (With love / Yours lovingly / …), signature, word band 90–150 | sender's address (explicitly optional per corpus), no formal apparatus (no Subject / Respected) | 90–150 |
| article | title, byline (By <name>), intro ¶, body development ¶, conclusion ¶ (structural) | — | 100–150 (reported) |
| report | headline, byline, place–date line ("New Delhi, 14 November 2024:"), past-tense lead (was/were/ed event verbs), ≥2 body paragraphs | — | 90–150 (reported) |
| notice | issuing body (school/organisation), `NOTICE` heading, date, notice title, what–when–where body (time + venue refs), writer's name + designation, word limit ≤50 | — | 30–50 (enforced) |
| story | title, opening ¶ (scene), plot ¶, ending ¶ (structural), word band 120–250 | past-tense narration (≥3 markers, counted not judged) | 120–250 |

Every beat: `present | missing | absent_ok` + 1-based line + evidence snippet
+ the rule it implements. `ok` = zero missing mandatory beats. Result carries
`steps` (method → per-beat FOUND/MISSING with rule → verification
(n/mandatory + word band) → interpretation naming the missing beats) and
word/paragraph counts. Optional-beat violations never fail the check —
register hints are advisory by design.

### Validation (harness cases)

- GOOD formal letter (114 words) → ok, 0 missing; sender line 1, subject,
  "Respected Sir/Madam", "Yours faithfully" all located by line.
- BROKEN formal letter → ok=false; Date, Subject, salutation, close, body ¶s
  all flagged MISSING with their rules.
- GOOD informal letter (96 words) → ok; "With love" close found; sender
  address optional-present.
- BROKEN informal letter (formal register) → ok=false; Date + Informal
  closing missing.
- GOOD article → ok; title line 1, "By Aditi Verma", intro/body/conclusion.
- GOOD report → ok; place–date line, past-tense lead at line 5.
- GOOD notice (46 words ≤ 50) → ok; all 7 beats.
- BROKEN notice → ok=false; NOTICE heading, what–when–where, designation
  (and word band) missing.
- GOOD story → ok; title/opening/plot/ending + past-tense narration.
- Declines: `essay`/`diary` → unknown_format (steps list the taught six);
  empty text → empty (with the format still named).

---

## 3. Public API (`lib/lit/index.ts`)

```ts
import { scanEnglishPoem, checkWritingFormat } from "@/lib/lit";
// merged with the Hindi engine: scanHindiVerse, TAUGHT_CHHANDS, …
```

- `scanEnglishPoem(text: string): MeterResult`
- `countSyllables(word: string): number`
- `checkWritingFormat(text: string, format: string): FormatCheckResult`
- `TAUGHT_FORMATS`, `FORMAT_LABELS` (+ all result types exported)

## 4. Harness & numbers

- `node --no-warnings _cisce_build/test_lit_english.mjs` → **181 passed, 0 failed**.
- Coverage: 46 syllable unit cases (irregular dictionary + heuristic repairs),
  5 corpus poems (per-line syllable tables asserted exactly), 9 format cases,
  7 decline cases, 12 junk/Hindi/emoji no-crash probes, 11 step-contract
  assertions, 17 TS↔.mjs parity deep-equality checks.
- Zero dependencies; runs as plain ESM (`.mjs` twins) or type-stripped `.ts`.
