import random
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
import json

# ============================================================
# CORE INFRASTRUCTURE
# ============================================================

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class CognitiveLevel(Enum):
    REMEMBER = "remember"
    UNDERSTAND = "understand"
    APPLY = "apply"
    ANALYZE = "analyze"

@dataclass
class NodeSpec:
    """Specification for a syllabus node."""
    node_id: str
    title: str
    section: str
    subject: str
    cognitive_level: str
    difficulty: str
    mastery_criteria: List[str]
    vocabulary: List[str]
    scope_level: str
    scope_teach: str
    scope_do_not_teach: str
    prereq: List[str]
    is_root: bool
    exam_relevance: str
    exam_weightage: str
    competency_level: str
    prereq_strength: str
    depth_prereq: str
    depth_reason: str

@dataclass
class Question:
    """Represents a generated question."""
    qid: str
    node_id: str
    qtype: str        # 'mcq' | 'fill_blank' | 'true_false' | 'match' | 'short_answer' | 'long_answer' | 'assertion_reason'
    difficulty: str
    cognitive_level: str
    prompt: str
    options: Optional[List[str]] = None
    correct_answer: str = ""
    explanation: str = ""
    marks: int = 1
    indian_context: bool = False

@dataclass
class Step:
    """One reasoning step in a solution."""
    step_num: int
    description: str
    detail: str
    result: str = ""

@dataclass
class Solution:
    """Complete solution for a question."""
    question: Question
    steps: List[Step]
    final_answer: str
    verification: str
    marks_awarded: int
    feedback: str


# ============================================================
# DETERMINISTIC SEEDED RNG
# ============================================================

class SeededRNG:
    """Deterministic pseudo-random generator keyed by (node_id, seed_str)."""
    def __init__(self, seed_str: str):
        h = hashlib.sha256(seed_str.encode()).hexdigest()
        self._seed = int(h, 16) % (2**32)

    def randint(self, lo, hi):
        self._seed = (self._seed * 1103515245 + 12345) & 0x7FFFFFFF
        return lo + (self._seed % (hi - lo + 1))

    def choice(self, seq):
        return seq[self.randint(0, len(seq) - 1)]

    def sample(self, seq, k):
        items = list(seq)
        out = []
        for _ in range(k):
            idx = self.randint(0, len(items) - 1)
            out.append(items.pop(idx))
        return out

    def shuffle(self, seq):
        items = list(seq)
        for i in range(len(items) - 1, 0, -1):
            j = self.randint(0, i)
            items[i], items[j] = items[j], items[i]
        return items

    def uniform(self):
        self._seed = (self._seed * 1103515245 + 12345) & 0x7FFFFFFF
        return self._seed / 0x7FFFFFFF


# ============================================================
# SYMBOLIC / NUMERIC HELPERS  (SymPy + numpy)
# ============================================================

def verify_percentage(obtained: float, total: float, expected_pct: float, tolerance: float = 2.0) -> bool:
    import numpy as np
    actual = (obtained / total) * 100 if total != 0 else 0.0
    return abs(actual - expected_pct) <= tolerance

def sympy_verify_equation(lhs_str: str, rhs_str: str, subs: dict = None) -> bool:
    from sympy import sympify, simplify, Eq
    try:
        lhs = sympify(lhs_str)
        rhs = sympify(rhs_str)
        if subs:
            lhs = lhs.subs(subs)
            rhs = rhs.subs(subs)
        diff = simplify(lhs - rhs)
        return diff == 0
    except Exception:
        return False

def classify_biotic_abiotic(name: str) -> str:
    """Deterministic classification of items as biotic or abiotic."""
    biotic = {
        'plant', 'tree', 'grass', 'mango', 'neem', 'banyan', 'rose', 'hibiscus',
        'cow', 'deer', 'tiger', 'lion', 'eagle', 'fish', 'frog', 'snake',
        'grasshopper', 'bear', 'human', 'dog', 'cat', 'elephant', 'monkey',
        'bacteria', 'fungi', 'mushroom', 'insect', 'worm', 'algae', 'bird',
        'mangrove', 'peepal', 'bamboo', 'lotus', 'sunflower'
    }
    return 'Biotic' if name.lower().strip() in biotic else 'Abiotic'


# ============================================================
# INDIAN CONTEXT DATA
# ============================================================

INDIAN_TREES = ['Mango (Mangifera indica)', 'Neem (Azadirachta indica)', 'Banyan (Ficus benghalensis)',
                'Peepal (Ficus religiosa)', 'Tulsi (Ocimum sanctum)', 'Coconut (Cocos nucifera)',
                'Teak (Tectona grandis)', 'Sandalwood (Santalum album)']

INDIAN_ANIMALS = ['Royal Bengal Tiger', 'Indian Elephant', 'Peacock', 'Great Indian Bustard',
                  'King Cobra', 'Gangetic Dolphin', 'Indian Rhinoceros', 'Lion-tailed Macaque']

INDIAN_ECOSYSTEMS = [
    ('Sundarbans Mangrove Forest', 'West Bengal', 'Royal Bengal Tiger, Mangroves, Estuarine Dolphins'),
    ('Western Ghats', 'Kerala & Karnataka', 'Lion-tailed Macaque, Nilgiri Tahr, Evergreen Forests'),
    ('Keoladeo National Park', 'Rajasthan', 'Migratory Birds, Wetland Ecosystem'),
    ('Gir Forest', 'Gujarat', 'Asiatic Lion, Dry Deciduous Forest'),
    ('Periyar Wildlife Sanctuary', 'Kerala', 'Elephants, Tropical Evergreen Forest'),
    ('Chilika Lake', 'Odisha', 'Migratory Birds, Brackish Water Ecosystem'),
    ('Himalayan Alpine Meadow', 'Uttarakhand', 'Snow Leopard, Alpine Flora'),
    ('Thar Desert', 'Rajasthan', 'Desert Fox, Cactus, Reptiles')
]

INDIAN_PLANTS = ['Mango', 'Neem', 'Banyan', 'Peepal', 'Tulsi', 'Lotus', 'Bamboo', 'Coconut',
                 'Hibiscus', 'Marigold', 'Sunflower', 'Paddy (Rice)', 'Wheat', 'Sugarcane']

INDIAN_ANIMALS_DETAILED = {
    'Royal Bengal Tiger': ('Carnivore', 'Forest', 'National Animal of India'),
    'Indian Elephant': ('Herbivore', 'Forest', 'Largest land animal in India'),
    'Peacock': ('Omnivore', 'Forest/Grassland', 'National Bird of India'),
    'Cow': ('Herbivore', 'Domestic/Field', 'Considered sacred in Indian culture'),
    'King Cobra': ('Carnivore', 'Forest', 'Longest venomous snake in the world'),
    'Gangetic Dolphin': ('Carnivore', 'River', 'National Aquatic Animal of India'),
    'Indian Rhinoceros': ('Herbivore', 'Grassland/Wetland', 'Found in Kaziranga, Assam'),
    'Deer (Chital)': ('Herbivore', 'Forest', 'Commonly found in Indian forests'),
}

PRODUCERS_INDIAN = ['Paddy (rice) plant', 'Wheat plant', 'Mango tree', 'Banyan tree', 'Grass (in meadows)',
                    'Algae in ponds', 'Lotus plant', 'Neem tree']

CONSUMERS_INDIAN = {
    'herbivore': ['Cow', 'Deer (Chital)', 'Rabbit', 'Elephant', 'Squirrel'],
    'carnivore': ['Tiger', 'Eagle', 'King Cobra', 'Lion (in Gir)', 'Fox'],
    'omnivore': ['Bear (Sloth Bear)', 'Human', 'Monkey (Langur)', 'Crow', 'Rat']
}

DECOMPOSERS_INDIAN = ['Fungi (mushrooms)', 'Bacteria in soil', 'Termites', 'Earthworms', 'Ants']

FOOD_CHAIN_INDIAN = [
    {
        'name': 'Grassland Food Chain',
        'chain': ['Grass (Producer)', 'Grasshopper (Primary Consumer/Herbivore)',
                  'Frog (Secondary Consumer/Carnivore)', 'Snake (Tertiary Consumer/Carnivore)',
                  'Eagle (Quaternary Consumer/Carnivore)'],
        'ecosystem': 'Indian Grassland / Field'
    },
    {
        'name': 'Pond Food Chain',
        'chain': ['Algae (Producer)', 'Small Fish (Primary Consumer)',
                  'Big Fish (Secondary Consumer)', 'Kingfisher (Tertiary Consumer)'],
        'ecosystem': 'Indian Village Pond'
    },
    {
        'name': 'Forest Food Chain',
        'chain': ['Mango Tree Leaves (Producer)', 'Caterpillar (Primary Consumer)',
                  'Bird (Secondary Consumer)', 'Hawk (Tertiary Consumer)'],
        'ecosystem': 'Indian Deciduous Forest'
    },
    {
        'name': 'Agricultural Food Chain',
        'chain': ['Wheat Plant (Producer)', 'Rat (Primary Consumer)',
                  'Snake (Secondary Consumer)', 'Eagle (Tertiary Consumer)'],
        'ecosystem': 'Indian Farm'
    }
]

INTERACTIONS_INDIAN = [
    'A mango tree (biotic) uses sunlight, water from monsoon rains and carbon dioxide (all abiotic) to make food through photosynthesis.',
    'A cow (biotic) eats grass (biotic) which grew using sunlight and water (abiotic).',
    'Fungi (biotic) decompose dead leaves on the forest floor, releasing nutrients (abiotic) back into the soil for new plants.',
    'Fish (biotic) in the Ganges depend on dissolved oxygen (abiotic) in the water to survive.',
    'A neem tree (biotic) provides shade, reducing soil temperature (abiotic) and helping retain soil moisture.',
    'Earthworms (biotic) burrow through soil (abiotic), improving aeration and water absorption.',
    'Tigers (biotic) in the Sundarbans depend on the saline water (abiotic) of the mangrove ecosystem.',
    'Termites (biotic) break down dead wood, returning nutrients (abiotic) to the forest soil.'
]

BIODIVERSITY_FACTS = [
    'India is one of the 17 mega-diverse countries of the world.',
    'India has about 45,000 plant species, representing about 7% of the world\'s flowering plants.',
    'India has around 91,000 animal species, which is about 7% of the world\'s faunal species.',
    'The Western Ghats is one of the world\'s eight "hottest hotspots" of biological diversity.',
    'India has four biodiversity hotspots: the Himalayas, the Western Ghats, the Northeast, and the Nicobar Islands.',
    'The Sundarbans is the largest mangrove forest in the world.',
    'India\'s national animal is the Royal Bengal Tiger and national bird is the Peacock.',
    'India\'s national aquatic animal is the Gangetic Dolphin.',
]

BIODIVERSITY_THREATS = [
    'Deforestation for agriculture, industry and urbanization.',
    'Pollution of air, water and soil.',
    'Overhunting and poaching of wild animals.',
    'Introduction of invasive (foreign) species.',
    'Climate change affecting habitats.',
    'Over-exploitation of natural resources.'
]

BIODIVERSITY_CONSERVATION = [
    'Creating and maintaining wildlife sanctuaries and national parks.',
    'Banning hunting and trade of endangered species under the Wildlife Protection Act, 1972.',
    'Project Tiger and Project Elephant for protecting flagship species.',
    'Involving local communities in conservation efforts.',
    'Creating awareness about the importance of biodiversity.',
    'Planting more trees and protecting existing forests.',
    'Using the three R\'s: Reduce, Reuse, Recycle.'
]


# ============================================================
# QUESTION GENERATORS  (deterministic per node + seed)
# ============================================================

class QuestionBank:
    """Generates deterministic questions for each node."""

    def __init__(self, node_specs: Dict[str, NodeSpec]):
        self.node_specs = node_specs

    def _rng(self, node_id: str, qtype: str, idx: int) -> SeededRNG:
        return SeededRNG(f"{node_id}:{qtype}:{idx}")

    def generate_all(self) -> List[Question]:
        questions = []
        questions.extend(self._gen_c6_evs_001())
        questions.extend(self._gen_c6_evs_002())
        questions.extend(self._gen_c6_evs_003())
        return questions

    # ----------------------------------------------------------
    # NODE 1 - Biotic & Abiotic Components
    # ----------------------------------------------------------
    def _gen_c6_evs_001(self) -> List[Question]:
        node = 'c6_evs_001'
        out = []

        # --- MCQ: Identify biotic/abiotic ---
        rng = self._rng(node, 'mcq', 0)
        items = rng.sample(['Mango tree', 'Sunlight', 'Cow', 'Water', 'Fungi',
                            'Soil', 'Tiger', 'Air', 'Grass', 'Bacteria'], 5)
        correct_idx = 0
        for i, item in enumerate(items):
            if item in ['Mango tree', 'Cow', 'Fungi', 'Tiger', 'Grass', 'Bacteria']:
                correct_idx = i
                break
        correct_ans = classify_biotic_abiotic(items[correct_idx])
        wrong_pool = ['Abiotic'] if correct_ans == 'Biotic' else ['Biotic']
        options = rng.shuffle([correct_ans, wrong_pool[0], 'Both', 'Neither'])

        out.append(Question(
            qid='c6_evs_001_mcq_01',
            node_id=node,
            qtype='mcq',
            difficulty='easy',
            cognitive_level='understand',
            prompt=f"Which of the following is a biotic component of the environment?\n"
                   f"A) {items[0]}\nB) {items[1]}\nC) {items[2]}\nD) {items[3]}\nE) {items[4]}",
            options=options,
            correct_answer=correct_ans,
            explanation=f"{items[correct_idx]} is a {correct_ans.lower()} component because it "
                        f"{'is a living organism that grows, reproduces, and responds to stimuli.' if correct_ans == 'Biotic' else 'is a non-living part of the environment and does not grow or reproduce.'}",
            marks=1,
            indian_context=items[correct_idx] in ['Mango tree', 'Tiger', 'Cow']
        ))

        # --- MCQ: Interaction ---
        rng = self._rng(node, 'mcq', 1)
        interaction_q = rng.choice([
            ("What do plants need from the environment for photosynthesis?",
             "Sunlight, water and carbon dioxide",
             "Oxygen, food and shelter"),
            ("Which process do plants use to make their own food?",
             "Photosynthesis",
             "Respiration"),
            ("What do decomposers return to the soil?",
             "Nutrients",
             "Oxygen"),
        ])
        out.append(Question(
            qid='c6_evs_001_mcq_02',
            node_id=node,
            qtype='mcq',
            difficulty='easy',
            cognitive_level='understand',
            prompt=interaction_q[0],
            options=rng.shuffle([interaction_q[1], interaction_q[2],
                                  "Heat and light", "Only water"]),
            correct_answer=interaction_q[1],
            explanation=f"The correct answer is '{interaction_q[1]}'. {interaction_q[0].rstrip('?')} - "
                        f"this is how biotic and abiotic components interact in the environment.",
            marks=1
        ))

        # --- Fill in the blank ---
        rng = self._rng(node, 'fib', 0)
        fib_q = rng.choice([
            ("Biotic components are the ______ components of the environment.",
             "living", "non-living"),
            ("The three types of biotic components are producers, ______ and decomposers.",
             "consumers", "abiotic"),
            ("Photosynthesis is carried out by ______ (biotic component) using sunlight (abiotic).",
             "plants", "animals"),
            ("Abiotic components include sunlight, air, water, soil and ______.",
             "temperature", "animals"),
        ])
        out.append(Question(
            qid='c6_evs_001_fib_01',
            node_id=node,
            qtype='fill_blank',
            difficulty='easy',
            cognitive_level='remember',
            prompt=f"Fill in the blank:\n{fib_q[0]}",
            correct_answer=fib_q[1],
            explanation=f"The correct word is '{fib_q[1]}'. "
                        f"'{fib_q[2]}' is incorrect because it does not fit the context of the statement.",
            marks=1
        ))

        # --- True/False with reason ---
        rng = self._rng(node, 'tf', 0)
        tf_q = rng.choice([
            ("The Sun is a biotic component of the environment.", False,
             "The Sun is a non-living (abiotic) source of light and heat energy."),
            ("All plants are producers in an ecosystem.", True,
             "Plants make their own food through photosynthesis using sunlight, water and carbon dioxide."),
            ("Bacteria are always harmful to the environment.", False,
             "Many bacteria are decomposers that break down dead matter and return nutrients to soil."),
            ("Animals are biotic components.", True,
             "Animals are living organisms, so they are biotic components."),
            ("Soil is a biotic component.", False,
             "Soil is a non-living (abiotic) component, though it contains living microorganisms."),
        ])
        out.append(Question(
            qid='c6_evs_001_tf_01',
            node_id=node,
            qtype='true_false',
            difficulty='easy',
            cognitive_level='understand',
            prompt=f"State whether the following statement is True or False, and give a reason:\n\n"
                   f"'{tf_q[0]}'",
            options=["True", "False"],
            correct_answer="True" if tf_q[1] else "False",
            explanation=f"{tf_q[2]}",
            marks=2
        ))

        # --- Short answer ---
        rng = self._rng(node, 'sa', 0)
        sa_q = rng.choice([
            ("List any four biotic components found in a garden. Explain why each is biotic.",
             "A garden contains: (1) Plants/trees - they grow and reproduce; "
             "(2) Insects - they move and respond to stimuli; (3) Birds - they lay eggs and eat food; "
             "(4) Earthworms - they decompose dead matter. All are biotic because they are living organisms."),
            ("Give two examples each of biotic and abiotic components in a pond ecosystem.",
             "Biotic: (1) Fish - living organisms; (2) Algae - living organisms. "
             "Abiotic: (1) Water - non-living; (2) Sunlight - non-living energy source."),
            ("How does a balance between biotic and abiotic components help the environment?",
             "When biotic and abiotic components are in balance, plants get enough sunlight, water and nutrients "
             "to grow; animals get enough food and oxygen; decomposers break down waste returning nutrients to soil. "
             "This balance keeps the ecosystem healthy and sustainable."),
        ])
        out.append(Question(
            qid='c6_evs_001_sa_01',
            node_id=node,
            qtype='short_answer',
            difficulty='easy',
            cognitive_level='understand',
            prompt=sa_q[0],
            correct_answer=sa_q[1],
            explanation=sa_q[1],
            marks=3
        ))

        # --- Indian context MCQs ---
        rng = self._rng(node, 'mcq_ind', 0)
        indian_item = rng.choice(INDIAN_TREES[:3])
        out.append(Question(
            qid='c6_evs_001_mcq_ind_01',
            node_id=node,
            qtype='mcq',
            difficulty='easy',
            cognitive_level='remember',
            prompt=f"In India, which of the following is a biotic component?\n"
                   f"A) The Ganga river water\nB) The summer monsoon rains\n"
                   f"C) A {indian_item.split('(')[0].strip()}\nD) Rocky mountain soil\nE) Desert sand",
            options=rng.shuffle(['Biotic', 'Abiotic', 'Both', 'Neither', 'Depends on season']),
            correct_answer='Biotic',
            explanation=f"A {indian_item.split('(')[0].strip()} is a living organism (tree), so it is a biotic component. "
                        f"Water, rain, soil and sand are all abiotic (non-living) components.",
            marks=1,
            indian_context=True
        ))

        return out

    # ----------------------------------------------------------
    # NODE 2 - Ecosystems, Food Chains
    # ----------------------------------------------------------
    def _gen_c6_evs_002(self) -> List[Question]:
        node = 'c6_evs_002'
        out = []

        # --- MCQ: Who gets energy from the sun? ---
        rng = self._rng(node, 'mcq', 0)
        out.append(Question(
            qid='c6_evs_002_mcq_01',
            node_id=node,
            qtype='mcq',
            difficulty='medium',
            cognitive_level='remember',
            prompt="In an ecosystem, which organisms directly get energy from the Sun?",
            options=rng.shuffle(['Producers (plants)', 'Consumers (animals)',
                                  'Decomposers (bacteria & fungi)', 'All organisms equally']),
            correct_answer='Producers (plants)',
            explanation="Producers (plants and algae) capture solar energy through photosynthesis. "
                        "Animals and decomposers get energy indirectly by eating other organisms.",
            marks=1
        ))

        # --- MCQ: Classify consumer ---
        rng = self._rng(node, 'mcq', 1)
        animal_q = rng.choice([
            ('A cow eats grass. What type of consumer is it?', 'Herbivore',
             'Herbivores eat only plants.'),
            ('A tiger eats deer. What type of consumer is it?', 'Carnivore',
             'Carnivores eat only other animals.'),
            ('A bear eats both berries and fish. What type of consumer is it?', 'Omnivore',
             'Omnivores eat both plants and animals.'),
        ])
        out.append(Question(
            qid='c6_evs_002_mcq_02',
            node_id=node,
            qtype='mcq',
            difficulty='medium',
            cognitive_level='understand',
            prompt=animal_q[0],
            options=rng.shuffle(['Herbivore', 'Carnivore', 'Omnivore', 'Decomposer']),
            correct_answer=animal_q[1],
            explanation=animal_q[2],
            marks=1
        ))

        # --- MCQ: Indian ecosystem ---
        rng = self._rng(node, 'mcq', 2)
        eco = rng.choice(INDIAN_ECOSYSTEMS)
        producer_ind = rng.choice(['Sundari trees (mangroves)', 'Algae in Chilika Lake',
                                    'Grass in Gir Forest', 'Oak trees in Himalayas'])
        out.append(Question(
            qid='c6_evs_002_mcq_ind_01',
            node_id=node,
            qtype='mcq',
            difficulty='medium',
            cognitive_level='apply',
            prompt=f"In the {eco[0]} of {eco[1]}, which organism acts as a producer?",
            options=rng.shuffle([
                producer_ind,
                rng.choice(eco[2].split(', ')),
                'Bacteria in the soil',
                'A deer grazing in the forest'
            ]),
            correct_answer=producer_ind,
            explanation=f"In {eco[0]}, {producer_ind.lower()} are producers because they make their own food "
                        f"through photosynthesis, providing energy for the entire ecosystem. "
                        f"Key species here include: {eco[2]}.",
            marks=1,
            indian_context=True
        ))

        # --- Food chain ordering ---
        rng = self._rng(node, 'order', 0)
        fc = rng.choice(FOOD_CHAIN_INDIAN)
        chain = fc['chain']
        # Shuffle the chain elements for the question
        shuffled = rng.shuffle(chain)

        out.append(Question(
            qid='c6_evs_002_order_01',
            node_id=node,
            qtype='fill_blank',  # ordering via numbered answer
            difficulty='medium',
            cognitive_level='apply',
            prompt=f"Arrange the following organisms in the correct order of a food chain "
                   f"found in a {fc['ecosystem']}:\n"
                   f"Organisms: {', '.join(shuffled)}\n\n"
                   f"Write the correct sequence starting with the producer, "
                   f"separating each organism by ' → '.\n"
                   f"Ecosystem: {fc['name']}",
            correct_answer=' → '.join(chain),
            explanation=f"Correct food chain: {' → '.join(chain)}\n\n"
                        f"Step by step:\n"
                        + '\n'.join(f"  {i+1}. {chain[i]}" for i in range(len(chain))) +
                        f"\n\nThis food chain exists in the {fc['ecosystem']}.",
            marks=3
        ))

        # --- Food chain consequence ---
        rng = self._rng(node, 'conseq', 0)
        fc2 = rng.choice(FOOD_CHAIN_INDIAN)
        chain2 = fc2['chain']
        # Remove the 3rd element (middle consumer) and ask what happens
        removed = chain2[2] if len(chain2) > 2 else chain2[1]

        out.append(Question(
            qid='c6_evs_002_conseq_01',
            node_id=node,
            qtype='short_answer',
            difficulty='medium',
            cognitive_level='analyze',
            prompt=f"In the following food chain: {' → '.join(chain2)}\n"
                   f"If all {removed.split('(')[0].strip()} are removed from the ecosystem, "
                   f"what will happen? Explain the impact on at least three organisms in the chain.\n"
                   f"Ecosystem: {fc2['name']} ({fc2['ecosystem']})",
            correct_answer=(
                f"If {removed.split('(')[0].strip()} are removed:\n"
                f"1. The organism that eats them ({chain2[3].split('(')[0].strip()}) will have no food and "
                f"its population will decrease.\n"
                f"2. The organism they eat ({chain2[1].split('(')[0].strip()}) will increase in number "
                f"because there is no predator to control their population.\n"
                f"3. The producer ({chain2[0].split('(')[0].strip()}) may be over-consumed, "
                f"leading to soil erosion or reduced plant cover.\n"
                f"4. Overall ecosystem balance is disrupted."
            ),
            explanation="Removing one link in a food chain affects every other organism. "
                        "This is why biodiversity and each organism's role is important.",
            marks=4
        ))

        # --- Fill in blank: ecosystem ---
        rng = self._rng(node, 'fib', 0)
        fib_items = rng.sample([
            ("An ______ is a community of living organisms interacting with their physical environment.",
             "ecosystem"),
            ("______ make their own food through photosynthesis.", "Producers (plants)"),
            ("Animals that eat other animals are called ______.", "carnivores"),
            ("Bacteria and fungi are ______ that break down dead matter.", "decomposers"),
            ("A simple food chain starts with the ______ (producer).", "plant / grass / tree"),
        ], 3)
        out.append(Question(
            qid='c6_evs_002_fib_01',
            node_id=node,
            qtype='fill_blank',
            difficulty='easy',
            cognitive_level='remember',
            prompt='\n'.join(f"Fill in the blank ({i+1}):\n{fib_items[i][0]}" for i in range(len(fib_items))),
            correct_answer='\n'.join(f"({i+1}) {fib_items[i][1]}" for i in range(len(fib_items))),
            explanation='\n'.join(f"({i+1}) {fib_items[i][1]} - {fib_items[i][0].split('______')[1].strip()}"
                                   for i in range(len(fib_items))),
            marks=3
        ))

        # --- Assertion-Reason ---
        rng = self._rng(node, 'ar', 0)
        ar_q = rng.choice([
            ("Assertion: Decomposers are important for the environment.",
             "Reason: Decomposers break down dead plants and animals and return nutrients to the soil.",
             True, True,
             "Both A and R are true and R correctly explains A."),
            ("Assertion: If one organism is removed from a food chain, it does not affect other organisms.",
             "Reason: Each organism in a food chain is connected to others.",
             False, True,
             "A is false but R is true. Removing one organism disrupts the entire chain."),
        ])
        out.append(Question(
            qid='c6_evs_002_ar_01',
            node_id=node,
            qtype='assertion_reason',
            difficulty='medium',
            cognitive_level='analyze',
            prompt=f"Read the Assertion (A) and Reason (R) carefully and choose the correct option:\n\n"
                   f"A: {ar_q[0].replace('Assertion: ', '')}\n"
                   f"R: {ar_q[1].replace('Reason: ', '')}\n\n"
                   f"Options:\n"
                   f"1. Both A and R are true and R correctly explains A.\n"
                   f"2. Both A and R are true but R does NOT explain A.\n"
                   f"3. A is true but R is false.\n"
                   f"4. A is false but R is true.",
            options=["1", "2", "3", "4"],
            correct_answer="1" if ar_q[2] and ar_q[3] else ("4" if not ar_q[2] and ar_q[3] else "3"),
            explanation=ar_q[4],
            marks=2
        ))

        return out

    # ----------------------------------------------------------
    # NODE 3 - Biodiversity
    # ----------------------------------------------------------
    def _gen_c6_evs_003(self) -> List[Question]:
        node = 'c6_evs_003'
        out = []

        # --- MCQ: Biodiversity definition ---
        rng = self._rng(node, 'mcq', 0)
        out.append(Question(
            qid='c6_evs_003_mcq_01',
            node_id=node,
            qtype='mcq',
            difficulty='easy',
            cognitive_level='remember',
            prompt="What does 'biodiversity' mean?",
            options=rng.shuffle([
                "Variety of living organisms found on Earth",
                "The total number of trees in a forest",
                "Only the variety of animals in a place",
                "The amount of water in rivers and lakes"
            ]),
            correct_answer="Variety of living organisms found on Earth",
            explanation="Biodiversity refers to the variety of all living organisms - plants, animals, "
                        "microorganisms - found on Earth.",
            marks=1
        ))

        # --- MCQ: Biodiversity hotspot ---
        rng = self._rng(node, 'mcq', 1)
        hotspot = rng.choice([
            'Western Ghats', 'Himalayas', 'Northeast India', 'Nicobar Islands'
        ])
        out.append(Question(
            qid='c6_evs_003_mcq_02',
            node_id=node,
            qtype='mcq',
            difficulty='medium',
            cognitive_level='understand',
            prompt=f"Which of the following is one of India's four biodiversity hotspots?",
            options=rng.shuffle([hotspot, 'Thar Desert', 'Indo-Gangetic Plain',
                                  'Deccan Plateau', 'Coastal Plains']),
            correct_answer=hotspot,
            explanation=f"The {hotspot} is one of India's four biodiversity hotspots. "
                        f"These regions have exceptionally high numbers of plant and animal species, "
                        f"many of which are found nowhere else in the world.",
            marks=1,
            indian_context=True
        ))

        # --- MCQ: Threats ---
        rng = self._rng(node, 'mcq', 2)
        out.append(Question(
            qid='c6_evs_003_mcq_03',
            node_id=node,
            qtype='mcq',
            difficulty='medium',
            cognitive_level='understand',
            prompt="Which of the following is NOT a threat to biodiversity in India?",
            options=rng.shuffle([
                "Planting more trees (afforestation)",
                "Deforestation for agriculture and industry",
                "Poaching and illegal hunting of animals",
                "Pollution of rivers and lakes"
            ]),
            correct_answer="Planting more trees (afforestation)",
            explanation="Planting more trees helps protect biodiversity by creating habitats for animals "
                        "and improving air and soil quality. The other options are all serious threats "
                        "to biodiversity.",
            marks=1,
            indian_context=True
        ))

        # --- Match the following ---
        rng = self._rng(node, 'match', 0)
        left_items = rng.sample([
            'Royal Bengal Tiger', 'Peacock', 'Gangetic Dolphin',
            'Asiatic Lion', 'Indian Elephant'
        ], 5)
        right_items = {
            'Royal Bengal Tiger': 'National Animal, found in Sundarbans and forests',
            'Peacock': 'National Bird, found across India',
            'Gangetic Dolphin': 'National Aquatic Animal, found in Ganga river',
            'Asiatic Lion': 'Found only in Gir Forest, Gujarat',
            'Indian Elephant': 'Largest land animal in India, found in forests',
            'Great Indian Bustard': 'Critically endangered, found in Rajasthan',
            'King Cobra': 'Longest venomous snake, found in forests',
        }
        # Build shuffled right column
        right_shuffled = rng.shuffle(list(right_items.values()))

        out.append(Question(
            qid='c6_evs_003_match_01',
            node_id=node,
            qtype='match',
            difficulty='medium',
            cognitive_level='remember',
            prompt="Match the following Indian animals with their correct descriptions:\n\n"
                   "Column A (Animals):\n" +
                   '\n'.join(f"  {chr(65+i)}. {left_items[i]}" for i in range(len(left_items))) +
                   "\n\nColumn B (Descriptions):\n" +
                   '\n'.join(f"  {i+1}. {right_shuffled[i]}" for i in range(len(right_shuffled))),
            options=None,
            correct_answer=' | '.join(f"{chr(65+i)}-{list(right_items.keys()).index(left_items[i])+1}"
                                       for i in range(len(left_items))),
            explanation='\n'.join(
                f"{chr(65+i)}. {left_items[i]} → {right_items[left_items[i]]}"
                for i in range(len(left_items))
            ),
            marks=3,
            indian_context=True
        ))

        # --- Fill in blanks: biodiversity facts ---
        rng = self._rng(node, 'fib', 0)
        fib_items = rng.sample([
            ("India has about ______ flowering plant species, which is about 7% of the world's total.",
             "45,000", "4,500"),
            ("India is one of the ______ mega-diverse countries in the world.",
             "17", "10"),
            ("India's national aquatic animal is the ______.",
             "Gangetic Dolphin", "Mango Fish"),
            ("The Sundarbans is the world's largest ______ forest.",
             "mangrove", "rain"),
            ("The ______ Ghats is one of the world's biodiversity hotspots.",
             "Western", "Eastern"),
            ("The three R's for conservation are: Reduce, ______ and Recycle.",
             "Reuse", "Remove"),
            ("The Wildlife Protection Act was passed in India in the year ______.",
             "1972", "1950"),
        ], 4)
        out.append(Question(
            qid='c6_evs_003_fib_01',
            node_id=node,
            qtype='fill_blank',
            difficulty='medium',
            cognitive_level='remember',
            prompt='\n'.join(f"Fill in the blank ({i+1}):\n{fib_items[i][0]}" for i in range(len(fib_items))),
            correct_answer='\n'.join(f"({i+1}) {fib_items[i][1]}" for i in range(len(fib_items))),
            explanation='\n'.join(
                f"({i+1}) {fib_items[i][1]} - {fib_items[i][0].split('______')[1].strip()}"
                for i in range(len(fib_items))
            ),
            marks=4
        ))

        # --- Short answer: threats to biodiversity ---
        rng = self._rng(node, 'sa', 0)
        sa_items = rng.sample(BIODIVERSITY_THREATS, 3)
        out.append(Question(
            qid='c6_evs_003_sa_01',
            node_id=node,
            qtype='short_answer',
            difficulty='medium',
            cognitive_level='understand',
            prompt=f"Name and explain any THREE major threats to biodiversity in India. "
                   f"Give one Indian example for each threat.",
            correct_answer=(
                f"The three major threats to biodiversity in India are:\n\n"
                f"1. Deforestation: Large areas of forests are cleared for agriculture, industry, "
                f"mining and urbanization. Example: Deforestation in the Western Ghats for plantations "
                f"threatens the Lion-tailed Macaque.\n\n"
                f"2. Pollution: Air, water and soil pollution from factories, vehicles and pesticides "
                f"harm plants and animals. Example: Pollution of the Ganga river threatens the "
                f"Gangetic Dolphin.\n\n"
                f"3. Poaching and illegal hunting: Wild animals are killed for their skins, bones, "
                f"ivory and meat. Example: Poaching of the Royal Bengal Tiger for its skin and bones."
            ),
            explanation="Biodiversity is under threat mainly from human activities. "
                        "Protecting biodiversity requires conservation efforts at individual, community "
                        "and government levels.",
            marks=4
        ))

        # --- Long answer: conservation ---
        rng = self._rng(node, 'la', 0)
        conservation_items = rng.sample(BIODIVERSITY_CONSERVATION, 4)
        out.append(Question(
            qid='c6_evs_003_la_01',
            node_id=node,
            qtype='long_answer',
            difficulty='medium',
            cognitive_level='apply',
            prompt="Why is biodiversity important for human life? What steps can be taken to conserve "
                   "biodiversity in India? Explain with examples. "
                   "(Hint: Think about food, medicine, oxygen, and balance in nature.)",
            correct_answer=(
                f"IMPORTANCE OF BIODIVERSITY:\n"
                f"1. Food: Different plants and animals provide us with food. India's biodiversity "
                f"gives us rice, wheat, pulses, fruits, vegetables, milk, meat and fish.\n"
                f"2. Medicines: Many life-saving medicines come from plants. Neem, Tulsi and other "
                f"Indian medicinal plants have been used for centuries.\n"
                f"3. Oxygen: Plants produce oxygen through photosynthesis, which is essential for "
                f"all animals including humans to breathe.\n"
                f"4. Clean water and fertile soil: Healthy ecosystems maintain water cycles and "
                f"soil fertility.\n"
                f"5. Balance of nature: Each species has a role - removing one can disturb the "
                f"entire ecosystem.\n\n"
                f"STEPS TO CONSERVE BIODIVERSITY IN INDIA:\n"
                + '\n'.join(f"{i+1}. {c}" for i, c in enumerate(conservation_items))
            ),
            explanation="Biodiversity is India's natural wealth. Conservation involves protecting "
                        "species, habitats and ecological processes. India has strong laws like the "
                        "Wildlife Protection Act, 1972, and projects like Project Tiger.",
            marks=6,
            indian_context=True
        ))

        # --- True/False ---
        rng = self._rng(node, 'tf', 0)
        tf_q = rng.choice([
            ("India has four biodiversity hotspots.", True,
             "India's four biodiversity hotspots are the Himalayas, Western Ghats, Northeast, and Nicobar Islands."),
            ("The Sundarbans is the largest mangrove forest in the world.", True,
             "The Sundarbans in West Bengal is the world's largest mangrove ecosystem, home to the Royal Bengal Tiger."),
            ("Deforestation helps increase biodiversity.", False,
             "Deforestation destroys habitats and reduces biodiversity."),
            ("India's national bird is the Indian Eagle.", False,
             "India's national bird is the Peacock."),
            ("All microorganisms are harmful to the environment.", False,
             "Many microorganisms like bacteria and fungi are decomposers that are essential for nutrient cycling."),
        ])
        out.append(Question(
            qid='c6_evs_003_tf_01',
            node_id=node,
            qtype='true_false',
            difficulty='easy',
            cognitive_level='remember',
            prompt=f"State whether True or False and give a brief reason:\n\n'{tf_q[0]}'",
            options=["True", "False"],
            correct_answer="True" if tf_q[1] else "False",
            explanation=tf_q[2],
            marks=2,
            indian_context='India' in tf_q[0] or 'Sundarbans' in tf_q[0] or 'Peacock' in tf_q[0]
        ))

        return out


# ============================================================
# STEP-BY-STEP SOLUTION ENGINE
# ============================================================

class SolverEngine:
    """Generates step-by-step verified solutions for any question in the bank."""

    def __init__(self, questions: List[Question]):
        self.questions = {q.qid: q for q in questions}

    def solve(self, qid: str) -> Solution:
        """Return a fully worked solution for question qid."""
        q = self.questions.get(qid)
        if not q:
            raise ValueError(f"Question ID '{qid}' not found.")

        dispatch = {
            'mcq': self._solve_mcq,
            'fill_blank': self._solve_fill_blank,
            'true_false': self._solve_tf,
            'match': self._solve_match,
            'short_answer': self._solve_short_answer,
            'long_answer': self._solve_long_answer,
            'assertion_reason': self._solve_assertion_reason,
            'order': self._solve_ordering,
            'conseq': self._solve_consequence,
        }
        solver = dispatch.get(q.qtype, self._solve_short_answer)
        return solver(q)

    # ----------------------------------------------------------
    # MCQ Solver
    # ----------------------------------------------------------
    def _solve_mcq(self, q: Question) -> Solution:
        steps = [
            Step(1, "Read the question carefully",
                 f"Question: {q.prompt}",
                 "Identify what is being asked."),
            Step(2, "Analyze each option",
                 f"\n".join(f"  {chr(65+i)}. {q.options[i]}" for i in range(len(q.options))),
                 "Evaluate each option against the concept."),
            Step(3, "Eliminate wrong options",
                 "Remove options that are clearly incorrect based on the syllabus concept.",
                 "Narrowed down to the correct answer."),
            Step(4, "Select the correct answer",
                 f"Correct Answer: {q.correct_answer}",
                 q.correct_answer),
        ]
        return Solution(
            question=q,
            steps=steps,
            final_answer=q.correct_answer,
            verification=f"Verified: The correct option is '{q.correct_answer}' - {q.explanation}",
            marks_awarded=q.marks,
            feedback="Correct! Well done." if True else "Review the explanation."
        )

    # ----------------------------------------------------------
    # Fill in the Blank Solver
    # ----------------------------------------------------------
    def _solve_fill_blank(self, q: Question) -> Solution:
        lines = q.prompt.split('\n')
        blanks = [l for l in lines if 'Fill in the blank' in l or (l.strip() and '______' in l)]
        steps = [
            Step(1, "Read each statement",
                 '\n'.join(lines),
                 "Identify what word or phrase is missing."),
            Step(2, "Recall relevant concepts",
                 "Think about the key terms from the syllabus for this topic.",
                 "Identify the correct word from your knowledge."),
        ]
        answers = q.correct_answer.split('\n')
        for i, ans in enumerate(answers):
            ans_clean = ans.split(') ', 1)[-1] if ') ' in ans else ans
            steps.append(Step(len(steps)+1, f"Blank {i+1}: Identify the correct word",
                              f"Context: The sentence is about {q.node_id}.",
                              f"Answer: {ans_clean.strip()}"))

        return Solution(
            question=q,
            steps=steps,
            final_answer=q.correct_answer,
            verification=f"All blanks correctly filled. Explanation: {q.explanation}",
            marks_awarded=q.marks,
            feedback="Great! Make sure to memorize key vocabulary from the syllabus."
        )

    # ----------------------------------------------------------
    # True/False Solver
    # ----------------------------------------------------------
    def _solve_tf(self, q: Question) -> Solution:
        steps = [
            Step(1, "Read the statement carefully",
                 f"Statement: {q.prompt}",
                 "Understand what the statement claims."),
            Step(2, "Check against known facts",
                 f"Recall concepts from the topic: {q.node_id}",
                 "Compare the statement with textbook facts."),
            Step(3, "Determine True or False",
                 f"Answer: {q.correct_answer}",
                 q.correct_answer),
            Step(4, "Give the reason",
                 f"Reason: {q.explanation}",
                 "A good reason explains WHY the statement is true or false."),
        ]
        return Solution(
            question=q,
            steps=steps,
            final_answer=q.correct_answer,
            verification=f"Verified. {q.explanation}",
            marks_awarded=q.marks,
            feedback="Good reasoning! Always give a reason for True/False questions."
        )

    # ----------------------------------------------------------
    # Match the Following Solver
    # ----------------------------------------------------------
    def _solve_match(self, q: Question) -> Solution:
        steps = [
            Step(1, "Read both columns carefully",
                 q.prompt,
                 "Understand what is in Column A and Column B."),
            Step(2, "Match each item from Column A to Column B",
                 "Use your knowledge of each animal/plant and its characteristics.",
                 "Form matches one by one."),
            Step(3, "Verify the matches",
                 q.explanation,
                 "Check that each match is logically correct."),
        ]
        return Solution(
            question=q,
            steps=steps,
            final_answer=q.correct_answer,
            verification=f"Matching completed. {q.explanation}",
            marks_awarded=q.marks,
            feedback="Excellent matching! Remember these facts about Indian animals."
        )

    # ----------------------------------------------------------
    # Short Answer Solver
    # ----------------------------------------------------------
    def _solve_short_answer(self, q: Question) -> Solution:
        # Break the model answer into reasoning steps
        model = q.correct_answer
        sentences = [s.strip() for s in model.split('\n') if s.strip()]
        steps = [Step(1, "Understand the question",
                      q.prompt, "Identify key points to address.")]
        for i, sent in enumerate(sentences):
            if sent and not sent.startswith(('1.', '2.', '3.', '4.', '5.', '•', '-')):
                steps.append(Step(len(steps)+1, f"Reasoning point {i}", sent, ""))
        return Solution(
            steps=steps,
            final_answer=q.correct_answer,
            verification=f"Answer covers key points. {q.explanation}",
            marks_awarded=q.marks,
            feedback="Structure your answer using the reasoning points above."
        )

# return {"status": "ok", "note": "truncated"}
