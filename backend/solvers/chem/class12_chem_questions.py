"""
Deterministic ISC Chemistry C12 Question Generator
Generates infinite variations of chemistry problems for all ISC C12 topics.
"""

try:
    from solvers.solver_maths_c12 import Step, SolverResult
except ImportError:
    from solvers.base import Step, SolverResult


import random
import math
import datetime

try:
    from solvers.solver_chem_c12 import SOLVER_REGISTRY
except ImportError:
    SOLVER_REGISTRY = {}


# ============================================================================
# CONSTANTS
# ============================================================================

VALID_MARKS = [1, 2, 3, 4, 5, 6]
DIFFICULTIES = ["easy", "medium", "hard"]
BLOOMS_LEVELS = ["L1 Remembering", "L2 Understanding", "L3 Applying",
                 "L4 Analyzing", "L5 Evaluating", "L6 Creating"]
COMPETENCY_CATEGORIES = [
    "ISRO", "DRDO", "Tata", "Reliance", "ISRO-Space",
    "Indian Railways", "Indian Sports", "ISRO-Chandrayaan",
    "Pharmaceutical", "Agricultural"
]

TOPIC_META = {
    "Solid State":          {"abbr": "SS",  "is_hard": False},
    "Solutions":            {"abbr": "SOL", "is_hard": False},
    "Electrochemistry":     {"abbr": "ELEC","is_hard": False},
    "Chemical Kinetics":    {"abbr": "CK",  "is_hard": False},
    "Surface Chemistry":    {"abbr": "SC",  "is_hard": False},
    "Metallurgy":           {"abbr": "MET", "is_hard": False},
    "p-Block":              {"abbr": "PB",  "is_hard": True},
    "d-Block":              {"abbr": "DB",  "is_hard": True},
    "Coordination Compounds":{"abbr":"CC",  "is_hard": True},
    "Haloalkanes":          {"abbr": "HA",  "is_hard": True},
    "Alcohols":             {"abbr": "ALC", "is_hard": True},
    "Aldehydes":            {"abbr": "ALD", "is_hard": True},
    "Amines":               {"abbr": "AMN", "is_hard": True},
    "Biomolecules":         {"abbr": "BM",  "is_hard": False},
}

# Ordered list so round-robin assignment is deterministic
ORDERED_TOPICS = [
    "Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics",
    "Surface Chemistry", "Metallurgy", "p-Block", "d-Block",
    "Coordination Compounds", "Haloalkanes", "Alcohols", "Aldehydes",
    "Amines", "Biomolecules",
]


# ============================================================================
# INDIAN CONTEXT DATA
# ============================================================================

INDIAN_NAMES = [
    "Arjun Mehta", "Priya Sharma", "Rahul Verma", "Ananya Iyer",
    "Karthik Reddy", "Sneha Joshi", "Rohan Gupta", "Kavya Nair",
    "Aditya Kapoor", "Meera Krishnan", "Vikram Singh", "Diya Patel",
    "Siddharth Rao", "Pooja Chatterjee", "Aryan Malhotra", "Riya Das",
    "Nikhil Bhatt", "Tanvi Saxena", "Kabir Oberoi", "Shruti Pillai",
]

INDIAN_PLACES = [
    "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kochi",
    "Chandigarh", "Bhopal", "Guwahati", "Vadodara", "Nagpur",
    "Indore", "Surat", "Kanpur", "Visakhapatnam", "Coimbatore",
]

INDIAN_CONTEXTS = {
    "festivals":   ["Diwali celebration at", "Holi preparations in",
                    "Pongal festival in", "Dussehra event at"],
    "railways":    ["Indian Railways'", "IRCTC's", "Konkan Railway",
                    "Northern Railway zone"],
    "sports":      ["IPL cricket stats from", "World Cup performance of",
                    "Pro Kabaddi League", "ISL football match at"],
    "food":        ["a restaurant in", "a food processing unit at",
                    "a sweet shop in", "a caterer in"],
    "industry":    ["ISRO's", "DRDO's", "Tata Motors'", "Reliance Industries'",
                    "Larsen & Toubro's", "Coal India's", "NTPC's",
                    "Steel Authority of India's"],
    "pharma":      ["Dr. Reddy's Laboratories", "Cipla's manufacturing unit",
                    "Biocon's R&D lab", "Aurobindo Pharma's"],
    "agriculture": ["a farmer in Punjab", "an agricultural co-operative in",
                    "Krishi Vigyan Kendra at", "ICAR research station at"],
    "education":   ["IIT Bombay", "IISc Bengaluru", "JEE coaching in Kota",
                    "an ISC school in"],
    "finance":     ["RBI's latest data on", "GST council's report on",
                    "SEBI guidelines for", "NITI Aayog's report on"],
    "textile":     ["a textile mill in Ahmedabad",
                    "a silk weaving unit in Varanasi",
                    "a cotton factory in Coimbatore"],
}


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def _get_marks(difficulty: str) -> int:
    m = {"easy": 1, "medium": 2, "hard": 3}
    base = m.get(difficulty, 2)
    return min(base + random.randint(0, 1), 6)


def _get_bloom(difficulty: str, is_competency: bool) -> str:
    if is_competency and difficulty in ("medium", "hard"):
        return random.choice(["L3 Applying", "L4 Analyzing", "L5 Evaluating"])
    mapping = {"easy": "L1 Remembering", "medium": "L2 Understanding",
               "hard": "L3 Applying"}
    return mapping.get(difficulty, "L2 Understanding")


def _get_misconceptions(topic: str, difficulty: str) -> list:
    pool = {
        "Solid State":    ["Schottky-Frenkel confusion",
                           "Z vs N_A confusion", "defect count error",
                           "crystal system mix-up"],
        "Solutions":      ["vapour pressure sign error",
                           "Raoult law inapplicability", "colligative miscount",
                           "M vs m confusion"],
        "Electrochemistry": ["anode-cathode reversal",
                             "n-factor error",
                             "Nernst: wrong sign / missing 2.303",
                             "Faraday law mass vs charge"],
        "Chemical Kinetics": ["rate = k[A] for 2nd order",
                              "t½ independent of [A] for all orders",
                              "Arrhenius: wrong log base",
                              "Ea negative sign error"],
        "Surface Chemistry": ["Gibbs sign error",
                              "Langmuir unit confusion",
                              "micelle charge wrong",
                              "Kb confusion"],
        "Metallurgy":     ["Ellingham: wrong crossover reading",
                           "reduction agent vs oxidizing agent",
                           "zone refining direction",
                           "froth floatation reagents"],
        "p-Block":        ["H2SO4 contact process temp wrong",
                           "interhalogen structure",
                           "XeF6 hydrolysis products",
                           "P4O6 vs P4O10 confusion"],
        "d-Block":        ["spin-only μ formula wrong",
                           "t₂g/e_g filling for Ni2+",
                           "unpaired electrons in strong field",
                           "d-orbital count in neutral atom"],
        "Coordination Compounds": ["IUPAC naming order",
                                   "oxidation state wrong",
                                   "CID wrong for link isomers",
                                   "stereoisomer counting"],
        "Haloalkanes":    ["Wurtz coupling: C2 vs C4",
                           "SN1 vs SN2 mechanism mix-up",
                           "percent yield: actual over theoretical",
                           "free radical: propagation vs termination"],
        "Alcohols":       ["oxidation of 1° vs 2° vs 3°",
                           "dehydration regioselectivity",
                           "esterification: acid vs alcohol limit",
                           "combustion enthalpy sign"],
        "Aldehydes":      ["aldol: which enolizes",
                           "Tollens vs Fehling specificity",
                           "aldol vs Cannizzaro",
                           "Schiff base: imine vs enamine"],
        "Amines":         ["Hinsberg: 1° 2° 3° separation",
                           "carbylamine test only 1°",
                           "diazotization temp limit",
                           "Hofmann vs Sandmeyer"],
        "Biomolecules":   ["Fehling: 2Cu2+ per glucose",
                           "Michaelis-Menten: Km = [S] at V½",
                           "enzyme saturation vs substrate conc",
                           "protein denaturation: 1st order"],
    }
    all_tags = pool.get(topic, ["calculation error", "sign error"])
    k = 2 if difficulty == "easy" else 3
    return random.sample(all_tags, min(k, len(all_tags)))


# ============================================================================
# GENERATEDQUESTION DATA CLASS
# ============================================================================

class GeneratedQuestion:
    """
    Structured output for a generated ISC C12 Chemistry question.
    """

    def __init__(self, question_id: str, node_id: str, problem_type_id: str,
                 topic: str, question_text: str, marks: int, difficulty: str,
                 is_competency: bool, blooms_level: str, misconception_tags: list,
                 variables: dict, model_answer: str, solution_steps: list,
                 final_answer: str, seed: int):
        self.question_id        = question_id
        self.node_id            = node_id
        self.problem_type_id    = problem_type_id
        self.topic              = topic
        self.question_text      = question_text
        self.marks              = marks
        self.difficulty         = difficulty
        self.is_competency      = is_competency
        self.blooms_level       = blooms_level
        self.misconception_tags = misconception_tags
        self.variables          = variables
        self.model_answer       = model_answer
        self.solution_steps     = solution_steps
        self.final_answer       = final_answer
        self.seed               = seed

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

    def __repr__(self):
        return (f"GeneratedQuestion(id={self.question_id!r}, "
                f"topic={self.topic!r}, marks={self.marks}, "
                f"competency={self.is_competency}, seed={self.seed})")


# ============================================================================
# VARIABLE GENERATOR (seeded)
# ============================================================================

class VarGen:
    """
    Seeded pseudo-random variable generator.
    Guarantees reproducibility for the same seed.
    """

    def __init__(self, seed: int):
        self._seed = seed
        self.rng   = random.Random(seed)

    def next_seed(self) -> int:
        self._seed += 1
        return self._seed

    def int(self, lo: int, hi: int) -> int:
        return self.rng.randint(lo, hi)

    def float(self, lo: float, hi: float, ndigits: int = 3) -> float:
        return round(self.rng.uniform(lo, hi), ndigits)

    def choice(self, seq: list):
        return self.rng.choice(seq)

    def sample(self, seq: list, k: int) -> list:
        return self.rng.sample(seq, k)

    def shuffle(self, seq: list) -> list:
        s = seq[:]
        self.rng.shuffle(s)
        return s


# ============================================================================
# INTERNAL HELPER — BUILD GeneratedQuestion FROM SolverResult
# ============================================================================

def _pkg(vg: VarGen, topic: str, difficulty: str, is_comp: bool,
         qtext: str, variables: dict, result: SolverResult,
         extra_tags: list = None) -> GeneratedQuestion:
    topic_meta = TOPIC_META.get(topic, {"abbr": "XX", "is_hard": True})
    abbr = topic_meta["abbr"]
    sid  = vg.next_seed()
    qid  = f"C12_{abbr}_{difficulty[0].upper()}_{sid:04d}"
    nid  = f"node_{abbr.lower()}_{sid:06d}"
    ptid = f"prob_{abbr.lower()}"

    marks    = _get_marks(difficulty)
    blooms   = _get_bloom(difficulty, is_comp)
    misc     = _get_misconceptions(topic, difficulty)
    if extra_tags:
        misc = list(set(misc + extra_tags))

    steps = [s.text for s in result.solution_steps if s is not None]

    return GeneratedQuestion(
        question_id        = qid,
        node_id            = nid,
        problem_type_id    = ptid,
        topic              = topic,
        question_text      = qtext,
        marks              = marks,
        difficulty         = difficulty,
        is_competency      = is_comp,
        blooms_level       = blooms,
        misconception_tags = misc,
        variables          = variables,
        model_answer       = result.model_answer,
        solution_steps     = steps,
        final_answer       = result.final_answer,
        seed               = sid,
    )


# ============================================================================
# 1. SOLID STATE
# ============================================================================

def gen_solid_state_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["solid_state_defects"]
    difficulty = vg.choice(DIFFICULTIES)

    if not competency:
        E_defect = vg.float(2.0, 4.0)
        T_K      = vg.int(400, 900)
        N_A      = 6.022e23
        mass_g   = 1.0
        x = (N_A / mass_g) * math.exp(-E_defect * 1000 / (8.314 * T_K))
        n_defects = round(x)
        qtext = (
            f"Silver chloride (AgCl) has a Schottky defect formation energy of "
            f"{E_defect} eV per defect. Calculate the number of Schottky defects "
            f"present in {mass_g} g of AgCl at {T_K} K. "
            f"[Given: N_A = {N_A:.3e} mol⁻¹, 1 eV = {1.602e-19:.3e} J]"
        )
        result = solver_fn(E_defect, T_K, N_A, mass_g)
        variables = {"E_defect_eV": E_defect, "T_K": T_K,
                     "N_A": round(N_A, 3), "mass_g": mass_g}

    else:
        name    = vg.choice(INDIAN_NAMES)
        company = vg.choice(["ISRO", "DRDO", "Tata Advanced Materials"])
        E_defect = vg.float(2.0, 4.0)
        T_K      = vg.int(400, 900)
        mass_g   = vg.float(1.0, 10.0)
        N_A      = 6.022e23
        result   = solver_fn(E_defect, T_K, N_A, mass_g)
        qtext = (
            f"{name}, a materials scientist at {company}, is characterising "
            f"an ionic crystal with a defect formation energy of {E_defect} eV. "
            f"At {T_K} K, how many Schottky defects are present in {mass_g} g "
            f"of the crystal? [N_A = {N_A:.3e} mol⁻¹, 1 eV = 1.602×10⁻¹⁹ J]"
        )
        variables = {"E_defect_eV": E_defect, "T_K": T_K,
                     "N_A": round(N_A, 3), "mass_g": mass_g}

    return _pkg(vg, "Solid State", difficulty, competency, qtext,
                variables, result,
                extra_tags=["defect count formula", "Boltzmann factor"] if not competency else [])


# ============================================================================
# 2. SOLUTIONS
# ============================================================================

def gen_solutions_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["solutions_vp_lowering"]
    difficulty = vg.choice(DIFFICULTIES)

    n_solute   = vg.float(0.1, 2.0)
    n_solvent  = vg.float(1.0, 10.0)
    P_pure     = vg.float(50.0, 150.0)
    P_solution = round(P_pure * (n_solvent / (n_solute + n_solvent)), 2)
    x_solute   = round(n_solute / (n_solute + n_solvent), 4)

    if not competency:
        qtext = (
            f"A solution is prepared by dissolving {n_solute} mol of a non-volatile "
            f"solute in {n_solvent} mol of benzene. The vapour pressure of pure benzene "
            f"is {P_pure} mmHg. The vapour pressure of the solution is {P_solution} mmHg. "
            f"Calculate: (i) the mole fraction of the solute, (ii) the vapour pressure "
            f"lowering, and (iii) verify Raoult's law."
        )
        variables = {"n_solute_mol": n_solute, "n_solvent_mol": n_solvent,
                     "P_pure_mmHg": P_pure, "P_solution_mmHg": P_solution}

    else:
        city      = vg.choice(INDIAN_PLACES)
        festival  = vg.choice(INDIAN_CONTEXTS["festivals"])
        qtext = (
            f"At a {festival} {city}, a perfumer creates a fragrance by dissolving "
            f"{n_solute} mol of a fragrant essence in {n_solvent} mol of ethanol. "
            f"The vapour pressure of pure ethanol is {P_pure} mmHg, falling to "
            f"{P_solution} mmHg in the solution. Determine the mole fraction of the "
            f"essence and comment on why the perfume lasts longer on skin."
        )
        variables = {"n_solute_mol": n_solute, "n_solvent_mol": n_solvent,
                     "P_pure_mmHg": P_pure, "P_solution_mmHg": P_solution,
                     "city": city, "festival": festival}

    result = solver_fn(n_solute, n_solvent, P_pure, P_solution)
    return _pkg(vg, "Solutions", difficulty, competency, qtext,
                variables, result,
                extra_tags=["Raoult law", "vapour pressure lowering",
                            "mole fraction"])


# ============================================================================
# 3. ELECTROCHEMISTRY
# ============================================================================

def gen_electrochemistry_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["electrochemistry_cell_emf"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("electrochemistry_cell_emf",           "Cell EMF"),
        ("electrochemistry_faraday_electrolysis","Faraday's Laws"),
        ("electrochemistry_lead_battery",        "Lead Storage Battery"),
        ("electrochemistry_galvanic_corrosion",  "Galvanic Corrosion"),
        ("electrochemistry_nernst_conc",         "Nernst Equation"),
    ]
    fn_name, label = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "electrochemistry_cell_emf":
        E_Ag_AgCl = vg.float(0.18, 0.30)
        E_Zn_Zn   = vg.float(-0.82, -0.70)
        n          = vg.int(1, 4)
        T_K        = vg.int(280, 320)
        if not competency:
            qtext = (
                f"Calculate the standard EMF of a galvanic cell with Ag/Ag⁺ "
                f"(E° = {E_Ag_AgCl} V) and Zn/Zn²⁺ (E° = {E_Zn_Zn} V) electrodes. "
                f"n = {n}. Find K_eq at {T_K} K."
            )
        else:
            battery  = vg.choice(["pacemaker", "electric vehicle", "solar inverter"])
            location = vg.choice(INDIAN_PLACES)
            qtext = (
                f"A {battery} manufactured near {location} uses a galvanic cell with "
                f"Ag/Ag⁺ (E° = {E_Ag_AgCl} V) and Zn/Zn²⁺ (E° = {E_Zn_Zn} V) "
                f"electrodes (n={n}). Compute the cell EMF and the equilibrium "
                f"constant at {T_K} K."
            )
        result = solver_fn(E_Ag_AgCl, E_Zn_Zn, n, T_K)
        variables = {"E_Ag_AgCl": E_Ag_AgCl, "E_Zn_Zn": E_Zn_Zn,
                     "n": n, "T_K": T_K}

    elif fn_name == "electrochemistry_faraday_electrolysis":
        mass_g  = vg.float(1.0, 20.0)
        M       = vg.float(50.0, 250.0)
        n_e     = vg.int(1, 4)
        I_A     = vg.float(0.5, 5.0)
        if not competency:
            qtext = (
                f"How long must a current of {I_A} A be passed to electroplate "
                f"{mass_g} g of a metal (M = {M} g mol⁻¹, n = {n_e})?"
            )
        else:
            industry = vg.choice(["jewellery unit in", "electronics factory in",
                                   "coating facility at"])
            place    = vg.choice(INDIAN_PLACES)
            qtext = (
                f"A {industry} {place} needs to electroplate {mass_g} g of a "
                f"coating metal (M = {M} g mol⁻¹, n = {n_e}). At {I_A} A, "
                f"how long should electrolysis run?"
            )
        result = solver_fn(mass_g, M, n_e, I_A)
        variables = {"mass_g": mass_g, "M": M, "n_e": n_e, "I_A": I_A}

    elif fn_name == "electrochemistry_lead_battery":
        n_Pb   = vg.float(0.5, 5.0)
        I_A    = vg.float(0.5, 5.0)
        t_hr   = vg.float(1.0, 10.0)
        if not competency:
            qtext = (
                f"In a lead storage battery: (a) E_cell at [H⁺]=4M, "
                f"[SO₄²⁻]=2M; (b) K_eq; (c) mass of PbSO₄ formed when "
                f"{n_Pb} mol Pb reacts. Charge = {I_A} A × {t_hr} h."
            )
        else:
            org = vg.choice(["Tata Motors", "Exide Industries", "Amaron"])
            qtext = (
                f"{org} tests a lead-acid battery: (a) EMF at [H⁺]=4M, "
                f"[SO₄²⁻]=2M; (b) K_eq; (c) mass of PbSO₄ when {n_Pb} mol Pb "
                f"reacts with {I_A} A for {t_hr} h."
            )
        result = solver_fn(n_Pb, I_A, t_hr)
        variables = {"n_Pb_mol": n_Pb, "I_A": I_A, "t_hr": t_hr}

    elif fn_name == "electrochemistry_galvanic_corrosion":
        E_Fe = vg.float(-0.47, -0.40)
        E_Cu = vg.float(0.30, 0.40)
        mass_M = vg.float(10.0, 200.0)
        M_at   = vg.float(40.0, 70.0)
        n_e    = vg.int(1, 4)
        if not competency:
            qtext = (
                f"Fe (E° = {E_Fe} V) and Cu (E° = {E_Cu} V) are connected. "
                f"Which corrodes? EMF? Max electrical work from {mass_M} g Fe?"
            )
        else:
            pipe_co = vg.choice(INDIAN_PLACES)
            qtext = (
                f"An underground pipeline in {pipe_co} uses Fe (E° = {E_Fe} V) "
                f"with a Cu sacrificial cap (E° = {E_Cu} V). Which metal corrodes? "
                f"EMF? Max work from {mass_M} g Fe (M = {M_at} g mol⁻¹, n={n_e})?"
            )
        result = solver_fn(E_Fe, E_Cu, mass_M, M_at, n_e)
        variables = {"E_Fe": E_Fe, "E_Cu": E_Cu,
                     "mass_M": mass_M, "M_at": M_at, "n_e": n_e}

    else:  # electrochemistry_nernst_conc
        E0    = vg.float(0.80, 1.10)
        n     = vg.int(1, 4)
        T_K   = vg.int(280, 320)
        conc_o = vg.float(0.01, 2.0)
        conc_r = vg.float(0.001, 0.5)
        if not competency:
            qtext = (
                f"Use the Nernst equation for E° = {E0} V (n={n}) at {T_K} K. "
                f"[Ox] = {conc_o} M, [Red] = {conc_r} M. Find E_cell."
            )
        else:
            sensor = vg.choice(["water quality sensor in", "battery monitor at",
                                 "corrosion probe in"])
            place  = vg.choice(INDIAN_PLACES)
            qtext = (
                f"A {sensor} {place} reads E° = {E0} V (n={n}) at {T_K} K with "
                f"[Ox] = {conc_o} M and [Red] = {conc_r} M. Find E_cell."
            )
        result = solver_fn(E0, n, T_K, conc_o, conc_r)
        variables = {"E0": E0, "n": n, "T_K": T_K,
                     "conc_o": conc_o, "conc_r": conc_r}

    return _pkg(vg, "Electrochemistry", difficulty, competency, qtext,
                variables, result,
                extra_tags=["EMF", "Nernst equation", "Faraday constant",
                            "lead-acid battery"])


# ============================================================================
# 4. CHEMICAL KINETICS
# ============================================================================

def gen_chemical_kinetics_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["kinetics_radioactive_decay"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("kinetics_radioactive_decay",  "Radioactive Decay"),
        ("kinetics_first_order",        "First-Order Kinetics"),
        ("kinetics_arrhenius",          "Arrhenius Equation"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "kinetics_radioactive_decay":
        N0     = vg.float(1.0e-5, 1.0e-3)
        t_min  = vg.float(200.0, 800.0)
        remain = vg.float(0.10, 0.50)
        if not competency:
            qtext = (
                f"A radioactive isotope has N₀ = {N0:.2e} mol. After {t_min:.0f} min, "
                f"{remain*100:.0f}% remains. Calculate k (min⁻¹) and t½ (min)."
            )
        else:
            isotope = vg.choice(["P-32 in a biological tracer study",
                                  "C-14 in an archaeological sample",
                                  "I-131 in a thyroid diagnostic kit"])
            lab = vg.choice(INDIAN_PLACES)
            qtext = (
                f"A {isotope} conducted at a lab in {lab} starts with "
                f"{N0:.2e} mol. After {t_min:.0f} min, {remain*100:.0f}% remains. "
                f"Find k and t½."
            )
        result = solver_fn(N0, t_min, remain)
        variables = {"N0": round(N0, 5), "t_min": t_min, "remain_frac": remain}

    elif fn_name == "kinetics_first_order":
        k     = vg.float(0.0005, 0.005)
        C0    = vg.float(0.10, 1.0)
        t_ask = vg.float(200.0, 1000.0)
        if not competency:
            qtext = (
                f"First-order decomposition: k = {k} s⁻¹, C₀ = {C0} M. "
                f"Find t½, time for 80% completion, rate at t = {t_ask:.0f} s, "
                f"and initial rate."
            )
        else:
            product = vg.choice(["hydrogen peroxide in a wound-cleaning formulation",
                                  "a pesticide being photodegraded in a field",
                                  "a drug metabolite in the bloodstream"])
            city = vg.choice(INDIAN_PLACES)
            qtext = (
                f"The decomposition of {product} near {city} follows first-order "
                f"kinetics (k = {k} s⁻¹, C₀ = {C0} M). Find t½, time for 80% "
                f"completion, rate at t = {t_ask:.0f} s, and initial rate."
            )
        result = solver_fn(k, C0, t_ask)
        variables = {"k": k, "C0": C0, "t_ask": t_ask}

    else:  # kinetics_arrhenius
        k1     = vg.float(1.0e-5, 1.0e-3)
        T1     = vg.float(280.0, 320.0)
        T2     = vg.float(340.0, 380.0)
        k2     = round(k1 * math.exp(
            (-60000 / 8.314) * (1/T2 - 1/T1)), 6)
        if not competency:
            qtext = (
                f"For a reaction: k₁ = {k1:.2e} s⁻¹ at {T1:.0f} K and "
                f"k₂ = {k2:.2e} s⁻¹ at {T2:.0f} K. Calculate Ea (kJ mol⁻¹)."
            )
        else:
            process = vg.choice(["thermal cracking in a petroleum refinery in",
                                  "sugar caramelisation in a food factory at",
                                  "polymerisation in a plastic unit near"])
            place = vg.choice(INDIAN_PLACES)
            qtext = (
                f"In a {process} {place}: k₁ = {k1:.2e} s⁻¹ at {T1:.0f} K and "
                f"k₂ = {k2:.2e} s⁻¹ at {T2:.0f} K. Calculate Ea (kJ mol⁻¹)."
            )
        result = solver_fn(k1, k2, T1, T2)
        variables = {"k1": k1, "k2": k2, "T1": T1, "T2": T2}

    return _pkg(vg, "Chemical Kinetics", difficulty, competency, qtext,
                variables, result,
                extra_tags=["first-order kinetics", "Arrhenius equation",
                            "radioactive decay", "activation energy"])


# ============================================================================
# 5. SURFACE CHEMISTRY
# ============================================================================

def gen_surface_chemistry_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["surface_chem_gibbs_adsorption"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("surface_chem_gibbs_adsorption", "Gibbs Adsorption"),
        ("surface_chem_freundlich",       "Freundlich Adsorption"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "surface_chem_gibbs_adsorption":
        gamma1 = vg.float(70.0, 75.0)
        gamma2 = vg.float(55.0, 68.0)
        T_K    = vg.int(280, 320)
        conc   = vg.float(0.001, 0.01)
        if not competency:
            qtext = (
                f"A soap solution (conc = {conc} mol L⁻¹) changes the surface "
                f"tension of water from {gamma1} to {gamma2} mN m⁻¹ at {T_K} K. "
                f"Using Γ = -(1/RT)(dγ/d ln C), find the surface excess Γ "
                f"(mol m⁻²). [R = 8.314 J mol⁻¹ K⁻¹]"
            )
        else:
            brand = vg.choice(["Nirma", "Surf Excel", "Henko", "Tide India"])
            city  = vg.choice(INDIAN_PLACES)
            qtext = (
                f"The R&D team at {brand}'s plant near {city} studies a new "
                f"surfactant (conc = {conc} mol L⁻¹) that changes water surface "
                f"tension from {gamma1} to {gamma2} mN m⁻¹ at {T_K} K. "
                f"Calculate Γ using the Gibbs adsorption equation."
            )
        result = solver_fn(gamma1, gamma2, T_K, conc)
        variables = {"gamma1": gamma1, "gamma2": gamma2,
                     "T_K": T_K, "conc": conc}

    else:  # surface_chem_freundlich
        P1   = vg.float(0.1, 1.0)
        xm1  = vg.float(0.05, 0.50)
        P2   = round(P1 * vg.float(2.0, 5.0), 3)
        xm2  = round(xm1 * (P2 / P1) ** vg.float(0.3, 0.7), 4)
        if not competency:
            qtext = (
                f"NH₃ adsorption on charcoal: at P₁ = {P1} atm, x/m = {xm1} mol g⁻¹; "
                f"at P₂ = {P2} atm, x/m = {xm2} mol g⁻¹. Verify Freundlich and find n."
            )
        else:
            plant = vg.choice(["a fertiliser plant in",
                                "a cryogenic storage facility at",
                                "an industrial gas unit in"])
            place = vg.choice(INDIAN_PLACES)
            qtext = (
                f"Engineers at {plant} {place} record NH₃ adsorption: "
                f"P₁ = {P1} atm → x/m = {xm1} mol g⁻¹; P₂ = {P2} atm → "
                f"x/m = {xm2} mol g⁻¹. Verify Freundlich isotherm and find n."
            )
        result = solver_fn(P1, xm1, P2, xm2)
        variables = {"P1": P1, "xm1": xm1, "P2": P2, "xm2": xm2}

    return _pkg(vg, "Surface Chemistry", difficulty, competency, qtext,
                variables, result,
                extra_tags=["Gibbs adsorption equation", "Freundlich isotherm",
                            "surface excess"])


# ============================================================================
# 6. METALLURGY
# ============================================================================

def gen_metallurgy_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["metallurgy_ellingham"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("metallurgy_ellingham",          "Ellingham Diagram"),
        ("metallurgy_al_reduction",       "Aluminium Thermite"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "metallurgy_ellingham":
        slope_C  = vg.float(-0.20, -0.05)
        dG_C_700 = vg.float(-180.0, -120.0)
        T_cross  = round(-dG_C_700 / (1000 * slope_C), 1)
        if not competency:
            qtext = (
                f"From an Ellingham diagram: carbon oxidation has ΔG° = "
                f"{dG_C_700:.0f} kJ mol⁻¹ at 700 K with a slope of "
                f"{slope_C} kJ mol⁻¹ K⁻¹. Another reaction has ΔS° = "
                f"{abs(round(slope_C * 1000, 1)):.0f} J mol⁻¹ K⁻¹. "
                f"Find the minimum temperature for spontaneous reduction."
            )
        else:
            plant = vg.choice(INDIAN_PLACES)
            org   = vg.choice(["SAIL", "Vedanta Ltd.", "NMDC"])
            qtext = (
                f"A metallurgist at {org}'s plant in {plant} reads an Ellingham "
                f"diagram: carbon oxidation has ΔG° = {dG_C_700:.0f} kJ mol⁻¹ at "
                f"700 K with a slope of {slope_C} kJ mol⁻¹ K⁻¹. "
                f"Find the minimum T for spontaneous reduction."
            )
        dS = round(slope_C * 1000, 1)
        result = solver_fn(slope_C, dG_C_700, T_cross)
        variables = {"slope_C": slope_C, "dG_C_700": dG_C_700,
                     "T_cross": T_cross, "dS_J": dS}

    else:  # metallurgy_al_reduction
        pct_Cu   = vg.float(1.5, 4.0)
        mass_ore = vg.float(1000.0, 10000.0)
        eta      = vg.float(0.80, 0.95)
        if not competency:
            qtext = (
                f"Chalcopyrite ore ({pct_Cu}% Cu), mass = {mass_ore} kg, "
                f"recovery = {eta*100:.0f}%. Calculate (a) pure Cu obtained, "
                f"(b) minimum T from Ellingham data."
            )
        else:
            mine = vg.choice(["Hutti Gold Mines", "Malanjkhand Copper Project",
                               "Khetri Copper Complex", "Zawar Mines"])
            state = vg.choice(INDIAN_PLACES)
            qtext = (
                f"{mine} near {state} processes {mass_ore:.0f} kg of ore "
                f"containing {pct_Cu}% Cu at {eta*100:.0f}% recovery. "
                f"Find: (a) pure Cu obtained, (b) minimum T for thermite reduction."
            )
        result = solver_fn(pct_Cu, mass_ore, eta, T_cross=None)
        variables = {"pct_Cu": pct_Cu, "mass_ore": mass_ore, "eta": eta}

    return _pkg(vg, "Metallurgy", difficulty, competency, qtext,
                variables, result,
                extra_tags=["Ellingham diagram", "thermodynamic feasibility",
                            "Al thermite", "reduction temperature"])


# ============================================================================
# 7. p-BLOCK
# ============================================================================

def gen_pblock_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["pblock_contact_process"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("pblock_contact_process",  "Contact Process"),
        ("pblock_lead_battery_emf", "Lead Battery Nernst"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "pblock_contact_process":
        n_SO2 = vg.float(0.10, 1.0)
        n_O2  = vg.float(0.05, 0.50)
        n_SO3 = vg.float(0.01, 0.50)
        Kc    = vg.float(0.001, 0.1)
        if not competency:
            qtext = (
                f"In the contact process: 2SO₂ + O₂ ⇌ 2SO₃, Kc = {Kc:.4f} at 450°C. "
                f"With [SO₂] = {n_SO2} M, [O₂] = {n_O2} M, [SO₃] = {n_SO3} M, "
                f"find Qc and the direction of the reaction."
            )
        else:
            plant = vg.choice(INDIAN_PLACES)
            org   = vg.choice(["Coromandel International", "Rashtriya Chemicals",
                               "Southern Petrochemical"])
            qtext = (
                f"A production engineer at {org} in {plant} monitors the contact "
                f"process: 2SO₂ + O₂ ⇌ 2SO₃, Kc = {Kc:.4f}. Current concentrations: "
                f"[SO₂]={n_SO2} M, [O₂]={n_O2} M, [SO₃]={n_SO3} M. "
                f"Find Qc and reaction direction."
            )
        result = solver_fn(n_SO2, n_O2, n_SO3, Kc)
        variables = {"n_SO2": n_SO2, "n_O2": n_O2,
                     "n_SO3": n_SO3, "Kc": Kc}

    else:  # pblock_lead_battery_emf
        n_Pb   = vg.float(0.5, 5.0)
        I_A    = vg.float(0.5, 5.0)
        t_hr   = vg.float(1.0, 10.0)
        if not competency:
            qtext = (
                f"Lead storage battery: (a) E_cell with [H⁺]=4M, [SO₄²⁻]=2M; "
                f"(b) K_eq; (c) mass of PbSO₄ when {n_Pb} mol Pb reacts at "
                f"{I_A} A × {t_hr} h."
            )
        else:
            org = vg.choice(["Exide Industries", "Tata AutoComp", "Amaron India"])
            qtext = (
                f"{org} quality-checks a lead battery: (a) E_cell with "
                f"[H⁺]=4M, [SO₄²⁻]=2M; (b) K_eq; (c) mass of PbSO₄ when "
                f"{n_Pb} mol Pb reacts at {I_A} A × {t_hr} h."
            )
        result = solver_fn(n_Pb, I_A, t_hr)
        variables = {"n_Pb_mol": n_Pb, "I_A": I_A, "t_hr": t_hr}

    return _pkg(vg, "p-Block", difficulty, competency, qtext,
                variables, result,
                extra_tags=["equilibrium constant", "reaction quotient",
                            "Le Chatelier", "contact process"])


# ============================================================================
# 8. d-BLOCK
# ============================================================================

def gen_dblock_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["dblock_magnetic_moment"]
    difficulty = vg.choice(DIFFICULTIES)

    metal_pool = [
        ("Ti", 3, "d²"), ("V",  3, "d²"), ("Cr", 3, "d³"),
        ("Mn", 2, "d⁵"), ("Fe", 2, "d⁶"), ("Co", 2, "d⁷"),
        ("Ni", 2, "d⁸"), ("Cu", 2, "d⁹"),
    ]
    metal, ox, config = vg.choice(metal_pool)

    if not competency:
        qtext = (
            f"Using crystal field theory, find the number of unpaired electrons "
            f"and the spin-only magnetic moment (in BM) of the octahedral complex "
            f"[{metal}(NH₃)₆]^{ox}+. [{metal} is {config} in this oxidation state]"
        )
    else:
        lab     = vg.choice(INDIAN_PLACES)
        company = vg.choice(["Tata Steel", "DRDO", "ISRO"])
        qtext = (
            f"A researcher at {company}'s lab in {lab} needs a paramagnetic complex "
            f"for a magnetic sensor. Using crystal field theory, find unpaired electrons "
            f"and the spin-only magnetic moment (in BM) of [{metal}(NH₃)₆]^{ox}+. "
            f"[{metal}: {config}]"
        )
    result = solver_fn(metal, ox)
    variables = {"metal": metal, "oxidation": ox, "config": config}
    return _pkg(vg, "d-Block", difficulty, competency, qtext,
                variables, result,
                extra_tags=["CFT", "unpaired electrons", "magnetic moment",
                            "octahedral splitting"])


# ============================================================================
# 9. COORDINATION COMPOUNDS
# ============================================================================

def gen_coordination_compounds_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["coord_compound_analysis"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("coord_compound_analysis",    "Compound Analysis"),
        ("coord_stability_constant",   "Stability Constant"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "coord_compound_analysis":
        complexes = [
            ("[Co(NH₃)₆]Cl₃", 6, 3, "hexaamminecobalt(III) chloride"),
            ("[Co(NH₃)₅Cl]Cl₂", 6, 3, "pentamminechlorocobalt(III) chloride"),
            ("[Co(NH₃)₄Cl₂]Cl", 6, 3, "tetraamminedichlorocobalt(III) chloride"),
            ("K₃[Fe(C₂O₄)₃]", 6, 3, "potassium trioxalatoferrate(III)"),
            ("[Cr(H₂O)₆]Cl₃", 6, 3, "hexaaquachromium(III) chloride"),
        ]
        comp_name, cn, ox, iupac = vg.choice(complexes)
        if not competency:
            qtext = (
                f"For {comp_name}: (i) Coordination number = ?, "
                f"(ii) Oxidation state of central metal = ?, "
                f"(iii) IUPAC name = ?, (iv) Charge on complex ion = ?"
            )
        else:
            org = vg.choice(INDIAN_CONTEXTS["pharma"])
            qtext = (
                f"A synthetic chemist at {org} synthesises {comp_name}. "
                f"Determine: (i) CN, (ii) oxidation state, "
                f"(iii) IUPAC name, (iv) charge on the complex ion."
            )
        result = solver_fn(comp_name)
        variables = {"complex_name": comp_name}

    else:  # coord_stability_constant
        A        = vg.float(0.20, 0.80)
        b        = vg.float(50.0, 200.0)
        path_cm  = 1.0
        measured_A = round(A * b * vg.float(0.002, 0.008), 3)
        if not competency:
            qtext = (
                f"Colourimetric determination of [Co(NH₃)₆]³⁺: A = {measured_A} "
                f"at λ_max (ε = {b} L mol⁻¹ cm⁻¹, l = {path_cm} cm). "
                f"[Co²⁺]₀ = 0.10 M, excess NH₃ added. Find Kf."
            )
        else:
            company = vg.choice(INDIAN_CONTEXTS["pharma"])
            qtext = (
                f"At {company}, colourimetry gives A = {measured_A} for "
                f"[Co(NH₃)₆]³⁺ (ε = {b} L mol⁻¹ cm⁻¹, l = {path_cm} cm). "
                f"[Co²⁺]₀ = 0.10 M. Find the formation constant Kf."
            )
        result = solver_fn(A, b, path_cm, measured_A)
        variables = {"A_blank": A, "epsilon": b, "path_cm": path_cm,
                     "A_measured": measured_A}

    return _pkg(vg, "Coordination Compounds", difficulty, competency, qtext,
                variables, result,
                extra_tags=["IUPAC naming", "coordination number",
                            "formation constant", "spectrophotometry"])


# ============================================================================
# 10. HALOALKANES
# ============================================================================

def gen_haloalkanes_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["haloalkanes_wurtz_yield"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("haloalkanes_wurtz_yield",       "Wurtz Coupling"),
        ("haloalkanes_sn1_sn2_compete",   "SN1/SN2 Competition"),
        ("haloalkanes_free_radical",      "Free Radical Halogenation"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "haloalkanes_wurtz_yield":
        n_RX    = vg.float(0.05, 0.30)
        n_Na    = vg.float(0.05, 0.30)
        actual  = vg.float(0.5, 2.0)
        if not competency:
            qtext = (
                f"Wurtz coupling: {n_RX} mol RX + Na → R-R + 2NaX. "
                f"Na = {n_Na} mol. Actual R-R = {actual} g. Find theoretical yield "
                f"and % yield."
            )
        else:
            org = vg.choice(["Aarti Industries", "Atul Ltd",
                               "a fine chemicals unit in"])
            place = vg.choice(INDIAN_PLACES)
            qtext = (
                f"A chemist at {org} {place} performs Wurtz coupling: "
                f"{n_RX} mol RX + Na → R-R + 2NaX. Na = {n_Na} mol. "
                f"Actual R-R = {actual} g. Find theoretical yield and % yield."
            )
        result = solver_fn(n_RX, n_Na, actual)
        variables = {"n_RX": n_RX, "n_Na": n_Na, "actual_g": actual}

    elif fn_name == "haloalkanes_sn1_sn2_compete":
        n_RX = vg.float(0.01, 0.10)
        M_NaOH = vg.float(0.5, 2.0)
        V_L   = vg.float(0.1, 1.0)
        if not competency:
            qtext = (
                f"SN1 competition: {n_RX} mol of an alkyl halide reacts with "
                f"{M_NaOH} M NaOH ({V_L} L) in aqueous medium. "
                f"Assuming 70% SN1: find moles of alcohol and alkene formed."
            )
        else:
            org = vg.choice(INDIAN_CONTEXTS["pharma"])
            qtext = (
                f"At {org}, {n_RX} mol of an alkyl halide reacts with "
                f"{M_NaOH} M NaOH ({V_L} L). 70% SN1. Find moles of alcohol "
                f"and alkene formed."
            )
        result = solver_fn(n_RX, M_NaOH, V_L)
        variables = {"n_RX": n_RX, "M_NaOH": M_NaOH, "V_L": V_L}

    else:  # haloalkanes_free_radical
        n_CH4 = vg.float(0.1, 1.0)
        n_Cl2 = vg.float(0.05, 0.50)
        pct   = vg.float(5.0, 30.0)
        if not competency:
            qtext = (
                f"Free radical halogenation: {n_CH4} mol CH₄ + {n_Cl2} mol Cl₂ "
                f"under UV. {pct:.0f}% forms CH₃Cl. Find: mass of CH₃Cl, "
                f"and ΔH_rxn (C–H=413, Cl–Cl=243, C–Cl=339, H–Cl=431 kJ mol⁻¹)."
            )
        else:
            org = vg.choice(["a refrigerant plant in", "a PVC manufacturing unit at"])
            place = vg.choice(INDIAN_PLACES)
            qtext = (
                f"At {org} {place}: {n_CH4} mol CH₄ + {n_Cl2} mol Cl₂ (UV). "
                f"{pct:.0f}% forms CH₃Cl. Find mass of CH₃Cl and ΔH_rxn "
                f"(C–H=413, Cl–Cl=243, C–Cl=339, H–Cl=431 kJ mol⁻¹)."
            )
        result = solver_fn(n_CH4, n_Cl2, pct)
        variables = {"n_CH4": n_CH4, "n_Cl2": n_Cl2, "pct": pct}

    return _pkg(vg, "Haloalkanes", difficulty, competency, qtext,
                variables, result,
                extra_tags=["Wurtz reaction", "SN1 vs SN2",
                            "free radical halogenation", "percent yield"])


# ============================================================================
# 11. ALCOHOLS
# ============================================================================

def gen_alcohols_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["alcohols_oxidation_yield"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("alcohols_oxidation_yield",  "Oxidation Yield"),
        ("alcohols_fermentation",     "Fermentation"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "alcohols_oxidation_yield":
        n_alc  = vg.float(0.05, 0.50)
        n_oxid = vg.float(0.01, 0.20)
        actual = vg.float(1.0, 10.0)
        M_prod = vg.float(40.0, 80.0)
        if not competency:
            qtext = (
                f"Oxidation: 2 ROH + [O] → 2 R=O + H₂O. "
                f"{n_alc} mol ROH + {n_oxid} mol K₂Cr₂O₇. "
                f"Actual product = {actual} g (M = {M_prod} g mol⁻¹). "
                f"Find ROH mass, oxidiser moles, and % yield."
            )
        else:
            org = vg.choice(INDIAN_CONTEXTS["pharma"])
            qtext = (
                f"At {org}, {n_alc} mol alcohol is oxidised with {n_oxid} mol "
                f"K₂Cr₂O₇. Actual product = {actual} g (M = {M_prod} g mol⁻¹). "
                f"Find ROH mass, oxidiser moles, and % yield."
            )
        result = solver_fn(n_alc, n_oxid, actual, M_prod)
        variables = {"n_alc": n_alc, "n_oxid": n_oxid,
                     "actual_g": actual, "M_prod": M_prod}

    else:  # alcohols_fermentation
        V_L    = vg.float(100.0, 500.0)
        T_K    = vg.int(290, 310)
        P_tot  = vg.float(1.0, 1.5)
        P_H2O  = vg.float(0.02, 0.05)
        eff    = vg.float(0.65, 0.90)
        if not competency:
            qtext = (
                f"Fermentation in a {V_L:.0f} L vessel at {T_K} K. "
                f"CO₂ collected: P_total = {P_tot} atm, P_water = {P_H2O} atm, "
                f"V_CO₂ = 0.124 L. Yeast efficiency = {eff*100:.0f}%. "
                f"Find mass of ethanol produced."
            )
        else:
            distillery = vg.choice(INDIAN_PLACES)
            org = vg.choice(["a sugarcane distillery in",
                               "a biofuel plant at"])
            qtext = (
                f"{org} {distillery}: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. "
                f"Vessel = {V_L:.0f} L, T = {T_K} K. CO₂: P = {P_tot} atm, "
                f"P_H₂O = {P_H2O} atm. Efficiency = {eff*100:.0f}%. "
                f"Find mass of ethanol produced."
            )
        result = solver_fn(V_L, T_K, P_tot, P_H2O, eff)
        variables = {"V_L": V_L, "T_K": T_K,
                     "P_tot": P_tot, "P_H2O": P_H2O, "eff": eff}

    return _pkg(vg, "Alcohols", difficulty, competency, qtext,
                variables, result,
                extra_tags=["oxidation of alcohols", "percent yield",
                            "fermentation", "ideal gas law"])


# ============================================================================
# 12. ALDEHYDES
# ============================================================================

def gen_aldehydes_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["aldehydes_aldol_condensation"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("aldehydes_aldol_condensation", "Aldol Condensation"),
        ("aldehydes_bisulfite_titration", "NaHSO₃ Titration"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "aldehydes_aldol_condensation":
        n_acetone  = vg.float(0.10, 0.50)
        n_benz     = vg.float(0.20, 1.00)
        actual_mass = vg.float(10.0, 80.0)
        if not competency:
            qtext = (
                f"Aldol condensation: 2 C₆H₅CHO + CH₃COCH₃ → dibenzylideneacetone "
                f"(M = 234 g mol⁻¹). Acetone = {n_acetone} mol, benzaldehyde = "
                f"{n_benz} mol. Actual product = {actual_mass} g. "
                f"Find benzaldehyde needed, product formula, theoretical mass, and % yield."
            )
        else:
            org = vg.choice(["a fragrance lab in", "a pharmaceutical R&D unit at",
                               "a fine chemicals company in"])
            place = vg.choice(INDIAN_PLACES)
            qtext = (
                f"A chemist at {org} {place} runs an aldol condensation: "
                f"2 C₆H₅CHO + CH₃COCH₃ → dibenzylideneacetone (M = 234 g mol⁻¹). "
                f"Acetone = {n_acetone} mol, benzaldehyde = {n_benz} mol. "
                f"Actual product = {actual_mass} g. Find all quantities."
            )
        result = solver_fn(n_acetone, n_benz, actual_mass)
        variables = {"n_acetone": n_acetone, "n_benz": n_benz,
                     "actual_mass": actual_mass}

    else:  # aldehydes_bisulfite_titration
        M_NaHSO3 = 104.06
        V_L      = vg.float(0.010, 0.050)
        M_NaHSO3_m = vg.float(0.05, 0.30)
        if not competency:
            qtext = (
                f"Aldehyde + NaHSO₃ → addition compound (1:1). "
                f"{V_L*1000:.0f} mL of {M_NaHSO3_m} M NaHSO₃ reacts with "
                f"aldehyde. Find molarity of aldehyde solution."
            )
        else:
            org = vg.choice(INDIAN_CONTEXTS["pharma"])
            qtext = (
                f"Quality control at {org}: aldehyde + NaHSO₃ → addition compound "
                f"(1:1). {V_L*1000:.0f} mL of {M_NaHSO3_m} M NaHSO₃ used. "
                f"Find the molarity of the aldehyde solution."
            )
        result = solver_fn(V_L, M_NaHSO3_m)
        variables = {"V_L": V_L, "M_NaHSO3_m": M_NaHSO3_m}

    return _pkg(vg, "Aldehydes", difficulty, competency, qtext,
                variables, result,
                extra_tags=["aldol condensation", "bisulfite addition",
                            "percent yield", "stoichiometry"])


# ============================================================================
# 13. AMINES
# ============================================================================

def gen_amines_problem(vg: VarGen, competency: bool = False) -> GeneratedQuestion:
    solver_fn = SOLVER_REGISTRY["amines_hinsberg_fw"]
    difficulty = vg.choice(DIFFICULTIES)

    topic_pool = [
        ("amines_hinsberg_fw",         "Hinsberg + FW"),
        ("amines_buffer_prep",         "Buffer Prep"),
        ("amines_diazotization",       "Diazotization"),
    ]
    fn_name, _ = vg.choice(topic_pool)
    solver_fn = SOLVER_REGISTRY[fn_name]

    if fn_name == "amines_hinsberg_fw":
        dTf    = vg.float(0.50, 2.50)
        Kf     = vg.float(1.80, 2.50)
        w_g    = vg.float(0.50, 5.00)
        W_solv = vg.float(5.00, 50.00)
        if not competency:
            qtext = (
                f"An amine (w = {w_g} g) in {W_solv} g solvent gives ΔTf = "
                f"{dTf}°C (Kf = {Kf} K kg mol⁻¹). Find MW, identify 1°/2°/3° "
                f"by Hinsberg test, and write the Hinsberg product equation."
            )
        else:
            org = vg.choice(INDIAN_CONTEXTS["pharma"])
            qtext = (
                f"A quality analyst at {org} finds ΔTf = {dTf}°C for {w_g} g "
                f"of an unknown amine in {W_solv} g solvent (Kf = {Kf}). "
                f"Find MW, classify by Hinsberg test, and write the product equation."
            )
        result = solver_fn(dTf, Kf, w_g, W_solv)
        variables = {"dTf": dTf, "Kf": Kf, "w_g": w_g, "W_solv": W_solv}

    elif fn_name == "amines_buffer_prep":
        pKb    = vg.float(4.70, 4.80)
        n_base = vg.float(0.10, 1.0)
        V_L    = vg.float(1.0, 10.0)
        target_pH = round(14 - pKb, 2)
        if not competency:
            qtext = (
                f"Prepare a CH₃NH₂/CH₃NH₃Cl buffer (pKb = {pKb}) at pH "
                f"{target_pH:.2f} from {n_base} mol CH₃NH₂ in {V_L} L. "
                f"Find: (a) mass of CH₃NH₃Cl needed, (b) pH after adding "
                f"0.01 mol HCl."
            )
        else:
            org = vg.choice(["a pharmaceutical R&D lab in",
                               "an analytical chemistry lab at"])
            place = vg.choice(INDIAN_PLACES)
            qtext = (
                f"A process chemist at {org} {place} prepares a "
                f"CH₃NH₂/CH₃NH₃Cl buffer (pKb = {pKb}) at pH {target_pH:.2f} "
                f"using {n_base} mol CH₃NH₂ in {V_L} L. Find: (a) mass of "
                f"CH₃NH₃Cl, (b) pH after 0.01 mol HCl."
            )
        result = solver_fn(pKb, n_base, V_L)
        variables = {"pKb": pKb, "n_base": n_base, "V_L": V_L}

    else:  # amines_diazotization
        mass_g  = vg.float(5.0, 30.0)
        M_ArNH2 = 93.0
        M_NaNO2 = 69.0
        M_NaNO2_m = vg.float(0.1, 0.5)
        if not competency:
            qtext = (
                f"Diazotisation: ArNH₂ (M = {M_ArNH2} g mol⁻¹) + NaNO₂ + 2HCl "
                f"→ ArN₂⁺Cl⁻ + NaCl + 2H₂O. Mass = {mass_g} g. "
                f"Find: (a) moles of ArNH₂, (b) vol. of {M_NaNO2_m} M NaNO₂ needed."
            )
        else:
            org = vg.choice(INDIAN_CONTEXTS["pharma"])
            qtext = (
                f"A dye chemist at {org} performs diazotisation: ArNH₂ "
                f"(M = {M_ArNH2}) + NaNO₂ + 2HCl → ArN₂⁺Cl⁻. "
                f"Mass used = {mass_g} g. Find: (a) moles of ArNH₂, "
                f"(b) vol. of {M_NaNO2_m} M NaNO₂."
            )
        result = solver_fn(mass_g, M_ArNH2, M_NaNO2_m)
        variables = {"mass_g": mass_g, "M_ArNH2": M_ArNH2, "M_NaNO2_m": M_NaNO2_m}

    return _pkg(vg, "Amines", difficulty, competency, qtext,
                variables, result,
                extra_tags=["Hinsberg test", "diazotization"] if fn_name != "amines_buffer_prep" else ["buffer", "Henderson-Hasselbalch"])