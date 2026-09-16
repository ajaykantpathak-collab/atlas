"""
Solver for Class 5 Computer Studies — CISCE Curriculum
Covers: c5_cs_001, c5_cs_002, c5_cs_003
"""

import random
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

EARLY_DEVICES = {
    "abacus": {
        "name": "Abacus",
        "inventor": None,           # ancient, no single inventor
        "country": "China",
        "type": "manual",
        "mechanism": "Uses beads on rods for counting and arithmetic",
        "operations": ["addition", "subtraction"],
        "era": "ancient",
        "key_feature": "beads on rods"
    },
    "napier_bones": {
        "name": "Napier's Bones",
        "inventor": "John Napier",
        "country": "Scotland",
        "type": "manual",
        "mechanism": "Uses numbered rods (bones) for multiplication and division",
        "operations": ["multiplication", "division"],
        "era": "1617 AD",
        "key_feature": "numbered rods"
    },
    "pascaline": {
        "name": "Pascaline",
        "inventor": "Blaise Pascal",
        "country": "France",
        "type": "mechanical",
        "mechanism": "Uses gears and wheels for addition and subtraction",
        "operations": ["addition", "subtraction"],
        "era": "1642 AD",
        "key_feature": "gears and wheels"
    }
}

MECHANICAL_DEVICES = {
    "difference_engine": {
        "name": "Difference Engine",
        "inventor": "Charles Babbage",
        "country": "England",
        "type": "mechanical",
        "mechanism": "Automatically computed polynomial functions",
        "purpose": "Compute complex mathematical tables",
        "era": "1822 AD",
        "key_feature": "automatically computed polynomial functions",
        "significance": "First automatic calculating machine design"
    },
    "analytical_engine": {
        "name": "Analytical Engine",
        "inventor": "Charles Babbage",
        "country": "England",
        "type": "mechanical",
        "mechanism": "Had input, processing, and output units",
        "purpose": "General-purpose computing",
        "era": "1837 AD",
        "key_feature": "first general-purpose computer design",
        "significance": "Considered the first general-purpose computer; Charles Babbage is called the Father of the Computer"
    },
    "tabulating_machine": {
        "name": "Tabulating Machine",
        "inventor": "Herman Hollerith",
        "country": "United States",
        "type": "electromechanical",
        "mechanism": "Used punched cards to count and sort data",
        "purpose": "US Census data processing",
        "era": "1890 AD",
        "key_feature": "punched cards",
        "significance": "Pioneered automated data processing using punched cards"
    }
}

GENERATIONS = [
    {
        "number": 1,
        "name": "First Generation",
        "period": "1940s – 1950s",
        "key_component": "Vacuum Tubes (Valves)",
        "size": "Very large (room-sized)",
        "speed": "Slow",
        "cost": "Very expensive",
        "programming": "Machine language (binary)",
        "examples": "ENIAC, UNIVAC",
        "memory": "Magnetic drums",
        "key_characteristic": "Used vacuum tubes"
    },
    {
        "number": 2,
        "name": "Second Generation",
        "period": "1950s – 1960s",
        "key_component": "Transistors",
        "size": "Smaller than first generation",
        "speed": "Faster than first generation",
        "cost": "Cheaper than first generation",
        "programming": "Assembly language",
        "examples": "IBM 7094, CDC 1604",
        "memory": "Magnetic cores",
        "key_characteristic": "Used transistors"
    },
    {
        "number": 3,
        "name": "Third Generation",
        "period": "1960s – 1970s",
        "key_component": "Integrated Circuits (ICs)",
        "size": "Further reduced in size",
        "speed": "Further improved speed",
        "cost": "More affordable",
        "programming": "High-level languages (FORTRAN, COBOL)",
        "examples": "IBM System/360",
        "memory": "Semiconductor memory",
        "key_characteristic": "Used Integrated Circuits (ICs)"
    },
    {
        "number": 4,
        "name": "Fourth Generation",
        "period": "1970s – 1990s",
        "key_component": "Microprocessors",
        "size": "Very small (desktop/laptop)",
        "speed": "Very fast",
        "cost": "Affordable",
        "programming": "High-level languages, GUIs",
        "examples": "Personal Computers (PCs), Laptops",
        "memory": "Large (RAM, Hard disks)",
        "key_characteristic": "Used Microprocessors — Personal Computers became common"
    },
    {
        "number": 5,
        "name": "Fifth Generation",
        "period": "1990s – Present",
        "key_component": "Artificial Intelligence (AI)",
        "size": "Tiny (handheld, wearable)",
        "speed": "Extremely fast",
        "cost": "Very affordable",
        "programming": "AI, Machine Learning, Natural Language",
        "examples": "Smartphones, AI systems, Robots",
        "memory": "Very large (Cloud storage)",
        "key_characteristic": "Based on Artificial Intelligence (AI)"
    }
]


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

@dataclass
class SolveResult:
    """Result of solving a single question."""
    correct: bool
    user_answer: str
    correct_answer: str
    explanation: str
    node_id: str = ""
    detail: Dict = field(default_factory=dict)


@dataclass
class BatchResult:
    """Result of solving a batch of questions."""
    total: int
    correct_count: int
    results: List[SolveResult]
    mastery_message: str = ""

    @property
    def score_pct(self) -> float:
        return (self.correct_count / self.total * 100) if self.total else 0.0

    @property
    def grade(self) -> str:
        pct = self.score_pct
        if pct >= 90:
            return "Excellent"
        if pct >= 75:
            return "Good"
        if pct >= 60:
            return "Satisfactory"
        if pct >= 40:
            return "Needs Improvement"
        return "Keep Practising"


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

class CS5Solver:
    """
    Deterministic solver for Class 5 Computer Studies.
    Each method corresponds to a question pattern type.
    """

    # ── Node-1: Early Calculating Devices ──────

    def solve_name_devices(self, question_text: str, user_answer: str) -> SolveResult:
        """Q: 'Name three early calculating devices.'"""
        correct_set = {"abacus", "napier's bones", "napier bones", "pascaline"}
        correct_ans = "Abacus, Napier's Bones, and Pascaline"
        ua = user_answer.strip().lower()
        matched = sum(1 for k in ["abacus", "napier", "pascaline"] if k in ua)
        correct = matched >= 3
        explanation = (
            "The three early calculating devices are:\n"
            "1. Abacus – uses beads on rods for addition and subtraction\n"
            "2. Napier's Bones – uses numbered rods for multiplication and division\n"
            "3. Pascaline – uses gears and wheels for addition and subtraction"
        )
        return SolveResult(correct, user_answer, correct_ans, explanation,
                           node_id="c5_cs_001")

    def solve_device_type(self, device_name: str, user_answer: str) -> SolveResult:
        """Q: 'Is [device] manual or mechanical?'"""
        dn = device_name.strip().lower()
        mapping = {**{k: "manual" for k in EARLY_DEVICES},
                   **{k: "mechanical" for k in MECHANICAL_DEVICES}}
        expected = mapping.get(dn)
        if expected is None:
            return SolveResult(False, user_answer, "unknown",
                               f"Device '{device_name}' not found in curriculum.",
                               node_id="c5_cs_001")
        correct = user_answer.strip().lower() == expected
        explanation = (
            f"'{device_name}' is a {expected} device. "
            + ("Humans operate it directly by hand." if expected == "manual"
               else "It operates automatically using gears and mechanical parts.")
        )
        return SolveResult(correct, user_answer, expected, explanation,
                           node_id="c5_cs_001")

    def solve_how_device_works(self, device_name: str, user_answer: str) -> SolveResult:
        """Q: 'How does [device] work?'"""
        dn = device_name.strip().lower()
        all_devices = {**EARLY_DEVICES, **MECHANICAL_DEVICES}
        key_map = {
            "abacus": "abacus",
            "napier's bones": "napier_bones",
            "napier bones": "napier_bones",
            "pascaline": "pascaline",
            "difference engine": "difference_engine",
            "analytical engine": "analytical_engine",
            "tabulating machine": "tabulating_machine"
        }
        key = key_map.get(dn)
        if key is None or key not in all_devices:
            return SolveResult(False, user_answer, "unknown",
                               f"Device '{device_name}' not found.", node_id="c5_cs_001")
        expected = all_devices[key]["mechanism"]
        ua_words = set(user_answer.lower().split())
        expected_words = set(expected.lower().split()) - {"for", "and", "the", "a", "an", "to", "of"}
        overlap = ua_words & expected_words
        correct = len(overlap) >= 2
        explanation = (
            f"{all_devices[key]['name']} works as follows: {expected}.\n"
            f"It was invented by {all_devices[key].get('inventor', 'ancient people')} "
            f"and is classified as a {all_devices[key]['type']} device."
        )
        return SolveResult(correct, user_answer, expected, explanation, node_id="c5_cs_001")

    def solve_inventor(self, device_name: str, user_answer: str) -> SolveResult:
        """Q: 'Who invented [device]?'"""
        key_map = {
            "napier's bones": "napier_bones",
            "napier bones": "napier_bones",
            "pascaline": "pascaline",
            "difference engine": "difference_engine",
            "analytical engine": "analytical_engine",
            "tabulating machine": "tabulating_machine"
        }
        all_devices = {**EARLY_DEVICES, **MECHANICAL_DEVICES}
        key = key_map.get(device_name.strip().lower())
        if key is None or key not in all_devices:
            return SolveResult(False, user_answer, "unknown",
                               f"Device '{device_name}' not found.", node_id="c5_cs_002")
        expected = all_devices[key]["inventor"]
        if expected is None:
            explanation = (
                f"'{device_name}' is an ancient device with no single known inventor. "
                "It was developed in ancient China over thousands of years."
            )
            return SolveResult(False, user_answer, "Ancient — no single inventor",
                               explanation, node_id="c5_cs_001")
        correct = user_answer.strip().lower() == expected.lower()
        explanation = (
            f"{all_devices[key]['name']} was invented by {expected} "
            f"in {all_devices[key]['country']} ({all_devices[key].get('era', 'ancient times')})."
        )
        return SolveResult(correct, user_answer, expected, explanation,
                           node_id="c5_cs_002")

    def solve_abacus_country(self, user_answer: str) -> SolveResult:
        """Q: 'Which country invented the abacus?'"""
        correct = "China"
        correct_bool = user_answer.strip().lower() == correct.lower()
        explanation = (
            "The Abacus was invented in ancient China. "
            "It was used by merchants and traders for counting and calculations."
        )
        return SolveResult(correct_bool, user_answer, correct, explanation,
                           node_id="c5_cs_001")

    # ── Node-2: Mechanical / Electromechanical Devices ──

    def solve_babbage_title(self, user_answer: str) -> SolveResult:
        """Q: 'Why is Charles Babbage called the Father of the Computer?'"""
        correct_ans = (
            "He designed the Analytical Engine, the first general-purpose computer, "
            "which had input, processing, and output units like modern computers."
        )
        keywords = ["analytical engine", "general", "babbage"]
        ua = user_answer.lower()
        hits = sum(1 for kw in keywords if kw in ua)
        correct = hits >= 2
        explanation = (
            "Charles Babbage is called the Father of the Computer because he designed "
            "the Analytical Engine (1837), which is considered the first general-purpose "
            "computer. It had an input unit, a processing unit (the 'mill'), and an "
            "output unit — the same three parts found in every modern computer."
        )
        return SolveResult(correct, user_answer, correct_ans, explanation,
                           node_id="c5_cs_002")

    def solve_babbage_engine_diff(self, user_answer: str) -> SolveResult:
        """Q: 'How was the Analytical Engine different from the Difference Engine?'"""
        correct_ans = (
            "The Difference Engine only computed polynomial functions, "
            "while the Analytical Engine was a general-purpose computer "
            "that could perform any calculation and had input, processing, and output units."
        )
        keywords = ["general", "difference", "analytical"]
        ua = user_answer.lower()
        correct = sum(1 for kw in keywords if kw in ua) >= 2
        explanation = (
            "The Difference Engine (1822) was designed ONLY to compute polynomial "
            "functions (mathematical tables). The Analytical Engine (1837) was a "
            "general-purpose computer — it could perform ANY calculation and included "
            "all three units (input, processing, output) found in modern computers."
        )
        return SolveResult(correct, user_answer, correct_ans, explanation,
                           node_id="c5_cs_002")

    def solve_hollerith_device(self, user_answer: str) -> SolveResult:
        """Q: 'What device did Hollerith invent and what did it use?'"""
        correct_ans = "Tabulating Machine — used punched cards"
        ua = user_answer.lower()
        correct = ("tabulating" in ua and "punch" in ua)
        explanation = (
            "Herman Hollerith invented the Tabulating Machine. "
            "It used PUNCHED CARDS — holes punched in cards represented data. "
            "It was used in the 1890 US Census to count and sort data faster "
            "than humans could. This company later became IBM."
        )
        return SolveResult(correct, user_answer, correct_ans, explanation,
                           node_id="c5_cs_002")

    def solve_punched_card_purpose(self, user_answer: str) -> SolveResult:
        """Q: 'What was the purpose of punched cards in Hollerith's machine?'"""
        correct_ans = "To represent data as holes for counting and sorting"
        ua = user_answer.lower()
        keywords = ["data", "count", "sort", "hole", "represent", "punch"]
        correct = sum(1 for kw in keywords if kw in ua) >= 2
        explanation = (
            "Punched cards were used to REPRESENT DATA. Each hole in the card "
            "stood for a piece of information (like age, gender, occupation). "
            "The machine could then COUNT and SORT this data automatically, "
            "which was used for the US Census."
        )
        return SolveResult(correct, user_answer, correct_ans, explanation,
                           node_id="c5_cs_002")

    # ── Node-3: Generations of Computers ────────

    def solve_generation_component(self, gen_number: int, user_answer: str) -> SolveResult:
        """Q: 'What was the key component of the Nth generation?'"""
        gen = GENERATIONS[gen_number - 1]
        expected = gen["key_component"]
        correct = user_answer.strip().lower() == expected.lower()
        explanation = (
            f"{gen['name']} ({gen['period']}) used {gen['key_component']} "
            f"as its key component. Characteristics: {gen['key_characteristic']}. "
            f"Examples include {gen['examples']}."
        )
        return SolveResult(correct, user_answer, expected, explanation,
                           node_id="c5_cs_003")

    def solve_generation_ordering(self, ordered_list: List[int], user_ordered: List[int]) -> SolveResult:
        """Q: 'Arrange computer generations in correct order (1→5).'"""
        correct = ordered_list == [1, 2, 3, 4, 5]
        gen_names = [GENERATIONS[i-1]["name"] for i in range(1, 6)]
        explanation = (
            "Correct order of computer generations:\n"
            + "\n".join(f"  {i}. {gen_names[i-1]} ({GENERATIONS[i-1]['period']})"
                        for i in range(1, 6))
        )
        return SolveResult(correct, str(user_ordered), "1, 2, 3, 4, 5", explanation,
                           node_id="c5_cs_003")

    def solve_generation_period(self, gen_number: int, user_answer: str) -> SolveResult:
        """Q: 'When was the Nth generation?'"""
        gen = GENERATIONS[gen_number - 1]
        expected = gen["period"]
        correct = user_answer.strip().lower() == expected.lower()
        explanation = (
            f"{gen['name']} computers were built during {gen['period']}. "
            f"Their key technology was {gen['key_component']}."
        )
        return SolveResult(correct, user_answer, expected, explanation,
                           node_id="c5_cs_003")

    def solve_generation_characteristic(self, gen_number: int, user_answer: str) -> SolveResult:
        """Q: 'What characterises the Nth generation?'"""
        gen = GENERATIONS[gen_number - 1]
        expected = gen["key_characteristic"]
        ua = user_answer.lower()
        keywords = set(gen["key_component"].lower().split())
        ua_words = set(ua.split())
        correct = len(keywords & ua_words) >= 1
        explanation = (
            f"{gen['name']} ({gen['period']}): {gen['key_characteristic']}.\n"
            f"  Key component: {gen['key_component']}\n"
            f"  Examples: {gen['examples']}\n"
            f"  Programming: {gen['programming']}"
        )
        return SolveResult(correct, user_answer, expected, explanation,
                           node_id="c5_cs_003")

    def solve_component_generation(self, component_hint: str, user_answer: str) -> SolveResult:
        """Q: 'Vacuum tubes / Transistors / ICs / Microprocessors / AI → which generation?'"""
        comp = component_hint.strip().lower()
        gen_map = {
            "vacuum tube": 1, "vacuum tubes": 1, "valve": 1, "valves": 1,
            "transistor": 2, "transistors": 2,
            "integrated circuit": 3, "ic": 3, "ics": 3,
            "microprocessor": 4, "microprocessors": 4,
            "artificial intelligence": 5, "ai": 5
        }
        gen_num = gen_map.get(comp)
        if gen_num is None:
            return SolveResult(False, user_answer, "unknown",
                               f"Component '{component_hint}' not recognised.", node_id="c5_cs_003")
        gen = GENERATIONS[gen_num - 1]
        expected = gen["name"]
        correct = user_answer.strip().lower() == expected.lower()
        explanation = (
            f"'{component_hint.title()}' is the key component of the {expected} "
            f"({gen['period']}). {gen['key_characteristic']}. "
            f"Examples: {gen['examples']}."
        )
        return SolveResult(correct, user_answer, expected, explanation,
                           node_id="c5_cs_003")

    def solve_personal_computer_gen(self, user_answer: str) -> SolveResult:
        """Q: 'In which generation did Personal Computers become common?'"""
        correct = "Fourth Generation"  # also accept "4th Generation"
        ua = user_answer.strip().lower()
        correct_bool = "fourth" in ua or "4" in ua.split()
        explanation = (
            "Personal Computers (PCs) became common in the Fourth Generation "
            "(1970s – 1990s) because of the invention of the MICROPROCESSOR. "
            "A microprocessor is a single chip that contains the entire CPU, "
            "making computers small enough and cheap enough for individuals to own."
        )
        return SolveResult(correct_bool, user_answer, correct, explanation,
                           node_id="c5_cs_003")

    def solve_vacuum_tube_characteristic(self, user_answer: str) -> SolveResult:
        """Q: 'What is one characteristic of first-generation computers?'"""
        gen = GENERATIONS[0]
        ua = user_answer.lower()
        valid_keywords = {
            "vacuum tube": "used vacuum tubes",
            "vacuum tubes": "used vacuum tubes",
            "large": "very large, room-sized",
            "slow": "slow processing speed",
            "expensive": "very expensive",
            "machine language": "programmed in machine language (binary)",
            "binary": "programmed in machine language (binary)",
            "room-sized": "very large, room-sized",
            "eniac": "examples include ENIAC",
            "univac": "examples include UNIVAC"
        }
        correct = any(kw in ua for kw in valid_keywords)
        explanation = (
            f"First Generation (1940s–1950s) characteristics:\n"
            f"  • Used VACUUM TUBES (valves) as key components\n"
            f"  • VERY LARGE — occupied entire rooms\n"
            f"  • SLOW processing speed\n"
            f"  • VERY EXPENSIVE\n"
            f"  • Used MACHINE LANGUAGE (binary) for programming\n"
            f"  Examples: ENIAC, UNIVAC"
        )
        return SolveResult(correct, user_answer,
                           "Used vacuum tubes; very large; slow; expensive; machine language",
                           explanation, node_id="c5_cs_003")

    def solve_transistor_benefit(self, user_answer: str) -> SolveResult:
        """Q: 'How did transistors improve computers compared to vacuum tubes?'"""
        ua = user_answer.lower()
        benefits = ["smaller", "faster", "cheaper", "reliable", "less heat"]
        correct = sum(1 for b in benefits if b in ua) >= 2
        explanation = (
            "Transistors improved computers in several ways compared to vacuum tubes:\n"
            "  1. SMALLER — computers became more compact\n"
            "  2. FASTER — processing speed increased\n"
            "  3. CHEAPER — cost reduced significantly\n"
            "  4. MORE RELIABLE — lasted longer without burning out\n"
            "  5. LESS HEAT — generated much less heat than vacuum tubes\n"
            "Second Generation computers (1950s–1960s) used transistors."
        )
        return SolveResult(correct, user_answer,
                           "Smaller, faster, cheaper, more reliable, less heat",
                           explanation, node_id="c5_cs_003")

    # ── Utility: batch solver ───────────────────

    def solve_batch(self, questions: List[Dict]) -> BatchResult:
        """
        Solve a list of questions. Each dict must have:
        """
        results = []
        for q in questions:
            qtype = q.get("type", "")
            ua = q.get("user_answer", "")
            r = self._dispatch(qtype, q, ua)
            results.append(r)

        correct_count = sum(1 for r in results if r.correct)
        total = len(results)
        mastery = self._mastery_message(correct_count, total, results)
        return BatchResult(total, correct_count, results, mastery)

    def _dispatch(self, qtype: str, q: Dict, ua: str) -> SolveResult:
        dispatch_map = {
            "name_devices":         lambda: self.solve_name_devices(q["question_text"], ua),
            "device_type":          lambda: self.solve_device_type(q.get("device", ""), ua),
            "how_works":            lambda: self.solve_how_device_works(q.get("device", ""), ua),
            "inventor":             lambda: self.solve_inventor(q.get("device", ""), ua),
            "abacus_country":       lambda: self.solve_abacus_country(ua),
            "babbage_title":        lambda: self.solve_babbage_title(ua),
            "babbage_diff":         lambda: self.solve_babbage_engine_diff(ua),
            "hollerith_device":     lambda: self.solve_hollerith_device(ua),
            "punched_card":         lambda: self.solve_punched_card_purpose(ua),
            "gen_component":        lambda: self.solve_generation_component(q["gen_number"], ua),
            "gen_ordering":         lambda: self.solve_generation_ordering(
                                          q["correct_order"], q.get("user_ordered", [])),
            "gen_period":           lambda: self.solve_generation_period(q["gen_number"], ua),
            "gen_characteristic":   lambda: self.solve_generation_characteristic(q["gen_number"], ua),
            "component_gen":        lambda: self.solve_component_generation(
                                          q.get("component_hint", ""), ua),
            "pc_generation":        lambda: self.solve_personal_computer_gen(ua),
            "vacuum_tube_char":     lambda: self.solve_vacuum_tube_characteristic(ua),
            "transistor_benefit":   lambda: self.solve_transistor_benefit(ua),
        }
        fn = dispatch_map.get(qtype)
        if fn is None:
            return SolveResult(False, ua, "N/A",
                               f"No solver registered for question type '{qtype}'.")
        try:
            return fn()
        except Exception as exc:
            return SolveResult(False, ua, "ERROR",
                               f"Solver error for type '{qtype}': {exc}")

    def _mastery_message(self, correct: int, total: int,
                         results: List[SolveResult]) -> str:
        if total == 0:
            return "No questions attempted."
        pct = correct / total * 100
        from collections import Counter
        nodes = [r.node_id for r in results if r.correct]
        wrong_nodes = [r.node_id for r in results if not r.correct]

        msg = f"Score: {correct}/{total} ({pct:.0f}%) — {self._grade(pct)}\n"
        if wrong_nodes:
            weak = Counter(wrong_nodes)
            msg += "Review these nodes: " + ", ".join(
                f"{n} ({c} wrong)" for n, c in weak.most_common()
            )
        else:
            msg += "All questions correct! Well done! 🎉"
        return msg

    @staticmethod
    def _grade(pct: float) -> str:
        if pct >= 90: return "Excellent"
        if pct >= 75: return "Good"
        if pct >= 60: return "Satisfactory — keep practising"
        if pct >= 40: return "Needs Improvement — review the topics"
        return "Keep Practising — revisit the chapter"


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

if __name__ == "__main__":
    solver = CS5Solver()

    demo_questions = [
        {"type": "name_devices",     "question_text": "Name three early calculating devices.",
         "user_answer": "Abacus, Napier's Bones, Pascaline"},
        {"type": "device_type",      "device": "Abacus",       "user_answer": "Manual"},
        {"type": "device_type",      "device": "Pascaline",    "user_answer": "Manual"},
        {"type": "inventor",         "device": "Pascaline",    "user_answer": "Blaise Pascal"},
        {"type": "inventor",         "device": "Napier's Bones", "user_answer": "John Napier"},
        {"type": "babbage_title",    "user_answer": "He designed the Analytical Engine"},
        {"type": "hollerith_device", "user_answer": "Tabulating machine using punched cards"},
        {"type": "gen_component",    "gen_number": 1, "user_answer": "Vacuum Tubes"},
        {"type": "gen_component",    "gen_number": 3, "user_answer": "Transistors"},   # wrong — should be ICs
        {"type": "pc_generation",    "user_answer": "Fourth Generation"},
        {"type": "transistor_benefit", "user_answer": "Smaller and faster and cheaper"},
        {"type": "component_gen",    "component_hint": "Vacuum Tubes",
         "user_answer": "First Generation"},
        {"type": "gen_ordering",
         "correct_order": [1, 2, 3, 4, 5],
         "user_ordered": [1, 2, 3, 4, 5]},
        {"type": "gen_characteristic", "gen_number": 5,
         "user_answer": "Based on Artificial Intelligence and AI"},
    ]

    batch = solver.solve_batch(demo_questions)
    print(f"\n{'='*50}")
    print(f"Score: {batch.correct_count}/{batch.total}  ({batch.score_pct:.0f}%)  {batch.grade}")
    print(f"{'='*50}")
    print(batch.mastery_message)
    print()
    for r in batch.results:
        status = "✅" if r.correct else "❌"
        print(f"  {status} [{r.node_id}] Your answer: {r.user_answer!r}")

# -- solver contract --------------------------------------------
def solve(node_id: str = "", params: dict | None = None, **kw):
    """Verify a c5 CS answer via CS5Solver._dispatch / solve_batch.
    q must be a dict: {question_text, device, gen_number, ...} per qtype."""
    params = params or {}
    s = CS5Solver()
    if "questions" in params:
        r = s.solve_batch(params["questions"])
    else:
        q = params.get("question") if isinstance(params.get("question"), dict) else {
            "question_text": params.get("question", ""),
            "device": params.get("device", ""),
            "gen_number": params.get("gen_number", params.get("gen", 1)),
            "correct_order": params.get("correct_order", []),
            "user_ordered": params.get("user_ordered", []),
            "component_hint": params.get("component_hint", ""),
        }
        r = s._dispatch(params.get("qtype", "name_devices"), q,
                        params.get("user_answer", params.get("answer", "")))
    return r if isinstance(r, dict) else getattr(r, "__dict__", {"result": str(r)})

def check_answer(user_answer: str = "", **kw):
    return solve(params=dict(kw, user_answer=user_answer))

SOLVER_REGISTRY = {"c5_cs_solve": solve, "c5_cs_check": check_answer}
NODE_MAP = {"c5_cs_001": "c5_cs_solve", "c5_cs_002": "c5_cs_solve", "c5_cs_003": "c5_cs_solve"}
