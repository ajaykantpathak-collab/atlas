"""
Solver for Class 2 Computer Studies (3 nodes)
Validates answers and provides step-by-step feedback for each node.
"""
import re
import random

# ─────────────────────────────────────────────
# Data Structures
# ─────────────────────────────────────────────
from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class SolverResult:
    correct: bool
    score: float          # 0.0 – 1.0
    feedback: str
    correct_answer: str
    explanation: str
    hints: List[str] = field(default_factory=list)

# ─────────────────────────────────────────────
# Node  c2_cs_001  Computer as an electronic device
# ─────────────────────────────────────────────
class C2CS001Solver:

    CHARACTERISTICS = {
        "speed":      "A computer is very fast; it can do millions of calculations in one second.",
        "accuracy":   "A computer is accurate; it does not make mistakes on its own.",
        "storage":    "A computer has large storage; it can store hundreds of pictures and files.",
        "diligence":  "A computer is diligent; it can repeat the same task again and again without getting tired.",
    }

    FUNCTIONS = {
        "input":      "Taking data or instructions from the user.",
        "processing": "Working on the data to produce useful information.",
        "output":     "Showing the result to the user.",
        "storage":    "Keeping data safe for later use.",
    }

    # ── Q1: Fill-in-the-blank ──
    def solve_q1(self, blank_answer: str) -> SolverResult:
        """
        'A computer is an electronic device because it runs on _______.'
        Correct answer: electricity
        """
        ans = blank_answer.strip().lower()
        correct_tokens = ["electricity", "power", "electric current", "current"]
        is_correct = ans in correct_tokens
        return SolverResult(
            correct=is_correct,
            score=1.0 if is_correct else 0.0,
            feedback="Correct! A computer needs electricity to work." if is_correct
                     else "Not quite. A computer needs electricity to run — just like a fan or a mixer.",
            correct_answer="electricity",
            explanation=(
                "A computer is called an electronic device because it runs on electricity. "
                "It stops working when the power goes off."
            ),
            hints=["Think of what makes a fan or a light bulb work."],
        )

    # ── Q2: Name two characteristics ──
    def solve_q2(self, char1: str, char2: str) -> SolverResult:
        """
        Accept any two valid characteristics from the set.
        """
        c1 = char1.strip().lower()
        c2 = char2.strip().lower()

        accepted = {
            "speed":      ["speed", "fast", "quick", "fastness"],
            "accuracy":   ["accuracy", "accurate", "correct", "correctness"],
            "storage":    ["storage", "stores", "memory", "store", "space"],
            "diligence":  ["diligence", "diligent", "hardworking", "tireless", "never tired"],
        }

        def match_category(token):
            for cat, synonyms in accepted.items():
                if token in synonyms:
                    return cat
            return None

        cat1 = match_category(c1)
        cat2 = match_category(c2)
        both_valid = cat1 is not None and cat2 is not None
        distinct = cat1 != cat2 if both_valid else False

        if both_valid and distinct:
            score = 1.0
            feedback = (
                f"Well done! '{cat1.title()}' and '{cat2.title()}' are both "
                f"characteristics of a computer."
            )
        elif both_valid and not distinct:
            score = 0.4
            feedback = f"You gave the same characteristic twice. Try naming two different ones."
        else:
            score = 0.0
            feedback = (
                "Those are not the standard characteristics. "
                "Remember: speed, accuracy, storage, diligence."
            )

        return SolverResult(
            correct=score == 1.0,
            score=score,
            feedback=feedback,
            correct_answer="Any two of: speed, accuracy, storage, diligence",
            explanation=(
                "The four main characteristics of a computer are:\n"
                "1. Speed – does millions of calculations per second.\n"
                "2. Accuracy – gives correct results every time.\n"
                "3. Storage – saves large amounts of data.\n"
                "4. Diligence – never gets tired of repeating a task."
            ),
            hints=["Think about what makes a computer better than a human at maths."],
        )

    # ── Q3: Match function to description ──
    def solve_q3(self, description_answer: str) -> SolverResult:
        """
        Example: 'Taking data from the user' → which function?
        """
        ans = description_answer.strip().lower()
        function_map = {
            "input":      ["input", "taking data", "entering data", "receiving data",
                           "entering", "feeding data"],
            "processing": ["processing", "working on data", "calculating", "computing"],
            "output":     ["output", "showing result", "displaying", "printing result"],
            "storage":    ["storage", "saving data", "keeping data", "storing"],
        }
        for func, tokens in function_map.items():
            if ans in tokens:
                return SolverResult(
                    correct=True,
                    score=1.0,
                    feedback=f"Correct! That describes the {func} function.",
                    correct_answer=func,
                    explanation=(
                        f"The {func} function means: {self.FUNCTIONS[func]} "
                        "This is one of the four main functions of a computer."
                    ),
                    hints=["The four functions are: input, processing, output, storage."],
                )
        return SolverResult(
            correct=False,
            score=0.0,
            feedback="Not the right function. Try again!",
            correct_answer="One of: input, processing, output, storage",
            explanation=(
                "A computer has four main functions:\n"
                "• Input  – receiving data\n"
                "• Processing – working on data\n"
                "• Output – showing results\n"
                "• Storage – saving data"
            ),
            hints=["Pick from: input, processing, output, storage."],
        )

    # ── Q4: Why is the computer called an electronic device? ──
    def solve_q4(self, answer: str) -> SolverResult:
        """
        Open-ended: expects keywords 'electricity' and 'stops' or similar.
        """
        ans = answer.strip().lower()
        has_electricity = bool(re.search(r'electr|power|current', ans))
        has_stops       = bool(re.search(r'stop|without|goes off|cut|fails', ans))
        has_electronic  = bool(re.search(r'electronic', ans))

        if has_electricity and (has_stops or has_electronic):
            score = 1.0
            feedback = "Excellent explanation!"
        elif has_electricity or has_stops:
            score = 0.5
            feedback = "Partially correct. Add more detail about electricity."
        else:
            score = 0.0
            feedback = "Not quite. Think about what makes a computer electronic."

        return SolverResult(
            correct=score == 1.0,
            score=score,
            feedback=feedback,
            correct_answer=(
                "It runs on electricity and stops working when the power goes off."
            ),
            explanation=(
                "A computer is called an electronic device because it needs electricity "
                "to work. When the power supply is cut, the computer stops — just like "
                "a fan or a mixer. This is the key feature of any electronic device."
            ),
            hints=["What does a fan need to work? A computer needs the same thing."],
        )


# ─────────────────────────────────────────────
# Node  c2_cs_002  Role of computers in daily life
# ─────────────────────────────────────────────
class C2CS002Solver:

    ROLES = ["education", "entertainment", "communication"]

    EXAMPLES = {
        "education":     ["video", "map", "rhyme", "lesson", "learn", "school"],
        "entertainment": ["game", "movie", "music", "fun", "play"],
        "communication": ["email", "call", "video call", "message", "talk", "send"],
    }

    # ── Q1: Name two roles ──
    def solve_q1(self, role1: str, role2: str) -> SolverResult:
        r1 = role1.strip().lower()
        r2 = role2.strip().lower()

        def match_role(token):
            mapping = {
                "education":     ["education", "learn", "learning", "school", "study"],
                "entertainment": ["entertainment", "games", "fun", "movies", "playing"],
                "communication": ["communication", "talk", "calling", "chat", "message"],
            }
            for role, syns in mapping.items():
                if token in syns:
                    return role
            return None

        cat1 = match_role(r1)
        cat2 = match_role(r2)
        both = cat1 is not None and cat2 is not None
        distinct = cat1 != cat2 if both else False

        if both and distinct:
            score = 1.0
            feedback = f"Correct! '{cat1.title()}' and '{cat2.title()}' are two main roles."
        elif both and not distinct:
            score = 0.4
            feedback = "You named the same role twice."
        else:
            score = 0.0
            feedback = "Those are not the main roles. Try: education, entertainment, communication."

        return SolverResult(
            correct=score == 1.0,
            score=score,
            feedback=feedback,
            correct_answer="Any two of: education, entertainment, communication",
            explanation=(
                "Computers play three main roles in our daily life:\n"
                "1. Education – helping us learn at school\n"
                "2. Entertainment – playing games and movies\n"
                "3. Communication – talking to people far away"
            ),
            hints=["Think about what you use a computer for at school and at home."],
        )

    # ── Q2: Give an example of computer use in education ──
    def solve_q2(self, example: str) -> SolverResult:
        ans = example.strip().lower()
        edu_keywords = ["video", "map", "rhyme", "lesson", "learn", "school",
                        "teach", "show", "display", "book", "project"]
        matched = any(kw in ans for kw in edu_keywords)

        return SolverResult(
            correct=matched,
            score=1.0 if matched else 0.0,
            feedback="Good example of computers in education!" if matched
                     else "That is not an example of education. Try again.",
            correct_answer="e.g. showing videos, displaying maps, playing rhymes",
            explanation=(
                "In education, computers help teachers by:\n"
                "• Showing videos of animals and places\n"
                "• Displaying maps on the screen\n"
                "• Playing rhymes and songs\n"
                "This makes lessons more interesting than a plain book."
            ),
            hints=["Think about what your teacher shows on a computer in class."],
        )

    # ── Q3: Which role does the example belong to? ──
    def solve_q3(self, example: str) -> SolverResult:
        ans = example.strip().lower()
        role_scores = {}
        for role, keywords in self.EXAMPLES.items():
            count = sum(1 for kw in keywords if kw in ans)
            if count:
                role_scores[role] = count

        if role_scores:
            best_role = max(role_scores, key=role_scores.get)
            return SolverResult(
                correct=True,
                score=1.0,
                feedback=f"Correct — that belongs to '{best_role.title()}'!",
                correct_answer=best_role,
                explanation=f"This example falls under {best_role.title()}.",
                hints=["Pick from: education, entertainment, communication."],
            )
        return SolverResult(
            correct=False,
            score=0.0,
            feedback="Not clear which role that is.",
            correct_answer="education / entertainment / communication",
            explanation="Classify the example into one of the three roles.",
            hints=["Does it help you learn, have fun, or talk to someone?"],
        )

    # ── Q4: Computer as a postman / teacher analogy ──
    def solve_q4(self, role_answer: str) -> SolverResult:
        ans = role_answer.strip().lower()
        # Expected: teacher → education; postman → communication; friend → entertainment, etc.
        analogy_map = {
            "education":     ["teacher", "teach", "school", "classroom", "learn"],
            "communication": ["postman", "mail", "letter", "messenger", "phone"],
            "entertainment": ["friend", "play", "game", "fun"],
        }
        for role, keywords in analogy_map.items():
            if any(kw in ans for kw in keywords):
                return SolverResult(
                    correct=True,
                    score=1.0,
                    feedback=f"Correct! The computer is like a {keywords[0].title()} for {role}.",
                    correct_answer=role,
                    explanation=(
                        f"A computer is like a {keywords[0].title()} when it helps with {role}. "
                        "Analogies help us understand how computers assist us."
                    ),
                    hints=["Think: who helps you learn? Who helps you send messages?"],
                )
        return SolverResult(
            correct=False,
            score=0.0,
            feedback="That analogy doesn't fit well. Think about who delivers messages or teaches.",
            correct_answer="teacher → education, postman → communication",
            explanation="Analogy: computer = teacher (education), postman (communication).",
            hints=["A postman delivers letters — computers deliver messages."],
        )


# ─────────────────────────────────────────────
# Node  c2_cs_003  Input devices
# ─────────────────────────────────────────────
class C2CS003Solver:

    DEVICES = {
        "keyboard": {
            "function": "Types text and gives commands to the computer.",
            "keywords": ["keyboard", "type", "text", "keys", "typing", "command"],
            "analogy":  "Like a typewriter; you press keys to enter letters.",
        },
        "mouse": {
            "function": "Points to items on the screen and clicks to select them.",
            "keywords": ["mouse", "point", "click", "pointer", "cursor"],
            "analogy":  "Like your finger pointing at something on the screen.",
        },
        "scanner": {
            "function": "Converts a physical picture or document into a digital image.",
            "keywords": ["scanner", "scan", "picture", "photo", "document", "image"],
            "analogy":  "Like a photocopier that saves the image in the computer.",
        },
        "microphone": {
            "function": "Records or sends sound into the computer.",
            "keywords": ["microphone", "mic", "sound", "record", "voice", "speak",
                         "audio", "sing"],
            "analogy":  "Like your ear — both take in sound.",
        },
        "webcam": {
            "function": "Captures live video or takes pictures.",
            "keywords": ["webcam", "camera", "video", "film", "capture", "live",
                         "picture"],
            "analogy":  "Like a small camera attached to the computer.",
        },
    }

    def _match_device(self, answer: str):
        ans = answer.strip().lower()
        for device, data in self.DEVICES.items():
            if any(kw in ans for kw in data["keywords"]):
                return device, data
        return None, None

    # ── Q1: What does this device do? (match description) ──
    def solve_q1(self, description: str) -> SolverResult:
        device, data = self._match_device(description)
        if device:
            return SolverResult(
                correct=True,
                score=1.0,
                feedback=f"Yes! That describes the {device}.",
                correct_answer=device,
                explanation=f"{device.title()}: {data['function']}",
                hints=["Think about what keyboard, mouse, scanner, microphone, and webcam do."],
            )
        return SolverResult(
            correct=False,
            score=0.0,
            feedback="That does not match any of the five input devices.",
            correct_answer="keyboard / mouse / scanner / microphone / webcam",
            explanation="Each input device has a specific job — match the description carefully.",
            hints=["Which device helps you type? Which one records sound?"],
        )

    # ── Q2: Identify the device from its name ──
    def solve_q2(self, device_name: str) -> SolverResult:
        name = device_name.strip().lower()
        if name in self.DEVICES:
            data = self.DEVICES[name]
            return SolverResult(
                correct=True,
                score=1.0,
                feedback=f"Correct! A {name} is used to {data['function'].lower()}",
                correct_answer=name,
                explanation=f"{name.title()}: {data['function']}",
                hints=[],
            )
        return SolverResult(
            correct=False,
            score=0.0,
            feedback=f"'{device_name}' is not one of the five input devices.",
            correct_answer="keyboard / mouse / scanner / microphone / webcam",
            explanation="The five input devices are: keyboard, mouse, scanner, microphone, webcam.",
            hints=["Check the spelling of the device name."],
        )

    # ── Q3: Which device captures live video? ──
    def solve_q3(self, device_answer: str) -> SolverResult:
        ans = device_answer.strip().lower()
        if "webcam" in ans or "camera" in ans:
            return SolverResult(
                correct=True,
                score=1.0,
                feedback="Correct! A webcam captures live video.",
                correct_answer="webcam",
                explanation="A webcam is a small camera attached to the computer. It captures live video.",
                hints=["Think of a camera that connects to your computer."],
            )
        return SolverResult(
            correct=False,
            score=0.0,
            feedback="Not quite. Which device works like a small camera?",
            correct_answer="webcam",
            explanation="A webcam is the input device that captures live video.",
            hints=["It rhymes with 'cam' and is short for 'web camera'."],
        )

    # ── Q4: Why is a microphone called an input device? ──
    def solve_q4(self, answer: str) -> SolverResult:
        ans = answer.strip().lower()
        has_input    = bool(re.search(r'input|enter|give|send|put', ans))
        has_computer = bool(re.search(r'comput|machine', ans))
        has_sound    = bool(re.search(r'sound|voice|audio|speak|record', ans))

        if (has_input or has_sound) and has_computer:
            score = 1.0
            feedback = "Correct! A microphone sends sound into the computer."
        elif has_sound:
            score = 0.5
            feedback = "Partially correct. Mention that it sends sound to the computer."
        else:
            score = 0.0
            feedback = "Not quite. Think about what a microphone does and where the sound goes."

        return SolverResult(
            correct=score == 1.0,
            score=score,
            feedback=feedback,
            correct_answer=(
                "A microphone is an input device because it sends/records sound "
                "into the computer."
            ),
            explanation=(
                "An input device is anything that sends data INTO the computer. "
                "A microphone records or sends sound into the computer, so it is an input device."
            ),
            hints=["An input device gives data TO the computer. What does a mic give?"],
        )


# ─────────────────────────────────────────────
# Unified Solver Dispatcher
# ─────────────────────────────────────────────
SOLVER_MAP = {
    "c2_cs_001": C2CS001Solver(),
    "c2_cs_002": C2CS002Solver(),
    "c2_cs_003": C2CS003Solver(),
}


def solve(node_id: str, question_type: str, *args) -> SolverResult:
    """
    Universal solve entry-point.
    Usage:
        solve("c2_cs_001", "q1", "electricity")
        solve("c2_cs_002", "q2", "video")
        solve("c2_cs_003", "q3", "webcam")
    """
    solver = SOLVER_MAP.get(node_id)
    if solver is None:
        return SolverResult(
            correct=False, score=0.0,
            feedback=f"No solver for node '{node_id}'.",
            correct_answer="", explanation="",
        )
    method = getattr(solver, f"solve_{question_type}", None)
    if method is None:
        return SolverResult(
            correct=False, score=0.0,
            feedback=f"No method '{question_type}' for node '{node_id}'.",
            correct_answer="", explanation="",
        )
    return method(*args)


# ─────────────────────────────────────────────
# Verification / Smoke Test
# ─────────────────────────────────────────────
def _smoke_test():
    print("=" * 60)
    print("CS Class-2 Solver — Smoke Test")
    print("=" * 60)

    tests = [
        # Node 001
        ("c2_cs_001", "q1", "electricity"),
        ("c2_cs_001", "q1", "water"),          # wrong
        ("c2_cs_001", "q2", "speed", "accuracy"),
        ("c2_cs_001", "q2", "speed", "speed"),  # duplicate
        ("c2_cs_001", "q3", "taking data from the user"),
        ("c2_cs_001", "q3", "cooking"),          # wrong
        ("c2_cs_001", "q4", "it runs on electricity and stops without power"),
        # Node 002
        ("c2_cs_002", "q1", "education", "entertainment"),
        ("c2_cs_002", "q1", "fun", "games"),     # both → entertainment (same category)
        ("c2_cs_002", "q2", "showing videos of animals in class"),
        ("c2_cs_002", "q3", "playing games on the computer"),
        ("c2_cs_002", "q4", "postman"),
        # Node 003
        ("c2_cs_003", "q1", "It types text on the screen"),
        ("c2_cs_003", "q1", "It bakes bread"),    # wrong
        ("c2_cs_003", "q2", "keyboard"),
        ("c2_cs_003", "q2", "screen"),            # wrong
        ("c2_cs_003", "q3", "webcam"),
        ("c2_cs_003", "q3", "mic"),
        ("c2_cs_003", "q4", "It sends sound into the computer"),
    ]

    passed = 0
    for t in tests:
        node_id, qtype, *args = t
        result = solve(node_id, qtype, *args)
        status = "✓" if result.correct else "✗"
        print(f"  {status} [{node_id}.{qtype}] args={args} → "
              f"{'CORRECT' if result.correct else 'WRONG'}  "
              f"(score={result.score})")
        if not result.correct:
            print(f"      feedback : {result.feedback}")
        passed += int(result.correct)

    print(f"\n  Passed: {passed}/{len(tests)}")
    print("=" * 60)


if __name__ == "__main__":
    _smoke_test()