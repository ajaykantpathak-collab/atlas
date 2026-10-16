"""test_ovh_bank.py — WS-BANK context-scoped bank matching (2026-10-11).

Covers the widened lane without a live Postgres: a fake engine emulates
the scoped SQL (the fake applies :b/:c/:s the way Postgres would), so
these tests run hermetic on any host:

  T1 context filter narrows candidates — a row in another class/board/
     subject never matches (SQL scope + _row_in_scope defence in depth)
  T2 per-subject threshold table — prose subjects run the lower floor,
     STEM/unknown keep _min_sim()
  T3 digit-free prose lane — trgm probe only under pinned class+subject,
     at BANK_DIGITFREE_MIN_SIMILARITY; partial context refuses typed
  T4 answer agreement — colliding candidates with different keys refuse
     multi_row_disagreement
  T5 miss reasons stay typed on every refusal path
  T6 context=None is byte-identical to the legacy mechanics
  T7 fuzzy hits carry the 'bank_similar' marker, never a verbatim claim
"""
import sys
from pathlib import Path
from types import SimpleNamespace

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from backend.its.solver import bank_answer as ba  # noqa: E402


# --------------------------------------------------------------------------- #
# fake engine: emulates Postgres honouring the scoped SQL bind params
# --------------------------------------------------------------------------- #

class _Result:
    def __init__(self, rows):
        self._rows = rows

    def fetchall(self):
        return list(self._rows)


def _row(**kw):
    base = dict(id="00000000-0000-0000-0000-000000000001", subject="eng",
                class_level=8, question_type="short_answer", board="CBSE",
                year=2024, correct_answer="the key", model_answer="",
                explanation="", options=None, marks=3,
                question_text="")
    base.update(kw)
    return SimpleNamespace(**base)


class _FakeCx:
    """Applies the scoped-SQL semantics the real Postgres would:
    exact lane filters on norm_text == nk (+ scope), trgm lane on the
    row's canned sim >= :minsim (+ scope).  Records every statement."""

    def __init__(self, rows, norm_of, sims):
        self.rows = rows            # list[SimpleNamespace], may carry .sim
        self.norm_of = norm_of      # row.id -> norm_text
        self.sims = sims            # row.id -> float
        self.calls = []             # (sql, params)

    def __enter__(self):
        return self

    def __exit__(self, *a):
        return False

    def begin(self):
        return self

    def execute(self, stmt, params=None):
        sql = str(stmt)
        params = dict(params or {})
        self.calls.append((sql, params))
        if "set_config" in sql:
            return _Result([])
        out = []
        for r in self.rows:
            if "board <> 'QUARANTINED'" in sql and \
                    (r.board or "").upper() == "QUARANTINED":
                continue
            if "board = 'CBSE'" in sql and (r.board or "") != "CBSE":
                continue
            # emulate (:x IS NULL OR col = :x)
            if ":b" in sql and params.get("b") is not None \
                    and (r.board or "") != params["b"]:
                continue
            if ":c" in sql and params.get("c") is not None \
                    and r.class_level != params["c"]:
                continue
            if ":s" in sql and params.get("s") is not None \
                    and (r.subject or "") != params["s"]:
                continue
            if "% :nk" in sql:      # trigram lane
                sim = self.sims.get(r.id, 0.0)
                if sim < float(params.get("minsim", 0.93)):
                    continue
                r.sim = sim
                out.append(r)
            else:                   # exact lane
                if self.norm_of.get(r.id) == params.get("nk"):
                    out.append(r)
        out.sort(key=lambda r: -getattr(r, "sim", 0.0))
        return _Result(out)


class _FakeEng:
    def __init__(self, cx):
        self._cx = cx

    def connect(self):
        return self._cx


@pytest.fixture()
def fake_bank(monkeypatch):
    """Install a fake engine; returns (rows, norm_of, sims, cx)."""
    holder = {}

    def install(rows, norm_of, sims):
        cx = _FakeCx(rows, norm_of, sims)
        holder["cx"] = cx
        monkeypatch.setattr(ba, "_engine", lambda: _FakeEng(cx))
        # semantic lane stays off in tests (no npz needed)
        monkeypatch.setattr(ba, "_sem_bank_load", lambda: False)
        return cx

    return install


def _miss_cleared():
    with ba._LOCK:
        ba._STATE["miss_reason"] = None


def lookup(q, context=None):
    _miss_cleared()
    return ba._lookup_impl(q, context=context)


# --------------------------------------------------------------------------- #
# T1 — scope narrows candidates
# --------------------------------------------------------------------------- #

def test_scoped_context_excludes_other_class(fake_bank):
    q = "Explain the role of the Gram Panchayat in a village"
    r = _row(question_text=q, class_level=7, subject="civ")
    cx = fake_bank([r], {r.id: ba.normalize(q)}, {})
    hit = lookup(q, context={"board": "CBSE", "class_level": 8,
                             "subject": "civ"})
    assert hit is None
    assert ba.last_miss_reason() == "no_candidate_rows"
    # control: same query with the row's own class serves
    hit = lookup(q, context={"board": "CBSE", "class_level": 7,
                             "subject": "civ"})
    assert hit and hit["answer"] == "the key"


def test_scoped_context_excludes_other_board_and_subject(fake_bank):
    q = "State two features of the Indian Constitution"
    r = _row(question_text=q, class_level=8, subject="civ", board="CBSE")
    fake_bank([r], {r.id: ba.normalize(q)}, {})
    for ctx in ({"board": "ICSE", "class_level": 8, "subject": "civ"},
                {"board": "CBSE", "class_level": 8, "subject": "geo"}):
        assert lookup(q, context=ctx) is None
        assert ba.last_miss_reason() == "no_candidate_rows"


def test_row_in_scope_drops_straggler_defense_in_depth(fake_bank):
    """Even if a layer below leaks an out-of-scope row, the post-fetch
    guard refuses it — a wrong-class row can never serve."""
    q = "Explain the role of the Gram Panchayat in a village"
    r = _row(question_text=q, class_level=7, subject="civ", board="CBSE")

    class LeakyCx(_FakeCx):
        def execute(self, stmt, params=None):
            sql = str(stmt)
            self.calls.append((sql, dict(params or {})))
            if "set_config" in sql:
                return _Result([])
            return _Result([r])   # leaks regardless of scope binds

    cx = LeakyCx([r], {}, {})
    import pytest as _p  # noqa
    monkeypatch = _p.MonkeyPatch()
    monkeypatch.setattr(ba, "_engine", lambda: _FakeEng(cx))
    monkeypatch.setattr(ba, "_sem_bank_load", lambda: False)
    try:
        hit = lookup(q, context={"board": "CBSE", "class_level": 8,
                                 "subject": "civ"})
        assert hit is None
        assert ba.last_miss_reason() == "context_scope_excluded"
    finally:
        monkeypatch.undo()


def test_quarantined_board_never_serves(fake_bank, monkeypatch):
    q = "State two features of the Indian Constitution"
    r = _row(question_text=q, board="QUARANTINED")
    cx = _FakeCx.__new__(_FakeCx)

    class LeakyCx(_FakeCx):
        def execute(self, stmt, params=None):
            sql = str(stmt)
            self.calls.append((sql, dict(params or {})))
            if "set_config" in sql:
                return _Result([])
            return _Result([r])

    leak = LeakyCx([r], {}, {})
    monkeypatch.setattr(ba, "_engine", lambda: _FakeEng(leak))
    monkeypatch.setattr(ba, "_sem_bank_load", lambda: False)
    hit = lookup(q, context={"board": None, "class_level": 8,
                             "subject": "civ"})
    assert hit is None
    assert ba.last_miss_reason() == "context_scope_excluded"


# --------------------------------------------------------------------------- #
# T2 — per-subject threshold table
# --------------------------------------------------------------------------- #

def test_subject_floor_table():
    assert ba._subject_floor("eng") == 0.90
    assert ba._subject_floor("hin_ar") == 0.90
    assert ba._subject_floor("hist") == 0.90
    assert ba._subject_floor("math") == ba._min_sim()
    assert ba._subject_floor("phy") == ba._min_sim()
    assert ba._subject_floor("zzz_unknown") == ba._min_sim()
    assert ba._subject_floor(None) == ba._min_sim()
    assert ba._subject_floor("") == ba._min_sim()


def test_scoped_trgm_uses_prose_floor(fake_bank):
    """math holds 0.93; a prose subject admits a 0.90-0.93 candidate —
    but only because the digit skeleton agrees."""
    q = "If a train covers 120 km in 2 hours find its speed"
    r = _row(question_text="A train covers 120 km in 2 hours. "
                           "Find its speed.", subject="eco",
             class_level=9, sim=0.91)
    cx = fake_bank([r], {}, {r.id: 0.91})
    ctx = {"board": "CBSE", "class_level": 9, "subject": "eco"}
    hit = lookup(q, context=ctx)
    assert hit, "0.91 prose candidate under scope should serve"
    trgm = [p for s, p in cx.calls if "similarity(norm_text" in s]
    assert trgm and trgm[0]["minsim"] == 0.90
    # STEM subject keeps the 0.93 floor — same candidate refuses
    cx.calls.clear()
    ctx["subject"] = "math"
    hit = lookup(q, context=ctx)
    assert hit is None
    assert ba.last_miss_reason() == "no_candidate_rows"


# --------------------------------------------------------------------------- #
# T3 — digit-free prose lane
# --------------------------------------------------------------------------- #

_Q_DIGITFREE = "Explain why the Gram Panchayat is important for a village"


def test_digitfree_probe_needs_pinned_scope(fake_bank):
    r = _row(question_text="Explain why Gram Panchayats matter in "
                           "village life", subject="civ", class_level=6)
    cx = fake_bank([r], {}, {r.id: 0.96})
    # full scope -> digit-free lane open
    hit = lookup(_Q_DIGITFREE, context={"board": "CBSE", "class_level": 6,
                                        "subject": "civ"})
    assert hit and hit["via"] == "bank_similar"
    trgm = [p for s, p in cx.calls if "similarity(norm_text" in s]
    assert trgm and trgm[0]["minsim"] == \
        ba.BANK_DIGITFREE_MIN_SIMILARITY


def test_digitfree_partial_context_refuses_typed(fake_bank):
    r = _row(question_text="Explain why Gram Panchayats matter in "
                           "village life", subject="civ", class_level=6)
    cx = fake_bank([r], {}, {r.id: 0.96})
    # class missing -> probe never runs
    hit = lookup(_Q_DIGITFREE, context={"board": "CBSE",
                                        "subject": "civ"})
    assert hit is None
    assert ba.last_miss_reason() == "digitfree_context_required"
    assert not any("similarity(norm_text" in s for s, _ in cx.calls)
    # subject missing -> same
    hit = lookup(_Q_DIGITFREE, context={"board": "CBSE",
                                        "class_level": 6})
    assert hit is None
    assert ba.last_miss_reason() == "digitfree_context_required"


def test_digitfree_below_floor_refuses(fake_bank):
    r = _row(question_text="Explain why Gram Panchayats matter in "
                           "village life", subject="civ", class_level=6)
    fake_bank([r], {}, {r.id: 0.94})     # below the 0.95 digit-free bar
    hit = lookup(_Q_DIGITFREE, context={"board": "CBSE", "class_level": 6,
                                        "subject": "civ"})
    assert hit is None
    assert ba.last_miss_reason() == "no_candidate_rows"


def test_digitfree_candidate_with_digits_dropped(fake_bank):
    """A digit-free stem can never fuzzy-match a numbered row."""
    r = _row(question_text="List 4 duties of the Gram Panchayat in a "
                           "village", subject="civ", class_level=6)
    fake_bank([r], {}, {r.id: 0.97})
    hit = lookup(_Q_DIGITFREE, context={"board": "CBSE", "class_level": 6,
                                        "subject": "civ"})
    assert hit is None
    assert ba.last_miss_reason() == "digit_skeleton_mismatch"


# --------------------------------------------------------------------------- #
# T4 — answer agreement
# --------------------------------------------------------------------------- #

def test_colliding_candidates_disagree_refuses(fake_bank):
    q = "Explain why the Gram Panchayat is important for a village"
    nk = ba.normalize(q)
    r1 = _row(id="00000000-0000-0000-0000-0000000000a1",
              question_text="Explain why a Gram Panchayat is important",
              correct_answer="because it runs the village", subject="civ",
              class_level=6)
    r2 = _row(id="00000000-0000-0000-0000-0000000000a2",
              question_text="Explain why the Gram Panchayat matters",
              correct_answer="because it collects taxes", subject="civ",
              class_level=6)
    fake_bank([r1, r2], {}, {r1.id: 0.97, r2.id: 0.96})
    hit = lookup(q, context={"board": "CBSE", "class_level": 6,
                             "subject": "civ"})
    assert hit is None
    assert ba.last_miss_reason() == "multi_row_disagreement"


def test_whole_set_skeleton_filter_picks_agreeing_row(fake_bank):
    """Scoped mode filters the whole candidate set on the digit skeleton:
    a lower-sim row whose numbers agree serves even when the top hit's
    numbers differ (legacy mode checked only rows[0] and refused)."""
    q = "Solve for x: 2x = 10 find x please"
    top = _row(id="00000000-0000-0000-0000-0000000000b1",
               question_text="Solve for x: 3x = 10 find x please",
               correct_answer="10/3", subject="math", class_level=8)
    ok = _row(id="00000000-0000-0000-0000-0000000000b2",
              question_text="Solve for x: 2x = 10 find x please",
              correct_answer="5", subject="math", class_level=8)
    fake_bank([top, ok], {}, {top.id: 0.97, ok.id: 0.95})
    hit = lookup(q, context={"board": "CBSE", "class_level": 8,
                             "subject": "math"})
    assert hit and hit["answer"] == "5"


# --------------------------------------------------------------------------- #
# T5 — typed miss reasons
# --------------------------------------------------------------------------- #

def test_miss_reasons_stay_typed(fake_bank):
    fake_bank([], {}, {})
    assert lookup("short") is None
    assert ba.last_miss_reason() == "question_too_short"
    q = "No such question exists anywhere in the bank at all really"
    assert lookup(q, context={"board": "CBSE", "class_level": 6,
                              "subject": "civ"}) is None
    assert ba.last_miss_reason() in ("no_candidate_rows",
                                     "digitfree_context_required")


def test_lookup_wrapper_passes_context(monkeypatch):
    seen = {}

    def impl(q, context=None):
        seen["ctx"] = context
        return {"answer": "ok"}

    monkeypatch.setattr(ba, "_lookup_impl", impl)
    monkeypatch.setenv("BANK_LOOKUP_BUDGET_S", "2")
    ctx = {"board": "CBSE", "class_level": 6, "subject": "civ"}
    assert ba.lookup("a long enough question text here",
                     context=ctx) == {"answer": "ok"}
    assert seen["ctx"] == ctx


# --------------------------------------------------------------------------- #
# T6 — context=None legacy parity
# --------------------------------------------------------------------------- #

def test_context_none_is_legacy_path(fake_bank):
    q = "Explain why the Gram Panchayat is important for a village"
    r = _row(question_text=q)
    cx = fake_bank([r], {r.id: ba.normalize(q)}, {r.id: 0.99})
    hit = lookup(q)                      # no context
    assert hit and hit["via"] == "bank_exact"
    sqls = [s for s, _ in cx.calls]
    assert any("board = 'CBSE'" in s for s in sqls)
    assert not any(":b IS NULL" in s for s in sqls)


def test_context_none_digitfree_never_probes_trgm(fake_bank):
    r = _row(question_text="Explain why Gram Panchayats matter in "
                           "village life")
    cx = fake_bank([r], {}, {r.id: 0.99})
    assert lookup(_Q_DIGITFREE) is None
    assert not any("similarity(norm_text" in s for s, _ in cx.calls)


def test_all_none_context_is_legacy(fake_bank):
    """context={} / all-None values == context=None (legacy gates)."""
    r = _row(question_text="Explain why Gram Panchayats matter in "
                           "village life")
    cx = fake_bank([r], {}, {r.id: 0.99})
    assert lookup(_Q_DIGITFREE, context={}) is None
    assert lookup(_Q_DIGITFREE,
                  context={"board": None, "class_level": None,
                           "subject": None}) is None
    assert not any("similarity(norm_text" in s for s, _ in cx.calls)


# --------------------------------------------------------------------------- #
# T7 — fuzzy marker
# --------------------------------------------------------------------------- #

def test_fuzzy_hit_is_marked_similar_never_verbatim(fake_bank):
    q = "If a train covers 120 km in 2 hours find its speed"
    r = _row(question_text="A train covers 120 km in 2 hours. "
                           "Find its speed.", subject="eco",
             class_level=9, sim=0.91)
    fake_bank([r], {}, {r.id: 0.91})
    hit = lookup(q, context={"board": "CBSE", "class_level": 9,
                             "subject": "eco"})
    assert hit
    assert hit["via"] == "bank_similar"
    assert hit["meta"]["match"] == "similar"
    assert hit["meta"]["similarity"] == pytest.approx(0.91)
    assert "similar" in hit["steps"][0].lower()


def test_context_from_node_id():
    assert ba.context_from_node_id("c10_bio_cbse_01_001") == {
        "board": "CBSE", "class_level": 10, "subject": "bio"}
    assert ba.context_from_node_id("c6_engl_icse_02_004") == {
        "board": "ICSE", "class_level": 6, "subject": "engl"}
    assert ba.context_from_node_id("c12_phy_isc_03_002") == {
        "board": "ISC", "class_level": 12, "subject": "phy"}
    assert ba.context_from_node_id("not-a-node") is None
    assert ba.context_from_node_id(None) is None
    assert ba.context_from_node_id("") is None
