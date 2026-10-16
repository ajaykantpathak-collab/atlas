# CONTENT AUTHORING SPEC — for new/missing Atlas chapters

Writers: follow this exactly and your content ingests into Atlas automatically
(parser → fidelity verification → index → live on the app). One md file = one
teaching node (≈ one topic, 15–40 min of learning).

## File naming
`<class>_<subject>_cbse_<chapter>_<serial>.md`
Examples: `c9_math_cbse_ch6_001.md`, `c9_sst_cbse_ch2_003.md`, `c10_hin_cbse_ch1_001.md`
- class: 6–12 · subject codes in use: math, phy, chem, bio, sst, his, civ, geo,
  eco, eng, engl, gram, comp, acc, bs, cs, ip, psy, hin (use existing codes for
  the subject you're filling — check a sibling file)
- Place files in the folder for your class/subject (mirror an existing sibling's
  folder path).

## Required sections (## headers, exactly these)
```
## ELI5                     — 2–4 plain-language sentences ("In simple words: …")
## DEFINITION               — the core teaching content, complete and exam-accurate
## COGNITIVE_LEVEL          — remember / understand / apply / analyse
## MASTERY_CRITERIA         — "a student has mastered this when …" (2–4 bullets)
## SCOPE_BOUNDARY           — what this topic does NOT cover (prevents drift)
## WALKTHROUGH              — step-by-step teaching, numbered ("1. … 2. … 3. …")
## DIAGNOSTIC_QUESTION_1..N — N ≥ 6 (aim 10–12); one per ## DIAGNOSTIC_ANSWER_N
## DIAGNOSTIC_ANSWER_1..N   — the exact correct answer (verbatim-matched)
## COMMON_MISCONCEPTION     — the classic wrong belief + the correction
## ON_FAILURE               — what the app shows when the student fails
## WORKED_EXAMPLE           — PROBLEM: … STEPS: … REASONING: … ANSWER: …
## PREREQUISITE_NODE_IDS    — ids of earlier nodes this one builds on
```

## Quality gates (enforced automatically on ingestion)
1. Every word ≥4 chars and every number in derived content must exist in the file
2. Diagnostic answers must be self-consistent (no ambiguous items, no repeats)
3. No node ids leaking into student-facing text
4. Class/subject must match the NCERT syllabus for that grade — this audit's
   finding was wrong-grade content; get the grade mapping right at authoring time

## Priority order (from CURRICULUM_GAPS.md)
1. Class 9 maths missing chapters: Triangles (congruence), Quadrilaterals,
   Lines & Angles, Statistics, Surface Areas & Volumes
2. Class 9 SST correct books: History (French Revolution → Nazism),
   Geography (India-focused), Economics (Palampur, People as Resource)
3. Class 9/12 English: Beehive + Moments (current texts are retired ones)
4. Class 12 Economics remaining chapters, Class 11 History themes,
   Class 12 Pol-Sci (3), HEFS (~11)
5. Hindi subjects for Classes 6–10 · Legal Studies (source TBD) · Applied Maths
