## ELI5
A conveyor belt running at fixed speed empties its hopper in a straight line: same tonnage every minute until it stops. That is the zero-order integrated equation - starting stock minus rate times time - and it comes from integrating a rate that never looks at concentration. The stock-versus-time graph is therefore a straight downhill line whose steepness is the rate constant and whose starting height is the initial amount. Read any two of stock, time, or steepness, and the third falls out.

## DEFINITION
For a zero order reaction, the rate of reaction is independent of the concentration of the reactant(s). The integrated rate equation is derived from the differential rate law \(-\frac{d[R]}{dt} = k\) and yields \([R] = -kt + [R]_0\), where \([R]\) is the concentration of reactant at time \(t\), \([R]_0\) is the initial concentration, and \(k\) is the rate constant with units of concentration time⁻¹ (mol L⁻¹ s⁻¹).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the integrated rate equation for a zero order reaction from its differential form, use it to calculate concentration at any time or the rate constant from experimental data, and interpret the linear \([R]\) vs \(t\) plot (slope = \(-k\), intercept = \([R]_0\)).

## SCOPE_BOUNDARY
This node covers the derivation, mathematical form, graphical representation, and numerical application of the integrated rate equation for zero order reactions only. It does NOT cover first order integrated equations (c12_chem_cbse_03_006), half-life calculations (c12_chem_cbse_03_007), or pseudo-order reactions.

## WALKTHROUGH
Imagine a catalytic converter in a car exhaust: the decomposition of ammonia on a hot platinum surface proceeds at a constant rate regardless of how much ammonia is left, because the platinum surface becomes saturated. This is a classic zero order reaction. We begin by recalling the differential rate law for zero order: rate = \(k[R]^0 = k\). We then integrate this simple differential equation step by step, applying the initial condition \(t=0, [R]=[R]_0\) to find the constant of integration. The result is a linear equation linking concentration and time. We will plot \([R]\) vs \(t\) to see the straight line, identify the slope and intercept, and then solve numerical problems where we calculate \(k\) or predict concentration after a given time.

Takeaway first: integrate a concentration-blind rate and you get a straight line - stock equals starting stock minus k times time. Exam moves: derivation-from-differential questions, concentration-after-time computations, rate constants from slope data, and graph-reading questions where the intercept is the starting stock. Method: rerun the saturated converter - the platinum surface throttled, ammonia decaying linearly, no curvature anywhere. Check yourself: the flagged error drops the minus sign and writes an increasing line - stock cannot grow while the reaction consumes it. Drill: derive the equation with the initial condition applied, then compute one concentration after a stated time.

## DIAGNOSTIC_QUESTION_1
State the differential rate law for a zero order reaction and write the integrated rate equation obtained after integration with the initial condition \([R]_0\) at \(t=0\).

## DIAGNOSTIC_ANSWER_1
The differential rate law is \(-\frac{d[R]}{dt} = k\). Integrating gives \([R] = -kt + [R]_0\). A wrong answer (e.g., writing \([R] = [R]_0 e^{-kt}\) or forgetting the negative sign) reveals confusion between zero and first order integrated forms or a sign error in the integration step.

## DIAGNOSTIC_QUESTION_2
Explain why the plot of concentration \([R]\) versus time \(t\) for a zero order reaction is a straight line, and identify the physical meaning of its slope and intercept.

## DIAGNOSTIC_ANSWER_2
The integrated equation \([R] = -kt + [R]_0\) is of the form \(y = mx + c\) with \(y = [R]\), \(x = t\), slope \(m = -k\), and intercept \(c = [R]_0\). A wrong answer (e.g., saying slope = \(k\) or intercept = 0) shows the student has not compared the equation to the straight-line form or has missed the negative sign in the slope.

## DIAGNOSTIC_QUESTION_3
The decomposition of NH₃ on a platinum surface is a zero order reaction with \(k = 2.5 \times 10^{-4}\) mol L⁻¹ s⁻¹. If the initial concentration of NH₃ is 0.10 mol L⁻¹, calculate the concentration after 100 seconds.

## DIAGNOSTIC_ANSWER_3
Using \([R] = [R]_0 - kt\): \([R] = 0.10 - (2.5 \times 10^{-4} \times 100) = 0.10 - 0.025 = 0.075\) mol L⁻¹. A wrong answer (e.g., 0.125 or using first order formula) indicates the student either added instead of subtracted, used the wrong integrated equation, or mishandled units.

## DIAGNOSTIC_QUESTION_4
A student plots \([R]\) vs \(t\) for a zero order reaction and obtains a straight line with slope \(-3.2 \times 10^{-3}\) mol L⁻¹ s⁻¹ and intercept 0.50 mol L⁻¹. Write the integrated rate equation for this reaction and predict the time when \([R]\) becomes 0.10 mol L⁻¹.

## DIAGNOSTIC_ANSWER_4
Equation: \([R] = -3.2 \times 10^{-3} t + 0.50\). Set \([R] = 0.10\): \(0.10 = -3.2 \times 10^{-3} t + 0.50 \Rightarrow t = \frac{0.40}{3.2 \times 10^{-3}} = 125\) s. A wrong answer (e.g., using positive slope or solving incorrectly) shows inability to extract parameters from the graph or algebraic manipulation errors.

## DIAGNOSTIC_QUESTION_5
Evaluate the statement: "For a zero order reaction, the half-life is independent of the initial concentration." Justify your answer using the integrated rate equation.

## DIAGNOSTIC_ANSWER_5
The statement is FALSE. For zero order, \(t_{1/2} = \frac{[R]_0}{2k}\), which is directly proportional to \([R]_0\). A student who says "true" is confusing zero order with first order (where \(t_{1/2}\) is constant). This reveals a lack of derivation of half-life from the integrated equation.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment (using concentration vs time data) to confirm that the decomposition of N₂O₅ in CCl₄ is NOT a zero order reaction. Describe what you would plot and what result would disprove zero order kinetics.

## DIAGNOSTIC_ANSWER_6
Plot \([N_2O_5]\) vs \(t\). If the reaction were zero order, the plot would be linear. Since N₂O₅ decomposition is first order, the plot will be a curve (exponential decay). A linear \(\ln[N_2O_5]\) vs \(t\) plot would confirm first order. A poor answer (e.g., plotting rate vs concentration) shows misunderstanding of how integrated rate equations are used to determine order.

## COMMON_MISCONCEPTION
Students often write the integrated rate equation as \([R] = kt + [R]_0\) (missing the negative sign) because they forget that concentration decreases with time. They also confuse the units of \(k\): for zero order, \(k\) has units of mol L⁻¹ s⁻¹ (concentration/time), not s⁻¹. In numerical problems, they sometimes use the first order equation \(\ln[R] = -kt + \ln[R]_0\) for zero order reactions, leading to completely wrong answers.

## ON_FAILURE
1. Revisit the derivation in NCERT (section 3.3.1): integrate \(d[R] = -k dt\) step by step, explicitly writing the constant of integration and applying \(t=0, [R]=[R]_0\). 2. Practice the straight-line plot: draw \([R]\) vs \(t\) for a made-up zero order reaction, label slope and intercept. 3. Do 3 numerical problems using only \([R] = [R]_0 - kt\) and check units of \(k\) each time. 4. Compare with first order integrated equation side-by-side to cement the difference.

## PREREQUISITE_NODE_IDS
c12_chem_cbse_03_001, c12_chem_cbse_03_002, c12_chem_cbse_03_003
## PREREQUISITE_REASONS
c12_chem_cbse_03_001: Defines rate of reaction and instantaneous/average rate concepts needed to understand differential rate law.
c12_chem_cbse_03_002: Introduces rate law, rate constant, and differential rate equation which is the starting point for integration.
c12_chem_cbse_03_003: Explains zero order reaction definition and its differential rate law (rate = k) which is integrated in this node.

## FORWARD_NODE_IDS
c12_chem_cbse_03_006, c12_chem_cbse_03_007, c12_chem_cbse_03_008

## FORWARD_REASONS
c12_chem_cbse_03_006: The integration technique learned here (separation of variables, applying initial conditions) is directly used to derive the first order integrated equation.
c12_chem_cbse_03_007: Half-life for zero order is derived from the integrated equation \([R] = [R]_0 - kt\) by setting \([R] = [R]_0/2\); this node provides that equation.
c12_chem_cbse_03_008: Rate constant k from rate law (node c12_chem_cbse_03_002) and its experimental determination via integrated rate equations (nodes c12_chem_cbse_03_005, c12_chem_cbse_03_006).  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions – needed to understand \(d[R]/dt = -k\) as a derivative.
c11_math_cbse_13_008: Derivative using first principle – underpins the concept of instantaneous rate as a derivative.

## CHAIN_DESCRIPTION
c12_chem_cbse_03_003 -> c12_chem_cbse_03_005 -> c12_chem_cbse_03_006

## THIS_FORMULA
[R] = [R]₀ - kt

## FORMULA_VARIABLES
[R] = concentration of reactant at time t (mol L⁻¹), [R]₀ = initial concentration at t=0 (mol L⁻¹), k = rate constant (mol L⁻¹ s⁻¹), t = time (s)

## FORMULA_UNITS
Concentration: mol L⁻¹; Time: s; Rate constant k: mol L⁻¹ s⁻¹

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | The differential rate law -d[R]/dt = k is a simple derivative; integration is the reverse process taught in calculus.
c11_math_cbse_13_008 | The concept of instantaneous rate as a limit of average rate (derivative) is introduced in Class 11 calculus.
## PREREQ_CONCEPT
Understanding of differential rate law for zero order (rate = k) and basic integration of constant functions.

## PREREQ_BEFORE
Student must be able to write the differential rate law for zero order and perform indefinite integration of a constant with respect to time.

## PREREQ_STUCK
If stuck, review the definition of zero order reaction (c12_chem_cbse_03_003) and the integration of constants (Class 11 Maths: derivative/integral of constant).

## WORKED_EXAMPLE_1
PROBLEM: The decomposition of ammonia on a hot platinum surface follows zero order kinetics. In an experiment, the initial pressure of NH₃ is 200 Pa. After 500 seconds, the pressure drops to 150 Pa. Assuming pressure is proportional to concentration, calculate the rate constant k and predict the pressure after 1000 seconds.
STEPS:
- Step 1: Identify that for a zero order gas phase reaction, pressure can replace concentration in the integrated rate equation: P = P₀ - kt.
- Step 2: Plug in known values: P₀ = 200 Pa, P = 150 Pa at t = 500 s. So 150 = 200 - k(500).
- Step 3: Solve for k: k = (200 - 150) / 500 = 50 / 500 = 0.10 Pa s⁻¹.
- Step 4: Use this k to find pressure at t = 1000 s: P = 200 - (0.10)(1000) = 200 - 100 = 100 Pa.
- Step 5: Verify units: k in Pa s⁻¹ (pressure/time), consistent with zero order. The pressure drops linearly, as expected.
REASONING: The integrated rate law for zero order is linear in time. Since the reaction occurs at constant volume and temperature, pressure is directly proportional to concentration (ideal gas law), so we can use pressure directly in the equation. The negative slope confirms consumption of reactant.
ANSWER: k = 0.10 Pa s⁻¹; Pressure at 1000 s = 100 Pa.

## WORKED_EXAMPLE_2
PROBLEM: A zero order reaction has a rate constant k = 3.0 × 10⁻³ mol L⁻¹ min⁻¹. If the initial concentration of the reactant is 0.50 mol L⁻¹, how long will it take for the concentration to fall to 0.20 mol L⁻¹? Also calculate the half-life of this reaction.
STEPS:
- Step 1: Write the integrated rate equation: [R] = [R]₀ - kt.
- Step 2: Substitute [R] = 0.20, [R]₀ = 0.50, k = 3.0 × 10⁻³ mol L⁻¹ min⁻¹. So 0.20 = 0.50 - (3.0 × 10⁻³)t.
- Step 3: Solve for t: (3.0 × 10⁻³)t = 0.50 - 0.20 = 0.30 → t = 0.30 / (3.0 × 10⁻³) = 100 min.
- Step 4: Half-life for zero order: t₁/₂ = [R]₀ / (2k). Substitute: t₁/₂ = 0.50 / (2 × 3.0 × 10⁻³) = 0.50 / (6.0 × 10⁻³) = 83.33 min.
- Step 5: Check: At t = 100 min, concentration is 0.20 (less than half of 0.50), so time > half-life (83.33 min). Consistent.
REASONING: The linear equation directly gives time for any concentration. Half-life formula is derived by setting [R] = [R]₀/2 in the integrated equation. Note that half-life depends on initial concentration, unlike first order.
ANSWER: Time = 100 min; Half-life = 83.3 min.

## WORKED_EXAMPLE_3
PROBLEM: The decomposition of N₂O on a gold surface is zero order. In a 1.0 L vessel, 0.020 mol of N₂O decomposes in 20 minutes. The initial amount was 0.050 mol. Calculate the rate constant in mol L⁻¹ s⁻¹ and the time required for 75% decomposition.
STEPS:
- Step 1: Convert amounts to concentrations (volume = 1.0 L, so mol = mol L⁻¹). [R]₀ = 0.050 mol L⁻¹. Amount decomposed = 0.020 mol L⁻¹, so [R] at t=20 min = 0.050 - 0.020 = 0.030 mol L⁻¹.
- Step 2: Convert time to seconds: 20 min = 20 × 60 = 1200 s.
- Step 3: Use [R] = [R]₀ - kt → 0.030 = 0.050 - k(1200) → k = (0.020) / 1200 = 1.67 × 10⁻⁵ mol L⁻¹ s⁻¹.
- Step 4: For 75% decomposition, [R] = 25% of [R]₀ = 0.25 × 0.050 = 0.0125 mol L⁻¹.
- Step 5: Find t: 0.0125 = 0.050 - (1.67 × 10⁻⁵)t → t = (0.0375) / (1.67 × 10⁻⁵) = 2245.5 s ≈ 37.4 min.
- Step 6: Verify: 75% decomposition takes longer than 50% (half-life). Half-life = [R]₀/(2k) = 0.050/(2×1.67×10⁻⁵) = 1497 s ≈ 25 min. 37.4 > 25, consistent.
REASONING: This problem combines unit conversion (min to s), concentration calculation from moles, and the integrated rate law. The zero order half-life dependence on [R]₀ is verified by the 75% time being greater than half-life but not double (since half-life changes as [R]₀ changes).
ANSWER: k = 1.67 × 10⁻⁵ mol L⁻¹ s⁻¹; Time for 75% decomposition = 2246 s (or 37.4 min).

## COMPETENCY_QUESTION_1
QUESTION: A student studies the decomposition of a gas X on a catalyst surface. She measures the pressure of X at various times and obtains a linear plot of P_X vs t with a negative slope. She concludes the reaction is zero order. Is her conclusion necessarily correct? Explain what additional check she must perform to confirm zero order kinetics.
COMPETENCY: Interpreting chemical kinetics data / Distinguishing reaction order from graphical analysis
STEPS:
- Step 1: Recognize that a linear P vs t plot with negative slope is consistent with zero order integrated rate law (P = P₀ - kt).
- Step 2: Recall that other reaction orders can also give linear plots if the appropriate function is plotted (e.g., ln P vs t for first order, 1/P vs t for second order).
- Step 3: The student must check that the rate constant k calculated from the slope is constant for all time intervals, or that the half-life changes with initial pressure (t₁/₂ ∝ P₀).
- Step 4: Alternatively, she should test if ln P vs t or 1/P vs t are non-linear to rule out other orders.
ANSWER: No, the conclusion is not necessarily correct. A linear P vs t plot is necessary but not sufficient for zero order. She must verify that the slope (k) is constant across the entire time range and that the half-life is proportional to initial pressure. If the reaction were first order, a plot of ln P vs t would be linear; she must show that plot is not linear.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The thermal decomposition of HI on a gold surface is zero order with k = 2.0 × 10⁻⁴ mol L⁻¹ s⁻¹ at 500 K. The reaction is carried out in a 2.0 L vessel with an initial amount of 0.040 mol HI. (a) Write the rate law in terms of pressure (assuming ideal gas). (b) Calculate the time when the total pressure in the vessel reaches 1.5 times the initial pressure. (c) Explain why the reaction cannot continue indefinitely at this constant rate.
COMPETENCY: Applying integrated rate equations to gas phase reactions / Relating stoichiometry to pressure changes / Understanding physical limits of zero order kinetics
STEPS:
- Step 1: (a) Rate law: -d[HI]/dt = k. Using PV = nRT, P_HI = [HI]RT. So -dP_HI/dt = kRT. Since 2HI → H₂ + I₂, total pressure P_total = P_HI + P_H₂ + P_I₂. For every 2 moles HI lost, 2 moles products gained → total moles constant. So P_total = constant = initial pressure P₀. Wait: 2HI → H₂ + I₂, Δn_gas = 0. So total pressure remains constant! The question says "total pressure reaches 1.5 times initial pressure" – this is impossible if Δn=0. Let's re-read: "thermal decomposition of HI on gold surface" – the reaction is 2HI(g) → H₂(g) + I₂(g). Moles of gas: 2 → 1+1 = 2. No change in total moles. So total pressure is constant. The question might be flawed or testing this understanding. (b) Since total pressure is constant, it never reaches 1.5 times initial. (c) Zero order holds only while catalyst surface is saturated. When [HI] becomes very low, the surface is no longer saturated, and the reaction becomes first order (rate depends on [HI]). The constant rate cannot continue once reactant is depleted.
- Step 2: Actually, the rate law in terms of pressure: rate = -d[HI]/dt = k. Since [HI] = P_HI/RT, -dP_HI/dt = kRT. This is the rate law in pressure units.
- Step 3: For (b), total pressure P_total = P_HI + P_H₂ + P_I₂. Initially, P_total = P₀ (only HI). At any time, let 2x be the decrease in P_HI. Then P_HI = P₀ - 2x, P_H₂ = x, P_I₂ = x. So P_total = (P₀ - 2x) + x + x = P₀. Constant! So the condition "total pressure reaches 1.5 times initial" is never met. The student must recognize Δn_gas = 0.
- Step 4: For (c), zero order kinetics occurs because the gold surface is saturated with HI molecules. As HI decomposes, its pressure drops. Eventually, the pressure becomes too low to maintain full surface coverage, and the rate becomes proportional to pressure (first order). The reaction stops when HI is exhausted.
ANSWER: (a) -dP_HI/dt = kRT (where R = 0.0821 L atm mol⁻¹ K⁻¹, T = 500 K). (b) Total pressure remains constant at initial pressure P₀ because Δn_gas = 0 for 2HI → H₂ + I₂. It never reaches 1.5 P₀. (c) Zero order kinetics is valid only at high pressures where the catalyst surface is saturated. As HI pressure drops, surface coverage decreases, and the reaction transitions to first order kinetics. The constant rate cannot be maintained indefinitely.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: For a zero order reaction, the rate of reaction is independent of the ______ of the reactant(s).

## DIAGNOSTIC_ANSWER_7
concentration

The concentration word is the differential law's blind spot: zero order is defined by the rate ignoring the very quantity that the integrated equation tracks. **A wrong answer (proportional) reveals the student has fused two opposite orders into one sentence.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a catalytic converter in a car exhaust: the ______ of ammonia on a hot platinum surface proceeds at a constant rate regardless of how much ammonia is left, because the platinum surface becomes saturated.

## DIAGNOSTIC_ANSWER_8
decomposition

The decomposition is the demonstration's engine: ammonia breaking down on saturated platinum at a pace that ignores its own thinning. **A wrong answer (combination) reveals the student has reversed the reaction and built a linear law on a synthesis the walkthrough never ran.**
