"""test_syllabus_batteries.py -- classes 9-12 STEM batteries.

Every family in syllabus_families.py has a representative board-style
question with a verified expected answer.  One failing row = one
family regression.  Run per class:

    pytest backend/its/tests/test_syllabus_batteries.py -k class9
"""

from __future__ import annotations

import io
import contextlib

import pytest


def _solve(text: str):
    from backend.its.solver.answer_pipeline import answer
    buf = io.StringIO()
    with contextlib.redirect_stderr(buf):
        return answer(text)


def _check(text: str, want: float, rel: float = 0.005):
    r = _solve(text)
    assert r.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS"), \
        f"{r.label} {r.refusal_reason} for: {text[:60]}"
    assert r.numeric == pytest.approx(want, rel=rel), \
        f"got {r.numeric} want {want}: {text[:60]}"


# --------------------------------------------------------------------------- #
# CLASS 9
# --------------------------------------------------------------------------- #

@pytest.mark.class9
def test_c9_distance_formula():
    _check("Find the distance between the points (3, 4) and (6, 8).", 5)


@pytest.mark.class9
def test_c9_midpoint():
    r = _solve("Find the midpoint of the segment joining the points "
               "(2, 3) and (6, 7).")
    assert r.label == "VERIFIED"
    assert "(4, 5)" in r.answer


@pytest.mark.class9
def test_c9_heron_area():
    _check("A triangle has sides 3 cm, 4 cm and 5 cm. Find the area "
           "of the triangle.", 6)


@pytest.mark.class9
def test_c9_mean_list():
    _check("Find the mean of 4, 6, 8, 10.", 7)


@pytest.mark.class9
def test_c9_cone_volume():
    _check("Find the volume of a cone of radius 3 cm and height 7 cm.",
           pytest.approx(65.97, abs=0.1))


@pytest.mark.class9
def test_c9_sphere_volume():
    _check("Find the volume of a sphere of radius 3 cm.",
           pytest.approx(113.14, abs=0.1))


@pytest.mark.class9
def test_c9_sphere_surface_area():
    _check("Find the surface area of a sphere of radius 7 cm.",
           pytest.approx(615.75, abs=0.5))


@pytest.mark.class9
def test_c9_cylinder_volume():
    _check("Find the volume of a cylinder of radius 7 cm and height "
           "10 cm.", pytest.approx(1539.38, abs=0.5))


# --------------------------------------------------------------------------- #
# CLASS 10
# --------------------------------------------------------------------------- #

@pytest.mark.class10
def test_c10_ap_nth_term():
    _check("Find the 10th term of the AP with first term 2 and common "
           "difference 3.", 29)


@pytest.mark.class10
def test_c10_ap_sum():
    _check("Find the sum of the first 15 terms of the AP with first "
           "term 8 and common difference 5.", 645)


@pytest.mark.class10
def test_c10_trig_evaluation():
    _check("Evaluate sin 30 + cos 60.", 1.0)


@pytest.mark.class10
def test_c10_trig_tan45():
    _check("Find the value of tan 45.", 1.0)


@pytest.mark.class10
def test_c10_sector_area():
    _check("Find the area of a sector of a circle of radius 7 cm with "
           "angle 90 degrees.", pytest.approx(38.5, abs=0.1))


@pytest.mark.class10
def test_c10_elevation_height():
    _check("The angle of elevation of the top of a tower from a point "
           "at a distance of 30 m from its foot is 60 degrees. Find the "
           "height of the tower.", pytest.approx(51.96, abs=0.1))


# --------------------------------------------------------------------------- #
# CLASS 11
# --------------------------------------------------------------------------- #

@pytest.mark.class11
def test_c11_combinations():
    _check("In how many ways can one choose 2 items from 5 items?", 10)


@pytest.mark.class11
def test_c11_permutations():
    _check("How many arrangements are there to arrange 3 items from 5 "
           "items?", 60)


@pytest.mark.class11
def test_c11_gp_infinite_sum():
    _check("Find the sum of the infinite GP whose first term is 9 and "
           "common ratio is 1/3.", pytest.approx(13.5))


# --------------------------------------------------------------------------- #
# CLASS 12
# --------------------------------------------------------------------------- #

@pytest.mark.class12
def test_c12_vector_magnitude_2d():
    _check("Find the magnitude of the vector 3 i + 4 j.", 5)


@pytest.mark.class12
def test_c12_dot_product():
    _check("Find the dot product of the vectors 2 i + 3 j and 4 i + "
           "5 j.", 23)


@pytest.mark.class12
def test_c12_determinant_2x2():
    _check("Find the determinant of the matrix [[3, 5], [2, 4]].", 2)


# --------------------------------------------------------------------------- #
# PHYSICS 9-12
# --------------------------------------------------------------------------- #

@pytest.mark.physics
def test_physics_ohm_current():
    _check("Find the current through a 5 ohm resistor when a potential "
           "difference of 10 volts is applied.", 2)


@pytest.mark.physics
def test_physics_ohm_resistance():
    _check("Find the resistance when 12 volts drives a current of 2 "
           "amperes.", 6)


@pytest.mark.physics
def test_physics_newton_second():
    _check("Find the force required to accelerate a 5 kg mass at 3 m "
           "per s^2.", 15)


@pytest.mark.physics
def test_physics_work():
    _check("Find the work done by a force of 10 N in moving a body "
           "through a distance of 5 m.", 50)


@pytest.mark.physics
def test_physics_potential_energy():
    _check("Find the potential energy of a 2 kg mass at a height of 5 "
           "m.", pytest.approx(98))


@pytest.mark.physics
def test_physics_kinetic_energy():
    _check("Find the kinetic energy of a 2 kg mass moving at 3 m/s.",
           9)


@pytest.mark.physics
def test_physics_density():
    _check("Find the density of an object of mass 600 g and volume 20 "
           "cm3.", 30)


@pytest.mark.physics
def test_physics_wave_speed():
    _check("Find the wave speed of a wave with frequency 50 Hz and "
           "wavelength 2 m.", 100)


@pytest.mark.physics
def test_physics_heat():
    _check("Find the heat required to raise the temperature of 2 kg by "
           "5 K given specific heat 400.", 4000)


@pytest.mark.physics
def test_physics_power():
    _check("Find the power consumed by a device drawing a current of 2 "
           "amperes at 110 volts.", 220)


# --------------------------------------------------------------------------- #
# CHEMISTRY
# --------------------------------------------------------------------------- #

@pytest.mark.chemistry
def test_chem_moles_from_mass():
    _check("Find the number of moles in 90 g of a compound of molar "
           "mass 18.", 5)


@pytest.mark.chemistry
def test_chem_molarity():
    _check("Find the molarity of 0.5 moles of solute dissolved in 250 "
           "ml of solution.", 2)
