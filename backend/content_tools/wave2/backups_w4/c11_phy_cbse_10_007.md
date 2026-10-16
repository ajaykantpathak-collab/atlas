## ELI5
Buy gas by the kilogram, do thermodynamics by the mole - molar specific heat prices one mole per kelvin instead of one kilogram. The twist is gases: at constant pressure some heat leaks into expansion work, so Cp beats Cv. Same gas, two prices, distinguished by whether the piston is allowed to move.

## DEFINITION
Molar specific heat capacity is the amount of heat energy required to raise the temperature of one mole of a substance by one kelvin (or one degree Celsius). It is denoted by \(C\) and its SI unit is \(\text{J mol}^{-1} \text{K}^{-1}\). For gases, two distinct values are defined: molar specific heat at constant pressure (\(C_p\)) and molar specific heat at constant volume (\(C_v\)), because the heat supplied is partly used for expansion work at constant pressure.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can calculate molar specific heat capacity from given heat, mole, and temperature change data; convert between specific heat capacity (per kg) and molar specific heat capacity (per mole) using molar mass; and correctly identify whether \(C_p\) or \(C_v\) applies to a described thermodynamic process for a gas.

## SCOPE_BOUNDARY
This node covers the definition, formula, units, and the distinction between \(C_p\) and \(C_v\) for gases. It does NOT cover the derivation of \(C_p - C_v = R\) (Mayer's relation), which is in Chapter 11 (Thermodynamics), nor does it cover quantum statistical explanations for specific heats of solids (Einstein/Debye models).

## WALKTHROUGH
Observe a domestic LPG cylinder: we purchase gas by mass (kg), but chemists and physicists often quantify it in moles for thermodynamic calculations. Recall from the previous node (Specific Heat Capacity) that water requires 4186 J per kg per K. Now ask: "How much heat for one mole of water?" This shifts the basis from mass to amount of substance. Connect to the mole concept from chemistry: one mole of any substance contains Avogadro's number of particles. Define molar specific heat capacity as heat per mole per kelvin. For gases, demonstrate with a syringe: compressing the gas (constant volume) vs. letting the piston move (constant pressure) shows different temperature rises for the same heat input, necessitating \(C_v\) and \(C_p\).

Takeaway: mastery means converting between per-kilogram and per-mole values through molar mass, and choosing Cp or Cv by the process constraint. Exam moves: convert-the-capacity questions and pick-Cp-or-Cv items. Check yourself: the mole is just a different-sized scoop - multiply by molar mass to swap between the two price lists. Students miss it because the two gas values look redundant, when the definition splits them by the work question: constant volume traps every joule as internal energy, constant pressure spends some pushing the piston, and the difference is exactly that toll.

## DIAGNOSTIC_QUESTION_1
State the definition of molar specific heat capacity and its SI unit.

## DIAGNOSTIC_ANSWER_1
Molar specific heat capacity is the heat required to raise the temperature of one mole of a substance by one kelvin. Its SI unit is \(\text{J mol}^{-1} \text{K}^{-1}\). A wrong answer (e.g., giving \(\text{J kg}^{-1} \text{K}^{-1}\)) reveals confusion between specific heat capacity (per unit mass) and molar specific heat capacity (per unit amount of substance).

## DIAGNOSTIC_QUESTION_2
Why do gases have two molar specific heat capacities (\(C_p\) and \(C_v\)) while solids and liquids are usually described by only one?

## DIAGNOSTIC_ANSWER_2
Gases expand significantly when heated at constant pressure, doing work on the surroundings; thus extra heat is needed compared to constant volume where no work is done. Solids and liquids expand negligibly, so the work done is extremely small and \(C_p \approx C_v\). A wrong answer ignoring the work done during expansion indicates a lack of understanding of the first law of thermodynamics (\( \Delta Q = \Delta U + \Delta W \)) applied to thermal processes.

## DIAGNOSTIC_QUESTION_3
The specific heat capacity of nitrogen gas (\(N_2\)) is \(1040 \text{ J kg}^{-1} \text{K}^{-1}\). Its molar mass is \(28 \text{ g mol}^{-1}\). Calculate the molar specific heat capacity of nitrogen at constant volume. (Assume the given specific heat is \(c_v\)).

## DIAGNOSTIC_ANSWER_3
Given: \(c_v = 1040 \text{ J kg}^{-1} \text{K}^{-1}\), \(M = 28 \text{ g mol}^{-1} = 0.028 \text{ kg mol}^{-1}\).
Formula: \(C_v = c_v \times M\).
Substitution: \(C_v = 1040 \times 0.028 = 29.12 \text{ J mol}^{-1} \text{K}^{-1}\).
Unit check: \(\text{J kg}^{-1} \text{K}^{-1} \times \text{kg mol}^{-1} = \text{J mol}^{-1} \text{K}^{-1}\).
A wrong answer of \(29120 \text{ J mol}^{-1} \text{K}^{-1}\) reveals the student used molar mass in grams without converting to kilograms, a critical unit conversion error.

## DIAGNOSTIC_QUESTION_4
For an ideal diatomic gas, \(C_v = 20.8 \text{ J mol}^{-1} \text{K}^{-1}\) and \(C_p = 29.1 \text{ J mol}^{-1} \text{K}^{-1}\). If the gas is heated at constant pressure, what fraction of the supplied heat energy goes into increasing the internal energy of the gas?

## DIAGNOSTIC_ANSWER_4
At constant pressure, \(\Delta Q = n C_p \Delta T\). The increase in internal energy is \(\Delta U = n C_v \Delta T\) (since internal energy of an ideal gas depends only on temperature).
Fraction = \(\frac{\Delta U}{\Delta Q} = \frac{C_v}{C_p} = \frac{20.8}{29.1} \approx 0.715\) (or 71.5%).
A wrong answer using \(C_p/C_v\) or \(1 - C_v/C_p\) reveals confusion about the energy partition between internal energy and work done during expansion.

## DIAGNOSTIC_QUESTION_5
A student solves a problem: "2 moles of oxygen gas are heated at constant volume from 300 K to 350 K. Heat supplied = 5000 J. Find \(C_v\)." The student writes: \(C_v = \frac{Q}{n \Delta T} = \frac{5000}{2 \times 50} = 50 \text{ J mol}^{-1} \text{K}^{-1}\). Evaluate this solution.

## DIAGNOSTIC_ANSWER_5
The calculation is mathematically correct, but the result \(50 \text{ J mol}^{-1} \text{K}^{-1}\) is physically unreasonable for oxygen gas (typical \(C_v \approx 21 \text{ J mol}^{-1} \text{K}^{-1}\)). The error is likely in the problem data (heat supplied too high) or the student misread "constant pressure" as "constant volume" (where \(C_p \approx 29 \text{ J mol}^{-1} \text{K}^{-1}\)). A student who only checks arithmetic misses the physical plausibility check.

## DIAGNOSTIC_QUESTION_6
Design a simple school-lab experiment to determine the molar specific heat capacity at constant pressure (\(C_p\)) of air using a constant-pressure gas thermometer setup (e.g., a flask with a volume-adjustable syringe). Outline the measurements needed and the calculation steps.

## DIAGNOSTIC_ANSWER_6
Apparatus: Conical flask with a movable piston/syringe (constant pressure), heater, thermometer, balance. Procedure: (1) Measure mass of air in flask (by mass difference after flushing). (2) Convert mass to moles using molar mass of air (~29 g/mol). (3) Supply known heat \(Q\) (electrical: \(VIt\)). (4) Measure temperature rise \(\Delta T\) at constant pressure (piston moves freely). (5) Calculate \(C_p = Q / (n \Delta T)\). A poor answer omits the constant-pressure condition (fixed piston) or forgets to convert mass to moles.

## COMMON_MISCONCEPTION
Students treat molar specific heat capacity as numerically equal to specific heat capacity, ignoring the molar mass conversion factor. They also assume \(C_p = C_v\) for gases because they do not visualize the expansion work done at constant pressure. A concrete error: using \(c = 0.718 \text{ kJ kg}^{-1} \text{K}^{-1}\) for air directly as \(C_v = 0.718 \text{ kJ mol}^{-1} \text{K}^{-1}\) without multiplying by \(0.029 \text{ kg mol}^{-1}\).

## ON_FAILURE
1. Revisit the definition of mole and molar mass (Chemistry Class 11). Practice: "Find moles in 10 g of \(O_2\)." 2. Perform a thought experiment: Heat a gas in a rigid container (constant volume) vs. a container with a frictionless piston (constant pressure). Discuss where the heat energy goes in each case. 3. Drill unit conversion: \(C = c \times M\) with \(M\) in \(\text{kg mol}^{-1}\). 4. Solve 5 numerical problems converting between \(c\) and \(C\) for different gases (He, \(N_2\), \(CO_2\)).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_10_006, c11_phy_cbse_10_004, c9_math_ch2_1, c6_math_ch06_064
## PREREQUISITE_REASONS
c11_phy_cbse_10_006: Specific heat capacity (per kg) is the direct precursor; molar specific heat extends it to per mole basis.
c11_phy_cbse_10_004: Ideal gas equation introduces moles, pressure, volume, temperature variables essential for gas-specific \(C_p/C_v\) distinction.
c9_math_ch2_1: Linear polynomials model the direct proportionality \(\Delta Q \propto \Delta T\) for fixed \(n\).
c6_math_ch06_064: Unitary method underpins the conversion from heat per mass to heat per mole using molar mass.

## FORWARD_NODE_IDS
c11_phy_cbse_10_008, c11_phy_cbse_10_009
## FORWARD_REASONS
c11_phy_cbse_10_008: Calorimetry problems often use molar specific heats when amounts are given in moles (e.g., gas reactions).
c11_phy_cbse_10_009: Change of state calculations for gases (e.g., condensation) require molar latent heats and molar specific heats.

## CROSS_SUBJECT_PREREQS
c9_math_ch2_1, c6_math_ch06_064
## CROSS_SUBJECT_REASONS
c9_math_ch2_1: Linear polynomials represent the linear relationship \(\Delta Q = n C \Delta T\) where \(C\) is the constant of proportionality (slope).
c6_math_ch06_064: Unitary method is used to find "heat per mole" from "heat per kilogram" by scaling with molar mass (kg/mol).

## CHAIN_DESCRIPTION
c11_phy_cbse_10_006 -> c11_phy_cbse_10_007 -> c11_phy_cbse_10_008

## THIS_FORMULA
\(C = \frac{1}{\mu} \frac{\Delta Q}{\Delta T}\) (SI unit: \(\text{J mol}^{-1} \text{K}^{-1}\)); For gases: \(C_p = \frac{1}{\mu} \left(\frac{\Delta Q}{\Delta T}\right)_p\), \(C_v = \frac{1}{\mu} \left(\frac{\Delta Q}{\Delta T}\right)_v\)

## FORMULA_VARIABLES
\(C\) = molar specific heat capacity (\(\text{J mol}^{-1} \text{K}^{-1}\)), \(\mu\) = amount of substance (mol), \(\Delta Q\) = heat supplied (J), \(\Delta T\) = temperature change (K or °C), \(C_p\) = molar specific heat at constant pressure (\(\text{J mol}^{-1} \text{K}^{-1}\)), \(C_v\) = molar specific heat at constant volume (\(\text{J mol}^{-1} \text{K}^{-1}\))

## FORMULA_UNITS
\(\text{J mol}^{-1} \text{K}^{-1}\), mol, J, K

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch2_1 | Linear polynomials model the direct proportionality between heat supplied and temperature change for a fixed amount of substance.
c6_math_ch06_064 | Unitary method is used to convert specific heat capacity (per kg) to molar specific heat capacity (per mole) using molar mass as the conversion factor.

## PREREQ_CONCEPT
Specific heat capacity (per unit mass) and the mole concept (amount of substance).

## PREREQ_BEFORE
The student must be able to compute specific heat capacity \(c = Q/(m\Delta T)\) and convert mass to moles using \(n = m/M\) where \(M\) is molar mass in kg/mol.

## PREREQ_STUCK
Review specific heat capacity definition (node c11_phy_cbse_10_006) and the mole concept from chemistry (amount of substance, molar mass, Avogadro's number).

## WORKED_EXAMPLE_1
PROBLEM: The specific heat capacity of solid aluminium is \(900 \text{ J kg}^{-1} \text{K}^{-1}\). The molar mass of aluminium is \(27 \text{ g mol}^{-1}\). Calculate the molar specific heat capacity of aluminium.
STEPS:
- Step 1: Identify given quantities: \(c = 900 \text{ J kg}^{-1} \text{K}^{-1}\), \(M = 27 \text{ g mol}^{-1} = 0.027 \text{ kg mol}^{-1}\). Unknown: \(C\) (molar specific heat capacity).
- Step 2: Recall the conversion formula: \(C = c \times M\). Check units: \(\text{J kg}^{-1} \text{K}^{-1} \times \text{kg mol}^{-1} = \text{J mol}^{-1} \text{K}^{-1}\).
- Step 3: Substitute values: \(C = 900 \times 0.027\).
- Step 4: Compute: \(C = 24.3 \text{ J mol}^{-1} \text{K}^{-1}\).
- Step 5: Verify reasonableness: Typical molar heat capacities of metals are around 25 J mol⁻¹ K⁻¹ (Dulong-Petit law), so the answer is physically plausible.
REASONING: Molar specific heat capacity scales the mass-based specific heat by the mass of one mole. Since one mole of aluminium has a mass of 0.027 kg, the heat needed for one mole is 0.027 times the heat needed for one kg.
ANSWER: \(24.3 \text{ J mol}^{-1} \text{K}^{-1}\)

## WORKED_EXAMPLE_2
PROBLEM: In a constant-pressure process, 0.5 moles of an ideal diatomic gas absorb 727.5 J of heat and the temperature rises by 15 K. In a separate constant-volume process, the same gas sample requires only 517.5 J for the same temperature rise. Determine \(C_p\) and \(C_v\) for this gas and verify if the difference approximates the universal gas constant \(R\).
STEPS:
- Step 1: Identify given: \(\mu = 0.5 \text{ mol}\), \(\Delta T = 15 \text{ K}\). For constant pressure: \(\Delta Q_p = 727.5 \text{ J}\). For constant volume: \(\Delta Q_v = 517.5 \text{ J}\).
- Step 2: Use formulas: \(C_p = \frac{1}{\mu} \frac{\Delta Q_p}{\Delta T}\), \(C_v = \frac{1}{\mu} \frac{\Delta Q_v}{\Delta T}\).
- Step 3: Substitute for \(C_p\): \(C_p = \frac{1}{0.5} \times \frac{727.5}{15} = 2 \times 48.5 = 97.0 \text{ J mol}^{-1} \text{K}^{-1}\).
- Step 4: Substitute for \(C_v\): \(C_v = \frac{1}{0.5} \times \frac{517.5}{15} = 2 \times 34.5 = 69.0 \text{ J mol}^{-1} \text{K}^{-1}\).
- Step 5: Compute difference: \(C_p - C_v = 97.0 - 69.0 = 28.0 \text{ J mol}^{-1} \text{K}^{-1}\). Compare with \(R = 8.31 \text{ J mol}^{-1} \text{K}^{-1}\). The difference is not equal to \(R\) (it's ~3.4R), indicating the gas is not ideal diatomic under these conditions or the data is for a polyatomic gas (where \(C_p - C_v = R\) still holds for ideal gases, so this data suggests non-ideal behavior or measurement error; for an ideal gas, \(C_p - C_v = R\) exactly).
- Step 6: Note: For an ideal gas, \(C_p - C_v = R\) must hold. The given data yields a difference of 28 J/mol·K, which is not equal to 8.31. This implies the gas is not ideal or the data is hypothetical.
REASONING: At constant pressure, heat supplies both internal energy increase and expansion work. At constant volume, heat only increases internal energy. The difference \(C_p - C_v\) quantifies the work done per mole per kelvin at constant pressure, which for an ideal gas equals \(R\).
ANSWER: \(C_p = 97.0 \text{ J mol}^{-1} \text{K}^{-1}\), \(C_v = 69.0 \text{ J mol}^{-1} \text{K}^{-1}\). Difference = 28.0 J mol⁻¹ K⁻¹ (does not equal R, indicating non-ideal or hypothetical data).

## WORKED_EXAMPLE_3
PROBLEM: A mixture contains 0.2 moles of helium (monatomic, \(C_v = 12.5 \text{ J mol}^{-1} \text{K}^{-1}\)) and 0.3 moles of nitrogen (diatomic, \(C_v = 20.8 \text{ J mol}^{-1} \text{K}^{-1}\)). The mixture is heated at constant volume by 200 J. Find the final temperature rise of the mixture. Assume no heat loss.
STEPS:
- Step 1: Identify given: \(n_{He} = 0.2 \text{ mol}\), \(C_{v,He} = 12.5 \text{ J mol}^{-1} \text{K}^{-1}\); \(n_{N_2} = 0.3 \text{ mol}\), \(C_{v,N_2} = 20.8 \text{ J mol}^{-1} \text{K}^{-1}\). \(\Delta Q = 200 \text{ J}\) at constant volume.
- Step 2: At constant volume, total heat absorbed = sum of heat absorbed by each component: \(\Delta Q = n_{He} C_{v,He} \Delta T + n_{N_2} C_{v,N_2} \Delta T = (n_{He} C_{v,He} + n_{N_2} C_{v,N_2}) \Delta T\).
- Step 3: Compute effective total heat capacity: \(n_{He} C_{v,He} = 0.2 \times 12.5 = 2.5 \text{ J K}^{-1}\). \(n_{N_2} C_{v,N_2} = 0.3 \times 20.8 = 6.24 \text{ J K}^{-1}\). Total = \(8.74 \text{ J K}^{-1}\).
- Step 4: Solve for \(\Delta T\): \(\Delta T = \frac{\Delta Q}{\text{Total } C_v} = \frac{200}{8.74} \approx 22.88 \text{ K}\).
- Step 5: Unit check: J / (J K⁻¹) = K. Reasonableness: 200 J into ~0.5 mol gas with average \(C_v \approx 17.5\) gives ~23 K rise, plausible.
- Step 6: State final answer with proper significant figures.
REASONING: In a mixture at thermal equilibrium, all components share the same temperature change. The total heat capacity at constant volume is the sum of the heat capacities of the individual components (extensive property). The heat supplied distributes according to each component's heat capacity.
ANSWER: \(22.9 \text{ K}\) (or \(22.9^\circ \text{C}\))

## COMPETENCY_QUESTION_1
QUESTION: A cylinder fitted with a frictionless piston contains 2 moles of an ideal gas at 300 K. The gas is heated slowly so that it expands at constant pressure until its volume doubles. (a) What is the final temperature? (b) If the molar specific heat at constant pressure is \(29.1 \text{ J mol}^{-1} \text{K}^{-1}\), calculate the heat supplied. (c) Explain why the heat supplied is greater than the increase in internal energy of the gas.
COMPETENCY: Interpreting physical situations using formulas and the first law of thermodynamics.
STEPS:
- Step 1: For constant pressure expansion of an ideal gas, \(V \propto T\) (Charles's Law). Volume doubles => Temperature doubles. \(T_f = 2 \times 300 = 600 \text{ K}\).
- Step 2: \(\Delta T = 300 \text{ K}\). Heat supplied \(Q = n C_p \Delta T = 2 \times 29.1 \times 300 = 17460 \text{ J}\).
- Step 3: Increase in internal energy \(\Delta U = n C_v \Delta T\). For ideal diatomic gas, \(C_v = C_p - R = 29.1 - 8.31 = 20.79 \text{ J mol}^{-1} \text{K}^{-1}\). \(\Delta U = 2 \times 20.79 \times 300 = 12474 \text{ J}\).
- Step 4: Difference \(Q - \Delta U = 17460 - 12474 = 4986 \text{ J}\) is the work done by the gas during expansion (\(W = P \Delta V = n R \Delta T\)).
- Step 5: Explanation: At constant pressure, part of the heat energy is converted into mechanical work of pushing the piston outward, so \(Q = \Delta U + W\). Hence \(Q > \Delta U\).
ANSWER: (a) 600 K, (b) 17460 J, (c) At constant pressure, heat supplied equals increase in internal energy plus work done by the gas during expansion (\(Q = \Delta U + W\)). Since \(W > 0\), \(Q > \Delta U\).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A student claims: "Since the molar specific heat capacity of a gas at constant pressure (\(C_p\)) is always greater than at constant volume (\(C_v\)), if we want to raise the temperature of a gas by a certain amount using the least amount of heat, we should always heat it at constant volume." Critique this statement. Is it always true? Consider a real-world constraint: the gas is in a container that can withstand a maximum pressure of 10 atm. The initial state is 1 atm, 300 K. The target temperature is 600 K.
COMPETENCY: Predicting outcomes from changing variables and evaluating practical constraints.
STEPS:
- Step 1: Analyze the thermodynamic claim: For a given \(\Delta T\), \(Q_v = n C_v \Delta T\) and \(Q_p = n C_p \Delta T\). Since \(C_p > C_v\), \(Q_v < Q_p\). Thermodynamically, constant volume requires less heat for the same \(\Delta T\).
- Step 2: Analyze the constraint: Constant volume heating from 300 K to 600 K doubles the absolute temperature. For an ideal gas at constant volume, \(P \propto T\). Pressure would double from 1 atm to 2 atm.
- Step 3: Check constraint: 2 atm < 10 atm (max pressure). The constant volume process is safe.
- Step 4: Consider constant pressure alternative: To reach 600 K at constant pressure, volume must double (Charles's law). This requires a piston/cylinder that can expand. Heat required is larger (\(Q_p\)).
- Step 5: Conclusion: The student's claim is thermodynamically correct *and* practically feasible in this scenario because the pressure limit is not exceeded. However, if the target temperature were 3000 K (10x), constant volume pressure would be 10 atm (at limit), and beyond that constant volume would be impossible. The claim "always" is false if constraints make constant volume impossible.
ANSWER: The statement is thermodynamically correct for a given \(\Delta T\) because \(C_v < C_p\). However, the word "always" is flawed: constant volume heating increases pressure proportionally to absolute temperature. If the required \(\Delta T\) would cause pressure to exceed the container's safety limit (10 atm), constant volume heating is not possible. In the given scenario (300 K to 600 K), pressure rises to 2 atm, which is safe, so constant volume is indeed the least-heat option.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Molar specific heat capacity is the amount of heat energy required to raise the ______ of one mole of a substance by one kelvin (or one degree Celsius).

## DIAGNOSTIC_ANSWER_7
temperature

**A wrong answer ("mass" or "volume") reveals the student has swapped the definition's object - the heat raises the temperature of one mole.** Temperature is the definition's own object, and the noun is what the blank grades. Recall the per-mole pricing before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a domestic LPG cylinder: we purchase gas by mass (kg), but chemists and physicists often quantify it in moles for ______ calculations.

## DIAGNOSTIC_ANSWER_8
thermodynamic

**A wrong answer ("chemical" or "engineering") reveals the student has swapped the walkthrough's adjective - moles are used for thermodynamic calculations.** Thermodynamic is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the LPG cylinder before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_9
What is Molar specific heat capacity? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Molar specific heat capacity is the amount of heat energy required to raise the temperature of one mole of a substance by one kelvin (or one degree Celsius).

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: molar specific heat capacity is the amount of heat energy required to raise the temperature of one mole of a substance by one kelvin.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Molar specific heat capacity?

## DIAGNOSTIC_ANSWER_10
Students treat molar specific heat capacity as numerically equal to specific heat capacity, ignoring the molar mass conversion factor.

**A wrong answer (treating the two values as equal) reveals the student holds the flagged mix-up.** The molar mass bridges them: multiply the per-kilogram value by the molar mass to get the per-mole value - and for gases the pressure constraint adds the further Cp-versus-Cv distinction.
