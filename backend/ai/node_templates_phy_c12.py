"""Node-mapped templates for Physics Class 12 (CISCE/ISC).

Each template is traceable to a specific atomic curriculum node via `node_id`.
Formulas sourced from the CISCE Physics formula bank (c11_c12).

Computable nodes: ~50 out of 140 total.
Remaining 90 nodes are conceptual/descriptive → routed to enrichment.
"""

PHY_C12_NODE_TEMPLATES = [

# c12_phy_003: Coulomb's law (vector form) — F = kq₁q₂/r²
{
    "template_name": "c12_phy_003_coulombs_law",
    "node_id": "c12_phy_003",
    "normalized_pattern": "find electric force between two charges if charge values distance given coulomb",
    "keywords": ["coulomb", "electric force", "two charges", "charge", "force between"],
    "variables": [
        {"name": "q1", "patterns": [r"q1\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"charge\s*1\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"first charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*[μu]?C.*(?:and|,).*?(\d+\.?\d*(?:e[+-]?\d+)?)\s*[μu]?C"], "required": True},
        {"name": "q2", "patterns": [r"q2\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"charge\s*2\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"second charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "r", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"separation\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*(?:m|cm)\s*(?:apart|away|distance|separation)"], "required": True},
        {"name": "r_unit", "patterns": [r"distance\s*[=:]\s*\d+\.?\d*\s*(cm)", r"separation\s*[=:]\s*\d+\.?\d*\s*(cm)", r"(\d+\.?\d*)\s*(cm)\s*(?:apart|away)"], "required": False, "default": "m"},
    ],
    "steps": [
        {"command": "calculate 9e9 * {q1} * {q2} / ({r}**2)", "purpose": "Find force using F = kq₁q₂/r² (k = 9×10⁹, charges in C, distance in m)"},
    ],
    "subject": "phy",
    "node_id": "c12_phy_003",
},

# c12_phy_006: Electric field (E = F/q₀)
{
    "template_name": "c12_phy_006_electric_field_def",
    "node_id": "c12_phy_006",
    "normalized_pattern": "find electric field if force and test charge given",
    "keywords": ["electric field", "force", "test charge", "field strength"],
    "variables": [
        {"name": "F", "patterns": [r"force\s*[=:]\s*(\d+\.?\d*)", r"F\s*[=:]\s*(\d+\.?\d*)\s*N", r"(\d+\.?\d*)\s*N\s*(?:force|experienced)"], "required": True},
        {"name": "q", "patterns": [r"(?:test )?charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"q\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*[μu]?C\s*(?:test )?charge"], "required": True},
    ],
    "steps": [
        {"command": "calculate {F} / {q}", "purpose": "Find electric field using E = F/q₀"},
    ],
    "subject": "phy",
},

# c12_phy_007: Electric field due to point charge — E = kq/r²
{
    "template_name": "c12_phy_007_field_point_charge",
    "node_id": "c12_phy_007",
    "normalized_pattern": "find electric field due to point charge if charge distance given",
    "keywords": ["electric field", "point charge", "field due to", "charge"],
    "variables": [
        {"name": "q", "patterns": [r"charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"q\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*[μu]?C"], "required": True},
        {"name": "r", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*(?:m|cm)\s*(?:away|from|apart|distance)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 9e9 * {q} / ({r}**2)", "purpose": "Find electric field using E = kq/r²"},
    ],
    "subject": "phy",
},

# c12_phy_010: Torque on a dipole — τ = pE sinθ
{
    "template_name": "c12_phy_010_torque_dipole",
    "node_id": "c12_phy_010",
    "normalized_pattern": "find torque on dipole if dipole moment field angle given",
    "keywords": ["torque", "dipole", "dipole moment", "electric field", "angle"],
    "variables": [
        {"name": "p", "patterns": [r"dipole moment\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"p\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "E", "patterns": [r"(?:electric )?field\s*[=:]\s*(\d+\.?\d*)", r"E\s*[=:]\s*(\d+\.?\d*)\s*(?:N/C|V/m)"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"theta\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": False, "default": "90"},
    ],
    "steps": [
        {"command": "calculate {p} * {E} * sin({theta} * 3.14159 / 180)", "purpose": "Find torque using τ = pE sinθ"},
    ],
    "subject": "phy",
},

# c12_phy_016: Electric potential — V = kq/r
{
    "template_name": "c12_phy_016_electric_potential",
    "node_id": "c12_phy_016",
    "normalized_pattern": "find electric potential due to point charge if charge distance given",
    "keywords": ["electric potential", "potential", "point charge", "volt"],
    "variables": [
        {"name": "q", "patterns": [r"charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"q\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*[μu]?C"], "required": True},
        {"name": "r", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*(?:m|cm)\s*(?:away|from|apart|distance)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 9e9 * {q} / {r}", "purpose": "Find potential using V = kq/r"},
    ],
    "subject": "phy",
},

# c12_phy_020: Electrostatic PE — U = qV
{
    "template_name": "c12_phy_020_electrostatic_pe",
    "node_id": "c12_phy_020",
    "normalized_pattern": "find electrostatic potential energy if charge and potential given",
    "keywords": ["potential energy", "electrostatic", "charge", "potential"],
    "variables": [
        {"name": "q", "patterns": [r"charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"q\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "V", "patterns": [r"potential\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)\s*V"], "required": True},
    ],
    "steps": [
        {"command": "calculate {q} * {V}", "purpose": "Find PE using U = qV"},
    ],
    "subject": "phy",
},

# c12_phy_021: PE of system of two charges — U = kq₁q₂/r
{
    "template_name": "c12_phy_021_pe_two_charges",
    "node_id": "c12_phy_021",
    "normalized_pattern": "find potential energy of system of two charges if charges distance given",
    "keywords": ["potential energy", "system", "two charges", "charges"],
    "variables": [
        {"name": "q1", "patterns": [r"q1\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"charge\s*1\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "q2", "patterns": [r"q2\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"charge\s*2\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "r", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"separation\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 9e9 * {q1} * {q2} / {r}", "purpose": "Find PE using U = kq₁q₂/r"},
    ],
    "subject": "phy",
},

# c12_phy_022: Capacitance — C = Q/V
{
    "template_name": "c12_phy_022_capacitance",
    "node_id": "c12_phy_022",
    "normalized_pattern": "find capacitance if charge and voltage given",
    "keywords": ["capacitance", "charge", "voltage", "capacitor"],
    "variables": [
        {"name": "Q", "patterns": [r"charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"Q\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*[μu]?C"], "required": True},
        {"name": "V", "patterns": [r"voltage\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)\s*V", r"potential\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {Q} / {V}", "purpose": "Find capacitance using C = Q/V"},
    ],
    "subject": "phy",
},

# c12_phy_023: Parallel plate capacitor — C = ε₀A/d
{
    "template_name": "c12_phy_023_parallel_plate_capacitor",
    "node_id": "c12_phy_023",
    "normalized_pattern": "find capacitance of parallel plate capacitor if area separation given",
    "keywords": ["parallel plate", "capacitor", "area", "separation", "distance between plates"],
    "variables": [
        {"name": "A", "patterns": [r"area\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"A\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:m2|cm2|mm2)"], "required": True},
        {"name": "d", "patterns": [r"separation\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"distance\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"d\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*mm\s*(?:separation|apart|between)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 8.854e-12 * {A} / {d}", "purpose": "Find capacitance using C = ε₀A/d (area in m², d in m)"},
    ],
    "subject": "phy",
},

# c12_phy_024: Capacitors in series — 1/C = 1/C1 + 1/C2
{
    "template_name": "c12_phy_024_capacitors_series",
    "node_id": "c12_phy_024",
    "normalized_pattern": "find equivalent capacitance of capacitors in series",
    "keywords": ["capacitors", "series", "equivalent capacitance", "combination"],
    "variables": [
        {"name": "C1", "patterns": [r"C1\s*[=:]\s*(\d+\.?\d*)", r"first capacitor\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*[μu]?F.*series"], "required": True},
        {"name": "C2", "patterns": [r"C2\s*[=:]\s*(\d+\.?\d*)", r"second capacitor\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (1/{C1} + 1/{C2})", "purpose": "Find series capacitance using 1/C = 1/C₁ + 1/C₂"},
    ],
    "subject": "phy",
},

# c12_phy_024: Capacitors in parallel — C = C1 + C2
{
    "template_name": "c12_phy_024_capacitors_parallel",
    "node_id": "c12_phy_024",
    "normalized_pattern": "find equivalent capacitance of capacitors in parallel",
    "keywords": ["capacitors", "parallel", "equivalent capacitance", "combination"],
    "variables": [
        {"name": "C1", "patterns": [r"C1\s*[=:]\s*(\d+\.?\d*)", r"first capacitor\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*[μu]?F.*parallel"], "required": True},
        {"name": "C2", "patterns": [r"C2\s*[=:]\s*(\d+\.?\d*)", r"second capacitor\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {C1} + {C2}", "purpose": "Find parallel capacitance using C = C₁ + C₂"},
    ],
    "subject": "phy",
},

# c12_phy_027: Drift velocity — v_d = I/(nAe)
{
    "template_name": "c12_phy_027_drift_velocity",
    "node_id": "c12_phy_027",
    "normalized_pattern": "find drift velocity if current electron density area given",
    "keywords": ["drift velocity", "current", "electron density", "area", "conductor"],
    "variables": [
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
        {"name": "n", "patterns": [r"(?:electron )?density\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"n\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "A", "patterns": [r"area\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"A\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"cross.?section\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {I} / ({n} * {A} * 1.6e-19)", "purpose": "Find drift velocity using v_d = I/(nAe), e = 1.6×10⁻¹⁹"},
    ],
    "subject": "phy",
},

# c12_phy_031: Emf and internal resistance — ε = V + Ir
{
    "template_name": "c12_phy_031_emf_internal_resistance",
    "node_id": "c12_phy_031",
    "normalized_pattern": "find emf if terminal voltage current internal resistance given",
    "keywords": ["emf", "terminal voltage", "internal resistance", "cell", "battery"],
    "variables": [
        {"name": "V", "patterns": [r"(?:terminal )?voltage\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)\s*V"], "required": True},
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
        {"name": "r", "patterns": [r"internal resistance\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)\s*[Oo]hm"], "required": True},
    ],
    "steps": [
        {"command": "calculate {V} + {I} * {r}", "purpose": "Find emf using ε = V + Ir"},
    ],
    "subject": "phy",
},

# c12_phy_032: Terminal voltage — V = ε - Ir
{
    "template_name": "c12_phy_032_terminal_voltage",
    "node_id": "c12_phy_032",
    "normalized_pattern": "find terminal voltage if emf current internal resistance given",
    "keywords": ["terminal voltage", "emf", "internal resistance", "cell", "battery", "lost volts"],
    "variables": [
        {"name": "emf", "patterns": [r"emf\s*[=:]\s*(\d+\.?\d*)", r"epsilon\s*[=:]\s*(\d+\.?\d*)", r"E\s*[=:]\s*(\d+\.?\d*)\s*V"], "required": True},
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
        {"name": "r", "patterns": [r"internal resistance\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)\s*[Oo]hm"], "required": True},
    ],
    "steps": [
        {"command": "calculate {emf} - {I} * {r}", "purpose": "Find terminal voltage using V = ε - Ir"},
    ],
    "subject": "phy",
},

# c12_phy_034: Wheatstone bridge — P/Q = R/S (find unknown)
{
    "template_name": "c12_phy_034_wheatstone_bridge",
    "node_id": "c12_phy_034",
    "normalized_pattern": "find unknown resistance in wheatstone bridge if three resistances given",
    "keywords": ["wheatstone", "bridge", "balanced", "resistance", "galvanometer"],
    "variables": [
        {"name": "P", "patterns": [r"P\s*[=:]\s*(\d+\.?\d*)", r"first arm\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*[Oo]hm.*arm\s*P"], "required": True},
        {"name": "Q", "patterns": [r"Q\s*[=:]\s*(\d+\.?\d*)", r"second arm\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [r"R\s*[=:]\s*(\d+\.?\d*)", r"third arm\s*[=:]\s*(\d+\.?\d*)", r"known resistance\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {P} * {R} / {Q}", "purpose": "Find unknown S using P/Q = R/S → S = QR/P"},
    ],
    "subject": "phy",
},

# c12_phy_036: Potentiometer — ε₁/ε₂ = L₁/L₂
{
    "template_name": "c12_phy_036_potentiometer_emf",
    "node_id": "c12_phy_036",
    "normalized_pattern": "find emf using potentiometer if balance length given",
    "keywords": ["potentiometer", "balance length", "emf", "comparison"],
    "variables": [
        {"name": "emf1", "patterns": [r"(?:emf|e)1\s*[=:]\s*(\d+\.?\d*)", r"first (?:emf|cell)\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "L1", "patterns": [r"L1\s*[=:]\s*(\d+\.?\d*)", r"balance length\s*1\s*[=:]\s*(\d+\.?\d*)", r"first length\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "L2", "patterns": [r"L2\s*[=:]\s*(\d+\.?\d*)", r"balance length\s*2\s*[=:]\s*(\d+\.?\d*)", r"second length\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {emf1} * {L2} / {L1}", "purpose": "Find ε₂ using ε₁/ε₂ = L₁/L₂ → ε₂ = ε₁L₂/L₁"},
    ],
    "subject": "phy",
},

# c12_phy_036: Potentiometer internal resistance — r = R(L₁-L₂)/L₂
{
    "template_name": "c12_phy_036_potentiometer_internal_r",
    "node_id": "c12_phy_036",
    "normalized_pattern": "find internal resistance using potentiometer if balance lengths and external resistance given",
    "keywords": ["potentiometer", "internal resistance", "balance length", "external resistance"],
    "variables": [
        {"name": "R", "patterns": [r"(?:external |known )?resistance\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)\s*[Oo]hm"], "required": True},
        {"name": "L1", "patterns": [r"L1\s*[=:]\s*(\d+\.?\d*)", r"open circuit\s*(?:length|balance)\s*[=:]\s*(\d+\.?\d*)", r"first length\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "L2", "patterns": [r"L2\s*[=:]\s*(\d+\.?\d*)", r"closed circuit\s*(?:length|balance)\s*[=:]\s*(\d+\.?\d*)", r"second length\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {R} * ({L1} - {L2}) / {L2}", "purpose": "Find internal resistance using r = R(L₁-L₂)/L₂"},
    ],
    "subject": "phy",
},

# c12_phy_039: Magnetic field due to circular loop — B = μ₀NI/(2R)
{
    "template_name": "c12_phy_039_field_circular_loop",
    "node_id": "c12_phy_039",
    "normalized_pattern": "find magnetic field at center of circular loop if current radius turns given",
    "keywords": ["magnetic field", "circular loop", "coil", "center", "centre", "turns", "radius"],
    "variables": [
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
        {"name": "R", "patterns": [r"radius\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)\s*(?:m|cm)"], "required": True},
        {"name": "N", "patterns": [r"turns\s*[=:]\s*(\d+\.?\d*)", r"N\s*[=:]\s*(\d+\.?\d*)", r"(\d+)\s*turns?", r"(\d+)\s*loops?"], "required": False, "default": "1"},
    ],
    "steps": [
        {"command": "calculate 1.257e-6 * {N} * {I} / (2 * {R})", "purpose": "Find B using B = μ₀NI/(2R), μ₀ = 4π×10⁻⁷"},
    ],
    "subject": "phy",
},

# c12_phy_040: Magnetic field due to solenoid — B = μ₀nI
{
    "template_name": "c12_phy_040_field_solenoid",
    "node_id": "c12_phy_040",
    "normalized_pattern": "find magnetic field inside solenoid if current turns per length given",
    "keywords": ["magnetic field", "solenoid", "inside", "turns", "current"],
    "variables": [
        {"name": "n", "patterns": [r"turns per (?:metre|meter|m)\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)", r"(\d+)\s*turns?\s*/\s*m"], "required": True},
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1.257e-6 * {n} * {I}", "purpose": "Find B using B = μ₀nI, μ₀ = 4π×10⁻⁷"},
    ],
    "subject": "phy",
},

# c12_phy_042: Force on moving charge — F = qvB sinθ
{
    "template_name": "c12_phy_042_force_moving_charge",
    "node_id": "c12_phy_042",
    "normalized_pattern": "find force on moving charge in magnetic field if charge velocity field given",
    "keywords": ["force", "moving charge", "magnetic field", "velocity", "lorentz"],
    "variables": [
        {"name": "q", "patterns": [r"charge\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"q\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*[μu]?C"], "required": True},
        {"name": "v", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"speed\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"v\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m/s"], "required": True},
        {"name": "B", "patterns": [r"(?:magnetic )?field\s*[=:]\s*(\d+\.?\d*)", r"B\s*[=:]\s*(\d+\.?\d*)\s*T"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": False, "default": "90"},
    ],
    "steps": [
        {"command": "calculate {q} * {v} * {B} * sin({theta} * 3.14159 / 180)", "purpose": "Find force using F = qvB sinθ"},
    ],
    "subject": "phy",
},

# c12_phy_044: Force on current-carrying conductor — F = IlB sinθ
{
    "template_name": "c12_phy_044_force_conductor",
    "node_id": "c12_phy_044",
    "normalized_pattern": "find force on current carrying conductor in magnetic field",
    "keywords": ["force", "conductor", "current", "magnetic field", "length", "wire"],
    "variables": [
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
        {"name": "l", "patterns": [r"length\s*[=:]\s*(\d+\.?\d*)", r"l\s*[=:]\s*(\d+\.?\d*)\s*m"], "required": True},
        {"name": "B", "patterns": [r"(?:magnetic )?field\s*[=:]\s*(\d+\.?\d*)", r"B\s*[=:]\s*(\d+\.?\d*)\s*T"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": False, "default": "90"},
    ],
    "steps": [
        {"command": "calculate {I} * {l} * {B} * sin({theta} * 3.14159 / 180)", "purpose": "Find force using F = IlB sinθ"},
    ],
    "subject": "phy",
},

# c12_phy_045: Force between parallel wires — F/l = μ₀I₁I₂/(2πd)
{
    "template_name": "c12_phy_045_force_parallel_wires",
    "node_id": "c12_phy_045",
    "normalized_pattern": "find force per unit length between two parallel current carrying wires",
    "keywords": ["force", "parallel", "wires", "conductors", "current", "per unit length"],
    "variables": [
        {"name": "I1", "patterns": [r"I1\s*[=:]\s*(\d+\.?\d*)", r"current\s*1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "I2", "patterns": [r"I2\s*[=:]\s*(\d+\.?\d*)", r"current\s*2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "d", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"separation\s*[=:]\s*(\d+\.?\d*)", r"d\s*[=:]\s*(\d+\.?\d*)\s*m"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1.257e-6 * {I1} * {I2} / (2 * 3.14159 * {d})", "purpose": "Find F/l using F/l = μ₀I₁I₂/(2πd)"},
    ],
    "subject": "phy",
},

# c12_phy_046: Torque on current loop — τ = NIAB sinθ
{
    "template_name": "c12_phy_046_torque_current_loop",
    "node_id": "c12_phy_046",
    "normalized_pattern": "find torque on current loop if turns current area field angle given",
    "keywords": ["torque", "current loop", "coil", "magnetic field", "turns", "area"],
    "variables": [
        {"name": "N", "patterns": [r"turns\s*[=:]\s*(\d+\.?\d*)", r"N\s*[=:]\s*(\d+\.?\d*)", r"(\d+)\s*turns?"], "required": False, "default": "1"},
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
        {"name": "A", "patterns": [r"area\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"A\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m2"], "required": True},
        {"name": "B", "patterns": [r"(?:magnetic )?field\s*[=:]\s*(\d+\.?\d*)", r"B\s*[=:]\s*(\d+\.?\d*)\s*T"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": False, "default": "90"},
    ],
    "steps": [
        {"command": "calculate {N} * {I} * {A} * {B} * sin({theta} * 3.14159 / 180)", "purpose": "Find torque using τ = NIAB sinθ"},
    ],
    "subject": "phy",
},

# c12_phy_048: Galvanometer to ammeter — shunt S = IgRg/(I-Ig)
{
    "template_name": "c12_phy_048_galvanometer_ammeter",
    "node_id": "c12_phy_048",
    "normalized_pattern": "find shunt resistance to convert galvanometer to ammeter",
    "keywords": ["galvanometer", "ammeter", "shunt", "convert", "full scale"],
    "variables": [
        {"name": "Ig", "patterns": [r"Ig\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"galvanometer current\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"full scale\s*(?:deflection\s*)?current\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "Rg", "patterns": [r"Rg\s*[=:]\s*(\d+\.?\d*)", r"galvanometer resistance\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "I", "patterns": [r"(?:range|full scale|ammeter)\s*(?:current\s*)?[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A.*range"], "required": True},
    ],
    "steps": [
        {"command": "calculate {Ig} * {Rg} / ({I} - {Ig})", "purpose": "Find shunt using S = I_gR_g/(I-I_g)"},
    ],
    "subject": "phy",
},

# c12_phy_049: Galvanometer to voltmeter — R = V/Ig - Rg
{
    "template_name": "c12_phy_049_galvanometer_voltmeter",
    "node_id": "c12_phy_049",
    "normalized_pattern": "find series resistance to convert galvanometer to voltmeter",
    "keywords": ["galvanometer", "voltmeter", "series resistance", "convert", "full scale"],
    "variables": [
        {"name": "V", "patterns": [r"(?:range|voltmeter)\s*(?:voltage\s*)?[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)\s*V.*range"], "required": True},
        {"name": "Ig", "patterns": [r"Ig\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"galvanometer current\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"full scale\s*(?:deflection\s*)?current\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "Rg", "patterns": [r"Rg\s*[=:]\s*(\d+\.?\d*)", r"galvanometer resistance\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {V} / {Ig} - {Rg}", "purpose": "Find series resistance using R = V/I_g - R_g"},
    ],
    "subject": "phy",
},

# c12_phy_056: Magnetic flux — Φ = BA cosθ
{
    "template_name": "c12_phy_056_magnetic_flux",
    "node_id": "c12_phy_056",
    "normalized_pattern": "find magnetic flux if field area angle given",
    "keywords": ["magnetic flux", "field", "area", "angle", "weber"],
    "variables": [
        {"name": "B", "patterns": [r"(?:magnetic )?field\s*[=:]\s*(\d+\.?\d*)", r"B\s*[=:]\s*(\d+\.?\d*)\s*T"], "required": True},
        {"name": "A", "patterns": [r"area\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"A\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m2"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": False, "default": "0"},
    ],
    "steps": [
        {"command": "calculate {B} * {A} * cos({theta} * 3.14159 / 180)", "purpose": "Find flux using Φ = BA cosθ"},
    ],
    "subject": "phy",
},

# c12_phy_060: Motional emf — ε = Blv
{
    "template_name": "c12_phy_060_motional_emf",
    "node_id": "c12_phy_060",
    "normalized_pattern": "find induced emf if conductor length field velocity given motional",
    "keywords": ["motional emf", "induced emf", "conductor", "rod", "moving", "magnetic field", "velocity"],
    "variables": [
        {"name": "B", "patterns": [r"(?:magnetic )?field\s*[=:]\s*(\d+\.?\d*)", r"B\s*[=:]\s*(\d+\.?\d*)\s*T"], "required": True},
        {"name": "l", "patterns": [r"length\s*[=:]\s*(\d+\.?\d*)", r"l\s*[=:]\s*(\d+\.?\d*)\s*m"], "required": True},
        {"name": "v", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*)", r"v\s*[=:]\s*(\d+\.?\d*)\s*m/s"], "required": True},
    ],
    "steps": [
        {"command": "calculate {B} * {l} * {v}", "purpose": "Find motional emf using ε = Blv"},
    ],
    "subject": "phy",
},

# c12_phy_063: Transformer — Vp/Vs = Np/Ns
{
    "template_name": "c12_phy_063_transformer_voltage",
    "node_id": "c12_phy_063",
    "normalized_pattern": "find transformer secondary voltage if primary voltage turns ratio given",
    "keywords": ["transformer", "primary", "secondary", "voltage", "turns", "windings"],
    "variables": [
        {"name": "Vp", "patterns": [r"primary voltage\s*[=:]\s*(\d+\.?\d*)", r"Vp\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "Np", "patterns": [r"primary turns\s*[=:]\s*(\d+\.?\d*)", r"Np\s*[=:]\s*(\d+\.?\d*)", r"(\d+)\s*turns?\s*primary"], "required": True},
        {"name": "Ns", "patterns": [r"secondary turns\s*[=:]\s*(\d+\.?\d*)", r"Ns\s*[=:]\s*(\d+\.?\d*)", r"(\d+)\s*turns?\s*secondary"], "required": True},
    ],
    "steps": [
        {"command": "calculate {Vp} * {Ns} / {Np}", "purpose": "Find Vs using Vp/Vs = Np/Ns → Vs = Vp×Ns/Np"},
    ],
    "subject": "phy",
},

# c12_phy_063: Transformer current — Is/Ip = Np/Ns
{
    "template_name": "c12_phy_063_transformer_current",
    "node_id": "c12_phy_063",
    "normalized_pattern": "find transformer secondary current if primary current turns ratio given",
    "keywords": ["transformer", "primary", "secondary", "current", "turns", "windings"],
    "variables": [
        {"name": "Ip", "patterns": [r"primary current\s*[=:]\s*(\d+\.?\d*)", r"Ip\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "Np", "patterns": [r"primary turns\s*[=:]\s*(\d+\.?\d*)", r"Np\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "Ns", "patterns": [r"secondary turns\s*[=:]\s*(\d+\.?\d*)", r"Ns\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {Ip} * {Np} / {Ns}", "purpose": "Find Is using Is/Ip = Np/Ns → Is = Ip×Np/Ns"},
    ],
    "subject": "phy",
},

# c12_phy_064: AC RMS — I_rms = I₀/√2
{
    "template_name": "c12_phy_064_ac_rms_current",
    "node_id": "c12_phy_064",
    "normalized_pattern": "find rms current if peak current given ac circuit",
    "keywords": ["rms", "peak", "current", "ac", "alternating", "maximum"],
    "variables": [
        {"name": "I0", "patterns": [r"peak current\s*[=:]\s*(\d+\.?\d*)", r"maximum current\s*[=:]\s*(\d+\.?\d*)", r"I0\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*A\s*(?:peak|maximum)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {I0} / 1.41421", "purpose": "Find RMS using I_rms = I₀/√2"},
    ],
    "subject": "phy",
},

# c12_phy_064: AC RMS voltage — V_rms = V₀/√2
{
    "template_name": "c12_phy_064_ac_rms_voltage",
    "node_id": "c12_phy_064",
    "normalized_pattern": "find rms voltage if peak voltage given ac circuit",
    "keywords": ["rms", "peak", "voltage", "ac", "alternating", "maximum"],
    "variables": [
        {"name": "V0", "patterns": [r"peak voltage\s*[=:]\s*(\d+\.?\d*)", r"maximum voltage\s*[=:]\s*(\d+\.?\d*)", r"V0\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*V\s*(?:peak|maximum)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {V0} / 1.41421", "purpose": "Find RMS using V_rms = V₀/√2"},
    ],
    "subject": "phy",
},

# c12_phy_066: AC through inductor — XL = 2πfL
{
    "template_name": "c12_phy_066_inductive_reactance",
    "node_id": "c12_phy_066",
    "normalized_pattern": "find inductive reactance if frequency inductance given",
    "keywords": ["inductive reactance", "inductor", "frequency", "inductance", "xl"],
    "variables": [
        {"name": "f", "patterns": [r"frequency\s*[=:]\s*(\d+\.?\d*)", r"f\s*[=:]\s*(\d+\.?\d*)\s*Hz"], "required": True},
        {"name": "L", "patterns": [r"inductance\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"L\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*H"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * 3.14159 * {f} * {L}", "purpose": "Find XL using XL = 2πfL"},
    ],
    "subject": "phy",
},

# c12_phy_067: AC through capacitor — XC = 1/(2πfC)
{
    "template_name": "c12_phy_067_capacitive_reactance",
    "node_id": "c12_phy_067",
    "normalized_pattern": "find capacitive reactance if frequency capacitance given",
    "keywords": ["capacitive reactance", "capacitor", "frequency", "capacitance", "xc"],
    "variables": [
        {"name": "f", "patterns": [r"frequency\s*[=:]\s*(\d+\.?\d*)", r"f\s*[=:]\s*(\d+\.?\d*)\s*Hz"], "required": True},
        {"name": "C", "patterns": [r"capacitance\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"C\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*F"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (2 * 3.14159 * {f} * {C})", "purpose": "Find XC using XC = 1/(2πfC)"},
    ],
    "subject": "phy",
},

# c12_phy_068: LCR impedance — Z = √(R² + (XL-XC)²)
{
    "template_name": "c12_phy_068_lcr_impedance",
    "node_id": "c12_phy_068",
    "normalized_pattern": "find impedance of lcr series circuit if resistance reactances given",
    "keywords": ["impedance", "lcr", "rlc", "series circuit", "resistance", "reactance"],
    "variables": [
        {"name": "R", "patterns": [r"resistance\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)\s*[Oo]hm"], "required": True},
        {"name": "XL", "patterns": [r"XL\s*[=:]\s*(\d+\.?\d*)", r"inductive reactance\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "XC", "patterns": [r"XC\s*[=:]\s*(\d+\.?\d*)", r"capacitive reactance\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate sqrt({R}**2 + ({XL} - {XC})**2)", "purpose": "Find impedance using Z = √(R² + (XL-XC)²)"},
    ],
    "subject": "phy",
},

# c12_phy_069: Resonance frequency — fr = 1/(2π√(LC))
{
    "template_name": "c12_phy_069_resonance_frequency",
    "node_id": "c12_phy_069",
    "normalized_pattern": "find resonance frequency of lcr circuit if inductance capacitance given",
    "keywords": ["resonance", "frequency", "lcr", "rlc", "inductance", "capacitance"],
    "variables": [
        {"name": "L", "patterns": [r"inductance\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"L\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*H"], "required": True},
        {"name": "C", "patterns": [r"capacitance\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"C\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*F"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (2 * 3.14159 * sqrt({L} * {C}))", "purpose": "Find resonance frequency using fr = 1/(2π√(LC))"},
    ],
    "subject": "phy",
},

# c12_phy_070: Power in AC — P = VI cosφ
{
    "template_name": "c12_phy_070_ac_power",
    "node_id": "c12_phy_070",
    "normalized_pattern": "find power in ac circuit if voltage current power factor given",
    "keywords": ["power", "ac", "voltage", "current", "power factor", "cos phi", "cosθ"],
    "variables": [
        {"name": "V", "patterns": [r"voltage\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)\s*V"], "required": True},
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)\s*A"], "required": True},
        {"name": "cosphi", "patterns": [r"power factor\s*[=:]\s*(\d+\.?\d*)", r"cos\s*phi\s*[=:]\s*(\d+\.?\d*)", r"cosθ\s*[=:]\s*(\d+\.?\d*)", r"cos\s*\(?\s*(\d+\.?\d*)\s*degree"], "required": False, "default": "1"},
    ],
    "steps": [
        {"command": "calculate {V} * {I} * {cosphi}", "purpose": "Find power using P = VI cosφ"},
    ],
    "subject": "phy",
},

# c12_phy_077: Mirror formula — 1/v + 1/u = 1/f
{
    "template_name": "c12_phy_077_mirror_formula",
    "node_id": "c12_phy_077",
    "normalized_pattern": "find image distance using mirror formula if object distance focal length given",
    "keywords": ["mirror", "image distance", "object distance", "focal length", "concave", "convex"],
    "variables": [
        {"name": "u", "patterns": [r"object distance\s*[=:]\s*-?(\d+\.?\d*)", r"u\s*[=:]\s*-?(\d+\.?\d*)", r"object.*?(\d+\.?\d*)\s*cm"], "required": True},
        {"name": "f", "patterns": [r"focal length\s*[=:]\s*-?(\d+\.?\d*)", r"f\s*[=:]\s*-?(\d+\.?\d*)", r"focal.*?(\d+\.?\d*)\s*cm"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (1/{f} - 1/{u})", "purpose": "Find image distance using 1/v + 1/u = 1/f → v = 1/(1/f - 1/u)"},
    ],
    "subject": "phy",
},

# c12_phy_078: Snell's law — n₁ sin i = n₂ sin r
{
    "template_name": "c12_phy_078_snells_law",
    "node_id": "c12_phy_078",
    "normalized_pattern": "find angle of refraction using snells law if angle of incidence and refractive indices given",
    "keywords": ["snell", "refraction", "angle of incidence", "angle of refraction", "refractive index"],
    "variables": [
        {"name": "n1", "patterns": [r"n1\s*[=:]\s*(\d+\.?\d*)", r"first medium\s*[=:]\s*(\d+\.?\d*)", r"refractive index.*?1\s*[=:]\s*(\d+\.?\d*)"], "required": False, "default": "1"},
        {"name": "n2", "patterns": [r"n2\s*[=:]\s*(\d+\.?\d*)", r"second medium\s*[=:]\s*(\d+\.?\d*)", r"refractive index\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "i", "patterns": [r"angle of incidence\s*[=:]\s*(\d+\.?\d*)", r"incidence\s*[=:]\s*(\d+\.?\d*)", r"i\s*[=:]\s*(\d+\.?\d*)\s*degree"], "required": True},
    ],
    "steps": [
        {"command": "calculate asin({n1} * sin({i} * 3.14159 / 180) / {n2}) * 180 / 3.14159", "purpose": "Find angle of refraction using n₁sin i = n₂sin r → r = arcsin(n₁sin i/n₂)"},
    ],
    "subject": "phy",
},

# c12_phy_079: Critical angle — sin C = 1/n
{
    "template_name": "c12_phy_079_critical_angle",
    "node_id": "c12_phy_079",
    "normalized_pattern": "find critical angle if refractive index given total internal reflection",
    "keywords": ["critical angle", "refractive index", "total internal reflection", "tir"],
    "variables": [
        {"name": "n", "patterns": [r"refractive index\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate asin(1 / {n}) * 180 / 3.14159", "purpose": "Find critical angle using sin C = 1/n → C = arcsin(1/n)"},
    ],
    "subject": "phy",
},

# c12_phy_083: Lens maker's formula — 1/f = (n-1)(1/R1 - 1/R2)
{
    "template_name": "c12_phy_083_lens_maker",
    "node_id": "c12_phy_083",
    "normalized_pattern": "find focal length using lens maker formula if refractive index radii given",
    "keywords": ["lens maker", "focal length", "refractive index", "radius of curvature", "lens"],
    "variables": [
        {"name": "n", "patterns": [r"refractive index\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R1", "patterns": [r"R1\s*[=:]\s*(\d+\.?\d*)", r"first radius\s*[=:]\s*(\d+\.?\d*)", r"radius.*?1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R2", "patterns": [r"R2\s*[=:]\s*(\d+\.?\d*)", r"second radius\s*[=:]\s*(\d+\.?\d*)", r"radius.*?2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (({n} - 1) * (1/{R1} - 1/{R2}))", "purpose": "Find focal length using 1/f = (n-1)(1/R₁ - 1/R₂)"},
    ],
    "subject": "phy",
},

# c12_phy_085: Power of a lens — P = 1/f (in meters)
{
    "template_name": "c12_phy_085_lens_power",
    "node_id": "c12_phy_085",
    "normalized_pattern": "find power of lens if focal length given dioptre",
    "keywords": ["power", "lens", "focal length", "dioptre", "diopter"],
    "variables": [
        {"name": "f", "patterns": [r"focal length\s*[=:]\s*(\d+\.?\d*)", r"f\s*[=:]\s*(\d+\.?\d*)\s*(?:m|cm)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / {f}", "purpose": "Find power using P = 1/f (f in meters, P in dioptres)"},
    ],
    "subject": "phy",
},

# c12_phy_090: Young's double slit — fringe width β = λD/d
{
    "template_name": "c12_phy_090_fringe_width",
    "node_id": "c12_phy_090",
    "normalized_pattern": "find fringe width in young double slit if wavelength slit separation screen distance given",
    "keywords": ["fringe width", "young", "double slit", "interference", "wavelength", "slit separation"],
    "variables": [
        {"name": "lam", "patterns": [r"wavelength\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"lambda\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*nm"], "required": True},
        {"name": "D", "patterns": [r"(?:screen )?distance\s*[=:]\s*(\d+\.?\d*)", r"D\s*[=:]\s*(\d+\.?\d*)\s*m"], "required": True},
        {"name": "d", "patterns": [r"slit separation\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"d\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:m|mm)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {lam} * {D} / {d}", "purpose": "Find fringe width using β = λD/d"},
    ],
    "subject": "phy",
},

# c12_phy_093: Einstein's photoelectric equation — hν = φ + KE_max
{
    "template_name": "c12_phy_093_photoelectric_ke",
    "node_id": "c12_phy_093",
    "normalized_pattern": "find maximum kinetic energy of photoelectron if frequency and work function given",
    "keywords": ["photoelectric", "kinetic energy", "work function", "frequency", "einstein", "threshold"],
    "variables": [
        {"name": "freq", "patterns": [r"frequency\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"nu\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*Hz"], "required": True},
        {"name": "phi", "patterns": [r"work function\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"phi\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*)\s*eV\s*(?:work function|threshold)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 6.626e-34 * {freq} - {phi} * 1.6e-19", "purpose": "Find KE_max using hν = φ + KE_max (φ in eV → convert to J)"},
    ],
    "subject": "phy",
},

# c12_phy_093: Stopping potential — KE_max = eV_s
{
    "template_name": "c12_phy_093_stopping_potential",
    "node_id": "c12_phy_093",
    "normalized_pattern": "find stopping potential if frequency and work function given photoelectric",
    "keywords": ["stopping potential", "photoelectric", "work function", "frequency"],
    "variables": [
        {"name": "freq", "patterns": [r"frequency\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*Hz"], "required": True},
        {"name": "phi", "patterns": [r"work function\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*)\s*eV\s*(?:work function|threshold)"], "required": True},
    ],
    "steps": [
        {"command": "calculate (6.626e-34 * {freq} - {phi} * 1.6e-19) / 1.6e-19", "purpose": "Find stopping potential using eV_s = hν - φ → V_s = (hν - φ)/e (in volts)"},
    ],
    "subject": "phy",
},

# c12_phy_094: Photon momentum — p = h/λ
{
    "template_name": "c12_phy_094_photon_momentum",
    "node_id": "c12_phy_094",
    "normalized_pattern": "find momentum of photon if wavelength given",
    "keywords": ["photon", "momentum", "wavelength", "light"],
    "variables": [
        {"name": "lam", "patterns": [r"wavelength\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"lambda\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*nm"], "required": True},
    ],
    "steps": [
        {"command": "calculate 6.626e-34 / {lam}", "purpose": "Find photon momentum using p = h/λ"},
    ],
    "subject": "phy",
},

# c12_phy_094: Photon energy — E = hc/λ
{
    "template_name": "c12_phy_094_photon_energy",
    "node_id": "c12_phy_094",
    "normalized_pattern": "find energy of photon if wavelength given",
    "keywords": ["photon", "energy", "wavelength", "light"],
    "variables": [
        {"name": "lam", "patterns": [r"wavelength\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"lambda\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*nm"], "required": True},
    ],
    "steps": [
        {"command": "calculate 6.626e-34 * 3e8 / {lam}", "purpose": "Find photon energy using E = hc/λ"},
    ],
    "subject": "phy",
},

# c12_phy_101: Energy levels — En = -13.6Z²/n²
{
    "template_name": "c12_phy_101_energy_level",
    "node_id": "c12_phy_101",
    "normalized_pattern": "find energy of electron in nth orbit if atomic number and n given bohr",
    "keywords": ["energy level", "bohr", "orbit", "hydrogen", "atomic number", "electron energy"],
    "variables": [
        {"name": "Z", "patterns": [r"atomic number\s*[=:]\s*(\d+\.?\d*)", r"Z\s*[=:]\s*(\d+\.?\d*)"], "required": False, "default": "1"},
        {"name": "n", "patterns": [r"(?:orbit|level|shell)\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)", r"(\d)(?:st|nd|rd|th)\s+orbit"], "required": True},
    ],
    "steps": [
        {"command": "calculate -13.6 * {Z}**2 / {n}**2", "purpose": "Find energy using E_n = -13.6Z²/n² (in eV)"},
    ],
    "subject": "phy",
},

# c12_phy_102: Rydberg formula — 1/λ = R(1/n₁² - 1/n₂²)
{
    "template_name": "c12_phy_102_rydberg_wavelength",
    "node_id": "c12_phy_102",
    "normalized_pattern": "find wavelength of spectral line if two energy levels given rydberg hydrogen",
    "keywords": ["rydberg", "wavelength", "spectral line", "hydrogen spectrum", "transition", "energy levels"],
    "variables": [
        {"name": "n1", "patterns": [r"n1\s*[=:]\s*(\d+\.?\d*)", r"lower level\s*[=:]\s*(\d+\.?\d*)", r"from.*?n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n2", "patterns": [r"n2\s*[=:]\s*(\d+\.?\d*)", r"upper level\s*[=:]\s*(\d+\.?\d*)", r"to.*?n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (1.097e7 * (1/{n1}**2 - 1/{n2}**2))", "purpose": "Find wavelength using 1/λ = R(1/n₁² - 1/n₂²), R = 1.097×10⁷"},
    ],
    "subject": "phy",
},

# c12_phy_105: Mass-energy — E = mc²
{
    "template_name": "c12_phy_105_mass_energy",
    "node_id": "c12_phy_105",
    "normalized_pattern": "find energy equivalent if mass given einstein mass energy",
    "keywords": ["mass energy", "einstein", "energy equivalent", "mass defect", "e = mc"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"m\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:kg|amu|g)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {m} * (3e8)**2", "purpose": "Find energy using E = mc² (m in kg, E in Joules)"},
    ],
    "subject": "phy",
},

# c12_phy_106: Mass defect and binding energy — BE = Δm·c²
{
    "template_name": "c12_phy_106_binding_energy",
    "node_id": "c12_phy_106",
    "normalized_pattern": "find binding energy if mass defect given nuclear",
    "keywords": ["binding energy", "mass defect", "nuclear", "nucleus"],
    "variables": [
        {"name": "dm", "patterns": [r"mass defect\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"delta m\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:amu|u)\s*(?:mass defect|defect)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {dm} * 931.5", "purpose": "Find binding energy using BE = Δm × 931.5 MeV (Δm in amu)"},
    ],
    "subject": "phy",
},

# c12_phy_132: Mean life — τ = 1/λ = T½/ln2
{
    "template_name": "c12_phy_132_mean_life",
    "node_id": "c12_phy_132",
    "normalized_pattern": "find mean life if half life or decay constant given radioactive",
    "keywords": ["mean life", "half life", "decay constant", "radioactive", "lifetime"],
    "variables": [
        {"name": "Thalf", "patterns": [r"half.?life\s*[=:]\s*(\d+\.?\d*)", r"T1/2\s*[=:]\s*(\d+\.?\d*)", r"T\s*[=:]\s*(\d+\.?\d*)\s*(?:year|day|second|s)\b.*half"], "required": False},
        {"name": "lam", "patterns": [r"decay constant\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"lambda\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": False},
    ],
    "steps": [
        {"command": "calculate {Thalf} / 0.693", "purpose": "Find mean life using τ = T½/ln2 = T½/0.693"},
    ],
    "subject": "phy",
    "note": "If decay constant λ is given instead, use τ = 1/λ. If half-life is given, use τ = T½/0.693",
},

# c12_phy_134: Energy density in electric field — u = ½ε₀E²
{
    "template_name": "c12_phy_134_energy_density",
    "node_id": "c12_phy_134",
    "normalized_pattern": "find energy density in electric field if field strength given",
    "keywords": ["energy density", "electric field", "permittivity"],
    "variables": [
        {"name": "E", "patterns": [r"(?:electric )?field\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"E\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:V/m|N/C)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 0.5 * 8.854e-12 * {E}**2", "purpose": "Find energy density using u = ½ε₀E²"},
    ],
    "subject": "phy",
},

# c12_phy_137: Rotating coil EMF — ε = NBAω sin(ωt)
{
    "template_name": "c12_phy_137_rotating_coil_emf",
    "node_id": "c12_phy_137",
    "normalized_pattern": "find induced emf in rotating coil if turns field area angular velocity given",
    "keywords": ["rotating coil", "emf", "generator", "angular velocity", "turns", "magnetic field", "area"],
    "variables": [
        {"name": "N", "patterns": [r"turns\s*[=:]\s*(\d+\.?\d*)", r"N\s*[=:]\s*(\d+\.?\d*)", r"(\d+)\s*turns?"], "required": True},
        {"name": "B", "patterns": [r"(?:magnetic )?field\s*[=:]\s*(\d+\.?\d*)", r"B\s*[=:]\s*(\d+\.?\d*)\s*T"], "required": True},
        {"name": "A", "patterns": [r"area\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"A\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m2"], "required": True},
        {"name": "omega", "patterns": [r"angular velocity\s*[=:]\s*(\d+\.?\d*)", r"omega\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*rad/s"], "required": True},
    ],
    "steps": [
        {"command": "calculate {N} * {B} * {A} * {omega}", "purpose": "Find peak emf using ε₀ = NBAω (peak value, sin term = 1)"},
    ],
    "subject": "phy",
},

# =========================================================================== #
# SPECIAL CASE & CONCEPTUAL RULE TEMPLATES
# These handle symbolic/proportionality questions from real exams
# =========================================================================== #

# c12_phy_083: Lens maker special case — f = R, equal radii → n = 1.5
{
    "template_name": "c12_phy_083_lens_maker_equal_radii",
    "node_id": "c12_phy_083",
    "normalized_pattern": "focal length equal to radius of curvature find refractive index double convex lens",
    "keywords": ["focal length", "equal", "radius of curvature", "refractive index", "double convex", "lens"],
    "variables": [],
    "steps": [
        {"command": "calculate 1.5", "purpose": "For double convex lens with equal radii (R1=R, R2=-R) and f=R: 1/f = (n-1)(2/R), with f=R → 1 = 2(n-1) → n = 3/2 = 1.5"},
    ],
    "subject": "phy",
    "rule": "When focal length equals radius of curvature for a double convex lens with equal radii, refractive index n = 1.5",
},

# c12_phy_096: de Broglie — λ = h/p, so λ ∝ 1/p (inversely proportional)
{
    "template_name": "c12_phy_096_de_broglie_relation",
    "node_id": "c12_phy_096",
    "normalized_pattern": "how does de broglie wavelength vary with momentum",
    "keywords": ["de broglie", "wavelength", "vary", "momentum", "moving particle", "proportional"],
    "variables": [],
    "steps": [
        {"command": "calculate 1", "purpose": "de Broglie wavelength λ = h/p. Since h is constant, λ is inversely proportional to momentum p. As momentum increases, wavelength decreases."},
    ],
    "subject": "phy",
    "rule": "de Broglie wavelength is inversely proportional to momentum (λ = h/p)",
},

# c12_phy_039: Magnetic field of coil — B ∝ 1/R (for fixed N, I)
{
    "template_name": "c12_phy_039_field_coil_radius_doubling",
    "node_id": "c12_phy_039",
    "normalized_pattern": "circular coil radius doubled same current new magnetic field",
    "keywords": ["circular coil", "radius", "doubled", "rewound", "same current", "magnetic field", "new", "centre"],
    "variables": [
        {"name": "factor", "patterns": [r"radius\s*(\d+)\s*[xX]\s*R", r"radius\s*(\d+)\s*R", r"rewound.*?radius\s*(\d+)", r"radius\s*(?:is\s*)?(\d+)\s*[xX]?\s*R"], "required": False, "default": "2"},
    ],
    "steps": [
        {"command": "calculate 1 / {factor}", "purpose": "B = μ₀NI/(2R). If R → {factor}R with same N and I, B → B/{factor}. The new magnetic field is T/{factor}."},
    ],
    "subject": "phy",
    "rule": "B ∝ 1/R for circular coil. If radius is multiplied by factor, field is divided by same factor.",
},

# c12_phy_027: Drift speed — v_d ∝ V (for fixed conductor)
{
    "template_name": "c12_phy_027_drift_speed_voltage_doubling",
    "node_id": "c12_phy_027",
    "normalized_pattern": "potential difference doubled drift speed free electrons what happens",
    "keywords": ["potential difference", "doubled", "drift speed", "drift velocity", "free electrons", "metallic wire", "happens"],
    "variables": [
        {"name": "factor", "patterns": [r"potential difference.*?(\d+)\s*[xX]?\s*(?:times|doubled|tripled|halved)", r"(\d+)\s*times.*potential", r"potential.*?doubled"], "required": False, "default": "2"},
    ],
    "steps": [
        {"command": "calculate {factor}", "purpose": "v_d = I/(nAe) = V/(nAeR). Since n, A, e, R are constant, v_d ∝ V. If V is doubled, drift speed is also doubled (multiplied by {factor})."},
    ],
    "subject": "phy",
    "rule": "Drift speed is directly proportional to potential difference. If V is doubled, drift speed doubles.",
},

]
