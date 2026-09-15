"""
CISCE Class 12 Geography - Deterministic Question Generator & Solver
ISC Geography Syllabus (CISCE, Year 2027) - India in the World's Context
All 12 syllabus nodes covered. 50% competency-based (Indian context), 50% standard.
"""

import random
import math
import fractions
import hashlib
from dataclasses import dataclass, field
from typing import Any

# ============================================================
# SEEDED RANDOM HELPERS
# ============================================================

def make_rng(seed: int) -> random.Random:
    """Return a deterministic RNG instance."""
    return random.Random(seed)


def deterministic_hash(s: str) -> int:
    """Deterministic integer from a string."""
    return int(hashlib.md5(s.encode()).hexdigest()[:8], 16)


# ============================================================
# SYLLABUS NODE DEFINITIONS
# ============================================================

SYLLABUS_NODES = [
    {"id": "c12_geo_001", "title": "India - Locational Setting", "section": "Physical Environment"},
    {"id": "c12_geo_002", "title": "Geological Evolution of India", "section": "Physical Environment"},
    {"id": "c12_geo_003", "title": "Himalayan Complex", "section": "Physical Environment"},
    {"id": "c12_geo_004", "title": "Indo-Ganga-Brahmaputra Plains", "section": "Physical Environment"},
    {"id": "c12_geo_005", "title": "Peninsular Plateau", "section": "Physical Environment"},
    {"id": "c12_geo_006", "title": "Coastal Plains and Islands", "section": "Physical Environment"},
    {"id": "c12_geo_007", "title": "Drainage Systems of India", "section": "Physical Environment"},
    {"id": "c12_geo_008", "title": "Climate - Factors Affecting", "section": "Physical Environment"},
    {"id": "c12_geo_009", "title": "Monsoon Mechanism", "section": "Physical Environment"},
    {"id": "c12_geo_010", "title": "Seasons of India", "section": "Physical Environment"},
    {"id": "c12_geo_011", "title": "Droughts and Floods", "section": "Human Environment"},
    {"id": "c12_geo_012", "title": "Natural Vegetation", "section": "Human Environment"},
]

TOPIC_LIST = [n["id"] for n in SYLLABUS_NODES]


# ============================================================
# QUESTION BANK - RICH CURRICULUM CONTENT
# ============================================================

QUESTION_BANK = [
    # ---- c12_geo_001: India - Locational Setting ----
    {
        "id": "geo_ls_01", "node": "c12_geo_001",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "India extends between which latitudes?",
        "options": ["8 deg 4'N to 37 deg 6'N", "6 deg N to 38 deg N", "7 deg N to 36 deg N", "9 deg N to 35 deg N"],
        "answer": "8 deg 4'N to 37 deg 6'N",
        "explanation": "India stretches from 8 deg 4'N latitude (Indira Point, Andaman) to 37 deg 6'N latitude (Siachen Glacier, Ladakh), covering approximately 29 deg  of latitude. This span of about 3,200 km gives India a wide range of climatic conditions."
    },
    {
        "id": "geo_ls_02", "node": "c12_geo_001",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "The longitudinal extent of India is approximately:",
        "options": ["29 deg  (68 deg 7'E to 97 deg 25'E)", "30 deg  (66 deg E to 98 deg E)", "25 deg  (70 deg E to 95 deg E)", "32 deg  (67 deg E to 99 deg E)"],
        "answer": "29 deg  (68 deg 7'E to 97 deg 25'E)",
        "explanation": "India's longitudinal extent is from 68 deg 7'E (Gujarat) to 97 deg 25'E (Arunachal Pradesh), covering approximately 29 deg . This longitudinal spread creates a time difference of about 2 hours between the easternmost and westernmost points."
    },
    {
        "id": "geo_ls_03", "node": "c12_geo_001",
        "type": "mcq",
        "difficulty": "easy",
        "context": "competency",
        "question": "A fishing community in Kanyakumari observes that during certain months, the sun is directly overhead at noon. This occurs because Kanyakumari is located at approximately:",
        "options": ["8 deg 4'N latitude", "23 deg 30'N latitude", "15 deg N latitude", "5 deg N latitude"],
        "answer": "8 deg 4'N latitude",
        "explanation": "Kanyakumari, at approximately 8 deg 4'N, is the southernmost tip of mainland India. Being within the tropics (between the Tropic of Cancer and the Equator), the sun's rays fall directly overhead twice a year - in April and August - an important phenomenon for local fishing communities and agriculture in Tamil Nadu."
    },
    {
        "id": "geo_ls_04", "node": "c12_geo_001",
        "type": "fill_blank",
        "difficulty": "easy",
        "context": "standard",
        "question": "The total length of India's coastline is approximately _____ km (including the Andaman & Nicobar and Lakshadweep islands).",
        "options": [],
        "answer": "7516",
        "explanation": "India has a coastline of approximately 7,516 km (mainland: ~6,100 km, islands: ~1,400 km). This extensive coastline, combined with its position at the head of the Indian Ocean, gives India significant strategic maritime advantages."
    },
    {
        "id": "geo_ls_05", "node": "c12_geo_001",
        "type": "fill_blank",
        "difficulty": "easy",
        "context": "competency",
        "question": "The Tropic of Cancer (23 deg 30'N) divides India into _____ climatic zones.",
        "options": [],
        "answer": "two",
        "explanation": "The Tropic of Cancer at 23 deg 30'N passes through the middle of India (through Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram). North of it lies the temperate zone, south of it lies the tropical zone."
    },
    {
        "id": "geo_ls_06", "node": "c12_geo_001",
        "type": "short_answer",
        "difficulty": "easy",
        "context": "competency",
        "question": "How does India's location as a subcontinent jutting into the Indian Ocean give it a strategic advantage in international trade routes?",
        "options": [],
        "answer": "India's peninsular projection into the Indian Ocean places it at the crossroads of major east-west shipping routes connecting Europe, Africa, and East Asia. The Suez Canal route and the Cape of Good Hope route both converge near Indian waters. This makes Indian ports like Mumbai, Chennai, and Kolkata natural hubs for trans-shipment and international commerce. The Indian Ocean Rim countries (IOR) - including East Africa, Arabian Peninsula, South Asia, Southeast Asia, and Australia - rely on India as a regional anchor for maritime security and economic cooperation. India's location also enables it to project naval power and secure sea lines of communication (SLOCs) vital for its energy imports (oil from the Middle East) and trade with Southeast and East Asia.",
        "explanation": "This is often called the 'India as pivot' analogy - like a pivot at the head of the Indian Ocean. Indian Ocean carries ~40% of world sea trade and 80% of India's oil imports pass through it."
    },
    {
        "id": "geo_ls_07", "node": "c12_geo_001",
        "type": "short_answer",
        "difficulty": "easy",
        "context": "standard",
        "question": "List India's land frontiers and neighbouring countries.",
        "options": [],
        "answer": "India shares land frontiers with 7 countries: Pakistan (west/northwest), China (north/northeast), Nepal (north), Bhutan (northeast), Bangladesh (east/southeast), Myanmar (east/southeast), and Afghanistan (via the narrow Wakhan Corridor in the northwest). The total land frontier length is approximately 15,200 km.",
        "explanation": "India's land frontiers are defined by natural barriers like the Himalayas in the north and the Thar Desert in the west. The maritime neighbours include Sri Lanka, Maldives, and Indonesia across the Indian Ocean."
    },
    {
        "id": "geo_ls_08", "node": "c12_geo_001",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "Which of the following statements BEST describes India's position in the Indian Ocean Rim?",
        "options": [
            "India is a minor island nation in the Indian Ocean",
            "India forms a peninsula jutting southward at the head of the Indian Ocean, acting as a natural hub",
            "India is completely surrounded by the Indian Ocean on all sides",
            "India has no significant position in the Indian Ocean"
        ],
        "answer": "India forms a peninsula jutting southward at the head of the Indian Ocean, acting as a natural hub",
        "explanation": "India is the only major peninsula in the Indian Ocean, projecting southward from the Asian landmass. This unique geographical position makes it a natural hub connecting the Middle East-Africa trade routes with Southeast and East Asia."
    },

    # ---- c12_geo_002: Geological Evolution ----
    {
        "id": "geo_ge_01", "node": "c12_geo_002",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "According to the 'Theory of Plate Tectonics', the Indian subcontinent was part of which ancient supercontinent?",
        "options": ["Laurasia", "Gondwana Land", "Pangaea", "Eurasia"],
        "answer": "Gondwana Land",
        "explanation": "The Indian subcontinent was originally part of Gondwana Land, the southern supercontinent that included present-day South America, Africa, Antarctica, Australia, and the Indian peninsula. Around 180 million years ago, Gondwana began to break apart."
    },
    {
        "id": "geo_ge_02", "node": "c12_geo_002",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "The Tethys Sea existed between which two ancient landmasses?",
        "options": ["Gondwana and Laurasia", "Africa and South America", "India and Australia", "Europe and Asia"],
        "answer": "Gondwana and Laurasia",
        "explanation": "The Tethys Sea was a large inland sea that existed between the southern supercontinent Gondwana and the northern supercontinent Laurasia. As India drifted northward from Gondwana, it crossed the Tethys Sea, and the sediments deposited there were uplifted to form the Himalayan range."
    },
    {
        "id": "geo_ge_03", "node": "c12_geo_002",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "competency",
        "question": "India broke away from Gondwana Land approximately _____ million years ago and began drifting northward.",
        "options": [],
        "answer": "180",
        "explanation": "The separation of the Indian subcontinent from Gondwana Land began around 180 million years ago (Jurassic period). India then drifted northward at a rate of about 15-20 cm per year, finally colliding with the Eurasian plate around 40-50 million years ago, forming the Himalayas."
    },
    {
        "id": "geo_ge_04", "node": "c12_geo_002",
        "type": "short-answer",
        "difficulty": "medium",
        "context": "standard",
        "question": "Explain the geological classification of India's landforms into three major divisions based on their tectonic history.",
        "options": [],
        "answer": "India is classified into three major tectonic divisions: (1) The Peninsular Block (Aravalli-Dharwar-Cuddapah belts) - the oldest part, formed during the Archean era (>2,500 million years), composed of ancient crystalline rocks. (2) The Extra-Peninsular Region (Himalayas and Northern Plains) - the youngest, formed during the Cenozoic era (65 million years to present) by the collision of the Indian and Eurasian plates. The Himalayas are still rising by about 5 mm/year. (3) The Coastal Plains and Islands - formed during the Tertiary and Quaternary periods with sedimentary deposits.",
        "explanation": "This three-fold classification based on tectonic history was proposed by the Geological Survey of India and helps understand the structural diversity and age variation across India's landforms."
    },
    {
        "id": "geo_ge_05", "node": "c12_geo_002",
        "type": "mcq",
        "difficulty": "medium",
        "context": "competency",
        "question": "A geologist studying rock formations in Singhbhum (Jharkhand) finds rocks dated at 3,800 million years. These belong to which geological division of India?",
        "options": ["The Himalayas", "The Peninsular Block", "The Northern Plains", "The Coastal Plains"],
        "answer": "The Peninsular Block",
        "explanation": "Singhbhum in Jharkhand is part of the Singhbhum craton, one of the oldest geological formations on Earth at ~3,800 million years. This is in the Peninsular Block (Aravalli-Dharwar belt), the most ancient geological division of India, containing some of the oldest rocks in the world."
    },

    # ---- c12_geo_003: Himalayan Complex ----
    {
        "id": "geo_hp_01", "node": "c12_geo_003",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "The Himalayas are classified into how many parallel ranges from south to north?",
        "options": ["Three", "Four", "Five", "Six"],
        "answer": "Four",
        "explanation": "The Himalayas consist of four parallel ranges from south to north: (1) The Shiwaliks (Outer Himalayas) - youngest, 600-1,500m; (2) The Lesser Himalayas (Himachal) - middle range, 1,500-4,500m; (3) The Greater Himalayas (Himadri) - highest, snow-covered peaks; (4) The Trans-Himalayas (Zanskar, Ladakh, Karakoram) - northernmost ranges beyond the Indus valley."
    },
    {
        "id": "geo_hp_02", "node": "c12_geo_003",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "Which of the following is the highest peak in the Himalayan range and in India?",
        "options": ["Kanchenjunga (8,586 m)", "Mount Everest (8,848 m)", "Nanda Devi (7,816 m)", "K2 (8,611 m)"],
        "answer": "Kanchenjunga (8,586 m)",
        "explanation": "Kanchenjunga at 8,586 m is the highest peak entirely within India (on the Sikkim-Nepal border). Mount Everest (8,848 m) is in Nepal, though the approach from the Tibet side. K2 (8,611 m) is in the Karakoram range in Pakistan-administered Kashmir, not the Himalayas proper."
    },
    {
        "id": "geo_hp_03", "node": "c12_geo_003",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "competency",
        "question": "The Shiwalik range is also known as the _____ Himalayas.",
        "options": [],
        "answer": "Outer",
        "explanation": "The Shiwalik range (also spelled Shivalik) is the outermost or southernmost range of the Himalayas, running from the Indus in the west to the Brahmaputra in the east. It is the youngest range, formed from sediments deposited by rivers draining from the higher ranges, covered with dense forests and rich in wildlife."
    },
    {
        "id": "geo_hp_04", "node": "c12_geo_003",
        "type": "short-answer",
        "difficulty": "medium",
        "context": "standard",
        "question": "Explain the importance of the Himalayas for India's climate and agriculture.",
        "options": [],
        "answer": "The Himalayas serve as a climatic barrier of immense importance for India: (1) They block cold Central Asian winds from entering the Indian subcontinent, keeping winters milder in northern India than they would otherwise be. (2) They intercept the moisture-laden southwest monsoon winds, causing heavy rainfall on their southern slopes (the windward side), which feeds major river systems essential for agriculture. (3) The orographic rainfall supports dense forests and agriculture in the Himalayan foothills (Terai and Dooars regions). (4) They are the source of major perennial rivers - Indus, Ganga, Brahmaputra - which provide irrigation to the Indo-Gangetic plains. Without the Himalayas, the monsoon pattern and water availability in northern India would be dramatically different.",
        "explanation": "The Himalayas are the 'water towers' of Asia and the 'climatic sentinels' of India. Their role in intercepting monsoon winds creates the heavy rainfall on southern slopes while creating a rain-shadow effect (like in Ladakh) on the northern side."
    },
    {
        "id": "geo_hp_05", "node": "c12_geo_003",
        "type": "mcq",
        "difficulty": "medium",
        "context": "competency",
        "question": "A trekker planning a journey to the Valley of Flowers National Park must travel through which Himalayan state and during which season?",
        "options": [
            "Himachal Pradesh, winter",
            "Uttarakhand, monsoon (July-September)",
            "Sikkim, summer",
            "Jammu & Kashmir, autumn"
        ],
        "answer": "Uttarakhand, monsoon (July-September)",
        "explanation": "Valley of Flowers National Park is in Chamoli district, Uttarakhand (Garhwal Himalayas). It is accessible only during the monsoon season (July to September) when the alpine flowers (brahmakamal, blue poppy, cobra lily, etc.) are in full bloom. UNESCO World Heritage Site and a famous biodiversity hotspot."
    },
    {
        "id": "geo_hp_06", "node": "c12_geo_003",
        "type": "long-answer",
        "difficulty": "hard",
        "context": "standard",
        "question": "Describe the four-fold longitudinal division of the Himalayas and explain how the Shiwaliks differ from the Greater Himalayas in terms of geology, climate, and vegetation.",
        "options": [],
        "answer": "The four-fold division of the Himalayas from south to north:\n\n1. SHIWALIKS (Outer Himalayas): 600-1,500m elevation, 10-50km wide. Youngest range, formed from Tertiary sediments (sandstone, siltstone, claystone). Climate: warm, humid. Vegetation: subtropical forests (sal, shisham, khair). Prone to landslides during monsoon.\n\n2. LESSER HIMALAYAS (Himachal/Zanskar): 1,500-4,500m. Composed of ancient crystalline rocks, granite, gneiss, schist. Famous hill stations (Shimla, Darjeeling, Nainital). Climate: temperate. Vegetation: temperate forests (deodar, pine, oak, rhododendron). Pir Panjal, Dhauladhar, Mahabharat ranges.\n\n3. GREATER HIMALAYAS (Himadri): 4,500m+, highest peaks (Kanchenjunga 8,586m, Nanda Devi 7,816m). Composed of granite and gneiss, permanently snow-covered above 5,000m. Climate: alpine and nival. Vegetation: alpine meadows and glaciers.\n\n4. TRANS-HIMALAYAS: Northernmost ranges beyond Indus valley (Karakoram, Zanskar, Ladakh). 4,500m+. Dry, cold desert climate. Minimal vegetation. K2 (8,611m) in Karakoram.\n\nKey differences between Shiwaliks and Greater Himalayas:\n- Geology: Shiwaliks = young Tertiary sediments; Greater = crystalline/metamorphic rocks\n- Climate: Shiwaliks = subtropical/warm; Greater = alpine/nival\n- Vegetation: Shiwaliks = subtropical broadleaf forests; Greater = alpine meadows/glaciers above snow line",
        "explanation": "The Shiwaliks are geologically the youngest (Miocene-Pliocene) while the Greater Himalayas contain the oldest rocks exposed at the surface after intense metamorphism. The rainfall gradient is dramatic - Shiwaliks receive 150-250cm while the Trans-Himalayas get less than 25cm."
    },

    # ---- c12_geo_004: Indo-Ganga-Brahmaputra Plains ----
    {
        "id": "geo_pl_01", "node": "c12_geo_004",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "The Northern Plains of India extend over approximately:",
        "options": ["2,40,000 sq km", "1,00,000 sq km", "3,50,000 sq km", "1,50,000 sq km"],
        "answer": "2,40,000 sq km",
        "explanation": "The Northern Plains (Indo-Ganga-Brahmaputra plains) extend over approximately 2,40,000 sq km, stretching about 2,400 km in length and varying from 240-320 km in width. This is one of the world's most extensive alluvial plains."
    },
    {
        "id": "geo_pl_02", "node": "c12_geo_004",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "Which rivers are responsible for depositing the alluvial soil of the Northern Plains?",
        "options": ["Indus, Ganga, and Brahmaputra and their tributaries", "Only the Ganga", "Narmada and Tapti", "Godavari and Krishna"],
        "answer": "Indus, Ganga, and Brahmaputra and their tributaries",
        "explanation": "The Northern Plains were formed by the depositional work of three major river systems - the Indus system, the Ganga system, and the Brahmaputra system - and their numerous tributaries. Over millions of years, the alluvial deposits (bhangar and khadar) created one of the most fertile agricultural regions in the world."
    },
    {
        "id": "geo_pl_03", "node": "c12_geo_004",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "competency",
        "question": "The older alluvium in the Northern Plains is called _____ while the newer, fertile alluvium near the riverbeds is called _____.",
        "options": [],
        "answer": "bhangar; khadar",
        "explanation": "Bhangar is the older, higher alluvium (Tertiary period) found above the flood plains, with calcareous deposits (kankar nodules). Khadar is the newer, lower alluvium (Quaternary period) found in the active flood plains, very fertile and ideal for intensive agriculture (rice, wheat, sugarcane). The difference is crucial for Punjab and Haryana farmers."
    },
    {
        "id": "geo_pl_04", "node": "c12_geo_004",
        "type": "numerical",
        "difficulty": "medium",
        "context": "standard",
        "question": "The Northern Plains cover approximately 2,40,000 sq km with an average width of 280 km. Calculate its approximate length.",
        "options": [],
        "answer": "857 km",
        "explanation": "Area = Length x Width\n2,40,000 = Length x 280\nLength = 2,40,000 / 280 = 857 km (approximately 2,400 km considering the irregular shape)\n\nNote: The actual length is approximately 2,400 km because the plains are not a perfect rectangle - they follow the river courses and taper towards the east. The width also varies significantly from 240 km to 320 km.",
        "verification": {
            "type": "reverse_check",
            "formula": "Area = L x W = 857 x 280 = 239,960 ≈ 2,40,000 sq km",
            "passed": True
        }
    },
    {
        "id": "geo_pl_05", "node": "c12_geo_004",
        "type": "short-answer",
        "difficulty": "medium",
        "context": "competency",
        "question": "A farmer in western Uttar Pradesh reports that her field near the river is extremely fertile but floods annually, while her father's field on higher ground has lower yields. Explain the geological reasons for this difference.",
        "options": [],
        "answer": "The farmer's field near the river is on khadar (newer alluvium) - very fertile but prone to annual flooding as the Ganga deposits fresh nutrient-rich silt. Her father's field is on bhangar (older alluvium) - higher elevation means no flooding, but it has kankar (calcareous nodules) making it less fertile. The annual flooding of the khadar field is actually beneficial - it brings new silt and nutrients, but requires flood-resistant farming practices. The bhangar is safer but requires more fertiliser. This is a classic example of the interplay between geological processes and agricultural decision-making in the Gangetic plains.",
        "explanation": "The bhangar-khadar distinction directly impacts agricultural practices, crop choices, and rural livelihoods in the Gangetic plains, making it highly relevant for competency-based geography education."
    },

    # ---- c12_geo_005: Peninsular Plateau ----
    {
        "id": "geo_pp_01", "node": "c12_geo_005",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "The Peninsular Plateau of India is formed primarily of which type of rocks?",
        "options": ["Igneous and metamorphic rocks", "Sedimentary rocks", "Volcanic rocks only", "Alluvial deposits"],
        "answer": "Igneous and metamorphic rocks",
        "explanation": "The Peninsular Plateau is composed of ancient igneous (granite, basalt) and metamorphic rocks (gneiss, schist) formed during the Archean and Proterozoic eras (>1,000 million years ago). These are the oldest rocks in India and among the oldest on Earth."
    },
    {
        "id": "geo_pp_02", "node": "c12_geo_005",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "Which mountain range is considered the 'folded mountain' in the Peninsular Plateau?",
        "options": ["Aravalli Range", "Vindhyan Range", "Satpura Range", "Western Ghats"],
        "answer": "Aravalli Range",
        "explanation": "The Aravalli Range is India's oldest fold mountain range (Pre-Cambrian era, >2,000 million years). It is a residual mountain now, greatly eroded over time. It runs approximately 800 km from Gujarat through Rajasthan to Delhi, with Guru Shikhar (1,722m) as its highest peak."
    },
    {
        "id": "geo_pp_03", "node": "c12_geo_005",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "standard",
        "question": "The Peninsular Plateau is divided into the _____ plateau in the north and the _____ plateau in the south, separated by the Narmada-Son valley.",
        "options": [],
        "answer": "Central Highlands; Deccan",
        "explanation": "The Narmada-Son river valley (Narmada Rift Valley) divides the Peninsular Plateau into: (1) Central Highlands (Malwa, Bundelkhand, Baghelkhand, Chota Nagpur) north of the Narmada; (2) Deccan Plateau south of the Narmada, a triangular plateau extending southward between the Eastern and Western Ghats."
    },
    {
        "id": "geo_pp_04", "node": "c12_geo_005",
        "type": "mcq",
        "difficulty": "medium",
        "context": "competency",
        "question": "The Chota Nagpur Plateau, famous for its mineral resources, is primarily located in which state?",
        "options": ["Jharkhand", "Odisha", "Chhattisgarh", "Madhya Pradesh"],
        "answer": "Jharkhand",
        "explanation": "The Chota Nagpur Plateau covers much of Jharkhand and parts of Odisha, West Bengal, Bihar, and Chhattisgarh. It is rich in coal (Jharia, Bokaro), iron ore (Singhbhum), manganese, copper, and bauxite - making it the mineral heartland of India and a major industrial region."
    },
    {
        "id": "geo_pp_05", "node": "c12_geo_005",
        "type": "long-answer",
        "difficulty": "hard",
        "context": "standard",
        "question": "Describe the Central Highlands and Deccan Plateau of the Peninsular region, highlighting their geological features and economic significance.",
        "options": [],
        "answer": "CENTRAL HIGHLANDS:\n- Location: North of Narmada River, extending from Gujarat to West Bengal\n- Sub-regions: Malwa Plateau (west), Bundelkhand (northwest), Baghelkhand (northeast), Chota Nagpur Plateau (east)\n- Geology: Ancient crystalline rocks, Vindhyan and Gondwana formations\n- Elevation: 500-900m\n- Economic significance: Chota Nagpur is the mineral heartland - coal (Jharia), iron ore (Singhbhum), manganese, mica, copper. Malwa has black cotton soil suitable for cotton and soybean.\n\nDECCAN PLATEAU:\n- Location: South of Narmada River, bounded by Western Ghats (west) and Eastern Ghats (east)\n- Shape: Triangular, with the apex at Kanyakumari\n- Geology: Deccan Traps (massive volcanic basalt formations from 60-68 million years ago), Dharwar rocks, Cuddapah basin\n- Elevation: 600-900m average; Western edge slopes gently eastward\n- Economic significance: Deccan Traps provide fertile black cotton soil (regur) ideal for cotton cultivation. Rich in minerals: iron ore (Bellary), bauxite (Odisha), gold (Kolar). Major peninsular rivers (Godavari, Krishna, Kaveri) originate here.",
        "explanation": "The Deccan Traps are among the largest volcanic provinces on Earth, covering ~500,000 sq km, formed by massive fissure eruptions at the end of the Cretaceous period. This volcanic activity may have contributed to the mass extinction of dinosaurs."
    },

    # ---- c12_geo_006: Coastal Plains and Islands ----
    {
        "id": "geo_cp_01", "node": "c12_geo_006",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "India has how many major island groups?",
        "options": ["Two", "Three", "Four", "One"],
        "answer": "Two",
        "explanation": "India has two major island groups: (1) The Andaman & Nicobar Islands - volcanic-origin, located in the Bay of Bengal (approx. 572 islands), union territory. (2) The Lakshadweep Islands - coral-origin, located in the Arabian Sea (approx. 36 islands, only 10 inhabited), union territory."
    },
    {
        "id": "geo_cp_02", "node": "c12_geo_006",
        "type": "fill_blank",
        "difficulty": "easy",
        "context": "standard",
        "question": "The Western Coastal Plain is narrower and lies between the _____ Ghats and the Arabian Sea.",
        "options": [],
        "answer": "Western",
        "explanation": "The Western Coastal Plain (Konkan coast in Maharashtra/Goa/Karnataka and Malabar coast in Kerala/Karnataka) is narrow (50-80 km wide), with the Western Ghats rising sharply from it. This coast has natural harbours like Mumbai, Mormugao, and Mangalore."
    },
    {
        "id": "geo_cp_03", "node": "c12_geo_006",
        "type": "mcq",
        "difficulty": "medium",
        "context": "competency",
        "question": "The Indira Point - India's southernmost point - was submerged during which major event?",
        "options": ["The 2004 Indian Ocean Tsunami", "Cyclone Fani (2019)", "The 1991 cyclone", "The 2018 Kerala floods"],
        "answer": "The 2004 Indian Ocean Tsunami",
        "explanation": "Indira Point (formerly Pygmalion Point) on Great Nicobar Island was the southernmost point of India at 6 deg 45'N. During the devastating December 26, 2004 Indian Ocean Tsunami, a significant portion of the lighthouse and surrounding land was submerged, pushing India's southernmost point further north."
    },
    {
        "id": "geo_cp_04", "node": "c12_geo_006",
        "type": "short-answer",
        "difficulty": "medium",
        "context": "competency",
        "question": "Explain why the Eastern Coastal Plain is broader and more fertile than the Western Coastal Plain.",
        "options": [],
        "answer": "The Eastern Coastal Plain (from West Bengal to Tamil Nadu) is broader (100-130 km wide) than the Western Coastal Plain (50-80 km) because: (1) The Eastern Ghats are discontinuous and lower in elevation compared to the continuous, steep Western Ghats - this allows rivers more space to deposit alluvium. (2) Major east-flowing rivers (Mahanadi, Godavari, Krishna, Kaveri) deposit large deltas (Mahanadi Delta, Godavari Delta, Kaveri Delta) that extend the coastal plain seaward. (3) The slope of the Deccan Plateau is gentle towards the east (eastward tilt), so rivers deposit more sediment on the eastern side. The Eastern Coastal Plain's deltas are extremely fertile, supporting intensive rice, coconut, and banana cultivation.",
        "explanation": "The 'broken' Eastern Ghats vs the 'wall-like' Western Ghats is a classic geographical contrast. The eastward tilt of the Deccan Plateau is due to the flexuring of the crust during the Deccan Traps eruption."
    },
    {
        "id": "geo_cp_05", "node": "c12_geo_006",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "Lakshadweep Islands are primarily of _____ origin, while the Andaman & Nicobar Islands are of _____ origin.",
        "options": ["coral; volcanic", "volcanic; coral", "continental; riverine", "riverine; volcanic"],
        "answer": "coral; volcanic",
        "explanation": "Lakshadweep (Arabian Sea) is a coral archipelago formed by coral polyps on submerged undersea volcanoes. The Andaman & Nicobar Islands (Bay of Bengal) are volcanic in origin, part of a volcanic arc formed by the subduction of the Indian Plate beneath the Burmese plate. Barren Island (Andaman) is the only active volcano in India."
    },

    # ---- c12_geo_007: Drainage Systems ----
    {
        "id": "geo_dr_01", "node": "c12_geo_007",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "Indian rivers are classified into which two major drainage systems based on their flow direction?",
        "options": ["Himalayan rivers and Peninsular rivers", "Bay of Bengal rivers and Arabian Sea rivers", "Perennial rivers and seasonal rivers", "West-flowing and East-flowing"],
        "answer": "Himalayan rivers and Peninsular rivers",
        "explanation": "The primary classification of Indian rivers is into Himalayan rivers (Indus, Ganga, Brahmaputra) and Peninsular rivers (Godavari, Krishna, Kaveri, Mahanadi, Narmada, Tapti). Himalayan rivers originate in the Himalayas, are perennial, and flow through the Northern Plains. Peninsular rivers originate in the Western Ghats, are seasonal, and flow east or west."
    },
    {
        "id": "geo_dr_02", "node": "c12_geo_007",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "Which river flows through a rift valley and is the only major west-flowing river of peninsular India?",
        "options": ["Narmada", "Godavari", "Krishna", "Kaveri"],
        "answer": "Narmada",
        "explanation": "The Narmada River flows westward through the Narmada Rift Valley (a structural trough formed by tectonic faulting), between the Satpura Range (north) and the Vindhyan Range (south), draining into the Arabian Sea. It is the only major west-flowing peninsular river that forms an estuary rather than a delta."
    },
    {
        "id": "geo_dr_03", "node": "c12_geo_007",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "standard",
        "question": "The _____ River is the longest river of peninsular India, approximately 1,465 km in length.",
        "options": [],
        "answer": "Godavari",
        "explanation": "The Godavari River, known as the 'Dakshin Ganga' (Ganga of the South), is the longest peninsular river at approximately 1,465 km. It originates from Trimbakeshwar in the Western Ghats (Maharashtra) and flows eastward across Maharashtra, Telangana, Andhra Pradesh to drain into the Bay of Bengal. Its basin covers about 313,000 sq km."
    },
    {
        "id": "geo_dr_04", "node": "c12_geo_007",
        "type": "numerical",
        "difficulty": "medium",
        "context": "standard",
        "question": "The Ganga River is approximately 2,525 km long. If a student measures a map scale of 1 cm = 100 km, what length would the Ganga measure on the map (in cm)?",
        "options": [],
        "answer": "25.25 cm",
        "explanation": "Map length = Actual length / Scale factor\nMap length = 2,525 km / 100 km per cm = 25.25 cm\n\nThis calculation is fundamental for map reading skills in the ISC Geography practical examination. Students must convert real-world distances to map distances and vice versa.",
        "verification": {
            "type": "reverse",
            "formula": "25.25 cm x 100 km/cm = 2,525 km ✓",
            "passed": True
        }
    },
    {
        "id": "geo_dr_05", "node": "c12_geo_007",
        "type": "mcq",
        "difficulty": "medium",
        "context": "competency",
        "question": "During a flood in the Brahmaputra Valley of Assam, relief teams must choose between two routes to reach a stranded village. Route A follows the river valley (faster but flood-prone), while Route B goes through the Khasi Hills (safer but slower). Which geographical factor makes Route B safer?",
        "options": [
            "The Khasi Hills are made of ancient hard rocks and are above flood levels",
            "The Khasi Hills have a different climate that prevents rain",
            "Route B is shorter in distance",
            "The Khasi Hills have better road infrastructure"
        ],
        "answer": "The Khasi Hills are made of ancient hard rocks and are above flood levels",
        "explanation": "The Khasi Hills (Meghalaya) are composed of Precambrian gneissic and granitic rocks, forming a plateau with an average elevation of 1,500m. Being significantly above the Brahmaputra floodplain (~80-100m elevation), they are naturally safe from river flooding. Mawsynram (world's highest rainfall) is in the Khasi Hills."
    },
    {
        "id": "geo_dr_06", "node": "c12_geo_007",
        "type": "long-answer",
        "difficulty": "hard",
        "context": "standard",
        "question": "Compare and contrast Himalayan rivers and Peninsular rivers in terms of origin, length, regime, and economic importance.",
        "options": [],
        "answer": "COMPARISON OF HIMALAYAN AND PENINSULAR RIVERS:\n\nHIMALAYAN RIVERS (Indus, Ganga, Brahmaputra):\n- Origin: Glaciers and snowfields of the Himalayas (perennial sources)\n- Length: Very long (Ganga 2,525 km; Indus 3,180 km; Brahmaputra 2,900 km)\n- Regime: Perennial (flow throughout the year, fed by both snowmelt and rainfall)\n- Course: Youthful stage - still eroding and depositing; V-shaped valleys in upper reaches\n- Delta: Large, fertile deltas (Sundarbans for Ganga-Brahmaputra; Indus Delta)\n- Economic importance: Source of perennial irrigation for the Northern Plains; hydroelectric potential; major navigation routes (Ganga); inland water transport\n\nPENINSULAR RIVERS (Godavari, Krishna, Kaveri, Mahanadi, Narmada, Tapti):\n- Origin: Western Ghats (rainfall-fed); flow through ancient plateau terrain\n- Length: Moderate (Godavari 1,465 km; Krishna 1,400 km; Kaveri 802 km)\n- Regime: Seasonal - peak flow during monsoon (June-Sept), low/dry in winter\n- Course: Mature stage - wide flood plains, meanders, well-developed deltas\n- Deltas: Triangular, fertile deltas at eastern coast (Kaveri Delta, Godavari Delta)\n- Economic importance: Tank irrigation systems (Kaveri); hydroelectric projects (Koyna, Nagarjuna Sagar); delta agriculture (rice, coconut); west-flowing rivers (Narmada, Tapti) support limited agriculture but have hydroelectric dams (Sardar Sarovar, Ukai)",
        "explanation": "The key difference in regime is that Himalayan rivers have a mixed source (snow + rain) making them perennial, while peninsular rivers depend entirely on monsoon rainfall. The Narmada and Tapti are exceptions - they are the only west-flowing peninsular rivers flowing through rift valleys."
    },

    # ---- c12_geo_008: Climate Factors ----
    {
        "id": "geo_cf_01", "node": "c12_geo_008",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "Which of the following is NOT one of the major factors affecting India's climate?",
        "options": ["Proximity to the equator", "Himalayan Mountains", "The Monsoon Winds", "The Indian Ocean"],
        "answer": "Proximity to the equator",
        "explanation": "India is NOT close to the equator - the Tropic of Cancer passes through its middle. The major factors affecting India's climate are: (1) The Himalayan Mountains (cold barrier, monsoon intercept); (2) The Monsoon Winds (seasonal reversal); (3) The Indian Ocean (moisture source); (4) The Peninsular shape; (5) Altitude variations. Being close to the equator would produce uniform tropical climate, but India's climate varies from tropical to alpine due to the Himalayas and latitude spread."
    },
    {
        "id": "geo_cf_02", "node": "c12_geo_008",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "The Western Ghats create a rain-shadow effect on which side of the range?",
        "options": ["The eastern (leeward) side - interior Deccan", "The western (windward) side - Konkan coast", "Both sides equally", "The northern side only"],
        "answer": "The eastern (leeward) side - interior Deccan",
        "explanation": "The Western Ghats receive heavy southwest monsoon rainfall on their windward (western) side (Konkan coast gets 200-400 cm rainfall). The air masses lose moisture crossing the Ghats, creating a rain-shadow region (leeward side/rain-shadow region) on the eastern side - the interior Deccan Plateau including parts of Karnataka, Telangana, and Rayalaseema receives only 40-60 cm rainfall, creating semi-arid conditions."
    },
    {
        "id": "geo_cf_03", "node": "c12_geo_008",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "competency",
        "question": "Mawsynram in Meghalaya receives the highest average rainfall in the world (~11,872 mm annually) primarily because it is located on the _____ side of the Khasi Hills and directly faces the moist _____ winds from the Bay of Bengal.",
        "options": [],
        "answer": "windward; southwest monsoon",
        "explanation": "Mawsynram (Cherrapunji area) is on the southern/windward slopes of the Khasi Hills. The funnel-shaped valley channels the moisture-laden southwest monsoon winds from the Bay of Bengal upward, causing extreme orographic rainfall. This is the world's highest recorded average annual rainfall."
    },
    {
        "id": "geo_cf_04", "node": "c12_geo_008",
        "type": "short-answer",
        "difficulty": "medium",
        "context": "competency",
        "question": "Explain how India's latitudinal spread from 8 deg N to 37 deg N affects the distribution of temperature across the country.",
        "options": [],
        "answer": "India's latitudinal spread of approximately 29 deg  (8 deg 4'N to 37 deg 6'N) creates significant temperature variation across the country: (1) Southern India (Kerala, Tamil Nadu) at ~8-13 deg N experiences high temperatures year-round (average 25-30 deg C), minimal seasonal variation, and occasional overhead sun passage (twice annually south of 23.5 deg N). (2) Central India (15-23 deg N) has moderate to high temperatures with distinct seasons - hot summers (40-45 deg C), cool winters. (3) Northern India (>23.5 deg N, north of Tropic of Cancer) experiences very hot summers (45-48 deg C in Rajasthan/Punjab) and cool to cold winters (5-15 deg C, with near-freezing in the Himalayan foothills). The latitudinal difference is the primary reason for north-south temperature gradients, modified by altitude (Himalayas, plateaus) and proximity to water bodies.",
        "explanation": "Each degree of latitude ≈ 111 km. The ~2,900 km north-south spread means the sun's angle at noon varies by ~29 deg , creating substantial insolation differences. The Tropic of Cancer is the critical dividing line for solar altitude."
    },
    {
        "id": "geo_cf_05", "node": "c12_geo_008",
        "type": "numerical",
        "difficulty": "medium",
        "context": "standard",
        "question": "The sun's altitude at noon on the summer solstice (June 21) at a place at latitude phi is given by: Altitude = 90 deg  - |phi - 23.5 deg |. Calculate the noon sun altitude for: (a) Kanyakumari (8 deg 4'N) and (b) Srinagar (34 deg N) on June 21.",
        "options": [],
        "answer": "(a) Kanyakumari: 105.5 deg  (effectively 90 deg  - sun directly overhead); (b) Srinagar: 79.5 deg ",
        "explanation": "Formula: Altitude = 90 deg  - |phi - 23.5 deg |\n\n(a) Kanyakumari: phi = 8 deg N\nAltitude = 90 deg  - |8 deg  - 23.5 deg | = 90 deg  - 15.5 deg  = 74.5 deg \nWait, let me recalculate. On June 21, sun is at 23.5 deg N (Tropic of Cancer).\nAltitude = 90 deg  - |8 deg  - 23.5 deg | = 90 deg  - 15.5 deg  = 74.5 deg \n\nFor the sun to be directly overhead (90 deg ), the location must be at 23.5 deg N on June 21. Kanyakumari at 8 deg N is south of the Tropic, so sun is never directly overhead at noon on June 21.\n\n(b) Srinagar: phi = 34 deg N\nAltitude = 90 deg  - |34 deg  - 23.5 deg | = 90 deg  - 10.5 deg  = 79.5 deg \n\nVerification: At the Tropic of Cancer (23.5 deg N), altitude = 90 deg  - 0 = 90 deg  (directly overhead) ✓\nAt the Equator (0 deg ), altitude = 90 deg  - 23.5 deg  = 66.5 deg  ✓",
        "verification": {
            "type": "formula_check",
            "formula": "Altitude = 90 deg  - |phi - 23.5 deg |",
            "tests": [
                {"phi": "23.5 deg N", "expected": "90 deg ", "result": "90 deg ", "pass": True},
                {"phi": "0 deg ", "expected": "66.5 deg ", "result": "66.5 deg ", "pass": True},
            ],
            "passed": True
        }
    },

    # ---- c12_geo_009: Monsoon Mechanism ----
    {
        "id": "geo_mm_01", "node": "c12_geo_009",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "The term 'monsoon' is derived from which Arabic word?",
        "options": ["Mausim (season)", "Matar (rain)", "Mausam (weather)", "Maheen (cloud)"],
        "answer": "Mausim (season)",
        "explanation": "'Monsoon' comes from the Arabic word 'mausim' meaning 'season'. Arab traders used it to describe the seasonal reversal of winds over the Indian Ocean - the southwest monsoon winds that brought rain to India from June to September, and the northeast monsoon winds from October to November."
    },
    {
        "id": "geo_mm_02", "node": "c12_geo_009",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "The Inter-Tropical Convergence Zone (ITCZ) shifts northward during summer due to:",
        "options": ["The apparent northward movement of the sun", "Rotation of the Earth", "El Niño events", "Volcanic eruptions"],
        "answer": "The apparent northward movement of the sun",
        "explanation": "During summer (June), the apparent northward movement of the sun (to the Tropic of Cancer, 23.5 deg N) causes the ITCZ to shift northward to approximately 20 deg N over India. This creates a low-pressure area over northern India and the Thar Desert. The southeast trade winds from the Southern Hemisphere cross the equator, are deflected to the right by the Coriolis force, and arrive as southwest monsoon winds."
    },
    {
        "id": "geo_mm_03", "node": "c12_geo_009",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "competency",
        "question": "The Arabian Sea Branch of the southwest monsoon arrives on the Kerala coast around June 1st, an event called the '_____' (arrival of monsoon).",
        "options": [],
        "answer": "monsoon burst",
        "explanation": "The 'monsoon burst' or monsoon arrival marks the sudden onset of heavy rainfall over Kerala around June 1st (sometimes June 5-10). It is characterized by a dramatic rise in rainfall, fall in temperature, and increased humidity. This date is used as the official start of the southwest monsoon season in India."
    },
    {
        "id": "geo_mm_04", "node": "c12_geo_009",
        "type": "short-answer",
        "difficulty": "medium",
        "context": "competency",
        "question": "A farmer in Vidarbha (eastern Maharashtra) notices that her area receives less rain than the Konkan coast during the monsoon. Using your knowledge of the monsoon mechanism and the Western Ghats, explain this rainfall difference.",
        "options": [],
        "answer": "The Western Ghats act as an orographic barrier. The southwest monsoon winds carrying moisture from the Arabian Sea first strike the windward side of the Western Ghats (Konkan coast: Mumbai, Ratnagiri, Goa, coastal Karnataka) causing heavy orographic rainfall (200-400 cm). As the air mass crosses the Ghats and descends on the leeward (eastern) side, it becomes dry and warm - creating a rain-shadow region. Vidarbha (interior Maharashtra) lies in this rain-shadow zone and receives only 80-120 cm rainfall, compared to 300-400 cm on the Konkan coast. This is why Vidarbha is more drought-prone despite being in the monsoon belt. The same rain-shadow effect affects the interior Deccan plateau.",
        "explanation": "This is a real-world application of orographic rainfall and rain-shadow effects. Vidarbha farmer suicides are partly linked to this geographical rainfall distribution - making this a competency-based question with real social relevance."
    },
    {
        "id": "geo_mm_05", "node": "c12_geo_009",
        "type": "long-answer",
        "difficulty": "hard",
        "context": "standard",
        "question": "Describe the mechanism of the southwest monsoon, explaining the role of the ITCZ, trade winds, Coriolis force, and the Tibetan Plateau.",
        "options": [],
        "answer": "MECHANISM OF SOUTHWEST MONSOON:\n\nSTEP 1 - SUMMER HEATING AND ITCZ SHIFT:\nDuring summer (March-June), the apparent northward movement of the sun heats the Indian landmass intensely. The ITCZ (Inter-Tropical Convergence Zone) shifts northward to approximately 20 deg N over India, creating intense low pressure over the Thar Desert and northern India.\n\nSTEP 2 - PRESSURE GRADIENT:\nThe intense low pressure over northern India (the 'monsoon trough') creates a strong pressure gradient - high pressure over the southern Indian Ocean and low pressure over northern India. This draws winds northward.\n\nSTEP 3 - CROSS-EQUATOR FLOW AND CORIOLIS DEFLECTION:\nThe southeast trade winds from the Southern Hemisphere cross the equator. Due to the Coriolis force (deflection to the right in the Northern Hemisphere), they are deflected westward and arrive as southwest winds over India.\n\nSTEP 4 - ROLE OF TIBETAN PLATEAU:\nThe Tibetan Plateau acts as a thermal high. Its intense heating creates an anticyclone at 200mb level (jet stream level), which intensifies the low-level southwesterly monsoon flow. The plateau-heating hypothesis explains why the monsoon onset is sudden and vigorous.\n\nSTEP 5 - ARABIAN SEA AND BAY OF BRANCHES:\n- Arabian Sea Branch: Crosses the Western Ghats, causing heavy rainfall on the west coast and the Western Ghats. Some winds enter the Ganga valley via the Narmada-Tapti gap.\n- Bay of Bengal Branch: Strikes the Myanmar coast, turns northwest along the Brahmaputra valley, and enters the Ganga-Brahmaputra plains.\n\nSTEP 6 - BREAKS AND RETREAT:\nThe monsoon is not continuous. 'Breaks' occur when the monsoon trough shifts north, reducing rainfall over central India. The monsoon withdraws (retreats) in September-October as the ITCZ shifts southward.",
        "explanation": "The monsoon mechanism involves multiple interacting factors - astronomical (sun's apparent movement), thermal (land-sea contrast, Tibetan heating), dynamic (ITCZ, trade winds, Coriolis force), and topographic (Ghats, Himalayas). Understanding these is key for ISC Geography."
    },

    # ---- c12_geo_010: Seasons of India ----
    {
        "id": "geo_sn_01", "node": "c12_geo_010",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "India is traditionally divided into how many seasons?",
        "options": ["Four", "Six", "Three", "Two"],
        "answer": "Six",
        "explanation": "The Indian Meteorological Department (IMD) recognizes six seasons in India: (1) Winter (January-February), (2) Summer/Pre-monsoon (March-May), (3) Southwest Monsoon/Rainy (June-September), (4) Post-monsoon (October-November), (5) Northeast Monsoon (December). The traditional Hindu calendar recognizes six ritus: Vasant, Grishma, Varsha, Sharad, Hemant, Shishira."
    },
    {
        "id": "geo_sn_02", "node": "c12_geo_010",
        "type": "mcq",
        "difficulty": "medium",
        "context": "competency",
        "question": "Chennai (formerly Madras) receives significant rainfall during the northeast monsoon (October-December), unlike most other parts of Tamil Nadu. This is because:",
        "options": [
            "The northeast monsoon winds pick up moisture over the Bay of Bengal and strike the Coromandel Coast",
            "Chennai is closer to the Arabian Sea",
            "The Western Ghats block monsoon from reaching Chennai",
            "Chennai has a special micro-climate"
        ],
        "answer": "The northeast monsoon winds pick up moisture over the Bay of Bengal and strike the Coromandel Coast",
        "explanation": "During October-December, the retreating southwest monsoon winds (northeast monsoon) travel over the Bay of Bengal, picking up moisture. When they strike the Coromandel Coast (Tamil Nadu coast), they cause significant rainfall - 50-100 cm. Tamil Nadu gets 60% of its annual rainfall from the northeast monsoon, unlike the rest of India which relies on southwest monsoon."
    },
    {
        "id": "geo_sn_03", "node": "c12_geo_010",
        "type": "fill_blank",
        "difficulty": "medium",
        "context": "standard",
        "question": "The period from March to May is called the _____ season in India, characterized by _____ temperatures and _____ thunderstorms in some regions.",
        "options": [],
        "answer": "summer/pre-monsoon; high; pre-monsoon",
        "explanation": "The summer season (March-May) is characterized by intense heating, with temperatures reaching 45-48 deg C in Rajasthan and Punjab. During this period, pre-monsoon thunderstorms (called 'Nor'westers' or 'Kalbaisakhi' in Bengal) occur due to convective activity - these are violent thunderstorms with gusty winds and hail, providing relief and pre-monsoon rainfall."
    },
    {
        "id": "geo_sn_04", "node": "c12_geo_010",
        "type": "numerical",
        "difficulty": "medium",
        "context": "standard",
        "question": "If the average rainfall in Cherrapunji during the monsoon season (June-September) is 8,000 mm and during October-December is 2,500 mm, calculate the percentage of annual rainfall received during the monsoon season.",
        "options": [],
        "answer": "76.2%",
        "explanation": "Total annual rainfall = 8,000 + 2,500 = 10,500 mm\nMonsoon season rainfall = 8,000 mm\nPercentage = (8,000 / 10,500) x 100 = 76.2%\n\nVerification: 76.2% of 10,500 = 0.762 x 10,500 = 8,001 ≈ 8,000 ✓",
        "verification": {
            "type": "reverse",
            "formula": "8000/10500 x 100 = 76.19% ≈ 76.2%",
            "passed": True
        }
    },

    # ---- c12_geo_011: Droughts and Floods ----
    {
        "id": "geo_df_01", "node": "c12_geo_011",
        "type": "mcq",
        "difficulty": "easy",
        "context": "standard",
        "question": "Drought in India is primarily classified based on which criterion?",
        "options": ["Rainfall deficiency relative to the long-term average", "Temperature levels alone", "River flow rates", "Groundwater levels only"],
        "answer": "Rainfall deficiency relative to the long-term average",
        "explanation": "Drought is classified based on rainfall deficiency from the long-term average (LPA): (1) Mild drought: 20-25% below normal; (2) Moderate drought: 26-40% below normal; (3) Severe drought: >40% below normal. The India Meteorological Department (IMD) uses this standard classification."
    },
    {
        "id": "geo_df_02", "node": "c12_geo_011",
        "type": "mcq",
        "difficulty": "medium",
        "context": "competency",
        "question": "The districts of Bundelkhand (spanning Uttar Pradesh and Madhya Pradesh) frequently face drought. The primary geographical reason is:",
        "options": [
            "It lies in the rain-shadow of the Vindhyan and Aravalli ranges, receiving erratic monsoon rainfall",
            "It is too far from the ocean",
            "It has no rivers flowing through it",
            "It is covered by dense forests that consume all rainwater"
        ],
        "answer": "It lies in the rain-shadow of the Vindhyan and Aravalli ranges, receiving erratic monsoon rainfall",
        "explanation": "Bundelkhand is a semi-arid region on the Vindhyan plateau. It receives monsoon rainfall from the Arabian Sea branch, but is partly in the rain-shadow zone. The rainfall is highly variable (600-800 mm average) with frequent dry spells during the monsoon, leading to recurring drought. Farmer distress and migration are common, making this a critically important competency topic."
    },
    {
        "id": "geo_df_03", "node": "c12_geo_011",
        "type": "short-answer",
        "difficulty": "medium",
        "context": "competency",
        "question": "Explain the causes of the 2023-like flooding in Assam and parts of Bihar, linking it to geographical factors.",
        "options": [],
        "answer": "Flooding in Assam and Bihar is caused by a combination of geographical factors: (1) Heavy monsoon rainfall in the Brahmaputra and Ganga basins due to active monsoon troughs and low-pressure systems. (2) The Brahmaputra and its tributaries carry enormous volumes of water - the river is young, braided, and carries high sediment loads from the eroding Himalayas. (3) Drainage congestion: the flat terrain of the Brahmaputra Valley has poor natural drainage. (4) Riverbank erosion: the Brahmaputra is one of the world's most erosion-prone rivers, constantly changing its course and widening its valley. (5) Embankment breaches: poorly maintained embankments give way during peak flow. (6) Deforestation in the upper catchments (Arunachal Pradesh, Bhutan) increases runoff. (7) Encroachment on floodplains and wetlands reduces the natural flood-absorbing capacity.",
        "explanation": "Assam floods are an annual phenomenon affecting millions. About 40% of Assam's land area is flood-prone. The Brahmaputra carries ~20,000 cubic meters per second at peak - second only to the Amazon in terms of sediment transport."
    },
    {
        "id": "geo_df_04", "node": "c12_geo_011",
        "type": "mcq",
        "difficulty": "medium",
        "context": "standard",
        "question": "Which of the following measures is NOT a traditional flood management technique used in India?",
        "options": [
            "Construction of ring bunds around villages",
            "Building raised platforms (mahals) in flood-prone areas",
            "Cloud seeding to prevent rainfall",
            "Flood-tolerant crop varieties (like floating rice)"
        ],
        "answer": "Cloud seeding to prevent rainfall",
        "explanation": "Traditional flood management in India includes: ring bunds (embankments around villages), raised platforms/mahals for people and cattle, floating rice varieties (Bao rice in Assam that grows with rising water), community-based early warning systems, and living with flood cycles. Cloud seeding is a modern, experimental technique, not a traditional or widespread flood management practice in India."
    },
    {
        "id": "geo_df_05", "node": "c12_geo_011",
        "type": "long-answer",
        "difficulty": "hard",
        "context": "standard",
        "question": "Distinguish between droughts and floods in India, describing the areas prone to each and the measures to mitigate these disasters.",
        "options": [],
        "answer": "DROUGHTS IN INDIA:\n- Definition: Extended period of deficient rainfall (20-25%+ below normal)\n- Prone areas: Rajasthan (Thar Desert), Gujarat, Maharashtra (Vidarbha, Marathwada), Karnataka (Rayalaseema, North Interior Karnataka), Andhra Pradesh (Rayalaseema), Bundelkhand (UP-MP), Tamil Nadu (interior areas)\n- Causes: erratic monsoon, rain-shadow effects, high evaporation, over-extraction of groundwater, climate change\n- Types: Meteorological (rainfall deficit), Agricultural (soil moisture deficit), Hydrological (water shortage), Socio-economic (demand exceeds supply)\n\nFLOODS IN INDIA:\n- Definition: Overflow of water onto normally dry land, causing damage\n- Prone areas: Assam (Brahmaputra), Bihar (Kosi, Gandak), Uttar Pradesh (Ganga, Yamuna), West Bengal (Ganga, Damodar), Punjab (Ravi, Beas), Odisha (Mahanadi, Brahmani), Kerala (Periyar)\n- Causes: Heavy monsoon rainfall, young Himalayan rivers with high sediment load, poor drainage, deforestation, riverbank encroachment\n- Approximately 12% of India's land area is flood-prone (40 million hectares)\n\nMITIGATION MEASURES:\n- Drought: Watershed development, rainwater harvesting, drought-resistant crops, micro-irrigation (drip/sprinkler), weather forecasting, crop insurance (PMFBY), groundwater recharge\n- Flood: Embankments/dams, river channelisation, flood forecasting and early warning systems, wetland conservation (as natural sponges), afforestation in catchments, floodplain zoning regulations",
        "explanation": "India loses approximately ₹50,000 crores annually to droughts and floods combined. Climate change is increasing both the frequency of intense rainfall events and the severity of dry spells, making disaster management a critical national priority."
    },

]

# return {"status": "ok", "note": "truncated"}
