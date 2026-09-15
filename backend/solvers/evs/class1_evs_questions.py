import hashlib
import random
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"


class QuestionType(Enum):
    FILL_BLANK = "Fill in the blank"
    MATCH_COLUMNS = "Match the columns"
    MULTIPLE_CHOICE = "Multiple Choice"
    TRUE_FALSE = "True/False"
    DESCRIPTIVE = "Very Short Answer"
    IDENTIFY = "Identify and name"


class CompetencyLevel(Enum):
    COMPETENCY = "Competency-Based"
    STANDARD = "Standard"


@dataclass
class Question:
    question_id: str
    node_id: str
    node_title: str
    question_type: str
    competency_level: str
    difficulty: str
    cognitive_level: str
    question_text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    marking_scheme: str = ""
    vocabulary_words: List[str] = field(default_factory=list)


class SeededRNG:
    def __init__(self, seed: int):
        self._seed = seed
        self._rng = random.Random(seed)

    def randint(self, a: int, b: int) -> int:
        return self._rng.randint(a, b)

    def choice(self, seq: List) -> any:
        return self._rng.choice(seq)

    def shuffle(self, seq: List) -> List:
        s = seq[:]
        self._rng.shuffle(s)
        return s

    def sample(self, seq: List, k: int) -> List:
        return self._rng.sample(seq, k)

    def random(self) -> float:
        return self._rng.random()


class CISCEQuestionGenerator:
    def __init__(self, seed: int = 42):
        self.seed = seed
        self.rng = SeededRNG(seed)
        self._hash_counter = 0

        self.nodes = {
            "c1_evs_001": {
                "title": "My family and home",
                "section": "Child's Environment",
                "vocabulary": ["family", "mother", "father", "sibling", "grandparent",
                               "joint family", "nuclear family", "role", "relationship", "relative"],
                "family_members": [
                    ("mother", "She cooks food for the family."),
                    ("father", "He goes to work and earns money."),
                    ("grandmother", "She tells stories and takes care of grandchildren."),
                    ("grandfather", "He plays with children and shares wisdom."),
                    ("sister", "She plays with you and helps in small chores."),
                    ("brother", "He plays games with you and shares toys."),
                    ("uncle", "He visits during festivals and brings gifts."),
                    ("aunt", "She helps mother in cooking and takes care of family."),
                ],
                "roles": [
                    ("cooking", "Mother usually cooks food for the family."),
                    ("earning", "Father goes to office to earn money."),
                    ("caring", "Grandparents care for young children."),
                    ("helping", "All family members help each other."),
                    ("cleaning", "Everyone keeps the home clean together."),
                    ("protecting", "Elders protect younger members."),
                ],
                "relationships": [
                    ("mother's mother", "grandmother"),
                    ("father's father", "grandfather"),
                    ("mother's father", "grandfather (maternal)"),
                    ("father's mother", "grandmother (maternal)"),
                    ("brother's mother", "mother"),
                    ("sister's father", "father"),
                ],
            },
            "c1_evs_002": {
                "title": "My school and friends",
                "section": "Child's Environment",
                "vocabulary": ["school", "teacher", "principal", "helper", "friend",
                               "classmate", "rule", "routine", "respect", "sharing"],
                "school_people": [
                    ("class teacher", "She teaches us lessons in the classroom."),
                    ("principal", "He/She manages the entire school."),
                    ("helper", "He/She keeps the school clean."),
                    ("guard", "He keeps the school safe and secure."),
                    ("cleaner", "He/She cleans the classrooms and corridors."),
                    ("watchman", "He opens and closes the school gate."),
                ],
                "classroom_rules": [
                    ("Raise your hand before speaking.",
                     "This helps the teacher hear everyone and maintains order."),
                    ("Keep the classroom clean.",
                     "A clean classroom is a healthy place to study."),
                    ("Do not run in the corridors.",
                     "Running can cause accidents and injuries."),
                    ("Respect your classmates.",
                     "Everyone feels happy and safe when we respect each other."),
                    ("Complete homework on time.",
                     "It helps us practice what we learn in class."),
                ],
                "friendship_ways": [
                    "Share your toys and books with them.",
                    "Help them when they are in trouble.",
                    "Play games together nicely.",
                    "Speak politely and never fight.",
                    "Listen to them when they talk.",
                    "Comfort them when they are sad.",
                ],
            },
            "c1_evs_003": {
                "title": "Animals in my surroundings",
                "section": "Child's Environment",
                "vocabulary": ["animal", "bird", "pet", "fur", "feathers",
                               "scales", "legs", "sound", "habitat", "locality"],
                "animals_birds": [
                    ("dog", "animal", "fur", "4", "barks", "home / street"),
                    ("cat", "animal", "fur", "4", "meows", "home / street"),
                    ("cow", "animal", "hair (short)", "4", "moos", "home / farm"),
                    ("goat", "animal", "hair (short)", "4", "baas", "home / farm"),
                    ("rabbit", "animal", "fur", "4", "squeaks", "home / garden"),
                    ("crow", "bird", "feathers", "2", "caws", "tree / sky"),
                    ("sparrow", "bird", "feathers", "2", "chirps", "tree / house"),
                    ("pigeon", "bird", "feathers", "2", "coos", "rooftop / sky"),
                    ("parrot", "bird", "feathers", "2", "squawks", "tree / cage"),
                    ("fish", "animal", "scales", "0 (fins)", "bubbles", "water / aquarium"),
                ],
                "animal_sounds": [
                    ("dog", "barks"),
                    ("cat", "meows"),
                    ("cow", "moos"),
                    ("goat", "baas"),
                    ("sheep", "baas"),
                    ("lion", "roars"),
                    ("crow", "caws"),
                    ("sparrow", "chirps"),
                    ("duck", "quacks"),
                    ("frog", "croaks"),
                ],
                "body_coverings": [
                    ("fur", "dog, cat, rabbit"),
                    ("feathers", "crow, sparrow, parrot, pigeon"),
                    ("scales", "fish"),
                    ("hair (short)", "cow, goat"),
                ],
            },
            "c1_evs_004": {
                "title": "Plants in my surroundings",
                "section": "Child's Environment",
                "vocabulary": ["plant", "tree", "shrub", "herb", "leaf",
                               "flower", "fruit", "stem", "root", "garden"],
                "plants": [
                    ("mango tree", "tree", "green", "long and broad", "mango (yellow/green)", "summer"),
                    ("neem tree", "tree", "green", "long and narrow", "small (not commonly eaten)", "all seasons"),
                    ("banyan tree", "tree", "green", "oval", "small figs", "all seasons"),
                    ("rose plant", "shrub", "green", "compound with leaflets", "rose (red/pink/white)", "winter/spring"),
                    ("marigold plant", "shrub", "green", "long and pointed", "marigold (orange/yellow)", "winter"),
                    ("grass", "herb", "green", "long and thin", "no prominent flower", "all seasons"),
                    ("tulsi plant", "shrub", "green", "oval", "small (not commonly eaten)", "all seasons"),
                    ("money plant", "climber", "green", "heart-shaped", "no prominent fruit", "all seasons"),
                ],
                "plant_parts": [
                    ("root", "It grows inside the soil and holds the plant."),
                    ("stem", "It supports the plant and carries water to leaves."),
                    ("leaf", "It makes food for the plant using sunlight."),
                    ("flower", "It is the most beautiful part of the plant."),
                    ("fruit", "It has seeds inside and we can eat it."),
                ],
                "plant_colors": [
                    ("Rose", "Red, pink, white, yellow"),
                    ("Marigold", "Orange, yellow"),
                    ("Lotus", "Pink, white"),
                    ("Sunflower", "Yellow"),
                    ("Neem leaf", "Green"),
                    ("Mango leaf", "Green"),
                ],
            },
        }

        self._question_counter = 0

    def _next_id(self, prefix: str = "Q") -> str:
        self._question_counter += 1
        return f"{prefix}_{self._question_counter:03d}"

    def _hash_seed(self, node_id: str, qtype: str, index: int) -> int:
        raw = f"{self.seed}|{node_id}|{qtype}|{index}"
        h = hashlib.sha256(raw.encode()).hexdigest()
        return int(h[:8], 16)

    def generate(self, num_per_node: int = 6) -> List[Question]:
        questions = []
        for node_id, node_data in self.nodes.items():
            node_questions = self._generate_for_node(node_id, node_data, num_per_node)
            questions.extend(node_questions)
        return questions

    def _generate_for_node(self, node_id: str, node_data: Dict, count: int) -> List[Question]:
        questions = []
        competency_count = count // 2
        standard_count = count - competency_count

        for i in range(competency_count):
            q = self._generate_competency(node_id, node_data, i)
            if q:
                questions.append(q)

        for i in range(standard_count):
            q = self._generate_standard(node_id, node_data, i)
            if q:
                questions.append(q)

        return questions

    def _generate_competency(self, node_id: str, node_data: Dict, index: int) -> Optional[Question]:
        qtype_map = {
            "c1_evs_001": self._q_competency_family,
            "c1_evs_002": self._q_competency_school,
            "c1_evs_003": self._q_competency_animals,
            "c1_evs_004": self._q_competency_plants,
        }
        fn = qtype_map.get(node_id)
        if fn:
            return fn(node_id, node_data, index)
        return None

    def _generate_standard(self, node_id: str, node_data: Dict, index: int) -> Optional[Question]:
        qtype_map = {
            "c1_evs_001": self._q_standard_family,
            "c1_evs_002": self._q_standard_school,
            "c1_evs_003": self._q_standard_animals,
            "c1_evs_004": self._q_standard_plants,
        }
        fn = qtype_map.get(node_id)
        if fn:
            return fn(node_id, node_data, index)
        return None

    # ─── Family Node ───────────────────────────────────────────────────────────

    def _q_competency_family(self, node_id, node_data, index):
        qtype = ["mcq", "fill_blank", "match"][index % 3]
        seed = self._hash_seed(node_id, "comp", index)

        if qtype == "mcq":
            members = node_data["family_members"]
            m_idx = seed % len(members)
            member, role_desc = members[m_idx]
            question_text = f"Who cooks food for the family?"
            correct = "Mother"
            options = self.rng.shuffle(["Mother", "Father", "Sister", "Brother"])
            marking = "1 mark for the correct option. No negative marking."

        elif qtype == "fill_blank":
            question_text = "A family where grandparents, uncles, aunts and cousins all live together is called a _______ family."
            correct = "joint"
            options = ["joint", "nuclear", "small", "big"]
            marking = "1 mark for the correct word. Accept 'joint' only."

        else:
            question_text = "Match the family member with their role:\n" \
                            "(A) Mother     (B) Father     (C) Grandmother     (D) Brother\n" \
                            "1. Goes to work    2. Tells stories    3. Cooks food    4. Plays with you"
            correct = "A-3, B-1, C-2, D-4"
            options = []
            marking = "1/2 mark for each correct pair. Total 2 marks."

        return Question(
            question_id=self._next_id("C"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.MULTIPLE_CHOICE.value if qtype == "mcq"
            else QuestionType.FILL_BLANK.value if qtype == "fill_blank"
            else QuestionType.MATCH_COLUMNS.value,
            competency_level=CompetencyLevel.COMPETENCY.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Remember",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["family", "joint family", "mother", "father"],
        )

    def _q_standard_family(self, node_id, node_data, index):
        qtype = ["tf", "identify", "descriptive"][index % 3]
        seed = self._hash_seed(node_id, "std", index)

        if qtype == "tf":
            pairs = [
                ("A nuclear family has only parents and children.", True),
                ("In a joint family, only father and mother live with children.", False),
                ("Mother and father both play important roles in a family.", True),
                ("Grandparents do not live in a nuclear family.", True),
                ("Siblings mean brother and sister.", True),
            ]
            p_idx = seed % len(pairs)
            stmt, ans = pairs[p_idx]
            question_text = f"State True or False: {stmt}"
            correct = "True" if ans else "False"
            options = ["True", "False"]
            marking = "1 mark for the correct answer."

        elif qtype == "identify":
            rels = node_data["relationships"]
            r_idx = seed % len(rels)
            rel, answer = rels[r_idx]
            question_text = f"Who is your {rel}?"
            correct = answer
            options = []
            marking = "1 mark for the correct relationship word."

        else:
            members = node_data["family_members"]
            m_idx = seed % len(members)
            member, role = members[m_idx]
            question_text = f"Name one role that your {member} plays in the family."
            correct = role.split(".")[0].strip()
            options = []
            marking = "1 mark for any one correct role described in one sentence."

        return Question(
            question_id=self._next_id("S"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.TRUE_FALSE.value if qtype == "tf"
            else QuestionType.IDENTIFY.value if qtype == "identify"
            else QuestionType.DESCRIPTIVE.value,
            competency_level=CompetencyLevel.STANDARD.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Understand" if qtype == "descriptive" else "Remember",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["family", "relationship", "role", "joint family", "nuclear family"],
        )

    # ─── School Node ───────────────────────────────────────────────────────────

    def _q_competency_school(self, node_id, node_data, index):
        qtype = ["mcq", "fill_blank", "match"][index % 3]
        seed = self._hash_seed(node_id, "comp", index)

        if qtype == "mcq":
            people = node_data["school_people"]
            p_idx = seed % len(people)
            person, desc = people[p_idx]
            question_text = f"Who manages the entire school?"
            correct = "Principal"
            options = self.rng.shuffle(["Class Teacher", "Principal", "Helper", "Watchman"])
            marking = "1 mark for correct option."

        elif qtype == "fill_blank":
            question_text = "We should _______ our teachers and classmates."
            correct = "respect"
            options = self.rng.shuffle(["respect", "ignore", "scold", "fear"])
            marking = "1 mark for correct word."

        else:
            rules = node_data["classroom_rules"]
            r_idx = seed % len(rules)
            rule, reason = rules[r_idx]
            question_text = f"Match the classroom rule with its reason:\n" \
                            f"(A) Raise hand before speaking     (B) Do not run in corridors\n" \
                            f"(C) Keep classroom clean\n" \
                            f"1. Prevents accidents    2. Helps teacher hear everyone    3. Healthy place to study"
            correct = "A-2, B-1, C-3"
            options = []
            marking = "1/2 mark per correct pair. Total 2 marks."

        return Question(
            question_id=self._next_id("C"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.MULTIPLE_CHOICE.value if qtype == "mcq"
            else QuestionType.FILL_BLANK.value if qtype == "fill_blank"
            else QuestionType.MATCH_COLUMNS.value,
            competency_level=CompetencyLevel.COMPETENCY.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Understand",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["school", "teacher", "principal", "friend", "rule"],
        )

    def _q_standard_school(self, node_id, node_data, index):
        qtype = ["tf", "identify", "descriptive"][index % 3]
        seed = self._hash_seed(node_id, "std", index)

        if qtype == "tf":
            pairs = [
                ("The principal manages the entire school.", True),
                ("We should run in the school corridors.", False),
                ("A helper keeps the school clean.", True),
                ("Classroom rules are not important.", False),
                ("We should raise our hand before speaking in class.", True),
            ]
            p_idx = seed % len(pairs)
            stmt, ans = pairs[p_idx]
            question_text = f"State True or False: {stmt}"
            correct = "True" if ans else "False"
            options = ["True", "False"]
            marking = "1 mark for correct answer."

        elif qtype == "identify":
            people = node_data["school_people"]
            p_idx = seed % len(people)
            person, desc = people[p_idx]
            question_text = f"Who {desc[0].lower() + desc[1:]}"
            correct = person
            options = []
            marking = "1 mark for correct name."

        else:
            ways = node_data["friendship_ways"]
            w_idx = seed % len(ways)
            question_text = "Write any one way to be a good friend."
            correct = ways[w_idx]
            options = []
            marking = "1 mark for any valid way of being a good friend."

        return Question(
            question_id=self._next_id("S"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.TRUE_FALSE.value if qtype == "tf"
            else QuestionType.IDENTIFY.value if qtype == "identify"
            else QuestionType.DESCRIPTIVE.value,
            competency_level=CompetencyLevel.STANDARD.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Understand" if qtype == "descriptive" else "Remember",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["school", "teacher", "friend", "classmate", "rule", "respect"],
        )

    # ─── Animals Node ──────────────────────────────────────────────────────────

    def _q_competency_animals(self, node_id, node_data, index):
        qtype = ["mcq", "fill_blank", "match"][index % 3]
        seed = self._hash_seed(node_id, "comp", index)
        animals = node_data["animals_birds"]

        if qtype == "mcq":
            a_idx = seed % len(animals)
            animal, atype, covering, legs, sound, habitat = animals[a_idx]
            correct = sound.capitalize()
            options = self.rng.shuffle([s.capitalize() for _, s in node_data["animal_sounds"][:4]])
            question_text = f"What sound does a {animal} make?"
            marking = "1 mark for correct sound."

        elif qtype == "fill_blank":
            a_idx = seed % len(animals)
            animal, atype, covering, legs, sound, habitat = animals[a_idx]
            correct = covering
            question_text = f"A {animal} has _______ on its body."
            options = self.rng.shuffle(["fur", "feathers", "scales", "hair (short)"])
            marking = "1 mark for correct body covering."

        else:
            question_text = "Match the animal with its sound:\n" \
                            "(A) Dog     (B) Cow     (C) Crow     (D) Cat\n" \
                            "1. Moo     2. Bark     3. Caw     4. Meow"
            correct = "A-2, B-1, C-3, D-4"
            options = []
            marking = "1/2 mark per correct pair. Total 2 marks."

        return Question(
            question_id=self._next_id("C"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.MULTIPLE_CHOICE.value if qtype == "mcq"
            else QuestionType.FILL_BLANK.value if qtype == "fill_blank"
            else QuestionType.MATCH_COLUMNS.value,
            competency_level=CompetencyLevel.COMPETENCY.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Remember",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["animal", "bird", "pet", "fur", "feathers", "sound"],
        )

    def _q_standard_animals(self, node_id, node_data, index):
        qtype = ["tf", "identify", "descriptive"][index % 3]
        seed = self._hash_seed(node_id, "std", index)

        if qtype == "tf":
            pairs = [
                ("A crow is a bird.", True),
                ("A dog has feathers on its body.", False),
                ("Fish live in water.", True),
                ("A parrot has four legs.", False),
                ("Cows give us milk.", True),
            ]
            p_idx = seed % len(pairs)
            stmt, ans = pairs[p_idx]
            question_text = f"State True or False: {stmt}"
            correct = "True" if ans else "False"
            options = ["True", "False"]
            marking = "1 mark for correct answer."

        elif qtype == "identify":
            animals = node_data["animals_birds"]
            a_idx = seed % len(animals)
            animal, atype, covering, legs, sound, habitat = animals[a_idx]
            if seed % 2 == 0:
                question_text = f"How many legs does a {animal} have?"
                correct = legs
            else:
                question_text = f"What is the body covering of a {animal}?"
                correct = covering
            options = []
            marking = "1 mark for correct answer."

        else:
            question_text = "Name any two common birds found in your locality."
            correct = "Any two from: crow, sparrow, pigeon, parrot"
            options = []
            marking = "1/2 mark per correct bird name. Total 1 mark."

        return Question(
            question_id=self._next_id("S"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.TRUE_FALSE.value if qtype == "tf"
            else QuestionType.IDENTIFY.value if qtype == "identify"
            else QuestionType.DESCRIPTIVE.value,
            competency_level=CompetencyLevel.STANDARD.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Understand" if qtype == "descriptive" else "Remember",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["animal", "bird", "fur", "feathers", "habitat", "locality"],
        )

    # ─── Plants Node ───────────────────────────────────────────────────────────

    def _q_competency_plants(self, node_id, node_data, index):
        qtype = ["mcq", "fill_blank", "match"][index % 3]
        seed = self._hash_seed(node_id, "comp", index)
        plants = node_data["plants"]
        parts = node_data["plant_parts"]

        if qtype == "mcq":
            p_idx = seed % len(plants)
            plant, ptype, leaf_color, leaf_shape, fruit, season = plants[p_idx]
            question_text = f"Which part of the plant makes its own food using sunlight?"
            correct = "Leaf"
            options = self.rng.shuffle(["Root", "Stem", "Leaf", "Flower"])
            marking = "1 mark for correct option."

        elif qtype == "fill_blank":
            part_idx = seed % len(parts)
            part_name, part_desc = parts[part_idx]
            question_text = f"The _______ holds the plant firmly in the soil."
            correct = "root"
            options = self.rng.shuffle(["root", "stem", "leaf", "flower"])
            marking = "1 mark for correct answer."

        else:
            plant_colors = node_data["plant_colors"]
            pc_idx = seed % len(plant_colors)
            pname, colors = plant_colors[pc_idx]
            color_list = colors.split(", ")
            c1 = color_list[0]
            c2 = color_list[1] if len(color_list) > 1 else color_list[0]
            question_text = f"Match the plant with its flower colour:\n" \
                            f"(A) Rose     (B) Marigold     (C) Sunflower     (D) Lotus\n" \
                            f"1. Yellow     2. Pink/White     3. Red/Pink/White     4. Orange/Yellow"
            correct = "A-3, B-4, C-1, D-2"
            options = []
            marking = "1/2 mark per correct pair. Total 2 marks."

        return Question(
            question_id=self._next_id("C"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.MULTIPLE_CHOICE.value if qtype == "mcq"
            else QuestionType.FILL_BLANK.value if qtype == "fill_blank"
            else QuestionType.MATCH_COLUMNS.value,
            competency_level=CompetencyLevel.COMPETENCY.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Remember",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["plant", "tree", "leaf", "flower", "fruit", "stem", "root"],
        )

    def _q_standard_plants(self, node_id, node_data, index):
        qtype = ["tf", "identify", "descriptive"][index % 3]
        seed = self._hash_seed(node_id, "std", index)

        if qtype == "tf":
            pairs = [
                ("A mango tree is a type of plant.", True),
                ("Grass is taller than a banyan tree.", False),
                ("Leaves are the parts of a plant.", True),
                ("All plants have flowers.", False),
                ("A rose plant has thorns on its stem.", True),
            ]
            p_idx = seed % len(pairs)
            stmt, ans = pairs[p_idx]
            question_text = f"State True or False: {stmt}"
            correct = "True" if ans else "False"
            options = ["True", "False"]
            marking = "1 mark for correct answer."

        elif qtype == "identify":
            parts = node_data["plant_parts"]
            p_idx = seed % len(parts)
            part_name, part_desc = parts[p_idx]
            question_text = f"Name the part of the plant that {part_desc.split(' and')[0].split('It')[1].strip() if 'It' in part_desc else part_desc.split('.')[0].strip()}."
            correct = part_name
            options = []
            marking = "1 mark for correct part name."

        else:
            question_text = "Name any two trees you see around your school or home."
            correct = "Any two from: mango, neem, banyan, peepal, gulmohar"
            options = []
            marking = "1/2 mark per correct tree name. Total 1 mark."

        return Question(
            question_id=self._next_id("S"),
            node_id=node_id,
            node_title=node_data["title"],
            question_type=QuestionType.TRUE_FALSE.value if qtype == "tf"
            else QuestionType.IDENTIFY.value if qtype == "identify"
            else QuestionType.DESCRIPTIVE.value,
            competency_level=CompetencyLevel.STANDARD.value,
            difficulty=Difficulty.EASY.value,
            cognitive_level="Understand" if qtype == "descriptive" else "Remember",
            question_text=question_text,
            options=options,
            correct_answer=correct,
            marking_scheme=marking,
            vocabulary_words=["plant", "tree", "leaf", "flower", "fruit", "stem", "root"],
        )

    def generate_with_verification(self, num_per_node: int = 6) -> Tuple[List[Question], Dict]:
        questions = self.generate(num_per_node)
        report = self._verify(questions)
        return questions, report

    def _verify(self, questions: List[Question]) -> Dict:
        total = len(questions)
        by_node: Dict[str, int] = {}
        by_comp: Dict[str, int] = {}
        by_type: Dict[str, int] = {}
        empty_options = 0

        for q in questions:
            by_node[q.node_id] = by_node.get(q.node_id, 0) + 1
            by_comp[q.competency_level] = by_comp.get(q.competency_level, 0) + 1
            by_type[q.question_type] = by_type.get(q.question_type, 0) + 1
            if not q.correct_answer:
                empty_options += 1

        expected_nodes = set(self.nodes.keys())
        covered_nodes = set(by_node.keys())
        missing_nodes = expected_nodes - covered_nodes

        report = {
            "total_questions": total,
            "questions_per_node": dict(sorted(by_node.items())),
            "competency_breakdown": dict(sorted(by_comp.items())),
            "question_type_breakdown": dict(sorted(by_type.items())),
            "missing_nodes": list(missing_nodes),
            "questions_without_answer": empty_options,
            "seed_used": self.seed,
            "verification_passed": len(missing_nodes) == 0 and empty_options == 0,
        }
        return report

    def print_questions(self, questions: List[Question]):
        for i, q in enumerate(questions, 1):
            print(f"{'=' * 70}")
            print(f"Q{i}: [{q.question_id}] | Node: {q.node_id} ({q.node_title})")
            print(f"    Type       : {q.question_type}")
            print(f"    Competency : {q.competency_level}")
            print(f"    Difficulty : {q.difficulty}")
            print(f"    Cognitive  : {q.cognitive_level}")
            print(f"    Question   : {q.question_text}")
            if q.options:
                print(f"    Options    : {', '.join(q.options)}")
            print(f"    Answer     : {q.correct_answer}")
            print(f"    Marking    : {q.marking_scheme}")
            print(f"    Vocab      : {', '.join(q.vocabulary_words)}")

    def print_report(self, report: Dict):
        print(f"\n{'=' * 70}")
        print("VERIFICATION REPORT")
        print(f"{'=' * 70}")
        for key, value in report.items():
            print(f"  {key:35s}: {value}")


def main():
    SEED = 2025
    NUM_PER_NODE = 6

    generator = CISCEQuestionGenerator(seed=SEED)
    questions, report = generator.generate_with_verification(num_per_node=NUM_PER_NODE)

    generator.print_questions(questions)
    generator.print_report(report)


if __name__ == "__main__":
    main()