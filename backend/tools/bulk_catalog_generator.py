"""bulk_catalog_generator.py -- Gemini-drafted competency catalogs at scale.

One call per chapter: chapter text + schema/DSL spec + gold exemplar ->
catalog JSON draft -> DETERMINISTIC VALIDATION GATE -> staging folder.

Rate rule (user-set): NO key may be used twice within 60 seconds.  A
round-robin KeyPool enforces a per-key floor; with 39 keys sequential
generation never actually waits.

Staging: backend/its/competency/staging/<catalog filename>.  Subagent
review waves audit staged catalogs and promote (move) them into
backend/its/competency/ where the router auto-discovers them.

Usage:
    python -B backend/tools/bulk_catalog_generator.py --code iemh101
    python -B backend/tools/bulk_catalog_generator.py --book iemh --limit 5
    python -B backend/tools/bulk_catalog_generator.py --queue --limit 40
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import re as _re
import time
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from mine_ncert import _book_code, _subject_for  # noqa: E402

CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
KEYS_FILE = Path(r"D:\platform\.gemini_keys")
STAGING = Path(r"D:\platform\backend\its\competency\staging")
COMPETENCY = Path(r"D:\platform\backend\its\competency")
STATUS = Path(r"D:\platform\cbse_data\bulk_catalog_status.jsonl")

# user-set ladder: spread load across flash generations -- each model
# gets its own rate budget, so rotating per call multiplies throughput
MODELS = ["gemini-3.6-flash"]
_model_idx = 0


def next_model() -> str:
    global _model_idx
    m = MODELS[_model_idx % len(MODELS)]
    _model_idx += 1
    return m
KEY_FLOOR_SECONDS = 60.0
CALL_TIMEOUT = 300
PRIORITY_SUBJECTS = ["maths", "science", "physics", "chemistry", "biology",
                     "accountancy", "economics", "business_studies",
                     "applied_maths", "social_science"]

# --------------------------------------------------------------------- #
# Key pool: round-robin.  User directive 2026-09-08: floor removed,
# concurrent blast -- 12 workers x 39 keys x 6 models.
# --------------------------------------------------------------------- #

_POOL_LOCK = __import__("threading").Lock()


class KeyPool:
    def __init__(self, path: Path):
        self.keys = [k.strip() for k in
                     path.read_text(encoding="utf-8").splitlines()
                     if k.strip()]
        self.idx = 0

    def acquire(self) -> str:
        with _POOL_LOCK:
            key = self.keys[self.idx % len(self.keys)]
            self.idx += 1
            return key


def call_model(key: str, prompt: str, model: str,
               max_tokens: int = 32768) -> str:
    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{model}:generateContent?key={key}")
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"maxOutputTokens": max_tokens,
                             "temperature": 0.4},
    }).encode()
    req = urllib.request.Request(url, data=body,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=CALL_TIMEOUT) as resp:
        d = json.loads(resp.read())
    try:
        return d["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        raise RuntimeError(f"empty response: {json.dumps(d)[:200]}")


def generate_with_retry(pool: KeyPool, prompt: str) -> str:
    """Sequential with proper retries.  Models rotate PER CALL (each of
    3.6/3.5/3.1 carries its own rate budget), keys rotate with the 60s
    floor; 429/5xx waits then retries the next key+model pair."""
    last_err = None
    for attempt in range(14):
        model = next_model()
        key = pool.acquire()
        try:
            return call_model(key, prompt, model)
        except urllib.error.HTTPError as e:
            last_err = f"{model} HTTP {e.code}: {e.read()[:120]}"
            if e.code == 429:
                time.sleep(60)   # project-level quota: sustained waits
                continue
            if e.code in (500, 503, 504):
                time.sleep(15)
                continue
            time.sleep(3)
        except Exception as e:
            last_err = f"{model} {type(e).__name__}: {str(e)[:120]}"
            time.sleep(10)
    raise RuntimeError(f"all models failed; last: {last_err}")


# --------------------------------------------------------------------- #
# Prompt
# --------------------------------------------------------------------- #

PROMPT_TEMPLATE = """You are a CBSE curriculum cataloger. Read the NCERT chapter text below and produce ONE competency catalog JSON for it, following EXACTLY this schema (it powers a deterministic solver: a router embeds the concept text, an executor interprets solution_steps).

SCHEMA (output ONLY this JSON object, no markdown fences, no commentary):
{{
  "class": {cls}, "subject": "{subject}", "chapter": {chapter},
  "chapter_title": "...", "source_file": "{source_file}",
  "concepts": [
    {{"id": "{code}.SECTION.INDEX", "title": "...", "section": "...",
      "definition": "<AUTHOR the concept in your own words, 1-2 lines. NEVER copy the book's sentence -- NCERT text is board-owned. Capture the idea, not the wording.>",
      "formula": "<ASCII math, e.g. area = base x height>",
      "key_idea": "<one line>",
      "textbook_ref": "<file + rough line range>",
      "question_patterns": ["4-8 phrasings students use, varied verbs"],
      "solution_type": "compute" | "verify_property",
      "solution_steps": [
        {{"step": 1, "action": "...", "explain": "...",
          "compute": "<DSL expression>"}},
        ...
      ]}}
  ],
  "worked_examples": [
    {{"id": "ex1", "source_ref": "...", "concept": "<concept id>",
       "question_type": "...",
       "question_pattern": "... {{var}} ...",
       "extracted_variables": {{"var": "meaning"}},
       "solution_template": [same step objects as solution_steps]}}
  ],
  "exercises": [{{"id": "exN.N", "source_ref": "...", "questions": ["..."]}}]
}}

COMPUTE DSL (solution_steps "compute" fields) -- STRICT:
- arithmetic only: + - * / // % ** with parentheses; constants; names
- allowed names: the concept's variable slots (base, height, principal,
  rate, time, length, breadth, radius, ...) and pi
- allowed functions: sqrt, abs, max, min, sum
- MULTI-HOP CHAINS: a step may bind an output with "name = expr"
  (e.g. "area = base * height"), and LATER steps may reference that
  name (e.g. "cost = area * rate").  The LAST step's value is the answer.
- NEVER invent numbers inside compute -- only slot names and constants
  (like pi, 100, 9.8).  No 2-letter prose words as names.

RULES
- COPYRIGHT: definitions and key_ideas must be YOUR OWN WORDS -- never
  copy the book's sentences (NCERT is board-owned).  Formulas as ASCII
  math are facts: state them precisely.  question_patterns are your own
  phrasings.  Never invent sections or concepts the chapter lacks.
- 8-14 concepts for content-heavy chapters; fewer for light chapters.
- Every "compute" concept MUST have solution_steps with compute fields.
- MINIMUMS: at least 5 question_patterns per concept (vary the verbs);
  at least 2 worked_examples per compute concept.
- Ground each concept in the chapter: its domain terms must literally
  appear in the chapter text; if a section is absent from this part,
  do not invent it.
- NEVER use Python builtins (sum, len, max, min, abs, pi, sqrt) as
  variable names in compute expressions -- they are function names.
- ALL compute variable names must be lowercase (base, height, v_out --
  NEVER Kc, delta_T, E_deg_cell: uppercase symbols break the executor).
- chapter_title must use words from the file's OPENING (first 600
  characters) -- chapter banners may sit deeper in damaged files.
- ASCII only: no degree signs, unicode symbols, curly quotes or
  en-dashes anywhere in the JSON.
- id convention: "<code>.<section>.<index>" (e.g. "hemh.109.2.1") --
  one consistent scheme for the whole catalog.
- WRONG-ANSWER PREVENTION (critical):
  * If the answer is a PAIR, a fraction p/q, or a factorization
    ((x,y) coordinates, "3/4", "(2x+3)(x-1)") -- use solution_type
    "verify_property" with method steps.  A scalar compute terminal on
    those questions produces wrong answers.
  * extracted_variables values must be NUMBERS only -- never prose
    ("radius of circle in cm" is invalid; "r" with unit note is valid).
  * ONE operation family per compute concept: never mix multiply and
    add terminals in one concept; every question_pattern must be
    answerable by that concept's terminal compute.
  * Never write formulas with "or" chains ("a = x or b = y") -- state
    one target = one expression, or no "=" at all.
  * COPYRIGHT: never reuse 5+ consecutive words from the chapter in
    definitions or key_ideas -- reorder enumerations, ban boilerplate
    frames ("X is the process by which", "the rate at which").
  * COMPUTE terminals must produce a NEW derived value: never echo an
    input back, never bind a constant as an answer ("is_open = 1",
    "total = 4", "moles = moles" are all invalid).
  * Include a section-coverage check: every section in the chapter's
    table of contents appears as a concept (list any skipped).
  * CLASS CONTEXT in patterns: name the class-level topic explicitly
    ("in Class 7 light: lateral inversion") when the topic recurs
    across classes (respiration, sound, reproduction, vectors).
- verify_property concepts (proofs/properties) have steps WITHOUT compute.
- question_patterns must vary verbs: find / calculate / what is / how much.
- Output raw JSON only.

GOLD EXAMPLE (one concept, for style):
{{
  "id": "{code}.9.2.1", "title": "Area of a Trapezium",
  "section": "9.2.1",
  "definition": "A quadrilateral that has exactly one pair of sides running parallel to each other is called a trapezium.",
  "formula": "area = (1/2) x height x (side_a + side_b)",
  "key_idea": "Average of parallel sides times the distance between them.",
  "textbook_ref": "hemh109.txt lines 60-80",
  "question_patterns": ["find the area of a trapezium",
    "the parallel sides are ... and the distance ... find the area",
    "calculate the area of trapezium"],
  "solution_type": "compute",
  "solution_steps": [
    {{"step": 1, "action": "sum the parallel sides",
      "explain": "parallel sides are side_a and side_b",
      "compute": "side_sum = side_a + side_b"}},
    {{"step": 2, "action": "half the sum times height",
      "explain": "area uses the average of parallel sides",
      "compute": "area = height * side_sum / 2"}}
  ]
}}

CHAPTER TEXT ({chapter_file}):
<<<CHAPTER
{chapter_text}
CHAPTER
"""


def build_prompt(path: Path, code: str, cls: int, subject: str,
                 text: Optional[str] = None,
                 part_note: str = "") -> str:
    if text is None:
        text = path.read_text(encoding="utf-8", errors="ignore")
    chapter_num = re.sub(r"^\D+", "", path.stem) or "1"
    return PROMPT_TEMPLATE.format(
        cls=cls, subject=subject, chapter=int(re.sub(r"\D", "", chapter_num)
                                               or 1),
        source_file=str(path).replace("\\", "/"), code=code,
        chapter_file=path.name, chapter_text=text) + part_note


def split_chunks(text: str, size: int = 90_000) -> List[str]:
    """Split a huge chapter at section-header boundaries so no concept
    is cut in half; falls back to a hard split."""
    if len(text) <= size:
        return [text]
    header = re.compile(r"^\s*(?:\d+\.\d+\s|\d+\.\d+$|Chapter|CHAPTER)"
                        , _re.M)
    cuts = [0]
    pos = 0
    while pos < len(text):
        nxt = min(pos + size, len(text))
        if nxt >= len(text):
            cuts.append(len(text))
            break
        best = None
        for m in header.finditer(text, pos + size // 2, nxt):
            best = m.start()
        cuts.append(best if best and best > pos else nxt)
        pos = cuts[-1]
    return [text[a:b] for a, b in zip(cuts, cuts[1:]) if b > a]


# --------------------------------------------------------------------- #
# Validation gate (deterministic; no LLM)
# --------------------------------------------------------------------- #


def _extract_json(raw: str) -> Dict:
    t = raw.strip()
    t = re.sub(r"^```(?:json)?", "", t).strip()
    t = re.sub(r"```$", "", t).strip()
    i, j = t.find("{"), t.rfind("}")
    if i < 0 or j <= i:
        raise ValueError("no JSON object in response")
    return json.loads(t[i:j + 1])


def validate_catalog(cat: Dict, chapter_text: str) -> Tuple[bool, List[str]]:
    problems: List[str] = []
    chapter_lower = chapter_text.lower()
    concepts: List[Dict] = cat.get("concepts") or []
    for field in ("class", "subject", "chapter", "chapter_title",
                  "concepts", "worked_examples", "exercises"):
        if field not in cat:
            problems.append(f"missing top-level field '{field}'")
    # PRE-FLIGHT alignment: the detected title must match the file's own
    # opening -- catches wrong-file/mislabeled chapters before staging.
    # Devanagari words (3+ chars) are extracted too, else every Hindi
    # title silently skips this check (fabricated titles passed).
    title_words = [w for w in re.findall(
        r"[a-z]{4,}", str(cat.get("chapter_title", "")).lower())]
    title_words += re.findall(r"[\u0900-\u097F]{3,}",
                              str(cat.get("chapter_title", "")))
    opening = chapter_text[:1500].lower()
    if title_words and not any(w in opening for w in title_words):
        problems.append("chapter_title does not match the file opening: "
                        "wrong or mislabeled source file")
    # COPYRIGHT run-gate (deterministic, replaces LLM self-checks): any
    # 30+ alnum-char run shared between a definition/key_idea and the
    # chapter source is NCERT prose and must be rewritten.
    # Devanagari: one char ~ one syllable, so a 20-char exact window of
    # the Devanagari-only projection is the copy signal.
    src_alnum = re.sub(r"[^a-z0-9]+", " ", chapter_lower)
    src_dev = re.sub(r"[^\u0900-\u097F]+", "", chapter_text)
    for c in concepts:
        for fld in ("definition", "key_idea"):
            fld_alnum = re.sub(r"[^a-z0-9]+", " ",
                               str(c.get(fld, "")).lower())
            copied = False
            for run in re.findall(r"[a-z0-9][a-z0-9 ]{29,}", fld_alnum):
                run = run.strip()
                if len(run) >= 30 and run in src_alnum:
                    problems.append(
                        f"{c.get('id', '?')}: {fld} shares a 30+ char "
                        f"verbatim run with the source -- rewrite "
                        f"(author-first)")
                    copied = True
                    break
            if copied:
                continue
            fld_dev = re.sub(r"[^\u0900-\u097F]+", "",
                             str(c.get(fld, "")))
            for i in range(0, max(0, len(fld_dev) - 19)):
                if fld_dev[i:i + 20] in src_dev:
                    problems.append(
                        f"{c.get('id', '?')}: {fld} shares a 20+ char "
                        f"Devanagari verbatim run with the source -- "
                        f"rewrite (author-first)")
                    break
    if len(concepts) < 3:
        problems.append(f"only {len(concepts)} concepts")
    chapter_lower = chapter_text.lower()
    from backend.its.solver.catalog_executor import safe_eval
    for c in concepts:
        cid = c.get("id", "?")
        for field in ("id", "title", "definition", "formula", "key_idea",
                      "question_patterns", "solution_type",
                      "solution_steps"):
            if field not in c:
                problems.append(f"{cid}: missing '{field}'")
        if c.get("solution_type") not in ("compute", "verify_property"):
            problems.append(f"{cid}: bad solution_type")
        qps = c.get("question_patterns") or []
        if len(qps) < 3:
            problems.append(f"{cid}: <3 question_patterns")
        # TOPICAL grounding (copyright-safe): domain terms from the
        # title/formula must appear in the chapter -- proves the concept
        # belongs to this chapter WITHOUT requiring copied prose.
        # Devanagari terms (3+ chars) count too, else fully-Hindi
        # titles skip grounding entirely (fabrications passed).
        tgt = (str(c.get("title", "")) + " " +
               str(c.get("formula", ""))).lower()
        terms = [w for w in re.findall(r"[a-z]{5,}", tgt)
                 if w not in ("number", "numbers", "value", "values",
                              "using", "given", "find", "equation",
                              "chapter")]
        dev_terms = re.findall(r"[\u0900-\u097F]{3,}",
                               str(c.get("title", "")) + " " +
                               str(c.get("formula", "")))
        if terms and not any(t in chapter_lower for t in terms) \
                and not any(d in chapter_text for d in dev_terms):
            problems.append(f"{cid}: topical terms not grounded in chapter")
        elif not terms and dev_terms and \
                not any(d in chapter_text for d in dev_terms):
            problems.append(f"{cid}: Devanagari title terms not grounded "
                            f"in chapter")
        # DSL typecheck every compute expression
        for s in c.get("solution_steps") or []:
            expr = s.get("compute")
            if not expr:
                continue
            expr = re.sub(r"^\s*\w+\s*=\s*", "", str(expr).strip())
            try:
                env = {name: 1.0 for name in
                       re.findall(r"[a-z_][a-z0-9_]*", expr.lower())
                       if name not in ("pi", "sqrt", "abs", "max", "min",
                                       "sum", "len")}
                env.update({n: 1.0 for n in
                            ("pi", "sqrt", "abs", "max", "min", "sum",
                             "len")})
                safe_eval(expr, env)
            except Exception as e:
                problems.append(f"{cid}: bad compute '{str(expr)[:40]}' "
                                f"({e})")
    return (not problems), problems


# --------------------------------------------------------------------- #
# Runner
# --------------------------------------------------------------------- #


def chapter_queue(subjects: List[str], min_cls: int = 6,
                  max_cls: int = 12) -> List[Tuple[Path, str, int, str]]:
    queue = []
    for f in sorted(CACHE.glob("*.txt")):
        hit = _book_code(f.stem)
        if not hit:
            continue
        code, cls = hit
        if not (min_cls <= cls <= max_cls):
            continue
        subject = _subject_for(code, cls)
        if subject not in subjects:
            continue
        queue.append((f, code, cls, subject))
    queue.sort(key=lambda t: PRIORITY_SUBJECTS.index(t[3]))
    return queue


def run(code_filter: Optional[str], book: Optional[str], limit: int,
        queue_mode: bool) -> None:
    pool = KeyPool(KEYS_FILE)
    STAGING.mkdir(parents=True, exist_ok=True)
    STATUS.parent.mkdir(parents=True, exist_ok=True)

    if queue_mode:
        chapters = chapter_queue(PRIORITY_SUBJECTS)
    else:
        chapters = []
        for f in sorted(CACHE.glob("*.txt")):
            hit = _book_code(f.stem)
            if not hit:
                continue
            if code_filter and f.stem == code_filter:
                chapters.append((f, hit[0], hit[1],
                                 _subject_for(hit[0], hit[1])))
            elif book and f.stem.startswith(book):
                chapters.append((f, hit[0], hit[1],
                                 _subject_for(hit[0], hit[1])))

    # CONCURRENT BLAST (user directive 2026-09-08): 12 workers, no key
    # floor, 1s dispatch gap.  Each chapter is independent; claims are
    # locked so no chapter runs twice.
    import threading
    from concurrent.futures import ThreadPoolExecutor

    done_counter = [0]
    done_lock = threading.Lock()
    io_lock = threading.Lock()
    claimed = set()

    def work(item) -> None:
        path, code, cls, subject = item
        digits = path.stem[4:]
        out_name = f"catalog_class{cls}_{subject}_ch{digits}.json"
        staged = STAGING / out_name
        live = COMPETENCY / out_name
        with done_lock:
            if path.stem in claimed or staged.exists() or live.exists():
                return
            claimed.add(path.stem)
        full_text = path.read_text(encoding="utf-8", errors="ignore")
        if len(full_text) < 2000:
            return   # empty/degenerate source cache: nothing to catalog
        chunks = split_chunks(full_text)
        status = {"code": path.stem, "class": cls, "subject": subject,
                  "out": out_name, "chunks": len(chunks)}
        try:
            cat = None
            for ci, chunk in enumerate(chunks, start=1):
                note = ""
                if len(chunks) > 1:
                    note = ("NOTE: this is PART " + str(ci) + " of "
                            + str(len(chunks)) + " of the chapter. "
                            "Catalog ONLY the concepts, worked examples "
                            "and exercises that appear in THIS part. "
                            "Use section numbers as they appear.")
                prompt = build_prompt(path, code, cls, subject,
                                      text=chunk, part_note=note)
                raw = generate_with_retry(pool, prompt)
                part = _extract_json(raw)
                if cat is None:
                    cat = part
                else:
                    seen = {c.get("id") for c in cat.get("concepts", [])}
                    for c in part.get("concepts", []):
                        if c.get("id") not in seen:
                            cat["concepts"].append(c)
                            seen.add(c.get("id"))
                    for we in part.get("worked_examples", []):
                        we["id"] = f"p{ci}_" + str(we.get("id", ""))
                        cat.setdefault("worked_examples", []).append(we)
                    for ex in part.get("exercises", []):
                        ex["id"] = f"p{ci}_" + str(ex.get("id", ""))
                        cat.setdefault("exercises", []).append(ex)
            ok, problems = validate_catalog(cat, full_text)
            if not ok:
                status.update(status="GATE_FAIL", problems=problems[:6])
                # SALVAGE PATH: stage the failed draft with its problems
                # embedded so reviewer agents can fix-and-promote instead
                # of the chapter being lost to blind retries
                gf = STAGING / "gatefail"
                gf.mkdir(parents=True, exist_ok=True)
                cat["gate_problems"] = problems[:8]
                cat["gate_status"] = "GATE_FAIL"
                (gf / out_name).write_text(
                    json.dumps(cat, indent=1, ensure_ascii=False),
                    encoding="utf-8")
            else:
                cat["source_file"] = str(path).replace("\\", "/")
                cat["license"] = "NCERT-derived; author-first rendered"
                cat["provenance"] = "gemini flash draft; gate-validated; review pending"
                staged.write_text(json.dumps(cat, indent=1, ensure_ascii=False),
                                  encoding="utf-8")
                status.update(status="STAGED",
                              concepts=len(cat.get("concepts", [])))
        except Exception as e:
            status.update(status="ERROR", error=str(e)[:160])
        with io_lock:
            with open(STATUS, "a", encoding="utf-8") as f:
                f.write(json.dumps(status) + "\n")
            print(json.dumps(status), flush=True)
            done_counter[0] += 1

    pending = []
    for path, code, cls, subject in chapters:
        digits = path.stem[4:]
        out_name = f"catalog_class{cls}_{subject}_ch{digits}.json"
        staged = STAGING / out_name
        live = COMPETENCY / out_name
        if staged.exists() or live.exists():
            continue
        pending.append((path, code, cls, subject))
    print(f"chapters to draft: {len(pending)}", flush=True)
    if limit:
        pending = pending[:limit]
    workers = min(6, len(pending)) if pending else 0   # quota-safe
    if workers:
        with ThreadPoolExecutor(max_workers=workers) as ex:
            list(ex.map(work, pending))
            time.sleep(1)   # dispatch gap
    print(f"processed {done_counter[0]}", flush=True)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--code")
    ap.add_argument("--book")
    ap.add_argument("--queue", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    a = ap.parse_args()
    run(a.code, a.book, a.limit, a.queue)
