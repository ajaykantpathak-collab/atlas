## ELI5
Two pillars stand at A(2, 3, 5) and B(8, 7, 11); a third goes on the line AB extended beyond B, twice as far from A as from B - external division, ratio 2:1. The 3D formula flips the signs: each coordinate reads (mx2 - nx1)/(m - n). The subtraction is the geometry: a point outside the segment carries a directed ratio already turned negative, and m = n would divide by zero.

## DEFINITION
If a point R divides the line segment joining two points P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) externally in the ratio m:n (where m and n are positive real numbers and m ≠ n), then the coordinates of R are given by \(\left( \frac{m x_2 - n x_1}{m - n}, \frac{m y_2 - n y_1}{m - n}, \frac{m z_2 - n z_1}{m - n} \right)\). The point R lies on the line PQ but outside the segment PQ, either beyond P or beyond Q depending on whether m < n or m > n.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly apply the external division formula to find coordinates of a point dividing a line segment externally in a given ratio, distinguish between internal and external division based on the position of the point relative to the segment, and solve problems combining external division with distance formula or midpoint concepts.

## SCOPE_BOUNDARY
Covers external division of a line segment in 3D Cartesian coordinates using the section formula. Does not cover vector methods, parametric equations, or cases where m = n (which would make the denominator zero). Limited to real ratios and real coordinates as per NCERT Class 11 syllabus.

## WALKTHROUGH
Imagine you are designing a 3D model for a school project: two support pillars stand at coordinates A(2, 3, 5) and B(8, 7, 11) in metres. You need to place a third pillar on the line AB extended beyond B such that its distance from A is twice its distance from B. To begin, write down the coordinates of A and B, identify that the point lies outside the segment (external division), and determine the ratio m:n from the given condition (here, distance from A : distance from B = 2:1, so m=2, n=1). Recall the internal division formula from c11_math_cbse_12_003 and note the key change: for external division, the numerator uses subtraction (m x₂ - n x₁) and the denominator is (m - n). Substitute the values carefully, simplify each coordinate, and verify that the resulting point lies beyond B by checking distances. The key insight is that external division flips the sign in the formula because the point is outside the segment, making the directed ratio negative.

Takeaway: mastery means deciding internal versus external from the picture, applying the subtraction formula per coordinate, and verifying the result lands beyond the named endpoint. Exam moves: find-the-external-point questions and combine-with-distance items. Check yourself: verify by distances, not vibes - the computed point must reproduce the stated ratio. Students miss it because they reuse the internal formula and flip one sign by hand, when the definition bakes the direction into every coordinate: all three numerators subtract, and the denominator m - n shortens by the same stroke.

## DIAGNOSTIC_QUESTION_1
State the formula for the coordinates of a point dividing the line segment joining P(x₁, y₁, z₁) and Q(x₂, y₂, z₂) externally in the ratio m:n (m ≠ n).

## DIAGNOSTIC_ANSWER_1
The coordinates are \(\left( \frac{m x_2 - n x_1}{m - n}, \frac{m y_2 - n y_1}{m - n}, \frac{m z_2 - n z_1}{m - n} \right)\). A wrong answer using addition in the numerator (like \(\frac{m x_2 + n x_1}{m + n}\)) reveals confusion with the internal division formula and indicates the student has not grasped the sign change required for external division.

## DIAGNOSTIC_QUESTION_2
Explain why the denominator in the external division formula is (m - n) instead of (m + n) as in internal division.

## DIAGNOSTIC_ANSWER_2
In external division, the point lies outside the segment, so the directed segments PR and RQ have opposite signs. If we use signed distances, the ratio m:n is taken as negative, leading to subtraction in the denominator when converting to positive m,n. A wrong answer like "it's just a different formula" shows the student lacks conceptual understanding of directed ratios and the geometric meaning of external division.

## DIAGNOSTIC_QUESTION_3
Find the coordinates of the point that divides the line segment joining A(1, 2, 3) and B(4, 5, 6) externally in the ratio 2:3.

## DIAGNOSTIC_ANSWER_3
Using the formula with m=2, n=3: x = (2×4 - 3×1)/(2-3) = (8-3)/(-1) = -5; y = (2×5 - 3×2)/(2-3) = (10-6)/(-1) = -4; z = (2×6 - 3×3)/(2-3) = (12-9)/(-1) = -3. The point is R(-5, -4, -3). A wrong answer like (11/5, 16/5, 21/5) results from mistakenly using the internal division formula (m+n in denominator).

## DIAGNOSTIC_QUESTION_4
Given P(2, -1, 3) and Q(5, 2, 6), a point R divides PQ externally in the ratio 3:2. Another point S divides PQ internally in the ratio 3:2. Compare the coordinates of R and S and explain their geometric relationship.

## DIAGNOSTIC_ANSWER_4
R = \(\left( \frac{3×5 - 2×2}{3-2}, \frac{3×2 - 2×(-1)}{3-2}, \frac{3×6 - 2×3}{3-2} \right)\) = (11, 8, 12). S = \(\left( \frac{3×5 + 2×2}{3+2}, \frac{3×2 + 2×(-1)}{3+2}, \frac{3×6 + 2×3}{3+2} \right)\) = (19/5, 4/5, 24/5). R lies beyond Q (since m>n), while S lies between P and Q. The x-coordinate of R (11) is greater than Q's x (5), whereas S's x (3.8) is between P's x (2) and Q's x (5). A wrong answer that does not recognize R is outside the segment indicates a gap in geometric interpretation.

## DIAGNOSTIC_QUESTION_5
A student claims that for external division in ratio m:n, the formula is \(\left( \frac{m x_2 + n x_1}{m+n}, \frac{m y_2 + n y_1}{m+n}, \frac{m z_2 + n z_1}{m+n} \right)\) because "external just means outside". Identify the error and correct it.

## DIAGNOSTIC_ANSWER_5
The error is using the internal division formula. External division requires subtraction in the numerator and (m-n) in the denominator because the ratio of directed segments is negative. The correct formula uses minus signs. A student who does not identify the sign error misunderstands the concept of directed ratios and the algebraic derivation from the section formula.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (using Indian context like distances between cities or coordinates of a building) where you need to find a point that divides a line segment externally in a given ratio. Provide the problem statement and solve it.

## DIAGNOSTIC_ANSWER_6
Example: "Two mobile towers are located at coordinates (10, 20, 30) and (40, 50, 60) in a 3D grid (units in km). A relay station is to be placed on the line extending beyond the second tower such that its distance from the first tower is twice its distance from the second tower. Find its coordinates." Solution: Ratio 2:1 externally. Coordinates = \(\left( \frac{2×40 - 1×10}{2-1}, \frac{2×50 - 1×20}{2-1}, \frac{2×60 - 1×30}{2-1} \right)\) = (70, 80, 90). A poor answer would use internal division or incorrectly assign the ratio, showing inability to translate the word problem into the correct mathematical ratio.

## COMMON_MISCONCEPTION
Students often confuse external division with internal division by using the formula with addition in the numerator and m+n in the denominator even when the problem states "externally". Specifically, they write \(\left( \frac{m x_2 + n x_1}{m+n}, \frac{m y_2 + n y_1}{m+n}, \frac{m z_2 + n z_1}{m+n} \right)\) for external division. This happens because they memorize the internal division formula and forget to change signs for external division. Another frequent error: they assign the ratio incorrectly when the point is closer to one endpoint (e.g., using 3:2 instead of 2:3 when the point is beyond the second point and the given ratio is distance from first point : distance from second point = 3:2).

## ON_FAILURE
If a student uses the internal division formula for external division, first ask them to draw the points on a 1D number line (e.g., P at 2, Q at 8) and mark a point R beyond Q such that PR:QR = 3:1. Derive the 1D external division formula using directed distances: PR = x_R - 2, QR = x_R - 8. Since R is beyond Q, QR is positive but the ratio PR/QR = 3/1 gives x_R - 2 = 3(x_R - 8) → x_R = 11. Show that this matches (3×8 - 1×2)/(3-1) = 11. Then extend to 3D by applying the same logic to each coordinate independently. Practice with 2-3 such 1D examples before returning to 3D problems.

## PREREQUISITE_NODE_IDS
c11_math_cbse_12_001, c11_math_cbse_12_003, c9_math_ch1_7, c10_math_cbse_07_004, c11_math_cbse_12_002, c11_math_cbse_12_004

## PREREQUISITE_REASONS
c11_math_cbse_12_001: Need to understand 3D coordinates to apply the formula.
c11_math_cbse_12_003: Internal division formula is the basis; external division is a variation with sign changes.
c9_math_ch1_7: Section formula in 2D (internal) provides the foundation for 3D extension.
c10_math_cbse_07_004: Reinforces section formula in 2D with more practice and applications.
c11_math_cbse_12_002: External division also relies on distance ratios.  
c11_math_cbse_12_004: Understanding internal division (including midpoint) is necessary before learning external division, as the formulas are structurally similar but with sign differences.  

## FORWARD_NODE_IDS
c11_math_cbse_12_006, c12_math_cbse_10_007

## FORWARD_REASONS
c11_math_cbse_12_006: Applications of 3D coordinate geometry require both internal and external division to solve problems like finding centroids, incenters, or points on extensions of line segments.
c12_math_cbse_10_007: Class 11 3D external section formula — direct prior to vector form.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_phy_cbse_04_002
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: In physics, the section formula is used to find the centre of mass of two particles, where external division can represent a point outside the segment joining them.
c11_physics_ch4_2: In kinematics, relative position vectors often require external division to locate points on extended lines (e.g., point of intersection of trajectories).
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_12_003 -> c11_math_cbse_12_005 -> c11_math_cbse_12_006

## THIS_FORMULA
R(x, y, z) = \(\left( \frac{m x_2 - n x_1}{m - n}, \frac{m y_2 - n y_1}{m - n}, \frac{m z_2 - n z_1}{m - n} \right)\)

## FORMULA_VARIABLES
m, n = positive numbers representing the ratio m:n (m ≠ n); (x₁, y₁, z₁) = coordinates of point P; (x₂, y₂, z₂) = coordinates of point Q; (x, y, z) = coordinates of point R dividing PQ externally in ratio m:n.

## FORMULA_UNITS
Coordinates are in units of length (e.g., metres, cm, km) depending on context; ratio is dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | In physics, the section formula is used to find the centre of mass of two particles, where external division can represent a point outside the segment joining them.
c11_physics_ch4_2 | In kinematics, relative position vectors often require external division to locate points on extended lines (e.g., point of intersection of trajectories).

## PREREQ_CONCEPT
Understanding of internal section formula in 2D and 3D, and the concept of directed line segments (signed ratios).

## PREREQ_BEFORE
Student must be able to apply the internal division formula in 3D and understand the difference between internal and external division geometrically.

## PREREQ_STUCK
If stuck, revisit the internal division formula (c11_math_cbse_12_003) and practice 1D external division on a number line to grasp the sign change.

## WORKED_EXAMPLE_1
PROBLEM: Two drones are flying at positions A(2, 3, 5) and B(8, 7, 11) in a 3D coordinate system (units in metres). A control signal is to be sent from a point C on the line AB extended beyond B such that BC:AC = 1:3 externally. Find the coordinates of C.
STEPS:
- Step 1: Identify given points: A(2,3,5), B(8,7,11). The condition BC:AC = 1:3 means AC:BC = 3:1. Since C is beyond B, it divides AB externally in the ratio m:n = 3:1 (where m corresponds to AC, n to BC).
- Step 2: Write the external division formula: x = (m x₂ - n x₁)/(m - n), y = (m y₂ - n y₁)/(m - n), z = (m z₂ - n z₁)/(m - n). Here m=3, n=1.
- Step 3: Substitute coordinates: x = (3×8 - 1×2)/(3-1) = (24-2)/2 = 11; y = (3×7 - 1×3)/2 = (21-3)/2 = 9; z = (3×11 - 1×5)/2 = (33-5)/2 = 14.
- Step 4: Verify the ratio: Distance AB = √[(6)²+(4)²+(6)²] = √88. Distance BC = √[(3)²+(2)²+(3)²] = √22. Distance AC = √[(9)²+(6)²+(9)²] = √198. Ratio BC:AC = √22:√198 = 1:3. Correct.
- Step 5: Interpret: The control signal point C is at (11, 9, 14) metres.
REASONING: The key is to correctly interpret the given ratio in terms of the external division formula. The formula uses m and n such that the point divides the segment in the ratio m:n externally, meaning the distances from the point to the endpoints are in the ratio m:n. Here we identified m:n = 3:1 from the given BC:AC = 1:3. The subtraction in the formula accounts for the external position.
ANSWER: C(11, 9, 14) metres.

## WORKED_EXAMPLE_2
PROBLEM: In a 3D architectural model, two pillars are located at P(1, 4, 2) and Q(7, 10, 8) (units in metres). A decorative light is to be placed on the line PQ extended beyond P such that its distance from P is half its distance from Q. Find the coordinates of the light.
STEPS:
- Step 1: Identify points: P(1,4,2), Q(7,10,8). The light R is on the extension beyond P, so it divides PQ externally. Given RP = ½ RQ ⇒ RQ = 2 RP. So RP:RQ = 1:2. Thus m=1, n=2 (m corresponds to RP, n to RQ).
- Step 2: External division formula: x = (m x₂ - n x₁)/(m - n). Here m=1, n=2, so denominator = -1.
- Step 3: Substitute: x = (1×7 - 2×1)/(1-2) = (7-2)/(-1) = -5; y = (1×10 - 2×4)/(-1) = (10-8)/(-1) = -2; z = (1×8 - 2×2)/(-1) = (8-4)/(-1) = -4.
- Step 4: Verify: R(-5,-2,-4). Distance RP = √[(-6)²+(-6)²+(-6)²] = √108 = 6√3. Distance RQ = √[(-12)²+(-12)²+(-12)²] = √432 = 12√3. Ratio RP:RQ = 1:2. Correct.
- Step 5: The light is at (-5, -2, -4) metres.
REASONING: When the point is on the extension beyond the first point, the ratio m:n is taken with m corresponding to the distance from the point to the first endpoint. Here m=1, n=2 gives a negative denominator, resulting in coordinates that are beyond P. The formula handles this automatically.
ANSWER: R(-5, -2, -4) metres.

## WORKED_EXAMPLE_3
PROBLEM: A line segment joins points A(3, -2, 5) and B(9, 4, 11). Find the coordinates of the point that divides AB externally in the ratio 5:3. Then, find the distance of this point from the origin.
STEPS:
- Step 1: Identify A(3,-2,5), B(9,4,11). External division ratio m:n = 5:3.
- Step 2: Apply external division formula: x = (5×9 - 3×3)/(5-3) = (45-9)/2 = 18; y = (5×4 - 3×(-2))/2 = (20+6)/2 = 13; z = (5×11 - 3×5)/2 = (55-15)/2 = 20. So R(18,13,20).
- Step 3: Verify external division: Vector AB = (6,6,6). Vector AR = (15,15,15) = 2.5 × AB, so R is beyond B. Ratio AR:BR = 15√3 : 9√3 = 5:3. Correct.
- Step 4: Find distance from origin O(0,0,0): OR = √(18²+13²+20²) = √(324+169+400) = √893.
- Step 5: Simplify √893. 893 = 19×47, so distance = √893 units.
- Step 6: Interpret: The point is at (18,13,20) and its distance from origin is √893 units.
REASONING: This example combines external division with the distance formula in 3D (from c11_math_cbse_12_002). The external division formula gives coordinates, then the distance formula is used. This shows how concepts from sibling nodes integrate.
ANSWER: Point R(18, 13, 20); distance from origin = √893 units.

## COMPETENCY_QUESTION_1
QUESTION: A student is given points P(2, 1, 3) and Q(6, 5, 7). She is asked to find the point that divides PQ externally in the ratio 2:1. She writes the coordinates as ( (2×6+1×2)/(2+1), (2×5+1×1)/(2+1), (2×7+1×3)/(2+1) ) = (14/3, 11/3, 17/3). Identify the error in her solution, explain why it is wrong, and provide the correct coordinates.
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Recognize that the student used the internal division formula (addition in numerator, sum in denominator) instead of the external division formula.
- Step 2: Explain that for external division, the formula uses subtraction: (m x₂ - n x₁)/(m - n), etc.
- Step 3: Apply the correct formula with m=2, n=1: x = (2×6 - 1×2)/(2-1) = (12-2)/1 = 10; y = (2×5 - 1×1)/1 = 9; z = (2×7 - 1×3)/1 = 11.
- Step 4: Verify that the correct point (10,9,11) lies beyond Q (since m>n) and distances are in ratio 2:1.
ANSWER: The error is using internal division formula. Correct coordinates are (10, 9, 11).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a 3D coordinate system (units in km), two satellites are at S₁(100, 200, 300) and S₂(400, 500, 600). A signal relay station R is to be placed on the line S₁S₂ extended beyond S₂ such that the distance from S₁ to R is three times the distance from S₂ to R. Find the coordinates of R. Then, determine if R is closer to the origin than S₂.
COMPETENCY: Translating real-world situations to mathematical expressions and comparing results
STEPS:
- Step 1: Understand the problem: R divides S₁S₂ externally. Distance S₁R = 3 × S₂R ⇒ S₁R:S₂R = 3:1. So m=3, n=1.
- Step 2: Apply external division formula: x = (3×400 - 1×100)/(3-1) = (1200-100)/2 = 550; y = (3×500 - 1×200)/2 = (1500-200)/2 = 650; z = (3×600 - 1×300)/2 = (1800-300)/2 = 750. So R(550, 650, 750).
- Step 3: Find distance of R from origin: OR = √(550²+650²+750²) = √(302500+422500+562500) = √1,287,500 ≈ 1134.7 km.
- Step 4: Find distance of S₂ from origin: OS₂ = √(400²+500²+600²) = √(160000+250000+360000) = √770,000 ≈ 877.5 km.
- Step 5: Compare: OR > OS₂, so R is farther from origin than S₂.
ANSWER: R(550, 650, 750) km; R is farther from origin than S₂.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The point R lies on the line PQ but outside the segment PQ, either beyond P or beyond Q ______ on whether m < n or m > n.

## DIAGNOSTIC_ANSWER_7
depending

**A wrong answer ("deciding" or "judging") reveals the student has paraphrased the definition's participle - the point lies beyond P or beyond Q depending on whether m < n or m > n.** Depending is the definition's own participle, and the participle is what the blank grades. Recall the two outside positions before filling, and give the participle exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing a 3D model for a school project: two support pillars stand at ______ A(2, 3, 5) and B(8, 7, 11) in metres.

## DIAGNOSTIC_ANSWER_8
coordinates

**A wrong answer ("spots" or "positions") reveals the student has swapped the walkthrough's noun - the two support pillars stand at coordinates A(2, 3, 5) and B(8, 7, 11).** Coordinates is the walkthrough's own noun, and the noun is what the blank grades. Recall the beyond-B placement before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly apply the external division formula to find coordinates of a point dividing a line segment externally in a given ratio, distinguish between internal and external division based on the position of the point relative to the segment, and solve problems combining external division with distance formula or midpoint.
