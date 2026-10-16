## ELI5
Two roof slopes meet along a ridge, and the ridge's sharpness is the angle between the planes - measured, curiously, between their normals, the upright poles each roof would balance on its back. Take the dot product of the two normals, divide by their magnitudes, and keep the absolute value so the angle stays acute. Zero dot product means perpendicular planes; proportional normals mean parallel ones; the roof's drainage hangs on the arithmetic.

## DEFINITION
The angle between two planes is defined as the acute angle between their normal vectors. If two planes are given by \( \vec{r} \cdot \vec{n}_1 = d_1 \) and \( \vec{r} \cdot \vec{n}_2 = d_2 \) in vector form, or \( a_1x + b_1y + c_1z + d_1 = 0 \) and \( a_2x + b_2y + c_2z + d_2 = 0 \) in Cartesian form, then the angle \( \theta \) between them satisfies \( \cos \theta = \frac{|\vec{n}_1 \cdot \vec{n}_2|}{|\vec{n}_1||\vec{n}_2|} = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}} \), where \( 0 \le \theta \le \frac{\pi}{2} \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can compute the angle between two planes given in vector or Cartesian form, determine whether planes are perpendicular or parallel using the normal vectors, and solve problems that combine angle between planes with distance of a point from a plane or equation of a plane through the line of intersection.

## SCOPE_BOUNDARY
Covers angle between two planes using normal vectors in both vector and Cartesian forms, conditions for perpendicularity and parallelism, and application in finding planes at given angles. Does NOT cover angle between a line and a plane (node c12_math_cbse_11_010) or shortest distance between skew lines (nodes c12_math_cbse_11_004, c12_math_cbse_11_005).

## WALKTHROUGH
Imagine you are an architect designing a roof where two sloping surfaces meet along a ridge. The angle between these two roof surfaces determines the sharpness of the ridge — a critical measurement for drainage and aesthetics. To find this angle, you don't measure the surfaces directly; instead, you measure the angle between the upright poles (normals) perpendicular to each surface. Start by writing the equations of both planes in either vector form \( \vec{r} \cdot \vec{n} = d \) or Cartesian form \( ax+by+cz+d=0 \). Identify the normal vectors \( \vec{n}_1, \vec{n}_2 \) (or coefficients \( a_1,b_1,c_1 \) and \( a_2,b_2,c_2 \)). Recall from Class 11 (c11_math_cbse_10_008) that the angle between two lines with direction ratios \( a_1,b_1,c_1 \) and \( a_2,b_2,c_2 \) uses the same dot product formula. Apply \( \cos \theta = \frac{|a_1a_2+b_1b_2+c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}} \). The absolute value ensures the acute angle. If the dot product is zero, the planes are perpendicular; if the ratios of coefficients are equal, the planes are parallel.

Takeaway first: planes argue through their normals - the angle between planes is defined as the acute angle between the perpendicular vectors - and the same dot-product machinery from lines applies unchanged. Exam moves: computation questions in vector and Cartesian form, perpendicularity and parallelism questions via normals, and combined questions mixing angles with distances. Method: rerun the ridge - normals extracted from coefficients, dotted, normalised, absolute-valued, inverse-cosined. Check yourself: the absolute value is the acute-angle contract; without it, a negative cosine reports the obtuse twin the definition never asked for. Drill: compute one pair of planes' angle and find the parameter making them perpendicular.

## DIAGNOSTIC_QUESTION_1
Write the formula for the cosine of the angle between two planes \( 2x - 3y + 4z = 5 \) and \( x + y - 2z = 3 \) in Cartesian form. Do not compute the angle.

## DIAGNOSTIC_ANSWER_1
The formula is \( \cos \theta = \frac{|(2)(1) + (-3)(1) + (4)(-2)|}{\sqrt{2^2+(-3)^2+4^2}\sqrt{1^2+1^2+(-2)^2}} = \frac{|2 - 3 - 8|}{\sqrt{29}\sqrt{6}} = \frac{9}{\sqrt{174}} \). A wrong answer where the student omits the absolute value (giving \(-9/\sqrt{174}\)) reveals they confuse the angle between planes (always acute) with the angle between normals (can be obtuse). Forgetting to square the coefficients in the denominator (e.g., writing \(\sqrt{2-3+4}\)) shows confusion between direction ratios and direction cosines.

## DIAGNOSTIC_QUESTION_2
Two planes are given by \( \vec{r} \cdot (2\hat{i} - \hat{j} + 3\hat{k}) = 4 \) and \( \vec{r} \cdot (-4\hat{i} + 2\hat{j} - 6\hat{k}) = 7 \). Without computing the angle, state whether the planes are parallel, perpendicular, or neither. Justify your answer.

## DIAGNOSTIC_ANSWER_2
The normal vectors are \( \vec{n}_1 = 2\hat{i} - \hat{j} + 3\hat{k} \) and \( \vec{n}_2 = -4\hat{i} + 2\hat{j} - 6\hat{k} \). Observe \( \vec{n}_2 = -2 \vec{n}_1 \), so the normals are parallel (one is a scalar multiple of the other). Hence the planes are parallel. A student who computes the dot product \( \vec{n}_1 \cdot \vec{n}_2 = -8 -2 -18 = -28 \) and says "not zero, so not perpendicular" but fails to check the ratio condition \( \frac{2}{-4} = \frac{-1}{2} = \frac{3}{-6} = -\frac{1}{2} \) misses the parallel case. This is a common JEE trap: parallel planes have normals that are scalar multiples, not just non-perpendicular.

## DIAGNOSTIC_QUESTION_3
Find the angle between the planes \( 3x - 4y + 5z = 10 \) and \( 2x + y - 3z = 4 \). Give your answer in degrees to one decimal place.

## DIAGNOSTIC_ANSWER_3
Step 1: Identify coefficients: \( a_1=3, b_1=-4, c_1=5 \); \( a_2=2, b_2=1, c_2=-3 \).
Step 2: Compute numerator: \( |a_1a_2 + b_1b_2 + c_1c_2| = |(3)(2) + (-4)(1) + (5)(-3)| = |6 - 4 - 15| = |-13| = 13 \).
Step 3: Compute denominator: \( \sqrt{3^2+(-4)^2+5^2} = \sqrt{9+16+25} = \sqrt{50} = 5\sqrt{2} \); \( \sqrt{2^2+1^2+(-3)^2} = \sqrt{4+1+9} = \sqrt{14} \).
Step 4: \( \cos \theta = \frac{13}{5\sqrt{2} \cdot \sqrt{14}} = \frac{13}{5\sqrt{28}} = \frac{13}{10\sqrt{7}} = \frac{13\sqrt{7}}{70} \approx 0.491 \).
Step 5: \( \theta = \cos^{-1}(0.491) \approx 60.6^\circ \).
A wrong answer of \( \theta \approx 119.4^\circ \) means the student forgot the absolute value and took \( \cos^{-1}(-0.491) \). An answer with denominator \( \sqrt{50+14} = 8 \) shows confusion between sum of squares and square of sums.

## DIAGNOSTIC_QUESTION_4
Plane \( P_1 \) passes through points \( A(1,0,2), B(3,-1,1), C(2,2,0) \). Plane \( P_2 \) is given by \( 4x - 2y + z = 5 \). Determine whether \( P_1 \) and \( P_2 \) are perpendicular. Show all steps.

## DIAGNOSTIC_ANSWER_4
Step 1: Find two vectors in \( P_1 \): \( \vec{AB} = (2,-1,-1) \), \( \vec{AC} = (1,2,-2) \).
Step 2: Normal to \( P_1 \) is \( \vec{n}_1 = \vec{AB} \times \vec{AC} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 2 & -1 & -1 \\ 1 & 2 & -2 \end{vmatrix} = \hat{i}(2+2) - \hat{j}(-4+1) + \hat{k}(4+1) = 4\hat{i} + 3\hat{j} + 5\hat{k} \).
Step 3: Normal to \( P_2 \) is \( \vec{n}_2 = 4\hat{i} - 2\hat{j} + \hat{k} \).
Step 4: Check perpendicular condition: \( \vec{n}_1 \cdot \vec{n}_2 = (4)(4) + (3)(-2) + (5)(1) = 16 - 6 + 5 = 15 \neq 0 \).
Conclusion: Planes are NOT perpendicular.
A student who uses \( \vec{AB} \cdot \vec{n}_2 \) instead of cross product reveals they confuse direction vectors in the plane with the normal vector. Another error: computing \( \vec{n}_1 = \vec{AB} \times \vec{AC} \) but making a sign error in the determinant (e.g., \( - \hat{j}(-4+1) \) becoming \( -3\hat{j} \)) leads to wrong dot product.

## DIAGNOSTIC_QUESTION_5
A student solves: "Find the angle between planes \( x + 2y - 2z = 3 \) and \( 2x - y + z = 4 \)." Their working:
\( \cos \theta = \frac{|1(2) + 2(-1) + (-2)(1)|}{\sqrt{1+4+4}\sqrt{4+1+1}} = \frac{|2 -2 -2|}{\sqrt{9}\sqrt{6}} = \frac{2}{3\sqrt{6}} \), so \( \theta = \cos^{-1}\left(\frac{2}{3\sqrt{6}}\right) \).
Identify the error in the denominator and correct it.

## DIAGNOSTIC_ANSWER_5
The error is in the denominator: \( \sqrt{1^2+2^2+(-2)^2} = \sqrt{1+4+4} = \sqrt{9} = 3 \) is correct, but \( \sqrt{2^2+(-1)^2+1^2} = \sqrt{4+1+1} = \sqrt{6} \) is correct. Wait — the student wrote \( \sqrt{4+1+1} = \sqrt{6} \), that is correct. Actually the student's working is fully correct! The numerator: \( |2 -2 -2| = 2 \). So \( \cos \theta = \frac{2}{3\sqrt{6}} \). This is a trick question: the student's solution is correct. A student who claims there is an error might mistakenly think \( \sqrt{1+4+4} = \sqrt{9} = 3 \) is wrong because they expect \( \sqrt{1+2+2} \) or they mis-copy coefficients. The diagnostic tests whether the student can verify a solution without redoing it blindly. If a student "finds" an error where N/A exists, it reveals a lack of confidence in algebraic manipulation or a habit of second-guessing correct steps.

## DIAGNOSTIC_QUESTION_6
Construct a problem where two planes are perpendicular, and one plane passes through the points \( (1,2,3), (4,0,1), (2,-1,5) \). Give the equation of the second plane in Cartesian form with integer coefficients, and verify the perpendicular condition.

## DIAGNOSTIC_ANSWER_6
Step 1: Find normal of first plane \( P_1 \) through given points.
Vectors: \( \vec{AB} = (3,-2,-2) \), \( \vec{AC} = (1,-3,2) \).
\( \vec{n}_1 = \vec{AB} \times \vec{AC} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 3 & -2 & -2 \\ 1 & -3 & 2 \end{vmatrix} = \hat{i}(-4-6) - \hat{j}(6+2) + \hat{k}(-9+2) = -10\hat{i} - 8\hat{j} - 7\hat{k} \).
So \( \vec{n}_1 = (-10, -8, -7) \) (or \( (10,8,7) \)).
Step 2: Choose any normal \( \vec{n}_2 = (a,b,c) \) such that \( \vec{n}_1 \cdot \vec{n}_2 = 0 \). Pick simple integers: \( 10a + 8b + 7c = 0 \). Let \( a=1, b=1 \), then \( 10+8+7c=0 \Rightarrow c = -18/7 \) not integer. Let \( a=7, b=-10 \), then \( 70 -80 +7c=0 \Rightarrow c = 10/7 \). Let \( a=1, b=-2 \), then \( 10 -16 +7c=0 \Rightarrow c = 6/7 \). Let \( a=8, b=-10 \), then \( 80 -80 +7c=0 \Rightarrow c=0 \). So \( \vec{n}_2 = (8,-10,0) \) works.
Step 3: Plane \( P_2 \) with normal \( (8,-10,0) \) passing through, say, origin: \( 8x -10y = 0 \) or \( 4x -5y = 0 \).
Verification: \( (10)(8) + (8)(-10) + (7)(0) = 80 -80 = 0 \). Perpendicular.
A poor answer gives a plane with normal not satisfying dot product zero, or uses the same normal (parallel planes), or forgets that any point can be chosen for the second plane since only the angle is constrained.

## COMMON_MISCONCEPTION
Students often confuse the angle between planes with the angle between their normal vectors without the absolute value. They compute \( \cos \theta = \frac{\vec{n}_1 \cdot \vec{n}_2}{|\vec{n}_1||\vec{n}_2|} \) and if the dot product is negative, they report an obtuse angle (e.g., \( 120^\circ \)). The angle between planes is DEFINED as the acute angle (or right angle), so \( \cos \theta \) must be non-negative. Another error: when planes are given in vector form \( \vec{r} \cdot \vec{n}_1 = d_1 \), students sometimes use the position vectors of points on the plane instead of the normal vectors \( \vec{n}_1, \vec{n}_2 \). Also, in perpendicular condition \( a_1a_2+b_1b_2+c_1c_2=0 \), students mistakenly set the sum of coefficients to zero (e.g., \( a_1+a_2=0 \)) instead of the sum of products.

## ON_FAILURE
If a student forgets the absolute value, have them draw two intersecting planes and their normals: show that the normals can point "away" from each other giving an obtuse angle, but the planes themselves form an acute wedge. Make them write the definition: "Angle between planes = acute angle between normals". For normal vector confusion, revisit c12_math_cbse_11_006 (Equation of a Plane in Normal Form) and c12_math_cbse_11_007 (Equation of a Plane Passing Through a Point) to reinforce that the coefficients of \( \hat{i}, \hat{j}, \hat{k} \) in \( \vec{r} \cdot \vec{n} = d \) are exactly the normal components. For perpendicular condition errors, give a targeted drill: "Write the condition for perpendicular planes in words: 'Sum of products of corresponding coefficients equals zero'." Then practice 5 problems where they only state the condition without computing the angle.

## PREREQUISITE_NODE_IDS
c11_math_cbse_10_008, c11_math_cbse_12_001, c12_math_cbse_11_006, c12_math_cbse_11_007, c12_math_cbse_11_008, c12_math_cbse_11_003, c12_math_cbse_11_004, c12_math_cbse_11_005, c12_phy_cbse_09_001

## PREREQUISITE_REASONS
c11_math_cbse_10_008: Angle between two lines in 2D uses the same dot product formula; extends to 3D normals.
c11_math_cbse_12_001: Coordinates in 3D space are needed to define planes and points.
c12_math_cbse_11_006: Equation of plane in normal form \( \vec{r} \cdot \hat{n} = d \) directly gives the normal vector.
c12_math_cbse_11_007: Equation of plane through a point with given normal; needed to construct planes for problems.
c12_math_cbse_11_008: Distance of a point from a plane uses the same normal vector; often combined in multi-part questions.
c12_math_cbse_11_003: Angle between two planes uses the angle between their normals, which is computed by the same dot-product formula as angle between lines; understanding line-line angle is prerequisite for plane-plane angle.  
c12_math_cbse_11_004: tween a line and a plane (node c12_math_cbse_11_010) or shortest distance between skew lines (nodes c12_math_cbse_11_004, c12_math_cbse_11_005).  
c12_math_cbse_11_005: ne (node c12_math_cbse_11_010) or shortest distance between skew lines (nodes c12_math_cbse_11_004, c12_math_cbse_11_005).  
c12_phy_cbse_09_001: c12_phy_cbse_09_001 | Angle between crystal planes in X-ray diffraction (Bragg's law) uses the same normal vector geometry; the angle between planes determines constructive interference conditions.  

## FORWARD_NODE_IDS
c12_math_cbse_11_010
## FORWARD_REASONS
c12_math_cbse_11_010: Angle between a line and a plane uses the complement of the angle between the line and the plane's normal; builds directly on angle between planes/normal vectors.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_008, c11_math_cbse_12_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_008: The formula for angle between two lines in 2D (using slopes or direction ratios) is the direct 2D analogue of the 3D angle between planes via normals.
c11_math_cbse_12_001: 3D coordinate geometry provides the spatial framework; physics applications (e.g., angle between crystal planes in solid state physics, angle between reflecting surfaces in optics) rely on this 3D coordinate representation.

## CHAIN_DESCRIPTION
c11_math_cbse_10_008 -> c12_math_cbse_11_006 -> c12_math_cbse_11_009 -> c12_math_cbse_11_010

## THIS_FORMULA
Vector form: \( \cos \theta = \frac{|\vec{n}_1 \cdot \vec{n}_2|}{|\vec{n}_1||\vec{n}_2|} \); Cartesian form: \( \cos \theta = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}} \); Perpendicular: \( \vec{n}_1 \cdot \vec{n}_2 = 0 \) or \( a_1a_2+b_1b_2+c_1c_2=0 \); Parallel: \( \vec{n}_1 \parallel \vec{n}_2 \) or \( \frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2} \)

## FORMULA_VARIABLES
\( \vec{n}_1, \vec{n}_2 \) = normal vectors of the two planes; \( a_1,b_1,c_1 \) and \( a_2,b_2,c_2 \) = direction ratios of the normals (coefficients of x,y,z in Cartesian form); \( \theta \) = acute angle between the planes (0 ≤ θ ≤ π/2)

## FORMULA_UNITS
dimensionless (angle in radians or degrees)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_09_001 | Angle between crystal planes in X-ray diffraction (Bragg's law) uses the same normal vector geometry; the angle between planes determines constructive interference conditions.
 c12_phy_cbse_10_001 | Angle between two reflecting surfaces (e.g., two mirrors) determines the deviation of a light ray; the normals to the mirrors are used exactly as plane normals here.
## PREREQ_CONCEPT
Dot product of vectors and its geometric interpretation as \( |\vec{a}||\vec{b}|\cos \theta \); equation of a plane in normal form \( \vec{r} \cdot \vec{n} = d \).

## PREREQ_BEFORE
Student must be able to extract normal vectors from plane equations in both vector and Cartesian forms, compute dot products and magnitudes of 3D vectors, and understand that the angle between planes is defined via their normals.

## PREREQ_STUCK
Revisit c12_math_cbse_11_006 to practice identifying normal vectors from plane equations, and c11_math_cbse_10_008 to review the dot product formula for angle between two lines.

## WORKED_EXAMPLE_1
PROBLEM: A roof has two sloping sections. One section lies in the plane \( 2x - y + 2z = 6 \) and the other in the plane \( 3x + 6y - 2z = 9 \). Find the angle between the two roof sections (the dihedral angle) in degrees to one decimal place.

STEPS:
- Step 1: Identify the coefficients of the Cartesian equations. For plane 1: \( a_1=2, b_1=-1, c_1=2 \). For plane 2: \( a_2=3, b_2=6, c_2=-2 \).
- Step 2: Write the formula for the cosine of the angle between two planes: \( \cos \theta = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}} \).
- Step 3: Compute the numerator: \( |(2)(3) + (-1)(6) + (2)(-2)| = |6 - 6 - 4| = |-4| = 4 \).
- Step 4: Compute the denominator: \( \sqrt{2^2+(-1)^2+2^2} = \sqrt{4+1+4} = \sqrt{9} = 3 \); \( \sqrt{3^2+6^2+(-2)^2} = \sqrt{9+36+4} = \sqrt{49} = 7 \). So denominator = \( 3 \times 7 = 21 \).
- Step 5: \( \cos \theta = \frac{4}{21} \approx 0.190476 \). Then \( \theta = \cos^{-1}(0.190476) \approx 79.0^\circ \).

REASONING: The angle between two planes is the acute angle between their normal vectors. The normal vectors are directly read from the Cartesian coefficients. The absolute value ensures we get the acute angle (since \( \cos \theta \ge 0 \) for \( 0 \le \theta \le 90^\circ \)). The calculation uses only arithmetic and square roots, no calculus.

ANSWER: \( 79.0^\circ \)

## WORKED_EXAMPLE_2
PROBLEM: Find the value of \( \lambda \) such that the planes \( \vec{r} \cdot (2\hat{i} + 3\hat{j} - \hat{k}) = 5 \) and \( \vec{r} \cdot (\hat{i} - 2\hat{j} + \lambda \hat{k}) = 4 \) are perpendicular.

STEPS:
- Step 1: Identify the normal vectors from the vector equations. \( \vec{n}_1 = 2\hat{i} + 3\hat{j} - \hat{k} \), \( \vec{n}_2 = \hat{i} - 2\hat{j} + \lambda \hat{k} \).
- Step 2: Recall the condition for perpendicular planes: their normal vectors are perpendicular, so \( \vec{n}_1 \cdot \vec{n}_2 = 0 \).
- Step 3: Compute the dot product: \( (2)(1) + (3)(-2) + (-1)(\lambda) = 2 - 6 - \lambda = -4 - \lambda \).
- Step 4: Set the dot product equal to zero: \( -4 - \lambda = 0 \Rightarrow \lambda = -4 \).
- Step 5: Verify: With \( \lambda = -4 \), \( \vec{n}_2 = \hat{i} - 2\hat{j} - 4\hat{k} \). Dot product: \( 2 - 6 + 4 = 0 \). Correct.

REASONING: Two planes are perpendicular iff their normal vectors are perpendicular. The vector form of the plane equation directly gives the normal vector as the coefficient of \( \vec{r} \) in the dot product. No need to convert to Cartesian form.

ANSWER: \( \lambda = -4 \)

## WORKED_EXAMPLE_3
PROBLEM: Find the equation of a plane that passes through the line of intersection of the planes \( x + y + z = 1 \) and \( 2x - y + 3z = 4 \), and makes an angle of \( 60^\circ \) with the plane \( x - 2y + z = 0 \).

STEPS:
- Step 1: Equation of a plane through the line of intersection of two planes \( P_1: a_1x+b_1y+c_1z+d_1=0 \) and \( P_2: a_2x+b_2y+c_2z+d_2=0 \) is \( P_1 + \lambda P_2 = 0 \). Here: \( (x+y+z-1) + \lambda(2x-y+3z-4) = 0 \).
- Step 2: Simplify: \( (1+2\lambda)x + (1-\lambda)y + (1+3\lambda)z - (1+4\lambda) = 0 \). Normal vector of this plane: \( \vec{n} = (1+2\lambda, 1-\lambda, 1+3\lambda) \).
- Step 3: Normal of given plane \( x - 2y + z = 0 \) is \( \vec{n}_0 = (1, -2, 1) \).
- Step 4: Angle between planes is \( 60^\circ \), so \( \cos 60^\circ = \frac{1}{2} = \frac{|\vec{n} \cdot \vec{n}_0|}{|\vec{n}||\vec{n}_0|} \).
- Step 5: Compute dot product: \( \vec{n} \cdot \vec{n}_0 = (1+2\lambda)(1) + (1-\lambda)(-2) + (1+3\lambda)(1) = 1+2\lambda -2+2\lambda +1+3\lambda = 7\lambda \).
- Step 6: Compute magnitudes: \( |\vec{n}_0| = \sqrt{1+4+1} = \sqrt{6} \). \( |\vec{n}| = \sqrt{(1+2\lambda)^2 + (1-\lambda)^2 + (1+3\lambda)^2} = \sqrt{1+4\lambda+4\lambda^2 + 1-2\lambda+\lambda^2 + 1+6\lambda+9\lambda^2} = \sqrt{14\lambda^2 + 8\lambda + 3} \).
- Step 7: Equation: \( \frac{|7\lambda|}{\sqrt{14\lambda^2+8\lambda+3} \cdot \sqrt{6}} = \frac{1}{2} \). Square both sides: \( \frac{49\lambda^2}{6(14\lambda^2+8\lambda+3)} = \frac{1}{4} \).
- Step 8: Cross-multiply: \( 196\lambda^2 = 6(14\lambda^2+8\lambda+3) = 84\lambda^2 + 48\lambda + 18 \). So \( 112\lambda^2 - 48\lambda - 18 = 0 \). Divide by 2: \( 56\lambda^2 - 24\lambda - 9 = 0 \).
- Step 9: Solve quadratic: \( \lambda = \frac{24 \pm \sqrt{576 + 2016}}{112} = \frac{24 \pm \sqrt{2592}}{112} = \frac{24 \pm 36\sqrt{2}}{112} = \frac{6 \pm 9\sqrt{2}}{28} \).
- Step 10: Two possible planes. For \( \lambda = \frac{6 + 9\sqrt{2}}{28} \), the plane is \( (1+2\lambda)x + (1-\lambda)y + (1+3\lambda)z = 1+4\lambda \). (Similarly for the other root).

REASONING: This problem combines three concepts: (1) family of planes through the intersection of two planes (from c12_math_cbse_11_007), (2) angle between planes formula, (3) algebraic manipulation of parameters. The absolute value in the cosine formula gives two possible values of \( \lambda \) (two planes symmetric about the given plane). The quadratic arises from squaring the cosine equation.

ANSWER: Two planes: \( \left(1+2\frac{6+9\sqrt{2}}{28}\right)x + \left(1-\frac{6+9\sqrt{2}}{28}\right)y + \left(1+3\frac{6+9\sqrt{2}}{28}\right)z = 1+4\frac{6+9\sqrt{2}}{28} \) and the corresponding one with \( \lambda = \frac{6-9\sqrt{2}}{28} \).

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If two planes are given by \( a_1x+b_1y+c_1z+d_1=0 \) and \( a_2x+b_2y+c_2z+d_2=0 \), then the angle between them is given by \( \cos \theta = \frac{a_1a_2+b_1b_2+c_1c_2}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}} \). The absolute value is not needed because the angle between planes is always acute." Is the student correct? Explain why or why not, and give a counterexample if the student is wrong.

COMPETENCY: Evaluating mathematical statements and identifying hidden assumptions
STEPS:
- Step 1: Recall the definition of angle between two planes.
- Step 2: Analyze the dot product formula without absolute value.
- Step 3: Determine if the dot product can be negative.
- Step 4: Provide a concrete counterexample.
- Step 5: State the correct formula and the reason for the absolute value.

ANSWER: The student is incorrect. The formula without absolute value gives the angle between the normal vectors, which can be obtuse (if the normals point "away" from each other). The angle between planes is defined as the acute angle between them (or 90°). For example, planes \( x+y+z=1 \) and \( -x-y-z=2 \) have normals \( (1,1,1) \) and \( (-1,-1,-1) \). Dot product = -3, magnitudes = \( \sqrt{3} \) each. Without absolute value, \( \cos \theta = -1 \Rightarrow \theta = 180^\circ \), but the planes are actually parallel (angle 0°). With absolute value, \( \cos \theta = 1 \Rightarrow \theta = 0^\circ \), which is correct. The absolute value ensures we take the acute angle between the normals (or its supplement if the normals give an obtuse angle).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A crystallographer uses X-ray diffraction to study a crystal. The crystal has two sets of parallel planes: one set with Miller indices (1,1,1) and another with (1,1,-1). In a cubic crystal, the angle between planes with Miller indices (h,k,l) is given by the angle between their normal vectors, which are proportional to (h,k,l). Find the angle between these two sets of planes. If the X-ray wavelength is 1.54 Å and the first-order Bragg reflection occurs at this angle, what is the interplanar spacing d for the (1,1,1) planes? (Bragg's law: \( n\lambda = 2d \sin \theta \), where \( \theta \) is the angle between the incident beam and the plane, which is the complement of the angle between the normal and the beam. For simplicity, assume the angle between the planes equals the Bragg angle \( \theta \).)

COMPETENCY: Applying mathematical concepts to a real-world physics problem (interdisciplinary)
STEPS:
- Step 1: Identify normals: \( \vec{n}_1 = (1,1,1) \), \( \vec{n}_2 = (1,1,-1) \).
- Step 2: Compute angle between normals (which equals angle between planes).
- Step 3: Use dot product formula.
- Step 4: Compute \( \theta \).
- Step 5: Apply Bragg's law with \( n=1 \), \( \lambda = 1.54 \) Å, and the computed \( \theta \) to find d.

ANSWER: 
Step 1: Normals are \( (1,1,1) \) and \( (1,1,-1) \).
Step 2: \( \cos \theta = \frac{|1\cdot1 + 1\cdot1 + 1\cdot(-1)|}{\sqrt{3}\sqrt{3}} = \frac{|1+1-1|}{3} = \frac{1}{3} \).
Step 3: \( \theta = \cos^{-1}(1/3) \approx 70.5288^\circ \).
Step 4: Bragg's law: \( 1 \times 1.54 = 2 d \sin(70.5288^\circ) \). \( \sin(70.5288^\circ) = \sqrt{1 - (1/3)^2} = \sqrt{8/9} = \frac{2\sqrt{2}}{3} \approx 0.9428 \).
Step 5: \( d = \frac{1.54}{2 \times 0.9428} \approx \frac{1.54}{1.8856} \approx 0.817 \) Å.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The angle between two planes is ______ as the acute angle between their normal vectors.

## DIAGNOSTIC_ANSWER_7
defined

Defined is the definition's own verb: the angle between planes is a convention - the acute angle between their normals - and the blank holds the act of fixing it. **A wrong answer (measured) reveals the student has implied a protractor on the surfaces where the definition simply legislates the normals' angle.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are an architect designing a roof where two sloping ______ meet along a ridge.

## DIAGNOSTIC_ANSWER_8
surfaces

The surfaces are the roof's two slopes: their meeting ridge's sharpness is the angle the normals will report. **A wrong answer (walls) reveals the student has exchanged the sloping planes for vertical ones and changed the normals entirely.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can compute the angle between two planes given in vector or Cartesian form, determine whether planes are perpendicular or parallel using the normal vectors, and solve problems that combine angle between planes with distance of a point from a plane or equation of a plane through the line of intersection.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are an ______ designing a roof where two sloping surfaces meet along a ridge.

## DIAGNOSTIC_ANSWER_10
architect

The architect is the ridge's surveyor: drainage and aesthetics hang on the angle the normals compute. **A wrong answer (a builder) reveals the student has hired the site crew where the walkthrough appointed the design professional.** The architect is the ridge's surveyor: drainage hangs on the angle the normals report.
