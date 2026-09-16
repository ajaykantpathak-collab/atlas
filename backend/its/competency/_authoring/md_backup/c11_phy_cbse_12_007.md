## DEFINITION
Mean free path is the average distance traveled by a gas molecule between two successive collisions with other molecules. It is a statistical quantity representing the mean of the free paths of all molecules in a gas at equilibrium. The SI unit is metre (m). For an ideal gas of rigid spherical molecules of diameter \(d\) and number density \(n\), the mean free path \(\lambda\) is given by \(\lambda = \frac{1}{\sqrt{2} \pi d^2 n}\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the mean free path formula from collision geometry, calculate it for a given gas using number density and molecular diameter, and explain why it is much larger than the intermolecular distance in gases.

## SCOPE_BOUNDARY
This node covers the definition, simplified derivation (moving molecule vs stationary targets), the exact formula with the \(\sqrt{2}\) correction for relative motion, and numerical estimation for ideal gases. It does NOT cover transport phenomena (viscosity, thermal conductivity, diffusion) or mean free path in degenerate gases or plasmas.

## WALKTHROUGH
Observe that when a gas cylinder leaks in a kitchen, the smell takes minutes to reach the other corner even though molecules move at ~500 m/s. This is because molecules collide frequently, deflecting their paths. Imagine a single molecule moving through a crowd of stationary molecules: it sweeps a cylindrical volume \(\pi d^2 \langle v \rangle \Delta t\) in time \(\Delta t\). Any molecule whose centre lies in this cylinder will collide. The number of collisions is \(n \pi d^2 \langle v \rangle \Delta t\), giving collision frequency \(n \pi d^2 \langle v \rangle\). The average distance between collisions is \(\langle v \rangle\) divided by this frequency, yielding \(\lambda = 1/(\pi d^2 n)\). A rigorous treatment replaces \(\langle v \rangle\) with average relative speed \(\langle v_r \rangle = \sqrt{2} \langle v \rangle\), giving the exact formula \(\lambda = 1/(\sqrt{2} \pi d^2 n)\).

## DIAGNOSTIC_QUESTION_1
State the definition of mean free path and write its exact formula in terms of molecular diameter \(d\) and number density \(n\). What is its SI unit?

## DIAGNOSTIC_ANSWER_1
Mean free path (\(\lambda\)) is the average distance a molecule travels between two successive collisions. Exact formula: \(\lambda = \frac{1}{\sqrt{2} \pi d^2 n}\). SI unit: metre (m). A wrong answer (e.g., omitting \(\sqrt{2}\) or using \(r\) instead of \(d\)) reveals confusion between the simplified derivation (stationary targets) and the exact result (moving targets), or confusion between radius and diameter.

## DIAGNOSTIC_QUESTION_2
In the exact derivation of mean free path, a factor of \(1/\sqrt{2}\) appears compared to the simplified derivation. Explain physically why this factor arises and what assumption about the other molecules is relaxed.

## DIAGNOSTIC_ANSWER_2
The simplified derivation assumes all other molecules are at rest. In reality, all molecules move with a distribution of velocities. The collision rate depends on the average relative speed \(\langle v_r \rangle\), not the average speed \(\langle v \rangle\). For a Maxwellian distribution, \(\langle v_r \rangle = \sqrt{2} \langle v \rangle\). Since collision frequency is proportional to relative speed, the mean free path decreases by \(1/\sqrt{2}\). A wrong answer indicates the student has memorised the formula without understanding the role of relative motion in collision kinetics.

## DIAGNOSTIC_QUESTION_3
Calculate the mean free path of nitrogen molecules at STP (0°C, 1 atm). Given: molecular diameter of N₂ = 3.7 Å, molar volume at STP = 22.4 L. Show all steps with units.

## DIAGNOSTIC_ANSWER_3
Step 1: Number density \(n = \frac{N_A}{V_m} = \frac{6.022 \times 10^{23}}{22.4 \times 10^{-3}} = 2.69 \times 10^{25} \text{ m}^{-3}\).
Step 2: Diameter \(d = 3.7 \text{ Å} = 3.7 \times 10^{-10} \text{ m}\).
Step 3: \(\lambda = \frac{1}{\sqrt{2} \pi d^2 n} = \frac{1}{1.414 \times 3.14 \times (3.7 \times 10^{-10})^2 \times 2.69 \times 10^{25}}\).
Step 4: \(d^2 = 13.69 \times 10^{-20} \text{ m}^2\); denominator \(= 1.414 \times 3.14 \times 13.69 \times 10^{-20} \times 2.69 \times 10^{25} \approx 1.63 \times 10^7 \text{ m}^{-1}\).
Step 5: \(\lambda \approx 6.1 \times 10^{-8} \text{ m} = 61 \text{ nm}\).
A wrong answer (e.g., 43 nm) suggests the student forgot the \(\sqrt{2}\) factor or used radius instead of diameter. Unit mismatch (e.g., cm) reveals carelessness in converting Å to m.

## DIAGNOSTIC_QUESTION_4
A gas is kept at constant temperature. If its pressure is doubled, how does the mean free path change? Justify using the formula and the ideal gas law.

## DIAGNOSTIC_ANSWER_4
From ideal gas law, \(P = n k_B T\). At constant \(T\), \(n \propto P\). Since \(\lambda \propto 1/n\), doubling \(P\) doubles \(n\), so \(\lambda\) halves. A wrong answer (e.g., \(\lambda\) unchanged or doubled) shows the student does not connect number density to pressure via the ideal gas law, or thinks molecular diameter changes with pressure.

## DIAGNOSTIC_QUESTION_5
A student derives \(\lambda = \frac{1}{\pi d^2 n}\) by assuming a moving molecule collides with stationary molecules. They claim this is correct because "on average, the other molecules are at rest". Evaluate this claim and identify the error.

## DIAGNOSTIC_ANSWER_5
The claim is incorrect. Even though the average velocity of all molecules is zero, the average relative speed between two molecules is not zero. For a Maxwell-Boltzmann distribution, the average relative speed is \(\sqrt{2}\) times the average speed. Ignoring the motion of target molecules underestimates the collision frequency by \(\sqrt{2}\) and overestimates \(\lambda\) by \(\sqrt{2}\). The error is confusing the average velocity (vector, zero) with the average relative speed (scalar, non-zero).

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to estimate the diameter of an air molecule using only macroscopic measurements of mean free path (e.g., by measuring viscosity or diffusion). Outline the steps and the formula you would use.

## DIAGNOSTIC_ANSWER_6
Measure the viscosity \(\eta\) of air at known \(T\) and \(P\). From kinetic theory, \(\eta = \frac{1}{3} n m \langle v \rangle \lambda\). Measure \(\eta\) experimentally. Calculate \(n = P/(k_B T)\), \(m = M/N_A\), \(\langle v \rangle = \sqrt{8 k_B T/(\pi m)}\). Solve for \(\lambda = 3\eta/(n m \langle v \rangle)\). Then use \(\lambda = 1/(\sqrt{2} \pi d^2 n)\) to find \(d\). A poor answer would omit the connection between viscosity and mean free path, or fail to identify all measurable quantities needed.

## COMMON_MISCONCEPTION
Students often confuse mean free path with the average intermolecular distance (which is \(\sim n^{-1/3}\)). They also think the factor \(\sqrt{2}\) is a "correction factor" for non-ideal behaviour, rather than a consequence of relative motion in an ideal gas. Another error: using molecular radius \(r\) instead of diameter \(d\) in the formula, giving \(\lambda\) four times too large.

## ON_FAILURE
1. Revisit the pressure derivation (c11_phy_cbse_12_002) to recall how number density \(n\) and molecular speed \(\langle v \rangle\) appear. 2. Draw a diagram of a moving molecule sweeping a cylinder; then imagine all molecules moving. 3. Use an analogy: walking through a stationary crowd vs. a moving crowd. 4. Practice the relative speed calculation: if two molecules have speeds \(v_1\) and \(v_2\) at angle \(\theta\), relative speed \(v_r = \sqrt{v_1^2 + v_2^2 - 2v_1v_2\cos\theta}\). Average over angles gives \(\langle v_r \rangle = \sqrt{2} \langle v \rangle\) for equal speeds.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_12_001, c11_phy_cbse_12_002, c11_phy_cbse_12_003, c11_phy_cbse_12_004, c8_math_ch12_1, c6_math_ch08_093

## PREREQUISITE_REASONS
c11_phy_cbse_12_001: Kinetic theory assumptions (rigid spheres, random motion, elastic collisions) are the foundation for the mean free path model.
c11_phy_cbse_12_002: Derivation of pressure introduces number density \(n\) and the concept of molecular collisions with walls, which extends to intermolecular collisions.
c11_phy_cbse_12_003: Kinetic interpretation of temperature gives the average speed \(\langle v \rangle\) needed for collision frequency.
c11_phy_cbse_12_004: RMS speed formula provides the quantitative value of \(\langle v \rangle\) for numerical calculations.
c8_math_ch12_1: Mean free path is a statistical mean; understanding "mean as a balancing point" helps grasp that it is an average over many molecules and many collisions.
c6_math_ch08_093: The derivation uses the volume of a cylinder (\(\pi d^2 \langle v \rangle \Delta t\)) swept by a molecule; geometry of cylinders is essential.

## FORWARD_NODE_IDS
c11_phy_cbse_12_009

## FORWARD_REASONS
c11_phy_cbse_12_009: Maxwell's speed distribution provides the rigorous basis for the average relative speed \(\langle v_r \rangle = \sqrt{2} \langle v \rangle\) used in the exact mean free path formula.

## CROSS_SUBJECT_PREREQS
c8_math_ch12_1, c6_math_ch08_093
## CROSS_SUBJECT_REASONS
c8_math_ch12_1: Mean free path is a statistical mean (average) of distances between collisions, requiring understanding of mean as a balancing point.
c6_math_ch08_093: The derivation uses volume of a cylinder (π d² ⟨v⟩ Δt) swept by a molecule, connecting geometry to physical collision rate.

## CHAIN_DESCRIPTION
c11_phy_cbse_12_001 -> c11_phy_cbse_12_007 -> c11_phy_cbse_12_009

## THIS_FORMULA
\(\lambda = \frac{1}{\sqrt{2} \pi d^2 n}\) where \(\lambda\) = mean free path (m), \(d\) = molecular diameter (m), \(n\) = number density (m⁻³)

## FORMULA_VARIABLES
\(\lambda\) = mean free path (m), \(d\) = molecular diameter (m), \(n\) = number density (m⁻³)

## FORMULA_UNITS
m, m, m⁻³

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c8_math_ch12_1 | Mean free path is a statistical mean (average) of distances between collisions, requiring understanding of mean as a balancing point.
c6_math_ch08_093 | The derivation uses volume of a cylinder (π d² ⟨v⟩ Δt) swept by a molecule, connecting geometry to physical collision rate.

## PREREQ_CONCEPT
Kinetic theory assumptions (molecules as hard spheres, random motion, elastic collisions) and number density concept.

## PREREQ_BEFORE
Student must be able to calculate number density from ideal gas law and understand RMS speed as average molecular speed.

## PREREQ_STUCK
Review the derivation of pressure of an ideal gas (c11_phy_cbse_12_002) to recall number density and molecular speed concepts.

## WORKED_EXAMPLE_1
PROBLEM: Calculate the mean free path of oxygen molecules at 27°C and 1.0 atm pressure. Given: diameter of O₂ molecule = 3.6 Å, R = 8.31 J mol⁻¹ K⁻¹, N_A = 6.022 × 10²³ mol⁻¹.

STEPS:
- Step 1: Identify given quantities: T = 27°C = 300 K, P = 1.0 atm = 1.01 × 10⁵ Pa, d = 3.6 Å = 3.6 × 10⁻¹⁰ m.
- Step 2: Calculate number density n using ideal gas law: P = n k_B T → n = P / (k_B T). k_B = R/N_A = 8.31 / 6.022 × 10²³ = 1.38 × 10⁻²³ J/K. n = (1.01 × 10⁵) / (1.38 × 10⁻²³ × 300) = 2.44 × 10²⁵ m⁻³.
- Step 3: Write exact mean free path formula: λ = 1 / (√2 π d² n).
- Step 4: Substitute values: d² = (3.6 × 10⁻¹⁰)² = 12.96 × 10⁻²⁰ m². Denominator = 1.414 × 3.14 × 12.96 × 10⁻²⁰ × 2.44 × 10²⁵ = 1.414 × 3.14 × 12.96 × 2.44 × 10⁵ ≈ 1.41 × 10⁷ m⁻¹.
- Step 5: λ = 1 / (1.41 × 10⁷) = 7.09 × 10⁻⁸ m = 70.9 nm. Check: at STP, λ for air ~ 68 nm; here T is higher (lower n) so λ should be larger. 71 nm is reasonable.

REASONING: The ideal gas law connects macroscopic P, T to microscopic n. The mean free path formula uses n and molecular size d. The √2 factor accounts for relative motion of all molecules. Unit analysis: n (m⁻³) × d² (m²) = m⁻¹, so 1/(n d²) has units m, correct.

ANSWER: λ = 7.1 × 10⁻⁸ m (or 71 nm)

## WORKED_EXAMPLE_2
PROBLEM: Estimate the mean free path of water vapour at 373 K using the number density derived from the density of water vapour at 100°C and 1 atm (ρ = 0.6 kg/m³). Molecular mass of H₂O = 18 g/mol, diameter = 2.9 Å.

STEPS:
- Step 1: Find number density n from mass density ρ. Mass per molecule m = M/N_A = 0.018 / 6.022 × 10²³ = 2.99 × 10⁻²⁶ kg. n = ρ/m = 0.6 / (2.99 × 10⁻²⁶) = 2.01 × 10²⁵ m⁻³.
- Step 2: Alternatively, use n ∝ 1/T from ideal gas law. At STP (273 K), n₀ = 2.69 × 10²⁵ m⁻³. At 373 K, n = n₀ × (273/373) = 1.97 × 10²⁵ m⁻³. (Close enough).
- Step 3: Use d = 2.9 Å = 2.9 × 10⁻¹⁰ m. d² = 8.41 × 10⁻²⁰ m².
- Step 4: λ = 1 / (√2 π d² n) = 1 / (1.414 × 3.14 × 8.41 × 10⁻²⁰ × 2.0 × 10²⁵) = 1 / (7.46 × 10⁶) = 1.34 × 10⁻⁷ m.
- Step 5: λ ≈ 1.3 × 10⁻⁷ m = 130 nm. Compare with NCERT Example 12.9 (4 × 10⁻⁷ m) — difference due to using different d and n values.

REASONING: Number density can be obtained from mass density (chemistry link) or from ideal gas law scaling. The mean free path increases at higher T because n decreases. The result is an order-of-magnitude estimate since molecular diameter is approximate.

ANSWER: λ ≈ 1.3 × 10⁻⁷ m (130 nm)

## WORKED_EXAMPLE_3
PROBLEM: Two gases A and B are at the same temperature. Gas A is at pressure P, gas B at pressure 2P. Both have the same molecular diameter. Find the ratio of their mean free paths λ_A / λ_B. If the RMS speed of A is 500 m/s, what is the ratio of their collision frequencies?

STEPS:
- Step 1: At same T, from ideal gas law n ∝ P. So n_A / n_B = P_A / P_B = 1/2.
- Step 2: Mean free path λ = 1/(√2 π d² n). Since d is same, λ ∝ 1/n. Thus λ_A / λ_B = n_B / n_A = 2.
- Step 3: Collision frequency f = ⟨v⟩ / λ. For same molecular mass (implied by same RMS speed at same T), ⟨v⟩ is same for both.
- Step 4: f_A / f_B = (⟨v⟩/λ_A) / (⟨v⟩/λ_B) = λ_B / λ_A = 1/2.
- Step 5: So gas at higher pressure has half the mean free path and twice the collision frequency.
- Step 6: Numerical: λ_B = λ_A / 2. If λ_A = 70 nm, λ_B = 35 nm. f_A = 500 / (70 × 10⁻⁹) = 7.1 × 10⁹ Hz; f_B = 1.4 × 10¹⁰ Hz.

REASONING: This problem combines ideal gas law (n ∝ P at constant T) with mean free path formula (λ ∝ 1/n) and collision frequency definition (f = v/λ). It tests understanding of how macroscopic pressure affects microscopic collision rates.

ANSWER: λ_A / λ_B = 2; f_A / f_B = 1/2

## COMPETENCY_QUESTION_1
QUESTION: A student argues: "At constant temperature, if we compress a gas to half its volume, the molecules get closer so the mean free path should halve. But the RMS speed doesn't change, so the collision frequency should double." Is this reasoning fully correct? Explain using the exact formula and identify any missing factor.

COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Recognise that at constant T, compressing to half volume doubles pressure and doubles number density n.
- Step 2: Mean free path λ = 1/(√2 π d² n). Since n doubles, λ halves. This part is correct.
- Step 3: Collision frequency f = ⟨v_r⟩ / λ. The student used ⟨v⟩ (RMS speed) instead of average relative speed ⟨v_r⟩ = √2 ⟨v⟩.
- Step 4: However, both ⟨v_r⟩ and λ depend on n. Since ⟨v_r⟩ is independent of n (depends only on T and m), f ∝ 1/λ ∝ n. So f does double.
- Step 5: The student's final conclusion (f doubles) is correct, but the reasoning used ⟨v⟩ instead of ⟨v_r⟩. The missing factor √2 cancels out in the ratio because it's the same for both states.
- Step 6: The reasoning would be flawed if comparing two different gases at same T but different molecular masses.

ANSWER: The conclusion is correct (λ halves, f doubles) but the reasoning is incomplete because collision frequency uses average relative speed ⟨v_r⟩ = √2 ⟨v⟩, not ⟨v⟩. The error does not affect the ratio for the same gas, but would affect absolute value of f and comparisons between different gases.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a high-vacuum chamber, the pressure is reduced to 10⁻⁶ Pa at 300 K. The chamber is a cube of side 1 m. Estimate the mean free path of air molecules (d ≈ 3 Å). Will a molecule typically collide with another molecule or with the wall first? Justify.

COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Calculate n = P/(k_B T) = 10⁻⁶ / (1.38 × 10⁻²³ × 300) = 2.42 × 10¹⁴ m⁻³.
- Step 2: λ = 1/(√2 π d² n) = 1/(1.414 × 3.14 × (3 × 10⁻¹⁰)² × 2.42 × 10¹⁴) = 1/(1.414 × 3.14 × 9 × 10⁻²⁰ × 2.42 × 10¹⁴) = 1/(9.7 × 10⁻⁵) ≈ 1.03 × 10⁴ m = 10.3 km.
- Step 3: Compare with chamber size: side = 1 m. Mean free path (10 km) ≫ chamber dimension (1 m).
- Step 4: A molecule will travel across the chamber many times before colliding with another molecule. It will hit the wall first.
- Step 5: This is the molecular flow regime (Knudsen number ≫ 1), where gas-surface interactions dominate over intermolecular collisions.

ANSWER: λ ≈ 10 km. Since λ (10⁴ m) ≫ chamber size (1 m), a molecule will collide with the wall first. The gas is in the molecular flow regime.

DIFFICULTY: hard