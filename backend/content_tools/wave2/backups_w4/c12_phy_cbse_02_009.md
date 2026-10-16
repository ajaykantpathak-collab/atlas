## ELI5
The ceiling fan's little cylinder that coaxes the motor to start is a capacitor: two conductors separated by an insulator, built to hold charge. Capacitance is its appetite - charge stored per volt across it, C equals Q over V, measured in farads. Crucially, the appetite is architectural: shape, size, spacing and the dielectric decide it, while the actual charge and voltage merely fill the fixed proportion - double the charge, double the voltage, ratio unchanged.

## DEFINITION
A capacitor is a system of two conductors separated by an insulating medium (or vacuum) that stores electric charge and energy. The capacitance \(C\) of a capacitor is defined as the ratio of the magnitude of charge \(Q\) on either conductor to the potential difference \(V\) between them: \(C = Q/V\). The SI unit of capacitance is the farad (F), where \(1 \text{ F} = 1 \text{ C/V}\). Capacitance depends only on the geometric configuration (shape, size, separation) of the conductors and the nature of the dielectric medium between them, not on the charge \(Q\) or voltage \(V\) themselves.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) define capacitance precisely using \(C = Q/V\) with correct SI units, (2) explain why capacitance is a geometric property independent of \(Q\) and \(V\), (3) calculate any one of \(C\), \(Q\), or \(V\) given the other two, and (4) predict how capacitance changes when geometry or dielectric is altered (qualitatively, before quantitative formulas).

## SCOPE_BOUNDARY
This node covers: definition of a capacitor, definition and units of capacitance, the proportionality \(Q \propto V\) leading to constant \(C\), and the dependence of \(C\) on geometry and dielectric. It does NOT cover: derivation of capacitance for specific geometries (parallel plate, spherical, cylindrical — see c12_phy_cbse_02_010), combination of capacitors (series/parallel — see c12_phy_cbse_02_011), energy stored in a capacitor (see c12_phy_cbse_02_012), or charging/discharging transients (RC circuits — not in this chapter).

## WALKTHROUGH
Observe a ceiling fan in your home — it has a small cylindrical component (a capacitor) that helps the motor start. When you switch on the fan, the capacitor briefly supplies a surge of charge to create a rotating magnetic field. This is a real-world capacitor storing and releasing charge. To understand it, recall from c12_phy_cbse_02_001 that potential difference \(V\) is work per unit charge. If we place charge \(+Q\) on one conductor and \(-Q\) on another, an electric field appears between them, creating a potential difference \(V\). Coulomb's law and superposition tell us the field (and thus \(V\)) is directly proportional to \(Q\). The constant of proportionality is \(1/C\). We measure \(Q\) in coulombs and \(V\) in volts, giving \(C\) in farads. The key insight: for a given capacitor, doubling \(Q\) doubles \(V\), so \(C\) remains unchanged — it is a property of the physical structure alone.

Takeaway first: C equals Q over V defines an appliance's capacity, not its usage - doubling Q doubles V and the ratio stands still, because geometry and dielectric own the number. Exam moves: definition questions with units, independence questions explaining the geometric origin, arithmetic questions solving for the missing member of the triple, and qualitative questions on how geometry changes capacitance. Method: rerun the fan - charge placed, field raised, voltage proportional, the constant of proportionality named one over C. Check yourself: a farad is enormous by household standards; practical capacitors speak in microfarads and picofarads, so sanity-check magnitudes. Drill: compute one missing member of Q, V, C and predict the effect of halving the plate gap.

## DIAGNOSTIC_QUESTION_1
Define capacitance and state its SI unit. Write the formula relating charge, potential difference, and capacitance.

## DIAGNOSTIC_ANSWER_1
Capacitance \(C\) is the ratio of the magnitude of charge \(Q\) on one conductor to the potential difference \(V\) between the two conductors: \(C = Q/V\). The SI unit is the farad (F), where \(1 \text{ F} = 1 \text{ C/V}\). A wrong answer (e.g., "capacitance is the charge stored" or unit "coulomb") reveals the student confuses the stored charge \(Q\) with the capacity \(C\) to hold that charge per volt.

## DIAGNOSTIC_QUESTION_2
A student says: "If I double the charge on a capacitor, its capacitance doubles because \(C = Q/V\)." Explain why this reasoning is incorrect. What actually happens to \(V\) when \(Q\) is doubled?

## DIAGNOSTIC_ANSWER_2
The reasoning is incorrect because \(C\) is a geometric constant for a given capacitor; it does not depend on \(Q\) or \(V\). From \(C = Q/V\), if \(Q\) is doubled, \(V\) also doubles (since \(V \propto Q\) for a fixed geometry), keeping \(C\) unchanged. A wrong answer (e.g., "V stays the same" or "C doubles") reveals the student treats the formula as a simple algebraic relation without understanding the physical proportionality \(Q \propto V\) implied by Coulomb's law and superposition.

## DIAGNOSTIC_QUESTION_3
A capacitor has a capacitance of \(5.0 \text{ nF}\). When connected to a \(12 \text{ V}\) battery, what is the magnitude of charge on each plate? If the same capacitor is instead connected to a \(6.0 \text{ V}\) battery, what is the new charge? Show unit analysis.

## DIAGNOSTIC_ANSWER_3
Given \(C = 5.0 \text{ nF} = 5.0 \times 10^{-9} \text{ F}\).
Case 1: \(V = 12 \text{ V}\). \(Q = C V = (5.0 \times 10^{-9} \text{ F}) \times (12 \text{ V}) = 6.0 \times 10^{-8} \text{ C} = 60 \text{ nC}\).
Case 2: \(V = 6.0 \text{ V}\). \(Q = (5.0 \times 10^{-9}) \times 6.0 = 3.0 \times 10^{-8} \text{ C} = 30 \text{ nC}\).
Unit analysis: \(\text{F} \times \text{V} = (\text{C/V}) \times \text{V} = \text{C}\). A wrong answer (e.g., forgetting to convert nF to F, or getting 60 C) reveals unit conversion errors or misunderstanding that \(Q\) scales linearly with \(V\).

## DIAGNOSTIC_QUESTION_4
Two identical parallel-plate capacitors are built. Capacitor A has air between plates; Capacitor B has a dielectric with constant \(K = 4\) filling the space. Both are given the same charge \(Q\). Compare their potential differences \(V_A\) and \(V_B\). Which capacitor has higher capacitance?

## DIAGNOSTIC_ANSWER_4
Since \(C = Q/V\) and \(Q\) is the same, \(V \propto 1/C\). The dielectric increases capacitance by factor \(K\): \(C_B = K C_A = 4 C_A\). Therefore \(V_B = V_A / 4\). Capacitor B has higher capacitance (4 times) and lower potential difference (1/4) for the same charge. A wrong answer (e.g., "V_B = V_A" or "C_B = C_A") reveals the student does not grasp that dielectric reduces the effective field for the same free charge, thus reducing \(V\) and increasing \(C\).

## DIAGNOSTIC_QUESTION_5
Evaluate the statement: "A single isolated metal sphere cannot have capacitance because a capacitor requires two conductors." Is this true or false? Justify your answer using the definition of capacitance and the concept of potential at infinity.

## DIAGNOSTIC_ANSWER_5
False. A single isolated conductor can be treated as a capacitor with the second conductor at infinity (where potential is defined as zero). The capacitance of an isolated sphere of radius \(R\) is \(C = 4\pi\varepsilon_0 R\). The definition \(C = Q/V\) still holds, where \(V\) is the potential of the sphere relative to infinity. A wrong answer ("true") reveals the student thinks capacitance strictly requires two physical plates, missing the conceptual extension to infinity used in electrostatics.

## DIAGNOSTIC_QUESTION_6
Design a simple capacitor using household materials (aluminum foil, paper, plastic wrap) that can store enough charge to light a small LED briefly when discharged. Describe how you would increase its capacitance without changing the materials.

## DIAGNOSTIC_ANSWER_6
A good answer: Use two sheets of aluminum foil separated by paper (dielectric). Roll them into a cylinder to increase effective area \(A\) and decrease separation \(d\) (thin paper). Capacitance \(C \propto A/d\). To increase \(C\) without new materials: (1) use larger foil sheets (increase \(A\)), (2) use thinner paper (decrease \(d\)), (3) add more layers (effectively parallel combination). A poor answer (e.g., "add more charge" or "use a higher voltage battery") reveals confusion between changing \(C\) (geometry) vs changing \(Q\) or \(V\).

## COMMON_MISCONCEPTION
Students often believe capacitance \(C\) depends on the charge \(Q\) or voltage \(V\) because the formula \(C = Q/V\) contains those variables. They write: "If \(Q\) increases, \(C\) increases." This is wrong because \(C\) is a constant for a given physical capacitor; \(Q\) and \(V\) are proportional (\(Q \propto V\)). The misconception arises from treating the defining equation as a causal relationship rather than a proportionality constant. Another error: thinking the net charge on a capacitor is \(Q\) (it is zero; one plate has \(+Q\), the other \(-Q\)). A third error: assuming a capacitor "stores charge" like a container stores water — it actually stores energy in the electric field between plates while maintaining zero net charge.

## ON_FAILURE
If the student cannot distinguish \(C\) from \(Q\) or \(V\):
1. Revisit c12_phy_cbse_02_001 (Electrostatic Potential) to reinforce that \(V \propto Q\) for a fixed geometry.
2. Revisit c12_phy_cbse_02_007 (Conductors and Insulators) to recall that conductors are equipotential surfaces.
3. Perform a PhET simulation "Capacitor Lab: Basics" — vary voltage, observe charge, compute \(C = Q/V\) at each step to see it constant.
4. Practice: "A 10 μF capacitor is charged to 20 V. What is Q? Now the same capacitor is charged to 40 V. What is Q? Did C change?" Repeat until the constancy of \(C\) is intuitive.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_02_001, c12_phy_cbse_02_007, c12_phy_cbse_02_008, c10_phy_cbse_01_002, c12_phy_cbse_02_004

## PREREQUISITE_REASONS
c12_phy_cbse_02_001: Defines electrostatic potential and potential difference \(V\), which is the denominator in \(C = Q/V\).
c12_phy_cbse_02_007: Explains conductors as equipotential surfaces and charge distribution, essential for understanding the two conductors in a capacitor.
c12_phy_cbse_02_008: Introduces dielectrics and polarization, which modify capacitance (factor \(K\)).
c10_phy_cbse_01_002: Class 10 foundation of electric potential difference (volt) and its measurement.
c12_phy_cbse_02_004: Capacitors have equipotential plates; the field between plates is derived from equipotential spacing.  

## FORWARD_NODE_IDS
c12_phy_cbse_02_010, c12_phy_cbse_02_011, c12_phy_cbse_02_012, c12_phy_cbse_02_013
## FORWARD_REASONS
c12_phy_cbse_02_010: Uses the definition \(C = Q/V\) to derive capacitance of parallel plate geometry (\(C = \varepsilon_0 A/d\)).
c12_phy_cbse_02_011: Combines capacitors using the same \(C = Q/V\) logic for series (same \(Q\)) and parallel (same \(V\)).
c12_phy_cbse_02_012: Derives energy \(U = \frac{1}{2}CV^2 = \frac{1}{2}QV\) from the charging process defined by \(C = Q/V\).
c12_phy_cbse_02_013: Van de Graaff generator is a large spherical capacitor; its capacitance determines maximum voltage before breakdown.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_005, c10_math_cbse_03_005
## CROSS_SUBJECT_REASONS
c11_math_cbse_02_005: Functions (definition, domain, range) — capacitance is a function of geometry: \(C = f(\text{shape, size, dielectric})\).
c10_math_cbse_03_005: Substitution method for solving linear equations — used when solving \(C = Q/V\) for any variable given the other two.

## CHAIN_DESCRIPTION
c12_phy_cbse_02_001 -> c12_phy_cbse_02_009 -> c12_phy_cbse_02_010

## THIS_FORMULA
\(C = \frac{Q}{V}\) (SI unit: farad, F = C/V)

## FORMULA_VARIABLES
\(C\) = capacitance (F), \(Q\) = magnitude of charge on one plate (C), \(V\) = potential difference between plates (V)

## FORMULA_UNITS
F (farad), C (coulomb), V (volt)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_02_005 | Capacitance is a function of geometric parameters (area, separation, dielectric constant) — understanding functional dependence is key.
c10_math_cbse_03_005 | Solving \(C = Q/V\) for \(Q\), \(V\), or \(C\) requires algebraic substitution, directly applying linear equation solving skills.
## PREREQ_CONCEPT
Electric potential difference between two conductors and the fact that conductors are equipotential surfaces.

## PREREQ_BEFORE
The student must be able to calculate potential difference from electric field or charge configuration, and understand that a conductor's surface is an equipotential.

## PREREQ_STUCK
If stuck, review c12_phy_cbse_02_001 (potential difference definition) and c12_phy_cbse_02_007 (conductor properties).

## WORKED_EXAMPLE_1
PROBLEM: A capacitor in a camera flash unit has a capacitance of \(200 \mu\text{F}\). When the flash is triggered, the capacitor discharges through the flash tube. If the potential difference across the capacitor just before discharge is \(300 \text{ V}\), what is the magnitude of charge on each plate? Express in coulombs and milli-coulombs.

STEPS:
- Step 1: Identify given quantities: \(C = 200 \mu\text{F} = 200 \times 10^{-6} \text{ F}\), \(V = 300 \text{ V}\). Unknown: \(Q\) (magnitude of charge on one plate).
- Step 2: Use the capacitance formula \(C = Q/V\). Rearrange to \(Q = C V\). Check units: \(\text{F} \times \text{V} = (\text{C/V}) \times \text{V} = \text{C}\).
- Step 3: Substitute values with units: \(Q = (200 \times 10^{-6} \text{ F}) \times (300 \text{ V})\).
- Step 4: Compute: \(200 \times 300 = 60,000\). \(60,000 \times 10^{-6} = 6.0 \times 10^{-2} \text{ C}\).
- Step 5: Convert to milli-coulombs: \(6.0 \times 10^{-2} \text{ C} = 60 \text{ mC}\). Verify reasonableness: a camera flash capacitor stores tens of mC — physically plausible.

REASONING: The formula \(Q = CV\) directly gives the charge magnitude. The unit conversion from \(\mu\text{F}\) to \(\text{F}\) is critical. The result is the charge on the positive plate; the negative plate has \(-Q\).

ANSWER: \(Q = 6.0 \times 10^{-2} \text{ C} = 60 \text{ mC}\)

## WORKED_EXAMPLE_2
PROBLEM: A parallel-plate capacitor (air-filled) has plate area \(0.02 \text{ m}^2\) and separation \(1.0 \text{ mm}\). It is connected to a \(9.0 \text{ V}\) battery. Calculate its capacitance and the charge on each plate. Use \(\varepsilon_0 = 8.85 \times 10^{-12} \text{ F/m}\). (Note: This uses the parallel-plate formula from the next node, but here we treat it as given geometry to practice \(C = Q/V\).)

STEPS:
- Step 1: Given: \(A = 0.02 \text{ m}^2\), \(d = 1.0 \text{ mm} = 1.0 \times 10^{-3} \text{ m}\), \(V = 9.0 \text{ V}\), \(\varepsilon_0 = 8.85 \times 10^{-12} \text{ F/m}\). Find \(C\) and \(Q\).
- Step 2: Capacitance of parallel-plate capacitor: \(C = \varepsilon_0 A / d\). Units: \((\text{F/m}) \times \text{m}^2 / \text{m} = \text{F}\).
- Step 3: Compute \(C\): \(C = (8.85 \times 10^{-12}) \times 0.02 / (1.0 \times 10^{-3}) = (8.85 \times 10^{-12}) \times 20 = 1.77 \times 10^{-10} \text{ F} = 177 \text{ pF}\).
- Step 4: Now use \(Q = C V\): \(Q = (1.77 \times 10^{-10} \text{ F}) \times (9.0 \text{ V}) = 1.593 \times 10^{-9} \text{ C} \approx 1.59 \text{ nC}\).
- Step 5: Check: \(C \approx 177 \text{ pF}\) is typical for small air capacitor; \(Q \approx 1.6 \text{ nC}\) at 9 V is reasonable.

REASONING: We first compute the geometric capacitance using the parallel-plate formula (derived in next node), then apply the definition \(Q = CV\). The two-step process (geometry → C → Q) is standard for capacitor problems.

ANSWER: \(C = 1.77 \times 10^{-10} \text{ F} = 177 \text{ pF}\); \(Q = 1.59 \times 10^{-9} \text{ C} = 1.59 \text{ nC}\)

## WORKED_EXAMPLE_3
PROBLEM: A \(10 \mu\text{F}\) capacitor is charged by a \(50 \text{ V}\) battery. The battery is then disconnected. (a) What is the charge on the capacitor? (b) The plate separation is now doubled (with charge trapped on plates). What is the new capacitance and new potential difference? (c) If instead the battery remained connected while separation doubled, what would be the new charge?

STEPS:
- Step 1: Initial state: \(C_1 = 10 \mu\text{F} = 10 \times 10^{-6} \text{ F}\), \(V_1 = 50 \text{ V}\). (a) \(Q_1 = C_1 V_1 = (10 \times 10^{-6}) \times 50 = 5.0 \times 10^{-4} \text{ C} = 500 \mu\text{C}\).
- Step 2: (b) Battery disconnected → charge \(Q\) remains constant at \(Q_1\). For parallel-plate, \(C \propto 1/d\). Doubling \(d\) halves capacitance: \(C_2 = C_1 / 2 = 5.0 \mu\text{F}\). New voltage: \(V_2 = Q_1 / C_2 = (5.0 \times 10^{-4}) / (5.0 \times 10^{-6}) = 100 \text{ V}\). (Voltage doubles.)
- Step 3: (c) Battery connected → voltage \(V\) remains constant at \(50 \text{ V}\). \(C_2 = 5.0 \mu\text{F}\) (same geometry change). New charge: \(Q_2 = C_2 V = (5.0 \times 10^{-6}) \times 50 = 2.5 \times 10^{-4} \text{ C} = 250 \mu\text{C}\). (Charge halves.)
- Step 4: Verify energy consistency: (b) Energy increases (work done to pull plates apart); (c) Energy decreases (charge flows back to battery).

REASONING: This problem tests the crucial distinction between isolated capacitor (constant Q) and battery-connected capacitor (constant V). The geometric dependence \(C \propto 1/d\) is used qualitatively. The definition \(C = Q/V\) is applied in both scenarios with different constraints.

ANSWER: (a) \(Q = 500 \mu\text{C}\); (b) \(C_2 = 5.0 \mu\text{F}\), \(V_2 = 100 \text{ V}\); (c) \(Q_2 = 250 \mu\text{C}\)

## COMPETENCY_QUESTION_1
QUESTION: Two identical capacitors are charged to the same charge \(Q\). Capacitor X has air between plates; Capacitor Y has a dielectric with \(K = 3\). (a) Which capacitor has higher potential difference? (b) Which stores more electrostatic energy? (c) If both are discharged through identical resistors, which discharge current lasts longer? Explain each answer using \(C = Q/V\) and energy formulas.

COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables

STEPS:
- Step 1: Recall \(C = Q/V\). Same \(Q\) → \(V \propto 1/C\). Dielectric increases \(C\) by factor \(K\): \(C_Y = 3 C_X\). So \(V_Y = V_X / 3\). Capacitor X has higher \(V\).
- Step 2: Energy \(U = \frac{1}{2} Q^2 / C\) (since \(Q\) same). \(U \propto 1/C\). So \(U_Y = U_X / 3\). Capacitor X stores more energy.
- Step 3: Discharge time constant \(\tau = RC\). Same \(R\), \(C_Y = 3 C_X\) → \(\tau_Y = 3 \tau_X\). Capacitor Y's discharge lasts longer.

ANSWER: (a) Capacitor X (air) has higher potential difference (3 times). (b) Capacitor X stores more energy (3 times). (c) Capacitor Y (dielectric) discharge lasts longer (3 times time constant).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A \(4 \mu\text{F}\) capacitor is charged to \(100 \text{ V}\) by a battery. The battery is disconnected. The charged capacitor is then connected in parallel with an uncharged \(2 \mu\text{F}\) capacitor. (a) Find the final common voltage across both capacitors. (b) Calculate the initial and final total electrostatic energy. (c) Explain the energy difference. (This combines capacitance definition, charge conservation, and energy — a JEE/NEET classic.)

COMPETENCY: Multi-step analytical reasoning combining charge conservation, capacitance definition, and energy concepts

STEPS:
- Step 1: Initial charge on \(4 \mu\text{F}\): \(Q_0 = C_1 V_0 = (4 \times 10^{-6}) \times 100 = 4 \times 10^{-4} \text{ C}\). Total charge conserved.
- Step 2: After parallel connection, equivalent capacitance \(C_{\text{eq}} = C_1 + C_2 = 4 + 2 = 6 \mu\text{F}\). Common voltage \(V_f = Q_0 / C_{\text{eq}} = (4 \times 10^{-4}) / (6 \times 10^{-6}) = 66.7 \text{ V}\).
- Step 3: Initial energy \(U_i = \frac{1}{2} C_1 V_0^2 = \frac{1}{2} \times 4 \times 10^{-6} \times 100^2 = 2.0 \times 10^{-2} \text{ J}\). Final energy \(U_f = \frac{1}{2} C_{\text{eq}} V_f^2 = \frac{1}{2} \times 6 \times 10^{-6} \times (66.7)^2 \approx 1.33 \times 10^{-2} \text{ J}\).
- Step 4: Energy lost = \(U_i - U_f = 0.67 \times 10^{-2} \text{ J}\). This energy is dissipated as heat in connecting wires (transient current) and electromagnetic radiation.
- Step 5: Note: If battery remained connected, voltage would stay 100 V and charge would redistribute differently.

ANSWER: (a) \(V_f = 66.7 \text{ V}\); (b) \(U_i = 20 \text{ mJ}\), \(U_f = 13.3 \text{ mJ}\); (c) \(6.7 \text{ mJ}\) lost as heat/radiation during charge redistribution.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A capacitor is a system of two ______ separated by an insulating medium (or vacuum) that stores electric charge and energy.

## DIAGNOSTIC_ANSWER_7
conductors

The conductors are the capacitor's body: two metal surfaces, an insulator between, and charge hoarded on the facing sides. **A wrong answer (plates twice) reveals the student has narrowed the general definition to one geometry before the definition was done speaking.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ceiling fan in your home — it has a small ______ component (a capacitor) that helps the motor start.

## DIAGNOSTIC_ANSWER_8
cylindrical

The cylindrical word is the fan part's shape: the rolled-up parallel-plate capacitor that gives the motor its starting shove. **A wrong answer (a rectangular word) reveals the student has reshaped the component while its function in the walkthrough stands unchanged.**
