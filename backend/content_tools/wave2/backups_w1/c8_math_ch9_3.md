## ELI5
To shrink a square to exactly half its area, cut its diagonal in half: the half-diagonal becomes the new square's side. Fold the original along its diagonal and the fold line tells the story — half of it, squared, gives half the area. It is doubling's mirror image, and the compass performs it without a single calculation, transferring the fold's length straight into the new figure's side.

## DEFINITION
Halving a square is the geometric construction of a new square whose area is exactly half the area of a given square. If the original square has side length \(a\), the constructed square has side length \(\frac{a}{\sqrt{2}}\) (or equivalently, half the diagonal of the original square), and its area is \(\frac{a^2}{2}\).
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can independently construct a square with half the area of a given square using only a compass and straightedge, and can justify the construction by explaining the relationship between the side and diagonal of a square using the Pythagorean theorem (Baudhayana theorem).
## SCOPE_BOUNDARY
This node covers the construction and reasoning for halving a square's area, specifically using the diagonal and its bisection. It does not cover the general proof of the Pythagorean theorem for all right triangles (covered in c8_math_ch9_5 and c8_math_ch9_6), nor does it cover algebraic manipulation of square roots beyond the geometric interpretation.
## WALKTHROUGH
Imagine you are a tile designer in Jaipur creating a pattern for a courtyard. You have a square marble slab of side 60 cm, but the design requires a smaller square of exactly half the area to fit into a corner. How do you determine the size of the smaller square without measuring tapes or calculators, using only a ruler and compass? Start by recalling the previous lesson: doubling a square meant using the diagonal as the new side. To halve, we reverse the logic. First, draw the given square and its diagonal. The diagonal splits the square into two right isosceles triangles. By the Pythagorean theorem, the diagonal is \(a\sqrt{2}\). If we bisect this diagonal, each half is \(\frac{a\sqrt{2}}{2} = \frac{a}{\sqrt{2}}\). A square built on this half-diagonal has area \(\left(\frac{a}{\sqrt{2}}\right)^2 = \frac{a^2}{2}\) — exactly half the original area. The key insight is that **the side of the halved square is half the diagonal of the original square**.

Takeaway: the half-area square's side is half the original diagonal — construct the diagonal, bisect it, and build the new square on the half-diagonal; equivalently the side divided by the square root of two. Exam format: expect the construction, the justification via the Pythagorean relationship between side and diagonal, and the area check. Verification beat: the new side must be visibly shorter than the original side yet longer than half of it. Why students miss it: they halve the side instead of the diagonal — halving the side gives a quarter of the area, a completely different plot.

## DIAGNOSTIC_QUESTION_1
Given a square of side 10 cm, what is the side length of a square with half its area? Express your answer in simplest radical form.
## DIAGNOSTIC_ANSWER_1
The side length is \(5\sqrt{2}\) cm. Half the area means new area = \(100/2 = 50\) cm². Side = \(\sqrt{50} = 5\sqrt{2}\) cm. A wrong answer of 5 cm reveals the student thinks halving the side halves the area (a common linear thinking error). An answer of \(10/\sqrt{2}\) without rationalising shows incomplete simplification.
## DIAGNOSTIC_QUESTION_2
Explain why constructing a square on half the diagonal of the original square yields a square of half the area. Use the relationship between the side and diagonal of a square in your reasoning.
## DIAGNOSTIC_ANSWER_2
The diagonal \(d\) of a square of side \(a\) is \(a\sqrt{2}\) (by Pythagoras: \(d^2 = a^2 + a^2 = 2a^2\)). Half the diagonal is \(d/2 = a/\sqrt{2}\). The area of a square with this side is \((a/\sqrt{2})^2 = a^2/2\), which is half of \(a^2\). A wrong answer that states "the diagonal is double the side" or "half the diagonal is half the side" reveals confusion between linear and quadratic scaling, or not applying the Pythagorean theorem to relate side and diagonal.
## DIAGNOSTIC_QUESTION_3
A square courtyard has an area of 200 m². You need to mark out a smaller square garden inside it with exactly half the area. What should be the side length of the garden square? Show your calculation.
## DIAGNOSTIC_ANSWER_3
Original area = 200 m². Half area = 100 m². Side of garden = \(\sqrt{100} = 10\) m. Steps: 1) Halve the area: 200/2 = 100. 2) Take square root: \(\sqrt{100} = 10\). A wrong answer of \(\sqrt{200}/2 \approx 7.07\) m reveals the student incorrectly halved the side instead of the area. An answer of 50 m² (just halving the area without square root) shows confusion between area and side length.
## DIAGNOSTIC_QUESTION_4
Compare the two methods for halving a square: (A) joining the midpoints of the original square, and (B) constructing a square on half the diagonal. Are the resulting squares congruent? Justify your answer.
## DIAGNOSTIC_ANSWER_4
Yes, they are congruent. Method A: The segment joining midpoints of adjacent sides is the hypotenuse of a right triangle with legs \(a/2\) and \(a/2\), so its length is \(\sqrt{(a/2)^2 + (a/2)^2} = a/\sqrt{2}\). Method B: Half the diagonal = \(a\sqrt{2}/2 = a/\sqrt{2}\). Both squares have the same side length \(a/\sqrt{2}\), hence same area and are congruent (rotated 45° relative to each other). A wrong answer claiming they are different reveals the student does not recognise that both constructions produce the same length \(a/\sqrt{2}\), or cannot compute the midpoint segment length using Pythagoras.
## DIAGNOSTIC_QUESTION_5
A student constructs a square of side 8 cm, then draws its diagonal and claims the square built on the full diagonal has half the area. Evaluate this claim and correct the error.
## DIAGNOSTIC_ANSWER_5
The claim is false. The square on the full diagonal has side \(8\sqrt{2}\) cm, area = \((8\sqrt{2})^2 = 128\) cm². The original area is 64 cm². 128 cm² is **double** the original area, not half. The correct construction for half area uses **half the diagonal** (length \(4\sqrt{2}\) cm), giving area 32 cm². A wrong evaluation that agrees with the student reveals confusion between doubling and halving, likely reversing the Baudhayana sutra "the diagonal produces double the area".
## DIAGNOSTIC_QUESTION_6
Design a real-world problem (with numbers) where halving a square is needed, and describe the construction steps a carpenter would follow using only a rope (as a compass) and a straight edge, as in ancient Sulba-sutra practices.
## DIAGNOSTIC_ANSWER_6
Example problem: A square wooden board of side 1 m is to be cut into two pieces to make two identical smaller square shelves of equal total area. Each shelf must have half the board's area. Construction: 1) Mark the square board. 2) Stretch rope from one corner to the opposite corner to mark the diagonal. 3) Fold the rope to find the midpoint of the diagonal. 4) Use that half-length as the side to mark out the smaller square on the board. 5) Cut along the lines. A poor answer gives a problem not requiring half-area, or describes measuring with a ruler instead of geometric construction, showing lack of connection to the historical method.
## COMMON_MISCONCEPTION
Students often think that halving the side length of a square halves its area. For example, given a square of side 10 cm, they will say the half-area square has side 5 cm. This is incorrect because area scales with the square of the side: \((5)^2 = 25\) cm², but half of \(10^2 = 100\) cm² is 50 cm². The correct side is \(\sqrt{50} = 5\sqrt{2} \approx 7.07\) cm. This error stems from linear reasoning applied to a quadratic relationship.
## ON_FAILURE
If a student gives side = 5 cm for a 10 cm square, do not just say "wrong". Instead: 1) Ask them to compute the area of the original square (100 cm²). 2) Ask for half that area (50 cm²). 3) Ask what number multiplied by itself gives 50. 4) Guide them to \(\sqrt{50} = 5\sqrt{2}\). 5) Then show geometrically: draw the 10 cm square, its diagonal (≈14.14 cm), halve the diagonal (≈7.07 cm), and verify that a square of this side fits exactly half the area (e.g., by folding or counting grid squares). This connects the arithmetic to the construction.
## PREREQUISITE_NODE_IDS
c8_math_ch9_1, c8_math_ch9_2, c6_math_ch07_081, c6_math_ch08_087, c7_math_ch07_007
## PREREQUISITE_REASONS
c8_math_ch9_1: Introduces the Baudhayana sutra "diagonal produces double area", which is reversed here.
c8_math_ch9_2: Covers constructing a square of double area using the diagonal; halving is the inverse operation.
c6_math_ch07_081: Provides the skill to construct perpendicular bisectors, needed to bisect the diagonal.
c6_math_ch08_087: Establishes area of a square = side², essential for understanding half-area.
c7_math_ch07_007: Angle sum property helps justify the 45° angles in the isosceles right triangles formed by the diagonal.
## FORWARD_NODE_IDS
c8_math_ch9_4, c8_math_ch9_5, c8_math_ch9_6
## FORWARD_REASONS
c8_math_ch9_4: The hypotenuse of an isosceles right triangle is the diagonal of a square; halving the square relates directly to half the hypotenuse.
c8_math_ch9_5: The general Baudhayana-Pythagoras theorem statement builds on the special case of the square's diagonal.
c8_math_ch9_6: Visual proof of Pythagoras often uses the square-on-the-hypotenuse construction, which relies on understanding area halving/doubling.
## CROSS_SUBJECT_PREREQS
c6_math_ch07_078, c6_math_ch07_080, c7_math_ch14_006
## CROSS_SUBJECT_REASONS
c6_math_ch07_078: Symmetry in shapes (the halved square is symmetric by rotation) connects to the midpoint construction method.
c6_math_ch07_080: Constructing triangles (specifically right isosceles) is used when joining midpoints to form the inner square.
c7_math_ch14_006: Tiling patterns often use squares and half-squares; this node provides the geometric basis for such designs.
## CHAIN_DESCRIPTION
c8_math_ch9_2 -> c8_math_ch9_3 -> c8_math_ch9_4
## THIS_FORMULA
If original square side = \(a\), then side of half-area square = \(\frac{a}{\sqrt{2}} = \frac{a\sqrt{2}}{2}\) (half the diagonal).
## FORMULA_VARIABLES
\(a\) = side length of the original square (in any linear unit).
## FORMULA_UNITS
Linear units (cm, m, etc.) for side length; square units (cm², m²) for area.
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c6_math_ch07_078 | The half-square construction creates a rotated square symmetric to the original, illustrating rotational symmetry of order 4.
c7_math_ch14_006 | Tiling a floor with squares and half-squares (isosceles right triangles) uses this exact construction for pattern design.
## PREREQ_CONCEPT
The diagonal of a square divides it into two congruent right isosceles triangles, and by the Pythagorean theorem, the diagonal length is \(\sqrt{2}\) times the side.
## PREREQ_BEFORE
The student must be able to construct a perpendicular bisector of a line segment (to bisect the diagonal) and calculate the area of a square given its side.
## PREREQ_STUCK
If stuck, review constructing a perpendicular bisector (c6_math_ch07_081) and the area formula for a square (c6_math_ch08_087).
## WORKED_EXAMPLE_1
PROBLEM: A square piece of cloth has a side length of 40 cm. A tailor wants to cut a smaller square from it that has exactly half the area. What should be the side length of the smaller square? Show the construction steps and verify the area.
STEPS:
- Step 1: Identify given: original square side \(a = 40\) cm. Original area = \(40^2 = 1600\) cm². Required area = \(1600 / 2 = 800\) cm².
- Step 2: Determine the side of the new square: \(s = \sqrt{800} = \sqrt{400 \times 2} = 20\sqrt{2}\) cm. Alternatively, using the diagonal method: diagonal of original = \(40\sqrt{2}\) cm. Half diagonal = \(20\sqrt{2}\) cm. This is the required side.
- Step 3: Construction: Draw square ABCD of side 40 cm. Draw diagonal AC. Construct the perpendicular bisector of AC to find its midpoint O. The segment AO (or OC) has length \(20\sqrt{2}\) cm.
- Step 4: Using a compass, mark length AO on a ray from A. Construct a square AEFG with side AE = AO. This is the required half-area square.
- Step 5: Verify: Area of AEFG = \((20\sqrt{2})^2 = 400 \times 2 = 800\) cm². This matches half of 1600 cm².
REASONING: The construction works because the diagonal of a square relates to its side by \(d = a\sqrt{2}\) (Pythagoras). Half the diagonal is \(a/\sqrt{2}\), and squaring this gives \(a^2/2\), exactly half the original area. The perpendicular bisector gives the exact midpoint without measurement.
ANSWER: Side length = \(20\sqrt{2}\) cm (≈ 28.28 cm).
## WORKED_EXAMPLE_2
PROBLEM: A square garden plot has an area of 450 m². The owner wants to divide it into two equal square plots by building a fence. What will be the side length of each new square plot? If fencing costs ₹150 per metre, what is the total cost to fence one of the new square plots (all four sides)?
STEPS:
- Step 1: Original area = 450 m². Each new square area = \(450 / 2 = 225\) m².
- Step 2: Side of each new square = \(\sqrt{225} = 15\) m. (Note: This is a perfect square, so no radical needed.)
- Step 3: Perimeter of one new square = \(4 \times 15 = 60\) m.
- Step 4: Cost of fencing = Perimeter × Rate = \(60 \times 150 = ₹9000\).
- Step 5: Check consistency with diagonal method: Original side \(a = \sqrt{450} = 15\sqrt{2}\) m. Diagonal = \(a\sqrt{2} = 15\sqrt{2} \times \sqrt{2} = 30\) m. Half diagonal = 15 m. Matches the computed side.
REASONING: This problem combines area halving with a real-world cost calculation. The key is recognizing that halving the area leads to a side that is half the diagonal of the original square. Here the numbers work out neatly because 450 = 2 × 225, making the new side a whole number.
ANSWER: Side = 15 m, Fencing cost = ₹9000.
## WORKED_EXAMPLE_3
PROBLEM: A square sheet of metal of side 30 cm is to be used to make two identical square bases for a model. The squares must be cut from the sheet with minimal waste. The designer proposes cutting the sheet along lines joining the midpoints of the sides, yielding a central square and four corner triangles. The central square is used as one base, and the four triangles are reassembled to form the second base. Verify that both bases have equal area and find the side length of each base.
STEPS:
- Step 1: Original square side = 30 cm. Area = \(30^2 = 900\) cm². Each base must have area = \(900 / 2 = 450\) cm².
- Step 2: Side of each base = \(\sqrt{450} = \sqrt{225 \times 2} = 15\sqrt{2}\) cm.
- Step 3: Construction by midpoints: Join midpoints of the 30 cm square. Each midpoint segment is the hypotenuse of a right triangle with legs 15 cm and 15 cm. Length = \(\sqrt{15^2 + 15^2} = \sqrt{450} = 15\sqrt{2}\) cm. This forms the central square of side \(15\sqrt{2}\) cm, area = 450 cm².
- Step 4: The four corner triangles are congruent right isosceles triangles (legs 15 cm). Each area = \(\frac{1}{2} \times 15 \times 15 = 112.5\) cm². Four triangles total = \(4 \times 112.5 = 450\) cm².
- Step 5: These four triangles can be rearranged (two pairs joined along their hypotenuses) to form a square of side 15 cm? Wait: Two triangles form a square of side 15 cm? No, two triangles form a square of side 15 cm? Let's check: Two triangles with legs 15 cm joined along the hypotenuse form a square of side 15 cm? Actually, joining two right isosceles triangles along their hypotenuses forms a square whose side is the leg length (15 cm). Area = 225 cm². Two such squares (from 4 triangles) give total 450 cm², but they are two separate squares. To form ONE square of area 450 cm², we need to join them differently. The problem says "reassembled to form the second base" (one square). Can four right triangles of legs 15 cm form a square of side \(15\sqrt{2}\)? Yes: Arrange them with their right angles meeting at the center, hypotenuses outward. The outer boundary is a square of side \(15\sqrt{2}\). This matches the central square.
- Step 6: Both bases have side \(15\sqrt{2}\) cm and area 450 cm². Equal area verified.
REASONING: This problem connects the midpoint construction (method A) with the triangle rearrangement, showing that the four corner triangles exactly reconstitute a square congruent to the central one. It reinforces that the side of the half-area square is \(a/\sqrt{2}\) and that the diagonal of the original square is \(a\sqrt{2}\).
ANSWER: Each base side = \(15\sqrt{2}\) cm (≈ 21.21 cm), area = 450 cm² each.
## COMPETENCY_QUESTION_1
QUESTION: A student says: "To get a square of half the area, I just need to draw a square with half the side length." Take a square of side 12 cm and show, with calculations and a diagram description, why this is incorrect. Then explain the correct method using the diagonal.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Calculate area of original square (side 12 cm) = 144 cm². Half area = 72 cm².
- Step 2: Calculate area of square with half side (6 cm) = 36 cm². Compare: 36 ≠ 72. The student's method gives 1/4 area, not 1/2.
- Step 3: Find correct side: \(\sqrt{72} = 6\sqrt{2}\) cm ≈ 8.49 cm.
- Step 4: Explain correct construction: Draw diagonal of 12 cm square = \(12\sqrt{2}\) cm. Bisect it to get \(6\sqrt{2}\) cm. Construct square on this half-diagonal.
- Step 5: Conclude: Halving the side quarters the area because area scales as side². The correct linear factor is \(1/\sqrt{2}\), not 1/2.
ANSWER: The student's method gives a square of area 36 cm² (1/4 of original). The correct half-area square has side \(6\sqrt{2}\) cm, constructed on half the diagonal. The error is linear thinking: area ∝ side², so to halve area, side must be divided by \(\sqrt{2}\), not 2.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: An architect is designing a square courtyard of side 20 m. She wants to create a square water pool in the center such that the pool's area is exactly half the courtyard's area, and the pool's corners touch the midpoints of the courtyard's sides. (a) Find the side length of the pool. (b) Find the width of the border (the gap between the pool edge and the courtyard wall). (c) If the border is to be paved with tiles of size 30 cm × 30 cm, how many tiles are needed? (Assume no cutting waste.)
COMPETENCY: Translating real-world situations to mathematical expressions and multi-step problem solving
STEPS:
- Step 1: Courtyard side = 20 m. Area = 400 m². Pool area = 200 m². Pool side = \(\sqrt{200} = 10\sqrt{2}\) m. (This matches the midpoint construction: distance from center to midpoint is 10 m, so pool side = \(\sqrt{10^2+10^2} = 10\sqrt{2}\) m.)
- Step 2: The pool is centered. The distance from courtyard center to pool corner = half the pool diagonal = \(\frac{10\sqrt{2} \times \sqrt{2}}{2} = 10\) m. The distance from center to courtyard side = 10 m. So the pool corners touch the midpoints. The border width is the distance from pool side to courtyard side along the perpendicular. This is the difference between the courtyard's inradius (10 m) and the pool's inradius. Pool inradius = half pool side = \(5\sqrt{2}\) m ≈ 7.07 m. Border width = \(10 - 5\sqrt{2}\) m ≈ 2.93 m.
- Step 3: Border area = Courtyard area - Pool area = 400 - 200 = 200 m² = 2,000,000 cm². Tile area = 30 × 30 = 900 cm². Number of tiles = \(2,000,000 / 900 = 2222.22...\) → 2223 tiles (since partial tiles needed). But "no cutting waste" implies the border dimensions must be multiples of 30 cm. Check: Border width ≈ 2.93 m = 293 cm, not a multiple of 30. So the problem's assumption is idealized. We compute theoretically: 2000000/900 = 20000/9 = 2222.22 → 2223 tiles.
- Step 4: Alternatively, if we consider the border as a square ring, we can calculate tiles by dividing the border width by tile size, but the "no cutting waste" is inconsistent with the given numbers. We'll state the theoretical number.
- Step 5: Final answers with units.
ANSWER: (a) Pool side = \(10\sqrt{2}\) m (≈ 14.14 m). (b) Border width = \(10 - 5\sqrt{2}\) m (≈ 2.93 m). (c) Theoretical tiles = 2223 (since 200 m² / 0.09 m² = 2222.22...). Note: The "no cutting waste" condition cannot be met exactly with these dimensions; the architect would need to adjust the courtyard or pool size.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Halving a square is the geometric ______ of a new square whose area is exactly half the area of a given square.

## DIAGNOSTIC_ANSWER_7
construction

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a tile designer in Jaipur creating a pattern for a ______.

## DIAGNOSTIC_ANSWER_8
courtyard

## DIAGNOSTIC_QUESTION_9
What is Halving a square? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Halving a square is the geometric construction of a new square whose area is exactly half the area of a given square.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: You have a square marble slab of side ______ cm, but the design requires a smaller square of exactly half the area to fit into a corner.

## DIAGNOSTIC_ANSWER_10
60

## DIAGNOSTIC_QUESTION_11
What common mix-up does this lesson flag about Halving a square?

## DIAGNOSTIC_ANSWER_11
Students often think that halving the side length of a square halves its area.

## DIAGNOSTIC_QUESTION_12
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_12
The student can independently construct a square with half the area of a given square using only a compass and straightedge, and can justify the construction by explaining the relationship between the side and diagonal of a square using the Pythagorean theorem (Baudhayana theorem).
