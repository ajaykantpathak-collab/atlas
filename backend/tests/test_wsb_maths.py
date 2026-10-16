"""test_wsb_maths.py -- WS-B merge step 1 acceptance tests (map §5.1/§11).

Pins the maths_families.py consolidation:
  - registry region order (map §3) reproduced exactly;
  - per-block first-match resolution through the single model_maths
    dispatcher (one pinned stem per source block);
  - verifier lazy-import surface intact (independent_verifier's 6 names);
  - the §4a duplicate rules: extra2's INVERSE_PROPORTION row dropped with
    its positive stems still answered (PAL_PROGRAM, same numbers);
  - survivor modules (extra/extra2/syllabus) shrunk and functional;
  - source modules really gone (zero-alias final state).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

import pytest

from backend.its.solver import maths_families as mf
from backend.its.solver.maths_families import model_maths

SOLVER_DIR = os.path.join(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))), "its", "solver")

MATHS_REGION = [
    "model_simultaneous_depletion", "model_meet_and_shuttle",
    "model_tripartite_kinematics",
    "model_arithmetic_eval", "model_number_theory", "model_roman_numerals",
    "model_unitary_method", "model_ratio_divide", "model_number_riddle",
    "model_square_mensuration",
    "model_word_arithmetic", "model_fraction_percent_of", "model_angle_sum",
    "model_circle_mensuration", "model_exponent_eval",
    "model_riddle_multiplier", "model_percent_change",
    "model_fraction_arithmetic", "model_triangle_parallelogram_area",
    "model_eval_expr_with_givens",
    "model_roots_powers", "model_proportion", "model_interest",
    "model_mensuration_3d", "model_place_value_number",
    "model_consecutive_integers",
    "model_maths", "model_circle_locus", "model_formula_plugin",
]


def _structures_names():
    from backend.its.solver import modeling_layer as ml
    return [fn.__name__ for fn in ml._STRUCTURES]


def test_registry_maths_region_order():
    """The 29 maths entries sit contiguously in the map §3 order.
    Absolute position is import-order dependent (model_structure
    self-registers wherever structure_families is first imported); the
    invariant is that the maths region stays contiguous, not that it
    starts at a fixed index."""
    names = _structures_names()
    i = names.index(MATHS_REGION[0])
    assert names[i: i + len(MATHS_REGION)] == MATHS_REGION


def test_model_maths_refusal_identity():
    r = model_maths("What is the capital of France?")
    assert not r.matched
    assert r.structure == "MATHS"
    assert r.confidence == 0.0


@pytest.mark.parametrize("text,structure", [
    # M2 (block 7)
    ("Find the median of 4, 7, 2, 9, 5.", "MEDIAN"),
    # M3 (block 8)
    ("Find the sum of interior angles of a polygon with 8 sides.",
     "POLYGON_ANGLE_SUM"),
    # APPLIED (block 9)
    ("Solve log x = 3.", "LOG_SOLVE"),
    # M4 (block 10)
    ("Find the quotient and remainder when 225 is divided by 135 using "
     "Euclid lemma.", "EUCLIDS_DIVISION_LEMMA"),
    # JEE (block 11)
    ("Evaluate the limit as x approaches 0 of (1 - cos(4x)) / x^2.",
     "JEE_LHOPITAL_TRIG_ZERO"),
    # STATS (block 30 order, inside model_maths)
    ("Calculate the mean of the following data 2, 4, 6, 8",
     "STATS_MEAN_UNGROUPED"),
    # SYLLABUS maths rows (block 15 order, inside model_maths)
    ("A triangle has sides 3 cm, 4 cm and 5 cm. Find the area of the "
     "triangle.", "heron_area"),
    # EXTRA maths fns (block 20 order)
    ("Solve: 3(x - 1) <= 2(x - 3)", "LINEAR_INEQUALITY"),
    # EXTRA2 maths fns (block 22 order)
    ("How many three-digit numbers are divisible by 7?",
     "THREE_DIGIT_MULTIPLES"),
])
def test_model_maths_per_block_first_match(text, structure):
    r = model_maths(text)
    assert r.matched, f"refused: {r.note} -- {text[:70]}"
    assert r.structure == structure, \
        f"{r.structure} != {structure}: {text[:70]}"


def test_jee_block_numeric_pin():
    r = model_maths(
        "Evaluate the limit as x approaches 0 of (1 - cos(4x)) / x^2.")
    assert r.numeric_answer == pytest.approx(8.0, rel=1e-2, abs=1e-2)


def test_verifier_helper_surface_intact():
    """independent_verifier lazy-imports these six names (VERIFIER LAW
    surface); _normalize must be the maths2 implementation."""
    for name in ("_normalize", "_poly_expr", "_divisor_root", "_c_pairs",
                 "_parse_line_abc", "_rd_harvest"):
        assert hasattr(mf, name), name
    assert mf._normalize is mf._normalize_m2


def test_table_block_layout():
    """Flat TABLE == M2+M3+AP+M4+JEE+ST+SYL in §5.1 order, byte-faithful
    per block (ids + patterns)."""
    assert len(mf.TABLE_m2) == 168
    assert len(mf.MATHS3_TABLE) == 75
    assert len(mf.APPLIED_TABLE) == 40
    assert len(mf.MATHS4_TABLE) == 45
    assert len(mf.JEE_TABLE) == 30
    assert len(mf.TABLE_st) == 11
    assert len(mf.SYLLABUS_MATHS_ROWS) == 26
    flat = [r[0] for r in mf.TABLE]
    assert flat == ([r[0] for r in mf.TABLE_m2]
                    + [r[0] for r in mf.MATHS3_TABLE]
                    + [r[0] for r in mf.APPLIED_TABLE]
                    + [r[0] for r in mf.MATHS4_TABLE]
                    + [r[0] for r in mf.JEE_TABLE]
                    + [r[0] for r in mf.TABLE_st]
                    + [r[0] for r in mf.SYLLABUS_MATHS_ROWS])
    # §4a: INVERSE_PROPORTION survives via the M2 row, not the extra2 fn
    assert "INVERSE_PROPORTION" in flat


def test_extra2_inverse_proportion_dropped_but_covered():
    """§4a: extra2's narrow row is deleted.  Its two positive stems must
    still be answered end-to-end (PAL_PROGRAM lane) with the same
    numbers the deleted family produced."""
    # extra_families2 is deleted (WS-B m3 step 7); model_inverse_proportion
    # was dropped from it before deletion — assert via maths_families.
    from backend.its.solver import maths_families as ex2
    assert not hasattr(ex2, "model_inverse_proportion")
    from backend.its.solver.modeling_layer import model_problem
    r1 = model_problem(
        "Two persons could fit new windows in a house in 3 days. "
        "(i) One of the persons fell ill before the work started. "
        "How long would the job take now? (ii) How many persons "
        "would be needed to fit the windows in one day?")
    assert r1.matched and r1.structure == "PAL_PROGRAM"
    assert 6.0 in (r1.numeric_answer if isinstance(r1.numeric_answer, tuple)
                   else (r1.numeric_answer,)) or \
        "6" in str(r1.final_answer)
    r2 = model_problem(
        "Six persons could dig a pond in 12 days. One of the "
        "persons fell ill before the work started. How long would "
        "the job take now? How many persons would be needed to dig "
        "the pond in one day?")
    assert r2.matched
    assert "14.4" in str(r2.final_answer) and "72" in str(r2.final_answer)


def test_survivor_rows_live_in_subject_modules():
    """WS-B m3 steps 7-8: extra/extra2/syllabus are gone; their survivors
    ride the subject dispatchers."""
    from backend.its.solver import physics_families as pf
    from backend.its.solver import chemistry_families as cf
    from backend.its.solver import commerce_families as com
    from backend.its.solver import accountancy_families as acc
    for name in ("model_resistor_network", "model_gas_wall_impulse",
                 "model_barometer_column", "model_kinematics_stop",
                 "model_potential_zero_point", "model_lens_power_real",
                 "model_coil_magnetic_moment", "model_projectile_ceiling",
                 "model_bernoulli_lift", "model_rotating_cylinder",
                 "model_kelvin_convert"):
        assert callable(getattr(pf, name, None)), name
    assert callable(getattr(cf, "model_carbon_dating", None))
    assert callable(getattr(com, "model_perpetuity", None))
    assert callable(getattr(acc, "model_linear_depreciation", None))
    assert callable(getattr(acc, "model_geometric_depreciation", None))
    # the 12 syllabus physics rows ride the physics dispatcher
    syl_phys_ids = [
        "ohm_current", "ohm_resistance", "newton_second",
        "work_force_distance", "potential_energy", "kinetic_energy",
        "density", "wave_speed", "heat_energy", "electrical_power"]
    assert [r[0] for r in pf.SYLLABUS_PHYSICS_TABLE] == syl_phys_ids
    assert [r[0] for r in cf.SYLLABUS_CHEMISTRY_TABLE] == [
        "moles_from_mass", "molarity", "reaction_rate_avg",
        "nernst_equilibrium"]
    r = pf.model_physics_families(
        "Calculate the current through a 4 ohm resistor "
        "when a potential difference of 12 volts is applied")
    assert r.matched and r.structure == "ohm_current"


def test_source_modules_deleted():
    """Final state per owner mandate: zero alias modules for the merged
    maths sources."""
    for name in ("class6_families.py", "class7_families.py",
                 "class7_families2.py", "class8_families.py",
                 "modeling_structures.py", "maths2_families.py",
                 "maths3_families.py", "maths4_families.py",
                 "applied_maths_families.py", "jee_families.py",
                 "isc_stats_families.py", "circle_locus_families.py",
                 "formula_plugin_families.py"):
        assert not os.path.exists(os.path.join(SOLVER_DIR, name)), name


def test_sandbox_string_map_maths():
    # load the router module directly: the routers package __init__ drags
    # in DB config this native suite must not require
    import importlib.util
    spec = importlib.util.spec_from_file_location(
        "wsb_sandbox_probe",
        os.path.join(os.path.dirname(os.path.dirname(
            os.path.abspath(__file__))), "routers", "sandbox.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    sm = mod._SUBJECT_MODELS
    assert sm["maths"] == (
        "backend.its.solver.maths_families", "model_maths")
    # alias key kept working per map §10.6
    assert sm["applied_maths"] == (
        "backend.its.solver.maths_families", "model_maths")


def test_compq_bank_subject_family_maths():
    from services.compq_bank import SUBJECT_FAMILY
    assert SUBJECT_FAMILY["math"] == "maths_families"
    assert SUBJECT_FAMILY["stats"] == "maths_families"
    assert SUBJECT_FAMILY["hs"] == "maths_families"
