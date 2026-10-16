## ELI5
A kettle boils because current fights resistance and the fight is heat: electrical energy dissipated as collisions multiply. Power is that heat's speed - V I, or I squared R, or V squared over R, whichever the circuit hands you - and energy is power times time, billed commercially in kilowatt-hours. High-voltage transmission is the formula's social consequence: push V up, current falls for the same power, and the lines' I-squared-R tax shrinks quadratically.

## DEFINITION
Electrical energy dissipated in a conductor is the work done by the electric field in moving charge carriers through the conductor, which appears as heat due to collisions with ions. Electrical power is the rate at which this energy is dissipated. For a conductor with resistance \(R\) carrying a steady current \(I\) at potential difference \(V\), the power dissipated is \(P = VI = I^2R = V^2/R\). The SI unit of power is the watt (W), and the SI unit of energy is the joule (J); commercial energy is measured in kilowatt-hours (kWh), where 1 kWh = \(3.6 \times 10^6\) J.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate the power dissipated in any resistor in a DC circuit using the appropriate form of \(P = VI = I^2R = V^2/R\), convert between joules and kilowatt-hours for energy consumption, and determine the power loss in transmission lines to explain why high-voltage transmission is used.

## SCOPE_BOUNDARY
This node covers the derivation and application of electrical power formulas for ohmic conductors in DC circuits, energy dissipation as heat, commercial energy units, and the principle of high-voltage power transmission. It does NOT cover AC power (power factor, RMS values), electromagnetic energy storage in inductors/capacitors, or non-ohmic devices (diodes, transistors) — those are in higher-level courses.

## WALKTHROUGH
Observe an electric kettle heating water: the heating element gets hot because current passes through its resistance. The electrical energy supplied by the source is converted into thermal energy. To quantify this, we start with the definition of potential difference: \(V = W/Q\). The work done \(W\) in moving charge \(Q\) across potential difference \(V\) is \(W = VQ\). Since current \(I = Q/t\), the charge moved in time \(t\) is \(Q = It\). Substituting gives \(W = VIt\). Power is work per unit time: \(P = W/t = VI\). Using Ohm's law \(V = IR\), we obtain the alternative forms \(P = I^2R\) and \(P = V^2/R\). This shows that for a given power delivery, increasing voltage reduces current and thus reduces \(I^2R\) losses in transmission lines — which is why power lines operate at hundreds of kilovolts.

Takeaway first: heating is the electron traffic's toll - P equals V I in three costumes - and the transmission lesson is that the toll scales with the current's square, so voltage is raised to keep current small. Exam moves: computation questions across the three power forms, unit-conversion questions between joules and kilowatt-hours, and transmission-loss questions comparing voltages. Method: rerun the kettle - work as V Q, charge as I t, power as V I, then Ohm's law for the costume changes. Check yourself: the transmission voltage is not the line resistance's voltage; the flagged error assigns the sent voltage to the line's own drop and multiplies absurdities. Drill: convert one consumption to joules and compare transmission losses at two voltages for the same delivered power.

## DIAGNOSTIC_QUESTION_1
State the three equivalent formulas for electrical power dissipated in a resistor and give the SI unit of each quantity in the formulas.

## DIAGNOSTIC_ANSWER_1
The three formulas are \(P = VI\), \(P = I^2R\), and \(P = V^2/R\). SI units: \(P\) in watts (W), \(V\) in volts (V), \(I\) in amperes (A), \(R\) in ohms (Ω). A wrong answer (e.g., missing one formula or giving incorrect units like J for power) reveals that the student has not internalised the algebraic equivalence derived from Ohm's law and the definition of power, which is essential for choosing the convenient form in numerical problems.

## DIAGNOSTIC_QUESTION_2
A student argues: "Since \(P = V^2/R\), if I double the voltage across a resistor, the power becomes four times. But from \(P = I^2R\), if I double the voltage, the current also doubles (Ohm's law), so power becomes four times as well. So both formulas agree." Is the student's reasoning correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
Yes, the reasoning is correct. Both formulas are mathematically equivalent via Ohm's law (\(V = IR\)). Substituting \(I = V/R\) into \(P = I^2R\) gives \(P = (V/R)^2 R = V^2/R\). The student correctly identifies that doubling \(V\) doubles \(I\) (for an ohmic resistor), leading to a factor of 4 increase in power in both expressions. A wrong answer (e.g., saying they disagree) reveals a failure to recognise that the formulas are not independent but are linked by Ohm's law, and that the physical situation (ohmic conductor) must be consistent.

## DIAGNOSTIC_QUESTION_3
An electric geyser rated 2000 W, 230 V is used for 1.5 hours daily. Calculate (a) the current drawn by the geyser, (b) its resistance when hot, and (c) the electrical energy consumed in 30 days in kWh and in joules.

## DIAGNOSTIC_ANSWER_3
(a) \(P = VI \Rightarrow I = P/V = 2000/230 = 8.696\) A ≈ 8.70 A.
(b) \(R = V/I = 230/8.696 = 26.45\) Ω ≈ 26.5 Ω. (Alternatively \(R = V^2/P = 230^2/2000 = 26.45\) Ω.)
(c) Energy per day = \(2 \text{ kW} \times 1.5 \text{ h} = 3 \text{ kWh}\). In 30 days = \(90 \text{ kWh}\). In joules: \(90 \times 3.6 \times 10^6 = 3.24 \times 10^8\) J.
A wrong answer (e.g., using \(P = I^2R\) with cold resistance, or forgetting to convert kW to W, or misplacing decimal in kWh to J conversion) reveals confusion about rated values vs. operating values, unit conversion between commercial and SI units, or algebraic manipulation errors.

## DIAGNOSTIC_QUESTION_4
Two identical resistors \(R\) are connected (i) in series and (ii) in parallel across the same battery of voltage \(V\) (negligible internal resistance). Compare the total power dissipated in the two cases. Which case draws more power from the battery? Explain using the appropriate power formula.

## DIAGNOSTIC_ANSWER_4
Series: \(R_{\text{eq}} = 2R\), total power \(P_s = V^2/(2R)\). Parallel: \(R_{\text{eq}} = R/2\), total power \(P_p = V^2/(R/2) = 2V^2/R\). Ratio \(P_p/P_s = 4\). The parallel combination draws four times the power (and current) because the equivalent resistance is lower. Using \(P = V^2/R\) is most direct since \(V\) is the same across the combination in both cases. A wrong answer (e.g., saying series draws more power because current is same, or calculating power per resistor instead of total) reveals misunderstanding of equivalent resistance and the fact that the battery maintains constant voltage, not constant current.

## DIAGNOSTIC_QUESTION_5
A transmission line has a total resistance of 10 Ω. It delivers 1 MW of power to a substation. Calculate the power loss in the line if the transmission voltage is (i) 11 kV and (ii) 220 kV. Comment on the result.

## DIAGNOSTIC_ANSWER_5
Power delivered \(P = 1 \times 10^6\) W. Current \(I = P/V\).
(i) \(V = 11 \times 10^3\) V → \(I = 10^6 / (11 \times 10^3) = 90.9\) A. Power loss \(P_{\text{loss}} = I^2R = (90.9)^2 \times 10 = 82,600\) W = 82.6 kW. Loss fraction = 8.26%.
(ii) \(V = 220 \times 10^3\) V → \(I = 10^6 / (220 \times 10^3) = 4.545\) A. Power loss \(P_{\text{loss}} = (4.545)^2 \times 10 = 206.6\) W. Loss fraction = 0.0207%.
Increasing voltage by 20 times reduces current by 20 times and power loss by 400 times (since \(P_{\text{loss}} \propto I^2 \propto 1/V^2\)). A wrong answer (e.g., using \(P = V^2/R\) with the transmission voltage instead of the voltage drop across the line resistance) reveals the common misconception that the transmission voltage appears across the line resistance, rather than the load.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a 12 V car bulb (rated 21 W), a variable DC power supply (0–15 V), an ammeter, and a voltmeter to verify that the power dissipated in the filament follows \(P = VI\) and that the resistance of the filament changes with temperature. Outline the procedure, measurements, and how you would analyse the data.

## DIAGNOSTIC_ANSWER_6
Procedure: Connect the bulb in series with the ammeter and power supply; connect the voltmeter across the bulb. Vary the supply voltage from 2 V to 12 V in steps of 1 V. At each step, record \(V\) and \(I\). Compute \(P_{\text{measured}} = VI\) and \(R = V/I\). Plot \(P\) vs \(V\) and \(R\) vs \(V\) (or vs \(I\)). Analysis: The \(P\) vs \(V\) curve will be steeper than quadratic because \(R\) increases with temperature (higher \(V\) → higher \(I\) → hotter filament). The \(R\) vs \(V\) graph will show increasing resistance. A poor answer (e.g., not measuring both \(V\) and \(I\) simultaneously, assuming constant resistance, or not plotting) reveals lack of understanding of non-ohmic behaviour of filaments and the need to verify \(P = VI\) experimentally rather than assuming \(P = V^2/R\) with constant \(R\).

## COMMON_MISCONCEPTION
Students often use the transmission voltage \(V_{\text{line}}\) in \(P_{\text{loss}} = V_{\text{line}}^2/R_{\text{line}}\) to calculate power loss in transmission lines, instead of using the voltage drop across the line resistance (\(V_{\text{drop}} = IR_{\text{line}}\)). They treat the high transmission voltage as the voltage across the line's own resistance, leading to absurdly large loss estimates. The correct approach: the transmission voltage is the voltage at the load relative to ground; the line resistance is in series with the load, so the voltage across the line resistance is only a small fraction of the transmission voltage. Always use \(P_{\text{loss}} = I^2R_{\text{line}}\) where \(I = P_{\text{delivered}}/V_{\text{transmission}}\).

## ON_FAILURE
If the student makes the above error: (1) Draw a simple series circuit: source → line resistance \(R_c\) → load \(R\). Label the transmission voltage \(V\) across the load (or source terminals). (2) Write the current \(I = P/V\) using the delivered power and transmission voltage. (3) Show that the voltage across \(R_c\) is \(V_c = IR_c\), which is much smaller than \(V\). (4) Compute loss as \(I^2R_c\) or \(V_c^2/R_c\), never \(V^2/R_c\). (5) Re-attempt Diagnostic Question 5 with this corrected understanding.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_03_001, c12_phy_cbse_03_002, c12_phy_cbse_03_009, c12_phy_cbse_03_010, c10_phy_cbse_01_010, c9_physics_ch4_9, c12_phy_cbse_03_003, c12_phy_cbse_03_004, c12_phy_cbse_03_008

## PREREQUISITE_REASONS
c12_phy_cbse_03_001: Defines electric current \(I\) and its direction, needed for \(P = VI\) and \(P = I^2R\).
c12_phy_cbse_03_002: Ohm's law \(V = IR\) is essential to derive the three power forms and to relate \(V\), \(I\), \(R\).
c12_phy_cbse_03_009: Series/parallel combinations determine equivalent resistance for total power calculations in multi-resistor circuits.
c12_phy_cbse_03_010: EMF and internal resistance affect the terminal voltage and thus the power delivered to the external circuit.
c10_phy_cbse_01_010: Class 10 introduction to \(P = VI\) and heating effect provides the foundational formula and concept.
c9_physics_ch4_9: Class 9 definition of power as work/time and unit watt establishes the dimensional basis.
c12_phy_cbse_03_003: Electrical power dissipation (P = I²R) arises from kinetic energy transferred to lattice during collisions that limit drift velocity.  
c12_phy_cbse_03_004: Power dissipation (I²R) heats resistors, changing R, which in turn changes power — a feedback loop requiring α.  
c12_phy_cbse_03_008: Electrical energy and power — potentiometer measurements of V and I allow verification of P = VI and Joule heating in resistors.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the last node in Chapter 3 (Current Electricity). No further nodes in this chapter depend on it.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c10_math_cbse_04_005
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions — used in instantaneous power \(P = dW/dt\) and in optimisation problems (e.g., maximum power transfer theorem).
c10_math_cbse_04_005: Quadratic formula — used when solving for current or voltage in power equations that become quadratic (e.g., \(P = V^2/R\) with internal resistance leads to quadratic in \(I\)).

## CHAIN_DESCRIPTION
c12_phy_cbse_03_002 -> c12_phy_cbse_03_011 -> N/A

## THIS_FORMULA
\(P = VI = I^2R = V^2/R\) (watts, W); Electrical energy \(W = Pt = VIt = I^2Rt = \frac{V^2}{R}t\) (joules, J); Commercial energy: 1 kWh = \(3.6 \times 10^6\) J.

## FORMULA_VARIABLES
\(P\) = power (W), \(V\) = potential difference across the conductor (V), \(I\) = current through the conductor (A), \(R\) = resistance of the conductor (Ω), \(W\) = electrical energy dissipated (J), \(t\) = time (s).

## FORMULA_UNITS
W, V, A, Ω, J, s, kWh.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | Instantaneous power is the derivative of energy with respect to time; calculus optimisation finds maximum power transfer condition \(R_{\text{load}} = r_{\text{internal}}\).
c10_math_cbse_04_005 | Power equations with internal resistance (e.g., \(P = I^2R\) where \(I = \varepsilon/(R+r)\)) yield quadratic equations in \(R\) or \(I\) when maximising power.
## PREREQ_CONCEPT
Ohm's law (\(V = IR\)) and the definition of current (\(I = Q/t\)) and potential difference (\(V = W/Q\)).

## PREREQ_BEFORE
The student must be able to apply Ohm's law in series/parallel circuits and compute equivalent resistance, and must know the definition of power as work per unit time.

## PREREQ_STUCK
Revisit Ohm's law (c12_phy_cbse_03_002) and series/parallel combinations (c12_phy_cbse_03_009) to ensure you can find the current through and voltage across any resistor in a circuit.

## WORKED_EXAMPLE_1
PROBLEM: An electric immersion heater rated 1500 W, 240 V is used to heat 10 litres of water from 25°C to 75°C. The specific heat capacity of water is 4200 J/kg·K, and the density of water is 1000 kg/m³. Assuming 85% of the electrical energy is transferred to the water, calculate the time required in minutes.
STEPS:
- Step 1: Identify given quantities: \(P_{\text{rated}} = 1500\) W, \(V = 240\) V, \(m = 10 \text{ L} = 10 \text{ kg}\), \(\Delta T = 50\) K, \(c = 4200\) J/kg·K, efficiency \(\eta = 0.85\). Find time \(t\).
- Step 2: Calculate heat energy required by water: \(Q = mc\Delta T = 10 \times 4200 \times 50 = 2.1 \times 10^6\) J.
- Step 3: Electrical energy input needed: \(W_{\text{elec}} = Q/\eta = 2.1 \times 10^6 / 0.85 = 2.4706 \times 10^6\) J.
- Step 4: Use \(W_{\text{elec}} = P_{\text{rated}} \times t\) (since heater operates at rated power at rated voltage). So \(t = W_{\text{elec}} / P_{\text{rated}} = 2.4706 \times 10^6 / 1500 = 1647.1\) s.
- Step 5: Convert to minutes: \(t = 1647.1 / 60 = 27.45\) min. Verify: 1500 W for 27.45 min = 1500 × 1647 = 2.47 MJ, matches.
REASONING: The heater's rated power is the electrical power it consumes at rated voltage. Only a fraction (efficiency) becomes useful heat in the water. The energy balance equates electrical energy input (power × time) to the thermal energy required by the water divided by efficiency.
ANSWER: 27.5 minutes (or 27 min 27 s).

## WORKED_EXAMPLE_2
PROBLEM: A 60 W, 220 V bulb and a 100 W, 220 V bulb are connected in series across a 220 V supply. Which bulb will glow brighter? Calculate the power dissipated in each bulb and the total power drawn from the supply. Assume the filament resistances are constant at their hot values.
STEPS:
- Step 1: Find the hot resistance of each bulb using \(R = V^2/P\). For 60 W bulb: \(R_1 = 220^2/60 = 806.67\) Ω. For 100 W bulb: \(R_2 = 220^2/100 = 484\) Ω.
- Step 2: In series, total resistance \(R_s = R_1 + R_2 = 1290.67\) Ω. Current \(I = V/R_s = 220/1290.67 = 0.1705\) A.
- Step 3: Power in each bulb: \(P_1 = I^2R_1 = (0.1705)^2 \times 806.67 = 23.5\) W. \(P_2 = I^2R_2 = (0.1705)^2 \times 484 = 14.1\) W.
- Step 4: Total power \(P_{\text{total}} = P_1 + P_2 = 37.6\) W (or \(I^2R_s = 37.6\) W).
- Step 5: Compare brightness: brightness ∝ power dissipated. The 60 W bulb dissipates more power (23.5 W vs 14.1 W) and glows brighter.
REASONING: In series, the same current flows through both bulbs. Power dissipated is \(I^2R\). The higher-resistance bulb (lower rated power at same voltage) dissipates more power. This is a classic counter-intuitive result: the "dimmer" rated bulb glows brighter in series.
ANSWER: 60 W bulb glows brighter. \(P_{60} = 23.5\) W, \(P_{100} = 14.1\) W, total power = 37.6 W.

## WORKED_EXAMPLE_3
PROBLEM: A factory receives power at 11 kV through a pair of transmission cables of total resistance 0.5 Ω. The factory's average load is 500 kW at a power factor of 1 (purely resistive). A step-down transformer at the factory reduces the voltage to 440 V for equipment. Calculate: (a) the current in the transmission line, (b) the power loss in the cables, (c) the voltage at the sending end of the transmission line, and (d) the efficiency of transmission.
STEPS:
- Step 1: The load power \(P = 500\) kW at receiving end voltage \(V_r = 11\) kV (since transformer is at factory, transmission is at 11 kV). Current \(I = P/V_r = 500 \times 10^3 / 11 \times 10^3 = 45.45\) A.
- Step 2: Power loss in cables \(P_{\text{loss}} = I^2R = (45.45)^2 \times 0.5 = 1033\) W ≈ 1.03 kW.
- Step 3: Voltage drop across cables \(V_{\text{drop}} = IR = 45.45 \times 0.5 = 22.73\) V. Sending end voltage \(V_s = V_r + V_{\text{drop}} = 11000 + 22.73 = 11022.73\) V ≈ 11.023 kV.
- Step 4: Efficiency \(\eta = P_{\text{delivered}} / P_{\text{sent}} = P / (P + P_{\text{loss}}) = 500 / (500 + 1.033) = 0.9979 = 99.79\%\).
- Step 5: Verify: \(P_{\text{sent}} = V_s I = 11022.73 \times 45.45 = 501.03\) kW, matches \(500 + 1.033\).
REASONING: This combines power transmission concepts with transformer usage. The transmission voltage is the voltage at the load side of the line (11 kV). The current is determined by the load power at that voltage. Losses are \(I^2R\). The sending end voltage is slightly higher to compensate for the line drop. Efficiency is high because of high-voltage transmission.
ANSWER: (a) 45.5 A, (b) 1.03 kW, (c) 11.023 kV, (d) 99.8%.

## COMPETENCY_QUESTION_1
QUESTION: A household has a 2 kW electric kettle, a 1.5 kW geyser, and a 300 W refrigerator. The kettle is used for 30 minutes daily, the geyser for 1 hour daily, and the refrigerator runs continuously (assume it cycles on 50% of the time). If the electricity tariff is ₹6.50 per kWh, calculate the monthly electricity bill (30 days) for these appliances. Also, state one assumption made about the refrigerator's operation.
COMPETENCY: Interpreting physical situations using formulas and unit analysis
STEPS:
- Step 1: Convert all powers to kW: kettle = 2 kW, geyser = 1.5 kW, fridge = 0.3 kW.
- Step 2: Calculate daily energy for each: kettle = 2 × 0.5 = 1 kWh; geyser = 1.5 × 1 = 1.5 kWh; fridge = 0.3 × 24 × 0.5 = 3.6 kWh.
- Step 3: Total daily energy = 1 + 1.5 + 3.6 = 6.1 kWh.
- Step 4: Monthly energy = 6.1 × 30 = 183 kWh.
- Step 5: Cost = 183 × 6.50 = ₹1189.50.
- Step 6: Assumption: The refrigerator's compressor runs at a constant 50% duty cycle (on half the time, off half the time) at its rated power when on.
ANSWER: Monthly bill = ₹1189.50. Assumption: Refrigerator operates at 50% duty cycle at rated power.
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: A battery of emf 12 V and internal resistance 0.5 Ω is connected to a variable load resistor \(R\). (a) Derive the expression for power delivered to the load \(P_L\) as a function of \(R\). (b) Find the value of \(R\) for which \(P_L\) is maximum. (c) Calculate the maximum power. (d) What is the efficiency of power transfer at maximum power? (e) If the load is fixed at 10 Ω, by what percentage does the power delivered fall short of the maximum possible power?
COMPETENCY: Predicting outcomes from changing variables and optimisation using calculus/algebra
STEPS:
- Step 1: Current in circuit \(I = \varepsilon/(R+r) = 12/(R+0.5)\). Power in load \(P_L = I^2R = 144R/(R+0.5)^2\).
- Step 2: For maximum \(P_L\), set \(dP_L/dR = 0\) or use known condition \(R = r\). So \(R = 0.5\) Ω.
- Step 3: \(P_{\text{max}} = \varepsilon^2/(4r) = 12^2/(4 \times 0.5) = 144/2 = 72\) W.
- Step 4: At \(R = r\), efficiency \(\eta = P_L / (P_L + P_r) = I^2R / (I^2R + I^2r) = R/(R+r) = 0.5 = 50\%\).
- Step 5: At \(R = 10\) Ω, \(I = 12/10.5 = 1.1429\) A. \(P_L = I^2R = (1.1429)^2 \times 10 = 13.06\) W. Shortfall = \((72 - 13.06)/72 \times 100\% = 81.9\%\).
ANSWER: (a) \(P_L = 144R/(R+0.5)^2\) W, (b) 0.5 Ω, (c) 72 W, (d) 50%, (e) 81.9% shortfall.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ energy dissipated in a conductor is the work done by the electric field in moving charge carriers through the conductor, which appears as heat due to collisions with ions.

## DIAGNOSTIC_ANSWER_7
Electrical

Electrical is the energy's species: work done by the field on carriers, surfacing as heat in the lattice. **A wrong answer (heat) reveals the student has named the outcome where the definition names the input form being converted.** Electrical is the energy's species: work done by the field on carriers, surfacing as heat in the lattice.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe an electric kettle heating water: the heating element gets hot because current passes through its ______.

## DIAGNOSTIC_ANSWER_8
resistance

The resistance is the kettle's heater: current's struggle through it is the water's boiling, billed as power. **A wrong answer (a fuse) reveals the student has swapped the deliberate heater for a safety part that melts to quit.** The resistance is the kettle's heater: current's struggle through it is the water's boiling, billed as power.

## DIAGNOSTIC_QUESTION_9
What is Electrical energy dissipated in a conductor? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Electrical energy dissipated in a conductor is the work done by the electric field in moving charge carriers through the conductor, which appears as heat due to collisions with ions.

The definition is conversion in motion: field work on carriers becoming lattice heat, quantified per unit time as power. **A wrong answer that stores energy reveals the student has filed the dissipation under capacitors, where energy is kept rather than spent.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Electrical energy dissipated in a conductor?

## DIAGNOSTIC_ANSWER_10
They treat the high transmission voltage as the voltage across the line's own resistance, leading to absurdly large loss estimates.

The flagged error misassigns the voltage: transmission voltage divides across the load and the line, and only the line's small share suffers I-squared-R. **A wrong answer billing the whole transmission voltage to the line's resistance reveals the student has taxed the cargo for the road.**
