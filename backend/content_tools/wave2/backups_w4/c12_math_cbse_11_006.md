## ELI5
A kite flies fifty metres up, its string taut and perpendicular to the ground from your hand at the origin: the string is the plane's normal, and the normal form writes the plane as r dot n-hat equals d - unit normal dotted with position equals the perpendicular distance. The unit normal's three components are direction cosines squaring to one, and d is non-negative by convention. Every other plane equation can be normalised into this shape by dividing by the right square root.

## DEFINITION
The normal form of a plane is the equation of a plane expressed in terms of a unit normal vector \(\hat{\mathbf{n}} = (l, m, n)\) (where \(l, m, n\) are direction cosines of the normal) and the perpendicular distance \(d\) from the origin to the plane. It is given by \(\mathbf{r} \cdot \hat{\mathbf{n}} = d\) or equivalently \(lx + my + nz = d\), where \(d \geq 0\) and \(l^2 + m^2 + n^2 = 1\). This form uniquely determines the plane's orientation and position relative to the origin.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the normal form of a plane from a given general equation \(Ax + By + Cz + D = 0\) by dividing by \(\pm\sqrt{A^2+B^2+C^2}\), correctly choosing the sign to make the constant term positive, and can interpret the geometric meaning of the coefficients as direction cosines of the unit normal and the constant as the perpendicular distance from the origin.

## SCOPE_BOUNDARY
This node covers the derivation, interpretation, and conversion to normal form of a plane equation. It does NOT cover the equation of a plane passing through a point and perpendicular to a given vector (that is the next node), nor the intercept form or the plane through three points. It is limited to planes in \(\mathbb{R}^3\) and assumes the plane does not pass through the origin (if it does, \(d=0\) and the normal form is \(lx+my+nz=0\)).

## WALKTHROUGH
Imagine a kite flying at a height of 50 metres above a flat ground, with its string held at the origin. The string is perpendicular to the ground. If the string makes angles of \(60^\circ\), \(60^\circ\), and \(45^\circ\) with the positive x, y, and z axes respectively, we can find the equation of the ground plane using the normal form. Start by writing the direction cosines of the normal (the string) as \(l = \cos 60^\circ = 1/2\), \(m = \cos 60^\circ = 1/2\), \(n = \cos 45^\circ = 1/\sqrt{2}\). The perpendicular distance from the origin to the plane is \(d = 50\). The equation is \(lx + my + nz = d\). Substitute and simplify. The key insight is that the normal form directly uses the unit normal vector and the perpendicular distance, making it the most geometric representation of a plane.

Takeaway first: the normal form is the plane's most geometric outfit - unit normal by direction cosines, distance from origin as the constant - and any general equation normalises by dividing by the signed magnitude. Exam moves: derivation questions converting general equations into normal form, interpretation questions reading cosines and distance off the coefficients, and verification questions on the unit-normal condition. Method: rerun the kite - cosines of the string's three angles, distance from hand to ground, dot-product equation assembled. Check yourself: normalisation divides by plus or minus the magnitude so the constant lands positive; either sign normalises the plane, but only one puts d on the right side. Drill: convert one general equation to normal form and read off its unit normal and distance.

## DIAGNOSTIC_QUESTION_1
State the normal form of a plane equation and the conditions on the coefficients.

## DIAGNOSTIC_ANSWER_1
The normal form is \(lx + my + nz = d\), where \(l, m, n\) are direction cosines of the unit normal vector (so \(l^2+m^2+n^2=1\)) and \(d \ge 0\) is the perpendicular distance from the origin to the plane. A wrong answer (e.g., writing \(Ax+By+Cz=D\) without the unit normal condition) reveals the student confuses the general form with the normal form and does not recognize that the coefficients must be direction cosines.

## DIAGNOSTIC_QUESTION_2
Explain why, when converting the general plane equation \(Ax+By+Cz+D=0\) to normal form, we must divide by \(\pm\sqrt{A^2+B^2+C^2}\) and choose the sign opposite to that of \(D\) (if \(D \neq 0\)).

## DIAGNOSTIC_ANSWER_2
We divide by \(\pm\sqrt{A^2+B^2+C^2}\) to make the coefficients of \(x, y, z\) into direction cosines (so their squares sum to 1). The sign is chosen so that the constant term becomes positive (\(d \ge 0\)), because distance is non-negative. If the sign is chosen incorrectly, the constant term becomes negative, violating the definition of normal form. A student who says "we divide by \(\sqrt{A^2+B^2+C^2}\) and ignore the sign" does not understand the geometric requirement \(d \ge 0\).

## DIAGNOSTIC_QUESTION_3
Convert the plane equation \(2x - 3y + 6z - 14 = 0\) to normal form and state the perpendicular distance from the origin and the direction cosines of the unit normal.

## DIAGNOSTIC_ANSWER_3
Given: \(2x - 3y + 6z - 14 = 0\) → \(2x - 3y + 6z = 14\).  
\(\sqrt{A^2+B^2+C^2} = \sqrt{4+9+36} = \sqrt{49} = 7\).  
The constant term is already positive (14), so we divide by \(+7\):  
\(\frac{2}{7}x - \frac{3}{7}y + \frac{6}{7}z = 2\).  
Direction cosines: \(l = 2/7, m = -3/7, n = 6/7\) (check: \(4/49+9/49+36/49=1\)).  
Perpendicular distance \(d = 2\) units.  
A common error is dividing by \(-7\) and getting \(-\frac{2}{7}x + \frac{3}{7}y - \frac{6}{7}z = -2\), which gives a negative distance and wrong direction cosines.

## DIAGNOSTIC_QUESTION_4
A plane has normal form \(\frac{1}{3}x - \frac{2}{3}y - \frac{2}{3}z = 4\). Another plane has equation \(2x - 4y - 4z = 24\). Are they the same plane? Justify by comparing their normal forms.

## DIAGNOSTIC_ANSWER_4
Yes, they represent the same plane. The second equation: divide by \(\sqrt{4+16+16} = \sqrt{36} = 6\). The constant is positive (24), so divide by \(+6\): \(\frac{2}{6}x - \frac{4}{6}y - \frac{4}{6}z = 4\) → \(\frac{1}{3}x - \frac{2}{3}y - \frac{2}{3}z = 4\), which matches the first normal form exactly. A student who says "no" or only compares the general coefficients without normalizing fails to recognize that the normal form is unique for a given plane (up to the sign of the normal, but \(d \ge 0\) fixes the sign).

## DIAGNOSTIC_QUESTION_5
A student converts \(x + 2y - 2z + 3 = 0\) to normal form and writes: \(\frac{1}{3}x + \frac{2}{3}y - \frac{2}{3}z = 1\). Is this correct? If not, identify the error and give the correct normal form.

## DIAGNOSTIC_ANSWER_5
The student's answer is incorrect. The given equation is \(x + 2y - 2z = -3\). The constant term is negative. To get \(d \ge 0\), we must multiply the equation by \(-1\) first: \(-x - 2y + 2z = 3\). Then divide by \(\sqrt{1+4+4}=3\): \(-\frac{1}{3}x - \frac{2}{3}y + \frac{2}{3}z = 1\). The student forgot to flip the sign to make the constant positive. The correct normal form has direction cosines \(l = -1/3, m = -2/3, n = 2/3\) and \(d = 1\).

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (using Indian context: e.g., a rooftop water tank, a sloping roof, a kite) that requires finding the normal form of a plane given the perpendicular distance from the origin and the angles the normal makes with the coordinate axes. Provide the solution.

## DIAGNOSTIC_ANSWER_6
Problem: A sloping roof of a house is at a perpendicular distance of 6 metres from the corner of the room (taken as origin). The normal to the roof makes angles \(60^\circ, 60^\circ, 45^\circ\) with the positive x, y, z axes. Find the equation of the roof plane in normal form.  
Solution: Direction cosines: \(l = \cos 60^\circ = 1/2\), \(m = 1/2\), \(n = \cos 45^\circ = 1/\sqrt{2}\). Check: \(1/4+1/4+1/2=1\). Normal form: \(\frac{1}{2}x + \frac{1}{2}y + \frac{1}{\sqrt{2}}z = 6\). A good answer includes the correct setup and arithmetic. A poor answer uses the angles directly as coefficients or forgets the unit normal condition.

## COMMON_MISCONCEPTION
Students often think that any equation of the form \(Ax+By+Cz=D\) is in normal form if \(D>0\). They forget that the coefficients \(A, B, C\) must be direction cosines, i.e., \(A^2+B^2+C^2=1\). They also frequently make the sign error: when the constant term in the general equation is negative, they divide by \(+\sqrt{A^2+B^2+C^2}\) instead of multiplying by \(-1\) first, yielding a negative distance \(d\). For example, for \(2x-3y+6z+14=0\), they write \(\frac{2}{7}x - \frac{3}{7}y + \frac{6}{7}z = -2\) and call it normal form, violating \(d \ge 0\).

## ON_FAILURE
If a student makes the sign error, have them re-derive the normal form from the geometric definition: the plane is the set of points \(\mathbf{r}\) such that the projection of \(\mathbf{r}\) onto the unit normal \(\hat{\mathbf{n}}\) equals the positive distance \(d\). Write the general equation as \(\mathbf{r} \cdot \mathbf{n} = -D\) where \(\mathbf{n}=(A,B,C)\). Then \(\mathbf{r} \cdot \frac{\mathbf{n}}{|\mathbf{n}|} = \frac{-D}{|\mathbf{n}|}\). For the right side to be the positive distance \(d\), we need \(\frac{-D}{|\mathbf{n}|} \ge 0\), so we must choose the sign of the denominator such that the quotient is positive. Practice with 5 examples where \(D\) is negative, positive, and zero.

## PREREQUISITE_NODE_IDS
c12_math_cbse_11_001, c11_math_cbse_12_001, c11_math_cbse_10_013, c12_math_cbse_11_004, c12_math_cbse_11_005, c12_phy_cbse_05_003

## PREREQUISITE_REASONS
c12_math_cbse_11_001: Direction cosines and direction ratios are essential because the coefficients in the normal form are direction cosines of the unit normal vector.
c11_math_cbse_12_001: Coordinates of a point in 3D space are needed to understand the position vector \(\mathbf{r} = x\mathbf{i}+y\mathbf{j}+z\mathbf{k}\) used in the vector form \(\mathbf{r} \cdot \hat{\mathbf{n}} = d\).
c11_math_cbse_10_013: Normal form of a line in 2D is the direct 2D analogue; understanding it helps generalize to 3D planes.
c12_math_cbse_11_004: Equation of a plane in normal form uses normal vector \(\vec{n} = \vec{b_1} \times \vec{b_2}\); the shortest distance segment is parallel to this normal.  
c12_math_cbse_11_005: Equation of plane in normal form uses distance from point to plane, which extends the perpendicular distance concept.  
c12_phy_cbse_05_003: c12_phy_cbse_05_003 | Magnetic flux \(\Phi_B = \mathbf{B} \cdot \mathbf{A}\) similarly requires the unit normal to the plane; the normal form provides the direction cosines directly.  

## FORWARD_NODE_IDS
c12_math_cbse_11_007, c12_math_cbse_11_008, c12_math_cbse_11_009, c12_math_cbse_11_010
## FORWARD_REASONS
c12_math_cbse_11_007: The normal form is a special case of the plane through a point perpendicular to a vector; the next node generalizes it.
c12_math_cbse_11_008: Distance of a point from a plane uses the normal form to compute the perpendicular distance.
c12_math_cbse_11_009: Angle between two planes uses the unit normals from the normal form.
c12_math_cbse_11_010: Angle between a line and a plane uses the normal form to get the unit normal of the plane.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_10_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Derivatives of trigonometric functions are used when finding direction cosines from angles (e.g., rate of change of direction cosines with respect to angle).
c11_math_cbse_10_006: Slope of a line in 2D relates to the normal vector of a line; the normal form of a line in 2D is a precursor to the normal form of a plane in 3D.

## CHAIN_DESCRIPTION
c12_math_cbse_11_001 -> c12_math_cbse_11_006 -> c12_math_cbse_11_007

## THIS_FORMULA
Vector form: \(\mathbf{r} \cdot \hat{\mathbf{n}} = d\) where \(\hat{\mathbf{n}} = l\mathbf{i} + m\mathbf{j} + n\mathbf{k}\) is a unit vector (\(l^2+m^2+n^2=1\)) and \(d \ge 0\). Cartesian form: \(lx + my + nz = d\).

## FORMULA_VARIABLES
l, m, n = direction cosines of the unit normal vector (dimensionless); d = perpendicular distance from origin to plane (units of length, e.g., metres); x, y, z = coordinates of any point on the plane (same units as d).

## FORMULA_UNITS
If coordinates are in metres, d is in metres; direction cosines are dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_01_002 | Electric flux through a plane surface uses \(\Phi = \mathbf{E} \cdot \mathbf{A} = E A \cos\theta\); the area vector \(\mathbf{A}\) is along the unit normal, and the normal form \(lx+my+nz=d\) gives the plane's orientation for flux calculation.
 c12_phy_cbse_05_003 | Magnetic flux \(\Phi_B = \mathbf{B} \cdot \mathbf{A}\) similarly requires the unit normal to the plane; the normal form provides the direction cosines directly.
## PREREQ_CONCEPT
Direction cosines of a line (unit vector components) and the geometric meaning of dot product as projection.

## PREREQ_BEFORE
The student must be able to compute direction cosines from direction ratios or angles, and understand that the dot product \(\mathbf{r} \cdot \hat{\mathbf{n}}\) gives the projection of \(\mathbf{r}\) onto the unit normal.

## PREREQ_STUCK
If stuck, revisit c12_math_cbse_11_001 (Direction Cosines and Direction Ratios) and practice finding unit vectors from given vectors or angles.

## WORKED_EXAMPLE_1
PROBLEM: A plane is at a distance of 7 units from the origin. The normal to the plane from the origin has direction ratios 3, -4, 12. Find the equation of the plane in normal form (both vector and Cartesian).

STEPS:
- Step 1: The direction ratios of the normal are given as 3, -4, 12. To get the unit normal vector, we need the direction cosines. Compute the magnitude: \(\sqrt{3^2 + (-4)^2 + 12^2} = \sqrt{9+16+144} = \sqrt{169} = 13\).
- Step 2: The direction cosines are \(l = 3/13\), \(m = -4/13\), \(n = 12/13\). Verify: \(l^2+m^2+n^2 = 9/169 + 16/169 + 144/169 = 169/169 = 1\).
- Step 3: The perpendicular distance from the origin is given as \(d = 7\) units. Since distance is positive, we use \(d = 7\) directly.
- Step 4: Write the vector form: \(\mathbf{r} \cdot \hat{\mathbf{n}} = d\) where \(\hat{\mathbf{n}} = \frac{3}{13}\mathbf{i} - \frac{4}{13}\mathbf{j} + \frac{12}{13}\mathbf{k}\). So \(\mathbf{r} \cdot \left( \frac{3}{13}\mathbf{i} - \frac{4}{13}\mathbf{j} + \frac{12}{13}\mathbf{k} \right) = 7\).
- Step 5: Write the Cartesian form by substituting \(\mathbf{r} = x\mathbf{i}+y\mathbf{j}+z\mathbf{k}\): \(\frac{3}{13}x - \frac{4}{13}y + \frac{12}{13}z = 7\). This is the normal form.

REASONING: The normal form requires a unit normal vector and the perpendicular distance. The given direction ratios are converted to direction cosines by dividing by their magnitude. The distance is given as positive, so no sign adjustment is needed. The vector form directly uses the dot product, and the Cartesian form follows by expanding the dot product.

ANSWER: Vector form: \(\mathbf{r} \cdot \left( \frac{3}{13}\mathbf{i} - \frac{4}{13}\mathbf{j} + \frac{12}{13}\mathbf{k} \right) = 7\); Cartesian form: \(\frac{3}{13}x - \frac{4}{13}y + \frac{12}{13}z = 7\).

## WORKED_EXAMPLE_2
PROBLEM: Reduce the equation \(2x - 3y + 6z + 14 = 0\) to normal form and find the length of the perpendicular from the origin to the plane.

STEPS:
- Step 1: Write the equation with constant on the right: \(2x - 3y + 6z = -14\).
- Step 2: Compute \(\sqrt{A^2+B^2+C^2} = \sqrt{2^2 + (-3)^2 + 6^2} = \sqrt{4+9+36} = \sqrt{49} = 7\).
- Step 3: The constant term on the right is \(-14\), which is negative. To make the constant positive (so that \(d \ge 0\)), we must multiply the entire equation by \(-1\): \(-2x + 3y - 6z = 14\).
- Step 4: Now divide by the magnitude 7: \(-\frac{2}{7}x + \frac{3}{7}y - \frac{6}{7}z = 2\). This is the normal form. The direction cosines are \(l = -2/7, m = 3/7, n = -6/7\). Check: \(4/49+9/49+36/49=1\).
- Step 5: The perpendicular distance from the origin is the constant term \(d = 2\) units.

REASONING: The normal form requires the constant term (distance) to be non-negative. The original equation has a negative constant after moving it to the right side. Multiplying by \(-1\) flips the normal direction but keeps the plane the same, and makes the distance positive. Dividing by the magnitude normalizes the normal vector to unit length.

ANSWER: Normal form: \(-\frac{2}{7}x + \frac{3}{7}y - \frac{6}{7}z = 2\); Perpendicular distance from origin = 2 units.

## WORKED_EXAMPLE_3
PROBLEM: Find the normal form of the plane passing through the point (2, -1, 3) and having normal vector with direction ratios 4, -2, 4. Also find the distance of the plane from the origin.

STEPS:
- Step 1: The plane passes through (2, -1, 3) and has normal direction ratios 4, -2, 4. First, find the general equation: \(4(x-2) - 2(y+1) + 4(z-3) = 0\) → \(4x - 8 - 2y - 2 + 4z - 12 = 0\) → \(4x - 2y + 4z - 22 = 0\).
- Step 2: Rearrange: \(4x - 2y + 4z = 22\). The constant is positive (22), good.
- Step 3: Compute magnitude of normal: \(\sqrt{4^2 + (-2)^2 + 4^2} = \sqrt{16+4+16} = \sqrt{36} = 6\).
- Step 4: Divide by 6: \(\frac{4}{6}x - \frac{2}{6}y + \frac{4}{6}z = \frac{22}{6}\) → \(\frac{2}{3}x - \frac{1}{3}y + \frac{2}{3}z = \frac{11}{3}\).
- Step 5: This is the normal form. Direction cosines: \(l = 2/3, m = -1/3, n = 2/3\). Check: \(4/9+1/9+4/9=1\). Distance from origin \(d = 11/3\) units.

REASONING: We first form the general equation using the point-normal form (which is the next node, but here we use it as a known fact). Then we convert that general equation to normal form by normalizing the normal vector. Since the constant was already positive, we just divide by the magnitude. The distance from origin is the constant term in the normal form.

ANSWER: Normal form: \(\frac{2}{3}x - \frac{1}{3}y + \frac{2}{3}z = \frac{11}{3}\); Distance from origin = \(\frac{11}{3}\) units.

## COMPETENCY_QUESTION_1
QUESTION: A plane has equation \(3x - 4y + 12z = 5\). A student claims that the perpendicular distance from the origin to this plane is 5 units because the constant is 5. Is the student correct? If not, find the correct distance and explain the student's error.

COMPETENCY: Error identification and correction

STEPS:
- Step 1: Recognize that the given equation is not in normal form because the coefficients are not direction cosines.
- Step 2: Compute the magnitude of the normal vector: \(\sqrt{3^2+(-4)^2+12^2} = \sqrt{9+16+144} = \sqrt{169} = 13\).
- Step 3: Divide the equation by 13 to get normal form: \(\frac{3}{13}x - \frac{4}{13}y + \frac{12}{13}z = \frac{5}{13}\).
- Step 4: The perpendicular distance is the constant term in normal form: \(d = 5/13\) units.
- Step 5: Explain the error: The student forgot to normalize the normal vector. The distance is not the constant in the general form, but the constant in the normal form.

ANSWER: The student is incorrect. The correct perpendicular distance is \(5/13\) units. The error is assuming that any equation \(Ax+By+Cz=D\) gives distance \(D\); the normal form requires \(A^2+B^2+C^2=1\).

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: The roof of a building is a plane that is at a distance of 10 m from the ground (origin). The normal to the roof makes angles of \(60^\circ\) with the positive x-axis and \(60^\circ\) with the positive y-axis. Find the equation of the roof in normal form. If a vertical pole is erected at the point (2, 3, 0) on the ground, what is the height at which it meets the roof? (Assume the pole is parallel to the z-axis.)

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Direction cosines of normal: \(l = \cos 60^\circ = 1/2\), \(m = \cos 60^\circ = 1/2\). Since \(l^2+m^2+n^2=1\), we have \(n^2 = 1 - 1/4 - 1/4 = 1/2\) → \(n = \pm 1/\sqrt{2}\). The roof is above the ground, so the normal points upward; we take \(n = 1/\sqrt{2}\) (positive z direction).
- Step 2: Normal form: \(\frac{1}{2}x + \frac{1}{2}y + \frac{1}{\sqrt{2}}z = 10\).
- Step 3: The pole is at (2, 3, 0) and vertical (parallel to z-axis). Its parametric equation: \(x=2, y=3, z=t\). Substitute into plane equation: \(\frac{1}{2}(2) + \frac{1}{2}(3) + \frac{1}{\sqrt{2}}t = 10\) → \(1 + 1.5 + \frac{t}{\sqrt{2}} = 10\) → \(\frac{t}{\sqrt{2}} = 7.5\) → \(t = 7.5\sqrt{2} \approx 10.606\) m.
- Step 4: The height is \(t = \frac{15}{\sqrt{2}} = \frac{15\sqrt{2}}{2}\) metres.

ANSWER: Normal form: \(\frac{1}{2}x + \frac{1}{2}y + \frac{1}{\sqrt{2}}z = 10\). The pole meets the roof at height \(\frac{15\sqrt{2}}{2}\) metres (approx 10.61 m).

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This form uniquely determines the plane's ______ and position relative to the origin.

## DIAGNOSTIC_ANSWER_7
orientation

Orientation is the tilt the unit normal carries: together with the distance, it pins the plane down completely. **A wrong answer (a colour) reveals the student has decorated the plane where the definition specifies its lean.** Orientation is the tilt: the unit normal's direction cosines fix which way the plane leans.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a kite flying at a ______ of 50 metres above a flat ground, with its string held at the origin.

## DIAGNOSTIC_ANSWER_8
height

The height completes the kite's station: fifty metres up, the string's length is the plane's perpendicular distance d. **A wrong answer (a distance word twice) reveals the student has repeated the unit where the sentence wanted the altitude named.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine a kite flying at a height of ______ metres above a flat ground, with its string held at the origin.

## DIAGNOSTIC_ANSWER_9
50

The fifty is the plane's d: the perpendicular distance from origin to ground, which the normal form's constant side carries. **A wrong answer (another figure) reveals the student has re-flown the kite and shifted the ground it defines.** The fifty is the plane's constant: the perpendicular distance from your hand to the ground it defines.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ a kite flying at a height of 50 metres above a flat ground, with its string held at the origin.

## DIAGNOSTIC_ANSWER_10
Imagine

The imperative opens the scene: the kite is imagined so the normal has a string and the plane has a height. **A wrong answer (a formula) reveals the student has answered the quoted opener with the machinery it introduces.** The imperative opens the scene: the kite is imagined so the normal has a string and the plane has a height.
