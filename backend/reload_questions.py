"""Reload board_questions from the Desktop-CISCE question markers.

WS-E (2026-10-10) ingestion-integrity rewrite.  The old version had
three silent data-loss paths:

  1. BLIND WHOLE-TABLE WIPE — `delete(BoardQuestion)` removed ALL
     403,620 rows (CBSE + ICSE + ISC + QUARANTINED, written by
     extract_node_questions / extract_cisce_questions /
     load_practice_variants / insert_generator_variants) and then
     re-inserted ONLY the Desktop-cisce parse.  The live ICSE/ISC rows
     come from the cisce_nodes_v2 corpus (extract_cisce_questions), not
     from this root, so one stray run destroyed 403k live rows.
     Now the wipe is NAMESPACED to the rows this tool owns
     (board == "CISCE") and double-gated behind --wipe.
  2. SILENT ROW DROPS — load_question_banks skips empty-text questions
     with no counter, and one bad file aborts only that file into an
     errors list of which the old runner printed 10.  Now
     plan_reload() pre-parses every file and reports
     parsed / empty-dropped / per-file errors BEFORE anything is
     written, and the write path reconciles
     inserted + dropped + errored == parsed.
  3. NO-FILES WIPE — wiping against a missing/moved content root
     inserted nothing.  Now refused unless --allow-empty.

Default mode is PLAN ONLY (no DB writes).  Add --wipe to actually
write; add --allow-empty to permit a zero-file reload.

Usage:
    python -m backend.reload_questions                 # plan only
    python -m backend.reload_questions --root <dir>    # plan, alt root
    python -m backend.reload_questions --wipe          # namespaced write
"""
import argparse
import asyncio
import sys
from pathlib import Path

# The rows this reload owns: every BoardQuestion written by
# database/load_content.load_question_banks / _join_model_answers
# carries board="CISCE".  No other writer uses that value
# (CBSE / ICSE / ISC / QUARANTINED are the live values — verified via
# board_coverage.json 2026-10-10).
OWNED_BOARD = "CISCE"


def plan_reload(root: Path) -> dict:
    """Pre-parse the content root and count everything, writing nothing.

    Returns {question_files, answer_files, files, questions_parsed,
    empty_text_drops, file_errors, per_file, by_subject} — the exact
    numbers the write path must reconcile against.
    """
    from backend.database.load_content import find_content_files

    q_files, _c_files, a_files = find_content_files(root)
    from backend.database.marker_parser import parse_question_bank_file

    parsed = 0
    empty_drops = 0
    errors: list[str] = []
    per_file: dict[str, dict] = {}
    by_subject: dict[str, int] = {}
    for subject, _source_type, filepath in q_files:
        try:
            doc = parse_question_bank_file(str(filepath))
        except Exception as exc:
            errors.append(f"{filepath.name}: {exc}")
            per_file[filepath.name] = {"parsed": None, "error": str(exc)}
            continue
        n_file = len(doc.get("questions", []))
        # parser-level drops (rows stripped before reaching the doc) +
        # empty rows still present in the doc.  n_file already includes
        # the doc-level empties; only parser-stripped rows are extra.
        parser_dropped = int(doc.get("dropped_rows") or 0)
        d_file = parser_dropped + sum(
            1 for q in doc.get("questions", [])
            if not str(q.get("question") or "").strip())
        per_file[filepath.name] = {"parsed": n_file + parser_dropped,
                                   "empty_drops": d_file}
        parsed += n_file + parser_dropped
        empty_drops += d_file
        for q in doc.get("questions", []):
            if not str(q.get("question") or "").strip():
                continue
            by_subject[subject] = by_subject.get(subject, 0) + 1
    return {
        "root": str(root),
        "question_files": len(q_files),
        "answer_files": len(a_files),
        "questions_parsed": parsed,
        "empty_text_drops": empty_drops,
        "file_errors": errors,
        "per_file": per_file,
        "by_subject": by_subject,
    }


def owned_wipe_rows(conn) -> int:
    """Count the rows the namespaced wipe would remove (pre-flight)."""
    from sqlalchemy import func, select
    from backend.models.enrichment import BoardQuestion

    return conn.execute(
        select(func.count()).select_from(BoardQuestion)
        .where(BoardQuestion.board == OWNED_BOARD)).scalar() or 0


def reconcile(plan: dict, inserted: int, load_errors: list) -> dict:
    """Pure accounting: does parsed == inserted + dropped + lost?

    Files that errored at load time contributed their plan-time parse
    counts to NEITHER inserted nor empty_drops — they are 'lost' and
    must be re-counted for the identity to hold.  A lost file's own
    empty-stem drops are inside its lost parse, so they are subtracted
    from the plan-wide drop total (else double-counted).  A mismatch
    means a drop path the plan does not model (never ship such a
    reload).
    """
    lost = 0
    lost_drops = 0
    for e in load_errors:
        name = str(e).split(":", 1)[0]
        pf = (plan.get("per_file") or {}).get(name) or {}
        if isinstance(pf.get("parsed"), int):
            lost += pf["parsed"]
            lost_drops += pf.get("empty_drops") or 0
    parsed = plan["questions_parsed"]
    dropped = plan["empty_text_drops"] - lost_drops
    return {
        "parsed": parsed,
        "inserted": inserted,
        "empty_dropped": dropped,
        "lost_to_file_errors": lost,
        "ok": inserted + dropped + lost == parsed,
    }


async def reload(root: Path, *, wipe: bool, allow_empty: bool) -> int:
    """Plan, then (only with wipe=True) namespaced-reload."""
    plan = plan_reload(root)

    print(f"content root : {plan['root']}")
    print(f"files        : {plan['question_files']} question, "
          f"{plan['answer_files']} answer")
    print(f"questions    : {plan['questions_parsed']} parsed, "
          f"{plan['empty_text_drops']} empty-text (will be dropped), "
          f"{len(plan['file_errors'])} file errors")
    for e in plan["file_errors"]:
        print(f"  parse error: {e}")
    for subj in sorted(plan["by_subject"]):
        print(f"  {subj}: {plan['by_subject'][subj]}")

    if not wipe:
        print("PLAN ONLY (no rows touched). Re-run with --wipe to apply.")
        return 0

    if plan["question_files"] == 0 and not allow_empty:
        print("REFUSED: 0 question files found — a wipe now would reload "
              "nothing. Pass --allow-empty if this is really intended.",
              file=sys.stderr)
        return 2

    from sqlalchemy import delete, select
    from backend.database import async_session
    from backend.models.enrichment import BoardQuestion
    from backend.database.load_content import (
        find_content_files, load_answer_keys, load_question_banks,
    )

    async with async_session() as db:
        # Pre-flight: how many OWNED rows exist right now?
        pre = (await db.execute(
            select(BoardQuestion.id).where(
                BoardQuestion.board == OWNED_BOARD))).scalars().all()
        print(f"namespaced wipe scope: board='{OWNED_BOARD}' rows: "
              f"{len(pre)} (other boards untouched)")

        await db.execute(delete(BoardQuestion).where(
            BoardQuestion.board == OWNED_BOARD))
        await db.commit()

        q_files, _c, a_files = find_content_files(root)
        q = await load_question_banks(db, q_files)
        a = await load_answer_keys(db, a_files)

    inserted = q["inserted"]
    errors = q.get("errors", [])
    rec = reconcile(plan, inserted, errors)
    print(f"inserted {inserted} questions "
          f"(keys: {a['keys_parsed']}, rows updated: {a['updated']})")
    for e in errors:
        print("  load error:", e)
    print(f"RECONCILIATION: parsed={rec['parsed']} = "
          f"inserted {rec['inserted']} + empty_dropped "
          f"{rec['empty_dropped']} + lost_to_file_errors "
          f"{rec['lost_to_file_errors']} "
          f"-> {'OK' if rec['ok'] else 'MISMATCH'}")
    if not rec["ok"]:
        print("RECONCILIATION FAILED — drop path not understood; "
              "investigate before trusting this reload.", file=sys.stderr)
        return 1
    return 0


def main(argv=None) -> int:
    from backend.database.load_enrichment import CISCE_ROOT

    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("--root", default=str(CISCE_ROOT))
    p.add_argument("--wipe", action="store_true",
                   help="actually delete OWNED rows + reload "
                        "(default: plan only)")
    p.add_argument("--allow-empty", action="store_true",
                   help="permit a reload from a root with 0 question files")
    args = p.parse_args(argv)
    return asyncio.run(reload(Path(args.root), wipe=args.wipe,
                              allow_empty=args.allow_empty))


if __name__ == "__main__":
    sys.exit(main())
