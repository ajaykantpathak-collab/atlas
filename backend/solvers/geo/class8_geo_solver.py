import numpy as np
import sympy as sp
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from enum import Enum
import random
import hashlib

# ============================================================================
# Deterministic seeded random wrapper
# ============================================================================
class SeededRNG:
    """Deterministic RNG keyed by (seed, node_id, question_index)."""
    @staticmethod
    def get(seed: int, node_id: str, q_index: int) -> random.Random:
        key = f"{seed}:{node_id}:{q_index}"
        h = int(hashlib.sha256(key.encode()).hexdigest()[:16], 16)
        return random.Random(h)

# ============================================================================
# Data structures
# ============================================================================
class Difficulty(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3

class CompetencyLevel(Enum):
    SCHOOL = 1
    BOARD = 2

@dataclass
class Problem:
    node_id: str
    question_text: str
    options: List[str]
    correct_index: int
    steps: List[str]
    explanation: str
    competency: CompetencyLevel
    difficulty: Difficulty
    topic: str
    seed_used: str

@dataclass
class VerificationResult:
    is_correct: bool
    user_answer: int
    correct_index: int
    explanation: str

@dataclass
class NodeResult:
    node_id: str
    topic: str
    problems: List[Problem]
    score: float = 0.0
    total: int = 0

# ============================================================================
# Utility helpers
# ============================================================================
def rf_to_statement(rf_num: int, rf_den: int) -> str:
    """Convert RF scale to statement scale (Indian context)."""
    real_cm = rf_den / rf_num
    if real_cm == 1:
        return "1 cm on map = 1 km on ground"
    km = real_cm
    return f"1 cm on map = {km:.0f} km on ground"

def statement_to_rf(statement_km: float) -> Tuple[int, int]:
    """Convert statement scale (1 cm = X km) to RF."""
    cm_to_ground_cm = statement_km * 100_000
    # Simplify ratio
    return (1, int(cm_to_ground_cm))

def graphical_scale_label(rf_den: int, rf_num: int, bar_divisions: int = 5) -> str:
    """Generate graphical scale description."""
    ground_km = rf_den / (rf_num * 100_000) * bar_divisions
    return f"Graphical bar divided into {bar_divisions} parts, each representing {ground_km/bar_divisions:.0f} km"

def bearing_from_direction(direction_str: str) -> float:
    """Convert cardinal/intercardinal direction to bearing in degrees."""
    bearings = {
        "N": 0, "NNE": 22.5, "NE": 45, "ENE": 67.5,
        "E": 90, "ESE": 112.5, "SE": 135, "SSE": 157.5,
        "S": 180, "SSW": 202.5, "SW": 225, "WSW": 247.5,
        "W": 270, "WNW": 292.5, "NW": 315, "NNW": 337.5
    }
    return bearings.get(direction_str.upper(), 0.0)

def grid_ref_4figure(easting: int, northing: int) -> str:
    """Four-figure grid reference: truncate to nearest km."""
    return f"{easting // 1000}{northing // 1000}"

def grid_ref_6figure(easting: int, northing: int) -> str:
    """Six-figure grid reference: to nearest 100 m."""
    e_km = easting // 1000
    n_km = northing // 1000
    e_100m = (easting % 1000) // 100
    n_100m = (northing % 1000) // 100
    return f"{e_km}{e_100m}{n_km}{n_100m}"

def measure_distance_on_map(x1, y1, x2, y2, scale_rf_den: int, scale_rf_num: int = 1) -> float:
    """Straight-line map distance in cm to real distance in km."""
    map_dist_cm = sp.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    real_cm = map_dist_cm * scale_rf_num
    return float(real_cm / 100_000)  # cm to km

def birth_rate(births: int, mid_pop: int) -> float:
    return (births / mid_pop) * 1000

def death_rate(deaths: int, mid_pop: int) -> float:
    return (deaths / mid_pop) * 1000

def natural_growth_rate(br: float, dr: float) -> float:
    return br - dr

def arithmetic_density(total_pop: int, area_sqkm: float) -> float:
    return total_pop / area_sqkm

def physiological_density(total_pop: int, arable_area_sqkm: float) -> float:
    return total_pop / arable_area_sqkm

# ============================================================================
# c8_geo_001: Representation of geographical features
# ============================================================================
def generate_001(seed: int, q_index: int) -> Problem:
    rng = SeededRNG.get(seed, "c8_geo_001", q_index)
    difficulty = Difficulty(rng.randint(1, 3))
    topic = rng.choice([
        "scale_conversion", "grid_reference", "bearing",
        "distance_measurement", "map_symbols", "sketch_vs_plan"
    ])
    steps = []
    explanation = ""

    if topic == "scale_conversion":
        # Indian context: use common Indian topo map scales
        scale_options = [
            (1, 50000, "1 cm on map = 0.5 km on ground"),
            (1, 100000, "1 cm on map = 1 km on ground"),
            (1, 25000, "1 cm on map = 0.25 km on ground"),
            (1, 5000, "1 cm on map = 0.05 km on ground"),
        ]
        chosen = scale_options[rng.randint(0, len(scale_options) - 1)]
        rf_n, rf_d, stmt = chosen
        # SymPy verification
        n, d = sp.symbols('n d', positive=True)
        real_cm_expr = d / n  # real cm per 1 map cm
        result_cm = real_cm_expr.subs({n: rf_n, d: rf_d})
        result_km = sp.simplify(result_cm / 100000)
        steps = [
            f"RF Scale is 1:{rf_d}",
            f"1 cm on map represents {rf_d} cm on ground",
            f"{rf_d} cm = {rf_d / 100000} km = {float(result_km)} km",
            f"Therefore, 1 cm on map = {float(result_km)} km on ground"
        ]
        correct_text = stmt
        options = [stmt]
        for opt in scale_options:
            if opt[2] != stmt:
                options.append(opt[2])
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = f"To convert RF {rf_n}:{rf_d} to statement: divide denominator by 1,00,000 to get km. 1 cm = {rf_d} cm = {rf_d/100000} km."

    elif topic == "grid_reference":
        east = rng.randint(100, 999)
        north = rng.randint(100, 999)
        mode = rng.choice(["4figure", "6figure"])
        if mode == "4figure":
            ref = grid_ref_4figure(east, north)
            steps = [
                f"Given: Easting = {east} m, Northing = {north} m",
                "Four-figure grid reference: drop last two digits of each",
                f"Easting → {east//1000}, Northing → {north//1000}",
                f"Grid reference: {ref}"
            ]
            correct_text = ref
            wrong1 = f"{east//1000}{(north//1000 + 1) % 10}"
            wrong2 = f"{(east//1000 + 1) % 10}{north//1000}"
            wrong3 = f"{east//1000}{(north//1000 - 1) % 10}"
        else:
            ref = grid_ref_6figure(east, north)
            steps = [
                f"Given: Easting = {east} m, Northing = {north} m",
                "Six-figure grid reference: keep last 1 digit (100 m precision) of each",
                f"Easting → {east//1000}{(east%1000)//100}, Northing → {north//1000}{(north%1000)//100}",
                f"Grid reference: {ref}"
            ]
            correct_text = ref
            wrong1 = grid_ref_4figure(east, north)
            wrong2 = f"{(east//1000 + 1) % 10}{(east%1000)//100}{(north//1000 + 1) % 10}{(north%1000)//100}"
            wrong3 = f"{east//1000}{(east%1000)//100}{(north//1000 - 1) % 10}{(north%1000)//100}"
        options = [correct_text, wrong1, wrong2, wrong3]
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = f"Four-figure gives 1 km precision; six-figure gives 100 m precision."

    elif topic == "bearing":
        directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        ref_dir = directions[rng.randint(0, len(directions) - 1)]
        target_dir = directions[rng.randint(0, len(directions) - 1)]
        bearing_val = bearing_from_direction(target_dir)
        steps = [
            f"Reference direction: {ref_dir} (0° bearing)",
            f"Target direction: {target_dir}",
            f"Bearing is measured clockwise from North",
            f"Bearing of {target_dir} = {bearing_val}°"
        ]
        correct_text = f"{bearing_val}°"
        wrong_vals = sorted(set([bearing_val + 45, bearing_val - 45 if bearing_val >= 45 else bearing_val + 315, (bearing_val + 90) % 360, (bearing_val + 180) % 360]))
        wrong_texts = [f"{v}°" for v in wrong_vals[:3]]
        options = [correct_text] + wrong_texts
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = f"Bearing is measured clockwise from North. {target_dir} = {bearing_val}°."

    elif topic == "distance_measurement":
        rf_d = rng.choice([25000, 50000, 100000])
        x1, y1 = rng.randint(1, 5), rng.randint(1, 5)
        x2, y2 = rng.randint(6, 10), rng.randint(6, 10)
        dist_km = measure_distance_on_map(x1, y1, x2, y2, rf_d)
        # Round to 2 decimal
        dist_rounded = round(dist_km, 2)
        steps = [
            f"Map distance = √(({x2}-{x1})² + ({y2}-{y1})²) = √({x2-x1}² + {y2-y1}²) cm",
            f"= √({(x2-x1)**2} + {(y2-y1)**2}) = √{((x2-x1)**2 + (y2-y1)**2)} ≈ {sp.sqrt((x2-x1)**2 + (y2-y1)**2):.2f} cm",
            f"RF = 1:{rf_d}, so 1 cm = {rf_d/100000} km",
            f"Ground distance = {sp.sqrt((x2-x1)**2 + (y2-y1)**2):.2f} × {rf_d/100000} = {dist_rounded} km"
        ]
        correct_text = f"{dist_rounded} km"
        wrongs = sorted(set([
            round(dist_rounded + 0.5, 2),
            round(dist_rounded - 0.3, 2),
            round(dist_rounded * 2, 2)
        ]))[:3]
        wrong_texts = [f"{w} km" for w in wrongs]
        options = [correct_text] + wrong_texts
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = f"Distance on ground = map distance (cm) × scale factor (RF denominator / 1,00,000)."

    elif topic == "map_symbols":
        # Conventional signs questions
        sign_q = rng.choice([
            ("Blue colour on a topographical map represents", "water bodies / rivers / lakes"),
            ("Green colour on a topographical map represents", "vegetation / forests"),
            ("Black colour on a topographical map represents", "roads, railways, boundaries"),
            ("Brown/Yellow contour lines represent", "relief / hills and valleys"),
            ("Red colour on a topographical map represents", "settlements / built-up areas"),
        ])
        correct_text = sign_q[1]
        options_map = {
            sign_q[1]: sign_q[1],
            "rivers and water bodies" if sign_q[0].startswith("Blue") else None: None,
            "mountains and hills" if sign_q[0].startswith("Brown") else None: None,
            "settlements and roads" if sign_q[0].startswith("Red") else None: None,
        }
        all_opts = [
            sign_q[1],
            sign_q[1] + " (alternative)",
            "forests and grasslands" if "water" not in sign_q[1] else "mountains and plateaus",
            "cultivated land"
        ]
        all_opts = list(set(all_opts))
        rng.shuffle(all_opts)
        options = all_opts[:4]
        if correct_text not in options:
            options[0] = correct_text
            rng.shuffle(options)
        correct_index = options.index(correct_text)
        steps = [f"Question: {sign_q[0]}", f"Answer: {sign_q[1]}"]
        explanation = f"Standard topographical map colour code: {sign_q[1].capitalize()}."

    else:  # sketch_vs_plan
        correct_text = "A plan is drawn to scale; a sketch is not drawn to scale."
        options = [
            correct_text,
            "A sketch is drawn to scale; a plan is not.",
            "Both are drawn to the same scale.",
            "Neither uses any scale."
        ]
        correct_index = 0
        steps = [
            "A SKETCH is a freehand drawing showing approximate relative positions — NOT to scale.",
            "A PLAN is a detailed, scaled drawing of a small area (like a room or building) — DRAWN TO SCALE.",
            "Key difference: Scale is the defining feature of a plan."
        ]
        explanation = "Sketches show approximate positions without scale. Plans are scaled, accurate drawings of small areas."

    seed_key = f"001:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_001", question_text=steps[0] if steps else "",
        options=options, correct_index=correct_index,
        steps=steps, explanation=explanation,
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

# ============================================================================
# c8_geo_002: Population dynamics
# ============================================================================
def generate_002(seed: int, q_index: int) -> Problem:
    rng = SeededRNG.get(seed, "c8_geo_002", q_index)
    difficulty = Difficulty(rng.randint(1, 3))
    topic = rng.choice([
        "arithmetic_density", "physiological_density",
        "birth_death_growth_rates", "natural_growth_rate",
        "population_pyramid", "dense_sparse_regions",
        "overpopulation", "underpopulation"
    ])
    steps = []
    explanation = ""

    if topic == "arithmetic_density":
        pop = rng.randint(5_00_000, 5_00_00_000)
        area = rng.randint(1000, 500_000)
        density = arithmetic_density(pop, area)
        density_rounded = round(density, 2)
        steps = [
            f"Population = {pop:,}",
            f"Area = {area:,} sq km",
            f"Arithmetic Density = Total Population / Total Area",
            f"= {pop:,} / {area:,} = {density_rounded} persons/sq km"
        ]
        correct_text = f"{density_rounded} persons/sq km"
        wrongs = [round(density_rounded * 1.5, 2), round(density_rounded * 2, 2), round(density_rounded * 0.5, 2)]
        wrong_texts = [f"{w} persons/sq km" for w in wrongs]
        options = [correct_text] + wrong_texts
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = "Arithmetic density = total population ÷ total land area. It is a general measure of crowding."

    elif topic == "physiological_density":
        pop = rng.randint(1_00_00_000, 10_00_00_000)
        total_area = rng.randint(50_000, 500_000)
        arable = rng.randint(5_000, total_area // 3)
        phys = physiological_density(pop, arable)
        arith = arithmetic_density(pop, total_area)
        phys_r = round(phys, 2)
        arith_r = round(arith, 2)
        steps = [
            f"Total Population = {pop:,}",
            f"Arable Land = {arable:,} sq km",
            f"Physiological Density = Total Population / Arable Land",
            f"= {pop:,} / {arable:,} = {phys_r} persons/sq km",
            f"(Arithmetic density = {arith_r} persons/sq km for comparison)"
        ]
        correct_text = f"{phys_r} persons/sq km"
        wrongs = [round(phys_r * 1.3, 2), round(arith_r, 2), round(phys_r * 0.7, 2)]
        wrong_texts = [f"{w} persons/sq km" for w in wrongs]
        options = [correct_text] + wrong_texts
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = "Physiological density uses only arable land. It shows pressure on productive land. Higher than arithmetic density means less land per farmer."

    elif topic == "birth_death_growth_rates":
        pop = rng.randint(10_00_000, 50_00_000)
        births = rng.randint(10000, 500000)
        deaths = rng.randint(5000, 400000)
        br = birth_rate(births, pop)
        dr = death_rate(deaths, pop)
        ngr = natural_growth_rate(br, dr)
        br_r, dr_r, ngr_r = round(br, 2), round(dr, 2), round(ngr, 2)
        steps = [
            f"Mid-year Population = {pop:,}",
            f"Birth Rate = (Births / Mid-year Pop) × 1000 = ({births:,} / {pop:,}) × 1000 = {br_r} per 1000",
            f"Death Rate = (Deaths / Mid-year Pop) × 1000 = ({deaths:,} / {pop:,}) × 1000 = {dr_r} per 1000",
            f"Natural Growth Rate = Birth Rate − Death Rate = {br_r} − {dr_r} = {ngr_r} per 1000"
        ]
        correct_text = f"{ngr_r} per 1000"
        wrongs = [round(br_r, 2), round(dr_r, 2), round(ngr_r + br_r, 2)]
        wrong_texts = [f"{w} per 1000" for w in wrongs]
        options = [correct_text] + wrong_texts
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = "Natural Growth Rate = Birth Rate − Death Rate (per 1000 population). Both are calculated per 1000, not percentage."

    elif topic == "natural_growth_rate":
        br = rng.randint(8, 45)
        dr = rng.randint(4, 30)
        ngr = br - dr
        direction = "increasing" if ngr > 0 else "decreasing" if ngr < 0 else "stable"
        steps = [
            f"Birth Rate = {br} per 1000",
            f"Death Rate = {dr} per 1000",
            f"Natural Growth Rate = {br} − {dr} = {ngr} per 1000",
            f"Since {ngr} {'>' if ngr > 0 else '<'} 0, population is {direction}"
        ]
        correct_text = f"{ngr} per 1000 ({direction})"
        wrongs = [f"{br+dr} per 1000", f"{br} per 1000", f"{dr} per 1000"]
        options = [correct_text] + wrongs
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        explanation = "NGR = BR − DR. Positive NGR → population growing; negative → declining."

    elif topic == "population_pyramid":
        pyramid_type = rng.choice(["broad_based", "narrow_based", "constrictive", "stationary"])
        desc_map = {
            "broad_based": ("Broad base, narrow top", "High birth rate, young population, developing country (e.g., Nigeria, India historically)", "Expanding population"),
            "narrow_based": ("Narrow base, wider middle", "Low birth rate, ageing population, developed country (e.g., Japan, Germany)", "Contracting population"),
            "constrictive": ("Bulge in middle, narrow base and top", "Low birth and death rates, ageing, below-replacement fertility", "Declining population"),
            "stationary": ("Roughly rectangular shape", "Low birth and death rates, stable population", "Stable population")
        }
        desc_text, meaning, pop_trend = desc_map[pyramid_type]
        options_list = [
            desc_text,
            desc_map["broad_based"][0],
            desc_map["narrow_based"][0],
            desc_map["stationary"][0]
        ]
        correct_text = f"{desc_text} — {meaning}"
        options = [
            f"{desc_text} — {meaning}",
            f"{desc_map['broad_based'][0]} — High birth rate, young population",
            f"{desc_map['narrow_based'][0]} — Low birth rate, ageing population",
            f"{desc_map['stationary'][0]} — Stable population"
        ]
        correct_index = 0
        steps = [
            f"Pyramid type: {pyramid_type.replace('_', ' ').title()}",
            f"Shape: {desc_text}",
            f"Meaning: {meaning}",
            f"Population trend: {pop_trend}"
        ]
        explanation = f"Broad base = high birth rate. Narrow top = lower life expectancy. Constrictive = ageing, declining population."

    elif topic == "dense_sparse_regions":
        is_dense = rng.choice([True, False])
        if is_dense:
            region = rng.choice([
                "Ganga Plains", "Coastal regions of India", "Deccan Plateau (parts)",
                "Northeast India (Brahmaputra valley)"
            ])
            reasons = "Fertile soil, abundant water supply, flat terrain, favourable climate, agricultural activity, and historical settlement"
        else:
            region = rng.choice([
                "Thar Desert", "Himalayan mountains", "Central Highlands (parts)",
                "Rann of Kutch"
            ])
            reasons = "Harsh climate, rugged terrain, scarcity of water, poor soil quality, and extreme temperatures"
        correct_text = f"{region}: {reasons}"
        options = [
            correct_text,
            f"{region}: Opposite reasons",
            f"{region}: Same as above (incorrect)",
            f"{region}: No specific reason"
        ]
        correct_index = 0
        steps = [
            f"Region: {region}",
            f"Population density: {'High' if is_dense else 'Low'}",
            f"Reasons: {reasons}"
        ]
        explanation = f"Dense regions have fertile land, water, flat terrain. Sparse regions have harsh geography/climate."

    elif topic == "overpopulation":
        aspects = rng.choice(["problems", "solutions"])
        if aspects == "problems":
            correct_text = "Problems: unemployment, poverty, strain on resources, pollution, inadequate housing, traffic congestion, pressure on education/healthcare"
            options = [
                correct_text,
                "Benefits: larger workforce, more consumers, cultural diversity",
                "No problems — population always helps economy",
                "Only environmental problems, no social issues"
            ]
            explanation = "Overpopulation leads to unemployment, resource depletion, pollution, inadequate housing, pressure on services."
        else:
            correct_text = "Solutions: family planning, education (especially women), awareness programmes, delayed marriage, economic incentives"
            options = [
                correct_text,
                "Encouraging more births to increase workforce",
                "Only migration can solve overpopulation",
                "Reducing healthcare to control population"
            ]
            explanation = "Solutions focus on education, family planning, women empowerment, and awareness — not coercion."
        correct_index = 0
        steps = [
            f"Topic: Overpopulation — {aspects}",
            f"Answer: {correct_text}"
        ]

    else:  # underpopulation
        correct_text = "Problems: labour shortage, underutilised resources, low market demand, difficulty sustaining services"
        options = [
            correct_text,
            "Problems: overcrowding, pollution, unemployment",
            "No problems — small population is always better",
            "Only environmental benefits, no economic issues"
        ]
        correct_index = 0
        steps = [
            "Underpopulation: Too few people for available resources",
            "Problems: labour shortage, underutilised resources, low demand"
        ]
        explanation = "Underpopulation leads to labour shortage, underutilised resources, and difficulty sustaining public services."

    seed_key = f"002:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_002", question_text=steps[0],
        options=options, correct_index=correct_index,
        steps=steps, explanation=explanation,
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

# ============================================================================
# c8_geo_003: Migration
# ============================================================================
def generate_003(seed: int, q_index: int) -> Problem:
    rng = SeededRNG.get(seed, "c8_geo_003", q_index)
    difficulty = Difficulty(rng.randint(1, 3))
    topic = rng.choice([
        "migration_definition", "internal_migration_types",
        "international_migration", "push_factors",
        "pull_factors", "consequences_source",
        "consequences_destination", "brain_drain"
    ])
    steps = []
    explanation = ""

    if topic == "migration_definition":
        correct_text = "Migration is the movement of people from one place to another for permanent or semi-permanent settlement"
        options = [
            correct_text,
            "Migration is the seasonal movement of animals",
            "Migration is only international movement",
            "Migration is temporary movement for tourism"
        ]
        correct_index = 0
        steps = [
            "Migration = movement of people",
            "From one place (origin/source region) to another (destination)",
            "For permanent or long-term settlement",
            "Can be internal (within country) or international (between countries)"
        ]
        explanation = "Migration involves people moving for settlement, not temporary travel. Can be internal or international."

    elif topic == "internal_migration_types":
        mig_type = rng.choice(["rural-urban", "urban-rural", "rural-rural", "urban-urban"])
        correct_text = f"{mig_type.replace('-', ' to ').title()} migration"
        options = [
            correct_text,
            "International emigration",
            "Cross-border refugee movement",
            "Seasonal tourism migration"
        ]
        correct_index = 0
        steps = [
            f"Internal migration occurs within the same country",
            f"Type: {mig_type.replace('-', ' to ').replace('urban', 'urban area').replace('rural', 'rural area').title()}",
            "Example: Rural → Urban: moving from village to city for jobs"
        ]
        explanation = "Internal migration types: rural→urban (most common in India), urban→rural, rural→rural, urban→urban."

    elif topic == "international_migration":
        direction = rng.choice(["emigration", "immigration"])
        correct_text = f"{'Leaving' if direction == 'emigration' else 'Entering'} one's own country to settle in another"
        options = [
            correct_text,
            "Moving within the same country",
            "Temporary travel for business",
            "Movement of refugees only"
        ]
        correct_index = 0
        steps = [
            f"International migration involves crossing national borders",
            f"{'Emigration' if direction == 'emigration' else 'Immigration'}: {'Leaving' if direction == 'emigration' else 'Entering'} one's country"
        ]
        explanation = "Emigration = leaving home country. Immigration = entering a new country. Both are international migration."

    elif topic == "push_factors":
        factor = rng.choice([
            "Lack of employment opportunities",
            "Natural disasters (floods, earthquakes, drought)",
            "Poverty and low standard of living",
            "Conflict, war, and political instability",
            "Lack of educational and healthcare facilities"
        ])
        correct_text = factor
        options = [
            correct_text,
            "Better job opportunities abroad",
            "Better education and healthcare",
            "Higher standard of living"
        ]
        correct_index = 0
        steps = [
            f"Push factor: {factor}",
            "Push factors drive people AWAY from their current residence",
            "They make the source region less livable"
        ]
        explanation = "Push factors are negative conditions at the origin that force people to leave."

    elif topic == "pull_factors":
        factor = rng.choice([
            "Better employment opportunities",
            "Better education and healthcare",
            "Higher standard of living",
            "Political stability and safety"
        ])
        correct_text = factor
        options = [
            correct_text,
            "War and conflict",
            "Poverty and unemployment",
            "Natural disasters and drought"
        ]
        correct_index = 0
        steps = [
            f"Pull factor: {factor}",
            "Pull factors ATTRACT people to the destination region",
            "They make the destination more appealing"
        ]
        explanation = "Pull factors are positive conditions at the destination that attract migrants."

    elif topic == "consequences_source":
        consequence = rng.choice([
            "Labour shortage in agriculture and industry",
            "Brain drain — loss of skilled and educated people",
            "Reduced dependency ratio (fewer dependents per worker)",
            "Remittances sent back by migrants improve family income"
        ])
        correct_text = consequence
        wrong_options = [
            "Overcrowding and slum development",
            "Increased job opportunities for locals",
            "Cultural enrichment from diversity",
            "Reduced pressure on land and resources"
        ]
        options = [correct_text] + rng.sample(wrong_options, 3)
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        steps = [
            f"Consequence on SOURCE region: {consequence}",
            "Other consequences: break-up of families, reduced local demand"
        ]
        explanation = "Source region loses working-age people (brain drain, labour shortage) but gains remittances. Family bonds weaken."

    elif topic == "consequences_destination":
        consequence = rng.choice([
            "Overcrowding and pressure on housing/infrastructure",
            "Availability of cheap labour",
            "Cultural diversity and enrichment",
            "Growth of slums and unauthorised colonies"
        ])
        correct_text = consequence
        wrong_options = [
            "Brain drain of skilled workers",
            "Reduction in population pressure",
            "Labour shortage in key sectors",
            "Decreased remittances"
        ]
        options = [correct_text] + rng.sample(wrong_options, 3)
        rng.shuffle(options)
        correct_index = options.index(correct_text)
        steps = [
            f"Consequence on DESTINATION region: {consequence}",
            "Other consequences: increased burden on services, cultural change"
        ]
        explanation = "Destination region gains labour but faces overcrowding, slums, infrastructure strain, and cultural adjustment issues."

    else:  # brain_drain
        correct_text = "Loss of educated/skilled people from source country to developed countries — weakens source, benefits destination"
        options = [
            correct_text,
            "Gain of skilled people in source country",
            "Only affects unskilled workers",
            "No economic impact"
        ]
        correct_index = 0
        steps = [
            "Brain Drain = emigration of educated/skilled professionals",
            "Example: Indian doctors/IT professionals moving to USA, UK, Canada",
            "Source country loses investment in education",
            "Destination country gains skilled workforce without training cost"
        ]
        explanation = "Brain drain is a major consequence where source countries lose their best minds, affecting development."

    seed_key = f"003:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_003", question_text=steps[0],
        options=options, correct_index=correct_index,
        steps=steps, explanation=explanation,
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

# ============================================================================
# Additional Nodes (c8_geo_004 through c8_geo_00N) — India-specific topics
# ============================================================================
def generate_004(seed: int, q_index: int) -> Problem:
    """India — Physical Features: Rivers, Mountains, Plains, Plateaus, Islands"""
    rng = SeededRNG.get(seed, "c8_geo_004", q_index)
    topic = rng.choice(["rivers", "mountains", "plains", "plateaus", "islands", "climate_zones"])
    steps = []
    explanation = ""

    data = {
        "rivers": {
            "q": "Which of these is a peninsular river of India?",
            "opts": ["Godavari", "Indus", "Brahmaputra", "Ganga"],
            "correct": 0,
            "steps": ["Peninsular rivers flow east/west into the sea.", "Godavari, Krishna, Kaveri, Mahanadi are major peninsular rivers.", "Indus, Ganga, Brahmaputra are Himalayan rivers."],
            "exp": "Peninsular rivers originate in the Western Ghats/central highlands. Godavari is the longest peninsular river."
        },
        "mountains": {
            "q": "The Himalayan mountain range was formed due to:",
            "opts": ["Collision of Indian and Eurasian tectonic plates", "Volcanic activity", "Erosion by rivers", "Glacial action"],
            "correct": 0,
            "steps": ["India's landmass (Gondwana) drifted northward.", "It collided with Eurasian plate ~50 million years ago.", "This collision folded the sediments into the Himalayas."],
            "exp": "Himalayas formed by the collision of the Indian Plate with the Eurasian Plate. Still rising ~5 mm/year."
        },
        "plains": {
            "q": "The Northern Plains of India were formed mainly by:",
            "opts": ["Deposits from the Ganga, Brahmaputra, and Indus river systems", "Volcanic lava flows", "Tectonic uplift", "Wind erosion"],
            "correct": 0,
            "steps": ["Himalayan rivers carry huge sediment loads.", "Over millions of years, sediments deposited in the basin.", "Formed the vast alluvial Northern Plains (Indo-Gangetic-Brahmaputra plains)."],
            "exp": "The Northern Plains are alluvial, formed by deposits from the three major river systems. Among the most fertile lands in the world."
        },
        "plateaus": {
            "q": "The Deccan Plateau is bounded by which mountain ranges?",
            "opts": ["Western Ghats and Eastern Ghats", "Himalayas and Karakoram", "Vindhyas and Satpuras", "Aravalli and Chota Nagpur"],
            "correct": 0,
            "steps": ["Deccan Plateau is the large triangular plateau in peninsular India.", "Western edge: Western Ghats (Sahyadri).", "Eastern edge: Eastern Ghats."],
            "exp": "Deccan Plateau is bounded by Western Ghats (west) and Eastern Ghats (east). It slopes gently eastward."
        },
        "islands": {
            "q": "The Andaman and Nicobar Islands are located in which body of water?",
            "opts": ["Bay of Bengal", "Arabian Sea", "Indian Ocean", "Bay of Cambay"],
            "correct": 0,
            "steps": ["Andaman & Nicobar Islands are a Union Territory of India.", "Located in the Bay of Bengal, north of Sumatra.", "Lakshadweep is in the Arabian Sea."],
            "exp": "Andaman & Nicobar: Bay of Bengal. Lakshadweep: Arabian Sea. Both are island groups of India."
        },
        "climate_zones": {
            "q": "Which factor is MOST responsible for India's monsoon climate?",
            "opts": ["Differential heating of land and sea + Himalayas blocking winds", "Distance from equator", "Ocean currents", "Altitude only"],
            "correct": 0,
            "steps": ["Summer: land heats faster than ocean → low pressure over India.", "SW monsoon winds from Indian Ocean blow toward low pressure.", "Himalayas force winds to rise → heavy rainfall."],
            "exp": "India's monsoon is driven by seasonal reversal of winds caused by differential heating and the Himalayan barrier."
        }
    }
    d = data[topic]
    options = d["opts"][:]
    rng.shuffle(options)
    correct_index = options.index(d["opts"][d["correct"]])
    steps = [d["q"]] + d["steps"]
    seed_key = f"004:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_004", question_text=steps[0],
        options=options, correct_index=correct_index,
        steps=steps, explanation=d["exp"],
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

def generate_005(seed: int, q_index: int) -> Problem:
    """India — Climate: Seasons, Rainfall, Temperature, Climate types"""
    rng = SeededRNG.get(seed, "c8_geo_005", q_index)
    topic = rng.choice(["seasons", "monsoon", "rainfall_distribution", "temperature", "climate_types"])
    steps = []
    explanation = ""

    data = {
        "seasons": {
            "q": "Which season in India is characterised by the south-west monsoon winds?",
            "opts": ["Rainy season (June–September)", "Winter season (December–February)", "Summer season (March–May)", "Retreating monsoon (October–November)"],
            "correct": 0,
            "steps": ["India has four main seasons.", "1. Winter: Dec–Feb (NE monsoon)", "2. Summer/Pre-monsoon: Mar–May", "3. Rainy/Southwest Monsoon: Jun–Sep", "4. Retreating Monsoon: Oct–Nov"],
            "exp": "The rainy season (Jun–Sep) is driven by the south-west monsoon, bringing 75-90% of annual rainfall."
        },
        "monsoon": {
            "q": "The 'burst of monsoon' refers to:",
            "opts": ["Sudden onset of heavy rainfall with rise in humidity", "Gradual increase in temperature", "Sudden cold wave from the north", "End of rainy season"],
            "correct": 0,
            "steps": ["Monsoon arrives suddenly around June 1 (Kerala).", "Characterised by heavy rainfall, rise in humidity, drop in temperature.", "This sudden arrival is called the 'burst' of monsoon."],
            "exp": "The burst of monsoon is the sudden onset of the rainy season with heavy, sustained rainfall."
        },
        "rainfall_distribution": {
            "q": "Which place receives the highest average rainfall in India?",
            "opts": ["Mawsynram, Meghalaya", "Cherrapunji, Meghalaya", "Mumbai, Maharashtra", "Chennai, Tamil Nadu"],
            "correct": 0,
            "steps": ["Mawsynram (Meghalaya) holds the record for highest rainfall in India.", "It receives over 11,000 mm annually.", "Both Mawsynram and Cherrapunji are in the Khasi Hills, Meghalaya."],
            "exp": "Mawsynram in Meghalaya is the wettest place on Earth, receiving ~11,872 mm annual rainfall due to orographic lift."
        },
        "temperature": {
            "q": "Why is the town of Drass in Kashmir known as the 'Cold Pole' of India?",
            "opts": ["It records the lowest winter temperatures in India (below -40°C)", "It has highest altitude", "It receives heavy snowfall", "It is near the North Pole"],
            "correct": 0,
            "steps": ["Drass is in Kargil district, Ladakh.", "In winter, temperatures can drop below -40°C.", "Called the 'Cold Pole' or 'Gateway to Ladakh'."],
            "exp": "Drass records India's lowest recorded temperature (-60°C unofficially, -45°C officially). High altitude + continental location."
        },
        "climate_types": {
            "q": "Which part of India has a tropical wet climate?",
            "opts": ["Western Ghats and northeastern states", "Rajasthan desert", "Ladakh region", "Punjab plains"],
            "correct": 0,
            "steps": ["Tropical wet (Af in Köppen) has heavy rainfall year-round.", "Found along the Western Ghats and northeastern India (Assam, Meghalaya).", "Characterised by dense forests and high rainfall."],
            "exp": "Western Ghats and NE India receive heavy monsoon rainfall, supporting tropical evergreen forests."
        }
    }
    d = data[topic]
    options = d["opts"][:]
    rng.shuffle(options)
    correct_index = options.index(d["opts"][d["correct"]])
    steps = [d["q"]] + d["steps"]
    seed_key = f"005:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_005", question_text=steps[0],
        options=options, correct_index=correct_index,
        steps=steps, explanation=d["exp"],
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

def generate_006(seed: int, q_index: int) -> Problem:
    """India — Natural Vegetation and Soils"""
    rng = SeededRNG.get(seed, "c8_geo_006", q_index)
    topic = rng.choice(["forest_types", "soil_types", "deforestation", "conservation"])
    steps = []
    explanation = ""

    data = {
        "forest_types": {
            "q": "Tropical evergreen forests are found in areas receiving rainfall above:",
            "opts": ["200 cm", "100 cm", "50 cm", "25 cm"],
            "correct": 0,
            "steps": ["Tropical evergreen forests need very high rainfall.", "Found in Western Ghats, Andaman & Nicobar, NE states.", "Annual rainfall > 200 cm. Trees never shed leaves completely."],
            "exp": "Tropical evergreen forests need > 200 cm rainfall. Examples: teak, mahogany, rosewood. Found in Western Ghats, NE India."
        },
        "soil_types": {
            "q": "Which soil type is known as the 'Black Soil' or 'Regur Soil'?",
            "opts": ["Formed from volcanic lava, ideal for cotton", "Formed from alluvial deposits, ideal for rice", "Formed from red rocks, ideal for wheat", "Formed from sand, ideal for millets"],
            "correct": 0,
            "steps": ["Black soil (Regur) is formed from solidified lava (basalt) from Deccan Traps.", "Rich in iron, lime, magnesium.", "Retains moisture well — excellent for cotton (called 'black cotton soil')."],
            "exp": "Black soil (Regur) is volcanic in origin, found in Deccan Trap regions. Ideal for cotton due to moisture retention."
        },
        "deforestation": {
            "q": "A major cause of deforestation in India is:",
            "opts": ["Shifting cultivation (jhum), mining, and industrialisation", "Afforestation programmes", "Protection of wildlife sanctuaries", "Soil conservation measures"],
            "correct": 0,
            "steps": ["Deforestation = removal of forests faster than regeneration.", "Causes in India: jhum cultivation, mining, dam construction, industrialisation, urban expansion.", "Consequences: soil erosion, loss of biodiversity, floods, climate change."],
            "exp": "Deforestation causes soil erosion, biodiversity loss, disrupted water cycles, and contributes to global warming."
        },
        "conservation": {
            "q": "Which method is used to conserve forests in India?",
            "opts": ["Social forestry, afforestation, and national parks/wildlife sanctuaries", "Clear-cutting for agriculture", "Commercial logging without replanting", "Urban expansion into forest areas"],
            "correct": 0,
            "steps": ["Conservation = protecting existing forests and increasing forest cover.", "Methods: Social Forestry (1980s), Afforestation, National Parks, Wildlife Sanctuaries, Biosphere Reserves.", "India's forest cover target: 33% of land area (currently ~24%)."],
            "exp": "Conservation includes social forestry, afforestation, protected areas. Project Tiger (1973) and Project Elephant conserve wildlife."
        }
    }
    d = data[topic]
    options = d["opts"][:]
    rng.shuffle(options)
    correct_index = options.index(d["opts"][d["correct"]])
    steps = [d["q"]] + d["steps"]
    seed_key = f"006:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_006", question_text=steps[0],
        options=options, correct_index=correct_index,
        steps=steps, explanation=d["exp"],
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

def generate_007(seed: int, q_index: int) -> Problem:
    """India — Water Resources: Rivers, Dams, Water Conservation"""
    rng = SeededRNG.get(seed, "c8_geo_007", q_index)
    topic = rng.choice(["river_systems", "dams", "water_conservation", "rainwater_harvesting"])
    steps = []
    explanation = ""

    data = {
        "river_systems": {
            "q": "The Ganga river system drains into which water body?",
            "opts": ["Bay of Bengal", "Arabian Sea", "Indian Ocean", "Gulf of Khambhat"],
            "correct": 0,
            "steps": ["Ganga flows eastward across the Northern Plains.", "Joins the Brahmaputra and together drain into the Bay of Bengal.", "Forms the largest delta in the world — the Sundarbans Delta."],
            "exp": "Ganga-Brahmaputra system drains into the Bay of Bengal, forming the Sundarbans mangrove delta (shared by India and Bangladesh)."
        },
        "dams": {
            "q": "Which is the highest masonry dam in India?",
            "opts": ["Bhakra Dam", "Hirakud Dam", "Tehri Dam", "Nagarjuna Sagar Dam"],
            "correct": 0,
            "steps": ["Bhakra Dam is on the Sutlej River in Himachal Pradesh.", "It is a concrete gravity dam, 226 m high.", "It created the Gobind Sagar reservoir."],
            "exp": "Bhakra Dam (226 m) on Sutlej River is India's highest masonry dam. Part of the Bhakra-Nangal project."
        },
        "water_conservation": {
            "q": "Rainwater harvesting helps to:",
            "opts": ["Recharge groundwater and reduce water scarcity", "Increase river pollution", "Decrease soil fertility", "Increase flooding"],
            "correct": 0,
            "steps": ["Rainwater harvesting collects and stores rainwater.", "Methods: rooftop harvesting, check dams, percolation pits.", "Benefits: recharges groundwater, reduces runoff, improves water table."],
            "exp": "Rainwater harvesting recharges groundwater, reduces flooding, and is a traditional Indian practice (e.g., stepwells, johads)."
        },
        "rainwater_harvesting": {
            "q": "Tamil Nadu was the first Indian state to make rainwater harvesting mandatory in:",
            "opts": ["2001 (under Jayalalithaa government)", "1995", "2010", "1985"],
            "correct": 0,
            "steps": ["Tamil Nadu mandated rooftop rainwater harvesting for all buildings.", "This was in 2001 under the AIADMK government.", "It significantly improved groundwater levels in Chennai and other cities."],
            "exp": "Tamil Nadu (2001) became the first state to mandate rainwater harvesting for all buildings, improving Chennai's water table significantly."
        }
    }
    d = data[topic]
    options = d["opts"][:]
    rng.shuffle(options)
    correct_index = options.index(d["opts"][d["correct"]])
    steps = [d["q"]] + d["steps"]
    seed_key = f"007:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_007", question_text=steps[0],
        options=options, correct_index=correct_index,
        steps=steps, explanation=d["exp"],
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

def generate_008(seed: int, q_index: int) -> Problem:
    """India — Agriculture, Minerals, Industries"""
    rng = SeededRNG.get(seed, "c8_geo_008", q_index)
    topic = rng.choice(["agriculture_types", "minerals", "industries", "transport"])
    steps = []
    explanation = ""

    data = {
        "agriculture_types": {
            "q": "Which crop is known as 'Golden Fibre' of India?",
            "opts": ["Jute", "Cotton", "Wheat", "Rice"],
            "correct": 0,
            "steps": ["Jute is called the 'Golden Fibre' due to its golden colour and high economic value.", "Grown mainly in West Bengal, Bihar, Assam, Orissa.", "Needs hot, humid climate and alluvial soil."],
            "exp": "Jute is the 'Golden Fibre' — India is the largest producer. Grown in Ganga-Brahmaputra delta. Used for sacks, ropes, geotextiles."
        },
        "minerals": {
            "q": "Which mineral is primarily found in the Singhbhum district of Jharkhand?",
            "opts": ["Iron ore", "Coal", "Bauxite", "Mica"],
            "correct": 0,
            "steps": ["Singhbhum (Jharkhand) has vast iron ore reserves.", "Part of the Chota Nagpur Plateau — rich in minerals.", "Supports the steel industry (Jamshedpur/Tata Steel nearby)."],
            "exp": "Singhbhum district is rich in iron ore. Chota Nagpur Plateau has coal, iron ore, bauxite, copper, mica, uranium."
        },
        "industries": {
            "q": "Which city is known as the 'Silicon Valley of India'?",
            "opts": ["Bangalore (Bengaluru)", "Mumbai", "Hyderabad", "Chennai"],
            "correct": 0,
            "steps": ["Bangalore is the IT capital of India.", "Hosts major tech companies: Infosys, Wipro, TCS headquarters.", "Known as India's Silicon Valley due to IT/software industry."],
            "exp": "Bangalore (Bengaluru) is called the 'Silicon Valley of India' for its thriving IT and software industry."
        },
        "transport": {
            "q": "The Golden Quadrilateral Highway connects which four major cities?",
            "opts": ["Delhi, Mumbai, Chennai, and Kolkata", "Delhi, Agra, Jaipur, Amritsar", "Mumbai, Pune, Bangalore, Chennai", "Kolkata, Guwahati, Imphal, Itanagar"],
            "correct": 0,
            "steps": ["Golden Quadrilateral (NH-2 project): 5,846 km.", "Connects Delhi → Mumbai → Chennai → Kolkata → Delhi.", "India's largest highway project, completed in 2013."],
            "exp": "Golden Quadrilateral connects Delhi-Mumbai-Chennai-Kolkata (5846 km). Largest expressway project in India, completed in 2013."
        }
    }
    d = data[topic]
    options = d["opts"][:]
    rng.shuffle(options)
    correct_index = options.index(d["opts"][d["correct"]])
    steps = [d["q"]] + d["steps"]
    seed_key = f"008:{q_index}:{topic}"
    return Problem(
        node_id="c8_geo_008", question_text=steps[0],
        options=options, correct_index=correct_index,
        steps=steps, explanation=d["exp"],
        competency=CompetencyLevel.SCHOOL, difficulty=difficulty,
        topic=topic, seed_used=seed_key
    )

# ============================================================================
# Main Solver Class
# ============================================================================
class Class8GeoSolver:
    """
    Deterministic Geography Solver — Class 8 (CISCE)
    Topics: Map Skills | Population | Migration | India — Physical | Climate | Resources | Agriculture/Industry
    """
    GENERATORS = {
        "c8_geo_001": generate_001,
        "c8_geo_002": generate_002,
        "c8_geo_003": generate_003,
        "c8_geo_004": generate_004,
        "c8_geo_005": generate_005,
        "c8_geo_006": generate_006,
        "c8_geo_007": generate_007,
        "c8_geo_008": generate_008,
    }

    def __init__(self, seed: int = 42):
        self.seed = seed
        self.all_nodes = list(self.GENERATORS.keys())

    def generate_for_node(self, node_id: str, num_questions: int = 3) -> NodeResult:
        """Generate num_questions problems for a specific node."""
        if node_id not in self.GENERATORS:
            raise ValueError(f"Unknown node: {node_id}. Available: {list(self.GENERATORS.keys())}")
        gen = self.GENERATORS[node_id]
        problems = [gen(self.seed, i) for i in range(num_questions)]
        topic_names = {
            "c8_geo_001": "Map Skills & Representation",
            "c8_geo_002": "Population Dynamics",
            "c8_geo_003": "Migration",
            "c8_geo_004": "India — Physical Features",
            "c8_geo_005": "India — Climate",
            "c8_geo_006": "Natural Vegetation & Soils",
            "c8_geo_007": "Water Resources",
            "c8_geo_008": "Agriculture, Minerals & Industries",
        }
        return NodeResult(
            node_id=node_id, topic=topic_names.get(node_id, node_id),
            problems=problems, total=num_questions
        )

    def generate_full_practice(self, questions_per_node: int = 3) -> List[NodeResult]:
        """Generate problems for all nodes."""
        return [self.generate_for_node(nid, questions_per_node) for nid in self.all_nodes]

    def print_problem(self, problem: Problem, number: int) -> None:
        print(f"\n{'='*70}")
        print(f"  Q{number} [{problem.node_id}] Topic: {problem.topic}")
        print(f"  Difficulty: {problem.difficulty.name} | Competency: {problem.competency.name}")
        print(f"{'='*70}")
        print(f"\n  {problem.question_text}")
        if problem.steps and len(problem.steps) > 1:
            print(f"\n  --- Step-by-step Solution ---")
            for i, step in enumerate(problem.steps[1:], 1):
                print(f"  Step {i}: {step}")
        print(f"\n  --- Options ---")
        for i, opt in enumerate(problem.options):
            marker = "✓" if i == problem.correct_index else " "
            print(f"  [{marker}] ({chr(65+i)}) {opt}")
        print(f"\n  --- Explanation ---")
        print(f"  {problem.explanation}")
        print(f"  Seed used: {problem.seed_used}")

    def verify_answer(self, problem: Problem, user_index: int) -> VerificationResult:
        is_correct = (user_index == problem.correct_index)
        if is_correct:
            msg = f"✓ Correct! {problem.explanation}"
        else:
            correct_opt = problem.options[problem.correct_index]
            msg = f"✗ Incorrect. Correct answer: ({chr(65+problem.correct_index)}) {correct_opt}. {problem.explanation}"
        return VerificationResult(
            is_correct=is_correct,
            user_answer=user_index,
            correct_index=problem.correct_index,
            explanation=msg
        )

    def run_practice_session(self, questions_per_node: int = 3) -> None:
        """Run an interactive practice session."""
        print("\n" + "="*70)
        print("  CLASS 8 GEOGRAPHY — CISCE Upper Primary")
        print("  Deterministic Practice Session")
        print(f"  Seed: {self.seed}")
        print("="*70)

        all_results = self.generate_full_practice(questions_per_node)
        total_q = 0
        total_correct = 0

        for node_result in all_results:
            print(f"\n{'#'*70}")
            print(f"  NODE: {node_result.node_id}")
            print(f"  TOPIC: {node_result.topic}")
            print(f"{'#'*70}")
            node_correct = 0

            for i, problem in enumerate(node_result.problems, 1):
                self.print_problem(problem, i)
                total_q += 1

                try:
                    ans = input(f"\n  Your answer (A/B/C/D): ").strip().upper()
                    if len(ans) == 1 and ans in 'ABCD':
                        user_idx = ord(ans) - ord('A')
                        if user_idx < len(problem.options):
                            result = self.verify_answer(problem, user_idx)
                            print(f"\n  {result.explanation}")
                            if result.is_correct:
                                node_correct += 1
                                total_correct += 1
                        else:
                            print("  Invalid option index.")
                    else:
                        print("  Invalid input. Showing answer.")
                        result = self.verify_answer(problem, problem.correct_index)
                        print(f"\n  {result.explanation}")
                except (EOFError, KeyboardInterrupt):
                    print("\n  Session interrupted.")

            print(f"\n  --- {node_result.node_id} Score: {node_correct}/{len(node_result.problems)} ---")
            node_result.score = node_correct / max(len(node_result.problems), 1)
            node_result.total = len(node_result.problems)

        print(f"\n{'='*70}")
        print(f"  OVERALL SCORE: {total_correct}/{total_q} ({100*total_correct/max(total_q,1):.1f}%)")
        print(f"{'='*70}")
        self._print_summary(all_results)

    def _print_summary(self, results: List[NodeResult]) -> None:
        print("\n  --- Performance by Topic ---")
        for r in results:
            pct = 100 * r.score / max(r.total, 1)
            bar = "█" * int(pct / 10) + "░" * (10 - int(pct / 10))
            print(f"  {r.node_id} | {r.topic:<35} | {bar} {pct:.0f}%")

    def get_questions_json(self, node_id: str, num: int = 3) -> List[Dict]:
        """Return questions as JSON-serialisable dicts."""
        result = self.generate_for_node(node_id, num)
        return [
            {
                "node_id": p.node_id,
                "topic": p.topic,
                "question": p.question_text,
                "options": p.options,
                "correct_index": p.correct_index,
                "steps": p.steps,
                "explanation": p.explanation,
                "difficulty": p.difficulty.name,
                "competency": p.competency.name,
                "seed": p.seed_used
            }
            for p in result.problems
        ]

# ============================================================================
# Verification engine using SymPy
# ============================================================================
def verify_scale_conversion(rf_num: int, rf_den: int, expected_km: float, tol: float = 0.01) -> bool:
    """Verify a scale conversion answer using SymPy."""
    n, d = sp.symbols('n d', positive=True)
    expr = sp.Rational(d, n) / 100000  # km per cm
    computed = float(expr.subs({n: rf_num, d: rf_den}))
    return abs(computed - expected_km) < tol

def verify_density(pop: int, area: float, expected: float, tol: float = 0.5) -> bool:
    """Verify density calculation."""
    computed = arithmetic_density(pop, area)
    return abs(computed - expected) < tol

def verify_growth_rate(births: int, deaths: int, mid_pop: int, expected_ngr: float, tol: float = 0.1) -> bool:
    """Verify natural growth rate calculation."""
    br = birth_rate(births, mid_pop)
    dr = death_rate(deaths, mid_pop)
    ngr = natural_growth_rate(br, dr)
    return abs(ngr - expected_ngr) < tol

# ============================================================================
# Self-verification / test harness
# ============================================================================
def _self_verify():
    """Run built-in verifications."""
    errors = []

    # Verify scale conversion: 1:50000 → 0.5 km
    if not verify_scale_conversion(1, 50000, 0.5):
        errors.append("Scale 1:50000 should give 0.5 km")

    # Verify scale: 1:100000 → 1.0 km
    if not verify_scale_conversion(1, 100000, 1.0):
        errors.append("Scale 1:100000 should give 1.0 km")

    # Verify density: pop 10,00,000 area 2000 sqkm → 500
    if not verify_density(1_000_000, 2000, 500.0):
        errors.append("Density check failed")

    # Verify growth rate: 20000 births, 10000 deaths, pop 10,00,000 → 1.0 per 1000
    computed_ngr = birth_rate(20000, 1000000) - death_rate(10000, 1000000)
    if not verify_growth_rate(20000, 10000, 1000000, computed_ngr):
        errors.append("Growth rate check failed")

    # Verify grid references
    assert grid_ref_4figure(3456, 7890) == "3478", "4-figure grid ref failed"
    assert grid_ref_6figure(3456, 7890) == "347890", "6-figure grid ref failed"

    # Verify bearings
    assert bearing_from_direction("N") == 0.0
    assert bearing_from_direction("E") == 90.0
    assert bearing_from_direction("S") == 180.0
    assert bearing_from_direction("W") == 270.0

    # Verify physiological density
    phys = physiological_density(1_000_000, 100_000)
    assert abs(phys - 10.0) < 0.01, f"Phys density failed: {phys}"

    if errors:
        print("SELF-VERIFICATION FAILURES:")
        for e in errors:
            print(f"  ✗ {e}")
        return False
    else:
        print("SELF-VERIFICATION: All checks passed ✓")
        return True

# ============================================================================
# Entry point
# ============================================================================
if __name__ == "__main__":
    import sys
    _self_verify()

    DEFAULT_SEED = 42
    solver = Class8GeoSolver(seed=DEFAULT_SEED)

    if len(sys.argv) > 1:
        cmd = sys.argv[1].lower()
        if cmd == "all":
            qpn = int(sys.argv[2]) if len(sys.argv) > 2 else 3
            solver.run_practice_session(questions_per_node=qpn)
        elif cmd == "node":
            if len(sys.argv) < 3:
                print("Usage: python class8_geo_solver.py node c8_geo_001 [num]")
            else:
                node = sys.argv[2]
                qpn = int(sys.argv[3]) if len(sys.argv) > 3 else 3
                try:
                    result = solver.generate_for_node(node, qpn)
                    print(f"\n  Node: {result.node_id} | Topic: {result.topic}")
                    print(f"  {'='*60}")
                    for i, p in enumerate(result.problems, 1):
                        solver.print_problem(p, i)
                except ValueError as e:
                    print(f"  Error: {e}")
        elif cmd == "json":
            if len(sys.argv) < 3:
                print("Usage: python class8_geo_solver.py json c8_geo_001 [num]")
            else:
                node = sys.argv[2]
                qpn = int(sys.argv[3]) if len(sys.argv) > 3 else 3
                import json
                data = solver.get_questions_json(node, qpn)
                print(json.dumps(data, indent=2))
        elif cmd == "verify":
            _self_verify()
        else:
            print(f"Commands: all | node NODE [num] | json NODE [num] | verify")
    else:
        # Default: full practice session
        solver.run_practice_session(questions_per_node=3)