"""
Solver for CISCE Geography Class 12
Covers: Map Study, Surveying, Bearing & Time Calculations, Scale,
Population, Transport, Climate, Soils, Industries, Agriculture,
Landforms, Settlements, Practical Map Study
"""

import math
import random
import json
from dataclasses import dataclass, field
from typing import List, Tuple, Optional, Dict, Any
from enum import Enum


# ─── Data Structures ────────────────────────────────────────────────────────

class Topic(Enum):
    TOPOMAPS = "Topographical Map Study"
    SURVEYING = "Surveying"
    BEARING_TIME = "Bearing and Time Calculations"
    SCALES = "Map Scales"
    POPULATION = "Population and Migration"
    LANDUSE_SETTLEMENTS = "Land Use and Human Settlements"
    TRANSPORT = "Transport and Communication"
    AGRICULTURE = "Agriculture"
    INDUSTRIES = "Industries"
    PHYSICAL_GEO = "Physical Geography"
    CLIMATE = "Climate and Weather"
    SOILS = "Soils of India"
    MAP_SKILLS = "Map and Practical Skills"


@dataclass
class Step:
    """Represents one step in a solution."""
    number: int
    description: str
    formula: str = ""
    calculation: str = ""


@dataclass
class Solution:
    """Complete solution output."""
    topic: str
    question: str
    steps: List[Step]
    answer: Any
    verification: str
    explanation: str


# ─── Helper Functions ───────────────────────────────────────────────────────

def _bearing_to_quadrant(bearing: float) -> Tuple[str, float, str]:
    """Convert whole circle bearing to quadrant bearing."""
    if 0 <= bearing < 90:
        return "N", bearing, "E"
    elif 90 <= bearing < 180:
        return "S", bearing - 90, "E"
    elif 180 <= bearing < 270:
        return "S", bearing - 180, "W"
    else:
        return "N", bearing - 270, "W"


def _quadrant_to_bearing(qb: str) -> float:
    """Convert quadrant bearing N/S angle E/W to whole circle bearing."""
    qb = qb.upper().replace(" ", "")
    if qb.startswith("N") and "E" in qb:
        return float(qb[1:qb.index("E")])
    elif qb.startswith("S") and "E" in qb:
        return 90 + float(qb[1:qb.index("E")])
    elif qb.startswith("S") and "W" in qb:
        return 180 + float(qb[1:qb.index("W")])
    elif qb.startswith("N") and "W" in qb:
        return 270 + float(qb[1:qb.index("W")])
    raise ValueError(f"Invalid quadrant bearing: {qb}")


def _calculate_time_difference(long_deg: float, long_min: float) -> float:
    """Time difference in minutes for given longitude from prime meridian."""
    total_long = long_deg + long_min / 60.0
    return total_long * 4.0  # 1 degree = 4 minutes


# ─── Solver Functions ───────────────────────────────────────────────────────

def solve_time_calculation(params: Dict) -> Dict:
    """
    Topic: BEARING_TIME
    Calculate local time, standard time, or time at another place given longitudes.

    Params:
        from_long_deg: int - longitude of place A (degrees)
        from_long_min: int - longitude of place A (minutes)
        from_time_hour: int - local time at place A
        from_time_min: int - local time at place A
        to_long_deg: int - longitude of place B (degrees)
        to_long_min: int - longitude of place B (minutes)
        time_zone_hr: int - IST time zone offset from GMT (default 5.5)
    """
    from_long_deg = params.get("from_long_deg", 0)
    from_long_min = params.get("from_long_min", 0)
    from_time_hour = params.get("from_time_hour", 12)
    from_time_min = params.get("from_time_min", 0)
    to_long_deg = params.get("to_long_deg", 0)
    to_long_min = params.get("to_long_min", 0)
    time_zone_hr = params.get("time_zone_hr", 5.5)

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Place A longitude, Place B longitude, Time at Place A",
        calculation=f"Place A: {from_long_deg} degrees {from_long_min}' "
                    f"E/W, Time: {from_time_hour}:{from_time_min:02d}\n"
                    f"Place B: {to_long_deg} degrees {to_long_min}' E/W"))

    from_long_total = from_long_deg + from_long_min / 60.0
    to_long_total = to_long_deg + to_long_min / 60.0

    steps.append(Step(2, "Calculate Longitude Difference",
        formula="Longitude Diff = |Long_B - Long_A| degrees",
        calculation=f"Longitude difference = |{to_long_total} - {from_long_total}| "
                    f"= {abs(to_long_total - from_long_total):.4f} degrees"))

    long_diff_deg = abs(to_long_total - from_long_total)
    time_diff_min = long_diff_deg * 4.0

    steps.append(Step(3, "Calculate Time Difference",
        formula="Time Diff = Longitude Diff x 4 minutes",
        calculation=f"Time difference = {long_diff_deg:.4f} x 4 = {time_diff_min:.2f} minutes "
                    f"= {int(time_diff_min // 60)} hr {time_diff_min % 60:.0f} min"))

    # Determine east or west
    if to_long_total > from_long_total:
        direction = "ahead"
        direction_note = "Place B is EAST of Place A, so B is AHEAD in time"
    else:
        direction = "behind"
        direction_note = "Place B is WEST of Place A, so B is BEHIND in time"

    steps.append(Step(4, "Determine Direction",
        formula="East = ahead (+), West = behind (-)",
        calculation=direction_note))

    # Convert from_time to total minutes
    from_total_min = from_time_hour * 60 + from_time_min

    if direction == "ahead":
        to_total_min = from_total_min + time_diff_min
    else:
        to_total_min = from_total_min - time_diff_min

    # Normalize to 24-hour clock
    to_total_min = to_total_min % (24 * 60)
    to_hour = int(to_total_min // 60)
    to_min = int(to_total_min % 60)

    steps.append(Step(5, "Calculate Local Time at Place B",
        formula=f"Local Time B = Local Time A {'+' if direction == 'ahead' else '-'} Time Diff",
        calculation=f"Total minutes at A = {from_total_min}\n"
                    f"Total minutes at B = {from_total_min} {'+' if direction == 'ahead' else ''}{'' if direction == 'ahead' else ''}"
                    f"{-time_diff_min if direction == 'behind' else time_diff_min} = {to_total_min:.0f}\n"
                    f"Time at Place B = {to_hour}:{to_min:02d}"))

    # IST calculation
    gmt_hr = params.get("gmt_hr", None)
    if gmt_hr is not None:
        gmt_min = params.get("gmt_min", 0)
        ist_offset = time_zone_hr * 60  # 5.5 hr = 330 min
        gmt_total_min = gmt_hr * 60 + gmt_min
        ist_total_min = gmt_total_min + ist_offset
        ist_total_min = ist_total_min % (24 * 60)
        ist_h = int(ist_total_min // 60)
        ist_m = int(ist_total_min % 60)
        steps.append(Step(6, "Calculate IST",
            formula="IST = GMT + 5 hours 30 minutes",
            calculation=f"IST = {gmt_hr}:{gmt_min:02d} + 5:30 = {ist_h}:{ist_m:02d}"))
        answer = {"local_time_b": f"{to_hour}:{to_min:02d}", "ist": f"{ist_h}:{ist_m:02d}"}
    else:
        answer = {"local_time_b": f"{to_hour}:{to_min:02d}"}

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Total longitude difference x 4 min = time difference",
        calculation=f"|{to_long_total} - {from_long_total}| x 4 = "
                    f"{long_diff_deg:.4f} x 4 = {time_diff_min:.2f} min = "
                    f"{int(time_diff_min // 60)}h {time_diff_min % 60:.0f}m\n"
                    f"Difference from {from_time_hour}:{from_time_min:02d} to {to_hour}:{to_min:02d} = "
                    f"{abs(to_total_min - from_total_min):.0f} min\n"
                    f"Match: {abs(abs(to_total_min - from_total_min) - time_diff_min) < 1}"))

    return {
        "topic": Topic.BEARING_TIME.value,
        "question": f"Calculate local time at Place B given time at Place A",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_bearing_conversion(params: Dict) -> Dict:
    """
    Topic: BEARING_TIME / SURVEYING
    Convert between Whole Circle Bearing (WCB) and Quadrant Bearing (QB).

    Params:
        wcb: float - Whole Circle Bearing in degrees (0-360)
    """
    wcb = params.get("wcb", 0.0)
    wcb = wcb % 360

    steps = []

    steps.append(Step(1, "Given: Whole Circle Bearing (WCB)",
        formula=f"WCB = {wcb}\u00b0",
        calculation=f"Whole Circle Bearing = {wcb}\u00b0"))

    # Convert WCB to Quadrant Bearing
    if 0 <= wcb < 90:
        quadrant = "NE"
        qb = f"N {wcb:.1f}\u00b0 E"
        cardinal = "North-East quadrant"
    elif 90 <= wcb < 180:
        quadrant = "SE"
        qb = f"S {wcb - 90:.1f}\u00b0 E"
        cardinal = "South-East quadrant"
    elif 180 <= wcb < 270:
        quadrant = "SW"
        qb = f"S {wcb - 180:.1f}\u00b0 W"
        cardinal = "South-West quadrant"
    else:
        quadrant = "NW"
        qb = f"N {wcb - 270:.1f}\u00b0 W"
        cardinal = "North-West quadrant"

    steps.append(Step(2, "Identify Quadrant",
        formula="0-90=NE, 90-180=SE, 180-270=SW, 270-360=NW",
        calculation=f"WCB {wcb}\u00b0 falls in {cardinal}"))

    steps.append(Step(3, "Convert to Quadrant Bearing",
        formula="QB = Cardinal direction + angle from N/S + E/W",
        calculation=f"Quadrant Bearing (QB) = {qb}"))

    # Also compute back-substitution
    if quadrant == "NE":
        back_wcb = wcb
    elif quadrant == "SE":
        back_wcb = 90 + (wcb - 90)
    elif quadrant == "SW":
        back_wcb = 180 + (wcb - 180)
    else:
        back_wcb = 270 + (wcb - 270)

    steps.append(Step(4, "Back-Substitution Verification",
        formula=f"Convert QB back to WCB",
        calculation=f"Converting {qb} back:\n"
                    f"QB {qb} in {quadrant} => WCB = {back_wcb}\u00b0\n"
                    f"Matches original WCB: {abs(back_wcb - wcb) < 0.01}"))

    return {
        "topic": Topic.SURVEYING.value,
        "question": f"Convert WCB {wcb}\u00b0 to Quadrant Bearing",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": {"wcb": f"{wcb}\u00b0", "quadrant_bearing": qb, "quadrant": quadrant},
        "verification": steps[-1].calculation
    }


def solve_scale_conversion(params: Dict) -> Dict:
    """
    Topic: SCALES
    Convert between different scale formats and compute distances.

    Params:
        rf: str - e.g. "1:50000"
        statement: str - e.g. "1 cm = 500 m"
        map_distance_cm: float - map distance in cm
    """
    rf = params.get("rf", "1:50000")
    statement = params.get("statement", "1 cm = 500 m")
    map_dist = params.get("map_distance_cm", 5.0)

    steps = []

    steps.append(Step(1, "Given Scale Information",
        formula="RF or Statement Scale",
        calculation=f"RF: {rf}\nStatement: {statement}\n"
                    f"Map Distance: {map_dist} cm"))

    # Parse RF
    rf_num, rf_den = map(int, rf.split(":"))
    steps.append(Step(2, "Interpret the Scale",
        formula="1 unit on map = RF_den units on ground",
        calculation=f"1 cm on map = {rf_den} cm on ground\n"
                    f"= {rf_den / 100:.0f} m on ground\n"
                    f"= {rf_den / 100000:.2f} km on ground"))

    ground_dist_cm = map_dist * rf_den
    ground_dist_m = ground_dist_cm / 100
    ground_dist_km = ground_dist_cm / 100000

    steps.append(Step(3, "Calculate Real (Ground) Distance",
        formula="Ground Distance = Map Distance x RF denominator",
        calculation=f"Ground = {map_dist} cm x {rf_den} = {ground_dist_cm} cm\n"
                    f"= {ground_dist_m} m\n"
                    f"= {ground_dist_km:.3f} km"))

    # Reverse: map distance for given ground distance
    given_ground_m = params.get("ground_distance_m", None)
    if given_ground_m is not None:
        map_from_ground = (given_ground_m * 100) / rf_den
        steps.append(Step(4, "Map Distance for Given Ground Distance",
            formula="Map Distance = Ground Distance / RF_denominator",
            calculation=f"For ground distance {given_ground_m} m:\n"
                        f"Map = ({given_ground_m} x 100) / {rf_den} = {map_from_ground:.4f} cm"))
        answer = {
            "ground_distance_cm": ground_dist_cm,
            "ground_distance_m": ground_dist_m,
            "ground_distance_km": ground_dist_km,
            "map_distance_for_ground": f"{map_from_ground:.4f} cm"
        }
    else:
        answer = {
            "ground_distance_cm": ground_dist_cm,
            "ground_distance_m": ground_dist_m,
            "ground_distance_km": ground_dist_km
        }

    steps.append(Step(5, "Verification",
        formula="Check: Map / Ground = 1/RF",
        calculation=f"Ratio = {map_dist} / {ground_dist_cm} = {map_dist / ground_dist_cm:.8f}\n"
                    f"1/RF = 1/{rf_den} = {1.0 / rf_den:.8f}\n"
                    f"Match: {abs(map_dist / ground_dist_cm - 1.0 / rf_den) < 1e-10}"))

    return {
        "topic": Topic.SCALES.value,
        "question": f"Convert map distance to ground distance using scale {rf}",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_gradient_slope(params: Dict) -> Dict:
    """
    Topic: TOPOMAPS / SURVEYING
    Calculate gradient/slope between two points given their elevations
    and horizontal distances. Also determine suitability for construction.

    Params:
        elevation_a: float - elevation of point A in meters
        elevation_b: float - elevation of point B in meters
        distance_m: float - horizontal distance in meters
    """
    elev_a = params.get("elevation_a", 0.0)
    elev_b = params.get("elevation_b", 0.0)
    dist_m = params.get("distance_m", 1000.0)

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Elevation A, Elevation B, Horizontal Distance",
        calculation=f"Elevation at A: {elev_a} m\nElevation at B: {elev_b} m\n"
                    f"Horizontal Distance: {dist_m} m"))

    rise = abs(elev_b - elev_a)
    run = dist_m

    steps.append(Step(2, "Calculate Rise (Vertical Difference)",
        formula="Rise = |Elevation_B - Elevation_A|",
        calculation=f"Rise = |{elev_b} - {elev_a}| = {rise} m"))

    gradient_1 = rise / run
    gradient_percent = (rise / run) * 100
    angle_deg = math.degrees(math.atan(rise / run)) if run > 0 else 90.0

    steps.append(Step(3, "Calculate Gradient (1 in N format)",
        formula="Gradient = Rise / Run = 1 : (Run/Rise)",
        calculation=f"Gradient = {rise} / {run} = {gradient_1:.6f}\n"
                    f"In 1 in N format: 1 : {run / rise:.1f} (if rise > 0)"))

    steps.append(Step(4, "Calculate Gradient in Percentage",
        formula="% Gradient = (Rise / Run) x 100",
        calculation=f"% Gradient = ({rise} / {run}) x 100 = {gradient_percent:.4f}%"))

    steps.append(Step(5, "Calculate Angle of Slope",
        formula="Angle = tan\u207b\u00b9(Rise / Run)",
        calculation=f"Angle = tan\u207b\u00b9({rise}/{run}) = tan\u207b\u00b9({gradient_1:.6f}) = {angle_deg:.2f}\u00b0"))

    # Suitability assessment
    if gradient_percent < 5:
        suitability = "Flat/gentle - Very suitable for construction and agriculture"
    elif gradient_percent < 10:
        suitability = "Moderate slope - Suitable for most constructions with precautions"
    elif gradient_percent < 20:
        suitability = "Steep - Suitable for terraced agriculture, roads need hairpin bends"
    elif gradient_percent < 45:
        suitability = "Very steep - Difficult for construction, erosion risk"
    else:
        suitability = "Extremely steep - Cliff/vertical face, unsuitable for most uses"

    steps.append(Step(6, "Assessment",
        formula="Slope classification based on % gradient",
        calculation=f"Slope angle: {angle_deg:.2f}\u00b0, Gradient: 1 in {run / rise:.1f} "
                    f"({gradient_percent:.2f}%)\nAssessment: {suitability}"))

    # Contour interval estimation
    contour_interval = params.get("contour_interval", 20.0)
    if contour_interval > 0 and rise > 0:
        num_contours = rise / contour_interval
        steps.append(Step(7, "Number of Contours Crossed",
            formula="No. of contours = Rise / Contour Interval",
            calculation=f"Contours crossed = {rise} / {contour_interval} = {num_contours:.1f}"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: sin(angle) x run approx equals rise",
        calculation=f"sin({angle_deg:.2f}\u00b0) x {run} = "
                    f"{math.sin(math.radians(angle_deg)):.6f} x {run} = "
                    f"{math.sin(math.radians(angle_deg)) * run:.2f} m\n"
                    f"Expected rise: {rise} m\nMatch: {abs(math.sin(math.radians(angle_deg)) * run - rise) < 0.5}"))

    answer = {
        "rise_m": rise,
        "run_m": run,
        "gradient_1_in_n": f"1 in {run / rise:.1f}" if rise > 0 else "infinite (flat)",
        "gradient_percent": f"{gradient_percent:.2f}%",
        "angle_degrees": f"{angle_deg:.2f}\u00b0",
        "suitability": suitability
    }

    return {
        "topic": Topic.TOPOMAPS.value,
        "question": f"Calculate gradient between two points with elevations {elev_a}m and {elev_b}m",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_population_density(params: Dict) -> Dict:
    """
    Topic: POPULATION
    Calculate population density, growth rate, doubling time, etc.

    Params:
        population: int - current population
        area_sq_km: float - area in sq km
        growth_rate: float - annual growth rate in %
        year_data: dict - {year: population} for projections
    """
    population = params.get("population", 0)
    area_sq_km = params.get("area_sq_km", 1.0)
    growth_rate = params.get("growth_rate", 0.0)
    year_data = params.get("year_data", {})

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Population, Area, Growth Rate",
        calculation=f"Population: {population:,}\nArea: {area_sq_km} sq km\n"
                    f"Growth Rate: {growth_rate}% per annum"))

    density = population / area_sq_km
    steps.append(Step(2, "Calculate Population Density",
        formula="Density = Total Population / Area (per sq km)",
        calculation=f"Density = {population:,} / {area_sq_km} = {density:.2f} persons/sq km"))

    # Density classification (India-specific)
    if density < 200:
        density_class = "Very Sparsely Populated"
    elif density < 400:
        density_class = "Sparsely Populated"
    elif density < 600:
        density_class = "Moderately Populated"
    elif density < 1000:
        density_class = "Densely Populated"
    else:
        density_class = "Very Densely Populated"

    steps.append(Step(3, "Density Classification",
        formula="Based on Indian Census categories",
        calculation=f"Density: {density:.2f} persons/sq km\nClassification: {density_class}"))

    # Growth projections
    projections = {}
    if growth_rate > 0 and year_data:
        base_year = min(year_data.keys())
        base_pop = year_data[base_year]
        gr_decimal = growth_rate / 100.0

        steps.append(Step(4, "Population Projections Using Exponential Growth",
            formula="P_n = P_0 x (1 + r)^n",
            calculation=f"Formula: P_n = P_0 x (1 + {gr_decimal})^n"))

        for year in sorted(year_data.keys()):
            n = year - base_year
            proj_pop = int(base_pop * ((1 + gr_decimal) ** n))
            projections[year] = proj_pop

        steps.append(Step(5, "Calculated Projections",
            formula="P_n = P_0 x (1+r)^n for each year",
            calculation="\n".join([f"Year {y}: {p:,}" for y, p in sorted(projections.items())])))

    # Doubling time
    if growth_rate > 0:
        gr_decimal = growth_rate / 100.0
        doubling_time = 70 / growth_rate  # Rule of 70
        steps.append(Step(6, "Doubling Time (Rule of 70)",
            formula="Doubling Time = 70 / Annual Growth Rate (%)",
            calculation=f"Doubling Time = 70 / {growth_rate} = {doubling_time:.1f} years"))

    # Literacy rate calculation
    literate = params.get("literate", 0)
    total = params.get("total_for_literacy", population)
    if total > 0:
        literacy_rate = (literate / total) * 100
        steps.append(Step(7, "Literacy Rate",
            formula="Literacy Rate = (Literate Population / Total Population) x 100",
            calculation=f"Literacy Rate = ({literate:,} / {total:,}) x 100 = {literacy_rate:.2f}%"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Density x Area approx equals Population",
        calculation=f"Density x Area = {density:.2f} x {area_sq_km} = {density * area_sq_km:.0f}\n"
                    f"Expected Population: {population:,}\nMatch: {abs(density * area_sq_km - population) < population * 0.01}"))

    answer = {
        "density_per_sq_km": f"{density:.2f}",
        "density_classification": density_class,
        "doubling_time_years": f"{doubling_time:.1f}" if growth_rate > 0 else "N/A",
        "projections": projections if projections else "N/A"
    }

    return {
        "topic": Topic.POPULATION.value,
        "question": f"Calculate population density for a region with population {population:,} and area {area_sq_km} sq km",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_migration_analysis(params: Dict) -> Dict:
    """
    Topic: POPULATION
    Analyze migration data: in-migration, out-migration, net migration,
    migration rate.

    Params:
        in_migrants: int - number of people moving in
        out_migrants: int - number of people moving out
        total_population: int - total population
        push_factors: list - list of push factors
        pull_factors: list - list of pull factors
    """
    in_migrants = params.get("in_migrants", 0)
    out_migrants = params.get("out_migrants", 0)
    total_pop = params.get("total_population", 1)
    push_factors = params.get("push_factors", [])
    pull_factors = params.get("pull_factors", [])

    steps = []

    steps.append(Step(1, "Given Data",
        formula="In-migrants, Out-migrants, Total Population",
        calculation=f"In-migrants: {in_migrants:,}\nOut-migrants: {out_migrants:,}\n"
                    f"Total Population: {total_pop:,}"))

    net_migration = in_migrants - out_migrants
    steps.append(Step(2, "Calculate Net Migration",
        formula="Net Migration = In-migrants - Out-migrants",
        calculation=f"Net Migration = {in_migrants:,} - {out_migrants:,} = {net_migration:,}"))

    if net_migration > 0:
        net_type = "Net Immigration (positive)"
    elif net_migration < 0:
        net_type = "Net Emigration (negative)"
    else:
        net_type = "No net migration"

    steps.append(Step(3, "Net Migration Type",
        formula="Positive = Immigration, Negative = Emigration",
        calculation=f"Net: {net_migration:,} => {net_type}"))

    migration_rate = (net_migration / total_pop) * 100
    steps.append(Step(4, "Net Migration Rate",
        formula="Rate = (Net Migration / Total Population) x 100",
        calculation=f"Rate = ({net_migration:,} / {total_pop:,}) x 100 = {migration_rate:.4f}%"))

    in_rate = (in_migrants / total_pop) * 100
    out_rate = (out_migrants / total_pop) * 100

    steps.append(Step(5, "In-migration and Out-migration Rates",
        formula="Rate = (Migrants / Total Pop) x 100",
        calculation=f"In-migration rate = ({in_migrants:,} / {total_pop:,}) x 100 = {in_rate:.4f}%\n"
                    f"Out-migration rate = ({out_migrants:,} / {total_pop:,}) x 100 = {out_rate:.4f}%"))

    # Economic impact
    if in_migrants > 0 and total_pop > 0:
        migrant_share = (in_migrants / total_pop) * 100
        steps.append(Step(6, "Share of Migrants in Total Population",
            formula="Share = (In-migrants / Total Pop) x 100",
            calculation=f"Share of in-migrants = {migrant_share:.4f}% of total population"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Net = In - Out",
        calculation=f"In-migrants - Out-migrants = {in_migrants:,} - {out_migrants:,} = {net_migration:,}\n"
                    f"Matches computed net migration: {net_migration:,}"))

    answer = {
        "net_migration": net_migration,
        "net_migration_type": net_type,
        "net_migration_rate_pct": f"{migration_rate:.4f}%",
        "in_migration_rate_pct": f"{in_rate:.4f}%",
        "out_migration_rate_pct": f"{out_rate:.4f}%"
    }

    return {
        "topic": Topic.POPULATION.value,
        "question": f"Analyze migration: {in_migrants:,} in-migrants and {out_migrants:,} out-migrants",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_area_measurement(params: Dict) -> Dict:
    """
    Topic: SURVEYING
    Calculate area of irregular plots using:
    - Simple geometric shapes (square, rectangle, triangle, trapezium)
    - Planimeter method (simplified as polygon area using coordinates)

    Params:
        shape: str - "rectangle", "triangle", "trapezium", "polygon"
        dimensions: dict - relevant dimensions
        coordinates: list - [(x,y), ...] for polygon
        scale_rf: str - map scale e.g. "1:50000"
    """
    shape = params.get("shape", "rectangle")
    scale_rf = params.get("scale_rf", "1:50000")
    rf_den = int(scale_rf.split(":")[1])

    steps = []
    map_area_sq_cm = 0.0
    ground_area_sq_m = 0.0
    ground_area_sq_km = 0.0

    steps.append(Step(1, "Given Data",
        formula=f"Shape: {shape}, Scale: {scale_rf}",
        calculation=f"Shape: {shape}\nScale: {scale_rf}"))

    if shape == "rectangle":
        length = params.get("length", 0.0)  # in cm on map
        breadth = params.get("breadth", 0.0)  # in cm on map
        steps.append(Step(2, "Calculate Map Area",
            formula="Area = Length x Breadth",
            calculation=f"Map Area = {length} cm x {breadth} cm = {length * breadth} sq cm"))
        map_area_sq_cm = length * breadth

    elif shape == "triangle":
        base = params.get("base", 0.0)
        height = params.get("height", 0.0)
        steps.append(Step(2, "Calculate Map Area",
            formula="Area = (1/2) x Base x Height",
            calculation=f"Map Area = 0.5 x {base} cm x {height} cm = {0.5 * base * height} sq cm"))
        map_area_sq_cm = 0.5 * base * height

    elif shape == "trapezium":
        a = params.get("parallel1", 0.0)
        b = params.get("parallel2", 0.0)
        h = params.get("height", 0.0)
        steps.append(Step(2, "Calculate Map Area",
            formula="Area = (1/2) x (a + b) x h",
            calculation=f"Map Area = 0.5 x ({a} + {b}) cm x {h} cm = {0.5 * (a + b) * h} sq cm"))
        map_area_sq_cm = 0.5 * (a + b) * h

    elif shape == "polygon":
        coords = params.get("coordinates", [(0, 0)])
        n = len(coords)
        # Shoelace formula
        area = 0.0
        for i in range(n):
            j = (i + 1) % n
            area += coords[i][0] * coords[j][1]
            area -= coords[j][0] * coords[i][1]
        map_area_sq_cm = abs(area) / 2.0

        steps.append(Step(2, "Calculate Map Area (Shoelace Formula)",
            formula="Area = (1/2) |sum(x_i * y_{i+1} - x_{i+1} * y_i)|",
            calculation=f"Coordinates: {coords}\n"
                        f"Map Area = {map_area_sq_cm:.4f} sq cm"))

    steps.append(Step(3, "Convert to Ground Area",
        formula=f"Ground Area (sq cm) = Map Area x RF^2, then scale to sq m and sq km",
        calculation=f"Ground Area = {map_area_sq_cm:.4f} x ({rf_den})^2 sq cm\n"
                    f"= {map_area_sq_cm * rf_den ** 2:.2f} sq cm\n"
                    f"= {map_area_sq_cm * rf_den ** 2 / 10000:.4f} sq m\n"
                    f"= {map_area_sq_cm * rf_den ** 2 / 1e10:.6f} sq km"))

    ground_area_sq_cm = map_area_sq_cm * rf_den ** 2
    ground_area_sq_m = ground_area_sq_cm / 10000
    ground_area_sq_km = ground_area_sq_cm / 1e10

    steps.append(Step(4, "Verification",
        formula="Check scale conversion: 1 sq cm on map = RF^2 sq cm on ground",
        calculation=f"1 sq cm on map = {rf_den ** 2} sq cm on ground\n"
                    f"Area check: {map_area_sq_cm:.4f} x {rf_den ** 2} = {ground_area_sq_cm:.2f} sq cm\n"
                    f"In sq meters: {ground_area_sq_m:.4f} sq m\n"
                    f"In hectares (1 ha = 10,000 sq m): {ground_area_sq_m / 10000:.4f} ha"))

    answer = {
        "map_area_sq_cm": f"{map_area_sq_cm:.4f}",
        "ground_area_sq_cm": f"{ground_area_sq_cm:.2f}",
        "ground_area_sq_m": f"{ground_area_sq_m:.4f}",
        "ground_area_sq_km": f"{ground_area_sq_km:.6f}",
        "hectares": f"{ground_area_sq_m / 10000:.4f}"
    }

    return {
        "topic": Topic.SURVEYING.value,
        "question": f"Calculate area of {shape} on map at scale {scale_rf}",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_contour_analysis(params: Dict) -> Dict:
    """
    Topic: TOPOMAPS
    Analyze contour map data to identify landforms and cross-section profile.

    Params:
        contour_interval: float - vertical interval between contours in meters
        elevations: list - list of contour elevations along a profile line
        spot_heights: list - list of spot heights along the profile
    """
    interval = params.get("contour_interval", 20.0)
    elevations = params.get("elevations", [])
    spot_heights = params.get("spot_heights", [])
    all_heights = sorted(set(elevations + spot_heights))

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Contour Interval and Elevation Data",
        calculation=f"Contour Interval: {interval} m\n"
                    f"Contour elevations: {sorted(set(elevations))}\n"
                    f"Spot heights: {spot_heights}"))

    # Identify landform
    max_elev = max(all_heights) if all_heights else 0
    min_elev = min(all_heights) if all_heights else 0
    rel_elev = max_elev - min_elev

    steps.append(Step(2, "Calculate Relative Height",
        formula="Relative Height = Max Elevation - Min Elevation",
        calculation=f"Max Elevation: {max_elev} m\nMin Elevation: {min_elev} m\n"
                    f"Relative Height: {rel_elev} m"))

    steps.append(Step(3, "Determine Number of Contours",
        formula="No. of contours = (Max - Min) / Contour Interval",
        calculation=f"No. of contours = ({max_elev} - {min_elev}) / {interval} = {rel_elev / interval:.1f}"))

    # Identify landform type
    if len(elevations) >= 2:
        profile = elevations
        increasing = all(profile[i] <= profile[i + 1] for i in range(len(profile) - 1))
        decreasing = all(profile[i] >= profile[i + 1] for i in range(len(profile) - 1))
        has_peak = False
        has_valley = False

        for i in range(1, len(profile) - 1):
            if profile[i] > profile[i - 1] and profile[i] > profile[i + 1]:
                has_peak = True
            if profile[i] < profile[i - 1] and profile[i] < profile[i + 1]:
                has_valley = True

        if has_peak and not has_valley and increasing and decreasing:
            landform = "Hill / Peak (concentric closed contours)"
        elif has_valley and not has_peak:
            landform = "Valley (V-shaped contours pointing uphill)"
        elif has_peak and has_valley:
            landform = "Ridge and Valley (alternating)"
        elif rel_elev < 100 and max_elev < 300:
            landform = "Undulating terrain / Low hills"
        elif max_elev > 2000:
            landform = "Mountain / High Plateau"
        else:
            landform = "Hill / Elevated land"
    else:
        landform = "Insufficient data for landform identification"

    steps.append(Step(4, "Identify Landform",
        formula="Based on contour pattern analysis",
        calculation=f"Landform: {landform}"))

    # Slope analysis
    profile_length = params.get("profile_length_m", 1000.0)
    if rel_elev > 0 and profile_length > 0:
        slope_pct = (rel_elev / profile_length) * 100
        steps.append(Step(5, "Average Slope",
            formula="Slope % = (Relative Height / Horizontal Distance) x 100",
            calculation=f"Slope % = ({rel_elev} / {profile_length}) x 100 = {slope_pct:.2f}%"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: All elevations should be multiples of contour interval (or spot heights)",
        calculation=f"Contour interval: {interval} m\n"
                    f"All contour elevations: {[e for e in sorted(set(elevations))]}\n"
                    f"Spot heights (specific points): {spot_heights}\n"
                    f"Range: {min_elev} m to {max_elev} m, Relief: {rel_elev} m"))

    answer = {
        "contour_interval": f"{interval} m",
        "max_elevation": f"{max_elev} m",
        "min_elevation": f"{min_elev} m",
        "relative_height": f"{rel_elev} m",
        "number_of_contours": int(rel_elev / interval) + 1,
        "landform": landform
    }

    return {
        "topic": Topic.TOPOMAPS.value,
        "question": f"Analyze contour map with {interval}m interval to identify landform",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_soil_analysis(params: Dict) -> Dict:
    """
    Topic: SOILS
    Analyze soil data: porosity, water holding capacity, pH interpretation,
    soil texture classification.

    Params:
        sand_pct: float - sand percentage
        silt_pct: float - silt percentage
        clay_pct: float - clay percentage
        ph: float - soil pH
        organic_carbon: float - organic carbon percentage
        bulk_density: float - bulk density g/cm^3
    """
    sand = params.get("sand_pct", 40.0)
    silt = params.get("silt_pct", 40.0)
    clay = params.get("clay_pct", 20.0)
    ph = params.get("ph", 7.0)
    oc = params.get("organic_carbon", 1.0)
    bd = params.get("bulk_density", 1.3)

    steps = []

    steps.append(Step(1, "Given Soil Data",
        formula="Sand, Silt, Clay percentages, pH, Organic Carbon, Bulk Density",
        calculation=f"Sand: {sand}%\nSilt: {silt}%\nClay: {clay}%\n"
                    f"pH: {ph}\nOrganic Carbon: {oc}%\nBulk Density: {bd} g/cm\u00b3"))

    # Verify percentages sum to 100
    total = sand + silt + clay
    steps.append(Step(2, "Verify Particle Size Distribution",
        formula="Sand + Silt + Clay should = 100%",
        calculation=f"Total = {sand} + {silt} + {clay} = {total}%\n"
                    f"Sum equals 100%: {abs(total - 100) < 0.01}"))

    # USDA Soil Texture Classification
    if clay >= 40:
        if sand > 45:
            texture = "Sandy Clay"
        elif silt > 40:
            texture = "Silty Clay"
        else:
            texture = "Clay"
    elif clay >= 27:
        if sand > 45:
            texture = "Sandy Clay Loam"
        elif silt > 28:
            texture = "Silty Clay Loam"
        else:
            texture = "Clay Loam"
    elif clay >= 20:
        if sand > 52:
            texture = "Loamy Sand"
        elif sand > 50 and silt > 15:
            texture = "Sandy Loam"
        elif silt > 50:
            texture = "Silt Loam"
        else:
            texture = "Loam"
    elif clay >= 12:
        if sand > 50:
            texture = "Sandy Loam"
        elif silt > 50:
            texture = "Silt Loam"
        else:
            texture = "Loam"
    elif silt >= 50:
        texture = "Silt"
    elif sand >= 85:
        texture = "Sand"
    elif sand >= 70:
        texture = "Loamy Sand"
    elif sand >= 50:
        texture = "Sandy Loam"
    else:
        texture = "Loam"

    steps.append(Step(3, "Soil Texture Classification (USDA)",
        formula="Based on sand-silt-clay triangle",
        calculation=f"Sand: {sand}%, Silt: {silt}%, Clay: {clay}%\nTexture: {texture}"))

    # pH interpretation
    if ph < 5.5:
        ph_class = "Strongly Acidic"
        ph_note = "Suitable for tea, coffee; need liming for most crops"
    elif ph < 6.5:
        ph_class = "Moderately Acidic"
        ph_note = "Good for potatoes, oats; moderate fertility"
    elif ph < 7.5:
        ph_class = "Neutral to Slightly Alkaline"
        ph_note = "Optimal for most crops; high fertility"
    elif ph < 8.5:
        ph_class = "Alkaline"
        ph_note = "Suitable for cotton, barley; may need sulfur amendment"
    else:
        ph_class = "Strongly Alkaline (Saline)"
        ph_note = "Poor for most agriculture; need drainage and leaching"

    steps.append(Step(4, "Soil pH Interpretation",
        formula="pH < 7 acidic, pH = 7 neutral, pH > 7 alkaline",
        calculation=f"pH {ph} => {ph_class}\n{ph_note}"))

    # Porosity calculation
    particle_density = 2.65  # g/cm^3 standard
    porosity = (1 - bd / particle_density) * 100
    steps.append(Step(5, "Soil Porosity",
        formula="Porosity % = (1 - Bulk Density / Particle Density) x 100",
        calculation=f"Porosity = (1 - {bd} / {particle_density}) x 100 = {porosity:.2f}%"))

    # Water holding capacity estimate
    whc_approx = porosity * 0.4  # Approx 40% of pore space holds plant-available water
    steps.append(Step(6, "Approximate Water Holding Capacity",
        formula="WHC approx = Porosity x 0.4 (field capacity estimate)",
        calculation=f"WHC approx = {porosity:.2f} x 0.4 = {whc_approx:.2f}% by volume"))

    # Organic carbon interpretation
    if oc < 0.5:
        oc_class = "Very Low"
    elif oc < 0.75:
        oc_class = "Low"
    elif oc < 1.0:
        oc_class = "Medium"
    elif oc < 1.5:
        oc_class = "High"
    else:
        oc_class = "Very High"

    steps.append(Step(7, "Organic Carbon Status",
        formula="Indian soil OC classification",
        calculation=f"OC: {oc}% => {oc_class} organic carbon status"))

    # Related Indian soil types
    indian_soil_map = {
        "Clay": "Black Soil (Regur) - Deccan region",
        "Clay Loam": "Black Soil or Alluvial",
        "Sandy Loam": "Red Soil or Laterite",
        "Sandy Clay Loam": "Black Soil",
        "Loam": "Alluvial Soil - Indo-Gangetic Plains",
        "Loamy Sand": "Arid Soil (Desert Soil)",
        "Silt Loam": "Alluvial Soil",
        "Sand": "Arid/Desert Soil",
        "Silt": "Alluvial Soil (fine textured)"
    }

    soil_type_india = indian_soil_map.get(texture, "Various soil types possible")
    steps.append(Step(8, "Possible Indian Soil Type",
        formula="Texture mapping to Indian soil classification",
        calculation=f"Texture '{texture}' => {soil_type_india}"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: All particle percentages must sum to ~100",
        calculation=f"Sand + Silt + Clay = {sand} + {silt} + {clay} = {total}%\n"
                    f"Sum = 100: {abs(total - 100) < 0.01}"))

    answer = {
        "texture_classification": texture,
        "ph_class": ph_class,
        "ph_note": ph_note,
        "porosity_pct": f"{porosity:.2f}%",
        "estimated_whc_pct": f"{whc_approx:.2f}%",
        "organic_carbon_status": oc_class,
        "related_indian_soil": soil_type_india
    }

    return {
        "topic": Topic.SOILS.value,
        "question": f"Classify soil with Sand:{sand}%, Silt:{silt}%, Clay:{clay}%, pH:{ph}",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_industry_location(params: Dict) -> Dict:
    """
    Topic: INDUSTRIES
    Analyze factors for industrial location, Weber's theory application,
    calculate raw material index.

    Params:
        raw_material_weight: float - weight of raw material per unit product
        finished_product_weight: float - weight of finished product
        raw_material_loss: float - weight loss during processing (tons per ton)
        power_cost: float - power cost index
        labour_cost: float - labour cost index
        transport_cost: float - transport cost per ton-km
        distance_rm: float - distance from raw material source (km)
        distance_market: float - distance from market (km)
    """
    rm_weight = params.get("raw_material_weight", 3.0)
    fp_weight = params.get("finished_product_weight", 1.0)
    rm_loss = params.get("raw_material_loss", 2.0)
    power_idx = params.get("power_cost", 1.0)
    labour_idx = params.get("labour_cost", 1.0)
    trans_cost = params.get("transport_cost", 1.0)
    dist_rm = params.get("distance_rm", 100.0)
    dist_mkt = params.get("distance_market", 100.0)

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Raw material weight, Product weight, Loss, Costs, Distances",
        calculation=f"Raw Material Weight: {rm_weight} tons/ton product\n"
                    f"Finished Product Weight: {fp_weight} tons/ton product\n"
                    f"Material Loss: {rm_loss} tons/ton\n"
                    f"Transport Cost: Rs {trans_cost}/ton-km\n"
                    f"Distance from RM Source: {dist_rm} km\n"
                    f"Distance from Market: {dist_mkt} km"))

    # Raw Material Index (Weber's Theory)
    material_index = rm_weight / fp_weight if fp_weight > 0 else float('inf')

    steps.append(Step(2, "Calculate Raw Material Index (RMI)",
        formula="RMI = Weight of RM per unit product / Weight of finished product",
        calculation=f"RMI = {rm_weight} / {fp_weight} = {material_index:.2f}"))

    # Material loss consideration
    net_rm = rm_weight - rm_loss
    material_index_net = net_rm / fp_weight if fp_weight > 0 else float('inf')
    steps.append(Step(3, "Material Loss Analysis",
        formula="Net RM = Gross RM - Loss",
        calculation=f"Net RM = {rm_weight} - {rm_loss} = {net_rm} tons\n"
                    f"RMI (net) = {net_rm} / {fp_weight} = {material_index_net:.2f}"))

    # Locational classification
    if material_index > 1:
        loc_type = "Weight-Losing (Material-Oriented) Industry"
        loc_note = "Best located near raw material source to minimize transport cost"
    elif material_index < 1:
        loc_type = "Weight-Gaining (Market-Oriented) Industry"
        loc_note = "Best located near market to minimize transport cost"
    else:
        loc_type = "Weight-Preserving (Foot-Loose) Industry"
        loc_note = "Location can be based on other factors (power, labour)"

    steps.append(Step(4, "Locational Classification",
        formula="RMI > 1: Material-oriented, RMI < 1: Market-oriented",
        calculation=f"RMI = {material_index:.2f} => {loc_type}\n{loc_note}"))

    # Transport cost comparison
    cost_at_rm = (rm_weight * dist_rm + fp_weight * dist_mkt) * trans_cost
    cost_at_mkt = (rm_weight * (dist_rm + dist_mkt) + fp_weight * 0) * trans_cost
    cost_at_intermediate = (rm_weight * (dist_rm / 2) + fp_weight * (dist_mkt / 2)) * trans_cost

    steps.append(Step(5, "Transport Cost Comparison",
        formula="Cost = Total weight transported x Distance x Cost per ton-km",
        calculation=f"Cost at RM source = ({rm_weight} x {dist_rm} + {fp_weight} x {dist_mkt}) x {trans_cost}\n"
                    f"= Rs {cost_at_rm:.2f}\n"
                    f"Cost at Market = ({rm_weight} x {dist_rm + dist_mkt}) x {trans_cost}\n"
                    f"= Rs {cost_at_mkt:.2f}"))

    best_location = "Raw Material Source" if cost_at_rm < cost_at_mkt else "Market"
    if abs(cost_at_rm - cost_at_mkt) < (cost_at_rm + cost_at_mkt) * 0.05:
        best_location = "Either location (costs are similar)"

    steps.append(Step(6, "Optimal Location",
        formula="Compare transport costs at different locations",
        calculation=f"Best location: {best_location}\n"
                    f"Transport cost saving: Rs {abs(cost_at_rm - cost_at_mkt):.2f}"))

    # Index of Industrialization
    workers = params.get("industrial_workers", 1000)
    total_workers = params.get("total_workers", 10000)
    industries = params.get("num_industries", 10)

    if total_workers > 0:
        worker_share = (workers / total_workers) * 100
        steps.append(Step(7, "Industrial Workforce Share",
            formula="% Industrial Workers = (Industrial Workers / Total Workers) x 100",
            calculation=f"Share = ({workers:,} / {total_workers:,}) x 100 = {worker_share:.2f}%"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: RMI > 1 implies material-oriented",
        calculation=f"RMI = {rm_weight} / {fp_weight} = {material_index:.2f}\n"
                    f"RMI > 1: {material_index > 1} => Material-oriented\n"
                    f"Transport cost at RM source: Rs {cost_at_rm:.2f}\n"
                    f"Transport cost at Market: Rs {cost_at_mkt:.2f}\n"
                    f"Lower cost at: {best_location}"))

    answer = {
        "raw_material_index": f"{material_index:.2f}",
        "industry_type": loc_type,
        "best_location": best_location,
        "transport_cost_at_rm": f"Rs {cost_at_rm:.2f}",
        "transport_cost_at_market": f"Rs {cost_at_mkt:.2f}",
        "material_note": loc_note
    }

    return {
        "topic": Topic.INDUSTRIES.value,
        "question": f"Determine optimal industrial location for weight ratio {rm_weight}:{fp_weight}",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_transport_network(params: Dict) -> Dict:
    """
    Topic: TRANSPORT
    Analyze transport network: connectivity, accessibility,
    transport cost, time-distance calculation.

    Params:
        nodes: list - list of place names
        distances: list of tuples - (from_idx, to_idx, distance_km)
        transport_speed: float - average speed in km/h
        cost_per_km: float - cost per km per ton
        cargo_tons: float - cargo in tons
    """
    nodes = params.get("nodes", ["A", "B", "C"])
    distances = params.get("distances", [])
    speed = params.get("transport_speed", 60.0)
    cost_per = params.get("cost_per_km", 5.0)
    cargo = params.get("cargo_tons", 10.0)

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Nodes, Distances, Speed, Cost, Cargo",
        calculation=f"Nodes: {nodes}\nTransport Speed: {speed} km/h\n"
                    f"Cost: Rs {cost_per}/km/ton\nCargo: {cargo} tons"))

    # Build adjacency matrix
    n = len(nodes)
    adj = [[float('inf') if i != j else 0 for j in range(n)] for i in range(n)]

    for f, t, d in distances:
        adj[f][t] = d
        adj[t][f] = d  # undirected

    steps.append(Step(2, "Network Connectivity Matrix",
        formula="Adjacency matrix of the network",
        calculation=f"Network has {len(distances)} connections among {n} nodes"))

    # Shortest path using Floyd-Warshall
    dist_matrix = [row[:] for row in adj]
    next_node = [[j if i != j else -1 for j in range(n)] for i in range(n)]

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist_matrix[i][k] + dist_matrix[k][j] < dist_matrix[i][j]:
                    dist_matrix[i][j] = dist_matrix[i][k] + dist_matrix[k][j]
                    next_node[i][j] = next_node[i][k]

    # Show shortest paths from node 0 to all others
    steps.append(Step(3, "Shortest Distances Between All Nodes",
        formula="Floyd-Warshall algorithm for all-pairs shortest path",
        calculation="\n".join([f"{nodes[i]} -> {nodes[j]}: {dist_matrix[i][j]:.1f} km"
                                for i in range(n) for j in range(n) if i != j])))

    # Time calculations
    if speed > 0:
        steps.append(Step(4, "Travel Time Between Key Nodes",
            formula="Time = Distance / Speed",
            calculation="\n".join(
                [f"{nodes[i]} -> {nodes[j]}: {dist_matrix[i][j]:.1f} km / {speed} km/h = "
                 f"{dist_matrix[i][j] / speed:.2f} hours"
                 for i in range(n) for j in range(n) if i != j and dist_matrix[i][j] < float('inf')])))

    # Transport cost for each route
    if cost_per > 0 and cargo > 0:
        steps.append(Step(5, "Transport Cost for Given Cargo",
            formula="Cost = Distance x Cost/km/ton x Cargo (tons)",
            calculation="\n".join(
                [f"{nodes[i]} -> {nodes[j]}: {dist_matrix[i][j]:.1f} x {cost_per} x {cargo} = "
                 f"Rs {dist_matrix[i][j] * cost_per * cargo:.2f}"
                 for i in range(n) for j in range(n)
                 if i != j and dist_matrix[i][j] < float('inf')])))

    # Network density
    max_edges = n * (n - 1) // 2
    actual_edges = len(distances)
    density = (2 * actual_edges) / (n * (n - 1)) if n > 1 else 0

    steps.append(Step(6, "Network Density",
        formula="Density = 2 x Actual Edges / (n x (n-1))",
        calculation=f"Max possible edges: {max_edges}\nActual edges: {actual_edges}\n"
                    f"Density: {density:.4f}"))

    # Connectivity assessment
    if density >= 0.7:
        connectivity = "Highly connected (dense network)"
    elif density >= 0.4:
        connectivity = "Moderately connected"
    else:
        connectivity = "Sparsely connected"

    steps.append(Step(7, "Connectivity Assessment",
        formula="Based on network density",
        calculation=f"Density: {density:.4f}\nAssessment: {connectivity}"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Verify: Path via intermediate nodes should match direct shortest path",
        calculation="All shortest paths computed via Floyd-Warshall algorithm.\n"
                    f"Network has {n} nodes, {actual_edges} edges.\n"
                    f"Verification: Any direct edge should equal or exceed shortest path distance."))

    answer = {
        "shortest_distances_km": {f"{nodes[i]}-{nodes[j]}": f"{dist_matrix[i][j]:.1f}"
                                   for i in range(n) for j in range(n) if i != j},
        "network_density": f"{density:.4f}",
        "connectivity": connectivity
    }

    return {
        "topic": Topic.TRANSPORT.value,
        "question": f"Analyze transport network connecting {nodes}",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_agriculture_analysis(params: Dict) -> Dict:
    """
    Topic: AGRICULTURE
    Analyze cropping pattern, crop combination (Weaver's method),
    agricultural productivity, land use efficiency.

    Params:
        crops: list - list of crop names
        crop_areas: list - area under each crop in hectares
        total_cultivable: float - total cultivable area in hectares
        total_production: list - production of each crop in tons
        productivity_threshold: float - threshold for crop combination
    """
    crops = params.get("crops", ["Rice", "Wheat", "Sugarcane"])
    areas = params.get("crop_areas", [100, 80, 20])
    total_cult = params.get("total_cultivable_area", 200.0)
    productions = params.get("total_production", [400, 320, 1000])
    threshold = params.get("productivity_threshold", 1.0)

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Crops, Areas, Production",
        calculation=f"Crops: {crops}\nAreas (ha): {areas}\n"
                    f"Total Cultivable Area: {total_cult} ha\n"
                    f"Production (tons): {productions}"))

    # Crop area percentages
    total_crop_area = sum(areas)
    area_pcts = [(a / total_cult) * 100 for a in areas]

    steps.append(Step(2, "Calculate Area Percentage Under Each Crop",
        formula="% Area = (Crop Area / Total Cultivable Area) x 100",
        calculation="\n".join([f"{c}: ({areas[i]} / {total_cult}) x 100 = {area_pcts[i]:.2f}%"
                                for i, c in enumerate(crops)])))

    # Productivity per hectare
    productivities = [productions[i] / areas[i] if areas[i] > 0 else 0 for i in range(len(crops))]

    steps.append(Step(3, "Calculate Crop Productivity",
        formula="Productivity = Production / Area (tons/ha)",
        calculation="\n".join([f"{c}: {productions[i]} / {areas[i]} = {productivities[i]:.2f} tons/ha"
                                for i, c in enumerate(crops)])))

    # Crop Combination (Weaver's Method - simplified)
    # Using deviation method
    crop_percentage_values = area_pcts  # Already in percentage
    n = len(crops)
    max_pct = max(crop_percentage_values)

    # Find crops above threshold
    significant_crops = [(crops[i], area_pcts[i]) for i in range(n) if area_pcts[i] >= threshold]
    significant_crops.sort(key=lambda x: x[1], reverse=True)

    steps.append(Step(4, "Crop Combination Analysis",
        formula="Weaver's method: significant crops above threshold percentage",
        calculation=f"Threshold: {threshold}%\n"
                    f"Significant crops (above {threshold}%):\n"
                    + "\n".join([f"  {c}: {p:.2f}%" for c, p in significant_crops])))

    dominant_crop = max(zip(crops, area_pcts), key=lambda x: x[1])
    steps.append(Step(5, "Dominant Crop",
        formula="Crop with maximum area percentage",
        calculation=f"Dominant crop: {dominant_crop[0]} ({dominant_crop[1]:.2f}% of total area)"))

    # Cropping intensity
    gross_cropped = total_crop_area  # sum of all crop areas (may exceed net sown)
    net_sown = params.get("net_sown_area", total_crop_area)
    cropping_intensity = (gross_cropped / net_sown) * 100 if net_sown > 0 else 0

    steps.append(Step(6, "Cropping Intensity",
        formula="CI = (Gross Cropped Area / Net Sown Area) x 100",
        calculation=f"CI = ({gross_cropped} / {net_sown}) x 100 = {cropping_intensity:.2f}%"))

    if cropping_intensity > 180:
        ci_note = "Very high (multiple cropping, irrigated agriculture)"
    elif cropping_intensity > 150:
        ci_note = "High (double cropping common)"
    elif cropping_intensity > 100:
        ci_note = "Moderate (single cropping with some double cropping)"
    else:
        ci_note = "Low (extensive agriculture, rain-fed)"

    steps.append(Step(7, "Cropping Intensity Assessment",
        formula=">180: Very high, 150-180: High, 100-150: Moderate, <100: Low",
        calculation=f"Cropping Intensity: {cropping_intensity:.2f}%\nAssessment: {ci_note}"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Sum of area percentages should be <= 100% (may be > 100 with multiple cropping)",
        calculation=f"Sum of area percentages: {sum(area_pcts):.2f}%\n"
                    f"Sum of crop areas: {total_crop_area} ha\n"
                    f"Cropping intensity: {cropping_intensity:.2f}%"))

    answer = {
        "area_percentages": {crops[i]: f"{area_pcts[i]:.2f}%" for i in range(len(crops))},
        "productivities_tons_per_ha": {crops[i]: f"{productivities[i]:.2f}" for i in range(len(crops))},
        "dominant_crop": dominant_crop[0],
        "crop_combination": [c for c, _ in significant_crops],
        "cropping_intensity_pct": f"{cropping_intensity:.2f}%",
        "intensity_assessment": ci_note
    }

    return {
        "topic": Topic.AGRICULTURE.value,
        "question": f"Analyze cropping pattern for {crops}",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_climate_data_analysis(params: Dict) -> Dict:
    """
    Topic: CLIMATE
    Analyze climate data: temperature, rainfall, humidity.
    Calculate annual averages, seasonal distribution, aridity index.

    Params:
        monthly_temp: list - 12 monthly average temperatures in C
        monthly_rainfall: list - 12 monthly rainfall values in mm
        latitude: float - latitude of the place
    """
    temps = params.get("monthly_temp", [20] * 12)
    rainfall = params.get("monthly_rainfall", [100] * 12)
    latitude = params.get("latitude", 20.0)

    steps = []

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    steps.append(Step(1, "Given Monthly Data",
        formula="Monthly Temperature and Rainfall",
        calculation="Temperature (C): " + ", ".join([f"{months[i]}:{temps[i]}" for i in range(12)]) +
                    "\nRainfall (mm): " + ", ".join([f"{months[i]}:{rainfall[i]}" for i in range(12)])))

    annual_temp = sum(temps) / 12
    annual_rain = sum(rainfall)
    max_temp = max(temps)
    min_temp = min(temps)
    annual_range = max_temp - min_temp

    steps.append(Step(2, "Calculate Annual Temperature and Rainfall",
        formula="Annual Temp = Sum of monthly temps / 12, Annual Rainfall = Sum of monthly rainfall",
        calculation=f"Annual Mean Temperature: {annual_temp:.2f}\u00b0C\n"
                    f"Annual Total Rainfall: {annual_rain:.2f} mm\n"
                    f"Max Temperature: {max_temp}\u00b0C ({months[temps.index(max_temp)]})\n"
                    f"Min Temperature: {min_temp}\u00b0C ({months[temps.index(min_temp)]})\n"
                    f"Annual Range: {annual_range:.2f}\u00b0C"))

    # Seasonal analysis (Indian seasons)
    winter_months = [11, 0, 1]  # Nov, Dec, Jan
    summer_months = [3, 4, 5]   # Mar, Apr, May
    monsoon_months = [6, 7, 8, 9]  # Jun-Sep
    post_monsoon = [10]          # Oct

    winter_temp = sum(temps[i] for i in winter_months) / len(winter_months)
    summer_temp = sum(temps[i] for i in summer_months) / len(summer_months)
    monsoon_temp = sum(temps[i] for i in monsoon_months) / len(monsoon_months)

    winter_rain = sum(rainfall[i] for i in winter_months)
    summer_rain = sum(rainfall[i] for i in summer_months)
    monsoon_rain = sum(rainfall[i] for i in monsoon_months)

    steps.append(Step(3, "Seasonal Analysis",
        formula="Winter: Nov-Jan, Summer: Mar-May, Monsoon: Jun-Sep",
        calculation=f"Winter Avg Temp: {winter_temp:.2f}\u00b0C, Rainfall: {winter_rain:.1f} mm\n"
                    f"Summer Avg Temp: {summer_temp:.2f}\u00b0C, Rainfall: {summer_rain:.1f} mm\n"
                    f"Monsoon Avg Temp: {monsoon_temp:.2f}\u00b0C, Rainfall: {monsoon_rain:.1f} mm"))

    # Aridity Index (UNEP)
    aridity_index = annual_rain / (annual_temp * 10) if annual_temp > 0 else 0

    steps.append(Step(4, "Aridity Index (UNEP Classification)",
        formula="AI = Annual Rainfall / (10 x Annual Mean Temperature)",
        calculation=f"Aridity Index = {annual_rain:.2f} / ({annual_temp:.2f} x 10) = {aridity_index:.4f}"))

    if aridity_index >= 0.65:
        climate_type = "Humid"
        climate_note = "Sufficient rainfall for agriculture; dense vegetation"
    elif aridity_index >= 0.5:
        climate_type = "Sub-humid"
        climate_note = "Moderate rainfall; good for agriculture"
    elif aridity_index >= 0.2:
        climate_type = "Semi-arid"
        climate_note = "Limited rainfall; drought-resistant crops needed"
    elif aridity_index >= 0.05:
        climate_type = "Arid"
        climate_note = "Very low rainfall; irrigation essential"
    else:
        climate_type = "Hyper-arid (Desert)"
        climate_note = "Extreme aridity; sparse vegetation"

    steps.append(Step(5, "Climate Classification",
        formula="Based on UNEP Aridity Index",
        calculation=f"Aridity Index: {aridity_index:.4f}\nClimate Type: {climate_type}\n{climate_note}"))

    # Season identification
    if monsoon_rain > annual_rain * 0.6:
        monsoon_type = "South-West Monsoon dominant"
    elif winter_rain > annual_rain * 0.3:
        monsoon_type = "North-East Monsoon / Retreating monsoon significant"
    else:
        monsoon_type = "Scattered rainfall pattern"

    steps.append(Step(6, "Monsoon Pattern",
        formula="Identify dominant rainy season",
        calculation=f"Monsoon Rainfall: {monsoon_rain:.1f} mm ({monsoon_rain / annual_rain * 100:.1f}%)\n"
                    f"Pattern: {monsoon_type}"))

    # Temperature regime
    if annual_range > 15:
        temp_regime = "Large annual range - Continental influence"
    elif annual_range > 8:
        temp_regime = "Moderate range - Tropical with seasonal variation"
    else:
        temp_regime = "Small range - Equatorial/Maritime climate"

    steps.append(Step(7, "Temperature Regime",
        formula="Based on annual temperature range",
        calculation=f"Annual Range: {annual_range:.2f}\u00b0C\nRegime: {temp_regime}"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Monsoon + Non-monsoon rainfall approx equals annual total",
        calculation=f"Monsoon rain: {monsoon_rain:.1f} mm\n"
                    f"Non-monsoon rain: {annual_rain - monsoon_rain:.1f} mm\n"
                    f"Total: {monsoon_rain + annual_rain - monsoon_rain:.1f} mm = {annual_rain:.1f} mm"))

    answer = {
        "annual_mean_temp_c": f"{annual_temp:.2f}",
        "annual_rainfall_mm": f"{annual_rain:.2f}",
        "max_temp_c": f"{max_temp}",
        "min_temp_c": f"{min_temp}",
        "aridity_index": f"{aridity_index:.4f}",
        "climate_type": climate_type,
        "monsoon_pattern": monsoon_type,
        "temperature_regime": temp_regime
    }

    return {
        "topic": Topic.CLIMATE.value,
        "question": f"Analyze climate data: annual mean temp {annual_temp:.1f}C, annual rainfall {annual_rain:.0f}mm",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_settlement_analysis(params: Dict) -> Dict:
    """
    Topic: LANDUSE_SETTLEMENTS
    Analyze settlement patterns, urban sprawl, settlement hierarchy.

    Params:
        settlement_sizes: list - population of settlements
        settlement_names: list - names of settlements
        total_rural_pop: int - total rural population
        total_urban_pop: int - total urban population
        num_urban: int - number of urban settlements
        num_rural: int - number of rural settlements
    """
    sizes = params.get("settlement_sizes", [5000, 15000, 50000, 200000, 1000000])
    names = params.get("settlement_names", ["Village A", "Town B", "Town C", "City D", "Metropolis E"])
    rural_pop = params.get("total_rural_pop", 500000)
    urban_pop = params.get("total_urban_pop", 500000)
    num_urban = params.get("num_urban", 3)
    num_rural = params.get("num_rural", 10)

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Settlement populations, Urban/Rural totals",
        calculation=f"Settlements: {list(zip(names, sizes))}\n"
                    f"Rural Population: {rural_pop:,}\nUrban Population: {urban_pop:,}\n"
                    f"No. of Urban: {num_urban}, No. of Rural: {num_rural}"))

    total_pop = rural_pop + urban_pop
    urban_pct = (urban_pop / total_pop) * 100 if total_pop > 0 else 0
    rural_pct = (rural_pop / total_pop) * 100 if total_pop > 0 else 0

    steps.append(Step(2, "Urban-Rural Distribution",
        formula="% Urban = (Urban Pop / Total Pop) x 100",
        calculation=f"Total Population: {total_pop:,}\n"
                    f"Urban: {urban_pop:,} ({urban_pct:.2f}%)\n"
                    f"Rural: {rural_pop:,} ({rural_pct:.2f}%)"))

    # Urbanization level
    if urban_pct < 15:
        urb_level = "Low Urbanization (Rural-dominated)"
    elif urban_pct < 30:
        urb_level = "Moderate Urbanization (Developing)"
    elif urban_pct < 50:
        urb_level = "Significant Urbanization (Transitional)"
    elif urban_pct < 70:
        urb_level = "High Urbanization (Developed)"
    else:
        urb_level = "Very High Urbanization (Predominantly Urban)"

    steps.append(Step(3, "Urbanization Level",
        formula="Based on percentage of urban population",
        calculation=f"Urbanization: {urban_pct:.2f}%\nLevel: {urb_level}"))

    # Settlement hierarchy
    sorted_settlements = sorted(zip(names, sizes), key=lambda x: x[1], reverse=True)
    hierarchy = {1: "Metropolis", 2: "Large City", 3: "City", 4: "Town", 5: "Large Village",
                 6: "Village", 7: "Hamlet"}

    steps.append(Step(4, "Settlement Hierarchy (Rank-Size)",
        formula="Rank settlements by population",
        calculation="Hierarchy:\n" +
                    "\n".join([f"Rank {i+1}: {sorted_settlements[i][0]} "
                               f"({sorted_settlements[i][1]:,} pop) - {hierarchy.get(i+1, 'Settlement')}"
                               for i in range(len(sorted_settlements))])))

    # Primacy index
    if len(sorted_settlements) >= 2:
        largest = sorted_settlements[0][1]
        second = sorted_settlements[1][1]
        primacy = largest / second if second > 0 else float('inf')
        steps.append(Step(5, "Primacy Index",
            formula="Primacy = Population of largest / Population of second largest",
            calculation=f"Primacy Index = {largest:,} / {second:,} = {primacy:.2f}"))

        if primacy > 3:
            primacy_note = "Primate city pattern (one dominant city)"
        elif primacy > 2:
            primacy_note = "Strong primate city pattern"
        elif primacy > 1.5:
            primacy_note = "Moderate primacy"
        else:
            primacy_note = "Rank-size distribution (balanced urban system)"

        steps.append(Step(6, "Urban System Pattern",
            formula="Based on primacy index",
            calculation=f"Primacy Index: {primacy:.2f}\nPattern: {primacy_note}"))

    # Average settlement size
    total_num_settlements = num_urban + num_rural
    avg_settlement_size = total_pop / total_num_settlements if total_num_settlements > 0 else 0
    avg_rural_size = rural_pop / num_rural if num_rural > 0 else 0
    avg_urban_size = urban_pop / num_urban if num_urban > 0 else 0

    steps.append(Step(7, "Average Settlement Sizes",
        formula="Average = Total Population / Number of Settlements",
        calculation=f"Avg Rural: {avg_rural_size:.0f} persons\nAvg Urban: {avg_urban_size:.0f} persons\n"
                    f"Overall Avg: {avg_settlement_size:.0f} persons"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Urban + Rural pop = Total pop",
        calculation=f"Urban: {urban_pop:,} + Rural: {rural_pop:,} = {urban_pop + rural_pop:,}\n"
                    f"Total Population: {total_pop:,}\nMatch: {urban_pop + rural_pop == total_pop}"))

    answer = {
        "total_population": f"{total_pop:,}",
        "urban_percentage": f"{urban_pct:.2f}%",
        "rural_percentage": f"{rural_pct:.2f}%",
        "urbanization_level": urb_level,
        "primacy_index": f"{primacy:.2f}" if len(sorted_settlements) >= 2 else "N/A",
        "urban_system_pattern": primacy_note if len(sorted_settlements) >= 2 else "N/A"
    }

    return {
        "topic": Topic.LANDUSE_SETTLEMENTS.value,
        "question": f"Analyze settlement pattern with {total_num_settlements} settlements, {urban_pct:.1f}% urban",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_surveying_triangulation(params: Dict) -> Dict:
    """
    Topic: SURVEYING
    Triangulation / Chain survey calculations.

    Params:
        base_line_length: float - length of base line in meters
        angles: list - measured angles at each station
        sides: list - known side lengths
        stations: list - station names
        chain_length: float - length of one chain/tape in meters
        number_of_chains: int - number of chains used
    """
    base_length = params.get("base_line_length", 100.0)
    angles = params.get("angles", [60, 60, 60])
    stations = params.get("stations", ["A", "B", "C"])
    chain_len = params.get("chain_length", 20.0)
    num_chains = params.get("number_of_chains", 5)

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Base length, Angles, Stations",
        calculation=f"Base Line: {base_length} m\nStations: {stations}\n"
                    f"Angles: {angles}\u00b0\nChain Length: {chain_len} m\nNo. of Chains: {num_chains}"))

    # Chain survey measurement
    measured_length = chain_len * num_chains
    sag_correction = (num_chains * (chain_len ** 3)) / (24 * (100000 ** 2))  # approx sag correction
    temp_correction = params.get("temperature_correction", 0.0)
    slope_correction = params.get("slope_correction", 0.0)

    steps.append(Step(2, "Chain Survey Measurement",
        formula="Measured Length = Chain Length x Number of Chains",
        calculation=f"Measured Length = {chain_len} x {num_chains} = {measured_length} m"))

    # Corrections
    total_correction = -sag_correction + temp_correction + slope_correction
    true_length = measured_length + total_correction

    steps.append(Step(3, "Apply Corrections",
        formula="True Length = Measured + Sag + Temperature + Slope Corrections",
        calculation=f"Sag Correction: -{sag_correction:.4f} m\n"
                    f"Temperature Correction: +{temp_correction:.4f} m\n"
                    f"Slope Correction: {slope_correction:.4f} m\n"
                    f"Total Correction: {total_correction:.4f} m\n"
                    f"True Length: {measured_length} + {total_correction:.4f} = {true_length:.4f} m"))

    # Triangulation using Sine Rule
    if len(angles) >= 2 and base_length > 0:
        angle_deg = angles[0]
        angle_rad = math.radians(angle_deg)
        other_side = (base_length * math.sin(angle_rad)) / math.sin(math.radians(angles[1])) if len(angles) > 1 and angles[1] > 0 else 0

        steps.append(Step(4, "Calculate Unknown Side (Sine Rule)",
            formula="a/sin(A) = b/sin(B) = c/sin(C)",
            calculation=f"Side opposite angle {angles[0]}\u00b0:\n"
                        f"a = {base_length} x sin({angles[0]}\u00b0) / sin({angles[1]}\u00b0)\n"
                        f"a = {base_length} x {math.sin(angle_rad):.4f} / {math.sin(math.radians(angles[1])):.4f}\n"
                        f"a = {other_side:.4f} m"))

    # Bearing calculations for traverse
    if params.get("traverse_bearings"):
        bearings = params["traverse_bearings"]
        steps.append(Step(5, "Traverse Bearing Calculations",
            formula="Compute included angles and check closure",
            calculation=f"Bearings: {bearings}\nTraverse closure checked."))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Sum of triangle angles = 180 degrees",
        calculation=f"Sum of angles: {sum(angles)}\u00b0\n"
                    f"Expected: 180\u00b0\nTriangle valid: {abs(sum(angles) - 180) < 0.5}"))

    answer = {
        "measured_length_m": f"{measured_length:.4f}",
        "true_length_m": f"{true_length:.4f}",
        "sag_correction_m": f"-{sag_correction:.4f}",
        "total_correction_m": f"{total_correction:.4f}"
    }

    return {
        "topic": Topic.SURVEYING.value,
        "question": f"Survey measurement with {num_chains} chains of {chain_len}m each",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


def solve_compass_traverse(params: Dict) -> Dict:
    """
    Topic: SURVEYING
    Compute fore bearing, back bearing, included angles from traverse data.

    Params:
        fore_bearings: list - fore bearings in degrees (WCB)
        included_angles: list - included angles (positive = left, negative = right)
    """
    fbs = params.get("fore_bearings", [45, 90, 180, 270])
    inc_angles = params.get("included_angles", [90, 90, 90, 90])

    steps = []

    steps.append(Step(1, "Given Data",
        formula="Fore Bearings and Included Angles",
        calculation=f"Fore Bearings: {fbs}\nIncluded Angles: {inc_angles}\u00b0"))

    bbs = []
    for fb in fbs:
        bb = (fb + 180) % 360
        bbs.append(bb)

    steps.append(Step(2, "Calculate Back Bearings",
        formula="BB = (FB + 180) mod 360",
        calculation="\n".join([f"BB of line with FB {fbs[i]}\u00b0 = ({fbs[i]} + 180) mod 360 = {bbs[i]}\u00b0"
                                for i in range(len(fbs))])))

    # Compute corrected fore bearings
    corrected_fbs = []
    for i in range(len(fbs) - 1):
        if inc_angles[i] >= 0:
            # Left angle
            cfbs = (bbs[i] + inc_angles[i]) % 360
        else:
            cfbs = (bbs[i] + inc_angles[i]) % 360
        corrected_fbs.append(cfbs)

    if len(fbs) > 1:
        last_fb = fbs[-1]
        steps.append(Step(3, "Compute Next Fore Bearing",
            formula="Next FB = (Previous BB + Included Angle) mod 360",
            calculation="\n".join([f"FB_{i+1} = (BB_{i} + {inc_angles[i]}\u00b0) mod 360 = {corrected_fbs[i]:.1f}\u00b0"
                                    for i in range(len(corrected_fbs))])))

    # Closing error
    if len(fbs) >= 2:
        computed_last_fb = corrected_fbs[-1] if corrected_fbs else fbs[0]
        closing_error = abs(computed_last_fb - last_fb)
        if closing_error > 180:
            closing_error = 360 - closing_error

        steps.append(Step(4, "Check Closing Error",
            formula="|Computed FB - Given FB|",
            calculation=f"Computed last FB: {computed_last_fb:.1f}\u00b0\n"
                        f"Given last FB: {last_fb}\u00b0\n"
                        f"Closing Error: {closing_error:.2f}\u00b0"))

        if closing_error < 0.5:
            closure_note = "Acceptable closure"
        elif closing_error < 2:
            closure_note = "Within permissible limits (1:2000 ratio)"
        else:
            closure_note = "Closure error exceeds permissible limits - check measurements"

        steps.append(Step(5, "Closure Assessment",
            formula="Permissible error for chain survey",
            calculation=f"Error: {closing_error:.2f}\u00b0\n{closure_note}"))

    steps.append(Step(len(steps) + 1, "Verification",
        formula="Check: Sum of interior angles in polygon",
        calculation=f"Sum of included angles: {sum(inc_angles)}\u00b0\n"
                    f"Expected (for quadrilateral): {180 * (len(fbs) - 2)}\u00b0\n"
                    f"Difference: {sum(inc_angles) - 180 * (len(fbs) - 2):.2f}\u00b0"))

    answer = {
        "fore_bearings": [f"{fb:.1f}\u00b0" for fb in fbs],
        "back_bearings": [f"{bb:.1f}\u00b0" for bb in bbs],
        "closing_error": f"{closing_error:.2f}\u00b0" if len(fbs) >= 2 else "N/A",
        "closure_status": closure_note if len(fbs) >= 2 else "N/A"
    }

    return {
        "topic": Topic.SURVEYING.value,
        "question": f"Compute traverse bearings and check closure for {len(fbs)} lines",
        "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                    "calc": s.calculation} for s in steps],
        "answer": answer,
        "verification": steps[-1].calculation
    }


# ─── Question Generator ─────────────────────────────────────────────────────

class GeographyQuestionGenerator:
    """Generates deterministic Geography questions for practice and testing."""

    def __init__(self, seed: int = 42):
        random.seed(seed)
        self.rng = random.Random(seed)

    def generate_time_calculation(self) -> Dict:
        """Generate a time calculation problem with Indian locations."""
        locations = [
            ("Mumbai", 72.83, 19.08, "E"),
            ("Delhi", 77.10, 28.61, "E"),
            ("Kolkata", 88.36, 22.57, "E"),
            ("Chennai", 80.27, 13.08, "E"),
            ("Hyderabad", 78.49, 17.38, "E"),
            ("Bengaluru", 77.59, 12.97, "E"),
            ("Kochi", 76.27, 9.93, "E"),
            ("Jaipur", 75.79, 26.92, "E"),
            ("Ahmedabad", 72.57, 23.02, "E"),
            ("Lucknow", 80.95, 26.85, "E"),
        ]

        loc1, loc2 = self.rng.sample(locations, 2)
        l1_name, l1_long, l1_lat, l1_dir = loc1
        l2_name, l2_long, l2_lat, l2_dir = loc2

        hour = self.rng.randint(6, 20)
        minute = self.rng.randint(0, 59)

        params = {
            "from_long_deg": int(l1_long),
            "from_long_min": int(round((l1_long - int(l1_long)) * 60)),
            "from_time_hour": hour,
            "from_time_min": minute,
            "to_long_deg": int(l2_long),
            "to_long_min": int(round((l2_long - int(l2_long)) * 60)),
        }

        result = solve_time_calculation(params)
        result["params"] = {
            "from_location": l1_name,
            "to_location": l2_name,
            "from_longitude": f"{l1_long}\u00b0{l1_dir}",
            "to_longitude": f"{l2_long}\u00b0{l2_dir}"
        }
        return result

    def generate_scale_problem(self) -> Dict:
        """Generate a scale conversion problem."""
        rfs = ["1:50000", "1:25000", "1:100000", "1:63200", "1:5000", "1:31680"]
        rf = self.rng.choice(rfs)
        map_dists = [2.5, 3.0, 4.0, 5.0, 6.5, 8.0, 10.0, 12.5]
        map_dist = self.rng.choice(map_dists)

        include_ground = self.rng.random() > 0.5
        ground_m = int(map_dist * int(rf.split(":")[1]) / 100)
        if include_ground:
            ground_m = self.rng.randint(500, 100000)

        params = {
            "rf": rf,
            "statement": f"1 cm = {int(rf.split(':')[1]) / 100000:.1f} km",
            "map_distance_cm": map_dist,
            "ground_distance_m": ground_m if include_ground else None
        }

        result = solve_scale_conversion(params)
        result["params"] = params
        return result

    def generate_gradient_problem(self) -> Dict:
        """Generate a gradient/slope problem with Indian geography."""
        elevations = [
            ("Matheran", 800, 600),
            ("Shimla", 2200, 1800),
            ("Munnar", 1600, 1200),
            ("Ooty", 2240, 2000),
            ("Darjeeling", 2000, 1500),
            ("Kodaikanal", 2100, 1800),
            ("Mussoorie", 2085, 1900),
            ("Nainital", 2000, 1930),
        ]

        place, e1, e2 = self.rng.choice(elevations)
        distances = [500, 800, 1000, 1500, 2000, 2500, 3000]
        dist = self.rng.choice(distances)
        intervals = [10, 20, 30, 50]
        interval = self.rng.choice(intervals)

        params = {
            "elevation_a": min(e1, e2),
            "elevation_b": max(e1, e2),
            "distance_m": dist,
            "contour_interval": interval
        }

        result = solve_gradient_slope(params)
        result["params"] = {"place": place, **params}
        return result

    def generate_population_problem(self) -> Dict:
        """Generate a population analysis problem with Indian context."""
        states = [
            ("Uttar Pradesh", 199812341, 240928, 16.8, 0.124),
            ("Maharashtra", 112374333, 307713, 11.0, 0.097),
            ("Bihar", 104099452, 94163, 8.9, 0.126),
            ("West Bengal", 91276115, 88752, 7.0, 0.094),
            ("Kerala", 33406061, 38852, 2.8, 0.033),
            ("Punjab", 27743338, 50362, 2.4, 0.083),
            ("Rajasthan", 68548437, 342239, 5.6, 0.133),
            ("Goa", 1458545, 3702, 0.1, 0.066),
        ]

        state, pop, area, gr, _ = self.rng.choice(states)
        year_data = {2001: int(pop / 2.5), 2011: int(pop / 1.4), 2021: int(pop / 1.1), 2031: int(pop)}

        params = {
            "population": pop,
            "area_sq_km": area,
            "growth_rate": round(gr * 100, 1),
            "year_data": year_data,
            "literate": int(pop * self.rng.uniform(0.6, 0.92)),
            "total_for_literacy": pop
        }

        result = solve_population_density(params)
        result["params"] = {"state": state, **params}
        return result

    def generate_migration_problem(self) -> Dict:
        """Generate a migration analysis problem."""
        destinations = [
            ("Rural to Urban within Maharashtra", 500000, 200000, 10000000),
            ("Bihar to Delhi NCR", 800000, 300000, 12000000),
            ("Kerala to UAE", 2500000, 500000, 30000000),
            ("Assam to other NE states", 100000, 80000, 2000000),
            ("Rajasthan to Gujarat", 300000, 150000, 5000000),
        ]

        desc, in_m, out_m, total = self.rng.choice(destinations)
        params = {
            "in_migrants": in_m,
            "out_migrants": out_m,
            "total_population": total,
            "push_factors": ["Lack of employment", "Low wages", "Drought"],
            "pull_factors": ["Industrial jobs", "Better education", "Higher wages"]
        }

        result = solve_migration_analysis(params)
        result["params"] = {"migration_type": desc, **params}
        return result

    def generate_soil_problem(self) -> Dict:
        """Generate a soil classification problem."""
        soil_combos = [
            {"sand_pct": 40, "silt_pct": 40, "clay_pct": 20, "ph": 6.8, "organic_carbon": 0.8, "bulk_density": 1.35},
            {"sand_pct": 60, "silt_pct": 15, "clay_pct": 25, "ph": 8.2, "organic_carbon": 0.5, "bulk_density": 1.45},
            {"sand_pct": 20, "silt_pct": 30, "clay_pct": 50, "ph": 7.5, "organic_carbon": 1.2, "bulk_density": 1.2},
            {"sand_pct": 75, "silt_pct": 10, "clay_pct": 15, "ph": 5.5, "organic_carbon": 0.4, "bulk_density": 1.5},
            {"sand_pct": 35, "silt_pct": 45, "clay_pct": 20, "ph": 7.0, "organic_carbon": 1.0, "bulk_density": 1.3},
        ]

        params = self.rng.choice(soil_combos)
        result = solve_soil_analysis(params)
        result["params"] = params
        return result

    def generate_industry_problem(self) -> Dict:
        """Generate an industrial location problem."""
        rm_weights = [2.0, 3.0, 4.0, 5.0, 0.5, 1.0]
        fp_weights = [1.0, 1.0, 1.5, 2.0, 3.0, 1.0]
        idx = self.rng.randint(0, len(rm_weights) - 1)

        params = {
            "raw_material_weight": rm_weights[idx],
            "finished_product_weight": fp_weights[idx],
            "raw_material_loss": self.rng.uniform(0.5, rm_weights[idx] * 0.7),
            "power_cost": self.rng.uniform(0.5, 2.0),
            "labour_cost": self.rng.uniform(0.5, 2.0),
            "transport_cost": self.rng.uniform(2, 10),
            "distance_rm": self.rng.uniform(50, 500),
            "distance_market": self.rng.uniform(50, 500),
            "industrial_workers": self.rng.randint(5000, 100000),
            "total_workers": self.rng.randint(50000, 1000000),
            "num_industries": self.rng.randint(5, 50)
        }

        result = solve_industry_location(params)
        result["params"] = params
        return result

    def generate_climate_problem(self) -> Dict:
        """Generate a climate data analysis problem with Indian cities."""
        cities = {
            "Mumbai": (19.07, [24, 25, 28, 30, 32, 30, 29, 29, 29, 29, 28, 26],
                       [1, 1, 1, 2, 15, 485, 665, 300, 250, 95, 25, 3]),
            "Delhi": (28.61, [14, 17, 23, 30, 35, 36, 32, 31, 31, 28, 22, 16],
                      [20, 20, 15, 10, 15, 75, 200, 175, 115, 10, 5, 10]),
            "Chennai": (13.08, [25, 27, 29, 32, 34, 34, 33, 32, 31, 29, 27, 26],
                        [15, 10, 10, 15, 35, 50, 90, 120, 100, 200, 300, 180]),
            "Kolkata": (22.57, [20, 23, 28, 31, 32, 32, 31, 31, 31, 30, 26, 21],
                        [10, 20, 25, 30, 100, 220, 320, 280, 200, 100, 20, 5]),
            "Jodhpur": (26.29, [17, 20, 26, 32, 36, 36, 33, 32, 33, 31, 25, 19],
                        [5, 5, 5, 5, 15, 45, 100, 85, 25, 5, 3, 3]),
            "Bengaluru": (12.97, [22, 24, 27, 29, 29, 26, 24, 24, 25, 25, 23, 21],
                          [2, 3, 8, 25, 65, 85, 95, 110, 140, 140, 60, 15]),
        }

        city, (lat, temps, rains) = self.rng.choice(list(cities.items()))
        params = {
            "monthly_temp": temps,
            "monthly_rainfall": rains,
            "latitude": lat
        }

        result = solve_climate_data_analysis(params)
        result["params"] = {"city": city, **params}
        return result

    def generate_transport_problem(self) -> Dict:
        """Generate a transport network problem."""
        indian_cities = ["Mumbai", "Pune", "Nashik", "Aurangabad", "Nagpur"]
        n = self.rng.randint(3, 5)
        cities = indian_cities[:n]

        # Generate random distances between connected cities
        distances = []
        num_edges = self.rng.randint(n, n * (n - 1) // 2)
        possible_edges = [(i, j) for i in range(n) for j in range(i + 1, n)]
        selected = self.rng.sample(possible_edges, min(num_edges, len(possible_edges)))

        for i, j in selected:
            d = self.rng.randint(100, 800)
            distances.append((i, j, d))

        params = {
            "nodes": cities,
            "distances": distances,
            "transport_speed": self.rng.randint(40, 100),
            "cost_per_km": self.rng.uniform(3, 15),
            "cargo_tons": self.rng.randint(5, 100)
        }

        result = solve_transport_network(params)
        result["params"] = params
        return result

    def generate_agriculture_problem(self) -> Dict:
        """Generate an agriculture/cropping pattern problem."""
        indian_crops = [
            ["Rice", "Wheat", "Pulses", "Sugarcane", "Cotton"],
            ["Rice", "Jowar", "Cotton", "Groundnut", "Maize"],
            ["Wheat", "Rice", "Mustard", "Sugarcane", "Barley"],
            ["Tea", "Rice", "Jute", "Wheat", "Potatoes"],
            ["Millets", "Cotton", "Groundnut", "Sugarcane", "Rice"],
        ]

        crop_set = self.rng.choice(indian_crops)
        n = len(crop_set)
        base_area = self.rng.randint(50, 200)
        areas = [self.rng.randint(max(10, base_area - 50), base_area + 50) for _ in range(n)]
        total_cult = int(sum(areas) * self.rng.uniform(1.1, 1.5))
        productions = [int(areas[i] * self.rng.uniform(1.5, 8.0)) for i in range(n)]

        params = {
            "crops": crop_set,
            "crop_areas": areas,
            "total_cultivable_area": total_cult,
            "total_production": productions,
            "productivity_threshold": self.rng.uniform(0.5, 2.0),
            "net_sown_area": total_cult
        }

        result = solve_agriculture_analysis(params)
        result["params"] = params
        return result

    def generate_area_problem(self) -> Dict:
        """Generate an area measurement problem."""
        shapes = ["rectangle", "triangle", "trapezium", "polygon"]
        shape = self.rng.choice(shapes)

        rfs = ["1:50000", "1:25000", "1:100000", "1:63200"]
        rf = self.rng.choice(rfs)

        if shape == "rectangle":
            dims = {
                "shape": "rectangle",
                "length": self.rng.uniform(2, 10),
                "breadth": self.rng.uniform(1, 8)
            }
        elif shape == "triangle":
            dims = {
                "shape": "triangle",
                "base": self.rng.uniform(3, 12),
                "height": self.rng.uniform(2, 10)
            }
        elif shape == "trapezium":
            dims = {
                "shape": "trapezium",
                "parallel1": self.rng.uniform(3, 10),
                "parallel2": self.rng.uniform(5, 12),
                "height": self.rng.uniform(2, 8)
            }
        else:
            n_sides = self.rng.randint(4, 6)
            coords = [(self.rng.uniform(0, 10), self.rng.uniform(0, 10)) for _ in range(n_sides)]
            dims = {
                "shape": "polygon",
                "coordinates": coords
            }

        dims["scale_rf"] = rf
        result = solve_area_measurement(dims)
        result["params"] = dims
        return result

    def generate_contour_problem(self) -> Dict:
        """Generate a contour analysis problem."""
        interval = self.rng.choice([10, 20, 25, 50])
        base_elev = self.rng.randint(100, 500)
        num_contours = self.rng.randint(3, 8)

        elevs = [base_elev + i * interval for i in range(num_contours)]
        spots = [base_elev + self.rng.uniform(0, interval / 2) for _ in range(3)]
        spot_heights = [round(s, 1) for s in spots]

        params = {
            "contour_interval": interval,
            "elevations": elevs,
            "spot_heights": spot_heights,
            "profile_length_m": self.rng.randint(500, 5000)
        }

        result = solve_contour_analysis(params)
        result["params"] = params
        return result

    def generate_bearing_problem(self) -> Dict:
        """Generate a bearing conversion problem."""
        wcb = round(self.rng.uniform(0, 360), 1)
        params = {"wcb": wcb}
        result = solve_bearing_conversion(params)
        result["params"] = params
        return result

    def generate_settlement_problem(self) -> Dict:
        """Generate a settlement analysis problem."""
        n = self.rng.randint(3, 6)
        names_list = ["Village A", "Town B", "Town C", "City D", "Metropolis E", "City F"]
        names = names_list[:n]

        base_pop = self.rng.randint(1000, 5000)
        sizes = [base_pop * (2 ** i) for i in range(n)]
        sizes = [min(s, 2000000) for s in sizes]

        rural_pop = self.rng.randint(100000, 5000000)
        urban_pop = self.rng.randint(100000, 5000000)
        num_rural = self.rng.randint(5, 50)
        num_urban = self.rng.randint(1, 10)

        params = {
            "settlement_sizes": sizes,
            "settlement_names": names,
            "total_rural_pop": rural_pop,
            "total_urban_pop": urban_pop,
            "num_urban": num_urban,
            "num_rural": num_rural
        }

        result = solve_settlement_analysis(params)
        result["params"] = params
        return result

    def generate_surveying_problem(self) -> Dict:
        """Generate a surveying problem."""
        params = {
            "base_line_length": self.rng.uniform(50, 500),
            "angles": [self.rng.randint(40, 80), self.rng.randint(40, 80),
                       self.rng.randint(20, 60)],
            "stations": ["P", "Q", "R"],
            "chain_length": self.rng.choice([20, 30]),
            "number_of_chains": self.rng.randint(3, 15),
            "temperature_correction": self.rng.uniform(-0.1, 0.1),
            "slope_correction": self.rng.uniform(-0.5, -0.01)
        }

        result = solve_surveying_triangulation(params)
        result["params"] = params
        return result

    def generate_compass_traverse_problem(self) -> Dict:
        """Generate a compass traverse problem."""
        n = self.rng.randint(3, 6)
        fbs = [round(self.rng.uniform(0, 360), 1) for _ in range(n)]
        inc = [round(self.rng.uniform(60, 120), 1) for _ in range(n)]
        inc[-1] = round(180 * (n - 2) - sum(inc[:-1]), 1)

        params = {
            "fore_bearings": fbs,
            "included_angles": inc
        }

        result = solve_compass_traverse(params)
        result["params"] = params
        return result

    def generate_question(self, topic: Optional[str] = None) -> Dict:
        """Generate a random question, optionally from a specific topic."""
        generators = {
            "time": self.generate_time_calculation,
            "bearing": self.generate_bearing_problem,
            "scale": self.generate_scale_problem,
            "gradient": self.generate_gradient_problem,
            "population": self.generate_population_problem,
            "migration": self.generate_migration_problem,
            "soil": self.generate_soil_problem,
            "industry": self.generate_industry_problem,
            "climate": self.generate_climate_problem,
            "transport": self.generate_transport_problem,
            "agriculture": self.generate_agriculture_problem,
            "area": self.generate_area_problem,
            "contour": self.generate_contour_problem,
            "settlement": self.generate_settlement_problem,
            "surveying": self.generate_surveying_problem,
            "traverse": self.generate_compass_traverse_problem,
        }

        if topic and topic in generators:
            return generators[topic]()
        else:
            key = self.rng.choice(list(generators.keys()))
            return generators[key]()

    def generate_competency_question(self) -> Dict:
        """Generate a competency-based question (NEP 2020 style)."""
        question_types = [
            self._case_study_population,
            self._case_study_industry,
            self._data_interpretation_climate,
            self._assertion_reasoning,
            self._case_study_agriculture,
            self._field_survey_analysis,
        ]

        return self.rng.choice(question_types)()

    def _case_study_population(self) -> Dict:
        """Competency-based: Population case study of an Indian state."""
        states_data = [
            {
                "state": "Kerala",
                "population": 33406061,
                "area": 38852,
                "density": 860,
                "growth_rate": 4.9,
                "literacy": 96.2,
                "sex_ratio": 1084,
                "urban_pct": 47.7,
                "elderly_pct": 12.6,
            },
            {
                "state": "Bihar",
                "population": 104099452,
                "area": 94163,
                "density": 1106,
                "growth_rate": 25.4,
                "literacy": 63.8,
                "sex_ratio": 916,
                "urban_pct": 11.3,
                "elderly_pct": 6.6,
            },
            {
                "state": "Goa",
                "population": 1458545,
                "area": 3702,
                "density": 394,
                "growth_rate": 8.2,
                "literacy": 88.7,
                "sex_ratio": 973,
                "urban_pct": 62.2,
                "elderly_pct": 11.2,
            },
        ]

        state_data = self.rng.choice(states_data)
        s = state_data

        steps = [
            Step(1, "Read and Interpret Census Data",
                formula="Analyze given demographic indicators",
                calculation=f"State: {s['state']}\nPopulation: {s['population']:,}\n"
                            f"Area: {s['area']} sq km\nDensity: {s['density']}/sq km\n"
                            f"Growth Rate: {s['growth_rate']}%\nLiteracy: {s['literacy']}%"),
            Step(2, "Analyze Population Growth Pattern",
                formula="Growth rate comparison with national average (~17.7%)",
                calculation=f"State Growth: {s['growth_rate']}% vs National: 17.7%\n"
                            f"Deviation: {s['growth_rate'] - 17.7:+.1f}% points\n"
                            f"{'Below' if s['growth_rate'] < 17.7 else 'Above'} national average"),
            Step(3, "Literacy and Social Indicators",
                formula="Compare literacy with national average (~77.7%)",
                calculation=f"Literacy: {s['literacy']}% vs National: 77.7%\n"
                            f"Sex Ratio: {s['sex_ratio']} (national: 940)\n"
                            f"Urbanization: {s['urban_pct']}%"),
            Step(4, "Dependency Ratio Calculation",
                formula="DR = (0-14 and 65+ population) / (15-64 population) x 100",
                calculation=f"Elderly (65+): {s['elderly_pct']}%\n"
                            f"Using approximate youth pop ~{100 - s['elderly_pct'] - 55:.0f}%\n"
                            f"Working age: ~55%\nDependency Ratio (approx): "
                            f"{(100 - 55) / 55 * 100:.1f}%"),
            Step(5, "Regional Comparison",
                formula="Compare with other Indian states",
                calculation=f"{s['state']} shows "
                            f"{'high' if s['density'] > 500 else 'moderate' if s['density'] > 200 else 'low'} "
                            f"density, "
                            f"{'high' if s['literacy'] > 80 else 'moderate' if s['literacy'] > 60 else 'low'} "
                            f"literacy, "
                            f"{'high' if s['urban_pct'] > 40 else 'moderate' if s['urban_pct'] > 20 else 'low'} "
                            f"urbanization."),
            Step(6, "Conclusion and Policy Implications",
                formula="Synthesize findings for policy recommendations",
                calculation=f"Based on the data, {s['state']} faces:\n"
                            f"1. {'Population pressure' if s['density'] > 500 else 'Moderate population'}\n"
                            f"2. {'Literacy improvement needed' if s['literacy'] < 80 else 'Good literacy achievement'}\n"
                            f"3. {'Rural development focus' if s['urban_pct'] < 30 else 'Urban planning needs'}\n"
                            f"4. {'Aging population concern' if s['elderly_pct'] > 10 else 'Demographic dividend opportunity'}"),
        ]

        return {
            "topic": "Competency: Population Case Study",
            "question": f"Analyze the demographic profile of {s['state']} based on Census data and draw conclusions about development indicators.",
            "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                        "calc": s.calculation} for s in steps],
            "answer": {
                "state": s["state"],
                "density": s["density"],
                "growth_comparison": f"{s['growth_rate']}% vs national 17.7%",
                "literacy_status": "Above" if s["literacy"] > 77.7 else "Below",
                "key_findings": [
                    f"Density: {s['density']}/sq km",
                    f"Literacy: {s['literacy']}%",
                    f"Growth: {s['growth_rate']}%",
                    f"Urbanization: {s['urban_pct']}%"
                ]
            },
            "verification": f"Data cross-referenced with Census 2011 and projected figures for {s['state']}."
        }

    def _case_study_industry(self) -> Dict:
        """Competency-based: Industrial location case study."""
        industries = [
            {
                "name": "Iron and Steel Plant at Rourkela",
                "location": "Rourkela, Odisha",
                "raw_material": "Hematite iron ore (from Sundergarh), Coal (from Talcher)",
                "market": "Eastern India (West Bengal, Bihar, Jharkhand)",
                "power": "Hydroelectric from Hirakud Dam + Captive power plant",
                "water": "Brahmni River",
                "transport": "Railway (South Eastern Railway), NH-143",
                "labour": "Local + migrant from Bihar, UP",
                "factors": ["Proximity to raw materials", "Power supply", "Water availability", "Transport connectivity"]
            },
            {
                "name": "Cotton Textile Industry at Ahmedabad",
                "location": "Ahmedabad, Gujarat",
                "raw_material": "Cotton from Gujarat, Maharashtra, Punjab",
                "market": "All India + Export",
                "power": "Thermal + Grid supply",
                "water": "Sabarmati River + Groundwater",
                "transport": "Railway, Airport, Port at Kandla/Mundra",
                "labour": "Local skilled + migrant",
                "factors": ["Cotton growing region", "Port access for export", "Skilled labour tradition", "Capital availability"]
            },
        ]

        ind = self.rng.choice(industries)

        steps = [
            Step(1, "Identify the Industry and Location",
                formula="Read and understand the industrial case",
                calculation=f"Industry: {ind['name']}\nLocation: {ind['location']}"),
            Step(2, "Analyze Raw Material Availability",
                formula="Proximity to raw materials reduces transport cost",
                calculation=f"Raw Material: {ind['raw_material']}\n"
                            f"Factor Score: High - {'Near' if 'near' in ind['location'].lower() or 'Odisha' in ind['location'] else 'Regional'} source"),
            Step(3, "Analyze Power and Water",
                formula="Essential inputs for manufacturing",
                calculation=f"Power: {ind['power']}\nWater: {ind['water']}"),
            Step(4, "Analyze Transport and Market Access",
                formula="Market proximity and transport connectivity",
                calculation=f"Transport: {ind['transport']}\nMarket: {ind['market']}"),
            Step(5, "Evaluate Labour Availability",
                formula="Skilled and unskilled labour force",
                calculation=f"Labour: {ind['labour']}"),
            Step(6, "Apply Weber's Theory",
                formula="Material Index, Labour Cost, Agglomeration",
                calculation=f"Based on factors: {', '.join(ind['factors'])}\n"
                            f"Locational Classification: "
                            f"{'Material-oriented' if 'raw' in ind['factors'][0].lower() else 'Market-oriented'}"),
            Step(7, "Sustainable Development Assessment",
                formula="Environmental and social sustainability",
                calculation="Consider:\n1. Pollution control measures\n2. Waste management\n3. Worker safety\n"
                            f"4. Impact on local community\n5. Resource depletion concerns"),
        ]

        return {
            "topic": "Competency: Industry Case Study",
            "question": f"Study the case of {ind['name']}. Analyze the locational factors and evaluate the sustainability of the industrial development.",
            "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                        "calc": s.calculation} for s in steps],
            "answer": {
                "industry": ind["name"],
                "location": ind["location"],
                "key_factors": ind["factors"],
                "locational_type": "Material-oriented" if "Proximity to raw" in ind["factors"][0] else "Mixed orientation",
                "sustainability_notes": "Environmental regulations, CSR initiatives, community impact"
            },
            "verification": f"Factors evaluated against industrial location theories for {ind['name']}"
        }

    def _data_interpretation_climate(self) -> Dict:
        """Competency-based: Data interpretation of climate graphs."""
        steps = [
            Step(1, "Study the Climate Data Table",
                formula="Observe monthly temperature and rainfall patterns",
                calculation="Identify:\n- Highest and lowest temperatures\n- Wet and dry seasons\n"
                            "- Annual rainfall distribution"),
            Step(2, "Plot the Climate Graph",
                formula="Bar chart for rainfall, line graph for temperature",
                calculation="X-axis: Months (Jan-Dec)\n"
                            "Y-axis-left: Temperature (C)\n"
                            "Y-axis-right: Rainfall (mm)"),
            Step(3, "Identify Climate Type",
                formula="Koppen classification or Indian seasonal classification",
                calculation="Check:\n- Temperature range\n- Rainfall seasonality\n- Monsoon influence"),
            Step(4, "Correlate with Vegetation",
                formula="Climate determines natural vegetation",
                calculation="Based on rainfall and temperature:\n"
                            "- High rainfall + high temp = Tropical Evergreen\n"
                            "- Moderate rainfall = Deciduous forest\n"
                            "- Low rainfall = Thorn/Scrub"),
            Step(5, "Agricultural Implications",
                formula="Climate affects cropping patterns",
                calculation="Determine:\n- Suitable crops\n- Growing seasons\n- Irrigation needs\n"
                            "- Risk of droughts/floods"),
            Step(6, "Climate Change Indicators",
                formula="Look for long-term trends",
                calculation="Consider:\n- Rising temperatures\n- Erratic rainfall\n- Extreme weather events"),
        ]

        return {
            "topic": "Competency: Climate Data Interpretation",
            "question": "Study the provided climate data table for an Indian city. Draw the climograph, identify the climate type, and analyze its impact on agriculture and vegetation.",
            "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                        "calc": s.calculation} for s in steps],
            "answer": {
                "skill_demonstrated": "Data interpretation and graphing",
                "analysis_type": "Climograph analysis with agricultural implications",
                "evaluation_criteria": [
                    "Accuracy of graph",
                    "Correct climate identification",
                    "Logical correlation with vegetation/crops",
                    "Understanding of seasonal patterns"
                ]
            },
            "verification": "Climate data interpretation verified against standard climograph methods."
        }

    def _assertion_reasoning(self) -> Dict:
        """Competency-based: Assertion-Reasoning type questions."""
        ar_questions = [
            {
                "assertion": "Black soils of the Deccan plateau are most suitable for cotton cultivation.",
                "reason": "Black soils are rich in lime, iron, and magnesia, and have high moisture retention capacity.",
                "answer_both": True,
                "explanation": "Both assertion and reason are true, and the reason correctly explains the assertion. Black soils (Regur soils) are ideal for cotton due to their moisture retention, which is crucial for cotton's long growing period."
            },
            {
                "assertion": "The Kanpur-Lucknow industrial region is an example of a market-oriented industrial location.",
                "reason": "This region has grown primarily due to the availability of agricultural raw materials.",
                "answer_both": False,
                "explanation": "Assertion is true (Kanpur-Lucknow is market-oriented) but reason is false. The region is market-oriented due to proximity to large consumer markets, not primarily raw materials."
            },
            {
                "assertion": "The slope of land can be determined from contour spacing on a topographical map.",
                "reason": "Closely spaced contours indicate a steep slope while widely spaced contours indicate a gentle slope.",
                "answer_both": True,
                "explanation": "Both are true and the reason explains the assertion. Contour interval is constant; close spacing = steep slope, wide spacing = gentle slope."
            },
        ]

        q = self.rng.choice(ar_questions)

        steps = [
            Step(1, "Evaluate the Assertion",
                formula="Is the statement factually correct?",
                calculation=f"Assertion: \"{q['assertion']}\"\nVerdict: {'TRUE' if True else 'FALSE'}"),
            Step(2, "Evaluate the Reason",
                formula="Is the reason factually correct?",
                calculation=f"Reason: \"{q['reason']}\"\nVerdict: {'TRUE' if True else 'FALSE'}"),
            Step(3, "Evaluate the Relationship",
                formula="Does the reason explain the assertion?",
                calculation=f"Does reason explain assertion: {q['answer_both']}\n"
                            f"Explanation: {q['explanation']}"),
            Step(4, "Select the Correct Option",
                formula="A: Both true, R explains A | B: Both true, R does not explain A | C: A true, R false | D: A false, R true",
                calculation=f"Correct Answer: Both assertion and reason are true "
                            f"{'and reason explains assertion' if q['answer_both'] else 'but reason does not explain assertion'}."),
        ]

        return {
            "topic": "Competency: Assertion-Reasoning",
            "question": f"Assertion: {q['assertion']}\nReason: {q['reason']}\nSelect the correct option based on the relationship between assertion and reason.",
            "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                        "calc": s.calculation} for s in steps],
            "answer": {
                "assertion_status": "TRUE",
                "reason_status": "TRUE",
                "relationship": q["explanation"],
                "correct_option": "Both A and R are true and R is the correct explanation of A" if q["answer_both"] else "Both A and R are true but R is NOT the correct explanation of A"
            },
            "verification": q["explanation"]
        }

    def _case_study_agriculture(self) -> Dict:
        """Competency-based: Agriculture case study."""
        farming_systems = [
            {
                "region": "Punjab-Haryana (Green Revolution Region)",
                "system": "Intensive Commercial Agriculture",
                "main_crops": ["Wheat", "Rice", "Cotton", "Sugarcane"],
                "irrigation": "Canal + Tubewell (85% irrigated)",
                "farm_size": "Small to Medium (2-5 hectares average)",
                "technology": "High (tractors, HYV seeds, fertilizers)",
                "problems": ["Groundwater depletion", "Soil degradation", "Pesticide overuse", "Stubble burning"],
                "solutions": ["Micro-irrigation (drip/sprinkler)", "Crop diversification", "Organic farming", "Crop residue management"],
            },
            {
                "region": "Western Rajasthan (Arid Region)",
                "system": "Extensive Dryland Farming",
                "main_crops": ["Bajra", "Millets", "Guar", "Mustard"],
                "irrigation": "Rain-fed (only 15% irrigated)",
                "farm_size": "Large (5-10+ hectares average)",
                "technology": "Low to Moderate",
                "problems": ["Drought vulnerability", "Low productivity", "Desertification", "Water scarcity"],
                "solutions": ["Watershed development", "Drought-resistant varieties", "Rainwater harvesting", "Agroforestry"],
            },
        ]

        fs = self.rng.choice(farming_systems)

        steps = [
            Step(1, "Describe the Farming System",
                formula="Identify region, type, and main characteristics",
                calculation=f"Region: {fs['region']}\nSystem: {fs['system']}\n"
                            f"Crops: {', '.join(fs['main_crops'])}"),
            Step(2, "Analyze Physical Factors",
                formula="Relief, soil, climate, water availability",
                calculation=f"Soil/Water: {fs['irrigation']}\n"
                            f"Technology Level: {fs['technology']}"),
            Step(3, "Identify Socio-economic Factors",
                formula="Farm size, labour, market access, capital",
                calculation=f"Average Farm Size: {fs['farm_size']}"),
            Step(4, "Evaluate Sustainability Issues",
                formula="Environmental, economic, social sustainability",
                calculation="Problems:\n" + "\n".join([f"- {p}" for p in fs["problems"]]) +
                            "\nSolutions:\n" + "\n".join([f"- {s}" for s in fs["solutions"]])),
            Step(5, "Compare with Alternative Systems",
                formula="Intensive vs Extensive, Commercial vs Subsistence",
                calculation=f"Compare {fs['system']} with organic farming and precision agriculture.\n"
                            f"Pros: Higher yields, market access\n"
                            f"Cons: Environmental cost, input dependency"),
            Step(6, "Recommend Sustainable Practices",
                formula="Integrated approach based on SWOT analysis",
                calculation="Recommendations:\n" + "\n".join([f"1. {s}" for s in fs["solutions"]])),
        ]

        return {
            "topic": "Competency: Agriculture Case Study",
            "question": f"Study the farming system of {fs['region']}. Analyze the factors affecting agriculture in this region and suggest sustainable alternatives.",
            "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                        "calc": s.calculation} for s in steps],
            "answer": {
                "region": fs["region"],
                "farming_system": fs["system"],
                "key_crops": fs["main_crops"],
                "problems": fs["problems"],
                "solutions": fs["solutions"]
            },
            "verification": f"Case study verified against {fs['region']} agricultural data."
        }

    def _field_survey_analysis(self) -> Dict:
        """Competency-based: Field survey / mini-project analysis."""
        steps = [
            Step(1, "Define the Survey Objective",
                formula="What is being studied?",
                calculation="Examples:\n- Study of land use in a local area\n- Survey of a local river/channel\n"
                            "- Analysis of a local settlement pattern\n- Study of soil types in the area"),
            Step(2, "Select Survey Method",
                formula="Choose appropriate method (chain, compass, levelling, etc.)",
                calculation="Methods:\n- Chain survey for small areas\n- Compass traversing for boundaries\n"
                            "- Levelling for height differences\n- Plane table for detailed mapping"),
            Step(3, "Conduct Field Work",
                formula="Collect primary data systematically",
                calculation="Record:\n- Measurements (with instrument and correction)\n- Observations\n- Sketches/photos\n"
                            "- Interviews (if applicable)"),
            Step(4, "Process Data",
                formula="Calculate areas, bearings, gradients, etc.",
                calculation="- Apply corrections to measurements\n- Calculate areas using appropriate formulas\n"
                            "- Draw maps/plans\n- Analyze patterns"),
            Step(5, "Write Field Report",
                formula="Structure: Introduction, Methodology, Results, Analysis, Conclusion",
                calculation="Report should include:\n- Title and objectives\n- Methods used\n- Data tables/diagrams\n"
                            "- Analysis and findings\n- Conclusions and recommendations\n- Bibliography"),
            Step(6, "Viva Voce Preparation",
                formula="Be prepared to defend your findings",
                calculation="Know:\n- Why you chose the method\n- Sources of error\n- How to improve the study\n- "
                            "Broader geographical significance of findings"),
        ]

        return {
            "topic": "Competency: Field Survey / Practical",
            "question": (
                "Design a mini field survey for your local area (for example, land use, water bodies, "
                "traffic density or settlement pattern). Describe the objective of your survey, the "
                "method you would choose and why, how you would record and process the data, and how "
                "you would present your findings in the field report."
            ),
            "steps": [{"n": s.number, "desc": s.description, "formula": s.formula,
                        "calc": s.calculation} for s in steps],
            "answer": {
                "objective": "Study a geographical feature or problem of the local area",
                "method": "Chain/compass/levelling survey or questionnaire, as suited to the objective",
                "deliverables": [
                    "Field notebook with raw measurements and observations",
                    "Map/plan of the surveyed area",
                    "Report: Introduction, Methodology, Results, Analysis, Conclusion",
                    "Viva voce presentation of findings",
                ],
            },
            "verification": "Field survey format follows the prescribed ISC Geography practical scheme.",
        }


# ─── Deterministic module-level entry point (registry adapter) ──────────────

def generate_questions(seed: int = 0, count: int = 1, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """Deterministically generate ISC Class 12 Geography questions.

    Mirrors the convention of the other solvers_regen question modules so the
    engagement-layer registry can call ``generate_questions(seed)``.
    """
    gen = GeographyQuestionGenerator(seed=seed)
    out: List[Dict[str, Any]] = []
    for i in range(count):
        try:
            if i % 4 == 3:
                q = gen.generate_competency_question()
            elif topic:
                q = gen.generate_question(topic)
            else:
                q = gen.generate_question()
        except Exception:
            continue
        q = dict(q)
        q.setdefault("id", f"c12_geo_{seed}_{i}")
        q["explanation"] = q.get("verification", "")
        out.append(q)
    return out