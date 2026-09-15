"""Build concept catalog for Class 8 Maths Chapter 5 (Squares and Square Roots).
Extracted from hemh105.txt -- NCERT Class 8 Maths textbook (Reprint 2024-25).
"""
import json
import os

CATALOG = {
    "class": 8,
    "subject": "maths",
    "chapter": 5,
    "chapter_title": "Squares and Square Roots",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/hemh105.txt",
    "concepts": [
        {
            "id": "c8m5.1.1",
            "title": "Square Numbers",
            "section": "5.1",
            "definition": "In general, if a natural number m can be expressed as n^2, where n is also a natural number, then m is a square number. The numbers 1, 4, 9, 16, 25, ... are square numbers. These numbers are also called perfect squares.",
            "formula": "m = n^2, i.e. m = n x n",
            "key_idea": "A square number is a natural number times itself.",
            "textbook_ref": "hemh105.txt lines 5-43",
            "question_patterns": [
                "what is a square number",
                "is 32 a square number",
                "find the perfect square numbers between 30 and 40",
                "find the perfect square numbers between 50 and 60",
                "which of the following are perfect squares",
                "express the number as product of the number with itself",
                "what are perfect squares",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "check for a natural square root",
                    "explain": "m is a square number only if a natural number n satisfies n x n = m",
                    "compute": "sqrt(number)",
                },
                {
                    "step": 2,
                    "action": "square a given number",
                    "explain": "Square of n = n x n",
                    "compute": "number ** 2",
                },
            ],
        },
        {
            "id": "c8m5.2.1",
            "title": "Properties of Square Numbers",
            "section": "5.2",
            "definition": "All square numbers end with 0, 1, 4, 5, 6 or 9 at units place. None of them end with 2, 3, 7 or 8 at units place. If a number has 1 or 9 in the units place, then its square ends in 1; when a square number ends in 6, the number whose square it is will have either 4 or 6 in units place. Square numbers can only have even number of zeros at the end. The squares of even numbers are even and the squares of odd numbers are odd.",
            "formula": "units digit of square: 0,1,4,5,6,9 only; square of even = even; square of odd = odd",
            "key_idea": "Look at the units digit to reject non-squares instantly.",
            "textbook_ref": "hemh105.txt lines 46-145, 861-862",
            "question_patterns": [
                "what will be the unit digit of the square of 81",
                "what will be the one's digit in the square of a number",
                "which of the following numbers are obviously not perfect squares",
                "give reason why 1057 is not a perfect square",
                "the squares of which of the following would be odd numbers",
                "what will be the number of zeros in the square of 60",
                "can a square number end with 2",
                "how do we know whether a number is a perfect square from its units digit",
            ],
            "solution_type": "verify_property",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "look at the units digit",
                    "explain": "If the number ends with 2, 3, 7 or 8 it cannot be a perfect square",
                },
                {
                    "step": 2,
                    "action": "decide odd or even square",
                    "explain": "Odd number squares to an odd number, even to an even",
                },
                {
                    "step": 3,
                    "action": "count ending zeros",
                    "explain": "A perfect square has only an even number of zeros at the end",
                },
            ],
        },
        {
            "id": "c8m5.3.1",
            "title": "Numbers Between Square Numbers",
            "section": "5.3",
            "definition": "Between n^2 and (n + 1)^2 there are 2n non perfect square numbers, which is 1 less than the difference of the two squares. For any natural number n and (n + 1), (n + 1)^2 - n^2 = (n^2 + 2n + 1) - n^2 = 2n + 1.",
            "formula": "numbers between n^2 and (n+1)^2 = 2n; (n+1)^2 - n^2 = 2n + 1",
            "key_idea": "There are 2n non-square numbers between consecutive squares.",
            "textbook_ref": "hemh105.txt lines 162-195, 329-331",
            "question_patterns": [
                "how many natural numbers lie between 9 squared and 10 squared",
                "how many numbers lie between squares of 12 and 13",
                "how many non square numbers lie between 100 squared and 101 squared",
                "how many non square numbers lie between n squared and n plus 1 squared",
                "find how many numbers are there between two consecutive squares",
                "numbers between square numbers",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "identify the smaller number",
                    "explain": "Let the smaller number be n, so the squares are n^2 and (n+1)^2",
                },
                {
                    "step": 2,
                    "action": "multiply by 2",
                    "explain": "There are 2n non perfect square numbers between n^2 and (n+1)^2",
                    "compute": "2 * n",
                },
                {
                    "step": 3,
                    "action": "check with the difference",
                    "explain": "The difference of squares is 2n + 1, which is 1 more than the count of numbers between",
                    "compute": "2 * n + 1",
                },
            ],
        },
        {
            "id": "c8m5.3.2",
            "title": "Sum of First n Odd Numbers",
            "section": "5.3",
            "definition": "The sum of first n odd natural numbers is n^2: 1 = 1^2, 1 + 3 = 2^2, 1 + 3 + 5 = 3^2 and so on. If a natural number cannot be expressed as a sum of successive odd natural numbers starting with 1, then it is not a perfect square. Every square number can be expressed as a sum of successive odd natural numbers starting from 1.",
            "formula": "1 + 3 + 5 + ... (n terms) = n^2",
            "key_idea": "Add successive odd numbers from 1; a perfect square reaches exactly 0.",
            "textbook_ref": "hemh105.txt lines 203-235, 469-471",
            "question_patterns": [
                "without adding find the sum of 1 + 3 + 5 + 7 + 9",
                "express 49 as the sum of 7 odd numbers",
                "express 121 as the sum of 11 odd numbers",
                "find whether a number is a perfect square by subtracting odd numbers",
                "sum of first n odd natural numbers",
                "is 81 a perfect square using successive subtraction",
                "express a number as sum of successive odd numbers",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "count the odd numbers",
                    "explain": "Count how many successive odd numbers starting from 1 are added",
                },
                {
                    "step": 2,
                    "action": "square the count",
                    "explain": "The sum of first n odd natural numbers is n^2",
                    "compute": "n ** 2",
                },
                {
                    "step": 3,
                    "action": "to test a perfect square",
                    "explain": "Subtract successive odd numbers 1, 3, 5, ... from the number; reaching 0 means a perfect square",
                },
            ],
        },
        {
            "id": "c8m5.3.3",
            "title": "Square as Sum of Two Consecutive Natural Numbers",
            "section": "5.3",
            "definition": "For any odd number n, we can express the square of n as the sum of two consecutive positive integers: n^2 = (n^2 - 1)/2 + (n^2 + 1)/2. For example 3^2 = 9 = 4 + 5, 5^2 = 25 = 12 + 13, 7^2 = 49 = 24 + 25.",
            "formula": "n^2 = (n^2 - 1)/2 + (n^2 + 1)/2",
            "key_idea": "The square of any odd number is the sum of two consecutive integers.",
            "textbook_ref": "hemh105.txt lines 236-251",
            "question_patterns": [
                "express 21 squared as the sum of two consecutive integers",
                "express the square as sum of two consecutive natural numbers",
                "write the square of 13 as sum of two consecutive numbers",
                "express 11 squared as sum of consecutive numbers",
                "sum of two consecutive positive integers is a perfect square",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute the square",
                    "explain": "Find n^2 for the odd number n",
                    "compute": "number ** 2",
                },
                {
                    "step": 2,
                    "action": "first consecutive number",
                    "explain": "First number = (n^2 - 1) / 2",
                    "compute": "(number ** 2 - 1) / 2",
                },
                {
                    "step": 3,
                    "action": "second consecutive number",
                    "explain": "Second number = (n^2 + 1) / 2",
                    "compute": "(number ** 2 + 1) / 2",
                },
            ],
        },
        {
            "id": "c8m5.3.4",
            "title": "Product of Two Consecutive Even or Odd Numbers",
            "section": "5.3",
            "definition": "For a product of two consecutive even or odd natural numbers: 11 x 13 = (12 - 1) x (12 + 1) = 12^2 - 1. In general (a + 1) x (a - 1) = a^2 - 1.",
            "formula": "(a + 1) x (a - 1) = a^2 - 1",
            "key_idea": "Product of numbers one either side of a = a squared minus 1.",
            "textbook_ref": "hemh105.txt lines 258-265",
            "question_patterns": [
                "find the product 11 x 13 using the pattern",
                "find 13 x 15 without multiplying directly",
                "find the product of two consecutive odd numbers",
                "find 29 x 31 using the pattern",
                "find 44 x 46 using squares",
                "product of two consecutive even numbers",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find the middle number",
                    "explain": "The two factors are (a - 1) and (a + 1) around the middle number a",
                },
                {
                    "step": 2,
                    "action": "square the middle number",
                    "explain": "Compute a^2",
                    "compute": "middle ** 2",
                },
                {
                    "step": 3,
                    "action": "subtract 1",
                    "explain": "Product = a^2 - 1",
                    "compute": "middle ** 2 - 1",
                },
            ],
        },
        {
            "id": "c8m5.4.1",
            "title": "Finding the Square of a Number",
            "section": "5.4",
            "definition": "To find the square of a number like 23 without actual multiplication, write 23 = 20 + 3; then 23^2 = (20 + 3)^2 = 20(20 + 3) + 3(20 + 3) = 20^2 + 20 x 3 + 3 x 20 + 3^2 = 400 + 60 + 60 + 9 = 529. For a number with unit digit 5, i.e. a5: (a5)^2 = a(a + 1) hundred + 25; for example 25^2 = 625 = (2 x 3) hundreds + 25, 75^2 = 5625 = (7 x 8) hundreds + 25.",
            "formula": "(a5)^2 = a x (a + 1) x 100 + 25; (a + b)^2 = a(a + b) + b(a + b)",
            "key_idea": "Split the number, or for numbers ending in 5 use a(a+1) hundred + 25.",
            "textbook_ref": "hemh105.txt lines 334-363",
            "question_patterns": [
                "find the square of 39 without actual multiplication",
                "find the square of 42",
                "find the square of 23",
                "find the square of a number ending in 5",
                "find the square of 95",
                "find the square of 105",
                "find the square using the pattern a(a+1) hundred 25",
                "square of 75",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "for a number ending in 5",
                    "explain": "Write it as a5 with tens part a; multiply a by (a + 1) and append 25",
                    "compute": "tens_part * (tens_part + 1) * 100 + 25",
                },
                {
                    "step": 2,
                    "action": "otherwise split the number",
                    "explain": "Write number = a + b; then n^2 = a(a + b) + b(a + b)",
                },
                {
                    "step": 3,
                    "action": "add the four products",
                    "explain": "a^2 + a x b + b x a + b^2 gives the square",
                },
            ],
        },
        {
            "id": "c8m5.4.2",
            "title": "Pythagorean Triplets",
            "section": "5.4.2",
            "definition": "The collection of numbers 3, 4 and 5 is known as a Pythagorean triplet, since 3^2 + 4^2 = 9 + 16 = 25 = 5^2. For any natural number m > 1, we have (2m)^2 + (m^2 - 1)^2 = (m^2 + 1)^2. So, 2m, m^2 - 1 and m^2 + 1 form a Pythagorean triplet.",
            "formula": "triplet: 2m, m^2 - 1, m^2 + 1 for m > 1",
            "key_idea": "For any m > 1 the three numbers 2m, m^2 - 1, m^2 + 1 form a triplet.",
            "textbook_ref": "hemh105.txt lines 367-404",
            "question_patterns": [
                "write a pythagorean triplet whose smallest member is 8",
                "write a pythagorean triplet whose one member is 6",
                "write a pythagorean triplet whose one member is 14",
                "find a pythagorean triplet in which one member is 12",
                "find a pythagorean triplet using m",
                "which numbers form a pythagorean triplet",
                "check whether 6 8 10 is a pythagorean triplet",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "set the given member equal to 2m",
                    "explain": "Try 2m = given member first, then m",
                    "compute": "member / 2",
                },
                {
                    "step": 2,
                    "action": "find m",
                    "explain": "m must be a natural number greater than 1; if not, try m^2 - 1 or m^2 + 1 equal to the member",
                },
                {
                    "step": 3,
                    "action": "compute the other members",
                    "explain": "Other members are m^2 - 1 and m^2 + 1",
                    "compute": "m ** 2 - 1",
                },
                {
                    "step": 4,
                    "action": "verify",
                    "explain": "Check (2m)^2 + (m^2 - 1)^2 = (m^2 + 1)^2",
                    "compute": "m ** 2 + 1",
                },
            ],
        },
        {
            "id": "c8m5.5.1",
            "title": "Square Roots",
            "section": "5.5",
            "definition": "Finding the number with the known square is known as finding the square root. Finding the square root is the inverse operation of squaring. Since 9^2 = 81 and (-9)^2 = 81, we say that square roots of 81 are 9 and -9; there are two integral square roots of a perfect square number. In this chapter we take up only positive square root of a natural number. Positive square root of a number is denoted by the radical symbol; for example 4 = 2 (not -2), 9 = 3 (not -3).",
            "formula": "sqrt(n^2) = n; square root is the inverse of squaring",
            "key_idea": "Square root undoes squaring; we use the positive root.",
            "textbook_ref": "hemh105.txt lines 411-468, 863-866",
            "question_patterns": [
                "what is the square root of 121",
                "find the square root of 196",
                "what is a square root",
                "find the positive square root",
                "what could be the possible ones digits of the square root",
                "find the number whose square is 144",
                "square root of a perfect square",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find the number whose square is given",
                    "explain": "Square root is the inverse of squaring",
                    "compute": "sqrt(number)",
                },
                {
                    "step": 2,
                    "action": "take the positive root",
                    "explain": "Both + and - are square roots, but the symbol denotes the positive square root",
                },
            ],
        },
        {
            "id": "c8m5.5.2",
            "title": "Square Root by Repeated Subtraction",
            "section": "5.5.2",
            "definition": "Every square number can be expressed as a sum of successive odd natural numbers starting from 1. By repeated subtraction of odd numbers starting from 1, we find the square root: subtract 1, 3, 5, 7, ... from the number until we get 0; the number of steps at which we obtain 0 is the square root. For example, from 81 we subtracted successive odd numbers starting from 1 and obtained 0 at the 9th step, therefore square root of 81 = 9.",
            "formula": "steps of subtracting 1, 3, 5, ... to reach 0 = square root",
            "key_idea": "Count how many successive odd subtractions reach 0.",
            "textbook_ref": "hemh105.txt lines 469-486, 586",
            "question_patterns": [
                "find the square root of 100 by repeated subtraction",
                "find the square root by the method of repeated subtraction",
                "find the square root of 169 by successive subtraction",
                "is 121 a perfect square by repeated subtraction",
                "find whether a number is a perfect square by repeated subtraction",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "subtract successive odd numbers",
                    "explain": "Subtract 1, then 3, then 5, then 7 and so on from the number",
                },
                {
                    "step": 2,
                    "action": "count the steps to reach 0",
                    "explain": "The step at which the result is 0 equals the square root",
                    "compute": "sqrt(number)",
                },
                {
                    "step": 3,
                    "action": "if the result goes below 0",
                    "explain": "The number is not a perfect square",
                },
            ],
        },
        {
            "id": "c8m5.5.3",
            "title": "Square Root by Prime Factorisation",
            "section": "5.5.3",
            "definition": "Each prime factor in the prime factorisation of the square of a number occurs twice the number of times it occurs in the prime factorisation of the number itself. Write the prime factorisation, pair the prime factors, and take one factor from each pair; their product is the square root. A number is a perfect square only if every prime factor occurs in pairs. To get the smallest multiple that is a perfect square, multiply by the unpaired factors; to get the quotient a perfect square, divide by the unpaired factors.",
            "formula": "pair prime factors and take one from each pair; product = square root",
            "key_idea": "Pair the primes; unpaired factors tell if it is not a perfect square.",
            "textbook_ref": "hemh105.txt lines 488-579",
            "question_patterns": [
                "find the square root of 729 by prime factorisation",
                "find the square root of 4096 by prime factorisation method",
                "is 90 a perfect square",
                "find the smallest number by which 252 must be multiplied so as to get a perfect square",
                "find the smallest whole number by which it should be divided so as to get a perfect square",
                "find the smallest square number divisible by each of the numbers 6 9 15",
                "find the square root by prime factorisation",
                "find the square root of 6400",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "write the prime factorisation",
                    "explain": "Divide repeatedly by primes 2, 3, 5, 7 ...",
                },
                {
                    "step": 2,
                    "action": "pair the factors",
                    "explain": "If any prime is left unpaired, the number is not a perfect square",
                },
                {
                    "step": 3,
                    "action": "take one from each pair",
                    "explain": "The product of one factor from each pair is the square root",
                    "compute": "sqrt(number)",
                },
                {
                    "step": 4,
                    "action": "for smallest multiple or quotient",
                    "explain": "Multiply or divide by the product of unpaired primes to complete all pairs",
                },
            ],
        },
        {
            "id": "c8m5.5.4",
            "title": "Square Root by Long Division Method",
            "section": "5.5.4",
            "definition": "When the numbers are large we use the Long Division Method. Steps: (1) place a bar over every pair of digits starting from the digit at one's place; (2) find the largest number whose square is less than or equal to the number under the extreme left bar, take it as divisor and quotient, divide and get the remainder; (3) bring down the number under the next bar to the right of the remainder; (4) double the quotient and enter it with a blank on its right; (5) guess the largest possible digit to fill the blank which also becomes the new digit in the quotient so that the new divisor times the new quotient is less than or equal to the dividend; (6) continue until no bars remain. The number of bars gives the number of digits in the square root.",
            "formula": "number of bars = number of digits in the square root",
            "key_idea": "Pair digits with bars, then divide step by step doubling the quotient.",
            "textbook_ref": "hemh105.txt lines 612-755",
            "question_patterns": [
                "find the square root of 529 by division method",
                "find the square root of 4096 by long division",
                "find the number of digits in the square root of 27225",
                "find the least number which must be subtracted from 5607 to get a perfect square",
                "find the least number which must be added to 1300 to get a perfect square",
                "find the greatest 4 digit number which is a perfect square",
                "find the square root by long division method",
                "find the length of the side of a square whose area is 441",
                "how many children would be left out in the arrangement of rows and columns",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "place bars over pairs of digits from the units place",
                    "explain": "The number of bars equals the number of digits in the square root",
                },
                {
                    "step": 2,
                    "action": "divide left bar first",
                    "explain": "Largest number whose square is less than or equal to the leftmost group is the first quotient digit",
                },
                {
                    "step": 3,
                    "action": "bring down the next pair and double the quotient",
                    "explain": "New dividend = remainder with next pair; new divisor = double the quotient with a blank digit",
                },
                {
                    "step": 4,
                    "action": "choose the new digit",
                    "explain": "Largest digit making (doubled quotient + digit) x digit <= dividend",
                },
                {
                    "step": 5,
                    "action": "repeat until done",
                    "explain": "The final quotient is the square root",
                    "compute": "sqrt(number)",
                },
            ],
        },
        {
            "id": "c8m5.6.1",
            "title": "Square Roots of Decimals",
            "section": "5.6",
            "definition": "To find the square root of a decimal number put bars on the integral part in the usual manner (starting from the unit's place towards the left) and place bars on the decimal part on every pair of digits beginning with the first decimal place (moving towards the right); if needed put 0 after the last digit to complete a pair. Put a decimal point in the quotient as soon as the decimal part is brought down.",
            "formula": "sqrt(decimal): bar integral part right to left, decimal part left to right",
            "key_idea": "Bar the integer part right-to-left and decimal part left-to-right.",
            "textbook_ref": "hemh105.txt lines 756-803",
            "question_patterns": [
                "find the square root of 17.64",
                "find the square root of 12.25",
                "find the square root of the decimal number 2.56",
                "find the square root of 7.29",
                "square root of a decimal by division method",
                "find the square root of 51.84",
                "find the square root of 42.25",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "bar the integral and decimal parts",
                    "explain": "Integral part in pairs from the right; decimal part in pairs from the decimal point to the right, adding 0 if needed",
                },
                {
                    "step": 2,
                    "action": "proceed as in division method",
                    "explain": "Divide, double the quotient, fill the blank digit",
                },
                {
                    "step": 3,
                    "action": "place the decimal point in the quotient",
                    "explain": "Put the decimal point in the quotient when the decimal part of the number is reached",
                    "compute": "sqrt(number)",
                },
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "hemh105.txt lines 343-350 (Example 1)",
            "concept": "c8m5.4.1",
            "question_type": "square_without_multiplication",
            "question_pattern": "find the square of {number} without actual multiplication",
            "extracted_variables": {
                "number": "the number to square",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "split the number",
                    "explain": "Write number = a + b, e.g. 39 = 30 + 9",
                },
                {
                    "step": 2,
                    "action": "apply the pattern",
                    "explain": "(a + b)^2 = a(a + b) + b(a + b)",
                },
                {
                    "step": 3,
                    "action": "add the four terms",
                    "explain": "a^2 + a x b + b x a + b^2",
                    "compute": "number ** 2",
                },
            ],
        },
        {
            "id": "ex2",
            "source_ref": "hemh105.txt lines 382-393 (Example 2)",
            "concept": "c8m5.4.2",
            "question_type": "triplet_from_smallest_member",
            "question_pattern": "write a pythagorean triplet whose smallest member is {member}",
            "extracted_variables": {
                "member": "given member of the triplet",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "try 2m = member",
                    "explain": "Use the general form 2m, m^2 - 1, m^2 + 1",
                    "compute": "member / 2",
                },
                {
                    "step": 2,
                    "action": "compute the other members",
                    "explain": "m^2 - 1 and m^2 + 1",
                    "compute": "(member / 2) ** 2 - 1",
                },
                {
                    "step": 3,
                    "action": "state the triplet",
                    "explain": "Check the smallest member really is the given one",
                },
            ],
        },
        {
            "id": "ex3",
            "source_ref": "hemh105.txt lines 394-404 (Example 3)",
            "concept": "c8m5.4.2",
            "question_type": "triplet_with_member",
            "question_pattern": "find a pythagorean triplet in which one member is {member}",
            "extracted_variables": {
                "member": "given member of the triplet",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "try m^2 - 1 = member",
                    "explain": "Solve for m; m must be a natural number",
                },
                {
                    "step": 2,
                    "action": "try m^2 + 1 = member",
                    "explain": "If the first try fails, attempt the other member",
                },
                {
                    "step": 3,
                    "action": "try 2m = member",
                    "explain": "If both fail, set 2m = member, so m = member / 2",
                    "compute": "member / 2",
                },
                {
                    "step": 4,
                    "action": "complete the triplet",
                    "explain": "Compute m^2 - 1 and m^2 + 1",
                    "compute": "m ** 2 - 1",
                },
            ],
        },
        {
            "id": "ex4",
            "source_ref": "hemh105.txt lines 535-539 (Example 4)",
            "concept": "c8m5.5.3",
            "question_type": "sqrt_by_prime_factorisation",
            "question_pattern": "find the square root of {number} by prime factorisation",
            "extracted_variables": {
                "number": "the perfect square",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Write the number as a product of primes",
                },
                {
                    "step": 2,
                    "action": "pair the factors",
                    "explain": "Group equal primes in pairs",
                },
                {
                    "step": 3,
                    "action": "multiply one of each pair",
                    "explain": "The product is the square root",
                    "compute": "sqrt(number)",
                },
            ],
        },
        {
            "id": "ex5",
            "source_ref": "hemh105.txt lines 541-547 (Example 5)",
            "concept": "c8m5.5.3",
            "question_type": "is_perfect_square",
            "question_pattern": "is {number} a perfect square",
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
                    "action": "look for pairs",
                    "explain": "If any prime does not occur in a pair, the number is not a perfect square",
                },
                {
                    "step": 3,
                    "action": "conclude",
                    "explain": "All paired = perfect square; any unpaired = not a perfect square",
                },
            ],
        },
        {
            "id": "ex6",
            "source_ref": "hemh105.txt lines 548-557 (Example 6)",
            "concept": "c8m5.5.3",
            "question_type": "smallest_multiple_perfect_square",
            "question_pattern": "is {number} a perfect square? if not, find the smallest multiple of {number} which is a perfect square",
            "extracted_variables": {
                "number": "the given number",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "prime factorise",
                    "explain": "Find which primes do not occur in pairs",
                },
                {
                    "step": 2,
                    "action": "multiply by the unpaired factors",
                    "explain": "Multiply the number by the product of unpaired primes so every factor gets a pair",
                },
                {
                    "step": 3,
                    "action": "find the square root",
                    "explain": "Take one of each pair and multiply",
                    "compute": "sqrt(number * factor)",
                },
            ],
        },
        {
            "id": "ex7",
            "source_ref": "hemh105.txt lines 568-579 (Example 8)",
            "concept": "c8m5.5.3",
            "question_type": "smallest_square_divisible_by",
            "question_pattern": "find the smallest square number divisible by each of the numbers {a}, {b} and {c}",
            "extracted_variables": {
                "a": "first number",
                "b": "second number",
                "c": "third number",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "find the LCM",
                    "explain": "The least number divisible by each is their LCM",
                },
                {
                    "step": 2,
                    "action": "prime factorise the LCM",
                    "explain": "Identify primes not in pairs",
                },
                {
                    "step": 3,
                    "action": "multiply by unpaired primes",
                    "explain": "LCM x unpaired factors = required smallest square number",
                },
            ],
        },
        {
            "id": "ex8",
            "source_ref": "hemh105.txt lines 728-734 (Example 10)",
            "concept": "c8m5.5.4",
            "question_type": "least_subtracted",
            "question_pattern": "find the least number that must be subtracted from {number} to get a perfect square",
            "extracted_variables": {
                "number": "the given number",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "divide by long division method",
                    "explain": "The remainder shows how much the number exceeds a perfect square",
                },
                {
                    "step": 2,
                    "action": "subtract the remainder",
                    "explain": "Number - remainder is the required perfect square",
                },
                {
                    "step": 3,
                    "action": "find the square root",
                    "explain": "The quotient of the division is the square root",
                    "compute": "sqrt(number - remainder)",
                },
            ],
        },
        {
            "id": "ex9",
            "source_ref": "hemh105.txt lines 735-745 (Example 11)",
            "concept": "c8m5.5.4",
            "question_type": "greatest_n_digit_square",
            "question_pattern": "find the greatest {digits}-digit number which is a perfect square",
            "extracted_variables": {
                "digits": "number of digits",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "write the greatest n-digit number",
                    "explain": "It is all 9s, e.g. 9999 for 4 digits",
                },
                {
                    "step": 2,
                    "action": "divide by long division method",
                    "explain": "The remainder shows how much to subtract",
                },
                {
                    "step": 3,
                    "action": "subtract the remainder",
                    "explain": "The result is the greatest n-digit perfect square",
                },
            ],
        },
        {
            "id": "ex10",
            "source_ref": "hemh105.txt lines 746-755 (Example 12)",
            "concept": "c8m5.5.4",
            "question_type": "least_added",
            "question_pattern": "find the least number that must be added to {number} to get a perfect square",
            "extracted_variables": {
                "number": "the given number",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "divide by long division method",
                    "explain": "The remainder shows the number lies between two perfect squares",
                },
                {
                    "step": 2,
                    "action": "take the next perfect square",
                    "explain": "Quotient + 1, squared, is the next perfect square",
                },
                {
                    "step": 3,
                    "action": "subtract the given number",
                    "explain": "Number to add = next perfect square - given number",
                },
            ],
        },
        {
            "id": "ex11",
            "source_ref": "hemh105.txt lines 789-797 (Example 13)",
            "concept": "c8m5.6.1",
            "question_type": "sqrt_decimal",
            "question_pattern": "find the square root of {number}",
            "extracted_variables": {
                "number": "the decimal number",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "bar both parts",
                    "explain": "Bars on the integral part from the right, on the decimal part from the decimal point",
                },
                {
                    "step": 2,
                    "action": "apply division method",
                    "explain": "Divide, doubling the quotient and filling the blank digit",
                },
                {
                    "step": 3,
                    "action": "set the decimal point",
                    "explain": "Place the decimal point in the quotient when entering the decimal part",
                    "compute": "sqrt(number)",
                },
            ],
        },
        {
            "id": "ex12",
            "source_ref": "hemh105.txt lines 804-810 (Example 14)",
            "concept": "c8m5.5.4",
            "question_type": "side_from_area",
            "question_pattern": "area of a square plot is {area}. find the side of the square plot",
            "extracted_variables": {
                "area": "area of the square",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "use area of a square",
                    "explain": "Area of a square = side^2, so side = square root of area",
                },
                {
                    "step": 2,
                    "action": "find the square root",
                    "explain": "Compute the square root of the area by division method",
                    "compute": "sqrt(area)",
                },
            ],
        },
        {
            "id": "ex13",
            "source_ref": "hemh105.txt lines 811-822 (Example 15)",
            "concept": "c8m5.5.4",
            "question_type": "rows_and_columns",
            "question_pattern": "there are {total} students. find the number of rows if rows equal columns",
            "extracted_variables": {
                "total": "total number of students",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "write the equation",
                    "explain": "rows x columns = total and rows = columns, so x^2 = total",
                },
                {
                    "step": 2,
                    "action": "find the square root",
                    "explain": "Number of rows = square root of the total",
                    "compute": "sqrt(total)",
                },
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex5.1",
            "source_ref": "hemh105.txt lines 292-331 (Exercise 5.1)",
            "questions": [
                "What will be the unit digit of the squares of the following numbers? 81; 272; 799; 3853; 1234; 26387; 52698; 99880; 12796; 55555",
                "The following numbers are obviously not perfect squares. Give reason: 1057; 23453; 7928; 222222; 64000; 89722; 222000; 505050",
                "The squares of which of the following would be odd numbers? 431; 2826; 7779; 82004",
                "Observe the pattern 11^2 = 121, 101^2 = 10201, 1001^2 = 1002001 and find the missing digits",
                "Observe the pattern 11^2 = 121, 101^2 = 10201, 10101^2 = 102030201 and supply the missing numbers",
                "Using the given pattern find the missing numbers: 1^2 + 2^2 + 2^2 = 3^2; 2^2 + 3^2 + 6^2 = 7^2; 3^2 + 4^2 + 12^2 = 13^2; 4^2 + 5^2 + _^2 = 21^2; 5^2 + _^2 + 30^2 = 31^2; 6^2 + 7^2 + _^2 = __^2",
                "Without adding, find the sum: (i) 1 + 3 + 5 + 7 + 9 (ii) 1 + 3 + ... + 19 (iii) 1 + 3 + ... + 23",
                "(i) Express 49 as the sum of 7 odd numbers (ii) Express 121 as the sum of 11 odd numbers",
                "How many numbers lie between squares of the following numbers? (i) 12 and 13 (ii) 25 and 26 (iii) 99 and 100",
            ],
        },
        {
            "id": "ex5.2",
            "source_ref": "hemh105.txt lines 405-410 (Exercise 5.2)",
            "questions": [
                "Find the square of the following numbers: 32; 35; 86; 93; 71; 46",
                "Write a Pythagorean triplet whose one member is: (i) 6 (ii) 14 (iii) 16 (iv) 18",
            ],
        },
        {
            "id": "ex5.3",
            "source_ref": "hemh105.txt lines 580-611 (Exercise 5.3)",
            "questions": [
                "What could be the possible ones digits of the square root of each of the following numbers? 9801; 99856; 998001; 657666025",
                "Without doing any calculation, find the numbers which are surely not perfect squares: 153; 257; 408; 441",
                "Find the square roots of 100 and 169 by the method of repeated subtraction",
                "Find the square roots by the Prime Factorisation Method: 729; 400; 1764; 4096; 7744; 9604; 5929; 9216; 529; 8100",
                "For 252; 180; 1008; 2028; 1458; 768 find the smallest whole number by which it should be multiplied so as to get a perfect square number, and the square root of the square number so obtained",
                "For 252; 2925; 396; 2645; 2800; 1620 find the smallest whole number by which it should be divided so as to get a perfect square, and the square root of the square number so obtained",
                "The students of Class VIII donated 2401 rupees for Prime Minister's National Relief Fund. Each student donated as many rupees as the number of students in the class. Find the number of students in the class",
                "2025 plants are to be planted in a garden in such a way that each row contains as many plants as the number of rows. Find the number of rows and the number of plants in each row",
                "Find the smallest square number that is divisible by each of the numbers 4, 9 and 10",
                "Find the smallest square number that is divisible by each of the numbers 8, 15 and 20",
            ],
        },
        {
            "id": "ex5.4",
            "source_ref": "hemh105.txt lines 824-854 (Exercise 5.4)",
            "questions": [
                "Find the square root by Division method: 2304; 4489; 3481; 529; 3249; 1369; 5776; 7921; 576; 1024; 3136; 900",
                "Find the number of digits in the square root of each of the following numbers without any calculation: 64; 144; 4489; 27225; 390625",
                "Find the square root of the following decimal numbers: 2.56; 7.29; 51.84; 42.25; 31.36",
                "Find the least number which must be subtracted from each of the following numbers so as to get a perfect square, and the square root of the perfect square so obtained: 402; 1989; 3250; 825; 4000",
                "Find the least number which must be added to each of the following numbers so as to get a perfect square, and the square root of the perfect square so obtained: 525; 1750; 252; 1825; 6412",
                "Find the length of the side of a square whose area is 441 sq m",
                "In a right triangle ABC, angle B = 90: (a) if AB = 6 cm, BC = 8 cm, find AC (b) if AC = 13 cm, BC = 5 cm, find AB",
                "A gardener has 1000 plants. He wants to plant them so that the number of rows and the number of columns remain the same. Find the minimum number of plants he needs more",
                "There are 500 children in a school. For a P.T. drill they have to stand with the number of rows equal to the number of columns. How many children would be left out in this arrangement",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(
        out_dir, "catalog_class8_maths_ch5_squares_square_roots.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
