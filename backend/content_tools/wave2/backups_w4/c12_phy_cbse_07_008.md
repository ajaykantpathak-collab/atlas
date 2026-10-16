## ELI5
Strike a tuning fork and it rings at its own pitch; charge a capacitor and wire it to a coil, and the circuit rings at its own frequency - one over root L C. LC oscillations are energy's pendulum: the capacitor's field drains into the inductor's field, current peaks as the capacitor empties, then the flow reverses and refills the capacitor upside down. Charge, current and both energies swing sinusoidally, trading places twice per cycle.

## DEFINITION
LC oscillations are the periodic exchange of energy between a capacitor (storing electrical energy in its electric field) and an inductor (storing magnetic energy in its magnetic field) in an ideal LC circuit with zero resistance. The charge, current, and energy vary sinusoidally with time at a natural angular frequency $\omega = \frac{1}{\sqrt{LC}}$, where $L$ is the inductance (henry, H) and $C$ is the capacitance (farad, F).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) Explain the energy transfer mechanism between capacitor and inductor using conservation of energy; (2) Derive and apply the angular frequency formula $\omega = 1/\sqrt{LC}$ to calculate oscillation frequency; (3) Sketch qualitative graphs of charge $q(t)$, current $i(t)$, capacitor energy $U_C(t)$, and inductor energy $U_L(t)$ showing their phase relationships; (4) Draw the analogy between LC oscillations and a mass-spring mechanical oscillator.

## SCOPE_BOUNDARY
This node covers: ideal LC circuit (no resistance), qualitative description of undamped oscillations, energy conservation, angular frequency formula $\omega = 1/\sqrt{LC}$, and mechanical analogy. It does NOT cover: damped oscillations (RLC), forced oscillations, numerical solution of differential equations, phase diagrams, or quantitative energy distribution at arbitrary times beyond qualitative reasoning.

## WALKTHROUGH
Observe a tuning fork vibrating in air — it oscillates at a natural frequency determined by its stiffness and mass. Similarly, in your school physics lab, if you charge a capacitor and connect it to an inductor, the circuit "rings" electrically. Begin by recalling that a capacitor stores energy $U_C = \frac{1}{2}CV^2 = \frac{q^2}{2C}$ (Class 12 Electrostatics) and an inductor stores energy $U_L = \frac{1}{2}LI^2$ (Class 12 Electromagnetic Induction). When the charged capacitor is connected to the inductor, the electric field energy converts to magnetic field energy and back, creating oscillations. The governing differential equation $\frac{d^2q}{dt^2} + \frac{1}{LC}q = 0$ is identical to the mass-spring equation $\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$, yielding the natural angular frequency $\omega = \frac{1}{\sqrt{LC}}$.

Takeaway first: LC oscillations are the mass-spring system in electrical costume - q obeying the same differential equation, L playing the mass, one over C the spring constant. Exam moves: energy-transfer explanation questions, frequency-computation questions, graph questions sketching q, i and the two energies with phases, and analogy questions mapping mechanical parts to electrical ones. Method: rerun the ringing circuit - charged capacitor connected, current building as field energy converts, reversal at the empty capacitor, the cycle repeating. Check yourself: the two energies are always complementary - when one is maximum the other is zero - and their sum is constant only in the ideal zero-resistance circuit the definition insists on. Drill: derive the frequency once and sketch all four graphs over one period.

## DIAGNOSTIC_QUESTION_1
Define LC oscillations and state the formula for the angular frequency of oscillation in an ideal LC circuit. What are the SI units of the quantities in the formula?

## DIAGNOSTIC_ANSWER_1
LC oscillations are the periodic exchange of energy between a capacitor and an inductor in a zero-resistance circuit. The angular frequency is $\omega = \frac{1}{\sqrt{LC}}$, where $L$ is in henry (H), $C$ is in farad (F), and $\omega$ is in rad/s. A wrong answer (e.g., $\omega = \sqrt{LC}$ or $\omega = LC$) reveals the student has not understood the dimensional consistency: $[LC] = T^2$, so $1/\sqrt{LC}$ has dimension $T^{-1}$, matching angular frequency.

## DIAGNOSTIC_QUESTION_2
In an LC circuit, the capacitor is initially fully charged. When the capacitor discharges completely ($q = 0$), a student claims the current must also be zero because "no charge means no current." Is this correct? Explain using energy conservation.

## DIAGNOSTIC_ANSWER_2
The student is incorrect. At $q = 0$, the capacitor's electric energy is zero. By energy conservation, all energy is stored in the inductor's magnetic field: $U_{total} = \frac{1}{2}LI_{max}^2$. Thus current is **maximum** at $q = 0$. The student confuses instantaneous charge $q$ with current $i = dq/dt$; just as a mass at equilibrium position ($x=0$) has maximum speed in SHM, the capacitor at zero charge has maximum current. A wrong answer reveals confusion between the state variable (charge) and its rate of change (current).

## DIAGNOSTIC_QUESTION_3
A $30\,\mu\text{F}$ capacitor charged to $100\,\text{V}$ is connected across a $27\,\text{mH}$ inductor. Calculate: (a) the angular frequency of oscillations, (b) the maximum current in the circuit, and (c) the total energy oscillating in the circuit.

## DIAGNOSTIC_ANSWER_3
**Given:** $C = 30 \times 10^{-6}\,\text{F}$, $L = 27 \times 10^{-3}\,\text{H}$, $V_{max} = 100\,\text{V}$.
**Step 1:** $\omega = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{(27 \times 10^{-3})(30 \times 10^{-6})}} = \frac{1}{\sqrt{8.1 \times 10^{-7}}} = \frac{1}{9 \times 10^{-4}} \approx 1111\,\text{rad/s}$.
**Step 2:** Total energy $U = \frac{1}{2}CV_{max}^2 = \frac{1}{2}(30 \times 10^{-6})(100)^2 = 0.15\,\text{J}$.
**Step 3:** At maximum current, $U = \frac{1}{2}LI_{max}^2 \Rightarrow I_{max} = \sqrt{\frac{2U}{L}} = \sqrt{\frac{0.3}{27 \times 10^{-3}}} = \sqrt{11.11} \approx 3.33\,\text{A}$.
**Answers:** (a) $1111\,\text{rad/s}$, (b) $3.33\,\text{A}$, (c) $0.15\,\text{J}$. A wrong answer in (a) often comes from unit errors (using $\mu\text{F}$ and $\text{mH}$ without converting to base units). In (b), forgetting the factor of 2 in energy equations is common.

## DIAGNOSTIC_QUESTION_4
Sketch qualitative graphs (no numerical axes) of charge $q(t)$, current $i(t)$, capacitor energy $U_C(t)$, and inductor energy $U_L(t)$ for one full cycle of an LC oscillation starting from maximum capacitor charge. Label the phase difference between $q(t)$ and $i(t)$.

## DIAGNOSTIC_ANSWER_4
- $q(t)$: Cosine wave starting at $+Q_{max}$.
- $i(t)$: Negative sine wave (since $i = dq/dt$, current leads charge by $-\pi/2$ or lags by $\pi/2$ depending on sign convention; here $i$ is zero at $t=0$ and becomes negative as capacitor discharges).
- $U_C(t) \propto q^2$: Always positive, frequency doubled, maxima at $q = \pm Q_{max}$, zero at $q=0$.
- $U_L(t) \propto i^2$: Always positive, frequency doubled, maxima when $i = \pm I_{max}$ (i.e., $q=0$), zero when $i=0$ (i.e., $q = \pm Q_{max}$).
- $U_C$ and $U_L$ are out of phase by $\pi$ (when one is max, other is min). A wrong graph showing $U_C$ and $U_L$ in phase reveals the student thinks both energies peak together, violating energy conservation.

## DIAGNOSTIC_QUESTION_5
A student argues: "In a real LC circuit, the oscillations eventually die out, so the total energy is not conserved. Therefore, the ideal LC oscillation model is useless." Evaluate this statement.

## DIAGNOSTIC_ANSWER_5
The statement is **partially correct but misleading**. Real circuits have resistance (wire resistance, inductor winding resistance), causing energy dissipation as heat ($I^2R$), so oscillations are damped. However, the *ideal* LC model (zero resistance) is the foundation for understanding resonance, tuning circuits, and the undamped natural frequency $\omega_0 = 1/\sqrt{LC}$. It is not "useless" — it is the limiting case that defines the resonant frequency of RLC circuits and the operating principle of oscillators. A student calling it useless fails to appreciate the role of idealized models in physics (like frictionless planes in mechanics).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment to demonstrate LC oscillations using a capacitor, an inductor, a DC source, a switch, and an oscilloscope (or a galvanometer with a high-frequency response). Describe the procedure, what you would observe on the oscilloscope, and how you would verify the formula $\omega = 1/\sqrt{LC}$.

## DIAGNOSTIC_ANSWER_6
**Procedure:** (1) Charge capacitor $C$ using DC source via switch. (2) Open switch to disconnect source. (3) Immediately close switch to connect $C$ across $L$. (4) Observe voltage across $C$ on oscilloscope. **Observation:** Damped sinusoidal voltage waveform. Measure period $T$ from zero crossings; compute $\omega_{exp} = 2\pi/T$. **Verification:** Repeat with different $C$ or $L$ values; plot $\omega_{exp}$ vs $1/\sqrt{LC}$ — should be a straight line through origin with slope 1. A poor answer would omit the need to disconnect the DC source before connecting to $L$, or would not mention measuring period from the oscilloscope trace.

## COMMON_MISCONCEPTION
**Misconception:** "When the capacitor is fully discharged ($q=0$), the current in the circuit is zero because there is no charge to flow." **Why it's wrong:** This confuses charge $q$ (the *amount* of separated charge on capacitor plates) with current $i = dq/dt$ (the *rate of flow* of charge). At $q=0$, the capacitor voltage is zero, but the inductor has stored maximum magnetic energy $\frac{1}{2}LI_{max}^2$ and strongly opposes the *decrease* of current. The current is maximum at this instant, just as a mass passing through equilibrium ($x=0$) in a spring-mass system has maximum speed. The inductor's back-emf $L(di/dt)$ is zero at peak current, but the current itself is not zero.

## ON_FAILURE
If the student holds this misconception: (1) Revisit the mass-spring analogy: at $x=0$, $v = v_{max}$; map $x \leftrightarrow q$, $v \leftrightarrow i$, $k \leftrightarrow 1/C$, $m \leftrightarrow L$. (2) Write the energy conservation equation: $\frac{q^2}{2C} + \frac{1}{2}Li^2 = \text{constant}$. Set $q=0$ and solve for $i$. (3) Perform the "LC circuit simulation" thought experiment: start with charged capacitor, zero current. As capacitor discharges, current *builds up* due to inductor's opposition to change. By the time $q=0$, current has reached its peak. (4) Re-attempt Diagnostic Question 2.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_07_003, c12_phy_cbse_07_004, c11_phy_cbse_13_002, c11_phy_cbse_05_008, c11_phy_cbse_05_004, c12_phy_cbse_07_006, c12_phy_cbse_07_007, c11_phy_cbse_13_004

## PREREQUISITE_REASONS
c12_phy_cbse_07_003: Understanding inductive reactance $X_L = \omega L$ and the phase lag of current behind voltage in an inductor is essential to grasp energy storage in magnetic fields.
c12_phy_cbse_07_004: Understanding capacitive reactance $X_C = 1/\omega C$ and the phase lead of current ahead of voltage in a capacitor is essential to grasp energy storage in electric fields.
c11_phy_cbse_13_002: The definition and mathematical description of Simple Harmonic Motion (SHM) provides the direct analogy: LC oscillations are the electrical equivalent of SHM.
c11_phy_cbse_05_008: Potential energy of a spring ($\frac{1}{2}kx^2$) is the mechanical analog of capacitor energy ($\frac{q^2}{2C}$).
c11_phy_cbse_05_004: Kinetic energy ($\frac{1}{2}mv^2$) is the mechanical analog of inductor energy ($\frac{1}{2}Li^2$).
c12_phy_cbse_07_006: LC oscillations are the R→0 limit of LCR resonance; qualitative treatment builds on resonance frequency formula.  
c12_phy_cbse_07_007: LC oscillations involve energy exchange between inductor and capacitor with zero average power dissipation — extends the wattless current concept to free oscillations.  
c11_phy_cbse_13_004: Revisit the energy formulas for capacitor and inductor from Class 12 Electrostatics and Electromagnetic Induction chapters, and the SHM energy exchange from Class 11 Oscillations chapter (node c11_phy_cbse_13_004).  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the penultimate node in the chapter. The final node (Transformer) does not directly depend on LC oscillations. The concepts of resonance in LCR circuits (nodes c12_phy_cbse_07_005 and c12_phy_cbse_07_006) logically precede LC oscillations in the NCERT flow, but in this node map they are siblings; no further node in this chapter requires LC oscillations as a prerequisite.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives (intuitive idea) are used to formulate the second-order differential equation $\frac{d^2q}{dt^2} + \frac{1}{LC}q = 0$ from Kirchhoff's loop rule.
c11_math_cbse_13_010: Derivatives of trigonometric functions ($\frac{d}{dt}\sin\omega t = \omega\cos\omega t$, $\frac{d}{dt}\cos\omega t = -\omega\sin\omega t$) are used to verify that $q = Q_{max}\cos\omega t$ satisfies the differential equation, yielding $\omega = 1/\sqrt{LC}$.

## CHAIN_DESCRIPTION
c11_phy_cbse_13_002 -> c12_phy_cbse_07_008 -> N/A

## THIS_FORMULA
$\omega = \frac{1}{\sqrt{LC}}$ (rad/s)

## FORMULA_VARIABLES
$\omega$ = angular frequency of oscillation (rad/s), $L$ = inductance (henry, H), $C$ = capacitance (farad, F)

## FORMULA_UNITS
rad/s, H, F

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_006 | Derivatives are used to formulate the differential equation for LC oscillations (d²q/dt² + (1/LC)q = 0)
c11_math_cbse_13_010 | Derivatives of trigonometric functions give the sinusoidal solutions for charge and current in LC oscillations.
## PREREQ_CONCEPT
Energy storage in capacitors ($U_C = q^2/2C$) and inductors ($U_L = \frac{1}{2}Li^2$), and the principle of energy conservation in Simple Harmonic Motion.

## PREREQ_BEFORE
The student must be able to write the energy expressions for a capacitor and an inductor, and understand that in SHM, total energy is constant while energy oscillates between two forms (kinetic and potential).

## PREREQ_STUCK
Revisit the energy formulas for capacitor and inductor from Class 12 Electrostatics and Electromagnetic Induction chapters, and the SHM energy exchange from Class 11 Oscillations chapter (node c11_phy_cbse_13_004).

## WORKED_EXAMPLE_1
PROBLEM: A $30\,\mu\text{F}$ capacitor is charged to $100\,\text{V}$ by a battery. The battery is disconnected, and the capacitor is connected across a $27\,\text{mH}$ inductor. Find (a) the angular frequency of the resulting oscillations, (b) the maximum current in the circuit, and (c) the total energy oscillating in the circuit.
STEPS:
- Step 1: Identify given quantities with units: $C = 30 \times 10^{-6}\,\text{F}$, $L = 27 \times 10^{-3}\,\text{H}$, $V_0 = 100\,\text{V}$. Find $\omega$, $I_{max}$, $U_{total}$.
- Step 2: Use formula $\omega = 1/\sqrt{LC}$. Substitute values: $\omega = 1/\sqrt{(27 \times 10^{-3})(30 \times 10^{-6})} = 1/\sqrt{8.1 \times 10^{-7}} = 1/(9 \times 10^{-4}) = 1111\,\text{rad/s}$.
- Step 3: Total energy initially stored in capacitor: $U_{total} = \frac{1}{2}CV_0^2 = \frac{1}{2}(30 \times 10^{-6})(100)^2 = 0.15\,\text{J}$. This energy remains constant (ideal circuit).
- Step 4: At maximum current, all energy is magnetic: $U_{total} = \frac{1}{2}LI_{max}^2$. Solve for $I_{max} = \sqrt{2U_{total}/L} = \sqrt{0.3/(27 \times 10^{-3})} = \sqrt{11.11} = 3.33\,\text{A}$.
- Step 5: Verify units: $\sqrt{\text{J}/\text{H}} = \sqrt{(\text{kg}\cdot\text{m}^2/\text{s}^2)/(\text{kg}\cdot\text{m}^2/\text{s}^2\cdot\text{A}^2)} = \text{A}$. Check reasonableness: frequency $f = \omega/2\pi \approx 177\,\text{Hz}$, audible range; current $3.33\,\text{A}$ is plausible for lab components.
REASONING: The capacitor's initial electric energy becomes the total energy of the isolated LC system. This energy sloshes between electric and magnetic forms. At the instant the capacitor is fully discharged ($q=0$), the inductor carries maximum current. The angular frequency depends only on $L$ and $C$, not on initial charge.
ANSWER: (a) $1111\,\text{rad/s}$, (b) $3.33\,\text{A}$, (c) $0.15\,\text{J}$

## WORKED_EXAMPLE_2
PROBLEM: In an LC circuit, the maximum charge on the capacitor is $Q_{max} = 200\,\mu\text{C}$. The inductance is $10\,\text{mH}$ and capacitance is $5\,\mu\text{F}$. At the instant when the charge on the capacitor is $q = 100\,\mu\text{C}$, find the magnitude of the current in the circuit.
STEPS:
- Step 1: Given: $Q_{max} = 200 \times 10^{-6}\,\text{C}$, $L = 10 \times 10^{-3}\,\text{H}$, $C = 5 \times 10^{-6}\,\text{F}$, $q = 100 \times 10^{-6}\,\text{C}$. Find $i$.
- Step 2: Total energy $U = \frac{Q_{max}^2}{2C} = \frac{(200 \times 10^{-6})^2}{2 \times 5 \times 10^{-6}} = \frac{4 \times 10^{-8}}{10 \times 10^{-6}} = 4 \times 10^{-3}\,\text{J}$.
- Step 3: Energy at given instant: $U = \frac{q^2}{2C} + \frac{1}{2}Li^2$.
- Step 4: Substitute $q$: $\frac{q^2}{2C} = \frac{(100 \times 10^{-6})^2}{2 \times 5 \times 10^{-6}} = \frac{1 \times 10^{-8}}{10 \times 10^{-6}} = 1 \times 10^{-3}\,\text{J}$.
- Step 5: Magnetic energy at that instant: $\frac{1}{2}Li^2 = U - \frac{q^2}{2C} = 4 \times 10^{-3} - 1 \times 10^{-3} = 3 \times 10^{-3}\,\text{J}$.
- Step 6: Solve for $i$: $i = \sqrt{\frac{2 \times 3 \times 10^{-3}}{10 \times 10^{-3}}} = \sqrt{0.6} = 0.775\,\text{A}$.
REASONING: Energy conservation in an ideal LC circuit requires that the sum of capacitor electric energy and inductor magnetic energy remains constant at all times. Knowing the total energy (from $Q_{max}$) and the instantaneous capacitor energy (from $q$), the difference gives the instantaneous inductor energy, from which current is found.
ANSWER: $0.775\,\text{A}$

## WORKED_EXAMPLE_3
PROBLEM: An LC circuit oscillates at a frequency of $1.0\,\text{kHz}$. If the capacitance is $0.01\,\mu\text{F}$, find the inductance $L$. Also, if the maximum current in the circuit is $2.0\,\text{A}$, find the maximum charge $Q_{max}$ on the capacitor.
STEPS:
- Step 1: Given: $f = 1000\,\text{Hz}$, $C = 0.01 \times 10^{-6}\,\text{F} = 10^{-8}\,\text{F}$, $I_{max} = 2.0\,\text{A}$. Find $L$ and $Q_{max}$.
- Step 2: Angular frequency $\omega = 2\pi f = 2\pi \times 1000 = 6283\,\text{rad/s}$.
- Step 3: Use $\omega = 1/\sqrt{LC} \Rightarrow L = 1/(\omega^2 C) = 1/((6283)^2 \times 10^{-8}) = 1/(3.95 \times 10^7 \times 10^{-8}) = 1/0.395 = 2.53\,\text{H}$.
- Step 4: Total energy $U = \frac{1}{2}LI_{max}^2 = \frac{1}{2} \times 2.53 \times (2.0)^2 = 5.06\,\text{J}$.
- Step 5: Also $U = \frac{Q_{max}^2}{2C} \Rightarrow Q_{max} = \sqrt{2UC} = \sqrt{2 \times 5.06 \times 10^{-8}} = \sqrt{1.012 \times 10^{-7}} = 3.18 \times 10^{-4}\,\text{C} = 318\,\mu\text{C}$.
- Step 6: Check consistency: $\omega = 1/\sqrt{LC} = 1/\sqrt{2.53 \times 10^{-8}} = 1/(1.59 \times 10^{-4}) = 6283\,\text{rad/s}$ ✓.
REASONING: The resonant frequency fixes the $LC$ product. Once $L$ is found, the maximum current determines the total energy, which then determines the maximum charge on the capacitor. This combines the frequency formula with energy conservation.
ANSWER: $L = 2.53\,\text{H}$, $Q_{max} = 318\,\mu\text{C}$

## COMPETENCY_QUESTION_1
QUESTION: A student constructs an LC circuit using a $100\,\mu\text{F}$ electrolytic capacitor and a $10\,\text{mH}$ inductor. She charges the capacitor to $12\,\text{V}$ using a battery, disconnects the battery, and connects the capacitor to the inductor. She connects an oscilloscope across the capacitor and observes a damped sinusoidal voltage that dies out in about $50\,\text{ms}$. (a) Explain why the oscillations are damped in this real circuit. (b) If she wants to sustain the oscillations indefinitely, what additional component must she add and how should it be connected? (c) Calculate the theoretical undamped angular frequency of this LC combination.
COMPETENCY: Interpreting physical situations using concepts and identifying ideal vs real conditions
STEPS:
- Step 1: Identify that real components have resistance (wire resistance, capacitor ESR, inductor winding resistance) causing $I^2R$ losses.
- Step 2: Recognize that to sustain oscillations, energy must be supplied to compensate losses. An amplifier (active component) with positive feedback (e.g., a transistor oscillator circuit) is needed.
- Step 3: Calculate $\omega = 1/\sqrt{LC}$ using given values.
ANSWER: (a) Real circuits have non-zero resistance (in wires, inductor windings, capacitor equivalent series resistance). This resistance dissipates energy as heat ($I^2R$), causing the oscillation amplitude to decay exponentially (damped oscillations). (b) To sustain oscillations, an active amplifying element (like a transistor or op-amp) with positive feedback must be added to supply energy equal to the resistive losses per cycle. This forms an oscillator circuit (e.g., Hartley, Colpitts). (c) $\omega = 1/\sqrt{(10 \times 10^{-3})(100 \times 10^{-6})} = 1/\sqrt{10^{-6}} = 1000\,\text{rad/s}$.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The total energy in an ideal LC circuit is $U_0$. At a certain instant, the magnetic energy in the inductor is $U_L = U_0/3$. (a) What is the capacitor's electric energy $U_C$ at that instant? (b) What fraction of the maximum charge $Q_{max}$ is the instantaneous charge $q$? (c) What fraction of the maximum current $I_{max}$ is the instantaneous current $i$? (d) Sketch the phasor diagram showing the relationship between $q$ and $i$ at this instant, assuming $q$ is positive and $i$ is positive (charge increasing).
COMPETENCY: Analytical reasoning with energy conservation in oscillatory systems
STEPS:
- Step 1: Apply energy conservation: $U_C + U_L = U_0$.
- Step 2: Find $U_C = U_0 - U_0/3 = 2U_0/3$.
- Step 3: Use $U_C/U_0 = (q/Q_{max})^2$ to find $q/Q_{max}$.
- Step 4: Use $U_L/U_0 = (i/I_{max})^2$ to find $i/I_{max}$.
- Step 4: Draw phasors: $q$ phasor at some angle $\theta$, $i$ phasor leads $q$ by $\pi/2$ (since $i = dq/dt$). For $q$ positive and $i$ positive (increasing $q$), the phase angle $\theta$ is in the 4th quadrant (or $-\pi/2 < \theta < 0$).
ANSWER: (a) $U_C = \frac{2}{3}U_0$. (b) $q/Q_{max} = \sqrt{2/3} \approx 0.816$. (c) $i/I_{max} = \sqrt{1/3} \approx 0.577$. (d) Phasor diagram: $q$ phasor at angle $\theta = -\cos^{-1}(\sqrt{2/3}) \approx -35^\circ$ (or $325^\circ$), $i$ phasor at $\theta + 90^\circ \approx 55^\circ$. Both have positive vertical projections (since $q = Q_{max}\cos\theta > 0$, $i = I_{max}\cos(\theta+90^\circ) = -I_{max}\sin\theta > 0$).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: LC ______ are the periodic exchange of energy between a capacitor (storing electrical energy in its electric field) and an inductor (storing magnetic energy in its magnetic field) in an ideal LC circuit with zero resistance.

## DIAGNOSTIC_ANSWER_7
oscillations

Oscillations is the exchange's name: the definition describes a to-and-fro of energy, not a static storage. **A wrong answer (a transfer) reveals the student has described a one-way journey where the definition demands a round trip.** The oscillations is the definition's headline: the whole node is a to-and-fro of energy between two storerooms.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a tuning fork vibrating in air — it ______ at a natural frequency determined by its stiffness and mass.

## DIAGNOSTIC_ANSWER_8
oscillates

The oscillating verb pairs the fork with the circuit: both ring at frequencies their own parts fix. **A wrong answer (a decaying) reveals the student has emphasised the dying of the note where the definition points at the ringing itself.**

## DIAGNOSTIC_QUESTION_9
What is LC oscillations? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
LC oscillations are the periodic exchange of energy between a capacitor (storing electrical energy in its electric field) and an inductor (storing magnetic energy in its magnetic field) in an ideal LC circuit with zero resistance.

The definition lists the storerooms: electric field in the capacitor, magnetic field in the inductor, trading sinusoidally. **A wrong answer that names resistors reveals the student has filed the ideal circuit's imaginary loss under its definition.**
