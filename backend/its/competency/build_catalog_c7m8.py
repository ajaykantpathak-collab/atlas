"""Build concept catalog for Class 7 Maths Chapter 8 (Rational Numbers).
Extracted from gemh108.txt -- NCERT Class 7 Maths textbook.
"""
import json
import os

CATALOG = {
    "class": 7,
    "subject": "maths",
    "chapter": 8,
    "chapter_title": "Rational Numbers",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/gemh108.txt",
    "concepts": [
        {
            "id": "c7m8.2.1",
            "title": "Need for Rational Numbers",
            "section": "8.2",
            "definition": "Rational numbers extend the number system to include numbers that are neither integers nor fractions in the traditional sense, such as -3/4 (negative fractions).",
            "formula": "rational numbers extend integers and fractions",
            "key_idea": "Need numbers like -3/4 that are neither integers nor positive fractions.",
            "textbook_ref": "gemh108.txt lines 22-41",
            "question_patterns": [
                "why do we need rational numbers",
                "need for rational numbers",
                "represent 750m below sea level",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "identify situation", "explain": "Find a case where integers or fractions are insufficient"},
                {"step": 2, "action": "introduce rational number", "explain": "Use p/q form where p, q are integers, q != 0"},
            ],
        },
        {
            "id": "c7m8.3.1",
            "title": "What are Rational Numbers",
            "section": "8.3",
            "definition": "A rational number is a number that can be expressed as p/q where p and q are integers and q != 0. p is numerator, q is denominator. All integers and fractions are rational numbers.",
            "formula": "rational number = p/q, p and q integers, q != 0",
            "key_idea": "p/q form with integer p, q (q != 0). Includes integers and fractions.",
            "textbook_ref": "gemh108.txt lines 44-104",
            "question_patterns": [
                "what is a rational number",
                "is this a rational number",
                "list rational numbers",
                "is 2/3 rational",
                "is -3/4 rational",
                "is 0 a rational number",
                "is 5 a rational number",
                "numerator and denominator of rational number",
                "are integers rational numbers",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "check form", "explain": "Can it be written as p/q with integers p, q?"},
                {"step": 2, "action": "check denominator", "explain": "q must not be 0"},
                {"step": 3, "action": "conclude", "explain": "If yes, it is a rational number"},
            ],
        },
        {
            "id": "c7m8.3.2",
            "title": "Equivalent Rational Numbers",
            "section": "8.3",
            "definition": "Equivalent rational numbers are obtained by multiplying or dividing both numerator and denominator by the same non-zero integer. -2/3 = -4/6 = 10/-15.",
            "formula": "p/q = (p*n)/(q*n) = (p/n)/(q/n), n != 0",
            "key_idea": "Multiply or divide both num and denom by same non-zero integer.",
            "textbook_ref": "gemh108.txt lines 104-138",
            "question_patterns": [
                "find equivalent rational numbers",
                "fill in the boxes for equivalent",
                "are these equivalent rational numbers",
                "write equivalent form",
                "give four rational numbers equivalent to",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "choose multiplier or divisor", "explain": "Pick a non-zero integer"},
                {"step": 2, "action": "apply to both", "explain": "Multiply or divide both numerator and denominator"},
                {"step": 3, "action": "verify", "explain": "Result is equivalent to original"},
            ],
        },
        {
            "id": "c7m8.4.1",
            "title": "Positive and Negative Rational Numbers",
            "section": "8.4",
            "definition": "A positive rational number has both numerator and denominator positive (or both negative). A negative rational number has one of numerator or denominator negative. 0 is neither positive nor negative.",
            "formula": "positive: num and denom same sign; negative: opposite signs",
            "key_idea": "Same sign = positive, opposite sign = negative. 0 is neither.",
            "textbook_ref": "gemh108.txt lines 140-191",
            "question_patterns": [
                "is this a positive rational number",
                "is this a negative rational number",
                "list positive rational numbers",
                "list negative rational numbers",
                "which are negative rational numbers",
                "is 0 positive or negative",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "check signs", "explain": "Look at signs of numerator and denominator"},
                {"step": 2, "action": "classify", "explain": "Same sign (after standardizing) = positive. Opposite = negative. 0 = neither."},
            ],
        },
        {
            "id": "c7m8.5.1",
            "title": "Rational Numbers on Number Line",
            "section": "8.5",
            "definition": "Rational numbers are represented on a number line: positive to the right of 0, negative to the left. -1/2 is at half distance between 0 and -1.",
            "formula": "positive right of 0, negative left of 0",
            "key_idea": "Positive right, negative left, at proper fractional distance.",
            "textbook_ref": "gemh108.txt lines 192-254",
            "question_patterns": [
                "represent rational number on number line",
                "draw number line and represent",
                "where is -1/2 on number line",
                "mark the rational number",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {"step": 1, "action": "determine side", "explain": "Positive: right of 0. Negative: left of 0."},
                {"step": 2, "action": "find position", "explain": "Distance from 0 = |numerator/denominator|"},
                {"step": 3, "action": "mark point", "explain": "Place at the correct fractional distance"},
            ],
        },
        {
            "id": "c7m8.6.1",
            "title": "Rational Numbers in Standard Form",
            "section": "8.6",
            "definition": "A rational number is in standard form if denominator is positive and numerator and denominator have no common factor other than 1. Reduce by dividing by HCF.",
            "formula": "standard: positive denom, HCF(num, denom) = 1",
            "key_idea": "Denominator positive, no common factor. Divide by HCF.",
            "textbook_ref": "gemh108.txt lines 255-310",
            "question_patterns": [
                "reduce to standard form",
                "find standard form",
                "write in simplest form",
                "rewrite in simplest form",
                "reduce the rational number",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "find HCF", "explain": "HCF of |numerator| and |denominator|"},
                {"step": 2, "action": "divide both", "explain": "Divide numerator and denominator by HCF (or -HCF if denominator is negative)"},
                {"step": 3, "action": "ensure positive denominator", "explain": "If denominator negative, multiply both by -1"},
            ],
        },
        {
            "id": "c7m8.7.1",
            "title": "Comparison of Rational Numbers",
            "section": "8.7",
            "definition": "To compare rational numbers: positive > negative. For two positives, compare as fractions. For two negatives, compare ignoring signs then reverse. Use common denominators or standard form.",
            "formula": "positive > 0 > negative; for negatives, larger absolute value is smaller",
            "key_idea": "Positive > negative. For two negatives, reverse the order.",
            "textbook_ref": "gemh108.txt lines 313-394",
            "question_patterns": [
                "which is greater",
                "compare the rational numbers",
                "fill with > < or =",
                "which is greater -2/3 or -4/5",
                "compare -1/2 and -1/5",
                "do these represent same rational number",
                "arrange in ascending order",
                "write in ascending order",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "check signs", "explain": "Positive > 0 > negative"},
                {"step": 2, "action": "if both positive", "explain": "Compare as fractions using common denominator"},
                {"step": 3, "action": "if both negative", "explain": "Compare absolute values, then reverse the order"},
                {"step": 4, "action": "if different forms", "explain": "Convert to standard form or common denominator first"},
            ],
        },
        {
            "id": "c7m8.8.1",
            "title": "Rational Numbers Between Two Rational Numbers",
            "section": "8.8",
            "definition": "There are unlimited rational numbers between any two different rational numbers. Find by converting to common denominator and listing values in between.",
            "formula": "unlimited rational numbers between any two",
            "key_idea": "Unlimited rationals between any two. Use common denominator.",
            "textbook_ref": "gemh108.txt lines 395-487",
            "question_patterns": [
                "find rational numbers between",
                "list five rational numbers between",
                "find three rational numbers between",
                "write four more numbers in pattern",
                "list rational numbers between -2 and -1",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "convert to common denominator", "explain": "Find LCM of denominators"},
                {"step": 2, "action": "rewrite both", "explain": "Express both with common denominator"},
                {"step": 3, "action": "list values between", "explain": "Choose numerators between the two"},
                {"step": 4, "action": "more if needed", "explain": "Multiply by larger number for more values"},
            ],
        },
        {
            "id": "c7m8.9.1",
            "title": "Addition of Rational Numbers",
            "section": "8.9.1",
            "definition": "Same denominators: add numerators, keep denominator. Different denominators: find LCM, convert to equivalent with LCM denominator, then add. Additive inverse of p/q is -p/q.",
            "formula": "same denom: (a/c)+(b/c)=(a+b)/c; diff denom: use LCM",
            "key_idea": "Same denom: add numerators. Diff denom: use LCM.",
            "textbook_ref": "gemh108.txt lines 556-675",
            "question_patterns": [
                "find the sum",
                "add the rational numbers",
                "find sum of rational numbers",
                "add -7/5 and -2/3",
                "additive inverse of",
                "satpal walks east and west problem",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "check denominators", "explain": "Are they the same?"},
                {"step": 2, "action": "if same", "explain": "Add numerators, keep denominator"},
                {"step": 3, "action": "if different", "explain": "Find LCM of denominators, convert each to equivalent with LCM, then add numerators"},
                {"step": 4, "action": "simplify", "explain": "Reduce to standard form if needed"},
            ],
        },
        {
            "id": "c7m8.9.2",
            "title": "Subtraction of Rational Numbers",
            "section": "8.9.2",
            "definition": "To subtract, add the additive inverse. a - b = a + (-b). Same denominator: subtract numerators. Different: use LCM.",
            "formula": "a - b = a + (-b); additive inverse of p/q is -p/q",
            "key_idea": "Subtract = add additive inverse.",
            "textbook_ref": "gemh108.txt lines 676-708",
            "question_patterns": [
                "find the difference",
                "subtract the rational numbers",
                "find a - b",
                "subtract 5/7 - 3/8",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "find additive inverse", "explain": "Additive inverse of b is -b"},
                {"step": 2, "action": "add", "explain": "Compute a + (-b) using addition rules"},
                {"step": 3, "action": "simplify", "explain": "Reduce to standard form"},
            ],
        },
        {
            "id": "c7m8.9.3",
            "title": "Multiplication of Rational Numbers",
            "section": "8.9.3",
            "definition": "Multiply numerators together and denominators together. (a/b) x (c/d) = (a*c)/(b*d).",
            "formula": "(a/b) x (c/d) = (a*c)/(b*d)",
            "key_idea": "Multiply numerators, multiply denominators.",
            "textbook_ref": "gemh108.txt lines 709-768",
            "question_patterns": [
                "find the product",
                "multiply the rational numbers",
                "find -3/5 x 2/7",
                "multiply by integer",
                "multiply by negative integer",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "multiply numerators", "explain": "product_num = num1 x num2"},
                {"step": 2, "action": "multiply denominators", "explain": "product_denom = denom1 x denom2"},
                {"step": 3, "action": "simplify", "explain": "Reduce to standard form"},
            ],
        },
        {
            "id": "c7m8.9.4",
            "title": "Division of Rational Numbers",
            "section": "8.9.4",
            "definition": "To divide, multiply by the reciprocal. (a/b) / (c/d) = (a/b) x (d/c). Reciprocal of p/q is q/p. Product of a number and its reciprocal is 1.",
            "formula": "(a/b) / (c/d) = (a/b) x (d/c); reciprocal of p/q = q/p",
            "key_idea": "Divide = multiply by reciprocal.",
            "textbook_ref": "gemh108.txt lines 770-829",
            "question_patterns": [
                "find the value",
                "divide the rational numbers",
                "find reciprocal",
                "find a/b divided by c/d",
                "product of reciprocals",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {"step": 1, "action": "find reciprocal", "explain": "Reciprocal of divisor (c/d) is (d/c)"},
                {"step": 2, "action": "multiply", "explain": "(a/b) x (d/c) = (a*d)/(b*c)"},
                {"step": 3, "action": "simplify", "explain": "Reduce to standard form"},
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "gemh108.txt lines 276-285",
            "concept": "c7m8.6.1",
            "question_type": "reduce_standard_form",
            "question_pattern": "reduce {num}/{denom} to standard form",
            "extracted_variables": {
                "num": "numerator",
                "denom": "denominator",
            },
            "solution_template": [
                {"step": 1, "action": "find HCF", "explain": "HCF of |num| and |denom|"},
                {"step": 2, "action": "divide both by HCF", "explain": "Divide numerator and denominator by HCF"},
                {"step": 3, "action": "ensure positive denominator", "explain": "If denominator negative, multiply both by -1"},
            ],
        },
        {
            "id": "ex2",
            "source_ref": "gemh108.txt lines 290-304",
            "concept": "c7m8.6.1",
            "question_type": "reduce_with_negative_denom",
            "question_pattern": "reduce {num}/{denom} (negative denominator) to standard form",
            "extracted_variables": {
                "num": "numerator",
                "denom": "denominator (negative)",
            },
            "solution_template": [
                {"step": 1, "action": "find HCF", "explain": "HCF of |num| and |denom|"},
                {"step": 2, "action": "divide by -HCF", "explain": "Divide by -HCF to make denominator positive"},
                {"step": 3, "action": "verify", "explain": "Denominator should be positive, no common factor"},
            ],
        },
        {
            "id": "ex3",
            "source_ref": "gemh108.txt lines 390-394",
            "concept": "c7m8.3.2",
            "question_type": "check_same_rational",
            "question_pattern": "do {a/b} and {c/d} represent the same rational number?",
            "extracted_variables": {
                "a": "first numerator",
                "b": "first denominator",
                "c": "second numerator",
                "d": "second denominator",
            },
            "solution_template": [
                {"step": 1, "action": "convert to standard form", "explain": "Reduce both to standard form"},
                {"step": 2, "action": "compare", "explain": "If standard forms match, they are the same"},
            ],
        },
        {
            "id": "ex4",
            "source_ref": "gemh108.txt lines 459-472",
            "concept": "c7m8.8.1",
            "question_type": "find_rationals_between",
            "question_pattern": "list three rational numbers between {a} and {b}",
            "extracted_variables": {
                "a": "first rational",
                "b": "second rational",
            },
            "solution_template": [
                {"step": 1, "action": "convert to common denominator", "explain": "Choose a denominator larger than both"},
                {"step": 2, "action": "rewrite both", "explain": "Express a and b with common denominator"},
                {"step": 3, "action": "list values between", "explain": "Choose numerators between the two values"},
            ],
        },
        {
            "id": "ex5",
            "source_ref": "gemh108.txt lines 473-487",
            "concept": "c7m8.3.2",
            "question_type": "find_pattern_numbers",
            "question_pattern": "write four more numbers in the pattern {sequence}",
            "extracted_variables": {
                "sequence": "given pattern of rational numbers",
            },
            "solution_template": [
                {"step": 1, "action": "identify pattern", "explain": "Find the multiplier or divisor pattern"},
                {"step": 2, "action": "continue pattern", "explain": "Apply the same operation to generate next numbers"},
            ],
        },
        {
            "id": "ex6",
            "source_ref": "gemh108.txt lines 658-675",
            "concept": "c7m8.9.1",
            "question_type": "word_problem_addition",
            "question_pattern": "satpal walks {east} km east then {west} km west. where is he from P?",
            "extracted_variables": {
                "east": "distance east",
                "west": "distance west",
            },
            "solution_template": [
                {"step": 1, "action": "assign signs", "explain": "East = positive, west = negative"},
                {"step": 2, "action": "add", "explain": "total = east + (-west)"},
                {"step": 3, "action": "find LCM", "explain": "Find LCM of denominators"},
                {"step": 4, "action": "compute sum", "explain": "Add the converted fractions"},
                {"step": 5, "action": "interpret", "explain": "Positive = east, negative = west of P"},
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex8.1",
            "source_ref": "gemh108.txt lines 489-551",
            "questions": [
                "List five rational numbers between: -1 and 0; -2 and -1; -4/5 and -2/3; 1/2 and 2/3",
                "Write four more rational numbers in patterns: -3/5,-6/10,-9/15,-12/20; -1/4,-2/8,-3/12; -1/6,2/-12,-18/-24; -2/3,2/-3,-6/-4",
                "Give four rational numbers equivalent to: -2/7; 5/-3; 4/9",
                "Draw number line and represent: 3/4; -5/8; -7/4; 7/8",
                "Points P,Q,R,S,T,U,A,B on number line. Name rational numbers represented by P,Q,R,S",
                "Which pairs represent same rational number: -7/21 and 3/9; -16/20 and 20/-25; -2/3 and 2/3; -3/5 and -12/20; 8/-5 and -24/15; 1/3 and -1/9; -5/-9 and 5/-9",
                "Rewrite in simplest form: -8/6; 25/45; -44/72; -8/10",
                "Fill > < or =: -5/7 and 2/3; -4/5 and -5/7; -7/8 and 14/-16; -8/5 and -7/4; 1/-3 and -1/4; 5/-11 and -5/11; -7/6 and 0",
                "Which is greater: 2/3 or 5/2; -5/6 or -4/3; -3/4 or 2/-3; -1/4 or 1/4; -3 2/7 or -3 4/5",
                "Write in ascending order: -3/5,-2/5,-1/5; -1/3,-2/9,-4/3; -3/7,-3/2,-3/4",
            ],
        },
        {
            "id": "ex8.2",
            "source_ref": "gemh108.txt lines 831-865",
            "questions": [
                "Find the sum: 5/4 + (-11/4); 5/3 + 3/5; -9/10 + 22/15; -3/-11 + 5/9; -8/19 + (-2)/57; -2/3 + 0; -2 1/3 + 4 1/5",
                "Find: 7/24 - 17/36; 5/63 - (-6)/21; -6/13 - (-7)/15; -3/8 - 7/11; -2 1/9 - 6",
                "Find product: 9/2 x (-7/4); 3/10 x (-9); 3/-11 x 9/5; 3/7 x (-2/5); 3/11 x 2/5; 3/-5 x -5/3",
                "Find value: (-4) / 2/3; -3/5 / 2; -4/5 / (-3); -1/8 / 3/4; -2/13 / 1/7; -7/12 / (-2/13); 3/13 / (-4/65)",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "catalog_class7_maths_ch8_rational_numbers.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
