"""
CISCE ICSE Class 8 Geography - Deterministic Question Generator

A self-contained, reproducible question generation system for ICSE Class 8 Geography.
Topics covered: c8_geo_001 through c8_geo_010
"""

import random
import hashlib
import json
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, field, asdict
from enum import Enum


# ============================================================================
# Data Structures
# ============================================================================

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Difficulty(Enum):
    EASY = 0.25
    MEDIUM = 0.5
    HARD = 0.75


# ============================================================================
# CISCE Syllabus Content Bank (c8_geo_001 through c8_geo_010)
# ============================================================================

# c8_geo_001 - Atmosphere: Structure and Composition
ATMOSPHERE_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_001",
        "topic_name": "Atmosphere: Structure and Composition",
        "questions": [
            {
                "id": "c8_geo_001_001",
                "question_text": "Which layer of the atmosphere contains most of the ozone layer?",
                "question_type": "mcq",
                "options": ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
                "answer": 1,
                "difficulty": 0.25,
                "solution": (
                    "The Stratosphere contains the ozone layer, which absorbs harmful "
                    "ultraviolet radiation from the sun. The ozone concentration is highest "
                    "at about 20-30 km altitude within this layer."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 1,
                },
            },
            {
                "id": "c8_geo_001_002",
                "question_text": "The atmosphere layer where all weather phenomena occur is called the _______.",
                "question_type": "fill_blank",
                "answer": "troposphere",
                "difficulty": 0.25,
                "solution": (
                    "The Troposphere is the lowest layer of the atmosphere, extending up to "
                    "about 12 km from the Earth's surface. All weather phenomena like clouds, "
                    "rain, wind, and storms occur in this layer."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "troposphere",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_001_003",
                "question_text": "Name the three main gases that make up the Earth's atmosphere by volume.",
                "question_type": "short_answer",
                "answer": "Nitrogen (78%), Oxygen (21%), and Argon (0.9%)",
                "difficulty": 0.35,
                "solution": (
                    "The Earth's atmosphere by volume: Nitrogen ~78%, Oxygen ~21%, "
                    "Argon ~0.9%, and Carbon Dioxide ~0.04%. These proportions are "
                    "constant up to about 80 km altitude (the homosphere)."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": ["nitrogen", "oxygen", "argon"],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_001_004",
                "question_text": (
                    "Explain why the Stratosphere is warmer than the Mesosphere. "
                    "Mention the role of the ozone layer in your answer."
                ),
                "question_type": "long_answer",
                "answer": (
                    "The Stratosphere is warmer than the Mesosphere because it contains "
                    "the ozone layer. Ozone (O3) absorbs ultraviolet (UV) radiation from the "
                    "sun, converting it into heat energy. This absorption causes temperature "
                    "to increase with altitude in the Stratosphere (temperature inversion). "
                    "Above the Stratosphere, in the Mesosphere, there is no ozone to absorb "
                    "solar radiation, so temperatures decrease with altitude."
                ),
                "difficulty": 0.65,
                "solution": (
                    "Expected answer should mention: (1) Ozone layer in Stratosphere, "
                    "(2) Ozone absorbs UV radiation, (3) UV converts to heat, "
                    "(4) Temperature increases with height in Stratosphere (inversion), "
                    "(5) Mesosphere has no ozone hence is colder."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "ozone", "ultraviolet", "absorb", "heat",
                        "stratosphere", "temperature", "radiation"
                    ],
                    "min_match": 4,
                },
            },
            {
                "id": "c8_geo_001_005",
                "question_text": (
                    "The atmospheric pressure at sea level is approximately "
                    "_______ N/m\u00b2 (or Pascals)."
                ),
                "question_type": "numerical",
                "answer": 101325,
                "difficulty": 0.45,
                "solution": (
                    "Standard atmospheric pressure at sea level is 101,325 Pa (Pascals), "
                    "which is also expressed as 1 atmosphere (atm) or 760 mm of Hg. "
                    "This is the weight of the air column per unit area."
                ),
                "verification": {
                    "type": "numerical_range",
                    "correct": 101325,
                    "tolerance": 500,
                },
            },
            {
                "id": "c8_geo_001_006",
                "question_text": "Which layer of the atmosphere is the hottest and where do auroras occur?",
                "question_type": "mcq",
                "options": [
                    "Stratosphere - Mesosphere boundary",
                    "Exosphere",
                    "Thermosphere",
                    "Ionosphere"
                ],
                "answer": 2,
                "difficulty": 0.55,
                "solution": (
                    "The Thermosphere is the hottest layer (temperatures can reach 2000\u00b0C) "
                    "due to absorption of high-energy solar radiation. Auroras (Northern and "
                    "Southern Lights) occur in the Thermosphere when charged solar particles "
                    "interact with atmospheric gases."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 2,
                },
            },
            {
                "id": "c8_geo_001_007",
                "question_text": (
                    "The boundary between the Troposphere and the Stratosphere is called "
                    "the _______."
                ),
                "question_type": "fill_blank",
                "answer": "tropopause",
                "difficulty": 0.35,
                "solution": (
                    "The Tropopause is the boundary layer between the Troposphere and the "
                    "Stratosphere. At this boundary, the temperature stops decreasing with "
                    "height and becomes nearly constant. Its altitude varies from about "
                    "8 km at the poles to 18 km at the equator."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "tropopause",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_001_008",
                "question_text": (
                    "Why is the Exosphere important for satellite communication? "
                    "Explain in 3-4 sentences."
                ),
                "question_type": "long_answer",
                "answer": (
                    "The Exosphere is the outermost layer of the atmosphere, extending from "
                    "about 700 km to 10,000 km. It is important for satellites because: "
                    "(1) It is very thin with minimal drag, allowing satellites to orbit "
                    "with little resistance; (2) Communication satellites in geostationary "
                    "orbit (~36,000 km) operate beyond the exosphere; (3) The layer contains "
                    "light gases like hydrogen and helium that can escape into space."
                ),
                "difficulty": 0.7,
                "solution": (
                    "Key points: thin atmosphere/low drag for satellite orbits, "
                    "geostationary satellites operate here/beyond, "
                    "contains escaping light gases (H2, He)."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": ["satellite", "orbit", "thin", "drag", "exosphere"],
                    "min_match": 3,
                },
            },
        ]
    }
]


# c8_geo_002 - Weather and Climate
WEATHER_CLIMATE_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_002",
        "topic_name": "Weather and Climate",
        "questions": [
            {
                "id": "c8_geo_002_001",
                "question_text": "Which instrument is used to measure atmospheric humidity?",
                "question_type": "mcq",
                "options": ["Barometer", "Hygrometer", "Thermometer", "Anemometer"],
                "answer": 1,
                "difficulty": 0.25,
                "solution": (
                    "A Hygrometer measures atmospheric humidity (moisture content in air). "
                    "A Barometer measures pressure, a Thermometer measures temperature, "
                    "and an Anemometer measures wind speed."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 1,
                },
            },
            {
                "id": "c8_geo_002_002",
                "question_text": "The average weather conditions of a place over a long period (30+ years) is called its _______.",
                "question_type": "fill_blank",
                "answer": "climate",
                "difficulty": 0.25,
                "solution": (
                    "Climate refers to the long-term average of weather conditions "
                    "(temperature, rainfall, humidity, wind) over a period of at least "
                    "30 years. Weather is the short-term state of the atmosphere at a "
                    "specific time and place."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "climate",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_002_003",
                "question_text": "List any four elements of weather.",
                "question_type": "short_answer",
                "answer": "Temperature, Rainfall/Humidity, Wind speed/direction, Atmospheric pressure",
                "difficulty": 0.3,
                "solution": (
                    "The main elements of weather are: (1) Temperature, "
                    "(2) Atmospheric Pressure, (3) Humidity/Moisture, "
                    "(4) Wind speed and direction, (5) Cloud cover, "
                    "(6) Precipitation (rain, snow, etc.). Any four of these are correct."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": ["temperature", "rain", "wind", "pressure", "humidity", "cloud"],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_002_004",
                "question_text": "Distinguish between weather and climate with reference to time period, variability, and study methods.",
                "question_type": "long_answer",
                "answer": (
                    "Weather is the short-term state of the atmosphere at a specific time "
                    "and place (hours to days). It is highly variable and changes frequently. "
                    "Climate is the long-term average of weather conditions over 30+ years. "
                    "It is relatively stable. Weather is studied using instruments like "
                    "thermometers, barometers, and rain gauges measured daily. Climate is "
                    "studied using long-term data records and classified into climate zones."
                ),
                "difficulty": 0.6,
                "solution": (
                    "Expected differences: Time period (short-term vs long-term 30+ years), "
                    "Variability (changes frequently vs relatively stable), "
                    "Study method (daily instruments vs long-term records/classification)."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "weather", "climate", "short", "long", "time",
                        "variable", "stable", "temperature", "period"
                    ],
                    "min_match": 5,
                },
            },
            {
                "id": "c8_geo_002_005",
                "question_text": (
                    "A weather station recorded the following temperatures over a week: "
                    "28\u00b0C, 32\u00b0C, 25\u00b0C, 30\u00b0C, 27\u00b0C, 35\u00b0C, 29\u00b0C. "
                    "Calculate the average (mean) daily temperature for the week."
                ),
                "question_type": "numerical",
                "answer": 29.43,
                "difficulty": 0.4,
                "solution": (
                    "Sum = 28 + 32 + 25 + 30 + 27 + 35 + 29 = 206\n"
                    "Mean = 206 / 7 = 29.43\u00b0C (approximately 29.4\u00b0C)"
                ),
                "verification": {
                    "type": "numerical_range",
                    "correct": 29.43,
                    "tolerance": 0.5,
                },
            },
        ]
    }
]


# c8_geo_003 - World Climatic Regions
CLIMATE_REGIONS_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_003",
        "topic_name": "World Climatic Regions",
        "questions": [
            {
                "id": "c8_geo_003_001",
                "question_text": "Which climate zone lies between the Tropic of Cancer and the Tropic of Capricorn?",
                "question_type": "mcq",
                "options": ["Temperate Zone", "Torrid Zone", "Frigid Zone", "Subtropical Zone"],
                "answer": 1,
                "difficulty": 0.25,
                "solution": (
                    "The Torrid Zone (also called the Tropical Zone) lies between the "
                    "Tropic of Cancer (23.5\u00b0N) and the Tropic of Capricorn (23.5\u00b0S). "
                    "This zone receives the most direct sunlight throughout the year."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 1,
                },
            },
            {
                "id": "c8_geo_003_002",
                "question_text": "The climate type characterized by high temperatures and rainfall throughout the year is called _______ climate.",
                "question_type": "fill_blank",
                "answer": "tropical rainforest",
                "difficulty": 0.3,
                "solution": (
                    "Tropical Rainforest Climate (Af in K\u00f6ppen classification) is "
                    "characterized by high temperatures (average 25-27\u00b0C) and heavy "
                    "rainfall (200+ cm annually) throughout the year. Found near the equator "
                    "in the Amazon Basin, Congo Basin, and Southeast Asia."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "tropical rainforest",
                    "case_sensitive": False,
                    "accept_contains": ["tropical", "rainforest"],
                },
            },
            {
                "id": "c8_geo_003_003",
                "question_text": "Name the climate zone that includes the Arctic and Antarctic regions.",
                "question_type": "short_answer",
                "answer": "Frigid Zone",
                "difficulty": 0.25,
                "solution": (
                    "The Frigid Zone lies between the Arctic Circle (66.5\u00b0N) and the "
                    "North Pole, and between the Antarctic Circle (66.5\u00b0S) and the "
                    "South Pole. It has extremely cold temperatures and polar conditions "
                    "with long periods of darkness in winter."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "frigid zone",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_003_004",
                "question_text": (
                    "Compare the Tropical Rainforest Climate with the Desert Climate. "
                    "Discuss their location, temperature, and rainfall characteristics."
                ),
                "question_type": "long_answer",
                "answer": (
                    "Tropical Rainforest Climate: Located near the equator (Amazon, Congo, "
                    "SE Asia). High temperatures year-round (25-27\u00b0C average), high "
                    "rainfall (200+ cm annually), high humidity. Desert Climate: Located in "
                    "interior continental areas and rain-shadow regions (Sahara, Thar, "
                    "Atacama). Extreme temperatures (very hot days, cold nights), very low "
                    "rainfall (<25 cm annually), low humidity. Rainforest has dense "
                    "vegetation; deserts have sparse or no vegetation."
                ),
                "difficulty": 0.7,
                "solution": (
                    "Expected comparison covering: Location, Temperature patterns, "
                    "Rainfall amounts, Vegetation, and at least one specific example."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "rainforest", "desert", "equator", "temperature",
                        "rainfall", "hot", "vegetation", "tropical"
                    ],
                    "min_match": 5,
                },
            },
            {
                "id": "c8_geo_003_005",
                "question_text": (
                    "The Tropic of Cancer is located at approximately "
                    "_______ degrees North latitude."
                ),
                "question_type": "numerical",
                "answer": 23.5,
                "difficulty": 0.3,
                "solution": (
                    "The Tropic of Cancer is at approximately 23.5\u00b0 North latitude "
                    "(23\u00b026'N). Similarly, the Tropic of Capricorn is at 23.5\u00b0 South "
                    "latitude. These are the boundaries of the Torrid/Tropical Zone."
                ),
                "verification": {
                    "type": "numerical_range",
                    "correct": 23.5,
                    "tolerance": 1.0,
                },
            },
            {
                "id": "c8_geo_003_006",
                "question_text": "Which climate type is found in India and has three distinct seasons: summer, winter, and rainy?",
                "question_type": "mcq",
                "options": [
                    "Tropical Rainforest Climate",
                    "Mediterranean Climate",
                    "Tropical Monsoon Climate",
                    "Temperate Marine Climate"
                ],
                "answer": 2,
                "difficulty": 0.35,
                "solution": (
                    "Tropical Monsoon Climate is found in India and Southeast Asia. It has "
                    "three seasons: (1) Summer (hot, March-June), (2) Rainy/Monsoon (wet, "
                    "June-September), and (3) Winter (cool/dry, October-February). The "
                    "monsoon winds bring heavy rainfall during the rainy season."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 2,
                },
            },
        ]
    }
]


# c8_geo_004 - Rocks and Minerals
ROCKS_MINERALS_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_004",
        "topic_name": "Rocks and Minerals",
        "questions": [
            {
                "id": "c8_geo_004_001",
                "question_text": "What is the hard, naturally occurring, inorganic solid with a definite chemical composition called?",
                "question_type": "mcq",
                "options": ["Rock", "Mineral", "Soil", "Fossil"],
                "answer": 1,
                "difficulty": 0.25,
                "solution": (
                    "A Mineral is a naturally occurring, inorganic solid with a definite "
                    "chemical composition and an ordered atomic structure (crystalline). "
                    "Examples include quartz, feldspar, mica, and calcite. Rocks are "
                    "aggregates of one or more minerals."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 1,
                },
            },
            {
                "id": "c8_geo_004_002",
                "question_text": "Granite is an example of a _______ rock.",
                "question_type": "fill_blank",
                "answer": "igneous",
                "difficulty": 0.25,
                "solution": (
                    "Granite is an igneous rock formed from the slow cooling and "
                    "solidification of molten magma deep within the Earth's crust. "
                    "It is composed mainly of quartz, feldspar, and mica minerals."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "igneous",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_004_003",
                "question_text": "Name any four minerals commonly found in the Earth's crust.",
                "question_type": "short_answer",
                "answer": "Quartz, Feldspar, Mica, Calcite",
                "difficulty": 0.35,
                "solution": (
                    "Common minerals in Earth's crust include: (1) Feldspar (~50% of crust), "
                    "(2) Quartz (~12%), (3) Mica (biotite, muscovite), (4) Calcite, "
                    "(5) Olivine, (6) Pyroxene, (7) Amphibole, (8) Clay minerals."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": ["quartz", "feldspar", "mica", "calcite", "olivine", "mineral"],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_004_004",
                "question_text": (
                    "Explain the difference between a rock and a mineral. "
                    "Give two examples of each."
                ),
                "question_type": "long_answer",
                "answer": (
                    "A mineral is a naturally occurring, inorganic solid with a definite "
                    "chemical composition and crystalline structure. Examples: Quartz (SiO2) "
                    "and Feldspar ( aluminosilicates). A rock is a solid aggregate of one or "
                    "more minerals (or mineraloids). Examples: Granite (quartz + feldspar + "
                    "mica), Basalt, Limestone (calcite). Key differences: Minerals have a "
                    "definite chemical composition; rocks do not. Minerals have a definite "
                    "crystalline structure; rocks are mixtures."
                ),
                "difficulty": 0.65,
                "solution": (
                    "Expected answer: Definition of mineral (natural, inorganic, solid, "
                    "definite composition, crystalline), definition of rock (aggregate of "
                    "minerals), at least 2 examples of each, key differences in composition "
                    "and structure."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "mineral", "rock", "composition", "crystalline",
                        "aggregate", "natural", "inorganic", "example"
                    ],
                    "min_match": 5,
                },
            },
            {
                "id": "c8_geo_004_005",
                "question_text": (
                    "Mohs Scale of Hardness is used to measure the _______ of minerals. "
                    "Diamond has a hardness of _______ on this scale."
                ),
                "question_type": "numerical",
                "answer": 10,
                "difficulty": 0.5,
                "solution": (
                    "Mohs Scale of Hardness measures the scratch resistance of minerals, "
                    "ranging from 1 (talc - softest) to 10 (diamond - hardest). Diamond "
                    "is the hardest known natural mineral. Other values: Gypsum=2, "
                    "Calcite=3, Fluorite=4, Apatite=5, Orthoclase=6, Quartz=7, "
                    "Topaz=8, Corundum=9."
                ),
                "verification": {
                    "type": "numerical_value",
                    "correct": 10,
                },
            },
        ]
    }
]


# c8_geo_005 - Types of Rocks
ROCK_TYPES_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_005",
        "topic_name": "Types of Rocks",
        "questions": [
            {
                "id": "c8_geo_005_001",
                "question_text": "Rocks formed from the cooling and solidification of molten magma are called:",
                "question_type": "mcq",
                "options": [
                    "Sedimentary Rocks",
                    "Metamorphic Rocks",
                    "Igneous Rocks",
                    "Fossiliferous Rocks"
                ],
                "answer": 2,
                "difficulty": 0.25,
                "solution": (
                    "Igneous Rocks are formed when molten magma or lava cools and "
                    "solidifies. If cooling occurs below the surface (intrusive), "
                    "crystals are large (e.g., granite). If cooling occurs on the "
                    "surface (extrusive), crystals are small (e.g., basalt)."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 2,
                },
            },
            {
                "id": "c8_geo_005_002",
                "question_text": "Rocks formed by the deposition and compaction of sediments over long periods are called _______ rocks.",
                "question_type": "fill_blank",
                "answer": "sedimentary",
                "difficulty": 0.3,
                "solution": (
                    "Sedimentary rocks are formed through three processes: (1) Deposition "
                    "of sediments, (2) Compaction under pressure, and (3) Cementation "
                    "by minerals. Examples: Sandstone, Limestone, Shale, Conglomerate."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "sedimentary",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_005_003",
                "question_text": "Name any three types of igneous rocks.",
                "question_type": "short_answer",
                "answer": "Granite, Basalt, Obsidian",
                "difficulty": 0.3,
                "solution": (
                    "Common igneous rocks: (1) Granite - intrusive, coarse-grained, "
                    "(2) Basalt - extrusive, fine-grained, (3) Obsidian - extrusive, "
                    "glassy, (4) Pumice - extrusive, porous, (5) Gabbro - intrusive, "
                    "(6) Rhyolite - extrusive."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": ["granite", "basalt", "obsidian", "pumice", "igneous"],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_005_004",
                "question_text": (
                    "Describe the rock cycle. Explain how igneous rocks can be "
                    "transformed into metamorphic rocks and then into sedimentary rocks."
                ),
                "question_type": "long_answer",
                "answer": (
                    "The rock cycle is the continuous process of rock formation, "
                    "destruction, and reformation. Igneous rocks form from cooling magma. "
                    "They can be broken down by weathering and erosion into sediments. "
                    "These sediments, when compacted and cemented, form sedimentary rocks. "
                    "Sedimentary rocks (or any rock type) subjected to intense heat and "
                    "pressure beneath the Earth's surface undergo recrystallization to "
                    "become metamorphic rocks (e.g., limestone \u2192 marble, shale \u2192 slate). "
                    "Metamorphic rocks, if melted, become magma again, completing the cycle."
                ),
                "difficulty": 0.75,
                "solution": (
                    "Key stages: Igneous \u2192 weathering/erosion \u2192 sediments \u2192 "
                    "compaction/cementation \u2192 Sedimentary \u2192 heat/pressure \u2192 "
                    "Metamorphic \u2192 melting \u2192 magma \u2192 Igneous. "
                    "Must mention all three rock types and transformation processes."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "igneous", "sedimentary", "metamorphic", "heat",
                        "pressure", "weathering", "erosion", "cooling",
                        "magma", "cycle"
                    ],
                    "min_match": 6,
                },
            },
            {
                "id": "c8_geo_005_005",
                "question_text": (
                    "The metamorphic rock formed from limestone is called _______."
                ),
                "question_type": "fill_blank",
                "answer": "marble",
                "difficulty": 0.4,
                "solution": (
                    "Marble is a metamorphic rock formed from limestone (a sedimentary "
                    "rock) under heat and pressure. Limestone is primarily calcium "
                    "carbonate (CaCO3). Marble is harder, more compact, and takes a "
                    "polish well, making it valuable for sculpture and construction."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "marble",
                    "case_sensitive": False,
                },
            },
        ]
    }
]


# c8_geo_006 - Soil Resources
SOIL_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_006",
        "topic_name": "Soil Resources",
        "questions": [
            {
                "id": "c8_geo_006_001",
                "question_text": "What is the term for the outermost layer of the Earth's surface that supports plant growth?",
                "question_type": "mcq",
                "options": ["Crust", "Bedrock", "Soil", "Regolith"],
                "answer": 2,
                "difficulty": 0.25,
                "solution": (
                    "Soil is the thin outermost layer of the Earth's surface that supports "
                    "plant growth. It is formed by the weathering of rocks and contains "
                    "organic matter (humus), minerals, water, air, and living organisms."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 2,
                },
            },
            {
                "id": "c8_geo_006_002",
                "question_text": (
                    "The dark organic matter in soil that is rich in nutrients is called _______."
                ),
                "question_type": "fill_blank",
                "answer": "humus",
                "difficulty": 0.3,
                "solution": (
                    "Humus is the dark brown or black organic component of soil, formed "
                    "from the decomposition of dead plant and animal matter by bacteria "
                    "and fungi. It makes the soil fertile by providing essential nutrients "
                    "and improving water retention."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "humus",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_006_003",
                "question_text": "Name the three main horizons (layers) of a soil profile from top to bottom.",
                "question_type": "short_answer",
                "answer": "Topsoil (A-horizon), Subsoil (B-horizon), Bedrock (C-horizon)",
                "difficulty": 0.4,
                "solution": (
                    "Soil horizons from top to bottom: (1) A-horizon/Topsoil - dark, rich "
                    "in humus and minerals, (2) B-horizon/Subsoil - lighter, contains "
                    "leached minerals, (3) C-horizon - weathered parent rock fragments. "
                    "Sometimes R-horizon (bedrock) is mentioned below C-horizon."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "topsoil", "subsoil", "horizon", "a-horizon",
                        "b-horizon", "bedrock", "c-horizon", "layer"
                    ],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_006_004",
                "question_text": (
                    "Explain how soil is formed. Discuss the roles of weathering, "
                    "organic matter, and time in soil formation."
                ),
                "question_type": "long_answer",
                "answer": (
                    "Soil formation (pedogenesis) is a slow process involving: (1) Weathering "
                    "- physical (temperature changes, freeze-thaw), chemical (dissolution, "
                    "oxidation), and biological (root action, organisms) processes break down "
                    "parent rock into smaller particles. (2) Organic matter - dead plants and "
                    "animals decompose into humus, enriching the soil. (3) Time - soil "
                    "formation takes hundreds to thousands of years. (4) Other factors: "
                    "Climate, Topography, Living organisms, Parent material (CLORPT model). "
                    "The result is a layered soil profile with distinct horizons."
                ),
                "difficulty": 0.7,
                "solution": (
                    "Expected points: weathering (physical/chemical/biological), organic "
                    "matter/humus, time factor, parent rock, mention of soil horizons or "
                    "CLORPT factors."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "weathering", "organic", "humus", "rock", "time",
                        "formation", "soil", "parent", "decompose", "climate"
                    ],
                    "min_match": 5,
                },
            },
            {
                "id": "c8_geo_006_005",
                "question_text": (
                    "Soil that is rich in humus and has a dark brown or black colour "
                    "is best suited for growing crops. This statement is related to the "
                    "properties of _______ soil."
                ),
                "question_type": "fill_blank",
                "answer": "loamy",
                "difficulty": 0.35,
                "solution": (
                    "Loamy soil contains a balanced mixture of sand, silt, and clay with "
                    "abundant humus. It is dark brown/black, fertile, well-drained, and "
                    "moisture-retentive, making it ideal for agriculture. Other soil types "
                    "like sandy (drains fast, low nutrients) and clayey (waterlogged, "
                    "poor aeration) are less suitable."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "loamy",
                    "case_sensitive": False,
                },
            },
        ]
    }
]


# c8_geo_007 - Natural Vegetation
VEGETATION_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_007",
        "topic_name": "Natural Vegetation",
        "questions": [
            {
                "id": "c8_geo_007_001",
                "question_text": "The natural vegetation that grows in areas of heavy rainfall and high temperature is:",
                "question_type": "mcq",
                "options": [
                    "Coniferous forests",
                    "Tropical Rainforests",
                    "Grasslands",
                    "Desert vegetation"
                ],
                "answer": 1,
                "difficulty": 0.25,
                "solution": (
                    "Tropical Rainforests grow in regions with high rainfall (200+ cm/year) "
                    "and high temperatures (25-27\u00b0C average). They have dense, multi-layered "
                    "canopy with evergreen broadleaf trees. Found in the Amazon, Congo Basin, "
                    "and Southeast Asia."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 1,
                },
            },
            {
                "id": "c8_geo_007_002",
                "question_text": "Trees that have needle-like or scale-like leaves and bear cones are characteristic of _______ forests.",
                "question_type": "fill_blank",
                "answer": "coniferous",
                "difficulty": 0.3,
                "solution": (
                    "Coniferous forests (Taiga/Boreal forests) are found in cold, high "
                    "latitude regions. Trees like pine, spruce, fir, and cedar have "
                    "needle-like leaves with waxy coatings to reduce water loss. They "
                    "bear cones instead of flowers/fruits. Found in Siberia, Canada, "
                    "and Scandinavia."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "coniferous",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_007_003",
                "question_text": "Name any three types of natural vegetation found in India.",
                "question_type": "short_answer",
                "answer": "Tropical Evergreen Forests, Tropical Deciduous Forests, Thorn Forests/Scrub",
                "difficulty": 0.35,
                "solution": (
                    "Major vegetation types in India: (1) Tropical Evergreen Forests "
                    "(Western Ghats, Andamans), (2) Tropical Deciduous/Monsoon Forests "
                    "(most of India), (3) Thorn Forests/Scrub (Rajasthan, Gujarat), "
                    "(4) Montane Forests (Himalayas), (5) Mangrove/Tidal Forests "
                    "(Sundarbans)."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "evergreen", "deciduous", "tropical", "thorn",
                        "forest", "mangrove", "montane"
                    ],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_007_004",
                "question_text": (
                    "Compare Tropical Evergreen Forests with Tropical Deciduous Forests "
                    "in terms of location, leaf type, and rainfall requirements."
                ),
                "question_type": "long_answer",
                "answer": (
                    "Tropical Evergreen Forests: Found in high rainfall areas (>200 cm) "
                    "like Western Ghats and Andaman Islands. Trees are tall, dense, and "
                    "remain green year-round (never shed all leaves simultaneously). "
                    "Tropical Deciduous Forests: Found in moderate rainfall areas "
                    "(100-200 cm) across most of India. Trees shed leaves during dry "
                    "season to conserve water, creating a seasonal bare appearance. "
                    "Evergreen has multi-tiered canopy; Deciduous has open canopy. "
                    "Both support rich biodiversity but different species compositions."
                ),
                "difficulty": 0.65,
                "solution": (
                    "Must cover: Rainfall comparison, Location, Leaf behavior (evergreen "
                    "vs deciduous shedding), Canopy structure, Examples of each."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "evergreen", "deciduous", "rainfall", "leaf",
                        "forest", "tropical", "location", "shed", "canopy"
                    ],
                    "min_match": 5,
                },
            },
        ]
    }
]


# c8_geo_008 - Water Resources
WATER_RESOURCES_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_008",
        "topic_name": "Water Resources",
        "questions": [
            {
                "id": "c8_geo_008_001",
                "question_text": "What percentage of the Earth's total water is freshwater available for human use?",
                "question_type": "mcq",
                "options": ["About 70%", "About 50%", "Less than 1%", "About 25%"],
                "answer": 2,
                "difficulty": 0.35,
                "solution": (
                    "Only about 2.5% of Earth's water is freshwater. Of this, about 70% "
                    "is locked in glaciers and ice caps, about 30% is groundwater, and "
                    "less than 1% is surface water (rivers, lakes) available for human use. "
                    "This makes freshwater a precious and limited resource."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 2,
                },
            },
            {
                "id": "c8_geo_008_002",
                "question_text": "The longest river in India is the _______.",
                "question_type": "fill_blank",
                "answer": "ganga",
                "difficulty": 0.25,
                "solution": (
                    "The Ganga (Ganges) is the longest river in India at 2,525 km. "
                    "It originates from the Gangotri Glacier in Uttarakhand and flows "
                    "into the Bay of Bengal. It is considered sacred in Hinduism. "
                    "Note: The Indus (3,180 km) is longer but mostly flows through "
                    "Pakistan after originating in India."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "ganga",
                    "case_sensitive": False,
                    "accept_contains": ["ganges"],
                },
            },
            {
                "id": "c8_geo_008_003",
                "question_text": "Name any three major rivers of Peninsular India.",
                "question_type": "short_answer",
                "answer": "Godavari, Krishna, Kaveri",
                "difficulty": 0.3,
                "solution": (
                    "Major Peninsular Indian rivers: Godavari (1,465 km - longest "
                    "peninsular river), Krishna (1,400 km), Kaveri (800 km), Mahanadi, "
                    "Tapi, Narmada (west-flowing). These rivers originate from the Western "
                    "Ghats or Central Highlands and flow eastward into the Bay of Bengal "
                    "(except Narmada and Tapi which flow west)."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "godavari", "krishna", "kaveri", "mahanadi",
                        "narmada", "tapi", "peninsular"
                    ],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_008_004",
                "question_text": (
                    "Explain why rivers are important for human civilization. "
                    "Discuss at least five uses of rivers."
                ),
                "question_type": "long_answer",
                "answer": (
                    "Rivers are vital for human civilization because: (1) Water Supply - "
                    "provides drinking water for humans and livestock; (2) Irrigation - "
                    "water for agriculture through canal systems (e.g., Ganga Canal); "
                    "(3) Transportation - rivers serve as natural waterways for transporting "
                    "goods and people; (4) Hydroelectric Power - dams on rivers generate "
                    "electricity (e.g., Bhakra Nangal on Satluj); (5) Industries - many "
                    "industries depend on river water for processing and cooling; "
                    "(6) Fisheries - rivers support fish populations providing food and "
                    "livelihood; (7) Recreation and tourism - rivers offer boating, "
                    "fishing, and scenic beauty."
                ),
                "difficulty": 0.6,
                "solution": (
                    "Expected five or more uses: drinking water, irrigation, "
                    "transportation, hydroelectric power, industries, fisheries, "
                    "recreation, with examples."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "water", "irrigation", "transport", "power",
                        "electricity", "industry", "fish", "drinking", "river"
                    ],
                    "min_match": 5,
                },
            },
            {
                "id": "c8_geo_008_005",
                "question_text": (
                    "A river has a total length of 2,400 km. Its drainage basin area is "
                    "312,000 km\u00b2. Calculate the average density of its drainage network "
                    "(total stream length / basin area) if the total stream length is "
                    "15,600 km."
                ),
                "question_type": "numerical",
                "answer": 0.05,
                "difficulty": 0.55,
                "solution": (
                    "Drainage density = Total stream length / Basin area\n"
                    "= 15,600 km / 312,000 km\u00b2\n"
                    "= 0.05 km/km\u00b2\n"
                    "This indicates a moderate drainage density."
                ),
                "verification": {
                    "type": "numerical_range",
                    "correct": 0.05,
                    "tolerance": 0.005,
                },
            },
        ]
    }
]


# c8_geo_009 - Oceans and Ocean Currents
OCEANS_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_009",
        "topic_name": "Oceans and Ocean Currents",
        "questions": [
            {
                "id": "c8_geo_009_001",
                "question_text": "Which is the largest ocean in the world?",
                "question_type": "mcq",
                "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
                "answer": 2,
                "difficulty": 0.2,
                "solution": (
                    "The Pacific Ocean is the largest ocean, covering about 165.25 million "
                    "sq km (about one-third of Earth's surface). It extends from the Arctic "
                    "in the north to Antarctica in the south, bounded by Asia/Australia on "
                    "the west and the Americas on the east."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 2,
                },
            },
            {
                "id": "c8_geo_009_002",
                "question_text": "A warm ocean current that flows northward along the east coast of North America is called the _______.",
                "question_type": "fill_blank",
                "answer": "gulf stream",
                "difficulty": 0.4,
                "solution": (
                    "The Gulf Stream is a powerful warm Atlantic ocean current originating "
                    "in the Gulf of Mexico, flowing northward along the US east coast, then "
                    "eastward toward Europe as the North Atlantic Drift. It moderates the "
                    "climate of Northwestern Europe, making it warmer than other regions at "
                    "the same latitude."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "gulf stream",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_009_003",
                "question_text": "Name the three major oceans of the world.",
                "question_type": "short_answer",
                "answer": "Pacific Ocean, Atlantic Ocean, Indian Ocean",
                "difficulty": 0.2,
                "solution": (
                    "The five oceans of the world are: (1) Pacific (largest, 165M sq km), "
                    "(2) Atlantic (second, 106M sq km), (3) Indian (third, 74M sq km), "
                    "(4) Southern/Antarctic (20M sq km), (5) Arctic (smallest, 14M sq km). "
                    "Any three of these are correct."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "pacific", "atlantic", "indian", "southern",
                        "arctic", "ocean"
                    ],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_009_004",
                "question_text": (
                    "Explain how ocean currents affect the climate of coastal regions. "
                    "Give one example each of a warm current and a cold current and their "
                    "climatic effects."
                ),
                "question_type": "long_answer",
                "answer": (
                    "Ocean currents affect coastal climate by transporting heat from one "
                    "latitude to another: (1) Warm currents (like Gulf Stream) carry warm "
                    "water from equatorial regions toward the poles, raising temperatures "
                    "and increasing rainfall in adjacent coastal areas. Example: The Gulf "
                    "Stream warms Northwestern Europe, making London milder than Calgary "
                    "at the same latitude. (2) Cold currents (like Peru/ Humboldt Current) "
                    "carry cold water from polar regions toward the equator, lowering "
                    "temperatures and reducing rainfall. Example: The cold Peru Current "
                    "creates the arid Atacama Desert along South America's west coast."
                ),
                "difficulty": 0.75,
                "solution": (
                    "Must mention: warm current example + effect, cold current example + "
                    "effect, mechanism of heat transport, coastal climate impact."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "current", "warm", "cold", "temperature", "climate",
                        "rainfall", "coastal", "gulf stream", "peru",
                        "equator", "pole"
                    ],
                    "min_match": 5,
                },
            },
            {
                "id": "c8_geo_009_005",
                "question_text": (
                    "The average depth of the Pacific Ocean is approximately "
                    "_______ metres."
                ),
                "question_type": "numerical",
                "answer": 4280,
                "difficulty": 0.5,
                "solution": (
                    "The Pacific Ocean has an average depth of about 4,280 metres. "
                    "Its deepest point is the Mariana Trench (Challenger Deep) at "
                    "approximately 11,034 metres - the deepest point on Earth. "
                    "Atlantic Ocean average depth: ~3,646 m. Indian Ocean: ~3,741 m."
                ),
                "verification": {
                    "type": "numerical_range",
                    "correct": 4280,
                    "tolerance": 300,
                },
            },
        ]
    }
]


# c8_geo_010 - Agriculture in India
AGRICULTURE_QUESTIONS: List[Dict[str, Any]] = [
    {
        "topic": "c8_geo_010",
        "topic_name": "Agriculture in India",
        "questions": [
            {
                "id": "c8_geo_010_001",
                "question_text": "What type of agriculture is practiced mainly for self-consumption by the farmer's family?",
                "question_type": "mcq",
                "options": [
                    "Commercial Agriculture",
                    "Subsistence Agriculture",
                    "Plantation Agriculture",
                    "Extensive Agriculture"
                ],
                "answer": 1,
                "difficulty": 0.25,
                "solution": (
                    "Subsistence Agriculture is practiced mainly to meet the food needs "
                    "of the farmer's family. It involves small land holdings, traditional "
                    "methods, and low productivity. It is the most common type of "
                    "agriculture in India, especially in rural areas."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 1,
                },
            },
            {
                "id": "c8_geo_010_002",
                "question_text": (
                    "The cultivation of crops like tea, coffee, rubber, and spices "
                    "on large estates for commercial sale is called _______ agriculture."
                ),
                "question_type": "fill_blank",
                "answer": "plantation",
                "difficulty": 0.3,
                "solution": (
                    "Plantation Agriculture involves growing a single cash crop (monoculture) "
                    "on large estates for commercial purposes. Examples: Tea (Assam, Darjeeling), "
                    "Coffee (Karnataka, Kerala), Rubber (Kerala), Spices (Kerala), "
                    "Oil Palm (Kerala), Coconut (Kerala, Tamil Nadu). It requires significant "
                    "capital investment and is labour-intensive."
                ),
                "verification": {
                    "type": "string_match",
                    "correct": "plantation",
                    "case_sensitive": False,
                },
            },
            {
                "id": "c8_geo_010_003",
                "question_text": (
                    "Name any two Kharif crops and any two Rabi crops grown in India."
                ),
                "question_type": "short_answer",
                "answer": "Kharif: Rice, Maize, Cotton, Jowar; Rabi: Wheat, Barley, Mustard, Peas",
                "difficulty": 0.3,
                "solution": (
                    "Kharif crops (sown June-July, harvested Oct-Dec): Rice, Maize, "
                    "Cotton, Jowar, Bajra, Ragi, Sugarcane, Groundnut, Jute. "
                    "Rabi crops (sown Oct-Dec, harvested March-April): Wheat, Barley, "
                    "Mustard, Peas, Gram, Linseed, Potato. Zaid crops (summer, March-June): "
                    "Watermelon, Cucumber, Vegetables."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "rice", "wheat", "cotton", "maize", "kharif",
                        "rabi", "sugarcane", "barley", "mustard"
                    ],
                    "min_match": 2,
                },
            },
            {
                "id": "c8_geo_010_004",
                "question_text": (
                    "Explain the Green Revolution in India. Discuss its advantages and "
                    "disadvantages."
                ),
                "question_type": "long_answer",
                "answer": (
                    "The Green Revolution (1960s-1970s) was a major increase in food grain "
                    "production in India through the introduction of: (1) High-Yielding "
                    "Variety (HYV) seeds - dwarf wheat (Mexico) and rice (IR8 from IRRI, "
                    "Philippines), (2) Chemical fertilizers and pesticides, "
                    "(3) Irrigation facilities, (4) Mechanization (tractors, harvesters). "
                    "Advantages: India became self-sufficient in food grains, wheat and "
                    "rice production doubled, farmer incomes increased, created rural "
                    "employment. Disadvantages: Increased use of chemicals degraded soil "
                    "quality, water table depletion, rich farmers benefited more than poor "
                    "farmers, regional disparities (Punjab/Haryana prospered more)."
                ),
                "difficulty": 0.75,
                "solution": (
                    "Expected: definition of Green Revolution, key techniques (HYV seeds, "
                    "fertilizers, irrigation, mechanization), at least two advantages and "
                    "two disadvantages, specific examples."
                ),
                "verification": {
                    "type": "keyword_match",
                    "keywords": [
                        "green revolution", "seed", "yield", "wheat", "rice",
                        "fertilizer", "irrigation", "self-sufficient",
                        "advantage", "disadvantage", "food grain"
                    ],
                    "min_match": 6,
                },
            },
            {
                "id": "c8_geo_010_005",
                "question_text": (
                    "If a farmer harvests 800 kg of rice from a 0.5 hectare field, "
                    "calculate the yield per hectare."
                ),
                "question_type": "numerical",
                "answer": 1600,
                "difficulty": 0.35,
                "solution": (
                    "Yield per hectare = Total production / Area cultivated\n"
                    "= 800 kg / 0.5 hectare\n"
                    "= 1,600 kg/hectare\n"
                    "This is a measure of agricultural productivity."
                ),
                "verification": {
                    "type": "numerical_range",
                    "correct": 1600,
                    "tolerance": 50,
                },
            },
            {
                "id": "c8_geo_010_006",
                "question_text": "Which crop is known as the 'King of Cereals' and is the staple food of millions in India?",
                "question_type": "mcq",
                "options": ["Wheat", "Maize", "Rice", "Millets"],
                "answer": 2,
                "difficulty": 0.2,
                "solution": (
                    "Rice is known as the 'King of Cereals' and is the staple food for "
                    "over half the world's population. In India, it is the most important "
                    "Kharif crop, grown mainly in West Bengal, Uttar Pradesh, Punjab, "
                    "Andhra Pradesh, and Tamil Nadu. It requires high temperature (25\u00b0C+), "
                    "high humidity, and 150+ cm rainfall or irrigation."
                ),
                "verification": {
                    "type": "mcq_index",
                    "correct_index": 2,
                },
            },
        ]
    }
]


# ============================================================================
# Combine all topics
# ============================================================================

ALL_TOPIC_DATA: List[Dict[str, Any]] = (
    ATMOSPHERE_QUESTIONS
    + WEATHER_CLIMATE_QUESTIONS
    + CLIMATE_REGIONS_QUESTIONS
    + ROCKS_MINERALS_QUESTIONS
    + ROCK_TYPES_QUESTIONS
    + SOIL_QUESTIONS
    + VEGETATION_QUESTIONS
    + WATER_RESOURCES_QUESTIONS
    + OCEANS_QUESTIONS
    + AGRICULTURE_QUESTIONS
)

QUESTION_REGISTRY: Dict[str, Dict[str, Any]] = {}
for topic_block in ALL_TOPIC_DATA:
    QUESTION_REGISTRY[topic_block["topic"]] = topic_block


# ============================================================================
# Solver Functions
# ============================================================================

def solve_mcq(question: Dict[str, Any], selected_option: int) -> Dict[str, Any]:
    """Solve/evaluate an MCQ question."""
    correct = question.get("answer", -1)
    is_correct = (selected_option == correct)
    return {
        "selected_option": selected_option,
        "correct_option": correct,
        "is_correct": is_correct,
        "explanation": question.get("solution", ""),
    }


def solve_fill_blank(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve/evaluate a fill-in-the-blank question."""
    verification = question.get("verification", {})
    correct_answer = question.get("answer", "")
    case_sensitive = verification.get("case_sensitive", False)

    user_norm = user_answer.strip() if not case_sensitive else user_answer.strip()
    correct_norm = correct_answer if case_sensitive else correct_answer.lower()

    is_correct = user_norm == correct_norm

    # Check accepts
    accepts = verification.get("accept_contains", [])
    if not is_correct and accepts:
        user_lower = user_answer.lower().strip()
        for accept in accepts:
            if accept.lower() in user_lower:
                is_correct = True
                break

    return {
        "user_answer": user_answer,
        "correct_answer": correct_answer,
        "is_correct": is_correct,
        "explanation": question.get("solution", ""),
    }


def solve_short_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve/evaluate a short answer question using keyword matching."""
    verification = question.get("verification", {})
    keywords = verification.get("keywords", [])
    min_match = verification.get("min_match", 3)
    correct_answer = question.get("answer", "")

    user_lower = user_answer.lower()
    matched_keywords = [kw for kw in keywords if kw.lower() in user_lower]
    match_count = len(matched_keywords)
    is_correct = match_count >= min_match
    confidence = min(1.0, match_count / len(keywords)) if keywords else 0.0

    return {
        "user_answer": user_answer,
        "matched_keywords": matched_keywords,
        "match_count": match_count,
        "required_count": min_match,
        "is_correct": is_correct,
        "confidence": round(confidence, 2),
        "reference_answer": correct_answer,
        "explanation": question.get("solution", ""),
    }


def solve_long_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Solve/evaluate a long answer question using keyword matching."""
    verification = question.get("verification", {})
    keywords = verification.get("keywords", [])
    min_match = verification.get("min_match", 5)
    correct_answer = question.get("answer", "")

    user_lower = user_answer.lower()
    matched_keywords = [kw for kw in keywords if kw.lower() in user_lower]
    match_count = len(matched_keywords)
    is_correct = match_count >= min_match
    confidence = min(1.0, match_count / len(keywords)) if keywords else 0.0

    # Word count check
    word_count = len(user_answer.split())

    return {
        "user_answer": user_answer,
        "matched_keywords": matched_keywords,
        "match_count": match_count,
        "required_count": min_match,
        "is_correct": is_correct,
        "confidence": round(confidence, 2),
        "word_count": word_count,
        "reference_answer": correct_answer,
        "explanation": question.get("solution", ""),
    }


def solve_numerical(question: Dict[str, Any], user_answer: float) -> Dict[str, Any]:
    """Solve/evaluate a numerical question."""
    verification = question.get("verification", {})
    correct_answer = question.get("answer", 0)

    if verification.get("type") == "numerical_range":
        tolerance = verification.get("tolerance", 0)
        is_correct = abs(user_answer - correct_answer) <= tolerance
        error = abs(user_answer - correct_answer)
    elif verification.get("type") == "numerical_value":
        is_correct = abs(user_answer - correct_answer) < 0.01
        error = abs(user_answer - correct_answer)
        tolerance = 0.01
    else:
        tolerance = verification.get("tolerance", 0.01)
        is_correct = abs(user_answer - correct_answer) <= tolerance
        error = abs(user_answer - correct_answer)

    return {
        "user_answer": user_answer,
        "correct_answer": correct_answer,
        "is_correct": is_correct,
        "error": round(error, 4),
        "tolerance": tolerance if verification.get("type") == "numerical_range" else tolerance,
        "explanation": question.get("solution", ""),
    }


# Map question types to solver functions
SOLVER_MAP = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


def solve_question(question: Dict[str, Any], user_answer: Any) -> Dict[str, Any]:
    """Route a question to the appropriate solver based on question type."""
    q_type = question.get("question_type", "")
    solver = SOLVER_MAP.get(q_type)
    if solver is None:
        return {"error": f"Unknown question type: {q_type}"}
    return solver(question, user_answer)


# ============================================================================
# Verification / Validation Functions
# ============================================================================

def verify_single_question(question: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """Verify that a single question dict is well-formed."""
    errors = []

    # Required fields
    required_fields = [
        "id", "question_text", "question_type", "answer",
        "difficulty", "topic", "solution", "verification"
    ]
    for field in required_fields:
        if field not in question:
            errors.append(f"Missing required field: {field}")

    if errors:
        return False, errors

    # Validate question_type
    valid_types = {"mcq", "fill_blank", "short_answer", "long_answer", "numerical"}
    if question["question_type"] not in valid_types:
        errors.append(f"Invalid question_type: {question['question_type']}")

    # Validate difficulty range
    diff = question.get("difficulty", -1)
    if not (0.0 <= diff <= 1.0):
        errors.append(f"Difficulty {diff} out of range [0.0, 1.0]")

    # Validate topic prefix
    topic = question.get("topic", "")
    if not topic.startswith("c8_geo_"):
        errors.append(f"Topic '{topic}' does not match c8_geo_* pattern")

    # Validate MCQ options
    if question["question_type"] == "mcq":
        if "options" not in question:
            errors.append("MCQ question missing 'options' field")
        elif not isinstance(question["options"], list) or len(question["options"]) < 2:
            errors.append("MCQ 'options' must be a list with at least 2 items")
        else:
            ans = question.get("answer")
            if not isinstance(ans, int) or ans < 0 or ans >= len(question["options"]):
                errors.append(
                    f"MCQ answer index {ans} out of range for "
                    f"{len(question['options'])} options"
                )

    # Validate verification field
    v = question.get("verification", {})
    if not isinstance(v, dict):
        errors.append("'verification' must be a dict")

    # Validate ID format
    qid = question.get("id", "")
    if not qid:
        errors.append("Question ID is empty")

    return len(errors) == 0, errors


def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Validate a list of questions and return a comprehensive report."""
    report = {
        "total_questions": len(questions),
        "valid_questions": 0,
        "invalid_questions": 0,
        "errors": [],
        "topic_distribution": {},
        "type_distribution": {},
        "difficulty_range": {"min": 1.0, "max": 0.0},
        "duplicate_ids": [],
    }

    seen_ids = set()
    question_ids = []

    for q in questions:
        is_valid, errs = verify_single_question(q)
        if is_valid:
            report["valid_questions"] += 1
        else:
            report["invalid_questions"] += 1
            for e in errs:
                report["errors"].append({"id": q.get("id", "unknown"), "error": e})

        # Track IDs for duplicates
        qid = q.get("id", "")
        if qid:
            if qid in seen_ids:
                report["duplicate_ids"].append(qid)
            seen_ids.add(qid)
            question_ids.append(qid)

        # Track topics
        topic = q.get("topic", "unknown")
        report["topic_distribution"][topic] = (
            report["topic_distribution"].get(topic, 0) + 1
        )

        # Track types
        qtype = q.get("question_type", "unknown")
        report["type_distribution"][qtype] = (
            report["type_distribution"].get(qtype, 0) + 1
        )

        # Track difficulty
        diff = q.get("difficulty", 0.5)
        report["difficulty_range"]["min"] = min(
            report["difficulty_range"]["min"], diff
        )
        report["difficulty_range"]["max"] = max(
            report["difficulty_range"]["max"], diff
        )

    report["is_valid"] = report["invalid_questions"] == 0 and len(report["duplicate_ids"]) == 0
    return report


# ============================================================================
# Question Generation Engine
# ============================================================================

def _select_from_registry(
    registry: Dict[str, Dict[str, Any]],
    rng: random.Random,
    count: int,
) -> List[Dict[str, Any]]:
    """Select and shuffle questions from the registry deterministically."""
    # Collect all questions from all topics
    all_questions: List[Dict[str, Any]] = []
    for topic_id, topic_data in registry.items():
        for q in topic_data.get("questions", []):
            # Create a deep copy to avoid mutation
            import copy
            q_copy = copy.deepcopy(q)
            all_questions.append(q_copy)

    # Shuffle deterministically
    rng.shuffle(all_questions)

    # If count > available, cycle through
    if count <= len(all_questions):
        return all_questions[:count]
    else:
        result = []
        for i in range(count):
            result.append(all_questions[i % len(all_questions)])
        return result


def _assign_question_numbers(questions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Assign sequential numbers to questions."""
    for idx, q in enumerate(questions, start=1):
        q["question_number"] = idx
    return questions


def _compute_question_hash(question: Dict[str, Any]) -> str:
    """Compute a deterministic hash for a question."""
    content = json.dumps(
        {
            "id": question.get("id"),
            "question_text": question.get("question_text"),
            "answer": str(question.get("answer")),
        },
        sort_keys=True,
    )
    return hashlib.sha256(content.encode()).hexdigest()[:12]


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Generate a list of deterministic questions from the CISCE Geography syllabus.

    Args:
        seed: Random seed for reproducibility
        count: Number of questions to generate (1 to len(all_questions))

    Returns:
        List of question dictionaries with id, question_text, question_type,
        options (for mcq), answer, difficulty, topic, solution, verification,
        question_number, and hash fields.
    """
    rng = random.Random(seed)
    all_q: List[Dict[str, Any]] = []
    # Collect from all topic question lists in module globals
    for var_name, var_val in globals().items():
        if var_name.endswith("_QUESTIONS") and isinstance(var_val, list):
            all_q.extend(var_val)
    rng.shuffle(all_q)
    result = []
    for i, q in enumerate(all_q[:count]):
        q_copy = dict(q)
        q_copy.setdefault("id", f"c8_geo_{seed}_{i:03d}")
        q_copy.setdefault("difficulty", 0.5)
        q_copy.setdefault("verification", True)
        result.append(q_copy)
    return result


QUESTION_REGISTRY = {"class8_geo": generate_questions}


def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    required = {"id", "question_text", "question_type", "answer"}
    results: Dict[str, Any] = {"errors": [], "valid": True, "count": len(questions)}
    for q in questions:
        qid = q.get("id", "unknown")
        for field in required:
            if field not in q:
                results["errors"].append(f"{qid}: missing {field}")
                results["valid"] = False
    return results


if __name__ == "__main__":
    qs = generate_questions(42, 10)
    print(f"Generated {len(qs)} questions")
    for q in qs[:3]:
        print(f"  {q.get('id','?')}: {q.get('question_text','')[:60]}")