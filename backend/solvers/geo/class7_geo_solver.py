"""
CISCE Class 7 Geography - Solver and Question Generator
Covers all syllabus nodes: Topographical Maps, Atmosphere, Weather & Climate,
Weathering & Soil, Industries, Energy Resources, and Continental studies
(Europe, Africa, Australia, Antarctica).
"""

import math
import random
import hashlib
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

# ─────────────────────────────────────────────────────────────────────────────
# Seed helpers
# ─────────────────────────────────────────────────────────────────────────────

def _make_rng(seed: int) -> random.Random:
    rng = random.Random(seed)
    return rng


def _topic_key(topic: str, sub: str = "") -> str:
    return f"{topic}:{sub}".strip()


# ─────────────────────────────────────────────────────────────────────────────
# Data constants
# ─────────────────────────────────────────────────────────────────────────────

CONVENTIONAL_SIGNS = {
    "road_metalled": "Black line with red edge",
    "road_unmetalled": "Black line",
    "railway": "Single black line with cross-hatching",
    "river": "Blue line",
    "canal": "Blue line with short cross-lines",
    "settlement_rural": "Red dots / scattered houses",
    "settlement_urban": "Red square or larger symbol",
    "forest": "Green area with tree symbols",
    "well": "Blue circle",
    "temple": "Red triangle",
    "post_office": "Red circle with P",
    "police_station": "Red circle with star",
    "school": "Black square with flag",
    "contour_200m": "Brown line labelled 200",
    "benchmark": "Black arrow pointing to a dot labelled BM",
    "form_lines": "Hachured brown lines (hills without exact height)",
}

ATMOSPHERE_LAYERS = [
    ("Troposphere", "0-12 km", "Weather occurs here; temperature decreases with height"),
    ("Stratosphere", "12-50 km", "Ozone layer present; temperature increases with height"),
    ("Mesosphere", "50-80 km", "Meteors burn up here; temperature decreases with height"),
    ("Thermosphere", "80-700 km", "Auroras occur; temperature increases with height"),
    ("Exosphere", "700-10,000 km", "Outermost layer; merges with space"),
]

WEATHER_INSTRUMENTS = {
    "thermometer": "Measures temperature ( deg C)",
    "barometer": "Measures atmospheric pressure (mm Hg or hPa)",
    "rain_gauge": "Measures rainfall amount (mm)",
    "hygrometer": "Measures relative humidity (%)",
    "anemometer": "Measures wind speed",
    "wind_vane": "Shows wind direction",
    " Stevenson_screen": "Wooden box sheltering instruments; painted white, louvered sides",
}

WEATHERING_TYPES = {
    "mechanical": "Physical breakdown of rocks without chemical change - frost wedging, temperature expansion, root wedging",
    "chemical": "Chemical reaction altering rock minerals - oxidation, carbonation, hydration, solution",
    "biological": "Living organisms breaking rock - plant roots, lichen acids, burrowing animals",
}

SOIL_PROFILE = {
    "O_horizon": "Organic matter - humus, decomposed leaves",
    "A_horizon": "Topsoil - dark, rich in humus and nutrients",
    "E_horizon": "Eluviated (leaching) zone - lighter colour, minerals leached out",
    "B_horizon": "Subsoil - accumulation of clay, iron, aluminium (illuviation)",
    "C_horizon": "Parent rock - weathered rock fragments",
    "R_horizon": "Bedrock - unweathered solid rock beneath",
}

AGRO_INDUSTRIES = {
    "cotton_textile": {
        "raw_material": "Cotton",
        "major_states": "Maharashtra, Gujarat, Tamil Nadu",
        "products": "Cotton cloth, garments",
    },
    "jute_textile": {
        "raw_material": "Jute",
        "major_states": "West Bengal, Assam, Bihar",
        "products": "Jute bags, sacks, ropes",
    },
    "sugar": {
        "raw_material": "Sugarcane",
        "major_states": "Uttar Pradesh, Maharashtra, Karnataka",
        "products": "Sugar, molasses, bagasse",
    },
}

IRON_STEEL = {
    "raw_materials": ["Iron ore", "Coal (coke)", "Limestone", "Manganese"],
    "major_plants": [
        "Tata Steel (Jamshedpur, Jharkhand)",
        "SAIL (Bhilai, Chhattisgarh; Rourkela, Odisha; Durgapur, WB; Bokaro, Jharkhand)",
        "VISA Steel (Kalinganagar, Odisha)",
    ],
    "process_steps": [
        "Mining of iron ore and coal",
        "Ore concentration and washing",
        "Smelting in blast furnace → pig iron",
        "Steel making (basic oxygen furnace or electric arc)",
        "Rolling and shaping into finished products",
    ],
}

ENERGY_RESOURCES = {
    "conventional": {
        "coal": "Solid fossil fuel; found in Jharkhand, Odisha, Chhattisgarh",
        "petroleum": "Liquid fossil fuel; Assam, Gujarat, Mumbai High",
        "natural_gas": "Associated with petroleum; Krishna-Godavari basin",
        "hydel": "Electricity from falling water; Bhakra-Nangal, Tehri",
        "nuclear": "Energy from nuclear fission; Tarapur, Kalpakkam, Kudankulam",
    },
    "non_conventional": {
        "solar": "Photovoltaic cells convert sunlight; Rajasthan, Gujarat have high potential",
        "wind": "Wind turbines; Tamil Nadu, Gujarat, Maharashtra",
        "biogas": "Decomposition of organic waste; gobar gas in rural areas",
        "tidal": "Energy from ocean tides; Gulf of Kutch, Gulf of Khambhat",
        "geothermal": "Heat from Earth's interior; limited in India (Manikaran, HP)",
    },
}

CONTINENTS = {
    "europe": {
        "area": "10.18 million sq km (2nd smallest)",
        "countries": "~44 countries",
        "major_rivers": "Danube, Rhine, Volga, Seine",
        "climate": "Temperate; maritime in west, continental in east",
        "key_feature": "Most urbanised continent; oldest industrialised region",
        "major_plains": "East European Plain, North European Plain",
        "mountain_ranges": "Alps, Pyrenees, Carpathians, Urals",
    },
    "africa": {
        "area": "30.37 million sq km (2nd largest)",
        "countries": "54 countries",
        "major_rivers": "Nile (longest river), Congo, Niger, Zambezi",
        "climate": "Tropical; Sahara in north, savanna in centre, rainforest near equator",
        "key_feature": "Cradle of mankind; largest desert (Sahara) and longest river (Nile)",
        "major_deserts": "Sahara, Kalahari, Namib",
        "mountain_ranges": "Atlas, Drakensberg, Kilimanjaro (highest peak)",
    },
    "australia": {
        "area": "7.69 million sq km (smallest continent, largest island)",
        "countries": "1 country - Australia; includes Tasmania",
        "major_rivers": "Murray-Darling (longest), Darling",
        "climate": "Arid to temperate; most interior is desert",
        "key_feature": "Unique flora and fauna (marsupials); Great Barrier Reef",
        "major_deserts": "Great Victoria, Great Sandy, Simpson",
        "mountain_ranges": "Great Dividing Range, MacDonnell Ranges",
    },
    "antarctica": {
        "area": "14.2 million sq km (5th largest, but ~98% ice-covered)",
        "countries": "No countries; governed by Antarctic Treaty",
        "ice_sheet": "Largest single mass of ice on Earth; avg thickness 2,160 m",
        "climate": "Coldest, driest, windiest continent; -89.2  deg C recorded",
        "key_feature": "No permanent human residents; research stations only",
        "ice_shelves": "Ross Ice Shelf, Ronne Ice Shelf, Filchner Ice Shelf",
        "wildlife": "Penguins, seals, whales, krill (Southern Ocean)",
    },
}

MAP_SCALES_DEFAULT = {
    "statement": "1 cm represents 1 km",
    "rf": "1:100000",
    "linear_scale_value_cm": 1.0,
    "linear_scale_ground_km": 1.0,
}


# ─────────────────────────────────────────────────────────────────────────────
# Utility
# ─────────────────────────────────────────────────────────────────────────────

def _verdict(expected, got, tol=1e-6) -> str:
    if isinstance(expected, (int, float)) and isinstance(got, (int, float)):
        return "PASS" if abs(float(expected) - float(got)) <= tol else "FAIL"
    return "PASS" if str(expected).strip().lower() == str(got).strip().lower() else "FAIL"


# ─────────────────────────────────────────────────────────────────────────────
# TOPOGRAPHICAL MAP SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_contour_interpretation(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve contour interpretation problems.
    params: {
        "contour_values": [list of contour interval values along a profile],
        "contour_interval": float (metres),
        "question_subtype": "slope_type" | "hill_height" | "valley" | "landform"
    }
    """
    steps = []
    contour_values = params.get("contour_values", [100, 110, 120, 130, 140])
    interval = params.get("contour_interval", 10)
    subtype = params.get("question_subtype", "slope_type")

    steps.append(f"Given contour values: {contour_values}")
    steps.append(f"Contour interval = {interval} m")

    n = len(contour_values)
    diffs = [contour_values[i + 1] - contour_values[i] for i in range(n - 1)]
    steps.append(f"Height differences between successive contours: {diffs}")

    answer = {}
    verification = {}

    if subtype == "slope_type":
        avg_diff = sum(abs(d) for d in diffs) / len(diffs)
        steps.append(f"Average absolute height change = {avg_diff:.1f} m per contour")
        if avg_diff <= interval:
            slope_type = "Gentle slope"
            reason = "Contour lines are close together (small height change per contour spacing)"
        else:
            slope_type = "Steep slope"
            reason = "Contour lines are far apart (large height change per contour spacing)"
        steps.append(f"Conclusion: {slope_type} - {reason}")
        answer = {"slope_type": slope_type, "reason": reason}
        verification = {"avg_height_change_m": round(avg_diff, 2), "contour_interval_m": interval}

    elif subtype == "hill_height":
        highest = max(contour_values)
        lowest = min(contour_values)
        # add half-interval for approximate true height
        approx_max = highest + interval / 2
        approx_min = lowest - interval / 2
        hill_height = approx_max - approx_min
        steps.append(f"Highest contour: {highest} m, Lowest: {lowest} m")
        steps.append(f"Approximate true maximum height: {approx_max:.1f} m")
        steps.append(f"Approximate hill height (max - min): {hill_height:.1f} m")
        answer = {
            "highest_contour_m": highest,
            "lowest_contour_m": lowest,
            "approx_max_height_m": round(approx_max, 1),
            "approx_hill_height_m": round(hill_height, 1),
        }
        verification = {"back_substitution": f"{highest} + {interval}/2 = {approx_max:.1f}"}

    elif subtype == "valley":
        # V-shaped contours point uphill
        if all(d > 0 for d in diffs):
            valley = "Contours increase in the direction of the profile - this is a valley (V points uphill)"
        elif all(d < 0 for d in diffs):
            valley = "Contours decrease - ridge line (∩ shape)"
        else:
            valley = "Irregular profile - could be a saddle or plateau"
        steps.append(f"Direction of height change: {diffs}")
        steps.append(valley)
        answer = {"landform": valley}
        verification = {"height_changes": diffs}

    elif subtype == "landform":
        if all(d == 0 for d in diffs):
            landform = "Flat plain (no relief change)"
        elif all(d > 0 for d in diffs):
            landform = "Uniform rising slope / hill"
        elif all(d < 0 for d in diffs):
            landform = "Uniform falling slope / scarp"
        else:
            landform = "Undulating terrain / plateau with depression"
        steps.append(f"Height changes: {diffs}")
        steps.append(f"Landform identified: {landform}")
        answer = {"landform": landform}
        verification = {"diffs": diffs}

    return {
        "type": "topographical_map",
        "subtype": subtype,
        "answer": answer,
        "steps": steps,
        "verification": verification,
    }


def solve_grid_reference(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve grid reference problems.
    params: {
        "easting_digits": int (0-99),
        "northing_digits": int (0-99),
        "easting_sub": int (0-9),
        "northing_sub": int (0-9),
        "precision": "four_figure" | "six_figure"
    }
    """
    steps = []
    e_main = params.get("easting_digits", 47)
    n_main = params.get("northing_digits", 83)
    e_sub = params.get("easting_sub", 6)
    n_sub = params.get("northing_sub", 4)
    precision = params.get("precision", "four_figure")

    steps.append(f"Easting main: {e_main}, Northing main: {n_main}")
    four_fig = f"{e_main:02d}{n_main:02d}"
    six_fig = f"{e_main:02d}{n_main:02d}{e_sub}{n_sub}"

    steps.append(f"Four-figure grid reference: {four_fig}")
    steps.append(f"Six-figure grid reference: {six_fig}")

    steps.append("Method: Eastings are read first (x-axis, bottom of map), then Northings (y-axis, left of map).")
    steps.append("For six-figure, divide the 1 km^2 square into 100 m x 100 m sub-squares and read the sub-digit.")

    answer = {}
    if precision == "four_figure":
        answer = {"four_figure_grid_ref": four_fig}
        verification = {"easting_read": e_main, "northing_read": n_main}
    else:
        answer = {"six_figure_grid_ref": six_fig, "four_figure_grid_ref": four_fig}
        verification = {"e_sub_digit": e_sub, "n_sub_digit": n_sub,
                        "back_check": f"({e_main*1000 + e_sub*100}, {n_main*1000 + n_sub*100}) m from origin"}

    return {
        "type": "topographical_map",
        "subtype": "grid_reference",
        "answer": answer,
        "steps": steps,
        "verification": verification,
    }


def solve_scale_conversion(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve map scale conversion problems.
    params: {
        "conversion_type": "statement_to_rf" | "rf_to_statement" | "map_to_ground" | "ground_to_map",
        "rf_denominator": int,
        "statement_cm": float,
        "statement_ground": str (e.g. "1 km"),
        "map_distance_cm": float,
        "ground_distance_value": float,
        "ground_distance_unit": "km" | "m"
    }
    """
    steps = []
    conv_type = params.get("conversion_type", "map_to_ground")
    answer = {}
    verification = {}

    if conv_type == "statement_to_rf":
        stmt_cm = params.get("statement_cm", 1.0)
        ground_str = params.get("statement_ground", "1 km")
        ground_val = float(ground_str.split()[0])
        ground_unit = ground_str.split()[1] if len(ground_str.split()) > 1 else "km"
        ground_cm = ground_val * 100000 if ground_unit == "km" else ground_val * 100
        rf = int(ground_cm / stmt_cm)
        steps.append(f"Statement: {stmt_cm} cm = {ground_val} {ground_unit}")
        steps.append(f"Convert ground distance to cm: {ground_val} {ground_unit} = {ground_cm} cm")
        steps.append(f"RF = {ground_cm} / {stmt_cm} = 1:{rf}")
        answer = {"rf": f"1:{rf}"}
        verification = {"check": f"{stmt_cm} cm on map → {ground_cm} cm = {ground_val} {ground_unit} on ground"}

    elif conv_type == "map_to_ground":
        rf_den = params.get("rf_denominator", 100000)
        map_d_cm = params.get("map_distance_cm", 5.0)
        ground_m = map_d_cm * rf_den / 100
        ground_km = ground_m / 1000
        steps.append(f"RF = 1:{rf_den}")
        steps.append(f"Map distance = {map_d_cm} cm")
        steps.append(f"Ground distance = {map_d_cm} x {rf_den} = {ground_m} m = {ground_km} km")
        answer = {"ground_distance_m": round(ground_m, 2), "ground_distance_km": round(ground_km, 4)}
        verification = {"back_substitution": f"{ground_km:.4f} km on ground → {ground_km*100000:.1f} cm → {ground_km*100000/rf_den:.2f} cm on map"}

    elif conv_type == "ground_to_map":
        rf_den = params.get("rf_denominator", 100000)
        ground_val = params.get("ground_distance_value", 5.0)
        ground_unit = params.get("ground_distance_unit", "km")
        ground_cm = ground_val * 100000 if ground_unit == "km" else ground_val * 100
        map_cm = ground_cm / rf_den
        steps.append(f"RF = 1:{rf_den}")
        steps.append(f"Ground distance = {ground_val} {ground_unit} = {ground_cm} cm")
        steps.append(f"Map distance = {ground_cm} / {rf_den} = {map_cm:.4f} cm")
        answer = {"map_distance_cm": round(map_cm, 4)}
        verification = {"check": f"{map_cm:.4f} x {rf_den} = {map_cm*rf_den:.1f} cm = {ground_val} {ground_unit}"}

    return {
        "type": "topographical_map",
        "subtype": f"scale_{conv_type}",
        "answer": answer,
        "steps": steps,
        "verification": verification,
    }


def solve_cross_section(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve cross-section / gradient problems.
    params: {
        "contour_heights": [list],
        "horizontal_distances_km": [list of same length - 1],
        "gradient_type": "average" | "section"
    }
    """
    steps = []
    heights = params.get("contour_heights", [100, 120, 150, 170, 160])
    dists = params.get("horizontal_distances_km", [1.0, 1.0, 1.0, 1.0])
    gradient_type = params.get("gradient_type", "average")

    steps.append(f"Contour heights (m): {heights}")
    steps.append(f"Horizontal distances (km): {dists}")

    total_rise = heights[-1] - heights[0]
    total_run_km = sum(dists)
    total_run_m = total_run_km * 1000

    steps.append(f"Total rise = {heights[-1]} - {heights[0]} = {total_rise} m")
    steps.append(f"Total run = {total_run_km} km = {total_run_m} m")

    if gradient_type == "average":
        avg_gradient = total_rise / total_run_m
        avg_gradient_ratio = f"1:{int(1/avg_gradient)}" if avg_gradient > 0 else "inf"
        steps.append(f"Average gradient = rise / run = {total_rise}/{total_run_m} = {avg_gradient:.6f}")
        steps.append(f"Gradient = 1 in {int(1/avg_gradient)}" if avg_gradient > 0 else "Flat terrain")
        answer = {
            "total_rise_m": total_rise,
            "total_run_m": total_run_m,
            "average_gradient": round(avg_gradient, 6),
            "gradient_1_in": int(round(1 / avg_gradient)) if avg_gradient > 0 else None,
        }
        verification = {"back_substitution": f"{avg_gradient:.6f} x {total_run_m} m = {avg_gradient*total_run_m:.1f} m ≈ {total_rise} m ✓"}
    else:
        local_gradients = []
        for i in range(len(dists)):
            rise = heights[i + 1] - heights[i]
            run_m = dists[i] * 1000
            g = rise / run_m if run_m > 0 else 0
            local_gradients.append(round(g, 6))
            steps.append(f"Section {i+1}: rise={rise} m, run={run_m} m, gradient={g:.6f}")
        answer = {"local_gradients": local_gradients, "total_rise_m": total_rise, "total_run_m": total_run_m}
        verification = {"sum_rises": sum(heights[i+1]-heights[i] for i in range(len(heights)-1))}

    return {
        "type": "topographical_map",
        "subtype": "cross_section",
        "answer": answer,
        "steps": steps,
        "verification": verification,
    }


# ─────────────────────────────────────────────────────────────────────────────
# ATMOSPHERE & WEATHER SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_atmosphere_composition(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve atmosphere composition percentage problems.
    params: {
        "gas": str,
        "given_percentage": float,
        "operation": "find_remaining" | "volume_at_altitude" | "partial_pressure",
        "total_pressure_hpa": float (default 1013.25),
        "altitude_m": float (optional)
    }
    """
    steps = []
    gas = params.get("gas", "Nitrogen")
    pct = params.get("given_percentage", 78.0)
    op = params.get("operation", "find_remaining")
    total_pressure = params.get("total_pressure_hpa", 1013.25)

    composition = {
        "Nitrogen": 78.08,
        "Oxygen": 20.95,
        "Argon": 0.93,
        "Carbon_dioxide": 0.04,
        "Other_gases": 0.01,
    }

    steps.append(f"Gas: {gas} | Given percentage: {pct}%")
    steps.append(f"Total atmospheric pressure at sea level: {total_pressure} hPa")

    answer = {}
    verification = {}

    if op == "find_remaining":
        remaining = 100 - pct
        steps.append(f"Remaining percentage = 100 - {pct} = {remaining}%")
        answer = {"remaining_percentage": remaining}
        verification = {"check": f"{pct} + {remaining} = {pct + remaining}% ✓"}

    elif op == "partial_pressure":
        pp = total_pressure * pct / 100
        steps.append(f"Partial pressure of {gas} = {total_pressure} x {pct}/100 = {pp:.2f} hPa")
        answer = {"partial_pressure_hpa": round(pp, 2)}
        verification = {"check": f"{pp:.2f} / {total_pressure} = {pp/total_pressure*100:.2f}% ✓"}

    elif op == "volume_at_altitude":
        # approximate pressure decrease: P = P0 * exp(-h/8500)
        h = params.get("altitude_m", 3000)
        p_ratio = math.exp(-h / 8500)
        p_at_alt = total_pressure * p_ratio
        pp_alt = p_at_alt * pct / 100
        steps.append(f"Altitude: {h} m")
        steps.append(f"Pressure ratio = exp(-{h}/8500) = {p_ratio:.4f}")
        steps.append(f"Pressure at altitude = {total_pressure} x {p_ratio:.4f} = {p_at_alt:.2f} hPa")
        steps.append(f"Partial pressure of {gas} at {h} m = {pp_alt:.2f} hPa")
        answer = {"pressure_at_altitude_hpa": round(p_at_alt, 2), "partial_pressure_hpa": round(pp_alt, 2)}
        verification = {"barometric_formula": f"exp(-{h}/8500) = {p_ratio:.4f}"}

    return {
        "type": "atmosphere",
        "subtype": f"composition_{op}",
        "answer": answer,
        "steps": steps,
        "verification": verification,
    }


def solve_atmosphere_layers(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Identify/answer questions about atmosphere layers.
    params: {
        "query": str - layer name or description to identify
    }
    """
    steps = []
    query = params.get("query", "").lower().strip()

    layer_map = {
        "troposphere": {"name": "Troposphere", "altitude": "0-12 km", "key_feature": "All weather occurs here; temperature decreases with height (-6.5  deg C/km lapse rate)"},
        "stratosphere": {"name": "Stratosphere", "altitude": "12-50 km", "key_feature": "Ozone layer absorbs UV radiation; temperature increases with height; no weather"},
        "mesosphere": {"name": "Mesosphere", "altitude": "50-80 km", "key_feature": "Coldest layer (-90  deg C); meteors burn up here"},
        "thermosphere": {"name": "Thermosphere", "altitude": "80-700 km", "key_feature": "Temperature can reach 1500  deg C; auroras (Northern/Southern Lights) occur here; ionosphere for radio"},
        "exosphere": {"name": "Exosphere", "altitude": "700-10,000 km", "key_feature": "Outermost layer; merges with interplanetary space; very thin gases"},
    }

    steps.append(f"Query: '{query}'")

    matched = None
    for key, val in layer_map.items():
        if key in query or any(w in query for w in key.split()):
            matched = val
            break

    if matched is None:
        # Try matching by feature
        for key, val in layer_map.items():
            if any(w in val["key_feature"].lower() for w in query.split()):
                matched = val
                break

    if matched:
        steps.append(f"Layer identified: {matched['name']}")
        steps.append(f"Altitude range: {matched['altitude']}")
        steps.append(f"Key feature: {matched['key_feature']}")
        answer = {"layer": matched["name"], "altitude": matched["altitude"], "key_feature": matched["key_feature"]}
    else:
        steps.append("Mnemonic: D-I-D-I - Decreases, Increases, Decreases, Increases (temperature trend)")
        answer = {
            "layers_summary": [
                f"{l[0]}: {l[1]} - {l[2]}" for l in ATMOSPHERE_LAYERS
            ]
        }

    verification = {"mnemonic_didi": "Troposphere↓ Stratosphere↑ Mesosphere↓ Thermosphere↑", "query_matched": matched is not None}
    return {"type": "atmosphere", "subtype": "layers", "answer": answer, "steps": steps, "verification": verification}


def solve_weather_vs_climate(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Distinguish weather and climate, answer elements of weather.
    params: { "query": str }
    """
    steps = []
    query = params.get("query", "").lower()
    steps.append(f"Query: '{query}'")

    weather_def = "Day-to-day state of the atmosphere at a specific time and place (short-term, changes frequently)"
    climate_def = "Average weather conditions of a place over a long period (30+ years, stable pattern)"

    elements = ["Temperature", "Rainfall/precipitation", "Atmospheric pressure", "Humidity", "Wind speed and direction", "Sunshine/cloud cover"]

    if "weather" in query:
        steps.append(f"Weather = {weather_def}")
        answer = {"term": "Weather", "definition": weather_def, "elements": elements}
    elif "climate" in query:
        steps.append(f"Climate = {climate_def}")
        answer = {"term": "Climate", "definition": climate_def, "elements": elements}
    elif "element" in query:
        steps.append("Elements of weather: " + ", ".join(elements))
        answer = {"elements_of_weather": elements}
    else:
        steps.append(f"Weather: {weather_def}")
        steps.append(f"Climate: {climate_def}")
        answer = {"weather": weather_def, "climate": climate_def, "elements": elements}

    verification = {"standard_definition_source": "ICSE Class 7 Geography textbook"}
    return {"type": "weather_climate", "subtype": "definition", "answer": answer, "steps": steps, "verification": verification}


def solve_weather_instrument(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Identify weather instrument and what it measures.
    params: { "instrument": str (optional), "measurement": str (optional) }
    """
    steps = []
    instrument = params.get("instrument", "").lower().replace(" ", "_")
    measurement = params.get("measurement", "").lower()

    # Reverse lookup
    instrument_to_measurement = {
        "thermometer": "temperature ( deg C)",
        "barometer": "atmospheric pressure (hPa or mm Hg)",
        "rain_gauge": "rainfall amount (mm)",
        "hygrometer": "relative humidity (%)",
        "anemometer": "wind speed (km/h or m/s)",
        "wind_vane": "wind direction",
        "stevenson_screen": "shelter for instruments (not a measuring device itself)",
    }

    measurement_to_instrument = {v: k for k, v in instrument_to_measurement.items()}

    answer = {}
    if instrument:
        m = instrument_to_measurement.get(instrument, "Unknown instrument")
        steps.append(f"Instrument: {instrument.replace('_', ' ').title()}")
        steps.append(f"Measures: {m}")
        answer = {"instrument": instrument.replace("_", " ").title(), "measures": m}
    elif measurement:
        found = None
        for m, inst in measurement_to_instrument.items():
            if any(w in m for w in measurement.split()):
                found = (inst.replace("_", " ").title(), m)
                break
        if found:
            steps.append(f"Measurement: {measurement}")
            steps.append(f"Instrument: {found[0]}")
            answer = {"instrument": found[0], "measures": found[1]}
        else:
            steps.append("Could not identify - please check the measurement name")
            answer = {"error": "Not found"}

    verification = {"stevenson_screen_detail": "White, louvered wooden box, raised 1.2 m above ground, north-facing door"}
    return {"type": "weather_climate", "subtype": "instruments", "answer": answer, "steps": steps, "verification": verification}


def solve_ozone_layer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Ozone layer questions.
    params: { "query": str }
    """
    steps = []
    query = params.get("query", "").lower()
    steps.append(f"Query: '{query}'")

    ozone_info = {
        "location": "Stratosphere (15-35 km altitude)",
        "chemical_formula": "O₃ (triatomic oxygen)",
        "importance": "Absorbs harmful ultraviolet (UV-B and UV-C) radiation from the Sun",
        "depletion_cause": "CFCs (chlorofluorocarbons) release chlorine atoms that destroy ozone molecules",
        "montreal_protocol": "1987 international treaty to phase out ozone-depleting substances (CFCs, HCFCs)",
        "current_status": "Ozone layer is slowly recovering; Antarctic ozone hole is shrinking",
        "uv_effects": "UV-B causes skin cancer, cataracts, and damages marine phytoplankton and crops",
    }

    answer = {}
    for key, val in ozone_info.items():
        if key.replace("_", " ") in query or any(w in query for w in key.split("_")):
            steps.append(f"{key.replace('_', ' ').title()}: {val}")
            answer[key] = val

    if not answer:
        steps.append("Ozone layer (O₃) is in the stratosphere.")
        steps.append("It absorbs harmful UV radiation from the Sun.")
        steps.append("CFCs released from refrigerants, aerosols deplete it.")
        steps.append("Montreal Protocol (1987) phased out CFCs globally.")
        answer = ozone_info

    verification = {"ozone_concentration_max": "~10 ppm at 20-25 km altitude", "uv_blocked": "~97-99% of UV-C and most UV-B"}
    return {"type": "atmosphere", "subtype": "ozone", "answer": answer, "steps": steps, "verification": verification}


# ─────────────────────────────────────────────────────────────────────────────
# WEATHERING & SOIL SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_weathering(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Identify type of weathering and explain mechanism.
    params: { "weathering_type": str, "mechanism_query": str (optional) }
    """
    steps = []
    w_type = params.get("weathering_type", "").lower().replace(" ", "_")
    mech_query = params.get("mechanism_query", "").lower()

    info = {
        "mechanical": {
            "definition": "Physical disintegration of rocks into smaller pieces without change in chemical composition",
            "agents": ["Frost action (freeze-thaw / frost wedging)",
                        "Temperature expansion and contraction (exfoliation)",
                        "Abrasion by wind, water, glaciers",
                        "Salt crystal growth (haloclasty)",
                        "Root wedging (biological but mechanical result)"],
            "example": "Water seeps into cracks, freezes (expands ~9%), widens cracks → rock splits",
        },
        "chemical": {
            "definition": "Chemical alteration of rock minerals producing new substances",
            "agents": ["Oxidation (reaction with oxygen - rusting of iron minerals)",
                        "Carbonation (CO₂ in rainwater forms carbonic acid, dissolves limestone)",
                        "Hydration (water absorbed into mineral structure, causing expansion)",
                        "Solution (direct dissolution of soluble minerals like salt, gypsum)"],
            "example": "Carbonic acid (H₂CO₃) reacts with limestone (CaCO₃) → dissolves it over time",
        },
        "biological": {
            "definition": "Disintegration of rocks by living organisms",
            "agents": ["Plant roots growing into rock cracks (root wedging)",
                        "Lichen and moss secreting organic acids that dissolve rock",
                        "Burrowing animals (worms, rabbits) breaking rock fragments",
                        "Microorganisms producing acids"],
            "example": "Lichens on bare rock surface secrete oxalic acid → chemical weathering initiated",
        },
    }

    # Match key
    matched_key = None
    for key in info:
        if key in w_type or key.replace("_", " ") in w_type:
            matched_key = key
            break

    steps.append(f"Weathering type queried: {w_type or matched_key}")

    if matched_key:
        d = info[matched_key]
        steps.append(f"Definition: {d['definition']}")
        steps.append(f"Agents/processes: {', '.join(d['agents'])}")
        steps.append(f"Example: {d['example']}")
        answer = d
        answer["type_name"] = matched_key.replace("_", " ").title()
    else:
        steps.append("Three main types: Mechanical, Chemical, Biological")
        answer = {k.replace("_", " ").title(): v["definition"] for k, v in info.items()}

    verification = {"mechanical_no_chemical_change": matched_key == "mechanical",
                     "chemical_produces_new_compounds": matched_key == "chemical",
                     "biological_involves_living_things": matched_key == "biological"}
    return {"type": "weathering_soil", "subtype": "weathering", "answer": answer, "steps": steps, "verification": verification}


def solve_soil_profile(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Soil profile questions - identify horizons.
    params: { "horizon": str, "query_type": "identify" | "list" | "properties" }
    """
    steps = []
    horizon = params.get("horizon", "").upper().replace(" ", "_")
    query_type = params.get("query_type", "identify")

    horizon_info = {
        "O_HORIZON": {"name": "O Horizon (Organic)", "depth": "0-5 cm", "characteristics": "Dark brown/black; rich in humus (decomposed organic matter); thin layer; high porosity"},
        "A_HORIZON": {"name": "A Horizon (Topsoil)", "depth": "5-25 cm", "characteristics": "Dark colour; rich in humus and minerals; most fertile; supports plant roots and microorganisms"},
        "E_HORIZON": {"name": "E Horizon (Eluviated)", "depth": "25-50 cm", "characteristics": "Light-coloured; minerals and clay leached out (eluviation); zone of maximum leaching"},
        "B_HORIZON": {"name": "B Horizon (Subsoil)", "depth": "50-100 cm", "characteristics": "Lighter than A; accumulation of clay, iron, aluminium oxides (illuviation); zone of deposition"},
        "C_HORIZON": {"name": "C Horizon (Parent Material)", "depth": "100-200 cm", "characteristics": "Weathered parent rock fragments; little organic matter; porous"},
        "R_HORIZON": {"name": "R Horizon (Bedrock)", "depth": ">200 cm", "characteristics": "Unweathered solid bedrock; impermeable; source of parent material for soil"},
    }

    steps.append(f"Query type: {query_type}")

    answer = {}
    if query_type == "list":
        steps.append("Soil horizons from surface to bedrock:")
        for k, v in horizon_info.items():
            steps.append(f"  {v['name']}: {v['depth']} - {v['characteristics']}")
        answer = {k.replace("_HORIZON", ""): v for k, v in horizon_info.items()}
        # Simplify keys
        answer = {v["name"]: v for v in horizon_info.values()}
    else:
        matched = None
        for key, val in horizon_info.items():
            if key.replace("_HORIZON", "") in horizon or key in horizon:
                matched = val
                break
        if matched:
            steps.append(f"Horizon: {matched['name']}")
            steps.append(f"Typical depth: {matched['depth']}")
            steps.append(f"Characteristics: {matched['characteristics']}")
            answer = matched
        else:
            steps.append("Horizon not found - listing all horizons:")
            for k, v in horizon_info.items():
                steps.append(f"  {v['name']}")
            answer = horizon_info

    verification = {"soil_forming_processes": "Pedogenesis: weathering → leaching (eluviation) → deposition (illuviation) → humus accumulation"}
    return {"type": "weathering_soil", "subtype": "soil_profile", "answer": answer, "steps": steps, "verification": verification}


def solve_soil_formation(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Factors affecting soil formation.
    params: { "factor": str }
    """
    steps = []
    factor = params.get("factor", "").lower()

    factors = {
        "parent_material": "Nature of parent rock determines mineral composition and texture of soil",
        "climate": "Temperature and rainfall affect rate of weathering and organic matter decomposition",
        "relief": "Slope affects soil depth - steep slopes have thin soil, flat areas have deep soil",
        "organisms": "Plants, animals, microorganisms contribute organic matter and aid weathering",
        "time": "Older soils are more developed with distinct horizons",
    }

    steps.append(f"Factor: {factor}")

    matched = None
    for key, val in factors.items():
        if key in factor or any(w in factor for w in key.split("_")):
            matched = (key, val)
            break

    if matched:
        steps.append(f"{matched[0].replace('_', ' ').title()}: {matched[1]}")
        answer = {"factor": matched[0].replace("_", " ").title(), "explanation": matched[1]}
    else:
        steps.append("Five factors (CLORPT model):")
        for k, v in factors.items():
            steps.append(f"  {k.replace('_', ' ').title()}: {v}")
        answer = {k.replace("_", " ").title(): v for k, v in factors.items()}

    verification = {"clorpt_mnemonic": "Climate, Organisms, Relief, Parent material, Time"}
    return {"type": "weathering_soil", "subtype": "soil_formation", "answer": answer, "steps": steps, "verification": verification}


# ─────────────────────────────────────────────────────────────────────────────
# INDUSTRIES SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_agro_industry(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve agro-based industry questions.
    params: { "industry_type": "cotton" | "jute" | "sugar", "query": str }
    """
    steps = []
    industry_type = params.get("industry_type", "").lower().replace(" ", "_")
    query = params.get("query", "").lower()

    industry_data = {
        "cotton": {
            "name": "Cotton Textile Industry",
            "raw_material": "Cotton (cotton bolls from cotton plant, grown in black soil regions)",
            "major_producing_states": "Maharashtra (largest), Gujarat, Telangana, Andhra Pradesh, Karnataka, Haryana, Punjab, Rajasthan",
            "manufacturing_states": "Maharashtra (Mumbai, Ahmednagar), Gujarat (Surat, Ahmedabad), Tamil Nadu (Coimbatore - 'Manchester of South India')",
            "products": "Cotton cloth, khadi, denim, garments, home textiles (bedsheets, towels)",
            "importance": "Provides employment to millions; India is the 2nd largest producer and exporter of cotton",
            "season": "Kharif crop (sown June-July, harvested Oct-Feb)",
            "key_cities": "Ahmedabad ('Manchester of India'), Mumbai, Coimbatore, Surat",
        },
        "jute": {
            "name": "Jute Textile Industry",
            "raw_material": "Jute fibre (from jute plant, grown in warm, humid alluvial soil with 150-200 cm rainfall)",
            "major_producing_states": "West Bengal (largest), Assam, Bihar, Odisha, Meghalaya",
            "manufacturing_states": "West Bengal (Kolkata, Howrah, Serampore), Assam",
            "products": "Jute bags/sacks, geotextiles, carpets, ropes, wall coverings, handicrafts",
            "importance": "Eco-friendly, biodegradable; India is the largest producer of jute in the world",
            "season": "Sown March-May, harvested July-October",
            "key_cities": "Kolkata (headquarters: jute industry), Howrah, Serampore",
        },
        "sugar": {
            "name": "Sugar Industry",
            "raw_material": "Sugarcane (tall perennial grass, needs hot climate 21-27  deg C, 75-150 cm rainfall)",
            "major_producing_states": "Uttar Pradesh (largest - 38% of India's production), Maharashtra (2nd), Karnataka, Tamil Nadu, Bihar, Punjab, Haryana, Andhra Pradesh",
            "manufacturing_states": "Uttar Pradesh, Maharashtra, Karnataka",
            "products": "White sugar, khandsari (unrefined sugar), molasses (used for alcohol), bagasse (used for paper, fuel)",
            "importance": "Largest agro-based industry in India; India is 2nd largest sugar producer globally",
            "season": "Sugarcane takes 10-18 months to mature; crushing season: Nov-April",
            "key_cities": "Kanpur, Lucknow (UP); Kolhapur, Sangli (Maharashtra); Coimbatore (TN)",
        },
    }

    matched_key = None
    for key in industry_data:
        if key in industry_type:
            matched_key = key
            break

    steps.append(f"Industry type: {industry_type or matched_key}")

    if matched_key:
        d = industry_data[matched_key]
        for k, v in d.items():
            steps.append(f"{k.replace('_', ' ').title()}: {v}")
        answer = d
    else:
        steps.append("Available agro-based industries: Cotton Textile, Jute Textile, Sugar")
        for k, v in industry_data.items():
            steps.append(f"  {v['name']}: {v['raw_material']}")
        answer = industry_data

    verification = {"cotton_needs_black_soil": True, "jute_needs_high_rainfall": True, "sugar_needs_hot_climate": True}
    return {"type": "industries", "subtype": "agro_based", "answer": answer, "steps": steps, "verification": verification}


def solve_iron_steel(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Iron and steel industry questions.
    params: { "query_type": "raw_materials" | "process" | "plants" | "location" }
    """
    steps = []
    qt = params.get("query_type", "raw_materials")

    raw_materials = [
        {"name": "Iron Ore", "source": "Hematite (Fe₂O₃) or Magnetite (Fe₃O₄); mined in Odisha, Jharkhand, Chhattisgarh, Karnataka", "proportion": "Main raw material (~1.6 tonnes per tonne of steel)"},
        {"name": "Coal (Coke)", "source": "Metallurgical coal from Jharia (Jharkhand), Raniganj (WB); converted to coke in ovens", "proportion": "~0.8 tonnes per tonne of steel; provides heat and reduces iron ore"},
        {"name": "Limestone", "source": "Madhya Pradesh, Chhattisgarh, Jharkhand", "proportion": "~0.25 tonnes; acts as flux to remove impurities (gangue) as slag"},
        {"name": "Manganese", "source": "Odisha, Madhya Pradesh, Maharashtra", "proportion": "Small amount; improves hardness, strength, and wear resistance of steel"},
    ]

    process_steps = [
        {"step": 1, "name": "Mining", "desc": "Iron ore, coal, and limestone are mined from open-cast or underground mines"},
        {"step": 2, "name": "Ore Preparation", "desc": "Iron ore is crushed, washed, and concentrated to remove impurities (sintering/ pelletising)"},
        {"step": 3, "name": "Coke Making", "desc": "Coal heated in absence of air in coke ovens → coke + coal tar + ammonia gas (by-products)"},
        {"step": 4, "name": "Blast Furnace", "desc": "Charge: iron ore + coke + limestone → molten iron (pig iron) tapped from bottom; slag floats on top"},
        {"step": 5, "name": "Steel Making", "desc": "Pig iron refined in Basic Oxygen Furnace (BOF) or Electric Arc Furnace (EAF) → impurities oxidised"},
        {"step": 6, "name": "Casting & Rolling", "desc": "Molten steel cast into slabs/blooms → hot rolled into sheets, bars, rails, or structural shapes"},
    ]

    major_plants = [
        {"name": "Tata Steel", "location": "Jamshedpur, Jharkhand", "note": "India's first integrated steel plant (1907); largest private sector"},
        {"name": "SAIL Bhilai", "location": "Bhilai, Chhattisgarh", "note": "Largest steel plant in India; produces rails, plates, structurals"},
        {"name": "SAIL Rourkela", "location": "Rourkela, Odisha", "note": "First integrated steel plant in public sector (1959)"},
        {"name": "SAIL Durgapur", "location": "Durgapur, West Bengal", "note": "Located in Raniganj coal belt"},
        {"name": "SAIL Bokaro", "location": "Bokaro, Jharkhand", "note": "One of the largest steel-making complexes in Asia"},
        {"name": "VISA Steel", "location": "Kalinganagar, Odisha", "note": "Special steel and ferro-chrome producer"},
    ]

    steps.append(f"Query type: {qt}")

    answer = {}
    if qt == "raw_materials":
        for rm in raw_materials:
            steps.append(f"{rm['name']}: {rm['source']} ({rm['proportion']})")
        answer = {"raw_materials": raw_materials}
    elif qt == "process":
        for s in process_steps:
            steps.append(f"Step {s['step']} - {s['name']}: {s['desc']}")
        answer = {"process_steps": process_steps}
    elif qt == "plants":
        for p in major_plants:
            steps.append(f"{p['name']}: {p['location']} - {p['note']}")
        answer = {"major_plants": major_plants}
    elif qt == "location":
        steps.append("Factors affecting location of iron & steel plants:")
        location_factors = [
            "Near iron ore mines (ore is bulky and heavy - reduces transport cost)",
            "Near coal fields (coking coal is bulky; Jharia, Raniganj coalfields)",
            "Near water source (rivers - Damodar, Mahanadi - for cooling and transport)",
            "Near ports (Mumbai, Chennai - for importing technology, exporting steel)",
            "Flat land availability (large plants need extensive flat land)",
        ]
        for f in location_factors:
            steps.append(f"  • {f}")
        answer = {"location_factors": location_factors}

    verification = {"blast_furnace_equation": "Fe₂O₃ + 3CO → 2Fe + 3CO₂", "coke_role": "Reducing agent + heat source", "limestone_role": "Flux - forms CaO which combines with SiO₂ to form CaSiO₃ (slag)"}
    return {"type": "industries", "subtype": f"iron_steel_{qt}", "answer": answer, "steps": steps, "verification": verification}


# ─────────────────────────────────────────────────────────────────────────────
# ENERGY RESOURCES SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_energy_resources(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Energy resource questions.
    params: { "resource_type": str, "query": str }
    """
    steps = []
    rtype = params.get("resource_type", "").lower().replace(" ", "_")
    query = params.get("query", "").lower()

    all_resources = {
        "coal": {"type": "Conventional (fossil fuel)", "formation": "Formed from ancient vegetation compressed over millions of years under heat and pressure",
                  "types": "Peat → Lignite → Bituminous → Anthracite (increasing carbon content, increasing quality)",
                  "major_states": "Jharkhand, Odisha, Chhattisgarh, West Bengal, Madhya Pradesh, Andhra Pradesh",
                  "uses": "Electricity generation (thermal power plants), steel making, cement industry, domestic fuel",
                  "advantages": "Abundant, cheap, established infrastructure",
                  "disadvantages": "Non-renewable, causes air pollution (SO₂, NOₓ, CO₂), global warming, acid rain"},
        "petroleum": {"type": "Conventional (fossil fuel)", "formation": "Marine organisms settled on sea floor → buried → transformed by heat and pressure over millions of years",
                       "major_fields": "Mumbai High (offshore, Maharashtra), Gujarat (Ankleshwar, Kalol), Assam (Digboi, oldest field), Rajasthan (Barmer), Krishna-Godavari basin (Andhra Pradesh)",
                       "refineries": "Reliance (Jamnagar, world's largest), IOC (Panipat, Mathura, Paradip), HPCL, BPCL",
                       "uses": "Transport (petrol, diesel, kerosene), LPG, petrochemicals, lubricants, asphalt",
                       "advantages": "High energy density, easy transport, versatile",
                       "disadvantages": "Non-renewable, oil spills harm marine life, CO₂ emissions"},
        "natural_gas": {"type": "Conventional (fossil fuel)", "formation": "Same as petroleum; often found with crude oil",
                         "major_fields": "KG-D6 basin (Krishna-Godavari, Andhra Pradesh), Mumbai High, Assam",
                         "uses": "Cooking (PNG), electricity generation, fertiliser production (urea), CNG for vehicles",
                         "advantages": "Cleaner than coal/oil (less CO₂, no SO₂), efficient",
                         "disadvantages": "Non-renewable, flammable, pipeline infrastructure needed"},
        "solar": {"type": "Non-conventional (renewable)", "source": "Nuclear fusion reactions in the Sun; energy reaches Earth as sunlight",
                   "potential_in_india": "~750 GW (Rajasthan, Gujarat, Ladakh have highest potential)",
                   "technology": "Solar photovoltaic (PV) cells convert sunlight → electricity; Solar thermal (concentrated solar power)",
                   "uses": "Rural electrification, water heating, street lighting, grid-connected power plants (Bhadla, Rajasthan - largest solar park)",
                   "advantages": "Renewable, no pollution, low maintenance, decentralised",
                   "disadvantages": "Intermittent (only during day), requires large land area, initial cost high"},
        "wind": {"type": "Non-conventional (renewable)", "source": "Kinetic energy of moving air masses caused by differential heating of Earth",
                  "potential_in_india": "~302 GW (Tamil Nadu has highest installed capacity)",
                  "technology": "Wind turbines (horizontal axis) convert kinetic energy → mechanical → electrical energy",
                  "major_states": "Tamil Nadu (Muppandal), Gujarat, Maharashtra, Karnataka, Rajasthan, Andhra Pradesh",
                  "advantages": "Renewable, clean, land under turbines can be used for agriculture",
                  "disadvantages": "Intermittent (wind not always blowing), noise, affects bird migration"},
        "hydel": {"type": "Conventional (renewable)", "source": "Potential energy of falling/stored water",
                   "major_projects": "Bhakra-Nangal (Punjab/Himachal Pradesh), Tehri (Uttarakhand), Sardar Sarovar (Gujarat), Hirakud (Odisha), Nagaon (Assam)",
                   "uses": "Electricity generation, irrigation, flood control, water supply",
                   "advantages": "Renewable, no pollution, provides irrigation and flood control",
                   "disadvantages": "Displacement of people, ecological damage, silting, high initial cost"},
        "nuclear": {"type": "Conventional (non-renewable)", "source": "Nuclear fission of uranium (U-235) or plutonium atoms - mass defect releases energy (E=mc^2)",
                     "power_plants": "Tarapur (Maharashtra, oldest), Kalpakkam (Tamil Nadu), Kudankulam (Tamil Nadu, largest), Kaiga (Karnataka), Narora (Uttar Pradesh), Rawatbhata (Rajasthan)",
                     "fuel": "Uranium (from Jaduguda, Jharkhand; Bhatin, Rajasthan); Thorium (India has world's largest thorium reserves - Kerala, Tamil Nadu beaches)",
                     "advantages": "Very high energy output from small fuel, low CO₂, reliable baseload power",
                     "disadvantages": "Radioactive waste, risk of accidents, high cost, nuclear weapons proliferation concern"},
        "biogas": {"type": "Non-conventional (renewable)", "source": "Anaerobic digestion of organic matter (animal dung, kitchen waste, agricultural residue) by bacteria",
                    "composition": "~55-65% methane (CH₄), 30-40% CO₂, trace H₂S",
                    "process": "Biogas plant (digester) - organic matter + water → anaerobic digestion → biogas + slurry (fertiliser)",
                    "uses": "Cooking, lighting, electricity generation, organic fertiliser (slurry)",
                    "advantages": "Renewable, waste-to-wealth, rural self-sufficiency, organic fertiliser by-product",
                    "disadvantages": "Requires consistent organic waste supply, seasonal variation"},
        "tidal": {"type": "Non-conventional (renewable)", "source": "Gravitational pull of Moon and Sun causing ocean tides (rise and fall of sea level)",
                   "potential_in_india": "~8,000 MW (Gulf of Kutch, Gujarat; Gulf of Khambhat; Sunderbans, West Bengal)",
                   "technology": "Tidal barrage (dam across estuary) or tidal stream turbines",
                   "advantages": "Highly predictable (based on lunar cycles), renewable, no pollution",
                   "disadvantages": "Limited suitable sites, high construction cost, marine ecosystem impact"},
        "geothermal": {"type": "Non-conventional (renewable)", "source": "Heat from Earth's interior (radioactive decay in crust + residual formation heat)",
                        "potential_in_india": "Limited - Manikaran (Himachal Pradesh), Puga Valley (Ladakh), Tattapani (Chhattisgarh)",
                        "uses": "Electricity generation, direct heating (spas, greenhouses, space heating)",
                        "advantages": "Constant output (not intermittent), renewable, low emissions",
                        "disadvantages": "Site-specific, high drilling cost, limited in India"},
    }

    matched_key = None
    for key in all_resources:
        if key in rtype:
            matched_key = key
            break

    steps.append(f"Resource type: {rtype or matched_key}")

    if matched_key:
        d = all_resources[matched_key]
        for k, v in d.items():
            steps.append(f"{k.replace('_', ' ').title()}: {v}")
        answer = d
    else:
        steps.append("Energy resources overview:")
        for k, v in all_resources.items():
            steps.append(f"  {k.replace('_', ' ').title()} [{v['type']}]: {v.get('uses', v.get('source', ''))[:60]}...")
        answer = all_resources

    verification = {"conventional_count": sum(1 for v in all_resources.values() if "Conventional" in v["type"]),
                     "non_conventional_count": sum(1 for v in all_resources.values() if "Non-conventional" in v["type"]),
                     "renewable": sum(1 for v in all_resources.values() if "renewable" in v["type"])}
    return {"type": "energy", "subtype": f"resources_{rtype or 'overview'}", "answer": answer, "steps": steps, "verification": verification}


# ─────────────────────────────────────────────────────────────────────────────
# CONTINENT SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_continent(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Continent-specific questions.
    params: { "continent": str, "query": str }
    """
    steps = []
    cont = params.get("continent", "").lower().replace(" ", "_")
    query = params.get("query", "").lower()

    # Normalise key
    key_map = {"europe": "europe", "africa": "africa", "australia": "australia", "australasia": "australia",
                "oceania": "australia", "antarctica": "antarctica", "antarctic": "antarctica"}
    matched_key = None
    for k, v in key_map.items():
        if k in cont:
            matched_key = v
            break

    steps.append(f"Continent: {cont or matched_key}")

    if matched_key and matched_key in CONTINENTS:
        data = CONTINENTS[matched_key]
        answer = {}
        for k, v in data.items():
            if any(w in query for w in k.split("_")) or not query:
                steps.append(f"{k.replace('_', ' ').title()}: {v}")
                answer[k] = v
        if not answer:
            answer = data
        verification = {"continent_key": matched_key}
    else:
        steps.append("Available continents: Europe, Africa, Australia, Antarctica")
        answer = {k.replace("_", " ").title(): v for k, v in CONTINENTS.items()}
        verification = {}

    return {"type": "continent", "subtype": cont or "overview", "answer": answer, "steps": steps, "verification": verification}


# ─────────────────────────────────────────────────────────────────────────────
# MASTER SOLVER ROUTER
# ─────────────────────────────────────────────────────────────────────────────

def solve_question(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Master solver - routes to appropriate sub-solver based on topic and subtype.
    params: { "topic": str, "subtype": str, ... }  plus sub-solver-specific keys
    """
    topic = params.get("topic", "").lower().replace(" ", "_")
    subtype = params.get("subtype", "").lower().replace(" ", "_")

    # Normalise topic
    topic_aliases = {
        "topographical_map": "topographical_map",
        "topo_map": "topographical_map",
        "atmosphere": "atmosphere",
        "weather": "weather_climate",
        "climate": "weather_climate",
        "weathering": "weathering_soil",
        "soil": "weathering_soil",
        "industry": "industries",
        "industries": "industries",
        "agro_industry": "agro_based",
        "agro_based": "agro_based",
        "iron_steel": "iron_steel",
        "energy": "energy",
        "energy_resources": "energy",
        "europe": "continent",
        "africa": "continent",
        "australia": "continent",
        "antarctica": "continent",
        "continent": "continent",
        "continents": "continent",
        "map_work": "topographical_map",
        "scale": "scale",
        "grid": "grid",
        "contour": "contour",
    }

    resolved_topic = topic_aliases.get(topic, topic)

    if resolved_topic == "topographical_map":
        if subtype in ("contour", "contour_interpretation", "landform", "slope"):
            return solve_contour_interpretation(params)
        elif subtype in ("grid", "grid_reference"):
            return solve_grid_reference(params)
        elif subtype in ("scale", "scale_conversion"):
            return solve_scale_conversion(params)
        elif subtype in ("cross_section", "gradient"):
            return solve_cross_section(params)
        else:
            # Generic topo map - try each
            if "contour" in subtype:
                return solve_contour_interpretation(params)
            elif "grid" in subtype:
                return solve_grid_reference(params)
            elif "scale" in subtype:
                return solve_scale_conversion(params)
            else:
                return solve_contour_interpretation(params)

    elif resolved_topic == "atmosphere":
        if subtype in ("composition", "gas", "partial_pressure"):
            return solve_atmosphere_composition(params)
        elif subtype in ("layer", "layers"):
            return solve_atmosphere_layers(params)
        elif subtype in ("ozone", "ozone_layer"):
            return solve_ozone_layer(params)
        else:
            return solve_atmosphere_composition(params)

    elif resolved_topic == "weather_climate":
        if subtype in ("instrument", "instruments"):
            return solve_weather_instrument(params)
        else:
            return solve_weather_vs_climate(params)

    elif resolved_topic == "weathering_soil":
        if subtype in ("soil_profile", "horizon"):
            return solve_soil_profile(params)
        elif subtype in ("soil_formation", "formation"):
            return solve_soil_formation(params)
        else:
            return solve_weathering(params)

    elif resolved_topic == "agro_based":
        return solve_agro_industry(params)

    elif resolved_topic == "iron_steel":
        return solve_iron_steel(params)

    elif resolved_topic == "energy":
        return solve_energy_resources(params)

    elif resolved_topic == "continent":
        return solve_continent(params)

    # Fallback
    return {"type": "unknown", "subtype": subtype, "answer": {"message": "Topic not recognised"}, "steps": [f"Topic '{topic}' not matched"], "verification": {}}


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Question:
    id: str
    type: str          # mcq | fill_blank | short_answer | long_answer | numerical
    topic: str
    difficulty: str    # easy | medium | hard
    question: str
    options: List[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    competency: bool = False  # Indian-context competency question


class QuestionGenerator:
    """Deterministic question generator seeded by the provided seed."""

    TOPICS = [
        "topographical_map", "scale", "contour", "grid_reference",
        "atmosphere_composition", "atmosphere_layers", "ozone",
        "weather_climate", "weather_instruments", "stevenson_screen",
        "weathering", "soil_profile", "soil_formation",
        "agro_based_industries", "iron_steel",
        "energy_resources",
        "europe", "africa", "australia", "antarctica",
    ]

    def __init__(self, seed: int):
        self.rng = _make_rng(seed)

    def _topic_weight(self) -> dict:
        """Return topic weights matching the exam blueprint."""
        return {
            "topographical_map": 0.15, "scale": 0.05, "contour": 0.08, "grid_reference": 0.04,
            "atmosphere_composition": 0.06, "atmosphere_layers": 0.06, "ozone": 0.03,
            "weather_climate": 0.05, "weather_instruments": 0.05, "stevenson_screen": 0.02,
            "weathering": 0.08, "soil_profile": 0.04, "soil_formation": 0.04,
            "agro_based_industries": 0.12, "iron_steel": 0.10,
            "energy_resources": 0.10,
            "europe": 0.03, "africa": 0.03, "australia": 0.03, "antarctica": 0.03,
        }

    def _select_topics(self, count: int) -> List[str]:
        weights = self._topic_weight()
        topics = list(weights.keys())
        probs = [weights[t] for t in topics]
        selected = self.rng.choices(topics, weights=probs, k=count)
        return selected

    def generate_mcq(self, topic: str, difficulty: str) -> Question:
        pass

# return {"status": "ok", "note": "truncated"}
