"""
Behavioural tests for the worker tier (A6-OPS, 2026-10-02).

Covers:
  1. jobs queue (backend/workers/jobs.py) on throwaway sqlite files:
     - claim-skip: two concurrent claimers, one job -> exactly one wins
     - retry-with-attempts + backoff window
     - error capture into the row; permanent failure after max_attempts
     - stale-claim requeue
     - the Postgres claim path renders FOR UPDATE SKIP LOCKED + RETURNING
  2. worker loop (backend/workers/main.py):
     - graceful SIGTERM: handler sets the stop flag; loop drains the
       in-flight job and exits without claiming new work
     - per-job timeout + unknown-kind permanent failure
  3. compliance fulfilment (modules/compliance/fulfilment.py) against
     throwaway sqlite mirrors of BOTH databases:
     - export produces the expected JSON keys for a throwaway user and
       marks the DataRequest done
     - erasure anonymises PII + pseudonymises audit/consents + marks done,
       and is idempotent

The queue code is dialect-portable by design, so sqlite exercises the same
guarded-update claim logic the worker runs against Postgres; the literal
Postgres SKIP LOCKED statement is asserted separately below.
"""

from __future__ import annotations

import json
import os
import signal
import sys
import threading
import time
import uuid
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND.parent) not in sys.path:
    sys.path.insert(0, str(_BACKEND.parent))

from backend.workers import jobs  # noqa: E402
from backend.workers import main as worker_main  # noqa: E402
from backend.modules.compliance import fulfilment as ful  # noqa: E402


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Jobs queue
# ---------------------------------------------------------------------------
class TestJobsQueue:
    @pytest.fixture()
    def queue(self, tmp_path, monkeypatch):
        """Fresh sqlite-backed queue per test."""
        db = tmp_path / "jobs.db"
        jobs.set_url_override(f"sqlite:///{db}")
        jobs.init_queue()
        # deterministic, short retry backoff (claim() takes `now` anyway)
        monkeypatch.setattr(jobs, "DEFAULT_BACKOFF_S", 30.0)
        yield jobs
        jobs.set_url_override(None)

    def test_enqueue_and_claim_roundtrip(self, queue):
        jid = queue.enqueue("content_reindex", {"reason": "test"})
        job = queue.claim("w1")
        assert job is not None
        assert job["id"] == jid
        assert job["kind"] == "content_reindex"
        assert job["payload"] == {"reason": "test"}
        assert job["attempts"] == 1

    def test_claim_skip_second_claimer_gets_nothing(self, queue):
        """One pending job: the first claimer wins, the second is skipped."""
        queue.enqueue("embed_rebuild", {})
        first = queue.claim("w1")
        second = queue.claim("w2")
        assert first is not None
        assert second is None  # job is 'running' — skipped, not double-claimed

    def test_claim_skip_concurrent_exactly_one_winner(self, queue):
        """N threads race for ONE job: exactly one non-None claim, total."""
        queue.enqueue("nightly_selfprobe", {})
        n = 8
        barrier = threading.Barrier(n)
        results: list = []
        lock = threading.Lock()

        def claimer(i):
            barrier.wait()  # maximise contention
            job = queue.claim(f"w{i}")
            with lock:
                results.append(job)

        threads = [threading.Thread(target=claimer, args=(i,)) for i in range(n)]
        for t in threads:
            t.start()
        for t in threads:
            t.join(timeout=30)
        winners = [r for r in results if r is not None]
        assert len(results) == n
        assert len(winners) == 1, f"expected exactly 1 winner, got {len(winners)}"
        assert winners[0]["attempts"] == 1

    def test_retry_with_attempts_and_backoff(self, queue):
        jid = queue.enqueue("content_reindex", {}, max_attempts=2)
        job = queue.claim("w1")
        assert job["attempts"] == 1
        status = queue.fail(jid, "transient boom #1")
        assert status == "pending"  # budget remains -> requeued
        # Backoff window: not claimable NOW, claimable after the backoff.
        assert queue.claim("w2") is None
        later = _utcnow() + timedelta(seconds=90)
        job2 = queue.claim("w2", now=later)
        assert job2 is not None
        assert job2["attempts"] == 2  # attempts increment across retries

    def test_error_captured_and_failed_after_budget(self, queue):
        jid = queue.enqueue("content_reindex", {}, max_attempts=2)
        queue.claim("w1")
        queue.fail(jid, "transient boom #1")
        later = _utcnow() + timedelta(seconds=90)
        queue.claim("w2", now=later)
        status = queue.fail(jid, "fatal boom #2")
        assert status == "failed"
        row = self._row(jid)
        assert row["status"] == "failed"
        assert "fatal boom #2" in (row["error"] or "")
        # final state is terminal: nothing more to claim
        assert queue.claim("w3", now=later) is None

    def test_error_captured_first_failure(self, queue):
        """The error text lands in the row on the FIRST failure too."""
        jid = queue.enqueue("content_reindex", {}, max_attempts=3)
        queue.claim("w1")
        queue.fail(jid, "first error captured")
        row = self._row(jid)
        assert row["status"] == "pending"
        assert "first error captured" in (row["error"] or "")

    def test_complete_marks_done_with_result(self, queue):
        jid = queue.enqueue("nightly_selfprobe", {})
        queue.claim("w1")
        assert queue.complete(jid, {"ok": True}) is True
        row = self._row(jid)
        assert row["status"] == "done"
        result = row["result"]
        if isinstance(result, str):  # raw SQL select returns JSON text
            result = json.loads(result)
        assert result == {"ok": True}
        # a second complete() on a 'done' row is rejected
        assert queue.complete(jid, {"again": True}) is False

    def test_requeue_stale_claim(self, queue):
        jid = queue.enqueue("content_reindex", {})
        queue.claim("w1")
        # claimed_at is now; a stale cutoff 1s in the future requeues it
        n = queue.requeue_stale(stale_after_s=1.0,
                                now=_utcnow() + timedelta(seconds=2))
        assert n == 1
        job = queue.claim("w2")
        assert job is not None and job["id"] == jid
        assert job["attempts"] == 2

    def test_postgres_claim_sql_uses_skip_locked(self, queue, monkeypatch):
        """The Postgres claim must be the atomic SKIP LOCKED statement."""
        captured = {}

        class FakeResult:
            def mappings(self):
                return self

            def first(self):
                return None

        class FakeDialect:
            name = "postgresql"

        class FakeBind:
            dialect = FakeDialect()

        class FakeSession:
            bind = FakeBind()

            def execute(self, sql, params):
                captured["sql"] = str(sql)
                captured["params"] = params
                return FakeResult()

            def commit(self):
                captured["committed"] = True

        assert queue._claim_postgres(FakeSession(), "w1", _utcnow(), None) is None
        sql = captured["sql"]
        assert "FOR UPDATE SKIP LOCKED" in sql
        assert "RETURNING id, kind, payload" in sql
        assert "status = 'running'" in sql
        assert "attempts = attempts + 1" in sql
        assert captured["committed"] is True

    # -- helpers -------------------------------------------------------- #
    @staticmethod
    def _row(job_id: str) -> dict:
        import sqlalchemy as sa
        s = jobs.get_session()
        try:
            r = s.execute(sa.text(
                "SELECT id, status, error, attempts, result "
                "FROM jobs WHERE id=:id"),
                {"id": job_id}).mappings().first()
            return dict(r) if r else {}
        finally:
            s.close()


# ---------------------------------------------------------------------------
# Worker loop + graceful SIGTERM
# ---------------------------------------------------------------------------
class TestWorkerLoop:
    @pytest.fixture()
    def queue(self, tmp_path):
        db = tmp_path / "jobs.db"
        jobs.set_url_override(f"sqlite:///{db}")
        jobs.init_queue()
        yield jobs
        jobs.set_url_override(None)

    def test_sigterm_sets_stop_and_drains_in_flight(self, queue):
        """SIGTERM mid-job: the in-flight job finishes; no new claims after."""
        started = threading.Event()
        finish = threading.Event()

        def slow_handler(payload):
            started.set()
            finish.wait(timeout=10)
            return {"done": True}

        w = worker_main.Worker(worker_id="test-w",
                               handlers={"slow": slow_handler})
        jid = queue.enqueue("slow", {})
        loop_result: list = []

        def run():
            loop_result.append(w.run_loop(poll_seconds=0.02))

        th = threading.Thread(target=run)
        th.start()
        assert started.wait(timeout=10), "handler never started"
        # ...job in flight — deliver SIGTERM via the registered handler
        w._handle_signal(signal.SIGTERM, None)
        assert w.stop_event.is_set()
        assert w.last_signal == int(signal.SIGTERM)
        finish.set()
        th.join(timeout=15)
        assert not th.is_alive(), "loop did not exit after SIGTERM"
        assert loop_result and loop_result[0] == 1  # exactly the in-flight job
        row = self._row(jid)
        assert row["status"] == "done"  # drained, not abandoned

        # post-stop: no new work is claimed
        queue.enqueue("slow", {})
        assert w.poll_once() is False
        assert self._row_count("running") == 0

    def test_sigterm_before_loop_processes_nothing(self, queue):
        ran = []

        def handler(payload):
            ran.append(payload)

        w = worker_main.Worker(worker_id="test-w", handlers={"k": handler})
        w._handle_signal(signal.SIGINT, None)  # stop BEFORE the loop
        assert w.run_loop(poll_seconds=0.01) == 0
        queue.enqueue("k", {})
        assert ran == []

    def test_job_timeout_marks_failed(self, queue, monkeypatch):
        def hanging(payload):
            time.sleep(2)  # kept short: the thread outlives the timeout

        monkeypatch.setattr(worker_main, "JOB_TIMEOUT_S", 0.1)
        w = worker_main.Worker(worker_id="test-w", handlers={"hang": hanging})
        jid = queue.enqueue("hang", {})
        w.run_job(queue.claim("w1"))
        row = self._row(jid)
        assert row["status"] in ("pending", "failed")  # timeout is retryable
        assert "timeout after 0s" in (row["error"] or "") or \
            "timeout" in (row["error"] or "")

    def test_handler_exception_captured(self, queue):
        def broken(payload):
            raise RuntimeError("handler exploded")

        w = worker_main.Worker(worker_id="test-w", handlers={"broken": broken})
        jid = queue.enqueue("broken", {}, max_attempts=1)
        w.poll_once()
        row = self._row(jid)
        assert row["status"] == "failed"
        assert "handler exploded" in (row["error"] or "")

    def test_unknown_kind_fails_permanently(self, queue):
        w = worker_main.Worker(worker_id="test-w", handlers={})
        jid = queue.enqueue("nonexistent_kind", {})
        w.poll_once()
        row = self._row(jid)
        assert row["status"] == "failed"
        assert "no handler" in (row["error"] or "")

    def test_embed_rebuild_stub_mode(self, queue, monkeypatch, tmp_path):
        monkeypatch.setenv("WORKER_EMBED_REBUILD_MODE", "stub")
        out = worker_main.embed_rebuild({})
        assert out.get("stub") is True and "todo" in out

    def test_nightly_selfprobe_records_results(self, monkeypatch, tmp_path):
        """Full handler run against a REAL localhost HTTP server."""
        import http.server
        import threading as _threading

        class H(http.server.BaseHTTPRequestHandler):
            def _code(self):
                return 200 if self.path in ("/api/health", "/ready") else 401

            def do_GET(self):
                self.send_response(self._code())
                self.end_headers()
                self.wfile.write(b"{}")

            do_POST = do_GET

            def log_message(self, *a):  # silence
                pass

        srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), H)
        _threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            monkeypatch.setattr(
                worker_main, "PROBE_BASE_URL",
                f"http://127.0.0.1:{srv.server_address[1]}")
            monkeypatch.setattr(worker_main, "STATE_DIR", str(tmp_path))
            out = worker_main.nightly_selfprobe({})
            assert len(out["probes"]) == 5
            assert out["all_ok"] is True, out["failures"]
            assert all(p["ok"] and p["status"] in p["expected"]
                       for p in out["probes"])
            saved = json.loads(
                (tmp_path / "selfprobe_latest.json").read_text(
                    encoding="utf-8"))
            assert saved["all_ok"] is True  # results recorded to disk
        finally:
            srv.shutdown()

    def test_nightly_selfprobe_backend_down_still_records(self, monkeypatch,
                                                          tmp_path):
        """A dead backend must be RECORDED (all_ok False), not raise."""
        monkeypatch.setattr(worker_main, "PROBE_BASE_URL",
                            "http://127.0.0.1:9")  # discard port: refused
        monkeypatch.setattr(worker_main, "STATE_DIR", str(tmp_path))
        out = worker_main.nightly_selfprobe({})
        assert out["all_ok"] is False
        assert len(out["failures"]) == 5
        assert (tmp_path / "selfprobe_latest.json").exists()

    # -- helpers -------------------------------------------------------- #
    @staticmethod
    def _row(job_id: str) -> dict:
        import sqlalchemy as sa
        s = jobs.get_session()
        try:
            r = s.execute(sa.text(
                "SELECT id, status, error, attempts FROM jobs WHERE id=:id"),
                {"id": job_id}).mappings().first()
            return dict(r) if r else {}
        finally:
            s.close()

    @staticmethod
    def _row_count(status: str) -> int:
        import sqlalchemy as sa
        s = jobs.get_session()
        try:
            r = s.execute(sa.text(
                "SELECT COUNT(*) c FROM jobs WHERE status=:s"),
                {"s": status}).mappings().first()
            return int(r["c"]) if r else 0
        finally:
            s.close()


# ---------------------------------------------------------------------------
# Compliance fulfilment (export + erasure) on sqlite mirrors of both DBs
# ---------------------------------------------------------------------------
class TestComplianceFulfilment:
    @pytest.fixture()
    def dbs(self, tmp_path):
        from sqlalchemy import create_engine
        from sqlalchemy.orm import sessionmaker
        from backend.database import Base as MainBase
        from backend.modules.compliance.models import Base as CmpBase

        main_engine = create_engine(
            f"sqlite:///{tmp_path / 'main.db'}",
            connect_args={"check_same_thread": False})
        cmp_engine = create_engine(
            f"sqlite:///{tmp_path / 'compliance.db'}",
            connect_args={"check_same_thread": False})
        MainBase.metadata.create_all(main_engine)
        CmpBase.metadata.create_all(cmp_engine)
        main_factory = sessionmaker(bind=main_engine, expire_on_commit=False)
        cmp_factory = sessionmaker(bind=cmp_engine, expire_on_commit=False)

        @contextmanager
        def ms():
            s = main_factory()
            try:
                yield s
            finally:
                s.close()

        @contextmanager
        def cs():
            s = cmp_factory()
            try:
                yield s
            finally:
                s.close()

        yield {"ms": ms, "cs": cs, "main": main_factory, "cmp": cmp_factory,
               "export_dir": tmp_path / "exports"}
        main_engine.dispose()
        cmp_engine.dispose()

    @pytest.fixture()
    def user(self, dbs):
        """A throwaway user with one attempt, one submission, consent, audit."""
        from backend.database import (Attempt, Homework, HomeworkSubmission,
                                      Parent, PracticeSession, Student)
        from backend.modules.compliance.models import AuditEvent, Consent

        uid = uuid.uuid4()
        with dbs["main"]() as s:
            student = Student(id=uid, name="Asha Kumar", student_class="8",
                              subjects=["bio"], language_pref="en")
            parent = Parent(name="Raj Kumar", phone="9876543210",
                            whatsapp_number="9876543210")
            student.parents = [parent]
            s.add(student)
            s.flush()
            s.add(Attempt(student_id=uid, subject="bio",
                          answer={"value": "mitochondria"}, correct=True,
                          time_ms=4200, marks_awarded=1))
            hw = Homework(student_id=uid, title="Cells hw", subject="bio")
            s.add(hw)
            s.flush()
            s.add(HomeworkSubmission(
                homework_id=hw.id, student_id=uid,
                answers={"q1": "cell"}, score=4.0, max_score=5,
                percentage=80.0, grade="A"))
            s.add(PracticeSession(student_id=uid, questions_answered=10))
            s.commit()
        with dbs["cs"]() as s:
            s.add(Consent(user_id=str(uid), purpose="analytics", granted=True,
                          policy_version="1.0"))
            s.add(AuditEvent(actor_user_id=str(uid), actor_role="student",
                             action="read", subject_user_id=None,
                             resource="api.learn"))
            s.commit()
        return str(uid)

    def test_export_produces_expected_json_keys(self, dbs, user):
        """Art.15/DPDP export: full JSON with every expected data section."""
        from backend.modules.compliance.models import DataRequest

        req_id = str(uuid.uuid4())
        with dbs["cs"]() as s:
            s.add(DataRequest(id=req_id, user_id=user, kind="export"))
            s.commit()

        summary = ful.export_user_data(user, req_id, main_sesh=dbs["ms"],
                                       cmp_sesh=dbs["cs"],
                                       export_dir=str(dbs["export_dir"]))
        assert os.path.exists(summary["path"])
        assert summary["bytes"] > 0
        with open(summary["path"], encoding="utf-8") as fh:
            payload = json.load(fh)
        assert payload["schema"] == ful.EXPORT_SCHEMA
        assert payload["request_id"] == req_id
        assert payload["user_id"] == user
        assert payload["data"]["profile"]["name"] == "Asha Kumar"
        assert payload["data"]["profile"]["student_class"] == "8"
        assert len(payload["data"]["attempts"]) == 1
        assert payload["data"]["attempts"][0]["answer"] == {"value": "mitochondria"}
        assert len(payload["data"]["submissions"]) == 1
        assert payload["data"]["submissions"][0]["grade"] == "A"
        assert len(payload["data"]["practice_sessions"]) == 1
        assert len(payload["data"]["consents"]) == 1
        assert payload["data"]["consents"][0]["purpose"] == "analytics"
        assert len(payload["data"]["audit"]) == 1
        assert payload["counts"]["attempts"] == 1
        # request row flips to done with the file path recorded
        from backend.modules.compliance.models import DataRequest
        with dbs["cs"]() as s:
            row = s.get(DataRequest, req_id)
            assert row.status == "done"
            assert row.closed_at is not None
            assert "export written" in (row.notes or "")
            assert ".json" in (row.notes or "")

    def test_erasure_anonymises_and_marks_done(self, dbs, user):
        from backend.database import Parent, Student
        from backend.modules.compliance.models import (AuditEvent, Consent,
                                                       DataRequest)

        req_id = str(uuid.uuid4())
        with dbs["cs"]() as s:
            s.add(DataRequest(id=req_id, user_id=user, kind="erasure"))
            s.commit()

        summary = ful.process_request(req_id, main_sesh=dbs["ms"],
                                      cmp_sesh=dbs["cs"])
        assert summary["status"] == "done"
        assert summary["kind"] == "erasure"

        uid = uuid.UUID(user)
        with dbs["main"]() as s:
            student = s.get(Student, uid)
            assert student.name.startswith("Erased User ")  # PII gone
            assert student.is_active is False
            assert student.id == uid  # FK integrity preserved (no delete)
            parent = s.query(Parent).filter(
                Parent.students.any(Student.id == uid)).first()
            assert parent is not None
            assert parent.name.startswith("Erased User ")
            assert parent.phone is None        # PII gone
            assert parent.whatsapp_number is None
        with dbs["cs"]() as s:
            # audit + consents pseudonymised, not destroyed (retention)
            audits = s.query(AuditEvent).filter(
                (AuditEvent.actor_user_id == user)
                | (AuditEvent.subject_user_id == user)).all()
            assert audits == []
            pseudonymed = s.query(AuditEvent).filter(
                AuditEvent.actor_user_id == f"erased-{ful._hash12(user)}"
            ).all()
            assert len(pseudonymed) >= 1
            consents = s.query(Consent).filter(Consent.user_id == user).all()
            assert consents == []
            assert s.query(Consent).filter(
                Consent.user_id == f"erased-{ful._hash12(user)}").count() == 1
            row = s.get(DataRequest, req_id)
            assert row.status == "done"
            assert "erasure applied" in (row.notes or "")

    def test_erasure_is_idempotent(self, dbs, user):
        from backend.database import Student
        req1, req2 = str(uuid.uuid4()), str(uuid.uuid4())
        with dbs["cs"]() as s:
            from backend.modules.compliance.models import DataRequest
            s.add(DataRequest(id=req1, user_id=user, kind="erasure"))
            s.add(DataRequest(id=req2, user_id=user, kind="erasure"))
            s.commit()
        ful.process_request(req1, main_sesh=dbs["ms"], cmp_sesh=dbs["cs"])
        ful.process_request(req2, main_sesh=dbs["ms"], cmp_sesh=dbs["cs"])
        with dbs["main"]() as s:
            student = s.get(Student, uuid.UUID(user))
            # deterministic pseudonym: second run changed nothing
            assert student.name == f"Erased User {ful._hash12(user)}"

    def test_process_request_idempotent_when_done(self, dbs, user):
        from backend.modules.compliance.models import DataRequest
        req_id = str(uuid.uuid4())
        with dbs["cs"]() as s:
            s.add(DataRequest(id=req_id, user_id=user, kind="export",
                              status="done"))
            s.commit()
        out = ful.process_request(req_id, main_sesh=dbs["ms"],
                                  cmp_sesh=dbs["cs"])
        assert out["already_done"] is True

    def test_unknown_request_raises(self, dbs):
        with pytest.raises(ValueError):
            ful.process_request("does-not-exist", main_sesh=dbs["ms"],
                                cmp_sesh=dbs["cs"])

    def test_email_anonymizer(self):
        assert ful.anonymize_email_like(
            "contact asha@school.edu.in now") == (
            f"contact erased+{ful._hash12('asha@school.edu.in')}"
            "@erased.invalid now")
        assert ful.anonymize_email_like(None) is None
