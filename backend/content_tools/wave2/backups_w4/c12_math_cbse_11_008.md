## ELI5
A ventilation pipe must clear a sloping roof: how close do they come? The point-to-plane distance is one substitution - the plane's left side evaluated at the point, absolute value taken, divided by the normal's magnitude. Zero distance certifies the point lies in the plane; the same formula, applied between parallel planes via a point from one, measures their gap. The perpendicular is the shortest route, and the formula is its length.

## DEFINITION
The distance of a point \( P(x_1, y_1, z_1) \) from a plane \( Ax + By + Cz + D = 0 \) is the length of the perpendicular segment from the point to the plane, given by the absolute value of the expression \( \frac{Ax_1 + By_1 + Cz_1 + D}{\sqrt{A^2 + B^2 + C^2}} \). In vector form, if the plane is \( \vec{r} \cdot \vec{n} = d \) (where \( \vec{n} \) is a normal vector) and the point has position vector \( \vec{a} \), the distance is \( \frac{|\vec{a} \cdot \vec{n} - d|}{|\vec{n}|} \).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the perpendicular distance from a point to a plane given in Cartesian or vector form, can determine whether a point lies on the plane (distance = 0), and can apply the formula to solve problems involving distances between parallel planes or the distance of a point from a plane determined by three non-collinear points.

## SCOPE_BOUNDARY
This node covers the derivation and application of the point-to-plane distance formula in both Cartesian and vector forms, including the case of parallel planes and the distance of a point from a plane defined by three points. It does NOT cover the angle between a line and a plane, the angle between two planes, or the shortest distance between skew lines (those are separate nodes).

## WALKTHROUGH
Imagine you are designing a roof for a house in Bengaluru and need to know how far a ventilation pipe (point) is from the sloping roof surface (plane). You have the roof's equation from its three corners and the pipe's coordinates. Start by writing the plane equation in the form \( Ax + By + Cz + D = 0 \) (using the normal vector from two direction vectors on the plane). Then substitute the point's coordinates into the numerator \( |Ax_1 + By_1 + Cz_1 + D| \). Compute the denominator \( \sqrt{A^2 + B^2 + C^2} \). The ratio gives the perpendicular distance. This builds directly on the normal form of a plane (c12_math_cbse_11_006) and the distance formula in 3D (c11_math_cbse_12_002).

Takeaway first: distance equals the point's signed membership value normalised by the normal's magnitude - a formula that doubles as the on-plane test and, via any point, the parallel-planes gap. Exam moves: computation questions in Cartesian and vector forms, on-plane questions with zero distances, and parallel-plane questions reusing a point from one plane. Method: rerun the roof - plane from its corners, pipe's coordinates substituted, numerator absolute-valued, denominator from the normal's components. Check yourself: the plane must first be written with all terms on one side; a missing constant D silently shifts every distance the formula reports. Drill: compute one point-to-plane distance and one parallel-plane gap, verifying the first point lies on its plane.

## DIAGNOSTIC_QUESTION_1
State the formula for the distance of a point \( P(x_1, y_1, z_1) \) from the plane \( Ax + By + Cz + D = 0 \). What does each symbol represent?

## DIAGNOSTIC_ANSWER_1
The distance is \( \frac{|Ax_1 + By_1 + Cz_1 + D|}{\sqrt{A^2 + B^2 + C^2}} \). Here \( A, B, C \) are the direction ratios of the normal to the plane, \( D \) is the constant term, and \( (x_1, y_1, z_1) \) are the coordinates of the point. A wrong answer (e.g., missing the absolute value or the square root) reveals that the student has memorised the formula without understanding the geometric meaning of the normal vector's magnitude.

## DIAGNOSTIC_QUESTION_2
A plane is given by \( \vec{r} \cdot (2\hat{i} - 3\hat{j} + 6\hat{k}) = 10 \). The point \( P \) has position vector \( \vec{a} = \hat{i} + 2\hat{j} - \hat{k} \). Without calculating the final number, explain why the distance formula uses \( |\vec{a} \cdot \vec{n} - d| \) in the numerator and \( |\vec{n}| \) in the denominator.

## DIAGNOSTIC_ANSWER_2
The numerator \( |\vec{a} \cdot \vec{n} - d| \) gives the absolute difference between the projection of \( \vec{a} \) onto the normal \( \vec{n} \) and the plane's constant \( d \), which is the length of the projection of the vector from the plane to the point along the normal direction. The denominator \( |\vec{n}| \) normalises this projection because the plane equation uses the unnormalised normal vector; dividing by its magnitude converts the projection length into the actual perpendicular distance. A wrong explanation (e.g., "it's just the formula") shows the student does not connect the vector form to the geometric projection concept.

## DIAGNOSTIC_QUESTION_3
Find the distance of the point \( (2, -1, 3) \) from the plane \( 3x - 4y + 12z = 5 \). Show all steps.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Rewrite the plane as \( 3x - 4y + 12z - 5 = 0 \). So \( A=3, B=-4, C=12, D=-5 \).  
**Step 2:** Substitute the point: \( |3(2) - 4(-1) + 12(3) - 5| = |6 + 4 + 36 - 5| = |41| = 41 \).  
**Step 3:** Compute denominator: \( \sqrt{3^2 + (-4)^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13 \).  
**Step 4:** Distance = \( \frac{41}{13} \) units.  
A common error is forgetting to change the sign of \( D \) when moving the constant to the left side, leading to a numerator of \( |6+4+36+5| = 51 \) and an incorrect distance of \( \frac{51}{13} \).

## DIAGNOSTIC_QUESTION_4
Two parallel planes are given by \( 2x - 3y + 6z = 7 \) and \( 2x - 3y + 6z = 19 \). A student claims the distance between them is \( \frac{|19-7|}{\sqrt{2^2+(-3)^2+6^2}} = \frac{12}{7} \). Is this correct? Justify your answer.

## DIAGNOSTIC_ANSWER_4
Yes, it is correct. For parallel planes \( Ax+By+Cz+D_1=0 \) and \( Ax+By+Cz+D_2=0 \), the distance is \( \frac{|D_2 - D_1|}{\sqrt{A^2+B^2+C^2}} \). Here \( D_1 = -7, D_2 = -19 \), so \( |D_2 - D_1| = |-19 - (-7)| = 12 \). Denominator \( \sqrt{4+9+36} = 7 \). The student's method works because any point on the first plane can be used with the second plane's equation, and the numerator simplifies to \( |D_2 - D_1| \). A wrong answer (e.g., using \( D_1=7, D_2=19 \) directly without moving constants) would give \( \frac{12}{7} \) by coincidence but reveals misunderstanding of the standard form.

## DIAGNOSTIC_QUESTION_5
A student solved the distance from point \( (1,1,1) \) to plane \( x + y + z = 0 \) as follows:  
Numerator: \( |1+1+1| = 3 \), Denominator: \( \sqrt{1+1+1} = \sqrt{3} \), Distance = \( \frac{3}{\sqrt{3}} = \sqrt{3} \).  
Identify if there is any error in the working. If yes, correct it.

## DIAGNOSTIC_ANSWER_5
The working is correct. The plane is \( x+y+z=0 \) so \( A=1,B=1,C=1,D=0 \). Point \( (1,1,1) \) gives numerator \( |1+1+1+0| = 3 \). Denominator \( \sqrt{1^2+1^2+1^2} = \sqrt{3} \). Distance = \( \sqrt{3} \). A common error would be to write the plane as \( x+y+z+0=0 \) and then mistakenly use \( D=0 \) but forget the absolute value, or to incorrectly simplify \( \frac{3}{\sqrt{3}} \) as \( 3\sqrt{3} \). The student's steps are flawless.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (with Indian context) where you need to find the distance of a point from a plane, and solve it. The plane should be defined by three non-collinear points.

## DIAGNOSTIC_ANSWER_6
**Problem:** A triangular solar panel is installed on a roof with corners at \( A(2,0,0) \), \( B(0,3,0) \), \( C(0,0,4) \) (coordinates in metres). A support rod is fixed at point \( P(1,1,1) \). Find the perpendicular distance from the rod to the panel.  
**Solution:**  
1. Vectors \( \vec{AB} = (-2,3,0) \), \( \vec{AC} = (-2,0,4) \).  
2. Normal \( \vec{n} = \vec{AB} \times \vec{AC} = (12, 8, 6) \) (or simplified to \( (6,4,3) \)).  
3. Plane equation: \( 6(x-2) + 4(y-0) + 3(z-0) = 0 \Rightarrow 6x+4y+3z = 12 \).  
4. Distance = \( \frac{|6(1)+4(1)+3(1)-12|}{\sqrt{36+16+9}} = \frac{|1|}{ \sqrt{61}} = \frac{1}{\sqrt{61}} \) m.  
A poor answer would use the wrong normal (e.g., not taking cross product) or miscalculate the plane constant.

## COMMON_MISCONCEPTION
Students often forget to convert the plane equation to the form \( Ax+By+Cz+D=0 \) before substituting, leading to sign errors in \( D \). For example, given plane \( 2x - 3y + 6z = 14 \), they might use \( D = 14 \) instead of \( D = -14 \), making the numerator \( |2x_1 - 3y_1 + 6z_1 + 14| \) instead of \( |2x_1 - 3y_1 + 6z_1 - 14| \). Another frequent error is omitting the absolute value in the numerator, which can yield a negative distance. In vector form, students sometimes use \( \vec{a} \cdot \vec{n} + d \) instead of \( \vec{a} \cdot \vec{n} - d \) because they confuse the plane equation \( \vec{r} \cdot \vec{n} = d \) with \( \vec{r} \cdot \vec{n} + d = 0 \).

## ON_FAILURE
If a student makes the sign error with \( D \), have them rewrite the plane equation as \( Ax+By+Cz+D=0 \) by moving all terms to the left side. Then explicitly identify \( D \) as the constant term on the left. Practice with 5 planes where the constant is on the right side (e.g., \( 3x+4y=12 \), \( x-y+z=5 \), \( 2x=7 \)) and ask them to state \( A,B,C,D \) each time. For the absolute value error, remind them that distance is always non-negative, and ask them to test a point on the opposite side of the plane to see that the expression inside the absolute value changes sign.

## PREREQUISITE_NODE_IDS
c12_math_cbse_11_001, c12_math_cbse_11_006, c11_math_cbse_12_001, c11_math_cbse_12_002, c11_math_cbse_10_014, c12_math_cbse_11_004, c12_math_cbse_11_005, c12_math_cbse_11_007

## PREREQUISITE_REASONS
c12_math_cbse_11_001: Direction cosines/ratios are needed to understand the normal vector's direction and magnitude.
c12_math_cbse_11_006: The normal form of a plane directly provides the equation \( \vec{r} \cdot \vec{n} = d \) used in the vector distance formula.
c11_math_cbse_12_001: Coordinates of a point in 3D are essential to represent the given point.
c11_math_cbse_12_002: The 3D distance formula underpins the derivation of the point-to-plane distance.
c11_math_cbse_10_014: The 2D distance from a point to a line is the planar analogue that builds intuition for the 3D case.
c12_math_cbse_11_004: Distance of a point from a plane uses projection onto normal; the skew lines distance is essentially the distance between two parallel planes each containing one line.  
c12_math_cbse_11_005: Distance of point from plane directly generalises the perpendicular distance from point to line (used in parallel line distance).  
c12_math_cbse_11_007: Distance of a point from a plane uses the plane equation derived here.  

## FORWARD_NODE_IDS
c12_math_cbse_11_009, c12_math_cbse_11_010
## FORWARD_REASONS
c12_math_cbse_11_009: The angle between two planes uses the normals of the planes; the distance formula reinforces the role of the normal vector.
c12_math_cbse_11_010: The angle between a line and a plane involves the perpendicular distance from a point on the line to the plane, directly applying this node's formula.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_12_006, c11_math_cbse_10_013
## CROSS_SUBJECT_REASONS
c11_math_cbse_12_006: Applications of 3D coordinate geometry in physics (e.g., finding the distance of a particle from a surface) rely on this formula.
c11_math_cbse_10_013: The normal form of a line in 2D is the direct lower-dimensional analogue; understanding it helps students see the pattern of using normal vectors for distance calculations.

## CHAIN_DESCRIPTION
c12_math_cbse_11_001 -> c12_math_cbse_11_006 -> c12_math_cbse_11_008 -> c12_math_cbse_11_009

## THIS_FORMULA
Cartesian: \( \text{Distance} = \frac{|Ax_1 + By_1 + Cz_1 + D|}{\sqrt{A^2 + B^2 + C^2}} \); Vector: \( \text{Distance} = \frac{|\vec{a} \cdot \vec{n} - d|}{|\vec{n}|} \) for plane \( \vec{r} \cdot \vec{n} = d \) and point \( \vec{a} \).

## FORMULA_VARIABLES
\( A, B, C \): direction ratios of the normal to the plane; \( D \): constant term in the Cartesian equation \( Ax+By+Cz+D=0 \); \( (x_1, y_1, z_1) \): coordinates of the point; \( \vec{n} \): normal vector of the plane; \( d \): scalar constant in the vector equation \( \vec{r} \cdot \vec{n} = d \); \( \vec{a} \): position vector of the point.

## FORMULA_UNITS
If coordinates are in metres (or cm, km), the distance is in the same linear unit (metres, cm, km). The formula is dimensionless in the sense that it works for any consistent length unit.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_12_006 | The 3D coordinate geometry applications in physics (e.g., electrostatics: distance of a point charge from a charged plane) use this exact formula.
c11_math_cbse_10_013 | The normal form of a line in 2D (\( x\cos\alpha + y\sin\alpha = p \)) gives the distance of a point from a line as \( |x_1\cos\alpha + y_1\sin\alpha - p| \), which is the 2D prototype of the 3D formula.
## PREREQ_CONCEPT
The equation of a plane in normal form (both Cartesian and vector) and the concept of a normal vector.

## PREREQ_BEFORE
The student must be able to write the equation of a plane given its normal vector and a point on it, and must know how to compute the magnitude of a vector.

## PREREQ_STUCK
If stuck, revisit the normal form of a plane (c12_math_cbse_11_006) and practice finding the normal vector from the plane equation.

## WORKED_EXAMPLE_1
PROBLEM: A drone is flying at coordinates (3, -2, 5) in a coordinate system where the ground is the plane 2x - y + 2z = 10. Find the vertical height of the drone above the ground if the ground is not horizontal but this sloping plane. (Assume the perpendicular distance represents the shortest distance to the ground.)

STEPS:
- Step 1: Write the plane equation in standard form: 2x - y + 2z - 10 = 0. Identify A=2, B=-1, C=2, D=-10.
- Step 2: Substitute the drone's coordinates into the numerator: |2(3) + (-1)(-2) + 2(5) - 10| = |6 + 2 + 10 - 10| = |8| = 8.
- Step 3: Compute the denominator: sqrt(2^2 + (-1)^2 + 2^2) = sqrt(4 + 1 + 4) = sqrt(9) = 3.
- Step 4: Distance = 8/3 units.
- Step 5: Interpret: The drone is 8/3 metres (or units) perpendicularly above the sloping ground.

REASONING: The formula computes the length of the perpendicular from the point to the plane. Since the ground is a plane, the shortest distance from the drone to the ground is exactly this perpendicular distance. The normal vector (2, -1, 2) is not vertical, so the perpendicular distance is not the same as the vertical (z) distance.

ANSWER: 8/3 units

## WORKED_EXAMPLE_2
PROBLEM: Find the distance between the parallel planes 3x - 4y + 5z = 7 and 3x - 4y + 5z = 22.

STEPS:
- Step 1: Recognize the planes are parallel because they have the same normal vector (3, -4, 5). Rewrite both in standard form: 3x - 4y + 5z - 7 = 0 and 3x - 4y + 5z - 22 = 0.
- Step 2: Use the distance formula for parallel planes: |D2 - D1| / sqrt(A^2 + B^2 + C^2). Here D1 = -7, D2 = -22.
- Step 3: Compute numerator: |(-22) - (-7)| = |-22 + 7| = |-15| = 15.
- Step 4: Compute denominator: sqrt(3^2 + (-4)^2 + 5^2) = sqrt(9 + 16 + 25) = sqrt(50) = 5√2.
- Step 5: Distance = 15 / (5√2) = 3/√2 = (3√2)/2 units.

REASONING: The distance between parallel planes is constant. Choosing any point on the first plane and finding its distance to the second plane yields the same result. The formula simplifies to the difference of the constants because the point's coordinates satisfy the first plane's equation.

ANSWER: (3√2)/2 units

## WORKED_EXAMPLE_3
PROBLEM: A triangular piece of land has corners at A(1, 0, 0), B(0, 2, 0), C(0, 0, 3) (in kilometres). A water tank is located at P(2, 1, 1). Find the shortest distance from the tank to the plane of the land.

STEPS:
- Step 1: Find two vectors in the plane: AB = B - A = (-1, 2, 0); AC = C - A = (-1, 0, 3).
- Step 2: Compute the normal vector n = AB × AC = determinant |i j k; -1 2 0; -1 0 3| = i(6 - 0) - j(-3 - 0) + k(0 - (-2)) = (6, 3, 2).
- Step 3: Use point A(1,0,0) to write the plane equation: 6(x - 1) + 3(y - 0) + 2(z - 0) = 0 => 6x + 3y + 2z = 6.
- Step 4: Standard form: 6x + 3y + 2z - 6 = 0. A=6, B=3, C=2, D=-6.
- Step 5: Substitute P(2,1,1): |6(2) + 3(1) + 2(1) - 6| = |12 + 3 + 2 - 6| = |11| = 11.
- Step 6: Denominator: sqrt(6^2 + 3^2 + 2^2) = sqrt(36 + 9 + 4) = sqrt(49) = 7.
- Step 7: Distance = 11/7 km.

REASONING: The plane is defined by three non-collinear points, so we first find its equation using the cross product of two direction vectors. Then we apply the point-to-plane distance formula. This combines the concept of plane equation from three points (c12_math_cbse_11_007) with the distance formula.

ANSWER: 11/7 km

## COMPETENCY_QUESTION_1
QUESTION: A plane π passes through the points (1, 2, 3), (4, 5, 6), and (7, 8, 10). A student claims that the distance of the point (10, 11, 12) from π is zero because the four points are coplanar. Verify the student's claim by checking coplanarity and, if false, compute the correct distance.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Check if the four points are coplanar. Use the scalar triple product of vectors formed by three points with the fourth.
- Step 2: If coplanar, distance = 0. If not, find the plane equation from the first three points.
- Step 3: Apply the distance formula.
- Step 4: Conclude whether the claim is correct.

ANSWER: Vectors: AB = (3,3,3), AC = (6,6,7), AD = (9,9,9). The scalar triple product [AB, AC, AD] = determinant of matrix with these rows = 3*(6*9 - 7*9) - 3*(6*9 - 7*9) + 3*(6*9 - 6*9) = 3*(54-63) - 3*(54-63) + 0 = -27 + 27 = 0. The points are coplanar! So the distance is indeed 0. The student's claim is correct, but for the right reason (coplanarity), not just a guess.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The plane 2x - 3y + 6z = 14 is tangent to a sphere centred at (1, -2, 3). Find the radius of the sphere. Then determine the distance from the centre to the parallel plane 2x - 3y + 6z = 35 and state whether this second plane intersects, touches, or misses the sphere.

COMPETENCY: Comparing and justifying

STEPS:
- Step 1: The radius is the distance from the centre to the tangent plane.
- Step 2: Compute that distance.
- Step 3: Compute the distance from the centre to the second plane.
- Step 4: Compare the second distance with the radius to determine intersection.

ANSWER: Radius = distance from (1,-2,3) to 2x-3y+6z-14=0: numerator = |2(1) -3(-2) +6(3) -14| = |2+6+18-14| = 12. Denominator = sqrt(4+9+36)=7. Radius = 12/7. Distance to second plane 2x-3y+6z-35=0: numerator = |2+6+18-35| = | -9 | = 9. Distance = 9/7. Since 9/7 < 12/7, the second plane is closer to the centre than the radius, so it cuts the sphere in a circle (intersects).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a roof for a house in Bengaluru and need to know how far a ventilation pipe (point) is from the ______ roof surface (plane).

## DIAGNOSTIC_ANSWER_7
sloping

The sloping roof is the plane: a tilted flat surface whose equation the corners supply. **A wrong answer (a flat word) reveals the student has levelled the roof and pointed the perpendicular straight down instead of obliquely.** The sloping roof is the plane: a tilted flat sheet whose equation the building's corners supply.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can compute the perpendicular distance from a point to a plane given in Cartesian or vector form, can determine whether a point lies on the plane (distance = 0), and can apply the formula to solve problems involving distances between parallel planes or the distance of a point from a plane determined by three non-collinear.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are designing a roof for a house in Bengaluru and need to know how far a ______ pipe (point) is from the sloping roof surface (plane).

## DIAGNOSTIC_ANSWER_9
ventilation

The ventilation pipe is the point: its clearance from the roof's plane is the number the distance formula exists to report. **A wrong answer (a chimney) reveals the student has swapped the fitting whose coordinates the walkthrough specified.**
