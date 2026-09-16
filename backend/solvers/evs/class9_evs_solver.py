"""
EVS Class 9 Solver Module
========================
CISCE EVS Syllabus – Nodes: c9_evs_001 (Biotic/Abiotic), c9_evs_002 (Earth's Spheres)

Provides:
  - Answer verification with partial credit
  - Step-by-step model solutions
  - Indian-context-aware keyword checking
  - Food-chain and sphere-interaction validators
"""
import random
import re
import json
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional, Set
from enum import Enum

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class QType(Enum):
    MCQ        = "mcq"
    VSA        = "vsa"          # Very Short Answer (1 mark)
    SA         = "sa"           # Short Answer (2-3 marks)
    LA         = "la"           # Long Answer (5 marks)
    MATCH      = "match"
    ASSERTION  = "assertion_reason"
    FOOD_CHAIN = "food_chain"
    DIAGRAM    = "diagram"

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
@dataclass
class Question:
    qid: str
    node_id: str
    qtype: QType
    text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    marks: int = 1
    key_points: List[str] = field(default_factory=list)
    required_keywords: List[str] = field(default_factory=list)
    indian_context: bool = False
    difficulty: str = "Medium"
    topic: str = ""
    explanation: str = ""

@dataclass
class VerificationResult:
    is_correct: bool
    score_awarded: float
    max_score: float
    feedback: str
    missing_points: List[str] = field(default_factory=list)
    correct_points: List[str] = field(default_factory=list)
    model_answer: str = ""
    steps: List[str] = field(default_factory=list)

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class KB:
    """Centralised knowledge base for Class 9 EVS."""

    # ── Node 1 ─────────────────────────────────
    ENV_DEF = (
        "Environment is the sum total of all external conditions "
        "(living and non-living) that surround and affect an organism."
    )
    BIOTIC_DEF = (
        "Biotic components are the living parts of the environment "
        "– plants, animals, microorganisms, and decomposers."
    )
    ABIOTIC_DEF = (
        "Abiotic components are the non-living physical and chemical "
        "parts – sunlight, temperature, water, air, soil, and minerals."
    )
    BIOSPHERE_DEF = (
        "The biosphere is the zone where biotic (living) and abiotic "
        "(non-living) components interact. It includes the lower "
        "atmosphere, the entire hydrosphere, and the upper lithosphere."
    )
    PHOTOSYNTHESIS = (
        "Photosynthesis is the process by which green plants use "
        "sunlight, water, and carbon dioxide to produce glucose (food) "
        "and release oxygen as a by-product."
    )
    DECOMPOSERS = (
        "Decomposers (bacteria and fungi) break down dead plants and "
        "animals into simpler substances, returning nutrients to the "
        "soil for reuse by plants."
    )
    FOOD_CHAIN_DEF = (
        "A food chain shows the flow of energy from the Sun through "
        "producers (green plants), consumers (herbivores then carnivores), "
        "and finally to decomposers."
    )

    BIOTIC_LIST_GENERAL  = ["plants", "animals", "microorganisms", "decomposers"]
    BIOTIC_LIST_INDIAN   = [
        "banyan tree (Ficus benghalensis)",
        "Bengal tiger",
        "Indian elephant",
        "honey bee",
        "earthworm",
        "kingfisher",
        "cobra",
        "microorganisms in soil",
    ]
    ABIOTIC_LIST_GENERAL = ["sunlight", "temperature", "water", "air", "soil", "minerals"]
    ABIOTIC_LIST_INDIAN  = [
        "monsoon rainfall",
        "alluvial soil of the Ganga plain",
        "Himalayan rock minerals",
        "Thar Desert sand",
        "tropical sunlight",
    ]

    ECOSYSTEMS = {
        "desert": {
            "climate": "low rainfall, extreme temperatures, hot days/cool nights",
            "flora": "cactus, thorny bushes, succulents",
            "fauna": "camels, snakes, lizards, scorpions",
            "indian": "Thar Desert – cactus, camel, sand fox",
        },
        "forest": {
            "climate": "high rainfall, moderate temperatures",
            "flora": "dense trees, undergrowth, ferns",
            "fauna": "deer, monkeys, birds, insects",
            "indian": "Sundarbans mangrove forest – sundari trees, Bengal tiger",
        },
        "aquatic": {
            "climate": "water medium, variable temperature",
            "flora": "algae, aquatic plants, phytoplankton",
            "fauna": "fish, frogs, insects, turtles",
            "indian": "Chilika Lake – algae, fish, migratory birds",
        },
    }

    # ── Node 2 ─────────────────────────────────
    SPHERES = {
        "hydrosphere": {
            "definition": "All water on Earth – oceans, rivers, lakes, "
                          "groundwater, and water in ice/snow.",
            "examples": ["Pacific Ocean", "Ganga River", "Wular Lake", "groundwater"],
            "indian": ["Ganga River", "Brahmaputra", "Wular Lake (J&K)", "groundwater aquifers"],
        },
        "lithosphere": {
            "definition": "The rigid outer part of Earth including the crust "
                          "and upper mantle – rocks, soils, and minerals.",
            "examples": ["Himalayas", "Deccan Plateau", "soil profile", "mineral deposits"],
            "indian": ["Himalayan range", "Deccan Traps", "black soil (regur) of Maharashtra",
                       "mineral-rich Chotanagpur Plateau"],
        },
        "atmosphere": {
            "definition": "Gaseous envelope around Earth. N₂ ~78%, O₂ ~21%, "
                          "CO₂ ~0.04%, water vapour. Layers: troposphere, "
                          "stratosphere, mesosphere, thermosphere.",
            "examples": ["breathable air", "monsoon winds", "greenhouse effect", "ozone layer"],
            "indian": ["southwest monsoon winds", "cyclones from Bay of Bengal", "air quality in Delhi"],
        },
        "cryosphere": {
            "definition": "All frozen water – glaciers, ice caps, sea ice, "
                          "permafrost, and snow cover.",
            "examples": ["Antarctic ice sheet", "Himalayan glaciers", "Arctic sea ice", "permafrost"],
            "indian": ["Siachen Glacier", "Gangotri Glacier", "Zemu Glacier (Sikkim)", "Himalayan snow"],
        },
        "biosphere": {
            "definition": "All living organisms from the smallest bacteria "
                          "to the largest blue whales.",
            "examples": ["tropical forests", "coral reefs", "grasslands", "soil microbes"],
            "indian": ["Sundarbans mangroves", "Western Ghats forests", "Gangetic delta",
                       "Indian wildlife (tigers, elephants, peacocks)"],
        },
    }

    INTERACTIONS = {
        "hydrosphere↔atmosphere": {
            "process": "Water cycle: evaporation, condensation, precipitation",
            "indian": (
                "Southwest monsoon: ocean water evaporates → forms clouds "
                "→ rainfall over the Indian subcontinent."
            ),
        },
        "lithosphere↔atmosphere": {
            "process": "Weathering, erosion, volcanic gas emission",
            "indian": (
                "Himalayan rocks weathered by wind and rain; Barren Island "
                "(Andaman) volcano releases gases into the atmosphere."
            ),
        },
        "biosphere↔lithosphere": {
            "process": "Soil formation through decomposition; roots crack rock",
            "indian": (
                "Tree roots in the Western Ghats break down laterite rock; "
                "earthworms enrich black cotton soil."
            ),
        },
        "cryosphere↔hydrosphere": {
            "process": "Glacier melt feeds rivers → affects sea level",
            "indian": (
                "Gangotri Glacier melts → Bhagirathi River → Ganga → "
                "Bay of Bengal; rising sea level threatens Sundarbans."
            ),
        },
        "biosphere↔atmosphere": {
            "process": "Photosynthesis absorbs CO₂, releases O₂; respiration does reverse",
            "indian": (
                "Sundarbans mangrove trees act as a carbon sink, absorbing "
                "CO₂ and releasing oxygen."
            ),
        },
    }

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class EVSSolver:
    """
    Verifies student answers, awards partial credit, and produces
    step-by-step model solutions for both EVS Class 9 nodes.
    """

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self._load_questions()

    # ── Question loading ────────────────────────
    def _load_questions(self):
        self.bank: Dict[str, Question] = {}
        self._build_node1_questions()
        self._build_node2_questions()

    def _add(self, q: Question):
        self.bank[q.qid] = q

    # ── Node 1 questions ────────────────────────
    def _build_node1_questions(self):
        N1 = "c9_evs_001"
        opts_abc = ["A plant", "A rock", "A river", "A cloud"]
        opts_biotic = [
            "A rose plant",
            "A mountain",
            "A drop of water",
            "Sunlight",
        ]
        opts_photo = [
            "Plants use O₂ and release CO₂",
            "Plants use sunlight, water, and CO₂ to make food",
            "Animals make food using chlorophyll",
            "Bacteria make food using soil minerals",
        ]
        opts_decomp = [
            "They produce oxygen",
            "They make their own food",
            "They break down dead matter and return nutrients to soil",
            "They absorb sunlight",
        ]
        opts_bio = [
            "Only plants and animals",
            "All living things interacting with non-living surroundings",
            "Only the atmosphere",
            "Only the hydrosphere",
        ]

        self._add(Question("N1_MCQ1", N1, QType.MCQ,
            "Which of the following is a biotic component of the environment?",
            opts_biotic, "A", 1,
            required_keywords=["plant", "living", "biotic"],
            indian_context=False, difficulty="Easy", topic="Biotic components"))
        self._add(Question("N1_MCQ2", N1, QType.MCQ,
            "Photosynthesis is best described as:",
            opts_photo, "B", 1,
            required_keywords=["sunlight", "water", "carbon dioxide", "food"],
            indian_context=False, difficulty="Medium", topic="Photosynthesis"))
        self._add(Question("N1_MCQ3", N1, QType.MCQ,
            "Decomposers are important in an ecosystem because they:",
            opts_decomp, "C", 1,
            required_keywords=["break", "dead", "nutrients", "soil"],
            indian_context=False, difficulty="Medium", topic="Decomposers"))
        self._add(Question("N1_MCQ4", N1, QType.MCQ,
            "The biosphere is the zone where:",
            opts_bio, "B", 1,
            required_keywords=["living", "non-living", "interact", "biotic", "abiotic"],
            indian_context=False, difficulty="Medium", topic="Biosphere"))
        self._add(Question("N1_MCQ5", N1, QType.MCQ,
            "In a food chain, the ultimate source of energy is:",
            ["The soil", "The Sun", "Plants", "Decomposers"], "B", 1,
            required_keywords=["sun", "energy", "source"],
            indian_context=False, difficulty="Easy", topic="Food chain"))

        self._add(Question("N1_MCQ6", N1, QType.MCQ,
            "In the Thar Desert ecosystem, which adaptation helps camels survive?",
            ["Webbed feet for swimming", "Humps storing fat",
             "Bright colours for camouflage", "Long tail for flight"],
            "B", 1,
            required_keywords=["fat", "hump", "energy"],
            indian_context=True, difficulty="Medium", topic="Desert ecosystem"))

        self._add(Question("N1_VSA1", N1, QType.VSA,
            "Define 'environment' in the context of ecology.",
            correct_answer=KB.ENV_DEF, marks=1,
            key_points=["sum total", "external conditions", "living and non-living", "affect organism"],
            required_keywords=["surroundings", "conditions", "living", "non-living", "organism"],
            indian_context=False, difficulty="Easy", topic="Environment"))
        self._add(Question("N1_VSA2", N1, QType.VSA,
            "Name any two biotic and two abiotic components found in a "
            "tropical garden like the one in Kerala.",
            correct_answer="Biotic: mango tree, earthworm; "
                           "Abiotic: sunlight, laterite soil",
            marks=1,
            key_points=["two biotic (living)", "two abiotic (non-living)",
                        "Kerala/garden context"],
            required_keywords=["living", "non-living", "examples"],
            indian_context=True, difficulty="Easy", topic="Biotic & Abiotic"))
        self._add(Question("N1_VSA3", N1, QType.VSA,
            "What is the role of decomposers in a forest ecosystem?",
            correct_answer="Decomposers (bacteria, fungi) break down dead "
                           "organic matter into nutrients, returning them to the soil.",
            marks=1,
            key_points=["break down dead matter", "return nutrients to soil",
                        "bacteria/fungi"],
            required_keywords=["decomposers", "dead", "nutrients", "soil"],
            indian_context=False, difficulty="Easy", topic="Decomposers"))

        self._add(Question("N1_SA1", N1, QType.SA,
            "Differentiate between biotic and abiotic components of the "
            "environment. Give two examples of each from an Indian grassland.",
            correct_answer="Biotic: living components e.g. bison, wild grass. "
                           "Abiotic: non-living e.g. rainfall, soil type.",
            marks=3,
            key_points=["biotic = living; examples given",
                        "abiotic = non-living; examples given",
                        "Indian grassland context (bison, rainfall, soil)"],
            required_keywords=["biotic", "abiotic", "living", "non-living", "examples"],
            indian_context=True, difficulty="Medium", topic="Biotic vs Abiotic"))
        self._add(Question("N1_SA2", N1, QType.SA,
            "Describe the process of photosynthesis and explain its "
            "importance for life on Earth.",
            correct_answer=(
                "Green plants use sunlight, water, and CO₂ in the presence "
                "of chlorophyll to produce glucose and release oxygen. "
                "Importance: (1) produces food for plants, "
                "(2) releases oxygen for animals/humans, "
                "(3) reduces CO₂ from atmosphere."
            ),
            marks=3,
            key_points=["sunlight, water, CO₂ used", "chlorophyll",
                        "produces glucose/food", "releases O₂",
                        "importance: food + oxygen + CO₂ reduction"],
            required_keywords=["sunlight", "water", "carbon dioxide", "chlorophyll",
                               "food", "oxygen"],
            indian_context=False, difficulty="Medium", topic="Photosynthesis"))

        self._add(Question("N1_LA1", N1, QType.LA,
            "With the help of a labelled diagram, describe a simple food "
            "chain found in a deciduous forest. Explain how energy flows "
            "through it and the role of each component.",
            correct_answer=(
                "Sun → Green plants (producers) → Deer (primary consumer) → "
                "Tiger (secondary consumer) → Decomposers (bacteria/fungi). "
                "Energy flows unidirectionally; ~10% transferred per level."
            ),
            marks=5,
            key_points=["sun as energy source", "producers (green plants)",
                        "primary consumer (herbivore)", "secondary/tertiary consumer",
                        "decomposers at end", "arrows show energy flow direction",
                        "10% energy transfer rule", "decomposers recycle nutrients"],
            required_keywords=["sun", "producer", "consumer", "decomposer",
                               "energy flow", "arrow direction"],
            indian_context=False, difficulty="Hard", topic="Food chain"))

    # ── Node 2 questions ────────────────────────
    def _build_node2_questions(self):
        N2 = "c9_evs_002"

        self._add(Question("N2_MCQ1", N2, QType.MCQ,
            "The sphere that includes all of Earth's water (oceans, rivers, "
            "lakes, groundwater) is called:",
            ["Lithosphere", "Hydrosphere", "Atmosphere", "Cryosphere"],
            "B", 1,
            required_keywords=["water", "hydrosphere"],
            indian_context=False, difficulty="Easy", topic="Hydrosphere"))
        self._add(Question("N2_MCQ2", N2, QType.MCQ,
            "The rigid outer layer of Earth consisting of the crust and "
            "upper mantle is the:",
            ["Hydrosphere", "Atmosphere", "Lithosphere", "Cryosphere"],
            "C", 1,
            required_keywords=["lithosphere", "rock", "crust"],
            indian_context=False, difficulty="Easy", topic="Lithosphere"))
        self._add(Question("N2_MCQ3", N2, QType.MCQ,
            "All frozen water on Earth, including glaciers and ice caps, "
            "belongs to the:",
            ["Biosphere", "Lithosphere", "Cryosphere", "Hydrosphere"],
            "C", 1,
            required_keywords=["frozen", "ice", "cryosphere"],
            indian_context=False, difficulty="Easy", topic="Cryosphere"))
        self._add(Question("N2_MCQ4", N2, QType.MCQ,
            "N₂ and O₂ are major components of which sphere?",
            ["Lithosphere", "Hydrosphere", "Biosphere", "Atmosphere"],
            "D", 1,
            required_keywords=["nitrogen", "oxygen", "gases", "atmosphere"],
            indian_context=False, difficulty="Easy", topic="Atmosphere"))
        self._add(Question("N2_MCQ5", N2, QType.MCQ,
            "All living organisms from bacteria to whales constitute the:",
            ["Hydrosphere", "Cryosphere", "Biosphere", "Lithosphere"],
            "C", 1,
            required_keywords=["living", "organisms", "biosphere"],
            indian_context=False, difficulty="Easy", topic="Biosphere"))
        self._add(Question("N2_MCQ6", N2, QType.MCQ,
            "Which Indian river originates from the Gangotri Glacier "
            "(cryosphere) and flows into the Bay of Bengal (hydrosphere)?",
            ["Narmada", "Godavari", "Ganga", "Krishna"],
            "C", 1,
            required_keywords=["Ganga", "Gangotri", "Bay of Bengal"],
            indian_context=True, difficulty="Medium", topic="Cryosphere-Hydrosphere"))

        self._add(Question("N2_VSA1", N2, QType.VSA,
            "Name the five major spheres (components) of Earth.",
            correct_answer="Hydrosphere, Lithosphere, Atmosphere, "
                           "Cryosphere, Biosphere",
            marks=1,
            key_points=["all five spheres named"],
            required_keywords=["hydrosphere", "lithosphere", "atmosphere",
                               "cryosphere", "biosphere"],
            indian_context=False, difficulty="Easy", topic="Five spheres"))
        self._add(Question("N2_VSA2", N2, QType.VSA,
            "Give one Indian example of the cryosphere.",
            correct_answer="Siachen Glacier / Gangotri Glacier / Zemu Glacier / Himalayan snow",
            marks=1,
            key_points=["Indian glacier or frozen water body named"],
            required_keywords=["glacier", "ice", "snow", "Himalaya"],
            indian_context=True, difficulty="Easy", topic="Cryosphere"))
        self._add(Question("N2_VSA3", N2, QType.VSA,
            "What is permafrost and where is it found in the Indian "
            "subcontinent?",
            correct_answer="Permafrost is permanently frozen ground found in "
                           "the upper reaches of the Himalayas and in parts of "
                           "Ladakh.",
            marks=1,
            key_points=["permanently frozen ground/soil", "Himalayas/Ladakh"],
            required_keywords=["frozen", "ground", "Himalaya", "Ladakh"],
            indian_context=True, difficulty="Medium", topic="Cryosphere"))

        self._add(Question("N2_SA1", N2, QType.SA,
            "Describe the hydrosphere with two specific Indian examples.",
            correct_answer="Hydrosphere = all water on Earth. "
                           "Examples: Ganga River (India's longest river) "
                           "and Wular Lake (one of Asia's largest freshwater lakes, J&K).",
            marks=3,
            key_points=["definition of hydrosphere", "example 1 (Indian)", "example 2 (Indian)"],
            required_keywords=["water", "ocean/river/lake/groundwater", "Indian example"],
            indian_context=True, difficulty="Medium", topic="Hydrosphere"))
        self._add(Question("N2_SA2", N2, QType.SA,
            "Explain one interaction between the cryosphere and the "
            "hydrosphere with a real-world example.",
            correct_answer="Cryosphere ↔ Hydrosphere interaction: glaciers "
                           "(cryosphere) melt into rivers (hydrosphere). "
                           "Example: Gangotri Glacier feeds the Bhagirathi → "
                           "Ganga → Bay of Bengal.",
            marks=3,
            key_points=["cryosphere and hydrosphere interaction named",
                        "glacier melt → river flow described",
                        "specific Indian example given"],
            required_keywords=["cryosphere", "hydrosphere", "glacier", "melt", "river"],
            indian_context=True, difficulty="Medium", topic="Cryosphere-Hydrosphere"))

        self._add(Question("N2_LA1", N2, QType.LA,
            "Describe Earth's five spheres. Then explain, with at least "
            "two Indian examples, how a change in one sphere can affect "
            "another sphere.",
            correct_answer=(
                "Five spheres: (1) Hydrosphere – all water; "
                "(2) Lithosphere – rocks/soil; (3) Atmosphere – gases; "
                "(4) Cryosphere – frozen water; (5) Biosphere – all life. "
                "Example 1: Glacier melting (cryosphere) → Ganga river flow "
                "changes (hydrosphere) → agriculture affected (biosphere). "
                "Example 2: Volcanic eruption (lithosphere) → ash in air "
                "(atmosphere) → temporary global cooling."
            ),
            marks=5,
            key_points=["all five spheres defined",
                        "interaction example 1 with Indian context",
                        "interaction example 2 with Indian context",
                        "cause-effect chain explained",
                        "real-world impact mentioned"],
            required_keywords=["hydrosphere", "lithosphere", "atmosphere",
                               "cryosphere", "biosphere",
                               "interaction", "example", "change", "affect"],
            indian_context=True, difficulty="Hard", topic="Sphere interactions"))

    # ────────────────────────────────────────────
    # ────────────────────────────────────────────
    @staticmethod
    def _keywords(text: str) -> Set[str]:
        stop = {
            "the","a","an","is","are","was","were","of","in","on","at","to",
            "for","with","by","from","and","or","but","not","be","been","have",
            "has","had","do","does","did","will","would","shall","should",
            "can","could","may","might","must","it","its","this","that",
            "these","those","what","which","who","how","when","where","why",
            "they","them","their","he","she","we","our","you","your","all",
            "each","every","both","few","more","most","other","some","such",
            "into","through","during","before","after","above","below","between",
            "than","up","down","out","off","over","under","again","further",
            "then","once","here","there","any","only","own","same","also",
        }
        return {w for w in re.findall(r"[a-zA-Z]+", text.lower()) if w not in stop and len(w) > 2}

    def _keyword_overlap(self, text: str, keywords: List[str]) -> float:
        """Return fraction of required keywords found in text (stemmed match)."""
        if not keywords:
            return 1.0
        student = self._keywords(text)
        matched = 0
        for kw in keywords:
            kw_lower = kw.lower()
            # exact or substring
            if any(kw_lower in s for s in student) or kw_lower in student:
                matched += 1
            else:
                # substring of student tokens
                student_tokens = " ".join(student)
                if kw_lower in student_tokens:
                    matched += 1
        return matched / len(keywords)

    def _point_overlap(self, answer: str, key_points: List[str]) -> Tuple[List[str], List[str]]:
        """Return (matched_points, missing_points)."""
        student = self._keywords(answer)
        matched, missing = [], []
        for pt in key_points:
            pt_kw = self._keywords(pt)
            overlap = pt_kw & student
            if len(overlap) >= max(1, len(pt_kw) * 0.35):
                matched.append(pt)
            else:
                missing.append(pt)
        return matched, missing

    # ── Public verify API ───────────────────────
    def verify(self, qid: str, student_answer: str) -> VerificationResult:
        """Main entry: verify a student answer for question qid."""
        if qid not in self.bank:
            return VerificationResult(False, 0, 0,
                f"Unknown question id: {qid}",
                model_answer="N/A")

        q = self.bank[qid]

        if q.qtype == QType.MCQ:
            return self._verify_mcq(q, student_answer)
        if q.qtype == QType.VSA:
            return self._verify_vsa(q, student_answer)
        if q.qtype in (QType.SA, QType.LA):
            return self._verify_text(q, student_answer)
        if q.qtype == QType.FOOD_CHAIN:
            return self._verify_food_chain(student_answer)

        return VerificationResult(False, 0, q.marks,
            "Unsupported question type.", model_answer=q.correct_answer)

    def _verify_mcq(self, q: Question, ans: str) -> VerificationResult:
        correct = ans.strip().upper() == q.correct_answer.upper()
        if correct:
            steps = [
                "Step 1 – Read the question carefully.",
                f"Step 2 – Recall concept: {q.topic}.",
                f"Step 3 – Evaluate each option.",
                f"Step 4 – Select option '{q.correct_answer}' as correct.",
                f"Step 5 – Confirm: Option '{q.correct_answer}' matches the definition/fact.",
            ]
            return VerificationResult(
                True, q.marks, q.marks,
                f"Correct! Option {q.correct_answer} is the right answer.",
                model_answer=q.correct_answer,
                steps=steps)
        else:
            steps = [
                f"Step 1 – Read the question: {q.text[:60]}...",
                f"Step 2 – Recall concept: {q.topic}.",
                f"Step 3 – Evaluate each option.",
                f"Step 4 – Your answer '{ans}' is incorrect.",
                f"Correct answer: '{q.correct_answer}' — {q.explanation or 'See model answer.'}",
            ]
            return VerificationResult(
                False, 0, q.marks,
                f"Incorrect. Correct answer: {q.correct_answer}. "
                f"{q.explanation or ''}",
                model_answer=q.correct_answer,
                steps=steps)

    def _verify_vsa(self, q: Question, ans: str) -> VerificationResult:
        kw_score = self._keyword_overlap(ans, q.required_keywords)
        matched_pts, missing_pts = self._point_overlap(ans, q.key_points)
        pt_score = len(matched_pts) / len(q.key_points) if q.key_points else 1.0
        overall = (kw_score * 0.4 + pt_score * 0.6)
        awarded = round(overall * q.marks, 2)
        is_correct = overall >= 0.70

        feedback_parts = []
        if is_correct:
            feedback_parts.append("OK Good answer! Key points covered.")
        else:
            feedback_parts.append("X Partially correct or incomplete.")
        if missing_pts:
            feedback_parts.append(f"Missing/weak points: {'; '.join(missing_pts)}")
        if matched_pts:
            feedback_parts.append(f"Correctly covered: {'; '.join(matched_pts)}")

        steps = [
            "Step 1 – Identify what the question asks.",
            f"Step 2 – Recall the definition of '{q.topic}'.",
            f"Step 3 – Include all required keywords.",
            f"Step 4 – Write a concise 1-sentence answer.",
            f"Step 5 – Verify: {len(matched_pts)}/{len(q.key_points)} key points covered.",
        ]
        return VerificationResult(
            is_correct, awarded, q.marks,
            " ".join(feedback_parts),
            missing_points=missing_pts,
            correct_points=matched_pts,
            model_answer=q.correct_answer,
            steps=steps)

    def _verify_text(self, q: Question, ans: str) -> VerificationResult:
        kw_score = self._keyword_overlap(ans, q.required_keywords)
        matched_pts, missing_pts = self._point_overlap(ans, q.key_points)
        pt_score = len(matched_pts) / len(q.key_points) if q.key_points else 1.0
        overall = (kw_score * 0.35 + pt_score * 0.65)
        awarded = round(overall * q.marks, 2)
        is_correct = overall >= 0.60

        feedback_parts = []
        if is_correct:
            feedback_parts.append("OK Good answer! Most key points included.")
        else:
            feedback_parts.append("X Answer is incomplete or partially incorrect.")
        if missing_pts:
            feedback_parts.append(f"Points to add: {'; '.join(missing_pts)}")
        if matched_pts:
            feedback_parts.append(f"Points covered: {'; '.join(matched_pts)}")
        feedback_parts.append(f"Score: {awarded}/{q.marks} marks")

        steps = [
            "Step 1 – Understand what the question is asking.",
            f"Step 2 – Recall key facts about '{q.topic}'.",
            "Step 3 – Structure your answer: definition → examples → explanation.",
            "Step 4 – Ensure all key points are covered.",
            f"Step 5 – Verify: {len(matched_pts)}/{len(q.key_points)} key points present.",
        ]
        return VerificationResult(
            is_correct, awarded, q.marks,
            " ".join(feedback_parts),
            missing_points=missing_pts,
            correct_points=matched_pts,
            model_answer=q.correct_answer,
            steps=steps)

    def _verify_food_chain(self, chain_str: str) -> VerificationResult:
        """Validate a student's food chain string."""
        required = ["sun", "producer", "consumer", "decomposer"]
        kw_score = self._keyword_overlap(chain
)

# -- solver contract --------------------------------------------
def solve(node_id: str = "", params: dict | None = None, **kw):
    params = params or {}
    s = EVSSolver(params.get("seed", 42))
    if "qid" in params and ("user_answer" in params or "answer" in params):
        r = s.verify(params["qid"], params.get("user_answer", params.get("answer")))
        return r if isinstance(r, dict) else getattr(r, "__dict__", {"result": str(r)})
    return {"node_id": node_id, "hint": "pass qid + user_answer to verify"}

def check_answer(qid: str = "", user_answer: str = "", **kw):
    return EVSSolver(kw.get("seed", 42)).verify(qid, user_answer)

SOLVER_REGISTRY = {"c9_evs_solve": solve, "c9_evs_check": check_answer}
NODE_MAP = {"c9_evs_001": "c9_evs_solve", "c9_evs_002": "c9_evs_solve"}
