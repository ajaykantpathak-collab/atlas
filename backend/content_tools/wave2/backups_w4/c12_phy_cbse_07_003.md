## ELI5
A tube-light's choke and a fan's winding are inductors, and on AC they oppose without burning: inductive reactance X-L equals omega L, growing with frequency, born of the back emf that resists every change of current. The current lags the voltage by ninety degrees, peaks at v-m over X-L, and the average power over a cycle is zero - the inductor borrows energy while the field builds and returns it as the field collapses.

## DEFINITION
Inductive reactance (\(X_L\)) is the opposition offered by a pure inductor to the flow of alternating current, arising from the self-induced back emf that opposes changes in current. It is measured in ohms (Ω) and given by \(X_L = \omega L = 2\pi f L\), where \(\omega\) is the angular frequency (rad/s), \(f\) is the frequency (Hz), and \(L\) is the self-inductance (henry, H). In a purely inductive AC circuit, the current lags the applied voltage by \(\pi/2\) radians (90°), and the average power consumed over a full cycle is zero.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to (1) calculate inductive reactance for given inductance and frequency, (2) determine the rms and peak current in a pure inductive circuit, (3) write the instantaneous current equation showing the correct phase lag of \(\pi/2\), (4) draw the phasor diagram for voltage and current, and (5) explain why the average power is zero despite non-zero current and voltage.

## SCOPE_BOUNDARY
This node covers only a pure inductor connected to an AC source (negligible resistance). It includes the derivation of current from Kirchhoff's loop rule, the concept of inductive reactance, phasor representation, and power analysis. It does NOT cover RL series circuits, LCR circuits, resonance, or transformers — those are treated in subsequent nodes (c12_phy_cbse_07_005, c12_phy_cbse_07_006, c12_phy_cbse_07_009).

## WALKTHROUGH
Observe a ceiling fan motor winding or a fluorescent tube choke — both are coils of wire that behave as inductors. When you switch them on with AC mains (220 V, 50 Hz), they don't burn out like a heater coil because they store energy in a magnetic field and return it to the source. To analyse this, start by writing the AC voltage as \(v = v_m \sin \omega t\). Apply Kirchhoff's loop rule: the sum of potential differences around the loop is zero, so \(v - L \frac{di}{dt} = 0\). This differential equation comes directly from Faraday's law of self-induction (Class 12 Chapter 6). Integrate \(\frac{di}{dt} = \frac{v_m}{L} \sin \omega t\) to get the current, using the trigonometric identity \(\int \sin \omega t \, dt = -\frac{1}{\omega} \cos \omega t\) and converting cosine to sine with a phase shift. The integration constant is zero because the AC source drives a symmetric oscillation about zero. The result is \(i = i_m \sin(\omega t - \pi/2)\) with \(i_m = v_m / (\omega L)\). The quantity \(\omega L\) acts exactly like a resistance and is defined as inductive reactance \(X_L\). This formula \(X_L = \omega L\) is the cornerstone for all inductive AC circuit analysis.

Takeaway first: reactance is opposition without dissipation - the inductor stores and returns, the ninety-degree lag making the average power exactly zero. Exam moves: reactance computations, current computations with the ninety-degree lag, phasor diagrams, and zero-average-power explanations. Method: rerun the choke - loop rule applied to the coil, the differential equation integrated, the minus cosine re-read as a lagging sine. Check yourself: X-L grows with frequency - a choke that ignores DC strangles high frequencies - and the zero average power is the field's borrowing, never a shortage of current. Drill: compute one reactance at two frequencies and show the average power vanishes by integrating one cycle.

## DIAGNOSTIC_QUESTION_1
What is the formula for inductive reactance? State its SI unit and the physical quantities it depends on.

## DIAGNOSTIC_ANSWER_1
Inductive reactance \(X_L = \omega L = 2\pi f L\). SI unit: ohm (Ω). It depends on angular frequency \(\omega\) (or frequency \(f\)) and self-inductance \(L\). A wrong answer (e.g., \(X_L = 1/\omega L\) or unit as henry) reveals confusion with capacitive reactance or misunderstanding that reactance is a frequency-dependent opposition measured in ohms, not the inductance itself.

## DIAGNOSTIC_QUESTION_2
In a pure inductor connected to an AC source, the current lags the voltage by \(\pi/2\). Explain physically why this phase lag occurs, referencing Lenz's law and the back emf.

## DIAGNOSTIC_ANSWER_2
The applied voltage must overcome the self-induced back emf \(e = -L \frac{di}{dt}\). When the current is increasing, \(\frac{di}{dt} > 0\), so the back emf opposes the applied voltage, causing the current to reach its maximum later than the voltage. The \(\pi/2\) lag arises because the voltage is proportional to the derivative of current (sine → cosine), and cosine lags sine by \(\pi/2\). A wrong answer (e.g., "current leads voltage" or "no phase difference") shows the student has not connected the differential equation \(v = L \frac{di}{dt}\) to the phase relationship, or has confused inductor with capacitor behaviour.

## DIAGNOSTIC_QUESTION_3
A pure inductor of 40 mH is connected to a 220 V, 50 Hz AC supply. Calculate (a) the inductive reactance, (b) the rms current, (c) the peak current, and (d) write the instantaneous current equation if the voltage is \(v = 311 \sin(100\pi t)\) volts.

## DIAGNOSTIC_ANSWER_3
(a) \(X_L = 2\pi f L = 2\pi \times 50 \times 40 \times 10^{-3} = 12.57\ \Omega\).  
(b) \(I_{\text{rms}} = V_{\text{rms}} / X_L = 220 / 12.57 = 17.5\ \text{A}\).  
(c) \(I_m = \sqrt{2} \times I_{\text{rms}} = 1.414 \times 17.5 = 24.7\ \text{A}\).  
(d) \(i = 24.7 \sin(100\pi t - \pi/2)\ \text{A}\).  
A wrong answer in (a) using \(f\) instead of \(\omega\) or missing \(2\pi\) shows unit confusion. An error in (d) with a +\(\pi/2\) phase reveals the student thinks current leads voltage (capacitor behaviour).

## DIAGNOSTIC_QUESTION_4
Two identical inductors are connected to AC sources of different frequencies: \(f_1 = 50\ \text{Hz}\) and \(f_2 = 200\ \text{Hz}\). The rms voltage is the same in both cases. Compare the reactances, rms currents, and the phase differences. Explain the trend.

## DIAGNOSTIC_ANSWER_4
\(X_{L2} = 4 X_{L1}\) because \(X_L \propto f\). \(I_{\text{rms},2} = \frac{1}{4} I_{\text{rms},1}\) because \(I_{\text{rms}} = V_{\text{rms}}/X_L\). The phase difference remains \(\pi/2\) lag in both cases — it is independent of frequency for a pure inductor. A wrong answer claiming phase difference changes with frequency indicates the student confuses the phase angle of an LCR circuit (where \(\tan \phi = (X_L - X_C)/R\)) with the fixed \(\pi/2\) of a pure inductor.

## DIAGNOSTIC_QUESTION_5
A student calculates the average power in a pure inductive circuit as \(P = V_{\text{rms}} I_{\text{rms}} = 220 \times 5 = 1100\ \text{W}\). Identify the error and state the correct average power with justification.

## DIAGNOSTIC_ANSWER_5
The error is using \(P = VI\) without the power factor \(\cos \phi\). For a pure inductor, \(\phi = \pi/2\), so \(\cos \phi = 0\). The correct average power is \(P = V_{\text{rms}} I_{\text{rms}} \cos(\pi/2) = 0\). The instantaneous power oscillates symmetrically positive and negative, meaning energy is stored in the magnetic field during one quarter-cycle and returned to the source in the next. A student who gives a non-zero value has ignored the phase difference and the definition of average power in AC circuits.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a function generator, an inductor, a dual-trace CRO, and a current-measuring resistor to demonstrate that the current through an inductor lags the voltage by 90°. Describe the connections, what you would observe on the CRO, and how you would measure the phase difference.

## DIAGNOSTIC_ANSWER_6
Connect the function generator across the series combination of the inductor and a small current-sensing resistor (e.g., 1 Ω). Channel 1 of the CRO measures the voltage across the inductor (or the source), Channel 2 measures the voltage across the sensing resistor (proportional to current). Set the generator to a sine wave (e.g., 1 kHz, 5 V peak). On the CRO, the Channel 2 waveform (current) will be shifted to the right relative to Channel 1 (voltage) by one-quarter of the period. Measure the time delay \(\Delta t\) between zero crossings; phase difference \(\phi = \omega \Delta t\). A poor answer omits the sensing resistor, uses the wrong CRO channel assignment, or claims the waveforms are in phase.

## COMMON_MISCONCEPTION
Students often believe that because an inductor has reactance (opposition to current), it must dissipate energy like a resistor. They write \(P = I^2 X_L\) or \(P = V I\) and get a non-zero average power. The exact wrong reasoning: "Reactance is like resistance, so it should heat up the inductor." In reality, the back emf stores energy in the magnetic field when current increases and returns it when current decreases — the inductor is an energy storage element, not a dissipative one. This misconception costs marks in both board exams (where they ask "average power in pure inductor is zero") and JEE/NEET (where power factor questions trap students who forget \(\cos \phi = 0\)).

## ON_FAILURE
1. Revisit Faraday's law and self-inductance (Class 12 Chapter 6, Electromagnetic Induction) — focus on the sign of back emf and energy storage in a magnetic field.  
2. Review the integration of \(\sin \omega t\) and the trigonometric identity \(\cos \theta = \sin(\theta + \pi/2)\) (Class 11 Maths: c11_math_cbse_13_010 and c11_math_cbse_03_009).  
3. Perform the CRO experiment described in Diagnostic Question 6 (or simulate it online) to visually confirm the \(\pi/2\) lag and zero average power.  
4. Re-derive the current equation step-by-step from \(v = L \frac{di}{dt}\) without skipping the integration constant argument.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_07_001, c12_phy_cbse_07_002, c11_math_cbse_13_008, c11_math_cbse_13_010, c11_math_cbse_03_009
## PREREQUISITE_REASONS
c12_phy_cbse_07_001: RMS values are needed to connect peak and rms quantities in AC circuit calculations.  
c12_phy_cbse_07_002: The resistor-only circuit establishes the phasor method and the concept of reactance as an analogue to resistance.  
c11_math_cbse_13_008: Derivative from first principles underpins the relation \(v = L \frac{di}{dt}\).  
c11_math_cbse_13_010: Derivatives of trigonometric functions are essential to integrate \(\frac{di}{dt} = \frac{v_m}{L} \sin \omega t\).  
c11_math_cbse_03_009: Sum/difference formulas convert \(-\cos \omega t\) to \(\sin(\omega t - \pi/2)\).

## FORWARD_NODE_IDS
c12_phy_cbse_07_005, c12_phy_cbse_07_006, c12_phy_cbse_07_007, c12_phy_cbse_07_004, c12_phy_cbse_07_008

## FORWARD_REASONS
c12_phy_cbse_07_005: Series LCR impedance \(Z = \sqrt{R^2 + (X_L - X_C)^2}\) directly uses \(X_L\) from this node.  
c12_phy_cbse_07_006: Resonance condition \(X_L = X_C\) requires understanding of both reactances.  
c12_phy_cbse_07_007: Power factor \(\cos \phi = R/Z\) and wattless current concept build on the zero average power in pure inductor.
c12_phy_cbse_07_004: Inductor reactance and phase lag (current lags voltage) are the direct counterpart; comparing the two solidifies the concept of reactance and phase.  
c12_phy_cbse_07_008: Understanding inductive reactance $X_L = \omega L$ and the phase lag of current behind voltage in an inductor is essential to grasp energy storage in magnetic fields.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_13_010, c11_math_cbse_03_009
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: The derivative \(\frac{di}{dt}\) is the mathematical operation linking voltage and current in an inductor.  
c11_math_cbse_13_010: Knowing \(\frac{d}{dt}(\cos \omega t) = -\omega \sin \omega t\) and \(\frac{d}{dt}(\sin \omega t) = \omega \cos \omega t\) is necessary to integrate the differential equation.  
c11_math_cbse_03_009: The identity \(\cos \theta = \sin(\theta + \pi/2)\) (or \(-\cos \theta = \sin(\theta - \pi/2)\)) converts the integrated cosine into a sine with a phase lag.

## CHAIN_DESCRIPTION
c12_phy_cbse_07_001 -> c12_phy_cbse_07_003 -> c12_phy_cbse_07_005

## THIS_FORMULA
\(X_L = \omega L = 2\pi f L\) (Ω); \(i = i_m \sin(\omega t - \pi/2)\) with \(i_m = \frac{v_m}{X_L} = \frac{V_{\text{rms}}}{X_L} \sqrt{2}\); \(P_{\text{avg}} = 0\).

## FORMULA_VARIABLES
\(X_L\) = inductive reactance (Ω); \(\omega\) = angular frequency (rad/s); \(f\) = frequency (Hz); \(L\) = self-inductance (H); \(v_m\) = peak voltage (V); \(i_m\) = peak current (A); \(V_{\text{rms}}\) = rms voltage (V); \(I_{\text{rms}}\) = rms current (A); \(P_{\text{avg}}\) = average power (W).

## FORMULA_UNITS
Ω, rad/s, Hz, H, V, A, W.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_010 | Derivative of sine gives cosine; integration of sine gives negative cosine, leading to the \(\pi/2\) phase shift.  
c11_math_cbse_03_009 | Trigonometric identity \(\sin(\theta - \pi/2) = -\cos \theta\) converts the integrated result into standard sinusoidal form.
## PREREQ_CONCEPT
Faraday's law of electromagnetic induction: a changing current in an inductor produces a back emf \(e = -L \frac{di}{dt}\).

## PREREQ_BEFORE
The student must be able to write the AC voltage as a sinusoidal function, apply Kirchhoff's loop rule, and perform basic integration of trigonometric functions.

## PREREQ_STUCK
Review Class 12 Physics Chapter 6 (Electromagnetic Induction) for self-inductance and back emf, and Class 11 Maths Chapter 13 (Limits and Derivatives) for derivatives/integrals of \(\sin\) and \(\cos\).

## WORKED_EXAMPLE_1
PROBLEM: A pure inductor of 0.12 H is connected to a 220 V, 50 Hz household AC supply. Find (a) the inductive reactance, (b) the rms current, (c) the peak current, and (d) the instantaneous current equation if the supply voltage is \(v = 311 \sin(314 t)\) V.

STEPS:
- Step 1: Identify given quantities: \(L = 0.12\ \text{H}\), \(V_{\text{rms}} = 220\ \text{V}\), \(f = 50\ \text{Hz}\), \(v_m = 311\ \text{V}\), \(\omega = 314\ \text{rad/s}\). To find: \(X_L\), \(I_{\text{rms}}\), \(i_m\), \(i(t)\).
- Step 2: Use \(X_L = \omega L = 2\pi f L\). Check units: \(\omega\) in rad/s, \(L\) in H → Ω.
- Step 3: Compute \(X_L = 314 \times 0.12 = 37.68\ \Omega\). (Using \(\omega = 314\ \text{rad/s}\) from given voltage equation.)
- Step 4: \(I_{\text{rms}} = V_{\text{rms}} / X_L = 220 / 37.68 = 5.84\ \text{A}\).
- Step 5: \(i_m = \sqrt{2} \times I_{\text{rms}} = 1.414 \times 5.84 = 8.26\ \text{A}\).
- Step 6: Current lags voltage by \(\pi/2\): \(i = 8.26 \sin(314 t - \pi/2)\ \text{A}\).

REASONING: The inductor opposes changes in current via back emf, leading to a reactance proportional to frequency. The rms current follows Ohm's law analogue \(I = V/X_L\). The phase lag of \(\pi/2\) is a direct consequence of the differential equation \(v = L \frac{di}{dt}\).

ANSWER: (a) \(X_L = 37.7\ \Omega\), (b) \(I_{\text{rms}} = 5.84\ \text{A}\), (c) \(i_m = 8.26\ \text{A}\), (d) \(i = 8.26 \sin(314 t - \pi/2)\ \text{A}\).

## WORKED_EXAMPLE_2
PROBLEM: An inductor of 25 mH is connected to a 120 V, 60 Hz AC source. (a) Calculate the reactance and rms current. (b) At the instant when the voltage across the inductor is zero and increasing, what is the current? (c) Draw the phasor diagram at that instant.

STEPS:
- Step 1: Given \(L = 25 \times 10^{-3}\ \text{H}\), \(V_{\text{rms}} = 120\ \text{V}\), \(f = 60\ \text{Hz}\). Find \(X_L\), \(I_{\text{rms}}\).
- Step 2: \(\omega = 2\pi f = 2\pi \times 60 = 377\ \text{rad/s}\). \(X_L = \omega L = 377 \times 0.025 = 9.42\ \Omega\).
- Step 3: \(I_{\text{rms}} = 120 / 9.42 = 12.7\ \text{A}\). \(i_m = \sqrt{2} \times 12.7 = 18.0\ \text{A}\).
- Step 4: Voltage equation: \(v = v_m \sin \omega t\) with \(v_m = 120\sqrt{2} = 169.7\ \text{V}\). At the instant when \(v = 0\) and increasing, \(\omega t = 0\) (since \(\sin 0 = 0\) and derivative \(\cos 0 > 0\)).
- Step 5: Current equation: \(i = i_m \sin(\omega t - \pi/2)\). At \(\omega t = 0\), \(i = 18.0 \sin(-\pi/2) = -18.0\ \text{A}\) (negative peak).
- Step 6: Phasor diagram: Voltage phasor \(V\) along +x-axis (since \(\omega t = 0\)). Current phasor \(I\) lags by 90°, so it points along -y-axis (negative peak).

REASONING: The phasor diagram captures the phase relationship at a specific instant. When voltage is zero and increasing, its phasor is along the positive x-axis. The current phasor, lagging by 90°, points along the negative y-axis, corresponding to the negative peak current.

ANSWER: (a) \(X_L = 9.42\ \Omega\), \(I_{\text{rms}} = 12.7\ \text{A}\). (b) Current = -18.0 A (negative peak). (c) Phasor diagram: V on +x-axis, I on -y-axis.

## WORKED_EXAMPLE_3
PROBLEM: A 0.5 H inductor is connected to a 240 V, 50 Hz AC supply. (a) Find the maximum energy stored in the magnetic field of the inductor during a cycle. (b) If the frequency is doubled to 100 Hz with the same rms voltage, how does the maximum stored energy change? (c) Explain why the average power remains zero in both cases.

STEPS:
- Step 1: Given \(L = 0.5\ \text{H}\), \(V_{\text{rms}} = 240\ \text{V}\), \(f = 50\ \text{Hz}\). Find maximum magnetic energy \(U_{\text{max}} = \frac{1}{2} L i_m^2\).
- Step 2: Compute \(X_L = 2\pi f L = 2\pi \times 50 \times 0.5 = 157\ \Omega\).
- Step 3: \(I_{\text{rms}} = V_{\text{rms}} / X_L = 240 / 157 = 1.53\ \text{A}\).
- Step 4: \(i_m = \sqrt{2} \times 1.53 = 2.16\ \text{A}\).
- Step 5: \(U_{\text{max}} = \frac{1}{2} \times 0.5 \times (2.16)^2 = 1.17\ \text{J}\).
- Step 6: For \(f = 100\ \text{Hz}\), \(X_L\) doubles to 314 Ω. \(I_{\text{rms}}\) halves to 0.765 A. \(i_m\) halves to 1.08 A.
- Step 7: New \(U_{\text{max}} = \frac{1}{2} \times 0.5 \times (1.08)^2 = 0.292\ \text{J}\) — one-fourth of original.
- Step 8: Average power is zero because the inductor stores energy during quarter-cycles when \(vi > 0\) and returns it when \(vi < 0\). The integral of \(vi\) over a full cycle is zero regardless of frequency.

REASONING: Maximum stored energy depends on peak current squared. Since \(i_m \propto 1/f\), doubling frequency reduces peak current by half and energy by factor of 4. The zero average power is a fundamental property of pure reactive elements — energy oscillates between source and magnetic field with no net dissipation.

ANSWER: (a) \(U_{\text{max}} = 1.17\ \text{J}\). (b) At 100 Hz, \(U_{\text{max}} = 0.292\ \text{J}\) (decreases by factor of 4). (c) Average power is zero because energy is alternately stored and returned, not dissipated.

## COMPETENCY_QUESTION_1
QUESTION: A pure inductor is connected to an AC source of fixed rms voltage. If the frequency of the source is increased gradually from 10 Hz to 1000 Hz, describe how the following quantities change: (i) inductive reactance, (ii) rms current, (iii) phase difference between voltage and current, (iv) maximum energy stored in the inductor. Justify each answer.

COMPETENCY: Predicting outcomes from changing variables

STEPS:
- Step 1: Recall \(X_L = 2\pi f L\) → directly proportional to \(f\).
- Step 2: \(I_{\text{rms}} = V_{\text{rms}} / X_L\) → inversely proportional to \(f\).
- Step 3: Phase difference for pure inductor is always \(\pi/2\) lag, independent of \(f\).
- Step 4: Maximum energy \(U_{\text{max}} = \frac{1}{2} L i_m^2 = \frac{1}{2} L (\sqrt{2} I_{\text{rms}})^2 = L I_{\text{rms}}^2 \propto 1/f^2\).

ANSWER: (i) \(X_L\) increases linearly with frequency. (ii) \(I_{\text{rms}}\) decreases as \(1/f\). (iii) Phase difference remains constant at 90° (current lags voltage). (iv) Maximum stored energy decreases as \(1/f^2\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A student connects a 10 mH inductor to a 220 V, 50 Hz supply and measures the rms current as 15 A. He then calculates the average power as \(P = V_{\text{rms}} I_{\text{rms}} = 3300\ \text{W}\) and claims the inductor dissipates this much power. (a) Identify the conceptual error in the student's calculation. (b) Calculate the correct average power. (c) If a resistor of 10 Ω is connected in series with the same inductor across the same supply, will the average power be zero? Explain.

COMPETENCY: Interpreting physical situations using formulas and identifying errors

STEPS:
- Step 1: The student used \(P = VI\) without power factor \(\cos \phi\). For pure inductor, \(\phi = 90^\circ\), so \(\cos \phi = 0\).
- Step 2: Correct average power \(P = V_{\text{rms}} I_{\text{rms}} \cos \phi = 0\).
- Step 3: With a series resistor, the circuit is no longer purely inductive. The phase angle \(\phi = \tan^{-1}(X_L/R)\) is less than 90°, so \(\cos \phi > 0\). Power is dissipated only in the resistor: \(P = I_{\text{rms}}^2 R\).

ANSWER: (a) The student ignored the phase difference; the formula \(P = VI\) is valid only for in-phase voltage and current (resistive load). (b) Correct average power = 0 W. (c) No, average power will not be zero. The resistor dissipates power \(P = I_{\text{rms}}^2 R\). The inductor still consumes zero average power, but the resistor converts electrical energy to heat.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe a ceiling fan motor winding or a fluorescent tube choke — both are coils of wire that behave as ______.

## DIAGNOSTIC_ANSWER_7
inductors

The inductors complete the observation: winding and choke are the same physics in two household costumes. **A wrong answer (resistors) reveals the student has swapped the storing components for dissipating ones and changed the average power's fate.**

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Inductive reactance (\(X_L\))?

## DIAGNOSTIC_ANSWER_8
Students often believe that because an inductor has reactance (opposition to current), it must dissipate energy like a resistor.

The flagged error equates opposition with spending: reactance resists the change while returning every joule the field borrowed. **A wrong answer computing average power by I squared X-L reveals the student has fed reactance into a resistor's formula - the squared current heats nothing here.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe a ceiling fan motor winding or a ______ tube choke — both are coils of wire that behave as inductors.

## DIAGNOSTIC_ANSWER_9
fluorescent

The fluorescent word completes the choke's job title: the tube's starting partner is the coil the walkthrough dissects. **A wrong answer (an LED) reveals the student has modernised the fitting away from the inductive ballast the lesson analyses.**
