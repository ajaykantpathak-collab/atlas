"""
Class 9 Geography — Deterministic Solver
Covers: c9_geo_001 | c9_geo_002 | c9_geo_003
All functions are pure (no randomness, no LLM calls).
"""

from __future__ import annotations
import math
from dataclasses import dataclass, field
from typing import Optional


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

MAIN_LATITUDES: dict[str, float] = {
    "Equator":          0.0,
    "Tropic of Cancer": 23.5,
    "Tropic of Capricorn": -23.5,
    "Arctic Circle":    66.5,
    "Antarctic Circle": -66.5,
    "North Pole":       90.0,
    "South Pole":       -90.0,
}

HEAT_ZONES: list[dict] = [
    {"name": "Torrid",   "lower": -23.5, "upper": 23.5},
    {"name": "Temperate (North)", "lower": 23.5,  "upper": 66.5},
    {"name": "Temperate (South)", "lower": -66.5, "upper": -23.5},
    {"name": "Frigid (North)",    "lower": 66.5,  "upper": 90.0},
    {"name": "Frigid (South)",    "lower": -90.0, "upper": -66.5},
]

LONGITUDE_TO_TIME: float = 4.0   # minutes per degree
IST_LONGITUDE: float = 82.5      # degrees East
IDL_LONGITUDE: float = 180.0     # degrees


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

@dataclass
class EarthFacts:
    """Verified facts used by the solver."""
    shape: str = "Oblate spheroid (appears spherical)"
    equatorial_diameter_km: float = 12_756.0
    polar_diameter_km: float = 12_714.0
    circumference_km: float = 40_075.0

    SPHERICAL_EVIDENCES: list[str] = field(default_factory=lambda: [
        "Circumnavigation — travelling west returns you to the start point.",
        "Ship disappearing hull-first — curvature hides the lower part first.",
        "Circular horizon — from any point the horizon is always a circle.",
        "Pole Star altitude changes with latitude — angle = observer's latitude.",
        "Lunar eclipse shadow — Earth casts a round shadow on the Moon.",
        "Photographs from space clearly show a spherical Earth.",
    ])

    UNIQUE_FEATURES: list[str] = field(default_factory=lambda: [
        "Hydrosphere — abundant liquid water covering ~71% of surface.",
        "Atmosphere — breathable mix of N₂, O₂ with protective ozone layer.",
        "Biosphere — supports millions of species of plant and animal life.",
    ])

    LIFE_CONDITIONS: list[str] = field(default_factory=lambda: [
        "Suitable temperature — neither too hot nor too cold for life.",
        "Oxygen — breathable atmosphere essential for most organisms.",
        "Liquid water — solvent for biochemical reactions.",
        "Protective atmosphere — shields from harmful solar UV and meteorites.",
        "Magnetic field — deflects solar winds.",
    ])


def solve_spherical_evidence_question(evidence_name: str) -> dict:
    """
    Given the name/keyword of an evidence, return the description and explanation.

    Parameters
    ----------
    evidence_name : str
        Keyword e.g. "ship", "circumnavigation", "pole star", "horizon"

    Returns
    -------
    dict with keys: matched_evidence, explanation
    """
    ef = EarthFacts()
    name_lower = evidence_name.lower().strip()
    mapping = {
        "ship":           ef.SPHERICAL_EVIDENCES[1],
        "circumnavigation": ef.SPHERICAL_EVIDENCES[0],
        "horizon":        ef.SPHERICAL_EVIDENCES[2],
        "pole star":      ef.SPHERICAL_EVIDENCES[3],
        "lunar eclipse":  ef.SPHERICAL_EVIDENCES[4],
        "space":          ef.SPHERICAL_EVIDENCES[5],
    }
    matched = "No direct match. Valid keys: ship, circumnavigation, horizon, pole star, lunar eclipse, space"
    explanation = ""
    for key, val in mapping.items():
        if key in name_lower:
            matched = val
            explanation = (
                "Because Earth is curved, the hull (lower part) of a receding "
                "ship is hidden by the curve before the mast. On a flat surface "
                "the entire ship would shrink uniformly."
            ) if key == "ship" else (
                "This observation was first made by Magellan's crew (1519–1522). "
                "If Earth were flat, they would have reached an edge instead of "
                "their starting port."
            ) if key == "circumnavigation" else (
                "The altitude of the Pole Star above the horizon equals the "
                "observer's latitude: at the Equator it sits on the horizon (0°), "
                "at the North Pole it is overhead (90°). This can only happen on "
                "a curved surface."
            ) if key == "pole star" else (
                "A flat plane would have a flat horizon at eye level; only a "
                "sphere produces a perfectly circular horizon from every viewing point."
            ) if key == "horizon" else (
                "During a lunar eclipse Earth blocks sunlight from reaching the Moon; "
                "the shadow edge is always curved, which can only be cast by a sphere."
            ) if key == "lunar eclipse" else (
                "Satellite imagery provides unambiguous visual proof of Earth's "
                "spherical shape."
            )
            break

    return {"matched_evidence": matched, "explanation": explanation}


def solve_heat_zone_query(latitude: float) -> dict:
    """
    Given a latitude value, return the heat zone name and description.

    Parameters
    ----------
    latitude : float
        Latitude in degrees (positive = North, negative = South)

    Returns
    -------
    dict with keys: latitude, zone_name, description
    """
    for zone in HEAT_ZONES:
        if zone["lower"] <= latitude <= zone["upper"]:
            return {
                "latitude": latitude,
                "zone_name": zone["name"],
                "description": _zone_description(zone["name"]),
            }
    return {"latitude": latitude, "zone_name": "Unknown", "description": ""}


def _zone_description(name: str) -> str:
    descriptions = {
        "Torrid":           "Hottest zone; Sun is directly overhead at least once a year. Lies between Tropic of Cancer and Tropic of Capricorn.",
        "Temperate (North)": "Moderate climate zone; lies between Tropic of Cancer and Arctic Circle.",
        "Temperate (South)": "Moderate climate zone; lies between Tropic of Capricorn and Antarctic Circle.",
        "Frigid (North)":    "Coldest zone; experiences polar day and polar night. Lies north of Arctic Circle.",
        "Frigid (South)":    "Coldest zone; experiences polar day and polar night. Lies south of Antarctic Circle.",
    }
    return descriptions.get(name, "")


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def solve_latitude_lookup(name: str) -> dict:
    """
    Look up the degree value of a named latitude line.

    Parameters
    ----------
    name : str
        e.g. "Equator", "Tropic of Cancer", "Arctic Circle"

    Returns
    -------
    dict with keys: name, degrees, hemisphere, description
    """
    key = name.strip().lower()
    data: dict[str, dict] = {
        "equator": {
            "degrees": 0.0, "hemisphere": "Neither (divides both)",
            "description": "The great circle 0° from the Equator; divides Earth into Northern and Southern Hemispheres."
        },
        "tropic of cancer": {
            "degrees": 23.5, "hemisphere": "North",
            "description": "Northernmost latitude where the Sun is directly overhead at noon on the June solstice."
        },
        "tropic of capricorn": {
            "degrees": -23.5, "hemisphere": "South",
            "description": "Southernmost latitude where the Sun is directly overhead at noon on the December solstice."
        },
        "arctic circle": {
            "degrees": 66.5, "hemisphere": "North",
            "description": "Boundary beyond which the Sun does not set on at least one day in summer."
        },
        "antarctic circle": {
            "degrees": -66.5, "hemisphere": "South",
            "description": "Boundary beyond which the Sun does not set on at least one day in the Southern summer."
        },
        "north pole": {
            "degrees": 90.0, "hemisphere": "North",
            "description": "Northernmost point on Earth; all directions point south."
        },
        "south pole": {
            "degrees": -90.0, "hemisphere": "South",
            "description": "Southernmost point on Earth; all directions point north."
        },
    }
    if key not in data:
        valid = ", ".join(data.keys())
        return {"error": f"Unknown latitude '{name}'. Valid: {valid}"}
    return {"name": name.title(), **data[key]}


def solve_heat_zone(latitude: float) -> dict:
    """
    Determine which heat zone a latitude falls in.

    Parameters
    ----------
    latitude : float
        Latitude in degrees

    Returns
    -------
    dict with keys: latitude, zone, boundaries, characteristics
    """
    for zone in HEAT_ZONES:
        if zone["lower"] <= latitude <= zone["upper"]:
            chars = {
                "Torrid":           "Hottest zone; receives almost vertical sun rays year-round.",
                "Temperate (North)": "Moderate temperatures; four distinct seasons.",
                "Temperate (South)": "Moderate temperatures; four distinct seasons.",
                "Frigid (North)":    "Extremely cold; polar day (6 months daylight) and polar night.",
                "Frigid (South)":    "Extremely cold; polar day and polar night.",
            }
            return {
                "latitude": latitude,
                "zone": zone["name"],
                "boundaries": f"{zone['lower']}° to {zone['upper']}°",
                "characteristics": chars.get(zone["name"], ""),
            }
    return {"error": "Latitude out of range (-90 to 90)."}


def solve_parallel_count() -> dict:
    """
    Total number of parallels of latitude.
    """
    return {
        "total_parallels": 180,
        "explanation": (
            "Latitude ranges from 90°N to 90°S, i.e. 180 degrees. "
            "If we draw a line every degree, we get 180 parallels (including Equator)."
        ),
    }


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def solve_time_difference(longitude_deg: float) -> dict:
    """
    Calculate time difference from GMT given a longitude.

    Parameters
    ----------
    longitude_deg : float
        Degrees East (+) or West (−) of Prime Meridian

    Returns
    -------
    dict with keys: longitude, time_diff_minutes, time_diff_hours, ahead_or_behind
    """
    diff_min = longitude_deg * LONGITUDE_TO_TIME
    diff_hr = diff_min / 60.0
    direction = "ahead" if longitude_deg >= 0 else "behind"
    return {
        "longitude": longitude_deg,
        "time_diff_minutes": round(abs(diff_min), 2),
        "time_diff_hours": round(abs(diff_hr), 2),
        "direction": direction,
        "formula_note": "1° longitude = 4 minutes; Earth rotates 360° in 24 hours.",
    }


def solve_local_time(longitude_deg: float, gmt_reference: str = "12:00") -> dict:
    """
    Compute local time at a given longitude when GMT is known.

    Parameters
    ----------
    longitude_deg : float
    gmt_reference : str  e.g. "12:00"

    Returns
    -------
    dict with keys: gmt, longitude, local_time, operation
    """
    diff = longitude_deg * LONGITUDE_TO_TIME / 60.0  # in hours
    parts = gmt_reference.strip().split(":")
    gmt_hr, gmt_min = int(parts[0]), int(parts[1]) if len(parts) > 1 else 0
    total_gmt_min = gmt_hr * 60 + gmt_min
    local_min = total_gmt_min + int(diff * 60)
    local_min = local_min % (24 * 60)
    local_hr = local_min // 60
    local_mn = local_min % 60
    op = "Add" if longitude_deg >= 0 else "Subtract"
    return {
        "gmt": gmt_reference,
        "longitude": longitude_deg,
        "offset_hours": round(diff, 2),
        "operation": f"{op} {abs(round(diff,2))} h from GMT",
        "local_time": f"{local_hr:02d}:{local_mn:02d}",
    }


def solve_ist_from_gmt(gmt_str: str = "00:00") -> dict:
    """
    Convert GMT to IST (82.5°E, +5h 30m).

    Parameters
    ----------
    gmt_str : str  e.g. "14:00"

    Returns
    -------
    dict with keys: gmt, ist, calculation
    """
    ist_offset_hr = IST_LONGITUDE * LONGITUDE_TO_TIME / 60.0  # 82.5 × 4/60 = 5.5
    parts = gmt_str.strip().split(":")
    gmt_hr, gmt_min = int(parts[0]), int(parts[1]) if len(parts) > 1 else 0
    total_gmt_min = gmt_hr * 60 + gmt_min
    ist_total_min = total_gmt_min + int(ist_offset_hr * 60)
    ist_total_min %= (24 * 60)
    ist_hr = ist_total_min // 60
    ist_mn = ist_total_min % 60
    return {
        "gmt": gmt_str,
        "ist": f"{ist_hr:02d}:{ist_mn:02d}",
        "calculation": (
            f"IST = GMT + {int(ist_offset_hr)}h {int((ist_offset_hr%1)*60)}m "
            f"(82.5°E × 4 min/° = {int(IST_LONGITUDE*4)} min = 5h 30m)"
        ),
    }


def solve_idl_crossing(current_longitude: float,
                        crossing_to: float,
                        direction: str) -> dict:
    """
    Determine date change when crossing the International Date Line.

    Parameters
    ----------
    current_longitude : float   degrees East (+)
    crossing_to : float          degrees East (+) of destination meridian
    direction : str              "eastward" or "westward"

    Returns
    -------
    dict with keys: crossing_direction, date_change, explanation
    """
    if direction.lower() == "eastward":
        date_change = "subtract 1 day"
        reason = "Crossing eastward you 'gain' time (closer to the start of the day), so you must subtract a calendar day."
    elif direction.lower() == "westward":
        date_change = "add 1 day"
        reason = "Crossing westward you 'lose' time (further into the previous day), so you add a calendar day."
    else:
        return {"error": "direction must be 'eastward' or 'westward'."}

    return {
        "current_longitude": current_longitude,
        "destination_longitude": crossing_to,
        "crossing_direction": direction,
        "date_change": date_change,
        "explanation": reason,
        "idl_note": (
            "The IDL roughly follows the 180° meridian with zig-zags to avoid "
            "splitting countries. It is the 'reset point' for calendar dates."
        ),
    }


def solve_standard_time(longitude_of_place: float) -> dict:
    """
    Determine which standard time meridian a country near the given longitude
    would use (India uses 82.5°E).

    Parameters
    ----------
    longitude_of_place : float

    Returns
    -------
    dict with keys: place_longitude, nearest_standard_meridian, time_difference_from_ist
    """
    std_meridian = 82.5
    diff_deg = longitude_of_place - std_meridian
    diff_min = diff_deg * LONGITUDE_TO_TIME
    diff_hr = diff_min / 60.0
    direction = "ahead" if diff_deg >= 0 else "behind"

    return {
        "place_longitude": longitude_of_place,
        "india_standard_meridian": std_meridian,
        "time_difference_minutes": round(abs(diff_min), 2),
        "time_difference_hours": round(abs(diff_hr), 2),
        "direction_from_ist": direction,
    }


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def run_all_verifications() -> None:
    """Run self-tests. Raises AssertionError on failure."""
    print("Running solver verifications…")

    # c9_geo_001
    ev = solve_spherical_evidence_question("ship")
    assert "hull" in ev["matched_evidence"].lower(), "Ship evidence mismatch"

    hz = solve_heat_zone_query(0.0)
    assert hz["zone"] == "Torrid", f"Equator should be Torrid, got {hz['zone']}"

    # c9_geo_002
    lat = solve_latitude_lookup("Tropic of Cancer")
    assert lat["degrees"] == 23.5, f"Tropic of Cancer degrees: {lat['degrees']}"

    hz2 = solve_heat_zone(45.0)
    assert "Temperate" in hz2["zone"], f"45°N should be Temperate, got {hz2['zone']}"

    pc = solve_parallel_count()
    assert pc["total_parallels"] == 180

    # c9_geo_003
    td = solve_time_difference(15.0)
    assert td["time_diff_hours"] == 1.0, f"15° should = 1h, got {td['time_diff_hours']}"
    assert td["direction"] == "ahead"

    td2 = solve_time_difference(-30.0)
    assert td2["time_diff_hours"] == 2.0
    assert td2["direction"] == "behind"

    lt = solve_local_time(75.0, "12:00")
    assert lt["local_time"] == "17:00", f"Expected 17:00, got {lt['local_time']}"

    ist = solve_ist_from_gmt("09:00")
    assert ist["ist"] == "14:30", f"Expected 14:30, got {ist['ist']}"

    idl = solve_idl_crossing(170.0, -170.0, "westward")
    assert "add" in idl["date_change"].lower()

    st = solve_standard_time(88.0)
    assert st["time_difference_minutes"] == round((88.0 - 82.5) * 4, 2)

    print("✓ All solver verifications passed.")


if __name__ == "__main__":
    run_all_verifications()

    print("\n── Demo ──")
    print(solve_latitude_lookup("Equator"))
    print(solve_heat_zone(10.0))
    print(solve_local_time(15.0, "10:00"))
    print(solve_ist_from_gmt("02:00"))
    print(solve_idl_crossing(0, 0, "eastward"))