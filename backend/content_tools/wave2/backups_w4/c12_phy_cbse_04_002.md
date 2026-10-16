## ELI5
A battery-fed copper wire hangs still until a horseshoe magnet leans in - then the wire leaps sideways. A current-carrying conductor in a uniform field feels F equals I l cross B: every drifting carrier's little Lorentz forces summed into one shove, proportional to current, length, field and the sine of the angle between. Its direction is the right-hand cross product of the current's arrow with the field, and it is strong enough to suspend a wire against its own weight.

## DEFINITION
The magnetic force on a straight current-carrying conductor placed in a uniform magnetic field is the vector sum of Lorentz forces on all moving charge carriers inside the conductor. For a straight conductor of length \(l\) carrying steady current \(I\) in a uniform magnetic field \(\vec{B}\), the force is \(\vec{F} = I \vec{l} \times \vec{B}\), where \(\vec{l}\) is a vector of magnitude \(l\) directed along the current. The SI unit of force is newton (N). This formula holds for a uniform magnetic field and a straight conductor; for arbitrary shapes, the force is obtained by integrating \(I d\vec{l} \times \vec{B}\) over the length.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can: (1) Calculate the magnitude and direction of magnetic force on a straight wire given current, length, magnetic field strength, and angle between them using \(\vec{F} = I \vec{l} \times \vec{B}\) and the right-hand rule for cross product; (2) Determine the condition for zero force and maximum force; (3) Apply the formula to solve numerical problems involving suspension of wires, force per unit length, and equilibrium situations.

## SCOPE_BOUNDARY
Covers magnetic force on a straight current-carrying conductor in a uniform magnetic field, derivation from Lorentz force on individual charges, vector nature of force, and applications like force per unit length and suspension problems. Does NOT cover force on curved wires (integration), torque on current loops (next node), force between parallel wires (later node), or non-uniform magnetic fields.

## WALKTHROUGH
Observe a copper wire hanging vertically from a support, connected to a battery. When a strong horseshoe magnet is brought near the wire with its poles facing the wire horizontally, the wire deflects sideways. This shows a current-carrying wire experiences a force in a magnetic field. To quantify this, recall from the previous node (c12_phy_cbse_04_001) that a single moving charge \(q\) feels \(\vec{F} = q\vec{v} \times \vec{B}\). A current \(I\) is a flow of many charges: in a conductor of cross-section \(A\) and length \(l\), with charge carrier density \(n\) and drift velocity \(\vec{v}_d\), the total force is \(n A l q \vec{v}_d \times \vec{B} = I \vec{l} \times \vec{B}\). The direction is perpendicular to both current and field, given by the right-hand rule for cross product (fingers from \(\vec{l}\) to \(\vec{B}\), thumb gives force direction for positive current). The magnitude is \(F = I l B \sin\theta\). Now we can solve problems like finding the magnetic field needed to suspend a wire against gravity.

Takeaway first: the wire force is the electron swarm's forces totalled - n A l carriers times q v-d cross B collapsing into I l cross B - maximum when perpendicular, zero when parallel. Exam moves: magnitude-and-direction questions, zero-and-maximum condition questions, and suspension questions balancing magnetic force against weight. Method: rerun the hanging wire - carriers counted, the product collapsed, the horseshoe's field crossed with the current. Check yourself: the current direction, not the electron drift, is what the l vector follows - the formula is written in conventional current's language. Drill: compute one wire's force and find the field that would hold it weightless.

## DIAGNOSTIC_QUESTION_1
State the formula for the magnetic force on a straight current-carrying conductor in a uniform magnetic field. Define each symbol and give its SI unit. Under what condition is the force zero?

## DIAGNOSTIC_ANSWER_1
The formula is \(\vec{F} = I \vec{l} \times \vec{B}\) or magnitude \(F = I l B \sin\theta\). Here \(I\) is current in amperes (A), \(\vec{l}\) is length vector in metres (m) directed along current, \(\vec{B}\) is magnetic field in tesla (T), and \(\theta\) is the angle between \(\vec{l}\) and \(\vec{B}\). Force is zero when \(\theta = 0^\circ\) or \(180^\circ\) (current parallel or antiparallel to field). A wrong answer (e.g., giving \(F = qvB\) or omitting \(\sin\theta\)) reveals the student is confusing the single-charge Lorentz force with the conductor formula, or does not understand the vector cross product.

## DIAGNOSTIC_QUESTION_2
A horizontal wire carries current from south to north. A uniform magnetic field points vertically downward. Using the right-hand rule for cross product, determine the direction of the magnetic force on the wire. Explain why the force would be opposite if the current direction were reversed.

## DIAGNOSTIC_ANSWER_2
Current \(\vec{l}\) points north, \(\vec{B}\) points down. \(\vec{l} \times \vec{B}\): point fingers north, curl them downward, thumb points west. Force is horizontally west. If current reverses (north to south), \(\vec{l}\) points south, \(\vec{l} \times \vec{B}\) points east. The force reverses because \(\vec{F} \propto I\) and \(I\) changes sign. A wrong answer (e.g., force up/down or north/south) shows the student cannot apply the right-hand rule for cross product or confuses it with the right-hand thumb rule for magnetic field around a wire.

## DIAGNOSTIC_QUESTION_3
A straight wire of length 0.50 m and mass 10 g carries a current of 2.0 A. It is placed horizontally in a uniform horizontal magnetic field of 0.40 T directed perpendicular to the wire. Calculate the magnetic force on the wire. Will the wire move? If yes, in which direction relative to the current and field? (Take \(g = 10\ \text{m/s}^2\))

## DIAGNOSTIC_ANSWER_3
Given: \(l = 0.50\ \text{m}\), \(I = 2.0\ \text{A}\), \(B = 0.40\ \text{T}\), \(\theta = 90^\circ\). \(F = I l B \sin 90^\circ = 2.0 \times 0.50 \times 0.40 \times 1 = 0.40\ \text{N}\). Weight \(mg = 0.010\ \text{kg} \times 10\ \text{m/s}^2 = 0.10\ \text{N}\). Magnetic force (0.40 N) > weight (0.10 N), so wire will accelerate upward if the force is vertically upward. Direction: using right-hand rule, if current is east and field is north, force is up. A wrong answer (e.g., forgetting to convert mass to kg, or using \(\sin 0^\circ\)) reveals unit conversion errors or misunderstanding of the angle.

## DIAGNOSTIC_QUESTION_4
Two identical wires of length \(l\) carry the same current \(I\). Wire A is placed perpendicular to a uniform magnetic field \(B\). Wire B is placed at \(30^\circ\) to the same field. Compare the magnitudes of magnetic forces on the two wires. If the force on wire A is \(F_0\), express the force on wire B in terms of \(F_0\).

## DIAGNOSTIC_ANSWER_4
For wire A: \(\theta = 90^\circ\), \(F_A = I l B \sin 90^\circ = I l B = F_0\). For wire B: \(\theta = 30^\circ\), \(F_B = I l B \sin 30^\circ = I l B \times \frac{1}{2} = \frac{F_0}{2}\). Force on B is half of that on A. A wrong answer (e.g., \(F_B = F_0\) or \(F_B = \frac{\sqrt{3}}{2}F_0\)) indicates the student does not understand the \(\sin\theta\) dependence or confuses the angle with its complement.

## DIAGNOSTIC_QUESTION_5
A student claims: "If a current-carrying wire is placed in a magnetic field, the magnetic force does work on the wire because the wire moves." Evaluate this statement. Is it correct? Justify your answer using the concept of magnetic force on moving charges.

## DIAGNOSTIC_ANSWER_5
The statement is incorrect. The magnetic force on each charge carrier is \(\vec{F} = q\vec{v}_d \times \vec{B}\), which is always perpendicular to the drift velocity \(\vec{v}_d\). Work done by a force is \(W = \int \vec{F} \cdot d\vec{s}\). Since \(\vec{F} \perp \vec{v}_d\), the instantaneous power \(\vec{F} \cdot \vec{v}_d = 0\). Thus magnetic force does no work on the charge carriers. The kinetic energy of the wire comes from the battery (electric field inside the wire) which maintains the current against the magnetic force. A student who says "magnetic force does work" confuses the macroscopic motion of the wire with the microscopic force on charges; they have not understood that magnetic forces are always perpendicular to velocity and hence do no work.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a battery, a flexible copper wire, a horseshoe magnet, and a switch to demonstrate that the magnetic force on a current-carrying wire is perpendicular to both the current and the magnetic field. Describe the setup, what you would observe, and how you would verify the perpendicular nature.

## DIAGNOSTIC_ANSWER_6
Setup: Hang a flexible copper wire vertically from a support, connect its lower end to a battery via a switch, and place a horseshoe magnet so its poles are horizontal (field horizontal). Close the switch. Observation: The wire deflects horizontally, perpendicular to both the vertical current and horizontal field. Reverse the battery: deflection reverses direction. Reverse the magnet poles: deflection reverses. Rotate the magnet so field is vertical (parallel to current): no deflection. This verifies \(\vec{F} \perp \vec{l}\) and \(\vec{F} \perp \vec{B}\), and \(\vec{F} \propto I\) and \(\vec{F} \propto B\). A poor answer would only describe deflection without systematic variation of current/field directions, missing the cross-product nature.

## COMMON_MISCONCEPTION
Students often think the magnetic force on a current-carrying wire is along the magnetic field lines (like iron filings align) or along the current direction. They confuse the right-hand thumb rule for magnetic field around a wire (thumb = current, fingers = field) with the right-hand rule for force on a wire (fingers from current to field, thumb = force). For example, given current east and field north, they may say force is east (along current) or north (along field) instead of vertically up/down. This stems from not distinguishing between the field produced by a current and the force on a current due to an external field.

## ON_FAILURE
1. Revisit c12_phy_cbse_04_001 (Lorentz force on a moving charge) and practice the right-hand rule for \(\vec{v} \times \vec{B}\) with simple velocity-field pairs. 2. Use a physical right-hand model: hold your right hand flat, fingers pointing in current direction, then curl them toward field direction; thumb gives force. Do this for 6 combinations of current (E/W/N/S) and field (E/W/N/S/Up/Down). 3. Solve 5 numerical problems from NCERT Exercise 4.5 and 4.6, explicitly writing the angle \(\theta\) and checking if \(\sin\theta = 0, 0.5, 1\). 4. Watch the interactive demo "Charged particles moving in a magnetic field" (link in NCERT) and observe the perpendicular deflection.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_04_001, c10_phy_cbse_02_005, c11_phy_cbse_03_008
## PREREQUISITE_REASONS
c12_phy_cbse_04_001: The Lorentz force on a single moving charge is the microscopic origin of the macroscopic force on a conductor; the derivation \(F = I l \times B\) starts from \(F = q v \times B\). c10_phy_cbse_02_005: Class 10 introduced the qualitative fact that a current-carrying wire experiences a force in a magnetic field and the left-hand rule (Fleming's); this node upgrades to vector cross product and quantitative formula. c11_phy_cbse_03_008: The vector cross product \(\vec{l} \times \vec{B}\) is essential for direction and magnitude (\(l B \sin\theta\)); without mastery of cross product, direction errors are inevitable.
c10_phy_cbse_02_005: Requires this concept - this node (The magnetic force on a straight current-carrying conductor placed in a uniform magnetic f...) builds directly on that foundation.  
c11_phy_cbse_03_008: Requires The vector (cross) product of two vectors A and B is a vector C = A × B whose magnitude is... - this node (The magnetic force on a straight current-carrying conductor placed in a uniform magnetic f...) builds directly on that foundation.  

## FORWARD_NODE_IDS
c12_phy_cbse_04_008, c12_phy_cbse_04_009
## FORWARD_REASONS
c12_phy_cbse_04_008: Force between two parallel currents is derived by applying \(\vec{F} = I \vec{l} \times \vec{B}\) where \(\vec{B}\) is the field produced by one wire at the location of the other. c12_phy_cbse_04_009: Torque on a current loop is calculated by integrating \(I d\vec{l} \times \vec{B}\) on each segment; the net force is zero but net torque is \(\vec{\tau} = \vec{m} \times \vec{B}\), directly building on the force formula.
c12_phy_cbse_04_009: Force on a current-carrying conductor (F = Il × B) is directly used to derive torque on a loop.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_003, c11_math_cbse_03_005
## CROSS_SUBJECT_REASONS
c11_math_cbse_03_003: Trigonometric functions \(\sin\theta\) are needed to compute the magnitude \(F = I l B \sin\theta\) for arbitrary angles. c11_math_cbse_03_005: Trigonometric functions of any angle (including obtuse angles) are required when the angle between current and field is >90°, as \(\sin\theta\) remains positive for \(0<\theta<180^\circ\) but the direction of cross product flips.
c11_math_cbse_03_005: Cross-subject support: Trigonometric functions of any angle are defined using the unit circle: supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c12_phy_cbse_04_001 -> c12_phy_cbse_04_002 -> c12_phy_cbse_04_008

## THIS_FORMULA
\(\vec{F} = I \vec{l} \times \vec{B}\); magnitude \(F = I l B \sin\theta\) (SI units: \(F\) in N, \(I\) in A, \(l\) in m, \(B\) in T)

## FORMULA_VARIABLES
\(\vec{F}\) = magnetic force vector (N), \(I\) = steady current (A), \(\vec{l}\) = length vector of straight conductor (m), direction along current, \(\vec{B}\) = uniform external magnetic field vector (T), \(\theta\) = angle between \(\vec{l}\) and \(\vec{B}\) (rad or °)

## FORMULA_UNITS
N, A, m, T, rad/°

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_03_003 | Trigonometric functions provide \(\sin\theta\) for magnitude calculation when current and field are not perpendicular.
c11_phy_cbse_03_008 | Vector cross product determines the direction of force perpendicular to both current and field vectors.
## PREREQ_CONCEPT
Lorentz force on a moving charge (\(\vec{F} = q\vec{v} \times \vec{B}\)) and vector cross product.

## PREREQ_BEFORE
Student must be able to compute cross product direction using right-hand rule and magnitude using \(|\vec{a} \times \vec{b}| = ab\sin\theta\).

## PREREQ_STUCK
If stuck on direction, practice c11_phy_cbse_03_008 (Vector Cross Product) with 10 simple vector pairs until the right-hand rule is automatic.

## WORKED_EXAMPLE_1
PROBLEM: A horizontal straight wire of length 1.2 m and mass 30 g carries a current of 5.0 A from west to east. It is placed in a uniform horizontal magnetic field of 0.60 T directed from south to north. (a) Calculate the magnitude and direction of the magnetic force on the wire. (b) Will the wire lift off the supports? (c) What minimum current is needed to just lift the wire? (Take \(g = 9.8\ \text{m/s}^2\))

STEPS:
- Step 1: Identify given quantities: \(l = 1.2\ \text{m}\), \(m = 30\ \text{g} = 0.030\ \text{kg}\), \(I = 5.0\ \text{A}\), \(B = 0.60\ \text{T}\). Current direction: west to east (\(\vec{l}\) east). Field direction: south to north (\(\vec{B}\) north). Angle \(\theta = 90^\circ\) (horizontal perpendicular directions).
- Step 2: Formula: \(F = I l B \sin\theta\). Direction by right-hand rule: fingers from east to north, thumb points vertically upward.
- Step 3: Substitute: \(F = 5.0 \times 1.2 \times 0.60 \times \sin 90^\circ = 3.6\ \text{N}\). Direction: vertically upward.
- Step 4: Weight \(mg = 0.030 \times 9.8 = 0.294\ \text{N}\). Magnetic force (3.6 N) > weight (0.294 N), so net upward force = 3.306 N. Wire will accelerate upward.
- Step 5: For minimum current to just lift, set \(I_{\min} l B = mg\) → \(I_{\min} = \frac{mg}{l B} = \frac{0.294}{1.2 \times 0.60} = 0.408\ \text{A}\).

REASONING: The force is perpendicular to both current and field because of the cross product. The wire lifts when magnetic force balances weight. The current needed is directly proportional to weight and inversely proportional to \(l\) and \(B\).

ANSWER: (a) 3.6 N, vertically upward. (b) Yes, wire lifts off. (c) 0.41 A (approx).

## WORKED_EXAMPLE_2
PROBLEM: A wire of length 0.80 m carries a current of 3.0 A and makes an angle of 60° with a uniform magnetic field of 0.50 T. Calculate the force on the wire. If the wire is bent into a semicircle of radius \(R\) in the same plane, with the same current and field, what is the net force on the semicircular wire? (Hint: For a curved wire, \(\vec{F} = I \int d\vec{l} \times \vec{B}\).)

STEPS:
- Step 1: Straight wire: \(l = 0.80\ \text{m}\), \(I = 3.0\ \text{A}\), \(B = 0.50\ \text{T}\), \(\theta = 60^\circ\). Magnitude \(F = I l B \sin 60^\circ = 3.0 \times 0.80 \times 0.50 \times \frac{\sqrt{3}}{2} = 1.04\ \text{N}\). Direction: perpendicular to plane containing wire and field.
- Step 2: For semicircular wire: The wire lies in a plane. Let the plane be the plane of the semicircle. The magnetic field is uniform. The net force on a closed current loop in uniform \(\vec{B}\) is zero, but a semicircle is not closed. However, the integral \(\int d\vec{l}\) over the semicircle is the vector from start to end point (the diameter). For a semicircle of radius \(R\), length \(\pi R = 0.80\ \text{m}\) → \(R = 0.80/\pi\ \text{m}\). The vector sum of \(d\vec{l}\) is the diameter vector of length \(2R = 1.60/\pi\ \text{m}\) directed along the diameter. The force is \(I (\int d\vec{l}) \times \vec{B} = I (2R) B \sin\phi\), where \(\phi\) is angle between diameter and \(\vec{B}\). Without knowing the orientation of the semicircle relative to \(\vec{B}\), we cannot give a numerical value. But if the diameter is perpendicular to \(\vec{B}\), then \(F = I (2R) B = 3.0 \times (1.60/\pi) \times 0.50 = 0.764\ \text{N}\).
- Step 3: Compare: Straight wire force (1.04 N) vs semicircular wire force (0.764 N) for same length, current, field, and optimal orientation. The force depends on the vector sum of length elements, not total length.

REASONING: For a curved wire, the net force is \(I \vec{L}_{\text{eff}} \times \vec{B}\) where \(\vec{L}_{\text{eff}}\) is the vector from start to end. This shows force depends on the displacement between endpoints, not the path length.

ANSWER: Straight wire: 1.04 N perpendicular to both wire and field. Semicircular wire (diameter perpendicular to field): 0.76 N perpendicular to diameter and field.

## WORKED_EXAMPLE_3
PROBLEM: A rectangular loop of wire with sides 20 cm and 10 cm carries a current of 2.0 A. It is placed in a uniform magnetic field of 0.30 T directed horizontally. The plane of the loop is vertical, and the longer sides are horizontal. (a) Find the force on each side. (b) Find the net force on the loop. (c) Find the torque on the loop about an axis through the center parallel to the shorter sides. (This connects to the next node on torque.)

STEPS:
- Step 1: Identify geometry. Loop: longer sides \(l_1 = 0.20\ \text{m}\) horizontal, shorter sides \(l_2 = 0.10\ \text{m}\) vertical. Current 2.0 A flows, say, clockwise when viewed from left. Field \(\vec{B} = 0.30\ \text{T}\) horizontal, say along +x (same as longer sides? Let's define: longer sides along x, shorter along y, field along x). Then for longer sides: \(\vec{l}\) parallel or antiparallel to \(\vec{B}\) → \(\theta = 0^\circ\) or \(180^\circ\) → force = 0. For shorter sides: \(\vec{l}\) vertical (along y), \(\vec{B}\) horizontal (along x), \(\theta = 90^\circ\). Force magnitude \(F = I l_2 B = 2.0 \times 0.10 \times 0.30 = 0.060\ \text{N}\). Direction: for one side current up, \(\vec{l} \times \vec{B}\) = up × right = out of page (toward viewer). For opposite side current down, force into page.
- Step 2: Forces on shorter sides are equal, opposite, and not collinear (separated by 0.20 m). They form a couple. Net force = 0 (since forces on longer sides are zero, and forces on shorter sides cancel as vectors).
- Step 3: Torque about center axis parallel to shorter sides (y-axis): The couple has moment arm = distance between shorter sides = 0.20 m. Torque magnitude \(\tau = F \times \text{arm} = 0.060 \times 0.20 = 0.012\ \text{N·m}\). Direction: tends to rotate the loop about y-axis. This matches \(\tau = I A B \sin\theta\) where \(A = 0.20 \times 0.10 = 0.020\ \text{m}^2\), \(\theta = 90^\circ\) (normal to loop is horizontal perpendicular to B? Actually normal is along z if loop in xy-plane? Wait: loop vertical with longer sides horizontal. If loop is in xz-plane (x horizontal, z vertical), longer sides along x, shorter along z. Field along x. Then normal is along y. Angle between normal and B is 90°. \(\tau = I A B \sin 90^\circ = 2.0 \times 0.020 \times 0.30 = 0.012\ \text{N·m}\). Consistent.)

REASONING: Forces on sides parallel to field are zero. Forces on perpendicular sides create a torque couple. Net force is zero in uniform field for any closed loop. Torque calculation previews the magnetic dipole moment concept.

ANSWER: (a) Longer sides: 0 N. Shorter sides: 0.060 N each, opposite directions (one out, one in). (b) Net force = 0 N. (c) Torque = 0.012 N·m about axis through center parallel to shorter sides.

## COMPETENCY_QUESTION_1
QUESTION: A straight wire of length \(l\) and mass per unit length \(\lambda\) carries a current \(I\). It is suspended horizontally by two flexible leads in a uniform horizontal magnetic field \(B\) directed perpendicular to the wire. The wire is in equilibrium. Derive an expression for the current \(I\) in terms of \(\lambda\), \(l\), \(B\), and \(g\). If the magnetic field is now tilted by 30° from the horizontal (still perpendicular to the wire), how does the required current change? Explain physically.

COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables

STEPS:
- Step 1: Draw free-body diagram: weight \(mg = \lambda l g\) down, magnetic force \(F = I l B \sin\theta\) up. For equilibrium, \(I l B \sin\theta = \lambda l g\).
- Step 2: For horizontal field perpendicular to wire, \(\theta = 90^\circ\), \(\sin\theta = 1\). So \(I = \frac{\lambda g}{B}\). Note length \(l\) cancels.
- Step 3: When field tilted by 30° from horizontal, the angle between wire (horizontal) and field is still 90°? Wait: wire is horizontal. Field was horizontal and perpendicular to wire. Now field is tilted by 30° from horizontal. The angle between wire (horizontal) and field is now 90°? Actually, if wire is along x, field was along y (horizontal). Now field is tilted 30° from horizontal, meaning it has a vertical component. The angle between wire (x) and field is still 90° because wire is horizontal and field is perpendicular to wire in the horizontal plane? The problem says "still perpendicular to the wire". So the field direction is changed but remains perpendicular to the wire. Then \(\theta = 90^\circ\) still, \(\sin\theta = 1\). The current required is unchanged! But wait: the magnetic force direction is \(\vec{l} \times \vec{B}\). If \(\vec{B}\) has a vertical component, the force will have a horizontal component. The wire is suspended by flexible leads, so it can move horizontally. For vertical equilibrium, we need the vertical component of magnetic force to balance weight. The magnetic force magnitude is \(I l B\) (since \(\theta=90^\circ\)). Its vertical component is \(I l B \cos 30^\circ\) (if field is tilted 30° from horizontal, its vertical component is \(B \sin 30^\circ\)? Let's be careful: field tilted by 30° from horizontal. So field makes 30° with horizontal. Since field is perpendicular to wire, the field vector is in a vertical plane perpendicular to wire. The magnetic force \(\vec{F} = I \vec{l} \times \vec{B}\) is perpendicular to both. If \(\vec{l}\) is horizontal (x), \(\vec{B}\) is in yz-plane at 30° to horizontal (y). Then \(\vec{l} \times \vec{B}\) is perpendicular to x and to \(\vec{B}\). It will have a vertical component. The vertical component of force is \(I l B \cos 30^\circ\)? Let's compute: \(\vec{l} = l \hat{i}\), \(\vec{B} = B(\cos 30^\circ \hat{j} + \sin 30^\circ \hat{k})\). \(\vec{l} \times \vec{B} = l B (\cos 30^\circ \hat{i} \times \hat{j} + \sin 30^\circ \hat{i} \times \hat{k}) = l B (\cos 30^\circ \hat{k} - \sin 30^\circ \hat{j})\). Vertical component (z) is \(I l B \cos 30^\circ\). For vertical equilibrium: \(I l B \cos 30^\circ = \lambda l g\) → \(I = \frac{\lambda g}{B \cos 30^\circ} = \frac{\lambda g}{B} \times \frac{2}{\sqrt{3}}\). So current must increase by factor \(1/\cos 30^\circ \approx 1.155\).
- Step 4: Physical explanation: When field is tilted, only the horizontal component of field (perpendicular to wire) produces vertical force. The vertical component of field produces horizontal force. Thus the effective field for lifting is \(B \cos 30^\circ\), requiring larger current.

ANSWER: For horizontal perpendicular field: \(I = \frac{\lambda g}{B}\). For field tilted 30° from horizontal (but still perpendicular to wire): \(I = \frac{\lambda g}{B \cos 30^\circ} = \frac{2\lambda g}{\sqrt{3}B}\). Current must increase by about 15.5% because only the horizontal component of the magnetic field contributes to the vertical lifting force.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a physics lab, a student sets up a wire of length 50 cm carrying a current of 4.0 A in a uniform magnetic field of 0.20 T. The wire is mounted on a light rod that can rotate about a vertical axis. The wire is initially perpendicular to the field. The student measures the torque required to hold the wire at an angle of 30° to the field direction. (a) Calculate the magnetic force on the wire when it is perpendicular to the field. (b) Calculate the torque on the wire when it makes 30° with the field, assuming the force acts at the center of the wire and the rod length is 25 cm from the pivot to the wire center. (c) If the wire is replaced by a semicircular wire of the same length (50 cm) connecting the same two points, what is the net magnetic force on the semicircular wire in the same field when the straight line joining its ends is perpendicular to the field? Explain why the forces differ.

COMPETENCY: Unit analysis and dimensional reasoning combined with vector integration for curved conductors

STEPS:
- Step 1: (a) Straight wire perpendicular: \(F = I l B \sin 90^\circ = 4.0 \times 0.50 \times 0.20 = 0.40\ \text{N}\).
- Step 2: (b) Torque when wire at 30° to field: The force magnitude is \(F = I l B \sin 30^\circ = 0.40 \times 0.5 = 0.20\ \text{N}\). The force is perpendicular to both wire and field. The lever arm is the perpendicular distance from pivot to line of action of force. If the rod is along the wire? The problem says "wire is mounted on a light rod that can rotate about a vertical axis". The wire is along the rod? Typically, the wire is the rod. Let's assume the wire is along the rod of length 0.50 m, pivot at one end? "rod length is 25 cm from the pivot to the wire center" → pivot to center distance = 0.25 m. The force acts at the center, perpendicular to the wire. The torque about pivot = force × distance from pivot to center = 0.20 N × 0.25 m = 0.050 N·m. (Assuming the force is perpendicular to the rod, which it is since force is perpendicular to wire and wire is along rod).
- Step 3: (c) Semicircular wire of length 0.50 m: radius \(R = 0.50/\pi\ \text{m}\). The straight line joining ends is the diameter, length \(2R = 1.00/\pi\ \text{m} \approx 0.318\ \text{m}\). This diameter is perpendicular to the field. The net force on a curved wire in uniform \(\vec{B}\) is \(I \vec{L}_{\text{eff}} \times \vec{B}\) where \(\vec{L}_{\text{eff}}\) is the vector from start to end (the diameter). So \(F_{\text{semi}} = I (2R) B \sin 90^\circ = 4.0 \times (1.00/\pi) \times 0.20 = 0.255\ \text{N}\).
- Step 4: Compare: Straight wire force (0.40 N) > Semicircular wire force (0.255 N). The straight wire has length vector of 0.50 m perpendicular to field. The semicircular wire has effective length vector equal to the diameter (0.318 m) perpendicular to field. The force depends on the vector sum of length elements, not the total path length. The curved wire "wastes" some length in directions that produce cancelling force components.

ANSWER: (a) 0.40 N. (b) 0.050 N·m. (c) 0.255 N. The forces differ because the magnetic force on a current element depends on the direction of the element; in the semicircle, components of \(d\vec{l}\) parallel to the field produce no force, and components perpendicular but opposite to the diameter direction cancel, leaving only the diameter as the effective length vector.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The magnetic force on a ______ current-carrying conductor placed in a uniform magnetic field is the vector sum of Lorentz forces on all moving charge carriers inside the conductor.

## DIAGNOSTIC_ANSWER_7
straight

The straight qualifier is the formula's borders: one direction, one uniform field, no curvature for the integral to chase. **A wrong answer (a coiled) reveals the student has curved the conductor beyond what the simple cross product covers.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a copper wire hanging ______ from a support, connected to a battery.

## DIAGNOSTIC_ANSWER_8
vertically

The vertical adverb is the setup's tension: the wire hangs, and the magnet's field must lift sideways against nothing but its own frame. **A wrong answer (a coiled word) reveals the student has wound the wire into a coil where the straight-line formula no longer applies.**
