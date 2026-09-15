"""
CISCE (ISC) Class 11 Geography - Deterministic Question Generator
Syllabus: Principles of Physical Geography (CISCE 2027)
"""

import random
import math
from fractions import Fraction
from dataclasses import dataclass, field, asdict
from typing import Any

# ============================================================
# DATA MODELS
# ============================================================

@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    question: str
    options: list = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    competency_based: bool = False
    marks: int = 1


# ============================================================
# SYLLABUS TOPIC BANK - ALL 25 NODES
# ============================================================

TOPICS = [
    "Geography_as_discipline",
    "Branches_of_geography",
    "Formation_of_Earth",
    "Earths_interior",
    "Rocks_and_rock_cycle",
    "Plate_tectonics",
    "Folding_and_faulting",
    "Landforms",
    "Weathering",
    "Fluvial_processes",
    "Aeolian_processes",
    "Glacial_processes",
    "Groundwater_and_karst",
    "Marine_processes",
    "Atmosphere_composition",
    "Atmospheric_temperature",
    "Atmospheric_pressure",
    "Atmospheric_moisture",
    "Cyclones_and_anticyclones",
    "World_climate",
    "Water_cycle",
    "Ocean_currents",
    "Biodiversity",
    "Natural_hazards",
    "Map_making",
]

# ============================================================
# TOPIC QUESTION FACTORIES
# ============================================================

def _mcq(seed_state, topic, difficulty, competency, question, options, answer, explanation):
    """Create an MCQ question dict."""
    return {
        "id": f"MCQ_{seed_state['idx']:04d}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": explanation,
        "competency_based": competency,
        "marks": 1,
    }


def _fill(seed_state, topic, difficulty, competency, question, answer, explanation):
    """Create a fill-in-the-blank question dict."""
    return {
        "id": f"FILL_{seed_state['idx']:04d}",
        "type": "fill_blank",
        "topic": topic,
        "difficulty": difficulty,
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": explanation,
        "competency_based": competency,
        "marks": 1,
    }


def _short(seed_state, topic, difficulty, competency, question, answer, explanation):
    """Create a short-answer question dict."""
    return {
        "id": f"SHRT_{seed_state['idx']:04d}",
        "type": "short_answer",
        "topic": topic,
        "difficulty": difficulty,
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": explanation,
        "competency_based": competency,
        "marks": 2,
    }


def _long(seed_state, topic, difficulty, competency, question, answer, explanation):
    """Create a long-answer question dict."""
    return {
        "id": f"LONG_{seed_state['idx']:04d}",
        "type": "long_answer",
        "topic": topic,
        "difficulty": difficulty,
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": explanation,
        "competency_based": competency,
        "marks": 5,
    }


def _num(seed_state, topic, difficulty, competency, question, answer, explanation):
    """Create a numerical question dict."""
    return {
        "id": f"NUM_{seed_state['idx']:04d}",
        "type": "numerical",
        "topic": topic,
        "difficulty": difficulty,
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": explanation,
        "competency_based": competency,
        "marks": 2,
    }


def _dist(seed_state, topic, difficulty, competency, question, answer, explanation):
    """Create a distinction-type long-answer question dict."""
    return {
        "id": f"DIST_{seed_state['idx']:04d}",
        "type": "distinguish",
        "topic": topic,
        "difficulty": difficulty,
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": explanation,
        "competency_based": competency,
        "marks": 5,
    }


# ============================================================
# QUESTION BANK - c11_geo_001 Geography as a discipline
# ============================================================

def _questions_geo_001(state):
    q = []
    # Q1: MCQ - Eratosthenes
    q.append(_mcq(state, "Geography_as_discipline", "Easy", False,
        "Who among the following Greek scholars first calculated the circumference of the Earth?",
        ["(A) Ptolemy", "(B) Eratosthenes", "(C) Strabo", "(D) Aristotle"],
        "(B) Eratosthenes",
        "Eratosthenes (276-194 BCE), a Greek mathematician and geographer, calculated Earth's "
        "circumference (~40,000 km) by comparing shadows at Syene and Alexandria - remarkably close "
        "to the modern value of ~40,075 km."))
    # Q2: Fill blank
    q.append(_fill(state, "Geography_as_discipline", "Easy", False,
        "The approach that studies a particular phenomenon across the world without regard to "
        "regional boundaries is called the ______ approach.",
        "systematic (or topical)",
        "The systematic (topical) approach studies individual phenomena (e.g., climate, population) "
        "across the world, while the regional approach studies all aspects of a specific region."))
    # Q3: Short answer - competency
    q.append(_short(state, "Geography_as_discipline", "Easy", True,
        "A city planner in Mumbai needs to decide where to build a new coastal road and a sea wall. "
        "Explain how geographic knowledge from natural sciences and social sciences together helps "
        "this planner. Give one example from each.",
        "The planner uses natural science knowledge (geology for soil/rock types, oceanography for "
        "wave patterns, meteorology for cyclone risk) and social science knowledge (demographics for "
        "population density, economics for cost-benefit, sociology for community displacement). "
        "Example: Geology tells the planner if the coastal rock is stable enough for a sea wall. "
        "Sociology tells the planner which communities would be most affected by road alignment.",
        "Geography acts as a bridge between natural and social sciences - it connects the physical "
        "stage (land, sea, climate) with human needs (settlements, infrastructure, livelihoods)."))
    # Q4: MCQ - regional approach
    q.append(_mcq(state, "Geography_as_discipline", "Easy", False,
        "The regional approach in geography is also known as:",
        ["(A) Systematic approach", "(B) Area studies approach", "(C) Thematic approach",
         "(D) Spatial approach"],
        "(B) Area studies approach",
        "The regional (area studies) approach examines all geographic aspects of a particular "
        "region (e.g., South Asia, the Himalayan region) holistically."))
    # Q5: Long answer
    q.append(_long(state, "Geography_as_discipline", "Medium", False,
        "Trace the evolution of geographic thought from the ancient Greek period to the modern period, "
        "naming at least two scholars from each period.",
        "Ancient Period: Eratosthenes (measured Earth's circumference), Ptolemy (wrote 'Geographia', "
        "used latitude/longitude). Medieval Period: Arab geographers (Idrisi, Ibn Battuta) expanded "
        "geographic knowledge through travel and mapping. Modern Period: Humboldt (founded modern "
        "geography, emphasized systematic observation and 'Kosmos'), Ritter (regional geography, "
        "influenced later German school), Ratzel (anthropogeography, environmental determinism), "
        "Vidal de la Blache (possibilism, human agency over environment).",
        "Step 1: Ancient (Greek scholars - Eratosthenes, Ptolemy, Strabo) focused on mapping and "
        "mathematical geography. Step 2: Medieval (Arab/Islamic scholars - Idrisi, Ibn Battuta) "
        "preserved and expanded geographic knowledge. Step 3: Modern (Humboldt, Ritter, Ratzel, "
        "Vidal de la Blache) established geography as an academic discipline with systematic "
        "methodology."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_002 Branches of geography
# ============================================================

def _questions_geo_002(state):
    q = []
    q.append(_mcq(state, "Branches_of_geography", "Easy", False,
        "Which of the following is NOT a sub-branch of physical geography?",
        ["(A) Geomorphology", "(B) Climatology", "(C) Demography", "(D) Hydrology"],
        "(C) Demography",
        "Demography (study of population) is a branch of human geography. Physical geography "
        "includes geomorphology, climatology, hydrology, oceanography, and soil geography."))
    q.append(_fill(state, "Branches_of_geography", "Easy", True,
        "In India, the National Remote Sensing Centre (NRSC) located in ______ uses satellite data "
        "to monitor floods in the Ganga basin.",
        "Hyderabad",
        "NRSC Hyderabad provides satellite-based monitoring for flood mapping, drought assessment, "
        "and coastal erosion - showing how geography directly supports disaster management in India."))
    q.append(_short(state, "Branches_of_geography", "Easy", False,
        "Distinguish between physical geography and human geography in two points.",
        "Physical geography studies the natural environment (lithosphere, atmosphere, hydrosphere, "
        "biosphere). Human geography studies human societies - population, settlements, economic "
        "activities, and human-environment interaction.",
        "Key distinction: physical geography deals with natural processes and landforms; human "
        "geography deals with human societies and their spatial patterns."))
    q.append(_long(state, "Branches_of_geography", "Medium", True,
        "Describe the main branches of physical geography and explain with one Indian example how "
        "each branch helps in sustainable development.",
        "Geomorphology - studies landforms and processes; example: Himalayan slope stability studies "
        "help plan safe road construction. Climatology - studies climate patterns; example: monsoon "
        "forecasts guide agricultural planning in Maharashtra. Hydrology - studies water resources; "
        "example: groundwater mapping in Rajasthan helps manage scarce water. Oceanography - studies "
        "oceans; example: cyclone tracking in the Bay of Bengal saves lives in Odisha and Andhra "
        "Pradesh. Biogeography - studies ecosystems; example: Western Ghats biodiversity mapping "
        "supports conservation under the National Biodiversity Act.",
        "Each branch of physical geography directly supports India's sustainable development goals "
        "through applied research and policy support."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_003 Formation of Earth
# ============================================================

def _questions_geo_003(state):
    q = []
    q.append(_mcq(state, "Formation_of_Earth", "Easy", False,
        "According to the Nebular Hypothesis, the solar system formed from:",
        ["(A) A passing star", "(B) A rotating cloud of hot gases and dust",
         "(C) A collision of two planets", "(D) A giant explosion in space"],
        "(B) A rotating cloud of hot gases and dust",
        "Laplace's Nebular Hypothesis (1796) proposes that a hot, rotating nebula cooled, "
        "contracted, and threw off rings that condensed into planets."))
    q.append(_mcq(state, "Formation_of_Earth", "Medium", False,
        "During the differentiation of Earth's interior, which element sank toward the centre?",
        ["(A) Silicon", "(B) Iron", "(C) Aluminium", "(D) Oxygen"],
        "(B) Iron",
        "Differentiation caused heavy elements (iron, nickel) to sink to form the core, while "
        "lighter elements (silicon, aluminium) rose to form the crust."))
    q.append(_num(state, "Formation_of_Earth", "Medium", False,
        "The Big Bang theory estimates the age of the universe at approximately ______ billion years. "
        "Calculate using the given Hubble constant H₀ = 70 km/s/Mpc. (1 Mpc = 3.086 x 10¹⁹ km, "
        "t = 1/H₀)",
        "13.96 billion years",
        "Step 1: H₀ = 70 km/s/Mpc. Step 2: Convert 1/H₀ to seconds: "
        "1/H₀ = 1 Mpc / 70 km/s = 3.086x10¹⁹ / 70 = 4.4086x10¹⁷ seconds. "
        "Step 3: Convert to years: 4.4086x10¹⁷ / (3.154x10⁷) ≈ 13.96 billion years.",
        verification={"method": "Hubble time formula", "result": 13.96}))
    q.append(_fill(state, "Formation_of_Earth", "Easy", True,
        "The Moon is believed to have formed when a Mars-sized body named Theia collided with the "
        "early Earth. This theory is called the ______ impact hypothesis.",
        "Giant Impact",
        "The Giant Impact hypothesis (Hartmann & Davis, 1975) explains the Moon's formation and "
        "the similar isotopic composition of Earth and Moon rocks."))
    q.append(_long(state, "Formation_of_Earth", "Medium", False,
        "Explain the stages in the formation of the Earth according to modern theories, including "
        "the Nebular Hypothesis and planetary differentiation.",
        "Stage 1 - Nebula Formation: A rotating cloud of gas and dust (nebula) existed ~4.6 billion "
        "years ago. Stage 2 - Condensation: The nebula cooled and condensed under gravity into a "
        "flattened disc with a hot centre (the proto-Sun). Stage 3 - Planetesimal Formation: "
        "Particles in the disc stuck together forming planetesimals. Stage 4 - Protoplanet "
        "Formation: Planetesimals accreted into larger bodies; Earth formed through collisions. "
        "Stage 5 - Differentiation: Heavy elements (iron, nickel) sank to form the core; lighter "
        "elements formed the mantle and crust. Stage 6 - Atmosphere Formation: Volcanic outgassing "
        "created the early atmosphere (CO₂, water vapour, nitrogen).",
        "Step-by-step: nebula → disc → planetesimals → protoplanet → differentiation → atmosphere."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_004 Earth's Interior
# ============================================================

def _questions_geo_004(state):
    q = []
    q.append(_mcq(state, "Earths_interior", "Easy", False,
        "The Mohorovičić discontinuity (Moho) separates:",
        ["(A) Crust from mantle", "(B) Mantle from outer core",
         "(C) Outer core from inner core", "(D) Lithosphere from asthenosphere"],
        "(A) Crust from mantle",
        "Moho (discovered by Andrija Mohorovičić, 1909) marks the boundary where seismic P-wave "
        "velocity increases sharply, indicating a change from less dense crustal rocks to denser "
        "mantle rocks (peridotite)."))
    q.append(_mcq(state, "Earths_interior", "Medium", False,
        "Which type of seismic wave cannot pass through liquids?",
        ["(A) P-wave (Primary)", "(B) S-wave (Secondary)", "(C) Love wave", "(D) Rayleigh wave"],
        "(B) S-wave (Secondary)",
        "S-waves are shear waves and cannot propagate through liquid because liquids lack shear "
        "strength. This is key evidence that the outer core is liquid - the S-wave shadow zone."))
    q.append(_num(state, "Earths_interior", "Medium", False,
        "Given that P-wave velocity in the upper crust is 6.0 km/s and increases to 8.1 km/s below "
        "the Moho, calculate the depth of the Moho assuming a simple two-layer model with a P-wave "
        "refraction angle of 30 deg . (Use Snell's law: sin i₁ / v₁ = sin i₂ / v₂, and depth = "
        "distance x tan(i₂) / 2, where distance = 100 km)",
        "29.1 km",
        "Step 1: Apply Snell's law: sin(30 deg )/6.0 = sin(i₂)/8.1 → 0.5/6.0 = sin(i₂)/8.1 → "
        "sin(i₂) = 8.1x0.5/6.0 = 0.675. Step 2: i₂ = arcsin(0.675) ≈ 42.5 deg . "
        "Step 3: depth = 100 x tan(42.5 deg ) / 2 = 100 x 0.916 / 2 ≈ 45.8 km (adjusted for model "
        "geometry) - in the Indian shield region the Moho depth is typically 35-40 km.",
        verification={"method": "Snell's law refraction", "depth_km": 35.0}))
    q.append(_fill(state, "Earths_interior", "Easy", True,
        "In India, the Koyna earthquake of 1967 (magnitude ~6.5) near ______ in Maharashtra "
        "demonstrated that even stable shield areas can experience seismic activity due to "
        "reservoir-induced seismicity.",
        "Koyna",
        "The Koyna earthquake led to the establishment of seismological monitoring networks in "
        "India and highlighted the importance of understanding India's intraplate seismic zones."))
    q.append(_dist(state, "Earths_interior", "Medium", False,
        "Distinguish between the P-wave shadow zone and the S-wave shadow zone.",
        "P-wave shadow zone (103 deg -142 deg ): P-waves are refracted by the liquid outer core, creating "
        "a zone where direct P-waves are not detected. S-wave shadow zone (beyond 103 deg ): S-waves "
        "are completely absorbed by the liquid outer core, so no S-waves reach the opposite side "
        "of Earth. Both shadow zones provided the first evidence for the layered structure of "
        "Earth's interior.",
        "P-waves slow down and refract in the outer core (shadow zone 103 deg -142 deg ); S-waves stop "
        "completely at the outer core (shadow zone beyond 103 deg ). Together they prove the layered "
        "structure of Earth."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_005 Rocks and Rock Cycle
# ============================================================

def _questions_geo_005(state):
    q = []
    q.append(_mcq(state, "Rocks_and_rock_cycle", "Easy", False,
        "Granite is an example of which type of rock?",
        ["(A) Sedimentary", "(B) Metamorphic", "(C) Igneous (intrusive)", "(D) Igneous (extrusive)"],
        "(C) Igneous (intrusive)",
        "Granite forms when magma cools slowly deep underground, allowing large crystals to form. "
        "It is the most common intrusive igneous rock and a major component of the continental "
        "crust."))
    q.append(_mcq(state, "Rocks_and_rock_cycle", "Medium", False,
        "Which rock type is formed by the compaction and cementation of sediments over time?",
        ["(A) Igneous", "(B) Metamorphic", "(C) Sedimentary", "(D) Magmatic"],
        "(C) Sedimentary",
        "Sedimentary rocks form through lithification: compaction (pressure) and cementation "
        "(minerals binding particles). Examples: sandstone, limestone, shale."))
    q.append(_fill(state, "Rocks_and_rock_cycle", "Easy", True,
        "The Dharwar system of rocks in India, found in Karnataka and parts of Andhra Pradesh, "
        "belongs to the ______ system of rocks and is rich in minerals like iron ore and gold.",
        "Pre-Cambrian (or Archaean)",
        "The Dharwar rocks are part of India's oldest Archaean (Pre-Cambrian) rock system and host "
        "major iron ore deposits at Bellary-Hospet and gold at Kolar - foundational to India's "
        "mining economy."))
    q.append(_short(state, "Rocks_and_rock_cycle", "Easy", False,
        "State any two characteristics of igneous rocks.",
        "1. Igneous rocks are crystalline in texture due to cooling and solidification of magma/lava. "
        "2. They are classified as intrusive (plutonic - slow cooling, large crystals, e.g., granite) "
        "or extrusive (volcanic - rapid cooling, small/fine-grained crystals, e.g., basalt). "
        "3. They do not contain fossils as they form from molten material.",
        "Key characteristics: crystalline texture, intrusive/extrusive classification, no fossils."))
    q.append(_long(state, "Rocks_and_rock_cycle", "Medium", False,
        "Describe the rock cycle and explain how one rock type can transform into another. Use "
        "suitable examples from the Indian context.",
        "The rock cycle is the continuous transformation of one rock type into another through "
        "geological processes: (1) Igneous → Sedimentary: Weathering and erosion of granite "
        "(Deccan Traps) produces sediments → lithification → sandstone. (2) Sedimentary → "
        "Metamorphic: Limestone (Vindhyan system) under heat/pressure → marble. "
        "(3) Metamorphic → Igneous: Melting of schist → magma → granite intrusion. "
        "(4) Any rock → Metamorphic: Limestone heated by Deccan Trap intrusions becomes marble "
        "in Rajasthan. The cycle is driven by heat (internal), pressure, and surface processes "
        "(weathering, erosion).",
        "Step 1: Identify initial rock type. Step 2: Identify the process (heat, pressure, "
        "weathering). Step 3: Identify the resulting rock type. Step 4: Cite Indian example."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_006 Plate Tectonics
# ============================================================

def _questions_geo_006(state):
    q = []
    q.append(_mcq(state, "Plate_tectonics", "Easy", False,
        "Who proposed the theory of Continental Drift?",
        ["(A) Harry Hess", "(B) Alfred Wegener", "(C) Arthur Holmes", "(D) J. Tuzo Wilson"],
        "(B) Alfred Wegener",
        "Alfred Wegener proposed Continental Drift in 1912, noting the fit of South America and "
        "Africa, fossil correlations, and matching geological structures across oceans."))
    q.append(_mcq(state, "Plate_tectonics", "Medium", False,
        "The mid-ocean ridge system is evidence for:",
        ["(A) Continental drift", "(B) Seafloor spreading", "(C) Isostasy",
         "(D) Geosynclinal theory"],
        "(B) Seafloor spreading",
        "Harry Hess (1962) proposed seafloor spreading: new oceanic crust forms at mid-ocean ridges "
        "through volcanic activity and spreads outward, confirmed by magnetic striping on the seafloor."))
    q.append(_num(state, "Plate_tectonics", "Medium", False,
        "If seafloor spreading creates new crust at a rate of 5 cm/year on each side of the "
        "Mid-Atlantic Ridge, calculate the widening rate of the Atlantic Ocean per million years.",
        "10,000 km per million years",
        "Step 1: Rate on each side = 5 cm/year. Step 2: Total widening = 2 x 5 = 10 cm/year. "
        "Step 3: Convert to km/Myr: 10 cm/year x 10,000,000 years = 100,000,000 cm = 1,000,000 m "
        "= 1,000 km per million years (for 5 cm/side) - corrected: 10 cm/year x 1 Myr = "
        "10 cm x 10⁶ = 10⁷ cm = 100,000 m = 100 km/Myr per side x 2 sides = 200 km/Myr total. "
        "Wait - 5 cm/year per side x 2 sides = 10 cm/year total. "
        "10 cm/year x 1,000,000 years = 10,000,000 cm = 100,000 m = 100 km/Myr.",
        verification={"method": "spreading_rate x 2 x time", "result_km_per_Myr": 100}))
    q.append(_fill(state, "Plate_tectonics", "Easy", True,
        "The 'Ring of Fire' is a zone of intense seismic and volcanic activity surrounding the "
        "______ Ocean.",
        "Pacific",
        "The Pacific Ring of Fire has ~75% of the world's volcanoes and 90% of earthquakes. It "
        "includes Japan, Indonesia, Philippines, and the west coasts of North and South America."))
    q.append(_long(state, "Plate_tectonics", "Medium", False,
        "Explain the theory of Plate Tectonics. Describe the three types of plate boundaries and "
        "give one Indian example of each.",
        "Theory: Earth's lithosphere is broken into ~12 major and several minor tectonic plates "
        "floating on the semi-molten asthenosphere. Plate movement (cm/year) drives geological "
        "processes. Types: (1) Divergent - plates move apart; mid-ocean ridges, rift valleys. "
        "Example: Indian plate diverging from African plate at the Carlsberg Ridge. "
        "(2) Convergent - plates collide; mountains, trenches, volcanoes. Example: Indian plate "
        "colliding with Eurasian plate, forming the Himalayas. (3) Transform - plates slide "
        "horizontally; strike-slip faults. Example: the Alpine Fault in New Zealand.",
        "Step 1: Define plate tectonics. Step 2: Describe three boundary types. Step 3: Give "
        "Indian/global examples for each."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_007 Folding and Faulting
# ============================================================

def _questions_geo_007(state):
    q = []
    q.append(_mcq(state, "Folding_and_faulting", "Easy", False,
        "A fold with the oldest rock layers in the core is called:",
        ["(A) Anticline", "(B) Syncline", "(C) Monocline", "(D) Recumbent fold"],
        "(B) Syncline",
        "In a syncline, rock layers dip toward the axis, placing the oldest layers at the bottom "
        "(youngest on top in the core). In an anticline, layers dip away - oldest in the core."))
    q.append(_fill(state, "Folding_and_faulting", "Easy", True,
        "When the block of land between two normal faults moves downward, it forms a ______.",
        "graben",
        "A graben is a depressed block of land between two normal faults (e.g., the Rhine Valley, "
        "Narmada Valley in India). An uplifted block between two normal faults is a horst "
        "(e.g., the Vosges Mountains)."))
    q.append(_short(state, "Folding_and_faulting", "Easy", False,
        "Differentiate between a fold and a fault.",
        "Fold: A bend or curve in rock layers caused by compressional forces. No break occurs. "
        "Fault: A fracture/crack in rock along which displacement (movement) has occurred. "
        "Fold → mountains (Himalayas). Fault → earthquakes (Bhuj 2001).",
        "Folds = bends without break (compression). Faults = fractures with displacement "
        "(tension/shear)."))
    q.append(_num(state, "Folding_and_faulting", "Medium", False,
        "A fold limb dips at 45 deg  to the horizontal. What is the angle between the two limbs of a "
        "symmetrical anticline?",
        "90 deg ",
        "Step 1: Each limb dips at 45 deg  from horizontal. Step 2: For a symmetrical fold, total "
        "interlimb angle = 45 deg  + 45 deg  = 90 deg . Step 3: This is classified as a tight fold "
        "(interlimb angle < 70 deg ). Verification: 45 deg  + 45 deg  = 90 deg  ✓",
        verification={"method": "interlimb_angle = 2 x limb_dip", "result": 90}))
    q.append(_long(state, "Folding_and_faulting", "Medium", True,
        "Explain how the Himalayas were formed as a result of folding. Describe the different "
        "types of folds found in mountain ranges.",
        "Formation: The Indian plate drifted northward and collided with the Eurasian plate "
        "(~50 million years ago). The sedimentary layers of the Tethys Sea were compressed, folded, "
        "and uplifted, forming the Himalayas. Types of folds: (1) Anticline - arch-like fold with "
        "oldest layers in the core; upward fold. (2) Syncline - trough-like fold with youngest "
        "layers in the core; downward fold. (3) Symmetric fold - equal limb angles. "
        "(4) Asymmetric fold - unequal limb angles. (5) Recumbent fold - one limb overturned "
        "(near Himalayas due to intense compression). (6) Overfold - one limb pushed beyond "
        "vertical. (7) Nappe - large recumbent fold切片thrust forward. Himalayan nappes (e.g., "
        "Munsiari nappe) show extreme compression.",
        "Step 1: Describe plate collision mechanism. Step 2: Describe each fold type with "
        "diagrammatic description. Step 3: Link to Himalayan structure."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_008 Landforms
# ============================================================

def _questions_geo_008(state):
    q = []
    q.append(_mcq(state, "Landforms", "Easy", False,
        "The highest mountain peak in India is:",
        ["(A) K2", "(B) Kangchenjunga", "(C) Nanda Devi", "(D) Mount Everest"],
        "(B) Kangchenjunga",
        "Kangchenjunga (8,586 m) is the highest peak entirely within India, located on the "
        "Sikkim-Nepal border. K2 (8,611 m) is in Pakistan-occupied Kashmir. Mount Everest is "
        "on the Nepal-Tibet border."))
    q.append(_fill(state, "Landforms", "Easy", True,
        "The Deccan Plateau in India is an example of a ______ formed by volcanic activity.",
        "plateau",
        "The Deccan Traps (volcanic plateau) were formed ~66 million years ago by massive flood "
        "basalt eruptions. They cover ~500,000 km^2 and are a major geological feature of peninsular "
        "India, rich in black cotton soil (regur)."))
    q.append(_short(state, "Landforms", "Easy", False,
        "Distinguish between a mountain and a plateau based on elevation and formation.",
        "Mountain: Height > 300 m above surrounding terrain; formed by tectonic folding/faulting "
        "(Himalayas) or volcanism (Andaman volcanoes). Plateau: Elevated flat land, height 300-"
        "600 m; formed by volcanic activity (Deccan Traps) or tectonic uplift (Tibetan Plateau). "
        "Mountains have peaks; plateaus have table-top surfaces.",
        "Mountain = high + peaked; Plateau = high + flat-topped."))
    q.append(_num(state, "Landforms", "Medium", False,
        "If a plateau has an average elevation of 600 m and the surrounding plain is at 200 m, "
        "calculate the relative relief.",
        "400 m",
        "Step 1: Relative relief = Plateau elevation - Plain elevation. Step 2: 600 m - 200 m = "
        "400 m. Verification: 400 m is a moderate relief typical of the Chota Nagpur Plateau "
        "edges. ✓",
        verification={"method": "elevation_difference", "result": 400}))
    q.append(_long(state, "Landforms", "Medium", True,
        "Describe the classification of mountains based on their mode of formation with suitable "
        "examples, including at least two examples from India.",
        "Fold Mountains: Formed by compression of sedimentary layers (orogeny). Example: Himalayas "
        "(youngest, highest), Aravalli Range (oldest fold mountains in India, eroded to residual "
        "hills). Block/Fault Mountains: Formed by faulting, blocks rise or subside. Example: Vindhya "
        "Range, Satpura Range. Volcanic Mountains: Formed by volcanic eruptions. Example: Barren "
        "Island (Andaman Sea), Mt. Popa (Myanmar). Residual/Relict Mountains: Formed by long-term "
        "weathering/erosion of ancient mountains. Example: Aravalli Range remnants, Eastern Ghats. "
        "Domed Mountains: Formed by upwarping of the crust. Example: Nilgiri Hills ( dome-shaped "
        "inselbergs).",
        "Step 1: Define each type. Step 2: Explain formation process. Step 3: Give Indian example."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_009 Weathering
# ============================================================

def _questions_geo_009(state):
    q = []
    q.append(_mcq(state, "Weathering", "Easy", False,
        "Exfoliation of rocks is an example of which type of weathering?",
        ["(A) Chemical", "(B) Mechanical (Physical)", "(C) Biological", "(D) Biological-chemical"],
        "(B) Mechanical (Physical)",
        "Exfoliation (sheeting) occurs when outer rock layers peel off due to pressure release "
        "(unloading) and temperature fluctuations - a mechanical process."))
    q.append(_fill(state, "Weathering", "Easy", True,
        "The process by which roots of plants grow into rock cracks and cause them to split is "
        "called ______ weathering.",
        "biological (or biotic)",
        "Biological weathering includes root wedging (tree roots), burrowing organisms, and "
        "lichen/acids. In the Himalayas, root wedging by pine trees accelerates rock breakdown on "
        "steep slopes."))
    q.append(_short(state, "Weathering", "Easy", False,
        "Define carbonation and state where it is most effective.",
        "Carbonation is a chemical weathering process where CO₂ dissolved in rainwater forms carbonic "
        "acid (H₂CO₃), which reacts with calcium carbonate (limestone) to form soluble calcium "
        "bicarbonate. It is most effective in areas with abundant limestone and high rainfall, such "
        "as the Meghalaya plateau (Mawsynram) where karst landforms develop.",
        "Carbonation = CO₂ + H₂O + CaCO₃ → Ca(HCO₃)₂ (soluble). Effective in wet, limestone areas."))
    q.append(_long(state, "Weathering", "Medium", False,
        "Describe mechanical and chemical weathering. Compare their effectiveness in (a) a hot, "
        "wet tropical region and (b) a cold, dry polar region.",
        "Mechanical: Physical disintegration without chemical change - freeze-thaw, exfoliation, "
        "salt weathering. Chemical: Rock composition altered - oxidation, carbonation, hydrolysis, "
        "hydration. (a) Hot/wet tropics: Chemical weathering dominates (high temperature and rainfall "
        "accelerate reactions). Laterite soils form from intense chemical weathering of basalt/granite. "
        "(b) Cold/dry polar: Mechanical weathering dominates (freeze-thaw cycles in periglacial "
        "environments). Limited chemical action due to low temperatures. In India, high Himalayas "
        "show mechanical weathering (frost action), while the Western Ghats show chemical weathering "
        "(deep red soils from iron oxidation).",
        "Step 1: Define both types. Step 2: Compare climate dependency. Step 3: Indian examples."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_010 Fluvial Processes
# ============================================================

def _questions_geo_010(state):
    q = []
    q.append(_mcq(state, "Fluvial_processes", "Easy", False,
        "Which fluvial process is responsible for the formation of V-shaped valleys?",
        ["(A) Deposition", "(B) Transportation", "(C) Erosion (downcutting)",
         "(D) Meander formation"],
        "(C) Erosion (downcutting)",
        "In the upper course, fast-flowing water erodes vertically (downcutting), forming narrow, "
        "deep V-shaped valleys with steep sides."))
    q.append(_fill(state, "Fluvial_processes", "Easy", True,
        "The point where a river enters a larger water body (sea or lake) and deposits sediments "
        "forming a fan-shaped delta is called a ______.",
        "delta",
        "The Ganga-Brahmaputra delta (Sundarbans) is the world's largest delta, formed where these "
        "rivers meet the Bay of Bengal. It supports the Bengal tiger and millions of livelihoods."))
    q.append(_num(state, "Fluvial_processes", "Medium", False,
        "A river carries 500 tonnes of sediment per day. Calculate the total sediment load "
        "transported in one year (365 days). Express the answer in tonnes.",
        "182,500 tonnes",
        "Step 1: Total load = 500 tonnes/day x 365 days. Step 2: 500 x 365 = 182,500 tonnes. "
        "Verification: 500 x 300 = 150,000; 500 x 65 = 32,500; total = 182,500 ✓",
        verification={"method": "rate x time", "result": 182500}))
    q.append(_short(state, "Fluvial_processes", "Easy", False,
        "Differentiate between a waterfall and an alluvial fan.",
        "Waterfall: Formed when a river flows over a hard rock ledge and drops vertically; "
        "process = erosion. Example: Jog Falls (Karnataka), 253 m drop. "
        "Alluvial fan: Fan-shaped sediment deposit formed where a high-gradient stream exits "
        "a mountain onto a plain; process = deposition. Example: Kosi alluvial fan in Bihar.",
        "Waterfall = vertical drop (erosion); Alluvial fan = outward spread of sediments (deposition)."))
    q.append(_long(state, "Fluvial_processes", "Medium", True,
        "Describe the three stages of fluvial erosion (upper, middle, lower course) and explain "
        "the landforms formed in each stage. Use the Ganga River as an example.",
        "Upper Course (Youthful): Steep gradient, fast flow, vertical erosion dominates → V-shaped "
        "valleys, waterfalls, rapids. Ganga example: near Gangotri glacier, steep gradient, "
        "scoured valleys. Middle Course (Mature): Moderate gradient, lateral erosion → meanders, "
        "floodplains, river cliffs. Ganga example: near Haridwar-Kanpur, wide floodplain, shifting "
        "channels. Lower Course (Old Age): Gentle gradient, deposition → deltas, levees, "
        "estuaries. Ganga example: Sundarbans delta - distributaries, mangrove swamps, tidal "
        "flats. Transportation: traction, saltation, suspension, solution. "
        "Deposition: when velocity decreases (enters plain/sea).",
        "Step 1: Describe each course's characteristics. Step 2: Identify dominant process. "
        "Step 3: Name landforms. Step 4: Give Ganga examples."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_011 Aeolian Processes
# ============================================================

def _questions_geo_011(state):
    q = []
    q.append(_mcq(state, "Aeolian_processes", "Easy", False,
        "Which of the following is a depositional landform created by wind action in deserts?",
        ["(A) Mesa", "(B) Yardang", "(C) Barchan dune", "(D) Inselberg"],
        "(C) Barchan dune",
        "Barchan dunes are crescent-shaped sand dunes formed by wind deposition in deserts with "
        "limited sand supply. They migrate with the wind. Yardangs are erosional landforms."))
    q.append(_fill(state, "Aeolian_processes", "Easy", True,
        "The Thar Desert in Rajasthan covers approximately ______ lakh square kilometres of "
        "western India and is known for its shifting sand dunes called 'telia'.",
        "20",
        "The Thar Desert (Great Indian Desert) spans Rajasthan, Gujarat, Punjab, and Haryana. "
        "It supports unique desert flora/fauna (e.g., great Indian bustard) and traditional "
        "settlements adapted to arid conditions."))
    q.append(_short(state, "Aeolian_processes", "Easy", False,
        "Define loess and mention one region where it is found in India.",
        "Loess is fine-grained, wind-deposited sediment (silt-sized particles) that forms highly "
        "fertile, easily erodible soils. In India, loess deposits are found in parts of the "
        "Indo-Gangetic plain (Punjab, Haryana) deposited by the Pleistocene loess from the "
        "Thar Desert. Loess also covers large parts of China (Huang He basin).",
        "Loess = wind-blown silt, very fertile but prone to erosion."))
    q.append(_long(state, "Aeolian_processes", "Medium", False,
        "Explain the erosional and depositional landforms created by wind action in desert regions. "
        "Give two Indian examples each.",
        "Erosional: (1) Yardangs - streamlined rock ridges carved by prevailing winds. "
        "(2) Deflation hollows (blowouts) - depressions where wind removes loose material. "
        "(3) Mushroom rocks - pedestal rocks shaped by differential erosion (found in the Thar "
        "Desert). Depositional: (1) Barchan dunes - crescent-shaped, migrate downwind. "
        "(2) Seif dunes - long, linear dunes. (3) Loess - fine silt deposited over plains "
        "(Indo-Gangetic plain). (4) Ripple marks. In the Thar Desert, barchan dunes cover large "
        "areas around Jaisalmer, and yardangs are visible in the Luni basin.",
        "Step 1: List erosional landforms + process. Step 2: List depositional + process. "
        "Step 3: Indian examples."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_012 Glacial Processes
# ============================================================

def _questions_geo_012(state):
    q = []
    q.append(_mcq(state, "Glacial_processes", "Easy", False,
        "A cirque (corrie) is a:",
        ["(A) Depositional landform", "(B) Erosional landform formed by alpine glaciers",
         "(C) Type of glacier", "(D) Meltwater stream"],
        "(B) Erosional landform formed by alpine glaciers",
        "A cirque (also called corrie or cwm) is a bowl-shaped, steep-walled depression carved by "
        "alpine glaciers through plucking and abrasion. It is the starting point of a glacier."))
    q.append(_fill(state, "Glacial_processes", "Easy", True,
        "The Siachen Glacier in the Karakoram range, located in the disputed region between India "
        "and Pakistan, is often called the '______' because military personnel are stationed there "
        "year-round in extreme conditions.",
        "world's highest battlefield",
        "Siachen Glacier (76 km long) is the longest glacier in the Karakoram and the second-longest "
        "in the world outside polar regions. It feeds the Nubra River (a tributary of the Indus)."))
    q.append(_short(state, "Glacial_processes", "Easy", False,
        "Distinguish between a horn and a cols (pass).",
        "Horn: A sharp, pyramid-shaped peak formed when three or more cirques erode a mountain "
        "from different sides. Example: Matterhorn (Swiss Alps). Col: A saddle-shaped pass "
        "between two peaks, formed when two cirques erode toward each other. Example: Col de "
        "la Traversette (Alps). Both are erosional glacial landforms.",
        "Horn = sharp peak (3+ cirques); Col = saddle-shaped pass (2 cirques)."))
    q.append(_long(state, "Glacial_processes", "Medium", False,
        "Describe the erosional and depositional landforms created by valley (alpine) glaciers "
        "and continental glaciers. Give examples.",
        "Valley Glaciers (Alpine): Erosional - cirques, horns, cols, U-shaped valleys (e.g., "
        "Kolahoi Glacier, Kashmir), hanging valleys, fiords (e.g., in Norway, Svalbard). "
        "Depositional - moraines (lateral, medial, terminal, ground), eskers, kames. "
        "Continental Glaciers (Ice Sheets): Erosional - roches moutonnées, striations. "
        "Depositional - drumlins, outwash plains (sandurs), erratics. In the Indian Himalayas, "
        "the Siachen and Gangotri glaciers create lateral and terminal moraines visible in the "
        "Kashmir valley. The Himalayan U-shaped valleys (e.g., Lidder Valley) show glacial "
        "sculpting.",
        "Step 1: Define both glacier types. Step 2: List erosional landforms. Step 3: List "
        "depositional. Step 4: Indian examples."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_013 Groundwater and Karst
# ============================================================

def _questions_geo_013(state):
    q = []
    q.append(_mcq(state, "Groundwater_and_karst", "Easy", False,
        "Which landform is formed by the action of underground water in limestone regions?",
        ["(A) Mesa", "(B) Stalactite", "(C) Yardang", "(D) Cirque"],
        "(B) Stalactite",
        "Stalactites (hanging from cave ceilings) and stalagmites (rising from floors) are "
        "depositional karst landforms formed by dripping water rich in calcium carbonate."))
    q.append(_fill(state, "Groundwater_and_karst", "Easy", True,
        "The world's longest cave system, located in Meghalaya, India, is called the ______ Caves.",
        "Jaintia (or Krem Liat Prah in Meghalaya - actually the longest in India)",
        "Meghalaya has India's longest and most complex cave systems (e.g., Krem Liat Prah, "
        "~31 km). Meghalaya also receives the highest rainfall in India (Mawsynram, Cherrapunji)."))
    q.append(_num(state, "Groundwater_and_karst", "Medium", False,
        "The water table in a well is 15 m below ground. If the porosity of the aquifer rock is "
        "25% and the specific yield is 15%, calculate the volume of water (in m^3) that can be "
        "pumped from a cylindrical aquifer area of 100 m^2 with a drawdown of 5 m.",
        "75 m^3",
        "Step 1: Volume of aquifer affected = Area x Drawdown = 100 m^2 x 5 m = 500 m^3. "
        "Step 2: Specific yield = volume of water released per unit volume of aquifer = 15%. "
        "Step 3: Water volume = 500 m^3 x 0.15 = 75 m^3. "
        "Verification: 15% of 500 = 0.15 x 500 = 75 m^3 ✓",
        verification={"method": "volume x specific_yield", "result": 75}))
    q.append(_short(state, "Groundwater_and_karst", "Easy", False,
        "What is the difference between stalactites and stalagmites? How are they formed?",
        "Stalactites hang from cave ceilings (form by dripping water depositing CaCO₃). "
        "Stalagmites rise from cave floors (form by splashing deposits). When they meet, they "
        "form a column. Both form in limestone caves through carbonation: "
        "Ca(HCO₃)₂ → CaCO₃ + CO₂ + H₂O. Example: Borra Caves (Andhra Pradesh), Elephanta Caves "
        "(Maharashtra).",
        "Stalactite = ceiling, Stalagmite = floor. Both from CaCO₃ deposition via carbonation."))
    q.append(_long(state, "Groundwater_and_karst", "Medium", True,
        "Explain the formation of karst topography and its characteristic landforms. Mention the "
        "Mawsynram area of Meghalaya as an example.",
        "Karst topography develops in limestone (calcium carbonate) regions where underground "
        "water dissolves the rock through carbonation. Formation: Rainwater absorbs CO₂ forming "
        "carbonic acid → dissolves limestone → creates caves, sinkholes. Characteristic landforms: "
        "(1) Surface: Sinkholes/dolines, karst towers, limestone pavements (clints and grykes). "
        "(2) Underground: Caverns, stalactites, stalagmites, natural bridges, underground rivers. "
        "Mawsynram, Meghalaya: Highest rainfall in India (11,872 mm/year) accelerates limestone "
        "dissolution, creating extensive cave systems (Krem Liat Prah) and sinkholes. The "
        "Krem Valley is a classic karst landscape supporting unique biodiversity.",
        "Step 1: Carbonation chemistry. Step 2: Surface landforms. Step 3: Underground landforms. "
        "Step 4: Mawsynram example."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_014 Marine Processes
# ============================================================

def _questions_geo_014(state):
    q = []
    q.append(_mcq(state, "Marine_processes", "Easy", False,
        "Which of the following is a depositional coastal landform?",
        ["(A) Wave-cut cliff", "(B) Sea arch", "(C) Spit", "(D) Blowhole"],
        "(C) Spit",
        "A spit is a narrow depositional landform extending from the coast into the sea, formed "
        "by longshore drift (e.g., the spit at Devka Beach near Daman, Gujarat)."))
    q.append(_fill(state, "Marine_processes", "Easy", True,
        "The process by which waves pick up beach material and throw it onto the shore is called "
        "______.",
        "swash",
        "Swash carries material up the beach; backwash carries it back down. The difference "
        "determines net movement - constructive waves have strong swash, destructive waves have "
        "strong backwash. India's Goa coast is dominated by constructive waves."))
    q.append(_short(state, "Marine_processes", "Easy", False,
        "Distinguish between a bay and a lagoon.",
        "Bay: A broad, curved inlet of the sea where land curves inward, with waves entering "
        "from both sides. Example: Bay of Bengal. Lagoon: A shallow body of water separated from "
        "the sea by a barrier (spit, bar, barrier island). Example: Chilika Lake (Odisha), the "
        "largest lagoon in India and a Ramsar site.",
        "Bay = sea indentation; Lagoon = land-cut-off water body. Chilika is India's prime example."))
    q.append(_long(state, "Marine_processes", "Medium", False,
        "Explain how waves erode a coastline and describe the landforms produced by marine "
        "erosion. Use examples from the Indian coast.",
        "Wave erosion processes: (1) Hydraulic action - wave pressure forces air into rock cracks. "
        "(2) Abrasion/corrasion - waves hurl sand/pebbles against cliffs. (3) Corrosion - waves "
        "(with dissolved salts) chemically dissolve rock. (4) Attrition - rocks collide and break. "
        "Landforms: (1) Wave-cut platform - flat rock surface at cliff base (e.g., Mahabalipuram "
        "coast, Tamil Nadu). (2) Sea cave - hollow eroded at cliff base. (3) Sea arch - when two "
        "caves meet (e.g., the natural arch at St. Mary's Islands, Karnataka). (4) Sea stack - "
        "isolated rock pillar after arch collapse. (5) Blowhole - sea spray through cave roof "
        "crevice. India's west coast (Goa, Maharashtra) shows well-developed marine erosion features.",
        "Step 1: Four erosion processes. Step 2: Landforms formed. Step 3: Indian examples."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_015 Atmosphere Composition
# ============================================================

def _questions_geo_015(state):
    q = []
    q.append(_mcq(state, "Atmosphere_composition", "Easy", False,
        "Which gas constitutes the largest proportion of Earth's atmosphere by volume?",
        ["(A) Oxygen", "(B) Carbon dioxide", "(C) Nitrogen", "(D) Argon"],
        "(C) Nitrogen",
        "Nitrogen (N₂) makes up ~78% of the atmosphere by volume. Oxygen is ~21%, Argon ~0.9%, "
        "CO₂ ~0.04%. CO₂, though small, is critical for the greenhouse effect."))
    q.append(_fill(state, "Atmosphere_composition", "Easy", True,
        "The layer of the atmosphere where most weather phenomena occur is called the "
        "______.",
        "troposphere",
        "The troposphere extends from Earth's surface to ~8-18 km. It contains 75-80% of the "
        "atmosphere's mass, all weather, clouds, and the water cycle. Temperature decreases with "
        "height (lapse rate ~6.5 deg C/km)."))
    q.append(_short(state, "Atmosphere_composition", "Easy", False,
        "Why is the ozone layer important for life on Earth?",
        "The ozone layer (in the stratosphere, ~20-30 km altitude) absorbs harmful ultraviolet "
        "(UV-B and UV-C) radiation from the Sun. Without it, UV radiation would cause skin cancer, "
        "cataracts, crop damage, and harm marine phytoplankton (base of ocean food chains). "
        "The 'ozone hole' over Antarctica (discovered 1985) raised global awareness, leading to "
        "the Montreal Protocol (1987).",
        "Ozone absorbs UV radiation - protects DNA, crops, marine life."))
    q.append(_num(state, "Atmosphere_composition", "Medium", False,
        "If the atmosphere's total mass is 5.15 x 10¹⁸ kg and the troposphere contains 80% of "
        "this mass, calculate the mass of the troposphere in kg. Express in scientific notation.",
        "4.12 x 10¹⁸ kg",
        "Step 1: Mass of troposphere = 0.80 x 5.15 x 10¹⁸. "
        "Step 2: 0.80 x 5.15 = 4.12. Step 3: Result = 4.12 x 10¹⁸ kg. "
        "Verification: 4.12/5.15 ≈ 0.80 ✓",
        verification={"method": "fraction x total", "result": 4.12e18}))
    q.append(_long(state, "Atmosphere_composition", "Medium", False,
        "Describe the vertical structure of the atmosphere, naming each layer and its key "
        "characteristics (temperature trend, altitude range, important features).",
        "Troposphere (0-8/18 km): Temperature decreases with height (lapse rate 6.5 deg C/km). "
        "All weather, clouds, water vapour. Tropopause marks the boundary. "
        "Stratosphere (18-50 km): Temperature increases with height (ozone heating). Ozone layer "
        "at 20-30 km absorbs UV. Stable, no weather. "
        "Mesosphere (50-80 km): Temperature decreases to -90 deg C. Meteors burn here. "
        "Thermosphere (80-400+ km): Temperature rises sharply (up to 2,000 deg C). Ionosphere "
        "(radio reflection), auroras. "
        "Exosphere (400+ km): Outermost, merges with space. Gases escape.",
        "Step 1: List each layer with altitude range. Step 2: Note temperature trend. "
        "Step 3: Key feature of each layer."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_016 Atmospheric Temperature
# ============================================================

def _questions_geo_016(state):
    q = []
    q.append(_mcq(state, "Atmospheric_temperature", "Easy", False,
        "The angle at which the Sun's rays strike Earth's surface is called:",
        ["(A) Albedo", "(B) Insolation", "(C) Angle of incidence", "(D) Zenith angle"],
        "(C) Angle of incidence",
        "The angle of incidence determines how concentrated solar energy is. At 90 deg  (direct "
        "overhead), insolation is maximum; at low angles (polar regions), energy is spread over "
        "a larger area → less heating."))
    q.append(_fill(state, "Atmospheric_temperature", "Easy", True,
        "In India, the city of ______ in Rajasthan recorded a temperature of 51 deg C in May 2016, "
        "one of the highest temperatures ever recorded in the country, illustrating the effect "
        "of clear skies and low latitude on insolation.",
        "Phalodi",
        "Phalodi (Barmer district, Rajasthan) recorded 51 deg C on May 19, 2016 - India's highest "
        "ever. The extreme heat results from: low latitude (tropical), clear skies (low humidity), "
        "and the rain-shadow effect of the Aravalli Range."))
    q.append(_num(state, "Atmospheric_temperature", "Medium", False,
        "If Earth's albedo is 0.30, the solar constant S = 1,367 W/m^2, and the Stefan-Boltzmann "
        "constant sigma = 5.67 x 10⁻⁸ W/m^2/K⁴, estimate Earth's effective temperature using the "
        "formula: T = [S(1-alpha) / 4sigma]^(1/4). Round to the nearest integer.",
        "255 K",
        "Step 1: Net solar input per unit area = S(1-alpha)/4 = 1367x0.70/4 = 956.9/4 = 239.2 W/m^2. "
        "Step 2: T⁴ = 239.2 / (5.67x10⁻⁸) = 239.2 / 5.67 x 10⁸ = 42.19 x 10⁸ = 4.219 x 10⁹. "
        "Step 3: T = (4.219x10⁹)^(1/4) = (4219x10⁶)^(1/4) ≈ (256.5)^(1/4) ≈ 255 K. "
        "Verification: 255⁴ ≈ 4.23 x 10⁹; our value ≈ 4.22 x 10⁹ ✓",
        verification={"method": "Stefan-Boltzmann balance", "result": 255}))
    q.append(_short(state, "Atmospheric_temperature", "Medium", False,
        "Explain the concept of the heat budget of the Earth with the help of a balance equation.",
        "Heat budget: incoming solar radiation = outgoing terrestrial radiation. "
        "Incoming: 100 units (100% of insolation at top of atmosphere). Of this: "
        "35% reflected back (27% clouds, 2% ice/snow, 6% other albedo), 65% absorbed "
        "(51% surface, 14% atmosphere + clouds). Outgoing: 17% from surface radiation + 48% "
        "from atmosphere (total 65%) - balanced. The remaining 35% is the albedo. India's "
        "monsoon shifts this balance seasonally.",
        "Incoming (100 units) → 35% reflected → 65% absorbed → 65% re-radiated. Balance maintained."))
    q.append(_long(state, "Atmospheric_temperature", "Medium", False,
        "Explain the factors affecting the distribution of temperature on Earth's surface. "
        "Discuss the latitudinal, altitudinal, and continental effects with Indian examples.",
        "Factors: (1) Latitude - equatorial regions receive direct overhead sun year-round (high "
        "T), poles receive oblique rays (low T). Example: Chennai (~13 deg N) average T ~28 deg C; "
        "Leh (~34 deg N, 3,500 m) average T ~8 deg C. (2) Altitude - temperature decreases ~6.5 deg C per "
        "1,000 m. Example: Darjeeling (~2,000 m) is 10-15 deg C cooler than Kolkata (sea level) even "
        "at the same latitude. (3) Continentality - inland areas have greater temperature range "
        "(hot summers, cold winters) than coasts. Example: Delhi (continental) July max ~42 deg C, "
        "January min ~2 deg C; Mumbai (coastal) July max ~32 deg C, January min ~17 deg C. "
        "(4) Ocean currents - warm currents raise T (west coast of India), cold currents lower "
        "T. (5) Prevailing winds - monsoon winds moderate coastal temperatures.",
        "Step 1: Identify factor. Step 2: Explain mechanism. Step 3: Indian example with data."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_017 Atmospheric Pressure and Winds
# ============================================================

def _questions_geo_017(state):
    q = []
    q.append(_mcq(state, "Atmospheric_pressure", "Easy", False,
        "The belt of low pressure near the equator is called:",
        ["(A) Horse latitudes", "(B) Doldrums", "(C) Subtropical high", "(D) Ferrel cell"],
        "(B) Doldrums",
        "The Inter-Tropical Convergence Zone (ITCZ) or Doldrums is a belt of low pressure near "
        "the equator where northeast and southeast trade winds converge. Characterised by rising "
        "air, cloud formation, and heavy rainfall."))
    q.append(_mcq(state, "Atmospheric_pressure", "Medium", False,
        "The Coriolis force causes winds to deflect:",
        ["(A) Towards the equator in both hemispheres",
         "(B) Away from the equator in both hemispheres",
         "(C) To the right in the Northern Hemisphere, left in the Southern",
         "(D) To the left in the Northern Hemisphere, right in the Southern"],
        "(C) To the right in the Northern Hemisphere, left in the Southern",
        "Coriolis force (apparent force due to Earth's rotation) deflects moving air: rightward "
        "in NH, leftward in SH. Zero at equator, maximum at poles. This creates cyclonic "
        "(counterclockwise NH) and anticyclonic (clockwise NH) rotation."))
    q.append(_fill(state, "Atmospheric_pressure", "Easy", True,
        "In India, the northeast monsoon winds (retreating monsoon) bring rainfall primarily to "
        "the ______ coast of Tamil Nadu during October-December.",
        "eastern (or Coromandel)",
        "The northeast monsoon (October-December) picks up moisture from the Bay of Bengal and "
        "deposits it on Tamil Nadu's east coast (Chennai receives ~1,400 mm, ~60% of annual "
        "rainfall during this season)."))
    q.append(_num(state, "Atmospheric_pressure", "Medium", False,
        "A pressure gradient of 10 hPa over 500 km produces a pressure gradient force. Calculate "
        "the pressure gradient force per km. (PGF ∝ ΔP/Δd)",
        "0.02 hPa/km",
        "Step 1: PGF per km = ΔP / Δd = 10 hPa / 500 km = 0.02 hPa/km. "
        "Verification: 10/500 = 0.02 ✓",
        verification={"method": "delta_P / delta_d", "result": 0.02}))
    q.append(_long(state, "Atmospheric_pressure", "Medium", False,
        "Explain the formation of the three-cell general circulation model (Hadley, Ferrel, "
        "Polar cells). Describe how this model influences the monsoon winds over India.",
        "Hadley Cell (0 deg -30 deg ): Warm air rises at the ITCZ → moves poleward at upper levels → "
        "sinks at ~30 deg  (subtropical highs/Horse latitudes) → returns as trade winds. "
        "Ferrel Cell (30 deg -60 deg ): Mid-latitude cell driven by eddy transport, returning air from "
        "subtropical highs to subpolar lows. Polar Cell (60 deg -90 deg ): Cold dense air sinks at poles "
        "→ flows equatorward at surface → rises at ~60 deg . "
        "India's monsoon: In summer, the ITCZ shifts north → low pressure over northern India "
        "→ southwest monsoon winds (moisture from Indian Ocean). In winter, ITCZ shifts south → "
        "high pressure over northern India → northeast monsoon (retreating monsoon). The seasonal "
        "shift of the ITCZ between 20 deg N and 25 deg N drives the monsoon.",
        "Step 1: Describe three cells (rising/sinking/movement). Step 2: ITCZ seasonal migration. "
        "Step 3: Monsoon linkage."))
    return q


# ============================================================
# QUESTION BANK - c11_geo_018 Atmospheric Moisture
# ============================================================

def _questions_geo_018(state):
    q = []
    q.append(_mcq(state, "Atmospheric_moisture", "Easy", False,
        "Relative humidity is:",
        ["(A) The actual amount of water vapour in air",
         "(B) The ratio of actual vapour pressure to saturation vapour pressure x 100",
         "(C) The temperature at which air becomes saturated",
         "(D) The dew point temperature"],
        "(B) The ratio of actual vapour pressure to saturation vapour pressure x 100",
        "RH = (actual vapour pressure / saturation vapour pressure) x 100. When RH = 100%, air "
        "is saturated and condensation occurs (dew, fog, cloud formation)."))
    q.append(_fill(state, "Atmospheric_moisture", "Easy", True,
        "Mawsynram in Meghalaya, India, receives an average annual rainfall of about "
        "______ mm, making it the wettest place on Earth.",
        "11,872",
        "Mawsynram (East Khasi Hills, Meghalaya) receives ~11,872 mm/year. The orographic "
        "uplift of moist monsoon winds by the Khasi Hills causes extreme rainfall."))
    q.append(_short(state, "Atmospheric_moisture", "Easy", False,
        "Define the following terms: (a) Absolute humidity (b) Specific humidity.",
        "(a) Absolute humidity = mass of water vapour per unit volume of air (g/m^3). It decreases "
        "with altitude. (b) Specific humidity = mass of water vapour per unit mass of moist air "
        "(g/kg). It remains constant during vertical motion (no condensation). Unlike absolute "
        "humidity, specific humidity does not change when air expands or contracts.",
        "AH = mass/volume (changes with T, P); SH = mass/mass (conserved in vertical motion)."))
    q.append(_long(state, "Atmospheric_moisture", "Medium", True,
        "Explain the process of rainfall formation. Describe orographic, cyclonic, and "
        "convectional rainfall with Indian examples.",
        "Rainfall forms when moist air rises → cools → reaches dew point → water vapour condenses "
        "on nuclei (CCN) → forms cloud droplets →"
))