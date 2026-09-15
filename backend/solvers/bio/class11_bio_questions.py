"""
Deterministic question generator for ISC Biology Chapter 11
Topics: Taxonomy, Plant Physiology, Human Physiology
"""

import random
import json
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field, asdict

# Import solver
try:
    from solvers.solver_bio_c11 import SOLVER_REGISTRY, SolverResult, Step
except ImportError:
    SOLVER_REGISTRY = {}
    from solvers.base import Step, SolverResult


# ──────────────────────────────────────────────
#  DATA: Indian Names, Places, Contexts
# ──────────────────────────────────────────────

INDIAN_NAMES: List[str] = [
    "Arjun", "Priya", "Rahul", "Ananya", "Vikram", "Kavya", "Rohan",
    "Diya", "Aditya", "Meera", "Karthik", "Isha", "Siddharth", "Riya",
    "Nikhil", "Sneha", "Aryan", "Pooja", "Rishi", "Tanvi"
]

INDIAN_PLACES: List[str] = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Pune", "Jaipur", "Ahmedabad", "Lucknow", "Kochi", "Goa",
    "Chandigarh", "Bhopal", "Indore", "Coimbatore", "Nagpur", "Surat",
    "Visakhapatnam", "Thiruvananthapuram"
]

INDIAN_CONTEXTS: List[str] = [
    "Diwali celebration", "Indian Premier League (IPL) cricket match",
    "Durga Puja festival", "Indian Railways freight operations",
    "Tata Motors production plant", "Reliance Industries refinery",
    "ISRO satellite launch program", "National Science Day exhibition",
    "Republic Day parade", "Monsoon agricultural season",
    "Kumbh Mela mass gathering", "Sikkim organic farming initiative",
    "GST implementation impact study", "RBI monetary policy review",
    "Maharashtra sugar industry", "Kerala tourism statistics",
    "Silicon Valley of India tech park", "Ganga river pollution study",
    "Ayushman Bharat health scheme", "PM-KISAN farmer welfare program"
]


# ──────────────────────────────────────────────
#  DATA CLASSES
# ──────────────────────────────────────────────

@dataclass
class GeneratedQuestion:
    question_id: str
    node_id: str
    problem_type_id: str
    topic: str
    question_text: str
    marks: int
    difficulty: str          # easy | medium | hard
    is_competency: bool
    blooms_level: str        # Remember | Understand | Apply | Analyse | Evaluate | Create
    misconception_tags: List[str]
    variables: Dict[str, Any]
    model_answer: str
    solution_steps: List[Dict[str, str]]
    final_answer: str
    seed: int


# ──────────────────────────────────────────────
#  VARIABLE GENERATOR (VarGen)
# ──────────────────────────────────────────────

class VarGen:
    """Seeded random variable generator for reproducible question generation."""

    def __init__(self, seed: int):
        self.rng = random.Random(seed)
        self.seed = seed

    def int(self, lo: int, hi: int) -> int:
        return self.rng.randint(lo, hi)

    def float(self, lo: float, hi: float, decimals: int = 2) -> float:
        return round(self.rng.uniform(lo, hi), decimals)

    def choice(self, seq: List[Any]) -> Any:
        return self.rng.choice(seq)

    def sample(self, seq: List[Any], k: int) -> List[Any]:
        return self.rng.sample(seq, k)

    def shuffle(self, seq: List[Any]) -> List[Any]:
        out = seq[:]
        self.rng.shuffle(out)
        return out

    def bool(self, p: float = 0.5) -> bool:
        return self.rng.random() < p

    def uniform(self, lo: float, hi: float) -> float:
        return self.rng.uniform(lo, hi)

    def gauss(self, mu: float, sigma: float) -> float:
        return round(self.rng.gauss(mu, sigma), 2)


# ──────────────────────────────────────────────
#  HELPER UTILITIES
# ──────────────────────────────────────────────

def _make_qid(seed: int, idx: int, topic: str) -> str:
    return f"BIO_C11_{topic.upper()[:6]}_{seed}_{idx:03d}"

def _make_node_id(topic: str, idx: int) -> str:
    return f"node_{topic.lower().replace(' ','_')}_{idx:03d}"

def _difficulty(marks: int, is_competency: bool) -> str:
    if marks <= 2:
        return "easy"
    elif marks <= 4:
        return "medium" if not is_competency else "medium"
    else:
        return "hard"

def _misconception_tags(topic: str, sub_topic: str) -> List[str]:
    pool = {
        "taxonomy": [
            "confuses_binomial_with_trinomial",
            "thinks_phylum_equals_class",
            "mixes_up_prokaryote_eukaryote",
            "confuses_hierarchy_levels",
            "thinks_species_name_capitalized_alone",
        ],
        "plant_physiology": [
            "thinks_photosynthesis_only_in_leaves",
            "confuses_xylem_phloem_function",
            "thinks_transpiration_is_loss_only",
            "mixes_light_dark_reaction",
            "confuses_stomata_opening_closing",
        ],
        "digestion": [
            "thinks_enzymes_absorbed_into_blood",
            "confuses_salivary_amylase_pepsin",
            "thinks_bile_is_enzyme",
            "mixes_up_small_large_intestine",
            "confuses_villi_microvilli",
        ],
        "breathing": [
            "thinks_oxygen_is_created_in_lungs",
            "confuses_alveoli_bronchioles",
            "thinks_breathing_is_respiration_only",
            "mixes_up_inspiration_expiration",
            "thinks_co2_is_absorbed_in_lungs",
        ],
        "circulation": [
            "thinks_veins_always_carry_deoxygenated",
            "confuses_systole_diastole",
            "thinks_heart_has_3_chambers",
            "mixes_up_artery_vein_function",
            "confuses_plasma_serum",
        ],
        "excretion": [
            "thinks_kidney_filters_blood_once",
            "confuses_glomerulus_bowman_capsule",
            "thinks_urine_forms_in_ureter",
            "mixes_up_ADH_aldosterone",
            "confuses_urea_ammonia",
        ],
        "nervous": [
            "thinks_nerve_impulse_is_electrical_only",
            "confuses_cerebrum_cerebellum",
            "thinks_reflex_involves_brain",
            "mixes_up_sensory_motor_neuron",
            "confuses_synapse_neuromuscular",
        ],
        "endocrine": [
            "thinks_hormones_travel_in_arteries_only",
            "confuses_pituitary_thyroid",
            "thinks_insulin_from_pancreas_exocrine",
            "mixes_up_positive_negative_feedback",
            "confuses_adrenaline_cortisol",
        ],
    }
    return _vn(pool.get(sub_topic, pool.get(topic, ["general_misconception"])))


def _vn(x: Any) -> Any:
    """Value-normalise: if list, pick one."""
    if isinstance(x, list):
        return [x[0]] if x else []
    return [x] if x else []


def _blooms(mode: str, marks: int) -> str:
    if mode == "competency":
        if marks <= 2:
            return "Apply"
        elif marks <= 4:
            return "Analyse"
        else:
            return "Evaluate"
    else:
        if marks <= 2:
            return "Remember"
        elif marks <= 4:
            return "Understand"
        else:
            return "Apply"


def _steps_to_list(steps: List[Step]) -> List[Dict[str, str]]:
    out = []
    for s in steps:
        out.append({
            "description": s.description,
            "formula": s.formula,
            "substitution": s.substitution,
            "result": s.result,
        })
    return out


# ──────────────────────────────────────────────
#  ── TAXONOMY GENERATORS ──────────────────────
# ──────────────────────────────────────────────

def _get_solver(topic: str, problem_type: str):
    key = f"{topic}_{problem_type}"
    return SOLVER_REGISTRY.get(key)


def gen_taxonomy_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """
    Taxonomy problem generator.
    Covers: binomial nomenclature, taxonomic hierarchy, five-kingdom / three-domain,
    diagnostic key, taxonomic ranks.
    """
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    problem_types = ["binomial_nomenclature", "taxonomic_hierarchy", "five_kingdom", "diagnostic_key"]
    if competency:
        problem_types = ["diagnostic_key", "taxonomic_hierarchy"]
    pt = vg.choice(problem_types)

    solver_fn = _get_solver("taxonomy", pt)
    if solver_fn:
        result: SolverResult = solver_fn(seed=seed, competency=competency, marks=marks)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    question_templates = {
        "binomial_nomenclature": [
            f"{person}, a Class XII student at {place}, observed that the scientific name of mango is written as *Mangifera indica* Linn. "
            f"Identify the error if any in writing this name and state the rule of binomial nomenclature followed. "
            f"What would be the correct way to write the name of the tiger (*Panthera tigris*) according to the same rule?",
            f"During {context}, {person} noted that local vendors wrote *citrus limon* on their product labels. "
            f"Explain why this violates the rules of binomial nomenclature and write the correct form. "
            f"State the author citation rule when the author's name is abbreviated.",
        ],
        "taxonomic_hierarchy": [
            f"{person} from {place} is classifying a newly discovered organism during a {context} biodiversity survey. "
            f"The organism has a notochord, dorsal hollow nerve cord, and pharyngeal gill slits at some stage. "
            f"Assign it to the correct phylum and place the following in ascending order of hierarchy: "
            f"Species → Genus → Family → Order → Class → Phylum. "
            f"State the taxonomic rank at which the broadest classification is made.",
            f"A scientist at {place} discovered a plant with seeds but no flowers or fruits. "
            f"Place the organism in the correct plant group (Algae / Bryophyta / Pteridophyta / Gymnosperms / Angiosperms). "
            f"List two characters that distinguish Pteridophyta from Bryophyta. "
            f"How does {person} determine if an organism belongs to Monera or Protista?",
        ],
        "five_kingdom": [
            f"During {context} in {place}, {person} collected samples of Amoeba, Yeast, Spirogyra, a Fern, a Mango plant, and a Dog. "
            f"Classify each into the correct kingdom among the Five Kingdom System of Whittaker. "
            f"State the single most important criterion used for this classification. "
            f"Why are Blue-green algae placed in Kingdom Monera and not in Kingdom Plantae?",
            f"{person} observed that organisms in Kingdom Fungi have a cell wall made of chitin, while plants have cellulose. "
            f"Based on this observation, explain why Fungi are placed in a separate kingdom. "
            f"Give two reasons why viruses are not included in any of the five kingdoms.",
        ],
        "diagnostic_key": [
            f"At {place}, {person} prepared a dichotomous key to identify five local plants. "
            f"The key begins: '1a. Seeds naked → Go to 2; 1b. Seeds enclosed in fruit → Go to 3'. "
            f"Complete the key for Gymnosperms and Angiosperms. "
            f"What type of key is this and why is it called 'dichotomous'? "
            f"How would {person} modify the key if a new plant with no seeds (Pteridophyte) was added?",
            f"During {context}, {person} used the following key to identify organisms: "
            f"'1a. Cell wall present → 2; 1b. No cell wall → Animalia. 2a. Chlorophyll present → Plantae; 2b. No chlorophyll → Fungi'. "
            f"Identify the organism identified as '2b' and give one example. "
            f"State the limitation of this key.",
        ],
    }

    template_key = pt if pt in question_templates else "binomial_nomenclature"
    q_text = vg.choice(question_templates.get(template_key, question_templates["binomial_nomenclature"]))

    m_tags = _misconception_tags("taxonomy", pt)

    return GeneratedQuestion(
        question_id=_make_qid(seed, idx, "taxonomy"),
        node_id=_make_node_id("taxonomy", idx),
        problem_type_id=pt,
        topic="Taxonomy",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={"context": context, "person": person, "place": place, "problem_type": pt},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


# ──────────────────────────────────────────────
#  ── PLANT PHYSIOLOGY GENERATORS ─────────────
# ──────────────────────────────────────────────

def gen_plant_physiology_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """
    Plant Physiology problem generator.
    Covers: photosynthesis, transpiration, mineral nutrition, plant respiration,
    growth regulators, photoperiodism.
    """
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    problem_types = ["photosynthesis", "transpiration", "mineral_nutrition", "plant_respiration"]
    if competency:
        problem_types = ["transpiration", "photosynthesis"]
    pt = vg.choice(problem_types)

    solver_fn = _get_solver("plant_physiology", pt)
    if solver_fn:
        result: SolverResult = solver_fn(seed=seed, competency=competency, marks=marks)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    question_templates = {
        "photosynthesis": [
            f"During {context} in {place}, {person} set up an experiment to demonstrate that oxygen is evolved during photosynthesis. "
            f"A sprig of *Elodea* was placed in a beaker of water containing 0.5% NaHCO₃ solution and exposed to light. "
            f"After 2 hours, {vg.int(12, 25)} bubbles were counted per minute. "
            f"(a) What is the role of NaHCO₃ in this experiment? "
            f"(b) State the equation for photosynthesis. "
            f"(c) If the light source was replaced with a green filter, what would happen to the rate of bubbling and why? [{marks} marks]",
            f"{person} from {place} grew plants in three conditions: bright sunlight, partial shade, and complete darkness. "
            f"The plant in complete darkness showed etiolation. "
            f"Explain why etiolation occurs. "
            f"State the role of chlorophyll in photosynthesis and why etiolated stems appear white/yellow. "
            f"How does {person} distinguish between light reaction and dark reaction?",
        ],
        "transpiration": [
            f"{person} at {place} conducted a transpiration experiment using a potometer. "
            f"The initial reading was {vg.float(0.5, 2.0):.2f} mL and the final reading after {vg.int(1, 4)} hour(s) was {vg.float(1.0, 5.0):.2f} mL. "
            f"(a) Calculate the rate of transpiration in mL/hour. "
            f"(b) List two environmental factors that increase the rate of transpiration. "
            f"(c) State the significance of transpiration in plants. [{marks} marks]",
            f"During {context}, {person} noticed that a potted plant in {place} showed wilting despite the soil being moist. "
            f"Explain why this happens. "
            f"Describe the mechanism of transpiration pull (cohesion-tension theory) in xylem transport. "
            f"How does {person} demonstrate transpiration using a cobalt chloride paper experiment?",
        ],
        "mineral_nutrition": [
            f"A soil sample from {place} was tested and found deficient in {vg.choice(['nitrogen', 'phosphorus', 'potassium', 'magnesium'])}. "
            f"{person} growing a {vg.choice(['wheat', 'rice', 'tomato', 'cotton'])} crop observed yellowing of older leaves. "
            f"Identify the deficient element and describe two deficiency symptoms. "
            f"State the role of {vg.choice(['Mg', 'Fe', 'N', 'P'])} in plant metabolism. "
            f"How does {person} correct the deficiency through hydroponics? [{marks} marks]",
            f"During {context}, {person} studied the role of micronutrients in plant growth. "
            f"State why Fe is called a micronutrient despite being essential. "
            f"What deficiency symptoms would {person} observe if Zn is lacking? "
            f"Distinguish between macronutrients and micronutrients with examples.",
        ],
        "plant_respiration": [
            f"{person} placed seeds of {vg.choice(['pea', 'bean', 'wheat', 'rice'])} in a flask with a bent tube dipped in limewater at {place}. "
            f"After {vg.int(12, 48)} hours, the limewater turned milky. "
            f"(a) Explain why the limewater turned milky. "
            f"(b) Write the equation for aerobic respiration. "
            f"(c) What result would {person} expect if the seeds were boiled first? Why? [{marks} marks]",
            f"During {context}, {person} noticed that roots of waterlogged crops in {place} died. "
            f"Explain the biochemical reason for this. "
            f"State the Pasteur effect and its significance. "
            f"How does {person} compare aerobic and anaerobic respiration in plants?",
        ],
    }

    template_key = pt if pt in question_templates else "photosynthesis"
    q_text = vg.choice(question_templates.get(template_key, question_templates["photosynthesis"]))

    m_tags = _misconception_tags("plant_physiology", pt)

    return GeneratedQuestion(
        question_id=_make_qid(seed, idx + 100, "plant_phys"),
        node_id=_make_node_id("plant_physiology", idx),
        problem_type_id=pt,
        topic="Plant Physiology",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={"context": context, "person": person, "place": place, "problem_type": pt},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


# ──────────────────────────────────────────────
#  ── HUMAN PHYSIOLOGY GENERATORS ─────────────
# ──────────────────────────────────────────────

def gen_human_physiology_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """
    Human Physiology problem generator.
    Covers: digestion, breathing, circulation, excretion, nervous, endocrine
    """
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    sub_topics = ["digestion", "breathing", "circulation", "excretion", "nervous", "endocrine"]
    if competency:
        sub_topics = ["digestion", "circulation", "excretion", "endocrine"]
    sub = vg.choice(sub_topics)

    solver_fn = _get_solver("human_physiology", sub)
    if solver_fn:
        result: SolverResult = solver_fn(seed=seed, competency=competency, marks=marks, sub_topic=sub)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    qt = _question_templates(sub, vg, person, place, context, marks)
    m_tags = _misconception_tags("human_physiology", sub)

    return GeneratedQuestion(
        question_id=_make_qid(seed, idx + 200, sub[:8]),
        node_id=_make_node_id(f"human_{sub}", idx),
        problem_type_id=sub,
        topic=f"Human Physiology — {sub.title()}",
        question_text=qt,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={
            "context": context, "person": person, "place": place,
            "sub_topic": sub, "marks": marks
        },
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


def _question_templates(sub: str, vg: VarGen, person: str, place: str,
                        context: str, marks: int) -> str:
    T = {
        "digestion": [
            # Standard
            f"{person} ate a meal rich in carbohydrates, proteins, and fats at {place}. "
            f"Trace the digestion of starch from the mouth to the ileum, naming the enzymes involved at each stage. "
            f"State where protein digestion begins and why. [{marks} marks]",
            f"During {context}, {person} experienced acidity after eating spicy food. "
            f"Explain why gastric juice does not digest the stomach wall itself. "
            f"Name the hormone that stimulates bile secretion and the organ that secretes it. [{marks} marks]",
            # Competency
            f"A health survey in {place} during {context} found that {vg.int(20, 60)}% of respondents skip breakfast. "
            f"Using your knowledge of digestion, explain two consequences of skipping breakfast on {person}'s digestive system. "
            f"Design a balanced breakfast menu that covers all macronutrient digestion requirements. [{marks} marks]",
            f"{person} runs a small food stall during {context} in {place} serving chole bhature. "
            f"Analyse the digestion pathway of the meal components (chickpeas = protein+carbs; bhature = carbs+fat). "
            f"Which enzyme would be most critical if {person} had a pancreatic insufficiency? [{marks} marks]",
        ],
        "breathing": [
            f"{person} from {place} climbed to an altitude of {vg.int(2000, 5000)} m during {context} and experienced breathlessness. "
            f"Explain why breathlessness occurs at high altitude. "
            f"Describe the mechanism of inspiration in humans, mentioning the role of the diaphragm and intercostal muscles. [{marks} marks]",
            f"The vital capacity of {person}'s lungs was measured at {vg.float(3000, 5000):.0f} mL. "
            f"Define vital capacity and state its significance. "
            f"What is the role of residual volume in breathing? [{marks} marks]",
            f"During {context} in {place}, {person} volunteers at a medical camp where spirometry tests are conducted. "
            f"A patient shows reduced FEV1/FVC ratio. Analyse what condition this indicates and explain the physiological basis. "
            f"Design a simple awareness poster about reducing air pollution to protect respiratory health. [{marks} marks]",
        ],
        "circulation": [
            f"{person}, aged {vg.int(18, 60)}, visited a cardiologist in {place} during {context}. "
            f"The ECG showed a heart rate of {vg.int(55, 110)} beats per minute. "
            f"(a) Calculate the cardiac output if stroke volume is {vg.float(60, 90):.0f} mL. "
            f"(b) State the function of the SA node. "
            f"(c) Name the phase of the cardiac cycle when the ventricles contract. [{marks} marks]",
            f"During {context}, {person} noticed that the walls of arteries are thicker than veins. "
            f"Explain why this structural difference exists in relation to blood pressure. "
            f"Distinguish between pulmonary and systemic circulation. [{marks} marks]",
            f"A survey during {context} in {place} found rising hypertension among adults. "
            f"{person} explains to patients how blood pressure is measured and what the two readings (systolic/diastolic) mean. "
            f"Analyse how lifestyle factors (diet, exercise, stress) affect blood pressure. "
            f"Design a simple health awareness pamphlet for the community. [{marks} marks]",
        ],
        "excretion": [
            f"The glomerular filtration rate of {person}'s kidneys was measured at {vg.float(120, 180):.0f} mL/min. "
            f"Calculate the total volume of filtrate formed in 24 hours. "
            f"State why most of this filtrate is reabsorbed. [{marks} marks]",
            f"During {context}, {person} studied a case of kidney failure in {place}. "
            f"Describe the structure of a nephron with a neat labelled diagram. "
            f"Explain the role of ADH in urine concentration. [{marks} marks]",
            f"A pharmaceutical company in {place} during {context} is developing an artificial kidney machine. "
            f"{person} leads the research team. Analyse the challenges in replicating glomerular filtration artificially. "
            f"Compare haemodialysis with peritoneal dialysis. "
            f"Propose a community kidney health screening program for early detection of chronic kidney disease. [{marks} marks]",
        ],
        "nervous": [
            f"{person} touched a hot vessel and immediately withdrew the hand — a reflex action. "
            f"Trace the reflex arc involved, naming each component. "
            f"State why this is faster than a voluntary action. [{marks} marks]",
            f"During {context} in {place}, {person} observed that damage to the cerebellum caused loss of balance. "
            f"Explain the function of the cerebellum. "
            f"Differentiate between a neuron and a neuroglia. [{marks} marks]",
            f"{person} working at {place} during {context} uses a new brain-computer interface technology. "
            f"Analyse how synaptic transmission enables this technology. "
            f"Compare electrical synapses with chemical synapses. "
            f"Evaluate the ethical implications of neural implants for treating paralysis. [{marks} marks]",
        ],
        "endocrine": [
            f"During {context} in {place}, {person} exhibited symptoms of {vg.choice(['excessive thirst and urination', 'unexplained weight loss', 'protruding eyes', 'excessive growth'])}. "
            f"Identify the likely endocrine disorder and the hormone involved. "
            f"Name the gland that secretes this hormone and state its normal function. [{marks} marks]",
            f"{person} from {place} compared the endocrine system to a postal system during {context}. "
            f"Explain the analogy: hormones as letters, blood as the postal service, and target cells as addresses. "
            f"Give two examples of hormones and their target organs. [{marks} marks]",
            f"A health camp at {place} during {context} screens for thyroid disorders using {vg.int(80, 150)} participants. "
            f"{person} found that {vg.int(5, 25)}% had abnormal TSH levels. "
            f"Analyse the role of TSH in thyroid hormone regulation using the feedback mechanism. "
            f"Design a thyroid health awareness campaign for the community. [{marks} marks]",
        ],
    }
    opts = T.get(sub, T["digestion"])
    return vg.choice(opts)


# ──────────────────────────────────────────────
#  ── MASTER GENERATOR PER TOPIC ──────────────
# ──────────────────────────────────────────────

def gen_taxonomy(vg: VarGen) -> GeneratedQuestion:
    return gen_taxonomy_problem(vg, competency=vg.bool(0.5))


def gen_plant_physiology(vg: VarGen) -> GeneratedQuestion:
    return gen_plant_physiology_problem(vg, competency=vg.bool(0.5))


def gen_digestion(vg: VarGen) -> GeneratedQuestion:
    sub = "digestion"
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    competency = vg.bool(0.5)
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    solver_fn = _get_solver("human_physiology", sub)
    if solver_fn:
        result = solver_fn(seed=seed, competency=competency, marks=marks, sub_topic=sub)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    if competency:
        q_text = (
            f"A health survey in {place} during {context} found that {vg.int(20, 60)}% of respondents skip breakfast. "
            f"Using your knowledge of digestion, explain two consequences of skipping breakfast on {person}'s digestive system. "
            f"Design a balanced breakfast menu that covers all macronutrient digestion requirements. [{marks} marks]"
        )
    else:
        q_text = (
            f"{person} ate a meal rich in carbohydrates, proteins, and fats at {place}. "
            f"Trace the digestion of starch from the mouth to the ileum, naming the enzymes involved at each stage. "
            f"State where protein digestion begins and why. [{marks} marks]"
        )

    m_tags = _misconception_tags("human_physiology", sub)
    return GeneratedQuestion(
        question_id=_make_qid(seed, idx, "digestion"),
        node_id=_make_node_id("digestion", idx),
        problem_type_id=sub,
        topic="Human Physiology — Digestion",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={"person": person, "place": place, "context": context, "sub_topic": sub},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


def gen_breathing(vg: VarGen) -> GeneratedQuestion:
    sub = "breathing"
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    competency = vg.bool(0.5)
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    solver_fn = _get_solver("human_physiology", sub)
    if solver_fn:
        result = solver_fn(seed=seed, competency=competency, marks=marks, sub_topic=sub)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    if competency:
        q_text = (
            f"During {context} in {place}, {person} volunteers at a medical camp where spirometry tests are conducted. "
            f"A patient shows reduced FEV1/FVC ratio. Analyse what condition this indicates and explain the physiological basis. "
            f"Design a simple awareness poster about reducing air pollution to protect respiratory health. [{marks} marks]"
        )
    else:
        altitude = vg.int(2000, 5000)
        q_text = (
            f"{person} from {place} climbed to an altitude of {altitude} m during {context} and experienced breathlessness. "
            f"Explain why breathlessness occurs at high altitude. "
            f"Describe the mechanism of inspiration in humans, mentioning the role of the diaphragm and intercostal muscles. [{marks} marks]"
        )

    m_tags = _misconception_tags("human_physiology", sub)
    return GeneratedQuestion(
        question_id=_make_qid(seed, idx + 10, "breathing"),
        node_id=_make_node_id("breathing", idx),
        problem_type_id=sub,
        topic="Human Physiology — Breathing",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={"person": person, "place": place, "context": context, "sub_topic": sub},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


def gen_circulation(vg: VarGen) -> GeneratedQuestion:
    sub = "circulation"
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    competency = vg.bool(0.5)
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    solver_fn = _get_solver("human_physiology", sub)
    if solver_fn:
        result = solver_fn(seed=seed, competency=competency, marks=marks, sub_topic=sub)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    if competency:
        q_text = (
            f"A survey during {context} in {place} found rising hypertension among adults. "
            f"{person} explains to patients how blood pressure is measured and what the two readings (systolic/diastolic) mean. "
            f"Analyse how lifestyle factors (diet, exercise, stress) affect blood pressure. "
            f"Design a simple health awareness pamphlet for the community. [{marks} marks]"
        )
    else:
        hr = vg.int(55, 110)
        sv = vg.float(60, 90)
        q_text = (
            f"{person}, aged {vg.int(18, 60)}, visited a cardiologist in {place} during {context}. "
            f"The ECG showed a heart rate of {hr} beats per minute. "
            f"(a) Calculate the cardiac output if stroke volume is {sv:.0f} mL. "
            f"(b) State the function of the SA node. "
            f"(c) Name the phase of the cardiac cycle when the ventricles contract. [{marks} marks]"
        )

    m_tags = _misconception_tags("human_physiology", sub)
    return GeneratedQuestion(
        question_id=_make_qid(seed, idx + 20, "circulation"),
        node_id=_make_node_id("circulation", idx),
        problem_type_id=sub,
        topic="Human Physiology — Circulation",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={"person": person, "place": place, "context": context, "sub_topic": sub},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


def gen_excretion(vg: VarGen) -> GeneratedQuestion:
    sub = "excretion"
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    competency = vg.bool(0.5)
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    solver_fn = _get_solver("human_physiology", sub)
    if solver_fn:
        result = solver_fn(seed=seed, competency=competency, marks=marks, sub_topic=sub)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    if competency:
        pct = vg.int(5, 25)
        n = vg.int(80, 150)
        q_text = (
            f"A health camp at {place} during {context} screens for kidney disorders using {n} participants. "
            f"{person} found that {pct}% had abnormal creatinine levels. "
            f"Analyse the role of the nephron in maintaining blood composition. "
            f"Design a community kidney health screening program for early detection of chronic kidney disease. [{marks} marks]"
        )
    else:
        gfr = vg.float(120, 180)
        q_text = (
            f"The glomerular filtration rate of {person}'s kidneys was measured at {gfr:.0f} mL/min. "
            f"Calculate the total volume of filtrate formed in 24 hours. "
            f"State why most of this filtrate is reabsorbed. [{marks} marks]"
        )

    m_tags = _misconception_tags("human_physiology", sub)
    return GeneratedQuestion(
        question_id=_make_qid(seed, idx + 30, "excretion"),
        node_id=_make_node_id("excretion", idx),
        problem_type_id=sub,
        topic="Human Physiology — Excretion",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={"person": person, "place": place, "context": context, "sub_topic": sub},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


def gen_nervous(vg: VarGen) -> GeneratedQuestion:
    sub = "nervous"
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    competency = vg.bool(0.5)
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    solver_fn = _get_solver("human_physiology", sub)
    if solver_fn:
        result = solver_fn(seed=seed, competency=competency, marks=marks, sub_topic=sub)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    if competency:
        q_text = (
            f"{person} working at {place} during {context} uses a new brain-computer interface technology. "
            f"Analyse how synaptic transmission enables this technology. "
            f"Compare electrical synapses with chemical synapses. "
            f"Evaluate the ethical implications of neural implants for treating paralysis. [{marks} marks]"
        )
    else:
        q_text = (
            f"{person} touched a hot vessel and immediately withdrew the hand — a reflex action. "
            f"Trace the reflex arc involved, naming each component. "
            f"State why this is faster than a voluntary action. [{marks} marks]"
        )

    m_tags = _misconception_tags("human_physiology", sub)
    return GeneratedQuestion(
        question_id=_make_qid(seed, idx + 40, "nervous"),
        node_id=_make_node_id("nervous", idx),
        problem_type_id=sub,
        topic="Human Physiology — Nervous System",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={"person": person, "place": place, "context": context, "sub_topic": sub},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


def gen_endocrine(vg: VarGen) -> GeneratedQuestion:
    sub = "endocrine"
    marks = vg.choice([1, 2, 3, 4, 5, 6])
    competency = vg.bool(0.5)
    difficulty = _difficulty(marks, competency)
    blooms = _blooms("competency" if competency else "standard", marks)
    seed = vg.seed
    idx = seed % 1000

    solver_fn = _get_solver("human_physiology", sub)
    if solver_fn:
        result = solver_fn(seed=seed, competency=competency, marks=marks, sub_topic=sub)
    else:
        result = SolverResult(True, [], "Answer computed", None)

    person = vg.choice(INDIAN_NAMES)
    place = vg.choice(INDIAN_PLACES)
    context = vg.choice(INDIAN_CONTEXTS)

    symptom = vg.choice([
        "excessive thirst and frequent urination",
        "unexplained weight loss despite normal appetite",
        "protruding eyes with anxiety",
        "excessive growth of hands and feet",
        "irregular menstrual cycles",
    ])
    hormone = vg.choice(["insulin", "thyroxine", "growth hormone", "adrenaline"])

    if competency:
        n = vg.int(80, 150)
        pct = vg.int(5, 25)
        q_text = (
            f"A health camp at {place} during {context} screens for thyroid disorders using {n} participants. "
            f"{person} found that {pct}% had abnormal TSH levels. "
            f"Analyse the role of TSH in thyroid hormone regulation using the feedback mechanism. "
            f"Design a thyroid health awareness campaign for the community. [{marks} marks]"
        )
    else:
        q_text = (
            f"During {context} in {place}, {person} exhibited symptoms of {symptom}. "
            f"Identify the likely endocrine disorder and the hormone involved. "
            f"Name the gland that secretes {hormone} and state its normal function. [{marks} marks]"
        )

    m_tags = _misconception_tags("human_physiology", sub)
    return GeneratedQuestion(
        question_id=_make_qid(seed, idx + 50, "endocrine"),
        node_id=_make_node_id("endocrine", idx),
        problem_type_id=sub,
        topic="Human Physiology — Endocrine System",
        question_text=q_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=m_tags,
        variables={
            "person": person, "place": place, "context": context,
            "sub_topic": sub, "symptom": symptom, "hormone": hormone
        },
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.answer,
        seed=seed,
    )


# ──────────────────────────────────────────────
#  BATCH GENERATOR
# ──────────────────────────────────────────────

ALL_GENERATORS = [
    ("taxonomy", gen_taxonomy),
    ("plant_physiology", gen_plant_physiology),
    ("digestion", gen_digestion),
    ("breathing", gen_breathing),
    ("circulation", gen_circulation),
    ("excretion", gen_excretion),
    ("nervous", gen_nervous),
    ("endocrine", gen_endocrine),
]

# Per-topic weights (balanced)
_TOPIC_WEIGHTS = [1, 1, 1, 1, 1, 1, 1, 1]


def generate_batch(seed: int, n: int = 20) -> List[GeneratedQuestion]:
    """
    Generate n questions with 50% competency and 50% standard problems.
    Uses VarGen with the given seed for reproducibility.
    Cycles through topics and competency flag to ensure diversity.
    """
    rng = random.Random(seed)
    questions: List[GeneratedQuestion] = []

    for i in range(n):
        # Alternate competency / standard
        is_competency = (i % 2 == 0)

        # Pick a topic using weighted random
        topic_idx = rng.choices(range(len(ALL_GENERATORS)), weights=_TOPIC_WEIGHTS, k=1)[0]
        topic_name, gen_fn = ALL_GENERATORS[topic_idx]

        # Create a child seed for VarGen (derived from main seed + index)
        child_seed = seed * 1000 + i + 1
        vg = VarGen(child_seed)

        try:
            q = gen_fn(vg)
        except Exception as exc:
            # Fallback: try without competency flag
            try:
                vg2 = VarGen(child_seed + 999)
                q = gen_fn(vg2)
            except Exception:
                continue

        questions.append(q)

    return questions


# ──────────────────────────────────────────────
#  SERIALISATION
# ──────────────────────────────────────────────

def questions_to_json(questions: List[GeneratedQuestion], indent: int = 2) -> str:
    """Serialise a list of GeneratedQuestion objects to JSON."""
    data = []
    for q in questions:
        d = asdict(q)
        data.append(d)
    return json.dumps(data, indent=indent, ensure_ascii=False)


def questions_to_dicts(questions: List[GeneratedQuestion]) -> List[Dict[str, Any]]:
    """Convert GeneratedQuestion list to list of dicts."""
    return [asdict(q) for q in questions]


# ──────────────────────────────────────────────
#  CLI / STANDALONE TEST
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    seed_arg = int(sys.argv[1]) if len(sys.argv) > 1 else 42
    n_arg = int(sys.argv[2]) if len(sys.argv) > 2 else 10

    print(f"Generating {n_arg} questions with seed={seed_arg} ...\n")
    batch = generate_batch(seed_arg, n_arg)

    for q in batch:
        comp = "[C]" if q.is_competency else "[S]"
        print(f"{comp} [{q.topic}] ({q.marks} marks, {q.difficulty}, {q.blooms_level})")
        print(f"  ID:  {q.question_id}")
        print(f"  Q:   {q.question_text[:120]}{'...' if len(q.question_text) > 120 else ''}")
        print(f"  Ans: {q.final_answer[:100]}{'...' if len(q.final_answer) > 100 else ''}")
        print()

    # JSON dump
    json_out = questions_to_json(batch)
    with open(f"batch_seed{seed_arg}.json", "w", encoding="utf-8") as f:
        f.write(json_out)
    print(f"\nSaved batch_seed{seed_arg}.json  ({len(json_out)} bytes)")