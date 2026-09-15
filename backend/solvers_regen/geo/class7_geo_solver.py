"""
CISCE Geography Class 7 - Comprehensive Solver & Question Generator
Covers: Maps & Scales, Atmosphere & Climate, Hydrosphere, Soil, Natural Vegetation,
        Landforms, Weather & Climate, Water Resources, Environment
"""

import math
import random
import re
import json
from dataclasses import dataclass, field
from typing import List, Tuple, Optional, Dict, Any
from enum import Enum


# ─── Enumerations ────────────────────────────────────────────────────────────

class TopicType(Enum):
    MAP_SCALES = "Map Scales"
    LATITUDE_LONGITUDE = "Latitude and Longitude"
    TEMPERATURE_CONVERSION = "Temperature Conversion"
    AVERAGE_TEMPERATURE = "Average Temperature"
    RAINFALL_ANALYSIS = "Rainfall Analysis"
    WIND_DIRECTION = "Wind Direction"
    WATER_CYCLE = "Water Cycle"
    WEATHER_INSTRUMENTS = "Weather Instruments"
    SOIL_TYPES = "Soil Types"
    NATURAL_VEGETATION = "Natural Vegetation"
    LANDFORM_IDENTIFICATION = "Landform Identification"
    EARTHQUAKE_TERMS = "Earthquake Terms"
    OCEAN_CURRENTS = "Ocean Currents"
    LOCAL_CLIMATE = "Local Climate"
    ENVIRONMENT_AND_CONSERVATION = "Environment and Conservation"
    ATMOSPHERE_LAYERS = "Atmosphere Layers"
    STANDARD_TIME = "Standard Time"
    COMPASS_BEARING = "Compass Bearing"


class DifficultyLevel(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


class QuestionType(Enum):
    STANDARD = "Standard"
    COMPETENCY_BASED = "Competency-Based"


# ─── Data Classes ─────────────────────────────────────────────────────────────

@dataclass
class SolverResult:
    """Result of a solver operation."""
    steps: List[str]
    answer: str
    verification: str
    explanation: str
    hints: List[str] = field(default_factory=list)


@dataclass
class GeneratedQuestion:
    """A generated question with answer and solution."""
    question_text: str
    answer: str
    solution_steps: List[str]
    topic: str
    difficulty: str
    question_type: str
    parameters: Dict[str, Any] = field(default_factory=dict)


# ─── Solver Class ─────────────────────────────────────────────────────────────

class GeographySolver:
    """Main solver class for CISCE Geography Class 7."""

    # ─── Map Scales ─────────────────────────────────────────────────────────

    @staticmethod
    def solve_map_scale(params: Dict) -> SolverResult:
        """
        Solve map scale problems.

        params:
            scale_type: 'rf_to_statement' | 'statement_to_rf' | 'map_distance' |
                         'rf_to_graphical' | 'graphical_to_statement'
            scale_rf: str, e.g., "1:50000"
            statement_scale: str, e.g., "1 cm = 500 m"
            map_distance_cm: float (map distance to convert)
            real_distance_m: float (real distance to convert)
            graphical_unit_cm: float
        """
        steps = []
        stype = params.get("scale_type", "map_distance")
        scale = params.get("scale_rf", "1:50000")

        if stype == "rf_to_statement":
            denom = int(scale.split(":")[1])
            if denom >= 100000:
                km = denom / 100000
                if km == int(km):
                    statement = f"1 cm = {int(km)} km"
                else:
                    statement = f"1 cm = {km} km"
            else:
                m = denom / 100
                if m == int(m):
                    statement = f"1 cm = {int(m)} m"
                else:
                    statement = f"1 cm = {m} m"
            steps.append(f"Given: RF = {scale}")
            steps.append(f"Denominator = {denom}")
            steps.append(f"1 cm on map represents {denom} cm on ground")
            if denom >= 100000:
                km = denom / 100000
                steps.append(f"Converting to km: {denom} cm = {denom/100000} km = {denom/100000} km")
                steps.append(f"Statement Scale: 1 cm = {denom/100000} km")
            else:
                m = denom / 100
                steps.append(f"Converting to metres: {denom} cm = {m} m")
                steps.append(f"Statement Scale: 1 cm = {m} m")
            answer = statement
            verification = f"RF {scale} -> 1 cm = {denom} cm on ground -> {answer}"

        elif stype == "statement_to_rf":
            stmt = params.get("statement_scale", "1 cm = 2 km")
            match = re.match(r"1\s*cm\s*=\s*([\d.]+)\s*(km|m|mm)", stmt.replace(" ", "").lower())
            if match:
                val = float(match.group(1))
                unit = match.group(2)
                if unit == "km":
                    ground_cm = val * 100000
                elif unit == "m":
                    ground_cm = val * 100
                else:
                    ground_cm = val / 10
                denom = int(ground_cm)
                rf = f"1:{denom}"
                steps.append(f"Given: {stmt}")
                steps.append(f"1 cm on map represents {val} {unit} on ground")
                steps.append(f"Converting to cm: {val} {unit} = {ground_cm} cm on ground")
                steps.append(f"RF = 1:{denom}")
                answer = rf
                verification = f"{stmt} -> {ground_cm} cm -> RF = {rf}"
            else:
                answer = "Error parsing statement"
                verification = "Parse error"

        elif stype == "map_distance":
            map_dist = params.get("map_distance_cm", 5.0)
            scale = params.get("scale_rf", "1:50000")
            denom = int(scale.split(":")[1])
            real_cm = map_dist * denom
            real_m = real_cm / 100
            real_km = real_m / 1000
            steps.append(f"Given: Map distance = {map_dist} cm, Scale = {scale}")
            steps.append(f"RF = 1:{denom}")
            steps.append(f"Real distance = Map distance x Denominator")
            steps.append(f"Real distance = {map_dist} x {denom} = {real_cm} cm")
            if real_km >= 1 and real_km == int(real_km):
                answer = f"{real_km} km"
                steps.append(f"In km: {real_cm} cm = {real_km} km")
            else:
                answer = f"{real_m} m" if real_m == int(real_m) else f"{real_m:.1f} m"
                steps.append(f"In metres: {real_cm} cm = {real_m} m")
            verification = f"Check: Map {map_dist}cm x {denom} = {real_cm}cm ground = {answer}"

        elif stype == "rf_to_graphical":
            scale = params.get("scale_rf", "1:50000")
            denom = int(scale.split(":")[1])
            # 1 km on ground
            ground_cm = 1 * 100000
            graphical_cm = ground_cm / denom
            steps.append(f"Given: Scale = {scale}")
            steps.append(f"1 km on ground = 100,000 cm")
            steps.append(f"Map distance = 100,000 / {denom} = {graphical_cm:.4f} cm")
            answer = f"{graphical_cm:.4f} cm"
            verification = f"100000 / {denom} = {100000/denom:.4f} cm"

        else:
            answer = "Unknown scale type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Map scale problem ({stype})"
        )

    # ─── Latitude & Longitude ──────────────────────────────────────────────

    @staticmethod
    def solve_latitude_longitude(params: Dict) -> SolverResult:
        """
        Solve latitude/longitude problems.

        params:
            problem_type: 'distance_lat' | 'time_difference' | 'local_time' |
                          'longitude_difference'
            lat1: float (degrees)
            lat2: float (degrees)
            long1: float (degrees)
            long2: float (degrees)
            base_longitude: float
            local_time: str (HH:MM)
            time_zone_longitude: float
        """
        steps = []
        ptype = params.get("problem_type", "distance_lat")

        if ptype == "distance_lat":
            lat1 = params.get("lat1", 20.0)
            lat2 = params.get("lat2", 30.0)
            diff = abs(lat2 - lat1)
            distance_km = diff * 111
            steps.append(f"Given: Latitude 1 = {lat1} N, Latitude 2 = {lat2} N")
            steps.append(f"Difference in latitude = |{lat2} - {lat1}| = {diff} degrees")
            steps.append(f"1 degree of latitude = 111 km")
            steps.append(f"Distance = {diff} x 111 = {distance_km} km")
            answer = f"{distance_km} km"
            verification = f"{diff} deg x 111 km/deg = {distance_km} km"

        elif ptype == "time_difference":
            long1 = params.get("long1", 30.0)
            long2 = params.get("long2", 60.0)
            diff = abs(long2 - long1)
            time_diff_min = diff * 4
            time_diff_hr = diff * 4 / 60
            hours = int(time_diff_min // 60)
            mins = int(time_diff_min % 60)
            steps.append(f"Given: Longitude 1 = {long1} E, Longitude 2 = {long2} E")
            steps.append(f"Difference in longitude = |{long2} - {long1}| = {diff} degrees")
            steps.append(f"1 degree = 4 minutes")
            steps.append(f"Time difference = {diff} x 4 = {time_diff_min} minutes = {hours}h {mins}m")
            if mins == 0:
                answer = f"{hours} hour(s)"
            else:
                answer = f"{hours} hour(s) {mins} minute(s)"
            verification = f"{diff} deg x 4 min/deg = {time_diff_min} min = {answer}"

        elif ptype == "local_time":
            base_long = params.get("base_longitude", 82.5)
            place_long = params.get("time_zone_longitude", 75.0)
            base_time_str = params.get("local_time", "12:00")
            h, m = map(int, base_time_str.split(":"))
            long_diff = place_long - base_long
            time_diff_min = long_diff * 4
            total_min = h * 60 + m + int(time_diff_min)
            total_min = total_min % (24 * 60)
            new_h = total_min // 60
            new_m = total_min % 60
            steps.append(f"Given: Standard Meridian time = {base_time_str} (at {base_long} E)")
            steps.append(f"Place longitude = {place_long} E")
            steps.append(f"Longitude difference = {place_long} - {base_long} = {long_diff} degrees")
            if long_diff > 0:
                steps.append(f"Place is EAST of standard meridian -> ADD time")
            else:
                steps.append(f"Place is WEST of standard meridian -> SUBTRACT time")
            steps.append(f"Time difference = {long_diff} x 4 = {time_diff_min} minutes")
            sign = "+" if long_diff > 0 else "-"
            abs_diff = abs(int(time_diff_min))
            steps.append(f"Local time = {base_time_str} {sign} {abs_diff} min = {new_h:02d}:{new_m:02d}")
            answer = f"{new_h:02d}:{new_m:02d}"
            verification = f"({base_time_str} with {long_diff} deg x 4 min) = {answer}"

        elif ptype == "longitude_difference":
            long1 = params.get("long1", 0.0)
            long2 = params.get("long2", 90.0)
            same_hemisphere = params.get("same_hemisphere", True)
            if same_hemisphere:
                diff = abs(long2 - long1)
                steps.append(f"Both longitudes are in the same hemisphere")
                steps.append(f"Difference = |{long2} - {long1}| = {diff} degrees")
            else:
                diff = abs(long1) + abs(long2)
                steps.append(f"Longitudes are in opposite hemispheres")
                steps.append(f"Difference = |{long1}| + |{long2}| = {abs(long1)} + {abs(long2)} = {diff} degrees")
            steps.append(f"Time difference = {diff} x 4 = {diff * 4} minutes")
            answer = f"{diff} degrees, {diff * 4} minutes time difference"
            verification = f"Longitude diff = {diff} deg, time diff = {diff*4} min"

        else:
            answer = "Unknown problem type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Latitude/Longitude problem ({ptype})"
        )

    # ─── Temperature Conversion ────────────────────────────────────────────

    @staticmethod
    def solve_temperature_conversion(params: Dict) -> SolverResult:
        """
        Solve temperature conversion problems.

        params:
            conversion_type: 'celsius_to_fahrenheit' | 'fahrenheit_to_celsius'
            temperature: float
        """
        steps = []
        ctype = params.get("conversion_type", "celsius_to_fahrenheit")
        temp = params.get("temperature", 25.0)

        if ctype == "celsius_to_fahrenheit":
            f = (temp * 9 / 5) + 32
            steps.append(f"Given: Temperature = {temp} C")
            steps.append(f"Formula: F = (C x 9/5) + 32")
            steps.append(f"F = ({temp} x 9/5) + 32")
            steps.append(f"F = {temp * 9 / 5} + 32")
            steps.append(f"F = {f:.1f}")
            answer = f"{f:.1f} F"
            verification = f"Check reverse: ({f:.1f} - 32) x 5/9 = {(f-32)*5/9:.1f} C (close to {temp})"

        elif ctype == "fahrenheit_to_celsius":
            c = (temp - 32) * 5 / 9
            steps.append(f"Given: Temperature = {temp} F")
            steps.append(f"Formula: C = (F - 32) x 5/9")
            steps.append(f"C = ({temp} - 32) x 5/9")
            steps.append(f"C = {temp - 32} x 5/9")
            steps.append(f"C = {c:.2f}")
            answer = f"{c:.2f} C"
            verification = f"Check reverse: ({c:.2f} x 9/5) + 32 = {c * 9/5 + 32:.2f} F (close to {temp})"

        else:
            answer = "Unknown conversion type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Temperature conversion ({ctype})"
        )

    # ─── Average Temperature & Rainfall ────────────────────────────────────

    @staticmethod
    def solve_average_temperature(params: Dict) -> SolverResult:
        """
        Calculate average temperature from monthly data.

        params:
            temperatures: List[float] (monthly temperatures in Celsius)
        """
        temps = params.get("temperatures", [20.0, 22.0, 26.0, 30.0, 32.0, 30.0, 28.0, 27.0, 27.0, 27.0, 24.0, 21.0])
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        steps = []
        steps.append("Monthly temperatures (C):")
        for i, t in enumerate(temps):
            steps.append(f"  {months[i]}: {t}C")
        total = sum(temps)
        count = len(temps)
        avg = total / count
        steps.append(f"Sum of temperatures = {' + '.join([str(t) for t in temps])} = {total}")
        steps.append(f"Number of months = {count}")
        steps.append(f"Average = {total} / {count} = {avg:.2f}C")
        answer = f"{avg:.2f} C"
        verification = f"Sum check: {total}/{count} = {total/count:.2f}"
        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation="Calculated mean annual temperature"
        )

    @staticmethod
    def solve_rainfall_analysis(params: Dict) -> SolverResult:
        """
        Analyse rainfall data.

        params:
            rainfall: List[float] (monthly rainfall in mm)
            analysis_type: 'total' | 'average' | 'peak_month' | 'seasonal'
        """
        rainfall = params.get("rainfall", [0.0, 5.0, 15.0, 30.0, 50.0, 200.0, 250.0, 180.0, 100.0, 35.0, 10.0, 2.0])
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        atype = params.get("analysis_type", "total")
        steps = []
        steps.append("Monthly rainfall (mm):")
        for i, r in enumerate(rainfall):
            steps.append(f"  {months[i]}: {r} mm")
        total = sum(rainfall)
        avg = total / len(rainfall)
        max_idx = rainfall.index(max(rainfall))
        max_month = months[max_idx]
        max_val = max(rainfall)

        if atype == "total":
            steps.append(f"Total annual rainfall = {' + '.join([str(r) for r in rainfall])}")
            steps.append(f"Total = {total} mm")
            answer = f"{total} mm"
            verification = f"Sum verification: {total} mm"

        elif atype == "average":
            steps.append(f"Total rainfall = {total} mm")
            steps.append(f"Average monthly rainfall = {total} / {len(rainfall)} = {avg:.1f} mm")
            answer = f"{avg:.1f} mm"
            verification = f"Total {total} / 12 = {avg:.1f}"

        elif atype == "peak_month":
            steps.append(f"Maximum rainfall = {max_val} mm in {max_month}")
            steps.append(f"Minimum rainfall = {min(rainfall)} mm in {months[rainfall.index(min(rainfall))]}")
            answer = f"{max_month} ({max_val} mm)"
            verification = f"Max found: {max_val} mm at index {max_idx} = {max_month}"

        elif atype == "seasonal":
            # Indian seasons: Winter(Jan-Feb), Summer(Mar-May), Monsoon(Jun-Sep), Post-monsoon(Oct-Dec)
            winter = sum(rainfall[0:2])
            summer = sum(rainfall[2:5])
            monsoon = sum(rainfall[5:9])
            post_monsoon = sum(rainfall[9:12])
            steps.append(f"Winter (Jan-Feb): {winter} mm")
            steps.append(f"Summer (Mar-May): {summer} mm")
            steps.append(f"Monsoon (Jun-Sep): {monsoon} mm")
            steps.append(f"Post-monsoon (Oct-Dec): {post_monsoon} mm")
            answer = f"Monsoon season has highest rainfall ({monsoon} mm)"
            verification = f"Season totals: W={winter}, S={summer}, M={monsoon}, PM={post_monsoon}"

        else:
            answer = "Unknown analysis type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Rainfall analysis ({atype})"
        )

    # ─── Wind Direction ────────────────────────────────────────────────────

    @staticmethod
    def solve_wind_direction(params: Dict) -> SolverResult:
        """
        Solve wind direction problems.

        params:
            wind_from: str (direction wind comes FROM, e.g., "South", "NE")
            isb_movement: str, e.g., "northward"
            season: str (summer/winter)
        """
        wind_from = params.get("wind_from", "South")
        movement = params.get("isb_movement", "northward")
        season = params.get("season", "summer")
        steps = []
        steps.append(f"Wind direction: Wind blows FROM the {wind_from}")
        steps.append(f"Therefore, wind is called: {wind_from} wind")
        steps.append(f"ITCZ movement: {movement} during {season} season")

        south_dir = ["South", "south", "SE", "se", "SW", "sw", "S"]
        north_dir = ["North", "north", "NE", "ne", "NW", "nw", "N"]

        if wind_from in south_dir:
            wind_name = f"{wind_from}west" if wind_from in ["SW", "sw", "Southwest", "southwest"] else \
                        f"{wind_from}ast" if wind_from in ["SE", "se", "Southeast", "southeast"] else \
                        f"{wind_from} Monsoon Wind"
            if wind_from.lower() in ["south", "s"]:
                wind_name = "Southwest Monsoon Wind"
            steps.append(f"In Indian context, this is the {wind_name}")
            if "south" in wind_from.lower():
                steps.append("Southwest monsoon brings heavy rainfall to India (June-September)")
                answer = "Southwest Monsoon / Summer Monsoon - brings rainfall to India"
                verification = "SW monsoon = wind from south blowing toward ITCZ in north"
            else:
                answer = f"Wind from {wind_from}"
                verification = f"Wind direction: FROM {wind_from}"
        elif wind_from in north_dir:
            steps.append(f"Wind from {wind_from} = Northeast Trade / Retreating Monsoon")
            steps.append("Northeast monsoon brings rain to Tamil Nadu and coast (Oct-Dec)")
            answer = f"Wind from {wind_from} - Northeast Monsoon / Retreating Monsoon"
            verification = f"Wind direction: FROM {wind_from}"
        else:
            answer = f"Wind from {wind_from}"
            verification = f"Wind FROM {wind_from}"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation="Wind direction analysis"
        )

    # ─── Water Cycle ───────────────────────────────────────────────────────

    @staticmethod
    def solve_water_cycle(params: Dict) -> SolverResult:
        """
        Solve water cycle sequence problems.

        params:
            question_type: 'sequence' | 'process_name' | 'cloud_type_rain'
            process: str (process name to identify)
        """
        steps = []
        qtype = params.get("question_type", "sequence")

        water_cycle_steps = [
            "1. Evaporation: Sun heats water bodies -> water vapour rises",
            "2. Transpiration: Plants release water vapour into air",
            "3. Condensation: Water vapour cools and forms clouds",
            "4. Precipitation: Water falls as rain, snow, sleet, or hail",
            "5. Surface Runoff: Water flows over land into rivers/lakes",
            "6. Infiltration: Water seeps into ground (groundwater)",
            "7. Collection: Water collects in rivers, lakes, and oceans"
        ]

        if qtype == "sequence":
            steps.append("Steps of the Water Cycle:")
            for s in water_cycle_steps:
                steps.append(f"  {s}")
            answer = "Evaporation -> Transpiration -> Condensation -> Precipitation -> Runoff/Infiltration -> Collection"
            verification = "7-step water cycle confirmed"

        elif qtype == "process_name":
            process = params.get("process", "condensation")
            process_map = {
                "evaporation": "Water changes from liquid to vapour (liquid -> gas) when heated by sun",
                "transpiration": "Plants release water vapour through their leaves",
                "condensation": "Water vapour cools and changes back to tiny water droplets forming clouds",
                "precipitation": "Water falls from clouds as rain, snow, hail, or sleet",
                "runoff": "Water flows over the land surface into rivers and streams",
                "infiltration": "Water seeps through the soil into the ground",
                "collection": "Water collects in rivers, lakes, seas, and oceans"
            }
            desc = process_map.get(process.lower(), "Unknown process")
            steps.append(f"Process: {process}")
            steps.append(f"Description: {desc}")
            answer = desc
            verification = f"Process '{process}' identified correctly"

        elif qtype == "cloud_type_rain":
            cloud_type = params.get("process", "cumulonimbus")
            cloud_rain = {
                "cumulonimbus": "Cumulonimbus clouds - tall, thunderstorm clouds that produce heavy rain, thunder, and lightning",
                "nimbostratus": "Nimbostratus clouds - dark, layered clouds that produce steady continuous rain",
                "cumulus": "Cumulus clouds - puffy white clouds, usually indicate fair weather but can develop into rain clouds",
                "stratus": "Stratus clouds - flat grey layer, may produce drizzle",
                "cirrus": "Cirrus clouds - thin wispy high clouds, made of ice crystals, no rain"
            }
            desc = cloud_rain.get(cloud_type.lower(), "Unknown cloud type")
            steps.append(f"Cloud type: {cloud_type}")
            steps.append(f"Description: {desc}")
            answer = desc
            verification = f"Cloud type '{cloud_type}' - correct description"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Water cycle ({qtype})"
        )

    # ─── Weather Instruments ───────────────────────────────────────────────

    @staticmethod
    def solve_weather_instruments(params: Dict) -> SolverResult:
        """
        Solve weather instrument problems.

        params:
            question_type: 'identify' | 'unit' | 'what_measures'
            instrument: str
        """
        steps = []
        qtype = params.get("question_type", "identify")
        instrument = params.get("instrument", "thermometer")

        instruments = {
            "thermometer": {
                "measures": "Temperature",
                "unit": "Degree Celsius (C) or Degree Fahrenheit (F)",
                "description": "A sealed glass tube with mercury/alcohol that expands/contracts with temperature",
                "placement": "Kept in a Stevenson screen at 1.25-2m above ground, in shade"
            },
            "barometer": {
                "measures": "Atmospheric pressure",
                "unit": "Millibars (mb) or Hectopascals (hPa)",
                "description": "Measures weight of air above; mercury or aneroid type",
                "placement": "Indoors, at sea level"
            },
            "hygrometer": {
                "measures": "Relative Humidity",
                "unit": "Percentage (%)",
                "description": "Measures moisture content in air; wet and dry bulb type",
                "placement": "Same as thermometer"
            },
            "anemometer": {
                "measures": "Wind speed",
                "unit": "Kilometres per hour (km/h) or Knots",
                "description": "Has rotating cups/counter that spin with wind",
                "placement": "10m above ground, open area"
            },
            "wind_vane": {
                "measures": "Wind direction",
                "unit": "Cardinal direction (N, S, E, W)",
                "description": "Arrow that points in direction wind comes FROM",
                "placement": "10m above ground"
            },
            "rain_gauge": {
                "measures": "Rainfall amount",
                "unit": "Millimetres (mm)",
                "description": "Cylindrical collector that measures collected water depth",
                "placement": "On ground, open area away from buildings"
            },
            "stevenson_screen": {
                "measures": "Housing for instruments",
                "unit": "N/A",
                "description": "White wooden box with louvered sides, painted white to reflect sun",
                "placement": "1.25m above grassy ground"
            }
        }

        info = instruments.get(instrument.lower(), {
            "measures": "Unknown", "unit": "N/A",
            "description": "Unknown instrument", "placement": "N/A"
        })

        if qtype == "identify":
            steps.append(f"Instrument: {instrument}")
            steps.append(f"Measures: {info['measures']}")
            steps.append(f"Description: {info['description']}")
            steps.append(f"Unit: {info['unit']}")
            steps.append(f"Placement: {info['placement']}")
            answer = f"{instrument} measures {info['measures']} in {info['unit']}"
            verification = f"Instrument lookup: {instrument} -> {info['measures']}"

        elif qtype == "unit":
            steps.append(f"Instrument: {instrument}")
            steps.append(f"Quantity measured: {info['measures']}")
            steps.append(f"Standard unit: {info['unit']}")
            answer = info['unit']
            verification = f"Unit lookup for {instrument}: {info['unit']}"

        elif qtype == "what_measures":
            steps.append(f"Instrument: {instrument}")
            steps.append(f"Measures: {info['measures']}")
            answer = info['measures']
            verification = f"{instrument} -> {info['measures']}"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Weather instrument ({qtype})"
        )

    # ─── Soil Types ────────────────────────────────────────────────────────

    @staticmethod
    def solve_soil_types(params: Dict) -> SolverResult:
        """
        Solve soil type problems.

        params:
            question_type: 'identify' | 'characteristics' | 'crops' | 'properties'
            soil_name: str
        """
        steps = []
        qtype = params.get("question_type", "identify")
        soil_name = params.get("soil_name", "alluvial")

        soils = {
            "alluvial": {
                "location": "River basins and deltas (Ganga, Brahmaputra, Indus, Godavari, Krishna)",
                "characteristics": "Fertile, rich in potash and lime, deep, well-drained",
                "crops": "Rice, wheat, sugarcane, cotton, jute, maize",
                "color": "Light brown to grey",
                "properties": "Most fertile soil in India; supports 40% of India's population"
            },
            "black": {
                "location": "Deccan Plateau (Maharashtra, MP, Gujarat, Andhra Pradesh)",
                "characteristics": "Clayey, retains moisture, rich in iron, lime, magnesium",
                "crops": "Cotton, jowar, wheat, linseed, sunflower",
                "color": "Deep black",
                "properties": "Also called Regur soil; excellent for cotton growing"
            },
            "red": {
                "location": "Tamil Nadu, Karnataka, Maharashtra, Andhra Pradesh, Chhattisgarh",
                "characteristics": "Sandy, porous, poor in nitrogen and lime, iron oxide gives red color",
                "crops": "Millets, pulses, tobacco, groundnut, potato",
                "color": "Reddish brown to red",
                "properties": "Formed from ancient crystalline rocks"
            },
            "laterite": {
                "location": "Karnataka, Kerala, Tamil Nadu, Madhya Pradesh, Assam hills",
                "characteristics": "Rich in iron and aluminium, poor in nitrogen and potash, hard when dry",
                "crops": "Cashew nuts, rubber, tea, coffee, coconut",
                "color": "Reddish brown",
                "properties": "Formed in hot and wet tropical areas; 'later' means brick in Latin"
            },
            "desert": {
                "location": "Rajasthan (Thar Desert), Gujarat, Haryana",
                "characteristics": "Sandy, low organic matter, contains nitrates, porous",
                "crops": "Bajra, jowar, cotton (with irrigation)",
                "color": "Sandy brown to yellow",
                "properties": "Low water-holding capacity; supports drought-resistant crops"
            },
            "mountain": {
                "location": "Himalayan region (Jammu & Kashmir, Himachal Pradesh, Uttarakhand)",
                "characteristics": "Loamy, rich in organic matter, good drainage, thin layer",
                "crops": "Tea, coffee, spices, fruits (apple, pear)",
                "color": "Dark brown",
                "properties": "Denudation gives fertile soil on lower slopes"
            }
        }

        info = soils.get(soil_name.lower(), {
            "location": "Unknown", "characteristics": "Unknown",
            "crops": "Unknown", "color": "Unknown", "properties": "Unknown"
        })

        if qtype == "identify":
            steps.append(f"Soil type: {soil_name.title()} Soil")
            steps.append(f"Found in: {info['location']}")
            steps.append(f"Color: {info['color']}")
            steps.append(f"Main crops: {info['crops']}")
            answer = f"{soil_name.title()} soil - found in {info['location']}"
            verification = f"Soil database lookup: {soil_name} -> {info['location']}"

        elif qtype == "characteristics":
            steps.append(f"Soil: {soil_name.title()}")
            steps.append(f"Characteristics: {info['characteristics']}")
            steps.append(f"Properties: {info['properties']}")
            answer = info['characteristics']
            verification = f"Characteristics of {soil_name} soil: {info['characteristics']}"

        elif qtype == "crops":
            steps.append(f"Soil: {soil_name.title()}")
            steps.append(f"Suitable crops: {info['crops']}")
            answer = info['crops']
            verification = f"Crops for {soil_name} soil: {info['crops']}"

        elif qtype == "properties":
            steps.append(f"Soil: {soil_name.title()}")
            steps.append(f"Properties: {info['properties']}")
            answer = info['properties']
            verification = f"Properties of {soil_name} soil confirmed"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Soil analysis ({qtype})"
        )

    # ─── Natural Vegetation ────────────────────────────────────────────────

    @staticmethod
    def solve_natural_vegetation(params: Dict) -> SolverResult:
        """
        Solve natural vegetation problems.

        params:
            question_type: 'identify' | 'characteristics' | 'climate_match'
            vegetation_type: str
            region: str
        """
        steps = []
        qtype = params.get("question_type", "identify")
        veg_type = params.get("vegetation_type", "tropical evergreen")

        vegetation = {
            "tropical evergreen": {
                "climate": "Hot and wet (Tropical Rainforest)",
                "rainfall": "Above 200 cm annually",
                "location": "Western Ghats, Andaman & Nicobar Islands, Assam, West Bengal",
                "trees": "Mahogany, teak, rosewood, ebony, rubber, bamboo",
                "characteristics": "Dense canopy, tall trees (30-60m), multi-layered, evergreen"
            },
            "tropical deciduous": {
                "climate": "Tropical with distinct dry season",
                "rainfall": "100-200 cm annually",
                "location": "Most of India (Central, North, East, Deccan plateau)",
                "trees": "Sal, teak, sandalwood, shisham, neem, mango, banyan",
                "characteristics": "Shed leaves in dry season (summer), less dense than evergreen"
            },
            "tropical thorn": {
                "climate": "Arid and semi-arid",
                "rainfall": "25-50 cm annually",
                "location": "Rajasthan, Gujarat, Haryana, Punjab, Deccan plateau",
                "trees": "Babul, khair, date palm, cactus, kikar, ber",
                "characteristics": "Scattered, thorny, small leaves, deep roots for water"
            },
            "montane": {
                "climate": "Cool and wet (Himalayan climate)",
                "rainfall": "150-250 cm annually",
                "location": "Himalayan slopes (varying altitudes)",
                "trees": "Deodar, pine, fir, spruce, oak, chestnut, birch",
                "characteristics": "Varies with altitude: temperate at lower, alpine at higher"
            },
            "mangrove": {
                "climate": "Tropical coastal/marshy",
                "rainfall": "High humidity, tidal influence",
                "location": "Sundarbans (West Bengal), Andaman, Odisha, Gujarat coast",
                "trees": "Sundari, garan, keora, hogel, nypa palm",
                "characteristics": "Roots above ground (pneumatophores), salt-tolerant"
            },
            "sub-tropical": {
                "climate": "Sub-tropical (cool winters, hot summers)",
                "rainfall": "100-250 cm annually",
                "location": "Hills of Assam, Nilgiris, Eastern Ghats",
                "trees": "Oak, chestnut, pine, champak, magnolia",
                "characteristics": "Mixed vegetation, broad-leaved trees"
            }
        }

        info = vegetation.get(veg_type.lower(), {
            "climate": "Unknown", "rainfall": "Unknown",
            "location": "Unknown", "trees": "Unknown", "characteristics": "Unknown"
        })

        if qtype == "identify":
            steps.append(f"Vegetation type: {veg_type.title()} Forest")
            steps.append(f"Climate: {info['climate']}")
            steps.append(f"Rainfall: {info['rainfall']}")
            steps.append(f"Found in: {info['location']}")
            steps.append(f"Important trees: {info['trees']}")
            steps.append(f"Characteristics: {info['characteristics']}")
            answer = f"{veg_type.title()} - {info['climate']}, found in {info['location']}"
            verification = f"Vegetation database: {veg_type} -> {info['location']}"

        elif qtype == "climate_match":
            region = params.get("region", "Western Ghats")
            best_match = "tropical evergreen"
            for vname, vinfo in vegetation.items():
                if region.lower() in vinfo["location"].lower():
                    best_match = vname
                    break
            steps.append(f"Region: {region}")
            steps.append(f"Climate/rainfall determines the vegetation type")
            steps.append(f"Best matching vegetation: {best_match.title()}")
            answer = best_match.title()
            verification = f"Region '{region}' -> {best_match.title()} forest"

        elif qtype == "characteristics":
            steps.append(f"Vegetation: {veg_type.title()}")
            steps.append(f"Characteristics: {info['characteristics']}")
            steps.append(f"Climate: {info['climate']}")
            answer = info['characteristics']
            verification = f"Characteristics of {veg_type}: {info['characteristics']}"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Natural vegetation ({qtype})"
        )

    # ─── Landform Identification (Contours) ────────────────────────────────

    @staticmethod
    def solve_landform_identification(params: Dict) -> SolverResult:
        """
        Identify landforms from contour descriptions.

        params:
            pattern: str
                'concentric_circles' | 'v_shape_river' | 'close_spaced' |
                'far_spaced' | 'u_shape' | 'hachure' | 'overlapping' |
                'bench' | 'concave'
            has_river: bool (for V-shape)
            hill_height: float (for concentric circles)
        """
        steps = []
        pattern = params.get("pattern", "concentric_circles")

        landform_map = {
            "concentric_circles": {
                "landform": "Hill / Hillock / Peak",
                "explanation": "Circular concentric contours represent a hill. Inner circle = peak (highest point). Close spacing = steep slope.",
                "hachure": "No hachures (these indicate depression, not hill)"
            },
            "v_shape_river": {
                "landform": "River Valley (V-shaped valley)",
                "explanation": "Contours form a V-shape pointing upstream. River flows in the valley. V points towards higher ground.",
                "hachure": "If hachures on inside of V = river cliff/valley wall"
            },
            "close_spaced": {
                "landform": "Steep Slope",
                "explanation": "Contours close together = steep slope. Close spacing = rapid change in elevation over short distance.",
                "hachure": "If hachures on contours = cliff"
            },
            "far_spaced": {
                "landform": "Gentle Slope",
                "explanation": "Contours far apart = gentle slope. Gradual elevation change over longer distance.",
                "hachure": "N/A"
            },
            "u_shape": {
                "landform": "Spur",
                "explanation": "Contours form U or V shape pointing downhill = spur (projecting ridge). Contours bulge towards lower ground.",
                "hachure": "N/A"
            },
            "hachure": {
                "landform": "Cliff or Steep Slope",
                "explanation": "Hachures (short lines) on the downslope side of contours indicate very steep ground or cliff.",
                "hachure": "Hachures point downslope"
            },
            "overlapping": {
                "landform": "Plateau",
                "explanation": "Two or more contours overlapping = vertical or near-vertical cliff face (often at plateau edge).",
                "hachure": "Overlapping contours = cliff/scarp"
            },
            "bench": {
                "landform": "Terraced Slope",
                "explanation": "Contours with flat bench-like sections indicate terraced slope (man-made or natural terraces).",
                "hachure": "N/A"
            },
            "concave": {
                "landform": "Concave Slope",
                "explanation": "Contours start far apart and get closer together upwards = concave slope (steep at bottom, gentle at top).",
                "hachure": "N/A"
            }
        }

        info = landform_map.get(pattern, {"landform": "Unknown", "explanation": "Unknown pattern"})

        steps.append(f"Contour pattern: {pattern.replace('_', ' ').title()}")
        steps.append(f"Landform: {info['landform']}")
        steps.append(f"Explanation: {info['explanation']}")
        if "hachure" in info and info["hachure"] != "N/A":
            steps.append(f"Hachure note: {info['hachure']}")
        answer = info['landform']
        verification = f"Pattern '{pattern}' -> {info['landform']}: {info['explanation']}"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation="Contour pattern analysis"
        )

    # ─── Contour Interval & Height ─────────────────────────────────────────

    @staticmethod
    def solve_contour_interval(params: Dict) -> SolverResult:
        """
        Solve contour interval and height problems.

        params:
            problem_type: 'find_interval' | 'find_height' | 'find_vertical'
            contours_given: List[int] (contour values visible on map)
            height_point_a: float
            height_point_b: float
        """
        steps = []
        ptype = params.get("problem_type", "find_interval")

        if ptype == "find_interval":
            contours = params.get("contours_given", [100, 200, 300, 400, 500])
            steps.append(f"Contours shown: {contours}")
            if len(contours) >= 2:
                diffs = [contours[i+1] - contours[i] for i in range(len(contours)-1)]
                interval = diffs[0]
                all_same = all(d == interval for d in diffs)
                steps.append(f"Differences: {diffs}")
                if all_same:
                    steps.append(f"Contour Interval = {interval} m")
                    answer = f"{interval} m"
                    verification = f"All differences = {interval} -> CI = {interval} m"
                else:
                    steps.append(f"Varying intervals detected, first interval = {interval} m")
                    answer = f"{interval} m (first interval)"
                    verification = f"Check: intervals = {diffs}"
            else:
                answer = "Need at least 2 contours"
                verification = "Insufficient data"

        elif ptype == "find_height":
            contour_interval = params.get("contour_interval", 20)
            nearest_lower = params.get("height_point_a", 120)
            fraction = params.get("height_point_b", 0.3)  # fraction above lower contour
            height = nearest_lower + fraction * contour_interval
            steps.append(f"Contour Interval = {contour_interval} m")
            steps.append(f"Point is between {nearest_lower} m and {nearest_lower + contour_interval} m contours")
            steps.append(f"Fraction above lower contour = {fraction}")
            steps.append(f"Height = {nearest_lower} + ({fraction} x {contour_interval})")
            steps.append(f"Height = {nearest_lower} + {fraction * contour_interval} = {height:.1f} m")
            answer = f"{height:.1f} m"
            verification = f"{nearest_lower} + {fraction}x{contour_interval} = {height:.1f} m"

        elif ptype == "find_vertical":
            height_a = params.get("height_point_a", 200.0)
            height_b = params.get("height_point_b", 100.0)
            vertical = abs(height_a - height_b)
            steps.append(f"Height at point A = {height_a} m")
            steps.append(f"Height at point B = {height_b} m")
            steps.append(f"Vertical interval = |{height_a} - {height_b}| = {vertical} m")
            answer = f"{vertical} m"
            verification = f"|{height_a} - {height_b}| = {vertical} m"

        else:
            answer = "Unknown problem type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Contour problem ({ptype})"
        )

    # ─── Atmosphere Layers ─────────────────────────────────────────────────

    @staticmethod
    def solve_atmosphere_layers(params: Dict) -> SolverResult:
        """
        Solve atmosphere layer problems.

        params:
            question_type: 'identify' | 'height_range' | 'properties' | 'order'
            layer_name: str
            height_km: float
        """
        steps = []
        qtype = params.get("question_type", "identify")
        layer_name = params.get("layer_name", "troposphere")

        layers = [
            ("Troposphere", "0 to 12 km", "All weather phenomena occur here; temperature decreases with height"),
            ("Stratosphere", "12 to 50 km", "Contains ozone layer; temperature increases with height; jet aircraft fly here"),
            ("Mesosphere", "50 to 80 km", "Meteors burn here; coldest layer"),
            ("Thermosphere", "80 to 500+ km", "Aurora borealis occurs here; temperature very high; ISS orbits here"),
            ("Exosphere", "500+ km", "Outermost layer; merges with space; satellites orbit here")
        ]

        if qtype == "identify":
            for name, height, desc in layers:
                if name.lower() == layer_name.lower():
                    steps.append(f"Layer: {name}")
                    steps.append(f"Height: {height}")
                    steps.append(f"Key features: {desc}")
                    answer = f"{name} ({height}): {desc}"
                    verification = f"Atmosphere layers data: {name} = {height}"
                    break
            else:
                answer = "Layer not found"
                verification = "Check spelling"

        elif qtype == "height_range":
            for name, height, desc in layers:
                if name.lower() == layer_name.lower():
                    steps.append(f"Layer: {name}")
                    steps.append(f"Height range: {height}")
                    answer = height
                    verification = f"Height range for {name}: {height}"
                    break
            else:
                answer = "Layer not found"
                verification = "Check spelling"

        elif qtype == "order":
            steps.append("Order of atmosphere layers from Earth's surface upwards:")
            for i, (name, height, desc) in enumerate(layers, 1):
                steps.append(f"  {i}. {name} ({height})")
            answer = "Troposphere -> Stratosphere -> Mesosphere -> Thermosphere -> Exosphere"
            verification = "5 layers in order confirmed"

        elif qtype == "properties":
            for name, height, desc in layers:
                if name.lower() == layer_name.lower():
                    steps.append(f"Layer: {name}")
                    steps.append(f"Properties: {desc}")
                    answer = desc
                    verification = f"Properties of {name}: {desc}"
                    break
            else:
                answer = "Layer not found"
                verification = "Check spelling"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Atmosphere layers ({qtype})"
        )

    # ─── Standard Time ─────────────────────────────────────────────────────

    @staticmethod
    def solve_standard_time(params: Dict) -> SolverResult:
        """
        Solve standard time problems.

        params:
            question_type: 'find_ist' | 'find_local' | 'timezone_given'
            place_name: str
            longitude: float
            reference_time: str (HH:MM)
            reference_longitude: float
        """
        steps = []
        qtype = params.get("question_type", "find_ist")
        place_name = params.get("place_name", "Kolkata")
        longitude = params.get("longitude", 88.4)

        if qtype == "find_ist":
            # IST is based on 82.5 E
            ist_long = 82.5
            long_diff = longitude - ist_long
            time_diff_min = long_diff * 4
            steps.append(f"Place: {place_name}, Longitude: {longitude} E")
            steps.append(f"Indian Standard Time meridian: 82.5 E (Mirzapur, UP)")
            steps.append(f"Longitude difference = {longitude} - {ist_long} = {long_diff} degrees")
            if long_diff > 0:
                steps.append(f"Place is EAST of 82.5 E -> time is AHEAD of IST")
                steps.append(f"Time difference = {long_diff} x 4 = {time_diff_min:.0f} minutes")
                steps.append(f"Local time = IST + {time_diff_min:.0f} min")
            elif long_diff < 0:
                steps.append(f"Place is WEST of 82.5 E -> time is BEHIND IST")
                time_diff_min_abs = abs(time_diff_min)
                steps.append(f"Time difference = {abs(long_diff)} x 4 = {time_diff_min_abs:.0f} minutes")
                steps.append(f"Local time = IST - {time_diff_min_abs:.0f} min")
            else:
                steps.append("Place IS ON the IST meridian (82.5 E)")
                steps.append("Local time = IST")
                time_diff_min = 0

            answer = f"Longitude diff: {long_diff} deg -> {time_diff_min:.0f} min from IST"
            verification = f"{longitude} - 82.5 = {long_diff} deg x 4 = {time_diff_min:.0f} min"

        elif qtype == "find_local':
            ref_time_str = params.get("reference_time", "12:00")
            ref_long = params.get("reference_longitude", 82.5)
            place_long = params.get("longitude", 75.0)
            h, m = map(int, ref_time_str.split(":"))
            long_diff = place_long - ref_long
            time_diff_min = long_diff * 4
            total_min = h * 60 + m + int(time_diff_min)
            total_min = total_min % (24 * 60)
            new_h = total_min // 60
            new_m = total_min % 60
            steps.append(f"Reference time: {ref_time_str} at {ref_long} E")
            steps.append(f"Place: {place_name} at {place_long} E")
            steps.append(f"Longitude difference = {place_long} - {ref_long} = {long_diff} deg")
            steps.append(f"Time difference = {long_diff} x 4 = {time_diff_min:.0f} min")
            sign = "+" if long_diff > 0 else "-"
            steps.append(f"Local time = {ref_time_str} {sign} {abs(int(time_diff_min))} min = {new_h:02d}:{new_m:02d}")
            answer = f"{new_h:02d}:{new_m:02d}"
            verification = f"({ref_time_str} {sign} {abs(int(time_diff_min))} min) = {new_h:02d}:{new_m:02d}"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Standard time calculation ({qtype})"
        )

    # ─── Earthquakes & Volcanoes ───────────────────────────────────────────

    @staticmethod
    def solve_earthquake_terms(params: Dict) -> SolverResult:
        """
        Solve earthquake/volcano terminology problems.

        params:
            question_type: 'define' | 'focus_epicenter' | 'richter' | 'ring_of_fire'
            term: str
        """
        steps = []
        qtype = params.get("question_type", "define")
        term = params.get("term", "earthquake")

        terms = {
            "earthquake": "Sudden shaking or trembling of the Earth's surface caused by movement of tectonic plates",
            "focus": "Point inside the Earth where earthquake originates (hypocenter)",
            "epicenter": "Point on Earth's surface directly above the focus; maximum damage occurs here",
            "seismic_waves": "Waves of energy generated by earthquake that travel through/on the Earth",
            "richter_scale": "Logarithmic scale to measure earthquake magnitude; each unit = 10x amplitude, 31.6x energy",
            "focus_epicenter": "Focus is underground origin; epicenter is on surface directly above focus",
            "volcano": "Mountain/opening in Earth's crust through which magma, ash, and gases erupt",
            "magma": "Molten rock material beneath Earth's surface",
            "lava": "Molten rock that reaches the Earth's surface",
            "ring_of_fire": "Zone around Pacific Ocean where most volcanoes and earthquakes occur",
            "tsunami": "Huge sea wave caused by undersea earthquake or volcanic eruption",
            "fault": "Crack/fracture in Earth's crust where plates move past each other"
        }

        if qtype == "define":
            definition = terms.get(term.lower(), "Term not found")
            steps.append(f"Term: {term}")
            steps.append(f"Definition: {definition}")
            answer = definition
            verification = f"Definition of '{term}': {definition}"

        elif qtype == "focus_epicenter":
            steps.append("Earthquake structure:")
            steps.append("  FOCUS (Hypocenter): Point inside Earth where earthquake starts")
            steps.append("  EPICENTER: Point on surface directly above focus")
            steps.append("  Seismic waves spread outward from focus in all directions")
            steps.append("  Maximum damage is at epicenter")
            steps.append("  Distance from focus to epicenter = depth of focus")
            answer = "Focus = underground origin; Epicenter = surface point above focus"
            verification = "Focus (underground) vs Epicenter (surface) - distance = depth"

        elif qtype == "richter":
            steps.append("Richter Scale facts:")
            steps.append("  - Developed by Charles Richter in 1935")
            steps.append("  - Logarithmic scale (base 10)")
            steps.append("  - Each whole number increase = 10x amplitude, ~31.6x energy")
            steps.append("  - Less than 4: Micro (not felt)")
            steps.append("  - 4-5: Minor (felt by many, slight damage)")
            steps.append("  - 5-6: Moderate (some damage)")
            steps.append("  - 6-7: Strong (serious damage)")
            steps.append("  - 7-8: Major (serious damage over large area)")
            steps.append("  - 8+: Great (total destruction near epicenter)")
            steps.append("  - Earthquakes above 9: Catastrophic (rare)")
            answer = "Logarithmic scale; each unit = 10x amplitude; measures earthquake magnitude"
            verification = "Richter scale: log scale, 10x per unit"

        elif qtype == "ring_of_fire':
            steps.append("Pacific Ring of Fire:")
            steps.append("  - Horseshoe-shaped zone around Pacific Ocean")
            steps.append("  - 75% of world's volcanoes are here")
            steps.append("  - 90% of world's earthquakes occur here")
            steps.append("  - Stretches from Americas to Asia to New Zealand")
            steps.append("  - Caused by plate boundaries: subduction zones")
            steps.append("  - Countries: Japan, Indonesia, Philippines, USA (West coast), Chile")
            answer = "Pacific Ring of Fire - zone around Pacific with most volcanoes/earthquakes"
            verification = "Ring of Fire = Pacific boundary zone, 75% volcanoes, 90% earthquakes"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Earthquake/volcano terms ({qtype})"
        )

    # ─── Ocean Currents ────────────────────────────────────────────────────

    @staticmethod
    def solve_ocean_currents(params: Dict) -> SolverResult:
        """
        Solve ocean currents problems.

        params:
            question_type: 'identify' | 'warm_cold' | 'effect' | 'monsoon_currents'
            ocean: str
            current_name: str
            coast: str
        """
        steps = []
        qtype = params.get("question_type", "identify")
        ocean = params.get("ocean", "indian")
        current_name = params.get("current_name", "agulhas")

        currents = {
            "indian": {
                "warm": [
                    ("South-West Monsoon Current", "Flows eastward during summer monsoon (Jun-Sep), brings warm water"),
                    ("Somali Current", "Flows northward along Somalia coast during summer, very warm"),
                    ("Agulhas Current", "Flows southward along east coast of Africa, warm current")
                ],
                "cold": [
                    ("West Australian Current", "Flows northward along west coast of Australia, cold"),
                    ("Benguela Current", "Flows northward along southwest coast of Africa, cold"),
                    ("South-East Trade Current", "Cold current in southern Indian Ocean")
                ]
            },
            "pacific": {
                "warm": [
                    ("Kuroshio Current", "Flows northward along Japan coast, warm"),
                    ("El Nino Current", "Warm current along Peru/Equador coast, disrupts monsoon")
                ],
                "cold": [
                    ("Peru (Humboldt) Current", "Flows northward along South America west coast, cold"),
                    ("California Current", "Flows southward along US west coast, cold")
                ]
            },
            "atlantic": {
                "warm": [
                    ("Gulf Stream", "Flows from Gulf of Mexico to NW Europe, very warm"),
                    ("Brazil Current", "Flows southward along Brazil coast, warm")
                ],
                "cold": [
                    ("Labrador Current", "Flows southward from Arctic, cold"),
                    ("Canary Current", "Flows southward along NW Africa, cold")
                ]
            }
        }

        if qtype == "identify":
            found = False
            for oce, data in currents.items():
                for ctype, clist in data.items():
                    for cname, cdesc in clist:
                        if current_name.lower() in cname.lower():
                            steps.append(f"Current: {cname}")
                            steps.append(f"Type: {'Warm' if ctype == 'warm' else 'Cold'} Current")
                            steps.append(f"Description: {cdesc}")
                            answer = f"{cname} - {'Warm' if ctype == 'warm' else 'Cold'} Current"
                            verification = f"Current lookup: {cname} -> {ctype}"
                            found = True
                            break
                    if found:
                        break
                if found:
                    break
            if not found:
                answer = "Current not found in database"
                verification = "Check current name spelling"

        elif qtype == "warm_cold":
            for oce, data in currents.items():
                for ctype, clist in data.items():
                    for cname, cdesc in clist:
                        if current_name.lower() in cname.lower():
                            ctype_str = "Warm" if ctype == "warm" else "Cold"
                            steps.append(f"Current: {cname}")
                            steps.append(f"Temperature type: {ctype_str}")
                            steps.append(f"Effect on climate: {'Increases' if ctype == 'warm' else 'Decreases'} temperature of nearby coastal areas")
                            answer = f"{ctype_str} current"
                            verification = f"{cname} is a {ctype_str} current"
                            found = True
                            break
                    if found:
                        break
                if found:
                    break
            if not found:
                answer = "Current not found"
                verification = "N/A"

        elif qtype == "effect":
            steps.append("Effects of ocean currents on climate:")
            steps.append("  WARM CURRENTS:")
            steps.append("    - Increase temperature of coastal areas")
            steps.append("    - Increase humidity and rainfall")
            steps.append("    - Example: Gulf Stream warms NW Europe")
            steps.append("  COLD CURRENTS:")
            steps.append("    - Decrease temperature of coastal areas")
            steps.append("    - Create deserts along coast (e.g., Atacama, Namib)")
            steps.append("    - Cause fog along coast")
            steps.append("    - Example: Peru Current creates Atacama Desert")
            steps.append("  MONSOON CURRENTS (Indian Ocean):")
            steps.append("    - Summer: Warm current flows toward India -> SW monsoon")
            steps.append("    - Winter: Current reverses -> NE monsoon")
            answer = "Warm currents increase temp/rainfall; cold currents decrease temp; monsoon currents drive Indian seasons"
            verification = "Ocean current effects on climate verified"

        elif qtype == "monsoon_currents":
            steps.append("Indian Ocean currents and Monsoon:")
            steps.append("  SUMMER MONSOON (June-September):")
            steps.append("    - South-West Monsoon Current flows eastward toward India")
            steps.append("    - Somali Current flows northward")
            steps.append("    - Warm currents bring moisture to India -> heavy rainfall")
            steps.append("  WINTER MONSOON (October-December):")
            steps.append("    - Currents reverse direction")
            steps.append("    - North-East Monsoon Current flows south-westward")
            steps.append("    - Retreating monsoon brings rain to Tamil Nadu coast")
            steps.append("  Relation between ITCZ and Monsoon:")
            steps.append("    - ITCZ shifts north in summer -> SW monsoon")
            steps.append("    - ITCZ shifts south in winter -> NE monsoon")
            answer = "Monsoon currents reverse seasonally; warm SW monsoon current brings rain to India in summer"
            verification = "Indian Ocean monsoon current reversal confirmed"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Ocean currents ({qtype})"
        )

    # ─── Local Climate ─────────────────────────────────────────────────────

    @staticmethod
    def solve_local_climate(params: Dict) -> SolverResult:
        """
        Solve local climate problems.

        params:
            question_type: 'factors' | 'urban_rural' | 'sea_land' | 'altitude_effect'
            factor_name: str
            place_type: str (coastal/inland/hilly/urban/rural)
        """
        steps = []
        qtype = params.get("question_type", "factors")
        factor_name = params.get("factor_name", "altitude")

        factors = {
            "altitude": {
                "explanation": "Temperature decreases with increasing altitude (lapse rate ~1C per 165m or 6.5C per 1000m)",
                "example": "Darjeeling (2130m) is cooler than Kolkata (sea level) even at same latitude",
                "effect": "Higher altitude = cooler temperature, more rainfall on windward side"
            },
            "latitude": {
                "explanation": "Places near equator are hotter; places near poles are colder",
                "example": "Chennai (13N) is warmer than Srinagar (34N)",
                "effect": "Lower latitude = more direct sunlight = higher temperature"
            },
            "distance_from_sea": {
                "explanation": "Coastal areas have moderate climate (land and sea breeze); inland areas have extreme climate",
                "example": "Mumbai (coastal) has less temperature variation than Nagpur (inland)",
                "effect": "Coastal: moderate temp; Inland: extreme temp (hot summer, cold winter)"
            },
            "ocean_currents": {
                "explanation": "Warm currents warm coastal areas; cold currents cool coastal areas",
                "example": "Mumbai warmed by warm West Indian current; Lima cooled by cold Peru current",
                "effect": "Warm current: higher temp, more rain; Cold current: lower temp, less rain"
            },
            "slope_aspect": {
                "explanation": "South-facing slopes in Northern Hemisphere receive more sun = warmer; North-facing = cooler",
                "example": "In Himalayas, south slopes are warmer and used for agriculture",
                "effect": "Slope facing sun = warmer and drier; slope facing away = cooler and moister"
            },
            "forests": {
                "explanation": "Forests moderate temperature, increase rainfall, reduce wind speed",
                "example": "Areas near forests are cooler and receive more rain than deforested areas",
                "effect": "Forests = cooler, more humid, more rainfall"
            }
        }

        if qtype == "factors":
            info = factors.get(factor_name, {"explanation": "Unknown factor"})
            steps.append(f"Climate factor: {factor_name.replace('_', ' ').title()}")
            steps.append(f"Explanation: {info['explanation']}")
            steps.append(f"Example: {info['example']}")
            steps.append(f"Effect: {info['effect']}")
            answer = info['explanation']
            verification = f"Local climate factor: {factor_name} -> {info['explanation']}"

        elif qtype == "sea_land":
            place_type = params.get("place_type", "coastal")
            if "coastal" in place_type.lower():
                steps.append("Coastal areas experience:")
                steps.append("  - Moderate temperature (land and sea breezes)")
                steps.append("  - Sea breeze in day (cool air from sea)")
                steps.append("  - Land breeze at night (cool air from land)")
                steps.append("  - Higher humidity and more rainfall")
                steps.append("  - Less temperature variation between day/night and summer/winter")
                answer = "Coastal: moderate climate, high humidity, sea breeze by day, land breeze at night"
            else:
                steps.append("Inland areas experience:")
                steps.append("  - Extreme temperature (very hot summer, very cold winter)")
                steps.append("  - Low humidity")
                steps.append("  - Less rainfall")
                steps.append("  - Large temperature variation day/night and summer/winter")
                answer = "Inland: extreme climate, high temp variation, low humidity, less rain"
            verification = f"Sea-land effect for {place_type}: difference in thermal properties of land and water"

        elif qtype == "urban_rural":
            place_type = params.get("place_type", "urban")
            if "urban" in place_type.lower():
                steps.append("Urban Heat Island Effect:")
                steps.append("  - Cities are 2-5C warmer than surrounding rural areas")
                steps.append("  - Causes: concrete/asphalt absorb heat, less vegetation, heat from vehicles/factories")
                steps.append("  - Less wind due to tall buildings")
                steps.append("  - Pollution traps heat")
                steps.append("  - Effect: warmer nights, reduced rainfall, poorer air quality")
                answer = "Urban areas are 2-5C warmer than rural (Urban Heat Island Effect)"
            else:
                steps.append("Rural areas:")
                steps.append("  - Cooler than urban areas due to vegetation")
                steps.append("  - More rainfall")
                steps.append("  - Cleaner air")
                steps.append("  - Less temperature variation due to vegetation and soil")
                answer = "Rural: cooler, more rainfall, cleaner air than urban"
            verification = f"Urban-rural climate difference confirmed"

        elif qtype == "altitude_effect":
            altitude1 = params.get("height_km", 0.0)
            altitude2 = params.get("height_point_a", 3.0)
            # altitude in km
            temp_diff = (altitude2 - altitude1) * 6.5
            steps.append(f"Place A altitude: {altitude1} km (sea level)")
            steps.append(f"Place B altitude: {altitude2} km")
            steps.append(f"Height difference: {altitude2 - altitude1} km = {(altitude2 - altitude1) * 1000} m")
            steps.append(f"Lapse rate: 6.5C per 1000m")
            steps.append(f"Temperature difference = {altitude2 - altitude1} x 6.5 = {temp_diff:.1f}C")
            if altitude2 > altitude1:
                steps.append(f"Place B is {temp_diff:.1f}C COOLER than Place A")
                answer = f"Place at {altitude2}km is {temp_diff:.1f}C cooler than sea level"
            else:
                answer = f"Temperature difference: {temp_diff:.1f}C"
            verification = f"Lapse rate: {(altitude2-altitude1)*1000}m x 6.5C/1000m = {temp_diff:.1f}C"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Local climate ({qtype})"
        )

    # ─── Environment & Conservation ─────────────────────────────────────────

    @staticmethod
    def solve_environment(params: Dict) -> SolverResult:
        """
        Solve environment and conservation problems.

        params:
            question_type: 'define' | 'causes' | 'conservation_methods' |
                           'pollution_types' | 'renewable_nonrenewable'
            term: str
        """
        steps = []
        qtype = params.get("question_type", "define")
        term = params.get("term", "environment")

        terms = {
            "environment": "The surroundings or conditions in which a person, animal, or plant lives or operates",
            "ecology": "Branch of science dealing with relations between organisms and their environment",
            "ecosystem": "A community of living organisms interacting with their physical environment",
            "biodiversity": "Variety of life in a particular habitat or ecosystem (plants, animals, microorganisms)",
            "deforestation": "Cutting down of large areas of forest; causes soil erosion, floods, climate change",
            "global_warming": "Increase in Earth's average temperature due to greenhouse gases (CO2, methane)",
            "greenhouse_effect": "Trapping of heat by gases in atmosphere; natural but enhanced by human activity",
            "pollution": "Introduction of harmful substances into the environment",
            "conservation": "Protection and preservation of natural resources and environment",
            "renewable": "Resources that can be replenished naturally (solar, wind, water, biomass)",
            "nonrenewable": "Resources that cannot be replenished once used (coal, oil, natural gas, minerals)"
        }

        if qtype == "define":
            definition = terms.get(term.lower(), "Term not found in database")
            steps.append(f"Term: {term}")
            steps.append(f"Definition: {definition}")
            answer = definition
            verification = f"Definition: {term} -> {definition}"

        elif qtype == "causes":
            causes_db = {
                "deforestation": ["Slash and burn agriculture", "Commercial logging", "Mining", "Urban expansion", "Dam construction"],
                "global_warming": ["Burning fossil fuels", "Deforestation", "Industrial emissions", "Vehicle exhaust", "Agriculture (methane)"],
                "pollution": ["Industrial waste", "Vehicle emissions", "Agricultural chemicals", "Plastic waste", "Sewage"],
                "soil_erosion": ["Deforestation", "Overgrazing", "Overcultivation", "Heavy rainfall", "Poor irrigation"]
            }
            for key, cause_list in causes_db.items():
                if term.lower() in key or key in term.lower():
                    steps.append(f"Environmental issue: {key.title()}")
                    steps.append("Causes:")
                    for c in cause_list:
                        steps.append(f"  - {c}")
                    answer = cause_list
                    verification = f"Causes of {key}: {cause_list}"
                    break
            else:
                answer = "Issue not found"
                verification = "N/A"

        elif qtype == "conservation_methods":
            methods = {
                "forests": "Afforestation, controlled logging, protected areas (national parks, sanctuaries), social forestry",
                "wildlife": "Protected areas (Tiger Reserves, Wildlife Sanctuaries), anti-poaching laws, breeding programs",
                "soil": "Terrace farming, contour ploughing, strip cropping, agroforestry, check dams",
                "water": "Rainwater harvesting, watershed management, drip irrigation, check dams, preventing pollution",
                "energy": "Use of renewable energy (solar, wind, biogas), energy conservation, public transport",
                "general": "3R principle (Reduce, Reuse, Recycle), awareness campaigns, laws and regulations"
            }
            method_key = term.lower()
            found = False
            for key, method in methods.items():
                if key in method_key or method_key in key:
                    steps.append(f"Conservation methods for {key}:")
                    steps.append(f"  {method}")
                    answer = method
                    verification = f"Conservation: {key} -> {method}"
                    found = True
                    break
            if not found:
                steps.append("General conservation methods:")
                for k, m in methods.items():
                    if k == "general":
                        steps.append(f"  {m}")
                answer = methods["general"]
                verification = "General conservation methods"

        elif qtype == "pollution_types":
            pollution_info = {
                "air": "Pollution by harmful gases (CO2, SO2, CO, NOx); causes: vehicles, factories, burning. Effects: respiratory disease, global warming",
                "water": "Pollution of water bodies by sewage, chemicals, plastics; causes: industrial waste, agricultural runoff. Effects: harm to aquatic life",
                "soil": "Degradation by chemicals, pesticides, fertilizers, plastic; causes: excessive chemicals, mining. Effects: reduced fertility",
                "noise": "Harmful loud sounds; causes: vehicles, factories, loudspeakers, construction. Effects: hearing loss, stress",
                "land": "Pollution by solid waste; causes: plastic, industrial waste, household waste. Effects: health hazards, soil contamination"
            }
            found = False
            for ptype, pinfo in pollution_info.items():
                if ptype in term.lower() or term.lower() in ptype:
                    steps.append(f"Type: {ptype.title()} Pollution")
                    steps.append(f"Details: {pinfo}")
                    answer = pinfo
                    verification = f"Pollution type {ptype}: {pinfo}"
                    found = True
                    break
            if not found:
                answer = "Pollution type not found"
                verification = "N/A"

        elif qtype == "renewable_nonrenewable':
            resources = {
                "renewable": ["Solar energy", "Wind energy", "Hydropower", "Biomass/Biogas", "Tidal energy", "Geothermal energy"],
                "nonrenewable": ["Coal", "Petroleum (Crude Oil)", "Natural Gas", "Minerals (Iron ore, Bauxite, Mica)", "Nuclear (Uranium)"]
            }
            steps.append("RENEWABLE RESOURCES (can be replenished):")
            for r in resources["renewable"]:
                steps.append(f"  - {r}")
            steps.append("NON-RENEWABLE RESOURCES (finite, will run out):")
            for r in resources["nonrenewable"]:
                steps.append(f"  - {r}")
            answer = f"Renewable: {resources['renewable']}; Non-renewable: {resources['nonrenewable']}"
            verification = "Renewable vs non-renewable resources categorized"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Environment/Conservation ({qtype})"
        )

    # ─── Compass Bearing ───────────────────────────────────────────────────

    @staticmethod
    def solve_compass_bearing(params: Dict) -> SolverResult:
        """
        Solve compass bearing problems.

        params:
            question_type: 'find_bearing' | 'quadrant' | 'convert' | 'back_bearing'
            direction_from: str
            angle_deg: float
            bearing_deg: float
        """
        steps = []
        qtype = params.get("question_type", "find_bearing")

        cardinal = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        degrees = [0, 45, 90, 135, 180, 225, 270, 315]

        if qtype == "find_bearing":
            direction = params.get("direction_from", "NE")
            angle = params.get("angle_deg", 45.0)
            steps.append(f"Direction: {direction}")
            steps.append(f"Bearing: {angle} degrees from North")
            steps.append("Bearing measured clockwise from North")
            steps.append(f"Written as: {angle}T (True bearing) or N {angle if angle <= 90 else 360-angle} {'E' if angle < 90 else 'W' if angle > 270 else ''}")
            if angle == 0:
                compass_dir = "N"
            elif angle == 90:
                compass_dir = "E"
            elif angle == 180:
                compass_dir = "S"
            elif angle == 270:
                compass_dir = "W"
            else:
                compass_dir = f"{angle}T"
            answer = f"{angle}T / {compass_dir}"
            verification = f"Bearing {angle} from North = {compass_dir}"

        elif qtype == "quadrant":
            bearing = params.get("bearing_deg", 135.0)
            if bearing == 0:
                q_dir = "N"
            elif bearing == 90:
                q_dir = "E"
            elif bearing == 180:
                q_dir = "S"
            elif bearing == 270:
                q_dir = "W"
            elif 0 < bearing < 90:
                q_dir = f"N {bearing} E"
            elif 90 < bearing < 180:
                q_dir = f"S {180 - bearing} E"
            elif 180 < bearing < 270:
                q_dir = f"S {bearing - 180} W"
            elif 270 < bearing < 360:
                q_dir = f"N {360 - bearing} W"
            else:
                q_dir = "Unknown"
            steps.append(f"Bearing: {bearing}T")
            steps.append(f"Quadrant bearing: {q_dir}")
            answer = q_dir
            verification = f"True bearing {bearing} -> Quadrant bearing {q_dir}"

        elif qtype == "back_bearing":
            forward = params.get("bearing_deg", 45.0)
            back = (forward + 180) % 360
            steps.append(f"Forward bearing: {forward}T")
            steps.append(f"Back bearing = Forward bearing + 180 (or - 180)")
            steps.append(f"Back bearing = {forward} + 180 = {forward + 180}")
            if forward + 180 >= 360:
                steps.append(f"Since > 360, subtract 360: {forward + 180} - 360 = {back}")
            steps.append(f"Back bearing: {back}T")
            answer = f"{back}T"
            verification = f"Back bearing of {forward}T = {back}T ({back}T + {forward}T = {(back+forward)%360}T = 360T = same line)"

        elif qtype == "convert':
            direction = params.get("direction_from", "North 30 East")
            # Parse "North 30 East" -> 30T
            match = re.search(r"(\d+)", direction)
            if match:
                angle = int(match.group(1))
                if "north" in direction.lower() and "east" in direction.lower():
                    true_bearing = angle
                elif "south" in direction.lower() and "east" in direction.lower():
                    true_bearing = 180 - angle
                elif "south" in direction.lower() and "west" in direction.lower():
                    true_bearing = 180 + angle
                elif "north" in direction.lower() and "west" in direction.lower():
                    true_bearing = 360 - angle
                else:
                    true_bearing = angle
                steps.append(f"Quadrant: {direction}")
                steps.append(f"True bearing: {true_bearing}T")
                answer = f"{true_bearing}T"
                verification = f"Quadrant '{direction}' -> True bearing {true_bearing}T"
            else:
                answer = "Could not parse direction"
                verification = "N/A"

        else:
            answer = "Unknown question type"
            verification = "N/A"

        return SolverResult(
            steps=steps, answer=answer, verification=verification,
            explanation=f"Compass bearing ({qtype})"
        )

    # ─── Master solve method ───────────────────────────────────────────────

    def solve(self, topic: str, params: Dict = None) -> SolverResult:
        """Main solve dispatcher."""
        if params is None:
            params = {}

        topic_map = {
            "map_scales": self.solve_map_scale,
            "latitude_longitude": self.solve_latitude_longitude,
            "temperature_conversion": self.solve_temperature_conversion,
            "average_temperature": self.solve_average_temperature,
            "rainfall_analysis": self.solve_rainfall_analysis,
            "wind_direction": self.solve_wind_direction,
            "water_cycle": self.solve_water_cycle,
            "weather_instruments": self.solve_weather_instruments,
            "soil_types": self.solve_soil_types,
            "natural_vegetation": self.solve_natural_vegetation,
            "landform_identification": self.solve_landform_identification,
            "contour_interval": self.solve_contour_interval,
            "atmosphere_layers": self.solve_atmosphere_layers,
            "standard_time": self.solve_standard_time,
            "earthquake_terms": self.solve_earthquake_terms,
            "ocean_currents": self.solve_ocean_currents,
            "local_climate": self.solve_local_climate,
            "environment": self.solve_environment,
            "compass_bearing": self.solve_compass_bearing,
        }

        solver_func = topic_map.get(topic)
        if solver_func:
            return solver_func(params)
        else:
            return SolverResult(
                steps=[f"Topic '{topic}' not recognized"],
                answer="Unknown topic",
                verification="N/A",
                explanation=f"Available topics: {list(topic_map.keys())}"
            )

    def to_dict(self, result: SolverResult) -> Dict:
        """Convert SolverResult to dictionary."""
        return {
            "steps": result.steps,
            "answer": result.answer,
            "verification": result.verification,
            "explanation": result.explanation,
            "hints": result.hints
        }


# ─── Question Generator ───────────────────────────────────────────────────────

class QuestionGenerator:
    """Generates deterministic, varied questions for Class 7 Geography."""

    def __init__(self, seed: int = None):
        if seed is not None:
            random.seed(seed)
        self.solver = GeographySolver()

    def _rand_int(self, low: int, high: int) -> int:
        return random.randint(low, high)

    def _rand_float(self, low: float, high: float, decimals: int = 1) -> float:
        return round(random.uniform(low, high), decimals)

    def _rand_choice(self, choices: list):
        return random.choice(choices)

    def generate(self, topic: str, difficulty: str, qtype: str) -> GeneratedQuestion:
        """Generate a single question."""
        topic_clean = topic.lower().replace(" ", "_").replace("-", "_")

        generators = {
            "map_scales": self._gen_map_scales,
            "latitude_longitude": self._gen_lat_long,
            "temperature_conversion": self._gen_temperature,
            "average_temperature": self._gen_avg_temp,
            "rainfall_analysis": self._gen_rainfall,
            "wind_direction": self._gen_wind,
            "water_cycle": self._gen_water_cycle,
            "weather_instruments": self._gen_weather,
            "soil_types": self._gen_soil,
            "natural_vegetation": self._gen_vegetation,
            "landform_identification": self._gen_landform,
            "contour_interval": self._gen_contour,
            "atmosphere_layers": self._gen_atmosphere,
            "standard_time": self._gen_std_time,
            "earthquake_terms": self._gen_earthquake,
            "ocean_currents": self._gen_currents,
            "local_climate": self._gen_local_climate,
            "environment": self._gen_environment,
            "compass_bearing": self._gen_compass,
        }

        gen_func = generators.get(topic_clean)
        if gen_func:
            return gen_func(difficulty, qtype)
        return self._gen_default(topic, difficulty, qtype)

    def _gen_default(self, topic: str, difficulty: str, qtype: str) -> GeneratedQuestion:
        result = self.solver.solve(topic.lower().replace(" ", "_"), {})
        return GeneratedQuestion(
            question_text=f"Question on {topic} ({difficulty}, {qtype})",
            answer=result.answer,
            solution_steps=result.steps,
            topic=topic, difficulty=difficulty, question_type=qtype
        )

    def _gen_map_scales(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        if qtype == "Standard":
            if self._rand_choice([0, 1]) == 0:
                denom = self._rand_int(100, 500000)
                while denom % 100 != 0:
                    denom = self._rand_int(100, 500000)
                scale = f"1:{denom}"
                map_dist = self._rand_float(1, 20, 1)
                question = f"A map has a scale of {scale}. What is the actual ground distance represented by {map_dist} cm on the map?"
                result = self.solver.solve("map_scales", {
                    "scale_type": "map_distance",
                    "scale_rf": scale,
                    "map_distance_cm": map_dist
                })
                answer = f"{map_dist} cm on map = {result.answer} on ground"
            else:
                km_val = self._rand_int(1, 100)
                statement = f"1 cm = {km_val} km"
                question = f"Convert the following statement scale to RF: {statement}"
                result = self.solver.solve("map_scales", {
                    "scale_type": "statement_to_rf",
                    "statement_scale": statement
                })
                answer = result.answer
        else:
            # Competency-based
            city_a = self._rand_choice(["Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore", "Pune", "Hyderabad"])
            city_b = self._rand_choice(["Agra", "Jaipur", "Ahmedabad", "Nagpur", "Bhopal", "Kanpur", "Patna"])
            denom = self._rand_choice([50000, 100000, 200000, 250000])
            map_dist = self._rand_float(3, 15, 1)
            question = (f"Rahul is planning a trip from {city_a} to {city_b}. "
                       f"He uses a tourist map with scale 1:{denom}. "
                       f"On the map, the distance between the two cities is {map_dist} cm. "
                       f"What is the actual road distance between the two cities? "
                       f"If he drives at 60 km/h, how long will the journey take?")
            result = self.solver.solve("map_scales", {
                "scale_type": "map_distance",
                "scale_rf": f"1:{denom}",
                "map_distance_cm": map_dist
            })
            real_km = float(result.answer.split()[0])
            hours = real_km / 60
            answer = f"Actual distance: {result.answer}, Time = {hours:.1f} hours ({int(hours)}h {int((hours%1)*60)}m)"

        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Map Scales", difficulty=difficulty, question_type=qtype
        )

    def _gen_lat_long(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        lat1 = self._rand_int(8, 35)
        lat2 = self._rand_int(lat1 + 1, 37)
        question = f"Find the north-south distance between two places at latitudes {lat1}N and {lat2}N."
        result = self.solver.solve("latitude_longitude", {
            "problem_type": "distance_lat",
            "lat1": float(lat1), "lat2": float(lat2)
        })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Latitude and Longitude", difficulty=difficulty, question_type=qtype
        )

    def _gen_temperature(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        if self._rand_choice([0, 1]) == 0:
            temp = self._rand_int(0, 50)
            question = f"Convert {temp}C to Fahrenheit."
            result = self.solver.solve("temperature_conversion", {
                "conversion_type": "celsius_to_fahrenheit",
                "temperature": float(temp)
            })
        else:
            temp = self._rand_int(30, 120)
            question = f"Convert {temp}F to Celsius."
            result = self.solver.solve("temperature_conversion", {
                "conversion_type": "fahrenheit_to_celsius",
                "temperature": float(temp)
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Temperature Conversion", difficulty=difficulty, question_type=qtype
        )

    def _gen_avg_temp(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        city = self._rand_choice(["Mumbai", "Delhi", "Chennai", "Kolkata", "Bangalore"])
        month_avg = self._rand_int(15, 35)
        variation = self._rand_int(3, 12)
        temps = []
        months_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        # Summer months hotter, winter cooler
        for i in range(12):
            if i in [4, 5, 6]:  # Summer
                t = month_avg + self._rand_int(0, variation)
            elif i in [10, 11, 0]:  # Winter
                t = month_avg - self._rand_int(0, variation)
            else:  # Transition
                t = month_avg + self._rand_int(-3, 3)
            temps.append(t)
        question = f"The monthly temperatures (in C) for {city} are: {dict(zip(months_short, temps))}. Calculate the annual average temperature."
        result = self.solver.solve("average_temperature", {"temperatures": temps})
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Average Temperature", difficulty=difficulty, question_type=qtype
        )

    def _gen_rainfall(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        city = self._rand_choice(["Mumbai", "Delhi", "Chennai", "Kolkata", "Bangalore", "Hyderabad"])
        months_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        base = self._rand_int(20, 100)
        rainfall = []
        for i in range(12):
            if i in [5, 6, 7, 8]:  # Monsoon
                r = base * self._rand_int(3, 15)
            elif i in [9, 10]:  # Post-monsoon
                r = base * self._rand_int(1, 4)
            else:  # Dry
                r = base // self._rand_int(2, 6)
            rainfall.append(max(0, r))

        if qtype == "Standard":
            atype = self._rand_choice(["total", "average", "peak_month"])
            question_text = f"Rainfall data for {city} (mm): {dict(zip(months_short, rainfall))}. Find the {atype.replace('_', ' ')}."
        else:
            question_text = (f"Ravi is analyzing the rainfall pattern of {city}. "
                            f"The monthly rainfall data (mm) is: {dict(zip(months_short, rainfall))}. "
                            f"Identify which season receives the most rainfall and suggest suitable crops for the region.")
            atype = "seasonal"

        result = self.solver.solve("rainfall_analysis", {
            "rainfall": rainfall,
            "analysis_type": atype
        })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question_text, answer=answer, solution_steps=result.steps,
            topic="Rainfall Analysis", difficulty=difficulty, question_type=qtype
        )

    def _gen_wind(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        wind_from = self._rand_choice(["South", "Southwest", "Southeast", "Northeast", "North"])
        seasons = ["summer", "winter", "monsoon", "post-monsoon"]
        season = self._rand_choice(seasons)
        movements = {
            "summer": "northward",
            "winter": "southward",
            "monsoon": "northward and eastward",
            "post-monsoon": "southward"
        }
        question = f"During {season} season in India, the ITCZ shifts. A wind is observed blowing FROM the {wind_from}. What type of wind is this and what weather does it bring?"
        result = self.solver.solve("wind_direction", {
            "wind_from": wind_from,
            "isb_movement": movements[season],
            "season": season
        })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Wind Direction and Monsoon", difficulty=difficulty, question_type=qtype
        )

    def _gen_water_cycle(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        if qtype == "Standard":
            processes = ["evaporation", "condensation", "precipitation", "runoff", "infiltration"]
            process = self._rand_choice(processes)
            question = f"Describe the process of '{process}' in the water cycle."
            result = self.solver.solve("water_cycle", {
                "question_type": "process_name",
                "process": process
            })
        else:
            question = ("Priya observes water droplets forming on the outside of a cold glass of water. "
                       "She also notices that plants near her home release water vapour. "
                       "a) What process causes droplets on the glass? "
                       "b) What process do the plants show? "
                       "c) Name the next two steps in the water cycle after these processes.")
            result = self.solver.solve("water_cycle", {
                "question_type": "sequence"
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Water Cycle", difficulty=difficulty, question_type=qtype
        )

    def _gen_weather(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        instruments = ["thermometer", "barometer", "hygrometer", "anemometer", "wind_vane", "rain_gauge"]
        instrument = self._rand_choice(instruments)
        if qtype == "Standard":
            qtypes = ["identify", "unit", "what_measures"]
            qt = self._rand_choice(qtypes)
            if qt == "identify":
                question = f"What does a {instrument} measure and what is its unit?"
            elif qt == "unit":
                question = f"What is the standard unit of measurement for a {instrument}?"
            else:
                question = f"What quantity does a {instrument} measure?"
            result = self.solver.solve("weather_instruments", {
                "question_type": qt,
                "instrument": instrument
            })
        else:
            question = ("The school weather station has several instruments. "
                       "The teacher asks students to identify what each measures: "
                       "a) A glass tube with mercury that shows the temperature. "
                       "b) A spinning cup device on the roof. "
                       "c) A container that collects and measures rainwater. "
                       "Name the instruments and their units.")
            result = self.solver.solve("weather_instruments", {
                "question_type": "identify",
                "instrument": instrument
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Weather Instruments", difficulty=difficulty, question_type=qtype
        )

    def _gen_soil(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        soils = ["alluvial", "black", "red", "laterite", "desert", "mountain"]
        soil = self._rand_choice(soils)
        if qtype == "Standard":
            qtypes = ["identify", "characteristics", "crops"]
            qt = self._rand_choice(qtypes)
            if qt == "identify":
                question = f"Where is {soil} soil found in India? What are its main characteristics?"
            elif qt == "crops":
                question = f"What types of crops are best suited for {soil} soil?"
            else:
                question = f"Describe the characteristics of {soil} soil."
            result = self.solver.solve("soil_types", {
                "question_type": qt,
                "soil_name": soil
            })
        else:
            # Competency-based
            farmer = self._rand_choice(["Ramesh", "Suresh", "Krishna", "Lakshmi", "Gangamma"])
            question = (f"Farmer {farmer} has inherited farmland in the {self._rand_choice(['Deccan Plateau', 'Ganga Basin', 'Rajasthan', 'Western Ghats', 'Coastal Andhra'])}. "
                       f"The soil is {soil}. "
                       f"a) What are the main properties of this soil? "
                       f"b) Suggest three suitable crops and explain why they grow well. "
                       f"c) What soil conservation methods should {farmer} adopt?")
            result = self.solver.solve("soil_types", {
                "question_type": "characteristics",
                "soil_name": soil
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Soil Types", difficulty=difficulty, question_type=qtype
        )

    def _gen_vegetation(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        veg_types = ["tropical evergreen", "tropical deciduous", "tropical thorn", "montane", "mangrove"]
        veg = self._rand_choice(veg_types)
        if qtype == "Standard":
            question = f"Describe the tropical {veg} forest. Where is it found in India? What trees are found there?"
            result = self.solver.solve("natural_vegetation", {
                "question_type": "identify",
                "vegetation_type": veg
            })
        else:
            regions = {
                "tropical evergreen": "Western Ghats and Andaman Islands",
                "tropical deciduous": "Central India and the Deccan Plateau",
                "tropical thorn": "Rajasthan and parts of Gujarat",
                "montane": "Himalayan slopes",
                "mangrove": "Sundarbans in West Bengal"
            }
            region = regions.get(veg, "various parts of India")
            question = (f"A wildlife biologist is conducting a survey in {region}. "
                       f"She finds {veg} forest vegetation. "
                       f"a) Describe the climate and rainfall needed for this vegetation. "
                       f"b) Name five important tree species found here. "
                       f"c) What are the main threats to this vegetation type in India?")
            result = self.solver.solve("natural_vegetation", {
                "question_type": "identify",
                "vegetation_type": veg
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Natural Vegetation", difficulty=difficulty, question_type=qtype
        )

    def _gen_landform(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        patterns = ["concentric_circles", "v_shape_river", "close_spaced", "far_spaced",
                    "u_shape", "hachure", "concave"]
        pattern = self._rand_choice(patterns)
        if qtype == "Standard":
            pattern_desc = {
                "concentric_circles": "circular concentric contour lines",
                "v_shape_river": "contours forming a V-shape",
                "close_spaced": "contours very close together",
                "far_spaced": "contours far apart",
                "u_shape": "contours forming a U-shape",
                "hachure": "contours with hachure marks",
                "concave": "contours that are far apart at bottom and close together at top"
            }
            question = f"Identify the landform represented by {pattern_desc.get(pattern, pattern)} on a topographical map."
            result = self.solver.solve("landform_identification", {"pattern": pattern})
        else:
            question = ("Anirudh is studying a topographical map of a hilly area. "
                       "He observes the following: "
                       "a) The contour lines form perfect circles getting smaller towards the center. "
                       "b) Near a stream, the contours form a V-shape pointing uphill. "
                       "c) On one side, the contours are very close together with hachure marks. "
                       "Identify the landforms and explain what each pattern indicates.")
            result = self.solver.solve("landform_identification", {"pattern": pattern})
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Landform Identification", difficulty=difficulty, question_type=qtype
        )

    def _gen_contour(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        ci = self._rand_choice([10, 20, 25, 50])
        lowest = self._rand_int(50, 200)
        contours = list(range(lowest, lowest + ci * 6, ci))
        if qtype == "Standard":
            question = f"The contours shown on a map are {contours}. What is the contour interval?"
            result = self.solver.solve("contour_interval", {
                "problem_type": "find_interval",
                "contours_given": contours
            })
        else:
            question = (f"A topographical map shows contours at {contours} metres. "
                       f"The contour interval is {ci} metres. "
                       f"a) What is the contour interval? "
                       f"b) What is the highest and lowest elevation shown? "
                       f"c) A point P is located one-third of the way from the {lowest}m contour "
                       f"to the next contour. What is its approximate elevation?")
            result = self.solver.solve("contour_interval", {
                "problem_type": "find_height",
                "contour_interval": float(ci),
                "height_point_a": float(lowest),
                "height_point_b": 1/3
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Contour Interval", difficulty=difficulty, question_type=qtype
        )

    def _gen_atmosphere(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        layers_list = ["troposphere", "stratosphere", "mesosphere", "thermosphere"]
        layer = self._rand_choice(layers_list)
        if qtype == "Standard":
            question = f"What is the {layer}? Describe its height and key features."
            result = self.solver.solve("atmosphere_layers", {
                "question_type": "identify",
                "layer_name": layer
            })
        else:
            question = ("An astronaut and a pilot are discussing their work environments: "
                       "a) The pilot says she flies at 12 km altitude in the stratosphere. "
                       "b) The astronaut says he orbits at 400 km in the thermosphere. "
                       "c) Describe the characteristics of both layers. "
                       "d) Why does the stratosphere have the ozone layer and why is it important?")
            result = self.solver.solve("atmosphere_layers", {
                "question_type": "properties",
                "layer_name": "stratosphere"
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Atmosphere Layers", difficulty=difficulty, question_type=qtype
        )

    def _gen_std_time(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        cities = {
            "Mumbai": 72.8, "Delhi": 77.1, "Kolkata": 88.4, "Chennai": 80.3,
            "Bangalore": 77.6, "Hyderabad": 78.5, "Ahmedabad": 72.6,
            "Guwahati": 91.7, "Thiruvananthapuram": 77.0
        }
        city_name = self._rand_choice(list(cities.keys()))
        long_val = cities[city_name]
        if qtype == "Standard":
            question = (f"Calculate the local time at {city_name} (longitude {long_val} E) "
                       f"when the IST at 82.5 E is {self._rand_int(1,23):02d}:00.")
            result = self.solver.solve("standard_time", {
                "question_type": "find_ist",
                "place_name": city_name,
                "longitude": long_val
            })
        else:
            ref_city = "Delhi"
            ref_long = 77.1
            ref_time = f"{self._rand_int(8,18):02d}:00"
            question = (f"A flight departs from {ref_city} at {ref_time} IST and takes "
                       f"{self._rand_int(1,5)} hours to reach {city_name}. "
                       f"What is the local time at {city_name} when the flight lands? "
                       f"(Longitude of {city_name} = {long_val} E, {ref_city} = {ref_long} E)")
            result = self.solver.solve("standard_time", {
                "question_type": "find_local",
                "place_name": city_name,
                "longitude": long_val,
                "reference_time": ref_time,
                "reference_longitude": ref_long
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Standard Time", difficulty=difficulty, question_type=qtype
        )

    def _gen_earthquake(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        terms_list = ["earthquake", "focus", "epicenter", "richter scale", "volcano", "tsunami", "ring of fire"]
        term = self._rand_choice(terms_list)
        qtypes = ["define", "focus_epicenter", "richter", "ring_of_fire"]
        qt = self._rand_choice(qtypes)
        if qtype == "Standard":
            question = f"Define: {term.title()}"
        else:
            question = ("On 26th January 2001, a devastating earthquake struck Gujarat. "
                       "a) Define earthquake and explain the difference between focus and epicenter. "
                       "b) How is the magnitude of an earthquake measured? "
                       "c) Why does the Pacific Ring of Fire experience so many earthquakes? "
                       "d) What precautions should people take during an earthquake?")
            qt = "focus_epicenter"
            term = "focus_epicenter"
        result = self.solver.solve("earthquake_terms", {
            "question_type": qt,
            "term": term
        })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Earthquakes and Volcanoes", difficulty=difficulty, question_type=qtype
        )

    def _gen_currents(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        if qtype == "Standard":
            ct = self._rand_choice(["warm_cold", "identify"])
            cname = self._rand_choice(["Agulhas", "Somali", "Benguela", "Gulf Stream", "Peru", "Kuroshio"])
            if ct == "identify":
                question = f"Describe the {cname} Current. Is it a warm or cold current?"
            else:
                question = f"Is the {cname} Current warm or cold? What effect does it have on climate?"
            result = self.solver.solve("ocean_currents", {
                "question_type": ct,
                "current_name": cname
            })
        else:
            question = ("The fishing industry off the coast of Peru has declined significantly "
                       "in some years. Investigate: "
                       "a) Which ocean current flows along Peru's coast? Is it warm or cold? "
                       "b) What is El Nino and how does it affect this current? "
                       "c) How does the Somali Current change with the monsoon seasons? "
                       "d) Explain the relationship between monsoon winds and Indian Ocean currents.")
            result = self.solver.solve("ocean_currents", {
                "question_type": "monsoon_currents"
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Ocean Currents", difficulty=difficulty, question_type=qtype
        )

    def _gen_local_climate(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        if qtype == "Standard":
            factors = ["altitude", "distance_from_sea", "latitude", "ocean_currents"]
            factor = self._rand_choice(factors)
            question = f"How does {factor.replace('_', ' ')} affect the climate of a place? Give an Indian example."
            result = self.solver.solve("local_climate", {
                "question_type": "factors",
                "factor_name": factor
            })
        else:
            question = ("A group of students is comparing the climate of three Indian cities: "
                       "Mumbai (sea level, west coast), Nagpur (inland, central India), and Darjeeling (2130m, Himalayas). "
                       "a) Why does Mumbai have less temperature variation than Nagpur? "
                       "b) Why is Darjeeling much cooler than both, despite being at a similar latitude? "
                       "c) Which city receives the most rainfall and why? "
                       "d) Explain the urban heat island effect in Mumbai.")
            result = self.solver.solve("local_climate", {
                "question_type": "altitude_effect",
                "height_km": 2.13,
                "height_point_a": 0.0
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Local Climate", difficulty=difficulty, question_type=qtype
        )

    def _gen_environment(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        if qtype == "Standard":
            terms_list = ["deforestation", "global_warming", "biodiversity", "conservation",
                         "renewable", "pollution", "greenhouse_effect"]
            term = self._rand_choice(terms_list)
            qt = self._rand_choice(["define", "causes", "conservation_methods"])
            if qt == "define":
                question = f"Define: {term.replace('_', ' ').title()}"
            elif qt == "causes":
                question = f"What are the main causes of {term.replace('_', ' ')}?"
            else:
                question = f"Suggest methods for conservation of {term.replace('_', ' ')}."
            result = self.solver.solve("environment", {
                "question_type": qt,
                "term": term
            })
        else:
            question = ("India's forest cover has been declining at an alarming rate. "
                       "Analyze the situation: "
                       "a) Name and explain four major causes of deforestation in India. "
                       "b) How does deforestation lead to soil erosion and flooding? "
                       "c) What is the Chipko movement and why was it significant? "
                       "d) List five measures for forest conservation in India.")
            result = self.solver.solve("environment", {
                "question_type": "causes",
                "term": "deforestation"
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Environment and Conservation", difficulty=difficulty, question_type=qtype
        )

    def _gen_compass(self, difficulty: str, qtype: str) -> GeneratedQuestion:
        if qtype == "Standard":
            qt = self._rand_choice(["find_bearing", "back_bearing", "quadrant"])
            angle = self._rand_choice([0, 45, 90, 120, 135, 180, 225, 270, 315])
            if qt == "find_bearing":
                question = f"What is the compass bearing of a direction that is {angle} degrees clockwise from North?"
            elif qt == "back_bearing":
                question = f"If the forward bearing of a line is {angle}T, what is the back bearing?"
            else:
                question = f"Express {angle}T (True Bearing) as a quadrant bearing."
            result = self.solver.solve("compass_bearing", {
                "question_type": qt,
                "bearing_deg": float(angle)
            })
        else:
            angle = self._rand_int(30, 350)
            question = (f"A ship leaves port A on a bearing of {angle}T and travels 100 km. "
                       f"It then turns 180 degrees and returns to port. "
                       f"a) What is the bearing of the return journey (back bearing)? "
                       f"b) Express both bearings as quadrant bearings. "
                       f"c) If the ship's speed is 20 km/h, how long does each leg of the journey take?")
            result = self.solver.solve("compass_bearing", {
                "question_type": "back_bearing",
                "bearing_deg": float(angle)
            })
        answer = result.answer
        return GeneratedQuestion(
            question_text=question, answer=answer, solution_steps=result.steps,
            topic="Compass Bearing", difficulty=difficulty, question_type=qtype
        )

    def generate_batch(self, count: int = 10, difficulty: str = "Medium") -> List[GeneratedQuestion]:
        """Generate a batch of questions with balanced standard and competency-based types."""
        questions = []
        topics = [
            "Map Scales", "Latitude and Longitude", "Temperature Conversion",
            "Average Temperature", "Rainfall Analysis", "Wind Direction",
            "Water Cycle", "Weather Instruments", "Soil Types",
            "Natural Vegetation", "Landform Identification", "Contour Interval",
            "Atmosphere Layers", "Standard Time", "Earthquake Terms",
            "Ocean Currents", "Local Climate", "Environment",
            "Compass Bearing"
        ]

        for i in range(count):
            topic = topics[i % len(topics)]
            qtype = "Standard" if i % 2 == 0 else "Competency-Based"
            seed = i * 137 + 42  # Deterministic seed
            random.seed(seed)
            q = self.generate(topic, difficulty, qtype)
            questions.append(q)
        return questions


# ─── Main ──────────────────────────────────────────────────────────────────────

def main():
    """Demonstrate the solver and question generator."""
    print("=" * 70)
    print("  CISCE Geography Class 7 - Comprehensive Solver")
    print("=" * 70)

    solver = GeographySolver()

    # Demo 1: Map Scale
    print("\n--- Demo 1: Map Scale ---")
    result = solver.solve("map_scales", {
        "scale_type": "map_distance",
        "scale_rf": "1:50000",
        "map_distance_cm": 8.5
    })
    print("\nQuestion: On a map with scale 1:50000, what is the real distance for 8.5 cm?")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")
    print(f"  => VERIFY: {result.verification}")

    # Demo 2: Latitude/Longitude Distance
    print("\n--- Demo 2: Latitude Distance ---")
    result = solver.solve("latitude_longitude", {
        "problem_type": "distance_lat",
        "lat1": 10.0, "lat2": 20.0
    })
    print("\nQuestion: Find the distance between 10N and 20N.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 3: Temperature Conversion
    print("\n--- Demo 3: Temperature Conversion ---")
    result = solver.solve("temperature_conversion", {
        "conversion_type": "celsius_to_fahrenheit",
        "temperature": 37.0
    })
    print("\nQuestion: Convert 37C to Fahrenheit.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 4: Average Temperature
    print("\n--- Demo 4: Average Temperature ---")
    temps = [20, 22, 27, 31, 33, 30, 28, 28, 28, 27, 24, 21]
    result = solver.solve("average_temperature", {"temperatures": temps})
    print("\nQuestion: Find the annual average temperature for: " + str(dict(zip(
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], temps))))
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 5: Rainfall Analysis
    print("\n--- Demo 5: Rainfall Analysis ---")
    rainfall = [0, 5, 15, 30, 50, 200, 250, 180, 100, 35, 10, 2]
    result = solver.solve("rainfall_analysis", {"rainfall": rainfall, "analysis_type": "seasonal"})
    print("\nQuestion: Analyse seasonal rainfall distribution.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 6: Wind Direction
    print("\n--- Demo 6: Wind Direction ---")
    result = solver.solve("wind_direction", {"wind_from": "South", "season": "summer"})
    print("\nQuestion: Identify the wind blowing from the South during summer in India.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 7: Water Cycle
    print("\n--- Demo 7: Water Cycle ---")
    result = solver.solve("water_cycle", {"question_type": "sequence"})
    print("\nQuestion: List the steps of the water cycle.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 8: Weather Instruments
    print("\n--- Demo 8: Weather Instruments ---")
    result = solver.solve("weather_instruments", {
        "question_type": "identify", "instrument": "rain_gauge"
    })
    print("\nQuestion: What does a rain gauge measure?")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 9: Soil Types
    print("\n--- Demo 9: Soil Types ---")
    result = solver.solver_soil = solver.solve("soil_types", {
        "question_type": "identify", "soil_name": "black"
    })
    print("\nQuestion: Describe Black Soil (Regur soil).")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 10: Natural Vegetation
    print("\n--- Demo 10: Natural Vegetation ---")
    result = solver.solve("natural_vegetation", {
        "question_type": "identify", "vegetation_type": "tropical deciduous"
    })
    print("\nQuestion: Describe Tropical Deciduous Forests.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 11: Landform Identification
    print("\n--- Demo 11: Landform Identification ---")
    result = solver.solve("landform_identification", {"pattern": "concentric_circles"})
    print("\nQuestion: Identify the landform from concentric circular contours.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 12: Contour Interval
    print("\n--- Demo 12: Contour Interval ---")
    result = solver.solve("contour_interval", {
        "problem_type": "find_interval",
        "contours_given": [100, 120, 140, 160, 180]
    })
    print("\nQuestion: Contours are at 100, 120, 140, 160, 180. Find the contour interval.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 13: Atmosphere Layers
    print("\n--- Demo 13: Atmosphere Layers ---")
    result = solver.solve("atmosphere_layers", {"question_type": "order"})
    print("\nQuestion: What is the correct order of atmosphere layers?")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 14: Standard Time
    print("\n--- Demo 14: Standard Time ---")
    result = solver.solve("standard_time", {
        "question_type": "find_ist",
        "place_name": "Kolkata",
        "longitude": 88.4
    })
    print("\nQuestion: Calculate local time at Kolkata (88.4E) relative to IST (82.5E).")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 15: Earthquakes
    print("\n--- Demo 15: Earthquakes ---")
    result = solver.solve("earthquake_terms", {"question_type": "focus_epicenter"})
    print("\nQuestion: Explain the difference between focus and epicenter.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 16: Ocean Currents
    print("\n--- Demo 16: Ocean Currents ---")
    result = solver.solve("ocean_currents", {"question_type": "monsoon_currents"})
    print("\nQuestion: Describe Indian Ocean currents and monsoon relationship.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 17: Local Climate
    print("\n--- Demo 17: Local Climate ---")
    result = solver.solve("local_climate", {
        "question_type": "sea_land",
        "place_type": "coastal"
    })
    print("\nQuestion: How does being coastal affect climate?")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 18: Environment
    print("\n--- Demo 18: Environment ---")
    result = solver.solve("environment", {
        "question_type": "renewable_nonrenewable",
        "term": "renewable"
    })
    print("\nQuestion: Classify resources as renewable and non-renewable.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 19: Compass Bearing
    print("\n--- Demo 19: Compass Bearing ---")
    result = solver.solve("compass_bearing", {
        "question_type": "back_bearing",
        "bearing_deg": 45.0
    })
    print("\nQuestion: Find the back bearing of 45T.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Demo 20: Contour Height
    print("\n--- Demo 20: Contour Height ---")
    result = solver.solve("contour_interval", {
        "problem_type": "find_height",
        "contour_interval": 20.0,
        "height_point_a": 140.0,
        "height_point_b": 0.5
    })
    print("\nQuestion: A point is halfway between 140m and 160m contours. Find its height.")
    for step in result.steps:
        print(f"  {step}")
    print(f"  => ANSWER: {result.answer}")

    # Question Generator Demo
    print("\n" + "=" * 70)
    print("  Question Generator Demo")
    print("=" * 70)

    gen = QuestionGenerator(seed=42)
    batch = gen.generate_batch(count=6, difficulty="Medium")

    for i, q in enumerate(batch, 1):
        print(f"\n--- Question {i} [{q.topic}] ({q.difficulty}/{q.question_type}) ---")
        print(f"Q: {q.question_text}")
        print(f"A: {q.answer}")
        print("Steps:")
        for step in q.solution_steps:
            print(f"  {step}")

    # Demonstrate JSON output
    print("\n" + "=" * 70)
    print("  JSON Output Demo (first question)")
    print("=" * 70)
    result_dict = solver.to_dict(result)
    print(json.dumps(result_dict, indent=2))

    print("\n" + "=" * 70)
    print("  ALL DEMOS COMPLETED SUCCESSFULLY")
    print("=" * 70)


if __name__ == '__main__':
    main()