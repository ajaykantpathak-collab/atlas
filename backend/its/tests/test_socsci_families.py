"""test_socsci_families.py -- offline battery for socsci_families.py.

Three layers, all DB-free / Docker-free (Postgres-down safe):

  1. TABLE INVARIANTS -- every _EVENTS row is a sane closed-world row:
     shape, year sanity (y0 <= y1, plausible), lowercase aliases, and the
     trap aliases that must NEVER fire (Bare-"printing press", bare
     "bengal gazette", Ahmedabad's mill -- each a documented collision).

  2. CORPUS ANCHORING (the closed-world law, executable) -- every event
     row must find at least one corpus file (enhanced_nodes_md or
     cisce_nodes_v2) that contains one of its aliases AND one of its span
     years.  A row that cannot anchor itself to the taught corpus is a
     hallucination vector and fails the run.

  3. BEHAVIOUR -- year recall, spans, end-years, intervals (incl. the
     "years apart" phrasing), timeline ordering, and the honest refusals
     for events OUTSIDE the table (Russian Revolution 1917, WWII, Hitler)
     plus the guard rails (embedded-year tricks, age arithmetic).

Run:  cd D:/platform/deploy/backend
      PYTHONPATH=. python -m pytest its/tests/test_socsci_families.py -q
"""
from __future__ import annotations

import glob
import os
import re

import pytest

from backend.its.solver.socsci_families import (
    _EVENTS,
    _find_events,
    model_socsci,
)

_BACKEND = os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))))          # .../deploy/backend
_CORPUS_DIRS = [
    os.path.join(_BACKEND, os.pardir, "content", "enhanced_nodes_md"),
    os.path.join(_BACKEND, os.pardir, "content", "cisce_nodes_v2"),
]


def _res(text: str):
    return model_socsci(text)


def _verified(text: str):
    r = _res(text)
    assert r.matched, f"honest refusal where a VERIFIED was expected: " \
                      f"{text[:80]!r} ({r.note})"
    return r


def _refused(text: str):
    r = _res(text)
    assert not r.matched, f"family SPOKE outside its closed table: " \
                          f"{text[:80]!r} -> {r.final_answer!r}"
    return r


# ------------------------------------------------------------------ #
# 1. table invariants
# ------------------------------------------------------------------ #

def test_event_rows_shape_and_years():
    for row in _EVENTS:
        canon, y0, y1, aliases = row
        assert isinstance(canon, str) and canon.strip(), row
        assert isinstance(y0, int) and isinstance(y1, int), row
        # SOCIAL-ALL (2026-10-07): floor lowered 700 -> 250 for the
        # c11 world-history rows (Diocletian 284, fall of the Western
        # Roman Empire 476).  Every row stays CE: BCE events (c11 ch1-5
        # early societies) remain OUTSIDE the closed table by design --
        # year-recall on them declines honestly.
        assert 250 <= y0 <= 2050 and y0 <= y1, row
        assert aliases and all(
            isinstance(a, str) and a == a.lower().strip() and a
            for a in aliases), f"aliases must be lowercase: {row}"


def test_event_canon_names_unique():
    names = [r[0] for r in _EVENTS]
    assert len(names) == len(set(names)), "duplicate canonical names"


def test_trap_aliases_absent():
    """Aliases that would mis-anchor a sibling corpus fact (documented in
    GOLDEN_HIST.md) must not be in the table."""
    banned = {
        "printing press",        # Gutenberg 1448 vs India's first press 1556
        "bengal gazette",        # Hicky 1780 vs Gangakishore Bhattacharya 1816
        "ahmedabad's first mill",  # 1861 event, not the Bombay 1854 row
        "14 points",             # bare numeric phrase, maths territory
    }
    for canon, _y0, _y1, aliases in _EVENTS:
        bad = banned & set(aliases)
        assert not bad, f"{canon}: trap alias(es) {bad}"


def test_find_events_orders_by_position():
    evs = _find_events(
        "Trace the path from the Revolt of 1857 to Quit India and then "
        "Indian independence.")
    assert [e[0] for e in evs][:3] == [
        "Revolt of 1857", "Quit India Movement", "Indian independence"]


# ------------------------------------------------------------------ #
# 2. corpus anchoring (closed-world law, executable)
# ------------------------------------------------------------------ #

def test_every_event_row_is_corpus_anchored():
    """Each row needs one corpus file carrying (alias AND a span year)."""
    files = []
    for d in _CORPUS_DIRS:
        files += glob.glob(os.path.join(d, "*.md"))
    assert len(files) > 20000, f"corpus missing? {len(files)} files"
    texts = []
    for p in files:
        try:
            with open(p, encoding="utf-8", errors="ignore") as fh:
                # fold curly apostrophes so 'hicky's gazette' style aliases
                # match the raw corpus text
                texts.append(
                    fh.read().lower().replace("\u2019", "'"))
        except OSError:
            continue
    unanchored = []
    for canon, y0, y1, aliases in _EVENTS:
        years = [str(y0), str(y1)]
        if not any(any(y in t for y in years) and
                   any(a in t for a in aliases) for t in texts):
            unanchored.append((canon, y0, y1))
    assert not unanchored, \
        f"rows with no corpus anchor (alias+year in one file): {unanchored}"


# ------------------------------------------------------------------ #
# 3a. EVENT_YEAR behaviour -- new corpus rows answer
# ------------------------------------------------------------------ #

@pytest.mark.parametrize("stem,year", [
    ("In which year was the Napoleonic Code introduced?", 1804),
    ("When was the Congress of Vienna held?", 1815),
    ("In which year did the Revolutions of 1848 break out across Europe?",
     1848),
    ("When was the unification of Italy proclaimed?", 1861),
    ("In which year was the German Empire proclaimed?", 1871),
    ("In which year was the Poona Pact signed?", 1932),
    ("When was the Simon Commission appointed?", 1927),
    ("In which year was the Nehru Report published?", 1928),
    ("In which year did the Khilafat Movement begin?", 1919),
    ("In which year was the Defence of India Act passed?", 1915),
    ("When was the Montagu Declaration made?", 1917),
    ("In which year did the Chauri Chaura incident take place?", 1922),
    ("When was the Vernacular Press Act passed?", 1878),
    ("In which year did the Great Depression begin?", 1929),
    ("When was the Bretton Woods Conference held?", 1944),
    ("In which year was the Suez Canal opened?", 1869),
    ("In which year did Hargreaves invent the spinning jenny?", 1764),
    ("In which year was the Diamond Sutra printed?", 868),
    ("When was the Gutenberg Bible printed?", 1455),
    ("In which year was Hicky's Bengal Gazette published?", 1780),
    ("In which year was TISCO established?", 1907),
    ("In which year was the Salt Act enacted?", 1882),
    ("In which year did Arkwright build the first modern factory, "
     "Cromford Mill?", 1771),
])
def test_event_year_new_rows(stem, year):
    r = _verified(stem)
    assert str(year) in r.final_answer
    assert r.quantities.get("year") == float(year)
    assert r.structure == "EVENT_YEAR"


def test_event_year_end_year_phrasing():
    r = _verified("When did the Khilafat Movement end?")
    assert "1924" in r.final_answer
    r = _verified("When did the Great Depression end?")
    assert "1934" in r.final_answer
    r = _verified("When did the First World War end?")
    assert "1918" in r.final_answer


def test_event_year_span_note_generic():
    r = _verified("When did the Non-Cooperation Movement begin?")
    assert "1920" in r.final_answer and "1922" in r.final_answer
    assert "movement ran until" not in r.final_answer  # generic wording now


# ------------------------------------------------------------------ #
# 3a-SOCIAL-ALL -- c11/c12 corpus rows answer (2026-10-07)
# ------------------------------------------------------------------ #

@pytest.mark.parametrize("stem,year", [
    ("In which year did the Norman Conquest of England take place?", 1066),
    ("When was the Domesday Book compiled?", 1086),
    ("In which year was Diocletian's accession?", 284),
    ("In which year did the Western Roman Empire fall?", 476),
    ("In which year did the Statute of Labourers become law?", 1351),
    ("In which year did the Mongol Conquests begin?", 1206),
    ("In which year did the fall of Constantinople happen?", 1453),
    ("In which year did Bartolomeu Dias round the Cape?", 1488),
    ("In which year did Columbus reach the Americas?", 1492),
    ("In which year did Vasco da Gama reach India?", 1498),
    ("In which year did the Meiji Restoration begin?", 1868),
    ("In which year did the First Opium War break out?", 1839),
    ("In which year did the Taiping Rebellion begin?", 1850),
    ("When did the Taiping Rebellion end?", 1864),
    ("In which year did the Russo-Japanese War begin?", 1904),
    ("In which year did the Xinhai Revolution take place?", 1911),
    ("In which year was the Vijayanagara Empire founded?", 1336),
    ("In which year did Krishnadeva Raya's reign begin?", 1509),
    ("When did Krishnadeva Raya's reign end?", 1529),
    ("In which year was the Battle of Talikota fought?", 1565),
    ("In which year did Akbar abolish jizya?", 1564),
    ("In which year was Shivaji's coronation held?", 1674),
    ("In which year did Aurangzeb die?", 1707),
    ("In which year was the Permanent Settlement introduced?", 1793),
    ("In which year was the Fifth Report published?", 1813),
    ("In which year did the Santhal Rebellion begin?", 1855),
    ("In which year did the Deccan Riots take place?", 1875),
    ("In which year was the Cripps Mission sent?", 1942),
    ("In which year did the Cabinet Mission arrive in India?", 1946),
    ("In which year was Direct Action Day observed?", 1946),
    ("In which year did the Partition of India take place?", 1947),
    ("In which year were the Gandhi-Jinnah talks held?", 1944),
])
def test_event_year_social_all_rows(stem, year):
    r = _verified(stem)
    assert str(year) in r.final_answer
    assert r.quantities.get("year") == float(year)
    assert r.structure == "EVENT_YEAR"


def test_black_death_span_is_the_definition_form():
    """The corpus dates the Black Death 1346-1353 in its definition-form
    nodes (c11_05_008/010/011); the 1348 mentions narrate its European
    arrival.  Begin/end asks anchor to the taught span endpoints."""
    r = _verified("When did the Black Death begin?")
    assert "1346" in r.final_answer
    r = _verified("When did the Black Death end?")
    assert "1353" in r.final_answer


def test_opium_war_bare_alias_is_a_trap():
    """The corpus never teaches a Second Opium War -- the bare 'opium war'
    alias is excluded so an untaught 'Second Opium War' ask declines."""
    _refused("In which year did the Second Opium War begin?")


def test_aurangzeb_accession_declines_no_clean_surface_form():
    """The corpus states Aurangzeb's accession only inside a parenthetical
    (c12_05_009) and 'war of succession' is not unique to him -- no broad
    alias is registered, so the accession ask declines (the death ask,
    which IS cleanly taught, answers 1707)."""
    _refused("In which year did Aurangzeb ascend the throne?")


def test_ryotwari_decade_only_stays_outside_the_table():
    """The corpus dates the Ryotwari settlement to 'the 1820s' -- no single
    year -- so a year-recall declines instead of picking one."""
    _refused("In which year was the Ryotwari system introduced?")


def test_century_ask_reads_the_corpus_table_when_no_year_in_text():
    r = _verified("In which century was the Diamond Sutra printed?")
    assert r.structure == "CENTURY_DECADE"
    assert "9th" in r.final_answer        # 868 -> 9th century
    r = _verified("In which century did the fall of Constantinople happen?")
    assert "15th" in r.final_answer       # 1453
    # a stem that carries its own year keeps the original text-anchored path
    r = _verified("In which century did the Revolt of 1857 take place?")
    assert "19th" in r.final_answer


def test_event_year_collisions_anchor_right():
    r = _verified(
        "In which year was the first printing press in India established?")
    assert "1556" in r.final_answer, r.final_answer
    r = _verified("In which year was the Civil Disobedience Movement "
                  "launched?")
    assert "1930" in r.final_answer


# ------------------------------------------------------------------ #
# 3b. honest refusals -- the closed world holds
# ------------------------------------------------------------------ #

@pytest.mark.parametrize("stem", [
    "In which year did the Russian Revolution begin?",      # not in corpus
    "When did the Second World War end?",                   # no dated anchor
    "In which year did Hitler come to power in Germany?",
    "When was Ahmedabad's first mill established?",         # 1854 trap row
    "In which year did the French Revolution begin, 1776 or 1789?",  # trick
])
def test_event_year_honest_refusals(stem):
    _refused(stem)


def test_year_ask_declines_biography_maths():
    _refused("When was Mahatma Gandhi born and how old was he in 1942?")


# ------------------------------------------------------------------ #
# 3c. CHRONO_INTERVAL / TIMELINE / CENTURY
# ------------------------------------------------------------------ #

def test_interval_two_corpus_events():
    r = _verified("How many years between the Revolt of 1857 and Indian "
                  "independence?")
    assert r.numeric_answer == 90.0
    assert "90" in r.final_answer


def test_interval_years_apart_trigger():
    r = _verified("How many years apart were the Congress of Vienna and "
                  "the Revolutions of 1848?")
    assert r.matched and r.numeric_answer == 33.0


def test_duration_of_spanned_event():
    r = _verified("How long did the Great Depression last?")
    assert r.numeric_answer == 5.0        # 1929-1934, corpus span
    r = _verified("How long did the Khilafat Movement last?")
    assert r.numeric_answer == 5.0        # 1919-1924, corpus span


def test_duration_outside_table_refuses():
    _refused("How long did the Second World War last?")


def test_timeline_orders_new_events():
    r = _verified("Arrange in chronological order: Quit India Movement, "
                  "unification of Germany, Revolt of 1857.")
    assert r.structure == "TIMELINE_ORDER"
    chain = r.final_answer
    assert chain.index("1857") < chain.index("1871") < chain.index("1942")


def test_timeline_refuses_unknown_event():
    _refused("Arrange in chronological order: the Russian Revolution, "
             "Quit India Movement, the Revolt of 1857.")


def test_century_placement_still_works():
    r = _verified("In which century did the Revolt of 1857 take place?")
    assert r.structure == "CENTURY_DECADE"
    assert "19th" in r.final_answer


# ------------------------------------------------------------------ #
# 3d. the 5-beat step contract on every matched answer
# ------------------------------------------------------------------ #

@pytest.mark.parametrize("stem", [
    "In which year was the Poona Pact signed?",
    "How many years between the Dandi Salt March and Indian independence?",
    "Arrange in chronological order: Lahore Congress, Jallianwala Bagh "
    "massacre, Quit India Movement.",
])
def test_step_contract_on_history_answers(stem):
    r = _verified(stem)
    joined = " ".join(r.steps).lower()
    for beat in ("method:", "given:", "computation:", "check:",
                 "interpretation:"):
        assert beat in joined, f"missing {beat} beat: {r.steps}"


# ------------------------------------------------------------------ #
# 3e. no regression -- the pre-existing VERIFIED anchors
# ------------------------------------------------------------------ #

@pytest.mark.parametrize("stem,year", [
    ("In which year did the French Revolution begin?", 1789),
    ("When was the Jallianwala Bagh massacre?", 1919),
    ("In which year did the First World War begin?", 1914),
    ("When was the Lucknow Pact signed?", 1916),
    ("In which year was the Indian National Congress founded?", 1885),
    ("When did the Quit India Movement start?", 1942),
    ("In which year did India gain independence?", 1947),
])
def test_preexisting_anchors_unchanged(stem, year):
    r = _verified(stem)
    assert str(year) in r.final_answer
