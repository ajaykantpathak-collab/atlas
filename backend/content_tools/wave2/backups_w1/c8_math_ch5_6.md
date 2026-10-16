## ELI5
Take four neighbours in a row and wire them together with your choice of plus or minus signs — eight different circuits are possible. A curious thing happens: every circuit glows the same colour. All the results share one parity, because swapping a sign shifts the total by twice something — never changing its evenness or oddness. The values spread symmetrically around the plain sum, with all-pluses the peak and a fixed floor underneath.

## DEFINITION
Given four consecutive integers \(n, n+1, n+2, n+3\), placing plus or minus signs between them creates an expression of the form \(n \pm (n+1) \pm (n+2) \pm (n+3)\) where each \(\pm\) is independently chosen as \(+\) or \(-\). The value of such an expression depends on the pattern of signs chosen, and the set of all possible values follows specific parity and range patterns determined by the starting number \(n\).
## COGNITIVE_LEVEL
analyze
## MASTERY_CRITERIA
The student can systematically generate all 8 sign combinations for any four consecutive numbers, compute each value correctly using integer addition/subtraction rules, identify the parity pattern (all results have the same parity), determine the minimum and maximum possible values, and explain why the results differ by multiples of 2.
## SCOPE_BOUNDARY
This node covers the exploration of sign patterns between exactly four consecutive integers, the resulting set of 8 values, their parity properties, and the algebraic reasoning behind the patterns. It does NOT cover expressions with more than four numbers, non-consecutive numbers, or multiplication/division operations.
## WALKTHROUGH
Imagine you have four consecutive locker numbers: 12, 13, 14, 15. Your teacher asks: "If you put plus or minus signs between them in every possible way, what different totals can you get?" Start by writing the four numbers with boxes for signs: \(12 \square 13 \square 14 \square 15\). Since there are 3 gaps and each can be \(+\) or \(-\), there are \(2^3 = 8\) combinations. Connect this to Class 7's parity rules (c7_math_ch06_003) — the sum/difference of integers follows even/odd patterns. Work through one example completely, then organize all 8 in a table to spot the pattern: all results are even (or all odd), and they form a symmetric set around the sum of the four numbers.

Takeaway: with four consecutive numbers, all eight sign patterns give results of the same parity — each sign flip changes the total by an even amount — and the eight values sit symmetrically around the all-plus sum. Exam format: expect 'list all combinations in a table', 'find the maximum and minimum', and 'explain the shared parity' — the twice-the-term argument is the reasoning marks. Verification beat: recompute at least two rows of your table independently before claiming the pattern. Why students miss it: they evaluate the eight cases randomly and miss the structure — organising by how many minuses appear turns a chore into a pattern read-out.

## DIAGNOSTIC_QUESTION_1
For the four consecutive numbers 5, 6, 7, 8, how many different expressions can be formed by placing + or - signs in the three gaps between them?
## DIAGNOSTIC_ANSWER_1
Answer: 8 expressions. Each of the 3 gaps has 2 choices (+ or -), so \(2 \times 2 \times 2 = 8\). A wrong answer of 6 or 4 reveals the student thinks some sign combinations are invalid or they are counting only distinct results rather than distinct expressions. A wrong answer of 16 reveals they think there are 4 gaps instead of 3.
## DIAGNOSTIC_QUESTION_2
Consider the expression \(n - (n+1) + (n+2) - (n+3)\). Without substituting a specific value for \(n\), explain why the result must always be an even number.
## DIAGNOSTIC_ANSWER_2
Answer: Simplify algebraically: \(n - n - 1 + n + 2 - n - 3 = (n - n + n - n) + (-1 + 2 - 3) = 0 - 2 = -2\). The variable terms cancel completely, leaving a constant even number. Any expression of this form simplifies to an even integer because the four \(n\) terms contribute \(\pm n \pm n \pm n \pm n\) which always sums to an even multiple of \(n\) (0, \(\pm 2n\), or \(\pm 4n\)), and the constants sum to an even number. A wrong answer focusing only on "even minus odd is odd" reveals the student is not seeing the algebraic cancellation and is trying to use parity rules without simplifying first.
## DIAGNOSTIC_QUESTION_3
For the consecutive numbers 10, 11, 12, 13, find the value of the expression with signs: \(10 - 11 - 12 + 13\). Then list all 8 possible values for this set of four numbers.
## DIAGNOSTIC_ANSWER_3
Step 1: \(10 - 11 = -1\)
Step 2: \(-1 - 12 = -13\)
Step 3: \(-13 + 13 = 0\). So \(10 - 11 - 12 + 13 = 0\).
All 8 values for 10,11,12,13:
\(10+11+12+13 = 46\)
\(10+11+12-13 = 20\)
\(10+11-12+13 = 22\)
\(10+11-12-13 = -4\)
\(10-11+12+13 = 24\)
\(10-11+12-13 = -2\)
\(10-11-12+13 = 0\)
\(10-11-12-13 = -26\)
Set: \(\{-26, -4, -2, 0, 20, 22, 24, 46\}\). All even. A wrong answer with odd numbers reveals sign errors in integer subtraction (e.g., treating \(-11 - 12\) as \(-1\) instead of \(-23\)).
## DIAGNOSTIC_QUESTION_4
Compare the sets of possible values for two different starting numbers: (a) 1,2,3,4 and (b) 2,3,4,5. What is the relationship between the two sets? Explain why this relationship holds algebraically.
## DIAGNOSTIC_ANSWER_4
Set for 1,2,3,4: \(\{-8, -2, 0, 4, 6, 8, 10, 16\}\) (all even)
Set for 2,3,4,5: \(\{-10, -4, -2, 2, 4, 8, 10, 18\}\) (all even)
Relationship: The second set is the first set shifted by +2? No, let's check: 16→18 (+2), 10→10 (0), 8→8 (0), 6→4 (-2)... not a constant shift.
Better relationship: Both sets contain only even numbers. The minimum increases by 2 (-8 to -10? No, -8 to -10 is -2). Wait: min for 1,2,3,4 is \(1-2-3-4 = -8\). Min for 2,3,4,5 is \(2-3-4-5 = -10\). Max for first: \(1+2+3+4=10\). Max for second: \(2+3+4+5=14\). 
Actually, the correct observation: Each value in the second set equals the corresponding value in the first set plus 2? Let's pair by sign pattern:
Pattern +++: 10 vs 14 (+4)
Pattern ++-: 1+2+3-4=2 vs 2+3+4-5=4 (+2)
Pattern +-+: 1-2+3+4=6 vs 2-3+4+5=8 (+2)
Pattern +--: 1-2-3-4=-8 vs 2-3-4-5=-10 (-2)
Pattern -++: -1+2+3+4=8 vs -2+3+4+5=10 (+2)
Pattern -+-: -1+2-3-4=-6? Wait, for 1,2,3,4: -1+2-3+4=2? No, signs are between numbers: \(1 - 2 - 3 + 4 = 0\)? Let me redo systematically.

Actually, the algebraic form for a sign pattern \(s_1, s_2, s_3 \in \{+1, -1\}\) is:
\(n + s_1(n+1) + s_2(n+2) + s_3(n+3) = n(1+s_1+s_2+s_3) + (s_1 + 2s_2 + 3s_3)\)
When \(n\) increases by 1, the value increases by \((1+s_1+s_2+s_3)\). This coefficient can be -2, 0, 2, or 4. So different patterns shift by different amounts! That's the key insight. A wrong answer claiming a constant shift reveals the student hasn't derived the general algebraic form.
## DIAGNOSTIC_QUESTION_5
A student claims: "For any four consecutive numbers, the largest possible value is always the sum of all four, and the smallest is always the first minus the other three." Is this claim correct? Justify your answer with reasoning.
## DIAGNOSTIC_ANSWER_5
The claim is CORRECT. The maximum occurs when all signs are \(+\): \(n + (n+1) + (n+2) + (n+3) = 4n+6\). The minimum occurs when all signs after the first are \(-\): \(n - (n+1) - (n+2) - (n+3) = n - n - 1 - n - 2 - n - 3 = -2n - 6\). Any other sign pattern replaces a \(+\) with a \(-\) for some term, which subtracts twice that term from the maximum, making it smaller. Similarly, changing a \(-\) to \(+\) in the minimum pattern adds twice that term, making it larger. A wrong answer saying the minimum is \(-n - (n+1) - (n+2) - (n+3)\) reveals the student forgets the first number has no sign before it (it's always positive as the starting term).
## DIAGNOSTIC_QUESTION_6
Create a new problem: Choose four consecutive numbers such that one of the 8 possible values equals exactly 100. Show your work and explain how you chose the numbers.
## DIAGNOSTIC_ANSWER_6
Good answer: Let the numbers be \(n, n+1, n+2, n+3\). The maximum value is \(4n+6\). Set \(4n+6 = 100 \Rightarrow 4n = 94 \Rightarrow n = 23.5\) (not integer). Try another pattern: the pattern \(+++-\) gives \(n+(n+1)+(n+2)-(n+3) = 2n\). Set \(2n = 100 \Rightarrow n = 50\). So 50, 51, 52, 53 works: \(50+51+52-53 = 100\). A poor answer guesses randomly without using the algebraic forms of the 8 patterns, revealing the student doesn't see the connection between sign patterns and linear expressions in \(n\).
## COMMON_MISCONCEPTION
Students treat the first number as having a sign choice (e.g., writing \(\pm n \pm (n+1) \pm (n+2) \pm (n+3)\)) leading to 16 combinations instead of 8. They then get confused because the "negative first number" expressions like \(-n + (n+1) - (n+2) + (n+3)\) are not part of the problem. For example, with 5,6,7,8 they might write \(-5+6-7+8 = 2\) and count it as a valid expression, but the problem only allows signs *between* the numbers, so the first number is always positive as written.
## ON_FAILURE
If the student includes a sign before the first number, draw a physical representation: write the four numbers on cards with gaps between them: [5] [6] [7] [8]. Place sign cards only in the gaps. Emphasize: "The first number starts the expression; we only choose what happens *between* numbers." Then list the 3 gaps explicitly: gap1 between 5&6, gap2 between 6&7, gap3 between 7&8. Count: 3 gaps × 2 choices = 8. Have them cross out any expression starting with a minus sign as "not allowed by the rules of this game."
## PREREQUISITE_NODE_IDS
c7_math_ch06_003, c7_math_ch02_002, c6_math_ch02_019, c6_math_ch02_020, c8_math_ch5_5
## PREREQUISITE_REASONS
c7_math_ch06_003: Sum of even/odd rules needed to predict parity of results without computing
c7_math_ch02_002: Order of operations needed to evaluate expressions with mixed + and - correctly
c6_math_ch02_019: Integer addition rules (especially adding negative numbers) required for computation
c6_math_ch02_020: Integer subtraction rules (converting to addition of opposite) required for computation
c8_math_ch5_5: Parity rules for sum/difference of even/odd numbers directly applied to analyze result patterns
## FORWARD_NODE_IDS
c8_math_ch5_7, c8_math_ch5_11
## FORWARD_REASONS
c8_math_ch5_7: Algebraic explanation of parity patterns generalizes the sign-placement patterns using variables
c8_math_ch5_11: Letters for digits (cryptarithms) extends the idea of placing operations between digits to form equations
## CROSS_SUBJECT_PREREQS
c6_math_ch05_054, c6_math_ch05_055, c7_math_ch04_004
## CROSS_SUBJECT_REASONS
c6_math_ch05_054: Forming algebraic expressions from word problems — this topic requires translating sign patterns into algebraic form
c6_math_ch05_055: Simplifying algebraic expressions — needed to derive general formulas for each sign pattern
c7_math_ch04_004: Writing algebraic expressions from word problems — builds the skill of representing the sign-placement problem algebraically
## CHAIN_DESCRIPTION
c7_math_ch06_003 -> c8_math_ch5_6 -> c8_math_ch5_7
## THIS_FORMULA
For four consecutive integers \(n, n+1, n+2, n+3\) with signs \(s_1, s_2, s_3 \in \{+1, -1\}\): Value \(= n + s_1(n+1) + s_2(n+2) + s_3(n+3) = n(1+s_1+s_2+s_3) + (s_1 + 2s_2 + 3s_3)\)
## FORMULA_VARIABLES
n = starting integer (any positive, negative, or zero), s₁ = sign between n and n+1 (+1 for +, -1 for -), s₂ = sign between n+1 and n+2, s₃ = sign between n+2 and n+3
## FORMULA_UNITS
dimensionless (pure numbers)
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c6_math_ch05_054 | Forming algebraic expressions: the sign patterns become algebraic expressions in n
c6_math_ch05_055 | Simplifying algebraic expressions: each of the 8 patterns simplifies to a linear expression in n
c7_math_ch04_004 | Writing algebraic expressions from word problems: the problem "place signs to get target value" translates to solving linear equations in n
## PREREQ_CONCEPT
Integer addition and subtraction with positive and negative numbers, and the concept that subtracting a number is adding its opposite.
## PREREQ_BEFORE
The student must be able to correctly evaluate expressions like \(5 - 6 - 7 + 8\) using integer rules, and understand that there are exactly 3 gaps between 4 numbers.
## PREREQ_STUCK
Review c6_math_ch02_019 and c6_math_ch02_020 for integer addition/subtraction rules, and c7_math_ch02_002 for order of operations with mixed signs.
## WORKED_EXAMPLE_1
PROBLEM: A teacher writes four consecutive numbers on the board: 7, 8, 9, 10. She asks the class to place + or - signs in the three boxes: 7 ☐ 8 ☐ 9 ☐ 10. Find all 8 possible values and verify they are all even numbers.
STEPS:
- Step 1: Identify the four consecutive numbers: n=7, so numbers are 7, 8, 9, 10. There are 3 gaps for signs, each can be + or -, giving 2³ = 8 combinations.
- Step 2: List all 8 sign patterns systematically: (+,+,+), (+,+,-), (+,-,+), (+,-,-), (-,+,+), (-,+,-), (-,-,+), (-,-,-).
- Step 3: Compute each expression using integer rules:
  7+8+9+10 = 34
  7+8+9-10 = 14
  7+8-9+10 = 16
  7+8-9-10 = -4
  7-8+9+10 = 18
  7-8+9-10 = -2
  7-8-9+10 = 0
  7-8-9-10 = -10
- Step 4: Collect the set of values: {-10, -4, -2, 0, 14, 16, 18, 34}. Observe all are even.
- Step 5: Verify parity using algebraic reasoning: each expression = 7(1+s₁+s₂+s₃) + (s₁+2s₂+3s₃). The coefficient of 7 is sum of four odd/even terms → always even. The constant term s₁+2s₂+3s₃: s₁,s₃ are ±1 (odd), 2s₂ is even. Odd+even+odd = even. So total is even×7 + even = even.
REASONING: The systematic listing ensures no pattern is missed. The algebraic verification shows WHY all results are even regardless of the starting number — the structure of the expression guarantees it.
ANSWER: The 8 values are -10, -4, -2, 0, 14, 16, 18, 34. All are even.
## WORKED_EXAMPLE_2
PROBLEM: For four consecutive numbers starting with n, the expression with signs +, -, + gives the value 20. Find n and the four numbers.
STEPS:
- Step 1: Write the expression for signs +, -, + between n, n+1, n+2, n+3: n + (n+1) - (n+2) + (n+3).
- Step 2: Simplify algebraically: n + n + 1 - n - 2 + n + 3 = (n+n-n+n) + (1-2+3) = 2n + 2.
- Step 3: Set equal to 20: 2n + 2 = 20.
- Step 4: Solve for n: 2n = 18, so n = 9.
- Step 5: The four consecutive numbers are 9, 10, 11, 12. Verify: 9 + 10 - 11 + 12 = 19 - 11 + 12 = 8 + 12 = 20. ✓
REASONING: Instead of guessing numbers, we use the algebraic form of the specific sign pattern to create an equation. This is the power of the general formula: each of the 8 sign patterns corresponds to a linear expression in n, so we can work backwards from a target value.
ANSWER: n = 9, the numbers are 9, 10, 11, 12.
## WORKED_EXAMPLE_3
PROBLEM: Find all sets of four consecutive positive integers such that one of the 8 sign-placement expressions equals exactly 50. List the numbers and the sign pattern used for each solution.
STEPS:
- Step 1: Write the general value for each of the 8 sign patterns as a linear function of n:
  +++ : 4n+6
  ++- : 2n
  +-+ : 2n+2
  +-- : -2n-6
  -++ : 2n+4
  -+- : -2
  --+ : -2n
  --- : -4n-6
- Step 2: For each pattern, set the expression equal to 50 and solve for n (must be positive integer):
  4n+6=50 → 4n=44 → n=11 ✓
  2n=50 → n=25 ✓
  2n+2=50 → 2n=48 → n=24 ✓
  -2n-6=50 → -2n=56 → n=-28 ✗ (not positive)
  2n+4=50 → 2n=46 → n=23 ✓
  -2=50 → impossible ✗
  -2n=50 → n=-25 ✗
  -4n-6=50 → -4n=56 → n=-14 ✗
- Step 3: Collect valid solutions with their patterns:
  n=11, pattern +++: 11,12,13,14 → 11+12+13+14=50
  n=25, pattern ++-: 25,26,27,28 → 25+26+27-28=50
  n=24, pattern +-+: 24,25,26,27 → 24+25-26+27=50
  n=23, pattern -++: 23,24,25,26 → 23-24+25+26=50
- Step 4: Verify each: 11+12+13+14=50 ✓; 25+26+27-28=78-28=50 ✓; 24+25-26+27=49-26+27=50 ✓; 23-24+25+26=-1+51=50 ✓.
REASONING: By deriving all 8 algebraic forms first, we convert the problem into solving 8 simple linear equations. This systematic approach guarantees finding all solutions and shows the connection between sign patterns and the coefficients of n.
ANSWER: Four solutions: (11,12,13,14) with +++; (25,26,27,28) with ++-; (24,25,26,27) with +-+; (23,24,25,26) with -++.
## COMPETENCY_QUESTION_1
QUESTION: Ravi and Priya are playing a game with four consecutive numbers. Ravi chooses the numbers 15, 16, 17, 18. Priya must place + or - signs to get a result of 14. Priya says: "I'll use the pattern + + - + because 15+16+17-18 = 30." Is Priya correct? If not, find a pattern that works and explain your reasoning.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Check Priya's calculation: 15+16+17-18 = 48-18 = 30, not 14. So her pattern gives 30, not 14.
- Step 2: List all 8 patterns for n=15 and their values using the algebraic forms:
  +++: 4(15)+6 = 66
  ++-: 2(15) = 30
  +-+: 2(15)+2 = 32
  +--: -2(15)-6 = -36
  -++: 2(15)+4 = 34
  -+-: -2
  --+: -2(15) = -30
  ---: -4(15)-6 = -66
- Step 3: None equals 14! But wait — the problem says "Priya must place signs to get 14." Is it possible? Check parity: all values for n=15 (odd) are... 66,30,32,-36,34,-2,-30,-66 — all even. 14 is even, so parity doesn't rule it out. But 14 is not in the list.
- Step 4: Conclusion: It is IMPOSSIBLE to get 14 with 15,16,17,18. The possible values are only those 8 specific even numbers. Priya's pattern gives 30, and no pattern gives 14.
ANSWER: Priya is incorrect — her pattern gives 30, not 14. In fact, no sign pattern for 15,16,17,18 gives 14. The possible values are -66, -36, -30, -2, 30, 32, 34, 66.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A teacher says: "For any four consecutive whole numbers, the difference between the largest and smallest possible values (using + and - signs between them) is always the same." Is the teacher correct? Prove your answer algebraically and give the value of this constant difference.
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: Let the numbers be n, n+1, n+2, n+3. Largest value: all + signs: n+(n+1)+(n+2)+(n+3) = 4n+6.
- Step 2: Smallest value: first number positive, rest negative: n-(n+1)-(n+2)-(n+3) = n-n-1-n-2-n-3 = -2n-6.
- Step 3: Difference = (4n+6) - (-2n-6) = 4n+6+2n+6 = 6n+12.
- Step 4: This depends on n! For n=1: difference = 18. For n=2: difference = 24. Not constant.
- Step 5: But wait — the teacher might mean something else? Let's check the RANGE (max - min) for specific n:
  n=1: max=10, min=-8, diff=18
  n=2: max=14, min=-10, diff=24
  n=3: max=18, min=-12, diff=30
  The difference increases by 6 each time. So the teacher's statement is FALSE.
- Step 6: However, the difference between the two MIDDLE values? Or the spread of the set? The set always has 8 values symmetric around... actually the mean of max and min is (4n+6 + (-2n-6))/2 = n. The values are symmetric around n? For n=1: values -8,-2,0,4,6,8,10,16 — mean is 1? Sum = 34, mean = 34/8 = 4.25 ≠ 1. Not symmetric around n.
ANSWER: The teacher is incorrect. The difference between maximum (4n+6) and minimum (-2n-6) is 6n+12, which depends on n. For n=1 it's 18, for n=2 it's 24, etc. The difference increases by 6 for each increase in n.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you have four ______ locker numbers: 12, 13, 14, 15.

## DIAGNOSTIC_ANSWER_7
consecutive

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Work through one example completely, then organize all ______ in a table to spot the pattern: all results are even (or all odd), and they form a symmetric set around the sum of the four numbers.

## DIAGNOSTIC_ANSWER_8
8

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can systematically generate all 8 sign combinations for any four consecutive numbers, compute each value correctly using integer addition/subtraction rules, identify the parity pattern (all results have the same parity), determine the minimum and maximum possible values, and explain why the results differ by multiples of 2.
