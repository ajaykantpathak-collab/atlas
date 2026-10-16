"""
Student learning loop, END TO END, in-process (loop-audit deliverable).

Drives ONE synthetic student through the full journey — dashboard
next-step, mission pick, learn session (the journey state machine),
remediation detours, the repair cap's patch-forward, mastery promotion —
and pins the orchestration contracts between the three surfaces:

    modules/journey/engine.py      the PROBE→…→MASTERED state machine
    routers/progress.py::next-step the one next-best-action orchestrator
    modules/learning/router.py     mission options + check-up composer

No Postgres (journey engine's sync engine is pointed at a throwaway
sqlite file), no Docker, no HTTP, no LLM, no real corpus (a tiny fake
index is injected under backend.services.enhanced_nodes — engine.py,
next_best_lesson.py and the check-up composer import load_index lazily
inside their functions, so the sys.modules entry covers all three).
The async orchestrator side runs against the statement-routed fake
AsyncSession below — the established fake-db pattern of
test_digest_limbs.py, minus aiosqlite (nothing here writes).

Arcs pinned:
  1. cold start → PROBE → PRACTICE → CHALLENGE → MASTERED (terminal),
     with BKT values matching a reference mastery_sync replay exactly
  2. probe miss → TEACH (payload from the corpus) → mini-check → PRACTICE
  3. practice miss w/ misconception → REMEDIATE (correction payload) →
     2 failed repairs → back to TEACH → second visit exhausts the
     session repair budget → PATCH_FORWARD to the chapter's NEXT node
     with the stranded concept flagged "revisit tomorrow"
  4. end-of-chapter patch-forward degrades honestly to normal practice,
     and the PRACTICE state still exits (3 misses → TEACH) — no dead-end
  5. per-subject tuning: languages/humanities are keyed by the REAL
     corpus codes (hin/eng/engl/hist/psy/gram — the old map's
     "hindi"/"english"/"history" never matched a node id) and their
     longer 3-rep promotion stays reachable (3 clean reps → CHALLENGE
     → MASTERED)
  6. next-step NEVER returns "explore" while a journey topic is open —
     the orchestrator used to read only mastery_records/attempts/review,
     so a mid-lesson student was told to "go explore"
  7. mission options never offer the same node twice (the thin-frontier
     filler used to duplicate ready[0] as a fake "challenge"), never
     re-offer a journey-MASTERED topic as "advance", and surface an
     in-flight topic as a "continue" pick when the frontier is thin
  8. check-up composer finds nodes by the aliased corpus code (hindi
     check-ups used to match zero nodes: subject "hindi" vs code "hin")
"""

from __future__ import annotations

import asyncio
import os
import sys
import time
import types
from pathlib import Path
from types import SimpleNamespace

import pytest

_BACKEND = Path(__file__).resolve().parent.parent
if str(_BACKEND.parent) not in sys.path:
    sys.path.insert(0, str(_BACKEND.parent))

# backend.database builds engines at import time — a parseable URL must
# exist even though nothing dials it (same guard as test_digest_limbs).
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite://")

from backend.modules.journey import engine as je  # noqa: E402
from backend.modules.journey.router import (  # noqa: E402
    AnswerIn,
    NextIn,
    answer as journey_answer,
    next_action as journey_next,
)
from backend.modules.learning.router import (  # noqa: E402
    checkup,
    mission_options,
)
from backend.routers.progress import get_next_step  # noqa: E402
from backend.services import identity_bridge  # noqa: E402
from backend.services.graph_service import GraphService  # noqa: E402
from backend.services.mastery_sync import BKTModel, MasteryState  # noqa: E402
from backend.services.progress_service import ProgressService  # noqa: E402

# NOTE: every backend import above happens BEFORE any fixture runs — the
# routers package transitively imports backend.services.enhanced_nodes for
# real, and only afterwards does the corpus fixture swap a fake module into
# sys.modules (function-level `from ... import load_index` calls resolve the
# attribute on the fake at call time).

SID = "loop-e2e-student"

N1 = "c10_bio_cbse_01_001"
N2 = "c10_bio_cbse_01_002"
N3 = "c10_bio_cbse_01_003"
N4 = "c10_bio_cbse_01_004"
H1 = "c10_hin_cbse_01_001"


# ---------------------------------------------------------------------------
# fakes
# ---------------------------------------------------------------------------
def _node(nid: str, num: int, *, cls: int = 10, subject: str = "bio",
          title: str | None = None, prereqs: list[str] | None = None):
    return {"node_id": nid, "class": cls, "subject": subject, "chapter": 1,
            "node_num": num, "board": "cbse",
            "title": title or f"Topic {num}",
            "definition": f"Definition of topic {num}.",
            "diagnostics": [{"q": f"Recall q1 of topic {num}?",
                             "a": f"A1 of topic {num}."},
                            {"q": f"Recall q2 of topic {num}?",
                             "a": f"A2 of topic {num}."}],
            "prereq_ids": list(prereqs or [])}


def _default_corpus():
    return {
        N1: _node(N1, 1, title="Cell — the unit of life"),
        N2: _node(N2, 2, title="Cell structure"),
        N3: _node(N3, 3, title="Cell organelles"),
        N4: _node(N4, 4, title="Cell division"),
        H1: _node(H1, 1, subject="hin", title="हिंदी व्याकरण"),
    }


@pytest.fixture()
def corpus(monkeypatch):
    """Tiny fake corpus index installed as backend.services.enhanced_nodes."""
    nodes = _default_corpus()
    mod = types.ModuleType("backend.services.enhanced_nodes")

    class _Idx:
        pass

    idx = _Idx()
    idx.nodes = nodes
    idx.get = lambda nid: idx.nodes.get(nid)
    mod.load_index = lambda: idx
    mod._derive_title = lambda rec: rec.get("title") or rec.get("node_id")
    monkeypatch.setitem(sys.modules, "backend.services.enhanced_nodes", mod)
    return nodes


@pytest.fixture()
def corrector(monkeypatch):
    """Fake misconception corrector so the REMEDIATE payload is observable."""
    mod = types.ModuleType("backend.services.misconception_corrector")
    mod.correction_for = lambda node_id, q: {"corrected": f"fix for: {q}"}
    monkeypatch.setitem(sys.modules,
                        "backend.services.misconception_corrector", mod)
    return mod


@pytest.fixture()
def journey_db(tmp_path, monkeypatch):
    """Journey engine on a throwaway sqlite file — the one seam engine.py
    reads is its module-level get_sync_engine name."""
    from sqlalchemy import create_engine

    sync_engine = create_engine(f"sqlite:///{tmp_path / 'journey.db'}")
    monkeypatch.setattr(je, "get_sync_engine", lambda: sync_engine)
    yield sync_engine
    sync_engine.dispose()


class _Result:
    def __init__(self, rows):
        self._rows = list(rows)

    def first(self):
        return self._rows[0] if self._rows else None

    def all(self):
        return list(self._rows)

    def scalars(self):
        return self


class FakeAsyncDB:
    """Statement-routed AsyncSession fake: execute() dispatches on a
    table-name substring to a canned row list (callable = lazy)."""

    def __init__(self):
        self.routes: dict = {}
        self.sqls: list[str] = []

    def on(self, table: str, rows):
        self.routes[table.lower()] = rows
        return self

    async def execute(self, stmt, *a, **k):
        sql = str(stmt)
        self.sqls.append(sql)
        low = sql.lower()
        for key, rows in self.routes.items():
            if key in low:
                got = rows() if callable(rows) else rows
                return _Result(got)
        return _Result([])

    async def commit(self):
        pass

    async def rollback(self):
        pass


def ref_bkt(prior: float, correct: bool) -> float:
    """The journey's BKT trajectory (journey prior 0.3, mastery_sync's
    guess/slip/transit) — the same reference e2e_check.py replays."""
    st = MasteryState(student_id="ref", topic_id="ref", subject="ref")
    st.bkt_p_know = prior
    return BKTModel.update(st, correct)


def _answer(node_id, correct, **kw):
    return je.record_answer(SID, node_id, correct, **kw)


@pytest.fixture()
def orchestrator_env(monkeypatch):
    """Stub the orchestrator's side inputs: nothing due for review, the
    identity bridge resolves, the prereq graph is empty."""
    async def _no_review(db, uid):
        return []

    async def _student_row(db, uid):
        return SimpleNamespace(id=uid)

    async def _no_prereqs(node_id, depth=3):
        return []

    monkeypatch.setattr(ProgressService, "get_review_queue",
                        staticmethod(_no_review))
    monkeypatch.setattr(identity_bridge, "ensure_student_row", _student_row)
    monkeypatch.setattr(GraphService, "get_all_prerequisites",
                        staticmethod(_no_prereqs))


def _seed_mastered(node_id: str) -> None:
    """Three clean answers take any default-tuned node to MASTERED."""
    _answer(node_id, True)
    _answer(node_id, True)
    _answer(node_id, True)


# ---------------------------------------------------------------------------
# 1. full arc: cold start → mastery promotion
# ---------------------------------------------------------------------------
class TestFullArc:
    def test_cold_start_probe_practice_challenge_mastered(
            self, journey_db, corpus):

        user = SimpleNamespace(id=SID)

        # cold start: /next creates the row at PROBE with the journey prior
        out = journey_next(NextIn(node_id=N1, student_id=SID), user=user)
        assert out["state"] == "PROBE"
        assert out["action"] == "serve_probe_question"
        assert out["bkt_p"] == round(je.INITIAL_P, 3)

        # probe correct -> PRACTICE, BKT exactly as the reference predicts
        p1 = ref_bkt(je.INITIAL_P, True)
        r1 = journey_answer(
            AnswerIn(node_id=N1, correct=True, student_id=SID), user=user)
        assert r1["state"] == "PRACTICE"
        assert r1["action"] == "serve_practice_question"
        assert r1["bkt_p"] == round(p1, 3)

        # 2nd clean rep: streak 2 + p >= 0.75 -> CHALLENGE
        p2 = ref_bkt(p1, True)
        r2 = journey_answer(
            AnswerIn(node_id=N1, correct=True, student_id=SID), user=user)
        assert r2["state"] == "CHALLENGE"
        assert r2["bkt_p"] == round(p2, 3)

        # challenge rep with p >= 0.85 -> MASTERED
        p3 = ref_bkt(p2, True)
        r3 = journey_answer(
            AnswerIn(node_id=N1, correct=True, student_id=SID), user=user)
        assert r3["state"] == "MASTERED"
        assert r3["action"] == "topic_mastered"

        # MASTERED is terminal even on a miss
        r4 = journey_answer(
            AnswerIn(node_id=N1, correct=False, student_id=SID), user=user)
        assert r4["state"] == "MASTERED"

        # the row really persisted through the endpoint path
        row = je.get_or_create(SID, N1)
        assert row.state == "MASTERED"
        assert len(row.history or []) == 4
        assert row.streak_wrong == 1

    def test_teach_path_probe_miss_to_practice(self, journey_db, corpus):

        user = SimpleNamespace(id=SID)
        r = journey_answer(
            AnswerIn(node_id=N2, correct=False, student_id=SID), user=user)
        assert r["state"] == "TEACH"
        assert r["action"] == "serve_teaching"

        # /next on a TEACH row serves the node's authored teaching
        nxt = journey_next(NextIn(node_id=N2, student_id=SID), user=user)
        assert nxt["action"] == "serve_teaching"
        assert nxt["payload"]["title"] == "Cell structure"
        assert nxt["payload"]["definition"].startswith("Definition of topic 2")

        # mini-check passes -> PRACTICE
        r2 = journey_answer(
            AnswerIn(node_id=N2, correct=True, student_id=SID), user=user)
        assert r2["state"] == "PRACTICE"

    def test_practice_slump_falls_back_to_teach(self, journey_db, corpus):
        _answer(N2, True)                     # PROBE -> PRACTICE
        r = None
        for _ in range(3):
            r = _answer(N2, False)            # no misconception: plain slump
        assert r["state"] == "TEACH", "3 practice misses must exit to TEACH"

    def test_challenge_fail_falls_back_to_practice(self, journey_db, corpus):
        _answer(N1, True)                     # -> PRACTICE
        _answer(N1, True)                     # -> CHALLENGE
        r = _answer(N1, False)                # challenge miss
        assert r["state"] == "PRACTICE", \
            "a failed challenge must exit back to PRACTICE, never dead-end"

    def test_remediate_success_returns_to_practice(self, journey_db, corpus):
        _answer(N3, True)                          # -> PRACTICE
        _answer(N3, False, misconception_id="m")   # -> REMEDIATE
        r = _answer(N3, True)                      # repair lands
        assert r["state"] == "PRACTICE"
        assert r["remediation_count"] == 0
        # and the repaired streak carries: the next clean rep promotes
        r2 = _answer(N3, True)
        assert r2["state"] == "CHALLENGE"


# ---------------------------------------------------------------------------
# 2. remediation detour, the repair cap, and patch-forward
# ---------------------------------------------------------------------------
class TestRemediationAndPatchForward:
    def test_two_visits_exhaust_budget_then_patch_forward(
            self, journey_db, corpus, corrector):

        user = SimpleNamespace(id=SID)
        A = lambda **kw: journey_answer(  # noqa: E731
            AnswerIn(node_id=N3, student_id=SID, **kw), user=user)

        assert A(correct=True)["state"] == "PRACTICE"

        # practice miss with a detected misconception -> REMEDIATE
        r = A(correct=False, misconception_id="miscon_organelle_mixup",
              question_text="Which organelle builds proteins?")
        assert r["state"] == "REMEDIATE"
        assert r["action"] == "serve_misconception_correction"

        # /next on a REMEDIATE row serves the correction for the missed q
        nxt = journey_next(NextIn(node_id=N3, student_id=SID), user=user)
        assert nxt["action"] == "serve_misconception_correction"
        assert nxt["payload"]["corrected"] == \
            "fix for: Which organelle builds proteins?"

        # visit 1: two failed repairs drop back to TEACH (budget not spent)
        r1 = A(correct=False)
        assert r1["state"] == "REMEDIATE"
        assert r1["remediation_count"] == 1
        r2 = A(correct=False)
        assert r2["state"] == "TEACH"
        assert r2["patched_forward"] is False

        # mini-check back to PRACTICE, then a second misconception visit
        assert A(correct=True)["state"] == "PRACTICE"
        r3 = A(correct=False, misconception_id="miscon_organelle_mixup")
        assert r3["state"] == "REMEDIATE"
        assert r3["remediation_count"] == 0, "counter tracks the visit"

        assert A(correct=False)["state"] == "REMEDIATE"

        # visit 2, second fail: 4 repair questions this session > cap 3
        # -> PATCH FORWARD: next chapter node at reduced difficulty, this
        #    concept flagged revisit-tomorrow
        r4 = A(correct=False)
        assert r4["state"] == "PRACTICE"
        assert r4["action"] == je.PATCH_FORWARD == "serve_patched_forward"
        assert r4["patched_forward"] is True
        assert r4["remediation_count"] == 0
        pf = r4["patch_forward"]
        assert pf["next_node_id"] == N4
        assert pf["next_title"] == "Cell division"
        assert pf["tier"] == "novice"
        assert pf["revisit"]["node_id"] == N3
        assert pf["revisit"]["when"] == "tomorrow"

        # the patch-forward is persisted in the journey history
        row = je.get_or_create(SID, N3)
        assert any(h.get("patched_forward") for h in (row.history or []))

    def test_end_of_chapter_patch_degrades_then_exits(
            self, journey_db, corpus, monkeypatch):
        # cap 0 -> the FIRST failed pair patches forward (shortest proof
        # that the cap wiring, not the visit count, drives the branch)
        monkeypatch.setattr(je, "REMEDIATE_SESSION_CAP", 0)

        _answer(N4, True)                          # -> PRACTICE
        _answer(N4, False, misconception_id="m")   # -> REMEDIATE
        _answer(N4, False)                         # fail #1: stays
        r = _answer(N4, False)                     # fail #2: budget spent
        assert r["action"] == je.PATCH_FORWARD
        assert r["patched_forward"] is True

        # N4 is the chapter's LAST node: no next topic exists — the
        # payload degrades honestly to revisit-only, state stays PRACTICE
        pf = r["patch_forward"]
        assert "next_node_id" not in pf
        assert pf["revisit"]["node_id"] == N4

        # and the PRACTICE state still exits: 3 clean misses -> TEACH
        s = None
        for _ in range(3):
            s = _answer(N4, False)
        assert s["state"] == "TEACH", \
            "post-patch PRACTICE must not dead-end on the chapter's last node"


# ---------------------------------------------------------------------------
# 3. per-subject tuning: real corpus codes + reachable promotion
# ---------------------------------------------------------------------------
class TestSubjectTuning:
    @pytest.mark.parametrize("nid", [
        "c10_hin_cbse_01_001",     # hindi (2,835 corpus nodes)
        "c6_eng_cbse_01_001",      # english
        "c9_engl_cbse_01_001",     # english (other book code)
        "c8_hist_cbse_01_001",     # history
        "c11_psy_cbse_01_001",     # psychology
        "c6_gram_cbse_01_001",     # grammar
        "c10_geo_cbse_01_001",     # geography (was already keyed)
        "c10_civ_cbse_01_001",     # civics
    ])
    def test_tuning_matches_real_corpus_codes(self, nid):
        assert je._tuning_for(nid) == {"promote_streak": 3,
                                       "promote_p_add": 0.02}

    @pytest.mark.parametrize("nid", [
        "c10_bio_cbse_01_001", "c10_math_cbse_01_001",
        "c10_phy_cbse_01_001", "c10_chem_cbse_01_001",
    ])
    def test_skill_ladder_subjects_keep_fast_lane(self, nid):
        assert je._tuning_for(nid) == {}

    def test_language_promotion_is_longer_but_reachable(
            self, journey_db, corpus):
        # probe correct -> PRACTICE
        r0 = _answer(H1, True)
        assert r0["state"] == "PRACTICE"

        # rep 2: p is already far above the 0.77 tuned bar, but the tuned
        # lane demands 3 clean reps — the old default 2-streak promoted here
        r1 = _answer(H1, True)
        assert r1["state"] == "PRACTICE", \
            "tuned language lane must not promote at the default 2-streak"

        # rep 3: streak 3 + p ~0.98 -> CHALLENGE; rep 4 -> MASTERED.
        # Longer exposure reps, never a lockout.
        r2 = _answer(H1, True)
        assert r2["state"] == "CHALLENGE"
        assert r2["bkt_p"] >= 0.75 + 0.02
        r3 = _answer(H1, True)
        assert r3["state"] == "MASTERED"


# ---------------------------------------------------------------------------
# 4. next-step: journey continuation beats the explore fallback
# ---------------------------------------------------------------------------
class TestNextStepJourneyContinuation:
    def test_open_topic_replaces_explore(self, journey_db, corpus,
                                         orchestrator_env):

        uid = SID
        _answer(N3, True)   # N3 sits in PRACTICE — a real open topic

        db = FakeAsyncDB().on("enrichment_content",
                              [(N3, "Cell organelles", "science", 10)])
        out = asyncio.run(
            get_next_step(user=SimpleNamespace(id=uid), db=db))

        assert out["action"] == "practice"
        assert out["node"]["node_id"] == N3
        assert out["node"]["title"] == "Cell organelles"
        assert out["link"] == f"/learn/{N3}"
        assert "left off" in out["reason"].lower()

    def test_remediate_and_teach_states_map_to_actions(
            self, journey_db, corpus, orchestrator_env):

        _answer(N2, True)
        _answer(N2, False, misconception_id="m")   # N2 -> REMEDIATE
        out = asyncio.run(get_next_step(
            user=SimpleNamespace(id=SID),
            db=FakeAsyncDB().on("enrichment_content",
                                [(N2, "Cell structure", "science", 10)])))
        assert out["action"] == "remediate"
        assert out["node"]["node_id"] == N2

    def test_explore_preserved_without_journey_state(
            self, journey_db, corpus, orchestrator_env):

        out = asyncio.run(get_next_step(
            user=SimpleNamespace(id=SID), db=FakeAsyncDB()))
        assert out["action"] == "explore"

    def test_mastered_topics_are_not_inflight(self, journey_db, corpus,
                                              orchestrator_env):

        _seed_mastered(N1)   # proven topic — nothing to continue
        out = asyncio.run(get_next_step(
            user=SimpleNamespace(id=SID), db=FakeAsyncDB()))
        assert out["action"] == "explore"

    def test_orchestrator_decision_not_overridden(self, journey_db, corpus,
                                                  orchestrator_env):

        # a weak mastery row -> the orchestrator's "teach" stands even when
        # journey rows exist; the journey only fills the explore hole
        _answer(N3, True)
        db = (FakeAsyncDB()
              .on("mastery_records", [(N1, 0.2)])
              .on("enrichment_content",
                  [(N1, "Cell — the unit of life", "science", 10)]))
        out = asyncio.run(get_next_step(
            user=SimpleNamespace(id=SID), db=db))
        assert out["action"] == "teach"
        assert out["node"]["node_id"] == N1

    def test_untouched_probe_rows_are_not_inflight(self, journey_db, corpus):
        je.get_or_create(SID, N3)   # created, never answered
        assert je.latest_inflight(SID) is None

    def test_latest_inflight_most_recent_open_topic(self, journey_db, corpus):
        _answer(N1, True)   # N1 -> PRACTICE
        time.sleep(0.02)
        _answer(N2, True)   # N2 -> PRACTICE (most recent)
        row = je.latest_inflight(SID)
        assert row["node_id"] == N2 and row["state"] == "PRACTICE"

        _seed_mastered(N2)  # N2 proven -> falls out of the open set
        row = je.latest_inflight(SID)
        assert row["node_id"] == N1


# ---------------------------------------------------------------------------
# 5. mission options: honest three
# ---------------------------------------------------------------------------
class TestMissionOptions:
    def test_mastered_topic_not_reoffered_as_advance(
            self, journey_db, corpus, orchestrator_env):

        uid = SID
        # N3 syllabus-FIRST (the tie with H1 breaks on node id, bio < hin)
        corpus[N3]["node_num"] = 1
        corpus[N1]["node_num"] = 2
        corpus[N2]["node_num"] = 3
        corpus[N4]["node_num"] = 4
        _seed_mastered(N3)          # proven in the journey…
        _answer(N4, True)           # …N4 open mid-lesson
        db = FakeAsyncDB().on("mastery_records", [])
        out = asyncio.run(mission_options(
            subject="bio", user=SimpleNamespace(id=uid), db=db))

        ids = [o["node_id"] for o in out["options"]]
        assert N3 not in ids, "journey-MASTERED topic re-offered as advance"
        assert len(ids) == len(set(ids)), f"duplicate mission cards: {ids}"
        assert ids == [H1, N1, N2], ids   # first three honest, N3 skipped

    def test_thin_frontier_filled_with_inflight_continue(
            self, journey_db, corpus, orchestrator_env):

        uid = SID
        for nid in (N2, N3, N4, H1):
            del corpus[nid]                    # frontier is N1 only
        _answer(N3, True)
        _answer(N3, False, misconception_id="m")   # N3 open in REMEDIATE

        db = (FakeAsyncDB()
              .on("mastery_records", [])
              .on("enrichment_content", [(N3, "Cell organelles")]))
        out = asyncio.run(mission_options(
            subject="bio", user=SimpleNamespace(id=uid), db=db))

        ids = [o["node_id"] for o in out["options"]]
        kinds = [o["kind"] for o in out["options"]]
        assert ids == [N1, N3], ids
        assert kinds == ["advance", "continue"], kinds
        assert out["options"][1]["title"] == "Cell organelles"

    def test_no_duplicate_filler_on_thin_frontier(
            self, journey_db, corpus, orchestrator_env):

        uid = SID
        m09 = "c09_math_cbse_01_001"
        m10 = "c10_math_cbse_01_002"
        corpus.clear()
        corpus[N1] = _node(N1, 1)                      # ungated -> ready
        corpus[m09] = _node(m09, 1, cls=9, subject="math",
                            prereqs=[N1])              # gated, untouched
        corpus[m10] = _node(m10, 2, cls=10, subject="math",
                            prereqs=[m09])             # started, gate open

        db = FakeAsyncDB().on("mastery_records", [
            SimpleNamespace(node_id=m10, mastery_probability=0.5, attempts=2),
        ])
        out = asyncio.run(mission_options(
            subject="math", user=SimpleNamespace(id=uid), db=db))

        ids = [o["node_id"] for o in out["options"]]
        kinds = [o["kind"] for o in out["options"]]
        assert ids == [m10, N1], ids          # 1 repair + 1 advance
        assert kinds == ["repair", "advance"], kinds
        assert len(ids) == len(set(ids)), \
            "the old filler duplicated ready[0] as a fake challenge card"

    def test_inflight_continue_never_duplicates_advance(
            self, journey_db, corpus, orchestrator_env):

        uid = SID
        for nid in (N2, N3, N4, H1):
            del corpus[nid]
        _answer(N1, True)   # N1: the only frontier node AND in-flight
        db = (FakeAsyncDB()
              .on("mastery_records", [])
              .on("enrichment_content", [(N1, "Cell — the unit of life")]))
        out = asyncio.run(mission_options(
            subject="bio", user=SimpleNamespace(id=uid), db=db))
        ids = [o["node_id"] for o in out["options"]]
        assert ids == [N1], ids   # offered once, not twice


# ---------------------------------------------------------------------------
# 6. check-up composer finds aliased corpus nodes
# ---------------------------------------------------------------------------
class TestCheckupWiring:
    # NOTE: the endpoint is called DIRECTLY, so FastAPI never resolves the
    # Query() defaults — chapter/anchor_node must be passed explicitly or
    # their truthy Query objects break the direct call (an artifact of
    # in-process testing, not of serving).
    def test_hindi_checkup_finds_hin_nodes(self, corpus):

        out = asyncio.run(checkup(
            subject="hindi", class_level=10, board="CBSE",
            chapter="", anchor_node="",
            user=SimpleNamespace(id=SID)))
        assert out["framing"] == "checkup", out["message"]
        assert out["total_items"] >= 1
        fam = [i for s in out["sections"] for i in s["items"]
               if str(i.get("item_id", "")).startswith("family:")]
        assert fam and fam[0]["question"] == "Recall q2 of topic 1?"

    def test_hin_code_checkup_also_resolves(self, corpus):

        out = asyncio.run(checkup(
            subject="hin", class_level=10, board="CBSE",
            chapter="", anchor_node="",
            user=SimpleNamespace(id=SID)))
        assert out["framing"] == "checkup"

    def test_english_checkup_finds_eng_nodes(self, corpus):

        corpus.clear()
        e = _node("c10_eng_cbse_01_001", 1, subject="eng",
                  title="Tenses")
        corpus[e["node_id"]] = e
        out = asyncio.run(checkup(
            subject="english", class_level=10, board="CBSE",
            chapter="", anchor_node="",
            user=SimpleNamespace(id=SID)))
        assert out["framing"] == "checkup", out["message"]

    def test_unknown_subject_degrades_honestly(self, corpus):

        out = asyncio.run(checkup(
            subject="klingon", class_level=10, board="CBSE",
            chapter="", anchor_node="",
            user=SimpleNamespace(id=SID)))
        assert out["framing"] == "unavailable"
        assert "practice ladder" in out["message"]
