## ELI5
A drone must fly from the warehouse at the origin to a tower three blocks east, four north, twelve up: its position vector is three i-hats, four j-hats, twelve k-hats, and its length is the three-dimensional distance formula's answer - thirteen grid units. Dividing each component by that length yields the direction cosines, three numbers whose squares sum to one; any triple proportional to them is a direction-ratio stand-in. The cosines are the unit vector's own components.

## DEFINITION
The position vector of a point P(x, y, z) with respect to the origin O(0, 0, 0) is the vector \(\vec{OP} = x\hat{i} + y\hat{j} + z\hat{k}\). Its magnitude is \(|\vec{OP}| = \sqrt{x^2 + y^2 + z^2}\). The direction angles \(\alpha, \beta, \gamma\) are the angles made by the vector with the positive x, y, z axes respectively. The direction cosines are \(l = \cos\alpha\), \(m = \cos\beta\), \(n = \cos\gamma\), satisfying \(l^2 + m^2 + n^2 = 1\). The direction ratios \(a, b, c\) are any three numbers proportional to \(l, m, n\) (i.e., \(a = lr, b = mr, c = nr\) where \(r = |\vec{OP}|\)).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can compute the position vector and its magnitude for any point in 3D space, determine direction cosines and direction ratios from given components or angles, verify the relation \(l^2 + m^2 + n^2 = 1\), and convert between direction cosines and direction ratios. They can also find the coordinates of a point given its distance from origin and direction cosines.

## SCOPE_BOUNDARY
This node covers position vectors in three-dimensional space, direction angles, direction cosines, direction ratios, and their interrelationships (\(l^2+m^2+n^2=1\), \(a:b:c = l:m:n\)). It does NOT cover vector addition, scalar/dot product, vector/cross product, section formula, or vector equation of a line — these are handled in subsequent nodes (c12_math_cbse_10_003 onwards).

## WALKTHROUGH
Imagine a drone delivering a package from a warehouse at the origin O(0,0,0) to a building at point P(3, 4, 12) in a 3D city grid where each unit is 100 metres. To program the drone's flight path, we need the straight-line displacement vector from O to P — this is the position vector \(\vec{OP}\). First, write down the coordinates of P. Then construct the position vector using unit vectors \(\hat{i}, \hat{j}, \hat{k}\). Compute its magnitude using the 3D distance formula (recall Class 11: \(OP = \sqrt{x^2+y^2+z^2}\)). Next, find the angles this vector makes with the x, y, z axes — these are the direction angles. Their cosines are the direction cosines. Notice that the coordinates (3, 4, 12) divided by the magnitude 13 give exactly the direction cosines. The key insight: the components of a unit vector in the direction of \(\vec{OP}\) ARE the direction cosines.

Takeaway first: the position vector packages coordinates into an arrow, its magnitude is the 3D distance from the origin, and the components-over-magnitude are simultaneously direction cosines and the unit vector's parts. Exam moves: computation questions on position vectors and magnitudes, cosine questions from components or angles, verification questions on the sum-of-squares identity, and conversion questions between cosines and ratios. Method: rerun the drone - components read off the tower, magnitude by the distance formula, cosines by division, the identity checked. Check yourself: direction ratios are any proportional triple, so they do not satisfy the sum-of-squares law; only the cosines, already normalised, do. Drill: compute one position vector's magnitude, cosines and a ratio triple, then verify the identity.

## DIAGNOSTIC_QUESTION_1
What are the direction cosines of the position vector of point P(2, -3, 6)? Write them as an ordered triple (l, m, n).

## DIAGNOSTIC_ANSWER_1
The magnitude is \(r = \sqrt{2^2 + (-3)^2 + 6^2} = \sqrt{4+9+36} = \sqrt{49} = 7\). Direction cosines are \(l = \frac{2}{7}, m = \frac{-3}{7}, n = \frac{6}{7}\). A wrong answer like (2, -3, 6) reveals the student confuses direction ratios (components) with direction cosines. A wrong answer like \(\left(\frac{2}{\sqrt{49}}, \frac{3}{\sqrt{49}}, \frac{6}{\sqrt{49}}\right)\) (missing the negative sign on m) reveals sign errors when coordinates are negative — students often take absolute values incorrectly.

## DIAGNOSTIC_QUESTION_2
A vector has direction ratios 2, -3, 6. Can its direction cosines be \(\left(\frac{2}{7}, \frac{3}{7}, \frac{6}{7}\right)\)? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
No. Direction ratios 2, -3, 6 give magnitude \(\sqrt{4+9+36}=7\). The direction cosines must be \(\left(\frac{2}{7}, \frac{-3}{7}, \frac{6}{7}\right)\). The proposed cosines have m positive, but the direction ratio b = -3 is negative, so \(\cos\beta\) must be negative. A student who says "yes" does not understand that direction cosines preserve the signs of direction ratios — they are the components of the UNIT vector in the same direction, so signs must match. This misconception leads to errors in JEE problems where the quadrant/octant of the vector matters.

## DIAGNOSTIC_QUESTION_3
Find the position vector of a point P which is at a distance 13 units from the origin and has direction cosines \(\left(\frac{3}{13}, \frac{-4}{13}, \frac{12}{13}\right)\). Also find the coordinates of P.

## DIAGNOSTIC_ANSWER_3
Given \(r = 13\) and \(l = \frac{3}{13}, m = \frac{-4}{13}, n = \frac{12}{13}\). Coordinates: \(x = lr = 3\), \(y = mr = -4\), \(z = nr = 12\). Position vector: \(\vec{OP} = 3\hat{i} - 4\hat{j} + 12\hat{k}\). Verification: \(|\vec{OP}| = \sqrt{9+16+144} = \sqrt{169} = 13\). A wrong answer like \(3\hat{i} + 4\hat{j} + 12\hat{k}\) (ignoring the negative sign in m) shows the student treats direction cosines as mere ratios without sign significance. A wrong answer like \(\frac{3}{13}\hat{i} - \frac{4}{13}\hat{j} + \frac{12}{13}\hat{k}\) (giving the unit vector instead of position vector) shows confusion between "position vector" (magnitude = distance) and "unit vector" (magnitude = 1).

## DIAGNOSTIC_QUESTION_4
Two vectors \(\vec{a}\) and \(\vec{b}\) have direction cosines \((l_1, m_1, n_1)\) and \((l_2, m_2, n_2)\) respectively. If \(\vec{a}\) and \(\vec{b}\) are perpendicular, which of the following must be true?
(A) \(l_1l_2 + m_1m_2 + n_1n_2 = 0\)
(B) \(l_1l_2 + m_1m_2 + n_1n_2 = 1\)
(C) \(l_1 = l_2, m_1 = m_2, n_1 = n_2\)
(D) \(l_1 + l_2 = m_1 + m_2 = n_1 + n_2 = 0\)

## DIAGNOSTIC_ANSWER_4
Correct answer: (A). For perpendicular vectors, \(\vec{a} \cdot \vec{b} = 0\). In terms of direction cosines and magnitudes \(r_1, r_2\): \(\vec{a} \cdot \vec{b} = (r_1 l_1)(r_2 l_2) + (r_1 m_1)(r_2 m_2) + (r_1 n_1)(r_2 n_2) = r_1 r_2 (l_1 l_2 + m_1 m_2 + n_1 n_2) = 0\). Since \(r_1, r_2 \neq 0\), we get \(l_1 l_2 + m_1 m_2 + n_1 n_2 = 0\). A student choosing (B) confuses perpendicularity with the identity \(l^2+m^2+n^2=1\) for a single vector. Choosing (C) thinks perpendicular means equal direction cosines (actually parallel). Choosing (D) has no mathematical basis. This tests whether the student can connect direction cosines to the dot product concept (covered later in c12_math_cbse_10_004).

## DIAGNOSTIC_QUESTION_5
A student claims: "If a vector has direction ratios 1, 2, 2, then its direction cosines are \(\frac{1}{3}, \frac{2}{3}, \frac{2}{3}\) because \(1^2+2^2+2^2=9\) and \(\sqrt{9}=3\)." Is this claim always correct? If not, give a counterexample and explain the condition under which it would be correct.

## DIAGNOSTIC_ANSWER_5
The claim is NOT always correct. Direction ratios are proportional to direction cosines, but the proportionality constant can be positive OR negative. If the vector's direction ratios are 1, 2, 2, the direction cosines could be \(\left(\frac{1}{3}, \frac{2}{3}, \frac{2}{3}\right)\) OR \(\left(-\frac{1}{3}, -\frac{2}{3}, -\frac{2}{3}\right)\) depending on the actual direction of the vector. The student's claim assumes the direction ratios given are the actual components (i.e., the vector is \(1\hat{i}+2\hat{j}+2\hat{k}\)), but "direction ratios 1, 2, 2" only specifies the ratio, not the signs. The claim would be correct only if it is additionally given that the vector makes acute angles with all axes (all direction cosines positive). This is a classic JEE trap — direction ratios determine direction cosines only up to an overall sign.

## DIAGNOSTIC_QUESTION_6
Construct a problem where a point P in 3D space has integer coordinates, its distance from the origin is an integer, and its direction cosines are all distinct non-zero rational numbers. Provide the coordinates of P, its distance from origin, and its direction cosines. Explain your construction method.

## DIAGNOSTIC_ANSWER_6
Example: P(2, 3, 6). Distance \(r = \sqrt{4+9+36} = \sqrt{49} = 7\). Direction cosines: \(\frac{2}{7}, \frac{3}{7}, \frac{6}{7}\) — all distinct, non-zero, rational. Construction method: Find a Pythagorean quadruple \(x^2+y^2+z^2 = r^2\) with integer x,y,z,r and x,y,z all distinct and non-zero. (2,3,6,7) is the smallest such quadruple. Another: P(1, 4, 8), r=9, direction cosines \(\frac{1}{9}, \frac{4}{9}, \frac{8}{9}\). A poor answer would give coordinates like (3, 4, 12) — correct but not showing the "construction method" reasoning. A student who cannot produce this lacks the number-sense connection between 3D distance and Pythagorean quadruples, which appears in JEE Advanced integer-answer questions.

## COMMON_MISCONCEPTION
Students confuse **direction ratios** with **direction cosines**. They write "direction cosines are 2, -3, 6" when these are actually direction ratios (components). They forget that direction cosines MUST satisfy \(l^2+m^2+n^2=1\) and are ALWAYS the components of a UNIT vector. Another error: when given direction ratios a, b, c, they compute \(l = \frac{a}{\sqrt{a^2+b^2+c^2}}\) but drop the sign of negative components (e.g., for ratios 2, -3, 6 they write \(\frac{2}{7}, \frac{3}{7}, \frac{6}{7}\)). They also confuse "position vector of P" (which has magnitude = OP) with "unit vector along OP" (magnitude = 1). In board exams, this costs 1-2 marks per question; in JEE, it leads to wrong answers in physics (e.g., electric field direction) and mathematics (vector geometry).

## ON_FAILURE
If a student makes the above errors:
1. **Revisit c11_math_cbse_12_001** (Coordinates of a Point in 3D Space) — ensure they can plot points and identify octants from signs of coordinates.
2. **Revisit c11_math_cbse_12_002** (Distance Between Two Points in 3D) — practice magnitude calculation \(\sqrt{x^2+y^2+z^2}\) with negative coordinates.
3. **Do this remedial drill**: Take vector \(\vec{v} = -2\hat{i} + 3\hat{j} - 6\hat{k}\). (a) Write its magnitude. (b) Write its direction ratios. (c) Write its direction cosines WITH correct signs. (d) Write the unit vector along \(\vec{v}\). (e) Write the position vector of a point at distance 14 along the same direction. Check each step: magnitude = 7, direction ratios = -2, 3, -6, direction cosines = \(-\frac{2}{7}, \frac{3}{7}, -\frac{6}{7}\), unit vector = same as direction cosines, position vector = \(-4\hat{i} + 6\hat{j} - 12\hat{k}\). Repeat until signs are automatic.

## PREREQUISITE_NODE_IDS
c12_math_cbse_10_001, c11_math_cbse_12_001, c11_math_cbse_12_002, c9_math_ch1_4

## PREREQUISITE_REASONS
c12_math_cbse_10_001: Defines vectors, scalars, magnitude, and basic terminology (initial/terminal point, zero/unit vectors) needed to understand position vector as a specific type of vector.
c11_math_cbse_12_001: Introduces 3D coordinate system, coordinates of a point (x,y,z), and octants — essential to interpret the components of a position vector.
c11_math_cbse_12_002: Provides the 3D distance formula \(PQ = \sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}\) which directly gives the magnitude of a position vector when one point is the origin.
c9_math_ch1_4: Derives the 2D distance formula using Pythagoras theorem; the 3D version is a double application of the same principle, reinforcing why the magnitude formula works.

## FORWARD_NODE_IDS
c12_math_cbse_10_003, c12_math_cbse_10_004, c12_math_cbse_10_007, c12_math_cbse_10_005, c12_math_cbse_10_006, c12_math_cbse_10_008

## FORWARD_REASONS
c12_math_cbse_10_003: Vector addition uses position vectors to represent points; triangle/parallelogram laws are applied to position vectors of vertices.
c12_math_cbse_10_004: Scalar product formula \(\vec{a} \cdot \vec{b} = a_1b_1+a_2b_2+a_3b_3\) is derived using components; direction cosines appear as \(\cos\theta = l_1l_2+m_1m_2+n_1n_2\).
c12_math_cbse_10_007: Section formula finds position vector of a point dividing a line segment; requires expressing points via position vectors and using component-wise operations.
c12_math_cbse_10_005: Position vectors and direction cosines are used to express vectors in component form.  
c12_math_cbse_10_006: Direction cosines and unit vectors ($\hat{i},\hat{j},\hat{k}$) are used to express vectors in component form and find unit vector along $\vec{b}$.  
c12_math_cbse_10_008: Position vector concept is essential to write **a** and **r**; direction cosines/ratios help interpret direction vector **b**.  

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_04_001, c12_phy_cbse_01_001
## CROSS_SUBJECT_REASONS
c12_physics_ch4_001: Motion in a Plane (Physics Ch 4) uses position vectors \(\vec{r} = x\hat{i}+y\hat{j}\) for 2D motion; extends to 3D in later chapters. Velocity and acceleration are derivatives of the position vector. Understanding direction cosines helps resolve vectors into components.
c12_physics_ch1_001: Units and Measurements (Physics Ch 1) establishes coordinate systems, unit vectors, and the concept of resolving a vector into rectangular components — directly uses direction cosines/ratios for 3D force/field problems.
c12_phy_cbse_04_001: Cross-subject support: The Lorentz force is the total electromagnetic force experienced by a charge \(q\) moving... supplies tools/facts used directly in this node.  
c12_phy_cbse_01_001: Cross-subject support: Electric charge is a fundamental intrinsic property of matter that causes it to experience... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_12_001 -> c12_math_cbse_10_001 -> c12_math_cbse_10_002 -> c12_math_cbse_10_003

## THIS_FORMULA
Position vector: \(\vec{OP} = x\hat{i} + y\hat{j} + z\hat{k}\); Magnitude: \(|\vec{OP}| = r = \sqrt{x^2+y^2+z^2}\); Direction cosines: \(l = \frac{x}{r}, m = \frac{y}{r}, n = \frac{z}{r}\); Relation: \(l^2+m^2+n^2 = 1\); Direction ratios: \(a = x, b = y, c = z\) (or any proportional triple); Coordinates from direction cosines: \(x = lr, y = mr, z = nr\).

## FORMULA_VARIABLES
x, y, z = coordinates of point P (real numbers, units of length); r = magnitude of position vector = distance OP (positive real, same units as x,y,z); l, m, n = direction cosines = cos α, cos β, cos γ (dimensionless, range [-1, 1]); α, β, γ = direction angles with positive x, y, z axes (0 ≤ α, β, γ ≤ π); a, b, c = direction ratios (real numbers, same units as x,y,z, proportional to l,m,n).

## FORMULA_UNITS
x, y, z, r, a, b, c: metres (m), centimetres (cm), or any length unit; l, m, n: dimensionless (ratios of lengths).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_04_001 | Position vector \(\vec{r}(t)\) describes particle trajectory; velocity \(\vec{v} = d\vec{r}/dt\) uses components; direction cosines give direction of motion.
 c12_phy_cbse_01_001 | Resolution of vectors in 3D: force \(\vec{F} = F_x\hat{i}+F_y\hat{j}+F_z\hat{k}\) where \(F_x = F \cos\alpha\) etc. — direct application of direction cosines.
 c12_chem_cbse_01_001 | Crystal lattice directions in solid state chemistry use Miller indices (h,k,l) which are proportional to direction ratios of normal to planes.
## PREREQ_CONCEPT
3D coordinate geometry: coordinates of a point, distance formula in 3D, and the concept of a vector as a directed line segment with magnitude and direction.

## PREREQ_BEFORE
The student must be able to plot a point in 3D space given its coordinates, compute the distance between two points in 3D, and write a vector in component form using \(\hat{i}, \hat{j}, \hat{k}\).

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_12_001 (3D coordinates) and c11_math_cbse_12_002 (3D distance formula) — practice finding distance from origin for points with negative coordinates until the magnitude calculation is automatic.

## WORKED_EXAMPLE_1
PROBLEM: A drone takes off from a warehouse at the origin O(0, 0, 0) and hovers at point P. The drone's GPS shows its coordinates as (12, -4, 3) where each unit is 10 metres. Find (i) the position vector of the drone, (ii) its straight-line distance from the warehouse, (iii) the direction cosines of its position vector, and (iv) the angles it makes with the positive x, y, z axes (in degrees, to one decimal place).

STEPS:
- Step 1: Identify given data. Coordinates of P: x = 12, y = -4, z = 3. Scale: 1 unit = 10 m. Write the position vector using unit vectors: \(\vec{OP} = 12\hat{i} - 4\hat{j} + 3\hat{k}\).
- Step 2: Compute the magnitude (distance from origin). \(r = |\vec{OP}| = \sqrt{x^2 + y^2 + z^2} = \sqrt{12^2 + (-4)^2 + 3^2} = \sqrt{144 + 16 + 9} = \sqrt{169} = 13\) units. Actual distance = 13 × 10 m = 130 m.
- Step 3: Find direction cosines using \(l = \frac{x}{r}, m = \frac{y}{r}, n = \frac{z}{r}\). \(l = \frac{12}{13}, m = \frac{-4}{13}, n = \frac{3}{13}\). Verify: \(l^2+m^2+n^2 = \frac{144}{169} + \frac{16}{169} + \frac{9}{169} = \frac{169}{169} = 1\).
- Step 4: Find direction angles. \(\alpha = \cos^{-1}(l) = \cos^{-1}(12/13) \approx 22.6^\circ\), \(\beta = \cos^{-1}(m) = \cos^{-1}(-4/13) \approx 108.0^\circ\), \(\gamma = \cos^{-1}(n) = \cos^{-1}(3/13) \approx 76.7^\circ\). Note: β > 90° because y is negative (drone is in the octant where y < 0).
- Step 5: Interpret results. The drone is 130 m from the warehouse. Its position vector points mostly along +x (acute angle), somewhat along +z (acute angle), and opposite to +y (obtuse angle).

REASONING: The position vector directly encodes the coordinates as components. Magnitude uses the 3D Pythagorean theorem (distance formula). Direction cosines are the components of the unit vector in the same direction — they normalize the position vector to length 1 while preserving signs. The angles come from inverse cosine; the sign of each cosine tells us whether the angle is acute (positive cosine) or obtuse (negative cosine), which corresponds to the octant of the point.

ANSWER: (i) \(\vec{OP} = 12\hat{i} - 4\hat{j} + 3\hat{k}\) (ii) 130 m (iii) \(l = \frac{12}{13}, m = -\frac{4}{13}, n = \frac{3}{13}\) (iv) \(\alpha \approx 22.6^\circ, \beta \approx 108.0^\circ, \gamma \approx 76.7^\circ\)

## WORKED_EXAMPLE_2
PROBLEM: A vector \(\vec{a}\) has magnitude 15 and direction ratios 2, -3, 6. Find (i) the direction cosines of \(\vec{a}\), (ii) the vector \(\vec{a}\) in component form, (iii) the coordinates of the point P such that \(\vec{a} = \vec{OP}\).

STEPS:
- Step 1: Note that direction ratios are given as 2, -3, 6. These are proportional to the direction cosines. First, find the magnitude of the direction ratios vector: \(\sqrt{2^2 + (-3)^2 + 6^2} = \sqrt{4+9+36} = \sqrt{49} = 7\).
- Step 2: The direction cosines are the direction ratios divided by their magnitude, BUT we must consider the sign. Since the magnitude of \(\vec{a}\) is given as 15 (positive), the direction cosines are \(l = \frac{2}{7}, m = \frac{-3}{7}, n = \frac{6}{7}\). (The sign of m is negative because the direction ratio b = -3 is negative. The overall sign of the vector is already captured by the direction ratios.)
- Step 3: Verify \(l^2+m^2+n^2 = \frac{4}{49}+\frac{9}{49}+\frac{36}{49} = 1\). Correct.
- Step 4: The vector \(\vec{a}\) has magnitude 15. Its components are \(x = lr = \frac{2}{7} \times 15 = \frac{30}{7}\), \(y = mr = -\frac{3}{7} \times 15 = -\frac{45}{7}\), \(z = nr = \frac{6}{7} \times 15 = \frac{90}{7}\). So \(\vec{a} = \frac{30}{7}\hat{i} - \frac{45}{7}\hat{j} + \frac{90}{7}\hat{k}\).
- Step 5: Alternatively, scale the direction ratios directly: since direction ratios are 2, -3, 6 and their magnitude is 7, the vector of magnitude 15 is \(\frac{15}{7}(2\hat{i} - 3\hat{j} + 6\hat{k}) = \frac{30}{7}\hat{i} - \frac{45}{7}\hat{j} + \frac{90}{7}\hat{k}\). Same result.
- Step 6: The point P has coordinates equal to the components of \(\vec{a}\) (since \(\vec{a} = \vec{OP}\)). So P = \(\left(\frac{30}{7}, -\frac{45}{7}, \frac{90}{7}\right)\). Check: \(OP = \sqrt{\left(\frac{30}{7}\right)^2 + \left(-\frac{45}{7}\right)^2 + \left(\frac{90}{7}\right)^2} = \frac{1}{7}\sqrt{900+2025+8100} = \frac{1}{7}\sqrt{11025} = \frac{105}{7} = 15\). Correct.

REASONING: Direction ratios define the direction up to a scalar multiple. To get the actual vector of given magnitude, we first find the unit vector in that direction (direction cosines) by normalizing the direction ratios. Then multiply by the desired magnitude. The coordinates of the terminal point (with initial point at origin) are exactly the components of the position vector. The sign of each direction cosine is determined by the sign of the corresponding direction ratio — this is crucial.

ANSWER: (i) \(l = \frac{2}{7}, m = -\frac{3}{7}, n = \frac{6}{7}\) (ii) \(\vec{a} = \frac{30}{7}\hat{i} - \frac{45}{7}\hat{j} + \frac{90}{7}\hat{k}\) (iii) P = \(\left(\frac{30}{7}, -\frac{45}{7}, \frac{90}{7}\right)\)

## WORKED_EXAMPLE_3
PROBLEM: A line passes through the origin O and makes angles of 60° and 45° with the positive x-axis and y-axis respectively. Find the angle it makes with the positive z-axis. If a point P on this line is at a distance 10 units from the origin, find its coordinates and position vector.

STEPS:
- Step 1: Given direction angles: \(\alpha = 60^\circ\), \(\beta = 45^\circ\). Find \(\gamma\) using \(l^2+m^2+n^2=1\). \(l = \cos 60^\circ = \frac{1}{2}\), \(m = \cos 45^\circ = \frac{1}{\sqrt{2}}\).
- Step 2: Compute \(l^2+m^2 = \frac{1}{4} + \frac{1}{2} = \frac{3}{4}\). Then \(n^2 = 1 - \frac{3}{4} = \frac{1}{4}\), so \(n = \pm \frac{1}{2}\).
- Step 3: Since the line makes an angle with the positive z-axis, and by convention direction angles are in [0, π], we have two possibilities: \(\gamma = \cos^{-1}(1/2) = 60^\circ\) or \(\gamma = \cos^{-1}(-1/2) = 120^\circ\). Both are valid — the line could go "upwards" (positive z) or "downwards" (negative z) from the origin. We'll find coordinates for both cases.
- Step 4: Given r = OP = 10. Coordinates: \(x = lr = 10 \times \frac{1}{2} = 5\), \(y = mr = 10 \times \frac{1}{\sqrt{2}} = 5\sqrt{2}\). For \(\gamma = 60^\circ\): \(z = nr = 10 \times \frac{1}{2} = 5\). For \(\gamma = 120^\circ\): \(z = 10 \times (-\frac{1}{2}) = -5\).
- Step 5: Position vectors: Case 1 (γ=60°): \(\vec{OP} = 5\hat{i} + 5\sqrt{2}\hat{j} + 5\hat{k}\). Case 2 (γ=120°): \(\vec{OP} = 5\hat{i} + 5\sqrt{2}\hat{j} - 5\hat{k}\).
- Step 6: Verify magnitudes: \(|\vec{OP}| = \sqrt{25 + 50 + 25} = \sqrt{100} = 10\). Check direction cosines: Case 1: \(\frac{5}{10}=\frac{1}{2}\), \(\frac{5\sqrt{2}}{10}=\frac{1}{\sqrt{2}}\), \(\frac{5}{10}=\frac{1}{2}\) → α=60°, β=45°, γ=60°. Case 2: \(\frac{5}{10}=\frac{1}{2}\), \(\frac{5\sqrt{2}}{10}=\frac{1}{\sqrt{2}}\), \(\frac{-5}{10}=-\frac{1}{2}\) → α=60°, β=45°, γ=120°. Both satisfy the given conditions.

REASONING: The relation \(l^2+m^2+n^2=1\) is the key constraint linking the three direction angles. Given two angles, the third is determined up to a sign (two possible lines, symmetric about the xy-plane). The coordinates scale linearly with distance r via \(x=lr, y=mr, z=nr\). This problem combines direction angles, direction cosines, and position vector — a typical multi-concept question in board exams (3-4 marks) and JEE Main (single correct MCQ).

ANSWER: Angle with z-axis: 60° or 120°. For 60°: P(5, 5√2, 5), \(\vec{OP} = 5\hat{i} + 5\sqrt{2}\hat{j} + 5\hat{k}\). For 120°: P(5, 5√2, -5), \(\vec{OP} = 5\hat{i} + 5\sqrt{2}\hat{j} - 5\hat{k}\).

## COMPETENCY_QUESTION_1
QUESTION: A weather balloon is released from a meteorological station at point O. After some time, its position vector relative to O is \(\vec{r} = 4\hat{i} - 3\hat{j} + 12\hat{k}\) km. (a) Find the straight-line distance of the balloon from the station. (b) Find the direction cosines of \(\vec{r}\). (c) The balloon's instruments measure the angle of elevation from the station as \(\theta\) and the bearing (angle from north in the horizontal plane) as \(\phi\). Express \(\theta\) and \(\phi\) in terms of the direction cosines. (d) If the balloon rises vertically by 5 km (so its new position vector is \(\vec{r}' = 4\hat{i} - 3\hat{j} + 17\hat{k}\) km), find the new direction cosines and explain why the horizontal bearing \(\phi\) remains unchanged.

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting geometric meaning of direction cosines in terms of elevation and bearing.

STEPS:
- Step 1: Compute magnitude \(r = \sqrt{4^2+(-3)^2+12^2} = \sqrt{16+9+144} = \sqrt{169} = 13\) km. Distance = 13 km.
- Step 2: Direction cosines: \(l = \frac{4}{13}, m = -\frac{3}{13}, n = \frac{12}{13}\).
- Step 3: Angle of elevation \(\theta\) is the angle with the horizontal plane (xy-plane). The vertical component is z = 12, horizontal projection magnitude = \(\sqrt{x^2+y^2} = \sqrt{16+9} = 5\). So \(\sin\theta = \frac{z}{r} = n = \frac{12}{13}\), \(\theta = \sin^{-1}(12/13)\). Bearing \(\phi\) is the angle of the horizontal projection with the y-axis (north). The horizontal projection has components (4, -3). \(\cos\phi = \frac{m_{\text{horiz}}}{\text{horizontal magnitude}}\) but careful: standard bearing is from north (y-axis). The direction cosines of the horizontal projection are \(\frac{l}{\sqrt{l^2+m^2}}, \frac{m}{\sqrt{l^2+m^2}}\). So \(\cos\phi = \frac{m}{\sqrt{l^2+m^2}} = \frac{-3/13}{5/13} = -\frac{3}{5}\), \(\sin\phi = \frac{l}{\sqrt{l^2+m^2}} = \frac{4}{5}\). Thus \(\phi = \cos^{-1}(-3/5)\) (in second quadrant, since x>0, y<0).
- Step 4: New position vector \(\vec{r}' = 4\hat{i} - 3\hat{j} + 17\hat{k}\). New magnitude \(r' = \sqrt{16+9+289} = \sqrt{314}\). New direction cosines: \(l' = \frac{4}{\sqrt{314}}, m' = -\frac{3}{\sqrt{314}}, n' = \frac{17}{\sqrt{314}}\). Horizontal projection components unchanged (4, -3), so \(\sqrt{l'^2+m'^2} = \frac{5}{\sqrt{314}}\). \(\cos\phi' = \frac{m'}{\sqrt{l'^2+m'^2}} = \frac{-3/\sqrt{314}}{5/\sqrt{314}} = -\frac{3}{5}\) — same as before. Vertical rise changes n but not the ratio l:m, so bearing unchanged.

ANSWER: (a) 13 km (b) \(\left(\frac{4}{13}, -\frac{3}{13}, \frac{12}{13}\right)\) (c) \(\sin\theta = n\), \(\cos\phi = \frac{m}{\sqrt{l^2+m^2}}\), \(\sin\phi = \frac{l}{\sqrt{l^2+m^2}}\) (d) New direction cosines: \(\left(\frac{4}{\sqrt{314}}, -\frac{3}{\sqrt{314}}, \frac{17}{\sqrt{314}}\right)\). Bearing unchanged because horizontal components (x,y) are unchanged — vertical motion doesn't affect horizontal direction.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: (JEE Advanced style) Let \(\vec{a}, \vec{b}, \vec{c}\) be three mutually perpendicular vectors of equal magnitude \(k\). A point P has position vector \(\vec{p} = \vec{a} + \vec{b} + \vec{c}\). (i) Find the magnitude of \(\vec{p}\). (ii) Find the direction cosines of \(\vec{p}\) with respect to the directions of \(\vec{a}, \vec{b}, \vec{c}\) as coordinate axes. (iii) If the coordinate axes are rotated so that the new x'-axis is along \(\vec{p}\), find the direction cosines of the old axes (directions of \(\vec{a}, \vec{b}, \vec{c}\)) with respect to the new axes.

COMPETENCY: Combining vector algebra, direction cosines, and coordinate transformation — multi-step analytical reasoning with geometric interpretation.

STEPS:
- Step 1: Since \(\vec{a}, \vec{b}, \vec{c}\) are mutually perpendicular and have equal magnitude \(k\), we can treat them as orthogonal axes. \(\vec{a} \cdot \vec{b} = \vec{b} \cdot \vec{c} = \vec{c} \cdot \vec{a} = 0\), and \(|\vec{a}| = |\vec{b}| = |\vec{c}| = k\).
- Step 2: \(\vec{p} = \vec{a} + \vec{b} + \vec{c}\). Magnitude: \(|\vec{p}|^2 = \vec{p} \cdot \vec{p} = (\vec{a}+\vec{b}+\vec{c})\cdot(\vec{a}+\vec{b}+\vec{c}) = |\vec{a}|^2+|\vec{b}|^2+|\vec{c}|^2 + 2(\vec{a}\cdot\vec{b}+\vec{b}\cdot\vec{c}+\vec{c}\cdot\vec{a}) = k^2+k^2+k^2+0 = 3k^2\). So \(|\vec{p}| = k\sqrt{3}\).
- Step 3: Direction cosines of \(\vec{p}\) w.r.t. axes along \(\vec{a}, \vec{b}, \vec{c}\): The component of \(\vec{p}\) along \(\vec{a}\) is \(\vec{p} \cdot \hat{a}\) where \(\hat{a} = \frac{\vec{a}}{k}\). \(\vec{p} \cdot \hat{a} = (\vec{a}+\vec{b}+\vec{c})\cdot\frac{\vec{a}}{k} = \frac{|\vec{a}|^2}{k} = k\). So direction cosine \(l_a = \frac{k}{|\vec{p}|} = \frac{k}{k\sqrt{3}} = \frac{1}{\sqrt{3}}\). Similarly \(l_b = l_c = \frac{1}{\sqrt{3}}\). Check: \(l_a^2+l_b^2+l_c^2 = \frac{1}{3}+\frac{1}{3}+\frac{1}{3}=1\).
- Step 4: Rotate axes so new x'-axis is along \(\vec{p}\). The old axes directions are \(\hat{a}, \hat{b}, \hat{c}\). The direction cosines of old x-axis (\(\hat{a}\)) w.r.t. new axes: The new axes are \(\hat{p} = \frac{\vec{p}}{k\sqrt{3}} = \frac{1}{\sqrt{3}}(\hat{a}+\hat{b}+\hat{c})\), and we need two more mutually perpendicular unit vectors \(\hat{q}, \hat{r}\) in the plane perpendicular to \(\hat{p}\). But we only need the direction cosines of \(\hat{a}, \hat{b}, \hat{c}\) relative to the new x'-axis (i.e., their cosines with \(\hat{p}\)). These are exactly \(\hat{a}\cdot\hat{p} = \frac{1}{\sqrt{3}}\), \(\hat{b}\cdot\hat{p} = \frac{1}{\sqrt{3}}\), \(\hat{c}\cdot\hat{p} = \frac{1}{\sqrt{3}}\). So each old axis makes angle \(\cos^{-1}(1/\sqrt{3})\) with the new x'-axis.

ANSWER: (i) \(|\vec{p}| = k\sqrt{3}\) (ii) Direction cosines: \(\left(\frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}, \frac{1}{\sqrt{3}}\right)\) (iii) Each of the old axes makes an angle \(\cos^{-1}(1/\sqrt{3})\) with the new x'-axis; their direction cosines with respect to the new x'-axis are all \(\frac{1}{\sqrt{3}}\). (The full set of new direction cosines for each old axis requires choosing new y', z' axes, but the x'-direction cosine is uniquely \(\frac{1}{\sqrt{3}}\).)

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a drone delivering a package from a ______ at the origin O(0,0,0) to a building at point P(3, 4, 12) in a 3D city grid where each unit is 100 metres.

## DIAGNOSTIC_ANSWER_7
warehouse

The warehouse is the origin's alias: the flight starts where all position vectors agree to begin counting. **A wrong answer (a depot in town) reveals the student has moved the start away from the point all components are measured from.** The warehouse is where the counting starts: position vectors measure from the origin, and the origin here is that loading bay.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
They can also find the coordinates of a point given its distance from origin and direction cosines.

Mastery is the conversion circuit: position vector to magnitude to cosines to ratios - and one return trip given distance and cosines. **A wrong answer (cosines without ratios) reveals the student has learned half the dictionary this node exists to teach.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine a drone ______ a package from a warehouse at the origin O(0,0,0) to a building at point P(3, 4, 12) in a 3D city grid where each unit is 100 metres.

## DIAGNOSTIC_ANSWER_9
delivering

The delivering verb is the drone's mission: the vector is the flight plan, and its magnitude the straight-line distance flown. **A wrong answer (a loading verb) reveals the student has staged the pickup where the walkthrough stages the flight.**
