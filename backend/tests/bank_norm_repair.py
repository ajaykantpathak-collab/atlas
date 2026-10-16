"""bank_norm_repair.py — data-floor repair of the board_questions matching layer.

Root cause (hardening sweep 2026-10-03): tens of thousands of board_questions
rows sit in degenerate norm_text groups because norm_text is a generic
extraction-template phrase ("What must you be able to do to master this
topic?") identical across thousands of nodes, each keyed to a DIFFERENT
answer.  The bank lane (its/solver/bank_answer.py) matches on norm_text
equality and fail-closes on ambiguity -> the ambiguity-refusal storm.

Three data cases, one transaction:

  case A  flag-junk      question_text ITSELF is generic (template family or
                         the same verbatim text stamped across >= 10 distinct
                         source files) — the row is junk for matching.
                         -> board_question_flags(question_id, reason)
                         reason='template_row'
                         Plus rows with NO key at all (correct_answer and
                         model_answer both empty): reason='no_answer_key'
                         (they can never VERIFY — practice verify reads
                         correct_answer directly).

  case B  regenerate     norm_text != normalize(question_text) while
                         question_text is a real question — norm_text was
                         generated from the wrong field (or never set).
                         -> UPDATE norm_text using the PIPELINE's own
                         function (its.solver.bank_answer.normalize — the
                         exact normalization the lookup uses at serve time).

  case C  irreducible    norm_text == normalize(question_text) and the text
                         is real, but several distinct questions collapse to
                         one norm (digit skeletoning '#' + left(600)).
                         These stay refused by design — the floor.

Mechanism: the selector (services/question_selector.py::_corpus_candidates)
and the bank lane (_SQL/_TRGM_SQL in its/solver/bank_answer.py) are wired to
respect board_question_flags via NOT EXISTS.  The flags table is created here
if missing.

Usage (inside a backend container, or any host with DATABASE_URL set):

    python -m backend.tests.bank_norm_repair            # dry-run (default)
    python -m backend.tests.bank_norm_repair --diagnose # per-case counts + samples
    python -m backend.tests.bank_norm_repair --apply \
        --backup /app/tests/bank_norm_backup_<ts>.jsonl

Backup: every touched row is written to the JSONL backup BEFORE the commit
(one manifest line first, then one line per row with the full original
fields + the action taken).  Restore = reverse the actions: UPDATE norm_text
back for action="regen_norm", DELETE FROM board_question_flags for
action="flag_*".
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone

sys.path.insert(0, "/app")

# ---------------------------------------------------------------------------
# pipeline normalization — reused EXACTLY, never reinvented
from backend.its.solver.bank_answer import normalize  # noqa: E402

# the selector's own template patterns (single source of truth)
from backend.services.question_selector import QuestionSelector  # noqa: E402

TEMPLATE_PATTERNS = tuple(p.lower() for p in QuestionSelector._TEMPLATE_PATTERNS)

# a normalized question_text stamped across >= this many distinct source
# files is an extraction artifact, not a real question (the node corpus is
# one flat directory, so distinct source_file == distinct node file)
FAMILY_SPREAD_THRESHOLD = 10

MIN_GROUP = 3          # "degenerate group" definition (hardening sweep)
BOARD = "CBSE"         # only rows the CBSE lanes can serve

# override for copy-table testing (--table board_questions_repairtest);
# production apply MUST use the default
TABLE = "board_questions"
FLAGS_TABLE = "board_question_flags"

BATCH = 2000


def _connect():
    import os

    from sqlalchemy import create_engine

    url = os.environ.get("DATABASE_URL") or (
        "postgresql+psycopg2://dream_user:dream_secure_2024"
        "@127.0.0.1:5432/dream_app")
    url = url.replace("postgresql+asyncpg", "postgresql+psycopg2")
    return create_engine(url, pool_pre_ping=True, pool_size=2, max_overflow=2)


def _answer_key(correct, model) -> str:
    """The bank lane's own ambiguity key (bank_answer._agree)."""
    a = ((correct or "") + "|" + (model or "")).strip()
    return re.sub(r"\s+", " ", a)[:200]


def _has_key(correct, model) -> bool:
    return bool((correct or "").strip()) or bool((model or "").strip())


def _is_empty_key(correct, model) -> bool:
    """correct_answer is the practice-verify key; empty (even with a model
    answer) means the served question can never be verified."""
    return not (correct or "").strip()


class Diagnosis:
    def __init__(self):
        self.rows = []                      # all CBSE rows (streamed once)
        self.groups = defaultdict(list)     # norm_text -> [row]
        self.qnorm_family = defaultdict(set)  # qnorm -> {source_file}
        self.counts = defaultdict(int)

    def load(self, eng):
        from sqlalchemy import text

        with eng.connect() as cx:
            cx.execute(text("SET statement_timeout = 0"))
            raw = cx.connection
            cur = raw.cursor(name="bq_repair_stream")
            cur.itersize = 5000
            cur.execute(
                "SELECT id, norm_text, question_text, correct_answer,"
                " model_answer, subject, class_level, source_type,"
                " source_file, board"
                f" FROM {TABLE} WHERE board = %s", (BOARD,))
            while True:
                batch = cur.fetchmany(5000)
                if not batch:
                    break
                for (rid, nt, qt, ca, ma, subj, cls, stype, sfile, board) in batch:
                    row = {
                        "id": str(rid), "norm_text": nt, "question_text": qt,
                        "correct_answer": ca, "model_answer": ma,
                        "subject": subj, "class_level": cls,
                        "source_type": stype, "source_file": sfile,
                        "board": board,
                        "qnorm": normalize(qt or ""),
                        "akey": _answer_key(ca, ma),
                    }
                    self.rows.append(row)
                    nt_key = nt if nt else ""
                    self.groups[nt_key].append(row)
                    if row["qnorm"]:
                        self.qnorm_family[row["qnorm"]].add(sfile or "?")
            cur.close()

    def classify(self, row) -> str | None:
        """Action for one row, or None to leave untouched."""
        nt = row["norm_text"] or ""
        qn = row["qnorm"]
        # case A1 — no verifiable key: practice verify reads correct_answer
        # directly, so an empty correct_answer can never VERIFY (even when a
        # model answer exists the selector serves correct_answer).
        if _is_empty_key(row["correct_answer"], row["model_answer"]):
            return "flag_no_answer_key"
        # case A2 — question_text itself is a generic template
        if qn and any(p in qn for p in TEMPLATE_PATTERNS):
            return "flag_template_row"
        # case A3 — same verbatim text stamped across many source files
        fam = self.qnorm_family.get(qn)
        if qn and fam and len(fam) >= FAMILY_SPREAD_THRESHOLD:
            return "flag_template_row"
        if not qn:
            # question_text normalizes to nothing -> unmatchable junk
            return "flag_no_answer_key"
        # case B — real question, wrong/missing norm_text
        if nt != qn:
            return "regen_norm"
        # case C — collision floor (untouched)
        return None


def _group_metrics(rows_by_norm):
    """Ambiguity metrics identical in spirit to the hardening sweep.

    A group is *ambiguous* when >= 2 matchable rows share the norm but carry
    different answer keys (what bank_answer fail-closes on).
    """
    total_groups = 0
    degen_groups = 0
    amb_groups = 0
    amb_rows = 0
    matchable_rows = 0
    for nt, rows in rows_by_norm.items():
        live = [r for r in rows if r.get("_live", True)]
        if not live:
            continue
        total_groups += 1
        if len(live) >= MIN_GROUP:
            degen_groups += 1
        keyed = [r for r in live if _has_key(r["correct_answer"], r["model_answer"])]
        matchable_rows += len(keyed)
        if len(keyed) >= 2:
            keys = {r["akey"] for r in keyed}
            if len(keys) >= 2:
                amb_groups += 1
                amb_rows += len(keyed)
    return {
        "total_groups": total_groups,
        "degenerate_groups(>=3)": degen_groups,
        "ambiguous_groups": amb_groups,
        "rows_in_ambiguous_groups": amb_rows,
        "matchable_rows": matchable_rows,
    }


def _simulate_after(dg: Diagnosis):
    after = defaultdict(list)
    for r in dg.rows:
        action = dg.classify(r)
        if action in ("flag_template_row", "flag_no_answer_key"):
            continue
        nr = dict(r)
        nr["_live"] = True
        if action == "regen_norm":
            nr["norm_text"] = r["qnorm"]
        after[nr["norm_text"] or ""].append(nr)
    return after


def diagnose(dg: Diagnosis):
    print("== DIAGNOSE ==")
    print(f"rows scanned (board={BOARD}): {len(dg.rows)}")
    counts = defaultdict(int)
    for r in dg.rows:
        a = dg.classify(r)
        counts[a or "untouched(case-C/ok)"] += 1
    for k in sorted(counts, key=lambda k: -counts[k]):
        print(f"  {k:28s} {counts[k]}")

    # split case B by what the old norm looked like
    wrong_from_template = wrong_other = wrong_null = 0
    for r in dg.rows:
        if dg.classify(r) == "regen_norm":
            nt = r["norm_text"] or ""
            if not nt:
                wrong_null += 1
            elif any(p in nt for p in TEMPLATE_PATTERNS):
                wrong_from_template += 1
            else:
                wrong_other += 1
    print(f"  regen_norm breakdown: old-norm-was-template="
          f"{wrong_from_template}, old-norm-null={wrong_null}, other={wrong_other}")

    before = _group_metrics(dg.groups)
    print("metrics BEFORE:", json.dumps(before, indent=2))
    after_groups = _simulate_after(dg)
    after = _group_metrics(after_groups)
    print("metrics AFTER (simulated):", json.dumps(after, indent=2))

    # remaining degenerate groups after repair — the honest floor
    rem = sorted(
        ((nt, rows) for nt, rows in after_groups.items() if len(rows) >= MIN_GROUP),
        key=lambda kv: -len(kv[1]))
    print(f"remaining degenerate groups (>= {MIN_GROUP}): {len(rem)}")
    for nt, rows in rem[:12]:
        keys = len({r['akey'] for r in rows})
        print(f"  {len(rows):5d} rows, {keys:4d} distinct keys :: {nt[:90]}")
    return before, after


def _write_backup(path, touched):
    """One manifest line, then one line per touched row. Returns row count."""
    n = 0
    with open(path, "w", encoding="utf-8") as f:
        f.write(json.dumps({
            "_manifest": {
                "tool": "backend.tests.bank_norm_repair",
                "board": BOARD,
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "touched_rows": len(touched),
                "restore": (
                    'for action="regen_norm": UPDATE board_questions SET '
                    'norm_text=fields.old.norm_text WHERE id=fields.id; '
                    'for action="flag_*": DELETE FROM board_question_flags '
                    'WHERE question_id=fields.id'),
            }}) + "\n")
        for r, action in touched:
            f.write(json.dumps({
                "id": r["id"], "action": action,
                "old": {k: r[k] for k in (
                    "norm_text", "question_text", "correct_answer",
                    "model_answer", "subject", "class_level",
                    "source_type", "source_file", "board")},
            }, ensure_ascii=False) + "\n")
            n += 1
    assert n == len(touched), "backup row count mismatch"
    return n


def _validate_backup(path, touched_count):
    """Re-read the backup: line count must match, every line parses,
    every regen row carries the old norm_text."""
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()
    manifest = json.loads(lines[0])["_manifest"]
    rows = [json.loads(l) for l in lines[1:]]
    assert manifest["touched_rows"] == len(rows) == touched_count, (
        f"backup manifest {manifest['touched_rows']} vs lines {len(rows)} "
        f"vs touched {touched_count}")
    bad = [r for r in rows
           if r["action"] == "regen_norm" and "norm_text" not in r["old"]]
    assert not bad, f"{len(bad)} regen rows missing old norm_text"
    ids = {r["id"] for r in rows}
    assert len(ids) == len(rows), "duplicate ids in backup"
    return len(rows)


def apply(dg: Diagnosis, backup_path: str | None):
    touched = []
    regen = []      # (id, new_norm)
    flags_tpl = []  # (id,)
    flags_key = []  # (id,)
    for r in dg.rows:
        a = dg.classify(r)
        if a == "regen_norm":
            regen.append((r["id"], r["qnorm"]))
            touched.append((r, a))
        elif a == "flag_template_row":
            flags_tpl.append((r["id"],))
            touched.append((r, a))
        elif a == "flag_no_answer_key":
            flags_key.append((r["id"],))
            touched.append((r, a))

    print(f"== APPLY == regen_norm={len(regen)} "
          f"flag_template={len(flags_tpl)} flag_no_answer={len(flags_key)}")
    if not touched:
        print("nothing to do")
        return 0
    if backup_path:
        n = _write_backup(backup_path, touched)
        chk = _validate_backup(backup_path, len(touched))
        print(f"backup written+validated: {backup_path} ({chk} rows)")
    else:
        print("WARNING: refusing to apply without --backup")
        return 2

    from psycopg2.extras import execute_batch

    conn = dg.conn
    try:
        cur = conn.cursor()
        cur.execute(f"""
            CREATE TABLE IF NOT EXISTS {FLAGS_TABLE} (
                question_id uuid PRIMARY KEY
                    REFERENCES {TABLE}(id) ON DELETE CASCADE,
                reason varchar(32) NOT NULL,
                created_at timestamptz NOT NULL DEFAULT now()
            )""")
        if regen:
            execute_batch(cur,
                f"UPDATE {TABLE} SET norm_text = %s WHERE id = %s",
                [(nn, rid) for (rid, nn) in regen], page_size=500)
        if flags_tpl:
            execute_batch(cur,
                f"INSERT INTO {FLAGS_TABLE} (question_id, reason)"
                " VALUES (%s, 'template_row') ON CONFLICT DO NOTHING",
                flags_tpl, page_size=500)
        if flags_key:
            execute_batch(cur,
                f"INSERT INTO {FLAGS_TABLE} (question_id, reason)"
                " VALUES (%s, 'no_answer_key') ON CONFLICT DO NOTHING",
                flags_key, page_size=500)
        conn.commit()
        print("transaction committed (single txn)")
    except Exception:
        conn.rollback()
        raise

    # spot post-checks on fresh connections
    from sqlalchemy import text

    with dg._eng.connect() as cx:
        pc = {}
        pc["flags_total"] = cx.execute(text(
            f"SELECT count(*) FROM {FLAGS_TABLE}")).scalar()
        pc["flags_template"] = cx.execute(text(
            f"SELECT count(*) FROM {FLAGS_TABLE}"
            " WHERE reason='template_row'")).scalar()
        pc["flags_no_answer"] = cx.execute(text(
            f"SELECT count(*) FROM {FLAGS_TABLE}"
            " WHERE reason='no_answer_key'")).scalar()
        # every regen id must now carry its expected norm: sample the first,
        # middle and last
        if regen:
            samples = [regen[0], regen[len(regen) // 2], regen[-1]]
            ok = 0
            for rid, nn in samples:
                got = cx.execute(text(
                    f"SELECT norm_text FROM {TABLE} WHERE id = :i"),
                    {"i": rid}).scalar()
                ok += 1 if got == nn else 0
            pc["regen_sample"] = f"{ok}/3 match"
        print("post-checks:", json.dumps(pc, indent=2))
    return 0


def postcheck(eng):
    """Fresh full re-scan (flags respected) — the honest AFTER numbers."""
    from sqlalchemy import text

    dg2 = Diagnosis()
    dg2.load(eng)
    # drop flagged rows, exactly as the wired queries do
    with eng.connect() as cx:
        flagged = {str(r) for (r,) in cx.execute(
            text(f"SELECT question_id FROM {FLAGS_TABLE}"))}
    live = [r for r in dg2.rows if r["id"] not in flagged]
    groups = defaultdict(list)
    for r in live:
        groups[r["norm_text"] or ""].append(r)
    m = _group_metrics(groups)
    print("metrics AFTER (fresh scan, flags respected):",
          json.dumps(m, indent=2))
    rem = sorted(
        ((nt, rows) for nt, rows in groups.items() if len(rows) >= MIN_GROUP),
        key=lambda kv: -len(kv[1]))
    print(f"remaining degenerate groups (>= {MIN_GROUP}): {len(rem)}")
    for nt, rows in rem[:12]:
        keys = len({r['akey'] for r in rows})
        print(f"  {len(rows):5d} rows, {keys:4d} distinct keys :: {nt[:90]}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--diagnose", action="store_true")
    ap.add_argument("--postcheck", action="store_true",
                    help="fresh re-scan AFTER an apply: real after-metrics")
    ap.add_argument("--backup", default=None)
    ap.add_argument("--table", default=None,
                    help="copy-table override for testing "
                         "(e.g. board_questions_repairtest); production "
                         "apply MUST omit this")
    args = ap.parse_args()

    global TABLE, FLAGS_TABLE
    if args.table:
        TABLE = args.table
        FLAGS_TABLE = args.table + "_flags"

    eng = _connect()
    if args.postcheck:
        postcheck(eng)
        return 0

    dg = Diagnosis()
    dg._eng = eng
    print("loading board_questions (streaming)...")
    dg.load(eng)
    dg.conn = eng.raw_connection()

    if args.diagnose or not args.apply:
        diagnose(dg)
        if not args.apply:
            return 0
    return apply(dg, args.backup)


if __name__ == "__main__":
    sys.exit(main())
