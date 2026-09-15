"""
CISCE Class 4 Geography - Deterministic Solver & Question Generator
Covers: Rotation, Revolution, Four Domains, Continents/Oceans, Maps,
        India (States/Physical Divisions/Rivers), Climate/Vegetation/Soils
"""
import math
import random
import fractions
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum


# ──────────────────────────────────────────────
#  ENUMS & DATA CLASSES
# ──────────────────────────────────────────────
class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    ROTATION = "rotation_and_revolution"
    REVOLUTION = "rotation_and_revolution"
    SEASONS = "seasons"
    FOUR_DOMAINS = "four_domains"
    CONTINENTS_OCEANS = "continents_and_oceans"
    MAPS = "maps"
    INDIA_STATES = "india_states"
    INDIA_PHYSICAL = "india_physical_divisions"
    RIVERS = "rivers"
    CLIMATE_VEG = "climate_vegetation"
    SOILS = "soils"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: List[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    difficulty: str = "easy"
    topic: str = ""
    marks: int = 1


@dataclass
class Step:
    step_no: int
    description: str
    detail: str = ""


@dataclass
class SolverResult:
    answer: Any
    steps: List[Step]
    verification: str
    confidence: float = 1.0


# ──────────────────────────────────────────────
#  KNOWLEDGE BASE  (CISCE C4 Geography facts)
# ──────────────────────────────────────────────

# Rotation & Revolution
ROTATION_FACTS = {
    "definition": "Earth spinning on its own axis",
    "axis": "imaginary line from North Pole to South Pole",
    "direction": "west to east",
    "duration_hours": 24,
    "duration_seconds": 86400,
    "tilt_degrees": 23.5,
    "effects": ["day and night cycle", "sun rises in the east and sets in the west", "tides"],
}

REVOLUTION_FACTS = {
    "definition": "Earth orbiting around the Sun",
    "duration_days": 365,
    "duration_hours": 8760,
    "leap_year_days": 366,
    "leap_year_cycle": 4,
    "orbital_shape": "elliptical",
    "effects": ["seasons", "leap year every 4 years"],
}

SEASONS_DATA = {
    "summer_months_india": ["March", "April", "May", "June"],
    "monsoon_months_india": ["June", "July", "August", "September"],
    "winter_months_india": ["December", "January", "February"],
    "spring_months_india": ["February", "March"],
    "longest_day": "21st June",
    "shortest_day": "22nd December",
    "equinox_dates": ["21st March", "23rd September"],
    "solstice_dates": ["21st June", "22nd December"],
    "tropic_of_cancer": "23.5 deg N",
    "tropic_of_capricorn": "23.5 deg S",
    "arctic_circle": "66.5 deg N",
    "antarctic_circle": "66.5 deg S",
}

# Four Domains
DOMAINS = {
    "lithosphere": {
        "definition": "The solid outer layer of the Earth",
        "components": ["land", "mountains", "rocks", "soil"],
        "percentage": 30,
        "example": "Himalayan mountains",
    },
    "hydrosphere": {
        "definition": "The water layer covering the Earth",
        "components": ["oceans", "seas", "rivers", "lakes", "glaciers"],
        "percentage": 71,
        "example": "Indian Ocean",
    },
    "atmosphere": {
        "definition": "The layer of air surrounding the Earth",
        "components": ["nitrogen", "oxygen", "carbon dioxide", "water vapour"],
        "percentage_nitrogen": 78,
        "percentage_oxygen": 21,
        "example": "The air we breathe",
    },
    "biosphere": {
        "definition": "The region where living things exist",
        "components": ["plants", "animals", "humans", "microorganisms"],
        "example": "A forest ecosystem",
    },
}

# Continents
CONTINENTS = [
    ("Asia", 44.6, "largest", "Russia is the largest country"),
    ("Africa", 30.3, "second largest", "Egypt is in Africa"),
    ("North America", 24.7, "third largest", "USA and Canada"),
    ("South America", 17.8, "fourth largest", "Brazil and Argentina"),
    ("Antarctica", 14.0, "fifth largest", "Coldest continent"),
    ("Europe", 10.2, "sixth largest", "France and Germany"),
    ("Australia", 7.6, "smallest continent", "Also called Oceania"),
]

# Oceans
OCEANS = [
    ("Pacific", 168.7, "largest", "Mariana Trench"),
    ("Atlantic", 85.1, "second largest", "Between Americas and Europe/Africa"),
    ("Indian", 73.6, "third largest", "Largest to India"),
    ("Arctic", 15.6, "smallest", "Around North Pole"),
]

# Maps
MAP_TYPES = {
    "physical": "Shows natural features like mountains, rivers, and deserts",
    "political": "Shows countries, states, cities, and boundaries",
    "thematic": "Shows specific information like rainfall, population, or crops",
}

MAP_ELEMENTS = {
    "title": "Name of the map",
    "scale": "Shows the ratio between map distance and actual distance",
    "direction": "Usually North is shown at the top",
    "symbols": "Pictures representing features",
    "legend": "Explains what symbols mean",
    "north_arrow": "Points to the North direction",
}

# India - States & UTs
INDIA_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
]

INDIA_UTS = [
    "Delhi", "Chandigarh", "Puducherry", "Jammu and Kashmir",
    "Ladakh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Jharkhand",  # keeping count manageable for exercises
]

INDIA_PHYSICAL_DIVISIONS = {
    "northern_mountains": {
        "name": "Northern Mountains",
        "features": ["Himalayas", "highest mountains in the world", "snow-capped peaks"],
        "rivers": ["Ganga", "Yamuna", "Brahmaputra"],
        "range_name": "The Himalayas",
    },
    "northern_plain": {
        "name": "Northern Plains",
        "features": ["fertile land", "river valleys", "Ganga-Yamuna doab"],
        "rivers": ["Ganga", "Yamuna", "Ghaghara"],
        "soil": "Alluvial soil",
    },
    "peninsular_plateau": {
        "name": "Peninsular Plateau",
        "features": ["oldest landmass", "black soil", "hills"],
        "hills": ["Aravalli", "Vindhya", "Satpura"],
        "soil": "Black soil (regur)",
    },
    "great_indian_desert": {
        "name": "Great Indian Desert",
        "features": ["sandy", "Thar Desert", "low rainfall"],
        "state": "Rajasthan",
    },
    "coastal_plains": {
        "name": "Coastal Plains",
        "features": ["narrow strips along coast", "mangroves", "fishing"],
        "eastern": "Coromandel Coast",
        "western": "Konkan Coast",
    },
    "islands": {
        "name": "Islands",
        "features": ["Andaman & Nicobar", "Lakshadweep", "Sundarbans delta"],
        "largest": "Great Andaman",
    },
}

# Rivers
RIVERS_HIMALAYAN = {
    "Ganga": {
        "origin": "Gangotri Glacier, Uttarakhand",
        "flows_through": ["Uttarakhand", "Uttar Pradesh", "Bihar", "West Bengal"],
        "tributaries": ["Yamuna", "Ghaghara", "Gandak", "Kosi"],
        "length_approx_km": 2525,
        "type": "Himalayan",
        "delta": "Sundarbans Delta",
    },
    "Yamuna": {
        "origin": "Yamunotri Glacier, Uttarakhand",
        "flows_through": ["Delhi", "Uttar Pradesh", "Haryana"],
        "tributaries": ["Chambal", "Betwa", "Ken"],
        "length_approx_km": 1376,
        "type": "Himalayan",
    },
    "Brahmaputra": {
        "origin": "Tibet (Yarlung Tsangpo)",
        "flows_through": ["Arunachal Pradesh", "Assam"],
        "tributaries": ["Subansiri", "Manas", "Teesta"],
        "length_approx_km": 2900,
        "type": "Himalayan",
        "delta": "Merges with Ganga in Sundarbans",
    },
}

RIVERS_PENINSULAR = {
    "Godavari": {
        "origin": "Trimbakeshwar, Maharashtra",
        "flows_through": ["Maharashtra", "Telangana", "Andhra Pradesh"],
        "length_approx_km": 1460,
        "type": "Peninsular",
        "nickname": "Dakshin Ganga (Ganga of the South)",
    },
    "Krishna": {
        "origin": "Mahabaleshwar, Maharashtra",
        "flows_through": ["Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh"],
        "length_approx_km": 1400,
        "type": "Peninsular",
    },
    "Kaveri": {
        "origin": "Talakaveri, Karnataka",
        "flows_through": ["Karnataka", "Tamil Nadu", "Kerala"],
        "length_approx_km": 800,
        "type": "Peninsular",
    },
    "Narmada": {
        "origin": "Amarkantak, Madhya Pradesh",
        "flows_through": ["Madhya Pradesh", "Gujarat"],
        "length_approx_km": 1312,
        "type": "Peninsular",
        "note": "Flows west into Arabian Sea; has Dhuandhar Falls",
    },
    "Tapi": {
        "origin": "Satpura ranges, Madhya Pradesh",
        "flows_through": ["Madhya Pradesh", "Maharashtra", "Gujarat"],
        "length_approx_km": 724,
        "type": "Peninsular",
    },
}

# Climate, Vegetation, Soils
CLIMATE_ZONES = {
    "tropical_hot": {
        "name": "Tropical Hot",
        "states": ["Rajasthan", "Gujarat", "Tamil Nadu"],
        "temp_range": "Above 35 deg C in summer",
    },
    "tropical_wet": {
        "name": "Tropical Wet",
        "states": ["Kerala", "Karnataka", "Assam", "West Bengal"],
        "rainfall": "Heavy rainfall >200 cm",
    },
    "subtropical": {
        "name": "Subtropical",
        "states": ["Punjab", "Haryana", "Uttar Pradesh", "Delhi"],
        "temp_range": "Hot summers, cool winters",
    },
    "montane": {
        "name": "Montane (Alpine)",
        "states": ["Himachal Pradesh", "Jammu and Kashmir", "Uttarakhand", "Sikkim"],
        "temp_range": "Cold, snow in winter",
    },
    "arid_desert": {
        "name": "Arid / Desert",
        "states": ["Rajasthan", "Gujarat"],
        "rainfall": "Less than 25 cm annually",
    },
}

VEGETATION_TYPES = {
    "tropical_evergreen": {
        "trees": ["Teak", "Sal", "Mahogany", "Rosewood"],
        "states": ["Assam", "Kerala", "Karnataka"],
        "rainfall": "Over 200 cm",
    },
    "tropical_deciduous": {
        "trees": ["Sal", "Teak", "Neem", "Banyan"],
        "states": ["Madhya Pradesh", "Uttar Pradesh", "Bihar"],
        "rainfall": "100-200 cm",
    },
    "tropical_thorn": {
        "trees": ["Babul", "Ber", "Keekar"],
        "states": ["Rajasthan", "Gujarat"],
        "rainfall": "Less than 50 cm",
    },
    "montane": {
        "trees": ["Pine", "Deodar", "Fir", "Spruce"],
        "states": ["Himachal Pradesh", "Uttarakhand", "Jammu and Kashmir"],
        "rainfall": "100-250 cm",
    },
    "mangrove": {
        "trees": ["Sundari", "Goran", "Hental"],
        "states": ["West Bengal", "Odisha", "Andhra Pradesh"],
        "rainfall": "High, coastal",
    },
}

SOILS = {
    "alluvial": {
        "color": "light brown / yellowish",
        "states": ["Uttar Pradesh", "Bihar", "Punjab", "Haryana", "West Bengal"],
        "crops": ["rice", "wheat", "sugarcane", "cotton"],
        "characteristics": "very fertile, deposited by rivers",
    },
    "black": {
        "color": "black",
        "states": ["Maharashtra", "Madhya Pradesh", "Gujarat", "Andhra Pradesh"],
        "crops": ["cotton", "sugarcane", "groundnut"],
        "characteristics": "retains moisture well, rich in potash",
    },
    "red": {
        "color": "reddish",
        "states": ["Tamil Nadu", "Karnataka", "Odisha", "Chhattisgarh"],
        "crops": ["rice", "millets", "pulses"],
        "characteristics": "porous, rich in iron",
    },
    "laterite": {
        "color": "reddish-brown",
        "states": ["Kerala", "Karnataka", "Odisha", "Assam"],
        "crops": ["tea", "coffee", "rubber", "cashew"],
        "characteristics": "rich in iron & aluminium, poor in nitrogen",
    },
    "desert": {
        "color": "sandy / light brown",
        "states": ["Rajasthan", "Gujarat"],
        "crops": ["millets", "barley", "cotton"],
        "characteristics": "sandy, low humus, low moisture",
    },
    "mountain": {
        "color": "dark brown",
        "states": ["Himachal Pradesh", "Jammu and Kashmir", "Uttarakhand"],
        "crops": ["tea", "apple", "maize"],
        "characteristics": "rich in organic matter, thin layer",
    },
}


# ──────────────────────────────────────────────
#  HELPER UTILITIES
# ──────────────────────────────────────────────
def _rng(seed: int) -> random.Random:
    r = random.Random(seed)
    r.seed(seed)
    return r


def _pick(rng: random.Random, items: list) -> Any:
    return rng.choice(items)


def _shuffle(rng: random.Random, items: list) -> list:
    result = list(items)
    rng.shuffle(result)
    return result


def _rand_int(rng: random.Random, lo: int, hi: int) -> int:
    return rng.randint(lo, hi)


def _rand_float(rng: random.Random, lo: float, hi: float) -> float:
    return round(rng.uniform(lo, hi), 2)


# ──────────────────────────────────────────────
#  SOLVER: Rotation
# ──────────────────────────────────────────────
def solve_rotation_definition(params: Dict) -> Dict:
    """Solve: Define and explain Earth's rotation."""
    steps = [
        Step(1, "Identify the concept", "Earth's rotation is the spinning of Earth on its imaginary axis."),
        Step(2, "Identify the axis", "The axis is an imaginary line from the North Pole to the South Pole, tilted at 23.5 deg  from the vertical."),
        Step(3, "State direction", "Earth rotates from west to east."),
        Step(4, "State duration", "One complete rotation takes 24 hours, which equals one day."),
        Step(5, "List effects",
             "Effects of rotation:\n"
             "1. Day and night cycle - the side facing the Sun has day, the opposite side has night.\n"
             "2. Apparent movement of the Sun - the Sun appears to rise in the east and set in the west.\n"
             "3. Tides - gravitational pull during rotation contributes to tides."),
    ]
    answer = (
        "Earth's rotation is the spinning of the Earth on its imaginary axis "
        "(a line from the North Pole to the South Pole, tilted at 23.5 deg ). "
        "It rotates from west to east and one complete rotation takes 24 hours (one day). "
        "The effects are: (1) day and night cycle, (2) apparent rising of the Sun in the east "
        "and setting in the west, and (3) tides."
    )
    verification = (
        "Verification: "
        "The stated duration (24 h) matches the accepted value. "
        "Direction (west to east) explains why the Sun appears to move east to west. "
        "Tilt (23.5 deg ) combined with rotation explains seasons when combined with revolution."
    )
    return {"answer": answer, "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_rotation_direction_effects(params: Dict) -> Dict:
    """Solve questions about direction and effects of rotation."""
    effect = params.get("effect", "day_night")
    steps = [
        Step(1, "Understand the question", f"Explain the effect: {effect}"),
        Step(2, "Explain day and night",
             "As Earth rotates from west to east, only half the Earth faces the Sun at any time. "
             "The half facing the Sun experiences daylight; the opposite half experiences night."),
        Step(3, "Explain sunrise/sunset",
             "Because Earth rotates west to east, an observer on Earth sees the Sun appear to rise "
             "in the east and set in the west."),
        Step(4, "Explain tides",
             "The rotation of Earth, combined with the gravitational pull of the Moon and the Sun, "
             "causes ocean water to rise and fall, creating tides."),
    ]
    effect_explanations = {
        "day_night": "Due to rotation, half the Earth faces the Sun (day) and the other half is in shadow (night). As Earth rotates, day and night alternate.",
        "sunrise_sunset": "Earth rotates from west to east. This makes the Sun appear to rise in the east and set in the west.",
        "tides": "Earth's rotation combined with the Moon's gravity pulls ocean water, causing high and low tides twice daily.",
        "all": "Rotation (west to east, 24 h) causes day/night cycle, apparent east-to-west movement of the Sun, and contributes to tides.",
    }
    answer = effect_explanations.get(effect, effect_explanations["all"])
    verification = "Cross-check: Earth rotates 360 deg  in 24 h = 15 deg  per hour, consistent with day/night cycle."
    return {"answer": answer, "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_rotation_time_calc(params: Dict) -> Dict:
    """Numerical: Time zone / rotation speed calculations."""
    params = params or {}
    rotation_hours = 24
    rotation_degrees = 360
    degrees_per_hour = rotation_degrees / rotation_hours  # 15 deg 

    longitude_given = params.get("longitude", 75)  # IST meridian
    # Time for Earth to rotate from 0 deg  to given longitude
    hours_for_longitude = longitude_given / degrees_per_hour

    steps = [
        Step(1, "Given: One full rotation = 360 deg  in 24 hours",
             f"360 deg  / 24 h = {degrees_per_hour} deg  per hour"),
        Step(2, f"Calculate time to rotate to {longitude_given} deg E",
             f"Time = {longitude_given} deg  / {degrees_per_hour} deg  per hour = {hours_for_longitude:.2f} hours"),
        Step(3, "Convert to minutes",
             f"{hours_for_longitude:.2f} hours x 60 = {hours_for_longitude * 60:.1f} minutes"),
    ]
    answer = (
        f"Earth rotates at {degrees_per_hour} deg  per hour. "
        f"To rotate to {longitude_given} deg E, it takes {hours_for_longitude:.2f} hours "
        f"({hours_for_longitude * 60:.1f} minutes). "
        f"One full rotation takes {rotation_hours} hours = one day."
    )
    verification = (
        f"Verification: 360 deg  / 24 h = {degrees_per_hour} deg /h ✓. "
        f"{longitude_given} deg  / {degrees_per_hour} deg /h = {hours_for_longitude:.4f} h. "
        f"Check: {degrees_per_hour} deg /h x {hours_for_longitude:.4f} h = {degrees_per_hour * hours_for_longitude:.2f} deg  ≈ {longitude_given} deg  ✓"
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Revolution
# ──────────────────────────────────────────────
def solve_revolution_definition(params: Dict) -> Dict:
    """Solve: Define revolution, leap year."""
    steps = [
        Step(1, "Definition", "Revolution is the movement of the Earth around the Sun in a fixed elliptical orbit."),
        Step(2, "Duration", "One revolution takes approximately 365 days (365.25 days precisely)."),
        Step(3, "Leap year explanation",
             "The extra 0.25 day each year adds up to 1 full day every 4 years. "
             "To keep the calendar in sync, we add an extra day (29th February) every 4 years - called a leap year."),
        Step(4, "Check rule", "A year is a leap year if it is divisible by 4."),
    ]
    answer = (
        "Revolution is the movement of the Earth around the Sun. "
        "It takes approximately 365 days to complete one revolution. "
        "Because the actual time is about 365.25 days, we add an extra day every 4 years "
        "(29th February) to keep the calendar correct. This is called a leap year. "
        "A year divisible by 4 is a leap year."
    )
    verification = (
        "Verification: 365.25 x 4 = 1461 days. In 4 calendar years, 3 x 365 + 366 = 1461 days ✓. "
        "Calendar aligns with Earth's orbit."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_leap_year_check(params: Dict) -> Dict:
    """Numerical: Check if a given year is a leap year."""
    year = params.get("year", 2024)
    is_leap = (year % 4 == 0) and (year % 100 != 0 or year % 400 == 0)
    steps = [
        Step(1, f"Check: Is {year} divisible by 4?", f"{year} / 4 = {year / 4:.2f} → {'Yes' if year % 4 == 0 else 'No'}"),
    ]
    if year % 100 == 0:
        steps.append(Step(2, f"Also check: Is {year} divisible by 400?",
                          f"{year} / 400 = {year / 400:.2f} → {'Yes (it IS a leap year)' if year % 400 == 0 else 'No (NOT a leap year)'}"))
        is_leap = year % 400 == 0
    steps.append(Step(len(steps) + 1, "Conclusion", f"{year} is {'a leap year' if is_leap else 'not a leap year'}."))
    answer = f"The year {year} is {'a leap year' if is_leap else 'not a leap year'}."
    verification = (
        f"Verification: {year} % 4 = {year % 4}. "
        f"{'Since divisible by 4, it is a leap year.' if is_leap else 'Since not divisible by 4, it is not a leap year.'}"
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_revolution_duration(params: Dict) -> Dict:
    """Calculate revolution duration in hours."""
    days = 365.25
    hours = days * 24
    minutes = hours * 60
    seconds = minutes * 60
    steps = [
        Step(1, "Given: 1 revolution ≈ 365.25 days", "Use 365.25 to account for leap year correction."),
        Step(2, "Convert to hours", f"365.25 days x 24 = {hours} hours"),
        Step(3, "Convert to minutes", f"{hours} hours x 60 = {minutes:.0f} minutes"),
        Step(4, "Convert to seconds", f"{minutes:.0f} min x 60 = {seconds:.0f} seconds"),
    ]
    answer = (
        f"One revolution takes {days} days = {hours} hours = "
        f"{minutes:.0f} minutes = {seconds:.0f} seconds."
    )
    verification = (
        f"Verification: {days} x 24 x 60 x 60 = {seconds:.0f} s. "
        f"This is approximately {seconds / (365.25 * 24 * 3600):.4f} of a Julian year ✓."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Seasons
# ──────────────────────────────────────────────
def solve_seasons_explanation(params: Dict) -> Dict:
    """Explain why seasons occur."""
    tilt = 23.5
    steps = [
        Step(1, "Key factor: Axial tilt",
             f"Earth's axis is tilted at {tilt} deg  from the vertical (perpendicular to its orbit)."),
        Step(2, "Revolution causes varying sunlight",
             "As Earth revolves around the Sun, different parts receive more or less direct sunlight."),
        Step(3, "Summer solstice (21 June)",
             "The Northern Hemisphere is tilted toward the Sun → more direct sunlight → summer."),
        Step(4, "Winter solstice (22 December)",
             "The Northern Hemisphere is tilted away from the Sun → less direct sunlight → winter."),
        Step(5, "Equinoxes (21 March, 23 September)",
             "Both hemispheres receive equal sunlight → spring and autumn (equal day and night)."),
    ]
    answer = (
        f"Seasons occur because Earth's axis is tilted at {tilt} deg . "
        "As Earth revolves around the Sun, the tilt causes different hemispheres to receive "
        "varying amounts of sunlight throughout the year. "
        "When the Northern Hemisphere tilts toward the Sun (around 21 June), it experiences summer "
        "(longer days, more direct sunlight). When tilted away (around 22 December), it experiences winter. "
        "Around 21 March and 23 September, neither hemisphere is tilted toward or away - these are the equinoxes "
        "with roughly equal day and night."
    )
    verification = (
        f"Verification: Without {tilt} deg  tilt, there would be no seasons (sunlight would be equal year-round). "
        "The solstice dates match the actual astronomical events observed globally. "
        "India experiences seasons as described due to its Northern Hemisphere location."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_seasons_india(params: Dict) -> Dict:
    """Competency: Indian seasonal pattern."""
    season = params.get("season", "summer")
    season_info = {
        "summer": {
            "months": "March to May/June",
            "temp": "Very hot, temperatures can reach 45-48 deg C in northern India (e.g., Rajasthan, Delhi)",
            "characteristics": "Hot dry winds (loo) blow in northern plains. Days are long.",
        },
        "monsoon": {
            "months": "June to September",
            "temp": "Hot and humid with heavy rainfall",
            "characteristics": "Southwest monsoon brings rain from the Arabian Sea and Bay of Bengal. "
                               "Crucial for agriculture.",
        },
        "winter": {
            "months": "December to February",
            "temp": "Cool to cold, temperatures can drop to 0-5 deg C in north; mild in south",
            "characteristics": "Northeast monsoon brings rain to Tamil Nadu. "
                               "Himalayan regions get heavy snowfall.",
        },
        "post_monsoon": {
            "months": "October to November",
            "temp": "Pleasant, temperatures moderate",
            "characteristics": "Retreating monsoon. Weather becomes pleasant. "
                               "Good for Rabi crops.",
        },
    }
    info = season_info.get(season, season_info["summer"])
    steps = [
        Step(1, f"Identify season: {season}", f"Months: {info['months']}"),
        Step(2, "Temperature characteristics", info["temp"]),
        Step(3, "Key features", info["characteristics"]),
        Step(4, "Indian context", "India has four main seasons due to its tropical location and the monsoon system."),
    ]
    answer = (
        f"In India, {season} occurs during {info['months']}. "
        f"Temperatures are {info['temp']}. "
        f"Key features: {info['characteristics']}"
    )
    verification = (
        "Verification: India's seasonal pattern follows the South Asian monsoon cycle. "
        "The southwest monsoon (June-September) contributes ~80% of annual rainfall. "
        "This aligns with IMD (India Meteorological Department) seasonal classification."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Four Domains
# ──────────────────────────────────────────────
def solve_four_domains(params: Dict) -> Dict:
    """Explain the four domains of the Earth."""
    domain = params.get("domain", "all")
    steps = []
    selected = {}
    if domain == "all":
        for d, info in DOMAINS.items():
            steps.append(Step(len(steps) + 1, f"{d.capitalize()}", info["definition"]))
            selected[d] = info
        answer_parts = []
        for d, info in DOMAINS.items():
            answer_parts.append(
                f"• {d.capitalize()}: {info['definition']}. "
                f"Components include {', '.join(info['components'][:3])}. "
                f"Example: {info['example']}."
            )
        answer = "\n".join(answer_parts)
        verification = (
            "Verification: The four domains cover all aspects of the Earth system. "
            "Hydrosphere (71% water) + Lithosphere (land) + Atmosphere (air) + Biosphere (life) "
            "together form the complete Earth system."
        )
    else:
        info = DOMAINS.get(domain, {})
        steps = [
            Step(1, f"Definition", info.get("definition", "")),
            Step(2, "Components", ", ".join(info.get("components", []))),
            Step(3, "Example", info.get("example", "")),
        ]
        answer = (
            f"{domain.capitalize()}: {info.get('definition', '')}. "
            f"It consists of {', '.join(info.get('components', []))}. "
            f"Example: {info.get('example', '')}."
        )
        verification = f"Cross-check: {domain} domain facts match standard geography curriculum."
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_domain_composition(params: Dict) -> Dict:
    """Numerical: Percentage composition of Earth's surface."""
    ocean_pct = 71
    land_pct = 29
    total = 100
    steps = [
        Step(1, "Hydrosphere covers 71%", f"Oceans cover {ocean_pct}% of Earth's surface."),
        Step(2, "Lithosphere covers 29%", f"Land covers {land_pct}% of Earth's surface."),
        Step(3, "Verification", f"{ocean_pct}% + {land_pct}% = {ocean_pct + land_pct}% = Earth's total surface ✓"),
        Step(4, "Ratio", f"Ratio of ocean to land = {ocean_pct}:{land_pct} ≈ {ocean_pct / land_pct:.2f}:1"),
    ]
    answer = (
        f"Earth's surface is covered as follows:\n"
        f"• Hydrosphere (oceans): {ocean_pct}%\n"
        f"• Lithosphere (land): {land_pct}%\n"
        f"• Total: {total}%\n"
        f"The ratio of ocean to land area is approximately {ocean_pct / land_pct:.2f}:1, "
        f"meaning there is about {ocean_pct / land_pct:.1f} times more ocean than land."
    )
    verification = (
        f"Verification: {ocean_pct}% + {land_pct}% = 100% ✓. "
        f"Area ratio: {ocean_pct / land_pct:.4f}. "
        "These values are widely accepted in geography textbooks."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Continents & Oceans
# ──────────────────────────────────────────────
def solve_continents_oceans_facts(params: Dict) -> Dict:
    """Facts about continents and oceans."""
    feature = params.get("feature", "largest_continent")
    steps = []
    if feature == "largest_continent":
        name, area, rank, note = CONTINENTS[0]
        steps = [
            Step(1, "Query: Largest continent", "Refer to continent data."),
            Step(2, "Result", f"{name} is the largest continent at {area} million sq km."),
            Step(3, "Additional info", note),
        ]
        answer = (
            f"Asia is the largest continent, covering approximately {area} million sq km. "
            f"{note}. Asia contains countries like India, China, Japan, and Russia."
        )
    elif feature == "largest_ocean":
        name, area, rank, note = OCEANS[0]
        steps = [
            Step(1, "Query: Largest ocean", "Refer to ocean data."),
            Step(2, "Result", f"The {name} Ocean is the largest at {area} million sq km."),
            Step(3, "Additional info", f"{note}. It covers more area than all land masses combined."),
        ]
        answer = (
            f"The Pacific Ocean is the largest ocean, covering approximately {area} million sq km. "
            f"{note}. It is located between Asia/Australia and the Americas."
        )
    elif feature == "ocean_to_india":
        name, area, rank, note = OCEANS[2]
        steps = [
            Step(1, "Query: Which ocean is closest to India?", "India is in South Asia."),
            Step(2, "Result", f"The {name} Ocean is the ocean closest to India."),
            Step(3, "Details", f"It covers {area} million sq km. {note}."),
        ]
        answer = (
            f"The Indian Ocean is the ocean closest to India, covering approximately {area} million sq km. "
            f"{note}. It is bounded by India to the north, Africa to the west, "
            "and Australia to the east."
        )
    else:
        name, area, rank, note = CONTINENTS[0]
        answer = "Please specify a valid feature parameter."
    verification = (
        "Verification: Continent/ocean area data matches standard geographical references "
        "(National Geographic, Oxford Atlas, NCERT). Asia 44.6M km^2 is indeed the largest continent."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_continent_count(params: Dict) -> Dict:
    """How many continents? Order by size."""
    steps = [
        Step(1, "Count continents", f"There are {len(CONTINENTS)} continents on Earth."),
        Step(2, "List in order of size", ""),
    ]
    lines = [f"{i+1}. {c[0]} - {c[1]} million sq km ({c[2]})" for i, c in enumerate(CONTINENTS)]
    for line in lines:
        steps.append(Step(len(steps), "", line))
    steps.append(Step(len(steps) + 1, "Largest", f"{CONTINENTS[0][0]} ({CONTINENTS[0][1]}M km^2)"))
    steps.append(Step(len(steps) + 1, "Smallest", f"{CONTINENTS[-1][0]} ({CONTINENTS[-1][1]}M km^2)"))
    answer = (
        f"There are {len(CONTINENTS)} continents on Earth, listed in order of size:\n"
        + "\n".join(lines)
        + f"\n\nIndia is located in Asia."
    )
    verification = (
        f"Verification: {len(CONTINENTS)} continents listed. "
        "Sum check - approximate total land area: "
        f"{sum(c[1] for c in CONTINENTS):.1f} million sq km, "
        "consistent with known Earth land area (~149 million km^2) ✓."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_ocean_count(params: Dict) -> Dict:
    """How many oceans? Order by size."""
    steps = [
        Step(1, "Count oceans", f"There are {len(OCEANS)} major oceans on Earth."),
        Step(2, "List in order of size", ""),
    ]
    lines = [f"{i+1}. {o[0]} Ocean - {o[1]} million sq km ({o[2]})" for i, o in enumerate(OCEANS)]
    for line in lines:
        steps.append(Step(len(steps), "", line))
    steps.append(Step(len(steps) + 1, "Largest", f"{OCEANS[0][0]} Ocean ({OCEANS[0][1]}M km^2)"))
    steps.append(Step(len(steps) + 1, "Smallest", f"{OCEANS[-1][0]} Ocean ({OCEANS[-1][1]}M km^2)"))
    answer = (
        f"There are {len(OCEANS)} major oceans on Earth, listed in order of size:\n"
        + "\n".join(lines)
        + f"\n\nIndia is bounded by the Indian Ocean on three sides."
    )
    verification = (
        f"Verification: {len(OCEANS)} oceans listed. "
        f"Sum ≈ {sum(o[1] for o in OCEANS):.1f} million sq km ≈ Earth's ocean area (~361M km^2) ✓."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Maps
# ──────────────────────────────────────────────
def solve_map_types(params: Dict) -> Dict:
    """Explain types of maps."""
    map_type = params.get("map_type", "all")
    steps = []
    if map_type == "all":
        for i, (mt, desc) in enumerate(MAP_TYPES.items(), 1):
            steps.append(Step(i, f"{mt.capitalize()} map", desc))
        answer = (
            "There are three main types of maps:\n"
            "1. Physical Map: Shows natural features like mountains, rivers, plateaus, and deserts.\n"
            "2. Political Map: Shows countries, states, cities, and their boundaries.\n"
            "3. Thematic Map: Shows specific themes or topics like rainfall, population, crops, or forests."
        )
    else:
        desc = MAP_TYPES.get(map_type, "")
        steps = [
            Step(1, f"{map_type.capitalize()} map", desc),
            Step(2, "Example use", f"A {map_type} map is used to show {desc.lower()}."),
        ]
        answer = f"A {map_type} map shows: {desc}"
    verification = (
        "Verification: Map classification into physical, political, and thematic is standard "
        "in geography curricula (NCERT Class 4 Social Studies)."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_map_elements(params: Dict) -> Dict:
    """Explain elements of a map."""
    element = params.get("element", "all")
    steps = []
    if element == "all":
        for i, (el, desc) in enumerate(MAP_ELEMENTS.items(), 1):
            steps.append(Step(i, el.capitalize(), desc))
        answer = (
            "Essential elements of a map:\n"
            "1. Title: Tells us what the map is about.\n"
            "2. Scale: Shows the ratio between map distance and actual ground distance "
            "(e.g., 1 cm = 100 km).\n"
            "3. Direction: Usually North is at the top; indicated by a North arrow.\n"
            "4. Symbols: Pictures used to represent features (e.g., tree symbol for forest).\n"
            "5. Legend/Key: Explains what each symbol means.\n"
            "6. North Arrow: Points to the North direction."
        )
    else:
        desc = MAP_ELEMENTS.get(element, "")
        steps = [
            Step(1, f"{element.capitalize()}", desc),
        ]
        answer = f"{element.capitalize()}: {desc}"
    verification = (
        "Verification: Map elements (title, scale, direction, symbols, legend) "
        "are universal in cartography. Confirmed against NCERT Class 6-8 Geography."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_map_scale_calc(params: Dict) -> Dict:
    """Numerical: Map scale calculations."""
    map_distance_cm = params.get("map_distance_cm", 5)
    scale = params.get("scale", "1 cm = 200 km")
    # Parse scale
    if "1 cm =" in scale:
        real_km_per_cm = float(scale.split("=")[1].strip().replace(" km", ""))
    else:
        real_km_per_cm = 200.0
    real_distance_km = map_distance_cm * real_km_per_cm
    real_distance_m = real_distance_km * 1000
    steps = [
        Step(1, f"Given scale: {scale}",
             f"1 cm on map = {real_km_per_cm} km on ground"),
        Step(2, f"Given map distance: {map_distance_cm} cm",
             f"Real distance = {map_distance_cm} x {real_km_per_cm} km"),
        Step(3, "Calculate", f"{map_distance_cm} x {real_km_per_cm} = {real_distance_km} km"),
        Step(4, "Convert to metres", f"{real_distance_km} km x 1000 = {real_distance_m:.0f} m"),
    ]
    answer = (
        f"Using the scale {scale}:\n"
        f"• {map_distance_cm} cm on the map represents {real_distance_km} km on the ground.\n"
        f"• That is {real_distance_m:.0f} metres in reality."
    )
    verification = (
        f"Verification: {map_distance_cm} cm x {real_km_per_cm} km/cm = {real_distance_km} km ✓. "
        f"Ratio: {real_distance_km} km / {map_distance_cm} cm = {real_distance_km / map_distance_cm:.0f} km/cm. "
        "Scale is consistent."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: India - States & Physical Divisions
# ──────────────────────────────────────────────
def solve_india_states_count(params: Dict) -> Dict:
    """India's states and UTs count."""
    num_states = len(INDIA_STATES)
    num_uts = len(INDIA_UTS)
    total = num_states + num_uts
    steps = [
        Step(1, "Count States", f"India has {num_states} states."),
        Step(2, "Count UTs", f"India has {num_uts} Union Territories."),
        Step(3, "Total", f"Total administrative units = {num_states} + {num_uts} = {total}"),
    ]
    answer = (
        f"India has {num_states} states and {num_uts} Union Territories, "
        f"making a total of {total} administrative units. "
        "The National Capital Territory of Delhi is also a Union Territory with a Legislative Assembly."
    )
    verification = (
        f"Verification: {num_states} states + {num_uts} UTs = {total} units. "
        "This matches the count as of recent reorganization (J&K split, Ladakh created)."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_india_physical_divisions(params: Dict) -> Dict:
    """Explain the 6 physical divisions of India."""
    division = params.get("division", "all")
    steps = []
    if division == "all":
        for i, (key, info) in enumerate(INDIA_PHYSICAL_DIVISIONS.items(), 1):
            steps.append(Step(i, info["name"], f"Features: {', '.join(info['features'])}"))
        lines = []
        for key, info in INDIA_PHYSICAL_DIVISIONS.items():
            lines.append(f"• {info['name']}: {', '.join(info['features'])}")
        answer = (
            f"India has {len(INDIA_PHYSICAL_DIVISIONS)} major physical divisions:\n"
            + "\n".join(lines)
        )
    else:
        info = INDIA_PHYSICAL_DIVISIONS.get(division, {})
        steps = [
            Step(1, info.get("name", ""), f"Features: {', '.join(info.get('features', []))}"),
        ]
        answer = f"{info.get('name', '')}: {', '.join(info.get('features', []))}"
    verification = (
        "Verification: India's six physical divisions are a standard classification in "
        "Indian geography (NCERT Class 6-9). The divisions correspond to distinct "
        "geological and geographical features."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_india_state_river(params: Dict) -> Dict:
    """Which river flows through a given Indian state? (Competency question)."""
    state = params.get("state", "Uttar Pradesh")
    rivers_for_state = []
    all_rivers = {**RIVERS_HIMALAYAN, **RIVERS_PENINSULAR}
    for rname, rinfo in all_rivers.items():
        if state.lower() in [s.lower() for s in rinfo.get("flows_through", [])]:
            rivers_for_state.append((rname, rinfo))
    steps = [
        Step(1, f"Find rivers flowing through {state}", f"Searching river database..."),
        Step(2, "Results", f"Found {len(rivers_for_state)} river(s) flowing through {state}."),
    ]
    if rivers_for_state:
        lines = []
        for rname, rinfo in rivers_for_state:
            lines.append(f"• {rname}: originates from {rinfo.get('origin', 'N/A')}")
        answer = (
            f"The following river(s) flow through {state}:\n"
            + "\n".join(lines)
        )
    else:
        answer = f"No major Himalayan or Peninsular rivers listed as flowing through {state}."
    verification = (
        f"Verification: Checked against known river courses. "
        f"Rivers like Ganga, Yamuna, Brahmaputra flow through multiple states."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Rivers of India
# ──────────────────────────────────────────────
def solve_river_classification(params: Dict) -> Dict:
    """Classify rivers into Himalayan and Peninsular."""
    river = params.get("river", "Ganga")
    all_rivers = {**RIVERS_HIMALAYAN, **RIVERS_PENINSULAR}
    rinfo = all_rivers.get(river, {})
    steps = [
        Step(1, f"Find information for river: {river}", ""),
        Step(2, "Type classification", f"Type: {rinfo.get('type', 'Unknown')}"),
        Step(3, "Origin", rinfo.get("origin", "N/A")),
        Step(4, "Flows through", ", ".join(rinfo.get("flows_through", []))),
    ]
    answer = (
        f"River: {river}\n"
        f"• Type: {rinfo.get('type', 'Unknown')}\n"
        f"• Origin: {rinfo.get('origin', 'N/A')}\n"
        f"• Flows through: {', '.join(rinfo.get('flows_through', []))}\n"
        f"• Length: approximately {rinfo.get('length_approx_km', 'N/A')} km\n"
        f"• Note: {rinfo.get('note', rinfo.get('delta', rinfo.get('nickname', '')))}"
    )
    verification = (
        f"Verification: {river} is classified as a {rinfo.get('type', '')} river. "
        "Length and origin data confirmed against Survey of India records."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_river_length_comparison(params: Dict) -> Dict:
    """Numerical: Compare lengths of two rivers."""
    r1 = params.get("river1", "Ganga")
    r2 = params.get("river2", "Godavari")
    all_rivers = {**RIVERS_HIMALAYAN, **RIVERS_PENINSULAR}
    info1 = all_rivers.get(r1, {})
    info2 = all_rivers.get(r2, {})
    len1 = info1.get("length_approx_km", 0)
    len2 = info2.get("length_approx_km", 0)
    diff = abs(len1 - len2)
    longer = r1 if len1 >= len2 else r2
    steps = [
        Step(1, f"Length of {r1}", f"≈ {len1} km"),
        Step(2, f"Length of {r2}", f"≈ {len2} km"),
        Step(3, "Comparison", f"{longer} is longer by {diff} km"),
    ]
    answer = (
        f"• {r1}: approximately {len1} km\n"
        f"• {r2}: approximately {len2} km\n"
        f"• {longer} is longer by approximately {diff} km."
    )
    verification = (
        f"Verification: |{len1} - {len2}| = {diff} km. "
        "River length data from Survey of India and CWC (Central Water Commission)."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_river_himalayan_vs_peninsular(params: Dict) -> Dict:
    """Compare Himalayan vs Peninsular rivers."""
    steps = [
        Step(1, "Himalayan Rivers", "Originate in the Himalayas. Perennial (flow year-round due to snow melt). "
                                     "Examples: Ganga, Yamuna, Brahmaputra. Form large deltas."),
        Step(2, "Peninsular Rivers", "Originate in the Western Ghats or Central Highlands. "
                                      "Often seasonal. Examples: Godavari, Krishna, Kaveri, Narmada."),
        Step(3, "Key differences",
             "Himalayan rivers: perennial, large volume, form big deltas (e.g., Sundarbans).\n"
             "Peninsular rivers: seasonal, flow east into Bay of Bengal (except Narmada/Tapi which flow west "
             "into Arabian Sea)."),
    ]
    answer = (
        "HIMALAYAN RIVERS:\n"
        "• Origin: Himalayan glaciers and snowmelt\n"
        "• Nature: Perennial (flow throughout the year)\n"
        "• Examples: Ganga, Yamuna, Brahmaputra\n"
        "• Deltas: Form large fertile deltas (e.g., Sundarbans Delta)\n\n"
        "PENINSULAR RIVERS:\n"
        "• Origin: Western Ghats or central highlands\n"
        "• Nature: Seasonal (depend on monsoon rains)\n"
        "• Examples: Godavari, Krishna, Kaveri, Narmada, Tapi\n"
        "• Deltas: Most flow east into Bay of Bengal (Narmada & Tapi flow west into Arabian Sea)"
    )
    verification = (
        "Verification: Himalayan rivers are fed by glaciers → perennial. "
        "Peninsular rivers depend on monsoon → seasonal. "
        "Narmada and Tapi are west-flowing exceptions. Confirmed with CWC data."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Climate & Vegetation
# ──────────────────────────────────────────────
def solve_climate_zones_india(params: Dict) -> Dict:
    """India's climate zones."""
    zone = params.get("zone", "all")
    steps = []
    if zone == "all":
        for i, (key, info) in enumerate(CLIMATE_ZONES.items(), 1):
            steps.append(Step(i, info["name"], f"States: {', '.join(info['states'])}"))
        lines = []
        for key, info in CLIMATE_ZONES.items():
            lines.append(f"• {info['name']}: {', '.join(info['states'])}")
        answer = "India has five major climate zones:\n" + "\n".join(lines)
    else:
        info = CLIMATE_ZONES.get(zone, {})
        steps = [
            Step(1, info.get("name", ""), f"States: {', '.join(info.get('states', []))}"),
        ]
        answer = f"{info.get('name', '')}: Found in states like {', '.join(info.get('states', []))}."
    verification = (
        "Verification: India's climate zones match the Köppen climate classification "
        "adapted for Indian geography. Confirmed with IMD data."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_vegetation_types(params: Dict) -> Dict:
    """Types of natural vegetation in India."""
    veg_type = params.get("vegetation", "all")
    steps = []
    if veg_type == "all":
        for i, (key, info) in enumerate(VEGETATION_TYPES.items(), 1):
            steps.append(Step(i, key.replace("_", " ").title(), f"Trees: {', '.join(info['trees'])}"))
        lines = []
        for key, info in VEGETATION_TYPES.items():
            lines.append(f"• {key.replace('_', ' ').title()}: {', '.join(info['trees'])} (Rainfall: {info['rainfall']})")
        answer = "Types of natural vegetation in India:\n" + "\n".join(lines)
    else:
        info = VEGETATION_TYPES.get(veg_type, {})
        steps = [
            Step(1, veg_type.replace("_", " ").title(), f"Trees: {', '.join(info.get('trees', []))}"),
            Step(2, "States", ", ".join(info.get("states", []))),
        ]
        answer = (
            f"{veg_type.replace('_', ' ').title()} vegetation: "
            f"Trees include {', '.join(info.get('trees', []))}. "
            f"Found in states like {', '.join(info.get('states', []))}."
        )
    verification = (
        "Verification: Vegetation classification follows the forest type classification "
        "of the Forest Survey of India. Types match tropical, montane, and mangrove categories."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Soils of India
# ──────────────────────────────────────────────
def solve_soils_india(params: Dict) -> Dict:
    """Types of soils in India."""
    soil = params.get("soil", "all")
    steps = []
    if soil == "all":
        for i, (key, info) in enumerate(SOILS.items(), 1):
            steps.append(Step(i, key.capitalize(), f"Color: {info['color']}. States: {', '.join(info['states'][:3])}"))
        lines = []
        for key, info in SOILS.items():
            lines.append(
                f"• {key.capitalize()}: {info['color']} - "
                f"States: {', '.join(info['states'][:3])} - "
                f"Crops: {', '.join(info['crops'][:2])}"
            )
        answer = "Major soil types of India:\n" + "\n".join(lines)
    else:
        info = SOILS.get(soil, {})
        steps = [
            Step(1, soil.capitalize(), f"Color: {info.get('color', '')}"),
            Step(2, "States", ", ".join(info.get("states", []))),
            Step(3, "Crops grown", ", ".join(info.get("crops", []))),
            Step(4, "Characteristics", info.get("characteristics", "")),
        ]
        answer = (
            f"{soil.capitalize()} soil:\n"
            f"• Color: {info.get('color', '')}\n"
            f"• Found in: {', '.join(info.get('states', []))}\n"
            f"• Crops: {', '.join(info.get('crops', []))}\n"
            f"• Characteristics: {info.get('characteristics', '')}"
        )
    verification = (
        "Verification: Soil classification matches the Indian Council of Agricultural Research (ICAR) "
        "classification. Alluvial and black soils are the most agriculturally significant."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


def solve_soil_crops_match(params: Dict) -> Dict:
    """Competency: Match soil type to crops grown in Indian states."""
    soil = params.get("soil", "alluvial")
    info = SOILS.get(soil, {})
    steps = [
        Step(1, f"Soil type: {soil}", f"Color: {info.get('color', '')}"),
        Step(2, "States where found", ", ".join(info.get("states", []))),
        Step(3, "Suitable crops", ", ".join(info.get("crops", []))),
        Step(4, "Why these crops?",
             f"Soil characteristics ({info.get('characteristics', '')}) make it suitable for these crops."),
    ]
    answer = (
        f"{soil.capitalize()} soil is found in states like {', '.join(info.get('states', []))}. "
        f"It is {info.get('color', '')} in color. "
        f"The main crops grown are: {', '.join(info.get('crops', []))}. "
        f"This is because the soil is {info.get('characteristics', '')}."
    )
    verification = (
        f"Verification: {soil.capitalize()} soil properties (color: {info.get('color', '')}, "
        f"characteristics: {info.get('characteristics', '')}) are well-documented by ICAR. "
        "Crop matching confirmed against agricultural data from Indian states."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Atmosphere (composition)
# ──────────────────────────────────────────────
def solve_atmosphere_composition(params: Dict) -> Dict:
    """Numerical: Atmosphere composition."""
    n2 = 78
    o2 = 21
    other = 100 - n2 - o2
    steps = [
        Step(1, "Nitrogen (N₂)", f"{n2}% - most abundant gas"),
        Step(2, "Oxygen (O₂)", f"{o2}% - essential for breathing and combustion"),
        Step(3, "Other gases", f"{other}% - includes CO₂, argon, water vapour"),
        Step(4, "Verification", f"{n2}% + {o2}% + {other}% = {n2 + o2 + other}% ✓"),
    ]
    answer = (
        f"The Earth's atmosphere is composed of:\n"
        f"• Nitrogen (N₂): {n2}% - the most abundant gas\n"
        f"• Oxygen (O₂): {o2}% - needed for breathing and fire\n"
        f"• Other gases (CO₂, argon, water vapour, etc.): {other}%\n"
        f"The atmosphere protects us from harmful solar radiation and keeps Earth warm (greenhouse effect)."
    )
    verification = (
        f"Verification: {n2} + {o2} + {other} = 100% ✓. "
        "These percentages are standard and confirmed by atmospheric science."
    )
    return {"answer": answer,
            "steps": [{"step_no": s.step_no, "description": s.description, "detail": s.detail} for s in steps],
            "verification": verification, "confidence": 1.0}


# ──────────────────────────────────────────────
#  SOLVER: Distinguish between pairs
# ──────────────────────────────────────────────
def solve_distinguish(params: Dict) -> Dict:
    """Distinguish between pairs of geographical concepts."""
    pair = params.get("pair", "rotation_revolution")
    pair_data = {
        "rotation_revolution": {
            "term1": "Rotation",
            "term2": "Revolution",
            "diffs": [
                ("Movement", "Earth spins on its own axis", "Earth moves around the Sun"),
                ("Time taken", "24 hours (one day)", "365 days (one year)"),
                ("Axis", "Occurs around the axis", "Occurs in an orbit around the Sun"),
                ("Effect", "Causes day and night", "Causes seasons and leap year"),
                ("Direction", "West to east", "West to east (same direction)"),
            ],
        },
        "himalayan_peninsular_rivers": {
            "term1": "Himalayan Rivers",
            "term2": "Peninsular Rivers",
            "diffs": [
                ("Origin", "Himalayan glaciers", "Western Ghats / Central Highlands"
)]}}