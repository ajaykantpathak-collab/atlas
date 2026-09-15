"""Build concept catalog for Class 8 Maths Chapter 6 (Cubes and Cube Roots).
Extracted from hemh106.txt -- NCERT Class 8 Maths textbook (Reprint 2024-25).
"""
import json
import os

CATALOG = {
    "class": 8,
    "subject": "maths",
    "chapter": 6,
    "chapter_title": "Cubes and Cube Roots",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/hemh106.txt",
    "concepts": [
        {
            "id": "c8m6.2.1",
            "title": "Cube Numbers",
            "section": "6.2",
            "definition": "The numbers 1, 8, 27, ... are called perfect cubes or cube numbers. Each of them is obtained when a number is multiplied by taking it three times: 1 = 1 x 1 x 1 = 1^3; 8 = 2 x 2 x 2 = 2^3; 27 = 3 x 3 x 3 = 3^3. 9 is not a perfect cube. Cubes of even numbers are even and cubes of odd numbers are odd. Numbers like 1729, 4104, 13832 are known as Hardy-Ramanujan Numbers; they can be expressed as a sum of two cubes in two different ways.",
            "formula": "n^3 = n x n x n",
            "key_idea": "A cube number is a number taken three times as a factor.",
            "textbook_ref": "hemh106.txt lines 5-66, 270-272",
            "question_patterns": [
                "what are perfect cubes",
                "is 125 a cube number",
                "is 9 a perfect cube",
                "find the cube of 5",
                "which of the following are perfect cubes",
                "what is a hardy ramanujan number",
                "express 1729 as a sum of two cubes",
                "are cubes of even numbers even",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "multiply the number three times",
                    "explain": "n^3 = n x n x n",
                    "compute": "number ** 3",
                },
                {
                    "step": 2,
                    "action": "to test a perfect cube",
                    "explain": "Look for a natural number whose cube equals the given number",
                    "compute": "number ** (1.0 / 3)",
                },
            ],
        },
        {
            "id": "c8m6.2.2",
            "title": "Adding Consecutive Odd Numbers (Cube Pattern)",
            "section": "6.2.1",
            "definition": "Observe the pattern of sums of odd numbers: 1 = 1^3; 3 + 5 = 8 = 2^3; 7 + 9 + 11 = 27 = 3^3; 13 + 15 + 17 + 19 = 64 = 4^3; 21 + 23 + 25 + 27 + 29 = 125 = 5^3. Also 2^3 - 1^3 = 1 + 2 x 1 x 3; 3^3 - 2^3 = 1 + 3 x 2 x 3; 4^3 - 3^3 = 1 + 4 x 3 x 3.",
            "formula": "sum of consecutive odd numbers starting at pattern gives n^3; n^3 - (n-1)^3 = 1 + n x (n-1) x 3",
            "key_idea": "Cubes are sums of consecutive odd numbers in a fixed pattern.",
            "textbook_ref": "hemh106.txt lines 93-111",
            "question_patterns": [
                "how many consecutive odd numbers are needed to obtain the sum as 10 cubed",
                "express 6 cubed as the sum of odd numbers using the pattern",
                "express 8 cubed as the sum of odd numbers",
                "find the value of 7 cubed minus 6 cubed using the pattern",
                "find 12 cubed minus 11 cubed using the pattern",
                "cube as sum of consecutive odd numbers",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify n in the pattern",
                    "explain": "The cube of n is the sum of n consecutive odd numbers per the pattern",
                },
                {
                    "step": 2,
                    "action": "for a difference of cubes",
                    "explain": "n^3 - (n-1)^3 = 1 + n x (n-1) x 3",
                    "compute": "1 + n * (n - 1) * 3",
                },
                {
                    "step": 3,
                    "action": "verify with the cube",
                    "explain": "Check against n^3 = n x n x n",
                    "compute": "n ** 3",
                },
            ],
        },
        {
            "id": "c8m6.2.3",
            "title": "Cubes and Their Prime Factors",
            "section": "6.2.1",
            "definition": "Each prime factor of a number appears three times in the prime factorisation of its cube. In the prime factorisation of any number, if each factor appears three times, then the number is a perfect cube. For example 216 = 2 x 2 x 2 x 3 x 3 x 3 = 2^3 x 3^3 = (2 x 3)^3 = 6^3, so 216 is a perfect cube; 500 = 2 x 2 x 5 x 5 x 5 is not a perfect cube.",
            "formula": "each prime factor appears 3 times = perfect cube",
            "key_idea": "Perfect cube: every prime factor in a group of three (triplet).",
            "textbook_ref": "hemh106.txt lines 112-150, 275-276",
            "question_patterns": [
                "is 243 a perfect cube",
                "is 216 a perfect cube",
                "is 392 a perfect cube",
                "check whether the number is a perfect cube",
                "which of the following are not perfect cubes",
                "is 729 a perfect cube",
                "why is 500 not a perfect cube",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "write the prime factorisation",
                    "explain": "Divide repeatedly by primes 2, 3, 5, 7 ...",
                },
                {
                    "step": 2,
                    "action": "group the factors in triples",
                    "explain": "Each prime must appear in a group of three",
                },
                {
                    "step": 3,
                    "action": "conclude",
                    "explain": "If any prime is left over without a triplet, the number is not a perfect cube",
                },
            ],
        },
        {
            "id": "c8m6.2.4",
            "title": "Smallest Multiple that is a Perfect Cube",
            "section": "6.2.2",
            "definition": "To make a number a perfect cube, look at the prime factorisation: if a prime does not appear in a group of three, multiply or divide by the smallest number so that every prime gets a triplet. For example 392 = 2 x 2 x 2 x 7 x 7, so we need one more 7 and 392 x 7 = 2744 is a perfect cube. For division, divide out the primes that have no triplet, e.g. 53240 divided by 5.",
            "formula": "multiply (or divide) by the product of primes lacking a triplet",
            "key_idea": "Complete (or remove) ungrouped primes so all primes form triplets.",
            "textbook_ref": "hemh106.txt lines 155-206",
            "question_patterns": [
                "find the smallest number by which 243 must be multiplied to obtain a perfect cube",
                "find the smallest number by which 256 must be multiplied to obtain a perfect cube",
                "find the smallest number by which 81 must be divided to obtain a perfect cube",
                "find the smallest number by which 128 must be divided to obtain a perfect cube",
                "how many such cuboids will he need to form a cube",
                "by which smallest natural number should the number be divided so that the quotient is a perfect cube",
                "is 392 a perfect cube if not find the smallest number to multiply",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Write the number as a product of primes",
                },
                {
                    "step": 2,
                    "action": "find ungrouped primes",
                    "explain": "Locate primes that do not appear in a group of three",
                },
                {
                    "step": 3,
                    "action": "multiply (or divide) by the leftover primes",
                    "explain": "The multiplier is the product of the ungrouped primes",
                    "compute": "factor",
                },
                {
                    "step": 4,
                    "action": "verify the cube",
                    "explain": "The new number has every prime in a triplet, so it is a perfect cube",
                    "compute": "number * factor",
                },
            ],
        },
        {
            "id": "c8m6.3.1",
            "title": "Cube Roots",
            "section": "6.3",
            "definition": "Finding the square root, as you know, is the inverse operation of squaring. Similarly, finding the cube root is the inverse operation of finding cube. We know that 2^3 = 8, so we say that the cube root of 8 is 2. The cube-root symbol is written with a small 3. For example cube root of 27 = 3, cube root of 125 = 5, cube root of 1000 = 10.",
            "formula": "cube root of n^3 = n",
            "key_idea": "Cube root undoes cubing.",
            "textbook_ref": "hemh106.txt lines 224-237, 277",
            "question_patterns": [
                "what is the cube root of 8",
                "find the cube root of 125",
                "what is a cube root",
                "find the cube root of the number",
                "which number has cube root 7",
                "state true or false cube root questions",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find the number whose cube is given",
                    "explain": "Cube root is the inverse of cubing",
                    "compute": "number ** (1.0 / 3)",
                },
            ],
        },
        {
            "id": "c8m6.3.2",
            "title": "Cube Root by Prime Factorisation",
            "section": "6.3.1",
            "definition": "To find a cube root by prime factorisation, write the prime factorisation and group the factors in triples; take one factor from each triplet and multiply. For example 3375 = 3 x 3 x 3 x 5 x 5 x 5 = 3^3 x 5^3 = (3 x 5)^3, therefore cube root of 3375 = 3 x 5 = 15. Similarly 74088 = 2^3 x 3^3 x 7^3, therefore cube root of 74088 = 2 x 3 x 7 = 42.",
            "formula": "cube root = product of one factor from each triplet",
            "key_idea": "Group primes in triples; take one from each triple and multiply.",
            "textbook_ref": "hemh106.txt lines 238-254",
            "question_patterns": [
                "find the cube root of 64 by prime factorisation method",
                "find the cube root of 512",
                "find the cube root of 10648",
                "find the cube root of 27000",
                "find the cube root of 15625",
                "find the cube root of 13824 by prime factorisation method",
                "find the cube root of 91125",
                "cube root by grouping triplets",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Write the number as a product of primes",
                },
                {
                    "step": 2,
                    "action": "group in triples",
                    "explain": "Write as (factor)^3 x (factor)^3 x ...",
                },
                {
                    "step": 3,
                    "action": "take one from each triple",
                    "explain": "The product of one factor from each triplet is the cube root",
                    "compute": "number ** (1.0 / 3)",
                },
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "hemh106.txt lines 145-150 (Example 1)",
            "concept": "c8m6.2.3",
            "question_type": "is_perfect_cube",
            "question_pattern": "is {number} a perfect cube",
            "extracted_variables": {
                "number": "the number to test",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Write the number as a product of primes",
                },
                {
                    "step": 2,
                    "action": "group in triplets",
                    "explain": "If some primes remain after grouping in triplets, it is not a perfect cube",
                },
                {
                    "step": 3,
                    "action": "conclude",
                    "explain": "All in triplets = perfect cube; leftovers = not a perfect cube",
                },
            ],
        },
        {
            "id": "ex2",
            "source_ref": "hemh106.txt lines 163-173 (Example 2)",
            "concept": "c8m6.2.4",
            "question_type": "multiply_to_cube",
            "question_pattern": "find the smallest natural number by which {number} must be multiplied so that the product is a perfect cube",
            "extracted_variables": {
                "number": "the given number",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Find primes not appearing in a group of three",
                },
                {
                    "step": 2,
                    "action": "find the multiplier",
                    "explain": "One more of each ungrouped prime is needed",
                },
                {
                    "step": 3,
                    "action": "multiply and verify",
                    "explain": "number x multiplier is a perfect cube",
                    "compute": "number * factor",
                },
            ],
        },
        {
            "id": "ex3",
            "source_ref": "hemh106.txt lines 174-183 (Example 3)",
            "concept": "c8m6.2.4",
            "question_type": "divide_to_cube",
            "question_pattern": "by which smallest natural number should {number} be divided so that the quotient is a perfect cube",
            "extracted_variables": {
                "number": "the given number",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Find primes appearing only once or twice",
                },
                {
                    "step": 2,
                    "action": "divide by the leftover primes",
                    "explain": "Dividing removes the primes without triplets",
                },
                {
                    "step": 3,
                    "action": "state the quotient",
                    "explain": "The quotient is a perfect cube",
                    "compute": "number / factor",
                },
            ],
        },
        {
            "id": "ex4",
            "source_ref": "hemh106.txt lines 248-250 (Example 6)",
            "concept": "c8m6.3.2",
            "question_type": "cube_root_by_prime_factorisation",
            "question_pattern": "find the cube root of {number}",
            "extracted_variables": {
                "number": "the perfect cube",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Write the number as a product of primes",
                },
                {
                    "step": 2,
                    "action": "group the triplets",
                    "explain": "Write as (a)^3 x (b)^3 ...",
                },
                {
                    "step": 3,
                    "action": "multiply one of each triplet",
                    "explain": "The product is the cube root",
                    "compute": "number ** (1.0 / 3)",
                },
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex6.1",
            "source_ref": "hemh106.txt lines 210-223 (Exercise 6.1)",
            "questions": [
                "Which of the following numbers are not perfect cubes? (i) 216 (ii) 128 (iii) 1000 (iv) 100 (v) 46656",
                "Find the smallest number by which each of the following numbers must be multiplied to obtain a perfect cube: (i) 243 (ii) 256 (iii) 72 (iv) 675 (v) 100",
                "Find the smallest number by which each of the following numbers must be divided to obtain a perfect cube: (i) 81 (ii) 128 (iii) 135 (iv) 192 (v) 704",
                "Parikshit makes a cuboid of plasticine of sides 5 cm, 2 cm, 5 cm. How many such cuboids will he need to form a cube?",
            ],
        },
        {
            "id": "ex6.2",
            "source_ref": "hemh106.txt lines 257-269 (Exercise 6.2)",
            "questions": [
                "Find the cube root of each of the following numbers by prime factorisation method: (i) 64 (ii) 512 (iii) 10648 (iv) 27000 (v) 15625 (vi) 13824 (vii) 110592 (viii) 46656 (ix) 175616 (x) 91125",
                "State true or false: (i) Cube of any odd number is even (ii) A perfect cube does not end with two zeros (iii) If square of a number ends with 5, then its cube ends with 25 (iv) There is no perfect cube which ends with 8 (v) The cube of a two digit number may be a three digit number (vi) The cube of a two digit number may have seven or more digits (vii) The cube of a single digit number may be a single digit number",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(
        out_dir, "catalog_class8_maths_ch6_cubes_cube_roots.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
