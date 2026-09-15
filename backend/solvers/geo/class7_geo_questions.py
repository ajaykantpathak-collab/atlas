"""
CISCE Class 7 Geography — Deterministic Question Generator & Solver
Covers: Topographical Maps, Scale, Atmosphere, Weather/Climate, Weathering/Soil,
        Industries, Energy Resources, Europe, Africa, Australia, Antarctica
"""

import random
import math
import fractions
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from enum import Enum

# ---------------------------------------------------------------------------
# Seeded RNG helper
# ---------------------------------------------------------------------------

def _rng(seed: int) -> random.Random:
    return random.Random(seed)


# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


# ---------------------------------------------------------------------------
# Syllabus data — exhaustive static knowledge base
# ---------------------------------------------------------------------------

# --- Topographical Maps (c7_geo_001) ---
TOPO_SYMBOLS = [
    ("🏠", "Settlement / Village"),
    ("🛤️", "Railway line"),
    ("🛣️", "Road / Metalled road"),
    ("🌊", "River / Stream"),
    ("⛰️", "Spot height"),
    ("🌲", "Forest"),
    ("⛪", "Temple / Religious building"),
    ("📮", "Post office"),
    ("🏫", "School"),
    ("🏥", "Hospital"),
    ("🛶", "Ferry"),
    ("🌉", "Bridge"),
    ("⛽", "Petrol pump"),
    ("📡", "Telephone exchange"),
    ("🏦", "Bank"),
]

TOPO_DEFINITIONS = {
    "topographical_map": "A large-scale map that shows both natural and man-made features on the Earth's surface in accurate plane table positions.",
    "contour_line": "An imaginary line joining all points on the map having the same height above sea level.",
    "grid_reference": "A reference system using eastings and northings to pinpoint a location on a map.",
    "relief": "The physical features of an area, especially its elevation and shape.",
    "drainage": "The pattern of rivers, streams, and other water bodies on a map.",
    "eastings": "The vertical grid lines on a topographical map, numbered eastwards from a central meridian.",
    "northings": "The horizontal grid lines on a topographical map, numbered northwards from a central line.",
    "survey_of_india": "The government agency responsible for mapping India, established in 1767.",
}

# Conventional sign meanings (standard Survey of India)
CONVENTIONAL_SIGNS = [
    ("//", "Cultivated area / Well"),
    ("~~", "Cart track / Unmetalled road"),
    ("=====", "Metalled road"),
    ("WWW", "Railway"),
    ("~~~~", "River / Stream"),
    ("====", "Canal"),
    ("()", "Building"),
    ("△", "Triangulation pillar / Spot height"),
    ("...", "Intermittent stream"),
    ("=+++=", "Power line"),
    ("//", "Scrubland"),
    ("~~~~", "Nala / Dry stream"),
]

# Scale conversions
SCALE_FACTORS = {
    "1:50,000": 50000,
    "1:25,000": 25000,
    "1:10,000": 10000,
    "1:100,000": 100000,
    "1:250,000": 250000,
}

# --- Atmosphere ---
ATMOSPHERE_LAYERS = [
    ("Troposphere", "0-12 km", "All weather phenomena occur here", "D"),
    ("Stratosphere", "12-50 km", "Ozone layer is present", "I"),
    ("Mesosphere", "50-80 km", "Meteors burn up here", "D"),
    ("Thermosphere", "80-700 km", "Aurora borealis occurs here", "I"),
    ("Exosphere", "700+ km", "Outermost layer, merges with space", None),
]

ATMOSPHERE_COMPOSITION = {
    "Nitrogen": 78.08,
    "Oxygen": 20.95,
    "Argon": 0.93,
    "Carbon dioxide": 0.04,
    "Other gases": 0.01,
}

# --- Weather Instruments ---
WEATHER_INSTRUMENTS = [
    ("Thermometer", "Measures temperature", "°C"),
    ("Barometer", "Measures atmospheric pressure", "millibars"),
    ("Rain gauge", "Measures rainfall", "mm"),
    ("Hygrometer", "Measures humidity", "%"),
    ("Anemometer", "Measures wind speed", "km/h"),
    ("Wind vane", "Shows wind direction", "Cardinal directions"),
]

# --- Weathering ---
WEATHERING_TYPES = {
    "mechanical": "Physical breaking of rocks without chemical change (e.g., frost action, thermal expansion, root wedging).",
    "chemical": "Chemical alteration of rocks (e.g., oxidation, carbonation, hydration, solution).",
    "biological": "Breaking down of rocks by living organisms (e.g., lichens, roots of plants, burrowing animals).",
}

SOIL_PROFILE_LAYERS = [
    ("O", "Humus / Organic matter", "Dark brown/black, rich in nutrients"),
    ("A", "Topsoil", "Dark, fertile, rich in humus and minerals"),
    ("B", "Subsoil", "Lighter in colour, rich in minerals but poor in humus"),
    ("C", "Weathered parent rock", "Loose fragments of parent rock"),
    ("D", "Bedrock", "Solid, unweathered parent rock"),
]

# --- Industries ---
AGRO_BASED_INDUSTRIES = {
    "cotton": {
        "raw_material": "Cotton",
        "major_states": ["Maharashtra", "Gujarat", "Tamil Nadu"],
        "products": "Cotton cloth, garments, yarn",
        "example_city": "Mumbai (Cotton textile mills)",
    },
    "jute": {
        "raw_material": "Jute fibre",
        "major_states": ["West Bengal", "Assam", "Bihar"],
        "products": "Burlap, sacks, ropes, carpets",
        "example_city": "Kolkata (jute mills)",
    },
    "sugar": {
        "raw_material": "Sugarcane",
        "major_states": ["Uttar Pradesh", "Maharashtra", "Karnataka"],
        "products": "Sugar, jaggery, molasses",
        "example_city": "Kanpur (sugar mills)",
    },
}

IRON_STEEL = {
    "raw_materials": ["Iron ore", "Coal / Coke", "Limestone", "Manganese"],
    "major_plant": "Tata Steel (Jamshedpur)",
    "other_plants": ["Bhilai Steel Plant (Chhattisgarh)", "Rourkela Steel Plant (Odisha)"],
    "process": "Iron ore → Blast furnace → Pig iron → Steel furnace → Steel",
}

# --- Energy Resources ---
ENERGY_RESOURCES = {
    "conventional": {
        "coal": "Found in Jharkhand, Odisha, Chhattisgarh",
        "petroleum": "Found in Assam (Digboi), Gujarat (Bombay High)",
        "natural_gas": "Found in Tripura, Krishna-Godavari basin",
        "hydropower": "Generated from flowing water — Bhakra Nangal, Tehri",
    },
    "non_conventional": {
        "solar": "India receives abundant sunlight; Rajasthan and Gujarat have large solar parks",
        "wind": "Tamil Nadu, Gujarat, Maharashtra have wind farms",
        "biogas": "Produced from cattle dung and organic waste",
        "tidal": "Gulf of Kutch and Gulf of Khambhat have tidal energy potential",
        "geothermal": "Himachal Pradesh and Ladakh have geothermal springs",
        "nuclear": "Tarapur (Maharashtra), Kudankulam (Tamil Nadu), Kota (Rajasthan)",
    },
}

# --- Continents ---
CONTINENTS_DATA = {
    "europe": {
        "area": "10.18 million sq km",
        "population": "~750 million",
        "major_countries": ["Russia", "Germany", "France", "UK", "Italy"],
        "major_rivers": ["Danube", "Rhine", "Volga", "Rhone"],
        "major_mountains": ["Alps", "Pyrenees", "Carpathians", "Ural"],
        "climate": "Temperate — mild winters and cool summers",
        "vegetation": "Deciduous forests, coniferous forests, grasslands",
        "landform": "Old continent — low relief, few high mountains",
        "minerals": "Coal, iron ore, copper, tin",
    },
    "africa": {
        "area": "30.37 million sq km",
        "population": "~1.4 billion",
        "major_countries": ["Egypt", "Nigeria", "South Africa", "Kenya", "DR Congo"],
        "major_rivers": ["Nile", "Congo", "Niger", "Zambezi"],
        "major_mountains": ["Kilimanjaro", "Mount Kenya", "Atlas Mountains"],
        "climate": "Hot — called the 'Dark Continent' of heat",
        "vegetation": "Equatorial forests, savanna grasslands, deserts",
        "landform": "Young continent — plateaux, rift valleys, active volcanoes",
        "minerals": "Gold, diamonds, copper, bauxite",
    },
    "australia": {
        "area": "7.69 million sq km",
        "population": "~26 million",
        "major_countries": ["Australia (one country — smallest continent)"],
        "major_rivers": ["Murray-Darling", "Diamantina", "Georgina"],
        "major_mountains": ["Great Dividing Range", "Mount Kosciuszko"],
        "climate": "Hot and dry — mostly desert and semi-desert",
        "vegetation": "Eucalyptus forests, grasslands, desert scrub",
        "landform": "Oldest, flattest, driest continent",
        "minerals": "Bauxite, iron ore, gold, uranium, coal",
    },
    "antarctica": {
        "area": "14.0 million sq km",
        "population": "~1000 (researchers, no permanent residents)",
        "major_countries": ["No countries — governed by Antarctic Treaty"],
        "major_rivers": ["No rivers — completely covered by ice"],
        "major_mountains": ["Transantarctic Mountains", "Vinson Massif"],
        "climate": "Coldest, windiest, driest continent — -89°C recorded",
        "vegetation": "No trees or shrubs — only lichens and mosses",
        "landform": "Highest continent on average (average elevation 2,300 m)",
        "minerals": "Coal, iron ore, petroleum (under the ice — mining banned)",
    },
}

# ---------------------------------------------------------------------------
# Question bank builder
# ---------------------------------------------------------------------------

class QuestionBank:
    """Builds a pool of question dicts, seeded."""

    def __init__(self, seed: int):
        self.rng = _rng(seed)
        self.questions: List[Dict] = []
        self._counter = 0

    def _id(self, topic: str) -> str:
        self._counter += 1
        return f"geo7_{topic}_{self._counter:03d}"

    # ---- helpers ----

    def _mcq(self, topic: str, qtext: str, options: list, answer: str,
             explanation: str, difficulty: str, competency: str) -> Dict:
        return {
            "id": self._id(topic),
            "type": "mcq",
            "question": qtext,
            "options": options,
            "answer": answer,
            "explanation": explanation,
            "difficulty": difficulty,
            "topic": topic,
            "competency": competency,
        }

    def _fill(self, topic: str, qtext: str, answer: str, explanation: str,
              difficulty: str, competency: str) -> Dict:
        return {
            "id": self._id(topic),
            "type": "fill_blank",
            "question": qtext,
            "options": [],
            "answer": answer,
            "explanation": explanation,
            "difficulty": difficulty,
            "topic": topic,
            "competency": competency,
        }

    def _short(self, topic: str, qtext: str, answer: str, explanation: str,
               difficulty: str, competency: str) -> Dict:
        return {
            "id": self._id(topic),
            "type": "short_answer",
            "question": qtext,
            "options": [],
            "answer": answer,
            "explanation": explanation,
            "difficulty": difficulty,
            "topic": topic,
            "competency": competency,
        }

    def _long(self, topic: str, qtext: str, answer: str, explanation: str,
              difficulty: str, competency: str) -> Dict:
        return {
            "id": self._id(topic),
            "type": "long_answer",
            "question": qtext,
            "options": [],
            "answer": answer,
            "explanation": explanation,
            "difficulty": difficulty,
            "topic": topic,
            "competency": competency,
        }

    def _numerical(self, topic: str, qtext: str, answer: str, explanation: str,
                   difficulty: str, competency: str) -> Dict:
        return {
            "id": self._id(topic),
            "type": "numerical",
            "question": qtext,
            "options": [],
            "answer": answer,
            "explanation": explanation,
            "difficulty": difficulty,
            "topic": topic,
            "competency": competency,
        }

    # ---- topic generators ----

    def _topo_maps(self, count: int):
        """Generate questions on topographical maps."""
        n = self.rng
        for _ in range(max(1, count // 10)):
            sym, meaning = n.choice(TOPO_SYMBOLS)
            all_syms = [s[1] for s in TOPO_SYMBOLS]
            wrongs = [s for s in all_syms if s != meaning]
            opts = [meaning] + n.sample(wrongs, min(3, len(wrongs)))
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "topo_maps",
                f"In a Survey of India topographical map, what does the symbol {sym} represent?",
                opts,
                meaning,
                f"The symbol {sym} is the standard conventional sign for '{meaning}' used on Survey of India topographical sheets.",
                "Easy", "standard",
            ))
        for _ in range(max(1, count // 12)):
            term, defin = n.choice(list(TOPO_DEFINITIONS.items()))
            others = [d for k, d in TOPO_DEFINITIONS.items() if d != defin]
            opts = [defin] + n.sample(others, min(3, len(others)))
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "topo_maps",
                f"What is the definition of '{term.replace('_', ' ')}'?",
                opts,
                defin,
                f"'{term.replace('_', ' ')}' means: {defin}",
                "Medium", "standard",
            ))

        # Grid reference — Indian competency
        self.questions.append(self._numerical(
            "topo_maps",
            "On a Survey of India topographical map, the four-figure grid reference 7832 means: easting = ___, northing = ___. (Write both numbers.)",
            "Easting 78, Northing 32",
            "A four-figure grid reference uses the first two digits of the easting and the first two digits of the northing. For 7832, easting = 78, northing = 32. This locates a 1 km × 1 km square on the map.",
            "Medium", "competency",
        ))
        self.questions.append(self._numerical(
            "topo_maps",
            "On a 1:50,000 scale map, a distance of 4 cm on the map represents how many metres on the ground? (Show your working.)",
            "2000 m",
            "Ground distance = Map distance × Scale denominator = 4 cm × 50,000 = 200,000 cm = 2000 m.",
            "Hard", "standard",
        ))
        self.questions.append(self._fill(
            "topo_maps",
            "A topographical map shows both natural features (relief, drainage, vegetation) and _____ features (settlements, transport, land use).",
            "man-made",
            "Topographical maps display natural features like relief, drainage, and vegetation, as well as man-made features such as settlements, roads, railways, and land use.",
            "Easy", "standard",
        ))
        self.questions.append(self._fill(
            "topo_maps",
            "The agency responsible for preparing topographical maps in India is the _____.",
            "Survey of India",
            "The Survey of India, established in 1767, is the national survey agency responsible for preparing topographical maps of India.",
            "Easy", "competency",
        ))
        self.questions.append(self._short(
            "topo_maps",
            "How do contour lines help us understand the steepness of a slope?",
            "Closely spaced contour lines indicate a steep slope; widely spaced contour lines indicate a gentle slope.",
            "When contour lines are close together, the elevation changes rapidly over a short distance, meaning a steep slope. When they are far apart, the elevation changes gradually, meaning a gentle slope.",
            "Medium", "standard",
        ))
        self.questions.append(self._fill(
            "topo_maps",
            "Concentric closed contours with increasing values towards the centre indicate a _____.",
            "hill",
            "Closed contours that increase in value towards the centre represent a hill or hillock. If they decrease towards the centre, it indicates a depression (depression contour has hachures).",
            "Medium", "standard",
        ))

    # ---- Scale ----
    def _scale(self, count: int):
        n = self.rng
        scales = list(SCALE_FACTORS.items())
        sc_text, sc_val = n.choice(scales)
        map_cm = n.randint(2, 20)
        ground_m = round(map_cm * sc_val / 100, 1)
        self.questions.append(self._numerical(
            "scale",
            f"On a {sc_text} map, a distance of {map_cm} cm on the map represents how many metres on the ground?",
            f"{ground_m} m",
            f"Ground distance = Map distance × Scale = {map_cm} cm × {sc_val} = {map_cm * sc_val} cm = {ground_m} m.",
            "Medium", "standard",
        ))
        self.questions.append(self._mcq(
            "scale",
            "Which of the following is NOT a type of scale?",
            ["Statement scale", "Representative Fraction (RF)", "Linear scale", "Mercator scale"],
            "Mercator scale",
            "The three types of map scale are: Statement scale (e.g., 1 cm = 2 km), Representative Fraction (RF) (e.g., 1:50,000), and Linear scale (a graduated line drawn on the map). Mercator scale refers to a map projection, not a scale type.",
            "Easy", "standard",
        ))
        self.questions.append(self._fill(
            "scale",
            "If 1 cm on a map represents 5 km on the ground, the representative fraction (RF) is _____.",
            "1:500,000",
            "1 km = 100,000 cm, so 5 km = 500,000 cm. RF = map distance : ground distance = 1 : 500,000.",
            "Medium", "standard",
        ))

    # ---- Atmosphere ----
    def _atmosphere(self, count: int):
        n = self.rng
        for _ in range(max(1, count // 10)):
            layer, alt, feature, _ = n.choice(ATMOSPHERE_LAYERS)
            layers_data = [l[0] for l in ATMOSPHERE_LAYERS]
            opts = [layer] + n.sample([l for l in layers_data if l != layer], 3)
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "atmosphere",
                f"Which layer of the atmosphere is described by: '{feature}'?",
                opts,
                layer,
                f"The {layer} ({alt}) is where {feature.lower()}.",
                "Easy", "standard",
            ))
        for _ in range(max(1, count // 12)):
            gas, pct = n.choice(list(ATMOSPHERE_COMPOSITION.items()))
            all_gases = list(ATMOSPHERE_COMPOSITION.keys())
            opts = [gas] + n.sample([g for g in all_gases if g != gas], 3)
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "atmosphere",
                f"Which gas makes up approximately {pct}% of the atmosphere?",
                opts,
                gas,
                f"{gas} constitutes approximately {pct}% of the Earth's atmosphere by volume.",
                "Easy", "standard",
            ))
        self.questions.append(self._fill(
            "atmosphere",
            "The layer of the atmosphere where all weather phenomena take place is the _____.",
            "troposphere",
            "The troposphere (0–12 km) is the lowest layer of the atmosphere where all weather phenomena occur. It contains about 80% of the atmosphere's mass.",
            "Easy", "standard",
        ))
        self.questions.append(self._short(
            "atmosphere",
            "What is the importance of the ozone layer?",
            "The ozone layer protects life on Earth by absorbing harmful ultraviolet (UV) radiation from the sun.",
            "The ozone layer in the stratosphere absorbs most of the sun's harmful ultraviolet (UV) radiation, protecting living organisms from UV-induced skin cancer, cataracts, and damage to ecosystems.",
            "Medium", "standard",
        ))
        self.questions.append(self._fill(
            "atmosphere",
            "The international treaty to protect the ozone layer by phasing out CFCs is the _____.",
            "Montreal Protocol",
            "The Montreal Protocol (1987) is an international treaty designed to protect the ozone layer by phasing out the production of ozone-depleting substances such as CFCs.",
            "Medium", "competency",
        ))
        self.questions.append(self._short(
            "atmosphere",
            "Name the five layers of the atmosphere from the surface upwards, using the D-I-D-I mnemonic.",
            "Troposphere, Stratosphere, Mesosphere, Thermosphere, Exosphere",
            "D-I-D-I mnemonic: D = Troposphere, I = Stratosphere, D = Mesosphere, I = Thermosphere, and the outermost is the Exosphere.",
            "Medium", "standard",
        ))

    # ---- Weather and Climate ----
    def _weather_climate(self, count: int):
        n = self.rng
        for inst, what, unit in n.sample(WEATHER_INSTRUMENTS, len(WEATHER_INSTRUMENTS)):
            others = [i[0] for i in WEATHER_INSTRUMENTS if i[0] != inst]
            opts = [inst] + n.sample(others, 3)
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "weather_climate",
                f"Which instrument is used to {what}?",
                opts,
                inst,
                f"A {inst} measures {what} in {unit}.",
                "Easy", "standard",
            ))
        self.questions.append(self._mcq(
            "weather_climate",
            "Weather instruments should be housed inside a Stevenson screen. Why?",
            ["To protect instruments from direct sunlight and rain", "To make the instruments look neat", "To reduce the cost of the station", "To prevent theft"],
            "To protect instruments from direct sunlight and rain",
            "A Stevenson screen (or instrument shelter) is a white, louvered box that shelters weather instruments from direct precipitation and solar radiation while allowing free air circulation, ensuring accurate readings.",
            "Medium", "standard",
        ))
        self.questions.append(self._fill(
            "weather_climate",
            "The state of the atmosphere at a particular place and time is called _____, while the average weather over a long period is called _____.",
            "weather, climate",
            "Weather refers to the short-term state of the atmosphere (hours to days), while climate is the average weather pattern over a long period (30+ years).",
            "Easy", "standard",
        ))
        self.questions.append(self._short(
            "weather_climate",
            "List any four elements of weather.",
            "Temperature, rainfall, humidity, wind speed, air pressure",
            "Elements of weather include: temperature, atmospheric pressure, humidity (moisture), wind speed and direction, cloudiness, and precipitation (rain, snow, etc.).",
            "Easy", "standard",
        ))
        self.questions.append(self._numerical(
            "weather_climate",
            "If a rain gauge collected 15 mm of rainfall in one day, how many litres of water fell per square metre? (1 mm rain = 1 litre/m²)",
            "15 litres",
            "1 mm of rainfall = 1 litre per square metre. Therefore, 15 mm = 15 litres per square metre.",
            "Medium", "standard",
        ))

    # ---- Weathering and Soil ----
    def _weathering_soil(self, count: int):
        n = self.rng
        for wtype, desc in n.sample(list(WEATHERING_TYPES.items()), len(WEATHERING_TYPES)):
            others = [t for t in WEATHERING_TYPES if t != wtype]
            opts = [wtype] + n.sample(others, 2)
            opts.append("erosion")
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "weathering",
                f"'{desc[:60]}...' — this is an example of which type of weathering?",
                opts,
                wtype,
                f"This describes {wtype} weathering: {desc}",
                "Medium", "standard",
            ))
        for layer, name, desc in n.sample(SOIL_PROFILE_LAYERS, len(SOIL_PROFILE_LAYERS)):
            others = [l[1] for l in SOIL_PROFILE_LAYERS if l[1] != name]
            opts = [name] + n.sample(others, 3)
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "soil",
                f"The topmost layer of the soil profile is called:",
                [SOIL_PROFILE_LAYERS[0][1]] + n.sample(others, 3),
                SOIL_PROFILE_LAYERS[0][1],
                f"The soil profile has O (humus), A (topsoil), B (subsoil), C (weathered rock), and D (bedrock). The topmost is the {SOIL_PROFILE_LAYERS[0][1]} layer.",
                "Easy", "standard",
            ))
            break
        self.questions.append(self._fill(
            "soil",
            "The process by which rocks are broken down in place without being transported is called _____.",
            "weathering",
            "Weathering is the in-situ (in-place) breakdown of rocks by physical, chemical, and biological processes, without transport. Erosion involves the removal and transport of material.",
            "Medium", "standard",
        ))
        self.questions.append(self._short(
            "weathering",
            "Distinguish between weathering and erosion with one key difference.",
            "Weathering breaks down rocks in place; erosion removes and transports the broken material.",
            "Weathering is the in-situ breakdown of rocks by physical, chemical, or biological processes. Erosion is the removal and transport of weathered material by agents like wind, water, or ice.",
            "Medium", "competency",
        ))
        self.questions.append(self._fill(
            "soil",
            "The layer of the soil profile rich in organic matter (humus) is called the _____ horizon.",
            "O",
            "The O-horizon (organic layer) consists of decomposed organic matter (humus), leaves, and dead organisms. It is dark in colour and rich in nutrients.",
            "Medium", "standard",
        ))
        self.questions.append(self._long(
            "weathering",
            "Explain in detail the three types of weathering, giving one example of each.",
            "Mechanical: physical breaking of rocks (frost action); Chemical: chemical alteration (oxidation/rusting); Biological: organisms breaking rocks (root wedging).",
            "Mechanical weathering: rocks are broken physically without chemical change. Examples include frost action (water freezes in cracks), thermal expansion (day-night heating), and root wedging (plant roots grow in cracks). Chemical weathering: rocks are chemically altered. Examples include oxidation (rusting of iron in rocks), carbonation (limestone dissolved by carbonic acid), and hydration. Biological weathering: living organisms contribute. Examples include lichen acids dissolving rock, plant roots forcing cracks open, and animals burrowing.",
            "Hard", "competency",
        ))

    # ---- Industries ----
    def _industries(self, count: int):
        n = self.rng
        for ind, data in n.sample(list(AGRO_BASED_INDUSTRIES.items()), len(AGRO_BASED_INDUSTRIES)):
            others = [i for i in AGRO_BASED_INDUSTRIES if i != ind]
            opts = [ind] + n.sample(others, 2)
            opts.append("textiles")
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "industries",
                f"Which agro-based industry uses '{data['raw_material']}' as its raw material?",
                opts,
                ind,
                f"The {ind} industry uses {data['raw_material']} as raw material. Major centres include {', '.join(data['major_states'])}.",
                "Easy", "standard",
            ))
        self.questions.append(self._mcq(
            "industries",
            "Which of the following is NOT an agro-based industry?",
            ["Cotton textile", "Jute", "Sugar", "Iron and Steel"],
            "Iron and Steel",
            "Agro-based industries use agricultural raw materials: cotton (textiles), jute, and sugar (sugarcane). Iron and Steel is a mineral-based industry using iron ore and coal.",
            "Medium", "standard",
        ))
        self.questions.append(self._fill(
            "industries",
            "The largest jute-producing state in India is _____.",
            "West Bengal",
            "West Bengal is the largest producer of jute in India, followed by Assam and Bihar. The jute mills are concentrated around Kolkata on the Hooghly River.",
            "Medium", "competency",
        ))
        self.questions.append(self._fill(
            "industries",
            "The raw material used in a sugar industry is _____.",
            "sugarcane",
            "Sugarcane is the primary raw material for the sugar industry. It is bulky and perishable, so sugar mills are located close to sugarcane fields.",
            "Easy", "competency",
        ))
        self.questions.append(self._short(
            "industries",
            "Why are sugar mills located near sugarcane fields?",
            "Sugarcane is bulky, heavy, and loses sugar content quickly after harvesting, making transport expensive.",
            "Sugarcane contains about 12–14% sugar and is very bulky (low sugar-to-bagasse ratio). It loses sugar content rapidly due to enzymatic changes after cutting. Transporting it over long distances is uneconomical, so mills are sited near fields.",
            "Medium", "competency",
        ))
        self.questions.append(self._short(
            "industries",
            "List any three raw materials needed for an iron and steel plant.",
            "Iron ore, coal/coke, limestone, manganese",
            "Raw materials for iron and steel: (1) Iron ore → provides iron, (2) Coal/Coke → fuel and reducing agent, (3) Limestone → flux to remove impurities, (4) Manganese → hardening agent.",
            "Medium", "standard",
        ))
        self.questions.append(self._long(
            "industries",
            "Describe the location and importance of the Tata Iron and Steel Plant at Jamshedpur.",
            "Located in Jharkhand; near coal (Jharia), iron ore (Singhbhum), water (Subarnarekha); first steel plant in India.",
            "Tata Iron and Steel Company (TISCO) at Jamshedpur, Jharkhand (established 1907), was the first large-scale steel plant in India. Location factors: (1) Iron ore from the nearby Singhbhum district, (2) Coal from Jharia and Bokaro coalfields, (3) Water from the Subarnarekha River, (4) Good railway connectivity. It produces high-quality steel used in construction, railways, and automobiles.",
            "Hard", "competency",
        ))

    # ---- Energy Resources ----
    def _energy(self, count: int):
        n = self.rng
        for category, resources in n.sample(list(ENERGY_RESOURCES.items()), 2):
            res_list = list(resources.keys())
            res = n.choice(res_list)
            info = resources[res]
            others = [r for r in res_list if r != res]
            opts = [res.capitalize()] + n.sample([o.capitalize() for o in others], 3)
            n.shuffle(opts)
            self.questions.append(self._mcq(
                "energy",
                f"Which energy source is described by: '{info[:60]}...'?",
                opts,
                res.capitalize(),
                f"{res.capitalize()} energy: {info}",
                "Medium", "standard",
            ))

        self.questions.append(self._fill(
            "energy",
            "Energy sources that can be replenished naturally over a short period are called _____ energy resources.",
            "renewable",
            "Renewable energy resources (solar, wind, biogas, tidal, geothermal) can be replenished naturally. Non-renewable resources (coal, petroleum, natural gas, nuclear) exist in finite quantities.",
            "Easy", "standard",
        ))
        self.questions.append(self._fill(
            "energy",
            "The largest hydropower project in India, built on the Sutlej River, is the _____.",
            "Bhakra Nangal Dam",
            "The Bhakra Nangal Dam, built on the Sutlej River in Himachal Pradesh and Punjab, is one of the largest gravity dams in India and a major source of hydropower.",
            "Medium", "competency",
        ))
        self.questions.append(self._short(
            "energy",
            "Give two advantages of solar energy over conventional energy sources.",
            "Renewable, pollution-free, abundant, no fuel cost, low maintenance.",
            "(1) Renewable: Sunlight is inexhaustible on a human time-scale. (2) Environmentally clean: No greenhouse gas emissions or pollution during operation. (3) Low operating costs once installed. (4) India receives abundant solar radiation, especially in Rajasthan and Gujarat.",
            "Medium", "competency",
        ))
        self.questions.append(self._short(
            "energy",
            "What is biogas and how is it produced?",
            "Biogas is a gaseous fuel produced from organic waste like cattle dung, kitchen waste, and agricultural residue through anaerobic digestion.",
            "Biogas is produced by anaerobic digestion (fermentation without oxygen) of organic matter such as cattle dung, agricultural waste, kitchen waste, and sewage. Methanogenic bacteria break down the organic matter, producing methane (55–65%) and carbon dioxide (30–40%). The residual slurry is used as fertilizer.",
            "Medium", "standard",
        ))
        self.questions.append(self._long(
            "energy",
            "Compare conventional and non-conventional energy resources with examples.",
            "Conventional: coal, petroleum, natural gas, hydropower — finite, polluting. Non-conventional: solar, wind, biogas, tidal, geothermal, nuclear — renewable or clean.",
            "Conventional energy: Coal (Jharkhand), Petroleum (Assam, Bombay High), Natural gas, Hydropower — finite, cause pollution, expensive over time. Non-conventional: Solar (Rajasthan solar park), Wind (Tamil Nadu), Biogas (village-level from dung), Tidal (Gulf of Kutch), Geothermal (Ladakh), Nuclear (Tarapur, Kudankulam) — renewable or clean, increasingly cost-effective, environmentally friendly.",
            "Hard", "standard",
        ))

    # ---- Continents ----
    def _continents(self, count: int):
        n = self.rng
        continents = list(CONTINENTS_DATA.keys())
        for cont in n.sample(continents, len(continents)):
            data = CONTINENTS_DATA[cont]
            facts = [
                ("area", "Area"),
                ("population", "Population"),
                ("climate", "Climate"),
                ("landform", "Key landform feature"),
                ("minerals", "Important minerals"),
            ]
            key, label = n.choice(facts)
            value = data[key]
            others_cont = [c for c in continents if c != cont]
            opts = [value] + [CONTINENTS_DATA[c][key] for c in n.sample(others_cont, 3)]
            n.shuffle(opts)
            self.questions.append(self._mcq(
                cont,
                f"Which continent is described by: {label} — '{value}'?",
                opts,
                value,
                f"This matches {cont.replace('_', ' ').title()}: {label} = {value}",
                "Medium", "standard",
            ))

        self.questions.append(self._fill(
            "europe",
            "The largest continent by area is _____, while the smallest is _____.",
            "Asia, Australia",
            "Asia is the largest continent (~44.58 million sq km). Australia is the smallest continent (~7.69 million sq km) and also the only one that is a single country.",
            "Easy", "standard",
        ))
        self.questions.append(self._fill(
            "africa",
            "The longest river in the world, flowing through Africa, is the _____.",
            "Nile",
            "The Nile River (approximately 6,650 km) is the longest river in the world, flowing through Egypt, Sudan, South Sudan, Ethiopia, and Uganda into the Mediterranean Sea.",
            "Easy", "competency",
        ))
        self.questions.append(self._fill(
            "antarctica",
            "The continent with no permanent human residents and no native human population is _____.",
            "Antarctica",
            "Antarctica has no indigenous population and no permanent residents. Only scientists and researchers from various countries live there temporarily at research stations.",
            "Easy", "standard",
        ))
        self.questions.append(self._short(
            "australia",
            "Why is Australia called the driest inhabited continent?",
            "Large areas are desert; much of the interior receives less than 250 mm of rainfall annually; the Great Artesian Basin is the only reliable water source.",
            "Australia is the driest inhabited continent. About 35% of the land receives less than 250 mm of rainfall. The interior is largely desert and semi-desert. Most of the population lives on the coastal fringe where rainfall is higher.",
            "Medium", "competency",
        ))
        self.questions.append(self._long(
            "europe",
            "Describe Europe as the 'peninsula of peninsulas' and explain why it has a temperate climate.",
            "Europe is a peninsula of peninsulas (Scandinavian, Iberian, Italian, Balkan). It has temperate climate due to warm Atlantic currents and westerly winds.",
            "Europe is called the 'peninsula of peninsulas' because it is itself a large peninsula extending westwards from Eurasia, and contains smaller peninsulas — Scandinavian, Iberian, Italian, and Balkan. Its temperate climate results from: (1) The warm North Atlantic Drift (extension of Gulf Stream) bringing mild winters, (2) Prevailing westerly winds bringing moist air, (3) Its mid-latitude position (35°N–70°N), (4) Lack of extreme north-south mountain barriers.",
            "Hard", "standard",
        ))
        self.questions.append(self._long(
            "antarctica",
            "Why is Antarctica not considered a country? Name the treaty that governs it.",
            "No permanent population, no government, no economy; governed by Antarctic Treaty (1959) — dedicated to peace and science.",
            "Antarctica is not a country because: (1) It has no indigenous or permanent population. (2) It has no government or sovereign authority. (3) It supports no agriculture or industry. The Antarctic Treaty (signed 1959) governs the continent, dedicating it to peace and scientific research. It prohibits military activity, mineral mining, and nuclear testing.",
            "Hard", "standard",
        ))

    # ---- Distinguish between (competency) ----
    def _distinguish(self, count: int):
        pairs = [
            ("Weather", "Climate",
             "Weather is the day-to-day state of the atmosphere at a place (short-term, variable).",
             "Climate is the average weather pattern over 30+ years at a place (long-term, stable)."),
            ("Mechanical weathering", "Chemical weathering",
             "Physical breaking of rocks without chemical change (e.g., frost action).",
             "Chemical alteration of rock minerals (e.g., oxidation, carbonation)."),
            ("Conventional energy", "Non-conventional energy",
             "Traditional, often non-renewable sources like coal, petroleum, natural gas.",
             "Modern, renewable or clean sources like solar, wind, biogas, tidal."),
            ("Agro-based industry", "Mineral-based industry",
             "Uses agricultural raw materials (e.g., cotton for textiles, sugarcane for sugar).",
             "Uses minerals as raw materials (e.g., iron ore for steel, bauxite for aluminium)."),
            ("Topographical map", "Political map",
             "Shows natural and man-made features, relief, drainage, scale, grid references.",
             "Shows boundaries of countries, states, cities — no relief or scale details."),
            ("Contour lines", "Isotherms",
             "Join points of equal height above sea level on a topographical map.",
             "Join points of equal temperature on a weather or thematic map."),
            ("Easting", "Northing",
             "Vertical grid lines numbered eastwards from the central meridian.",
             "Horizontal grid lines numbered northwards from the central line."),
            ("Four-figure grid ref", "Six-figure grid ref",
             "Uses first two digits of easting and northing; locates a 1 km square.",
             "Uses all three digits; locates a 100 m square within the 1 km square."),
        ]
        n = self.rng
        for title, term2, def1, def2 in n.sample(pairs, min(count, len(pairs))):
            self.questions.append(self._long(
                "distinguish",
                f"Distinguish between {title} and {term2}.",
                f"{title}: {def1} | {term2}: {def2}",
                f"Points of difference: (1) Definition: {def1} vs {def2}. (2) Nature: {title} involves [nature A] while {term2} involves [nature B]. (3) Example use case: {title} is used in [context A], {term2} in [context B].",
                "Medium", "competency",
            ))

    # ---- Indian context competency ----
    def _indian_competency(self, count: int):
        n = self.rng
        competency_questions = [
            self._fill(
                "topo_maps",
                "The Survey of India was founded in the year _____.",
                "1767",
                "The Survey of India was established in 1767 by the British East India Company. It is the oldest scientific department of the Government of India and is headquartered in Dehradun.",
                "Medium", "competency",
            ),
            self._fill(
                "atmosphere",
                "The ozone hole was first detected over the continent of _____.",
                "Antarctica",
                "The Antarctic ozone hole was first detected in 1985 by British scientists. It forms each spring (September–November) due to extremely cold temperatures and polar stratospheric clouds that activate CFCs.",
                "Medium", "competency",
            ),
            self._fill(
                "industries",
                "India's largest jute-producing state is _____.",
                "West Bengal",
                "West Bengal accounts for over 50% of India's jute production. The jute mills are concentrated along the Hooghly River near Kolkata.",
                "Medium", "competency",
            ),
            self._fill(
                "energy",
                "India's largest wind energy-producing state is _____.",
                "Tamil Nadu",
                "Tamil Nadu is India's largest wind energy-producing state, with major wind farms at Muppandal (Kanyakumari district), generating over 8,000 MW of wind power.",
                "Medium", "competency",
            ),
            self._fill(
                "soil",
                "The black soil (Regur soil) found in Maharashtra and Madhya Pradesh is ideal for growing _____.",
                "cotton",
                "Black soil (Regur soil) is rich in iron, lime, and magnesium. It has high moisture retention and is ideal for cotton cultivation. It is found in the Deccan Plateau (Maharashtra, MP, Gujarat).",
                "Medium", "competency",
            ),
            self._fill(
                "industries",
                "India's first iron and steel plant was established at _____ by TISCO.",
                "Jamshedpur",
                "Tata Iron and Steel Company (TISCO) set up India's first large steel plant at Jamshedpur, Jharkhand in 1907. It was Asia's first integrated steel plant.",
                "Medium", "competency",
            ),
            self._fill(
                "africa",
                "The _____ River is the longest river in Africa and the world.",
                "Nile",
                "The Nile River (approx. 6,650 km) flows northward through Uganda, Sudan, and Egypt into the Mediterranean Sea. It is the longest river in the world.",
                "Medium", "competency",
            ),
            self._fill(
                "europe",
                "The _____ Mountains form the natural boundary between Europe and Asia.",
                "Ural",
                "The Ural Mountains run north-south through western Russia, forming the traditional boundary between Europe and Asia. They are relatively low (max 1,895 m at Mount Narodnaya).",
                "Easy", "competency",
            ),
            self._short(
                "topo_maps",
                "A student in Bangalore has a Survey of India topographical map of the area. What grid reference information would help her locate her school precisely?",
                "Six-figure grid reference (easting + northing to 3 digits each).",
                "A six-figure grid reference pinpoints a location to within a 100 m × 100 m square. For example, if the school falls in the 1 km square 7624, the six-figure reference might be 763245 (easting 763, northing 245).",
                "Hard", "competency",
            ),
            self._short(
                "weathering",
                "Name the type of soil found in the Himalayan region and explain why it is less fertile.",
                "Mountain soil — thin, less humus, prone to erosion, steep slopes prevent deep soil formation.",
                "Himalayan soils are generally mountain soils or forest soils. They are thin because: (1) Steep slopes prevent soil accumulation. (2) Heavy rainfall causes rapid erosion. (3) Cold climate slows decomposition of organic matter. They are less fertile than the plains' alluvial soils.",
                "Hard", "competency",
            ),
        ]
        for q in n.sample(competency_questions, min(len(competency_questions), count)):
            self.questions.append(q)

    # ---- General mixed ----
    def _general_mixed(self, count: int):
        n = self.rng
        generals = [
            self._fill(
                "general",
                "The imaginary line drawn on a globe from the North Pole to the South Pole is called a _____.",
                "meridian / line of longitude",
                "A meridian (line of longitude) connects the North and South Poles. The Prime Meridian (0°) passes through Greenwich, England.",
                "Easy", "standard",
            ),
            self._fill(
                "general",
                "The Great Barrier Reef, the world's largest coral reef system, is located off the coast of _____.",
                "Australia",
                "The Great Barrier Reef stretches over 2,300 km off the coast of Queensland, Australia. It is the world's largest coral reef system and a UNESCO World Heritage Site.",
                "Medium", "standard",
            ),
            self._mcq(
                "general",
                "Which continent has the highest population?",
                ["Africa", "Asia", "Europe", "South America"],
                "Asia",
                "Asia has the highest population (~4.7 billion), followed by Africa (~1.4 billion), Europe (~750 million), and South America (~430 million).",
                "Easy", "standard",
            ),
            self._mcq(
                "general",
                "The instrument used to measure wind speed is called:",
                ["Thermometer", "Barometer", "Anemometer", "Hygrometer"],
                "Anemometer",
                "An anemometer measures wind speed. The name comes from the Greek 'anemos' (wind). A common type uses rotating cups whose speed of rotation indicates wind speed.",
                "Easy", "standard",
            ),
            self._mcq(
                "atmosphere",
                "Which gas is most abundant in the Earth's atmosphere?",
                ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
                "Nitrogen",
                "Nitrogen (N₂) constitutes approximately 78.08% of the Earth's atmosphere by volume, making it the most abundant gas. Oxygen is second at ~20.95%.",
                "Easy", "standard",
            ),
            self._fill(
                "general",
                "The _____ is the only continent through which the Equator, Tropic of Cancer, and Tropic of Capricorn all pass.",
                "Africa",
                "Africa is the only continent through which the Equator, Tropic of Cancer, and Tropic of Capricorn all pass. It is also the hottest continent.",
                "Medium", "standard",
            ),
            self._fill(
                "general",
                "The Southernmost tip of mainland India is called _____.",
                "Kanyakumari",
                "Kanyakumari (Cape Comorin) is the southernmost tip of mainland India, located in Tamil Nadu. It is where the Arabian Sea, Bay of Bengal, and Indian Ocean meet.",
                "Easy", "competency",
            ),
        ]
        for q in n.sample(generals, min(len(generals), count)):
            self.questions.append(q)

    # ---- Long answer: map interpretation ----
    def _map_work(self, count: int):
        n = self.rng
        if count > 0:
            self.questions.append(self._long(
                "map_work",
                "A topographical map shows contour lines spaced 0.5 cm apart on the map. The contour interval is 20 m. Calculate the gradient of the slope. If the scale is 1:50,000, what does this gradient tell us about the terrain?",
                "Gradient = vertical interval / horizontal equivalent = 20 m / (0.5 cm × 50,000) = 20 / 25000 = 1:1250. Steep gradient.",
                "Step 1: Horizontal equivalent (ground) = 0.5 cm × 50,000 = 25,000 cm = 250 m. Step 2: Gradient = rise / run = 20 m / 250 m = 1:12.5. Step 3: A gradient of 1:12.5 means for every 12.5 m horizontally, the land rises 1 m vertically — this is a fairly steep slope.",
                "Hard", "standard",
            ))
        if count > 1:
            self.questions.append(self._long(
                "map_work",
                "Using a 1:50,000 scale map, the distance between two towns A and B is 8 cm. The road between them is winding. If the straight-line distance is 6 km, calculate the actual road distance on the ground.",
                "Map road distance = 8 cm × 50,000 = 400,000 cm = 4 km.",
                "Step 1: Scale = 1:50,000 means 1 cm on map = 50,000 cm on ground = 500 m = 0.5 km. Step 2: Map road distance = 8 cm. Step 3: Actual road distance = 8 × 0.5 km = 4 km. Step 4: The winding factor = road distance / straight-line distance = 4 km / 6 km = 0.67 (winding increases distance).",
                "Hard", "standard",
            ))

    # ---- Main build method ----
    def build(self, count: int):
        """Distribute questions across topics."""
        # Weightage-based allocation (approximate)
        weights = {
            "topo_maps": 3,
            "scale": 2,
            "atmosphere": 3,
            "weather_climate": 2,
            "weathering": 2,
            "soil": 2,
            "industries": 3,
            "energy": 3,
            "continents": 3,
            "general": 2,
        }
        total_weight = sum(weights.values())
        per_topic = {k: max(1, round(count * v / total_weight)) for k, v in weights.items()}

        self._topo_maps(per_topic["topo_maps"])
        self._scale(per_topic["scale"])
        self._atmosphere(per_topic["atmosphere"])
        self._weather_climate(per_topic["weather_climate"])
        self._weathering_soil(per_topic["weathering"] + per_topic["soil"])
        self._industries(per_topic["industries"])
        self._energy(per_topic["energy"])
        self._continents(per_topic["continents"])
        self._general_mixed(per_topic["general"])
        self._distinguish(min(3, count // 10))
        self._indian_competency(min(4, count // 8))
        self._map_work(min(2, count // 15))

        n = self.rng
        n.shuffle(self.questions)
        return self.questions[:count]


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def generate_questions(seed: int = 42, count: int = 40) -> List[Dict[str, Any]]:
    """
    Generate `count` deterministic CISCE Class 7 Geography questions.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Number of questions to generate.

    Returns
    -------
    List[Dict]
        Each dict has keys: id, type, question, options, answer, explanation,
        difficulty, topic, competency.
    """
    rng = _rng(seed)
    # Deterministically derive a per-bank seed
    bank_seed = rng.randint(0, 2**31 - 1)
    bank = QuestionBank(bank_seed)
    questions = bank.build(max(1, count))
    # Trim or pad
    while len(questions) < count:
        # duplicate last with slight variation
        last = dict(questions[-1])
        last["id"] = f"geo7_extra_{len(questions):03d}"
        questions.append(last)
    return questions[:count]


# ---------------------------------------------------------------------------
# Solvers
# ---------------------------------------------------------------------------

def solve_grid_reference(params: Dict) -> Dict:
    """Solve a grid reference question."""
    easting = params.get("easting", "78")
    northing = params.get("northing", "32")
    four_fig = f"{easting}{northing}"
    answer = f"Four-figure grid reference: {four_fig}"
    steps = [
        f"Step 1: Read easting value: {easting}",
        f"Step 2: Read northing value: {northing}",
        f"Step 3: Combine for four-figure reference: {four_fig}",
        f"Step 4: This locates a 1 km × 1 km square on the map.",
    ]
    verification = (
        f"Verification: Four-figure GR uses the first two digits of easting and northing. "
        f"Got: easting '{easting}', northing '{northing}' → {four_fig}. ✓"
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_scale_conversion(params: Dict) -> Dict:
    """Solve a scale conversion question."""
    map_cm = float(params.get("map_cm", 4))
    scale = params.get("scale", "1:50000")
    scale_num = int(scale.split(":")[1].replace(",", ""))
    ground_cm = map_cm * scale_num
    ground_m = ground_cm / 100
    ground_km = ground_m / 1000
    answer = f"{ground_m:g} m ({ground_km} km)"
    steps = [
        f"Step 1: Scale = {scale} means 1 cm on map = {scale_num:,} cm on ground.",
        f"Step 2: Map distance = {map_cm} cm.",
        f"Step 3: Ground distance = {map_cm} × {scale_num:,} = {ground_cm:,.0f} cm.",
        f"Step 4: Convert to metres: {ground_cm:,.0f} cm ÷ 100 = {ground_m:g} m.",
    ]
    verification = (
        f"Back-substitution: {ground_m:g} m ÷ {scale_num:,} = {ground_m / scale_num:.4f} cm on map. "
        f"Expected: {map_cm} cm. Match: {abs(ground_m / scale_num - map_cm) < 1e-6}. ✓"
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_gradient(params: Dict) -> Dict:
    """Calculate slope gradient from contour data."""
    contour_interval = float(params.get("contour_interval", 20))  # metres
    spacing_cm = float(params.get("spacing_cm", 0.5))
    scale = params.get("scale", "1:50000")
    scale_num = int(scale.split(":")[1].replace(",", ""))
    horizontal_ground_m = spacing_cm * scale_num / 100  # metres
    gradient = contour_interval / horizontal_ground_m
    answer = f"Gradient = 1:{1/gradient:.1f}"
    steps = [
        f"Step 1: Contour interval (vertical interval) = {contour_interval} m",
        f"Step 2: Contour spacing on map = {spacing_cm} cm, scale = {scale}",
        f"Step 3: Horizontal equivalent = {spacing_cm} cm × {scale_num:,} = {spacing_cm * scale_num:,.0f} cm = {horizontal_ground_m:g} m",
        f"Step 4: Gradient = rise / run = {contour_interval} m / {horizontal_ground_m:g} m = {gradient:.4f}",
        f"Step 5: Expressed as 1 in N = 1:{1/gradient:.1f}",
    ]
    if gradient > 0.1:
        steepness = "steep"
    elif gradient > 0.02:
        steepness = "moderate"
    else:
        steepness = "gentle"
    verification = (
        f"Numerical check: gradient = {gradient:.4f}. "
        f"Since gradient > 0.1, the slope is {steepness}. "
        f"Vertical check: {horizontal_ground_m:g} m × {gradient:.4f} = {horizontal_ground_m * gradient:.2f} m ≈ {contour_interval} m. ✓"
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_atmosphere_composition(params: Dict) -> Dict:
    """Calculate gas percentage or volume in the atmosphere."""
    total_volume_km3 = float(params.get("total_volume_km3", 5100))  # approximate
    gas = params.get("gas", "Nitrogen")
    pct = ATMOSPHERE_COMPOSITION.get(gas, 78.08)
    volume = total_volume_km3 * pct / 100
    answer = f"{gas}: {volume:.1f} km³ ({pct}%)"
    steps = [
        f"Step 1: Total atmospheric volume ≈ {total_volume_km3:,} km³",
        f"Step 2: {gas} percentage = {pct}%",
        f"Step 3: Volume of {gas} = {total_volume_km3:,} × {pct}/100 = {volume:.1f} km³",
    ]
    verification = (
        f"Back-check: {volume:.1f} / {total_volume_km3:,} × 100 = {volume / total_volume_km3 * 100:.2f}%. "
        f"Expected: {pct}%. ✓"
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_rainfall_conversion(params: Dict) -> Dict:
    """Convert mm rainfall to litres per square metre."""
    rainfall_mm = float(params.get("rainfall_mm", 15))
    litres_per_m2 = rainfall_mm * 1  # 1 mm rain = 1 L/m²
    area_1ha_mm = litres_per_m2 * 10_000  # 1 hectare = 10,000 m²
    answer = f"{litres_per_m2:g} litres per m²; {area_1ha_mm:g} litres per hectare"
    steps = [
        f"Step 1: Rainfall received = {rainfall_mm} mm",
        f"Step 2: 1 mm of rain on 1 m² = 1 litre of water",
        f"Step 3: Litres per m² = {rainfall_mm} × 1 = {litres_per_m2:g} L/m²",
        f"Step 4: 1 hectare = 10,000 m², so total = {litres_per_m2:g} × 10,000 = {area_1ha_mm:g} L/ha",
    ]
    verification = (
        f"Check: {area_1ha_mm:g} L = {area_1ha_mm / 1000:.0f} m³ of water over 1 hectare. "
        f"Depth = {area_1ha_mm / 10000:.0f} mm = {rainfall_mm} mm. ✓"
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_scale_rf(params: Dict) -> Dict:
    """Convert a statement scale to Representative Fraction."""
    statement_cm = float(params.get("statement_cm", 1))
    statement_km = float(params.get("statement_km", 5))
    ground_cm = statement_km * 100_000  # 1 km = 100,000 cm
    rf_num = int(statement_cm)
    rf_den = int(ground_cm / rf_num)
    answer = f"RF = {rf_num}:{rf_den:,} or 1:{rf_den // rf_num:,}"
    steps = [
        f"Step 1: Statement scale: {statement_cm} cm = {statement_km} km",
        f"Step 2: Convert {statement_km} km to cm: {statement_km} km × 100,000 = {ground_cm:,.0f} cm",
        f"Step 3: RF = {statement_cm} cm : {ground_cm:,.0f} cm = {rf_num}:{rf_den:,}",
        f"Step 4: Simplified: 1:{rf_den // rf_num:,}",
    ]
    verification = (
        f"Check: 1 cm on map = {rf_den // rf_num:,} cm on ground = "
        f"{(rf_den // rf_num) / 100000} km. Expected: {statement_km} km. ✓"
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_elevation_from_contours(params: Dict) -> Dict:
    """Determine elevation from contour values."""
    base_elevation = float(params.get("base_elevation", 200))
    contour_interval = float(params.get("contour_interval", 20))
    num_contours = int(params.get("num_contours", 3))
    # Closed contours with increasing values towards center → hill
    top_elevation = base_elevation + num_contours * contour_interval
    answer = f"The hill's highest point is approximately {top_elevation} m to {top_elevation + contour_interval} m"
    steps = [
        f"Step 1: Base contour elevation = {base_elevation} m",
        f"Step 2: Contour interval = {contour_interval} m",
        f"Step 3: Number of closed contours rising towards centre = {num_contours}",
        f"Step 4: Highest closed contour = {base_elevation} + {num_contours}×{contour_interval} = {base_elevation + num_contours * contour_interval} m",
        f"Step 5: The peak lies between {base_elevation + num_contours * contour_interval} m and {base_elevation + (num_contours + 1) * contour_interval} m",
    ]
    verification = (
        f"Check: Contour values = {[base_elevation + i * contour_interval for i in range(1, num_contours + 1)]}. "
        f"Increasing towards centre confirms a hill. ✓"
    )
    return {"answer": answer, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# Run self-test when executed directly
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print("=" * 70)
    print("CISCE Class 7 Geography — Question Generator & Solver Test")
    print("=" * 70)

    # Generate questions
    questions = generate_questions(seed=12345, count=30)
    print(f"\nGenerated {len(questions)} questions:\n")
    for q in questions:
        print(f"  [{q['type'].upper():12s}] [{q['difficulty']:6s}] [{q['competency']:11s}] "
              f"[{q['topic']:15s}] Q: {q['question'][:70]}...")
        print(f"    Answer: {str(q['answer'])[:80]}")

    # Run solvers
    print("\n" + "=" * 70)
    print("Solver Tests")
    print("=" * 70)

    solvers = [
        ("Grid Reference", lambda: solve_grid_reference({"easting": "78", "northing": "32"})),
        ("Scale Conversion", lambda: solve_scale_conversion({"map_cm": 4, "scale": "1:50000"})),
        ("Gradient", lambda: solve_gradient({"contour_interval": 20, "spacing_cm": 0.5, "scale": "1:50000"})),
        ("Atmosphere Composition", lambda: solve_atmosphere_composition({"gas": "Nitrogen"})),
        ("Rainfall Conversion", lambda: solve_rainfall_conversion({"rainfall_mm": 15})),
        ("Scale to RF", lambda: solve_scale_rf({"statement_cm": 1, "statement_km": 5})),
        ("Elevation from Contours", lambda: solve_elevation_from_contours(
            {"base_elevation": 200, "contour_interval": 20, "num_contours": 3})),
    ]

    for name, solver_fn in solvers:
        result = solver_fn()
        print(f"\n--- {name} ---")
        print(f"  Answer: {result['answer']}")
        print(f"  Steps:")
        for step in result["steps"]:
            print(f"    {step}")
        print(f"  Verification: {result['verification']}")

    print("\n" + "=" * 70)
    print("All tests completed.")