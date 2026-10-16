## ELI5
Two power lines on a pole hum and shiver toward each other under heavy load: parallel currents attract, antiparallel ones repel, with force per unit length mu-zero I-one I-two over two pi d. The first wire's field, from Ampere's law, pushes the second wire's current by F equals I l B sine theta - and the interaction is so fundamental that the ampere itself is defined by it: two equal currents a metre apart feel exactly two times ten to the minus seven newtons per metre.

## DEFINITION
The force between two parallel current-carrying conductors is the magnetic force per unit length that each conductor exerts on the other due to their magnetic fields. For two long straight parallel conductors separated by distance \(d\) in vacuum, carrying steady currents \(I_1\) and \(I_2\), the magnitude of the force per unit length is \(f = \frac{\mu_0 I_1 I_2}{2\pi d}\). The force is attractive if the currents are parallel (same direction) and repulsive if they are antiparallel (opposite directions). This interaction is the basis for the SI definition of the ampere.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) calculate the magnitude and direction of the force per unit length between two parallel currents given their magnitudes, directions, and separation, (2) derive the expression starting from the magnetic field of a straight wire and the Lorentz force on a current element, and (3) explain how this force is used to define the ampere and why the definition requires infinitely long straight wires in vacuum.

## SCOPE_BOUNDARY
This node covers the force between two infinitely long, straight, parallel conductors in vacuum (or air) carrying steady currents. It includes the derivation from Biot-Savart/Ampere's law and Lorentz force, the direction rule (parallel currents attract, antiparallel repel), and the definition of the ampere. It does NOT cover finite-length wires, non-parallel configurations, time-varying currents, or forces in magnetic media.

## WALKTHROUGH
Observe two parallel power lines on a street pole: when heavy current flows, they sometimes vibrate or move slightly toward each other. This is the magnetic force between currents. To analyse it, first recall that a long straight wire produces a circular magnetic field \(B = \frac{\mu_0 I}{2\pi d}\) (from Ampere's law, node c12_phy_cbse_04_006). Then recall that a current-carrying conductor in an external magnetic field experiences a force \(F = I L B \sin\theta\) (node c12_phy_cbse_04_002). Place the second wire in the field of the first; the field is perpendicular to the second wire, so \(\sin\theta = 1\). The force on a length \(L\) of the second wire is \(F = I_2 L \left(\frac{\mu_0 I_1}{2\pi d}\right)\). Divide by \(L\) to get force per unit length. The direction follows from the right-hand rule for cross products: parallel currents attract. This formula is so fundamental that it defines the ampere: when \(I_1 = I_2 = 1\,\text{A}\) and \(d = 1\,\text{m}\), the force per metre is exactly \(2 \times 10^{-7}\,\text{N/m}\).

Takeaway first: wire one's field pushes wire two's current - the product of Ampere's law with the conductor force - and the definition of the ampere is this formula frozen at unit values. Exam moves: magnitude questions per unit length, direction questions by current sense, derivation questions chaining the two laws, and definition questions on the ampere's operational origin. Method: rerun the power lines - field of one computed, second wire's force taken, the sine dropped at perpendicularity, per-length divided. Check yourself: parallel currents attract - the opposite of like charges - and the reversal is the exam's favourite polarity test. Drill: compute one force per metre and state the ampere's defining arrangement.

## DIAGNOSTIC_QUESTION_1
State the formula for the force per unit length between two long parallel current-carrying conductors in vacuum. Give the SI unit of each quantity in the formula.

## DIAGNOSTIC_ANSWER_1
The force per unit length is \(f = \frac{\mu_0 I_1 I_2}{2\pi d}\). SI units: \(f\) in N/m, \(\mu_0\) in T·m/A (or N/A²), \(I_1, I_2\) in A, \(d\) in m. A wrong answer (e.g., missing \(2\pi\), using \(d^2\) in denominator, or giving force instead of force per unit length) reveals the student has memorised the formula incorrectly or confuses it with Coulomb's law for charges.

## DIAGNOSTIC_QUESTION_2
Two parallel wires carry currents in the same direction. Using the right-hand rule for magnetic field and the Lorentz force, explain why the force between them is attractive. Do not just state the rule — show the vector directions step by step.

## DIAGNOSTIC_ANSWER_2
Wire 1 produces a magnetic field \(\vec{B}_1\) that circles around it. At the location of wire 2 (to the right of wire 1), \(\vec{B}_1\) points into the page (right-hand grip rule). Wire 2 carries current upward. The force on wire 2 is \(\vec{F} = I_2 \vec{L} \times \vec{B}_1\). With \(\vec{L}\) upward and \(\vec{B}_1\) into the page, \(\vec{L} \times \vec{B}_1\) points left, toward wire 1. By Newton's third law, wire 1 feels an equal rightward force. A wrong answer (e.g., claiming repulsion, or saying the field is parallel to the wire) shows the student cannot apply the cross product to determine direction.

## DIAGNOSTIC_QUESTION_3
Two long parallel wires are separated by 5.0 cm. Wire A carries 12 A upward, wire B carries 8.0 A downward. Calculate the magnitude and direction of the force per unit length on wire B. Use \(\mu_0 = 4\pi \times 10^{-7}\,\text{T·m/A}\).

## DIAGNOSTIC_ANSWER_3
Given: \(I_1 = 12\,\text{A}\), \(I_2 = 8.0\,\text{A}\), \(d = 0.050\,\text{m}\).  
\(f = \frac{\mu_0 I_1 I_2}{2\pi d} = \frac{(4\pi \times 10^{-7}) \times 12 \times 8.0}{2\pi \times 0.050} = \frac{384\pi \times 10^{-7}}{0.1\pi} = 3.84 \times 10^{-4}\,\text{N/m}\).  
Currents are opposite (antiparallel), so the force is repulsive: wire B is pushed away from wire A. A wrong answer (e.g., \(3.84 \times 10^{-3}\,\text{N/m}\) from missing a factor of 10, or attractive direction) reveals unit conversion errors (cm to m) or confusion about the attraction/repulsion rule.

## DIAGNOSTIC_QUESTION_4
A student claims: "The force between two parallel currents is proportional to \(1/d^2\) because the magnetic field of a wire falls as \(1/d\) and the force on the other wire also falls as \(1/d\), so together it's \(1/d^2\)." Identify the error in this reasoning and give the correct dependence.

## DIAGNOSTIC_ANSWER_4
The error is double-counting the distance dependence. The magnetic field of wire 1 at wire 2 is \(B \propto 1/d\). The force on wire 2 is \(F = I_2 L B \sin\theta\). Since \(B \propto 1/d\), the force per unit length \(f \propto 1/d\). The student incorrectly multiplied two \(1/d\) factors, but the force formula already includes the field's \(1/d\) dependence only once. The correct dependence is \(f \propto 1/d\). A wrong answer accepting the \(1/d^2\) claim shows the student does not understand that the force formula \(F = I L B\) directly uses the field at the location of the second wire, not a product of two separate distance factors.

## DIAGNOSTIC_QUESTION_5
In a current balance experiment to define the ampere, two parallel wires are 1.00 m apart in vacuum. One wire carries a known current of 2.00 A. The measured force per unit length on the other wire is \(8.00 \times 10^{-7}\,\text{N/m}\). The student calculates the unknown current as 1.00 A. Is this correct? If not, find the correct value and explain the student's mistake.

## DIAGNOSTIC_ANSWER_5
Using \(f = \frac{\mu_0 I_1 I_2}{2\pi d}\) with \(d = 1.00\,\text{m}\), \(\mu_0 = 4\pi \times 10^{-7}\).  
\(I_2 = \frac{f \cdot 2\pi d}{\mu_0 I_1} = \frac{(8.00 \times 10^{-7}) \times 2\pi \times 1.00}{(4\pi \times 10^{-7}) \times 2.00} = \frac{16\pi \times 10^{-7}}{8\pi \times 10^{-7}} = 2.00\,\text{A}\).  
The student's answer of 1.00 A is incorrect. The mistake likely came from using \(\mu_0 = 2 \times 10^{-7}\) (the defined force per metre for 1 A) instead of \(4\pi \times 10^{-7}\), or forgetting the factor of 2 in the numerator. A wrong answer indicates confusion between the defined constant \(2 \times 10^{-7}\,\text{N/m}\) and the permeability \(\mu_0\).

## DIAGNOSTIC_QUESTION_6
Design a simple laboratory experiment using a current balance to verify that the force between two parallel currents is proportional to the product of the currents. Specify the measurements you would take, the graph you would plot, and how you would extract the proportionality constant.

## DIAGNOSTIC_ANSWER_6
Use a current balance with two parallel conductors: one fixed, one movable on a balance arm. Keep separation \(d\) constant. Vary \(I_1\) and \(I_2\) independently (e.g., using two power supplies). For each pair \((I_1, I_2)\), measure the force \(F\) (via mass added to balance) on a known length \(L\). Compute force per unit length \(f = F/L\). Plot \(f\) versus \(I_1 I_2\). The graph should be a straight line through origin. Slope = \(\frac{\mu_0}{2\pi d}\). From slope and known \(d\), calculate \(\mu_0\). A poor answer would omit independent variation of both currents, forget to keep \(d\) constant, or plot \(f\) vs \(I\) only, missing the product relationship.

## COMMON_MISCONCEPTION
Students often think the force between parallel currents follows an inverse-square law like Coulomb's force between charges, writing \(f \propto 1/d^2\). They incorrectly argue: "The magnetic field of a wire falls as \(1/d\), and the force on the other wire also falls as \(1/d\), so it's \(1/d^2\)." In reality, the force per unit length is \(f = I_2 B_1\), and \(B_1 \propto 1/d\), so \(f \propto 1/d\). The error arises from treating the force as a product of two separate distance-dependent effects, whereas the Lorentz force formula directly uses the field at the location of the second wire. Another common error is confusing the direction: students sometimes think parallel currents repel because "like charges repel," not realizing that magnetic interaction between currents is fundamentally different from electrostatic interaction between charges.

## ON_FAILURE
If a student exhibits the \(1/d^2\) misconception, have them re-derive the force step by step: (1) Write the magnetic field of wire 1 at distance \(d\): \(B_1 = \frac{\mu_0 I_1}{2\pi d}\). (2) Write the force on a length \(L\) of wire 2: \(F = I_2 L B_1 \sin 90^\circ\). (3) Substitute \(B_1\) and simplify to \(F = \frac{\mu_0 I_1 I_2 L}{2\pi d}\). (4) Divide by \(L\) to get \(f\). Explicitly track the power of \(d\) at each step. Then ask: "Where did a second factor of \(1/d\) come from?" For direction confusion, use the right-hand rule physically: point fingers in direction of current, curl to find field, then use palm for force. Practice with two pencils as wires.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_04_002, c12_phy_cbse_04_006, c10_phy_cbse_02_002, c10_phy_cbse_02_005, c11_phy_cbse_04_004, c11_phy_cbse_03_008, c12_phy_cbse_04_007, c11_math_cbse_13_007

## PREREQUISITE_REASONS
c12_phy_cbse_04_002: Provides the formula for force on a current-carrying conductor in a magnetic field (\(F = I \vec{L} \times \vec{B}\)), which is directly applied to the second wire.
c12_phy_cbse_04_006: Provides Ampere's circuital law, used to derive the magnetic field of a long straight wire (\(B = \frac{\mu_0 I}{2\pi d}\)).
c10_phy_cbse_02_002: Earlier introduction of magnetic field due to a straight current-carrying conductor (right-hand thumb rule, field lines).
c10_phy_cbse_02_005: Earlier introduction of force on a current-carrying conductor in a magnetic field (Fleming's left-hand rule).
c11_phy_cbse_04_004: Newton's third law (action-reaction) ensures forces on the two wires are equal and opposite, consistent with the derivation.
c11_phy_cbse_03_008: Vector cross product is needed to determine the direction of both the magnetic field and the force.
c12_phy_cbse_04_007: Force between parallel currents uses the magnetic field of a long straight wire (derived via Ampere's law), similar symmetry arguments.  
c11_math_cbse_13_007: c11_math_cbse_13_007 | Derivative of polynomial functions — the concept of rate of change (derivative) underlies the definition of current as \(I = dq/dt\), which is fundamental to the force formula since force depends on current.  

## FORWARD_NODE_IDS
c12_phy_cbse_04_009, c12_phy_cbse_04_010, c12_phy_cbse_04_011
## FORWARD_REASONS
c12_phy_cbse_04_009: Torque on a current loop arises from forces on its parallel segments; understanding force between parallel currents helps analyse the couple on opposite sides of a rectangular loop.
c12_phy_cbse_04_010: The moving coil galvanometer uses a coil in a radial magnetic field; the torque derivation relies on forces on current-carrying conductors, analogous to parallel wire forces.
c12_phy_cbse_04_011: Converting a galvanometer to an ammeter involves a shunt resistor in parallel; the current division principle is related to parallel current paths, though the magnetic force between them is negligible in that context.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_008, c11_math_cbse_03_009
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_008: Angle between two lines — used to determine the angle between the current direction and the magnetic field direction (which is 90° for parallel wires), essential for the cross product magnitude \(|\vec{L} \times \vec{B}| = LB \sin\theta\).
c11_math_cbse_03_009: Trigonometric identities (sum and difference formulas) — used in deriving the direction of the magnetic field and force via vector cross products, especially when generalising to non-perpendicular orientations.

## CHAIN_DESCRIPTION
c12_phy_cbse_04_002 -> c12_phy_cbse_04_008 -> c12_phy_cbse_04_009

## THIS_FORMULA
Force per unit length: \(f = \frac{\mu_0 I_1 I_2}{2\pi d}\) (N/m). Force on length \(L\): \(F = \frac{\mu_0 I_1 I_2 L}{2\pi d}\) (N). \(\mu_0 = 4\pi \times 10^{-7}\,\text{T·m/A}\).

## FORMULA_VARIABLES
\(f\) = force per unit length (N/m); \(F\) = force on length \(L\) (N); \(\mu_0\) = permeability of free space (\(4\pi \times 10^{-7}\,\text{T·m/A}\)); \(I_1, I_2\) = currents in the two conductors (A); \(d\) = separation between conductors (m); \(L\) = length of conductor segment considered (m).

## FORMULA_UNITS
N/m, N, T·m/A, A, m.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_008 | The angle between the current vector and magnetic field vector is 90° for parallel wires, making \(\sin\theta = 1\); this geometric concept from coordinate geometry ensures the cross product magnitude is simply the product of magnitudes.
c11_math_cbse_13_007 | Derivative of polynomial functions — the concept of rate of change (derivative) underlies the definition of current as \(I = dq/dt\), which is fundamental to the force formula since force depends on current.
## PREREQ_CONCEPT
Magnetic field of a long straight current-carrying wire and the Lorentz force on a current-carrying conductor.

## PREREQ_BEFORE
The student must be able to calculate the magnetic field at a distance from a long straight wire using Ampere's law and compute the force on a current-carrying wire placed in a uniform magnetic field using the cross product.

## PREREQ_STUCK
If stuck, revisit c12_phy_cbse_04_006 (Ampere's circuital law) to review the derivation of \(B = \frac{\mu_0 I}{2\pi d}\) and c12_phy_cbse_04_002 (force on a current-carrying conductor) to review \(F = I \vec{L} \times \vec{B}\).

## WORKED_EXAMPLE_1
PROBLEM: Two overhead power lines run parallel to each other along a street, separated by 40 cm. Each carries an alternating current, but at a given instant the currents are 250 A and 180 A in the same direction. Calculate the force per metre between them. Is it attractive or repulsive? (Use \(\mu_0 = 4\pi \times 10^{-7}\,\text{T·m/A}\))

STEPS:
- Step 1: Identify given quantities: \(I_1 = 250\,\text{A}\), \(I_2 = 180\,\text{A}\), \(d = 40\,\text{cm} = 0.40\,\text{m}\). Currents are parallel (same direction).
- Step 2: Write the formula for force per unit length: \(f = \frac{\mu_0 I_1 I_2}{2\pi d}\). Check units: \(\mu_0\) in T·m/A, \(I\) in A, \(d\) in m → T·m/A × A² / m = T·A = (N/(A·m))·A = N/m. Correct.
- Step 3: Substitute values: \(f = \frac{(4\pi \times 10^{-7}) \times 250 \times 180}{2\pi \times 0.40}\).
- Step 4: Simplify: Cancel \(\pi\): \(\frac{4 \times 10^{-7} \times 250 \times 180}{2 \times 0.40} = \frac{4 \times 10^{-7} \times 45000}{0.80} = \frac{1.8 \times 10^{-2}}{0.80} = 2.25 \times 10^{-2}\,\text{N/m}\).
- Step 5: Since currents are parallel, the force is attractive. The magnitude \(0.0225\,\text{N/m}\) is small but measurable; for a 1 km span, total force would be 22.5 N.

REASONING: The magnetic field of the first wire at the location of the second is perpendicular to the second wire. The Lorentz force on the second wire is \(I_2 L B_1\). Substituting \(B_1 = \frac{\mu_0 I_1}{2\pi d}\) gives the formula. The direction follows from the cross product: parallel currents attract.

ANSWER: \(2.25 \times 10^{-2}\,\text{N/m}\) attractive.

## WORKED_EXAMPLE_2
PROBLEM: In a current balance experiment, two parallel horizontal rods are 2.0 cm apart. The upper rod is fixed and carries a current of 5.0 A eastward. The lower rod is free to move vertically and carries a current of 3.0 A westward. The lower rod has a mass of 20 g and length 10 cm. Will the lower rod move up or down? Calculate its initial acceleration. (Ignore Earth's magnetic field, \(g = 9.8\,\text{m/s}^2\).)

STEPS:
- Step 1: Given: \(I_1 = 5.0\,\text{A}\) (east), \(I_2 = 3.0\,\text{A}\) (west) → antiparallel. \(d = 0.020\,\text{m}\). Lower rod: \(m = 0.020\,\text{kg}\), \(L = 0.10\,\text{m}\).
- Step 2: Force per unit length magnitude: \(f = \frac{\mu_0 I_1 I_2}{2\pi d} = \frac{4\pi \times 10^{-7} \times 5.0 \times 3.0}{2\pi \times 0.020} = \frac{60\pi \times 10^{-7}}{0.04\pi} = 1.5 \times 10^{-4}\,\text{N/m}\).
- Step 3: Force on lower rod of length \(L\): \(F = f L = (1.5 \times 10^{-4}) \times 0.10 = 1.5 \times 10^{-5}\,\text{N}\).
- Step 4: Direction: Currents are opposite → repulsive. The upper rod pushes the lower rod downward. So the magnetic force is downward.
- Step 5: Net force on lower rod: weight \(mg = 0.020 \times 9.8 = 0.196\,\text{N}\) downward, magnetic force \(1.5 \times 10^{-5}\,\text{N}\) downward. Total downward force \(F_{\text{net}} = 0.196015\,\text{N}\). Acceleration \(a = F_{\text{net}}/m = 0.196015 / 0.020 = 9.80075\,\text{m/s}^2\) downward.
- Step 6: The magnetic force is negligible compared to weight; the rod accelerates downward at essentially \(g\). (If the magnetic force were upward and larger than weight, it would move up.)

REASONING: The force between antiparallel currents is repulsive. The upper wire's field at the lower wire is into the page (right-hand rule). Current in lower wire is westward. Force \(I \vec{L} \times \vec{B}\): \(\vec{L}\) west, \(\vec{B}\) into page → force downward (right-hand rule). The magnetic force adds to gravity.

ANSWER: The lower rod moves downward with initial acceleration \(9.80\,\text{m/s}^2\) (essentially \(g\)); magnetic force is \(1.5 \times 10^{-5}\,\text{N}\) downward, negligible compared to weight.

## WORKED_EXAMPLE_3
PROBLEM: A long straight wire carries a current \(I_1 = 10\,\text{A}\). A rectangular loop of wire (dimensions 20 cm × 10 cm) lies in the same plane, with its near side parallel to the straight wire at a distance of 5.0 cm. The loop carries a current \(I_2 = 4.0\,\text{A}\) clockwise. Find the net magnetic force on the loop. (This combines force between parallel currents with force on non-parallel segments.)

STEPS:
- Step 1: Sketch: Straight wire vertical, current upward. Loop to its right, near side at \(d = 0.05\,\text{m}\), far side at \(d + 0.20 = 0.25\,\text{m}\). Loop current clockwise: near side current downward, far side current upward, top/bottom segments radial.
- Step 2: Forces on top and bottom segments: These are radial (pointing toward/away from straight wire). The magnetic field of the straight wire is circular (into/out of page). For radial current, \(\vec{L}\) is parallel/antiparallel to \(\vec{B}\)? Actually, field lines are circles around the straight wire. At the top segment, the field is perpendicular to the radial direction? Let's compute carefully: The straight wire's magnetic field circles around it. At any point, \(\vec{B}\) is tangential to the circle. The top and bottom segments of the loop are radial (along the radius). \(\vec{L}\) (radial) and \(\vec{B}\) (tangential) are perpendicular → force exists. But the forces on top and bottom are equal and opposite? Wait, the field strength varies with distance. However, the top and bottom segments are at different distances? Actually, the top segment is at a constant distance? No, the loop is rectangular: the near side is at distance \(d\), far side at \(d+a\) (where \(a=0.20\,\text{m}\)). The top and bottom segments are horizontal, connecting the near and far sides. They are not at constant distance; each point is at a different distance. But the net force on the loop can be found by considering the forces on the two vertical sides (parallel to the straight wire) because the forces on the horizontal sides cancel in the horizontal direction? Actually, the standard result: the net force on a rectangular loop near a straight wire is the difference of forces on the two parallel sides. The forces on the horizontal sides are equal and opposite and cancel? Let's derive: Force on near side (length \(b = 0.10\,\text{m}\), current downward, distance \(d\)): \(F_{\text{near}} = \frac{\mu_0 I_1 I_2 b}{2\pi d}\) direction? Wire 1 current up, wire 2 (near side) current down → antiparallel → repulsive → force on near side is away from straight wire (to the right).
- Step 3: Force on far side (length \(b\), current upward, distance \(d+a\)): currents parallel → attractive → force on far side is toward straight wire (to the left). Magnitude: \(F_{\text{far}} = \frac{\mu_0 I_1 I_2 b}{2\pi (d+a)}\).
- Step 4: Net horizontal force: \(F_{\text{net}} = F_{\text{near}} - F_{\text{far}}\) (taking right as positive). \(F_{\text{near}} = \frac{4\pi \times 10^{-7} \times 10 \times 4 \times 0.10}{2\pi \times 0.05} = \frac{16\pi \times 10^{-7}}{0.1\pi} = 1.6 \times 10^{-5}\,\text{N}\) (right). \(F_{\text{far}} = \frac{4\pi \times 10^{-7} \times 10 \times 4 \times 0.10}{2\pi \times 0.25} = \frac{16\pi \times 10^{-7}}{0.5\pi} = 3.2 \times 10^{-6}\,\text{N}\) (left). Net force = \(1.6 \times 10^{-5} - 3.2 \times 10^{-6} = 1.28 \times 10^{-5}\,\text{N}\) to the right (away from straight wire).
- Step 5: Forces on top and bottom segments: They are radial. The magnetic field is perpendicular to radial direction. The force on a small element is \(dF = I_2 B \, dl\) directed perpendicular to both. For the top segment, current flows left-to-right? Actually, clockwise loop: near side down, bottom segment left-to-right (away from straight wire), far side up, top segment right-to-left. The force on bottom segment: \(\vec{L}\) radially outward, \(\vec{B}\) into page (for straight wire current up, field is into page on the right side). \(\vec{L} \times \vec{B}\): outward × into page = upward. On top segment: \(\vec{L}\) radially inward, \(\vec{B}\) into page → inward × into page = downward. These forces are equal and opposite and cancel vertically. They also have no horizontal component. So net force is only horizontal from the two vertical sides.
- Step 6: Net force = \(1.28 \times 10^{-5}\,\text{N}\) away from the straight wire.

REASONING: The net force on a closed current loop in a non-uniform magnetic field can be found by integrating forces on each segment. For a rectangular loop with two sides parallel to a long straight wire, the forces on the parallel sides do not cancel because the field strength differs. The forces on the perpendicular sides cancel pairwise. This is a classic problem combining the force between parallel currents with the force on a current loop.

ANSWER: \(1.28 \times 10^{-5}\,\text{N}\) directed away from the straight wire (repulsive net force).

## COMPETENCY_QUESTION_1
QUESTION: A student sets up two parallel wires horizontally, 10 cm apart, each carrying 5 A in the same direction. She measures the force on a 20 cm length of one wire and obtains \(1.0 \times 10^{-5}\,\text{N}\). She claims this verifies the formula \(f = \frac{\mu_0 I_1 I_2}{2\pi d}\). Evaluate her claim. (Use \(\mu_0 = 4\pi \times 10^{-7}\,\text{T·m/A}\))

COMPETENCY: Interpreting physical situations using formulas and evaluating experimental consistency.

STEPS:
- Step 1: Calculate the theoretical force per unit length using the formula.
- Step 2: Calculate the theoretical force on a 20 cm length.
- Step 3: Compare with the measured value.
- Step 4: Identify possible reasons for any discrepancy (e.g., Earth's magnetic field, finite wire length, measurement error).

ANSWER: Theoretical \(f = \frac{4\pi \times 10^{-7} \times 5 \times 5}{2\pi \times 0.10} = \frac{100\pi \times 10^{-7}}{0.2\pi} = 5.0 \times 10^{-5}\,\text{N/m}\). For \(L = 0.20\,\text{m}\), \(F = 1.0 \times 10^{-5}\,\text{N}\). The measured value matches exactly. However, in a real experiment, Earth's magnetic field (approx \(3 \times 10^{-5}\,\text{T}\)) would exert an additional force \(F_{\text{earth}} = I L B_{\text{earth}} = 5 \times 0.20 \times 3 \times 10^{-5} = 3 \times 10^{-5}\,\text{N}\), which is larger than the measured force. The student's claim is suspicious because she did not account for Earth's field. The perfect match suggests either the experiment was done in a shielded environment or the measurement is fabricated.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two long parallel wires are connected in series to a battery, so they carry the same current \(I\). They are separated by distance \(d\) and each has length \(L\). The wires are suspended by strings so they can swing freely. When the current is turned on, the wires repel each other and each string makes an angle \(\theta\) with the vertical. Derive an expression for the current \(I\) in terms of \(m\) (mass per unit length of each wire), \(d\), \(L\), \(\theta\), and \(g\). Assume the wires are light and the strings are attached at the ends of the wires.

COMPETENCY: Predicting outcomes from changing variables and applying Newton's laws to a magnetic force problem.

STEPS:
- Step 1: Draw free-body diagram for one wire: tension \(T\) along string, weight \(mgL\) downward, magnetic force \(F_m\) horizontal (repulsive).
- Step 2: Resolve forces: \(T \cos\theta = mgL\), \(T \sin\theta = F_m\).
- Step 3: Express magnetic force: \(F_m = \frac{\mu_0 I^2 L}{2\pi d}\) (since currents are same direction? Wait, series connection: current flows same direction in both wires? If they are connected in series, the current flows in the same direction along both wires? Actually, if they are connected in series, the current enters one wire, goes to the other, and returns? The problem says "connected in series to a battery, so they carry the same current I." It doesn't specify if they are parallel or antiparallel. But it says "the wires repel each other", so currents must be antiparallel. In a series circuit, if the wires are placed parallel but the current flows in opposite directions (e.g., one wire goes out, the other returns), then they repel. We'll assume antiparallel.)
- Step 4: From force balance: \(\tan\theta = \frac{F_m}{mgL} = \frac{\mu_0 I^2 L}{2\pi d \cdot mgL} = \frac{\mu_0 I^2}{2\pi d m g}\).
- Step 5: Solve for \(I\): \(I = \sqrt{\frac{2\pi d m g \tan\theta}{\mu_0}}\).

ANSWER: \(I = \sqrt{\frac{2\pi d m g \tan\theta}{\mu_0}}\). The derivation assumes the wires are long enough that the force formula for infinite wires applies, and the strings are vertical when no current flows. The angle \(\theta\) increases with current, providing a way to measure current mechanically.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The force between two parallel current-carrying ______ is the magnetic force per unit length that each conductor exerts on the other due to their magnetic fields.

## DIAGNOSTIC_ANSWER_7
conductors

The conductors are the pair in question: two wires, two currents, one mutual force per unit length. **A wrong answer (fields) reveals the student has asked the fields to feel forces when only the current-carrying wires do.** The conductors are the pair in question: two wires, two currents, one mutual force per unit length.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe two ______ power lines on a street pole: when heavy current flows, they sometimes vibrate or move slightly toward each other.

## DIAGNOSTIC_ANSWER_8
parallel

The parallel word is the lines' geometry: side by side on the pole, close enough for the field of one to grip the other. **A wrong answer (crossed) reveals the student has crossed the lines and changed the angle the sine factor needs.** The parallel word is the lines' geometry: side by side on the pole, close enough for the field of one to grip the other.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can (1) calculate the magnitude and direction of the force per unit length between two parallel currents given their magnitudes, directions, and separation, (2) derive the expression starting from the magnetic field of a straight wire and the Lorentz force on a current element, and (3) explain how this force is used to define.
