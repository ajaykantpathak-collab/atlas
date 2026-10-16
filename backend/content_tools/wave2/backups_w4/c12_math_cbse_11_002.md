## ELI5
A drone leaves the rooftop in a fixed direction, and every point of its path must be describable: the line's equation in space comes in two dialects. The vector form r equals a plus lambda b names a fixed point and slides along a direction vector; the Cartesian form chains three fractions - each coordinate's offset over its direction ratio - into one triple equality. A point plus a direction, or two distinct points: either input writes the whole line.

## DEFINITION
The equation of a line in 3D space describes the set of all points (x, y, z) that lie on a straight line. It can be expressed in two equivalent forms: (1) **Vector form**: \(\vec{r} = \vec{a} + \lambda \vec{b}\), where \(\vec{a}\) is the position vector of a fixed point A on the line, \(\vec{b}\) is a direction vector parallel to the line, and \(\lambda \in \mathbb{R}\) is a scalar parameter; (2) **Cartesian form**: \(\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}\), where \((x_1, y_1, z_1)\) are the coordinates of point A and \(a, b, c\) are direction ratios of the line (components of \(\vec{b}\)). Both forms uniquely determine a line given a point and a direction, or two distinct points.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (a) write the vector and Cartesian equations of a line when given a point and a parallel vector, or two points; (b) convert fluently between vector and Cartesian forms; (c) determine whether a given point lies on a line by checking consistency of the parameter \(\lambda\); and (d) extract direction ratios and a point on the line from either form to solve geometric problems like finding intersection with coordinate planes.

## SCOPE_BOUNDARY
This node covers the derivation and application of vector and Cartesian equations of a line in 3D space under two conditions: (i) line through a given point parallel to a given vector, (ii) line through two given points. It does NOT cover angle between lines, shortest distance between lines (skew or parallel), or equations of planes — those are separate nodes (c12_math_cbse_11_003 to c12_math_cbse_11_010).

## WALKTHROUGH
Imagine a drone flying from your school rooftop (point A) in a fixed direction (vector \(\vec{b}\)) — its path is a straight line in 3D space. To describe this path mathematically, we need the coordinates of the starting point and the direction ratios. Start by writing the position vector of point A, \(\vec{a} = x_1\hat{i} + y_1\hat{j} + z_1\hat{k}\), and the direction vector \(\vec{b} = a\hat{i} + b\hat{j} + c\hat{k}\). The vector equation \(\vec{r} = \vec{a} + \lambda \vec{b}\) comes from the fact that the vector from A to any point P on the line is parallel to \(\vec{b}\), so \(\overrightarrow{AP} = \lambda \vec{b}\). Substitute \(\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}\) and equate components to get parametric equations \(x = x_1 + \lambda a\), \(y = y_1 + \lambda b\), \(z = z_1 + \lambda c\). Eliminate \(\lambda\) to obtain the symmetric Cartesian form \(\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}\). The key insight: the parameter \(\lambda\) measures signed distance along the line in units of the direction vector's magnitude.

Takeaway first: the line is one object wearing two notations - lambda the slider in vector dress, the triple equality in Cartesian dress - and fluency is converting between them. Exam moves: writing questions from point-plus-direction or two-point data, conversion questions between forms, membership questions testing whether a point lies on the line via consistent lambda, and extraction questions reading direction ratios from either form. Method: rerun the drone - rooftop's vector, direction's components, parametric equations, lambda eliminated into the symmetric form. Check yourself: a point lies on the line only if one single lambda satisfies all three parametric equations; conflicting lambdas evict it. Drill: write one line in both forms from two points and test a third point for membership.

## DIAGNOSTIC_QUESTION_1
Write the vector equation of the line passing through the point \((2, -3, 5)\) and parallel to the vector \(4\hat{i} - \hat{j} + 2\hat{k}\).

## DIAGNOSTIC_ANSWER_1
**Answer:** \(\vec{r} = (2\hat{i} - 3\hat{j} + 5\hat{k}) + \lambda(4\hat{i} - \hat{j} + 2\hat{k})\).  
A wrong answer like \(\vec{r} = (4\hat{i} - \hat{j} + 2\hat{k}) + \lambda(2\hat{i} - 3\hat{j} + 5\hat{k})\) reveals the student confuses the point's position vector with the direction vector — they treat the given point as the direction and the direction as the point. This is a fundamental role-reversal error that makes all subsequent steps (conversion to Cartesian, finding intersections) incorrect.

## DIAGNOSTIC_QUESTION_2
The Cartesian equation of a line is \(\frac{x - 1}{3} = \frac{y + 2}{-4} = \frac{z - 5}{2}\). A student claims the direction ratios are \(3, -4, 2\) and a point on the line is \((1, -2, 5)\). Is the student correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
**Answer:** Yes, the student is correct. The denominators \(3, -4, 2\) are the direction ratios \(a, b, c\), and the numerators give the point \((x_1, y_1, z_1) = (1, -2, 5)\) because the standard form is \(\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}\).  
A wrong answer (e.g., saying the point is \((1, 2, -5)\)) shows the student does not handle the signs in the numerators correctly: they see \(y + 2\) and think \(y_1 = 2\) instead of \(-2\). This sign error is extremely common and propagates into wrong parametric equations and wrong intersection points with planes.

## DIAGNOSTIC_QUESTION_3
Find the Cartesian equation of the line passing through the points \(A(3, -1, 2)\) and \(B(5, 2, -4)\). Show all steps.

## DIAGNOSTIC_ANSWER_3
**Solution:**  
Step 1: Direction ratios = \(x_2 - x_1, y_2 - y_1, z_2 - z_1 = 5-3, 2-(-1), -4-2 = 2, 3, -6\).  
Step 2: Use point A \((3, -1, 2)\) and direction ratios \(2, 3, -6\).  
Step 3: Cartesian form: \(\frac{x - 3}{2} = \frac{y + 1}{3} = \frac{z - 2}{-6}\).  
**Answer:** \(\frac{x - 3}{2} = \frac{y + 1}{3} = \frac{z - 2}{-6}\).  
A wrong answer like \(\frac{x - 3}{2} = \frac{y - 1}{3} = \frac{z - 2}{-6}\) (sign error in \(y+1\)) or using direction ratios \(3-5, -1-2, 2-(-4) = -2, -3, 6\) but then writing \(\frac{x - 3}{-2} = \frac{y + 1}{-3} = \frac{z - 2}{6}\) is also correct because direction ratios can be scaled by \(-1\). However, if the student writes \(\frac{x - 5}{2} = \frac{y - 2}{3} = \frac{z + 4}{-6}\) using point B, that is equally valid. The error to catch: using coordinates of one point with direction ratios computed from the other point inconsistently (e.g., point A with direction ratios from B to A but without adjusting signs).

## DIAGNOSTIC_QUESTION_4
Two lines are given: \(L_1: \frac{x - 2}{1} = \frac{y + 3}{2} = \frac{z - 1}{-2}\) and \(L_2: \vec{r} = (4\hat{i} - \hat{j} + 3\hat{k}) + \mu(2\hat{i} + 4\hat{j} - 4\hat{k})\). Are \(L_1\) and \(L_2\) parallel? Justify your answer without finding the angle between them.

## DIAGNOSTIC_ANSWER_4
**Answer:** Yes, \(L_1\) and \(L_2\) are parallel. Direction ratios of \(L_1\) are \(1, 2, -2\). Direction ratios of \(L_2\) are \(2, 4, -4\). Since \((2, 4, -4) = 2 \times (1, 2, -2)\), the direction ratios are proportional, so the lines are parallel (or coincident if they share a point).  
A wrong answer that says "not parallel because the numbers are different" reveals the student does not understand that direction ratios are not unique — any non-zero scalar multiple represents the same direction. This misconception also affects angle calculations and shortest distance problems later.

## DIAGNOSTIC_QUESTION_5
A student solves: "Find the vector equation of the line through \((1, 2, -3)\) parallel to the line \(\frac{x - 4}{2} = \frac{y + 1}{-3} = \frac{z - 5}{1}\)." Their working:  
"Direction ratios of given line: \(2, -3, 1\).  
Vector equation: \(\vec{r} = (2\hat{i} - 3\hat{j} + \hat{k}) + \lambda(\hat{i} + 2\hat{j} - 3\hat{k})\)."  
Identify the two errors in the student's answer.

## DIAGNOSTIC_ANSWER_5
**Errors:**  
1. The position vector of the given point \((1, 2, -3)\) should be \(\hat{i} + 2\hat{j} - 3\hat{k}\), but the student wrote \(2\hat{i} - 3\hat{j} + \hat{k}\) — they used the direction ratios as the point's coordinates.  
2. The direction vector should be \(2\hat{i} - 3\hat{j} + \hat{k}\) (from the given line's direction ratios), but the student wrote \(\hat{i} + 2\hat{j} - 3\hat{k}\) — they used the point's coordinates as the direction vector.  
The student completely swapped the roles of the point and the direction. This is the same role-reversal error as in Diagnostic 1, but now in a slightly more complex setting where the direction must be extracted from another line's equation.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (Indian context) that requires finding the equation of a line in 3D space. The problem must involve at least two steps: first finding a direction vector from given data, then writing the line equation. Provide the complete solution.

## DIAGNOSTIC_ANSWER_6
**Sample Problem:** A metro train in Delhi starts from station \(A(2, -1, 3)\) (coordinates in km from a reference point) and moves toward station \(B(5, 2, -3)\). Write the vector equation of the train's path. If the train travels at 60 km/h, find its position vector after 10 minutes.  
**Solution:**  
Step 1: Direction vector \(\overrightarrow{AB} = (5-2)\hat{i} + (2+1)\hat{j} + (-3-3)\hat{k} = 3\hat{i} + 3\hat{j} - 6\hat{k}\).  
Step 2: Vector equation: \(\vec{r} = (2\hat{i} - \hat{j} + 3\hat{k}) + \lambda(3\hat{i} + 3\hat{j} - 6\hat{k})\).  
Step 3: Speed = 60 km/h = 1 km/min. In 10 min, distance = 10 km. The magnitude of direction vector = \(\sqrt{9+9+36} = \sqrt{54} = 3\sqrt{6}\) km. So \(\lambda = \frac{10}{3\sqrt{6}} = \frac{5\sqrt{6}}{9}\).  
Step 4: Position after 10 min: \(\vec{r} = (2\hat{i} - \hat{j} + 3\hat{k}) + \frac{5\sqrt{6}}{9}(3\hat{i} + 3\hat{j} - 6\hat{k}) = \left(2 + \frac{5\sqrt{6}}{3}\right)\hat{i} + \left(-1 + \frac{5\sqrt{6}}{3}\right)\hat{j} + \left(3 - \frac{10\sqrt{6}}{3}\right)\hat{k}\).  
A poor answer would give a problem that only asks for the equation without using the parameter \(\lambda\) for a physical quantity (time, distance), or would not show the conversion from speed to \(\lambda\). This reveals the student sees the parameter as an abstract symbol, not a measurable quantity.

## COMMON_MISCONCEPTION
**Sign errors in Cartesian form numerators:** When the Cartesian equation is written as \(\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}\), students often misread \(y + 2\) as \(y_1 = 2\) instead of \(-2\), or \(z - (-5)\) as \(z_1 = 5\) instead of \(-5\). They treat the operation in the numerator (addition/subtraction) as the coordinate sign directly. For example, given \(\frac{x - 3}{2} = \frac{y + 4}{-1} = \frac{z - (-2)}{5}\), they write the point as \((3, 4, -2)\) instead of \((3, -4, -2)\). This happens because they pattern-match "\(x - \text{number}\)" and "\(y + \text{number}\)" without applying the algebraic identity \(y - y_1 = y + 4 \implies y_1 = -4\). This error propagates to wrong parametric equations, wrong intersection points, and wrong distance calculations.

## ON_FAILURE
If a student makes the sign error in Cartesian numerators:  
1. Have them rewrite the equation as \(\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}\) explicitly, then match each numerator to the pattern "variable minus coordinate".  
2. Practice 5 examples where coordinates are negative: e.g., point \((-2, 3, -5)\) with direction ratios \(1, -2, 4\) → equation \(\frac{x + 2}{1} = \frac{y - 3}{-2} = \frac{z + 5}{4}\). Ask them to state \(x_1, y_1, z_1\) from the equation.  
3. Use the "plug-back" check: substitute the claimed point into the equation; if it gives \(\frac{0}{a} = \frac{0}{b} = \frac{0}{c}\), the point is correct. If not, the signs are wrong.  
4. Revisit node **c11_math_cbse_10_009** (Point-Slope Form in 2D) to reinforce that \(y - y_1 = m(x - x_1)\) becomes \(y - 3 = 2(x + 1)\) for point \((-1, 3)\) — the same sign logic applies in 3D.

## PREREQUISITE_NODE_IDS
c12_math_cbse_11_001, c11_math_cbse_12_001, c11_math_cbse_12_002, c11_math_cbse_10_009, c11_math_cbse_10_010, c11_math_cbse_12_003

## PREREQUISITE_REASONS
c12_math_cbse_11_001: Direction ratios and direction cosines are the components of the direction vector \(\vec{b}\) used in the line equation.
c11_math_cbse_12_001: Coordinates of a point in 3D space are needed to write the position vector \(\vec{a}\) and the Cartesian numerators \((x - x_1)\).
c11_math_cbse_12_002: Distance formula in 3D underlies the magnitude of the direction vector, used when converting between parameter \(\lambda\) and actual distance.
c11_math_cbse_10_009: Point-slope form \(y - y_1 = m(x - x_1)\) in 2D is the direct analog of the 3D Cartesian form; students must see the pattern extension.
c11_math_cbse_10_010: Two-point form in 2D \(\frac{y - y_1}{y_2 - y_1} = \frac{x - x_1}{x_2 - x_1}\) extends directly to the 3D two-point form \(\frac{x - x_1}{x_2 - x_1} = \frac{y - y_1}{y_2 - y_1} = \frac{z - z_1}{z_2 - z_1}\).
c11_math_cbse_12_003: Revisit c11_math_cbse_12_003 (Section Formula in 3D) to practice vector subtraction for direction ratios, and c11_math_cbse_10_009 (Point-Slope Form) to recall how the 2D line equation uses a point and a slope.  

## FORWARD_NODE_IDS
c12_math_cbse_11_003, c12_math_cbse_11_004, c12_math_cbse_11_005, c12_math_cbse_11_010
## FORWARD_REASONS
c12_math_cbse_11_003: Angle between two lines requires extracting direction vectors from line equations (vector or Cartesian form).
c12_math_cbse_11_004: Shortest distance between skew lines uses the vector equations of both lines and the cross product of their direction vectors.
c12_math_cbse_11_005: Distance between parallel lines uses the vector equation of one line and a point on the other.
c12_math_cbse_11_010: Angle between a line and a plane requires the line's direction vector from its equation.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_12_001, c11_math_cbse_10_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_12_001: 3D coordinates are used in physics (Class 11/12) for position vectors of particles; the line equation describes rectilinear motion.
c11_math_cbse_10_006: Slope of a line in 2D (rate of change) extends to direction ratios in 3D, which in physics represent velocity components \(v_x, v_y, v_z\) for motion in space.

## CHAIN_DESCRIPTION
c11_math_cbse_12_001 -> c12_math_cbse_11_001 -> c12_math_cbse_11_002 -> c12_math_cbse_11_003

## THIS_FORMULA
Vector form: \(\vec{r} = \vec{a} + \lambda \vec{b}\)  
Cartesian form: \(\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}\)  
Two-point form: \(\frac{x - x_1}{x_2 - x_1} = \frac{y - y_1}{y_2 - y_1} = \frac{z - z_1}{z_2 - z_1}\)

## FORMULA_VARIABLES
\(\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}\) (position vector of any point P on the line), \(\vec{a} = x_1\hat{i} + y_1\hat{j} + z_1\hat{k}\) (position vector of given point A), \(\vec{b} = a\hat{i} + b\hat{j} + c\hat{k}\) (direction vector parallel to the line), \(\lambda \in \mathbb{R}\) (scalar parameter), \((x_1, y_1, z_1)\) coordinates of point A, \(a, b, c\) direction ratios (non-zero, not all zero), \((x_2, y_2, z_2)\) coordinates of second point B.

## FORMULA_UNITS
dimensionless (coordinates are in units of length, e.g., metres; direction ratios have same units; \(\lambda\) is dimensionless if \(\vec{b}\) is a unit vector, otherwise \(\lambda\) has units of 1/length)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_12_001 | 3D coordinates from this node are used in physics (Class 11 Kinematics) to describe position vectors \(\vec{r}(t)\); a line equation with parameter \(\lambda = t\) gives uniform motion in a straight line.
c11_math_cbse_10_006 | Slope \(m = \tan\theta\) in 2D becomes direction ratios \((a, b, c)\) in 3D; in physics, these are the components of velocity \(\vec{v} = v_x\hat{i} + v_y\hat{j} + v_z\hat{k}\) for a particle moving in space.
## PREREQ_CONCEPT
Vector addition and scalar multiplication: \(\vec{r} - \vec{a} = \lambda \vec{b}\) means the vector from A to P is a scalar multiple of the direction vector.

## PREREQ_BEFORE
Student must be able to write a vector in component form given its initial and terminal points, and compute the difference of two position vectors to get a direction vector.

## PREREQ_STUCK
Revisit **c11_math_cbse_12_003** (Section Formula in 3D) to practice vector subtraction for direction ratios, and **c11_math_cbse_10_009** (Point-Slope Form) to recall how the 2D line equation uses a point and a slope.

## WORKED_EXAMPLE_1
**PROBLEM:** A telephone wire is stretched between two poles. The base of the first pole is at \(A(10, 5, 0)\) metres and the base of the second pole is at \(B(25, -3, 0)\) metres. The wire is attached at a height of 8 m on the first pole and 6 m on the second pole. Find the vector equation of the wire. If a bird sits on the wire at a point where the x-coordinate is 16 m, find the height of the bird above the ground.

**STEPS:**
- Step 1: Coordinates of attachment points: \(A'(10, 5, 8)\) and \(B'(25, -3, 6)\) (adding z-coordinates for height).
- Step 2: Direction vector \(\overrightarrow{A'B'} = (25-10)\hat{i} + (-3-5)\hat{j} + (6-8)\hat{k} = 15\hat{i} - 8\hat{j} - 2\hat{k}\).
- Step 3: Vector equation using point A': \(\vec{r} = (10\hat{i} + 5\hat{j} + 8\hat{k}) + \lambda(15\hat{i} - 8\hat{j} - 2\hat{k})\).
- Step 4: For the bird, x-coordinate = 16. From parametric: \(x = 10 + 15\lambda = 16 \Rightarrow 15\lambda = 6 \Rightarrow \lambda = \frac{6}{15} = \frac{2}{5} = 0.4\).
- Step 5: Find z-coordinate (height): \(z = 8 + (-2)\lambda = 8 - 2 \times 0.4 = 8 - 0.8 = 7.2\) m.

**REASONING:** The wire is a straight line segment in 3D. We use the two attachment points to get the direction vector. The parameter \(\lambda = 0\) at A' and \(\lambda = 1\) at B'. The bird's x-coordinate gives \(\lambda\), which then gives the height via the linear interpolation in z.

**ANSWER:** Vector equation: \(\vec{r} = (10\hat{i} + 5\hat{j} + 8\hat{k}) + \lambda(15\hat{i} - 8\hat{j} - 2\hat{k})\); bird's height = 7.2 m.

## WORKED_EXAMPLE_2
**PROBLEM:** The Cartesian equation of a line is \(\frac{x + 1}{3} = \frac{y - 2}{-4} = \frac{z + 5}{2}\). (a) Write its vector equation. (b) Find the coordinates of the point where this line intersects the XY-plane. (c) Find the distance of this intersection point from the origin.

**STEPS:**
- Step 1 (a): Identify point and direction ratios from Cartesian form: numerators give \(x - (-1), y - 2, z - (-5)\) so point \(A(-1, 2, -5)\). Denominators give direction ratios \(3, -4, 2\). Vector equation: \(\vec{r} = (-\hat{i} + 2\hat{j} - 5\hat{k}) + \lambda(3\hat{i} - 4\hat{j} + 2\hat{k})\).
- Step 2 (b): XY-plane has \(z = 0\). From parametric: \(z = -5 + 2\lambda = 0 \Rightarrow 2\lambda = 5 \Rightarrow \lambda = 2.5\). Then \(x = -1 + 3(2.5) = -1 + 7.5 = 6.5\), \(y = 2 - 4(2.5) = 2 - 10 = -8\). Intersection point: \((6.5, -8, 0)\).
- Step 3 (c): Distance from origin \((0,0,0)\): \(\sqrt{(6.5)^2 + (-8)^2 + 0^2} = \sqrt{42.25 + 64} = \sqrt{106.25} = \frac{\sqrt{425}}{2} = \frac{5\sqrt{17}}{2} \approx 10.31\) m.

**REASONING:** The Cartesian form directly reveals a point and direction ratios. Intersection with a coordinate plane is found by setting the corresponding coordinate to zero and solving for \(\lambda\). Distance from origin uses the 3D distance formula.

**ANSWER:** (a) \(\vec{r} = (-\hat{i} + 2\hat{j} - 5\hat{k}) + \lambda(3\hat{i} - 4\hat{j} + 2\hat{k})\); (b) \((6.5, -8, 0)\); (c) \(\frac{5\sqrt{17}}{2}\) units (≈ 10.31 m).

## WORKED_EXAMPLE_3
**PROBLEM:** A line passes through the point \(P(2, -1, 3)\) and is perpendicular to the plane \(2x - 3y + 4z = 12\). Find the vector and Cartesian equations of the line. Also find the foot of the perpendicular from \(P\) to the plane.

**STEPS:**
- Step 1: The normal vector to the plane \(2x - 3y + 4z = 12\) is \(\vec{n} = 2\hat{i} - 3\hat{j} + 4\hat{k}\). Since the line is perpendicular to the plane, it is parallel to \(\vec{n}\). So direction ratios = \(2, -3, 4\).
- Step 2: Vector equation: \(\vec{r} = (2\hat{i} - \hat{j} + 3\hat{k}) + \lambda(2\hat{i} - 3\hat{j} + 4\hat{k})\).
- Step 3: Cartesian equation: \(\frac{x - 2}{2} = \frac{y + 1}{-3} = \frac{z - 3}{4}\).
- Step 4: Foot of perpendicular is the intersection of this line with the plane. Parametric: \(x = 2 + 2\lambda\), \(y = -1 - 3\lambda\), \(z = 3 + 4\lambda\).
- Step 5: Substitute into plane equation: \(2(2 + 2\lambda) - 3(-1 - 3\lambda) + 4(3 + 4\lambda) = 12\).
- Step 6: \(4 + 4\lambda + 3 + 9\lambda + 12 + 16\lambda = 12 \Rightarrow 19 + 29\lambda = 12 \Rightarrow 29\lambda = -7 \Rightarrow \lambda = -\frac{7}{29}\).
- Step 7: Foot coordinates: \(x = 2 + 2(-\frac{7}{29}) = \frac{58 - 14}{29} = \frac{44}{29}\), \(y = -1 - 3(-\frac{7}{29}) = \frac{-29 + 21}{29} = -\frac{8}{29}\), \(z = 3 + 4(-\frac{7}{29}) = \frac{87 - 28}{29} = \frac{59}{29}\). Foot = \(\left(\frac{44}{29}, -\frac{8}{29}, \frac{59}{29}\right)\).

**REASONING:** A line perpendicular to a plane has direction vector parallel to the plane's normal vector. The foot of the perpendicular is the intersection of the line with the plane, found by substituting the line's parametric coordinates into the plane equation. This combines line equation (this node) with plane equation (future node c12_math_cbse_11_006) — a typical JEE/NEET multi-concept problem.

**ANSWER:** Vector: \(\vec{r} = (2\hat{i} - \hat{j} + 3\hat{k}) + \lambda(2\hat{i} - 3\hat{j} + 4\hat{k})\); Cartesian: \(\frac{x - 2}{2} = \frac{y + 1}{-3} = \frac{z - 3}{4}\); Foot = \(\left(\frac{44}{29}, -\frac{8}{29}, \frac{59}{29}\right)\).

## COMPETENCY_QUESTION_1
**QUESTION:** A civil engineer is designing a straight ramp for wheelchair access in a building. The ramp starts at point \(A(0, 0, 0)\) (ground level) and must reach a platform at height 1.5 m at point \(B(6, 4, 1.5)\). The ramp must have a constant slope. (a) Write the vector equation of the ramp's centre line. (b) Building regulations require the slope (ratio of vertical rise to horizontal distance) to be at most 1:12. Does this ramp comply? Justify with calculations. (c) If the ramp is 2 m wide, and the centre line is the midline, find the vector equation of one edge of the ramp given that the edge is parallel to the centre line and passes through a point 1 m directly to the left of A when viewed from above (i.e., negative y-direction).

**COMPETENCY:** Translating real-world situations to mathematical expressions and applying geometric reasoning with regulatory constraints.

**STEPS:**
- Step 1: Direction vector \(\overrightarrow{AB} = 6\hat{i} + 4\hat{j} + 1.5\hat{k}\). Vector equation: \(\vec{r} = \lambda(6\hat{i} + 4\hat{j} + 1.5\hat{k})\).
- Step 2: Horizontal distance from A to B = \(\sqrt{6^2 + 4^2} = \sqrt{52} = 2\sqrt{13} \approx 7.21\) m. Vertical rise = 1.5 m. Slope = \(\frac{1.5}{2\sqrt{13}} = \frac{1.5}{7.21} \approx 0.208\). Required max slope = \(1/12 \approx 0.0833\). Since \(0.208 > 0.0833\), ramp does NOT comply.
- Step 3: Edge line: parallel to centre line, so same direction vector. Point on edge: 1 m left of A in negative y-direction: \(A'(0, -1, 0)\). Vector equation: \(\vec{r} = (0\hat{i} - 1\hat{j} + 0\hat{k}) + \mu(6\hat{i} + 4\hat{j} + 1.5\hat{k})\).

**ANSWER:** (a) \(\vec{r} = \lambda(6\hat{i} + 4\hat{j} + 1.5\hat{k})\); (b) No, slope ≈ 0.208 > 1/12 ≈ 0.0833; (c) \(\vec{r} = -\hat{j} + \mu(6\hat{i} + 4\hat{j} + 1.5\hat{k})\).

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** Two drones are flying along straight paths. Drone 1's path: \(\frac{x - 1}{2} = \frac{y + 2}{-1} = \frac{z - 3}{1}\). Drone 2's path: \(\vec{r} = (4\hat{i} + \hat{j} - 2\hat{k}) + \mu(\hat{i} - 2\hat{j} + 3\hat{k})\). (a) Show that the paths are not parallel. (b) Find the shortest distance between the two paths. (c) If Drone 1 is at \((1, -2, 3)\) at \(t = 0\) and moves at 5 m/s along its path, and Drone 2 is at \((4, 1, -2)\) at \(t = 0\) and moves at 7 m/s along its path, find the time when the distance between the drones is minimum. (Assume they move in the direction of increasing parameter.)

**COMPETENCY:** Multi-concept application: line equations, skew lines distance, parameter-time relationship, optimization.

**STEPS:**
- Step 1 (a): Direction ratios of Drone 1: \(2, -1, 1\). Drone 2: \(1, -2, 3\). Not proportional (no scalar \(k\) such that \((2, -1, 1) = k(1, -2, 3)\)). So not parallel.
- Step 2 (b): Use shortest distance formula for skew lines. \(\vec{a_1} = \hat{i} - 2\hat{j} + 3\hat{k}\), \(\vec{b_1} = 2\hat{i} - \hat{j} + \hat{k}\). \(\vec{a_2} = 4\hat{i} + \hat{j} - 2\hat{k}\), \(\vec{b_2} = \hat{i} - 2\hat{j} + 3\hat{k}\). \(\vec{a_2} - \vec{a_1} = 3\hat{i} + 3\hat{j} - 5\hat{k}\). \(\vec{b_1} \times \vec{b_2} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 2 & -1 & 1 \\ 1 & -2 & 3 \end{vmatrix} = \hat{i}(-3+2) - \hat{j}(6-1) + \hat{k}(-4+1) = -\hat{i} - 5\hat{j} - 3\hat{k}\). \(| \vec{b_1} \times \vec{b_2} | = \sqrt{1 + 25 + 9} = \sqrt{35}\). \((\vec{a_2} - \vec{a_1}) \cdot (\vec{b_1} \times \vec{b_2}) = (3)(-1) + (3)(-5) + (-5)(-3) = -3 -15 +15 = -3\). Distance = \(\frac{|-3|}{\sqrt{35}} = \frac{3}{\sqrt{35}}\) units.
- Step 3 (c): Position of Drone 1: \(\vec{r_1} = (\hat{i} - 2\hat{j} + 3\hat{k}) + \frac{5t}{|\vec{b_1}|}(2\hat{i} - \hat{j} + \hat{k}) = \vec{a_1} + \frac{5t}{\sqrt{6}}\vec{b_1}\). Position of Drone 2: \(\vec{r_2} = (4\hat{i} + \hat{j} - 2\hat{k}) + \frac{7t}{\sqrt{14}}\vec{b_2} = \vec{a_2} + \frac{7t}{\sqrt{14}}\vec{b_2}\). Vector between them: \(\vec{d}(t) = \vec{r_2} - \vec{r_1} = (\vec{a_2} - \vec{a_1}) + t\left(\frac{7}{\sqrt{14}}\vec{b_2} - \frac{5}{\sqrt{6}}\vec{b_1}\right)\). Minimize \(|\vec{d}(t)|^2\) by setting derivative to zero. Let \(\vec{v} = \frac{7}{\sqrt{14}}\vec{b_2} - \frac{5}{\sqrt{6}}\vec{b_1}\). Then \(|\vec{d}|^2 = |\vec{a_2} - \vec{a_1}|^2 + 2t (\vec{a_2} - \vec{a_1})\cdot \vec{v} + t^2 |\vec{v}|^2\). Minimum at \(t = -\frac{(\vec{a_2} - \vec{a_1})\cdot \vec{v}}{|\vec{v}|^2}\). Compute \(\vec{v}\) and dot products numerically: \(\frac{7}{\sqrt{14}} = \frac{7}{\sqrt{14}} = \frac{\sqrt{14}}{2} \approx 1.8708\), \(\frac{5}{\sqrt{6}} \approx 2.0412\). \(\vec{v} \approx 1.8708(\hat{i} - 2\hat{j} + 3\hat{k}) - 2.0412(2\hat{i} - \hat{j} + \hat{k}) = (1.8708 - 4.0824)\hat{i} + (-3.7416 + 2.0412)\hat{j} + (5.6124 - 2.0412)\hat{k} = -2.2116\hat{i} - 1.7004\hat{j} + 3.5712\hat{k}\). \((\vec{a_2} - \vec{a_1}) = 3\hat{i} + 3\hat{j} - 5\hat{k}\). Dot product = \(3(-2.2116) + 3(-1.7004) + (-5)(3.5712) = -6.6348 - 5.1012 - 17.856 = -29.592\). \(|\vec{v}|^2 \approx 4.891 + 2.891 + 12.754 = 20.536\). \(t = -(-29.592)/20.536 \approx 1.441\) seconds.

**ANSWER:** (a) Direction ratios not proportional; (b) Shortest distance = \(\frac{3}{\sqrt{35}}\) units; (c) Minimum distance at \(t \approx 1.44\) s.

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The equation of a line in 3D space ______ the set of all points (x, y, z) that lie on a straight line.

## DIAGNOSTIC_ANSWER_7
describes

Describes is the equation's verb: the line's equation is a membership rule, and every point either satisfies it or does not. **A wrong answer (defines twice) reveals the student has written near-synonyms where the definition's own verb was given.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To describe this path mathematically, we need the ______ of the starting point and the direction ratios.

## DIAGNOSTIC_ANSWER_8
coordinates

The coordinates are the start's address: direction ratios say where the path heads, but the journey still needs its origin. **A wrong answer (the direction vector twice) reveals the student has supplied heading twice and forgotten the departure point.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The equation of a line in ______D space describes the set of all points (x, y, z) that lie on a straight line.

## DIAGNOSTIC_ANSWER_9
3

The three is space's dimension count: the line lives in three-dimensional space, one coordinate offset per axis. **A wrong answer (another dimension) reveals the student has moved the line to a flatland or a four-space it was never written for.** The three is the space's count: one offset fraction per axis, chained into a single equality.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: To describe this path ______, we need the coordinates of the starting point and the direction ratios.

## DIAGNOSTIC_ANSWER_10
mathematically

Mathematically is the description's register: the path must be captured in equations, not photographs. **A wrong answer (a verbally) reveals the student has substituted prose for the precision the coordinates supply.** Mathematically is the precision register: coordinates and ratios, not photographs, are what the description accepts.
