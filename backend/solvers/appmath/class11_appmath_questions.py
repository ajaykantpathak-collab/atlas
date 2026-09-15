"""
Deterministic Question Generator for ISC Applied Mathematics C11
Topics: Numbers, Algebra, Calculus basics, Statistics, Probability
"""

try:
    from solvers.solver_maths_c12 import Step, SolverResult
except ImportError:
    from solvers.base import Step, SolverResult


import random
from dataclasses import dataclass, field
from typing import List, Optional, Any

try:
    from solvers.solver_appmath_c11 import SOLVER_REGISTRY
except ImportError:
    SOLVER_REGISTRY = {}, SolverResult, Step


# ─────────────────────────────────────────────
# VarGen – seeded random wrapper
# ─────────────────────────────────────────────

class VarGen:
    """Seeded random-variable generator with a running ID counter."""

    def __init__(self, seed: int):
        self._seed = seed
        self._counter = 0
        random.seed(seed)

    def set_seed(self, seed: int) -> None:
        self._seed = seed
        random.seed(seed)

    @property
    def seed(self) -> int:
        return self._seed

    def get_id(self) -> int:
        self._counter += 1
        return (self._seed * 10000) + self._counter

    def randint(self, lo: int, hi: int) -> int:
        return random.randint(lo, hi)

    def float(self, lo: float, hi: float, precision: int = 2) -> float:
        val = random.uniform(lo, hi)
        return round(val, precision)

    def choice(self, seq: List[Any]) -> Any:
        return random.choice(seq)

    def sample(self, seq: List[Any], k: int) -> List[Any]:
        return random.sample(seq, k)


# ─────────────────────────────────────────────
# Static Indian-context lists
# ─────────────────────────────────────────────

INDIAN_NAMES: List[str] = [
    "Arjun Sharma", "Priya Patel", "Rahul Gupta", "Ananya Reddy",
    "Vikram Singh", "Kavya Nair", "Rohan Joshi", "Sneha Kapoor",
    "Aditya Iyer", "Meera Choudhury", "Karthik Rao", "Divya Menon",
    "Siddharth Bhat", "Nisha Kulkarni", "Aryan Pandey", "Isha Dubey",
    "Rishi Aggarwal", "Pooja Saxena", "Dev Malhotra", "Tanya Pillai",
]

INDIAN_PLACES: List[str] = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
    "Kochi", "Indore", "Chandigarh", "Guwahati", "Varanasi",
    "Nagpur", "Surat", "Visakhapatnam", "Coimbatore", "Bhopal",
]

INDIAN_CONTEXTS: List[str] = [
    # Festivals
    "Diwali sweets distribution", "Holi colour sales", "Durga Puja pandal setup",
    "Ganesh Chaturthi idol sales", "Eid gift exchange", "Christmas cake production",
    "Pongal harvest yield", "Onam sadya preparation",
    # Railways
    "Indian Railways passenger booking", "Mumbai local train commute",
    "Rajdhani Express fare calculation", "Vande Bharat seat allocation",
    # Sports
    "IPL cricket match analysis", "Hockey India League scoring",
    "Pro Kabaddi League points table", "Indian football league standings",
    # Business / Industry
    "Tata Motors quarterly production", "Reliance Jio subscriber growth",
    "Infosys employee bonus distribution", "Wipro annual revenue",
    "ISRO satellite launch cost", "DRDO defence project budget",
    # Finance / Governance
    "GST revenue collection", "RBI repo rate adjustment",
    "PPF interest calculation", "Sukanya Samriddhi Yojana",
    " Electricity bill slab calculation",
    # Food & Agriculture
    "Rice procurement by FCI", "Sugar mill crushing season",
    "Spice export shipment weight", "Mango export box packing",
    "Tea garden production Assam",
]


# ─────────────────────────────────────────────
# GeneratedQuestion dataclass
# ─────────────────────────────────────────────

@dataclass
class GeneratedQuestion:
    question_id: int
    node_id: int
    problem_type_id: int
    topic: str
    question_text: str
    marks: int
    difficulty: str
    is_competency: bool
    blooms_level: str
    misconception_tags: List[str]
    variables: dict
    model_answer: Any
    solution_steps: List[str]
    final_answer: Any
    seed: int


# ─────────────────────────────────────────────
# Helper – call solver with graceful fallback
# ─────────────────────────────────────────────

def _call_solver(name: str, *args, **kwargs) -> SolverResult:
    if name in SOLVER_REGISTRY:
        return SOLVER_REGISTRY[name](*args, **kwargs)
    return SolverResult(
        answer="N/A",
        steps=[Step("Solver unavailable", f"'{name}' not found in SOLVER_REGISTRY")],
        final_answer="N/A",
    )


def _steps_to_list(steps: List[Step]) -> List[str]:
    return [f"{s.description}: {s.detail}" for s in steps]


# ══════════════════════════════════════════════════════════════════════════════
#  TOPIC GENERATORS
# ══════════════════════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────
# 1. NUMBERS
# ─────────────────────────────────────────────

def gen_numbers_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """GCD / LCM / HCF / prime-factorisation / divisibility."""

    if not competency:
        # ── Standard: GCD × LCM = a × b ──
        a = vg.randint(12, 120)
        b = vg.randint(12, 120)
        result = _call_solver("gcd_lcm_product", a, b)
        name = vg.choice(INDIAN_NAMES)
        q_text = (
            f"{name} found that two numbers {a} and {b} have GCD = {result.gcd} "
            f"and LCM = {result.lcm}. Verify that GCD × LCM = a × b."
            if hasattr(result, "gcd")
            else (
                f"Two numbers are {a} and {b}. Find their HCF (GCD) and LCM, "
                f"and verify that HCF × LCM = a × b."
            )
        )
        difficulty = vg.choice(["Easy", "Medium"])

        return GeneratedQuestion(
            question_id=vg.get_id(),
            node_id=2,
            problem_type_id=2,
            topic="Numbers",
            question_text=q_text,
            marks=3,
            difficulty=difficulty,
            is_competency=False,
            blooms_level="Applying",
            misconception_tags=[
                "confusing_gcd_and_lcm",
                "product_formula_gcd_lcm",
                "prime_factorisation_errors",
            ],
            variables={"a": a, "b": b},
            model_answer=result.answer,
            solution_steps=_steps_to_list(result.steps),
            final_answer=result.final_answer,
            seed=vg.seed,
        )

    # ── Competency: Festival cycle alignment ──
    diwali_years = vg.randint(2, 5)
    holi_years = vg.randint(2, 5)
    eid_years = vg.randint(2, 5)

    result = _call_solver("lcm_cycle", diwali_years, holi_years, eid_years)
    loc = vg.choice(INDIAN_PLACES)
    f1 = vg.choice(["Diwali", "Holi", "Eid"])
    f2 = vg.choice(["Diwali", "Holi", "Eid"])
    f3 = vg.choice(["Diwali", "Holi", "Eid"])

    q_text = (
        f"In {loc}, three festivals — {f1} (every {diwali_years} years), "
        f"{f2} (every {holi_years} years) and {f3} (every {eid_years} years) — "
        f"were celebrated together in 2024. In which year will they next coincide?"
    )

    return GeneratedQuestion(
        question_id=vg.get_id(),
        node_id=2,
        problem_type_id=2,
        topic="Numbers",
        question_text=q_text,
        marks=4,
        difficulty="Medium",
        is_competency=True,
        blooms_level="Analyzing",
        misconception_tags=["lcm_application", "cycle_synchronisation", "multiple_events"],
        variables={
            "cycle1": diwali_years,
            "cycle2": holi_years,
            "cycle3": eid_years,
        },
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.final_answer,
        seed=vg.seed,
    )


# ─────────────────────────────────────────────
# 2. ALGEBRA
# ─────────────────────────────────────────────

def gen_algebra_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """Quadratic equations, simultaneous linear equations, polynomials."""

    if not competency:
        # ── Standard: Quadratic equation ──
        a = vg.randint(1, 6)
        b = vg.randint(2, 20)
        c = vg.randint(1, 30)
        result = _call_solver("solve_quadratic", a, b, c)
        name = vg.choice(INDIAN_NAMES)
        q_text = (
            f"{name} solved the quadratic equation "
            f"{a}x\u00b2 + ({b})x + ({c}) = 0. "
            f"Find the roots of the equation."
        )
        difficulty = vg.choice(["Easy", "Medium"])

        return GeneratedQuestion(
            question_id=vg.get_id(),
            node_id=3,
            problem_type_id=3,
            topic="Algebra",
            question_text=q_text,
            marks=3,
            difficulty=difficulty,
            is_competency=False,
            blooms_level="Applying",
            misconception_tags=[
                "sign_errors_in_quadratic",
                "forgetting_quadratic_formula",
                "discriminant_confusion",
            ],
            variables={"a": a, "b": b, "c": c},
            model_answer=result.answer,
            solution_steps=_steps_to_list(result.steps),
            final_answer=result.final_answer,
            seed=vg.seed,
        )

    # ── Competency: Simultaneous equations — railway ticket pricing ──
    adult_fare = vg.randint(50, 200)
    child_fare = vg.randint(20, adult_fare - 10)
    n_adults = vg.randint(2, 6)
    n_children = vg.randint(2, 6)
    total1 = adult_fare * n_adults + child_fare * n_children
    total2 = adult_fare * (n_adults + 1) + child_fare * (n_children - 1)

    result = _call_solver(
        "solve_linear_system",
        adult_fare, child_fare,
        n_adults, n_children, total1, total2,
    )
    place = vg.choice(INDIAN_PLACES)
    train = vg.choice([
        "Rajdhani Express", "Shatabdi Express",
        "Vande Bharat Express", "Duronto Express",
    ])

    q_text = (
        f"A family of {n_adults} adults and {n_children} children travelled "
        f"from {place} to Delhi by {train}. The total fare paid was Rs.{total1}. "
        f"If there had been 1 more adult and 1 fewer child, the fare would have been "
        f"Rs.{total2}. Use algebra to find the fare per adult and per child."
    )

    return GeneratedQuestion(
        question_id=vg.get_id(),
        node_id=3,
        problem_type_id=3,
        topic="Algebra",
        question_text=q_text,
        marks=5,
        difficulty="Medium",
        is_competency=True,
        blooms_level="Analyzing",
        misconception_tags=[
            "setting_up_simultaneous_equations",
            "solving_2x2_system",
            "interpreting_fare_context",
        ],
        variables={
            "adult_fare": adult_fare,
            "child_fare": child_fare,
            "n_adults": n_adults,
            "n_children": n_children,
            "total1": total1,
            "total2": total2,
        },
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.final_answer,
        seed=vg.seed,
    )


# ─────────────────────────────────────────────
# 3. CALCULUS BASICS
# ─────────────────────────────────────────────

def gen_calculus_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """Differentiation, integration, maxima/minima, area under curve."""

    if not competency:
        # ── Standard: Derivative of polynomial / trig ──
        coeff = vg.randint(2, 8)
        power = vg.choice([2, 3, 4])
        func_type = vg.choice(["poly", "sin", "cos"])
        result = _call_solver("differentiate", coeff, power, func_type)

        func_desc = (
            f"{coeff}x^{power}"
            if func_type == "poly"
            else f"{coeff}sin(x)"
            if func_type == "sin"
            else f"{coeff}cos(x)"
        )
        q_text = f"Find the derivative of the function f(x) = {func_desc} with respect to x."
        difficulty = vg.choice(["Easy", "Medium"])

        return GeneratedQuestion(
            question_id=vg.get_id(),
            node_id=4,
            problem_type_id=4,
            topic="Calculus",
            question_text=q_text,
            marks=3,
            difficulty=difficulty,
            is_competency=False,
            blooms_level="Applying",
            misconception_tags=[
                "power_rule_errors",
                "chain_rule_confusion",
                "trig_derivative_signs",
            ],
            variables={"coeff": coeff, "power": power, "func_type": func_type},
            model_answer=result.answer,
            solution_steps=_steps_to_list(result.steps),
            final_answer=result.final_answer,
            seed=vg.seed,
        )

    # ── Competency: Marginal cost / optimisation — Tata Motors ──
    a = vg.randint(1, 5)       # coefficient of x^2 in cost function
    b = vg.randint(10, 40)     # linear coefficient
    fixed_cost = vg.randint(50, 200)

    result = _call_solver("maxima_minima", a, b, fixed_cost)
    context = vg.choice(INDIAN_CONTEXTS)

    q_text = (
        f"The total production cost (in Rs. lakh) for a unit producing "
        f"x hundred vehicles is given by C(x) = {a}x\u00b2 + {b}x + {fixed_cost}. "
        f"(a) Find the marginal cost when x = 1. "
        f"(b) Determine the production level that minimises the cost."
    )

    return GeneratedQuestion(
        question_id=vg.get_id(),
        node_id=4,
        problem_type_id=4,
        topic="Calculus",
        question_text=q_text,
        marks=6,
        difficulty="Hard",
        is_competency=True,
        blooms_level="Analyzing",
        misconception_tags=[
            "marginal_vs_average_cost",
            "critical_point_method",
            "second_derivative_test",
        ],
        variables={"a": a, "b": b, "fixed_cost": fixed_cost},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.final_answer,
        seed=vg.seed,
    )


# ─────────────────────────────────────────────
# 4. STATISTICS
# ─────────────────────────────────────────────

def gen_statistics_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """Mean, median, mode, standard deviation, grouped data."""

    if not competency:
        # ── Standard: Mean and standard deviation of raw data ──
        data_vals = [vg.randint(10, 99) for _ in range(8)]
        result = _call_solver("mean_std", data_vals)
        q_text = (
            f"Find the mean and standard deviation of the following data set:\n"
            f"{data_vals}"
        )
        difficulty = vg.choice(["Easy", "Medium"])

        return GeneratedQuestion(
            question_id=vg.get_id(),
            node_id=5,
            problem_type_id=5,
            topic="Statistics",
            question_text=q_text,
            marks=4,
            difficulty=difficulty,
            is_competency=False,
            blooms_level="Applying",
            misconception_tags=[
                "mean_vs_median",
                "population_vs_sample_std",
                "grouping_errors",
                "frequency_distribution_errors",
            ],
            variables={"data": data_vals},
            model_answer=result.answer,
            solution_steps=_steps_to_list(result.steps),
            final_answer=result.final_answer,
            seed=vg.seed,
        )

    # ── Competency: Student marks analysis ──
    marks = [vg.randint(35, 100) for _ in range(10)]
    result_mean = _call_solver("mean", marks)
    result_median = _call_solver("median", sorted(marks))
    result_mode = _call_solver("mode", marks)

    name = vg.choice(INDIAN_NAMES)
    school = vg.choice([
        "Delhi Public School", "Kendriya Vidyalaya",
        "St. Xavier's High School", "DAV Public School",
    ])
    q_text = (
        f"{name} from {school} appeared for 10 unit tests. "
        f"The marks obtained (out of 100) are:\n"
        f"{marks}\n"
        f"Find the mean, median, and mode of the marks. "
        f"Comment on {name}'s consistency."
    )

    combined_steps = (
        _steps_to_list(result_mean.steps)
        + _steps_to_list(result_median.steps)
        + _steps_to_list(result_mode.steps)
    )

    return GeneratedQuestion(
        question_id=vg.get_id(),
        node_id=5,
        problem_type_id=5,
        topic="Statistics",
        question_text=q_text,
        marks=5,
        difficulty="Medium",
        is_competency=True,
        blooms_level="Analyzing",
        misconception_tags=[
            "mean_median_mode_relationship",
            "outlier_effect_on_mean",
            "grouped_ungrouped_data",
        ],
        variables={"marks": marks},
        model_answer={
            "mean": result_mean.answer,
            "median": result_median.answer,
            "mode": result_mode.answer,
        },
        solution_steps=combined_steps,
        final_answer=(
            f"Mean = {result_mean.final_answer}, "
            f"Median = {result_median.final_answer}, "
            f"Mode = {result_mode.final_answer}"
        ),
        seed=vg.seed,
    )


# ─────────────────────────────────────────────
# 5. PROBABILITY
# ─────────────────────────────────────────────

def gen_probability_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    """Classical probability, conditional probability, addition/multiplication rules."""

    if not competency:
        # ── Standard: Single die – prime numbers > 2 ──
        result = _call_solver("probability_prime_greater_than")
        name = vg.choice(INDIAN_NAMES)
        q_text = (
            f"A fair die is rolled once. {name} wins if the outcome is "
            f"a prime number greater than 2. What is the probability that "
            f"{name} wins?"
        )

        return GeneratedQuestion(
            question_id=vg.get_id(),
            node_id=6,
            problem_type_id=6,
            topic="Probability",
            question_text=q_text,
            marks=2,
            difficulty="Easy",
            is_competency=False,
            blooms_level="Remembering",
            misconception_tags=[
                "counting_favourable_outcomes",
                "total_outcomes",
                "confusing_prime_and_odd",
            ],
            variables={},
            model_answer=result.answer,
            solution_steps=_steps_to_list(result.steps),
            final_answer=result.final_answer,
            seed=vg.seed,
        )

    # ── Competency: Card-drawing – GST audit scenario ──
    result = _call_solver("probability_heart_or_king")
    auditor = vg.choice(INDIAN_NAMES)
    company = vg.choice([
        "Tata Consultancy Services", "Infosys", "Wipro",
        "Tech Mahindra", "HCL Technologies",
    ])

    q_text = (
        f"During a GST audit, {auditor} randomly selects one card from a "
        f"well-shuffled standard deck of 52 cards. "
        f"Find the probability that the card is either a Heart or a King. "
        f"(Context: {company} maintains a deck for a team-building exercise.)"
    )

    return GeneratedQuestion(
        question_id=vg.get_id(),
        node_id=6,
        problem_type_id=6,
        topic="Probability",
        question_text=q_text,
        marks=4,
        difficulty="Medium",
        is_competency=True,
        blooms_level="Applying",
        misconception_tags=[
            "mutually_exclusive_vs_not",
            "P(A_or_B)_formula",
            "overcounting_intersection",
            "standard_deck_composition",
        ],
        variables={"deck_size": 52, "hearts": 13, "kings": 4, "heart_kings": 1},
        model_answer=result.answer,
        solution_steps=_steps_to_list(result.steps),
        final_answer=result.final_answer,
        seed=vg.seed,
    )


# ══════════════════════════════════════════════════════════════════════════════
#  BATCH GENERATOR
# ══════════════════════════════════════════════════════════════════════════════

# Map: topic → generator function
_TOPIC_GENERATORS = {
    "Numbers":      gen_numbers_problem,
    "Algebra":      gen_algebra_problem,
    "Calculus":     gen_calculus_problem,
    "Statistics":   gen_statistics_problem,
    "Probability":  gen_probability_problem,
}

_TOPICS = list(_TOPIC_GENERATORS.keys())
_BLOOMS_STANDARD = ["Remembering", "Understanding", "Applying"]
_BLOOMS_COMPETENCY = ["Analyzing", "Evaluating", "Creating"]


def generate_batch(seed: int, n: int = 20) -> List[GeneratedQuestion]:
    """
    Produce *n* questions with ~50 % competency and ~50 % standard problems.

    The seed controls reproducibility.  Each question gets a derived seed so
    that the whole batch can be reproduced from a single integer.
    """
    questions: List[GeneratedQuestion] = []

    for i in range(n):
        q_seed = seed + i          # deterministic per-question seed
        vg = VarGen(q_seed)

        is_competency = (i % 2 == 0)   # alternate: even index → competency
        topic = _TOPICS[i % len(_TOPICS)]
        gen_fn = _TOPIC_GENERATORS[topic]

        q = gen_fn(vg, competency=is_competency)
        questions.append(q)

    return questions


# ─────────────────────────────────────────────
#  CLI smoke-test
# ─────────────────────────────────────────────

if __name__ == "__main__":
    batch = generate_batch(seed=42, n=10)
    for q in batch:
        tag = "COMPETENCY" if q.is_competency else "STANDARD"
        print(f"[{tag}] {q.topic} | Marks:{q.marks} | Bloom:{q.blooms_level}")
        print(f"  Q: {q.question_text[:120]}")
        print(f"  A: {q.final_answer}")
        print()