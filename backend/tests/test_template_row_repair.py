"""test_template_row_repair.py -- BANK-REPAIR2 proof tests (2026-10-05).

The generic extraction-template rows ("What must you be able to do to
master this topic?" et al. -- one norm_text stamped across thousands of
nodes, each keyed to a DIFFERENT topic-specific answer) SOFT_HIT by
construction and can never serve honestly subject-wide.

MECHANISM DECISION (evidence-based, this test ENFORCES it):
  NO data mutation was needed.  backend.tests.bank_norm_repair
  (2026-10-03 prod apply, backup _bank_norm_backup_prod_20261003.jsonl)
  already flags every such row board_question_flags.reason='template_row'.
  The honest fix for the sweep lives in the SWEEP TALLY
  (tests/sweep_full_runner.py --report): flagged rows are reported as
  "template_class (excluded by flag)" OUTSIDE the verified-rate
  denominator.  These tests prove the guarantees that decision relies on:

  T1 COUNT MATCHES      every row whose norm matches a template pattern is
                        flagged template_row; unflagged template rows = 0.
  T2 SUBJECT-WIDE       flagged rows are excluded from the serving paths:
                        bank_answer._SQL (NOT EXISTS), the selector's
                        board_question_not_flagged() predicate, and the
                        python-side _is_template_row filter.
  T3 NODE-SCOPED KEEPS  the node-scoped diagnostic lane predicate
                        (board_question_not_flagged("no_answer_key"),
                        question_selector.get_next_question) still returns
                        template rows -- the node gate disambiguates them;
                        they are that node's real check questions.
  T4 BACKUP ARTIFACT    the 2026-10-03 JSONL backup is complete and every
                        flag action in it matches current DB state.
  T5 SWEEP TALLY        the --report tally (split_flagged / EXCLUDED_LABELS)
                        drops flagged rows from the live denominator and
                        labels them, so the sweep's verified rate stops
                        carrying by-construction rows.

Runs on the host against the live Postgres (127.0.0.1:5432 dream_app) --
zero Docker, zero LLM.  Standalone:  python tests/test_template_row_repair.py
"""
import json
import os
import sys
from collections import Counter
from types import SimpleNamespace

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

DEPLOY_ENV = r"D:\platform\deploy\.env"
BACKUP = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "_bank_norm_backup_prod_20261003.jsonl")

# the selector's own template patterns (single source of truth is
# QuestionSelector._TEMPLATE_PATTERNS; mirrored here for the SQL LIKEs that
# must stay in sync with it -- mismatch fails T1 loudly)
TEMPLATE_PATTERNS = [
    "what must you be able to do to master this topic",
    "state the definition given in this lesson",
    "what common mix up does this lesson flag",
    "what is vocabulary in context",
    "here's the idea as a picture",
]
HEADLINE_PATTERN = TEMPLATE_PATTERNS[0]
MIN_HEADLINE_ROWS = 8000   # mining report 2026-10-05 said 8042/8033


def _pw():
    for line in open(DEPLOY_ENV, encoding="utf-8"):
        if line.startswith("POSTGRES_PASSWORD="):
            return line.strip().split("=", 1)[1]
    raise AssertionError("POSTGRES_PASSWORD not found in deploy/.env")


# backend.database builds engines at import from DATABASE_URL (same posture
# as sweep_full_runner section 1) -- set it BEFORE any backend import
os.environ.setdefault(
    "DATABASE_URL",
    f"postgresql+asyncpg://dream_user:{_pw()}@127.0.0.1:5432/dream_app")
os.environ.setdefault("PLATFORM_JWT_SECRET", "0123456789abcdef0123456789abcdef")


def _engine():
    from sqlalchemy import create_engine
    url = (f"postgresql+psycopg2://dream_user:{_pw()}"
           f"@127.0.0.1:5432/dream_app")
    return create_engine(url, pool_pre_ping=True, pool_size=2,
                         max_overflow=2, connect_args={
                             "options": "-c statement_timeout=60000"})


ENG = _engine()


def _template_samples(limit=3):
    """Distinct template-flagged rows with a real key (for T2/T3)."""
    from sqlalchemy import text
    with ENG.connect() as cx:
        rows = cx.execute(text(
            "SELECT bq.id::text, bq.norm_text, bq.question_text, "
            "       bq.correct_answer "
            "FROM board_questions bq "
            "WHERE board='CBSE' AND lower(bq.norm_text) LIKE :p "
            "  AND coalesce(bq.correct_answer,'') <> '' "
            "  AND EXISTS (SELECT 1 FROM board_question_flags f "
            "              WHERE f.question_id=bq.id "
            "                AND f.reason='template_row') "
            "ORDER BY bq.id LIMIT :n"),
            {"p": f"%{HEADLINE_PATTERN}%", "n": limit}).fetchall()
    return rows


# --------------------------------------------------------------------------- #
# T1 -- the count matches: template rows == template_row flags
# --------------------------------------------------------------------------- #

def test_t1_count_matches():
    from sqlalchemy import text
    with ENG.connect() as cx:
        for pat in TEMPLATE_PATTERNS:
            total = cx.execute(text(
                "SELECT count(*) FROM board_questions "
                "WHERE board='CBSE' "
                "  AND lower(coalesce(norm_text,'')) LIKE :p"),
                {"p": f"%{pat}%"}).scalar()
            unflagged = cx.execute(text(
                "SELECT count(*) FROM board_questions bq "
                "WHERE board='CBSE' "
                "  AND lower(coalesce(bq.norm_text,'')) LIKE :p "
                "  AND NOT EXISTS (SELECT 1 FROM board_question_flags f "
                "                  WHERE f.question_id=bq.id "
                "                    AND f.reason='template_row')"),
                {"p": f"%{pat}%"}).scalar()
            assert unflagged == 0, (
                f"{unflagged} rows matching template {pat[:40]!r} are NOT "
                f"flagged template_row -- run bank_norm_repair (case A2) or "
                f"extend the pattern list; serving relies on the flag")
            if pat == HEADLINE_PATTERN:
                assert total >= MIN_HEADLINE_ROWS, (
                    f"headline mastery-template count {total} < "
                    f"{MIN_HEADLINE_ROWS} -- the bank changed; re-derive "
                    f"the mining-report number")
                print(f"  T1 headline '{HEADLINE_PATTERN[:40]}...': "
                      f"{total:,} rows, all flagged template_row")
        # patterns may overlap on one row (e.g. vocabulary+definition in one
        # text), so the pattern-sum can only OVERCOUNT the flag total
        pat_sum = sum(cx.execute(text(
            "SELECT count(*) FROM board_questions WHERE board='CBSE' "
            "AND lower(coalesce(norm_text,'')) LIKE :p"),
            {"p": f"%{pat}%"}).scalar() for pat in TEMPLATE_PATTERNS)
        flags_tpl = cx.execute(text(
            "SELECT count(*) FROM board_question_flags "
            "WHERE reason='template_row'")).scalar()
        assert pat_sum >= flags_tpl or pat_sum == 0, (
            f"pattern sum {pat_sum} < template flags {flags_tpl} -- flags "
            f"exist that no known pattern explains; audit the extra flags")
        print(f"  T1 pattern-sum={pat_sum:,} vs template_row flags="
              f"{flags_tpl:,} (overlap from multi-pattern rows is expected)")


# --------------------------------------------------------------------------- #
# T2 -- subject-wide serving paths exclude flagged template rows
# --------------------------------------------------------------------------- #

def test_t2_subject_wide_serving_excludes():
    import uuid as _uuid
    from backend.its.solver.bank_answer import _SQL
    from backend.models.enrichment import (
        BoardQuestion, board_question_not_flagged)
    from backend.services.question_selector import QuestionSelector
    from sqlalchemy import select, text

    samples = _template_samples()
    assert samples, "no template-flagged samples found -- T1 should fail first"
    with ENG.connect() as cx:
        for rid, nk, qt, ca in samples:
            # (a) the production bank lane SQL (guard active) must not
            #     return the flagged row...
            guarded = {str(r[0]) for r in cx.execute(
                text(_SQL), {"nk": nk}).fetchall()}
            assert rid not in guarded, (
                f"flagged template row {rid} served by bank_answer._SQL -- "
                f"the NOT EXISTS guard is broken")
            # (b) control: the row MATCHES its own norm on board='CBSE'
            #     (pkey-narrowed: index-fast, and logically sufficient --
            #     given this, the guarded query's zero rows can only come
            #     from the flag guard, proving it load-bearing)
            own = cx.execute(text(
                "SELECT count(*) FROM board_questions "
                "WHERE id = :rid AND board='CBSE' AND norm_text = :nk"),
                {"rid": rid, "nk": nk}).scalar()
            assert own == 1, (
                f"control failed: row {rid} does not match its own norm in "
                f"the bank query -- test setup is wrong, not the guard")
            # (c) the selector's subject-wide predicate (ALL reasons)
            #     excludes the row -- the exact production predicate of
            #     _corpus_candidates / practice_service
            q = select(BoardQuestion.id).where(
                BoardQuestion.id == _uuid.UUID(rid),
                board_question_not_flagged())
            got = {str(r[0]) for r in cx.execute(q).fetchall()}
            assert rid not in got, (
                f"flagged template row {rid} passed "
                f"board_question_not_flagged() -- subject-wide serving "
                f"would serve it")
            # (d) the python-side filter catches it too
            assert QuestionSelector._is_template_row(
                SimpleNamespace(norm_text=nk)), (
                f"_is_template_row misses norm {nk[:60]!r} -- pattern lists "
                f"drifted")
    print(f"  T2 {len(samples)} template rows: excluded by bank _SQL, "
          f"selector predicate, and _is_template_row (controls matched)")


# --------------------------------------------------------------------------- #
# T3 -- node-scoped diagnostic lanes KEEP template rows
# --------------------------------------------------------------------------- #

def test_t3_node_scoped_lanes_keep_template():
    """get_next_question (question_selector, node-scoped diagnostics) filters
    with board_question_not_flagged('no_answer_key') ONLY -- template rows
    stay eligible because the node gate disambiguates them."""
    import uuid as _uuid
    from backend.models.enrichment import (
        BoardQuestion, board_question_not_flagged)
    from sqlalchemy import select

    samples = _template_samples()
    assert samples, "no template-flagged samples found -- T1 should fail first"
    with ENG.connect() as cx:
        for rid, nk, qt, ca in samples:
            q = select(BoardQuestion.id).where(
                BoardQuestion.id == _uuid.UUID(rid),
                board_question_not_flagged("no_answer_key"))
            got = {str(r[0]) for r in cx.execute(q).fetchall()}
            assert rid in got, (
                f"node-scoped lane LOST template row {rid} -- the "
                f"no_answer_key-only predicate started excluding "
                f"template_row flags; node diagnostics are broken")
    print(f"  T3 {len(samples)} template rows still eligible node-scoped "
          f"(only no_answer_key is excluded there)")


# --------------------------------------------------------------------------- #
# T4 -- the 2026-10-03 prod backup artifact is complete and consistent
# --------------------------------------------------------------------------- #

def test_t4_backup_manifest_consistent():
    assert os.path.exists(BACKUP), f"backup missing: {BACKUP}"
    with open(BACKUP, encoding="utf-8") as f:
        lines = f.read().splitlines()
    manifest = json.loads(lines[0])["_manifest"]
    rows = [json.loads(l) for l in lines[1:]]
    assert manifest["touched_rows"] == len(rows), (
        f"backup manifest {manifest['touched_rows']} != {len(rows)} lines")
    assert len({r["id"] for r in rows}) == len(rows), "duplicate ids in backup"

    from sqlalchemy import text
    with ENG.connect() as cx:
        flag_reason = {str(r[0]): r[1] for r in cx.execute(text(
            "SELECT question_id, reason FROM board_question_flags"))}
    bad_flag, bad_regen = [], []
    for r in rows:
        if r["action"].startswith("flag_"):
            if flag_reason.get(r["id"]) != r["action"].removeprefix("flag_"):
                bad_flag.append(r["id"])
        elif r["action"] == "regen_norm":
            if "norm_text" not in r["old"]:
                bad_regen.append(r["id"])
    assert not bad_flag, (
        f"{len(bad_flag)} backup flag rows missing/mismatched in "
        f"board_question_flags (e.g. {bad_flag[:3]}) -- flags were deleted "
        f"or reasons changed without a new backup")
    assert not bad_regen, (
        f"{len(bad_regen)} regen rows missing old norm_text "
        f"(e.g. {bad_regen[:3]})")
    by_action = Counter(r["action"] for r in rows)
    print(f"  T4 backup OK: {len(rows):,} rows "
          f"({dict(by_action)}) all consistent with live DB")


# --------------------------------------------------------------------------- #
# T5 -- the sweep report tally excludes flagged rows and labels them
# --------------------------------------------------------------------------- #

def test_t5_sweep_report_tally_excludes():
    saved = dict(os.environ)
    sys_argv = sys.argv
    try:
        # --report: module import is side-effect-safe (no sweep, no proof)
        sys.argv = ["sweep_full_runner.py", "--report"]
        import importlib.util
        spec = importlib.util.spec_from_file_location(
            "sweep_full_runner_mod",
            os.path.join(os.path.dirname(os.path.abspath(__file__)),
                         "sweep_full_runner.py"))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
    finally:
        # the runner's env posture (sentinel keys, DATABASE_URL, HF_HOME,
        # CBSE_DATA_DIR) must not leak into this process
        sys.argv = sys_argv
        os.environ.clear()
        os.environ.update(saved)

    flagged = mod.load_flagged_qids()
    assert flagged is not None, "flags table unreadable from the runner"
    samples = _template_samples(1)
    assert samples, "no template-flagged samples found"
    tpl_qid, nk, qt, ca = samples[0]
    live_qid = "00000000-0000-0000-0000-0000000000f0"   # unflagged synthetic
    nokey_qid = next((q for q, rs in flagged.items()
                      if rs == "no_answer_key"), None)
    recs = [
        {"qid": tpl_qid, "cls": "SOFT_HIT", "subject": "math", "class": 11},
        {"qid": live_qid, "cls": "SOFT_HIT", "subject": "math", "class": 11},
    ]
    if nokey_qid:
        recs.append({"qid": nokey_qid, "cls": "VERIFIED_NOKEY",
                     "subject": "math", "class": 11})
    live, excluded = mod.split_flagged(recs, flagged)
    assert {r["qid"] for r in live} == {live_qid}, (
        "split_flagged kept a flagged row in the live denominator")
    excl_by = {r["qid"]: rs for r, rs in excluded}
    assert excl_by.get(tpl_qid) == "template_row"
    assert mod.EXCLUDED_LABELS["template_row"] == \
        "template_class (excluded by flag)"
    if nokey_qid:
        assert excl_by.get(nokey_qid) == "no_answer_key"
    # and the real covered findings must never carry flagged rows as live
    print(f"  T5 tally OK: template row excluded as "
          f"'{mod.EXCLUDED_LABELS['template_row']}'; live denominator "
          f"{len(live)}/{len(recs)}")


def main():
    tests = [test_t1_count_matches,
             test_t2_subject_wide_serving_excludes,
             test_t3_node_scoped_lanes_keep_template,
             test_t4_backup_manifest_consistent,
             test_t5_sweep_report_tally_excludes]
    failed = 0
    for t in tests:
        try:
            t()
        except AssertionError as exc:
            failed += 1
            print(f"FAIL {t.__name__}: {exc}")
    print(f"\n{'ALL PASS' if not failed else f'{failed} FAILED'} "
          f"({len(tests) - failed}/{len(tests)})")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
