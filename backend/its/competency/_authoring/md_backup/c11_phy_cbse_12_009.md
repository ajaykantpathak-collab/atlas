## DEFINITION
Maxwell's Speed Distribution Law describes the statistical distribution of molecular speeds in an ideal gas at thermal equilibrium, giving the fraction of molecules having speeds between v and v+dv as f(v)dv = 4π (m/2πk_BT)^{3/2} v^2 e^{-mv^2/2k_BT} dv, where m is the molecular mass (kg), k_B is the Boltzmann constant (1.38×10^{-23} J/K), and T is the absolute temperature (K). The distribution is asymmetric, peaking at the most probable speed v_p = √(2k_BT/m), with mean speed v_avg = √(8k_BT/πm) and root-mean-square speed v_rms = √(3k_BT/m), satisfying v_p < v_avg < v_rms.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
Student can sketch the Maxwell-Boltzmann distribution curve, label the three characteristic speeds in correct order, explain how the curve shifts with temperature and molecular mass, and calculate the fraction of molecules in a given speed range using the distribution function or its approximations.

## SCOPE_BOUNDARY
Covers the Maxwell-Boltzmann speed distribution for classical ideal gases, the three characteristic speeds (v_p, v_avg, v_rms), their ratios, and the qualitative effect of temperature and molar mass on the curve shape. Does NOT cover the rigorous derivation from statistical mechanics, the velocity distribution vector components, or quantum statistics (Fermi-Dirac, Bose-Einstein).

## WALKTHROUGH
Imagine releasing a drop of perfume in one corner of a classroom – the scent doesn't reach everyone at once because air molecules move at vastly different speeds, not a single uniform speed. In Class 9 you learned that gas pressure arises from molecular collisions, but we treated all molecules as having the same rms speed. Now we ask: what is the actual spread of speeds? Start by plotting a histogram of molecular speeds from a simulation – you'll see a skewed bell curve. The peak gives the most probable speed v_p, the area under the curve is total molecules, and the average speed v_avg is the first moment. Connect this to the kinetic interpretation of temperature (c11_phy_cbse_12_003): since average kinetic energy is fixed by T, lighter molecules must have a broader, right-shifted distribution. The key formula f(v) = 4π (m/2πk_BT)^{3/2} v^2 e^{-mv^2/2k_BT} emerges from maximizing entropy subject to energy constraints.

## DIAGNOSTIC_QUESTION_1
State the Maxwell-Boltzmann speed distribution function f(v) for an ideal gas, defining every symbol with its SI unit. What is the physical meaning of f(v)dv?

## DIAGNOSTIC_ANSWER_1
f(v) = 4π (m/2πk_BT)^{3/2} v^2 e^{-mv^2/2k_BT}, where m = molecular mass (kg), k_B = 1.38×10^{-23} J/K, T = temperature (K), v = speed (m/s). f(v)dv is the fraction of molecules with speeds between v and v+dv (dimensionless). A wrong answer (e.g., omitting the v^2 factor or the normalization constant) reveals the student memorizes the exponential but forgets the phase-space volume factor v^2 that makes low speeds less probable than the exponential alone suggests.

## DIAGNOSTIC_QUESTION_2
Explain why the most probable speed v_p is less than the average speed v_avg, which in turn is less than the rms speed v_rms, using the shape of the Maxwell-Boltzmann curve.

## DIAGNOSTIC_ANSWER_2
The curve is right-skewed (positive skew) because the v^2 factor pushes the peak rightward from zero, but the exponential tail extends far to high speeds. The mean v_avg is pulled toward the tail more than the peak v_p, and v_rms = √⟨v^2⟩ weights high speeds even more heavily (squaring before averaging), so v_p < v_avg < v_rms. A student who claims v_p = v_avg = v_rms or orders them incorrectly confuses the distribution with a symmetric Gaussian and ignores the v^2 weighting.

## DIAGNOSTIC_QUESTION_3
Calculate the most probable speed, average speed, and rms speed of nitrogen molecules (M = 28.0 g/mol) at 300 K. Use R = 8.31 J/mol·K and N_A = 6.022×10^{23} mol^{-1}.

## DIAGNOSTIC_ANSWER_3
Step 1: m = M/N_A = 0.0280 kg/mol / 6.022×10^{23} mol^{-1} = 4.65×10^{-26} kg.  
Step 2: v_p = √(2k_BT/m) = √(2×1.38×10^{-23}×300 / 4.65×10^{-26}) = √(1.78×10^5) = 422 m/s.  
Step 3: v_avg = √(8k_BT/πm) = √(8/π) × v_p/√2 = √(4/π) × v_p = 1.128 × 422 = 476 m/s.  
Step 4: v_rms = √(3k_BT/m) = √(3/2) × v_p = 1.225 × 422 = 517 m/s.  
Check: v_p : v_avg : v_rms = 1 : 1.128 : 1.225. A wrong answer often uses M instead of m, forgets to convert g to kg, or uses R instead of k_B without adjusting for N_A.

## DIAGNOSTIC_QUESTION_4
Two gases, helium (M = 4 g/mol) and oxygen (M = 32 g/mol), are at the same temperature. Sketch their Maxwell-Boltzmann curves on the same axes. Which gas has a higher fraction of molecules with speeds > 2000 m/s? Justify quantitatively.

## DIAGNOSTIC_ANSWER_4
Helium's curve is broader and shifted right (lower mass → higher speeds at same T). The fraction with v > 2000 m/s is ∫_{2000}^∞ f(v)dv. Since v_rms(He) ≈ 2.83 × v_rms(O_2) at same T, helium's distribution extends much further. Quantitatively, the exponential factor e^{-mv^2/2k_BT} decays slower for smaller m, so helium has a far larger high-speed tail. A student who says oxygen has more high-speed molecules because it's "heavier and has more momentum" confuses momentum with speed distribution and ignores the mass in the exponent.

## DIAGNOSTIC_QUESTION_5
A student claims: "At a given temperature, all gas molecules have the same kinetic energy, so the Maxwell distribution should be a vertical line at v = v_rms." Evaluate this statement and identify the misconception.

## DIAGNOSTIC_ANSWER_5
The statement is false. Temperature fixes the *average* translational kinetic energy (3/2 k_BT), not the energy of each molecule. Collisions constantly redistribute energy, creating a spread of speeds. The Maxwell distribution is the equilibrium result of this stochastic process. The misconception is equating a thermodynamic average with a microscopic certainty – a category error between ensemble average and individual value.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment using a velocity selector (rotating slotted disks) to experimentally verify the Maxwell-Boltzmann distribution for argon gas at 400 K. Specify the key measurements and how you would extract f(v).

## DIAGNOSTIC_ANSWER_6
Use two coaxial disks with narrow radial slots offset by angle θ, separated by distance L. Only molecules with speed v = ωL/θ pass through both slots. Vary ω and measure the transmitted flux I(ω) with a detector. The flux is proportional to v^3 f(v) (accounting for flux ∝ v and the v^2 in f(v)). Plot I(ω) vs v; normalize area to 1. Compare with theoretical f(v). A poor answer omits the v^3 factor or assumes the selector transmits all speeds equally.

## COMMON_MISCONCEPTION
Students often think the peak of the Maxwell-Boltzmann curve (v_p) represents the average speed, or that the distribution is symmetric like a Gaussian. They also confuse the molecular mass m (kg per molecule) with molar mass M (kg/mol), leading to errors of factor √N_A ≈ 10^{11} in speed calculations. Another error: assuming the fraction of molecules at exactly v_p is large, when in fact f(v)dv → 0 for any exact speed – only speed intervals have non-zero probability.

## ON_FAILURE
1. Revisit the distinction between m and M: m = M/N_A. Practice converting molar mass (g/mol) to molecular mass (kg) using N_A.  
2. Draw the curve for two masses at same T: label v_p, v_avg, v_rms. Verify v_p < v_avg < v_rms using the ratios 1 : √(8/π) : √(3/2) ≈ 1 : 1.128 : 1.225.  
3. Run a Python/PhET simulation of gas molecules; histogram their speeds and fit the Maxwell curve.  
4. Do dimensional analysis of f(v): [f(v)] = [v]^{-1} so f(v)dv is dimensionless. Check each term in the formula for consistency.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_12_003, c11_phy_cbse_12_004, c11_phy_cbse_12_001, c10_math_cbse_14_003, c9_math_ch7_4, c11_phy_cbse_12_007, c11_phy_cbse_12_008

## PREREQUISITE_REASONS
c11_phy_cbse_12_003: Kinetic interpretation of temperature gives ⟨KE⟩ = 3/2 k_BT, the energy constraint that shapes the distribution.  
c11_phy_cbse_12_004: RMS speed formula v_rms = √(3k_BT/m) is one of the three characteristic speeds derived from the distribution.  
c11_phy_cbse_12_001: Assumptions of kinetic theory (large N, elastic collisions, no intermolecular forces) are the physical basis for the equilibrium distribution.  
c10_math_cbse_14_003: Probability P(E) = favourable/total underpins the interpretation of f(v)dv as a probability fraction.  
c9_math_ch7_4: Theoretical probability and sample space concepts are needed to understand continuous probability densities.
c11_phy_cbse_12_007: Maxwell's speed distribution provides the rigorous basis for the average relative speed \(\langle v_r \rangle = \sqrt{2} \langle v \rangle\) used in the exact mean free path formula.  
c11_phy_cbse_12_008: Maxwell speed distribution uses k_B and T from the ideal gas framework.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the terminal node in Chapter 12 Kinetic Theory; no subsequent nodes depend on it within this chapter.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_14_003, c9_math_ch7_4, c10_math_cbse_13_001
## CROSS_SUBJECT_REASONS
c10_math_cbse_14_003: Classical probability definition extends to continuous densities f(v) where probability = ∫ f(v)dv.  
c9_math_ch7_4: Theoretical probability framework (sample space, events) is the mathematical language for molecular speed distributions.  
c10_math_cbse_13_001: Mean of grouped data (direct method) is analogous to computing ⟨v⟩ = ∫ v f(v)dv from the continuous distribution.

## CHAIN_DESCRIPTION
c11_phy_cbse_12_003 -> c11_phy_cbse_12_009 -> none

## THIS_FORMULA
f(v) = 4π (m/2πk_BT)^{3/2} v^2 e^{-mv^2/2k_BT} (s/m); v_p = √(2k_BT/m) (m/s); v_avg = √(8k_BT/πm) (m/s); v_rms = √(3k_BT/m) (m/s)

## FORMULA_VARIABLES
f(v) = probability density function (s/m), m = mass of one molecule (kg), k_B = Boltzmann constant = 1.38×10^{-23} J/K, T = absolute temperature (K), v = molecular speed (m/s), v_p = most probable speed (m/s), v_avg = mean speed (m/s), v_rms = root-mean-square speed (m/s), N_A = Avogadro constant = 6.022×10^{23} mol^{-1}, M = molar mass (kg/mol)

## FORMULA_UNITS
s/m, kg, J/K, K, m/s, m/s, m/s, m/s, mol^{-1}, kg/mol

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_14_003 | Probability density f(v) replaces discrete probability; ∫f(v)dv over speed interval gives fraction of molecules.  
c9_math_ch7_4 | Theoretical probability provides the framework: sample space = all speeds, event = speed in [v, v+dv].  
c10_math_cbse_13_001 | Computing mean speed v_avg = ∫ v f(v)dv mirrors the direct method for mean of grouped data: Σ x_i f_i / Σ f_i.

## PREREQ_CONCEPT
Kinetic interpretation of temperature (average KE = 3/2 k_BT) and RMS speed formula.

## PREREQ_BEFORE
Student must be able to compute v_rms from T and M, and explain why temperature fixes average kinetic energy but not individual speeds.

## PREREQ_STUCK
Review c11_phy_cbse_12_003 (kinetic interpretation of temperature) and c11_phy_cbse_12_004 (RMS speed calculation) – focus on the distinction between molecular mass m and molar mass M.

## WORKED_EXAMPLE_1
PROBLEM: A cylinder contains 2.0 moles of helium gas at 400 K. Calculate (a) the most probable speed, (b) the average speed, and (c) the rms speed of helium atoms. Molar mass of He = 4.00 g/mol. Use R = 8.31 J/mol·K.

STEPS:
- Step 1: Identify given: n = 2.0 mol (not needed for speeds), T = 400 K, M = 4.00 g/mol = 4.00×10^{-3} kg/mol. Find v_p, v_avg, v_rms.
- Step 2: Use formulas with R and M: v_p = √(2RT/M), v_avg = √(8RT/πM), v_rms = √(3RT/M). Check units: R in J/mol·K = kg·m²/s²·mol·K, M in kg/mol → RT/M has units m²/s², sqrt gives m/s. ✓
- Step 3: Compute RT/M = (8.31 × 400) / (4.00×10^{-3}) = 3324 / 0.004 = 8.31×10^5 m²/s².
- Step 4: v_p = √(2 × 8.31×10^5) = √(1.662×10^6) = 1289 m/s. v_avg = √(8/π × 8.31×10^5) = √(2.122×10^6) = 1457 m/s. v_rms = √(3 × 8.31×10^5) = √(2.493×10^6) = 1579 m/s.
- Step 5: Verify order: 1289 < 1457 < 1579. Ratios: 1457/1289 ≈ 1.13, 1579/1289 ≈ 1.22. Matches theoretical ratios. Physically reasonable for light gas at high T.

REASONING: The three characteristic speeds differ by constant factors depending only on the definition (peak, mean, root-mean-square). Using molar mass M and gas constant R avoids explicit N_A and k_B. The factor √(RT/M) captures the temperature and mass dependence.

ANSWER: (a) v_p = 1290 m/s, (b) v_avg = 1460 m/s, (c) v_rms = 1580 m/s (all to 3 significant figures).

## WORKED_EXAMPLE_2
PROBLEM: The Maxwell-Boltzmann distribution for oxygen (M = 32 g/mol) at 300 K has a peak value f(v_p) ≈ 3.5×10^{-3} s/m. Estimate the fraction of molecules with speeds between 400 m/s and 410 m/s. Assume f(v) is roughly constant over this narrow interval.

STEPS:
- Step 1: Given: f(v_p) ≈ 3.5×10^{-3} s/m at v_p for O₂ at 300 K. Interval Δv = 410 - 400 = 10 m/s. The interval is near but not exactly at v_p (v_p for O₂ at 300 K ≈ 395 m/s). We'll approximate f(v) ≈ f(v_p) for this narrow range.
- Step 2: Fraction ≈ f(v) Δv. Use f(v_p) as approximation.
- Step 3: Fraction ≈ (3.5×10^{-3} s/m) × (10 m/s) = 3.5×10^{-2} = 0.035.
- Step 4: Check units: (s/m)×(m/s) = dimensionless. ✓
- Step 5: Reasonableness: 3.5% of molecules in a 10 m/s window near the peak is plausible. Total area under curve = 1.

REASONING: For a narrow speed interval Δv, the fraction of molecules is approximately f(v)Δv. This is the definition of a probability density. The peak value f(v_p) is the maximum of the distribution; using it gives a slight overestimate if the interval is not exactly centered at v_p, but the error is small for Δv << v_p.

ANSWER: Fraction ≈ 0.035 (3.5% of molecules).

## WORKED_EXAMPLE_3
PROBLEM: In a gas mixture at 500 K, the most probable speed of gas A is twice that of gas B. If the molar mass of gas B is 64 g/mol, find the molar mass of gas A. Also find the ratio of their average speeds and rms speeds.

STEPS:
- Step 1: Given: T = 500 K (same for both), v_pA = 2 v_pB, M_B = 64 g/mol = 0.064 kg/mol. Find M_A, v_avgA/v_avgB, v_rmsA/v_rmsB.
- Step 2: v_p = √(2RT/M) → v_p ∝ 1/√M. So v_pA / v_pB = √(M_B / M_A) = 2.
- Step 3: Square both sides: M_B / M_A = 4 → M_A = M_B / 4 = 64 / 4 = 16 g/mol.
- Step 4: All characteristic speeds scale as 1/√M: v_avg ∝ 1/√M, v_rms ∝ 1/√M. So ratios are the same as v_p ratio.
- Step 5: v_avgA / v_avgB = √(M_B / M_A) = 2. v_rmsA / v_rmsB = √(M_B / M_A) = 2.
- Step 6: Verify: M_A = 16 g/mol (e.g., CH₄ or O atom). At same T, lighter gas has higher speeds by factor √(M_B/M_A) = 2.

REASONING: The three characteristic speeds all share the same dependence on T and M: √(T/M). Therefore their ratios for two gases at the same temperature are identical, regardless of which speed measure is used. The distribution shape is also the same when speeds are scaled by v_p.

ANSWER: M_A = 16 g/mol; v_avgA/v_avgB = 2; v_rmsA/v_rmsB = 2.

## COMPETENCY_QUESTION_1
QUESTION: A student measures the speed of 1000 nitrogen molecules at 300 K and plots a histogram. The peak of the histogram occurs at 420 m/s. The student claims: "The average speed of the molecules is 420 m/s." Is the student correct? Explain using the Maxwell-Boltzmann distribution. If not, estimate the correct average speed.

COMPETENCY: Interpreting physical situations using formulas and conceptual understanding of distribution asymmetry.

STEPS:
- Step 1: Recognize that the histogram peak corresponds to the most probable speed v_p, not the average speed v_avg.
- Step 2: Recall the fixed ratio v_avg / v_p = √(8/π) / √2 = √(4/π) ≈ 1.128.
- Step 3: Calculate v_avg = 1.128 × v_p = 1.128 × 420 m/s ≈ 474 m/s.
- Step 4: Explain that the distribution is right-skewed, so the mean is greater than the mode.

ANSWER: The student is incorrect. The peak gives v_p = 420 m/s. For a Maxwell-Boltzmann distribution, v_avg = √(4/π) v_p ≈ 1.128 × 420 = 474 m/s. The average speed is higher than the most probable speed because the distribution has a long tail toward high speeds.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: Two identical containers hold helium (M = 4 g/mol) and argon (M = 40 g/mol) at the same temperature T. A tiny hole is opened in each container, allowing gas to effuse into vacuum. The effusion speed distribution is proportional to v × f(v) (flux weighting). Which gas will have a higher average effusion speed? Derive the ratio of average effusion speeds and compare it to the ratio of their bulk average speeds v_avg.

COMPETENCY: Applying kinetic theory to a non-equilibrium process (effusion) and performing weighted averaging.

STEPS:
- Step 1: Bulk average speed v_avg = ∫ v f(v) dv / ∫ f(v) dv = √(8k_BT/πm).
- Step 2: Effusion flux through a small hole is proportional to v f(v) (molecules with speed v hit the hole at rate ∝ v). The normalized effusion speed distribution is f_eff(v) ∝ v f(v) = v × v^2 e^{-mv^2/2k_BT} = v^3 e^{-mv^2/2k_BT}.
- Step 3: Average effusion speed ⟨v⟩_eff = ∫ v f_eff(v) dv / ∫ f_eff(v) dv = ∫ v^4 e^{-mv^2/2k_BT} dv / ∫ v^3 e^{-mv^2/2k_BT} dv.
- Step 4: Use standard Gaussian integrals: ∫_0^∞ v^4 e^{-av^2} dv = (3√π)/(8 a^{5/2}), ∫_0^∞ v^3 e^{-av^2} dv = 1/(2a^2), with a = m/2k_BT.
- Step 5: ⟨v⟩_eff = (3√π/8 a^{5/2}) / (1/2a^2) = (3√π/4) a^{-1/2} = (3√π/4) √(2k_BT/m) = (3π/8) √(8k_BT/πm) = (3π/8) v_avg ≈ 1.178 v_avg.
- Step 6: Ratio for two gases: ⟨v⟩_eff,He / ⟨v⟩_eff,Ar = √(M_Ar / M_He) = √(40/4) = √10 ≈ 3.16. Same as bulk v_avg ratio.

ANSWER: Helium has the higher average effusion speed. The ratio of average effusion speeds is √(M_Ar/M_He) = √10 ≈ 3.16, identical to the ratio of bulk average speeds. The effusion process weights faster molecules more heavily, increasing the average speed by a constant factor (3π/8 ≈ 1.178) for both gases, so the ratio remains unchanged.

DIFFICULTY: hard