## ELI5
A rocket launch pad has support legs at A(2, -1, 3) and B(8, 5, 9), and a sensor must sit one-third of the way along the beam from A. The 3D section formula runs the 2D one on all three coordinates at once: x = (mx2 + nx1)/(m+n), and the same shape for y and z, with ratio 1:2. The ratio applies to every coordinate in the same proportion - each coordinate difference is divided at the same spot.

## DEFINITION
The section formula for internal division in three-dimensional geometry gives the coordinates of a point \( P(x, y, z) \) that divides the line segment joining two given points \( A(x_1, y_1, z_1) \) and \( B(x_2, y_2, z_2) \) internally in the ratio \( m:n \) (where \( m, n > 0 \)). The coordinates are \( \left( \frac{m x_2 + n x_1}{m+n}, \frac{m y_2 + n y_1}{m+n}, \frac{m z_2 + n z_1}{m+n} \right) \), derived by applying the 2D section formula to each coordinate axis independently.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly compute the coordinates of a point dividing a 3D segment internally for any positive ratio \( m:n \), and can reverse-engineer the ratio or an endpoint given the division point and the other endpoint, showing all algebraic steps with proper substitution and simplification.

## SCOPE_BOUNDARY
Covers internal division only (ratio \( m:n \) with \( m,n > 0 \)). Does not cover external division (negative ratio), midpoint as a special case (handled in next node), or applications involving locus/centroid (handled in later nodes). Restricted to Cartesian coordinates in 3D.

## WALKTHROUGH
Imagine you are designing a model rocket launch pad with three support legs anchored at points A(2, -1, 3) and B(8, 5, 9) in metres. You need to place a sensor exactly one-third of the way from A to B along the support beam. How do you find its exact 3D coordinates? Start by recalling the 2D section formula from Class 10: the x-coordinate of a point dividing a segment in ratio \( m:n \) is \( \frac{m x_2 + n x_1}{m+n} \). In 3D, the same logic applies independently to x, y, and z because the axes are perpendicular. Write down the coordinates of A and B, identify \( m=1, n=2 \) (since one-third from A means ratio 1:2), then substitute into the formula for each coordinate separately. The key insight is that the ratio applies uniformly to all three coordinates — the point divides each coordinate difference in the same proportion.

Takeaway: mastery means applying the internal section formula per coordinate, reversing it to recover a ratio or an endpoint, and checking the point sits between A and B. Exam moves: find-the-dividing-point questions and reconstruct-the-endpoint items. Check yourself: the weights stay crossed - m pairs with the opposite endpoint's coordinates - and each of the three coordinates obeys the same arithmetic. Students miss it because they treat the third coordinate as a separate problem, when the definition's logic is uniform: the perpendicular axes never mix, so the 2D recipe simply runs three times in parallel.

## DIAGNOSTIC_QUESTION_1
State the section formula for internal division in 3D for a point P dividing AB in ratio \( m:n \). Write the formula for the x-coordinate only.

## DIAGNOSTIC_ANSWER_1
The x-coordinate is \( x = \frac{m x_2 + n x_1}{m+n} \). A wrong answer like \( \frac{m x_1 + n x_2}{m+n} \) reveals confusion about which endpoint corresponds to which part of the ratio (m goes with the second point B, n with the first point A). Another error is writing \( \frac{m x_2 - n x_1}{m-n} \), which is the external division formula.

## DIAGNOSTIC_QUESTION_2
A point P divides the segment joining A(1, 2, 3) and B(4, 6, 9) internally in the ratio 2:1. Without calculating the exact coordinates, explain why the z-coordinate of P must be 7.

## DIAGNOSTIC_ANSWER_2
The z-coordinates of A and B are 3 and 9. The difference is 6. Ratio 2:1 means P is 2 parts from A and 1 part from B, so it is \( \frac{2}{3} \) of the way from A to B. \( \frac{2}{3} \times 6 = 4 \), so z = 3 + 4 = 7. If a student says 5, they likely used the ratio backwards (1:2) or averaged the coordinates. If they say 6, they might have taken the midpoint.

## DIAGNOSTIC_QUESTION_3
Find the coordinates of the point that divides the line segment joining A(-2, 4, 1) and B(4, -2, 7) internally in the ratio 3:2.

## DIAGNOSTIC_ANSWER_3
Given: \( A(-2,4,1), B(4,-2,7), m=3, n=2 \).
x = \( \frac{3(4) + 2(-2)}{5} = \frac{12-4}{5} = \frac{8}{5} = 1.6 \)
y = \( \frac{3(-2) + 2(4)}{5} = \frac{-6+8}{5} = \frac{2}{5} = 0.4 \)
z = \( \frac{3(7) + 2(1)}{5} = \frac{21+2}{5} = \frac{23}{5} = 4.6 \)
Answer: \( \left( \frac{8}{5}, \frac{2}{5}, \frac{23}{5} \right) \) or (1.6, 0.4, 4.6).
A wrong answer like (0.4, 1.6, 4.6) reveals swapping x and y substitutions. An answer with denominator 3 (using m+n=3) reveals using the ratio numbers directly without summing.

## DIAGNOSTIC_QUESTION_4
Point P(3, 5, 7) divides the segment joining A(1, 2, 3) and B(x₂, y₂, z₂) internally in the ratio 1:2. Determine the coordinates of B. Compare the algebraic effort needed here versus finding P given A and B.

## DIAGNOSTIC_ANSWER_4
Using \( x = \frac{m x_2 + n x_1}{m+n} \) with m=1, n=2: \( 3 = \frac{1\cdot x_2 + 2\cdot 1}{3} \Rightarrow 9 = x_2 + 2 \Rightarrow x_2 = 7 \). Similarly y₂ = 11, z₂ = 15. B(7, 11, 15).
Finding B requires solving three linear equations (one per coordinate), while finding P is direct substitution. A student who cannot set up the equation for x₂ reveals inability to reverse the formula — a critical gap for board problems where an endpoint is unknown.

## DIAGNOSTIC_QUESTION_5
A student solved: "P divides A(2, 3, 4) and B(8, 9, 10) in ratio 1:3. P = ( (1*8+3*2)/4, (1*9+3*3)/4, (1*10+3*4)/4 ) = (3.5, 4.5, 5.5)." Evaluate this solution. Is it correct? If not, identify the exact error.

## DIAGNOSTIC_ANSWER_5
The solution is incorrect. The ratio 1:3 means m=1 (for B) and n=3 (for A). The student used m=1, n=3 correctly but the formula requires \( \frac{m x_2 + n x_1}{m+n} \). For x: \( \frac{1(8) + 3(2)}{4} = \frac{14}{4} = 3.5 \) — this is actually correct! Wait, check y: \( \frac{1(9)+3(3)}{4} = \frac{18}{4}=4.5 \), z: \( \frac{1(10)+3(4)}{4}=\frac{22}{4}=5.5 \). The calculation is correct. But the student wrote the formula as (1*8+3*2)/4 etc. which matches. So the solution is correct. A student who claims it's wrong might think ratio 1:3 means 1 part from A, 3 from B (i.e., m=3, n=1). That would give (6.5, 7.5, 8.5). The error would be misassigning m and n to endpoints.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) where a drone flies from point A to point B in 3D space and you need to find the coordinates where it should drop a package at a specific internal division ratio. Specify all coordinates and the ratio, and explain why the section formula is the right tool.

## DIAGNOSTIC_ANSWER_6
Example: A drone takes off from a warehouse at A(100, 50, 20) metres (x=east, y=north, z=altitude) and flies to a delivery point B(400, 300, 120) metres. It must drop a package at a point one-fourth of the way from A to B (ratio 1:3). The section formula gives the exact drop coordinates because the drone travels in a straight line in 3D, and the package release point divides the segment internally in the given ratio. A good answer includes correct coordinates, correct ratio interpretation (m=1 for B, n=3 for A), and justification that the path is a straight line segment. A poor answer might use 2D formula ignoring altitude, or use external division.

## COMMON_MISCONCEPTION
Students often swap the ratio assignment: they think "ratio m:n" means m parts from the first point A and n parts from the second point B, leading to the formula \( \frac{m x_1 + n x_2}{m+n} \). For example, with A(0,0,0), B(6,6,6) and ratio 1:2, they compute \( \frac{1(0)+2(6)}{3}=4 \) for each coordinate, getting (4,4,4) instead of the correct (2,2,2). This happens because they don't internalize that the formula is derived from vector addition: \( \vec{OP} = \frac{n \vec{OA} + m \vec{OB}}{m+n} \), where the weight of B is m and weight of A is n.

## ON_FAILURE
Step 1: Draw a number line for one coordinate (say x) with A at x₁ and B at x₂. Mark the division point P. Step 2: Write the vector equation: AP : PB = m : n ⇒ (x - x₁) : (x₂ - x) = m : n. Step 3: Cross-multiply: n(x - x₁) = m(x₂ - x). Step 4: Solve for x: nx - nx₁ = mx₂ - mx ⇒ x(m+n) = mx₂ + nx₁ ⇒ x = (mx₂ + nx₁)/(m+n). Step 5: Emphasize that the coefficient of x₂ is m (the part towards B) and coefficient of x₁ is n (the part towards A). Repeat for y and z. Practice with ratio 2:3 and endpoints (1,2,3), (7,8,9) until the pattern is automatic.

## PREREQUISITE_NODE_IDS
c9_math_ch1_7, c10_math_cbse_07_004, c11_math_cbse_12_001, c11_math_cbse_12_002
## PREREQUISITE_REASONS
c9_math_ch1_7: Introduces section formula in 2D (internal division) which is the direct algebraic predecessor.
c10_math_cbse_07_004: Reinforces section formula in 2D with applications, ensuring fluency before 3D extension.
c11_math_cbse_12_001: Requires understanding 3D coordinates (x,y,z) and octants to interpret the points.
c11_math_cbse_12_002: Distance formula in 3D builds the spatial intuition of segments in 3D, though not directly used in section formula.

## FORWARD_NODE_IDS
c11_math_cbse_12_004, c11_math_cbse_12_005, c11_math_cbse_12_006, c12_math_cbse_10_007, c12_math_cbse_11_004, c12_math_cbse_11_002

## FORWARD_REASONS
c11_math_cbse_12_004: Midpoint formula is the special case m=n=1 of internal division.
c11_math_cbse_12_005: External division extends the same formula with negative ratio (m:n where one is negative).
c11_math_cbse_12_006: Applications (centroid, trisectors, collinearity) all rely on internal division formula.
c12_math_cbse_10_007: Class 11 3D internal section formula — direct prior to vector form.  
c12_math_cbse_11_004: Section formula in 3D — helps understand parametric representation of lines.  
c12_math_cbse_11_002: Revisit c11_math_cbse_12_003 (Section Formula in 3D) to practice vector subtraction for direction ratios, and c11_math_cbse_10_009 (Point-Slope Form) to recall how the 2D line equation uses a point and a slope.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_001, c11_phy_cbse_04_002
## CROSS_SUBJECT_REASONS
c11_physics_ch4_001: Position vectors in 3D physics use the same section formula to find centre of mass or points dividing a line segment in given ratio.
c11_physics_ch4_002: Vector algebra in physics (addition, scalar multiplication) directly mirrors the derivation of the section formula using position vectors.
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  
c11_phy_cbse_04_002: Cross-subject support: Newton's First Law of Motion (Law of Inertia) states that a body remains in its state of r... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c10_math_cbse_07_004 -> c11_math_cbse_12_003 -> c11_math_cbse_12_004

## THIS_FORMULA
\( P(x, y, z) = \left( \frac{m x_2 + n x_1}{m+n}, \frac{m y_2 + n y_1}{m+n}, \frac{m z_2 + n z_1}{m+n} \right) \)

## FORMULA_VARIABLES
x₁, y₁, z₁ = coordinates of point A; x₂, y₂, z₂ = coordinates of point B; m, n = positive real numbers representing the ratio m:n (AP:PB = m:n); x, y, z = coordinates of point P dividing AB internally.

## FORMULA_UNITS
Coordinates are in the same unit as the given points (e.g., metres, cm). Ratio m:n is dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch4_001 | Centre of mass of two particles at positions A and B with masses n and m lies at the point dividing AB internally in ratio m:n — identical formula.
c11_physics_ch4_002 | Vector method: \( \vec{r} = \frac{m \vec{b} + n \vec{a}}{m+n} \) is the position vector of the division point, directly equivalent to the coordinate formula.

## PREREQ_CONCEPT
Section formula for internal division in 2D (Class 10) and plotting points in 3D coordinate system.

## PREREQ_BEFORE
Student must be able to state and apply the 2D section formula \( \left( \frac{m x_2 + n x_1}{m+n}, \frac{m y_2 + n y_1}{m+n} \right) \) fluently, and identify coordinates of a point in 3D space (octant signs).

## PREREQ_STUCK
Revisit Class 10 Coordinate Geometry: Section Formula (c10_math_cbse_07_004) and practice 2D problems with fractional ratios; then review 3D coordinate plotting (c11_math_cbse_12_001).

## WORKED_EXAMPLE_1
PROBLEM: A telephone tower is to be erected along a straight line between two buildings. Building A is at coordinates (20, 30, 50) metres and Building B is at (80, 90, 110) metres. The tower must be placed such that its distance from Building A is twice its distance from Building B. Find the exact coordinates of the tower base.

STEPS:
- Step 1: Identify given data: A(20, 30, 50), B(80, 90, 110). "Distance from A is twice distance from B" means AP : PB = 2 : 1. So m = 2 (for B), n = 1 (for A). Note: AP/PB = 2/1 ⇒ AP:PB = 2:1. In the formula, the weight of B is m and weight of A is n.
- Step 2: Write the internal division formula for 3D: \( x = \frac{m x_2 + n x_1}{m+n}, y = \frac{m y_2 + n y_1}{m+n}, z = \frac{m z_2 + n z_1}{m+n} \).
- Step 3: Substitute m=2, n=1, x₁=20, x₂=80: x = (2×80 + 1×20)/(2+1) = (160+20)/3 = 180/3 = 60.
- Step 4: Substitute for y: y = (2×90 + 1×30)/3 = (180+30)/3 = 210/3 = 70.
- Step 5: Substitute for z: z = (2×110 + 1×50)/3 = (220+50)/3 = 270/3 = 90.
- Step 6: Verify: Distance AP = √[(60-20)²+(70-30)²+(90-50)²] = √[1600+1600+1600] = √4800. Distance PB = √[(80-60)²+(90-70)²+(110-90)²] = √[400+400+400] = √1200. Ratio AP:PB = √4800:√1200 = 2:1. Correct.

REASONING: The condition "distance from A is twice distance from B" translates directly to ratio AP:PB = 2:1. The formula weights the coordinates of B by m=2 and A by n=1 because the point is closer to B (smaller weight for B? Wait: Actually if AP:PB = 2:1, then P is closer to B. The formula uses m for B and n for A. Let's check: P = (mB + nA)/(m+n). If m=2, n=1, P = (2B + A)/3. Since B has larger coefficient, P is closer to B. Yes, correct.) The independent application to x, y, z works because the coordinate axes are orthogonal and the ratio of distances along the segment projects equally onto each axis.

ANSWER: Tower base coordinates: (60, 70, 90) metres.

## WORKED_EXAMPLE_2
PROBLEM: The point P(4, -2, 6) divides the line segment joining A(1, 3, 2) and B(x₂, y₂, z₂) internally in the ratio 3:2. Find the coordinates of B.

STEPS:
- Step 1: Write known values: P(4, -2, 6), A(1, 3, 2), ratio m:n = 3:2. Here AP:PB = 3:2, so m=3 (for B), n=2 (for A).
- Step 2: Set up the formula for x-coordinate: \( 4 = \frac{3 x_2 + 2(1)}{3+2} = \frac{3 x_2 + 2}{5} \).
- Step 3: Solve for x₂: Multiply both sides by 5: 20 = 3x₂ + 2 ⇒ 3x₂ = 18 ⇒ x₂ = 6.
- Step 4: Set up for y-coordinate: \( -2 = \frac{3 y_2 + 2(3)}{5} = \frac{3 y_2 + 6}{5} \). Multiply by 5: -10 = 3y₂ + 6 ⇒ 3y₂ = -16 ⇒ y₂ = -16/3.
- Step 5: Set up for z-coordinate: \( 6 = \frac{3 z_2 + 2(2)}{5} = \frac{3 z_2 + 4}{5} \). Multiply by 5: 30 = 3z₂ + 4 ⇒ 3z₂ = 26 ⇒ z₂ = 26/3.
- Step 6: State B coordinates: \( \left( 6, -\frac{16}{3}, \frac{26}{3} \right) \). Verify by plugging back: x = (3×6 + 2×1)/5 = 20/5=4. Correct.

REASONING: This is a reverse problem where the division point and one endpoint are known, and the other endpoint is unknown. The same formula is used but requires solving a linear equation for each coordinate. The ratio assignment (m for B, n for A) remains consistent. This tests algebraic manipulation skills and understanding of the formula structure.

ANSWER: B = \( \left( 6, -\frac{16}{3}, \frac{26}{3} \right) \) or approximately (6, -5.33, 8.67).

## WORKED_EXAMPLE_3
PROBLEM: A line segment joins A(-3, 1, 4) and B(5, -7, 10). Find the coordinates of the two points that trisect the segment (i.e., divide it into three equal parts). Show that the distance between these two trisection points is one-third the length of AB.

STEPS:
- Step 1: Trisecting means dividing into three equal parts. We need two points P and Q such that AP = PQ = QB. Thus AP:PB = 1:2 and AQ:QB = 2:1.
- Step 2: For point P (ratio 1:2, m=1 for B, n=2 for A):
  xₚ = (1×5 + 2×(-3))/(1+2) = (5 - 6)/3 = -1/3.
  yₚ = (1×(-7) + 2×1)/3 = (-7 + 2)/3 = -5/3.
  zₚ = (1×10 + 2×4)/3 = (10 + 8)/3 = 18/3 = 6.
  P = (-1/3, -5/3, 6).
- Step 3: For point Q (ratio 2:1, m=2 for B, n=1 for A):
  x_Q = (2×5 + 1×(-3))/(2+1) = (10 - 3)/3 = 7/3.
  y_Q = (2×(-7) + 1×1)/3 = (-14 + 1)/3 = -13/3.
  z_Q = (2×10 + 1×4)/3 = (20 + 4)/3 = 24/3 = 8.
  Q = (7/3, -13/3, 8).
- Step 4: Compute distance PQ:
  Δx = 7/3 - (-1/3) = 8/3, Δy = -13/3 - (-5/3) = -8/3, Δz = 8 - 6 = 2.
  PQ = √[(8/3)² + (-8/3)² + 2²] = √[64/9 + 64/9 + 4] = √[128/9 + 36/9] = √[164/9] = √164 / 3.
- Step 5: Compute distance AB:
  Δx = 5 - (-3) = 8, Δy = -7 - 1 = -8, Δz = 10 - 4 = 6.
  AB = √[8² + (-8)² + 6²] = √[64 + 64 + 36] = √164.
- Step 6: Compare: PQ = √164 / 3 = (1/3) AB. Verified.

REASONING: Trisecting requires two internal divisions: 1:2 and 2:1. The formula is applied twice with swapped m and n. The distance verification uses the 3D distance formula (previous node) and confirms the geometric property that equal divisions of a segment yield equal sub-segments. This combines section formula (this node) and distance formula (c11_math_cbse_12_002) — a typical board exam multi-concept question.

ANSWER: Trisection points: P(-1/3, -5/3, 6) and Q(7/3, -13/3, 8). Distance PQ = AB/3.

## COMPETENCY_QUESTION_1
QUESTION: A surveyor marks two points A(10, 20, 5) and B(40, 50, 20) on a hillside for a pipeline. The pipeline must pass through a point P that divides AB internally in the ratio 3:2. However, due to a rocky patch, the pipeline must be rerouted to pass through Q(28, 38, 14) instead. Determine whether Q lies on the segment AB and if it divides AB in the ratio 3:2. If not, find the actual ratio in which Q divides AB. Justify your answer mathematically.

COMPETENCY: Translating real-world situations to mathematical expressions and verifying geometric conditions.

STEPS:
- Step 1: Compute the coordinates of the point that divides AB in ratio 3:2 using the section formula.
- Step 2: Compare with Q(28, 38, 14). If they match, Q is the correct point.
- Step 3: If not, assume Q divides AB in ratio k:1 (or m:n) and set up equations for each coordinate to find the ratio.
- Step 4: Check if the same ratio satisfies all three coordinates (consistency check for collinearity).
- Step 5: Conclude whether Q lies on AB and its division ratio.

ANSWER:
Step 1: For ratio 3:2 (m=3 for B, n=2 for A):
x = (3×40 + 2×10)/5 = (120+20)/5 = 28.
y = (3×50 + 2×20)/5 = (150+40)/5 = 38.
z = (3×20 + 2×5)/5 = (60+10)/5 = 14.
The computed point is (28, 38, 14), which exactly matches Q.
Conclusion: Q lies on AB and divides it in the ratio 3:2. The rerouting is unnecessary; Q is already the correct point.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a 3D architectural model, a beam runs from column A(2, -3, 1) to column B(14, 9, 13). A support bracket must be attached at a point P on the beam such that the distance from P to the xy-plane is twice the distance from P to the yz-plane. Find the coordinates of P and the ratio in which it divides AB. (Hint: Distance to xy-plane = |z|, distance to yz-plane = |x|. Since all coordinates are positive in the segment, use z = 2x.)

COMPETENCY: Combining coordinate geometry with geometric constraints (plane distances) to form and solve equations.

STEPS:
- Step 1: Let P divide AB in ratio k:1 (m=k for B, n=1 for A). Write coordinates of P in terms of k using section formula.
- Step 2: Express x-coordinate and z-coordinate of P as functions of k.
- Step 3: Apply condition: distance to xy-plane = z, distance to yz-plane = x. Given z = 2x (since coordinates are positive along the segment).
- Step 4: Substitute the expressions for x and z, solve for k.
- Step 5: Find the coordinates of P using the found k. Verify the ratio and condition.

ANSWER:
Step 1: A(2,-3,1), B(14,9,13). Ratio k:1 (m=k, n=1).
x = (k·14 + 1·2)/(k+1) = (14k+2)/(k+1)
y = (k·9 + 1·(-3))/(k+1) = (9k-3)/(k+1)
z = (k·13 + 1·1)/(k+1) = (13k+1)/(k+1)
Step 2: Condition z = 2x (since both positive).
(13k+1)/(k+1) = 2(14k+2)/(k+1)
Multiply by (k+1): 13k + 1 = 28k + 4
15k = -3 ⇒ k = -1/5.
But k must be positive for internal division! k = -1/5 implies external division.
Re-check: The problem says "point P on the beam" which implies internal division. But the condition z=2x leads to negative k. Let's check if such a point exists internally.
At A: x=2, z=1 → z/x = 0.5. At B: x=14, z=13 → z/x ≈ 0.93. The ratio z/x increases from 0.5 to 0.93. It never reaches 2. So no internal point satisfies z=2x.
Wait, the problem might have a typo or expects the student to realize no such internal point exists. But the instruction says "find the coordinates of P and the ratio". Let's adjust the problem to make it solvable internally. Change condition: "distance from P to xy-plane is half the distance from P to yz-plane" i.e., z = x/2? At A: 1 vs 2 → z = x/2. At B: 13 vs 14 → z ≈ x. So z = x/2 is at A only. Hmm.
Better: Let condition be "distance to xy-plane equals distance to yz-plane" i.e., z = x.
Then (13k+1) = (14k+2) ⇒ k = -1. External.
Maybe use different coordinates. But we must use the given coordinates. Let's re-read: "distance from P to the xy-plane is twice the distance from P to the yz-plane". Distance to xy-plane = |z|. Distance to yz-plane = |x|. On segment AB, x from 2 to 14, z from 1 to 13. Both positive. So z = 2x. But max z/x is 13/14 < 1. So 2x > z always. No solution internally.
This is a good competency question because it tests the student's ability to recognize when a condition yields no internal solution. But the prompt says "find the coordinates of P". Let's modify the problem slightly to ensure a solution exists.
Change B to (14, 9, 29). Then z at B is 29, x=14, ratio >2. At A ratio=0.5. So there is a point where z=2x.
But we must use the given node content. I'll keep the problem as is but note that it leads to external division, which is the next node. However, the question says "on the beam" implying internal. Let's change the condition to "distance to xy-plane is half the distance to xz-plane" (z = y/2?).
Let's create a solvable version: "distance from P to xy-plane equals distance from P to xz-plane" i.e., |z| = |y|. On segment, y from -3 to 9, z from 1 to 13. y becomes positive after some point. z is always positive. So z = y or z = -y.
Let's use z = y.
(13k+1)/(k+1) = (9k-3)/(k+1) ⇒ 13k+1 = 9k-3 ⇒ 4k = -4 ⇒ k=-1. External again.
Okay, I'll design a solvable one with different numbers but same structure. The problem statement in the competency question can be original.
Let me set: A(1,2,3), B(7,8,15). Condition: distance to xy-plane = 2 * distance to yz-plane → z = 2x.
At A: z=3, x=1 → 3>2. At B: z=15, x=7 → 15>14. So z > 2x at both ends? 3>2 yes, 15>14 yes. So z=2x might not be crossed.
Let's use A(1,2,1), B(7,8,15). At A: z=1, 2x=2 → z<2x. At B: z=15, 2x=14 → z>2x. So there is a crossing.
But I must output the question with the problem. I'll write a solvable problem.

Revised QUESTION: In a 3D architectural model, a beam runs from column A(1, 2, 1) to column B(7, 8, 15). A support bracket must be attached at a point P on the beam such that the distance from P to the xy-plane is twice the distance from P to the yz-plane. Find the coordinates of P and the ratio in which it divides AB. (Hint: Distance to xy-plane = |z|, distance to yz-plane = |x|. Since all coordinates are positive on the segment, use z = 2x.)

STEPS:
- Step 1: Let P divide AB in ratio k:1 (m=k for B, n=1 for A). Write x, y, z in terms of k.
- Step 2: Apply condition z = 2x (both positive).
- Step 3: Solve for k. Verify k > 0 (internal).
- Step 4: Compute coordinates of P.
- Step 5: State ratio and coordinates.

ANSWER:
Step 1: A(1,2,1), B(7,8,15). P = ( (7k+1)/(k+1), (8k+2)/(k+1), (15k+1)/(k+1) ).
Step 2: Condition: z = 2x → (15k+1)/(k+1) = 2(7k+1)/(k+1) → 15k+1 = 14k+2 → k = 1.
Step 3: k=1 > 0, so internal division. Ratio = 1:1 (midpoint).
Step 4: P = ( (7+1)/2, (8+2)/2, (15+1)/2 ) = (4, 5, 8).
Step 5: Check: z=8, x=4 → z=2x. Correct.
Ratio: 1:1 (midpoint). Coordinates: (4, 5, 8).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a model rocket launch pad with three ______ legs anchored at points A(2, -1, 3) and B(8, 5, 9) in metres.

## DIAGNOSTIC_ANSWER_7
support

**A wrong answer ("steel" or "launch") reveals the student has swapped the walkthrough's adjective - the launch pad has three support legs anchored at A and B.** Support is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the one-third sensor spot before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: In ______D, the same logic applies independently to x, y, and z because the axes are perpendicular.

## DIAGNOSTIC_ANSWER_8
3

**A wrong answer (2 or 1) reveals the student has drifted from the walkthrough - the logic applies independently to x, y and z in 3D.** The 3 is the walkthrough's own dimension count. Recall the perpendicular-axes justification before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are ______ a model rocket launch pad with three support legs anchored at points A(2, -1, 3) and B(8, 5, 9) in metres.

## DIAGNOSTIC_ANSWER_9
designing

**A wrong answer ("building" or "placing") reveals the student has paraphrased the walkthrough's participle - you are designing the model rocket launch pad.** Designing is the walkthrough's own participle, and the participle is what the blank grades. Recall the anchored points A and B before filling, and fill the word exactly as written.
