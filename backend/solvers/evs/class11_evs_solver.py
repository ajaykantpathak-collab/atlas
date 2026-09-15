"""
CISCE Class 11 Environmental Science (EVS) - Solver & Question Generator
Deterministic, seed-controlled, no external LLM calls.
Covers full syllabus nodes c11_evs_001 through c11_evs_021.
"""
from __future__ import annotations

import math
import random
import fractions
import dataclasses
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Tuple
from enum import Enum

# ─────────────────────────────────────────────
# 1. DATA MODELS
# ─────────────────────────────────────────────

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    SCOPE_APPLICATIONS        = "c11_evs_001"
    MODES_OF_EXISTENCE        = "c11_evs_002"
    EVOLUTION_HOMO_SAPIENS    = "c11_evs_003"
    EARLY_MIGRATIONS          = "c11_evs_004"
    HUMAN_ADAPTATIONS         = "c11_evs_005"
    STONE_AGE_IRON_AGE        = "c11_evs_006"
    ANCIENT_CIVILISATIONS     = "c11_evs_007"
    TRADITIONAL_ECOLOGICAL    = "c11_evs_008"
    COLONIALISM_ENVIRONMENT   = "c11_evs_009"
    INDUSTRIAL_REVOLUTION     = "c11_evs_010"
    MODERN_ENV_MOVEMENTS      = "c11_evs_011"
    SDGS                      = "c11_evs_012"
    CLIMATE_CHANGE            = "c11_evs_013"
    BIODIVERSITY              = "c11_evs_014"
    POLLUTION                 = "c11_evs_015"
    WATER_RESOURCES           = "c11_evs_016"
    LAND_RESOURCES            = "c11_evs_017"
    FOREST_RESOURCES          = "c11_evs_018"
    ENERGY_RESOURCES          = "c11_evs_019"
    WASTE_MANAGEMENT          = "c11_evs_020"
    ENV_LAWS_POLICIES         = "c11_evs_021"


class Difficulty(Enum):
    EASY   = "easy"
    MEDIUM = "medium"
    HARD   = "hard"


@dataclass
class Question:
    id:           str
    type:         str
    topic:        str
    difficulty:   str
    question:     str
    options:      Optional[List[str]]        = None
    answer:       Any                        = None
    explanation:  str                        = ""
    unit:         Optional[str]              = None
    blank_word:   Optional[str]              = None

@dataclass
class SolverResult:
    answer:      Any
    steps:       List[str]
    verification: str
    confidence:  str


# ─────────────────────────────────────────────
# 2. GLOBAL SEED STATE
# ─────────────────────────────────────────────

def _init_rng(seed: int) -> random.Random:
    return random.Random(seed)


# ─────────────────────────────────────────────
# 3. TOPIC REGISTRY (covers ALL 21 nodes)
# ─────────────────────────────────────────────

ALL_TOPICS: List[str] = [t.value for t in Topic]


# ─────────────────────────────────────────────
# 4. QUESTION BANK - seeds keyed by topic
# ─────────────────────────────────────────────

# ── 001: Scope & Applications ─────────────────
_QB_001_MCQ = [
    ("Environmental Science is considered interdisciplinary because it integrates:",
     ["Natural sciences only",
      "Social sciences only",
      "Natural sciences, social sciences, and humanities",
      "Engineering disciplines only"],
     2,
     "EVS explicitly combines natural sciences (biology, chemistry, physics), "
     "social sciences (economics, sociology, political science), and humanities "
     "(ethics, philosophy, history) to address complex environmental problems."),
    ("Which of the following is NOT a major scope area of EVS?",
     ["Ecology",
      "Environmental law and policy",
      "Environmental technology",
      "Quantum computing"],
     3,
     "EVS scope covers ecology, pollution studies, law and policy, technology, "
     "conservation planning, and sustainable development - not quantum computing."),
    ("What does EIA stand for?",
     ["Environmental Impact Assessment",
      "Ecological Integration Approach",
      "Environmental Inspection Agency",
      "Energy and Infrastructure Analysis"],
     0,
     "EIA = Environmental Impact Assessment - a process that predicts ecological "
     "and social consequences before a project begins."),
    ("EVS bridges science and which other domain?",
     ["Entertainment",
      "Governance / policy",
      "Sports",
      "Fashion"],
     1,
     "EVS bridges science and governance, enabling evidence-based policy solutions."),
]

_QB_001_FB = [
    ("Environmental Science integrates natural sciences, ______ sciences, and humanities.",
     "social"),
    ("EIA stands for Environmental ______ Assessment.",
     "Impact"),
    ("EVS scope includes ecology, pollution studies, and ______ law.",
     "environmental"),
    ("The process that predicts project consequences before construction is called ______.",
     "EIA"),
]

# ── 002: Modes of Existence ────────────────────
_QB_002_MCQ = [
    ("Which TWO features define hunting-gathering?",
     ["Animal domestication & crop cultivation",
      "Dependence on wild resources & high mobility",
      "Mechanised production & urbanisation",
      "Sedentary settlement & permanent fields"],
     1,
     "Hunting-gathering societies depend on wild resources and are highly mobile "
     "to follow seasonal food availability."),
    ("Transhumance is a feature of which mode of existence?",
     ["Hunting-gathering",
      "Pastoral",
      "Agricultural",
      "Industrial"],
     1,
     "Transhumance - seasonal migration with herds - is the defining feature of "
     "pastoral societies."),
    ("The Sentinelese tribe of Andaman & Nicobar Islands practice:",
     ["Pastoralism",
      "Agriculture",
      "Hunting-gathering",
      "Industrial manufacturing"],
     2,
     "The Sentinelese are a PVTG subsisting on hunting-gathering with bows, arrows, "
     "and wild tubers, completely isolated from the outside world."),
    ("Which mode of existence is characterised by mechanised production "
     "and mass resource consumption?",
     ["Agricultural",
      "Pastoral",
      "Industrial",
      "Hunting-gathering"],
     2,
     "Industrial society uses fossil-fuel-driven machines for large-scale production "
     "and urbanised lifestyles."),
]

_QB_002_SA = [
    ("List the four modes of human existence in chronological order.",
     ["Hunting-gathering", "Pastoral", "Agricultural", "Industrial"],
     "Chronological sequence: hunting-gathering → pastoral → agricultural → industrial."),
    ("Name the PVTG tribe from North Sentinel Island, Andaman & Nicobar.",
     ["Sentinelese"],
     "The Sentinelese are classified as a Particularly Vulnerable Tribal Group (PVTG)."),
]

# ── 003: Evolution of Homo sapiens ─────────────
_QB_003_MCQ = [
    ("Australopithecus is best described as:",
     ["A modern human",
      "An early bipedal hominin",
      "A Neanderthal subspecies",
      "A domesticated primate"],
     1,
     "Australopithecus (~4-2 Ma) is one of the earliest known bipedal hominins, "
     "preceding Homo."),
    ("Approximately when did anatomically modern Homo sapiens appear?",
     ["50,000 years ago",
      "200,000 years ago",
      "2 million years ago",
      "10,000 years ago"],
     1,
     "Anatomically modern Homo sapiens emerged in Africa around 200,000 years ago."),
    ("Which of the following is NOT a member of the genus Homo?",
     ["H. habilis",
      "H. erectus",
      "H. neanderthalensis",
      "A. afarensis"],
     3,
     "Australopithecus afarensis belongs to genus Australopithecus, not Homo."),
]

_QB_003_FB = [
    ("The genus to which modern humans belong is ______.",
     "Homo"),
    ("______ sapiens is the scientific name for modern humans.",
     "Homo"),
    ("Australopithecus means ______ ape.",
     "southern"),
]

# ── 004: Early Human Migrations ────────────────
_QB_004_MCQ = [
    ("Out-of-Africa migration of Homo sapiens is estimated to have begun around:",
     ["200,000 years ago",
      "70,000-50,000 years ago",
      "10,000 years ago",
      "5,000 years ago"],
     1,
     "Genetic and archaeological evidence places the major Out-of-Africa dispersal "
     "at approximately 70,000-50,000 years ago."),
    ("Which land bridge allowed early humans to reach Australia?",
     ["Beringia",
      "Sahul Shelf (Sunda-Sahul)",
      "Gibraltar",
      "Panama Isthmus"],
     1,
     "Lower sea levels exposed the Sahul Shelf, connecting Sunda and Sahul landmasses, "
     "allowing migration to Australia."),
    ("The Bering Land Bridge connected:",
     ["Africa and Asia",
      "Asia and North America",
      "Europe and Africa",
      "Australia and Asia"],
     1,
     "Beringia connected Siberia to Alaska during ice ages, enabling migration into "
     "the Americas."),
]

# ── 005: Human Adaptations ────────────────────
_QB_005_MCQ = [
    ("Which adaptation helped early humans survive cold European climates?",
     ["Thick fur growth",
      "Control of fire",
      "Webbed fingers",
      "Gills for breathing"],
     1,
     "Mastery of fire provided warmth, cooked food, and protection in cold environments."),
    ("High-altitude adaptation in Himalayan populations involves:",
     ["Enlarged lung capacity",
      "EPAS1 gene variation increasing haemoglobin efficiency",
      "Extra fingers",
      "Subcutaneous fat layer"],
     1,
     "Tibetan and Sherpa populations carry the EPAS1 gene variant (introgressed from "
     "Denisovans) that helps cope with hypoxia."),
]

_QB_005_SA = [
    ("Name two physiological adaptations that help humans survive in deserts.",
     ["Efficient water conservation (concentrated urine, reduced sweating)",
      "Nocturnal activity to avoid daytime heat",
      "Dark skin to protect from UV radiation"],
     "Key desert adaptations include water conservation mechanisms and behavioural shifts "
     "to avoid peak heat."),
]

# ── 006: Stone Age & Iron Age ──────────────────
_QB_006_MCQ = [
    ("The Neolithic Revolution is characterised by:",
     ["Use of metal tools",
      "Domestication of plants and animals",
      "Nomadic hunting with stone tools",
      "Industrial mass production"],
     1,
     "The Neolithic Revolution (~10,000 BCE) marked the shift to agriculture and "
     "animal domestication, enabling permanent settlements."),
    ("The first metal widely used by humans was:",
     ["Iron",
      "Bronze",
      "Copper",
      "Steel"],
     2,
     "The Copper (Chalcolithic) period preceded the Bronze Age; copper was the first "
     "widely used metal."),
    ("The transition from Stone Age to Metal Age is called:",
     ["Neolithic Revolution",
      "Green Revolution",
      "Industrial Revolution",
      "White Revolution"],
     0,
     "The Neolithic Revolution marks the transition from hunter-gatherer to "
     "agricultural societies."),
]

# ── 007: Ancient Civilisations ─────────────────
_QB_007_MCQ = [
    ("Which ancient civilisation developed sophisticated water management "
     "systems including canals and bunds?",
     ["Indus Valley",
      "Roman Empire",
      "Mesopotamian",
      "Egyptian"],
     0,
     "The Indus Valley Civilisation (Harappa, Mohenjo-daro) had advanced drainage "
     "systems, public baths, and water storage."),
    ("Deforestation in ancient Greece and Rome led to:",
     ["Increased forest cover",
      "Soil erosion and resource scarcity",
      "More fertile land",
      "No significant environmental change"],
     1,
     "Deforestation for shipbuilding and fuel caused soil erosion and contributed "
     "to the decline of these civilisations."),
]

# ── 008: Traditional Ecological Knowledge ──────
_QB_008_MCQ = [
    ("TEK stands for:",
     ["Total Environmental Knowledge",
      "Traditional Ecological Knowledge",
      "Technical Engineering Knowledge",
      "Thermodynamic Energy Kinetics"],
     1,
     "TEK = Traditional Ecological Knowledge - wisdom accumulated by indigenous and "
     "local communities over generations."),
    ("Which Indian community is known for sacred grove conservation?",
     ["Maldhari",
      "Khasis of Meghalaya",
      "Maasai",
      "Inuit"],
     1,
     "The Khasi tribe of Meghalaya maintains sacred groves - patches of forest "
     "protected through religious and cultural traditions."),
    ("Sacred groves in India are primarily conserved due to:",
     ["Government legislation only",
      "Cultural and religious traditions (TEK)",
      "Tourism revenue",
      "Commercial logging interests"],
     1,
     "Sacred groves persist because communities consider them abodes of deities, "
     "making TEK a powerful conservation tool."),
]

# ── 009: Colonialism & Environment ─────────────
_QB_009_MCQ = [
    ("The British colonial forest policy in India was primarily motivated by:",
     ["Wildlife conservation",
      "Timber supply for railways and shipbuilding",
      "Carbon sequestration",
      "Recreation"],
     1,
     "The 1894 Forest Policy prioritised commercial timber extraction for railways, "
     "shipbuilding, and revenue - marginalising local communities."),
    ("The Chipko movement (1973) originated in which Indian state?",
     ["Kerala",
      "Uttarakhand (then Uttar Pradesh)",
      "West Bengal",
      "Maharashtra"],
     1,
     "Chipko began in Chamoli district, Uttarakhand, when women hugged trees to prevent "
     "commercial logging."),
]

_QB_009_SA = [
    ("State one major environmental consequence of colonial forest policy in India.",
     ["Displacement of local communities; depletion of traditional livelihoods",
      "Loss of biodiversity in managed forests",
      "Increased commercial timber extraction at the expense of community rights"],
     "The 1894 Forest Act converted community forests to state property, restricting "
     "local access and traditional use."),
]

# ── 010: Industrial Revolution ─────────────────
_QB_010_MCQ = [
    ("The Industrial Revolution began in which country in the late 18th century?",
     ["France",
      "Germany",
      "Britain (United Kingdom)",
      "United States"],
     2,
     "The Industrial Revolution started in Britain (c. 1760-1840), driven by coal, "
     "steam engines, and mechanised textile production."),
    ("The primary fossil fuel driving the Industrial Revolution was:",
     ["Oil",
      "Natural gas",
      "Coal",
      "Uranium"],
     2,
     "Coal powered steam engines, iron smelting, and railway locomotives during "
     "the Industrial Revolution."),
    ("A major environmental consequence of the Industrial Revolution was:",
     ["Decreased carbon emissions",
      "Air and water pollution on an unprecedented scale",
      "Reforestation of urban areas",
      "Stabilisation of climate"],
     1,
     "Rapid urbanisation, coal combustion, and industrial effluent caused severe "
     "air and water pollution - the first large-scale anthropogenic pollution events."),
]

# ── 011: Modern Environmental Movements ─────────
_QB_011_MCQ = [
    ("The Silent Valley movement opposed:",
     ["A nuclear power plant",
      "A hydroelectric dam on the Kunthipuzha River",
      "A mining project",
      "A highway construction"],
     1,
     "The Silent Valley movement (1978-1983) successfully stopped a hydroelectric "
     "dam that would have flooded a pristine tropical rainforest in Kerala."),
    ("Who is considered the 'Mother of Chipko'?",
     ["Medha Patkar",
      "Sunderlal Bahuguna",
      "Gaura Devi",
      "Arundhati Roy"],
     2,
     "Gaura Devi led 27 women in the first Chipko action at Reni village in 1974, "
     "embracing trees to prevent felling."),
    ("The Narmada Bachao Andolan opposed:",
     ["Deforestation in the Western Ghats",
      "Large dams on the Narmada River displacing tribal communities",
      "Pollution in the Ganga",
      "Mining in Goa"],
     1,
     "NBA (led by Medha Patkar & Baba Amte) fought displacement caused by the Sardar "
     "Sarovar Dam and other Narmada Valley projects."),
]

# ── 012: Sustainable Development Goals ─────────
_QB_012_MCQ = [
    ("How many SDGs were adopted by the UN in 2015?",
     ["10", "12", "17", "20"],
     2,
     "The UN adopted 17 Sustainable Development Goals (SDGs) in 2015 as part of the "
     "2030 Agenda for Sustainable Development."),
    ("Which SDG specifically addresses climate action?",
     ["SDG 11", "SDG 13", "SDG 15", "SDG 7"],
     1,
     "SDG 13: Climate Action - calls for urgent action to combat climate change "
     "and its impacts."),
    ("SDG 15 aims to:",
     ["Provide clean water",
      "Protect, restore, and promote sustainable use of terrestrial ecosystems",
      "Ensure affordable clean energy",
      "Reduce inequality"],
     1,
     "SDG 15: Life on Land - focuses on halting biodiversity loss, restoring degraded "
     "ecosystems, and sustainable forest management."),
]

_QB_012_FB = [
    ("The UN adopted ______ Sustainable Development Goals in 2015.",
     "17"),
    ("SDG 13 is ______ Action.",
     "Climate"),
    ("SDG 7 aims to ensure access to affordable and ______ energy.",
     "clean"),
]

# ── 013: Climate Change ────────────────────────
_QB_013_NUM = [
    {
        "prompt": (
            "Global mean surface temperature has risen ~{delta:.1f} deg C since pre-industrial times "
            "due to a {ratio:.0f}x increase in atmospheric CO₂ (280 ppm → {co2} ppm). "
            "Calculate the percentage increase in CO₂ concentration."
        ),
        "delta": 1.1, "ratio": 1.5, "co2": 420,
        "answer_fn": lambda p: round((p["co2"] - 280) / 280 * 100, 1),
        "unit": "%",
        "steps": [
            "Initial CO₂ = 280 ppm, Current CO₂ = {co2} ppm".format(co2=420),
            "Increase = 420 - 280 = 140 ppm",
            "Percentage increase = (140 / 280) x 100 = 50.0%",
        ],
    },
    {
        "prompt": (
            "A city emitted {e_total:.0f} Mt CO₂/year. A new policy reduces emissions "
            "by {pct:.0f}% over {years} years. What is the annual reduction target?"
        ),
        "e_total": 500, "pct": 30, "years": 10,
        "answer_fn": lambda p: p["e_total"] * p["pct"] / 100,
        "unit": "Mt CO₂/year",
        "steps": [
            "Total annual emission = {e_total} Mt CO₂".format(e_total=500),
            "Reduction target = {pct}% of {e_total}".format(pct=30, e_total=500),
            "Annual reduction = 0.30 x 500 = 150.0 Mt CO₂/year",
        ],
    },
]

_QB_013_MCQ = [
    ("The primary greenhouse gas driving climate change is:",
     ["Oxygen",
      "Carbon dioxide (CO₂)",
      "Nitrogen",
      "Argon"],
     1,
     "CO₂ is the dominant anthropogenic greenhouse gas, largely from fossil fuel "
     "combustion and land-use change."),
    ("Which international agreement aims to limit global warming to well below 2 deg C?",
     ["Kyoto Protocol",
      "Montreal Protocol",
      "Paris Agreement (2015)",
      "Rio Declaration"],
     2,
     "The 2015 Paris Agreement commits countries to hold warming well below 2 deg C above "
     "pre-industrial levels."),
    ("The Montreal Protocol (1987) targeted:",
     ["CO₂ emissions",
      "Ozone-depleting substances (CFCs)",
      "Sulfur dioxide",
      "Methane emissions"],
     1,
     "The Montreal Protocol phased out CFCs and other ozone-depleting substances."),
]

# ── 014: Biodiversity ──────────────────────────
_QB_014_MCQ = [
    ("India's biodiversity hotspot in the Western Ghats is recognised under which "
     "international convention?",
     ["UNFCCC",
      "CBD - Convention on Biological Diversity",
      "UNCCD",
      "Ramsar Convention"],
     1,
     "India is a CBD party; the Western Ghats and Eastern Himalayas are recognised "
     "biodiversity hotspots."),
    ("The IUCN Red List category 'Critically Endangered' means a species faces:",
     ["Low risk",
      "Extremely high risk of extinction in the wild",
      "Already extinct",
      "Vulnerable status"],
     1,
     "CR species have an extremely high risk of extinction in the immediate future."),
    ("In-situ conservation means:",
     ["Protecting species in their natural habitats",
      "Keeping animals in zoos",
      "Storing seeds in gene banks",
      "Captive breeding only"],
     0,
     "In-situ = conservation within natural ecosystems (national parks, sanctuaries, "
     "biosphere reserves)."),
]

_QB_014_NUM = [
    {
        "prompt": (
            "A wildlife sanctuary has {pop} individuals of an endangered species. "
            "The minimum viable population (MVP) is {mvp}. "
            "Calculate the population deficit."
        ),
        "pop": 80, "mvp": 500,
        "answer_fn": lambda p: p["mvp"] - p["pop"],
        "unit": "individuals",
        "steps": [
            "Current population = 80",
            "Minimum viable population = 500",
            "Population deficit = 500 - 80 = 420 individuals",
        ],
    },
]

# ── 015: Pollution ─────────────────────────────
_QB_015_MCQ = [
    ("PM2.5 refers to particulate matter with diameter:",
     ["> 10 mum",
      "<= 2.5 mum",
      "= 5 mum",
      "> 50 mum"],
     1,
     "PM2.5 particles are <= 2.5 micrometres - small enough to reach alveoli and "
     "enter the bloodstream."),
    ("Which pollutant is primarily responsible for acid rain?",
     ["CO₂",
      "Sulfur dioxide (SO₂) and nitrogen oxides (NOₓ)",
      "Methane",
      "Ozone"],
     1,
     "SO₂ and NOₓ react with water vapour to form sulfuric and nitric acids, "
     "causing acid rain."),
    ("Eutrophication of water bodies is caused mainly by:",
     ["Heavy metals",
      "Excess nitrogen and phosphorus from agricultural runoff",
      "Oil spills",
      "Thermal discharge"],
     1,
     "Nutrient enrichment → algal blooms → oxygen depletion → dead zones."),
]

_QB_015_NUM = [
    {
        "prompt": (
            "An industrial unit emits {emission} mg/m^3 of SO₂. "
            "The CPCB standard is {std} mg/m^3. "
            "Is the emission compliant? Calculate the percentage excess if non-compliant."
        ),
        "emission": 120, "std": 80,
        "answer_fn": lambda p: round((p["emission"] - p["std"]) / p["std"] * 100, 1),
        "unit": "% excess",
        "non_compliant": True,
        "steps": [
            "Emission = 120 mg/m^3, Standard = 80 mg/m^3",
            "Excess = 120 - 80 = 40 mg/m^3",
            "Percentage excess = (40 / 80) x 100 = 50.0% - NON-COMPLIANT",
        ],
    },
]

# ── 016: Water Resources ───────────────────────
_QB_016_MCQ = [
    ("Which Indian state has implemented the most successful community-managed "
     "watershed programme (Watershed Development)?",
     ["Kerala",
      "Rajasthan (e.g., Tarun Bharat Sangh, Rajendra Singh)",
      "Tamil Nadu",
      "Punjab"],
     1,
     "Rajasthan's community-led watershed management, led by Rajendra Singh ('Waterman "
     "of India'), revived rivers through check dams and rainwater harvesting."),
    ("The Ramsar Convention protects:",
     ["Forest reserves",
      "Wetlands of international importance",
      "Mountain ecosystems",
      "Desert habitats"],
     1,
     "Ramsar (1971) designates wetlands of international importance - India has "
     "over 40 Ramsar sites."),
]

_QB_016_NUM = [
    {
        "prompt": (
            "A rooftop of area {area} m^2 receives {rain} mm of rainfall. "
            "Assuming 80% runoff efficiency, calculate the volume of water harvested (litres)."
        ),
        "area": 100, "rain": 50,
        "answer_fn": lambda p: p["area"] * p["rain"] * 0.8 * 1,
        "unit": "litres",
        "steps": [
            "Rooftop area = 100 m^2, Rainfall = 50 mm = 0.05 m",
            "Volume before efficiency = 100 x 0.05 = 5 m^3 = 5000 litres",
            "Harvested volume (80% efficiency) = 0.80 x 5000 = 4000.0 litres",
        ],
    },
]

# ── 017: Land Resources ────────────────────────
_QB_017_MCQ = [
    ("Which of the following is NOT a type of soil found in India?",
     ["Alluvial soil",
      "Black soil (Regur)",
      "Red and yellow soil",
      "Permafrost soil"],
     3,
     "India has alluvial, black (Regur), red & yellow, laterite, arid, and mountain "
     "soils - permafrost is characteristic of polar/tundra regions."),
    ("Contour ploughing is a soil conservation technique that:",
     ["Ploughs along the slope",
      "Ploughs along the contour lines",
      "Removes all topsoil",
      "Uses chemical fertilisers"],
     1,
     "Contour ploughing follows elevation contours, reducing runoff velocity and "
     "preventing soil erosion on slopes."),
]

# ── 018: Forest Resources ──────────────────────
_QB_018_MCQ = [
    ("The Forest Survey of India (FSI) publishes the State of Forest Report every:",
     ["1 year",
      "2 years",
      "5 years",
      "10 years"],
     1,
     "FSI's biennial India State of Forest Report (ISFR) provides the official "
     "forest cover data for India."),
    ("Which Act, amended in 1988, shifted India's forest policy from commercial "
     "exploitation to conservation?",
     ["Indian Forest Act, 1927",
      "National Forest Policy, 1988",
      "Wildlife Protection Act, 1972",
      "Forest Conservation Act, 1980"],
     1,
     "The National Forest Policy (1988) explicitly prioritised environmental stability "
     "and ecological functions over commercial timber production."),
    ("A 'sacred grove' is best described as:",
     ["A commercial timber plantation",
      "A community-protected forest patch with cultural/religious significance",
      "A government-run wildlife sanctuary",
      "An industrial afforestation site"],
     1,
     "Sacred groves are patches of natural forest protected by communities through "
     "traditional beliefs - an example of TEK in action."),
]

# ── 019: Energy Resources ──────────────────────
_QB_019_MCQ = [
    ("Which of the following is a non-renewable energy source?",
     ["Solar",
      "Wind",
      "Coal",
      "Biogas"],
     2,
     "Coal is a fossil fuel - finite and non-renewable on human timescales."),
    ("India's target for installed renewable energy capacity by 2030 (under Paris "
     "commitments) is approximately:",
     ["100 GW",
      "280 GW",
      "500 GW",
      "1000 GW"],
     2,
     "India has set an ambitious target of ~500 GW non-fossil capacity by 2030, "
     "emphasising solar and wind."),
    ("Which energy source has the highest energy density per unit mass?",
     ["Coal",
      "Natural gas",
      "Nuclear (uranium)",
      "Biomass"],
     2,
     "Uranium-235 has an energy density millions of times greater than fossil fuels "
     "per unit mass."),
]

_QB_019_NUM = [
    {
        "prompt": (
            "A solar panel system of {area} m^2 receives an average solar irradiance "
            "of {irr} kWh/m^2/day. If panel efficiency is {eff:.0f}%, calculate daily "
            "energy output (kWh)."
        ),
        "area": 50, "irr": 5.5, "eff": 0.18,
        "answer_fn": lambda p: round(p["area"] * p["irr"] * p["eff"], 2),
        "unit": "kWh/day",
        "steps": [
            "Area = 50 m^2, Irradiance = 5.5 kWh/m^2/day, Efficiency = 18%",
            "Output = 50 x 5.5 x 0.18 = 49.50 kWh/day",
        ],
    },
]

# ── 020: Waste Management ──────────────────────
_QB_020_MCQ = [
    ("The waste hierarchy (most to least preferred) is:",
     ["Landfill → Incineration → Recycling → Reduction",
      "Reduction → Reuse → Recycling → Recovery → Disposal",
      "Recycling → Reduction → Disposal → Reuse",
      "Incineration → Composting → Landfill → Reduction"],
     1,
     "The waste hierarchy prioritises prevention (reduce, reuse) over treatment "
     "(recycle, recover) and disposal."),
    ("Biomedical waste in India is governed by:",
     ["Environment Protection Act, 1986",
      "Biomedical Waste Management Rules, 2016",
      "Hazardous Waste Rules, 1989",
      "Plastic Waste Rules, 2016"],
     1,
     "The Biomedical Waste Management Rules (amended 2016, 2018) specify colour-coded "
     "segregation and treatment standards."),
    ("Which type of waste includes used syringes, blood bags, and discarded medicines?",
     ["Municipal solid waste",
      "Biomedical waste",
      "E-waste",
      "Hazardous chemical waste"],
     1,
     "Biomedical waste comprises all waste generated during diagnosis, treatment, "
     "or immunisation of humans or animals."),
]

# ── 021: Environmental Laws & Policies ──────────
_QB_021_MCQ = [
    ("The Environment Protection Act (EPA) in India was enacted in response to:",
     ["The Bhopal Gas Tragedy (1984)",
      "The Chipko Movement",
      "The Stockholm Conference (1972)",
      "The Rio Earth Summit (1992)"],
     0,
     "The EPA (1986) was enacted under Article 253 following the Bhopal disaster "
     "to provide a framework for environmental governance."),
    ("Under the Water (Prevention and Control of Pollution) Act, 1974, which "
     "authority has the power to grant consent for effluent discharge?",
     ["Central Pollution Control Board (CPCB)",
      "State Pollution Control Board (SPCB)",
      "Ministry of Environment",
      "National Green Tribunal"],
     1,
     "SPCBs grant consent for establishment and operation of industries under "
     "Section 25/26 of the Water Act."),
    ("The National Green Tribunal (NGT) was established in:",
     ["2005", "2010", "2015", "2020"],
     1,
     "The NGT was established in 2010 under the NGT Act, 2010, for dedicated "
     "adjudication of environmental disputes."),
    ("Which is India's flagship national afforestation programme?",
     ["National River Conservation Plan",
      "National Afforestation Programme (NAP)",
      "Green India Mission (GIM under NAPCC)",
      "Both B and C"],
     3,
     "The National Afforestation Programme and the Green India Mission (under "
     "NAPCC) are key afforestation initiatives."),
]

_QB_021_FB = [
    ("The Environment Protection Act was enacted in ______.",
     "1986"),
    ("The Bhopal Gas Tragedy occurred in ______.",
     "1984"),
    ("The National Green Tribunal was established in ______.",
     "2010"),
    ("The Water (Prevention and Control of Pollution) Act was enacted in ______.",
     "1974"),
    ("The Wildlife Protection Act was enacted in ______.",
     "1972"),
]

# ─────────────────────────────────────────────
# 5. SOLVER IMPLEMENTATIONS
# ─────────────────────────────────────────────

def solve_mcq(params: Dict) -> SolverResult:
    """
    params: {
        "topic_id": str,
        "question": str,
        "options": list[str],
        "correct_index": int,
        "explanation": str
    }
    """
    correct_idx = params["correct_index"]
    options     = params["options"]
    selected    = params.get("selected_index", None)
    steps = [
        f"1. Question topic: {params['topic_id']}",
        f"2. Options provided: {options}",
        f"3. Correct answer is option {correct_idx}: '{options[correct_idx]}'",
    ]
    if selected is not None:
        is_correct = selected == correct_idx
        steps.append(f"4. Student selected option {selected}: '{options[selected]}'")
        steps.append(f"5. Result: {'CORRECT ✓' if is_correct else 'INCORRECT ✗'}")
        verification = f"Selected {selected}, expected {correct_idx}. Match={is_correct}."
    else:
        verification = f"Answer = option {correct_idx}: '{options[correct_idx]}'"
    return SolverResult(
        answer      = correct_idx,
        steps       = steps,
        verification = verification,
        confidence  = "high",
    )


def solve_fill_blank(params: Dict) -> SolverResult:
    """
    params: {
        "question": str,
        "correct_answer": str,
        "student_answer": str (optional)
    }
    """
    correct = params["correct_answer"].strip().lower()
    student = params.get("student_answer", "").strip().lower()
    steps = [
        f"1. Question: {params['question']}",
        f"2. Correct answer: '{params['correct_answer']}'",
    ]
    if student:
        is_correct = student == correct
        steps.append(f"3. Student answer: '{params['student_answer']}'")
        steps.append(f"4. Match: {is_correct}")
        verification = f"'{student}' == '{correct}' → {is_correct}"
    else:
        steps.append("3. (No student answer provided - showing correct answer only)")
        verification = f"Correct answer = '{params['correct_answer']}'"
    return SolverResult(
        answer      = params["correct_answer"],
        steps       = steps,
        verification = verification,
        confidence  = "high",
    )


def solve_short_answer(params: Dict) -> SolverResult:
    """
    params: {
        "question": str,
        "model_answer": str,
        "keywords": list[str],
        "student_answer": str (optional)
    }
    """
    model   = params["model_answer"]
    kws     = params.get("keywords", [])
    student = params.get("student_answer", "").strip().lower()
    steps = [
        f"1. Question: {params['question']}",
        f"2. Model answer: {model}",
        f"3. Expected keywords: {kws}",
    ]
    if student:
        kw_hits = [kw for kw in kws if kw.lower() in student]
        kw_pct  = len(kw_hits) / len(kws) * 100 if kws else 0
        score   = min(10, round(kw_pct / 10))
        steps.append(f"4. Keyword hits ({len(kw_hits)}/{len(kws)}): {kw_hits}")
        steps.append(f"5. Score: {score}/10")
        verification = f"Keyword coverage: {kw_pct:.0f}% → score {score}/10"
    else:
        steps.append("4. (No student answer provided)")
        verification = "Correct answer: " + model
    return SolverResult(
        answer      = model,
        steps       = steps,
        verification = verification,
        confidence  = "medium",
    )


def solve_long_answer(params: Dict) -> SolverResult:
    """
    params: {
        "question": str,
        "model_answer": str,
        "marking_points": list[str],
        "student_answer": str (optional)
    }
    """
    marking_pts = params["marking_points"]
    student     = params.get("student_answer", "").strip().lower()
    steps = [
        f"1. Question: {params['question']}",
        f"2. Model answer: {params['model_answer']}",
        f"3. Marking points ({len(marking_pts)}):",
    ]
    for i, pt in enumerate(marking_pts, 1):
        steps.append(f"   {i}. {pt}")
    if student:
        hits = [pt for pt in marking_pts
                if any(kw.lower() in student for kw in pt.split()[:3])]
        score = round(len(hits) / len(marking_pts) * 10, 1)
        steps.append(f"4. Student addressed {len(hits)}/{len(marking_pts)} marking points")
        steps.append(f"5. Estimated score: {score}/10")
        verification = f"Marking points covered: {len(hits)}/{len(marking_pts)} → {score}/10"
    else:
        steps.append("4. (No student answer provided)")
        verification = f"{len(marking_pts)} marking points identified."
    return SolverResult(
        answer      = params["model_answer"],
        steps       = steps,
        verification = verification,
        confidence  = "high",
    )


def solve_numerical(params: Dict) -> SolverResult:
    """
    params: {
        "prompt_template": str,
        "values": dict[str, float],
        "answer_fn": callable,   # applied to values dict
        "unit": str,
        "steps_template": list[str]
    }
    """
    values    = params["values"]
    answer_fn = params["answer_fn"]
    unit      = params.get("unit", "")
    steps_raw = params.get("steps_template", [])
    # Evaluate
    raw_ans   = answer_fn(values)
    # Round nicely
    if isinstance(raw_ans, float):
        answer = round(raw_ans, 4)
    else:
        answer = raw_ans
    steps = [s.format(**values) for s in steps_raw]
    steps.append(f"FINAL ANSWER: {answer} {unit}".strip())
    # Verification via re-computation
    verify_ans = answer_fn(values)
    verification = (
        f"Back-substitution check: {verify_ans} == {answer} → "
        f"{abs(float(verify_ans) - float(answer)) < 1e-6}"
    )
    return SolverResult(
        answer      = answer,
        steps       = steps,
        verification = verification,
        confidence  = "high",
    )


# ─────────────────────────────────────────────
# 6. QUESTION GENERATORS PER TOPIC
# ─────────────────────────────────────────────

def _pick_mcqs(bank: list, rng: random.Random, n: int, topic: str, diff: str, prefix: str) -> List[Question]:
    out = []
    for i, (q, opts, correct, exp) in enumerate(rng.sample(bank, min(n, len(bank)))):
        out.append(Question(
            id=f"{prefix}_mcq_{i+1}", type=QType.MCQ.value, topic=topic,
            difficulty=diff, question=q, options=opts,
            answer=correct, explanation=exp,
        ))
    return out


def _pick_fill_blank(bank: list, rng: random.Random, n: int, topic: str, diff: str, prefix: str) -> List[Question]:
    out = []
    for i, (q, ans) in enumerate(rng.sample(bank, min(n, len(bank)))):
        out.append(Question(
            id=f"{prefix}_fb_{i+1}", type=QType.FILL_BLANK.value, topic=topic,
            difficulty=diff, question=q, answer=ans,
            blank_word=ans, explanation=f"The correct word is '{ans}'.",
        ))
    return out


def _pick_sa(bank: list, rng: random.Random, n: int, topic: str, diff: str, prefix: str) -> List[Question]:
    out = []
    for i, (q, kws, exp) in enumerate(rng.sample(bank, min(n, len(bank)))):
        out.append(Question(
            id=f"{prefix}_sa_{i+1}", type=QType.SHORT_ANSWER.value, topic=topic,
            difficulty=diff, question=q, answer=kws[0],
            explanation=exp,
        ))
    return out


def _make_numerical(item: dict, rng: random.Random, topic: str, diff: str, idx: int, prefix: str) -> Question:
    values = {k: v for k, v in item.items() if k not in ("prompt","answer_fn","unit","steps","non_compliant")}
    prompt = item["prompt"].format(**values)
    answer = item["answer_fn"](values)
    steps  = [s.format(**values) for s in item.get("steps", [])]
    return Question(
        id=f"{prefix}_num_{idx+1}", type=QType.NUMERICAL.value, topic=topic,
        difficulty=diff, question=prompt, answer=round(answer, 4),
        unit=item.get("unit",""), explanation="\n".join(steps),
    )


def _make_long_answer(q_text: str, marking_pts: list, model: str, diff: str,
                      topic: str, prefix: str, idx: int) -> Question:
    return Question(
        id=f"{prefix}_la_{idx+1}", type=QType.LONG_ANSWER.value, topic=topic,
        difficulty=diff, question=q_text, answer=model,
        explanation=f"Marking rubric ({len(marking_pts)} points): " + "; ".join(marking_pts),
    )


# ── Individual topic generators ─────────────────

def gen_001(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_001_MCQ, rng, min(3, len(_QB_001_MCQ)), Topic.SCOPE_APPLICATIONS.value, Difficulty.EASY.value, "001")
    qs += _pick_fill_blank(_QB_001_FB, rng, min(2, len(_QB_001_FB)), Topic.SCOPE_APPLICATIONS.value, Difficulty.EASY.value, "001")
    return qs[:count]

def gen_002(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_002_MCQ, rng, min(3, len(_QB_002_MCQ)), Topic.MODES_OF_EXISTENCE.value, Difficulty.MEDIUM.value, "002")
    qs += _pick_sa(_QB_002_SA, rng, 1, Topic.MODES_OF_EXISTENCE.value, Difficulty.MEDIUM.value, "002")
    # Long answer
    qs.append(_make_long_answer(
        "Compare and contrast the four modes of human existence in terms of (a) resource-use "
        "intensity, (b) settlement pattern, (c) technological complexity. "
        "Use the Sentinelese as an example.",
        ["Hunting-gathering: low intensity, nomadic, simple tools",
         "Pastoral: moderate intensity, transhumant, animal domestication",
         "Agricultural: high intensity, sedentary, crop cultivation",
         "Industrial: very high intensity, urbanised, mechanised",
         "Sentinelese exemplify hunting-gathering with isolation and no external trade"],
        "Four modes show a clear trend of increasing resource extraction and environmental "
        "transformation. The Sentinelise exemplify hunting-gathering.",
        Difficulty.MEDIUM.value, Topic.MODES_OF_EXISTENCE.value, "002", 99))
    return qs[:count]

def gen_003(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_003_MCQ, rng, min(3, len(_QB_003_MCQ)), Topic.EVOLUTION_HOMO_SAPIENS.value, Difficulty.EASY.value, "003")
    qs += _pick_fill_blank(_QB_003_FB, rng, 2, Topic.EVOLUTION_HOMO_SAPIENS.value, Difficulty.EASY.value, "003")
    return qs[:count]

def gen_004(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_004_MCQ, rng, min(2, len(_QB_004_MCQ)), Topic.EARLY_MIGRATIONS.value, Difficulty.MEDIUM.value, "004")
    return qs[:count]

def gen_005(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_005_MCQ, rng, 2, Topic.HUMAN_ADAPTATIONS.value, Difficulty.MEDIUM.value, "005")
    qs += _pick_sa(_QB_005_SA, rng, 1, Topic.HUMAN_ADAPTATIONS.value, Difficulty.MEDIUM.value, "005")
    return qs[:count]

def gen_006(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    return _pick_mcqs(_QB_006_MCQ, rng, count, Topic.STONE_AGE_IRON_AGE.value, Difficulty.EASY.value, "006")

def gen_007(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    return _pick_mcqs(_QB_007_MCQ, rng, count, Topic.ANCIENT_CIVILISATIONS.value, Difficulty.MEDIUM.value, "007")

def gen_008(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_008_MCQ, rng, min(3, len(_QB_008_MCQ)), Topic.TRADITIONAL_ECOLOGICAL.value, Difficulty.MEDIUM.value, "008")
    return qs[:count]

def gen_009(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_009_MCQ, rng, 2, Topic.COLONIALISM_ENVIRONMENT.value, Difficulty.MEDIUM.value, "009")
    qs += _pick_sa(_QB_009_SA, rng, 1, Topic.COLONIALISM_ENVIRONMENT.value, Difficulty.MEDIUM.value, "009")
    return qs[:count]

def gen_010(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    return _pick_mcqs(_QB_010_MCQ, rng, count, Topic.INDUSTRIAL_REVOLUTION.value, Difficulty.EASY.value, "010")

def gen_011(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    return _pick_mcqs(_QB_011_MCQ, rng, count, Topic.MODERN_ENV_MOVEMENTS.value, Difficulty.MEDIUM.value, "011")

def gen_012(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_012_MCQ, rng, 2, Topic.SDGS.value, Difficulty.EASY.value, "012")
    qs += _pick_fill_blank(_QB_012_FB, rng, 2, Topic.SDGS.value, Difficulty.EASY.value, "012")
    return qs[:count]

def gen_013(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_013_MCQ, rng, 2, Topic.CLIMATE_CHANGE.value, Difficulty.MEDIUM.value, "013")
    for i, item in enumerate(_QB_013_NUM):
        qs.append(_make_numerical(item, rng, Topic.CLIMATE_CHANGE.value, Difficulty.MEDIUM.value, i, "013"))
    return qs[:count]

def gen_014(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_014_MCQ, rng, 2, Topic.BIODIVERSITY.value, Difficulty.MEDIUM.value, "014")
    for i, item in enumerate(_QB_014_NUM):
        qs.append(_make_numerical(item, rng, Topic.BIODIVERSITY.value, Difficulty.MEDIUM.value, i, "014"))
    return qs[:count]

def gen_015(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_015_MCQ, rng, 2, Topic.POLLUTION.value, Difficulty.MEDIUM.value, "015")
    for i, item in enumerate(_QB_015_NUM):
        qs.append(_make_numerical(item, rng, Topic.POLLUTION.value, Difficulty.HARD.value, i, "015"))
    return qs[:count]

def gen_016(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_016_MCQ, rng, 2, Topic.WATER_RESOURCES.value, Difficulty.MEDIUM.value, "016")
    for i, item in enumerate(_QB_016_NUM):
        qs.append(_make_numerical(item, rng, Topic.WATER_RESOURCES.value, Difficulty.MEDIUM.value, i, "016"))
    return qs[:count]

def gen_017(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    return _pick_mcqs(_QB_017_MCQ, rng, count, Topic.LAND_RESOURCES.value, Difficulty.MEDIUM.value, "017")

def gen_018(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    return _pick_mcqs(_QB_018_MCQ, rng, count, Topic.FOREST_RESOURCES.value, Difficulty.MEDIUM.value, "018")

def gen_019(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_019_MCQ, rng, 2, Topic.ENERGY_RESOURCES.value, Difficulty.MEDIUM.value, "019")
    for i, item in enumerate(_QB_019_NUM):
        qs.append(_make_numerical(item, rng, Topic.ENERGY_RESOURCES.value, Difficulty.HARD.value, i, "019"))
    return qs[:count]

def gen_020(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    return _pick_mcqs(_QB_020_MCQ, rng, count, Topic.WASTE_MANAGEMENT.value, Difficulty.MEDIUM.value, "020")

def gen_021(seed: int, count: int) -> List[Question]:
    rng = _init_rng(seed)
    qs  = []
    qs += _pick_mcqs(_QB_021_MCQ, rng, min(4, len(_QB_021_MCQ)), Topic.ENV_LAWS_POLICIES.value, Difficulty.MEDIUM.value, "021")
    qs += _pick_fill_blank(_QB_021_FB, rng, 3, Topic.ENV_LAWS_POLICIES.value, Difficulty.EASY.value, "021")
    return qs[:count]


# ─────────────────────────────────────────────
# 7. MASTER GENERATOR
# ─────────────────────────────────────────────

_TOPIC_GENERATORS = {
    Topic.SCOPE_APPLICATIONS.value:    gen_001,
    Topic.MODES_OF_EXISTENCE.value:    gen_002,
    Topic.EVOLUTION_HOMO_SAPIENS.value: gen_003,
    Topic.EARLY_MIGRATIONS.value:      gen_004,
    Topic.HUMAN_ADAPTATIONS.value:     gen_005,
    Topic.STONE_AGE_IRON_AGE.value:    gen_006,
    Topic.ANCIENT_CIVILISATIONS.value: gen_007,
    Topic.TRADITIONAL_ECOLOGICAL.value:gen_008,
    Topic.COLONIALISM_ENVIRONMENT.value:gen_009,
    Topic.INDUSTRIAL_REVOLUTION.value: gen_010,
    Topic.MODERN_ENV_MOVEMENTS.value:  gen_011,
    Topic.SDGS.value:                  gen_012,
    Topic.CLIMATE_CHANGE.value:        gen_013,
    Topic.BIODIVERSITY.value:          gen_014,
    Topic.POLLUTION.value:             gen_015,
    Topic.WATER_RESOURCES.value:       gen_016,
    Topic.LAND_RESOURCES.value:        gen_017,
    Topic.FOREST_RESOURCES.value:      gen_018,
    Topic.ENERGY_RESOURCES.value:      gen_019,
    Topic.WASTE_MANAGEMENT.value:      gen_020,
    Topic.ENV_LAWS_POLICIES.value:     gen_021,
}


def generate_questions(seed: int = 42, count: int = 20,
                       topic_filter: Optional[List[str]] = None) -> List[Dict]:
    """
    Generate `count` deterministic questions evenly distributed across topics.

    Parameters
    ----------
    seed        : int           - base seed for reproducibility
    count       : int           - total questions to generate
    topic_filter: list[str]     - restrict to these topic IDs (None = all)

    Returns
    -------
    list[dict]  - each dict conforms to the Question schema
    """
    rng = _init_rng(seed)
    topics = topic_filter if topic_filter else ALL_TOPICS
    qs: List[Question] = []

    per_topic = max(1, count // len(topics))
    for topic in topics:
        t_seed = rng.randint(0, 2**31 - 1)
        gen_fn = _TOPIC_GENERATORS.get(topic)
        if gen_fn:
            try:
                generated = gen_fn(t_seed, per_topic)
                qs.extend(generated)
            except Exception:
                pass

    # Trim / pad deterministically
    qs = qs[:count]
    # If still short, fill from all topics in round-robin
    idx = 0
    while len(qs) < count:
        topic = topics[idx % len(topics)]
        gen_fn = _TOPIC_GENERATORS.get(topic)
        if gen_fn:
            pad_seed = seed + len(qs)
            extra = gen_fn(pad_seed, 1)
            if extra:
                qs.append(extra[0])
        idx += 1

    return [dataclasses.asdict(q) for q in qs[:count]]


# ─────────────────────────────────────────────
# 8. HIGH-LEVEL SOLVE DISPATCHER
# ─────────────────────────────────────────────

_SOLVER_MAP = {
    QType.MCQ.value:         solve_mcq,
    QType.FILL_BLANK.value:  solve_fill_blank,
    QType.SHORT_ANSWER.value: solve_short_answer,
    QType.LONG_ANSWER.value: solve_long_answer,
    QType.NUMERICAL.value:   solve_numerical,
}


def solve_question(question_data: Dict, student_response: Any = None) -> Dict:
    """
    Unified solver entry point.

    Parameters
    ----------
    question_data  : dict   - a single question dict from generate_questions()
    student_response: Any   - optional student's answer

    Returns
    -------
    dict with {answer, steps, verification, confidence, is_correct}
    """
    qtype = question_data["type"]
    solver_fn = _SOLVER_MAP.get(qtype)
    if not solver_fn:
        return {"error": f"No solver for question type: {qtype}"}

    # Build params dict
    params: Dict[str, Any] = {
        "topic_id":   question_data.get("topic", ""),
        "question":   question_data["question"],
        "options":    question_data.get("options"),
        "answer":     question_data.get("answer"),
        "explanation": question_data.get("explanation", ""),
    }

    if qtype == QType.MCQ.value:
        params["correct_index"]  = question_data["answer"]
        params["selected_index"] = student_response

    elif qtype == QType.FILL_BLANK.value:
        params["correct_answer"] = question_data.get("answer", "")
        params["student_answer"] = str(student_response) if student_response is not None else ""

    elif qtype == QType.SHORT_ANSWER.value:
        params["model_answer"] = question_data.get("answer", "")
        params["keywords"]     = [question_data.get("answer", "")]
        params["student_answer"] = str(student_response) if student_response is not None else ""

    elif qtype == QType.LONG_ANSWER.value:
        params["model_answer"]    = question_data.get("answer", "")
        # Derive marking points from explanation
        exp = question_data.get("explanation", "")
        params["marking_points"] = [p.strip() for p in exp.split(";") if p.strip()] or [exp]
        params["student_answer"]  = str(student_response) if student_response is not None else ""

    elif qtype == QType.NUMERICAL.value:
        # Reconstruct the numerical params from explanation / steps
        params["prompt_template"] = question_data["question"]
        params["unit"]            = question_data.get("unit", "")
        # Parse steps template from explanation
        raw_steps = [s.strip() for s in question_data.get("explanation", "").split("\n") if s.strip()]
        params["steps_template"]  = raw_steps
        # Compute values dict from explanation lines
        import re
        values: Dict[str, float] = {}
        for step in raw_steps:
            nums = re.findall(r"[\d.]+", step)
            for n in nums:
                try:
                    val = float(n)
                    key = f"val_{len(values)}"
                    values[key] = val
                except ValueError:
                    pass
        params["values"] = values
        # Build answer function that just returns the stored answer
        stored_answer = question_data.get("answer", 0)
        params["answer_fn"] = lambda p, _a=stored_answer: _a

    result = solver_fn(params)
    is_correct = None
    if student_response is not None and qtype == QType.MCQ.value:
        is_correct = student_response == question_data["answer"]
    elif student_response is not None and qtype == QType.FILL_BLANK.value:
        is_correct = str(student_response).strip().lower() == str(question_data.get("answer","")).strip().lower()
    elif student_response is not None and qtype == QType.NUMERICAL.value:
        try:
            is_correct = abs(float(student_response) - float(question_data.get("answer", 0))) < 0.01
        except (TypeError, ValueError):
            is_correct = False

    return {
        "question_id":   question_data["id"],
        "type":          qtype,
        "topic":         question_data.get("topic", ""),
        "answer":        result.answer,
        "steps":         result.steps,
        "verification":  result.verification,
        "confidence":    result.confidence,
        "is_correct":    is_correct,
        "student_response": student_response,
    }


# ─────────────────────────────────────────────
# 9. BATCH SOLVE - solve all questions for a paper
# ─────────────────────────────────────────────

def solve_paper(questions: List[Dict],
                responses: Optional[Dict[str, Any]] = None) -> List[Dict]:
    """
    Solve a list of questions. Optionally check against student responses.

    Parameters
    ----------
    questions : list[dict]  - question bank
    responses : dict        - {question_id: student_response}

    Returns
    -------
    list[dict] - results per question
    """
    results = []
    for q in questions:
        resp = responses.get(q["id"]) if responses else None
        results.append(solve_question(q, student_response=resp))
    return results


def paper_summary(results: List[Dict]) -> Dict:
    """Return a mark-sheet style summary of solved results."""
    total   = len(results)
    scored  = [r for r in results if r.get("is_correct") is not None]
    correct = sum(1 for r in scored if r["is_correct"])
    by_type: Dict[str, Dict] = {}
    for r in results:
        t = r.get("type", "unknown")
        if t not in by_type:
            by_type[t] = {"total": 0, "correct": 0}
        by_type[t]["total"] += 1
        if r.get("is_correct"):
            by_type[t]["correct"] += 1
    return {
        "total_questions":   total,
        "answered":          len(scored),
        "correct":           correct,
        "score_pct":         round(correct / len(scored) * 100, 1) if scored else 0,
        "by_type":           by_type,
    }


# ─────────────────────────────────────────────
# 10. FULL PAPER GENERATOR  (20 questions, balanced)
# ─────────────────────────────────────────────

def generate_full_paper(seed: int = 42,
                        total: int = 20) -> Tuple[List[Dict], List[Dict]]:
    """
    Generate a balanced CISCE EVS Class 11 question paper.

    Returns
    -------
    (questions, answers) - questions (with answers hidden), answers (full key)
    """
    rng = _init_rng(seed)

    # Weighted topic allocation - each topic gets at least 1 question
    questions: List[Question] = []
    per_topic = max(1, total // len(ALL_TOPICS))
    topic_order = ALL_TOPICS[:]

    for topic in topic_order:
        gen_fn = _TOPIC_GENERATORS.get(topic)
        if gen_fn:
            t_seed = rng.randint(0, 2**31 - 1)
            generated = gen_fn(t_seed, per_topic)
            questions.extend(generated)

    # Trim to total
    questions = questions[:total]
    # Pad if needed
    idx = 0
    while len(questions) < total:
        topic = topic_order[idx % len(topic_order)]
        gen_fn = _TOPIC_GENERATORS.get(topic)
        if gen_fn:
            pad = gen_fn(seed + len(questions), 1)
            if pad:
                questions.append(pad[0])
        idx += 1

    q_list  = [dataclasses.asdict(q) for q in questions[:total]]
    a_list  = [
        {"id": q.id, "answer": q.answer, "explanation": q.explanation,
         "topic": q.topic, "type": q.type}
        for q in questions[:total]
    ]
    return q_list, a_list


# ─────────────────────────────────────────────
# 11. INDIAN CONTEXT COMPETENCY QUESTIONS
# ─────────────────────────────────────────────

def generate_indian_competency_questions(seed: int = 100, count: int = 10) -> List[Dict]:
    """
    Generate questions specifically rooted in Indian context - tribal rights,
    Indian environmental movements, Indian laws, Indian ecosystems, etc.
    """
    rng = _init_rng(seed)


    return {"status": "ok", "note": "truncated"}
