# DOODLECARD LAUNCH QUEUE — rolling plan (fire each brief the moment a slot frees)

GOAL: 6 DoodleCard agents generating hand-drawn-style educational cards for
every node, classes 6-12, at the reference quality (ChatGPT Newton's Third
Law example: cream background, hand-lettering, colored highlights, numbered
steps with arrows, Remember box).

QUALITY BAR (binding, from the reference image):
- Cream paper background, hand-lettered style fonts (Caveat / Patrick Hand),
  colored section banners, star/doodle decorations, highlight boxes on key
  terms, numbered step flows with arrows, "Remember" checklist box
- Card structure per node (1:1 with the node schema):
  1. Title banner: node title (star + colored banner)
  2. Definition quote box ("what it means")
  3. "How it works in N steps": walkthrough steps as numbered flow with arrows
  4. "Remember" box: key points + the node's misconception correction
  5. Footer: node id + class/subject chip
- ZERO-WRONG LAYERING (non-negotiable): AI-generated art (if any) is
  background/decoration ONLY with strict no-text prompts; ALL text is
  rendered programmatically from the node's verified authored content.
  A generated image never carries generated facts.
- Consistency: one style guide, one family — every card must look like a
  page from the same notebook.

## LAUNCH SEQUENCE (as slots free, in this order)
1. FIRST FREE SLOT: COMPILER (per COMPILER_LAUNCH_BRIEF.md — unchanged)
2. NEXT: DOODLE-BUILDER + CLASS 12 (all subjects, ALL 3,255 nodes)
3. NEXT: CLASS 11 (3,166 nodes)
4. NEXT: CLASS 10 (636)
5. NEXT: CLASS 9 (406)
6. NEXT: CLASS 8 (550)
7. THEN: CLASS 7 (575) and CLASS 6 (420) — as further slots free
End state: up to 6 DoodleCard agents, one per class, ~9,010 cards.

## DOODLE-BUILDER BRIEF (step 2 — builds the pipeline + generates class 12)
- Build frontend/components/doodle/DoodleCard.tsx: the HTML/SVG card template
  (React, fonts via globals: Caveat + Patrick Hand; cream bg #FDF6E3; gold
  accents matching Atlas; highlight-marker effect via linear-gradient spans;
  doodle SVG decorations inline — arrows, stars, underlines)
- Build the capture pipeline: script tools/export_doodle_cards.mjs rendering
  each card to PNG (playwright/puppeteer — install if absent) into
  content/doodle_cards/class<N>/<node_id>.png + index JSON
- Content source: backend/_cache/enhanced_nodes_index.json (definition,
  walkthrough, diagnostics, misconception) — text VERBATIM from the node
- Then generate ALL class-12 cards (3,255 nodes; cluster review: any node
  with <3 walkthrough steps gets its definition as the quote + diagnostics
  as the Remember facts)
- Gates: 5 sampled cards visually checked (text legible, no overflow,
  Devanagari renders, style matches reference), all PNGs exist, index complete
- DO NOT TOUCH: other agents' files

## PER-CLASS AGENT BRIEF (steps 3+ — identical except the class)
- Use the DoodleCard component + export pipeline from step 2 (they exist by
  then); generate ALL cards for your class; spot-verify 10 per subject;
  Devanagari byte-safe; no file outside content/doodle_cards/class<N>/ and
  your index

## INTEGRATION (ZCode, after the wave)
- Tutor teach phase for prose subjects serves the card image
- /notes gallery route per chapter (view + download)
- Cards feed the share surface (chapter notes downloads)
