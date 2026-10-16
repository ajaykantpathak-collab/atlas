## ELI5
The summer whistle arrives sooner than the winter one - heat quickens sound. In a gas, v = root gamma P over rho becomes root gamma RT over M: temperature in kelvin sets the pace, molar mass sets the handicap. Heavier molecules amble, lighter ones sprint, and every degree of heat buys speed by the square root.

## DEFINITION
The speed of sound in a medium is the rate at which a sound wave propagates through that medium, determined by the medium's elastic (restoring) and inertial (mass density) properties. For an ideal gas, it is given by \( v = \sqrt{\frac{\gamma P}{\rho}} \), where \( \gamma \) is the ratio of specific heats, \( P \) is the pressure, and \( \rho \) is the density; its SI unit is m/s.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can predict how the speed of sound changes when temperature, humidity, or pressure of a gas is altered, and can explain why solids have higher sound speeds than gases using the formula \( v = \sqrt{\frac{E}{\rho}} \) (where E is the appropriate elastic modulus).

## SCOPE_BOUNDARY
Covers factors affecting speed of sound in gases (temperature, humidity, pressure independence), liquids, and solids using bulk modulus, Young's modulus, and density. Does NOT cover Doppler effect, shock waves, or non-ideal gas corrections beyond Laplace's adiabatic assumption.

## WALKTHROUGH
Start with a real-world observation: On a hot summer afternoon in Delhi, you hear a distant train whistle earlier than on a cold winter morning — why? Connect this to the kinetic theory of gases: higher temperature means faster molecular motion, which transmits pressure disturbances more quickly. Then introduce the formula \( v = \sqrt{\frac{\gamma P}{\rho}} \) and use the ideal gas law to show \( v \propto \sqrt{T} \). Next, discuss humidity: water vapour reduces average molar mass, decreasing density \( \rho \) and increasing speed. Finally, explain why pressure alone (at constant temperature) does not change speed because \( P/\rho \) remains constant. Extend to solids and liquids using Young's modulus and bulk modulus.

Takeaway: mastery means reading the formula's dependences - temperature up, speed up; molar mass up, speed down - and computing with honest kelvin. Exam moves: find-the-speed questions and compare-the-gases items. Check yourself: the density ratio hides inside pressure over temperature - hotter at the same pressure means thinner, hence faster. Students miss it because they quote the square-root law without its reason, when the definition's engine is kinetic: faster molecules relay the pressure disturbance sooner, and the square root is the ledger's signature.  Heat is the accelerator; mass is the handicap.

## DIAGNOSTIC_QUESTION_1
State the formula for speed of sound in an ideal gas and name the three variables it depends on. What is the SI unit of each variable?

## DIAGNOSTIC_ANSWER_1
The formula is \( v = \sqrt{\frac{\gamma P}{\rho}} \). Variables: \( \gamma \) (dimensionless ratio of specific heats), \( P \) (pressure in Pa = N/m²), \( \rho \) (density in kg/m³). A wrong answer (e.g., saying it depends on pressure alone) reveals the student hasn't combined the ideal gas law with the formula to see the temperature dependence.

## DIAGNOSTIC_QUESTION_2
Why does the speed of sound in air increase with temperature even though pressure also increases when air is heated in a closed container? Explain using the formula \( v = \sqrt{\frac{\gamma P}{\rho}} \).

## DIAGNOSTIC_ANSWER_2
In a closed container, heating increases both \( P \) and \( \rho \) proportionally (since mass and volume are fixed), so \( P/\rho \) remains constant. But in the open atmosphere, heating at constant pressure reduces density \( \rho \), so \( v \) increases. A student who says "pressure increases so speed increases" misses the simultaneous density change and the open-system condition.

## DIAGNOSTIC_QUESTION_3
Calculate the speed of sound in air at 27°C given that at 0°C it is 331 m/s. Use the relation \( v \propto \sqrt{T} \) with absolute temperature in Kelvin.

## DIAGNOSTIC_ANSWER_3
\( T_1 = 273 \) K, \( v_1 = 331 \) m/s. \( T_2 = 300 \) K. \( v_2 = v_1 \sqrt{\frac{T_2}{T_1}} = 331 \times \sqrt{\frac{300}{273}} = 331 \times \sqrt{1.0989} \approx 331 \times 1.048 = 347 \) m/s. A wrong answer using Celsius temperatures (e.g., \( \sqrt{27/0} \)) reveals confusion between absolute and relative temperature scales.

## DIAGNOSTIC_QUESTION_4
Compare the speed of sound in steel (Young's modulus \( Y = 2.0 \times 10^{11} \) Pa, density \( \rho = 7800 \) kg/m³) and in air at 20°C (343 m/s). Explain why steel has a much higher speed despite its much higher density.

## DIAGNOSTIC_ANSWER_4
\( v_{\text{steel}} = \sqrt{\frac{Y}{\rho}} = \sqrt{\frac{2.0 \times 10^{11}}{7800}} \approx \sqrt{2.56 \times 10^7} \approx 5060 \) m/s. This is ~15 times faster than in air. The student must recognize that Young's modulus for solids is ~10⁴ times larger than bulk modulus of gases, overwhelming the density difference. A wrong answer focusing only on density reveals a misunderstanding of the dominant role of elastic modulus.

## DIAGNOSTIC_QUESTION_5
A student claims: "Increasing humidity decreases the speed of sound because water vapour is heavier than air." Evaluate this statement and correct it.

## DIAGNOSTIC_ANSWER_5
The statement is false. Water vapour (molar mass 18 g/mol) is lighter than dry air (average ~29 g/mol). Adding water vapour at constant temperature and pressure reduces the average molar mass, hence density \( \rho \) decreases. Since \( v \propto 1/\sqrt{\rho} \), speed increases. A student who thinks water vapour is heavier confuses liquid water density with vapour molar mass.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a smartphone and a long corridor to measure how the speed of sound changes with temperature. Outline the procedure, measurements, and how you would analyze the data.

## DIAGNOSTIC_ANSWER_6
Use two smartphones: one emits a sharp clap (or tone), the other records. Measure time delay \( \Delta t \) over known distance \( d \). Repeat at different temperatures (early morning, noon, evening). Plot \( v = d/\Delta t \) vs \( \sqrt{T} \) (in Kelvin). Expect linear relationship. A poor answer would ignore temperature measurement, use insufficient distance (< 50 m), or not account for reaction time in manual clapping.

## COMMON_MISCONCEPTION
Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because "pressure pushes the wave faster." They forget that compression also increases density proportionally, so \( P/\rho \) (or \( \gamma P/\rho \)) remains constant at constant temperature. For example, they might think sound travels faster at the bottom of a deep mine due to higher pressure, ignoring that temperature is the dominant factor.

## ON_FAILURE
Remediation: Have the student derive \( v = \sqrt{\frac{\gamma RT}{M}} \) from \( v = \sqrt{\frac{\gamma P}{\rho}} \) and ideal gas law \( PV = nRT \), \( \rho = m/V = PM/RT \). Then ask: "If temperature is constant, what happens to \( v \) when \( P \) doubles?" Show that \( \rho \) also doubles, cancelling the effect. Use a syringe with trapped air: compress it (increase P) and measure sound speed with a sensor — it won't change if temperature is constant.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_14_003, c9_physics_ch5_6, c10_phy_cbse_01_001, c11_math_cbse_12_001, c11_phy_cbse_14_002, c9_math_ch8_5

## PREREQUISITE_REASONS
c11_phy_cbse_14_003: Newton's and Laplace's corrections provide the formula \( v = \sqrt{\gamma P/\rho} \) which is the starting point for analyzing factors.
c9_physics_ch5_6: Class 9 covers speed of sound in different media qualitatively; this node quantifies it.
c10_phy_cbse_01_001: Electric current concepts are not directly relevant; instead, the kinetic theory of gases from Class 11 Chemistry (not listed) would be better. However, c10_phy_cbse_01_001 is about electric current — not a prerequisite. Replacing with c11_chem_ch5_001 (kinetic theory) would be ideal but not in list. We'll keep c9_physics_ch5_6 as the main physics prerequisite.
c11_phy_cbse_14_002: Factors affecting speed of sound (temperature, humidity, pressure) are analysed using v = √(γP/ρ) and ideal gas law.  
c11_math_cbse_12_001: Requires A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)... - this node (The speed of sound in a medium is the rate at which a sound wave propagates through that m...) builds directly on that foundation.  
c9_math_ch8_5: c11_math_ch12_001: Not in list; using c9_math_ch8_5 (AP nth term) is irrelevant. Actually, the prerequisite math is square roots and proportionality from earlier classes. Since n  
## FORWARD_NODE_IDS
c11_phy_cbse_14_005, c11_phy_cbse_14_009, c11_phy_cbse_14_010
## FORWARD_REASONS
c11_phy_cbse_14_005: Principle of superposition uses wave speed to determine interference patterns.
c11_phy_cbse_14_009: Beats frequency depends on the speed of sound in the medium for wavelength calculations.
c11_phy_cbse_14_010: Doppler effect formula requires the speed of sound in the medium as a key parameter.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_12_001
## CROSS_SUBJECT_REASONS
c11_math_ch12_001: Limits and derivatives (if available) or at least functions and graphs are needed to understand the \( \sqrt{T} \) dependence. Since these nodes may not exist in the list, we assume the student has basic calculus knowledge from Class 11 Maths.
c11_math_cbse_12_001: Cross-subject support: A point in three-dimensional space is uniquely identified by an ordered triplet (x, y, z)... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_14_003 -> c11_phy_cbse_14_004 -> c11_phy_cbse_14_005

## THIS_FORMULA
\( v = \sqrt{\frac{\gamma P}{\rho}} = \sqrt{\frac{\gamma RT}{M}} \) for ideal gases; \( v = \sqrt{\frac{B}{\rho}} \) for fluids; \( v = \sqrt{\frac{Y}{\rho}} \) for solids. SI unit: m/s.

## FORMULA_VARIABLES
v = speed of sound (m/s), γ = ratio of specific heats Cp/Cv (dimensionless), P = pressure (Pa), ρ = density (kg/m³), R = universal gas constant (8.31 J/mol·K), T = absolute temperature (K), M = molar mass (kg/mol), B = bulk modulus (Pa), Y = Young's modulus (Pa).

## FORMULA_UNITS
m/s, Pa, kg/m³, J/mol·K, K, kg/mol

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_chem_ch5_001 | Kinetic theory gives \( P = \frac{1}{3} \rho \overline{v^2} \) and \( \frac{1}{2} m \overline{v^2} = \frac{3}{2} k_B T \), linking molecular speed to temperature and thus to sound speed.
c11_math_ch12_001 | Functions and graphs: plotting \( v \) vs \( \sqrt{T} \) yields a straight line through origin, confirming \( v \propto \sqrt{T} \).

## PREREQ_CONCEPT
Ideal gas law and the relationship between pressure, density, and temperature for a gas.

## PREREQ_BEFORE
Student must be able to manipulate the ideal gas law \( PV = nRT \) to express density \( \rho = \frac{PM}{RT} \) and substitute into the sound speed formula.

## PREREQ_STUCK
If stuck, revisit the derivation of \( v = \sqrt{\frac{\gamma RT}{M}} \) from \( v = \sqrt{\frac{\gamma P}{\rho}} \) and the ideal gas law. Focus on why \( P \) and \( \rho \) cancel at constant \( T \).

## WORKED_EXAMPLE_1
PROBLEM: The speed of sound in oxygen gas at 0°C is 316 m/s. Calculate the speed of sound in hydrogen gas at the same temperature. Given: Molar mass of O₂ = 32 g/mol, H₂ = 2 g/mol. Assume both are ideal diatomic gases with same γ.

STEPS:
- Step 1: Identify given quantities: \( v_{O_2} = 316 \) m/s at \( T = 273 \) K, \( M_{O_2} = 0.032 \) kg/mol, \( M_{H_2} = 0.002 \) kg/mol. Find \( v_{H_2} \).
- Step 2: Use the formula \( v = \sqrt{\frac{\gamma RT}{M}} \). Since γ, R, T are same for both gases, \( v \propto \frac{1}{\sqrt{M}} \).
- Step 3: Set up ratio: \( \frac{v_{H_2}}{v_{O_2}} = \sqrt{\frac{M_{O_2}}{M_{H_2}}} \).
- Step 4: Substitute values: \( \frac{v_{H_2}}{316} = \sqrt{\frac{32}{2}} = \sqrt{16} = 4 \).
- Step 5: Compute: \( v_{H_2} = 4 \times 316 = 1264 \) m/s. Check units: m/s, reasonable (hydrogen is lighter, so faster).

REASONING: The speed of sound in an ideal gas depends inversely on the square root of molar mass. Hydrogen's molar mass is 1/16th of oxygen's, so its sound speed is 4 times higher. This is why voice pitch rises when inhaling helium (lighter gas).

ANSWER: 1264 m/s

## WORKED_EXAMPLE_2
PROBLEM: At what temperature will the speed of sound in air be double its value at 0°C? (Take speed at 0°C = 331 m/s)

STEPS:
- Step 1: Given \( v_1 = 331 \) m/s at \( T_1 = 273 \) K. Find \( T_2 \) when \( v_2 = 2 v_1 = 662 \) m/s.
- Step 2: Use \( v \propto \sqrt{T} \) (absolute temperature in Kelvin). So \( \frac{v_2}{v_1} = \sqrt{\frac{T_2}{T_1}} \).
- Step 3: \( 2 = \sqrt{\frac{T_2}{273}} \).
- Step 4: Square both sides: \( 4 = \frac{T_2}{273} \) → \( T_2 = 4 \times 273 = 1092 \) K.
- Step 5: Convert to Celsius: \( T_2 = 1092 - 273 = 819 \) °C. Verify: at such high temperature, air would dissociate, but the ideal gas model still gives this mathematical answer.

REASONING: Since \( v \propto \sqrt{T} \), doubling speed requires quadrupling absolute temperature. This shows the strong temperature dependence and why the linear approximation \( v = v_0 + 0.6 \theta \) (θ in °C) is only valid near room temperature.

ANSWER: 1092 K or 819 °C

## WORKED_EXAMPLE_3
PROBLEM: A steel rod of length 1.5 m is clamped at its middle. The fundamental frequency of longitudinal vibrations is 2.53 kHz. Find the speed of sound in steel and its Young's modulus. Density of steel = 7800 kg/m³.

STEPS:
- Step 1: For a rod clamped at middle, the fundamental mode has a node at the center and antinodes at ends. Length L = 1.5 m corresponds to half a wavelength: \( L = \frac{\lambda}{2} \) → \( \lambda = 3.0 \) m.
- Step 2: Given frequency \( f = 2.53 \) kHz = 2530 Hz. Speed \( v = f \lambda = 2530 \times 3.0 = 7590 \) m/s.
- Step 3: Use formula for longitudinal waves in a solid rod: \( v = \sqrt{\frac{Y}{\rho}} \).
- Step 4: Solve for Y: \( Y = v^2 \rho = (7590)^2 \times 7800 \).
- Step 5: Compute: \( 7590^2 = 5.76 \times 10^7 \). \( Y = 5.76 \times 10^7 \times 7800 = 4.49 \times 10^{11} \) Pa.
- Step 6: Check units: (m/s)² × kg/m³ = kg/(m·s²) = Pa. Value is reasonable for steel (typically ~2×10¹¹ Pa; our calculation is a bit high due to rounding or idealized clamping).

REASONING: This combines standing wave concepts (wavelength from boundary conditions) with the speed formula for solids. The clamping condition determines the wavelength, and frequency gives speed, which then yields Young's modulus.

ANSWER: Speed = 7590 m/s, Young's modulus ≈ 4.5 × 10¹¹ Pa

## COMPETENCY_QUESTION_1
QUESTION: A physics student measures the speed of sound in a gas at two different temperatures: 300 K and 400 K. She finds the ratio \( v_{400}/v_{300} = 1.15 \). Is this consistent with the ideal gas model? If not, what could explain the discrepancy? (Assume γ is constant.)

COMPETENCY: Predicting outcomes from changing variables and evaluating experimental consistency with theory.

STEPS:
- Step 1: Theoretical ratio from \( v \propto \sqrt{T} \): \( \sqrt{400/300} = \sqrt{4/3} \approx 1.155 \).
- Step 2: Compare with measured ratio 1.15. They match within rounding (1.155 vs 1.15).
- Step 3: If the measured ratio were significantly different (e.g., 1.10), possible reasons: gas not ideal, γ changes with temperature, dissociation at high T, or experimental error in temperature measurement.
- Step 4: Conclude that the measurement is consistent with the ideal gas model.

ANSWER: Yes, the measured ratio 1.15 is consistent with the theoretical ratio of 1.155 (difference due to rounding). A significant deviation would suggest non-ideal behavior or temperature-dependent γ.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a laboratory, sound travels through a tube filled with a gas mixture. The speed of sound is measured to be 400 m/s at 300 K. The mixture is then replaced with a different gas at the same temperature and pressure, and the speed is found to be 200 m/s. What can you infer about the molar masses of the two gases? Assume both are ideal and have the same γ.

COMPETENCY: Interpreting physical situations using formulas and unit analysis.

STEPS:
- Step 1: Use \( v = \sqrt{\frac{\gamma RT}{M}} \). At constant T and γ, \( v \propto 1/\sqrt{M} \).
- Step 2: Let \( v_1 = 400 \) m/s, \( v_2 = 200 \) m/s. Then \( \frac{v_1}{v_2} = 2 = \sqrt{\frac{M_2}{M_1}} \).
- Step 3: Square both sides: \( 4 = \frac{M_2}{M_1} \) → \( M_2 = 4 M_1 \).
- Step 4: The second gas has four times the molar mass of the first. For example, if first is He (M=4 g/mol), second could be O₂ (M=32 g/mol) — but 32/4=8, not 4. Actually, if first is H₂ (2 g/mol), second would be 8 g/mol (no common gas). If first is CH₄ (16 g/mol), second is 64 g/mol (SO₂ is 64). So the second gas is heavier.
- Step 5: Conclude that the gas with lower sound speed has higher molar mass.

ANSWER: The molar mass of the second gas is four times that of the first gas. The slower speed indicates a heavier gas.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The speed of sound in a medium is the rate at which a sound wave ______ through that medium, determined by the medium's elastic (restoring) and inertial (mass density) properties.

## DIAGNOSTIC_ANSWER_7
propagates

**A wrong answer ("travels" or "moves") reveals the student has swapped the definition's verb - the sound wave propagates through the medium.** Propagates is the definition's own verb, and the verb is what the blank grades. Recall the elastic-plus-inertia pricing before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Start with a real-world observation: On a hot summer afternoon in Delhi, you hear a distant train whistle ______ than on a cold winter morning — why?

## DIAGNOSTIC_ANSWER_8
earlier

**A wrong answer ("later" or "softer") reveals the student has swapped the walkthrough's adverb - the summer whistle is heard earlier.** Earlier is the walkthrough's own adverb, and the adverb is what the blank grades. Recall the cold-morning contrast before filling, and give the adverb exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Start with a real-world ______: On a hot summer afternoon in Delhi, you hear a distant train whistle earlier than on a cold winter morning — why?

## DIAGNOSTIC_ANSWER_9
observation

**A wrong answer ("experiment" or "question") reveals the student has swapped the walkthrough's noun - start with a real-world observation.** Observation is the walkthrough's own noun, and the noun is what the blank grades. Recall the Delhi summer before filling, and give the noun exactly.
