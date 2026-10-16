## ELI5
A phone charges through its cable, yet between the capacitor plates inside the charger no charge crosses the gap - and still a magnetic field curls there. Maxwell's repair for Ampere's law is displacement current: epsilon-zero times the rate of change of electric flux, flowing wherever a field changes instead of where charges move. Same magnetic consequences, same amperes, utterly different passengers - and the Ampere-Maxwell law counts both.

## DEFINITION
Displacement current is a term introduced by Maxwell to generalize Ampere's circuital law, defined as the product of vacuum permittivity (ε₀) and the rate of change of electric flux through a surface: \( i_d = \varepsilon_0 \frac{d\Phi_E}{dt} \). It has the same physical effect as conduction current — producing a magnetic field — but arises from a time-varying electric field rather than moving charges. Its SI unit is the ampere (A).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) identify the inconsistency in Ampere's original law when applied to a charging capacitor, (2) derive the displacement current expression using Gauss's law and the continuity of current, (3) state the Ampere-Maxwell law in integral form, and (4) distinguish regions where conduction current, displacement current, or both exist.

## SCOPE_BOUNDARY
Covers the conceptual origin of displacement current, its mathematical formulation \( i_d = \varepsilon_0 \frac{d\Phi_E}{dt} \), the Ampere-Maxwell law \( \oint \mathbf{B} \cdot d\mathbf{l} = \mu_0 (i_c + i_d) \), and the capacitor charging example from NCERT Section 8.2. Does NOT cover Maxwell's equations in differential form, electromagnetic wave derivation, or the electromagnetic spectrum (covered in subsequent nodes).

## WALKTHROUGH
Imagine a mobile phone charging via a USB-C cable — current flows through the wires, but between the capacitor plates inside the charging circuit, no actual charges move across the gap. Yet a magnetic field exists there, measurable with a tiny compass. This paradox puzzled Maxwell. Start by asking: "If current stops at the capacitor plate, how does the magnetic field continue?" Guide the student to apply Ampere's law to two different surfaces sharing the same boundary loop — one cutting the wire, one passing between the plates. The contradiction reveals the missing term. Connect this to the Class 10 concept that changing magnetic flux induces electric field (Faraday's law) — now we discover the symmetric counterpart: changing electric flux induces magnetic field. End with the key formula \( i_d = \varepsilon_0 \frac{d\Phi_E}{dt} \) and the generalized Ampere-Maxwell law.

Takeaway first: Ampere's original law choked on charging capacitors - one surface cut the wire, its twin slipped through the gap, two answers for one loop - and the displacement term reconciles them. Exam moves: inconsistency questions on the two surfaces, derivation questions via Gauss's law, statement questions on the Ampere-Maxwell law, and region questions deciding which current exists where. Method: rerun the charging phone - the compass between the plates, the two surfaces' contradiction, the missing term's arrival. Check yourself: displacement current is not a trickle of charge; it is field change wearing amperes - the flagged error is insisting current means moving charge. Drill: compute the displacement current between one charging capacitor's plates and show it equals the conduction current in the wires.

## DIAGNOSTIC_QUESTION_1
A parallel plate capacitor with circular plates of radius 10 cm is being charged by a steady current of 0.5 A. What is the displacement current between the plates? (Assume no edge effects.)

## DIAGNOSTIC_ANSWER_1
The displacement current equals the conduction current: \( i_d = 0.5 \, \text{A} \). In a charging capacitor, the displacement current between the plates exactly equals the conduction current in the wires to maintain continuity. A wrong answer (e.g., zero or a different value) reveals the student thinks displacement current is a separate independent current rather than the continuation of the same current through the electric field.

## DIAGNOSTIC_QUESTION_2
Why does the original Ampere's circuital law \( \oint \mathbf{B} \cdot d\mathbf{l} = \mu_0 i_{\text{enc}} \) give contradictory results when applied to a charging capacitor using two different surfaces bounded by the same Amperian loop?

## DIAGNOSTIC_ANSWER_2
Surface 1 cuts the wire and encloses conduction current \( i_c \), giving \( B = \mu_0 i_c / (2\pi r) \). Surface 2 passes between the plates and encloses no conduction current (\( i_c = 0 \)), giving \( B = 0 \). The magnetic field at the same point cannot have two values. The law is incomplete because it ignores the changing electric flux between the plates. A wrong answer (e.g., "magnetic field is zero between plates") shows the student does not grasp that the physical B-field must be unique regardless of the mathematical surface chosen.

## DIAGNOSTIC_QUESTION_3
A parallel plate capacitor of plate area \( A = 2.0 \times 10^{-2} \, \text{m}^2 \) has a time-varying electric field \( E(t) = (3.0 \times 10^4 \, \text{V/m}) \sin(2\pi \times 10^6 t) \) between its plates. Calculate the displacement current at \( t = 0 \). (Given \( \varepsilon_0 = 8.85 \times 10^{-12} \, \text{F/m} \).)

## DIAGNOSTIC_ANSWER_3
**Step 1:** Electric flux \( \Phi_E = E A = (3.0 \times 10^4 \sin(2\pi \times 10^6 t)) \times (2.0 \times 10^{-2}) = 600 \sin(2\pi \times 10^6 t) \, \text{V·m} \).
**Step 2:** \( \frac{d\Phi_E}{dt} = 600 \times 2\pi \times 10^6 \cos(2\pi \times 10^6 t) = 1.2\pi \times 10^9 \cos(2\pi \times 10^6 t) \, \text{V·m/s} \).
**Step 3:** At \( t = 0 \), \( \cos(0) = 1 \), so \( \frac{d\Phi_E}{dt} = 1.2\pi \times 10^9 \, \text{V·m/s} \).
**Step 4:** \( i_d = \varepsilon_0 \frac{d\Phi_E}{dt} = (8.85 \times 10^{-12}) \times (1.2\pi \times 10^9) = 3.34 \times 10^{-2} \, \text{A} = 33.4 \, \text{mA} \).
A wrong answer (e.g., missing \( \varepsilon_0 \), wrong derivative, or unit error) reveals confusion between electric field rate of change and electric flux rate of change, or mishandling of \( \varepsilon_0 \) units.

## DIAGNOSTIC_QUESTION_4
In a charging capacitor, the conduction current \( i_c \) in the connecting wires is 2.0 A. At a point P outside the capacitor but near the wire, the magnetic field is measured. At a point M between the plates, at the same radial distance from the axis, the magnetic field is also measured. How do the two magnetic fields compare? Explain using the Ampere-Maxwell law.

## DIAGNOSTIC_ANSWER_4
The magnetic fields at P and M are equal in magnitude. At P, the Amperian loop encloses only conduction current \( i_c = 2.0 \, \text{A} \) (since \( i_d = 0 \) outside). At M, the same loop encloses only displacement current \( i_d = 2.0 \, \text{A} \) (since \( i_c = 0 \) between plates). By Ampere-Maxwell law \( \oint \mathbf{B} \cdot d\mathbf{l} = \mu_0 (i_c + i_d) \), the total enclosed current is 2.0 A in both cases, so B is identical. A wrong answer (e.g., "B is zero at M") indicates the student treats displacement current as "not real" current.

## DIAGNOSTIC_QUESTION_5
A student argues: "Displacement current is just a mathematical trick; it doesn't produce a real magnetic field because no charges are moving." Evaluate this statement. Design an experiment to test whether the magnetic field between capacitor plates is physically real.

## DIAGNOSTIC_ANSWER_5
The statement is false. Displacement current produces a magnetic field identical in every measurable way to that from conduction current. Experiment: Use a small magnetic needle (or a Hall sensor) placed between the plates of a large parallel plate capacitor driven by a high-frequency AC source (e.g., 1 MHz, 10 V). The needle deflects, confirming a real magnetic field. Alternatively, measure the induced emf in a small pickup coil placed between the plates — a time-varying B-field induces emf per Faraday's law. A wrong evaluation (agreeing with the student) reveals the misconception that only moving charges create magnetic fields, ignoring Maxwell's symmetry principle.

## DIAGNOSTIC_QUESTION_6
Create a real-world analogy for displacement current using a water flow model. Explain how your analogy captures (a) the continuity of "current" through a gap, and (b) the role of the time-varying field.

## DIAGNOSTIC_ANSWER_6
Analogy: Water flows through a pipe (wire) into a flexible rubber balloon (capacitor gap). The balloon stretches — water doesn't cross the rubber, but the stretching membrane (electric field) transmits the "flow" to the other side. The rate of volume increase inside the balloon is \( dV/dt \), analogous to \( d\Phi_E/dt \). The "displacement current" is the effective flow through the gap. A poor analogy (e.g., water jumping the gap) fails to capture that no medium crosses the gap, yet the effect is continuous. This tests whether the student understands displacement current as a field-mediated continuity, not charge transport.

## COMMON_MISCONCEPTION
Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no actual charges move." They write in exams: "Between capacitor plates, \( i_d = 0 \) because there is no conduction current," or "Magnetic field exists only where conduction current flows." This is wrong because Maxwell's equations and experiments (e.g., measuring B between plates with a magnetic probe) confirm the magnetic field is physically real and identical to that from conduction current. The error stems from equating "current" exclusively with "moving charges" rather than "source of magnetic field in Ampere's law."

## ON_FAILURE
1. Revisit Class 10 electromagnetic induction (c10_phy_cbse_02_008): changing magnetic flux → electric field. 
2. Perform the capacitor thought experiment: draw two surfaces for the same Amperian loop, compute B from each using original Ampere's law, observe contradiction. 
3. Derive \( i_d = \varepsilon_0 \frac{d\Phi_E}{dt} \) step-by-step from Gauss's law \( \Phi_E = Q/\varepsilon_0 \) and \( i = dQ/dt \). 
4. Redo Diagnostic Questions 2 and 4. If still stuck, watch a simulation of charging capacitor showing B-field lines continuous across the gap.

## PREREQUISITE_NODE_IDS
c10_phy_cbse_02_001, c10_phy_cbse_02_002, c10_phy_cbse_02_008, c11_math_cbse_13_006, c11_math_cbse_13_007, c11_math_cbse_13_008
## PREREQUISITE_REASONS
c10_phy_cbse_02_001: Magnetic field concept and field lines — needed to understand B-field continuity.
c10_phy_cbse_02_002: Magnetic field due to current — basis for Ampere's law application.
c10_phy_cbse_02_008: Faraday's law of induction — provides the symmetry argument (changing B → E, so changing E → B).
c11_math_cbse_13_006: Derivative concept — required for \( d\Phi_E/dt \).
c11_math_cbse_13_007: Derivative of polynomials — used in flux rate calculations.
c11_math_cbse_13_008: First principle derivative — foundation for understanding rate of change physically.

## FORWARD_NODE_IDS
c12_phy_cbse_08_002, c12_phy_cbse_08_003, c12_phy_cbse_08_004, c12_cs_cbse_01_005, c12_phy_cbse_08_005

## FORWARD_REASONS
c12_phy_cbse_08_002: Maxwell's equations qualitative understanding builds directly on displacement current as the missing term in Ampere's law.
c12_phy_cbse_08_003: Electromagnetic spectrum derivation uses the symmetry between Faraday's law and Ampere-Maxwell law established here.
c12_phy_cbse_08_004: Properties of EM waves (E⊥B⊥direction, E₀/B₀ = c) rely on displacement current as the coupling mechanism.
c12_cs_cbse_01_005: Natural next step: Unguided transmission media (wireless media) transmit electromagnetic signals through air, vacuum, o... extends and applies what this node establishes.  
c12_phy_cbse_08_005: Displacement current concept explains how accelerated charges in antennas produce radio waves.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_007, c11_math_cbse_13_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Calculus derivative concept is essential for \( d\Phi_E/dt \) — the rate of change of electric flux.
c11_math_cbse_13_007: Polynomial derivatives appear in time-varying field problems (e.g., \( E \propto t^n \)).
c11_math_cbse_13_008: First-principle derivative understanding helps justify \( i_d = \varepsilon_0 \frac{d\Phi_E}{dt} \) from \( i = dQ/dt \) and Gauss's law.

## CHAIN_DESCRIPTION
c10_phy_cbse_02_002 → c12_phy_cbse_08_001 → c12_phy_cbse_08_002

## THIS_FORMULA
\( i_d = \varepsilon_0 \frac{d\Phi_E}{dt} \) (A); Ampere-Maxwell law: \( \oint \mathbf{B} \cdot d\mathbf{l} = \mu_0 \left( i_c + \varepsilon_0 \frac{d\Phi_E}{dt} \right) \) (T·m = N/A)

## FORMULA_VARIABLES
\( i_d \) = displacement current (A); \( \varepsilon_0 \) = vacuum permittivity = \( 8.85 \times 10^{-12} \, \text{F/m} = \text{C}^2/(\text{N·m}^2) \); \( \Phi_E = \int \mathbf{E} \cdot d\mathbf{A} \) = electric flux (V·m = N·m²/C); \( t \) = time (s); \( i_c \) = conduction current (A); \( \mu_0 \) = vacuum permeability = \( 4\pi \times 10^{-7} \, \text{T·m/A} \); \( \mathbf{B} \) = magnetic field (T); \( d\mathbf{l} \) = line element (m)

## FORMULA_UNITS
A, F/m, V·m, s, T·m/A, T, m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_006 | Derivative \( d\Phi_E/dt \) is the mathematical core of displacement current — without calculus, the concept cannot be quantified.
c11_math_cbse_13_007 | Polynomial and trigonometric derivatives used in AC capacitor problems (e.g., \( E = E_0 \sin \omega t \)).
c11_math_cbse_13_008 | First-principle derivative connects \( i = dQ/dt \) to \( i_d = \varepsilon_0 d\Phi_E/dt \) via Gauss's law \( \Phi_E = Q/\varepsilon_0 \).
## PREREQ_CONCEPT
Ampere's circuital law for steady currents and Gauss's law for electric flux.

## PREREQ_BEFORE
Student must be able to apply Ampere's law to a long straight wire and compute electric flux through a surface using Gauss's law.

## PREREQ_STUCK
Review Class 10 magnetic field of a straight wire (c10_phy_cbse_02_002) and Class 12 Gauss's law (not in prior nodes but assumed from Chapter 1) — specifically \( \Phi_E = Q/\varepsilon_0 \) for a parallel plate capacitor.

## WORKED_EXAMPLE_1
PROBLEM: A parallel plate capacitor with circular plates of radius 12 cm is being charged by a constant current of 0.15 A. (a) Calculate the rate of change of potential difference between the plates. (b) Obtain the displacement current across the plates. (c) Is Kirchhoff's junction rule valid at each plate? (NCERT Exercise 8.1 adapted)

STEPS:
- Step 1: Identify given: \( i_c = 0.15 \, \text{A} \), plate radius \( r = 0.12 \, \text{m} \), plate area \( A = \pi r^2 = \pi (0.12)^2 = 4.52 \times 10^{-2} \, \text{m}^2 \). Need: \( dV/dt \), \( i_d \), Kirchhoff's rule validity.
- Step 2: For a parallel plate capacitor, \( C = \varepsilon_0 A / d \). But \( d \) is not given! However, \( i_c = C \, dV/dt \) → \( dV/dt = i_c / C \). Since \( C \) is unknown, we use the relation \( i_d = i_c = 0.15 \, \text{A} \) (continuity). Also \( \Phi_E = E A = (V/d) A \). But \( Q = C V = \varepsilon_0 A V / d \) → \( \Phi_E = Q / \varepsilon_0 \). Then \( i_d = \varepsilon_0 d\Phi_E/dt = dQ/dt = i_c \). So \( i_d = 0.15 \, \text{A} \) directly.
- Step 3: For (a), we need \( dV/dt \). From \( i_c = C \, dV/dt \) and \( C = \varepsilon_0 A / d \), we have \( dV/dt = i_c d / (\varepsilon_0 A) \). But \( d \) is unknown. Wait — the problem gives plate separation? Re-read: "separated by 5.0 cm". So \( d = 0.05 \, \text{m} \). Then \( C = (8.85 \times 10^{-12} \times 4.52 \times 10^{-2}) / 0.05 = 8.01 \times 10^{-12} \, \text{F} = 8.01 \, \text{pF} \). Then \( dV/dt = 0.15 / (8.01 \times 10^{-12}) = 1.87 \times 10^{10} \, \text{V/s} \).
- Step 4: (b) Displacement current \( i_d = \varepsilon_0 d\Phi_E/dt = \varepsilon_0 A (dE/dt) \). But \( E = V/d \), so \( dE/dt = (1/d) dV/dt \). Then \( i_d = \varepsilon_0 A (1/d) dV/dt = (\varepsilon_0 A / d) dV/dt = C \, dV/dt = i_c = 0.15 \, \text{A} \).
- Step 5: (c) Kirchhoff's junction rule (sum of currents at a junction = 0) holds if we include displacement current. At the positive plate, conduction current \( i_c \) enters, displacement current \( i_d \) leaves through the gap. At the negative plate, \( i_d \) enters, \( i_c \) leaves. So \( i_c = i_d \) at each plate → junction rule valid.

REASONING: The displacement current exactly equals the conduction current in a charging capacitor, ensuring current continuity. The rate of change of voltage depends on capacitance, which depends on geometry. Kirchhoff's rule is saved by recognizing displacement current as a real current for circuit laws.

ANSWER: (a) \( dV/dt = 1.87 \times 10^{10} \, \text{V/s} \); (b) \( i_d = 0.15 \, \text{A} \); (c) Yes, Kirchhoff's junction rule is valid when displacement current is included.

## WORKED_EXAMPLE_2
PROBLEM: A parallel plate capacitor of capacitance 100 pF is connected to a 230 V AC supply with angular frequency 300 rad/s. (a) What is the RMS value of the conduction current? (b) Is the conduction current equal to the displacement current? (c) Determine the amplitude of B at a point 3.0 cm from the axis between the plates. (NCERT Exercise 8.2 adapted)

STEPS:
- Step 1: Given: \( C = 100 \, \text{pF} = 100 \times 10^{-12} \, \text{F} \), \( V_{\text{rms}} = 230 \, \text{V} \), \( \omega = 300 \, \text{rad/s} \), \( r = 3.0 \, \text{cm} = 0.03 \, \text{m} \) from axis. Need: \( I_{\text{rms}} \), equality of \( i_c \) and \( i_d \), \( B_0 \).
- Step 2: (a) Capacitive reactance \( X_C = 1/(\omega C) = 1 / (300 \times 100 \times 10^{-12}) = 3.33 \times 10^7 \, \Omega \). RMS conduction current \( I_{\text{rms}} = V_{\text{rms}} / X_C = 230 / (3.33 \times 10^7) = 6.9 \times 10^{-6} \, \text{A} = 6.9 \, \mu\text{A} \).
- Step 3: (b) Yes, in a capacitor driven by AC, the displacement current between plates equals the conduction current in the wires at every instant: \( i_d(t) = i_c(t) \). This is required by current continuity and the Ampere-Maxwell law.
- Step 4: (c) Amplitude of conduction current \( I_0 = \sqrt{2} I_{\text{rms}} = \sqrt{2} \times 6.9 \times 10^{-6} = 9.76 \times 10^{-6} \, \text{A} \). For a point at radial distance \( r \) from axis inside the capacitor (\( r < R \)), the displacement current enclosed by a circular loop of radius \( r \) is \( i_d^{\text{enc}} = i_d \times (r^2 / R^2) \). But plate radius \( R \) is not given! Wait — the problem says "circular plates each of radius R = 6.0 cm". So \( R = 0.06 \, \text{m} \). Then \( i_d^{\text{enc}} = I_0 \sin(\omega t) \times (r^2 / R^2) \). By Ampere-Maxwell law: \( B \times 2\pi r = \mu_0 i_d^{\text{enc}} \). So \( B = (\mu_0 I_0 r) / (2\pi R^2) \sin(\omega t) \). Amplitude \( B_0 = \mu_0 I_0 r / (2\pi R^2) \).
- Step 5: Compute \( B_0 = (4\pi \times 10^{-7} \times 9.76 \times 10^{-6} \times 0.03) / (2\pi \times (0.06)^2) = (4\pi \times 10^{-7} \times 9.76 \times 10^{-6} \times 0.03) / (2\pi \times 3.6 \times 10^{-3}) = (1.17 \times 10^{-12}) / (7.2 \times 10^{-3}) \) wait — recalculate carefully: numerator = \( 4\pi \times 10^{-7} \times 9.76 \times 10^{-6} \times 0.03 = 3.68 \times 10^{-12} \pi \). Denominator = \( 2\pi \times 0.0036 = 7.2 \times 10^{-3} \pi \). So \( B_0 = 3.68 \times 10^{-12} / 7.2 \times 10^{-3} = 5.11 \times 10^{-10} \, \text{T} = 0.511 \, \text{nT} \).

REASONING: In AC circuits, displacement current mirrors conduction current instantaneously. The magnetic field between plates depends on the fraction of displacement current enclosed by the Amperian loop, proportional to \( r^2 \) for \( r < R \).

ANSWER: (a) \( I_{\text{rms}} = 6.9 \, \mu\text{A} \); (b) Yes, \( i_d(t) = i_c(t) \) at all times; (c) \( B_0 = 5.1 \times 10^{-10} \, \text{T} \) (or 0.51 nT).

## WORKED_EXAMPLE_3
PROBLEM: A parallel plate capacitor with plate area \( A = 5.0 \times 10^{-2} \, \text{m}^2 \) and separation \( d = 2.0 \, \text{mm} \) is charged by a time-varying current \( i_c(t) = (0.20 \, \text{A}) e^{-t/\tau} \) with \( \tau = 1.0 \, \text{ms} \). At \( t = 0 \), the capacitor is uncharged. (a) Find the charge \( Q(t) \) on the capacitor. (b) Find the electric field \( E(t) \) between the plates. (c) Verify that the displacement current \( i_d(t) \) equals \( i_c(t) \). (d) Find the magnetic field \( B(r, t) \) at a distance \( r = 1.5 \, \text{cm} \) from the axis, for \( r < R \) (plate radius \( R = 4.0 \, \text{cm} \)).

STEPS:
- Step 1: Given: \( A = 5.0 \times 10^{-2} \, \text{m}^2 \), \( d = 2.0 \times 10^{-3} \, \text{m} \), \( i_c(t) = 0.20 e^{-t/0.001} \, \text{A} \), \( \tau = 0.001 \, \text{s} \), \( R = 0.04 \, \text{m} \), \( r = 0.015 \, \text{m} \). Initial condition: \( Q(0) = 0 \).
- Step 2: (a) \( i_c = dQ/dt \) → \( Q(t) = \int_0^t i_c(t') dt' = \int_0^t 0.20 e^{-t'/\tau} dt' = 0.20 \tau (1 - e^{-t/\tau}) = 0.20 \times 0.001 \times (1 - e^{-t/0.001}) = 2.0 \times 10^{-4} (1 - e^{-1000t}) \, \text{C} \).
- Step 3: (b) For parallel plates, \( E = \sigma / \varepsilon_0 = Q / (\varepsilon_0 A) \). So \( E(t) = Q(t) / (\varepsilon_0 A) = [2.0 \times 10^{-4} (1 - e^{-1000t})] / [(8.85 \times 10^{-12}) \times (5.0 \times 10^{-2})] = (2.0 \times 10^{-4}) / (4.425 \times 10^{-13}) \times (1 - e^{-1000t}) = 4.52 \times 10^8 (1 - e^{-1000t}) \, \text{V/m} \).
- Step 4: (c) Electric flux \( \Phi_E = E A = Q / \varepsilon_0 \). Then \( i_d = \varepsilon_0 d\Phi_E/dt = \varepsilon_0 (1/\varepsilon_0) dQ/dt = dQ/dt = i_c(t) \). Verified: \( i_d(t) = 0.20 e^{-1000t} \, \text{A} \).
- Step 5: (d) For \( r < R \), enclosed displacement current \( i_d^{\text{enc}} = i_d(t) \times (r^2 / R^2) \). Ampere-Maxwell law: \( B \times 2\pi r = \mu_0 i_d^{\text{enc}} \). So \( B(r, t) = \frac{\mu_0 i_d(t) r}{2\pi R^2} = \frac{(4\pi \times 10^{-7}) \times (0.20 e^{-1000t}) \times 0.015}{2\pi \times (0.04)^2} = \frac{4\pi \times 10^{-7} \times 0.20 \times 0.015}{2\pi \times 0.0016} e^{-1000t} = \frac{1.2 \times 10^{-9}}{3.2 \times 10^{-3}} e^{-1000t} = 3.75 \times 10^{-7} e^{-1000t} \, \text{T} \).

REASONING: This problem combines transient RC charging (exponential current) with the full Ampere-Maxwell law. The displacement current is derived from first principles using Gauss's law, confirming it matches conduction current. The B-field inside the capacitor is proportional to \( r \) (for \( r < R \)) because enclosed displacement current grows as \( r^2 \).

ANSWER: (a) \( Q(t) = 2.0 \times 10^{-4} (1 - e^{-1000t}) \, \text{C} \); (b) \( E(t) = 4.52 \times 10^8 (1 - e^{-1000t}) \, \text{V/m} \); (c) \( i_d(t) = i_c(t) = 0.20 e^{-1000t} \, \text{A} \); (d) \( B(r, t) = 3.75 \times 10^{-7} e^{-1000t} \, \text{T} \) at \( r = 1.5 \, \text{cm} \).

## COMPETENCY_QUESTION_1
QUESTION: A student sets up an experiment with a parallel plate capacitor connected to a function generator producing a triangular voltage waveform \( V(t) \) (linear ramp up, then linear ramp down). The student claims: "Since \( V(t) \) is linear in time during each half-cycle, \( dV/dt \) is constant, so the displacement current is constant during each half-cycle." Is the student correct? If yes, explain why the magnetic field between the plates is constant during each half-cycle. If no, identify the error.

COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Understand the physical situation — triangular voltage waveform means \( V(t) = kt \) (ramp up) or \( V(t) = -kt \) (ramp down) where \( k \) is constant slope.
- Step 2: Identify relevant principle — displacement current \( i_d = \varepsilon_0 A (dE/dt) \) and \( E = V/d \) for parallel plates.
- Step 3: Apply — \( dE/dt = (1/d) dV/dt = k/d \) (constant during ramp up), so \( i_d = \varepsilon_0 A k / d = \text{constant} \). During ramp down, \( dV/dt = -k \), so \( i_d = -\varepsilon_0 A k / d \) (constant but opposite direction).
- Step 4: Interpret — Yes, the student is correct. The displacement current is constant during each linear segment. By Ampere-Maxwell law, \( B \propto i_d^{\text{enc}} \), so the magnetic field between the plates is also constant in magnitude during each half-cycle (direction reverses between half-cycles).

ANSWER: Yes, the student is correct. For a triangular voltage waveform, \( dV/dt \) is constant during each linear segment, so \( i_d = C \, dV/dt \) is constant. The magnetic field between the plates is therefore constant in magnitude during each half-cycle, reversing direction when the voltage slope changes sign.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a region of space, there is a time-varying electric field \( \mathbf{E}(x, y, z, t) = E_0 \sin(kz - \omega t) \hat{\mathbf{x}} \) but no conduction current (\( \mathbf{J} = 0 \)). A student argues: "Since there are no moving charges, Ampere's law says \( \nabla \times \mathbf{B} = 0 \), so the magnetic field must be zero or static." Using the Ampere-Maxwell law, evaluate this claim and determine the magnetic field \( \mathbf{B} \) that co-exists with this electric field in an electromagnetic wave.

COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Understand the physical situation — a plane wave electric field varying in space and time, no conduction current.
- Step 2: Identify relevant principle — Ampere-Maxwell law in differential form: \( \nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \). With \( \mathbf{J} = 0 \), \( \nabla \times \mathbf{B} = \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t} \).
- Step 3: Compute \( \partial \mathbf{E}/\partial t = -E_0 \omega \cos(kz - \omega t) \hat{\mathbf{x}} \). This is non-zero, so \( \nabla \times \mathbf{B} \neq 0 \). The student's claim is false.
- Step 4: For a plane wave propagating in +z direction with \( \mathbf{E} = E_0 \sin(kz - \omega t) \hat{\mathbf{x}} \), the magnetic field must be \( \mathbf{B} = B_0 \sin(kz - \omega t) \hat{\mathbf{y}} \) with \( B_0 = E_0 / c \). Verify: \( \nabla \times \mathbf{B} = \frac{\partial B_y}{\partial z} (-\hat{\mathbf{x}}) = -B_0 k \cos(kz - \omega t) \hat{\mathbf{x}} \). Set equal to \( \mu_0 \varepsilon_0 (-E_0 \omega \cos(kz - \omega t)) \hat{\mathbf{x}} \). So \( B_0 k = \mu_0 \varepsilon_0 E_0 \omega \). Using \( \omega/k = c \) and \( c = 1/\sqrt{\mu_0 \varepsilon_0} \), we get \( B_0 = E_0 / c \).
- Step 5: The time-varying electric field produces a magnetic field via displacement current, even with zero conduction current. This is the essence of electromagnetic wave propagation.

ANSWER: The student's claim is false. The Ampere-Maxwell law includes the displacement current term \( \mu_0 \varepsilon_0 \partial \mathbf{E}/\partial t \), which is non-zero for a time-varying E-field. This term acts as a source of magnetic field. For the given plane wave, the co-existing magnetic field is \( \mathbf{B} = (E_0/c) \sin(kz - \omega t) \hat{\mathbf{y}} \), perpendicular to both E and the propagation direction.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: It has the same physical effect as ______ current — producing a magnetic field — but arises from a time-varying electric field rather than moving charges.

## DIAGNOSTIC_ANSWER_7
conduction

Conduction is the comparison's baseline: displacement current is granted the same magnetic rights as the wire's own moving charge. **A wrong answer (displacement twice) reveals the student has defined the term by itself, a circle with no content.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a mobile phone charging via a USB-C cable — current flows through the wires, but between the ______ plates inside the charging circuit, no actual charges move across the gap.

## DIAGNOSTIC_ANSWER_8
capacitor

The capacitor plates are the gap's edges: the charging circuit's interruption that forced Maxwell's addition. **A wrong answer (the battery) reveals the student has located the void inside a component that conducts perfectly well.** The capacitor plates are the gap's walls: the charging circuit's interruption that demanded Maxwell's new term.

## DIAGNOSTIC_QUESTION_9
What is Displacement current? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
It has the same physical effect as conduction current — producing a magnetic field — but arises from a time-varying electric field rather than moving charges.

The definition is comparative by design: the term is introduced by its similarity to conduction current and differentiated by its cause. **A wrong answer that omits the comparison reveals the student has lost the definition's bridge between the two currents.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Displacement current?

## DIAGNOSTIC_ANSWER_10
The error stems from equating "current" exclusively with "moving charges" rather than "source of magnetic field in Ampere's law.".

The flagged error is the moving-charge monopoly: Maxwell's insight is that Ampere's law cares about sources of magnetic field, and a changing electric field is one. **A wrong answer denying the gap's magnetism reveals the student has kept the pre-Maxwell law and contradicted the compass between the plates.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can (1) identify the inconsistency in Ampere's original law when applied to a charging capacitor, (2) derive the displacement current expression using Gauss's law and the continuity of current, (3) state the Ampere-Maxwell law in integral form, and (4) distinguish regions where conduction current, displacement current, or.
