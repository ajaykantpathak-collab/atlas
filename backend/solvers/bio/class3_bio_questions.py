import random
import json
import math
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Tuple
from numpy.random import Generator, PCG64
import hashlib

# ─── DETERMINISTIC SEED ENGINE ───────────────────────────────────────────────
class SeededRNG:
    """Deterministic PRNG wrapper backed by numpy PCG64."""
    def __init__(self, seed: int = 20260101):
        self._seed = seed
        self._rng = Generator(PCG64(seed))

    def choice(self, seq):
        return seq[self._rng.integers(0, len(seq))]

    def sample(self, seq, k):
        indices = sorted(self._rng.choice(len(seq), size=min(k, len(seq)), replace=False))
        return [seq[i] for i in indices]

    def shuffle(self, seq):
        arr = list(seq)
        self._rng.shuffle(arr)
        return arr

    def randint(self, lo, hi):
        return int(self._rng.integers(lo, hi + 1))

    def uniform(self, lo, hi):
        return float(self._rng.uniform(lo, hi))

    def deterministic_id(self, node_id: str, question_index: int) -> int:
        """Produce a stable integer id from node+index."""
        raw = f"{node_id}:{question_index}:{self._seed}"
        return int(hashlib.sha256(raw.encode()).hexdigest()[:8], 16)

# ─── DATA STRUCTURES ─────────────────────────────────────────────────────────
@dataclass
class Question:
    id: str
    node_id: str
    cognitive_level: str
    difficulty: str
    competency_type: str  # 'standard' | 'competency'
    question_type: str    # 'mcq' | 'fill_blank' | 'match' | 'scenario' | 'sort'
    question_text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    explanation: str = ""
    marks: int = 1
    vocabulary_tagged: List[str] = field(default_factory=list)

@dataclass
class ValidationResult:
    is_valid: bool
    question_id: str
    checks_passed: int
    checks_failed: int
    details: List[str] = field(default_factory=list)

# ─── QUESTION BANK ───────────────────────────────────────────────────────────
# Indian-context competency items (50 % of output)
INDIAN_CONTEXT = {
    "animals": ["cow", "elephant", "tiger", "monkey", "dog", "cat", "goat", "rabbit", "peacock", "camel"],
    "plants": ["mango tree", "banyan tree", "neem plant", "rose bush", "coconut tree", "tulsi plant", "banana tree", "hibiscus"],
    "nonliving": ["stone", "chair", "book", "water", "pen", "table", "ball", "cycle", "bucket", "toy car"],
    "festivals": ["Diwali", "Holi", "Pongal", "Baisakhi", "Onam"],
    "foods": ["roti", "rice", "idli", "dosa", "laddu", "jalebi"],
    "places": ["school", "temple", "park", "market", "village", "river"],
    "body_parts_external": ["head", "arm", "leg", "hand", "foot", "ear", "nose", "eye", "mouth", "finger"],
    "internal_organs": ["heart", "lungs", "stomach", "liver", "kidneys", "brain", "intestines"],
    "organ_locations": {
        "heart": "in the chest, slightly to the left",
        "lungs": "in the chest, on either side of the heart",
        "stomach": "in the abdomen, below the chest",
        "liver": "in the upper abdomen, on the right side",
        "kidneys": "in the back of the abdomen, one on each side",
        "brain": "inside the head, protected by the skull",
        "intestines": "in the abdomen, below the stomach",
    },
    "organ_functions": {
        "heart": "pumps blood to all parts of the body",
        "lungs": "help us breathe by taking in oxygen and giving out carbon dioxide",
        "stomach": "digests food by churning it into a soft paste",
        "liver": "cleans the blood and removes harmful substances",
        "kidneys": "clean the blood by removing waste as urine",
        "brain": "controls all the actions of the body",
        "intestines": "absorb nutrients from digested food",
    },
    "respiratory_organs": ["nose", "windpipe", "lungs"],
    "respiratory_functions": {
        "nose": "takes in air and filters dust",
        "windpipe": "carries air from the nose to the lungs",
        "lungs": "take in oxygen from air and give out carbon dioxide",
    },
    "breathing_facts": [
        "We breathe about 20 times every minute",
        "We breathe faster when we run or play",
        "We breathe through our nose mostly",
        "Plants give us oxygen to breathe",
        "Clean air helps our lungs stay healthy",
    ],
}

VOCAB_MAP = {
    "c3_bio_001": ["living", "non-living", "grow", "move", "breathe", "reproduce", "feed",
                   "respond", "stimuli", "excrete", "senses", "energy", "surroundings",
                   "organism", "life"],
    "c3_bio_002": ["organ", "internal", "heart", "stomach", "lungs", "digestion",
                   "brain", "liver", "kidney", "intestine", "blood", "pump", "chest",
                   "abdomen", "function"],
    "c3_bio_003": ["nose", "windpipe", "lungs", "breathe", "air", "trachea",
                   "bronchi", "diaphragm"],
}

# ─── QUESTION TEMPLATES ──────────────────────────────────────────────────────
class QuestionGenerator:
    """Deterministic question generator for Class 3 Biology."""

    def __init__(self, seed: int = 20260101):
        self.rng = SeededRNG(seed)
        self.node_ids = ["c3_bio_001", "c3_bio_002", "c3_bio_003"]
        self.generated: Dict[str, List[Question]] = {nid: [] for nid in self.node_ids}
        self.validation_log: List[ValidationResult] = []

    # ── utilities ────────────────────────────────────────────────────────────
    def _uid(self, node_id: str, idx: int) -> str:
        return f"Q_{node_id}_{idx:03d}"

    def _tag_vocab(self, node_id: str, text: str) -> List[str]:
        vocab = set(VOCAB_MAP.get(node_id, []))
        return sorted([w for w in vocab if w.lower() in text.lower()])

    def _explain(self, correct: str, wrong: str, reason: str) -> str:
        return f"Correct: {correct}. {reason} Wrong option '{wrong}' is incorrect."

    # ── NODE 001: Living and Non-Living ──────────────────────────────────────
    def _gen_node_001(self, per_type: int = 3):
        """Generate questions for c3_bio_001."""
        node_id = "c3_bio_001"
        count = 0

        # Type A: Identify living/non-living (MCQ — Standard)
        for i in range(per_type):
            count += 1
            is_living = self.rng.choice([True, False])
            if is_living:
                item = self.rng.choice(INDIAN_CONTEXT["animals"] + INDIAN_CONTEXT["plants"])
                correct = "Living thing"
                wrong = "Non-living thing"
                reason = f"A {item} is alive — it grows, needs food and water, and can reproduce."
            else:
                item = self.rng.choice(INDIAN_CONTEXT["nonliving"])
                correct = "Non-living thing"
                wrong = "Living thing"
                reason = f"A {item} does not grow on its own and does not need food or water."

            distractors = ["Both living and non-living", "Depends on the season"]
            options = self.rng.shuffle([correct] + distractors + [wrong])
            # remove extra distractor if we have 4
            options = options[:4] if len(options) > 4 else options

            q_text = (f"A child sees a {item} in the school garden. "
                      f"The teacher asks: Is a {item} a living thing or a non-living thing?")
            q = Question(
                id=self._uid(node_id, count),
                node_id=node_id,
                cognitive_level="Remember",
                difficulty="Easy",
                competency_type="standard",
                question_type="mcq",
                question_text=q_text,
                options=options,
                correct_answer=correct,
                explanation=reason,
                marks=1,
                vocabulary_tagged=self._tag_vocab(node_id, q_text),
            )
            self.generated[node_id].append(q)

        # Type B: Feature identification (MCQ — Competency / Indian context)
        feature_pairs = [
            ("grow on their own", "need food and water", "living"),
            ("breathe on their own", "do not breathe", "living"),
            ("reproduce", "do not reproduce", "living"),
            ("move on their own", "move only when pushed", "living"),
            ("do not need food", "need food", "non-living"),
        ]
        for i in range(per_type):
            count += 1
            fp = self.rng.choice(feature_pairs)
            # Indian context scenario
            scenario_item = self.rng.choice(
                INDIAN_CONTEXT["animals"] + INDIAN_CONTEXT["plants"] + INDIAN_CONTEXT["nonliving"]
            )
            if fp[2] == "living":
                correct = fp[0]
                wrong = fp[1]
                reason = f"Living things like {scenario_item} {fp[0].replace('on their own','')}."
            else:
                correct = fp[1]
                wrong = fp[0]
                reason = f"Non-living things {fp[1]}."

            options = self.rng.shuffle([correct, wrong,
                                        "Neither — it depends on the weather",
                                        "Both — all things do this"])
            options = options[:4]

            q_text = (f"Riya visits her grandmother's village during {self.rng.choice(INDIAN_CONTEXT['festivals'])}. "
                      f"She sees a {scenario_item}. Which of these is TRUE about the {scenario_item}?")
            q = Question(
                id=self._uid(node_id, count),
                node_id=node_id,
                cognitive_level="Remember",
                difficulty="Easy",
                competency_type="competency",
                question_type="mcq",
                question_text=q_text,
                options=options,
                correct_answer=correct,
                explanation=reason,
                marks=1,
                vocabulary_tagged=self._tag_vocab(node_id, q_text),
            )
            self.generated[node_id].append(q)

        # Type C: Sort objects (Competency scenario)
        count += 1
        sort_items = self.rng.sample(
            INDIAN_CONTEXT["animals"] + INDIAN_CONTEXT["plants"] + INDIAN_CONTEXT["nonliving"], 6
        )
        q_text = (f"Amit is playing a sorting game with his friends. "
                  f"Below are 6 things he found in and around his home: "
                  f"{', '.join(sort_items[:3])} and {', '.join(sort_items[3:])}. "
                  f"Help Amit sort them into two groups — LIVING and NON-LIVING.")
        living_group = [s for s in sort_items if s in (INDIAN_CONTEXT["animals"] + INDIAN_CONTEXT["plants"])]
        nonliving_group = [s for s in sort_items if s in INDIAN_CONTEXT["nonliving"]]
        correct_answer = (
            f"LIVING: {', '.join(sorted(living_group))} | "
            f"NON-LIVING: {', '.join(sorted(nonliving_group))}"
        )
        q = Question(
            id=self._uid(node_id, count),
            node_id=node_id,
            cognitive_level="Remember",
            difficulty="Easy",
            competency_type="competency",
            question_type="sort",
            question_text=q_text,
            options=[],
            correct_answer=correct_answer,
            explanation="Living things grow, need food/water, breathe, and reproduce. "
                        "Non-living things do not do these things on their own.",
            marks=2,
            vocabulary_tagged=self._tag_vocab(node_id, q_text),
        )
        self.generated[node_id].append(q)

    # ── NODE 002: Internal Organs ────────────────────────────────────────────
    def _gen_node_002(self, per_type: int = 3):
        """Generate questions for c3_bio_002."""
        node_id = "c3_bio_002"
        count = 0
        organs = INDIAN_CONTEXT["internal_organs"]
        loc_map = INDIAN_CONTEXT["organ_locations"]
        func_map = INDIAN_CONTEXT["organ_functions"]

        # Type A: Name the organ from function (MCQ — Standard)
        function_to_organ = {v: k for k, v in func_map.items()}
        for i in range(per_type):
            count += 1
            organ = self.rng.choice(organs)
            func_desc = func_map[organ]
            # generate distractors from other organs
            other_organs = [o for o in organs if o != organ]
            distractors = self.rng.sample(other_organs, min(3, len(other_organs)))
            distractor_funcs = [func_map[d] for d in distractors]
            options = self.rng.shuffle([func_desc] + distractor_funcs)[:4]

            q_text = (f"Read the description below: \"It {func_desc}.\" "
                      f"Which internal organ is being described?")
            q = Question(
                id=self._uid(node_id, count),
                node_id=node_id,
                cognitive_level="Remember",
                difficulty="Medium",
                competency_type="standard",
                question_type="mcq",
                question_text=q_text,
                options=options,
                correct_answer=func_desc,
                explanation=f"The organ that {func_desc.lower()} is the {organ}.",
                marks=1,
                vocabulary_tagged=self._tag_vocab(node_id, q_text),
            )
            self.generated[node_id].append(q)

        # Type B: Location identification (MCQ — Competency / Indian context)
        for i in range(per_type):
            count += 1
            organ = self.rng.choice(organs)
            location = loc_map[organ]
            other_locs = [loc_map[o] for o in organs if o != organ]
            distractors = self.rng.sample(other_locs, min(3, len(other_locs)))
            options = self.rng.shuffle([location] + distractors)[:4]

            place = self.rng.choice(INDIAN_CONTEXT["places"])
            q_text = (f"Priya's doctor is showing her a diagram of the human body at the {place} clinic. "
                      f"The doctor points to a spot and says: \"This is where your {organ} is located.\" "
                      f"Which description matches where the {organ} is?")
            q = Question(
                id=self._uid(node_id, count),
                node_id=node_id,
                cognitive_level="Remember",
                difficulty="Medium",
                competency_type="competency",
                question_type="mcq",
                question_text=q_text,
                options=options,
                correct_answer=location,
                explanation=f"The {organ} is located {location}.",
                marks=1,
                vocabulary_tagged=self._tag_vocab(node_id, q_text),
            )
            self.generated[node_id].append(q)

        # Type C: Fill in the blank — organ function (Competency)
        count += 1
        organ = self.rng.choice(["heart", "stomach", "lungs", "brain"])
        q_text = (f"During a school health check-up at the village health centre, "
                  f"the nurse told the children: \"Your ______ acts like a pump "
                  f"and sends blood to every part of your body.\" "
                  f"Fill in the blank with the correct organ name.")
        correct = organ
        wrong_opts = [o for o in organs if o != organ]
        options = self.rng.shuffle([correct] + self.rng.sample(wrong_opts, 3))[:4]

        q = Question(
            id=self._uid(node_id, count),
            node_id=node_id,
            cognitive_level="Remember",
            difficulty="Medium",
            competency_type="competency",
            question_type="fill_blank",
            question_text=q_text,
            options=options,
            correct_answer=correct,
            explanation=f"The {correct} {func_map[correct].lower()}. "
                        f"That is why it is called the body's pump.",
            marks=1,
            vocabulary_tagged=self._tag_vocab(node_id, q_text),
        )
        self.generated[node_id].append(q)

        # Type D: Scenario — which organ helps (MCQ — Competency)
        count += 1
        scenario_organ = self.rng.choice(organs)
        scenarios = {
            "heart": ("Arjun ran very fast during the school sports day and felt his chest beating fast. "
                      "Which organ was working hard to pump blood to his muscles?"),
            "lungs": ("After running a race, Meera was breathing very fast. "
                      "Which organs were helping her take in more oxygen?"),
            "stomach": ("After eating {food} at the school canteen, Kabir felt full. "
                        "Which organ was churning the food?").format(
                            food=self.rng.choice(INDIAN_CONTEXT["foods"])),
            "brain": ("When Kavya solved a difficult maths problem, she used her mind a lot. "
                      "Which organ was controlling her thinking?"),
            "kidneys": ("The doctor told Rohan to drink plenty of clean water. "
                        "Which organs clean the waste from his blood?"),
            "liver": ("The doctor said that eating too much fried food can harm one organ "
                      "that cleans the blood. Which organ is it?"),
            "intestines": ("After digestion, the body absorbs nutrients through long tubes "
                           "in the abdomen. Which organs are these?"),
        }
        q_text = scenarios.get(scenario_organ, f"Which organ is the {scenario_organ}?")
        wrong_opts = [o for o in organs if o != scenario_organ]
        options = self.rng.shuffle([scenario_organ] + self.rng.sample(wrong_opts, 3))[:4]

        q = Question(
            id=self._uid(node_id, count),
            node_id=node_id,
            cognitive_level="Remember",
            difficulty="Medium",
            competency_type="competency",
            question_type="scenario",
            question_text=q_text,
            options=options,
            correct_answer=scenario_organ,
            explanation=f"The {scenario_organ} {func_map[scenario_organ].lower()}.",
            marks=1,
            vocabulary_tagged=self._tag_vocab(node_id, q_text),
        )
        self.generated[node_id].append(q)

    # ── NODE 003: Respiratory System ─────────────────────────────────────────
    def _gen_node_003(self, per_type: int = 3):
        """Generate questions for c3_bio_003."""
        node_id = "c3_bio_003"
        count = 0
        organs = INDIAN_CONTEXT["respiratory_organs"]
        func_map = INDIAN_CONTEXT["respiratory_functions"]

        # Type A: Path of air — sequence (MCQ — Standard)
        for i in range(per_type):
            count += 1
            correct_seq = " → ".join(organs)
            # generate wrong permutations
            other_perms = [
                "lungs → windpipe → nose",
                "nose → lungs → windpipe",
                "windpipe → nose → lungs",
                "lungs → nose → windpipe",
            ]
            options = self.rng.shuffle([correct_seq] + self.rng.sample(other_perms, 3))[:4]

            q_text = ("When we breathe IN, air travels through our body in a specific path. "
                      "Which of the following shows the CORRECT path of air?")
            q = Question(
                id=self._uid(node_id, count),
                node_id=node_id,
                cognitive_level="Remember",
                difficulty="Medium",
                competency_type="standard",
                question_type="mcq",
                question_text=q_text,
                options=options,
                correct_answer=correct_seq,
                explanation="Air enters through the nose, goes down the windpipe, and reaches the lungs.",
                marks=1,
                vocabulary_tagged=self._tag_vocab(node_id, q_text),
            )
            self.generated[node_id].append(q)

        # Type B: Function of a respiratory organ (MCQ — Standard)
        for i in range(per_type):
            count += 1
            organ = self.rng.choice(organs)
            correct_func = func_map[organ]
            other_funcs = [func_map[o] for o in organs if o != organ]
            options = self.rng.shuffle([correct_func] + self.rng.sample(other_funcs, 3))[:4]

            q_text = f"Which of the following is the main job of the {organ}?"
            q = Question(
                id=self._uid(node_id, count),
                node_id=node_id,
                cognitive_level="Remember",
                difficulty="Medium",
                competency_type="standard",
                question_type="mcq",
                question_text=q_text,
                options=options,
                correct_answer=correct_func,
                explanation=f"The {organ} {correct_func.lower()}.",
                marks=1,
                vocabulary_tagged=self._tag_vocab(node_id, q_text),
            )
            self.generated[node_id].append(q)

        # Type C: Healthy habits (Competency — Indian context)
        count += 1
        good_habits = [
            "breathing deeply in fresh morning air",
            "covering mouth while coughing",
            "walking in a park with many trees",
            "doing pranayama (deep breathing exercises)",
        ]
        bad_habits = [
            "breathing smoke from burning leaves or firecrackers during Diwali",
            "breathing in dust while playing on the road",
            "breathing smoky air from vehicles in a busy market",
        ]
        good = self.rng.choice(good_habits)
        q_text = (f"During {self.rng.choice(INDIAN_CONTEXT['festivals'])}, some children burn firecrackers "
                  f"which creates a lot of smoke. Which of the following is the BEST way "
                  f"to keep our breathing organs healthy?")
        options = self.rng.shuffle(
            [good] + self.rng.sample(bad_habits, min(3, len(bad_habits)))
        )[:4]

        correct_exp_map = {
            "breathing deeply in fresh morning air":
                "Breathing fresh, clean air keeps the lungs healthy.",
            "covering mouth while coughing":
                "Covering the mouth prevents spreading germs to others.",
            "walking in a park with many trees":
                "Trees give us fresh oxygen — walking near them is good for breathing.",
            "doing pranayama (deep breathing exercises)":
                "Pranayama strengthens the lungs and improves breathing.",
        }
        q = Question(
            id=self._uid(node_id, count),
            node_id=node_id,
            cognitive_level="Remember",
            difficulty="Medium",
            competency_type="competency",
            question_type="scenario",
            question_text=q_text,
            options=options,
            correct_answer=good,
            explanation=correct_exp_map.get(good, good),
            marks=1,
            vocabulary_tagged=self._tag_vocab(node_id, q_text),
        )
        self.generated[node_id].append(q)

        # Type D: Fill blank — air path (Competency)
        count += 1
        organ = self.rng.choice(organs)
        fill_text = (f"The ______ is the organ that fills with air when we breathe in "
                     f"and pushes air out when we breathe out.")
        correct = organ
        wrong_opts = [o for o in organs if o != organ]
        options = self.rng.shuffle([correct] + self.rng.sample(wrong_opts, 3))[:4]

        q = Question(
            id=self._uid(node_id, count),
            node_id=node_id,
            cognitive_level="Remember",
            difficulty="Medium",
            competency_type="competency",
            question_type="fill_blank",
            question_text=fill_text,
            options=options,
            correct_answer=correct,
            explanation=f"When we breathe, air enters the {correct} "
                        f"which {func_map[correct].lower()}.",
            marks=1,
            vocabulary_tagged=self._tag_vocab(node_id, fill_text),
        )
        self.generated[node_id].append(q)

    # ── GENERATE ALL ──────────────────────────────────────────────────────────
    def generate(self):
        """Generate all questions for all nodes."""
        self._gen_node_001(per_type=3)
        self._gen_node_002(per_type=3)
        self._gen_node_003(per_type=3)
        return self

    # ── VERIFICATION ──────────────────────────────────────────────────────────
    def _verify_question(self, q: Question) -> ValidationResult:
        checks = 0
        failed = 0
        details = []

        # 1. Non-empty id
        if q.id and len(q.id) > 0:
            checks += 1
        else:
            failed += 1
            details.append("FAIL: empty id")

        # 2. Non-empty question text
        if q.question_text and len(q.question_text) > 10:
            checks += 1
        else:
            failed += 1
            details.append("FAIL: question text too short")

        # 3. correct_answer present
        if q.correct_answer and len(q.correct_answer) > 0:
            checks += 1
        else:
            failed += 1
            details.append("FAIL: no correct answer")

        # 4. MCQ: at least 2 options
        if q.question_type == "mcq" and len(q.options) >= 2:
            checks += 1
        elif q.question_type != "mcq":
            checks += 1  # non-MCQ types don't need options
        else:
            failed += 1
            details.append("FAIL: MCQ has fewer than 2 options")

        # 5. correct_answer in options (for MCQ)
        if q.question_type == "mcq":
            if q.correct_answer in q.options:
                checks += 1
            else:
                failed += 1
                details.append("FAIL: correct answer not in options")
        else:
            checks += 1

        # 6. No duplicate options
        if len(q.options) == len(set(q.options)):
            checks += 1
        else:
            failed += 1
            details.append("FAIL: duplicate options")

        # 7. marks positive integer
        if isinstance(q.marks, int) and q.marks > 0:
            checks += 1
        else:
            failed += 1
            details.append("FAIL: invalid marks")

        # 8. node_id valid
        if q.node_id in self.node_ids:
            checks += 1
        else:
            failed += 1
            details.append("FAIL: invalid node_id")

        # 9. difficulty valid
        valid_diffs = {"Easy", "Medium", "Hard"}
        if q.difficulty in valid_diffs:
            checks += 1
        else:
            failed += 1
            details.append("FAIL: invalid difficulty")

        # 10. explanation present
        if q.explanation and len(q.explanation) > 5:
            checks += 1
        else:
            failed += 1
            details.append("FAIL: explanation too short")

        return ValidationResult(
            is_valid=failed == 0,
            question_id=q.id,
            checks_passed=checks,
            checks_failed=failed,
            details=details,
        )

    def verify_all(self) -> Dict[str, List[ValidationResult]]:
        results: Dict[str, List[ValidationResult]] = {}
        total_passed = 0
        total_failed = 0

        for node_id, questions in self.generated.items():
            node_results = []
            for q in questions:
                vr = self._verify_question(q)
                node_results.append(vr)
                if vr.is_valid:
                    total_passed += 1
                else:
                    total_failed += 1
            results[node_id] = node_results
            self.validation_log.extend(node_results)

        print(f"\n{'='*60}")
        print(f"VERIFICATION SUMMARY")
        print(f"{'='*60}")
        for node_id, vrs in results.items():
            passed = sum(1 for v in vrs if v.is_valid)
            total = len(vrs)
            print(f"  {node_id}: {passed}/{total} questions passed validation")
        print(f"  TOTAL: {total_passed} passed, {total_failed} failed out of {total_passed+total_failed}")
        print(f"{'='*60}\n")
        return results

    # ── OUTPUT ────────────────────────────────────────────────────────────────
    def to_dict(self) -> Dict:
        return {
            "metadata": {
                "generator": "class3_bio_questions",
                "seed": self.rng._seed,
                "total_questions": sum(len(v) for v in self.generated.values()),
                "nodes_covered": self.node_ids,
                "standard_pct": 50,
                "competency_pct": 50,
            },
            "questions": {
                node_id: [asdict(q) for q in questions]
                for node_id, questions in self.generated.items()
            },
            "validation": {
                node_id: [asdict(v) for v in vrs]
                for node_id, vrs in self._build_validation_dict().items()
            },
        }

    def _build_validation_dict(self) -> Dict:
        result = {}
        for node_id in self.node_ids:
            result[node_id] = [
                ValidationResult(
                    is_valid=vr.is_valid,
                    question_id=vr.question_id,
                    checks_passed=vr.checks_passed,
                    checks_failed=vr.checks_failed,
                    details=vr.details,
                )
                for vr in self.validation_log
                if vr.question_id.startswith(f"Q_{node_id}")
            ]
        return result

    def print_questions(self):
        """Pretty-print all questions."""
        for node_id in self.node_ids:
            questions = self.generated[node_id]
            print(f"\n{'━'*70}")
            print(f"  NODE: {node_id}  |  Total Questions: {len(questions)}")
            print(f"{'━'*70}")
            for q in questions:
                print(f"\n  [{q.id}] ({q.competency_type.upper()}) [{q.difficulty}] {q.marks} mark(s)")
                print(f"  Q: {q.question_text}")
                if q.options:
                    for i, opt in enumerate(q.options, 1):
                        marker = " ✓" if opt == q.correct_answer else ""
                        print(f"      {i}. {opt}{marker}")
                else:
                    print(f"  Answer: {q.correct_answer}")
                print(f"  Explanation: {q.explanation}")
                if q.vocabulary_tagged:
                    print(f"  Vocabulary: {', '.join(q.vocabulary_tagged)}")

    def get_stats(self) -> Dict:
        """Return generation statistics."""
        stats = {
            "total_questions": 0,
            "per_node": {},
            "per_competency_type": {"standard": 0, "competency": 0},
            "per_question_type": {},
            "per_difficulty": {"Easy": 0, "Medium": 0, "Hard": 0},
            "validation": {"passed": 0, "failed": 0},
        }
        for node_id, questions in self.generated.items():
            node_stats = {"count": len(questions), "types": {}}
            for q in questions:
                stats["total_questions"] += 1
                stats["per_competency_type"][q.competency_type] = \
                    stats["per_competency_type"].get(q.competency_type, 0) + 1
                stats["per_question_type"][q.question_type] = \
                    stats["per_question_type"].get(q.question_type, 0) + 1
                stats["per_difficulty"][q.difficulty] = \
                    stats["per_difficulty"].get(q.difficulty, 0) + 1
                node_stats["types"][q.question_type] = \
                    node_stats["types"].get(q.question_type, 0) + 1
            stats["per_node"][node_id] = node_stats

        for vr in self.validation_log:
            if vr.is_valid:
                stats["validation"]["passed"] += 1
            else:
                stats["validation"]["failed"] += 1
        return stats


# ─── MAIN ────────────────────────────────────────────────────────────────────
def run_generator(seed: int = 20260101) -> Tuple[Dict, Dict]:
    """
    Run the Class 3 Biology question generator.

    Parameters
    ----------
    seed : int
        Deterministic seed for reproducibility.

    Returns
    -------
    output : dict
        Full question bank as a serialisable dict.
    stats : dict
        Generation and validation statistics.
    """
    print(f"Initialising Class 3 Biology Question Generator")
    print(f"Seed: {seed}")
    print(f"Covering nodes: c3_bio_001, c3_bio_002, c3_bio_003")

    generator = QuestionGenerator(seed=seed)

    # Step 1: Generate
    print("\n[Step 1] Generating questions...")
    generator.generate()
    total = sum(len(v) for v in generator.generated.values())
    print(f"  Generated {total} questions across {len(generator.node_ids)} nodes.")

    # Step 2: Verify
    print("\n[Step 2] Running verification checks...")
    generator.verify_all()

    # Step 3: Build output
    print("\n[Step 3] Building output dictionary...")
    output = generator.to_dict()
    stats = generator.get_stats()

    print("\n[Step 4] Summary statistics:")
    print(f"  Total questions        : {stats['total_questions']}")
    for nid, ns in stats["per_node"].items():
        print(f"  {nid}: {ns['count']} questions  |  Types: {ns['types']}")
    print(f"  Standard (board)       : {stats['per_competency_type']['standard']}")
    print(f"  Competency (Indian ctx): {stats['per_competency_type']['competency']}")
    print(f"  Validation PASSED      : {stats['validation']['passed']}")
    print(f"  Validation FAILED      : {stats['validation']['failed']}")

    return output, stats


if __name__ == "__main__":
    output, stats = run_generator(seed=20260101)
    print("\n" + "=" * 60)
    print("SAMPLE OUTPUT (first question per node)")
    print("=" * 60)
    for node_id, questions in output["questions"].items():
        q = questions[0]
        print(f"\n[{node_id}] {q['id']}")
        print(f"  Type: {q['competency_type'].upper()} | {q['question_type']} | {q['difficulty']}")
        print(f"  Q: {q['question_text']}")
        if q["options"]:
            print(f"  Options: {q['options']}")
        print(f"  Answer: {q['correct_answer']}")
        print(f"  Explanation: {q['explanation']}")

# ─── EXPORT ──────────────────────────────────────────────────────────────────
def export_to_json(seed: int = 20260101) -> str:
    """Return the question bank as a JSON string."""
    output, _ = run_generator(seed=seed)
    return json.dumps(output, indent=2, ensure_ascii=False)

def get_questions_for_node(node_id: str, seed: int = 20260101) -> List[Dict]:
    """Return questions for a specific node."""
    output, _ = run_generator(seed=seed)
    return output["questions"].get(node_id, [])

def get_all_questions(seed: int = 20260101) -> List[Dict]:
    """Return all questions as a flat list."""
    output, _ = run_generator(seed=seed)
    flat = []
    for node_id, questions in output["questions"].items():
        flat.extend(questions)
    return flat

def regenerate_with_seed(new_seed: int):
    """Convenience wrapper to regenerate with a different seed."""
    return run_generator(seed=new_seed)