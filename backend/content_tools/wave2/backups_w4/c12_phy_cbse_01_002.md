## ELI5
A rubbed ruler lifts paper bits without touching them: action at a distance, quantified by Coulomb's Law. The electrostatic force between two stationary point charges grows with the product of the charges, shrinks with the square of the separation, and acts along the line joining them - repelling likes, attracting unlikes. The constant out front, roughly nine times ten to the ninth in SI units, is enormous, which is why even micro-coulombs argue loudly.

## DEFINITION
Coulomb's Law states that the electrostatic force between two stationary point charges is directly proportional to the product of their magnitudes and inversely proportional to the square of the distance between them, acting along the line joining the charges. The force is repulsive for like charges and attractive for unlike charges. In SI units, the magnitude is \(F = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2}\) where \(\varepsilon_0 = 8.854 \times 10^{-12} \ \text{C}^2 \text{N}^{-1} \text{m}^{-2}\) is the permittivity of free space.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can compute the magnitude and direction of the electrostatic force between two point charges given their magnitudes, signs, and separation in vacuum, correctly handling unit conversions (μC to C, cm to m) and applying the vector form to determine attraction or repulsion. The student can also explain why the law applies only to point charges at rest in vacuum.

## SCOPE_BOUNDARY
This node covers the statement, scalar and vector forms, and direct numerical application of Coulomb's Law for two point charges in vacuum. It does NOT cover superposition of multiple charges (next node), forces in dielectric media, or continuous charge distributions. The inverse-square dependence and the role of \(\varepsilon_0\) are emphasized.

## WALKTHROUGH
Observe a rubbed plastic ruler attracting tiny paper bits — the force acts at a distance without contact. This is the electrostatic force Coulomb quantified. Begin by recalling that charge is quantized (from c12_phy_cbse_01_001) and that point charges are an idealization where size ≪ separation. Measure force for different charge products and separations using a torsion balance (Coulomb's method). Plot \(F\) vs \(q_1q_2\) (linear) and \(F\) vs \(1/r^2\) (linear) to discover the proportionality. Combine to get \(F \propto q_1q_2/r^2\). Introduce \(k = 1/4\pi\varepsilon_0\) for SI consistency. Write the vector form using unit vectors along the line joining charges — this automatically handles attraction/repulsion via the sign of \(q_1q_2\). The key formula is \(\vec{F}_{12} = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2} \hat{r}_{12}\).

Takeaway first: Coulomb's Law is an inverse-square product law with direction along the joining line - the vector form's sign handling makes attraction and repulsion automatic. Exam moves: computation questions with unit conversions, direction questions from charge signs, and applicability questions on the point-charge-at-rest-in-vacuum restrictions. Method: rerun the ruler - charge quantisation recalled, torsion-balance proportions discovered, the constant introduced for SI consistency. Check yourself: the law is an idealisation - real charged bodies only obey it when their sizes drown in their separation; cite the idealisation, not just the formula. Drill: compute one force in newtons with microcoulombs and centimetres converted properly, and state its direction.

## DIAGNOSTIC_QUESTION_1
State Coulomb's Law in vector form for the force on charge \(q_2\) due to \(q_1\). Define every symbol and give the SI value of the proportionality constant \(k\).

## DIAGNOSTIC_ANSWER_1
\(\vec{F}_{12} = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2} \hat{r}_{12}\) where \(\vec{F}_{12}\) is force on \(q_2\) due to \(q_1\) (N), \(q_1, q_2\) are point charges (C), \(r\) is separation (m), \(\hat{r}_{12}\) is unit vector from \(q_1\) to \(q_2\), \(\varepsilon_0 = 8.854 \times 10^{-12} \ \text{C}^2 \text{N}^{-1} \text{m}^{-2}\), and \(k = 1/4\pi\varepsilon_0 \approx 9 \times 10^9 \ \text{N m}^2 \text{C}^{-2}\). A wrong answer reveals: missing vector notation (treating force as scalar), confusing \(\hat{r}_{12}\) with \(\hat{r}_{21}\), or using \(k = 9 \times 10^9\) without units.

## DIAGNOSTIC_QUESTION_2
Two charges \(+3 \ \mu\text{C}\) and \(-2 \ \mu\text{C}\) are placed 10 cm apart in vacuum. A student calculates the force magnitude as \(F = 9 \times 10^9 \times \frac{3 \times 2}{10^2} = 5.4 \times 10^9 \ \text{N}\). Identify every error in this calculation.

## DIAGNOSTIC_ANSWER_2
Errors: (1) Charges not converted to coulombs: \(3 \ \mu\text{C} = 3 \times 10^{-6} \ \text{C}\), \(-2 \ \mu\text{C} = -2 \times 10^{-6} \ \text{C}\). (2) Distance not converted to meters: \(10 \ \text{cm} = 0.1 \ \text{m}\). (3) Used \(r = 10\) instead of \(r^2 = 0.01\). (4) Ignored sign of product for direction (though magnitude uses absolute value). Correct: \(F = 9 \times 10^9 \times \frac{|3 \times 10^{-6} \times -2 \times 10^{-6}|}{(0.1)^2} = 5.4 \ \text{N}\) attractive. A wrong answer reveals the student treats μC and cm as SI units — a pervasive unit-conversion error.

## DIAGNOSTIC_QUESTION_3
Calculate the electrostatic force on a charge \(q_1 = +4.0 \ \mu\text{C}\) placed at \(x = 0\) due to \(q_2 = -6.0 \ \mu\text{C}\) at \(x = 30 \ \text{cm}\) on the x-axis. Express the answer in vector form using \(\hat{i}\).

## DIAGNOSTIC_ANSWER_3
Given: \(q_1 = +4.0 \times 10^{-6} \ \text{C}\), \(q_2 = -6.0 \times 10^{-6} \ \text{C}\), \(r = 0.30 \ \text{m}\). \(\hat{r}_{12} = +\hat{i}\) (from \(q_1\) to \(q_2\)). \(\vec{F}_{12} = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2} \hat{r}_{12} = (9 \times 10^9) \frac{(4.0 \times 10^{-6})(-6.0 \times 10^{-6})}{(0.30)^2} \hat{i} = -2.4 \ \hat{i} \ \text{N}\). The negative sign means force on \(q_1\) is toward \(q_2\) (attraction). A wrong answer reveals: sign error in vector direction, forgetting to square distance, or misplacing \(\hat{i}\) direction.

## DIAGNOSTIC_QUESTION_4
The force between two point charges is \(F\) when they are in vacuum. If the same charges are placed at the same separation in a medium of relative permittivity \(\varepsilon_r = 4\), what is the new force? Explain why Coulomb's Law in the form \(F = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2}\) does not directly apply.

## DIAGNOSTIC_ANSWER_4
New force \(F' = F / \varepsilon_r = F/4\). The given formula is strictly for vacuum (or air ≈ vacuum). In a dielectric medium, the permittivity becomes \(\varepsilon = \varepsilon_r \varepsilon_0\), so the force reduces by factor \(\varepsilon_r\). Coulomb's Law in matter is \(F = \frac{1}{4\pi\varepsilon} \frac{q_1 q_2}{r^2}\). A wrong answer reveals the student thinks the formula is universal for all media, missing the role of \(\varepsilon_0\) as "permittivity of free space" specifically.

## DIAGNOSTIC_QUESTION_5
A student claims: "Coulomb's Law proves that the force between two charges is always repulsive because \(k\), \(q_1\), \(q_2\), and \(r^2\) are all positive quantities." Evaluate this statement and correct the misconception.

## DIAGNOSTIC_ANSWER_5
The statement is false. The scalar magnitude formula \(F = k|q_1 q_2|/r^2\) uses absolute values and gives only magnitude. The vector form \(\vec{F}_{12} = k \frac{q_1 q_2}{r^2} \hat{r}_{12}\) includes the algebraic signs of \(q_1\) and \(q_2\). If \(q_1 q_2 > 0\) (like charges), \(\vec{F}_{12}\) is along \(\hat{r}_{12}\) (repulsion). If \(q_1 q_2 < 0\) (unlike charges), \(\vec{F}_{12}\) is opposite to \(\hat{r}_{12}\) (attraction). A wrong answer reveals the student confuses the magnitude formula with the vector law and ignores the sign of charge product.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment using only Coulomb's Law and Newton's Third Law to show that the forces \(\vec{F}_{12}\) and \(\vec{F}_{21}\) are equal in magnitude and opposite in direction for any two point charges \(q_1\) and \(q_2\).

## DIAGNOSTIC_ANSWER_6
From Coulomb's Law: \(\vec{F}_{12} = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2} \hat{r}_{12}\) and \(\vec{F}_{21} = \frac{1}{4\pi\varepsilon_0} \frac{q_2 q_1}{r^2} \hat{r}_{21}\). Since \(\hat{r}_{21} = -\hat{r}_{12}\) and multiplication is commutative (\(q_1 q_2 = q_2 q_1\)), we get \(\vec{F}_{21} = -\vec{F}_{12}\). This satisfies Newton's Third Law identically for all \(q_1, q_2, r\). A poor answer reveals the student cannot connect the vector direction reversal (\(\hat{r}_{21} = -\hat{r}_{12}\)) to the action-reaction pair.

## COMMON_MISCONCEPTION
Students treat Coulomb's Law as a scalar magnitude formula \(F = k q_1 q_2 / r^2\) and then separately "decide" attraction or repulsion based on charge signs. This leads to sign errors in vector problems (e.g., writing \(\vec{F} = +2.4 \hat{i} \ \text{N}\) for attraction when the vector form gives \(-2.4 \hat{i} \ \text{N}\)). The root error is not internalizing that the algebraic product \(q_1 q_2\) in the vector formula \(\vec{F}_{12} = k \frac{q_1 q_2}{r^2} \hat{r}_{12}\) automatically encodes direction: positive product → repulsion (along \(\hat{r}_{12}\)), negative product → attraction (opposite \(\hat{r}_{12}\)).

## ON_FAILURE
Step 1: Revisit the vector form derivation in NCERT Section 1.5 — note how \(\hat{r}_{21} = -\hat{r}_{12}\) and \(q_1 q_2\) sign combine. Step 2: Take three charge pairs: \((+q, +q)\), \((+q, -q)\), \((-q, -q)\) at fixed \(r\). Compute \(\vec{F}_{12}\) using the vector formula for each, explicitly writing \(\hat{r}_{12} = +\hat{i}\). Step 3: Verify that the sign of the result matches physical expectation without any "manual" decision. Step 4: Re-attempt Diagnostic Question 3. If sign error persists, review c11_phy_cbse_03_007 (Vector Addition Using Components) for unit vector manipulation.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_01_001, c11_phy_cbse_03_003, c11_phy_cbse_03_007, c11_phy_cbse_04_004
## PREREQUISITE_REASONS
c12_phy_cbse_01_001: Defines point charge, quantization, and charge sign conventions needed for \(q_1, q_2\).
c11_phy_cbse_03_003: Analytical vector addition and unit vectors (\(\hat{r}_{12}\)) are essential for the vector form of Coulomb's Law.
c11_phy_cbse_03_007: Resolution of vectors and component form needed when forces are not collinear (later superposition).
c11_phy_cbse_04_004: Newton's Third Law (action-reaction) underpins \(\vec{F}_{21} = -\vec{F}_{12}\) in Coulomb's Law.

## FORWARD_NODE_IDS
c12_phy_cbse_01_003, c12_phy_cbse_01_004, c12_phy_cbse_01_005, c12_phy_cbse_01_008, c12_phy_cbse_01_011, c12_phy_cbse_01_012

## FORWARD_REASONS
c12_phy_cbse_01_003: Superposition Principle builds directly on Coulomb's Law for two charges — it extends the pairwise force calculation to multiple charges via vector sum.
c12_phy_cbse_01_004: Electric Field is defined as force per unit test charge (\(E = F/q\)), so Coulomb's Law for a point charge directly gives the field of a point charge.
c12_phy_cbse_01_005: Electric Field Due to a Point Charge is the immediate application of Coulomb's Law with a unit test charge.
c12_phy_cbse_01_008: Coulomb's Law provides the inverse-square dependence that makes Gauss's Law work; the proof substitutes Coulomb's E.  
c12_phy_cbse_01_011: Coulomb's law gives force between point charges, the basis for dipole field calculation.  
c12_phy_cbse_01_012: Coulomb's law provides the fundamental force law dF = (1/4πε₀)(q dq/r²) r̂ that is integrated over the distribution.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_002, c11_math_cbse_10_006, c11_math_cbse_13_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_002: Distance formula in 3D (\(r = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}\)) is used to compute separation \(r\) from coordinates.
c11_math_cbse_10_006: Slope and direction cosines relate to unit vector \(\hat{r}_{12}\) components in 3D Coulomb force problems.
c11_math_cbse_13_008: Derivative of \(1/r^2\) appears in field/force variation problems and optimization (e.g., equilibrium position).

## CHAIN_DESCRIPTION
c12_phy_cbse_01_001 (charge properties) → c12_phy_cbse_01_002 (Coulomb's Law) → c12_phy_cbse_01_003 (superposition) → c12_phy_cbse_01_004 (electric field definition).

## THIS_FORMULA
\(\vec{F}_{12} = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2} \hat{r}_{12}\) (vector form); \(F = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2}\) (magnitude); \(k = \frac{1}{4\pi\varepsilon_0} \approx 9 \times 10^9 \ \text{N m}^2 \text{C}^{-2}\); \(\varepsilon_0 = 8.854 \times 10^{-12} \ \text{C}^2 \text{N}^{-1} \text{m}^{-2}\)

## FORMULA_VARIABLES
\(\vec{F}_{12}\) = force on \(q_2\) due to \(q_1\) (N), \(q_1, q_2\) = point charges (C), \(r\) = separation between charges (m), \(\hat{r}_{12}\) = unit vector from \(q_1\) to \(q_2\) (dimensionless), \(\varepsilon_0\) = permittivity of free space (C² N⁻¹ m⁻²), \(k\) = Coulomb's constant (N m² C⁻²)

## FORMULA_UNITS
N (force), C (charge), m (distance), C² N⁻¹ m⁻² (ε₀), N m² C⁻² (k)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_002 | Distance formula in 3D coordinates computes \(r\) for Coulomb's Law when charges are at \((x_1,y_1,z_1)\) and \((x_2,y_2,z_2)\).
c11_math_cbse_10_006 | Slope/direction cosines give components of \(\hat{r}_{12}\) for vector force in 3D: \(\hat{r}_{12} = \frac{(x_2-x_1)\hat{i} + (y_2-y_1)\hat{j} + (z_2-z_1)\hat{k}}{r}\).
c11_math_cbse_13_008 | Derivative \(dF/dr = -2k q_1 q_2 / r^3\) used in equilibrium/stability analysis (e.g., charge on a spring).
## PREREQ_CONCEPT
Vector representation of forces using unit vectors (from Class 11 Physics) and the concept of point charge with sign (from c12_phy_cbse_01_001).

## PREREQ_BEFORE
Student must be able to: (1) convert μC, mC to C and cm, mm to m, (2) write a unit vector between two points in 1D/2D/3D, (3) apply Newton's Third Law to force pairs.

## PREREQ_STUCK
If stuck on vector direction, revisit c11_phy_cbse_03_003 (analytical vector addition) and practice writing \(\hat{r}_{12}\) for charges on x-axis, then y-axis, then arbitrary coordinates.

## WORKED_EXAMPLE_1
PROBLEM: A small sphere A carries charge \(+2.0 \ \mu\text{C}\) and is fixed at the origin. Another sphere B with charge \(-3.0 \ \mu\text{C}\) is placed on the x-axis at \(x = 4.0 \ \text{cm}\). Calculate the electrostatic force on B due to A in vector form. (Use \(k = 9 \times 10^9 \ \text{N m}^2 \text{C}^{-2}\))
STEPS:
- Step 1: Identify given quantities with units: \(q_A = +2.0 \times 10^{-6} \ \text{C}\), \(q_B = -3.0 \times 10^{-6} \ \text{C}\), \(r = 4.0 \ \text{cm} = 0.040 \ \text{m}\). Force on B due to A is \(\vec{F}_{BA}\).
- Step 2: Determine unit vector \(\hat{r}_{AB}\) from A to B. Since A is at origin and B is at \(+x\), \(\hat{r}_{AB} = +\hat{i}\).
- Step 3: Write vector Coulomb's Law: \(\vec{F}_{BA} = k \frac{q_A q_B}{r^2} \hat{r}_{AB}\). Note the order: force on B (second subscript) due to A (first subscript) uses \(\hat{r}_{AB}\) (from A to B).
- Step 4: Substitute values with units: \(\vec{F}_{BA} = (9 \times 10^9) \frac{(2.0 \times 10^{-6})(-3.0 \times 10^{-6})}{(0.040)^2} \hat{i}\).
- Step 5: Compute stepwise: numerator \(q_A q_B = -6.0 \times 10^{-12} \ \text{C}^2\); \(r^2 = 1.6 \times 10^{-3} \ \text{m}^2\); fraction \(= -3.75 \times 10^{-9} \ \text{C}^2/\text{m}^2\); multiply by \(k\): \(-33.75 \ \text{N}\). Result: \(\vec{F}_{BA} = -33.8 \ \hat{i} \ \text{N}\) (rounded to 3 sig figs).
- Step 6: Verify: Negative sign means force on B is opposite to \(\hat{i}\) (toward A) — correct for attraction. Magnitude \(33.8 \ \text{N}\) is reasonable for μC charges at cm distance.
REASONING: The vector form automatically handles attraction/repulsion via the algebraic sign of \(q_A q_B\). The unit vector \(\hat{r}_{AB}\) points from source (A) to test charge (B). Negative product flips the direction, giving attraction toward A.
ANSWER: \(\vec{F}_{BA} = -33.8 \ \hat{i} \ \text{N}\) (or \(33.8 \ \text{N}\) directed toward the origin)

## WORKED_EXAMPLE_2
PROBLEM: Two identical conducting spheres carry charges \(+4.0 \ \mu\text{C}\) and \(-2.0 \ \mu\text{C}\) and are separated by 20 cm in vacuum. They are brought into contact and then separated to the same distance. Calculate the new force between them and compare with the initial force.
STEPS:
- Step 1: Initial state: \(q_1 = +4.0 \times 10^{-6} \ \text{C}\), \(q_2 = -2.0 \times 10^{-6} \ \text{C}\), \(r = 0.20 \ \text{m}\). Initial force magnitude: \(F_i = k \frac{|q_1 q_2|}{r^2} = 9 \times 10^9 \times \frac{8.0 \times 10^{-12}}{0.04} = 1.8 \ \text{N}\) (attractive).
- Step 2: Contact: Identical spheres share total charge equally. Total charge \(q_{\text{total}} = q_1 + q_2 = +2.0 \times 10^{-6} \ \text{C}\). Each sphere gets \(q' = +1.0 \times 10^{-6} \ \text{C}\).
- Step 3: Final state: \(q_1' = q_2' = +1.0 \times 10^{-6} \ \text{C}\), \(r = 0.20 \ \text{m}\) (same separation). Final force: \(F_f = k \frac{q_1' q_2'}{r^2} = 9 \times 10^9 \times \frac{1.0 \times 10^{-12}}{0.04} = 0.225 \ \text{N}\) (repulsive).
- Step 4: Compare: \(F_f / F_i = 0.225 / 1.8 = 0.125 = 1/8\). Force magnitude decreased by factor 8 and nature changed from attraction to repulsion.
- Step 5: Verify: Total charge conserved (\(+2 \ \mu\text{C}\) before and after). Identical spheres → equal sharing. Repulsion for like charges. Calculation consistent.
REASONING: Contact redistributes charge by conservation and symmetry. Coulomb's Law applied before and after shows how both magnitude and sign of force change. The factor of 8 comes from \((q_1' q_2')/(q_1 q_2) = (1 \times 1)/(4 \times 2) = 1/8\).
ANSWER: Initial force = 1.8 N attractive; Final force = 0.225 N repulsive; Ratio \(F_f/F_i = 1/8\).

## WORKED_EXAMPLE_3
PROBLEM: Three point charges are placed on the x-axis: \(q_1 = +5.0 \ \mu\text{C}\) at \(x = 0\), \(q_2 = -3.0 \ \mu\text{C}\) at \(x = 10 \ \text{cm}\), and \(q_3 = +2.0 \ \mu\text{C}\) at \(x = 20 \ \text{cm}\). Calculate the net force on \(q_2\) due to \(q_1\) and \(q_3\). (This combines Coulomb's Law with superposition — preview of next node.)
STEPS:
- Step 1: Convert all to SI: \(q_1 = +5.0 \times 10^{-6} \ \text{C}\), \(q_2 = -3.0 \times 10^{-6} \ \text{C}\), \(q_3 = +2.0 \times 10^{-6} \ \text{C}\). Positions: \(x_1 = 0\), \(x_2 = 0.10 \ \text{m}\), \(x_3 = 0.20 \ \text{m}\).
- Step 2: Force on \(q_2\) due to \(q_1\): \(\vec{F}_{21} = k \frac{q_1 q_2}{r_{21}^2} \hat{r}_{12}\). \(r_{21} = 0.10 \ \text{m}\). \(\hat{r}_{12}\) from \(q_1\) to \(q_2\) = \(+\hat{i}\). \(q_1 q_2 = (+5)(-3) \times 10^{-12} = -15 \times 10^{-12} \ \text{C}^2\). \(\vec{F}_{21} = 9 \times 10^9 \times \frac{-15 \times 10^{-12}}{0.01} \hat{i} = -13.5 \ \hat{i} \ \text{N}\) (toward \(q_1\), attraction).
- Step 3: Force on \(q_2\) due to \(q_3\): \(\vec{F}_{23} = k \frac{q_3 q_2}{r_{23}^2} \hat{r}_{32}\). \(r_{23} = 0.10 \ \text{m}\). \(\hat{r}_{32}\) from \(q_3\) to \(q_2\) = \(-\hat{i}\) (since \(q_3\) is at \(+x\) relative to \(q_2\)). \(q_3 q_2 = (+2)(-3) \times 10^{-12} = -6 \times 10^{-12} \ \text{C}^2\). \(\vec{F}_{23} = 9 \times 10^9 \times \frac{-6 \times 10^{-12}}{0.01} (-\hat{i}) = +5.4 \ \hat{i} \ \text{N}\) (toward \(q_3\), attraction).
- Step 4: Net force: \(\vec{F}_{\text{net}} = \vec{F}_{21} + \vec{F}_{23} = (-13.5 + 5.4) \hat{i} = -8.1 \ \hat{i} \ \text{N}\).
- Step 5: Verify: Both forces are attractive (unlike charges). \(q_1\) is larger and same distance → stronger pull toward left. \(q_3\) pulls right but weaker. Net leftward force reasonable.
REASONING: Superposition principle (next node) says forces add vectorially. Each pairwise force computed via Coulomb's Law with correct unit vector direction. The sign of \(q_i q_j\) combined with \(\hat{r}_{ij}\) gives correct direction automatically.
ANSWER: \(\vec{F}_{\text{net on } q_2} = -8.1 \ \hat{i} \ \text{N}\) (8.1 N toward the left/negative x-direction)

## COMPETENCY_QUESTION_1
QUESTION: A charge \(q_1 = +2.0 \ \mu\text{C}\) is fixed at the origin. A second charge \(q_2 = -4.0 \ \mu\text{C}\) is fixed at \(x = 30 \ \text{cm}\). Find the position(s) on the x-axis where a third charge \(q_3 = +1.0 \ \mu\text{C}\) experiences zero net electrostatic force. Explain why there is no such position off the x-axis.
COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables
STEPS:
- Step 1: Understand the physical situation — two fixed charges create forces on a test charge; we need equilibrium position.
- Step 2: Identify regions on x-axis: (I) \(x < 0\), (II) \(0 < x < 0.30 \ \text{m}\), (III) \(x > 0.30 \ \text{m}\). Test charge is positive.
- Step 3: In region I: \(q_1\) repels (right), \(q_2\) attracts (right) — both forces same direction → no equilibrium.
- Step 4: In region II: \(q_1\) repels (right), \(q_2\) attracts (left) — forces oppose. Set magnitudes equal: \(k \frac{q_1 q_3}{x^2} = k \frac{|q_2| q_3}{(0.30 - x)^2}\). Cancel \(k, q_3\): \(\frac{2.0}{x^2} = \frac{4.0}{(0.30 - x)^2}\) → \(\frac{1}{x^2} = \frac{2}{(0.30 - x)^2}\) → \((0.30 - x)^2 = 2x^2\) → \(0.30 - x = \sqrt{2} x\) (positive root since \(x < 0.30\)) → \(x = \frac{0.30}{1+\sqrt{2}} \approx 0.124 \ \text{m} = 12.4 \ \text{cm}\).
- Step 5: In region III: \(q_1\) repels (right), \(q_2\) attracts (left) — but \(q_2\) is larger magnitude and closer → net force leftward, no equilibrium. Off x-axis: forces have y-components that cannot cancel because both fixed charges lie on x-axis.
ANSWER: \(x = 12.4 \ \text{cm}\) from \(q_1\) (between the charges). No off-axis position because symmetry forces net y-component ≠ 0.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a hydrogen atom, the electron and proton are separated by approximately \(0.53 \ \text{Å} = 5.3 \times 10^{-11} \ \text{m}\). (a) Calculate the electrostatic force between them. (b) Calculate the gravitational force between them. (c) Find the ratio \(F_e/F_g\). (d) If the electron were to obey classical mechanics, what would be its orbital speed around the proton assuming circular motion? (Use \(m_e = 9.11 \times 10^{-31} \ \text{kg}\), \(m_p = 1.67 \times 10^{-27} \ \text{kg}\), \(G = 6.67 \times 10^{-11} \ \text{N m}^2 \text{kg}^{-2}\), \(e = 1.60 \times 10^{-19} \ \text{C}\))
COMPETENCY: Unit analysis and dimensional reasoning; multi-step calculation combining electrostatics and gravitation
STEPS:
- Step 1: (a) Electrostatic force: \(F_e = k \frac{e^2}{r^2} = 9 \times 10^9 \times \frac{(1.60 \times 10^{-19})^2}{(5.3 \times 10^{-11})^2} = 9 \times 10^9 \times \frac{2.56 \times 10^{-38}}{2.809 \times 10^{-21}} = 8.20 \times 10^{-8} \ \text{N}\).
- Step 2: (b) Gravitational force: \(F_g = G \frac{m_e m_p}{r^2} = 6.67 \times 10^{-11} \times \frac{(9.11 \times 10^{-31})(1.67 \times 10^{-27})}{2.809 \times 10^{-21}} = 3.63 \times 10^{-47} \ \text{N}\).
- Step 3: (c) Ratio: \(F_e/F_g = 8.20 \times 10^{-8} / 3.63 \times 10^{-47} = 2.26 \times 10^{39}\). Electrostatic force dominates by 39 orders of magnitude.
- Step 4: (d) Classical orbital speed: Centripetal force = electrostatic force: \(m_e v^2 / r = F_e\) → \(v = \sqrt{F_e r / m_e} = \sqrt{(8.20 \times 10^{-8})(5.3 \times 10^{-11}) / (9.11 \times 10^{-31})} = \sqrt{4.77 \times 10^{12}} = 2.18 \times 10^6 \ \text{m/s}\).
- Step 5: Verify: \(v \approx 0.0073c\) (non-relativistic, classical approximation marginally okay). Units: N·m/kg = (kg·m/s²)·m/kg = m²/s² → sqrt gives m/s. Correct.
ANSWER: (a) \(8.20 \times 10^{-8} \ \text{N}\) attractive, (b) \(3.63 \times 10^{-47} \ \text{N}\) attractive, (c) \(2.26 \times 10^{39}\), (d) \(2.18 \times 10^6 \ \text{m/s}\)
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Coulomb's Law states that the ______ force between two stationary point charges is directly proportional to the product of their magnitudes and inversely proportional to the square of the distance between them, acting along the line joining the charges.

## DIAGNOSTIC_ANSWER_7
electrostatic

Electrostatic names the force's family: charges at rest, interacting across empty space. **A wrong answer (electromagnetic) reveals the student has invited moving charges and magnetic effects into a law that knows only stillness.** The electrostatic word scopes the law: stationary point charges only, with moving or extended bodies left outside its licence.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a rubbed plastic ruler attracting tiny paper bits — the force acts at a ______ without contact.

## DIAGNOSTIC_ANSWER_8
distance

At a distance is the force's signature: no contact, no medium, just the field's quiet arithmetic. **A wrong answer (a contact phrase) reveals the student has denied the very feature that made the observation remarkable.** At a distance is the mystery: no thread, no touch - just charge answering charge across empty space.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can compute the magnitude and direction of the electrostatic force between two point charges given their magnitudes, signs, and separation in vacuum, correctly handling unit conversions (μC to C, cm to m) and applying the vector form to determine attraction or repulsion.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe a rubbed plastic ruler ______ tiny paper bits — the force acts at a distance without contact.

## DIAGNOSTIC_ANSWER_10
attracting

The attracting verb is the observation's punchline: unlike charges reach across space and pull. **A wrong answer (repelling) reveals the student has reversed the polarity story the ruler and paper are telling.** The attracting verb is the demonstration's point: the ruler's charge and the paper's induced opposite agree to pull.
