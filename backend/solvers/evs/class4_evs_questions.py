import numpy as np
import random
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
import math

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"

class CompetencyLevel(Enum):
    FOUNDATIONAL = "foundational"
    BOARD = "board"

@dataclass
class Question:
    id: str
    node_id: str
    section: str
    question_text: str
    options: List[str]
    correct_answer: str
    explanation: str
    difficulty: str
    competency_level: str
    cognitive_level: str
    vocabulary_tags: List[str]
    mastery_criteria: str
    spiral_topic: str
    exam_relevance: str
    seed_used: int

@dataclass
class VerificationResult:
    question_id: str
    has_question: bool
    has_options: bool
    correct_in_options: bool
    has_explanation: bool
    has_node_id: bool
    all_checks_passed: bool

class DeterministicSeeder:
    def __init__(self, global_seed: int = 42):
        self.global_seed = global_seed

    def get_seed(self, node_id: str, question_index: int, competency: str) -> int:
        base = f"{self.global_seed}:{node_id}:{question_index}:{competency}"
        hash_val = hashlib.sha256(base.encode()).hexdigest()
        seed = int(hash_val[:8], 16)
        return seed

class CISCE_Class4_EVS_QuestionGenerator:
    def __init__(self, global_seed: int = 42):
        self.seeder = DeterministicSeeder(global_seed)
        self.rng = random.Random(global_seed)
        np.random.seed(global_seed)
        self._register_nodes()

    def _register_nodes(self):
        self.nodes = {
            "c4_evs_001": {
                "section": "1 (The Environment)",
                "syllabus": "Living things share key characteristics: they grow, need food and water, breathe, reproduce, respond to stimuli, and eventually die. Non-living things do not grow, reproduce, or respond to stimuli on their own. Some things like seeds and eggs appear non-living but are actually living in a dormant stage waiting for right conditions. Both living and non-living things are part of the environment and interact with each other daily.",
                "cognitive_level": "Understand",
                "difficulty": "Easy",
                "mastery_criteria": "1) List at least five characteristics that distinguish living things from non-living things, 2) Classify given objects as living or non-living with correct reasons, 3) Identify exceptions such as dormant seeds and eggs that look non-living but are living",
                "vocabulary": ["living", "non-living", "growth", "reproduction", "stimuli", "breathe", "dormant", "environment", "characteristics"],
                "spiral_topic": "living-things",
                "exam_relevance": "Board_Only",
                "exam_weightage": "Medium",
                "competency_level": "Board",
                "prereq": "c3_evs_001",
                "is_root": False,
                "examples": [
                    "A potted plant grows towards sunlight showing response to stimuli",
                    "A stone does not grow, breathe, or reproduce",
                    "A hen's egg looks non-living but contains a living chick that develops under warmth"
                ]
            },
            "c4_evs_002": {
                "section": "1 (The Environment)",
                "syllabus": "A flowering plant has five main parts, each with a specific function. Roots anchor the plant firmly in soil and absorb water and minerals. The stem supports the plant and transports water and food between roots and leaves. Leaves make food through photosynthesis using sunlight, water, and carbon dioxide. Flowers produce seeds after pollination. Seeds contain a baby plant and grow into new plants when conditions are right.",
                "cognitive_level": "Understand",
                "difficulty": "Easy",
                "mastery_criteria": "1) Label the five main parts of a plant on a diagram (roots, stem, leaf, flower, seed), 2) State the function of each plant part correctly, 3) Explain how the parts work together to keep the plant alive and help it reproduce",
                "vocabulary": ["roots", "stem", "leaf", "flower", "seed", "photosynthesis", "pollination", "anchor", "absorb", "transport"],
                "spiral_topic": "plants",
                "exam_relevance": "Board_Only",
                "exam_weightage": "Medium",
                "competency_level": "Board",
                "prereq": "c3_evs_002",
                "is_root": False,
                "examples": [
                    "A carrot root stores extra food underground",
                    "A cactus stem stores water in dry deserts",
                    "A lotus leaf floats on water and makes food using sunlight"
                ]
            },
            "c4_evs_003": {
                "section": "1 (The Environment)",
                "syllabus": "Main internal organs of the human body - heart, lungs, brain, stomach, liver, kidneys, and intestines. Recognition and naming of each organ by its picture or diagram. Brief location of each organ inside the body (chest, head, abdomen). Simple one-line function of each organ: heart pumps blood, lungs help us breathe, brain controls the body and thinking, stomach digests food. Difference between internal organs (inside the body) and external body parts (skin, eyes, ears). Introduction to the idea that organs work together to keep the body healthy.",
                "cognitive_level": "Remember",
                "difficulty": "Easy",
                "mastery_criteria": "Can name at least four main internal organs (heart, lungs, brain, stomach). Can point to the approximate location of each organ on a body diagram. Can state one simple function of each named organ.",
                "vocabulary": ["internal organs", "heart", "lungs", "brain", "stomach", "liver", "kidneys", "intestines", "chest", "abdomen", "function"],
                "spiral_topic": "human-body",
                "exam_relevance": "Board_Only",
                "exam_weightage": "Medium",
                "competency_level": "Board",
                "prereq": "c3_evs_002",
                "is_root": False,
                "examples": [
                    "The heart is like a pump that sends blood to every part of the body",
                    "The lungs are like two balloons that fill with air when we breathe in and empty when we breathe out",
                    "The brain is like the body's control centre sending messages to move your hand or feel heat"
                ]
            }
        }

    def _generate_classify_living_nonliving(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        examples_living = [
            ("A mango tree", "It grows, needs water, and produces new mangoes"),
            ("A honeybee", "It moves, breathes, and lays eggs"),
            ("A puppy", "It grows, eats food, and runs around"),
            ("A mushroom growing on a tree", "It grows and spreads spores like seeds"),
            ("A baby girl", "She grows, learns, and will one day have her own children"),
            ("A cow grazing in the field", "It breathes, eats grass, and gives milk"),
            ("A rose bush in the garden", "It grows new stems and blooms flowers every season"),
        ]
        examples_nonliving = [
            ("A wooden chair", "It does not grow, breathe, or reproduce on its own"),
            ("A plastic water bottle", "It cannot grow, eat, or respond to anything by itself"),
            ("A smooth river stone", "It stays the same size forever and does not eat or breathe"),
            ("A cloud in the sky", "It changes shape but does not eat, breathe, or have babies"),
            ("An earthen lamp (diya)", "It does not grow or respond to anything on its own"),
            ("A solar-powered calculator", "It works with sunlight but does not eat, grow, or reproduce"),
        ]
        items_pool = examples_living + examples_nonliving
        rng.shuffle(items_pool)
        selected = items_pool[:4]
        correct_type = None
        correct_item = None
        correct_reason = None
        distractors = []
        for item, reason in selected:
            is_living = (item, reason) in examples_living
            if correct_type is None:
                correct_type = "Living" if is_living else "Non-living"
                correct_item = item
                correct_reason = reason
            else:
                distractors.append((item, reason))

        options_pool = [
            correct_reason,
            "It does not grow, breathe, or reproduce on its own",
            "It only grows larger when someone carves it",
            "It responds to sunlight but does not need food"
        ]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"Look at the object: {correct_item}. Is it a living or non-living thing? Choose the BEST reason."
            q_vocab = ["living", "non-living"]
        else:
            question_text = f"Consider the object: {correct_item}. Based on what you know about living and non-living things, which statement correctly explains why it is {correct_type.lower()}?"
            q_vocab = node["vocabulary"][:5]

        return Question(
            id=f"{node_id}_q1_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_reason,
            explanation=f"{correct_item} is {correct_type.lower()}. {correct_reason}. Living things have specific characteristics like growth, breathing, and reproduction that non-living things do not have.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_dormant_exception(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        dormant_items = [
            ("A dry bean seed", "It looks hard and inactive but will sprout into a bean plant when watered and kept warm."),
            ("A hen's egg kept in an incubator", "The egg looks plain and still, but a chick is developing inside with warmth."),
            ("A mango seed", "It appears lifeless inside the mango fruit, but it can grow into a huge mango tree."),
            ("A potato in the vegetable basket", "It looks like a simple vegetable, but it has 'eyes' that can sprout new potato plants."),
            ("A silkworm's cocoon", "It looks like a small bundle of thread, but inside a moth is waiting to come out."),
        ]
        selected = rng.choice(dormant_items)
        item_name, correct_reason = selected

        options_pool = [
            correct_reason,
            "It is completely non-living and will never change",
            "It is a living thing that grows and moves like a worm",
            "It looks alive but is just a dried-up object"
        ]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"Observe: {item_name}. Many students think this is non-living. What is TRUE about it?"
            q_vocab = ["living", "non-living", "dormant"]
        else:
            question_text = f"{item_name} appears to be non-living because it does not show movement or growth at first glance. Which statement best explains its true nature?"
            q_vocab = node["vocabulary"][:6]

        return Question(
            id=f"{node_id}_q2_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_reason,
            explanation=f"Correct! {correct_reason} This is called a 'dormant' stage — the living thing is simply waiting for the right conditions (warmth, water, air) to become active again. Seeds and eggs are common examples of dormant living things.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_response_to_stimuli(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        stimuli_examples = [
            ("A sunflower turning its face towards the sun", "Sunlight", "This shows the plant is responding to a stimulus (light)."),
            ("A mimosa plant folding its leaves when touched", "Touch", "This is a quick response to a stimulus (touch)."),
            ("A plant growing its roots downward into the soil", "Gravity", "Roots respond to gravity by growing down to find water."),
            ("A cockroach running away when you turn on the light", "Light", "The cockroach responds to the stimulus of sudden light."),
            ("Your pupil getting smaller in bright sunlight", "Bright light", "Your eye responds to bright light to protect the inside."),
        ]
        selected = rng.choice(stimuli_examples)
        example_text, stimulus_cause, correct_explanation = selected

        distractor_explanations = [
            "This shows the plant is growing taller every day",
            "This is how the plant makes its food",
            "This means the plant is sleeping"
        ]
        rng.shuffle(distractor_explanations)
        options_pool = [correct_explanation] + distractor_explanations[:3]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"Observe: {example_text}. What is the plant or animal responding to?"
            q_vocab = ["stimuli", "living", "response"]
        else:
            question_text = f"Consider the following observation from nature: {example_text}. Which explanation BEST describes what is happening?"
            q_vocab = node["vocabulary"][:5]

        return Question(
            id=f"{node_id}_q3_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_explanation,
            explanation=f"Correct! {correct_explanation} Responding to stimuli is an important characteristic of all living things. Stimuli can be light, touch, sound, heat, gravity, or smell.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_plant_part_function(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        parts_functions = {
            "roots": ("anchor the plant firmly in soil and absorb water and minerals",
                      "A tree's roots spread wide underground to hold the tree steady during storms and to drink water."),
            "stem": ("support the plant and transport water and food between roots and leaves",
                     "A sunflower stem grows tall and thick to hold the heavy flower head up towards the sun."),
            "leaf": ("make food for the plant through photosynthesis using sunlight, water, and carbon dioxide",
                     "A peepal tree's broad leaves catch sunlight to make food for the whole tree."),
            "flower": ("produce seeds after pollination, helping the plant reproduce",
                       "A marigold flower attracts bees who carry pollen to other flowers, helping make seeds."),
            "seed": ("contain a baby plant and grow into new plants when conditions are right",
                     "A dried pea seed in the kitchen can sprout into a new pea plant if planted in soil and watered.")
        }
        selected_part = rng.choice(list(parts_functions.keys()))
        correct_function, example = parts_functions[selected_part]

        all_functions = {k: v[0] for k, v in parts_functions.items()}
        distractor_functions = [v for k, v in all_functions.items() if k != selected_part]
        rng.shuffle(distractor_functions)
        options_pool = [correct_function] + distractor_functions[:3]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"What is the main job of the {selected_part} of a plant?"
            q_vocab = ["roots", "stem", "leaf", "flower", "seed"]
        else:
            question_text = f"In a flowering plant, the {selected_part} plays an important role. Which statement BEST describes the function of the {selected_part}?"
            q_vocab = node["vocabulary"][:7]

        return Question(
            id=f"{node_id}_q1_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_function,
            explanation=f"The {selected_part} {correct_function}. {example} Each part of the plant has a special job, and together they keep the plant alive and growing.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_label_plant_part(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        parts_functions = {
            "roots": "anchors the plant and soaks up water from the soil",
            "stem": "holds the plant up and carries water to the leaves",
            "leaves": "catch sunlight to make food for the plant",
            "flower": "makes seeds so new plants can grow",
            "seed": "has a tiny baby plant inside that grows into a new plant"
        }
        selected_part = rng.choice(list(parts_functions.keys()))
        correct_function = parts_functions[selected_part]
        other_parts = {k: v for k, v in parts_functions.items() if k != selected_part}
        distractor_functions = list(other_parts.values())
        rng.shuffle(distractor_functions)
        options_pool = [correct_function] + distractor_functions[:3]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"Look at a plant diagram. The part labeled 'X' is shown in the middle of the plant connecting roots to leaves. What is this part?"
            q_vocab = ["stem", "roots", "leaf"]
        else:
            question_text = f"In a labelled diagram of a flowering plant, a teacher points to a part and says: 'This part is responsible for carrying water from the roots up to the leaves, and also carries food made by the leaves to other parts.' Which part is the teacher describing?"
            q_vocab = node["vocabulary"][:6]

        return Question(
            id=f"{node_id}_q2_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_function,
            explanation=f"The part being described is the {selected_part}. It {correct_function}. Understanding each part's role helps us appreciate how plants survive and grow.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_photosynthesis_question(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]

        options_pool = [
            "Leaves make food for the plant using sunlight, water, and carbon dioxide (photosynthesis)",
            "Roots make food by absorbing nutrients from the soil",
            "Flowers make food using the colour of their petals and sunlight",
            "Seeds make their own food while stored inside the fruit"
        ]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = "Which part of the plant is responsible for making food for the whole plant?"
            q_vocab = ["leaf", "photosynthesis", "food"]
        else:
            question_text = "Green plants can make their own food, but animals cannot. Which process allows a plant's leaves to create food, and which ingredients are needed?"
            q_vocab = node["vocabulary"][:6]

        return Question(
            id=f"{node_id}_q3_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=options_pool[0],
            explanation="Leaves contain a green pigment called chlorophyll which captures sunlight. Using sunlight, water (from roots), and carbon dioxide (from air), leaves make food (sugar) for the plant. This process is called photosynthesis.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_organ_identification(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        organ_data = {
            "heart": ("pumps blood to every part of the body", "in the chest, slightly to the left"),
            "lungs": ("help us breathe in oxygen and breathe out carbon dioxide", "in the chest, one on each side of the heart"),
            "brain": ("controls the entire body and is responsible for thinking and memory", "inside the head, protected by the skull"),
            "stomach": ("digests the food we eat by mixing it with digestive juices", "in the abdomen, below the chest"),
            "liver": ("cleans the blood and helps digest fatty foods", "in the upper right part of the abdomen"),
            "kidneys": ("filter waste from the blood and make urine", "in the back of the abdomen, one on each side"),
            "intestines": ("absorb nutrients from digested food and remove waste", "long coiled tubes in the abdomen")
        }
        selected_organ = rng.choice(list(organ_data.keys()))
        correct_function, location = organ_data[selected_organ]

        distractor_organs = {k: v[0] for k, v in organ_data.items() if k != selected_organ}
        distractor_functions = list(distractor_organs.values())
        rng.shuffle(distractor_functions)
        options_pool = [correct_function] + distractor_functions[:3]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"Which internal organ is described by this clue: '{correct_function}'?"
            q_vocab = [selected_organ, "internal organs", "function"]
        else:
            question_text = f"A student learns about the human body. The teacher says: 'This organ is located {location}, and its main job is: {correct_function}' Which organ is the teacher describing?"
            q_vocab = node["vocabulary"][:7]

        return Question(
            id=f"{node_id}_q1_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_function,
            explanation=f"The organ being described is the {selected_organ}. It is located {location}. Its main function is to {correct_function}. All internal organs work together to keep us healthy.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_organ_location(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        organ_locations = {
            "heart": "in the chest, slightly towards the left side",
            "lungs": "in the chest, one on each side of the heart",
            "brain": "inside the head, protected by the skull",
            "stomach": "in the abdomen, just below the chest",
            "liver": "in the upper right part of the abdomen",
            "kidneys": "in the back of the abdomen, one on each side",
            "intestines": "in the abdomen, below the stomach"
        }
        selected_organ = rng.choice(list(organ_locations.keys()))
        correct_location = organ_locations[selected_organ]

        all_locations = list(organ_locations.values())
        distractor_locations = [v for k, v in organ_locations.items() if k != selected_organ]
        rng.shuffle(distractor_locations)
        options_pool = [correct_location] + distractor_locations[:3]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"Where is the {selected_organ} located in the human body?"
            q_vocab = [selected_organ, "chest", "abdomen"]
        else:
            question_text = f"A doctor examines a patient and wants to listen to the {selected_organ} with a stethoscope. Where will the doctor place the stethoscope?"
            q_vocab = node["vocabulary"][:6]

        return Question(
            id=f"{node_id}_q2_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_location,
            explanation=f"The {selected_organ} is located {correct_location}. Knowing where our internal organs are helps doctors examine us and keep us healthy.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_internal_vs_external(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]
        body_parts = {
            "internal": ["heart", "lungs", "brain", "stomach", "liver", "kidneys", "intestines"],
            "external": ["skin", "eyes", "ears", "nose", "hands", "feet", "hair"]
        }
        selected_internal = rng.choice(body_parts["internal"])
        selected_external = rng.choice(body_parts["external"])
        correct_answer = f"{selected_internal} is an internal organ, while {selected_external} is an external body part"

        distractor_answers = [
            f"Both {selected_internal} and {selected_external} are internal organs",
            f"Both {selected_internal} and {selected_external} are external body parts",
            f"{selected_internal} is an external body part, while {selected_external} is an internal organ"
        ]
        rng.shuffle(distractor_answers)
        options_pool = [correct_answer] + distractor_answers[:3]
        rng.shuffle(options_pool)

        question_text = ""
        if competency == "foundational":
            question_text = f"Which is true: the {selected_internal} or the {selected_external}?"
            q_vocab = ["internal organs", "external body parts"]
        else:
            question_text = f"Consider two body parts: the {selected_internal} and the {selected_external}. Which statement correctly describes the difference between them?"
            q_vocab = node["vocabulary"][:5]

        return Question(
            id=f"{node_id}_q3_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=options_pool,
            correct_answer=correct_answer,
            explanation=f"Correct! The {selected_internal} is an internal organ — it is inside the body and cannot be seen from outside. The {selected_external} is an external body part — it is on the outside of the body. Internal organs work together to keep us alive and healthy.",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def _generate_organs_working_together(self, node_id: str, seed: int, competency: str) -> Question:
        rng = random.Random(seed)
        node = self.nodes[node_id]

        body_processes = {
            "eating a mango": {
                "organs": ["teeth", "stomach", "intestines"],
                "explanation": "Teeth chew the mango (external part), the stomach mixes it with juices, and the intestines absorb nutrients into the blood."
            },
            "running in a race": {
                "organs": ["brain", "heart", "lungs"],
                "explanation": "The brain tells the muscles to move, the heart pumps more blood, and the lungs breathe faster to supply oxygen."
            },
            "picking up a book": {
                "organs": ["eyes", "brain", "hands"],
                "explanation": "Eyes see the book, the brain decides to pick it up, and sends a message to the hand muscles."
            },
            "drinking a glass of water": {
                "organs": ["mouth", "kidneys", "intestines"],
                "explanation": "Mouth drinks the water, intestines absorb it, and kidneys filter the blood to keep it clean."
            }
        }
        selected_process = rng.choice(list(body_processes.keys()))
        organs = body_processes[selected_process]["organs"]
        explanation_text = body_processes[selected_process]["explanation"]

        question_text = ""
        if competency == "foundational":
            question_text = f"When you do the activity '{selected_process}', which body parts work together?"
            q_vocab = organs + ["work together"]
        else:
            question_text = f"Different organs in our body work together like members of a team. When you {selected_process}, explain which organs cooperate and how."
            q_vocab = node["vocabulary"][:6]

        return Question(
            id=f"{node_id}_q4_{competency}",
            node_id=node_id,
            section=node["section"],
            question_text=question_text,
            options=[],
            correct_answer=explanation_text,
            explanation=f"When you {selected_process}: {explanation_text} This shows that our body organs do not work alone — they are a team!",
            difficulty=node["difficulty"],
            competency_level=competency,
            cognitive_level=node["cognitive_level"],
            vocabulary_tags=q_vocab,
            mastery_criteria=node["mastery_criteria"],
            spiral_topic=node["spiral_topic"],
            exam_relevance=node["exam_relevance"],
            seed_used=seed
        )

    def generate_question(self, node_id: str, question_index: int = 0,
                          competency: str = "board", seed: Optional[int] = None) -> Question:
        if node_id not in self.nodes:
            raise ValueError(f"Unknown node_id: {node_id}. Available: {list(self.nodes.keys())}")
        if competency not in ("foundational", "board"):
            raise ValueError(f"competency must be 'foundational' or 'board', got: {competency}")

        if seed is None:
            seed = self.seeder.get_seed(node_id, question_index, competency)

        generator_map = {
            "c4_evs_001": [
                self._generate_classify_living_nonliving,
                self._generate_dormant_exception,
                self._generate_response_to_stimuli,
            ],
            "c4_evs_002": [
                self._generate_plant_part_function,
                self._generate_label_plant_part,
                self._generate_photosynthesis_question,
            ],
            "c4_evs_003": [
                self._generate_organ_identification,
                self._generate_organ_location,
                self._generate_internal_vs_external,
                self._generate_organs_working_together,
            ]
        }

        generators = generator_map.get(node_id, [])
        if not generators:
            raise ValueError(f"No question generators registered for node: {node_id}")

        idx = question_index % len(generators)
        return generators[idx](node_id, seed, competency)

    def generate_batch(self, node_ids: Optional[List[str]] = None,
                       competencies: Optional[List[str]] = None,
                       questions_per_node: int = 6) -> List[Question]:
        if node_ids is None:
            node_ids = list(self.nodes.keys())
        if competencies is None:
            competencies = ["foundational", "board"]

        all_questions = []
        for node_id in node_ids:
            if node_id not in self.nodes:
                continue
            for comp in competencies:
                for q_idx in range(questions_per_node):
                    q = self.generate_question(node_id, q_idx, comp)
                    all_questions.append(q)
        return all_questions

    def verify_question(self, q: Question) -> VerificationResult:
        checks = {
            "has_question": bool(q.question_text and q.question_text.strip()),
            "has_options": isinstance(q.options, list),
            "correct_in_options": q.correct_answer in q.options if q.options else (not q.options),
            "has_explanation": bool(q.explanation and q.explanation.strip()),
            "has_node_id": bool(q.node_id and q.node_id.startswith("c4_evs_")),
        }
        return VerificationResult(
            question_id=q.id,
            has_question=checks["has_question"],
            has_options=checks["has_options"],
            correct_in_options=checks["correct_in_options"],
            has_explanation=checks["has_explanation"],
            has_node_id=checks["has_node_id"],
            all_checks_passed=all(checks.values())
        )

    def verify_batch(self, questions: List[Question]) -> Dict[str, any]:
        results = [self.verify_question(q) for q in questions]
        passed = sum(1 for r in results if r.all_checks_passed)
        failed = [r for r in results if not r.all_checks_passed]
        return {
            "total_questions": len(questions),
            "passed": passed,
            "failed": failed,
            "pass_rate": passed / len(questions) if questions else 0.0,
            "all_passed": len(failed) == 0
        }

    def generate_with_verification(self, node_ids: Optional[List[str]] = None,
                                   competencies: Optional[List[str]] = None,
                                   questions_per_node: int = 6) -> Tuple[List[Question], Dict]:
        questions = self.generate_batch(node_ids, competencies, questions_per_node)
        verification = self.verify_batch(questions)
        return questions, verification

    def print_question(self, q: Question, step_number: int = 1):
        print(f"{'=' * 60}")
        print(f"  Step {step_number}: Display Question")
        print(f"{'=' * 60}")
        print(f"  Question ID  : {q.id}")
        print(f"  Node ID      : {q.node_id}")
        print(f"  Section      : {q.section}")
        print(f"  Competency   : {q.competency_level}")
        print(f"  Difficulty   : {q.difficulty}")
        print(f"  Cognitive    : {q.cognitive_level}")
        print(f"  Spiral Topic : {q.spiral_topic}")
        print(f"  Exam         : {q.exam_relevance}")
        print(f"  Seed Used    : {q.seed_used}")
        print(f"{'─' * 60}")
        print(f"  QUESTION:")
        print(f"  {q.question_text}")
        print(f"{'─' * 60}")
        if q.options:
            print(f"  OPTIONS:")
            for i, opt in enumerate(q.options, 1):
                marker = " ✓" if opt == q.correct_answer else ""
                print(f"    {i}. {opt}{marker}")
            print(f"{'─' * 60}")
        print(f"  CORRECT ANSWER: {q.correct_answer}")
        print(f"{'─' * 60}")
        print(f"  EXPLANATION:")
        print(f"  {q.explanation}")
        print(f"{'─' * 60}")
        print(f"  VOCABULARY: {', '.join(q.vocabulary_tags)}")
        print(f"  MASTERY: {q.mastery_criteria[:80]}...")
        print(f"{'=' * 60}\n")

    def generate_and_display(self, node_id: str, competency: str = "board",
                             question_index: int = 0, seed: Optional[int] = None):
        step1_seed = self.seeder.get_seed(node_id, question_index, competency) if seed is None else seed
        print(f"\n{'#' * 60}")
        print(f"  Generating Question (Step-by-Step Process)")
        print(f"{'#' * 60}")
        print(f"  Step 1: Input Parameters")
        print(f"    Node ID     : {node_id}")
        print(f"    Competency  : {competency}")
        print(f"    Q Index     : {question_index}")
        print(f"    Seed        : {step1_seed}")
        print(f"  Step 2: Validate node_id exists")
        if node_id in self.nodes:
            print(f"    ✓ Node '{node_id}' found — Section: {self.nodes[node_id]['section']}")
        else:
            print(f"    ✗ Node '{node_id}' NOT FOUND")
            return
        print(f"  Step 3: Select question template")
        templates = {
            "c4_evs_001": ["Classify living/non-living", "Dormant exception", "Response to stimuli"],
            "c4_evs_002": ["Plant part function", "Label plant part", "Photosynthesis"],
            "c4_evs_003": ["Organ identification", "Organ location", "Internal vs external", "Organs working together"]
        }
        tlist = templates.get(node_id, ["Unknown"])
        t_idx = question_index % len(tlist)
        print(f"    Template: {tlist[t_idx]}")
        print(f"  Step 4: Seed RNG and generate question")
        print(f"    Seeding random with: {step1_seed}")
        print(f"  Step 5: Build question object")
        print(f"  Step 6: Verify question quality")
        q = self.generate_question(node_id, question_index, competency, step1_seed)
        vr = self.verify_question(q)
        print(f"    Verification: {'✓ ALL PASSED' if vr.all_checks_passed else '✗ SOME FAILED'}")
        print(f"  Step 7: Display result\n")
        self.print_question(q, step_number=7)

    def get_node_summary(self, node_id: str) -> Dict:
        if node_id not in self.nodes:
            return {}
        node = self.nodes[node_id]
        return {
            "node_id": node_id,
            "section": node["section"],
            "cognitive_level": node["cognitive_level"],
            "difficulty": node["difficulty"],
            "competency_level": node["competency_level"],
            "spiral_topic": node["spiral_topic"],
            "exam_relevance": node["exam_relevance"],
            "exam_weightage": node["exam_weightage"],
            "prereq": node["prereq"],
            "is_root": node["is_root"],
            "vocabulary_count": len(node["vocabulary"]),
            "vocabulary": node["vocabulary"],
            "mastery_criteria_count": len(node["mastery_criteria"].split(")")),
            "examples": node["examples"]
        }

    def list_all_nodes(self) -> List[Dict]:
        return [self.get_node_summary(nid) for nid in self.nodes.keys()]

    def generate_full_syllabus(self, questions_per_competency: int = 3) -> Tuple[List[Question], Dict]:
        all_questions = []
        for node_id in self.nodes:
            for comp in ["foundational", "board"]:
                for q_idx in range(questions_per_competency):
                    q = self.generate_question(node_id, q_idx, comp)
                    all_questions.append(q)
        verification = self.verify_batch(all_questions)
        return all_questions, verification


def step_by_step_generation_demo():
    global_seed = 42
    rng = random.Random(global_seed)
    np.random.seed(global_seed)
    print(f"{'#' * 60}")
    print(f"  CISCE Class 4 EVS — Deterministic Question Generator")
    print(f"  Global Seed: {global_seed}")
    print(f"{'#' * 60}\n")

    print("Step 1: Initialize generator with seed 42")
    print("  → DeterministicSeeder stores global_seed=42")
    print("  → SHA-256 hash derived seeds ensure reproducibility")
    print("  → Same inputs always produce same questions\n")

    print("Step 2: Register all nodes from CISCE Class 4 EVS syllabus")
    gen = CISCE_Class4_EVS_QuestionGenerator(global_seed)
    nodes = gen.list_all_nodes()
    print(f"  → Registered {len(nodes)} nodes:")
    for n in nodes:
        print(f"     • {n['node_id']}: [{n['cognitive_level']}] {n['spiral_topic']} — {n['difficulty']}")
    print()

    print("Step 3: Verify generator integrity")
    sample_q = gen.generate_question("c4_evs_001", 0, "board")
    vr = gen.verify_question(sample_q)
    print(f"  → Sample question generated: {sample_q.id}")
    print(f"  → Verification result: {'PASS' if vr.all_checks_passed else 'FAIL'}")
    print(f"     - Has question text: {vr.has_question}")
    print(f"     - Has options: {vr.has_options}")
    print(f"     - Correct answer in options: {vr.correct_in_options}")
    print(f"     - Has explanation: {vr.has_explanation}")
    print(f"     - Has valid node_id: {vr.has_node_id}")
    print()

    return gen


def main():
    rng = random.Random(42)
    np.random.seed(42)
    gen = CISCE_Class4_EVS_QuestionGenerator(global_seed=42)

    print(f"\n{'#' * 60}")
    print(f"  CISCE Class 4 EVS — Full Question Generation")
    print(f"  Deterministic Question Generator")
    print(f"{'#' * 60}\n")

    all_questions, verification = gen.generate_full_syllabus(questions_per_competency=3)

    print(f"\n{'─' * 60}")
    print(f"  GENERATION SUMMARY")
    print(f"{'─' * 60}")
    print(f"  Total questions generated : {verification['total_questions']}")
    print(f"  Verification passed       : {verification['passed']}")
    print(f"  Verification failed       : {len(verification['failed'])}")
    print(f"  Pass rate                 : {verification['pass_rate']*100:.1f}%")
    print(f"  All checks passed         : {verification['all_passed']}")

    print(f"\n{'─' * 60}")
    print(f"  QUESTIONS BY NODE AND COMPETENCY")
    print(f"{'─' * 60}")
    node_comp_counts: Dict[str, Dict[str, int]] = {}
    for q in all_questions:
        key = f"{q.node_id}|{q.competency_level}"
        if key not in node_comp_counts:
            node_comp_counts[key] = {"total": 0, "foundational": 0, "board": 0}
        node_comp_counts[key]["total"] += 1
        node_comp_counts[key][q.competency_level] += 1

    for key, counts in sorted(node_comp_counts.items()):
        node_id, comp = key.split("|")
        print(f"  {node_id} [{comp.upper()}]: {counts[comp]} questions")

    print(f"\n{'─' * 60}")
    print(f"  SAMPLE QUESTIONS (one per node-competency pair)")
    print(f"{'─' * 60}")
    shown_keys = set()
    display_count = 0
    for q in all_questions:
        key = f"{q.node_id}|{q.competency_level}"
        if key not in shown_keys:
            shown_keys.add(key)
            display_count += 1
            gen.print_question(q, step_number=display_count)

    return gen, all_questions, verification


if __name__ == "__main__":
    main()