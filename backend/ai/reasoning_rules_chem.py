"""Chemistry rules for the reasoning engine."""

from backend.ai.reasoning_engine import Rule

CHEMISTRY_RULES = [
    # ----------------------------------------------------------------- #
    # SOLUTIONS & COLLIGATIVE PROPERTIES
    # ----------------------------------------------------------------- #
    Rule(
        name="osmotic_pressure_molar_mass",
        node_id="chem_c12_solutions_osmotic",
        subject="chemistry",
        keywords=["osmotic pressure", "protein", "solution", "molar mass", "organic"],
        formula="m * R * T / (pi * V)",
        variables={"m": "mass", "R": "gas_constant", "T": "temperature", "pi": "pressure", "V": "volume"},
        unknown="M",
        explanation="Osmotic pressure formula: πV = (m/M)RT → M = mRT/(πV)",
        defaults={"R": 0.0821},
    ),
    Rule(
        name="isotonic_solution",
        node_id="chem_c12_solutions_isotonic",
        subject="chemistry",
        keywords=["isotonic", "glucose", "urea", "non-volatile solute"],
        formula="C2 * M1 / C1",
        variables={"C1": "concentration1", "M1": "molar_mass1", "C2": "concentration2"},
        unknown="M2",
        explanation="Isotonic solutions have equal osmotic pressure: C₁/M₁ = C₂/M₂ → M₂ = C₂×M₁/C₁",
        defaults={},
    ),

    # ----------------------------------------------------------------- #
    # ELECTROCHEMISTRY
    # ----------------------------------------------------------------- #
    Rule(
        name="faraday_electroplating",
        node_id="chem_c12_electrochemistry_faraday",
        subject="chemistry",
        keywords=["electroplate", "electroplating", "coulombs", "aluminium", "deposition", "electrode reaction", "Al3"],
        formula="m * z * F / M",
        variables={"m": "mass", "z": "valence", "F": "faraday_constant", "M": "molar_mass"},
        unknown="Q",
        explanation="Faraday's law: Q = (m/M) × z × F, where z = valence (3 for Al³⁺), F = 96500 C/mol",
        defaults={"F": 96500, "z": 3, "M": 27},
    ),

    # ----------------------------------------------------------------- #
    # CHEMICAL KINETICS
    # ----------------------------------------------------------------- #
    Rule(
        name="rate_constant_order",
        node_id="chem_c12_kinetics_order",
        subject="chemistry",
        keywords=["rate constant", "per second", "order of the reaction", "order"],
        formula="first order",  # string answer, not a number
        variables={},
        unknown="order",
        explanation="Rate constant with units s⁻¹ (per second) indicates first order reaction",
        defaults={},
    ),

    # ----------------------------------------------------------------- #
    # STOICHIOMETRY
    # ----------------------------------------------------------------- #
    Rule(
        name="moles_from_mass",
        node_id="chem_c12_stoichiometry_moles",
        subject="chemistry",
        keywords=["moles", "molar mass", "number of moles"],
        formula="m / M",
        variables={"m": "mass", "M": "molar_mass"},
        unknown="n",
        explanation="Number of moles: n = m/M",
    ),
]
