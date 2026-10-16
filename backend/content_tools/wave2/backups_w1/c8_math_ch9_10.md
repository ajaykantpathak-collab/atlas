## ELI5
The theorem's twin works backwards. If a triangle's three sides happen to satisfy the famous square-sum rule — longest side squared equals the two shorter squares added — then the triangle is guaranteed a right angle, sitting opposite the longest side. So side lengths alone can testify: measure nothing, compute the squares, compare, and the verdict falls out. Carpenters and masons have used exactly this check for ages to confirm a corner is truly square.

## DEFINITION
The converse of the Baudhayana-Pythagoras theorem states that in any triangle, if the square of the longest side is equal to the sum of the squares of the other two sides, then the triangle is a right-angled triangle with the right angle opposite the longest side.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can correctly identify the longest side of a given triangle, compute the squares of all three sides, compare the sum of squares of the two shorter sides with the square of the longest side, and conclude whether the triangle is right-angled, providing a clear mathematical justification.
## SCOPE_BOUNDARY
This node covers verifying right-angled triangles using the converse of the Pythagoras theorem for given side lengths (integer or decimal). It does NOT cover geometric construction of right angles, proof of the converse theorem, or solving for unknown side lengths (which is covered in earlier nodes).
## WALKTHROUGH
Imagine you are helping a carpenter in Jaipur check if a wooden frame for a window is perfectly rectangular before fixing the glass. The carpenter measures the two adjacent sides and the diagonal but doesn't have a protractor. How can you tell him if the corner is exactly 90 degrees? We already know from the Pythagoras theorem (c8_math_ch9_5) that in a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides. The converse lets us work backwards: if the side lengths satisfy this relation, the angle must be 90 degrees. First, identify the longest side (the candidate hypotenuse). Then square all three sides. If the sum of the squares of the two smaller sides equals the square of the largest side, the triangle is right-angled. This is the key insight: the Pythagorean relation is both necessary and sufficient for a right angle.

Takeaway: the converse turns the theorem into a detector — identify the longest side as the candidate hypotenuse, square all three sides, and equality certifies a right angle opposite it. Exam format: expect 'is this triangle right-angled?' with full square computations shown and a conclusion sentence naming the hypotenuse. Verification beat: confirm you compared against the longest side, not just any side. Why students miss it: they apply the check to a shorter side's square — the equality must be tested against the maximum, and the justification sentence is where the marks sit.

## DIAGNOSTIC_QUESTION_1
State the condition required for a triangle with sides of lengths 5 cm, 12 cm, and 13 cm to be a right-angled triangle using the converse of the Pythagoras theorem.
## DIAGNOSTIC_ANSWER_1
The condition is: \(5^2 + 12^2 = 13^2\). Since \(25 + 144 = 169\) and \(13^2 = 169\), the equality holds, so the triangle is right-angled. A wrong answer (e.g., checking \(5^2 + 13^2 = 12^2\)) reveals the student does not understand that the longest side must be identified as the hypotenuse before applying the converse.
## DIAGNOSTIC_QUESTION_2
A student claims that a triangle with sides 8 cm, 15 cm, and 16 cm is right-angled because \(8^2 + 15^2 = 64 + 225 = 289\) and \(16^2 = 256\), and 289 is close to 256. Explain why this reasoning is incorrect.
## DIAGNOSTIC_ANSWER_2
The reasoning is incorrect because the converse of Pythagoras theorem requires exact equality, not approximate equality. \(8^2 + 15^2 = 289\) while \(16^2 = 256\); since \(289 \neq 256\), the triangle is not right-angled (it is acute because the sum of squares of the shorter sides is greater than the square of the longest side). A wrong answer that accepts "close enough" reveals the student treats the theorem as an estimation tool rather than an exact mathematical condition.
## DIAGNOSTIC_QUESTION_3
Determine whether a triangle with sides 9 m, 40 m, and 41 m is right-angled. Show all steps.
## DIAGNOSTIC_ANSWER_3
Step 1: Identify the longest side: 41 m.
Step 2: Square all sides: \(9^2 = 81\), \(40^2 = 1600\), \(41^2 = 1681\).
Step 3: Sum of squares of shorter sides: \(81 + 1600 = 1681\).
Step 4: Compare: \(1681 = 1681\). The equality holds.
Conclusion: Yes, the triangle is right-angled with the right angle opposite the 41 m side. A wrong answer (e.g., misidentifying 40 m as the longest side) reveals the student does not consistently identify the hypotenuse as the longest side before applying the formula.
## DIAGNOSTIC_QUESTION_4
Two triangles have side lengths (7, 24, 25) and (7, 24, 26). Without calculating the squares fully, explain which one is right-angled and how the difference in the longest side affects the angle type.
## DIAGNOSTIC_ANSWER_4
For (7, 24, 25): \(7^2 + 24^2 = 49 + 576 = 625 = 25^2\), so it is right-angled.
For (7, 24, 26): \(7^2 + 24^2 = 625\) but \(26^2 = 676\). Since \(625 < 676\), the sum of squares of the shorter sides is less than the square of the longest side, so the triangle is obtuse-angled (angle > 90°). Increasing the longest side while keeping the other two fixed makes the angle opposite it larger than 90°. A wrong answer that says both are right-angled or cannot compare reveals the student does not understand the relationship between the inequality of squares and angle type (acute/right/obtuse).
## DIAGNOSTIC_QUESTION_5
A student solves the problem: "Is a triangle with sides 1.5 cm, 2 cm, and 2.5 cm right-angled?" Their working: \(1.5^2 = 2.25\), \(2^2 = 4\), \(2.5^2 = 6.25\). \(2.25 + 4 = 6.25\). So it is right-angled. Evaluate this solution. Is it fully correct? If not, what is missing?
## DIAGNOSTIC_ANSWER_5
The solution is mathematically correct in computation and conclusion. However, it is incomplete because the student did not explicitly state the identification of the longest side (2.5 cm) as the hypotenuse before applying the converse. While the arithmetic is right, the logical step "longest side = 2.5 cm" should be shown. A solution that omits this step reveals the student may be pattern-matching (checking all combinations) rather than understanding the structural requirement that the hypotenuse is the longest side.
## DIAGNOSTIC_QUESTION_6
Create a real-world problem (using metres or centimetres) where a person needs to verify a right angle using only a measuring tape and the converse of Pythagoras theorem. Provide the three measurements you would give them and state whether the angle is 90°.
## DIAGNOSTIC_ANSWER_6
Example: Ramesh is laying tiles in his kitchen. He measures two adjacent walls from the corner: 3 m and 4 m. He then measures the diagonal distance between the endpoints of these measurements and gets 5 m. The three measurements are 3 m, 4 m, 5 m. Since \(3^2 + 4^2 = 9 + 16 = 25 = 5^2\), the corner is a perfect right angle. A poor answer would give measurements that do not satisfy the Pythagorean relation (e.g., 3, 4, 6) or forget to specify which is the diagonal, revealing the student cannot construct a valid Pythagorean triple or apply the concept to a practical layout scenario.
## COMMON_MISCONCEPTION
Students often forget to identify the longest side first and instead arbitrarily pick two sides to square and add, comparing with the square of the third side. For example, given sides 6, 8, 10, they might check \(6^2 + 10^2 = 8^2\) (36+100=136 vs 64) and incorrectly conclude it is not right-angled. The exact wrong step is skipping the "identify the hypotenuse" step and not realising the theorem only applies when the largest side is treated as the hypotenuse.
## ON_FAILURE
If a student makes this error, guide them through a three-step routine: (1) Circle the largest number in the set of three side lengths and label it 'c' (hypotenuse). (2) Label the other two 'a' and 'b'. (3) Only then compute \(a^2 + b^2\) and compare with \(c^2\). Practice with a set where the largest side is not the last one given (e.g., 10, 6, 8) to reinforce that order in the question does not determine the hypotenuse; length does.
## PREREQUISITE_NODE_IDS
c8_math_ch9_5, c8_math_ch9_7, c7_math_ch07_005, c7_math_ch09_008
## PREREQUISITE_REASONS
c8_math_ch9_5: Provides the forward Pythagoras theorem statement and meaning, which the converse directly relies on.
c8_math_ch9_7: Familiarity with Pythagorean triples (like 3,4,5) helps students recognise patterns and verify quickly.
c7_math_ch07_005: Understanding triangle classification by angles (acute, right, obtuse) is needed to interpret the result of verification.
c7_math_ch09_008: RHS congruence criterion uses the hypotenuse-leg relation, reinforcing the special role of the hypotenuse in right triangles.
## FORWARD_NODE_IDS
N/A

## FORWARD_REASONS
This is the final node in the chapter; no subsequent nodes depend on it within this chapter.
## CROSS_SUBJECT_PREREQS
c7_math_ch07_005, c6_math_ch07_073
## CROSS_SUBJECT_REASONS
c7_math_ch07_005: Class 7 triangle angle classification (acute, right, obtuse) provides the geometric vocabulary to describe the outcome of verification.
c6_math_ch07_073: Class 6 triangle classification and properties establish the basic definitions of triangle sides and angles used here.
## CHAIN_DESCRIPTION
c8_math_ch9_5 -> c8_math_ch9_10 -> none
## THIS_FORMULA
For a triangle with sides \(a, b, c\) where \(c\) is the longest side: if \(a^2 + b^2 = c^2\), then the triangle is right-angled with the right angle opposite side \(c\).
## FORMULA_VARIABLES
a = length of one shorter side, b = length of the other shorter side, c = length of the longest side (hypotenuse)
## FORMULA_UNITS
Units of length (cm, m, km, etc.) – the relation is dimensionless as both sides are in square units.
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c7_math_ch07_005 | The concept of angle types (acute, right, obtuse) from Class 7 geometry is directly used to classify the triangle after verification.
c6_math_ch07_073 | Class 6 triangle classification provides the foundational understanding of triangle sides and angles necessary for this topic.
## PREREQ_CONCEPT
The Pythagoras theorem (forward direction) and the ability to identify the longest side in a set of three lengths.
## PREREQ_BEFORE
The student must be able to state the Pythagoras theorem, compute squares of numbers (including decimals), and compare two numerical values for equality.
## PREREQ_STUCK
Revisit the Pythagoras theorem statement (c8_math_ch9_5) and practice identifying the hypotenuse in various right-triangle diagrams and side-length triplets.
## WORKED_EXAMPLE_1
PROBLEM: A builder in Bhopal wants to check if the corner of a rectangular plot is exactly 90°. He measures 6 metres along one boundary, 8 metres along the other boundary from the same corner, and then measures the straight-line distance between the two endpoints as 10 metres. Verify if the corner is a right angle.
STEPS:
- Step 1: Identify the three side lengths: 6 m, 8 m, and 10 m. The longest side is 10 m (the diagonal measured across the corner).
- Step 2: Label the longest side as c = 10 m, and the other two as a = 6 m, b = 8 m.
- Step 3: Compute the squares: \(a^2 = 6^2 = 36\), \(b^2 = 8^2 = 64\), \(c^2 = 10^2 = 100\).
- Step 4: Check the converse condition: \(a^2 + b^2 = 36 + 64 = 100\). Compare with \(c^2 = 100\).
- Step 5: Since \(a^2 + b^2 = c^2\) exactly, the triangle formed by the measurements is right-angled. Therefore, the corner is exactly 90°.
REASONING: The converse of Pythagoras theorem allows us to deduce the angle from the side lengths. By confirming the Pythagorean relation holds for the longest side, we prove the angle opposite that side (the corner) is a right angle.
ANSWER: Yes, the corner is a right angle (90°).
## WORKED_EXAMPLE_2
PROBLEM: A triangular traffic signboard has sides of length 0.7 m, 2.4 m, and 2.6 m. The manufacturer claims it is a right-angled triangle. Verify this claim.
STEPS:
- Step 1: List the side lengths: 0.7 m, 2.4 m, 2.6 m. Identify the longest side: 2.6 m.
- Step 2: Assign c = 2.6 m, a = 0.7 m, b = 2.4 m.
- Step 3: Calculate squares: \(a^2 = (0.7)^2 = 0.49\), \(b^2 = (2.4)^2 = 5.76\), \(c^2 = (2.6)^2 = 6.76\).
- Step 4: Sum of squares of shorter sides: \(0.49 + 5.76 = 6.25\).
- Step 5: Compare: \(6.25 \neq 6.76\). The sum of squares of the shorter sides (6.25) is less than the square of the longest side (6.76).
- Step 6: Since \(a^2 + b^2 \neq c^2\), the triangle is not right-angled. Because \(a^2 + b^2 < c^2\), the angle opposite the 2.6 m side is obtuse (> 90°).
REASONING: The verification requires exact equality. The decimal calculations show the relation does not hold; the inequality direction also tells us the triangle is obtuse, not right.
ANSWER: The claim is false; the signboard is not a right-angled triangle (it is obtuse-angled).
## WORKED_EXAMPLE_3
PROBLEM: Rahul has three bamboo poles of lengths 150 cm, 200 cm, and 250 cm. He wants to use them to form a right-angled corner for a vegetable garden bed. Can he do this without cutting any pole? If not, what is the minimum length he must cut from the longest pole to make it work?
STEPS:
- Step 1: Identify the three lengths: 150 cm, 200 cm, 250 cm. Longest is 250 cm.
- Step 2: Check if they form a right triangle as given: \(150^2 + 200^2 = 22500 + 40000 = 62500\). \(250^2 = 62500\). Equality holds.
- Step 3: The given lengths already satisfy the Pythagorean relation (they are a 3-4-5 triple scaled by 50). So Rahul CAN form a right-angled corner without cutting.
- Step 4: (Hypothetical extension) If the longest pole were 260 cm instead: \(150^2 + 200^2 = 62500\), \(260^2 = 67600\). Since \(62500 < 67600\), not right-angled.
- Step 5: To make it right-angled with the two shorter poles fixed, the hypotenuse must be \(\sqrt{62500} = 250\) cm.
- Step 6: Cut required = 260 - 250 = 10 cm. (But in the actual problem, no cut is needed.)
REASONING: This problem combines verification with the concept of Pythagorean triples. Recognising the 3-4-5 pattern (150:200:250 = 3:4:5) allows quick verification. The extension shows how to adjust a non-right triangle into a right one by changing the hypotenuse.
ANSWER: Yes, he can form a right-angled corner without cutting any pole because 150, 200, 250 form a Pythagorean triple (3-4-5 scaled by 50).
## COMPETENCY_QUESTION_1
QUESTION: A student says, "If a triangle has sides 5, 12, and 13, it is right-angled. If I double all sides to 10, 24, 26, it will still be right-angled because doubling keeps the shape." Is the student correct? Justify your answer using the converse of Pythagoras theorem.
COMPETENCY: Reasoning and proof – understanding similarity and scaling in right triangles.
STEPS:
- Step 1: Verify the first triangle: \(5^2 + 12^2 = 25 + 144 = 169 = 13^2\). So it is right-angled.
- Step 2: Verify the second triangle: sides 10, 24, 26. Longest side 26. \(10^2 + 24^2 = 100 + 576 = 676\). \(26^2 = 676\). Equality holds.
- Step 3: Generalise: If \(a^2 + b^2 = c^2\), then \((ka)^2 + (kb)^2 = k^2(a^2+b^2) = k^2c^2 = (kc)^2\). So scaling preserves the relation.
- Step 4: Conclude the student is correct; the reasoning is valid because the Pythagorean relation is homogeneous of degree 2.
ANSWER: Yes, the student is correct. Doubling all sides preserves the Pythagorean relation because both sides of the equation scale by the same factor (4), so equality is maintained. The new triangle is similar to the original and thus also right-angled.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: An architect draws a triangle with sides \(x\) cm, \(x+1\) cm, and \(x+2\) cm, where \(x\) is a positive integer. She claims it can be a right-angled triangle for some value of \(x\). Find the value of \(x\) and verify. Explain why there is only one such integer value.
COMPETENCY: Problem solving – setting up and solving an equation derived from the converse of Pythagoras theorem.
STEPS:
- Step 1: The longest side is \(x+2\). Apply converse: \(x^2 + (x+1)^2 = (x+2)^2\).
- Step 2: Expand: \(x^2 + (x^2 + 2x + 1) = x^2 + 4x + 4\).
- Step 3: Simplify: \(2x^2 + 2x + 1 = x^2 + 4x + 4\).
- Step 4: Rearrange: \(x^2 - 2x - 3 = 0\).
- Step 5: Factorise: \((x-3)(x+1) = 0\). Solutions: \(x = 3\) or \(x = -1\).
- Step 6: Since \(x\) is a positive integer, \(x = 3\). The sides are 3, 4, 5 – the classic Pythagorean triple.
- Step 7: Verify: \(3^2 + 4^2 = 9+16=25=5^2\). Only one positive integer solution exists because the quadratic has only one positive root.
ANSWER: \(x = 3\). The triangle sides are 3 cm, 4 cm, 5 cm. The quadratic equation derived from the Pythagorean condition yields only one positive integer solution.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The converse of the ______-Pythagoras theorem states that in any triangle, if the square of the longest side is equal to the sum of the squares of the other two sides, then the triangle is a right-angled triangle with the right angle opposite the longest side.

## DIAGNOSTIC_ANSWER_7
Baudhayana

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are helping a carpenter in Jaipur check if a wooden frame for a window is perfectly ______ before fixing the glass.

## DIAGNOSTIC_ANSWER_8
rectangular

## DIAGNOSTIC_QUESTION_9
Fill in the blank: How can you tell him if the corner is exactly ______ degrees?

## DIAGNOSTIC_ANSWER_9
90

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can correctly identify the longest side of a given triangle, compute the squares of all three sides, compare the sum of squares of the two shorter sides with the square of the longest side, and conclude whether the triangle is right-angled, providing a clear mathematical justification.
