## ELI5
Draw both strings (diagonals) across a parallelogram. Where they cross, something tidy happens: each string is cut exactly in half. The crossing point is the midpoint of both diagonals — the four little segments come out in two equal pairs. It is the parallelogram's own balance point, and it exists because the slanted sides stay parallel, forcing the little triangles on either side of the crossing to be perfect twins. Every parallelogram, however lopsided it looks, balances at this exact centre.

## DEFINITION
In a parallelogram, the two diagonals intersect at a point that divides each diagonal into two equal segments. If ABCD is a parallelogram with diagonals AC and BD intersecting at O, then AO = OC and BO = OD.
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can prove that the diagonals of a parallelogram bisect each other using triangle congruence (ASA or SAS), and can apply this property to find unknown segment lengths in geometric problems involving parallelograms.
## SCOPE_BOUNDARY
This node covers the proof and application of the diagonal bisection property for parallelograms. It does NOT cover the perpendicular bisector property (that is for rhombus, node c8_math_ch4_8) or the equal diagonal property (that is for rectangle, node c8_math_ch4_3).
## WALKTHROUGH
Imagine you are designing a rectangular garden bed with a cross-path from corner to corner. The paths cross exactly in the middle, so each half of a path is equal. Now think of a slanted parallelogram-shaped field — do the crossing diagonals still cut each other exactly in half? Let's investigate. First, recall that a parallelogram has opposite sides parallel and equal (c8_math_ch4_9). Draw diagonal AC, creating two triangles. Because opposite sides are parallel, alternate interior angles are equal (c7_math_ch05_008). With one common side and two pairs of equal angles, the triangles are congruent by ASA. Therefore, the corresponding parts of the diagonals are equal. This property holds for every parallelogram, no matter how slanted.

Takeaway: diagonals of a parallelogram bisect each other — prove it by pairing the two triangles that share the crossing point: parallel sides give equal alternate angles, and one shared side completes the congruence by ASA. Exam format: expect the full proof and 'find the unknown segment' problems; state the congruence criterion and the equal-parts conclusion separately. Verification beat: check both diagonals are halved, not just one. Why students miss it: they assert bisection from the picture without the congruence argument — the equal alternate angles from the parallel sides are the engine of the proof.

## DIAGNOSTIC_QUESTION_1
State the property of diagonals in a parallelogram. If ABCD is a parallelogram with diagonals intersecting at O, write the two equalities that describe this property.
## DIAGNOSTIC_ANSWER_1
The diagonals bisect each other: AO = OC and BO = OD. A wrong answer (e.g., saying diagonals are equal or perpendicular) reveals confusion with rectangle or rhombus properties. The student has not distinguished the specific property of a general parallelogram.
## DIAGNOSTIC_QUESTION_2
Explain why the triangles formed by one diagonal of a parallelogram are congruent. Which congruence criterion (SSS, SAS, ASA, RHS) applies and why?
## DIAGNOSTIC_ANSWER_2
Diagonal AC divides parallelogram ABCD into ΔABC and ΔCDA. AB = CD, BC = DA (opposite sides equal), and AC is common. So ΔABC ≅ ΔCDA by SSS. Alternatively, using alternate interior angles (∠BAC = ∠DCA, ∠BCA = ∠DAC) and common side AC gives ASA. A wrong answer (e.g., choosing SAS without the included angle) shows the student cannot identify the correct equal parts from the parallelogram's properties.
## DIAGNOSTIC_QUESTION_3
In parallelogram PQRS, diagonals PR and QS intersect at T. If PT = 3x + 2 cm and TR = 5x - 4 cm, find the value of x and the length of diagonal PR.
## DIAGNOSTIC_ANSWER_3
Since diagonals bisect each other, PT = TR. So 3x + 2 = 5x - 4 → 2x = 6 → x = 3. Then PT = 3(3)+2 = 11 cm, TR = 11 cm, so PR = 22 cm. A wrong answer (e.g., setting PT + TR = something else) reveals the student does not apply the bisection property to algebraic expressions.
## DIAGNOSTIC_QUESTION_4
A student claims: "If the diagonals of a quadrilateral bisect each other, the quadrilateral must be a parallelogram." Is this statement true? Justify your answer by comparing with the property we just learned.
## DIAGNOSTIC_ANSWER_4
Yes, the statement is true. It is the converse of the property: if diagonals bisect each other, the quadrilateral is a parallelogram. This can be proved by showing the triangles formed are congruent (SAS), giving opposite sides equal. A wrong answer (saying it's false or only for special quadrilaterals) shows the student does not understand the biconditional nature of this property.
## DIAGNOSTIC_QUESTION_5
Rohan drew a quadrilateral with diagonals of lengths 10 cm and 12 cm that intersect at right angles. He says it must be a parallelogram because the diagonals bisect each other at 90°. Evaluate his reasoning.
## DIAGNOSTIC_ANSWER_5
Rohan's reasoning is flawed. Diagonals intersecting at right angles does not guarantee they bisect each other; a kite has perpendicular diagonals but only one is bisected. For a parallelogram, we need both diagonals to bisect each other (the intersection point is the midpoint of both). A wrong evaluation (agreeing with Rohan) shows confusion between "perpendicular" and "bisect" properties.
## DIAGNOSTIC_QUESTION_6
Create a real-life problem (using metres or rupees) where the diagonal bisection property of a parallelogram is used to find an unknown length. Write the problem and solve it.
## DIAGNOSTIC_ANSWER_6
Example: A parallelogram-shaped plot has diagonals crossing at a well. One diagonal is 40 m long. The distance from the well to one corner along the other diagonal is 15 m. Find the full length of the second diagonal. Solution: The well is the midpoint, so half of second diagonal = 15 m → full length = 30 m. A poor answer (problem doesn't use bisection or uses wrong property) shows inability to transfer the concept to a contextual situation.
## COMMON_MISCONCEPTION
Students often confuse "diagonals bisect each other" with "diagonals are equal" (rectangle) or "diagonals are perpendicular" (rhombus). In a general parallelogram, diagonals are NOT necessarily equal or perpendicular. They only share the midpoint. For example, in a slanted parallelogram with sides 5 cm and 8 cm and angle 60°, the diagonals have different lengths and cross at an angle not 90°.
## ON_FAILURE
1. Have the student draw a parallelogram on grid paper, measure the diagonal segments with a ruler, and verify AO = OC, BO = OD. 2. Revisit the proof: highlight that we use opposite sides parallel → alternate interior angles equal → triangles congruent by ASA → corresponding parts equal. 3. Contrast with rectangle (diagonals equal) and rhombus (diagonals perpendicular) using separate diagrams. 4. Practice: "In parallelogram ABCD, AC=10, BD=12. Find AO, OC, BO, OD." (Answer: 5,5,6,6). Emphasize that the two diagonals have different half-lengths.
## PREREQUISITE_NODE_IDS
c8_math_ch4_9, c7_math_ch05_008, c7_math_ch09_007, c6_math_ch07_083
## PREREQUISITE_REASONS
c8_math_ch4_9: Defines parallelogram and its properties (opposite sides parallel and equal) which are used in the proof.
c7_math_ch05_008: Alternate interior angles formed by parallel lines and a transversal are equal; used to prove angle equality in the triangles.
c7_math_ch09_007: ASA congruence criterion is used to prove the two triangles formed by a diagonal are congruent.
c6_math_ch07_083: Basic understanding of congruence of shapes (same shape and size) is needed to grasp the proof.
## FORWARD_NODE_IDS
c8_math_ch4_8, c8_math_ch4_3, c8_math_ch4_11
## FORWARD_REASONS
c8_math_ch4_8: Rhombus is a special parallelogram; its diagonals are perpendicular bisectors, building on the bisection property.
c8_math_ch4_3: Rectangle is a special parallelogram; its diagonals are equal in length and bisect each other.
c8_math_ch4_11: Kite properties contrast with parallelogram; only one diagonal is bisected, highlighting the uniqueness of parallelogram bisection.
## CROSS_SUBJECT_PREREQS
c7_math_ch05_004, c7_math_ch05_007, c7_math_ch09_005
## CROSS_SUBJECT_REASONS
c7_math_ch05_004: Parallel lines definition and properties underpin the angle relationships used in the proof.
c7_math_ch05_007: Corresponding angles (along with alternate interior) provide additional angle equalities for congruence proofs.
c7_math_ch09_005: SSS congruence offers an alternative proof path using the three sides of the triangles formed by the diagonal.
## CHAIN_DESCRIPTION
c8_math_ch4_9 -> c8_math_ch4_10 -> c8_math_ch4_8, c8_math_ch4_3
## THIS_FORMULA
AO = OC and BO = OD (where O is intersection of diagonals AC and BD in parallelogram ABCD)
## FORMULA_VARIABLES
AO = segment from vertex A to intersection O, OC = segment from O to vertex C, BO = segment from B to O, OD = segment from O to D
## FORMULA_UNITS
dimensionless (length units like cm, m apply to the segments)
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c7_math_ch05_004 | Parallel lines and transversals give the angle equalities needed for the congruence proof.
c7_math_ch09_007 | ASA congruence criterion is the key logical step to prove the triangles formed by the diagonal are congruent.
## PREREQ_CONCEPT
Triangle congruence (ASA/SAS/SSS) and properties of parallel lines (alternate interior angles).
## PREREQ_BEFORE
The student must be able to identify alternate interior angles when a transversal cuts parallel lines and state the ASA congruence rule.
## PREREQ_STUCK
Review alternate interior angles (c7_math_ch05_008) and ASA congruence (c7_math_ch09_007) with diagrams.
## WORKED_EXAMPLE_1
PROBLEM: A parallelogram-shaped field ABCD has diagonals AC and BD crossing at point O. The length of diagonal AC is 24 m and diagonal BD is 18 m. Find the lengths of AO, OC, BO, and OD.
STEPS:
- Step 1: Identify the given information: AC = 24 m, BD = 18 m, O is the intersection of diagonals.
- Step 2: Recall the property: In a parallelogram, diagonals bisect each other. So AO = OC and BO = OD.
- Step 3: Compute half of each diagonal: AO = OC = AC / 2 = 24 / 2 = 12 m. BO = OD = BD / 2 = 18 / 2 = 9 m.
- Step 4: Verify: AO + OC = 12 + 12 = 24 m = AC. BO + OD = 9 + 9 = 18 m = BD.
- Step 5: State the answer with units.
REASONING: The bisection property means the intersection point is the midpoint of each diagonal. Therefore each half is exactly half the total diagonal length. This is a direct application of the definition of "bisect".
ANSWER: AO = 12 m, OC = 12 m, BO = 9 m, OD = 9 m
## WORKED_EXAMPLE_2
PROBLEM: In parallelogram PQRS, diagonals PR and QS intersect at T. PT = 2x + 5 cm and TR = 3x - 1 cm. Find x and the length of PR.
STEPS:
- Step 1: Write the bisection property for this parallelogram: PT = TR.
- Step 2: Set up the equation: 2x + 5 = 3x - 1.
- Step 3: Solve for x: subtract 2x from both sides → 5 = x - 1 → add 1 → x = 6.
- Step 4: Find PT and TR: PT = 2(6) + 5 = 17 cm. TR = 3(6) - 1 = 17 cm. Check: they are equal.
- Step 5: Find PR = PT + TR = 17 + 17 = 34 cm.
REASONING: The property gives an equation because the two segments of the same diagonal are equal. Solving the equation yields the unknown variable, which then gives the actual lengths.
ANSWER: x = 6, PR = 34 cm
## WORKED_EXAMPLE_3
PROBLEM: The diagonals of a parallelogram intersect at (3, -2) in the coordinate plane. One vertex is at (7, 1). Find the coordinates of the opposite vertex.
STEPS:
- Step 1: Understand that the intersection point is the midpoint of each diagonal.
- Step 2: Let the opposite vertex be (x, y). The midpoint of the diagonal joining (7, 1) and (x, y) is (3, -2).
- Step 3: Apply midpoint formula: ((7+x)/2, (1+y)/2) = (3, -2).
- Step 4: Set up equations: (7+x)/2 = 3 → 7+x = 6 → x = -1. (1+y)/2 = -2 → 1+y = -4 → y = -5.
- Step 5: Verify: midpoint of (7,1) and (-1,-5) is ((7-1)/2, (1-5)/2) = (3, -2). Correct.
- Step 6: State the opposite vertex coordinates.
REASONING: This problem combines coordinate geometry (midpoint formula) with the parallelogram diagonal bisection property. The intersection point being the midpoint is the key link.
ANSWER: (-1, -5)
## COMPETENCY_QUESTION_1
QUESTION: A student says: "In any parallelogram, the diagonals are equal in length." Is this correct? If not, give a counterexample and state the correct property. How would you convince the student using a diagram and reasoning?
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: Recognize the claim is about diagonal lengths, not bisection.
- Step 2: Recall that diagonals are equal only in rectangles (and squares), not in all parallelograms.
- Step 3: Draw a slanted parallelogram (e.g., sides 5 cm and 8 cm, angle 60°) and measure diagonals to show they are different.
- Step 4: State the correct property: diagonals bisect each other (they share the same midpoint).
- Step 5: Explain that bisection means AO=OC and BO=OD, but AC may not equal BD.
ANSWER: The student is incorrect. Counterexample: a parallelogram that is not a rectangle (e.g., a rhombus that is not a square, or any slanted parallelogram). The correct property is that diagonals bisect each other. In a rectangle, diagonals are equal AND bisect each other; in a general parallelogram, only bisection holds.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Prove that if the diagonals of a quadrilateral bisect each other, then the quadrilateral is a parallelogram. Use a diagram and a step-by-step congruence argument.
COMPETENCY: Translating real-world situations to mathematical expressions (here: geometric reasoning)
STEPS:
- Step 1: Draw quadrilateral ABCD with diagonals AC and BD intersecting at O. Given: AO = OC, BO = OD.
- Step 2: Consider triangles AOB and COD. AO = OC (given), BO = OD (given), ∠AOB = ∠COD (vertically opposite angles).
- Step 3: By SAS, ΔAOB ≅ ΔCOD. Therefore AB = CD and ∠ABO = ∠CDO.
- Step 4: Since ∠ABO = ∠CDO are alternate interior angles, AB || CD.
- Step 5: Similarly, using ΔAOD ≅ ΔCOB, we get AD = BC and AD || BC.
- Step 6: Both pairs of opposite sides are parallel and equal → ABCD is a parallelogram.
ANSWER: The proof uses SAS congruence of triangles formed by the diagonals, then alternate interior angles to establish parallel sides, satisfying the definition of a parallelogram.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: In a ______, the two diagonals intersect at a point that divides each diagonal into two equal segments.

## DIAGNOSTIC_ANSWER_7
parallelogram

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing a rectangular garden bed with a ______-path from corner to corner.

## DIAGNOSTIC_ANSWER_8
cross

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can prove that the diagonals of a parallelogram bisect each other using triangle congruence (ASA or SAS), and can apply this property to find unknown segment lengths in geometric problems involving parallelograms.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are designing a ______ garden bed with a cross-path from corner to corner.

## DIAGNOSTIC_ANSWER_10
rectangular
