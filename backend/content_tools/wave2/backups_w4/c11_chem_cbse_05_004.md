## ELI5
Block a syringe nozzle with your finger and push the plunger - the harder you squeeze the volume, the harder the trapped air pushes back. That stubbornness is Boyle's Law: at constant temperature, gas pressure is inversely proportional to volume, PV = k, or P₁V₁ = P₂V₂ between two states. The moving particles never change; squeezed into less space they simply strike the walls more often, and more strikes per second read as more pressure.

## DEFINITION
Boyle's Law states that for a fixed amount of gas at constant temperature, the pressure exerted by the gas is inversely proportional to its volume. Mathematically, \(P \propto \frac{1}{V}\) or \(PV = k\) (constant), where \(P\) is pressure, \(V\) is volume, and \(k\) depends on the amount of gas and temperature.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can state Boyle's Law with its constant conditions, derive the relationship \(P_1V_1 = P_2V_2\), solve numerical problems involving pressure-volume changes at constant temperature, and explain the kinetic molecular basis for the inverse relationship.

## SCOPE_BOUNDARY
Covers Boyle's Law for ideal gases at constant temperature and fixed amount (moles). Includes graphical representations (P vs V, P vs 1/V, PV vs P) and numerical applications. Does NOT cover real gas deviations (covered in c11_chem_cbse_05_010), Charles's Law (c11_chem_cbse_05_005), or the combined gas law (c11_chem_cbse_05_006).

## WALKTHROUGH
Notice what happens when you push the plunger of a sealed syringe with your finger blocking the nozzle — the plunger resists and pushes back harder as the volume decreases. This everyday observation reveals the inverse pressure-volume relationship. Begin by recalling from Class 9 (c9_chem_ch2_5) that gas particles are in constant random motion and exert pressure by colliding with container walls. When volume decreases at constant temperature, the same number of particles hit the walls more frequently, increasing pressure. Connect this to the mathematical statement \(PV = \text{constant}\) and the graphical verification using \(P\) vs \(1/V\) linearity.

Takeaway: mastery means stating the law with its conditions - fixed amount, constant temperature - deriving P₁V₁ = P₂V₂, and solving numericals across pressure-volume changes. Exam moves: calculate-the-new-pressure questions and explain-the-inverse items. Check yourself: the syringe plunger is the anchor - the push-back you feel is wall collisions rising. Students miss it because they apply the law while temperature drifts, when the definition's condition is constant temperature: heat the gas as you squeeze and the pressure climbs for two reasons at once, and the clean inverse proportionality - the straight P versus 1/V line - quietly stops being straight. Hold the temperature still, and the graph rewards you with the straightest line in gas law.

## DIAGNOSTIC_QUESTION_1
State Boyle's Law and write its mathematical expression. What are the two conditions that must remain constant for this law to hold?

## DIAGNOSTIC_ANSWER_1
Boyle's Law: At constant temperature and fixed amount of gas, pressure is inversely proportional to volume. \(P \propto 1/V\) or \(PV = k\). Conditions: constant temperature (isothermal) and constant number of moles (closed system). A wrong answer (e.g., missing "constant temperature" or writing \(P \propto V\)) reveals confusion with Charles's Law or failure to recognize the required constraints.

## DIAGNOSTIC_QUESTION_2
A gas occupies 500 mL at 1 atm pressure. If the volume is reduced to 250 mL at the same temperature, what is the new pressure? Explain why the pressure changes in terms of particle collisions.

## DIAGNOSTIC_ANSWER_2
Using \(P_1V_1 = P_2V_2\): \(P_2 = \frac{P_1V_1}{V_2} = \frac{1 \times 500}{250} = 2\) atm. Pressure doubles because halving the volume doubles the frequency of particle-wall collisions (same kinetic energy, same number of particles, but half the space). A wrong answer (e.g., 0.5 atm) shows misunderstanding of inverse proportionality; a correct calculation without collision explanation indicates rote application without kinetic understanding.

## DIAGNOSTIC_QUESTION_3
A student plots \(P\) vs \(V\) for a gas at constant temperature and gets a hyperbola. Another student plots \(P\) vs \(1/V\) and gets a straight line through the origin. Which plot confirms Boyle's Law more directly? Why does the \(P\) vs \(1/V\) line pass through the origin?

## DIAGNOSTIC_ANSWER_3
The \(P\) vs \(1/V\) plot confirms Boyle's Law directly because it yields a straight line (\(P = k \times 1/V\)), making verification of proportionality immediate. The line passes through the origin because when \(1/V = 0\) (infinite volume), pressure is zero — consistent with \(PV = k\). A wrong choice (hyperbola) or inability to explain the origin intercept shows lack of understanding of linearizing inverse relationships.

## DIAGNOSTIC_QUESTION_4
Two identical cylinders contain the same gas at the same temperature. Cylinder A has volume 2 L at 3 atm. Cylinder B has volume 3 L at 2 atm. The cylinders are connected by a tube of negligible volume, and the valve is opened. What is the final pressure? Assume temperature constant.

## DIAGNOSTIC_ANSWER_4
Total initial moles (using \(PV = nRT\)): \(n_A = \frac{3 \times 2}{RT} = \frac{6}{RT}\), \(n_B = \frac{2 \times 3}{RT} = \frac{6}{RT}\). Total \(n = \frac{12}{RT}\). Total volume = 5 L. Final pressure \(P_f = \frac{nRT}{V_f} = \frac{12}{5} = 2.4\) atm. Alternatively, using Boyle's Law on each gas expanding to 5 L: \(P_{A,f} = \frac{3 \times 2}{5} = 1.2\) atm, \(P_{B,f} = \frac{2 \times 3}{5} = 1.2\) atm, sum = 2.4 atm. A wrong answer (e.g., averaging pressures to 2.5 atm) reveals failure to conserve moles or apply Boyle's Law to each component separately.

## DIAGNOSTIC_QUESTION_5
A weather balloon contains helium at 1 atm and 10 m³ volume at ground level. As it rises, the external pressure drops to 0.5 atm. Assuming temperature constant and the balloon expands freely until internal pressure equals external pressure, what is the new volume? Is the balloon likely to burst? Justify.

## DIAGNOSTIC_ANSWER_5
\(P_1V_1 = P_2V_2 \Rightarrow V_2 = \frac{1 \times 10}{0.5} = 20\) m³. Volume doubles. Whether it bursts depends on the balloon's maximum elastic volume — if it can stretch beyond 20 m³, it won't burst; if its limit is < 20 m³, it will. A simple "yes/no" without referencing the balloon's material limit shows incomplete evaluation of real-world constraints.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a syringe, pressure sensor, and data logger to verify Boyle's Law. List the variables to control, the data to collect, and how you would analyze it to confirm \(PV = \text{constant}\).

## DIAGNOSTIC_ANSWER_6
Control: temperature (allow thermal equilibrium after each compression), amount of gas (sealed syringe), and sensor calibration. Collect: pressure readings at 5-6 different volumes (e.g., 60, 50, 40, 30, 20, 10 mL). Analyze: plot \(P\) vs \(1/V\) — should be linear through origin; calculate \(PV\) for each point — should be constant within experimental error. A design that doesn't mention temperature equilibration time or checking \(PV\) constancy misses critical error sources.

## COMMON_MISCONCEPTION
Students often think Boyle's Law applies when temperature changes, or they use \(P_1V_1 = P_2V_2\) for a gas that is being heated/cooled simultaneously. For example, in a problem where a gas is compressed *and* heated, they incorrectly apply Boyle's Law alone. The exact error: ignoring that \(k\) in \(PV = k\) changes with temperature. They also confuse "constant temperature" with "room temperature" — not realizing the process must be isothermal (slow enough for thermal equilibrium).

## ON_FAILURE
If a student applies Boyle's Law to a non-isothermal process: 1) Ask them to identify the three variables (P, V, T) and which one is held constant. 2) Show a syringe experiment where rapid compression warms the gas — pressure rises *more* than Boyle's Law predicts. 3) Have them re-read the law's statement and underline "constant temperature". 4) Practice classifying problems as "Boyle only", "Charles only", or "Combined" before solving.

## PREREQUISITE_NODE_IDS
c8_chem_ch2_5, c8_chem_ch2_8, c8_chem_ch2_9, c8_chem_ch2_10, c9_chem_ch2_5, c6_math_ch06_065, c6_math_ch06_066
## PREREQUISITE_REASONS
c8_chem_ch2_5: Establishes particle arrangement in gases (large interparticle space, weak forces) — prerequisite for understanding why gases are compressible.
c8_chem_ch2_8: Describes particle movement in gases (random, high speed) — basis for kinetic explanation of pressure.
c8_chem_ch2_9: Inter-particle space varies across states — explains why gas volume changes dramatically with pressure.
c8_chem_ch2_10: Inter-particle attraction is weak in gases — justifies ideal gas assumption for Boyle's Law.
c9_chem_ch2_5: Particle arrangement in states of matter — reinforces gas properties from Class 9.
c6_math_ch06_065: Direct proportion concept — needed to understand inverse proportion as \(P \propto 1/V\).
c6_math_ch06_066: Inverse proportion concept — mathematical foundation for Boyle's Law relationship.

## FORWARD_NODE_IDS
c11_chem_cbse_05_005, c11_chem_cbse_05_006, c11_chem_cbse_05_009
## FORWARD_REASONS
c11_chem_cbse_05_005: Charles's Law (V-T relationship) is the next gas law; combined with Boyle's Law gives combined gas law.
c11_chem_cbse_05_006: Ideal Gas Equation \(PV = nRT\) unifies Boyle's, Charles's, and Avogadro's laws; Boyle's Law is the constant-T, constant-n subset.
c11_chem_cbse_05_009: Kinetic Molecular Theory derives Boyle's Law from particle collisions; understanding Boyle's Law first motivates the kinetic derivation.

## CROSS_SUBJECT_PREREQS
c6_math_ch06_065, c6_math_ch06_066, c11_phy_cbse_11_001, c11_phy_cbse_11_002
## CROSS_SUBJECT_REASONS
c6_math_ch06_065: Direct proportion (Class 6 Maths) — foundation for understanding proportional relationships in gas laws.
c6_math_ch06_066: Inverse proportion (Class 6 Maths) — mathematical basis for \(P \propto 1/V\).
c11_physics_ch11_001: Thermodynamics - Thermal equilibrium and temperature (Class 11 Physics) — "constant temperature" condition requires understanding of thermal equilibrium and isothermal processes.
c11_physics_ch11_002: Thermodynamics - Work done by gas (Class 11 Physics) — Boyle's Law is used to calculate work in isothermal expansion/compression (\(W = nRT \ln(V_f/V_i)\)).
c11_phy_cbse_11_001: Cross-subject support: A thermodynamic system is a specific portion of the universe (a definite quantity of matte... supplies tools/facts used directly in this node.  
c11_phy_cbse_11_002: Cross-subject support: The Zeroth Law of Thermodynamics states that if two thermodynamic systems are each in ther... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c8_chem_ch2_5 -> c11_chem_cbse_05_004 -> c11_chem_cbse_05_005

## THIS_FORMULA
\(P_1V_1 = P_2V_2\) (at constant T and n)

## FORMULA_VARIABLES
\(P_1\) = initial pressure (Pa or atm), \(V_1\) = initial volume (m³ or L), \(P_2\) = final pressure (same units as \(P_1\)), \(V_2\) = final volume (same units as \(V_1\))

## FORMULA_UNITS
Pressure: Pa, atm, bar, mm Hg; Volume: m³, L, mL, cm³ (must be consistent)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch11_001 | Both require understanding of isothermal processes and thermal equilibrium for "constant temperature" condition
c11_physics_ch11_002 | Boyle's Law is used in Physics to derive work done in isothermal processes: \(W = \int P dV = nRT \ln(V_f/V_i)\)

## PREREQ_CONCEPT
Kinetic theory of gases: gas pressure arises from particle collisions with container walls; temperature measures average kinetic energy.

## PREREQ_BEFORE
Student must be able to explain why gas pressure increases when volume decreases at constant temperature using particle collision frequency.

## PREREQ_STUCK
Review Class 8 "Particle Arrangement and Movement in Gases" (c8_chem_ch2_8) and Class 6 "Inverse Proportion" (c6_math_ch06_066).

## WORKED_EXAMPLE_1
PROBLEM: A sealed syringe contains 30 mL of air at 1.0 atm pressure at 25°C. The plunger is pushed in slowly until the volume reads 10 mL. The temperature remains constant. What is the new pressure inside the syringe? If the plunger has a cross-sectional area of 2.5 cm², what force (in N) is required to hold it in place? (1 atm = 101325 Pa)

STEPS:
- Step 1: Identify knowns — \(P_1 = 1.0\) atm, \(V_1 = 30\) mL, \(V_2 = 10\) mL, constant T and n.
- Step 2: Apply Boyle's Law \(P_1V_1 = P_2V_2\) to find \(P_2 = \frac{P_1V_1}{V_2} = \frac{1.0 \times 30}{10} = 3.0\) atm.
- Step 3: Convert pressure to Pa: \(P_2 = 3.0 \times 101325 = 303975\) Pa.
- Step 4: Convert area to m²: \(A = 2.5\) cm² = \(2.5 \times 10^{-4}\) m².
- Step 5: Calculate force: \(F = P \times A = 303975 \times 2.5 \times 10^{-4} = 75.99\) N ≈ 76 N.

REASONING: Boyle's Law applies because temperature is constant (slow compression allows thermal equilibrium). The force calculation uses the definition of pressure (\(P = F/A\)), connecting chemistry gas laws to mechanics.

ANSWER: New pressure = 3.0 atm; Force required = 76 N.

## WORKED_EXAMPLE_2
PROBLEM: An oxygen cylinder for medical use has a volume of 10 L and is filled to a pressure of 150 atm at 20°C. A patient needs oxygen at 2 atm pressure. What volume of oxygen (at 2 atm and 20°C) can this cylinder supply? Assume the cylinder pressure drops to 2 atm when "empty".

STEPS:
- Step 1: Identify initial state: \(P_1 = 150\) atm, \(V_1 = 10\) L (cylinder volume). Final state in cylinder: \(P_2 = 2\) atm, \(V_2 = 10\) L (same cylinder).
- Step 2: The gas expands from cylinder to patient delivery system. The total amount of gas initially in cylinder is equivalent to gas at final conditions. Use Boyle's Law on the *entire gas sample*: initial amount (at 150 atm, 10 L) equals final amount distributed between cylinder (at 2 atm, 10 L) and delivered gas (at 2 atm, \(V_{delivered}\)).
- Step 3: Total initial \(PV = 150 \times 10 = 1500\) L·atm. Final total \(PV = 2 \times (10 + V_{delivered})\).
- Step 4: Equate: \(2 \times (10 + V_{delivered}) = 1500 \Rightarrow 10 + V_{delivered} = 750 \Rightarrow V_{delivered} = 740\) L.
- Step 5: Verify: Cylinder retains \(2 \times 10 = 20\) L·atm; delivered = \(2 \times 740 = 1480\) L·atm; sum = 1500 L·atm.

REASONING: The cylinder volume is fixed, but the gas expands into a larger effective volume at lower pressure. Boyle's Law applies to the fixed amount of gas as it expands from high-pressure cylinder to low-pressure delivery, with the cylinder itself acting as a fixed-volume reservoir at the end.

ANSWER: 740 L of oxygen at 2 atm and 20°C.

## WORKED_EXAMPLE_3
PROBLEM: A 2.0 L flask contains nitrogen at 500 mm Hg and 300 K. It is connected via a stopcock to an evacuated 3.0 L flask. The stopcock is opened, and the system equilibrates at 300 K. Then, the combined system is compressed isothermally to a total volume of 2.5 L. What is the final pressure in mm Hg?

STEPS:
- Step 1: First expansion (free expansion into vacuum): \(P_1 = 500\) mm Hg, \(V_1 = 2.0\) L, \(V_2 = 5.0\) L (total). \(P_{intermediate} = \frac{500 \times 2.0}{5.0} = 200\) mm Hg.
- Step 2: Isothermal compression: \(P_{intermediate} = 200\) mm Hg, \(V_{intermediate} = 5.0\) L, \(V_{final} = 2.5\) L.
- Step 3: Apply Boyle's Law again: \(P_{final} = \frac{200 \times 5.0}{2.5} = 400\) mm Hg.
- Step 4: Alternatively, combine steps: For the same gas at constant T, \(P_1V_1 = P_{final}V_{final}\) directly: \(P_{final} = \frac{500 \times 2.0}{2.5} = 400\) mm Hg. The intermediate free expansion doesn't change the product \(PV\) because T is constant throughout.
- Step 5: Check units and consistency: Pressure increased from 200 to 400 mm Hg as volume halved — consistent.

REASONING: The free expansion into vacuum is an irreversible process, but since temperature is constant and no work is done, the final equilibrium state obeys Boyle's Law. The two-step process (expansion then compression) can be shortcut because \(PV\) is a state function for isothermal ideal gas processes.

ANSWER: 400 mm Hg.

## COMPETENCY_QUESTION_1
QUESTION: A student performs Boyle's Law experiment using a gas syringe and pressure sensor. They record pressure at volumes: 60, 50, 40, 30, 20, 10 mL. The \(P\) vs \(1/V\) plot is linear but has a non-zero intercept on the pressure axis (i.e., when \(1/V = 0\), \(P = 0.2\) atm). List three possible experimental reasons for this deviation and explain how each would cause a positive intercept.

COMPETENCY: Analyzing experimental data and identifying systematic errors in gas law verification.

STEPS:
- Step 1: Recognize that ideal Boyle's Law predicts \(P = k(1/V)\) with zero intercept.
- Step 2: Identify non-idealities: (a) Gas not ideal — but at low pressures, real gases approach ideal; positive intercept suggests something else. (b) Dead volume in tubing/sensor — adds constant volume not accounted in syringe reading. (c) Temperature drift — if temperature rises during compression, pressure increases more than Boyle's Law predicts, causing upward curvature, but a linear fit might show positive intercept. (d) Pressure sensor zero error — sensor reads 0.2 atm when actual pressure is zero.
- Step 3: Select three distinct reasons: (1) Dead volume in connecting tube: actual volume = syringe volume + dead volume, so \(1/V_{actual} < 1/V_{syringe}\), shifting line right/up. (2) Pressure sensor calibration offset: adds constant to all readings. (3) Gas leakage into syringe from atmosphere during expansion: adds moles, increasing pressure at all volumes.
- Step 4: Explain each mechanism's effect on intercept.

ANSWER: 
1. Dead volume in tubing/sensor: The gas occupies syringe volume + fixed dead volume \(V_d\). Actual \(V = V_{syringe} + V_d\). Plotting \(P\) vs \(1/V_{syringe}\) gives \(P = k/(V_{syringe} + V_d)\), which at \(1/V_{syringe}=0\) (i.e., \(V_{syringe} \to \infty\)) gives \(P \to 0\), but the linear approximation over finite range yields positive intercept. 
2. Pressure sensor zero error: If sensor reads \(P_{reading} = P_{actual} + 0.2\) atm, the intercept is +0.2 atm.
3. Gas leakage into system: If air leaks in during expansion, \(n\) increases, so \(PV = nRT\) increases, raising pressure at all volumes, causing positive intercept in \(P\) vs \(1/V\) plot.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A scuba diver at 30 m depth (pressure = 4 atm) inhales 2.0 L of air from the tank into their lungs. They begin a rapid ascent to the surface (1 atm) while holding their breath. Assuming body temperature constant at 37°C, what would be the volume of air in their lungs at the surface if the lungs could expand freely? Why is this dangerous? What should the diver do instead?

COMPETENCY: Applying Boyle's Law to a real-life safety scenario and explaining physiological consequences.

STEPS:
- Step 1: Identify initial conditions: \(P_1 = 4\) atm, \(V_1 = 2.0\) L, constant T.
- Step 2: Apply Boyle's Law: \(P_1V_1 = P_2V_2 \Rightarrow V_2 = \frac{4 \times 2.0}{1} = 8.0\) L.
- Step 3: Recognize human lung total capacity is ~6 L. 8 L exceeds this, causing pulmonary barotrauma (lung rupture).
- Step 4: Explain the danger: Alveoli rupture, air enters bloodstream (arterial gas embolism), can cause stroke, death.
- Step 5: State correct procedure: Never hold breath; exhale continuously during ascent to let expanding air escape.

ANSWER: Volume would be 8.0 L, exceeding lung capacity (~6 L), causing pulmonary barotrauma and possible arterial gas embolism. The diver must exhale continuously during ascent to allow expanding air to escape.

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Boyle's Law states that for a fixed amount of gas at constant temperature, the pressure exerted by the gas is inversely ______ to its volume.

## DIAGNOSTIC_ANSWER_7
proportional

**A wrong answer ('directly') reveals the student has swapped the definition's relationship - pressure is inversely proportional to volume, the two moving opposite ways.** Inversely is the definition's own word, and the blank grades it. Recall the syringe scene - squeeze the volume down and the pressure climbs - before filling, and give the word exactly: direct proportionality would mean squeezing raises volume, the opposite of what the plunger reports.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Notice what happens when you push the plunger of a sealed syringe with your finger blocking the nozzle — the plunger resists and pushes back harder as the volume ______.

## DIAGNOSTIC_ANSWER_8
decreases

**A wrong answer ('increases') reveals the student has swapped the walkthrough's trend - the plunger pushes back harder as the volume decreases.** Decreases is the walkthrough's own verb, and the verb is what the blank grades. Recall the sealed-syringe experiment before filling, and give the verb exactly: less space, more collisions, more pressure - the inverse relationship felt in one fingertip.
