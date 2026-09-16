## DEFINITION
A thermodynamic process is **reversible** if it can be reversed such that both the system and the surroundings return to their original states with no net change anywhere else in the universe; it is **irreversible** if it cannot be reversed without leaving a net change in the universe. Reversibility requires the process to be quasi-static (infinitesimally slow, maintaining equilibrium at every stage) and free from dissipative effects like friction, viscosity, or unrestrained expansion.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can: (1) classify a given real-world or idealised thermodynamic process as reversible or irreversible by identifying the presence of non-equilibrium states or dissipative effects; (2) explain why a quasi-static process without dissipation is the idealised limit for reversibility; (3) apply the concept to justify why the Carnot cycle (two reversible isotherms + two reversible adiabats) achieves maximum possible efficiency between two reservoirs.

## SCOPE_BOUNDARY
Covers: distinction between reversible and irreversible processes, two causes of irreversibility (non-equilibrium states, dissipative effects), the idealised conditions for reversibility (quasi-static + non-dissipative), and the link to Carnot engine efficiency. Does NOT cover: detailed derivation of Carnot efficiency (node c11_phy_cbse_11_011), entropy change calculations (beyond Class 11 scope), or statistical mechanics interpretation of irreversibility.

## WALKTHROUGH
Observe a gas leaking from a punctured LPG cylinder in a kitchen – the gas spreads irreversibly throughout the room and never spontaneously returns to the cylinder. Ask: "What would need to happen for this to reverse?" Guide students to see that reversal would require external work (a compressor) and would heat the surroundings, leaving a net change. Contrast with an idealised frictionless piston compressing gas infinitely slowly: at each step, an infinitesimal pressure difference drives the change, and the process can be retraced exactly. Connect to prior nodes: thermal equilibrium (c11_phy_cbse_11_002) defines the quasi-static condition; First Law (c11_phy_cbse_11_003) shows energy conservation; Second Law (c11_phy_cbse_11_009) forbids complete heat-to-work conversion, making reversibility the theoretical limit for maximum efficiency.

## DIAGNOSTIC_QUESTION_1
State the two necessary and sufficient conditions for a thermodynamic process to be reversible.

## DIAGNOSTIC_ANSWER_1
A process is reversible only if (1) it is quasi-static (system remains in thermal and mechanical equilibrium with surroundings at every stage) and (2) it involves no dissipative effects (friction, viscosity, inelastic deformation, unrestrained expansion, etc.). A wrong answer listing only "slow process" or only "no friction" reveals the student misses that both conditions must hold simultaneously – a slow process with friction is irreversible, and a fast frictionless process passes through non-equilibrium states.

## DIAGNOSTIC_QUESTION_2
Why is the free expansion of a gas into vacuum (Joule expansion) irreversible even though no friction is involved?

## DIAGNOSTIC_ANSWER_2
Free expansion is irreversible because the gas passes through non-equilibrium states – pressure and temperature are not uniform during the expansion, so the process cannot be represented by a continuous path on a P-V diagram. A student who says "it is reversible because no friction" confuses the absence of dissipation with the presence of equilibrium; they miss that irreversibility also arises from non-equilibrium intermediate states, which violates the quasi-static condition.

## DIAGNOSTIC_QUESTION_3
An ideal gas undergoes an isothermal expansion from volume V₁ to V₂ at temperature T. The process is carried out quasi-statically but the piston has a small constant friction force f. Calculate the extra work dissipated as heat due to friction if the piston moves a distance Δx, and explain whether the process remains reversible.

## DIAGNOSTIC_ANSWER_3
Extra work dissipated = f·Δx (joules). This energy appears as heat transferred to the gas and surroundings. The process is **irreversible** because friction is a dissipative effect – even if quasi-static, the dissipative work cannot be recovered without leaving a net change in the universe. A student who calculates f·Δx correctly but claims the process is still reversible misunderstands that dissipation, however small, violates the "no dissipative effects" condition for reversibility.

## DIAGNOSTIC_QUESTION_4
Compare the P-V diagrams of a reversible isothermal expansion and an irreversible isothermal expansion (against constant external pressure) between the same initial and final states. Which diagram shows a larger area under the curve? What does this imply about work done?

## DIAGNOSTIC_ANSWER_4
The reversible isothermal expansion shows a larger area under the curve (the curve follows PV = constant). The irreversible expansion against constant P_ext is a horizontal line on the P-V diagram at P = P_ext, giving less area. This implies the reversible process delivers **maximum work** for a given state change. A student who says the irreversible process does more work confuses the constant external pressure with the gas pressure; they fail to see that in irreversible expansion, P_ext < P_gas at each instant, so ∫P_ext dV < ∫P_gas dV.

## DIAGNOSTIC_QUESTION_5
A student argues: "Since the Carnot engine is reversible, its efficiency η = 1 - T₂/T₁ can be exceeded by an irreversible engine that cleverly uses friction to generate extra heat." Evaluate this claim using the Kelvin-Planck statement.

## DIAGNOSTIC_ANSWER_5
The claim is **false**. The Kelvin-Planck statement says no process can have the sole effect of converting heat completely into work. An irreversible engine with friction produces *less* work output for the same heat input because part of the work is dissipated as heat. Carnot's theorem proves no engine (reversible or irreversible) operating between T₁ and T₂ can exceed η_Carnot. A student who agrees with the claim misunderstands that friction *reduces* useful work output, and that reversibility represents the theoretical upper limit, not a lower bound.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to test whether the condensation of steam on a cold mirror is reversible or irreversible. Specify the system, surroundings, and the criterion you would use to decide.

## DIAGNOSTIC_ANSWER_6
System: steam + mirror. Surroundings: room air at T_room. Process: steam at T₁ > T_room condenses on mirror at T₂ < T₁. Criterion: check if (a) the process is quasi-static (infinitesimal T difference at interface) and (b) no dissipation occurs. In reality, condensation occurs with finite ΔT across the steam-mirror interface and involves latent heat release into a temperature gradient – both violate quasi-static condition. To reverse, you would need to supply heat from a reservoir at exactly T₂ to evaporate the water, but the mirror is at T₂ < T₁, so heat would flow from hot to cold, leaving a net change. A poor answer that says "it's reversible because you can boil the water again" misses that boiling requires a hotter source, changing the surroundings.

## COMMON_MISCONCEPTION
Students often think "reversible means the process can be run backwards in time" (like a video played in reverse). The precise thermodynamic meaning is stricter: **both system AND surroundings must return to their exact initial states with no other change anywhere**. For example, a gas compressed isothermally and reversibly can be expanded back, but the heat reservoir that supplied Q must also receive back exactly Q at the same temperature. If the student only checks the system's state variables (P, V, T) and ignores the surroundings, they will wrongly classify many processes as reversible. Another error: assuming "quasi-static = reversible" – a quasi-static process with friction (e.g., slow compression with piston friction) is irreversible because dissipation generates entropy.

## ON_FAILURE
If a student conflates "reversible" with "can be reversed mechanically":
1. Have them trace energy flows for a block sliding to rest on a rough table (irreversible: work → heat, surroundings warm up). Ask: "Can the block spontaneously start moving again using only the heat from the table?" (No – violates Kelvin-Planck).
2. Contrast with a frictionless pendulum in vacuum (reversible idealisation): at each swing, energy converts between kinetic and potential with no net change in universe.
3. Use a P-V diagram: draw a reversible isotherm (curved) and an irreversible path (horizontal line + vertical line). Show that the cyclic integral ∮dU = 0 for both, but ∮đQ ≠ 0 for irreversible cycle. This visualises that state variables return but heat/work exchanges differ.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_11_001, c11_phy_cbse_11_002, c11_phy_cbse_11_003, c11_phy_cbse_11_008, c11_phy_cbse_11_009, c11_phy_cbse_11_005

## PREREQUISITE_REASONS
c11_phy_cbse_11_001: Defines system/surroundings boundary – essential because reversibility requires *both* system and surroundings to return to initial states.
c11_phy_cbse_11_002: Thermal equilibrium concept – quasi-static condition requires infinitesimal temperature difference between system and reservoir.
c11_phy_cbse_11_003: First Law (ΔQ = ΔU + ΔW) – needed to track energy transfers in forward and reverse processes.
c11_phy_cbse_11_008: Isothermal/adiabatic comparison – provides the specific processes (isothermal, adiabatic) that form the Carnot cycle, the reversible engine.
c11_phy_cbse_11_009: Second Law (Kelvin-Planck, Clausius) – gives the fundamental limitation that makes reversibility the efficiency ceiling.
c11_phy_cbse_11_005: Reversible adiabatic processes are isentropic; this node's quasi-static adiabatic process is the model for reversible adiabatic steps.  

## FORWARD_NODE_IDS
c11_phy_cbse_11_011, c11_phy_cbse_11_012
## FORWARD_REASONS
c11_phy_cbse_11_011: Carnot engine is defined as a *reversible* engine operating between two temperatures; this node provides the conceptual foundation for why its cycle (two reversible isotherms + two reversible adiabats) achieves maximum efficiency.
c11_phy_cbse_11_012: Refrigerator as a reversed Carnot engine – the coefficient of performance derivation assumes reversible processes; understanding reversibility is prerequisite for analysing ideal COP.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_03_001, c10_math_cbse_07_001, c9_math_ch1_1
## CROSS_SUBJECT_REASONS
c10_math_cbse_03_001: Graphical representation of linear equations – P-V diagrams are graphical representations of thermodynamic processes; interpreting area under curve as work requires graph-reading skills.
c10_math_cbse_07_001: Distance formula and coordinate geometry – thermodynamic state space (P, V, T) uses coordinate geometry; quasi-static processes are continuous paths in this space.
c9_math_ch1_1: Cartesian coordinate system – foundation for plotting P-V, T-S diagrams; reversible processes are smooth curves, irreversible processes may not be representable as paths.

## CHAIN_DESCRIPTION
c11_phy_cbse_11_001 -> c11_phy_cbse_11_002 -> c11_phy_cbse_11_003 -> c11_phy_cbse_11_008 -> c11_phy_cbse_11_009 -> c11_phy_cbse_11_010 -> c11_phy_cbse_11_011 -> c11_phy_cbse_11_012

## THIS_FORMULA
N/A - conceptual (but efficiency of reversible Carnot engine: η = 1 - T₂/T₁, where T₁, T₂ are absolute temperatures in K)

## FORMULA_VARIABLES
η = efficiency (dimensionless), T₁ = source/hot reservoir temperature (K), T₂ = sink/cold reservoir temperature (K)

## FORMULA_UNITS
K, dimensionless

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c10_math_cbse_03_001 | P-V diagrams for reversible/irreversible processes require interpreting area under curves as work done, building on graphical representation of equations
c9_math_ch1_1 | Cartesian coordinates (P, V axes) provide the state space where quasi-static reversible processes appear as continuous paths
c11_math_ch8_1 | Sequences and series concepts help understand cyclic processes where the system returns to initial state after a series of steps

## PREREQ_CONCEPT
Quasi-static process (infinitely slow, equilibrium at every stage) and dissipative effects (friction, viscosity, unrestrained expansion) – from nodes c11_phy_cbse_11_008 and c11_phy_cbse_11_009.

## PREREQ_BEFORE
Student must be able to: (1) identify whether a process is quasi-static from its description; (2) state the Kelvin-Planck and Clausius statements of the Second Law; (3) sketch P-V diagrams for isothermal and adiabatic processes.

## PREREQ_STUCK
Revisit c11_phy_cbse_11_008 (quasi-static process definition and P-V diagrams) and c11_phy_cbse_11_009 (Kelvin-Planck/Clausius statements) – these are the direct conceptual building blocks.

## WORKED_EXAMPLE_1
PROBLEM: A cylinder with a frictionless piston contains 0.5 mol of ideal gas at 300 K and 2.0 × 10⁵ Pa. The gas expands isothermally to twice its initial volume. (a) If the expansion is reversible (quasi-static, no friction), calculate the work done by the gas. (b) If the expansion is irreversible against a constant external pressure equal to the final pressure of the gas, calculate the work done. (c) Compare the two values and explain the difference in terms of reversibility. Use R = 8.31 J mol⁻¹ K⁻¹.

STEPS:
- Step 1: Identify given quantities: n = 0.5 mol, T = 300 K (constant), P₁ = 2.0 × 10⁵ Pa, V₂ = 2V₁. Find V₁ from ideal gas law: V₁ = nRT/P₁ = (0.5 × 8.31 × 300) / (2.0 × 10⁵) = 6.2325 × 10⁻³ m³.
- Step 2: For reversible isothermal expansion, work W_rev = nRT ln(V₂/V₁) = (0.5 × 8.31 × 300) × ln(2) = 1246.5 × 0.6931 = 864.0 J.
- Step 3: For irreversible expansion against constant P_ext = P₂ (final pressure). Since isothermal, P₂V₂ = P₁V₁ → P₂ = P₁V₁/V₂ = P₁/2 = 1.0 × 10⁵ Pa.
- Step 4: W_irrev = P_ext ΔV = P₂(V₂ - V₁) = (1.0 × 10⁵) × (2V₁ - V₁) = (1.0 × 10⁵) × V₁ = (1.0 × 10⁵) × (6.2325 × 10⁻³) = 623.3 J.
- Step 5: Compare: W_rev (864 J) > W_irrev (623 J). The reversible process extracts maximum possible work because at each step P_ext is only infinitesimally less than P_gas. The irreversible process has a finite pressure difference, so less work is obtained for the same state change.
- Step 6: Verify: Both processes have same ΔU = 0 (isothermal ideal gas), so Q = W. The reversible process absorbs more heat from the reservoir, consistent with higher efficiency.

REASONING: The reversible process maintains equilibrium at every stage (P_ext ≈ P_gas), so the integral ∫P_gas dV gives maximum area under the P-V curve. The irreversible process uses a constant P_ext equal to the final pressure, which is lower than P_gas during most of the expansion, yielding less work. This illustrates why reversible processes define the theoretical limit for work output.

ANSWER: (a) W_rev = 864 J, (b) W_irrev = 623 J, (c) Reversible work > irreversible work by 241 J for the same initial and final states.

## WORKED_EXAMPLE_2
PROBLEM: 1.0 mol of an ideal monatomic gas (γ = 5/3) is compressed adiabatically from an initial state (P₁ = 1.0 × 10⁵ Pa, V₁ = 2.0 × 10⁻² m³) to a final volume V₂ = 1.0 × 10⁻² m³. (a) Calculate the final pressure and temperature for a reversible adiabatic compression. (b) If the same compression is done irreversibly by suddenly increasing external pressure to the final reversible pressure and holding it constant, explain qualitatively why the final temperature will be higher than in (a). (c) Calculate the actual final temperature for the irreversible case if the work done on the gas is 20% greater than the reversible work. Use R = 8.31 J mol⁻¹ K⁻¹.

STEPS:
- Step 1: Reversible adiabatic: P₁V₁^γ = P₂V₂^γ. P₂ = P₁(V₁/V₂)^γ = (1.0 × 10⁵) × (2)^(5/3) = 1.0 × 10⁵ × 3.1748 = 3.175 × 10⁵ Pa.
- Step 2: T₁ = P₁V₁/(nR) = (1.0 × 10⁵ × 2.0 × 10⁻²) / (1 × 8.31) = 240.7 K. For reversible adiabatic: T₁V₁^(γ-1) = T₂V₂^(γ-1) → T₂ = T₁(V₁/V₂)^(γ-1) = 240.7 × (2)^(2/3) = 240.7 × 1.5874 = 382.1 K.
- Step 3: Reversible work done ON gas: W_rev_on = -W_rev_by = nR(T₂ - T₁)/(γ - 1) = (1 × 8.31 × (382.1 - 240.7)) / (2/3) = (8.31 × 141.4) × 1.5 = 1761 J. (Positive = work done on gas).
- Step 4: Irreversible case: W_irrev_on = 1.20 × W_rev_on = 2113 J. For adiabatic, Q = 0, so ΔU = W_on. ΔU = nC_vΔT = n(3R/2)ΔT (monatomic ideal gas).
- Step 5: 2113 = (1 × 3 × 8.31 / 2) × (T₂_irrev - 240.7) = 12.465 × (T₂_irrev - 240.7). T₂_irrev - 240.7 = 169.5 → T₂_irrev = 410.2 K.
- Step 6: Compare: T₂_irrev (410 K) > T₂_rev (382 K). The extra work input in the irreversible process (due to finite pressure difference causing more work for same volume change) ends up as additional internal energy, raising temperature further. This extra energy is "wasted" – it cannot be fully recovered as work in a subsequent expansion.

REASONING: In irreversible adiabatic compression against constant P_ext = P₂_rev, the gas pressure is lower than P_ext during most of the compression (since P_gas rises from P₁ to P₂). To achieve the same volume change, the constant P_ext must do more work than the reversible path. This extra work input increases ΔU and thus final temperature. The process is irreversible because the finite pressure difference creates non-equilibrium states.

ANSWER: (a) P₂ = 3.18 × 10⁵ Pa, T₂ = 382 K; (b) Irreversible compression requires more work input for same ΔV, so ΔU is larger → higher T; (c) T₂_irrev = 410 K.

## WORKED_EXAMPLE_3
PROBLEM: A Carnot engine operates between a hot reservoir at 500 K and a cold reservoir at 300 K. The engine absorbs 2000 J of heat from the hot reservoir per cycle. (a) Calculate the efficiency and work output per cycle. (b) An irreversible engine operating between the same reservoirs claims to produce 1000 J of work per cycle while absorbing 2000 J from the hot reservoir. Use the Kelvin-Planck statement to prove this claim is impossible. (c) If the irreversible engine actually produces 600 J of work, calculate its efficiency and the heat rejected to the cold reservoir. Compare with the Carnot engine's heat rejection.

STEPS:
- Step 1: Carnot efficiency η_C = 1 - T₂/T₁ = 1 - 300/500 = 1 - 0.6 = 0.40 (40%).
- Step 2: Carnot work output W_C = η_C × Q₁ = 0.40 × 2000 = 800 J. Heat rejected Q₂_C = Q₁ - W_C = 2000 - 800 = 1200 J.
- Step 3: Claimed irreversible engine: Q₁' = 2000 J, W' = 1000 J → η' = 1000/2000 = 0.50 (50%). This exceeds η_C (40%), violating Carnot's theorem (derived from Kelvin-Planck).
- Step 4: Proof by contradiction: Couple the claimed irreversible engine (I) with a Carnot refrigerator (R). I takes Q₁ = 2000 J from hot reservoir, does W' = 1000 J, rejects Q₂' = 1000 J to cold reservoir. R uses W = 800 J to take Q₂ = 1200 J from cold reservoir and deliver Q₁ = 2000 J to hot reservoir. Net effect: cold reservoir loses (1200 - 1000) = 200 J, which is completely converted to work (1000 - 800) = 200 J with no other change. This violates Kelvin-Planck (sole effect: heat from single reservoir → work).
- Step 5: Actual irreversible engine: W_irrev = 600 J, Q₁ = 2000 J → η_irrev = 600/2000 = 0.30 (30%). Q₂_irrev = 2000 - 600 = 1400 J.
- Step 6: Comparison: Carnot rejects 1200 J, irreversible rejects 1400 J. The extra 200 J rejected represents the "wasted" energy due to irreversibilities (friction, finite ΔT, etc.). For the same heat input, irreversible engine produces less work and dumps more heat to the cold reservoir.

REASONING: Carnot's theorem (derived from Second Law) sets the absolute maximum efficiency for any engine between two temperatures. Any claim exceeding η_Carnot leads to a Kelvin-Planck violation when coupled with a Carnot refrigerator. Real irreversible engines have lower efficiency, rejecting more heat for the same input. This quantitative comparison shows why reversibility is the ideal limit.

ANSWER: (a) η_C = 40%, W_C = 800 J; (b) Claimed η' = 50% > 40% → impossible by Kelvin-Planck; (c) η_irrev = 30%, Q₂_irrev = 1400 J (vs Carnot's 1200 J).

## COMPETENCY_QUESTION_1
QUESTION: A thermally insulated cylinder with a frictionless piston contains an ideal gas. The piston is initially held by a latch. The gas is at (P₁, V₁, T₁). The latch is released and the gas expands against zero external pressure (vacuum) until it reaches a new equilibrium at (P₂, V₂, T₂). (i) Is this process quasi-static? (ii) Is it reversible? (iii) What is the work done? (iv) What is the change in internal energy? (v) If the gas is ideal, how does T₂ compare to T₁? Justify each answer using thermodynamic principles.

COMPETENCY: Interpreting physical situations using thermodynamic laws and identifying process characteristics

STEPS:
- Step 1: Recognize free expansion into vacuum – no external pressure, so piston accelerates; gas passes through non-equilibrium states (pressure/temperature not uniform).
- Step 2: Quasi-static requires equilibrium at every stage → NOT quasi-static.
- Step 3: Reversible requires quasi-static + no dissipation → NOT reversible (fails quasi-static condition).
- Step 4: Work W = ∫P_ext dV = 0 (since P_ext = 0).
- Step 5: First Law: ΔU = Q - W. Adiabatic (insulated) → Q = 0. So ΔU = 0.
- Step 6: For ideal gas, U depends only on T → ΔU = 0 ⇒ T₂ = T₁.

ANSWER: (i) No – piston accelerates, gas in non-equilibrium states. (ii) No – fails quasi-static condition. (iii) W = 0 J. (iv) ΔU = 0 J. (v) T₂ = T₁ (ideal gas internal energy depends only on temperature).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two identical cylinders A and B each contain 1 mol of the same ideal diatomic gas (γ = 7/5) at 300 K and 1.0 × 10⁵ Pa. In cylinder A, the gas is compressed reversibly and adiabatically to half its initial volume. In cylinder B, the gas is compressed irreversibly and adiabatically to the same final volume by a constant external pressure equal to the final pressure of cylinder A. (a) Calculate the final temperature in cylinder A. (b) Calculate the work done on the gas in cylinder A. (c) The work done on the gas in cylinder B is 15% greater than in A. Calculate the final temperature in cylinder B. (d) Explain why the final temperatures differ, relating your answer to the concept of reversibility and the Second Law. (e) If both gases are now expanded reversibly and adiabatically back to the original volume, will they return to the same initial state? Justify.

COMPETENCY: Predicting outcomes from changing variables and applying Second Law reasoning to real processes

STEPS:
- Step 1: Cylinder A (reversible adiabatic): T₁V₁^(γ-1) = T₂V₂^(γ-1). V₂ = V₁/2. T₂_A = T₁(V₁/V₂)^(γ-1) = 300 × (2)^(2/5) = 300 × 1.3195 = 395.9 K.
- Step 2: W_on_A = nC_v(T₂ - T₁) = 1 × (5R/2) × (395.9 - 300) = (5 × 8.31 / 2) × 95.9 = 20.775 × 95.9 = 1992 J.
- Step 3: Cylinder B: W_on_B = 1.15 × W_on_A = 1.15 × 1992 = 2291 J. Adiabatic → ΔU = W_on. nC_v(T₂_B - 300) = 2291 → 20.775 × (T₂_B - 300) = 2291 → T₂_B - 300 = 110.3 → T₂_B = 410.3 K.
- Step 4: T₂_B > T₂_A because irreversible compression with finite pressure difference requires more work input for the same volume change. The extra work becomes extra internal energy (higher T). This "wasted" work represents energy that could have been recovered if the process were reversible – it increases the entropy of the universe.
- Step 5: Reversible adiabatic expansion back to V₁: For A, T returns to 300 K exactly (reversible cycle). For B, the gas is now at a different state (P₂_B, V₂, T₂_B). A reversible adiabatic expansion from this new state will follow P V^γ = const for that state, ending at a different final temperature (not 300 K). The initial state is not recovered because the irreversible compression increased the entropy of the gas.

ANSWER: (a) T₂_A = 396 K. (b) W_on_A = 1990 J. (c) T₂_B = 410 K. (d) Irreversible compression does more work for same ΔV → more ΔU → higher T. The extra work is dissipated, increasing universe entropy. (e) No – cylinder B gas has higher entropy after irreversible compression; reversible expansion from that state follows a different adiabat and cannot return to the original (P₁, V₁, T₁).

DIFFICULTY: hard