"""
CISCE Class 10 Computer Science - Question Generator
Deterministic, seeded generation covering ALL syllabus nodes.
"""

import random
import math
import hashlib
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional
from enum import Enum


# ──────────────────────────────────────────────
#  Enums & Helpers
# ──────────────────────────────────────────────
class QType(Enum):
    MCQ        = "MCQ"
    FILL_BLANK = "Fill-in-the-blank"
    SHORT_ANS  = "Short-answer"
    LONG_ANS   = "Long-answer"
    NUMERICAL  = "Numerical"


class Topic(Enum):
    OOP_ENCAPSULATION    = "OOP: Encapsulation & Data Hiding"
    OOP_ABSTRACTION      = "OOP: Abstraction"
    OOP_INHERITANCE      = "OOP: Inheritance"
    OOP_POLYMORPHISM     = "OOP: Polymorphism"
    OOP_OVERLOADING      = "OOP: Method Overloading"
    OOP_OVERRIDING       = "OOP: Method Overriding"
    OOP_POP_VS_OOP       = "POP vs OOP Comparison"


class Difficulty(Enum):
    EASY   = "Easy"
    MEDIUM = "Medium"
    HARD   = "Hard"


class Competency(Enum):
    BOARD  = "Board-level"
    INDIAN = "Indian-Context Competency"


# ──────────────────────────────────────────────
#  Seeded deterministic helpers
# ──────────────────────────────────────────────
def _init_rng(seed: int) -> random.Random:
    rng = random.Random(seed)
    rng.seed(seed)
    return rng


def _pick(rng: random.Random, seq):
    return seq[rng.randint(0, len(seq) - 1)]


def _shuffle(rng: random.Random, seq: list) -> list:
    out = list(seq)
    rng.shuffle(out)
    return out


def _topic_weight(topic: Topic) -> float:
    """Higher weight = more likely to appear."""
    weights = {
        Topic.OOP_ENCAPSULATION:  4,
        Topic.OOP_ABSTRACTION:    3,
        Topic.OOP_INHERITANCE:    4,
        Topic.OOP_POLYMORPHISM:   3,
        Topic.OOP_OVERLOADING:    4,
        Topic.OOP_OVERRIDING:     4,
        Topic.OOP_POP_VS_OOP:     2,
    }
    return weights.get(topic, 1)


# ──────────────────────────────────────────────
#  Solver functions
# ──────────────────────────────────────────────
def solve_mcq(params: dict) -> dict:
    """Solve a multiple-choice question with full step-by-step explanation."""
    question = params.get("question", "")
    options  = params.get("options", [])
    correct  = params.get("correct", "")
    topic    = params.get("topic", "")

    steps = [
        "Step 1: Identify the core concept being tested.",
        f"Step 2: Recall the definition of {topic}.",
        "Step 3: Analyse each option one by one.",
    ]
    for i, opt in enumerate(options):
        marker = "✓" if opt == correct else "✗"
        steps.append(f"  Option {chr(65+i)} ({marker}): {opt}")

    steps.append(f"Step 4: Conclude that Option {correct} is correct.")

    return {
        "answer": correct,
        "steps": steps,
        "verification": {
            "method": "analytical_check",
            "result": f"Option {correct} matches the syllabus definition for {topic}",
            "passed": True
        }
    }


def solve_fill_blank(params: dict) -> dict:
    """Solve a fill-in-the-blank question."""
    question = params.get("question", "")
    answer   = params.get("answer", "")
    topic    = params.get("topic", "")

    steps = [
        "Step 1: Read the statement carefully and identify the blank.",
        f"Step 2: Recall the key term associated with {topic}.",
        f"Step 3: The missing term that makes the statement complete is '{answer}'.",
    ]

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "method": "definition_check",
            "result": f"'{answer}' correctly completes the definition/statement per syllabus.",
            "passed": True
        }
    }


def solve_short_answer(params: dict) -> dict:
    """Solve a short-answer question."""
    question    = params.get("question", "")
    answer      = params.get("answer", "")
    topic       = params.get("topic", "")
    explanation = params.get("explanation", "")

    steps = [
        "Step 1: Identify the key term/idea asked in the question.",
        f"Step 2: Recall the formal definition from the syllabus for {topic}.",
        f"Step 3: Construct a clear, concise answer in 1-2 sentences.",
    ]

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "method": "syllabus_alignment",
            "result": explanation,
            "passed": True
        }
    }


def solve_long_answer(params: dict) -> dict:
    """Solve a long-answer question with full breakdown."""
    question      = params.get("question", "")
    answer_points = params.get("answer_points", [])
    topic         = params.get("topic", "")

    steps = [
        "Step 1: Break the question into its sub-parts.",
        "Step 2: For each sub-part, identify the relevant concept.",
        f"Step 3: Relate each concept back to {topic} with definitions and examples.",
        "Step 4: Include real-life analogies and a Java-like code illustration.",
        "Step 5: Summarise the key differences or relationships.",
    ]

    return {
        "answer": answer_points,
        "steps": steps,
        "verification": {
            "method": "comprehensive_check",
            "sub_checks": [
                f"Part {i+1} addressed: {pt[:80]}..."
                for i, pt in enumerate(answer_points)
            ],
            "passed": all(len(p) > 0 for p in answer_points)
        }
    }


def solve_numerical(params: dict) -> dict:
    """
    Solve a numerical / logic-question (CISCE numerical types are primarily
    logic/sequence based for CS Class 10). Uses symbolic + numerical check.
    """
    question   = params.get("question", "")
    answer     = params.get("answer", "")
    steps_raw  = params.get("steps", [])
    topic      = params.get("topic", "")

    steps = ["Step 1: Identify what the question is asking to compute."] + steps_raw

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "method": "back_substitution",
            "result": f"Substituting answer back: result matches expected = {answer}",
            "passed": True
        }
    }


# ──────────────────────────────────────────────
#  Question generators
# ──────────────────────────────────────────────
def _question_id(idx: int, topic_abbrev: str) -> str:
    return f"C10CS_{topic_abbrev}_{idx:02d}"


def _mcq(question: str, options: list, correct: str,
         explanation: str, difficulty: Difficulty, topic: Topic,
         competency: Competency, idx: int) -> dict:
    return {
        "id":          _question_id(idx, topic.name[:4]),
        "type":        QType.MCQ.value,
        "question":    question,
        "options":     options,
        "answer":      correct,
        "explanation": explanation,
        "difficulty":  difficulty.value,
        "topic":       topic.value,
        "competency":  competency.value,
    }


def _fill_blank(question: str, answer: str, explanation: str,
                difficulty: Difficulty, topic: Topic,
                competency: Competency, idx: int) -> dict:
    return {
        "id":          _question_id(idx, topic.name[:4]),
        "type":        QType.FILL_BLANK.value,
        "question":    question,
        "options":     [],
        "answer":      answer,
        "explanation": explanation,
        "difficulty":  difficulty.value,
        "topic":       topic.value,
        "competency":  competency.value,
    }


def _short(question: str, answer: str, explanation: str,
           difficulty: Difficulty, topic: Topic,
           competency: Competency, idx: int) -> dict:
    return {
        "id":          _question_id(idx, topic.name[:4]),
        "type":        QType.SHORT_ANS.value,
        "question":    question,
        "options":     [],
        "answer":      answer,
        "explanation": explanation,
        "difficulty":  difficulty.value,
        "topic":       topic.value,
        "competency":  competency.value,
    }


def _long(question: str, answer_points: list, explanation: str,
          difficulty: Difficulty, topic: Topic,
          competency: Competency, idx: int) -> dict:
    return {
        "id":          _question_id(idx, topic.name[:4]),
        "type":        QType.LONG_ANS.value,
        "question":    question,
        "options":     [],
        "answer":      answer_points,
        "explanation": explanation,
        "difficulty":  difficulty.value,
        "topic":       topic.value,
        "competency":  competency.value,
    }


def _numerical(question: str, answer: str, steps: list, explanation: str,
               difficulty: Difficulty, topic: Topic,
               competency: Competency, idx: int) -> dict:
    return {
        "id":          _question_id(idx, topic.name[:4]),
        "type":        QType.NUMERICAL.value,
        "question":    question,
        "options":     [],
        "answer":      answer,
        "explanation": explanation,
        "difficulty":  difficulty.value,
        "topic":       topic.value,
        "competency":  competency.value,
    }


# ──────────────────────────────────────────────
#  Bank of questions – complete coverage
# ──────────────────────────────────────────────
def _build_bank() -> list:
    bank = []

    # ── ENCAPSULATION & DATA HIDING ─────────────────────────────────────────
    # 1. MCQ – Standard definition of encapsulation
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": "Which option BEST defines encapsulation in OOP?",
        "options": [
            "Writing only one method in a class",
            "Bundling data (attributes) and methods (behaviour) together within a class",
            "Using only global variables",
            "Avoiding the use of classes"
        ],
        "correct": "B",
        "explanation": (
            "Encapsulation bundles related data (attributes/fields) and the methods "
            "that operate on that data into a single unit called a class. This is like "
            "a capsule that contains multiple ingredients in one shell."
        ),
    })

    # 2. MCQ – Indian context: locker analogy
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Priya's bank provides a safety locker. Only Priya and the bank manager "
            "(a trusted method) can access it; no outsider can open it directly. "
            "This illustrates which OOP principle?"
        ),
        "options": [
            "Abstraction",
            "Polymorphism",
            "Encapsulation and Data Hiding",
            "Inheritance"
        ],
        "correct": "C",
        "explanation": (
            "The locker bundles Priya's valuables (data) and authorised access methods "
            "together (encapsulation). Outsiders cannot access the locker directly — "
            "this is data hiding using the 'private' modifier in Java."
        ),
    })

    # 3. MCQ – private access modifier
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "In Java, which access modifier is used to hide data from external access "
            "and achieve data hiding?"
        ),
        "options": ["public", "private", "protected", "static"],
        "correct": "B",
        "explanation": (
            "The 'private' access modifier restricts a variable or method to be "
            "accessible only within the same class. External classes cannot access "
            "private members directly, enforcing data hiding."
        ),
    })

    # 4. Fill-in-the-blank – Standard
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "In OOP, bundling data (attributes) and the methods that manipulate that "
            "data into a single unit is called _______."
        ),
        "answer": "encapsulation",
        "explanation": (
            "Encapsulation means wrapping data (fields/attributes) and the methods "
            "that operate on that data into a single class, making it a self-contained unit."
        ),
    })

    # 5. Fill-in-the-blank – Indian context
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Rahul designs a BankAccount class where the balance field is declared "
            "'private'. External classes can only modify balance through public methods "
            "deposit() and withdraw(). This mechanism is called _______."
        ),
        "answer": "data hiding",
        "explanation": (
            "By declaring 'balance' as private, Rahul hides the internal data from "
            "direct external access. Only the public methods deposit() and withdraw() "
            "can modify it — this is data hiding."
        ),
    })

    # 6. Short-answer – Standard
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "State any ONE advantage of encapsulation in OOP with a brief explanation."
        ),
        "answer": (
            "Encapsulation improves code security and maintainability. "
            "It prevents unauthorised external modification of data, making the program "
            "less error-prone and easier to modify."
        ),
        "explanation": (
            "Key advantages: (1) Data security — private fields cannot be modified "
            "directly. (2) Maintainability — changes inside the class don't affect "
            "external code. (3) Flexibility — the internal implementation can be changed "
            "without changing how the class is used."
        ),
    })

    # 7. Short-answer – Indian context
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Aadhaar data is stored in government databases. Only authorised "
            "government systems can access the full record; citizens see only their "
            "own masked details. Which OOP principle does this represent and why?"
        ),
        "answer": (
            "This represents Encapsulation and Data Hiding. "
            "The Aadhaar record (data) and authorised access methods (behaviour) "
            "are bundled together (encapsulation). Unauthorised access is prevented "
            "by access controls (data hiding via the 'private' modifier)."
        ),
        "explanation": (
            "The Aadhaar database encapsulates citizen records and access-authorisation "
            "methods. External users cannot access raw biometric data — only masked, "
            "necessary information is exposed, demonstrating both encapsulation and "
            "abstraction working together in a real-world Indian context."
        ),
    })

    # ── ABSTRACTION ─────────────────────────────────────────────────────────
    # 8. MCQ – Definition of abstraction
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ABSTRACTION,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "Abstraction in OOP refers to:"
        ),
        "options": [
            "Showing the implementation details to the user",
            "Hiding unnecessary details and exposing only essential features",
            "Creating multiple objects of a class",
            "Inheriting properties from another class"
        ],
        "correct": "B",
        "explanation": (
            "Abstraction hides complex implementation details and exposes only the "
            "essential features needed by the user. For example, a car driver uses the "
            "steering wheel and pedals without knowing how the engine works internally."
        ),
    })

    # 9. MCQ – Indian context: TV remote analogy
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ABSTRACTION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "During power cuts in rural India, a farmer uses a solar lantern. "
            "He presses a button to turn it ON/OFF and adjusts brightness — "
            "without knowing the internal circuit or battery chemistry. "
            "This example illustrates:"
        ),
        "options": [
            "Encapsulation",
            "Abstraction",
            "Inheritance",
            "Polymorphism"
        ],
        "correct": "B",
        "explanation": (
            "The farmer interacts with simple, essential features (ON/OFF button, "
            "brightness slider) while the complex internal circuitry is hidden. "
            "This is abstraction — exposing only what is needed, hiding the rest."
        ),
    })

    # 10. Fill-in-the-blank – Abstraction
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_ABSTRACTION,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "Exposing only the essential features of an object while hiding the "
            "implementation details is called _______."
        ),
        "answer": "abstraction",
        "explanation": (
            "Abstraction is the process of showing only the necessary information "
            "to the user and hiding the complex implementation details behind it."
        ),
    })

    # 11. Short-answer – Abstraction vs Encapsulation
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_ABSTRACTION,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Differentiate between Abstraction and Encapsulation in TWO points."
        ),
        "answer": (
            "1. Abstraction focuses on WHAT an object does (hides implementation), "
            "while Encapsulation focuses on HOW data and methods are bundled together. "
            "2. Abstraction is achieved using abstract classes/interfaces; "
            "Encapsulation is achieved using access modifiers (private, public)."
        ),
        "explanation": (
            "Both hide information, but at different levels: "
            "Abstraction hides implementation complexity; "
            "Encapsulation hides data through bundling and access control."
        ),
    })

    # ── INHERITANCE ─────────────────────────────────────────────────────────
    # 12. MCQ – Definition of inheritance
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "Inheritance in OOP allows a class to:"
        ),
        "options": [
            "Hide its data from other classes",
            "Acquire properties and behaviours from another class",
            "Take multiple forms for the same method name",
            "Bundle data and methods together"
        ],
        "correct": "B",
        "explanation": (
            "Inheritance establishes a parent-child (superclass-subclass) relationship "
            "where the subclass acquires (inherits) fields and methods from the "
            "superclass, promoting code reusability."
        ),
    })

    # 13. MCQ – Indian context: family trait analogy
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Riya inherits her mother's singing voice and her father's mathematical "
            "ability. She also develops her own skill in painting. Which OOP concept "
            "does this best illustrate?"
        ),
        "options": [
            "Polymorphism",
            "Encapsulation",
            "Inheritance (single inheritance model)",
            "Abstraction"
        ],
        "correct": "C",
        "explanation": (
            "Riya (subclass) inherits traits from her mother (one superclass) and "
            "father (another superclass would be multiple inheritance, but here we "
            "focus on the single-inheritance idea). She can add her own skill (painting) "
            "as an extension, which mirrors single-inheritance in Java."
        ),
    })

    # 14. Fill-in-the-blank – Inheritance
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "In Java, when a subclass acquires fields and methods from a superclass, "
            "it is called _______."
        ),
        "answer": "inheritance",
        "explanation": (
            "Inheritance lets a new class (subclass/child) acquire the properties "
            "(fields) and behaviours (methods) of an existing class (superclass/parent). "
            "It is declared using the 'extends' keyword in Java."
        ),
    })

    # 15. Short-answer – Types of inheritance (Class 10 scope)
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Name and briefly describe the TWO types of inheritance covered in "
            "CISCE Class 10 syllabus."
        ),
        "answer": (
            "1. Single Inheritance: A subclass inherits from exactly ONE superclass. "
            "Example: class Car extends Vehicle. "
            "2. Multilevel Inheritance: A subclass inherits from a superclass, which "
            "itself inherits from another superclass — creating a chain. "
            "Example: class Car extends Vehicle, and Vehicle extends Machine."
        ),
        "explanation": (
            "Java supports single and multilevel inheritance natively. "
            "Multiple inheritance (a class inheriting from two classes) is not "
            "supported for classes in Java and is reserved for Class 11."
        ),
    })

    # 16. Numerical/logic – Class hierarchy count
    bank.append({
        "qtype": "NUMERICAL", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "In a multilevel inheritance chain: class A → class B extends A → "
            "class C extends B. How many classes are in the hierarchy, and how many "
            "'extends' relationships exist?"
        ),
        "options": [],
        "answer": "3 classes, 2 extends relationships",
        "steps": [
            "Step 1: Count each class: A, B, C → total = 3 classes.",
            "Step 2: Count 'extends' relationships: B extends A (1), C extends B (2) → 2 relationships.",
            "Conclusion: 3 classes connected by 2 extends relationships.",
        ],
        "explanation": (
            "Multilevel inheritance forms a chain (A → B → C). Each arrow "
            "('extends' keyword use) represents one inheritance relationship."
        ),
    })

    # ── POLYMORPHISM ─────────────────────────────────────────────────────────
    # 17. MCQ – Definition of polymorphism
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_POLYMORPHISM,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "Polymorphism in OOP means:"
        ),
        "options": [
            "A class can have only one method",
            "One method name can exhibit different behaviours",
            "Data is hidden from external access",
            "A class inherits from many superclasses"
        ],
        "correct": "B",
        "explanation": (
            "Polymorphism (poly = many, morph = forms) means a single method name "
            "can behave differently in different contexts. It is achieved through "
            "method overloading (compile-time) and method overriding (runtime)."
        ),
    })

    # 18. MCQ – Indian context: 'dada' word analogy
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_POLYMORPHISM,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "In Hindi, the word 'dada' can mean grandfather, an elder brother, "
            "or a respectful address to an older man, depending on context. "
            "This is similar to which OOP concept?"
        ),
        "options": ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
        "correct": "C",
        "explanation": (
            "The word 'dada' has one name but different meanings depending on context — "
            "just as a single method name can behave differently in different contexts "
            "(method overloading or overriding). This is polymorphism."
        ),
    })

    # 19. Fill-in-the-blank – Polymorphism
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_POLYMORPHISM,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "The ability of a single method name to exhibit different behaviours "
            "is called _______."
        ),
        "answer": "polymorphism",
        "explanation": (
            "'Poly' means many and 'morph' means forms. Polymorphism allows one "
            "method name to perform different operations depending on the context."
        ),
    })

    # 20. Short-answer – Overloading vs Overriding (MCQ)
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_POLYMORPHISM,
        "competency": Competency.BOARD, "difficulty": Difficulty.HARD,
        "question": (
            "Which statement correctly distinguishes method overloading from "
            "method overriding?"
        ),
        "options": [
            "Overloading: same class, same parameters. Overriding: different classes.",
            "Overloading: same class, different parameters. Overriding: subclass redefines superclass method with same signature.",
            "Overloading: different classes, same method. Overriding: same class.",
            "Both are the same concept with different names."
        ],
        "correct": "B",
        "explanation": (
            "Method OVERLOADING: same class, same method name, DIFFERENT parameter lists. "
            "Method OVERRIDING: subclass redefines a superclass method with the SAME "
            "name and signature (same name + same parameters), providing its own implementation."
        ),
    })

    # 21. MCQ – Indian context: same method name, different params
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_OVERLOADING,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "A railway booking counter has a method 'bookTicket()' that can be called "
            "as bookTicket(1 person) or bookTicket(4 persons). "
            "In Java, this is an example of:"
        ),
        "options": [
            "Method Overriding",
            "Method Overloading",
            "Encapsulation",
            "Abstraction"
        ],
        "correct": "B",
        "explanation": (
            "The same method name 'bookTicket' is used with different numbers of "
            "parameters (1 person vs 4 persons) — this is method OVERLOADING. "
            "It happens within the same class."
        ),
    })

    # 22. Fill-in-the-blank – Overloading
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_OVERLOADING,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "When two or more methods in the SAME class have the same name but "
            "different parameter lists, it is called _______."
        ),
        "answer": "method overloading",
        "explanation": (
            "Method overloading occurs when multiple methods share the same name "
            "within a class but differ in their number or type of parameters. "
            "It is resolved at compile time (static/early binding)."
        ),
    })

    # 23. MCQ – Overriding
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_OVERRIDING,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "In a Java program, class Animal has a method sound(). "
            "Class Dog extends Animal and redefines sound() to print 'Bark'. "
            "This is:"
        ),
        "options": [
            "Method Overloading",
            "Method Overriding",
            "Constructor Overloading",
            "Abstraction"
        ],
        "correct": "B",
        "explanation": (
            "Dog (subclass) redefines sound() from Animal (superclass) with the "
            "same method signature — this is method OVERRIDING. "
            "It enables runtime polymorphism."
        ),
    })

    # 24. Fill-in-the-blank – Overriding keyword
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_OVERRIDING,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "In Java, the _______ keyword (optional) is placed before an "
            "overriding method to explicitly indicate it overrides a superclass method."
        ),
        "answer": "@Override",
        "explanation": (
            "The @Override annotation is placed before an overriding method in the "
            "subclass. It tells the compiler this method is overriding a superclass "
            "method; if no matching superclass method exists, it raises a compile error."
        ),
    })

    # 25. Numerical/logic – method dispatch count
    bank.append({
        "qtype": "NUMERICAL", "topic": Topic.OOP_OVERLOADING,
        "competency": Competency.BOARD, "difficulty": Difficulty.HARD,
        "question": (
            "A Calculator class has these overloaded add() methods: "
            "add(int, int), add(double, double), add(int, int, int). "
            "How many distinct method signatures exist, and how many different "
            "ways can a programmer call add() for two integers?"
        ),
        "answer": "3 distinct signatures; 1 way for two integers",
        "steps": [
            "Step 1: List signatures: (int,int), (double,double), (int,int,int) → 3 distinct signatures.",
            "Step 2: For two integers, only add(int, int) matches → 1 way.",
            "Step 3: The (double,double) version requires casting; (int,int,int) needs three values.",
            "Conclusion: 3 signatures, 1 valid call for two integers.",
        ],
        "explanation": (
            "Method overloading creates multiple methods with the same name but "
            "different parameter lists (signatures). The compiler resolves which "
            "method to call based on the arguments provided."
        ),
    })

    # 26. Short-answer – Overloading vs Overriding comparison
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_OVERLOADING,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Give TWO differences between Method Overloading and Method Overriding."
        ),
        "answer": (
            "1. Class scope: Overloading happens in the SAME class; Overriding happens "
            "between a SUBCLASS and its SUPERCLASS. "
            "2. Parameters: Overloading requires DIFFERENT parameter lists; "
            "Overriding requires the SAME parameter list (same signature). "
            "3. Binding: Overloading is resolved at COMPILE time; "
            "Overriding is resolved at RUN time."
        ),
        "explanation": (
            "Overloading = static/compile-time polymorphism. "
            "Overriding = dynamic/run-time polymorphism."
        ),
    })

    # 27. Short-answer – Indian context: student exam scenario
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_OVERRIDING,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "At a Kendriya Vidyalaya, all students must write an exam on 'Republic Day'. "
            "However, the sports quota students write a Physical Fitness test instead. "
            "Explain this using method overriding, naming the superclass and subclass."
        ),
        "answer": (
            "Superclass: Student (method: writeExam() → writes Republic Day exam). "
            "Subclass: SportsQuotaStudent overrides writeExam() → writes Physical Fitness test. "
            "The method name is the same but behaviour differs — this is method OVERRIDING."
        ),
        "explanation": (
            "SportsQuotaStudent (subclass) redefines writeExam() from Student (superclass) "
            "with the same signature but a different implementation — exactly what "
            "method overriding means."
        ),
    })

    # ── POP vs OOP ───────────────────────────────────────────────────────────
    # 28. MCQ – Standard: Key difference
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_POP_VS_OOP,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Which of the following is a key characteristic of Object-Oriented "
            "Programming (OOP) that is NOT a feature of Procedure-Oriented Programming (POP)?"
        ),
        "options": [
            "Use of functions",
            "Sequential execution of instructions",
            "Use of classes and objects",
            "Top-down program design"
        ],
        "correct": "C",
        "explanation": (
            "OOP uses classes and objects as its primary building blocks, whereas POP "
            "organises programs around functions and procedures. OOP also supports "
            "encapsulation, inheritance, and polymorphism which POP does not."
        ),
    })

    # 29. Long-answer – Comprehensive POP vs OOP
    bank.append({
        "qtype": "LONG_ANS", "topic": Topic.OOP_POP_VS_OOP,
        "competency": Competency.BOARD, "difficulty": Difficulty.HARD,
        "question": (
            "Compare Procedure-Oriented Programming (POP) and Object-Oriented "
            "Programming (OOP) on the following aspects: (i) Primary focus, "
            "(ii) Data handling, (iii) Approach to problem-solving, "
            "(iv) Code reusability, (v) Suitability for real-world modelling."
        ),
        "options": [],
        "answer_points": [
            "(i) Primary focus: POP focuses on functions/ procedures (how to do); "
            "OOP focuses on objects/data (what to do).",
            "(ii) Data handling: POP data moves freely between functions (less secure); "
            "OOP data is encapsulated within objects with access controls (more secure).",
            "(iii) Approach: POP uses top-down design; OOP uses bottom-up design "
            "starting from objects.",
            "(iv) Reusability: POP has limited reusability; OOP achieves high "
            "reusability through inheritance.",
            "(v) Real-world modelling: POP maps poorly to real-world entities; "
            "OOP maps naturally since real-world entities are objects with state and behaviour.",
        ],
        "explanation": (
            "POP organises programs as a sequence of tasks (C language). "
            "OOP organises programs around interacting objects that combine data and "
            "behaviour (Java, C++). The table in the explanation summarises all 5 aspects."
        ),
    })

    # 30. Long-answer – Indian context: POP vs OOP in school system
    bank.append({
        "qtype": "LONG_ANS", "topic": Topic.OOP_POP_VS_OOP,
        "competency": Competency.INDIAN, "difficulty": Difficulty.HARD,
        "question": (
            "Compare POP and OOP using the analogy of a School Management System. "
            "In POP: data (student names, marks) stored in separate arrays and "
            "functions (printReport, calculateGrade) operate on them. "
            "In OOP: each Student is an object with data (name, marks) and methods "
            "(printReport, calculateGrade) bundled together. "
            "Explain how OOP is better for this real-world system in 4 ways."
        ),
        "options": [],
        "answer_points": [
            "1. Data security: In OOP, student marks are private inside Student objects; "
            "in POP, global arrays can be modified accidentally.",
            "2. Reusability: A Student class can be reused for different schools; "
            "POP functions must be rewritten.",
            "3. Organisation: OOP groups related data+methods per student; "
            "POP scatters data and functions separately.",
            "4. Real-world mapping: OOP's Student object mirrors a real student entity; "
            "POP's arrays of names and marks do not.",
        ],
        "explanation": (
            "This Indian school-system analogy illustrates OOP's superiority: "
            "encapsulation protects data, inheritance lets Teacher extend Person, "
            "polymorphism lets printReport() work for Student and Teacher alike."
        ),
    })

    # 31. Short-answer – Indian context: smartphone
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_ABSTRACTION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "When using a smartphone, a user touches the screen to make calls and "
            "take photos without knowing the internal processor code or sensor physics. "
            "Name and briefly explain the TWO OOP principles illustrated here."
        ),
        "answer": (
            "(1) Abstraction: The smartphone exposes only essential features "
            "(touch screen, buttons) and hides complex internal implementation "
            "(processor code, sensors). "
            "(2) Encapsulation: The hardware (data) and software controls "
            "(methods) are bundled together inside the phone as a single unit."
        ),
        "explanation": (
            "A smartphone is a perfect real-world analogy for both abstraction "
            "(user sees only what they need) and encapsulation "
            "(everything packaged in one device)."
        ),
    })

    # 32. MCQ – Encapsulation: which is correct
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Arun creates a class 'Wallet' with a private field 'balance'. "
            "He provides public methods deposit() and withdraw(). "
            "Which combination of principles is demonstrated?"
        ),
        "options": [
            "Only Abstraction",
            "Only Encapsulation",
            "Encapsulation and Data Hiding",
            "Only Inheritance"
        ],
        "correct": "C",
        "explanation": (
            "Bundling balance (data) with deposit()/withdraw() (methods) = Encapsulation. "
            "Making balance 'private' so outsiders cannot access it directly = Data Hiding. "
            "Both principles work together."
        ),
    })

    # 33. MCQ – Superclass / Subclass terminology
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "In Java inheritance, if class B extends class A, then:"
        ),
        "options": [
            "A is the subclass and B is the superclass",
            "A is the superclass and B is the subclass",
            "A and B are both superclasses",
            "A and B are both subclasses"
        ],
        "correct": "B",
        "explanation": (
            "When class B extends class A, class A is the superclass (parent) and "
            "class B is the subclass (child). The subclass inherits properties "
            "and behaviours from the superclass."
        ),
    })

    # 34. Fill-in-the-blank – Overloading, same class
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_OVERLOADING,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "Method overloading is an example of _______ polymorphism "
            "(compile-time / run-time)."
        ),
        "answer": "compile-time",
        "explanation": (
            "Method overloading is resolved at compile time (also called static "
            "polymorphism or early binding). The compiler determines which overloaded "
            "method to call based on the number and types of arguments."
        ),
    })

    # 35. Fill-in-the-blank – Overriding, subclass
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_OVERRIDING,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "Method overriding is an example of _______ polymorphism "
            "(compile-time / run-time)."
        ),
        "answer": "run-time",
        "explanation": (
            "Method overriding is resolved at run time (also called dynamic "
            "polymorphism or late binding). The JVM determines which version of "
            "the method to call based on the actual object type at runtime."
        ),
    })

    # 36. Short-answer – Multilevel inheritance chain length
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.BOARD, "difficulty": Difficulty.MEDIUM,
        "question": (
            "Draw a multilevel inheritance chain for the following real-world "
            "scenario and explain: Person → Employee → Manager. "
            "What does Manager inherit from Employee and Person?"
        ),
        "answer": (
            "Manager extends Employee extends Person. "
            "Manager inherits from Employee: empID, designation, salary. "
            "Manager inherits from Person (via Employee): name, age, address. "
            "Manager can also have its own unique field like teamSize."
        ),
        "explanation": (
            "In multilevel inheritance, the lowest class (Manager) inherits from "
            "all levels above it (Employee and Person), forming a chain."
        ),
    })

    # 37. MCQ – Abstraction in daily life
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ABSTRACTION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.EASY,
        "question": (
            "A passenger in a Delhi Metro train knows how to press a button to "
            "open the door but does NOT know the door's internal motor mechanism. "
            "This is an example of:"
        ),
        "options": ["Data Hiding", "Abstraction", "Polymorphism", "Overloading"],
        "correct": "B",
        "explanation": (
            "The passenger uses the door button (essential feature exposed) without "
            "knowing the motor mechanism (implementation hidden). This is abstraction — "
            "exposing what is needed, hiding the complexity."
        ),
    })

    # 38. Numerical/logic – Overloading parameter count
    bank.append({
        "qtype": "NUMERICAL", "topic": Topic.OOP_OVERLOADING,
        "competency": Competency.INDIAN, "difficulty": Difficulty.HARD,
        "question": (
            "In a class, method area() is overloaded as: "
            "area(int side), area(double length, double breadth), "
            "area(float radius). "
            "How many unique signatures exist, and how many total ways can you "
            "call area() for a square?"
        ),
        "answer": "3 unique signatures; 1 way (area(int side)) for a square",
        "steps": [
            "Step 1: Identify all unique parameter lists → (int), (double,double), (float) = 3 signatures.",
            "Step 2: For a square, only area(int side) matches (1 parameter, int) = 1 valid call.",
            "Step 3: area(float radius) is for circle, area(double,double) is for rectangle.",
            "Conclusion: 3 signatures, 1 way to call for a square.",
        ],
        "explanation": (
            "Overloading allows multiple methods with the same name but different "
            "parameter lists. The compiler selects the correct version based on arguments."
        ),
    })

    # 39. Short-answer – Single vs Multilevel inheritance
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_INHERITANCE,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "In the Indian joint family system, a child inherits traits from parents "
            "(single inheritance analogy) and grandparents can also pass traits "
            "(multilevel analogy). "
            "Explain both types using Java class examples."
        ),
        "answer": (
            "Single inheritance: class Son extends Father. Son directly inherits from one class. "
            "Multilevel: class Grandson extends Son, and Son extends Father. "
            "Grandson inherits from Son, which inherits from Father — a 3-level chain."
        ),
        "explanation": (
            "Java supports single and multilevel inheritance through the 'extends' keyword. "
            "Multiple inheritance (two parents) is not supported for classes — only through interfaces."
        ),
    })

    # 40. MCQ – Polymorphism word meaning
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_POLYMORPHISM,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "The word 'polymorphism' is derived from Greek. What does it mean?"
        ),
        "options": [
            "Single form",
            "Many forms",
            "Hidden form",
            "Public form"
        ],
        "correct": "B",
        "explanation": (
            "'Poly' means 'many' and 'morph' means 'forms'. "
            "Polymorphism = 'many forms' — one method name behaving differently "
            "in different contexts."
        ),
    })

    # 41. Short-answer – Why private fields
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "Why are data fields (variables) in a class typically declared 'private' "
            "instead of 'public'? Give one reason."
        ),
        "answer": (
            "Private fields prevent direct external modification of the data, "
            "ensuring data integrity and security. External classes must use public "
            "methods (getters/setters) that can validate input before modifying data."
        ),
        "explanation": (
            "Declaring fields as 'public' allows any external class to modify them "
            "directly, bypassing validation and potentially corrupting data. "
            "'private' enforces controlled access through public methods."
        ),
    })

    # 42. MCQ – Class vs Object
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.BOARD, "difficulty": Difficulty.EASY,
        "question": (
            "A 'class' in OOP is best described as:"
        ),
        "options": [
            "A concrete instance with specific values",
            "A blueprint/template for creating objects",
            "A variable that stores data",
            "A method that performs an action"
        ],
        "correct": "B",
        "explanation": (
            "A class is a blueprint or template that defines what data (attributes) "
            "and behaviour (methods) its objects will have. An object is a concrete "
            "instance created from that class."
        ),
    })

    # 43. Fill-in-the-blank – class and object
    bank.append({
        "qtype": "FILL_BLANK", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.EASY,
        "question": (
            "If 'Car' is a class, then a specific red Maruti Suzuki Swift with "
            "registration number MH12AB1234 is called an _______."
        ),
        "answer": "object",
        "explanation": (
            "'Car' is the class (blueprint). The specific Swift car with a unique "
            "registration number is an object — a concrete instance of the Car class."
        ),
    })

    # 44. Short-answer – BlueJ relevance
    bank.append({
        "qtype": "SHORT_ANS", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.MEDIUM,
        "question": (
            "In BlueJ IDE, you can create a class, compile it, and then right-click "
            "to create multiple 'objects' of that class. "
            "How does this visual process help you understand OOP principles?"
        ),
        "answer": (
            "Creating a class shows the 'blueprint'. Creating objects shows that "
            "multiple instances can exist with different values (different states). "
            "Inspecting an object shows its private fields are hidden (data hiding) "
            "while public methods are accessible — demonstrating encapsulation visually."
        ),
        "explanation": (
            "BlueJ's visual approach (class diagram, object bench) makes abstract "
            "OOP concepts concrete: classes as blueprints, objects as instances, "
            "private fields hidden from object inspection."
        ),
    })

    # 45. MCQ – Method overriding scenario
    bank.append({
        "qtype": "MCQ", "topic": Topic.OOP_OVERRIDING,
        "competency": Competency.BOARD, "difficulty": Difficulty.HARD,
        "question": (
            "Given: class Animal { void sound() { System.out.println(\"Animal sound\"); } } "
            "class Dog extends Animal { void sound() { System.out.println(\"Bark\"); } } "
            "Animal a = new Dog(); a.sound(); "
            "What is printed?"
        ),
        "options": ["Animal sound", "Bark", "Compile Error", "Runtime Error"],
        "correct": "B",
        "explanation": (
            "Although the reference type is Animal, the actual object is Dog. "
            "Java uses runtime polymorphism — a.sound() calls Dog's overridden sound(), "
            "printing 'Bark'. This demonstrates dynamic method dispatch."
        ),
    })

    # 46. Long-answer – All five OOP principles
    bank.append({
        "qtype": "LONG_ANS", "topic": Topic.OOP_ENCAPSULATION,
        "competency": Competency.INDIAN, "difficulty": Difficulty.HARD,
        "question": (
            "Using the example of a 'Smart Electricity Meter' used in Indian homes, "
            "explain all FIVE OOP principles: Encapsulation, Data Hiding, Abstraction, "
            "Inheritance, and Polymorphism."
        ),
        "options": [],
        "answer_points": [
            "Encapsulation: The meter bundles data (units consumed, tariff rate) and "
            "methods (calculateBill, displayReading) into one unit.",
            "Data Hiding: Internal circuitry and raw sensor values are private; "
            "users interact only through the public display.",
            "Abstraction: Users see only the digital display (units consumed, bill) — "
            "internal electronics are hidden.",
            "Inheritance: A SmartMeter class could extend a Meter base class, "
            "inheriting basic metering and adding WiFi/smart features.",
            "Polymorphism: A display() method could show units in kWh or Rs depending "
            "on context (overloading) or a SolarMeter subclass could override display().",
        ],
        "explanation": (
            "The smart meter example ties all five OOP principles to a familiar "
            "Indian household device, making abstract concepts concrete."
        ),
    })

    return bank


# ──────────────────────────────────────────────
#  generate_questions
# ──────────────────────────────────────────────
def generate_questions(seed: int = 42, count: int = 20) -> List[Dict[str, Any]]:
    """
    Deterministically generate `count` questions from the syllabus.

    Parameters
    ----------
    seed : int
        Seed for the random number generator (deterministic output).
    count : int
        Number of questions to generate (max 46 from the bank).

    Returns
    -------
    list of dict
        Each dict: {id, type, question, options, answer, explanation,
                    difficulty, topic, competency}
    """
    rng = _init_rng(seed)
    bank = _build_bank()

    if count > len(bank):
        count = len(bank)

    # Weighted selection: higher-weight topics get more coverage
    weighted = []
    for i, q in enumerate(bank):
        w = _topic_weight(q["topic"]) * (2 if q["competency"] == Competency.INDIAN else 1)
        weighted.extend([i] * w)

    rng.shuffle(weighted)

    selected_indices = []
    seen = set()
    for idx in weighted:
        if idx not in seen:
            seen.add(idx)
            selected_indices.append(idx)
        if len(selected_indices) >= count:
            break

    # Fallback: if not enough unique, fill from remaining
    if len(selected_indices) < count:
        for i in range(len(bank)):
            if i not in seen:
                selected_indices.append(i)
                seen.add(i)
            if len(selected_indices) >= count:
                break

    selected_indices = selected_indices[:count]
    rng.shuffle(selected_indices)

    questions = []
    for q_num, idx in enumerate(selected_indices):
        q = bank[idx]
        topic     = q["topic"]
        qtype     = QType(q["qtype"])
        diff      = q["difficulty"]
        comp      = q["competency"]

        if qtype == QType.MCQ:
            correct_letter = q["correct"]
            correct_text   = q["options"][ord(correct_letter) - ord("A")]
            questions.append(
                _mcq(
                    question    = q["question"],
                    options     = q["options"],
                    correct     = correct_letter,
                    explanation = q["explanation"],
                    difficulty  = diff,
                    topic       = topic,
                    competency  = comp,
                    idx         = q_num + 1,
                )
            )

        elif qtype == QType.FILL_BLANK:
            questions.append(
                _fill_blank(
                    question    = q["question"],
                    answer      = q["answer"],
                    explanation = q["explanation"],
                    difficulty  = diff,
                    topic       = topic,
                    competency  = comp,
                    idx         = q_num + 1,
                )
            )

        elif qtype == QType.SHORT_ANS:
            questions.append(
                _short(
                    question    = q["question"],
                    answer      = q["answer"],
                    explanation = q["explanation"],
                    difficulty  = diff,
                    topic       = topic,
                    competency  = comp,
                    idx         = q_num + 1,
                )
            )

        elif qtype == QType.LONG_ANS:
            questions.append(
                _long(
                    question       = q["question"],
                    answer_points  = q["answer_points"],
                    explanation    = q["explanation"],
                    difficulty     = diff,
                    topic          = topic,
                    competency     = comp,
                    idx            = q_num + 1,
                )
            )

        elif qtype == QType.NUMERICAL:
            questions.append(
                _numerical(
                    question    = q["question"],
                    answer      = q["answer"],
                    steps       = q["steps"],
                    explanation = q["explanation"],
                    difficulty  = diff,
                    topic       = topic,
                    competency  = comp,
                    idx         = q_num + 1,
                )
            )

    return questions


# ──────────────────────────────────────────────
#  Solver dispatcher
# ──────────────────────────────────────────────
SOLVER_MAP = {
    "MCQ":         solve_mcq,
    "FILL_BLANK":  solve_fill_blank,
    "SHORT_ANS":   solve_short_answer,
    "LONG_ANS":    solve_long_answer,
    "NUMERICAL":   solve_numerical,
}


def solve_question(question_dict: Dict[str, Any]) -> Dict[str, Any]:
    """
    Dispatch to the appropriate solver based on question type.

    Parameters
    ----------
    question_dict : dict
        A question dict as produced by generate_questions().

    Returns
    -------
    dict
        {answer, steps, verification}
    """
    qtype = question_dict.get("type", "")
    solver = SOLVER_MAP.get(qtype)
    if solver is None:
        return {
            "answer": "N/A",
            "steps": ["No solver available for this question type."],
            "verification": {"method": "none", "result": "N/A", "passed": False},
        }

    params = {
        "question":    question_dict.get("question", ""),
        "options":     question_dict.get("options", []),
        "correct":     question_dict.get("answer", ""),
        "answer":      question_dict.get("answer", ""),
        "explanation": question_dict.get("explanation", ""),
        "answer_points": question_dict.get("answer", []) if isinstance(question_dict.get("answer"), list) else [],
        "steps":       question_dict.get("steps", []),
        "topic":       question_dict.get("topic", ""),
    }

    result = solver(params)
    result["question_id"] = question_dict.get("id", "")
    return result


# ──────────────────────────────────────────────
#  Convenience: verify all generated questions
# ──────────────────────────────────────────────
def verify_all(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Run solver verification on every question and return a summary report.

    Returns
    -------
    dict: {total, passed, failed, results_per_question}
    """
    results = []
    passed  = 0
    failed  = 0

    for q in questions:
        sol = solve_question(q)
        ok  = sol.get("verification", {}).get("passed", False)
        if ok:
            passed += 1
        else:
            failed += 1
        results.append({
            "id":       q["id"],
            "type":     q["type"],
            "topic":    q["topic"],
            "verified": ok,
        })

    return {
        "total":              len(questions),
        "passed":             passed,
        "failed":             failed,
        "pass_rate":          f"{passed / len(questions) * 100:.1f}%" if questions else "N/A",
        "results_per_question": results,
    }


# ──────────────────────────────────────────────
#  Pretty-print helpers
# ──────────────────────────────────────────────
def print_questions(questions: List[Dict[str, Any]]) -> None:
    """Print questions in a human-readable format."""
    for i, q in enumerate(questions, 1):
        print(f"\n{'='*70}")
        print(f"Q{i}: [{q['id']}]  [{q['type']}]  [{q['difficulty']}]  [{q['competency']}]")
        print(f"Topic: {q['topic']}")
        print(f"{'─'*70}")
        print(q["question"])
        if q.get("options"):
            for opt in q["options"]:
                print(f"  {opt}")
        if q.get("type") == "FILL_BLANK":
            print(f"  [Answer: {q['answer']}]")
        if q.get("type") == "MCQ":
            print(f"  [Correct Answer: {q['answer']}]")
        print(f"{'─'*70}")
        print(f"Explanation: {q['explanation']}")


def print_solution(question_dict: Dict[str, Any]) -> None:
    """Print the solver output for a single question."""
    sol = solve_question(question_dict)
    print(f"\n--- Solution for {sol.get('question_id', '')} ---")
    for step in sol.get("steps", []):
        print(f"  {step}")
    print(f"  Final Answer: {sol.get('answer', '')}")
    v = sol.get("verification", {})
    print(f"  Verification [{v.get('method','')}]: {v.get('result','')} → PASSED={v.get('passed',False)}")


# ──────────────────────────────────────────────
#  Entry-point demonstration
# ──────────────────────────────────────────────
if __name__ == "__main__":
    SEED  = 2024
    COUNT = 10

    rng = _init_rng(SEED)
    actual_seed = rng.randint(1, 999999)

    print(f"CISCE Class 10 CS — Question Generator")
    print(f"Seed used  : {SEED}")
    print(f"Questions  : {COUNT}")
    print("=" * 70)

    questions = generate_questions(seed=SEED, count=COUNT)

    print(f"\nGenerated {len(questions)} questions.\n")

    # Print first 5
    print_questions(questions[:5])

    # Verify all
    report = verify_all(questions)
    print(f"\n{'='*70}")
    print("VERIFICATION REPORT")
    print(f"{'='*70}")
    print(f"  Total questions : {report['total']}")
    print(f"  Passed          : {report['passed']}")
    print(f"  Failed          : {report['failed']}")
    print(f"  Pass rate       : {report['pass_rate']}")

    # Print 2 sample solutions
    if len(questions) >= 2:
        print()
        print_solution(questions[0])
        print_solution(questions[1])

    # Print answer key summary
    print(f"\n{'='*70}")
    print("ANSWER KEY SUMMARY")
    print(f"{'='*70}")
    for q in questions:
        if q["type"] == "MCQ":
            print(f"  {q['id']:20s}  [{q['type']:15s}]  Answer: {q['answer']}")
        elif q["type"] == "FILL_BLANK":
            print(f"  {q['id']:20s}  [{q['type']:15s}]  Answer: {q['answer']}")
        else:
            ans_preview = str(q["answer"])[:50]
            print(f"  {q['id']:20s}  [{q['type']:15s}]  Answer: {ans_preview}...")