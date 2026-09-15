"""
EVS Class 1 – Solver Module (4 nodes)
Deterministic, no LLM in computation. Uses seeded random, math, dataclasses.
"""
import random, math, re
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any

# ─────────────────────────────────────────────────────────────
# DATA CONSTANTS
# ─────────────────────────────────────────────────────────────
FAMILY_MEMBERS = [
    "mother","father","sister","brother","grandmother",
    "grandfather","uncle","aunt","cousin","parents"
]

FAMILY_ROLES = {
    "cooking":       "Cook food for the family",
    "earning":       "Earn money for the family",
    "caring":        "Take care of children and elderly",
    "helping":       "Help with household chores",
    "cleaning":      "Keep the house clean",
    "teaching":      "Teach children good habits",
    "protecting":    "Keep the family safe",
    "shopping":      "Buy vegetables and groceries",
}

FAMILY_RELATIONSHIPS = {
    "mother": "Your mother's mother is your maternal grandmother",
    "father": "Your father's father is your paternal grandfather",
    "sister": "Your sister's mother is also your mother",
    "brother": "Your brother's father is also your father",
    "grandmother": "Your grandmother's son could be your father or uncle",
    "grandfather": "Your grandfather's daughter could be your mother or aunt",
}

FAMILY_TYPES_EXAMPLES = {
    "joint":  "Grandparents, uncles, aunts and cousins all live together in one home",
    "nuclear":"Only parents and their children live together in one home",
}

SCHOOL_PEOPLE = [
    "teacher","principal","helper","guard","cleaner","clerk","driver","nurse"
]

SCHOOL_ROLES = {
    "teacher":   "Teaches children lessons in class",
    "principal": "Manages and looks after the whole school",
    "helper":    "Helps children and assists the teacher",
    "guard":     "Keeps the school gate safe and secure",
    "cleaner":   "Keeps the school clean and tidy",
    "clerk":     "Keeps school records and fees",
    "driver":    "Drives the school bus safely",
    "nurse":     "Takes care of children when they are sick",
}

ANIMAL_DATA = {
    "dog":    {"covering":"fur",  "legs":4, "sound":"barks", "type":"pet"},
    "cat":    {"covering":"fur",  "legs":4, "sound":"meows", "type":"pet"},
    "cow":    {"covering":"fur",  "legs":4, "sound":"moos",  "type":"domestic"},
    "goat":   {"covering":"fur",  "legs":4, "sound":"bleats","type":"domestic"},
    "lion":   {"covering":"fur",  "legs":4, "sound":"roars", "type":"wild"},
    "elephant":{"covering":"skin","legs":4, "sound":"trumpets","type":"wild"},
    "snake":  {"covering":"scales","legs":0, "sound":"hisses","type":"wild"},
    "fish":   {"covering":"scales","legs":0, "sound":"(silent)","type":"wild"},
    "crow":   {"covering":"feathers","legs":2,"sound":"caws", "type":"bird"},
    "sparrow":{"covering":"feathers","legs":2,"sound":"chirps","type":"bird"},
    "pigeon": {"covering":"feathers","legs":2,"sound":"coos", "type":"bird"},
    "parrot": {"covering":"feathers","legs":2,"sound":"talks/mimics","type":"bird"},
    "peacock":{"covering":"feathers","legs":2,"sound":"cries", "type":"bird"},
}

PLANT_DATA = {
    "mango":    {"type":"tree",     "parts":["leaves","flowers","fruits"], "place":"garden/orchard"},
    "neem":     {"type":"tree",     "parts":["leaves","flowers","fruits"], "place":" roadside"},
    "banyan":   {"type":"tree",     "parts":["leaves","flowers"],          "place":"temple/park"},
    "rose":     {"type":"shrub",    "parts":["leaves","flowers"],          "place":"garden"},
    "marigold": {"type":"herb",     "parts":["leaves","flowers"],          "place":"garden"},
    "sunflower":{"type":"herb",     "parts":["leaves","flowers","fruits"], "place":"garden"},
    "tulsi":    {"type":"herb",     "parts":["leaves"],                   "place":"home/garden"},
    "grass":    {"type":"herb",     "parts":["leaves"],                   "place":"ground/roadside"},
}

PLANT_TYPES_DESC = {
    "tree":   "Tall plant with a thick woody stem (trunk)",
    "shrub":  "Medium-sized plant with several woody stems",
    "herb":   "Small plant with soft green stem",
}

VOCAB_C1_001 = ["family","mother","father","sibling","grandparent",
                "joint family","nuclear family","role","relationship","relative"]
VOCAB_C1_002 = ["school","teacher","principal","helper","friend",
                "classmate","rule","routine","respect","sharing"]
VOCAB_C1_003 = ["animal","bird","pet","fur","feathers",
                "scales","legs","sound","habitat","locality"]
VOCAB_C1_004 = ["plant","tree","shrub","herb","leaf",
                "flower","fruit","stem","root","garden"]

# ─────────────────────────────────────────────────────────────
# DATACLASSES
# ─────────────────────────────────────────────────────────────
@dataclass
class Question:
    node_id: str
    q_type: str          # fib | mcq | true_false | matching | classification | vocab
    prompt: str
    options: List[str] = field(default_factory=list)
    correct_answer: Any = None
    hint: str = ""
    explanation: str = ""
    difficulty: str = "Easy"

@dataclass
class SolverResult:
    node_id: str
    q_type: str
    is_correct: bool
    user_answer: Any
    correct_answer: Any
    explanation: str
    steps: List[str] = field(default_factory=list)

# ─────────────────────────────────────────────────────────────
# SOLVER
# ─────────────────────────────────────────────────────────────
class EVSClass1Solver:
    """Deterministic solver for Class 1 EVS (4 nodes)."""

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)

    # ── helpers ───────────────────────────────────────────────
    @staticmethod
    def _normalise(text: str) -> str:
        return text.strip().lower()

    def _score(self, user: str, correct: str) -> float:
        u, c = self._normalise(user), self._normalise(correct)
        if u == c:
            return 1.0
        if c in u or u in c:
            return 0.8
        return 0.0

    # ── main entry ────────────────────────────────────────────
    def solve(self, q: Question, user_answer: Any) -> SolverResult:
        steps: List[str] = []
        node   = q.node_id
        q_type = q.q_type

        if   q_type == "fib":          res = self._fib(q, user_answer, steps)
        elif q_type == "mcq":          res = self._mcq(q, user_answer, steps)
        elif q_type == "true_false":   res = self._tf(q, user_answer, steps)
        elif q_type == "matching":     res = self._matching(q, user_answer, steps)
        elif q_type == "classification": res = self._classify(q, user_answer, steps)
        elif q_type == "vocab":        res = self._vocab(q, user_answer, steps)
        else:
            res = (False, q.correct_answer, "Unknown question type.")

        correct, correct_ans, explanation = res
        return SolverResult(
            node_id=node, q_type=q_type,
            is_correct=correct,
            user_answer=user_answer,
            correct_answer=correct_ans,
            explanation=explanation,
            steps=steps,
        )

    # ── fill-in-the-blank ─────────────────────────────────────
    def _fib(self, q, user_ans, steps):
        correct = q.correct_answer
        steps.append(f"Question: {q.prompt}")
        steps.append(f"Expected answer: {correct}")
        u = str(user_ans).strip()
        score = self._score(u, str(correct))
        ok = score >= 0.8
        expl = ("✅ Correct!" if ok else
                f"❌ Not quite. The right answer is '{correct}'. {q.explanation}")
        steps.append(expl)
        return ok, correct, expl

    # ── multiple choice ───────────────────────────────────────
    def _mcq(self, q, user_ans, steps):
        correct = q.correct_answer          # the option TEXT
        correct_idx = q.options.index(correct)
        steps.append(f"Question: {q.prompt}")
        for i, o in enumerate(q.options):
            steps.append(f"  ({chr(65+i)}) {o}")
        steps.append(f"User chose: {user_ans}")
        steps.append(f"Correct answer: ({chr(65+correct_idx)}) {correct}")
        ok = self._normalise(str(user_ans)) == self._normalise(str(correct))
        expl = ("✅ Correct!" if ok else
                f"❌ Wrong. The correct option is ({chr(65+correct_idx)}) {correct}. {q.explanation}")
        steps.append(expl)
        return ok, f"({chr(65+correct_idx)}) {correct}", expl

    # ── true / false ──────────────────────────────────────────
    def _tf(self, q, user_ans, steps):
        correct = q.correct_answer          # "True" or "False"
        steps.append(f"Statement: {q.prompt}")
        steps.append(f"User said: {user_ans}  |  Correct: {correct}")
        ok = self._normalise(str(user_ans)) == self._normalise(str(correct))
        expl = ("✅ Correct!" if ok else
                f"❌ The correct answer is '{correct}'. {q.explanation}")
        steps.append(expl)
        return ok, correct, expl

    # ── matching ──────────────────────────────────────────────
    def _matching(self, q, user_ans, steps):
        """
        user_ans: dict  {item_index (str or int): chosen_label (str)}
        correct_answer stored as dict {item_index: correct_label}
        """
        correct_map: Dict[str, str] = {
            str(k): str(v) for k, v in (q.correct_answer or {}).items()
        }
        steps.append(f"Question: {q.prompt}")
        steps.append("Match each item on the left to the correct label on the right.")
        if q.options:
            for i, opt in enumerate(q.options):
                steps.append(f"  Item {i}: {opt}")
        ua = {str(k): str(v) for k, v in (user_ans or {}).items()}
        matched = sum(1 for k in correct_map if ua.get(k) == correct_map[k])
        total   = len(correct_map)
        ok      = matched == total
        expl = (f"✅ All {total} matches correct!" if ok else
                f"❌ {matched}/{total} correct. Right answers: {correct_map}. {q.explanation}")
        steps.append(expl)
        return ok, correct_map, expl

    # ── classification ────────────────────────────────────────
    def _classify(self, q, user_ans, steps):
        correct = q.correct_answer          # dict  {category: [items]}
        steps.append(f"Question: {q.prompt}")
        steps.append(f"Categories: {', '.join(correct.keys())}")
        steps.append(f"Your answer: {user_ans}")
        correct_flat = {item: cat
                        for cat, items in correct.items()
                        for item in items}
        user_flat = {item: cat
                     for cat, items in (user_ans or {}).items()
                     for item in (items if isinstance(items, list) else [items])}
        matched = sum(1 for item, cat in correct_flat.items()
                      if user_flat.get(item) == cat)
        total   = len(correct_flat)
        ok      = matched == total
        expl = (f"✅ All {total} items classified correctly!" if ok else
                f"❌ {matched}/{total} correct. Correct classification: {correct}. {q.explanation}")
        steps.append(expl)
        return ok, correct, expl

    # ── vocabulary ────────────────────────────────────────────
    def _vocab(self, q, user_ans, steps):
        correct = q.correct_answer          # list of correct terms
        correct_set = {self._normalise(x) for x in correct}
        if isinstance(user_ans, str):
            ua_list = [self._normalise(x) for x in re.split(r"[,;/]", user_ans)]
        else:
            ua_list = [self._normalise(str(x)) for x in (user_ans or [])]
        matched  = len(correct_set & set(ua_list))
        total    = len(correct_set)
        ok       = matched == total
        expl = (f"✅ All {total} terms correct!" if ok else
                f"❌ {matched}/{total} correct. Correct answer: {', '.join(sorted(correct_set))}. {q.explanation}")
        steps.extend([f"Question: {q.prompt}",
                       f"Your answer: {ua_list}",
                       f"Correct: {sorted(correct_set)}",
                       expl])
        return ok, sorted(correct_set), expl

    # ─────────────────────────────────────────────────────────
    # Convenience: solve by raw args  (node_id, q_type, user_ans)
    # ─────────────────────────────────────────────────────────
    def solve_raw(self, node_id: str, q_type: str,
                  prompt: str, correct_answer: Any,
                  user_answer: Any, options: List[str] = None,
                  hint: str = "", explanation: str = "") -> SolverResult:
        q = Question(
            node_id=node_id, q_type=q_type,
            prompt=prompt, options=options or [],
            correct_answer=correct_answer,
            hint=hint, explanation=explanation,
        )
        return self.solve(q, user_answer)

    # ─────────────────────────────────────────────────────────
    # Node-specific helper methods  (callable independently)
    # ─────────────────────────────────────────────────────────
    def solve_family_role(self, role_key: str, user_ans: str) -> SolverResult:
        correct = FAMILY_ROLES.get(role_key, "")
        q = Question("c1_evs_001","fib",
                     f"What is the role of the family member who does '{role_key}'?",
                     correct_answer=correct,
                     explanation=f"Family role for '{role_key}': {correct}")
        return self.solve(q, user_ans)

    def solve_school_role(self, person: str, user_ans: str) -> SolverResult:
        correct = SCHOOL_ROLES.get(person, "")
        q = Question("c1_evs_002","fib",
                     f"What does the {person} do at school?",
                     correct_answer=correct,
                     explanation=f"Role of {person}: {correct}")
        return self.solve(q, user_ans)

    def solve_animal_feature(self, animal: str, feature: str, user_ans: str) -> SolverResult:
        data = ANIMAL_DATA.get(animal, {})
        key  = {"body_covering":"covering","sound":"sound",
                "legs":"legs","type":"type"}.get(feature, feature)
        correct = str(data.get(key, ""))
        q = Question("c1_evs_003","fib",
                     f"What is the {feature.replace('_',' ')} of a {animal}?",
                     correct_answer=correct,
                     explanation=f"{animal}'s {feature}: {correct}")
        return self.solve(q, user_ans)

    def solve_plant_feature(self, plant: str, feature: str, user_ans: str) -> SolverResult:
        data = PLANT_DATA.get(plant, {})
        correct = str(data.get(feature, ""))
        q = Question("c1_evs_004","fib",
                     f"What is the {feature} of the {plant}?",
                     correct_answer=correct,
                     explanation=f"{plant} {feature}: {correct}")
        return self.solve(q, user_ans)

    def verify_family_type(self, family_type: str, description: str) -> SolverResult:
        correct = FAMILY_TYPES_EXAMPLES.get(family_type.lower(), "")
        q = Question("c1_evs_001","fib",
                     f"Describe a {family_type} family:",
                     correct_answer=correct,
                     explanation=f"A {family_type} family: {correct}")
        return self.solve(q, description)

    def verify_friendship_way(self, way: str, is_correct: bool) -> SolverResult:
        GOOD_WAYS = ["sharing toys","sharing crayons","playing together",
                     "helping a friend","saying please and thank you",
                     "being kind","listening","including everyone"]
        correct = any(w in self._normalise(way) for w in GOOD_WAYS)
        verdict = "True" if correct else "False"
        q = Question("c1_evs_002","true_false",
                     f"'{way}' is a good way to be a friend.",
                     correct_answer=verdict,
                     explanation=("Yes, this is a good way to be a friend!"
                                  if correct else
                                  "Let's think of a kinder way to treat a friend."))
        return self.solve(q, "True" if is_correct else "False")

    def verify_classroom_rule(self, rule: str, reason: str) -> SolverResult:
        GOOD_RULES = ["raise hand","quiet during class","walk in corridor",
                      "share materials","keep classroom clean","be on time"]
        correct_rule = any(r in self._normalise(rule) for r in GOOD_RULES)
        q = Question("c1_evs_002","fib",
                     f"Is '{rule}' a good classroom rule?",
                     correct_answer="Yes" if correct_rule else "No",
                     explanation=("This is a good classroom rule because it keeps everyone safe and helps learning."
                                  if correct_rule else
                                  "We should follow rules that help everyone learn and stay safe."))
        return self.solve(q, "Yes" if correct_rule else "No")

    def classify_animal(self, animal: str, chosen_category: str) -> SolverResult:
        data = ANIMAL_DATA.get(animal.lower(), {})
        actual = data.get("type", "unknown")
        correct = actual == chosen_category.lower()
        q = Question("c1_evs_003","fib",
                     f"Classify the {animal}: (pet / domestic / wild / bird)",
                     correct_answer=actual,
                     explanation=f"{animal} is a {actual} animal.")
        return self.solve(q, chosen_category)

    def classify_plant(self, plant: str, chosen_type: str) -> SolverResult:
        data = PLANT_DATA.get(plant.lower(), {})
        actual = data.get("type", "unknown")
        correct = actual == chosen_type.lower()
        q = Question("c1_evs_004","fib",
                     f"Classify the {plant}: (tree / shrub / herb)",
                     correct_answer=actual,
                     explanation=f"{plant} is a {actual}.")
        return self.solve(q, chosen_type)

    # ─────────────────────────────────────────────────────────
    # Pretty-print a result
    # ─────────────────────────────────────────────────────────
    @staticmethod
    def print_result(r: SolverResult):
        status = "✅ CORRECT" if r.is_correct else "❌ INCORRECT"
        print(f"\n{'='*50}")
        print(f"Node  : {r.node_id}")
        print(f"Type  : {r.q_type}")
        print(f"Status: {status}")
        print(f"Your  : {r.user_answer}")
        print(f"Right : {r.correct_answer}")
        print(f"Steps:")
        for s in r.steps:
            print(f"  • {s}")
        print(f"Explanation: {r.explanation}")
        print(f"{'='*50}")

# ─────────────────────────────────────────────────────────────
# DEMO / SELF-TEST
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    solver = EVSClass1Solver(seed=42)

    # ── Node 001: Family ──────────────────────────────────────
    print("\n── Node c1_evs_001: My Family ──")
    r = solver.solve_raw(
        "c1_evs_001","fib",
        "Who cooks food in a family?",
        "mother",
        "maa",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_001","mcq",
        "In a nuclear family, who lives together?",
        correct_answer="Only parents and children",
        user_answer="Only parents and children",
        options=["Only parents and children",
                 "Grandparents and cousins",
                 "All relatives together",
                 "Grandparents, uncles and aunts"],
        explanation="A nuclear family = parents + children only.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_001","true_false",
        "A joint family means grandparents, uncles and aunts live together.",
        correct_answer="True",
        user_answer="True",
        explanation="In a joint family, many relatives share one home.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_001","matching",
        "Match the family member to their role.",
        correct_answer={"0":"Cook food for the family",
                        "1":"Earn money for the family",
                        "2":"Take care of children and elderly"},
        user_answer={"0":"Cook food for the family",
                     "1":"Earn money for the family",
                     "2":"Take care of children and elderly"},
        options=["Mother","Father","Grandmother"],
        explanation="Family members have different roles to help each other.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_001","vocab",
        "List the family members mentioned: mother, father, sister, brother, grandparents.",
        correct_answer=["mother","father","sister","brother","grandparents"],
        user_answer="mother, father, sister",
        explanation="Try to name all five family members.",
    )
    solver.print_result(r)

    # ── Node 002: School ──────────────────────────────────────
    print("\n── Node c1_evs_002: My School ──")
    r = solver.solve_school_role("teacher", "Teaches lessons in class")
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_002","mcq",
        "Who keeps the school gate safe and secure?",
        correct_answer="Guard",
        user_answer="Guard",
        options=["Teacher","Guard","Cleaner","Clerk"],
        explanation="The guard stands at the gate to keep everyone safe.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_002","true_false",
        "We should share our crayons with friends.",
        correct_answer="True",
        user_answer="True",
        explanation="Sharing is a good habit and makes friends happy.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_002","fib",
        "Name one good way to be a friend.",
        correct_answer="Share toys with friends",
        user_ans="share toys",
    )
    # use solve directly:
    r = solver.solve(Question("c1_evs_002","fib",
                              "Name one good way to be a friend.",
                              correct_answer="Share toys with friends",
                              explanation="Sharing is a good way to be a friend."),
                     "share toys")
    solver.print_result(r)

    # ── Node 003: Animals ─────────────────────────────────────
    print("\n── Node c1_evs_003: Animals ──")
    r = solver.solve_animal_feature("dog", "sound", "barks")
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_003","mcq",
        "Which animal has scales on its body?",
        correct_answer="Fish",
        user_answer="Fish",
        options=["Dog","Fish","Cow","Cat"],
        explanation="Fish have scales. Dogs and cats have fur.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_003","classification",
        "Sort these animals: pet or wild?  [dog, lion, cow, cat, elephant]",
        correct_answer={"pet":["dog","cat"],
                        "domestic":["cow"],
                        "wild":["lion","elephant"]},
        user_answer={"pet":["dog","cat"],
                     "domestic":["cow"],
                     "wild":["lion","elephant"]},
        explanation="Pets live at home, wild animals live in forests.",
    )
    solver.print_result(r)

    r = solver.classify_animal("dog", "pet")
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_003","true_false",
        "Birds have feathers on their body.",
        correct_answer="True",
        user_answer="True",
        explanation="All birds have feathers which help them fly and keep warm.",
    )
    solver.print_result(r)

    # ── Node 004: Plants ──────────────────────────────────────
    print("\n── Node c1_evs_004: Plants ──")
    r = solver.solve_plant_feature("mango", "type", "tree")
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_004","mcq",
        "Which plant is a herb?",
        correct_answer="Tulsi",
        user_answer="Tulsi",
        options=["Mango tree","Banyan tree","Tulsi","Neem tree"],
        explanation="Tulsi is a small plant with a soft stem — a herb.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_004","fib",
        "Name one visible part of a plant.",
        correct_answer="leaf",
        user_ans="leaf",
    )
    r = solver.solve(Question("c1_evs_004","fib",
                              "Name one visible part of a plant.",
                              correct_answer="leaf",
                              explanation="Leaves, flowers, fruits and stems are visible parts."),
                     "leaf")
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_004","classification",
        "Sort these plants: tree, shrub or herb?  [mango, rose, marigold, banyan, tulsi]",
        correct_answer={"tree":["mango","banyan"],
                        "shrub":["rose"],
                        "herb":["marigold","tulsi"]},
        user_answer={"tree":["mango","banyan"],
                     "shrub":["rose"],
                     "herb":["marigold","tulsi"]},
        explanation="Trees are tall with thick trunks, shrubs have several stems, herbs are small.",
    )
    solver.print_result(r)

    r = solver.solve_raw(
        "c1_evs_004","true_false",
        "Grass is a type of plant.",
        correct_answer="True",
        user_answer="True",
        explanation="Grass is a small herb-type plant that grows everywhere.",
    )
    solver.print_result(r)

    print("\n✅  Solver self-test complete.\n")