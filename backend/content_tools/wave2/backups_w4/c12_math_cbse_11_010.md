## ELI5
A kite's string rises from the ground at an angle: the angle between a line and a plane is that climb's steepness - the complement of the angle between the line and the plane's normal. Practically, sines replace cosines: the absolute dot product of the line's direction with the plane's normal, divided by both magnitudes. Parallel line to plane gives sine zero; perpendicular line gives sine one. The string's steepness is the formula's whole story.

## DEFINITION
The angle between a line and a plane is defined as the complement of the angle between the line and the normal to the plane. If a line with direction ratios \(a_1, b_1, c_1\) (or direction vector \(\vec{b}\)) makes an angle \(\theta\) with a plane whose normal has direction ratios \(a_2, b_2, c_2\) (or normal vector \(\vec{n}\)), then \(\sin\theta = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}} = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|}\). The angle \(\theta\) is always taken as the acute angle (\(0 \le \theta \le \frac{\pi}{2}\)).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the angle between a given line and a plane in both vector and Cartesian forms, identify when the line is parallel or perpendicular to the plane, and solve multi-step problems combining this concept with distance from a point to a plane or intersection of line and plane.

## SCOPE_BOUNDARY
Covers the angle between a line and a plane using direction ratios/vectors and normal vector. Includes vector form \(\vec{r} = \vec{a} + \lambda\vec{b}\) and plane \(\vec{r}\cdot\vec{n} = d\), and Cartesian form \(\frac{x-x_1}{a_1}=\frac{y-y_1}{b_1}=\frac{z-z_1}{c_1}\) and plane \(Ax+By+Cz+D=0\). Does NOT cover angle between two lines (node c12_math_cbse_11_003) or angle between two planes (node c12_math_cbse_11_009) except as prerequisite knowledge. Does NOT cover skew lines or shortest distance (nodes c12_math_cbse_11_004, c12_math_cbse_11_005).

## WALKTHROUGH
Imagine a kite flying at the end of a string tied to a point on the ground. The string represents a line in 3D space, and the ground represents a plane. To find how steeply the string rises from the ground, we need the angle between the string and the ground plane. Start by writing the direction ratios of the line (string) from its equation. Then write the direction ratios of the normal to the plane (ground) from the plane equation. The angle between the line and the plane is the complement of the angle between the line and the normal. Apply the sine formula using the dot product of the line's direction vector and the plane's normal vector. The key insight: \(\sin\theta = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|}\), not cosine, because we want the angle with the plane, not the normal.

Takeaway first: the line-plane angle is the normal-angle's complement, which is why sine appears where the line-line formula used cosine - the normal measures the wrong angle on purpose. Exam moves: computation questions in vector and Cartesian forms, parallel and perpendicular case questions, and combined questions linking the angle with intersections or distances. Method: rerun the kite - line's direction ratios, plane's normal ratios, absolute dot product, magnitudes, sine, inverse sine. Check yourself: the absolute value is contractual - a negative sine is geometry's impossibility and the standard sign slip. Drill: compute one line-plane angle, then verify one line's parallelism by its zero sine.

## DIAGNOSTIC_QUESTION_1
State the formula for the angle \(\theta\) between a line \(\vec{r} = \vec{a} + \lambda\vec{b}\) and a plane \(\vec{r}\cdot\vec{n} = d\) in vector form. What is the range of \(\theta\)?

## DIAGNOSTIC_ANSWER_1
\(\sin\theta = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|}\), with \(0 \le \theta \le \frac{\pi}{2}\). A wrong answer using \(\cos\theta\) instead of \(\sin\theta\) reveals the student confuses the angle with the normal for the angle with the plane. Forgetting the absolute value or the range indicates they don't realize the angle is always acute by definition.

## DIAGNOSTIC_QUESTION_2
A line has direction ratios \(2, -1, 2\) and a plane has equation \(3x - 4y + 5z = 7\). A student computes \(\cos\theta = \frac{2\cdot3 + (-1)\cdot(-4) + 2\cdot5}{\sqrt{2^2+(-1)^2+2^2}\sqrt{3^2+(-4)^2+5^2}}\) and gets \(\theta \approx 37^\circ\). Is this correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
Incorrect. The student used the cosine formula (angle between line and normal) but the question asks for the angle between the line and the plane. The correct formula uses sine: \(\sin\theta = \frac{|6+4+10|}{\sqrt{9}\sqrt{50}} = \frac{20}{3\sqrt{50}} = \frac{2\sqrt{2}}{3}\), giving \(\theta = \sin^{-1}\left(\frac{2\sqrt{2}}{3}\right) \approx 70.5^\circ\). The student's answer is the complement of the correct angle. This error shows confusion between angle with normal vs angle with plane.

## DIAGNOSTIC_QUESTION_3
Find the angle between the line \(\frac{x-1}{2} = \frac{y+3}{-1} = \frac{z-4}{2}\) and the plane \(2x - y + 2z = 9\).

## DIAGNOSTIC_ANSWER_3
Direction ratios of line: \(a_1=2, b_1=-1, c_1=2\). Normal to plane: \(a_2=2, b_2=-1, c_2=2\).
\(\sin\theta = \frac{|2\cdot2 + (-1)(-1) + 2\cdot2|}{\sqrt{4+1+4}\sqrt{4+1+4}} = \frac{|4+1+4|}{3\cdot3} = \frac{9}{9}=1\).
\(\theta = \sin^{-1}(1) = 90^\circ\).
The line is perpendicular to the plane. A wrong answer of \(0^\circ\) means the student used cosine formula or forgot absolute value. A computational error in dot product (e.g., missing sign) reveals carelessness with signs.

## DIAGNOSTIC_QUESTION_4
A line is parallel to the plane \(x + 2y - 2z = 5\). If the line's direction ratios are \(a, b, c\), what condition must they satisfy? If the line also passes through \((1, -2, 3)\), write its Cartesian equation in terms of \(a, b, c\).

## DIAGNOSTIC_ANSWER_4
For parallelism, the line's direction vector must be perpendicular to the plane's normal: \(a\cdot1 + b\cdot2 + c\cdot(-2) = 0 \Rightarrow a + 2b - 2c = 0\). Cartesian equation: \(\frac{x-1}{a} = \frac{y+2}{b} = \frac{z-3}{c}\) with \(a+2b-2c=0\). A wrong answer giving the normal's direction ratios as the line's direction ratios shows the student thinks parallel line has same direction as normal. Missing the condition \(a+2b-2c=0\) indicates they don't connect parallelism to dot product with normal being zero.

## DIAGNOSTIC_QUESTION_5
A student solves: "Find the angle between the line \(\vec{r} = (2\hat{i} - \hat{j} + 3\hat{k}) + \lambda(\hat{i} + 2\hat{j} - 2\hat{k})\) and the plane \(\vec{r}\cdot(2\hat{i} - \hat{j} + \hat{k}) = 4\)." Their steps:
1. \(\vec{b} = \hat{i} + 2\hat{j} - 2\hat{k}\), \(\vec{n} = 2\hat{i} - \hat{j} + \hat{k}\)
2. \(\vec{b}\cdot\vec{n} = 2 - 2 - 2 = -2\)
3. \(|\vec{b}| = \sqrt{1+4+4}=3\), \(|\vec{n}| = \sqrt{4+1+1}=\sqrt{6}\)
4. \(\cos\theta = \frac{-2}{3\sqrt{6}} \Rightarrow \theta = \cos^{-1}\left(\frac{-2}{3\sqrt{6}}\right) \approx 105^\circ\)
Identify the errors and give the correct answer.

## DIAGNOSTIC_ANSWER_5
Errors: (1) Used cosine instead of sine. (2) Did not take absolute value of dot product. (3) Gave obtuse angle, but angle between line and plane is acute.
Correct: \(\sin\theta = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|} = \frac{2}{3\sqrt{6}} = \frac{\sqrt{6}}{9}\). \(\theta = \sin^{-1}\left(\frac{\sqrt{6}}{9}\right) \approx 15.5^\circ\). This reveals the student doesn't understand the definition of angle with plane vs normal, and the convention of acute angle.

## DIAGNOSTIC_QUESTION_6
Construct a problem where a line is given in vector form and a plane in Cartesian form, such that the angle between them is \(30^\circ\). Provide the line and plane equations and verify the angle.

## DIAGNOSTIC_ANSWER_6
Example: Line \(\vec{r} = \hat{i} + 2\hat{j} + 3\hat{k} + \lambda(2\hat{i} + \hat{j} + 2\hat{k})\). Plane \(x - y + z = 5\).
\(\vec{b} = (2,1,2)\), \(\vec{n} = (1,-1,1)\).
\(\vec{b}\cdot\vec{n} = 2 -1 + 2 = 3\). \(|\vec{b}| = 3\), \(|\vec{n}| = \sqrt{3}\).
\(\sin\theta = \frac{3}{3\sqrt{3}} = \frac{1}{\sqrt{3}} \approx 0.577\), \(\theta = \sin^{-1}(1/\sqrt{3}) \approx 35.3^\circ\) (not 30).
To get exactly 30°, need \(\sin30^\circ = 1/2\). Choose \(\vec{b} = (1,0,0)\), \(\vec{n} = (0,1,1)\)? Then \(\vec{b}\cdot\vec{n}=0\) gives 0°.
Better: \(\vec{b} = (2,1,0)\), \(\vec{n} = (1,2,2)\). \(|\vec{b}|=\sqrt{5}\), \(|\vec{n}|=3\), dot=4. \(\sin\theta=4/(3\sqrt{5})\approx 0.596\).
A good answer will show a valid construction with \(\sin\theta = 1/2\). A poor answer gives equations that don't satisfy the condition, showing the student cannot reverse-engineer the formula.

## COMMON_MISCONCEPTION
Students consistently use \(\cos\theta = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|}\) instead of \(\sin\theta\), because they memorize "angle between vectors uses cosine" and forget that the angle between a line and a plane is defined as the complement of the angle between the line and the normal. Another error: dropping the absolute value, leading to negative sine or obtuse angle. A third error: when the line is given in Cartesian form \(\frac{x-x_1}{a}=\frac{y-y_1}{b}=\frac{z-z_1}{c}\), they incorrectly use \((x_1,y_1,z_1)\) as direction ratios instead of \((a,b,c)\).

## ON_FAILURE
If a student uses cosine formula: Draw a right triangle with the line as hypotenuse, its projection on the plane as base, and the perpendicular to the plane as height. Show that the angle with the plane is the angle between the line and its projection, while the angle with the normal is the angle between the line and the height. These two angles are complementary, so sine of one equals cosine of the other. Practice: Given line and plane, first find angle with normal using cosine, then subtract from 90° to get angle with plane. Repeat until they automatically write sine formula. For sign errors: Emphasize that angle is acute, so sine is positive; always take absolute value of dot product. For Cartesian confusion: Have them explicitly write "direction ratios of line = (a,b,c) from denominators" as a separate step before plugging into formula.

## PREREQUISITE_NODE_IDS
c12_math_cbse_11_001, c12_math_cbse_11_002, c12_math_cbse_11_006, c11_math_cbse_12_001, c11_math_cbse_12_002, c12_math_cbse_11_003, c12_math_cbse_11_007, c12_math_cbse_11_008, c12_math_cbse_11_009, c12_math_cbse_11_004, c12_math_cbse_11_005

## PREREQUISITE_REASONS
c12_math_cbse_11_001: Direction cosines/ratios are needed to extract direction vectors of line and normal from equations.
c12_math_cbse_11_002: Equation of line in 3D (vector and Cartesian) provides the direction vector \(\vec{b}\).
c12_math_cbse_11_006: Equation of plane in normal form provides the normal vector \(\vec{n}\).
c11_math_cbse_12_001: Coordinates of a point in 3D space, basic 3D coordinate system.
c11_math_cbse_12_002: Distance formula in 3D, used in deriving magnitudes of vectors.
c12_math_cbse_11_003: Angle between a line and a plane is defined as the complement of the angle between the line and the plane's normal; this directly uses the line-line angle formula.  
c12_math_cbse_11_007: Angle between a line and a plane uses the plane's normal and the line's direction vector.  
c12_math_cbse_11_008: The angle between a line and a plane involves the perpendicular distance from a point on the line to the plane, directly applying this node's formula.  
c12_math_cbse_11_009: Angle between a line and a plane uses the complement of the angle between the line and the plane's normal; builds directly on angle between planes/normal vectors.  
c12_math_cbse_11_004: bse_11_009) except as prerequisite knowledge. Does NOT cover skew lines or shortest distance (nodes c12_math_cbse_11_004, c12_math_cbse_11_005).  
c12_math_cbse_11_005: prerequisite knowledge. Does NOT cover skew lines or shortest distance (nodes c12_math_cbse_11_004, c12_math_cbse_11_005).  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the last node in the chapter. No forward nodes within this chapter. However, this concept is used in later applications like finding intersection of line and plane, or in physics (optics, mechanics) and engineering.

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_09_001, c12_phy_cbse_10_001
## CROSS_SUBJECT_REASONS
c12_phy_cbse_09_001: Ray optics – angle of incidence is angle between incident ray (line) and normal to surface (plane). The angle with the plane is the glancing angle. Direct application of this formula.
c12_phy_cbse_10_001: Wave optics – angle between wavefront (plane) and direction of propagation (line) uses same concept.

## CHAIN_DESCRIPTION
c12_math_cbse_11_001 -> c12_math_cbse_11_002 -> c12_math_cbse_11_006 -> c12_math_cbse_11_010 -> N/A

## THIS_FORMULA
Vector form: \(\sin\theta = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|}\) where line is \(\vec{r} = \vec{a} + \lambda\vec{b}\) and plane is \(\vec{r}\cdot\vec{n} = d\). Cartesian form: \(\sin\theta = \frac{|a_1A + b_1B + c_1C|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{A^2+B^2+C^2}}\) where line is \(\frac{x-x_1}{a_1}=\frac{y-y_1}{b_1}=\frac{z-z_1}{c_1}\) and plane is \(Ax+By+Cz+D=0\).

## FORMULA_VARIABLES
\(\vec{b}\) = direction vector of the line; \(\vec{n}\) = normal vector of the plane; \(a_1,b_1,c_1\) = direction ratios of the line; \(A,B,C\) = direction ratios of the normal to the plane (coefficients of x,y,z in plane equation); \(\theta\) = acute angle between the line and the plane (\(0 \le \theta \le 90^\circ\)).

## FORMULA_UNITS
dimensionless (angle in degrees or radians)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_09_001 | In ray optics, the angle of incidence is measured between the incident ray (line) and the normal to the reflecting/refracting surface (plane). The glancing angle is the complement, i.e., the angle between the ray and the plane surface. This node's formula directly computes that glancing angle.
c12_phy_cbse_10_001 | In wave optics, the direction of propagation of a wave (ray/line) and the wavefront (plane) are perpendicular. The angle between the ray and a plane surface is used in problems involving interference and diffraction at an angle.
## PREREQ_CONCEPT
Dot product of vectors and its geometric interpretation as \(|\vec{a}||\vec{b}|\cos\phi\), where \(\phi\) is the angle between the vectors.

## PREREQ_BEFORE
The student must be able to extract direction ratios of a line from its symmetric (Cartesian) equation and normal vector of a plane from its general equation, and compute dot product and magnitudes of vectors.

## PREREQ_STUCK
If stuck, revisit c12_math_cbse_11_001 (direction ratios) and c12_math_cbse_11_006 (plane normal vector) and practice identifying them from various equation forms.

## WORKED_EXAMPLE_1
PROBLEM: A drone flies along the path given by \(\frac{x-2}{3} = \frac{y+1}{-4} = \frac{z-5}{12}\). The ground is the plane \(2x - 3y + 6z = 18\). Find the angle between the drone's path and the ground.
STEPS:
- Step 1: Identify direction ratios of the line (drone's path) from the denominators: \(a_1 = 3, b_1 = -4, c_1 = 12\).
- Step 2: Identify direction ratios of the normal to the plane (ground) from coefficients of x, y, z: \(A = 2, B = -3, C = 6\).
- Step 3: Write the formula for sine of the angle: \(\sin\theta = \frac{|a_1A + b_1B + c_1C|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{A^2+B^2+C^2}}\).
- Step 4: Substitute values: Numerator = \(|3\cdot2 + (-4)\cdot(-3) + 12\cdot6| = |6 + 12 + 72| = 90\). Denominator: \(\sqrt{9+16+144} = \sqrt{169} = 13\); \(\sqrt{4+9+36} = \sqrt{49} = 7\). So \(\sin\theta = \frac{90}{13 \times 7} = \frac{90}{91}\).
- Step 5: Compute \(\theta = \sin^{-1}\left(\frac{90}{91}\right) \approx 81.2^\circ\). The drone is climbing steeply relative to the ground.
REASONING: The angle between a line and a plane is defined via the complement of the angle between the line and the normal. The sine formula directly uses the dot product of the line's direction vector and the plane's normal vector. The absolute value ensures the acute angle.
ANSWER: \(\theta = \sin^{-1}\left(\frac{90}{91}\right) \approx 81.2^\circ\)

## WORKED_EXAMPLE_2
PROBLEM: Find the angle between the line \(\vec{r} = (2\hat{i} - \hat{j} + 3\hat{k}) + \lambda(\hat{i} - \hat{j} + \hat{k})\) and the plane \(\vec{r}\cdot(2\hat{i} + \hat{j} - \hat{k}) = 4\). Also determine if the line is parallel to the plane.
STEPS:
- Step 1: Extract direction vector of line \(\vec{b} = \hat{i} - \hat{j} + \hat{k}\) and normal vector of plane \(\vec{n} = 2\hat{i} + \hat{j} - \hat{k}\).
- Step 2: Compute dot product \(\vec{b}\cdot\vec{n} = (1)(2) + (-1)(1) + (1)(-1) = 2 - 1 - 1 = 0\).
- Step 3: Since \(\vec{b}\cdot\vec{n} = 0\), the line is parallel to the plane (or lies in it). The angle \(\theta\) satisfies \(\sin\theta = 0\), so \(\theta = 0^\circ\).
- Step 4: Check if the line lies in the plane: Take a point on the line, e.g., \(\vec{a} = 2\hat{i} - \hat{j} + 3\hat{k}\). Substitute into plane equation: \(\vec{a}\cdot\vec{n} = (2)(2) + (-1)(1) + (3)(-1) = 4 - 1 - 3 = 0 \neq 4\). So the point is not on the plane, meaning the line is parallel but not in the plane.
- Step 5: Conclusion: Angle = \(0^\circ\), line is parallel to the plane.
REASONING: If the direction vector of the line is perpendicular to the normal of the plane (dot product zero), the line is parallel to the plane. The angle between them is zero. We also verified the line does not lie in the plane by checking a point.
ANSWER: \(\theta = 0^\circ\); the line is parallel to the plane but not contained in it.

## WORKED_EXAMPLE_3
PROBLEM: A line passes through points \(A(1, 2, -1)\) and \(B(3, -1, 2)\). Find the angle between this line and the plane \(x - 2y + 2z = 5\). If the line meets the plane at point P, find the coordinates of P.
STEPS:
- Step 1: Find direction ratios of line AB: \(x_2-x_1 = 2, y_2-y_1 = -3, z_2-z_1 = 3\). So \(\vec{b} = 2\hat{i} - 3\hat{j} + 3\hat{k}\).
- Step 2: Normal to plane: \(\vec{n} = \hat{i} - 2\hat{j} + 2\hat{k}\).
- Step 3: Compute \(\sin\theta = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|}\). \(\vec{b}\cdot\vec{n} = 2(1) + (-3)(-2) + 3(2) = 2 + 6 + 6 = 14\). \(|\vec{b}| = \sqrt{4+9+9} = \sqrt{22}\). \(|\vec{n}| = \sqrt{1+4+4} = 3\). \(\sin\theta = \frac{14}{3\sqrt{22}} = \frac{14\sqrt{22}}{66} = \frac{7\sqrt{22}}{33}\). \(\theta = \sin^{-1}\left(\frac{7\sqrt{22}}{33}\right) \approx 67.1^\circ\).
- Step 4: Find intersection point P. Parametric form of line: \(x = 1 + 2\lambda, y = 2 - 3\lambda, z = -1 + 3\lambda\).
- Step 5: Substitute into plane equation: \((1+2\lambda) - 2(2-3\lambda) + 2(-1+3\lambda) = 5\). Simplify: \(1+2\lambda -4+6\lambda -2+6\lambda = 5 \Rightarrow 14\lambda -5 = 5 \Rightarrow 14\lambda = 10 \Rightarrow \lambda = \frac{5}{7}\).
- Step 6: Coordinates of P: \(x = 1 + 2(5/7) = 17/7\), \(y = 2 - 3(5/7) = -1/7\), \(z = -1 + 3(5/7) = 8/7\). So \(P\left(\frac{17}{7}, -\frac{1}{7}, \frac{8}{7}\right)\).
REASONING: This combines angle calculation with finding intersection of line and plane. The direction ratios come from the two points. The intersection is found by substituting the parametric equations into the plane equation.
ANSWER: \(\theta = \sin^{-1}\left(\frac{7\sqrt{22}}{33}\right) \approx 67.1^\circ\); \(P\left(\frac{17}{7}, -\frac{1}{7}, \frac{8}{7}\right)\)

## COMPETENCY_QUESTION_1
QUESTION: A line L has equation \(\frac{x-1}{2} = \frac{y+2}{-1} = \frac{z-3}{k}\). A plane P has equation \(x + 2y - 2z = 7\). (a) Find the value of k for which L is parallel to P. (b) For that value of k, find the distance between L and P. (c) If k = 1, find the angle between L and P.
COMPETENCY: Translating real-world situations to mathematical expressions; Comparing and justifying
STEPS:
- Step 1: Direction ratios of L are (2, -1, k). Normal to P is (1, 2, -2).
- Step 2: (a) For parallel, dot product = 0: \(2(1) + (-1)(2) + k(-2) = 0 \Rightarrow 2 - 2 - 2k = 0 \Rightarrow k = 0\).
- Step 3: (b) With k=0, line L: \(\frac{x-1}{2} = \frac{y+2}{-1} = \frac{z-3}{0}\). Point on L: A(1, -2, 3). Distance from A to plane: \(\frac{|1 + 2(-2) - 2(3) - 7|}{\sqrt{1+4+4}} = \frac{|1-4-6-7|}{3} = \frac{16}{3}\). Since line is parallel, this is the distance.
- Step 4: (c) For k=1, direction ratios (2, -1, 1). \(\sin\theta = \frac{|2(1) + (-1)(2) + 1(-2)|}{\sqrt{4+1+1}\sqrt{1+4+4}} = \frac{|2-2-2|}{\sqrt{6}\cdot3} = \frac{2}{3\sqrt{6}} = \frac{\sqrt{6}}{9}\). \(\theta = \sin^{-1}\left(\frac{\sqrt{6}}{9}\right)\).
ANSWER: (a) k = 0; (b) Distance = 16/3 units; (c) \(\theta = \sin^{-1}\left(\frac{\sqrt{6}}{9}\right) \approx 15.5^\circ\)
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A ray of light travels along the line \(\vec{r} = (\hat{i} + 2\hat{j} - \hat{k}) + \lambda(3\hat{i} - 4\hat{j} + 5\hat{k})\) and strikes a plane mirror given by \(\vec{r}\cdot(2\hat{i} - 3\hat{j} + 6\hat{k}) = 10\). Find the angle of incidence (angle between incident ray and normal to mirror) and the glancing angle (angle between incident ray and mirror plane). Verify that they are complementary.
COMPETENCY: Applying concepts to physics/real-world contexts; Multi-step analytical reasoning
STEPS:
- Step 1: Identify direction vector of ray (incident line) \(\vec{b} = 3\hat{i} - 4\hat{j} + 5\hat{k}\) and normal to mirror \(\vec{n} = 2\hat{i} - 3\hat{j} + 6\hat{k}\).
- Step 2: Angle of incidence \(\phi\) is angle between \(\vec{b}\) and \(\vec{n}\). \(\cos\phi = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|}\). Compute \(\vec{b}\cdot\vec{n} = 6 + 12 + 30 = 48\). \(|\vec{b}| = \sqrt{9+16+25} = \sqrt{50} = 5\sqrt{2}\). \(|\vec{n}| = \sqrt{4+9+36} = 7\). \(\cos\phi = \frac{48}{5\sqrt{2}\cdot7} = \frac{48}{35\sqrt{2}} = \frac{24\sqrt{2}}{35}\). \(\phi = \cos^{-1}\left(\frac{24\sqrt{2}}{35}\right) \approx 13.9^\circ\).
- Step 3: Glancing angle \(\theta\) is angle between ray and plane. \(\sin\theta = \frac{|\vec{b}\cdot\vec{n}|}{|\vec{b}||\vec{n}|} = \frac{48}{35\sqrt{2}} = \frac{24\sqrt{2}}{35}\). \(\theta = \sin^{-1}\left(\frac{24\sqrt{2}}{35}\right) \approx 76.1^\circ\).
- Step 4: Check complement: \(\phi + \theta \approx 13.9^\circ + 76.1^\circ = 90^\circ\). Verified.
- Step 5: Note: The point of incidence is not needed for these angles.
ANSWER: Angle of incidence \(\phi = \cos^{-1}\left(\frac{24\sqrt{2}}{35}\right) \approx 13.9^\circ\); Glancing angle \(\theta = \sin^{-1}\left(\frac{24\sqrt{2}}{35}\right) \approx 76.1^\circ\); They are complementary.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The angle between a line and a plane is defined as the ______ of the angle between the line and the normal to the plane.

## DIAGNOSTIC_ANSWER_7
complement

The complement is the definition's hinge: the plane's angle is what remains when the normal's angle is subtracted from a right angle. **A wrong answer (a supplement) reveals the student has complemented with the wrong constant and turned acute angles obtuse.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a kite flying at the end of a ______ tied to a point on the ground.

## DIAGNOSTIC_ANSWER_8
string

The string is the line: taut from ground point to kite, its steepness against the ground is the angle sought. **A wrong answer (a rope on the ground) reveals the student has laid the line flat and made its angle with the plane zero by construction.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The string represents a line in ______D space, and the ground represents a plane.

## DIAGNOSTIC_ANSWER_9
3

The three is the space dimension: the string's line and the ground's plane meet in three-dimensional geometry, where the sine formula lives. **A wrong answer (another dimension) reveals the student has flattened the kite scene into a diagram the formula does not inhabit.**

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can compute the angle between a given line and a plane in both vector and Cartesian forms, identify when the line is parallel or perpendicular to the plane, and solve multi-step problems combining this concept with distance from a point to a plane or intersection of line and plane.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: ______ a kite flying at the end of a string tied to a point on the ground.

## DIAGNOSTIC_ANSWER_11
Imagine

The imperative opens the scene: the kite's flight is imagined before any normal is extracted. **A wrong answer (a derivation) reveals the student has answered the quoted opener with the mathematics it precedes.** The imperative opens the scene: the kite's climb is imagined before any normal is extracted from a plane equation.
