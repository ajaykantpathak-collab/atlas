## ELI5
A rubbed ruler nears paper bits and they jump - though nothing touched them. The space around the ruler is not empty; it carries an electric field, probed by placing a tiny positive test charge and dividing the felt force by that charge. Field is force per unit charge, a vector pointing the way a positive probe would be pushed, and it obeys superposition: fields from several sources add as vectors, component by component.

## DEFINITION
Electric field at a point in space is defined as the electrostatic force per unit positive test charge placed at that point, without disturbing the source charge distribution. It is a vector quantity with SI unit newton per coulomb (N/C) or volt per metre (V/m). For a point charge Q, the electric field at a distance r is given by \(\vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{Q}{r^2} \hat{r}\), where \(\hat{r}\) is the unit vector pointing from Q to the field point.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) calculate the electric field vector at a given point due to a single point charge using the formula with correct direction, and (2) apply the superposition principle to find the net electric field due to a system of discrete charges by vector addition of individual field contributions.

## SCOPE_BOUNDARY
This node covers the definition of electric field, its calculation for a point charge, and the superposition principle for a system of discrete charges. It does NOT cover electric field lines, electric flux, Gauss's law, continuous charge distributions, or dipole fields — those are separate nodes (c12_phy_cbse_01_005 onward).

## WALKTHROUGH
Imagine you rub a plastic ruler against your dry hair and hold it near tiny bits of paper — the paper jumps up even though the ruler doesn't touch them. Something in the space around the ruler exerts a force. That "something" is the electric field. To quantify it, we place a tiny positive test charge \(q_0\) at a point and measure the force \(\vec{F}\) on it. The electric field is \(\vec{E} = \vec{F}/q_0\). Because force follows Coulomb's law and superposition, the field does too. Start by drawing the position vectors of source charges relative to the field point, compute each field vector using the point-charge formula, then add them component-wise. The key formula is \(\vec{E} = \frac{1}{4\pi\varepsilon_0} \sum_i \frac{q_i}{r_i^2} \hat{r}_i\).

Takeaway first: the field is force normalised to unit positive charge - defined without disturbing the sources - and it inherits both Coulomb's inverse square and superposition from its parent force. Exam moves: definition questions with units, single-charge field questions with direction, and superposition questions summing fields component-wise. Method: rerun the ruler-and-paper - the probe inserted, the quotient taken, the field's direction read from the probe's would-be push. Check yourself: the test charge must be tiny precisely so it never rearranges the sources; a large probe redefines the very field it is measuring. Drill: compute one point-charge field with direction, then add a second source's field component-wise.

## DIAGNOSTIC_QUESTION_1
What is the SI unit of electric field, and how is it derived from the definition \(\vec{E} = \vec{F}/q\)?

## DIAGNOSTIC_ANSWER_1
The SI unit is newton per coulomb (N/C). Since force is measured in newtons (N) and charge in coulombs (C), the ratio gives N/C. A common wrong answer is "V/m" without realizing it is equivalent; another is "C/N" which inverts the definition. If a student gives "N·C" or "C/N", they have confused the definition of field as force per unit charge.

## DIAGNOSTIC_QUESTION_2
A positive point charge \(+Q\) is placed at the origin. At a point P on the positive x-axis, what is the direction of the electric field vector? Explain why the direction would be opposite if the source charge were \(-Q\).

## DIAGNOSTIC_ANSWER_2
For \(+Q\), the field at P points radially away from the charge, i.e., along \(+\hat{x}\). For \(-Q\), the field points radially toward the charge, i.e., along \(-\hat{x}\). This follows from the definition: a positive test charge would be repelled by \(+Q\) and attracted to \(-Q\). If a student says the field direction is the same for both, they have missed that the sign of the source charge determines the direction of the force on a positive test charge.

## DIAGNOSTIC_QUESTION_3
Two point charges, \(q_1 = +3\,\mu\text{C}\) and \(q_2 = -4\,\mu\text{C}\), are placed on the x-axis at \(x = 0\) and \(x = 0.10\,\text{m}\) respectively. Calculate the electric field at the midpoint between them. Use \(\frac{1}{4\pi\varepsilon_0} = 9 \times 10^9\,\text{N·m}^2/\text{C}^2\).

## DIAGNOSTIC_ANSWER_3
Midpoint is at \(x = 0.05\,\text{m}\). Distance from each charge to midpoint: \(r = 0.05\,\text{m}\).  
Field due to \(q_1\): \(E_1 = 9 \times 10^9 \times \frac{3 \times 10^{-6}}{(0.05)^2} = 1.08 \times 10^7\,\text{N/C}\), direction \(+\hat{x}\) (away from \(+q_1\)).  
Field due to \(q_2\): \(E_2 = 9 \times 10^9 \times \frac{4 \times 10^{-6}}{(0.05)^2} = 1.44 \times 10^7\,\text{N/C}\), direction \(+\hat{x}\) (toward \(-q_2\)).  
Net field: \(E_{\text{net}} = (1.08 + 1.44) \times 10^7 = 2.52 \times 10^7\,\text{N/C}\) along \(+\hat{x}\).  
A wrong answer often arises if the student takes the direction of \(E_2\) as \(-\hat{x}\) (thinking negative charge always gives negative field) or forgets to convert \(\mu\text{C}\) to C.

## DIAGNOSTIC_QUESTION_4
Three identical point charges \(+q\) are placed at the vertices of an equilateral triangle of side \(a\). A student claims the electric field at the centroid is zero because of symmetry. Is this claim correct? Justify your answer by analyzing the vector sum.

## DIAGNOSTIC_ANSWER_4
Yes, the claim is correct. At the centroid, each charge produces a field of equal magnitude \(E = \frac{1}{4\pi\varepsilon_0} \frac{q}{(a/\sqrt{3})^2} = \frac{1}{4\pi\varepsilon_0} \frac{3q}{a^2}\) directed radially outward from each vertex. The three vectors are spaced \(120^\circ\) apart; their vector sum is zero. If a student says "non-zero because charges are positive", they confuse field with potential (which would be non-zero) or fail to add vectors properly.

## DIAGNOSTIC_QUESTION_5
A student solves for the electric field at a point due to two charges and writes: \(\vec{E}_{\text{net}} = \frac{1}{4\pi\varepsilon_0} \left( \frac{q_1}{r_1^2} + \frac{q_2}{r_2^2} \right)\) without any vector notation. Identify the error and explain why this expression is physically incomplete.

## DIAGNOSTIC_ANSWER_5
The expression treats electric field as a scalar sum, ignoring direction. Electric field is a vector; the correct superposition is \(\vec{E}_{\text{net}} = \frac{1}{4\pi\varepsilon_0} \left( \frac{q_1}{r_1^2} \hat{r}_1 + \frac{q_2}{r_2^2} \hat{r}_2 \right)\). The student's version would only be valid if both fields were exactly parallel. If they don't include unit vectors or specify directions, they have not understood that superposition is vector addition.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using household items to demonstrate that an electric field exists around a charged object even when no test charge is present. Describe what you would observe and how it relates to the concept of electric field.

## DIAGNOSTIC_ANSWER_6
Rub a balloon on wool to charge it. Bring it near a thin stream of water from a tap — the stream bends toward the balloon. The water molecules are polar; the field of the balloon aligns them and exerts a net force. This shows the field exists in the space around the balloon and can act on charges/dipoles. A poor answer would describe only attraction of paper bits without explaining that the field is the mediator, or would confuse magnetic effects.

## COMMON_MISCONCEPTION
Students often think the electric field at a point depends on the test charge used to measure it, writing \(E = F/q\) and then substituting a specific test charge value as if \(E\) changes with \(q\). They forget the limit \(q \to 0\) in the definition, or they confuse the force on a particular test charge with the field itself. For example, they might say "if I double the test charge, the electric field doubles" — which is false because the force also doubles, keeping the ratio constant.

## ON_FAILURE
If a student exhibits this misconception, have them revisit the definition: \(\vec{E} = \lim_{q \to 0} \vec{F}/q\). Do a quick thought experiment: "Place a \(+1\,\mu\text{C}\) test charge at point P and measure force \(\vec{F}\). Now replace it with \(+2\,\mu\text{C}\) — the force doubles, but the ratio \(\vec{F}/q\) stays the same. The field is a property of the source charges and the point in space, not the test charge." Then ask them to compute \(E\) at a point due to a fixed source charge using two different test charges and verify the ratio is identical. Reference node c12_phy_cbse_01_002 (Coulomb's Law) to recall that force is proportional to test charge.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_01_001, c12_phy_cbse_01_002, c12_phy_cbse_01_003, c11_phy_cbse_03_003, c11_phy_cbse_03_005, c11_math_cbse_12_002
## PREREQUISITE_REASONS
c12_phy_cbse_01_001: Understanding charge quantization and sign conventions is essential for assigning correct signs to source charges in field calculations.
c12_phy_cbse_01_002: Coulomb's law gives the force between charges; electric field is derived directly from it by dividing by test charge.
c12_phy_cbse_01_003: Superposition principle for forces extends directly to electric fields; the vector addition method is identical.
c11_phy_cbse_03_003: Analytical vector addition (components) is required to sum electric field vectors from multiple charges.
c11_phy_cbse_03_005: Vector addition using components is the practical method for superposition in 2D/3D.
c11_math_cbse_12_002: Distance formula in 3D is needed to compute \(r_i\) when charges and field points have coordinates.

## FORWARD_NODE_IDS
c12_phy_cbse_01_005, c12_phy_cbse_01_006, c12_phy_cbse_01_007, c12_phy_cbse_01_011, c12_phy_cbse_01_009, c12_phy_cbse_01_012

## FORWARD_REASONS
c12_phy_cbse_01_005: This node provides the general definition and superposition method; the next node applies it specifically to a point charge to derive the standard formula.
c12_phy_cbse_01_006: Electric field lines are a pictorial representation of the vector field defined here.
c12_phy_cbse_01_007: Electric flux is defined as \(\vec{E} \cdot \Delta\vec{S}\); understanding \(\vec{E}\) as a vector field is prerequisite.
c12_phy_cbse_01_011: Dipole field is a superposition of two point charge fields; the calculation method is directly built on this node.
c12_phy_cbse_01_009: Electric field definition and superposition principle are required to understand that the field is a vector and adds from each charge element.  
c12_phy_cbse_01_012: Electric field definition E = F/q converts the force integral to field integral; reinforces E is a vector.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_006, c11_math_cbse_10_007, c11_math_cbse_12_001, c11_math_cbse_12_002
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_006: Slope of a line and angle between lines are used to determine direction of field vectors in 2D coordinate geometry.
c11_math_cbse_10_007: Parallel and perpendicular line concepts help in resolving field components along axes.
c11_math_cbse_12_001: 3D coordinates are used to specify positions of charges and field points in space.
c11_math_cbse_12_002: Distance formula in 3D gives the separation \(r\) between source charge and field point, needed for magnitude calculation.

## CHAIN_DESCRIPTION
c12_phy_cbse_01_002 -> c12_phy_cbse_01_004 -> c12_phy_cbse_01_005

## THIS_FORMULA
\(\vec{E} = \frac{\vec{F}}{q_0} = \frac{1}{4\pi\varepsilon_0} \sum_{i=1}^{n} \frac{q_i}{r_i^2} \hat{r}_i\) (SI unit: N/C or V/m)

## FORMULA_VARIABLES
\(\vec{E}\) = electric field vector (N/C), \(\vec{F}\) = electrostatic force on test charge (N), \(q_0\) = test charge (C), \(\frac{1}{4\pi\varepsilon_0} = 9 \times 10^9\,\text{N·m}^2/\text{C}^2\), \(q_i\) = source charge i (C), \(r_i\) = distance from source charge i to field point (m), \(\hat{r}_i\) = unit vector from source charge i to field point (dimensionless)

## FORMULA_UNITS
N/C, V/m, C, m, N·m²/C²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_12_002 | Distance formula in 3D gives the magnitude r for each source charge to the field point.
c11_phy_cbse_03_003 | Vector addition by components is the mathematical tool for superposition of electric fields.
## PREREQ_CONCEPT
Coulomb's law and vector superposition of forces.

## PREREQ_BEFORE
The student must be able to compute the force between two point charges using Coulomb's law and add multiple force vectors using components.

## PREREQ_STUCK
If stuck, review Coulomb's law (c12_phy_cbse_01_002) and vector addition by components (c11_phy_cbse_03_003).

## WORKED_EXAMPLE_1
PROBLEM: A charge \(q_1 = +2.0\,\mu\text{C}\) is placed at the origin, and a charge \(q_2 = -3.0\,\mu\text{C}\) is placed at \((0.10\,\text{m}, 0)\) on the x-axis. Find the electric field at point P located at \((0, 0.10\,\text{m})\) on the y-axis. Use \(\frac{1}{4\pi\varepsilon_0} = 9 \times 10^9\,\text{N·m}^2/\text{C}^2\).

STEPS:
- Step 1: Identify given quantities: \(q_1 = +2.0 \times 10^{-6}\,\text{C}\) at (0,0), \(q_2 = -3.0 \times 10^{-6}\,\text{C}\) at (0.10, 0), field point P at (0, 0.10). Need \(\vec{E}_{\text{net}}\) at P.
- Step 2: Compute distances from each charge to P. For \(q_1\): \(r_1 = 0.10\,\text{m}\). For \(q_2\): \(r_2 = \sqrt{(0.10)^2 + (0.10)^2} = 0.1414\,\text{m}\).
- Step 3: Determine unit vectors \(\hat{r}_1\) and \(\hat{r}_2\) from each charge to P. \(\hat{r}_1\) points from (0,0) to (0,0.10) = \(+\hat{y}\). \(\hat{r}_2\) points from (0.10,0) to (0,0.10) = \((-0.10\hat{x} + 0.10\hat{y})/0.1414 = -0.707\hat{x} + 0.707\hat{y}\).
- Step 4: Calculate field magnitudes: \(E_1 = 9 \times 10^9 \times \frac{2.0 \times 10^{-6}}{(0.10)^2} = 1.8 \times 10^6\,\text{N/C}\). \(E_2 = 9 \times 10^9 \times \frac{3.0 \times 10^{-6}}{(0.1414)^2} = 1.35 \times 10^6\,\text{N/C}\).
- Step 5: Compute vector fields: \(\vec{E}_1 = 1.8 \times 10^6 (+\hat{y}) = (0, 1.8 \times 10^6)\). \(\vec{E}_2 = 1.35 \times 10^6 (-0.707\hat{x} + 0.707\hat{y}) = (-9.54 \times 10^5, 9.54 \times 10^5)\).
- Step 6: Add components: \(\vec{E}_{\text{net}} = (-9.54 \times 10^5, 1.8 \times 10^6 + 9.54 \times 10^5) = (-9.54 \times 10^5, 2.75 \times 10^6)\,\text{N/C}\). Magnitude = \(\sqrt{(-9.54e5)^2 + (2.75e6)^2} = 2.91 \times 10^6\,\text{N/C}\). Direction: \(\theta = \tan^{-1}(2.75e6 / -9.54e5) = 109^\circ\) from +x axis (second quadrant).

REASONING: The electric field is a vector; we must compute each contribution's magnitude and direction separately using the point-charge formula, then add them component-wise. The sign of the source charge determines whether the field points toward or away from it.

ANSWER: \(\vec{E}_{\text{net}} = (-9.54 \times 10^5\,\hat{x} + 2.75 \times 10^6\,\hat{y})\,\text{N/C}\); magnitude \(2.91 \times 10^6\,\text{N/C}\) at \(109^\circ\) from +x axis.

## WORKED_EXAMPLE_2
PROBLEM: In a hydrogen atom, the electron and proton are separated by \(5.3 \times 10^{-11}\,\text{m}\) (Bohr radius). Calculate the electric field produced by the proton at the location of the electron. State the direction.

STEPS:
- Step 1: Identify source charge: proton charge \(q = +e = +1.602 \times 10^{-19}\,\text{C}\). Distance \(r = 5.3 \times 10^{-11}\,\text{m}\). Field point is at the electron's position.
- Step 2: Use point-charge formula: \(E = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2}\).
- Step 3: Substitute values: \(E = 9 \times 10^9 \times \frac{1.602 \times 10^{-19}}{(5.3 \times 10^{-11})^2}\).
- Step 4: Compute denominator: \((5.3 \times 10^{-11})^2 = 2.809 \times 10^{-21}\,\text{m}^2\). Numerator: \(9 \times 10^9 \times 1.602 \times 10^{-19} = 1.4418 \times 10^{-9}\).
- Step 5: Divide: \(E = \frac{1.4418 \times 10^{-9}}{2.809 \times 10^{-21}} = 5.13 \times 10^{11}\,\text{N/C}\).
- Step 6: Direction: Proton is positive, so field points radially away from proton. At the electron's position, the field points from proton toward electron? Wait: field points away from positive charge. So at the electron's location, the field points from proton to electron? Actually, the electron is at distance r from proton. The field at the electron's location points away from the proton. Since the electron is located at that point, the field vector points from the proton to the electron (radially outward). But the force on the electron is opposite because electron charge is negative. The question asks for field produced by proton at electron's location: direction is radially outward from proton, i.e., from proton to electron.

REASONING: The electric field of a point charge depends only on the source charge and distance. The proton's field at the electron's orbit is enormous compared to everyday fields, which is why the electron is bound.

ANSWER: \(E = 5.13 \times 10^{11}\,\text{N/C}\) directed radially outward from the proton (i.e., from proton toward electron).

## WORKED_EXAMPLE_3
PROBLEM: Three charges are placed at the corners of a square of side \(a = 0.20\,\text{m}\): \(q_A = +5\,\mu\text{C}\) at (0,0), \(q_B = -5\,\mu\text{C}\) at (a,0), \(q_C = +5\,\mu\text{C}\) at (0,a). Find the electric field at the fourth corner D (a,a). Use \(k = 9 \times 10^9\,\text{N·m}^2/\text{C}^2\).

STEPS:
- Step 1: Set up coordinates: A(0,0), B(0.20,0), C(0,0.20), D(0.20,0.20). Charges: \(q_A = +5\mu\text{C}\), \(q_B = -5\mu\text{C}\), \(q_C = +5\mu\text{C}\).
- Step 2: Compute vectors from each charge to D:
  From A: \(\vec{r}_{AD} = (0.20, 0.20)\), \(r_{AD} = \sqrt{0.20^2+0.20^2} = 0.2828\,\text{m}\), \(\hat{r}_{AD} = (0.707, 0.707)\).
  From B: \(\vec{r}_{BD} = (0, 0.20)\), \(r_{BD} = 0.20\,\text{m}\), \(\hat{r}_{BD} = (0, 1)\).
  From C: \(\vec{r}_{CD} = (0.20, 0)\), \(r_{CD} = 0.20\,\text{m}\), \(\hat{r}_{CD} = (1, 0)\).
- Step 3: Magnitudes: \(E_A = k \frac{5e-6}{(0.2828)^2} = 9e9 \times 5e-6 / 0.08 = 5.625 \times 10^5\,\text{N/C}\).
  \(E_B = k \frac{5e-6}{(0.20)^2} = 9e9 \times 5e-6 / 0.04 = 1.125 \times 10^6\,\text{N/C}\).
  \(E_C = same as E_B = 1.125 \times 10^6\,\text{N/C}\).
- Step 4: Directions: \(q_A > 0\) → field away from A → along \(\hat{r}_{AD}\). \(q_B < 0\) → field toward B → opposite to \(\hat{r}_{BD}\)? Wait: \(\hat{r}_{BD}\) points from B to D. For negative charge, field points toward the charge, i.e., from D to B. So direction is \(-\hat{r}_{BD} = (0, -1)\). \(q_C > 0\) → field away from C → along \(\hat{r}_{CD} = (1, 0)\).
- Step 5: Vector fields:
  \(\vec{E}_A = 5.625e5 \times (0.707, 0.707) = (3.98e5, 3.98e5)\).
  \(\vec{E}_B = 1.125e6 \times (0, -1) = (0, -1.125e6)\).
  \(\vec{E}_C = 1.125e6 \times (1, 0) = (1.125e6, 0)\).
- Step 6: Sum: \(E_x = 3.98e5 + 0 + 1.125e6 = 1.523e6\). \(E_y = 3.98e5 - 1.125e6 + 0 = -7.27e5\).
  Magnitude = \(\sqrt{(1.523e6)^2 + (-7.27e5)^2} = 1.69 \times 10^6\,\text{N/C}\).
  Angle = \(\tan^{-1}(-7.27e5 / 1.523e6) = -25.5^\circ\) (below +x axis).

REASONING: This problem combines superposition, vector components, and sign-dependent direction. The geometry of a square simplifies distances but requires careful assignment of unit vectors based on charge signs.

ANSWER: \(\vec{E}_{\text{net}} = (1.52 \times 10^6\,\hat{x} - 7.27 \times 10^5\,\hat{y})\,\text{N/C}\); magnitude \(1.69 \times 10^6\,\text{N/C}\) at \(-25.5^\circ\) from +x axis.

## COMPETENCY_QUESTION_1
QUESTION: A small positively charged thermocol ball is suspended by a thread in a uniform electric field directed horizontally. The ball deflects and makes an angle \(\theta\) with the vertical. Derive an expression for the electric field magnitude \(E\) in terms of the ball's mass \(m\), charge \(q\), angle \(\theta\), and \(g\). If \(m = 0.5\,\text{g}\), \(q = 2\,\mu\text{C}\), and \(\theta = 30^\circ\), calculate \(E\).

COMPETENCY: Interpreting physical situations using formulas and vector equilibrium.

STEPS:
- Step 1: Draw free-body diagram: tension \(T\) along thread, weight \(mg\) downward, electric force \(qE\) horizontal.
- Step 2: Resolve tension: \(T \sin\theta = qE\) (horizontal), \(T \cos\theta = mg\) (vertical).
- Step 3: Divide: \(\tan\theta = qE / mg\) → \(E = \frac{mg \tan\theta}{q}\).
- Step 4: Substitute: \(m = 0.5 \times 10^{-3}\,\text{kg}\), \(g = 9.8\,\text{m/s}^2\), \(\tan 30^\circ = 1/\sqrt{3}\), \(q = 2 \times 10^{-6}\,\text{C}\).
- Step 5: Compute: \(E = \frac{(0.5e-3)(9.8)(1/\sqrt{3})}{2e-6} = \frac{4.9e-3 / 1.732}{2e-6} = \frac{2.83e-3}{2e-6} = 1.415 \times 10^3\,\text{N/C}\).

ANSWER: \(E = \frac{mg \tan\theta}{q}\); numerically \(1.42 \times 10^3\,\text{N/C}\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two point charges \(q_1 = +4\,\mu\text{C}\) and \(q_2 = +4\,\mu\text{C}\) are placed at \((-a, 0)\) and \((+a, 0)\) on the x-axis, with \(a = 0.10\,\text{m}\). A third charge \(q_3 = -2\,\mu\text{C}\) is placed at \((0, b)\) on the y-axis. Find the value of \(b\) such that the net electric force on \(q_3\) is zero. Explain why this is or isn't possible.

COMPETENCY: Predicting outcomes from changing variables and analyzing equilibrium conditions.

STEPS:
- Step 1: By symmetry, the x-components of forces from \(q_1\) and \(q_2\) on \(q_3\) cancel. The y-components add.
- Step 2: Force on \(q_3\) due to each: magnitude \(F = k \frac{|q_1 q_3|}{r^2}\) with \(r = \sqrt{a^2 + b^2}\). Direction: attractive (since \(q_3\) negative, \(q_1\) positive) so each force points toward the respective charge.
- Step 3: The y-component of each force: \(F_y = F \cos\phi = F \frac{b}{r} = k \frac{|q_1 q_3| b}{r^3}\).
- Step 4: Net y-force = \(2 F_y\) downward (toward x-axis). For net force to be zero, we need \(F_y = 0\) → either \(b=0\) or \(q_3=0\).
- Step 5: If \(b=0\), \(q_3\) is at origin, forces are equal and opposite along x-axis → net force zero. But then \(q_3\) is on the line joining \(q_1\) and \(q_2\), and the forces are along x, not y. Wait: at origin, distances to \(q_1\) and \(q_2\) are equal, forces are equal magnitude, opposite direction (one to left, one to right) → net force zero. So \(b=0\) works.
- Step 6: For any \(b>0\), there is a net downward force. No other \(b\) gives zero net force because both forces have downward y-components. Thus only solution is \(b=0\).

ANSWER: The net force on \(q_3\) is zero only at \(b = 0\) (the midpoint on the x-axis). For any \(b > 0\), the y-components of the two attractive forces add downward, so equilibrium is impossible off the axis. This is an example of Earnshaw's theorem: a charge cannot be held in stable equilibrium by electrostatic forces alone.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Electric field at a point in space is defined as the ______ force per unit positive test charge placed at that point, without disturbing the source charge distribution.

## DIAGNOSTIC_ANSWER_7
electrostatic

Electrostatic names the force being normalised: the field is that rest-charge force per unit positive probe. **A wrong answer (gravitational) reveals the student has normalised the wrong interaction - the field here carries polarity and can repel.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you rub a plastic ruler against your dry hair and hold it near tiny bits of paper — the paper jumps up even ______ the ruler doesn't touch them.

## DIAGNOSTIC_ANSWER_8
though

The although clause is action at a distance: the paper's leap needs no contact, which is the field's whole calling card. **A wrong answer (because) reveals the student has restored contact mechanics and dissolved the field's mystery.** The although clause is the field's credential: influence without contact is exactly what the concept was invented to explain.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can (1) calculate the electric field vector at a given point due to a single point charge using the formula with correct direction, and (2) apply the superposition principle to find the net electric field due to a system of discrete charges by vector addition of individual field contributions.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ you rub a plastic ruler against your dry hair and hold it near tiny bits of paper — the paper jumps up even though the ruler doesn't touch them.

## DIAGNOSTIC_ANSWER_10
Imagine

The imperative opens the demonstration: the ruler is rubbed before any field is defined, grounding the abstraction in a desk-side sight. **A wrong answer (a definition quote) reveals the student has answered the walkthrough's quoted opener with the sentence it sets up.**
