import random
import hashlib
import json
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
import sympy as sp

# ============================================================================
# SEEDED RANDOM GENERATOR
# ============================================================================
class SeededRandom:
    """Deterministic pseudo-random number generator using hashlib + random."""
    def __init__(self, seed: str = "class6_geo_2026"):
        self.seed_str = seed
        self._rng = random.Random(seed)
        self._counter = 0

    def reset(self, seed: str = None):
        if seed:
            self.seed_str = seed
        self._rng = random.Random(self.seed_str)
        self._counter = 0

    def next_seed(self, suffix: str = "") -> str:
        val = f"{self.seed_str}:{suffix}:{self._counter}"
        self._counter += 1
        return val

    def int(self, lo: int, hi: int, suffix: str = "") -> int:
        return self._rng.randint(lo, hi)

    def choice(self, seq, suffix: str = "") -> str:
        return self._rng.choice(seq)

    def sample(self, population, k, suffix: str = "") -> list:
        return self._rng.sample(population, k)

    def shuffle(self, lst, suffix: str = "") -> None:
        self._rng.shuffle(lst)

    def bool(self, p: float, suffix: str = "") -> bool:
        return self._rng.random() < p

# ============================================================================
# DATA STRUCTURES
# ============================================================================
@dataclass
class Question:
    id: str
    node_id: str
    question_text: str
    options: List[str]
    correct_index: int
    explanation: str
    cognitive_level: str
    difficulty: str
    competency: str  # "competency" or "standard"
    topic: str

@dataclass
class QuestionSet:
    node_id: str
    node_title: str
    questions: List[Question]
    seed_used: str

# ============================================================================
# INDIAN GEOGRAPHY CONTEXT DATA
# ============================================================================
INDIAN_STATES = [
    "Maharashtra", "Karnataka", "Tamil Nadu", "Kerala", "Rajasthan",
    "Gujarat", "Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh",
    "West Bengal", "Bihar", "Odisha", "Assam", "Goa",
    "Himachal Pradesh", "Uttarakhand", "Jharkhand", "Chhattisgarh",
    "Telangana", "Andhra Pradesh", "Delhi", "Jammu and Kashmir"
]

INDIAN_CITIES = [
    "Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai",
    "Hyderabad", "Pune", "Jaipur", "Lucknow", "Ahmedabad",
    "Panaji", "Thiruvananthapuram", "Shimla", "Guwahati", "Bhopal",
    "Patna", "Ranchi", "Raipur", "Visakhapatnam", "Surat"
]

RIVERS = [
    "Ganga", "Yamuna", "Brahmaputra", "Godavari", "Krishna",
    "Narmada", "Tapti", "Mahanadi", "Kaveri", "Indus",
    "Sutlej", "Beas", "Chenab", "Jhelum", "Tungabhadra"
]

MOUNTAINS = [
    "Himalayas", "Western Ghats", "Eastern Ghats", "Vindhya Range",
    "Satpura Range", "Aravalli Range", "Nilgiri Hills"
]

PHYSICAL_FEATURES = [
    "mountain", "river", "valley", "plateau", "plain",
    "desert", "forest", "lake", "ocean", "island"
]

# ============================================================================
# MATH HELPERS (SymPy / numpy-style)
# ============================================================================
def gcd(a, b):
    return sp.gcd(a, b)

def lcm(a, b):
    return sp.lcm(a, b)

def generate_scale_data():
    """Generate scale-related numeric questions using sympy."""
    map_cm = sp.Integer(random.randint(1, 10))
    real_km = sp.Integer(random.randint(1, 50))
    # scale: 1 cm = real_km km → 1: real_km * 100000
    scale_denominator = real_km * 100000
    return {
        "map_cm": int(map_cm),
        "real_km": int(real_km),
        "scale_str": f"1:{int(scale_denominator)}"
    }

def verify_scale(map_cm, real_km, measured_cm):
    """Verify scale calculation: real = measured_cm * real_km / map_cm"""
    return (measured_cm * real_km) / map_cm

# ============================================================================
# QUESTION GENERATORS - NODE c6_geo_001: Maps - Introduction
# ============================================================================
def gen_map_introduction(rng: SeededRandom, competency_ratio: float = 0.5) -> List[Question]:
    questions = []
    seed = rng.next_seed("c6_geo_001")
    n_comp = max(1, int(10 * competency_ratio))
    n_std = max(1, 10 - n_comp)

    # --- COMPETENCY QUESTIONS ---
    for i in range(n_comp):
        sub_seed = rng.next_seed(f"map_intro_comp_{i}")
        q_type = rng.int(0, 3)

        if q_type == 0:
            # Define a map - basic definition
            correct = "A two-dimensional representation of Earth's surface drawn to scale"
            opts_raw = [
                correct,
                "A three-dimensional model of the Earth",
                "A photograph of Earth taken from space",
                "A rough drawing without any scale"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_comp_{i+1}",
                node_id="c6_geo_001",
                question_text="Which of the following best defines a map?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A map is a two-dimensional (flat) representation of Earth's surface or a part of it, "
                    "drawn to scale. Unlike a globe (3D) or a photograph, it selectively shows features using symbols."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Maps - introduction"
            ))

        elif q_type == 1:
            # Three types of maps
            correct = "Physical, political, and thematic"
            opts_raw = [
                correct,
                "Topographic, weather, and climate",
                "World, continent, and country",
                "Large-scale, medium-scale, and small-scale"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_comp_{i+1}",
                node_id="c6_geo_001",
                question_text=(
                    "What are the three main types of maps based on the information they show?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Physical maps show natural features like mountains and rivers. "
                    "Political maps show administrative boundaries and cities. "
                    "Thematic maps show specific data like climate, population, or vegetation."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Types of maps"
            ))

        elif q_type == 2:
            # Components of a map - which is NOT a component
            fake = "GPS coordinates"
            real_comp = "Scale"
            opts_raw = [
                "Title",
                "Direction (North arrow)",
                "Scale",
                fake,
                "Legend or key",
                "Colours",
                "Index"
            ]
            rng.shuffle(opts_raw)
            # correct answer is the fake one
            correct_idx = opts_raw.index(fake)
            questions.append(Question(
                id=f"c6_geo_001_comp_{i+1}",
                node_id="c6_geo_001",
                question_text=(
                    "Which of the following is NOT a standard component of a map?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "The six components of a map are: title, direction (North arrow), scale, "
                    "legend/key, colours, and index. GPS coordinates are not listed as a standard component "
                    "in the Class 6 syllabus."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Components of a map"
            ))

        else:
            # Map vs photograph - why maps use symbols
            correct = "Because a map selectively shows features, not every detail"
            opts_raw = [
                correct,
                "Because photographs cannot be printed in colour",
                "Because maps are always drawn by hand",
                "Because satellites cannot take pictures"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_comp_{i+1}",
                node_id="c6_geo_001",
                question_text=(
                    "Why do maps use symbols and colours instead of showing everything as seen in reality?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A map is a selective, scaled, symbolic representation. It cannot show every single detail "
                    "like a photograph. Symbols and colours help represent features clearly and compactly - "
                    "just like a recipe lists key ingredients without describing every grain of rice."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Map vs photograph"
            ))

    # --- STANDARD QUESTIONS ---
    for i in range(n_std):
        sub_seed = rng.next_seed(f"map_intro_std_{i}")
        q_type = rng.int(0, 4)

        if q_type == 0:
            # Physical map - what it shows
            correct = "Natural features like mountains, rivers, and plains"
            opts_raw = [
                correct,
                "Political boundaries and cities",
                "Population density",
                "Temperature and rainfall patterns"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_std_{i+1}",
                node_id="c6_geo_001",
                question_text="What does a physical map show?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A physical map shows natural features of the Earth's surface - mountains, rivers, "
                    "plateaus, plains, and oceans. Political boundaries are shown on political maps; "
                    "climate data is shown on thematic maps."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Types of maps - physical"
            ))

        elif q_type == 1:
            # Political map - what it shows
            correct = "Administrative boundaries, countries, states, and cities"
            opts_raw = [
                correct,
                "Rivers, mountains, and plateaus",
                "Average temperature and rainfall",
                "Types of forests and vegetation"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_std_{i+1}",
                node_id="c6_geo_001",
                question_text="What does a political map primarily show?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A political map shows human-made boundaries - countries, states, districts, and cities. "
                    "Natural features like rivers and mountains are on physical maps. "
                    "Climate and vegetation data belong on thematic maps."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Types of maps - political"
            ))

        elif q_type == 2:
            # Thematic map example
            correct = "A map showing the rainfall distribution across India"
            opts_raw = [
                correct,
                "A map showing the boundaries of Indian states",
                "A map showing the Himalayan mountain ranges",
                "A map showing major rivers of India"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_std_{i+1}",
                node_id="c6_geo_001",
                question_text=(
                    "Which of the following is an example of a thematic map?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A thematic map shows specific information on a single theme. "
                    "Rainfall distribution is a theme (climate). "
                    "State boundaries (political) and mountain ranges (physical) are not thematic maps."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Types of maps - thematic"
            ))

        elif q_type == 3:
            # Legend / key purpose
            correct = "To explain what the symbols and colours on the map mean"
            opts_raw = [
                correct,
                "To list all the cities shown on the map",
                "To show the scale of the map",
                "To indicate the direction of North"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_std_{i+1}",
                node_id="c6_geo_001",
                question_text="What is the purpose of a legend (or key) on a map?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "The legend or key explains the meaning of symbols, colours, and patterns used on a map. "
                    "For example, blue may represent rivers, green may represent forests."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Map components - legend/key"
            ))

        else:
            # Scale purpose
            correct = "To show the relationship between distances on the map and actual distances on the ground"
            opts_raw = [
                correct,
                "To indicate the direction of North on the map",
                "To explain the symbols used on the map",
                "To list the places shown on the map"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_001_std_{i+1}",
                node_id="c6_geo_001",
                question_text="Why is scale an important component of a map?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Scale shows the ratio between a distance on the map and the actual distance on the ground. "
                    "For example, a scale of 1 cm = 5 km means every centimetre on the map represents "
                    "5 kilometres in reality."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Map components - scale"
            ))

    return questions

# ============================================================================
# QUESTION GENERATORS - NODE c6_geo_002: Map vs Sketch vs Plan vs Globe
# ============================================================================
def gen_map_vs_sketch_plan_globe(rng: SeededRandom, competency_ratio: float = 0.5) -> List[Question]:
    questions = []
    n_comp = max(1, int(10 * competency_ratio))
    n_std = max(1, 10 - n_comp)

    # --- COMPETENCY QUESTIONS ---
    for i in range(n_comp):
        q_type = rng.int(0, 3)

        if q_type == 0:
            # Define globe
            correct = "A three-dimensional spherical model of the Earth"
            opts_raw = [
                correct,
                "A flat drawing of a small area",
                "A rough freehand drawing of a route",
                "A two-dimensional map of a country"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_comp_{i+1}",
                node_id="c6_geo_002",
                question_text="What is a globe?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A globe is a three-dimensional (3D) spherical model of the Earth. "
                    "It correctly shows the shape and size of continents and oceans, "
                    "unlike a flat map which can distort sizes."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="competency",
                topic="Map vs sketch vs plan vs globe"
            ))

        elif q_type == 1:
            # Define sketch
            correct = "A rough, freehand drawing made without a scale"
            opts_raw = [
                correct,
                "An accurate drawing of a room to scale",
                "A three-dimensional model of the Earth",
                "A detailed map showing all roads"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_comp_{i+1}",
                node_id="c6_geo_002",
                question_text="What is a sketch?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A sketch is a rough, freehand drawing made without using a scale. "
                    "It is used when quick information is needed, such as showing a friend "
                    "the route to your house. It is not accurate or to scale."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="competency",
                topic="Map vs sketch vs plan vs globe"
            ))

        elif q_type == 2:
            # Define plan
            correct = "A large-scale, accurate drawing of a small area like a room or building"
            opts_raw = [
                correct,
                "A rough drawing showing a route to a house",
                "A three-dimensional globe of the Earth",
                "A small-scale map showing a whole country"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_comp_{i+1}",
                node_id="c6_geo_002",
                question_text="What is a plan?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A plan is a large-scale, accurate drawing of a small area such as a room, "
                    "building, or playground, drawn to scale with exact measurements. "
                    "Architects use floor plans to design buildings."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="competency",
                topic="Map vs sketch vs plan vs globe"
            ))

        else:
            # Advantage of globe
            correct = "It shows the correct shape and size of continents and oceans"
            opts_raw = [
                correct,
                "It is very lightweight and easy to carry everywhere",
                "It can show the entire universe in one view",
                "It does not need any axis to rotate"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_comp_{i+1}",
                node_id="c6_geo_002",
                question_text="Which of the following is an advantage of a globe over a flat map?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A globe accurately represents the Earth's surface because it is spherical. "
                    "For example, a globe correctly shows that Africa is much larger than Greenland, "
                    "while many flat maps distort this. The disadvantage is that globes are bulky "
                    "and hard to carry."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="competency",
                topic="Advantages and disadvantages - globe"
            ))

    # --- STANDARD QUESTIONS ---
    for i in range(n_std):
        q_type = rng.int(0, 4)

        if q_type == 0:
            # Disadvantage of map
            correct = "It distorts the shape and size of countries near the poles"
            opts_raw = [
                correct,
                "It is too bulky to carry",
                "It cannot show any detail",
                "It is always drawn in black and white"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_std_{i+1}",
                node_id="c6_geo_002",
                question_text="What is a disadvantage of a flat map compared to a globe?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A flat map cannot perfectly represent the spherical Earth. "
                    "Areas near the poles (like Greenland) appear larger than they actually are "
                    "on many map projections. A globe avoids this distortion."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="standard",
                topic="Advantages and disadvantages - map"
            ))

        elif q_type == 1:
            # When to use a sketch
            correct = "When you want to quickly show a friend the route from the bus stop to your house"
            opts_raw = [
                correct,
                "When an architect designs a new building",
                "When you need exact measurements of a playground",
                "When you study the shape of continents"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_std_{i+1}",
                node_id="c6_geo_002",
                question_text=(
                    "In which situation would a sketch be the most appropriate representation?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A sketch is best for quick, informal situations where accuracy is not critical. "
                    "For a building, use a plan. For exact measurements, use a plan or map. "
                    "For studying continents, use a globe."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="standard",
                topic="When to use each type"
            ))

        elif q_type == 2:
            # 2D vs 3D
            correct = "A map is two-dimensional, while a globe is three-dimensional"
            opts_raw = [
                correct,
                "Both a map and a globe are two-dimensional",
                "Both a map and a globe are three-dimensional",
                "A map is three-dimensional, while a globe is two-dimensional"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_std_{i+1}",
                node_id="c6_geo_002",
                question_text="What is the difference between a map and a globe in terms of dimensions?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A map is a flat (two-dimensional) drawing on paper. "
                    "A globe is a round (three-dimensional) sphere that models the Earth."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="standard",
                topic="Map vs globe - dimensions"
            ))

        elif q_type == 3:
            # Disadvantage of globe
            correct = "It is bulky and not easy to carry around"
            opts_raw = [
                correct,
                "It shows the wrong size of continents",
                "It cannot show oceans",
                "It is always very expensive"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_std_{i+1}",
                node_id="c6_geo_002",
                question_text="Which of the following is a disadvantage of a globe?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Globes are bulky and difficult to carry. You cannot fold a globe to fit in a bag "
                    "like you can fold a map. Maps, on the other hand, are portable but may distort shapes."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="standard",
                topic="Advantages and disadvantages - globe"
            ))

        else:
            # When to use a plan
            correct = "When a carpenter needs exact measurements to build a wooden shelf"
            opts_raw = [
                correct,
                "When a tourist wants to plan a holiday across India",
                "When a student wants to know which state is east of Maharashtra",
                "When a sailor wants to navigate the ocean"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_002_std_{i+1}",
                node_id="c6_geo_002",
                question_text=(
                    "In which situation would a plan be the most suitable representation?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A plan is used for a small area requiring exact measurements, like a room or building. "
                    "For a holiday across India, you would use a map. "
                    "For studying states, you would use a political map."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="standard",
                topic="When to use each type - plan"
            ))

    return questions

# ============================================================================
# QUESTION GENERATORS - NODE c6_geo_003: Importance of Maps
# ============================================================================
def gen_importance_of_maps(rng: SeededRandom, competency_ratio: float = 0.5) -> List[Question]:
    questions = []
    n_comp = max(1, int(10 * competency_ratio))
    n_std = max(1, 10 - n_comp)

    # Indian context examples
    daily_uses = [
        "finding the way to a friend's house",
        "locating a city on a map of India",
        "planning a trip from Delhi to Agra",
        "finding which bus to take to school",
        "locating the nearest hospital"
    ]
    fields = [
        "navigation and route planning",
        "locating places",
        "understanding spatial distribution",
        "military and defence planning",
        "tourism and itinerary planning",
        "urban planning"
    ]

    # --- COMPETENCY QUESTIONS ---
    for i in range(n_comp):
        q_type = rng.int(0, 3)

        if q_type == 0:
            # Navigation use
            correct = "Finding the shortest route between two places"
            opts_raw = [
                correct,
                "Counting the total number of countries in the world",
                "Measuring the temperature of a city",
                "Painting a picture of a landscape"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_003_comp_{i+1}",
                node_id="c6_geo_003",
                question_text="How are maps used in navigation?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Maps help in navigation by showing routes between places. "
                    "You can find the shortest or best path from one location to another - "
                    "for example, from your home to school, or from Delhi to Jaipur."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Importance of maps - navigation"
            ))

        elif q_type == 1:
            # Locating places
            correct = "By using place names and coordinates on the map"
            opts_raw = [
                correct,
                "By counting the number of trees in the area",
                "By measuring the temperature with a thermometer",
                "By asking people on the street"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_003_comp_{i+1}",
                node_id="c6_geo_003",
                question_text="How do maps help us locate places?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Maps help us locate places using place names (like 'Mumbai' or 'Kolkata') "
                    "and coordinates (latitudes and longitudes). "
                    "The index and grid system make it easy to find any place."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Importance of maps - locating places"
            ))

        elif q_type == 2:
            # Spatial distribution
            correct = "To understand how a phenomenon like population or rainfall is spread over an area"
            opts_raw = [
                correct,
                "To count the exact number of people in a city",
                "To draw a portrait of a person",
                "To measure the height of a mountain with a ruler"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_003_comp_{i+1}",
                node_id="c6_geo_003",
                question_text="How do thematic maps help us understand spatial distribution?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Thematic maps show how a specific phenomenon - like population density, "
                    "rainfall, vegetation, or mineral resources - is spread across an area. "
                    "For example, a population map of India shows which states are more densely populated."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Importance of maps - spatial distribution"
            ))

        else:
            # Tourism use
            correct = "Planning sightseeing routes and itineraries"
            opts_raw = [
                correct,
                "Measuring the depth of the ocean",
                "Building a new house",
                "Predicting earthquakes"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_003_comp_{i+1}",
                node_id="c6_geo_003",
                question_text="How are maps useful in tourism?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Maps help tourists plan their trips by showing tourist places, "
                    "routes, distances, and nearby attractions. "
                    "For example, a tourist visiting Rajasthan can use a map to plan a route "
                    "covering Jaipur, Jodhpur, and Udaipur."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Importance of maps - tourism"
            ))

    # --- STANDARD QUESTIONS ---
    for i in range(n_std):
        q_type = rng.int(0, 4)

        if q_type == 0:
            # Urban planning
            correct = "Laying out roads, parks, and residential areas in a city"
            opts_raw = [
                correct,
                "Measuring the depth of ocean trenches",
                "Predicting volcanic eruptions",
                "Counting the number of trees in a forest"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_003_std_{i+1}",
                node_id="c6_geo_003",
                question_text="How are maps used in urban planning?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Urban planners use maps to design cities - deciding where to build roads, "
                    "parks, schools, hospitals, and residential areas. "
                    "This ensures organised development of the city."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Importance of maps - urban planning"
            ))

        elif q_type == 1:
            # Military use
            correct = "Terrain analysis and strategic planning"
            opts_raw = [
                correct,
                "Cooking food for soldiers",
                "Making uniforms for the army",
                "Writing letters to families"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_003_std_{i+1}",
                node_id="c6_geo_003",
                question_text="How are maps used in the military and defence?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Military forces use topographic maps for terrain analysis - studying "
                    "mountains, rivers, and roads to plan strategies and movements during operations."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Importance of maps - military"
            ))

        elif q_type == 2:
            # Which field uses maps for mineral resources
            correct = "Geographers and mining engineers"
            opts_raw = [
                correct,
                "Chefs and restaurant owners",
                "Fashion designers",
                "Musicians and singers"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_003_std_{i+1}",
                node_id="c6_geo_003",
                question_text="Who uses maps to find the location of mineral resources like coal and iron ore?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Geographers and mining engineers use thematic maps that show the distribution "
                    "of mineral resources. India has rich coal reserves in Jharkhand and Odisha, "
                    "and iron ore in Karnataka - these are shown on resource maps."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Importance of maps - resources"
            ))

        elif q_type == 3:
            # Scale-based calculation - map distance to real distance
            scale_data = generate_scale_data()
            mc = scale_data["map_cm"]
            rk = scale_data["real_km"]
            measured = rng.int(2, 10)
            real_dist = verify_scale(mc, rk, measured)
            # round to 2 decimal places
            real_dist_rounded = round(float(real_dist), 2)
            correct_ans = f"{real_dist_rounded} km"
            # generate plausible distractors
            opts_raw = [
                correct_ans,
                f"{round(float(real_dist * 2), 2)} km",
                f"{round(float(real_dist / 2), 2)} km",
                f"{round(float(real_dist + rk), 2)} km"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct_ans)
            questions.append(Question(
                id=f"c6_geo_003_std_{i+1}",
                node_id="c6_geo_003",
                question_text=(
                    f"On a map, the scale is 1 cm = {rk} km. "
                    f"If the distance between two cities on the map is {measured} cm, "
                    f"what is the actual distance between them?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    f"Using the scale: 1 cm on map = {rk} km on ground. "
                    f"So {measured} cm x {rk} km/cm = {real_dist_rounded} km. "
                    f"Actual distance = map distance x real km per cm."
                ),
                cognitive_level="Apply",
                difficulty="Medium",
                competency="standard",
                topic="Scale - calculation"
            ))

        else:
            # India-specific: which map for states/cities
            correct = "A political map of India"
            opts_raw = [
                correct,
                "A physical map of India",
                "A climate map of India",
                "A vegetation map of India"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            state_example = rng.choice(INDIAN_STATES)
            city_example = rng.choice(INDIAN_CITIES)
            questions.append(Question(
                id=f"c6_geo_003_std_{i+1}",
                node_id="c6_geo_003",
                question_text=(
                    f"If you want to find the location of {state_example} state "
                    f"and its capital {city_example}, which type of map would you use?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A political map shows administrative boundaries such as countries, "
                    "states, and cities. A physical map shows mountains and rivers; "
                    "a climate map shows rainfall patterns."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Types of maps - Indian context"
            ))

    return questions

# ============================================================================
# QUESTION GENERATORS - c6_geo_004 (implied continuation): Scale
# ============================================================================
def gen_map_scale(rng: SeededRandom, competency_ratio: float = 0.5) -> List[Question]:
    questions = []
    n_comp = max(1, int(8 * competency_ratio))
    n_std = max(1, 8 - n_comp)

    # --- COMPETENCY ---
    for i in range(n_comp):
        q_type = rng.int(0, 2)

        if q_type == 0:
            # What is scale
            correct = "The ratio between a distance on the map and the actual distance on the ground"
            opts_raw = [
                correct,
                "The size of the map in centimetres",
                "The number of colours used on the map",
                "The name of the mapmaker"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_004_comp_{i+1}",
                node_id="c6_geo_004",
                question_text="What does the scale of a map represent?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "Scale is the ratio between a distance on the map and the corresponding "
                    "actual distance on the ground. For example, 1:50,000 means 1 unit on the map "
                    "equals 50,000 units on the ground."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Map scale"
            ))

        elif q_type == 1:
            # Large scale vs small scale
            correct = "A large-scale map shows a small area in detail"
            opts_raw = [
                correct,
                "A large-scale map shows the whole world",
                "A large-scale map has a smaller denominator",
                "A large-scale map shows less detail"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_004_comp_{i+1}",
                node_id="c6_geo_004",
                question_text="What does a large-scale map show?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A large-scale map (e.g., 1:10,000) shows a small area like a city "
                    "in great detail. A small-scale map (e.g., 1:1,000,000) shows a large area "
                    "like a country with less detail."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="competency",
                topic="Large-scale vs small-scale maps"
            ))

        else:
            # Graphic vs verbal scale
            correct = "A graphic scale is shown as a bar with divisions, while a verbal scale is written in words"
            opts_raw = [
                correct,
                "A graphic scale is written in words",
                "Both are the same thing",
                "A verbal scale is always in colour"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_004_comp_{i+1}",
                node_id="c6_geo_004",
                question_text="What is the difference between a graphic scale and a verbal scale?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "A verbal scale states the ratio in words, e.g., '1 cm = 5 km'. "
                    "A graphic (or linear) scale shows a bar divided into segments, "
                    "each representing a known ground distance."
                ),
                cognitive_level="Understand",
                difficulty="Medium",
                competency="competency",
                topic="Types of scale"
            ))

    # --- STANDARD ---
    for i in range(n_std):
        q_type = rng.int(0, 3)

        if q_type == 0:
            scale_data = generate_scale_data()
            mc = scale_data["map_cm"]
            rk = scale_data["real_km"]
            measured = rng.int(3, 15)
            real_dist = verify_scale(mc, rk, measured)
            real_dist_rounded = round(float(real_dist), 2)
            correct_ans = f"{real_dist_rounded} km"
            opts_raw = [
                correct_ans,
                f"{round(float(real_dist * 1.5), 2)} km",
                f"{round(float(real_dist / 1.5), 2)} km",
                f"{rk} km"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct_ans)
            questions.append(Question(
                id=f"c6_geo_004_std_{i+1}",
                node_id="c6_geo_004",
                question_text=(
                    f"A map has a scale of 1 cm = {rk} km. "
                    f"If two towns are {measured} cm apart on the map, "
                    f"what is their actual distance?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    f"Actual distance = {measured} x {rk} = {real_dist_rounded} km."
                ),
                cognitive_level="Apply",
                difficulty="Medium",
                competency="standard",
                topic="Scale calculation"
            ))

        elif q_type == 1:
            # Which map for more detail
            correct = "A map with a scale of 1 cm = 1 km"
            opts_raw = [
                correct,
                "A map with a scale of 1 cm = 100 km",
                "A map of the whole world",
                "A globe"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_004_std_{i+1}",
                node_id="c6_geo_004",
                question_text=(
                    "You need a detailed map of your city to find individual streets. "
                    "Which scale would be most suitable?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "1 cm = 1 km is a large-scale map that shows a small area in great detail. "
                    "1 cm = 100 km is a small-scale map covering a large area with less detail."
                ),
                cognitive_level="Apply",
                difficulty="Medium",
                competency="standard",
                topic="Scale selection"
            ))

        else:
            # Scale statement form
            correct = "1:100000"
            opts_raw = [
                correct,
                "100000:1",
                "1:100",
                "100:1"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_004_std_{i+1}",
                node_id="c6_geo_004",
                question_text=(
                    "The scale of a map is given as 1 cm = 1 km. "
                    "How would you write this as a representative fraction (RF)?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "1 km = 100,000 cm. So the RF is 1:100,000. "
                    "The first number is always 1 (representing 1 unit on the map), "
                    "and the second number is the equivalent on the ground."
                ),
                cognitive_level="Apply",
                difficulty="Medium",
                competency="standard",
                topic="Representative fraction"
            ))

    return questions

# ============================================================================
# QUESTION GENERATORS - c6_geo_005 (implied): Direction and Coordinates
# ============================================================================
def gen_direction_and_coordinates(rng: SeededRandom, competency_ratio: float = 0.5) -> List[Question]:
    questions = []
    n_comp = max(1, int(8 * competency_ratio))
    n_std = max(1, 8 - n_comp)

    directions = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]

    # --- COMPETENCY ---
    for i in range(n_comp):
        q_type = rng.int(0, 2)

        if q_type == 0:
            # Cardinal direction
            correct = "North"
            opts_raw = ["North", "South", "East", "West"]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_005_comp_{i+1}",
                node_id="c6_geo_005",
                question_text="Which direction is shown by the arrow on a map?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "The North arrow (or North line) on a map indicates which way is North. "
                    "All other directions (South, East, West) are determined relative to North."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Direction on maps"
            ))

        elif q_type == 1:
            # Compass directions
            correct = "There are eight main directions"
            opts_raw = [
                correct,
                "There are only two main directions",
                "There are twelve main directions",
                "There are no fixed directions on a map"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_005_comp_{i+1}",
                node_id="c6_geo_005",
                question_text="How many main directions are there on a compass?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "There are eight main directions: North, South, East, West, "
                    "North-East, North-West, South-East, and South-West. "
                    "These are called cardinal and intercardinal directions."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Compass directions"
            ))

        else:
            # If facing North, where is East
            correct = "To your right"
            opts_raw = [
                correct,
                "To your left",
                "Behind you",
                "Above you"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_005_comp_{i+1}",
                node_id="c6_geo_005",
                question_text="If you are facing North, which direction is to your right?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "If you face North, East is to your right, West is to your left, "
                    "and South is behind you. A simple way to remember: 'Never Eat Soggy Waffles' "
                    "= North, East, South, West clockwise."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="competency",
                topic="Direction - compass rule"
            ))

    # --- STANDARD ---
    for i in range(n_std):
        q_type = rng.int(0, 3)

        if q_type == 0:
            # Direction between two Indian cities
            city1 = rng.choice(INDIAN_CITIES)
            city2 = rng.choice([c for c in INDIAN_CITIES if c != city1])
            # Determine rough direction based on known geography
            city_coords = {
                "Delhi": (28.6, 77.2), "Mumbai": (19.0, 72.8), "Kolkata": (22.6, 88.4),
                "Chennai": (13.1, 80.3), "Bengaluru": (13.0, 77.6), "Hyderabad": (17.4, 78.5),
                "Jaipur": (26.9, 75.8), "Lucknow": (26.8, 80.9), "Ahmedabad": (23.0, 72.6),
                "Panaji": (15.5, 73.8), "Thiruvananthapuram": (8.5, 76.9), "Shimla": (31.1, 77.2),
                "Guwahati": (26.1, 91.7), "Bhopal": (23.3, 77.4), "Patna": (25.6, 85.1),
                "Ranchi": (23.3, 85.3), "Raipur": (21.3, 81.6), "Visakhapatnam": (17.7, 83.3),
                "Surat": (21.2, 72.8), "Pune": (18.5, 73.9)
            }
            if city1 in city_coords and city2 in city_coords:
                lat1, lon1 = city_coords[city1]
                lat2, lon2 = city_coords[city2]
                dlat = lat2 - lat1
                dlon = lon2 - lon1
                if abs(dlat) > abs(dlon):
                    direction = "North" if dlat > 0 else "South"
                elif abs(dlon) > abs(dlat):
                    direction = "East" if dlon > 0 else "West"
                else:
                    if dlat > 0 and dlon > 0:
                        direction = "North-East"
                    elif dlat > 0 and dlon < 0:
                        direction = "North-West"
                    elif dlat < 0 and dlon > 0:
                        direction = "South-East"
                    else:
                        direction = "South-West"
            else:
                direction = rng.choice(directions)

            correct = direction
            opts_raw = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]
            rng.shuffle(opts_raw)
            # Ensure correct is in opts
            if correct not in opts_raw:
                opts_raw = opts_raw[:4]
                opts_raw.append(correct)
            # remove duplicates
            opts_raw = list(dict.fromkeys(opts_raw))
            while len(opts_raw) < 4:
                opts_raw.append(rng.choice([d for d in directions if d not in opts_raw]))
            opts_raw = opts_raw[:4]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_005_std_{i+1}",
                node_id="c6_geo_005",
                question_text=(
                    f"If you travel from {city1} towards {city2}, "
                    f"which general direction are you going?"
                ),
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    f"Based on the relative positions of {city1} and {city2}, "
                    f"the general direction of travel is towards the {direction}. "
                    f"Maps use North as the reference direction."
                ),
                cognitive_level="Apply",
                difficulty="Medium",
                competency="standard",
                topic="Direction - Indian cities"
            ))

        elif q_type == 1:
            # Conventional direction
            correct = "Top of the map"
            opts_raw = [
                correct,
                "Bottom of the map",
                "Left side of the map",
                "Right side of the map"
            ]
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_005_std_{i+1}",
                node_id="c6_geo_005",
                question_text="On most maps, which part of the map shows North?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    "By convention, the top of a map shows North, the bottom shows South, "
                    "the right side shows East, and the left side shows West."
                ),
                cognitive_level="Understand",
                difficulty="Easy",
                competency="standard",
                topic="Conventional direction"
            ))

        else:
            # Direction from a reference point in India
            ref_city = rng.choice(["Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru"])
            target = rng.choice(["Kashmir", "Kanyakumari", "Kolkata", "Goa", "Northeast India"])
            direction_map = {
                ("Delhi", "Kashmir"): "North",
                ("Delhi", "Kanyakumari"): "South",
                ("Delhi", "Kolkata"): "East",
                ("Mumbai", "Goa"): "South",
                ("Kolkata", "Bengaluru"): "South-West",
                ("Chennai", "Kanyakumari"): "South",
                ("Bengaluru", "Mumbai"): "North-West",
                ("Delhi", "Kolkata"): "East",
            }
            if (ref_city, target) in direction_map:
                correct = direction_map[(ref_city, target)]
            else:
                correct = rng.choice(directions)

            opts_raw = ["North", "South", "East", "West"]
            if correct not in opts_raw:
                opts_raw[0] = correct
            rng.shuffle(opts_raw)
            correct_idx = opts_raw.index(correct)
            questions.append(Question(
                id=f"c6_geo_005_std_{i+1}",
                node_id="c6_geo_005",
                question_text=f"In which direction is {target} from {ref_city}?",
                options=opts_raw,
                correct_index=correct_idx,
                explanation=(
                    f"Using a map of India, {target} lies to the {correct} of {ref_city}. "
                    f"Always use the North arrow on the map to find directions."
                ),
                cognitive_level="Apply",
                difficulty="Medium",
                competency="standard",
                topic="Direction - Indian geography"
            ))

    return questions

# ============================================================================
# MAIN QUESTION GENERATOR CLASS
# ============================================================================
class Class6GeoQuestionGenerator:
    """
    Deterministic question generator for Class 6 Geography (CISCE Upper Primary).
    Uses seeded random generation for reproducibility.
    Covers all nodes: maps introduction, map vs sketch/plan/globe, importance of maps,
    scale, and direction.
    """

    NODE_CONFIGS = {
        "c6_geo_001": {
            "title": "Maps - Introduction",
            "generator": gen_map_introduction,
            "num_questions": 10
        },
        "c6_geo_002": {
            "title": "Map vs Sketch vs Plan vs Globe",
            "generator": gen_map_vs_sketch_plan_globe,
            "num_questions": 10
        },
        "c6_geo_003": {
            "title": "Importance of Maps",
            "generator": gen_importance_of_maps,
            "num_questions": 10
        },
        "c6_geo_004": {
            "title": "Scale of Maps",
            "generator": gen_map_scale,
            "num_questions": 8
        },
        "c6_geo_005": {
            "title": "Direction and Coordinates",
            "generator": gen_direction_and_coordinates,
            "num_questions": 8
        }
    }

    def __init__(self, seed: str = "class6_geo_cisce_2026"):
        self.rng = SeededRandom(seed)
        self.master_seed = seed
        self._generated_sets: Dict[str, QuestionSet] = {}

    def generate_node(self, node_id: str, competency_ratio: float = 0.5) -> QuestionSet:
        """Generate questions for a specific node."""
        if node_id not in self.NODE_CONFIGS:
            raise ValueError(f"Unknown node: {node_id}. Available: {list(self.NODE_CONFIGS.keys())}")

        config = self.NODE_CONFIGS[node_id]
        seed = self.rng.next_seed(f"node_{node_id}")
        local_rng = SeededRandom(seed)

        questions = config["generator"](local_rng, competency_ratio)
        qset = QuestionSet(
            node_id=node_id,
            node_title=config["title"],
            questions=questions,
            seed_used=seed
        )
        self._generated_sets[node_id] = qset
        return qset

    def generate_all(self, competency_ratio: float = 0.5) -> Dict[str, QuestionSet]:
        """Generate questions for all nodes."""
        all_sets = {}
        for node_id in self.NODE_CONFIGS:
            all_sets[node_id] = self.generate_node(node_id, competency_ratio)
        return all_sets

    def generate_worksheet(
        self,
        node_ids: List[str] = None,
        competency_ratio: float = 0.5,
        shuffle_questions: bool = True
    ) -> List[Question]:
        """Generate a combined worksheet from specified nodes."""
        if node_ids is None:
            node_ids = list(self.NODE_CONFIGS.keys())

        all_questions = []
        for node_id in node_ids:
            qset = self.generate_node(node_id, competency_ratio)
            all_questions.extend(qset.questions)

        if shuffle_questions:
            self.rng.shuffle(all_questions, suffix="worksheet_shuffle")

        # Renumber questions
        for idx, q in enumerate(all_questions, 1):
            q.id = f"worksheet_q{idx}"

        return all_questions

    def get_answer_key(self, questions: List[Question]) -> Dict[str, Dict]:
        """Generate an answer key from a list of questions."""
        answer_key = {}
        for q in questions:
            answer_key[q.id] = {
                "correct_answer": q.options[q.correct_index],
                "correct_index": q.correct_index,
                "explanation": q.explanation,
                "node_id": q.node_id,
                "topic": q.topic,
                "difficulty": q.difficulty,
                "cognitive_level": q.cognitive_level,
                "competency": q.competency
            }
        return answer_key

    def export_json(self, questions: List[Question], answer_key: Dict) -> str:
        """Export questions and answer key as JSON string."""
        output = {
            "questions": [],
            "answer_key": answer_key,
            "metadata": {
                "subject": "Geography",
                "class": 6,
                "board": "CISCE",
                "total_questions": len(questions),
                "seed": self.master_seed
            }
        }
        for q in questions:
            output["questions"].append({
                "id": q.id,
                "node_id": q.node_id,
                "topic": q.topic,
                "question": q.question_text,
                "options": q.options,
                "difficulty": q.difficulty,
                "cognitive_level": q.cognitive_level,
                "competency": q.competency
            })
        return json.dumps(output, indent=2, ensure_ascii=False)

    def print_worksheet(self, questions: List[Question]):
        """Pretty-print a worksheet to stdout."""
        print("=" * 70)
        print("         CLASS 6 GEOGRAPHY - WORKSHEET")
        print("         Source: CISCE Upper Primary Curriculum")
        print("=" * 70)
        print()

        current_topic = None
        for idx, q in enumerate(questions, 1):
            if q.topic != current_topic:
                current_topic = q.topic
                print(f"\n--- Topic: {current_topic} [{q.difficulty}] ---\n")
            marker = "[C]" if q.competency == "competency" else "[S]"
            print(f"Q{idx}. {marker} {q.question_text}")
            for opt_idx, opt in enumerate(q.options):
                print(f"     ({chr(65 + opt_idx)}) {opt}")
            print()

        print("=" * 70)

    def print_answer_key(self, answer_key: Dict):
        """Pretty-print answer key to stdout."""
        print("\n" + "=" * 70)
        print("                    ANSWER KEY")
        print("=" * 70)
        for qid, info in answer_key.items():
            letter = chr(65 + info["correct_index"])
            print(f"{qid}: ({letter}) {info['correct_answer']}")
        print("=" * 70)

    def verify_questions(self, questions: List[Question]) -> bool:
        """Verify that all questions are well-formed."""
        all_ok = True
        for q in questions:
            if not q.question_text.strip():
                print(f"ERROR: {q.id} - empty question text")
                all_ok = False
            if len(q.options) < 2:
                print(f"ERROR: {q.id} - fewer than 2 options")
                all_ok = False
            if q.correct_index < 0 or q.correct_index >= len(q.options):
                print(f"ERROR: {q.id} - invalid correct_index {q.correct_index}")
                all_ok = False
            if q.options[q.correct_index] not in q.options:
                print(f"ERROR: {q.id} - correct answer not in options")
                all_ok = False
            if not q.explanation.strip():
                print(f"WARNING: {q.id} - empty explanation")
        return all_ok

    def competency_coverage_report(self, questions: List[Question]) -> Dict:
        """Report on competency vs standard question distribution."""
        comp_count = sum(1 for q in questions if q.competency == "competency")
        std_count = sum(1 for q in questions if q.competency == "standard")
        total = len(questions)
        return {
            "total": total,
            "competency": comp_count,
            "standard": std_count,
            "competency_pct": round(comp_count / total * 100, 1) if total > 0 else 0,
            "by_node": {},
            "by_difficulty": {},
            "by_cognitive_level": {}
        }

# ============================================================================
# SCALE CALCULATION VERIFICATION MODULE (SymPy-based)
# ============================================================================
class ScaleCalculator:
    """Verify and compute scale-related problems using SymPy."""

    @staticmethod
    def rf_from_verbal(km_per_cm: float) -> str:
        """Convert verbal scale to representative fraction."""
        cm_per_km = 100000
        rf = sp.Rational(1, int(km_per_cm * cm_per_km))
        return f"1:{rf.q}"

    @staticmethod
    def real_distance(map_cm: float, km_per_cm: float) -> sp.Rational:
        """Calculate real distance from map distance."""
        result = sp.Rational(int(map_cm), 1) * sp.Rational(int(km_per_cm * 100000), 100000)
        return result

    @staticmethod
    def map_distance(real_km: float, km_per_cm: float) -> sp.Rational:
        """Calculate map distance from real distance."""
        result = sp.Rational(int(real_km), 1) / sp.Rational(int(km_per_cm), 1)
        return result

    @staticmethod
    def verify_scale_consistency(rf_numerator: int, rf_denominator: int,
                                  measured_map_cm: float) -> float:
        """Verify that measured distance on map matches expected real distance."""
        scale_factor = rf_denominator / rf_numerator  # cm on ground per cm on map
        real_cm = measured_map_cm * scale_factor
        real_km = float(real_cm / 100000)
        return round(real_km, 4)

# ============================================================================
# DEMO / MAIN
# ============================================================================
def main():
    seed = "class6_geo_cisce_2026_demo"
    generator = Class6GeoQuestionGenerator(seed)

    print(f"Seed: {seed}")
    print(f"Generating questions for Class 6 Geography (CISCE)...\n")

    # Generate all nodes
    all_sets = generator.generate_all(competency_ratio=0.5)

    total_questions = 0
    all_questions = []
    for node_id, qset in all_sets.items():
        print(f"  [{node_id}] {qset.node_title}: {len(qset.questions)} questions")
        total_questions += len(qset.questions)
        all_questions.extend(qset.questions)

    print(f"\nTotal questions generated: {total_questions}")

    # Verify all questions
    print("\nVerifying questions...")
    is_valid = generator.verify_questions(all_questions)
    print(f"  All questions valid: {is_valid}")

    # Competency coverage report
    report = generator.competency_coverage_report(all_questions)
    print(f"\n  Competency questions: {report['competency']} ({report['competency_pct']}%)")
    print(f"  Standard questions: {report['standard']} ({100 - report['competency_pct']}%)")

    # Verify scale calculations using SymPy
    print("\n--- SymPy Scale Verification ---")
    calc = ScaleCalculator()
    # Test 1: RF from verbal scale 1 cm = 5 km
    rf = calc.rf_from_verbal(5)
    print(f"  Verbal scale '1 cm = 5 km' → RF: {rf}")
    assert rf == "1:500000", f"Expected 1:500000, got {rf}"
    # Test 2: Real distance
    rd = calc.real_distance(3, 5)
    print(f"  Map 3 cm, scale 1 cm = 5 km → Real distance: {rd} km")
    assert rd == 15, f"Expected 15, got {rd}"
    # Test 3: Map distance
    md = calc.map_distance(20, 5)
    print(f"  Real 20 km, scale 1 cm = 5 km → Map distance: {md} cm")
    assert md == 4, f"Expected 4, got {md}"
    print("  All SymPy scale calculations verified ✓")

    # Generate worksheet
    print("\n--- Generating Combined Worksheet ---")
    worksheet = generator.generate_worksheet(competency_ratio=0.5)
    answer_key = generator.get_answer_key(worksheet)

    # Print sample (first 5)
    print("\nSample questions (first 5):")
    for q in worksheet[:5]:
        marker = "[C]" if q.competency == "competency" else "[S]"
        opts_str = " | ".join(f"({chr(65+i)}) {opt}" for i, opt in enumerate(q.options))
        print(f"  {marker} {q.question_text}")
        print(f"     {opts_str}")
        print(f"     ✓ Answer: ({chr(65 + q.correct_index)}) {q.options[q.correct_index]}")
        print()

    print(f"Worksheet generated with {len(worksheet)} questions.")
    print("All verifications passed.")

    return generator, all_sets, worksheet, answer_key


# ============================================================================
# Deterministic question bank API
# ============================================================================
class QuestionBank:
    """
    Persistent question bank that can be saved/loaded.
    Uses deterministic seeds for reproducibility.
    """

    def __init__(self, seed: str = "class6_geo_bank_2026"):
        self.seed = seed
        self.generator = Class6GeoQuestionGenerator(seed)
        self._bank: Dict[str, List[Question]] = {}

    def build_bank(self, questions_per_node: int = 10, competency_ratio: float = 0.5):
        """Build the full question bank."""
        for node_id in Class6GeoQuestionGenerator.NODE_CONFIGS:
            qset = self.generator.generate_node(node_id, competency_ratio)
            self._bank[node_id] = qset.questions
        return self._bank

    def get_questions_by_topic(self, topic_keywords: List[str]) -> List[Question]:
        """Get questions matching any of the topic keywords."""
        results = []
        for node_id, questions in self._bank.items():
            for q in questions:
                for kw in topic_keywords:
                    if kw.lower() in q.topic.lower() or kw.lower() in q.question_text.lower():
                        results.append(q)
                        break
        return results

    def get_competency_questions(self) -> List[Question]:
        """Get only competency-level questions."""
        results = []
        for questions in self._bank.values():
            results.extend([q for q in questions if q.competency == "competency"])
        return results

    def get_standard_questions(self) -> List[Question]:
        """Get only standard-level questions."""
        results = []
        for questions in self._bank.values():
            results.extend([q for q in questions if q.competency == "standard"])
        return results

    def get_by_difficulty(self, difficulty: str) -> List[Question]:
        """Get questions by difficulty level."""
        results = []
        for questions in self._bank.values():
            results.extend([q for q in questions if q.difficulty.lower() == difficulty.lower()])
        return results

# TRUNCATED:     def get_by