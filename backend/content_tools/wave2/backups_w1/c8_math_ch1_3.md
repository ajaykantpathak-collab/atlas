## ELI5
The last digit of a square depends only on the last digit of the number — the rest of the digits stay spectators. Square each ending digit and a repeating cycle appears: endings can only be zero, one, four, nine, six, five and back again. So a perfect square can never end in two, three, seven or eight — those doors are simply locked. The reason is clean: any number is some tens plus a last digit, and when squared, the tens contribute nothing to the final digit. Only the ending digit matters.

## DEFINITION
The units digit of a perfect square depends only on the units digit of the original integer. Squaring each digit 0 through 9 yields the repeating pattern of possible units digits: 0, 1, 4, 9, 6, 5, 6, 9, 4, 1. Consequently, a perfect square can never end in 2, 3, 7, or 8.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can determine the units digit of the square of any integer (including large numbers and algebraic expressions like \( (10a+b)^2 \)) and can correctly identify whether a given number could be a perfect square based solely on its units digit.
## SCOPE_BOUNDARY
Covers the pattern of units digits for squares of integers 0–9 and its extension to all integers via place value. Does not cover square roots, cubes, or divisibility rules beyond the units digit test.
## WALKTHROUGH
Imagine you are at a stationery shop and the shopkeeper says, "I have a box with a perfect square number of pencils. The number ends in 7." You immediately know the shopkeeper is mistaken. How? Start by writing the squares of numbers 1 to 10 and observe only the last digit. Connect this to Class 6 place value: when multiplying two numbers, the units digit of the product depends only on the units digits of the factors. Extend this to any integer \( n = 10a + b \); show algebraically that \( n^2 = 100a^2 + 20ab + b^2 \), so the units digit is exactly the units digit of \( b^2 \). The key insight: you never need to compute the full square to know its last digit.

Takeaway: the units digit of n² equals the units digit of b², where b is the units digit of n; the allowed endings are exactly 0, 1, 4, 5, 6, 9 — so endings 2, 3, 7, 8 are impossible. Exam format: expect 'could this large number be a perfect square?' — answer via the units digit in one line, no full squaring. Verification beat: verify with the algebra n² = 100a² + 20ab + b² — every term except b² ends in zero. Why students miss it: they attempt to square the whole number and drown; the digit-only shortcut is not a trick, it is the mathematics itself.

## DIAGNOSTIC_QUESTION_1
What are the possible units digits of a perfect square? List them.
## DIAGNOSTIC_ANSWER_1
The possible units digits are 0, 1, 4, 5, 6, 9. A wrong answer (e.g., including 2, 3, 7, 8 or missing 5) reveals the student has not memorised the pattern or does not understand that the units digit of \( n^2 \) is determined solely by the units digit of \( n \).
## DIAGNOSTIC_QUESTION_2
Explain why a number ending in 2 can never be a perfect square, using the algebraic form \( (10a+b)^2 \).
## DIAGNOSTIC_ANSWER_2
For any integer \( n = 10a+b \), \( n^2 = 100a^2 + 20ab + b^2 \). The term \( 100a^2 + 20ab \) is a multiple of 10, so the units digit of \( n^2 \) is the units digit of \( b^2 \). Since \( b \) is a digit 0–9, \( b^2 \) gives units digits 0,1,4,9,6,5,6,9,4,1 — never 2,3,7,8. A wrong answer indicates the student cannot link the algebraic expansion to the place-value argument.
## DIAGNOSTIC_QUESTION_3
Find the units digit of \( 237^2 \) without calculating the full square.
## DIAGNOSTIC_ANSWER_3
Step 1: The units digit of 237 is 7. Step 2: Compute \( 7^2 = 49 \). Step 3: The units digit of 49 is 9. Therefore, the units digit of \( 237^2 \) is 9. A wrong answer (e.g., 49 or 7) shows the student either computes the whole square or confuses the units digit of the base with the units digit of the square.
## DIAGNOSTIC_QUESTION_4
Compare the units digits of the squares of 12 and 22. What do you notice? Generalise for any two numbers that have the same units digit.
## DIAGNOSTIC_ANSWER_4
\( 12^2 = 144 \) (units digit 4), \( 22^2 = 484 \) (units digit 4). They are the same. Generalisation: If two integers have the same units digit \( b \), their squares have the same units digit because \( (10a+b)^2 \) and \( (10c+b)^2 \) both end with the units digit of \( b^2 \). A wrong answer suggests the student sees the pattern only as a list, not as a consequence of place value.
## DIAGNOSTIC_QUESTION_5
A student claims: "Since 169 ends in 9, it must be a perfect square." Evaluate this statement and give a counterexample if it is false.
## DIAGNOSTIC_ANSWER_5
The statement is false. The condition "units digit is 0,1,4,5,6,9" is necessary but not sufficient. Counterexample: 19 ends in 9 but is not a perfect square. A wrong evaluation (agreeing with the student) reveals the common misconception that the units-digit test is a sufficient condition for a perfect square.
## DIAGNOSTIC_QUESTION_6
Create a three-digit number that cannot be a perfect square and explain why using the units digit pattern. Then create a three-digit number that passes the units digit test but is still not a perfect square.
## DIAGNOSTIC_ANSWER_6
Example 1: 237 (ends in 7) → cannot be a perfect square because 7 is not in {0,1,4,5,6,9}. Example 2: 126 (ends in 6) → passes the test but \( 11^2=121 \), \( 12^2=144 \), so 126 is not a perfect square. A poor answer fails to distinguish between necessary and sufficient conditions or cannot produce a valid non-square that passes the test.
## COMMON_MISCONCEPTION
Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square. For example, they see 26 (ends in 6) and say "it's a perfect square because 6 is allowed." The exact wrong step is treating the necessary condition (allowed units digits) as a sufficient condition. They also sometimes incorrectly apply the pattern to the tens digit, e.g., thinking the tens digit of a square follows a simple pattern.
## ON_FAILURE
1. Have the student list squares of 1–20 and circle only the units digits. 2. Ask: "Does every number ending in 6 appear in this list?" (No, 6, 16, 26, 36… only 16 and 36 are squares). 3. Use the algebraic form \( (10a+b)^2 = 100a^2+20ab+b^2 \) to prove the units digit depends only on \( b \). 4. Give 5 numbers that pass the units-digit test but are not squares (e.g., 11, 24, 35, 46, 59) and have the student verify by checking between which two consecutive squares they lie.
## PREREQUISITE_NODE_IDS
c8_math_ch1_1, c8_math_ch1_2, c6_math_ch01_003, c6_math_ch02_027, c7_math_ch06_002, c7_math_ch06_008
## PREREQUISITE_REASONS
c8_math_ch1_1: defines square numbers and notation \( n^2 \), which is the starting object of study.
c8_math_ch1_2: establishes what a perfect square is and its basic properties.
c6_math_ch01_003: place value understanding is essential to see why only the units digit matters.
c6_math_ch02_027: pattern recognition with integers builds the habit of looking for regularities.
c7_math_ch06_002: parity (even/odd) helps predict whether the square is even/odd, a related pattern.
c7_math_ch06_008: identifying patterns in sequences directly supports discovering the units-digit cycle.
## FORWARD_NODE_IDS
c8_math_ch1_4, c8_math_ch1_6, c8_math_ch1_8
## FORWARD_REASONS
c8_math_ch1_4: the zeros pattern builds on the same place-value reasoning used here.
c8_math_ch1_6: the subtraction method for checking perfect squares uses the units-digit test as a quick filter.
c8_math_ch1_8: estimating square roots relies on knowing possible units digits of the root given the square's units digit.
## CROSS_SUBJECT_PREREQS
c6_math_ch12_121, c7_math_ch06_008, c6_math_ch04_049, c6_math_ch06_068
## CROSS_SUBJECT_REASONS
c6_math_ch12_121: number patterns are a unifying theme across mathematics and science (e.g., periodic trends).
c7_math_ch06_008: pattern identification skills transfer to data analysis in economics and biology.
c6_math_ch04_049: decimals in money/measurement use place value; understanding units digits aids estimation in financial calculations.
c6_math_ch06_068: ratio and proportion problems often involve large numbers where quick digit checks verify reasonableness.
## CHAIN_DESCRIPTION
c6_math_ch01_003 -> c8_math_ch1_3 -> c8_math_ch1_6
## THIS_FORMULA
For any integer \( n = 10a + b \) where \( b \in \{0,1,\dots,9\} \), the units digit of \( n^2 \) equals the units digit of \( b^2 \). The set of possible units digits is \( \{0,1,4,5,6,9\} \).
## FORMULA_VARIABLES
\( n \) = any integer; \( a \) = quotient when \( n \) is divided by 10; \( b \) = remainder (units digit of \( n \)), \( 0 \le b \le 9 \).
## FORMULA_UNITS
dimensionless
## COMPUTATION_TYPE
arithmetic
## CROSS_SUBJECT
c6_math_ch12_121 | Pattern recognition in number sequences is foundational for algebraic thinking used in physics (e.g., sequences of energy levels) and computer science (algorithms).
c6_math_ch04_049 | Decimal place value in money/measurement requires the same units-digit focus when estimating totals or checking bills.
## PREREQ_CONCEPT
Place value and the fact that multiplication of integers distributes over addition, so the units digit of a product depends only on the units digits of the factors.
## PREREQ_BEFORE
The student must be able to multiply single-digit numbers, understand that \( 10 \times \text{anything} \) ends in 0, and write a two-digit number as \( 10a+b \).
## PREREQ_STUCK
Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and practise multiplying binomials like \( (10a+b)^2 \) (Class 7 Algebraic Expressions).
## WORKED_EXAMPLE_1
PROBLEM: A school auditorium has chairs arranged in a square formation. The total number of chairs is a perfect square between 5000 and 6000. If the number of chairs ends in 4, what are the possible values for the units digit of the number of rows?
STEPS:
- Step 1: Let the number of rows be \( n \). Then total chairs \( = n^2 \). We know \( 5000 < n^2 < 6000 \) and the units digit of \( n^2 \) is 4.
- Step 2: From the units-digit pattern, \( n^2 \) ends in 4 only when \( n \) ends in 2 or 8 (since \( 2^2=4 \), \( 8^2=64 \)).
- Step 3: Estimate \( n \): \( \sqrt{5000} \approx 70.7 \), \( \sqrt{6000} \approx 77.5 \). So \( n \) is an integer between 71 and 77 inclusive.
- Step 4: List integers 71–77 and pick those ending in 2 or 8: 72 ends in 2, 78 is too high, so only 72 qualifies. (78 > 77, so not in range).
- Step 5: Verify: \( 72^2 = 5184 \) (ends in 4, between 5000 and 6000). The units digit of the number of rows is 2.
REASONING: The problem combines the units-digit pattern with estimation of square roots. The algebraic fact that only the units digit of \( n \) determines the units digit of \( n^2 \) narrows the candidates drastically before any squaring is done.
ANSWER: The units digit of the number of rows must be 2.
## WORKED_EXAMPLE_2
PROBLEM: Find the units digit of \( (123456789)^2 + (987654321)^2 \) without calculating the squares.
STEPS:
- Step 1: Identify the units digit of each base: first number ends in 9, second ends in 1.
- Step 2: Use the pattern: \( 9^2 = 81 \) → units digit 1; \( 1^2 = 1 \) → units digit 1.
- Step 3: The units digit of the sum is the units digit of \( 1 + 1 = 2 \).
- Step 4: (Optional check) Since the sum ends in 2, by the pattern it cannot be a perfect square itself.
- Step 5: Conclude the units digit of the expression is 2.
REASONING: The units digit of a sum depends only on the units digits of the addends. This extends the pattern from a single square to an arithmetic combination of squares, reinforcing that the rule is a property of the base-10 system.
ANSWER: 2
## WORKED_EXAMPLE_3
PROBLEM: A 4-digit perfect square \( N \) has the form \( 3x5y \) where \( x \) and \( y \) are digits. If \( N \) is the square of an integer ending in 4, find all possible values of \( y \) and the corresponding values of \( x \).
STEPS:
- Step 1: The integer ends in 4, so its square ends in 6 (since \( 4^2=16 \)). Therefore \( y = 6 \). The number is \( 3x56 \).
- Step 2: A 4-digit square ending in 6 must come from a number ending in 4 or 6. We are told it ends in 4, so the root is \( 10k+4 \).
- Step 3: The square is between 3000 and 4000. \( \sqrt{3000} \approx 54.7 \), \( \sqrt{4000} \approx 63.2 \). So the root is between 55 and 63.
- Step 4: Integers in [55,63] ending in 4: only 54 (too low) and 64 (too high). Wait — 54^2 = 2916 (<3000), 64^2 = 4096 (>4000). So no integer ending in 4 gives a square in 3000–4000.
- Step 5: Re-examine: Could the root end in 6? The problem says "ending in 4". If strictly ending in 4, there is no solution. But if the problem allows the root to end in 4 or 6 (both give square ending in 6), then check 56: \( 56^2 = 3136 \). This matches \( 3x56 \) with \( x=1 \).
- Step 6: Since the problem statement says "ending in 4", we must conclude no such \( N \) exists. However, if it's a typo and meant "ending in 4 or 6", then \( x=1, y=6 \). We'll answer based on strict reading: no solution.
REASONING: This problem combines the units-digit pattern with bounding square roots and the structure of a 4-digit number. It shows how the pattern restricts possibilities but must be used with magnitude estimation.
ANSWER: No 4-digit perfect square of the form \( 3x5y \) exists if the root must end in 4. (If root can end in 4 or 6, then \( y=6, x=1 \) giving \( 3136 = 56^2 \)).
## COMPETENCY_QUESTION_1
QUESTION: A teacher writes a 5-digit number on the board and says, "This number is a perfect square." Riya looks at the last digit and immediately says, "That's impossible." What could the last digit be? Explain why Riya is correct. Then, give an example of a 5-digit number ending in that digit which is NOT a perfect square, and explain why the converse is not true (i.e., why a number ending in an 'allowed' digit might still not be a square).
COMPETENCY: Translating real-world situations to mathematical expressions and justifying reasoning.
STEPS:
- Step 1: Recall the set of impossible units digits for perfect squares: {2,3,7,8}.
- Step 2: Choose one, e.g., 7. State that any number ending in 7 cannot be a perfect square.
- Step 3: Provide a 5-digit example ending in 7, e.g., 12347. Explain it's not a square because it ends in 7.
- Step 4: Give a 5-digit number ending in an allowed digit (e.g., 6) that is not a square, e.g., 12346. Explain that the units-digit test is necessary but not sufficient.
- Step 5: Conclude that Riya used a necessary condition to rule out the number.
ANSWER: The last digit could be 2, 3, 7, or 8. Riya is correct because no perfect square ends in these digits. Example of non-square ending in 7: 12347. Example of non-square ending in allowed digit 6: 12346 (since \( 111^2=12321 \), \( 112^2=12544 \), 12346 is between them). The converse fails because the condition is only necessary.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Consider the sequence of squares: \( 1^2, 2^2, 3^2, \dots \). Prove that the units digits repeat in a cycle of length 10. Then, using this cycle, determine the units digit of \( (10k+3)^2 + (10k+7)^2 \) for any integer \( k \ge 0 \). Finally, explain whether this sum can ever be a perfect square.
COMPETENCY: Generalising patterns algebraically and evaluating number properties.
STEPS:
- Step 1: Write \( n = 10k + r \) with \( r \in \{0,\dots,9\} \). Show \( n^2 = 100k^2 + 20kr + r^2 \). The units digit is the units digit of \( r^2 \), which depends only on \( r \). As \( r \) cycles 0–9, the units digits cycle with period 10.
- Step 2: For \( (10k+3)^2 \), units digit = units digit of \( 3^2 = 9 \). For \( (10k+7)^2 \), units digit = units digit of \( 7^2 = 49 \to 9 \).
- Step 3: Sum of units digits = 9 + 9 = 18 → units digit 8.
- Step 4: Since the sum ends in 8, and 8 is not in {0,1,4,5,6,9}, the sum can never be a perfect square for any integer \( k \).
- Step 5: State the conclusion clearly.
ANSWER: The units digit of the sum is always 8. Because 8 is not a possible units digit of a perfect square, the sum can never be a perfect square.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The units digit of a perfect square depends only on the units digit of the ______ integer.

## DIAGNOSTIC_ANSWER_7
original

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are at a stationery shop and the ______ says, "I have a box with a perfect square number of pencils.

## DIAGNOSTIC_ANSWER_8
shopkeeper

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The number ends in ______." You immediately know the shopkeeper is mistaken.

## DIAGNOSTIC_ANSWER_9
7

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are at a ______ shop and the shopkeeper says, "I have a box with a perfect square number of pencils.

## DIAGNOSTIC_ANSWER_10
stationery
