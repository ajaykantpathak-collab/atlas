## ELI5
Build a square on each side of a right triangle and a perfect balance appears: the two smaller plots together hold exactly as much area as the grand plot on the longest side. That is the whole theorem — squares, areas, equality. The longest side, facing the right angle, is the hypotenuse; the other two are the legs. Ancient Indian texts recorded it centuries before Pythagoras, woven into altar-building instructions.

## DEFINITION
The Baudhayana-Pythagoras Theorem states that in a right-angled triangle, the area of the square constructed on the hypotenuse (the side opposite the right angle) is equal to the sum of the areas of the squares constructed on the other two sides (the legs). If the legs have lengths \(a\) and \(b\) and the hypotenuse has length \(c\), then \(a^2 + b^2 = c^2\).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can correctly state the theorem in their own words, identify the hypotenuse and legs in any right-angled triangle orientation, and use the relationship \(a^2 + b^2 = c^2\) to verify whether a given triangle is right-angled.
## SCOPE_BOUNDARY
This node covers the formal statement, geometric meaning, and algebraic form of the Baudhayana-Pythagoras Theorem for right-angled triangles only. It does NOT cover proofs (visual or algebraic), Pythagorean triples, finding missing side lengths, or real-life applications — those are addressed in subsequent nodes.
## WALKTHROUGH
Imagine you are helping your father lay a rectangular carpet in a room that is 6 metres long and 8 metres wide. He wants to check if the corners are perfect right angles by measuring the diagonal. You recall from the previous lesson that for an isosceles right triangle, the diagonal (hypotenuse) of a square relates to its side by a factor of \(\sqrt{2}\). But this room is a rectangle, not a square. How can we relate the diagonal to the two different sides? We draw the rectangle, split it along the diagonal to form two right-angled triangles, and label the sides 6 m, 8 m, and the diagonal \(d\). We then construct squares on each side. The theorem tells us the area of the square on the diagonal equals the sum of the areas of the squares on the other two sides. This gives \(6^2 + 8^2 = d^2\). This generalises the isosceles case to any right-angled triangle: the square on the hypotenuse equals the sum of the squares on the legs.

Takeaway: in every right-angled triangle, the square on the hypotenuse equals the squares on the legs combined — leg squared plus leg squared equals hypotenuse squared. Exam format: expect the statement in words and in symbols, identification of hypotenuse and legs in any orientation, and verification checks on given triangles. Verification beat: name the hypotenuse first — always the side facing the right angle, always the longest. Why students miss it: they anchor the equation to a fixed position on the page — the theorem belongs to roles (opposite the right angle), not to where the triangle happens to sit.

## DIAGNOSTIC_QUESTION_1
State the Baudhayana-Pythagoras Theorem in words and write its algebraic formula for a right-angled triangle with legs \(a\), \(b\) and hypotenuse \(c\).
## DIAGNOSTIC_ANSWER_1
The theorem: In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. Formula: \(a^2 + b^2 = c^2\). A wrong answer (e.g., \(a + b = c\) or \(a^2 + b^2 = c\)) reveals the student confuses the theorem with linear addition or forgets the squares, indicating they have not internalised the area-based geometric meaning.
## DIAGNOSTIC_QUESTION_2
A student draws a triangle with sides 5 cm, 12 cm, and 13 cm and says, "This is a right-angled triangle because \(5 + 12 = 17\) and \(13\) is close to \(17\)." Explain why this reasoning is incorrect and what the correct check should be.
## DIAGNOSTIC_ANSWER_2
The student incorrectly adds the side lengths instead of squaring them. The theorem requires comparing squares: \(5^2 + 12^2 = 25 + 144 = 169\) and \(13^2 = 169\). Since they are equal, the triangle is right-angled, but not because \(5+12 \approx 13\). A wrong explanation shows the student does not understand the theorem relates areas (squares), not linear lengths.
## DIAGNOSTIC_QUESTION_3
A right-angled triangle has legs of length 9 cm and 12 cm. What is the length of the hypotenuse? Show all steps.
## DIAGNOSTIC_ANSWER_3
Step 1: Identify legs \(a = 9\), \(b = 12\), hypotenuse \(c = ?\)  
Step 2: Apply theorem: \(c^2 = a^2 + b^2\)  
Step 3: Substitute: \(c^2 = 9^2 + 12^2 = 81 + 144 = 225\)  
Step 4: Take square root: \(c = \sqrt{225} = 15\) cm  
Step 5: Verify: \(15^2 = 225\) matches sum. A wrong answer (e.g., \(c = 21\) from adding 9+12, or \(c = \sqrt{9+12} = \sqrt{21}\)) reveals the student either adds lengths linearly or misapplies the square root.
## DIAGNOSTIC_QUESTION_4
Two right-angled triangles have the same hypotenuse length of 10 cm. Triangle X has legs 6 cm and 8 cm. Triangle Y has legs 5 cm and 5 cm. Is this possible? Explain using the theorem.
## DIAGNOSTIC_ANSWER_4
No, it is not possible. For Triangle X: \(6^2 + 8^2 = 36 + 64 = 100 = 10^2\). For Triangle Y: \(5^2 + 5^2 = 25 + 25 = 50 \neq 100\). The theorem fixes the sum of squares of legs to equal the square of the hypotenuse. If hypotenuse is 10, the sum of squares of legs must be 100. Triangle Y gives 50, so it cannot have hypotenuse 10. A wrong answer (e.g., "yes, both are right triangles") shows the student does not grasp that the theorem is a strict equality that determines the third side uniquely.
## DIAGNOSTIC_QUESTION_5
Ravi claims that any triangle with sides 7 cm, 24 cm, and 25 cm is right-angled because \(7^2 + 24^2 = 49 + 576 = 625 = 25^2\). Priya says we also need to check that the angle opposite the 25 cm side is 90°. Who is correct? Justify.
## DIAGNOSTIC_ANSWER_5
Ravi is correct. The Baudhayana-Pythagoras Theorem is an "if and only if" statement for right-angled triangles: if the side lengths satisfy \(a^2 + b^2 = c^2\), then the triangle must be right-angled with the right angle opposite side \(c\). This is the converse, which holds true. Priya's extra check is unnecessary. A wrong judgment (saying Priya is right) reveals the student does not know the converse is valid, a key insight for verifying right angles.
## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) that requires using the Baudhayana-Pythagoras Theorem to find a missing length. Write the problem, draw a labelled diagram, and solve it completely.
## DIAGNOSTIC_ANSWER_6
Example problem: A 13 m long bamboo pole leans against a vertical wall. The foot of the pole is 5 m away from the wall. How high up the wall does the pole reach?  
Diagram: Right triangle with hypotenuse 13 m (pole), base 5 m (distance from wall), height \(h\) (on wall).  
Solution: \(h^2 + 5^2 = 13^2 \Rightarrow h^2 = 169 - 25 = 144 \Rightarrow h = 12\) m.  
A poor answer (e.g., problem not right-angled, missing steps, wrong operation) reveals the student cannot translate a physical situation into the geometric model or execute the algebraic steps.
## COMMON_MISCONCEPTION
Students often believe the theorem applies to all triangles, not just right-angled ones. They may write \(a^2 + b^2 = c^2\) for an acute or obtuse triangle, or they misidentify the hypotenuse by simply picking the longest side without verifying a right angle exists. Another frequent error: squaring the sum of the legs \((a+b)^2\) instead of the sum of squares \(a^2+b^2\), leading to \(a^2+2ab+b^2 = c^2\).
## ON_FAILURE
If a student applies the theorem to a non-right triangle, first ask them to identify the right angle in their diagram. If none exists, remind them the theorem is *only* for right-angled triangles. For the \((a+b)^2\) error, have them draw squares on each side on grid paper: count unit squares in the two smaller squares and compare to the large square. Show algebraically that \((a+b)^2 = a^2 + 2ab + b^2\), which includes an extra \(2ab\) term not present in the theorem. Practice with numeric examples: 3,4,5 gives \(3^2+4^2=25\) but \((3+4)^2=49\).
## PREREQUISITE_NODE_IDS
c8_math_ch9_4, c7_math_ch07_005, c6_math_ch08_087
## PREREQUISITE_REASONS
c8_math_ch9_4: Introduces the hypotenuse in an isosceles right triangle and the relationship between side and diagonal via squares, building direct intuition for the general theorem.
c7_math_ch07_005: Classifies triangles by angles; student must recognise a right-angled triangle to know when the theorem applies.
c6_math_ch08_087: Covers area of squares; the theorem is fundamentally an equality of areas of squares built on the sides.
## FORWARD_NODE_IDS
c8_math_ch9_6, c8_math_ch9_7, c8_math_ch9_8, c8_math_ch9_9, c8_math_ch9_10
## FORWARD_REASONS
c8_math_ch9_6: The visual proof uses the area interpretation established here to demonstrate why the theorem holds.
c8_math_ch9_7: Pythagorean triples are specific integer solutions to \(a^2+b^2=c^2\), directly applying the formula.
c8_math_ch9_8: Finding unknown side lengths requires rearranging the theorem's formula, which is first stated here.
c8_math_ch9_9: Real-life problems model situations as right triangles and use the theorem to compute distances.
c8_math_ch9_10: Verifying right-angled triangles uses the converse of the theorem stated in this node.
## CROSS_SUBJECT_PREREQS
c6_math_ch07_073, c6_math_ch08_087
## CROSS_SUBJECT_REASONS
c6_math_ch07_073: Triangle classification (right, acute, obtuse) is essential in physics for vector resolution and force diagrams where perpendicular components are used.
c6_math_ch08_087: Area of squares and rectangles underpins the geometric interpretation of the theorem, used in architecture and land surveying for checking right angles.
## CHAIN_DESCRIPTION
c8_math_ch9_4 -> c8_math_ch9_5 -> c8_math_ch9_6
## THIS_FORMULA
\(a^2 + b^2 = c^2\)
## FORMULA_VARIABLES
\(a\) = length of one leg (perpendicular side), \(b\) = length of the other leg (base), \(c\) = length of the hypotenuse (side opposite the right angle)
## FORMULA_UNITS
Lengths in metres (m), centimetres (cm), kilometres (km), etc.; areas in square units (m², cm²). The equation is dimensionally consistent: length² = length² + length².
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c6_math_ch07_073 | In physics, resolving vectors into perpendicular components uses right-angled triangles; the theorem gives the magnitude of the resultant.
c6_math_ch08_087 | In architecture and carpentry, the 3-4-5 triangle method (based on this theorem) is used to lay out perfect right angles for foundations and frames.
## PREREQ_CONCEPT
Understanding that a right-angled triangle has one 90° angle, the side opposite it is the longest side (hypotenuse), and the area of a square is side × side.
## PREREQ_BEFORE
The student must be able to identify the right angle and hypotenuse in a triangle, and compute squares of whole numbers (e.g., \(6^2 = 36\)) and square roots of perfect squares (e.g., \(\sqrt{144} = 12\)).
## PREREQ_STUCK
Revisit "Types of Triangles: Based on Angles" (c7_math_ch07_005) to recognise right angles, and "Area of Rectangles and Squares" (c6_math_ch08_087) to recall squaring as area.
## WORKED_EXAMPLE_1
PROBLEM: A rectangular field is 60 metres long and 25 metres wide. A farmer wants to walk diagonally across the field from one corner to the opposite corner. How much distance does he save compared to walking along the two sides?

STEPS:
- Step 1: Identify the right-angled triangle formed by the length (60 m), width (25 m), and the diagonal (hypotenuse \(d\)).
- Step 2: Write the Baudhayana-Pythagoras Theorem: \(d^2 = 60^2 + 25^2\).
- Step 3: Compute the squares: \(60^2 = 3600\), \(25^2 = 625\). Sum = \(3600 + 625 = 4225\).
- Step 4: Find the square root of 4225. Since \(65^2 = 4225\), the diagonal \(d = 65\) m.
- Step 5: Distance along sides = \(60 + 25 = 85\) m. Distance saved = \(85 - 65 = 20\) m.

REASONING: The diagonal of a rectangle splits it into two congruent right-angled triangles. The theorem relates the three sides of that triangle. We compute the hypotenuse (diagonal) and compare it to the sum of the legs (walking along edges).

ANSWER: The farmer saves 20 metres by walking diagonally.
## WORKED_EXAMPLE_2
PROBLEM: A 15 m long ladder is placed against a vertical wall such that its foot is 9 m away from the wall. How high up the wall does the ladder reach? If the foot is pulled out to 12 m from the wall, how much does the top slide down?

STEPS:
- Step 1: First position: ladder = hypotenuse \(c = 15\) m, base \(a = 9\) m, height \(b = ?\). Apply theorem: \(b^2 = c^2 - a^2\).
- Step 2: Compute: \(b^2 = 15^2 - 9^2 = 225 - 81 = 144\). So \(b = \sqrt{144} = 12\) m. Ladder reaches 12 m high.
- Step 3: Second position: base \(a' = 12\) m, hypotenuse still 15 m. New height \(b'^2 = 15^2 - 12^2 = 225 - 144 = 81\). So \(b' = \sqrt{81} = 9\) m.
- Step 4: The top slides down from 12 m to 9 m, a drop of \(12 - 9 = 3\) m.
- Step 5: Verify: In first case, sides 9, 12, 15 (3-4-5 triple ×3). In second, sides 12, 9, 15 (same triangle rotated). Consistent.

REASONING: The ladder, wall, and ground form a right-angled triangle. The ladder length (hypotenuse) is fixed. Moving the base changes the height. We use the theorem in the form \(b^2 = c^2 - a^2\) to find the missing leg.

ANSWER: Initially the ladder reaches 12 m. After moving the foot to 12 m, it reaches 9 m, sliding down 3 m.
## WORKED_EXAMPLE_3
PROBLEM: An isosceles right triangle has hypotenuse \(10\sqrt{2}\) cm. Find the length of each leg and the area of the triangle.

STEPS:
- Step 1: In an isosceles right triangle, legs are equal: \(a = b\). Hypotenuse \(c = 10\sqrt{2}\) cm.
- Step 2: Apply theorem: \(c^2 = a^2 + a^2 = 2a^2\).
- Step 3: Compute \(c^2 = (10\sqrt{2})^2 = 100 \times 2 = 200\).
- Step 4: So \(2a^2 = 200 \Rightarrow a^2 = 100 \Rightarrow a = \sqrt{100} = 10\) cm. Each leg is 10 cm.
- Step 5: Area of right triangle = \(\frac{1}{2} \times \text{leg}_1 \times \text{leg}_2 = \frac{1}{2} \times 10 \times 10 = 50\) cm².
- Step 6: Check: This matches the earlier result from node c8_math_ch9_4 where diagonal of square of side 10 is \(10\sqrt{2}\). The triangle is half that square, area = half of \(10^2 = 50\) cm².

REASONING: This problem combines the general theorem with the special isosceles case studied earlier. The algebraic manipulation involves solving for \(a\) when \(c\) is given as a surd. The area formula for a right triangle (\(\frac{1}{2}ab\)) connects to the area of squares on the legs.

ANSWER: Each leg is 10 cm; area is 50 cm².
## COMPETENCY_QUESTION_1
QUESTION: A triangle has sides of length 8 cm, 15 cm, and 17 cm. Without drawing it, explain how you can be certain whether it is a right-angled triangle or not. If it is right-angled, which side is the hypotenuse?

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Identify the longest side (17 cm) as the candidate for hypotenuse.
- Step 2: Square all three sides: \(8^2 = 64\), \(15^2 = 225\), \(17^2 = 289\).
- Step 3: Check if the sum of squares of the two shorter sides equals the square of the longest: \(64 + 225 = 289\).
- Step 4: Since \(289 = 289\), the condition holds. By the converse of the Baudhayana-Pythagoras Theorem, the triangle is right-angled with hypotenuse 17 cm.

ANSWER: Yes, it is a right-angled triangle because \(8^2 + 15^2 = 17^2\). The hypotenuse is the 17 cm side.

DIFFICULTY: easy
## COMPETENCY_QUESTION_2
QUESTION: A 20 m high pole is supported by a guy wire attached to its top and fixed to the ground 15 m from the base of the pole. The wire costs ₹50 per metre. How much does the wire cost? If the wire is replaced by a longer one fixed 20 m from the base, what is the new cost? By how much does the cost increase?

COMPETENCY: Comparing and justifying

STEPS:
- Step 1: First wire: right triangle with height = 20 m (pole), base = 15 m. Hypotenuse \(w_1^2 = 20^2 + 15^2 = 400 + 225 = 625\). So \(w_1 = 25\) m.
- Step 2: Cost of first wire = \(25 \times 50 = ₹1250\).
- Step 3: Second wire: base = 20 m, height = 20 m. Hypotenuse \(w_2^2 = 20^2 + 20^2 = 400 + 400 = 800\). So \(w_2 = \sqrt{800} = \sqrt{400 \times 2} = 20\sqrt{2} \approx 20 \times 1.414 = 28.28\) m.
- Step 4: Cost of second wire = \(28.28 \times 50 = ₹1414\) (approx).
- Step 5: Increase in cost = \(1414 - 1250 = ₹164\).
- Step 6: Justification: Moving the anchor point farther from the pole increases the hypotenuse because the sum of squares of legs increases. The isosceles right triangle (20, 20) has hypotenuse \(20\sqrt{2}\), which is longer than the 3-4-5 scaled triangle (15, 20, 25).

ANSWER: First wire costs ₹1250. Second wire costs approximately ₹1414. Cost increases by approximately ₹164.

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The ______-Pythagoras Theorem states that in a right-angled triangle, the area of the square constructed on the hypotenuse (the side opposite the right angle) is equal to the sum of the areas of the squares constructed on the other two sides (the legs).

## DIAGNOSTIC_ANSWER_7
Baudhayana

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are helping your father lay a ______ carpet in a room that is 6 metres long and 8 metres wide.

## DIAGNOSTIC_ANSWER_8
rectangular
