"""
class8_chem_questions.py
Question generator for Class 8 Chemistry – 3 nodes
50 % competency-level (Indian context) + 50 % standard
Seeded RandomState for reproducibility.
Three question types: MCQ / Fill-Blank / Short-Answer
"""

import random
import string
from dataclasses import dataclass, field
from typing import List, Dict, Optional

from class8_chem_solver import Class8ChemistrySolver as ChemistrySolver

# Optional constants that may not exist in all solver versions
try:
    from class8_chem_solver import NODE_MATTER_STATES, NODE_PHYS_CHEM_CHANGES, NODE_ELEMENTS_COMPOUNDS, FIRST_20, COMPOUNDS
except ImportError:
    NODE_MATTER_STATES = "c8_chem_001"
    NODE_PHYS_CHEM_CHANGES = "c8_chem_002"
    NODE_ELEMENTS_COMPOUNDS = "c8_chem_003"
    FIRST_20 = []
    COMPOUNDS = {}

# ══════════════════════════════════════════════
#  DATA STRUCTURES
# ══════════════════════════════════════════════
@dataclass
class GeneratedQuestion:
    node_id:        str
    node_label:     str
    qtype:          str          # "mcq" | "fillblank" | "shortanswer"
    level:          str          # "competency" | "standard"
    difficulty:     str          # "easy" | "medium"
    question_text:  str
    options:        List[str] = field(default_factory=list)  # MCQ only
    correct_answer: str = ""
    step_by_step:   List[str] = field(default_factory=list)
    explanation:    str = ""
    tags:           List[str] = field(default_factory=list)

    def mcq_prompt(self) -> str:
        """Render MCQ with A/B/C/D labels."""
        lines = [self.question_text]
        for i, opt in enumerate(self.options):
            lines.append(f"  ({string.ascii_uppercase[i]}) {opt}")
        return "\n".join(lines)

    def full_render(self, show_answer: bool = False) -> str:
        """Pretty-print the question with optional solution."""
        header = f"[{self.node_label}] [{self.level.upper()}] [{self.qtype}]"
        lines = [header, "-" * 50, self.question_text]
        if self.options:
            for i, opt in enumerate(self.options):
                lines.append(f"  ({string.ascii_uppercase[i]}) {opt}")
        out = "\n".join(lines)
        if show_answer:
            out += "\n" + "-" * 50
            out += f"\n✅ ANSWER: {self.correct_answer}"
            out += "\n📝 STEPS:\n"
            for step in self.step_by_step:
                out += f"   {step}\n"
            out += f"\n💡 EXPLANATION:\n{self.explanation}"
        return out


# ══════════════════════════════════════════════
#  CONFIGURATION
# ══════════════════════════════════════════════
NODE_LABELS = {
    NODE_MATTER_STATES:      "Matter – States & Interconversion",
    NODE_PHYS_CHEM_CHANGES:  "Physical & Chemical Changes",
    NODE_ELEMENTS_COMPOUNDS: "Elements & Compounds (Atomic)",
}

# ── Competency templates (Indian textbook-style) ──
_COMPETENCY_TEMPLATES = {
    NODE_MATTER_STATES: {
        "mcq": [
            ("The particles in a solid:", [
                "vibrate about fixed positions",
                "move freely in all directions",
                "slide past each other",
                "are completely stationary"
            ], "vibrate about fixed positions"),
            ("Which change of state occurs when ice is heated at 0 °C?",
             ["Freezing", "Melting", "Condensation", "Sublimation"],
             "Melting"),
            ("On heating, a solid:", [
                "expands because particles get bigger",
                "expands because particles vibrate more and move apart",
                "contracts because particles slow down",
                "changes into a compound"
            ], "expands because particles vibrate more and move apart"),
            ("Sublimation is the change from:", [
                "solid to liquid",
                "solid directly to gas",
                "liquid to gas",
                "gas to liquid"
            ], "solid directly to gas"),
        ],
        "fillblank": [
            ("The three states of matter are _____, _____, and _____.",
             ["solid", "liquid", "gas"]),
            ("When a liquid is cooled enough, it undergoes _____.",
             ["freezing"]),
            ("The change of a solid directly into a gas is called _____.",
             ["sublimation"]),
            ("On heating, the particles of matter gain _____ energy.",
             ["kinetic"]),
        ],
        "shortanswer": [
            ("Explain why solids have a fixed shape but liquids do not. "
             "(2 marks)",),
            ("Describe what happens to the particles when water boils. "
             "(2 marks)",),
            ("Why does heating cause matter to expand? "
             "Mention one example. (2 marks)",),
        ],
    },
    NODE_PHYS_CHEM_CHANGES: {
        "mcq": [
            ("Which of the following is a chemical change?",
             ["Melting ice", "Burning a candle", "Dissolving sugar", "Breaking glass"],
             "Burning a candle"),
            ("A physical change is one in which:",
             ["a new substance is always formed",
              "the change can be reversed easily",
              "energy is always released",
              "the particles change their identity"
             ],
             "the change can be reversed easily"),
            ("Rusting of iron is a:", ["Physical change", "Chemical change",
                                       "Nuclear change", "Phase change"],
             "Chemical change"),
            ("Which is NOT an indicator of a chemical change?",
             ["Change of state", "Gas evolution", "Colour change",
              "Temperature change without external heating"],
             "Change of state"),
        ],
        "fillblank": [
            ("A change in which no new substance is formed is called a "
             "_____ change.", ["physical"]),
            ("When a candle burns, melting of wax is a _____ change.",
             ["physical"]),
            ("Formation of ash when paper is burned is a _____ change.",
             ["chemical"]),
            ("_____ change is always reversible under normal conditions.",
             ["Physical"]),
        ],
        "shortanswer": [
            ("A candle flame has both physical and chemical changes. "
             "Identify each and give one reason. (3 marks)",),
            ("List any three indicators of a chemical change. (3 marks)",),
            ("Why is dissolving sugar in water a physical change? "
             "Explain. (2 marks)",),
        ],
    },
    NODE_ELEMENTS_COMPOUNDS: {
        "mcq": [
            ("An element is:",
             ["a pure substance made of one kind of atom",
              "a mixture of two metals",
              "a compound with two elements",
              "a substance that can be broken down easily"],
             "a pure substance made of one kind of atom"),
            ("The formula of water is:",
             ["HO", "H₂O", "HO₂", "H₃O"],
             "H₂O"),
            ("Which of these is a compound?",
             ["Oxygen gas", "Iron", "Carbon dioxide", "Copper"],
             "Carbon dioxide"),
            ("The atomic number of Sodium (Na) is:",
             ["10", "11", "12", "23"],
             "11"),
            ("In a compound, the elements are combined in a:",
             ["varying ratio",
              "fixed ratio by mass",
              "random ratio",
              "1:1 ratio always"],
             "fixed ratio by mass"),
        ],
        "fillblank": [
            ("The first element in the periodic table is _____ (name or symbol).",
             ["Hydrogen", "H"]),
            ("A compound made of sodium and chlorine is called "
             "_____ (common name).", ["sodium chloride"]),
            ("The chemical symbol for Potassium is _____.", ["K"]),
            ("A pure substance made of only one kind of atom is called "
             "an _____.", ["element"]),
        ],
        "shortanswer": [
            ("Distinguish between an element and a compound with two "
             "differences. (2 marks)",),
            ("Write the formula of ammonia and state the ratio in which "
             "its elements combine. (2 marks)",),
            ("Give one method to separate a mixture of salt and sand. "
             "Explain the steps. (3 marks)",),
        ],
    },
}

# ── Standard templates (slightly harder) ──
_STANDARD_TEMPLATES = {
    NODE_MATTER_STATES: {
        "mcq": [
            ("When a gas is compressed at constant temperature, what happens "
             "to the average distance between its particles?",
             ["It increases", "It decreases", "It stays the same",
              "It becomes zero"],
             "It decreases"),
            ("The process in which a gas turns directly into a solid is "
             "called:", ["Sublimation", "Deposition", "Condensation",
                         "Freezing"],
             "Deposition"),
            ("Which state of matter has the highest kinetic energy per "
             "particle at the same temperature?",
             ["Solid", "Liquid", "Gas", "All equal"],
             "All equal"),
            ("Thermal expansion of solids is used in:",
             ["Thermometers", "Bimetallic strips in thermostats",
              "Gas cylinders", "Hydraulic lifts"],
             "Bimetallic strips in thermostats"),
        ],
        "fillblank": [
            ("The process _____ releases heat when gas becomes liquid.",
             ["condensation"]),
            ("On heating, the kinetic _____ of the particles increases.",
             ["energy"]),
            ("Gases are _____ easily because their particles are far apart.",
             ["compressible"]),
        ],
        "shortanswer": [
            ("A sealed bottle of perfume is opened in one corner of a room. "
             "Explain, using kinetic theory, how the smell spreads throughout "
             "the room. (3 marks)",),
            ("Two solids A and B have linear expansion coefficients "
             "α_A = 1.1×10⁻⁵ /°C and α_B = 1.9×10⁻⁵ /°C. "
             "Which expands more for the same temperature rise and why? "
             "(2 marks)",),
        ],
    },
    NODE_PHYS_CHEM_CHANGES: {
        "mcq": [
            ("Which change is irreversible?",
             ["Melting of ice", "Boiling of water",
              "Burning of wood", "Dissolving salt"],
             "Burning of wood"),
            ("When limewater turns milky on blowing air through it, "
             "this indicates:", ["a physical change", "formation of CO₂",
                                 "dissolution of lime", "no change"],
             "formation of CO₂"),
            ("Which of the following is a physical change?",
             ["Souring of milk", "Ripening of fruit",
              "Cutting an apple", "Lighting a match"],
             "Cutting an apple"),
        ],
        "fillblank": [
            ("Burning of a candle is a _____ change producing "
             "carbon dioxide and water.", ["chemical"]),
            ("The _____ of a candle wax is a physical change.",
             ["melting"]),
        ],
        "shortanswer": [
            ("Curd is formed from milk and this change cannot be reversed. "
             "Classify it and give two indicators that support your answer. "
             "(3 marks)",),
            ("When an iron nail is dipped in copper sulphate solution, "
             "it gets coated with reddish-brown copper. "
             "Is this a physical or chemical change? Justify. (2 marks)",),
        ],
    },
    NODE_ELEMENTS_COMPOUNDS: {
        "mcq": [
            ("The atomic number of an element tells us:",
             ["number of neutrons",
              "number of protons",
              "number of electrons in the outer shell only",
              "mass of the atom"],
             "number of protons"),
            ("Brass is:",
             ["an element", "a compound", "a mixture", "a molecule"],
             "a mixture"),
            ("Which of these is NOT an element from the first twenty?",
             ["Sodium (Na)", "Chlorine (Cl)", "Uranium (U)", "Calcium (Ca)"],
             "Uranium (U)"),
            ("In NH₃, the ratio of nitrogen atoms to hydrogen atoms is:",
             ["1:2", "1:3", "2:1", "3:1"],
             "1:3"),
        ],
        "fillblank": [
            ("A _____ cannot be broken down into simpler substances by "
             "physical methods.", ["compound"]),
            ("The number of protons in an atom of Carbon is _____.", ["6"]),
            ("A mixture of iron and sulphur can be separated by using "
             "a _____ .", ["magnet"]),
        ],
        "shortanswer": [
            ("Define an element. How is it different from a compound? "
             "Give one example of each. (3 marks)",),
            ("Write the chemical formula of magnesium oxide. "
             "What does the formula tell you about the elements in it? (2 marks)",),
            ("A student claims that air is a compound. Is the student correct? "
             "Explain your answer with two reasons. (3 marks)",),
        ],
    },
}

# Difficulty tags per question
_DIFFICULTY_MAP = {
    "mcq":        "medium",
    "fillblank":  "medium",
    "shortanswer":"medium",
}

# Default tags
_NODE_TAGS = {
    NODE_MATTER_STATES:      ["states-of-matter", "kinetic-theory", "phase-change"],
    NODE_PHYS_CHEM_CHANGES:  ["physical-change", "chemical-change", "indicators"],
    NODE_ELEMENTS_COMPOUNDS: ["elements", "compounds", "atoms", "first-20"],
}


# ══════════════════════════════════════════════
#  QUESTION GENERATOR CLASS
# ══════════════════════════════════════════════
class ChemistryQuestionGenerator:
    """
    Generates questions for any of the 3 nodes.
    Uses a seeded Random instance for reproducibility.

    Usage:
        gen = ChemistryQuestionGenerator(seed=42)
        q   = gen.generate(node_id="c8_chem_001", qtype="mcq", level="competency")
        print(q.full_render(show_answer=True))
    """

    def __init__(self, seed: int = 2026):
        self._rng = random.Random(seed)
        self._solver = ChemistrySolver()
        # Track used indices per (node, qtype, level) to avoid repeats
        self._used: Dict[str, set] = {}

    # ── helpers ──
    @staticmethod
    def _key(node: str, qtype: str, level: str) -> str:
        return f"{node}|{qtype}|{level}"

    def _next_index(self, node: str, qtype: str, level: str,
                    pool_size: int) -> int:
        key = self._key(node, qtype, level)
        if key not in self._used:
            self._used[key] = set()
        available = [i for i in range(pool_size) if i not in self._used[key]]
        if not available:
            # reset pool
            self._used[key] = set()
            available = list(range(pool_size))
        idx = self._rng.choice(available)
        self._used[key].add(idx)
        return idx

    # ── build a question from template ──
    def _build_mcq(self, node_id: str, level: str,
                   template: tuple) -> GeneratedQuestion:
        """
        template = (question_text, [opt1, opt2, opt3, opt4], correct_index_or_text)
        """
        qtext, opts, correct_val = template
        # Shuffle options but track correct answer
        correct_text = correct_val if isinstance(correct_val, str) else opts[correct_val]
        paired = list(zip(opts, [False] * len(opts)))
        for i, (opt, flag) in enumerate(paired):
            if opt == correct_text:
                paired[i] = (opt, True)
                break
        self._rng.shuffle(paired)
        shuffled_opts  = [p[0] for p in paired]
        correct_label  = string.ascii_uppercase[paired.index((correct_text, True))]

        steps = [
            "Step 1: Read each option carefully.",
            f"Step 2: Eliminate options that contradict the definition or "
            f"property taught in this node.",
            f"Step 3: The correct statement is option {correct_label} "
            f"('{correct_text}').",
        ]
        explanation = (
            f"Correct option: **{correct_label}) {correct_text}**\n\n"
            f"This follows directly from the definition in the syllabus:\n"
            f"- Matter is made of tiny particles.\n"
            f"- Heating gives particles more kinetic energy.\n"
            f"- Particles themselves do NOT change size."
        )
        return GeneratedQuestion(
            node_id=node_id,
            node_label=NODE_LABELS[node_id],
            qtype="mcq",
            level=level,
            difficulty=_DIFFICULTY_MAP["mcq"],
            question_text=qtext,
            options=shuffled_opts,
            correct_answer=f"{correct_label}) {correct_text}",
            step_by_step=steps,
            explanation=explanation,
            tags=_NODE_TAGS[node_id],
        )

    def _build_fillblank(self, node_id: str, level: str,
                         template: tuple) -> GeneratedQuestion:
        qtext, answers = template
        correct = self._rng.choice(answers)
        steps = [
            f"Step 1: Recall the key definition or term from the node.",
            f"Step 2: The blank refers to: '{correct}'.",
        ]
        if len(answers) > 1:
            steps.append(f"Alternative acceptable answers: {answers}.")
        explanation = f"The correct answer is **'{correct}'**."
        return GeneratedQuestion(
            node_id=node_id,
            node_label=NODE_LABELS[node_id],
            qtype="fillblank",
            level=level,
            difficulty=_DIFFICULTY_MAP["fillblank"],
            question_text=qtext,
            correct_answer=correct,
            step_by_step=steps,
            explanation=explanation,
            tags=_NODE_TAGS[node_id],
        )

    def _build_shortanswer(self, node_id: str, level: str,
                           template: tuple) -> GeneratedQuestion:
        # template is a 1-tuple with the question text
        qtext = template[0]

        # Use solver to generate steps
        if node_id == NODE_MATTER_STATES:
            # generic expansion-type step-by-step
            steps = [
                "Step 1: Identify the key concept (kinetic theory, expansion, "
                "or interconversion).",
                "Step 2: Explain in your own words using particle-level language.",
                "Step 3: Give one real-life example to support your answer.",
                "Step 4: Check: does your answer mention the correct "
                "state/property?",
            ]
            explanation = (
                "A good answer should:\n"
                "- Mention particles and their motion.\n"
                "- Link heating/cooling to kinetic energy.\n"
                "- Include a relevant example (e.g., metal rails expanding, "
                "ice melting)."
            )
        elif node_id == NODE_PHYS_CHEM_CHANGES:
            steps = [
                "Step 1: Identify whether a new substance is formed.",
                "Step 2: Check if the change is reversible.",
                "Step 3: List at least one indicator (gas evolution, "
                "temperature change, colour change, etc.).",
                "Step 4: State 'Physical' or 'Chemical' and justify.",
            ]
            explanation = (
                "Physical change: no new substance, reversible.\n"
                "Chemical change: new substance formed, irreversible "
                "(usually), with indicators like gas, heat, colour change."
            )
        else:
            steps = [
                "Step 1: Recall definitions of element, compound, mixture.",
                "Step 2: Identify the substance type from the name or formula.",
                "Step 3: State the formula and ratio of elements if it is "
                "a compound.",
                "Step 4: Give one example or separation method if asked.",
            ]
            explanation = (
                "Element: one kind of atom (e.g., O₂ is an element).\n"
                "Compound: two or more elements chemically combined in a "
                "fixed ratio (e.g., H₂O).\n"
                "Mixture: physical combination; each substance keeps its "
                "own properties."
            )
        return GeneratedQuestion(
            node_id=node_id,
            node_label=NODE_LABELS[node_id],
            qtype="shortanswer",
            level=level,
            difficulty=_DIFFICULTY_MAP["shortanswer"],
            question_text=qtext,
            correct_answer="See step-by-step solution",
            step_by_step=steps,
            explanation=explanation,
            tags=_NODE_TAGS[node_id] + ["marks-guidance"],
        )

    # ── PUBLIC API ──

    def generate(self,
                 node_id: str    = NODE_MATTER_STATES,
                 qtype: str      = "mcq",
                 level: str      = "competency",
                 use_solver: bool = True) -> GeneratedQuestion:
        """
        Generate one question.

        Parameters
        ----------
        node_id : one of the three NODE_* constants
        qtype   : "mcq" | "fillblank" | "shortanswer"
        level   : "competency" (easier, Indian textbook style)
                  | "standard" (slightly harder)
        use_solver: if True, enrich explanation using the solver

        Returns
        -------
        GeneratedQuestion
        """
        # Pick template pool
        if level not in ("competency", "standard"):
            raise ValueError("level must be 'competency' or 'standard'")
        if qtype not in ("mcq", "fillblank", "shortanswer"):
            raise ValueError("qtype must be 'mcq', 'fillblank', or 'shortanswer'")

        pool_map = {
            "competency": _COMPETENCY_TEMPLATES,
            "standard":   _STANDARD_TEMPLATES,
        }
        pool     = pool_map[level].get(node_id, {}).get(qtype, [])
        if not pool:
            raise ValueError(
                f"No templates for node={node_id}, qtype={qtype}, level={level}"
            )
        idx = self._next_index(node_id, qtype, level, len(pool))
        template = pool[idx]

        if qtype == "mcq":
            q = self._build_mcq(node_id, level, template)
        elif qtype == "fillblank":
            q = self._build_fillblank(node_id, level, template)
        else:
            q = self._build_shortanswer(node_id, level, template)

        # Optionally enrich with solver
        if use_solver:
            try:
                solver_result = self._solver.solve(
                    node_id,
                    {
                        "mcq":        "classify_change",
                        "fillblank":  "interconversion",
                        "shortanswer":"solve_identify_state",
                    }.get(qtype, "solve_identify_state")
                )
                # Merge step-by-step if shortanswer
                if qtype == "shortanswer" and solver_result.steps:
                    q.step_by_step = solver_result.steps + q.step_by_step
                    q.explanation  = solver_result.explanation
            except Exception:
                pass  # keep template explanation

        return q

    def generate_set(self,
                     node_ids:    Optional[List[str]] = None,
                     qtypes:      Optional[List[str]] = None,
                     levels:      Optional[List[str]] = None,
                     n_per_cell:  int = 2) -> List[GeneratedQuestion]:
        """
        Generate a balanced set of questions across nodes/types/levels.

        Parameters
        ----------
        node_ids : list of node IDs (default: all 3)
        qtypes   : list of qtypes to include (default: all 3)
        levels   : list of levels (default: both)
        n_per_cell: questions per (node × qtype × level) combination

        Returns
        -------
        list of GeneratedQuestion
        """
        node_ids = node_ids or list(NODE_LABELS.keys())
        qtypes   = qtypes   or ["mcq", "fillblank", "shortanswer"]
        levels   = levels   or ["competency", "standard"]

        questions: List[GeneratedQuestion] = []
        for node in node_ids:
            for qt in qtypes:
                for lv in levels:
                    for _ in range(n_per_cell):
                        try:
                            q = self.generate(node_id=node,
                                               qtype=qt,
                                               level=lv,
                                               use_solver=True)
                            questions.append(q)
                        except ValueError:
                            # template not available for this combination
                            pass
        return questions

    def batch_to_markdown(self, questions: List[GeneratedQuestion],
                          show_answer: bool = False) -> str:
        """Render a list of questions as markdown text."""
        lines = ["# Class 8 Chemistry – Practice Set",
                 "", f"Total questions: **{len(questions)}**", ""]
        for i, q in enumerate(questions, 1):
            lines.append(f"## Q{i}. {q.node_label}")
            lines.append("")
            if show_answer:
                lines.append(q.full_render(show_answer=True))
            else:
                lines.append(q.full_render(show_answer=False))
            lines.append("")
        return "\n".join(lines)


# ══════════════════════════════════════════════
#  CLI ENTRY POINT
# ══════════════════════════════════════════════
if __name__ == "__main__":
    gen = ChemistryQuestionGenerator(seed=42)

    print("=" * 60)
    print("CLASS 8 CHEMISTRY – QUESTION GENERATOR DEMO")
    print("=" * 60)

    for node_id in NODE_LABELS:
        print(f"\n{'='*60}")
        print(f"NODE: {NODE_LABELS[node_id]}")
        print(f"{'='*60}")

        for level in ("competency", "standard"):
            for qtype in ("mcq", "fillblank", "shortanswer"):
                try:
                    q = gen.generate(node_id=node_id, qtype=qtype, level=level)
                    print()
                    print(q.full_render(show_answer=True))
                    print()
                except ValueError as e:
                    print(f"  [{level}/{qtype}] Skipped: {e}")

    # Batch set demo
    print("\n" + "=" * 60)
    print("BALANCED SET (2 per cell)")
    print("=" * 60)
    batch = gen.generate_set(n_per_cell=2)
    md = gen.batch_to_markdown(batch, show_answer=True)
    print(md[:3000])  # first 3000 chars
    print("\n... (truncated)")
