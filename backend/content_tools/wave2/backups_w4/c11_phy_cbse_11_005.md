## ELI5
Pump fast and the barrel warms; vent the tyre and the escaping air chills - adiabatic work, done without time for heat to change hands. With Q = 0 the First Law turns stark: ΔU = -W, so the gas pays for expansion out of its own internal energy, cooling, and banks compression work as heat. The formula carries the adiabatic index γ.

## DEFINITION
Work done in an adiabatic process is the energy transferred by a gas when it expands or compresses without any heat exchange with its surroundings (Q = 0). For a quasi-static adiabatic process of an ideal gas, the work done by the gas is given by \( W = \frac{P_1V_1 - P_2V_2}{\gamma - 1} = \frac{\mu R (T_1 - T_2)}{\gamma - 1} \), where \( \gamma = C_p/C_v \) is the adiabatic index. The SI unit of work is the joule (J). A positive value indicates work done by the gas (expansion), while a negative value indicates work done on the gas (compression).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate the work done in a quasi-static adiabatic process using initial and final state variables (P, V, T) and the adiabatic index γ, and can correctly determine the sign of work based on whether the gas expands or compresses. The student can also apply the First Law (ΔU = -W) to find the change in internal energy or temperature.

## SCOPE_BOUNDARY
This node covers quasi-static adiabatic processes for an ideal gas where PV^γ = constant holds. It does not cover irreversible adiabatic processes (like free expansion), non-ideal gases, or processes where heat exchange occurs (isothermal, isobaric, isochoric). The derivation assumes a frictionless piston and no dissipative effects.

## WALKTHROUGH
Observe a bicycle pump: when you rapidly compress air by pushing the piston down, the pump barrel becomes noticeably warm. This heating occurs because work is done *on* the gas adiabatically (no time for heat to escape), increasing its internal energy and temperature. Conversely, when you release the valve on a pressurized tyre, the escaping air feels cold because the gas does work *on* the surroundings adiabatically, decreasing its internal energy. Connect this to the First Law (c11_phy_cbse_11_003): since Q = 0, ΔU = -W. For an ideal gas, ΔU = nC_vΔT, so the work done is directly linked to the temperature change. The key step is recognizing that for adiabatic processes, pressure and volume are related by PV^γ = constant, which allows us to integrate PdV to find the work done.

Takeaway: mastery means computing the work from the endpoint variables, signing it by the volume change, and reading temperature change straight off ΔU. Exam moves: find-the-adiabatic-work questions and explain-the-warm-pump items. Check yourself: rapid means adiabatic only because exchange needs time - the speed is the insulation. Students miss it because adiabatic sounds like isothermal, when the definition denies heat entirely: no exchange means temperature must move, and the pump's warmth is internal energy wearing a thermometer.

## DIAGNOSTIC_QUESTION_1
State the condition for a process to be adiabatic and write the expression for work done by an ideal gas in a quasi-static adiabatic process in terms of initial and final pressures and volumes. Define γ.

## DIAGNOSTIC_ANSWER_1
An adiabatic process occurs when no heat is exchanged between the system and surroundings (Q = 0). The work done by the gas is \( W = \frac{P_1V_1 - P_2V_2}{\gamma - 1} \), where \( \gamma = \frac{C_p}{C_v} \) is the ratio of molar specific heat capacities at constant pressure and constant volume. A wrong answer (e.g., stating Q = constant or using the isothermal formula W = nRT ln(V2/V1)) reveals confusion between adiabatic and isothermal processes, or a misunderstanding that "adiabatic" means constant temperature.

## DIAGNOSTIC_QUESTION_2
A gas is compressed adiabatically from volume V1 to V2 (V2 < V1). Will the work done *by* the gas be positive, negative, or zero? Will the final temperature T2 be greater than, less than, or equal to T1? Explain using the First Law.

## DIAGNOSTIC_ANSWER_2
Work done *by* the gas is negative (work is done *on* the gas). The final temperature T2 > T1. From the First Law: ΔU = Q - W. For adiabatic, Q = 0, so ΔU = -W. Since work is done on the gas, W (by gas) < 0, so ΔU > 0. For an ideal gas, internal energy increases with temperature, so T2 > T1. A wrong answer (e.g., saying temperature stays constant) indicates the student is applying isothermal logic to an adiabatic process, or confusing the sign convention for W.

## DIAGNOSTIC_QUESTION_3
One mole of a diatomic ideal gas (γ = 7/5) at 300 K and 1.0 × 10^5 Pa is compressed adiabatically until its pressure reaches 5.0 × 10^5 Pa. Calculate the work done *on* the gas. (R = 8.31 J mol⁻¹ K⁻¹)

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify given: n = 1 mol, T1 = 300 K, P1 = 1.0 × 10^5 Pa, P2 = 5.0 × 10^5 Pa, γ = 1.4, R = 8.31 J/mol·K. Find W_on (work done on gas).
**Step 2:** Use adiabatic relation \( P_1^{1-\gamma} T_1^\gamma = P_2^{1-\gamma} T_2^\gamma \) → \( T_2 = T_1 \left(\frac{P_2}{P_1}\right)^{\frac{\gamma-1}{\gamma}} \).
**Step 3:** Compute exponent: (γ-1)/γ = 0.4/1.4 = 2/7 ≈ 0.2857. Pressure ratio = 5.
\( T_2 = 300 \times 5^{2/7} \approx 300 \times 1.584 = 475.2 \text{ K} \).
**Step 4:** Work done *by* gas: \( W_{by} = \frac{nR(T_1 - T_2)}{\gamma - 1} = \frac{1 \times 8.31 \times (300 - 475.2)}{0.4} = \frac{8.31 \times (-175.2)}{0.4} = -3642 \text{ J} \).
**Step 5:** Work done *on* gas = -W_by = +3642 J ≈ 3.64 kJ.
**Units check:** R in J/mol·K, ΔT in K, γ dimensionless → J. Answer is physically reasonable (compression requires positive work input). A wrong answer often results from using the isothermal formula, sign errors (reporting -3642 J as work done *on* gas), or miscalculating the exponent.

## DIAGNOSTIC_QUESTION_4
On a P-V diagram, an adiabatic curve and an isothermal curve start at the same initial point (P1, V1). Both expand to the same final volume V2 > V1. Which curve has a steeper slope? Which process does more work? Justify using the equations PV = constant (isothermal) and PV^γ = constant (adiabatic).

## DIAGNOSTIC_ANSWER_4
The adiabatic curve is steeper. For isothermal: slope = dP/dV = -P/V. For adiabatic: slope = dP/dV = -γP/V. Since γ > 1, the adiabatic slope magnitude is γ times larger. The isothermal process does more work. Work is the area under the P-V curve. Since the adiabatic curve drops faster (pressure falls more rapidly due to cooling), the area under the isothermal curve (which stays higher because heat flows in to maintain temperature) is larger. A wrong answer (e.g., adiabatic does more work) suggests the student thinks "steeper curve = more area" without realizing the adiabatic curve lies *below* the isothermal curve during expansion.

## DIAGNOSTIC_QUESTION_5
A student claims: "In an adiabatic compression, the work done on the gas is stored entirely as potential energy of the gas molecules." Evaluate this statement. Is it correct? If not, correct it.

## DIAGNOSTIC_ANSWER_5
The statement is **incorrect**. In an ideal gas, intermolecular forces are negligible, so there is no potential energy component in the internal energy. The work done on the gas increases the *kinetic energy* of the molecules (translational, rotational, vibrational), which manifests as a rise in temperature. The correct statement: "In an adiabatic compression of an ideal gas, the work done on the gas increases its internal energy, which is purely kinetic, causing the temperature to rise." A wrong evaluation reveals the misconception that internal energy of an ideal gas includes potential energy (true for real gases/liquids, but not for the ideal gas model used in Class 11).

## DIAGNOSTIC_QUESTION_6
Design a simple classroom demonstration to show that adiabatic compression increases temperature. Use only household/school lab items (e.g., a syringe, cotton wool, matchstick). Describe the procedure, the observation, and the physics principle.

## DIAGNOSTIC_ANSWER_6
**Procedure:** Place a small piece of cotton wool at the bottom of a transparent plastic syringe (10-20 mL). Remove the needle, seal the nozzle tightly with a rubber cap or finger. Pull the plunger out fully, then push it in **rapidly** and forcefully.
**Observation:** The cotton wool ignites (glows/smokes) due to the sudden temperature rise.
**Principle:** Rapid compression is nearly adiabatic (Q ≈ 0). Work done on the gas increases its internal energy (ΔU = -W > 0), raising temperature above the ignition point of cotton (~200°C).
**Criteria for good answer:** Must emphasize *rapid* compression (to approximate Q=0), sealing (closed system), and link ignition to temperature rise from work done. A poor answer suggests slow compression (isothermal) or attributes ignition to friction.

## COMMON_MISCONCEPTION
Students often believe "adiabatic" means "constant temperature" because the word sounds similar to "isothermal" or they confuse "no heat exchange" with "no temperature change". They then incorrectly apply the isothermal work formula \( W = nRT \ln(V_2/V_1) \) to adiabatic problems. Another specific error: using \( W = P\Delta V \) (constant pressure formula) for adiabatic processes, ignoring that pressure changes significantly during adiabatic compression/expansion. For example, in a problem where a gas is compressed adiabatically to half its volume, a student might calculate work using the initial pressure only, yielding an answer that is far too small (by a factor of ~γ).

## ON_FAILURE
If a student confuses adiabatic with isothermal:
1.  **Contrast the definitions:** Write side-by-side: "Isothermal: T constant, Q ≠ 0, heat flows to maintain T. Adiabatic: Q = 0, T changes, no heat flows."
2.  **Physical demonstration:** Use the syringe-cotton experiment (Diagnostic Q6). Ask: "If temperature were constant, why does the cotton burn?" The burning proves T rises.
3.  **Mathematical check:** Show that for adiabatic compression, PV^γ = constant. If V halves, P increases by 2^γ (≈ 2.64 for diatomic), not just 2 (as in isothermal). Higher pressure means more work done for the same volume change.
4.  **First Law drill:** Practice ΔU = Q - W with Q=0. Emphasize: ΔU = -W. If W is negative (compression), ΔU is positive → T increases. Repeat until the sign convention and temperature change link become automatic.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_11_001, c11_phy_cbse_11_002, c11_phy_cbse_11_003, c11_phy_cbse_11_004, c10_math_cbse_04_005

## PREREQUISITE_REASONS
c11_phy_cbse_11_001: Defines system/surroundings and adiabatic walls, which is the physical basis for Q=0.
c11_phy_cbse_11_002: Establishes temperature as a state variable, needed to understand temperature change in adiabatic processes.
c11_phy_cbse_11_003: Provides the First Law (ΔQ = ΔU + ΔW) and sign conventions; essential for deriving ΔU = -W when ΔQ=0.
c11_phy_cbse_11_004: Covers isothermal work (W = nRT ln(V2/V1)); this node explicitly contrasts adiabatic work with isothermal work, so the isothermal formula must be known as a reference.
c10_math_cbse_04_005: c10_math_cbse_04_005 | The quadratic formula and completing the square are algebraic techniques that build the algebraic fluency needed to manipulate the adiabatic equations and solve for unknowns (e.g., finding T₂ given P₁, P₂, T₁).  

## FORWARD_NODE_IDS
c11_phy_cbse_11_006, c11_phy_cbse_11_007, c11_phy_cbse_11_008, c11_phy_cbse_11_009, c11_phy_cbse_11_010, c11_phy_cbse_11_011, c11_phy_cbse_11_012
## FORWARD_REASONS
c11_phy_cbse_11_006: Specific heats Cp and Cv are needed to define γ = Cp/Cv, which appears in the adiabatic work formula.
c11_phy_cbse_11_007: Mayer's formula (Cp - Cv = R) allows calculation of γ for ideal gases, linking microscopic degrees of freedom to macroscopic adiabatic behavior.
c11_phy_cbse_11_008: Directly compares isothermal and adiabatic processes (work done, P-V slopes, temperature changes) using the formulas derived here.
c11_phy_cbse_11_009: Second Law and Kelvin-Planck statement require understanding that adiabatic processes are essential steps in heat engine cycles (Carnot).
c11_phy_cbse_11_010: Reversible adiabatic processes are isentropic; this node's quasi-static adiabatic process is the model for reversible adiabatic steps.
c11_phy_cbse_11_011: Carnot cycle uses two adiabatic processes (steps 2→3 and 4→1); their work contributions (Eq 11.19, 11.21) come directly from this node's formula.
c11_phy_cbse_11_012: Refrigerator cycle (reverse Carnot) also uses adiabatic compression/expansion; work input calculation relies on this node.

## CROSS_SUBJECT_PREREQS
c8_math_ch2_3, c8_math_ch2_7, c8_math_ch2_9, c9_physics_ch4_1
## CROSS_SUBJECT_REASONS
c8_math_ch2_3: Exponential notation (base and exponent) is essential for understanding PV^γ = constant and manipulating the adiabatic condition.
c8_math_ch2_7: Multiplying powers with same base (a^m × a^n = a^{m+n}) is used when combining P and V terms in the adiabatic relation derivation.
c8_math_ch2_9: Power of a power ((a^m)^n = a^{mn}) is used when raising the adiabatic relation to different powers (e.g., TV^{γ-1} = constant).
c9_physics_ch4_1: Work definition (W = Fs) and the concept of work done by a gas (W = ∫PdV) form the physical basis for calculating work in any thermodynamic process.

## CHAIN_DESCRIPTION
c11_phy_cbse_11_003 -> c11_phy_cbse_11_004 -> c11_phy_cbse_11_005 -> c11_phy_cbse_11_006

## THIS_FORMULA
W = (P₁V₁ - P₂V₂) / (γ - 1) = μR(T₁ - T₂) / (γ - 1)  [Joules (J)] ; where adiabatic condition: P₁V₁^γ = P₂V₂^γ, γ = Cp/Cv

## FORMULA_VARIABLES
W = work done by the gas (J); P₁, P₂ = initial and final pressure (Pa); V₁, V₂ = initial and final volume (m³); μ = amount of gas (mol); R = universal gas constant = 8.31 J mol⁻¹ K⁻¹; T₁, T₂ = initial and final absolute temperature (K); γ = Cp/Cv (dimensionless ratio of specific heats).

## FORMULA_UNITS
J, Pa, m³, mol, J mol⁻¹ K⁻¹, K, dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c8_math_ch2_3 | The adiabatic condition PV^γ = constant uses exponential notation where γ is the exponent; understanding how to manipulate a^b is crucial for deriving TV^{γ-1} = constant and P^{1-γ}T^γ = constant.
c8_math_ch2_7 | When deriving the work integral ∫PdV with P = KV^{-γ}, the integration of V^{-γ} uses the power rule for integration (reverse of multiplying powers), requiring comfort with exponent arithmetic.
c9_physics_ch4_1 | The fundamental definition of work (W = ∫F·dx) translates to W = ∫PdV for a gas; this node applies that definition to a specific P(V) relationship.
c10_math_cbse_04_005 | The quadratic formula and completing the square are algebraic techniques that build the algebraic fluency needed to manipulate the adiabatic equations and solve for unknowns (e.g., finding T₂ given P₁, P₂, T₁).

## PREREQ_CONCEPT
First Law of Thermodynamics (ΔQ = ΔU + ΔW) applied to a process with ΔQ = 0, combined with the ideal gas equation of state (PV = μRT) and the definition of γ = Cp/Cv.

## PREREQ_BEFORE
The student must be able to state the First Law with correct sign conventions, recall that internal energy of an ideal gas depends only on temperature (ΔU = μCvΔT), and know the ideal gas law.

## PREREQ_STUCK
Revisit c11_phy_cbse_11_003 (First Law) to clarify sign of W and ΔU, and c11_phy_cbse_11_004 (Isothermal Work) to see the contrast in P-V relationships (PV=const vs PV^γ=const).

## WORKED_EXAMPLE_1
PROBLEM: A diesel engine compresses air (assume diatomic ideal gas, γ = 1.4) adiabatically. The initial conditions are: volume = 500 cm³, pressure = 1.0 × 10⁵ Pa, temperature = 300 K. The compression ratio is 15:1 (final volume = initial volume / 15). Calculate (a) the final pressure, (b) the final temperature, and (c) the work done on the gas during compression. (R = 8.31 J mol⁻¹ K⁻¹)

STEPS:
- Step 1: Identify given quantities and convert to SI units. V₁ = 500 cm³ = 5.0 × 10⁻⁴ m³. V₂ = V₁/15 = 3.33 × 10⁻⁵ m³. P₁ = 1.0 × 10⁵ Pa. T₁ = 300 K. γ = 1.4. Find P₂, T₂, W_on.
- Step 2: Use adiabatic relation P₁V₁^γ = P₂V₂^γ to find P₂. P₂ = P₁(V₁/V₂)^γ = (1.0 × 10⁵) × (15)^1.4. Calculate 15^1.4 = 15^(7/5) = (15^7)^(1/5) ≈ 44.3. So P₂ ≈ 4.43 × 10⁶ Pa.
- Step 3: Use ideal gas law or adiabatic T-V relation to find T₂. T₂ = T₁(V₁/V₂)^{γ-1} = 300 × (15)^{0.4}. 15^0.4 ≈ 2.95. So T₂ ≈ 885 K.
- Step 4: Calculate work done BY the gas: W_by = (P₁V₁ - P₂V₂)/(γ - 1). P₁V₁ = (1.0 × 10⁵)(5.0 × 10⁻⁴) = 50 J. P₂V₂ = (4.43 × 10⁶)(3.33 × 10⁻⁵) ≈ 147.5 J. W_by = (50 - 147.5)/0.4 = -97.5/0.4 = -243.75 J.
- Step 5: Work done ON the gas = -W_by = +244 J. Verify with temperature formula: μ = P₁V₁/(RT₁) = 50/(8.31×300) ≈ 0.020 mol. W_by = μR(T₁-T₂)/(γ-1) = 0.020×8.31×(300-885)/0.4 ≈ -243 J. Consistent.
REASONING: The compression ratio directly gives the volume ratio. The adiabatic index γ determines how much pressure and temperature rise. The work done on the gas is positive and equals the increase in internal energy (ΔU = μCvΔT). The high final temperature (885 K ≈ 612°C) explains why diesel fuel auto-ignites without a spark plug.
ANSWER: (a) P₂ ≈ 4.4 × 10⁶ Pa (44 atm), (b) T₂ ≈ 885 K, (c) Work done on gas ≈ 244 J.

## WORKED_EXAMPLE_2
PROBLEM: Two moles of a monatomic ideal gas (γ = 5/3) undergo an adiabatic expansion from an initial state (P₁ = 8.0 × 10⁵ Pa, V₁ = 2.0 × 10⁻³ m³) to a final volume V₂ = 6.0 × 10⁻³ m³. Calculate (a) the final pressure P₂, (b) the work done by the gas, and (c) the change in internal energy.

STEPS:
- Step 1: Given: n = 2 mol, γ = 5/3 ≈ 1.667, P₁ = 8.0 × 10⁵ Pa, V₁ = 2.0 × 10⁻³ m³, V₂ = 6.0 × 10⁻³ m³. Find P₂, W_by, ΔU.
- Step 2: Find P₂ using P₁V₁^γ = P₂V₂^γ → P₂ = P₁(V₁/V₂)^γ = 8.0 × 10⁵ × (1/3)^{5/3}. (1/3)^{5/3} = 3^{-5/3} ≈ 0.064. P₂ ≈ 5.12 × 10⁴ Pa.
- Step 3: Calculate W_by = (P₁V₁ - P₂V₂)/(γ - 1). P₁V₁ = 1600 J. P₂V₂ = (5.12 × 10⁴)(6.0 × 10⁻³) ≈ 307 J. γ - 1 = 2/3 ≈ 0.667. W_by = (1600 - 307) / 0.667 ≈ 1293 / 0.667 ≈ 1938 J.
- Step 4: Since adiabatic, Q = 0. First Law: ΔU = -W_by = -1938 J. (Internal energy decreases).
- Step 5: Verify ΔU using ΔU = nCvΔT. For monatomic gas, Cv = (3/2)R = 12.465 J/mol·K. T₁ = P₁V₁/(nR) = 1600/(2×8.31) ≈ 96.3 K. T₂ = P₂V₂/(nR) = 307/(2×8.31) ≈ 18.5 K. ΔT = -77.8 K. ΔU = 2 × 12.465 × (-77.8) ≈ -1940 J. Matches.
REASONING: The gas expands, doing positive work (W_by > 0). Since no heat enters, the energy comes from internal energy, so temperature drops dramatically (from 96 K to 18 K). The work done equals the area under the adiabatic curve on a P-V diagram. The monatomic γ = 5/3 makes the curve steeper than diatomic.
ANSWER: (a) P₂ ≈ 5.1 × 10⁴ Pa, (b) W_by ≈ 1940 J, (c) ΔU ≈ -1940 J.

## WORKED_EXAMPLE_3
PROBLEM: Compare the work done when 1 mole of nitrogen gas (γ = 7/5) at 300 K and 10⁵ Pa expands to double its volume (a) isothermally and (b) adiabatically. Also find the final temperature in the adiabatic case. Which process delivers more work? Explain the physical reason for the difference.

STEPS:
- Step 1: Given: n = 1 mol, T₁ = 300 K, P₁ = 1.0 × 10⁵ Pa, γ = 1.4, V₂ = 2V₁. R = 8.31 J/mol·K.
- Step 2: Isothermal work: W_iso = nRT ln(V₂/V₁) = 1 × 8.31 × 300 × ln(2) = 2493 × 0.693 ≈ 1728 J.
- Step 3: Adiabatic final temperature: T₂ = T₁(V₁/V₂)^{γ-1} = 300 × (1/2)^{0.4}. (0.5)^{0.4} ≈ 0.758. T₂ ≈ 227.4 K.
- Step 4: Adiabatic work: W_ad = nR(T₁ - T₂)/(γ - 1) = 1 × 8.31 × (300 - 227.4) / 0.4 = 8.31 × 72.6 / 0.4 ≈ 603 / 0.4 ≈ 1508 J.
- Step 5: Compare: W_iso (1728 J) > W_ad (1508 J). Isothermal delivers ~15% more work.
- Step 6: Physical reason: In isothermal expansion, heat flows in (Q = W) to maintain temperature, keeping pressure higher throughout the expansion. In adiabatic expansion, no heat enters; the gas cools (T drops from 300 K to 227 K), so pressure falls faster (PV^γ = const vs PV = const). The area under the P-V curve (work) is therefore smaller for adiabatic.
REASONING: This problem combines the isothermal work formula (from previous node c11_phy_cbse_11_004) with the adiabatic work formula. It requires calculating the adiabatic temperature drop first. The comparison highlights the thermodynamic value of heat input: maintaining temperature allows more work extraction for the same volume change.
ANSWER: (a) Isothermal work = 1728 J, (b) Adiabatic work = 1508 J, Final adiabatic temperature = 227 K. Isothermal process delivers more work because heat input sustains pressure.

## COMPETENCY_QUESTION_1
QUESTION: A gas cylinder contains compressed gas at high pressure. The valve is opened slightly, allowing gas to escape rapidly into the atmosphere. The cylinder becomes cold to touch. A student says: "This is an adiabatic expansion, so the gas does work on the atmosphere, losing internal energy and cooling. If we instead let the gas expand slowly through a turbine to generate electricity, the cylinder would not get as cold." Evaluate the student's claim. Is the second scenario necessarily less cooling? Explain using the First Law and the concept of work done.

COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables.

STEPS:
- Step 1: Analyze the first scenario (free expansion/throttling). Rapid escape through a valve into vacuum/atmosphere is approximately adiabatic (Q=0) but **irreversible**. No external work is done (W=0) because there is no piston moving against a pressure. So ΔU = 0 → temperature constant for ideal gas (Joule expansion). But real gases cool due to intermolecular forces (Joule-Thomson effect). The student's premise "gas does work on atmosphere" is flawed for free expansion.
- Step 2: Analyze the second scenario (turbine). Gas expands adiabatically *against turbine blades*, doing work (W > 0). Q = 0, so ΔU = -W < 0. Internal energy decreases, temperature drops **more** than in free expansion (where ΔU=0 for ideal gas).
- Step 3: Conclusion: The student is wrong. The turbine expansion causes *greater* cooling (larger ΔT) because work is extracted. The cylinder gets colder in the turbine case.
- Step 4: Key distinction: "Adiabatic" only means Q=0. Work done depends on the process (free expansion vs quasi-static vs turbine). The First Law ΔU = -W shows cooling magnitude is directly proportional to work output.
ANSWER: The student's claim is incorrect. In the rapid valve escape (Joule-Thomson/throttling), negligible work is done (W≈0), so for an ideal gas ΔU=0 and there is no temperature change (real gases show slight cooling). In the turbine, the gas does significant work (W>0) adiabatically, so ΔU = -W < 0, causing a larger temperature drop. The cylinder would get colder with the turbine.
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: In a petrol engine, the air-fuel mixture is compressed adiabatically before ignition. The compression ratio is 10:1. Initial temperature is 320 K. The mixture is modeled as an ideal gas with γ = 1.35. (a) Calculate the temperature at the end of compression. (b) If the mixture reaches its auto-ignition temperature of 550 K, will knocking occur? (c) To prevent knocking without changing the compression ratio, engineers use fuels with higher octane ratings (which effectively allow a higher auto-ignition temperature) or cool the intake air. If intake air is cooled to 280 K, what is the new compressed temperature? Does this prevent knocking?

COMPETENCY: Applying thermodynamic principles to engineering design and real-world problem solving (unit analysis and dimensional reasoning).

STEPS:
- Step 1: Use adiabatic T-V relation: T₂ = T₁(V₁/V₂)^{γ-1} = T₁(r)^{γ-1} where r = compression ratio = 10.
- Step 2: (a) For T₁ = 320 K: T₂ = 320 × 10^{0.35}. 10^{0.35} ≈ 2.239. T₂ ≈ 320 × 2.239 = 716 K.
- Step 3: (b) 716 K > 550 K (auto-ignition temp). Yes, knocking will occur (premature ignition before spark).
- Step 4: (c) For T₁ = 280 K: T₂ = 280 × 2.239 = 627 K.
- Step 5: 627 K > 550 K. Still above auto-ignition temperature. Cooling intake to 280 K is **not sufficient** to prevent knocking at this compression ratio with this fuel. A lower compression ratio, higher octane fuel (higher auto-ignition temp), or intercooling to even lower temperatures is needed.
- Step 6: Unit check: T in K, ratio dimensionless, exponent dimensionless → T in K. Physically reasonable: diesel engines have higher compression ratios (15-20) and rely on this high temperature for compression ignition; petrol engines avoid it.
ANSWER: (a) 716 K, (b) Yes, knocking occurs (716 K > 550 K), (c) New compressed temperature = 627 K. Still > 550 K, so knocking still occurs. Intake cooling alone is insufficient.
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Work done in an adiabatic process is the energy transferred by a gas when it expands or compresses without any heat exchange with its ______ (Q = 0).

## DIAGNOSTIC_ANSWER_7
surroundings

**A wrong answer ("container" or "piston") reveals the student has swapped the definition's partner - no heat is exchanged with the surroundings.** Surroundings is the definition's own partner word, and the noun is what the blank grades. Recall the Q = 0 clause before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a bicycle pump: when you rapidly ______ air by pushing the piston down, the pump barrel becomes noticeably warm.

## DIAGNOSTIC_ANSWER_8
compress

**A wrong answer ("release" or "heat") reveals the student has swapped the walkthrough's verb - the air is rapidly compressed by the piston.** Compress is the walkthrough's own verb, and the verb is what the blank grades. Recall the warm barrel before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What is Work done in an adiabatic process? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Work done in an adiabatic process is the energy transferred by a gas when it expands or compresses without any heat exchange with its surroundings (Q = 0).

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: work done in an adiabatic process is the energy transferred by a gas when it expands or compresses without any heat exchange with its surroundings.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Work done in an adiabatic process is the energy transferred by a gas when it expands or compresses without any heat exchange with its surroundings (Q = ______).

## DIAGNOSTIC_ANSWER_10
0

**A wrong answer (any non-zero figure) reveals the student has drifted from the definition - the heat exchanged is exactly 0.** The 0 is the definition's own value of Q for the adiabatic case. Recall that internal energy then changes purely by work before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_11
What common mix-up does this lesson flag about Work done in an adiabatic process?

## DIAGNOSTIC_ANSWER_11
Students often believe "adiabatic" means "constant temperature" because the word sounds similar to "isothermal" or they confuse "no heat exchange" with "no temperature change".

**A wrong answer (adiabatic means constant temperature) reveals the student holds the flagged mix-up.** No heat exchange is not no temperature change: with Q = 0 the First Law makes ΔU = -W, so the temperature must move whenever work is done - the warm pump is the proof.

## DIAGNOSTIC_QUESTION_12
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_12
The student can calculate the work done in a quasi-static adiabatic process using initial and final state variables (P, V, T) and the adiabatic index γ, and can correctly determine the sign of work based on whether the gas expands or compresses.

**A wrong answer (formula only) reveals the student has under-answered the mastery criterion.** Full mastery adds: compute the work from initial and final P, V or T with the adiabatic index, and determine the sign correctly from whether the gas expands or is compressed.
