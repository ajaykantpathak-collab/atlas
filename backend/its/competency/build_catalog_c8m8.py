"""Build concept catalog for Class 8 Maths Chapter 8 (Algebraic Expressions and Identities).
Extracted from hemh108.txt -- NCERT Class 8 Maths textbook (Reprint 2024-25).
Note: this reprint covers operations on expressions (8.1-8.5); the identities
section is not part of this file on disk.
"""
import json
import os

CATALOG = {
    "class": 8,
    "subject": "maths",
    "chapter": 8,
    "chapter_title": "Algebraic Expressions and Identities",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/hemh108.txt",
    "concepts": [
        {
            "id": "c8m8.1.1",
            "title": "Adding Algebraic Expressions",
            "section": "8.1",
            "definition": "To add algebraic expressions we write each expression to be added in a separate row, writing like terms one below the other, and add them. While adding (or subtracting) polynomials, first look for like terms and add them; then handle the unlike terms. Terms with no like terms are carried over as they are.",
            "formula": "sum like terms: m x + n x = (m + n) x",
            "key_idea": "Line up like terms and add their coefficients.",
            "textbook_ref": "hemh108.txt lines 7-31, 392-393",
            "question_patterns": [
                "add the following expressions",
                "add 7xy + 5yz - 3zx, 4yz + 9zx - 4y and -3xz + 5x - 2xy",
                "find the sum of the expressions",
                "add the algebraic expressions columnwise",
                "combine the like terms and add",
                "what is the sum of the polynomials",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "write expressions in separate rows",
                    "explain": "Put like terms one below the other",
                },
                {
                    "step": 2,
                    "action": "add like terms",
                    "explain": "Add the coefficients of like terms",
                    "compute": "coeff1 + coeff2",
                },
                {
                    "step": 3,
                    "action": "carry over unlike terms",
                    "explain": "Terms with no like terms stay as they are",
                },
            ],
        },
        {
            "id": "c8m8.1.2",
            "title": "Subtracting Algebraic Expressions",
            "section": "8.1",
            "definition": "Subtraction of a number is the same as addition of its additive inverse. Thus subtracting -3 is the same as adding +3; subtracting 6y is the same as adding -6y. Change the sign of each term of the expression being subtracted, then add like terms.",
            "formula": "m x - n x = (m - n) x",
            "key_idea": "Subtract by adding the additive inverse (flip the signs).",
            "textbook_ref": "hemh108.txt lines 35-45",
            "question_patterns": [
                "subtract 5x^2 - 4y^2 + 6y - 3 from 7x^2 - 4xy + 8y^2 + 5x - 3y",
                "subtract the first expression from the second",
                "subtract the expressions",
                "find the difference of the algebraic expressions",
                "what do we get when we subtract one expression from another",
                "subtract 3pq(p - q) from 2pq(p + q)",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "change the signs of the subtrahend",
                    "explain": "Subtracting a term is the same as adding its additive inverse",
                },
                {
                    "step": 2,
                    "action": "line up like terms",
                    "explain": "Write like terms one below the other",
                },
                {
                    "step": 3,
                    "action": "add the like terms",
                    "explain": "Subtract coefficients of like terms",
                    "compute": "coeff1 - coeff2",
                },
            ],
        },
        {
            "id": "c8m8.2.1",
            "title": "Monomials, Binomials, Polynomials and Like Terms",
            "section": "8.4",
            "definition": "Expression that contains only one term is called a monomial. Expression that contains two terms is called a binomial. An expression containing three terms is a trinomial. In general, an expression containing one or more terms with non-zero coefficients (with variables having non negative integers as exponents) is called a polynomial. Like terms are formed from the same variables and the powers of these variables are the same; coefficients of like terms need not be the same.",
            "formula": "1 term = monomial; 2 terms = binomial; 3 terms = trinomial",
            "key_idea": "Count the terms to classify; like terms share variables and powers.",
            "textbook_ref": "hemh108.txt lines 115-116, 208-212, 387-391",
            "question_patterns": [
                "classify the expression as monomial binomial or trinomial",
                "how many terms does the expression have",
                "is 4xy a monomial",
                "which of the following are binomials",
                "what is a polynomial",
                "identify the like terms in the expression",
                "are 3x squared y and -5 x squared y like terms",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "count the terms",
                    "explain": "Terms are the parts separated by + or - signs",
                },
                {
                    "step": 2,
                    "action": "classify",
                    "explain": "One term: monomial; two: binomial; three: trinomial; one or more terms: polynomial",
                },
                {
                    "step": 3,
                    "action": "check like terms",
                    "explain": "Like terms have the same variables with the same powers",
                },
            ],
        },
        {
            "id": "c8m8.3.1",
            "title": "Multiplying Two Monomials",
            "section": "8.3.1",
            "definition": "To multiply two monomials: the coefficient of the product = coefficient of first monomial x coefficient of second monomial; and the algebraic factor of the product = algebraic factor of the first monomial x algebraic factor of the second monomial. While collecting the powers of variables we use the rules of exponents, e.g. 5x x 4x^2 = (5 x 4) x (x x x^2) = 20 x^3. A monomial multiplied by a monomial always gives a monomial.",
            "formula": "(a x^m) x (b x^n) = (a x b) x^(m+n)",
            "key_idea": "Multiply coefficients and add powers of the same variable.",
            "textbook_ref": "hemh108.txt lines 115-148, 396",
            "question_patterns": [
                "find the product of 5x and 3y",
                "multiply the monomials",
                "find the product of the following pairs of monomials",
                "find 4p times 7pq",
                "multiply 5x by 4x squared",
                "complete the table of products",
                "find the product 2x times 5y times 7z",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "multiply the coefficients",
                    "explain": "coefficient of product = coefficient of first x coefficient of second",
                    "compute": "coeff1 * coeff2",
                },
                {
                    "step": 2,
                    "action": "multiply the variables",
                    "explain": "Add the powers of each variable using exponent rules",
                },
                {
                    "step": 3,
                    "action": "write the product",
                    "explain": "Combine the coefficient with the variable factors",
                },
            ],
        },
        {
            "id": "c8m8.3.2",
            "title": "Multiplying Three or More Monomials",
            "section": "8.3.2",
            "definition": "To multiply three or more monomials, first multiply the first two monomials and then multiply the resulting monomial by the third monomial. This method can be extended to the product of any number of monomials. For example 2x x 5y x 7z = (2x x 5y) x 7z = 10xy x 7z = 70xyz.",
            "formula": "(a) x (b) x (c) = ((a x b) x c)",
            "key_idea": "Multiply two at a time; order does not matter.",
            "textbook_ref": "hemh108.txt lines 141-161",
            "question_patterns": [
                "find 4x times 5y times 7z",
                "obtain the product of xy, yz and zx",
                "obtain the volume of the rectangular box",
                "find the volume with given length breadth and height as monomials",
                "multiply three monomials",
                "find the product of the three expressions",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "multiply the first two monomials",
                    "explain": "Coefficients multiply, powers add",
                },
                {
                    "step": 2,
                    "action": "multiply the result by the next monomial",
                    "explain": "Continue pairwise for all monomials",
                },
                {
                    "step": 3,
                    "action": "write the final monomial",
                    "explain": "For volume: volume = length x breadth x height",
                    "compute": "coeff1 * coeff2 * coeff3",
                },
            ],
        },
        {
            "id": "c8m8.4.1",
            "title": "Multiplying a Monomial by a Binomial or Trinomial",
            "section": "8.4.1",
            "definition": "Using the distributive law, multiply each term of the binomial (or trinomial) by the monomial and add the products. For example 3x x (5y + 2) = (3x x 5y) + (3x x 2) = 15xy + 6x; and 3p x (4p^2 + 5p + 7) = (3p x 4p^2) + (3p x 5p) + (3p x 7) = 12p^3 + 15p^2 + 21p.",
            "formula": "a x (b + c) = a x b + a x c",
            "key_idea": "Distribute the monomial over every term and add the products.",
            "textbook_ref": "hemh108.txt lines 213-241, 397-398",
            "question_patterns": [
                "carry out the multiplication of 4p and q + r",
                "multiply the monomial by the binomial",
                "find 3x times (5y + 2)",
                "multiply 3p by 4p^2 + 5p + 7",
                "simplify x(x - 3) + 2",
                "multiply a monomial by a trinomial",
                "expand using the distributive law",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "apply the distributive law",
                    "explain": "a x (b + c + d) = a x b + a x c + a x d",
                },
                {
                    "step": 2,
                    "action": "multiply each term",
                    "explain": "Each product is a monomial times a monomial: coefficients multiply, powers add",
                },
                {
                    "step": 3,
                    "action": "add the products",
                    "explain": "Write the sum of all products as the answer",
                },
            ],
        },
        {
            "id": "c8m8.5.1",
            "title": "Multiplying a Binomial by a Binomial",
            "section": "8.5.1",
            "definition": "To multiply one binomial by another, follow the distributive law step by step: every term in one binomial multiplies every term in the other binomial, so we expect 2 x 2 = 4 terms. Two of these may be like terms, which are combined. In multiplication of polynomials with polynomials, we should always look for like terms, if any, and combine them.",
            "formula": "(a + b) x (c + d) = a x c + a x d + b x c + b x d",
            "key_idea": "Multiply term by term to get 4 terms, then combine like terms.",
            "textbook_ref": "hemh108.txt lines 307-340, 399-402",
            "question_patterns": [
                "multiply the binomials (2x + 5) and (4x - 3)",
                "multiply a binomial by a binomial",
                "find the product (5 - 2x)(3 + x)",
                "find the product (x + 7y)(7x - y)",
                "multiply (x - 4) and (2x + 3)",
                "expand the product of two binomials",
                "carry out the term by term multiplication",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "distribute the first binomial",
                    "explain": "(a + b) x (c + d) = a x (c + d) + b x (c + d)",
                },
                {
                    "step": 2,
                    "action": "multiply term by term",
                    "explain": "Four products are obtained: ac, ad, bc, bd",
                },
                {
                    "step": 3,
                    "action": "combine like terms",
                    "explain": "Add coefficients of like terms to reduce to three or fewer terms",
                },
            ],
        },
        {
            "id": "c8m8.5.2",
            "title": "Multiplying a Binomial by a Trinomial",
            "section": "8.5.2",
            "definition": "In this multiplication we multiply each of the three terms in the trinomial by each of the two terms in the binomial. We shall get in all 3 x 2 = 6 terms, which may reduce to 5 or less if the term by term multiplication results in like terms. For example (a + 7) x (a^2 + 3a + 5) = a^3 + 3a^2 + 5a + 7a^2 + 21a + 35 = a^3 + 10a^2 + 26a + 35.",
            "formula": "(a + b) x (c + d + e) = a x c + a x d + a x e + b x c + b x d + b x e",
            "key_idea": "Six products; combine like terms at the end.",
            "textbook_ref": "hemh108.txt lines 341-363",
            "question_patterns": [
                "multiply the binomial by the trinomial",
                "find the product (a + b)(2a - 3b + c)",
                "multiply (x + y) by x^2 - xy + y^2",
                "expand (a + b + c)(a + b - c)",
                "simplify (1.5x - 4y)(1.5x + 4y + 3) - 4.5x + 12y",
                "multiply each term of the trinomial by the binomial",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "distribute both binomial terms",
                    "explain": "Multiply the trinomial by the first term, then by the second term",
                },
                {
                    "step": 2,
                    "action": "write the six products",
                    "explain": "3 x 2 = 6 terms in all",
                },
                {
                    "step": 3,
                    "action": "combine like terms",
                    "explain": "Collect the like terms to give the final answer",
                },
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "hemh108.txt lines 21-30 (Example 1)",
            "concept": "c8m8.1.1",
            "question_type": "add_expressions",
            "question_pattern": "add {expr1}, {expr2} and {expr3}",
            "extracted_variables": {
                "expr1": "first expression",
                "expr2": "second expression",
                "expr3": "third expression",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "write in separate rows",
                    "explain": "Like terms one below the other (note xz is same as zx)",
                },
                {
                    "step": 2,
                    "action": "add like terms",
                    "explain": "Add the coefficients of each column",
                },
                {
                    "step": 3,
                    "action": "carry over unlike terms",
                    "explain": "Terms with no like terms are carried as they are",
                },
            ],
        },
        {
            "id": "ex2",
            "source_ref": "hemh108.txt lines 35-45 (Example 2)",
            "concept": "c8m8.1.2",
            "question_type": "subtract_expressions",
            "question_pattern": "subtract {expr2} from {expr1}",
            "extracted_variables": {
                "expr1": "expression to subtract from",
                "expr2": "expression to subtract",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "change signs of the lower row",
                    "explain": "Subtraction is addition of the additive inverse",
                },
                {
                    "step": 2,
                    "action": "add the like terms",
                    "explain": "Combine coefficients column by column",
                },
            ],
        },
        {
            "id": "ex3",
            "source_ref": "hemh108.txt lines 168-180 (Example 4)",
            "concept": "c8m8.3.2",
            "question_type": "volume_of_box",
            "question_pattern": "find the volume of the rectangular box with length {l}, breadth {b} and height {h}",
            "extracted_variables": {
                "l": "length as a monomial",
                "b": "breadth as a monomial",
                "h": "height as a monomial",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "write the volume expression",
                    "explain": "Volume = length x breadth x height",
                },
                {
                    "step": 2,
                    "action": "multiply coefficients and powers",
                    "explain": "Multiply the numerical coefficients, then collect powers of each variable",
                },
                {
                    "step": 3,
                    "action": "write the product",
                    "explain": "The result is a single monomial",
                },
            ],
        },
        {
            "id": "ex4",
            "source_ref": "hemh108.txt lines 243-253 (Example 5)",
            "concept": "c8m8.4.1",
            "question_type": "simplify_and_evaluate",
            "question_pattern": "simplify x(x - {a}) + {b} and evaluate for x = {value}",
            "extracted_variables": {
                "a": "subtracted constant",
                "b": "added constant",
                "value": "value of x",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "multiply out",
                    "explain": "x(x - a) = x^2 - a x",
                },
                {
                    "step": 2,
                    "action": "combine",
                    "explain": "Write the simplified expression",
                },
                {
                    "step": 3,
                    "action": "substitute",
                    "explain": "Replace x by the value and compute",
                    "compute": "value ** 2 - a * value + b",
                },
            ],
        },
        {
            "id": "ex5",
            "source_ref": "hemh108.txt lines 324-332 (Example 8)",
            "concept": "c8m8.5.1",
            "question_type": "binomial_binomial",
            "question_pattern": "multiply ({a}x + {b}) and ({c}x + {d})",
            "extracted_variables": {
                "a": "coefficient in first binomial",
                "b": "constant in first binomial",
                "c": "coefficient in second binomial",
                "d": "constant in second binomial",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "distribute",
                    "explain": "{a}x(2x + 3) - 4(2x + 3) style expansion",
                },
                {
                    "step": 2,
                    "action": "write the four products",
                    "explain": "ac x^2 + ad x + bc x + bd",
                },
                {
                    "step": 3,
                    "action": "add like terms",
                    "explain": "Combine the middle terms",
                    "compute": "a * c",
                },
            ],
        },
        {
            "id": "ex6",
            "source_ref": "hemh108.txt lines 352-363 (Example 10)",
            "concept": "c8m8.5.2",
            "question_type": "binomial_trinomial_simplify",
            "question_pattern": "simplify (a + b)(2a - 3b + {c}) - (2a - 3b){c}",
            "extracted_variables": {
                "c": "third term of the trinomial",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "expand the product",
                    "explain": "Multiply each trinomial term by a and by b",
                },
                {
                    "step": 2,
                    "action": "expand the subtraction",
                    "explain": "Change signs of the subtracted product",
                },
                {
                    "step": 3,
                    "action": "combine like terms",
                    "explain": "Collect like terms for the final simplified expression",
                },
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex8.1",
            "source_ref": "hemh108.txt lines 46-54 (Exercise 8.1)",
            "questions": [
                "Add: (i) ab - bc, bc - ca, ca - ab (ii) a - b + ab, b - c + bc, c - a + ac (iii) 2p^2q^2 - 3pq + 4, 5 + 7pq - 3p^2q^2 (iv) l^2 + m^2, m^2 + n^2, n^2 + l^2, 2lm + 2mn + 2nl",
                "(a) Subtract 4a - 7ab + 3b + 12 from 12a - 9ab + 5b - 3 (b) Subtract 3xy + 5yz - 7zx from 5xy - 2yz - 2zx + 10xyz (c) Subtract 4p^2q - 3pq + 5pq^2 - 8p + 7q - 10 from 18 - 3p - 11q + 5pq - 2pq^2 + 5p^2q",
            ],
        },
        {
            "id": "ex8.2",
            "source_ref": "hemh108.txt lines 181-207 (Exercise 8.2)",
            "questions": [
                "Find the product of the following pairs of monomials: (i) 4, 7p (ii) -4p, 7p (iii) -4p, 7pq (iv) 4p^3, -3p (v) 4p, 0",
                "Find the areas of rectangles with the following pairs of monomials as their lengths and breadths: (p, q); (10m, 5n); (20x^2, 5y^2); (4x, 3x^2); (3mn, 4np)",
                "Complete the table of products of the given monomials",
                "Obtain the volume of rectangular boxes with the following length, breadth and height: (i) 5a, 3a^2, 7a^4 (ii) 2p, 4q, 8r (iii) xy, 2x^2y, 2xy^2 (iv) a, 2b, 3c",
                "Obtain the product of: (i) xy, yz, zx (ii) a, -a^2, a^3 (iii) 2, 4y, 8y^2, 16y^3 (iv) a, 2b, 3c, 6abc (v) m, -mn, mnp",
            ],
        },
        {
            "id": "ex8.3",
            "source_ref": "hemh108.txt lines 277-305 (Exercise 8.3)",
            "questions": [
                "Carry out the multiplication of the expressions in each of the following pairs: (i) 4p, q + r (ii) ab, a - b (iii) a + b, 7a^2b^2 (iv) a^2 - 9, 4a (v) pq + qr + rp, 0",
                "Complete the table for the product of the given first and second expressions",
                "Find the product of the given monomials and fractions",
                "(a) Simplify 3x(4x - 5) + 3 and find its values for (i) x = 3 (ii) x = 1/2 (b) Simplify a(a^2 + a + 1) + 5 and find its value for (i) a = 0 (ii) a = 1 (iii) a = -1",
                "(a) Add: p(p - q), q(q - r) and r(r - p) (b) Add: 2x(z - x - y) and 2y(z - y - x) (c) Subtract: 3l(l - 4m + 5n) from 4l(10n - 3m + 2l) (d) Subtract: 3a(a + b + c) - 2b(a - b + c) from 4c(-a + b + c)",
            ],
        },
        {
            "id": "ex8.4",
            "source_ref": "hemh108.txt lines 368-383 (Exercise 8.4)",
            "questions": [
                "Multiply the binomials: (i) (2x + 5) and (4x - 3) (ii) (y - 8) and (3y - 4) (iii) (2.5l - 0.5m) and (2.5l + 0.5m) (iv) (a + 3b) and (x + 5) (v) (2pq + 3q^2) and (3pq - 2q^2)",
                "Find the product: (i) (5 - 2x)(3 + x) (ii) (x + 7y)(7x - y) (iii) (a^2 + b)(a + b^2) (iv) (p^2 - q^2)(2p + q)",
                "Simplify: (i) (x^2 - 5)(x + 5) + 25 (ii) (a^2 + 5)(b^3 + 3) + 5 (iii) (t + s^2)(t^2 - s) (iv) (a + b)(c - d) + (a - b)(c + d) + 2(ac + bd) (v) (x + y)(2x + y) + (x + 2y)(x - y) (vi) (x + y)(x^2 - xy + y^2) (vii) (1.5x - 4y)(1.5x + 4y + 3) - 4.5x + 12y (viii) (a + b + c)(a + b - c)",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(
        out_dir, "catalog_class8_maths_ch8_algebraic_expressions_identities.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
