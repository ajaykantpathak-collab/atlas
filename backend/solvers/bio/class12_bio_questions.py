from __future__ import annotations
"""
Deterministic Question Generator for ISC Biology Class 12
Topics: Reproduction, Genetics, Molecular Biology, Evolution, Health, Biotechnology, Ecology
Generates infinite variations via seed-controlled randomisation.
"""

try:
    from solvers.solver_maths_c12 import Step, SolverResult
except ImportError:
    from solvers.base import Step, SolverResult



import random
import string
from enum import Enum
from typing import Any, Dict, List, Optional, Tuple

try:
    from solvers.solver_bio_c12 import SOLVER_REGISTRY
except ImportError:
    SOLVER_REGISTRY = {}

# ---------------------------------------------------------------------------
# Enumerations
# ---------------------------------------------------------------------------

class Difficulty(str, Enum):
    EASY   = "easy"
    MEDIUM = "medium"
    HARD   = "hard"

class BloomsLevel(str, Enum):
    REMEMBER       = "Remember"
    UNDERSTAND     = "Understand"
    APPLY          = "Apply"
    ANALYZE        = "Analyze"
    EVALUATE       = "Evaluate"
    CREATE         = "Create"

class ProblemType(str, Enum):
    REPRODUCTION        = "reproduction"
    GENETICS            = "genetics"
    MOLECULAR_BIOLOGY   = "molecular_biology"
    EVOLUTION           = "evolution"
    HEALTH              = "health"
    BIOTECHNOLOGY       = "biotechnology"
    ECOLOGY             = "ecology"

BIO_TOPICS = [
    ProblemType.REPRODUCTION,
    ProblemType.GENETICS,
    ProblemType.MOLECULAR_BIOLOGY,
    ProblemType.EVOLUTION,
    ProblemType.HEALTH,
    ProblemType.BIOTECHNOLOGY,
    ProblemType.ECOLOGY,
]

# ---------------------------------------------------------------------------
# Indian reference data
# ---------------------------------------------------------------------------

INDIAN_NAMES: List[str] = [
    "Aarav Sharma",    "Priya Patel",     "Rahul Verma",
    "Ananya Iyer",     "Karthik Reddy",   "Sneha Joshi",
    "Arjun Nair",      "Diya Kapoor",     "Rohan Gupta",
    "Meera Krishnan",  "Vikram Singh",    "Isha Malhotra",
    "Aditya Rao",      "Kavya Menon",     "Siddharth Das",
    "Riya Bhattacharya","Kabir Hussain",  "Tanvi Shetty",
    "Dev Pandey",      "Nisha Kulkarni",
]

INDIAN_PLACES: List[str] = [
    "Mumbai, Maharashtra",       "Bengaluru, Karnataka",
    "Hyderabad, Telangana",      "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",      "Pune, Maharashtra",
    "Ahmedabad, Gujarat",        "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",    "Kochi, Kerala",
    "Chandigarh, Punjab",        "Bhopal, Madhya Pradesh",
    "Guwahati, Assam",           "Thiruvananthapuram, Kerala",
    "Vijayawada, Andhra Pradesh","Indore, Madhya Pradesh",
    "Nagpur, Maharashtra",       "Coimbatore, Tamil Nadu",
    "Visakhapatnam, Andhra Pradesh","Mysuru, Karnataka",
]

INDIAN_CONTEXTS: List[str] = [
    # Festivals
    "Diwali celebration at a housing society in Mumbai",
    "Pongal harvest festival in a Coimbatore village",
    "Holi gathering in a Jaipur colony",
    "Durga Puja pandal in Kolkata",
    "Onam sadya feast in a Kochi household",
    "Ganesh Chaturthi immersion in Pune",
    # Railways
    "Rajdhani Express from Delhi to Mumbai",
    "Konkan Railway coastal route through Karnataka",
    "Shatabdi Express between Chennai and Bengaluru",
    "Vande Bharat high-speed corridor",
    # Sports
    "IPL cricket season at Wankhede Stadium, Mumbai",
    "Pro Kabaddi League match in Hyderabad",
    "Santosh Trophy football tournament in West Bengal",
    "Davis Cup tennis tie in Delhi",
    # Food / Agriculture
    "organic farming initiative in Punjab",
    "mid-day meal programme in Tamil Nadu",
    "Ayurvedic wellness centre in Kerala",
    "spice export business in Kerala",
    "dairy cooperative in Gujarat (Amul)",
    # Industry / Business
    "Tata Motors truck manufacturing in Pune",
    "Reliance Jio 5G network rollout",
    "ISRO satellite launch from Sriharikota",
    "Make in India electronics manufacturing",
    "Startup India biotech incubator in Hyderabad",
    # Government / Policy
    "Swachh Bharat Abhiyan sanitation drive",
    "Ayushman Bharat health insurance scheme",
    "PM FME food processing scheme",
    "Digital India rural connectivity project",
    "National Education Policy 2020 implementation",
]

# ---------------------------------------------------------------------------
# Bloom → marks and competency mapping
# ---------------------------------------------------------------------------

BLOOM_TO_MARKS: Dict[str, int] = {
    BloomsLevel.REMEMBER:  1,
    BloomsLevel.UNDERSTAND: 2,
    BloomsLevel.APPLY:     3,
    BloomsLevel.ANALYZE:   4,
    BloomsLevel.EVALUATE:  5,
    BloomsLevel.CREATE:    6,
}

BLOOM_TO_DIFFICULTY: Dict[str, Difficulty] = {
    BloomsLevel.REMEMBER:  Difficulty.EASY,
    BloomsLevel.UNDERSTAND: Difficulty.EASY,
    BloomsLevel.APPLY:     Difficulty.MEDIUM,
    BloomsLevel.ANALYZE:   Difficulty.MEDIUM,
    BloomsLevel.EVALUATE:  Difficulty.HARD,
    BloomsLevel.CREATE:    Difficulty.HARD,
}

COMPETENCY_BLOOMS = [BloomsLevel.APPLY, BloomsLevel.ANALYZE, BloomsLevel.EVALUATE, BloomsLevel.CREATE]
STANDARD_BLOOMS    = [BloomsLevel.REMEMBER, BloomsLevel.UNDERSTAND, BloomsLevel.APPLY]

MISCONCEPTION_TAGS: List[str] = [
    "meiosis_mitosis_confusion",   "dominant_recessive_confusion",
    "mRNA_polarity_error",         "Hardy-Weinberg_assumptions_ignored",
    "blood_group_inheritance",     "DNA_vs_RNA_nucleotide_confusion",
    "natural_selection_mechanism", "cloning_vs_gmo_confusion",
    "ecological_pyramid_inverted", "parthenogenesis_sexual",
    "transcription_translation",   "codon_anticodon_swapped",
    "evolution_ladder_fallacy",    "biomagnification_direction",
    "carrier_vs_affected",         "test_cross_back_cross",
    "plasmid_vector_choice",       "restriction_enzyme_logic",
    "immune_response_class",       "pesticide_resistance_mechanism",
    "pollinator_ecology",          "carrying_capacity_confusion",
]

# ---------------------------------------------------------------------------
# Core data classes
# ---------------------------------------------------------------------------

class GeneratedQuestion:
    """Container for a fully-solved biology question."""

    def __init__(
        self,
        question_id: str,
        node_id: str,
        problem_type_id: str,
        topic: str,
        question_text: str,
        marks: int,
        difficulty: str,
        is_competency: bool,
        blooms_level: str,
        misconception_tags: List[str],
        variables: Dict[str, Any],
        model_answer: str,
        solution_steps: List[str],
        final_answer: str,
        seed: int,
    ):
        self.question_id      = question_id
        self.node_id          = node_id
        self.problem_type_id  = problem_type_id
        self.topic            = topic
        self.question_text    = question_text
        self.marks            = marks
        self.difficulty       = difficulty
        self.is_competency    = is_competency
        self.blooms_level     = blooms_level
        self.misconception_tags = misconception_tags
        self.variables        = variables
        self.model_answer     = model_answer
        self.solution_steps   = solution_steps
        self.final_answer     = final_answer
        self.seed             = seed

    def to_dict(self) -> dict:
        return {
            "question_id":        self.question_id,
            "node_id":            self.node_id,
            "problem_type_id":    self.problem_type_id,
            "topic":              self.topic,
            "question_text":      self.question_text,
            "marks":              self.marks,
            "difficulty":         self.difficulty,
            "is_competency":      self.is_competency,
            "blooms_level":       self.blooms_level,
            "misconception_tags": self.misconception_tags,
            "variables":          self.variables,
            "model_answer":       self.model_answer,
            "solution_steps":     self.solution_steps,
            "final_answer":       self.final_answer,
            "seed":               self.seed,
        }


# ---------------------------------------------------------------------------
# Seeded random variable generator
# ---------------------------------------------------------------------------

class VarGen:
    """Deterministic variable generator wrapping a seeded RNG."""

    def __init__(self, seed: int):
        self._rng = random.Random(seed)
        self._counter = 0

    def _next_seed(self) -> int:
        self._counter += 1
        return self._counter

    def int(self, lo: int, hi: int) -> int:
        """Return random integer in [lo, hi] (inclusive)."""
        return self._rng.randint(lo, hi)

    def float(self, lo: float, hi: float, ndigits: int = 2) -> float:
        """Return random float in [lo, hi], rounded to ndigits."""
        return round(self._rng.uniform(lo, hi), ndigits)

    def choice(self, seq: List[Any]) -> Any:
        """Return a random element from seq."""
        return self._rng.choice(seq)

    def sample(self, seq: List[Any], k: int) -> List[Any]:
        """Return k unique elements from seq (without replacement)."""
        return self._rng.sample(seq, k)

    def bool(self, p: float = 0.5) -> bool:
        """Return True with probability p."""
        return self._rng.random() < p


# ---------------------------------------------------------------------------
# Solver registry initialisation
# ---------------------------------------------------------------------------

_solver_cache: Dict[str, Any] = {}
for _topic in BIO_TOPICS:
    if _topic.value in SOLVER_REGISTRY:
        _solver_cache[_topic.value] = SOLVER_REGISTRY[_topic.value]
# Also load problem-type-level solver functions (e.g. "reproduction_meiosis")
for _key, _val in SOLVER_REGISTRY.items():
    if callable(_val) and _key not in _solver_cache:
        _solver_cache[_key] = _val

# ---------------------------------------------------------------------------
# Helper: run solver and return standardised fields
# ---------------------------------------------------------------------------

def _run_solver(solver: Any, problem_type: str, variables: Dict[str, Any]) -> Dict[str, Any]:
    result: SolverResult = solver(problem_type, variables)
    steps = [s.text for s in result.steps]
    return {
        "question_text":   result.question_text,
        "marks":           result.marks,
        "difficulty":      result.difficulty,
        "blooms_level":    result.blooms_level,
        "misconception_tags": result.misconception_tags,
        "variables":       result.variables,
        "model_answer":    result.model_answer,
        "solution_steps":  steps,
        "final_answer":    result.final_answer,
    }


# ---------------------------------------------------------------------------
# Problem generators — one per topic
# ---------------------------------------------------------------------------

# ---- REPRODUCTION --------------------------------------------------------

def gen_reproduction_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    r"""Meiosis stages and human reproductive biology."""
    difficulty = Difficulty.MEDIUM if competency else vg.choice([Difficulty.EASY, Difficulty.MEDIUM])
    blooms = vg.choice(COMPETENCY_BLOOMS if competency else STANDARD_BLOOMS)
    marks  = BLOOM_TO_MARKS[blooms]
    problem_configs = _solver_cache[ProblemType.REPRODUCTION.value]
    problem_config  = vg.choice(problem_configs)
    problem_type    = problem_config["type"]
    variables: Dict[str, Any] = {
        "seed":      vg._next_seed(),
        "difficulty": difficulty.value,
        "blooms":    blooms.value,
        "marks":     marks,
    }
    for pv in problem_config.get("variables", []):
        variables[pv] = vg._next_seed()
    solver_key = f"reproduction_{problem_type}"
    solver     = _solver_cache.get(solver_key, _solver_cache[ProblemType.REPRODUCTION.value])
    result     = _run_solver(solver, problem_type, variables)
    question_text = result["question_text"]
    if competency:
        name     = vg.choice(INDIAN_NAMES)
        context  = vg.choice([c for c in INDIAN_CONTEXTS if any(k in c.lower()
                       for k in ["cricket","pongal","diwali","railway","school","health","exam"])])
        location = vg.choice(INDIAN_PLACES)
        question_text += (
            f"\n\n[Competency Scenario] {name}, a biology student from {location}, is "
            f"preparing a project report related to this topic for the {context}."
        )
    qid  = f"BIO-C12-{ProblemType.REPRODUCTION.value.upper()[:4]}-{vg.int(1000, 9999)}"
    nid  = f"NODE-REPRO-{vg.int(100, 999)}"
    ptid = f"PT-{problem_type.upper()[:6]}"
    misc = result["misconception_tags"][:2] if competency else result["misconception_tags"][:1]
    return GeneratedQuestion(
        question_id=qid, node_id=nid, problem_type_id=ptid,
        topic=ProblemType.REPRODUCTION.value,
        question_text=question_text,
        marks=result["marks"], difficulty=result["difficulty"],
        is_competency=competency, blooms_level=result["blooms_level"],
        misconception_tags=misc,
        variables=result["variables"],
        model_answer=result["model_answer"],
        solution_steps=result["solution_steps"],
        final_answer=result["final_answer"], seed=vg._counter,
    )


# ---- GENETICS -----------------------------------------------------------

def gen_genetics_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    r"""Mendelian, molecular, and population genetics."""
    difficulty = Difficulty.MEDIUM if competency else vg.choice([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD])
    blooms = vg.choice(COMPETENCY_BLOOMS if competency else STANDARD_BLOOMS)
    marks  = BLOOM_TO_MARKS[blooms]
    problem_configs = _solver_cache[ProblemType.GENETICS.value]
    problem_config  = vg.choice(problem_configs)
    problem_type    = problem_config["type"]
    variables: Dict[str, Any] = {
        "seed":      vg._next_seed(),
        "difficulty": difficulty.value,
        "blooms":    blooms.value,
        "marks":     marks,
    }
    for pv in problem_config.get("variables", []):
        variables[pv] = vg._next_seed()
    solver_key = f"genetics_{problem_type}"
    solver     = _solver_cache.get(solver_key, _solver_cache[ProblemType.GENETICS.value])
    result     = _run_solver(solver, problem_type, variables)
    question_text = result["question_text"]
    if competency:
        name     = vg.choice(INDIAN_NAMES)
        location = vg.choice(INDIAN_PLACES)
        context  = vg.choice(INDIAN_CONTEXTS)
        question_text += (
            f"\n\n[Competency Scenario] {name} from {location} is analysing genetic data "
            f"related to {context} and needs to apply these principles."
        )
    qid  = f"BIO-C12-{ProblemType.GENETICS.value.upper()[:4]}-{vg.int(1000, 9999)}"
    nid  = f"NODE-GENE-{vg.int(100, 999)}"
    ptid = f"PT-{problem_type.upper()[:6]}"
    misc = result["misconception_tags"][:2] if competency else result["misconception_tags"][:1]
    return GeneratedQuestion(
        question_id=qid, node_id=nid, problem_type_id=ptid,
        topic=ProblemType.GENETICS.value,
        question_text=question_text,
        marks=result["marks"], difficulty=result["difficulty"],
        is_competency=competency, blooms_level=result["blooms_level"],
        misconception_tags=misc,
        variables=result["variables"],
        model_answer=result["model_answer"],
        solution_steps=result["solution_steps"],
        final_answer=result["final_answer"], seed=vg._counter,
    )


# ---- MOLECULAR BIOLOGY --------------------------------------------------

def gen_molecular_biology_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    r"""DNA replication, transcription, and translation."""
    difficulty = Difficulty.MEDIUM if competency else vg.choice([Difficulty.EASY, Difficulty.MEDIUM])
    blooms = vg.choice(COMPETENCY_BLOOMS if competency else STANDARD_BLOOMS)
    marks  = BLOOM_TO_MARKS[blooms]
    problem_configs = _solver_cache[ProblemType.MOLECULAR_BIOLOGY.value]
    problem_config  = vg.choice(problem_configs)
    problem_type    = problem_config["type"]
    variables: Dict[str, Any] = {
        "seed":      vg._next_seed(),
        "difficulty": difficulty.value,
        "blooms":    blooms.value,
        "marks":     marks,
    }
    for pv in problem_config.get("variables", []):
        variables[pv] = vg._next_seed()
    solver_key = f"molecular_biology_{problem_type}"
    solver     = _solver_cache.get(solver_key, _solver_cache[ProblemType.MOLECULAR_BIOLOGY.value])
    result     = _run_solver(solver, problem_type, variables)
    question_text = result["question_text"]
    if competency:
        name     = vg.choice(INDIAN_NAMES)
        location = vg.choice(INDIAN_PLACES)
        context  = vg.choice([c for c in INDIAN_CONTEXTS if any(k in c.lower()
                       for k in ["biotech","ISRO","diagnos","medicine","pharma","genetic"])])
        question_text += (
            f"\n\n[Competency Scenario] {name}, a molecular biology researcher in "
            f"{location}, is applying these principles at a facility connected with {context}."
        )
    qid  = f"BIO-C12-{ProblemType.MOLECULAR_BIOLOGY.value.upper()[:4]}-{vg.int(1000, 9999)}"
    nid  = f"NODE-MOLB-{vg.int(100, 999)}"
    ptid = f"PT-{problem_type.upper()[:8]}"
    misc = result["misconception_tags"][:2] if competency else result["misconception_tags"][:1]
    return GeneratedQuestion(
        question_id=qid, node_id=nid, problem_type_id=ptid,
        topic=ProblemType.MOLECULAR_BIOLOGY.value,
        question_text=question_text,
        marks=result["marks"], difficulty=result["difficulty"],
        is_competency=competency, blooms_level=result["blooms_level"],
        misconception_tags=misc,
        variables=result["variables"],
        model_answer=result["model_answer"],
        solution_steps=result["solution_steps"],
        final_answer=result["final_answer"], seed=vg._counter,
    )


# ---- EVOLUTION ----------------------------------------------------------

def gen_evolution_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    r"""Population genetics and natural selection."""
    difficulty = Difficulty.HARD if competency else vg.choice([Difficulty.MEDIUM, Difficulty.HARD])
    blooms = vg.choice(COMPETENCY_BLOOMS if competency else STANDARD_BLOOMS)
    marks  = BLOOM_TO_MARKS[blooms]
    problem_configs = _solver_cache[ProblemType.EVOLUTION.value]
    problem_config  = vg.choice(problem_configs)
    problem_type    = problem_config["type"]
    variables: Dict[str, Any] = {
        "seed":      vg._next_seed(),
        "difficulty": difficulty.value,
        "blooms":    blooms.value,
        "marks":     marks,
    }
    for pv in problem_config.get("variables", []):
        variables[pv] = vg._next_seed()
    solver_key = f"evolution_{problem_type}"
    solver     = _solver_cache.get(solver_key, _solver_cache[ProblemType.EVOLUTION.value])
    result     = _run_solver(solver, problem_type, variables)
    question_text = result["question_text"]
    if competency:
        name     = vg.choice(INDIAN_NAMES)
        location = vg.choice(INDIAN_PLACES)
        park     = vg.choice(["Jim Corbett National Park", "Kaziranga National Park",
                               "Bandipur Tiger Reserve", "Gir Forest National Park",
                               "Sundarbans National Park", "Wayanad Wildlife Sanctuary"])
        question_text += (
            f"\n\n[Competency Scenario] Wildlife biologist {name} at {park}, near "
            f"{location}, is studying population changes using the Hardy-Weinberg "
            f"model to guide conservation strategy."
        )
    qid  = f"BIO-C12-{ProblemType.EVOLUTION.value.upper()[:4]}-{vg.int(1000, 9999)}"
    nid  = f"NODE-EVOL-{vg.int(100, 999)}"
    ptid = f"PT-{problem_type.upper()[:6]}"
    misc = result["misconception_tags"][:2] if competency else result["misconception_tags"][:1]
    return GeneratedQuestion(
        question_id=qid, node_id=nid, problem_type_id=ptid,
        topic=ProblemType.EVOLUTION.value,
        question_text=question_text,
        marks=result["marks"], difficulty=result["difficulty"],
        is_competency=competency, blooms_level=result["blooms_level"],
        misconception_tags=misc,
        variables=result["variables"],
        model_answer=result["model_answer"],
        solution_steps=result["solution_steps"],
        final_answer=result["final_answer"], seed=vg._counter,
    )


# ---- HEALTH -------------------------------------------------------------

def gen_health_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    r"""Blood groups, immunity, and reproductive health."""
    difficulty = Difficulty.MEDIUM if competency else vg.choice([Difficulty.EASY, Difficulty.MEDIUM])
    blooms = vg.choice(COMPETENCY_BLOOMS if competency else STANDARD_BLOOMS)
    marks  = BLOOM_TO_MARKS[blooms]
    problem_configs = _solver_cache[ProblemType.HEALTH.value]
    problem_config  = vg.choice(problem_configs)
    problem_type    = problem_config["type"]
    variables: Dict[str, Any] = {
        "seed":      vg._next_seed(),
        "difficulty": difficulty.value,
        "blooms":    blooms.value,
        "marks":     marks,
    }
    for pv in problem_config.get("variables", []):
        variables[pv] = vg._next_seed()
    solver_key = f"health_{problem_type}"
    solver     = _solver_cache.get(solver_key, _solver_cache[ProblemType.HEALTH.value])
    result     = _run_solver(solver, problem_type, variables)
    question_text = result["question_text"]
    if competency:
        name     = vg.choice(INDIAN_NAMES)
        location = vg.choice(INDIAN_PLACES)
        context  = vg.choice([c for c in INDIAN_CONTEXTS if any(k in c.lower()
                       for k in ["hospital","health","AYUSH","campaign","insurance","rural"])])
        question_text += (
            f"\n\n[Competency Scenario] Dr. {name} at a health facility in {location} "
            f"is counselling a family as part of the {context}. Apply your knowledge "
            f"to explain the underlying biology."
        )
    qid  = f"BIO-C12-{ProblemType.HEALTH.value.upper()[:4]}-{vg.int(1000, 9999)}"
    nid  = f"NODE-HEAL-{vg.int(100, 999)}"
    ptid = f"PT-{problem_type.upper()[:8]}"
    misc = result["misconception_tags"][:2] if competency else result["misconception_tags"][:1]
    return GeneratedQuestion(
        question_id=qid, node_id=nid, problem_type_id=ptid,
        topic=ProblemType.HEALTH.value,
        question_text=question_text,
        marks=result["marks"], difficulty=result["difficulty"],
        is_competency=competency, blooms_level=result["blooms_level"],
        misconception_tags=misc,
        variables=result["variables"],
        model_answer=result["model_answer"],
        solution_steps=result["solution_steps"],
        final_answer=result["final_answer"], seed=vg._counter,
    )


# ---- BIOTECHNOLOGY ------------------------------------------------------

def gen_biotechnology_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    r"""rDNA technology, PCR, DNA fingerprinting, and transgenic organisms."""
    difficulty = Difficulty.HARD if competency else vg.choice([Difficulty.MEDIUM, Difficulty.HARD])
    blooms = vg.choice(COMPETENCY_BLOOMS if competency else STANDARD_BLOOMS)
    marks  = BLOOM_TO_MARKS[blooms]
    problem_configs = _solver_cache[ProblemType.BIOTECHNOLOGY.value]
    problem_config  = vg.choice(problem_configs)
    problem_type    = problem_config["type"]
    variables: Dict[str, Any] = {
        "seed":      vg._next_seed(),
        "difficulty": difficulty.value,
        "blooms":    blooms.value,
        "marks":     marks,
    }
    for pv in problem_config.get("variables", []):
        variables[pv] = vg._next_seed()
    solver_key = f"biotechnology_{problem_type}"
    solver     = _solver_cache.get(solver_key, _solver_cache[ProblemType.BIOTECHNOLOGY.value])
    result     = _run_solver(solver, problem_type, variables)
    question_text = result["question_text"]
    if competency:
        name     = vg.choice(INDIAN_NAMES)
        location = vg.choice(INDIAN_PLACES)
        context  = vg.choice(INDIAN_CONTEXTS)
        question_text += (
            f"\n\n[Competency Scenario] Biotechnologist {name} at a research lab in "
            f"{location} is applying these techniques as part of {context}."
        )
    qid  = f"BIO-C12-{ProblemType.BIOTECHNOLOGY.value.upper()[:4]}-{vg.int(1000, 9999)}"
    nid  = f"NODE-BIOT-{vg.int(100, 999)}"
    ptid = f"PT-{problem_type.upper()[:8]}"
    misc = result["misconception_tags"][:2] if competency else result["misconception_tags"][:1]
    return GeneratedQuestion(
        question_id=qid, node_id=nid, problem_type_id=ptid,
        topic=ProblemType.BIOTECHNOLOGY.value,
        question_text=question_text,
        marks=result["marks"], difficulty=result["difficulty"],
        is_competency=competency, blooms_level=result["blooms_level"],
        misconception_tags=misc,
        variables=result["variables"],
        model_answer=result["model_answer"],
        solution_steps=result["solution_steps"],
        final_answer=result["final_answer"], seed=vg._counter,
    )


# ---- ECOLOGY ------------------------------------------------------------

def gen_ecology_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    r"""Population ecology, energy flow, and biogeochemical cycles."""
    difficulty = Difficulty.MEDIUM if competency else vg.choice([Difficulty.EASY, Difficulty.MEDIUM])
    blooms = vg.choice(COMPETENCY_BLOOMS if competency else STANDARD_BLOOMS)
    marks  = BLOOM_TO_MARKS[blooms]
    problem_configs = _solver_cache[ProblemType.ECOLOGY.value]
    problem_config  = vg.choice(problem_configs)
    problem_type    = problem_config["type"]
    variables: Dict[str, Any] = {
        "seed":      vg._next_seed(),
        "difficulty": difficulty.value,
        "blooms":    blooms.value,
        "marks":     marks,
    }
    for pv in problem_config.get("variables", []):
        variables[pv] = vg._next_seed()
    solver_key = f"ecology_{problem_type}"
    solver     = _solver_cache.get(solver_key, _solver_cache[ProblemType.ECOLOGY.value])
    result     = _run_solver(solver, problem_type, variables)
    question_text = result["question_text"]
    if competency:
        name     = vg.choice(INDIAN_NAMES)
        location = vg.choice(INDIAN_PLACES)
        question_text += (
            f"\n\n[Competency Scenario] Ecologist {name} conducting field research "
            f"near {location} needs to analyse these population dynamics for a "
            f"conservation management plan."
        )
    qid  = f"BIO-C12-{ProblemType.ECOLOGY.value.upper()[:4]}-{vg.int(1000, 9999)}"
    nid  = f"NODE-ECOL-{vg.int(100, 999)}"
    ptid = f"PT-{problem_type.upper()[:8]}"
    misc = result["misconception_tags"][:2] if competency else result["misconception_tags"][:1]
    return GeneratedQuestion(
        question_id=qid, node_id=nid, problem_type_id=ptid,
        topic=ProblemType.ECOLOGY.value,
        question_text=question_text,
        marks=result["marks"], difficulty=result["difficulty"],
        is_competency=competency, blooms_level=result["blooms_level"],
        misconception_tags=misc,
        variables=result["variables"],
        model_answer=result["model_answer"],
        solution_steps=result["solution_steps"],
        final_answer=result["final_answer"], seed=vg._counter,
    )


# ---------------------------------------------------------------------------
# Generators registry
# ---------------------------------------------------------------------------

GEN_FUNCS = [
    gen_reproduction_problem,
    gen_genetics_problem,
    gen_molecular_biology_problem,
    gen_evolution_problem,
    gen_health_problem,
    gen_biotechnology_problem,
    gen_ecology_problem,
]

# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def generate_batch(seed: int, n: int = 20) -> List[GeneratedQuestion]:
    """Generate *n* ISC Biology C12 questions.

    Exactly 50 % are competency-based (Indian real-world scenarios) and
    50 % are standard direct-computation problems.

    Parameters
    ----------
    seed : int
        Master seed for full reproducibility.
    n : int, optional
        Number of questions (default 20).

    Returns
    -------
    list[GeneratedQuestion]
    """
    rng   = random.Random(seed)
    questions: List[GeneratedQuestion] = []

    # Build and shuffle the pool of generator functions.
    gen_pool = GEN_FUNCS * max(1, n // len(GEN_FUNCS) + 1)
    rng.shuffle(gen_pool)
    gen_pool = gen_pool[:n]

    # Determine competency flag: first half competency, second half standard.
    competency_flags = [True] * (n // 2) + [False] * (n - n // 2)
    rng.shuffle(competency_flags)

    for i, (gen_fn, is_comp) in enumerate(zip(gen_pool, competency_flags)):
        child_seed = seed + i + 1
        vg = VarGen(child_seed)
        try:
            q = gen_fn(vg, competency=is_comp)
            questions.append(q)
        except Exception:
            # Fallback: retry with a different generator.
            fallback_gen = rng.choice(GEN_FUNCS)
            vg_fb = VarGen(child_seed + 1000)
            try:
                q = fallback_gen(vg_fb, competency=is_comp)
                questions.append(q)
            except Exception:
                pass  # Skip unresolvable; maintain count below n.

    return questions


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import json

    batch = generate_batch(seed=42, n=20)
    print(json.dumps([q.to_dict() for q in batch], indent=2, default=str))