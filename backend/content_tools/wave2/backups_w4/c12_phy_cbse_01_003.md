## ELI5
One charged ruler lifts the paper bits; bring a second and the bits answer both at once. The superposition principle says each pair of charges interacts exactly as if the others were absent - the net force is the vector sum of the pairwise Coulomb forces. No averaging of magnitudes: resolve each force into components, add the components algebraically, and let the resultant speak with its own magnitude and direction.

## DEFINITION
The superposition principle for electric forces states that the net electrostatic force on a given charge due to a system of multiple other charges is the vector sum of the individual forces exerted by each charge independently; the force between any two charges is unaffected by the presence of other charges. The net force \(\vec{F}_{\text{net}}\) on a test charge \(q\) due to source charges \(q_1, q_2, \dots, q_n\) is \(\vec{F}_{\text{net}} = \sum_{i=1}^n \vec{F}_i\), where each \(\vec{F}_i = \frac{1}{4\pi\varepsilon_0} \frac{q q_i}{r_i^2} \hat{r}_i\) is the Coulomb force from charge \(q_i\) at distance \(r_i\) along the unit vector \(\hat{r}_i\) pointing from \(q_i\) to \(q\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute the net electrostatic force on a charge in a system of 3–4 discrete point charges by: (1) calculating each pairwise Coulomb force magnitude with correct units, (2) determining the direction of each force vector using geometry or coordinate axes, (3) resolving vectors into rectangular components, (4) summing components algebraically, and (5) reporting the resultant force magnitude and direction with SI units.

## SCOPE_BOUNDARY
This node covers the superposition principle for discrete point charges in vacuum/air as per NCERT Section 1.6. It does NOT cover continuous charge distributions (node c12_phy_cbse_01_012), electric field superposition (node c12_phy_cbse_01_004), or forces in dielectric media. The principle is applied to static configurations only.

## WALKTHROUGH
Imagine you rub a plastic ruler with wool and bring it near small paper bits on your desk — they jump up. Now bring a second charged ruler near the same paper bits. The paper bits experience a force from each ruler simultaneously. To find the net force, you cannot simply add the magnitudes; you must add the forces as vectors because force has direction. This is exactly what the superposition principle tells us: each charge acts independently, and the net force is the vector sum. We start by recalling Coulomb's law (node c12_phy_cbse_01_002) for the magnitude of each pairwise force. Then we use vector addition (Class 11: c11_phy_cbse_03_003) to combine them. The key formula is \(\vec{F}_{\text{net}} = \sum \vec{F}_i\). In board exams, you will often be given coordinates or geometric arrangements (equilateral triangle, square, line) and asked to find the net force on one charge. In JEE/NEET, you may need to find equilibrium positions or the charge required to hold a system in balance.

Takeaway first: forces from multiple charges add as vectors, each pair's interaction blissfully ignorant of the spectators - that independence is what makes the principle a principle. Exam moves: computation questions on three or four charges in geometric arrangements, component-resolution questions, equilibrium-position questions, and units-and-direction reporting. Method: rerun the two rulers - Coulomb for each pair's magnitude, geometry for each direction, components summed. Check yourself: symmetry is a shortcut, not a law - symmetric arrangements can zero individual components, but the claim must be argued from the vectors, not asserted from the picture's beauty. Drill: compute the net force on one charge of a triangle and report magnitude with direction.

## DIAGNOSTIC_QUESTION_1
State the superposition principle for electric forces in your own words. What is the mathematical expression for the net force on a charge \(q\) due to charges \(q_1, q_2, \dots, q_n\)?

## DIAGNOSTIC_ANSWER_1
The superposition principle states that the force on a charge due to multiple other charges is the vector sum of the individual forces, and each pairwise force is unaffected by other charges. Mathematically, \(\vec{F}_{\text{net}} = \sum_{i=1}^n \frac{1}{4\pi\varepsilon_0} \frac{q q_i}{r_i^2} \hat{r}_i\). A wrong answer (e.g., "forces add as scalars" or "the presence of a third charge changes the force between two charges") reveals that the student has not grasped the vector nature of force or the independence of pairwise interactions — a fundamental error that leads to incorrect net force calculations in both board and competitive exams.

## DIAGNOSTIC_QUESTION_2
Three point charges \(+q\), \(+q\), and \(-q\) are placed at the vertices of an equilateral triangle of side \(a\). A student claims: "The net force on the \(-q\) charge is zero because the two \(+q\) charges are equal and opposite in sign to \(-q\), so their forces cancel." Is the student correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The student is incorrect. The forces from the two \(+q\) charges on the \(-q\) charge are both attractive, directed along the lines joining \(-q\) to each \(+q\). These two force vectors are at 60° to each other (not 180°), so they do not cancel; their vector sum is non-zero and directed along the symmetry axis toward the midpoint of the two \(+q\) charges. This misconception arises from treating forces as scalars or assuming opposite signs automatically imply cancellation regardless of geometry. In board exams, such an error loses full marks for direction and magnitude.

## DIAGNOSTIC_QUESTION_3
Three charges are placed on the x-axis: \(q_1 = +2.0\ \mu\text{C}\) at \(x = 0\), \(q_2 = -3.0\ \mu\text{C}\) at \(x = 10\ \text{cm}\), and \(q_3 = +4.0\ \mu\text{C}\) at \(x = 20\ \text{cm}\). Calculate the net electrostatic force on \(q_2\). Use \(k = 9 \times 10^9\ \text{N·m}^2/\text{C}^2\).

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify forces on \(q_2\). Force from \(q_1\): attractive (opposite signs), so \(\vec{F}_{21}\) points toward \(q_1\) (negative x-direction). Magnitude: \(F_{21} = k \frac{|q_2 q_1|}{r_{21}^2} = (9\times10^9) \frac{(3.0\times10^{-6})(2.0\times10^{-6})}{(0.10)^2} = 5.4\ \text{N}\). So \(\vec{F}_{21} = -5.4\ \hat{i}\ \text{N}\).  
**Step 2:** Force from \(q_3\): attractive (opposite signs), so \(\vec{F}_{23}\) points toward \(q_3\) (positive x-direction). Distance \(r_{23} = 0.10\ \text{m}\). \(F_{23} = (9\times10^9) \frac{(3.0\times10^{-6})(4.0\times10^{-6})}{(0.10)^2} = 10.8\ \text{N}\). So \(\vec{F}_{23} = +10.8\ \hat{i}\ \text{N}\).  
**Step 3:** Net force: \(\vec{F}_{\text{net}} = \vec{F}_{21} + \vec{F}_{23} = (-5.4 + 10.8)\ \hat{i} = +5.4\ \hat{i}\ \text{N}\).  
**Answer:** \(5.4\ \text{N}\) in the \(+x\) direction (toward \(q_3\)).  
A wrong answer (e.g., \(16.2\ \text{N}\) or \(-5.4\ \text{N}\)) reveals sign errors in force direction or incorrect distance usage — common in board exams where students forget that force direction depends on both sign and relative position.

## DIAGNOSTIC_QUESTION_4
Two identical charges \(+Q\) are fixed at \((0, a)\) and \((0, -a)\) on the y-axis. A third charge \(+q\) is placed at \((x, 0)\) on the x-axis. Without calculating the exact magnitude, determine the direction of the net force on \(+q\) and explain how the magnitude varies as \(x\) increases from 0 to \(\infty\). Sketch a qualitative graph of \(F_{\text{net}}\) vs \(x\).

## DIAGNOSTIC_ANSWER_4
By symmetry, the y-components of the forces from the two \(+Q\) charges cancel exactly. The x-components add up, so the net force is along the \(+x\) direction (repulsive). At \(x=0\), the forces are equal and opposite along y, but their x-components are zero, so \(F_{\text{net}} = 0\). As \(x\) increases, the x-component of each force initially increases (because the angle with the x-axis decreases, increasing \(\cos\theta\)), reaches a maximum, then decreases as \(1/r^2\) dominates. The graph starts at 0, rises to a peak, then falls asymptotically to 0. A student who says "force decreases monotonically" or "force is always along y" has not analyzed vector components or symmetry — a typical JEE trap.

## DIAGNOSTIC_QUESTION_5
A student solves the problem: "Three charges \(+q, +q, +q\) are at the vertices of an equilateral triangle of side \(a\). Find the force on one charge." Their solution: \(F = \frac{1}{4\pi\varepsilon_0} \frac{q^2}{a^2} + \frac{1}{4\pi\varepsilon_0} \frac{q^2}{a^2} = \frac{2}{4\pi\varepsilon_0} \frac{q^2}{a^2}\). Identify the error and give the correct expression.

## DIAGNOSTIC_ANSWER_5
The student added the magnitudes as scalars, ignoring that the two forces are at 60° to each other. The correct net force magnitude is \(F_{\text{net}} = 2 F \cos 30^\circ = 2 \left(\frac{1}{4\pi\varepsilon_0} \frac{q^2}{a^2}\right) \frac{\sqrt{3}}{2} = \frac{\sqrt{3}}{4\pi\varepsilon_0} \frac{q^2}{a^2}\). The error is a classic vector addition mistake: treating forces as scalars. In board exams, this loses marks for both method and final answer; in JEE, it leads to wrong options in MCQs.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a gold-leaf electroscope and two known charged spheres to verify the superposition principle. Describe the procedure, what you would measure, and how you would confirm that the net force is the vector sum.

## DIAGNOSTIC_ANSWER_6
**Procedure:** (1) Charge sphere A with \(+Q\) and bring it near the electroscope knob; note leaf divergence \(\theta_1\) (proportional to force). (2) Discharge electroscope, bring sphere B with \(+Q\) to same distance; note \(\theta_2\). (3) Bring both A and B simultaneously to symmetric positions on either side of the knob at same distance; note \(\theta_{\text{both}}\). (4) If superposition holds, the horizontal components of forces add, vertical components cancel. For symmetric placement, \(\theta_{\text{both}} = 2\theta_1 \cos\alpha\) where \(\alpha\) is the angle from horizontal. Measure \(\theta_{\text{both}}\) and compare. A good answer includes a clear diagram, identifies the measured quantity (divergence angle), and explains how vector addition is tested. A poor answer omits vector components or assumes scalar addition, showing the student cannot translate the principle into an experimental test.

## COMMON_MISCONCEPTION
Students often believe that the net force is the algebraic sum of the magnitudes of individual forces (scalar addition) because they overlook the vector nature of force. For example, in an equilateral triangle of three equal charges, they write \(F_{\text{net}} = 2F\) instead of \(F_{\text{net}} = \sqrt{3}F\). Another error: they think the force between two charges changes when a third charge is brought nearby, violating the independence of pairwise interactions. Both errors stem from not internalizing that force is a vector and that Coulomb's law for a pair is unaffected by other charges.

## ON_FAILURE
If the student cannot correctly add force vectors, they must revisit: (1) Class 11 vector addition by components (c11_phy_cbse_03_003, c11_phy_cbse_03_004) — practice resolving vectors into x/y components and summing. (2) Coulomb's law magnitude and direction rules (c12_phy_cbse_01_002) — drill 10 problems identifying attractive/repulsive direction from charge signs and geometry. (3) Re-attempt Diagnostic Questions 2, 3, and 5 with a focus on drawing free-body diagrams and writing each force in \(\hat{i}, \hat{j}\) form before summing.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_01_001, c12_phy_cbse_01_002, c11_phy_cbse_03_002, c11_phy_cbse_03_003, c11_phy_cbse_03_004
## PREREQUISITE_REASONS
c12_phy_cbse_01_001: Understanding charge properties (quantization, sign) is needed to determine force direction (attractive/repulsive).
c12_phy_cbse_01_002: Coulomb's law gives the magnitude and direction of each pairwise force — the building block for superposition.
c11_phy_cbse_03_002: Graphical vector addition (parallelogram law) provides intuition for resultant direction.
c11_phy_cbse_03_003: Analytical vector addition using components is the standard method for calculating net force in 2D/3D.
c11_phy_cbse_03_004: Resolution of vectors into components is essential for handling non-collinear charges (e.g., triangle, square configurations).

## FORWARD_NODE_IDS
c12_phy_cbse_01_004, c12_phy_cbse_01_005, c12_phy_cbse_01_012, c12_phy_cbse_01_008, c12_phy_cbse_01_011, c12_math_cbse_03_006, c11_phy_cbse_07_004

## FORWARD_REASONS
c12_phy_cbse_01_004: Electric field is defined as force per unit test charge; superposition of forces directly implies superposition of electric fields.
c12_phy_cbse_01_005: The field of a point charge is the simplest application of field superposition; the formula \(E = kQ/r^2\) is derived by placing a test charge and using Coulomb's law + superposition.
c12_phy_cbse_01_012: Continuous charge distributions require integrating the superposition principle over infinitesimal charge elements — the direct extension of discrete superposition.
c12_phy_cbse_01_008: Superposition principle justifies why total **E** in the integral is due to all charges, but q_enclosed counts only internal charges.  
c12_phy_cbse_01_011: Superposition principle allows adding fields of +q and –q to get net dipole field.  
c12_math_cbse_03_006: c12_phy_cbse_01_003 | Scalar multiplication of vectors (kv) is the vector analog of matrix scalar multiplication; both scale each component by k and preserve direction/dimension.  
c11_phy_cbse_07_004: g = GM/R² and verify result is m/s². 4. If stuck on inverse-square, revisit Coulomb's law analogy (c12_phy_cbse_01_003) or geometry of flux through a sphere.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_002, c11_math_cbse_10_006, c11_math_cbse_10_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_002: Distance formula \(\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\) is used to compute separation \(r\) between charges in coordinate geometry problems.
c11_math_cbse_10_006: Slope of the line joining two charges gives the direction of the force vector; needed to find \(\cos\theta, \sin\theta\) for component resolution.
c11_math_cbse_10_007: Parallel/perpendicular slopes help identify when force components cancel (e.g., symmetric configurations) or add.

## CHAIN_DESCRIPTION
c12_phy_cbse_01_002 -> c12_phy_cbse_01_003 -> c12_phy_cbse_01_004

## THIS_FORMULA
\(\vec{F}_{\text{net}} = \sum_{i=1}^n \vec{F}_i = \sum_{i=1}^n \frac{1}{4\pi\varepsilon_0} \frac{q q_i}{r_i^2} \hat{r}_i\) (SI units: newton, N)

## FORMULA_VARIABLES
\(\vec{F}_{\text{net}}\) = net electrostatic force on test charge \(q\) (N), \(q\) = test charge (C), \(q_i\) = i-th source charge (C), \(r_i\) = distance between \(q\) and \(q_i\) (m), \(\hat{r}_i\) = unit vector from \(q_i\) to \(q\) (dimensionless), \(\varepsilon_0\) = permittivity of free space = \(8.854 \times 10^{-12}\ \text{C}^2 \text{N}^{-1} \text{m}^{-2}\), \(k = \frac{1}{4\pi\varepsilon_0} \approx 9 \times 10^9\ \text{N·m}^2/\text{C}^2\)

## FORMULA_UNITS
N (newton), C (coulomb), m (metre), C² N⁻¹ m⁻² (permittivity)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_002 | Distance formula used to compute separation between charges in coordinate geometry problems.
c11_math_cbse_10_006 | Slope of line joining charges gives direction of force vector for component resolution.
c11_phy_cbse_03_003 | Analytical vector addition (components) is the core mathematical tool for superposition.
## PREREQ_CONCEPT
Vector addition of forces (Class 11 Physics) and Coulomb's law for pairwise electrostatic force.

## PREREQ_BEFORE
Student must be able to: (1) calculate Coulomb force magnitude between two charges, (2) determine if force is attractive or repulsive from charge signs, (3) resolve a vector into x- and y-components given its magnitude and angle, (4) add vectors by summing components.

## PREREQ_STUCK
Revisit vector components (c11_phy_cbse_03_003) and Coulomb's law direction rules (c12_phy_cbse_01_002); practice 5 problems drawing free-body diagrams for 3-charge systems.

## WORKED_EXAMPLE_1
**PROBLEM:** Three charges are placed at the vertices of a right triangle: \(q_A = +5.0\ \mu\text{C}\) at \((0,0)\), \(q_B = -3.0\ \mu\text{C}\) at \((4.0\ \text{cm}, 0)\), and \(q_C = +2.0\ \mu\text{C}\) at \((0, 3.0\ \text{cm})\). Find the net electrostatic force on \(q_A\). Use \(k = 9 \times 10^9\ \text{N·m}^2/\text{C}^2\).

**STEPS:**
- Step 1: Identify given quantities with units. \(q_A = +5.0 \times 10^{-6}\ \text{C}\), \(q_B = -3.0 \times 10^{-6}\ \text{C}\) at \(x_B = 0.040\ \text{m}\), \(q_C = +2.0 \times 10^{-6}\ \text{C}\) at \(y_C = 0.030\ \text{m}\). Find \(\vec{F}_{\text{net}}\) on \(q_A\).
- Step 2: Compute force on \(q_A\) due to \(q_B\). Distance \(r_{AB} = 0.040\ \text{m}\). Signs: \(q_A\) positive, \(q_B\) negative → attractive → force on \(q_A\) points toward \(q_B\) (along \(+x\)). Magnitude: \(F_{AB} = k \frac{|q_A q_B|}{r_{AB}^2} = (9\times10^9) \frac{(5.0\times10^{-6})(3.0\times10^{-6})}{(0.040)^2} = 84.375\ \text{N}\). Vector: \(\vec{F}_{AB} = +84.375\ \hat{i}\ \text{N}\).
- Step 3: Compute force on \(q_A\) due to \(q_C\). Distance \(r_{AC} = 0.030\ \text{m}\). Signs: both positive → repulsive → force on \(q_A\) points away from \(q_C\) (along \(-y\)). Magnitude: \(F_{AC} = k \frac{|q_A q_C|}{r_{AC}^2} = (9\times10^9) \frac{(5.0\times10^{-6})(2.0\times10^{-6})}{(0.030)^2} = 100\ \text{N}\). Vector: \(\vec{F}_{AC} = -100\ \hat{j}\ \text{N}\).
- Step 4: Add components. \(F_x = +84.375\ \text{N}\), \(F_y = -100\ \text{N}\). Magnitude: \(F_{\text{net}} = \sqrt{(84.375)^2 + (-100)^2} = \sqrt{7119 + 10000} = \sqrt{17119} \approx 130.8\ \text{N}\). Direction: \(\theta = \tan^{-1}(F_y/F_x) = \tan^{-1}(-100/84.375) \approx -49.9^\circ\) (i.e., \(49.9^\circ\) below the \(+x\)-axis).
- Step 5: Verify reasonableness. Forces are large because charges are \(\mu\text{C}\) at cm distances — typical for lab-scale electrostatics. Units: N. Answer is physically plausible.

**REASONING:** The superposition principle allows us to compute each pairwise force independently using Coulomb's law. Because force is a vector, we must assign direction based on the geometry (attractive/repulsive) and the coordinate axes. Adding components is the most systematic method for non-collinear forces. The right triangle geometry simplifies component assignment: one force is purely along x, the other purely along y.

**ANSWER:** \(\vec{F}_{\text{net}} = (84.4\ \hat{i} - 100\ \hat{j})\ \text{N}\); magnitude \(131\ \text{N}\) at \(49.9^\circ\) below the positive x-axis.

## WORKED_EXAMPLE_2
**PROBLEM:** Four charges are placed at the corners of a square of side \(10\ \text{cm}\): \(q_1 = +2.0\ \mu\text{C}\) at \((0,0)\), \(q_2 = -2.0\ \mu\text{C}\) at \((10\ \text{cm}, 0)\), \(q_3 = +2.0\ \mu\text{C}\) at \((10\ \text{cm}, 10\ \text{cm})\), \(q_4 = -2.0\ \mu\text{C}\) at \((0, 10\ \text{cm})\). Find the net force on \(q_1\). Use \(k = 9 \times 10^9\ \text{N·m}^2/\text{C}^2\).

**STEPS:**
- Step 1: List charges and positions. \(q_1(0,0)\), \(q_2(0.10,0)\), \(q_3(0.10,0.10)\), \(q_4(0,0.10)\). All \(|q| = 2.0 \times 10^{-6}\ \text{C}\). Find \(\vec{F}_{\text{net}}\) on \(q_1\).
- Step 2: Force from \(q_2\) (at \((0.10,0)\)): opposite signs → attractive → toward \(q_2\) along \(+x\). \(r_{12} = 0.10\ \text{m}\). \(F_{12} = k \frac{q^2}{r^2} = (9\times10^9) \frac{(2.0\times10^{-6})^2}{(0.10)^2} = 3.6\ \text{N}\). \(\vec{F}_{12} = +3.6\ \hat{i}\ \text{N}\).
- Step 3: Force from \(q_4\) (at \((0,0.10)\)): opposite signs → attractive → toward \(q_4\) along \(+y\). \(r_{14} = 0.10\ \text{m}\). \(F_{14} = 3.6\ \text{N}\). \(\vec{F}_{14} = +3.6\ \hat{j}\ \text{N}\).
- Step 4: Force from \(q_3\) (at \((0.10,0.10)\)): same sign → repulsive → away from \(q_3\). Vector from \(q_3\) to \(q_1\) is \((-0.10, -0.10)\). Distance \(r_{13} = \sqrt{0.10^2 + 0.10^2} = 0.10\sqrt{2}\ \text{m} = 0.1414\ \text{m}\). Magnitude: \(F_{13} = k \frac{q^2}{r_{13}^2} = (9\times10^9) \frac{4.0\times10^{-12}}{(0.02)} = 1.8\ \text{N}\). Unit vector from \(q_3\) to \(q_1\): \(\hat{r}_{13} = \frac{-0.10\hat{i} -0.10\hat{j}}{0.1414} = -\frac{1}{\sqrt{2}}\hat{i} - \frac{1}{\sqrt{2}}\hat{j}\). \(\vec{F}_{13} = 1.8 \left(-\frac{1}{\sqrt{2}}\hat{i} - \frac{1}{\sqrt{2}}\hat{j}\right) = -1.273\ \hat{i} - 1.273\ \hat{j}\ \text{N}\).
- Step 5: Sum components. \(F_x = 3.6 - 1.273 = 2.327\ \text{N}\). \(F_y = 3.6 - 1.273 = 2.327\ \text{N}\). Magnitude: \(F_{\text{net}} = \sqrt{2.327^2 + 2.327^2} = 2.327\sqrt{2} \approx 3.29\ \text{N}\). Direction: \(\theta = \tan^{-1}(1) = 45^\circ\) (along the diagonal toward \(q_3\)).
- Step 6: Check units and plausibility. Net force is along the diagonal toward the opposite corner, as expected from symmetry. Magnitude is between 0 and sum of individual forces (9 N). Units correct.

**REASONING:** In symmetric configurations, identifying force directions from geometry is crucial. The diagonal force has equal x and y components. Using unit vectors avoids angle mistakes. The net force points toward the center of the square because the two adjacent attractive forces dominate the one diagonal repulsive force.

**ANSWER:** \(\vec{F}_{\text{net}} = (2.33\ \hat{i} + 2.33\ \hat{j})\ \text{N}\); magnitude \(3.29\ \text{N}\) at \(45^\circ\) to the x-axis (toward the center of the square).

## WORKED_EXAMPLE_3
**PROBLEM:** Two fixed charges \(q_1 = +4.0\ \mu\text{C}\) at \(x = 0\) and \(q_2 = +9.0\ \mu\text{C}\) at \(x = 30\ \text{cm}\) are placed on the x-axis. Where on the x-axis (other than infinity) can a third charge \(q_3 = -1.0\ \mu\text{C}\) be placed so that the net force on it is zero? Is the equilibrium stable or unstable?

**STEPS:**
- Step 1: Understand the problem. We need a position \(x\) where forces from \(q_1\) and \(q_2\) on \(q_3\) cancel. \(q_3\) is negative; both \(q_1\) and \(q_2\) are positive → both forces are attractive. For cancellation, the forces must be in opposite directions. This can only happen if \(q_3\) is between \(q_1\) and \(q_2\) (so \(q_1\) pulls left, \(q_2\) pulls right) or outside the segment but then both pulls are in the same direction. So \(q_3\) must be between 0 and 30 cm.
- Step 2: Let \(x\) be the distance from \(q_1\) (at 0) to \(q_3\). Then distance to \(q_2\) is \((0.30 - x)\) meters. Force magnitudes: \(F_1 = k \frac{|q_1 q_3|}{x^2}\), \(F_2 = k \frac{|q_2 q_3|}{(0.30 - x)^2}\). Set \(F_1 = F_2\).
- Step 3: Cancel \(k\) and \(|q_3|\): \(\frac{4.0}{x^2} = \frac{9.0}{(0.30 - x)^2}\). Take square roots (positive since distances > 0): \(\frac{2}{x} = \frac{3}{0.30 - x}\).
- Step 4: Cross-multiply: \(2(0.30 - x) = 3x\) → \(0.60 - 2x = 3x\) → \(0.60 = 5x\) → \(x = 0.12\ \text{m} = 12\ \text{cm}\).
- Step 5: Check: \(x = 12\ \text{cm}\), \(0.30 - x = 18\ \text{cm}\). Ratio of distances = \(12:18 = 2:3\). Ratio of charges = \(4:9 = (2)^2:(3)^2\). Force ratio: \(\frac{4/12^2}{9/18^2} = \frac{4/144}{9/324} = \frac{1/36}{1/36} = 1\). Correct.
- Step 6: Stability: If \(q_3\) is displaced slightly toward \(q_1\), distance to \(q_1\) decreases → force from \(q_1\) increases more than force from \(q_2\) decreases (since \(F \propto 1/r^2\)). Net force pulls it further toward \(q_1\). Similarly, displacement toward \(q_2\) increases force from \(q_2\). The equilibrium is **unstable** (any small displacement grows).

**REASONING:** This problem combines superposition with equilibrium condition (\(F_{\text{net}} = 0\)). The key insight is that for two like charges, a test charge of opposite sign can only be in equilibrium between them. The stability analysis uses the inverse-square nature: the force gradient is steeper on the side of the smaller distance, making the equilibrium a "hilltop" rather than a "valley". This is a classic JEE/NEET concept.

**ANSWER:** The charge \(q_3\) must be placed at \(x = 12\ \text{cm}\) from \(q_1\) (i.e., 12 cm from the \(+4\ \mu\text{C}\) charge, 18 cm from the \(+9\ \mu\text{C}\) charge). The equilibrium is **unstable**.

## COMPETENCY_QUESTION_1
**QUESTION:** Three point charges are fixed at the vertices of an equilateral triangle of side \(L\): \(q_A = +Q\), \(q_B = +Q\), \(q_C = -Q\). A student claims: "If we double the side length to \(2L\), the net force on each charge will become half of its original value." Is the student correct? Justify your answer with reasoning and, if incorrect, state the correct factor.

**COMPETENCY:** Predicting outcomes from changing variables (scaling analysis)

**STEPS:**
- Step 1: Recall the force magnitude between two charges scales as \(1/r^2\). If \(r\) doubles, each pairwise force becomes \(1/4\) of original.
- Step 2: The net force on any charge is the vector sum of two pairwise forces. Since the geometry (angles) remains the same (equilateral triangle), the vector sum scales exactly like the individual forces.
- Step 3: Therefore, if \(L \to 2L\), each force \(\to F/4\), so net force \(\to F_{\text{net}}/4\), not \(F_{\text{net}}/2\).
- Step 4: Conclude the student is wrong; the correct factor is \(1/4\).

**ANSWER:** The student is incorrect. The electrostatic force follows an inverse-square law: \(F \propto 1/r^2\). Doubling the side length \(L\) reduces each pairwise force to one-fourth. Since the angular geometry is unchanged, the vector sum (net force) also reduces to one-fourth of its original value. The correct factor is \(1/4\).

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** A charge \(+q\) is placed at the centre of a square of side \(a\). Four identical charges \(-q\) are placed at the four corners. (a) Show that the net force on the central charge is zero. (b) If one corner charge is removed, find the magnitude and direction of the net force on the central charge. (c) If the central charge is displaced slightly along the diagonal toward the missing corner, will it return to the centre or move further away? Explain.

**COMPETENCY:** Designing solutions for electrostatic equilibrium and stability analysis

**STEPS:**
- Step 1: (a) By symmetry, each corner charge attracts the central \(+q\) along the diagonal toward that corner. The four forces are equal in magnitude and symmetrically directed; their vector sum is zero.
- Step 2: (b) Remove the charge at, say, top-right corner. The remaining three forces: from bottom-left (attractive, along diagonal toward bottom-left), from bottom-right (attractive, toward bottom-right), from top-left (attractive, toward top-left). Resolve into x/y components. Let square be centred at origin, corners at \((\pm a/2, \pm a/2)\). Distance from centre to corner: \(r = a/\sqrt{2}\). Force magnitude from each corner: \(F = k \frac{q^2}{r^2} = k \frac{q^2}{a^2/2} = \frac{2kq^2}{a^2}\). Components: bottom-left \((-F/\sqrt{2}, -F/\sqrt{2})\), bottom-right \((+F/\sqrt{2}, -F/\sqrt{2})\), top-left \((-F/\sqrt{2}, +F/\sqrt{2})\). Sum: \(F_x = -F/\sqrt{2}\), \(F_y = -F/\sqrt{2}\). Magnitude: \(F_{\text{net}} = \sqrt{2} \cdot F/\sqrt{2} = F = \frac{2kq^2}{a^2}\). Direction: toward the missing corner (top-right).
- Step 3: (c) Displace central charge slightly toward the missing corner (top-right). Now it is closer to the two adjacent corners (top-left and bottom-right) and farther from the opposite corner (bottom-left). The attractive forces from the adjacent corners increase and have components pulling it further toward the missing corner. The force from the opposite corner decreases. Net force is away from centre → **unstable**; it moves further toward the missing corner.

**ANSWER:** (a) Zero by symmetry. (b) Magnitude \(\frac{2kq^2}{a^2}\), directed toward the missing corner. (c) Unstable equilibrium; the charge will move further away from the centre toward the missing corner.

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The ______ principle for electric forces states that the net electrostatic force on a given charge due to a system of multiple other charges is the vector sum of the individual forces exerted by each charge independently; the force between any two charges is unaffected by the presence of other charges.

## DIAGNOSTIC_ANSWER_7
superposition

The superposition principle is the additivity law: pairwise forces computed independently, then summed as vectors. **A wrong answer (quantisation) reveals the student has imported the earlier node's property where this node's own summing rule was asked for.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you rub a plastic ______ with wool and bring it near small paper bits on your desk — they jump up.

## DIAGNOSTIC_ANSWER_8
ruler

The ruler is the charged actor: wool-rubbed, it pulls the paper bits and demonstrates the pairwise force the principle sums. **A wrong answer (a balloon) reveals the student has swapped the demonstration's prop and with it the walkthrough's scene.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can compute the net electrostatic force on a charge in a system of 3–4 discrete point charges by: (1) calculating each pairwise Coulomb force magnitude with correct units, (2) determining the direction of each force vector using geometry or coordinate axes, (3) resolving vectors into rectangular components, (4) summing.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ you rub a plastic ruler with wool and bring it near small paper bits on your desk — they jump up.

## DIAGNOSTIC_ANSWER_10
Imagine

The imperative opens the demonstration: the ruler is rubbed first, so the forces have a stage before the vector sum arrives. **A wrong answer (a formula) reveals the student has answered the quoted opener with the machinery it leads into.** The imperative starts the demonstration: the ruler is rubbed before the second one arrives, so the pairwise forces have a stage.
