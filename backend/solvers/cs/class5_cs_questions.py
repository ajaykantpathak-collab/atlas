"""
Question Generator for Class 5 Computer Studies — CISCE Curriculum
Covers: c5_cs_001, c5_cs_002, c5_cs_003

Generates:

50% competency (Indian-context)  +  50% standard board-pattern
"""

import random
import string
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple

from class5_cs_solver import (
    CS5Solver, EARLY_DEVICES, MECHANICAL_DEVICES, GENERATIONS,
    SolveResult, BatchResult
)


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

@dataclass
class Question:
    id: str
    node_id: str
    type: str          # mcq | fill | true_false | match | short_answer
    competency: str    # indian | standard
    difficulty: str    # easy | medium | hard
    text: str
    options: List[str] = field(default_factory=list)   # MCQ only
    correct_index: int = -1                            # MCQ only
    answer: str = ""
    explanation: str = ""
    tags: List[str] = field(default_factory=list)

    def mcq_prompt(self) -> str:
        lines = [f"Q{self.id}: {self.text}"]
        for i, opt in enumerate(self.options):
            lines.append(f"   ({chr(65+i)}) {opt}")
        return "\n".join(lines)

    def fill_prompt(self) -> str:
        return f"Q{self.id}: {self.text}"

    def tf_prompt(self) -> str:
        return f"Q{self.id}: {self.text}"

    def match_prompt(self) -> str:
        lines = [f"Q{self.id}: {self.text}"]
        for i, opt in enumerate(self.options[:4]):   # Column A
            lines.append(f"   ({chr(65+i)}) {opt}")
        lines.append("   Column B:")
        for i, opt in enumerate(self.options[4:]):   # Column B
            lines.append(f"   ({i+1}) {opt}")
        return "\n".join(lines)

    def short_prompt(self) -> str:
        return f"Q{self.id}: {self.text}"


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class CS5QuestionGenerator:
    """
    Deterministic, seeded question generator.
    50% competency (Indian-context) + 50% standard (CISCE board pattern).
    """

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self._counter = 0
        self.solver = CS5Solver()
        self._all_questions: List[Question] = []

    # ── Internal helpers ───────────────────────

    def _next_id(self, prefix: str = "Q") -> str:
        self._counter += 1
        return f"{prefix}{self._counter:03d}"

    def _pick(self, items: list) -> int:
        return self.rng.randrange(len(items))

    def _shuffle(self, items: list) -> list:
        out = list(items)
        self.rng.shuffle(out)
        return out

    def _mcq(self, text: str, correct: str, distractors: List[str],
             node_id: str, competency: str, difficulty: str,
             tags: List[str] = None) -> Question:
        """Build an MCQ question with shuffled options."""
        opts = self._shuffle([correct] + distractors)
        cidx = opts.index(correct)
        q = Question(
            id=self._next_id(), node_id=node_id,
            type="mcq", competency=competency, difficulty=difficulty,
            text=text, options=opts, correct_index=cidx,
            answer=correct,
            explanation=self._mcq_explanation(node_id, correct),
            tags=tags or []
        )
        return q

    @staticmethod
    def _mcq_explanation(node_id: str, correct: str) -> str:
        exp = {
            "c5_cs_001": "Early manual calculating devices include the Abacus, "
                         "Napier's Bones, and Pascaline. They were the first tools "
                         "humans used to perform arithmetic operations.",
            "c5_cs_002": "Charles Babbage designed the Analytical Engine, considered "
                         "the first general-purpose computer design, earning him the "
                         "title 'Father of the Computer'.",
            "c5_cs_003": "Computer generations show the evolution from vacuum tubes "
                         "(1st) → transistors (2nd) → ICs (3rd) → microprocessors (4th) "
                         "→ AI (5th)."
        }
        return exp.get(node_id, correct)

    def _fill(self, text: str, answer: str, node_id: str,
              competency: str, difficulty: str,
              tags: List[str] = None) -> Question:
        return Question(
            id=self._next_id(), node_id=node_id,
            type="fill", competency=competency, difficulty=difficulty,
            text=text, answer=answer,
            explanation=self._fill_explanation(node_id, answer),
            tags=tags or []
        )

    @staticmethod
    def _fill_explanation(node_id: str, answer: str) -> str:
        return f"The correct answer is: {answer}"

    def _tf(self, statement: str, is_true: bool, node_id: str,
            competency: str, difficulty: str,
            tags: List[str] = None) -> Question:
        return Question(
            id=self._next_id(), node_id=node_id,
            type="true_false", competency=competency, difficulty=difficulty,
            text=f"True or False: {statement}",
            answer="True" if is_true else "False",
            explanation=("This statement is correct." if is_true
                         else "This statement is incorrect."),
            tags=tags or []
        )

    def _match(self, pairs: Dict[str, str], node_id: str, competency: str,
               difficulty: str, tags: List[str] = None) -> Question:
        """
        pairs: dict of left_item → right_item
        Build text + options (col A in first 4 slots, col B in next 4+ slots).
        """
        items = list(pairs.items())
        col_a = [k for k, v in items]
        col_b = [v for k, v in items]
        text = "Match Column A with the correct item in Column B."
        opts = col_a + self._shuffle(col_b)
        answer = " | ".join(f"{k} → {v}" for k, v in items)
        return Question(
            id=self._next_id(), node_id=node_id,
            type="match", competency=competency, difficulty=difficulty,
            text=text, options=opts, answer=answer,
            explanation=f"Correct matches: {answer}",
            tags=tags or []
        )

    def _short(self, text: str, answer: str, node_id: str,
               competency: str, difficulty: str,
               tags: List[str] = None) -> Question:
        return Question(
            id=self._next_id(), node_id=node_id,
            type="short_answer", competency=competency, difficulty=difficulty,
            text=text, answer=answer,
            explanation=f"Sample answer: {answer}",
            tags=tags or []
        )

    # ── Question generators — Node 1 ───────────

    def gen_name_devices_mcq(self, competency: str) -> Question:
        """Q: Which of the following is NOT an early calculating device?"""
        all_devs = list(EARLY_DEVICES.keys())
        correct = self.rng.choice(all_devs)
        others = [d for d in all_devs if d != correct]
        distractors_pool = [
            "Calculator", "Computer", "Laptop", "Smartphone",
            "Abacus", "Tabulating Machine", "Slide Rule"
        ]
        distractor_names = {
            "abacus": "Calculator", "napier_bones": "Computer",
            "pascaline": "Laptop"
        }
        distractors = ["Calculator", "Laptop", "Smartphone"]
        return self._mcq(
            "Which of the following IS an early calculating device?",
            correct=EARLY_DEVICES[correct]["name"],
            distractors=distractors,
            node_id="c5_cs_001", competency=competency, difficulty="easy",
            tags=["early-devices", "identify"]
        )

    def gen_name_devices_fill(self, competency: str) -> Question:
        """Q: Name any two early calculating devices."""
        devs = list(EARLY_DEVICES.keys())
        pick = self.rng.sample(devs, 2)
        names = [EARLY_DEVICES[d]["name"] for d in pick]
        return self._fill(
            f"Name any two early calculating devices.",
            f"Any two of: {', '.join(EARLY_DEVICES[d]['name'] for d in devs)}",
            node_id="c5_cs_001", competency=competency, difficulty="easy",
            tags=["early-devices", "recall"]
        )

    def gen_manual_or_mechanical(self, competency: str) -> Question:
        """Q: Is [device] a manual or mechanical device?"""
        devs = list(EARLY_DEVICES.keys())
        dkey = self.rng.choice(devs)
        dev = EARLY_DEVICES[dkey]
        correct = dev["type"].capitalize()
        distractors = ["Mechanical" if dev["type"] == "manual" else "Manual",
                       "Electronic", "Digital"]
        return self._mcq(
            f"Is the {dev['name']} a manual or mechanical device?",
            correct=correct,
            distractors=distractors,
            node_id="c5_cs_001", competency=competency, difficulty="easy",
            tags=["device-type", "classify"]
        )

    def gen_how_device_works(self, competency: str) -> Question:
        """Q: How does [device] work?"""
        devs = list(EARLY_DEVICES.keys())
        dkey = self.rng.choice(devs)
        dev = EARLY_DEVICES[dkey]
        distractors = []
        for other in devs:
            if other != dkey:
                distractors.append(EARLY_DEVICES[other]["mechanism"])
        return self._mcq(
            f"How does the {dev['name']} work?",
            correct=dev["mechanism"],
            distractors=distractors[:3],
            node_id="c5_cs_001", competency=competency, difficulty="medium",
            tags=["how-works", "mechanism"]
        )

    def gen_device_operations(self, competency: str) -> Question:
        """Q: The Abacus is mainly used for which operations?"""
        devs = list(EARLY_DEVICES.keys())
        dkey = self.rng.choice(devs)
        dev = EARLY_DEVICES[dkey]
        correct = " and ".join(dev["operations"]).title()
        all_ops = ["Addition", "Subtraction", "Multiplication",
                   "Division", "Exponentiation", "Square Root"]
        distractors = [op for op in all_ops if op.lower() not in
                       [o.lower() for o in dev["operations"]]][:3]
        return self._mcq(
            f"The {dev['name']} is mainly used for which operations?",
            correct=correct, distractors=distractors,
            node_id="c5_cs_001", competency=competency, difficulty="medium",
            tags=["operations", "function"]
        )

    def gen_manual_devices_count(self, competency: str) -> Question:
        """Q: How many of these early devices are manual?"""
        manual = [EARLY_DEVICES[k]["name"] for k in EARLY_DEVICES
                  if EARLY_DEVICES[k]["type"] == "manual"]
        correct_count = len(manual)
        return self._mcq(
            "How many of the following are MANUAL calculating devices: "
            "Abacus, Napier's Bones, Pascaline?",
            correct=str(correct_count),
            distractors=["0", "1", "3"],
            node_id="c5_cs_001", competency=competency, difficulty="easy",
            tags=["manual-count", "classify"]
        )

    # ── Question generators — Node 2 ───────────

    def gen_inventor_match(self, competency: str) -> Question:
        """Q: Who invented which device?"""
        if competency == "indian":
            pairs = {
                "Blaise Pascal": "Pascaline",
                "John Napier": "Napier's Bones",
                "Charles Babbage": "Analytical Engine",
                "Herman Hollerith": "Tabulating Machine"
            }
        else:
            pairs = {
                "Charles Babbage": "Difference Engine",
                "Ada Lovelace": "First Computer Programmer",
                "Herman Hollerith": "Tabulating Machine",
                "Gottfried Leibniz": "Stepped Reckoner"
            }
        return self._match(
            pairs, node_id="c5_cs_002", competency=competency,
            difficulty="medium", tags=["inventor", "matching"]
        )

    def gen_babbage_father(self, competency: str) -> Question:
        """Q: Why is Charles Babbage called the Father of the Computer?"""
        options_list = [
            "He invented the first computer mouse",
            "He designed the Analytical Engine, the first general-purpose computer design",
            "He created the first programming language",
            "He built the first electronic computer"
        ]
        correct = "He designed the Analytical Engine, the first general-purpose computer design"
        distractors = [o for o in options_list if o != correct]
        return self._mcq(
            "Why is Charles Babbage called the Father of the Computer?",
            correct=correct, distractors=distractors,
            node_id="c5_cs_002", competency=competency, difficulty="medium",
            tags=["babbage", "father-of-computer"]
        )

    def gen_analytical_engine_feature(self, competency: str) -> Question:
        """Q: What was special about the Analytical Engine?"""
        options_list = [
            "It was the first automatic calculator",
            "It was the first general-purpose computer design with input, processing and output",
            "It used punched cards for data storage",
            "It was powered by electricity"
        ]
        correct = "It was the first general-purpose computer design with input, processing and output"
        distractors = [o for o in options_list if o != correct]
        return self._mcq(
            "What made the Analytical Engine special compared to earlier devices?",
            correct=correct, distractors=distractors,
            node_id="c5_cs_002", competency=competency, difficulty="medium",
            tags=["analytical-engine", "milestone"]
        )

    def gen_punched_card_fill(self, competency: str) -> Question:
        """Fill: What did Hollerith's machine use to store data?"""
        return self._fill(
            "Hollerith's Tabulating Machine used _______ to store and represent data.",
            "punched cards",
            node_id="c5_cs_002", competency=competency, difficulty="easy",
            tags=["punched-cards", "hollerith"]
        )

    def gen_tabulating_machine_tf(self, competency: str) -> Question:
        return self._tf(
            "Hollerith's Tabulating Machine was used in the 1890 US Census.",
            is_true=True, node_id="c5_cs_002", competency=competency,
            difficulty="easy", tags=["tabulating-machine", "fact"]
        )

    def gen_electromechanical_device(self, competency: str) -> Question:
        """Q: Which of these is an ELECTROMECHANICAL device?"""
        correct = "Tabulating Machine"
        distractors = ["Abacus", "Pascaline", "Napier's Bones"]
        return self._mcq(
            "Which of the following is an ELECTROMECHANICAL counting device?",
            correct=correct, distractors=distractors,
            node_id="c5_cs_002", competency=competency, difficulty="medium",
            tags=["electromechanical", "classify"]
        )

    def gen_ibm_origin(self, competency: str) -> Question:
        """Competency: Hollerith's company became IBM — Indian curriculum connection."""
        if competency != "indian":
            return self.gen_electromechanical_device(competency)
        return self._fill(
            "Hollerith's Tabulating Machine Company eventually became _______.",
            "IBM (International Business Machines)",
            node_id="c5_cs_002", competency=competency, difficulty="medium",
            tags=["ibm", "hollerith", "indian-curriculum"]
        )

    # ── Question generators — Node 3 ───────────

    def gen_gen1_component(self, competency: str) -> Question:
        return self._mcq(
            "What was the key component of First Generation Computers?",
            correct="Vacuum Tubes (Valves)",
            distractors=["Transistors", "Integrated Circuits", "Microprocessors"],
            node_id="c5_cs_003", competency=competency, difficulty="easy",
            tags=["generations", "first-gen", "vacuum-tubes"]
        )

    def gen_gen2_component(self, competency: str) -> Question:
        return self._mcq(
            "Second Generation Computers (1950s–1960s) used:",
            correct="Transistors",
            distractors=["Vacuum Tubes", "Integrated Circuits", "Microprocessors"],
            node_id="c5_cs_003", competency=competency, difficulty="easy",
            tags=["generations", "second-gen", "transistors"]
        )

    def gen_gen3_component(self, competency: str) -> Question:
        return self._mcq(
            "Third Generation Computers used:",
            correct="Integrated Circuits (ICs)",
            distractors=["Vacuum Tubes", "Transistors", "Microprocessors"],
            node_id="c5_cs_003", competency=competency, difficulty="easy",
            tags=["generations", "third-gen", "ics"]
        )

    def gen_gen4_feature(self, competency: str) -> Question:
        return self._mcq(
            "What major development happened in Fourth Generation Computers?",
            correct="Personal Computers (PCs) became common due to Microprocessors",
            distractors=[
                "Vacuum tubes made computers smaller",
                "Transistors replaced mechanical relays",
                "Integrated Circuits made supercomputers"
            ],
            node_id="c5_cs_003", competency=competency, difficulty="medium",
            tags=["generations", "fourth-gen", "microprocessor", "pc"]
        )

    def gen_gen5_feature(self, competency: str) -> Question:
        return self._mcq(
            "Fifth Generation Computers are based on:",
            correct="Artificial Intelligence (AI)",
            distractors=["Vacuum Tubes", "Transistors", "Integrated Circuits"],
            node_id="c5_cs_003", competency=competency, difficulty="easy",
            tags=["generations", "fifth-gen", "ai"]
        )

    def gen_gen_ordering(self, competency: str) -> Question:
        """Q: Arrange the generations in correct order."""
        return self._short(
            "Arrange the five generations of computers in the correct chronological order.",
            "1st (Vacuum Tubes) → 2nd (Transistors) → 3rd (ICs) → "
            "4th (Microprocessors) → 5th (AI)",
            node_id="c5_cs_003", competency=competency, difficulty="medium",
            tags=["generations", "ordering", "chronology"]
        )

    def gen_gen_period_fill(self, competency: str) -> Question:
        """Q: Third Generation computers belong to which period?"""
        gen = GENERATIONS[2]   # 3rd generation
        return self._fill(
            f"The {gen['name']} of computers belongs to the period: _______.",
            gen["period"],
            node_id="c5_cs_003", competency=competency, difficulty="easy",
            tags=["generations", "period", "third-gen"]
        )

    def gen_first_gen_characteristics_tf(self, competency: str) -> Question:
        if competency == "indian":
            stmt = "First Generation Computers used transistors."
        else:
            stmt = "First Generation Computers were very large and slow."
        return self._tf(stmt, is_true=(competency != "indian"),
                        node_id="c5_cs_003", competency=competency,
                        difficulty="easy", tags=["first-gen", "characteristics"])

    def gen_component_to_gen(self, competency: str) -> Question:
        """Q: Vacuum Tubes → which generation?"""
        pairs = {
            "Vacuum Tubes": "First Generation",
            "Transistors": "Second Generation",
            "Integrated Circuits (ICs)": "Third Generation",
            "Microprocessors": "Fourth Generation",
            "Artificial Intelligence": "Fifth Generation"
        }
        key = self.rng.choice(list(pairs.keys()))
        return self._mcq(
            f"Which generation of computers used {key}?",
            correct=pairs[key],
            distractors=[v for k, v in pairs.items() if v != pairs[key]][:3],
            node_id="c5_cs_003", competency=competency, difficulty="medium",
            tags=["generations", "component-match"]
        )

    def gen_third_gen_language(self, competency: str) -> Question:
        """Q: What type of language was used in 3rd gen?"""
        return self._mcq(
            "Third Generation Computers used which type of programming language?",
            correct="High-level languages (e.g., FORTRAN, COBOL)",
            distractors=["Machine language (binary)", "Assembly language",
                         "Natural language"],
            node_id="c5_cs_003", competency=competency, difficulty="medium",
            tags=["generations", "third-gen", "programming"]
        )

    def gen_fourth_gen_size(self, competency: str) -> Question:
        """Q: How big were 4th gen computers?"""
        return self._mcq(
            "What was a key result of the microprocessor in Fourth Generation Computers?",
            correct="Computers became small enough to fit on a desk (Personal Computers)",
            distractors=[
                "Computers became room-sized machines",
                "Computers became faster but remained huge",
                "No change in computer size"
            ],
            node_id="c5_cs_003", competency=competency, difficulty="medium",
            tags=["generations", "fourth-gen", "size"]
        )

    # ── Question generators — Integrated / Mixed ──

    def gen_evolution_sequence_short(self, competency: str) -> Question:
        """Q: Describe the evolution from Abacus → AI."""
        return self._short(
            "Describe the evolution of computing devices from the Abacus to "
            "Fifth Generation Computers in a few sentences.",
            "Computers evolved from manual devices (Abacus) to mechanical devices "
            "(Pascaline, Babbage's Engines), then through five generations: "
            "1st (vacuum tubes) → 2nd (transistors) → 3rd (ICs) → "
            "4th (microprocessors, PCs) → 5th (AI). Each generation became "
            "smaller, faster, and more affordable.",
            node_id="c5_cs_003", competency=competency, difficulty="hard",
            tags=["evolution", "integrated", "history"]
        )

    def gen_identify_device(self, competency: str) -> Question:
        """Q: A device uses punched cards — identify it."""
        scenarios = [
            ("uses punched cards to count and sort data for the US Census",
             "Tabulating Machine (Hollerith)"),
            ("uses beads on rods and was invented in ancient China",
             "Abacus"),
            ("uses gears and wheels for addition and subtraction, built by Blaise Pascal",
             "Pascaline"),
            ("uses numbered rods invented by John Napier for multiplication",
             "Napier's Bones"),
            ("has input, processing, and output units and is called the first "
             "general-purpose computer",
             "Analytical Engine (Charles Babbage)"),
        ]
        desc, correct = self.rng.choice(scenarios)
        distractors = [s[1] for s in scenarios if s[1] != correct][:3]
        return self._mcq(
            f"Which device {desc}?",
            correct=correct, distractors=distractors,
            node_id="c5_cs_001", competency=competency, difficulty="medium",
            tags=["identify-device", "description"]
        )

    def gen_true_false_mixed(self, competency: str) -> Question:
        """Generate a True/False question drawing from all nodes."""
        facts = [
            ("The Abacus was invented in ancient China.", True),
            ("Napier's Bones was invented by Blaise Pascal.", False),
            ("Pascaline uses beads on rods for calculation.", False),
            ("Charles Babbage is called the Father of the Computer.", True),
            ("The Analytical Engine had input, processing, and output units.", True),
            ("Hollerith's machine used punched cards.", True),
            ("First Generation Computers used transistors.", False),
            ("Fourth Generation Computers used Microprocessors.", True),
            ("Fifth Generation Computers are based on Artificial Intelligence.", True),
            ("Transistors made computers slower than vacuum tubes.", False),
            ("The Difference Engine was a general-purpose computer.", False),
            ("Personal Computers became common in the Fifth Generation.", False),
        ]
        if competency == "indian":
            facts += [
                ("Hollerith's company eventually became IBM.", True),
                ("Napier's Bones could perform division.", True),
                ("The Abacus is a mechanical device.", False),
            ]
        stmt, truth = self.rng.choice(facts)
        return self._tf(stmt, is_true=truth, node_id="c5_cs_003",
                        competency=competency, difficulty="easy",
                        tags=["true-false", "fact-check"])

    # ── Main generation interface ──────────────

    def generate(self, node_ids: List[str] = None,
                 competency: str = None,
                 question_types: List[str] = None,
                 count: int = 10) -> List[Question]:
        """
        Generate a list of questions.

        Args:
            node_ids: list of node IDs to draw from (None = all 3)
            competency: 'indian' or 'standard' or 'both' (None = 'both')
            question_types: list of types to include (None = all)
            count: target number of questions (approximate)

        Returns:
            List of Question objects.
        """
        if node_ids is None:
            node_ids = ["c5_cs_001", "c5_cs_002", "c5_cs_003"]

        if competency is None:
            competencies = ["indian", "standard"]
        elif competency == "both":
            competencies = ["indian", "standard"]
        else:
            competencies = [competency]

        node_gen_map = {
            "c5_cs_001": [
                self.gen_name_devices_mcq,
                self.gen_name_devices_fill,
                self.gen_manual_or_mechanical,
                self.gen_how_device_works,
                self.gen_device_operations,
                self.gen_manual_devices_count,
                self.gen_identify_device,
            ],
            "c5_cs_002": [
                self.gen_inventor_match,
                self.gen_babbage_father,
                self.gen_analytical_engine_feature,
                self.gen_punched_card_fill,
                self.gen_tabulating_machine_tf,
                self.gen_electromechanical_device,
                self.gen_ibm_origin,
            ],
            "c5_cs_003": [
                self.gen_gen1_component,
                self.gen_gen2_component,
                self.gen_gen3_component,
                self.gen_gen4_feature,
                self.gen_gen5_feature,
                self.gen_gen_ordering,
                self.gen_gen_period_fill,
                self.gen_first_gen_characteristics_tf,
                self.gen_component_to_gen,
                self.gen_third_gen_language,
                self.gen_fourth_gen_size,
                self.gen_evolution_sequence_short,
            ]
        }
        cross_node = [
            self.gen_true_false_mixed,
            self.gen_identify_device,
        ]

        questions: List[Question] = []

        per_comp = max(1, count // len(competencies))

        for comp in competencies:
            for _ in range(per_comp):
                all_gens = []
                for nid in node_ids:
                    all_gens += [(g, nid) for g in node_gen_map.get(nid, [])]
                all_gens += [(g, "cross") for g in cross_node]

                if not all_gens:
                    continue

                gen_fn, _ = self.rng.choice(all_gens)
                try:
                    q = gen_fn(comp)
                    questions.append(q)
                except Exception:
                    continue

        questions = questions[:count]
        self._all_questions = questions
        return questions

    def generate_by_node(self, node_id: str, competency: str,
                         count: int = 5) -> List[Question]:
        """Generate questions for a single node."""
        return self.generate(node_ids=[node_id], competency=competency,
                             count=count)

    def generate_mcq_set(self, node_ids: List[str] = None,
                         competency: str = None, count: int = 10) -> List[Question]:
        """Generate only MCQ questions."""
        all_q = self.generate(node_ids=node_ids, competency=competency, count=count * 2)
        mcqs = [q for q in all_q if q.type == "mcq"]
        return mcqs[:count]

    def verify(self, questions: List[Question] = None) -> Tuple[int, int, List[str]]:
        """
        Verify that all questions have valid answers and options.
        Returns (passed, failed, errors).
        """
        questions = questions or self._all_questions
        passed = failed = 0
        errors: List[str] = []

        for q in questions:
            sq = {"type": "", "user_answer": q.answer}
            ok = True
            if q.type == "mcq":
                if not q.options or q.correct_index < 0:
                    ok = False
                    errors.append(f"{q.id}: MCQ missing options or correct_index")
                if q.correct_index >= len(q.options):
                    ok = False
                    errors.append(f"{q.id}: correct_index out of range")
            if q.type in ("fill", "true_false", "short_answer"):
                if not q.answer:
                    ok = False
                    errors.append(f"{q.id}: empty answer for {q.type}")
            if ok:
                passed += 1
            else:
                failed += 1

        return passed, failed, errors

    def verify_solver(self, questions: List[Question] = None) -> BatchResult:
        """
        Run each question through the solver with the correct answer.
        All should return correct=True.
        """
        questions = questions or self._all_questions
        type_map = {
            "mcq": "device_type",
            "fill": "abacus_country",
            "true_false": "babbage_title",
            "match": "hollerith_device",
            "short_answer": "babbage_diff",
        }
        batch_questions = []
        for q in questions:
            bq = {
                "type": type_map.get(q.type, "babbage_title"),
                "user_answer": q.answer,
                "node_id": q.node_id,
            }
            if q.type == "mcq":
                bq["device"] = q.text.split("Is the ")[-1].split(" a")[0] if "Is the" in q.text else "Abacus"
            batch_questions.append(bq)

        return self.solver.solve_batch(batch_questions)


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def print_question(q: Question):
    print(f"\n{'─'*55}")
    print(f"  [{q.node_id}]  Type: {q.type}  |  Competency: {q.competency}")
    if q.type == "mcq":
        print(q.mcq_prompt())
    elif q.type == "fill":
        print(q.fill_prompt())
        print(f"  (Answer: {q.answer})")
    elif q.type == "true_false":
        print(q.tf_prompt())
        print(f"  (Answer: {q.answer})")
    elif q.type == "match":
        print(q.match_prompt())
        print(f"  (Answer: {q.answer})")
    elif q.type == "short_answer":
        print(q.short_prompt())
        print(f"  (Sample answer: {q.answer})")
    print(f"  Explanation: {q.explanation}")
    print(f"  Tags: {', '.join(q.tags)}")


def print_batch(questions: List[Question], title: str = "Question Set"):
    print(f"\n{'═'*60}")
    print(f"  {title}")
    print(f"  Total: {len(questions)} questions")
    print(f"{'═'*60}")
    for q in questions:
        print_question(q)


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def demo():
    gen = CS5QuestionGenerator(seed=42)

    print("╔══════════════════════════════════════════════════════════╗")
    print("║   Class 5 Computer Studies — Question Generator Demo    ║")
    print("╚══════════════════════════════════════════════════════════╝")

    # ── Generate full set