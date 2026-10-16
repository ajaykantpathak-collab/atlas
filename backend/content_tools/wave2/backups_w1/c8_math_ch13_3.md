## ELI5
Stack numbers into a pyramid where every brick is the sum of the two bricks resting directly beneath it. The bottom row holds the starting numbers; each row above is built by adding neighbours, until a single stone crowns the top. Nothing here needs algebra yet — only the one rule, applied patiently. And a pattern hides inside: with three base numbers, the top works out to the outer ones plus twice the middle, the same counting pattern that opens Pascal's famous triangle.

## DEFINITION
A number pyramid is a triangular arrangement of numbers where each number in a higher row is the sum of the two numbers directly below it in the row immediately beneath. The bottom row (base) contains the starting numbers (constants or variables), and the rule recursively generates all rows above until a single top number (apex) is reached.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can construct a number pyramid of 3-4 rows given the base numbers, find missing numbers in any row by working upwards or downwards using the addition rule, and express the apex as an algebraic expression in terms of the base variables (e.g., for base \(a, b, c\), apex \(= a + 2b + c\)).
## SCOPE_BOUNDARY
Covers the additive rule for number pyramids (each block = sum of two directly below). Focuses on 3-row and 4-row pyramids with integer, decimal, or algebraic base entries. Does NOT cover pyramids with other operations (multiplication, subtraction), inverted pyramids, or Pascal's triangle combinatorics beyond the coefficient pattern observed.
## WALKTHROUGH
Imagine you are stacking boxes in a warehouse: each box in an upper layer sits exactly on two boxes below it. If each box has a weight written on it, the weight on the upper box is the sum of the two weights supporting it. This is exactly a number pyramid! We have already seen patterns like matchstick sequences (c7_math_ch04_005) where we used variables to describe the \(n\)-th figure. Here, we start by writing the given base numbers in the bottom row. Then, step by step, we add pairs of adjacent numbers to fill the row above. We repeat until we reach the top. The key insight is that the top number is a specific linear combination of the base numbers — for a 3-row pyramid with base \(a, b, c\), the top is always \(a + 2b + c\). This pattern of coefficients (1, 2, 1) is the beginning of Pascal’s Triangle, which we will explore further.

Takeaway: one rule runs the whole pyramid — each cell is the sum of the two cells directly below it — so build upwards for the apex, or subtract downwards to fill a missing base value. Exam format: expect 'find the missing cell' and 'write the apex as an expression in the base variables'. Verification beat: re-add each new cell from its two parents before climbing higher. Why students miss it: they add horizontal neighbours instead of the two directly beneath — the diagonal pair, not the row, feeds each brick.

## DIAGNOSTIC_QUESTION_1
State the exact rule for finding the value of a block in a number pyramid (except the bottom row). Use the words "below", "adjacent", and "sum" in your answer.
## DIAGNOSTIC_ANSWER_1
Correct answer: "Each block (except those in the bottom row) equals the sum of the two adjacent blocks directly below it."  
A wrong answer like "add the two numbers above it" or "add the two numbers next to it in the same row" reveals the student has not internalised the directional nature of the rule (building upward from the base) and is confusing spatial relationships.
## DIAGNOSTIC_QUESTION_2
In a 3-row number pyramid with base numbers \(a, b, c\) (left to right), the top number is \(a + 2b + c\). Explain WHY the coefficient of \(b\) is 2 while \(a\) and \(c\) have coefficient 1. Draw a small pyramid to support your explanation.
## DIAGNOSTIC_ANSWER_2
Correct explanation: The middle base number \(b\) contributes to both blocks in the second row (left block \(a+b\) and right block \(b+c\)). When these are added for the top, \(b\) appears twice: \((a+b) + (b+c) = a + 2b + c\). The edge numbers \(a\) and \(c\) each contribute to only one second-row block, so they appear once.  
A wrong answer that just states "because of the pattern" or "Pascal's Triangle" without tracing the contributions shows the student sees the pattern but does not understand the mechanistic reason — the double-counting of the middle base element.
## DIAGNOSTIC_QUESTION_3
Build a 4-row number pyramid with the base row: \(3,\; -2,\; 5,\; 1\). Find the top number. Show all rows.
## DIAGNOSTIC_ANSWER_3
Row 4 (base): \(3,\; -2,\; 5,\; 1\)  
Row 3: \(3+(-2)=1,\; -2+5=3,\; 5+1=6\) → \(1,\; 3,\; 6\)  
Row 2: \(1+3=4,\; 3+6=9\) → \(4,\; 9\)  
Row 1 (top): \(4+9 = 13\)  
Top number = 13.  
A wrong answer often comes from sign errors in Row 3 (e.g., \(3+(-2)=5\) instead of 1) or misaligning the pairs (adding non-adjacent numbers). This reveals shaky integer addition or not understanding "adjacent" means immediate neighbours.
## DIAGNOSTIC_QUESTION_4
Two students build 4-row pyramids with the same base numbers \(p, q, r, s\). Student A uses the rule "add the two below". Student B mistakenly uses "add the two above" (starting from the top). Will they get the same pyramid? Explain why or why not, and describe what Student B's pyramid would look like if the top is \(T\).
## DIAGNOSTIC_ANSWER_4
No, they will not get the same pyramid. The rule "add the two below" is deterministic upward: base uniquely determines the top. The rule "add the two above" is deterministic downward: the top and one base number would determine the rest, but with only the top given, there are infinitely many solutions. Student B's pyramid would have the top \(T\), then the second row would be two numbers that sum to \(T\) (e.g., \(x, T-x\)), the third row would depend on further choices, and the base would not necessarily be \(p, q, r, s\).  
A wrong answer saying "yes, addition is commutative" shows the student confuses the commutativity of addition with the directionality of the recursive construction. The pyramid structure imposes a strict causal direction.
## DIAGNOSTIC_QUESTION_5
Ravi claims: "In any 3-row number pyramid with integer base numbers, the top number is always even." Is Ravi correct? Justify your answer with a counterexample or proof.
## DIAGNOSTIC_ANSWER_5
Ravi is incorrect. Counterexample: base \(1, 1, 1\) → second row \(2, 2\) → top \(4\) (even). But base \(1, 2, 1\) → second row \(3, 3\) → top \(6\) (even). Wait, try base \(1, 1, 2\) → top \(1 + 2(1) + 2 = 5\) (odd). Since \(a + 2b + c\) has the parity of \(a + c\) (because \(2b\) is always even), the top is even only when \(a\) and \(c\) have the same parity.  
A wrong answer agreeing with Ravi reveals the student thinks \(2b\) makes the whole sum even, ignoring that \(a+c\) could be odd. This is a parity reasoning gap from c7_math_ch06_003.
## DIAGNOSTIC_QUESTION_6
Create a 3-row number pyramid where the base numbers are three consecutive multiples of 5, and the top number is 60. Write the base numbers and show the full pyramid. (Hint: Let the numbers be \(5n, 5n+5, 5n+10\).)
## DIAGNOSTIC_ANSWER_6
Let base = \(5n, 5n+5, 5n+10\). Top = \(5n + 2(5n+5) + (5n+10) = 5n + 10n+10 + 5n+10 = 20n + 20\).  
Set \(20n + 20 = 60 \Rightarrow 20n = 40 \Rightarrow n = 2\).  
Base = \(10, 15, 20\).  
Pyramid:  
Row 3: \(10,\; 15,\; 20\)  
Row 2: \(25,\; 35\)  
Row 1: \(60\)  
A poor answer that guesses numbers without algebra shows the student cannot translate the "consecutive multiples" condition into an algebraic expression and solve — a gap in forming expressions (c7_math_ch04_004) and solving linear equations (c7_math_ch15_003).
## COMMON_MISCONCEPTION
Students often write the second row as \(a+b,\; b+c\) correctly, but then for the third row they write \((a+b) + (b+c)\) and simplify to \(a + b + c\) (forgetting that \(b+b = 2b\)). They treat the algebraic addition like concatenation: "a+b plus b+c gives a+b+b+c" but then drop one \(b\). Another error: when the base has variables, they try to "solve for \(x\)" in the base before building the pyramid, not realising the pyramid rule works with variables exactly as with numbers — the apex becomes an expression like \(3x+7\).
## ON_FAILURE
1. Have the student build a pyramid with physical number cards (e.g., base: 2, 5, 3). Physically place the sum cards above. Ask: "How many times did we use the 5?" (Twice: once for 2+5, once for 5+3).  
2. Write the algebraic pyramid side-by-side with the numeric one: base \(x, 5, y\) → second row \(x+5,\; 5+y\) → top \((x+5)+(5+y)\). Circle the two 5's in the second row and ask "What is 5+5?" → \(10 = 2\times5\).  
3. Generalise: "The middle base number always gets added twice because it supports two blocks above. That's why its coefficient is 2."  
4. Practice with 3-4 examples where the base has a variable in the middle, forcing the student to write the coefficient explicitly (e.g., base \(4, m, 1\) → top \(4 + 2m + 1 = 2m + 5\)).
## PREREQUISITE_NODE_IDS
c7_math_ch04_005, c7_math_ch04_008, c7_math_ch06_001, c7_math_ch06_008, c6_math_ch05_052, c6_math_ch05_053, c6_math_ch05_054, c6_math_ch05_060, c8_math_ch13_1, c8_math_ch13_2
## PREREQUISITE_REASONS
c7_math_ch04_005: Matchstick patterns taught generalising with variables — essential for writing pyramid apex as algebraic expression.
c7_math_ch04_008: Picking patterns and revealing relationships builds the habit of looking for structural rules, not just numerical answers.
c7_math_ch06_001: Interpreting number sequences develops the "what comes next?" reasoning used in recursive pyramid building.
c7_math_ch06_008: Identifying patterns in sequences directly supports seeing the coefficient pattern (1,2,1) in 3-row pyramids.
c6_math_ch05_052: Introduction to variables and constants is the foundation for using \(a, b, c\) as base numbers.
c6_math_ch05_053: Understanding terms and coefficients is needed to recognise \(2b\) as a term with coefficient 2.
c6_math_ch05_054: Forming algebraic expressions from word problems translates to forming the apex expression from the pyramid structure.
c6_math_ch05_060: Patterns and algebra connects geometric/number patterns to algebraic generalisation — the core of this topic.
c8_math_ch13_1: Think-of-a-number tricks use algebraic reasoning to explain why a result occurs — same logical structure.
c8_math_ch13_2: Designing number tricks requires reversing algebraic steps — similar to working downward in a pyramid to find missing base numbers.
## FORWARD_NODE_IDS
c8_math_ch13_4, c8_math_ch13_5, c8_math_ch13_6, c8_math_ch13_7
## FORWARD_REASONS
c8_math_ch13_4: Solving number pyramids using algebra directly extends this node — we now set the apex expression equal to a given value and solve for unknown base variables.
c8_math_ch13_5: The apex expressions (e.g., \(a+2b+c\)) are algebraic expressions whose terms, coefficients, and constants we will formally identify and name.
c8_math_ch13_6: When combining pyramids or simplifying apex expressions, we must identify like terms (e.g., \(2b + 3b\)) — this node provides the context.
c8_math_ch13_7: Adding/subtracting algebraic expressions is needed when we combine two pyramids or find the difference between two apex expressions.
## CROSS_SUBJECT_PREREQS
c7_math_ch04_010, c7_math_ch06_005
## CROSS_SUBJECT_REASONS
c7_math_ch04_010: Using algebraic expressions to describe geometric patterns — the number pyramid is a geometric arrangement (triangle) described by an algebraic rule.
c7_math_ch06_005: Virahanka-Fibonacci sequence appears in Pascal's Triangle diagonals; the pyramid coefficients (1,2,1, 1,3,3,1) are rows of Pascal's Triangle, linking to combinatorial patterns in nature.
## CHAIN_DESCRIPTION
c7_math_ch04_005 -> c8_math_ch13_3 -> c8_math_ch13_4
## THIS_FORMULA
For a 3-row pyramid with base \(a, b, c\): \(\text{Top} = a + 2b + c\).  
For a 4-row pyramid with base \(a, b, c, d\): \(\text{Top} = a + 3b + 3c + d\).  
General rule: \(\text{Block}_{i,j} = \text{Block}_{i+1,j} + \text{Block}_{i+1,j+1}\) where \(i\) is row from top (1-indexed) and \(j\) is position from left.
## FORMULA_VARIABLES
\(a, b, c, d\) = numbers in the base row (left to right); \(\text{Top}\) = apex number; \(\text{Block}_{i,j}\) = number at row \(i\), position \(j\).
## FORMULA_UNITS
dimensionless (pure numbers)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c7_math_ch04_010 | The pyramid is a geometric pattern (triangular array) that is described and generalised using algebraic expressions, exactly as matchstick patterns were.
c7_math_ch06_005 | The coefficients in the apex expression (1,2,1 for 3 rows; 1,3,3,1 for 4 rows) are rows of Pascal's Triangle, which also generates the Virahanka-Fibonacci sequence along its diagonals — connecting combinatorics to number patterns.
## PREREQ_CONCEPT
Ability to form and simplify algebraic expressions involving variables and constants, and to recognise recursive patterns where each step depends on the previous one.
## PREREQ_BEFORE
Student must be able to write an algebraic expression for a simple pattern (e.g., "5 more than twice a number" → \(2x+5\)) and perform integer addition with negative numbers.
## PREREQ_STUCK
Revisit forming algebraic expressions from patterns (c7_math_ch04_004) and integer addition rules (c7_math_ch10_002, c7_math_ch10_003).
## WORKED_EXAMPLE_1
PROBLEM: A school is arranging chairs in a pyramid formation for a ceremony. The bottom row has 4 chairs marked with numbers: 12, 7, -3, 5. Each chair above rests on two chairs below and shows the sum of their numbers. What number will be on the top chair? Show all rows.

STEPS:
- Step 1: Identify the base row (Row 4): 12, 7, -3, 5. We need to build Row 3, Row 2, and Row 1 (top) using the rule: each block = sum of two adjacent blocks directly below.
- Step 2: Compute Row 3 by adding adjacent pairs in Row 4: (12+7)=19, (7+(-3))=4, (-3+5)=2. So Row 3 = 19, 4, 2.
- Step 3: Compute Row 2 by adding adjacent pairs in Row 3: (19+4)=23, (4+2)=6. So Row 2 = 23, 6.
- Step 4: Compute Row 1 (top) by adding the two numbers in Row 2: 23+6 = 29.
- Step 5: Verify using the algebraic formula for a 4-row pyramid: Top = a + 3b + 3c + d = 12 + 3(7) + 3(-3) + 5 = 12 + 21 - 9 + 5 = 29. Matches.

REASONING: The pyramid rule is recursive — each row depends only on the row immediately below. By computing step-by-step, we avoid errors. The algebraic formula (derived from the coefficients of Pascal's Triangle) provides a quick check. The negative number (-3) is handled correctly because integer addition rules apply.

ANSWER: Top number = 29. Full pyramid: Row4: 12, 7, -3, 5; Row3: 19, 4, 2; Row2: 23, 6; Row1: 29.
## WORKED_EXAMPLE_2
PROBLEM: In a 3-row number pyramid, the base numbers are \(x\), 8, and \(y\) (left to right). The top number is 30. If \(x = 4\), find the value of \(y\). Then write the complete pyramid with numbers.

STEPS:
- Step 1: Write the algebraic expression for the top of a 3-row pyramid: Top = \(a + 2b + c\). Here \(a = x\), \(b = 8\), \(c = y\). So Top = \(x + 2(8) + y = x + 16 + y\).
- Step 2: Substitute the given top value (30) and \(x = 4\): \(4 + 16 + y = 30\).
- Step 3: Simplify the left side: \(20 + y = 30\).
- Step 4: Solve for \(y\): \(y = 30 - 20 = 10\).
- Step 5: Build the numeric pyramid to verify: Base = 4, 8, 10. Row 2: 4+8=12, 8+10=18. Top: 12+18=30. Correct.

REASONING: The algebraic expression captures the pyramid rule in one equation. Substituting known values reduces it to a simple linear equation in one variable. This connects the pyramid pattern directly to solving linear equations (c7_math_ch15_003). Verification by rebuilding the pyramid ensures no algebraic slip.

ANSWER: \(y = 10\). Pyramid: Base: 4, 8, 10; Row2: 12, 18; Top: 30.
## WORKED_EXAMPLE_3
PROBLEM: A 4-row number pyramid has base numbers \(2p,\; p+3,\; 5,\; q\). The top number is 47. If \(p = 4\), find \(q\). Show the algebraic expression for the top in terms of \(p\) and \(q\) first.

STEPS:
- Step 1: Recall the 4-row pyramid top formula: Top = \(a + 3b + 3c + d\). Here \(a = 2p\), \(b = p+3\), \(c = 5\), \(d = q\).
- Step 2: Substitute into the formula: Top = \(2p + 3(p+3) + 3(5) + q\).
- Step 3: Simplify the expression: \(2p + 3p + 9 + 15 + q = 5p + 24 + q\).
- Step 4: Substitute the given top (47) and \(p = 4\): \(5(4) + 24 + q = 47\).
- Step 5: Compute: \(20 + 24 + q = 47 \Rightarrow 44 + q = 47\).
- Step 6: Solve for \(q\): \(q = 47 - 44 = 3\).
- Step 7: Verify by building the full numeric pyramid with \(p=4, q=3\): Base = \(2(4)=8,\; 4+3=7,\; 5,\; 3\) → 8, 7, 5, 3. Row3: 15, 12, 8. Row2: 27, 20. Top: 47. Correct.

REASONING: This problem combines algebraic substitution, simplification (distributive property: \(3(p+3)=3p+9\)), and solving a linear equation. The pyramid structure gives meaning to the algebraic expression — the coefficients 1,3,3,1 come from the number of paths from each base block to the top. This foreshadows binomial expansion.

ANSWER: \(q = 3\). Algebraic top expression: \(5p + q + 24\). Full numeric pyramid (with p=4, q=3): Base: 8, 7, 5, 3; Row3: 15, 12, 8; Row2: 27, 20; Top: 47.
## COMPETENCY_QUESTION_1
QUESTION: A 4-row number pyramid has base numbers: 5, \(x\), 9, 2. The top number is 50. Find \(x\). Explain each step of your reasoning, including how you obtained the algebraic expression for the top number.

COMPETENCY: Translating a structural rule into an algebraic equation and solving for an unknown.

STEPS:
- Step 1: Recall the 4-row pyramid top formula: Top = \(a + 3b + 3c + d\). Identify \(a=5\), \(b=x\), \(c=9\), \(d=2\).
- Step 2: Write the expression for the top: Top = \(5 + 3x + 3(9) + 2 = 5 + 3x + 27 + 2 = 3x + 34\).
- Step 3: Set the expression equal to the given top (50): \(3x + 34 = 50\).
- Step 4: Solve for \(x\): \(3x = 16 \Rightarrow x = 16/3\).
- Step 5: Interpret: \(x\) is not an integer. Check if the problem allows fractions. Since base numbers can be any rational, this is valid. Verify by rebuilding pyramid with \(x = 16/3\).

ANSWER: \(x = \frac{16}{3}\) (or \(5\frac{1}{3}\)). The pyramid works with fractional base numbers. The key reasoning is that the coefficient 3 on \(b\) comes from the three distinct paths from the second base block to the top (via left-middle, middle-middle, middle-right of row 3).

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: In a 3-row number pyramid, the base consists of three consecutive integers. The top number is 63. Find the three integers. (Hint: Let the integers be \(n, n+1, n+2\).)

COMPETENCY: Generalising a number property (consecutive integers) into algebra, forming and solving a linear equation, and interpreting the solution in context.

STEPS:
- Step 1: Represent the three consecutive integers algebraically: \(n,\; n+1,\; n+2\).
- Step 2: Write the 3-row pyramid top formula: Top = \(a + 2b + c\). Substitute: Top = \(n + 2(n+1) + (n+2)\).
- Step 3: Simplify the expression: \(n + 2n + 2 + n + 2 = 4n + 4\).
- Step 4: Set equal to given top (63): \(4n + 4 = 63\).
- Step 5: Solve for \(n\): \(4n = 59 \Rightarrow n = 14.75\).
- Step 6: Check: \(n\) is not an integer, but the problem said "consecutive integers". This means no such integer pyramid exists! Re-read: "three consecutive integers" — if \(n\) must be integer, then \(4n+4\) is a multiple of 4, but 63 is not. So the problem has no solution in integers. Perhaps the top is 64? Or the numbers are consecutive even/odd? The reasoning reveals the impossibility.

ANSWER: No three consecutive integers satisfy this condition because the top of a 3-row pyramid with consecutive integers \(n, n+1, n+2\) is always \(4n+4\), which is a multiple of 4. Since 63 is not a multiple of 4, no solution exists. If the top were 64, then \(n=15\) and the base would be 15, 16, 17.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A number pyramid is a triangular ______ of numbers where each number in a higher row is the sum of the two numbers directly below it in the row immediately beneath.

## DIAGNOSTIC_ANSWER_7
arrangement

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are stacking boxes in a warehouse: each box in an upper layer sits ______ on two boxes below it.

## DIAGNOSTIC_ANSWER_8
exactly

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are stacking boxes in a ______: each box in an upper layer sits exactly on two boxes below it.

## DIAGNOSTIC_ANSWER_9
warehouse
