"""test_class9_physics_families.py -- SOLVER-DIG class-9 physics regressions.

Owner method: REAL diagnostic questions pulled from the c9_physics corpus
(64 files, 61 numeric diagnostics) via the tests/physics_corpus_sweep.py
parser, examiner-graded.  Pre-fix battery: 15 SOLVE / 45 REFUSE / 1 WRONG.
Fixes pinned here:

  C9_* wave (16 families) in physics_families.py -- work (zero/angle/
    net-friction/work-energy theorem), drop KE, spring, power->J+kWh,
    v=f lambda, pulse-echo v t/2, W=VQ, series bank, distance vs
    displacement, average velocity, momentum (collision + recoil),
    centripetal, vernier least count.
  P11 routing fixes in answer_pipeline.py -- unit-aware data-coverage
    guard, physics distractor exemption, chain-degraded registry rescue.
  Circular-import registry repair (modeling_layer._repair_registry +
    physics_families self-registration): importing physics_families
    before modeling_layer used to drop model_physics_families from the
    registry sweep entirely (import-order-dependent physics coverage).
  META-JUDGEMENT guard: 'is the student correct?' questions refuse
    instead of answering the embedded computation (800 m braking ship).
  OHMS_LAW_ANY multi-resistor gate + _c_work friction gate + SDT
    sci-notation expansion + kinematics PAL sign gate.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# deploy root ONLY (backend/ on sys.path forks the its.solver identity)
os.environ.setdefault("SOLVER_LLM_MODE", "off")

# The pipeline-level pins must run with the LLM-written program caches
# cold: the PAL shape store and the extractor disk cache both persist
# past LLM extractions and would shadow the deterministic families.
import backend.its.solver.pal_templates as _pt
_pt._load = lambda: {}
_pt._save = lambda: None
import backend.its.solver.structure_extractor as _se
_se._disk_load = lambda: {}
_se._disk_save = lambda k, v: None

import pytest

from backend.its.solver.physics_families import model_physics_families


def _ans(q):
    r = model_physics_families(q)
    assert r is not None and r.matched, f"refused: {q[:70]}"
    return r


# ------------------------------------------------- ch4: work (zero-work asks)
@pytest.mark.parametrize("q", [
    ("A student holds a 20 N school bag stationary at a height of 1.5 m "
     "above the ground for 30 seconds. How much work is done by the "
     "student on the bag during this time?"),
    ("A coolie carries a 50 kg load on his head and walks horizontally "
     "at constant speed for 100 m. What is the work done by the coolie's "
     "upward force on the load?"),
])
def test_zero_work(q):
    r = _ans(q)
    assert "0 J" in str(r.final_answer), r.final_answer


def test_work_angle_cos():
    # 10 N at 60 deg over 5 m -> 25 J (cos 60 = 0.5)
    r = _ans("A block of mass 2 kg slides on a frictionless horizontal "
             "table. A constant force of 10 N acts at 60 degrees to the "
             "horizontal and the block moves 5 m. Calculate the work "
             "done by the force.")
    assert "25" in str(r.final_answer), r.final_answer


def test_net_work_friction_not_applied_force():
    # CRITICAL gate: W = F_applied * d shipped 50 J where the NET work
    # is 30 J (10 N forward - 4 N friction, 5 m)
    r = _ans("A 2 kg block slides on a rough horizontal floor. An "
             "applied force of 10 N acts forward, and kinetic friction "
             "of 4 N acts backward. The block moves 5 m. Calculate the "
             "net work done on the block.")
    assert "30" in str(r.final_answer), r.final_answer
    assert "50 J" not in str(r.final_answer), r.final_answer


# ------------------------------------------------- ch4: work-energy theorem
def test_work_energy_theorem_delta_ke():
    r = _ans("A 2 kg object accelerates from 4 m/s to 8 m/s. Calculate "
             "the net work done on it.")
    assert "48" in str(r.final_answer), r.final_answer


def test_work_energy_theorem_final_speed():
    r = _ans("A net force of 10 N acts on a 2 kg object over a distance "
             "of 5 m. The object starts from rest. Find the final "
             "velocity using the Work-Energy Theorem.")
    assert "7.07" in str(r.final_answer), r.final_answer


# ------------------------------------------------- ch4: energy conversions
def test_drop_ke_and_speed():
    r = _ans("A 2 kg stone is dropped from a 20 m high building. "
             "Calculate its kinetic energy and speed just before it "
             "hits the ground. Take g = 10 m/s^2.")
    ans = str(r.final_answer)
    assert "400" in ans and "20" in ans, r.final_answer


def test_spring_energy_and_launch_speed():
    r = _ans("A 500 g toy car is launched from a spring (k = 200 N/m) "
             "compressed by 5 cm on a horizontal frictionless track. "
             "Calculate the elastic potential energy stored in the "
             "spring before release.")
    assert "0.25" in str(r.final_answer), r.final_answer


def test_power_energy_joules_and_kwh():
    r = _ans("A 1.5 kW water pump runs for 2 hours daily. Calculate the "
             "electrical energy consumed in one day in joules and in "
             "kilowatt-hours (kWh).")
    ans = str(r.final_answer)
    assert "kWh" in ans and "J" in ans, r.final_answer  # 1.08e7 J = 3 kWh


# ------------------------------------------------------- ch5: sound waves
def test_wave_lambda_from_f_and_v():
    r = _ans("A tuning fork vibrates at 256 Hz. The speed of sound in "
             "air is 340 m/s. Calculate the wavelength of the sound "
             "wave produced.")
    assert "1.33" in str(r.final_answer) or "1.328" in \
        str(r.final_answer), r.final_answer


def test_pulse_echo_half_path():
    # reflected pulse: depth = v t / 2 (5960 * 40us / 2 = 0.1192 m)
    r = _ans("An ultrasonic flaw detector sends a pulse into a steel "
             "rail (speed of sound in steel = 5960 m/s). The reflected "
             "pulse from a crack returns after 40 microseconds. "
             "Calculate the distance of the crack from the detector.")
    assert "0.119" in str(r.final_answer), r.final_answer


# ------------------------------------------------------ ch6: basic current
def test_energy_from_charge_and_voltage():
    r = _ans("A 9 V battery does 9 J of work on each coulomb. If 3 C of "
             "charge pass through, how much energy is delivered?")
    assert "27" in str(r.final_answer), r.final_answer


def test_series_bank_current_and_voltage():
    # OHMS_LAW_ANY used to bind the LAST resistor and ship 2 A
    r = _ans("Three resistors (3, 6, 9 ohms) are in series with a 18 V "
             "battery. Calculate the current and the voltage across the "
             "6 ohm resistor.")
    ans = str(r.final_answer)
    assert "1 A" in ans and "6 V" in ans, r.final_answer


# --------------------------------------------------- ch2: motion in a line
def test_distance_vs_displacement():
    r = _ans("A car moves 50 m east, then 30 m west. What is the "
             "distance traveled and the displacement of the car?")
    ans = str(r.final_answer)
    assert "80" in ans and "20" in ans and "east" in ans, r.final_answer


def test_average_speed_vs_velocity():
    r = _ans("A car travels 100 m east in 10 s, then 50 m west in 5 s. "
             "Calculate its average speed and average velocity.")
    ans = str(r.final_answer)
    assert "10" in ans and "3.33" in ans, r.final_answer


# -------------------------------------------------------------- ch3: forces
def test_momentum_collision():
    r = _ans("A 1500 kg car moving at 20 m/s east collides with a "
             "stationary 1000 kg truck. After collision, the car moves "
             "at 5 m/s east. Calculate the velocity of the truck after "
             "collision.")
    assert "22.5" in str(r.final_answer), r.final_answer


def test_momentum_recoil():
    r = _ans("A 60 kg boy stands on a frictionless trolley of mass "
             "40 kg. The boy jumps off the trolley with a velocity of "
             "2 m/s relative to the ground. Calculate the recoil "
             "velocity of the trolley.")
    assert "3" in str(r.final_answer), r.final_answer


def test_centripetal_force():
    r = _ans("A cyclist rides on a circular track of radius 20 m at a "
             "constant speed of 5 m/s. The combined mass of cyclist and "
             "bicycle is 70 kg. Calculate the centripetal force "
             "required.")
    assert "87.5" in str(r.final_answer), r.final_answer


# ------------------------------------------------------- ch1: measurement
def test_vernier_least_count():
    r = _ans("A vernier caliper has 1 mm main scale divisions. 10 "
             "vernier divisions coincide with 9 main scale divisions. "
             "What is the least count of the caliper?")
    assert "0.1" in str(r.final_answer), r.final_answer


# =============================================================
# P11 routing pins (pipeline level): the families above were refused
# in-pipeline by the chain lane, a unit-blind data-coverage guard, and
# an import-order registry hole -- the dispatcher solved what the
# pipeline buried.
# =============================================================

def _pipeline(q):
    from backend.its.solver.answer_pipeline import _answer_impl
    return _answer_impl(q)


def test_pipeline_chain_degraded_registry_rescue():
    # 2-hop chain grammar degraded on this text and buried the verified
    # C7_HEAT_PER_DEGREE answer (88 J/degC) under a guided refusal
    r = _pipeline(
        "A metallic rod of mass 2 kg is heated until its temperature "
        "increases by 25 degree C. If the thermal energy supplied is "
        "2200 J, calculate the heat energy added per degree Celsius "
        "rise in temperature.")
    assert str(r.label).startswith("VERIFIED"), (r.label, r.answer)
    assert abs(float(r.numeric) - 88.0) < 0.01, r.answer


def test_pipeline_unit_conversion_not_data_drop():
    # the brick family converts 20/10/5 cm to metres; the coverage
    # guard must not read converted givens as dropped data
    r = _pipeline(
        "A rectangular brick of weight 30 N rests on a table. Its "
        "dimensions are 20 cm by 10 cm by 5 cm. Calculate the pressure "
        "exerted when the brick lies on its largest face.")
    assert str(r.label).startswith("VERIFIED"), (r.label, r.answer)
    assert abs(float(r.numeric) - 1500.0) < 0.5, r.answer


def test_pipeline_physics_distractor_givens():
    # mass 500 g and delta-T 40 C are board distractors on a heat-rate
    # ask; the family consumes Q and t, the guard must not refuse
    r = _pipeline(
        "A stainless steel container of mass 500 g increases in "
        "temperature by 40 degree C when it absorbs 8400 J of heat. "
        "Calculate the rate of heat absorption if the process takes "
        "10 seconds.")
    assert str(r.label).startswith("VERIFIED"), (r.label, r.answer)
    assert abs(float(r.numeric) - 840.0) < 0.5, r.answer


def test_pipeline_registry_present_regardless_of_import_order():
    # THE P11 ROOT CAUSE: importing physics_families before
    # modeling_layer dropped model_physics_families from the registry
    # sweep (circular import).  model_problem must always see it.
    from backend.its.solver.modeling_layer import model_problem, _STRUCTURES
    assert any(getattr(fn, "__name__", "") == "model_physics_families"
               for fn in _STRUCTURES)
    p = model_problem(
        "A 9 V battery does 9 J of work on each coulomb. If 3 C of "
        "charge pass through, how much energy is delivered?")
    assert p.matched and abs(float(p.numeric_answer) - 27.0) < 0.01, \
        (p.structure, p.final_answer)


def test_pipeline_meta_judgement_refuses():
    # 'is the student correct?' is a judgement ask: answering the
    # embedded computation shipped 800 m (u*t ignoring braking)
    r = _pipeline(
        "Two students solve the same problem: \"A train moving at "
        "20 m/s brakes uniformly and stops in 40 s. Find the "
        "acceleration and the stopping distance.\" Student A uses "
        "v = u + at to find a, then s = ut + (1/2)at^2. Student B uses "
        "s = (u+v)/2 * t directly. Who is correct, and why?")
    assert not str(r.label).startswith("VERIFIED"), (r.label, r.answer)


def test_pipeline_sdt_sci_notation_speed():
    # '3 x 10^8 m/s' harvested the EXPONENT 8 as the speed and shipped
    # '40 m' for the radiation-in-5-s ask (true 1.5e9 m)
    r = _pipeline(
        "Calculate the distance travelled by thermal radiation from "
        "the Sun in 5 seconds, assuming it travels at 3 x 10^8 m/s.")
    if str(r.label).startswith("VERIFIED") and r.numeric is not None:
        assert abs(float(r.numeric) - 1.5e9) / 1.5e9 < 0.001, r.answer


def test_pipeline_kinematics_pal_sign_gate():
    # a disk-cached PAL program with the u/v swap must never outrank
    # the dispatcher's verified +2.5 (pinned flip, pipeline level)
    from backend.its.solver.answer_pipeline import answer
    for _ in range(2):
        r = answer("A car accelerates from rest to 20 m/s in 8 s. Find "
                   "the acceleration.")
        if str(r.label).startswith("VERIFIED") and r.numeric is not None:
            assert abs(float(r.numeric) - 2.5) < 0.01, r.answer


# =============================================================
# CLASS 10 wave (c10_phy_cbse corpus, 41 numeric diagnostics;
# baseline 18 SOLVE / 23 REFUSE / 0 WRONG -> 25 SOLVE / 0 WRONG).
# =============================================================

def test_c10_current_from_charge_time():
    # I = Q/t with minutes converted (300 C / 300 s = 1 A)
    r = _ans("A charge of 300 coulombs passes through a cross-section "
             "of a wire in 5 minutes. Calculate the electric current "
             "in amperes.")
    assert "1 A" in str(r.final_answer), r.final_answer


def test_c10_potential_difference_from_work_charge():
    # V = W/Q reverse read (600 J / 50 C = 12 V)
    r = _ans("A charge of 50 C is moved between two points in a "
             "circuit. If the work done is 600 J, calculate the "
             "potential difference between the points.")
    assert "12" in str(r.final_answer), r.final_answer


def test_c10_resistivity():
    # rho = RA/L = 3.4 x 1e-6 / 2 = 1.7e-6 ohm m
    r = _ans("A wire of length 2 m and cross-sectional area 1 x 10^-6 "
             "m^2 has resistance 3.4 ohm. Find the resistivity of the "
             "material.")
    assert "1.7" in str(r.final_answer), r.final_answer


def test_c10_stretched_wire():
    # volume constant, double length -> R' = 4R = 40 ohm
    r = _ans("A copper wire has resistance 10 ohm. It is stretched to "
             "double its length (volume constant). Find the new "
             "resistance.")
    assert "40" in str(r.final_answer), r.final_answer


def test_c10_parallel_bank():
    # 2/4/4 parallel on 12 V: R = 1 ohm, I_total = 12 A -- binding only
    # two of the three resistors shipped 9 A
    r = _ans("Three resistors of 2 ohm, 4 ohm, and 4 ohm are connected "
             "in parallel across a 12 V battery. Calculate the "
             "equivalent resistance and the total current.")
    ans = str(r.final_answer)
    assert "1 ohm" in ans and "12 A" in ans, r.final_answer


def test_c10_mains_current_geyser():
    # C8_CURRENT_FROM_PV trigger could not cross the sentence boundary
    r = _ans("A 1500 W electric geyser is connected to the 220 V "
             "mains. Calculate the current drawn by the geyser.")
    assert "6.8" in str(r.final_answer), r.final_answer


def test_c10_peak_emf_rpm():
    # epsilon = N B A omega = 100 x 0.5 x 0.1 x 2 pi = 31.4 V
    r = _ans("A rectangular coil of 100 turns, area 0.1 m^2, rotates "
             "at 60 rpm in a uniform magnetic field of 0.5 T. "
             "Calculate the maximum induced emf.")
    assert "31.4" in str(r.final_answer), r.final_answer


def test_c10_lens_power_single():
    # P = -2.0 D -> f = -0.5 m (diverging)
    r = _ans("An optician prescribes a lens of power -2.0 D. Calculate "
             "the focal length of this lens.")
    assert "-0.5" in str(r.final_answer), r.final_answer


def test_c10_lens_power_in_contact():
    # P = 3.5 - 1.5 = +2.0 D -> f = +0.5 m converging
    r = _ans("Two thin lenses of powers +3.5 D and -1.5 D are placed "
             "in contact. Find the net power and focal length of the "
             "combination.")
    ans = str(r.final_answer)
    assert "2" in ans and "0.5" in ans, r.final_answer


# =============================================================
# c11/c12 spot-check pins (0 wrong-ships; these two classes landed)
# =============================================================

def test_c11_shm_period_spring_mass():
    # T = 2 pi sqrt(m/k) = 2 pi sqrt(0.5/50) = 0.628 s -- the kinematics
    # family used to misread this as constant-acceleration (0.14 s)
    r = _ans("A 0.5 kg mass is attached to a spring of force constant "
             "50 N/m on a horizontal frictionless table. The mass is "
             "displaced 10 cm from equilibrium and released. Calculate "
             "the time period of the oscillation.")
    assert "0.628" in str(r.final_answer), r.final_answer


def test_c11_kinematics_vetoes_shm():
    # the constant-acceleration family must refuse SHM contexts: any
    # shipped answer must be the true SHM period, never 0.14 s
    r = model_physics_families(
        "A 0.5 kg mass attached to a spring (force constant 50 N/m) "
        "oscillates. Find the time it takes to return to equilibrium.")
    if r.matched and r.numeric_answer is not None:
        assert abs(float(r.numeric_answer) - 0.628) < 0.01, r.final_answer


def test_c11_thermal_expansion_gap():
    # rail gap = alpha L dT = 1.2e-5 x 12 x 25 = 3.6 mm
    r = _ans("A steel rail of length 12.0 m is laid at 20.0 C. The "
             "coefficient of linear expansion of steel is 1.20 x 10^-5 "
             "per K. Calculate the gap to leave so that the rail just "
             "touches at 45.0 C.")
    assert "0.0036" in str(r.final_answer) or "3.6" in \
        str(r.final_answer), r.final_answer
