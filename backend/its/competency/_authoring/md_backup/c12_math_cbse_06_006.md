## DEFINITION
The differential of a function y = f(x) is defined as dy = f'(x) dx, where dx = Δx is a small change in the independent variable x, and dy approximates the corresponding change Δy in the dependent variable y. For sufficiently small Δx, the approximation Δy ≈ dy = f'(x) Δx holds, allowing us to estimate values of f(x + Δx) ≈ f(x) + f'(x) Δx without exact computation.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute approximate values of algebraic, trigonometric, exponential, and root functions using differentials, estimate absolute/relative/percentage errors in measurements, and solve JEE-style problems combining approximation with maxima/minima or rate of change concepts.

## SCOPE_BOUNDARY
Covers linear approximation using differentials (Δy ≈ f'(x)Δx), error estimation in geometric/physical quantities, and approximate computation of roots/powers. Does NOT cover higher-order Taylor approximations, Newton-Raphson method, or multivariable differentials (beyond Class 12 scope).

## WALKTHROUGH
Imagine you need to find √26.3 instantly during a physics lab without a calculator. You know √25 = 5 exactly. The difference is Δx = 1.3. Using the derivative of √x at x=25, which is 1/(2√25) = 1/10, the approximate change is dy = (1/10)(1.3) = 0.13. So √26.3 ≈ 5 + 0.13 = 5.13. This is the power of differentials: replacing a curved function with its tangent line over a tiny interval. Start by identifying a "nice" point x₀ near your target where f(x₀) is known exactly. Compute f'(x₀). Then Δy ≈ f'(x₀)Δx gives the approximation. The key insight: the tangent line is the best linear approximation to the curve near the point of tangency.

## DIAGNOSTIC_QUESTION_1
State the formula for approximating Δy using differentials and explain what each symbol represents. Under what condition is this approximation valid?

## DIAGNOSTIC_ANSWER_1
The formula is Δy ≈ dy = f'(x) dx, where Δy = f(x + Δx) - f(x) is the actual change in y, f'(x) is the derivative at x, and dx = Δx is a small change in x. The approximation is valid when Δx is sufficiently small (|Δx| → 0) and f is differentiable at x. A wrong answer like "Δy = f'(x)Δx exactly" reveals confusion between exact differential dy and actual change Δy — students often forget this is an approximation, not an equality, leading to errors in error estimation problems where they treat the differential as the true error.

## DIAGNOSTIC_QUESTION_2
Why does the tangent line approximation work for √26.3 near x=25 but would fail badly if we tried to approximate √100 using the tangent at x=25? Explain using the concept of local linearity.

## DIAGNOSTIC_ANSWER_2
The tangent line approximates the curve well only in a small neighbourhood of the point of tangency because f(x) is locally linear — the curve and its tangent become indistinguishable as Δx → 0. For √26.3, Δx = 1.3 is small relative to x=25 (5.2% change), so the linear approximation is accurate. For √100 from x=25, Δx = 75 is huge (300% change); the curvature of √x accumulates significant error over this interval, making the tangent line a terrible approximation. A student who says "it works for any Δx" fails to understand that the approximation error grows with (Δx)² and higher-order terms — a classic JEE trap where they apply the formula blindly without checking if Δx is "small enough."

## DIAGNOSTIC_QUESTION_3
Use differentials to approximate the value of (82)^(1/3). Show all steps including the choice of base point, derivative calculation, and final approximation. Compute the actual error if the true value is 4.34448.

## DIAGNOSTIC_ANSWER_3
Let f(x) = x^(1/3). Choose x₀ = 8 (since 8^(1/3) = 2 exactly). Δx = 82 - 8 = 74. f'(x) = (1/3)x^(-2/3). f'(8) = (1/3)(8)^(-2/3) = (1/3)(1/4) = 1/12. dy = f'(8)Δx = (1/12)(74) = 74/12 = 37/6 ≈ 6.1667. Approximate value = f(8) + dy = 2 + 6.1667 = 8.1667. **Wait — this is clearly wrong!** The error is massive because Δx = 74 is NOT small. Correct approach: Choose x₀ = 64 (4³ = 64). Δx = 82 - 64 = 18. f'(64) = (1/3)(64)^(-2/3) = (1/3)(1/16) = 1/48. dy = (1/48)(18) = 18/48 = 3/8 = 0.375. Approximation = 4 + 0.375 = 4.375. Actual error = |4.375 - 4.34448| = 0.03052. Relative error ≈ 0.7%. A student choosing x₀=8 reveals they don't understand "small Δx" is relative to the function's curvature — they must pick a base point where |Δx| is small compared to x₀.

## DIAGNOSTIC_QUESTION_4
A spherical balloon's radius is measured as 10 cm with a possible error of ±0.02 cm. Use differentials to estimate the maximum possible error in the calculated volume. Also find the relative error and percentage error in volume.

## DIAGNOSTIC_ANSWER_4
Volume V = (4/3)πr³. dV = V'(r) dr = 4πr² dr. At r = 10 cm, dr = ±0.02 cm. |dV| = 4π(10)²(0.02) = 4π(100)(0.02) = 8π ≈ 25.13 cm³. Relative error = |dV|/V = (4πr² dr) / ((4/3)πr³) = 3(dr/r) = 3(0.02/10) = 0.006. Percentage error = 0.006 × 100% = 0.6%. A common error: students compute dV = 4πr² Δr but forget the 3 in relative error (writing dr/r instead of 3dr/r), or they use ΔV ≈ dV but then compute percentage error as (dV/V)×100 without simplifying to 3(dr/r)×100 — missing the elegant relationship that percentage error in volume = 3 × percentage error in radius for spheres.

## DIAGNOSTIC_QUESTION_5
A student approximates √15.9 using differentials with base point x₀ = 16. They write: f(x) = √x, f'(x) = 1/(2√x), f'(16) = 1/8. Δx = 15.9 - 16 = -0.1. dy = (1/8)(-0.1) = -0.0125. √15.9 ≈ 4 - 0.0125 = 3.9875. Is this correct? If not, identify the exact error and correct it.

## DIAGNOSTIC_ANSWER_5
The method and arithmetic are correct, but the base point choice is problematic. f'(x) = 1/(2√x) is valid for x > 0. At x₀ = 16, Δx = -0.1 gives |Δx|/x₀ = 0.1/16 = 0.625% — this IS small, so the approximation is actually valid and accurate. The error is only in the student's potential thinking: if they chose x₀ = 9 (since √9=3), Δx = 6.9 would be huge (76.7% change), giving a terrible approximation. The given solution is mathematically sound. A student who flags this as "wrong" because "Δx is negative" reveals a misconception that differentials only work for positive increments — differentials handle negative Δx perfectly fine (the tangent line extends both ways). The approximation √15.9 ≈ 3.9875 is correct (actual: 3.98748...).

## DIAGNOSTIC_QUESTION_6
Design a real-world problem where a manufacturing engineer must use differentials to estimate the maximum allowable error in measuring the radius of a cylindrical pipe so that the cross-sectional area error stays within 1%. Specify all given values and what needs to be found. Solve your own problem.

## DIAGNOSTIC_ANSWER_6
**Problem:** A cylindrical pipe's cross-sectional area A = πr² must be manufactured with area error ≤ 1%. If the nominal radius is r = 5 cm, find the maximum allowable measurement error Δr in the radius.
**Solution:** dA = A'(r) dr = 2πr dr. Relative error: |dA|/A = |2πr dr| / (πr²) = 2|dr|/r. Set 2|dr|/r ≤ 0.01 → |dr| ≤ 0.01r/2 = 0.01(5)/2 = 0.025 cm. Maximum allowable error = ±0.025 cm.
A good answer shows: (1) correct formula for area, (2) differential relationship, (3) relative error derivation, (4) algebraic solution for dr, (5) units. A poor answer might use absolute error instead of relative, forget the factor of 2, or confuse radius with diameter — revealing they don't understand how relative errors propagate through power functions.

## COMMON_MISCONCEPTION
Students treat dy = f'(x)dx as an exact equality Δy = f'(x)Δx and use it for large Δx, e.g., approximating √50 using x₀=16 (Δx=34) giving √50 ≈ 4 + (1/8)(34) = 8.25 (actual: 7.07). They also confuse absolute error (|Δy|) with relative error (|Δy|/|y|) and percentage error (|Δy|/|y|×100%), often omitting the ×100% in final answers. In JEE, they forget that for y = xⁿ, relative error in y = n × relative error in x, leading to wrong answers in error propagation problems.

## ON_FAILURE
If a student chooses a base point where |Δx|/x₀ > 10% or gets wrong error propagation:
1. Revisit **c11_math_cbse_13_007** (Derivative of Polynomial Functions) to recompute f'(x) correctly.
2. Revisit **c11_math_cbse_13_009** (Algebra of Derivatives) for chain rule on composite functions like √(x²+1).
3. Do a re-diagnostic: "Approximate √17 using x₀=16. Then try x₀=9. Compare errors. Explain why one works and the other fails using the concept of local linearity."
4. Practice 5 problems from NCERT Exercise 6.4 (Approximations) with explicit error calculation.

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010, c12_math_cbse_06_001, c12_math_cbse_06_005

## PREREQUISITE_REASONS
c11_math_cbse_13_007: Need derivative of polynomial functions to compute f'(x) for algebraic approximations.
c11_math_cbse_13_008: Need derivative using first principles to understand where dy = f'(x)dx comes from.
c11_math_cbse_13_009: Need sum/difference/product/quotient rules for derivatives of composite functions in approximation problems.
c11_math_cbse_13_010: Need derivatives of trigonometric functions for approximating sin, cos, tan values.
c12_math_cbse_06_001: Rate of change concept underpins the interpretation of f'(x) as instantaneous rate used in differentials.
c12_math_cbse_06_005: Tangent line equation y - y₀ = f'(x₀)(x - x₀) is the geometric basis for linear approximation.

## FORWARD_NODE_IDS
c12_math_cbse_06_007, c12_math_cbse_06_008
## FORWARD_REASONS
c12_math_cbse_06_007: Word problems on maxima/minima often require approximating function values near critical points to verify nature of extrema.
c12_math_cbse_06_008: Critical points and inflection points analysis uses local linear approximation to understand function behaviour near f'(x)=0.

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_02_003, c12_chem_cbse_04_005
## CROSS_SUBJECT_REASONS
c12_phy_cbse_02_003: Physics kinematics uses v = dx/dt, a = dv/dt; differentials approximate small displacements Δx ≈ vΔt and velocity changes Δv ≈ aΔt — identical mathematical structure.
c12_chem_cbse_04_005: Chemical kinetics uses rate = -d[A]/dt; differentials approximate concentration changes Δ[A] ≈ rate × Δt for small time intervals in reaction rate problems.

## CHAIN_DESCRIPTION
c11_math_cbse_13_007 -> c12_math_cbse_06_006 -> c12_math_cbse_06_007

## THIS_FORMULA
Δy ≈ dy = f'(x) Δx  where  f(x + Δx) ≈ f(x) + f'(x) Δx
Relative error = |Δy|/|y| ≈ |dy|/|y|, Percentage error = (|dy|/|y|) × 100%
For y = xⁿ: relative error in y = n × relative error in x

## FORMULA_VARIABLES
x = independent variable (input), Δx = dx = small change in x, f(x) = function value at x, f'(x) = derivative of f at x, Δy = actual change in f, dy = differential (approximate change), f(x + Δx) = approximated function value.

## FORMULA_UNITS
Δx and x share same units (e.g., cm, m, s). Δy, dy, f(x) share same units (e.g., cm², m³, m/s). Relative error and percentage error are dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | Physics kinematics: Δx ≈ vΔt, Δv ≈ aΔt uses identical differential approximation for small time steps.
c12_chem_cbse_04_005 | Chemical kinetics: Δ[conc] ≈ rate × Δt for small Δt in integrated rate law approximations.
c12_eco_cbse_03_004 | Economics marginal analysis: ΔC ≈ MC × Δq, ΔR ≈ MR × Δq for small output changes — direct application of differentials.
## PREREQ_CONCEPT
Derivative as instantaneous rate of change and slope of tangent line — the foundation of linear approximation.

## PREREQ_BEFORE
Student must be able to compute derivatives of algebraic, trigonometric, exponential, and logarithmic functions fluently, and understand the geometric meaning of f'(x) as slope of tangent.

## PREREQ_STUCK
If stuck on derivative computation, revisit Class 11 differentiation rules (c11_math_cbse_13_009) and practice 10 mixed derivative problems before attempting approximations.

## WORKED_EXAMPLE_1
PROBLEM: A spherical soap bubble's radius increases from 5 cm to 5.02 cm due to heating. Use differentials to approximate the increase in its surface area. Also compute the actual increase and the percentage error in the approximation.
STEPS:
- Step 1: Identify the function and known values. Surface area of sphere: S(r) = 4πr². Initial radius r₀ = 5 cm. Change in radius Δr = 5.02 - 5 = 0.02 cm.
- Step 2: Compute the derivative S'(r) = d/dr (4πr²) = 8πr.
- Step 3: Evaluate derivative at r₀ = 5: S'(5) = 8π(5) = 40π cm²/cm.
- Step 4: Compute differential dS = S'(5) Δr = (40π)(0.02) = 0.8π ≈ 2.513 cm². This is the approximate increase in surface area.
- Step 5: Compute actual increase for verification: S(5.02) - S(5) = 4π(5.02)² - 4π(5)² = 4π(25.2004 - 25) = 4π(0.2004) = 0.8016π ≈ 2.518 cm².
- Step 6: Compute percentage error in approximation: |Approx - Actual|/|Actual| × 100% = |0.8π - 0.8016π|/(0.8016π) × 100% = 0.0016/0.8016 × 100% ≈ 0.2%.
REASONING: The differential dS = S'(r)dr uses the tangent line to the surface area function at r=5. Since Δr = 0.02 is small (0.4% of r), the linear approximation is excellent. The error is of order (Δr)², which explains the tiny 0.2% discrepancy.
ANSWER: Approximate increase ≈ 2.513 cm² (or 0.8π cm²). Actual increase ≈ 2.518 cm². Percentage error in approximation ≈ 0.2%.

## WORKED_EXAMPLE_2
PROBLEM: The time period T of a simple pendulum is given by T = 2π√(L/g), where L is length and g = 9.8 m/s². If L is measured as 1 m with an error of ±0.5%, use differentials to find the approximate percentage error in T.
STEPS:
- Step 1: Write T as function of L: T(L) = 2πg^(-1/2) L^(1/2). Constant factor 2π/√g doesn't affect relative error.
- Step 2: Compute derivative: dT/dL = 2πg^(-1/2) × (1/2) L^(-1/2) = (π/√g) L^(-1/2).
- Step 3: Compute differential: dT = (π/√g) L^(-1/2) dL.
- Step 4: Find relative error: |dT|/T = |(π/√g) L^(-1/2) dL| / |2πg^(-1/2) L^(1/2)| = (1/2) |dL|/L.
- Step 5: Given |dL|/L = 0.5% = 0.005. So |dT|/T = (1/2)(0.005) = 0.0025.
- Step 6: Percentage error in T = 0.0025 × 100% = 0.25%.
REASONING: For power functions y = kxⁿ, relative error propagates as n × (relative error in x). Here T ∝ L^(1/2), so n = 1/2. The differential method automatically captures this: dT/T = (1/2) dL/L. This is a classic JEE problem testing error propagation in physical formulas.
ANSWER: Approximate percentage error in time period T = 0.25%.

## WORKED_EXAMPLE_3
PROBLEM: Use differentials to approximate the value of (3.96)² × (1.02)³. Choose appropriate base points and show that the combined approximation is accurate to within 0.1%.
STEPS:
- Step 1: Let f(x,y) = x² y³. We want f(3.96, 1.02). Choose base point (x₀, y₀) = (4, 1) where f(4,1) = 16 × 1 = 16 exactly.
- Step 2: Compute partial derivatives (treating as single-variable differentials sequentially): For fixed y=1, g(x) = x². g'(x) = 2x. g'(4) = 8. Δx = 3.96 - 4 = -0.04. Δg ≈ 8(-0.04) = -0.32. So x² ≈ 16 - 0.32 = 15.68.
- Step 3: For fixed x=3.96, h(y) = (3.96)² y³ ≈ 15.68 y³. h'(y) = 3(15.68)y² = 47.04 y². h'(1) = 47.04. Δy = 1.02 - 1 = 0.02. Δh ≈ 47.04(0.02) = 0.9408.
- Step 4: Combined approximation: f(3.96, 1.02) ≈ 16 + (-0.32) + 0.9408 = 16.6208.
- Step 5: Alternative single-step using total differential: df = (∂f/∂x)dx + (∂f/∂y)dy = (2x y³)dx + (3x² y²)dy. At (4,1): df = (2×4×1)(-0.04) + (3×16×1)(0.02) = 8(-0.04) + 48(0.02) = -0.32 + 0.96 = 0.64. f ≈ 16 + 0.64 = 16.64.
- Step 6: Actual value: (3.96)² × (1.02)³ = 15.6816 × 1.061208 = 16.641... Error in sequential method: |16.6208 - 16.641|/16.641 ≈ 0.12%. Error in total differential: |16.64 - 16.641|/16.641 ≈ 0.006%.
- Step 7: The total differential method is more accurate because it uses the exact base point (4,1) for both partials. The sequential method used an approximated x² value in the second step, introducing extra error.
REASONING: This problem combines two approximations and shows why the total differential df = f_x dx + f_y dy is superior for multivariable-like expressions. The key JEE insight: when approximating products of powers, use logarithmic differentiation or total differentials for maximum accuracy.
ANSWER: Best approximation using total differential: 16.64. Actual value: ≈ 16.641. Error ≈ 0.006%.

## COMPETENCY_QUESTION_1
QUESTION: A manufacturer produces cylindrical cans of radius r = 5 cm and height h = 10 cm. The volume is V = πr²h. Due to manufacturing tolerances, r can vary by ±0.02 cm and h by ±0.01 cm. 
(a) Use differentials to estimate the maximum possible absolute error in volume.
(b) Find the maximum possible percentage error in volume.
(c) If the cost of material is proportional to volume, and the selling price is fixed, explain whether the manufacturer should be more concerned about radius errors or height errors, and by what factor.
COMPETENCY: Translating real-world situations to mathematical expressions; Comparing and justifying; Error identification and correction
STEPS:
- Step 1: Write volume formula V = πr²h. Compute partial derivatives: ∂V/∂r = 2πrh, ∂V/∂h = πr².
- Step 2: Total differential dV = (∂V/∂r)dr + (∂V/∂h)dh = 2πrh dr + πr² dh.
- Step 3: For maximum absolute error, take absolute values and worst-case signs: |dV|_max = 2πrh |dr| + πr² |dh|.
- Step 4: Substitute r=5, h=10, |dr|=0.02, |dh|=0.01: |dV|_max = 2π(5)(10)(0.02) + π(25)(0.01) = 2π + 0.25π = 2.25π ≈ 7.07 cm³.
- Step 5: Nominal volume V₀ = π(25)(10) = 250π ≈ 785.4 cm³. Max % error = (2.25π)/(250π) × 100% = 0.9%.
- Step 6: Contribution from radius error: 2πrh|dr| = 2π. Contribution from height error: πr²|dh| = 0.25π. Radius error contributes 8× more. Since cost ∝ volume, radius tolerance control is 8× more critical.
ANSWER: (a) Max absolute error ≈ 7.07 cm³. (b) Max percentage error = 0.9%. (c) Radius errors are 8 times more impactful than height errors; manufacturer should prioritize radius precision.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The range R of a projectile launched at angle θ with speed u is R = (u² sin 2θ)/g. During an experiment, u = 20 m/s is measured with 1% error, and θ = 30° is measured with an error of ±1°. 
(a) Use differentials to find the approximate percentage error in R.
(b) If the same percentage error in R must be achieved by improving only one measurement, which should be improved and by how much?
(c) Explain why the error sensitivity to θ is zero at θ = 45°, and what this implies for experimental design.
COMPETENCY: Applying mathematical concepts to physics contexts; Analyzing sensitivity and optimization; Justifying experimental design choices
STEPS:
- Step 1: Write R = (u²/g) sin 2θ. Take natural log: ln R = 2 ln u + ln(sin 2θ) - ln g.
- Step 2: Differentiate: dR/R = 2 du/u + (2 cos 2θ / sin 2θ) dθ = 2 du/u + 2 cot 2θ dθ.
- Step 3: At θ = 30°, 2θ = 60°, cot 60° = 1/√3. dθ = 1° = π/180 rad. du/u = 0.01.
- Step 4: dR/R = 2(0.01) + 2(1/√3)(π/180) = 0.02 + 0.0201 ≈ 0.0401. Percentage error ≈ 4.01%.
- Step 5: Contribution from u: 2%. Contribution from θ: 2.01%. They are nearly equal. To reduce total error, improving either helps similarly. But u error scales as 2×, θ error scales as 2 cot 2θ × (π/180).
- Step 6: At θ = 45°, 2θ = 90°, cot 90° = 0. So dR/R = 2 du/u + 0. The range is insensitive to angle errors at 45°! This is because R is maximum at θ=45° (dR/dθ=0), so small angle changes produce negligible range changes — a stationary point property.
- Step 7: Experimental implication: Launch at 45° to minimize angle measurement sensitivity. Then only speed measurement matters.
ANSWER: (a) ≈ 4.01% error in range. (b) Both contribute equally (~2% each); improving either by factor 2 halves total error. (c) At θ=45°, cot 90°=0 so dR/dθ=0 — range is at maximum, making it locally flat. Experimental design should use θ=45° to eliminate angle error sensitivity.
DIFFICULTY: hard