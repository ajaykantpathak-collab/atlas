"""
Class 3 Chemistry Solver
Covers: Living/Non-living, Solids, Liquids
Syllabus: ICSE Class 3 Chemistry
"""

import random
import math
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
from enum import Enum

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
_SEED = 42

def seeded_rng(seed: int = _SEED):
    return random.Random(seed)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
class NodeID(Enum):
    C3_CHEM_001 = "c3_chem_001"   # Living and non-living things
    C3_CHEM_002 = "c3_chem_002"   # Forms of matter - solids
    C3_CHEM_003 = "c3_chem_003"   # Forms of matter - liquids


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"


class Competency(Enum):
    SCHOOL = "School"
    FOUNDATIONAL = "Foundational"


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

# ── Node 001: Living and Non-Living ─────────────────────────────────────────
LIVING_FEATURES = [
    "grow",
    "need food and water",
    "breathe",
    "move on their own",
    "reproduce",
    "respond to surroundings",
]

NON_LIVING_CHARACTERISTICS = [
    "do not grow",
    "do not need food",
    "do not breathe",
    "do not move on their own",
    "do not reproduce",
]

EXAMPLES_LIVING = [
    ("cat",       ["grow", "need food and water", "breathe", "move on its own"]),
    ("tree",      ["grow", "need water", "breathe (take in air)", "stay in place"]),
    ("dog",       ["grow", "need food and water", "breathe", "move on its own", "reproduce"]),
    ("human",     ["grow", "need food and water", "breathe", "move on its own", "think"]),
    ("bird",      ["grow", "need food and water", "breathe", "move on its own", "reproduce"]),
    ("fish",      ["grow", "need food and water", "breathe (in water)", "swim"]),
    ("rose plant",["grow", "need water and sunlight", "breathe", "stay rooted"]),
]

EXAMPLES_NON_LIVING = [
    ("rock",      ["hard", "does not grow", "does not need food"]),
    ("book",      ["has pages", "does not grow", "does not need food"]),
    ("table",     ["has legs", "does not grow", "does not need food"]),
    ("ball",      ["round", "does not grow", "does not need food", "can be rolled but does not move by itself"]),
    ("car",       ["has wheels", "does not grow", "needs fuel but does not eat food"]),
    ("pen",       ["writes", "does not grow", "does not need food"]),
    ("chair",     ["to sit on", "does not grow", "does not need food"]),
    ("cloud",     ["floats in sky", "moves with wind but does not move on its own"]),
]

# ── Node 002: Solids ─────────────────────────────────────────────────────────
SOLID_EXAMPLES = [
    ("stone",  "hard, fixed shape"),
    ("book",   "rectangular, fixed shape"),
    ("pencil", "long, fixed shape"),
    ("chair",  "fixed shape"),
    ("table",  "fixed shape"),
    ("brick",  "hard, fixed shape"),
    ("football","round, fixed shape"),
    ("rubber", "bouncy, fixed shape"),
    ("coin",   "flat and round, fixed shape"),
    ("pot",    "holds things, fixed shape"),
]

SOLID_PROPERTIES = [
    "fixed shape",
    "fixed volume",
    "does not flow",
    "does not spread to fill the container",
    "can be hard or soft",
]

# ── Node 003: Liquids ─────────────────────────────────────────────────────────
LIQUID_EXAMPLES = [
    ("water", "flows, takes shape of container"),
    ("milk",  "white, takes shape of container"),
    ("oil",   "slippery, takes shape of container"),
    ("juice", "sweet, takes shape of container"),
    ("honey", "thick and sticky, takes shape of container"),
    ("ink",   "coloured, takes shape of container"),
    ("coconut oil", "thick, takes shape of container"),
    ("syrup", "thick, takes shape of container"),
]

LIQUID_PROPERTIES = [
    "takes the shape of the container",
    "has a fixed volume",
    "flows from one place to another",
    "does not have a fixed shape",
    "can be poured",
]


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Question:
    node: str
    difficulty: str
    competency: str
    question_text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    explanation: str = ""
    step_by_step: List[str] = field(default_factory=list)
    question_type: str = ""       # mcq | fill_blank | true_false | match | short_answer
    indian_context: bool = False


class Class3ChemSolver:
    """Deterministic solver for Class 3 Chemistry."""

    # ──────────────────────── Node 001 ────────────────────────
    @staticmethod
    def solve_living_nonliving(question_type: str = "mcq", seed: int = 0) -> Question:
        rng = seeded_rng(seed)

        if question_type == "mcq":
            # 50 % Indian context, 50 % standard
            indian_ctx = rng.choice([True, False])

            if indian_ctx:
                pool = [
                    ("cow",       True,  "A cow grows, eats grass, breathes, and gives milk – it is alive."),
                    ("goat",      True,  "A goat grows, eats grass, and breathes – it is alive."),
                    ("mango tree",True,  "A mango tree grows and needs water – it is alive."),
                    ("elephant",  True,  "An elephant grows, eats, breathes, and moves – it is alive."),
                    ("lotus",     True,  "A lotus plant grows in water and needs sunlight – it is alive."),
                    ("rock",      False, "A rock does not grow or need food – it is non-living."),
                    ("stone",     False, "A stone does not grow or breathe – it is non-living."),
                    ("plastic ball", False, "A ball does not grow or need food – it is non-living."),
                    ("book",      False, "A book does not grow or need food – it is non-living."),
                    ("chair",     False, "A chair does not grow or need food – it is non-living."),
                ]
                q_name, correct_bool, explanation = rng.choice(pool)
                label = "living" if correct_bool else "non-living"
                question_text = f"Is a {q_name} living or non-living?"
                options = rng.sample([x[0] for x in pool], k=4)
                if q_name not in options:
                    options[0] = q_name
                options = sorted(options)
                correct_answer = label
                step_by_step = [
                    f"Step 1: Look at the object – {q_name}.",
                    f"Step 2: Ask – does it grow? {'Yes' if correct_bool else 'No'}.",
                    f"Step 3: Ask – does it need food and water? {'Yes' if correct_bool else 'No'}.",
                    f"Step 4: Ask – does it breathe? {'Yes' if correct_bool else 'No'}.",
                    f"Step 5: Conclusion: A {q_name} is {label}.",
                ]
            else:
                pool = [
                    ("rose",      True,  "A rose plant grows, needs water, and breathes – it is alive."),
                    ("fish",      True,  "A fish grows, eats food, and breathes in water – it is alive."),
                    ("bird",      True,  "A bird grows, eats, and flies on its own – it is alive."),
                    ("tree",      True,  "A tree grows tall and needs water – it is alive."),
                    ("cat",       True,  "A cat grows, eats, and moves on its own – it is alive."),
                    ("car",       False, "A car does not grow or eat – it is non-living."),
                    ("ball",      False, "A ball does not grow or breathe – it is non-living."),
                    ("pen",       False, "A pen does not grow or need food – it is non-living."),
                    ("cloud",     False, "A cloud moves with wind but does not move on its own – it is non-living."),
                    ("toy",       False, "A toy does not grow or need food – it is non-living."),
                ]
                q_name, correct_bool, explanation = rng.choice(pool)
                label = "living" if correct_bool else "non-living"
                question_text = f"Is a {q_name} living or non-living?"
                options = rng.sample([x[0] for x in pool], k=4)
                if q_name not in options:
                    options[0] = q_name
                options = sorted(options)
                correct_answer = label
                step_by_step = [
                    f"Step 1: Look at the object – {q_name}.",
                    f"Step 2: Ask – does it grow? {'Yes' if correct_bool else 'No'}.",
                    f"Step 3: Ask – does it need food and water? {'Yes' if correct_bool else 'No'}.",
                    f"Step 4: Ask – does it breathe? {'Yes' if correct_bool else 'No'}.",
                    f"Step 5: Conclusion: A {q_name} is {label}.",
                ]

            return Question(
                node=NodeID.C3_CHEM_001.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=options,
                correct_answer=correct_answer,
                explanation=explanation,
                step_by_step=step_by_step,
                question_type="mcq",
                indian_context=indian_ctx,
            )

        elif question_type == "fill_blank":
            indian_ctx = rng.choice([True, False])
            feature = rng.choice(LIVING_FEATURES)
            examples = EXAMPLES_LIVING if not indian_ctx else [
                ("cow",     ["grow", "need food and water", "breathe", "move on its own"]),
                ("goat",    ["grow", "need food and water", "breathe", "move on its own"]),
                ("mango tree", ["grow", "need water", "breathe"]),
                ("elephant",["grow", "need food and water", "breathe", "move on its own"]),
            ]
            animal, features = rng.choice(examples)
            question_text = (
                f"A {animal} can ________. "
                f"This is one reason it is a living thing."
            )
            blank_feature = rng.choice(features)
            correct_answer = blank_feature
            options = rng.sample(LIVING_FEATURES, k=4)
            if blank_feature not in options:
                options[0] = blank_feature
            options = sorted(options)
            step_by_step = [
                f"Step 1: Think about a {animal}.",
                f"Step 2: Living things have special features.",
                f"Step 3: A {animal} can {blank_feature}.",
                f"Step 4: This proves it is living.",
            ]
            return Question(
                node=NodeID.C3_CHEM_001.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=options,
                correct_answer=correct_answer,
                explanation=f"A {animal} can {blank_feature}. Living things have this feature.",
                step_by_step=step_by_step,
                question_type="fill_blank",
                indian_context=indian_ctx,
            )

        elif question_type == "true_false":
            statements = [
                ("A plant grows, so it is living.", True,  "Plants grow, need water, and breathe."),
                ("A rock grows, so it is living.",    False, "A rock does not grow or need food."),
                ("A ball can move, so it is living.", False, "The ball moves only when someone rolls it. It does not move on its own."),
                ("A dog needs food, so it is living.", True, "Dogs grow, need food, and breathe."),
                ("A table needs food, so it is living.", False, "A table does not need food or grow."),
                ("A cloud moves, so it is living.",   False, "A cloud moves with wind but not on its own."),
            ]
            stmt, correct_bool, explanation = rng.choice(statements)
            return Question(
                node=NodeID.C3_CHEM_001.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=f"Say True or False: {stmt}",
                options=["True", "False"],
                correct_answer="True" if correct_bool else "False",
                explanation=explanation,
                step_by_step=[
                    f"Statement: {stmt}",
                    f"Check: Does the object grow? Need food? Breathe? Move on its own?",
                    f"Answer: {'True' if correct_bool else 'False'} – {explanation}",
                ],
                question_type="true_false",
                indian_context=rng.choice([True, False]),
            )

        elif question_type == "short_answer":
            indian_ctx = rng.choice([True, False])
            if indian_ctx:
                question_text = "Name one living thing and one non-living thing you see in your garden."
                correct_answer = "Living: a plant or tree; Non-living: a stone or rock"
                explanation = "A plant grows and needs water (living). A stone does not grow (non-living)."
            else:
                question_text = "Give any two features of living things."
                feat1, feat2 = rng.sample(LIVING_FEATURES, k=2)
                correct_answer = f"{feat1} and {feat2}"
                explanation = f"Living things can {feat1} and {feat2}. These are key features."
            return Question(
                node=NodeID.C3_CHEM_001.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=[],
                correct_answer=correct_answer,
                explanation=explanation,
                step_by_step=[
                    "Step 1: Remember the features of living things.",
                    "Step 2: Living things grow, need food and water, breathe, move on their own.",
                    "Step 3: Pick examples from your surroundings.",
                ],
                question_type="short_answer",
                indian_context=indian_ctx,
            )

        raise ValueError(f"Unknown question type: {question_type}")

    # ──────────────────────── Node 002 ────────────────────────
    @staticmethod
    def solve_solids(question_type: str = "mcq", seed: int = 0) -> Question:
        rng = seeded_rng(seed)

        if question_type == "mcq":
            indian_ctx = rng.choice([True, False])
            if indian_ctx:
                pool = [
                    ("stone",  True,  "A stone has a fixed shape – it does not change when moved."),
                    ("book",   True,  "A book has a fixed shape and volume."),
                    ("water",  False, "Water does not have a fixed shape – it is a liquid."),
                    ("milk",   False, "Milk does not have a fixed shape – it is a liquid."),
                    ("brick",  True,  "A brick has a fixed shape."),
                    ("oil",    False, "Oil does not have a fixed shape – it is a liquid."),
                    ("pencil", True,  "A pencil has a fixed shape."),
                    ("honey",  False, "Honey flows and takes the shape of its container – it is a liquid."),
                ]
                q_name, is_solid, explanation = rng.choice(pool)
                label = "solid" if is_solid else "liquid"
                question_text = f"Is {q_name} a solid?"
                options = sorted(rng.sample([x[0] for x in pool], k=4))
                if q_name not in options:
                    options[0] = q_name
                correct_answer = "Yes" if is_solid else "No"
                step_by_step = [
                    f"Step 1: Look at {q_name}.",
                    f"Step 2: Ask – does it have a fixed shape? {'Yes' if is_solid else 'No'}.",
                    f"Step 3: Ask – does it keep its shape when moved? {'Yes' if is_solid else 'No'}.",
                    f"Step 4: Conclusion: {q_name} is a {label}.",
                ]
            else:
                pool = [
                    ("football", True,  "A football has a fixed round shape."),
                    ("pencil",   True,  "A pencil has a fixed shape."),
                    ("water",    False, "Water does not have a fixed shape – it is a liquid."),
                    ("ink",      False, "Ink does not have a fixed shape – it is a liquid."),
                    ("coin",     True,  "A coin has a fixed flat shape."),
                    ("juice",    False, "Juice does not have a fixed shape – it is a liquid."),
                    ("eraser",   True,  "An eraser has a fixed shape."),
                    ("honey",    False, "Honey is a liquid – it flows."),
                ]
                q_name, is_solid, explanation = rng.choice(pool)
                label = "solid" if is_solid else "liquid"
                question_text = f"Is {q_name} a solid?"
                options = sorted(rng.sample([x[0] for x in pool], k=4))
                if q_name not in options:
                    options[0] = q_name
                correct_answer = "Yes" if is_solid else "No"
                step_by_step = [
                    f"Step 1: Look at {q_name}.",
                    f"Step 2: Solids have a fixed shape.",
                    f"Step 3: {q_name} {'has' if is_solid else 'does not have'} a fixed shape.",
                    f"Step 4: Conclusion: {q_name} {'is' if is_solid else 'is not'} a solid.",
                ]

            return Question(
                node=NodeID.C3_CHEM_002.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=options,
                correct_answer=correct_answer,
                explanation=explanation,
                step_by_step=step_by_step,
                question_type="mcq",
                indian_context=indian_ctx,
            )

        elif question_type == "fill_blank":
            prop = rng.choice(SOLID_PROPERTIES)
            question_text = (
                "A solid has a ________ shape and a ________ volume."
            )
            correct_answer = "fixed / fixed"
            options = sorted(rng.sample(
                ["fixed", "changing", "no", "large", "small", "variable"], k=4
            ))
            if "fixed" not in options:
                options[0] = "fixed"
            return Question(
                node=NodeID.C3_CHEM_002.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=options,
                correct_answer=correct_answer,
                explanation="A solid has a fixed shape and a fixed volume. It does not change when moved.",
                step_by_step=[
                    "Step 1: Recall the definition of a solid.",
                    "Step 2: A solid has its own shape.",
                    "Step 3: A solid takes up a fixed amount of space.",
                    "Step 4: Fill in the blanks: fixed shape and fixed volume.",
                ],
                question_type="fill_blank",
                indian_context=rng.choice([True, False]),
            )

        elif question_type == "true_false":
            stmts = [
                ("A stone keeps its shape when moved.", True,  "A stone is a solid – it has a fixed shape."),
                ("A book changes its shape in a bag.",  False, "A book keeps the same shape – it is a solid."),
                ("A solid spreads to fill a box.",      False, "Only liquids spread to fill a container. Solids keep their shape."),
                ("A pencil has a fixed shape.",         True,  "A pencil is a solid and has its own shape."),
                ("Solids can change their volume.",     False, "Solids have a fixed volume."),
            ]
            stmt, correct_bool, explanation = rng.choice(stmts)
            return Question(
                node=NodeID.C3_CHEM_002.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=f"Say True or False: {stmt}",
                options=["True", "False"],
                correct_answer="True" if correct_bool else "False",
                explanation=explanation,
                step_by_step=[
                    f"Statement: {stmt}",
                    f"Recall: Solids have fixed shape and volume.",
                    f"Answer: {'True' if correct_bool else 'False'} – {explanation}",
                ],
                question_type="true_false",
                indian_context=rng.choice([True, False]),
            )

        elif question_type == "short_answer":
            question_text = "Give two examples of solids."
            ex1, ex2 = rng.sample([x[0] for x in SOLID_EXAMPLES], k=2)
            return Question(
                node=NodeID.C3_CHEM_002.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=[],
                correct_answer=f"{ex1}, {ex2}",
                explanation=f"Examples: {ex1} and {ex2} are solids because they have fixed shapes.",
                step_by_step=[
                    "Step 1: Think of things around you that keep their shape.",
                    f"Step 2: {ex1} keeps its shape – it is a solid.",
                    f"Step 3: {ex2} keeps its shape – it is a solid.",
                ],
                question_type="short_answer",
                indian_context=rng.choice([True, False]),
            )

        raise ValueError(f"Unknown question type: {question_type}")

    # ──────────────────────── Node 003 ────────────────────────
    @staticmethod
    def solve_liquids(question_type: str = "mcq", seed: int = 0) -> Question:
        rng = seeded_rng(seed)

        if question_type == "mcq":
            indian_ctx = rng.choice([True, False])
            if indian_ctx:
                pool = [
                    ("water",   True,  "Water takes the shape of any container – it is a liquid."),
                    ("milk",    True,  "Milk takes the shape of its container – it is a liquid."),
                    ("stone",   False, "A stone has a fixed shape – it is a solid."),
                    ("book",    False, "A book has a fixed shape – it is a solid."),
                    ("oil",     True,  "Oil flows and takes the shape of its container – it is a liquid."),
                    ("pencil",  False, "A pencil has a fixed shape – it is a solid."),
                    ("juice",   True,  "Juice flows and takes the shape of its glass – it is a liquid."),
                    ("brick",   False, "A brick has a fixed shape – it is a solid."),
                    ("honey",   True,  "Honey is thick but still flows – it is a liquid."),
                    ("chair",   False, "A chair has a fixed shape – it is a solid."),
                ]
                q_name, is_liquid, explanation = rng.choice(pool)
                label = "liquid" if is_liquid else "solid"
                question_text = f"Is {q_name} a liquid?"
                options = sorted(rng.sample([x[0] for x in pool], k=4))
                if q_name not in options:
                    options[0] = q_name
                correct_answer = "Yes" if is_liquid else "No"
                step_by_step = [
                    f"Step 1: Look at {q_name}.",
                    f"Step 2: Ask – does it take the shape of its container? {'Yes' if is_liquid else 'No'}.",
                    f"Step 3: Ask – does it flow? {'Yes' if is_liquid else 'No'}.",
                    f"Step 4: Conclusion: {q_name} is a {label}.",
                ]
            else:
                pool = [
                    ("ink",     True,  "Ink takes the shape of the pen or container – it is a liquid."),
                    ("water",   True,  "Water takes the shape of its container – it is a liquid."),
                    ("rock",    False, "A rock has a fixed shape – it is a solid."),
                    ("ball",    False, "A ball has a fixed shape – it is a solid."),
                    ("syrup",   True,  "Syrup flows slowly – it is a liquid."),
                    ("eraser",  False, "An eraser has a fixed shape – it is a solid."),
                    ("juice",   True,  "Juice flows and takes the shape of its glass – it is a liquid."),
                    ("table",   False, "A table has a fixed shape – it is a solid."),
                ]
                q_name, is_liquid, explanation = rng.choice(pool)
                label = "liquid" if is_liquid else "solid"
                question_text = f"Is {q_name} a liquid?"
                options = sorted(rng.sample([x[0] for x in pool], k=4))
                if q_name not in options:
                    options[0] = q_name
                correct_answer = "Yes" if is_liquid else "No"
                step_by_step = [
                    f"Step 1: Look at {q_name}.",
                    f"Step 2: Liquids take the shape of their container.",
                    f"Step 3: {q_name} {'takes' if is_liquid else 'does not take'} the shape of its container.",
                    f"Step 4: Conclusion: {q_name} is a {label}.",
                ]

            return Question(
                node=NodeID.C3_CHEM_003.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=options,
                correct_answer=correct_answer,
                explanation=explanation,
                step_by_step=step_by_step,
                question_type="mcq",
                indian_context=indian_ctx,
            )

        elif question_type == "fill_blank":
            prop = rng.choice(LIQUID_PROPERTIES)
            question_text = "When you pour water into a glass, it ________ the shape of the glass."
            correct_answer = "takes"
            options = sorted(rng.sample(
                ["takes", "keeps", "loses", "makes"], k=4
            ))
            return Question(
                node=NodeID.C3_CHEM_003.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=options,
                correct_answer=correct_answer,
                explanation="A liquid takes the shape of its container. Water takes the shape of the glass.",
                step_by_step=[
                    "Step 1: Think about pouring water into different glasses.",
                    "Step 2: Does the water keep its own shape? No.",
                    "Step 3: Does it become the shape of the glass? Yes.",
                    "Step 4: So, a liquid takes the shape of its container.",
                ],
                question_type="fill_blank",
                indian_context=rng.choice([True, False]),
            )

        elif question_type == "true_false":
            stmts = [
                ("Water takes the shape of the container it is in.", True,  "Water is a liquid and takes the shape of its container."),
                ("A liquid has a fixed shape.",                     False, "A liquid does NOT have a fixed shape."),
                ("Milk takes the shape of the glass.",              True,  "Milk is a liquid – it takes the glass's shape."),
                ("Oil does not flow.",                              False, "Oil is a liquid and it does flow."),
                ("A liquid can be poured.",                         True,  "Liquids can be poured from one container to another."),
                ("The amount of liquid changes when poured.",       False, "The amount (volume) stays the same."),
            ]
            stmt, correct_bool, explanation = rng.choice(stmts)
            return Question(
                node=NodeID.C3_CHEM_003.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=f"Say True or False: {stmt}",
                options=["True", "False"],
                correct_answer="True" if correct_bool else "False",
                explanation=explanation,
                step_by_step=[
                    f"Statement: {stmt}",
                    "Recall: Liquids take the shape of their container and can flow.",
                    f"Answer: {'True' if correct_bool else 'False'} – {explanation}",
                ],
                question_type="true_false",
                indian_context=rng.choice([True, False]),
            )

        elif question_type == "short_answer":
            question_text = "Give two examples of liquids."
            ex1, ex2 = rng.sample([x[0] for x in LIQUID_EXAMPLES], k=2)
            return Question(
                node=NodeID.C3_CHEM_003.value,
                difficulty=Difficulty.EASY.value,
                competency=Competency.SCHOOL.value,
                question_text=question_text,
                options=[],
                correct_answer=f"{ex1}, {ex2}",
                explanation=f"{ex1} and {ex2} are liquids because they flow and take the shape of their container.",
                step_by_step=[
                    "Step 1: Think of things that flow and take the shape of their container.",
                    f"Step 2: {ex1} does this – it is a liquid.",
                    f"Step 3: {ex2} does this – it is a liquid.",
                ],
                question_type="short_answer",
                indian_context=rng.choice([True, False]),
            )

        raise ValueError(f"Unknown question type: {question_type}")

    # ──────────────────────── Master solve ─────────────────────
    def solve(self, node: str, question_type: str = "mcq", seed: int = 0) -> Question:
        node_map = {
            NodeID.C3_CHEM_001.value: self.solve_living_nonliving,
            NodeID.C3_CHEM_002.value: self.solve_solids,
            NodeID.C3_CHEM_003.value: self.solve_liquids,
        }
        if node not in node_map:
            raise ValueError(f"Unknown node: {node}. Valid: {list(node_map.keys())}")
        return node_map[node](question_type=question_type, seed=seed)

    # ──────────────────────── Verify ──────────────────────────
    @staticmethod
    def verify(question: Question, user_answer: str) -> Dict[str, Any]:
        """Return a verification dict with correctness and feedback."""
        correct = str(user_answer).strip().lower()
        expected = str(question.correct_answer).strip().lower()

        is_correct = (correct == expected) or (expected in correct)

        result: Dict[str, Any] = {
            "correct": is_correct,
            "user_answer": user_answer,
            "expected_answer": question.correct_answer,
            "node": question.node,
            "explanation": question.explanation,
            "step_by_step": question.step_by_step,
        }

        if is_correct:
            result["feedback"] = "✅ Correct! Well done."
        else:
            result["feedback"] = (
                f"❌ Not quite. The correct answer is '{question.correct_answer}'. "
                f"{question.explanation}"
            )

        return result

    # ──────────────────────── Batch solve ─────────────────────
    def solve_batch(
        self,
        node: str,
        count: int = 5,
        question_types: Optional[List[str]] = None,
        seed: int = 0,
    ) -> List[Question]:
        rng = seeded_rng(seed)
        all_types = ["mcq", "fill_blank", "true_false", "short_answer"]
        types = question_types or all_types

        questions: List[Question] = []
        for i in range(count):
            q_type = types[i % len(types)]
            q = self.solve(node=node, question_type=q_type, seed=rng.randint(0, 9999))
            questions.append(q)
        return questions


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
_solver = Class3ChemSolver()


def get_solver() -> Class3ChemSolver:
    return _solver


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    s = Class3ChemSolver()
    nodes = [NodeID.C3_CHEM_001.value, NodeID.C3_CHEM_002.value, NodeID.C3_CHEM_003.value]
    for node in nodes:
        print(f"\n{'='*60}")
        print(f"Node: {node}")
        for qtype in ["mcq", "fill_blank", "true_false", "short_answer"]:
            q = s.solve(node, question_type=qtype, seed=7)
            print(f"\n  [{qtype.upper()}] {q.question_text}")
            if q.options:
                print(f"  Options: {q.options}")
            print(f"  Answer: {q.correct_answer}")
            v = s.verify(q, q.correct_answer)
            print(f"  Verified: {v['correct']}")