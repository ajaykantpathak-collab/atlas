"""
Class 4 Chemistry — Question Generator Module (3 nodes)
NODES:
  c4_chem_001  Revision of matter (solids, liquids, gases)
  c4_chem_002  Properties of air
  c4_chem_003  Composition of air (gases and water vapour)

QUESTION TYPES PER NODE
───────────────────────
  c4_chem_001: mcq_classify, fill_blank_state, match_column, why_liquid, true_false_state
  c4_chem_002: mcq_property, fill_blank_air, experiment_question, true_false_air
  c4_chem_003: mcq_gas, fill_blank_comp, percentage_question, condensation_question

All generators are deterministic when seed is provided.
Output format: {node_id, q_type, difficulty, question, options (if MCQ), answer,
                explanation, steps, tags, competency}
"""
import random, textwrap
from dataclasses import dataclass, field
from typing import List, Optional, Dict
from class4_chem_solver import (
    ChemClass4Solver, MatterSolver, AirPropertiesSolver, AirCompositionSolver,
    SOLID_EXAMPLES, LIQUID_EXAMPLES, GAS_EXAMPLES, AIR_PROPERTIES, AIR_COMPONENTS,
)


# ─────────────────────────────────────────────
#  DATA STRUCTURES
# ─────────────────────────────────────────────

@dataclass
class ChemistryQuestion:
    node_id:    str
    q_type:     str
    difficulty: str          # Easy / Medium
    competency: str          # Remember / Understand / Apply
    question:   str
    options:    Optional[List[str]]   = None   # for MCQ
    answer:     str          = ""
    explanation:str          = ""
    steps:      List[str]    = field(default_factory=list)
    tags:       List[str]    = field(default_factory=list)
    exam_relevance: str      = "School_Only"


# ─────────────────────────────────────────────────────────────────
#  NODE 1 — Revision of matter (solids, liquids, gases)
# ─────────────────────────────────────────────────────────────────

class Node1QuestionGenerator:

    # ── helpers ──────────────────────────────────────────────────────
    @staticmethod
    def _all_items():
        return (
            [("solid", s) for s in SOLID_EXAMPLES]
            + [("liquid", l) for l in LIQUID_EXAMPLES]
            + [("gas", g) for g in GAS_EXAMPLES]
        )

    # ── Q-type: mcq_classify ─────────────────────────────────────────
    @staticmethod
    def mcq_classify(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        all_items = Node1QuestionGenerator._all_items()
        correct_state, correct_item = rng.choice(all_items)
        # build distractors from other states
        other = [(s, it) for s, it in all_items if s != correct_state]
        rng.shuffle(other)
        distractors = [it for _, it in other[:3]]
        options = [correct_item] + distractors
        rng.shuffle(options)

        question = (
            f"Which of the following is a {correct_state}?\n"
            f"  A) {options[0]}\n"
            f"  B) {options[1]}\n"
            f"  C) {options[2]}\n"
            f"  D) {options[3]}"
        )
        answer = correct_item
        result = MatterSolver.solve_classify(correct_item, seed=seed)
        return ChemistryQuestion(
            node_id="c4_chem_001", q_type="mcq_classify",
            difficulty=difficulty, competency="Remember",
            question=question, options=options, answer=answer,
            explanation=result.explanation, steps=result.steps,
            tags=["states_of_matter", "classification", correct_state],
        )

    # ── Q-type: fill_blank_state ──────────────────────────────────────
    @staticmethod
    def fill_blank_state(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        all_items = Node1QuestionGenerator._all_items()
        state, item = rng.choice(all_items)
        templates = [
            f"{item.title()} is a ______ because it {'has its own shape and size' if state=='solid' else 'has a definite volume but no fixed shape' if state=='liquid' else 'has neither fixed shape nor fixed volume'}.",
            f"A {state} has {'a definite shape and a definite volume' if state=='solid' else 'a definite volume but no fixed shape' if state=='liquid' else 'neither a definite shape nor a definite volume'}. {item.title()} is an example of a ______.",
        ]
        question = rng.choice(templates)
        return ChemistryQuestion(
            node_id="c4_chem_001", q_type="fill_blank_state",
            difficulty=difficulty, competency="Remember",
            question=question, answer=state,
            explanation=f"The blank should be filled with '{state}'.",
            steps=[f"Think about the properties of {item}.", f"It is a {state}."],
            tags=["fill_blank", "states_of_matter", state],
        )

    # ── Q-type: match_column ──────────────────────────────────────────
    @staticmethod
    def match_column(seed: Optional[int] = None, difficulty: str = "Medium") -> ChemistryQuestion:
        rng = random.Random(seed)
        all_items = Node1QuestionGenerator._all_items()
        rng.shuffle(all_items)
        picked = all_items[:4]
        col_a = "Column A (Items)\n"
        for i, (state, item) in enumerate(picked, 1):
            col_a += f"  {i}. {item.title()}\n"
        col_b = "Column B (States)\n  P. Solid\n  Q. Liquid\n  R. Gas\n  S. None of these\n"
        question = f"Match the items in Column A with the correct state in Column B.\n{col_a}{col_b}\nWrite your answer as: 1-P, 2-Q, 3-R, 4-S format."
        mapping = {"solid": "P", "liquid": "Q", "gas": "R"}
        answer_str = ", ".join(f"{i}-{mapping[state]}" for i, (state, _) in enumerate(picked, 1))
        steps = [
            "Step 1: For each item, recall whether it has fixed shape+volume (solid), "
            "fixed volume only (liquid), or neither (gas).",
            "Step 2: Write the matching letter next to each number.",
        ]
        explanation = f"Correct matching: {answer_str}"
        return ChemistryQuestion(
            node_id="c4_chem_001", q_type="match_column",
            difficulty=difficulty, competency="Apply",
            question=question, answer=answer_str,
            explanation=explanation, steps=steps,
            tags=["matching", "states_of_matter", "column_matching"],
        )

    # ── Q-type: why_liquid ─────────────────────────────────────────────
    @staticmethod
    def why_liquid(seed: Optional[int] = None, difficulty: str = "Medium") -> ChemistryQuestion:
        question = (
            "When water is poured into a cup, it takes the exact shape of the cup. "
            "Why does water do this? Explain using the properties of matter."
        )
        result = MatterSolver.solve_why_liquid_takes_shape(seed=seed)
        return ChemistryQuestion(
            node_id="c4_chem_001", q_type="why_liquid",
            difficulty=difficulty, competency="Understand",
            question=question, answer=result.answer,
            explanation=result.explanation, steps=result.steps,
            tags=["short_answer", "liquid_property", "reasoning"],
        )

    # ── Q-type: true_false_state ───────────────────────────────────────
    @staticmethod
    def true_false_state(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        statements = [
            ("A stone has its own shape and size.", True),
            ("Water flows and takes the shape of its container.", True),
            ("Air has a fixed shape.", False),
            ("A book is a liquid because it can be poured.", False),
            ("A gas spreads out to fill all available space.", True),
            ("All solids can be cut into pieces with a knife.", False),
            ("A balloon filled with air keeps its round shape.", True),
            ("Milk does not have its own shape.", True),
        ]
        stmt, correct = rng.choice(statements)
        question = f"State whether the following statement is TRUE or FALSE:\n  \"{stmt}\""
        return ChemistryQuestion(
            node_id="c4_chem_001", q_type="true_false_state",
            difficulty=difficulty, competency="Remember",
            question=question,
            answer="TRUE" if correct else "FALSE",
            explanation=(
                f"The statement is {'TRUE' if correct else 'FALSE'}. "
                + ("This matches the definition of the state of matter described." if correct
                   else "This contradicts the properties of the state of matter described.")
            ),
            steps=["Step 1: Read the statement carefully.", "Step 2: Recall the property.",
                   f"Step 3: Decide: {'TRUE' if correct else 'FALSE'}"],
            tags=["true_false", "states_of_matter"],
        )


# ─────────────────────────────────────────────────────────────────
#  NODE 2 — Properties of air
# ─────────────────────────────────────────────────────────────────

class Node2QuestionGenerator:

    # ── Q-type: mcq_property ──────────────────────────────────────────
    @staticmethod
    def mcq_property(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        prop = rng.choice(AIR_PROPERTIES)
        prop_id = prop["id"]
        # Build question around the property
        question_stems = {
            "occupies_space": (
                "When an empty glass is pushed upside down into a bowl of water, "
                "the water does NOT enter the glass. What property of air does this prove?"
            ),
            "has_weight": (
                "When two identical balloons are hung on a balanced ruler, the side with "
                "the inflated balloon dips lower. What property of air does this show?"
            ),
            "expands_on_heating": (
                "A deflated balloon placed over a bottle becomes bigger when the bottle "
                "is warmed by hand. What property of air causes this?"
            ),
            "no_colour_smell_taste": (
                "We cannot see, smell, or taste air in an ordinary room. "
                "What does this tell us about air?"
            ),
        }
        question = question_stems.get(prop_id, f"What is a property of air?")
        correct_answer = prop["name"]

        # build distractors
        other_names = [p["name"] for p in AIR_PROPERTIES if p["id"] != prop_id]
        rng.shuffle(other_names)
        options = [correct_answer] + other_names[:3]
        rng.shuffle(options)

        display = "\n".join(f"  {chr(65+i)}) {opt}" for i, opt in enumerate(options))
        full_question = f"{question}\n{display}"
        return ChemistryQuestion(
            node_id="c4_chem_002", q_type="mcq_property",
            difficulty=difficulty, competency="Remember",
            question=full_question, options=options, answer=correct_answer,
            explanation=f"This experiment proves: {prop['name']}. {prop['observation']}",
            steps=[
                f"Step 1: Read the experiment description carefully.",
                f"Step 2: Recall the four properties of air.",
                f"Step 3: Match the observation to the property: {prop['name']}.",
                f"Step 4: Confirm: {prop['observation']}",
            ],
            tags=["mcq", "properties_of_air", prop_id],
        )

    # ── Q-type: fill_blank_air ─────────────────────────────────────────
    @staticmethod
    def fill_blank_air(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        prop = rng.choice(AIR_PROPERTIES)
        blanks = {
            "occupies_space": ("Air ______ space.", "occupies"),
            "has_weight": ("Air has ______.", "weight"),
            "expands_on_heating": ("Air ______ when heated.", "expands"),
            "no_colour_smell_taste": ("Air has no colour, no ______, and no taste.", "smell"),
        }
        question_text, correct_word = blanks[prop["id"]]
        return ChemistryQuestion(
            node_id="c4_chem_002", q_type="fill_blank_air",
            difficulty=difficulty, competency="Remember",
            question=f"Fill in the blank:\n  {question_text}",
            answer=correct_word,
            explanation=f"The correct word is '{correct_word}'. {prop['name']}.",
            steps=[f"Recall the property: {prop['name']}.",
                   f"Fill in the blank with '{correct_word}'."],
            tags=["fill_blank", "properties_of_air", prop["id"]],
        )

    # ── Q-type: experiment_question ────────────────────────────────────
    @staticmethod
    def experiment_question(seed: Optional[int] = None, difficulty: str = "Medium") -> ChemistryQuestion:
        rng = random.Random(seed)
        prop = rng.choice(AIR_PROPERTIES)
        question = (
            f"EXPERIMENT QUESTION:\n"
            f"  '{prop['experiment']}'\n"
            f"  What do you observe? What property of air does this prove? "
            f"Give a full answer with observation AND property."
        )
        result = AirPropertiesSolver.solve_experiment_property(prop["experiment"], seed=seed)
        return ChemistryQuestion(
            node_id="c4_chem_002", q_type="experiment_question",
            difficulty=difficulty, competency="Apply",
            question=question, answer=result.answer,
            explanation=result.explanation, steps=result.steps,
            tags=["experiment", "practical", "properties_of_air", prop["id"]],
        )

    # ── Q-type: true_false_air ─────────────────────────────────────────
    @staticmethod
    def true_false_air(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        statements = [
            ("Air is made of only one gas.", False),
            ("Air has weight, even though we cannot feel it easily.", True),
            ("Air occupies space.", True),
            ("Air has a definite shape.", False),
            ("Air expands when heated.", True),
            ("Air can be seen with our eyes in a clear room.", False),
            ("An inflated balloon is heavier than a flat balloon.", True),
            ("Air has no colour, no smell, and no taste.", True),
            ("Air does not occupy space because it is invisible.", False),
            ("A glass filled with air has the same weight as an empty glass.", False),
        ]
        stmt, correct = rng.choice(statements)
        question = f"State TRUE or FALSE:\n  \"{stmt}\""
        return ChemistryQuestion(
            node_id="c4_chem_002", q_type="true_false_air",
            difficulty=difficulty, competency="Remember",
            question=question,
            answer="TRUE" if correct else "FALSE",
            explanation=f"{'Correct — ' if correct else 'Incorrect — '}{stmt.lower()}",
            steps=["Step 1: Read the statement.",
                   "Step 2: Recall the four properties of air.",
                   f"Step 3: Decide: {'TRUE' if correct else 'FALSE'}"],
            tags=["true_false", "properties_of_air"],
        )


# ─────────────────────────────────────────────────────────────────
#  NODE 3 — Composition of air (gases and water vapour)
# ─────────────────────────────────────────────────────────────────

class Node3QuestionGenerator:

    # ── Q-type: mcq_gas ───────────────────────────────────────────────
    @staticmethod
    def mcq_gas(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        gas = rng.choice([c for c in AIR_COMPONENTS if c["gas"] != "Other gases"])

        # Build a descriptive clue
        clue_templates = [
            f"Which gas in air is used by plants for photosynthesis and is given out when we breathe out?",
            f"Which gas makes up approximately {gas['approx_pct']}% of air?",
            f"Which gas in air is essential for breathing and for burning?",
            f"Which gas in air has no colour, no smell, and makes up the largest part of air?",
            f"Which gas in air condenses into water droplets on a cold surface?",
        ]
        rng.shuffle(clue_templates)
        question_text = rng.choice(clue_templates)

        # Determine correct answer from the clue
        clue_lower = question_text.lower()
        if "photosynthesis" in clue_lower or "breathe out" in clue_lower:
            correct_gas = AirCompositionSolver._get_component("Carbon dioxide")
        elif "essential for breathing" in clue_lower or "burning" in clue_lower:
            correct_gas = AirCompositionSolver._get_component("Oxygen")
        elif "largest part" in clue_lower or "78" in clue_lower:
            correct_gas = AirCompositionSolver._get_component("Nitrogen")
        elif "condenses" in clue_lower or "droplets" in clue_lower:
            correct_gas = AirCompositionSolver._get_component("Water vapour")
        elif "inert" in clue_lower or "unreactive" in clue_lower:
            correct_gas = AirCompositionSolver._get_component("Argon")
        else:
            correct_gas = gas

        correct_name = correct_gas["gas"]
        other_names = [c["gas"] for c in AIR_COMPONENTS if c["gas"] != correct_name and c["gas"] != "Other gases"]
        rng.shuffle(other_names)
        options = [correct_name] + other_names[:3]
        rng.shuffle(options)

        display = "\n".join(f"  {chr(65+i)}) {opt}" for i, opt in enumerate(options))
        full_question = f"{question_text}\n{display}"
        result = AirCompositionSolver.solve_identify_gas(
            f"The gas used for breathing and burning", seed=seed
        )
        return ChemistryQuestion(
            node_id="c4_chem_003", q_type="mcq_gas",
            difficulty=difficulty, competency="Remember",
            question=full_question, options=options, answer=correct_name,
            explanation=(
                f"The answer is {correct_name} ({correct_gas['symbol']}). "
                f"{correct_gas['role']}"
            ),
            steps=[
                f"Step 1: Read the description carefully.",
                "Step 2: Recall the composition of air.",
                f"Step 3: Match the description to the correct gas: {correct_name}.",
                f"Step 4: Verify: {correct_gas['role']}",
            ],
            tags=["mcq", "composition_of_air", correct_gas["id"]],
        )

    # ── Q-type: fill_blank_comp ────────────────────────────────────────
    @staticmethod
    def fill_blank_comp(seed: Optional[int] = None, difficulty: str = "Easy") -> ChemistryQuestion:
        rng = random.Random(seed)
        facts = [
            ("The main gas in air is ______ and it makes up about 78% of air.", "nitrogen"),
            ("The gas we breathe in is ______ (about 21% of air).", "oxygen"),
            ("Plants use ______ from the air for photosynthesis.", "carbon dioxide"),
            ("Air contains invisible ______ that causes condensation on cold surfaces.", "water vapour"),
            ("About 21% of air is ______, which we need for breathing.", "oxygen"),
            ("______ makes up about 78% of air.", "nitrogen"),
            ("The gas given out when we breathe out is ______.", "carbon dioxide"),
        ]
        question_text, correct_word = rng.choice(facts)
        return ChemistryQuestion(
            node_id="c4_chem_003", q_type="fill_blank_comp",
            difficulty=difficulty, competency="Remember",
            question=f"Fill in the blank:\n  {question_text}",
            answer=correct_word,
            explanation=f"The correct answer is '{correct_word.title()}'.",
            steps=[f"Recall the composition of air.", f"Fill in: {correct_word}."],
            tags=["fill_blank", "composition_of_air"],
        )

    # ── Q-type: percentage_question ────────────────────────────────────
    @staticmethod
    def percentage_question(seed: Optional[int] = None, difficulty: str = "Medium") -> ChemistryQuestion:
        rng = random.Random(seed)
        components_for_pct = [c for c in AIR_COMPONENTS
                              if isinstance(c["approx_pct"], (int, float))]
        gas = rng.choice(components_for_pct)
        question = (
            f"Approximately what percentage of air is made up of {gas['gas']} ({gas['symbol']})?"
        )
        result = AirCompositionSolver.solve_percentage_question(gas["gas"], seed=seed)
        correct_pct = gas["approx_pct"]
        # options
        base = int(correct_pct) if isinstance(correct_pct, (int, float)) else 50
        distractors = sorted({base - 10, base + 10, base + 20, base - 20} - {base})
        options = [f"~{correct_pct}%"] + [f"~{d}%" for d in distractors[:3]]
        rng.shuffle(options)
        display = "\n".join(f"  {chr(65+i)}) {opt}" for i, opt in enumerate(options))
        return ChemistryQuestion(
            node_id="c4_chem_003", q_type="percentage_question",
            difficulty=difficulty, competency="Remember",
            question=f"{question}\n{display}",
            options=options, answer=f"~{correct_pct}%",
            explanation=result.explanation, steps=result.steps,
            tags=["mcq", "percentage", "composition_of_air", gas["gas"].lower()],
        )

    # ── Q-type: condensation_question ──────────────────────────────────
    @staticmethod
    def condensation_question(seed: Optional[int] = None, difficulty: str = "Medium") -> ChemistryQuestion:
        question = (
            "You place a cold glass of water on a table. After a few minutes, you see tiny "
            "water droplets forming on the OUTSIDE of the glass.\n"
            "Where do these droplets come from? Explain what this tells us about air."
        )
        result = AirCompositionSolver.solve_condensation_question(seed=seed)
        return ChemistryQuestion(
            node_id="c4_chem_003", q_type="condensation_question",
            difficulty=difficulty, competency="Understand",
            question=question, answer=result.answer,
            explanation=result.explanation, steps=result.steps,
            tags=["short_answer", "water_vapour", "condensation", "composition"],
        )


# ─────────────────────────────────────────────────────────────────
#  MASTER QUESTION GENERATOR
# ─────────────────────────────────────────────────────────────────

class ChemClass4QuestionGenerator:
    """
    Generates questions for all 3 Class 4 Chemistry nodes.

    Usage:
        gen = ChemClass4QuestionGenerator(seed=42)
        q = gen.generate("c4_chem_001", "mcq_classify")
        print(q.question)
        print("Answer:", q.answer)
    """

    _node_generators = {
        "c4_chem_001": Node1QuestionGenerator,
        "c4_chem_002": Node2QuestionGenerator,
        "c4_chem_003": Node3QuestionGenerator,
    }

    _q_type_map = {
        # Node 1
        "c4_chem_001": ["mcq_classify", "fill_blank_state", "match_column",
                        "why_liquid", "true_false_state"],
        # Node 2
        "c4_chem_002": ["mcq_property", "fill_blank_air", "experiment_question",
                        "true_false_air"],
        # Node 3
        "c4_chem_003": ["mcq_gas", "fill_blank_comp", "percentage_question",
                        "condensation_question"],
    }

    def __init__(self, seed: int = 42):
        self.global_seed = seed

    def _rng(self, node_id: str, q_type: str) -> random.Random:
        """Deterministic per-quation RNG from seed + node + type."""
        h = hash((self.global_seed, node_id, q_type)) % (2**31)
        return random.Random(h)

    def generate(self, node_id: str, q_type: str) -> ChemistryQuestion:
        """
        Generate a single question.

        Raises ValueError if node_id or q_type is invalid.
        """
        if node_id not in self._node_generators:
            raise ValueError(
                f"Unknown node '{node_id}'. Valid: {list(self._node_generators.keys())}"
            )
        if q_type not in self._q_type_map.get(node_id, []):
            valid = self._q_type_map.get(node_id, [])
            raise ValueError(
                f"Unknown q_type '{q_type}' for node '{node_id}'. Valid: {valid}"
            )
        rng = self._rng(node_id, q_type)
        per_q_seed = rng.randint(0, 2**30)
        gen = self._node_generators[node_id]
        method = getattr(gen, q_type)
        return method(seed=per_q_seed)

    def generate_all(self) -> Dict[str, List[ChemistryQuestion]]:
        """Generate one question of every type for every node."""
        output: Dict[str, List[ChemistryQuestion]] = {}
        for node_id, types in self._q_type_map.items():
            questions: List[ChemistryQuestion] = []
            for q_type in types:
                questions.append(self.generate(node_id, q_type))
            output[node_id] = questions
        return output

    def generate_batch(self, node_id: str, q_type: str, count: int = 3) -> List[ChemistryQuestion]:
        """Generate `count` distinct questions of the given type."""
        questions: List[ChemistryQuestion] = []
        for i in range(count):
            seed = hash((self.global_seed, node_id, q_type, i)) % (2**31)
            gen = self._node_generators[node_id]
            method = getattr(gen, q_type)
            questions.append(method(seed=seed))
        return questions

    def get_available_types(self, node_id: str) -> List[str]:
        return self._q_type_map.get(node_id, [])

    def get_all_nodes(self) -> List[str]:
        return list(self._node_generators.keys())


# ─────────────────────────────────────────────
#  PRETTY PRINTER
# ─────────────────────────────────────────────

def print_question(q: ChemistryQuestion, show_answer: bool = False) -> None:
    """Nicely format and print a ChemistryQuestion."""
    border = "─" * 60
    print(border)
    print(f"  Node   : {q.node_id}")
    print(f"  Type   : {q.q_type}")
    print(f"  Level  : {q.difficulty}  |  Competency: {q.competency}")
    print(border)
    print(f"  Q: {q.question}")
    if q.options:
        print()
    if show_answer:
        print(f"  ✔ Answer   : {q.answer}")
        print(f"  ✔ Steps    :")
        for s in q.steps:
            print(f"      {s}")
        print(f"  ✔ Explanation: {q.explanation[:120]}")
    print(border)


def print_all(generator: ChemClass4QuestionGenerator, show_answer: bool = False) -> None:
    print("=" * 60)
    print("  CLASS 4 CHEMISTRY — ALL QUESTIONS")
    print("=" * 60)
    all_q = generator.generate_all()
    for node_id, questions in all_q.items():
        print(f"\n{'='*60}")
        print(f"  NODE: {node_id}")
        print(f"{'='*60}")
        for q in questions:
            print_question(q, show_answer=show_answer)
            print()


# ─────────────────────────────────────────────────────────────────
#  VERIFICATION / SELF-TEST
# ─────────────────────────────────────────────────────────────────

def _verify_generator(seed: int = 42) -> bool:
    """Generate one question of every type and confirm it has non-empty answer."""
    gen = ChemClass4QuestionGenerator(seed=seed)
    passed = 0
    failed = 0
    print("  Generating all questions...")
    all_q = gen.generate_all()
    for node_id, questions in all_q.items():
        print(f"\n  [{node_id}]")
        for q in questions:
            ok = bool(q.answer.strip()) and bool(q.explanation.strip())
            tag_str = ", ".join(q.tags[:3]) if q.tags else "—"
            status = "✓" if ok else "✗"
            print(f"    {status} {q.q_type:30s} | {tag_str}")
            if ok:
                passed += 1
            else:
                failed += 1
    print(f"\n  Summary: {passed} passed, {failed} failed out of {passed+failed}")
    return failed == 0


def _verify_determinism(seed: int = 42) -> bool:
    """Run generator twice with same seed; answers must be identical."""
    gen1 = ChemClass4QuestionGenerator(seed=seed)
    gen2 = ChemClass4QuestionGenerator(seed=seed)
    all_1 = gen1.generate_all()
    all_2 = gen2.generate_all()
    all_ok = True
    for node_id in all_1:
        for q1, q2 in zip(all_1[node_id], all_2[node_id]):
            if q1.answer != q2.answer or q1.question != q2.question:
                print(f"  ✗ MISMATCH: {node_id} / {q1.q_type}")
                all_ok = False
    if all_ok:
        print("  ✓ Determinism verified — same seed produces identical questions.")
    return all_ok


if __name__ == "__main__":
    print("=" * 60)
    print("  Class 4 Chemistry — Question Generator Self-Test")
    print("=" * 60)

    print("\n[1] Generating all questions (with answers):")
    print("─" * 60)
    gen = ChemClass4QuestionGenerator(seed=42)
    print_all(gen, show_answer=True)

    print("\n[2] Verification:")
    print("─" * 60)
    ok1 = _verify_generator(seed=42)
    ok2 = _verify_determinism(seed=42)
    if ok1 and ok2:
        print("\n  ALL CHECKS PASSED ✓")
    else:
        print("\n  SOME CHECKS FAILED ✗")