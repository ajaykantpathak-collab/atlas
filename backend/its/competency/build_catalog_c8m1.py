"""Build concept catalog for Class 8 Maths Chapter 1 (Rational Numbers).
Extracted from hemh101.txt -- NCERT Class 8 Maths textbook (Reprint 2024-25).
Note: this file of the chapter covers sections 1.1-1.2.6 only (abridged on disk).
"""
import json
import os

CATALOG = {
    "class": 8,
    "subject": "maths",
    "chapter": 1,
    "chapter_title": "Rational Numbers",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/hemh101.txt",
    "concepts": [
        {
            "id": "c8m1.2.1",
            "title": "Rational Numbers and Closure",
            "section": "1.2.1",
            "definition": "A number which can be written in the form p/q, where p and q are integers and q != 0, is called a rational number. Rational numbers are closed under addition, subtraction and multiplication: for any two rational numbers a and b, a + b, a - b and a x b are also rational numbers. For any rational number a, a / 0 is not defined, so rational numbers are not closed under division.",
            "formula": "a/b + c/d = (a*d + c*b) / (b*d); a/b - c/d = (a*d - c*b) / (b*d); a/b x c/d = (a*c) / (b*d); a / 0 is not defined",
            "key_idea": "Sum, difference and product of rational numbers are rational; division by 0 is not defined.",
            "textbook_ref": "hemh101.txt lines 91-165",
            "question_patterns": [
                "find the sum of two rational numbers",
                "find 3/7 + (-5)/8",
                "add rational numbers",
                "find the difference of two rational numbers",
                "find 5/8 - 2/3",
                "subtract rational numbers",
                "find the product of two rational numbers",
                "multiply rational numbers",
                "find (-2)/3 x 4/5",
                "divide rational numbers",
                "is the sum of two rational numbers again a rational number",
                "check closure property for rational numbers",
                "name the property under addition used in the following",
                "what is a rational number",
                "is 0 a rational number",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "take LCM of denominators",
                    "explain": "LCM of b and d is the common denominator",
                    "compute": "b * d",
                },
                {
                    "step": 2,
                    "action": "add numerators over common denominator",
                    "explain": "a/b + c/d = (a*d + c*b) / (b*d)",
                    "compute": "(a * d + c * b) / (b * d)",
                },
                {
                    "step": 3,
                    "action": "for subtraction",
                    "explain": "a/b - c/d = (a*d - c*b) / (b*d)",
                    "compute": "(a * d - c * b) / (b * d)",
                },
                {
                    "step": 4,
                    "action": "for multiplication",
                    "explain": "a/b x c/d = (a*c) / (b*d)",
                    "compute": "(a * c) / (b * d)",
                },
                {
                    "step": 5,
                    "action": "for division",
                    "explain": "a/b divided by c/d = (a*d) / (b*c); a / 0 is not defined",
                    "compute": "(a * d) / (b * c)",
                },
            ],
        },
        {
            "id": "c8m1.2.2",
            "title": "Commutativity of Rational Numbers",
            "section": "1.2.2",
            "definition": "Two rational numbers can be added in any order: addition is commutative for rational numbers, that is, for any two rational numbers a and b, a + b = b + a. Multiplication is commutative for rational numbers: a x b = b x a. Subtraction is not commutative for rational numbers. Division is not commutative for rational numbers.",
            "formula": "a + b = b + a; a x b = b x a",
            "key_idea": "Addition and multiplication commute; subtraction and division do not.",
            "textbook_ref": "hemh101.txt lines 169-250",
            "question_patterns": [
                "is addition of rational numbers commutative",
                "check commutativity for rational numbers",
                "is a plus b equal to b plus a for rational numbers",
                "is subtraction commutative for rational numbers",
                "is division commutative for rational numbers",
                "is multiplication commutative for rational numbers",
                "verify commutative property with two rational numbers",
                "check whether x/y + m/n = m/n + x/y",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute a + b",
                    "explain": "Add in the given order",
                    "compute": "a + b",
                },
                {
                    "step": 2,
                    "action": "compute b + a",
                    "explain": "Add in the reverse order",
                    "compute": "b + a",
                },
                {
                    "step": 3,
                    "action": "compare",
                    "explain": "If both sums are equal, addition is commutative",
                },
            ],
        },
        {
            "id": "c8m1.2.3",
            "title": "Associativity of Rational Numbers",
            "section": "1.2.3",
            "definition": "Addition is associative for rational numbers: for any three rational numbers a, b and c, a + (b + c) = (a + b) + c. Multiplication is associative for rational numbers: a x (b x c) = (a x b) x c. Subtraction is not associative for rational numbers. Division is not associative for rational numbers.",
            "formula": "a + (b + c) = (a + b) + c; a x (b x c) = (a x b) x c",
            "key_idea": "Grouping does not matter for addition and multiplication of rationals.",
            "textbook_ref": "hemh101.txt lines 254-362",
            "question_patterns": [
                "is addition of rational numbers associative",
                "check associativity for rational numbers",
                "verify a plus b plus c grouped differently",
                "is subtraction associative for rational numbers",
                "is division associative for rational numbers",
                "is multiplication associative for rational numbers",
                "verify associative property with three rational numbers",
                "find sum of three rational numbers by grouping",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute a + (b + c)",
                    "explain": "Add b and c first, then add a",
                },
                {
                    "step": 2,
                    "action": "compute (a + b) + c",
                    "explain": "Add a and b first, then add c",
                },
                {
                    "step": 3,
                    "action": "compare",
                    "explain": "If both results are equal, addition is associative",
                },
            ],
        },
        {
            "id": "c8m1.2.4",
            "title": "The Role of Zero (Additive Identity)",
            "section": "1.2.4",
            "definition": "When you add 0 to a rational number, the sum is again that rational number. In general, c + 0 = 0 + c = c, where c is a rational number. Zero is called the identity for the addition of rational numbers. It is the additive identity for integers and whole numbers as well.",
            "formula": "a + 0 = 0 + a = a",
            "key_idea": "0 added to any rational number gives the same number; 0 is the additive identity.",
            "textbook_ref": "hemh101.txt lines 420-438",
            "question_patterns": [
                "what is the additive identity for rational numbers",
                "name the property c + 0 = c",
                "find c + 0",
                "what do we get when we add zero to a rational number",
                "which rational number is the identity for addition",
                "role of zero in addition",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "apply additive identity",
                    "explain": "c + 0 = 0 + c = c",
                    "compute": "a + 0",
                },
            ],
        },
        {
            "id": "c8m1.2.5",
            "title": "The Role of 1 (Multiplicative Identity)",
            "section": "1.2.5",
            "definition": "When you multiply any rational number with 1, you get back the same rational number as the product. That is, a x 1 = 1 x a = a for any rational number a. We say that 1 is the multiplicative identity for rational numbers.",
            "formula": "a x 1 = 1 x a = a",
            "key_idea": "Multiplying by 1 leaves a rational number unchanged; 1 is the multiplicative identity.",
            "textbook_ref": "hemh101.txt lines 439-453",
            "question_patterns": [
                "what is the multiplicative identity for rational numbers",
                "name the property a x 1 = a",
                "find a multiplied by 1",
                "what do we get when we multiply a rational number by 1",
                "which number is the identity for multiplication",
                "role of 1 in multiplication",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "apply multiplicative identity",
                    "explain": "a x 1 = 1 x a = a",
                    "compute": "a * 1",
                },
            ],
        },
        {
            "id": "c8m1.2.6",
            "title": "Distributivity of Multiplication over Addition",
            "section": "1.2.6",
            "definition": "Distributivity of multiplication over addition and subtraction holds for all rational numbers a, b and c: a (b + c) = ab + ac and a (b - c) = ab - ac.",
            "formula": "a x (b + c) = a x b + a x c; a x (b - c) = a x b - a x c",
            "key_idea": "Multiply each term inside the bracket separately and add or subtract.",
            "textbook_ref": "hemh101.txt lines 457-504",
            "question_patterns": [
                "find using distributivity",
                "find a times b plus c using distributivity",
                "verify distributive property for rational numbers",
                "is multiplication distributive over addition",
                "simplify using distributive law",
                "find a times b minus c",
                "name the property a(b + c) = ab + ac",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute a x (b + c)",
                    "explain": "Add b and c first, then multiply by a",
                    "compute": "a * (b + c)",
                },
                {
                    "step": 2,
                    "action": "compute a x b + a x c",
                    "explain": "Multiply separately then add",
                    "compute": "a * b + a * c",
                },
                {
                    "step": 3,
                    "action": "compare",
                    "explain": "Both sides are equal, so distributivity holds",
                },
            ],
        },
        {
            "id": "c8m1.2.7",
            "title": "Rational Numbers Between Two Rational Numbers",
            "section": "1.2",
            "definition": "Between any two given rational numbers there are countless rational numbers. The idea of mean helps us to find rational numbers between two rational numbers.",
            "formula": "mean = (a + b) / 2",
            "key_idea": "The mean of two rational numbers gives a rational number between them.",
            "textbook_ref": "hemh101.txt lines 530-531 (What Have We Discussed, point 6)",
            "question_patterns": [
                "find a rational number between two rational numbers",
                "find a rational number between 1/4 and 1/2",
                "how many rational numbers are there between two rational numbers",
                "insert rational numbers between two given rational numbers",
                "find the mean of two rational numbers",
                "find three rational numbers between",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find the mean of the two rational numbers",
                    "explain": "Mean of a and b is (a + b) / 2",
                    "compute": "(a + b) / 2",
                },
                {
                    "step": 2,
                    "action": "repeat if more numbers needed",
                    "explain": "Take means with the endpoints to insert more rational numbers",
                },
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "hemh101.txt lines 363-394",
            "concept": "c8m1.2.1",
            "question_type": "add_rationals",
            "question_pattern": "find {a}/{b} + {c}/{d} + {e}/{f}",
            "extracted_variables": {
                "a": "numerator of first rational",
                "b": "denominator of first rational",
                "c": "numerator of second rational",
                "d": "denominator of second rational",
                "e": "numerator of third rational",
                "f": "denominator of third rational",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "find LCM of denominators",
                    "explain": "The LCM of the denominators is the common denominator",
                },
                {
                    "step": 2,
                    "action": "express each fraction with the LCM",
                    "explain": "Multiply numerator and denominator to make each denominator the LCM",
                },
                {
                    "step": 3,
                    "action": "add the numerators",
                    "explain": "Keep the common denominator and add numerators",
                },
                {
                    "step": 4,
                    "action": "simplify",
                    "explain": "Reduce the resulting fraction to simplest form",
                },
            ],
        },
        {
            "id": "ex2",
            "source_ref": "hemh101.txt lines 395-419",
            "concept": "c8m1.2.1",
            "question_type": "multiply_rationals",
            "question_pattern": "find {a}/{b} x {c}/{d} x {e}/{f} x {g}/{h}",
            "extracted_variables": {
                "a": "first numerator",
                "b": "first denominator",
                "c": "second numerator",
                "d": "second denominator",
                "e": "third numerator",
                "f": "third denominator",
                "g": "fourth numerator",
                "h": "fourth denominator",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "group using commutativity and associativity",
                    "explain": "Rearrange so easy pairs multiply first",
                },
                {
                    "step": 2,
                    "action": "multiply numerators and denominators",
                    "explain": "Product of numerators over product of denominators",
                    "compute": "(a * c * e * g) / (b * d * f * h)",
                },
                {
                    "step": 3,
                    "action": "simplify",
                    "explain": "Cancel common factors and reduce",
                },
            ],
        },
        {
            "id": "ex3",
            "source_ref": "hemh101.txt lines 490-504",
            "concept": "c8m1.2.6",
            "question_type": "use_distributivity",
            "question_pattern": "find {a}/{b} x {c}/{d} - {e}/{f} x {c}/{d}",
            "extracted_variables": {
                "a": "first numerator",
                "b": "first denominator",
                "c": "common numerator",
                "d": "common denominator",
                "e": "second numerator",
                "f": "second denominator",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "rearrange by commutativity",
                    "explain": "Bring the common factor to the front of both products",
                },
                {
                    "step": 2,
                    "action": "apply distributivity",
                    "explain": "common x (first + (-second)) - leftover term",
                },
                {
                    "step": 3,
                    "action": "compute",
                    "explain": "Evaluate the bracket then multiply and subtract",
                },
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex1.1",
            "source_ref": "hemh101.txt lines 505-517 (Exercise 1.1)",
            "questions": [
                "Name the property under multiplication used in each: (-4/5) x 1 = 1 x (-4/5) = -4/5; (-13/17) x (-2/7) = (-2/7) x (-13/17); (-19/29) x (29/-19) = 1",
                "Tell what property allows you to compute 1/3 x (6 x 4/3) as (1/3 x 6) x 4/3",
                "The product of two rational numbers is always a ___",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "catalog_class8_maths_ch1_rational_numbers.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
