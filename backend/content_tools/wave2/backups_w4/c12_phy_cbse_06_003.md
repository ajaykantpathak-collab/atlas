## ELI5
A bicycle dynamo lights its bulb on pure motion: a rod sweeping through a magnetic field drags its free electrons sideways, piling charge at the ends until the built-in electric field balances the magnetic push. That平衡 voltage - B l v for mutually perpendicular rod, motion and field - is motional emf, derivable equally as flux-cutting rate or as Lorentz force per charge. It is emf whose parent is magnetic force, not a changing field.

## DEFINITION
Motional EMF is the electromotive force induced across the ends of a conductor moving through a magnetic field due to the magnetic component of the Lorentz force acting on free charge carriers. For a straight rod of length \( l \) moving with velocity \( \vec{v} \) perpendicular to a uniform magnetic field \( \vec{B} \), with the rod oriented perpendicular to both \( \vec{v} \) and \( \vec{B} \), the magnitude is \( \mathcal{E} = B l v \). SI unit: volt (V). It is a non-electrostatic EMF arising from magnetic work done per unit charge.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can derive motional EMF using both the flux-cutting approach (Faraday's law) and the Lorentz force approach, calculate the EMF for rods in translational and rotational motion, determine the polarity of the induced EMF using Fleming's right-hand rule or Lenz's law, and solve problems involving motional EMF in closed circuits with resistive loads.

## SCOPE_BOUNDARY
Covers motional EMF for straight conductors moving in uniform, time-independent magnetic fields, including sliding rods on rails, falling rods, and rotating rods. Does NOT cover induced EMF from time-varying magnetic fields (transformer EMF), AC generator theory (node c12_phy_cbse_06_005), or self-inductance effects (node c12_phy_cbse_06_004).

## WALKTHROUGH
Observe a bicycle dynamo: when the wheel spins, a small roller touches the tire and a voltage lights the bulb — no battery, just motion in a magnetic field. This is motional EMF. Start by recalling the magnetic force on a moving charge from Class 11 (\( \vec{F} = q \vec{v} \times \vec{B} \)). In a metal rod moving through a magnetic field, free electrons experience this force, accumulating at one end and creating an internal electric field. At equilibrium, \( qE = qvB \), giving a potential difference \( \mathcal{E} = Blv \). Alternatively, view the rod as completing a changing-area loop; the rate of flux change \( d\Phi/dt = B l v \) gives the same result via Faraday's law. Both derivations must be shown step-by-step. End with the key formula \( \mathcal{E} = B l v \) and the condition that \( \vec{v}, \vec{B}, \vec{l} \) are mutually perpendicular.

Takeaway first: motional emf is the Lorentz force's collection agency - electrons shoved to one end until equilibrium sets E equal v B - and Faraday's flux-cutting view delivers the same B l v. Exam moves: dual-derivation questions, polarity questions by Fleming's right-hand rule, computation questions for translating and rotating rods, and circuit questions with resistive loads. Method: rerun the dynamo - force on electrons, charge pile-up, equilibrium field, the product B l v read off. Check yourself: the flagged confusion separates origins - motional emf comes from magnetic force on carriers, transformer emf from an induced electric field; same symbol, different parents. Drill: derive B l v both ways and find the polarity for one stated geometry.

## DIAGNOSTIC_QUESTION_1
State the formula for motional EMF induced across a straight rod of length \( l \) moving with velocity \( v \) perpendicular to a uniform magnetic field \( B \). Give the SI unit of each quantity and the unit of the resulting EMF.

## DIAGNOSTIC_ANSWER_1
\( \mathcal{E} = B l v \). Units: \( B \) in tesla (T), \( l \) in metre (m), \( v \) in metre per second (m/s), \( \mathcal{E} \) in volt (V). A wrong answer (e.g., \( \mathcal{E} = B/lv \) or missing \( l \)) reveals confusion between magnetic flux (\( BA \)) and flux rate of change, or forgetting that EMF requires a length dimension.

## DIAGNOSTIC_QUESTION_2
A horizontal rod of length 1.0 m moves horizontally at 5 m/s in a region where Earth's magnetic field has a horizontal component of 0.3 G and a vertical component of 0.4 G. The rod is oriented east-west and moves northward. Which component of Earth's field produces a motional EMF across the rod? Explain why the other component does not contribute.

## DIAGNOSTIC_ANSWER_2
The vertical component (0.4 G) produces the EMF. The rod moves north, its length is east-west, so \( \vec{v} \) (north) and \( \vec{l} \) (east) are horizontal. The vertical \( \vec{B} \) is perpendicular to both, satisfying \( \vec{v} \perp \vec{B} \) and \( \vec{l} \perp \vec{v}, \vec{B} \). The horizontal component is parallel to the plane of motion (either along \( \vec{v} \) or \( \vec{l} \)), so \( \vec{v} \times \vec{B} \) has no component along the rod. Choosing the horizontal component reveals misunderstanding of the vector triple product condition \( \vec{l} \cdot (\vec{v} \times \vec{B}) \neq 0 \).

## DIAGNOSTIC_QUESTION_3
A metal rod of length 0.8 m rotates in a horizontal plane about one end with an angular speed of 12 rad/s. A uniform vertical magnetic field of 0.5 T exists. Calculate the motional EMF induced between the fixed end and the free end of the rod.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify given: \( l = 0.8 \, \text{m} \), \( \omega = 12 \, \text{rad/s} \), \( B = 0.5 \, \text{T} \) (vertical). Rod rotates horizontally → each element \( dr \) at radius \( r \) has speed \( v = \omega r \) perpendicular to \( B \).  
**Step 2:** EMF of element: \( d\mathcal{E} = B v \, dr = B \omega r \, dr \).  
**Step 3:** Integrate from 0 to \( l \): \( \mathcal{E} = \int_0^l B \omega r \, dr = B \omega \frac{l^2}{2} \).  
**Step 4:** Substitute: \( \mathcal{E} = 0.5 \times 12 \times \frac{(0.8)^2}{2} = 6 \times 0.32 = 1.92 \, \text{V} \).  
**Step 5:** Unit check: \( \text{T} \cdot \text{rad/s} \cdot \text{m}^2 = \frac{\text{N}}{\text{A·m}} \cdot \frac{1}{\text{s}} \cdot \text{m}^2 = \frac{\text{N·m}}{\text{A·s}} = \text{V} \). Correct.  
A wrong answer (e.g., using \( \mathcal{E} = B l v_{\text{tip}} = B l (\omega l) = B \omega l^2 \)) reveals failure to integrate over the varying linear velocity along the rod.

## DIAGNOSTIC_QUESTION_4
Two identical rods of length \( l \) move with the same speed \( v \) in the same uniform magnetic field \( B \). Rod A moves perpendicular to \( B \) with its length also perpendicular to both \( v \) and \( B \). Rod B moves at 45° to \( B \), but its length is adjusted to be perpendicular to both \( v \) and \( B \). Compare the motional EMF induced across the two rods.

## DIAGNOSTIC_ANSWER_4
Rod A: \( \mathcal{E}_A = B l v \) (since \( \theta = 90^\circ \) between \( v \) and \( B \)).  
Rod B: Angle between \( v \) and \( B \) is 45°, so the effective perpendicular component of \( v \) is \( v \sin 45^\circ \). The rod length is still perpendicular to both, so \( \mathcal{E}_B = B l (v \sin 45^\circ) = \frac{B l v}{\sqrt{2}} \).  
Thus \( \mathcal{E}_B = \mathcal{E}_A / \sqrt{2} \).  
A wrong answer claiming they are equal reveals the misconception that only the rod's orientation matters, not the angle between \( \vec{v} \) and \( \vec{B} \). The formula \( \mathcal{E} = B l v \) strictly requires \( \vec{v} \perp \vec{B} \); the general form is \( \mathcal{E} = B l v_\perp \) where \( v_\perp \) is the component of velocity perpendicular to \( B \).

## DIAGNOSTIC_QUESTION_5
A student argues: "Motional EMF only exists if the rod is part of a closed circuit, because EMF is defined as the work done per unit charge around a closed loop." Evaluate this statement and correct it using the concept of charge separation in an open rod.

## DIAGNOSTIC_ANSWER_5
The statement is **false**. Motional EMF exists across an open rod due to magnetic force separating charges until the internal electric field balances it (\( qE = qvB \)). The potential difference \( V = \int \vec{E} \cdot d\vec{l} = Blv \) is measurable with a high-impedance voltmeter. EMF is defined as \( \oint \vec{E}_{\text{non-electrostatic}} \cdot d\vec{l} \); for an open rod, the integral along the rod gives the same value. A closed circuit is needed for *sustained current*, not for the EMF itself. The student's error confuses the *definition* of EMF (non-electrostatic work per charge) with the *condition for current flow*.

## DIAGNOSTIC_QUESTION_6
Design a simple classroom demonstration of motional EMF using only a strong neodymium magnet, a 30 cm aluminium ruler, a sensitive galvanometer (or a phone with a magnetic sensor app), and connecting wires. Describe the procedure, the expected observation, and how you would verify the \( \mathcal{E} \propto v \) relationship.

## DIAGNOSTIC_ANSWER_6
**Procedure:** Connect the ruler's ends to the galvanometer via wires. Hold the magnet vertically. Sweep the ruler horizontally through the magnetic field near the magnet's pole, keeping the ruler perpendicular to both motion and field. Vary the sweep speed.  
**Observation:** Galvanometer deflects during motion; direction reverses if motion reverses. Faster sweep → larger deflection.  
**Verification:** Use a phone's accelerometer to measure peak speed \( v \), or use a ramp to give reproducible speeds. Plot galvanometer deflection (proportional to current \( I = \mathcal{E}/R \)) vs \( v \); straight line through origin confirms \( \mathcal{E} \propto v \).  
A poor answer (e.g., rotating the magnet near a stationary ruler) tests transformer EMF, not motional EMF, showing confusion between the two mechanisms.

## COMMON_MISCONCEPTION
**Misconception:** "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just Faraday's law."  
**Why it's wrong:** They have different physical origins. Motional EMF arises from the magnetic Lorentz force \( q\vec{v} \times \vec{B} \) doing work on charges in a *moving* conductor in a *static* field. Transformer EMF arises from an induced non-conservative electric field \( \vec{E} = -\partial \vec{B}/\partial t \) acting on *stationary* charges. In motional EMF, the field is static in the lab frame; in transformer EMF, the field changes with time. Students who conflate them cannot explain why a rod moving parallel to a static field produces no EMF, or why a stationary loop in a changing field does. This leads to errors in JEE problems where both effects coexist (e.g., a moving loop in a time-varying field).

## ON_FAILURE
If the student conflates motional and transformer EMF:  
1. Revisit Class 11 node **c11_phy_cbse_04_008** (Lorentz force) and perform the "rod on rails" thought experiment: rod moves, electrons feel \( q\vec{v} \times \vec{B} \), pile up, create \( \vec{E}_{\text{int}} \). No changing \( B \) anywhere.  
2. Contrast with Class 12 node **c12_phy_cbse_06_001** (Faraday's law) where a *stationary* loop experiences induced \( \vec{E} \) from \( \partial \vec{B}/\partial t \).  
3. Do a diagnostic: "A square loop moves with constant velocity into a region of *uniform, constant* B-field. Is there an induced EMF? Is there an induced electric field?" Answer: Yes EMF (motional), No induced \( \vec{E} \) (since \( \partial \vec{B}/\partial t = 0 \)). This sharpens the distinction.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_06_001, c12_phy_cbse_06_002, c11_phy_cbse_04_008, c11_phy_cbse_03_008, c11_phy_cbse_02_003, c12_phy_cbse_06_004

## PREREQUISITE_REASONS
c12_phy_cbse_06_001: Faraday's law provides the flux-rate-of-change derivation of motional EMF (\( \mathcal{E} = -d\Phi/dt \)).  
c12_phy_cbse_06_002: Lenz's law determines the polarity of the induced EMF/current in the moving rod.  
c11_phy_cbse_04_008: Lorentz force \( \vec{F} = q(\vec{v} \times \vec{B}) \) is the microscopic mechanism for charge separation in the rod.  
c11_phy_cbse_03_008: Cross product \( \vec{v} \times \vec{B} \) gives the direction of magnetic force on electrons.  
c11_phy_cbse_02_003: Instantaneous velocity vector is needed for the direction of motion in the formula \( \mathcal{E} = \int (\vec{v} \times \vec{B}) \cdot d\vec{l} \).
c12_phy_cbse_06_004: (transformer EMF), AC generator theory (node c12_phy_cbse_06_005), or self-inductance effects (node c12_phy_cbse_06_004).  

## FORWARD_NODE_IDS
c12_phy_cbse_06_005, c12_phy_cbse_06_007

## FORWARD_REASONS
c12_phy_cbse_06_005: AC generator operates on motional EMF induced in rotating coil sides; each side acts as a moving rod.  
c12_phy_cbse_06_007: Eddy currents are motional EMFs induced in bulk conductors moving through magnetic fields (or in changing fields, but the motional aspect is foundational).

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_10_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: The flux derivative \( d\Phi/dt \) in Faraday's law is a first-principle derivative; the motional EMF derivation \( \mathcal{E} = d(Blx)/dt = Blv \) uses the same calculus concept.  
c11_math_cbse_10_006: The slope of a magnetic flux vs. time graph (\( \Phi = Blx \), \( x = vt \)) gives the constant EMF; coordinate geometry visualizes the linear relationship.

## CHAIN_DESCRIPTION
c12_phy_cbse_06_001 -> c12_phy_cbse_06_003 -> c12_phy_cbse_06_005

## THIS_FORMULA
\( \mathcal{E} = B l v \sin\theta \) (V) where \( \theta \) is the angle between \( \vec{v} \) and \( \vec{B} \), and the rod length \( \vec{l} \) is perpendicular to both \( \vec{v} \) and \( \vec{B} \). For the standard perpendicular case: \( \mathcal{E} = B l v \).

## FORMULA_VARIABLES
\( \mathcal{E} \) = motional EMF (V), \( B \) = magnetic field magnitude (T), \( l \) = length of conductor (m), \( v \) = speed of conductor (m/s), \( \theta \) = angle between \( \vec{v} \) and \( \vec{B} \) (rad or °)

## FORMULA_UNITS
V, T, m, m/s, rad (or °)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_008 | Derivative \( d\Phi/dt \) links flux change to EMF; calculus is essential for deriving \( \mathcal{E} = Blv \) from \( \Phi = Blx \).
c11_math_cbse_10_006 | Slope of \( \Phi \)-\( t \) graph (\( \Phi = Blvt \)) equals \( Blv \); coordinate geometry provides visual intuition for constant EMF.
## PREREQ_CONCEPT
Magnetic force on a moving charge (Lorentz force) and magnetic flux (\( \Phi = \vec{B} \cdot \vec{A} \)).

## PREREQ_BEFORE
Student must compute \( \vec{F} = q \vec{v} \times \vec{B} \) for a charge in a magnetic field and calculate magnetic flux through a planar area.

## PREREQ_STUCK
Revisit Lorentz force (c11_phy_cbse_04_008) and flux definition (c12_phy_cbse_06_001).

## WORKED_EXAMPLE_1
**PROBLEM:** A horizontal copper rod of length 1.5 m is dropped from rest from a height of 10 m in Delhi, where the vertical component of Earth's magnetic field is \( 0.4 \times 10^{-4} \, \text{T} \) and the horizontal component is \( 0.3 \times 10^{-4} \, \text{T} \). The rod is oriented east-west and falls vertically. Calculate the motional EMF induced across the rod just before it hits the ground. Take \( g = 9.8 \, \text{m/s}^2 \).

**STEPS:**
1. **Identify given quantities and what to find:**  
   \( l = 1.5 \, \text{m} \), \( h = 10 \, \text{m} \), \( u = 0 \), \( g = 9.8 \, \text{m/s}^2 \).  
   \( B_{\text{vertical}} = 0.4 \times 10^{-4} \, \text{T} \), \( B_{\text{horizontal}} = 0.3 \times 10^{-4} \, \text{T} \).  
   Rod falls vertically (\( \vec{v} \) downward), oriented east-west (\( \vec{l} \) horizontal).  
   Find \( \mathcal{E} \) just before impact.

2. **Determine which B-component contributes:**  
   Motional EMF requires \( \vec{l} \cdot (\vec{v} \times \vec{B}) \neq 0 \).  
   \( \vec{v} \) is vertical. \( \vec{l} \) is horizontal (east-west).  
   \( \vec{v} \times \vec{B}_{\text{vertical}} \): vertical × vertical = 0 → no EMF.  
   \( \vec{v} \times \vec{B}_{\text{horizontal}} \): vertical × horizontal = horizontal, perpendicular to both. If \( \vec{B}_{\text{horizontal}} \) is north-south, then \( \vec{v} \times \vec{B}_{\text{horizontal}} \) is east-west, parallel to \( \vec{l} \). **This component produces EMF.**  
   Use \( B = B_{\text{horizontal}} = 0.3 \times 10^{-4} \, \text{T} \).

3. **Find velocity just before impact:**  
   \( v^2 = u^2 + 2gh = 0 + 2 \times 9.8 \times 10 = 196 \)  
   \( v = \sqrt{196} = 14 \, \text{m/s} \).

4. **Compute motional EMF:**  
   \( \mathcal{E} = B l v = (0.3 \times 10^{-4}) \times 1.5 \times 14 \)  
   \( = 0.3 \times 1.5 \times 14 \times 10^{-4} \)  
   \( = 6.3 \times 10^{-4} \, \text{V} = 0.63 \, \text{mV} \).

5. **Unit verification:**  
   \( \text{T} \cdot \text{m} \cdot \text{m/s} = \frac{\text{N}}{\text{A·m}} \cdot \text{m}^2/\text{s} = \frac{\text{N·m}}{\text{A·s}} = \frac{\text{J}}{\text{C}} = \text{V} \). ✓

**REASONING:** Only the horizontal component of Earth's field is perpendicular to the vertical velocity. The rod's east-west orientation aligns with the \( \vec{v} \times \vec{B}_{\text{horizontal}} \) direction (assuming \( B_{\text{horizontal}} \) is north-south). The falling rod gains speed linearly with time; we use kinematics to find the final speed.

**ANSWER:** \( 6.3 \times 10^{-4} \, \text{V} \) (or 0.63 mV)

## WORKED_EXAMPLE_2
**PROBLEM:** A metal rod of length 0.6 m rotates in a horizontal plane about a vertical axis through one end with an angular speed of 20 rad/s. A uniform magnetic field of 0.8 T is directed vertically upward. Find the potential difference between the two ends of the rod. Which end is at higher potential?

**STEPS:**
1. **Given:** \( l = 0.6 \, \text{m} \), \( \omega = 20 \, \text{rad/s} \), \( B = 0.8 \, \text{T} \) (vertical up). Rod rotates horizontally.
2. **Choose method:** Integration of motional EMF for each element \( dr \) at distance \( r \) from pivot.  
   Speed of element: \( v = \omega r \) (tangential, horizontal).  
   \( \vec{v} \perp \vec{B} \) (horizontal vs vertical). Rod is radial, so \( \vec{l} \) (along rod) is perpendicular to \( \vec{v} \) (tangential).  
   All three mutually perpendicular → \( d\mathcal{E} = B v \, dr = B \omega r \, dr \).
3. **Integrate from pivot (0) to free end (l):**  
   \( \mathcal{E} = \int_0^l B \omega r \, dr = B \omega \frac{l^2}{2} \).
4. **Substitute values:**  
   \( \mathcal{E} = 0.8 \times 20 \times \frac{(0.6)^2}{2} = 16 \times 0.18 = 2.88 \, \text{V} \).
5. **Determine polarity (higher potential end):**  
   Free electrons experience \( \vec{F} = -e (\vec{v} \times \vec{B}) \).  
   \( \vec{v} \) is tangential (say, counterclockwise when viewed from top). \( \vec{B} \) is up.  
   \( \vec{v} \times \vec{B} \) is radially outward. Force on electrons is radially inward (toward pivot).  
   Electrons accumulate at the pivot end → pivot becomes negative, free end becomes positive.  
   **Free end is at higher potential.**
6. **Unit check:** \( \text{T} \cdot \text{rad/s} \cdot \text{m}^2 = \text{V} \). ✓

**REASONING:** For a rotating rod, each element moves at a different linear speed \( v = \omega r \). The motional EMF is the sum (integral) of the EMFs generated in each element. The polarity is found by applying the Lorentz force on negative charges (electrons); conventional current would be opposite.

**ANSWER:** Potential difference = 2.88 V; the free end (outer end) is at higher potential.

## WORKED_EXAMPLE_3
**PROBLEM:** A rectangular loop PQRS of width \( l = 0.2 \, \text{m} \) and resistance \( R = 5 \, \Omega \) is pulled at constant velocity \( v = 0.1 \, \text{m/s} \) out of a region of uniform magnetic field \( B = 0.5 \, \text{T} \) directed into the page. The loop's plane is perpendicular to B. At the instant shown, the loop is halfway out (half the area still in the field). (a) Find the induced current magnitude and direction. (b) Find the magnetic force on the loop. (c) Find the external force required to pull the loop at constant velocity. (d) Find the rate of Joule heating in the loop. Verify energy conservation.

**STEPS:**
1. **Analyze geometry and flux change:**  
   The side PQ (length \( l = 0.2 \, \text{m} \)) is the one cutting field lines as the loop exits. It moves perpendicular to B with speed \( v \).  
   Area inside field decreases at rate \( dA/dt = -l v \) (negative because area decreases).  
   Flux \( \Phi = B A \) (into page). \( d\Phi/dt = -B l v \) (into page decreasing).
2. **(a) Induced EMF and current:**  
   \( \mathcal{E} = \left| \frac{d\Phi}{dt} \right| = B l v = 0.5 \times 0.2 \times 0.1 = 0.01 \, \text{V} \).  
   Current \( I = \mathcal{E}/R = 0.01 / 5 = 0.002 \, \text{A} = 2 \, \text{mA} \).  
   **Direction:** Flux into page is decreasing. Induced current must produce flux into page to oppose the decrease (Lenz's law). By right-hand rule, current flows **clockwise** (P→Q→R→S→P).
3. **(b) Magnetic force on the loop:**  
   Only side PQ carries current perpendicular to B. Force on PQ: \( F = B I l \) (direction by \( \vec{F} = I \vec{l} \times \vec{B} \)).  
   Current in PQ is from P to Q (clockwise). \( \vec{l} \) from P to Q (to the right, say). \( \vec{B} \) into page. \( \vec{l} \times \vec{B} \) is upward? Wait: if loop is being pulled to the right out of the field, PQ is the left vertical side moving right. Let's set coordinates: B into page (-z), v to the right (+x), PQ vertical along +y. Current I in PQ is +y (clockwise). \( \vec{F} = I (\vec{l} \times \vec{B}) = I (l \hat{y}) \times (-B \hat{z}) = -I l B \hat{x} \) (to the left).  
   Magnitude: \( F = B I l = 0.5 \times 0.002 \times 0.2 = 2 \times 10^{-4} \, \text{N} \). Direction: **opposite to velocity (to the left)**.
4. **(c) External force for constant velocity:**  
   Net force must be zero. \( F_{\text{ext}} + F_{\text{mag}} = 0 \) → \( F_{\text{ext}} = -F_{\text{mag}} = 2 \times 10^{-4} \, \text{N} \) **to the right**.
5. **(d) Joule heating rate and energy check:**  
   \( P_{\text{Joule}} = I^2 R = (0.002)^2 \times 5 = 2 \times 10^{-5} \, \text{W} \).  
   Mechanical power input: \( P_{\text{mech}} = F_{\text{ext}} v = (2 \times 10^{-4}) \times 0.1 = 2 \times 10^{-5} \, \text{W} \).  
   \( P_{\text{mech}} = P_{\text{Joule}} \). **Energy conserved.**
6. **Unit checks:**  
   \( B I l \): T·A·m = (N/A·m)·A·m = N. ✓  
   \( I^2 R \): A²·Ω = A²·V/A = V·A = W. ✓  
   \( F v \): N·m/s = W. ✓

**REASONING:** This problem combines motional EMF (flux cutting), Ohm's law, magnetic force on a current-carrying wire, Newton's first law (constant velocity), and energy conservation. The external force does work against the magnetic force, and that work is dissipated as heat in the resistor. The magnetic force opposes the motion (Lenz's law in action).

**ANSWER:**  
(a) \( I = 2 \, \text{mA} \), clockwise.  
(b) \( F_{\text{mag}} = 2 \times 10^{-4} \, \text{N} \) opposite to velocity.  
(c) \( F_{\text{ext}} = 2 \times 10^{-4} \, \text{N} \) in direction of velocity.  
(d) \( P_{\text{Joule}} = 2 \times 10^{-5} \, \text{W} \); equals mechanical power input.

## COMPETENCY_QUESTION_1
**QUESTION:** A conducting rod of length \( l = 0.5 \, \text{m} \) slides on two parallel, frictionless rails connected at one end by a resistor \( R = 2 \, \Omega \). The system lies in a horizontal plane. A uniform vertical magnetic field \( B = 0.4 \, \text{T} \) exists. The rod is given an initial velocity \( v_0 = 10 \, \text{m/s} \) perpendicular to the rails.  
(a) Derive an expression for the velocity \( v(t) \) of the rod as a function of time.  
(b) Calculate the total distance the rod travels before coming to rest.  
(c) Show that the initial kinetic energy of the rod equals the total energy dissipated in the resistor.

**COMPETENCY:** Formulating and solving a differential equation for a motional EMF system, applying Newton's second law, Lenz's law, and energy conservation.

**STEPS:**
1. **Induced EMF and current:** At any instant, rod speed \( v \). EMF \( \mathcal{E} = B l v \). Current \( I = \mathcal{E}/R = \frac{B l v}{R} \). Direction: Lenz's law → current creates force opposing motion.
2. **Magnetic force on rod:** \( F = B I l = \frac{B^2 l^2}{R} v \), direction opposite to velocity.
3. **Newton's second law:** \( m \frac{dv}{dt} = -\frac{B^2 l^2}{R} v \).
4. **Solve differential equation:** Separate variables: \( \frac{dv}{v} = -\frac{B^2 l^2}{m R} dt \). Integrate: \( \ln v = -\frac{B^2 l^2}{m R} t + C \). With \( v(0) = v_0 \), \( v(t) = v_0 \exp\left(-\frac{B^2 l^2}{m R} t\right) \).
5. **Total distance:** \( x = \int_0^\infty v(t) dt = v_0 \frac{m R}{B^2 l^2} \).
6. **Energy verification:** Initial KE = \( \frac{1}{2} m v_0^2 \). Power dissipated: \( P = I^2 R = \frac{B^2 l^2 v^2}{R} \). Total energy dissipated: \( \int_0^\infty P dt = \frac{B^2 l^2}{R} \int_0^\infty v_0^2 e^{-2(B^2 l^2/(mR))t} dt = \frac{B^2 l^2}{R} v_0^2 \frac{m R}{2 B^2 l^2} = \frac{1}{2} m v_0^2 \). Matches initial KE.

**ANSWER:**  
(a) \( v(t) = v_0 \exp\left(-\frac{B^2 l^2}{m R} t\right) \)  
(b) \( x_{\text{total}} = \frac{m R v_0}{B^2 l^2} \)  
(c) Both equal \( \frac{1}{2} m v_0^2 \); energy conserved.

**DIFFICULTY:** hard

## COMPETENCY_QUESTION_2
**QUESTION:** In a physics lab, a student sets up a "magnetic brake" demonstration: a copper plate pendulum swings through the gap of a strong horseshoe magnet. When the magnet is off, the pendulum swings many times. When the magnet is on, the pendulum stops almost immediately after entering the field region.  
(a) Explain the physics using motional EMF and eddy currents.  
(b) If the copper plate is replaced by a copper plate with narrow vertical slots cut into it (like a comb), the braking effect is drastically reduced. Explain why, referencing the path of eddy currents.  
(c) If the pendulum is made to swing faster (larger amplitude), does the braking force at the bottom of the swing increase, decrease, or stay the same? Justify.

**COMPETENCY:** Applying motional EMF concepts to eddy current braking, analyzing geometry's effect on current paths, and relating speed to braking force.

**STEPS:**
1. **Physics of braking (no slots):** As the plate enters the magnetic field, different parts of the plate have different velocities (top moves faster than bottom near pivot). This creates motional EMFs across the plate width. Since the plate is a continuous conductor, large eddy currents flow in closed loops within the plate. These currents experience magnetic forces (\( \vec{F} = I \vec{l} \times \vec{B} \)) opposing the motion (Lenz's law). Kinetic energy is converted to Joule heat in the plate.
2. **Effect of slots:** Vertical slots interrupt the horizontal current paths needed for large eddy current loops. The slots force currents into smaller loops, increasing resistance and reducing current magnitude. Magnetic braking force \( F \propto I \) is drastically reduced. This is why transformer laminations are insulated — to suppress eddy currents.
3. **Speed dependence:** Motional EMF \( \mathcal{E} \propto v \). Eddy current \( I \propto \mathcal{E} \propto v \). Magnetic force \( F \propto I \propto v \). At the bottom of the swing, speed is maximum → braking force is maximum. If amplitude increases, maximum speed increases → braking force at bottom increases.

**ANSWER:**  
(a) Motion in B-field → motional EMF across plate width → eddy currents → magnetic force opposes motion (Lenz's law) → kinetic energy → heat.  
(b) Slots break up large eddy current loops into smaller ones, increasing effective resistance and reducing current, thus reducing braking force.  
(c) Braking force increases with speed (\( F \propto v \)); larger amplitude gives higher maximum speed, so larger braking force at the bottom.

**DIFFICULTY:** medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Motional EMF is the ______ force induced across the ends of a conductor moving through a magnetic field due to the magnetic component of the Lorentz force acting on free charge carriers.

## DIAGNOSTIC_ANSWER_7
electromotive

The electromotive force is the induced quantity: charge separated along the moving rod until its field says stop. **A wrong answer (magnetic) reveals the student has named the cause where the definition names the voltage it produces.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a bicycle dynamo: when the wheel spins, a small roller touches the tire and a voltage lights the bulb — no battery, just motion in a ______ field.

## DIAGNOSTIC_ANSWER_8
magnetic

The magnetic word is the dynamo's fuel: no battery, just a field crossed by motion. **A wrong answer (an electric) reveals the student has powered the dynamo from the grid it exists to replace.** The magnetic word is the dynamo's fuel: motion through the field, no battery anywhere in the circuit.

## DIAGNOSTIC_QUESTION_9
What is Motional EMF? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Motional EMF is the electromotive force induced across the ends of a conductor moving through a magnetic field due to the magnetic component of the Lorentz force acting on free charge carriers.

The definition names the induction's species: motional emf, born of motion rather than of a field that changes in place. **A wrong answer that describes transformer emf reveals the student has answered for the stationary cousin the lesson explicitly distinguishes.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Motional EMF?

## DIAGNOSTIC_ANSWER_10
Misconception: "Motional EMF and induced EMF from a time-varying magnetic field are the same thing; both are just Faraday's law." Why it's wrong: They have different physical origins.

The flagged confusion is parentage, not formula: the two emfs wear the same symbol yet arise from different forces - magnetic shove versus induced electric field. **A wrong answer merging them reveals the student has judged emfs by their size while the lesson judges them by their birth.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
Student can derive motional EMF using both the flux-cutting approach (Faraday's law) and the Lorentz force approach, calculate the EMF for rods in translational and rotational motion, determine the polarity of the induced EMF using Fleming's right-hand rule or Lenz's law, and solve problems involving motional EMF in closed circuits with.
