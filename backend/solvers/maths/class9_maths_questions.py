import random
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
import sympy as sp
from sympy import Rational, sqrt, pi, E, Symbol, nsimplify, simplify, latex
import numpy as np

@dataclass
class QuestionNode:
    node_id: str
    title: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    exam_relevance: str
    exam_weightage: str
    competency_level: str
    prereq_strength: str
    mastery_criteria: str
    vocabulary: List[str]
    scope_boundary: str
    prereq: Optional[str]
    is_root: bool
    depth_prereq: Optional[str] = None
    depth_reason: Optional[str] = None

@dataclass
class GeneratedQuestion:
    node_id: str
    question_text: str
    correct_answer: str
    competency_type: str
    difficulty: str
    verification: str
    options: List[str] = field(default_factory=list)
    step_by_step: List[str] = field(default_factory=list)
    marks: int = 1
    indian_context: bool = False

class DeterministicQuestionGenerator:
    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self.sp_seed = seed
        sp.seed(seed) if hasattr(sp, 'seed') else None
        self.nodes = self._initialize_nodes()
        self.indian_names = ["Rahul", "Priya", "Arjun", "Diya", "Ananya", "Vihaan", 
                            "Ishaan", "Kavya", "Rohan", "Meera", "Aditya", "Sneha"]
        self.indian_cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
                              "Hyderabad", "Pune", "Ahmedabad"]
        self.rupee_symbol = "₹"
        
    def _initialize_nodes(self) -> Dict[str, QuestionNode]:
        nodes = {}
        
        nodes["c9_math_001"] = QuestionNode(
            node_id="c9_math_001",
            title="Rational numbers as real numbers, place in the number system",
            section="1. Pure Arithmetic -- Rational and Irrational Numbers",
            syllabus="Rational numbers as a subset of real numbers and their place in the number system. "
                    "Expressing a rational number in the form p/q where p and q are integers and q ≠ 0. "
                    "Identifying rational numbers as real numbers that have either terminating or "
                    "non-terminating recurring decimal expansions. Distinguishing rational numbers from "
                    "irrational numbers using the p/q property. Position of rational numbers within the "
                    "broader real number system (natural numbers, integers, rational numbers as nested subsets).",
            cognitive_level="Understand",
            difficulty="Medium",
            exam_relevance="Board_Only",
            exam_weightage="Medium",
            competency_level="Board",
            prereq_strength="medium",
            mastery_criteria="Can identify rational numbers as a subset of real numbers. "
                            "Can express a rational number in the form p/q where p and q are integers and q ≠ 0. "
                            "Can distinguish rational numbers from irrational numbers by the p/q property.",
            vocabulary=["rational number", "real number", "number system", "subset", "p/q form",
                       "numerator", "denominator", "integer", "terminating decimal", 
                       "repeating decimal", "non-zero denominator"],
            scope_boundary="Teach: identifying rational numbers as real numbers and their place in the number system. "
                          "Do NOT teach: irrational numbers, surds, and representation on the number line.",
            prereq=None,
            is_root=False,
            depth_prereq="c8_math_001",
            depth_reason="In C8, the child learned properties of rational numbers and their general form. "
                        "In C9, they place rational numbers within the real number system."
        )
        
        nodes["c9_math_002"] = QuestionNode(
            node_id="c9_math_002",
            title="Irrational numbers as real numbers, place in the number system",
            section="1. Pure Arithmetic -- Rational and Irrational Numbers",
            syllabus="Irrational numbers as real numbers that cannot be expressed in the form p/q "
                    "(where p, q are integers, q ≠ 0). Place of irrational numbers in the number system "
                    "alongside rational numbers to form the complete set of real numbers. Identifying "
                    "irrational numbers by their non-terminating, non-repeating decimal expansions. "
                    "Examples such as √2, √3, π, and e. Distinguishing irrational from rational numbers "
                    "by the p/q test and by decimal expansion behaviour.",
            cognitive_level="Apply",
            difficulty="Medium",
            exam_relevance="Board_Only",
            exam_weightage="Medium",
            competency_level="Board",
            prereq_strength="medium",
            mastery_criteria="Can identify irrational numbers as real numbers that cannot be expressed in p/q form. "
                            "Can explain the place of irrational numbers in the number system alongside rational numbers. "
                            "Can distinguish irrational numbers from rational numbers by their non-terminating, "
                            "non-repeating decimal expansion.",
            vocabulary=["irrational number", "real number", "number system", "p/q form", 
                       "non-terminating", "non-repeating decimal", "square root", "rational number", 
                       "subset", "real number line", "contradiction"],
            scope_boundary="Teach: identifying irrational numbers as real numbers and their place in the number system. "
                          "Do NOT teach: surds, rationalization, and proofs of irrationality.",
            prereq="c9_math_001",
            is_root=False,
            depth_prereq="c8_math_002",
            depth_reason="In C8, the child learned representation of rational numbers on the number line. "
                        "In C9, they extend the number line to include irrationals."
        )
        
        nodes["c9_math_003"] = QuestionNode(
            node_id="c9_math_003",
            title="Representation of rational and irrational numbers on the number line",
            section="1. Pure Arithmetic -- Rational and Irrational Numbers",
            syllabus="Representation of rational and irrational numbers on the number line. "
                    "Representing rational numbers by dividing unit segments into equal parts "
                    "(e.g., locating 3/5, -7/4 on the number line). Geometric construction of "
                    "irrational numbers √2, √3 and similar surds on the number line using ruler "
                    "and compasses (e.g., constructing √2 as the hypotenuse of a right triangle "
                    "with legs of length 1).",
            cognitive_level="Apply",
            difficulty="Medium",
            exam_relevance="Board_Only",
            exam_weightage="Medium",
            competency_level="Board",
            prereq_strength="medium",
            mastery_criteria="Can represent rational numbers on the number line by dividing unit segments. "
                            "Can geometrically construct irrational numbers like √2, √3 on the number line. "
                            "Can locate both rational and irrational numbers accurately on the number line.",
            vocabulary=["number line", "rational number", "irrational number", "unit segment", 
                       "geometric construction", "hypotenuse", "compasses", "ruler", "√2", "√3"],
            scope_boundary="Teach: representation on number line for both rational and irrational numbers. "
                          "Do NOT teach: advanced surd operations.",
            prereq="c9_math_002",
            is_root=False
        )
        
        return nodes
    
    def _get_random_name(self) -> str:
        return self.rng.choice(self.indian_names)
    
    def _get_random_city(self) -> str:
        return self.rng.choice(self.indian_cities)
    
    def _rational_to_decimal(self, p: int, q: int) -> Tuple[str, str]:
        """Convert rational to decimal, determine if terminating or repeating."""
        frac = Rational(p, q)
        decimal_str = str(float(frac))
        
        # Check if terminating
        from sympy import Rational as Rat
        r = Rat(p, q)
        denom = r.q
        
        # Remove factors of 2 and 5
        temp = denom
        while temp % 2 == 0:
            temp //= 2
        while temp % 5 == 0:
            temp //= 5
        
        if temp == 1:
            decimal_type = "terminating"
        else:
            decimal_type = "non-terminating recurring"
            
        return decimal_str, decimal_type
    
    def generate_c9_math_001_question(self, competency_type: str) -> GeneratedQuestion:
        """Generate question for rational numbers node."""
        node = self.nodes["c9_math_001"]
        
        if competency_type == "competency":
            return self._gen_001_competency(node)
        else:
            return self._gen_001_standard(node)
    
    def _gen_001_competency(self, node: QuestionNode) -> GeneratedQuestion:
        """Generate competency-based question with Indian context."""
        name = self._get_random_name()
        city = self._get_random_city()
        
        question_types = self.rng.randint(0, 2)
        
        if question_types == 0:
            # Pocket money scenario
            total_amount = self.rng.randint(100, 500)
            numerator = self.rng.randint(1, 9)
            denominator = self.rng.randint(2, 10)
            fraction = Rational(numerator, denominator)
            spent = total_amount * fraction
            
            question = (f"{name} from {city} received ₹{total_amount} as pocket money. "
                       f"{name} spent {numerator}/{denominator} of the amount on buying books. "
                       f"Express the amount spent as a rational number in p/q form, where p and q are integers. "
                       f"Also identify whether this rational number is a terminating or non-terminating "
                       f"recurring decimal.")
            
            answer = f"Amount spent = ₹{spent} = {spent}/1. It is a rational number with terminating decimal expansion."
            
            steps = [
                f"Step 1: Total pocket money = ₹{total_amount}",
                f"Step 2: Fraction spent = {numerator}/{denominator}",
                f"Step 3: Amount spent = {total_amount} × {numerator}/{denominator} = {spent}",
                f"Step 4: Express as rational: {spent} = {spent}/1",
                f"Step 5: Since denominator is 1 (which is 2⁰ × 5⁰), it is a terminating decimal."
            ]
            
            verification = f"Verification: {spent} ÷ 1 = {float(spent)} which is a terminating decimal."
            
        elif question_types == 1:
            # Cricket scores
            runs_scored = self.rng.randint(50, 150)
            balls_faced = self.rng.randint(20, 60)
            strike_rate = Rational(runs_scored, balls_faced) * 100
            
            question = (f"In a cricket match in {city}, {name} scored {runs_scored} runs off {balls_faced} balls. "
                       f"Express the strike rate (runs per 100 balls) as a rational number. "
                       f"Show that it can be written in the form p/q where p and q are integers and q ≠ 0. "
                       f"Also classify this rational number within the number system.")
            
            answer = f"Strike rate = {runs_scored}/{balls_faced} × 100 = {strike_rate}. This is a rational number."
            
            steps = [
                f"Step 1: Strike rate = (Runs/Balls) × 100",
                f"Step 2: = {runs_scored}/{balls_faced} × 100",
                f"Step 3: = {runs_scored * 100}/{balls_faced}",
                f"Step 4: Simplifying: {strike_rate}",
                f"Step 5: This is in p/q form where p = {strike_rate.p}, q = {strike_rate.q}",
                f"Step 6: Since q ≠ 0, it is a rational number (subset of real numbers)"
            ]
            
            verification = f"Verification: {strike_rate} = {float(strike_rate)} which is a rational number."
            
        else:
            # Distance/speed problem
            distance = Rational(self.rng.randint(10, 50), self.rng.randint(2, 5))
            time = Rational(self.rng.randint(1, 5), self.rng.randint(2, 4))
            speed = distance / time
            
            question = (f"{name} travelled {float(distance)} km in {float(time)} hours while going from "
                       f"{city} to a nearby town. Calculate the average speed as a rational number. "
                       f"Express it in p/q form and explain why it is a rational number.")
            
            answer = f"Speed = Distance/Time = {distance}/{time} = {speed}. This is a rational number."
            
            steps = [
                f"Step 1: Distance = {distance} km, Time = {time} hours",
                f"Step 2: Speed = Distance ÷ Time",
                f"Step 3: Speed = {distance} ÷ {time} = {distance}/{time}",
                f"Step 4: Speed = {speed} km/h",
                f"Step 5: This is in p/q form where p = {speed.p}, q = {speed.q}"
            ]
            
            verification = f"Verification: {speed} = {float(speed)} km/h, which is a rational number."
        
        return GeneratedQuestion(
            node_id=node.node_id,
            question_text=question,
            correct_answer=answer,
            competency_type="competency",
            difficulty=node.difficulty,
            step_by_step=steps,
            verification=verification,
            marks=3,
            indian_context=True
        )
    
    def _gen_001_standard(self, node: QuestionNode) -> GeneratedQuestion:
        """Generate standard knowledge-based question."""
        question_types = self.rng.randint(0, 3)
        
        if question_types == 0:
            # Identify rational number
            p = self.rng.randint(-10, 10)
            q = self.rng.randint(2, 9)
            if self.rng.random() < 0.5:
                q = 1
            frac = Rational(p, q)
            
            question = f"Show that {frac} is a rational number by writing it in the form p/q where p and q are integers and q ≠ 0."
            answer = f"{frac} is already in p/q form where p = {p} and q = {q} ≠ 0. Hence, it is a rational number."
            
            steps = [
                f"Given number: {frac}",
                f"Rational numbers are of the form p/q where p, q are integers and q ≠ 0",
                f"Here, p = {p} (integer) and q = {q} (integer, non-zero)",
                f"Therefore, {frac} is a rational number"
            ]
            
            verification = f"Verification: {frac} = {float(frac)}, which can be expressed as {p}/{q}."
            
        elif question_types == 1:
            # Terminating decimal
            denom = self.rng.choice([2, 4, 5, 8, 10, 16, 20, 25])
            numer = self.rng.randint(1, denom - 1)
            frac = Rational(numer, denom)
            
            question = (f"Determine whether the rational number {frac} has a terminating or non-terminating "
                       f"recurring decimal expansion without actually performing the division.")
            
            answer = f"{frac} has a terminating decimal expansion because its denominator {denom} has only prime factors 2 and/or 5."
            
            steps = [
                f"Given rational number: {frac}",
                f"Factorize the denominator: {denom} = {self._factorize(denom)}",
                f"A rational number has terminating decimal expansion if denominator (in lowest form) "
                f"has only prime factors 2 and/or 5",
                f"Since {denom} = {self._factorize(denom)} has only factors 2 and 5",
                f"{frac} has a terminating decimal expansion"
            ]
            
            decimal_val, decimal_type = self._rational_to_decimal(numer, denom)
            verification = f"Verification: {frac} = {decimal_val} which is {decimal_type}."
            
        elif question_types == 2:
            # Number system hierarchy
            question = ("Arrange the following sets of numbers in ascending order of their elements: "
                       "Natural numbers (N), Integers (Z), Rational numbers (Q), Real numbers (R). "
                       "Show the subset relationship between them.")
            
            answer = "N ⊂ Z ⊂ Q ⊂ R. Natural numbers are subset of integers, integers are subset of rational numbers, rational numbers are subset of real numbers."
            
            steps = [
                "Natural numbers (N) = {1, 2, 3, ...}",
                "Integers (Z) = {..., -2, -1, 0, 1, 2, ...}",
                "Rational numbers (Q) = {p/q | p, q ∈ Z, q ≠ 0}",
                "Real numbers (R) = Q ∪ (set of irrational numbers)",
                "Every natural number is an integer",
                "Every integer is a rational number",
                "Every rational number is a real number",
                "Therefore: N ⊂ Z ⊂ Q ⊂ R"
            ]
            
            verification = "Verification: For example, 5 ∈ N, 5 ∈ Z, 5 ∈ Q, 5 ∈ R, showing the nested subset relationship."
            
        else:
            # Decimal to rational
            decimal = self.rng.choice([0.5, 0.25, 0.125, 0.75, 0.2, 0.4])
            frac = Rational(str(decimal))
            
            question = f"Express the terminating decimal {decimal} as a rational number in the form p/q."
            
            answer = f"{decimal} = {frac}"
            
            steps = [
                f"Given decimal: {decimal}",
                f"Since it is a terminating decimal, write it as p/q",
                f"{decimal} = {decimal}/1",
                f"Multiply numerator and denominator by appropriate power of 10",
                f"{decimal} = {frac}"
            ]
            
            verification = f"Verification: {frac} = {float(frac)} = {decimal}"
        
        return GeneratedQuestion(
            node_id=node.node_id,
            question_text=question,
            correct_answer=answer,
            competency_type="standard",
            difficulty=node.difficulty,
            step_by_step=steps,
            verification=verification,
            marks=2,
            indian_context=False
        )
    
    def _factorize(self, n: int) -> str:
        """Factorize number into primes."""
        factors = []
        d = 2
        temp = n
        while d * d <= temp:
            while temp % d == 0:
                factors.append(str(d))
                temp //= d
            d += 1
        if temp > 1:
            factors.append(str(temp))
        return " × ".join(factors)
    
    def generate_c9_math_002_question(self, competency_type: str) -> GeneratedQuestion:
        """Generate question for irrational numbers node."""
        node = self.nodes["c9_math_002"]
        
        if competency_type == "competency":
            return self._gen_002_competency(node)
        else:
            return self._gen_002_standard(node)
    
    def _gen_002_competency(self, node: QuestionNode) -> GeneratedQuestion:
        """Generate competency-based question with Indian context."""
        name = self._get_random_name()
        city = self._get_random_city()
        
        question_types = self.rng.randint(0, 2)
        
        if question_types == 0:
            # Garden/path scenario with diagonal
            question = (f"{name} is designing a square garden in {city} with each side measuring 1 metre. "
                       f"{name} wants to lay a walking path along the diagonal of the garden. "
                       f"Calculate the length of the diagonal and explain why it cannot be expressed as a rational number.")
            
            answer = "Diagonal = √2 metres. It is irrational because it cannot be expressed as p/q where p, q are integers."
            
            steps = [
                "Step 1: Garden is a square with side = 1 m",
                "Step 2: Using Pythagoras theorem: diagonal² = 1² + 1²",
                "Step 3: diagonal² = 2",
                "Step 4: diagonal = √2",
                "Step 5: √2 ≈ 1.414213... (non-terminating, non-repeating)",
                "Step 6: Cannot be written as p/q for integers p, q",
                "Step 7: Therefore, √2 is irrational"
            ]
            
            verification = f"Verification: √2 = {float(sqrt(2)):.10f}... (non-terminating, non-repeating)"
            
        elif question_types == 1:
            # Circle and pi
            radius = self.rng.randint(7, 14)
            circumference = 2 * pi * radius
            
            question = (f"{name} is making a circular rangoli in {city} with radius {radius} cm. "
                       f"Calculate the circumference using π ≈ 22/7. Explain why the actual circumference "
                       f"is an irrational number even though 22/7 is rational.")
            
            answer = f"Circumference = 2πr = 2 × π × {radius} = {circumference} cm. π is irrational, so exact circumference is irrational."
            
            steps = [
                f"Step 1: Radius r = {radius} cm",
                "Step 2: Circumference C = 2πr",
                f"Step 3: C = 2 × π × {radius} = {circumference} cm (using approximation)",
                "Step 4: Exact value: C = 44π cm",
                "Step 5: π is irrational (≈ 3.14159..., non-terminating, non-repeating)",
                "Step 6: Therefore, exact circumference is irrational",
                "Step 7: 22/7 is only an approximation of π"
            ]
            
            verification = f"Verification: π = {float(pi):.10f}... which is non-terminating and non-repeating."
            
        else:
            # Diagonal of rectangle
            length = self.rng.randint(2, 5)
            breadth = self.rng.randint(1, 4)
            diagonal_sq = length**2 + breadth**2
            
            question = (f"{name} has a rectangular plot of land in {city} with length {length} m and breadth {breadth} m. "
                       f"Find the length of the diagonal. Is it rational or irrational? Explain.")
            
            answer = f"Diagonal = √{diagonal_sq} m. It is {'rational' if self._is_perfect_square(diagonal_sq) else 'irrational'}."
            
            is_rational = self._is_perfect_square(diagonal_sq)
            
            steps = [
                f"Step 1: Length = {length} m, Breadth = {breadth} m",
                f"Step 2: Using Pythagoras: diagonal² = {length}² + {breadth}²",
                f"Step 3: diagonal² = {length**2} + {breadth**2} = {diagonal_sq}",
                f"Step 4: diagonal = √{diagonal_sq}",
                f"Step 5: Check if {diagonal_sq} is a perfect square: {'Yes' if is_rational else 'No'}"
            ]
            
            if is_rational:
                steps.append(f"Step 6: Since {diagonal_sq} is a perfect square, diagonal = {int(sqrt(diagonal_sq))} (rational)")
            else:
                steps.append(f"Step 6: Since {diagonal_sq} is not a perfect square, √{diagonal_sq} is irrational")
            
            verification = f"Verification: √{diagonal_sq} = {float(sqrt(diagonal_sq)):.6f}... {'terminating' if is_rational else 'non-terminating, non-repeating'}"
        
        return GeneratedQuestion(
            node_id=node.node_id,
            question_text=question,
            correct_answer=answer,
            competency_type="competency",
            difficulty=node.difficulty,
            step_by_step=steps,
            verification=verification,
            marks=3,
            indian_context=True
        )
    
    def _is_perfect_square(self, n: int) -> bool:
        return int(math.isqrt(n)) ** 2 == n
    
    def _gen_002_standard(self, node: QuestionNode) -> GeneratedQuestion:
        """Generate standard knowledge-based question."""
        question_types = self.rng.randint(0, 3)
        
        if question_types == 0:
            # Identify irrational
            options_fracs = [Rational(3, 4), Rational(22, 7), sqrt(2), Rational(5, 2)]
            options_decimals = ["0.75", "≈ 3.14", "≈ 1.414...", "2.5"]
            
            question = "Which of the following is an irrational number? Justify your answer using the p/q test."
            answer = "√2 is irrational because it cannot be expressed as p/q where p, q are integers and q ≠ 0."
            
            steps = [
                "Check each option:",
                "3/4 = 0.75 → p=3, q=4 → Rational",
                "22/7 ≈ 3.14 → p=22, q=7 → Rational (though approximation of π)",
                "√2 ≈ 1.414... → Cannot be written as p/q → Irrational",
                "5/2 = 2.5 → p=5, q=2 → Rational"
            ]
            
            verification = f"Verification: √2 = {float(sqrt(2)):.15f}... (non-terminating, non-repeating)"
            
        elif question_types == 1:
            # Decimal expansion identification
            num = self.rng.randint(2, 10)
            root = sqrt(num)
            
            question = (f"The decimal expansion of √{num} is approximately {float(root):.4f}... "
                       f"Without calculating further, explain why √{num} is an irrational number.")
            
            answer = f"√{num} is irrational because {num} is not a perfect square, so its square root cannot be expressed as p/q."
            
            steps = [
                f"Given: √{num} = {float(root):.4f}...",
                f"Check if {num} is a perfect square",
                f"Perfect squares near {num}: {self._nearest_perfect_squares(num)}",
                f"Since {num} is not a perfect square, √{num} is irrational",
                f"A number is irrational if it cannot be written as p/q (p, q integers, q ≠ 0)",
                f"√{num} has non-terminating, non-repeating decimal expansion"
            ]
            
            verification = f"Verification: √{num} = {float(root):.15f}... shows non-terminating, non-repeating pattern."
            
        elif question_types == 2:
            # Classification
            numbers = [0, -3, Rational(1, 2), sqrt(3), pi, Rational(0, 1)]
            
            question = ("Classify the following numbers as rational or irrational: 0, -3, 1/2, √3, π, 0/1. "
                       "Use the p/q property to justify each classification.")
            
            answer = ("Rational: 0 (=0/1), -3 (=-3/1), 1/2, 0/1. Irrational: √3, π")
            
            steps = [
                "0 = 0/1 → p=0, q=1 → Rational",
                "-3 = -3/1 → p=-3, q=1 → Rational",
                "1/2 → p=1, q=2 → Rational",
                "√3 ≈ 1.732... → cannot write as p/q → Irrational",
                "π ≈ 3.14159... → cannot write as p/q → Irrational",
                "0/1 → p=0, q=1 → Rational (though 0/0 is undefined)"
            ]
            
            verification = "Verification: All rational numbers have p/q form; irrationals do not."
            
        else:
            # Number system Venn diagram description
            question = ("Describe the relationship between Natural numbers (N), Integers (Z), Rational numbers (Q), "
                       "Irrational numbers (I), and Real numbers (R). Which sets are subsets of others?")
            
            answer = "N ⊂ Z ⊂ Q ⊂ R and I ⊂ R, but Q ∩ I = ∅. Rational and irrational numbers together form real numbers."
            
            steps = [
                "Natural numbers: N = {1, 2, 3, ...}",
                "Integers: Z = {..., -2, -1, 0, 1, 2, ...}",
                "Rational numbers: Q = {p/q | p, q ∈ Z, q ≠ 0}",
                "Irrational numbers: I = {x ∈ R | x cannot be written as p/q}",
                "Real numbers: R = Q ∪ I",
                "Subset relationships: N ⊂ Z ⊂ Q ⊂ R and I ⊂ R",
                "Q ∩ I = ∅ (no number is both rational and irrational)"
            ]
            
            verification = "Verification: For example, 2 ∈ N ⊂ Z ⊂ Q ⊂ R, while √2 ∈ I ⊂ R."
        
        return GeneratedQuestion(
            node_id=node.node_id,
            question_text=question,
            correct_answer=answer,
            competency_type="standard",
            difficulty=node.difficulty,
            step_by_step=steps,
            verification=verification,
            marks=2,
            indian_context=False
        )
    
    def _nearest_perfect_squares(self, n: int) -> str:
        lower = int(math.isqrt(n)) ** 2
        upper = (int(math.isqrt(n)) + 1) ** 2
        return f"{lower} and {upper}"
    
    def generate_c9_math_003_question(self, competency_type: str) -> GeneratedQuestion:
        """Generate question for number line representation node."""
        node = self.nodes["c9_math_003"]
        
        if competency_type == "competency":
            return self._gen_003_competency(node)
        else:
            return self._gen_003_standard(node)
    
    def _gen_003_competency(self, node: QuestionNode) -> GeneratedQuestion:
        """Generate competency-based question with Indian context."""
        name = self._get_random_name()
        city = self._get_random_city()
        
        question_types = self.rng.randint(0, 2)
        
        if question_types == 0:
            # Market distance
            point_a = 0
            point_b = Rational(3, 2)  # 1.5 km
            
            question = (f"The market in {city} is located 1.5 km from {name}'s house. "
                       f"On a number line where the house is at 0 and the market is at 1.5, "
                       f"show how to locate the point exactly halfway between the house and market. "
                       f"Also locate a temple that is √2 km from the house.")
            
            answer = f"Halfway point = 0.75 = 3/4. Temple is at approximately 1.414 km."
            
            steps = [
                "Step 1: House at 0, Market at 3/2",
                "Step 2: Halfway = (0 + 3/2) ÷ 2 = 3/4 = 0.75",
                "Step 3: To locate 3/4: Divide unit segment [0,1] into 4 equal parts",
                "Step 4: Mark the 3rd division point",
                "Step 5: For √2: Construct right triangle with legs 1 and 1",
                "Step 6: Hypotenuse = √(1² + 1²) = √2 ≈ 1.414 km"
            ]
            
            verification = f"Verification: 3/4 = {float(Rational(3, 4))}, √2 = {float(sqrt(2)):.4f}"
            
        elif question_types == 1:
            # School route
            school = Rational(5, 2)  # 2.5
            library = Rational(7, 2)  # 3.5
            
            question = (f"{name}'s school is 2.5 km from home and the library is 3.5 km from home on the same road in {city}. "
                       f"Represent these locations on a number line taking home as origin. "
                       f"Find the distance between school and library.")
            
            answer = f"School at 5/2, Library at 7/2. Distance = |7/2 - 5/2| = 1 km."
            
            steps = [
                "Step 1: Home at 0 (origin)",
                "Step 2: School at 5/2 = 2.5 km",
                "Step 3: Library at 7/2 = 3.5 km",
                "Step 4: On number line: 0 —— 2.5 —— 3.5 ——>",
                "Step 5: Distance = |3.5 - 2.5| = 1 km"
            ]
            
            verification = f"Verification: |7/2 - 5/2| = 2/2 = 1 km."
            
        else:
            # Park walking path
            side = 2
            
            question = (f"{name} walks along the boundary of a square park in {city} where each side is {side} km. "
                       f"If {name} walks from one corner to the diagonally opposite corner through the park, "
                       f"find the distance walked. Represent this on a number line.")
            
            answer = f"Diagonal = {side}√2 = {2*sqrt(2)} km ≈ {float(2*sqrt(2)):.2f} km."
            
            steps = [
                f"Step 1: Square with side = {side} km",
                f"Step 2: Diagonal = √({side}² + {side}²) = √{2*side**2}",
                f"Step 3: Diagonal = {side}√2 km",
                f"Step 4: On number line, this is at approximately {float(2*sqrt(2)):.2f}",
                f"Step 5: Geometric construction: Draw square, draw diagonal"
            ]
            
            verification = f"Verification: {side}√2 = {float(2*sqrt(2)):.4f} km."
        
        return GeneratedQuestion(
            node_id=node.node_id,
            question_text=question,
            correct_answer=answer,
            competency_type="competency",
            difficulty=node.difficulty,
            step_by_step=steps,
            verification=verification,
            marks=3,
            indian_context=True
        )
    
    def _gen_003_standard(self, node: QuestionNode) -> GeneratedQuestion:
        """Generate standard knowledge-based question."""
        question_types = self.rng.randint(0, 2)
        
        if question_types == 0:
            # Locate rational on number line
            numer = self.rng.randint(1, 9)
            denom = self.rng.randint(numer + 1, 12)
            frac = Rational(numer, denom)
            neg = self.rng.choice([-1, 1])
            if neg == -1 and self.rng.random() < 0.3:
                frac = -frac
            
            question = f"Locate the rational number {frac} on the number line by dividing the unit segment into equal parts."
            
            steps = [
                f"Step 1: Given rational number: {frac}",
                f"Step 2: Identify the unit segment containing {frac}",
                f"Step 3: Divide the unit segment into {denom} equal parts",
                f"Step 4: Count {abs(numer)} parts from 0 {'in negative direction' if float(frac) < 0 else 'in positive direction'}",
                f"Step 5: Mark the point at {frac}"
            ]
            
            answer = f"The point {frac} is located by dividing unit segment into {denom} equal parts and marking the {numer}th point."
            
            verification = f"Verification: {frac} = {float(frac):.4f} on the number line."
            
        elif question_types == 1:
            # Construct √2 on number line
            question = ("Describe the geometric construction to locate √2 on the number line using a ruler and compasses. "
                       "Start from 0 and show each step clearly.")
            
            answer = ("1. Draw unit segment OA = 1. 2. At A, draw perpendicular AB = 1. "
                     "3. Join OB (hypotenuse). 4. OB = √2. 5. With O as center and OB as radius, "
                     "draw arc cutting number line at C. C represents √2.")
            
            steps = [
                "Step 1: Draw number line with point O at 0",
                "Step 2: Mark point A at 1 unit from O",
                "Step 3: At A, construct perpendicular AB = 1 unit using compass",
                "Step 4: Join O to B (right triangle OAB)",
                "Step 5: By Pythagoras: OB = √(OA² + AB²) = √(1 + 1) = √2",
                "Step 6: With O as center and radius OB, draw arc meeting number line at C",
                "Step 7: Point C represents √2 on the number line"
            ]
            
            verification = f"Verification: OB = √{1**2 + 1**2} = √2 ≈ {float(sqrt(2)):.4f}"
            
        else:
            # Construct √3 on number line
            question = ("Describe how to locate √3 on the number line geometrically. "
                       "Use the fact that √3 = √(1² + (√2)²).")
            
            answer = ("1. First construct √2 as above to get point C. 2. At C, draw perpendicular CD = 1. "
                     "3. Join OD = √(OC² + CD²) = √(2 + 1) = √3. 4. Mark this on number line.")
            
            steps = [
                "Step 1: First construct √2 on number line (point C)",
                "Step 2: At C, construct perpendicular CD = 1 unit",
                "Step 3: Join O to D (right triangle OCD with OC = √2, CD = 1)",
                "Step 4: By Pythagoras: OD = √(OC² + CD²) = √(2 + 1) = √3",
                "Step 5: With O as center and radius OD, draw arc meeting number line at E",
                "Step 6: Point E represents √3 on the number line"
            ]
            
            verification = f"Verification: OD = √{(sqrt(2)**2 + 1**2)} = √3 ≈ {float(sqrt(3)):.4f}"
        
        return GeneratedQuestion(
            node_id=node.node_id,
            question_text=question,
            correct_answer=answer,
            competency_type="standard",
            difficulty=node.difficulty,
            step_by_step=steps,
            verification=verification,
            marks=3,
            indian_context=False
        )
    
    def generate_question(self, node_id: str, competency_type: Optional[str] = None) -> GeneratedQuestion:
        """Generate a single question for the specified node."""
        if node_id not in self.nodes:
            raise ValueError(f"Unknown node_id: {node_id}")
        
        if competency_type is None:
            competency_type = self.rng.choice(["competency", "standard"])
        
        if node_id == "c9_math_001":
            return self.generate_c9_math_001_question(competency_type)
        elif node_id == "c9_math_002":
            return self.generate_c9_math_002_question(competency_type)
        elif node_id == "c9_math_003":
            return self.generate_c9_math_003_question(competency_type)
        else:
            raise ValueError(f"No generator implemented for node: {node_id}")
    
    def generate_batch(self, node_ids: List[str], questions_per_node: int = 2, 
                      competency_ratio: float = 0.5) -> List[GeneratedQuestion]:
        """Generate a batch of questions across multiple nodes."""
        questions = []
        
        for node_id in node_ids:
            for i in range(questions_per_node):
                if i < questions_per_node * competency_ratio:
                    comp_type = "competency"
                else:
                    comp_type = "standard"
                
                try:
                    q = self.generate_question(node_id, comp_type)
                    questions.append(q)
                except Exception as e:
                    print(f"Error generating question for {node_id}: {e}")
        
        return questions
    
    def get_node(self, node_id: str) -> QuestionNode:
        """Retrieve node information."""
        return self.nodes.get(node_id)
    
    def list_nodes(self) -> List[str]:
        """List all available node IDs."""
        return list(self.nodes.keys())

def main():
    """Demonstration of the question generator."""
    generator = DeterministicQuestionGenerator(seed=42)
    
    print("=" * 70)
    print("CLASS 9 MATHEMATICS - DETERMINISTIC QUESTION GENERATOR")
    print("Based on CISCE ICSE Mathematics Syllabus")
    print("=" * 70)
    print()
    
    available_nodes = generator.list_nodes()
    print(f"Available Nodes: {', '.join(available_nodes)}")
    print()
    
    # Generate sample questions for each node
    for node_id in available_nodes:
        node = generator.get_node(node_id)
        print(f"\n{'='*70}")
        print(f"NODE: {node_id}")
        print(f"TITLE: {node.title}")
        print(f"SECTION: {node.section}")
        print(f"DIFFICULTY: {node.difficulty} | LEVEL: {node.cognitive_level}")
        print(f"{'='*70}")
        
        # Generate one competency and one standard question
        for comp_type in ["competency", "standard"]:
            try:
                question = generator.generate_question(node_id, comp_type)
                print(f"\n[{comp_type.upper()}] [Marks: {question.marks}]")
                print(f"Q: {question.question_text}")
                if question.options:
                    for i, opt in enumerate(question.options, 1):
                        print(f"   {i}. {opt}")
                print(f"\nAnswer: {question.correct_answer}")
                print(f"\nStep-by-Step Solution:")
                for step in question.step_by_step:
                    print(f"  {step}")
                print(f"\nVerification: {question.verification}")
                print(f"Indian Context: {'Yes' if question.indian_context else 'No'}")
                print("-" * 70)
            except Exception as e:
                print(f"Error: {e}")
    
    print(f"\n{'='*70}")
    print("BATCH GENERATION EXAMPLE")
    print(f"{'='*70}")
    
    # Generate a batch
    batch = generator.generate_batch(
        node_ids=available_nodes,
        questions_per_node=2,
        competency_ratio=0.5
    )
    
    print(f"Generated {len(batch)} questions total")
    print(f"Competency questions: {sum(1 for q in batch if q.competency_type == 'competency')}")
    print(f"Standard questions: {sum(1 for q in batch if q.competency_type == 'standard')}")
    print(f"Indian context questions: {sum(1 for q in batch if q.indian_context)}")

if __name__ == "__main__":
    main()