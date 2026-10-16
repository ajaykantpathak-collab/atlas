## ELI5
A kite tugs at an angle to the ground, but only the groundward component moves it along: extracting that shadow is the dot product's day job. Defined as magnitudes times the cosine of the angle between - or componentwise, matching entries multiplied and summed - the result is a scalar, never a vector. Zero vectors contribute zero by convention; a zero dot product certifies perpendicularity, and dividing by a magnitude projects one vector onto another.

## DEFINITION
The scalar (dot) product of two non-zero vectors \(\vec{a}\) and \(\vec{b}\), denoted by \(\vec{a} \cdot \vec{b}\), is defined as the product of their magnitudes and the cosine of the angle \(\theta\) between them: \(\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta\), where \(0 \le \theta \le \pi\). If either vector is the zero vector, the dot product is defined to be 0. The result is a scalar (real number), not a vector.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) compute the dot product using both the geometric definition (\(|\vec{a}||\vec{b}|\cos\theta\)) and the algebraic component form (\(a_1b_1+a_2b_2+a_3b_3\)), (2) determine the angle between two vectors, (3) test perpendicularity (\(\vec{a} \cdot \vec{b} = 0\)) and parallelism (\(\vec{a} \cdot \vec{b} = \pm |\vec{a}||\vec{b}|\)), and (4) apply the dot product to find the projection of one vector onto another in numerical and word problems.

## SCOPE_BOUNDARY
This node covers the definition, geometric interpretation, algebraic computation, properties (commutativity, distributivity, scalar multiplication), angle between vectors, perpendicular/parallel conditions, and projection of a vector on another vector. It does NOT cover the vector (cross) product, scalar triple product, or applications to work/energy in physics (though the mathematical projection concept is included).

## WALKTHROUGH
Imagine a kite flying in the sky — the wind exerts a force \(\vec{F}\) on the kite, but the kite moves only horizontally along the ground. The effective force that actually moves the kite is the component of \(\vec{F}\) along the horizontal direction. To find that component, we need the "shadow" of the force vector on the horizontal line. This is exactly what the dot product helps us compute: the projection of one vector onto another. Start by recalling the position vector and component form from c12_math_cbse_10_002 and c12_math_cbse_10_003. Write down the two vectors in \(\hat{i}, \hat{j}, \hat{k}\) form. Then use the formula \(\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3\). The key insight is that this simple sum of products of corresponding components automatically encodes the cosine of the angle between them, so you never need to measure the angle physically.

Takeaway first: the dot product measures alignment - full magnitudes when parallel, zero when perpendicular - and the component formula is its algebraic shortcut that hides the angle entirely. Exam moves: computation questions both geometric and componentwise, angle-extraction questions, perpendicularity and parallelism tests, and projection questions in force-and-motion clothing. Method: rerun the kite - write both vectors in i-j-k form, multiply matching entries, sum, and interpret the shadow's size. Check yourself: the dot product's output is a number; writing unit vectors into the answer is the chapter's most common format error. Drill: compute one dot product two ways, extract one angle, and test one pair for perpendicularity.

## DIAGNOSTIC_QUESTION_1
State the formula for the dot product of two vectors \(\vec{a} = a_1\hat{i} + a_2\hat{j} + a_3\hat{k}\) and \(\vec{b} = b_1\hat{i} + b_2\hat{j} + b_3\hat{k}\) in component form.

## DIAGNOSTIC_ANSWER_1
The correct formula is \(\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3\). A wrong answer such as \((a_1+a_2+a_3)(b_1+b_2+b_3)\) or \(a_1+b_1, a_2+b_2, a_3+b_3\) reveals that the student confuses the dot product with either scalar multiplication of sums or vector addition. It shows they have not internalized that the dot product multiplies corresponding components and sums the results, yielding a single number.

## DIAGNOSTIC_QUESTION_2
Two vectors \(\vec{a}\) and \(\vec{b}\) satisfy \(\vec{a} \cdot \vec{b} = 0\). A student concludes that at least one of the vectors must be the zero vector. Is this conclusion correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The conclusion is incorrect. \(\vec{a} \cdot \vec{b} = 0\) implies either one vector is zero OR the vectors are perpendicular (\(\theta = 90^\circ\)). A student who says "yes" is ignoring the geometric meaning: the dot product is \(|\vec{a}||\vec{b}|\cos\theta\), and \(\cos 90^\circ = 0\). This misconception arises from treating the algebraic condition as only possible when a magnitude is zero, forgetting the trigonometric factor.

## DIAGNOSTIC_QUESTION_3
Find the dot product of \(\vec{a} = 2\hat{i} - 3\hat{j} + 5\hat{k}\) and \(\vec{b} = -\hat{i} + 4\hat{j} - 2\hat{k}\). Then find the angle between them if \(|\vec{a}| = \sqrt{38}\) and \(|\vec{b}| = \sqrt{21}\).

## DIAGNOSTIC_ANSWER_3
Step 1: Compute dot product: \(\vec{a} \cdot \vec{b} = (2)(-1) + (-3)(4) + (5)(-2) = -2 -12 -10 = -24\).  
Step 2: Use \(\cos\theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}||\vec{b}|} = \frac{-24}{\sqrt{38} \cdot \sqrt{21}} = \frac{-24}{\sqrt{798}}\).  
Step 3: \(\theta = \cos^{-1}\left(\frac{-24}{\sqrt{798}}\right) \approx 131.2^\circ\).  
A common error is to miscalculate the dot product as \(-2 -12 +10 = -4\) (sign error on the last term) or to forget the negative sign in the cosine, leading to an acute angle. Another error is using \(|\vec{a}||\vec{b}| = \sqrt{38+21} = \sqrt{59}\) instead of \(\sqrt{38}\sqrt{21}\).

## DIAGNOSTIC_QUESTION_4
Given \(\vec{a} = 3\hat{i} + 4\hat{j}\) and \(\vec{b} = 5\hat{i} - 12\hat{j}\), a student computes the projection of \(\vec{a}\) on \(\vec{b}\) as \(\frac{\vec{a} \cdot \vec{b}}{|\vec{b}|^2} \vec{b}\). Another student says the projection is \(\frac{\vec{a} \cdot \vec{b}}{|\vec{b}|}\). Which expression gives the projection *vector* and which gives the scalar projection (magnitude)? Justify.

## DIAGNOSTIC_ANSWER_4
The projection *vector* of \(\vec{a}\) on \(\vec{b}\) is \(\frac{\vec{a} \cdot \vec{b}}{|\vec{b}|^2} \vec{b}\) (a vector in the direction of \(\vec{b}\)). The scalar projection (magnitude) is \(\frac{\vec{a} \cdot \vec{b}}{|\vec{b}|}\) (a signed scalar). The first student is correct for the vector projection; the second gives the signed length. A wrong assignment shows confusion between the vector and scalar forms of projection. The key is that the vector projection must have the direction of \(\vec{b}\), hence it is a scalar multiple of \(\vec{b}\).

## DIAGNOSTIC_QUESTION_5
A student solves: "Find \(\lambda\) if \(\vec{a} = 2\hat{i} + \lambda\hat{j} + \hat{k}\) and \(\vec{b} = \hat{i} - 2\hat{j} + 3\hat{k}\) are perpendicular." Their working: \(\vec{a} \cdot \vec{b} = 2(1) + \lambda(-2) + 1(3) = 2 - 2\lambda + 3 = 5 - 2\lambda = 0 \Rightarrow \lambda = 2.5\). They write the final answer as \(\lambda = 2.5\). Is this solution fully correct? If not, identify the error.

## DIAGNOSTIC_ANSWER_5
The algebraic steps are correct, but the final answer should be written as \(\lambda = \frac{5}{2}\) or \(2.5\) (both acceptable). However, the student did not explicitly state the perpendicular condition \(\vec{a} \cdot \vec{b} = 0\) at the start, which is a required justification in board exams. Also, they should verify that the vectors are non-zero (they are). The solution would lose a mark for incomplete reasoning. The error is not computational but communicative: missing the statement "since \(\vec{a} \perp \vec{b}, \vec{a} \cdot \vec{b} = 0\)".

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (using Indian context: e.g., a tractor pulling a cart, a cyclist on a slope) where the dot product is needed to find the component of a force along a displacement. Provide the vectors and ask for the work done (work = force dot displacement). Do not solve it.

## DIAGNOSTIC_ANSWER_6
A good problem: "A farmer pulls a cart with a force \(\vec{F} = (50\hat{i} + 30\hat{j} - 20\hat{k})\) N. The cart moves on a horizontal road along the displacement \(\vec{d} = (100\hat{i} + 0\hat{j} + 0\hat{k})\) m. Find the work done by the force." The vectors must have a non-zero angle and the context must be realistic. A poor answer would give parallel vectors (trivial dot product) or ask for cross product, or omit units. This tests whether the student can translate a physical situation into the correct mathematical operation.

## COMMON_MISCONCEPTION
Students often think the dot product of two vectors is a vector, writing \(\vec{a} \cdot \vec{b} = (a_1b_1)\hat{i} + (a_2b_2)\hat{j} + (a_3b_3)\hat{k}\). They confuse it with component-wise multiplication (Hadamard product) or vector addition. Another frequent error: when using the geometric formula \(|\vec{a}||\vec{b}|\cos\theta\), they take \(\theta\) as the angle between the vectors when placed *head-to-head* instead of *tail-to-tail*, leading to \(\cos(180^\circ-\theta) = -\cos\theta\). For example, if the angle between \(\vec{a}\) and \(\vec{b}\) is \(60^\circ\) when tails meet, a student might use \(120^\circ\) and get the wrong sign.

## ON_FAILURE
If a student writes the dot product as a vector, immediately ask: "What is the result of multiplying a 1×3 row matrix by a 3×1 column matrix? A scalar. The dot product is exactly that." Then re-derive the component form from the distributive property: \(\vec{a} \cdot \vec{b} = (a_1\hat{i}+a_2\hat{j}+a_3\hat{k}) \cdot (b_1\hat{i}+b_2\hat{j}+b_3\hat{k}) = a_1b_1(\hat{i}\cdot\hat{i}) + a_1b_2(\hat{i}\cdot\hat{j}) + \dots\). Since \(\hat{i}\cdot\hat{i}=1\) and \(\hat{i}\cdot\hat{j}=0\), only \(a_1b_1+a_2b_2+a_3b_3\) remains. For the angle error, draw two vectors tail-to-tail, measure the angle, then translate one vector to head-to-head and show the supplementary angle. Emphasise: "The angle in the formula is ALWAYS the angle between the vectors when their initial points coincide."

## PREREQUISITE_NODE_IDS
c12_math_cbse_10_001, c12_math_cbse_10_002, c12_math_cbse_10_003, c11_math_cbse_10_001, c11_math_cbse_10_002, c11_math_cbse_03_003, c11_math_cbse_10_006, c12_phy_cbse_02_003, c12_phy_cbse_04_001

## PREREQUISITE_REASONS
c12_math_cbse_10_001: Defines vectors, magnitude, direction — needed to understand what a vector is before operating on it.
c12_math_cbse_10_002: Introduces position vectors and direction cosines — essential for component form and geometric interpretation.
c12_math_cbse_10_003: Covers vector addition and scalar multiplication — required for the distributive property proof of dot product.
c11_math_cbse_10_001: Coordinate axes and coordinates — prerequisite for representing vectors in 3D component form.
c11_math_cbse_10_002: Distance formula — used to derive magnitude of a vector from its components.
c11_math_cbse_03_003: Trigonometric functions (sin, cos, tan) — needed for the geometric definition \(\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\theta\).
c11_math_cbse_10_006: Slope of a line — relates to direction ratios and angles between lines, which connects to angle between vectors.
c12_phy_cbse_02_003: c12_phy_cbse_02_003 | Work done by a constant force is \(W = \vec{F} \cdot \vec{d}\); the dot product gives the component of force along displacement.  
c12_phy_cbse_04_001: c12_phy_cbse_04_001 | Electric flux \(\Phi = \vec{E} \cdot \vec{A}\) uses dot product to find the component of electric field normal to a surface.  

## FORWARD_NODE_IDS
c12_math_cbse_10_005, c12_math_cbse_10_006, c12_math_cbse_10_007, c12_math_cbse_10_008
## FORWARD_REASONS
c12_math_cbse_10_005: Vector (cross) product is the other vector product; understanding dot product helps contrast scalar vs vector results.
c12_math_cbse_10_006: Projection of a vector on another vector is directly defined using the dot product (\(\text{proj}_{\vec{b}}\vec{a} = \frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\vec{b}\)).
c12_math_cbse_10_007: Section formula uses position vectors and scalar multiplication; dot product appears in problems involving perpendicular bisectors or right triangles.
c12_math_cbse_10_008: Vector equation of a line uses direction vectors; dot product is used to find perpendicular distance from a point to a line and to test orthogonality.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_003, c11_math_cbse_10_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_03_003: Trigonometric functions provide the cosine function used in the geometric definition of dot product and in finding angles between vectors.
c11_math_cbse_10_006: Slope of a line in 2D is related to direction ratios; in 3D, direction cosines and dot product generalize the concept of angle between lines.

## CHAIN_DESCRIPTION
c12_math_cbse_10_001 -> c12_math_cbse_10_002 -> c12_math_cbse_10_003 -> c12_math_cbse_10_004 -> c12_math_cbse_10_006 -> c12_math_cbse_10_008

## THIS_FORMULA
\(\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta = a_1b_1 + a_2b_2 + a_3b_3\)

## FORMULA_VARIABLES
\(\vec{a}, \vec{b}\) = two vectors; \(|\vec{a}|, |\vec{b}|\) = their magnitudes; \(\theta\) = angle between them (\(0 \le \theta \le \pi\)); \(a_1,a_2,a_3\) = components of \(\vec{a}\) along \(\hat{i},\hat{j},\hat{k}\); \(b_1,b_2,b_3\) = components of \(\vec{b}\) along \(\hat{i},\hat{j},\hat{k}\).

## FORMULA_UNITS
If vectors represent physical quantities (e.g., force in newtons, displacement in metres), the dot product has units of the product of those units (e.g., N·m = joules for work). In pure mathematics, it is dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | Work done by a constant force is \(W = \vec{F} \cdot \vec{d}\); the dot product gives the component of force along displacement.
 c12_phy_cbse_04_001 | Electric flux \(\Phi = \vec{E} \cdot \vec{A}\) uses dot product to find the component of electric field normal to a surface.
## PREREQ_CONCEPT
Component form of a vector and the cosine rule for triangles (from Class 11 trigonometry and coordinate geometry).

## PREREQ_BEFORE
The student must be able to write any vector in \(\hat{i},\hat{j},\hat{k}\) form, compute its magnitude, and recall \(\cos\theta\) values for standard angles.

## PREREQ_STUCK
If stuck, revisit c12_math_cbse_10_002 (position vector and direction cosines) and c11_math_cbse_03_003 (trigonometric functions) to refresh component representation and cosine meaning.

## WORKED_EXAMPLE_1
PROBLEM: A drone flies from point A(2, -1, 3) to point B(5, 2, -1) in metres. A constant wind exerts a force \(\vec{F} = 4\hat{i} - 3\hat{j} + 2\hat{k}\) newtons on the drone. Find the work done by the wind during this displacement.
STEPS:
- Step 1: Find the displacement vector \(\vec{d} = \vec{B} - \vec{A} = (5-2)\hat{i} + (2-(-1))\hat{j} + (-1-3)\hat{k} = 3\hat{i} + 3\hat{j} - 4\hat{k}\) m.
- Step 2: Write the force vector \(\vec{F} = 4\hat{i} - 3\hat{j} + 2\hat{k}\) N.
- Step 3: Compute the dot product \(\vec{F} \cdot \vec{d} = (4)(3) + (-3)(3) + (2)(-4) = 12 - 9 - 8 = -5\).
- Step 4: The work done is \(-5\) joules. The negative sign means the wind opposes the motion overall.
- Step 5: Verify units: N × m = J. The magnitude is small, consistent with the drone's small displacement.
REASONING: Work is defined as the dot product of force and displacement vectors. The component form makes computation straightforward without needing the angle. The negative result indicates the wind has a net component opposite to the displacement.
ANSWER: -5 J

## WORKED_EXAMPLE_2
PROBLEM: Find the angle between the vectors \(\vec{a} = \hat{i} + 2\hat{j} - 2\hat{k}\) and \(\vec{b} = 2\hat{i} - \hat{j} + 2\hat{k}\). Also, find a vector perpendicular to both.
STEPS:
- Step 1: Compute magnitudes: \(|\vec{a}| = \sqrt{1^2 + 2^2 + (-2)^2} = \sqrt{9} = 3\); \(|\vec{b}| = \sqrt{2^2 + (-1)^2 + 2^2} = \sqrt{9} = 3\).
- Step 2: Compute dot product: \(\vec{a} \cdot \vec{b} = (1)(2) + (2)(-1) + (-2)(2) = 2 - 2 - 4 = -4\).
- Step 3: Use \(\cos\theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}||\vec{b}|} = \frac{-4}{3 \times 3} = -\frac{4}{9}\).
- Step 4: \(\theta = \cos^{-1}(-4/9) \approx 116.4^\circ\).
- Step 5: A vector perpendicular to both is given by the cross product (next topic), but using dot product we can only check perpendicularity. To find a perpendicular vector, we need \(\vec{a} \cdot \vec{c} = 0\) and \(\vec{b} \cdot \vec{c} = 0\). Let \(\vec{c} = x\hat{i} + y\hat{j} + z\hat{k}\). Then \(x + 2y - 2z = 0\) and \(2x - y + 2z = 0\). Solve: add equations: \(3x + y = 0 \Rightarrow y = -3x\). Substitute into first: \(x - 6x - 2z = 0 \Rightarrow -5x = 2z \Rightarrow z = -\frac{5}{2}x\). Choose \(x=2\), then \(y=-6, z=-5\). So \(\vec{c} = 2\hat{i} - 6\hat{j} - 5\hat{k}\) (any scalar multiple works).
REASONING: The dot product gives the angle directly via the cosine formula. For a perpendicular vector, we set up two dot product equations (since perpendicular means dot product zero) and solve the homogeneous system. This shows how dot product conditions translate into linear equations.
ANSWER: Angle ≈ 116.4°; a perpendicular vector is \(2\hat{i} - 6\hat{j} - 5\hat{k}\) (or any non-zero multiple).

## WORKED_EXAMPLE_3
PROBLEM: A rectangular box has edges along the coordinate axes with lengths 3 m, 4 m, and 12 m. Find the angle between the body diagonal and the face diagonal on the 3 m × 4 m face.
STEPS:
- Step 1: Place the box with one corner at origin O(0,0,0). The edges are along axes: \(\vec{OA} = 3\hat{i}\), \(\vec{OB} = 4\hat{j}\), \(\vec{OC} = 12\hat{k}\).
- Step 2: The body diagonal from O to opposite corner is \(\vec{d}_1 = 3\hat{i} + 4\hat{j} + 12\hat{k}\).
- Step 3: The face diagonal on the 3×4 face (xy-plane) is \(\vec{d}_2 = 3\hat{i} + 4\hat{j}\).
- Step 4: Compute magnitudes: \(|\vec{d}_1| = \sqrt{3^2+4^2+12^2} = \sqrt{169} = 13\) m; \(|\vec{d}_2| = \sqrt{3^2+4^2} = 5\) m.
- Step 5: Compute dot product: \(\vec{d}_1 \cdot \vec{d}_2 = (3)(3) + (4)(4) + (12)(0) = 9 + 16 = 25\).
- Step 6: \(\cos\theta = \frac{25}{13 \times 5} = \frac{25}{65} = \frac{5}{13}\). So \(\theta = \cos^{-1}(5/13) \approx 67.38^\circ\).
REASONING: This problem combines 3D geometry with vector algebra. The body diagonal and face diagonal are naturally expressed as vectors. The dot product efficiently finds the angle without needing to construct triangles in 3D space. The key is identifying the correct vectors from the geometry.
ANSWER: \(\theta = \cos^{-1}(5/13) \approx 67.38^\circ\)

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If \(\vec{a} \cdot \vec{b} = \vec{a} \cdot \vec{c}\) and \(\vec{a} \neq \vec{0}\), then \(\vec{b} = \vec{c}\)." Is this statement true? If not, give a counterexample and explain the correct condition for \(\vec{b} = \vec{c}\) from dot products.
COMPETENCY: Comparing and justifying mathematical statements; identifying logical fallacies.
STEPS:
- Step 1: Understand the claim — it says dot product with a fixed non-zero vector is injective.
- Step 2: Recall that \(\vec{a} \cdot \vec{b} = \vec{a} \cdot \vec{c} \Rightarrow \vec{a} \cdot (\vec{b} - \vec{c}) = 0\).
- Step 3: This means \(\vec{b} - \vec{c}\) is perpendicular to \(\vec{a}\), not necessarily zero.
- Step 4: Construct a counterexample: let \(\vec{a} = \hat{i}\), \(\vec{b} = \hat{j}\), \(\vec{c} = 2\hat{j}\). Then \(\vec{a} \cdot \vec{b} = 0\), \(\vec{a} \cdot \vec{c} = 0\), but \(\vec{b} \neq \vec{c}\).
- Step 5: The correct condition: if \(\vec{a} \cdot \vec{b} = \vec{a} \cdot \vec{c}\) for *all* vectors \(\vec{a}\), then \(\vec{b} = \vec{c}\). Or if \(\vec{a}\) is non-zero and we also know \(\vec{b} - \vec{c}\) is parallel to \(\vec{a}\), then \(\vec{b} = \vec{c}\).
ANSWER: The statement is false. Counterexample: \(\vec{a} = \hat{i}, \vec{b} = \hat{j}, \vec{c} = 2\hat{j}\). Dot product equality only implies the difference is perpendicular to \(\vec{a}\), not that the vectors are equal.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A force \(\vec{F} = (3\hat{i} + 4\hat{j} - 5\hat{k})\) N acts on a particle that moves from point P(1, 2, -1) to Q(4, 6, 3) along a straight line. (a) Find the work done by the force. (b) Find the component of the force along the displacement. (c) If the particle has mass 2 kg and starts from rest, find its speed at Q using the work-energy theorem (assume no other forces).
COMPETENCY: Translating real-world situations to mathematical expressions; multi-step calculation combining physics and vector algebra.
STEPS:
- Step 1: Find displacement \(\vec{d} = \vec{Q} - \vec{P} = (3\hat{i} + 4\hat{j} + 4\hat{k})\) m.
- Step 2: Work done \(W = \vec{F} \cdot \vec{d} = (3)(3) + (4)(4) + (-5)(4) = 9 + 16 - 20 = 5\) J.
- Step 3: Magnitude of displacement \(|\vec{d}| = \sqrt{3^2+4^2+4^2} = \sqrt{41}\) m.
- Step 4: Component of force along displacement = scalar projection = \(\frac{\vec{F} \cdot \vec{d}}{|\vec{d}|} = \frac{5}{\sqrt{41}}\) N.
- Step 5: Work-energy theorem: \(W = \Delta K = \frac{1}{2} m v^2 - 0\). So \(5 = \frac{1}{2} \times 2 \times v^2 \Rightarrow v^2 = 5 \Rightarrow v = \sqrt{5}\) m/s.
ANSWER: (a) 5 J, (b) \(\frac{5}{\sqrt{41}}\) N, (c) \(\sqrt{5}\) m/s.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: If either vector is the zero vector, the dot ______ is defined to be 0.

## DIAGNOSTIC_ANSWER_7
product

The dot product is the convention's subject: with a zero vector involved, the alignment question is answered by definition, not by geometry. **A wrong answer (cross) reveals the student has confused the scalar product with the vector product whose zero case needs no separate ruling.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To find that component, we need the "shadow" of the force vector on the ______ line.

## DIAGNOSTIC_ANSWER_8
horizontal

The horizontal line is the shadow's screen: the force's useful part is measured along the ground the kite actually travels. **A wrong answer (a vertical word) reveals the student has projected onto the direction the kite is not moving in.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: If either vector is the zero vector, the dot product is defined to be ______.

## DIAGNOSTIC_ANSWER_9
0

Zero is the agreed answer: no magnitude means no alignment to measure, so the product is declared zero without ceremony. **A wrong answer (an undefined) reveals the student has broken a working convention the definition quietly installs.** Zero is the convention's verdict: no length means no projection to measure, so the product is set to zero by decree.
