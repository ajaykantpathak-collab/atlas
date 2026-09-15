# DRAFTER BRIEF -- NCERT chapter catalog drafter (Class 12 wave)

You are drafting competency catalogs for a deterministic K-12 CBSE solver
at D:\platform. Zero-wrong rule: catalogs teach concepts and methods
(facts -- fine); student-facing text must be author-first (copyright --
NCERT prose must not ship near-verbatim). No LLM calls inside any code
you write; you may read chapters and author JSON yourself.

## YOUR TASK
For EACH chapter file in your assignment (text files under
D:\node_generator\ncert-mcp\data\processed\text_cache_new\):
1. Read the full chapter text.
2. Identify the distinct mathematical/scientific concepts taught
   (typically 5-12 per chapter).
3. Produce ONE catalog JSON per chapter:
   backend\its\competency\catalog_class12_{subject}_{chapterfile}.json
   (e.g. catalog_class12_maths_lemh101.json -- one file per chapter,
   named after the cache file stem).
4. SELF-VALIDATE before delivering (see below), then move on to the next
   chapter. One chapter at a time.

## SCHEMA (exact)
{
  "class": 12, "subject": "<maths|physics|chemistry|biology|accountancy|economics|business_studies>",
  "chapter": <int>, "chapter_title": "<from the book's opening>",
  "source_file": "<full path of the chapter text file>",
  "license": "NCERT-derived; author-first rendered",
  "concepts": [
    {"id": "<bookcode>.<chapterNN>.<section>.<index>",
     "title": "...", "section": "...",
     "definition": "<AUTHOR the idea in your own words, 1-2 lines. NEVER copy the book's sentence.>",
     "formula": "<ASCII math: one target = one expression. No 'or' chains.>",
     "key_idea": "<one line, own words>",
     "textbook_ref": "<file + rough location>",
     "question_patterns": ["5+ phrasings students use, varied verbs"],
     "solution_type": "compute" | "verify_property",
     "solution_steps": [
       {"step": 1, "action": "...", "explain": "...",
        "compute": "<DSL expr>"}   // optional, only for compute concepts
     ]}
  ],
  "worked_examples": [...],
  "exercises": [{"id": "...", "source_ref": "...", "questions": [...]}]
}

## COMPUTE DSL (STRICT)
- + - * / // % ** with parentheses; names; pi; functions sqrt abs max min sum
- ALL variable names LOWERCASE (height, principal, v_out -- NEVER Kc,
  delta_T, E_deg_cell: uppercase breaks the executor)
- NEVER use builtins (sum len max min abs sqrt pi) as variable names
- MULTI-HOP: a step may bind "name = expr"; later steps reference name.
  The LAST step's value is the answer.
- NEVER echo an input back or bind a constant as an answer.
- If the answer is a PAIR, fraction p/q, or factorization -- use
  solution_type "verify_property" (a scalar compute would be wrong).

## COPYRIGHT (author-first)
- Definitions/key_ideas: your own words. NEVER reuse 5+ consecutive
  words from the chapter. Ban frames like "X is the process by which".
- Formulas as ASCII math are facts -- state them precisely.
- question_patterns are your own phrasings.

## SELF-VALIDATION (mandatory before writing each file)
1. Schema: all fields present, concepts >= 3, patterns >= 5/concept.
2. Every compute expression evaluates: run
   python -B -c "import sys; sys.path.insert(0, 'backend/tools'); sys.path.insert(0, '.'); from backend.its.solver.catalog_executor import safe_eval; ..."
   with mock env (all names -> 1.0 + pi/sqrt/abs/max/min/sum/len) -- must not raise.
3. Run the platform gate:
   python -B -c "import sys; sys.path.insert(0, 'backend/tools'); sys.path.insert(0, '.'); from bulk_catalog_generator import validate_catalog; import json; ..."
   validate_catalog(cat, chapter_text) must return ok=True (source_file = your chapter path).
4. Routing smoke: 2 patterns through
   backend.its.solver.competency_engine.route_concept -- top concept should
   be in this catalog (score >= 0.4). Log failures, adjust patterns.

## NAMING AND DELIVERY
- Write the catalog to backend\its\competency\ directly (it is live on
  delivery -- that is why self-validation is mandatory).
- Filename: catalog_class12_{subject}_{chapterstem}.json

## CONSTRAINTS
- NEVER write regex through shell heredocs (transport corrupts \b into
  backspace bytes). Edit/Write tools only.
- After writing any .py file run:
  python -c "import pathlib; [print(p) for p in pathlib.Path('backend/its/competency').rglob('*.py') if chr(8) in p.read_text(encoding='utf-8')]"
- Do not touch solver code, other agents' catalogs, or question_bank.db.
- One chapter at a time. Quality over speed.

## UPDATE 2026-09-09 (binding for all current and future drafters)
1. LANGUAGE SUBJECTS ARE OUT OF SCOPE. Hindi, English, Sanskrit, Urdu,
   French literature catalogs are discontinued: literature answers are
   interpretive and cannot be verified deterministically (zero-wrong
   policy). The router no longer loads them (LANGUAGE_CATALOGS=1 env
   re-includes for audit only). Do not write or repair language catalogs.
2. DELIVERY NOW GOES TO STAGING, NOT LIVE:
   backend\its\competency\staging\catalog_class{n}_{subject}_{stem}.json
   The coordinator audits and assembles. Do not write to
   backend\its\competency\ directly.
3. GATE IS DEVanagari-AWARE NOW: validate_catalog enforces the title
   pre-flight, the 20+ char Devanagari verbatim-run check, and Devanagari
   topical grounding in addition to the Latin checks. Fabricated or
   copied Hindi passed the old gate; it will not pass this one.
4. PREFER compute OVER verify_property for STEM: every concept with a
   deterministically computable answer (quantities, conversions, counts,
   probabilities, structural evaluation) must use solution_type=compute
   with a multi-hop DSL chain. verify_property is only for genuinely
   qualitative concepts.
5. THIN SOURCES: if a chapter file is <3KB or contains only front matter,
   do not fabricate content to pass the gate -- SKIP the chapter and
   report it in your final message.
