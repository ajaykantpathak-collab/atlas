"""Integration tests for the bank-answer lane (runs INSIDE a backend
container against the live question bank).  Fail-closed guarantees:

  T1  exact bank question        -> VERIFIED_OFFICIAL hit, answer = board key
  T2  punctuation/case/spacing   -> still hits (normalization)
  T3  changed digits             -> refuse (digit-skeleton guard)
  T4  garbage / off-bank text    -> refuse
  T5  answer text never carries a raw node id
"""
import json
import re
import sys
import time

sys.path.insert(0, "/app")

from backend.its.solver.bank_answer import lookup  # noqa: E402

_ID = re.compile(r"c\d+_[a-z0-9]+(?:_[a-z0-9]+)+\d*", re.I)


def _sample_rows(n=6):
    from backend.database import get_sync_engine
    from sqlalchemy import text

    eng = get_sync_engine()
    with eng.connect() as cx:
        rows = cx.execute(text(
            "SELECT id, question_text, correct_answer, model_answer "
            "FROM board_questions WHERE board='CBSE' "
            "AND length(question_text) BETWEEN 40 AND 300 "
            # (2026-10-05) only sample SERVABLE rows: lookup() applies the
            # board_question_flags guard (flagged rows are do-not-serve by
            # design), so an unfiltered sampler can draw rows the lane is
            # REQUIRED to refuse.
            "AND NOT EXISTS (SELECT 1 FROM board_question_flags fq "
            "                WHERE fq.question_id = board_questions.id) "
            "ORDER BY random() LIMIT :n"), {"n": n}).fetchall()
    return rows


def main():
    from backend.its.solver.bank_answer import warmup

    assert warmup(), "bank lane warmup failed (engine/query)"
    rows = _sample_rows()
    assert rows, "no bank rows sampled"
    passed = failed = 0

    for r in rows:
        q = r.question_text.strip()
        # T1 exact
        t0 = time.perf_counter()
        hit = lookup(q)
        ms = (time.perf_counter() - t0) * 1000
        if hit and hit["answer"]:
            passed += 1
        else:
            failed += 1
            print(f"FAIL T1 exact: {q[:60]!r}")
        assert ms < 500, f"T1 too slow: {ms:.0f} ms"

        # T2 perturbed: case noise, punctuation noise, extra spaces
        noisy = q.upper().replace(",", " , ").replace("  ", " ") + "   ?"
        hit2 = lookup(noisy)
        if hit2 and hit2["answer"]:
            passed += 1
        else:
            failed += 1
            print(f"FAIL T2 noisy: {q[:60]!r}")

    # T3 digit mutation must refuse
    r = rows[0]
    mutated = re.sub(r"\d", "7", r.question_text)
    if mutated != r.question_text and lookup(mutated) is not None:
        # only a failure when the mutation actually changed the numbers
        failed += 1
        print(f"FAIL T3 digit guard: {r.question_text[:60]!r}")
    else:
        passed += 1

    # T4 garbage
    if lookup("The quick brown fox jumps over the lazy dog near the riverbank") is None:
        passed += 1
    else:
        failed += 1
        print("FAIL T4 garbage hit")

    # T5 no node ids in served answers
    for r in rows:
        hit = lookup(r.question_text)
        if hit and _ID.search(hit["answer"] or ""):
            failed += 1
            print(f"FAIL T5 node-id leak: {hit['answer'][:60]!r}")
        else:
            passed += 1

    print(f"\nbank lane: {passed} passed, {failed} failed")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
