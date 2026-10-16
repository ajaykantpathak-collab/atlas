## ELI5
The theorem is a two-way toolkit. Know the two legs? Add their squares and pull the square root to raise the hypotenuse. Know the hypotenuse and one leg? Subtract the known square and root the remainder to unearth the missing leg. The direction — add or subtract — is decided by which role is missing: hypotenuse is the sum, a leg is the difference. Finish every problem by re-checking all three sides against the equation.

## DEFINITION
The Pythagoras theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. To find an unknown side, we rearrange the formula: if the hypotenuse is unknown, \(c = \sqrt{a^2 + b^2}\); if a leg is unknown, \(a = \sqrt{c^2 - b^2}\) (given \(c > b\)).
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Student can correctly identify the hypotenuse and legs in a right-angled triangle, choose the appropriate rearrangement of the Pythagoras theorem, compute the unknown side length (including square roots), and verify the answer by checking if the three sides satisfy the theorem.
## SCOPE_BOUNDARY
Covers finding unknown side lengths in right-angled triangles using the Pythagoras theorem, including problems where the unknown is the hypotenuse or a leg, and where side lengths may be integers, decimals, or surds. Does not cover 3D applications, non-right triangles, or proof of the theorem.
## WALKTHROUGH
Imagine you are helping your father set up a ladder to reach a window 4 metres high. The ladder must be placed 3 metres away from the wall for safety. How long should the ladder be? This forms a right triangle with the wall and ground as legs (3 m and 4 m) and the ladder as the hypotenuse. Recall the Pythagoras theorem from the previous node (c8_math_ch9_5): \(a^2 + b^2 = c^2\). Identify the known sides (the legs) and the unknown (hypotenuse). Write the formula, substitute the values, compute the squares, add them, and take the square root. The key insight is that the theorem works both ways – if the hypotenuse is known and a leg is unknown, we subtract the square of the known leg from the square of the hypotenuse.

Takeaway: missing hypotenuse — add the leg squares and take the root; missing leg — subtract the known square from the hypotenuse square and take the root, guarding that the hypotenuse is the larger. Exam format: expect both rearrangements, sensible rounding of roots, and substitution back into the theorem as the final check. Verification beat: your hypotenuse must exceed every leg; your computed leg must be less than the hypotenuse. Why students miss it: they add when they should subtract — asking 'is the missing side the longest?' settles the direction before any arithmetic begins.

## DIAGNOSTIC_QUESTION_1
State the Pythagoras theorem formula and write the two rearranged forms to find (a) the hypotenuse when both legs are known, (b) a leg when the hypotenuse and the other leg are known.
## DIAGNOSTIC_ANSWER_1
The theorem: \(a^2 + b^2 = c^2\), where \(c\) is the hypotenuse. (a) \(c = \sqrt{a^2 + b^2}\). (b) \(a = \sqrt{c^2 - b^2}\) or \(b = \sqrt{c^2 - a^2}\). A wrong answer (e.g., writing \(c = a + b\) or forgetting the square root) reveals the student has memorized the formula without understanding the algebraic manipulation needed to isolate the unknown.
## DIAGNOSTIC_QUESTION_2
In a right triangle, the hypotenuse is 13 cm and one leg is 5 cm. A student computes the other leg as \(\sqrt{13^2 + 5^2} = \sqrt{194} \approx 13.9\) cm. Explain why this is incorrect and what the student misunderstood.
## DIAGNOSTIC_ANSWER_2
The student added the squares instead of subtracting. Since the hypotenuse is the longest side, the unknown leg must be \(\sqrt{13^2 - 5^2} = \sqrt{169 - 25} = \sqrt{144} = 12\) cm. The error shows the student does not understand that the hypotenuse squared equals the sum of the squares of the legs, so to find a leg we must subtract the known leg's square from the hypotenuse's square.
## DIAGNOSTIC_QUESTION_3
A rectangular garden is 12 m long and 5 m wide. Find the length of the diagonal path across the garden. (Hint: The diagonal divides the rectangle into two right-angled triangles.)
## DIAGNOSTIC_ANSWER_3
The diagonal is the hypotenuse of a right triangle with legs 12 m and 5 m. Using \(c = \sqrt{12^2 + 5^2} = \sqrt{144 + 25} = \sqrt{169} = 13\) m. The diagonal is 13 m. A wrong answer (e.g., 17 m by adding 12+5) reveals the student is not squaring the sides or not taking the square root.
## DIAGNOSTIC_QUESTION_4
Two right triangles have the same hypotenuse length of 10 cm. Triangle A has legs 6 cm and 8 cm. Triangle B has one leg 5 cm. Compare the other leg of Triangle B with the legs of Triangle A. Which triangle has the longer unknown leg? Justify without calculating the exact value of the unknown leg of Triangle B.
## DIAGNOSTIC_ANSWER_4
For Triangle A: \(6^2+8^2=36+64=100=10^2\). For Triangle B: unknown leg = \(\sqrt{10^2 - 5^2} = \sqrt{100-25}=\sqrt{75}\). Since 75 is between 64 and 81, \(\sqrt{75}\) is between 8 and 9. The legs of Triangle A are 6 and 8. The unknown leg of Triangle B is greater than 8 (since 75>64) but less than 9. So the unknown leg of Triangle B is longer than both legs of Triangle A. A wrong answer might say Triangle A's leg 8 is longer because 8>5, showing they don't analyze the relationship between squares.
## DIAGNOSTIC_QUESTION_5
A student solves: "Find the hypotenuse of a right triangle with legs 9 cm and 12 cm." Their working: \(c^2 = 9^2 + 12^2 = 81 + 144 = 225\). \(c = 225\). They answer 225 cm. Evaluate the solution: Is the final answer correct? If not, identify the error and give the correct answer.
## DIAGNOSTIC_ANSWER_5
The final answer is incorrect. The error is in the last step: \(c^2 = 225\), so \(c = \sqrt{225} = 15\), not 225. The student forgot to take the square root. The correct hypotenuse is 15 cm. A wrong evaluation (e.g., saying the answer is correct) reveals the student does not understand that \(c^2 = 225\) means \(c\) is the square root of 225.
## DIAGNOSTIC_QUESTION_6
Create a real-life problem (in Indian context) that requires using the Pythagoras theorem to find an unknown side. The problem must involve a right triangle where the unknown is a leg (not the hypotenuse). Provide the problem statement, a diagram description, and the solution steps.
## DIAGNOSTIC_ANSWER_6
Example problem: "A kite is flying at a height of 20 m. The string is 25 m long. How far horizontally is the kite from the person holding the string?" Diagram: right triangle with vertical leg 20 m (height), hypotenuse 25 m (string), horizontal leg unknown. Solution: horizontal distance = \(\sqrt{25^2 - 20^2} = \sqrt{625 - 400} = \sqrt{225} = 15\) m. A poor answer might create a problem where the unknown is the hypotenuse, or uses a non-right triangle, showing they don't understand the condition for applying the theorem.
## COMMON_MISCONCEPTION
Students often forget to take the square root after adding/subtracting squares, giving the squared value as the side length (e.g., \(c^2 = 169\), so \(c = 169\)). Another specific error: when finding a leg, they add the squares (\(c^2 = a^2 + b^2\)) instead of subtracting (\(a^2 = c^2 - b^2\)), because they don't recognize which side is the hypotenuse. Also, they may incorrectly identify the hypotenuse as the side opposite the right angle but then use the wrong leg in subtraction.
## ON_FAILURE
If a student makes the square root error: Have them practice perfect squares and square roots (e.g., \(1^2=1, 2^2=4, ..., 15^2=225\)). Then give a problem: "If \(c^2 = 169\), what is \(c\)?" Emphasize that \(c^2\) means \(c \times c\), so \(c\) is the number that multiplied by itself gives 169. For the subtraction error: Use a physical model (straws or sticks) to show that the hypotenuse is the longest side. Have them measure and compare: if hypotenuse is 13 and one leg is 5, the other leg cannot be longer than 13. Then guide them to rearrange the formula: \(a^2 = c^2 - b^2\). Practice with Pythagorean triples (3,4,5) and (5,12,13) to build intuition.
## PREREQUISITE_NODE_IDS
c8_math_ch9_5, c8_math_ch9_6, c8_math_ch9_7, c7_math_ch07_005, c7_math_ch07_007, c7_math_ch15_003, c6_math_ch07_073, c6_math_ch08_088
## PREREQUISITE_REASONS
c8_math_ch9_5: Provides the statement and meaning of the Pythagoras theorem, which is the foundational formula.
c8_math_ch9_6: Visual proof helps students understand why the theorem works, aiding in correct application.
c8_math_ch9_7: Pythagorean triples give known integer side combinations, useful for estimation and verification.
c7_math_ch07_005: Classification of triangles by angles (right triangle) is needed to identify when the theorem applies.
c7_math_ch07_007: Angle sum property helps confirm a triangle is right-angled if angles are given.
c7_math_ch15_003: Solving linear equations is needed for algebraic manipulation when rearranging the theorem.
c6_math_ch07_073: Triangle classification and properties (including right triangles) from Class 6.
c6_math_ch08_088: Area of triangles concept may connect to the visual proof but not directly needed; however, it's a prior geometry node.
## FORWARD_NODE_IDS
c8_math_ch9_9, c8_math_ch9_10
## FORWARD_REASONS
c8_math_ch9_9: Real-life problems often require finding unknown sides as a step in solving larger problems (e.g., height of a tree, distance across a river).
c8_math_ch9_10: Verifying if a triangle is right-angled uses the converse of Pythagoras theorem, which requires computing squares of sides and checking equality – an application of finding/comparing side lengths.
## CROSS_SUBJECT_PREREQS
c7_math_ch03_005, c7_math_ch12_008
## CROSS_SUBJECT_REASONS
c7_math_ch03_005: Units of measurement and decimal notation are used when side lengths are given in decimals (e.g., 3.5 m, 4.2 m).
c7_math_ch12_008: Word problems involving decimal multiplication and division build the skill of handling decimal side lengths in Pythagoras problems.
## CHAIN_DESCRIPTION
c8_math_ch9_5 -> c8_math_ch9_8 -> c8_math_ch9_9
## THIS_FORMULA
\(a^2 + b^2 = c^2\) (where \(c\) is the hypotenuse, \(a\) and \(b\) are legs). To find hypotenuse: \(c = \sqrt{a^2 + b^2}\). To find a leg: \(a = \sqrt{c^2 - b^2}\) or \(b = \sqrt{c^2 - a^2}\).
## FORMULA_VARIABLES
a = length of one leg (perpendicular), b = length of the other leg (base), c = length of the hypotenuse (side opposite the right angle). All lengths in same units.
## FORMULA_UNITS
Units of length: cm, m, km, etc. (same unit for all sides). Area units (cm², m²) appear in intermediate squares.
## COMPUTATION_TYPE
algebraic
## CROSS_SUBJECT
c8_physics_ch2_3 | The Pythagoras theorem is used in physics to find resultant displacement, velocity components, and forces in two dimensions (vector addition).
c8_geo_ch1_2 | In map reading, the theorem helps calculate straight-line distances (as the crow flies) from grid coordinates (easting and northing).
## PREREQ_CONCEPT
Understanding of squares and square roots, and ability to rearrange simple algebraic equations.
## PREREQ_BEFORE
Student must be able to identify the hypotenuse in a right-angled triangle and compute squares and square roots of numbers (including decimals).
## PREREQ_STUCK
Review squares and square roots (Class 8 chapter on squares and square roots) and solving simple equations (Class 7 chapter on equations).
## WORKED_EXAMPLE_1
PROBLEM: A ladder 10 m long is placed against a wall such that its foot is 6 m away from the wall. How high up the wall does the ladder reach? (Assume the wall is perpendicular to the ground.)

STEPS:
- Step 1: Identify the right triangle. The wall and ground form the legs, the ladder is the hypotenuse (10 m). The distance from wall to ladder foot is one leg (6 m). The height up the wall is the unknown leg (h).
- Step 2: Write the Pythagoras theorem: (leg1)² + (leg2)² = (hypotenuse)². Here, 6² + h² = 10².
- Step 3: Substitute known values: 36 + h² = 100.
- Step 4: Rearrange to solve for h²: h² = 100 - 36 = 64. Then take square root: h = √64 = 8. (We take positive root since length is positive.)
- Step 5: Verify: 6² + 8² = 36 + 64 = 100 = 10². The height is 8 m.

REASONING: The ladder, wall, and ground form a right triangle because the wall is perpendicular to the ground. The ladder is the longest side (hypotenuse). We use the theorem to find the missing leg by subtracting the square of the known leg from the square of the hypotenuse, then taking the square root.

ANSWER: 8 m
## WORKED_EXAMPLE_2
PROBLEM: A rectangular field is 80 m long and 60 m wide. A farmer wants to build a fence along one diagonal. Find the length of the diagonal to the nearest metre.

STEPS:
- Step 1: The diagonal of a rectangle divides it into two congruent right-angled triangles. The sides of the rectangle are the legs (80 m and 60 m). The diagonal is the hypotenuse (d).
- Step 2: Apply Pythagoras theorem: d² = 80² + 60².
- Step 3: Compute squares: 80² = 6400, 60² = 3600.
- Step 4: Add: d² = 6400 + 3600 = 10000. Take square root: d = √10000 = 100.
- Step 5: The diagonal is exactly 100 m. No rounding needed. Check: 80, 60, 100 is a Pythagorean triple (8,6,10 scaled by 10).

REASONING: The rectangle's right angles guarantee the triangles are right-angled. The diagonal is the hypotenuse. We add the squares of the legs because both legs are known and the hypotenuse is unknown.

ANSWER: 100 m
## WORKED_EXAMPLE_3
PROBLEM: A right-angled triangle has an area of 30 cm² and one leg of length 5 cm. Find the length of the hypotenuse. (Hint: Area of right triangle = ½ × leg1 × leg2.)

STEPS:
- Step 1: Let the known leg be a = 5 cm. Let the other leg be b. Area = ½ × a × b = 30.
- Step 2: Substitute a: ½ × 5 × b = 30 → (5b)/2 = 30 → 5b = 60 → b = 12 cm.
- Step 3: Now we have both legs: a = 5 cm, b = 12 cm. The hypotenuse c is unknown.
- Step 4: Use Pythagoras: c² = a² + b² = 5² + 12² = 25 + 144 = 169.
- Step 5: c = √169 = 13 cm.
- Step 6: Verify: 5, 12, 13 is a Pythagorean triple. Area = ½ × 5 × 12 = 30 cm². Correct.

REASONING: This problem combines the area formula for a right triangle (from Class 6/7 mensuration) with the Pythagoras theorem. We first find the missing leg using area, then use the theorem to find the hypotenuse. This shows how geometry concepts interlink.

ANSWER: 13 cm
## COMPETENCY_QUESTION_1
QUESTION: In a right-angled triangle, the hypotenuse is 17 cm and one leg is 8 cm. A student claims the other leg is 15 cm because 8 + 15 = 23 and 17 + 8 = 25, so 15 is "in between". Evaluate the student's reasoning. Is the answer correct? If yes, is the reasoning valid? If no, what is the correct reasoning?

COMPETENCY: Error identification and correction / Justifying mathematical reasoning

STEPS:
- Step 1: Understand the problem: We have a right triangle with hypotenuse 17 cm, one leg 8 cm, student says other leg is 15 cm.
- Step 2: Check the answer using Pythagoras theorem: 8² + 15² = 64 + 225 = 289. 17² = 289. So the answer 15 cm is numerically correct.
- Step 3: Analyze the student's reasoning: They used addition and comparison of sums, not the Pythagoras theorem. Their reasoning is not mathematically valid.
- Step 4: Provide correct reasoning: The Pythagoras theorem states that the square of the hypotenuse equals the sum of squares of the legs. So the other leg = √(17² - 8²) = √(289 - 64) = √225 = 15 cm.

ANSWER: The student's final answer (15 cm) is correct, but their reasoning is invalid. They used an incorrect additive pattern instead of the Pythagoras theorem. The correct method uses squares and square roots.

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A rectangular park measures 48 m by 20 m. A straight path is built from one corner to the opposite corner. A second path is built from the midpoint of one long side to the midpoint of the opposite long side. Compare the lengths of the two paths. Which is longer? By how much? (Use Pythagoras theorem where needed.)

COMPETENCY: Translating real-world situations to mathematical expressions / Comparing and justifying

STEPS:
- Step 1: Understand the problem. First path: diagonal of rectangle (48 m by 20 m). Second path: connects midpoints of the two 48 m sides, so it is parallel to the 20 m sides and its length equals the width? Wait: The midpoints of the long sides (48 m) are connected. That segment is parallel to the short sides (20 m) and its length is 20 m. Actually, the segment joining midpoints of opposite sides in a rectangle is equal to the other side. So second path = 20 m.
- Step 2: Compute diagonal (first path) using Pythagoras: d² = 48² + 20² = 2304 + 400 = 2704. d = √2704. 52² = 2704? 50²=2500, 52²=2704. Yes, d = 52 m.
- Step 3: Compare: First path = 52 m, second path = 20 m. First path is longer by 52 - 20 = 32 m.
- Step 4: Verify: The diagonal is indeed the longest straight line in a rectangle. The second path is just the width.
- Step 5: Conclude.

ANSWER: The diagonal path (first path) is 52 m long. The path joining midpoints of the long sides is 20 m long. The diagonal path is longer by 32 m.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The ______ theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.

## DIAGNOSTIC_ANSWER_7
Pythagoras

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are helping your father set up a ______ to reach a window 4 metres high.

## DIAGNOSTIC_ANSWER_8
ladder

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are helping your father set up a ladder to reach a window ______ metres high.

## DIAGNOSTIC_ANSWER_9
4

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Student can correctly identify the hypotenuse and legs in a right-angled triangle, choose the appropriate rearrangement of the Pythagoras theorem, compute the unknown side length (including square roots), and verify the answer by checking if the three sides satisfy the theorem.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: ______ you are helping your father set up a ladder to reach a window 4 metres high.

## DIAGNOSTIC_ANSWER_11
Imagine
