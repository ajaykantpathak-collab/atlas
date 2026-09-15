"""Pre-built variable-aware template library for multi-step problems.

Each template has:
  - normalized_pattern: text for embedding match (numbers replaced with NUM)
  - variables: extraction patterns to pull values from student questions
  - steps: compute-engine commands with {var_name} and {step_N} placeholders

When a student asks a question:
  1. Match by embedding similarity on normalized pattern
  2. Extract variables using regex patterns
  3. Substitute {var_name} into step commands
  4. Execute steps through compute engine (with {step_N} chaining)
  5. Return assembled worked solution — NO LLM call needed

This library covers the most common NEET/JEE/CISCE question patterns.
"""

# =========================================================================== #
# PHYSICS TEMPLATES
# =========================================================================== #

PHYSICS_TEMPLATES = [

# --- Kinematics: find final velocity (v = u + at) ---
{
    "template_name": "kinematics_final_velocity",
    "normalized_pattern": "find final velocity if initial velocity acceleration time given",
    "keywords": ["final velocity", "initial velocity", "acceleration", "time"],
    "variables": [
        {"name": "u", "patterns": [r"initial velocity\s*[=:]\s*(\d+\.?\d*)", r"u\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*m/s.*initial"], "required": True},
        {"name": "a", "patterns": [r"acceleration\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*m/s2.*accel"], "required": True},
        {"name": "t", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"t\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*s(?:ec)?(?:ond)?s?\b.*time"], "required": True},
    ],
    "steps": [
        {"command": "calculate {u} + {a} * {t}", "purpose": "Find final velocity using v = u + at"},
    ],
    "subject": "phy",
},

# --- Kinematics: find distance (s = ut + ½at²) ---
{
    "template_name": "kinematics_distance",
    "normalized_pattern": "find distance if initial velocity acceleration time given",
    "keywords": ["distance", "initial velocity", "acceleration", "time"],
    "variables": [
        {"name": "u", "patterns": [r"initial velocity\s*[=:]\s*(\d+\.?\d*)", r"u\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "a", "patterns": [r"acceleration\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "t", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"t\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {u} * {t} + 0.5 * {a} * {t}**2", "purpose": "Find distance using s = ut + ½at²"},
    ],
    "subject": "phy",
},

# --- Kinematics: find velocity from v² = u² + 2as ---
{
    "template_name": "kinematics_velocity_from_distance",
    "normalized_pattern": "find velocity if initial velocity acceleration distance given",
    "keywords": ["velocity", "initial velocity", "acceleration", "distance"],
    "variables": [
        {"name": "u", "patterns": [r"initial velocity\s*[=:]\s*(\d+\.?\d*)", r"u\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "a", "patterns": [r"acceleration\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "s", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"s\s*[=:]\s*(\d+\.?\d*)", r"displacement\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate sqrt({u}**2 + 2 * {a} * {s})", "purpose": "Find velocity using v² = u² + 2as"},
    ],
    "subject": "phy",
},

# --- Projectile: range R = u²sin(2θ)/g ---
{
    "template_name": "projectile_range",
    "normalized_pattern": "find range of projectile if velocity angle given",
    "keywords": ["range", "projectile", "velocity", "angle"],
    "variables": [
        {"name": "u", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*)", r"u\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"theta\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": True},
    ],
    "steps": [
        {"command": "calculate {u}**2 * sin(2 * {theta} * 3.14159 / 180) / 9.8", "purpose": "Find range using R = u²sin(2θ)/g"},
    ],
    "subject": "phy",
},

# --- Projectile: max height H = u²sin²(θ)/2g ---
{
    "template_name": "projectile_max_height",
    "normalized_pattern": "find maximum height of projectile if velocity angle given",
    "keywords": ["maximum height", "projectile", "velocity", "angle"],
    "variables": [
        {"name": "u", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*)", r"u\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"theta\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": True},
    ],
    "steps": [
        {"command": "calculate {u}**2 * (sin({theta} * 3.14159 / 180))**2 / (2 * 9.8)", "purpose": "Find max height using H = u²sin²(θ)/2g"},
    ],
    "subject": "phy",
},

# --- Projectile: time of flight T = 2usin(θ)/g ---
{
    "template_name": "projectile_time_flight",
    "normalized_pattern": "find time of flight of projectile if velocity angle given",
    "keywords": ["time of flight", "projectile", "velocity", "angle"],
    "variables": [
        {"name": "u", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*)", r"u\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "theta", "patterns": [r"angle\s*[=:]\s*(\d+\.?\d*)", r"theta\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*degree"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * {u} * sin({theta} * 3.14159 / 180) / 9.8", "purpose": "Find time of flight using T = 2usin(θ)/g"},
    ],
    "subject": "phy",
},

# --- Newton's second law: F = ma ---
{
    "template_name": "newtons_second_law",
    "normalized_pattern": "find force if mass acceleration given",
    "keywords": ["force", "mass", "acceleration"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*kg.*mass"], "required": True},
        {"name": "a", "patterns": [r"acceleration\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*m/s2.*accel"], "required": True},
    ],
    "steps": [
        {"command": "calculate {m} * {a}", "purpose": "Find force using F = ma"},
    ],
    "subject": "phy",
},

# --- Kinetic energy: KE = ½mv² ---
{
    "template_name": "kinetic_energy",
    "normalized_pattern": "find kinetic energy if mass velocity given",
    "keywords": ["kinetic energy", "mass", "velocity"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "v", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*)", r"v\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 0.5 * {m} * {v}**2", "purpose": "Find kinetic energy using KE = ½mv²"},
    ],
    "subject": "phy",
},

# --- Potential energy: PE = mgh ---
{
    "template_name": "potential_energy",
    "normalized_pattern": "find potential energy if mass height given",
    "keywords": ["potential energy", "mass", "height"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "h", "patterns": [r"height\s*[=:]\s*(\d+\.?\d*)", r"h\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {m} * 9.8 * {h}", "purpose": "Find potential energy using PE = mgh"},
    ],
    "subject": "phy",
},

# --- Work done: W = Fs ---
{
    "template_name": "work_done",
    "normalized_pattern": "find work done if force distance given",
    "keywords": ["work", "force", "distance", "displacement"],
    "variables": [
        {"name": "F", "patterns": [r"force\s*[=:]\s*(\d+\.?\d*)", r"F\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "s", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"displacement\s*[=:]\s*(\d+\.?\d*)", r"s\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {F} * {s}", "purpose": "Find work done using W = Fs"},
    ],
    "subject": "phy",
},

# --- Power: P = W/t ---
{
    "template_name": "power_calculation",
    "normalized_pattern": "find power if work time given",
    "keywords": ["power", "work", "time"],
    "variables": [
        {"name": "W", "patterns": [r"work\s*[=:]\s*(\d+\.?\d*)", r"W\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "t", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"t\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {W} / {t}", "purpose": "Find power using P = W/t"},
    ],
    "subject": "phy",
},

# --- Momentum: p = mv ---
{
    "template_name": "momentum",
    "normalized_pattern": "find momentum if mass velocity given",
    "keywords": ["momentum", "mass", "velocity"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "v", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*)", r"v\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {m} * {v}", "purpose": "Find momentum using p = mv"},
    ],
    "subject": "phy",
},

# --- Gravitation: F = GMm/r² ---
{
    "template_name": "gravitational_force",
    "normalized_pattern": "find gravitational force if masses distance given",
    "keywords": ["gravitational force", "mass", "distance", "separation"],
    "variables": [
        {"name": "m1", "patterns": [r"m1\s*[=:]\s*(\d+\.?\d*)", r"mass\s*1\s*[=:]\s*(\d+\.?\d*)", r"first mass\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "m2", "patterns": [r"m2\s*[=:]\s*(\d+\.?\d*)", r"mass\s*2\s*[=:]\s*(\d+\.?\d*)", r"second mass\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"separation\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 6.674e-11 * {m1} * {m2} / {r}**2", "purpose": "Find gravitational force using F = GMm/r²"},
    ],
    "subject": "phy",
},

# --- Gravitation: g = GM/R² ---
{
    "template_name": "gravitational_acceleration",
    "normalized_pattern": "find gravitational acceleration if mass radius given",
    "keywords": ["gravitational acceleration", "gravity", "mass", "radius", "planet"],
    "variables": [
        {"name": "M", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"M\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
        {"name": "R", "patterns": [r"radius\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"R\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 6.674e-11 * {M} / {R}**2", "purpose": "Find gravitational acceleration using g = GM/R²"},
    ],
    "subject": "phy",
},

# --- Circular motion: centripetal force F = mv²/r ---
{
    "template_name": "centripetal_force",
    "normalized_pattern": "find centripetal force if mass velocity radius given",
    "keywords": ["centripetal force", "mass", "velocity", "radius", "circular"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "v", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*)", r"v\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"radius\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {m} * {v}**2 / {r}", "purpose": "Find centripetal force using F = mv²/r"},
    ],
    "subject": "phy",
},

# --- SHM: pendulum period T = 2π√(l/g) ---
{
    "template_name": "pendulum_period",
    "normalized_pattern": "find period of pendulum if length given",
    "keywords": ["period", "pendulum", "length"],
    "variables": [
        {"name": "l", "patterns": [r"length\s*[=:]\s*(\d+\.?\d*)", r"l\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * 3.14159 * sqrt({l} / 9.8)", "purpose": "Find period using T = 2π√(l/g)"},
    ],
    "subject": "phy",
},

# --- SHM: spring period T = 2π√(m/k) ---
{
    "template_name": "spring_period",
    "normalized_pattern": "find period of spring if mass spring constant given",
    "keywords": ["period", "spring", "mass", "spring constant"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "k", "patterns": [r"spring constant\s*[=:]\s*(\d+\.?\d*)", r"k\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * 3.14159 * sqrt({m} / {k})", "purpose": "Find period using T = 2π√(m/k)"},
    ],
    "subject": "phy",
},

# --- Ohm's law: V = IR ---
{
    "template_name": "ohms_law_voltage",
    "normalized_pattern": "find voltage if current resistance given",
    "keywords": ["voltage", "current", "resistance", "ohm"],
    "variables": [
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [r"resistance\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {I} * {R}", "purpose": "Find voltage using V = IR"},
    ],
    "subject": "phy",
},

# --- Ohm's law: find current I = V/R ---
{
    "template_name": "ohms_law_current",
    "normalized_pattern": "find current if voltage resistance given",
    "keywords": ["current", "voltage", "resistance", "ohm"],
    "variables": [
        {"name": "V", "patterns": [r"voltage\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)", r"potential\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [r"resistance\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {V} / {R}", "purpose": "Find current using I = V/R"},
    ],
    "subject": "phy",
},

# --- Electric power: P = V²/R ---
{
    "template_name": "electric_power",
    "normalized_pattern": "find power if voltage resistance given",
    "keywords": ["power", "voltage", "resistance", "electric"],
    "variables": [
        {"name": "V", "patterns": [r"voltage\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [r"resistance\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {V}**2 / {R}", "purpose": "Find power using P = V²/R"},
    ],
    "subject": "phy",
},

# --- Capacitor energy: U = ½CV² ---
{
    "template_name": "capacitor_energy",
    "normalized_pattern": "find energy stored in capacitor if capacitance voltage given",
    "keywords": ["energy", "capacitor", "capacitance", "voltage"],
    "variables": [
        {"name": "C", "patterns": [r"capacitance\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"C\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
        {"name": "V", "patterns": [r"voltage\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 0.5 * {C} * {V}**2", "purpose": "Find energy using U = ½CV²"},
    ],
    "subject": "phy",
},

# --- Lens formula: 1/f = 1/v - 1/u (find image distance) ---
{
    "template_name": "lens_image_distance",
    "normalized_pattern": "find image distance if focal length object distance given",
    "keywords": ["image distance", "focal length", "object distance", "lens"],
    "variables": [
        {"name": "f", "patterns": [r"focal length\s*[=:]\s*(\d+\.?\d*)", r"f\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "u", "patterns": [r"object distance\s*[=:]\s*(\d+\.?\d*)", r"u\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (1/{f} - 1/{u})", "purpose": "Find image distance using 1/f = 1/v - 1/u (convex lens convention: u is negative)"},
    ],
    "subject": "phy",
},

# --- de Broglie wavelength: λ = h/mv ---
{
    "template_name": "de_broglie_wavelength",
    "normalized_pattern": "find de broglie wavelength if mass velocity given",
    "keywords": ["de broglie", "wavelength", "mass", "velocity"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"m\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
        {"name": "v", "patterns": [r"velocity\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"v\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"speed\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 6.626e-34 / ({m} * {v})", "purpose": "Find de Broglie wavelength using λ = h/mv"},
    ],
    "subject": "phy",
},

# --- Photoelectric: KE = hν - φ ---
{
    "template_name": "photoelectric_effect",
    "normalized_pattern": "find kinetic energy of photoelectron if frequency work function given",
    "keywords": ["photoelectric", "kinetic energy", "frequency", "work function"],
    "variables": [
        {"name": "nu", "patterns": [r"frequency\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"nu\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"f\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
        {"name": "phi", "patterns": [r"work function\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"phi\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 6.626e-34 * {nu} - {phi}", "purpose": "Find KE using KE = hν - φ"},
    ],
    "subject": "phy",
},

# --- Wave speed: v = fλ ---
{
    "template_name": "wave_speed",
    "normalized_pattern": "find wave speed if frequency wavelength given",
    "keywords": ["wave speed", "frequency", "wavelength"],
    "variables": [
        {"name": "f", "patterns": [r"frequency\s*[=:]\s*(\d+\.?\d*)", r"f\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "lam", "patterns": [r"wavelength\s*[=:]\s*(\d+\.?\d*)", r"lambda\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {f} * {lam}", "purpose": "Find wave speed using v = fλ"},
    ],
    "subject": "phy",
},

# --- Heat: Q = mcΔT ---
{
    "template_name": "heat_calorimetry",
    "normalized_pattern": "find heat if mass specific heat temperature change given",
    "keywords": ["heat", "mass", "specific heat", "temperature"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "c", "patterns": [r"specific heat\s*[=:]\s*(\d+\.?\d*)", r"c\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "dT", "patterns": [r"temperature\s*(?:change|difference)\s*[=:]\s*(\d+\.?\d*)", r"delta\s*t\s*[=:]\s*(\d+\.?\d*)", r"dt\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {m} * {c} * {dT}", "purpose": "Find heat using Q = mcΔT"},
    ],
    "subject": "phy",
},

# --- Gas law: PV = nRT (find pressure) ---
{
    "template_name": "ideal_gas_pressure",
    "normalized_pattern": "find pressure if moles volume temperature given ideal gas",
    "keywords": ["pressure", "moles", "volume", "temperature", "gas"],
    "variables": [
        {"name": "n", "patterns": [r"moles?\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "V", "patterns": [r"volume\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "T", "patterns": [r"temperature\s*[=:]\s*(\d+\.?\d*)", r"T\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {n} * 8.314 * {T} / {V}", "purpose": "Find pressure using PV = nRT → P = nRT/V"},
    ],
    "subject": "phy",
},

# --- Escape velocity: v = √(2GM/R) ---
{
    "template_name": "escape_velocity",
    "normalized_pattern": "find escape velocity if mass radius given planet",
    "keywords": ["escape velocity", "mass", "radius", "planet"],
    "variables": [
        {"name": "M", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"M\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
        {"name": "R", "patterns": [r"radius\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"R\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate sqrt(2 * 6.674e-11 * {M} / {R})", "purpose": "Find escape velocity using v = √(2GM/R)"},
    ],
    "subject": "phy",
},

# --- Free fall velocity from height: v = sqrt(2gh) ---
{
    "template_name": "free_fall_velocity",
    "normalized_pattern": "find velocity when dropped from height",
    "keywords": ["dropped", "free fall", "free-fall", "height", "velocity", "ground", "fall"],
    "variables": [
        {"name": "h", "patterns": [r"height\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"from\s+(?:a\s+)?(?:height\s+)?(\d+\.?\d*)\s*m", r"(\d+\.?\d*)\s*m\s+high"], "required": True},
        {"name": "g", "patterns": [r"g\s*=\s*(\d+\.?\d*)"], "required": False, "default": 9.8},
    ],
    "steps": [
        {"command": "calculate sqrt(2 * {g} * {h})", "purpose": "Find velocity using v = √(2gh)"},
    ],
    "subject": "phy",
},

# --- Braking/deceleration: a = (v-u)/t, F = ma ---
{
    "template_name": "braking_deceleration",
    "normalized_pattern": "find deceleration and force if mass velocity time given",
    "keywords": ["brakes", "braking", "deceleration", "stop", "stopping", "braking force"],
    "variables": [
        {"name": "m", "patterns": [r"(\d+\.?\d*)\s*kg\s+(?:car|object|body|truck|vehicle)", r"(\d+\.?\d*)\s*kg\s+(?:car|object).*moving"], "required": True},
        {"name": "u", "patterns": [r"moving\s+at\s+(\d+\.?\d*)\s*m/s", r"velocity\s+(?:of\s+)?(\d+\.?\d*)", r"at\s+(\d+\.?\d*)\s*m/s"], "required": True},
        {"name": "t", "patterns": [r"in\s+(\d+\.?\d*)\s+seconds?", r"(\d+\.?\d*)\s+seconds?\s+to", r"for\s+(\d+\.?\d*)\s+s\b"], "required": True},
        {"name": "v", "patterns": [], "required": False, "default": 0},
    ],
    "steps": [
        {"command": "calculate ({v} - {u}) / {t}", "purpose": "Find deceleration using a = (v-u)/t"},
        {"command": "calculate {m} * abs({step_1})", "purpose": "Find braking force using F = m×|a|"},
        {"command": "calculate {u} * {t} + 0.5 * {step_1} * {t}**2", "purpose": "Find stopping distance using s = ut + ½at²"},
    ],
    "subject": "phy",
},

# --- Conservation of momentum: m1*u1 + m2*u2 = m1*v1 + m2*v2 ---
{
    "template_name": "conservation_momentum",
    "normalized_pattern": "find velocity after collision if masses and velocities given",
    "keywords": ["collision", "momentum", "collides", "stationary", "after collision", "moving at"],
    "variables": [
        {"name": "m1", "patterns": [r"(\d+\.?\d*)\s*kg\s+(?:ball|object|mass|car|body).*moving", r"(\d+\.?\d*)\s*kg\s+(?:ball|object).*collides"], "required": True},
        {"name": "u1", "patterns": [r"moving\s+at\s+(\d+\.?\d*)\s*m/s", r"velocity\s+(?:of\s+)?(\d+\.?\d*)", r"at\s+(\d+\.?\d*)\s*m/s"], "required": True},
        {"name": "m2", "patterns": [r"stationary\s+(\d+\.?\d*)\s*kg", r"(\d+\.?\d*)\s*kg\s+(?:ball|object|mass)(?:\s+after|\s+which)", r"(\d+\.?\d*)\s*kg\s+(?:ball|object)(?!\s+moving)"], "required": True},
        {"name": "v1", "patterns": [r"after\s+collision.*?(\d+\.?\d*)\s*kg\s+(?:ball|object).*?moves\s+at\s+(\d+\.?\d*)", r"(\d+\.?\d*)\s*kg\s+(?:ball|object).*?moves\s+at\s+(\d+\.?\d*)", r"moves\s+at\s+(\d+\.?\d*)\s*m/s"], "required": False, "default": 0},
        {"name": "u2", "patterns": [], "required": False, "default": 0},
    ],
    "steps": [
        {"command": "calculate ({m1} * {u1} - {m1} * {v1}) / {m2}", "purpose": "Find v2 using m1*u1 = m1*v1 + m2*v2 → v2 = (m1*u1 - m1*v1)/m2"},
    ],
    "subject": "phy",
},

# --- Series resistors: R_total = R1 + R2, I = V/R_total ---
{
    "template_name": "series_resistors",
    "normalized_pattern": "find current with resistors in series",
    "keywords": ["series", "resistors", "resistor", "battery", "connected", "ohm"],
    "variables": [
        {"name": "V", "patterns": [r"(\d+\.?\d*)\s*V\s+battery", r"(\d+\.?\d*)\s*V\s+(?:source|supply|connected)", r"battery.*?(\d+\.?\d*)\s*V"], "required": True},
        {"name": "R1", "patterns": [r"(\d+\.?\d*)\s*ohm\s+resistor", r"(\d+\.?\d*)\s*ohm"], "required": True},
        {"name": "R2", "patterns": [r"(\d+\.?\d*)\s*ohm\s+resistor", r"(\d+\.?\d*)\s*ohm"], "required": False, "default": 0},
        {"name": "n_resistors", "patterns": [r"two\s+(\d+\.?\d*)\s*ohm", r"(\d+)\s+(\d+\.?\d*)\s*ohm\s+resistors"], "required": False, "default": 1},
    ],
    "steps": [
        {"command": "calculate {V} / ({R1} + {R2})", "purpose": "Find current using I = V/(R1+R2) for series resistors"},
    ],
    "subject": "phy",
},

# --- Lens formula: 1/f = 1/v - 1/u (or 1/v = 1/f + 1/u for real images) ---
{
    "template_name": "lens_formula",
    "normalized_pattern": "find image distance if focal length and object distance given",
    "keywords": ["lens", "focal", "object", "image", "convex", "concave", "distance"],
    "variables": [
        {"name": "f", "patterns": [r"focal\s+length\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"f\s*=\s*(\d+\.?\d*)"], "required": True},
        {"name": "u", "patterns": [r"object\s+(?:is\s+)?(?:placed\s+)?(?:at\s+)?(\d+\.?\d*)\s*cm", r"object\s+distance\s*(?:is|=|:)?\s*(\d+\.?\d*)", r"u\s*=\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 / (1/{f} - 1/{u})", "purpose": "Find image distance using 1/v = 1/f - 1/u"},
        {"command": "calculate {step_1} / {u}", "purpose": "Find magnification using m = v/u"},
    ],
    "subject": "phy",
},

# --- Radioactive decay with half-life: N = N0 * (1/2)^(t/T) ---
{
    "template_name": "radioactive_decay_halflife",
    "normalized_pattern": "find remaining mass after time if half-life given",
    "keywords": ["radioactive", "half-life", "half life", "decay", "remaining", "initial mass", "sample"],
    "variables": [
        {"name": "N0", "patterns": [r"initial\s+mass\s*(?:is|=|:)?\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*g.*sample", r"sample.*?(\d+\.?\d*)\s*g"], "required": True},
        {"name": "T_half", "patterns": [r"half-life\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"half\s+life\s*(?:is|=|:|of)?\s*(\d+\.?\d*)"], "required": True},
        {"name": "t_decay", "patterns": [r"after\s+(\d+\.?\d*)\s+years?", r"(\d+\.?\d*)\s+years?\s+(?:later|after)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {N0} * (0.5)**({t_decay} / {T_half})", "purpose": "Find remaining mass using N = N0 × (1/2)^(t/T)"},
        {"command": "calculate log(2) / {T_half}", "purpose": "Find decay constant using λ = ln(2)/T"},
    ],
    "subject": "phy",
},

# --- Phase change calorimetry: Q = m*c*ΔT + m*L ---
{
    "template_name": "phase_change_calorimetry",
    "normalized_pattern": "find heat to convert ice to water if temperatures given",
    "keywords": ["heat", "ice", "water", "convert", "phase", "calorimetry", "fusion", "specific heat"],
    "variables": [
        {"name": "m", "patterns": [r"(\d+\.?\d*)\s*g\s+of\s+ice", r"(\d+\.?\d*)\s*g\s+ice", r"mass\s*(?:is|=|:)?\s*(\d+\.?\d*)"], "required": True},
        {"name": "T_ice", "patterns": [r"ice\s+at\s+(-?\d+\.?\d*)", r"(-?\d+\.?\d*)\s*°?c.*ice"], "required": False, "default": -10},
        {"name": "T_water", "patterns": [r"water\s+at\s+(\d+\.?\d*)", r"to\s+water\s+at\s+(\d+\.?\d*)", r"(\d+\.?\d*)\s*°?c"], "required": False, "default": 20},
        {"name": "c_ice", "patterns": [r"c_ice\s*=\s*(\d+\.?\d*)", r"cice\s*=\s*(\d+\.?\d*)"], "required": False, "default": 2100},
        {"name": "L_fusion", "patterns": [r"l_fusion\s*=\s*(\d+\.?\d*)", r"lfusion\s*=\s*(\d+\.?\d*)"], "required": False, "default": 334000},
        {"name": "c_water", "patterns": [r"c_water\s*=\s*(\d+\.?\d*)", r"cwater\s*=\s*(\d+\.?\d*)"], "required": False, "default": 4200},
    ],
    "steps": [
        {"command": "calculate {m} * {c_ice} * abs({T_ice})", "purpose": "Heat to raise ice from T_ice to 0°C: Q1 = m×c_ice×|T_ice|"},
        {"command": "calculate {m} * {L_fusion}", "purpose": "Heat to melt ice at 0°C: Q2 = m×L_fusion"},
        {"command": "calculate {m} * {c_water} * {T_water}", "purpose": "Heat to raise water from 0°C to T_water: Q3 = m×c_water×T_water"},
        {"command": "calculate {step_1} + {step_2} + {step_3}", "purpose": "Total heat Q = Q1 + Q2 + Q3"},
    ],
    "subject": "chem",
},

# --- Ideal gas law: PV = nRT → n = PV/(RT) ---
{
    "template_name": "ideal_gas_law",
    "normalized_pattern": "find moles if pressure volume temperature given",
    "keywords": ["ideal gas", "moles", "pressure", "volume", "temperature", "atm", "occupies"],
    "variables": [
        {"name": "P", "patterns": [r"(\d+\.?\d*)\s*atm", r"pressure\s*(?:is|=|:)?\s*(\d+\.?\d*)"], "required": True},
        {"name": "V", "patterns": [r"(\d+\.?\d*)\s*L\b", r"occupies\s+(\d+\.?\d*)\s*L", r"volume\s*(?:is|=|:)?\s*(\d+\.?\d*)"], "required": True},
        {"name": "T", "patterns": [r"(\d+\.?\d*)\s*K\b", r"temperature\s*(?:is|=|:|of)?\s*(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [], "required": False, "default": 0.0821},
    ],
    "steps": [
        {"command": "calculate {P} * {V} / ({R} * {T})", "purpose": "Find moles using n = PV/(RT)"},
    ],
    "subject": "chem",
},

# --- Equilibrium ICE table: N2 + 3H2 ⇌ 2NH3 ---
# General: aA + bB ⇌ cC, given initial moles and equilibrium amount of product
{
    "template_name": "equilibrium_ice_table",
    "normalized_pattern": "find equilibrium concentrations if initial moles and product given",
    "keywords": ["equilibrium", "reaction", "moles", "formed", "initial", "container", "⇌"],
    "variables": [
        {"name": "n_N2_init", "patterns": [r"(\d+\.?\d*)\s+moles?\s+of\s+n2", r"(\d+\.?\d*)\s+moles?\s+of\s+nitrogen"], "required": True},
        {"name": "n_H2_init", "patterns": [r"(\d+\.?\d*)\s+moles?\s+of\s+h2", r"(\d+\.?\d*)\s+moles?\s+of\s+hydrogen"], "required": True},
        {"name": "n_NH3_eq", "patterns": [r"(\d+\.?\d*)\s+moles?\s+of\s+nh3\s+(?:is|are)\s+formed", r"(\d+\.?\d*)\s+moles?\s+of\s+nh3\s+(?:is|are)\s+(?:formed|produced)", r"(\d+\.?\d*)\s+moles?\s+of\s+nh3\s+is\s+formed", r"(\d+\.?\d*)\s+moles?\s+of\s+nh3\s+formed"], "required": True},
        {"name": "coef_N2", "patterns": [], "required": False, "default": 1},
        {"name": "coef_H2", "patterns": [], "required": False, "default": 3},
        {"name": "coef_NH3", "patterns": [], "required": False, "default": 2},
    ],
    "steps": [
        {"command": "calculate {n_NH3_eq} / {coef_NH3}", "purpose": "Find x (extent of reaction) using: NH3 formed = coef_NH3 × x → x = NH3_eq / coef_NH3"},
        {"command": "calculate {n_N2_init} - {coef_N2} * {step_1}", "purpose": "Find equilibrium [N2] = N2_init - coef_N2 × x"},
        {"command": "calculate {n_H2_init} - {coef_H2} * {step_1}", "purpose": "Find equilibrium [H2] = H2_init - coef_H2 × x"},
        {"command": "calculate {step_2} * {step_3}**3 / {n_NH3_eq}**2", "purpose": "Find Kc = [N2][H2]³ / [NH3]²"},
    ],
    "subject": "chem",
},

]

# =========================================================================== #
# CHEMISTRY TEMPLATES
# =========================================================================== #

CHEMISTRY_TEMPLATES = [

# --- Mole concept: n = m/M ---
{
    "template_name": "mole_concept",
    "normalized_pattern": "find moles if mass molar mass given",
    "keywords": ["moles", "mass", "molar mass"],
    "variables": [
        {"name": "mass", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)\s*g"], "required": True},
        {"name": "M", "patterns": [r"molar mass\s*[=:]\s*(\d+\.?\d*)", r"M\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {mass} / {M}", "purpose": "Find moles using n = m/M"},
    ],
    "subject": "chem",
},

# --- Molarity: M = n/V ---
{
    "template_name": "molarity",
    "normalized_pattern": "find molarity if moles volume given",
    "keywords": ["molarity", "moles", "volume", "concentration"],
    "variables": [
        {"name": "n", "patterns": [r"moles?\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "V", "patterns": [r"volume\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {n} / {V}", "purpose": "Find molarity using M = n/V"},
    ],
    "subject": "chem",
},

# --- pH from [H+] ---
{
    "template_name": "ph_from_concentration",
    "normalized_pattern": "find ph if h+ concentration given",
    "keywords": ["ph", "concentration", "h+"],
    "variables": [
        {"name": "H", "patterns": [r"\[h\+?\]\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"h\+?\s*concentration\s*[=:]\s*(\d+\.?\d*e?-?\d*)", r"concentration\s*[=:]\s*(\d+\.?\d*e?-?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate -log({H}, 10)", "purpose": "Find pH using pH = -log10[H+]"},
    ],
    "subject": "chem",
},

# --- pH from pOH ---
{
    "template_name": "ph_from_poh",
    "normalized_pattern": "find ph if poh given",
    "keywords": ["ph", "poh"],
    "variables": [
        {"name": "pOH", "patterns": [r"poh\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 14 - {pOH}", "purpose": "Find pH using pH + pOH = 14"},
    ],
    "subject": "chem",
},

# --- Dilution: M1V1 = M2V2 (find M2) ---
{
    "template_name": "dilution_find_m2",
    "normalized_pattern": "find m2 if m1 v1 v2 given dilution",
    "keywords": ["dilution", "m1", "v1", "v2", "m2"],
    "variables": [
        {"name": "M1", "patterns": [r"m1\s*[=:]\s*(\d+\.?\d*)", r"M1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "V1", "patterns": [r"v1\s*[=:]\s*(\d+\.?\d*)", r"V1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "V2", "patterns": [r"v2\s*[=:]\s*(\d+\.?\d*)", r"V2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {M1} * {V1} / {V2}", "purpose": "Find M2 using M1V1 = M2V2"},
    ],
    "subject": "chem",
},

# --- Dilution: find V1 ---
{
    "template_name": "dilution_find_v1",
    "normalized_pattern": "find v1 if m1 m2 v2 given dilution",
    "keywords": ["dilution", "v1", "m1", "m2", "v2"],
    "variables": [
        {"name": "M1", "patterns": [r"m1\s*[=:]\s*(\d+\.?\d*)", r"M1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "M2", "patterns": [r"m2\s*[=:]\s*(\d+\.?\d*)", r"M2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "V2", "patterns": [r"v2\s*[=:]\s*(\d+\.?\d*)", r"V2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {M2} * {V2} / {M1}", "purpose": "Find V1 using M1V1 = M2V2"},
    ],
    "subject": "chem",
},

# --- Faraday's law: m = MIt/nF ---
{
    "template_name": "faraday_law",
    "normalized_pattern": "find mass deposited if current time molar mass given electrolysis",
    "keywords": ["faraday", "mass", "deposited", "current", "time", "electrolysis"],
    "variables": [
        {"name": "M", "patterns": [r"molar mass\s*[=:]\s*(\d+\.?\d*)", r"M\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "I", "patterns": [r"current\s*[=:]\s*(\d+\.?\d*)", r"I\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "t", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"t\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n", "patterns": [r"n\s*[=:]\s*(\d+\.?\d*)", r"electrons\s*[=:]\s*(\d+\.?\d*)", r"valency\s*[=:]\s*(\d+\.?\d*)"], "default": 1, "required": False},
    ],
    "steps": [
        {"command": "calculate {M} * {I} * {t} / ({n} * 96485)", "purpose": "Find mass using m = MIt/nF"},
    ],
    "subject": "chem",
},

# --- Radioactive decay: N = N₀e^(-λt) ---
{
    "template_name": "radioactive_decay",
    "normalized_pattern": "find remaining amount if initial amount half life time given radioactive",
    "keywords": ["radioactive", "decay", "half life", "remaining", "initial"],
    "variables": [
        {"name": "N0", "patterns": [r"initial\s*(?:amount|mass)?\s*[=:]\s*(\d+\.?\d*)", r"N0\s*[=:]\s*(\d+\.?\d*)", r"n0\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "half_life", "patterns": [r"half\s*life\s*[=:]\s*(\d+\.?\d*)", r"t_half\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "t", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"t\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {N0} * 2.71828 ** (-0.693 * {t} / {half_life})", "purpose": "Find remaining amount using N = N₀e^(-λt), λ = 0.693/t_half"},
    ],
    "subject": "chem",
},

# --- Equilibrium: Kc ---
{
    "template_name": "equilibrium_kc",
    "normalized_pattern": "find kc if equilibrium concentrations given",
    "keywords": ["kc", "equilibrium", "concentration"],
    "variables": [
        {"name": "products", "patterns": [r"products?\s*[=:]\s*(\d+\.?\d*)", r"product\s*conc\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "reactants", "patterns": [r"reactants?\s*[=:]\s*(\d+\.?\d*)", r"reactant\s*conc\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {products} / {reactants}", "purpose": "Find Kc = [products]/[reactants] (simplified for 1:1 stoichiometry)"},
    ],
    "subject": "chem",
},

# --- Thermochemistry: q = mcΔT ---
{
    "template_name": "thermochemistry_heat",
    "normalized_pattern": "find heat absorbed if mass specific heat temperature change given",
    "keywords": ["heat", "absorbed", "released", "mass", "specific heat", "temperature"],
    "variables": [
        {"name": "m", "patterns": [r"mass\s*[=:]\s*(\d+\.?\d*)", r"m\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "c", "patterns": [r"specific heat\s*[=:]\s*(\d+\.?\d*)", r"c\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "dT", "patterns": [r"temperature\s*(?:change|difference)\s*[=:]\s*(\d+\.?\d*)", r"delta\s*t\s*[=:]\s*(\d+\.?\d*)", r"dt\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {m} * {c} * {dT}", "purpose": "Find heat using q = mcΔT"},
    ],
    "subject": "chem",
},

# --- Number of molecules from moles: N = n × NA ---
{
    "template_name": "molecules_from_moles",
    "normalized_pattern": "find number of molecules if moles given",
    "keywords": ["molecules", "moles", "number"],
    "variables": [
        {"name": "n", "patterns": [r"moles?\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {n} * 6.022e23", "purpose": "Find number of molecules using N = n × NA"},
    ],
    "subject": "chem",
},

# --- Boyle's law: P1V1 = P2V2 (find P2) ---
{
    "template_name": "boyles_law_p2",
    "normalized_pattern": "find p2 if p1 v1 v2 given boyle law",
    "keywords": ["boyle", "p2", "p1", "v1", "v2", "pressure"],
    "variables": [
        {"name": "P1", "patterns": [r"p1\s*[=:]\s*(\d+\.?\d*)", r"P1\s*[=:]\s*(\d+\.?\d*)", r"initial pressure\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "V1", "patterns": [r"v1\s*[=:]\s*(\d+\.?\d*)", r"V1\s*[=:]\s*(\d+\.?\d*)", r"initial volume\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "V2", "patterns": [r"v2\s*[=:]\s*(\d+\.?\d*)", r"V2\s*[=:]\s*(\d+\.?\d*)", r"final volume\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {P1} * {V1} / {V2}", "purpose": "Find P2 using P1V1 = P2V2"},
    ],
    "subject": "chem",
},

# --- Charles's law: V1/T1 = V2/T2 (find V2) ---
{
    "template_name": "charles_law_v2",
    "normalized_pattern": "find v2 if v1 t1 t2 given charles law",
    "keywords": ["charles", "v2", "v1", "t1", "t2", "volume", "temperature"],
    "variables": [
        {"name": "V1", "patterns": [r"v1\s*[=:]\s*(\d+\.?\d*)", r"V1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "T1", "patterns": [r"t1\s*[=:]\s*(\d+\.?\d*)", r"T1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "T2", "patterns": [r"t2\s*[=:]\s*(\d+\.?\d*)", r"T2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {V1} * {T2} / {T1}", "purpose": "Find V2 using V1/T1 = V2/T2"},
    ],
    "subject": "chem",
},

]

# =========================================================================== #
# MATHEMATICS TEMPLATES
# =========================================================================== #

MATH_TEMPLATES = [

# --- Open-top box optimization ---
{
    "template_name": "open_top_box_optimization",
    "normalized_pattern": "rectangular sheet area fold cut squares maximize volume box",
    "keywords": ["rectangular sheet", "area", "fold", "cut", "squares", "maximize", "volume", "box"],
    "variables": [
        {"name": "area", "patterns": [r"area\s*(?:of\s*)?(?:\d+\.?\d*|NUM)\s*cm", r"area\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*cm.*area", r"total area\s*(?:of\s*)?(\d+\.?\d*)"], "required": True},
        {"name": "ratio", "patterns": [r"twice.*long.*wide", r"two times.*long.*wide", r"(\d+)\s*times.*long.*wide", r"(\d+)\s*:\s*1.*length.*width", r"length\s*=\s*(\d+)\s*\*\s*width"], "default": 2, "required": False},
    ],
    "steps": [
        {"command": "solve {ratio}*w**2 = {area}", "purpose": "Find width W from area={area} and L={ratio}W"},
        {"command": "calculate {ratio} * {step_1}", "purpose": "Find length L = {ratio} × W"},
        {"command": "expand ({step_2} - 2*x)*({step_1} - 2*x)*x", "purpose": "Write volume V(x) = x(L-2x)(W-2x)"},
        {"command": "differentiate {step_3}", "purpose": "Find dV/dx"},
        {"command": "solve {step_4} = 0", "purpose": "Find critical points for maximum volume"},
        {"command": "calculate {step_3} with x = {step_5}", "purpose": "Substitute x to find maximum volume"},
    ],
    "subject": "math",
},

# --- Quadratic equation: ax² + bx + c = 0 ---
{
    "template_name": "quadratic_equation",
    "normalized_pattern": "solve quadratic equation if coefficients given",
    "keywords": ["quadratic", "solve", "equation", "coefficients", "roots"],
    "variables": [
        {"name": "a", "patterns": [r"a\s*[=:]\s*(\d+\.?\d*)", r"coefficient\s*of\s*x2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "b", "patterns": [r"b\s*[=:]\s*(\d+\.?\d*)", r"coefficient\s*of\s*x\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "c", "patterns": [r"c\s*[=:]\s*(\d+\.?\d*)", r"constant\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "solve {a}*x**2 + {b}*x + {c} = 0", "purpose": "Solve quadratic equation {a}x² + {b}x + {c} = 0"},
    ],
    "subject": "math",
},

# --- AP: nth term a + (n-1)d ---
{
    "template_name": "ap_nth_term",
    "normalized_pattern": "find nth term of arithmetic progression if first term common difference given",
    "keywords": ["nth term", "arithmetic progression", "ap", "first term", "common difference"],
    "variables": [
        {"name": "a", "patterns": [r"first term\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "d", "patterns": [r"common difference\s*[=:]\s*(\d+\.?\d*)", r"d\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n", "patterns": [r"n\s*[=:]\s*(\d+\.?\d*)", r"term number\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*th term"], "required": True},
    ],
    "steps": [
        {"command": "calculate {a} + ({n} - 1) * {d}", "purpose": "Find nth term using aₙ = a + (n-1)d"},
    ],
    "subject": "math",
},

# --- AP: sum S = n/2(2a + (n-1)d) ---
{
    "template_name": "ap_sum",
    "normalized_pattern": "find sum of arithmetic progression if first term common difference n given",
    "keywords": ["sum", "arithmetic progression", "ap", "first term", "common difference"],
    "variables": [
        {"name": "a", "patterns": [r"first term\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "d", "patterns": [r"common difference\s*[=:]\s*(\d+\.?\d*)", r"d\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n", "patterns": [r"n\s*[=:]\s*(\d+\.?\d*)", r"terms?\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {n} / 2 * (2 * {a} + ({n} - 1) * {d})", "purpose": "Find sum using S = n/2(2a + (n-1)d)"},
    ],
    "subject": "math",
},

# --- GP: nth term ar^(n-1) ---
{
    "template_name": "gp_nth_term",
    "normalized_pattern": "find nth term of geometric progression if first term common ratio given",
    "keywords": ["nth term", "geometric progression", "gp", "first term", "common ratio"],
    "variables": [
        {"name": "a", "patterns": [r"first term\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"common ratio\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n", "patterns": [r"n\s*[=:]\s*(\d+\.?\d*)", r"term number\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {a} * {r}**({n} - 1)", "purpose": "Find nth term using aₙ = ar^(n-1)"},
    ],
    "subject": "math",
},

# --- GP: sum a(1-r^n)/(1-r) ---
{
    "template_name": "gp_sum",
    "normalized_pattern": "find sum of geometric progression if first term common ratio n given",
    "keywords": ["sum", "geometric progression", "gp", "first term", "common ratio"],
    "variables": [
        {"name": "a", "patterns": [r"first term\s*[=:]\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"common ratio\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n", "patterns": [r"n\s*[=:]\s*(\d+\.?\d*)", r"terms?\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {a} * (1 - {r}**{n}) / (1 - {r})", "purpose": "Find sum using S = a(1-r^n)/(1-r)"},
    ],
    "subject": "math",
},

# --- Distance between two points ---
{
    "template_name": "distance_formula",
    "normalized_pattern": "find distance between two points if coordinates given",
    "keywords": ["distance", "between", "two points", "coordinates"],
    "variables": [
        {"name": "x1", "patterns": [r"x1\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*,\s*(\d+\.?\d*)"], "required": True},
        {"name": "y1", "patterns": [r"y1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "x2", "patterns": [r"x2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "y2", "patterns": [r"y2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate sqrt(({x2} - {x1})**2 + ({y2} - {y1})**2)", "purpose": "Find distance using d = √((x₂-x₁)² + (y₂-y₁)²)"},
    ],
    "subject": "math",
},

# --- Midpoint ---
{
    "template_name": "midpoint",
    "normalized_pattern": "find midpoint if coordinates given two points",
    "keywords": ["midpoint", "coordinates", "two points"],
    "variables": [
        {"name": "x1", "patterns": [r"x1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "y1", "patterns": [r"y1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "x2", "patterns": [r"x2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "y2", "patterns": [r"y2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate ({x1} + {x2}) / 2", "purpose": "Find midpoint x-coordinate"},
        {"command": "calculate ({y1} + {y2}) / 2", "purpose": "Find midpoint y-coordinate"},
    ],
    "subject": "math",
},

# --- Slope of line ---
{
    "template_name": "slope_two_points",
    "normalized_pattern": "find slope if two points coordinates given",
    "keywords": ["slope", "two points", "coordinates", "gradient"],
    "variables": [
        {"name": "x1", "patterns": [r"x1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "y1", "patterns": [r"y1\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "x2", "patterns": [r"x2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "y2", "patterns": [r"y2\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate ({y2} - {y1}) / ({x2} - {x1})", "purpose": "Find slope using m = (y₂-y₁)/(x₂-x₁)"},
    ],
    "subject": "math",
},

# --- Permutations: nPr ---
{
    "template_name": "permutations",
    "normalized_pattern": "find permutations if n r given",
    "keywords": ["permutations", "npr", "arrangements"],
    "variables": [
        {"name": "n", "patterns": [r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {n}! / ({n} - {r})!", "purpose": "Find permutations using nPr = n!/(n-r)!"},
    ],
    "subject": "math",
},

# --- Combinations: nCr ---
{
    "template_name": "combinations",
    "normalized_pattern": "find combinations if n r given",
    "keywords": ["combinations", "ncr", "ways", "choose", "select"],
    "variables": [
        {"name": "n", "patterns": [r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {n}! / ({r}! * ({n} - {r})!)", "purpose": "Find combinations using nCr = n!/(r!(n-r)!)"},
    ],
    "subject": "math",
},

# --- Probability: P = favorable/total ---
{
    "template_name": "probability_basic",
    "normalized_pattern": "find probability if favorable outcomes total outcomes given",
    "keywords": ["probability", "favorable", "total", "outcomes"],
    "variables": [
        {"name": "fav", "patterns": [r"favorable\s*[=:]\s*(\d+\.?\d*)", r"favorable outcomes\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "total", "patterns": [r"total\s*[=:]\s*(\d+\.?\d*)", r"total outcomes\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {fav} / {total}", "purpose": "Find probability using P = favorable/total"},
    ],
    "subject": "math",
},

# --- Mean of numbers ---
{
    "template_name": "mean_calculation",
    "normalized_pattern": "find mean if numbers given data set",
    "keywords": ["mean", "average", "numbers", "data"],
    "variables": [
        {"name": "sum", "patterns": [r"sum\s*[=:]\s*(\d+\.?\d*)", r"total\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "count", "patterns": [r"count\s*[=:]\s*(\d+\.?\d*)", r"n\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*numbers?"], "required": True},
    ],
    "steps": [
        {"command": "calculate {sum} / {count}", "purpose": "Find mean using mean = sum/count"},
    ],
    "subject": "math",
},

# --- Differentiate polynomial ---
{
    "template_name": "differentiate_polynomial",
    "normalized_pattern": "differentiate polynomial expression if given",
    "keywords": ["differentiate", "derivative", "polynomial"],
    "variables": [
        {"name": "expr", "patterns": [r"differentiate\s+(.+)", r"derivative\s+of\s+(.+)", r"d/dx\s+(.+)"], "required": True, "type": "expression"},
    ],
    "steps": [
        {"command": "differentiate {expr}", "purpose": "Find derivative of the expression"},
    ],
    "subject": "math",
},

# --- Integrate polynomial ---
{
    "template_name": "integrate_polynomial",
    "normalized_pattern": "integrate polynomial expression if given",
    "keywords": ["integrate", "integral", "polynomial"],
    "variables": [
        {"name": "expr", "patterns": [r"integrate\s+(.+)", r"integral\s+of\s+(.+)"], "required": True, "type": "expression"},
    ],
    "steps": [
        {"command": "integrate {expr}", "purpose": "Find integral of the expression"},
    ],
    "subject": "math",
},

# --- Factor expression ---
{
    "template_name": "factor_expression",
    "normalized_pattern": "factor expression if given algebra",
    "keywords": ["factor", "factorize", "expression"],
    "variables": [
        {"name": "expr", "patterns": [r"factor\s+(.+)", r"factorize\s+(.+)"], "required": True, "type": "expression"},
    ],
    "steps": [
        {"command": "factor {expr}", "purpose": "Factor the expression"},
    ],
    "subject": "math",
},

# --- Expand expression ---
{
    "template_name": "expand_expression",
    "normalized_pattern": "expand expression if given algebra",
    "keywords": ["expand", "expression", "algebra", "brackets"],
    "variables": [
        {"name": "expr", "patterns": [r"expand\s+(.+)", r"multiply\s+out\s+(.+)"], "required": True, "type": "expression"},
    ],
    "steps": [
        {"command": "expand {expr}", "purpose": "Expand the expression"},
    ],
    "subject": "math",
},

# --- Simplify expression ---
{
    "template_name": "simplify_expression",
    "normalized_pattern": "simplify expression if given algebra",
    "keywords": ["simplify", "expression", "algebra"],
    "variables": [
        {"name": "expr", "patterns": [r"simplify\s+(.+)"], "required": True, "type": "expression"},
    ],
    "steps": [
        {"command": "simplify {expr}", "purpose": "Simplify the expression"},
    ],
    "subject": "math",
},

# --- Circle area ---
{
    "template_name": "circle_area",
    "normalized_pattern": "find area of circle if radius given",
    "keywords": ["area", "circle", "radius"],
    "variables": [
        {"name": "r", "patterns": [r"radius\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 3.14159 * {r}**2", "purpose": "Find area using A = πr²"},
    ],
    "subject": "math",
},

# --- Circle circumference ---
{
    "template_name": "circle_circumference",
    "normalized_pattern": "find circumference of circle if radius given",
    "keywords": ["circumference", "circle", "radius", "perimeter"],
    "variables": [
        {"name": "r", "patterns": [r"radius\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * 3.14159 * {r}", "purpose": "Find circumference using C = 2πr"},
    ],
    "subject": "math",
},

# --- Rectangle area ---
{
    "template_name": "rectangle_area",
    "normalized_pattern": "find area of rectangle if length width given",
    "keywords": ["area", "rectangle", "length", "width", "breadth"],
    "variables": [
        {"name": "l", "patterns": [r"length\s*[=:]\s*(\d+\.?\d*)", r"l\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "w", "patterns": [r"width\s*[=:]\s*(\d+\.?\d*)", r"breadth\s*[=:]\s*(\d+\.?\d*)", r"w\s*[=:]\s*(\d+\.?\d*)", r"b\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {l} * {w}", "purpose": "Find area using A = l × w"},
    ],
    "subject": "math",
},

# --- Triangle area ---
{
    "template_name": "triangle_area",
    "normalized_pattern": "find area of triangle if base height given",
    "keywords": ["area", "triangle", "base", "height"],
    "variables": [
        {"name": "b", "patterns": [r"base\s*[=:]\s*(\d+\.?\d*)", r"b\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "h", "patterns": [r"height\s*[=:]\s*(\d+\.?\d*)", r"h\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 0.5 * {b} * {h}", "purpose": "Find area using A = ½bh"},
    ],
    "subject": "math",
},

# --- Simple interest ---
{
    "template_name": "simple_interest",
    "normalized_pattern": "find simple interest if principal rate time given",
    "keywords": ["simple interest", "principal", "rate", "time"],
    "variables": [
        {"name": "P", "patterns": [r"principal\s*[=:]\s*(\d+\.?\d*)", r"P\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [r"rate\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "T", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"T\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {P} * {R} * {T} / 100", "purpose": "Find simple interest using SI = PRT/100"},
    ],
    "subject": "math",
},

# --- Compound interest ---
{
    "template_name": "compound_interest",
    "normalized_pattern": "find compound interest if principal rate time given",
    "keywords": ["compound interest", "principal", "rate", "time"],
    "variables": [
        {"name": "P", "patterns": [r"principal\s*[=:]\s*(\d+\.?\d*)", r"P\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [r"rate\s*[=:]\s*(\d+\.?\d*)", r"R\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "T", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"T\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n", "patterns": [r"compounded\s*(\d+\.?\d*)\s*times", r"n\s*[=:]\s*(\d+\.?\d*)"], "default": 1, "required": False},
    ],
    "steps": [
        {"command": "calculate {P} * (1 + {R} / (100 * {n}))**({n} * {T}) - {P}", "purpose": "Find compound interest using CI = P(1+R/(100n))^(nT) - P"},
    ],
    "subject": "math",
},

# --- Percentage ---
{
    "template_name": "percentage_of",
    "normalized_pattern": "find percentage of number if percentage value given",
    "keywords": ["percentage", "percent", "of"],
    "variables": [
        {"name": "pct", "patterns": [r"(\d+\.?\d*)\s*%", r"(\d+\.?\d*)\s*percent"], "required": True},
        {"name": "val", "patterns": [r"of\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*(?:given|number)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {pct} * {val} / 100", "purpose": "Find {pct}% of {val}"},
    ],
    "subject": "math",
},

# --- Rectangle perimeter ---
{
    "template_name": "rectangle_perimeter",
    "normalized_pattern": "find perimeter of rectangle if length width given",
    "keywords": ["perimeter", "rectangle", "length", "width", "breadth"],
    "variables": [
        {"name": "l", "patterns": [r"length\s*[=:]\s*(\d+\.?\d*)", r"l\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "w", "patterns": [r"width\s*[=:]\s*(\d+\.?\d*)", r"breadth\s*[=:]\s*(\d+\.?\d*)", r"w\s*[=:]\s*(\d+\.?\d*)", r"b\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * ({l} + {w})", "purpose": "Find perimeter using P = 2(l + w)"},
    ],
    "subject": "math",
},

# --- Simple interest ---
{
    "template_name": "simple_interest",
    "normalized_pattern": "find simple interest if principal rate time given",
    "keywords": ["simple interest", "interest", "principal", "rate", "time", "years"],
    "variables": [
        {"name": "P", "patterns": [r"principal\s*[=:]\s*(\d+\.?\d*)", r"p\s*[=:]\s*(\d+\.?\d*)", r"on\s+(\d+\.?\d*)\s+at"], "required": True},
        {"name": "R", "patterns": [r"rate\s*[=:]\s*(\d+\.?\d*)", r"at\s+(\d+\.?\d*)\s*%", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "T", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"for\s+(\d+\.?\d*)\s+years?", r"t\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {P} * {R} * {T} / 100", "purpose": "Find simple interest using SI = PRT/100"},
    ],
    "subject": "math",
},

# --- Compound interest ---
{
    "template_name": "compound_interest",
    "normalized_pattern": "find compound interest if principal rate time given",
    "keywords": ["compound interest", "interest", "principal", "rate", "time", "years", "compounded"],
    "variables": [
        {"name": "P", "patterns": [r"principal\s*[=:]\s*(\d+\.?\d*)", r"p\s*[=:]\s*(\d+\.?\d*)", r"on\s+(\d+\.?\d*)\s+at"], "required": True},
        {"name": "R", "patterns": [r"rate\s*[=:]\s*(\d+\.?\d*)", r"at\s+(\d+\.?\d*)\s*%", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "T", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"for\s+(\d+\.?\d*)\s+years?", r"t\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "n", "patterns": [r"compounded\s+(\w+)", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": False, "default": 1},
    ],
    "steps": [
        {"command": "calculate {P} * (1 + {R} / (100 * {n}))**({n} * {T}) - {P}", "purpose": "Find compound interest using CI = P(1 + R/(100n))^(nT) - P"},
    ],
    "subject": "math",
},

# --- Permutations nPr ---
{
    "template_name": "permutations_npr",
    "normalized_pattern": "find npr permutations if n r given",
    "keywords": ["permutation", "npr", "arrange", "arrangement"],
    "variables": [
        {"name": "n", "patterns": [r"(\d+)\s*[pc]", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"[pc]\s*(\d+)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate factorial({n}) / factorial({n} - {r})", "purpose": "Find permutations using nPr = n!/(n-r)!"},
    ],
    "subject": "math",
},

# --- Combinations nCr ---
{
    "template_name": "combinations_ncr",
    "normalized_pattern": "find ncr combinations if n r given",
    "keywords": ["combination", "ncr", "choose", "select", "ways to choose"],
    "variables": [
        {"name": "n", "patterns": [r"(\d+)\s*[pc]", r"n\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"[pc]\s*(\d+)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate factorial({n}) / (factorial({r}) * factorial({n} - {r}))", "purpose": "Find combinations using nCr = n!/(r!(n-r)!)"},
    ],
    "subject": "math",
},

# --- Mean from sum and count ---
{
    "template_name": "mean_from_sum_count",
    "normalized_pattern": "find mean if sum and count given",
    "keywords": ["mean", "average", "sum", "numbers", "count"],
    "variables": [
        {"name": "sum", "patterns": [r"sum\s*[=:]\s*(\d+\.?\d*)", r"sum\s+of\s+(\d+\.?\d*)"], "required": True},
        {"name": "count", "patterns": [r"(\d+)\s+numbers?", r"count\s*[=:]\s*(\d+\.?\d*)", r"(\d+)\s+values?"], "required": True},
    ],
    "steps": [
        {"command": "calculate {sum} / {count}", "purpose": "Find mean using mean = sum / count"},
    ],
    "subject": "math",
},

# --- Speed distance time ---
{
    "template_name": "speed_distance_time",
    "normalized_pattern": "find speed if distance and time given",
    "keywords": ["speed", "distance", "time", "travel", "train", "car", "km", "hours"],
    "variables": [
        {"name": "distance", "patterns": [r"distance\s*[=:]\s*(\d+\.?\d*)", r"travels?\s+(\d+\.?\d*)", r"(\d+\.?\d*)\s*km"], "required": True},
        {"name": "time", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"in\s+(\d+\.?\d*)\s+hours?", r"(\d+\.?\d*)\s+hours?"], "required": True},
    ],
    "steps": [
        {"command": "calculate {distance} / {time}", "purpose": "Find speed using speed = distance / time"},
    ],
    "subject": "math",
},

# --- Unitary method (cost per unit) ---
{
    "template_name": "unitary_method",
    "normalized_pattern": "find cost of one if total cost and quantity given",
    "keywords": ["cost", "pens", "books", "rupees", "price", "each", "one"],
    "variables": [
        {"name": "total_cost", "patterns": [r"cost\s+(\d+\.?\d*)", r"(\d+\.?\d*)\s+rupees?", r"price\s+(?:is|of)\s+(\d+\.?\d*)"], "required": True},
        {"name": "quantity", "patterns": [r"(\d+)\s+(?:pens|books|items|units|things|objects)", r"(\d+)\s+cost"], "required": True},
    ],
    "steps": [
        {"command": "calculate {total_cost} / {quantity}", "purpose": "Find cost per unit using cost = total / quantity"},
    ],
    "subject": "math",
},

# --- Cosine rule: cos(A) = (b² + c² - a²)/(2bc) ---
{
    "template_name": "cosine_rule",
    "normalized_pattern": "find angles of triangle if three sides given",
    "keywords": ["cosine", "cosine rule", "triangle", "angles", "sides"],
    "variables": [
        {"name": "a", "patterns": [r"sides?\s+(\d+\.?\d*)\s*,?\s*(\d+\.?\d*)\s*,?\s*(\d+\.?\d*)"], "required": True},
        {"name": "b", "patterns": [], "required": True},
        {"name": "c", "patterns": [], "required": True},
    ],
    "steps": [
        {"command": "calculate acos(({b}**2 + {c}**2 - {a}**2) / (2*{b}*{c})) * 180 / pi", "purpose": "Find angle A using cos(A) = (b²+c²-a²)/(2bc)"},
        {"command": "calculate acos(({a}**2 + {c}**2 - {b}**2) / (2*{a}*{c})) * 180 / pi", "purpose": "Find angle B using cos(B) = (a²+c²-b²)/(2ac)"},
        {"command": "calculate 180 - {step_1} - {step_2}", "purpose": "Find angle C = 180 - A - B"},
    ],
    "subject": "math",
},

# --- Probability: both red balls ---
{
    "template_name": "probability_both_same_color",
    "normalized_pattern": "find probability of drawing balls if counts given",
    "keywords": ["probability", "balls", "bag", "drawn", "red", "blue", "random"],
    "variables": [
        {"name": "red", "patterns": [r"(\d+)\s+red"], "required": True},
        {"name": "blue", "patterns": [r"(\d+)\s+blue"], "required": True},
        {"name": "draw", "patterns": [r"(\d+)\s+balls?\s+drawn", r"drawn\s+(\d+)", r"(\d+)\s+balls?\s+are\s+drawn"], "required": False, "default": 2},
    ],
    "steps": [
        {"command": "calculate {red} / ({red} + {blue})", "purpose": "P(first red) = red/total"},
        {"command": "calculate ({red}-1) / ({red} + {blue} - 1)", "purpose": "P(second red) = (red-1)/(total-1)"},
        {"command": "calculate {step_1} * {step_2}", "purpose": "P(both red) = P(first) × P(second)"},
        {"command": "calculate {red} * {blue} * 2 / (({red} + {blue}) * ({red} + {blue} - 1))", "purpose": "P(one red one blue) = 2×red×blue/(total×(total-1))"},
    ],
    "subject": "math",
},

# --- AP sum given S_n formula: find first term and common difference ---
{
    "template_name": "ap_sum_formula",
    "normalized_pattern": "find first term and common difference if sum formula given",
    "keywords": ["sum", "first n terms", "ap", "arithmetic progression", "first term", "common difference"],
    "variables": [
        {"name": "coef_n2", "patterns": [r"sum.*?(\d+\.?\d*)\s*n\^?2", r"(\d+\.?\d*)n²", r"(\d+\.?\d*)\s*\*\s*n\*\*2"], "required": True},
        {"name": "coef_n", "patterns": [r"\+\s*(\d+\.?\d*)\s*n\b", r"\+\s*(\d+\.?\d*)n\b"], "required": True},
        {"name": "n_term", "patterns": [r"(\d+)\w*\s+(?:term|th)"], "required": False, "default": 10},
    ],
    "steps": [
        {"command": "calculate {coef_n2} + {coef_n}", "purpose": "First term a = S(1) = coef_n2×1² + coef_n×1"},
        {"command": "calculate 2 * {coef_n2}", "purpose": "Common difference d = 2×coef_n2 (since S_n = n/2(2a + (n-1)d), coef of n² = d/2)"},
        {"command": "calculate {step_1} + ({n_term} - 1) * {step_2}", "purpose": "nth term = a + (n-1)d"},
    ],
    "subject": "math",
},

# --- Compound interest (deposits phrasing) ---
{
    "template_name": "compound_interest_deposits",
    "normalized_pattern": "find compound interest if deposit rate time given",
    "keywords": ["deposits", "compound interest", "bank", "annually", "rupees", "interest"],
    "variables": [
        {"name": "P", "patterns": [r"deposits\s+(\d+\.?\d*)", r"deposit\s+(?:of\s+)?(\d+\.?\d*)"], "required": True},
        {"name": "R", "patterns": [r"(\d+\.?\d*)\s*%\s+compound", r"(\d+\.?\d*)\s*%\s+interest", r"paying\s+(\d+\.?\d*)\s*%"], "required": True},
        {"name": "T", "patterns": [r"after\s+(\d+\.?\d*)\s+years?", r"for\s+(\d+\.?\d*)\s+years?"], "required": True},
        {"name": "n", "patterns": [r"compounded\s+(\w+)", r"annually"], "required": False, "default": 1},
    ],
    "steps": [
        {"command": "calculate {P} * (1 + {R} / 100)**{T}", "purpose": "Find total amount A = P(1 + R/100)^T"},
        {"command": "calculate {step_1} - {P}", "purpose": "Find interest earned = A - P"},
    ],
    "subject": "math",
},

# --- Rectangle inscribed in circle (optimization) ---
# Diagonal = 2r, x² + y² = 4r², max area when x=y (square), max A = 2r²
{
    "template_name": "rectangle_in_circle_optimization",
    "normalized_pattern": "find dimensions of largest rectangle inscribed in circle",
    "keywords": ["rectangle", "inscribed", "circle", "largest", "maximum", "dimensions", "radius"],
    "variables": [
        {"name": "r", "patterns": [r"radius\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"circle\s+of\s+radius\s+(\d+\.?\d*)", r"r\s*=\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * {r}**2", "purpose": "Find maximum area using A_max = 2r² (when rectangle is a square)"},
        {"command": "calculate {r} * sqrt(2)", "purpose": "Find side length using s = r√2 (each side of the square)"},
        {"command": "calculate 2 * {r}", "purpose": "Find diagonal using d = 2r (diameter of circle)"},
    ],
    "subject": "math",
},

# --- General optimization: maximize area of rectangle with fixed perimeter ---
# P = 2(x+y), max area when x=y (square), max A = (P/4)²
{
    "template_name": "rectangle_max_area_fixed_perimeter",
    "normalized_pattern": "find largest area of rectangle with given perimeter",
    "keywords": ["rectangle", "largest area", "maximum area", "perimeter", "fixed", "given perimeter"],
    "variables": [
        {"name": "P", "patterns": [r"perimeter\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"perimeter\s+of\s+(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate ({P} / 4)**2", "purpose": "Find max area using A_max = (P/4)² (when rectangle is a square)"},
        {"command": "calculate {P} / 4", "purpose": "Find side length using s = P/4"},
    ],
    "subject": "math",
},

# --- Cylinder in sphere optimization ---
# Max volume cylinder inscribed in sphere of radius r: V = (4πr³)/(3√3)
{
    "template_name": "cylinder_in_sphere_optimization",
    "normalized_pattern": "find largest cylinder inscribed in sphere",
    "keywords": ["cylinder", "inscribed", "sphere", "largest", "maximum", "volume", "radius"],
    "variables": [
        {"name": "r", "patterns": [r"radius\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"sphere\s+of\s+radius\s+(\d+\.?\d*)", r"r\s*=\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 4 * 3.14159 * {r}**3 / (3 * sqrt(3))", "purpose": "Find max volume using V_max = 4πr³/(3√3)"},
        {"command": "calculate {r} * sqrt(2/3)", "purpose": "Find cylinder radius using r_cyl = r√(2/3)"},
        {"command": "calculate 2 * {r} / sqrt(3)", "purpose": "Find cylinder height using h = 2r/√3"},
    ],
    "subject": "math",
},

# --- Cone in sphere optimization ---
# Max volume cone inscribed in sphere of radius r: V = (8πr³)/(27)
{
    "template_name": "cone_in_sphere_optimization",
    "normalized_pattern": "find largest cone inscribed in sphere",
    "keywords": ["cone", "inscribed", "sphere", "largest", "maximum", "volume", "radius"],
    "variables": [
        {"name": "r", "patterns": [r"radius\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"sphere\s+of\s+radius\s+(\d+\.?\d*)", r"r\s*=\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 8 * 3.14159 * {r}**3 / 27", "purpose": "Find max volume using V_max = 8πr³/27"},
        {"command": "calculate 2 * {r} / 3", "purpose": "Find cone height using h = 2r/3 (from top of sphere)"},
        {"command": "calculate 2 * sqrt(2) * {r} / 3", "purpose": "Find cone base radius using r_base = 2r√2/3"},
    ],
    "subject": "math",
},

# --- Caterpillar/creature on still band: time = distance / speed ---
{
    "template_name": "creature_on_still_band",
    "normalized_pattern": "find time to reach end if crawling speed and band length given",
    "keywords": ["caterpillar", "ant", "snail", "worm", "crawls", "crawl", "band", "reach the end", "lying still", "not being stretched", "still"],
    "variables": [
        {"name": "speed", "patterns": [r"crawls?\s+at\s+(\d+\.?\d*)\s*cm/s", r"crawl(?:s|ing)?\s+at\s+(\d+\.?\d*)\s*cm/s", r"speed\s*(?:is|=|:|of)?\s*(\d+\.?\d*)\s*cm/s", r"at\s+(\d+\.?\d*)\s*cm/s"], "required": True},
        {"name": "length", "patterns": [r"(\d+\.?\d*)\s*cm\s+band", r"band.*?(\d+\.?\d*)\s*cm", r"length\s*(?:is|=|:|of)?\s*(\d+\.?\d*)\s*cm"], "required": True},
    ],
    "steps": [
        {"command": "calculate {length} / {speed}", "purpose": "Find time using t = distance / speed (band is not stretching)"},
    ],
    "subject": "math",
},

# --- Worm on stretching band: T = (L/V) * (e^(V/u) - 1) ---
# Classic problem: band stretches uniformly at V cm/s, worm crawls at u cm/s
{
    "template_name": "worm_on_stretching_band",
    "normalized_pattern": "find time for worm to reach end if band stretches uniformly",
    "keywords": ["worm", "snail", "caterpillar", "ant", "crawls", "crawl", "band", "rubber band", "stretching", "stretches", "uniform", "reach the end", "far end"],
    "variables": [
        {"name": "u", "patterns": [r"crawls?\s+at\s+(\d+\.?\d*)\s*cm/s", r"crawl(?:s|ing)?\s+at\s+(\d+\.?\d*)\s*cm/s", r"speed\s*(?:is|=|:|of)?\s*(\d+\.?\d*)\s*cm/s", r"at\s+(\d+\.?\d*)\s*cm/s"], "required": True},
        {"name": "L", "patterns": [r"initial\s+length\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*cm\s+(?:band|rubber)", r"band.*?(\d+\.?\d*)\s*cm", r"length\s*(?:is|=|:|of)?\s*(\d+\.?\d*)\s*cm"], "required": True},
        {"name": "V", "patterns": [r"stretch(?:es|ing)?\s+(?:uniformly\s+)?at\s+(\d+\.?\d*)\s*cm/s", r"stretch(?:es|ing)?\s+at\s+(\d+\.?\d*)", r"(\d+\.?\d*)\s*cm/s.*stretch"], "required": True},
    ],
    "steps": [
        {"command": "calculate {V} / {u}", "purpose": "Find ratio V/u (stretch rate vs crawl speed)"},
        {"command": "calculate exp({step_1}) - 1", "purpose": "Find e^(V/u) - 1"},
        {"command": "calculate ({L} / {V}) * {step_2}", "purpose": "Find total time T = (L/V) × (e^(V/u) - 1)"},
    ],
    "subject": "math",
},

# --- Snail on doubling band: geometric series ---
# Band doubles every second. Snail covers fraction u/(L*2^k) in second k.
# Total fraction → 2u/L. If 2u/L < 1, snail NEVER reaches the end.
# If 2u/L >= 1, snail reaches end when sum of fractions = 1.
# Note: This template computes the fraction. The orchestrator must check
# if 2u/L < 1 and return "never reaches" in that case.
{
    "template_name": "snail_on_doubling_band",
    "normalized_pattern": "find time for snail to reach end if band doubles every second",
    "keywords": ["snail", "caterpillar", "ant", "worm", "crawls", "crawl", "band", "rubber band", "doubles", "doubling", "double", "reach the end", "far end"],
    "variables": [
        {"name": "u", "patterns": [r"crawls?\s+at\s+(\d+\.?\d*)\s*cm/s", r"crawl(?:s|ing)?\s+at\s+(\d+\.?\d*)\s*cm/s", r"speed\s*(?:is|=|:|of)?\s*(\d+\.?\d*)\s*cm/s", r"at\s+(\d+\.?\d*)\s*cm/s"], "required": True},
        {"name": "L", "patterns": [r"initial\s+length\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*cm\s+(?:band|rubber)", r"band.*?(\d+\.?\d*)\s*cm", r"length\s*(?:is|=|:|of)?\s*(\d+\.?\d*)\s*cm"], "required": True},
    ],
    "steps": [
        {"command": "calculate 2 * {u} / {L}", "purpose": "Find maximum fraction coverable: 2u/L (geometric series limit). If this < 1, snail NEVER reaches the end."},
    ],
    "subject": "math",
    "note": "If step_1 < 1, the snail never reaches the end. If step_1 >= 1, T = log(1/(1-2u/L))/log(2).",
},

]

# =========================================================================== #
# BIOLOGY TEMPLATES
# =========================================================================== #

BIOLOGY_TEMPLATES = [

# --- Hardy-Weinberg: p² + 2pq + q² = 1 ---
{
    "template_name": "hardy_weinberg_frequency",
    "normalized_pattern": "find allele frequency if genotype frequency given hardy weinberg",
    "keywords": ["hardy weinberg", "allele frequency", "genotype frequency"],
    "variables": [
        {"name": "q2", "patterns": [r"q\s*2\s*[=:]\s*(\d+\.?\d*)", r"q²\s*[=:]\s*(\d+\.?\d*)", r"homozygous recessive\s*[=:]\s*(\d+\.?\d*)", r"aa\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate sqrt({q2})", "purpose": "Find q = √(q²) from homozygous recessive frequency"},
        {"command": "calculate 1 - {step_1}", "purpose": "Find p = 1 - q"},
        {"command": "calculate 2 * {step_2} * {step_1}", "purpose": "Find heterozygous frequency 2pq"},
    ],
    "subject": "bio",
},

# --- Population growth: N = N₀e^rt ---
{
    "template_name": "population_growth",
    "normalized_pattern": "find population size if initial population growth rate time given",
    "keywords": ["population", "growth", "exponential", "initial"],
    "variables": [
        {"name": "N0", "patterns": [r"initial population\s*[=:]\s*(\d+\.?\d*)", r"N0\s*[=:]\s*(\d+\.?\d*)", r"n0\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "r", "patterns": [r"growth rate\s*[=:]\s*(\d+\.?\d*)", r"r\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "t", "patterns": [r"time\s*[=:]\s*(\d+\.?\d*)", r"t\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {N0} * 2.71828 ** ({r} * {t})", "purpose": "Find population using N = N₀e^rt"},
    ],
    "subject": "bio",
},

# --- Phenotypic ratio from cross ---
{
    "template_name": "genetic_cross_ratio",
    "normalized_pattern": "find phenotypic ratio if cross given genetics",
    "keywords": ["phenotypic ratio", "cross", "genetics", "mendel", "heterozygous"],
    "variables": [],
    "steps": [
        {"command": "calculate 3 / 4", "purpose": "Dominant phenotype probability in monohybrid cross = 3/4"},
        {"command": "calculate 1 / 4", "purpose": "Recessive phenotype probability in monohybrid cross = 1/4"},
        {"command": "calculate 9 / 16", "purpose": "Dominant both traits in dihybrid cross = 9/16"},
        {"command": "calculate 3 / 16", "purpose": "One dominant one recessive in dihybrid cross = 3/16"},
        {"command": "calculate 1 / 16", "purpose": "Both recessive in dihybrid cross = 1/16"},
    ],
    "subject": "bio",
},

# --- Chi-square test ---
{
    "template_name": "chi_square",
    "normalized_pattern": "find chi square value if observed expected given",
    "keywords": ["chi square", "observed", "expected", "goodness of fit"],
    "variables": [
        {"name": "obs", "patterns": [r"observed\s*[=:]\s*(\d+\.?\d*)", r"obs\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "exp", "patterns": [r"expected\s*[=:]\s*(\d+\.?\d*)", r"exp\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate ({obs} - {exp})**2 / {exp}", "purpose": "Find chi-square using χ² = (O-E)²/E"},
    ],
    "subject": "bio",
},

# --- BMI calculation ---
{
    "template_name": "bmi_calculation",
    "normalized_pattern": "find bmi if weight height given body mass index",
    "keywords": ["bmi", "body mass index", "weight", "height"],
    "variables": [
        {"name": "weight", "patterns": [r"weight\s*[=:]\s*(\d+\.?\d*)", r"w\s*[=:]\s*(\d+\.?\d*)\s*kg"], "required": True},
        {"name": "height", "patterns": [r"height\s*[=:]\s*(\d+\.?\d*)", r"h\s*[=:]\s*(\d+\.?\d*)\s*m"], "required": True},
    ],
    "steps": [
        {"command": "calculate {weight} / {height}**2", "purpose": "Find BMI using BMI = weight(kg)/height(m)²"},
    ],
    "subject": "bio",
},

]

# =========================================================================== #
# ALL TEMPLATES COMBINED
# =========================================================================== #

# Node-mapped templates (traceable to atomic curriculum nodes)
from backend.ai.node_templates_phy_c12 import PHY_C12_NODE_TEMPLATES
from backend.ai.node_templates_chem_c12 import CHEM_C12_NODE_TEMPLATES
from backend.ai.node_templates_math_c10 import MATH_C10_NODE_TEMPLATES
from backend.ai.node_templates_bio_c12 import BIO_C12_NODE_TEMPLATES

ALL_TEMPLATES = (
    PHYSICS_TEMPLATES + CHEMISTRY_TEMPLATES + MATH_TEMPLATES + BIOLOGY_TEMPLATES
    + PHY_C12_NODE_TEMPLATES + CHEM_C12_NODE_TEMPLATES + MATH_C10_NODE_TEMPLATES + BIO_C12_NODE_TEMPLATES
)
