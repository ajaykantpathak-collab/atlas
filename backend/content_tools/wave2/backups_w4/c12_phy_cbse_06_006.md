## ELI5
A fan starts slowly because its windings are inductors resisting the current's rise: the supply works against the back emf, and that extra work banks as magnetic energy - half L I squared. Integrate I times L dI by dt from zero to the final current and the half appears, the exact twin of half m v squared for kinetic energy. The field between the coil's turns is the storeroom, with density B squared over two mu-zero.

## DEFINITION
The energy stored in an inductor is the magnetic potential energy accumulated in the magnetic field of the inductor when current flows through it, given by \( U = \frac{1}{2} L I^2 \) where \( L \) is the self-inductance (henry, H) and \( I \) is the steady current (ampere, A). This energy is the work done by the external source against the back emf to establish the current from zero to its final value, assuming no resistive losses.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can derive the energy formula \( U = \frac{1}{2} L I^2 \) from the power integral \( \int I \varepsilon \, dt \), calculate the energy stored for given \( L \) and \( I \) with correct units (joules), and explain the analogy with spring potential energy \( \frac{1}{2} k x^2 \) and kinetic energy \( \frac{1}{2} m v^2 \).

## SCOPE_BOUNDARY
Covers energy stored in an ideal inductor (pure inductance, no resistance) in a DC circuit during current build-up; includes energy density \( u = \frac{B^2}{2\mu_0} \) for a solenoid. Does NOT cover AC circuits, mutual inductance energy, or non-ideal inductors with resistance (RL circuits) — those are in the next chapter (Alternating Current).

## WALKTHROUGH
Observe a ceiling fan starting slowly when switched on — the motor windings act as inductors opposing the sudden current rise. The battery or mains supply must do extra work to overcome this "electrical inertia" (back emf). That work is stored as magnetic energy in the windings. Begin by recalling the back emf \( \varepsilon = -L \frac{dI}{dt} \) from self-induction. The instantaneous power supplied is \( P = I |\varepsilon| = L I \frac{dI}{dt} \). Integrate from \( I=0 \) to \( I=I_f \) to get total work done: \( U = \int_0^{I_f} L I \, dI = \frac{1}{2} L I_f^2 \). This is the energy stored in the magnetic field.

Takeaway first: inductor energy is the back emf's invoice - current raised against L dI by dt accumulates half L I squared - and the magnetic field is where the invoice is filed. Exam moves: derivation questions by integration, computation questions for given L and I, and analogy questions matching spring and kinetic-energy forms. Method: rerun the fan - back emf recalled, power integrated, the half emerging from the integral's own bookkeeping. Check yourself: the energy belongs to the inductor's field, not to the resistor's heat; a resistive coil stores the half L I squared and separately burns I squared R. Drill: derive U once and compute the stored energy for one inductor at one current.

## DIAGNOSTIC_QUESTION_1
What is the SI unit of energy stored in an inductor, and which formula gives this energy in terms of self-inductance \( L \) and current \( I \)?

## DIAGNOSTIC_ANSWER_1
The SI unit is joule (J). The formula is \( U = \frac{1}{2} L I^2 \). A wrong unit (e.g., watt or henry) reveals confusion between energy, power, and inductance. Writing \( U = L I^2 \) (missing the factor 1/2) shows the student forgot the integration step or confused it with \( U = \frac{1}{2} C V^2 \) for capacitors.

## DIAGNOSTIC_QUESTION_2
Why does the energy stored in an inductor depend on the square of the current, \( I^2 \), rather than linearly on \( I \)?

## DIAGNOSTIC_ANSWER_2
The back emf \( \varepsilon = -L \frac{dI}{dt} \) is proportional to the rate of change of current. The instantaneous power is \( P = I \varepsilon \propto I \frac{dI}{dt} \). Integrating \( \int I \, dI \) yields \( \frac{1}{2} I^2 \). If a student says "energy is \( L I \)" they are treating emf as constant (like a battery) and ignoring that the opposing emf grows with current, so more work is needed per unit current increment at higher currents.

## DIAGNOSTIC_QUESTION_3
A solenoid of self-inductance \( 40 \, \text{mH} \) carries a steady current of \( 2.5 \, \text{A} \). Calculate the magnetic energy stored. If the current is doubled, by what factor does the stored energy change?

## DIAGNOSTIC_ANSWER_3
Given: \( L = 40 \times 10^{-3} \, \text{H} \), \( I = 2.5 \, \text{A} \).  
\( U = \frac{1}{2} \times 40 \times 10^{-3} \times (2.5)^2 = 0.5 \times 0.04 \times 6.25 = 0.125 \, \text{J} \).  
If \( I \to 2I \), \( U \propto I^2 \) so energy becomes \( 4 \times 0.125 = 0.5 \, \text{J} \). Factor = 4.  
A wrong factor of 2 indicates the student thinks \( U \propto I \). A unit error (e.g., answer in mJ without conversion) shows mishandling of milli-henry.

## DIAGNOSTIC_QUESTION_4
Two identical inductors each of inductance \( L \) are connected (a) in series, (b) in parallel. A current \( I \) flows through the combination. Compare the total magnetic energy stored in the two cases.

## DIAGNOSTIC_ANSWER_4
(a) Series: \( L_{\text{eq}} = 2L \), current through each is \( I \). Total energy \( U_s = \frac{1}{2} (2L) I^2 = L I^2 \).  
(b) Parallel: \( L_{\text{eq}} = L/2 \), total current \( I \) splits equally, each carries \( I/2 \). Energy per inductor \( = \frac{1}{2} L (I/2)^2 = \frac{1}{8} L I^2 \). Total \( U_p = 2 \times \frac{1}{8} L I^2 = \frac{1}{4} L I^2 \).  
Ratio \( U_s : U_p = 4 : 1 \).  
If a student gives equal energy, they incorrectly used the same current \( I \) for each inductor in parallel.

## DIAGNOSTIC_QUESTION_5
A student writes the energy stored in an inductor as \( U = \frac{1}{2} \frac{B^2}{\mu_0} \times \text{volume} \) for a solenoid. Is this correct? If yes, derive it from \( U = \frac{1}{2} L I^2 \) using \( B = \mu_0 n I \) and \( L = \mu_0 n^2 A l \).

## DIAGNOSTIC_ANSWER_5
Yes, it is correct.  
\( U = \frac{1}{2} L I^2 = \frac{1}{2} (\mu_0 n^2 A l) I^2 \).  
But \( B = \mu_0 n I \Rightarrow I = \frac{B}{\mu_0 n} \).  
Substitute: \( U = \frac{1}{2} \mu_0 n^2 A l \left( \frac{B}{\mu_0 n} \right)^2 = \frac{1}{2} \frac{B^2}{\mu_0} A l \).  
Volume \( V = A l \), so energy density \( u = \frac{U}{V} = \frac{B^2}{2\mu_0} \).  
A student who cannot derive this likely memorised the formula without understanding the link between circuit parameters (\( L, I \)) and field parameters (\( B, \mu_0 \)).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a battery, an inductor (e.g., a coil of wire), a resistor, and a switch to demonstrate that energy is stored in the inductor and returned to the circuit when the switch is opened. Explain what you would observe and why.

## DIAGNOSTIC_ANSWER_6
Connect battery, switch, resistor, and inductor in series. Close switch: current builds up slowly, energy stored in inductor. Open switch suddenly: the inductor tries to maintain current, inducing a large back emf that can cause a spark across the switch contacts (or light a neon lamp connected across the inductor). The spark shows the stored magnetic energy is converted to heat/light. A good answer mentions the spark and explains it via \( \varepsilon = -L \frac{dI}{dt} \) with large \( \frac{dI}{dt} \) at switch opening. A poor answer omits the spark or says the current stops instantly.

## COMMON_MISCONCEPTION
Students often think the energy stored in an inductor is \( U = L I \) (linear in I) because they confuse the back emf magnitude \( L \frac{dI}{dt} \) with a constant voltage source. They also believe the energy is stored in the wire itself rather than in the magnetic field in the surrounding space. Another error: using \( U = \frac{1}{2} L I \) (missing square) by incorrectly integrating \( \int L \, dI \) instead of \( \int L I \, dI \).

## ON_FAILURE
If the student writes \( U = L I \) or \( U = \frac{1}{2} L I \), have them re-derive step by step: (1) Write back emf \( \varepsilon = L \frac{dI}{dt} \). (2) Power \( P = I \varepsilon = L I \frac{dI}{dt} \). (3) Energy \( dU = P dt = L I dI \). (4) Integrate \( \int_0^I L I' dI' = \frac{1}{2} L I^2 \). Use the spring analogy: \( F = kx \), work \( = \int kx dx = \frac{1}{2} kx^2 \). Map \( L \to k \), \( I \to x \). Revisit node c11_phy_cbse_05_008 (Potential Energy of a Spring) and c12_phy_cbse_06_004 (Self-Induction).

## PREREQUISITE_NODE_IDS
c12_phy_cbse_06_004, c11_phy_cbse_05_001, c11_phy_cbse_05_002, c11_phy_cbse_05_008, c11_phy_cbse_05_010, c12_phy_cbse_06_002, c12_phy_cbse_06_005

## PREREQUISITE_REASONS
c12_phy_cbse_06_004: Introduces self-inductance \( L \) and back emf \( \varepsilon = -L \frac{dI}{dt} \), which is the starting point for energy derivation.
c11_phy_cbse_05_001: Defines work done by a force; here the "force" is the external voltage doing work against back emf.
c11_phy_cbse_05_002: Explains integration for variable force; the back emf varies with \( dI/dt \), so work integral requires calculus.
c11_phy_cbse_05_008: Spring potential energy \( \frac{1}{2} k x^2 \) is the mechanical analogue; \( L \) is electrical inertia like \( k \), \( I \) is like displacement \( x \).
c11_phy_cbse_05_010: Conservation of energy principle — work done by source equals energy stored in magnetic field (ignoring resistance).
c12_phy_cbse_06_002: Energy stored in inductor (\(U = \frac{1}{2}LI^2\)) comes from work done against back emf, which exists because of Lenz's law.  
c12_phy_cbse_06_005: Energy stored in an inductor (½LI²) relates to the magnetic energy in the generator's field and the work done against back emf.  

## FORWARD_NODE_IDS
c12_phy_cbse_06_007
## FORWARD_REASONS
c12_phy_cbse_06_007: Eddy currents involve induced currents in conductors; the energy dissipated as heat comes from the magnetic energy stored in the inductor's field. Understanding stored energy helps explain why eddy current braking works (kinetic energy → magnetic energy → heat).

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions — used to express \( dI/dt \) and integrate \( I dI \).
c11_math_cbse_13_008: Derivative using first principle — underpins the definition of instantaneous power and energy as integral of power.
c11_math_cbse_13_009: Algebra of derivatives (sum, product rules) — needed when differentiating energy expressions with respect to time in RL circuits.

## CHAIN_DESCRIPTION
c12_phy_cbse_06_004 -> c12_phy_cbse_06_006 -> c12_phy_cbse_06_007

## THIS_FORMULA
\( U = \frac{1}{2} L I^2 \) (joules, J); energy density \( u = \frac{B^2}{2\mu_0} \) (J/m³)

## FORMULA_VARIABLES
\( U \) = magnetic energy stored (J), \( L \) = self-inductance (H), \( I \) = steady current (A), \( B \) = magnetic field (T), \( \mu_0 \) = permeability of free space (\( 4\pi \times 10^{-7} \) H/m), \( u \) = energy density (J/m³)

## FORMULA_UNITS
J, H, A, T, H/m, J/m³

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | Integration of \( I dI \) gives \( \frac{1}{2} I^2 \), directly used in deriving \( U = \frac{1}{2} L I^2 \).
c11_math_cbse_13_009 | Product rule for derivatives helps when finding time derivative of energy \( \frac{dU}{dt} = L I \frac{dI}{dt} = P \), verifying power balance.
## PREREQ_CONCEPT
Self-inductance and back emf (\( \varepsilon = -L \frac{dI}{dt} \)) from node c12_phy_cbse_06_004.

## PREREQ_BEFORE
Student must be able to write the expression for back emf in an inductor and explain why it opposes the change in current (Lenz's law).

## PREREQ_STUCK
Revisit c12_phy_cbse_06_004 (Self-Induction) and c11_phy_cbse_05_002 (Work Done by Variable Force) to practice integration of power.

## WORKED_EXAMPLE_1
PROBLEM: A ceiling fan motor has a winding inductance of 120 mH. When running at full speed, it draws 0.8 A from the 230 V mains (assume DC for this calculation). How much magnetic energy is stored in the windings? If the fan is switched off and the current drops to zero in 2 ms, what is the average back emf induced across the windings?

STEPS:
- Step 1: Identify given quantities: \( L = 120 \, \text{mH} = 120 \times 10^{-3} \, \text{H} \), \( I = 0.8 \, \text{A} \), \( \Delta t = 2 \, \text{ms} = 2 \times 10^{-3} \, \text{s} \), \( \Delta I = -0.8 \, \text{A} \).
- Step 2: Use energy formula \( U = \frac{1}{2} L I^2 \). Substitute: \( U = 0.5 \times 120 \times 10^{-3} \times (0.8)^2 = 0.5 \times 0.12 \times 0.64 = 0.0384 \, \text{J} \).
- Step 3: For average back emf, use \( |\varepsilon_{\text{avg}}| = L \frac{|\Delta I|}{\Delta t} = 120 \times 10^{-3} \times \frac{0.8}{2 \times 10^{-3}} = 0.12 \times 400 = 48 \, \text{V} \).
- Step 4: Check units: \( \text{H} \times \text{A/s} = (\text{V·s/A}) \times \text{A/s} = \text{V} \). Energy: \( \text{H} \times \text{A}^2 = \text{J} \). Both correct.
- Step 5: Physically reasonable: 48 V back emf is much less than 230 V, so no dangerous spark; 0.038 J is a small energy, consistent with a small motor.

REASONING: The energy stored is calculated from the steady-state current. The back emf during switch-off is found from the rate of change of current; the large \( dI/dt \) causes a voltage spike that can damage switches — hence snubber circuits are used in real fans.

ANSWER: Stored energy = 0.0384 J; average back emf = 48 V.

## WORKED_EXAMPLE_2
PROBLEM: A long solenoid of length 50 cm, cross-sectional area 4 cm², and 1000 turns carries a current of 1.5 A. Calculate (a) its self-inductance, (b) the magnetic energy stored, and (c) the magnetic energy density. Assume air core (\( \mu_r = 1 \)).

STEPS:
- Step 1: Given: \( l = 0.5 \, \text{m} \), \( A = 4 \times 10^{-4} \, \text{m}^2 \), \( N = 1000 \), \( I = 1.5 \, \text{A} \), \( \mu_0 = 4\pi \times 10^{-7} \, \text{H/m} \).
- Step 2: Turns per unit length \( n = N/l = 1000 / 0.5 = 2000 \, \text{turns/m} \). Self-inductance \( L = \mu_0 n^2 A l = (4\pi \times 10^{-7}) \times (2000)^2 \times (4 \times 10^{-4}) \times 0.5 \).
- Step 3: Compute: \( n^2 = 4 \times 10^6 \); \( A l = 2 \times 10^{-4} \); \( L = 4\pi \times 10^{-7} \times 4 \times 10^6 \times 2 \times 10^{-4} = 4\pi \times 8 \times 10^{-5} = 1.005 \times 10^{-3} \, \text{H} \approx 1.0 \, \text{mH} \).
- Step 4: Energy \( U = \frac{1}{2} L I^2 = 0.5 \times 1.005 \times 10^{-3} \times 2.25 = 1.13 \times 10^{-3} \, \text{J} = 1.13 \, \text{mJ} \).
- Step 5: Volume \( V = A l = 2 \times 10^{-4} \, \text{m}^3 \). Energy density \( u = U/V = 1.13 \times 10^{-3} / 2 \times 10^{-4} = 5.65 \, \text{J/m}^3 \). Alternatively, \( B = \mu_0 n I = 4\pi \times 10^{-7} \times 2000 \times 1.5 = 3.77 \times 10^{-3} \, \text{T} \), \( u = B^2/(2\mu_0) = (1.42 \times 10^{-5}) / (8\pi \times 10^{-7}) = 5.65 \, \text{J/m}^3 \). Matches.

REASONING: The solenoid formulas \( L = \mu_0 n^2 A l \) and \( B = \mu_0 n I \) connect circuit parameters to field parameters. Energy density \( u = B^2/(2\mu_0) \) is a universal result for any magnetic field in vacuum/air, not just solenoids.

ANSWER: (a) \( L \approx 1.0 \, \text{mH} \), (b) \( U \approx 1.13 \, \text{mJ} \), (c) \( u \approx 5.65 \, \text{J/m}^3 \).

## WORKED_EXAMPLE_3
PROBLEM: An inductor of 50 mH and a resistor of 10 Ω are connected in series to a 12 V battery. At \( t = 0 \) the switch is closed. (a) Write the expression for current \( I(t) \). (b) Find the time when the magnetic energy stored in the inductor reaches half its maximum value. (c) What is the rate of energy storage in the inductor at that instant?

STEPS:
- Step 1: This is an RL circuit. Time constant \( \tau = L/R = 50 \times 10^{-3} / 10 = 5 \times 10^{-3} \, \text{s} = 5 \, \text{ms} \). Maximum current \( I_0 = V/R = 12/10 = 1.2 \, \text{A} \). Current \( I(t) = I_0 (1 - e^{-t/\tau}) \).
- Step 2: Maximum energy \( U_{\text{max}} = \frac{1}{2} L I_0^2 = 0.5 \times 50 \times 10^{-3} \times 1.44 = 0.036 \, \text{J} \). Half max energy \( U = 0.018 \, \text{J} \). Set \( \frac{1}{2} L I^2 = 0.018 \Rightarrow I^2 = 0.036 / (50 \times 10^{-3}) = 0.72 \Rightarrow I = \sqrt{0.72} \approx 0.8485 \, \text{A} \).
- Step 3: Find \( t \) when \( I = 0.8485 \): \( 0.8485 = 1.2 (1 - e^{-t/5\text{ms}}) \Rightarrow 1 - e^{-t/5\text{ms}} = 0.707 \Rightarrow e^{-t/5\text{ms}} = 0.293 \Rightarrow -t/5\text{ms} = \ln 0.293 \approx -1.228 \Rightarrow t = 6.14 \, \text{ms} \).
- Step 4: Rate of energy storage \( \frac{dU}{dt} = L I \frac{dI}{dt} \). \( \frac{dI}{dt} = \frac{I_0}{\tau} e^{-t/\tau} = \frac{1.2}{5 \times 10^{-3}} \times 0.293 = 240 \times 0.293 = 70.32 \, \text{A/s} \). Then \( \frac{dU}{dt} = 50 \times 10^{-3} \times 0.8485 \times 70.32 \approx 2.98 \, \text{W} \).
- Step 5: Check: At this instant, battery power = \( V I = 12 \times 0.8485 = 10.18 \, \text{W} \); resistor loss = \( I^2 R = 0.72 \times 10 = 7.2 \, \text{W} \); difference = 2.98 W = inductor storage rate. Consistent.

REASONING: Combines RL circuit transient analysis (from next chapter but uses same L) with energy storage. The maximum energy is at steady state; half-energy occurs before one time constant because energy goes as \( I^2 \). The power balance \( VI = I^2R + dU/dt \) is a direct application of energy conservation.

ANSWER: (a) \( I(t) = 1.2 (1 - e^{-t/5\text{ms}}) \, \text{A} \); (b) \( t \approx 6.14 \, \text{ms} \); (c) \( dU/dt \approx 2.98 \, \text{W} \).

## COMPETENCY_QUESTION_1
QUESTION: A student claims that if you double the number of turns of a solenoid while keeping its length, cross-sectional area, and current the same, the stored magnetic energy quadruples. Is this claim correct? Justify your answer using the formulas for inductance and energy.

COMPETENCY: Predicting outcomes from changing variables and unit analysis.

STEPS:
- Step 1: Recall \( L = \mu_0 n^2 A l \) where \( n = N/l \). If \( N \) doubles, \( n \) doubles, so \( L \) becomes \( 4L \) (since \( L \propto n^2 \propto N^2 \)).
- Step 2: Energy \( U = \frac{1}{2} L I^2 \). With \( I \) constant, \( U \propto L \). So \( U \) becomes \( 4U \).
- Step 3: Alternatively, using field approach: \( B = \mu_0 n I \), so \( B \) doubles. Energy density \( u = B^2/(2\mu_0) \) quadruples. Volume unchanged, so total energy quadruples.
- Step 4: The claim is correct. The student must distinguish between changing \( N \) (geometry) vs changing \( I \) (current).

ANSWER: Yes, the claim is correct. Doubling turns quadruples inductance (\( L \propto N^2 \)) and thus quadruples stored energy at the same current.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a physics lab, two students argue about the energy stored in an inductor when the current is alternating: \( I(t) = I_0 \sin(\omega t) \). Student A says the average stored energy over a cycle is \( \frac{1}{4} L I_0^2 \). Student B says it is \( \frac{1}{2} L I_0^2 \). Who is correct? Derive the average magnetic energy and explain the physical meaning.

COMPETENCY: Interpreting physical situations using calculus and time averages.

STEPS:
- Step 1: Instantaneous energy \( U(t) = \frac{1}{2} L I(t)^2 = \frac{1}{2} L I_0^2 \sin^2(\omega t) \).
- Step 2: Average over one period \( T = 2\pi/\omega \): \( \langle U \rangle = \frac{1}{T} \int_0^T \frac{1}{2} L I_0^2 \sin^2(\omega t) dt \).
- Step 3: Use \( \sin^2(\omega t) = \frac{1}{2}(1 - \cos 2\omega t) \). Integral of \( \cos 2\omega t \) over a period is zero. So \( \langle \sin^2 \rangle = 1/2 \).
- Step 4: \( \langle U \rangle = \frac{1}{2} L I_0^2 \times \frac{1}{2} = \frac{1}{4} L I_0^2 \). Student A is correct.
- Step 5: Physical meaning: The energy oscillates between 0 and \( \frac{1}{2} L I_0^2 \) twice per cycle. The average is half the peak. The inductor stores energy during quarter-cycles and returns it to the source in the next quarter-cycle; net energy flow per cycle is zero (ideal inductor).

ANSWER: Student A is correct. Average stored energy = \( \frac{1}{4} L I_0^2 \). The energy oscillates at twice the current frequency, averaging to half the peak value.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This energy is the work done by the external source against the back emf to ______ the current from zero to its final value, assuming no resistive losses.

## DIAGNOSTIC_ANSWER_7
establish

The establish verb is the journey: current raised from nothing against the back emf is what fills the magnetic storeroom. **A wrong answer (maintain) reveals the student has paid for a standing current when the definition bills the building of it.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ceiling fan starting slowly when switched on — the motor windings act as ______ opposing the sudden current rise.

## DIAGNOSTIC_ANSWER_8
inductors

The inductors name the resisting parts: the windings' own magnetism is the inertia the supply must overcome. **A wrong answer (resistors) reveals the student has blamed ordinary resistance for a delay that only inductance explains.** The inductors name the resisting parts: the windings' own magnetism is the inertia the supply must push through.
