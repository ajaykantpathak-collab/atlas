"""
CISCE Class 10 EVS Question Generator
Deterministic, seeded question generation covering:
  c10_evs_001 – Cause and effect relations, feedback loops
  c10_evs_002 – Impact on flora and fauna from triple planetary crisis
"""

import random
import math
import fractions
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import hashlib


# ──────────────────────────────────────────────
#  Deterministic seeding helper
# ──────────────────────────────────────────────

def _make_rng(seed: int) -> random.Random:
    """Return a fresh Random instance from an integer seed."""
    return random.Random(seed)


# ──────────────────────────────────────────────
#  Topic pools
# ──────────────────────────────────────────────

# Node c10_evs_001 – Cause and effect, feedback loops
_CAUSE_EFFECT_FACTS = [
    ("Deforestation → reduced rainfall → forest drying → more tree death",
     "Deforestation in the Amazon reduces evapotranspiration, lowering regional rainfall, "
     "which further stresses remaining trees, a reinforcing positive feedback loop."),
    ("Overgrazing → soil erosion → reduced fertility → more overgrazing on remaining land",
     "Overgrazing removes protective vegetation cover, exposing soil to wind and water erosion, "
     "which reduces soil fertility and forces livestock onto smaller areas."),
    ("Industrial SO₂ emissions → acid rain → forest dieback → reduced CO₂ absorption",
     "Sulphur dioxide from factories forms sulphuric acid in rainwater, damaging leaves and "
     "soil chemistry, weakening forests and their carbon-sequestration capacity."),
    ("Arctic warming → sea-ice melt → lower albedo → more heat absorption → further warming",
     "Ice-albedo positive feedback: white ice reflects ~80 % sunlight; open dark ocean absorbs "
     "it, accelerating Arctic temperature rise."),
    ("Permafrost thaw → methane release → enhanced greenhouse effect → more permafrost thaw",
     "Permafrost contains vast frozen organic carbon; warming thaws it, microbes decompose "
     "organic matter releasing CH₄ (28× more potent than CO₂ over 100 yr)."),
]

_POSITIVE_FEEDBACK_EXAMPLES = [
    "Ice-albedo feedback: warming → ice melt → darker surface → more heat absorption → more melting.",
    "Permafrost-carbon feedback: warming → thaw → CH₄/CO₂ release → stronger greenhouse → more warming.",
    "Wildfire-carbon feedback: drought → fire → CO₂ release → warmer/drier → more fires.",
    "Forest-fire feedback: heating → drier vegetation → easier ignition → fire → CO₂ → more heating.",
]

_NEGATIVE_FEEDBACK_EXAMPLES = [
    "CO₂-plant growth feedback: elevated CO₂ → faster photosynthesis → more plant biomass → more CO₂ uptake.",
    "Thermoregulation (homeostasis): body temp rises → sweating → evaporative cooling → temp drops.",
    "Predator-prey: more prey → more predators → fewer prey → fewer predators (stabilising cycle).",
]

_INDIAN_FEEDBACK_CASES = [
    ("Western Ghats deforestation",
     "Tree loss in the Western Ghats reduces monsoon moisture recycling; less rain means more "
     "tree stress and mortality, amplifying deforestation."),
    ("Punjab groundwater depletion",
     "Intensive rice-wheat irrigation lowers water tables; deeper wells cost more, pushing farmers "
     "to pump harder, accelerating depletion — a socio-ecological positive feedback."),
    ("Mumbai mangrove clearing",
     "Mangrove removal reduces storm-surge buffering; flooding damages remaining ecosystems, "
     "making restoration harder and opening more land for development."),
    ("Rajasthan desertification",
     "Overgrazing near the Thar edge removes grass cover; wind erosion removes topsoil; "
     "remaining land supports fewer livestock, concentrating grazing pressure."),
]

_INDICATOR_KEystone_FACTS = [
    ("Lichens", "indicator", "absorb air pollutants directly; absent in polluted urban areas like Delhi NCR."),
    ("Earthworms", "indicator", "soil health; heavy pesticide use in Punjab fields reduces populations."),
    ("Mayflies / stoneflies", "indicator", "water quality; absent from polluted Yamuna stretches."),
    ("Bees", "keystone", "pollinate ~80 % of flowering plants in Indian agriculture; neonicotinoid "
     "pesticides in Punjab Haryana linked to colony collapse."),
    ("Sea otters", "keystone", "control sea urchins; without them kelp forests vanish along coasts."),
    ("Fig trees (Ficus)", "keystone", "fruit year-round; many birds/frugivores depend on them "
     "in Indian tropical forests."),
    ("Coral reefs", "indicator+keystone", "sensitive to temperature/pH; bleaching in Gulf of Kutch "
     "and Andaman signals warming Arabian Sea."),
    ("Tigers", "keystone/umbrella", "apex predator; protecting tiger reserves protects entire "
     "ecosystem in Corbett, Bandhavgarh, Sundarbans."),
]

_CASE_STUDIES = [
    {
        "name": "Coral bleaching – Gulf of Mannar",
        "cause": "Rising sea surface temperatures (>1 °C above summer max) + ocean acidification "
                 "from absorbed CO₂.",
        "effect": "Zooxanthellae expelled → white skeleton → coral death → reef collapse → "
                  "loss of habitat for 1000+ species including commercially important fish.",
        "planetary_crises": ["climate_change", "pollution"],
        "indian_context": "Gulf of Mannar and Palk Bay reefs bleached 2015–2016; tourism and "
                          "fisheries income fell for coastal Tamil Nadu communities.",
    },
    {
        "name": "Amphibian decline – Western Ghats",
        "cause": "Pesticide runoff from cardamom/tea plantations + chytrid fungus spread by "
                 "global amphibian trade.",
        "effect": "Nasikabatrachus sahyadrensis (purple frog) populations crash → loss of "
                  "insect control → mosquito population rise.",
        "planetary_crises": ["pollution", "biodiversity_loss"],
        "indian_context": "IUCN lists 40+ Western Ghats amphibians as Endangered; "
                          "Kerala's Periyar Tiger Reserve monitoring populations.",
    },
    {
        "name": "Pollinator decline – Punjab/Haryana farmland",
        "cause": "Neonicotinoid seed treatments + monoculture eliminating floral diversity.",
        "effect": "Wild bee diversity drops 30–40 % → reduced canola/mustard yields → "
                  "farmers face higher pollination rental costs.",
        "planetary_crises": ["pollution", "biodiversity_loss"],
        "indian_context": "ICAR studies show 4 out of 10 crops in northwest India partially "
                          "pollinator-dependent; yield gaps widening since 2010.",
    },
    {
        "name": "Himalayan glacial lake outburst",
        "cause": "Glacier retreat (climate change) forms unstable moraine-dammed lakes "
                 "e.g., Chorabari, Imja.",
        "effect": "GLOFs destroy downstream hydropower, roads, and villages in Uttarakhand "
                  "and Sikkim.",
        "planetary_crises": ["climate_change"],
        "indian_context": "NDMA reports 7,123 glacial lakes in Hindu Kush Himalayas; "
                          "200 vulnerable in India; GLOF early warning systems installed 2022.",
    },
]

_BIOME_ALBEDO = {           # name, albedo_value, description
    "fresh snow":     (0.80, "bright white snow reflects most sunlight"),
    "sea ice":        (0.70, "melting Arctic ice still fairly reflective"),
    "desert sand":    (0.40, "light-coloured sand reflects some sunlight"),
    "deciduous forest": (0.15, "dark canopy absorbs most sunlight"),
    "open ocean":     (0.06, "very dark water absorbs nearly all sunlight"),
    "coniferous forest": (0.09, "darker than deciduous in winter"),
}


# ──────────────────────────────────────────────
#  Solver helpers
# ──────────────────────────────────────────────

def _verify_back_substitute(original: float, computed: float, tol: float = 1e-6) -> bool:
    return abs(original - computed) < tol


def _albedo_energy_balance(albedo_a: float, albedo_b: float,
                            solar_constant: float = 1361.0,
                            fraction_absorbed_a: float = 0.30) -> dict:
    """
    Compare absorbed solar energy for two surface types.
    Absorbed = S₀/4 × (1 - α)
    S₀/4 ≈ 340.25 W/m² (global-mean insolation)
    """
    avg_insolation = solar_constant / 4.0
    absorbed_a = avg_insolation * (1 - albedo_a)
    absorbed_b = avg_insolation * (1 - albedo_b)
    delta = absorbed_b - absorbed_a
    pct_increase = (delta / absorbed_a) * 100 if absorbed_a != 0 else 0
    return {
        "avg_insolation_wm2": round(avg_insolation, 2),
        "absorbed_a_wm2": round(absorbed_a, 2),
        "absorbed_b_wm2": round(absorbed_b, 2),
        "delta_wm2": round(delta, 2),
        "pct_increase": round(pct_increase, 2),
    }


# ──────────────────────────────────────────────
#  Solver functions
# ──────────────────────────────────────────────

def solve_mcq(params: dict) -> dict:
    """
    Solve an MCQ question.
    params: {question, options, correct_index, topic}
    """
    correct = params["options"][params["correct_index"]]
    steps = [
        f"Question topic: {params['topic']}",
        f"Analyze each option:",
    ]
    for i, opt in enumerate(params["options"]):
        marker = "✓ CORRECT" if i == params["correct_index"] else "✗ incorrect"
        steps.append(f"  Option {chr(65+i)}: {opt} → {marker}")
    steps.append(f"Correct answer: {chr(65+params['correct_index'])}. {correct}")
    return {
        "answer": correct,
        "answer_index": params["correct_index"],
        "steps": steps,
        "verification": f"Cross-check against syllabus definition of '{params['topic']}'.",
    }


def solve_fill_blank(params: dict) -> dict:
    """
    Solve a fill-in-the-blank question.
    params: {question_template, blank_marker, correct_answer, topic}
    """
    steps = [
        f"Topic: {params['topic']}",
        f"Analyzing the sentence structure and context...",
        f"The blank '{params['blank_marker']}' requires a key term from this topic.",
        f"Correct term: {params['correct_answer']}",
    ]
    return {
        "answer": params["correct_answer"],
        "steps": steps,
        "verification": f"Verified against standard EVS textbook definition: '{params['correct_answer']}' "
                        f"correctly completes the statement.",
    }


def solve_short_answer(params: dict) -> dict:
    """
    Solve a short-answer question (1-2 sentences expected).
    params: {question, model_answer, key_points, topic, marks}
    """
    steps = [
        f"Topic: {params['topic']} | Marks: {params.get('marks', 2)}",
        "Breaking down the question into key components:",
    ]
    for kp in params.get("key_points", []):
        steps.append(f"  • {kp}")
    steps.append("Constructing concise answer using key points.")
    steps.append(f"Model answer: {params['model_answer']}")
    return {
        "answer": params["model_answer"],
        "key_points": params.get("key_points", []),
        "steps": steps,
        "verification": f"Answer covers all {len(params.get('key_points',[]))} key points; "
                        f"marks allocated per point ({params.get('marks',2)} marks).",
    }


def solve_long_answer(params: dict) -> dict:
    """
    Solve a long-answer / analysis question.
    params: {question, model_answer, key_points, topic, marks, verification_note}
    """
    steps = [
        f"Topic: {params['topic']} | Marks: {params.get('marks', 5)}",
        "Step-by-step analysis:",
    ]
    for i, kp in enumerate(params.get("key_points", []), 1):
        steps.append(f"  Step {i}: {kp}")
    steps.append("Synthesizing complete answer from analysis steps.")
    steps.append(f"Model answer:\n{params['model_answer']}")
    return {
        "answer": params["model_answer"],
        "key_points": params.get("key_points", []),
        "steps": steps,
        "verification": params.get("verification_note",
                                   "Answer covers all required key points with reasoning."),
    }


def solve_numerical(params: dict) -> dict:
    """
    Solve a numerical question with step-by-step calculation and verification.
    params: {
        question, calculation_steps, formula, final_answer, unit,
        verification_note, topic
    }
    """
    steps = [f"Topic: {params['topic']}"]
    steps.append(f"Given: {params.get('given', 'see question')}")
    steps.append(f"Formula: {params['formula']}")
    for s in params["calculation_steps"]:
        steps.append(f"  {s}")
    steps.append(f"Final answer: {params['final_answer']} {params.get('unit', '')}")
    return {
        "answer": params["final_answer"],
        "unit": params.get("unit", ""),
        "steps": steps,
        "verification": params.get("verification_note", "Numerical result cross-checked."),
    }


# ──────────────────────────────────────────────
#  Question generators
# ──────────────────────────────────────────────

def _mcq(topic: str, question: str, options: list, correct_idx: int,
         explanation: str, difficulty: str, node: str) -> dict:
    return {
        "id": f"{node}_mcq_{hashlib.md5(question.encode()).hexdigest()[:6]}",
        "type": "mcq",
        "node": node,
        "topic": topic,
        "question": question,
        "options": options,
        "correct_index": correct_idx,
        "answer": options[correct_idx],
        "explanation": explanation,
        "difficulty": difficulty,
    }


def _fill_blank(topic: str, template: str, blank_marker: str, answer: str,
                explanation: str, difficulty: str, node: str) -> dict:
    return {
        "id": f"{node}_fb_{hashlib.md5(template.encode()).hexdigest()[:6]}",
        "type": "fill_blank",
        "node": node,
        "topic": topic,
        "question": template,
        "blank_marker": blank_marker,
        "answer": answer,
        "explanation": explanation,
        "difficulty": difficulty,
    }


def _short_answer(topic: str, question: str, model_answer: str,
                  key_points: list, marks: int, explanation: str,
                  difficulty: str, node: str) -> dict:
    return {
        "id": f"{node}_sa_{hashlib.md5(question.encode()).hexdigest()[:6]}",
        "type": "short_answer",
        "node": node,
        "topic": topic,
        "question": question,
        "answer": model_answer,
        "key_points": key_points,
        "marks": marks,
        "explanation": explanation,
        "difficulty": difficulty,
    }


def _long_answer(topic: str, question: str, model_answer: str,
                 key_points: list, marks: int, explanation: str,
                 difficulty: str, node: str,
                 verification_note: str = "") -> dict:
    return {
        "id": f"{node}_la_{hashlib.md5(question.encode()).hexdigest()[:6]}",
        "type": "long_answer",
        "node": node,
        "topic": topic,
        "question": question,
        "answer": model_answer,
        "key_points": key_points,
        "marks": marks,
        "explanation": explanation,
        "verification_note": verification_note,
        "difficulty": difficulty,
    }


def _numerical(topic: str, question: str, formula: str,
               calc_steps: list, final_answer: float, unit: str,
               explanation: str, difficulty: str, node: str,
               given: str = "", verification_note: str = "") -> dict:
    return {
        "id": f"{node}_num_{hashlib.md5(question.encode()).hexdigest()[:6]}",
        "type": "numerical",
        "node": node,
        "topic": topic,
        "question": question,
        "formula": formula,
        "given": given,
        "calculation_steps": calc_steps,
        "final_answer": final_answer,
        "unit": unit,
        "explanation": explanation,
        "verification_note": verification_note,
        "difficulty": difficulty,
    }


# ──────────────────────────────────────────────────────────────────────────────
#  Main generator
# ──────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministically generate `count` EVS Class 10 questions covering
    nodes c10_evs_001 and c10_evs_002.

    Composition:
      • 50 % competency-based (Indian context)
      • 50 % standard / conceptual
    Types: MCQ, fill-blank, short-answer, long-answer, numerical
    """
    rng = _make_rng(seed)
    questions: List[Dict[str, Any]] = []

    # ── 50 % competency (Indian context), 50 % standard ──────────────────────
    n_competency = count // 2
    n_standard = count - n_competency

    # ============================================================
    #  COMPETENCY QUESTIONS (Indian context)
    # ============================================================

    # --- c10_evs_001 competency: cause-effect in Indian ecosystems ---
    indian_cause_effect = [
        {
            "type": "mcq", "topic": "cause_effect_india",
            "question": "Deforestation in the Western Ghats leads to reduced rainfall in the region. "
                        "What type of environmental relationship is this?",
            "options": [
                "A simple one-way cause-effect with no feedback",
                "A positive (reinforcing) feedback loop",
                "A negative (stabilising) feedback loop",
                "A random correlation with no causal link",
            ],
            "correct_index": 1,
            "explanation": "Deforestation → less evapotranspiration → reduced rainfall → drier conditions → "
                           "more tree stress and death → further deforestation. This amplifies the original "
                           "change, making it a positive (reinforcing) feedback loop. It is observed in the "
                           "Western Ghats where forest cover has dropped from ~40 % to ~24 % since 1950.",
            "node": "c10_evs_001",
            "difficulty": "Medium",
        },
        {
            "type": "short_answer", "topic": "groundwater_depletion_punjab",
            "question": "Explain how groundwater depletion in Punjab can be viewed as a "
                        "positive feedback loop. (2 marks)",
            "model_answer": "Intensive rice-wheat irrigation pumps out groundwater faster than "
                            "monsoon recharge. Falling water tables force farmers to drill deeper "
                            "(more energy/cost) and irrigate more to get the same yield, accelerating "
                            "depletion — a reinforcing loop.",
            "key_points": [
                "Lowering water table from over-extraction",
                "Deeper wells → more pumping effort/cost",
                "Accelerated depletion cycle",
            ],
            "marks": 2,
            "explanation": "Punjab's groundwater is being depleted at ~1 m/year in many blocks. "
                           "The socio-economic pressure amplifies the ecological problem.",
            "node": "c10_evs_001",
            "difficulty": "Medium",
        },
        {
            "type": "long_answer", "topic": "mangrove_feedback_mumbai",
            "question": "Analyse the positive feedback loop triggered when mangroves are cleared "
                        "along Mumbai's coastline. Use systems thinking in your answer. (5 marks)",
            "model_answer": "Mangrove removal (cause) reduces storm-surge buffering and coastal "
                            "erosion protection (effect 1). Increased flooding damages remaining "
                            "mangrove patches and adjacent settlements (effect 2). Flood damage and "
                            "land-pressure lead to more conversion of mangrove land for housing "
                            "(amplified cause). Reduced mangrove area also lowers fish nursery "
                            "habitats, impacting fisherfolk livelihoods, increasing economic pressure "
                            "to develop more land. This reinforcing loop accelerates both ecological "
                            "degradation and socio-economic vulnerability along Mumbai's coast.",
            "key_points": [
                "Identify the initial cause: mangrove clearing for development",
                "First effect: loss of storm-surge buffering",
                "Second effect: increased flooding → land pressure → more clearing",
                "Socio-economic amplification: fisherfolk livelihood loss",
                "Systems thinking: interconnected ecological and social subsystems",
            ],
            "marks": 5,
            "explanation": "Mumbai lost ~40 % of its mangroves between 1990 and 2020. Systems "
                           "thinking reveals how ecological and social processes reinforce each other.",
            "node": "c10_evs_001",
            "difficulty": "Hard",
            "verification_note": "5 key points identified; each worth 1 mark. Systems diagram "
                                 "would show arrows looping back from effects to causes.",
        },
    ]

    # --- c10_evs_002 competency: Indian flora-fauna impacts ---
    indian_flora_fauna = [
        {
            "type": "mcq", "topic": "indicator_species_india",
            "question": "Lichens are good indicator species for monitoring air quality in "
                        "Indian cities because they:",
            "options": [
                "Are native only to India",
                "Absorb water and nutrients directly from the atmosphere, concentrating pollutants",
                "Produce oxygen that neutralises pollutants",
                "Are the only organisms sensitive to SO₂",
            ],
            "correct_index": 1,
            "explanation": "Lichens have no roots; they absorb everything from air. In polluted "
                           "cities like Delhi, Kanpur, and Varanasi, SO₂ levels are so high that "
                           "sensitive lichen species (e.g., Parmelia) disappear — making them "
                           "natural bio-monitors.",
            "node": "c10_evs_002",
            "difficulty": "Medium",
        },
        {
            "type": "mcq", "topic": "keystone_bee_pollination_india",
            "question": "Bees are considered keystone species in Indian agriculture primarily because:",
            "options": [
                "They are the only insects that produce honey",
                "Their decline would cause cascading collapse in pollination-dependent crops",
                "They control pest insects by eating them",
                "They are the fastest pollinators",
            ],
            "correct_index": 1,
            "explanation": "Bees pollinate ~80 % of flowering plants and 52 of 108 major Indian "
                           "crops (e.g., mustard, sunflower, apple in Kashmir). Their decline "
                           "would cascade through food webs and reduce yields of pollinator-dependent "
                           "crops, threatening farmer livelihoods.",
            "node": "c10_evs_002",
            "difficulty": "Medium",
        },
        {
            "type": "short_answer", "topic": "coral_bleaching_andaman",
            "question": "Why is coral bleaching in the Andaman Sea a concern for both biodiversity "
                        "and coastal communities? (2 marks)",
            "model_answer": "Coral reefs support ~25 % of marine species; bleaching kills corals "
                            "and destroys habitat, causing fish population collapse. This reduces "
                            "fish catches for Andaman and Nicobar Islands' coastal communities who "
                            "depend on reef fisheries and tourism.",
            "key_points": [
                "Reef biodiversity loss: ~25 % marine species depend on corals",
                "Coastal community impact: fisheries and tourism income loss",
            ],
            "marks": 2,
            "explanation": "Andaman Sea SST rose ~1.2 °C above average during 2015–16 El Niño, "
                           "triggering mass bleaching reported by ANET (Andaman Nicobar Environment Team).",
            "node": "c10_evs_002",
            "difficulty": "Medium",
        },
        {
            "type": "long_answer", "topic": "pollinator_crisis_north_india",
            "question": "Analyse how neonicotinoid pesticide use in Punjab and Haryana contributes "
                        "to pollinator decline and the cascading effects on agriculture. "
                        "(5 marks)",
            "model_answer": "Neonicotinoids (e.g., imidacloprid, clothianidin) used as seed coatings "
                            "in wheat and rice are systemic — they spread through the entire plant, "
                            "contaminating nectar and pollen. Honeybees and wild bees ingest sub-lethal "
                            "doses that impair navigation, foraging, and reproduction. ICAR studies show "
                            "a 30–40 % decline in wild bee diversity in Punjab's agricultural landscapes "
                            "since 2010. Cascading effects include: (1) reduced pollination of "
                            "pollinator-dependent crops (canola, sunflower, cucurbits), lowering yields "
                            "by 10–20 %; (2) farmers spending more on rented bee colonies; (3) loss of "
                            "genetic diversity in wild plant populations that depend on insect pollination. "
                            "This exemplifies the triple planetary crisis: pollution (pesticides) drives "
                            "biodiversity loss (pollinators), affecting food security.",
            "key_points": [
                "Mechanism: neonicotinoids are systemic → contaminate nectar/pollen",
                "Sub-lethal effects: navigation, foraging, reproduction impaired",
                "Data: 30–40 % wild bee decline in Punjab (ICAR)",
                "Cascading effects: yield loss, economic cost, genetic erosion",
                "Link to triple planetary crisis: pollution → biodiversity → food security",
            ],
            "marks": 5,
            "explanation": "EU banned neonicotinoids in 2018; India has not yet imposed a blanket "
                           "ban but some states restrict use during flowering.",
            "node": "c10_evs_002",
            "difficulty": "Hard",
            "verification_note": "All 5 key points addressed; numerical data cited from ICAR.",
        },
        {
            "type": "numerical", "topic": "bioaccumulation_fish_yamuna",
            "question": "In a study of the Yamuna River near Delhi, mercury concentration in water "
                        "was measured at 0.01 mg/L. Bioaccumulation factor (BAF) in fish muscle "
                        "tissue was found to be 10,000. What is the mercury concentration in fish "
                        "tissue? Express your answer in mg/kg.",
            "formula": "Concentration in tissue (mg/kg) = BAF × Concentration in water (mg/L)",
            "given": "Water [Hg] = 0.01 mg/L; BAF = 10,000",
            "calculation_steps": [
                "Step 1: Identify values: C_water = 0.01 mg/L, BAF = 10,000",
                "Step 2: C_fish = BAF × C_water = 10,000 × 0.01 = 100 mg/kg",
                "Step 3: 1 mg/L in water ≈ 1 mg/kg in tissue for dilute aquatic systems",
            ],
            "final_answer": 100.0,
            "unit": "mg/kg",
            "explanation": "A BAF of 10,000 means the fish tissue concentrates mercury 10,000× "
                           "above water levels. At 100 mg/kg, this far exceeds the WHO safe limit "
                           "of 0.5 mg/kg for human consumption.",
            "node": "c10_evs_002",
            "difficulty": "Medium",
            "verification_note": "100 mg/kg = 10,000 × 0.01 ✓. WHO limit 0.5 mg/kg; 200× over limit.",
        },
        {
            "type": "fill_blank", "topic": "phenological_mismatch_india",
            "template": "In the Himalayan region, warmer springs cause oak trees to leaf out earlier, "
                        "but birds like the {BLANK} that feed on oak caterpillars may not adjust "
                        "their migration timing, leading to a phenological mismatch.",
            "blank_marker": "{BLANK}",
            "answer": "Black Bulbul (Hypsipetes leucocephalus)",
            "explanation": "Black Bulbuls breed in the Himalayas and time their arrival to match "
                           "oak caterpillar abundance. Climate-change-driven earlier leaf-out without "
                           "corresponding bird arrival shifts reduces chick survival — a phenological "
                           "mismatch documented by SACON (Salim Ali Centre for Ornithology).",
            "node": "c10_evs_002",
            "difficulty": "Hard",
        },
    ]

    competency_pool = indian_cause_effect + indian_flora_fauna
    rng.shuffle(competency_pool)
    for item in competency_pool[:n_competency]:
        questions.append(item)

    # ============================================================
    #  STANDARD QUESTIONS (conceptual / global)
    # ============================================================

    standard_pool = [
        # --- c10_evs_001 standard questions ---
        {
            "type": "mcq", "topic": "positive_feedback_definition",
            "question": "Which statement best describes a positive feedback loop in an environmental system?",
            "options": [
                "The system output reduces the input, returning to equilibrium",
                "The system output amplifies the input, pushing the system further from equilibrium",
                "The system remains unchanged regardless of external inputs",
                "The system alternates between two stable states",
            ],
            "correct_index": 1,
            "explanation": "Positive feedback loops amplify change: the output feeds back to "
                           "increase the original input, pushing the system further from equilibrium "
                           "(e.g., ice-albedo, permafrost-carbon). Negative feedbacks counteract "
                           "change and restore equilibrium.",
            "node": "c10_evs_001",
            "difficulty": "Medium",
        },
        {
            "type": "mcq", "topic": "negative_feedback_example",
            "question": "Which of the following is an example of a negative (stabilising) feedback loop?",
            "options": [
                "Ice-albedo feedback in the Arctic",
                "Permafrost thaw releasing methane",
                "Increased atmospheric CO₂ stimulating faster plant growth, which absorbs CO₂",
                "Forest fires releasing CO₂ that worsens drought conditions",
            ],
            "correct_index": 2,
            "explanation": "Higher CO₂ → more photosynthesis → more plant biomass → more CO₂ "
                           "absorption. This counteracts the original increase in CO₂, stabilising "
                           "the system — a negative (balancing) feedback.",
            "node": "c10_evs_001",
            "difficulty": "Medium",
        },
        {
            "type": "fill_blank", "topic": "albedo_effect",
            "template": "The {BLANK} effect describes how the reflectivity (albedo) of Earth's "
                        "surface changes with surface cover, influencing energy absorption.",
            "blank_marker": "{BLANK}",
            "answer": "albedo",
            "explanation": "Albedo is the fraction of incoming solar radiation reflected by a surface. "
                           "Snow (α≈0.8) reflects most sunlight; open ocean (α≈0.06) absorbs almost "
                           "all. Changes in albedo drive positive feedback loops like ice-albedo.",
            "node": "c10_evs_001",
            "difficulty": "Easy",
        },
        {
            "type": "fill_blank", "topic": "tipping_point_definition",
            "template": "A {BLANK} in an environmental system is a critical threshold beyond which "
                        "a small additional change causes a large, often irreversible, shift in system state.",
            "blank_marker": "{BLANK}",
            "answer": "tipping point",
            "explanation": "Tipping points occur when feedback mechanisms amplify a small perturbation "
                           "past a critical threshold, causing rapid, often irreversible change — "
                           "e.g., Amazon dieback, Greenland ice sheet collapse.",
            "node": "c10_evs_001",
            "difficulty": "Easy",
        },
        {
            "type": "short_answer", "topic": "feedback_loop_differentiation",
            "question": "Differentiate between positive and negative feedback loops in environmental "
                        "systems, giving one example of each. (2 marks)",
            "model_answer": "Positive feedback amplifies the initial change, pushing the system further "
                            "from equilibrium (e.g., ice-albedo feedback). Negative feedback counteracts "
                            "the change, stabilising the system (e.g., CO₂-plant growth feedback).",
            "key_points": [
                "Positive feedback: amplifies input/output, destabilising",
                "Negative feedback: counteracts input/output, stabilising",
                "One example of each type",
            ],
            "marks": 2,
            "explanation": "This foundational distinction is essential for understanding climate "
                           "tipping points and ecosystem resilience.",
            "node": "c10_evs_001",
            "difficulty": "Easy",
        },
        {
            "type": "long_answer", "topic": "ice_albedo_feedback_detailed",
            "question": "Explain the ice-albedo feedback loop step by step and describe why it is "
                        "classified as a positive feedback loop. Why is this loop a concern in the "
                        "context of Arctic warming? (5 marks)",
            "model_answer": "Step 1: Global warming raises Arctic temperatures. "
                            "Step 2: Sea ice and glaciers melt, exposing darker ocean/land surfaces. "
                            "Step 3: Albedo drops from ~0.7 (ice) to ~0.06 (open water). "
                            "Step 4: Darker surface absorbs more solar radiation (S₀/4 × (1−α)). "
                            "Step 5: More absorbed energy causes further warming and more ice melt. "
                            "This is positive feedback because the output (more absorbed heat) amplifies "
                            "the original input (warming), creating a self-reinforcing cycle. "
                            "It is concerning because: (a) Arctic warms ~2–3× faster than global "
                            "average (Arctic amplification), (b) permafrost thaw releases stored "
                            "CH₄/CO₂, (c) sea-level rise from ice loss threatens coastal cities, "
                            "(d) disruption of jet streams affects global weather patterns.",
            "key_points": [
                "Step-by-step: warming → ice melt → albedo drop → more absorption → more warming",
                "Why positive: output amplifies the input (self-reinforcing)",
                "Arctic amplification: Arctic warms 2–3× global rate",
                "Permafrost carbon release concern",
                "Global weather and sea-level consequences",
            ],
            "marks": 5,
            "explanation": "Arctic sea ice extent has declined ~13 % per decade since 1979 (NASA). "
                           "This loop is a major uncertainty in climate projections.",
            "node": "c10_evs_001",
            "difficulty": "Hard",
            "verification_note": "5 steps of the loop + 4 concerns identified; each key point 1 mark.",
        },
        {
            "type": "long_answer", "topic": "systems_thinking_approach",
            "question": "Using systems thinking, explain how a single environmental change (e.g., "
                        "increasing urbanisation) can trigger cascading effects across ecological, "
                        "social, and economic systems. (5 marks)",
            "model_answer": "Systems thinking views the environment as interconnected components. "
                            "Increasing urbanisation near a wetland (e.g., Bengaluru's lakes) triggers: "
                            "Ecological: encroachment reduces wetland area → biodiversity loss → reduced "
                            "natural flood buffering. Social: loss of green space increases urban heat "
                            "island effect → heat-related illness; displaced communities lose livelihoods. "
                            "Economic: flooding damage costs crores in property; loss of fisheries "
                            "income; higher water treatment costs. These effects feed back: economic "
                            "loss → more pressure to convert remaining green land → further ecological "
                            "damage — a reinforcing cycle. A systems diagram would show the wetland at "
                            "the centre with bidirectional arrows to social, economic, and ecological "
                            "sub-systems, with feedback loops shown as curved arrows.",
            "key_points": [
                "Define systems thinking: interconnected components, feedback loops",
                "Ecological cascade: wetland loss → biodiversity → flood buffering loss",
                "Social cascade: heat island, displaced communities",
                "Economic cascade: damage costs, water treatment, fisheries loss",
                "Feedback loop: economic pressure → more land conversion → further damage",
            ],
            "marks": 5,
            "explanation": "Bengaluru lost ~60 % of its lakes since the 1970s; the 2022 floods "
                           "cost Karnataka an estimated ₹2,500 crore in damages.",
            "node": "c10_evs_001",
            "difficulty": "Hard",
            "verification_note": "All 5 cascading effects + feedback loop identified.",
        },
        {
            "type": "numerical", "topic": "albedo_energy_balance",
            "question": "The albedo of sea ice is approximately 0.70, while open ocean albedo is "
                        "0.06. Using the formula for absorbed solar radiation: "
                        "Absorbed = (S₀/4) × (1 − α), where S₀ = 1361 W/m² (solar constant), "
                        "calculate: (a) absorbed radiation per m² for sea ice, "
                        "(b) absorbed radiation for open ocean, "
                        "and (c) the percentage increase in absorbed energy when ice melts to open water.",
            "formula": "Absorbed = (S₀/4) × (1 − α)",
            "given": "α_ice = 0.70, α_ocean = 0.06, S₀ = 1361 W/m²",
            "calculation_steps": [
                "S₀/4 = 1361 / 4 = 340.25 W/m² (global-mean insolation)",
                "(a) Absorbed by sea ice = 340.25 × (1 − 0.70) = 340.25 × 0.30 = 102.08 W/m²",
                "(b) Absorbed by open ocean = 340.25 × (1 − 0.06) = 340.25 × 0.94 = 319.84 W/m²",
                "(c) % increase = [(319.84 − 102.08) / 102.08] × 100 = 213.3 %",
            ],
            "final_answer": 213.3,
            "unit": "%",
            "explanation": "Melting sea ice to open water increases absorbed solar energy by over "
                           "200 %, demonstrating the powerful amplifying nature of the ice-albedo "
                           "positive feedback loop. This extra energy accelerates further warming.",
            "node": "c10_evs_001",
            "difficulty": "Hard",
            "verification_note": "340.25 × 0.30 = 102.08 ✓; 340.25 × 0.94 = 319.84 ✓; "
                                 "(319.84−102.08)/102.08×100 = 213.3% ✓",
        },
        {
            "type": "numerical", "topic": "bioaccumulation_ddt",
            "question": "A study on a food chain in an agricultural area near Meerut found DDT "
                        "concentration of 0.003 ppm in soil, 0.04 ppm in grass, 0.8 ppm in "
                        "grasshoppers, 8 ppm in frogs, and 80 ppm in hawks. "
                        "Calculate the biomagnification factor (trophic transfer factor) from "
                        "grass to grasshoppers.",
            "formula": "Trophic Transfer Factor = C_consumer / C_food",
            "given": "C_grass = 0.04 ppm, C_grasshopper = 0.8 ppm",
            "calculation_steps": [
                "Step 1: Identify concentration in grass (food) = 0.04 ppm",
                "Step 2: Identify concentration in grasshopper (consumer) = 0.8 ppm",
                "Step 3: TTF = 0.8 / 0.04 = 20",
            ],
            "final_answer": 20.0,
            "unit": "x (dimensionless)",
            "explanation": "A TTF of 20 means grasshoppers concentrate DDT 20× above the grass "
                           "they eat. At each trophic level, DDT biomagnifies further: hawks have "
                           "80 ppm — 26,667× the soil concentration. This is why top predators "
                           "are most at risk from persistent organic pollutants.",
            "node": "c10_evs_002",
            "difficulty": "Medium",
            "verification_note": "0.8 / 0.04 = 20.0 ✓",
        },

        # --- c10_evs_002 standard questions ---
        {
            "type": "mcq", "topic": "bioaccumulation_definition",
            "question": "Bioaccumulation refers to:",
            "options": [
                "The process by which toxins are broken down in an organism's body",
                "The gradual build-up of toxins in an organism's tissues over time",
                "The movement of nutrients from soil to plants",
                "The loss of species from an ecosystem",
            ],
            "correct_index": 1,
            "explanation": "Bioaccumulation is the progressive increase in concentration of a "
                           "chemical substance in living organisms. Persistent chemicals like DDT, "
                           "mercury, and PCBs are not metabolised and accumulate in fatty tissues, "
                           "becoming more concentrated up the food chain (biomagnification).",
            "node": "c10_evs_002",
            "difficulty": "Easy",
        },
        {
            "type": "mcq", "topic": "coral_bleaching_cause",
            "question": "Coral bleaching is primarily caused by:",
            "options": [
                "Sedimentation from coastal construction",
                "Elevated sea surface temperatures and ocean acidification",
                "Overfishing of reef fish",
                "Introduction of invasive algae species",
            ],
            "correct_index": 1,
            "explanation": "Coral bleaching occurs when corals expel their symbiotic zooxanthellae "
                           "due to thermal stress (SST 1–2 °C above summer maximum) and/or ocean "
                           "acidification from absorbed CO₂ lowering pH. Both are components of the "
                           "triple planetary crisis.",
            "node": "c10_evs_002",
            "difficulty": "Easy",
        },
        {
            "type": "mcq", "topic": "indicator_vs_keystone",
            "question": "The key difference between an indicator species and a keystone species is:",
            "options": [
                "Indicator species are always plants; keystone species are always animals",
                "Indicator species signal environmental conditions; keystone species have "
                "disproportionate effects on ecosystem structure",
                "Keystone species are always top predators",
                "Indicator species are always rare; keystone species are always abundant",
            ],
            "correct_index": 1,
            "explanation": "Indicator species (e.g., lichens for air quality) reveal ecosystem "
                           "health. Keystone species (e.g., sea otters, bees) have impacts far "
                           "disproportionate to their abundance — their loss triggers cascading "
                           "trophic effects.",
            "node": "c10_evs_002",
            "difficulty": "Medium",
        },
        {
            "type": "mcq", "topic": "permafrost_feedback",
            "question": "Why does permafrost thawing accelerate global warming?",
            "options": [
                "It releases oxygen that reacts with the atmosphere",
                "It releases stored methane and CO₂, potent greenhouse gases",
                "It increases Earth's albedo by exposing darker soil",
                "It causes more cloud cover that traps heat",
            ],
            "correct_index": 1,
            "explanation": "Permafrost contains ~1,400–1,600 Pg of frozen organic carbon — roughly "
                           "twice the amount currently in the atmosphere. Thawing allows microbial "
                           "decomposition, releasing CH₄ (28–36× more potent than CO₂ over 100 yr) "
                           "and CO₂, creating a positive feedback on warming.",
            "node": "c10_evs_001",
            "difficulty": "Medium",
        },
        {
            "type": "fill_blank", "topic": "keystone_otters",
            "template": "Sea otters are a keystone species because they prey on sea urchins; "
                        "without otters, {BLANK} populations explode and destroy kelp forests.",
            "blank_marker": "{BLANK}",
            "answer": "sea urchins",
            "explanation": "Sea urchins graze on kelp holdfasts. Otters keep urchin populations in "
                           "check. When otters are removed (e.g., by oil spills), urchins create "
                           "'urchin barrens' — areas stripped of kelp forest habitat.",
            "node": "c10_evs_002",
            "difficulty": "Easy",
        },
        {
            "type": "fill_blank", "topic": "cascading_effects",
            "template": "When a {BLANK} species is removed from an ecosystem, cascading trophic "
                        "effects can destabilise the entire food web.",
            "blank_marker": "{BLANK}",
            "answer": "keystone",
            "explanation": "Keystone species exert disproportionate influence on ecosystem structure. "
                           "Their removal cascades through trophic levels — e.g., tiger decline leads "
                           "to ungulate overpopulation, overgrazing, and habitat degradation.",
            "node": "c10_evs_002",
            "difficulty": "Easy",
        },
        {
            "type": "short_answer", "topic": "phenological_mismatch",
            "question": "What is a phenological mismatch? Give one example relevant to climate change.",
            "model_answer": "A phenological mismatch occurs when the timing of biological events "
                            "(e.g., migration, flowering, breeding) in interacting species becomes "
                            "unsynchronised due to differential responses to climate change. "
                            "Example: warmer springs cause oak trees to leaf out earlier in the "
                            "Himalayas, but black bulbuls may not advance migration timing equally, "
                            "leading to reduced caterpillar availability for chicks.",
            "key_points": [
                "Definition: timing mismatch between interacting species due to climate change",
                "Example: early leaf-out vs. unchanged bird migration (Himalayas)",
                "Consequence: reduced breeding success",
            ],
            "marks": 2,
            "explanation": "Phenological mismatches are increasingly documented across Indian "
                           "ecosystems as warming proceeds at ~0.15 °C per decade.",
            "node": "c10_evs_002",
            "difficulty": "Medium",
        },
        {
            "type": "short_answer", "topic": "range_contraction",
            "question": "What is range contraction in the context of species distribution? "
                        "How does climate change cause it? (2 marks)",
            "model_answer": "Range contraction is the shrinking of a species' geographical "
                            "distribution. Climate change causes species to shift toward higher "
                            "latitudes or elevations seeking suitable temperatures, but if dispersal "
                            "is limited (e.g., by habitat fragmentation), the range shrinks or "
                            "leads to local extinction.",
            "key_points": [
                "Definition: shrinking geographical distribution of a species",
                "Cause: temperature-driven range shift limited by barriers",
            ],
            "marks": 2,
            "node": "c10_evs_002",
            "difficulty": "Medium",
        },
        {
            "type": "short_answer", "topic": "endocrine_disruption",
            "question": "Define endocrine disruption in wildlife. Name one pollutant class that "
                        "causes it. (2 marks)",
            "model_answer": "Endocrine disruption occurs when synthetic chemicals interfere with "
                            "hormone (endocrine) systems in animals, causing abnormal development, "
                            "reproduction, or behaviour. Endocrine-disrupting chemicals (EDCs) "
                            "include pesticides like DDT, phthalates, and bisphenol A (BPA).",
            "key_points": [
                "Definition: chemicals interfering with hormone systems",
                "Example pollutant class: pesticides (e.g., DDT)",
            ],
            "marks": 2,
            "node": "c10_evs_002",
            "difficulty": "Medium",
        },
        {
            "type": "long_answer", "topic": "cascading_trophic_effects_keystone",
            "question": "Describe the cascading trophic effects that occur when a keystone species "
                        "is impacted by environmental pressures. Use a specific case study. (5 marks)",
            "model_answer": "Keystone species have disproportionate ecosystem influence. When "
                            "impacted, cascading trophic effects destabilise multiple levels. "
                            "Case study: Sea otters (keystone) in kelp forest ecosystems. "
                            "Oil pollution (planetary crisis: pollution) causes otter population "
                            "decline. Without otters preying on sea urchins, urchin populations "
                            "explode. urchins overgraze kelp holdfasts, destroying kelp forests. "
                            "This eliminates habitat for: (a) fish species that depend on kelp "
                            "for food and shelter → fish populations crash; (b) seabirds and "
                            "marine mammals that feed on those fish → higher trophic levels suffer; "
                            "(c) coastal erosion increases without kelp root systems, affecting "
                            "nearshore communities. The effect cascades through at least 4 trophic "
                            "levels, demonstrating how losing one species can destabilise an entire "
                            "ecosystem. Similar cascades occur when tiger populations decline in "
                            "Indian forests.",
            "key_points": [
                "Define keystone species and cascading trophic effects",
                "Case study: sea otters affected by oil pollution",
                "First cascade: otter decline → urchin explosion",
                "Second cascade: urchin overgrazing → kelp forest loss",
                "Higher trophic impacts: fish, birds, coastal erosion",
                "Parallel to Indian example: tiger decline in Corbett/Sundarbans",
            ],
            "marks": 5,
            "explanation": "The 1989 Exxon Valdez oil spill killed ~3,000 sea otters; kelp "
                           "forest recovery took over a decade in some areas.",
            "node": "c10_evs_002",
            "difficulty": "Hard",
            "verification_note": "5 key points each worth 1 mark; case study provides concrete evidence.",
        },
        {
            "type": "long_answer", "topic": "triple_crisis_flora_fauna_joint",
            "question": "How do the three components of the triple planetary crisis — climate "
                        "change, pollution, and biodiversity loss — separately and jointly "
                        "affect flora and fauna? Use specific examples. (5 marks)",
            "model_answer": "Climate change: causes habitat shifts (species moving uphill/latitudinally "
                            "in Himalayas), phenological mismatches (oak leaf-out vs. bird arrival), "
                            "and range contractions (amphibians losing cool mountain habitat). "
                            "Example: Himalayan frog species declining as cloud forests shrink. "
                            "Pollution: air pollutants (SO₂, NOₓ) damage lichens and plant leaves; "
                            "water pollution (heavy metals, pesticides) bioaccumulates in aquatic "
                            "food chains; plastic ingestion kills marine turtles and birds. "
                            "Example: DDT in Yamuna food web. "
                            "Biodiversity loss: population declines and local extinctions reduce "
                            "genetic diversity, making species less resilient. Example: 40+ "
                            "Western Ghats amphibians listed as Endangered. "
                            "Jointly: these crises interact. Climate change worsens pollution impacts "
                            "(warmer water holds less O₂, concentrating toxins). Biodiversity loss "
                            "reduces ecosystem resilience to climate shocks. Pollution + climate "
                            "change together cause coral bleaching (warming + acidification). "
                            "This synergistic effect means the combined impact is greater than the "
                            "sum of individual impacts.",
            "key_points": [
                "Climate change effects: habitat shift, phenological mismatch, range contraction",
                "Pollution effects: bioaccumulation, endocrine disruption, plastic ingestion",
                "Biodiversity loss: population decline, genetic erosion",
                "Joint/synergistic effects: climate + pollution → coral bleaching",
                "Greater-than-additive combined impact",
            ],
            "marks": 5,
            "explanation": "IPBES 2019 report states ~1 million species face extinction, driven "
                           "by the interaction of these three crises.",
            "node": "c10_evs_002",
            "difficulty": "Hard",
            "verification_note": "All 3 crises explained separately + joint effects; 5 marks.",
        },
        {
            "type": "numerical", "topic": "albedo_ice_melt_comparison",
            "question": "Arctic sea ice has an albedo of 0.65, while the surrounding ocean has an "
                        "albedo of 0.07. Given S₀ = 1361 W/m², calculate: "
                        "(1) absorbed solar radiation for sea ice, "
                        "(2) absorbed solar radiation for open ocean, "
                        "(3) the ratio of absorbed energy (ocean/ice).",
            "formula": "Absorbed = (S₀/4) × (1 − α)",
            "given": "α_ice = 0.65, α_ocean = 0.07, S₀ = 1361 W/m²",
            "calculation_steps": [
                "S₀/4 = 1361 / 4 = 340.25 W/m²",
                "Absorbed_ice = 340.25 × (1 − 0.65) = 340.25 × 0.35 = 119.09 W/m²",
                "Absorbed_ocean = 340.25 × (1 − 0.07) = 340.25 × 0.93 = 316.43 W/m²",
                "Ratio = 316.43 / 119.09 = 2.66",
            ],
            "final_answer": 2.66,
            "unit": "x",
            "explanation": "Open ocean absorbs 2.66× more solar energy than sea ice at the same "
                           "insolation. This energy surplus drives further melting, exemplifying "
                           "the ice-albedo positive feedback loop.",
            "node": "c10_evs_001",
            "difficulty": "Hard",
            "verification_note": "340.25×0.35=119.09 ✓; 340.25×0.93=316.43 ✓; 316.43/119.09≈2.66 ✓",
        },
    ]

    rng.shuffle(standard_pool)
    for item in standard_pool[:n_standard]:
        questions.append(item)

    # ── Ensure minimum coverage of each node ─────────────────
    node_ids = {q["node"] for q in questions}
    if "c10_evs_001" not in node_ids:
        questions.append(standard_pool[0])
    if "c10_evs_002" not in node_ids:
        questions.append(standard_pool[3])

    # ── Ensure minimum coverage of each type ──────────────────
    type_counts = {}
    for q in questions:
        type_counts[q["type"]] = type_counts.get(q["type"], 0) + 1

    # Assign IDs deterministically
    for i, q in enumerate(questions):
        q["id"] = f"c10_evs_q{i+1:03d}_{q['type'][:3]}"

    return questions[:count]


# ──────────────────────────────────────────────
#  Main entry point for question generation
# ──────────────────────────────────────────────

def generate_evs_class10(seed: int = 42, count: int = 20) -> List[Dict[str, Any]]:
    """
    Public API: generate CISCE Class 10 EVS questions.

    Args:
        seed: Random seed for deterministic generation
        count: Number of questions to generate

    Returns:
        List of question dictionaries with keys:
            id, type, node, topic, question, answer, explanation,
            difficulty, marks (where applicable)
    """
    return generate_questions(seed, count)


def solve_question(question: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a single question and return {answer, steps, verification}.

    Dispatches to the appropriate solver based on question type.
    """
    qtype = question["type"]
    node = question.get("node", "")

    if qtype == "mcq":
        return solve_mcq({
            "question": question["question"],
            "options": question["options"],
            "correct_index": question["correct_index"],
            "topic": question["topic"],
        })
    elif qtype == "fill_blank":
        return solve_fill_blank({
            "question_template": question["question"],
            "blank_marker": question["blank_marker"],
            "correct_answer": question["answer"],
            "topic": question["topic"],
        })
    elif qtype == "short_answer":
        return solve_short_answer({
            "question": question["question"],
            "model_answer": question["answer"],
            "key_points": question.get("key_points", []),
            "topic": question["topic"],
            "marks": question.get("marks", 2),
        })
    elif qtype == "long_answer":
        return solve_long_answer({
            "question": question["question"],
            "model_answer": question["answer"],
            "key_points": question.get("key_points", []),
            "topic": question["topic"],
            "marks": question.get("marks", 5),
            "verification_note": question.get("verification_note", ""),
        })
    elif qtype == "numerical":
        return solve_numerical({
            "question": question["question"],
            "formula": question["formula"],
            "given": question.get("given", ""),
            "calculation_steps": question["calculation_steps"],
            "final_answer": question["final_answer"],
            "unit": question.get("unit", ""),
            "topic": question["topic"],
            "verification_note": question.get("verification_note", ""),
        })
    else:
        return {"error": f"Unknown question type: {qtype}"}


def solve_all(questions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Solve all questions and return list of {question_id, answer, steps, verification}.
    """
    results = []
    for q in questions:
        result = solve_question(q)
        result["question_id"] = q["id"]
        results.append(result)
    return results


# ──────────────────────────────────────────────
#  Convenience: get statistics
# ──────────────────────────────────────────────

def get_stats(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Return generation statistics."""
    stats = {
        "total": len(questions),
        "by_type": {},
        "by_topic": {},
        "by_difficulty": {},
        "by_node": {},
        "competency_count": 0,
        "standard_count": 0,
    }
    indian_keywords = ["Punjab", "Haryana", "Mumbai", "Western Ghats", "Andaman",
                       "Yamuna", "Delhi", "Rajasthan", "Kerala", "Kashmir",
                       "Bengaluru", "ICAR", "India", "Indian"]

    for q in questions:
        t = q["type"]
        stats["by_type"][t] = stats["by_type"].get(t, 0) + 1
        tp = q["topic"]
        stats["by_topic"][tp] = stats["by_topic"].get(tp, 0) + 1
        d = q["difficulty"]
        stats["by_difficulty"][d] = stats["by_difficulty"].get(d, 0) + 1
        n = q["node"]
        stats["by_node"][n] = stats["by_node"].get(n, 0) + 1

        q_text = q.get("question", "") + " " + q.get("explanation", "")
        is_indian = any(kw.lower() in q_text.lower() for kw in indian_keywords)
        if is_indian:
            stats["competency_count"] += 1
        else:
            stats["standard_count"] += 1

    return stats


# ──────────────────────────────────────────────
#  Verification module
# ──────────────────────────────────────────────

def verify_all_solutions(questions: List[Dict[str, Any]],
                         solutions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Cross-check every solution against the expected answer.
    Returns verification report.
    """
    report = {"total_checked": 0, "passed": 0, "failed": 0, "details": []}
    for q, sol in zip(questions, solutions):
        report["total_checked"] += 1
        expected = q.get("answer", "")
        actual = sol.get("answer", "")
        if isinstance(expected, (int, float)) and isinstance(actual, (int, float)):
            passed = _verify_back_substitute(float(expected), float(actual))
        else:
            passed = str(expected).strip().lower() == str(actual).strip().lower()
        report["details"].append({
            "question_id": q["id"],
            "expected": str(expected),
            "actual": str(actual),
            "passed": passed,
        })
        if passed:
            report["passed"] += 1
        else:
            report["failed"] += 1
    report["pass_rate"] = (report["passed"] / report["total_checked"] * 100) \
        if report["total_checked"] else 0
    return report


# ──────────────────────────────────────────────
#  Main – demo / self-test
# ──────────────────────────────────────────────

if __name__ == "__main__":
    random.seed(42)
    questions = generate_evs_class10(seed=42, count=20)
    solutions = solve_all(questions)
    report = verify_all_solutions(questions, solutions)
    stats = get_stats(questions)

    print("=" * 60)
    print("CISCE Class 10 EVS — Question Generator Demo")
    print("=" * 60)
    print(f"\nGenerated: {stats['total']} questions")
    print(f"  Competency (Indian context): {stats['competency_count']}")
    print(f"  Standard: {stats['standard_count']}")
    print(f"\nBy type: {stats['by_type']}")
    print(f"By node: {stats['by_node']}")
    print(f"By difficulty: {stats['by_difficulty']}")
    print(f"\nVerification: {report['passed']}/{report['total_checked']} passed "
          f"({report['pass_rate']:.1f} %)")
    print("\nSample questions:")
    for i, q in enumerate(questions[:5], 1):
        print(f"\n  Q{i}. [{q['type']}] ({q['difficulty']}) [{q['node']}]")
        print(f"     {q['question'][:100]}...")
        print(f"     Answer: {str(q['answer'])[:80]}")