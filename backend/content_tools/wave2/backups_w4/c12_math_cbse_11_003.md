## ELI5
A roof truss's two steel beams cut at an angle the joints must respect: extract each line's direction ratios from its equation's denominators, dot the triples, and divide by the two magnitudes - the cosine of the angle between the beams. The absolute value guarantees the acute angle; dot product zero means perpendicular, proportional triples mean parallel. Positions are irrelevant: only the directions argue, never the locations.

## DEFINITION
The angle between two lines in three-dimensional space is defined as the acute angle between their direction vectors (or lines parallel to them passing through the origin). If two lines have direction ratios \(a_1, b_1, c_1\) and \(a_2, b_2, c_2\), the cosine of the angle \(\theta\) between them is given by \(\cos\theta = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}}\). If direction cosines \(l_1,m_1,n_1\) and \(l_2,m_2,n_2\) are used, \(\cos\theta = |l_1l_2 + m_1m_2 + n_1n_2|\). The angle is always taken as the acute angle (\(0 \le \theta \le \frac{\pi}{2}\)).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the angle between two lines given in vector form, Cartesian form, or via direction ratios/cosines; can determine whether lines are parallel or perpendicular using the condition \(a_1a_2+b_1b_2+c_1c_2=0\) for perpendicularity and \(\frac{a_1}{a_2}=\frac{b_1}{b_2}=\frac{c_1}{c_2}\) for parallelism; and can solve multi-step problems combining line equations and angle conditions (e.g., finding unknown parameters for perpendicular lines).

## SCOPE_BOUNDARY
This node covers the angle between two lines in 3D using direction ratios, direction cosines, vector equations, and Cartesian equations. It includes conditions for perpendicular and parallel lines. It does NOT cover the angle between a line and a plane (node c12_math_cbse_11_010), angle between two planes (node c12_math_cbse_11_009), or shortest distance between lines (nodes c12_math_cbse_11_004 and c12_math_cbse_11_005).

## WALKTHROUGH
Imagine you are designing a roof truss for a house in Bengaluru: two steel beams run along lines \(\frac{x-1}{2}=\frac{y+2}{-1}=\frac{z}{3}\) and \(\frac{x}{1}=\frac{y-3}{2}=\frac{z+1}{-2}\). To ensure the joints are cut at the correct angle, you must find the angle between these beams. Start by extracting the direction ratios from the denominators of the Cartesian equations: for the first line \((2, -1, 3)\), for the second \((1, 2, -2)\). Recall from Class 11 (c11_math_cbse_10_008) that the angle between two lines in 2D uses slopes; in 3D we use direction ratios with the dot product formula. Write down the formula \(\cos\theta = \frac{|a_1a_2+b_1b_2+c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}}\), substitute the values, simplify step by step, and take the inverse cosine. The key insight: the angle between two lines in space depends only on their direction ratios, not on their positions.

Takeaway first: the angle between space's lines is the acute angle between their direction vectors - direction ratios in, absolute-value cosine out - with the parallel and perpendicular tests as boundary cases. Exam moves: computation questions from Cartesian or vector forms, perpendicularity and parallelism questions, and unknown-parameter questions solving for a coefficient that forces a stated angle. Method: rerun the truss - ratios from denominators, formula substituted, absolute value taken, inverse cosine quoted. Check yourself: the absolute value is not decoration - dropping it can hand over an obtuse cosine and an angle the definition refuses. Drill: compute one angle between beams and find the parameter making a pair perpendicular.

## DIAGNOSTIC_QUESTION_1
State the formula for the cosine of the angle between two lines whose direction ratios are \(a_1, b_1, c_1\) and \(a_2, b_2, c_2\). Also state the condition for the lines to be perpendicular.

## DIAGNOSTIC_ANSWER_1
The formula is \(\cos\theta = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}}\). The condition for perpendicular lines is \(a_1a_2 + b_1b_2 + c_1c_2 = 0\). A wrong answer (e.g., missing absolute value, using sum of squares in denominator incorrectly, or stating perpendicular condition as \(\frac{a_1}{a_2}=\frac{b_1}{b_2}=\frac{c_1}{c_2}\)) reveals confusion between the angle formula and the parallel condition, or forgetting that the angle is acute so cosine is positive.

## DIAGNOSTIC_QUESTION_2
Two lines have direction cosines \((l_1, m_1, n_1)\) and \((l_2, m_2, n_2)\). A student writes \(\cos\theta = l_1l_2 + m_1m_2 + n_1n_2\) (without absolute value). Is this correct? Explain why or why not, and give a concrete example where omitting the absolute value gives a wrong angle.

## DIAGNOSTIC_ANSWER_2
The student's formula is incorrect because the angle between two lines is defined as the acute angle (\(0 \le \theta \le 90^\circ\)), so \(\cos\theta\) must be non-negative. The dot product of direction cosines can be negative if the lines are oriented such that the angle between their direction vectors is obtuse; the absolute value ensures we get the acute angle. Example: line 1 has direction cosines \((1,0,0)\) (along +x axis), line 2 has direction cosines \((-1,0,0)\) (along -x axis). The lines are actually the same line but opposite directions; the angle between the lines is \(0^\circ\). Without absolute value: \(\cos\theta = -1 \Rightarrow \theta = 180^\circ\) (wrong). With absolute value: \(\cos\theta = 1 \Rightarrow \theta = 0^\circ\) (correct).

## DIAGNOSTIC_QUESTION_3
Find the angle between the lines \(\frac{x-2}{3} = \frac{y+1}{-4} = \frac{z-5}{2}\) and \(\frac{x}{1} = \frac{y-3}{2} = \frac{z+2}{-3}\). Show all steps.

## DIAGNOSTIC_ANSWER_3
Step 1: Extract direction ratios. Line 1: \(a_1=3, b_1=-4, c_1=2\). Line 2: \(a_2=1, b_2=2, c_2=-3\).
Step 2: Compute dot product: \(a_1a_2+b_1b_2+c_1c_2 = 3(1) + (-4)(2) + 2(-3) = 3 - 8 - 6 = -11\).
Step 3: Compute magnitudes: \(\sqrt{3^2+(-4)^2+2^2} = \sqrt{9+16+4} = \sqrt{29}\); \(\sqrt{1^2+2^2+(-3)^2} = \sqrt{1+4+9} = \sqrt{14}\).
Step 4: \(\cos\theta = \frac{|-11|}{\sqrt{29}\sqrt{14}} = \frac{11}{\sqrt{406}}\).
Step 5: \(\theta = \cos^{-1}\left(\frac{11}{\sqrt{406}}\right) \approx \cos^{-1}(0.546) \approx 56.9^\circ\).
A wrong answer often comes from forgetting the absolute value (giving \(\cos\theta\) negative), miscalculating the dot product signs, or arithmetic errors in the magnitudes.

## DIAGNOSTIC_QUESTION_4
Two lines are given in vector form: \(\vec{r} = (2\hat{i} - \hat{j} + 3\hat{k}) + \lambda(\hat{i} + 2\hat{j} - 2\hat{k})\) and \(\vec{r} = (-\hat{i} + 4\hat{k}) + \mu(3\hat{i} - 2\hat{j} + 6\hat{k})\). Without calculating the exact angle, determine whether the lines are perpendicular, parallel, or neither. Justify your answer using the direction vectors.

## DIAGNOSTIC_ANSWER_4
Direction vectors: \(\vec{b_1} = \hat{i} + 2\hat{j} - 2\hat{k}\) and \(\vec{b_2} = 3\hat{i} - 2\hat{j} + 6\hat{k}\).
Check perpendicular: \(\vec{b_1} \cdot \vec{b_2} = 1(3) + 2(-2) + (-2)(6) = 3 - 4 - 12 = -13 \neq 0\) → not perpendicular.
Check parallel: Ratios \(\frac{1}{3}, \frac{2}{-2}=-1, \frac{-2}{6}=-\frac{1}{3}\) are not equal → not parallel.
Therefore, the lines are neither perpendicular nor parallel; they intersect at some angle (skew or intersecting). A wrong answer might incorrectly claim parallelism by comparing only two components, or claim perpendicularity by miscalculating the dot product.

## DIAGNOSTIC_QUESTION_5
A student solves for the angle between lines with direction ratios \((2, -1, 2)\) and \((1, 2, -2)\) and gets \(\cos\theta = \frac{2(1) + (-1)(2) + 2(-2)}{\sqrt{4+1+4}\sqrt{1+4+4}} = \frac{2-2-4}{3 \times 3} = \frac{-4}{9}\), then writes \(\theta = \cos^{-1}(-4/9) \approx 116.4^\circ\). Identify the error and give the correct angle.

## DIAGNOSTIC_ANSWER_5
The error: the student omitted the absolute value in the numerator. The formula requires \(\cos\theta = \frac{|a_1a_2+b_1b_2+c_1c_2|}{\dots}\). The dot product is \(-4\), so the absolute value is \(4\). Correct \(\cos\theta = \frac{4}{9}\), giving \(\theta = \cos^{-1}(4/9) \approx 63.6^\circ\) (acute). The student's answer \(116.4^\circ\) is the obtuse angle between the direction vectors, not the angle between the lines. This is a very common mistake in board exams.

## DIAGNOSTIC_QUESTION_6
Create a pair of lines in Cartesian form such that the angle between them is exactly \(60^\circ\). Provide the equations and verify your answer.

## DIAGNOSTIC_ANSWER_6
We need \(\cos 60^\circ = \frac{1}{2}\). Choose simple direction ratios: let line 1 have \((1,0,0)\) (x-axis). For line 2, we need \(\frac{|1\cdot a_2 + 0 + 0|}{\sqrt{1}\sqrt{a_2^2+b_2^2+c_2^2}} = \frac{1}{2} \Rightarrow \frac{|a_2|}{\sqrt{a_2^2+b_2^2+c_2^2}} = \frac{1}{2}\). Choose \(a_2=1\), then \(\sqrt{1+b_2^2+c_2^2}=2 \Rightarrow b_2^2+c_2^2=3\). Pick \(b_2=\sqrt{3}, c_2=0\). So line 2 direction ratios \((1, \sqrt{3}, 0)\). Equations: Line 1: \(\frac{x}{1}=\frac{y}{0}=\frac{z}{0}\) (x-axis). Line 2: \(\frac{x}{1}=\frac{y}{\sqrt{3}}=\frac{z}{0}\). Verification: \(\cos\theta = \frac{|1\cdot1+0\cdot\sqrt{3}+0\cdot0|}{\sqrt{1}\sqrt{1+3}} = \frac{1}{2} \Rightarrow \theta=60^\circ\). A good answer shows the design process and verification. A poor answer might give lines that don't satisfy the condition or fail to verify.

## COMMON_MISCONCEPTION
**Misconception:** "The angle between two lines is given by \(\cos\theta = \frac{a_1a_2+b_1b_2+c_1c_2}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}}\) without absolute value." Students often forget the absolute value because in 2D (Class 11) the formula \(\tan\theta = \left|\frac{m_1-m_2}{1+m_1m_2}\right|\) has absolute value, but the dot product formula in 3D is often memorized without it. This leads to obtuse angles (e.g., \(120^\circ\)) being reported as the angle between lines, while the correct answer is the acute supplement (\(60^\circ\)). Another misconception: confusing the parallel condition \(\frac{a_1}{a_2}=\frac{b_1}{b_2}=\frac{c_1}{c_2}\) with the perpendicular condition \(a_1a_2+b_1b_2+c_1c_2=0\); students sometimes set the dot product equal to 1 for parallel lines.

## ON_FAILURE
If a student forgets the absolute value, have them draw two lines in 2D with slopes \(m_1=1\) (45°) and \(m_2=-1\) (-45°). The angle between them is 90°, but the dot product of direction vectors \((1,1)\) and \((1,-1)\) is 0, giving \(\cos\theta=0\) correctly. Then take \((1,1)\) and \((-1,-1)\) (same line, opposite direction): dot product = -2, magnitudes \(\sqrt{2}\) each, \(\cos\theta = -1 \Rightarrow \theta=180^\circ\) without absolute value, but the lines are the same so angle should be 0°. This visual demonstration forces the absolute value. Then re-practice 5 problems from NCERT Exercise 11.2 (questions 8, 9, 10) with emphasis on writing the absolute value bars every time.

## PREREQUISITE_NODE_IDS
c12_math_cbse_11_001, c12_math_cbse_11_002, c11_math_cbse_10_008, c11_math_cbse_12_001
## PREREQUISITE_REASONS
c12_math_cbse_11_001: Direction cosines and direction ratios are needed to extract direction ratios from line equations and to use the direction-cosine form of the angle formula.
c12_math_cbse_11_002: Equation of a line in 3D (vector and Cartesian forms) is required to identify direction ratios from given line equations before applying the angle formula.
c11_math_cbse_10_008: Angle between two lines in 2D provides the conceptual foundation (acute angle, use of slopes) that extends to 3D using direction ratios.
c11_math_cbse_12_001: Coordinates of a point in 3D space and distance formula underlie the derivation of direction ratios from two points, which is sometimes needed when lines are given by points.

## FORWARD_NODE_IDS
c12_math_cbse_11_009, c12_math_cbse_11_010, c12_math_cbse_11_004

## FORWARD_REASONS
c12_math_cbse_11_009: Angle between two planes uses the angle between their normals, which is computed by the same dot-product formula as angle between lines; understanding line-line angle is prerequisite for plane-plane angle.
c12_math_cbse_11_010: Angle between a line and a plane is defined as the complement of the angle between the line and the plane's normal; this directly uses the line-line angle formula.
c12_math_cbse_11_004: Angle between lines uses dot product; cross product magnitude relates to sine of angle, reinforcing vector product geometry.  

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_04_003, c12_phy_cbse_05_002
## CROSS_SUBJECT_REASONS
c12_physics_ch04_003: In Physics (Moving Charges and Magnetism), the force on a current-carrying conductor in a magnetic field involves the angle between the current direction (line) and magnetic field direction (line); the formula \(F = BIl\sin\theta\) uses the sine of the angle between two lines in 3D.
c12_physics_ch05_002: In Physics (Magnetism and Matter), the torque on a magnetic dipole \(\vec{\tau} = \vec{m} \times \vec{B}\) involves the angle between the magnetic moment vector (line) and magnetic field vector (line); the angle between lines in 3D is essential for calculating torque magnitude.
c12_phy_cbse_04_003: Cross-subject support: When a charged particle moves in a uniform magnetic field with its velocity perpendicular... supplies tools/facts used directly in this node.  
c12_phy_cbse_05_002: Cross-subject support: Magnetic dipole moment (𝐦) is a vector quantity that characterizes the magnetic strength a... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_10_008 -> c12_math_cbse_11_001 -> c12_math_cbse_11_002 -> c12_math_cbse_11_003 -> c12_math_cbse_11_009 -> c12_math_cbse_11_010

## THIS_FORMULA
\(\cos\theta = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}}\) (using direction ratios) or \(\cos\theta = |l_1l_2 + m_1m_2 + n_1n_2|\) (using direction cosines)

## FORMULA_VARIABLES
\(a_1,b_1,c_1\) = direction ratios of first line; \(a_2,b_2,c_2\) = direction ratios of second line; \(l_1,m_1,n_1\) = direction cosines of first line; \(l_2,m_2,n_2\) = direction cosines of second line; \(\theta\) = acute angle between the lines (\(0 \le \theta \le \frac{\pi}{2}\))

## FORMULA_UNITS
dimensionless (angle in degrees or radians)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_04_003 | The magnetic force on a current-carrying wire uses the angle between the current direction vector and the magnetic field vector, computed via the same dot product formula.
 c12_phy_cbse_05_002 | The torque on a magnetic dipole in a uniform magnetic field requires the angle between the magnetic moment vector and the magnetic field vector, directly applying the angle between two lines in 3D.
## PREREQ_CONCEPT
Dot product of vectors and its geometric interpretation as \(\vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|\cos\theta\).

## PREREQ_BEFORE
The student must be able to extract direction ratios from the Cartesian or vector equation of a line in 3D and compute the dot product and magnitudes of two vectors.

## PREREQ_STUCK
If stuck, revisit c12_math_cbse_11_001 (direction cosines/ratios) and c12_math_cbse_11_002 (equation of line) to practice identifying direction ratios from various line representations.

## WORKED_EXAMPLE_1
PROBLEM: A telephone tower in Delhi is supported by two guy wires. One wire runs along the line \(\frac{x-10}{2} = \frac{y-5}{-1} = \frac{z}{3}\) and the other along \(\frac{x-10}{1} = \frac{y-5}{2} = \frac{z}{-2}\). Both wires are attached to the tower at the point (10, 5, 0). Find the angle between the two wires at the attachment point.

STEPS:
- Step 1: Identify that the angle between the wires is the angle between their direction vectors. From the Cartesian equations, the denominators give direction ratios: Wire 1: \(a_1=2, b_1=-1, c_1=3\); Wire 2: \(a_2=1, b_2=2, c_2=-2\).
- Step 2: Write the formula for the cosine of the angle: \(\cos\theta = \frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\sqrt{a_2^2+b_2^2+c_2^2}}\).
- Step 3: Substitute the direction ratios: Numerator = \(|2(1) + (-1)(2) + 3(-2)| = |2 - 2 - 6| = |-6| = 6\).
- Step 4: Compute magnitudes: \(\sqrt{2^2+(-1)^2+3^2} = \sqrt{4+1+9} = \sqrt{14}\); \(\sqrt{1^2+2^2+(-2)^2} = \sqrt{1+4+4} = \sqrt{9} = 3\).
- Step 5: \(\cos\theta = \frac{6}{\sqrt{14} \times 3} = \frac{2}{\sqrt{14}} = \frac{2\sqrt{14}}{14} = \frac{\sqrt{14}}{7}\). Then \(\theta = \cos^{-1}\left(\frac{\sqrt{14}}{7}\right) \approx \cos^{-1}(0.5345) \approx 57.7^\circ\).

REASONING: The angle between two intersecting lines is determined solely by their directions. The Cartesian form directly provides direction ratios in the denominators. The absolute value ensures the acute angle is obtained, which is the physical angle between the wires.

ANSWER: \(\theta = \cos^{-1}\left(\frac{\sqrt{14}}{7}\right) \approx 57.7^\circ\)

## WORKED_EXAMPLE_2
PROBLEM: Find the value of \(p\) such that the lines \(\frac{x-1}{2} = \frac{y-3}{p} = \frac{z+2}{-1}\) and \(\frac{x+4}{1} = \frac{y-2}{3} = \frac{z-5}{4}\) are perpendicular to each other.

STEPS:
- Step 1: Extract direction ratios. Line 1: \((2, p, -1)\). Line 2: \((1, 3, 4)\).
- Step 2: Recall the condition for perpendicular lines: \(a_1a_2 + b_1b_2 + c_1c_2 = 0\).
- Step 3: Substitute: \(2(1) + p(3) + (-1)(4) = 0 \Rightarrow 2 + 3p - 4 = 0 \Rightarrow 3p - 2 = 0\).
- Step 4: Solve for \(p\): \(3p = 2 \Rightarrow p = \frac{2}{3}\).
- Step 5: Verify: With \(p = \frac{2}{3}\), direction ratios are \((2, \frac{2}{3}, -1)\) and \((1, 3, 4)\). Dot product = \(2(1) + \frac{2}{3}(3) + (-1)(4) = 2 + 2 - 4 = 0\). Condition satisfied.

REASONING: Perpendicular lines have a dot product of zero. The parameter \(p\) appears only in the direction ratios of the first line, so the perpendicular condition gives a linear equation in \(p\). This is a typical board exam question (1-2 marks).

ANSWER: \(p = \frac{2}{3}\)

## WORKED_EXAMPLE_3
PROBLEM: A line passes through points \(A(2, -1, 3)\) and \(B(5, 0, 1)\). Another line passes through points \(C(-1, 2, 4)\) and \(D(2, 3, 2)\). Find the angle between the two lines. Also, determine if the lines intersect (i.e., are they skew or intersecting?).

STEPS:
- Step 1: Find direction ratios of line AB: \(x_2-x_1=5-2=3\), \(y_2-y_1=0-(-1)=1\), \(z_2-z_1=1-3=-2\) → \((3, 1, -2)\).
- Step 2: Find direction ratios of line CD: \(2-(-1)=3\), \(3-2=1\), \(2-4=-2\) → \((3, 1, -2)\).
- Step 3: Observe that direction ratios are identical: \((3,1,-2)\) and \((3,1,-2)\). Thus the lines are parallel (or coincident).
- Step 4: Angle between parallel lines: \(\cos\theta = \frac{|3\cdot3 + 1\cdot1 + (-2)(-2)|}{\sqrt{9+1+4}\sqrt{9+1+4}} = \frac{|9+1+4|}{14} = \frac{14}{14} = 1 \Rightarrow \theta = 0^\circ\).
- Step 5: Check if they are the same line (coincident) or distinct parallel lines. Check if point C lies on line AB. Parametric form of AB: \(x=2+3\lambda, y=-1+\lambda, z=3-2\lambda\). For C(-1,2,4): \(2+3\lambda=-1 \Rightarrow \lambda=-1\); then \(y=-1+(-1)=-2 \neq 2\). So C is not on AB. The lines are parallel but distinct.
- Step 6: Since they are parallel and distinct, they do not intersect (they are parallel lines in 3D, which are coplanar but not skew).

REASONING: When direction ratios are proportional, lines are parallel. The angle is \(0^\circ\). To distinguish coincident vs distinct parallel lines, check if a point of one line satisfies the equation of the other. This combines concepts from "Equation of a Line" and "Angle Between Lines".

ANSWER: Angle = \(0^\circ\) (lines are parallel and distinct, hence they do not intersect).

## COMPETENCY_QUESTION_1
QUESTION: Two lines are given by \(\vec{r} = (\hat{i} + 2\hat{j} - \hat{k}) + \lambda(2\hat{i} - \hat{j} + \hat{k})\) and \(\frac{x-3}{1} = \frac{y+1}{k} = \frac{z-2}{-2}\). (a) Find the value of \(k\) for which the lines are perpendicular. (b) For that value of \(k\), find the angle between the lines if the second line's direction ratios are changed to \((1, k+1, -2)\). (c) Explain why the angle between two lines is always taken as the acute angle.

COMPETENCY: Translating real-world situations to mathematical expressions; Comparing and justifying

STEPS:
- Step 1: Identify direction vectors: Line 1: \(\vec{b_1} = (2, -1, 1)\). Line 2 (original): \(\vec{b_2} = (1, k, -2)\).
- Step 2: For perpendicular, \(\vec{b_1} \cdot \vec{b_2} = 0 \Rightarrow 2(1) + (-1)(k) + 1(-2) = 0 \Rightarrow 2 - k - 2 = 0 \Rightarrow k = 0\).
- Step 3: For part (b), new direction ratios of line 2: \((1, k+1, -2) = (1, 1, -2)\) (since \(k=0\)).
- Step 4: Compute angle: \(\cos\theta = \frac{|2(1) + (-1)(1) + 1(-2)|}{\sqrt{4+1+1}\sqrt{1+1+4}} = \frac{|2 -1 -2|}{\sqrt{6}\sqrt{6}} = \frac{1}{6}\). \(\theta = \cos^{-1}(1/6)\).
- Step 5: Justification for acute angle: Two lines in space extend infinitely in both directions; the angle between them is the smaller of the two supplementary angles formed by their direction vectors, ensuring a unique measure between 0° and 90°.

ANSWER: (a) \(k = 0\). (b) \(\theta = \cos^{-1}(1/6) \approx 80.4^\circ\). (c) The angle between two lines is defined as the acute angle between their direction vectors (or their opposites) to give a unique value in \([0, \frac{\pi}{2}]\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A drone flies along the path \(\frac{x}{2} = \frac{y-10}{-1} = \frac{z-5}{2}\) (distances in meters). A bird flies along \(\vec{r} = (4\hat{i} + 8\hat{j} + 3\hat{k}) + \mu(\hat{i} + 2\hat{j} - 2\hat{k})\). (a) Find the angle between their flight paths. (b) At the instant the drone is at (4, 8, 9), the bird is at (5, 10, 1). Find the distance between them at that instant. (c) If the drone changes its course to be perpendicular to the bird's path while still passing through (4, 8, 9), find the new direction ratios of the drone's path (choose the simplest integer ratios).

COMPETENCY: Multi-step problem solving combining geometry and algebra; Applying mathematical concepts to real-world scenarios

STEPS:
- Step 1: Direction ratios: Drone: \((2, -1, 2)\); Bird: \((1, 2, -2)\).
- Step 2: Angle: \(\cos\theta = \frac{|2(1) + (-1)(2) + 2(-2)|}{\sqrt{4+1+4}\sqrt{1+4+4}} = \frac{|2-2-4|}{3 \times 3} = \frac{4}{9}\). \(\theta = \cos^{-1}(4/9)\).
- Step 3: Drone at (4,8,9): Check it lies on its path: \(\frac{4}{2}=2\), \(\frac{8-10}{-1}=2\), \(\frac{9-5}{2}=2\) → yes. Bird at \(\mu=1\): \((4+1, 8+2, 3-2) = (5,10,1)\) → yes.
- Step 4: Distance between (4,8,9) and (5,10,1): \(\sqrt{(1)^2+(2)^2+(-8)^2} = \sqrt{1+4+64} = \sqrt{69}\) m.
- Step 5: New drone direction perpendicular to bird's direction \((1,2,-2)\). Let new ratios be \((a,b,c)\). Condition: \(a(1)+b(2)+c(-2)=0 \Rightarrow a+2b-2c=0\). Choose simplest integers: let \(b=1, c=0 \Rightarrow a=-2\) → \((-2,1,0)\). Or \(b=0, c=1 \Rightarrow a=2\) → \((2,0,1)\). Many answers possible; simplest: \((2,0,1)\) or \((-2,1,0)\).

ANSWER: (a) \(\theta = \cos^{-1}(4/9) \approx 63.6^\circ\). (b) Distance = \(\sqrt{69}\) m ≈ 8.31 m. (c) One possible set: \((2, 0, 1)\) (or \((-2, 1, 0)\), etc., satisfying \(a+2b-2c=0\)).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The angle between two lines in three-______ space is defined as the acute angle between their direction vectors (or lines parallel to them passing through the origin).

## DIAGNOSTIC_ANSWER_7
dimensional

Dimensional completes the compound: three-dimensional lines angle via direction vectors, with slopes long retired. **A wrong answer (a two-dimensional word) reveals the student has answered for a flatland formula this definition replaced.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To ______ the joints are cut at the correct angle, you must find the angle between these beams.

## DIAGNOSTIC_ANSWER_8
ensure

The ensuring verb is the joint's quality control: the angle exists to be computed so the cuts can be checked against it. **A wrong answer (an assuming verb) reveals the student has trusted the joints the walkthrough is built to verify.** The ensuring verb is the joint's inspection: the computed angle is what the cut is checked against.
