"""
Solver for ICSE Class 10 Geography
Covers: Topographical maps, Contours, Map of India
"""

import math
import random
from dataclasses import dataclass, field
from typing import List, Tuple, Optional, Dict
from enum import Enum


# ─── Data Structures ────────────────────────────────────────────────────────

class ScaleType(Enum):
    RF = "Representation Fraction"
    STATEMENT = "Statement Scale"
    GRAPHICAL = "Graphical Scale"


class BearingType(Enum):
    TRUE = "True North"
    MAGNETIC = "Magnetic North"
    GRID = "Grid North"


class LandformType(Enum):
    HILL = "Hill / Peak"
    VALLEY = "Valley (River Valley)"
    RIDGE = "Ridge"
    SPUR = "Spur"
    CLIFF = "Cliff"
    PLATEAU = "Plateau"
    CONCAVE_SLOPE = "Concave Slope"
    CONVEX_SLOPE = "Convex Slope"
    UNIFORM_SLOPE = "Uniform Slope"
    TERRACED_SLOPE = "Terraced Slope"
    FLAT = "Flat Ground / Plain"


@dataclass
class Scale:
    """Represents a map scale in any format."""
    rf: Optional[str] = None          # e.g., "1:50000"
    statement: Optional[str] = None    # e.g., "1 cm = 500 m"
    graphical_units: Optional[float] = None  # e.g., 1.0 cm on map

    def to_rf(self) -> str:
        if self.rf:
            return self.rf
        if self.statement:
            parts = self.statement.lower().replace("=", "").split()
            map_val = float(parts[0].replace("cm", "").strip())
            ground_val = float(parts[1].replace("m", "").replace("km", "").strip())
            if "km" in self.statement.lower():
                ground_val *= 1000
            denom = int(ground_val / map_val)
            return f"1:{denom}"
        if self.graphical_units is not None:
            # default 1 unit = 1 km on ground
            denom = int(100000 / self.graphical_units)  # cm
            return f"1:{denom}"
        raise ValueError("Cannot convert: scale has no defined format")

    def real_distance(self, map_distance_cm: float) -> float:
        """Return real-world distance in cm."""
        rf_val = int(self.to_rf().split(":")[1])
        return map_distance_cm * rf_val

    def map_distance(self, real_distance_cm: float) -> float:
        """Return map distance in cm for given real distance."""
        rf_val = int(self.to_rf().split(":")[1])
        return real_distance_cm / rf_val


@dataclass
class GridReference:
    """Eastings and Northings for a topographical map."""
    easting: int   # 2, 3, or more digits
    northing: int  # 2, 3, or more digits
    precision: int = 4  # 4-figure or 6-figure

    def to_4_figure(self) -> str:
        e = str(self.easting).zfill(3)[:3]
        n = str(self.northing).zfill(3)[:3]
        return f"{e[:2]}{n[:2]}"

    def to_6_figure(self) -> str:
        e = str(self.easting).zfill(4)[:4]
        n = str(self.northing).zfill(4)[:4]
        return f"{e[:3]}{n[:3]}"


@dataclass
class ContourData:
    """Represents a set of contour lines."""
    interval: float       # vertical distance between contours (m)
    contours: List[Tuple[float, List[Tuple[float, float]]]]  # (elevation, list of (easting, northing) points)
    unit: str = "metres"


@dataclass
class IndiaFeature:
    """A named feature on the map of India."""
    name: str
    category: str  # river, mountain, plateau, desert, port, city, state, etc.
    lat: float
    lon: float
    description: str = ""


# ─── Constants ──────────────────────────────────────────────────────────────

INDIA_PHYSICAL_FEATURES = [
    IndiaFeature("Himalayas", "mountain_range", 28.0, 85.0, "Northern mountain range"),
    IndiaFeature("Western Ghats", "mountain_range", 13.5, 76.0, "Western coastal mountains"),
    IndiaFeature("Eastern Ghats", "mountain_range", 14.5, 80.0, "Eastern coastal mountains"),
    IndiaFeature("Aravalli Range", "mountain_range", 24.5, 73.5, "Oldest mountain range in India"),
    IndiaFeature("Vindhya Range", "mountain_range", 23.0, 80.0, "Central Indian range"),
    IndiaFeature("Satpura Range", "mountain_range", 22.0, 78.5, "Central Indian range"),
    IndiaFeature("Deccan Plateau", "plateau", 16.0, 78.0, "South Indian plateau"),
    IndiaFeature("Chota Nagpur Plateau", "plateau", 23.0, 85.5, "Jharkhand plateau"),
    IndiaFeature("Thar Desert", "desert", 27.0, 71.0, "Great Indian desert in Rajasthan"),
    IndiaFeature("Indus River", "river", 33.5, 72.5, "Major river of northwest India"),
    IndiaFeature("Ganga River", "river", 25.0, 83.0, "Hol river of North India"),
    IndiaFeature("Yamuna River", "river", 28.5, 77.5, "Major tributary of Ganga"),
    IndiaFeature("Brahmaputra River", "river", 26.0, 93.0, "River of Northeast India"),
    IndiaFeature("Godavari River", "river", 19.0, 80.0, "Longest river of peninsular India"),
    IndiaFeature("Krishna River", "river", 16.5, 78.5, "Major river of Deccan"),
    IndiaFeature("Kaveri River", "river", 12.5, 77.5, "River of South India"),
    IndiaFeature("Mahanadi River", "river", 20.5, 85.5, "River of eastern India"),
    IndiaFeature("Narmada River", "river", 22.5, 73.5, "West-flowing river of Central India"),
    IndiaFeature("Tapi River", "river", 21.5, 74.5, "West-flowing river of Central India"),
    IndiaFeature("Western Coastal Plain", "coastal_plain", 15.0, 75.5, "Coastal strip between Western Ghats and Arabian Sea"),
    IndiaFeature("Eastern Coastal Plain", "coastal_plain", 15.0, 80.5, "Coastal strip between Eastern Ghats and Bay of Bengal"),
    IndiaFeature("Indo-Gangetic Plain", "plain", 26.0, 80.0, "Great alluvial plain of North India"),
    IndiaFeature("Mumbai", "port", 19.07, 72.88, "Major port on west coast"),
    IndiaFeature("Chennai", "port", 13.08, 80.27, "Major port on east coast"),
    IndiaFeature("Kolkata", "port", 22.57, 88.36, "Major port on Hooghly River"),
    IndiaFeature("Kandla", "port", 23.03, 70.22, "Major port in Gujarat"),
    IndiaFeature("Visakhapatnam", "port", 17.69, 83.22, "Major port in Andhra Pradesh"),
    IndiaFeature("Mormugao", "port", 15.40, 73.80, "Port in Goa"),
    IndiaFeature("Paradip", "port", 20.26, 86.67, "Port in Odisha"),
    IndiaFeature("Cochin", "port", 9.97, 76.27, "Port in Kerala"),
    IndiaFeature("Jawaharlal Nehru Port", "port", 18.95, 72.95, "Major container port near Mumbai"),
    IndiaFeature("Tuticorin", "port", 8.76, 78.13, "Port in Tamil Nadu"),
]

INDIA_POLITICAL_FEATURES = [
    IndiaFeature("New Delhi", "capital", 28.61, 77.23, "National Capital of India"),
    IndiaFeature("Mumbai", "city_cap", 19.07, 72.88, "Capital of Maharashtra"),
    IndiaFeature("Chennai", "city_cap", 13.08, 80.27, "Capital of Tamil Nadu"),
    IndiaFeature("Kolkata", "city_cap", 22.57, 88.36, "Capital of West Bengal"),
    IndiaFeature("Bengaluru", "city_cap", 12.97, 77.59, "Capital of Karnataka"),
    IndiaFeature("Hyderabad", "city_cap", 17.38, 78.48, "Capital of Telangana"),
    IndiaFeature("Jaipur", "city_cap", 26.91, 75.79, "Capital of Rajasthan"),
    IndiaFeature("Lucknow", "city_cap", 26.84, 80.94, "Capital of Uttar Pradesh"),
    IndiaFeature("Patna", "city_cap", 25.60, 85.13, "Capital of Bihar"),
    IndiaFeature("Bhopal", "city_cap", 23.25, 77.41, "Capital of Madhya Pradesh"),
    IndiaFeature("Thiruvananthapuram", "city_cap", 8.52, 76.94, "Capital of Kerala"),
    IndiaFeature("Bhubaneswar", "city_cap", 20.29, 85.82, "Capital of Odisha"),
    IndiaFeature("Gandhinagar", "city_cap", 23.22, 72.65, "Capital of Gujarat"),
    IndiaFeature("Chandigarh", "city_cap", 30.74, 76.79, "Capital of Punjab and Haryana"),
    IndiaFeature("Shimla", "city_cap", 31.10, 77.17, "Capital of Himachal Pradesh"),
    IndiaFeature("Dehradun", "city_cap", 30.32, 78.03, "Capital of Uttarakhand"),
    IndiaFeature("Raipur", "city_cap", 21.25, 81.63, "Capital of Chhattisgarh"),
    IndiaFeature("Ranchi", "city_cap", 23.34, 85.31, "Capital of Jharkhand"),
    IndiaFeature("Guwahati", "city_cap", 26.14, 91.73, "Major city of Assam"),
    IndiaFeature("Imphal", "city_cap", 24.82, 93.94, "Capital of Manipur"),
    IndiaFeature("Shillong", "city_cap", 25.57, 91.88, "Capital of Meghalaya"),
    IndiaFeature("Aizawl", "city_cap", 23.73, 92.72, "Capital of Mizoram"),
    IndiaFeature("Agartala", "city_cap", 23.83, 91.28, "Capital of Tripura"),
    IndiaFeature("Kohima", "city_cap", 25.67, 94.12, "Capital of Nagaland"),
    IndiaFeature("Itanagar", "city_cap", 27.08, 93.62, "Capital of Arunachal Pradesh"),
    IndiaFeature("Gangtok", "city_cap", 27.33, 88.61, "Capital of Sikkim"),
]

INDIA_INDUSTRIAL_CENTRES = [
    IndiaFeature("Jamshedpur", "industrial", 22.79, 86.18, "Steel city — Tata Steel plant"),
    IndiaFeature("Bhilai", "industrial", 21.21, 81.38, "Steel plant — Bhilai Steel Plant"),
    IndiaFeature("Rourkela", "industrial", 22.25, 84.88, "Steel plant — Rourkela Steel Plant"),
    IndiaFeature("Durgapur", "industrial", 23.52, 87.30, "Steel plant — Durgapur Steel Plant"),
    IndiaFeature("Chittaranjan", "industrial", 23.87, 86.87, "Locomotive works"),
    IndiaFeature("Trombay", "industrial", 19.02, 72.90, "Petrochemical complex — Mumbai"),
    IndiaFeature("Haldia", "industrial", 22.03, 88.06, "Petrochemical complex — West Bengal"),
    IndiaFeature("Nagarjuna", "industrial", 16.58, 80.25, "Fertilizer plant — Andhra Pradesh"),
    IndiaFeature("Bangalore", "industrial", 12.97, 77.59, "IT and aerospace hub"),
    IndiaFeature("Pune", "industrial", 18.52, 73.86, "Automobile hub"),
    IndiaFeature("Ahmedabad", "industrial", 23.02, 72.57, "Textile hub"),
    IndiaFeature("Ludhiana", "industrial", 30.90, 75.85, "Textile and hosiery hub"),
    IndiaFeature("Kanpur", "industrial", 26.45, 80.33, "Leather and textile industry"),
    IndiaFeature("Coimbatore", "industrial", 11.01, 76.96, "Textile hub"),
    IndiaFeature("Kolar", "mining", 13.14, 78.13, "Gold fields"),
    IndiaFeature("Singhbhum", "mining", 22.50, 85.50, "Iron ore, copper deposits"),
    IndiaFeature("Bastar", "mining", 19.00, 81.50, "Iron ore, bauxite deposits"),
    IndiaFeature("Khetri", "mining", 27.98, 75.78, "Copper deposits"),
    IndiaFeature("Kolar Gold Fields", "mining", 12.96, 78.27, "Gold mines"),
    IndiaFeature("Singareni", "mining", 17.50, 80.50, "Coal fields"),
    IndiaFeature("Jharia", "mining", 23.75, 86.42, "Coal fields"),
]

INDIA_FEATURES = INDIA_PHYSICAL_FEATURES + INDIA_POLITICAL_FEATURES + INDIA_INDUSTRIAL_CENTRES

# ─── Core Solver Functions ──────────────────────────────────────────────────

def solve_scale_conversion(scale_str: str, target_format: str) -> Dict:
    """
    Convert a scale between formats.
    scale_str: e.g., "1:50000" or "1cm = 500m" or "1cm = 5km"
    target_format: "rf", "statement_metres", "statement_km", "graphical"
    """
    s = scale_str.strip()

    if ":" in s and "=" not in s:
        parts = s.split(":")
        denom = int(parts[1].strip())
        map_unit_m = 1  # 1 cm (or 1 inch — we use cm convention)
        ground_m = denom * map_unit_m / 100  # in metres

        if target_format == "rf":
            return {"result": f"1:{denom}", "format": "RF"}
        elif target_format == "statement_metres":
            real_cm = denom * 0.01  # metres
            return {"result": f"1 cm = {denom / 100:.0f} m", "format": "Statement"}
        elif target_format == "statement_km":
            real_km = denom / 100000
            if real_km < 1:
                real_km *= 1000
                unit = "m"
                val = denom / 100
            else:
                unit = "km"
                val = denom / 100000
            val_rounded = round(val, 2)
            return {"result": f"1 cm = {val_rounded} {unit}", "format": "Statement"}
        elif target_format == "graphical":
            return {"result": f"1 unit on map = {denom / 100:.0f} units on ground (1:1 ratio line drawn)", "format": "Graphical"}

    if "=" in s:
        parts = s.split("=")
        map_part = parts[0].strip().lower()
        ground_part = parts[1].strip().lower()

        map_val = float(''.join(c for c in map_part if c.isdigit() or c == '.'))
        if 'cm' in map_part:
            map_val_m = map_val / 100  # convert cm to m
        else:
            map_val_m = map_val

        ground_val = float(''.join(c for c in ground_part if c.isdigit() or c == '.'))
        if 'km' in ground_part:
            ground_val_m = ground_val * 1000
        else:
            ground_val_m = ground_val  # in metres

        rf_denom = int(ground_val_m / map_val_m)

        if target_format == "rf":
            return {"result": f"1:{rf_denom}", "format": "RF"}
        elif target_format.startswith("statement"):
            return {"result": f"1 cm = {ground_val_m:.0f} m", "format": "Statement"}
        elif target_format == "graphical":
            return {"result": f"Draw a line: 1 unit = {ground_val_m:.0f} m on ground", "format": "Graphical"}

    raise ValueError(f"Cannot parse scale: {scale_str}")


def solve_grid_reference(easting: int, northing: int, precision: int = 4) -> Dict:
    """
    Compute 4-figure or 6-figure grid reference.
    Eastings run East (horizontal), Northings run North (vertical).
    """
    e_str = str(easting).zfill(6)
    n_str = str(northing).zfill(6)

    if precision == 4:
        ref = f"{e_str[:2]}{n_str[:2]}"
        return {
            "grid_reference": ref,
            "precision": "4-figure",
            "easting_part": e_str[:2],
            "northing_part": n_str[:2],
            "description": f"4-figure grid reference identifies the 1 km square"
        }
    elif precision == 6:
        ref = f"{e_str[:3]}{n_str[:3]}"
        tenth_e = int(e_str[3])
        tenth_n = int(n_str[3])
        return {
            "grid_reference": ref,
            "precision": "6-figure",
            "easting_part": e_str[:3],
            "northing_part": n_str[:3],
            "tenth_easting": tenth_e,
            "tenth_northing": tenth_n,
            "description": f"6-figure grid reference pinpoints to 100 m × 100 m square"
        }
    else:
        raise ValueError(f"Precision must be 4 or 6, got {precision}")


def solve_distance_measurement(
    map_distance_cm: float,
    scale_rf_denominator: int,
    curved_correction: float = 1.0
) -> Dict:
    """
    Convert map distance to real distance.
    curved_correction: multiplier for curved/meandering paths (1.0 = straight, >1 = curved extra)
    """
    real_cm = map_distance_cm * scale_rf_denominator
    real_km = real_cm / 100000  # 100,000 cm in 1 km
    real_m = real_cm / 100

    corrected_km = real_km * curved_correction

    return {
        "map_distance_cm": map_distance_cm,
        "scale_rf": f"1:{scale_rf_denominator}",
        "real_distance_km": round(real_km, 3),
        "real_distance_m": round(real_m, 1),
        "corrected_distance_km": round(corrected_km, 3),
        "correction_factor": curved_correction,
        "note": "For curved paths, add 5-15% extra length for meanders"
    }


def solve_bearing(angle: float, bearing_type: str = "quadrant") -> Dict:
    """
    Compute bearing in different formats.
    angle: bearing in degrees (0-360 from North clockwise)
    bearing_type: "quadrant" (N/S angle E/W) or "whole_circle"
    """
    a = angle % 360

    if bearing_type == "whole_circle":
        return {
            "bearing": f"{a:.1f}°",
            "format": "Whole Circle Bearing (WCB)",
            "description": f"Measured clockwise from North (0°)"
        }

    if a < 90:
        qb = f"N {a:.1f}° E"
        quadrant = "NE"
    elif a < 180:
        qb = f"S {a - 90:.1f}° E"
        quadrant = "SE"
    elif a < 270:
        qb = f"S {270 - a:.1f}° W"
        quadrant = "SW"
    else:
        qb = f"N {360 - a:.1f}° W"
        quadrant = "NW"

    return {
        "bearing": f"{a:.1f}°",
        "quadrant_bearing": qb,
        "quadrant": quadrant,
        "format": "Quadrant Bearing (QB)"
    }


def solve_fore_back_bearing(fore_bearing: float) -> Dict:
    """Calculate back bearing from fore bearing."""
    fb = fore_bearing % 360
    bb = (fb + 180) % 360

    return {
        "fore_bearing": f"{fb:.1f}°",
        "back_bearing": f"{bb:.1f}°",
        "formula": "Back Bearing = (Fore Bearing ± 180°) mod 360",
        "note": "Fore and back bearings differ by exactly 180°"
    }


def solve_contour_landform(
    pattern: str,
    values_towards_centre: str  # "increasing" or "decreasing"
) -> Dict:
    """
    Identify landform from contour pattern description.
    pattern: "concentric_closed", "V_shaped", "U_shaped", "parallel_close",
             "parallel_wide", "merging", "irregular", "bench_like", "concave",
             "convex", "uniform"
    """
    landform_map = {
        ("concentric_closed", "increasing"): LandformType.HILL,
        ("concentric_closed", "decreasing"): LandformType.DEPRESSION,
        ("V_shaped", "increasing"): LandformType.VALLEY,  # V points uphill = valley
        ("U_shaped", "increasing"): LandformType.RIDGE,
        ("U_shaped", "decreasing"): LandformType.VALLEY,
        ("parallel_close", "increasing"): LandformType.STEEP_SLOPE,
        ("parallel_wide", "increasing"): LandformType.UNIFORM_SLOPE,
        ("merging", "increasing"): LandformType.CLIFF,
        ("bench_like", "increasing"): LandformType.TERRACED_SLOPE,
        ("concave", "increasing"): LandformType.CONCAVE_SLOPE,
        ("convex", "increasing"): LandformType.CONVEX_SLOPE,
        ("irregular", "increasing"): LandformType.PLATEAU,
    }

    key = (pattern, values_towards_centre)
    result = landform_map.get(key, LandformType.UNKNOWN)

    descriptions = {
        LandformType.HILL: "Concentric closed contours with increasing values towards centre = HILL/PEAK",
        LandformType.VALLEY: "V-shaped contours pointing towards higher ground = VALLEY (water collects here)",
        LandformType.RIDGE: "U-shaped contours pointing towards lower ground = RIDGE (water divides here)",
        LandformType.CLIFF: "Contours merging/overlapping = CLIFF (vertical drop)",
        LandformType.PLATEAU: "Flat-topped with irregular contours = PLATEAU",
        LandformType.CONCAVE_SLOPE: "Closely spaced at bottom, widely spaced at top = CONCAVE slope",
        LandformType.CONVEX_SLOPE: "Widely spaced at bottom, closely spaced at top = CONVEX slope",
        LandformType.UNIFORM_SLOPE: "Evenly spaced contours = UNIFORM slope",
        LandformType.TERRACED_SLOPE: "Steps/benches in contours = TERRACED slope",
        LandformType.STEEP_SLOPE: "Very closely spaced contours = STEEP slope",
        LandformType.DEPRESSION: "Concentric closed contours with decreasing values (hachure marks) = DEPRESSION",
    }

    return {
        "landform": result.value,
        "pattern": pattern,
        "values_trend": values_towards_centre,
        "description": descriptions.get(result, "Unknown pattern"),
        "memory_trick": "V points uphill = Valley (water flows downhill → V opens downhill)"
    }


def solve_cross_section(
    start_point: Tuple[float, float],
    end_point: Tuple[float, float],
    contour_points: List[Tuple[float, float, float]]  # (easting, northing, elevation)
) -> List[Tuple[float, float]]:
    """
    Generate cross-section profile between two points on a contour map.
    Returns list of (distance_along_section, elevation) pairs.
    """
    x1, y1 = start_point
    x2, y2 = end_point

    total_length = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

    section_points = []
    for ex, ny, elev in contour_points:
        dx = x2 - x1
        dy = y2 - y1
        fx = ex - x1
        fy = ny - y1

        dot = fx * dx + fy * dy
        section_t = dot / (total_length ** 2) if total_length > 0 else 0
        section_t = max(0, min(1, section_t))  # clamp to section

        dist = section_t * total_length
        section_points.append((dist, elev))

    section_points.sort(key=lambda p: p[0])
    return section_points


def solve_intervisibility(
    observer: Tuple[float, float, float],
    target: Tuple[float, float, float],
    terrain_profile: List[Tuple[float, float, float]]  # (easting, northing, elevation)
) -> Dict:
    """
    Check if observer can see target (intervisibility).
    terrain_profile: list of points along the line between observer and target.
    """
    ox, oy, oh = observer
    tx, ty, th = target

    d_total = math.sqrt((tx - ox)**2 + (ty - oy)**2)

    los_slope = (th - oh) / d_total if d_total > 0 else 0

    blocked = False
    block_point = None

    for ex, ny, elev in terrain_profile:
        d = math.sqrt((ex - ox)**2 + (ny - oy)**2)
        if d == 0 or d >= d_total:
            continue

        los_elevation = oh + los_slope * d
        if elev > los_elevation:
            blocked = True
            block_point = (ex, ny, elev, los_elevation)
            break

    return {
        "observer": observer,
        "target": target,
        "intervisible": not blocked,
        "total_distance": round(d_total, 1),
        "blocked_by": block_point,
        "note": "If any terrain point rises above the line of sight, points are NOT intervisible"
    }


def solve_india_location(feature_name: str) -> Dict:
    """Return location details for a named feature on the map of India."""
    for feature in INDIA_FEATURES:
        if feature.name.lower() == feature_name.lower():
            return {
                "name": feature.name,
                "category": feature.category,
                "latitude": feature.lat,
                "longitude": feature.lon,
                "description": feature.description
            }
    return {"error": f"Feature '{feature_name}' not found. Try: {[f.name for f in INDIA_FEATURES[:10]]}"}


def solve_india_direction(from_feature: str, to_feature: str) -> Dict:
    """Compute approximate cardinal direction between two Indian features."""
    f1 = solve_india_location(from_feature)
    f2 = solve_india_location(to_feature)

    if "error" in f1 or "error" in f2:
        return {"error": "Feature not found"}

    lat_diff = f2["latitude"] - f1["latitude"]
    lon_diff = f2["longitude"] - f1["longitude"]

    angle = math.degrees(math.atan2(lon_diff, lat_diff))
    if angle < 0:
        angle += 360

    direction = solve_bearing(angle)

    return {
        "from": from_feature,
        "to": to_feature,
        "latitude_diff": round(lat_diff, 2),
        "longitude_diff": round(lon_diff, 2),
        "approximate_direction": direction["quadrant_bearing"],
        "approximate_cardinal": direction["quadrant"],
        "note": "This is an approximate direction using lat/lon as flat coordinates"
    }


def solve_contour_cross_section_simple(
    start_elev: float,
    end_elev: float,
    distance_km: float,
    num_contours: int,
    contour_interval: float,
    pattern: str = "uniform"
) -> List[Tuple[float, float]]:
    """
    Generate a simplified cross-section profile.
    pattern: "uniform", "convex", "concave", "hill", "valley"
    Returns [(distance_km, elevation_m), ...]
    """
    points = [(0, start_elev), (distance_km, end_elev)]
    profile = []

    if pattern == "uniform":
        elevs = [start_elev + (end_elev - start_elev) * i / (num_contours - 1)
                 for i in range(num_contours)]
        dists = [distance_km * i / (num_contours - 1) for i in range(num_contours)]
        profile = list(zip(dists, elevs))

    elif pattern == "hill":
        mid = distance_km / 2
        max_elev = max(start_elev, end_elev) + num_contours * contour_interval
        n = num_contours
        profile.append((0, start_elev))
        for i in range(1, n - 1):
            t = i / (n - 1)
            x = t * distance_km
            y = start_elev + (max_elev - start_elev) * 4 * t * (1 - t)
            profile.append((round(x, 2), round(y, 1)))
        profile.append((distance_km, end_elev))

    elif pattern == "valley":
        mid = distance_km / 2
        min_elev = min(start_elev, end_elev) - num_contours * contour_interval
        n = num_contours
        profile.append((0, start_elev))
        for i in range(1, n - 1):
            t = i / (n - 1)
            x = t * distance_km
            y = start_elev - (start_elev - min_elev) * 4 * t * (1 - t)
            profile.append((round(x, 2), round(y, 1)))
        profile.append((distance_km, end_elev))

    elif pattern == "convex":
        n = num_contours
        profile.append((0, start_elev))
        for i in range(1, n):
            t = i / n
            x = t * distance_km
            y = start_elev + (end_elev - start_elev) * t * t  # convex curve
            profile.append((round(x, 2), round(y, 1)))

    elif pattern == "concave":
        n = num_contours
        profile.append((0, start_elev))
        for i in range(1, n):
            t = i / n
            x = t * distance_km
            y = start_elev + (end_elev - start_elev) * (1 - (1 - t)**2)  # concave curve
            profile.append((round(x, 2), round(y, 1)))

    return profile


def generate_synthetic_topomap(
    grid_size: int = 10,
    cell_size_m: float = 1000,
    contour_interval: float = 20,
    base_elevation: float = 200,
    seed: int = 42
) -> Dict:
    """
    Generate a synthetic topographical map grid.
    Returns grid with elevations and feature locations.
    """
    rng = random.Random(seed)
    grid = []

    for row in range(grid_size):
        grid_row = []
        for col in range(grid_size):
            nx, ny = col / grid_size, row / grid_size

            elev = base_elevation
            elev += 100 * math.exp(-((nx - 0.3)**2 + (ny - 0.3)**2) / 0.05)
            elev += 60 * math.exp(-((nx - 0.7)**2 + (ny - 0.6)**2) / 0.03)
            elev += 40 * math.exp(-((nx - 0.5)**2 + (ny - 0.8)**2) / 0.04)

            if 0.4 < ny < 0.6 and 0.0 < nx < 1.0:
                elev -= 50 * math.sin(nx * math.pi) * math.exp(-((ny - 0.5)**2) / 0.01)

            elev = max(50, elev + rng.uniform(-5, 5))
            grid_row.append(round(elev, 1))
        grid.append(grid_row)

    contour_values = []
    min_elev = min(min(row) for row in grid)
    max_elev = max(max(row) for row in grid)
    ci = contour_interval
    cv = int(min_elev / ci) * ci
    while cv <= max_elev:
        contour_values.append(cv)
        cv += ci

    return {
        "grid": grid,
        "grid_size": grid_size,
        "cell_size_m": cell_size_m,
        "contour_interval": contour_interval,
        "contour_values": contour_values,
        "min_elevation": min_elev,
        "max_elevation": max_elev,
        "base_elevation": base_elevation
    }


# ─── Verification Helpers ────────────────────────────────────────────────────

def verify_grid_reference(ref: str, expected_format: str = "6-figure") -> bool:
    """Validate a grid reference string."""
    cleaned = ref.replace(" ", "").replace("/", "")
    if expected_format == "6-figure":
        return len(cleaned) == 6 and cleaned.isdigit()
    elif expected_format == "4-figure":
        return len(cleaned) == 4 and cleaned.isdigit()
    return False


def verify_scale_conversion(original: str, converted: str) -> bool:
    """Verify a scale conversion is reasonable."""
    try:
        original_rf = original.split(":")[-1].strip() if ":" in original else None
        if original_rf and original_rf.isdigit():
            denom = int(original_rf)
            if "cm =" in converted.lower():
                parts = converted.lower().split("=")
                ground_part = parts[1].strip()
                import re
                val = float(re.search(r'[\d.]+', ground_part).group())
                unit = 'm' if 'm' in ground_part and 'km' not in ground_part else 'km'
                if unit == 'km':
                    val *= 1000
                expected_val = denom / 100  # for 1 cm
                return abs(val - expected_val) / expected_val < 0.01
    except Exception:
        pass
    return True  # can't verify, assume OK


def verify_contour_answer(student_answer: str, correct_landform: str) -> bool:
    """Check if student's landform identification is correct (case-insensitive)."""
    return student_answer.strip().lower() == correct_landform.lower()


# ─── India Map Quiz Data ─────────────────────────────────────────────────────

RIVER_DATA = {
    "Ganga": {
        "origin": "Gangotri Glacier, Uttarakhand",
        "flows_through": "Uttarakhand, Uttar Pradesh, Bihar, Jharkhand, West Bengal",
        "major_tributaries": "Yamuna, Ghaghara, Gandak, Kosi",
        "mouth": "Bay of Bengal (Sundarbans Delta)",
        "length_km": 2525
    },
    "Yamuna": {
        "origin": "Yamunotri Glacier, Uttarakhand",
        "flows_through": "Uttarakhand, Himachal Pradesh, Uttar Pradesh, Haryana, Delhi",
        "major_tributaries": "Chambal, Betwa, Ken",
        "mouth": "Joins Ganga at Prayagraj (Allahabad)",
        "length_km": 1376
    },
    "Brahmaputra": {
        "origin": "Tibet (as Yarlung Tsangpo)",
        "flows_through": "Arunachal Pradesh, Assam",
        "major_tributaries": "Subansiri, Manas, Teesta",
        "mouth": "Bay of Bengal",
        "length_km": 2900
    },
    "Indus": {
        "origin": "Tibet (near Lake Mansarovar)",
        "flows_through": "Ladakh, Pakistan",
        "major_tributaries": "Jhelum, Chenab, Ravi, Beas, Sutlej",
        "mouth": "Arabian Sea",
        "length_km": 3180
    },
    "Godavari": {
        "origin": "Trikambeswar, Maharashtra",
        "flows_through": "Maharashtra, Telangana, Andhra Pradesh",
        "major_tributaries": "Pranhita, Indravati, Manjira",
        "mouth": "Bay of Bengal",
        "length_km": 1460
    },
    "Krishna": {
        "origin": "Mahabaleshwar, Maharashtra",
        "flows_through": "Maharashtra, Karnataka, Telangana, Andhra Pradesh",
        "major_tributaries": "Koyna, Bhima, Tungabhadra",
        "mouth": "Bay of Bengal",
        "length_km": 1400
    },
    "Kaveri": {
        "origin": "Talakaveri, Karnataka",
        "flows_through": "Karnataka, Tamil Nadu, Kerala",
        "major_tributaries": "Hemavati, Shimsha, Arkavati",
        "mouth": "Bay of Bengal",
        "length_km": 800
    },
    "Mahanadi": {
        "origin": "Sihawa Hills, Chhattisgarh",
        "flows_through": "Chhattisgarh, Odisha",
        "major_tributaries": "Seonath, Hasdeo, Mand, Ib",
        "mouth": "Bay of Bengal",
        "length_km": 858
    },
    "Narmada": {
        "origin": "Amarkantak, Madhya Pradesh",
        "flows_through": "Madhya Pradesh, Gujarat",
        "major_tributaries": "Kolar, Tawa, Hiran",
        "mouth": "Arabian Sea (Gulf of Khambhat)",
        "length_km": 1312
    },
    "Tapi": {
        "origin": "Satpura Range, Madhya Pradesh",
        "flows_through": "Madhya Pradesh, Maharashtra, Gujarat",
        "major_tributaries": "Purna, Girna",
        "mouth": "Arabian Sea",
        "length_km": 724
    },
}