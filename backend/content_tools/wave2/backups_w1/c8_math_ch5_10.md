## ELI5
Take a two-digit number and swap its digits — the algebra behind the trick is small: any such number is ten times its tens digit plus its units digit, and the reversal simply swaps the seats. Puzzles then hand you a relationship: the reversal exceeds the original by some amount, or their sum is given. Translate, simplify, and a clean fact surfaces — the difference of a number and its reversal is always a multiple of nine, because the digits trade places across a gap of nine times something.

## DEFINITION
A two-digit number reversal puzzle involves representing a two-digit number algebraically as \(10a + b\) (where \(a\) is the tens digit, \(1 \le a \le 9\), and \(b\) is the units digit, \(0 \le b \le 9\)), and its reversal as \(10b + a\). The puzzle sets up a relationship (sum, difference, product, or ratio) between the original and reversed numbers, leading to a linear equation or system in \(a\) and \(b\) that is solved under the digit constraints.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can translate a word problem about a two-digit number and its reversal into an algebraic equation using place value representation \(10a+b\), solve for the digits \(a\) and \(b\) using linear equation techniques, and verify that the solution satisfies both the equation and the digit constraints (\(1 \le a \le 9\), \(0 \le b \le 9\)).
## SCOPE_BOUNDARY
Covers two-digit number reversal problems where the relationship between the number and its reversal is expressed as a linear equation (sum, difference, or simple multiple). Does NOT cover three-digit reversals, cryptarithms with multiple letters (covered in c8_math_ch5_11), or non-linear relationships.
## WALKTHROUGH
Imagine you have a ₹100 note and you buy a notebook for ₹37. The shopkeeper accidentally gives you change as if the price were ₹73 (the digits reversed). You wonder: "For which two-digit prices does reversing the digits give a specific difference?" Start by letting the tens digit be \(a\) and units digit be \(b\). Write the original number as \(10a+b\) and reversed as \(10b+a\). Use the given condition (e.g., "difference is 36") to form an equation: \((10a+b) - (10b+a) = 36\). Simplify to \(9a - 9b = 36\) or \(a - b = 4\). Since \(a,b\) are digits, list possible pairs \((a,b)\): (5,1), (6,2), (7,3), (8,4), (9,5). The key insight: the difference of a two-digit number and its reversal is always a multiple of 9.

Takeaway: write N = 10a + b and the reversal as 10b + a; then N − N_rev = 9(a − b) and N + N_rev = 11(a + b) — differences are multiples of nine, sums multiples of eleven; finish by listing digit pairs that satisfy the constraint. Exam format: expect 'translate the word problem into an equation' — the place-value setup line carries the marks, not the arithmetic. Verification beat: check the answer obeys digit limits — tens digit from one to nine, units zero to nine. Why students miss it: they treat digits as one unknown; two digits mean two seats, and the reversal puzzle is a system in disguise.

## DIAGNOSTIC_QUESTION_1
If a two-digit number is written as \(10a + b\), what is the algebraic expression for the number formed by reversing its digits?
## DIAGNOSTIC_ANSWER_1
The reversed number is \(10b + a\). A wrong answer like \(a + b\) or \(10a + b\) reveals the student does not understand place value: the tens digit becomes the units digit and vice versa, so the new tens digit is \(b\) (worth \(10b\)) and the new units digit is \(a\) (worth \(a\)).
## DIAGNOSTIC_QUESTION_2
Explain why the difference between a two-digit number and its reversal is always a multiple of 9.
## DIAGNOSTIC_ANSWER_2
Original: \(10a+b\), Reversed: \(10b+a\). Difference = \((10a+b) - (10b+a) = 9a - 9b = 9(a-b)\). Since \(a,b\) are integers, \(a-b\) is an integer, so the difference is a multiple of 9. A wrong answer that just tests examples (e.g., "21-12=9, 31-13=18") shows lack of algebraic generalization; the student relies on pattern recognition without understanding the structural reason.
## DIAGNOSTIC_QUESTION_3
The sum of a two-digit number and its reversal is 110. Find the number if the digits differ by 4.
## DIAGNOSTIC_ANSWER_3
Let number be \(10a+b\). Reversed: \(10b+a\). Sum: \(11a+11b = 110 \Rightarrow a+b=10\). Difference of digits: \(|a-b|=4\). Solve: \(a+b=10, a-b=4 \Rightarrow 2a=14 \Rightarrow a=7, b=3\). Number = 73. Check: 73+37=110, digits differ by 4. If \(a-b=-4\), then \(a=3,b=7\) giving 37, which also works. A wrong answer that gives only 73 misses the second possibility; the student forgot the absolute value or didn't consider both orders.
## DIAGNOSTIC_QUESTION_4
A student claims: "If the sum of a two-digit number and its reversal is 99, then the number must be 45 or 54." Analyze this claim and determine if it is always true, sometimes true, or never true. Justify.
## DIAGNOSTIC_ANSWER_4
The claim is **sometimes true**. Sum = \(11(a+b)=99 \Rightarrow a+b=9\). Pairs of digits summing to 9: (1,8),(2,7),(3,6),(4,5),(5,4),(6,3),(7,2),(8,1). Numbers: 18,27,36,45,54,63,72,81. The student only listed 45 and 54, missing the other six. This reveals the student assumed the digits must be consecutive or didn't systematically list all digit pairs satisfying \(a+b=9\).
## DIAGNOSTIC_QUESTION_5
Ravi solved a puzzle: "A two-digit number is 4 times the sum of its digits. When 18 is added to the number, the digits are reversed." He wrote: \(10a+b = 4(a+b)\) and \(10a+b+18 = 10b+a\). He got \(a=2, b=4\) and answered 24. Check if his solution is correct. If not, identify the error.
## DIAGNOSTIC_ANSWER_5
Ravi's equations are correct. From first: \(10a+b=4a+4b \Rightarrow 6a=3b \Rightarrow 2a=b\). From second: \(9a-9b=-18 \Rightarrow a-b=-2\). Substitute \(b=2a\): \(a-2a=-2 \Rightarrow -a=-2 \Rightarrow a=2, b=4\). Number = 24. Check: Sum of digits=6, 4×6=24. 24+18=42 (reversed). **His solution is correct**. A student who says it's wrong might have miscalculated \(6a=3b\) as \(2a=b\) (correct) but then solved \(a-b=-2\) incorrectly, or might have thought the second equation should be \(10a+b-18=10b+a\) (misreading "added" as "subtracted").
## DIAGNOSTIC_QUESTION_6
Create a two-digit number reversal puzzle with the following conditions: (1) The number is greater than its reversal. (2) The difference between the number and its reversal is 27. (3) The sum of the digits is 9. Write the puzzle statement and solve it.
## DIAGNOSTIC_ANSWER_6
Puzzle: "I am a two-digit number. My digits add up to 9. I am greater than my reversal, and the difference between us is 27. What number am I?" Solution: Let number be \(10a+b\). \(a+b=9\). Difference: \((10a+b)-(10b+a)=27 \Rightarrow 9(a-b)=27 \Rightarrow a-b=3\). Solve: \(a+b=9, a-b=3 \Rightarrow 2a=12 \Rightarrow a=6, b=3\). Number = 63. Check: 63>36, 63-36=27, 6+3=9. A poor answer might give a puzzle with no solution (e.g., difference 27 and sum 10, which gives non-integer digits) or forget the "greater than" condition leading to two answers (63 and 36).
## COMMON_MISCONCEPTION
Students often write the reversed number as \(a+b\) (sum of digits) or \(10a+b\) (same as original) instead of \(10b+a\). They treat digits as values to be added rather than place-value positions. For example, for number 37, they write reversal as \(3+7=10\) or \(10\times3+7=37\), not \(10\times7+3=73\). This stems from confusing "reversing digits" with "adding digits" or not internalizing that the tens digit moves to units place and vice versa.
## ON_FAILURE
1. Return to place value: write 37 as \(3 \times 10 + 7\). Ask: "Which digit is in tens place? Which in units?" 2. Physically swap digit cards: show 3 and 7 cards, swap positions, ask "What is the new number?" 3. Connect to algebra: original \(10a+b\), after swap tens digit becomes \(b\) (value \(10b\)), units becomes \(a\) (value \(a\)). 4. Practice with 5 examples: 12→21, 40→04 (not a two-digit number, discuss), 56→65, 90→09, 23→32. Emphasize: reversed = \(10 \times (\text{original units}) + (\text{original tens})\).
## PREREQUISITE_NODE_IDS
c6_math_ch01_003, c6_math_ch05_052, c6_math_ch05_056, c7_math_ch06_006, c8_math_ch5_5, c8_math_ch5_7, c8_math_ch5_8, c8_math_ch5_9
## PREREQUISITE_REASONS
c6_math_ch01_003: Place value understanding (tens/units) is essential to represent a two-digit number as 10a+b.
c6_math_ch05_052: Introduction to variables and algebraic expressions needed to set up equations with digits a and b.
c6_math_ch05_056: Solving linear equations in one variable is required to find a and b from the derived equations.
c7_math_ch06_006: Prior exposure to digit puzzles and logic builds intuition for this more formal algebraic approach.
c8_math_ch5_5: Parity rules help quickly eliminate impossible digit pairs (e.g., sum of digits parity vs number parity).
c8_math_ch5_7: Algebraic explanation of parity patterns reinforces why 9(a-b) structure appears.
c8_math_ch5_8: Divisibility by 9 test connects to the fact that difference of number and reversal is multiple of 9.
c8_math_ch5_9: Divisibility by 11 test connects to the fact that sum of number and reversal is multiple of 11.
## FORWARD_NODE_IDS
c8_math_ch5_11
## FORWARD_REASONS
c8_math_ch5_11: Cryptarithms extend the digit-reversal concept to multi-letter puzzles where each letter stands for a digit; the algebraic representation 10a+b is the foundational building block.
## CROSS_SUBJECT_PREREQS
c6_math_ch01_003, c6_math_ch05_052, c7_math_ch06_006
## CROSS_SUBJECT_REASONS
c6_math_ch01_003: Place value is a cross-cutting concept used in measurement (metres/centimetres), money (rupees/paise), and data representation.
c6_math_ch05_052: Algebraic thinking with variables is used in physics (formulas), chemistry (balancing equations), and economics (cost functions).
c7_math_ch06_006: Logical reasoning with number puzzles develops computational thinking skills applicable in computer science (algorithms) and cryptography.
## CHAIN_DESCRIPTION
c6_math_ch01_003 -> c6_math_ch05_052 -> c6_math_ch05_056 -> c7_math_ch06_006 -> c8_math_ch5_10 -> c8_math_ch5_11
## THIS_FORMULA
Original number: \(N = 10a + b\); Reversed number: \(N_{rev} = 10b + a\); Sum: \(N + N_{rev} = 11(a+b)\); Difference: \(N - N_{rev} = 9(a-b)\)
## FORMULA_VARIABLES
a = tens digit (1 to 9), b = units digit (0 to 9), N = original two-digit number, N_rev = reversed number
## FORMULA_UNITS
dimensionless (digits are pure numbers)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT

## PREREQ_CONCEPT
Place value representation of two-digit numbers as \(10a+b\) and solving linear equations in one variable.
## PREREQ_BEFORE
Student must be able to write a two-digit number in expanded form (e.g., 47 = 4×10 + 7) and solve equations like \(9x = 36\) or \(11y = 99\).
## PREREQ_STUCK
Revisit c6_math_ch01_003 (Place Value and Face Value) for expanded form and c6_math_ch05_056 (Solving Linear Equations) for equation solving.
## WORKED_EXAMPLE_1
PROBLEM: A two-digit number is such that the sum of the number and its reversal is 121. The digits differ by 3. Find the number.
STEPS:
- Step 1: Let the tens digit be \(a\) and units digit be \(b\). The number is \(10a+b\). The reversed number is \(10b+a\).
- Step 2: Write the sum condition: \((10a+b) + (10b+a) = 121\). Simplify: \(11a + 11b = 121 \Rightarrow a+b = 11\).
- Step 3: Write the digit difference condition: \(|a-b| = 3\). This gives two cases: \(a-b=3\) or \(b-a=3\).
- Step 4: Solve case 1: \(a+b=11\) and \(a-b=3\). Adding: \(2a=14 \Rightarrow a=7, b=4\). Number = 74.
- Step 5: Solve case 2: \(a+b=11\) and \(b-a=3\) (i.e., \(a-b=-3\)). Adding: \(2a=8 \Rightarrow a=4, b=7\). Number = 47.
- Step 6: Verify both: 74+47=121, digits differ by 3. 47+74=121, digits differ by 3. Both satisfy.
REASONING: The sum of a number and its reversal is always \(11(a+b)\), a multiple of 11. Here 121=11×11 gives \(a+b=11\). The absolute difference condition yields two symmetric solutions because the problem doesn't specify which digit is larger.
ANSWER: 74 or 47
## WORKED_EXAMPLE_2
PROBLEM: The difference between a two-digit number and its reversal is 45. If the tens digit is twice the units digit, find the number.
STEPS:
- Step 1: Let number be \(10a+b\), reversal \(10b+a\). Given: number > reversal (since difference is positive 45).
- Step 2: Difference equation: \((10a+b) - (10b+a) = 45 \Rightarrow 9a - 9b = 45 \Rightarrow a - b = 5\).
- Step 3: Digit relationship: tens digit is twice units digit \(\Rightarrow a = 2b\).
- Step 4: Substitute \(a=2b\) into \(a-b=5\): \(2b - b = 5 \Rightarrow b = 5\).
- Step 5: Then \(a = 2 \times 5 = 10\). But \(a\) must be a single digit (1-9). \(a=10\) is invalid.
- Step 6: Re-read problem: "tens digit is twice the units digit". If number > reversal, then \(a>b\). But \(a=2b\) and \(a-b=5\) gives \(b=5, a=10\) impossible. Check if reversal > number? Then difference would be -45, but problem says "difference is 45" (usually absolute). Try absolute difference: \(|a-b|=5\). With \(a=2b\), \(|2b-b|=|b|=5 \Rightarrow b=5, a=10\) still invalid. No solution exists under given constraints.
REASONING: The conditions \(a-b=5\) and \(a=2b\) lead to \(b=5, a=10\) which violates the digit constraint \(a \le 9\). This teaches students to always check digit constraints after solving algebraically.
ANSWER: No such two-digit number exists.
## WORKED_EXAMPLE_3
PROBLEM: A two-digit number is 3 times the sum of its digits. If 45 is added to the number, the digits are reversed. Find the number.
STEPS:
- Step 1: Let number be \(10a+b\). Reversal: \(10b+a\).
- Step 2: First condition: Number = 3 × (sum of digits) \(\Rightarrow 10a+b = 3(a+b)\).
- Step 3: Simplify: \(10a+b = 3a+3b \Rightarrow 7a = 2b \Rightarrow b = \frac{7}{2}a\).
- Step 4: Second condition: Number + 45 = Reversal \(\Rightarrow 10a+b+45 = 10b+a \Rightarrow 9a - 9b = -45 \Rightarrow a - b = -5 \Rightarrow b = a+5\).
- Step 5: Equate the two expressions for \(b\): \(\frac{7}{2}a = a+5 \Rightarrow 7a = 2a+10 \Rightarrow 5a = 10 \Rightarrow a = 2\).
- Step 6: Then \(b = a+5 = 7\). Check digit constraint: \(a=2\) (1-9), \(b=7\) (0-9) valid.
- Step 7: Number = 27. Verify: Sum of digits = 9, 3×9=27. 27+45=72 (reversed). Both conditions satisfied.
REASONING: This problem combines a multiplicative relationship (number = k × digit sum) with a reversal-after-addition condition. The first gives a ratio between digits (\(7a=2b\)), the second gives a linear difference (\(b=a+5\)). Solving the system yields the unique digit pair. The fractional relation \(b=\frac{7}{2}a\) forces \(a\) to be even; here \(a=2\) works, \(a=4\) would give \(b=14\) (invalid).
ANSWER: 27
## COMPETENCY_QUESTION_1
QUESTION: "Think of a two-digit number. Reverse its digits. Subtract the smaller from the larger. Divide the result by 9. The quotient equals the difference of the digits." Explain why this trick always works, using algebra. Then, create a similar trick for the SUM of the number and its reversal.
COMPETENCY: Translating real-world situations to mathematical expressions and generalizing patterns
STEPS:
- Step 1: Represent the two-digit number as 10a+b, reversed as 10b+a.
- Step 2: Assume a > b (so original is larger). Difference = (10a+b) - (10b+a) = 9a-9b = 9(a-b).
- Step 3: Divide by 9: quotient = a-b, which is exactly the difference of the digits.
- Step 4: For the sum trick: Sum = (10a+b)+(10b+a) = 11(a+b). Divide by 11: quotient = a+b (sum of digits).
- Step 5: State the sum trick: "Add the number and its reversal, divide by 11, the quotient is the sum of the digits."
ANSWER: The trick works because the difference simplifies to 9(a-b) and the sum simplifies to 11(a+b). The division by 9 or 11 cancels the factor, leaving the digit difference or sum.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A teacher asks: "Find a two-digit number such that when you reverse its digits and add the two numbers, the result is a perfect square. Also, the difference of the digits is 2." Find all such numbers. Explain your reasoning.
COMPETENCY: Problem solving with multiple constraints and number theory connections
STEPS:
- Step 1: Let number be 10a+b. Sum with reversal = 11(a+b). This must be a perfect square.
- Step 2: Since a,b are digits 1-9 and 0-9, a+b ranges from 1 to 18. So 11(a+b) ranges from 11 to 198.
- Step 3: Perfect squares in this range that are multiples of 11: 11×1=11 (no), 11×4=44 (no), 11×9=99 (no), 11×16=176 (no). Wait: 11(a+b) = k². Since 11 is prime, k² must have factor 11²=121. So 11(a+b)=121 ⇒ a+b=11. (Next 11×25=275 >198).
- Step 4: So a+b=11. Also given |a-b|=2.
- Step 5: Case 1: a-b=2. Solve with a+b=11: 2a=13 ⇒ a=6.5 (not a digit).
- Step 6: Case 2: b-a=2 (i.e., a-b=-2). Solve: 2a=9 ⇒ a=4.5 (not a digit).
- Step 7: No integer digit solutions. Therefore, no such two-digit number exists.
- Step 8: Verify: The only possible sum is 99 (if a+b=9, 11×9=99 not square) or 121 (a+b=11). But a+b=11 with digit difference 2 gives non-integer digits.
ANSWER: No such two-digit number exists. The constraints are contradictory.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The shopkeeper accidentally gives you change as if the price were ₹73 (the digits ______).

## DIAGNOSTIC_ANSWER_7
reversed

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The shopkeeper accidentally gives you change as if the price were ₹______ (the digits reversed).

## DIAGNOSTIC_ANSWER_8
73

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The shopkeeper ______ gives you change as if the price were ₹73 (the digits reversed).

## DIAGNOSTIC_ANSWER_9
accidentally
