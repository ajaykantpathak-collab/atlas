"""template_library.py — Problem templates extracted from real exam patterns.

Each template is a PythonLoopSolver ProblemTemplate that solves one question
type deterministically. Templates are derived from:
  - CBSE Class 11-12 syllabus (NCERT)
  - JEE Main 2020-2025 most repeated question types
  - NEET 2020-2025 most repeated question types
  - CA Foundation quantitative aptitude

Coverage: ~200 templates targeting 95% of STEM questions.

This file contains the FIRST WAVE: Physics (highest weightage).
"""

from __future__ import annotations

from backend.its.solver.python_loop import ProblemTemplate

# =========================================================================
# PHYSICS TEMPLATES (highest weightage in JEE/NEET/CBSE)
# =========================================================================

PHYSICS_TEMPLATES = [
    # ── KINEMATICS ────────────────────────────────────────────────────────

    ProblemTemplate(
        name="phy_kinematics_v_uat",
        subject="physics", class_levels=[9, 10, 11, 12],
        concepts=["kinematics", "uniform_acceleration"],
        code_lines=[
            "u = {u}  # initial velocity (m/s)",
            "a = {a}  # acceleration (m/s^2)",
            "t = {t}  # time (s)",
            "v = u + a * t",
            "s = u * t + 0.5 * a * t * t",
            "result = s",
        ],
        inputs=["u", "a", "t"], output_var="result",
        units="m", verify_range=(-10000, 10000),
        difficulty="easy", source_exam="CBSE/JEE Main",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_kinematics_v2_equation",
        subject="physics", class_levels=[10, 11, 12],
        concepts=["kinematics", "uniform_acceleration"],
        code_lines=[
            "u = {u}",
            "a = {a}",
            "s = {s}",
            "v_squared = u * u + 2 * a * s",
            "v = math.sqrt(abs(v_squared))",
            "result = v",
        ],
        inputs=["u", "a", "s"], output_var="result",
        units="m/s", verify_range=(0, 10000), expected_sign="positive",
        difficulty="easy", source_exam="JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_projectile_range",
        subject="physics", class_levels=[11, 12],
        concepts=["projectile_motion", "kinematics"],
        code_lines=[
            "u = {u}  # initial speed (m/s)",
            "angle = {angle}  # angle (degrees)",
            "theta = math.radians(angle)",
            "g = {g}  # gravity (m/s^2)",
            "result = u * u * math.sin(2 * theta) / g",
        ],
        inputs=["u", "angle", "g"], output_var="result",
        units="m", verify_range=(0, 100000), expected_sign="positive",
        difficulty="medium", source_exam="JEE Main",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_projectile_max_height",
        subject="physics", class_levels=[11, 12],
        concepts=["projectile_motion", "kinematics"],
        code_lines=[
            "u = {u}",
            "angle = {angle}",
            "theta = math.radians(angle)",
            "g = {g}",
            "result = u * u * math.sin(theta) * math.sin(theta) / (2 * g)",
        ],
        inputs=["u", "angle", "g"], output_var="result",
        units="m", verify_range=(0, 50000), expected_sign="positive",
        difficulty="medium", source_exam="JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_free_fall_time",
        subject="physics", class_levels=[9, 10, 11],
        concepts=["free_fall", "kinematics"],
        code_lines=[
            "h = {h}  # height (m)",
            "g = {g}  # gravity (m/s^2)",
            "t = math.sqrt(2 * h / g)",
            "result = t",
        ],
        inputs=["h", "g"], output_var="result",
        units="s", verify_range=(0, 1000), expected_sign="positive",
        difficulty="easy", source_exam="CBSE/NEET",
        bloom_levels=["apply"],
    ),

    # ── NEWTON'S LAWS / FRICTION ─────────────────────────────────────────

    ProblemTemplate(
        name="phy_friction_incline",
        subject="physics", class_levels=[11, 12],
        concepts=["friction", "newton_laws", "inclined_plane"],
        code_lines=[
            "mass = {mass}  # kg",
            "angle = {angle}  # incline angle (degrees)",
            "mu = {mu}  # coefficient of friction",
            "g = {g}",
            "theta = math.radians(angle)",
            "normal = mass * g * math.cos(theta)",
            "friction = mu * normal",
            "gravity_along = mass * g * math.sin(theta)",
            "a = (gravity_along - friction) / mass",
            "result = a",
        ],
        inputs=["mass", "angle", "mu", "g"], output_var="result",
        units="m/s^2", verify_range=(-50, 50),
        difficulty="medium", source_exam="JEE Main/NEET",
        bloom_levels=["apply", "analyze"],
    ),

    # ── WORK-ENERGY-POWER ────────────────────────────────────────────────

    ProblemTemplate(
        name="phy_work_energy_theorem",
        subject="physics", class_levels=[10, 11, 12],
        concepts=["work_energy", "kinetic_energy"],
        code_lines=[
            "m = {mass}",
            "v = {velocity}",
            "ke = 0.5 * m * v * v",
            "result = ke",
        ],
        inputs=["mass", "velocity"], output_var="result",
        units="J", verify_range=(0, 1000000), expected_sign="positive",
        difficulty="easy", source_exam="CBSE/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_spring_pe",
        subject="physics", class_levels=[11, 12],
        concepts=["spring", "potential_energy", "hooks_law"],
        code_lines=[
            "k = {k}  # spring constant (N/m)",
            "x = {x}  # compression/extension (m)",
            "pe = 0.5 * k * x * x",
            "result = pe",
        ],
        inputs=["k", "x"], output_var="result",
        units="J", verify_range=(0, 100000), expected_sign="positive",
        difficulty="easy", source_exam="JEE Main",
        bloom_levels=["apply"],
    ),

    # ── CURRENT ELECTRICITY (highest repeat in JEE 2020-2025) ────────────

    ProblemTemplate(
        name="phy_ohms_law",
        subject="physics", class_levels=[10, 11, 12],
        concepts=["current_electricity", "ohms_law"],
        code_lines=[
            "V = {V}  # voltage (V)",
            "R = {R}  # resistance (ohm)",
            "result = V / R",
        ],
        inputs=["V", "R"], output_var="result",
        units="A", verify_range=(0, 1000), expected_sign="positive",
        difficulty="easy", source_exam="CBSE/JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_electric_power",
        subject="physics", class_levels=[10, 11, 12],
        concepts=["current_electricity", "electric_power"],
        code_lines=[
            "V = {V}",
            "R = {R}",
            "power = V * V / R",
            "result = power",
        ],
        inputs=["V", "R"], output_var="result",
        units="W", verify_range=(0, 100000), expected_sign="positive",
        difficulty="easy", source_exam="CBSE/JEE Main",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_series_parallel_resistance",
        subject="physics", class_levels=[10, 11, 12],
        concepts=["current_electricity", "resistance_network"],
        code_lines=[
            "R1 = {R1}",
            "R2 = {R2}",
            "R3 = {R3}",
            "# Series combination",
            "series_total = R1 + R2 + R3",
            "# Parallel combination",
            "inverse = 1/R1 + 1/R2 + 1/R3",
            "parallel_total = 1 / inverse",
            "result = series_total",
        ],
        inputs=["R1", "R2", "R3"], output_var="result",
        units="ohm", verify_range=(0, 10000),
        difficulty="medium", source_exam="JEE Main/CBSE",
        bloom_levels=["apply", "analyze"],
    ),

    ProblemTemplate(
        name="phy_heating_effect",
        subject="physics", class_levels=[10, 11, 12],
        concepts=["current_electricity", "heating_effect", "joules_law"],
        code_lines=[
            "I = {I}  # current (A)",
            "R = {R}  # resistance (ohm)",
            "t = {t}  # time (s)",
            "heat = I * I * R * t",
            "result = heat",
        ],
        inputs=["I", "R", "t"], output_var="result",
        units="J", verify_range=(0, 10000000), expected_sign="positive",
        difficulty="easy", source_exam="CBSE/NEET",
        bloom_levels=["apply"],
    ),

    # ── ELECTROSTATICS ───────────────────────────────────────────────────

    ProblemTemplate(
        name="phy_coulombs_law",
        subject="physics", class_levels=[11, 12],
        concepts=["electrostatics", "coulombs_law"],
        code_lines=[
            "k = 9e9  # Coulomb constant (N m^2/C^2)",
            "q1 = {q1}  # charge 1 (C)",
            "q2 = {q2}  # charge 2 (C)",
            "r = {r}  # distance (m)",
            "force = k * q1 * q2 / (r * r)",
            "result = force",
        ],
        inputs=["q1", "q2", "r"], output_var="result",
        units="N", verify_range=(0, 1e6),
        difficulty="easy", source_exam="CBSE/JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_electric_field_point_charge",
        subject="physics", class_levels=[11, 12],
        concepts=["electrostatics", "electric_field"],
        code_lines=[
            "k = 9e9",
            "q = {q}  # charge (C)",
            "r = {r}  # distance (m)",
            "E = k * q / (r * r)",
            "result = E",
        ],
        inputs=["q", "r"], output_var="result",
        units="N/C", verify_range=(0, 1e12),
        difficulty="easy", source_exam="CBSE/JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    # ── THERMODYNAMICS ───────────────────────────────────────────────────

    ProblemTemplate(
        name="phy_first_law_thermodynamics",
        subject="physics", class_levels=[11, 12],
        concepts=["thermodynamics", "first_law"],
        code_lines=[
            "dQ = {dQ}  # heat supplied (J)",
            "dU = {dU}  # change in internal energy (J)",
            "W = dQ - dU",
            "result = W",
        ],
        inputs=["dQ", "dU"], output_var="result",
        units="J", verify_range=(-100000, 100000),
        difficulty="easy", source_exam="JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_carnot_efficiency",
        subject="physics", class_levels=[11, 12],
        concepts=["thermodynamics", "carnot_engine", "efficiency"],
        code_lines=[
            "T_hot = {T_hot}  # source temperature (K)",
            "T_cold = {T_cold}  # sink temperature (K)",
            "efficiency = (T_hot - T_cold) / T_hot * 100",
            "result = efficiency",
        ],
        inputs=["T_hot", "T_cold"], output_var="result",
        units="%", verify_range=(0, 100), expected_sign="positive",
        difficulty="medium", source_exam="JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    # ── OPTICS ───────────────────────────────────────────────────────────

    ProblemTemplate(
        name="phy_lens_formula",
        subject="physics", class_levels=[11, 12],
        concepts=["optics", "lens_formula", "refraction"],
        code_lines=[
            "f = {f}  # focal length (cm)",
            "u = {u}  # object distance (cm)",
            "# Lens formula: 1/f = 1/v - 1/u  ->  1/v = 1/f + 1/u",
            "one_by_v = 1/f - 1/u",  # sign convention: u is negative
            "v = 1 / one_by_v",
            "magnification = v / u",
            "result = v",
        ],
        inputs=["f", "u"], output_var="result",
        units="cm", verify_range=(-1000, 1000),
        difficulty="medium", source_exam="CBSE/JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    # ── MODERN PHYSICS ───────────────────────────────────────────────────

    ProblemTemplate(
        name="phy_photoelectric_effect",
        subject="physics", class_levels=[12],
        concepts=["modern_physics", "photoelectric_effect"],
        code_lines=[
            "h = {h}  # Planck's constant (J s)",
            "c = {c}  # speed of light (m/s)",
            "wavelength = {wavelength}  # wavelength (m)",
            "work_function = {work_function}  # eV",
            "e_charge = 1.6e-19",
            "E_photon = h * c / wavelength",
            "KE_max = E_photon - work_function * e_charge",
            "result = KE_max",
        ],
        inputs=["h", "c", "wavelength", "work_function"], output_var="result",
        units="J", verify_range=(0, 1e-15),
        difficulty="medium", source_exam="JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_de_broglie_wavelength",
        subject="physics", class_levels=[12],
        concepts=["modern_physics", "de_broglie_wavelength"],
        code_lines=[
            "h = {h}",
            "m = {mass}  # mass of particle (kg)",
            "v = {velocity}  # velocity (m/s)",
            "wavelength = h / (m * v)",
            "result = wavelength",
        ],
        inputs=["h", "mass", "velocity"], output_var="result",
        units="m", verify_range=(0, 1e-5),
        difficulty="easy", source_exam="JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    # ── ROTATIONAL MOTION ────────────────────────────────────────────────

    ProblemTemplate(
        name="phy_rotational_ke",
        subject="physics", class_levels=[11, 12],
        concepts=["rotational_motion", "moment_of_inertia", "kinetic_energy"],
        code_lines=[
            "I = {I}  # moment of inertia (kg m^2)",
            "omega = {omega}  # angular velocity (rad/s)",
            "ke = 0.5 * I * omega * omega",
            "result = ke",
        ],
        inputs=["I", "omega"], output_var="result",
        units="J", verify_range=(0, 1e8), expected_sign="positive",
        difficulty="easy", source_exam="JEE Main/NEET",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="phy_torque",
        subject="physics", class_levels=[11, 12],
        concepts=["rotational_motion", "torque"],
        code_lines=[
            "I = {I}",
            "alpha = {alpha}  # angular acceleration (rad/s^2)",
            "torque = I * alpha",
            "result = torque",
        ],
        inputs=["I", "alpha"], output_var="result",
        units="N m", verify_range=(0, 10000), expected_sign="positive",
        difficulty="easy", source_exam="JEE Main/CBSE",
        bloom_levels=["apply"],
    ),

    # ── CHEMISTRY (highest weightage in NEET) ─────────────────────────────

    ProblemTemplate(
        name="chem_mole_concept",
        subject="chemistry", class_levels=[11, 12],
        concepts=["mole_concept", "stoichiometry"],
        code_lines=[
            "mass = {mass}  # grams",
            "molar_mass = {molar_mass}  # g/mol",
            "moles = mass / molar_mass",
            "result = moles",
        ],
        inputs=["mass", "molar_mass"], output_var="result",
        units="mol", verify_range=(0, 1000), expected_sign="positive",
        difficulty="easy", source_exam="NEET/CBSE/JEE Main",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="chem_molarity",
        subject="chemistry", class_levels=[11, 12],
        concepts=["molarity", "solutions"],
        code_lines=[
            "moles_solute = {moles}",
            "volume_liters = {volume}",
            "molarity = moles_solute / volume_liters",
            "result = molarity",
        ],
        inputs=["moles", "volume"], output_var="result",
        units="M", verify_range=(0, 100), expected_sign="positive",
        difficulty="easy", source_exam="NEET/CBSE",
        bloom_levels=["apply"],
    ),

    # ── MATHS (CBSE Class 12 + JEE Main) ────────────────────────────────

    ProblemTemplate(
        name="maths_quadratic_roots",
        subject="maths", class_levels=[10, 11, 12],
        concepts=["quadratic_equations", "algebra"],
        code_lines=[
            "a = {a}",
            "b = {b}",
            "c = {c}",
            "discriminant = b * b - 4 * a * c",
            "if discriminant >= 0:",
            "    root1 = (-b + math.sqrt(discriminant)) / (2 * a)",
            "    root2 = (-b - math.sqrt(discriminant)) / (2 * a)",
            "    result = root1",
            "else:",
            "    result = discriminant",
        ],
        inputs=["a", "b", "c"], output_var="result",
        units="", verify_range=(-1000, 1000),
        difficulty="easy", source_exam="CBSE/JEE Main",
        bloom_levels=["apply"],
    ),

    ProblemTemplate(
        name="maths_probability_basic",
        subject="maths", class_levels=[10, 11, 12],
        concepts=["probability"],
        code_lines=[
            "favorable = {favorable}",
            "total = {total}",
            "probability = favorable / total",
            "result = probability",
        ],
        inputs=["favorable", "total"], output_var="result",
        units="", verify_range=(0, 1), expected_sign="positive",
        difficulty="easy", source_exam="CBSE/JEE Main",
        bloom_levels=["apply"],
    ),
]

# Combined export
ALL_TEMPLATES = PHYSICS_TEMPLATES

def get_templates_by_subject(subject: str) -> list:
    """Filter templates by subject name."""
    return [t for t in ALL_TEMPLATES if t.subject == subject.lower()]

def get_templates_by_class(class_level: int) -> list:
    """Filter templates by class level."""
    return [t for t in ALL_TEMPLATES if class_level in t.class_levels]

def get_template(name: str) -> "ProblemTemplate":
    """Get a template by name."""
    for t in ALL_TEMPLATES:
        if t.name == name:
            return t
    raise ValueError(f"Template '{name}' not found. Available: {[t.name for t in ALL_TEMPLATES]}")
