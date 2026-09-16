"""
Class 5 Biology Solver - Circulatory System (3 Nodes)
Solver + Verifier + Step-by-Step Explainer
"""
import random
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple

random.seed(42)


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
@dataclass
class KnowledgeBase:
    """Complete knowledge base for the 3 circulatory system nodes."""

    # ── Node 1: Organs ──
    organs: List[str] = field(default_factory=lambda: ["heart", "arteries", "veins"])

    heart: Dict = field(default_factory=lambda: {
        "type": "muscular organ",
        "location": "in the chest (slightly to the left)",
        "function": "pumps blood to the whole body",
        "characteristic": "beats continuously without resting",
        "analogy_india": "like a water pump in a village that pushes water through pipes to every home",
        "analogy_standard": "like a water pump in a city that pushes water through pipes"
    })

    arteries: Dict = field(default_factory=lambda: {
        "direction": "carry blood AWAY from the heart",
        "walls": "thick and strong (to handle high pressure)",
        "analogy_india": "like one-way roads going OUT of a city (NH highways carrying traffic outward)",
        "analogy_standard": "like one-way roads going out of a city centre"
    })

    veins: Dict = field(default_factory=lambda: {
        "direction": "carry blood BACK to the heart",
        "special_feature": "have valves to prevent backflow (like one-way doors)",
        "analogy_india": "like one-way roads coming BACK into the city (local roads returning traffic)",
        "analogy_standard": "like one-way roads coming back into the city"
    })

    # ── Node 2: Functions of blood ──
    blood_functions: List[Dict] = field(default_factory=lambda: [
        {"function": "Carries oxygen from lungs to all body parts",
         "detail": "Red blood cells pick up oxygen in the lungs and drop it at every cell",
         "analogy_india": "like a delivery van carrying oxygen parcels from the post office (lungs) to every house (cell)",
         "analogy_standard": "like a delivery van carrying oxygen parcels"},
        {"function": "Carries nutrients from digested food to body cells",
         "detail": "After the stomach and intestines digest food, nutrients enter the blood",
         "analogy_india": "like a ration truck carrying food grains from the mandi to every home",
         "analogy_standard": "like a delivery truck carrying food to cells"},
        {"function": "Carries waste products away to be removed",
         "detail": "Carbon dioxide and other wastes are carried to lungs and kidneys",
         "analogy_india": "like a garbage collection van picking up waste from homes",
         "analogy_standard": "like a waste collection service"},
        {"function": "Helps fight disease and heal wounds by clotting",
         "detail": "White blood cells fight germs; platelets help stop bleeding by forming clots",
         "analogy_india": "like security guards (white blood cells) and quick-fix patches (platelets)",
         "analogy_standard": "like the body's police force and repair patches"}
    ])

    blood_importance: str = (
        "Without blood, body cells would not get oxygen or food and would die. "
        "Blood is the river of life that keeps every part of the body working."
    )

    # ── Node 3: Process of circulation ──
    circulation_steps: List[Dict] = field(default_factory=lambda: [
        {"step": 1, "action": "Heart pumps blood out through arteries",
         "detail": "The heart contracts (squeezes) and pushes blood into the arteries"},
        {"step": 2, "action": "Blood reaches all body parts through arteries",
         "detail": "Blood travels through arteries and reaches every cell in the body"},
        {"step": 3, "action": "Blood delivers oxygen and nutrients; collects waste",
         "detail": "At each cell, blood drops off oxygen and food, picks up waste like CO2"},
        {"step": 4, "action": "Blood returns to the heart through veins",
         "detail": "Used blood flows back through veins with the help of valves"},
        {"step": 5, "action": "Heart pumps blood to the lungs for fresh oxygen",
         "detail": "The heart sends blood to lungs where it picks up fresh oxygen"},
        {"step": 6, "action": "The cycle repeats continuously",
         "detail": "This never-ending loop keeps the body alive and healthy"}
    ])

    circulation_summary: str = (
        "Heart → Arteries → Body cells (give O2+food, take waste) → Veins → Heart → Lungs (get O2) → Repeat"
    )


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class BiologySolver:
    """Core solver: answers questions and explains concepts."""

    def __init__(self):
        self.kb = KnowledgeBase()

    # ── Node 1 answers ──
    def list_organs(self) -> List[str]:
        return list(self.kb.organs)

    def describe_organ(self, organ: str, context: str = "both") -> str:
        organ = organ.lower().strip()
        if organ == "heart":
            d = self.kb.heart
            if context == "india":
                return f"{d['type']} located {d['location']}. It {d['function']}. {d['analogy_india']}."
            return f"{d['type']} located {d['location']}. It {d['function']}. {d['analogy_standard']}."
        elif organ == "arteries":
            d = self.kb.arteries
            if context == "india":
                return f"Blood vessels that {d['direction']} to body parts. They have {d['walls']}. {d['analogy_india']}."
            return f"Blood vessels that {d['direction']} to body parts. They have {d['walls']}. {d['analogy_standard']}."
        elif organ == "veins":
            d = self.kb.veins
            if context == "india":
                return f"Blood vessels that {d['direction']}. They {d['special_feature']}. {d['analogy_india']}."
            return f"Blood vessels that {d['direction']}. They {d['special_feature']}. {d['analogy_standard']}."
        return f"Unknown organ: {organ}"

    def compare_arteries_veins(self) -> str:
        return (
            "ARTERIES: carry blood AWAY from heart → thick walls → no valves\n"
            "VEINS: carry blood BACK to heart → thinner walls → HAVE valves (to prevent backflow)"
        )

    # ── Node 2 answers ──
    def list_blood_functions(self) -> List[str]:
        return [f["function"] for f in self.kb.blood_functions]

    def explain_blood_function(self, index: int, context: str = "both") -> str:
        if 0 <= index < len(self.kb.blood_functions):
            f = self.kb.blood_functions[index]
            analogy = f["analogy_india"] if context == "india" else f["analogy_standard"]
            return f"{f['function']}. {f['detail']}. {analogy}."
        return "Invalid function index."

    def why_blood_important(self) -> str:
        return self.kb.blood_importance

    # ── Node 3 answers ──
    def list_circulation_steps(self) -> List[str]:
        return [s["action"] for s in self.kb.circulation_steps]

    def explain_circulation(self, context: str = "both") -> str:
        lines = ["CIRCULATION PROCESS:"]
        for s in self.kb.circulation_steps:
            lines.append(f"  {s['step']}. {s['action']} — {s['detail']}")
        lines.append(f"\nSUMMARY: {self.kb.circulation_summary}")
        return "\n".join(lines)

    # ── General Q&A ──
    def answer(self, question: str) -> str:
        q = question.lower().strip()

        if any(w in q for w in ["three organs", "main organs", "name the organs"]):
            return f"The three main organs are: {', '.join(self.list_organs())}."

        if "heart" in q and any(w in q for w in ["does", "function", "what"]):
            return self.describe_organ("heart")

        if "artery" in q or "arteries" in q:
            return self.describe_organ("arteries")

        if "vein" in q or "veins" in q:
            return self.describe_organ("veins")

        if "difference" in q and "artery" in q and "vein" in q:
            return self.compare_arteries_veins()

        if "blood" in q and any(w in q for w in ["function", "do", "does", "job"]):
            funcs = self.list_blood_functions()
            return "Blood has four main functions:\n" + "\n".join(f"  {i+1}. {f}" for i, f in enumerate(funcs))

        if "blood" in q and any(w in q for w in ["important", "why"]):
            return self.why_blood_important()

        if "circulat" in q or "process" in q or "blood flow" in q or "blood travel" in q:
            return self.explain_circulation()

        if "oxygen" in q and "blood" in q:
            return "Blood carries oxygen from the lungs to all body parts. Red blood cells pick up oxygen in the lungs and deliver it to every cell."

        if "nutrient" in q:
            return "Blood carries nutrients from digested food to body cells. After food is digested in the stomach and intestines, nutrients enter the blood."

        if "waste" in q or "wast" in q:
            return "Blood carries waste products (like carbon dioxide) away from cells to be removed by the lungs and kidneys."

        if "valve" in q:
            return "Veins have valves that prevent blood from flowing backwards. They act like one-way doors."

        return "I don't have enough information to answer that. Try asking about organs, blood functions, or the circulation process."

    def get_node_coverage(self, node_id: str) -> Dict:
        coverage = {
            "c5_bio_001": {
                "title": "Circulatory System Organs",
                "concepts": ["heart", "arteries", "veins"],
                "mastery_criteria": ["Name the three organs", "Describe heart function", "Differentiate arteries and veins"]
            },
            "c5_bio_002": {
                "title": "Functions of Blood",
                "concepts": ["oxygen transport", "nutrient transport", "waste removal", "disease fighting"],
                "mastery_criteria": ["List two functions", "Explain oxygen/nutrient transport", "Explain importance of blood"]
            },
            "c5_bio_003": {
                "title": "Process of Circulation",
                "concepts": ["heart pumping", "arteries", "veins", "lungs", "continuous cycle"],
                "mastery_criteria": ["Arrange steps in order", "Describe the cycle", "Explain the return path"]
            }
        }
        return coverage.get(node_id, {})


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class AnswerVerifier:
    """Verify student answers with detailed feedback."""

    def __init__(self):
        self.solver = BiologySolver()
        self.kb = self.solver.kb

    def check_mcq(self, question_id: str, selected: str) -> Dict:
        """Check MCQ answer."""
        answer_key = {
            "mcq_n1_q1": {"correct": "Heart",
                          "why": "The heart is a muscular organ that pumps blood continuously."},
            "mcq_n1_q2": {"correct": "Arteries",
                          "why": "Arteries carry blood AWAY from the heart and have thick walls."},
            "mcq_n1_q3": {"correct": "Veins",
                          "why": "Veins carry blood BACK to the heart and have valves to prevent backflow."},
            "mcq_n1_q4": {"correct": "Thick walls",
                          "why": "Arteries need thick walls to handle the high pressure of blood pumped by the heart."},
            "mcq_n2_q1": {"correct": "Digesting food in the stomach",
                          "why": "Blood does NOT digest food — that's the job of the digestive system."},
            "mcq_n2_q2": {"correct": "Oxygen",
                          "why": "Blood picks up oxygen in the lungs and carries it to all body parts."},
            "mcq_n2_q3": {"correct": "Carries nutrients to cells",
                          "why": "Blood transports nutrients from digested food to every cell."},
            "mcq_n3_q1": {"correct": "The heart",
                          "why": "The heart starts circulation by pumping blood out through arteries."},
            "mcq_n3_q2": {"correct": "Veins",
                          "why": "Veins carry used blood back to the heart after delivering oxygen and nutrients."},
        }

        entry = answer_key.get(question_id)
        if not entry:
            return {"correct": False, "feedback": "Unknown question ID."}

        is_correct = selected.strip().lower() == entry["correct"].lower()
        return {
            "correct": is_correct,
            "your_answer": selected,
            "correct_answer": entry["correct"],
            "feedback": f"✓ Correct!" if is_correct else f"✗ Incorrect. {entry['why']}"
        }

    def check_fill_blank(self, blank_text: str, correct_answer: str,
                         alternatives: List[str] = None) -> Dict:
        """Check fill-in-the-blank answer."""
        if alternatives is None:
            alternatives = [correct_answer]

        normalized = blank_text.strip().lower()
        is_correct = any(normalized == alt.lower() for alt in alternatives)

        feedback = f"✓ Correct!" if is_correct else (
            f"✗ Not quite. The correct answer is: {correct_answer}. "
            f"Hint: Think about what {correct_answer} does in the body."
        )
        return {
            "correct": is_correct,
            "your_answer": blank_text,
            "correct_answer": correct_answer,
            "alternatives": alternatives,
            "feedback": feedback
        }

    def check_true_false(self, statement: str, student_answer: str) -> Dict:
        """Check true/false answer."""
        tf_key = {
            "tf1": ("The heart is a muscular organ.", "True"),
            "tf2": ("Arteries carry blood away from the heart.", "True"),
            "tf3": ("Veins carry blood back to the heart.", "True"),
            "tf4": ("Veins have valves.", "True"),
            "tf5": ("Blood carries oxygen to body parts.", "True"),
            "tf6": ("Blood carries nutrients to cells.", "True"),
            "tf7": ("Blood carries waste products away.", "True"),
            "tf8": ("Platelets help blood clot.", "True"),
            "tf9": ("The circulation process is continuous.", "True"),
            "tf10": ("The heart pumps blood through arteries.", "True"),
            "tf11": ("Arteries carry blood back to the heart.", "False"),
            "tf12": ("Veins carry blood away from the heart.", "False"),
            "tf13": ("Arteries have valves.", "False"),
            "tf14": ("Blood digests food in the stomach.", "False"),
            "tf15": ("Blood does not carry oxygen.", "False"),
            "tf16": ("The heart rests most of the time.", "False"),
        }

        correct = "Unknown"
        for key, (stmt, val) in tf_key.items():
            if stmt.lower() == statement.lower().strip():
                correct = val
                break

        is_correct = student_answer.strip().lower() == correct.lower()
        return {
            "correct": is_correct,
            "your_answer": student_answer,
            "correct_answer": correct,
            "feedback": f"✓ Correct!" if is_correct else f"✗ Incorrect. The statement is {correct}."
        }

    def check_sequence(self, student_order: List[str], correct_order: List[str]) -> Dict:
        """Check sequence ordering."""
        if student_order == correct_order:
            return {
                "correct": True,
                "feedback": "✓ Perfect! You arranged the circulation steps correctly.",
                "correct_order": correct_order
            }

        first_wrong = -1
        for i in range(min(len(student_order), len(correct_order))):
            if student_order[i] != correct_order[i]:
                first_wrong = i
                break

        feedback = f"✗ Not quite right. Step {first_wrong + 1} is misplaced.\n"
        feedback += "Correct order:\n"
        for i, step in enumerate(correct_order, 1):
            feedback += f"  {i}. {step}\n"

        return {
            "correct": False,
            "feedback": feedback.strip(),
            "correct_order": correct_order,
            "first_error": first_wrong + 1
        }

    def check_short_answer(self, question: str, student_answer: str,
                           expected_keywords: List[str],
                           min_matches: int = 2) -> Dict:
        """Check short answer using keyword matching (lenient for Class 5)."""
        answer_lower = student_answer.lower()
        matched = [kw for kw in expected_keywords if kw.lower() in answer_lower]
        match_count = len(matched)
        is_correct = match_count >= min_matches

        missing = [kw for kw in expected_keywords if kw.lower() not in answer_lower]

        if is_correct:
            feedback = f"✓ Good answer! You covered the key points: {', '.join(matched)}."
            if missing:
                feedback += f" You could also mention: {', '.join(missing)}."
        else:
            feedback = (f"✗ Your answer needs more detail. "
                       f"Key points to include: {', '.join(expected_keywords[:3])}. "
                       f"You mentioned: {matched if matched else 'none of the key points yet'}.")

        return {
            "correct": is_correct,
            "feedback": feedback,
            "matched_keywords": matched,
            "missing_keywords": missing,
            "score": f"{match_count}/{len(expected_keywords)} keywords"
        }

    def check_matching(self, student_matches: Dict, correct_pairs: Dict) -> Dict:
        """Check column-matching type questions."""
        correct_count = 0
        wrong = []
        for item, matched in student_matches.items():
            if correct_pairs.get(item) == matched:
                correct_count += 1
            else:
                wrong.append(f"{item} → you said '{matched}', correct is '{correct_pairs[item]}'")

        total = len(correct_pairs)
        is_correct = correct_count == total
        return {
            "correct": is_correct,
            "score": f"{correct_count}/{total}",
            "feedback": f"✓ All correct!" if is_correct else f"✗ {len(wrong)} mismatch(es):\n" + "\n".join(wrong)
        }


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class StepExplainer:
    """Generate step-by-step explanations for any question type."""

    def __init__(self):
        self.solver = BiologySolver()

    def explain_organ_question(self, organ: str) -> List[str]:
        """Step-by-step explanation for organ identification."""
        return [
            f"STEP 1: Identify the organ asked about → {organ}",
            f"STEP 2: Recall what {organ} does → {self.solver.describe_organ(organ)}",
            f"STEP 3: Compare with other organs if needed → {self.solver.compare_arteries_veins() if organ in ['arteries', 'veins'] else 'Unique to the circulatory system'}",
            f"STEP 4: Give a real-life analogy → {'Water pump analogy' if organ == 'heart' else 'Road analogy'}",
            f"STEP 5: Confirm: {organ} is {'one of the three main organs' if organ in self.solver.list_organs() else 'related'} to the circulatory system."
        ]

    def explain_blood_function(self, function_index: int) -> List[str]:
        """Step-by-step for blood function questions."""
        f = self.solver.kb.blood_functions[function_index]
        return [
            f"STEP 1: Identify the function → {f['function']}",
            f"STEP 2: Understand HOW it works → {f['detail']}",
            f"STEP 3: Connect to the circulatory system → Blood travels through heart, arteries, veins",
            f"STEP 4: Real-life analogy → {f['analogy_india']}",
            f"STEP 5: Remember: Blood is the transport system of the body."
        ]

    def explain_circulation_process(self) -> List[str]:
        """Step-by-step for circulation process."""
        steps = []
        for s in self.solver.kb.circulation_steps:
            steps.append(f"STEP {s['step']}: {s['action']}")
            steps.append(f"         Detail: {s['detail']}")
        steps.append(f"FINAL: The cycle repeats — this is why the heart NEVER rests!")
        return steps

    def explain_comparison(self) -> List[str]:
        """Step-by-step for artery vs vein comparison."""
        return [
            "STEP 1: Identify what arteries do → Carry blood AWAY from the heart",
            "STEP 2: Identify artery features → THICK walls (high pressure), NO valves",
            "STEP 3: Identify what veins do → Carry blood BACK to the heart",
            "STEP 4: Identify vein features → Thinner walls, HAVE valves (prevent backflow)",
            "STEP 5: Memory tip: A comes before V → Arteries Away, Veins back (V comes home)"
        ]


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class ProgressTracker:
    """Track mastery across the 3 nodes."""

    def __init__(self):
        self.mastery = {
            "c5_bio_001": {"correct": 0, "total": 0, "skills": {"name_organs": False, "describe_heart": False, "diff_art_vein": False}},
            "c5_bio_002": {"correct": 0, "total": 0, "skills": {"list_functions": False, "explain_transport": False, "explain_importance": False}},
            "c5_bio_003": {"correct": 0, "total": 0, "skills": {"arrange_steps": False, "describe_cycle": False, "explain_return": False}}
        }

    def record_attempt(self, node_id: str, skill: str, correct: bool):
        if node_id in self.mastery:
            self.mastery[node_id]["total"] += 1
            if correct:
                self.mastery[node_id]["correct"] += 1
            if skill in self.mastery[node_id]["skills"]:
                if correct:
                    self.mastery[node_id]["skills"][skill] = True

    def get_mastery_report(self) -> str:
        lines = ["=" * 55]
        lines.append("       MASTERY REPORT - CLASS 5 BIOLOGY")
        lines.append("=" * 55)
        node_names = {
            "c5_bio_001": "1. Circulatory Organs",
            "c5_bio_002": "2. Functions of Blood",
            "c5_bio_003": "3. Process of Circulation"
        }
        for nid, data in self.mastery.items():
            pct = (data["correct"] / data["total"] * 100) if data["total"] > 0 else 0
            lines.append(f"\n{node_names[nid]}: {pct:.0f}% ({data['correct']}/{data['total']})")
            for skill, done in data["skills"].items():
                status = "✓" if done else "○"
                lines.append(f"  {status} {skill}")
        lines.append("\n" + "=" * 55)
        return "\n".join(lines)


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
def demo():
    solver = BiologySolver()
    verifier = AnswerVerifier()
    explainer = StepExplainer()
    tracker = ProgressTracker()

    print("=" * 60)
    print("  CLASS 5 BIOLOGY SOLVER DEMO")
    print("=" * 60)

    print("\n─── Q: What are the three main organs? ───")
    print(f"A: {solver.answer('What are the three main organs?')}")
    tracker.record_attempt("c5_bio_001", "name_organs", True)

    print("\n─── Q: What does the heart do? ───")
    print(f"A: {solver.answer('What does the heart do?')}")
    tracker.record_attempt("c5_bio_001", "describe_heart", True)

    print("\n─── Q: Difference between arteries and veins? ───")
    print(f"A: {solver.answer('How are arteries different from veins?')}")
    tracker.record_attempt("c5_bio_001", "diff_art_vein", True)

    print("\n─── Q: Functions of blood? ───")
    print(f"A: {solver.answer('What are the functions of blood?')}")
    tracker.record_attempt("c5_bio_002", "list_functions", True)

    print("\n─── Q: Why is blood important? ───")
    print(f"A: {solver.answer('Why is blood important?')}")
    tracker.record_attempt("c5_bio_002", "explain_importance", True)

    print("\n─── Q: Process of circulation? ───")
    print(solver.explain_circulation())
    tracker.record_attempt("c5_bio_003", "describe_cycle", True)

    print("\n─── VERIFICATION DEMO ───")
    print(verifier.check_mcq("mcq_n1_q2", "Arteries")["feedback"])
    print(verifier.check_fill_blank("heart", "heart")["feedback"])
    print(verifier.check_true_false("Arteries carry blood away from the heart.", "true")["feedback"])
    print(verifier.check_short_answer("Name three organs", "heart arteries veins",
                                       ["heart", "arteries", "veins"])["feedback"])

    seq_student = [
        "Blood returns to the heart through veins",
        "Heart pumps blood out through arteries",
        "Blood delivers oxygen and collects waste",
        "Heart pumps blood to lungs",
        "The cycle repeats"
    ]
    print(verifier.check_sequence(seq_student, [s["action"] for s in solver.kb.circulation_steps])["feedback"])

    print("\n─── STEP-BY-STEP: Artery vs Vein ───")
    for line in explainer.explain_comparison():
        print(line)

    print("\n" + tracker.get_mastery_report())


if __name__ == "__main__":
    demo()

# -- solver contract --------------------------------------------
def solve(node_id: str = "", params: dict | None = None, **kw):
    """Answer c5 bio questions via BiologySolver.answer()."""
    params = params or {}
    q = params.get("question") or params.get("q") or ""
    res = BiologySolver().answer(q)
    return res if isinstance(res, dict) else getattr(res, "__dict__", {"answer": str(res)})

def check_answer(question: str = "", user_answer: str = "", **kw):
    v = AnswerVerifier()
    fn = getattr(v, "check_short_answer", None) or getattr(v, "check_mcq")
    return fn(question, user_answer) if fn else {"ok": False}

SOLVER_REGISTRY = {"c5_bio_answer": solve, "c5_bio_check": check_answer}
NODE_MAP = {"c5_bio_001": "c5_bio_answer", "c5_bio_002": "c5_bio_answer", "c5_bio_003": "c5_bio_answer"}
