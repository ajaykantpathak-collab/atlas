## ELI5
A sloping roof must pass through three corners of the house: two vectors along the roof's edges, crossed, yield the normal; the normal plus any one corner complete the plane. The vector equation r dot n equals a dot n says every roof point's dot with the normal matches the known corner's - the plane's membership test. In coordinates it reads A times x minus x-one plus B times y minus y-one plus C times z minus z-one equals zero.

## DEFINITION
A plane in three-dimensional space is uniquely determined if it passes through a given point and has a known normal vector (direction perpendicular to the plane). The vector equation is \(\mathbf{r} \cdot \mathbf{n} = \mathbf{a} \cdot \mathbf{n}\), where \(\mathbf{a}\) is the position vector of the given point, \(\mathbf{n}\) is the normal vector, and \(\mathbf{r}\) is the position vector of any point on the plane. The Cartesian form is \(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\), where \((x_1, y_1, z_1)\) is the given point and \(A, B, C\) are the direction ratios of the normal.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can derive both vector and Cartesian equations of a plane passing through a given point with a specified normal vector, and can also find the equation of a plane passing through three non-collinear points by first determining the normal vector via cross product.

## SCOPE_BOUNDARY
This node covers the equation of a plane passing through a single point with given normal direction (vector and Cartesian forms) and the equation of a plane passing through three non-collinear points. It does NOT cover the distance of a point from a plane, angle between two planes, angle between a line and a plane, or the equation of a plane passing through the intersection of two planes (these are subsequent nodes).

## WALKTHROUGH
Imagine an architect designing a sloping roof for a house. The roof is a flat plane that must pass through three specific corner points of the building: \((2, 3, 5)\), \((4, 1, 6)\), and \((3, 5, 7)\). To write the equation of this roof plane, we first need a vector perpendicular to the roof. We can get this by taking two vectors along the roof edges (from one corner to the other two) and computing their cross product. This normal vector, together with any one of the three points, gives us the plane equation. The key insight is that a plane is completely defined by a point and a normal vector — just as a line in 2D is defined by a point and a slope. We start by writing the position vector of the known point, then use the dot product with the normal vector to enforce perpendicularity.

Takeaway first: point plus normal is the plane's complete specification, and three non-collinear points manufacture the normal by crossing two edge vectors. Exam moves: writing questions from point-plus-normal data, three-point questions building the normal by cross product, conversion questions between vector and Cartesian forms, and membership questions testing points. Method: rerun the roof - edges as vectors, cross product for the normal, dot with a corner, expand. Check yourself: the three corners must not be collinear - a degenerate cross product warns that no plane was ever defined. Drill: write one plane from a point and normal, and another from three points, verifying one extra point lies on it.

## DIAGNOSTIC_QUESTION_1
Write the vector equation of a plane passing through the point with position vector \(2\mathbf{i} + 3\mathbf{j} - \mathbf{k}\) and perpendicular to the vector \(4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}\).

## DIAGNOSTIC_ANSWER_1
The vector equation is \(\mathbf{r} \cdot (4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) = (2\mathbf{i} + 3\mathbf{j} - \mathbf{k}) \cdot (4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) = 8 - 6 - 5 = -3\). So \(\mathbf{r} \cdot (4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) = -3\). A wrong answer like \(\mathbf{r} \cdot (4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) = 3\) reveals a sign error in the dot product computation, specifically mishandling the negative signs of the point's coordinates.

## DIAGNOSTIC_QUESTION_2
Explain why the equation \(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\) represents a plane passing through \((x_1, y_1, z_1)\) with normal direction ratios \(A, B, C\).

## DIAGNOSTIC_ANSWER_2
The left-hand side is the dot product of the normal vector \((A, B, C)\) with the vector from \((x_1, y_1, z_1)\) to \((x, y, z)\). For any point \((x, y, z)\) on the plane, this vector lies in the plane and must be perpendicular to the normal, so their dot product is zero. Substituting \((x_1, y_1, z_1)\) makes each term zero, satisfying the equation. A student who says "it's just the formula" without linking to perpendicularity shows a lack of conceptual understanding of why the normal vector appears in the equation.

## DIAGNOSTIC_QUESTION_3
Find the Cartesian equation of the plane passing through the point \((1, -2, 3)\) and perpendicular to the line with direction ratios \(2, -1, 4\).

## DIAGNOSTIC_ANSWER_3
The normal vector to the plane is parallel to the given line, so direction ratios of the normal are \(2, -1, 4\). Using \(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\): \(2(x - 1) - 1(y + 2) + 4(z - 3) = 0 \Rightarrow 2x - 2 - y - 2 + 4z - 12 = 0 \Rightarrow 2x - y + 4z - 16 = 0\). A common error is writing \(2(x-1) -1(y-2) + 4(z-3) = 0\) by forgetting that \(y_1 = -2\) gives \(y - (-2) = y+2\). This sign mistake changes the constant term entirely.

## DIAGNOSTIC_QUESTION_4
A plane passes through points \(A(1, 1, 0)\), \(B(2, 0, 1)\), and \(C(0, 2, 1)\). Without finding the full equation, determine whether the point \(D(1, 1, 1)\) lies on this plane.

## DIAGNOSTIC_ANSWER_4
Vectors \(\overrightarrow{AB} = (1, -1, 1)\) and \(\overrightarrow{AC} = (-1, 1, 1)\). Their cross product \(\overrightarrow{AB} \times \overrightarrow{AC} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & -1 & 1 \\ -1 & 1 & 1 \end{vmatrix} = (-2, -2, 0)\) is normal to the plane. The plane equation is \(-2(x-1) -2(y-1) + 0(z-0) = 0 \Rightarrow x + y = 2\). For \(D(1,1,1)\): \(1+1=2\), so \(D\) lies on the plane. A student who tries to plug \(D\) into an incorrect equation (e.g., using wrong normal) reveals an inability to compute the cross product correctly or to use the point-normal form.

## DIAGNOSTIC_QUESTION_5
A student writes the equation of a plane through \((2, -1, 3)\) with normal vector \(3\mathbf{i} + 4\mathbf{j} - 5\mathbf{k}\) as \(3(x-2) + 4(y-1) - 5(z-3) = 0\). Identify and correct the error.

## DIAGNOSTIC_ANSWER_5
The error is in the \(y\)-term: the point's \(y\)-coordinate is \(-1\), so it should be \(y - (-1) = y+1\), not \(y-1\). The correct equation is \(3(x-2) + 4(y+1) - 5(z-3) = 0\). This mistake shows the student is mechanically applying \(y - y_1\) without substituting the negative coordinate correctly, a very common sign error in board exams.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem where a plane equation through a given point with a given normal is needed. Provide the point, normal, and ask for the equation. Then modify the problem so that the plane must pass through three given points instead.

## DIAGNOSTIC_ANSWER_6
Example: A solar panel is installed on a roof such that its surface passes through the point \((3, 2, 5)\) (in meters) and is perpendicular to the sun's rays direction vector \(2\mathbf{i} - 3\mathbf{j} + 6\mathbf{k}\). Find the plane equation. Modified version: The panel's corners are at \((3,2,5)\), \((5,1,8)\), and \((2,4,7)\). Find the plane equation. A poor answer would give trivial coordinates or collinear points, showing the student doesn't understand the geometric requirement of non-collinearity for three points to define a plane.

## COMMON_MISCONCEPTION
Students frequently confuse the normal vector of a plane with direction vectors lying in the plane. For example, given a line with direction ratios \(2, -1, 3\) and a point \((1, 2, -1)\), they might write the plane equation as \(2(x-1) -1(y-2) + 3(z+1) = 0\) thinking the line lies in the plane, but the problem states the plane is *perpendicular* to the line, so the line's direction ratios *are* the plane's normal. Another pervasive error is sign mishandling in the Cartesian form: writing \(y - y_1\) as \(y - 2\) when \(y_1 = -2\) instead of \(y + 2\). This changes the constant term and leads to a completely different plane.

## ON_FAILURE
If a student makes the sign error in the Cartesian form, have them explicitly write the substitution step: \(x - x_1 = x - (1) = x-1\), \(y - y_1 = y - (-2) = y+2\), \(z - z_1 = z - 3 = z-3\). Then multiply by \(A, B, C\). For the normal vector confusion, ask: "Does the given vector lie *in* the plane or stand *perpendicular* to it?" If perpendicular, it's the normal. If it lies in the plane, we need another vector to compute the normal via cross product. Practice with c12_math_cbse_11_006 (normal form) to reinforce the dot product condition \(\mathbf{r} \cdot \mathbf{n} = d\).

## PREREQUISITE_NODE_IDS
c12_math_cbse_11_001, c12_math_cbse_11_006, c11_math_cbse_12_001, c11_math_cbse_12_002, c12_math_cbse_11_005, c12_phy_cbse_04_001

## PREREQUISITE_REASONS
c12_math_cbse_11_001: Direction cosines/ratios are needed to interpret the normal vector's components.
c12_math_cbse_11_006: The normal form of a plane (\(\mathbf{r} \cdot \hat{\mathbf{n}} = d\)) is the direct precursor; the point-normal form generalizes it.
c11_math_cbse_12_001: Coordinates of a point in 3D space are essential to identify the given point.
c11_math_cbse_12_002: Distance formula in 3D underpins the derivation of the plane equation via perpendicular distance.
c12_math_cbse_11_005: Plane through a point uses line direction vectors; parallel line distance helps find plane parameters.  
c12_phy_cbse_04_001: c12_phy_cbse_04_001 | Motion of a charged particle in a uniform electric field between parallel plates uses plane equations to describe plate surfaces.  

## FORWARD_NODE_IDS
c12_math_cbse_11_008, c12_math_cbse_11_009, c12_math_cbse_11_010
## FORWARD_REASONS
c12_math_cbse_11_008: Distance of a point from a plane uses the plane equation derived here.
c12_math_cbse_11_009: Angle between two planes uses the normal vectors from their equations.
c12_math_cbse_11_010: Angle between a line and a plane uses the plane's normal and the line's direction vector.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_12_001, c11_math_cbse_12_002
## CROSS_SUBJECT_REASONS
c11_math_cbse_12_001: 3D coordinate system is the foundation for locating points and vectors in space.
c11_math_cbse_12_002: Distance between points in 3D is used when verifying if a point lies on a plane or finding perpendicular distances.

## CHAIN_DESCRIPTION
c12_math_cbse_11_006 -> c12_math_cbse_11_007 -> c12_math_cbse_11_008

## THIS_FORMULA
Vector form: \(\mathbf{r} \cdot \mathbf{n} = \mathbf{a} \cdot \mathbf{n}\); Cartesian form: \(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\)

## FORMULA_VARIABLES
\(\mathbf{r} = x\mathbf{i} + y\mathbf{j} + z\mathbf{k}\) (position vector of any point on the plane), \(\mathbf{a} = x_1\mathbf{i} + y_1\mathbf{j} + z_1\mathbf{k}\) (position vector of given point), \(\mathbf{n} = A\mathbf{i} + B\mathbf{j} + C\mathbf{k}\) (normal vector), \(A, B, C\) = direction ratios of normal, \((x_1, y_1, z_1)\) = coordinates of given point.

## FORMULA_UNITS
dimensionless (coordinates are in length units, but equation is homogeneous)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_01_001 | Electric flux through a plane surface requires the plane equation and normal vector to compute \(\Phi = \mathbf{E} \cdot \mathbf{A}\).
 c12_phy_cbse_04_001 | Motion of a charged particle in a uniform electric field between parallel plates uses plane equations to describe plate surfaces.
## PREREQ_CONCEPT
Vector dot product and the geometric meaning of a normal vector to a plane.

## PREREQ_BEFORE
Student must be able to compute the dot product of two vectors and understand that a plane is the set of all points whose position vectors satisfy \(\mathbf{r} \cdot \mathbf{n} = \text{constant}\).

## PREREQ_STUCK
Review vector dot product and the derivation of the normal form of a plane (c12_math_cbse_11_006).

## WORKED_EXAMPLE_1
PROBLEM: Find the vector and Cartesian equations of the plane passing through the point \((2, -3, 1)\) and perpendicular to the line with direction ratios \(4, -2, 5\).

STEPS:
- Step 1: Identify the given point \((x_1, y_1, z_1) = (2, -3, 1)\) and the normal vector direction ratios \(A=4, B=-2, C=5\). Since the plane is perpendicular to the line, the line's direction ratios are the plane's normal direction ratios.
- Step 2: Write the Cartesian form using \(A(x - x_1) + B(y - y_1) + C(z - z_1) = 0\). Substitute: \(4(x - 2) - 2(y + 3) + 5(z - 1) = 0\).
- Step 3: Expand and simplify: \(4x - 8 - 2y - 6 + 5z - 5 = 0 \Rightarrow 4x - 2y + 5z - 19 = 0\).
- Step 4: For the vector equation, write the normal vector \(\mathbf{n} = 4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}\) and point's position vector \(\mathbf{a} = 2\mathbf{i} - 3\mathbf{j} + \mathbf{k}\). Compute \(\mathbf{a} \cdot \mathbf{n} = (2)(4) + (-3)(-2) + (1)(5) = 8 + 6 + 5 = 19\).
- Step 5: The vector equation is \(\mathbf{r} \cdot (4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) = 19\). Verify by substituting \(\mathbf{r} = x\mathbf{i} + y\mathbf{j} + z\mathbf{k}\) to get \(4x - 2y + 5z = 19\), matching the Cartesian form.

REASONING: The plane's normal vector is parallel to the given line, so we directly use the line's direction ratios as \(A, B, C\). The point-normal form ensures the plane passes through the given point and is perpendicular to the normal. The vector form is a compact representation using the dot product.

ANSWER: Vector equation: \(\mathbf{r} \cdot (4\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) = 19\); Cartesian equation: \(4x - 2y + 5z = 19\).

## WORKED_EXAMPLE_2
PROBLEM: Find the equation of the plane passing through the three points \(A(1, 1, 0)\), \(B(2, 0, 1)\), and \(C(0, 2, 1)\).

STEPS:
- Step 1: Find two vectors lying in the plane: \(\overrightarrow{AB} = (2-1)\mathbf{i} + (0-1)\mathbf{j} + (1-0)\mathbf{k} = \mathbf{i} - \mathbf{j} + \mathbf{k}\) and \(\overrightarrow{AC} = (0-1)\mathbf{i} + (2-1)\mathbf{j} + (1-0)\mathbf{k} = -\mathbf{i} + \mathbf{j} + \mathbf{k}\).
- Step 2: Compute the normal vector \(\mathbf{n} = \overrightarrow{AB} \times \overrightarrow{AC}\) using the determinant: \(\mathbf{n} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & -1 & 1 \\ -1 & 1 & 1 \end{vmatrix} = \mathbf{i}((-1)(1) - (1)(1)) - \mathbf{j}((1)(1) - (1)(-1)) + \mathbf{k}((1)(1) - (-1)(-1)) = \mathbf{i}(-1-1) - \mathbf{j}(1+1) + \mathbf{k}(1-1) = -2\mathbf{i} - 2\mathbf{j} + 0\mathbf{k}\).
- Step 3: Use point \(A(1, 1, 0)\) and normal direction ratios \(A=-2, B=-2, C=0\) in the Cartesian form: \(-2(x-1) -2(y-1) + 0(z-0) = 0\).
- Step 4: Simplify: \(-2x + 2 - 2y + 2 = 0 \Rightarrow -2x - 2y + 4 = 0 \Rightarrow x + y = 2\).
- Step 5: Verify that points \(B\) and \(C\) satisfy \(x+y=2\): \(B(2,0,1): 2+0=2\); \(C(0,2,1): 0+2=2\). Both satisfy.
- Step 6: Vector equation: \(\mathbf{n} = -2\mathbf{i} - 2\mathbf{j}\), \(\mathbf{a} = \mathbf{i} + \mathbf{j}\). \(\mathbf{a} \cdot \mathbf{n} = -2 -2 = -4\). Equation: \(\mathbf{r} \cdot (-2\mathbf{i} - 2\mathbf{j}) = -4\) or \(\mathbf{r} \cdot (\mathbf{i} + \mathbf{j}) = 2\).

REASONING: Three non-collinear points define a plane. Two vectors in the plane are obtained from the given points. Their cross product gives a vector perpendicular to both, i.e., normal to the plane. Any of the three points can be used with this normal to write the equation.

ANSWER: Cartesian equation: \(x + y = 2\); Vector equation: \(\mathbf{r} \cdot (\mathbf{i} + \mathbf{j}) = 2\).

## WORKED_EXAMPLE_3
PROBLEM: Find the equation of the plane that passes through the point \(P(1, -2, 3)\) and contains the line \(\frac{x-2}{3} = \frac{y+1}{-2} = \frac{z-4}{1}\).

STEPS:
- Step 1: The line gives a point \(Q(2, -1, 4)\) (from the symmetric form) and direction vector \(\mathbf{d} = 3\mathbf{i} - 2\mathbf{j} + \mathbf{k}\) lying in the plane.
- Step 2: Find another vector in the plane using \(P\) and \(Q\): \(\overrightarrow{PQ} = (2-1)\mathbf{i} + (-1+2)\mathbf{j} + (4-3)\mathbf{k} = \mathbf{i} + \mathbf{j} + \mathbf{k}\).
- Step 3: The normal vector \(\mathbf{n}\) is perpendicular to both \(\mathbf{d}\) and \(\overrightarrow{PQ}\), so \(\mathbf{n} = \mathbf{d} \times \overrightarrow{PQ} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 3 & -2 & 1 \\ 1 & 1 & 1 \end{vmatrix} = \mathbf{i}((-2)(1) - (1)(1)) - \mathbf{j}((3)(1) - (1)(1)) + \mathbf{k}((3)(1) - (-2)(1)) = \mathbf{i}(-2-1) - \mathbf{j}(3-1) + \mathbf{k}(3+2) = -3\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}\).
- Step 4: Use point \(P(1, -2, 3)\) and normal \(\mathbf{n} = -3\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}\) (direction ratios \(-3, -2, 5\)).
- Step 5: Cartesian form: \(-3(x-1) -2(y+2) + 5(z-3) = 0 \Rightarrow -3x + 3 - 2y - 4 + 5z - 15 = 0 \Rightarrow -3x - 2y + 5z - 16 = 0\) or \(3x + 2y - 5z + 16 = 0\).
- Step 6: Verify that point \(Q(2, -1, 4)\) lies on this plane: \(3(2) + 2(-1) - 5(4) + 16 = 6 - 2 - 20 + 16 = 0\). Satisfied.

REASONING: A plane containing a line and an external point requires two independent vectors in the plane: one along the line, and one from the external point to any point on the line. Their cross product gives the normal. This combines line and plane concepts.

ANSWER: Cartesian equation: \(3x + 2y - 5z + 16 = 0\); Vector equation: \(\mathbf{r} \cdot (-3\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) = -16\) or \(\mathbf{r} \cdot (3\mathbf{i} + 2\mathbf{j} - 5\mathbf{k}) = 16\).

## COMPETENCY_QUESTION_1
QUESTION: A plane passes through the point \((2, -1, 3)\) and is perpendicular to the line joining the points \((1, 2, -1)\) and \((3, 4, 5)\). Find the equation of the plane. Also, determine whether the point \((4, 1, 2)\) lies on this plane.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Find the direction vector of the given line: \((3-1, 4-2, 5-(-1)) = (2, 2, 6)\). This is the normal vector to the plane.
- Step 2: Use point-normal form with point \((2, -1, 3)\) and normal \((2, 2, 6)\): \(2(x-2) + 2(y+1) + 6(z-3) = 0\).
- Step 3: Simplify: \(2x - 4 + 2y + 2 + 6z - 18 = 0 \Rightarrow 2x + 2y + 6z - 20 = 0 \Rightarrow x + y + 3z = 10\).
- Step 4: Check point \((4, 1, 2)\): \(4 + 1 + 3(2) = 4 + 1 + 6 = 11 \neq 10\). So the point does not lie on the plane.

ANSWER: Plane equation: \(x + y + 3z = 10\). The point \((4, 1, 2)\) does not lie on the plane.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find the equation of the plane passing through the intersection of the planes \(x + 2y - z = 3\) and \(2x - y + 3z = 5\) and passing through the point \((1, 1, 1)\). (Hint: The equation of a plane through the intersection of two planes is \(P_1 + \lambda P_2 = 0\).)

COMPETENCY: Comparing and justifying

STEPS:
- Step 1: Write the family of planes through the intersection: \((x + 2y - z - 3) + \lambda(2x - y + 3z - 5) = 0\).
- Step 2: Substitute the point \((1, 1, 1)\): \((1 + 2 - 1 - 3) + \lambda(2 - 1 + 3 - 5) = 0 \Rightarrow (-1) + \lambda(-1) = 0 \Rightarrow \lambda = -1\).
- Step 3: Substitute \(\lambda = -1\) into the family: \((x + 2y - z - 3) - (2x - y + 3z - 5) = 0 \Rightarrow x + 2y - z - 3 - 2x + y - 3z + 5 = 0\).
- Step 4: Simplify: \(-x + 3y - 4z + 2 = 0\) or \(x - 3y + 4z = 2\).
- Step 5: Verify that this plane indeed contains the line of intersection (it does by construction) and passes through \((1,1,1)\): \(1 - 3 + 4 = 2\). Correct.

ANSWER: \(x - 3y + 4z = 2\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A plane in three-dimensional space is uniquely determined if it passes through a given point and has a known normal vector (direction ______ to the plane).

## DIAGNOSTIC_ANSWER_7
perpendicular

Perpendicular is the normal's definition: the vector that stands at right angles to every line lying flat in the plane. **A wrong answer (parallel) reveals the student has laid the normal down inside the plane it exists to characterise.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To write the equation of this roof plane, we first need a vector ______ to the roof.

## DIAGNOSTIC_ANSWER_8
perpendicular

The perpendicular word repeats for the roof: the normal rises from the sloping plane the way an aerial rises from a roof. **A wrong answer (a slanting word) reveals the student has tilted the normal into the roof it should pierce.** The perpendicular word is the roof's aerial: the normal rises from the plane it characterises.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The key insight is that a plane is completely defined by a point and a normal vector — just as a line in ______D is defined by a point and a slope.

## DIAGNOSTIC_ANSWER_9
2

The two is the comparison's dimension: a point and a slope write a flatland line, exactly as a point and a normal write a space plane. **A wrong answer (another dimension) reveals the student has moved the analogy to a setting where slope is not the complete specification.**

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can derive both vector and Cartesian equations of a plane passing through a given point with a specified normal vector, and can also find the equation of a plane passing through three non-collinear points by first determining the normal vector via cross product.
