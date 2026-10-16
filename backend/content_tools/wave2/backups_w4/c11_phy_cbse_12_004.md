## ELI5
The rms speed is the honest average of molecular hurry: square every speed, average, then unsquare. The formula reads the square root of 3RT over M - kelvin mandatory, molar mass in kilograms per mole. Lighter gases outrun heavier ones at the same temperature, which is why hydrogen leaks where air politely stays.

## DEFINITION
Root mean square (rms) speed is the square root of the mean of the squares of the speeds of all molecules in a gas sample. It is a measure of the typical molecular speed in a gas and is given by \(v_{\text{rms}} = \sqrt{\frac{3k_B T}{m}} = \sqrt{\frac{3RT}{M}}\), where \(k_B\) is Boltzmann constant, \(T\) is absolute temperature (K), \(m\) is mass of one molecule (kg), \(R\) is universal gas constant, and \(M\) is molar mass (kg/mol). SI unit: m/s.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can calculate \(v_{\text{rms}}\) for any ideal gas given temperature and molar mass (or molecular mass), correctly convert units (especially temperature to Kelvin and molar mass to kg/mol), and explain why lighter gases have higher rms speeds at the same temperature.

## SCOPE_BOUNDARY
Covers derivation of rms speed from kinetic theory pressure equation, the two equivalent formulas (using \(k_B\) and \(m\) or \(R\) and \(M\)), and numerical calculations. Does NOT cover Maxwell-Boltzmann distribution details (most probable speed, average speed), mean free path, or degrees of freedom.

## WALKTHROUGH
Observe a pressure cooker whistle: steam escapes at high speed, creating sound. The speed of those steam molecules is related to the temperature inside. Begin by recalling the kinetic theory pressure formula \(P = \frac{1}{3} n m \overline{v^2}\) from the previous node (c11_phy_cbse_12_002). Combine it with the ideal gas law \(PV = nRT\) (or \(PV = N k_B T\)) to eliminate pressure and volume. The key step is recognizing that \(\overline{v^2}\) is the mean square speed, so its square root is \(v_{\text{rms}}\). Emphasize that temperature MUST be in Kelvin and molar mass in kg/mol for SI consistency. End with the two key formulas: \(v_{\text{rms}} = \sqrt{3RT/M}\) and \(v_{\text{rms}} = \sqrt{3k_B T/m}\).

Takeaway: mastery means computing rms speeds with disciplined units, and predicting the mass and temperature dependences. Exam moves: calculate-the-speed questions and compare-the-gases items. Check yourself: the square root halves any temperature change - quadruple the kelvin, double the hurry. Students miss it because they feed Celsius into the formula, when the definition's reference is absolute zero: the 273 does not cancel, and every rms speed is measured from the true zero of motion.  Kelvin in, metres per second out - the units keep the honest books.  One formula, two costumes, zero excuses for Celsius.

## DIAGNOSTIC_QUESTION_1
Write the formula for root mean square speed of gas molecules in terms of universal gas constant \(R\), absolute temperature \(T\), and molar mass \(M\). State the SI unit of each quantity.

## DIAGNOSTIC_ANSWER_1
\(v_{\text{rms}} = \sqrt{\frac{3RT}{M}}\). \(R = 8.31\ \text{J mol}^{-1}\text{K}^{-1}\), \(T\) in K, \(M\) in kg/mol, \(v_{\text{rms}}\) in m/s. A wrong answer (e.g., using \(M\) in g/mol without conversion, or using Celsius) reveals the student does not track SI unit consistency in the formula.

## DIAGNOSTIC_QUESTION_2
Two gases, hydrogen (molar mass 2 g/mol) and oxygen (32 g/mol), are at the same temperature. Which has a higher rms speed? Explain why the rms speed depends on molar mass but not on the gas pressure.

## DIAGNOSTIC_ANSWER_2
Hydrogen has higher \(v_{\text{rms}}\) because \(v_{\text{rms}} \propto 1/\sqrt{M}\). At same \(T\), lighter molecules move faster. Pressure does not appear in the final formula \(v_{\text{rms}} = \sqrt{3RT/M}\); it cancels out when combining \(P = \frac{1}{3}\rho \overline{v^2}\) with \(PV = nRT\). A student who says "higher pressure means higher speed" confuses macroscopic pressure with microscopic speed and has not understood the derivation.

## DIAGNOSTIC_QUESTION_3
Calculate the rms speed of nitrogen gas (\(M = 28\ \text{g/mol}\)) at \(27^\circ\text{C}\). Use \(R = 8.31\ \text{J mol}^{-1}\text{K}^{-1}\).

## DIAGNOSTIC_ANSWER_3
Step 1: Convert \(T = 27 + 273 = 300\ \text{K}\). Step 2: Convert \(M = 28\ \text{g/mol} = 0.028\ \text{kg/mol}\). Step 3: Substitute: \(v_{\text{rms}} = \sqrt{\frac{3 \times 8.31 \times 300}{0.028}}\). Step 4: Compute numerator: \(3 \times 8.31 \times 300 = 7479\). Step 5: Divide: \(7479 / 0.028 = 267107\). Step 6: Square root: \(\sqrt{267107} \approx 517\ \text{m/s}\). A wrong answer (e.g., 16 m/s) usually comes from forgetting to convert g/mol to kg/mol (using 28 instead of 0.028) or using Celsius temperature.

## DIAGNOSTIC_QUESTION_4
A graph of \(v_{\text{rms}}^2\) vs \(T\) for a fixed mass of an ideal gas is plotted. What is the slope of this graph? If the same gas is taken at double the molar mass (by considering a dimer), how does the slope change?

## DIAGNOSTIC_ANSWER_4
From \(v_{\text{rms}}^2 = \frac{3R}{M} T\), slope = \(\frac{3R}{M}\). If molar mass doubles, slope halves. A student who says slope is unchanged or doubles has not recognized that \(v_{\text{rms}}^2\) is directly proportional to \(T\) with proportionality constant \(3R/M\).

## DIAGNOSTIC_QUESTION_5
A student calculates \(v_{\text{rms}}\) for oxygen at 300 K using \(M = 32\ \text{g/mol}\) directly in the formula \(v_{\text{rms}} = \sqrt{3RT/M}\) with \(R = 8.31\). They get \(v_{\text{rms}} \approx 15.3\ \text{m/s}\). Identify the error and give the correct value.

## DIAGNOSTIC_ANSWER_5
Error: Molar mass used in g/mol instead of kg/mol. Correct \(M = 0.032\ \text{kg/mol}\). Correct calculation: \(\sqrt{\frac{3 \times 8.31 \times 300}{0.032}} = \sqrt{233719} \approx 483\ \text{m/s}\). The student’s answer is off by factor \(\sqrt{1000} \approx 31.6\) because they omitted the kg conversion. This reveals a unit-analysis gap.

## DIAGNOSTIC_QUESTION_6
Design a simple thought experiment using a balloon filled with helium and another with argon, both at room temperature, to demonstrate the difference in rms speeds without measuring speed directly. What observable phenomenon would you use?

## DIAGNOSTIC_ANSWER_6
Good answer: Use rate of diffusion/effusion. Helium balloon deflates faster than argon balloon because lighter He atoms have higher \(v_{\text{rms}}\) and escape through microscopic pores faster (Graham's law). Or: Inhale helium vs argon (not recommended) – voice pitch changes due to speed of sound \(\propto v_{\text{rms}}\). A poor answer suggests measuring temperature change or pressure, which does not directly show molecular speed difference.

## COMMON_MISCONCEPTION
Students often think \(v_{\text{rms}}\) is the same as average speed \(\bar{v}\) (mean of speeds). They are different: \(v_{\text{rms}} = \sqrt{\overline{v^2}}\) while \(\bar{v} = \overline{v}\). For a Maxwell distribution, \(v_{\text{rms}} : \bar{v} : v_{\text{mp}} = 1.73 : 1.60 : 1.41\). Another error: using Celsius temperature in the formula because "the 273 cancels out" – it does not; absolute zero is the reference for kinetic energy.

## ON_FAILURE
If a student confuses \(v_{\text{rms}}\) with average speed, have them compute both for a simple 3-molecule system: speeds 1, 2, 3 m/s. \(\bar{v} = 2\), \(\overline{v^2} = (1+4+9)/3 = 14/3\), \(v_{\text{rms}} = \sqrt{14/3} \approx 2.16\). The difference is clear. For Celsius error, ask: "If T = 0°C, does kinetic energy become zero?" No, it's 273 K. Emphasize that \(v_{\text{rms}} \propto \sqrt{T}\) requires absolute zero as origin.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_12_002, c11_phy_cbse_12_003, c9_math_ch1_4, c10_math_cbse_04_005, c11_phy_cbse_12_001

## PREREQUISITE_REASONS
c11_phy_cbse_12_002: Provides the pressure derivation \(P = \frac{1}{3} n m \overline{v^2}\) which is the starting point for deriving \(v_{\text{rms}}\). c11_phy_cbse_12_003: Establishes the kinetic interpretation of temperature \(\frac{1}{2}m\overline{v^2} = \frac{3}{2}k_B T\), directly yielding the rms formula. c9_math_ch1_4: Distance formula using Pythagoras builds familiarity with squares and square roots in physical formulas. c10_math_cbse_04_005: Quadratic formula and square root manipulation are essential for solving \(v_{\text{rms}} = \sqrt{3RT/M}\).
c11_phy_cbse_12_001: RMS speed formula derives directly from kinetic interpretation of temperature (½mv² = ³/₂kT).  
c11_phy_cbse_12_003: RMS speed formula v_rms = √(3k_BT/m) directly follows from kinetic interpretation; this node provides its physical basis.  
c9_math_ch1_4: Requires this concept - this node (Root mean square (rms) speed is the square root of the mean of the squares of the speeds o...) builds directly on that foundation.  
c10_math_cbse_04_005: Requires this concept - this node (Root mean square (rms) speed is the square root of the mean of the squares of the speeds o...) builds directly on that foundation.  

## FORWARD_NODE_IDS
c11_phy_cbse_12_005, c11_phy_cbse_12_007, c11_phy_cbse_12_009

## FORWARD_REASONS
c11_phy_cbse_12_005: Degrees of freedom and equipartition use the translational kinetic energy \(\frac{1}{2}m v_{\text{rms}}^2\) as the baseline for energy per degree of freedom. c11_phy_cbse_12_006: Specific heat capacities depend on molecular speeds and energy; \(v_{\text{rms}}\) sets the energy scale. c11_phy_cbse_12_007: Mean free path calculation uses average speed \(\bar{v}\) which is derived from the same distribution as \(v_{\text{rms}}\). c11_phy_cbse_12_009: Maxwell's speed distribution gives the full context: \(v_{\text{rms}}\) is one of three characteristic speeds (most probable, average, rms).
c11_phy_cbse_12_007: RMS speed formula provides the quantitative value of \(\langle v \rangle\) for numerical calculations.  
c11_phy_cbse_12_009: RMS speed formula v_rms = √(3k_BT/m) is one of the three characteristic speeds derived from the distribution.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c10_math_cbse_04_005, c10_phy_cbse_01_003
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Square root and squared terms in distance formula parallel the rms formula structure. c10_math_cbse_04_005: Quadratic formula practice ensures fluency with \(\sqrt{}\) operations and unit handling inside roots. c10_phy_cbse_01_003: Ohm's law \(V=IR\) trains proportional reasoning (here \(v_{\text{rms}} \propto \sqrt{T}\), \(v_{\text{rms}} \propto 1/\sqrt{M}\)) and unit consistency.
c10_math_cbse_04_005: Cross-subject support: this concept supplies tools/facts used directly in this node.  
c10_phy_cbse_01_003: Cross-subject support: this concept supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_12_002 -> c11_phy_cbse_12_003 -> c11_phy_cbse_12_004 -> c11_phy_cbse_12_005

## THIS_FORMULA
\(v_{\text{rms}} = \sqrt{\frac{3RT}{M}} = \sqrt{\frac{3k_B T}{m}}\)

## FORMULA_VARIABLES
\(v_{\text{rms}}\) = root mean square speed (m/s), \(R\) = universal gas constant = 8.31 J mol⁻¹ K⁻¹, \(T\) = absolute temperature (K), \(M\) = molar mass (kg/mol), \(k_B\) = Boltzmann constant = 1.38 × 10⁻²³ J/K, \(m\) = mass of one molecule (kg)

## FORMULA_UNITS
m/s, J mol⁻¹ K⁻¹, K, kg/mol, J/K, kg

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch1_4 | The distance formula \(\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\) uses the same root-of-sum-of-squares structure as rms speed \(\sqrt{\overline{v^2}}\), reinforcing the geometric meaning of "root mean square".
c10_math_cbse_04_005 | Quadratic formula \(x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}\) requires careful square root evaluation and unit tracking, directly analogous to computing \(\sqrt{3RT/M}\) with mixed units.

## PREREQ_CONCEPT
Kinetic interpretation of temperature: \(\frac{1}{2}m\overline{v^2} = \frac{3}{2}k_B T\) (from node c11_phy_cbse_12_003).

## PREREQ_BEFORE
Student must be able to write the ideal gas law in both \(PV = nRT\) and \(PV = N k_B T\) forms, and convert between molar mass (g/mol) and molecular mass (kg) using Avogadro's number.

## PREREQ_STUCK
If stuck on unit conversion, revisit the definition of molar mass: \(M = m N_A\). Practice converting 32 g/mol → 0.032 kg/mol and finding \(m = M/N_A\).

## WORKED_EXAMPLE_1
PROBLEM: An LPG cylinder contains butane gas (C₄H₁₀, molar mass 58 g/mol) at 300 K. Calculate the rms speed of butane molecules. Use \(R = 8.31\ \text{J mol}^{-1}\text{K}^{-1}\).
STEPS:
- Step 1: Identify given: \(T = 300\ \text{K}\), \(M = 58\ \text{g/mol} = 0.058\ \text{kg/mol}\), \(R = 8.31\ \text{J mol}^{-1}\text{K}^{-1}\). Find \(v_{\text{rms}}\).
- Step 2: Write formula: \(v_{\text{rms}} = \sqrt{\frac{3RT}{M}}\). Check units: \(R\) in J/mol·K = kg·m²/s²·mol·K, \(T\) in K, \(M\) in kg/mol → \(\frac{3RT}{M}\) has units m²/s² → sqrt gives m/s. Correct.
- Step 3: Substitute values: \(v_{\text{rms}} = \sqrt{\frac{3 \times 8.31 \times 300}{0.058}}\).
- Step 4: Compute numerator: \(3 \times 8.31 = 24.93\); \(24.93 \times 300 = 7479\ \text{J/mol}\).
- Step 5: Divide by \(M\): \(7479 / 0.058 = 128,948\ \text{m}^2/\text{s}^2\).
- Step 6: Square root: \(\sqrt{128948} \approx 359\ \text{m/s}\).
REASONING: Butane is heavier than air (average ~29 g/mol), so its rms speed at room temperature is lower than that of nitrogen (~517 m/s). The calculation follows directly from the equipartition theorem: each translational degree of freedom gets \(\frac{1}{2}k_B T\), total \(\frac{3}{2}k_B T = \frac{1}{2}m v_{\text{rms}}^2\).
ANSWER: 359 m/s

## WORKED_EXAMPLE_2
PROBLEM: At what temperature will the rms speed of hydrogen molecules (H₂, molar mass 2.02 g/mol) equal the rms speed of oxygen molecules (O₂, 32.0 g/mol) at 400 K?
STEPS:
- Step 1: Given: \(M_{\text{H}_2} = 2.02\ \text{g/mol} = 0.00202\ \text{kg/mol}\), \(M_{\text{O}_2} = 32.0\ \text{g/mol} = 0.0320\ \text{kg/mol}\), \(T_{\text{O}_2} = 400\ \text{K}\). Find \(T_{\text{H}_2}\).
- Step 2: Equate rms speeds: \(\sqrt{\frac{3R T_{\text{H}_2}}{M_{\text{H}_2}}} = \sqrt{\frac{3R T_{\text{O}_2}}{M_{\text{O}_2}}}\).
- Step 3: Cancel \(3R\) and square both sides: \(\frac{T_{\text{H}_2}}{M_{\text{H}_2}} = \frac{T_{\text{O}_2}}{M_{\text{O}_2}}\).
- Step 4: Solve for \(T_{\text{H}_2}\): \(T_{\text{H}_2} = T_{\text{O}_2} \times \frac{M_{\text{H}_2}}{M_{\text{O}_2}} = 400 \times \frac{2.02}{32.0}\).
- Step 5: Compute ratio: \(2.02 / 32.0 = 0.063125\).
- Step 6: Multiply: \(400 \times 0.063125 = 25.25\ \text{K}\).
REASONING: Since \(v_{\text{rms}} \propto \sqrt{T/M}\), for equal speeds the ratio \(T/M\) must be constant. Hydrogen is ~16 times lighter, so it needs ~16 times lower temperature to have the same rms speed. This illustrates the strong mass dependence.
ANSWER: 25.3 K (or 25.25 K)

## WORKED_EXAMPLE_3
PROBLEM: A mixture of helium (He, 4 g/mol) and argon (Ar, 40 g/mol) is kept at 300 K in a container. (a) Find the ratio of their rms speeds. (b) If the total pressure is 1 atm, does the partial pressure affect their individual rms speeds? (c) Calculate the rms speed of each gas.
STEPS:
- Step 1: (a) Ratio \(v_{\text{rms,He}} / v_{\text{rms,Ar}} = \sqrt{M_{\text{Ar}} / M_{\text{He}}} = \sqrt{40/4} = \sqrt{10} \approx 3.16\).
- Step 2: (b) No. \(v_{\text{rms}}\) depends only on \(T\) and \(M\), not on pressure or mixture composition (for ideal gases). Each gas behaves as if alone at that temperature.
- Step 3: (c) For He: \(M = 0.004\ \text{kg/mol}\). \(v_{\text{rms}} = \sqrt{\frac{3 \times 8.31 \times 300}{0.004}} = \sqrt{1,869,750} \approx 1367\ \text{m/s}\).
- Step 4: For Ar: \(M = 0.040\ \text{kg/mol}\). \(v_{\text{rms}} = \sqrt{\frac{3 \times 8.31 \times 300}{0.040}} = \sqrt{186,975} \approx 432\ \text{m/s}\).
- Step 5: Verify ratio: \(1367 / 432 \approx 3.16\). Matches part (a).
- Step 6: Check reasonableness: He is light, so high speed (~1.4 km/s); Ar is heavy, slower (~430 m/s). Both are supersonic (speed of sound ~340 m/s).
REASONING: In a mixture at thermal equilibrium, all gases have the same temperature, hence same average kinetic energy per molecule. Lighter molecules must move faster to have the same kinetic energy. Partial pressure affects number density, not the speed distribution.
ANSWER: (a) 3.16, (b) No, (c) He: 1367 m/s, Ar: 432 m/s

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If we double the pressure of an ideal gas by compressing it isothermally, the rms speed of its molecules will increase by a factor of \(\sqrt{2}\) because pressure is proportional to the square of rms speed (\(P \propto v_{\text{rms}}^2\))." Evaluate this claim. Is it correct? Explain using the kinetic theory formula for pressure and the ideal gas law.
COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Recall kinetic theory pressure formula: \(P = \frac{1}{3} \rho v_{\text{rms}}^2\) where \(\rho = m n\) is mass density.
- Step 2: For isothermal compression of a fixed mass of gas, temperature \(T\) is constant.
- Step 3: From ideal gas law, \(PV = nRT\) → \(P \propto 1/V\) at constant \(T\). Density \(\rho = m/V \propto P\).
- Step 4: Substitute into pressure formula: \(P = \frac{1}{3} \rho v_{\text{rms}}^2\). Since \(\rho \propto P\), we get \(P \propto P \cdot v_{\text{rms}}^2\) → \(v_{\text{rms}}^2\) must be constant.
- Step 5: Alternatively, directly from \(v_{\text{rms}} = \sqrt{3RT/M}\), if \(T\) constant, \(v_{\text{rms}}\) constant.
- Step 6: Conclusion: The claim is false. rms speed does not change during isothermal compression. The student incorrectly treated density as constant.
ANSWER: The claim is incorrect. During isothermal compression, temperature remains constant, so \(v_{\text{rms}} = \sqrt{3RT/M}\) remains unchanged. The pressure increase comes entirely from increased density (more molecules per volume), not from increased molecular speed.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The escape velocity from Earth's surface is 11.2 km/s. At what temperature would the rms speed of nitrogen molecules (N₂, 28 g/mol) equal the escape velocity? If the temperature of Earth's upper atmosphere (exosphere) is about 1500 K, can nitrogen escape into space? What about hydrogen (H₂, 2 g/mol) at the same temperature? Use \(R = 8.31\ \text{J mol}^{-1}\text{K}^{-1}\).
COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Set \(v_{\text{rms}} = 11,200\ \text{m/s}\) for N₂. \(M = 0.028\ \text{kg/mol}\).
- Step 2: \(v_{\text{rms}}^2 = \frac{3RT}{M}\) → \(T = \frac{M v_{\text{rms}}^2}{3R}\).
- Step 3: Compute: \(T = \frac{0.028 \times (11200)^2}{3 \times 8.31} = \frac{0.028 \times 1.2544 \times 10^8}{24.93} = \frac{3.512 \times 10^6}{24.93} \approx 140,900\ \text{K}\).
- Step 4: For N₂ at 1500 K: \(v_{\text{rms}} = \sqrt{\frac{3 \times 8.31 \times 1500}{0.028}} = \sqrt{1,336,607} \approx 1156\ \text{m/s} = 1.16\ \text{km/s}\). Much less than 11.2 km/s. Nitrogen cannot escape thermally.
- Step 5: For H₂ at 1500 K: \(M = 0.002\ \text{kg/mol}\). \(v_{\text{rms}} = \sqrt{\frac{3 \times 8.31 \times 1500}{0.002}} = \sqrt{18,697,500} \approx 4324\ \text{m/s} = 4.3\ \text{km/s}\). Still less than 11.2 km/s, but closer. However, some molecules in the high-speed tail of Maxwell distribution exceed escape velocity, leading to slow atmospheric loss over geological time.
- Step 6: Conclusion: Thermal escape requires extremely high temperatures for heavy gases; lighter gases escape more easily.
ANSWER: For N₂, \(T \approx 1.4 \times 10^5\ \text{K}\). At 1500 K, N₂ rms speed is 1.16 km/s (cannot escape). H₂ rms speed at 1500 K is 4.3 km/s (still below escape velocity, but high-energy tail allows gradual escape).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Root mean square (rms) speed is the square root of the mean of the squares of the speeds of all ______ in a gas sample.

## DIAGNOSTIC_ANSWER_7
molecules

**A wrong answer ("particles" or "atoms") reveals the student has swapped the definition's census - the speeds averaged are those of all molecules.** Molecules is the definition's own census noun, and the noun is what the blank grades. Recall the square-then-average-then-unsquare recipe before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ______ cooker whistle: steam escapes at high speed, creating sound.

## DIAGNOSTIC_ANSWER_8
pressure

**A wrong answer ("cooking" or "steam") reveals the student has swapped the walkthrough's appliance - the example is a pressure cooker whistle.** Pressure is the walkthrough's own first half of that appliance, and the noun is what the blank grades. Recall the escaping steam before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What is Root mean square (rms) speed? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Root mean square (rms) speed is the square root of the mean of the squares of the speeds of all molecules in a gas sample.

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: root mean square speed is the square root of the mean of the squares of the speeds of all molecules in a gas sample.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Root mean square (rms) speed?

## DIAGNOSTIC_ANSWER_10
Another error: using Celsius temperature in the formula because "the 273 cancels out" – it does not; absolute zero is the reference for kinetic energy.

**A wrong answer (Celsius works because 273 cancels) reveals the student holds the flagged mix-up.** Nothing cancels: the formula squares an absolute temperature, absolute zero is the reference for kinetic energy, and a Celsius input shifts every answer by the square root of the 273 ratio.
