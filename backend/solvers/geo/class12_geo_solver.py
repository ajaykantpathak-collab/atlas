"""
CISCE ISC Class 12 Geography - Deterministic Solver & Question Generator
Syllabus: c12_geo_001 through c12_geo_015
Physical, Human, and Economic Geography for ISC Class 12
"""

import random
import hashlib
from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, List, Any, Optional, Tuple

# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def set_seed(seed: int) -> None:
    """Set random seed for reproducibility."""
    random.seed(seed)


def hash_seed(*args: Any) -> int:
    """Generate deterministic integer seed from arguments."""
    s = str(args)
    return int(hashlib.md5(s.encode()).hexdigest()[:8], 16)


def d(val: float) -> Decimal:
    """Wrap float as Decimal for financial calculations."""
    return Decimal(str(val))


def _halve(value: Decimal) -> Decimal:
    """Round to 2 decimal places (half-up)."""
    return value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


# ============================================================
# BASE SOLVER CLASS
# ============================================================

class BaseSolver:
    """Base class for all Geography solvers."""

    PROBLEM_TYPE: str = "base"
    TOPIC: str = "General Geography"
    MARKS: int = 1

    def __init__(self, seed: int = 0, difficulty: str = "medium", **kwargs: Any):
        self.seed = seed
        self.difficulty = difficulty
        self.params = kwargs
        set_seed(seed)

    def solve(self) -> Dict[str, Any]:
        """Solve and return answer dict with keys: answer, steps, verification."""
        set_seed(self.seed)
        result = self._solve()
        result["verification"] = self._verify(result["answer"])
        result["solver"] = self.__class__.__name__
        result["problem_type"] = self.PROBLEM_TYPE
        result["topic"] = self.TOPIC
        result["marks"] = self.MARKS
        result["difficulty"] = self.difficulty
        return result

    def _solve(self) -> Dict[str, Any]:
        raise NotImplementedError

    def _verify(self, answer: Any) -> Dict[str, Any]:
        raise NotImplementedError


# ============================================================
# SOLVER REGISTRY
# ============================================================

SOLVER_REGISTRY: Dict[str, type] = {}


def register_solver(cls: type) -> type:
    """Decorator to register solver classes."""
    if hasattr(cls, "PROBLEM_TYPE"):
        SOLVER_REGISTRY[cls.PROBLEM_TYPE] = cls
    return cls


def get_solver(problem_type: str) -> Optional[type]:
    """Get solver class by problem type."""
    return SOLVER_REGISTRY.get(problem_type)


def solve(problem_type: str, **kwargs: Any) -> Dict[str, Any]:
    """Convenience function to solve a problem by type."""
    cls = get_solver(problem_type)
    if cls is None:
        return {"error": f"No solver for problem type: {problem_type}"}
    solver = cls(**kwargs)
    return solver.solve()


# ============================================================
# c12_geo_001 – Latitude and Climate Zones
# ============================================================

@register_solver
class ClimateZoneSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_001"
    TOPIC = "Latitude and Climate Zones"
    MARKS = 2

    CLIMATE_ZONES = [
        ("Equatorial", 0, 5, "Hot and wet year-round"),
        ("Tropical", 5, 23.5, "Hot with wet and dry seasons"),
        ("Subtropical", 23.5, 35, "Hot summers, mild winters"),
        ("Temperate", 35, 66.5, "Moderate with distinct seasons"),
        ("Polar", 66.5, 90, "Cold year-round"),
    ]

    def _solve(self) -> Dict[str, Any]:
        lat = round(random.uniform(0, 90), 1)
        direction = random.choice(["N", "S"])
        lat_val = lat if direction == "N" else lat
        zone, lo, hi, char = next(
            (z for z in self.CLIMATE_ZONES if lo <= lat_val <= hi),
            ("Polar", 66.5, 90, "Cold year-round"),
        )
        steps = [
            f"Given latitude: {direction} {lat}°",
            f"Latitude value: {lat_val}°",
            f"Zone range: {lo}° to {hi}°",
            f"Climate zone: {zone}",
            f"Characteristics: {char}",
        ]
        return {
            "answer": {
                "latitude": f"{direction} {lat}°",
                "latitude_value": lat_val,
                "climate_zone": zone,
                "characteristics": char,
                "zone_range": f"{lo}° - {hi}°",
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        lat_v = answer["latitude_value"]
        expected = next(
            (z[0] for z in self.CLIMATE_ZONES if z[1] <= lat_v <= z[2]),
            "Polar",
        )
        ok = answer["climate_zone"] == expected
        return {
            "passed": ok,
            "expected_zone": expected,
            "actual_zone": answer["climate_zone"],
            "message": "Correct!" if ok else f"Expected {expected}",
        }


# ============================================================
# c12_geo_002 – Seasonal Weather Patterns
# ============================================================

@register_solver
class SeasonalWeatherSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_002"
    TOPIC = "Seasonal Weather Patterns"
    MARKS = 2

    MONTHS_NH = {
        "Summer": ["March", "April", "May", "June"],
        "Monsoon": ["July", "August", "September"],
        "Post-Monsoon": ["October", "November"],
        "Winter": ["December", "January", "February"],
    }

    def _solve(self) -> Dict[str, Any]:
        season = random.choice(list(self.MONTHS_NH.keys()))
        month = random.choice(self.MONTHS_NH[season])
        temps = {
            "Summer": random.randint(30, 45),
            "Monsoon": random.randint(25, 35),
            "Post-Monsoon": random.randint(20, 32),
            "Winter": random.randint(10, 25),
        }
        temp = temps[season]
        steps = [
            f"Month: {month} (Northern Hemisphere)",
            f"Identified season: {season}",
            f"Expected temperature: {temp}°C",
            f"Typical weather: Warm/hot, high humidity" if season in ["Summer", "Monsoon"] else "Pleasant/mild weather",
        ]
        return {
            "answer": {
                "month": month,
                "season_nh": season,
                "expected_temperature_c": temp,
                "hemisphere": "Northern Hemisphere",
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        valid = all(
            answer["month"] in months
            for months in self.MONTHS_NH.values()
        )
        season_match = any(
            answer["month"] in months
            for s, months in self.MONTHS_NH.items()
            if s == answer["season_nh"]
        )
        passed = valid and season_match
        return {
            "passed": passed,
            "message": "Correct season-month mapping!" if passed else "Mismatch detected.",
        }


# ============================================================
# c12_geo_003 – Soil Classification
# ============================================================

@register_solver
class SoilClassificationSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_003"
    TOPIC = "Soil Classification and Properties"
    MARKS = 2

    SOIL_TYPES = [
        {
            "name": "Alluvial Soil",
            "regions": ["Indo-Gangetic Plain", "Brahmaputra Valley"],
            "colour": "Light brown / greyish",
            "ph_range": (6.5, 8.0),
            "crops": ["Rice", "Wheat", "Sugarcane", "Cotton"],
            "fertility": "High",
        },
        {
            "name": "Black Soil",
            "regions": ["Deccan Plateau", "Maharashtra", "Madhya Pradesh"],
            "colour": "Deep black",
            "ph_range": (7.0, 8.5),
            "crops": ["Cotton", "Soybean", "Groundnut"],
            "fertility": "High",
        },
        {
            "name": "Red Soil",
            "regions": ["Tamil Nadu", "Karnataka", "Rajputana"],
            "colour": "Reddish brown",
            "ph_range": (6.0, 7.5),
            "crops": ["Millets", "Pulses", "Tobacco"],
            "fertility": "Medium",
        },
        {
            "name": "Laterite Soil",
            "regions": ["Kerala", "Karnataka", "Assam"],
            "colour": "Reddish-brown / rusty",
            "ph_range": (4.5, 6.5),
            "crops": ["Cashew", "Coffee", "Tea", "Rubber"],
            "fertility": "Low (after leaching)",
        },
        {
            "name": "Desert Soil",
            "regions": ["Rajasthan (Thar)", "Gujarat"],
            "colour": "Sandy / brown",
            "ph_range": (7.0, 9.0),
            "crops": ["Millets", "Bajra", "Jowar"],
            "fertility": "Medium (with irrigation)",
        },
        {
            "name": "Mountain Soil",
            "regions": ["Himalayas", "North-East Hills"],
            "colour": "Brown / dark brown",
            "ph_range": (4.5, 6.0),
            "crops": ["Tea", "Coffee", "Spices", "Fruits"],
            "fertility": "Medium",
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        soil = random.choice(self.SOIL_TYPES)
        crops_str = ", ".join(soil["crops"])
        region_str = ", ".join(soil["regions"])
        steps = [
            f"Selected soil type: {soil['name']}",
            f"Colour: {soil['colour']}",
            f"Regions: {region_str}",
            f"pH Range: {soil['ph_range'][0]} - {soil['ph_range'][1]}",
            f"Fertility: {soil['fertility']}",
            f"Major crops: {crops_str}",
        ]
        return {
            "answer": soil,
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        expected = next(
            (s for s in self.SOIL_TYPES if s["name"] == answer["name"]), None
        )
        if expected is None:
            return {"passed": False, "message": "Unknown soil type."}
        ph_ok = expected["ph_range"][0] <= answer["ph_range"][0] <= answer["ph_range"][1] <= expected["ph_range"][1]
        passed = (
            answer["name"] == expected["name"]
            and answer["colour"] == expected["colour"]
            and answer["fertility"] == expected["fertility"]
        )
        return {
            "passed": passed,
            "message": "Correct soil classification!" if passed else "Check soil properties.",
        }


# ============================================================
# c12_geo_004 – Natural Vegetation
# ============================================================

@register_solver
class NaturalVegetationSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_004"
    TOPIC = "Natural Vegetation of India"
    MARKS = 2

    VEG_TYPES = [
        {
            "type": "Tropical Evergreen",
            "rainfall": (200, 400),
            "location": "Western Ghats, Andaman & Nicobar, North-East",
            "trees": ["Rosewood", "Mahogany", "Ebony", "Aini"],
            "density": "Very dense",
        },
        {
            "type": "Tropical Deciduous",
            "rainfall": (100, 200),
            "location": "Central India, Gangetic Plain",
            "trees": ["Teak", "Sal", "Sandalwood", "Deodar"],
            "density": "Moderately dense",
        },
        {
            "type": "Tropical Thorn",
            "rainfall": (25, 75),
            "location": "Rajasthan, Punjab, Haryana, Gujarat",
            "trees": ["Babul", "Banyan", "Palm", "Date Palm"],
            "density": "Sparse",
        },
        {
            "type": "Montane (Himalayan)",
            "rainfall": (150, 300),
            "location": "Himalayas (altitude gradient)",
            "trees": ["Chir Pine", "Deodar", "Rhododendron", "Oak"],
            "density": "Varies with altitude",
        },
        {
            "type": "Mangrove (Tidal)",
            "rainfall": (100, 250),
            "location": "Sundarbans (W.B.), Andaman",
            "trees": ["Sundri", "Garan", "Hental Palm"],
            "density": "Moderate",
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        veg = random.choice(self.VEG_TYPES)
        steps = [
            f"Vegetation type: {veg['type']}",
            f"Annual rainfall: {veg['rainfall'][0]}–{veg['rainfall'][1]} cm",
            f"Location: {veg['location']}",
            f"Key trees: {', '.join(veg['trees'])}",
            f"Canopy density: {veg['density']}",
        ]
        return {
            "answer": veg,
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        expected = next(
            (v for v in self.VEG_TYPES if v["type"] == answer["type"]), None
        )
        if expected is None:
            return {"passed": False, "message": "Unknown vegetation type."}
        passed = (
            answer["type"] == expected["type"]
            and answer["density"] == expected["density"]
        )
        return {
            "passed": passed,
            "message": "Correct!" if passed else "Check vegetation properties.",
        }


# ============================================================
# c12_geo_005 – Weather Maps and Instruments
# ============================================================

@register_solver
class WeatherMapSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_005"
    TOPIC = "Weather Maps and Instruments"
    MARKS = 2

    INSTRUMENTS = [
        {"name": "Barometer", "measures": "Atmospheric pressure", "unit": "millibar (mb)"},
        {"name": "Thermometer", "measures": "Air temperature", "unit": "Degree Celsius (°C)"},
        {"name": "Hygrometer", "measures": "Relative humidity", "unit": "Percentage (%)"},
        {"name": "Anemometer", "measures": "Wind speed", "unit": "km/h or knots"},
        {"name": "Wind Vane", "measures": "Wind direction", "unit": "Degrees / Cardinal"},
        {"name": "Rain Gauge", "measures": "Precipitation", "unit": "mm"},
        {"name": "Sunshine Recorder", "measures": "Duration of sunshine", "unit": "Hours"},
        {"name": "Maximum-Minimum Thermometer", "measures": "Daily temperature range", "unit": "°C"},
    ]

    MAP_SYMBOLS = [
        {"symbol": "⊙ or ○", "meaning": "Sunny / Clear sky"},
        {"symbol": "☁", "meaning": "Cloudy"},
        {"symbol": "⛅", "meaning": "Partly cloudy"},
        {"symbol": "🌧 (zigzag lines)", "meaning": "Rain"},
        {"symbol": "❄ or *", "meaning": "Snow"},
        {"symbol": "⚡", "meaning": "Thunderstorm"},
        {"symbol": "arrows on line", "meaning": "Wind direction and speed"},
        {"symbol": "closed circle with T", "meaning": "Tropical cyclone / depression"},
    ]

    def _solve(self) -> Dict[str, Any]:
        use = random.choice(["instrument", "map_symbol"])
        if use == "instrument":
            item = random.choice(self.INSTRUMENTS)
            steps = [
                f"Instrument: {item['name']}",
                f"Measures: {item['measures']}",
                f"Unit: {item['unit']}",
            ]
        else:
            item = random.choice(self.MAP_SYMBOLS)
            steps = [
                f"Symbol: {item['symbol']}",
                f"Meaning: {item['meaning']}",
            ]
        return {
            "answer": item,
            "steps": steps,
            "category": use,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        name = answer.get("name", "")
        meaning = answer.get("meaning", "")
        instr_match = any(i["name"] == name for i in self.INSTRUMENTS)
        sym_match = any(s["meaning"] == meaning for s in self.MAP_SYMBOLS)
        passed = instr_match or sym_match
        return {
            "passed": passed,
            "message": "Correct instrument/map symbol!" if passed else "Check the entry.",
        }


# ============================================================
# c12_geo_006 – Monsoon Characteristics
# ============================================================

@register_solver
class MonsoonSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_006"
    TOPIC = "Southwest Monsoon Characteristics"
    MARKS = 3

    MONSOON_FACTS = {
        "onset_kerala": "June 1 (Mascarene High → Kerala)",
        "withdrawal_kerala": "September–October",
        "duration": "June to September (approx. 4 months)",
        "jet_stream_1": "Subtropical Westerly Jet (over India in winter)",
        "jet_stream_2": "Tropical Easterly Jet (over India in summer)",
        "origin_wind": "South-East Trade Winds crossing the Equator (Coriolis)",
        "total_rainfall_contribution_pct": 75,
        "branch_arabian_sea": "Arabian Sea Branch (hits Western Ghats first)",
        "branch_bay_of_bengal": "Bay of Bengal Branch (hits NE, then Gangetic Plain)",
        "burst": "Sudden rise in rainfall + drop in pressure",
        "break": "Interruption in monsoon rainfall for 1–2 weeks",
        "itcz": "Inter-Tropical Convergence Zone (ITCZ) shifts north in summer",
        "l_o": "Low pressure over North India + High over Indian Ocean drives monsoon",
        "mango_shower": "Pre-monsoon showers in Kerala/Karnataka (March–May)",
    }

    def _solve(self) -> Dict[str, Any]:
        keys = list(self.MONSOON_FACTS.keys())
        chosen = random.sample(keys, k=min(2, len(keys)))
        steps = []
        answer = {}
        for key in chosen:
            answer[key] = self.MONSOON_FACTS[key]
            steps.append(f"{key}: {self.MONSOON_FACTS[key]}")
        return {"answer": answer, "steps": steps}

    def _verify(self, answer: Any) -> Dict[str, Any]:
        all_correct = all(
            answer.get(k) == v for k, v in self.MONSOON_FACTS.items()
            if k in answer
        )
        return {
            "passed": all_correct,
            "message": "Correct monsoon facts!" if all_correct else "Review monsoon details.",
        }


# ============================================================
# c12_geo_007 – Tropical Cyclones
# ============================================================

@register_solver
class TropicalCycloneSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_007"
    TOPIC = "Tropical Cyclones"
    MARKS = 3

    def _solve(self) -> Dict[str, Any]:
        wind_speed = random.randint(120, 280)
        region = random.choice(
            [
                "Bay of Bengal & Arabian Sea",
                "South Indian Ocean (near Madagascar)",
                "South China Sea / Philippines",
            ]
        )
        season_months = (
            "April–May and October–December (Bay of Bengal)"
            if "Bay" in region
            else (
                "May–June and September–October (Arabian Sea)"
                if "Arabian" in region
                else "July–September"
            )
        )
        category = (
            "Cyclone" if wind_speed >= 119 else "Depression"
            if wind_speed >= 28 else "Low pressure area"
        )
        steps = [
            f"Wind speed: {wind_speed} km/h",
            f"Region of origin: {region}",
            f"Category: {category}",
            f"Season: {season_months}",
            "Formation: Warm ocean water (>26°C) + low pressure + Coriolis force",
            f"Impact: Storm surge, heavy rainfall, wind damage up to {wind_speed} km/h",
        ]
        return {
            "answer": {
                "wind_speed_kmh": wind_speed,
                "region": region,
                "category": category,
                "season": season_months,
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        ws = answer.get("wind_speed_kmh", 0)
        expected_cat = (
            "Cyclone" if ws >= 119 else "Depression" if ws >= 28 else "Low pressure area"
        )
        passed = answer["category"] == expected_cat
        return {
            "passed": passed,
            "expected_category": expected_cat,
            "message": "Correct!" if passed else f"Expected category: {expected_cat}",
        }


# ============================================================
# c12_geo_008 – Population Distribution
# ============================================================

@register_solver
class PopulationDistributionSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_008"
    TOPIC = "Population Distribution and Density"
    MARKS = 2

    STATES_DATA = [
        {"name": "Uttar Pradesh", "pop_crore": 24, "area_lakh_km2": 2.4, "density": 828},
        {"name": "Maharashtra", "pop_crore": 12.6, "area_lakh_km2": 3.08, "density": 365},
        {"name": "Bihar", "pop_crore": 12.3, "area_lakh_km2": 0.94, "density": 1106},
        {"name": "West Bengal", "pop_crore": 9.9, "area_lakh_km2": 0.89, "density": 1028},
        {"name": "Kerala", "pop_crore": 3.5, "area_lakh_km2": 0.39, "density": 859},
        {"name": "Rajasthan", "pop_crore": 8.1, "area_lakh_km2": 3.42, "density": 200},
        {"name": "Madhya Pradesh", "pop_crore": 8.5, "area_lakh_km2": 3.09, "density": 236},
        {"name": "Tamil Nadu", "pop_crore": 7.6, "area_lakh_km2": 1.3, "density": 555},
        {"name": "Karnataka", "pop_crore": 6.5, "area_lakh_km2": 1.92, "density": 319},
        {"name": "Gujarat", "pop_crore": 6.4, "area_lakh_km2": 1.96, "density": 308},
        {"name": "Andhra Pradesh", "pop_crore": 5.3, "area_lakh_km2": 1.62, "density": 303},
        {"name": "Odisha", "pop_crore": 4.6, "area_lakh_km2": 1.56, "density": 269},
        {"name": "Punjab", "pop_crore": 3.0, "area_lakh_km2": 0.50, "density": 551},
        {"name": "Haryana", "pop_crore": 2.9, "area_lakh_km2": 0.44, "density": 573},
        {"name": "Assam", "pop_crore": 3.5, "area_lakh_km2": 0.78, "density": 398},
    ]

    def _solve(self) -> Dict[str, Any]:
        state = random.choice(self.STATES_DATA)
        pop_pct = round((state["pop_crore"] / 140.0) * 100, 2)
        steps = [
            f"State: {state['name']}",
            f"Population: ~{state['pop_crore']} crore",
            f"Area: ~{state['area_lakh_km2']} lakh sq km",
            f"Density: {state['density']} persons/sq km",
            f"Share of India's population: {pop_pct}% (approx.)",
        ]
        return {
            "answer": {
                "state": state["name"],
                "population_crore": state["pop_crore"],
                "area_lakh_sq_km": state["area_lakh_km2"],
                "density_per_sq_km": state["density"],
                "population_share_pct": pop_pct,
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        state_name = answer["state"]
        expected = next((s for s in self.STATES_DATA if s["name"] == state_name), None)
        if expected is None:
            return {"passed": False, "message": "Unknown state."}
        passed = answer["density_per_sq_km"] == expected["density"]
        return {
            "passed": passed,
            "message": "Correct density!" if passed else f"Expected density: {expected['density']}",
        }


# ============================================================
# c12_geo_009 – Migration
# ============================================================

@register_solver
class MigrationSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_009"
    TOPIC = "Migration — Push and Pull Factors"
    MARKS = 3

    PUSH_FACTORS = [
        "Unemployment",
        "Low agricultural income",
        "Natural disasters (floods, drought)",
        "Poor healthcare facilities",
        "Lack of educational opportunities",
        "Political instability",
        "Caste discrimination",
        "Economic backwardness",
    ]

    PULL_FACTORS = [
        "Better employment opportunities",
        "Higher wages",
        "Good education facilities",
        "Better healthcare",
        "Urban amenities",
        "Industrial development",
        "Family reunification",
    ]

    def _solve(self) -> Dict[str, Any]:
        direction = random.choice(["rural_to_urban", "urban_to_rural", "international"])
        n_push = random.randint(2, 3)
        n_pull = random.randint(2, 3)
        set_seed(self.seed + 1)
        pushes = random.sample(self.PUSH_FACTORS, n_push)
        pulls = random.sample(self.PULL_FACTORS, n_pull)
        steps = [
            f"Migration type: {direction.replace('_', ' ').title()}",
            f"Push factors: {', '.join(pushes)}",
            f"Pull factors: {', '.join(pulls)}",
            "Analysis: Push factors drive people away from origin; pull factors attract to destination.",
        ]
        return {
            "answer": {
                "migration_type": direction,
                "push_factors": pushes,
                "pull_factors": pulls,
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        pushes_ok = all(p in self.PUSH_FACTORS for p in answer["push_factors"])
        pulls_ok = all(p in self.PULL_FACTORS for p in answer["pull_factors"])
        passed = pushes_ok and pulls_ok
        return {
            "passed": passed,
            "message": "Valid push/pull factors!" if passed else "Some factors not standard.",
        }


# ============================================================
# c12_geo_010 – Urbanisation
# ============================================================

@register_solver
class UrbanisationSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_010"
    TOPIC = "Urbanisation — Problems and Planning"
    MARKS = 3

    INDIA_URBAN_STATS = [
        {"year": 1951, "urban_pct": 17.3},
        {"year": 1961, "urban_pct": 18.3},
        {"year": 1971, "urban_pct": 19.9},
        {"year": 1981, "urban_pct": 23.3},
        {"year": 1991, "urban_pct": 25.7},
        {"year": 2001, "urban_pct": 27.8},
        {"year": 2011, "urban_pct": 31.2},
        {"year": 2023, "urban_pct": 36.0},
    ]

    URBAN_PROBLEMS = [
        "Overcrowding and slums",
        "Water scarcity",
        "Traffic congestion",
        "Air and noise pollution",
        "Inadequate waste management",
        "Housing shortage",
        "Unemployment",
        "Drainage problems / flooding",
    ]

    def _solve(self) -> Dict[str, Any]:
        data_point = random.choice(self.INDIA_URBAN_STATS)
        problems = random.sample(self.URBAN_PROBLEMS, k=random.randint(2, 4))
        dec_share = Decimal(str(data_point["urban_pct"]))
        rural_share = Decimal("100.00") - dec_share
        steps = [
            f"Census Year: {data_point['year']}",
            f"Urban population: {data_point['urban_pct']}%",
            f"Rural population: {_halve(rural_share)}%",
            f"Growth trend: Increasing urbanisation",
            f"Key problems: {'; '.join(problems)}",
        ]
        return {
            "answer": {
                "year": data_point["year"],
                "urban_pct": data_point["urban_pct"],
                "rural_pct": float(_halve(rural_share)),
                "identified_problems": problems,
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        total = Decimal(str(answer["urban_pct"])) + Decimal(str(answer["urban_pct"]))
        rural_check = abs(
            Decimal(str(answer["urban_pct"]))
            + Decimal(str(answer["rural_pct"]))
            - Decimal("100.00")
        ) < Decimal("0.5")
        problems_ok = all(
            p in self.URBAN_PROBLEMS for p in answer["identified_problems"]
        )
        passed = rural_check and problems_ok
        return {
            "passed": passed,
            "message": "Correct urbanisation data!" if passed else "Check calculations.",
        }


# ============================================================
# c12_geo_011 – Agriculture Types
# ============================================================

@register_solver
class AgricultureTypeSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_011"
    TOPIC = "Types of Agriculture"
    MARKS = 3

    AGRI_TYPES = [
        {
            "name": "Subsistence Agriculture",
            "characteristics": [
                "Grown for family consumption",
                "Small land holdings",
                "Mixed crops",
                "Low use of technology",
                "High labour input",
            ],
            "examples": ["Rice in Odisha", "Wheat in UP", "Millets in Maharashtra"],
            "region": "Most of rural India (monsoon-dependent)",
        },
        {
            "name": "Commercial Agriculture",
            "characteristics": [
                "Grown for market sale",
                "Large land holdings",
                "Specialised crops",
                "High use of technology",
                "Capital intensive",
            ],
            "examples": [
                "Tea in Assam",
                "Coffee in Karnataka",
                "Sugarcane in UP",
            ],
            "region": "Plantations in NE, W. Ghats, etc.",
        },
        {
            "name": "Intensive Agriculture",
            "characteristics": [
                "High output per unit land",
                "Multiple crops per year",
                "Heavy use of fertilizers",
                "Irrigation dependent",
            ],
            "examples": ["Rice-Wheat rotation in Punjab-Haryana"],
            "region": "Punjab, Haryana, Western UP",
        },
        {
            "name": "Extensive Agriculture",
            "characteristics": [
                "Large land holdings",
                "Low output per unit land",
                "Mechanised farming",
                "Single crop per year",
            ],
            "examples": ["Wheat in Western USA (comparable model)"],
            "region": "Not dominant in India (sparse population areas)",
        },
        {
            "name": "Plantation Agriculture",
            "characteristics": [
                "Single crop over large area",
                "Capital intensive",
                "Scientific methods",
                "Permanent crops (trees)",
            ],
            "examples": ["Tea", "Coffee", "Rubber", "Coconut", "Spices"],
            "region": "Assam, Darjeeling, Nilgiris, Kerala",
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        agri = random.choice(self.AGRI_TYPES)
        chars = random.sample(
            agri["characteristics"], k=min(3, len(agri["characteristics"]))
        )
        example = random.choice(agri["examples"])
        steps = [
            f"Agriculture type: {agri['name']}",
            f"Characteristics: {'; '.join(chars)}",
            f"Key example: {example}",
            f"Region: {agri['region']}",
        ]
        return {
            "answer": {
                "type": agri["name"],
                "characteristics": chars,
                "example": example,
                "region": agri["region"],
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        expected = next(
            (a for a in self.AGRI_TYPES if a["name"] == answer["type"]), None
        )
        if expected is None:
            return {"passed": False, "message": "Unknown agriculture type."}
        chars_valid = all(
            c in expected["characteristics"] for c in answer["characteristics"]
        )
        passed = answer["type"] == expected["name"] and chars_valid
        return {
            "passed": passed,
            "message": "Correct!" if passed else "Check characteristics.",
        }


# ============================================================
# c12_geo_012 – Industries
# ============================================================

@register_solver
class IndustrySolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_012"
    TOPIC = "Industries — Location Factors and Classification"
    MARKS = 3

    INDUSTRIES = [
        {
            "name": "Iron and Steel",
            "raw_material": "Iron ore, Coal, Limestone",
            "power_source": "Coal / Electricity",
            "examples": ["TISCO (Jamshedpur)", "Bhilai Steel Plant", "Rourkela"],
            "type": "Heavy Industry",
        },
        {
            "name": "Cotton Textile",
            "raw_material": "Cotton",
            "power_source": "Electricity",
            "examples": ["Mumbai (cotton hub)", "Ahmedabad", "Coimbatore"],
            "type": "Light Industry",
        },
        {
            "name": "Sugar Industry",
            "raw_material": "Sugarcane",
            "power_source": "Bagasse (own fuel)",
            "examples": ["Uttar Pradesh", "Maharashtra", "Karnataka"],
            "type": "Agro-based Industry",
        },
        {
            "name": "IT / Software",
            "raw_material": "Skilled labour, Infrastructure",
            "power_source": "Electricity",
            "examples": ["Bangalore", "Hyderabad", "Pune", "Chennai"],
            "type": "Knowledge-based Industry",
        },
        {
            "name": "Petrochemical",
            "raw_material": "Crude oil, Natural gas",
            "power_source": "Oil / Natural gas",
            "examples": ["Mumbai (CPCL)", "Koyali (Gujarat)", "Nayara (Ratnagiri)"],
            "type": "Heavy Industry",
        },
        {
            "name": "Cement",
            "raw_material": "Limestone, Gypsum",
            "power_source": "Coal / Electricity",
            "examples": ["Rajashree Cement (Karnataka)", " ACC (W. Bengal)"],
            "type": "Heavy Industry",
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        ind = random.choice(self.INDUSTRIES)
        steps = [
            f"Industry: {ind['name']} ({ind['type']})",
            f"Raw material: {ind['raw_material']}",
            f"Power source: {ind['power_source']}",
            f"Examples: {', '.join(ind['examples'])}",
        ]
        return {
            "answer": ind,
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        expected = next(
            (i for i in self.INDUSTRIES if i["name"] == answer["name"]), None
        )
        if expected is None:
            return {"passed": False, "message": "Unknown industry."}
        passed = (
            answer["raw_material"] == expected["raw_material"]
            and answer["type"] == expected["type"]
        )
        return {
            "passed": passed,
            "message": "Correct!" if passed else "Check industry details.",
        }


# ============================================================
# c12_geo_013 – Land Use
# ============================================================

@register_solver
class LandUseSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_013"
    TOPIC = "Land Use and Planning"
    MARKS = 2

    def _solve(self) -> Dict[str, Any]:
        land_types = [
            {"category": "Net Sown Area", "india_pct": 46, "desc": "Area sown with crops"},
            {"category": "Forest Area", "india_pct": 24, "desc": "Forest cover"},
            {"category": "Barren & Uncultivable", "india_pct": 8, "desc": "Wasteland"},
            {"category": "Permanent Pastures", "india_pct": 3, "desc": "Grazing land"},
            {"category": "Land under Misc. Crops", "india_pct": 5, "desc": "Groves, etc."},
            {"category": "Culturable Waste", "india_pct": 5, "desc": "Not cultivated currently"},
            {"category": "Fallow Land", "india_pct": 4, "desc": "Left uncultivated"},
            {"category": "Area under Non-agri Use", "india_pct": 5, "desc": "Buildings, roads, etc."},
        ]
        lt = random.choice(land_types)
        steps = [
            f"Land use category: {lt['category']}",
            f"Share of total land: {lt['india_pct']}%",
            f"Description: {lt['desc']}",
        ]
        return {
            "answer": lt,
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        expected = next(
            (lt for lt in [
                {"category": "Net Sown Area", "india_pct": 46},
                {"category": "Forest Area", "india_pct": 24},
                {"category": "Barren & Uncultivable", "india_pct": 8},
                {"category": "Permanent Pastures", "india_pct": 3},
                {"category": "Land under Misc. Crops", "india_pct": 5},
                {"category": "Culturable Waste", "india_pct": 5},
                {"category": "Fallow Land", "india_pct": 4},
                {"category": "Area under Non-agri Use", "india_pct": 5},
            ] if lt["category"] == answer["category"]),
            None,
        )
        passed = expected is not None and answer["india_pct"] == expected["india_pct"]
        return {
            "passed": passed,
            "message": "Correct land-use percentage!" if passed else "Check value.",
        }


# ============================================================
# c12_geo_014 – Transport
# ============================================================

@register_solver
class TransportSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_014"
    TOPIC = "Transport and Communication"
    MARKS = 2

    TRANSPORT_MODES = [
        {
            "mode": "Road Transport",
            "advantages": [
                "Door-to-door service",
                "Flexible routing",
                "Low initial cost",
                "Suitable for short distances",
            ],
            "disadvantages": [
                "High operating cost",
                "Not suitable for bulk goods over long distances",
                "Road accidents common",
            ],
            "key_routes": ["Golden Quadrilateral", "North-South & East-West Corridors"],
        },
        {
            "mode": "Railway Transport",
            "advantages": [
                "Large capacity",
                "Low cost per km for bulk goods",
                "All-weather service",
                "Faster than road for long distances",
            ],
            "disadvantages": [
                "Requires huge capital",
                "Not door-to-door",
                "Infrastructure heavy",
            ],
            "key_routes": ["Grand Chord", "Konkan Railway", "Dedicated Freight Corridors"],
        },
        {
            "mode": "Waterways (Inland)",
            "advantages": [
                "Cheapest mode",
                "High load capacity",
                "Low fuel consumption",
                "Environment friendly",
            ],
            "disadvantages": [
                "Slow speed",
                "Limited to water bodies",
                "Affected by weather",
            ],
            "key_routes": [
                "National Waterway 1 (Ganga)",
                "NW-2 (Brahmaputra)",
            ],
        },
        {
            "mode": "Air Transport",
            "advantages": [
                "Fastest mode",
                "Suitable for remote areas",
                "Emergency services",
            ],
            "disadvantages": [
                "Very expensive",
                "Limited cargo capacity",
                "Weather dependent",
            ],
            "key_routes": [
                "Delhi-Mumbai",
                "Mumbai-Bangalore",
                "Delhi-Kolkata",
            ],
        },
        {
            "mode": "Pipeline Transport",
            "advantages": [
                "Continuous flow",
                "Safe and reliable",
                "Low energy cost",
                "No wastage",
            ],
            "disadvantages": [
                "High initial cost",
                "Limited to liquids/gases",
                "Security risk",
            ],
            "key_routes": ["HBJ Pipeline", "Mumbai-Pune Pipeline"],
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        mode = random.choice(self.TRANSPORT_MODES)
        adv = random.sample(mode["advantages"], k=min(2, len(mode["advantages"])))
        dis = random.sample(mode["disadvantages"], k=min(2, len(mode["disadvantages"])))
        steps = [
            f"Transport mode: {mode['mode']}",
            f"Advantages: {'; '.join(adv)}",
            f"Disadvantages: {'; '.join(dis)}",
            f"Key routes: {', '.join(mode['key_routes'])}",
        ]
        return {
            "answer": {
                "mode": mode["mode"],
                "advantages": adv,
                "disadvantages": dis,
                "key_routes": mode["key_routes"],
            },
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        expected = next(
            (m for m in self.TRANSPORT_MODES if m["mode"] == answer["mode"]), None
        )
        if expected is None:
            return {"passed": False, "message": "Unknown transport mode."}
        adv_ok = all(a in expected["advantages"] for a in answer["advantages"])
        dis_ok = all(d in expected["disadvantages"] for d in answer["disadvantages"])
        passed = adv_ok and dis_ok
        return {
            "passed": passed,
            "message": "Correct!" if passed else "Check advantages/disadvantages.",
        }


# ============================================================
# c12_geo_015 – Mineral Resources
# ============================================================

@register_solver
class MineralResourcesSolver(BaseSolver):
    PROBLEM_TYPE = "c12_geo_015"
    TOPIC = "Mineral Resources and Energy"
    MARKS = 3

    MINERALS = [
        {
            "name": "Iron Ore",
            "states": ["Odisha", "Chhattisgarh", "Karnataka", "Jharkhand"],
            "uses": "Steel production, machinery",
            "reserves_billion_tonnes": 5.5,
            "grade": "High-grade (65%+ Fe in some deposits)",
        },
        {
            "name": "Coal",
            "states": ["Jharkhand", "Odisha", "Chhattisgarh", "West Bengal"],
            "uses": "Power generation, steel, cement",
            "reserves_billion_tonnes": 368,
            "grade": "Medium to high grade",
        },
        {
            "name": "Bauxite",
            "states": ["Odisha", "Gujarat", "Jharkhand", "Maharashtra"],
            "uses": "Aluminium production",
            "reserves_billion_tonnes": 0.89,
            "grade": "Medium grade (55-60% Al2O3)",
        },
        {
            "name": "Mica",
            "states": ["Jharkhand", "Bihar", "Rajasthan", "Andhra Pradesh"],
            "uses": "Electrical industry, cosmetics",
            "reserves_billion_tonnes": 0.11,
            "grade": "High quality sheet mica",
        },
        {
            "name": "Copper",
            "states": ["Jharkhand", "Rajasthan", "Madhya Pradesh"],
            "uses": "Electrical wires, alloys, coins",
            "reserves_billion_tonnes": 0.01,
            "grade": "Medium grade",
        },
        {
            "name": "Manganese",
            "states": ["Odisha", "Madhya Pradesh", "Maharashtra", "Karnataka"],
            "uses": "Steel production, batteries",
            "reserves_billion_tonnes": 0.53,
            "grade": "High grade (>50% MnO2)",
        },
        {
            "name": "Limestone",
            "states": [
                "Rajasthan",
                "Andhra Pradesh",
                "Karnataka",
                "Tamil Nadu",
                "Gujarat",
            ],
            "uses": "Cement, steel, chemical industry",
            "reserves_billion_tonnes": 13.7,
            "grade": "Variable (45-80% CaCO3)",
        },
        {
            "name": "Petroleum / Crude Oil",
            "states": [
                "Assam",
                "Gujarat",
                "Maharashtra",
                "Andhra Pradesh",
                "Rajasthan",
            ],
            "uses": "Fuel, petrochemicals, plastics",
            "reserves_billion_tonnes": 0.6,
            "grade": "Light crude (most fields)",
        },
    ]

    def _solve(self) -> Dict[str, Any]:
        mineral = random.choice(self.MINERALS)
        states_str = ", ".join(mineral["states"])
        steps = [
            f"Mineral: {mineral['name']}",
            f"Major producing states: {states_str}",
            f"Uses: {mineral['uses']}",
            f"Reserves: ~{mineral['reserves_billion_tonnes']} billion tonnes",
            f"Grade: {mineral['grade']}",
        ]
        return {
            "answer": mineral,
            "steps": steps,
        }

    def _verify(self, answer: Any) -> Dict[str, Any]:
        expected = next(
            (m for m in self.MINERALS if m["name"] == answer["name"]), None
        )
        if expected is None:
            return {"passed": False, "message": "Unknown mineral."}
        states_ok = all(s in expected["states"] for s in answer["states"])
        passed = answer["name"] == expected["name"] and states_ok
        return {
            "passed": passed,
            "message": "Correct mineral data!" if passed else "Check states and details.",
        }


# ============================================================
# VERIFY FUNCTIONS (module-level for auto-discovery)
# ============================================================

def verify_climate_zone(answer: Any) -> Dict[str, Any]:
    return ClimateZoneSolver(seed=0)._verify(answer)


def verify_seasonal_weather(answer: Any) -> Dict[str, Any]:
    return SeasonalWeatherSolver(seed=0)._verify(answer)


def verify_soil_classification(answer: Any) -> Dict[str, Any]:
    return SoilClassificationSolver(seed=0)._verify(answer)


def verify_natural_vegetation(answer: Any) -> Dict[str, Any]:
    return NaturalVegetationSolver(seed=0)._verify(answer)


def verify_weather_map(answer: Any) -> Dict[str, Any]:
    return WeatherMapSolver(seed=0)._verify(answer)


def verify_monsoon(answer: Any) -> Dict[str, Any]:
    return MonsoonSolver(seed=0)._verify(answer)


def verify_tropical_cyclone(answer: Any) -> Dict[str, Any]:
    return TropicalCycloneSolver(seed=0)._verify(answer)


def verify_population_distribution(answer: Any) -> Dict[str, Any]:
    return PopulationDistributionSolver(seed=0)._verify(answer)


def verify_migration(answer: Any) -> Dict[str, Any]:
    return MigrationSolver(seed=0)._verify(answer)


def verify_urbanisation(answer: Any) -> Dict[str, Any]:
    return UrbanisationSolver(seed=0)._verify(answer)


def verify_agriculture_type(answer: Any) -> Dict[str, Any]:
    return AgricultureTypeSolver(seed=0)._verify(answer)


def verify_industry(answer: Any) -> Dict[str, Any]:
    return IndustrySolver(seed=0)._verify(answer)


def verify_land_use(answer: Any) -> Dict[str, Any]:
    return LandUseSolver(seed=0)._verify(answer)


def verify_transport(answer: Any) -> Dict[str, Any]:
    return TransportSolver(seed=0)._verify(answer)


def verify_mineral_resources(answer: Any) -> Dict[str, Any]:
    return MineralResourcesSolver(seed=0)._verify(answer)


# ============================================================
# SELF-TEST
# ============================================================

def run_self_test() -> None:
    """Run a comprehensive self-test of all solvers."""
    print("=" * 60)
    print("CISCE ISC Class 12 Geography — Solver Self-Test")
    print("=" * 60)

    total = 0
    passed = 0
    failed = []

    test_seeds = [101, 202, 303, 404, 505, 606, 707, 808, 909, 1010,
                   1111, 1212, 1313, 1414, 1515]

    for i, problem_type in enumerate(sorted(SOLVER_REGISTRY.keys())):
        seed = test_seeds[i]
        try:
            result = solve(problem_type, seed=seed, difficulty="medium")
            total += 1
            verif = result.get("verification", {})
            if verif.get("passed", False):
                passed += 1
                status = "✓ PASS"
            else:
                status = f"✗ FAIL ({verif.get('message', '')})"
                failed.append(problem_type)
            print(f"  [{total:02d}] {problem_type}: {status}")
            print(f"       Topic: {result.get('topic', 'N/A')}")
            print(f"       Answer: {result.get('answer', {})}")
        except Exception as e:
            total += 1
            failed.append(problem_type)
            print(f"  [{total:02d}] {problem_type}: ✗ ERROR — {e}")

    print("=" * 60)
    print(f"Results: {passed}/{total} passed ({100*passed//max(total,1)}%)")
    if failed:
        print(f"Failed: {failed}")
    else:
        print("All solvers passed!")
    print("=" * 60)

    # Test Decimal usage in Urbanisation solver
    print("\n--- Decimal Verification Test ---")
    solver = UrbanisationSolver(seed=42)
    result = solver.solve()
    rural = result["answer"]["rural_pct"]
    urban = result["answer"]["urban_pct"]
    total_pct = d(str(rural)) + d(str(urban))
    print(f"  Urban: {urban}%, Rural: {rural}%")
    print(f"  Total: {total_pct}% (should be 100.00%)")
    print(f"  Rounded: {_halve(total_pct)}")

    # Test reproducibility
    print("\n--- Reproducibility Test ---")
    r1 = solve("c12_geo_001", seed=999)
    r2 = solve("c12_geo_001", seed=999)
    same = r1["answer"] == r2["answer"]
    print(f"  Same seed → same answer: {same}")
    print(f"  Answer: {r1['answer']}")

    print("\nSelf-test complete.")


if __name__ == "__main__":
    run_self_test()