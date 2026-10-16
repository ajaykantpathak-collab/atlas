## ELI5
Iron filings over a bar magnet draw the solenoid's own portrait: a bar magnet, far from its centre, is a magnetic dipole. Its axial field runs along the moment at two m over r cubed; its equatorial field opposes the moment at m over r cubed - half the axial strength at the same distance, aimed backwards. The electrostatic analogy writes both formulas for free: swap E for B, p for m, and the epsilon constant for mu.

## DEFINITION
The magnetic field due to a bar magnet at a point far from its centre (distance \(r \gg l\), where \(l\) is the magnetic length) is that of a magnetic dipole of moment \(\vec{m}\). On the axial line, the field is \(\vec{B}_{\text{axial}} = \frac{\mu_0}{4\pi} \frac{2\vec{m}}{r^3}\) (direction along \(\vec{m}\)). On the equatorial line, the field is \(\vec{B}_{\text{eq}} = -\frac{\mu_0}{4\pi} \frac{\vec{m}}{r^3}\) (direction opposite to \(\vec{m}\)). SI unit of \(\vec{B}\) is tesla (T); \(\mu_0/4\pi = 10^{-7} \, \text{T·m/A}\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can (1) calculate the magnitude and direction of the magnetic field at any axial or equatorial point of a bar magnet using the dipole formulas, (2) apply the electrostatic analogy to write the field expressions without memorising them separately, and (3) solve numerical problems involving superposition of fields from two magnets or a magnet in an external field.

## SCOPE_BOUNDARY
Covers only the far-field (\(r \gg l\)) dipole approximation for a bar magnet on its axial and equatorial lines. Does NOT cover: exact field at arbitrary points (requires Legendre polynomials), field inside the magnet, or the field of non-dipolar magnets (e.g., horseshoe magnet). The formulas assume a point dipole; they are invalid for \(r \sim l\).

## WALKTHROUGH
Observe iron filings on a sheet of paper placed over a bar magnet (a common Class 12 lab activity). The filings align along curves that emerge from the north pole, loop around, and enter the south pole — exactly like the field lines of a current-carrying solenoid you studied in Class 11 (c11_phy_cbse_04_004). This visual similarity is the starting point: a bar magnet behaves as an equivalent solenoid. Next, recall the magnetic dipole moment \(\vec{m}\) defined in the previous node (c12_phy_cbse_05_002). Using the far axial field of a finite solenoid derived in the textbook, we obtain \(B_{\text{axial}} = \frac{\mu_0}{4\pi} \frac{2m}{r^3}\). By the electrostatic analogy (electric dipole field \(\vec{E}_{\text{axial}} = \frac{1}{4\pi\varepsilon_0} \frac{2\vec{p}}{r^3}\)), we immediately write the equatorial field as \(\vec{B}_{\text{eq}} = -\frac{\mu_0}{4\pi} \frac{\vec{m}}{r^3}\). The key step is recognising the replacements \(\vec{E} \to \vec{B}\), \(\vec{p} \to \vec{m}\), \(1/4\pi\varepsilon_0 \to \mu_0/4\pi\).

Takeaway first: the bar magnet's far fields are the electric dipole's fields wearing magnetic constants - axial double, equatorial single and opposed - and the analogy is the memory. Exam moves: computation questions at axial and equatorial points, analogy questions performing the three substitutions, and superposition questions combining two magnets' fields. Method: rerun the filings - the solenoid look-alike noticed, the moment recalled, the axial formula quoted, the equatorial derived by analogy. Check yourself: the equatorial field's minus sign is physical - the field there points opposite to the moment, not merely smaller; dropping the direction halves the answer. Drill: compute both fields at one distance and state each direction relative to the moment.

## DIAGNOSTIC_QUESTION_1
State the formula for the magnetic field at a point on the axial line of a short bar magnet of magnetic moment \(m\) at a distance \(r\) from its centre. Give the SI unit of each quantity.

## DIAGNOSTIC_ANSWER_1
\(B_{\text{axial}} = \frac{\mu_0}{4\pi} \frac{2m}{r^3}\). \(\mu_0/4\pi = 10^{-7} \, \text{T·m/A}\), \(m\) in A·m², \(r\) in m, \(B\) in T. A wrong answer (e.g., missing factor 2, using \(r^2\), or confusing axial/equatorial) reveals the student has not internalised the dipole analogy or the solenoid derivation.

## DIAGNOSTIC_QUESTION_2
A bar magnet’s magnetic moment \(\vec{m}\) points north. At a point on the equatorial line, what is the direction of the magnetic field \(\vec{B}\) relative to \(\vec{m}\)? Explain using the electrostatic analogy.

## DIAGNOSTIC_ANSWER_2
On the equatorial line, \(\vec{B}\) is anti-parallel to \(\vec{m}\) (points opposite to the magnetic moment). The electric dipole’s equatorial field is \(\vec{E}_{\text{eq}} = -\frac{1}{4\pi\varepsilon_0} \frac{\vec{p}}{r^3}\); replacing \(\vec{E} \to \vec{B}\), \(\vec{p} \to \vec{m}\), \(1/4\pi\varepsilon_0 \to \mu_0/4\pi\) gives \(\vec{B}_{\text{eq}} = -\frac{\mu_0}{4\pi} \frac{\vec{m}}{r^3}\). A student who says “same direction” is confusing axial and equatorial fields or misapplying the analogy.

## DIAGNOSTIC_QUESTION_3
A short bar magnet has magnetic moment \(0.48 \, \text{J/T}\). Calculate the magnitude of the magnetic field at a distance of \(10 \, \text{cm}\) from the centre on (a) the axial line, (b) the equatorial line. Use \(\mu_0/4\pi = 10^{-7} \, \text{T·m/A}\).

## DIAGNOSTIC_ANSWER_3
Given: \(m = 0.48 \, \text{A·m}^2\), \(r = 0.10 \, \text{m}\).  
(a) Axial: \(B = 10^{-7} \times \frac{2 \times 0.48}{(0.10)^3} = 10^{-7} \times \frac{0.96}{0.001} = 10^{-7} \times 960 = 9.6 \times 10^{-5} \, \text{T}\).  
(b) Equatorial: \(B = 10^{-7} \times \frac{0.48}{(0.10)^3} = 10^{-7} \times 480 = 4.8 \times 10^{-5} \, \text{T}\).  
A wrong answer often comes from using \(r\) in cm without converting to m (giving \(10^{-11}\) T), or forgetting the factor 2 in axial field.

## DIAGNOSTIC_QUESTION_4
Two identical short bar magnets of moment \(m\) are placed coaxially with their north poles facing each other, separated by a distance \(2d\). Find the point on the line joining them where the net magnetic field is zero.

## DIAGNOSTIC_ANSWER_4
Let the point be at distance \(x\) from the centre of the left magnet (so \(x\) from left, \(2d - x\) from right). Both magnets produce axial fields pointing away from their north poles. For zero net field, magnitudes must be equal:  
\(\frac{2m}{x^3} = \frac{2m}{(2d - x)^3} \Rightarrow x = 2d - x \Rightarrow x = d\).  
The midpoint is the null point. A student who sets up the equation but forgets the \(r^3\) dependence (using \(r^2\)) will get a different answer, revealing confusion with Coulomb’s law.

## DIAGNOSTIC_QUESTION_5
A student writes: “The magnetic field on the axis of a bar magnet is twice the field on the equator at the same distance.” Is this statement always correct? Justify.

## DIAGNOSTIC_ANSWER_5
The statement is correct **only in magnitude** for a short dipole at the same distance \(r\): \(|B_{\text{axial}}| = 2|B_{\text{eq}}|\). However, the directions are different: axial field is parallel to \(\vec{m}\), equatorial is anti-parallel. If the student ignores direction or assumes the formula holds for \(r \sim l\), the statement is misleading. A complete answer must mention both magnitude ratio and directional difference, and the condition \(r \gg l\).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a compass needle and a bar magnet to verify that the magnetic field on the axial line is twice that on the equatorial line at the same distance. Outline the procedure and the measurements needed.

## DIAGNOSTIC_ANSWER_6
Place the bar magnet on a sheet of paper with its axis along the east-west direction (to avoid Earth’s field interference). Mark the centre. At a fixed distance \(r\) (e.g., 10 cm) on the axial line, place a compass and note the deflection \(\theta_{\text{axial}}\) from east-west. Repeat on the equatorial line at the same \(r\) to get \(\theta_{\text{eq}}\). In a uniform field \(B\), \(\tan\theta \propto B\). Compute \(\tan\theta_{\text{axial}} / \tan\theta_{\text{eq}}\); it should be close to 2. A poor answer omits the need to eliminate Earth’s field or uses a single compass without a reference direction.

## COMMON_MISCONCEPTION
Students often treat the bar magnet’s field as exactly like a point charge’s Coulomb field (\(1/r^2\)) because they see “poles”. They write \(B \propto 1/r^2\) and miss the \(1/r^3\) dipole fall-off. Another error: using the axial formula for the equatorial point (or vice versa) and forgetting the minus sign, leading to wrong direction in vector addition problems. A third error: applying the formulas at distances comparable to the magnet’s length (\(r \sim l\)), where higher multipoles contribute and the dipole approximation fails.

## ON_FAILURE
1. Revisit c12_phy_cbse_05_002 (Magnetic Dipole Moment) to reinforce that a bar magnet is a dipole, not two monopoles.  
2. Re-read the solenoid equivalence in c12_phy_cbse_05_001 (Bar Magnet: Properties and Magnetic Field Lines) and the derivation of the axial field of a finite solenoid in the textbook (Fig. 5.3).  
3. Practice drawing field lines for a bar magnet and a solenoid side-by-side; note the continuous loops.  
4. Solve Exercise 5.7 step-by-step, explicitly converting cm to m and tracking the factor of 2.  
5. If the \(1/r^3\) vs \(1/r^2\) confusion persists, review the electric dipole field in Class 12 Chapter 1 (c12_phy_cbse_01_00x) and the analogy table (NCERT Table 5.1).

## PREREQUISITE_NODE_IDS
c12_phy_cbse_05_001, c12_phy_cbse_05_002, c11_phy_cbse_04_004, c10_phy_cbse_02_001, c10_phy_cbse_02_004
## PREREQUISITE_REASONS
c12_phy_cbse_05_001: Provides the magnetic field line pattern and the concept of poles; essential for visualising axial/equatorial directions.  
c12_phy_cbse_05_002: Defines magnetic dipole moment \(\vec{m}\) which is the source term in the field formulas.  
c11_phy_cbse_04_004: Derives the axial field of a finite solenoid; the bar magnet’s field is equated to this.  
c10_phy_cbse_02_001: Introduces magnetic field lines and their properties (continuous loops, no intersection) used in the walkthrough.  
c10_phy_cbse_02_004: Covers the magnetic field of a solenoid and the right-hand thumb rule, which underpins the equivalent solenoid model.

## FORWARD_NODE_IDS
c12_phy_cbse_05_004, c12_phy_cbse_05_005, c12_phy_cbse_05_006, c12_phy_cbse_05_007, c12_math_cbse_11_006, c12_math_cbse_10_008

## FORWARD_REASONS
c12_phy_cbse_05_004: Earth’s magnetic field is modelled as a dipole; the axial/equatorial formulas are used to derive horizontal/vertical components.  
c12_phy_cbse_05_005: Magnetisation \(M\) and susceptibility \(\chi\) are defined via the response of a material to an external dipole field.  
c12_phy_cbse_05_006: Permanent magnets are characterised by their dipole moment and the field they produce.  
c12_phy_cbse_05_007: The hysteresis loop involves the magnetic field inside a ferromagnet, which builds on the dipole field concept.
c12_math_cbse_11_006: c12_phy_cbse_05_003 | Magnetic flux \(\Phi_B = \mathbf{B} \cdot \mathbf{A}\) similarly requires the unit normal to the plane; the normal form provides the direction cosines directly.  
c12_math_cbse_10_008: c12_phy_cbse_05_003 | Forces in equilibrium: lines of action of forces are represented by vector equations; moment of a force uses shortest distance between line of action and a point.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_002, c11_math_cbse_03_003, c11_phy_cbse_04_004
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_002: Distance formula \(r = \sqrt{x^2 + y^2}\) is used to express the field at arbitrary points in terms of coordinates.  
c11_math_cbse_03_003: Trigonometric functions resolve the magnetic moment vector into components when the magnet is oriented at an angle.  
c11_phy_cbse_04_004: The solenoid’s axial field derivation uses the Biot-Savart law and integration, providing the mathematical bridge to the bar magnet’s field.

## CHAIN_DESCRIPTION
c12_phy_cbse_05_002 -> c12_phy_cbse_05_003 -> c12_phy_cbse_05_004

## THIS_FORMULA
Axial: \(B_{\text{axial}} = \frac{\mu_0}{4\pi} \frac{2m}{r^3}\) (direction along \(\vec{m}\)). Equatorial: \(B_{\text{eq}} = \frac{\mu_0}{4\pi} \frac{m}{r^3}\) (magnitude), direction opposite to \(\vec{m}\).

## FORMULA_VARIABLES
\(\mu_0/4\pi = 10^{-7} \, \text{T·m/A}\) (constant), \(m\) = magnetic moment (A·m²), \(r\) = distance from centre (m), \(B\) = magnetic field (T).

## FORMULA_UNITS
T (tesla), A·m², m, T·m/A.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_002 | Distance formula used to calculate \(r\) from coordinates of the observation point relative to the magnet centre.  
c11_math_cbse_03_003 | Trigonometric functions (sin, cos) used to resolve \(\vec{m}\) into axial and equatorial components for a magnet tilted at an angle.  
c11_phy_cbse_04_004 | Magnetic field of a finite solenoid derived via integration; the far-field limit gives the bar magnet’s axial field formula.
## PREREQ_CONCEPT
Magnetic dipole moment and the equivalence of a bar magnet to a current-carrying solenoid.

## PREREQ_BEFORE
Student must be able to state the definition of magnetic dipole moment (\(m = \text{pole strength} \times \text{magnetic length}\)) and sketch the field lines of a bar magnet and a solenoid.

## PREREQ_STUCK
If stuck, review the magnetic dipole moment definition (c12_phy_cbse_05_002) and the solenoid-bar magnet analogy (c12_phy_cbse_05_001).

## WORKED_EXAMPLE_1
PROBLEM: A short bar magnet of magnetic moment \(0.50 \, \text{A·m}^2\) is placed with its axis along the magnetic north-south direction. Find the magnitude and direction of the magnetic field at a point \(15 \, \text{cm}\) from the centre on (a) the axial line, (b) the equatorial line. Take \(\mu_0/4\pi = 10^{-7} \, \text{T·m/A}\).  
STEPS:
- Step 1: Identify given quantities: \(m = 0.50 \, \text{A·m}^2\), \(r = 0.15 \, \text{m}\). Required: \(B_{\text{axial}}\) and \(B_{\text{eq}}\) with directions.
- Step 2: Write formulas: \(B_{\text{axial}} = \frac{\mu_0}{4\pi} \frac{2m}{r^3}\), \(B_{\text{eq}} = \frac{\mu_0}{4\pi} \frac{m}{r^3}\). Check units: \(\frac{\text{T·m/A} \times \text{A·m}^2}{\text{m}^3} = \text{T}\).
- Step 3: Substitute values: \(r^3 = (0.15)^3 = 0.003375 \, \text{m}^3\).
- Step 4: Compute: \(B_{\text{axial}} = 10^{-7} \times \frac{2 \times 0.50}{0.003375} = 10^{-7} \times \frac{1.0}{0.003375} = 2.96 \times 10^{-5} \, \text{T}\). \(B_{\text{eq}} = 10^{-7} \times \frac{0.50}{0.003375} = 1.48 \times 10^{-5} \, \text{T}\).
- Step 5: Direction: Axial field is along \(\vec{m}\) (towards magnetic north if \(\vec{m}\) points north). Equatorial field is opposite to \(\vec{m}\) (towards magnetic south). Verify reasonableness: Earth’s field \(\sim 3 \times 10^{-5} \, \text{T}\); these are comparable, so a compass would show noticeable deflection.  
REASONING: The dipole formulas are direct applications of the solenoid equivalence and electrostatic analogy. Unit tracking ensures no conversion error. Direction follows from the field line pattern: lines emerge from N (axial) and enter S (equatorial).  
ANSWER: (a) \(2.96 \times 10^{-5} \, \text{T}\) along magnetic north. (b) \(1.48 \times 10^{-5} \, \text{T}\) along magnetic south.

## WORKED_EXAMPLE_2
PROBLEM: Two identical short bar magnets each of moment \(m = 0.40 \, \text{A·m}^2\) are placed perpendicular to each other with their centres coinciding. Magnet A has its axis along the x-axis (north pole towards +x). Magnet B has its axis along the y-axis (north pole towards +y). Find the net magnetic field at a point P on the x-axis at \(x = 10 \, \text{cm}\) from the common centre.  
STEPS:
- Step 1: Given: \(m = 0.40 \, \text{A·m}^2\), \(r = 0.10 \, \text{m}\). Point P is on the x-axis. For Magnet A, P is on the axial line. For Magnet B, P is on the equatorial line (since its axis is y).
- Step 2: Field due to Magnet A at P: axial, along +x. \(B_A = \frac{\mu_0}{4\pi} \frac{2m}{r^3} = 10^{-7} \times \frac{0.80}{0.001} = 8.0 \times 10^{-5} \, \text{T} \, \hat{i}\).
- Step 3: Field due to Magnet B at P: equatorial, direction opposite to its moment \(\vec{m}_B = m \hat{j}\). So \(\vec{B}_B = -\frac{\mu_0}{4\pi} \frac{m}{r^3} \hat{j} = -10^{-7} \times \frac{0.40}{0.001} \hat{j} = -4.0 \times 10^{-5} \, \text{T} \, \hat{j}\).
- Step 4: Net field: \(\vec{B}_{\text{net}} = (8.0 \hat{i} - 4.0 \hat{j}) \times 10^{-5} \, \text{T}\).
- Step 5: Magnitude: \(|\vec{B}_{\text{net}}| = 10^{-5} \sqrt{8^2 + 4^2} = 10^{-5} \sqrt{80} = 8.94 \times 10^{-5} \, \text{T}\). Direction: \(\theta = \tan^{-1}(-4/8) = -26.6^\circ\) from +x axis (or \(26.6^\circ\) below the x-axis).  
REASONING: Superposition of vector fields. The geometry determines whether the point is axial or equatorial for each magnet. The dipole formulas are applied with correct vector directions.  
ANSWER: \(\vec{B}_{\text{net}} = (8.0 \hat{i} - 4.0 \hat{j}) \times 10^{-5} \, \text{T}\); magnitude \(8.94 \times 10^{-5} \, \text{T}\) at \(26.6^\circ\) below the +x axis.

## WORKED_EXAMPLE_3
PROBLEM: A short bar magnet of moment \(m = 1.2 \, \text{A·m}^2\) is placed in a uniform magnetic field \(B_0 = 0.20 \, \text{T}\) directed horizontally. The magnet’s axis makes an angle of \(30^\circ\) with \(B_0\). Find the distance \(r\) from the magnet’s centre on its equatorial line where the net magnetic field is zero. (Assume the magnet’s field opposes \(B_0\) at that point.)  
STEPS:
- Step 1: At a point on the equatorial line, the magnet’s field is \(\vec{B}_{\text{mag}} = -\frac{\mu_0}{4\pi} \frac{\vec{m}}{r^3}\). The uniform field is \(\vec{B}_0 = B_0 \hat{i}\). We want \(\vec{B}_{\text{net}} = 0\).
- Step 2: The magnet’s moment \(\vec{m}\) makes \(30^\circ\) with \(\vec{B}_0\). Let \(\vec{B}_0\) be along +x. Then \(\vec{m} = m(\cos30^\circ \hat{i} + \sin30^\circ \hat{j})\). The equatorial field is opposite to \(\vec{m}\): \(\vec{B}_{\text{mag}} = -\frac{\mu_0 m}{4\pi r^3} (\cos30^\circ \hat{i} + \sin30^\circ \hat{j})\).
- Step 3: For net field to be zero, both components must cancel. x-component: \(B_0 - \frac{\mu_0 m}{4\pi r^3} \cos30^\circ = 0\). y-component: \(-\frac{\mu_0 m}{4\pi r^3} \sin30^\circ = 0\). The y-component cannot be zero unless \(m=0\) or \(r \to \infty\). Hence **no finite point on the equatorial line** gives zero net field when the magnet is tilted.
- Step 4: Reinterpret: The problem likely means the point on the equatorial line of the magnet’s *own* axis (i.e., perpendicular to \(\vec{m}\)). Then the equatorial field is exactly opposite to \(\vec{m}\). If \(\vec{B}_0\) is along \(\vec{m}\), then on the equatorial line \(\vec{B}_{\text{mag}}\) is anti-parallel to \(\vec{B}_0\). Set magnitudes equal: \(\frac{\mu_0 m}{4\pi r^3} = B_0\).
- Step 5: Solve: \(r^3 = \frac{\mu_0 m}{4\pi B_0} = \frac{10^{-7} \times 1.2}{0.20} = 6.0 \times 10^{-7} \, \text{m}^3\). \(r = \sqrt[3]{6.0 \times 10^{-7}} = 8.43 \times 10^{-3} \, \text{m} = 0.843 \, \text{cm}\). Check condition \(r \gg l\): if magnet length \(l \sim 1 \, \text{cm}\), \(r\) is not \(\gg l\); dipole approximation is marginal.  
REASONING: The problem tests understanding that the equatorial field direction is fixed relative to \(\vec{m}\), not relative to an external field. Superposition requires vector addition. The condition for zero net field is only possible if the external field is exactly anti-parallel to the magnet’s equatorial field.  
ANSWER: \(r \approx 0.84 \, \text{cm}\) (but note the dipole approximation may not be accurate at this distance; a more exact calculation would be needed for a real magnet).

## COMPETENCY_QUESTION_1
QUESTION: A compass needle is placed at a point on the equatorial line of a bar magnet, at a distance \(r\) from its centre. The magnet’s magnetic moment points horizontally towards geographic north. Describe the orientation of the compass needle when it comes to rest. Explain why, using the concept of torque on a dipole in a magnetic field.  
COMPETENCY: Interpreting physical situations using formulas  
STEPS:
- Step 1: Determine the direction of the bar magnet’s field at the equatorial point. It is opposite to \(\vec{m}\), i.e., towards geographic south.
- Step 2: The compass needle is a magnetic dipole. In a uniform field, it experiences torque \(\vec{\tau} = \vec{m}_{\text{needle}} \times \vec{B}\) and aligns with \(\vec{B}\).
- Step 3: Therefore, the compass needle’s north pole will point along \(\vec{B}\), i.e., towards geographic south (anti-parallel to the bar magnet’s moment).
- Step 4: If Earth’s field is present, the needle aligns with the *resultant* field. But if the bar magnet’s field dominates (as in the idealised question), it points south.  
ANSWER: The compass needle aligns with its north pole pointing towards geographic south (opposite to the bar magnet’s magnetic moment). This is because the bar magnet’s equatorial field is directed opposite to its magnetic moment, and a dipole aligns with the external field.  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two short bar magnets of moments \(m_1 = 0.30 \, \text{A·m}^2\) and \(m_2 = 0.50 \, \text{A·m}^2\) are placed on a horizontal table with their axes along the same line (x-axis). Magnet 1 is at \(x = 0\) with its north pole facing +x. Magnet 2 is at \(x = 20 \, \text{cm}\) with its north pole facing -x (i.e., towards Magnet 1). Find the position(s) on the x-axis between the magnets where the net magnetic field is zero. Neglect Earth’s field.  
COMPETENCY: Predicting outcomes from changing variables  
STEPS:
- Step 1: Set up coordinate system. Let the null point be at distance \(x\) from Magnet 1 (\(0 < x < 0.20 \, \text{m}\)). Distance from Magnet 2 is \(0.20 - x\).
- Step 2: Field due to Magnet 1 at the point: axial, direction away from its north pole → +x direction. \(B_1 = \frac{\mu_0}{4\pi} \frac{2m_1}{x^3}\).
- Step 3: Field due to Magnet 2 at the point: the point is on the axial line of Magnet 2 but on the side of its south pole (since north faces -x). The axial field of a magnet points *away* from its north pole. So on the south side, the field points *towards* the magnet, i.e., in the -x direction. Magnitude: \(B_2 = \frac{\mu_0}{4\pi} \frac{2m_2}{(0.20 - x)^3}\).
- Step 4: For zero net field: \(B_1 = B_2 \Rightarrow \frac{m_1}{x^3} = \frac{m_2}{(0.20 - x)^3} \Rightarrow \frac{0.30}{x^3} = \frac{0.50}{(0.20 - x)^3}\).
- Step 5: Take cube root: \(\frac{\sqrt[3]{0.30}}{x} = \frac{\sqrt[3]{0.50}}{0.20 - x}\). Let \(k = \sqrt[3]{0.30/0.50} = \sqrt[3]{0.6} \approx 0.8434\). Then \(0.20 - x = x / k \Rightarrow x(1 + 1/k) = 0.20 \Rightarrow x = \frac{0.20}{1 + 1/k} = \frac{0.20}{1 + 1/0.8434} = \frac{0.20}{2.186} \approx 0.0915 \, \text{m} = 9.15 \, \text{cm}\).
- Step 6: Check: \(x = 9.15 \, \text{cm}\), \(0.20 - x = 10.85 \, \text{cm}\). Ratio \((10.85/9.15)^3 \approx 1.667 \approx 0.50/0.30\). Valid.  
ANSWER: The net magnetic field is zero at \(x \approx 9.2 \, \text{cm}\) from Magnet 1 (i.e., \(10.8 \, \text{cm}\) from Magnet 2).  
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe iron ______ on a sheet of paper placed over a bar magnet (a common Class 12 lab activity).

## DIAGNOSTIC_ANSWER_7
filings

The filings are the portrait's pigment: the magnet's field organises them into the dipole pattern the formulas describe. **A wrong answer (a compass) reveals the student has swapped the pattern-maker for a single-point probe.** The filings are the portrait's pigment: the magnet's field draws them into the dipole pattern the formulas encode.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
Student can (1) calculate the magnitude and direction of the magnetic field at any axial or equatorial point of a bar magnet using the dipole formulas, (2) apply the electrostatic analogy to write the field expressions without memorising them separately, and (3) solve numerical problems involving superposition of fields from two magnets.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe iron filings on a sheet of paper placed over a bar magnet (a common Class 12 lab ______).

## DIAGNOSTIC_ANSWER_9
activity

The activity completes the classroom's label: the filings-over-magnet trick is a standard lab exercise the walkthrough cites as common. **A wrong answer (a demonstration) reveals the student has renamed the exercise where the digest's own wording is quoted.**
