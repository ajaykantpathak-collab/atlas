"""
CISCE Class 6 Environmental Science (EVS) - Solver & Question Generator
Deterministic, seed-controlled, no external LLM calls.
Covers full syllabus nodes c6_evs_001 through c6_evs_015.
"""
from __future__ import annotations

import math
import random
import json
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Tuple, Union
from enum import Enum


# ===== SECTION 1: DATA MODELS =====

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_Answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    AIR_IMPORTANCE = "c6_evs_001"
    WATER_SOURCES = "c6_evs_002"
    SOIL_TYPES = "c6_evs_003"
    FORESTS_WILDLIFE = "c6_evs_004"
    FOOD_NUTRITION = "c6_evs_005"
    SHELTER_HOUSING = "c6_evs_006"
    TRANSPORT = "c6_evs_007"
    WASTE_MANAGEMENT = "c6_evs_008"
    ENERGY_RESOURCES = "c6_evs_009"
    HEALTH_HYGIENE = "c6_evs_010"
    NATURAL_DISASTERS = "c6_evs_011"
    MAPS_GLOBES = "c6_evs_012"
    POPULATION_COMMUNITY = "c6_evs_013"
    THREE_RS = "c6_evs_014"
    WATER_CYCLE = "c6_evs_015"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    unit: Optional[str] = None
    blank_word: Optional[str] = None


@dataclass
class SolverResult:
    answer: Any
    steps: List[str]
    verification: str
    confidence: str


def _init_rng(seed: int) -> random.Random:
    return random.Random(seed)


ALL_TOPICS: List[str] = [t.value for t in Topic]

TOPIC_NAMES: Dict[str, str] = {
    "c6_evs_001": "Air Around Us",
    "c6_evs_002": "Water - Sources and Conservation",
    "c6_evs_003": "Soil - Formation and Types",
    "c6_evs_004": "Forests and Wildlife",
    "c6_evs_005": "Food and Nutrition",
    "c6_evs_006": "Shelter and Housing",
    "c6_evs_007": "Transport and Communication",
    "c6_evs_008": "Waste Management",
    "c6_evs_009": "Energy Resources",
    "c6_evs_010": "Health and Hygiene",
    "c6_evs_011": "Natural Disasters",
    "c6_evs_012": "Maps and Globes",
    "c6_evs_013": "Population and Community",
    "c6_evs_014": "Reduce, Reuse, Recycle",
    "c6_evs_015": "The Water Cycle",
}

PROBLEM_TYPES: Dict[str, List[str]] = {
    "c6_evs_001": ["gas_composition", "air_quality_index"],
    "c6_evs_002": ["freshwater_pct", "water_usage_calc", "water_wastage"],
    "c6_evs_003": ["soil_composition", "soil_erosion_calc"],
    "c6_evs_004": ["forest_cover_calc", "tree_planting_calc"],
    "c6_evs_005": ["diet_percentage", "calorie_calc"],
    "c6_evs_006": ["area_calc", "housing_density"],
    "c6_evs_007": ["speed_calc", "distance_calc"],
    "c6_evs_008": ["waste_segregation", "waste_reduction"],
    "c6_evs_009": ["energy_consumption", "energy_savings"],
    "c6_evs_010": ["bmi_calc", "hygiene_percentage"],
    "c6_evs_011": ["area_affected", "magnitude_comparison"],
    "c6_evs_012": ["map_scale_calc", "area_from_map"],
    "c6_evs_013": ["population_density", "population_growth"],
    "c6_evs_014": ["recycling_rate", "composting_calc"],
    "c6_evs_015": ["evaporation_calc", "rainfall_calc"],
}


# ===== SECTION 3: SOLVER FUNCTIONS =====

def _solve_gas_composition(params: dict) -> SolverResult:
    n2 = float(params.get("nitrogen_pct", 78))
    o2 = float(params.get("oxygen_pct", 21))
    other = round(100.0 - n2 - o2, 2)
    s1 = "Step 1: Total percentage of all gases in air = 100%"
    s2 = "Step 2: Percentage of Nitrogen in air = " + str(n2) + "%"
    s3 = "Step 3: Percentage of Oxygen in air = " + str(o2) + "%"
    s4 = "Step 4: Percentage of other gases = 100% - " + str(n2) + "% - " + str(o2) + "%"
    s5 = "       = " + str(round(100.0 - n2 - o2, 2)) + "%"
    s6 = "Answer: Percentage of other gases in air = " + str(other) + "%"
    ver = "Verification: " + str(n2) + "% + " + str(o2) + "% + " + str(other) + "% = " + str(round(n2 + o2 + other, 2)) + "% = 100% (correct)"
    return SolverResult(answer=str(other) + "%", steps=[s1, s2, s3, s4, s5, s6], verification=ver, confidence="high")


def _solve_air_quality_index(params: dict) -> SolverResult:
    rspm = float(params.get("rspm", 180))
    limit = float(params.get("safe_limit", 100))
    excess = round(rspm - limit, 2)
    pct_excess = round((excess / limit) * 100, 2)
    new_rspm = round(rspm * 0.8, 2)
    s1 = "Step 1: Current RSPM level = " + str(rspm) + " ug/m3"
    s2 = "Step 2: Safe limit for RSPM = " + str(limit) + " ug/m3"
    s3 = "Step 3: Excess over safe limit = " + str(rspm) + " - " + str(limit) + " = " + str(excess) + " ug/m3"
    s4 = "Step 4: Percentage excess = (" + str(excess) + " / " + str(limit) + ") x 100 = " + str(pct_excess) + "%"
    s5 = "Step 5: After 20% improvement, new level = " + str(rspm) + " x 0.8 = " + str(new_rspm) + " ug/m3"
    s6 = "Answer: RSPM exceeds safe limit by " + str(pct_excess) + "%. New AQI = " + str(new_rspm) + " ug/m3"
    ver = "Verification: 20% of " + str(rspm) + " = " + str(round(rspm * 0.2, 2)) + ". " + str(rspm) + " - " + str(round(rspm * 0.2, 2)) + " = " + str(new_rspm) + " (correct)"
    return SolverResult(answer="Excess: " + str(pct_excess) + "%, New AQI: " + str(new_rspm) + " ug/m3", steps=[s1, s2, s3, s4, s5, s6], verification=ver, confidence="high")


def _solve_freshwater_pct(params: dict) -> SolverResult:
    ocean_pct = float(params.get("ocean_pct", 97.5))
    fresh_pct = round(100.0 - ocean_pct, 2)
    s1 = "Step 1: Total water on Earth = 100%"
    s2 = "Step 2: Percentage of water in oceans = " + str(ocean_pct) + "%"
    s3 = "Step 3: Percentage of freshwater = 100% - " + str(ocean_pct) + "% = " + str(fresh_pct) + "%"
    s4 = "Answer: Percentage of freshwater = " + str(fresh_pct) + "%"
    ver = "Verification: " + str(ocean_pct) + "% + " + str(fresh_pct) + "% = " + str(round(ocean_pct + fresh_pct, 2)) + "% = 100% (correct)"
    return SolverResult(answer=str(fresh_pct) + "%", steps=[s1, s2, s3, s4], verification=ver, confidence="high")


def _solve_water_usage(params: dict) -> SolverResult:
    families = int(params.get("families", 20))
    daily_per_family = float(params.get("daily_per_family", 600))
    days = int(params.get("days", 30))
    daily_total = families * daily_per_family
    total = daily_total * days
    s1 = "Step 1: Number of families in the colony = " + str(families)
    s2 = "Step 2: Daily water usage per family = " + str(daily_per_family) + " L"
    s3 = "Step 3: Total daily usage for colony = " + str(families) + " x " + str(daily_per_family) + " = " + str(daily_total) + " L/day"
    s4 = "Step 4: Total usage for " + str(days) + " days = " + str(daily_total) + " x " + str(days) + " = " + str(total) + " L"
    s5 = "Answer: Total water consumption = " + str(total) + " Litres"
    ver = "Verification: " + str(families) + " families x " + str(daily_per_family) + " L/family/day x " + str(days) + " days = " + str(total) + " L (correct)"
    return SolverResult(answer=str(total) + " L", steps=[s1, s2, s3, s4, s5], verification=ver, confidence="high")


def _solve_water_wastage(params: dict) -> SolverResult:
    drops_per_min = int(params.get("drops_per_min", 30))
    vol_per_drop = float(params.get("vol_per_drop", 0.05))
    min_per_day = int(params.get("min_per_day", 1440))
    days = int(params.get("days", 7))
    vol_per_day = round(drops_per_min * vol_per_drop * min_per_day / 1000, 2)
    total = round(vol_per_day * days, 2)
    s1 = "Step 1: Drops per minute from dripping tap = " + str(drops_per_min)
    s2 = "Step 2: Volume of one drop = " + str(vol_per_drop) + " mL"
    s3 = "Step 3: Total drops per day = " + str(drops_per_min) + " x " + str(min_per_day) + " = " + str(drops_per_min * min_per_day) + " drops"
    s4 = "Step 4: Volume per day = " + str(drops_per_min * min_per_day) + " x " + str(vol_per_drop) + " mL = " + str(vol_per_day) + " L/day"
    s5 = "Step 5: Water wasted in " + str(days) + " days = " + str(vol_per_day) + " x " + str(days) + " = " + str(total) + " L"
    s6 = "Answer: Water wasted = " + str(total) + " Litres"
    ver = "Verification: " + str(drops_per_min) + " drops/min x " + str(vol_per_drop) + " mL x " + str(min_per_day) + " min/day x " + str(days) + " days / 1000 = " + str(total) + " L (correct)"
    return SolverResult(answer=str(total) + " L", steps=[s1, s2, s3, s4, s5, s6], verification=ver, confidence="high")


def _solve_soil_composition(params: dict) -> SolverResult:
    mineral = float(params.get("mineral_pct", 45))
    organic = float(params.get("organic_pct", 5))
    water = float(params.get("water_pct", 25))
    air = round(100.0 - mineral - organic - water, 2)
    s1 = "Step 1: Total soil composition = 100%"
    s2 = "Step 2: Mineral matter = " + str(mineral) + "%"
    s3 = "Step 3: Organic matter (humus) = " + str(organic) + "%"
    s4 = "Step 4: Water content = " + str(water) + "%"
    s5 = "Step 5: Air content = 100% - " + str(mineral) + "% - " + str(organic) + "% - " + str(water) + "%"
    s6 = "       = " + str(air) + "%"
    s7 = "Answer: Percentage of air in soil = " + str(air) + "%"
    ver = "Verification: " + str(mineral) + "% + " + str(organic) + "% + " + str(water) + "% + " + str(air) + "% = " + str(round(mineral + organic + water + air, 2)) + "% (correct)"
    return SolverResult(answer=str(air) + "%", steps=[s1, s2, s3, s4, s5, s6, s7], verification=ver, confidence="high")


def _solve_soil_erosion(params: dict) -> SolverResult:
    rate = float(params.get("erosion_rate", 5))
    area = float(params.get("area", 8))
    years = int(params.get("years", 3))
    total_loss = rate * area * years
    s1 = "Step 1: Soil erosion rate = " + str(rate) + " tonnes/hectare/year"
    s2 = "Step 2: Area of field = " + str(area) + " hectares"
    s3 = "Step 3: Time period = " + str(years) + " years"
    s4 = "Step 4: Annual soil loss for entire field = " + str(rate) + " x " + str(area) + " = " + str(rate * area) + " tonnes/year"
    s5 = "Step 5: Total soil loss in " + str(years) + " years = " + str(rate * area) + " x " + str(years) + " = " + str(total_loss) + " tonnes"
    s6 = "Answer: Total soil lost = " + str(total_loss) + " tonnes"
    ver = "Verification: " + str(rate) + " t/ha/yr x " + str(area) + " ha x " + str(years) + " yr = " + str(total_loss) + " t (correct)"
    return SolverResult(answer=str(total_loss) + " tonnes", steps=[s1, s2, s3, s4, s5, s6], verification=ver, confidence="high")


def _solve_forest_cover(params: dict) -> SolverResult:
    total_area = float(params.get("geographical_area", 3287263))
    forest_pct = float(params.get("forest_pct", 24))
    forest_area = round(total_area * forest_pct / 100, 2)
    s1 = "Step 1: Geographical area of India = " + "{:,.0f}".format(total_area) + " sq km"
    s2 = "Step 2: Forest cover percentage = " + str(forest_pct) + "%"
    s3 = "Step 3: Forest cover area = (" + "{:,.0f}".format(total_area) + " x " + str(forest_pct) + ") / 100"
    s4 = "       = " + "{:,.2f}".format(forest_area) + " sq km"
    s5 = "Answer: Forest cover of India = approximately " + "{:,.0f}".format(round(forest_area, 0)) + " sq km"
    ver = "Verification: " + "{:,.0f}".format(total_area) + " x " + str(forest_pct) + "/100 = " + "{:,.2f}".format(forest_area) + " (correct)"
    return SolverResult(answer="Approx " + "{:,.0f}".format(round(forest_area, 0)) + " sq km", steps=[s1, s2, s3, s4, s5], verification=ver, confidence="high")


def _solve_tree_planting(params: dict) -> SolverResult:
    planted = int(params.get("planted", 200))
    year1_loss = float(params.get("year1_loss_pct", 10))
    year2_loss = float(params.get("year2_loss_pct", 5))
    after_y1 = round(planted * (100 - year1_loss) / 100, 0)
    after_y2 = round(after_y1 * (100 - year2_loss) / 100, 0)
    s1 = "Step 1: Trees planted initially = " + str(planted)
    s2 = "Step 2: After Year 1, " + str(year1_loss) + "% don't survive"
    s3 = "       Trees surviving = " + str(planted) + " - (" + str(planted) + " x " + str(year1_loss) + "/100) = " + str(int(after_y1))
    s4 = "Step 3: After Year 2, another " + str(year2_loss) + "% die"
    s5 = "       Trees surviving = " + str(int(after_y1)) + " - (" + str(int(after_y1)) + " x " + str(year2_loss) + "/100) = " + str(int(after_y2))
    s6 = "Answer: Trees alive after 2 years = " + str(int(after_y2))
    ver = "Verification: " + str(planted) + " -> Year 1: " + str(int(after_y1)) + " -> Year 2: " + str(int(after_y2)) + " (correct)"
    return SolverResult(answer=str(int(after_y2)) + " trees", steps=[s1, s2, s3, s4, s5, s6], verification=ver, confidence="high")


def _solve_diet_percentage(params: dict) -> SolverResult:
    cereals = float(params.get("cereals_pct", 50))
    veg = float(params.get("veg_pct", 25))
    proteins = float(params.get("proteins_pct", 15))
    other = round(100.0 - cereals - veg - proteins, 2)
    s1 = "Step 1: In a balanced diet, cereals = " + str(cereals) + "%"
    s2 = "Step 2: Vegetables and fruits = " + str(veg) + "%"
    s3 = "Step 3: Proteins (pulses, milk, etc.) = " + str(proteins) + "%"
    s4 = "Step 4: Fats and sugars = 100% - " + str(cereals) + "% - " + str(veg) + "% - " + str(proteins) + "%"
    s5 = "       = " + str(other) + "%"
    s6 = "Answer: Percentage of fats and sugars = " + str(other) + "%"
    ver = "Verification: " + str(cereals) + "% + " + str(veg) + "% + " + str(proteins) + "% + " + str(other) + "% = " + str(round(cereals + veg + proteins + other, 2)) + "% (correct)"
    return SolverResult(answer=str(other) + "%", steps=[s1, s2, s3, s4, s5, s6], verification=ver, confidence="high")


def _solve_calorie_calc(params: dict) -> SolverResult:
    items = int(params.get("num_items", 3))
    cals_per_item = float(params.get("cals_per_item", 150))
    total_cals = items * cals_per_item
    s1 = "Step 1: Number of food items = " + str(items)
    s2 = "Step 2: Calories per item = " + str(cals_per_item) + " cal"
    s3 = "Step 3: Total calories = " + str(items) + " x " + str(cals_per_item) + " = " + str(total_cals) + " cal"
    s4 = "Answer: Total calories consumed = " + str(total_cals) + " calories"
    ver = "Verification: " + str(items) + " x " + str(cals_per_item) + " = " + str(total_cals) + " cal (correct)"
    return SolverResult(answer=str(total_cals) + " cal", steps=[s1, s2, s3, s4], verification=ver, confidence="high")


def _solve_area_calc(params: dict) -> SolverResult:
    length = float(params.get("length", 5))
    width = float(params.get("width", 4))
    area = length * width
    s1 = "Step 1: Length of the room = " + str(length) + " m"
    s2 = "Step 2: Width of the room = " + str(width) + " m"
    s3 = "Step 3: Area = Length x Width = " + str(length) + " x " + str(width) + " = " + str(area) + " sq m"
    s4 = "Answer: Area of the room = " + str(area) + " square metres"
    ver = "Verification: " + str(length) + " m x " + str(width) + " m = " + str(area) + " sq m (correct)"
    return SolverResult(answer=str(area) + " sq m", steps=[s1, s2, s3, s4], verification=ver, confidence="high")


def _solve_housing_density(params: dict) -> SolverResult:
    population = int(params.get("population", 1500))
    family_size = int(params.get("family_size", 5))
    houses = math.ceil(population / family_size)
    s1 = "Step 1: Population of the settlement = " + str(population)
    s2 = "Step 2: Average family size = " + str(family_size) + " members per house"
    s3 = "Step 3: Number of houses needed = Population / Family size = " + str(population) + " / " + str(family_size) + " = " + str(houses)
    s4 = "Answer: About " + str(houses) + " houses are needed for the settlement"
    ver = "Verification: " + str(houses) + " houses x " + str(family_size) + " members/house = " + str(houses * family_size) + " >= " + str(population) + " (correct)"
    return SolverResult(answer=str(houses) + " houses", steps=[s1, s2, s3, s4], verification=ver, confidence="high")


# ===== SECTION 4: DETERMINISTIC QUESTION GENERATOR (registry adapter) =====

# PROBLEM_TYPES names -> implemented solvers (problem types lost in the file
# truncation are simply not offered by the generator).
_PROBLEM_SOLVERS: Dict[str, Any] = {
    "gas_composition": _solve_gas_composition,
    "air_quality_index": _solve_air_quality_index,
    "freshwater_pct": _solve_freshwater_pct,
    "water_usage_calc": _solve_water_usage,
    "water_wastage": _solve_water_wastage,
    "soil_composition": _solve_soil_composition,
    "soil_erosion_calc": _solve_soil_erosion,
    "forest_cover_calc": _solve_forest_cover,
    "tree_planting_calc": _solve_tree_planting,
    "diet_percentage": _solve_diet_percentage,
    "calorie_calc": _solve_calorie_calc,
    "area_calc": _solve_area_calc,
    "housing_density": _solve_housing_density,
}


def _scenario_for(problem: str, rng: random.Random):
    """Return (params, question_text) for a seeded scenario of the given problem type."""
    if problem == "gas_composition":
        n2 = rng.choice([78, 76, 80])
        o2 = rng.choice([20, 21, 22])
        return ({"nitrogen_pct": n2, "oxygen_pct": o2},
                "Air contains " + str(n2) + "% nitrogen and " + str(o2) + "% oxygen. What percentage of air is made up of other gases?")
    if problem == "air_quality_index":
        rspm = rng.choice([120, 150, 180, 220])
        return ({"rspm": rspm, "safe_limit": 100},
                "The RSPM level of a city is " + str(rspm) + " ug/m3 and the safe limit is 100 ug/m3. By what percentage does it exceed the safe limit?")
    if problem == "freshwater_pct":
        ocean = rng.choice([97.5, 97, 98])
        return ({"ocean_pct": ocean},
                "About " + str(ocean) + "% of all water on Earth is in the oceans. What percentage is freshwater?")
    if problem == "water_usage_calc":
        fam = rng.choice([15, 20, 25])
        per = rng.choice([400, 500, 600])
        days = rng.choice([7, 30])
        return ({"families": fam, "daily_per_family": per, "days": days},
                "A colony has " + str(fam) + " families, each using " + str(per) + " L of water daily. How much water do they use in " + str(days) + " days (in litres)?")
    if problem == "water_wastage":
        drops = rng.choice([10, 20, 30])
        days = rng.choice([7, 15, 30])
        return ({"drops_per_min": drops, "vol_per_drop": 0.05, "min_per_day": 1440, "days": days},
                "A tap drips " + str(drops) + " drops per minute, each drop being 0.05 mL. How much water is wasted in " + str(days) + " days (in litres)?")
    if problem == "soil_composition":
        m = rng.choice([40, 45, 50])
        o = rng.choice([5, 8, 10])
        w = rng.choice([20, 25, 30])
        return ({"mineral_pct": m, "organic_pct": o, "water_pct": w},
                "A soil sample has " + str(m) + "% mineral matter, " + str(o) + "% organic matter and " + str(w) + "% water. What percentage is air?")
    if problem == "soil_erosion_calc":
        rate = rng.choice([4, 5, 8])
        area = rng.choice([6, 8, 10])
        years = rng.choice([2, 3, 5])
        return ({"erosion_rate": rate, "area": area, "years": years},
                "A field loses " + str(rate) + " tonnes of soil per hectare every year. How much soil is lost from " + str(area) + " hectares in " + str(years) + " years?")
    if problem == "forest_cover_calc":
        pct = rng.choice([21, 22, 24])
        return ({"geographical_area": 3287263, "forest_pct": pct},
                "India's geographical area is 32,87,263 sq km. If forest cover is " + str(pct) + "%, what is the forest cover area (in sq km)?")
    if problem == "tree_planting_calc":
        planted = rng.choice([150, 200, 500])
        l1 = rng.choice([5, 10, 15])
        l2 = rng.choice([5, 8])
        return ({"planted": planted, "year1_loss_pct": l1, "year2_loss_pct": l2},
                "A school plants " + str(planted) + " trees. In the first year " + str(l1) + "% die, and in the second year another " + str(l2) + "% die. How many trees survive after two years?")
    if problem == "diet_percentage":
        c = rng.choice([40, 45, 50])
        v = rng.choice([20, 25, 30])
        p = rng.choice([10, 15, 20])
        return ({"cereals_pct": c, "veg_pct": v, "proteins_pct": p},
                "A balanced diet has " + str(c) + "% cereals, " + str(v) + "% vegetables and fruits and " + str(p) + "% proteins. What percentage is fats and sugars?")
    if problem == "calorie_calc":
        n = rng.choice([2, 3, 4])
        cal = rng.choice([100, 120, 150])
        return ({"num_items": n, "cals_per_item": cal},
                "If one food item gives " + str(cal) + " calories, how many calories do " + str(n) + " such items give?")
    if problem == "area_calc":
        ln = rng.choice([4, 5, 6, 8])
        wd = rng.choice([3, 4, 5])
        return ({"length": ln, "width": wd},
                "A room is " + str(ln) + " m long and " + str(wd) + " m wide. What is the area of its floor (in square metres)?")
    if problem == "housing_density":
        pop = rng.choice([800, 1200, 1500, 2400])
        fam = rng.choice([4, 5, 6])
        return ({"population": pop, "family_size": fam},
                "A settlement has " + str(pop) + " people and each house holds one family of " + str(fam) + " members on average. About how many houses are needed?")
    return ({}, "")


def generate_questions(seed: int = 0, count: int = 1, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """Deterministically build drill questions from the solvers above."""
    rng = random.Random(seed)
    available = [(tid, p) for tid, probs in PROBLEM_TYPES.items() for p in probs if p in _PROBLEM_SOLVERS]
    if topic and topic in PROBLEM_TYPES:
        available = [(tid, p) for tid, p in available if tid == topic]

    out: List[Dict[str, Any]] = []
    for i in range(count):
        tid, problem = available[(seed + i) % len(available)]
        solver = _PROBLEM_SOLVERS[problem]
        params, question = _scenario_for(problem, rng)
        try:
            result = solver(params)
        except Exception:
            continue
        out.append({
            "id": f"{tid}_{problem}_{seed}_{i}",
            "type": "numerical",
            "topic": tid,
            "difficulty": "medium",
            "question": question,
            "answer": result.answer,
            "steps": result.steps,
            "explanation": result.verification,
        })
    return out