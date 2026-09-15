"""
ICSE Class 10 Computer Science Solver
======================================
Nodes:
  c10_cs_001 — OOP principles: encapsulation, data hiding, abstraction
  c10_cs_002 — OOP principles: inheritance and polymorphism (intro)

Each solution follows ICSE board marking-scheme format:
  Step 1 – Understanding the question
  Step 2 – Recalling the concept definition
  Step 3 – Applying to the specific case / giving example
  Step 4 – Presenting the complete answer
  Step 5 – Verification (when a user answer is supplied)
"""

from __future__ import annotations
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Tuple, Any
import re
import difflib


# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

KB_001: Dict[str, Any] = {
    "encapsulation": {
        "definition": (
            "Encapsulation is an Object-Oriented Programming principle that "
            "bundles data (attributes / variables) and methods (behaviour / "
            "functions) together within a single unit called a class. It wraps "
            "the data and the methods that operate on that data into one "
            "package, protecting the data from direct outside access."
        ),
        "examples": {
            "indian": (
                "A medicine capsule — the powder (data) is sealed inside an "
                "outer shell (class). The shell protects the medicine and "
                "delivers it to the right place, just like a class protects "
                "its data through its methods."
            ),
            "standard": (
                "A smartphone — it bundles hardware components (data) and "
                "software features (methods) into a single device. The user "
                "interacts through the screen interface without touching "
                "internal circuits."
            ),
        },
        "keywords": [
            "bundling", "bundle", "data", "methods", "class", "single unit",
            "together", "attributes", "behaviour", "wraps", "protects",
            "package",
        ],
        "marking_points": [
            "Bundles data and methods together in a class",
            "Protects data from direct outside access",
            "Acts as a single cohesive unit",
            "Real-life example given",
        ],
    },
    "data_hiding": {
        "definition": (
            "Data hiding is the mechanism of restricting direct access to the "
            "internal data (variables) of a class from outside code. It is "
            "achieved using the private access modifier, which makes data "
            "members accessible only within the same class. Other classes or "
            "objects cannot directly access or modify private data; they must "
            "use public methods (getters and setters) provided by the class."
        ),
        "examples": {
            "indian": (
                "A diary with a lock — the pages (data) are hidden behind a "
                "lock. Only the owner who has the key (public methods) can "
                "access the contents. Others cannot read or write directly."
            ),
            "standard": (
                "A locked ATM machine — the cash inside (private data) is not "
                "accessible directly. Users interact through the keypad and "
                "screen (public interface), and the machine controls access."
            ),
        },
        "keywords": [
            "restricting", "private", "external access", "modifier",
            "outside", "direct", "accessible", "within the class",
            "getter", "setter",
        ],
        "marking_points": [
            "Restricts external access to internal data",
            "Achieved using 'private' access modifier",
            "Data accessible only within the same class",
            "Public methods provide controlled access",
            "Real-life example given",
        ],
    },
    "abstraction": {
        "definition": (
            "Abstraction is an Object-Oriented Programming principle that "
            "exposes only the essential features of an object to the user and "
            "hides the complex implementation details. The user knows WHAT an "
            "object does but not HOW it does it. This reduces complexity and "
            "makes the system easier to use and maintain."
        ),
        "examples": {
            "indian": (
                "A car dashboard — the dashboard shows essential controls "
                "(steering wheel, accelerator, brake, indicators) that the "
                "driver needs. The complex internal mechanisms (engine, "
                "transmission, wiring) are hidden. The driver drives without "
                "knowing how the engine works."
            ),
            "standard": (
                "A TV remote — it shows buttons for essential functions "
                "(power, volume, channel). The complex circuitry, signal "
                "processing, and communication with the TV are hidden. The "
                "user simply presses a button."
            ),
        },
        "keywords": [
            "essential features", "exposing", "hiding", "implementation",
            "details", "what it does", "not how", "complexity",
        ],
        "marking_points": [
            "Exposes only essential features to the user",
            "Hides complex implementation details",
            "User knows 'what' but not 'how'",
            "Real-life example given",
        ],
    },
    "oop_general": {
        "definition": (
            "Object-Oriented Programming (OOP) is a programming paradigm based "
            "on the concept of 'objects' that contain data (attributes) and "
            "code (methods). Objects encapsulate state (attributes) and have "
            "behaviour (methods). The five main principles are: Encapsulation, "
            "Data Hiding, Abstraction, Inheritance, and Polymorphism."
        ),
        "keywords": [
            "objects", "data", "methods", "attributes", "behaviour",
            "principles", "state",
        ],
    },
    "pop_vs_oop": {
        "pop": {
            "name": "Procedure-Oriented Programming (POP)",
            "points": [
                "Program is divided into small functions",
                "Follows a top-down approach in program design",
                "Data is openly shared among functions",
                "No data security — data can be modified freely",
                "No concept of inheritance, polymorphism, or abstraction",
                "Examples: C, Pascal, FORTRAN",
            ],
        },
        "oop": {
            "name": "Object-Oriented Programming (OOP)",
            "points": [
                "Program is divided into objects containing data + methods",
                "Follows a bottom-up approach in program design",
                "Data is hidden and accessed through methods only",
                "Data security through private / public modifiers",
                "Supports encapsulation, data hiding, abstraction, inheritance, polymorphism",
                "Examples: Java, Python, C++",
            ],
        },
        "keywords": [
            "functions", "objects", "top-down", "bottom-up",
            "data security", "inheritance", "shared", "hidden",
        ],
        "marking_points": [
            "POP focuses on functions; OOP focuses on data and objects",
            "POP uses top-down; OOP uses bottom-up approach",
            "Data openly shared in POP; hidden in OOP",
            "OOP provides data security; POP does not",
            "OOP supports inheritance and polymorphism; POP does not",
        ],
    },
}

KB_002: Dict[str, Any] = {
    "inheritance": {
        "definition": (
            "Inheritance is an Object-Oriented Programming principle where a "
            "new class (called the subclass / child class) acquires the fields "
            "(data members) and methods (member functions) of an existing "
            "class (called the superclass / parent class). It establishes an "
            "IS-A relationship. The subclass can add new features or modify "
            "inherited ones. The 'extends' keyword is used in Java."
        ),
        "examples": {
            "indian": (
                "A child inheriting traits (eye colour, hair colour, height) "
                "from parents. The child (subclass) gets properties from the "
                "parents (superclass) and may also have unique traits."
            ),
            "standard": (
                "A SUV inheriting features from a basic Car (wheels, engine, "
                "steering) and adding new ones (GPS, sunroof, alloy wheels). "
                "The SUV IS-A Car with extra features."
            ),
        },
        "types": [
            (
                "Single Inheritance",
                "One subclass inherits from exactly one superclass.\n"
                "  Example: class B extends class A",
            ),
            (
                "Multilevel Inheritance",
                "A class inherits from a superclass, which inherits from "
                "another superclass.\n"
                "  Example: class C extends class B; class B extends class A  (A → B → C)",
            ),
            (
                "Hierarchical Inheritance",
                "Multiple subclasses inherit from one superclass.\n"
                "  Example: class B extends A; class C extends A",
            ),
        ],
        "keywords": [
            "subclass", "superclass", "parent", "child", "acquiring",
            "inherits", "properties", "methods", "extends", "IS-A",
        ],
        "marking_points": [
            "Subclass acquires fields and methods from superclass",
            "Establishes parent-child (IS-A) relationship",
            "'extends' keyword used in Java",
            "Real-life example given",
        ],
    },
    "polymorphism": {
        "definition": (
            "Polymorphism means 'many forms'. It is an OOP principle where a "
            "single method name can exhibit different behaviours depending on "
            "the context. One interface, multiple implementations. In Java, "
            "polymorphism is achieved through method overloading (compile-time) "
            "and method overriding (runtime)."
        ),
        "examples": {
            "indian": (
                "The word 'principal' has different meanings in different "
                "contexts: in a school it means the head, in mathematics it "
                "means the original sum of money. Same word, different meanings "
                "based on context."
            ),
            "standard": (
                "The '+' operator: 2 + 3 = 5 (addition), but 'hello' + 'world' "
                "= 'helloworld' (concatenation). Same operator, different "
                "behaviour in different contexts."
            ),
        },
        "keywords": [
            "many forms", "one name", "different behaviour", "same method",
            "overloading", "overriding", "compile-time", "runtime",
        ],
        "marking_points": [
            "One method name, different behaviours",
            "Achieved through overloading and overriding",
            "Overloading = compile-time polymorphism",
            "Overriding = runtime polymorphism",
            "Real-life example given",
        ],
    },
    "method_overloading": {
        "definition": (
            "Method overloading is a Java feature where a class contains "
            "multiple methods with the SAME name but DIFFERENT parameters "
            "(different number of parameters, or different types, or different "
            "order of parameter types). All overloaded methods must reside in "
            "the SAME class. It is resolved at compile time (compile-time "
            "polymorphism). The return type alone cannot distinguish overloaded "
            "methods."
        ),
        "code_example": (
            "class Calculator {\n"
            "    int add(int a, int b)           { return a + b; }\n"
            "    int add(int a, int b, int c)     { return a + b + c; }\n"
            "    double add(double a, double b)   { return a + b; }\n"
            "}\n"
            "→ Three 'add' methods: same name, same class, different parameters."
        ),
        "keywords": [
            "same name", "same class", "different parameters", "compile time",
            "overloading",
        ],
        "marking_points": [
            "Same method name in the same class",
            "Different parameter list (number / type / order)",
            "Compile-time polymorphism",
            "No inheritance required",
        ],
    },
    "method_overriding": {
        "definition": (
            "Method overriding is a Java feature where a subclass provides its "
            "own implementation of a method already defined in its superclass. "
            "The overriding method must have the SAME name, SAME parameter "
            "list, and SAME (or covariant) return type as the overridden "
            "method. It requires inheritance (extends keyword) and is resolved "
            "at runtime (runtime polymorphism)."
        ),
        "code_example": (
            "class Animal {\n"
            "    void sound() { System.out.println('Animal makes sound'); }\n"
            "}\n"
            "class Dog extends Animal {\n"
            "    void sound() { System.out.println('Dog barks'); }\n"
            "}\n"
            "→ Dog overrides Animal's sound() method."
        ),
        "keywords": [
            "subclass", "superclass", "same name", "same parameters",
            "redefines", "runtime", "extends", "inheritance",
        ],
        "marking_points": [
            "Subclass redefines superclass method",
            "Same name and same parameters",
            "Requires inheritance (extends keyword)",
            "Runtime polymorphism",
        ],
    },
    "overloading_vs_overriding": {
        "table": [
            ("Basis", "Method Overloading", "Method Overriding"),
            (
                "Definition",
                "Multiple methods with same name but different parameters in the same class",
                "Subclass redefines a superclass method with the same signature",
            ),
            (
                "Class Location",
                "All methods are in the SAME class",
                "Methods are in DIFFERENT classes (superclass and subclass)",
            ),
            (
                "Parameters",
                "MUST be different (number or type)",
                "MUST be the same",
            ),
            (
                "Return Type",
                "Can be different",
                "Must be the same (or covariant)",
            ),
            (
                "Inheritance",
                "NOT required",
                "REQUIRED (uses extends keyword)",
            ),
            (
                "Polymorphism Type",
                "Compile-time (Static Polymorphism)",
                "Runtime (Dynamic Polymorphism)",
            ),
            (
                "Static Methods",
                "Can be overloaded",
                "Cannot be overridden",
            ),
            (
                "Private Methods",
                "Can be overloaded",
                "Cannot be overridden (not inherited)",
            ),
            (
                "Purpose",
                "To extend method behaviour within the same class",
                "To change inherited method behaviour in the subclass",
            ),
        ],
        "keywords": [
            "same class", "different class", "parameters", "compile time",
            "runtime", "inheritance", "extends", "static", "private",
        ],
        "marking_points": [
            "Overloading: same class, different parameters → compile-time",
            "Overriding: different classes, same parameters → runtime, needs inheritance",
            "Overloading: static/private methods CAN be overloaded",
            "Overriding: static/private methods CANNOT be overridden",
        ],
    },
    "single_inheritance": {
        "definition": (
            "Single inheritance is a type of inheritance where a subclass "
            "inherits from exactly ONE superclass.\n"
            "Example: class B extends class A  (B is subclass, A is superclass)"
        ),
        "keywords": ["one superclass", "extends", "single parent"],
    },
    "multilevel_inheritance": {
        "definition": (
            "Multilevel inheritance is a type of inheritance where a class "
            "inherits from a superclass, which in turn inherits from another "
            "superclass, forming a chain.\n"
            "Example: class C extends B; class B extends A  (A → B → C)"
        ),
        "keywords": ["chain", "A → B → C", "grandparent", "extends"],
    },
}


# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────

_QUESTION_BANK: List[Dict[str, Any]] = []


def _init_bank() -> None:
    """Build the full question bank."""
    global _QUESTION_BANK
    if _QUESTION_BANK:
        return

    # ── Node 001 ──────────────────────────────────────────────
    _QUESTION_BANK.extend([

        # --- Definitions ---
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_DEF_ENC_IN",
            "qtype": "definition",
            "competency": "indian",
            "difficulty": "medium",
            "marks": 2,
            "text": "Define encapsulation. Illustrate it with a real-life example.",
            "concept": "encapsulation",
            "keywords": KB_001["encapsulation"]["keywords"],
            "marking_points": KB_001["encapsulation"]["marking_points"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_DEF_DH_IN",
            "qtype": "definition",
            "competency": "indian",
            "difficulty": "medium",
            "marks": 2,
            "text": "What is data hiding? Explain the role of the 'private' access modifier.",
            "concept": "data_hiding",
            "keywords": KB_001["data_hiding"]["keywords"],
            "marking_points": KB_001["data_hiding"]["marking_points"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_DEF_ABS_STD",
            "qtype": "definition",
            "competency": "standard",
            "difficulty": "medium",
            "marks": 2,
            "text": "Define abstraction in OOP. Give a real-life example.",
            "concept": "abstraction",
            "keywords": KB_001["abstraction"]["keywords"],
            "marking_points": KB_001["abstraction"]["marking_points"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_DEF_OOP_IN",
            "qtype": "definition",
            "competency": "indian",
            "difficulty": "medium",
            "marks": 2,
            "text": "What do you understand by Object-Oriented Programming? "
                     "Mention any four features of OOP.",
            "concept": "oop_general",
            "keywords": KB_001["oop_general"]["keywords"],
            "marking_points": [
                "Programming paradigm based on objects",
                "Objects contain data and methods",
                "Any four valid features mentioned",
            ],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_DEF_ABS_IN",
            "qtype": "definition",
            "competency": "indian",
            "difficulty": "medium",
            "marks": 2,
            "text": "Define abstraction. How does a car dashboard illustrate "
                     "this principle?",
            "concept": "abstraction",
            "keywords": KB_001["abstraction"]["keywords"],
            "marking_points": KB_001["abstraction"]["marking_points"],
        },

        # --- Identify principle ---
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_ID_ENC_IN",
            "qtype": "identify_principle",
            "competency": "indian",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                '"A medicine capsule encloses the powder inside a sealed shell, '
                'hiding the taste from the tongue while delivering the medicine '
                'to the stomach." Which OOP principle does this illustrate? '
                'Name the principle.'
            ),
            "answer": "Encapsulation",
            "explanation": (
                "The capsule bundles the medicine (data) with its shell "
                "(protective methods) into a single unit — exactly like a "
                "class bundling data and methods."
            ),
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_ID_ABS_IN",
            "qtype": "identify_principle",
            "competency": "indian",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                '"When you use a TV remote, you press buttons (volume, channel, '
                'power) without knowing the electronic circuitry inside the '
                'television." Which OOP principle is this? Name it.'
            ),
            "answer": "Abstraction",
            "explanation": (
                "The remote exposes essential features (buttons) and hides "
                "implementation details (circuitry, signal processing) — "
                "this is abstraction."
            ),
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_ID_DH_STD",
            "qtype": "identify_principle",
            "competency": "standard",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                '"A smartphone hides its internal circuitry and microchips '
                'from the user. The user interacts only through the screen '
                'touch interface." Which OOP principle is demonstrated here? '
                'Name the principle.'
            ),
            "answer": "Data Hiding",
            "explanation": (
                "Internal details (circuitry) are hidden from the user; "
                "only a public interface (screen) is exposed."
            ),
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_ID_TWO_IN",
            "qtype": "identify_principle",
            "competency": "indian",
            "difficulty": "medium",
            "marks": 2,
            "text": (
                '"A smartphone hides its internal circuitry from the user '
                '(principle A) and bundles the hardware and software features '
                'into a single device that the user interacts with through '
                'buttons and a screen (principle B)."\n'
                'Identify principles A and B.'
            ),
            "answer": "A: Data Hiding, B: Encapsulation",
            "explanation": (
                "A hides internal details (data hiding); B bundles "
                "everything into one unit (encapsulation)."
            ),
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_ID_ENC_STD",
            "qtype": "identify_principle",
            "competency": "standard",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                '"A capsule contains medicine in a sealed unit, protecting '
                'the medicine from air and moisture." Which OOP principle '
                'does this describe?'
            ),
            "answer": "Encapsulation",
            "explanation": "Bundling data (medicine) and its protection (sealed unit) together.",
        },

        # --- Fill in blanks ---
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_FB_PRIVATE",
            "qtype": "fill_blank",
            "competency": "indian",
            "difficulty": "easy",
            "marks": 1,
            "text": "The access modifier used for data hiding in Java is ______.",
            "answer": "private",
            "alternatives": ["private keyword"],
            "keywords": ["private"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_FB_BUNDLE",
            "qtype": "fill_blank",
            "competency": "standard",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                "Encapsulation means bundling ______ and ______ together "
                "within a class."
            ),
            "answer": "data; methods",
            "alternatives": [
                "data and methods",
                "attributes and behaviour",
                "variables and functions",
            ],
            "keywords": ["data", "methods"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_FB_PUBLIC",
            "qtype": "fill_blank",
            "competency": "indian",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                "The methods that are accessible from outside the class are "
                "called ______ methods."
            ),
            "answer": "public",
            "keywords": ["public"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_FB_ESSENTIAL",
            "qtype": "fill_blank",
            "competency": "standard",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                "Abstraction means exposing only the ______ features to the "
                "user while hiding the implementation ______."
            ),
            "answer": "essential; details",
            "alternatives": ["essential features; details", "necessary; details"],
            "keywords": ["essential", "details"],
        },

        # --- MCQ ---
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_MCQ_PRIVATE",
            "qtype": "mcq",
            "competency": "indian",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                "Which keyword is used in Java for data hiding?"
            ),
            "options": ["(a) public", "(b) private", "(c) static", "(d) final"],
            "answer": "b",
            "keywords": ["private", "data hiding"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_MCQ_DASHBOARD",
            "qtype": "mcq",
            "competency": "standard",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                "A car dashboard showing only the steering wheel, accelerator, "
                "and brake to the driver (hiding the engine internals) is an "
                "example of:"
            ),
            "options": [
                "(a) Encapsulation",
                "(b) Data Hiding",
                "(c) Abstraction",
                "(d) Inheritance",
            ],
            "answer": "c",
            "keywords": ["abstraction", "dashboard"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_MCQ_NOT_OOP",
            "qtype": "mcq",
            "competency": "indian",
            "difficulty": "medium",
            "marks": 1,
            "text": (
                "Which of the following is NOT one of the OOP principles?"
            ),
            "options": [
                "(a) Encapsulation",
                "(b) Compilation",
                "(c) Abstraction",
                "(d) Data Hiding",
            ],
            "answer": "b",
            "keywords": ["compilation"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_MCQ_BUNDLE",
            "qtype": "mcq",
            "competency": "standard",
            "difficulty": "easy",
            "marks": 1,
            "text": (
                "Encapsulation refers to:"
            ),
            "options": [
                "(a) Hiding data from outside access",
                "(b) Bundling data and methods into a single unit",
                "(c) Showing only essential features",
                "(d) One name, many forms",
            ],
            "answer": "b",
            "keywords": ["bundling", "data", "methods"],
        },
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_MCQ_POPOOP",
            "qtype": "mcq",
            "competency": "indian",
            "difficulty": "medium",
            "marks": 1,
            "text": (
                "In Procedure-Oriented Programming, the program is divided "
                "into:"
            ),
            "options": [
                "(a) Objects",
                "(b) Classes",
                "(c) Functions",
                "(d) Methods",
            ],
            "answer": "c",
            "keywords": ["functions", "POP"],
        },

        # --- Difference questions ---
        {
            "node_id": "c10_cs_001",
            "qid": "c10_001_DIFF_POPOOP_IN",
            "qtype": "difference",
            "competency": "indian",
}])

# =============================================================================
# SOLVER FUNCTIONS (auto-discoverable by registry)
# =============================================================================

def solve_definition(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a definition-type question by looking up KB data."""
    concept = params.get("concept", "").lower()
    node = params.get("node_id", "c10_cs_001")
    kb = KB_001 if "001" in node else KB_002
    entry = kb.get(concept, {})
    if not entry:
        return {"answer": "", "steps": [], "verification": False, "error": f"Unknown concept: {concept}"}
    answer = entry.get("definition", "")
    steps = [f"Recall the definition of {concept}", answer]
    if "keywords" in entry:
        steps.append(f"Key terms: {', '.join(entry['keywords'])}")
    return {"answer": answer, "steps": steps, "verification": True}


def solve_difference(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a difference-type question."""
    concept_a = params.get("concept_a", "")
    concept_b = params.get("concept_b", "")
    node = params.get("node_id", "c10_cs_001")
    kb = KB_001 if "001" in node else KB_002
    a = kb.get(concept_a.lower(), {})
    b = kb.get(concept_b.lower(), {})
    answer = f"{concept_a}: {a.get('definition', 'N/A')}\n{concept_b}: {b.get('definition', 'N/A')}"
    return {"answer": answer, "steps": [answer], "verification": True}


def solve_check_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Check a user's answer against the KB."""
    concept = params.get("concept", "").lower()
    node = params.get("node_id", "c10_cs_001")
    user_answer = params.get("user_answer", "")
    kb = KB_001 if "001" in node else KB_002
    entry = kb.get(concept, {})
    correct_answer = entry.get("definition", "")
    keywords = entry.get("keywords", [])
    # Check if user answer contains key terms
    user_lower = user_answer.lower()
    matched = [kw for kw in keywords if kw.lower() in user_lower]
    score = len(matched) / max(len(keywords), 1) if keywords else 0.0
    correct = score >= 0.5
    return {
        "answer": correct_answer,
        "user_answer": user_answer,
        "correct": correct,
        "score": score,
        "matched_keywords": matched,
        "verification": True,
    }


def evaluate_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Evaluate a user's answer for a given question ID."""
    qid = params.get("qid", "")
    user_answer = params.get("user_answer", "")
    _init_bank()
    question = next((q for q in _QUESTION_BANK if q.get("qid") == qid), None)
    if not question:
        return {"correct": False, "error": f"Question {qid} not found", "verification": False}
    concept = question.get("concept", "")
    return solve_check_answer({
        "concept": concept,
        "node_id": question.get("node_id", "c10_cs_001"),
        "user_answer": user_answer,
    })


SOLVER_REGISTRY = {
    "definition": solve_definition,
    "difference": solve_difference,
    "check_answer": solve_check_answer,
    "evaluate": evaluate_answer,
}


if __name__ == "__main__":
    _init_bank()
    print(f"Question bank: {len(_QUESTION_BANK)} questions")
    r = solve_definition({"concept": "encapsulation", "node_id": "c10_cs_001"})
    print(f"Definition: {r['answer'][:80]}")
    r2 = solve_check_answer({"concept": "encapsulation", "node_id": "c10_cs_001", "user_answer": "bundling data and methods"})
    print(f"Check: correct={r2['correct']}, score={r2['score']:.2f}")