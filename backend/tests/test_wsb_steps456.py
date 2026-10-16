"""test_wsb_steps456.py — WS-B merge steps 4-6 invariants (ovhB-m2).

Pins the consolidation-map (§5.4-5.7) invariants for the batch that
  - dissolves biotech_numeric_families.py into biology_families.py (step 4),
  - dissolves commerce_families2.py into commerce_families.py (step 5),
  - splits structure_families_lang.py into english_families.py
    (ENGLISH_LANG_SPECS) + hindi_families.py (HINDI_LANG_SPECS) (step 6),
with:
  I1  merged table row order == original cross-file registration order
  I2  _STRUCTURES order preserved (commerce takes the old commerce2 slot,
      biology keeps its slot, biotech's slot disappears)
  I3  LANG_* spec ids verbatim so the LANG_VERIFIERS keys keep hitting
  I5  ids stable; MOVE not copy (the spec compute objects are the SAME
      objects the subject files define)
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# ONLY the deploy root on sys.path (two-module-identity trap).

import pytest

# --------------------------------------------------------------- step 4
def test_biotech_module_dissolved():
    import importlib.util
    assert importlib.util.find_spec(
        "backend.its.solver.biotech_numeric_families") is None, \
        "biotech_numeric_families.py must be deleted (merge = MOVE)"


def test_biology_registered_once_biotech_gone():
    from backend.its.solver import modeling_layer as ml
    names = [getattr(f, "__name__", "") for f in ml._STRUCTURES]
    assert "model_biotech_numeric" not in names
    assert names.count("model_biology") == 1


def test_biology_table_gains_biotech_row_at_tail():
    from backend.its.solver import biology_families as BF
    ids = [fid for fid, _pat, _fn in BF._TABLE]
    assert ids.count("PUNNETT_CROSS") == 2          # in-file dup preserved
    assert ids[-1] == "BIO_HEMOCYTOMETER", ids[-3:]  # §5.4: tail block
    assert len(ids) == 35                            # 34 original rows + 1


def test_hemocytometer_solves_through_model_biology():
    from backend.its.solver.biology_families import model_biology
    q = ("5 mL of a cell suspension is diluted 1:10 and 10 uL is loaded "
         "into a hemocytometer. Cells count an average of 45 cells per "
         "large square. What is the concentration in cells per mL of "
         "the original suspension?")
    r = model_biology(q)
    assert r.matched and r.structure == "BIO_HEMOCYTOMETER"
    # 45 x 10 (dilution) x 10^4 (chamber) = 4.5 x 10^6 cells/mL
    assert r.numeric_answer == pytest.approx(4_500_000.0)


# --------------------------------------------------------------- step 5
def test_commerce2_module_dissolved():
    import importlib.util
    assert importlib.util.find_spec(
        "backend.its.solver.commerce_families2") is None, \
        "commerce_families2.py must be deleted (merge = MOVE)"


def test_commerce_dispatcher_takes_old_commerce2_slot():
    from backend.its.solver import modeling_layer as ml
    names = [getattr(f, "__name__", "") for f in ml._STRUCTURES]
    assert "model_commerce2" not in names
    assert names.count("model_commerce_families") == 1
    # I2: the merged commerce dispatcher keeps its old commerce2 slot —
    # after the steps-2/3/7 merges its neighbours are the merged
    # chemistry dispatcher and (after syllabus dissolved) the
    # slot-schema matcher.
    i = names.index("model_commerce_families")
    assert names[i - 1] == "model_chemistry_families"
    assert names[i + 1] == "model_slot_schema"


def test_commerce_table_order_core_rows_first_then_comm2():
    """§5.5 block merge with I1 first-match semantics: the commerce core
    table's own row order is load-bearing (NET_GST_PAYABLE must stay
    ahead of the wider GST trigger or the golden net-GST probe flips to
    the unverified GST row)."""
    from backend.its.solver import commerce_families as CF
    ids = [fid for fid, _pat, _fn in CF._TABLE]
    assert ids[:14] == [
        "NET_GST_PAYABLE", "BEP_SALES", "BEP_UNITS", "MARGIN_OF_SAFETY",
        "CONTRIBUTION", "TARGET_PROFIT_UNITS", "COST_PLUS_PRICE",
        "CASH_PROJECTION", "WORKING_CAPITAL", "MARKET_SHARE",
        "RETAINED_EARNINGS", "OPERATING_CYCLE", "PROFIT_ON_COST_SALE",
        "GOODWILL_YEARS_PURCHASE"]
    assert ids[14:] == ["GST", "PARTNERSHIP_SHARE", "CURRENT_RATIO",
                        "INTEREST_ON_CAPITAL"]


def test_commerce_overlap_probes_keep_their_rows():
    from backend.its.solver.commerce_families import model_commerce_families
    net_gst = ("A manufacturer buys raw materials worth Rs 5,00,000 (plus "
               "GST @18%) and sells finished goods worth Rs 8,00,000 "
               "(plus GST @12%). Calculate the net GST payable.")
    r = model_commerce_families(net_gst)
    assert r.matched and r.structure == "NET_GST_PAYABLE"
    assert "6,000" in str(r.final_answer)
    gst = ("A laptop is sold for Rs 11,800 including 18% GST. "
           "Find the taxable value.")
    r2 = model_commerce_families(gst)
    assert r2.matched and r2.structure == "GST"
    bep = ("A firm has fixed costs of Rs 50,000, selling price Rs 20 "
           "per unit and variable cost Rs 12 per unit. Find the "
           "break-even point in units.")
    r3 = model_commerce_families(bep)
    assert r3.matched and r3.structure == "BEP_UNITS"


def test_commerce_partnership_and_ratio_rows_alive():
    from backend.its.solver.commerce_families import model_commerce_families
    p = model_commerce_families(
        "A and B are partners sharing profits in the ratio 3:2. The "
        "profit is Rs 50,000. Find B's share.")
    assert p.matched and p.structure == "PARTNERSHIP_SHARE"
    cr = model_commerce_families(
        "A firm has current assets of Rs 2,00,000 and current "
        "liabilities of Rs 1,00,000. Calculate the current ratio.")
    assert cr.matched and cr.structure == "CURRENT_RATIO"
    ioc = model_commerce_families(
        "A partner's capital is Rs 4,00,000. Interest on capital is "
        "allowed at 6% per annum for 6 months. Find the interest on "
        "capital.")
    assert ioc.matched and ioc.structure == "INTEREST_ON_CAPITAL"


# --------------------------------------------------------------- step 6
def test_lang_spec_ids_live_in_subject_files():
    from backend.its.solver.english_families import ENGLISH_LANG_SPECS
    from backend.its.solver.hindi_families import HINDI_LANG_SPECS
    assert set(ENGLISH_LANG_SPECS) == {
        "LANG_ENG_PASSIVE", "LANG_ENG_ACTIVE", "LANG_ENG_TENSE",
        "LANG_ENG_SPEECH", "LANG_ENG_POS", "LANG_ENG_TRANS"}
    assert set(HINDI_LANG_SPECS) == {
        "LANG_HI_SANDHI", "LANG_HI_SAMAS", "LANG_HI_KARAK",
        "LANG_HI_VACHAN", "LANG_HI_KAAL"}


def test_structure_specs_merges_lang_ids_in_original_order():
    from backend.its.solver.structure_families import STRUCTURE_SPECS
    lang_keys = [k for k in STRUCTURE_SPECS if k.startswith("LANG_")]
    assert lang_keys == [
        "LANG_ENG_PASSIVE", "LANG_ENG_ACTIVE", "LANG_ENG_TENSE",
        "LANG_ENG_SPEECH", "LANG_ENG_POS", "LANG_ENG_TRANS",
        "LANG_HI_SANDHI", "LANG_HI_SAMAS", "LANG_HI_KARAK",
        "LANG_HI_VACHAN", "LANG_HI_KAAL"]


def test_lang_spec_computes_are_the_moved_objects():
    """I5/MOVE proof: the computes STRUCTURE_SPECS carries are the same
    function objects the subject files define (no copies)."""
    from backend.its.solver.english_families import ENGLISH_LANG_SPECS
    from backend.its.solver.hindi_families import HINDI_LANG_SPECS
    from backend.its.solver.structure_families import STRUCTURE_SPECS
    for sid, spec in ENGLISH_LANG_SPECS.items():
        assert STRUCTURE_SPECS[sid]["compute"] is spec["compute"]
    for sid, spec in HINDI_LANG_SPECS.items():
        assert STRUCTURE_SPECS[sid]["compute"] is spec["compute"]


def test_lang_module_deleted_not_aliased():
    """Step 6 completes in-batch: no deprecated alias module survives
    (sign-off condition b — zero aliases once test retargeting lands)."""
    import importlib.util
    assert importlib.util.find_spec(
        "backend.its.solver.structure_families_lang") is None, \
        "structure_families_lang.py must be deleted (specs moved to the " \
        "subject files; test imports retargeted in the same batch)"


def test_lang_key_order_preserved_in_structure_specs():
    from backend.its.solver.structure_families import STRUCTURE_SPECS
    assert [k for k in STRUCTURE_SPECS if k.startswith("LANG_")] == [
        "LANG_ENG_PASSIVE", "LANG_ENG_ACTIVE", "LANG_ENG_TENSE",
        "LANG_ENG_SPEECH", "LANG_ENG_POS", "LANG_ENG_TRANS",
        "LANG_HI_SANDHI", "LANG_HI_SAMAS", "LANG_HI_KARAK",
        "LANG_HI_VACHAN", "LANG_HI_KAAL"]


def test_lang_computes_answer_after_split():
    from backend.its.solver.english_families import ENGLISH_LANG_SPECS
    from backend.its.solver.hindi_families import HINDI_LANG_SPECS
    r = ENGLISH_LANG_SPECS["LANG_ENG_PASSIVE"]["compute"](
        {}, "Change into passive voice: The dog bites the man.")
    assert r is not None and r[2] == "The man is bitten by the dog."
    h = HINDI_LANG_SPECS["LANG_HI_SANDHI"]["compute"](
        {}, "संधि-विच्छेद कीजिए: विद्यालय")
    assert h is not None and "विद्या + आलय" in h[2]


def test_lang_verifier_keys_still_hit():
    """I3: verifier surface untouched — the LANG ids keep their
    registered second paths (test_lang_families pins the verdicts)."""
    from backend.its.solver.independent_verifier import VERIFIERS
    for sid in ("LANG_ENG_PASSIVE", "LANG_ENG_TENSE", "LANG_HI_SANDHI",
                "LANG_HI_KAAL"):
        assert sid in VERIFIERS, sid
