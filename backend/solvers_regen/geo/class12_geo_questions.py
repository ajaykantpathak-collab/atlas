"""
Question Generator for CISCE Geography Class 12
Topics: Climate, Soils, Natural Vegetation, Water Resources, Minerals,
        Agriculture, Industries, Population, Human Settlements, Transport,
        Life in Oceans, Human Development, Map Projections, Topographical Maps
"""

import random
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Any
import json

# ─── Question Data Structures ───────────────────────────────────────────────

@dataclass
class Question:
    id: str
    node_id: str
    question_type: str  # mcq, fill_blank, short_answer, long_answer, numerical, assertion_reasoning, case_study
    difficulty: str     # Easy, Medium, Hard
    competency_level: str  # Remembering, Understanding, Applying, Analyzing, Evaluating, Creating
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: str = ""
    explanation: str = ""
    marks: int = 1
    topic_tags: List[str] = field(default_factory=list)
    params: Dict = field(default_factory=dict)

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "node_id": self.node_id,
            "type": self.question_type,
            "difficulty": self.difficulty,
            "competency": self.competency_level,
            "question": self.question_text,
            "options": self.options,
            "answer": self.correct_answer,
            "explanation": self.explanation,
            "marks": self.marks,
            "topics": self.topic_tags
        }


@dataclass
class QuestionSet:
    node_id: str
    questions: List[Question]
    total_marks: int
    metadata: Dict = field(default_factory=dict)

    def to_dict(self) -> Dict:
        return {
            "node_id": self.node_id,
            "total_questions": len(self.questions),
            "total_marks": self.total_marks,
            "questions": [q.to_dict() for q in self.questions]
        }


# ─── Deterministic Seeded RNG ────────────────────────────────────────────────

class SeededQuestionBank:
    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self._counter = 0

    def next_id(self, prefix: str = "Q") -> str:
        self._counter += 1
        return f"{prefix}_{self._counter:04d}"

    def choice(self, items: list):
        return self.rng.choice(items)

    def shuffle(self, items: list) -> list:
        result = items[:]
        self.rng.shuffle(result)
        return result

    def randint(self, a: int, b: int) -> int:
        return self.rng.randint(a, b)

    def uniform(self, a: float, b: float) -> float:
        return self.rng.uniform(a, b)

    def sample(self, items: list, k: int) -> list:
        return self.rng.sample(items, min(k, len(items)))


# ─── Data Constants ─────────────────────────────────────────────────────────

TOPICS_CLIMATE = [
    "Atmospheric Pressure", "Wind Systems", "Cyclones",
    "Monsoon", "Climate Classification", "El Nino", "ENSO"
]

TOPICS_SOILS = [
    "Soil Formation", "Soil Classification", "Soil Conservation",
    "Soil Erosion", "Soil Profile"
]

TOPICS_VEGETATION = [
    "Forest Types", "Monsoon Forest", "Tropical Rainforest",
    "Mangrove Forest", "Social Forestry"
]

TOPICS_WATER = [
    "Surface Water", "Groundwater", "Irrigation",
    "Watershed Management", "Dams and Reservoirs"
]

TOPICS_MINERALS = [
    "Iron Ore", "Coal", "Petroleum", "Mica", "Bauxite",
    "Non-Conventional Energy", "Conservation of Minerals"
]

TOPICS_AGRICULTURE = [
    "Rice Cultivation", "Wheat Cultivation", "Cotton", "Tea",
    "Coffee", "Sugarcane", "Food Crops", "Cash Crops"
]

TOPICS_INDUSTRIES = [
    "Iron and Steel", "Cotton Textile", "Jute Industry",
    "IT Industry", "Automobile Industry", "Industrial Regions"
]

TOPICS_POPULATION = [
    "Population Growth", "Population Density", "Population Distribution",
    "Demographic Transition", "Migration", "Human Development Index"
]

TOPICS_SETTLEMENTS = [
    "Urbanization", "Rural Settlements", "Urban Planning",
    "Smart Cities", "Metropolitan Cities"
]

TOPICS_TRANSPORT = [
    "Road Transport", "Railways", "Waterways", "Air Transport",
    "Pipeline Transport", "Communication"
]

TOPICS_OCEANS = [
    "Ocean Currents", "Tides", "Ocean Deposits",
    "Coral Reefs", "Marine Resources"
]

TOPICS_MAP_PROJECTIONS = [
    "Cylindrical Projections", "Conical Projections",
    "Zenithal Projections", "Map Projection Properties"
]

TOPICS_TOPOGRAPHY = [
    "Grid References", "Contours", "Scale",
    "Bearing", "Cross Section", "Intervisibility"
]

INDIAN_STATES = [
    "Maharashtra", "Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh",
    "Telangana", "Gujarat", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh",
    "Bihar", "West Bengal", "Odisha", "Jharkhand", "Chhattisgarh",
    "Punjab", "Haryana", "Himachal Pradesh", "Uttarakhand", "Delhi"
]

INDIAN_CITIES = [
    "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai",
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
    "Bhopal", "Nagpur", "Visakhapatnam", "Coimbatore", "Kochi"
]

INDIAN_RIVERS = [
    "Ganga", "Yamuna", "Brahmaputra", "Godavari", "Krishna",
    "Cauvery", "Narmada", "Tapi", "Mahanadi", "Indus",
    "Sutlej", "Beas", "Chenab", "Jhelum"
]

SOIL_TYPES = [
    "Alluvial Soil", "Black Soil", "Red Soil", "Laterite Soil",
    "Mountain Soil", "Desert Soil", "Peaty Soil", "Saline Soil"
]

FOREST_TYPES_IN = [
    "Tropical Evergreen", "Tropical Deciduous", "Montane",
    "Mangrove (Tidal)", "Thorn and Scrub"
]

MOUNTAINS_IN = [
    "Himalayas", "Aravalli Range", "Vindhya Range",
    "Satpura Range", "Western Ghats", "Eastern Ghats", "Nilgiri Hills"
]

INDUSTRIAL_TOWNS = [
    "Jamshedpur", "Rourkela", "Durgapur", "Bhilai", "Jhansi",
    "Kanpur", "Ahmedabad", "Surat", "Mumbai", "Kolkata",
    "Bangalore", "Hyderabad", "Pune", "Coimbatore", "Ludhiana"
]

SEAS_IN = [
    "Arabian Sea", "Bay of Bengal", "Indian Ocean"
]

PROJECTION_TYPES = [
    "Cylindrical Equal Area", "Mercator", "Conical Simple",
    "Lambert Conformal Conic", "Azimuthal Equidistant",
    "Polar Zenithal", "Gnomonic"
]

POPULATION_CONCEPTS = [
    "Birth Rate", "Death Rate", "Infant Mortality Rate",
    "Life Expectancy", "Literacy Rate", "Sex Ratio",
    "Child Sex Ratio", "Work Participation Rate"
]

WATERBODIES = [
    "Ganga River", "Brahmaputra River", "Godavari River",
    "Krishna River", "Narmada River", "Mahanadi River",
    "Wular Lake", "Chilika Lake", "Vembanad Lake", "Kolleru Lake"
]

MANGROVE_REGIONS = [
    "Sundarbans", "Pichavaram", "Bhitarkanika", "Coringa",
    "Gulf of Kutch", "Andaman Islands"
]


# ─── Helper: Generate MCQ Options ────────────────────────────────────────────

def generate_mcq_options(bank: SeededQuestionBank, correct: str, pool: List[str], count: int = 4) -> List[str]:
    distractors = [p for p in pool if p != correct]
    selected = bank.sample(distractors, min(count - 1, len(distractors)))
    options = [correct] + selected
    options = bank.shuffle(options)
    return options


# ─── Topic 1: Climate ───────────────────────────────────────────────────────

class ClimateGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_climate())
        else:
            questions.extend(self._standard_climate())
        return questions

    def _standard_climate(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer", "numerical"])

        if q_type == "mcq":
            bank2 = SeededQuestionBank(bank.randint(1, 9999))
            sub = bank2.choice(["pressure", "wind", "monsoon", "cyclone", "el_nino"])
            if sub == "pressure":
                month = bank2.randint(1, 12)
                lat = bank2.randint(5, 35) * 5
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_pressure",
                    question_type="mcq", difficulty=bank2.choice(["Easy", "Medium"]),
                    competency_level="Understanding",
                    question_text=(
                        f"The Inter-Tropical Convergence Zone (ITCZ) shifts northward to approximately "
                        f"{lat}N latitude during which month of the Northern Hemisphere summer?"
                    ),
                    options=generate_mcq_options(bank2, "July", ["January", "March", "July", "October"]),
                    correct_answer="July",
                    explanation=(
                        "During Northern Hemisphere summer (July), the ITCZ shifts northward to approximately "
                        "20-25 degrees North latitude due to maximum solar heating over the Tropic of Cancer. "
                        "This shift drives the South-West monsoon winds over the Indian subcontinent."
                    ),
                    marks=1,
                    topic_tags=["Climate", "ITCZ", "Atmospheric Pressure"]
                )
            elif sub == "wind":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_wind",
                    question_type="mcq", difficulty=bank2.choice(["Easy", "Medium"]),
                    competency_level="Remembering",
                    question_text=(
                        "Which wind system brings the majority of rainfall to the Indian subcontinent during the summer months?"
                    ),
                    options=generate_mcq_options(
                        bank2, "South-West Monsoon Winds",
                        ["North-East Monsoon Winds", "Trade Winds", "Westerlies", "Local Winds"]
                    ),
                    correct_answer="South-West Monsoon Winds",
                    explanation=(
                        "The South-West Monsoon winds blow from the Arabian Sea and Bay of Bengal towards the "
                        "Indian landmass. These moisture-laden winds cause heavy rainfall over most of India "
                        "between June and September, accounting for about 75-80% of the annual rainfall."
                    ),
                    marks=1,
                    topic_tags=["Climate", "Monsoon", "Wind Systems"]
                )
            elif sub == "cyclone":
                wind_spd = bank2.randint(120, 320)
                pressure = bank2.randint(900, 970)
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_cyclone",
                    question_type="short_answer",
                    difficulty=bank2.choice(["Medium", "Hard"]),
                    competency_level="Analyzing",
                    question_text=(
                        f"A severe cyclonic storm over the Bay of Bengal has a wind speed of {wind_spd} km/h "
                        f"and central pressure of {pressure} hPa. Identify the category and name the two main "
                        f"seasons when tropical cyclones affect the Indian subcontinent."
                    ),
                    correct_answer=f"Severe Cyclonic Storm with core wind speeds of {wind_spd} km/h. "
                                   f"Cyclones affect India mainly during (i) Pre-monsoon season (April-May) and "
                                   f"(ii) Post-monsoon season (October-December).",
                    explanation=(
                        f"With wind speeds of {wind_spd} km/h (above 120 km/h), this is classified as a Severe "
                        f"Cyclonic Storm. Tropical cyclones form in the Bay of Bengal and Arabian Sea during two "
                        f"periods: pre-monsoon (April-May) and post-monsoon (October-December). The Bay of Bengal "
                        f"produces more cyclones than the Arabian Sea. Cyclones intensify due to warm sea surface "
                        f"temperatures (above 26.5 degrees C) and low vertical wind shear."
                    ),
                    marks=2, topic_tags=["Climate", "Cyclones", "Natural Disasters"]
                )
            elif sub == "monsoon":
                rainfall = bank2.randint(800, 2500)
                days = bank2.randint(45, 120)
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_monsoon",
                    question_type="numerical",
                    difficulty="Hard",
                    competency_level="Applying",
                    question_text=(
                        f"A weather station in Mumbai recorded {rainfall} mm of rainfall during the monsoon "
                        f"season spanning {days} days. Calculate (i) the average daily rainfall in mm, "
                        f"and (ii) what percentage of total monsoon rainfall does the first 30 days represent "
                        f"if the first 30 days received 60% of the total rainfall?"
                    ),
                    correct_answer=f"(i) Average daily rainfall = {rainfall}/{days} = {rainfall/days:.2f} mm/day. "
                                   f"(ii) First 30 days rainfall = 60% of {rainfall} = {0.6*rainfall:.0f} mm.",
                    explanation=(
                        f"Average daily rainfall = Total rainfall / Number of days = {rainfall}/{days} = "
                        f"{rainfall/days:.2f} mm/day. Mumbai receives heavy rainfall due to orographic lifting "
                        f"as the Western Ghats intercept moisture-laden monsoon winds. The South-West monsoon "
                        f"arrives in Mumbai around early June and withdraws by late September."
                    ),
                    marks=2, topic_tags=["Climate", "Monsoon", "Numerical"]
                )
            else:  # el_nino
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_el_nino",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Applying",
                    question_text=(
                        "What is the impact of El Nino on the Indian summer monsoon rainfall?"
                    ),
                    options=generate_mcq_options(
                        bank2, "It causes deficient rainfall",
                        ["It causes excess rainfall", "It causes deficient rainfall",
                         "It has no effect", "It causes early onset of monsoon"]
                    ),
                    correct_answer="It causes deficient rainfall",
                    explanation=(
                        "El Nino refers to the warming of the eastern Pacific Ocean surface waters. "
                        "During El Nino years, the Indian summer monsoon tends to be weaker, causing "
                        "deficient rainfall over the Indian subcontinent. The Walker Circulation is "
                        "weakened, and the monsoon trough shifts northward, reducing rainfall over central "
                        "and peninsular India. La Nina, the opposite phenomenon, tends to bring above-normal rainfall."
                    ),
                    marks=1, topic_tags=["Climate", "El Nino", "ENSO"]
                )

        elif q_type == "fill_blank":
            concept = bank.choice([
                ("The Coriolis force deflects moving air to the ______ in the Northern Hemisphere and to the ______ in the Southern Hemisphere.", "right", "left"),
                ("______ Soil is formed due to intense leaching in areas of high rainfall and temperature.", "Laterite"),
                ("The average annual rainfall of Cherrapunji exceeds ______ mm.", "11000"),
                ("The ______ current is a warm ocean current flowing northward along the western coast of Australia.", "West Australian"),
            ])
            q_text = concept[0]
            correct = concept[-1] if isinstance(concept[-1], str) else ", ".join(concept[1:])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_climate_fill",
                question_type="fill_blank",
                difficulty=bank.choice(["Easy", "Medium"]),
                competency_level="Remembering",
                question_text=q_text,
                correct_answer=correct,
                explanation="This is a fundamental concept in climatology related to the Indian syllabus.",
                marks=1, topic_tags=["Climate"]
            )

        elif q_type == "short_answer":
            sub = bank.choice(["Kharif_Rabi", "Cyclone", "Monsoon_Mechanism", "Jet_Stream"])
            if sub == "Kharif_Rabi":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_seasons",
                    question_type="short_answer",
                    difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Distinguish between Kharif and Rabi crops in terms of sowing season, harvesting season, "
                        "and major crops. Give two examples of each."
                    ),
                    correct_answer=(
                        "Kharif crops: Sown in June-July with monsoon onset, harvested in September-October. "
                        "Examples: Rice, Cotton, Jute, Sugarcane. "
                        "Rabi crops: Sown in October-November after monsoon withdrawal, harvested in March-April. "
                        "Examples: Wheat, Barley, Mustard, Gram."
                    ),
                    explanation=(
                        "Kharif (autumn) crops depend on monsoon rains and are grown during the rainy season. "
                        "Rabi (spring) crops are grown in the winter season using residual soil moisture and "
                        "irrigation. The distinction is based on the timing of sowing and harvesting relative "
                        "to monsoon seasons. India's diverse climate allows both types of agriculture."
                    ),
                    marks=2, topic_tags=["Climate", "Agriculture", "Monsoon"]
                )
            elif sub == "Cyclone":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_cyclone_sa",
                    question_type="short_answer",
                    difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Explain why the Bay of Bengal generates more tropical cyclones than the Arabian Sea. "
                        "Mention at least three reasons."
                    ),
                    correct_answer=(
                        "The Bay of Bengal generates more cyclones because: (1) It has warmer sea surface "
                        "temperatures (above 28 degrees C) over a larger area for most of the year. "
                        "(2) The Bay receives high rainfall and has low salinity surface waters, which increases "
                        "cyclogenesis. (3) The Bay's shape and shallow depth in the northern part cause rapid "
                        "intensification. (4) Tropical waves from the Pacific often cross into the Bay of Bengal."
                    ),
                    explanation=(
                        "Bay of Bengal cyclones are more frequent because of its geography: it is semi-enclosed, "
                        "has warm waters year-round, receives fresh water from major rivers reducing salinity, "
                        "and is exposed to easterly waves. The Arabian Sea is relatively cooler and more "
                        "restricted, though it has seen increased cyclonic activity recently due to warming oceans."
                    ),
                    marks=2, topic_tags=["Climate", "Cyclones"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_climate_sa",
                    question_type="short_answer",
                    difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Explain the mechanism of the South-West monsoon over India. Mention the role of "
                        "the ITCZ and the subtropical jet stream."
                    ),
                    correct_answer=(
                        "During summer, intense heating of the Tibetan Plateau creates a low-pressure area. "
                        "The ITCZ shifts northward to about 25 degrees N. The subtropical westerly jet "
                        "stream breaks and moves north of the Himalayas. Warm moist air from the Indian "
                        "Ocean (Arabian Sea and Bay of Bengal) rushes toward the low-pressure area over "
                        "north India, creating the South-West monsoon. The monsoon trough determines the "
                        "distribution of rainfall across India."
                    ),
                    explanation=(
                        "The monsoon mechanism involves differential heating between land and ocean, the "
                        "shift of the ITCZ, and reversal of wind patterns. The Tibetan Plateau acts as a "
                        "giant heat source in summer. These factors combine to draw in moisture-laden winds "
                        "from the ocean, bringing rainfall to most of India."
                    ),
                    marks=2, topic_tags=["Climate", "Monsoon"]
                )

        elif q_type == "numerical":
            lat = bank.randint(10, 30)
            temp_eq = bank.randint(20, 30)
            lapse = 6.5
            q_temp = temp_eq - (lapse * lat / 100)
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_climate_lapse",
                question_type="numerical",
                difficulty="Medium",
                competency_level="Applying",
                question_text=(
                    f"Using the normal lapse rate of 6.5 degrees C per 1000 m, calculate the expected "
                    f"temperature at a location at latitude {lat}N, if the equatorial temperature is "
                    f"{temp_eq} degrees C. (Assume the latitude effect is 0.5 degrees C per degree of latitude)"
                ),
                correct_answer=(
                    f"Latitude effect reduction = {lat} x 0.5 = {lat*0.5} degrees C. "
                    f"Temperature after latitude correction = {temp_eq} - {lat*0.5} = {temp_eq - lat*0.5} degrees C. "
                    f"Expected temperature at {lat}N = {q_temp:.1f} degrees C (approximate)."
                ),
                explanation=(
                    "Temperature decreases from equator toward poles due to the angle of incidence of "
                    "sun's rays. The normal lapse rate accounts for altitude-based cooling. Combined with "
                    "latitude effect (about 0.5 degrees C per degree latitude), we can estimate temperatures "
                    "at different locations."
                ),
                marks=2, topic_tags=["Climate", "Temperature", "Numerical"]
            )

        questions.append(question)
        return questions

    def _competency_climate(self) -> List[Question]:
        bank = self.bank
        questions = []

        # Competency-based: Case Study on El Nino and Monsoon Failure
        case = bank.choice(["el_nino_monsoon", "climate_refugees", "urban_heat_island"])

        if case == "el_nino_monsoon":
            yr_rain = bank.randint(600, 900)
            norm_rain = bank.randint(1000, 1200)
            farm_area = bank.randint(50000, 200000)
            loss_pct = bank.randint(15, 35)

            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_climate_el_nino_case",
                question_type="case_study",
                difficulty="Hard",
                competency_level="Evaluating",
                question_text=(
                    f"CASE STUDY: Maharashtra faced a severe drought in a year when El Nino was recorded "
                    f"in the Pacific Ocean. The state received only {yr_rain} mm rainfall against the normal "
                    f"of {norm_rain} mm. {farm_area} hectares of agricultural land were affected, causing "
                    f"a crop loss of approximately {loss_pct}%.\n\n"
                    f"(a) Explain how El Nino leads to monsoon failure over India.\n"
                    f"(b) Calculate the rainfall deficit percentage and discuss its impact on agriculture.\n"
                    f"(c) Suggest three measures the government can take to mitigate drought conditions in Maharashtra."
                ),
                correct_answer=(
                    f"(a) El Nino warms the eastern Pacific, weakening the Walker Circulation. This "
                    f"suppresses convection over the Indian Ocean, delays monsoon onset, and weakens "
                    f"monsoon circulation, leading to deficient rainfall.\n"
                    f"(b) Rainfall deficit = ({norm_rain} - {yr_rain})/{norm_rain} x 100 = "
                    f"{((norm_rain-yr_rain)/norm_rain)*100:.1f}%. This leads to crop failure, "
                    f"water scarcity, and farmer distress.\n"
                    f"(c) Measures: (i) Watershed management and rainwater harvesting, "
                    f"(ii) Drought-resistant crop varieties, (iii) Expansion of irrigation through "
                    f"micro-irrigation (drip/sprinkler) systems, (iv) Employment guarantee schemes."
                ),
                explanation=(
                    "This case integrates climate science with real-world policy challenges. El Nino "
                    "events in the Pacific disrupt the normal monsoon circulation over India through "
                    "ocean-atmosphere coupling. The economic and social impacts require coordinated "
                    "government responses combining traditional and modern approaches to water management."
                ),
                marks=6, topic_tags=["Climate", "El Nino", "Monsoon", "Case Study"]
            )
        elif case == "climate_refugees":
            city = bank.choice(["Mumbai", "Kolkata", "Chennai", "Guwahati"])
            sea_level_rise = bank.randint(30, 100)
            population_risk = bank.randint(5, 25)

            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_climate_refugees",
                question_type="case_study",
                difficulty="Hard",
                competency_level="Creating",
                question_text=(
                    f"CASE STUDY: Climate scientists project a sea-level rise of {sea_level_rise} cm by 2100. "
                    f"In {city}, approximately {population_risk} lakh people live in low-lying coastal areas "
                    f"vulnerable to flooding and storm surges.\n\n"
                    f"(a) Explain how climate change leads to sea-level rise and its connection to global warming.\n"
                    f"(b) Describe the likely impact on {city} and its residents.\n"
                    f"(c) Propose a comprehensive adaptation strategy for coastal cities in India."
                ),
                correct_answer=(
                    f"(a) Climate change causes thermal expansion of ocean water and melting of polar ice "
                    f"caps and glaciers. Both processes add water to the oceans, causing sea-level rise.\n"
                    f"(b) In {city}, sea-level rise would inundate low-lying areas, damage infrastructure, "
                    f"displace residents, increase salinity of groundwater, and destroy coastal ecosystems.\n"
                    f"(c) Adaptation strategies: (i) Building sea walls and coastal defenses, (ii) "
                    f"Restoring mangrove forests as natural barriers, (iii) Zoning regulations restricting "
                    f"construction in vulnerable zones, (iv) Early warning systems for floods."
                ),
                explanation=(
                    "This question connects atmospheric science to human geography. Coastal cities like "
                    "Mumbai, Kolkata, and Chennai face existential threats from climate change. The "
                    "Sundarbans in West Bengal are already experiencing significant land loss and displacement."
                ),
                marks=6, topic_tags=["Climate", "Climate Change", "Human Geography"]
            )
        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_climate_uhi",
                question_type="case_study",
                difficulty="Medium",
                competency_level="Analyzing",
                question_text=(
                    f"CASE STUDY: The city of {bank.choice(INDIAN_CITIES)} recorded an average summer "
                    f"temperature of {bank.randint(32,42)} degrees C in its central business district "
                    f"compared to {bank.randint(26,33)} degrees C in surrounding rural areas - a difference "
                    f"of over {bank.randint(4,8)} degrees C.\n\n"
                    f"(a) What is the Urban Heat Island (UHI) effect? Name two reasons for its occurrence.\n"
                    f"(b) How does UHI affect the local weather of the city?\n"
                    f"(c) Suggest measures to reduce the UHI effect in Indian cities."
                ),
                correct_answer=(
                    "(a) Urban Heat Island effect is the phenomenon where urban areas are significantly "
                    "warmer than surrounding rural areas. Reasons: (i) Concrete and asphalt absorb and "
                    "retain heat, (ii) Reduced vegetation and evapotranspiration, (iii) Heat from vehicles "
                    "and air conditioning, (iv) Tall buildings trap heat.\n"
                    "(b) UHI affects local weather by increasing convection, potentially enhancing "
                    "thunderstorms, altering wind patterns, and increasing energy demand for cooling.\n"
                    "(c) Measures: (i) Green roofs and vertical gardens, (ii) Increasing urban forests, "
                    "(iii) Using reflective building materials, (iv) White topping roads."
                ),
                explanation=(
                    "Urban Heat Island is a significant microclimate phenomenon in rapidly urbanizing "
                    "Indian cities. Delhi, Mumbai, and Kolkata all exhibit strong UHI effects, with city "
                    "centers being 3-6 degrees C warmer than outskirts. This exacerbates summer discomfort "
                    "and increases energy consumption."
                ),
                marks=6, topic_tags=["Climate", "Urban Heat Island", "Environment"]
            )

        questions.append(question)

        # Assertion-Reasoning question
        assertion = bank.choice([
            ("Assertion: The monsoon arrives in Kerala earlier than in Delhi.",
             "Reason: The South-West monsoon reaches the southern coast first and then progresses northwestward.",
             True, True, "Both Assertion and Reason are true and Reason is the correct explanation."),
            ("Assertion: Cyclones in the Bay of Bengal always move towards the west.",
             "Reason: The steering winds (trade winds and westerlies) guide cyclones westward.",
             False, False, "Assertion is false. Cyclones can recurve northward or northeastward depending "
             "on the subtropical ridge position. Bay of Bengal cyclones typically move northwestward initially "
             "but may recurve northeastward."),
            ("Assertion: La Nina brings above-normal rainfall to India.",
             "Reason: During La Nina, the Pacific Ocean cools more than normal, strengthening the Walker "
             "Circulation and enhancing the Indian monsoon.",
             True, True, "Both Assertion and Reason are true and Reason is the correct explanation. "
             "La Nina strengthens the monsoon circulation over India, typically resulting in above-normal rainfall."),
        ])

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_climate_assertion",
            question_type="assertion_reasoning",
            difficulty="Medium",
            competency_level="Analyzing",
            question_text=f"{assertion[0]}\n{assertion[1]}\n\nCodes:\n(A) Both A and R are true and R explains A.\n(B) Both A and R are true but R does not explain A.\n(C) A is true but R is false.\n(D) A is false but R is true.\n(E) Both A and R are false.",
            options=["(A) Both A and R are true and R explains A",
                     "(B) Both A and R are true but R does not explain A",
                     "(C) A is true but R is false",
                     "(D) A is false but R is true",
                     "(E) Both A and R are false"],
            correct_answer=assertion[4],
            explanation=assertion[4],
            marks=1, topic_tags=["Climate", "Assertion-Reasoning"]
        )
        questions.append(question)

        return questions


# ─── Topic 2: Soils ──────────────────────────────────────────────────────────

class SoilsGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_soils())
        else:
            questions.extend(self._standard_soils())
        return questions

    def _standard_soils(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            soil = bank.choice(SOIL_TYPES)
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_soils_mcq",
                question_type="mcq", difficulty=bank.choice(["Easy", "Medium"]),
                competency_level="Remembering",
                question_text=f"Which soil type is also known as 'Regur Soil'?",
                options=generate_mcq_options(bank, "Black Soil", SOIL_TYPES + ["Red Soil", "Alluvial Soil"]),
                correct_answer="Black Soil",
                explanation=(
                    "Black Soil (Regur Soil) is formed by the weathering of volcanic basaltic rocks. "
                    "It is rich in iron, magnesium, and lime. It is ideal for cotton cultivation and "
                    "is found extensively in the Deccan Trap region covering Maharashtra, Gujarat, and "
                    "parts of Madhya Pradesh. It has high water-retaining capacity and self-ploughing "
                    "characteristic (develops wide cracks when dry)."
                ),
                marks=1, topic_tags=["Soils", "Soil Types"]
            )

        elif q_type == "fill_blank":
            fill_data = bank.choice([
                ("The process of breaking down of rocks into smaller particles by natural agents is called ______.", "Weathering"),
                ("______ soil is most suitable for growing rice due to its high water retention capacity.", "Alluvial"),
                ("The black cotton soil of the Deccan region is also known as ______ soil.", "Regur"),
                ("Laterite soil gets its name from the Latin word 'later' meaning ______.", "brick"),
            ])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_soils_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=fill_data[0],
                correct_answer=fill_data[1],
                explanation="This is a fundamental concept in soil geography as per the ISC syllabus.",
                marks=1, topic_tags=["Soils"]
            )

        else:
            soil = bank.choice(SOIL_TYPES)
            state = bank.choice(["Maharashtra", "Tamil Nadu", "Kerala", "West Bengal", "Punjab"])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_soils_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Describe the characteristics, formation process, and agricultural importance "
                    f"of {soil}. Mention any state in India where it is prominently found."
                ),
                correct_answer=(
                    f"{soil} is characterized by [specific properties]. It is formed through "
                    f"[formation process]. It is prominently found in {state}. It is suitable for "
                    f"[crops]. This soil plays a crucial role in the agricultural economy of the region."
                ),
                explanation=(
                    f"Soil geography is a key topic in the ISC Class 12 syllabus. Each soil type has "
                    f"distinct characteristics determined by parent rock, climate, vegetation, and time. "
                    f"Understanding soil types and their distribution is essential for agricultural planning."
                ),
                marks=2, topic_tags=["Soils", soil]
            )

        questions.append(question)
        return questions

    def _competency_soils(self) -> List[Question]:
        bank = self.bank
        questions = []

        soil_choice = bank.choice(["alluvial", "black", "red", "laterite", "desert"])
        state_map = {
            "alluvial": ("Punjab", "Wheat and Rice"),
            "black": ("Maharashtra", "Cotton"),
            "red": ("Tamil Nadu", "Groundnut and Millets"),
            "laterite": ("Kerala", "Rubber and Cashew"),
            "desert": ("Rajasthan", "Bajra")
        }
        state, crops = state_map[soil_choice]

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_soils_competency",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                f"CASE STUDY: A group of agricultural scientists conducted a soil survey in {state} "
                f"and found that the dominant soil type was {soil_choice.title()} soil. The pH of the "
                f"soil ranged from {bank.randint(6,8)}.{bank.randint(0,9)} to {bank.randint(7,9)}.{bank.randint(0,9)}, "
                f"organic carbon content was {bank.randint(0,3)}.{bank.randint(0,9)}%, and the water "
                f"holding capacity was {bank.randint(20,60)}%.\n\n"
                f"(a) Describe the formation process of {soil_choice.title()} soil and the climatic "
                f"conditions required.\n"
                f"(b) Based on the given data, analyse whether the soil properties are suitable for "
                f"growing {crops}.\n"
                f"(c) Suggest soil conservation measures that should be adopted in {state}."
            ),
            correct_answer=(
                f"(a) {soil_choice.title()} soil forms through [formation process]. It requires "
                f"[climatic conditions]. The parent rock, temperature, rainfall, and vegetation all "
                f"contribute to its formation.\n"
                f"(b) The pH range of {bank.randint(6,8)}.{bank.randint(0,9)}-{bank.randint(7,9)}.{bank.randint(0,9)} "
                f"is suitable for {crops}. Organic carbon content of {bank.randint(0,3)}.{bank.randint(0,9)}% "
                f"indicates [fertility level]. Water holding capacity of {bank.randint(20,60)}% "
                f"means [suitability analysis].\n"
                f"(c) Conservation measures: (i) Contour ploughing on slopes, (ii) Terracing, "
                f"(iii) Afforestation, (iv) Crop rotation, (v) Organic manuring."
            ),
            explanation=(
                "This competency-based question integrates soil science with agricultural geography. "
                "Students must apply their knowledge of soil properties, crop requirements, and "
                "conservation techniques to solve a real-world problem."
            ),
            marks=5, topic_tags=["Soils", "Agriculture", "Case Study"]
        )
        questions.append(question)
        return questions


# ─── Topic 3: Natural Vegetation / Forests ──────────────────────────────────

class VegetationGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_vegetation())
        else:
            questions.extend(self._standard_vegetation())
        return questions

    def _standard_vegetation(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer", "long_answer"])

        if q_type == "mcq":
            sub = bank.choice(["mangrove", "deciduous", "social_forestry", "TIGER"])
            if sub == "mangrove":
                state = bank.choice(["West Bengal", "Odisha", "Andhra Pradesh", "Gujarat"])
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_veg_mangrove",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        f"Which of the following is the largest mangrove forest in India?"
                    ),
                    options=generate_mcq_options(
                        bank, "Sundarbans (West Bengal)",
                        ["Pichavaram (Tamil Nadu)", "Bhitarkanika (Odisha)",
                         "Coringa (Andhra Pradesh)", "Sundarbans (West Bengal)"]
                    ),
                    correct_answer="Sundarbans (West Bengal)",
                    explanation=(
                        "The Sundarbans in West Bengal is the largest mangrove ecosystem in India and "
                        "also a UNESCO World Heritage Site. It covers about 4,260 sq km and is home to "
                        "the Royal Bengal Tiger, estuarine crocodiles, and numerous other species. "
                        "The mangrove trees here have special adaptations like pneumatophores (breathing "
                        "roots) to survive in saline tidal waters."
                    ),
                    marks=1, topic_tags=["Vegetation", "Mangrove Forest", "Forest Types"]
                )
            elif sub == "deciduous":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_veg_deciduous",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        "In which type of forest do trees shed their leaves during the dry season?"
                    ),
                    options=generate_mcq_options(
                        bank, "Tropical Deciduous Forest",
                        ["Tropical Evergreen Forest", "Tropical Deciduous Forest",
                         "Montane Forest", "Mangrove Forest"]
                    ),
                    correct_answer="Tropical Deciduous Forest",
                    explanation=(
                        "Tropical Deciduous (Monsoon) Forests are characterized by trees that shed their "
                        "leaves during the dry winter season (approximately 6-8 weeks) to conserve water. "
                        "These forests receive 70-200 cm of rainfall and include both moist and dry "
                        "deciduous varieties. Trees include teak, sal, sandalwood, and mahua."
                    ),
                    marks=1, topic_tags=["Vegetation", "Forest Types"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_veg_social",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Which of the following is NOT a component of Social Forestry in India?"
                    ),
                    options=generate_mcq_options(
                        bank, "Commercial mining of forest resources",
                        ["Farm Forestry", "Community Forestry",
                         "Extension Forestry", "Commercial mining of forest resources"]
                    ),
                    correct_answer="Commercial mining of forest resources",
                    explanation=(
                        "Social Forestry has three main components: (1) Farm Forestry - growing trees "
                        "on farmland, (2) Community Forestry - raising trees on community land, "
                        "(3) Extension Forestry - growing trees along roads, canals, and railways. "
                        "Commercial mining is not a part of social forestry and is actually detrimental "
                        "to forest resources."
                    ),
                    marks=1, topic_tags=["Vegetation", "Social Forestry", "Conservation"]
                )

        elif q_type == "fill_blank":
            fill_data = bank.choice([
                ("The ______ forest type is found in the Andaman and Nicobar Islands and receives over 200 cm of rainfall.", "Tropical Evergreen"),
                ("______ forest is commercially the most important forest type in India.", "Tropical Deciduous (Monsoon)"),
                ("The ______ Project in India aims to increase forest cover to 33% of the geographical area.", "National Afforestation"),
                ("Teak and Sal are characteristic trees of ______ forests.", "Monsoon Deciduous"),
            ])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_veg_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=fill_data[0],
                correct_answer=fill_data[1],
                explanation="This is a standard question on forest types from the ISC syllabus.",
                marks=1, topic_tags=["Vegetation"]
            )

        elif q_type == "long_answer":
            sub = bank.choice(["forest_types", "social_forestry", "conservation"])
            if sub == "forest_types":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_veg_la",
                    question_type="long_answer",
                    difficulty="Hard",
                    competency_level="Analyzing",
                    question_text=(
                        "Classify the major types of forests found in India. For each type, describe "
                        "the climatic conditions, characteristics, representative trees, and geographical "
                        "distribution. Explain why Tropical Deciduous forests are the most widespread "
                        "in India."
                    ),
                    correct_answer=(
                        "Major forest types in India:\n"
                        "1. Tropical Evergreen: Rainfall >200 cm, found in Andaman-Nicobar, "
                        "Western Ghats, NE India. Trees: Mahogany, Rosewood, Ebony.\n"
                        "2. Tropical Deciduous (Monsoon): Rainfall 70-200 cm, most widespread. "
                        "Moist deciduous (teak, sal) and Dry deciduous (babul, tendu). Found across "
                        "central India, Himalayan foothills, Deccan plateau.\n"
                        "3. Montane (Himalayan): Altitude 1500-3500m, coniferous trees (pine, deodar, "
                        "fir, spruce). Found in Himalayan ranges.\n"
                        "4. Mangrove (Tidal): Coastal saline areas, Sundarbans, Bhitarkanika, Pichavaram. "
                        "Sundri, Garjan.\n"
                        "5. Thorn and Scrub: Arid/semi-arid areas, Thorny trees (babul, kikar, date palm). "
                        "Found in Rajasthan, Gujarat.\n\n"
                        "Tropical Deciduous forests are most widespread because most of India experiences "
                        "a monsoon climate with distinct wet and dry seasons. This climate supports "
                        "deciduous species that shed leaves in the dry season. The vast area of central "
                        "India, Deccan plateau, and Himalayan foothills receive 70-200 cm rainfall ideal "
                        "for these forests."
                    ),
                    explanation=(
                        "Forest types in India are classified by the Champion and Seth system into "
                        "five major groups. The classification is based on rainfall, temperature, and "
                        "edaphic factors. Tropical Deciduous forests cover the largest area because "
                        "the monsoon climate prevails over the largest land area."
                    ),
                    marks=5, topic_tags=["Vegetation", "Forest Types", "Long Answer"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_veg_conservation",
                    question_type="long_answer",
                    difficulty="Hard",
                    competency_level="Evaluating",
                    question_text=(
                        "Discuss the major threats to forest resources in India. Explain how "
                        "social forestry and joint forest management can help in forest conservation. "
                        "Mention the role of the Forest Conservation Act, 1980."
                    ),
                    correct_answer=(
                        "Threats: (1) Deforestation for agriculture and urbanization, "
                        "(2) Shifting cultivation (jhum) in NE India, (3) Industrial development "
                        "and mining, (4) Forest fires, (5) Overgrazing, (6) Illegal timber trade.\n\n"
                        "Social Forestry: (1) Farm Forestry - trees on farmland for timber/fuel, "
                        "(2) Community Forestry - trees on village common land, (3) Extension Forestry "
                        "- trees along roads, canals.\n\n"
                        "Joint Forest Management (JFM): Partnership between forest departments and "
                        "local communities. Communities protect forests in exchange for a share of "
                        "produce and benefits. Started in Odisha (1988).\n\n"
                        "Forest Conservation Act, 1980: Restricts conversion of forest land for "
                        "non-forest purposes. Requires central government approval for diversion "
                        "of forest land. Has helped reduce deforestation rates."
                    ),
                    explanation=(
                        "Forest conservation is critical for biodiversity, climate regulation, and "
                        "livelihoods of forest-dependent communities. India's forest cover is about "
                        "24.56% of the geographical area. Social forestry and JFM have been successful "
                        "in engaging local communities in conservation."
                    ),
                    marks=5, topic_tags=["Vegetation", "Forest Conservation"]
                )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_veg_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Explain the importance of mangrove forests with special reference to the "
                    f"{bank.choice(MANGROVE_REGIONS)} in India. Mention any two adaptations of "
                    f"mangrove plants."
                ),
                correct_answer=(
                    "Importance of mangroves: (1) Coastal protection from storms and tsunamis, "
                    "(2) Nursery grounds for fish and marine life, (3) Carbon sequestration, "
                    "(4) Timber and medicinal resources, (5) Tourism and ecotourism.\n"
                    "Adaptations: (1) Pneumatophores (breathing roots) that rise above water for "
                    "gas exchange, (2) Vivipary - seeds germinate while still attached to the parent plant, "
                    "(3) Salt-excreting glands on leaves, (4) Buttress roots for stability in soft mud."
                ),
                explanation=(
                    "Mangrove forests are unique ecosystems found in intertidal zones. They provide "
                    "critical ecosystem services including coastal protection, fisheries support, and "
                    "carbon storage. The Sundarbans, the largest mangrove forest, is a UNESCO World "
                    "Heritage Site and home to the Royal Bengal Tiger."
                ),
                marks=2, topic_tags=["Vegetation", "Mangrove Forest"]
            )

        questions.append(question)
        return questions

    def _competency_vegetation(self) -> List[Question]:
        bank = self.bank
        questions = []

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_veg_comp",
            question_type="assertion_reasoning",
            difficulty="Medium",
            competency_level="Analyzing",
            question_text=(
                "Assertion: Tropical Evergreen forests in India have a multi-layered structure.\n"
                "Reason: Heavy rainfall throughout the year allows continuous growth and competition "
                "for sunlight, leading to stratified vegetation layers.\n\n"
                "Codes:\n(A) Both A and R are true and R explains A.\n"
                "(B) Both A and R are true but R does not explain A.\n"
                "(C) A is true but R is false.\n"
                "(D) A is false but R is true.\n"
                "(E) Both A and R are false."
            ),
            options=["(A) Both A and R are true and R explains A",
                     "(B) Both A and R are true but R does not explain A",
                     "(C) A is true but R is false",
                     "(D) A is false but R is true",
                     "(E) Both A and R are false"],
            correct_answer="(A) Both A and R are true and R explains A.",
            explanation=(
                "Tropical Evergreen forests have a complex multi-layered structure: the upper "
                "canopy (30-45m tall emergent trees), middle canopy, understory, and forest floor. "
                "Heavy rainfall (>200 cm) and constant warmth support year-round growth and intense "
                "competition for light, leading to this stratification. This is typical of rainforests "
                "worldwide, including those in the Western Ghats and Andaman Islands."
            ),
            marks=1, topic_tags=["Vegetation", "Tropical Evergreen", "Assertion-Reasoning"]
        )
        questions.append(question)
        return questions


# ─── Topic 4: Water Resources ────────────────────────────────────────────────

class WaterResourcesGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_water())
        else:
            questions.extend(self._standard_water())
        return questions

    def _standard_water(self) -> List[Question]:
        bank = self.bank
        questions = []

        q_type = bank.choice(["mcq", "fill_blank", "short_answer", "numerical"])

        if q_type == "mcq":
            sub = bank.choice(["irrigation", "groundwater", "dam", "watershed"])
            if sub == "irrigation":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_water_irrigation",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        "Which method of irrigation is most water-efficient and suitable for "
                        "hilly terrain and arid regions?"
                    ),
                    options=generate_mcq_options(
                        bank, "Drip irrigation",
                        ["Flood irrigation", "Canal irrigation",
                         "Drip irrigation", "Sprinkler irrigation"]
                    ),
                    correct_answer="Drip irrigation",
                    explanation=(
                        "Drip irrigation delivers water directly to the plant root zone through "
                        "a network of valves, pipes, tubing, and emitters. It can save 30-70% of "
                        "water compared to flood irrigation. It is especially suitable for arid regions "
                        "and hilly terrain where water availability is limited. Maharashtra, Gujarat, "
                        "and Rajasthan have widely adopted drip irrigation for crops like cotton, "
                        "sugarcane, and grapes."
                    ),
                    marks=1, topic_tags=["Water Resources", "Irrigation"]
                )
            elif sub == "groundwater":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_water_gw",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "The process of artificially recharging groundwater by directing surface "
                        "water into the ground is called:"
                    ),
                    options=generate_mcq_options(
                        bank, "Artificial recharge",
                        ["Desalination", "Artificial recharge",
                         "Watershed management", "Groundwater mining"]
                    ),
                    correct_answer="Artificial recharge",
                    explanation=(
                        "Artificial groundwater recharge involves channeling surface water into "
                        "the ground through recharge wells, percolation tanks, check dams, and "
                        "infiltration pits. This helps replenish depleted aquifers, particularly "
                        "in over-exploited areas. The Central Ground Water Board promotes rainwater "
                        "harvesting and artificial recharge structures across India."
                    ),
                    marks=1, topic_tags=["Water Resources", "Groundwater"]
                )
            elif sub == "dam":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_water_dam",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Which river valley project in Tamil Nadu is a multipurpose project "
                        "providing irrigation, drinking water, and hydroelectric power?"
                    ),
                    options=generate_mcq_options(
                        bank, "Mettur Dam",
                        ["Bhakra Nangal", "Mettur Dam",
                         "Hirakud Dam", "Nagarjuna Sagar"]
                    ),
                    correct_answer="Mettur Dam",
                    explanation=(
                        "The Mettur Dam on the Cauvery River in Tamil Nadu was completed in 1934. "
                        "It is one of the oldest and largest dams in India. It provides irrigation to "
                        "extensive areas in Tamil Nadu, drinking water to Chennai, and hydroelectric "
                        "power. The reservoir (Stanley Reservoir) has a capacity of about 93.47 TMC."
                    ),
                    marks=1, topic_tags=["Water Resources", "Dams", "Tamil Nadu"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_water_ws",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Understanding",
                    question_text=(
                        "What is a watershed?"
                    ),
                    options=generate_mcq_options(
                        bank, "A geographical area where all water drains to a common outlet",
                        ["A man-made water storage tank",
                         "A geographical area where all water drains to a common outlet",
                         "A type of irrigation canal",
                         "A boundary between two drainage basins"]
                    ),
                    correct_answer="A geographical area where all water drains to a common outlet",
                    explanation=(
                        "A watershed (also called a drainage basin or catchment area) is the land "
                        "area from which all precipitation flows to a common outlet - typically a "
                        "river, lake, or reservoir. Watershed management involves treating the "
                        "watershed as a unit for soil conservation, water harvesting, and sustainable "
                        "land use. The River Valley Projects in India are based on watershed management principles."
                    ),
                    marks=1, topic_tags=["Water Resources", "Watershed Management"]
                )

        elif q_type == "fill_blank":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_water_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    f"The {bank.choice(WATERBODIES)} has the highest replenishable groundwater "
                    f"potential among Indian river basins."
                ),
                correct_answer=bank.choice(["Ganga River", "Godavari River", "Brahmaputra River"]),
                explanation="Groundwater potential varies among river basins based on rainfall and geological formations.",
                marks=1, topic_tags=["Water Resources", "Groundwater"]
            )

        elif q_type == "short_answer":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_water_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Explain the significance of rainwater harvesting in solving India's water "
                    f"crisis. Mention any two traditional methods practiced in India."
                ),
                correct_answer=(
                    "Rainwater harvesting is significant because: (1) It recharges groundwater "
                    "aquifers, reducing dependency on deep tube wells. (2) It reduces soil erosion "
                    "and flooding in urban areas. (3) It improves water quality by natural filtration.\n"
                    "Traditional methods: (1) 'Kunds' in Rajasthan - underground water storage, "
                    "(2) 'Khadins' in Rajasthan - embanked fields that capture runoff, "
                    "(3) 'Johads' in Haryana/Rajasthan - earthen check dams, "
                    "(4) 'Tankas' in Gujarat - underground tanks for drinking water."
                ),
                explanation=(
                    "Rainwater harvesting is an ancient Indian practice that is being revived to "
                    "combat groundwater depletion. Many states including Tamil Nadu have made it "
                    "mandatory. Traditional systems like Johads in Alwar district have dramatically "
                    "improved groundwater levels."
                ),
                marks=2, topic_tags=["Water Resources", "Rainwater Harvesting"]
            )

        elif q_type == "numerical":
            area = bank.randint(100000, 500000)
            rain = bank.randint(80, 150)
            runoff_coeff = bank.randint(20, 60) / 100
            potential = area * rain * runoff_coeff / 10

            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_water_numerical",
                question_type="numerical",
                difficulty="Hard",
                competency_level="Applying",
                question_text=(
                    f"A watershed area of {area} hectares receives an average annual rainfall of "
                    f"{rain} cm. If the runoff coefficient is {runoff_coeff:.2f}, calculate the "
                    f"total runoff volume (in million cubic metres). If 40% of this runoff can be "
                    f"harvested, find the harvestable water volume."
                ),
                correct_answer=(
                    f"Total runoff = {area} ha x {rain} cm x {runoff_coeff:.2f} = "
                    f"{area * rain * runoff_coeff:.0f} hectare-cm = "
                    f"{(area * rain * runoff_coeff) / 10000:.2f} million cubic metres.\n"
                    f"Harvestable water = 40% of {(area * rain * runoff_coeff)/10000:.2f} = "
                    f"{(area * rain * runoff_coeff) / 10000 * 0.4:.2f} million cubic metres."
                ),
                explanation=(
                    "Runoff calculation: Volume = Area x Rainfall x Runoff Coefficient. "
                    "Runoff coefficient represents the fraction of rainfall that becomes surface "
                    "runoff (the rest infiltrates or evaporates). This calculation helps in planning "
                    "water harvesting structures in a watershed."
                ),
                marks=2, topic_tags=["Water Resources", "Numerical"]
            )

        questions.append(question)
        return questions

    def _competency_water(self) -> List[Question]:
        bank = self.bank
        questions = []

        state = bank.choice(["Tamil Nadu", "Karnataka", "Maharashtra", "Rajasthan", "Gujarat"])
        problem = bank.choice(["drought", "flood", "groundwater_depletion"])

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_water_comp",
            question_type="case_study",
            difficulty="Hard",
            competency_level="Evaluating",
            question_text=(
                f"CASE STUDY: {state} faces significant {problem} challenges. The groundwater table "
                f"has declined by {bank.randint(30,100)} cm in the past decade. Surface water "
                f"availability per capita has dropped to {bank.randint(800,3000)} cubic metres, "
                f"well below the national average of {bank.randint(1500,2000)} cubic metres.\n\n"
                f"(a) Analyse the causes of {problem} in {state}.\n"
                f"(b) Calculate the per capita water availability deficit compared to the national average.\n"
                f"(c) Suggest a comprehensive water management plan for the state."
            ),
            correct_answer=(
                f"(a) Causes of {problem} in {state}: [climate factors, over-extraction, poor "
                f"management, population pressure, industrial demand].\n"
                f"(b) Water deficit = National average - State availability = "
                f"[calculation] cubic metres per capita.\n"
                f"(c) Plan: (i) Rainwater harvesting mandate, (ii) Micro-irrigation expansion, "
                f"(iii) Inter-basin water transfer, (iv) Wastewater treatment and reuse, "
                f"(v) Community-based water management, (vi) Pricing reforms."
            ),
            explanation=(
                "India faces a severe water crisis with many states classified as water-stressed "
                "or water-scarce. Comprehensive water management combining supply augmentation, "
                "demand management, and institutional reforms is essential. The Jal Shakti Ministry "
                "and the National Water Mission address these challenges."
            ),
            marks=5, topic_tags=["Water Resources", "Water Management", "Case Study"]
        )
        questions.append(question)
        return questions


# ─── Topic 5: Minerals and Energy Resources ──────────────────────────────────

class MineralsGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_minerals())
        else:
            questions.extend(self._standard_minerals())
        return questions

    def _standard_minerals(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            mineral = bank.choice(["Iron Ore", "Coal", "Mica", "Bauxite", "Manganese"])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_minerals_mcq",
                question_type="mcq", difficulty="Easy",
                competency_level="Remembering",
                question_text=f"Which mineral is primarily used in the manufacture of aluminium?",
                options=generate_mcq_options(bank, "Bauxite", ["Iron Ore", "Coal", "Bauxite", "Mica"]),
                correct_answer="Bauxite",
                explanation=(
                    "Bauxite is the principal ore of aluminium. India is one of the top ten bauxite "
                    "producers globally, with major reserves in Odisha (Kalahandi, Sambalpur), "
                    "Jharkhand (Lohardaga), Gujarat (Kutch), and Madhya Pradesh (Amarkantak). "
                    "Bauxite forms in tropical and subtropical climates through intense weathering "
                    "of aluminous rocks (lateritization). The NALCO refinery at Damanjodi, Odisha "
                    "is one of the largest aluminium plants in India."
                ),
                marks=1, topic_tags=["Minerals", "Bauxite", "Metallic Minerals"]
            )

        elif q_type == "fill_blank":
            fill_data = bank.choice([
                ("India is the largest producer of ______ in the world.", "Mica"),
                ("The largest coal reserves in India are found in the ______ basin.", "Damodar"),
                ("______ is a non-conventional energy source harnessed from the Earth's internal heat.", "Geothermal Energy"),
                ("The ______ Hills of Odisha are rich in iron ore deposits.", "Kendujhar (Keonjhar)"),
            ])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_minerals_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=fill_data[0],
                correct_answer=fill_data[1],
                explanation="Standard question on mineral resources from the ISC syllabus.",
                marks=1, topic_tags=["Minerals"]
            )

        else:
            energy = bank.choice(["Solar", "Wind", "Tidal", "Geothermal"])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_minerals_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Explain the importance of {energy} energy as a non-conventional energy "
                    f"source for India. Mention one major advantage over conventional fossil fuels."
                ),
                correct_answer=(
                    f"{energy} energy importance: (1) It is renewable and inexhaustible, "
                    f"(2) It is environmentally clean with no greenhouse gas emissions during operation, "
                    f"(3) It reduces dependency on imported fossil fuels, "
                    f"(4) It creates employment in rural areas, "
                    f"(5) It aligns with India's climate commitments.\n"
                    f"Advantage: {energy} energy does not produce air pollution, carbon emissions, "
                    f"or hazardous waste unlike fossil fuels."
                ),
                explanation=(
                    "India has significant potential for non-conventional energy: solar (JNNSM target "
                    "of 100 GW), wind (Tamil Nadu, Gujarat, Maharashtra lead), and others. "
                    "Transitioning to renewable energy is critical for energy security and climate goals."
                ),
                marks=2, topic_tags=["Minerals", "Non-Conventional Energy"]
            )

        questions.append(question)
        return questions

    def _competency_minerals(self) -> List[Question]:
        bank = self.bank
        questions = []

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_minerals_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Analyzing",
            question_text=(
                f"CASE STUDY: The Kudremukh Iron Ore Mine in Karnataka was closed in 2006 after "
                f"operating for {bank.randint(25,40)} years. The mine produced {bank.randint(20,40)} "
                f"million tonnes of iron ore annually and was a major employer for local communities "
                f"in the Western Ghats, a biodiversity hotspot.\n\n"
                f"(a) Explain why mining in the Western Ghats posed environmental concerns.\n"
                f"(b) Discuss the trade-offs between mineral development and environmental protection "
                f"in ecologically sensitive areas.\n"
                f"(c) Suggest an approach for sustainable mining that balances economic and "
                f"environmental interests."
            ),
            correct_answer=(
                "(a) Environmental concerns: (1) Deforestation of the Western Ghats biodiversity "
                "hotspot, (2) Water pollution from tailings and waste affecting rivers, "
                "(3) Disruption of wildlife corridors and habitat fragmentation, "
                "(4) Soil erosion and landslides on steep slopes, "
                "(5) Air pollution from dust and ore processing.\n"
                "(b) Trade-offs: Mining provides economic benefits (employment, revenue, raw materials "
                "for industries) but at the cost of ecosystem damage, biodiversity loss, and impacts "
                "on local communities' livelihoods (agriculture, fisheries).\n"
                "(c) Approach: (1) Strict Environmental Impact Assessment (EIA) before approval, "
                "(2) Progressive mine closure and reclamation, (3) Use of cleaner extraction "
                "technologies, (4) Community benefit sharing, (5) Mining in non-forest areas first, "
                "(6) Regular environmental monitoring."
            ),
            explanation=(
                "The Kudremukh mine closure is a landmark case in India's environmental history. "
                "It highlighted the conflict between development and conservation in ecologically "
                "sensitive areas. The Supreme Court ordered the closure based on ecological concerns "
                "and the area's status as a biodiversity hotspot and tiger reserve."
            ),
            marks=5, topic_tags=["Minerals", "Environment", "Case Study"]
        )
        questions.append(question)

        # Assertion-Reasoning
        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_minerals_ar",
            question_type="assertion_reasoning",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                "Assertion: Mica exports from India have declined significantly in recent decades.\n"
                "Reason: Synthetic substitutes have replaced natural mica in most electronic applications.\n\n"
                "Codes:\n(A) Both A and R are true and R explains A.\n"
                "(B) Both A and R are true but R does not explain A.\n"
                "(C) A is true but R is false.\n"
                "(D) A is false but R is true.\n"
                "(E) Both A and R are false."
            ),
            options=["(A) Both A and R are true and R explains A",
                     "(B) Both A and R are true but R does not explain A",
                     "(C) A is true but R is false",
                     "(D) A is false but R is true",
                     "(E) Both A and R are false"],
            correct_answer="(A) Both A and R are true and R explains A.",
            explanation=(
                "India was the world's largest mica producer but exports have declined because "
                "synthetic alternatives (like mylar film and titanium dioxide) replaced natural "
                "mica in the electronics industry. Additionally, mining bans in Jharkhand and "
                "Bihar affected production. India now imports mica from China and other countries."
            ),
            marks=1, topic_tags=["Minerals", "Mica", "Assertion-Reasoning"]
        )
        questions.append(question)
        return questions


# ─── Topic 6: Agriculture ────────────────────────────────────────────────────

class AgricultureGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_agriculture())
        else:
            questions.extend(self._standard_agriculture())
        return questions

    def _standard_agriculture(self) -> List[Question]:
        bank = self.bank
        questions = []

        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            crop = bank.choice(["Rice", "Wheat", "Cotton", "Tea", "Coffee", "Sugarcane"])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_agri_mcq",
                question_type="mcq", difficulty=bank.choice(["Easy", "Medium"]),
                competency_level="Remembering",
                question_text=f"Which crop is known as the 'Golden Fibre' of India?",
                options=generate_mcq_options(
                    bank, "Cotton",
                    ["Rice", "Wheat", "Cotton", "Jute"]
                ),
                correct_answer="Cotton",
                explanation=(
                    "Cotton is known as the 'Golden Fibre' because of its economic importance "
                    "and golden-yellow colour of raw cotton. It is a Kharif crop requiring "
                    "black or regur soil, a warm climate (25-35 degrees C), moderate rainfall "
                    "(50-100 cm), and bright sunshine. Major cotton-growing states: Maharashtra, "
                    "Gujarat, Telangana, Andhra Pradesh. India is the largest cotton producer "
                    "globally and the second-largest exporter."
                ),
                marks=1, topic_tags=["Agriculture", "Cotton", "Cash Crops"]
            )

        elif q_type == "fill_blank":
            crop = bank.choice(["Tea", "Coffee", "Rubber", "Sugarcane"])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_agri_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=f"______ plantations in India require a warm, humid climate and are mainly found in the hill slopes of Assam and Nilgiris.",
                correct_answer=crop,
                explanation=f"{crop} cultivation requires specific agro-climatic conditions found in India's hilly regions.",
                marks=1, topic_tags=["Agriculture", crop]
            )

        else:
            crop = bank.choice(["Rice", "Wheat", "Tea"])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_agri_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Describe the geographical conditions required for growing {crop} in India. "
                    f"Name the major {crop}-producing states and explain why they are suitable."
                ),
                correct_answer=(
                    f"{crop} requires: (1) Temperature: 20-27 degrees C, (2) Rainfall: 150-300 cm "
                    f"(rice) or 50-75 cm (wheat), (3) Fertile alluvial or black soil, (4) Flat terrain "
                    f"for paddy fields, (5) Labour-intensive cultivation.\n"
                    f"Major producing states: [varies by crop]. These states have [suitable conditions]."
                ),
                explanation=(
                    "Agricultural geography is a core topic in the ISC syllabus. Each crop has "
                    "specific agro-climatic requirements. Understanding the relationship between "
                    "physical geography and agricultural patterns is essential."
                ),
                marks=2, topic_tags=["Agriculture", crop]
            )

        questions.append(question)
        return questions

    def _competency_agriculture(self) -> List[Question]:
        bank = self.bank
        questions = []

        crop = bank.choice(["Rice", "Wheat", "Cotton", "Tea", "Sugarcane"])
        states = {
            "Rice": "West Bengal, Punjab, Uttar Pradesh",
            "Wheat": "Uttar Pradesh, Punjab, Haryana",
            "Cotton": "Maharashtra, Gujarat, Telangana",
            "Tea": "Assam, Darjeeling (West Bengal), Nilgiris (Tamil Nadu)",
            "Sugarcane": "Uttar Pradesh, Maharashtra, Karnataka"
        }
        prod_states = states.get(crop, "Various states")

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_agri_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                f"CASE STUDY: A group of farmers in {bank.choice(INDIAN_STATES)} wants to diversify "
                f"from traditional {crop.lower()} cultivation to a more profitable crop. The region "
                f"has {bank.randint(70,200)} cm annual rainfall, {bank.randint(20,35)} degrees C "
                f"average temperature, and {bank.choice(['alluvial', 'black', 'red', 'loamy'])} soil. "
                f"Land holdings average {bank.randint(1,5)} hectares per family.\n\n"
                f"(a) Analyse whether the current conditions are suitable for {crop} cultivation.\n"
                f"(b) Suggest an alternative commercial crop that could be more profitable.\n"
                f"(c) Discuss the challenges of crop diversification for small farmers."
            ),
            correct_answer=(
                f"(a) Analysis of {crop} suitability: [assessment of rainfall, temperature, "
                f"soil conditions].\n"
                f"(b) Alternative crop: [suggest a crop suited to the conditions]. "
                f"Rationale: [market demand, profitability, risk factors].\n"
                f"(c) Challenges: (1) Limited capital for new inputs/seeds, "
                f"(2) Lack of market access and assured buyers, (3) Risk of price volatility, "
                f"(4) Need for new skills/knowledge, (5) Land fragmentation limiting economies of scale."
            ),
            explanation=(
                "This case study connects physical geography with agricultural economics and "
                "rural development. Crop diversification is an important strategy for increasing "
                "farm incomes and reducing risk, but it requires addressing structural challenges "
                "facing small and marginal farmers."
            ),
            marks=5, topic_tags=["Agriculture", "Crop Diversification", "Case Study"]
        )
        questions.append(question)
        return questions


# ─── Topic 7: Manufacturing Industries ──────────────────────────────────────

class IndustriesGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_industries())
        else:
            questions.extend(self._standard_industries())
        return questions

    def _standard_industries(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            industry = bank.choice(["Iron and Steel", "Cotton Textile", "IT", "Automobile"])
            if industry == "Iron and Steel":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_ind_ist",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        "Which city is known as the 'Steel City of India'?"
                    ),
                    options=generate_mcq_options(
                        bank, "Jamshedpur",
                        ["Rourkela", "Durgapur", "Bhilai", "Jamshedpur"]
                    ),
                    correct_answer="Jamshedpur",
                    explanation=(
                        "Jamshedpur in Jharkhand is known as the 'Steel City of India'. It houses "
                        "the Tata Iron and Steel Company (TISCO), established in 1907 by Jamsetji Tata. "
                        "It was India's first large-scale integrated steel plant. Other major steel "
                        "plants: Rourkela (Rourkela Steel Plant - SAIL, Odisha), Durgapur (Durgapur "
                        "Steel Plant - SAIL, West Bengal), Bhilai (Bhilai Steel Plant - SAIL, "
                        "Chhattisgarh). These are located near coal fields and iron ore deposits."
                    ),
                    marks=1, topic_tags=["Industries", "Iron and Steel"]
                )
            elif industry == "IT":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_ind_it",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        "Which city is known as the 'Silicon Valley of India'?"
                    ),
                    options=generate_mcq_options(
                        bank, "Bangalore",
                        ["Hyderabad", "Chennai", "Mumbai", "Bangalore"]
                    ),
                    correct_answer="Bangalore",
                    explanation=(
                        "Bangalore (Bengaluru), the capital of Karnataka, is known as the 'Silicon "
                        "Valley of India'. It is the hub of India's information technology industry, "
                        "hosting major IT companies like Infosys, Wipro, and TCS, as well as "
                        "international giants like Google, Microsoft, and Amazon. Factors for its "
                        "IT growth: (1) Pleasant climate, (2) Presence of premier educational "
                        "institutions (IISc, IIM-B), (3) Availability of skilled English-speaking "
                        "workforce, (4) Proactive government policy, (5) Infrastructure development."
                    ),
                    marks=1, topic_tags=["Industries", "IT Industry", "Bangalore"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_ind_cotton",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "The cotton textile industry in India is concentrated in Maharashtra "
                        "and Gujarat mainly because of:"
                    ),
                    options=generate_mcq_options(
                        bank, "Availability of raw cotton and humid climate",
                        ["Availability of raw cotton and humid climate",
                         "High population density providing cheap labour only",
                         "Presence of coal reserves only",
                         "Proximity to ports only"]
                    ),
                    correct_answer="Availability of raw cotton and humid climate",
                    explanation=(
                        "The cotton textile industry requires: (1) Raw material (cotton) - Gujarat "
                        "and Maharashtra are major cotton-producing states, (2) Humid climate - "
                        "prevents cotton thread from breaking during spinning (Mumbai and Ahmedabad "
                        "have coastal humid climates), (3) Labour, (4) Capital, (5) Market access. "
                        "Both raw material and climate factors are critical."
                    ),
                    marks=1, topic_tags=["Industries", "Cotton Textile"]
                )

        elif q_type == "fill_blank":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_ind_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    f"The {bank.choice(['Chota Nagpur', 'Singhbhum', 'Sundergarh'])} plateau "
                    f"region is called the 'Ruhr of India' due to its concentration of "
                    f"______ and heavy industries."
                ),
                correct_answer="mineral-based",
                explanation="The Chota Nagpur plateau is rich in coal, iron ore, and other minerals, supporting heavy industries.",
                marks=1, topic_tags=["Industries", "Industrial Regions"]
            )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_ind_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Explain the factors responsible for the location of the Iron and Steel "
                    f"industry at Jamshedpur. Mention at least four factors."
                ),
                correct_answer=(
                    "Factors: (1) Proximity to iron ore deposits of the Singhbhum district, "
                    "(2) Nearness to coal fields of Jharia and Raniganj, "
                    "(3) Availability of water from the Subarnarekha River, "
                    "(4) Flat land suitable for building the plant, "
                    "(5) Railway connectivity (part of the Great Indian Peninsular Railway), "
                    "(6) Vision of Jamsetji Tata for self-reliant industrialization."
                ),
                explanation=(
                    "Jamshedpur was ideally located near raw materials (iron ore and coal), which "
                    "reduces transportation costs. The location follows the weight-losing industry "
                    "principle where raw materials are heavier than the finished product."
                ),
                marks=2, topic_tags=["Industries", "Iron and Steel"]
            )

        questions.append(question)
        return questions

    def _competency_industries(self) -> List[Question]:
        bank = self.bank
        questions = []

        region = bank.choice(["Bengaluru", "Hyderabad", "Pune", "Chennai", "Gurgaon"])
        investment = bank.randint(100, 500)
        jobs = bank.randint(5000, 50000)

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_ind_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                f"CASE STUDY: The state government of {bank.choice(INDIAN_STATES)} has announced "
                f"a Rs {investment} crore investment package to establish a new electronics "
                f"manufacturing hub near {region}. The project is expected to create {jobs} direct "
                f"jobs and {jobs*3} indirect jobs over 5 years.\n\n"
                f"(a) List the factors that make this location suitable for electronics manufacturing.\n"
                f"(b) Analyse the economic and social impact of this industrial project on the region.\n"
                f"(c) Discuss potential environmental concerns and how they can be mitigated."
            ),
            correct_answer=(
                "(a) Location factors: (1) Proximity to skilled workforce, "
                "(2) Good connectivity (airport, port access), "
                "(3) Existing industrial ecosystem, (4) Government incentives, "
                "(5) Land availability, (6) Quality of life for employees.\n"
                "(b) Impact: Economic - increased GDP, foreign investment, tax revenue. Social - "
                "employment generation, skill development, urban infrastructure development. "
                "Also risks: rising cost of living, inequality, social displacement.\n"
                "(c) Environmental concerns: Industrial pollution, e-waste generation, increased "
                "energy consumption, water scarcity. Mitigation: (i) Zero liquid discharge policy, "
                "(ii) E-waste recycling facilities, (iii) Renewable energy for operations, "
                "(iv) Green building standards."
            ),
            explanation=(
                "India's electronics manufacturing sector is growing rapidly under the 'Make in "
                "India' initiative and PLI (Production Linked Incentive) schemes. The sector "
                "generates significant employment and contributes to technology upgrading."
            ),
            marks=5, topic_tags=["Industries", "Manufacturing", "Case Study"]
        )
        questions.append(question)
        return questions


# ─── Topic 8: Population ─────────────────────────────────────────────────────

class PopulationGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_population())
        else:
            questions.extend(self._standard_population())
        return questions

    def _standard_population(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "numerical", "short_answer"])

        if q_type == "mcq":
            sub = bank.choice(["density", "growth", "hdi", "migration"])
            if sub == "density":
                state_density = [
                    ("Bihar", 1106), ("West Bengal", 1028), ("Kerala", 859),
                    ("Uttar Pradesh", 828), ("Haryana", 573), ("Tamil Nadu", 555),
                    ("Maharashtra", 365), ("Karnataka", 319)
                ]
                state, dens = bank.choice(state_density)
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_pop_density",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        f"Which of the following states has the highest population density in India?"
                    ),
                    options=generate_mcq_options(
                        bank, "Bihar",
                        ["Maharashtra", "Karnataka", "Bihar", "Rajasthan"]
                    ),
                    correct_answer="Bihar",
                    explanation=(
                        f"Bihar has the highest population density in India at approximately 1106 "
                        f"persons per sq km (Census 2011). High density is due to fertile alluvial "
                        f"soil, intensive agriculture, and historical settlement patterns. Other "
                        f"high-density states include West Bengal (1028), Kerala (859), and Uttar "
                        f"Pradesh (828). Low-density states include Arunachal Pradesh (17), "
                        f"Rajasthan (200), and Madhya Pradesh (236)."
                    ),
                    marks=1, topic_tags=["Population", "Population Density"]
                )
            elif sub == "growth":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_pop_growth",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "The Demographic Transition Model shows population growth going through "
                        "stages. In which stage does the population growth rate start to decline "
                        "due to falling birth rates?"
                    ),
                    options=generate_mcq_options(
                        bank, "Stage 3",
                        ["Stage 1", "Stage 2", "Stage 3", "Stage 4"]
                    ),
                    correct_answer="Stage 3",
                    explanation=(
                        "Demographic Transition Model stages: Stage 1 (High birth, high death - "
                        "stable), Stage 2 (High birth, falling death - rapid growth), "
                        "Stage 3 (Falling birth, low death - slowing growth), "
                        "Stage 4 (Low birth, low death - stable). Stage 3 is where birth rates "
                        "start declining due to urbanization, education, women's empowerment, and "
                        "family planning. India is currently in Stage 3."
                    ),
                    marks=1, topic_tags=["Population", "Demographic Transition"]
                )
            elif sub == "hdi":
                hdi_val = bank.uniform(0.550, 0.850)
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_pop_hdi",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        f"The Human Development Index (HDI) measures development based on:"
                    ),
                    options=generate_mcq_options(
                        bank, "Life expectancy, education, and per capita income",
                        ["GDP growth rate and population only",
                         "Life expectancy, education, and per capita income",
                         "Agricultural output and industrial production",
                         "Life expectancy and GDP only"]
                    ),
                    correct_answer="Life expectancy, education, and per capita income",
                    explanation=(
                        "HDI was developed by the UNDP. It combines: (1) Life expectancy at birth "
                        "(health dimension), (2) Expected years of schooling and mean years of "
                        "schooling (education dimension), (3) GNI per capita (standard of living "
                        "dimension). India's HDI has been improving but ranks in the medium "
                        "human development category. Kerala has the highest HDI among Indian states."
                    ),
                    marks=1, topic_tags=["Population", "Human Development Index"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_pop_migration",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Internal migration in India is primarily driven by:"
                    ),
                    options=generate_mcq_options(
                        bank, "Economic factors (employment and better livelihood)",
                        ["Marriage only", "Political factors only",
                         "Economic factors (employment and better livelihood)",
                         "Religious pilgrimage"]
                    ),
                    correct_answer="Economic factors (employment and better livelihood)",
                    explanation=(
                        "In India, internal migration is predominantly rural-to-urban and driven by "
                        "economic factors - search for employment, better wages, and improved "
                        "livelihoods. Marriage migration (particularly of women) is also significant. "
                        "Major migration corridors include: Bihar to Delhi/West Bengal, UP to "
                        "Maharashtra/Gujarat, and Tamil Nadu to Karnataka. The 2011 Census recorded "
                        "about 45 crore internal migrants."
                    ),
                    marks=1, topic_tags=["Population", "Migration"]
                )

        elif q_type == "fill_blank":
            fill_data = bank.choice([
                ("The ______ rate is calculated as (Number of live births / Total population) x 1000.", "Crude Birth"),
                ("______ is the phenomenon where people move from rural areas to urban areas.", "Urbanization"),
                ("The Child Sex Ratio in India according to Census 2011 was ______ females per 1000 males.", "919"),
                ("Kerala has the highest ______ rate in India, exceeding 93%.", "Literacy"),
            ])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_pop_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=fill_data[0],
                correct_answer=fill_data[1],
                explanation="This is a standard population geography question as per the ISC syllabus.",
                marks=1, topic_tags=["Population"]
            )

        elif q_type == "numerical":
            pop_2001 = bank.randint(50, 500)
            growth_rate = bank.uniform(1.2, 2.5)
            pop_2011 = round(pop_2001 * (1 + growth_rate / 100) ** 10)
            decadal_growth = ((pop_2011 - pop_2001) / pop_2001) * 100

            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_pop_numerical",
                question_type="numerical",
                difficulty="Medium",
                competency_level="Applying",
                question_text=(
                    f"The population of a town was {pop_2001} lakh in 2001. If the annual "
                    f"exponential growth rate was {growth_rate:.2f}%, calculate the population "
                    f"in 2011. What was the decadal growth rate?"
                ),
                correct_answer=(
                    f"Population in 2011 = {pop_2001} x (1 + {growth_rate:.2f}/100)^10 "
                    f"= {pop_2001} x {(1 + growth_rate/100)**10:.4f} "
                    f"= {pop_2011} lakh.\n"
                    f"Decadal growth rate = ({pop_2011} - {pop_2001})/{pop_2001} x 100 "
                    f"= {decadal_growth:.1f}%."
                ),
                explanation=(
                    "Population growth follows exponential growth: P_t = P_0 x (1+r)^t where r "
                    "is the annual growth rate and t is the number of years. The decadal growth "
                    "rate measures the percentage increase in population over 10 years."
                ),
                marks=2, topic_tags=["Population", "Population Growth", "Numerical"]
            )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_pop_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Compare the population distribution of India. Name the three most "
                    f"densely populated states and the three least densely populated states/UTs "
                    f"with their respective densities."
                ),
                correct_answer=(
                    "Most densely populated: (1) Bihar (~1106/sq km) - fertile Gangetic plain, "
                    "(2) West Bengal (~1028/sq km) - riverine plain with agriculture and industry, "
                    "(3) Kerala (~859/sq km) - coastal strip with high literacy and healthcare.\n\n"
                    "Least densely populated: (1) Arunachal Pradesh (~17/sq km) - mountainous "
                    "terrain, (2) Andaman & Nicobar Islands (~46/sq km) - remote islands, "
                    "(3) Mizoram (~52/sq km) - hilly terrain."
                ),
                explanation=(
                    "Population distribution in India is highly uneven. The Indo-Gangetic plain "
                    "has the highest densities due to fertile soil, abundant water, and long "
                    "history of agriculture. Mountainous, desert, and forest areas have very low "
                    "densities due to physical constraints."
                ),
                marks=2, topic_tags=["Population", "Population Distribution"]
            )

        questions.append(question)
        return questions

    def _competency_population(self) -> List[Question]:
        bank = self.bank
        questions = []

        state = bank.choice(["Bihar", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh", "Odisha"])
        hdi_rank = bank.randint(10, 20)

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_pop_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Analyzing",
            question_text=(
                f"CASE STUDY: {state} has a population of {bank.randint(5,12)} crore and ranks "
                f"{hdi_rank}th among Indian states in the Human Development Index. The state has "
                f"a literacy rate of {bank.randint(55,75)}%, female literacy of {bank.randint(40,60)}%, "
                f"and an infant mortality rate of {bank.randint(30,55)} per 1000 live births.\n\n"
                f"(a) Interpret the HDI data and explain what it reveals about development in {state}.\n"
                f"(b) Identify the factors contributing to the low literacy rate, particularly female literacy.\n"
                f"(c) Propose targeted interventions to improve human development indicators in {state}."
            ),
            correct_answer=(
                f"(a) The low HDI ranking indicates that {state} faces significant development "
                f"challenges. Low literacy, gender inequality, and poor health outcomes limit "
                f"human capital development.\n"
                f"(b) Contributing factors: Poverty, limited access to schools (especially for girls), "
                f"child marriage, cultural norms prioritizing boys' education, inadequate infrastructure.\n"
                f"(c) Interventions: (i) Free and compulsory education for girls (Beti Bachao Beti "
                f"Padhao), (ii) Scholarship schemes for girls, (iii) Community awareness campaigns, "
                f"(iv) Improving school infrastructure in rural areas, (v) Health and nutrition "
                f"programmes (ICDS), (vi) Skill development and employment programmes."
            ),
            explanation=(
                "This question integrates population geography with development studies. India's "
                "demographic dividend can only be realized through investment in human capital. "
                "States with low HDI face challenges of poverty, inequality, and limited opportunities."
            ),
            marks=5, topic_tags=["Population", "Human Development", "Case Study"]
        )
        questions.append(question)
        return questions


# ─── Topic 9: Human Settlements ─────────────────────────────────────────────

class SettlementsGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_settlements())
        else:
            questions.extend(self._standard_settlements())
        return questions

    def _standard_settlements(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            sub = bank.choice(["urbanization", "smart_city", "rural"])
            if sub == "urbanization":
                urban_pct = bank.randint(28, 35)
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_settle_urban",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        f"According to Census 2011, approximately what percentage of India's "
                        f"population lived in urban areas?"
                    ),
                    options=generate_mcq_options(
                        bank, "31%",
                        ["25%", "31%", "40%", "50%"]
                    ),
                    correct_answer="31%",
                    explanation=(
                        "According to Census 2011, 31.16% of India's population lived in urban areas. "
                        "This was an increase from 27.81% in 2001. The urban population has been "
                        "growing faster than the rural population due to rural-to-urban migration "
                        "and natural increase in urban areas. The level of urbanization in India is "
                        "lower than many developing countries but the rate of growth is high."
                    ),
                    marks=1, topic_tags=["Human Settlements", "Urbanization"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_settle_mcq",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        f"The Smart Cities Mission launched by the Government of India aims to:"
                    ),
                    options=generate_mcq_options(
                        bank, "Develop 100 smart cities with sustainable and citizen-friendly infrastructure",
                        ["Replace all rural areas with urban infrastructure",
                         "Develop 100 smart cities with sustainable and citizen-friendly infrastructure",
                         "Build 500 new metropolitan cities",
                         "Convert all Class I cities into smart cities"]
                    ),
                    correct_answer="Develop 100 smart cities with sustainable and citizen-friendly infrastructure",
                    explanation=(
                        "The Smart Cities Mission was launched in 2015 with the objective of developing "
                        "100 cities across India that would provide core infrastructure, a clean and "
                        "sustainable environment, and a decent quality of life through the application "
                        "of 'smart' solutions. The mission focuses on area-based development (retrofitting, "
                        "redevelopment, greenfield) and pan-city initiatives (smart transport, energy, "
                        "water, waste management)."
                    ),
                    marks=1, topic_tags=["Human Settlements", "Smart Cities"]
                )

        elif q_type == "fill_blank":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_settle_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    "A settlement with a population of more than 1 lakh but less than 1 million is "
                    "classified as a ______ town/city in India."
                ),
                correct_answer="Class II",
                explanation=(
                    "Indian urban settlements are classified by population: Class I (>1 lakh), "
                    "Class II (50,000-99,999), Class III (20,000-49,999), Class IV (10,000-19,999), "
                    "Class V (5,000-9,999), Class VI (<5,000). Metropolitan cities have >1 million."
                ),
                marks=1, topic_tags=["Human Settlements", "Urban Classification"]
            )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_settle_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    "Distinguish between rural and urban settlements in India based on: "
                    "(i) Occupation of people, (ii) Size of population, (iii) Mode of life, "
                    "and (iv) Social relationships."
                ),
                correct_answer=(
                    "Rural Settlement: (i) Primary activities (agriculture, fishing), "
                    "(ii) Small population, (iii) Simple, traditional way of life, "
                    "(iv) Close-knit community relations.\n"
                    "Urban Settlement: (i) Secondary and tertiary activities (manufacturing, services), "
                    "(ii) Large population, (iii) Complex, modern way of life, "
                    "(iv) Formal, impersonal social relations."
                ),
                explanation=(
                    "The distinction between rural and urban settlements is based on multiple criteria "
                    "including population size, occupational structure, lifestyle, and social "
                    "organization. India uses a population threshold of 5,000 with 75% male workers "
                    "in non-agricultural activities to define urban areas."
                ),
                marks=2, topic_tags=["Human Settlements", "Rural vs Urban"]
            )

        questions.append(question)
        return questions

    def _competency_settlements(self) -> List[Question]:
        bank = self.bank
        questions = []

        city = bank.choice(INDIAN_CITIES)
        year = bank.randint(2001, 2021)
        pop_before = bank.randint(50, 800)
        pop_after = bank.randint(pop_before + 20, pop_before + 300)

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_settle_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                f"CASE STUDY: The city of {city} experienced rapid urban growth between {year} "
                f"and {year+10}. The population increased from {pop_before} lakh to {pop_after} lakh. "
                f"This growth was driven by the expansion of the {bank.choice(['IT', 'manufacturing', 'automobile', 'pharmaceutical'])} "
                f"sector.\n\n"
                f"(a) Analyse the causes and consequences of this rapid urbanization in {city}.\n"
                f"(b) Discuss the challenges arising from this growth.\n"
                f"(c) Suggest measures for planned urban development."
            ),
            correct_answer=(
                f"(a) Causes: Industrial growth creating jobs, rural-to-urban migration, natural "
                f"population growth, infrastructure development. Consequences: Economic growth, "
                f"higher living standards, but also urban problems.\n"
                f"(b) Challenges: (1) Housing shortage and slum proliferation, (2) Traffic congestion "
                f"and pollution, (3) Water scarcity and poor sanitation, (4) Strain on civic amenities.\n"
                f"(c) Measures: (i) Integrated urban planning, (ii) Public transport development, "
                f"(iii) Affordable housing schemes, (iv) Slum rehabilitation, (v) Green spaces, "
                f"(vi) Smart city initiatives, (vii) Decentralization of economic activities."
            ),
            explanation=(
                "Rapid urbanization is a defining feature of contemporary India. Cities like "
                "Bangalore, Hyderabad, and Pune have experienced explosive growth due to the "
                "IT and services sectors. Managing this growth sustainably is one of India's "
                "biggest urban challenges."
            ),
            marks=5, topic_tags=["Human Settlements", "Urbanization", "Case Study"]
        )
        questions.append(question)
        return questions


# ─── Topic 10: Transport and Communication ───────────────────────────────────

class TransportGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_transport())
        else:
            questions.extend(self._standard_transport())
        return questions

    def _standard_transport(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            sub = bank.choice(["golden_quadrilateral", "railways", "nhai", "pipelines"])
            if sub == "golden_quadrilateral":
                length = 5846
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_trans_gq",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        "The Golden Quadrilateral connects which four major cities of India?"
                    ),
                    options=generate_mcq_options(
                        bank, "Delhi, Mumbai, Chennai, and Kolkata",
                        ["Delhi, Mumbai, Bangalore, and Kolkata",
                         "Delhi, Mumbai, Chennai, and Kolkata",
                         "Delhi, Ahmedabad, Chennai, and Kolkata",
                         "Jaipur, Mumbai, Chennai, and Kolkata"]
                    ),
                    correct_answer="Delhi, Mumbai, Chennai, and Kolkata",
                    explanation=(
                        "The Golden Quadrilateral (GQ) is a highway network connecting Delhi, "
                        "Mumbai, Chennai, and Kolkata - the four corners of India. Spanning "
                        "5,846 km, it is one of the largest highway projects in the world. "
                        "It also connects many other major cities along the route. The GQ was "
                        "implemented by the National Highways Authority of India (NHAI) and "
                        "completed in 2013."
                    ),
                    marks=1, topic_tags=["Transport", "Road Transport", "Golden Quadrilateral"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_trans_rail",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        "Which is the longest railway route in India?"
                    ),
                    options=generate_mcq_options(
                        bank, "Dibrugarh to Kanyakumari (Vivek Express)",
                        ["Jammu Tawi to Kanyakumari", "Dibrugarh to Kanyakumari (Vivek Express)",
                         "Mumbai to Chennai (Grand Trunk Route)", "Delhi to Kolkata (Howrah)"]
                    ),
                    correct_answer="Dibrugarh to Kanyakumari (Vivek Express)",
                    explanation=(
                        "The Dibrugarh to Kanyakumari Vivek Express is the longest railway route "
                        "in India, covering approximately 4,233 km. It passes through Assam, "
                        "West Bengal, Bihar, Uttar Pradesh, Madhya Pradesh, Maharashtra, Telangana, "
                        "Andhra Pradesh, Tamil Nadu, and Kerala. Indian Railways is the fourth "
                        "largest railway network in the world."
                    ),
                    marks=1, topic_tags=["Transport", "Railways"]
                )

        elif q_type == "fill_blank":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_trans_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    f"The {bank.choice(['Paradip', 'Kandla', 'Mumbai', 'Chennai'])} port "
                    f"on the east coast is the deepest land-locked port in India."
                ),
                correct_answer="Paradip",
                explanation="Paradip Port in Odisha is an artificial deep-water port handling iron ore and coal exports.",
                marks=1, topic_tags=["Transport", "Waterways"]
            )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_trans_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    "Explain the advantages of pipeline transport for moving crude oil and "
                    "natural gas in India. Name any two major pipeline networks."
                ),
                correct_answer=(
                    "Advantages: (1) No wastage of material (unlike other modes), "
                    "(2) Safe and accident-free transport of hazardous materials, "
                    "(3) Low operating cost after initial investment, "
                    "(4) 24/7 operation regardless of weather, "
                    "(5) Environmentally friendly with low emissions.\n"
                    "Major pipelines: (1) Kandla-Bhatinda pipeline (crude oil), "
                    "(2) Hajira-Bijaipur-Jagdishpur (HBJ) pipeline (natural gas), "
                    "(3) Mumbai-Pune-Malad pipeline."
                ),
                explanation=(
                    "Pipeline transport is critical for India's energy security. The country has "
                    "over 15,000 km of crude oil pipelines and over 15,000 km of natural gas "
                    "pipelines. The gas pipeline network is expanding under the National Gas Grid."
                ),
                marks=2, topic_tags=["Transport", "Pipeline Transport"]
            )

        questions.append(question)
        return questions

    def _competency_transport(self) -> List[Question]:
        bank = self.bank
        questions = []

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_trans_comp",
            question_type="assertion_reasoning",
            difficulty="Medium",
            competency_level="Analyzing",
            question_text=(
                "Assertion: The Indian railway network has a dense concentration in the "
                "northern and peninsular plains but is sparse in the Himalayan region.\n"
                "Reason: Constructing railways in mountainous terrain is difficult and expensive.\n\n"
                "Codes:\n(A) Both A and R are true and R explains A.\n"
                "(B) Both A and R are true but R does not explain A.\n"
                "(C) A is true but R is false.\n"
                "(D) A is false but R is true.\n"
                "(E) Both A and R are false."
            ),
            options=["(A) Both A and R are true and R explains A",
                     "(B) Both A and R are true but R does not explain A",
                     "(C) A is true but R is false",
                     "(D) A is false but R is true",
                     "(E) Both A and R are false"],
            correct_answer="(A) Both A and R are true and R explains A.",
            explanation=(
                "The railway network is indeed dense in the Gangetic plain and peninsular plateau "
                "because of flat terrain and high population/economic activity. In the Himalayas, "
                "construction is extremely challenging due to steep slopes, landslides, and high "
                "costs. The Konkan Railway and Jammu-Baramulla line are engineering marvels "
                "that overcame these challenges."
            ),
            marks=1, topic_tags=["Transport", "Railways", "Assertion-Reasoning"]
        )
        questions.append(question)
        return questions


# ─── Topic 11: Life in the Oceans ────────────────────────────────────────────

class OceansGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_oceans())
        else:
            questions.extend(self._standard_oceans())
        return questions

    def _standard_oceans(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            sub = bank.choice(["currents", "coral", "tides", "deposits"])
            if sub == "currents":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_ocean_currents",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Which warm ocean current flows along the east coast of Africa?"
                    ),
                    options=generate_mcq_options(
                        bank, "Agulhas Current",
                        ["Benguela Current", "Agulhas Current",
                         "Canary Current", "Labrador Current"]
                    ),
                    correct_answer="Agulhas Current",
                    explanation=(
                        "The Agulhas Current is a warm western boundary current flowing southward "
                        "along the east coast of Africa. It is one of the fastest ocean currents "
                        "in the world. The cold Benguela Current flows northward along the west "
                        "coast of Africa. These currents affect the climate of adjacent land areas: "
                        "the Agulhas Current brings moisture and warmth to Mozambique and South "
                        "Africa's east coast, while the Benguela Current causes arid conditions "
                        "along Namibia's coast."
                    ),
                    marks=1, topic_tags=["Oceans", "Ocean Currents"]
                )
            elif sub == "coral":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_ocean_coral",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Coral bleaching occurs primarily due to:"
                    ),
                    options=generate_mcq_options(
                        bank, "Rising sea surface temperatures",
                        ["Decreased salinity",
                         "Rising sea surface temperatures",
                         "Increased oxygen levels",
                         "Decreased carbon dioxide levels"]
                    ),
                    correct_answer="Rising sea surface temperatures",
                    explanation=(
                        "Coral bleaching occurs when corals expel their symbiotic algae (zooxanthellae) "
                        "due to stress, primarily from elevated sea surface temperatures. Without the "
                        "algae, corals lose their colour and main energy source. The Great Barrier "
                        "Reef and coral ecosystems in the Gulf of Mannar and Lakshadweep have "
                        "experienced bleaching events. Climate change and ocean acidification are "
                        "major threats to coral reefs globally."
                    ),
                    marks=1, topic_tags=["Oceans", "Coral Reefs"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_ocean_tides",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        "Spring tides occur when:"
                    ),
                    options=generate_mcq_options(
                        bank, "Sun, Earth, and Moon are aligned (new moon and full moon)",
                        ["Sun, Earth, and Moon are aligned (new moon and full moon)",
                         "The Moon is at quadrature (first and third quarter)",
                         "The Earth is farthest from the Sun",
                         "The Moon is closest to Earth only"]
                    ),
                    correct_answer="Sun, Earth, and Moon are aligned (new moon and full moon)",
                    explanation=(
                        "Spring tides occur during new moon and full moon when the Sun, Earth, and "
                        "Moon are aligned. The gravitational pulls of the Sun and Moon combine, "
                        "producing the highest high tides and lowest low tides. Neap tides occur "
                        "during first and third quarter moons when the Sun and Moon's pulls are at "
                        "right angles, producing lower tidal range. The Bay of Fundy in Canada has "
                        "the world's highest tides (over 15 m). In India, the Gulf of Kutch and "
                        "Gulf of Khambhat have very high tidal ranges."
                    ),
                    marks=1, topic_tags=["Oceans", "Tides"]
                )

        elif q_type == "fill_blank":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_ocean_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    f"The ______ Reef, located off the coast of {bank.choice(['Tamil Nadu', 'Kerala', 'Lakshadweep'])}, "
                    "is the largest coral reef system in India."
                ),
                correct_answer=bank.choice(["Gulf of Mannar", "Palk Bay"]),
                explanation="The Gulf of Mannar Biosphere Reserve has India's most extensive coral reefs.",
                marks=1, topic_tags=["Oceans", "Coral Reefs"]
            )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_ocean_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    "Explain the difference between warm and cold ocean currents. Give one "
                    "example of each from the Indian Ocean region."
                ),
                correct_answer=(
                    "Warm Currents: Flow from equatorial regions toward the poles, have higher "
                    "temperature than surrounding water, increase air temperature and humidity of "
                    "adjacent coasts. Example: Agulhas Current (west Indian Ocean), "
                    "South-West Monsoon Drift.\n"
                    "Cold Currents: Flow from polar regions toward the equator, have lower "
                    "temperature than surrounding water, decrease air temperature and reduce "
                    "rainfall of adjacent coasts. Example: West Australian Current, "
                    "Benguela Current."
                ),
                explanation=(
                    "Ocean currents are driven by wind patterns, the Coriolis effect, and differences "
                    "in water density. They redistribute heat globally, affecting climate patterns. "
                    "The Indian Ocean has unique current patterns due to the monsoon wind reversal."
                ),
                marks=2, topic_tags=["Oceans", "Ocean Currents"]
            )

        questions.append(question)
        return questions

    def _competency_oceans(self) -> List[Question]:
        bank = self.bank
        questions = []

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_ocean_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                f"CASE STUDY: Marine biologists studying the Lakshadweep Islands found that "
                f"coral bleaching events have increased from once every {bank.randint(20,50)} years "
                f"to once every {bank.randint(2,8)} years. Sea surface temperatures in the Arabian "
                f"Sea have risen by approximately {bank.uniform(0.8,1.5):.1f} degrees C over the "
                f"past century.\n\n"
                f"(a) Explain how rising sea temperatures cause coral bleaching.\n"
                f"(b) Discuss the ecological and economic importance of coral reefs for India.\n"
                f"(c) Suggest measures to protect India's coral reef ecosystems."
            ),
            correct_answer=(
                "(a) Corals have a symbiotic relationship with zooxanthellae algae. When sea "
                "temperature rises above the coral's tolerance (typically 1-2 degrees C above "
                "normal), the coral expels the algae. Without algae, corals lose their colour "
                "(bleaching) and main energy source, leading to death if conditions don't improve.\n"
                "(b) Importance: (i) Biodiversity hotspots supporting thousands of marine species, "
                "(ii) Natural coastal protection from storms and erosion, "
                "(iii) Support fisheries and tourism, (iv) Source of new medicines.\n"
                "(c) Protection: (i) Marine Protected Areas (MPAs), (ii) Reducing local stressors "
                "(pollution, overfishing), (iii) Coral restoration projects, "
                "(iv) Reducing carbon emissions, (v) Community-based conservation."
            ),
            explanation=(
                "India's coral reef ecosystems include the Gulf of Mannar, Gulf of Kutch, "
                "Andaman & Nicobar Islands, and Lakshadweep. Climate change, coastal development, "
                "and pollution threaten these fragile ecosystems. The Coral Triangle Initiative "
                "includes India's efforts for marine conservation."
            ),
            marks=5, topic_tags=["Oceans", "Coral Reefs", "Climate Change"]
        )
        questions.append(question)
        return questions


# ─── Topic 12: Human Development Index ──────────────────────────────────────

class HumanDevGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_hd())
        else:
            questions.extend(self._standard_hd())
        return questions

    def _standard_hd(self) -> List[Question]:
        bank = self.bank
        questions = []

        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_hdi_mcq",
                question_type="mcq", difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    "Which organization publishes the Human Development Report annually?"
                ),
                options=generate_mcq_options(
                    bank, "UNDP",
                    ["World Bank", "UNDP", "IMF", "WHO"]
                ),
                correct_answer="UNDP",
                explanation=(
                    "The United Nations Development Programme (UNDP) publishes the annual Human "
                    "Development Report (HDR). The first HDR was published in 1990 under the "
                    "leadership of Mahbub ul Haq and Amartya Sen. It introduced the Human "
                    "Development Index (HDI) as a composite measure of human development, "
                    "combining health (life expectancy), education (mean years of schooling), "
                    "and standard of living (GNI per capita)."
                ),
                marks=1, topic_tags=["Human Development", "HDI"]
            )

        elif q_type == "fill_blank":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_hdi_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    "The three components of HDI are: Life Expectancy, ______, and "
                    "______ per capita income."
                ),
                correct_answer="Education, GNI",
                explanation="HDI combines health, education, and economic dimensions of human development.",
                marks=1, topic_tags=["Human Development", "HDI"]
            )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_hdi_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Explain how {bank.choice(['Kerala', 'Himachal Pradesh'])} achieves a high "
                    f"HDI despite having a moderate per capita income. Use the HDI framework."
                ),
                correct_answer=(
                    "High HDI despite moderate income: (1) Health - excellent healthcare "
                    "infrastructure, high life expectancy, low infant mortality, (2) Education - "
                    "near-universal literacy, high enrolment rates, gender parity in education, "
                    "(3) Social indicators - gender equality, low poverty, social cohesion. "
                    "This demonstrates that human development depends on all three HDI dimensions, "
                    "not just economic income."
                ),
                explanation=(
                    "Kerala is known as India's most developed state despite having a per capita "
                    "income lower than some other states. Its investment in health and education "
                    "since independence has paid off in human development outcomes. This is the "
                    "Kerala Model of development."
                ),
                marks=2, topic_tags=["Human Development", "HDI"]
            )

        questions.append(question)
        return questions

    def _competency_hd(self) -> List[Question]:
        bank = self.bank
        questions = []

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_hdi_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Evaluating",
            question_text=(
                f"CASE STUDY: State A and State B have similar per capita incomes, but State A "
                f"ranks 3rd in HDI while State B ranks 18th. State A has life expectancy of "
                f"{bank.randint(72,80)} years and literacy of {bank.randint(85,95)}%, while "
                f"State B has life expectancy of {bank.randint(60,70)} years and literacy of "
                f"{bank.randint(50,65)}%.\n\n"
                f"(a) Explain how HDI provides a more comprehensive measure of development than GDP per capita.\n"
                f"(b) Identify the non-economic factors that cause this divergence between the two states.\n"
                f"(c) Discuss why focusing only on economic growth can be misleading for development policy."
            ),
            correct_answer=(
                "(a) HDI is broader than GDP because it incorporates health (life expectancy) "
                "and education (literacy, schooling) alongside income. GDP only measures economic "
                "output, not how benefits are distributed or how people's capabilities are "
                "developed.\n"
                "(b) Non-economic factors: (1) Healthcare access and quality, "
                "(2) Education investment and female literacy, (3) Social equality, "
                "(4) Political stability and governance quality, (5) Social norms and cultural values.\n"
                "(c) Focusing only on growth ignores: (1) Income inequality, "
                "(2) Environmental degradation, (3) Lack of access to health and education, "
                "(4) Social exclusion, (5) Unsustainable resource use."
            ),
            explanation=(
                "The capability approach of Amartya Sen argues that development should be seen "
                "as expansion of freedoms and capabilities, not just income growth. This case "
                "illustrates why HDI and similar measures are important complements to GDP."
            ),
            marks=5, topic_tags=["Human Development", "HDI", "Development"]
        )
        questions.append(question)
        return questions


# ─── Topic 13: Map Projections ───────────────────────────────────────────────

class MapProjectionGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_projections())
        else:
            questions.extend(self._standard_projections())
        return questions

    def _standard_projections(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            sub = bank.choice(["cylindrical", "conical", "zenithal", "properties"])
            if sub == "cylindrical":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_proj_cyl",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "In which type of map projection are the meridians shown as vertical "
                        "parallel straight lines and parallels as horizontal parallel straight "
                        "lines of varying length?"
                    ),
                    options=generate_mcq_options(
                        bank, "Cylindrical Projection",
                        ["Cylindrical Projection", "Conical Projection",
                         "Zenithal Projection", "Polyconic Projection"]
                    ),
                    correct_answer="Cylindrical Projection",
                    explanation=(
                        "In cylindrical projections, the globe is projected onto a cylinder tangent "
                        "or secant to the equator. Meridians appear as vertical parallel lines "
                        "equally spaced, and parallels appear as horizontal parallel straight lines, "
                        "with spacing increasing toward the poles. Examples: Mercator, Simple "
                        "Cylindrical Equal Area, Gall's Orthographic. These are best for "
                        "equatorial regions and world maps."
                    ),
                    marks=1, topic_tags=["Map Projections", "Cylindrical"]
                )
            elif sub == "conical":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_proj_con",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "Which type of map projection is most suitable for showing a country "
                        "with an east-west extent, like India?"
                    ),
                    options=generate_mcq_options(
                        bank, "Conical Projection with one standard parallel",
                        ["Cylindrical Projection", "Zenithal Projection",
                         "Conical Projection with one standard parallel",
                         "Polar Projection"]
                    ),
                    correct_answer="Conical Projection with one standard parallel",
                    explanation=(
                        "Conical projections are best for regions with greater east-west extent "
                        "than north-south extent. India, being wider east-west, is well represented "
                        "by a conical projection with a standard parallel at about 23.5 degrees N "
                        "(Tropic of Cancer). The Survey of India uses conical projections for "
                        "topographical maps. Only one standard parallel causes increasing scale "
                        "errors toward the poles and equator."
                    ),
                    marks=1, topic_tags=["Map Projections", "Conical"]
                )
            else:
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_proj_prop",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Applying",
                    question_text=(
                        "Which property is NOT one of the five fundamental properties used to "
                        "evaluate map projections?"
                    ),
                    options=generate_mcq_options(
                        bank, "Colour accuracy",
                        ["Colour accuracy", "Equivalence (equal area)",
                         "Conformality (shape preservation)",
                         "Equidistance (distance preservation)"]
                    ),
                    correct_answer="Colour accuracy",
                    explanation=(
                        "The five fundamental properties of map projections are: (1) Equivalence "
                        "(equal area - correct representation of area), (2) Conformality (correct "
                        "shape of small areas), (3) Equidistance (correct distances along certain "
                        "lines), (4) True direction (correct azimuths), (5) Simple construction. "
                        "No projection can have all five properties simultaneously due to the "
                        "inherent problem of representing a curved surface on a flat plane."
                    ),
                    marks=1, topic_tags=["Map Projections", "Properties"]
                )

        elif q_type == "fill_blank":
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_proj_fill",
                question_type="fill_blank",
                difficulty="Easy",
                competency_level="Remembering",
                question_text=(
                    "The ______ Projection is a conical projection developed by the Survey of "
                    "India for mapping the country and is used in topographical maps."
                ),
                correct_answer="Polyconic",
                explanation=(
                    "The Polyconic Projection (modified by Survey of India) uses a series of "
                    "cones, one for each parallel, to minimize distortion. It is neither equal "
                    "area nor conformal but has moderate distortion along all properties, making "
                    "it practical for topographic mapping."
                ),
                marks=1, topic_tags=["Map Projections"]
            )

        else:
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_proj_sa",
                question_type="short_answer",
                difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    "Compare Cylindrical and Conical projections with reference to: "
                    "(i) Shape, (ii) Graticule pattern, (iii) Areas of best use, "
                    "and (iv) Meridian spacing."
                ),
                correct_answer=(
                    "Cylindrical: (i) Cylindrical surface shape, (ii) Meridians: vertical "
                    "parallel equally spaced; Parallels: horizontal, spacing increases toward "
                    "poles, (iii) Best for equatorial regions and world maps, "
                    "(iv) Equal spacing between all meridians.\n"
                    "Conical: (i) Conical surface shape, (ii) Meridians: straight lines "
                    "converging at the pole; Parallels: concentric arcs, "
                    "(iii) Best for temperate zones with east-west extent, "
                    "(iv) Unequal spacing - converges toward the pole."
                ),
                explanation=(
                    "Understanding projection properties helps in selecting the right projection "
                    "for a specific mapping purpose. The Survey of India uses Polyconic projections "
                    "for topographical maps at scales of 1:50,000 and larger."
                ),
                marks=2, topic_tags=["Map Projections"]
            )

        questions.append(question)
        return questions

    def _competency_projections(self) -> List[Question]:
        bank = self.bank
        questions = []

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_proj_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                f"CASE STUDY: The Survey of India needs to select an appropriate map projection "
                f"for creating a {bank.choice(['1:50,000 scale topographical map of Maharashtra', '1:1,000,000 scale wall map of India', '1:250,000 scale map of the Himalayan region'])}.\n\n"
                f"(a) What factors should be considered when selecting a projection?\n"
                f"(b) Which projection would you recommend and why?\n"
                f"(c) What distortions will be present in the recommended projection, and how "
                f"can they be minimized?"
            ),
            correct_answer=(
                "(a) Factors: (1) Geographic extent of the area, (2) Shape and orientation, "
                "(3) Purpose of the map (area measurement, navigation, etc.), "
                "(4) Required scale, (5) Acceptable level of distortion.\n"
                "(b) Recommendation: [Conical/Polyconic for regional maps, Cylindrical for world maps]. "
                "Reason: [suitability for the area's shape and extent].\n"
                "(c) Distortions: [Specific to chosen projection]. Minimization: Using standard "
                "parallels, choosing the appropriate projection for the map's purpose, and "
                "disclosing distortion information."
            ),
            explanation=(
                "Map projection selection is a fundamental skill in cartography. The Survey of "
                "India uses specific projections for different purposes. Topographical maps at "
                "large scales use Polyconic projections, while general purpose maps may use "
                "different projections."
            ),
            marks=5, topic_tags=["Map Projections", "Map Design"]
        )
        questions.append(question)
        return questions


# ─── Topic 14: Topographical Maps ────────────────────────────────────────────

class TopoMapGenerator:
    def __init__(self, bank: SeededQuestionBank):
        self.bank = bank

    def generate(self, is_competency: bool) -> List[Question]:
        questions = []
        if is_competency:
            questions.extend(self._competency_topo())
        else:
            questions.extend(self._standard_topo())
        return questions

    def _standard_topo(self) -> List[Question]:
        bank = self.bank
        questions = []
        q_type = bank.choice(["mcq", "fill_blank", "short_answer", "numerical"])

        if q_type == "mcq":
            sub = bank.choice(["scale", "bearing", "contour", "grid"])
            if sub == "scale":
                map_dist = bank.randint(2, 20)
                ground_dist = bank.randint(1, 10)
                r_f = map_dist * 1000 / (ground_dist * 1000)
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_topo_scale",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Applying",
                    question_text=(
                        f"On a map, {map_dist} cm represents {ground_dist} km on the ground. "
                        f"What is the Representative Fraction (R.F.) of this map?"
                    ),
                    options=generate_mcq_options(
                        bank, f"1:{map_dist*100000//ground_dist}",
                        [f"1:{ground_dist*100000//map_dist}", f"1:{map_dist*100000//ground_dist}",
                         f"1:{map_dist*1000//ground_dist}", f"1:{map_dist//ground_dist}"]
                    ),
                    correct_answer=f"1:{map_dist*100000//ground_dist}",
                    explanation=(
                        f"R.F. = Map distance / Ground distance (same units). "
                        f"Converting {ground_dist} km to cm: {ground_dist*1000} m = {ground_dist*100000} cm. "
                        f"R.F. = {map_dist} cm / {ground_dist*100000} cm = 1:{map_dist*100000//ground_dist}. "
                        f"This means 1 unit on the map represents {map_dist*100000//ground_dist} units on the ground."
                    ),
                    marks=1, topic_tags=["Topographical Maps", "Scale"]
                )
            elif sub == "bearing":
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_topo_bearing",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Understanding",
                    question_text=(
                        "If the fore bearing of a line is 110 degrees, what is its back bearing?"
                    ),
                    options=generate_mcq_options(
                        bank, "290 degrees",
                        ["70 degrees", "110 degrees", "290 degrees", "180 degrees"]
                    ),
                    correct_answer="290 degrees",
                    explanation=(
                        "Back Bearing = Fore Bearing +/- 180 degrees. If Fore Bearing < 180, add 180. "
                        "Here, 110 + 180 = 290 degrees. Conversely, if the fore bearing were more than 180, "
                        "we would subtract 180. So a fore bearing of 290 degrees gives a back bearing of "
                        "290 - 180 = 110 degrees."
                    ),
                    marks=1, topic_tags=["Topographical Maps", "Bearing"]
                )
            elif sub == "contour":
                vi = bank.choice([10, 20, 30])
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_topo_contour",
                    question_type="mcq", difficulty="Easy",
                    competency_level="Remembering",
                    question_text=(
                        f"On a toposheet, the difference in height between two consecutive contour lines "
                        f"is {vi} metres. What is the Vertical Interval (V.I.) of these contours?"
                    ),
                    options=generate_mcq_options(
                        bank, f"{vi} metres",
                        [f"{vi*2} metres", f"{vi} metres", f"{vi//2} metres", f"{vi+10} metres"]
                    ),
                    correct_answer=f"{vi} metres",
                    explanation=(
                        f"Vertical Interval (V.I.) is the difference in height between two consecutive "
                        f"contour lines. Here it is directly given as {vi} metres. Do not confuse it with "
                        f"the Horizontal Equivalent, which is the horizontal ground distance between contours."
                    ),
                    marks=1, topic_tags=["Topographical Maps", "Contours"]
                )
            elif sub == "grid":
                easting = bank.randint(11, 89)
                northing = bank.randint(11, 89)
                gr = f"{easting}{northing}"
                question = Question(
                    id=bank.next_id("Q"),
                    node_id="c12_geo_topo_grid",
                    question_type="mcq", difficulty="Medium",
                    competency_level="Applying",
                    question_text=(
                        f"A temple lies within Easting {easting} and Northing {northing} on a toposheet. "
                        f"What is its four-figure grid reference?"
                    ),
                    options=generate_mcq_options(
                        bank, gr,
                        [gr, f"{northing}{easting}", f"{easting}0{northing}0", f"{northing}0{easting}0"]
                    ),
                    correct_answer=gr,
                    explanation=(
                        "A four-figure grid reference is written Eastings first, then Northings "
                        "('go along the corridor before going up the stairs'). "
                        f"Hence the reference is {easting} (Eastings) followed by {northing} (Northings) = {gr}."
                    ),
                    marks=1, topic_tags=["Topographical Maps", "Grid Reference"]
                )
        elif q_type == "fill_blank":
            fill_data = bank.choice([
                ("The ratio between the distance on a map and the corresponding distance on the ground is called the ______.", "Representative Fraction"),
                ("Contour lines drawn very close together on a toposheet indicate a ______ slope.", "steep"),
                ("The difference in height between two consecutive contour lines is called the ______.", "Vertical Interval"),
                ("In a grid reference, Eastings are always read ______ Northings.", "before"),
            ])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_topo_fill",
                question_type="fill_blank", difficulty="Easy",
                competency_level="Remembering",
                question_text=fill_data[0],
                correct_answer=fill_data[1],
                explanation=(
                    "These are standard terms used in the interpretation of Survey of India "
                    "topographical maps in the ISC Class 12 syllabus."
                ),
                marks=1, topic_tags=["Topographical Maps"]
            )
        else:
            vi = bank.choice([10, 20, 40])
            scale = bank.choice(["1:50,000", "1:25,000"])
            question = Question(
                id=bank.next_id("Q"),
                node_id="c12_geo_topo_sa",
                question_type="short_answer", difficulty="Medium",
                competency_level="Understanding",
                question_text=(
                    f"Explain how you would identify a steep slope and a gentle slope on a toposheet of scale "
                    f"{scale} with a contour interval of {vi} metres. Also state what the closeness of contour "
                    f"lines tells you about the terrain."
                ),
                correct_answer=(
                    "On a toposheet, contour lines drawn close together indicate a steep slope because the "
                    "height rises quickly over a short horizontal distance, while widely spaced contours "
                    "indicate a gentle slope. The vertical interval remains constant; it is the horizontal "
                    "spacing (Horizontal Equivalent) that changes with the steepness of the terrain."
                ),
                explanation=(
                    "Interpretation of contour patterns is a core skill of the Topographical Maps unit. "
                    "The contour interval stays fixed on a sheet; only the horizontal spacing varies, "
                    "which is why closely packed contours mean steep terrain."
                ),
                marks=2, topic_tags=["Topographical Maps", "Contours"]
            )

        questions.append(question)
        return questions

    def _competency_topo(self) -> List[Question]:
        bank = self.bank
        questions = []

        question = Question(
            id=bank.next_id("Q"),
            node_id="c12_geo_topo_comp",
            question_type="case_study",
            difficulty="Medium",
            competency_level="Applying",
            question_text=(
                "CASE STUDY: Your school trekking team is planning an expedition using Survey of India "
                f"toposheet number {bank.choice(['45D/7', '45D/10', '53A/4'])} on a scale of 1:50,000.\n\n"
                "(a) How would you find the highest and lowest points in the mapped area using contour lines?\n"
                "(b) Two members measure 6 cm between a temple and a school on the map. What actual ground "
                "distance does this represent?\n"
                "(c) How would you give the exact location of the temple to a rescue team over the phone?"
            ),
            correct_answer=(
                "(a) The highest point is where contours peak (spot heights, triangulated points, or closed "
                "contour rings show the summit); the lowest point lies along the valley or river where contour "
                "values are smallest.\n"
                "(b) On a 1:50,000 map, 1 cm = 50,000 cm = 0.5 km. So 6 cm = 3 km on the ground.\n"
                "(c) By giving the grid reference of the temple (Eastings first, then Northings), read from "
                "the grid lines printed on the toposheet."
            ),
            explanation=(
                "Topographical map interpretation combines scale, contour and grid-reference skills. "
                "The Survey of India's 1:50,000 sheets are the standard for field navigation, and the "
                "four- or six-figure grid reference is the accepted way of communicating precise locations."
            ),
            marks=5, topic_tags=["Topographical Maps", "Map Interpretation"]
        )
        questions.append(question)
        return questions


# ─── Registry-style dispatcher and deterministic entry point ─────────────────

_TOPIC_GENERATORS: List[Tuple[str, type]] = [
    ("c12_geo_climate", ClimateGenerator),
    ("c12_geo_soils", SoilsGenerator),
    ("c12_geo_vegetation", VegetationGenerator),
    ("c12_geo_water", WaterResourcesGenerator),
    ("c12_geo_minerals", MineralsGenerator),
    ("c12_geo_agriculture", AgricultureGenerator),
    ("c12_geo_industries", IndustriesGenerator),
    ("c12_geo_population", PopulationGenerator),
    ("c12_geo_settlements", SettlementsGenerator),
    ("c12_geo_transport", TransportGenerator),
    ("c12_geo_oceans", OceansGenerator),
    ("c12_geo_humandevelopment", HumanDevGenerator),
    ("c12_geo_projections", MapProjectionGenerator),
    ("c12_geo_topo", TopoMapGenerator),
]


def generate_questions(seed: int = 0, count: int = 1, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """Deterministically generate ISC Class 12 Geography questions.

    Mirrors the convention of the other solvers_regen question modules so the
    engagement-layer registry can call ``generate_questions(seed)``.
    """
    bank = SeededQuestionBank(seed)
    generators = _TOPIC_GENERATORS
    if topic:
        matching = [(nid, gen) for nid, gen in generators if nid == topic or gen.__name__.lower().startswith(str(topic).lower())]
        if matching:
            generators = matching
    out: List[Dict[str, Any]] = []
    for i in range(count):
        _, gen_cls = generators[(seed + i) % len(generators)]
        try:
            qs = gen_cls(bank).generate(is_competency=bool(bank.rng.random() < 0.3))
        except Exception:
            continue
        if not qs:
            continue
        q = qs[0]
        out.append(q.to_dict())
    return out
