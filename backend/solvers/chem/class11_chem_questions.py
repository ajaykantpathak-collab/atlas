"""
DETERMINISTIC question generator for ISC CHEM C11.
Pure Python + sympy randomization only. No paid services, no LLM calls.
"""
try:
    from solvers.solver_maths_c12 import Step, SolverResult
except ImportError:
    from solvers.base import Step, SolverResult


import random
import json
import math
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional
try:
    from solvers.solver_chem_c11 import SOLVER_REGISTRY
except ImportError:
    SOLVER_REGISTRY = {}

# ---------------------------------------------------------------------------
# Data Lists
# ---------------------------------------------------------------------------
INDIAN_NAMES = [
    "Arjun Mehta", "Priya Sharma", "Rahul Verma", "Ananya Iyer",
    "Vikram Singh", "Kavya Reddy", "Rohan Kapoor", "Sneha Nair",
    "Aditya Joshi", "Meera Patel", "Karthik Rao", "Divya Gupta",
    "Siddharth Malhotra", "Nisha Chatterjee", "Amit Thakur", "Riya Banerjee",
    "Sanjay Pillai", "Pooja Desai", "Deepak Saxena", "Ishita Menon",
]

INDIAN_PLACES = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Bhopal", "Chandigarh",
    "Kochi", "Visakhapatnam", "Coimbatore", "Nagpur", "Indore", "Surat",
    "Varanasi", "Guwahati",
]

INDIAN_CONTEXTS = {
    "festivals": ["Diwali", "Holi", "Pongal", "Onam", "Durga Puja", "Ganesh Chaturthi", "Baisakhi", "Eid", "Christmas", "Raksha Bandhan"],
    "railways": ["Rajdhani Express", "Shatabdi Express", "Vande Bharat", "Dadar-Bangalore Ubl Express", "Howrah-Mumbai Mail"],
    "sports": ["IPL cricket match at Wankhede", "Hockey India League", "Pro Kabaddi League", "Santosh Trophy", "Ranji Trophy match"],
    "food": ["masala dosa", "biryani", "chole bhature", "poha", "dhokla", "pav bhaji", "idli sambar", "rogan josh"],
    "companies": ["Tata Motors", "Reliance Industries", "ISRO", "DRDO", "ONGC", "IIT Bombay", "AIIMS Delhi", "BHEL"],
    "finance": ["GST council meeting", "RBI repo rate revision", "SBI branch audit", "NITI Aayog report", "SEBI compliance check"],
    "environment": ["Swachh Bharat Abhiyan", "Namami Gange", "National Air Quality Index", "Coal India mining site", "NTPC thermal plant"],
}


# ---------------------------------------------------------------------------
# Variable Generator
# ---------------------------------------------------------------------------
class VarGen:
    """Seeded random variable generator for deterministic question creation."""

    def __init__(self, seed: int):
        self.rng = random.Random(seed)

    def int(self, lo: int, hi: int) -> int:
        return self.rng.randint(lo, hi)

    def float(self, lo: float, hi: float, dp: int = 2) -> float:
        return round(self.rng.uniform(lo, hi), dp)

    def choice(self, seq: list):
        return self.rng.choice(seq)

    def sample(self, seq: list, k: int) -> list:
        return self.rng.sample(seq, k)

    def shuffle(self, seq: list) -> list:
        s = seq[:]
        self.rng.shuffle(s)
        return s

    def bool(self, p: float = 0.5) -> bool:
        return self.rng.random() < p


# ---------------------------------------------------------------------------
# GeneratedQuestion dataclass
# ---------------------------------------------------------------------------
@dataclass
class GeneratedQuestion:
    question_id: str
    node_id: str
    problem_type_id: str
    topic: str
    question_text: str
    marks: int
    difficulty: str
    is_competency: bool
    blooms_level: str
    misconception_tags: List[str]
    variables: Dict[str, Any]
    model_answer: Any
    solution_steps: List[Dict[str, Any]]
    final_answer: Any
    seed: int


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
BLOOMS_LEVELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"]
DIFFICULTIES = ["Easy", "Medium", "Hard"]
COMPETENCY_MARKS_POOL = [3, 4, 5, 6]
STANDARD_MARKS_POOL = [1, 2, 3, 4]
COMPETENCY_BLOOMS = ["Apply", "Analyze", "Evaluate", "Create"]
STANDARD_BLOOMS = ["Remember", "Understand", "Apply"]

MISCONCEPTION_POOL = {
    "Basic Concepts": ["confuses-mole-mass", "avogadro-number-errors", "molarity-molality-confusion", "stoichiometry-balance-error"],
    "Atomic Structure": ["bohr-model-limitation", "quantum-numbers-mixing", "isotope-mass-confusion", "debroglie-wavelength-misconception"],
    "Periodic Table": ["periodic-trend-direction", "ionization-energy-anomaly", "electron-affinity-trend", "lanthanide-contraction-ignored"],
    "Chemical Bonding": ["ionic-covalent-confusion", "hybridization-miscount", "vsepr-shape-error", "bond-order-mistake"],
    "Thermodynamics": ["sign-convention-error", "deltaH-deltaU-confusion", "gibbs-free-energy-criterion", "enthalpy-entropy-tradeoff"],
    "Equilibrium": ["kc-kp-confusion", "lechatelier-direction", "common-ion-effect-ignored", "buffer-capacity-misconception"],
    "Redox": ["oxidation-number-rule", "balancing-redox-identification", "equivalents-concept", "electrode-potential-sign"],
    "Hydrogen": ["hydrogen-position-debate", "hydride-type-confusion", "water-gas-shift-reaction", "hydrogen-storage-challenge"],
    "s-Block": ["alkaline-earth-solubility", "group1-group2-comparison", "lithium-anomaly", "carbonate-stability"],
    "p-Block": ["boron-allotrope-confusion", "nitrogen-family-oxidation", "phosphorus-allotrope-mixup", "sulphur-oxoacid-strength"],
    "Organic Basics": ["iupac-naming-confusion", "hybridization-in-organic", "isomer-type-mixup", "functional-group-priority"],
    "Hydrocarbons": ["alkane-reaction-type", "alkene-addition-regioselectivity", "alkyne-acidity", "aromaticity-huckel-rule"],
}


def _next_id(seed: int, topic: str, idx: int) -> str:
    return f"C11-{topic[:3].upper()}-{seed:04d}-{idx:03d}"


# ---------------------------------------------------------------------------
# SOLVER DISPATCH HELPER
# ---------------------------------------------------------------------------
def _call_solver(solver_name: str, variables: Dict[str, Any]) -> SolverResult:
    fn = SOLVER_REGISTRY[solver_name]
    return fn(**variables)


# ---------------------------------------------------------------------------
# Topic: Basic Concepts
# ---------------------------------------------------------------------------
def gen_basic_concepts_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Basic Concepts"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)

    if competency:
        topic = "Basic Concepts"
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        name = vg.choice(INDIAN_NAMES)
        place = vg.choice(INDIAN_PLACES)
        company = vg.choice(INDIAN_CONTEXTS["companies"])
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            mass = vg.float(10, 200, 1)
            molar_mass = vg.float(20, 200, 1)
            n_moles = round(mass / molar_mass, 4)
            n_particles = round(n_moles * 6.022e23, 2)
            question_text = (
                f"{name}, a chemical engineer at {company} in {place}, needs to determine "
                f"how many molecules are present in {mass} g of a substance with molar mass "
                f"{molar_mass} g/mol. Using Avogadro's number (6.022 × 10²³ mol⁻¹), calculate "
                f"the number of molecules. Discuss the significance of this calculation in "
                f"industrial quality control."
            )
            variables = {"mass": mass, "molar_mass": molar_mass}
            solver_name = "basic_concepts_mole_particles"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            vol1 = vg.float(50, 500, 1)
            m1 = vg.float(2, 15, 2)
            vol2 = vg.float(100, 1000, 1)
            m2 = round(m1 * vol1 / vol2, 4)
            question_text = (
                f"A pharmaceutical lab in {place} run by {name} prepared {vol1} mL of "
                f"a solution with molarity {m1} M. For a clinical trial, the solution must "
                f"be diluted to {vol2} mL. Calculate the new molarity. Explain why molarity "
                f"changes with temperature while molality does not."
            )
            variables = {"volume_initial_ml": vol1, "molarity_initial": m1, "volume_final_ml": vol2}
            solver_name = "basic_concepts_dilution"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            mass_fe = vg.float(10, 100, 1)
            pct = vg.float(60, 95, 1)
            mass_ore = round(mass_fe / (pct / 100), 2)
            question_text = (
                f"{name} works at an iron ore processing plant in {place}. The plant "
                f"needs {mass_fe} kg of pure iron. If the ore contains {pct}% iron by mass, "
                f"calculate the minimum mass of ore required. Discuss the economic implications "
                f"of ore grade in the context of the Indian mining sector."
            )
            variables = {"mass_component": mass_fe, "mass_total": mass_ore}
            solver_name = "basic_concepts_percentage_composition"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            eq_wt = vg.float(20, 200, 1)
            n_factor = vg.int(1, 6)
            molar_mass_calc = round(eq_wt * n_factor, 2)
            question_text = (
                f"In a quality control lab at {company}, {place}, chemist {name} determined "
                f"the equivalent weight of an acid as {eq_wt} g/equiv. If the n-factor is "
                f"{n_factor}, calculate the molar mass of the acid. Explain how equivalent "
                f"weight concept simplifies redox titrations."
            )
            variables = {"equivalent_weight": eq_wt, "n_factor": n_factor}
            solver_name = "basic_concepts_equivalent_weight"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            mass = vg.float(5, 100, 1)
            mol_wt = vg.float(20, 200, 2)
            n = round(mass / mol_wt, 4)
            particles = round(n * 6.022e23, 2)
            question_text = (
                f"Calculate the number of molecules in {mass} g of a substance with "
                f"molar mass {mol_wt} g/mol. (Avogadro's number = 6.022 × 10²³ mol⁻¹)"
            )
            variables = {"mass": mass, "molar_mass": mol_wt}
            solver_name = "basic_concepts_mole_particles"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            v1 = vg.float(20, 200, 1)
            c1 = vg.float(1, 10, 2)
            v2 = vg.float(200, 1000, 1)
            c2 = round(c1 * v1 / v2, 4)
            question_text = (
                f"A solution of volume {v1} mL has concentration {c1} M. What will be "
                f"the concentration if it is diluted to {v2} mL?"
            )
            variables = {"volume_initial_ml": v1, "molarity_initial": c1, "volume_final_ml": v2}
            solver_name = "basic_concepts_dilution"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            mass_sub = vg.float(10, 100, 1)
            mass_total = vg.float(50, 500, 1)
            pct_val = round((mass_sub / mass_total) * 100, 2)
            question_text = (
                f"In a mixture of {mass_total} g, {mass_sub} g is of component A. "
                f"Calculate the percentage composition of A by mass."
            )
            variables = {"mass_component": mass_sub, "mass_total": mass_total}
            solver_name = "basic_concepts_percentage_composition"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            eq = vg.float(15, 150, 2)
            nf = vg.int(1, 5)
            mm = round(eq * nf, 2)
            question_text = (
                f"The equivalent weight of a base is {eq} g/equivalent and its n-factor is {nf}. "
                f"Calculate its molar mass."
            )
            variables = {"equivalent_weight": eq, "n_factor": nf}
            solver_name = "basic_concepts_equivalent_weight"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic := "Basic Concepts", idx),
        node_id="C11-BC",
        problem_type_id="bc-01",
        topic="Basic Concepts",
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Atomic Structure
# ---------------------------------------------------------------------------
def gen_atomic_structure_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Atomic Structure"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Atomic Structure"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)
        place = vg.choice(INDIAN_PLACES)

        if sub_type == 0:
            Z = vg.int(20, 35)
            n_shell = vg.int(2, 5)
            velocity = round(2.187e6 / n_shell, 4)
            question_text = (
                f"{name}, a researcher at {vg.choice(INDIAN_CONTEXTS['companies'])}, {place}, "
                f"is studying element with atomic number Z={Z}. If an electron occupies shell n={n_shell}, "
                f"calculate its velocity using Bohr's model (v = 2.187 × 10⁶/n m/s). "
                f"Discuss the limitations of Bohr's model for multi-electron atoms."
            )
            variables = {"Z": Z, "n_shell": n_shell}
            solver_name = "atomic_bohr_velocity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            p = float(vg.rng.uniform(1e-12, 5e-12))
            h = 6.626e-34
            c = 3e8
            lambda_val = round(h / (p * c), 10)
            question_text = (
                f"A student in {place} named {name} measured the momentum of an electron as "
                f"{p} kg·m/s. Calculate its de Broglie wavelength. (h = 6.626 × 10⁻³⁴ J·s). "
                f"Explain why electron microscopes achieve higher resolution than optical microscopes."
            )
            variables = {"momentum": p}
            solver_name = "atomic_debroglie_wavelength"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            n = vg.int(3, 6)
            l_val = vg.int(0, n - 1)
            ml = vg.int(-l_val, l_val)
            question_text = (
                f"For an electron with principal quantum number n={n}, azimuthal quantum "
                f"number l={l_val}, list all possible magnetic quantum numbers (mₗ). "
                f"How many orbitals does this subshell contain? Relate this to {vg.choice(INDIAN_CONTEXTS['environment'])} "
                f"spectral analysis techniques."
            )
            variables = {"n": n, "l_val": l_val}
            solver_name = "atomic_quantum_numbers"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            z = vg.int(11, 18)
            question_text = (
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])}, {place}, needs the electronic configuration "
                f"of element with atomic number {z} and its most probable oxidation states. "
                f"Analyze how the electronic configuration determines the chemical behaviour of this element."
            )
            variables = {"Z": z}
            solver_name = "atomic_electronic_config"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            n = vg.int(1, 5)
            velocity_val = round(2.187e6 / n, 4)
            question_text = f"Calculate the velocity of an electron in the n={n} shell according to Bohr's model."
            variables = {"n_shell": n}
            solver_name = "atomic_bohr_velocity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            p_val = float(vg.rng.uniform(1e-12, 5e-12))
            question_text = f"Calculate the de Broglie wavelength of a particle with momentum {p_val} kg·m/s. (h = 6.626 × 10⁻³⁴ J·s)"
            variables = {"momentum": p_val}
            solver_name = "atomic_debroglie_wavelength"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            n_q = vg.int(3, 6)
            l_q = vg.int(0, n_q - 1)
            question_text = f"List all possible values of the magnetic quantum number (mₗ) for n={n_q} and l={l_q}. How many orbitals are there?"
            variables = {"n": n_q, "l_val": l_q}
            solver_name = "atomic_quantum_numbers"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            z_val = vg.int(1, 20)
            question_text = f"Write the ground-state electronic configuration of the element with Z = {z_val}."
            variables = {"Z": z_val}
            solver_name = "atomic_electronic_config"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-AS",
        problem_type_id="as-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Periodic Table
# ---------------------------------------------------------------------------
def gen_periodic_table_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Periodic Table"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Periodic Table"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)
        place = vg.choice(INDIAN_PLACES)

        if sub_type == 0:
            elem1 = vg.choice(["Li", "Na", "K", "Rb"])
            elem2 = vg.choice(["Be", "Mg", "Ca", "Sr"])
            question_text = (
                f"{name}, a geologist in {place}, collected rock samples containing {elem1} and "
                f"{elem2}. Compare their first ionization energies and atomic radii. "
                f"Explain the trend down the group and across the period in the context of "
                f"{vg.choice(INDIAN_CONTEXTS['environment'])} mineral composition analysis."
            )
            variables = {"element1": elem1, "element2": elem2}
            solver_name = "periodic_trend_comparison"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            ie1 = vg.float(400, 900, 1)
            ie2 = vg.float(1000, 2500, 1)
            question_text = (
                f"In an experiment at {place}, {name} measured successive ionization energies "
                f"of an unknown element: IE₁ = {ie1} kJ/mol, IE₂ = {ie2} kJ/mol. "
                f"Identify the group of the element and justify your answer. "
                f"Relate this to {vg.choice(INDIAN_CONTEXTS['companies'])} material selection."
            )
            variables = {"IE1": ie1, "IE2": ie2}
            solver_name = "periodic_ionization_energy_group"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            r1 = vg.float(50, 200, 1)
            r2 = vg.float(20, 150, 1)
            period1 = vg.int(3, 4)
            period2 = vg.int(3, 4)
            group1 = vg.int(1, 18)
            group2 = vg.int(1, 18)
            question_text = (
                f"Compare the atomic radii of two elements: one from period {period1}, group {group1} "
                f"with radius {r1} pm, and another from period {period2}, group {group2} with radius {r2} pm. "
                f"Explain the factors affecting atomic size. Discuss relevance to "
                f"{vg.choice(INDIAN_CONTEXTS['companies'])} alloy design."
            )
            variables = {"radius1": r1, "period1": period1, "group1": group1,
                         "radius2": r2, "period2": period2, "group2": group2}
            solver_name = "periodic_atomic_radius_trend"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            en1 = vg.float(1.0, 3.5, 2)
            en2 = vg.float(1.5, 4.0, 2)
            question_text = (
                f"{name} is comparing electronegativity values of two elements: χ₁ = {en1} "
                f"(Pauling) and χ₂ = {en2}. Predict the bond type and polarity between them. "
                f"Discuss implications for {vg.choice(INDIAN_CONTEXTS['environment'])} corrosion resistance."
            )
            variables = {"electronegativity1": en1, "electronegativity2": en2}
            solver_name = "periodic_electronegativity_bond"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            g = vg.int(1, 18)
            p = vg.int(2, 7)
            question_text = f"State the general trend in atomic radius as you move from group {g} to group {g+1} in period {p}."
            variables = {"group": g, "period": p}
            solver_name = "periodic_atomic_radius_trend"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            ie = vg.float(400, 2000, 1)
            ie2 = round(ie * vg.float(1.8, 3.2, 2), 1)
            question_text = (f"Explain why the first ionization energy of an element is "
                             f"{ie} kJ/mol and its second ionization energy is {ie2} kJ/mol. "
                             f"Which group does it likely belong to?")
            variables = {"IE1": ie, "IE2": ie2}
            solver_name = "periodic_ionization_energy_group"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            en_val = vg.float(1.0, 4.0, 2)
            question_text = f"Define electronegativity. If element A has electronegativity {en_val} (Pauling), predict the nature of its bond with hydrogen."
            variables = {"electronegativity1": en_val, "electronegativity2": 2.20}
            solver_name = "periodic_electronegativity_bond"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            z_val = vg.int(1, 36)
            question_text = f"Write the periodic table group and period for element with Z = {z_val}. State its block."
            variables = {"Z": z_val}
            solver_name = "periodic_group_period"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-PT",
        problem_type_id="pt-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Chemical Bonding
# ---------------------------------------------------------------------------
def gen_chemical_bonding_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Chemical Bonding"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Chemical Bonding"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)

        if sub_type == 0:
            en_a = vg.float(0.7, 2.0, 2)
            en_b = vg.float(2.5, 4.0, 2)
            diff = round(abs(en_b - en_a), 2)
            question_text = (
                f"{name}, a materials scientist, is designing a new polymer. The electronegativity "
                f"difference between atom A (χ = {en_a}) and atom B (χ = {en_b}) is {diff}. "
                f"Predict the bond type and discuss its relevance to polymer stability in "
                f"{vg.choice(INDIAN_CONTEXTS['environment'])} applications."
            )
            variables = {"electronegativity_A": en_a, "electronegativity_B": en_b}
            solver_name = "bonding_bond_type_prediction"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            central = vg.choice(["C", "N", "O", "S"])
            bonds = vg.int(2, 4)
            lone_pairs = vg.int(0, 2)
            question_text = (
                f"Determine the hybridization and molecular geometry of {central} with {bonds} bond pairs "
                f"and {lone_pairs} lone pair(s). {name} at {vg.choice(INDIAN_PLACES)} uses this to design "
                f"molecular sensors for {vg.choice(INDIAN_CONTEXTS['food'])} quality testing."
            )
            variables = {"central_atom": central, "bond_pairs": bonds, "lone_pairs": lone_pairs}
            solver_name = "bonding_vsepr_geometry"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            bond_order = vg.int(1, 3)
            question_text = (
                f"Calculate bond order and bond length for a diatomic molecule with bond order {bond_order}. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} correlates this with thermal conductivity "
                f"for {vg.choice(INDIAN_CONTEXTS['environment'])} sensor materials."
            )
            variables = {"bond_order": bond_order}
            solver_name = "bonding_bond_order_length"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            hyb = vg.choice(["sp", "sp2", "sp3", "dsp2"])
            bond_angle = vg.float(90, 180, 1)
            question_text = (
                f"A molecule shows {hyb} hybridization with bond angle {bond_angle}°. "
                f"{name} in {vg.choice(INDIAN_PLACES)} uses this geometry to design "
                f"catalysts for {vg.choice(INDIAN_CONTEXTS['companies'])}. Explain how VSEPR "
                f"theory predicts this geometry."
            )
            _hb = {"sp": (2, 0), "sp2": (3, 0), "sp3": (4, 0)}
            _bp, _lp = _hb.get(hyb, (4, 0))
            variables = {"bond_pairs": _bp, "lone_pairs": _lp,
                         "hybridization": hyb, "bond_angle": bond_angle}
            solver_name = "bonding_vsepr_geometry"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            en_a = vg.float(0.7, 3.5, 2)
            en_b = vg.float(0.7, 3.5, 2)
            question_text = f"Given electronegativity values χ(A) = {en_a}, χ(B) = {en_b}, predict the bond type between A and B."
            variables = {"electronegativity_A": en_a, "electronegativity_B": en_b}
            solver_name = "bonding_bond_type_prediction"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            central_b = vg.choice(["C", "N", "O", "S"])
            bps = vg.int(2, 4)
            lps = vg.int(0, 2)
            question_text = f"Predict the shape and hybridization of {central_b} with {bps} bond pairs and {lps} lone pair(s)."
            variables = {"central_atom": central_b, "bond_pairs": bps, "lone_pairs": lps}
            solver_name = "bonding_vsepr_geometry"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            bo = vg.int(1, 3)
            question_text = f"Write the bond order for a diatomic molecule with bond order {bo}. Relate it to bond length."
            variables = {"bond_order": bo}
            solver_name = "bonding_bond_order_length"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            h = vg.choice(["sp", "sp2", "sp3"])
            ba = vg.float(90, 180, 1)
            question_text = f"What is the expected bond angle for a molecule with {h} hybridization? If observed angle is {ba}°, explain the deviation."
            _hb = {"sp": (2, 0), "sp2": (3, 0), "sp3": (4, 0)}
            _bp, _lp = _hb.get(h, (4, 0))
            variables = {"bond_pairs": _bp, "lone_pairs": _lp,
                         "hybridization": h, "bond_angle": ba}
            solver_name = "bonding_vsepr_geometry"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-CB",
        problem_type_id="cb-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Thermodynamics
# ---------------------------------------------------------------------------
def gen_thermodynamics_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Thermodynamics"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Thermodynamics"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)

        if sub_type == 0:
            q = vg.float(100, 5000, 1)
            delta_h = vg.float(-500, -50, 1)
            question_text = (
                f"An industrial furnace at {vg.choice(INDIAN_PLACES)} operated by {name} releases "
                f"{q} kJ of heat at constant pressure. If the enthalpy change ΔH = {delta_h} kJ, "
                f"calculate the work done and internal energy change (ΔU). "
                f"Discuss energy efficiency in {vg.choice(INDIAN_CONTEXTS['companies'])} power generation."
            )
            variables = {"q_heat": q, "delta_H": delta_h}
            solver_name = "thermo_deltaH_deltaU"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            delta_h_rxn = vg.float(-300, -20, 1)
            delta_s = vg.float(-50, 150, 2)
            T = vg.int(250, 500)
            delta_g = round(delta_h_rxn - (T * delta_s / 1000), 2)
            spontaneity = "spontaneous" if delta_g < 0 else "non-spontaneous"
            question_text = (
                f"For a chemical process, ΔH = {delta_h_rxn} kJ/mol and ΔS = {delta_s} J/(mol·K). "
                f"At T = {T} K, calculate ΔG and determine if the reaction is spontaneous. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses this analysis for process optimization."
            )
            variables = {"delta_H": delta_h_rxn, "delta_S": delta_s, "T": T}
            solver_name = "thermo_gibbs_free_energy"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            cp = vg.float(0.5, 5, 2)
            mass_m = vg.float(10, 200, 1)
            delta_t = vg.float(10, 100, 1)
            q_val = round(cp * mass_m * delta_t, 2)
            question_text = (
                f"A calorimetry experiment at {vg.choice(INDIAN_PLACES)} by {name} uses {mass_m} g of "
                f"a substance (Cp = {cp} J/(g·K)). The temperature rises by {delta_t} K. "
                f"Calculate heat absorbed. Discuss specific heat capacity in "
                f"{vg.choice(INDIAN_CONTEXTS['companies'])} thermal management."
            )
            variables = {"Cp": cp, "mass": mass_m, "delta_T": delta_t}
            solver_name = "thermo_heat_capacity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            H1 = vg.float(100, 500, 1)
            H2 = vg.float(200, 800, 1)
            H3 = vg.float(50, 300, 1)
            delta_h_net = round(H1 - H2 + H3, 2)
            question_text = (
                f"Given reactions: (1) ΔH = {H1} kJ, (2) ΔH = {H2} kJ, (3) ΔH = {H3} kJ. "
                f"Using Hess's Law, find ΔH for the net reaction A + 2B → C. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} applies this to "
                f"fuel cycle analysis for {vg.choice(INDIAN_CONTEXTS['environment'])}."
            )
            variables = {"H1": H1, "H2": H2, "H3": H3}
            solver_name = "thermo_hess_law"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            q_val = vg.float(100, 5000, 1)
            dh = vg.float(-500, -50, 1)
            question_text = f"A system at constant pressure releases {q_val} kJ of heat with ΔH = {dh} kJ. Calculate ΔU and work done."
            variables = {"q_heat": q_val, "delta_H": dh}
            solver_name = "thermo_deltaH_deltaU"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            dh_val = vg.float(-300, -20, 1)
            ds_val = vg.float(-50, 150, 2)
            t_val = vg.int(250, 500)
            question_text = f"At T = {t_val} K, ΔH = {dh_val} kJ/mol, ΔS = {ds_val} J/(mol·K). Calculate ΔG and state if spontaneous."
            variables = {"delta_H": dh_val, "delta_S": ds_val, "T": t_val}
            solver_name = "thermo_gibbs_free_energy"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            cp_val = vg.float(0.5, 5, 2)
            m_val = vg.float(10, 200, 1)
            dt_val = vg.float(10, 100, 1)
            question_text = f"Calculate heat absorbed by {m_val} g of substance (Cp = {cp_val} J/g·K) when heated by {dt_val} K."
            variables = {"Cp": cp_val, "mass": m_val, "delta_T": dt_val}
            solver_name = "thermo_heat_capacity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            h1 = vg.float(100, 500, 1)
            h2 = vg.float(200, 800, 1)
            h3 = vg.float(50, 300, 1)
            question_text = f"Using Hess's Law with ΔH₁={h1} kJ, ΔH₂={h2} kJ, ΔH₃={h3} kJ, find ΔH for A + 2B → C."
            variables = {"H1": h1, "H2": h2, "H3": h3}
            solver_name = "thermo_hess_law"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-TD",
        problem_type_id="td-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Equilibrium
# ---------------------------------------------------------------------------
def gen_equilibrium_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Equilibrium"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Equilibrium"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)
        place = vg.choice(INDIAN_PLACES)

        if sub_type == 0:
            Kc = vg.float(0.1, 100, 2)
            question_text = (
                f"For the reaction N₂ + 3H₂ ⇌ 2NH₃, Kc = {Kc} at a given temperature. "
                f"{name}, a process engineer at {place}, needs to predict the yield of ammonia "
                f"in the Haber process. Calculate the equilibrium concentrations starting from "
                f"1 M N₂ and 3 M H₂. Discuss industrial optimization for "
                f"{vg.choice(INDIAN_CONTEXTS['companies'])} fertilizer production."
            )
            variables = {"Kc": Kc}
            solver_name = "equilibrium_kc_calculation"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            Ka = float('%.6g' % vg.rng.uniform(1e-5, 1e-3))
            conc = vg.float(0.01, 0.5, 3)
            pH = round(-math.log10(math.sqrt(Ka * conc)), 2)
            question_text = (
                f"{name} in {place} is analyzing an acetic acid solution with Ka = {Ka} and "
                f"initial concentration {conc} M. Calculate the pH. Discuss buffer design for "
                f"{vg.choice(INDIAN_CONTEXTS['food'])} preservation using Henderson-Hasselbalch equation."
            )
            variables = {"Ka": Ka, "concentration": conc}
            solver_name = "equilibrium_weak_acid_ph"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            Ksp = float('%.6g' % vg.rng.uniform(1e-10, 1e-6))
            conc_ion = vg.float(0.001, 0.1, 4)
            solubility = round(Ksp / conc_ion, 8)
            question_text = (
                f"The Ksp of AgCl is {Ksp}. In a solution containing {conc_ion} M Cl⁻ ions, "
                f"calculate the solubility of AgCl. {name} at {vg.choice(INDIAN_CONTEXTS['companies'])} "
                f"uses this for selective precipitation in wastewater treatment."
            )
            variables = {"Ksp": Ksp, "common_ion_concentration": conc_ion}
            solver_name = "equilibrium_ksp_solubility"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            ph1 = vg.float(1, 6, 2)
            ph2 = vg.float(8, 13, 2)
            poh2 = round(14 - ph2, 2)
            question_text = (
                f"A buffer solution is prepared by mixing a weak acid (pKa ≈ {ph1}) and its "
                f"conjugate base. Calculate the pH of the resulting buffer. Relate this to "
                f"{vg.choice(INDIAN_CONTEXTS['companies'])} biochemical process control at pH {ph2}."
            )
            variables = {"pH_acid": ph1, "pH_base": ph2}
            solver_name = "equilibrium_buffer_ph"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            kc_val = vg.float(0.1, 100, 2)
            question_text = f"For a reaction with Kc = {kc_val}, calculate equilibrium concentrations from initial 1 M reactants."
            variables = {"Kc": kc_val}
            solver_name = "equilibrium_kc_calculation"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            ka_val = float('%.6g' % vg.rng.uniform(1e-5, 1e-3))
            c_val = vg.float(0.01, 0.5, 3)
            question_text = f"Calculate pH of a {c_val} M weak acid solution with Ka = {ka_val}."
            variables = {"Ka": ka_val, "concentration": c_val}
            solver_name = "equilibrium_weak_acid_ph"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            ksp_val = float('%.6g' % vg.rng.uniform(1e-10, 1e-6))
            ci_val = vg.float(0.001, 0.1, 4)
            question_text = f"Calculate solubility of a salt with Ksp = {ksp_val} in {ci_val} M common ion solution."
            variables = {"Ksp": ksp_val, "common_ion_concentration": ci_val}
            solver_name = "equilibrium_ksp_solubility"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            question_text = "State Le Chatelier's principle and predict the effect of: (i) increasing temperature for exothermic reaction, (ii) adding inert gas at constant volume."
            variables = {}
            solver_name = "equilibrium_le_chatelier"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-EQ",
        problem_type_id="eq-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Redox
# ---------------------------------------------------------------------------
def gen_redox_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Redox"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Redox"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)
        place = vg.choice(INDIAN_PLACES)

        if sub_type == 0:
            mass_sample = vg.float(0.5, 5, 2)
            normality = vg.float(0.1, 2, 2)
            vol = vg.float(10, 100, 1)
            eq = round(normality * vol / 1000, 4)
            question_text = (
                f"{name} in a quality control lab at {vg.choice(INDIAN_PLACES)} titrated "
                f"{mass_sample} g of an iron ore sample with {vol} mL of {normality} N KMnO₄. "
                f"Calculate the percentage of iron. Discuss redox titration applications in "
                f"{vg.choice(INDIAN_CONTEXTS['companies'])} process monitoring."
            )
            variables = {"mass_sample": mass_sample, "normality": normality, "volume_ml": vol}
            solver_name = "redox_titration_iron"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            E1 = vg.float(0.3, 0.8, 3)
            E2 = vg.float(-0.2, 0.3, 3)
            E_cell = round(E1 - E2, 3)
            spontaneity = "spontaneous" if E_cell > 0 else "non-spontaneous"
            question_text = (
                f"A galvanic cell at {vg.choice(INDIAN_PLACES)} has E°(cathode) = {E1} V and "
                f"E°(anode) = {E2} V. Calculate E°cell and predict spontaneity. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} designs batteries using this principle."
            )
            variables = {"E_cathode": E1, "E_anode": E2}
            solver_name = "redox_cell_potential"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            moles_e = vg.float(0.1, 3, 2)
            mass_deposited = round(moles_e * 107.87, 3)
            question_text = (
                f"In an electroplating process, {moles_e} moles of electrons pass through the circuit. "
                f"Calculate the mass of silver deposited (atomic mass = 107.87 g/mol). "
                f"{name} in {place} applies Faraday's laws for "
                f"{vg.choice(INDIAN_CONTEXTS['companies'])} electroplating."
            )
            variables = {"moles_electrons": moles_e}
            solver_name = "redox_faraday_law"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            ox = vg.int(2, 6)
            question_text = (
                f"Balance the redox reaction: MnO₄⁻ + Fe²⁺ → Mn{'+' * (4-ox)}{ox} + Fe³⁺ "
                f"in acidic medium. {name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses "
                f"this for wastewater treatment in {place}."
            )
            variables = {"oxidation_state_Mn": ox}
            solver_name = "redox_balance_reaction"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            n_val = vg.float(0.1, 2, 2)
            v_val = vg.float(10, 100, 1)
            m_sample = vg.float(0.5, 5, 2)
            eq_val = round(n_val * v_val / 1000, 4)
            question_text = f"{m_sample} g sample titrated with {v_val} mL of {n_val} N KMnO₄. Find % Fe."
            variables = {"mass_sample": m_sample, "normality": n_val, "volume_ml": v_val}
            solver_name = "redox_titration_iron"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            ec = vg.float(0.3, 0.8, 3)
            ea = vg.float(-0.2, 0.3, 3)
            question_text = f"Given E°(cathode)={ec} V, E°(anode)={ea} V. Calculate E°cell and spontaneity."
            variables = {"E_cathode": ec, "E_anode": ea}
            solver_name = "redox_cell_potential"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            me = vg.float(0.1, 3, 2)
            question_text = f"Calculate mass of copper deposited when {me} moles of electrons pass. (Cu atomic mass = 63.55 g/mol, n=2)"
            variables = {"moles_electrons": me}
            solver_name = "redox_faraday_law"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            question_text = "Balance: Cr₂O₇²⁻ + I⁻ → Cr³⁺ + I₂ in acidic medium."
            variables = {}
            solver_name = "redox_balance_reaction"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-RX",
        problem_type_id="rx-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Hydrogen
# ---------------------------------------------------------------------------
def gen_hydrogen_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Hydrogen"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Hydrogen"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)

        if sub_type == 0:
            mass_h2 = vg.float(1, 10, 2)
            question_text = (
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} produces {mass_h2} g of H₂ "
                f"via water electrolysis. Calculate the volume at STP and the electrical energy "
                f"required. Discuss hydrogen as a clean fuel for "
                f"{vg.choice(INDIAN_CONTEXTS['environment'])} in India."
            )
            variables = {"mass_H2": mass_h2}
            solver_name = "hydrogen_volume_stp"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            mass_na = vg.float(1, 10, 2)
            mass_h2_react = round(mass_na * 2 / 46, 4)
            question_text = (
                f"{mass_na} g of sodium reacts with water. Calculate the mass of H₂ liberated "
                f"and its volume at STP. {name} at {vg.choice(INDIAN_PLACES)} studies this for "
                f"hydrogen storage applications."
            )
            variables = {"mass_Na": mass_na}
            solver_name = "hydrogen_na_reaction"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            hydride_type = vg.choice(["ionic", "covalent", "metallic"])
            question_text = (
                f"Classify NaH, CH₄, and PdH as ionic, covalent, and metallic hydrides respectively. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} researches {hydride_type} hydrides "
                f"for {vg.choice(INDIAN_CONTEXTS['environment'])} applications."
            )
            variables = {"hydride_type": hydride_type}
            solver_name = "hydrogen_hydride_classification"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            co_vol = vg.float(10, 100, 1)
            h2o_vol = vg.float(5, 50, 1)
            co2_vol = vg.float(5, 50, 1)
            h2_vol = round(co_vol + h2o_vol - co2_vol, 2)
            question_text = (
                f"In water-gas shift reaction, {co_vol} L CO reacts with {h2o_vol} L steam to "
                f"produce {co2_vol} L CO₂. Calculate H₂ produced (all volumes at same T,P). "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} optimizes this for H₂ production."
            )
            variables = {"CO_volume": co_vol, "H2O_volume": h2o_vol, "CO2_volume": co2_vol}
            solver_name = "hydrogen_water_gas_shift"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            m = vg.float(1, 10, 2)
            question_text = f"Calculate the volume of {m} g of H₂ at STP."
            variables = {"mass_H2": m}
            solver_name = "hydrogen_volume_stp"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            m_na = vg.float(1, 10, 2)
            question_text = f"Calculate H₂ produced from {m_na} g Na + H₂O."
            variables = {"mass_Na": m_na}
            solver_name = "hydrogen_na_reaction"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            question_text = "Classify LiH, SiH₄, and CrH as ionic, covalent, and metallic hydrides."
            variables = {"hydride_type": vg.choice(
                ["ionic", "covalent", "metallic", "interstitial"])}
            solver_name = "hydrogen_hydride_classification"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            co_v = vg.float(10, 100, 1)
            h2o_v = vg.float(5, 50, 1)
            co2_v = vg.float(5, 50, 1)
            question_text = f"In water-gas shift reaction: {co_v} L CO + {h2o_v} L H₂O → {co2_v} L CO₂ + H₂. Find H₂ volume."
            variables = {"CO_volume": co_v, "H2O_volume": h2o_v, "CO2_volume": co2_v}
            solver_name = "hydrogen_water_gas_shift"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-HY",
        problem_type_id="hy-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: s-Block
# ---------------------------------------------------------------------------
def gen_s_block_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["s-Block"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "s-Block"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)

        if sub_type == 0:
            mass = vg.float(1, 10, 2)
            question_text = (
                f"{name} in {vg.choice(INDIAN_PLACES)} reacts {mass} g of CaCO₃ with excess HCl. "
                f"Calculate CO₂ produced at STP. Discuss relevance to "
                f"{vg.choice(INDIAN_CONTEXTS['environment'])} carbon capture strategies."
            )
            variables = {"mass_CaCO3": mass}
            solver_name = "sblock_caco3_co2"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            mass_na = vg.float(1, 5, 2)
            solubility = vg.float(10, 50, 1)
            question_text = (
                f"Compare the solubility of Na₂CO₃ and CaCO₃ in water. If {mass_na} g of Na₂CO₃ "
                f"dissolves in {solubility} mL water, calculate molarity. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses this in water softening."
            )
            variables = {"mass_Na2CO3": mass_na, "volume_ml": solubility}
            solver_name = "sblock_solubility_molarity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            Li = vg.choice(["Li", "Na", "K"])
            question_text = (
                f"Explain the anomalous properties of {Li} compared to other alkali metals. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} designs Li-ion batteries based on "
                f"these unique properties for electric vehicles."
            )
            variables = {"lithium_anomaly": Li}
            solver_name = "sblock_lithium_anomaly"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            group = vg.choice(["1", "2"])
            question_text = (
                f"Write the diagonal relationship between Li and Mg. {name} at {vg.choice(INDIAN_PLACES)} "
                f"uses this to explain why Li shows group {group} characteristics. "
                f"Discuss applications in {vg.choice(INDIAN_CONTEXTS['companies'])}."
            )
            variables = {"group": group}
            solver_name = "sblock_diagonal_relationship"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            m_caco3 = vg.float(1, 10, 2)
            question_text = f"Calculate CO₂ volume at STP from {m_caco3} g CaCO₃ + excess HCl."
            variables = {"mass_CaCO3": m_caco3}
            solver_name = "sblock_caco3_co2"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            m_na = vg.float(1, 5, 2)
            v_ml = vg.float(10, 100, 1)
            question_text = f"Calculate molarity when {m_na} g Na₂CO₃ dissolves in {v_ml} mL water."
            variables = {"mass_Na2CO3": m_na, "volume_ml": v_ml}
            solver_name = "sblock_solubility_molarity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            li = vg.choice(["Li", "Na", "K"])
            question_text = f"Explain anomalous behaviour of {li} in group 1."
            variables = {"lithium_anomaly": li}
            solver_name = "sblock_lithium_anomaly"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            question_text = "State the diagonal relationship between Li and Mg with two examples."
            variables = {}
            solver_name = "sblock_diagonal_relationship"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-SB",
        problem_type_id="sb-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: p-Block
# ---------------------------------------------------------------------------
def gen_p_block_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["p-Block"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "p-Block"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)

        if sub_type == 0:
            ox_state = vg.choice(["+3", "+5"])
            question_text = (
                f"Explain why {vg.choice(['B', 'Al'])} exhibits only +3 oxidation state while "
                f"{vg.choice(['N', 'P'])} shows {ox_state}. {name} at {vg.choice(INDIAN_CONTEXTS['companies'])} "
                f"uses this to design semiconductors for {vg.choice(INDIAN_CONTEXTS['environment'])}."
            )
            variables = {"oxidation_state": ox_state}
            solver_name = "pblock_oxidation_states"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            acid = vg.choice(["HNO3", "H2SO4", "H3PO4"])
            strength = vg.choice(["strong", "weak"])
            question_text = (
                f"Explain the acidic strength order: HClO₄ > H₂SO₄ > H₃PO₄. "
                f"{name} at {vg.choice(INDIAN_PLACES)} uses {acid} ({strength} acid) in "
                f"{vg.choice(INDIAN_CONTEXTS['companies'])} manufacturing processes."
            )
            variables = {"acid": acid, "strength": strength}
            solver_name = "pblock_oxoacid_strength"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            nh3 = vg.float(10, 100, 1)
            no = vg.float(5, 50, 1)
            question_text = (
                f"In Ostwald process, {nh3} L NH₃ is oxidized. Calculate theoretical NO yield. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} optimizes this for "
                f"{vg.choice(INDIAN_CONTEXTS['environment'])} nitric acid production."
            )
            variables = {"NH3_volume": nh3, "NO_volume": no}
            solver_name = "pblock_ostwald_process"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            sf6_usage = vg.choice(["insulant", "propellant"])
            question_text = (
                f"Explain the inertness of SF₆ and its use as an {sf6_usage}. "
                f"{name} studies greenhouse gas implications at {vg.choice(INDIAN_PLACES)}."
            )
            variables = {"SF6_usage": sf6_usage}
            solver_name = "pblock_sf6_properties"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            ox = vg.choice(["+3", "+5"])
            question_text = f"Why does {vg.choice(['B', 'N'])} show {ox} oxidation state? Explain with electronic configuration."
            variables = {"oxidation_state": ox}
            solver_name = "pblock_oxidation_states"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            question_text = "Arrange in increasing order of acidic strength: HClO, HClO₂, HClO₃, HClO₄. Justify."
            variables = {}
            solver_name = "pblock_oxoacid_strength"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            nh3_v = vg.float(10, 100, 1)
            question_text = f"Calculate NO produced from {nh3_v} L NH₃ in Ostwald process."
            variables = {"NH3_volume": nh3_v}
            solver_name = "pblock_ostwald_process"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            question_text = "Explain why SF₆ is chemically inert. Give two uses."
            variables = {}
            solver_name = "pblock_sf6_properties"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-PB",
        problem_type_id="pb-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Organic Basics
# ---------------------------------------------------------------------------
def gen_organic_basics_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Organic Basics"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Organic Basics"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)

        if sub_type == 0:
            parent = vg.choice(["methane", "ethane", "propane", "butane"])
            functional = vg.choice(["ol", "al", "one", "oic acid"])
            question_text = (
                f"{name} in a pharma lab at {vg.choice(INDIAN_PLACES)} needs to name "
                f"{parent} derivative with -{functional} group following IUPAC rules. "
                f"Discuss the nomenclature for {vg.choice(INDIAN_CONTEXTS['companies'])} "
                f"drug registration compliance."
            )
            variables = {"parent_hydrocarbon": parent, "functional_group": functional}
            solver_name = "organic_iupac_naming"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            func1 = vg.choice(["-OH", "-CHO", "-COOH", "-NH2"])
            func2 = vg.choice(["-Cl", "-Br", "-NO2", "-CH3"])
            question_text = (
                f"Assign priority between {func1} and {func2} as principal functional group. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses this for "
                f"{vg.choice(INDIAN_CONTEXTS['food'])} additive nomenclature."
            )
            variables = {"functional_group1": func1, "functional_group2": func2}
            solver_name = "organic_priority_rules"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            carbon_count = vg.int(2, 8)
            question_text = (
                f"Find number of structural isomers for C{carbon_count}H₂ₙ₊₂. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} studies isomer distribution "
                f"in {vg.choice(INDIAN_CONTEXTS['food'])} flavor compounds."
            )
            variables = {"carbon_count": carbon_count}
            solver_name = "organic_isomer_count"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            hybrid = vg.choice(["sp3", "sp2", "sp"])
            question_text = (
                f"Determine hybridization of carbon in benzene ring ({hybrid} carbons). "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses this to design "
                f"organic semiconductors for {vg.choice(INDIAN_CONTEXTS['environment'])} sensors."
            )
            variables = {"hybridization": hybrid}
            solver_name = "organic_hybridization"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            parent_o = vg.choice(["methane", "ethane", "propane", "butane"])
            func_o = vg.choice(["ol", "al", "one", "oic acid"])
            question_text = f"Give IUPAC name of a {parent_o} derivative with -{func_o} functional group."
            variables = {"parent_hydrocarbon": parent_o, "functional_group": func_o}
            solver_name = "organic_iupac_naming"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            f1 = vg.choice(["-OH", "-COOH", "-CHO"])
            f2 = vg.choice(["-Cl", "-Br", "-CH3"])
            question_text = f"Which has higher priority: {f1} or {f2}? Explain."
            variables = {"functional_group1": f1, "functional_group2": f2}
            solver_name = "organic_priority_rules"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            cc = vg.int(2, 7)
            question_text = f"How many structural isomers are possible for C{cc}H{2*cc+2}?"
            variables = {"carbon_count": cc}
            solver_name = "organic_isomer_count"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            h = vg.choice(["sp3", "sp2", "sp"])
            question_text = f"What is the hybridization of carbon in an alkene ({h})?"
            variables = {"hybridization": h}
            solver_name = "organic_hybridization"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-OB",
        problem_type_id="ob-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Topic: Hydrocarbons
# ---------------------------------------------------------------------------
def gen_hydrocarbons_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    tags = MISCONCEPTION_POOL["Hydrocarbons"]
    misconception = vg.sample(tags, vg.int(1, 2))
    seed = vg.rng.randint(0, 9999)
    idx = vg.int(1, 9999)
    topic = "Hydrocarbons"

    if competency:
        marks = vg.choice(COMPETENCY_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(COMPETENCY_BLOOMS)
        sub_type = vg.int(0, 3)
        name = vg.choice(INDIAN_NAMES)

        if sub_type == 0:
            alkane = vg.choice(["methane", "ethane", "propane", "butane"])
            question_text = (
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} is studying free radical "
                f"substitution of {alkane} with Cl₂. Predict the major product and explain "
                f"the mechanism. Discuss relevance to {vg.choice(INDIAN_CONTEXTS['environment'])} "
                f"chlorination byproducts."
            )
            variables = {"alkane": alkane}
            solver_name = "hydrocarbons_free_radical"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            alkene = vg.choice(["ethene", "propene", "butene"])
            reagent = vg.choice(["HBr", "H2O", "Cl2"])
            question_text = (
                f"Predict the product of {alkene} + {reagent} addition. Apply Markovnikov's rule. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses this for "
                f"{vg.choice(INDIAN_CONTEXTS['food'])} additive synthesis."
            )
            variables = {"alkene": alkene, "reagent": reagent}
            solver_name = "hydrocarbons_addition"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            alkyne = vg.choice(["ethyne", "propyne", "butyne"])
            question_text = (
                f"Explain the acidity of terminal alkyne ({alkyne}) compared to alkene and alkane. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses acetylide chemistry for "
                f"welding applications in {vg.choice(INDIAN_PLACES)}."
            )
            variables = {"alkyne": alkyne}
            solver_name = "hydrocarbons_alkyne_acidity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            ring = vg.choice(["benzene", "toluene", "naphthalene"])
            question_text = (
                f"Explain why {ring} undergoes electrophilic substitution rather than addition. "
                f"{name} at {vg.choice(INDIAN_CONTEXTS['companies'])} uses aromatic chemistry for "
                f"{vg.choice(INDIAN_CONTEXTS['environment'])} dye manufacturing."
            )
            variables = {"aromatic": ring}
            solver_name = "hydrocarbons_aromaticity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    else:
        marks = vg.choice(STANDARD_MARKS_POOL)
        difficulty = vg.choice(DIFFICULTIES)
        blooms = vg.choice(STANDARD_BLOOMS)
        sub_type = vg.int(0, 3)

        if sub_type == 0:
            alk = vg.choice(["methane", "ethane", "propane", "butane"])
            question_text = f"Write the product of chlorination of {alk} via free radical substitution."
            variables = {"alkane": alk}
            solver_name = "hydrocarbons_free_radical"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 1:
            alk = vg.choice(["ethene", "propene", "butene"])
            reag = vg.choice(["HBr", "H2O", "Cl2"])
            question_text = f"Predict product of {alk} + {reag} addition (Markovnikov's rule)."
            variables = {"alkene": alk, "reagent": reag}
            solver_name = "hydrocarbons_addition"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        elif sub_type == 2:
            alk = vg.choice(["ethyne", "propyne"])
            question_text = f"Compare acidity of {alk} with ethene and ethane."
            variables = {"alkyne": alk}
            solver_name = "hydrocarbons_alkyne_acidity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

        else:
            ring_name = vg.choice(["benzene", "toluene"])
            question_text = f"Why does {ring_name} prefer electrophilic substitution over addition? Explain with Hückel's rule."
            variables = {"aromatic": ring_name}
            solver_name = "hydrocarbons_aromaticity"
            result = _call_solver(solver_name, variables)
            steps = [asdict(s) for s in result.steps]
            final = result.final_answer

    return GeneratedQuestion(
        question_id=_next_id(seed, topic, idx),
        node_id="C11-HC",
        problem_type_id="hc-01",
        topic=topic,
        question_text=question_text,
        marks=marks,
        difficulty=difficulty,
        is_competency=competency,
        blooms_level=blooms,
        misconception_tags=misconception,
        variables=variables,
        model_answer=final,
        solution_steps=steps,
        final_answer=final,
        seed=seed,
    )


# ---------------------------------------------------------------------------
# Master dispatch table
# ---------------------------------------------------------------------------
TOPIC_GENERATORS = {
    "Basic Concepts": gen_basic_concepts_problem,
    "Atomic Structure": gen_atomic_structure_problem,
    "Periodic Table": gen_periodic_table_problem,
    "Chemical Bonding": gen_chemical_bonding_problem,
    "Thermodynamics": gen_thermodynamics_problem,
    "Equilibrium": gen_equilibrium_problem,
    "Redox": gen_redox_problem,
    "Hydrogen": gen_hydrogen_problem,
    "s-Block": gen_s_block_problem,
    "p-Block": gen_p_block_problem,
    "Organic Basics": gen_organic_basics_problem,
    "Hydrocarbons": gen_hydrocarbons_problem,
}

TOPICS = list(TOPIC_GENERATORS.keys())


# ---------------------------------------------------------------------------
# Batch generator
# ---------------------------------------------------------------------------
def generate_batch(seed: int, n: int = 20) -> List[GeneratedQuestion]:
    """
    Generate n questions. Approximately 50% competency-based and 50% standard.
    Deterministic for a given seed.
    """
    master_rng = random.Random(seed)
    questions: List[GeneratedQuestion] = []

    # Determine how many competency vs standard
    n_competency = n // 2
    n_standard = n - n_competency

    # Pick which topics get competency vs standard
    competency_topics = master_rng.sample(TOPICS, min(n_competency, len(TOPICS)))
    standard_topics = master_rng.sample(TOPICS, min(n_standard, len(TOPICS)))

    # If we need more, cycle through
    while len(competency_topics) < n_competency:
        competency_topics.append(master_rng.choice(TOPICS))
    while len(standard_topics) < n_standard:
        standard_topics.append(master_rng.choice(TOPICS))

    # Shuffle within each pool
    master_rng.shuffle(competency_topics)
    master_rng.shuffle(standard_topics)

    combined: List[tuple] = []
    ci, si = 0, 0
    for i in range(n):
        if i % 2 == 0 and ci < len(competency_topics):
            combined.append((competency_topics[ci], True))
            ci += 1
        elif si < len(standard_topics):
            combined.append((standard_topics[si], False))
            si += 1
        elif ci < len(competency_topics):
            combined.append((competency_topics[ci], True))
            ci += 1
        else:
            combined.append((standard_topics[si], False))
            si += 1

    # Master_rng is already seeded by seed, so we need per-topic sub-seeds
    sub_seed_rng = random.Random(seed + 1)
    sub_seeds = [sub_seed_rng.randint(0, 999999) for _ in range(n)]

    for i, (topic, is_comp) in enumerate(combined):
        vg = VarGen(sub_seeds[i])
        gen_fn = TOPIC_GENERATORS[topic]
        q = gen_fn(vg, competency=is_comp)
        questions.append(q)

    return questions


# ---------------------------------------------------------------------------
# JSON serialization helper
# ---------------------------------------------------------------------------
def questions_to_json(questions: List[GeneratedQuestion], indent: int = 2) -> str:
    """Serialize a list of GeneratedQuestion objects to JSON string."""
    data = []
    for q in questions:
        qd = asdict(q)
        # Convert any non-serializable values
        for k, v in qd.items():
            if isinstance(v, float):
                qd[k] = v
        data.append(qd)
    return json.dumps(data, indent=indent, ensure_ascii=False)


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import sys
    seed_in = int(sys.argv[1]) if len(sys.argv) > 1 else 42
    n_q = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    batch = generate_batch(seed_in, n_q)
    print(questions_to_json(batch))