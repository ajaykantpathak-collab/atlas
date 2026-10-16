"""test_wsa_shared_state.py — WSA-P4: shared-state + path hardening.

Agent ovhA-p4 (packet WSA-P4, 2026-10-10). Proves:
  1. the verified-answer memo survives concurrent/cross-worker puts
     (lock + merge-on-write), is LRU-bounded (ANSWER_MEMO_MAX_ROWS),
     and never clobbers rows it did not write;
  2. the official-key sqlite lookup is safe under concurrent pool
     threads without a shared unlocked connection;
  3. NeuroLinkEngine.get_instance constructs exactly once under
     concurrent callers (double-checked locking);
  4. runtime-data paths resolve env-first (CBSE_DATA_DIR authoritative,
     Windows literals only as a last-resort fallback);
  5. neurolink compute lanes refuse proof-typed asks (ask_coherence,
     fail-open) instead of shipping a bare value as VERIFIED.

Native verify: cd D:/platform/deploy/backend && python -m pytest
tests/test_wsa_shared_state.py -q
"""
from __future__ import annotations

import json
import os
import sqlite3
import sys
import threading
import types
from pathlib import Path

import pytest

from backend.its.solver import answer_pipeline as ap
from backend.its.solver import bank_answer as ba
from backend.its.solver import neurolink as nl


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

def _reset_memo(monkeypatch, tmp_path) -> Path:
    """Point the memo at tmp_path (env-first) and forget cached state."""
    monkeypatch.setenv("CBSE_DATA_DIR", str(tmp_path))
    ap._ANS_MEMO_PATH = None
    ap._ANS_MEMO = None
    for attr in ("_ANS_MEMO_MTIME",):
        if hasattr(ap, attr):
            setattr(ap, attr, None)
    return tmp_path


def _mk_result(answer: str = "42", label: str = "VERIFIED"):
    return ap.PipelineResult(
        label=label, answer=answer, numeric=float(len(answer)),
        steps=[f"step for {answer}"], audit=ap.AuditTrail(lane="A"))


def _memo_rows_on_disk(tmp_path) -> dict:
    p = tmp_path / "answer_memo.json"
    if not p.exists():
        return {}
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


# --------------------------------------------------------------------------- #
# 1. memo: concurrency, cross-worker merge, LRU cap
# --------------------------------------------------------------------------- #

def test_memo_concurrent_puts(monkeypatch, tmp_path):
    """16 barrier-synchronized threads x distinct puts -> all 16 rows
    survive in the reloaded file and the file is never torn."""
    _reset_memo(monkeypatch, tmp_path)
    n = 16
    barrier = threading.Barrier(n)

    def worker(i: int, errors: list):
        try:
            barrier.wait(timeout=10)
            ap._ans_memo_put(f"question number {i}", _mk_result(f"a{i}"))
        except BaseException as exc:  # pragma: no cover - failure evidence
            errors.append(exc)

    errors: list = []
    threads = [threading.Thread(target=worker, args=(i, errors))
               for i in range(n)]
    for t in threads:
        t.start()
    for t in threads:
        t.join(timeout=30)
    assert not errors, f"worker exceptions: {errors!r}"

    # reload from disk exactly like a fresh worker process would
    ap._ANS_MEMO = None
    rows = _memo_rows_on_disk(tmp_path)
    assert len(rows) == n, (
        f"lost memo rows under concurrent puts: {len(rows)}/{n} survived")
    for i in range(n):
        assert f"question number {i}" in rows


def test_memo_worker_lost_update(monkeypatch, tmp_path):
    """Two warm workers (uvicorn x2 topology): worker A banks q2 after
    worker B booted; worker B's next put must MERGE q2 into its write,
    not clobber it with its stale in-memory dict."""
    _reset_memo(monkeypatch, tmp_path)

    # worker A cold-boots and banks q1
    ap._ans_memo_put("question one", _mk_result("ans1"))
    assert "question one" in _memo_rows_on_disk(tmp_path)

    # worker B cold-boots later: fresh process state, loads q1 from disk
    worker_a_state = dict(ap._ANS_MEMO or {})
    ap._ANS_MEMO = None                      # B's fresh load
    ap._ans_memo_put("question two", _mk_result("ans2"))

    # worker A (still warm, unaware of q2) banks q3
    ap._ANS_MEMO = worker_a_state            # A's stale process memory
    ap._ans_memo_put("question three", _mk_result("ans3"))

    rows = _memo_rows_on_disk(tmp_path)
    assert "question one" in rows
    assert "question two" in rows, (
        "cross-worker lost update: worker A's write clobbered q2 "
        "(last-writer-wins without merge-on-write)")
    assert "question three" in rows


def test_memo_cap(monkeypatch, tmp_path):
    """ANSWER_MEMO_MAX_ROWS bounds the memo (LRU eviction), in memory and
    on disk — unbounded growth was the WSA-P4 defect."""
    _reset_memo(monkeypatch, tmp_path)
    monkeypatch.setenv("ANSWER_MEMO_MAX_ROWS", "50")
    for i in range(150):
        ap._ans_memo_put(f"capped question {i}", _mk_result(f"c{i}"))
    assert len(ap._ans_memo_load()) <= 50
    assert len(_memo_rows_on_disk(tmp_path)) <= 50
    # LRU, not FIFO-of-insertion-order-loss: the newest rows must survive
    memo = ap._ans_memo_load()
    assert "capped question 149" in memo
    assert "capped question 0" not in memo


def test_memo_cap_zero_disables_banking(monkeypatch, tmp_path):
    """ANSWER_MEMO_MAX_ROWS=0 is the operator kill-switch documented on
    _ans_memo_max_rows: banking writes nothing, and (the defect) the
    memo must not grow unboundedly just because eviction is disabled."""
    _reset_memo(monkeypatch, tmp_path)
    monkeypatch.setenv("ANSWER_MEMO_MAX_ROWS", "0")
    assert ap._ans_memo_max_rows() == 0
    for i in range(20):
        ap._ans_memo_put(f"killswitch question {i}", _mk_result(f"k{i}"))
    assert _memo_rows_on_disk(tmp_path) == {}, (
        "cap=0 must disable banking (documented kill-switch), not bank "
        "with eviction off (unbounded growth)")
    assert not ap._ans_memo_load()


def test_memo_get_is_version_checked_and_lru_touches(monkeypatch, tmp_path):
    _reset_memo(monkeypatch, tmp_path)
    monkeypatch.setenv("ANSWER_MEMO_MAX_ROWS", "3")
    for i in range(3):
        ap._ans_memo_put(f"lru question {i}", _mk_result(f"l{i}"))
    # touch q0 so q1 becomes the least-recently-used row
    got = ap._ans_memo_get("lru question 0")
    assert got is not None and got.answer == "l0"
    ap._ans_memo_put("lru question 3", _mk_result("l3"))
    memo = ap._ans_memo_load()
    assert "lru question 0" in memo   # touched -> survived
    assert "lru question 1" not in memo  # LRU victim


def test_memo_put_leaves_guided_out(monkeypatch, tmp_path):
    _reset_memo(monkeypatch, tmp_path)
    ap._ans_memo_put("guided q", _mk_result("no", label="GUIDED_PRACTICE"))
    assert _memo_rows_on_disk(tmp_path) == {}


# --------------------------------------------------------------------------- #
# 2. official-key sqlite lookup: thread-safe, no shared unlocked conn
# --------------------------------------------------------------------------- #

def _make_key_bank(tmp_path, letter: str = "B"):
    from backend.tools.mine_keys import canonical_hash, numeric_signature
    q = "A body moves 12 m in 4 s. What is its speed?"
    db = tmp_path / "question_bank.db"
    conn = sqlite3.connect(db)
    conn.execute(
        "CREATE TABLE key_fingerprints (fingerprint TEXT, numeric_sig TEXT,"
        " letter TEXT, answer_text TEXT, source_doc_id TEXT,"
        " source_qno TEXT)")
    conn.execute(
        "INSERT INTO key_fingerprints VALUES (?,?,?,?,?,?)",
        (canonical_hash(q), "|".join(numeric_signature(q)), letter,
         "3 m/s", "doc-1", "7"))
    conn.commit()
    conn.close()
    return q, letter


def test_key_lookup_concurrent(monkeypatch, tmp_path):
    """Concurrent pool-thread lookups all resolve (no silent None from a
    cross-thread sqlite error), and a mismatch still misses."""
    q, letter = _make_key_bank(tmp_path)
    monkeypatch.setenv("CBSE_DATA_DIR", str(tmp_path))
    if hasattr(ap, "_KEY_CONN"):
        ap._KEY_CONN = None

    n, r = 8, 25
    barrier = threading.Barrier(n)
    hits: list = []
    errors: list = []

    def worker():
        try:
            barrier.wait(timeout=10)
            for _ in range(r):
                got = ap._official_key_lookup(q)
                if got is not None:
                    hits.append(got)
        except BaseException as exc:  # pragma: no cover - failure evidence
            errors.append(exc)

    threads = [threading.Thread(target=worker) for _ in range(n)]
    for t in threads:
        t.start()
    for t in threads:
        t.join(timeout=30)
    assert not errors, f"lookup exceptions: {errors!r}"
    assert len(hits) == n * r, (
        f"{n * r - len(hits)} lookups silently lost under concurrency")
    assert all(h["letter"] == letter for h in hits)
    assert ap._official_key_lookup("totally unrelated text") is None


def test_key_lookup_resolves_env_data_dir(monkeypatch, tmp_path):
    """The bank db path must follow CBSE_DATA_DIR (env-first), so a
    container mount is honored without any Windows literal."""
    q, letter = _make_key_bank(tmp_path)
    monkeypatch.setenv("CBSE_DATA_DIR", str(tmp_path))
    if hasattr(ap, "_KEY_CONN"):
        ap._KEY_CONN = None
    got = ap._official_key_lookup(q)
    assert got is not None and got["letter"] == letter


# --------------------------------------------------------------------------- #
# 3. NeuroLinkEngine singleton: double-checked locking
# --------------------------------------------------------------------------- #

def test_neurolink_singleton_single_init(monkeypatch):
    """16 concurrent get_instance() calls construct the engine exactly
    once (the unlocked check-then-assign race double-loads the corpus
    index in production)."""
    monkeypatch.setattr(nl.NeuroLinkEngine, "_instance", None)
    init_count = []
    real_init = nl.NeuroLinkEngine.__init__

    def counting_init(self):
        init_count.append(1)
        time_mod = sys.modules["time"]
        time_mod.sleep(0.03)     # widen the check-then-assign window
        real_init(self)

    monkeypatch.setattr(nl.NeuroLinkEngine, "__init__", counting_init)
    n = 16
    barrier = threading.Barrier(n)
    instances: list = []

    def worker():
        barrier.wait(timeout=10)
        instances.append(nl.NeuroLinkEngine.get_instance())

    threads = [threading.Thread(target=worker) for _ in range(n)]
    for t in threads:
        t.start()
    for t in threads:
        t.join(timeout=30)
    assert len(instances) == n
    assert len({id(i) for i in instances}) == 1, "multiple engine instances"
    assert len(init_count) == 1, (
        f"singleton constructed {len(init_count)}x under concurrency")
    # restore a clean singleton for other tests
    nl.NeuroLinkEngine._instance = nl.NeuroLinkEngine()


# --------------------------------------------------------------------------- #
# 4. paths: env-first resolution, Windows literal last resort
# --------------------------------------------------------------------------- #

def test_paths_env_override(monkeypatch, tmp_path):
    """With CBSE_DATA_DIR set, memo/npz/key-bank paths resolve under it —
    even when the file does not exist there (env is authoritative, the
    Windows literal is not consulted)."""
    from backend.its.solver import paths as sp
    monkeypatch.setenv("CBSE_DATA_DIR", str(tmp_path))

    assert sp.data_file("answer_memo.json").startswith(str(tmp_path))
    assert sp.data_file("bank_q_embed.npz").startswith(str(tmp_path))
    assert sp.data_file("question_bank.db").startswith(str(tmp_path))

    # memo site
    ap._ANS_MEMO_PATH = None
    assert ap._ans_memo_path().startswith(str(tmp_path))
    # npz site (bank semantic index)
    assert ba._bank_npz_path().startswith(str(tmp_path))
    # env wins even when nothing exists under it (no D:\ fallback)
    assert "D:\\" not in ba._bank_npz_path()
    assert "D:\\" not in ap._ans_memo_path()


def test_paths_ladder_without_env(monkeypatch):
    """Without CBSE_DATA_DIR the package-relative cbse_data dir is used
    (the container mount /app/cbse_data); a drive-letter literal is only
    consulted when that dir does not exist at all."""
    from backend.its.solver import paths as sp
    monkeypatch.delenv("CBSE_DATA_DIR", raising=False)
    pkg_cbse = os.path.normpath(os.path.join(
        os.path.dirname(sp.__file__), "..", "..", "..", "cbse_data"))
    p = sp.data_file("anything.bin")
    if os.path.isdir(pkg_cbse):
        assert p == os.path.join(pkg_cbse, "anything.bin")
    else:
        assert p.endswith("anything.bin")  # still a resolvable candidate


# --------------------------------------------------------------------------- #
# 5. neurolink: POSTGRES_PASSWORD env-first + ask_coherence gate
# --------------------------------------------------------------------------- #

class _FakePG:
    def __init__(self, store):
        self.store = store

    def connect(self, **kwargs):
        self.store.append(kwargs)
        return types.SimpleNamespace(close=lambda: None)


def test_neurolink_password_env_first(monkeypatch):
    """POSTGRES_PASSWORD from the environment wins over any .env file —
    inside the Linux containers D:\\platform\\deploy\\.env never exists,
    which silently killed the DB-backed neurolink lanes in prod."""
    fake = _FakePG([])
    monkeypatch.setitem(sys.modules, "psycopg2", fake)
    monkeypatch.setenv("POSTGRES_PASSWORD", "env-secret-123")
    eng = nl.NeuroLinkEngine()
    eng._db_pw = None
    conn = eng._get_db_conn()
    assert conn is not None
    assert fake.store and fake.store[0]["password"] == "env-secret-123"


def test_neurolink_password_env_file_ladder(monkeypatch, tmp_path):
    fake = _FakePG([])
    monkeypatch.setitem(sys.modules, "psycopg2", fake)
    monkeypatch.delenv("POSTGRES_PASSWORD", raising=False)
    env_file = tmp_path / "custom.env"
    env_file.write_text("OTHER=x\nPOSTGRES_PASSWORD=file-secret-9\n",
                        encoding="utf-8")
    monkeypatch.setenv("CBSE_ENV_FILE", str(env_file))
    eng = nl.NeuroLinkEngine()
    eng._db_pw = None
    eng._get_db_conn()
    assert fake.store and fake.store[0]["password"] == "file-secret-9"


def _fake_calculus_engine():
    def solve(op, **kwargs):
        return types.SimpleNamespace(
            success=True, answer="2*x", exact_answer="2*x",
            steps=[types.SimpleNamespace(
                step_number=1, rule_applied="power rule",
                rule_formula="d/dx x^n", input_expr="x**2",
                output_expr="2*x", explanation="power rule", hint=None)],
            backend_used="fake", verified=True, verification_detail="ok")
    return types.SimpleNamespace(solve=solve)


def test_neurolink_ask_gate_blocks_proof_asks():
    """A proof-typed ask ('Prove that ...') must not be answered by a
    compute lane with a bare value labeled VERIFIED — the lane declines
    (ask_coherence, fail-open) and the honest proof lanes get their turn."""
    eng = nl.NeuroLinkEngine()
    eng._calculus_engine = _fake_calculus_engine()

    ok = eng.solve_calculus("differentiate x^2")
    assert ok is not None and ok["status"] == "verified"

    refused = eng.solve_calculus(
        "Prove that the derivative of x^2 is 2x")
    assert refused is None, (
        "compute lane answered a proof ask with a bare value")


def test_neurolink_ask_gate_fail_open_and_declarations():
    assert nl._ask_gate("What is the capital of France?") is True
    assert nl._ask_gate("Prove that A equals B") is False
    # the dimensional lane legitimately serves 'verify that' asks
    assert nl._ask_gate("Verify that F = m a is dimensionally correct",
                        declared={"proof"}) is True
    # unknown declared kinds never block unrelated asks (fail-open)
    assert nl._ask_gate("State Ohm's law", declared={"concept"}) is True
    # empty/None ask never blocks
    assert nl._ask_gate("") is True


def test_neurolink_v3_lanes_gated_via_fast_solve(monkeypatch):
    """fast_solve (the v3 cascade funnel) must decline proof asks the
    same way its inner engines do — the engine gate is upstream of both
    the /solve pre-route and the v3 direct lanes."""
    eng = nl.NeuroLinkEngine()
    eng._calculus_engine = _fake_calculus_engine()
    # keep the fall-through light: no corpus index, no DB
    monkeypatch.setattr(eng, "_get_index", lambda: None)
    monkeypatch.setattr(eng, "_get_db_conn", lambda: None)

    ok = eng.fast_solve("differentiate x^2")
    assert ok is not None and ok["status"] == "verified"

    refused = eng.fast_solve("Prove that the derivative of x^2 is 2x")
    assert refused is None
