"""test_physics_families.py -- textbook-style questions, hand-verified.

Every case below is computed by hand from the NCERT/ICSE textbook
formula.  The harness also enforces the SOLVER_STEP_CONTRACT.md: every
matched probe steps output must carry the 5 beats (Method /
Substitution / Computation / Verification / Interpretation) in order,
with >= 3 steps and >= 150 chars (atomic one-arithmetic families:
>= 2 / >= 80) -- a thin family is a permanent test failure, not an
opinion.

Run:  python D:/platform/_cisce_build/test_physics_families.py
"""
import re
import sys

sys.path.insert(0, "D:/platform")
from backend.its.solver.physics_families import model_physics_families
from backend.its.solver.physics2_families import model_physics2
from backend.its.solver.physics3_families import model_physics3

# (question, expected numeric answer, expected FID or None)
CASES = [
    # ---- kinematics v = u + at ----
    ("A car starts with a velocity of 5 m/s and accelerates uniformly at "
     "2 m/s^2 for 10 s. Find its final velocity.", 25.0,
     "KINEMATICS_V_U_AT"),
    ("A car accelerates uniformly at 2 m/s^2 and reaches a velocity of "
     "25 m/s in 10 s. Find the initial velocity.", 5.0,
     "KINEMATICS_V_U_AT"),
    ("A train moving at 20 m/s accelerates uniformly to 30 m/s in 10 s. "
     "Find the acceleration.", 1.0, "KINEMATICS_V_U_AT"),
    ("A body moving with a velocity of 30 m/s is retarded at 5 m/s^2. "
     "How long will it take to come to rest?", 6.0, "KINEMATICS_V_U_AT"),
    # ---- kinematics s = ut + 1/2 at^2 ----
    ("A car starts with a velocity of 5 m/s and accelerates uniformly at "
     "2 m/s^2 for 10 s. Find the distance covered.", 150.0,
     "KINEMATICS_S_UT_AT2"),
    ("A stone is dropped from a height of 20 m. How long does it take to "
     "fall to the ground (g = 9.8 m/s^2)?", 2.0204, "KINEMATICS_S_UT_AT2"),
    ("A body starting from rest travels 100 m with an acceleration of "
     "5 m/s^2. Find the time taken.", 6.3249, "KINEMATICS_S_UT_AT2"),
    # ---- kinematics v^2 = u^2 + 2as ----
    ("A stone is dropped from a height of 20 m. Find its velocity on "
     "hitting the ground (g = 9.8 m/s^2).", 19.7990,
     "KINEMATICS_V2_U2_2AS"),
    ("A car moving at 20 m/s is brought to rest in 50 m. Find the "
     "retardation.", -4.0, "KINEMATICS_V2_U2_2AS"),
    ("A ball is thrown vertically upward with a velocity of 20 m/s "
     "(g = 9.8 m/s^2). Find the maximum height reached.", 20.4082,
     "KINEMATICS_V2_U2_2AS"),
    ("A train moving with a velocity of 10 m/s accelerates uniformly at "
     "2 m/s^2 over a distance of 60 m. Find its final velocity.", 18.4391,
     "KINEMATICS_V2_U2_2AS"),
    # ---- dynamics ----
    ("A force acts on a mass of 4 kg giving it an acceleration of "
     "2 m/s^2. Find the force.", 8.0, "NEWTON_SECOND_LAW"),
    ("A force of 8 N acts on a body giving an acceleration of 2 m/s^2. "
     "Find the mass of the body.", 4.0, "NEWTON_SECOND_LAW"),
    ("Find the weight of a 10 kg object (take g = 9.8 m/s^2).", 98.0,
     "WEIGHT_MG"),
    ("Find the weight of a 10 kg object on the moon.", 16.0, "WEIGHT_MG"),
    ("A block of mass 5 kg rests on a table. The coefficient of friction "
     "is 0.4. Find the force of friction (g = 9.8 m/s^2).", 19.6,
     "FRICTION_MU_N"),
    # ---- work, energy, power ----
    ("Calculate the work done when a force of 10 N moves an object "
     "through a distance of 5 m.", 50.0, "WORK_DONE"),
    ("A force of 20 N moves a box 3 m at an angle of 60 degrees. Find "
     "the work done.", 30.0, "WORK_DONE"),
    ("Find the kinetic energy of a 2 kg ball moving at 3 m/s.", 9.0,
     "KINETIC_ENERGY"),
    ("Calculate the potential energy of a 5 kg object placed at a height "
     "of 10 m (g = 9.8 m/s^2).", 490.0, "POTENTIAL_ENERGY"),
    ("Find the work required to accelerate a car of mass 1000 kg from "
     "5 m/s to 15 m/s.", 100000.0, "WORK_ENERGY_THEOREM"),
    ("A machine does 500 J of work in 5 s. Find the power.", 100.0,
     "POWER_WORK_TIME"),
    ("An engine exerts a force of 2000 N on a car moving at 15 m/s. Find "
     "the power of the engine.", 30000.0, "POWER_FORCE_VELOCITY"),
    # ---- gravitation ----
    ("Calculate the value of g on a planet of mass 6e24 kg and radius "
     "6400 km.", 9.7693, "GRAVITY_SURFACE_G"),
    # ---- fluids ----
    ("Calculate the pressure at a depth of 10 m in water (g = 9.8 m/s^2).",
     98000.0, "HYDROSTATIC_PRESSURE"),
    ("A metal block of volume 0.002 m^3 is fully immersed in water. Find "
     "the buoyant force on it (g = 9.8 m/s^2).", 19.6,
     "ARCHIMEDES_BUOYANCY"),
    ("A body of mass 5 kg and volume 0.001 m^3 is fully submerged in "
     "water. Find its apparent weight (g = 9.8 m/s^2).", 39.2,
     "ARCHIMEDES_BUOYANCY"),
    # ---- solids ----
    ("A spring of spring constant 200 N/m is compressed by 5 cm. Find "
     "the force required.", 10.0, "HOOKE_LAW"),
    ("Find the moment of a force of 20 N about a pivot at a distance of "
     "50 cm from it.", 10.0, "MOMENT_OF_FORCE"),
    ("A 40 N weight is hung 30 cm from the fulcrum of a seesaw. Where "
     "must a 60 N weight be hung on the other side to balance it?",
     0.2, "PRINCIPLE_OF_MOMENTS"),
    # ---- heat ----
    ("How much heat is required to raise the temperature of 2 kg of "
     "water from 25 C to 55 C? (specific heat of water = 4200 J/kg C)",
     252000.0, "SPECIFIC_HEAT"),
    ("Find the heat required to melt 0.5 kg of ice completely (specific "
     "latent heat of fusion of ice = 334000 J/kg).", 167000.0,
     "LATENT_HEAT"),
    # ---- oscillations ----
    ("Find the time period of a simple pendulum of length 1 m "
     "(g = 9.8 m/s^2).", 2.0061, "PENDULUM_PERIOD"),
    ("The time period of a simple pendulum is 2 s. Find the length of "
     "the pendulum (g = 9.8 m/s^2).", 0.9929, "PENDULUM_PERIOD"),
    # ---- electricity ----
    ("A current of 2 A flows through a resistor of 6 ohm. Find the "
     "potential difference across it.", 12.0, "OHMS_LAW_ANY"),
    ("A voltage of 12 V is applied across a resistance of 4 ohm. Find "
     "the current.", 3.0, "OHMS_LAW_ANY"),
    ("An electric bulb is connected to a 220 V supply and draws a "
     "current of 0.5 A. Find the power consumed.", 110.0,
     "ELECTRICAL_POWER_VI"),
    ("A current of 2 A flows through a 5 ohm resistor. Find the power "
     "dissipated.", 20.0, "ELECTRICAL_POWER_VI"),
    ("An electric heater of 1500 W is used 5 hours a day for 30 days. "
     "Find the electricity bill at Rs 4 per unit.", 900.0,
     "ELECTRICAL_ENERGY_KWH"),
    # ---- optics ----
    ("The refractive index of glass is 1.5. Find the speed of light in "
     "glass.", 2e8, "REFRACTIVE_INDEX_SPEED"),
    # ---- electrostatics complement (inverted word order vs physics2) ----
    ("Two charges of 2 microcoulomb and 3 microcoulomb are at a distance "
     "of 10 cm. Find the force between them.", 5.4, "COULOMB_ALT"),
]

# BOOKS2 families -- class 9-12 book topics that were MISSING (AC
# circuits, transformer, rotation, relative/terminal velocity,
# calorimetry, Kepler, escape/orbital velocity, Young modulus, YDSE,
# resolving power, semiconductors, echo, machines, dispersion, Doppler,
# plane mirror).
CASES_BOOKS2 = [
    # ---- AC circuits: rms / peak ----
    ("An alternating current has a peak value of 10 A. Find the rms "
     "current.", 7.0711, "RMS_AC_VALUE"),
    ("The rms value of an alternating voltage is 220 V. Find the peak "
     "voltage.", 311.127, "RMS_AC_VALUE"),
    # ---- AC reactance / impedance ----
    ("Find the inductive reactance of a coil of inductance 0.2 H at a "
     "frequency of 50 Hz.", 62.8319, "REACTANCE_LC"),
    ("Find the capacitive reactance of a capacitor of capacitance 40 uF "
     "at a frequency of 50 Hz.", 79.5775, "REACTANCE_LC"),
    ("A series LCR circuit has a resistance of 30 ohm, an inductance of "
     "0.2 H and a capacitance of 40 uF at a frequency of 50 Hz. Find the "
     "impedance.", 34.36, "IMPEDANCE_RLC"),
    # ---- transformer ----
    ("A transformer has 100 turns in the primary coil and 500 turns in "
     "the secondary coil. If the primary voltage is 20 V, find the "
     "secondary voltage.", 100.0, "TRANSFORMER_RATIO"),
    ("A transformer with 500 primary turns and 100 secondary turns draws "
     "a primary current of 0.5 A. Find the secondary current.", 2.5,
     "TRANSFORMER_RATIO"),
    # ---- rotational motion ----
    ("A torque of 12 N m is applied to a flywheel of moment of inertia "
     "4 kg m^2. Find the angular acceleration.", 3.0, "TORQUE_ANGULAR"),
    ("Find the angular momentum of a body of moment of inertia 2 kg m^2 "
     "rotating at 5 rad/s.", 10.0, "ANGULAR_MOMENTUM"),
    ("Find the angular momentum of a particle of mass 0.5 kg moving with "
     "a velocity of 4 m/s in a circle of radius 0.8 m.", 1.6,
     "ANGULAR_MOMENTUM"),
    ("Find the moment of inertia of a 2 kg particle at a distance of "
     "0.5 m from the axis of rotation.", 0.5, "MOMENT_OF_INERTIA_PT"),
    # ---- relative velocity ----
    ("A train A moves at 20 m/s and a train B moves at 25 m/s in the "
     "same direction. Find the relative velocity of A with respect to "
     "B.", 5.0, "RELATIVE_VELOCITY"),
    ("Two cars approach each other at 15 m/s and 20 m/s along a straight "
     "road. Find their relative velocity.", 35.0, "RELATIVE_VELOCITY"),
    # ---- terminal velocity ----
    ("Find the terminal velocity of a rain drop of radius 1 mm falling "
     "through air of viscosity 0.18 Pa s. Density of the drop is 1000 "
     "kg/m^3 and density of air is 1.2 kg/m^3.", 0.012056,
     "TERMINAL_VELOCITY"),
    # ---- calorimetry mixture ----
    ("A 0.5 kg copper block at 100 C is dropped into 0.2 kg of water at "
     "20 C (specific heat of copper = 390 J/kg C). Find the final "
     "temperature.", 35.0725, "CALORIMETRY_MIXTURE"),
    # ---- Kepler third law ----
    ("A planet orbits at 1.5e11 m with a period of 3.2e7 s. Using the "
     "Kepler third law find the period of a planet at 2.4e11 m.",
     64759132.9, "KEPLER_THIRD"),
    # ---- escape / orbital velocity ----
    ("Find the escape velocity from a planet of mass 6e24 kg and radius "
     "6400 km.", 11183.4, "ESCAPE_VELOCITY"),
    ("Find the escape velocity from the surface of the earth (g = 9.8 "
     "m/s^2, radius 6400 km).", 11192.5, "ESCAPE_VELOCITY"),
    ("Calculate the orbital velocity of a satellite orbiting a planet of "
     "mass 5.97e24 kg at a radius of 7200 km.", 7452.4,
     "ORBITAL_VELOCITY"),
    # ---- elasticity: Young modulus ----
    ("A wire of length 2 m and cross-sectional area 1 mm^2 stretches by "
     "1 mm under a force of 200 N. Find the Young modulus of its "
     "material.", 4e11, "YOUNGS_MODULUS"),
    # ---- wave optics: YDSE fringe width ----
    ("In a Young double slit experiment light of wavelength 600 nm is "
     "used and the slits are separated by 0.5 mm. The screen is 1.5 m "
     "away. Find the fringe width.", 0.0018, "YDSE_FRINGE"),
    ("Find the distance of the 5th bright fringe in a YDSE with lambda "
     "600 nm, slit separation 0.5 mm and screen distance 1.5 m.",
     0.009, "YDSE_FRINGE"),
    # ---- resolving power ----
    ("A telescope has an objective of aperture 10 cm. Find the limit of "
     "resolution for light of wavelength 600 nm.", 7.32e-6,
     "RESOLVING_POWER"),
    ("Find the resolving power of a telescope with aperture 10 cm for "
     "wavelength 600 nm.", 136612.0, "RESOLVING_POWER"),
    # ---- semiconductor logic gates ----
    ("In a NAND gate the inputs are A = 1 and B = 0. Find the output.",
     1.0, "LOGIC_GATE"),
    ("What is the output of an OR gate when both inputs are 0 and 0?",
     0.0, "LOGIC_GATE"),
    ("A NOT gate receives input 1. Find its output.", 0.0, "LOGIC_GATE"),
    ("In an XOR gate the inputs are 1 and 1. Find the output.", 0.0,
     "LOGIC_GATE"),
    # ---- transistor gains ----
    ("The collector current of a transistor is 5 mA and the base current "
     "is 50 uA. Find the current gain beta.", 100.0, "TRANSISTOR_GAIN"),
    ("The emitter current of a transistor is 5 mA and the collector "
     "current is 4.9 mA. Find alpha.", 0.98, "TRANSISTOR_GAIN"),
    ("If the alpha of a transistor is 0.98, find beta.", 49.0,
     "TRANSISTOR_GAIN"),
    # ---- echo / SONAR ----
    ("A man claps near a cliff and hears the echo after 2 s. The speed "
     "of sound is 340 m/s. How far is the cliff?", 340.0, "ECHO_SONAR"),
    # ---- machines: MA / VR / efficiency ----
    ("A machine lifts a load of 400 N with an effort of 200 N. Find the "
     "mechanical advantage.", 2.0, "MACHINE_ADVANTAGE"),
    ("A machine has mechanical advantage 4 and velocity ratio 5. Find "
     "the efficiency of the machine.", 80.0, "MACHINE_ADVANTAGE"),
    # ---- plane mirror reflection ----
    ("A ray of light strikes a plane mirror at an angle of incidence of "
     "35 degrees. Find the angle of reflection.", 35.0,
     "PLANE_MIRROR_ANGLE"),
    # ---- angular dispersion / dispersive power ----
    ("Find the angular dispersion of a prism of angle 8 degrees if "
     "mu_v = 1.53 and mu_r = 1.51.", 0.16, "ANGULAR_DISPERSION"),
    ("Find the dispersive power of a prism if mu_v = 1.53, mu_r = 1.51 "
     "and mu_y = 1.52.", 0.038462, "ANGULAR_DISPERSION"),
    # ---- Doppler effect ----
    ("A siren of frequency 500 Hz approaches a stationary observer at "
     "10 m/s. Find the apparent frequency (speed of sound = 340 m/s).",
     515.1515, "DOPPLER_EFFECT"),
    ("A stationary source emits a frequency of 500 Hz. An observer moves "
     "away from the source at 20 m/s. Find the apparent frequency "
     "(speed of sound = 340 m/s).", 470.588, "DOPPLER_EFFECT"),
]

# physics2 canonical probes (trigger phrasing these modules own)
CASES_P2 = [
    ("Find the image distance for a convex lens of focal length 10 cm "
     "when an object is placed at 15 cm.", 6.0, "LENS_FORMULA"),
    ("Find the image distance for a concave mirror of focal length -20 "
     "cm when an object is placed at 30 cm.", -12.0, "MIRROR_FORMULA"),
    ("Find the magnification when the image distance is -60 cm and the "
     "object distance is 30 cm.", 2.0, "MAGNIFICATION_MIRROR"),
    ("Find the total resistance of 6 ohms and 3 ohms in parallel.", 2.0,
     "PARALLEL_RESISTANCE_2"),
    ("Find the efficiency of a heat engine doing 300 J of work from "
     "1000 J of heat.", 30.0, "HEAT_ENGINE_EFFICIENCY"),
    ("Find the period of oscillation of a 2 kg mass on a spring with "
     "spring constant 50 N/m.", 1.2566, "SHM_PERIOD_SPRING"),
    ("Find the energy stored in a spring with spring constant 200 N/m "
     "compressed by 0.1 m.", 1.0, "SPRING_ENERGY"),
    ("Find the remaining amount after 3 half-lives with an initial "
     "amount of 80 g.", 10.0, "HALF_LIFE"),
]

# physics3 canonical probes
CASES_P3 = [
    ("A wave has a frequency of 500 Hz and a wavelength of 0.6 m. Find "
     "the speed.", 300.0, "WAVE_SPEED"),
    ("Light goes from air (n = 1.0) into water (n = 1.33) with an angle "
     "of incidence of 30 degrees. Find the angle of refraction.", 22.083,
     "SNELLS_LAW"),
    ("Find the power of a convex lens with focal length 25 cm.", 4.0,
     "POWER_LENS"),
    ("Find the de Broglie wavelength of an electron moving at 1e6 m/s.",
     7.28e-10, "DE_BROGLIE"),
    ("At a junction 5 A enters and 2 A leaves through one branch. Find "
     "the current in the other branch.", 3.0, "KIRCHHOFF_CURRENT"),
    ("In a balanced wheatstone bridge P = 4 ohm, Q = 6 ohm, R = 8 ohm. "
     "Find X.", 12.0, "WHEATSTONE_BALANCED"),
    ("Find the magnetic field inside a solenoid with 1000 turns and "
     "0.5 m long carrying a current of 2 A.", 5.0265e-3,
     "MAGNETIC_FIELD"),
    ("Find the force on a wire of length 10 cm carrying a current of "
     "3 A perpendicular to a magnetic field of 0.5 T.", 0.15,
     "FORCE_ON_CONDUCTOR"),
]

# gates: impossible states must NOT produce a (wrong) matched answer
GATES = [
    # negative discriminant in v^2 = u^2 + 2as
    "A car moving at 5 m/s accelerates at 2 m/s^2. Find the distance "
    "after which it reaches a velocity of 4 m/s.",
    # escape velocity from a zero-radius planet
    "Find the escape velocity from a planet of mass 6e24 kg and radius "
    "0 m.",
    # zero capacitance has no reactance
    "Find the capacitive reactance of a capacitor of capacitance 0 uF "
    "at a frequency of 50 Hz.",
    # logic gate with no inputs given
    "In a NAND gate find the output.",
    # calorimetry with equal temperatures: no heat exchange
    "0.2 kg of water at 40 C is mixed with 0.3 kg of water at 40 C. "
    "Find the final temperature.",
    # source faster than sound: denominator negative
    "A source approaches a stationary observer at 400 m/s emitting a "
    "500 Hz siren (speed of sound 340 m/s). Find the apparent frequency.",
    # ball less dense than the fluid: no terminal fall term
    "Find the terminal velocity of a ball of radius 2 mm and density "
    "900 kg/m^3 falling through water of viscosity 0.001 Pa s.",
]

# negatives: other-subject probes must not fire any physics family
NEGATIVES = [
    "Find the simple interest on Rs 5000 at 8% per annum for 3 years.",
    "A machine costing Rs 50000 depreciates at 10% per annum. Find its "
    "value after 2 years.",
    "Balance the chemical equation: Zn + HCl -> ZnCl2 + H2",
    "Calculate the number of moles in 2 moles of CO2.",
    "In a cross between Tt and Tt pea plants, give the phenotype ratio.",
    "Given Qd = 100 - 5P, find the quantity demanded when the price "
    "is 6.",
    "Find the GDP deflator when nominal GDP is 2200 and real GDP "
    "is 2000.",
    "The speed of the car is 60 km per hour. How much distance will it "
    "cover in 2 hours?",
]

# --------------------------------------------------------------------------- #
# STEP CONTRACT assertions (SOLVER_STEP_CONTRACT.md) -- a thin family is
# a RED test.  Standard families: >= 3 steps, >= 150 chars, method beat
# in step 1, verification beat present, beats in order.  Atomic
# one-arithmetic families: >= 2 / >= 80.
# --------------------------------------------------------------------------- #
METHOD_RX = re.compile(
    r"law|formula|rule|method|identity|relation|principle|theorem|"
    r"golden|equation|using|ratio", re.I)
VERIFY_RX = re.compile(
    r"substitut|check|verif|sanity|recomput|tally|cross-?check|balance"
    r"|back", re.I)
BEAT_ORDER = ("Substitution", "Computation", "Verification",
              "Interpretation")


def contract_problems(res, min_steps=3, min_chars=150):
    """Return a list of STEP CONTRACT violations for a matched result."""
    problems = []
    steps = [s for s in (res.steps or []) if isinstance(s, str) and s.strip()]
    joined = " ".join(steps)
    if len(steps) < min_steps:
        problems.append("only " + str(len(steps)) + " step(s), need "
                        + str(min_steps))
    if len(joined) < min_chars:
        problems.append("only " + str(len(joined)) + " chars, need "
                        + str(min_chars))
    if steps and not METHOD_RX.search(steps[0]):
        problems.append("no method beat in step 1")
    if steps and not VERIFY_RX.search(joined):
        problems.append("no verification beat")
    idx = {}
    for i, s in enumerate(steps):
        for beat in BEAT_ORDER:
            if s.startswith(beat) and beat not in idx:
                idx[beat] = i
    missing = [b for b in BEAT_ORDER if b not in idx]
    if missing:
        problems.append("missing beats: " + ", ".join(missing))
    present = [idx[b] for b in BEAT_ORDER if b in idx]
    if present != sorted(present):
        problems.append("beats out of order")
    return problems


passed = failed = unmatched = gfail = nfail = cfail = 0
details = []


def run_case(dispatcher, text, expected, fid, atomic=False):
    """Run one probe: numeric answer, FID pin and STEP CONTRACT."""
    global passed, failed, unmatched, cfail
    r = dispatcher(text)
    if not r.matched:
        unmatched += 1
        details.append(("UNMATCHED", text[:60], "expected " + str(expected)))
        return
    if fid and r.structure != fid:
        failed += 1
        details.append(("WRONGFAM", text[:60],
                        "expected " + str(fid) + ", got " + r.structure
                        + " (" + str(r.numeric_answer) + ")"))
        return
    got = r.numeric_answer
    ok = got is not None and abs(got - expected) <= max(0.01, abs(expected) * 0.005)
    if not ok:
        failed += 1
        details.append(("WRONG", text[:60],
                        "expected " + str(expected) + ", got " + str(got)
                        + " via " + r.structure))
        return
    # numeric answer correct -> enforce the STEP CONTRACT
    ms, mc = (2, 80) if atomic else (3, 150)
    probs = contract_problems(r, ms, mc)
    if probs:
        cfail += 1
        details.append(("CONTRACT", text[:60], "; ".join(probs)))
        return
    passed += 1


for text, expected, fid in CASES:
    run_case(model_physics_families, text, expected, fid)
for text, expected, fid in CASES_BOOKS2:
    run_case(model_physics_families, text, expected, fid)
for text, expected, fid in CASES_P2:
    run_case(model_physics2, text, expected, fid)
for text, expected, fid in CASES_P3:
    run_case(model_physics3, text, expected, fid)

for text in GATES:
    r = model_physics_families(text)
    if r.matched:
        gfail += 1
        details.append(("GATE-FAIL", text[:60],
                        "matched " + r.structure + " with "
                        + str(r.numeric_answer)))

for text in NEGATIVES:
    r = model_physics_families(text)
    if r.matched:
        nfail += 1
        details.append(("NEGATIVE-FAIL", text[:60],
                        "fired " + r.structure + " with "
                        + str(r.numeric_answer)))

total = (len(CASES) + len(CASES_BOOKS2) + len(CASES_P2) + len(CASES_P3)
         + len(GATES) + len(NEGATIVES))
print("PASS " + str(passed) + " | FAIL " + str(failed) + " | UNMATCHED "
      + str(unmatched) + " | GATE-FAIL " + str(gfail) + " | NEGATIVE-FAIL "
      + str(nfail) + " | CONTRACT-FAIL " + str(cfail) + "  (of " + str(total)
      + ")")
for d in details:
    print("  ", d)
sys.exit(0 if (failed == 0 and unmatched == 0 and gfail == 0
               and nfail == 0 and cfail == 0) else 1)
