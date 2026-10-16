"""test_unit_registry.py -- batteries for the unit registry and its
parse-time normalization hook in physics3/chemistry3 families.

Covers: conversions and incompatible-dimension refusals, synonym
resolution with single-letter ambiguity rules, dimension scanning for
the dispatcher prefilter, the photon nm -> m case through the real
pipeline, cm -> m and minutes -> seconds wiring, and proof that
families without a unit schema behave exactly as before.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_unit_registry.py -q
"""

from __future__ import annotations

import math

import pytest

from backend.its.solver import unit_registry as ur
from backend.its.solver.chemistry_families import get_units as chem_units
from backend.its.solver.chemistry_families import model_chemistry3
from backend.its.solver.physics_families import get_units as phys_units
from backend.its.solver.physics_families import model_physics3

_DEG_PER_RAD = 180.0 / math.pi


# =========================================================================== #
# Registry: conversions
# =========================================================================== #

def test_convert_length():
    assert ur.convert(400, "nm", "m") == pytest.approx(4e-7)
    assert ur.convert(25, "cm", "m") == pytest.approx(0.25)
    assert ur.convert(2.5, "km", "m") == pytest.approx(2500.0)
    assert ur.convert(36, "km", "cm") == pytest.approx(3.6e6)
    assert ur.convert(5, "m", "m") == 5.0


def test_convert_time():
    assert ur.convert(30, "minutes", "s") == pytest.approx(1800.0)
    assert ur.convert(2, "hours", "minutes") == pytest.approx(120.0)
    assert ur.convert(90, "min", "h") == pytest.approx(1.5)
    assert ur.convert(3, "days", "hours") == pytest.approx(72.0)


def test_convert_mass_and_volume():
    assert ur.convert(1, "kg", "g") == pytest.approx(1000.0)
    assert ur.convert(500, "g", "kg") == pytest.approx(0.5)
    assert ur.convert(560, "mL", "L") == pytest.approx(0.56)
    assert ur.convert(2, "litres", "millilitres") == pytest.approx(2000.0)


def test_convert_speed():
    assert ur.convert(36, "km/h", "m/s") == pytest.approx(10.0)
    assert ur.convert(10, "m/s", "km/h") == pytest.approx(36.0)
    assert ur.convert(5, "cm/s", "m/s") == pytest.approx(0.05)
    assert ur.convert(72, "kmph", "m/s") == pytest.approx(20.0)


def test_convert_energy_frequency():
    assert ur.convert(2, "eV", "J") == pytest.approx(3.2e-19)
    assert ur.convert(1, "kJ", "J") == pytest.approx(1000.0)
    assert ur.convert(500.0, "kHz", "Hz") == pytest.approx(5e5)
    assert ur.convert(3.1078, "eV", "eV") == pytest.approx(3.1078)


def test_convert_angle_and_temperature():
    assert ur.convert(90, "degrees", "radians") == pytest.approx(math.pi / 2)
    assert ur.convert(1.0, "radians", "degrees") == pytest.approx(_DEG_PER_RAD)
    assert ur.convert(0, "celsius", "kelvin") == pytest.approx(273.15)
    assert ur.convert(273.15, "k", "c") == pytest.approx(0.0)
    assert ur.convert(100, "celsius", "celsius") == 100.0


def test_convert_incompatible_or_unknown_is_none():
    assert ur.convert(5, "km", "minutes") is None      # length vs time
    assert ur.convert(5, "kg", "m/s") is None          # mass vs speed
    assert ur.convert(5, "km", "wibble") is None       # unknown target
    assert ur.convert(5, "wibble", "km") is None       # unknown source
    assert ur.convert(2, "eV", "nm") is None           # energy vs length


# =========================================================================== #
# Registry: synonyms, dimensions, prefilter
# =========================================================================== #

def test_resolve_synonyms_and_ambiguity():
    assert ur.resolve("Minutes", "time") == ("time_s", 60.0)
    assert ur.resolve("KM/H", "speed") == ("speed_ms", 1000.0 / 3600.0)
    assert ur.resolve("nanometres", "length") == ("length_m", 1e-9)
    # single-letter ambiguity: preference decides, case is the fallback
    assert ur.resolve("m", "length") == ("length_m", 1.0)
    assert ur.resolve("M", "concentration") == ("concentration_molL", 1.0)
    assert ur.resolve("T", "magnetic") == ("tesla", 1.0)
    assert ur.resolve("t", "mass") == ("mass_kg", 1000.0)
    assert ur.resolve("nonsense") is None


def test_resolve_wrong_dimension_is_none():
    # a length slot is never converted by a mass or time word
    assert ur.resolve("kg", "length") is None
    assert ur.resolve("minutes", "length") is None


def test_dimensions_of():
    dims = ur.dimensions_of("A car covers 36 km in 30 minutes.")
    assert "length" in dims and "time" in dims
    assert ur.dimensions_of("Light of wavelength 400 nm ... photon in eV") \
        >= {"length", "energy"}
    assert "concentration" in ur.dimensions_of("hydrogen ion concentration "
                                               "is 0.001 M")
    # prose without unit words reports no dimensions
    assert ur.dimensions_of("Find the pH of a solution with pH 3.") == set()


def test_has_dimensions_prefilter():
    assert ur.has_dimensions({"length"}, ("length",)) is True
    assert ur.has_dimensions({"mass"}, ("length",)) is False
    assert ur.has_dimensions(set(), ("length",)) is False
    assert ur.has_dimensions({"mass"}, None) is True       # no requirement
    text_dims = ur.dimensions_of("frequency 50 Hz and wavelength 3 m")
    assert ur.has_dimensions(text_dims, ("frequency", "length")) is True
    assert ur.has_dimensions("frequency 50 Hz only", ("frequency",
                                                      "length")) is False


def test_normalize_slots_converts_and_marks():
    import re
    m = re.search(r"(?P<x>\d+)\s*(?P<unit>cm|m)\b", "25 cm")
    out = ur.normalize_slots({"x": "25", "unit": "cm"}, m, "25 cm",
                             {"x": "length_m"})
    assert out["x"] == "0.25"
    assert "_conv_x" in out
    # unknown unit word after the number: value left untouched
    m2 = re.search(r"(?P<x>\d+)", "5 wobbles")
    out2 = ur.normalize_slots({"x": "5"}, m2, "5 wobbles",
                              {"x": "length_m"})
    assert out2["x"] == "5" and "_conv_x" not in out2


# =========================================================================== #
# Pipeline: physics3 normalization through model_physics3
# =========================================================================== #

def test_photon_energy_nm_pipeline_unchanged():
    # the canonical regression: 400 nm must stay 3.1078 eV, never 3.1e-9
    r = model_physics3("Light of wavelength 400 nm falls on a metal. Find "
                       "the energy of a photon in eV.")
    assert r.matched and r.structure == "PHOTON_ENERGY"
    assert r.numeric_answer == pytest.approx(6.63e-34 * 3.0e8 / 400e-9
                                             / 1.6e-19)


def test_photon_energy_nanometre_word_pipeline():
    r = model_physics3("Wavelength of the incident light is 620 nanometres. "
                       "Find the energy of a photon in eV.")
    assert r.matched and r.structure == "PHOTON_ENERGY"
    assert r.numeric_answer == pytest.approx(6.63e-34 * 3.0e8 / 620e-9
                                             / 1.6e-19)


def test_snells_law_radians_converted_to_degrees():
    # before unit wiring the 0.5 was read as degrees (silently wrong);
    # the schema now converts radians -> degrees before compute
    want = math.degrees(math.asin(1.0 * math.sin(0.5) / 1.5))
    r = model_physics3("Light goes from air (n=1) to glass (n=1.5) with "
                       "angle of incidence 0.5 radians.")
    assert r.matched and r.structure == "SNELLS_LAW"
    assert r.numeric_answer == pytest.approx(want)


def test_snells_law_degrees_unchanged():
    want = math.degrees(math.asin(1.0 * math.sin(math.radians(30.0)) / 1.5))
    r = model_physics3("Light goes from air (n=1) to glass (n=1.5) with "
                       "angle of incidence 30 degrees.")
    assert r.matched and r.numeric_answer == pytest.approx(want)


def test_power_lens_cm_and_metres():
    r = model_physics3("Find the power of a lens with focal length 40 cm.")
    assert r.matched and r.numeric_answer == pytest.approx(1.0 / 0.4)
    r = model_physics3("Find the power of a lens with focal length 0.5 m.")
    assert r.matched and r.numeric_answer == pytest.approx(2.0)


def test_radioactive_decay_mixed_time_units_now_converted():
    # half-life in hours, elapsed in minutes: refused before the unit
    # wiring (units had to match); now converted to seconds and solved
    want = 80.0 * 0.5 ** (0.5 / 2.0)
    r = model_physics3("Find the remaining mass of a radioactive substance "
                       "with initial mass 80 g and half-life 2 hours after "
                       "30 minutes.")
    assert r.matched and r.structure == "RADIOACTIVE_DECAY"
    assert r.numeric_answer == pytest.approx(want)


def test_radioactive_decay_same_units_unchanged():
    r = model_physics3("Find the remaining mass of a radioactive substance "
                       "with initial mass 100 g and half-life 5 years after "
                       "15 years.")
    assert r.matched
    assert r.numeric_answer == pytest.approx(100.0 * 0.5 ** 3.0)


def test_force_on_conductor_cm_pipeline():
    r = model_physics3("Find the force on a wire of length 20 cm carrying "
                       "5 A current perpendicular to a magnetic field of "
                       "0.5 T.")
    assert r.matched and r.numeric_answer == pytest.approx(0.5 * 5 * 0.2)


# =========================================================================== #
# Pipeline: chemistry3 normalization through model_chemistry3
# =========================================================================== #

def test_moles_at_stp_ml_abbreviation():
    r = model_chemistry3("Find the number of moles in 560 mL of a gas at "
                         "STP.")
    assert r.matched and r.structure == "MOLES_AT_STP"
    assert r.numeric_answer == pytest.approx(0.025)


def test_electrolysis_minutes_to_seconds():
    r = model_chemistry3("Find the mass deposited when 3 A current flows "
                         "through AgNO3 solution for 10 minutes.")
    assert r.matched and r.structure == "ELECTROLYSIS_MASS"
    assert r.numeric_answer == pytest.approx(0.001118 * 3.0 * 600.0)


def test_mixing_ml_concentrations():
    r = model_chemistry3("Find the concentration when 100 ml of 2 M "
                         "solution is mixed with 300 ml of 1 M solution.")
    assert r.matched and r.structure == "CONCENTRATION_AFTER_MIXING"
    assert r.numeric_answer == pytest.approx((2 * 0.1 + 1 * 0.3) / 0.4)


# =========================================================================== #
# Families without schemas are unchanged
# =========================================================================== #

def test_schemaless_ph_poh_unchanged():
    r = model_chemistry3("Find the pOH of a solution with pH 3.")
    assert r.matched and r.structure == "PH_POH"
    assert r.numeric_answer == pytest.approx(11.0)
    assert chem_units("PH_POH") is None


def test_schemaless_oxidation_number_unchanged():
    r = model_chemistry3("Find the oxidation number of S in H2SO4.")
    assert r.matched and r.structure == "OXIDATION_NUMBER"
    assert r.numeric_answer == pytest.approx(6.0)
    assert chem_units("OXIDATION_NUMBER") is None


def test_schemaless_wheatstone_matches_without_unit_words():
    # WHEATSTONE declares no _need: ohms are optional in its trigger
    r = model_physics3("Find the unknown resistance X in a balanced "
                       "Wheatstone bridge with P=10, Q=15, R=5.")
    assert r.matched and r.structure == "WHEATSTONE_BALANCED"
    assert r.numeric_answer == pytest.approx(15.0 * 5.0 / 10.0)


def test_garbage_still_refused():
    assert not model_physics3("What is the capital of France?").matched
    assert not model_chemistry3("Tell me a joke about integers.").matched


# =========================================================================== #
# Schema surface: UNITS dicts and get_units
# =========================================================================== #

def test_get_units_schemas():
    assert phys_units("PHOTON_ENERGY")["lam"] == "length_m"
    assert phys_units("PHOTON_ENERGY")["_out"] == "energy_ev"
    assert phys_units("RADIOACTIVE_DECAY")["half"] == "time_s"
    assert phys_units("POWER_LENS")["_need"] == ("length",)
    assert phys_units("NO_SUCH_FAMILY") is None
    assert chem_units("MOLES_AT_STP")["v"] == "volume_l"
    assert chem_units("ELECTROLYSIS_MASS")["t"] == "time_s"
    assert chem_units("DILUTION_M1V1") is None  # intentionally unwired


def test_every_schema_slot_is_a_known_canonical_unit():
    for get_u in (phys_units, chem_units):
        for fid in ("PHOTON_ENERGY", "SNELLS_LAW", "MOLES_AT_STP",
                    "ELECTROLYSIS_MASS", "STOICHIOMETRY_MASS_MASS",
                    "CONCENTRATION_AFTER_MIXING"):
            schema = get_u(fid)
            if not schema:
                continue
            for key, unit in schema.items():
                if key.startswith("_"):
                    continue
                assert unit in ur.CANONICAL, (fid, key, unit)
                dim = ur.canonical_dimension(unit)
                assert dim is not None
                # _need dimensions must all be real dimension labels
                for need in schema.get("_need", ()):
                    assert need in {ur.canonical_dimension(c)
                                    for c in ur.CANONICAL}
