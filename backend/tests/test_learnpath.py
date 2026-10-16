# -*- coding: utf-8 -*-
"""learnpath tests — the unified journey composer (learnpath-v2).

Pins the /api/learnpath ordering brain end to end against a HERMETIC
fixture corpus (5 nodes, real PREREQUISITE_NODE_IDS semantics: cross-class
hard gates + the same-class sibling mesh — audit finding D11) and a
sqlite in-memory ledger:

  1. NEW STUDENT   — honest diagnose + syllabus start; no fabricated progress.
  2. MID-JOURNEY   — in-progress continue-learn + consolidation practice,
                     evidence carries the real mastery numbers.
  3. PREREQ GAP    — a weak class-10 node over an unmastered class-9 root
                     repairs the ROOT first (cross-class hard edge), not the
                     node itself; same-class mesh never gates.
  4. REMEDIATION   — an unresolved wrong (wrong-after-last-correct in
                     its_attempt_log) re-orders the path ABOVE new learning
                     and suppresses unlock celebrations downstream.
  5. REVIEW FIRST  — a due SM-2 item leads the strip.
  6. SUBJECT FILTER— other-subject ledger rows never surface; scope counts.
  7. STATUS        — milestone + authored MASTERY_CRITERIA note surface.
  8. FAMILY VOICES — per-subject pedagogy: history and physics reasons
                     speak their own pedagogy (owner directive 2026-09-30).

Style: like test_mastery_continuity.py — repo-root on sys.path, hermetic
DATABASE_URL, fixture corpus via ENHANCED_NODES_MD_DIR (and a secluded
CISCE_NODES_MD_DIR + cache path so the dual-corpus loader stays fixture-only),
asyncio.run per test (no pytest-asyncio dependency).
"""

from __future__ import annotations

import asyncio
import os
import pathlib
import sys
import tempfile
import uuid
from datetime import date, datetime

import pytest


def _repo_root() -> pathlib.Path:
    for cand in pathlib.Path(__file__).resolve().parents:
        if ((cand / "backend" / "services" / "learnpath.py").exists()
                and (cand / "deploy" / "backend" / "services" / "learnpath.py").exists()):
            return cand
    return pathlib.Path(__file__).resolve().parents[2]


_ROOT = _repo_root()
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

# Hermetic stores BEFORE any backend import.
os.environ["DATABASE_URL"] = "sqlite+aiosqlite://"

# Fixture corpus — a tiny md dir so load_index() never scans the 14k-file
# real corpus (and its cache stays untouched). CISCE dir is pointed at a
# nonexistent path: get_md_dirs() appends it only when it exists.
_FIXTURE_ROOT = pathlib.Path(tempfile.mkdtemp(prefix="learnpath_fixture_"))
_MD_DIR = _FIXTURE_ROOT / "md"
_MD_DIR.mkdir(parents=True, exist_ok=True)
os.environ["ENHANCED_NODES_MD_DIR"] = str(_MD_DIR)
os.environ["CISCE_NODES_MD_DIR"] = str(_FIXTURE_ROOT / "no_cisce_here")
os.environ["ENHANCED_NODES_CACHE_PATH"] = str(_FIXTURE_ROOT / "cache" / "idx.json")

_NODE_MD = """## DEFINITION
{title} is the fixture topic for the learnpath tests.

## WALKTHROUGH
Step one: read the definition. Step two: work the example.

## PREREQUISITE_NODE_IDS
{prereqs}

## MASTERY_CRITERIA
- student can state the {title} rule in their own words
"""

_NODES = {
    # class 9 chapter 1 — the hard roots
    "c9_math_cbse_01_001": {"cls": 9, "title": "Number systems",
                            "prereqs": ""},
    "c9_math_cbse_01_002": {"cls": 9, "title": "Irrational numbers",
                            "prereqs": "c9_math_cbse_01_001"},
    # class 10 chapter 1 — hard gate down to class 9 + same-class mesh
    "c10_math_cbse_01_001": {"cls": 10, "title": "Real numbers",
                             "prereqs": "c9_math_cbse_01_001, c10_math_cbse_01_002"},
    "c10_math_cbse_01_002": {"cls": 10, "title": "Euclid division lemma",
                             "prereqs": "c9_math_cbse_01_002, c10_math_cbse_01_001"},
    # another subject for the filter test
    "c10_bio_cbse_01_001": {"cls": 10, "title": "Life processes",
                            "prereqs": ""},
}
for _nid, _meta in _NODES.items():
    (_MD_DIR / f"{_nid}.md").write_text(
        _NODE_MD.format(title=_meta["title"], prereqs=_meta["prereqs"]),
        encoding="utf-8")

from backend.services.enhanced_nodes import reset_index as _reset_index  # noqa: E402
_reset_index()

import backend.services.learnpath as learnpath  # noqa: E402
import backend.services.subject_pedagogy as sp  # noqa: E402
from backend.database import Base  # noqa: E402
from backend.models.progress import MasteryRecord, ReviewItem  # noqa: E402
from backend.models.telemetry import AttemptLog  # noqa: E402
from backend.models.user import User  # noqa: E402

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine  # noqa: E402
from sqlalchemy.pool import StaticPool  # noqa: E402


async def _make_db():
    engine = create_async_engine(
        "sqlite+aiosqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    async with engine.begin() as conn:
        await conn.run_sync(
            lambda sync: Base.metadata.create_all(
                sync, tables=[User.__table__, MasteryRecord.__table__,
                              ReviewItem.__table__, AttemptLog.__table__]))
    return async_sessionmaker(engine, expire_on_commit=False)()


async def _seed_user(db, class_level: int = 10) -> str:
    uid = uuid.uuid4()
    db.add(User(id=uid, email=f"{uid}@fixture.test", name="Fixture",
                role="student", class_level=class_level))
    await db.commit()
    return str(uid)


async def _seed_ledger(db, uid: str, rows: dict):
    """rows: node_id -> (mastery, attempts)"""
    for nid, (p, att) in rows.items():
        db.add(MasteryRecord(user_id=uuid.UUID(uid), node_id=nid,
                             mastery_probability=p, attempts=att))
    await db.commit()


async def _seed_wrong(db, uid: str, node_id: str, misconception="mis_time_order"):
    db.add(AttemptLog(student_id=uid, node_id=node_id, is_correct=False,
                      misconception_id=misconception, created_at=datetime.utcnow()))
    await db.commit()


async def _seed_due(db, uid: str, node_id: str):
    db.add(ReviewItem(user_id=uuid.UUID(uid), node_id=node_id,
                      concept_name="fixture", next_review_date=date.today()))
    await db.commit()


def _actions_by_type(out, type_):
    return [a for a in out["actions"] if a["type"] == type_]


# ── 1. new student ────────────────────────────────────────────────────────

def test_new_student_gets_diagnose_and_syllabus_start():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        return await learnpath.next_actions(db, uid, subject="math", limit=6)

    out = asyncio.run(run())
    assert out["phase"] == "diagnose"
    assert out["subject_family"] == "maths"
    types = [a["type"] for a in out["actions"]]
    assert "diagnose" in types
    assert "learn" in types
    # class-10 student: the syllabus head of THEIR class, not another year's
    learn_nodes = [a["node_id"] for a in _actions_by_type(out, "learn")]
    assert "c10_math_cbse_01_001" in learn_nodes
    # honesty: the cold-start learn reason admits the diagnostic precedes it
    head = next(a for a in out["actions"] if a["node_id"] == "c10_math_cbse_01_001")
    assert "diagnostic" in head["reason"].lower()
    # no opaque node ids in display strings
    for a in out["actions"]:
        if a["reason"] and a["node_id"]:
            assert a["node_id"] not in a["reason"]


# ── 2. mid-journey student ────────────────────────────────────────────────

def test_mid_journey_continue_and_practice():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        # class-9 root mastered; class-10 node forming
        await _seed_ledger(db, uid, {
            "c9_math_cbse_01_001": (0.92, 4),
            "c10_math_cbse_01_001": (0.60, 2),
        })
        return await learnpath.next_actions(db, uid, subject="math", limit=6)

    out = asyncio.run(run())
    assert out["phase"] == "learn"
    learns = {a["node_id"]: a for a in _actions_by_type(out, "learn")}
    practices = {a["node_id"]: a for a in _actions_by_type(out, "practice")}
    # continue-learn on the in-progress node (hard prereq met)
    assert "c10_math_cbse_01_001" in learns
    # consolidation practice at 0.60 with attempts recorded
    assert "c10_math_cbse_01_001" in practices
    assert practices["c10_math_cbse_01_001"]["evidence"]["mastery_probability"] == 0.6
    # no repair-first for this node: its hard chain is satisfied
    assert all("foundations first" not in a["reason"] for a in out["actions"])


# ── 3. prereq-gap ordering ────────────────────────────────────────────────

def test_prereq_gap_repair_first_targets_root():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        # class-9 root NEVER mastered; class-10 node already weak-touched
        await _seed_ledger(db, uid, {
            "c10_math_cbse_01_001": (0.30, 2),
        })
        return await learnpath.next_actions(db, uid, subject="math", limit=6)

    out = asyncio.run(run())
    learns = _actions_by_type(out, "learn")
    assert learns, "expected learn actions"
    first_learn = learns[0]
    # the ROOT of the unmet hard chain is offered before the class-10 node
    assert first_learn["node_id"] == "c9_math_cbse_01_001"
    assert "foundations first" in first_learn["reason"]
    assert "c9_math_cbse_01_001" in first_learn["evidence"]["unmet_prereqs"]
    # the class-10 node itself is NOT offered as plain continue before repair
    assert "c10_math_cbse_01_001" not in [a["node_id"] for a in learns[:1]]


def test_same_class_mesh_never_gates():
    """D11: c10_01_002 is listed as a 'prereq' of c10_01_001 — same class.
    It must NOT block continue-learning (only cross-class edges gate)."""
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        await _seed_ledger(db, uid, {
            "c9_math_cbse_01_001": (0.92, 4),
            "c9_math_cbse_01_002": (0.90, 4),
            "c10_math_cbse_01_001": (0.70, 3),  # mesh sibling 002 untouched
        })
        return await learnpath.next_actions(db, uid, subject="math", limit=6)

    out = asyncio.run(run())
    learn_nodes = [a["node_id"] for a in _actions_by_type(out, "learn")]
    assert "c10_math_cbse_01_001" in learn_nodes, (
        "same-class sibling mesh must not gate continue-learning")
    assert not any("foundations first" in a["reason"] for a in out["actions"])


# ── 4. remediation re-ordering ────────────────────────────────────────────

def test_remediation_reorders_and_suppresses_unlock():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        # both hard roots + one class-10 node mastered; the OTHER class-10
        # node (mesh-forward child of the mastered one) has an open wrong
        await _seed_ledger(db, uid, {
            "c9_math_cbse_01_001": (0.93, 4),
            "c9_math_cbse_01_002": (0.90, 4),
            "c10_math_cbse_01_001": (0.90, 4),
        })
        await _seed_wrong(db, uid, "c10_math_cbse_01_002")
        return await learnpath.next_actions(db, uid, subject="math", limit=6)

    out = asyncio.run(run())
    assert out["phase"] == "remediate"
    # remediate outranks plain learn
    non_review = [a for a in out["actions"] if a["type"] != "revise"]
    assert non_review[0]["type"] == "remediate"
    assert non_review[0]["node_id"] == "c10_math_cbse_01_002"
    assert non_review[0]["evidence"]["recent_wrong_attempts"] == 1
    assert non_review[0]["evidence"]["misconception_ids"] == ["mis_time_order"]
    # no 'opens next' unlock celebration targeting the broken node
    for a in out["actions"]:
        if a["type"] == "learn":
            assert a["node_id"] != "c10_math_cbse_01_002" or \
                "opens next" not in a["reason"]


def test_recovered_wrong_clears_remediation():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        await _seed_ledger(db, uid, {
            "c9_math_cbse_01_001": (0.93, 4),
            "c10_math_cbse_01_001": (0.90, 4),
        })
        # wrong… then a later correct on the SAME node: recovered
        db.add(AttemptLog(student_id=uid, node_id="c10_math_cbse_01_002",
                          is_correct=False, created_at=datetime.utcnow()))
        await db.commit()
        db.add(AttemptLog(student_id=uid, node_id="c10_math_cbse_01_002",
                          is_correct=True, created_at=datetime.utcnow()))
        await db.commit()
        return await learnpath.next_actions(db, uid, subject="math", limit=6)

    out = asyncio.run(run())
    assert all(a["type"] != "remediate" for a in out["actions"])
    assert out["phase"] != "remediate"


# ── 5. review leads the strip ─────────────────────────────────────────────

def test_due_review_leads_the_strip():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        await _seed_ledger(db, uid, {"c10_math_cbse_01_001": (0.60, 2)})
        await _seed_due(db, uid, "c10_math_cbse_01_001")
        return await learnpath.next_actions(db, uid, subject="math", limit=6)

    out = asyncio.run(run())
    assert out["actions"][0]["type"] == "revise"
    assert out["actions"][0]["node_id"] == "c10_math_cbse_01_001"
    assert out["actions"][0]["evidence"]["due_reviews"] >= 1


# ── 6. subject filter ─────────────────────────────────────────────────────

def test_subject_filter_isolates_subjects():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        await _seed_ledger(db, uid, {
            "c10_bio_cbse_01_001": (0.50, 2),   # wrong subject
            "c10_math_cbse_01_001": (0.60, 2),
        })
        out = await learnpath.next_actions(db, uid, subject="math", limit=8)
        status = await learnpath.subject_status(db, uid, subject="math")
        return out, status

    out, status = asyncio.run(run())
    for a in out["actions"]:
        assert a["node_id"] != "c10_bio_cbse_01_001"
    # the bio row must not flip the math phase to learn-with-progress lies:
    # math has one in-progress row → phase learn, corpus scope = math only
    assert out["phase"] == "learn"
    assert status["corpus_nodes"] == 2  # the two class-10 math fixtures
    assert status["mastered"] == 0 and status["in_progress"] == 1


# ── 7. status: milestone + authored criteria ──────────────────────────────

def test_status_milestone_and_criteria_note():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        await _seed_ledger(db, uid, {"c10_math_cbse_01_001": (0.55, 2)})
        return await learnpath.subject_status(db, uid, subject="math")

    st = asyncio.run(run())
    assert st["phase"] == "learn"
    ms = st["next_milestone"]
    assert ms and ms["node_id"] == "c10_math_cbse_01_001"
    assert abs(ms["mastery"] - 0.55) < 1e-6
    # authored MASTERY_CRITERIA from the corpus header surfaces as the note
    assert st["mastery_criteria_note"] and "own words" in st["mastery_criteria_note"]
    assert st["ledger_source"].startswith("mastery_records")


def test_status_cold_start_has_honest_starting_line():
    async def run():
        db = await _make_db()
        uid = await _seed_user(db)
        return await learnpath.subject_status(db, uid, subject="math")

    st = asyncio.run(run())
    assert st["phase"] == "diagnose"
    ms = st["next_milestone"]
    assert ms and ms["mastery"] is None
    assert "starting" in ms["why"].lower()


# ── 8. per-subject pedagogy profiles ──────────────────────────────────────

def test_family_voices_differ_per_subject():
    hist = sp.reason("repair", "hist", "generic")
    phy = sp.reason("practice", "phy", "generic")
    bio = sp.reason("learn", "bio", "generic")
    assert "chronology" in hist.lower()
    assert "substitution" in phy.lower()
    assert "diagram" in bio.lower()
    assert hist != phy != bio
    # corpus codes and display names resolve to the same family
    assert sp.family_key_for("phy") == sp.family_key_for("Physics") == "physics"
    assert sp.family_key_for("acc") == sp.family_key_for("Accountancy") == "commerce"
    # every corpus subject code maps to one of the 11 families
    for code in ("math", "phy", "chem", "bio", "acc", "eco", "hist", "geo",
                 "eng", "hin", "cs", "psy", "leg", "app"):
        fam, prof = sp.family_for(code)
        assert fam in sp.FAMILIES
        assert prof["practice_mix"] and prof["cbq_weights"]
        assert prof["solver_role"] in ("verified", "guided")


def test_practice_mix_line_speaks_the_family():
    assert "70%" in sp.practice_mix_line("math")
    assert "labelling" in sp.practice_mix_line("bio").lower()
    line = sp.practice_mix_line("hist")
    assert "chronology" in line.lower() and "source" in line.lower()
