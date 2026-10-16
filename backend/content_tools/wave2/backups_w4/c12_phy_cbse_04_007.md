## ELI5
An electric door lock's click is a solenoid at work: a helical coil whose long interior is a uniform field mu-zero n I along the axis, and whose outside is nearly field-free. Bend the solenoid into a ring - a toroid - and the field is imprisoned inside the ring entirely, tangential to circles centred on the core, mu-zero N I over two pi r. Ampere's law with a well-chosen loop derives both, symmetry slaying every stray contribution.

## DEFINITION
The magnetic field inside a long solenoid is uniform, directed along its axis, and has magnitude \( B = \mu_0 n I \), where \( n \) is the number of turns per unit length and \( I \) is the current. For a toroid (a solenoid bent into a circle), the magnetic field is confined entirely within the toroid, is tangential to circular Amperian loops concentric with the toroid, and has magnitude \( B = \mu_0 n I \) (with \( n = N / 2\pi r \), \( N \) total turns, \( r \) the mean radius). Both fields are derived using Ampere's circuital law under the assumptions of steady currents and ideal geometry (length \( \gg \) radius for solenoid; closely wound turns for toroid). SI unit: tesla (T).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can (1) derive \( B = \mu_0 n I \) for a long solenoid using Ampere's law with a rectangular Amperian loop, justifying why field outside is zero and transverse contributions vanish; (2) derive \( B = \mu_0 N I / (2\pi r) \) for a toroid using a circular Amperian loop, explaining why field is zero outside and inside the central cavity; (3) calculate the magnetic field at a point inside a solenoid or toroid given numerical values for \( N, I, l, r \); (4) distinguish between solenoid and toroid field configurations and their practical implications (e.g., toroid has no external field).

## SCOPE_BOUNDARY
Covers: magnetic field of an ideal long solenoid (derivation via Ampere's law, formula \( B = \mu_0 n I \), direction via right-hand rule), magnetic field of an ideal toroid (derivation via Ampere's law, formula \( B = \mu_0 N I / (2\pi r) \), confinement of field), comparison of field patterns, and numerical problems. Does NOT cover: force between parallel currents (node c12_phy_cbse_04_008), torque on current loop (c12_phy_cbse_04_009), moving coil galvanometer (c12_phy_cbse_04_010), or finite-length solenoid end effects (beyond board scope).

## WALKTHROUGH
Start with a real-world observation: a solenoid is used in an electric door lock (common in Indian homes/offices) – when current flows, a uniform magnetic field pulls a ferromagnetic plunger. Ask: "Why is the field inside uniform and strong, while outside it's nearly zero?" Connect to prior concept: Ampere's circuital law (c12_phy_cbse_04_006) – we choose an Amperian loop that exploits symmetry. For a solenoid, use a rectangular loop with one side inside parallel to axis, one outside where field is zero, and two perpendicular sides where \( \vec{B} \cdot d\vec{l} = 0 \). For a toroid, use a circular loop concentric with the toroid. The key step is recognizing that the enclosed current is \( I_{\text{enc}} = n h I \) (solenoid) or \( N I \) (toroid). End with the formulas \( B = \mu_0 n I \) and \( B = \frac{\mu_0 N I}{2\pi r} \), emphasizing the conditions for validity.

Takeaway first: the solenoid's rectangular Amperian loop and the toroid's circular one are Ampere's law's two showcase moves - uniform interior fields, silent exteriors, and enclosed currents counted in turns. Exam moves: derivation questions for both geometries, field computation questions from N, I and dimensions, and comparison questions on exterior fields and practical implications. Method: rerun the door lock - plunger pulled by the interior field, the rectangular loop's sides justified one by one, the toroid's circle drawn. Check yourself: the solenoid's exterior field is small by geometry, the toroid's zero by topology - the difference is examinable and frequently is. Drill: derive both fields and compute the interior field for one stated solenoid.

## DIAGNOSTIC_QUESTION_1
State the formula for the magnetic field inside a long solenoid and give the SI unit of each quantity. What is the direction of this field relative to the solenoid's axis?

## DIAGNOSTIC_ANSWER_1
\( B = \mu_0 n I \), where \( \mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A} \) (permeability of free space), \( n \) = turns per unit length (m\(^{-1}\)), \( I \) = current (A). The field is directed along the axis of the solenoid; direction given by right-hand thumb rule (curl fingers in current direction, thumb points along \( \vec{B} \)). A wrong answer (e.g., \( B = \mu_0 N I / l \) without defining \( n \), or stating field is radial) reveals confusion between total turns \( N \) and turn density \( n \), or misunderstanding of field geometry.

## DIAGNOSTIC_QUESTION_2
Explain why the magnetic field outside an ideal long solenoid is zero, using Ampere's law. Why does this argument fail for a short solenoid?

## DIAGNOSTIC_ANSWER_2
For an ideal long solenoid, take a rectangular Amperian loop with one side outside parallel to the axis. By symmetry, the field outside must be uniform along that side. If it were non-zero, the line integral \( \oint \vec{B} \cdot d\vec{l} \) would be non-zero, but the loop encloses no net current (wires go in and out, canceling). Hence \( B_{\text{out}} = 0 \). For a short solenoid, the field lines bulge out; the external field is not uniform along a long rectangular loop, and the loop may enclose net current due to non-cancellation of incoming/outgoing wires. A wrong answer (e.g., "field is zero because wires are insulated") shows confusion between electrical insulation and magnetic field superposition.

## DIAGNOSTIC_QUESTION_3
A solenoid of length 0.8 m has 4 layers of windings of 300 turns each. The diameter is 2.0 cm. If the current is 6.0 A, calculate the magnetic field inside the solenoid near its centre. Use \( \mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A} \).

## DIAGNOSTIC_ANSWER_3
Given: \( l = 0.8 \, \text{m} \), layers = 4, turns per layer = 300 → total turns \( N = 4 \times 300 = 1200 \). Turn density \( n = N/l = 1200 / 0.8 = 1500 \, \text{m}^{-1} \). \( I = 6.0 \, \text{A} \). \( B = \mu_0 n I = (4\pi \times 10^{-7}) \times 1500 \times 6.0 = 4\pi \times 10^{-7} \times 9000 = 3.6\pi \times 10^{-3} \, \text{T} \approx 1.13 \times 10^{-2} \, \text{T} \). Check: \( l/d = 0.8/0.02 = 40 \gg 1 \), so long solenoid approximation valid. A wrong answer (e.g., using diameter instead of length for \( n \), or forgetting to multiply by 4 layers) reveals unit confusion or not reading "4 layers of 300 turns each".

## DIAGNOSTIC_QUESTION_4
Compare the magnetic field patterns of a long solenoid and a toroid. Why is the toroid's field zero outside its windings, while a solenoid has some external field near its ends?

## DIAGNOSTIC_ANSWER_4
Solenoid: field lines emerge from one end (north pole), loop through space, and enter the other end (south pole). Inside, field is uniform and axial; outside, field is weak and non-uniform, resembling a bar magnet. Toroid: field lines are perfect circles confined within the toroid windings; no field outside or in the central cavity because any Amperian loop outside encloses zero net current (equal currents in opposite directions cancel). The toroid has no "ends" – it's a closed loop, so no magnetic poles are created. A wrong answer (e.g., "toroid has no field outside because it's circular") misses the crucial role of net enclosed current in Ampere's law.

## DIAGNOSTIC_QUESTION_5
A student claims: "The magnetic field inside a toroid is uniform, just like in a long solenoid." Evaluate this statement. Is it correct? If not, what is the correct description, and under what condition can the toroid's field be approximated as uniform?

## DIAGNOSTIC_ANSWER_5
The statement is incorrect. In a toroid, \( B = \frac{\mu_0 N I}{2\pi r} \), which varies with radial distance \( r \) from the centre. The field is stronger on the inner side (smaller \( r \)) and weaker on the outer side (larger \( r \)). It can be approximated as uniform only if the cross-sectional radius \( a \) of the toroid is much smaller than the mean radius \( R \) (i.e., \( a \ll R \)), so that \( r \approx R \) across the cross-section. A wrong evaluation (agreeing with the student) reveals failure to notice the \( 1/r \) dependence in the toroid formula versus the constant \( B \) in a solenoid.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a compass and a battery-powered solenoid to verify that the magnetic field inside a long solenoid is uniform and parallel to its axis. Describe the procedure, observations, and how you would conclude uniformity.

## DIAGNOSTIC_ANSWER_6
Procedure: Place a long solenoid (e.g., 50 cm length, 2 cm diameter) horizontally on a wooden table. Connect to a 6 V battery via a switch. Use a small plotting compass. (1) Move the compass along the axis inside the solenoid (through a slit or by inserting it before winding) and observe deflection – it should align with the axis and show constant deflection magnitude. (2) Move the compass radially off-axis at the centre – deflection direction remains axial, magnitude unchanged. (3) Move compass near the ends – deflection decreases and direction fans out. Conclusion: Constant deflection magnitude and direction along the axis and across the cross-section at the centre confirm uniform axial field. A poor answer (e.g., "just put compass inside and see it points one way") lacks systematic variation of position and comparison to ends.

## COMMON_MISCONCEPTION
Students often think the magnetic field inside a toroid is zero because "the toroid is a closed loop with no ends, so no magnetic poles, hence no field." They confuse the absence of external field with absence of internal field. The correct reasoning: Ampere's law applied to a circular loop inside the toroid encloses a net current \( N I \), giving a non-zero \( B \). The field is zero only in the central cavity (loop encloses no current) and outside (equal and opposite currents cancel). This misconception costs marks in board exams when asked "Where is the magnetic field zero in a toroid?" – students incorrectly say "everywhere inside".

## ON_FAILURE
If the student holds this misconception: (1) Revisit Ampere's law (c12_phy_cbse_04_006) – draw three Amperian loops for a toroid: one in the cavity (radius \( r < R - a \)), one within the windings (\( R - a < r < R + a \)), one outside (\( r > R + a \)). (2) For each, compute \( I_{\text{enc}} \): cavity = 0, windings = \( N I \), outside = 0. (3) Apply \( \oint \vec{B} \cdot d\vec{l} = B(2\pi r) = \mu_0 I_{\text{enc}} \) to get \( B \) in each region. (4) Re-do Diagnostic Question 5. If still stuck, review the right-hand rule for toroid current direction (c12_phy_cbse_04_004) to confirm current enclosed is indeed \( N I \) and not zero.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_04_006, c12_phy_cbse_04_005, c11_phy_cbse_03_008, c11_math_cbse_13_008, c12_phy_cbse_04_004

## PREREQUISITE_REASONS
c12_phy_cbse_04_006: Ampere's circuital law is the primary tool for deriving both solenoid and toroid fields.
c12_phy_cbse_04_005: Magnetic field of a circular loop (via Biot-Savart) provides the physical basis for each turn's contribution; solenoid/toroid are superpositions of loops.
c11_phy_cbse_03_008: Vector (cross) product is needed for \( \vec{B} \cdot d\vec{l} \) in Ampere's law and for right-hand rule direction.
c11_math_cbse_13_008: Algebra of derivatives (chain rule) appears in the derivation of torque on a coil (later) but here integration of \( d\vec{l} \) along Amperian loop requires basic calculus.
c12_phy_cbse_04_004: Solenoid and toroid fields are built by superposing circular loop fields (from node 005) which come from Biot-Savart.  

## FORWARD_NODE_IDS
c12_phy_cbse_04_008, c12_phy_cbse_04_009, c12_phy_cbse_04_010
## FORWARD_REASONS
c12_phy_cbse_04_008: Force between parallel currents uses the magnetic field of a long straight wire (derived via Ampere's law), similar symmetry arguments.
c12_phy_cbse_04_009: Torque on a current loop uses magnetic moment \( \vec{m} = N I \vec{A} \); solenoid is a multi-turn loop, its field exerts torque on other dipoles.
c12_phy_cbse_04_010: Moving coil galvanometer operates on torque \( \tau = N I A B \) in a radial magnetic field; understanding uniform field from solenoid/toroid helps design the radial field.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_10_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Algebra of derivatives (product/chain rule) is used when differentiating \( B \) with respect to \( r \) for toroid non-uniformity analysis.
c11_math_cbse_10_008: Angle between two lines formula helps find angle between \( \vec{B} \) and \( d\vec{l} \) in Ampere's law for non-symmetric loops (though here symmetry makes it 0° or 90°).

## CHAIN_DESCRIPTION
c12_phy_cbse_04_006 -> c12_phy_cbse_04_007 -> c12_phy_cbse_04_008

## THIS_FORMULA
Solenoid: \( B = \mu_0 n I \) (T), where \( n = N/l \) (turns/m). Toroid: \( B = \frac{\mu_0 N I}{2\pi r} \) (T), where \( r \) = distance from centre of toroid.

## FORMULA_VARIABLES
\( B \) = magnetic field (T), \( \mu_0 \) = permeability of free space = \( 4\pi \times 10^{-7} \, \text{T·m/A} \), \( n \) = turns per unit length (m\(^{-1}\)), \( I \) = current (A), \( N \) = total number of turns (dimensionless), \( l \) = length of solenoid (m), \( r \) = radial distance from centre of toroid (m).

## FORMULA_UNITS
T (tesla), T·m/A, m\(^{-1}\), A, m.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_008 | Derivative of \( B = \frac{\mu_0 N I}{2\pi r} \) with respect to \( r \) gives \( dB/dr = -\frac{\mu_0 N I}{2\pi r^2} \), showing non-uniformity.
c11_math_cbse_10_008 | The angle between the magnetic field vector (tangential) and the Amperian loop element \( d\vec{l} \) (also tangential) is 0°, so \( \vec{B} \cdot d\vec{l} = B \, dl \).
## PREREQ_CONCEPT
Ampere's circuital law and its application to symmetric current distributions (infinite straight wire, infinite sheet, solenoid, toroid).

## PREREQ_BEFORE
Student must be able to state Ampere's law, choose an appropriate Amperian loop for a given symmetry, and compute the line integral \( \oint \vec{B} \cdot d\vec{l} \) when \( \vec{B} \) is either parallel or perpendicular to \( d\vec{l} \).

## PREREQ_STUCK
Revisit c12_phy_cbse_04_006 (Ampere's Circuital Law) – focus on Example 4.7 (field inside/outside a wire) and the symmetry arguments for choosing the Amperian loop.

## WORKED_EXAMPLE_1
PROBLEM: A solenoid used in a school physics lab is 50 cm long, has a radius of 1.5 cm, and is wound with 5 layers of 200 turns each. It carries a current of 4.0 A. (a) Calculate the magnetic field at the centre of the solenoid. (b) Is the long solenoid approximation valid? Justify. (c) If the same wire is rewound into a toroid of mean radius 10 cm with the same total turns, what is the magnetic field inside the toroid at the mean radius?
STEPS:
- Step 1: Identify given quantities with units. \( l = 0.50 \, \text{m} \), radius = 0.015 m (not needed for B inside), layers = 5, turns per layer = 200 → \( N = 1000 \). \( I = 4.0 \, \text{A} \). \( \mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A} \). For toroid: \( r = 0.10 \, \text{m} \).
- Step 2: Compute turn density \( n = N/l = 1000 / 0.50 = 2000 \, \text{m}^{-1} \).
- Step 3: Apply solenoid formula \( B = \mu_0 n I = (4\pi \times 10^{-7}) \times 2000 \times 4.0 = 32\pi \times 10^{-4} \, \text{T} \approx 1.005 \times 10^{-2} \, \text{T} \).
- Step 4: Check approximation: \( l / \text{diameter} = 0.50 / 0.03 \approx 16.7 \). Since \( l \gg \text{radius} \) (16.7 > 10), approximation is reasonably valid.
- Step 5: For toroid, use \( B = \frac{\mu_0 N I}{2\pi r} = \frac{(4\pi \times 10^{-7}) \times 1000 \times 4.0}{2\pi \times 0.10} = \frac{16\pi \times 10^{-4}}{0.2\pi} = 8 \times 10^{-3} \, \text{T} \).
- Step 6: Verify units: \( \mu_0 \) (T·m/A) × \( n \) (m\(^{-1}\)) × \( I \) (A) = T. Toroid: \( \mu_0 N I \) (T·m) / \( r \) (m) = T.
REASONING: The solenoid field depends on turn density \( n \), while the toroid field depends on total turns \( N \) and mean radius \( r \). The same wire (same \( N \)) gives different fields because geometry changes the enclosed current per unit length. The long solenoid condition \( l \gg a \) ensures end effects are negligible.
ANSWER: (a) \( 1.0 \times 10^{-2} \, \text{T} \) (or \( 10.0 \, \text{mT} \)), (b) Yes, \( l/\text{dia} \approx 17 \gg 1 \), (c) \( 8.0 \times 10^{-3} \, \text{T} \) (or \( 8.0 \, \text{mT} \)).

## WORKED_EXAMPLE_2
PROBLEM: A toroid has a non-circular cross-section: inner radius 12 cm, outer radius 18 cm. It has 1500 turns and carries a current of 2.5 A. (a) Calculate the magnetic field at the inner and outer radii. (b) What is the percentage variation in \( B \) across the cross-section? (c) If the cross-section were circular with radius 3 cm, what would be the mean radius for the same inner/outer radii?
STEPS:
- Step 1: Given: \( r_{\text{in}} = 0.12 \, \text{m} \), \( r_{\text{out}} = 0.18 \, \text{m} \), \( N = 1500 \), \( I = 2.5 \, \text{A} \), \( \mu_0 = 4\pi \times 10^{-7} \).
- Step 2: Formula \( B(r) = \frac{\mu_0 N I}{2\pi r} \). Compute constant \( \frac{\mu_0 N I}{2\pi} = \frac{(4\pi \times 10^{-7}) \times 1500 \times 2.5}{2\pi} = 2 \times 1500 \times 2.5 \times 10^{-7} = 7.5 \times 10^{-4} \, \text{T·m} \).
- Step 3: \( B_{\text{in}} = \frac{7.5 \times 10^{-4}}{0.12} = 6.25 \times 10^{-3} \, \text{T} \). \( B_{\text{out}} = \frac{7.5 \times 10^{-4}}{0.18} = 4.17 \times 10^{-3} \, \text{T} \).
- Step 4: Percentage variation = \( \frac{B_{\text{in}} - B_{\text{out}}}{B_{\text{mean}}} \times 100\% \). Mean radius \( r_{\text{mean}} = (0.12 + 0.18)/2 = 0.15 \, \text{m} \). \( B_{\text{mean}} = 7.5 \times 10^{-4} / 0.15 = 5.0 \times 10^{-3} \, \text{T} \). Variation = \( \frac{6.25 - 4.17}{5.0} \times 100\% = 41.6\% \).
- Step 5: For circular cross-section with same inner/outer radii, the mean radius is still \( 0.15 \, \text{m} \). Cross-section radius \( a = (r_{\text{out}} - r_{\text{in}})/2 = 0.03 \, \text{m} = 3 \, \text{cm} \).
REASONING: The \( 1/r \) dependence causes significant non-uniformity if the cross-section is large compared to mean radius. Here \( a / r_{\text{mean}} = 0.03/0.15 = 0.2 \) (20%), leading to 41% variation. For a "thin" toroid (\( a \ll r_{\text{mean}} \)), variation is small.
ANSWER: (a) \( B_{\text{in}} = 6.25 \times 10^{-3} \, \text{T} \), \( B_{\text{out}} = 4.17 \times 10^{-3} \, \text{T} \), (b) 41.6%, (c) Mean radius = 15 cm, cross-section radius = 3 cm.

## WORKED_EXAMPLE_3
PROBLEM: A solenoid of length 1.0 m and radius 2.0 cm has 1000 turns and carries a current of 5.0 A. A small circular coil of radius 1.0 cm, 50 turns, carrying a current of 0.5 A, is placed coaxially at the centre of the solenoid with its plane perpendicular to the solenoid axis. (a) Find the magnetic field at the centre of the solenoid. (b) Find the torque on the small coil when its magnetic moment makes an angle of 30° with the solenoid axis. (c) If the small coil is free to rotate, what is its orientation of stable equilibrium?
STEPS:
- Step 1: Solenoid: \( l = 1.0 \, \text{m} \), \( N_s = 1000 \), \( I_s = 5.0 \, \text{A} \). \( n = 1000 \, \text{m}^{-1} \). \( B = \mu_0 n I_s = 4\pi \times 10^{-7} \times 1000 \times 5 = 20\pi \times 10^{-4} = 6.28 \times 10^{-3} \, \text{T} \).
- Step 2: Small coil: \( N_c = 50 \), \( r_c = 0.01 \, \text{m} \), \( I_c = 0.5 \, \text{A} \). Area \( A = \pi r_c^2 = \pi \times 10^{-4} \, \text{m}^2 \). Magnetic moment \( m = N_c I_c A = 50 \times 0.5 \times \pi \times 10^{-4} = 25\pi \times 10^{-4} \, \text{A·m}^2 \).
- Step 3: Torque \( \tau = m B \sin\theta \). \( \theta = 30^\circ \), \( \sin 30^\circ = 0.5 \). \( \tau = (25\pi \times 10^{-4}) \times (6.28 \times 10^{-3}) \times 0.5 \). Compute: \( 25\pi \times 10^{-4} \approx 7.85 \times 10^{-3} \). \( \tau \approx 7.85 \times 10^{-3} \times 6.28 \times 10^{-3} \times 0.5 = 2.47 \times 10^{-5} \, \text{N·m} \).
- Step 4: Stable equilibrium occurs when magnetic moment \( \vec{m} \) is parallel to \( \vec{B} \) (i.e., \( \theta = 0 \)). The coil's plane will be perpendicular to the solenoid axis (since \( \vec{m} \) is perpendicular to coil plane).
- Step 5: Verify units: \( m \) (A·m²) × \( B \) (T = N/(A·m)) = N·m. Correct.
REASONING: This combines solenoid field (c12_phy_cbse_04_007) with torque on a current loop (c12_phy_cbse_04_009). The solenoid provides a uniform \( \vec{B} \); the coil experiences torque \( \vec{\tau} = \vec{m} \times \vec{B} \). Stable equilibrium at \( \theta = 0 \) because potential energy \( U = -\vec{m} \cdot \vec{B} \) is minimum.
ANSWER: (a) \( 6.28 \times 10^{-3} \, \text{T} \), (b) \( 2.47 \times 10^{-5} \, \text{N·m} \), (c) Coil plane perpendicular to solenoid axis (magnetic moment parallel to axis).

## COMPETENCY_QUESTION_1
QUESTION: A long solenoid of length \( l \) and radius \( a \) (\( l \gg a \)) has \( n \) turns per unit length and carries current \( I \). A student argues: "Since the magnetic field outside is zero, the magnetic field lines must begin and end on the solenoid's ends, so the ends act like magnetic monopoles." Critically evaluate this statement using the concept of magnetic field lines and Gauss's law for magnetism.
COMPETENCY: Interpreting physical situations using fundamental laws (Gauss's law for magnetism) and identifying flawed analogies.
STEPS:
- Step 1: Recall Gauss's law for magnetism: \( \oint \vec{B} \cdot d\vec{A} = 0 \) (no magnetic monopoles).
- Step 2: Analyze the student's claim: Field lines "begin" at one end and "end" at the other would imply net magnetic flux through a closed surface enclosing one end is non-zero, violating Gauss's law.
- Step 3: Correct picture: Field lines are continuous closed loops. Inside the solenoid they go from south to north; outside they loop back from north to south. At the ends, they spread out but do not terminate.
- Step 4: Conclude: The ends are not monopoles; they are regions where field lines exit/enter the solenoid but continue as closed loops in the surrounding space.
ANSWER: The statement is incorrect. Magnetic field lines never begin or end; they form closed loops (Gauss's law for magnetism). The solenoid's ends are where field lines emerge from and re-enter the solenoid, but they continue externally as closed loops. The external field is weak and non-uniform, not zero, though for an ideal infinite solenoid it approaches zero. The student confuses "field is zero outside ideal solenoid" with "field lines terminate".
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A toroid with a rectangular cross-section (inner radius \( R_1 \), outer radius \( R_2 \), height \( h \)) has \( N \) turns carrying current \( I \). The toroid is made of a linear magnetic material with relative permeability \( \mu_r \). (a) Derive the expression for the magnetic field \( B \) inside the toroid as a function of radial distance \( r \). (b) Calculate the total magnetic flux \( \Phi_B \) through the cross-section of the toroid. (c) Hence find the self-inductance \( L \) of the toroid. (This combines solenoid/toroid field with electromagnetic induction concepts.)
COMPETENCY: Multi-step analytical reasoning combining Ampere's law, magnetic flux integration, and inductance definition.
STEPS:
- Step 1: Apply Ampere's law to a circular path of radius \( r \) (\( R_1 < r < R_2 \)): \( \oint \vec{B} \cdot d\vec{l} = B(2\pi r) = \mu_0 \mu_r I_{\text{enc}} = \mu_0 \mu_r N I \). So \( B(r) = \frac{\mu_0 \mu_r N I}{2\pi r} \).
- Step 2: Magnetic flux through a strip of height \( h \) and width \( dr \) at radius \( r \): \( d\Phi = B(r) h \, dr = \frac{\mu_0 \mu_r N I h}{2\pi} \frac{dr}{r} \).
- Step 3: Integrate from \( R_1 \) to \( R_2 \): \( \Phi_B = \frac{\mu_0 \mu_r N I h}{2\pi} \ln\left(\frac{R_2}{R_1}\right) \).
- Step 4: Total flux linkage \( \lambda = N \Phi_B = \frac{\mu_0 \mu_r N^2 I h}{2\pi} \ln\left(\frac{R_2}{R_1}\right) \).
- Step 5: Self-inductance \( L = \lambda / I = \frac{\mu_0 \mu_r N^2 h}{2\pi} \ln\left(\frac{R_2}{R_1}\right) \).
ANSWER: (a) \( B(r) = \frac{\mu_0 \mu_r N I}{2\pi r} \), (b) \( \Phi_B = \frac{\mu_0 \mu_r N I h}{2\pi} \ln(R_2/R_1) \), (c) \( L = \frac{\mu_0 \mu_r N^2 h}{2\pi} \ln(R_2/R_1) \).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Start with a real-world ______: a solenoid is used in an electric door lock (common in Indian homes/offices) – when current flows, a uniform magnetic field pulls a ferromagnetic plunger.

## DIAGNOSTIC_ANSWER_7
observation

The observation opens the lock's story: the solenoid's click is the theory's greeting before any loop is drawn. **A wrong answer (an experiment) reveals the student has upgraded a household sighting into a controlled trial the walkthrough never claims.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Start with a real-world observation: a solenoid is used in an electric door lock (common in Indian homes/offices) – when current flows, a uniform magnetic field pulls a ______ plunger.

## DIAGNOSTIC_ANSWER_8
ferromagnetic

The ferromagnetic plunger is the field's customer: only a material lured by magnetism makes the lock's click a motion. **A wrong answer (a copper) reveals the student has pulled a non-magnetic metal and stalled the lock despite the field.**
