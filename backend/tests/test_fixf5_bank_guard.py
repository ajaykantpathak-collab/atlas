"""F5 bank meta-text guard (audit 2026-10-15 §7 #11, lane LAUNCH-FIX-F5).

The audit found a c12 physics TEG bank row whose ``correct_answer`` is
authoring meta-text ("So we can compute new length for same emf using
resistivity ratio without needing gradient") instead of an answer.  Root
cause class: the SEED generator extracted the author's QA-checklist line
from ``_comp`` companion docs into the answer slot.  Every confirmed
sibling is a ``source_type='seed'`` row whose whole correct_answer is an
authoring/verification instruction — never something a student could
produce or be graded against.

This guard has two layers:

  1. UNIT (no DB): the detector classifies known-bad meta-text as hits
     and known-good answer prose (including the *diagnostic* "Verify —"
     teaching voice, which carries real answers) as non-hits.
  2. BANK SCAN (live postgres): scans the WHOLE board_questions bank and
     FAILS on any surviving meta-text answer.  Skipped with an explicit
     reason when the production DB is unreachable (offline dev box).

Run:  python -m pytest tests/test_fixf5_bank_guard.py -q
"""
from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path

import pytest

BACKEND = Path(__file__).resolve().parents[1]
DEPLOY = Path(__file__).resolve().parents[2]
for _p in (str(DEPLOY), str(BACKEND)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

from backend.tools.fixf5_bank_metatext import (  # noqa: E402
    FLAG_REASON, is_metatext_answer, scan_bank,
)

# ── 1. detector unit layer ────────────────────────────────────────────────

# The audit's confirmed row + representative siblings (verbatim shapes
# found in the 2026-10-15 scan of the production bank).
KNOWN_BAD = [
    # audit §7 #11 — the confirmed c12 phy TEG row (id aedc0c50-...)
    "So we can compute new length for same emf using resistivity "
    "ratio without needing gradient",
    "So we must use \u0394P_eff",
    "So we should not subtract exports; they are already in C+I+G",
    "Ensure three different senses appear; present as bullet list \u2013 2 lines",
    "Check that each quality is distinct, sourced from node, and linked "
    "to a specific scenario fact (MLA warning, literacy/landholding differences)",
    "Verify no simile words (\u201clike\u201d, \u201cas\u201d) are used; write concise mapping \u2013 2 lines",
    "Confirm that the design isolates the mediating role of the secondary "
    "theme and controls for confounders (age, education)",
    "Cross-check: ICAR recommends neem for stored grain pests in "
    "floodplains \u2192 Valid for textiles",
    "Ensure that Share Capital increase matches paid\u2011up amount; "
    "Securities Premium reflects excess over f",
    "Check if any condition violated (e.g., exceed 6 hrs) \u2013 scenario "
    "does not specify hours; assuming sta",
    "Validate by CRISPR editing the SNP in a cell line and measuring "
    "target gene expression",
    "Check units: vehicles",
    "Verify \u03a3=800",
]

# Legitimate answers that the detector must NOT flag.  Includes the
# diagnostic "Verify — <result>" teaching voice (non-seed rows carry the
# real answer after the dash) and single-word fill-blank keys.
KNOWN_GOOD = [
    # diagnostic rows: answer content follows the "Verify —" lead-in
    ("diagnostic", "Verify \u2014 average speed for round trip = "
     "2\u00d730/8 = 7.5 km/h, which lies between 6 and 10 (harmonic mean)"),
    ("diagnostic", "Verify the units and physical meaning: 21 liters of "
     "oxygen gas are physically mixed with 78 liters of nitrogen and 1 "
     "liter of other gases. Answer: 21"),
    # fill-blank rows whose KEY IS the instruction word (diagnostic rows)
    ("diagnostic", "ensure"),
    ("diagnostic", "confirm"),
    # ordinary answers that merely contain "we can" mid-prose
    ("diagnostic", "Between 1/4 and 1/2, we can find 3/8, 5/16, 9/32, "
     "... infinitely many by repeatedly taking midpoints"),
    ("worked_example", "The resistance quadruples to 40 ohms because the "
     "wire is both longer (2x) and thinner (2x)."),
    ("diagnostic", "The correct answer is C. Transfer payments like "
     "pensions are excluded because they do not arise from current "
     "production."),
    ("seed", "Chapter 3 covers kinematics equations of motion."),
]


@pytest.mark.parametrize("text", KNOWN_BAD)
def test_detector_flags_known_bad(text):
    assert is_metatext_answer("seed", text), f"should flag: {text[:60]!r}"


@pytest.mark.parametrize("source,answer", KNOWN_GOOD)
def test_detector_passes_known_good(source, answer):
    assert not is_metatext_answer(source, answer), \
        f"should NOT flag ({source}): {answer[:60]!r}"


def test_detector_scoped_to_seed_source():
    """The class is a seed-generator extraction defect; the same opener
    in a diagnostic row is teaching voice with a real answer."""
    bad = "Ensure three different senses appear; present as bullet list"
    assert is_metatext_answer("seed", bad)
    assert not is_metatext_answer("diagnostic", bad)
    assert not is_metatext_answer(None, bad)


def test_detector_ignores_empty_and_none():
    assert not is_metatext_answer("seed", None)
    assert not is_metatext_answer("seed", "")
    assert not is_metatext_answer("seed", "   ")


def test_flag_reason_fits_column():
    """board_question_flags.reason is String(32) — keep the label short."""
    assert len(FLAG_REASON) <= 32


# ── 2. whole-bank guard layer ─────────────────────────────────────────────


def _db_url() -> str | None:
    env = os.environ.get("DATABASE_URL")
    if env:
        return env.replace("+asyncpg", "")
    try:
        pw_lines = [l.strip().split("=", 1)[1]
                    for l in open(r"D:\platform\deploy\.env",
                                  encoding="utf-8")
                    if l.startswith("POSTGRES_PASSWORD=")]
        if not pw_lines:
            return None
        return (f"postgresql://dream_user:{pw_lines[0]}"
                f"@127.0.0.1:5432/dream_app")
    except OSError:
        return None


def test_whole_bank_free_of_metatext_answers():
    """FAILS on any board_questions row whose correct_answer is leaked
    authoring meta-text.  This is the standing guard for audit §7 #11 —
    after fixf5_bank_metatext.py --apply it must stay green forever."""
    url = _db_url()
    if url is None:
        pytest.skip("no DATABASE_URL / deploy/.env — offline box")

    import asyncpg

    async def _run():
        conn = await asyncpg.connect(url)
        try:
            return await scan_bank(conn)
        finally:
            await conn.close()

    hits = asyncio.run(_run())
    assert hits == [], (
        f"{len(hits)} board_questions rows still carry authoring "
        f"meta-text in correct_answer (run "
        f"python -m backend.tools.fixf5_bank_metatext --apply): "
        f"{[h['id'] for h in hits[:10]]}"
    )
