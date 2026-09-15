"""
Class 5 Geography – Solver
CISCE Primary Curriculum | Geography | Class 5
Nodes: c5_geo_001 (Latitudes), c5_geo_002 (Longitudes), c5_geo_003 (Geographic Grid)
"""

from __future__ import annotations
import math

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

MAIN_LATITUDES: list[dict] = [
    {"name": "Equator",           "code": "EQ", "degrees": 0.0,  "north": False, "largest": True},
    {"name": "Tropic of Cancer",  "code": "TC", "degrees": 23.5, "north": True,  "largest": False},
    {"name": "Tropic of Capricorn","code": "TP","degrees": 23.5, "north": False, "largest": False},
    {"name": "Arctic Circle",     "code": "AC", "degrees": 66.5, "north": True,  "largest": False},
    {"name": "Antarctic Circle",  "code": "AN", "degrees": 66.5, "north": False, "largest": False},
    {"name": "North Pole",        "code": "NP", "degrees": 90.0, "north": True,  "largest": False},
    {"name": "South Pole",        "code": "SP", "degrees": 90.0, "north": False, "largest": False},
]

MAIN_LONGITUDES: list[dict] = [
    {"name": "Prime Meridian",    "code": "PM", "degrees": 0.0,   "east": None,  "idl": False},
    {"name": "180° East",         "code": "E180","degrees": 180.0, "east": True,  "idl": True},
    {"name": "180° West",         "code": "W180","degrees": 180.0, "east": False, "idl": True},
]

CITIES: list[dict] = [
    {"name": "Delhi",    "lat": 28.6,  "lat_dir": "N", "lon": 77.2,  "lon_dir": "E"},
    {"name": "Mumbai",   "lat": 19.0,  "lat_dir": "N", "lon": 72.8,  "lon_dir": "E"},
    {"name": "Chennai",  "lat": 13.1,  "lat_dir": "N", "lon": 80.3,  "lon_dir": "E"},
    {"name": "London",   "lat": 51.5,  "lat_dir": "N", "lon": 0.0,   "lon_dir": "W"},
    {"name": "New York", "lat": 40.7,  "lat_dir": "N", "lon": 74.0,  "lon_dir": "W"},
    {"name": "Sydney",   "lat": 33.9,  "lat_dir": "S", "lon": 151.2, "lon_dir": "E"},
    {"name": "Tokyo",    "lat": 35.7,  "lat_dir": "N", "lon": 139.7, "lon_dir": "E"},
    {"name": "Cairo",    "lat": 30.0,  "lat_dir": "N", "lon": 31.2,  "lon_dir": "E"},
]

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def get_latitude(name: str) -> dict | None:
    """Return the latitude record matching the given name (case-insensitive)."""
    for lat in MAIN_LATITUDES:
        if lat["name"].lower() == name.strip().lower():
            return dict(lat)
    return None

def get_longitude(name: str) -> dict | None:
    """Return the longitude record matching the given name (case-insensitive)."""
    for lon in MAIN_LONGITUDES:
        if lon["name"].lower() == name.strip().lower():
            return dict(lon)
    return None

def latitude_hemisphere(degrees: float) -> str:
    """Return 'Northern' or 'Southern' hemisphere for a given latitude value."""
    if degrees > 0:
        return "Northern"
    elif degrees < 0:
        return "Southern"
    else:
        return "Neither (on the Equator)"

def longitude_hemisphere(degrees: float) -> str:
    """Return 'Eastern' or 'Western' hemisphere for a given longitude value."""
    if degrees > 0:
        return "Eastern"
    elif degrees < 0:
        return "Western"
    else:
        return "Neither (on the Prime Meridian)"

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def lat_distance(lat1: float, lat2: float) -> float:
    """
    Return the absolute angular distance in degrees between two latitudes.
    Each degree of latitude ≈ 111 km on Earth's surface.
    """
    return round(abs(lat1 - lat2), 1)

def lon_distance(lon1: float, lon2: float) -> float:
    """
    Return the absolute angular distance in degrees between two longitudes.
    (Simplified — does not account for convergence toward the poles.)
    """
    return round(abs(lon1 - lon2), 1)

def angular_to_km(degrees: float) -> float:
    """Convert degrees of latitude to approximate kilometres (1° ≈ 111 km)."""
    return round(degrees * 111, 0)

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def classify_latitude_line(degrees: float) -> str:
    """Return the name of the latitude line at the given degrees, or 'Unknown'."""
    for lat in MAIN_LATITUDES:
        if math.isclose(lat["degrees"], degrees):
            return lat["name"]
    return "Unknown"

def classify_longitude_line(degrees: float) -> str:
    """Return the name of the longitude line at the given degrees, or 'Unknown'."""
    for lon in MAIN_LONGITUDES:
        if math.isclose(lon["degrees"], abs(degrees)):
            if degrees == 0:
                return lon["name"]
            return f"{lon['name']} ({'E' if degrees > 0 else 'W'})"
    return "Unknown"

def identify_city(lat: float, lon: float, tolerance: float = 2.0) -> str | None:
    """
    Try to identify a city from its latitude and longitude.
    tolerance is in degrees for both axes.
    """
    for city in CITIES:
        if (abs(city["lat"] - lat) <= tolerance and
                abs(city["lon"] - lon) <= tolerance):
            return city["name"]
    return None

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def validate_coordinate(lat: float, lon: float) -> dict:
    """
    Validate a (latitude, longitude) pair.
    Returns dict with 'valid' (bool), 'errors' (list), 'warnings' (list).
    """
    errors: list[str] = []
    warnings: list[str] = []

    if not -90 <= lat <= 90:
        errors.append(f"Latitude {lat}° is out of range. Must be between -90° and 90°.")
    if not -180 <= lon <= 180:
        errors.append(f"Longitude {lon}° is out of range. Must be between -180° and 180°.")

    if -90 < lat < 0:
        warnings.append(f"Latitude {lat}° is in the Southern Hemisphere.")
    elif 0 < lat <= 90:
        warnings.append(f"Latitude {lat}° is in the Northern Hemisphere.")

    if 0 < lon <= 180:
        warnings.append(f"Longitude {lon}° is in the Eastern Hemisphere.")
    elif -180 <= lon < 0:
        warnings.append(f"Longitude {lon}° is in the Western Hemisphere.")

    return {"valid": len(errors) == 0, "errors": errors, "warnings": warnings}

def verify_mcq_answer(question_data: dict, selected: str) -> dict:
    """
    Verify a multiple-choice answer.
    question_data must contain 'answer' (the correct option letter, e.g. 'A').
    selected is the option letter chosen by the student.
    Returns dict with 'correct' (bool), 'correct_answer', 'explanation'.
    """
    correct = selected.strip().upper() == question_data["answer"].strip().upper()
    return {
        "correct": correct,
        "correct_answer": question_data["answer"],
        "explanation": question_data.get("explanation", ""),
    }

def verify_fib_answer(question_data: dict, student_answer: str) -> dict:
    """
    Verify a fill-in-the-blank answer.
    Accepts if the student's answer matches any entry in the 'acceptable_answers'
    list (case-insensitive, whitespace-normalised).
    """
    cleaned = student_answer.strip().lower()
    acceptable = [a.strip().lower() for a in question_data.get("acceptable_answers", [])]
    correct = cleaned in acceptable
    return {
        "correct": correct,
        "correct_answers": question_data.get("acceptable_answers", []),
        "explanation": question_data.get("explanation", ""),
    }

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

def explain_latitude(latitude_name: str) -> str:
    """
    Return a step-by-step explanation for a given latitude line.
    """
    lat = get_latitude(latitude_name)
    if not lat:
        return f"'{latitude_name}' is not one of the main latitudes taught in Class 5."

    steps = [
        f"STEP 1 – Identify the line: The {lat['name']} is a {lat['code']} latitude line.",
        f"STEP 2 – Note the value: It is located at {lat['degrees']}° {'North' if lat['north'] else 'South' if lat['degrees'] != 0 else '(the Equator)'}.",
    ]
    if lat["largest"]:
        steps.append(
            "STEP 3 – Special fact: It is the largest latitude circle because it runs "
            "right around the middle (equator) of the Earth."
        )
    if lat["code"] in ("TC", "TP"):
        steps.append(
            "STEP 3 – Special fact: The Tropic of Cancer and Tropic of Capricorn "
            "mark the northern and southern limits of the Sun's direct overhead position."
        )
    if lat["code"] in ("AC", "AN"):
        steps.append(
            "STEP 3 – Special fact: The Arctic and Antarctic Circles mark the regions "
            "where, for at least one day a year, the Sun does not set (summer) or rise (winter)."
        )
    if lat["code"] in ("NP", "SP"):
        steps.append(
            "STEP 3 – Special fact: The Poles are points, not circles, where all "
            "longitude lines meet."
        )
    return "\n".join(steps)

def explain_longitude(longitude_name: str) -> str:
    """
    Return a step-by-step explanation for a given longitude reference.
    """
    lon = get_longitude(longitude_name)
    if not lon:
        return f"'{longitude_name}' is not one of the main longitudes taught in Class 5."

    steps = [
        f"STEP 1 – Identify the line: The {lon['name']} is a key meridian (longitude line).",
        f"STEP 2 – Note the value: It is at {lon['degrees']}° {'East' if lon['east'] else 'West' if lon['east'] is not None else '(Prime Meridian)'}.",
    ]
    if lon["code"] == "PM":
        steps.append(
            "STEP 3 – Special fact: The Prime Meridian runs through Greenwich, England. "
            "It divides Earth into the Eastern Hemisphere (right/east) and "
            "Western Hemisphere (left/west)."
        )
    if lon["idl"]:
        steps.append(
            "STEP 3 – Special fact: The 180°E and 180°W meridians meet at the "
            "International Date Line. Crossing it changes the calendar date."
        )
    return "\n".join(steps)

def solve_lat_distance(name1: str, name2: str) -> dict:
    """
    Compute the angular distance (and approximate km) between two named latitudes.
    """
    lat1 = get_latitude(name1)
    lat2 = get_latitude(name2)
    if not lat1 or not lat2:
        return {"error": "One or both latitude names are not recognised."}

    dist_deg = lat_distance(lat1["degrees"], lat2["degrees"])
    dist_km  = angular_to_km(dist_deg)

    return {
        "latitude_1": lat1["name"],
        "latitude_2": lat2["name"],
        "degrees_1": lat1["degrees"],
        "degrees_2": lat2["degrees"],
        "distance_degrees": dist_deg,
        "distance_km": int(dist_km),
        "steps": [
            f"  • {lat1['name']} is at {lat1['degrees']}°",
            f"  • {lat2['name']} is at {lat2['degrees']}°",
            f"  • Difference = |{lat1['degrees']} − {lat2['degrees']}| = {dist_deg}°",
            f"  • In kilometres: {dist_deg}° × 111 km/° ≈ {int(dist_km)} km",
        ],
    }

def solve_hemisphere_check(place: str, lat: float) -> dict:
    """
    Determine the hemisphere of a place given its latitude.
    """
    result = validate_coordinate(lat, 0.0)
    hemi = latitude_hemisphere(lat)
    return {
        "place": place,
        "latitude": lat,
        "hemisphere": hemi,
        "valid": result["valid"],
        "steps": [
            f"STEP 1: {place} is at {lat}° latitude.",
            f"STEP 2: {'North' if lat > 0 else 'South' if lat < 0 else 'The Equator is neither — it is the boundary line.'}",
            f"RESULT: {place} lies in the {hemi} Hemisphere.",
        ],
    }

def solve_lon_hemisphere_check(place: str, lon: float) -> dict:
    """
    Determine the hemisphere of a place given its longitude.
    """
    result = validate_coordinate(0.0, lon)
    hemi = longitude_hemisphere(lon)
    return {
        "place": place,
        "longitude": lon,
        "hemisphere": hemi,
        "valid": result["valid"],
        "steps": [
            f"STEP 1: {place} is at {lon}° longitude.",
            f"STEP 2: {'East' if lon > 0 else 'West' if lon < 0 else 'On the Prime Meridian — boundary line.'}",
            f"RESULT: {place} lies in the {hemi} Hemisphere.",
        ],
    }

def get_city_info(city_name: str) -> dict | None:
    """Return city coordinate info by name, or None if not found."""
    for city in CITIES:
        if city["name"].lower() == city_name.strip().lower():
            return dict(city)
    return None

def get_all_latitude_names() -> list[str]:
    return [lat["name"] for lat in MAIN_LATITUDES]

def get_all_longitude_names() -> list[str]:
    return [lon["name"] for lon in MAIN_LONGITUDES]