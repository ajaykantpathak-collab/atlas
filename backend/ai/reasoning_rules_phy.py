"""Physics rules for the reasoning engine."""

from backend.ai.reasoning_engine import Rule

PHYSICS_RULES = [
    # ----------------------------------------------------------------- #
    # OPTICS
    # ----------------------------------------------------------------- #
    Rule(
        name="lens_maker_double_convex",
        node_id="phy_c12_optics_lens",
        subject="physics",
        keywords=["lens", "double convex", "refractive index", "radius of curvature", "focal length equal", "either surface"],
        formula="Rational(3, 2)",  # n = 1.5 for double convex with f = R
        variables={},
        unknown="n",
        explanation="Lens maker's formula: 1/f = (n-1)(1/R₁ - 1/R₂). For double convex with f=R: R₁=R, R₂=-R → 1/R = (n-1)(2/R) → n = 3/2 = 1.5",
        defaults={},
    ),
    Rule(
        name="lens_makers_general",
        node_id="phy_c12_optics_lens",
        subject="physics",
        keywords=["lens", "refractive index", "radius of curvature", "focal length"],
        formula="1 / ((n - 1) * (1/R1 - 1/R2))",
        variables={"n": "refractive_index", "R1": "radius1", "R2": "radius2"},
        unknown="f",
        explanation="Lens maker's formula: 1/f = (n-1)(1/R₁ - 1/R₂)",
    ),

    # ----------------------------------------------------------------- #
    # MODERN PHYSICS
    # ----------------------------------------------------------------- #
    Rule(
        name="de_broglie",
        node_id="phy_c12_modern_debroglie",
        subject="physics",
        keywords=["de broglie", "wavelength", "momentum"],
        formula="h / p",
        variables={"h": "planck_constant", "p": "momentum"},
        unknown="lambda",
        explanation="de Broglie wavelength: λ = h/p, where h = Planck's constant, p = momentum",
        defaults={"h": 6.626e-34},
    ),
    Rule(
        name="photoelectric_energy",
        node_id="phy_c12_modern_photoelectric",
        subject="physics",
        keywords=["photoelectric", "work function", "threshold", "photon energy"],
        formula="h * f - W",
        variables={"h": "planck_constant", "f": "frequency", "W": "work_function"},
        unknown="KE",
        explanation="Photoelectric effect: KE = hf - W",
        defaults={"h": 6.626e-34},
    ),

    # ----------------------------------------------------------------- #
    # CURRENT ELECTRICITY
    # ----------------------------------------------------------------- #
    Rule(
        name="drift_speed",
        node_id="phy_c12_current_drift",
        subject="physics",
        keywords=["drift speed", "drift velocity", "free electrons", "metallic wire", "potential difference"],
        formula="V / (n * A * e * R)",
        variables={"V": "voltage", "n": "electron_density", "A": "area", "e": "electron_charge", "R": "resistivity"},
        unknown="vd",
        explanation="Drift speed: v_d = V/(nAeR). Since v_d ∝ V, if V doubles, drift speed doubles.",
        defaults={},
    ),

    # ----------------------------------------------------------------- #
    # MAGNETIC EFFECTS
    # ----------------------------------------------------------------- #
    Rule(
        name="magnetic_field_coil",
        node_id="phy_c12_magnetism_coil",
        subject="physics",
        keywords=["magnetic field", "circular coil", "coil", "turns", "radius"],
        formula="mu0 * N * I / (2 * R)",
        variables={"N": "turns", "I": "current", "R": "radius", "mu0": "permeability"},
        unknown="B",
        explanation="Magnetic field at center of circular coil: B = μ₀NI/(2R)",
        defaults={"mu0": 1.2566e-6},
    ),

    # ----------------------------------------------------------------- #
    # ELECTROSTATICS
    # ----------------------------------------------------------------- #
    Rule(
        name="coulombs_law",
        node_id="phy_c12_electrostatics_coulomb",
        subject="physics",
        keywords=["coulomb", "charge", "force between", "electric force"],
        formula="k * q1 * q2 / r**2",
        variables={"q1": "charge", "q2": "charge2", "r": "distance", "k": "coulomb_constant"},
        unknown="F",
        explanation="Coulomb's law: F = k·q₁·q₂/r²",
        defaults={"k": 9e9},
    ),
    Rule(
        name="capacitor_energy",
        node_id="phy_c12_electrostatics_capacitor",
        subject="physics",
        keywords=["capacitor", "energy stored", "capacitance"],
        formula="Rational(1,2) * C * V**2",
        variables={"C": "capacitance", "V": "voltage"},
        unknown="E",
        explanation="Energy stored in a capacitor: U = ½CV²",
    ),
]
