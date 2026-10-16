"""insert_generator_variants.py -- WS2 practice-pool expansion (gen).

Generates parametrized variants through the platform's OWN generator
adapters (the exact QuestionSelector integration path used live by
diagnostics/practice), validates every item structurally, and inserts the
passing ones into board_questions (source_type='generator').

Structural zero-wrong gate per item (BUGS.md B02 bug-class):
  * options: 2..6 non-empty, unique (case-insensitive)
  * correct_answer EXACTLY equal to one option
  * question != answer, no none/nan/null options, no node-id tokens
  * dedupe within (subject, grade) and against DB (source_file, text)

Node ids never surfaced (node_tags=[]). Hindi subjects excluded.
Idempotent: (source_file, question_text) dedup like extract_node_questions.
"""
import argparse
import asyncio
import sys

MAX_SEEDS_PER_QTYPE = 120
MAX_ROWS_PER_SUBJECT_GRADE = 300
DIFFS = [0.35, 0.5, 0.65, 0.8]

#: question_type aliases applied at ingestion (WS-E 2026-10-10): the
#: adapters emitted a stray "fill_blank_type" value that is the SAME
#: serving shape as "fill_blank" (10 legacy rows already in the table;
#: both ride the identical grading path).  Normalize at insert so the
#: question_type domain stops growing near-duplicates.
QTYPE_ALIASES = {
    "fill_blank_type": "fill_blank",
}


def normalize_qtype(qt) -> str:
    """Map an adapter question_type onto the canonical domain."""
    s = str(qt or "").strip().lower()
    return QTYPE_ALIASES.get(s, s)

#: api subject -> board_questions subject code (matches _CORPUS_SUBJECTS
#: aliases so the selector's corpus queries actually serve these rows)
SUBJECTS = {
    "mathematics": "math",
    "physics": "phy",
    "chemistry": "chem",
    "biology": "bio",
    "computer_science": "cs",
    "economics": "eco",
    "accountancy": "acc",
    "business_studies": "bs",
    "psychology": "psy",
    "biotechnology": "biotech",
    "geography": "geo",
    "history": "hist",
    "civics": "civ",
    "english": "engl",
}
GRADES = [6, 7, 8, 9, 10, 11, 12]

BAD_OPTION_TOKENS = {"none", "nan", "null", ""}
import re

NODE_ID_RE = re.compile(r"\bc\d+_[a-z][a-z_]*_\w")


def bucket(diff: float) -> str:
    return "easy" if diff < 0.4 else ("medium" if diff < 0.7 else "hard")


def valid(q: dict) -> bool:
    text = str(q.get("question_text") or "").strip()
    if len(text) < 15 or len(text) > 700:
        return False
    if NODE_ID_RE.search(text):
        return False
    opts = q.get("options")
    if not isinstance(opts, list) or not (2 <= len(opts) <= 6):
        return False
    clean = [str(o).strip() for o in opts]
    if any(o == "" or o.lower() in {"none", "nan", "null"} for o in clean):
        return False
    if len({o.lower() for o in clean}) != len(clean):
        return False
    ans = str(q.get("correct_answer") or "").strip()
    if not ans or len(ans) > 120:
        return False
    if ans not in clean:
        return False
    if ans == text:
        return False
    return True


async def main() -> None:
    # heavy / container-path imports stay lazy so the module imports
    # cleanly off-container (tests, audits)
    sys.path.insert(0, "/app/backend")
    sys.path.insert(0, "/app")
    from services.question_adapter import AdapterRegistry          # noqa: E402
    from services.question_selector import QuestionSelector        # noqa: E402
    from solvers.registry import SolverRegistry                    # noqa: E402
    from backend.database import async_session                     # noqa: E402
    from backend.models.enrichment import BoardQuestion            # noqa: E402
    from sqlalchemy import select                                  # noqa: E402

    reg = SolverRegistry()
    if not getattr(reg, "_initialized", False):
        reg.initialize()
    adapters = AdapterRegistry()
    adapters.set_solver_registry(reg)
    sel_probe = QuestionSelector.__new__(QuestionSelector)  # reuse matcher only
    sel_probe._registry = reg
    sel_probe._adapters = adapters

    async with async_session() as db:
        existing = set((await db.execute(select(
            BoardQuestion.source_file, BoardQuestion.question_text).where(
            BoardQuestion.source_type == "generator"))).all())

        total = 0
        report = {}
        for api_subj, code in SUBJECTS.items():
            for grade in GRADES:
                gm, _ = sel_probe._match_generators(api_subj, "", grade)
                usable = [qt for qt in gm if adapters.get_adapter(qt) is not None]
                if not usable:
                    continue
                rows, seen = [], set()
                for qtype in usable:
                    for i in range(MAX_SEEDS_PER_QTYPE):
                        if len(rows) >= MAX_ROWS_PER_SUBJECT_GRADE:
                            break
                        diff = DIFFS[i % len(DIFFS)]
                        try:
                            qs = adapters.generate(qtype, seed=1000 * grade + i,
                                                   count=1, difficulty=diff)
                        except Exception:
                            continue
                        if not qs:
                            continue
                        q = qs[0]
                        if not valid(q):
                            continue
                        text = str(q["question_text"]).strip()
                        key = text.lower()
                        if key in seen:
                            continue
                        src_file = "/app/solvers/%s.py" % qtype.split(":")[0]
                        if (src_file, text) in existing:
                            continue
                        seen.add(key)
                        opts = [str(o).strip() for o in q["options"]]
                        rows.append(BoardQuestion(
                            question_number=(i % len(DIFFS)) + 1,
                            node_tags=[],
                            subject=code, class_level=grade,
                            chapter=None, section="generator_variant",
                            question_type=normalize_qtype(
                                q.get("question_type") or "mcq_single"),
                            question_text=text,
                            options=opts,
                            correct_answer=str(q.get("correct_answer")).strip(),
                            model_answer=str(q.get("explanation") or "").strip() or None,
                            explanation=str(q.get("explanation") or "").strip() or None,
                            marks=1, difficulty=bucket(diff),
                            source_type="generator", source_file=src_file,
                            board="CBSE"))
                    if len(rows) >= MAX_ROWS_PER_SUBJECT_GRADE:
                        break
                if rows:
                    for r in rows:
                        db.add(r)
                    await db.commit()
                    total += len(rows)
                    report["%s g%d" % (api_subj, grade)] = len(rows)
        print("inserted generator rows:", total)
        for k in sorted(report):
            print("   %s: %d" % (k, report[k]))


if __name__ == "__main__":
    asyncio.run(main())
