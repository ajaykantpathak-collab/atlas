"""test_wsb_m3.py — WS-B steps 2/3/7/8 invariants (ovhB-m3).

Pins the consolidation-map invariants for the batch that:
  - steps 2/3: physics2/physics3/chemistry2/chemistry3 alias stubs deleted
    (their TABLES + dispatchers live in physics_families/chemistry_families),
  - step 7: extra_families.py + extra_families2.py dissolved — physics rows
    to physics_families, CARBON_DATING to chemistry_families, PERPETUITY to
    commerce_families, LINEAR/GEOMETRIC_DEPRECIATION to accountancy_families,
    syllabus_families.py dissolved (rows ride SYLLABUS_*_TABLE blocks),
  - step 8 (M2): structure_families_waves.py + structure_families_dig2.py
    folded inline; 18 physics + 9 chemistry spec entries moved to
    PHYSICS_SPECS/CHEMISTRY_SPECS and re-merged by structure_families;
    H3 centroids path env-resolution fix.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# ONLY the deploy root on sys.path (two-module-identity trap).

import pytest

SOLVER_DIR = os.path.join(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))), "its", "solver")

DEAD_MODULES = (
    "physics2_families", "physics3_families",
    "chemistry2_families", "chemistry3_families",
    "extra_families", "extra_families2",
    "structure_families_waves", "structure_families_dig2",
    "syllabus_families",
)


# --------------------------------------------------------------- deletion
def test_dead_modules_not_importable():
    import importlib.util
    for name in DEAD_MODULES:
        assert importlib.util.find_spec(
            f"backend.its.solver.{name}") is None, \
            f"{name}.py must be deleted (merge = MOVE)"


def test_dead_files_absent_on_disk():
    for name in DEAD_MODULES:
        assert not os.path.exists(
            os.path.join(SOLVER_DIR, name + ".py")), name


def test_structures_have_no_dead_dispatchers():
    from backend.its.solver import modeling_layer as ml
    names = [getattr(f, "__name__", "") for f in ml._STRUCTURES]
    for dead in ("model_extra", "model_extra2", "model_syllabus",
                 "model_physics2", "model_physics3",
                 "model_chemistry2", "model_chemistry3"):
        assert dead not in names, dead
    assert "model_physics_families" in names
    assert "model_chemistry_families" in names


# --------------------------------------------------------------- steps 2/3
def test_physics_tables_exposed():
    # Map §5.2 counts (21/18) include the dispatcher fn; the real
    # TABLE row counts in the originals were 20/17 — preserved verbatim.
    from backend.its.solver import physics_families as PF
    assert len(PF.TABLE_P2) == 20
    assert len(PF.TABLE_P3) == 17
    assert len(PF.SYLLABUS_PHYSICS_TABLE) == 10


def test_chemistry_tables_exposed():
    # Map §5.3 counts (16/16) include the dispatcher fn; originals had
    # 15/15 rows — preserved verbatim.
    from backend.its.solver import chemistry_families as CF
    assert len(CF.TABLE_C2) == 15
    assert len(CF.TABLE_C3) == 15
    assert len(CF.SYLLABUS_CHEMISTRY_TABLE) == 4


def test_physics_no_duplicate_table_ids():
    from backend.its.solver import physics_families as PF
    for tbl in (PF.TABLE_P2, PF.TABLE_P3, PF.SYLLABUS_PHYSICS_TABLE,
                PF.TABLE):
        ids = [r[0] for r in tbl]
        assert len(ids) == len(set(ids)), \
            "duplicate ids inside a physics table"


def test_physics_dispatchers_solve():
    from backend.its.solver import physics_families as PF
    r = PF.model_physics_families(
        "Two resistors of 6 ohm and 3 ohm are connected in parallel "
        "across a 12 V battery. Find the total current drawn.")
    assert r.matched and r.structure == "RESISTOR_NETWORK"
    r = PF.model_physics_families(
        "Calculate the current through a 4 ohm resistor "
        "when a potential difference of 12 volts is applied")
    assert r.matched and r.structure == "ohm_current"


# --------------------------------------------------------------- step 7
def test_extra_survivors_in_subject_files():
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


def test_extra_survivors_solve():
    from backend.its.solver.commerce_families import model_perpetuity
    r = model_perpetuity(
        "Rs 50,000 cash is equivalent to a perpetuity of Rs 4,000 "
        "payable at the end of each year. Find the rate.")
    assert r.matched and r.structure == "PERPETUITY"
    from backend.its.solver.accountancy_families import \
        model_geometric_depreciation
    r = model_geometric_depreciation(
        "A machine costs Rs 40,000. Its value depreciates each year by "
        "10% per annum. Find its value at the end of 2 years.")
    assert r.matched and r.structure == "GEOMETRIC_DEPRECIATION"


# --------------------------------------------------------------- step 8
def test_subject_spec_dicts_exposed_and_merged():
    from backend.its.solver import physics_families as PF
    from backend.its.solver import chemistry_families as CF
    from backend.its.solver import structure_families as SF
    assert len(PF.PHYSICS_SPECS) == 18
    assert len(CF.CHEMISTRY_SPECS) == 9
    # merged into the shared registry — same spec objects (MOVE not copy)
    for sid in PF.PHYSICS_SPECS:
        assert SF.STRUCTURE_SPECS[sid] is PF.PHYSICS_SPECS[sid]
    for sid in CF.CHEMISTRY_SPECS:
        assert SF.STRUCTURE_SPECS[sid] is CF.CHEMISTRY_SPECS[sid]


def test_structure_specs_count_stable():
    from backend.its.solver.structure_families import STRUCTURE_SPECS
    assert len(STRUCTURE_SPECS) == 312


def test_folded_spec_ids_present():
    from backend.its.solver.structure_families import STRUCTURE_SPECS
    for sid in ("HCF_LCM", "BAYES", "SECOND_DERIV",      # waves
                "TRIG_RATIO_GIVEN", "DICE_EVENT_PROB",  # dig2
                "FORCE_COMPONENT", "LADDER",            # phys specs
                "NEET_PH_CALCULATION", "MOLARITY"):     # chem specs
        assert sid in STRUCTURE_SPECS, sid


def test_centroids_path_env_resolution(tmp_path):
    """H3 (post-ship review): cache path resolves via
    paths.data_file — honours CBSE_DATA_DIR, never a Windows literal."""
    import inspect
    from backend.its.solver import structure_families as sf
    src = inspect.getsource(sf._centroids)
    assert 'paths' in src and 'data_file' in src
    assert 'cache_path = r"D:' not in src

    import os
    os.environ["CBSE_DATA_DIR"] = str(tmp_path)
    try:
        from backend.its.solver import paths
        paths._DATA_DIR_CACHE.clear()
        resolved = paths.data_file("structure_centroids.pkl")
        assert resolved.startswith(str(tmp_path))
    finally:
        del os.environ["CBSE_DATA_DIR"]
        paths._DATA_DIR_CACHE.clear()

    # unset + container-shaped host (no legacy Windows literal):
    # resolved path must not carry the D:\ literal at all
    monkey = tmp_path / "nowhere"
    orig = paths._LEGACY_RUNTIME_LITERAL
    try:
        paths._LEGACY_RUNTIME_LITERAL = str(monkey)  # absent -> pkg path
        paths._DATA_DIR_CACHE.clear()
        resolved = paths.data_file("structure_centroids.pkl")
        # must resolve to the package-relative cbse_data dir (the
        # /app/cbse_data equivalent in-container), never the literal
        assert "runtime_data" not in resolved.replace("/", "\\")
        assert resolved.replace("/", "\\").endswith(
            "cbse_data\\structure_centroids.pkl")
    finally:
        paths._LEGACY_RUNTIME_LITERAL = orig
        paths._DATA_DIR_CACHE.clear()


def test_no_duplicate_ids_across_subject_files():
    from backend.its.solver import physics_families as PF
    from backend.its.solver import chemistry_families as CF
    phys_ids = {r[0] for t in (PF.TABLE, PF.TABLE_P2, PF.TABLE_P3,
                               PF.SYLLABUS_PHYSICS_TABLE)
                for r in t} | set(PF.PHYSICS_SPECS)
    chem_ids = {r[0] for t in (CF.TABLE, CF.TABLE_C2, CF.TABLE_C3,
                               CF.SYLLABUS_CHEMISTRY_TABLE)
                for r in t} | set(CF.CHEMISTRY_SPECS)
    assert phys_ids.isdisjoint(chem_ids - {"KELVIN_CELSIUS"}), \
        phys_ids & chem_ids
