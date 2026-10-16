## ELI5
The baker knows the marginal cost of each cake and wants the total for cakes ten through twenty — a definite integral, accumulated change over a stated interval. Find the antiderivative, subtract bottom from top, and the arbitrary constant cancels without ceremony, which is why definite answers never carry one. The number that remains, 350 rupees here, is the net signed area between the curve and the axis.

## DEFINITION
A definite integral \(\int_a^b f(x)\,dx\) represents the net signed area bounded by the curve \(y = f(x)\), the x-axis, and the vertical lines \(x = a\) (lower limit) and \(x = b\) (upper limit), provided \(f\) is continuous on \([a, b]\). By the Second Fundamental Theorem of Calculus, if \(F\) is any antiderivative of \(f\), then \(\int_a^b f(x)\,dx = F(b) - F(a)\), a unique real number (no arbitrary constant).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) Evaluate a definite integral by finding an antiderivative and applying the limits correctly, showing all algebraic steps; (2) Interpret the result as net signed area and explain the geometric meaning when \(f(x)\) takes both positive and negative values on \([a, b]\).

## SCOPE_BOUNDARY
This node covers: definition of definite integral as limit of a sum (conceptual), Second Fundamental Theorem of Calculus, evaluation using antiderivatives, and basic applications (area under curve, total revenue/cost from marginal functions). It does **NOT** cover properties of definite integrals (P1–P8), substitution in definite integrals with limit change, or consumer/producer surplus — those are in subsequent nodes c12_app_cbse_04_007 and c12_app_cbse_04_008.

## WALKTHROUGH
A bakery owner knows the marginal cost of producing the \(x\)-th cake is \(MC(x) = 2x + 5\) rupees. She wants the **total cost of producing cakes 10 to 20** (not from 0). This is exactly \(\int_{10}^{20} (2x + 5)\,dx\). We start by finding the antiderivative \(F(x) = x^2 + 5x\) (no +C needed for definite integrals). Then compute \(F(20) - F(10) = (400 + 100) - (100 + 50) = 350\) rupees. The key insight: definite integrals give **accumulated change over a specific interval**, and the arbitrary constant cancels out automatically — that's why we never write "+ C" in the final answer.

Takeaway: mastery means the antiderivative applied at both limits and the result read as net signed area. Exam moves: evaluation questions integrate and substitute upper minus lower with full working; interpretation questions explain the number as accumulated change over the interval; sign questions split positive and negative regions when the curve crosses the axis. Method: no plus-C — the subtraction cancels it, and writing one anyway is the classic tell of an unfinished definite integral. Drill: one bakery, one interval, one cancelled constant. The odometer difference is the journey; the constant cancelled at the door. Say the sentence 'upper limit in, lower limit out' while substituting; the minus sign between them is where marks are won and, for the hurried, lost.

## DIAGNOSTIC_QUESTION_1
What is the value of \(\int_1^3 2x\,dx\)? Write the antiderivative and show the limit substitution step.

## DIAGNOSTIC_ANSWER_1
Correct answer: Antiderivative of \(2x\) is \(x^2\). Then \(\int_1^3 2x\,dx = [x^2]_1^3 = 3^2 - 1^2 = 9 - 1 = 8\).  
A wrong answer like "\(x^2 + C\)" or "\(3^2 + C - (1^2 + C)\)" reveals the student thinks the arbitrary constant survives in definite integrals. A wrong answer like "\(3^2 + 1^2 = 10\)" reveals confusion between addition and subtraction of limits (upper minus lower).

## DIAGNOSTIC_QUESTION_2
Explain in your own words why \(\int_a^b f(x)\,dx = F(b) - F(a)\) does not depend on which antiderivative \(F\) you choose. Use the fact that any two antiderivatives differ by a constant.

## DIAGNOSTIC_ANSWER_2
If \(F_1(x) = F(x) + C\) and \(F_2(x) = F(x) + D\) are two antiderivatives, then \(F_1(b) - F_1(a) = (F(b)+C) - (F(a)+C) = F(b) - F(a)\), and similarly for \(F_2\). The constants cancel out.  
A wrong answer like "because the constant is zero" or "because we set C=0" shows the student doesn't understand that **any** antiderivative works — the cancellation is algebraic, not a choice of C.

## DIAGNOSTIC_QUESTION_3
Evaluate \(\int_0^2 (3x^2 - 4x + 1)\,dx\). Show all steps: find antiderivative, substitute limits, simplify.

## DIAGNOSTIC_ANSWER_3
Antiderivative: \(F(x) = x^3 - 2x^2 + x\).  
\(F(2) = 8 - 8 + 2 = 2\).  
\(F(0) = 0\).  
\(\int_0^2 (3x^2 - 4x + 1)\,dx = 2 - 0 = 2\).  
A wrong answer like "\(x^3 - 2x^2 + x + C\)" shows the student writes +C out of habit. A wrong answer like "\(F(0) - F(2) = -2\)" reveals the student subtracts in the wrong order (lower minus upper). An arithmetic error in \(F(2)\) (e.g., \(8 - 8 + 2 = 0\)) shows carelessness in evaluation.

## DIAGNOSTIC_QUESTION_4
The marginal revenue function is \(MR(x) = 100 - 2x\). Find the **additional revenue** generated when production increases from 10 units to 15 units. Set up the definite integral and evaluate.

## DIAGNOSTIC_ANSWER_4
Additional revenue = \(\int_{10}^{15} (100 - 2x)\,dx\).  
Antiderivative: \(100x - x^2\).  
At 15: \(1500 - 225 = 1275\).  
At 10: \(1000 - 100 = 900\).  
Difference: \(1275 - 900 = 375\) rupees.  
A wrong answer using \(\int_0^{15} - \int_0^{10}\) is correct in value but shows inefficient method. A wrong answer using indefinite integral \(100x - x^2 + C\) and then "plugging in 15 and 10" without subtraction reveals confusion between antiderivative and definite integral evaluation. A wrong answer \(1275 + 900 = 2175\) shows addition instead of subtraction.

## DIAGNOSTIC_QUESTION_5
A student claims: "\(\int_{-1}^1 x^3\,dx = 0\) because the function is odd." Another student says: "\(\int_{-1}^1 x^3\,dx = \left[\frac{x^4}{4}\right]_{-1}^1 = \frac{1}{4} - \frac{1}{4} = 0\)." Are both correct? Justify which reasoning is more general and why.

## DIAGNOSTIC_ANSWER_5
Both give the correct numerical answer (0), but the **second method is universally valid** for any continuous function. The first method (odd function over symmetric interval) is a **special property** (Property P8) that only works when \(f(-x) = -f(x)\) and limits are symmetric about 0. It fails for \(\int_{-1}^1 (x^3 + 1)\,dx\) where the function is not odd.  
A wrong answer like "both are equally good" or "the first is better because it's faster" shows the student doesn't distinguish between a **general theorem** (FTC) and a **special-case property**. This is critical for JEE where symmetry tricks are optional but FTC is mandatory.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) where a definite integral \(\int_a^b f(x)\,dx\) represents a meaningful quantity. Define \(f(x)\), \(a\), \(b\), and the units of the result. The function must be non-linear (not just \(mx + c\)).

## DIAGNOSTIC_ANSWER_6
Example: A Delhi Metro train's velocity (m/s) is \(v(t) = 2t + 0.1t^2\) for \(t \in [0, 30]\) seconds after departure. The distance traveled in the first 30 seconds is \(\int_0^{30} (2t + 0.1t^2)\,dt\). Antiderivative: \(t^2 + \frac{0.1}{3}t^3\). Value: \(900 + \frac{0.1}{3}(27000) = 900 + 900 = 1800\) meters. Units: meters.  
A poor answer uses a linear function (e.g., \(v(t) = 5t\)) or forgets units. A good answer shows non-linear \(f\), clear physical meaning (accumulation of rate), and correct units. This tests if the student can **model** accumulation, not just compute.

## COMMON_MISCONCEPTION
Students write the antiderivative as \(F(x) + C\) and then evaluate \(F(b) + C - (F(a) + C)\), **keeping the C in intermediate steps** like \([x^2 + C]_1^3\). While algebraically harmless, this wastes time and signals a conceptual gap: they don't realize the definite integral is a **number**, not a family of functions. In board exams, writing "+ C" in the final answer of a definite integral **loses 1 mark** (CBSE marking scheme: "unnecessary constant"). In JEE, it wastes precious seconds. The root cause: over-practice of indefinite integrals where +C is mandatory, leading to muscle memory.

## ON_FAILURE
1. **Immediate drill**: Give 5 definite integrals (polynomial, rational, exponential) and require the student to write the antiderivative **without +C**, then the evaluation step \([F(x)]_a^b = F(b) - F(a)\) in one line.  
2. **Concept check**: Ask "Why does +C disappear?" — student must say "Constants cancel in subtraction" not "We ignore it."  
3. **Revisit node**: c12_app_cbse_04_003 (Integration by substitution) — practice definite integrals with substitution **changing limits** (not back-substitution) to reinforce that definite integrals are self-contained computations.  
4. **Re-diagnostic**: After 2 days, give \(\int_1^e \frac{1}{x}\,dx\) — if they write \(\ln x + C\) or \(\ln e + C - (\ln 1 + C)\), repeat step 1.

## PREREQUISITE_NODE_IDS
c12_app_cbse_04_003, c12_app_cbse_04_004, c12_app_cbse_04_005, c11_app_cbse_08_008

## PREREQUISITE_REASONS
c12_app_cbse_04_003: Substitution method is needed to find antiderivatives of composite functions (e.g., \(\int_0^1 2x e^{x^2}\,dx\)) before applying limits.  
c12_app_cbse_04_004: Partial fractions are needed to integrate rational functions in definite integrals (e.g., \(\int_1^2 \frac{dx}{x^2-1}\)).  
c12_app_cbse_04_005: Integration by parts is needed for products like \(\int_0^1 x e^x\,dx\) or \(\int_1^e \ln x\,dx\).  
c11_app_cbse_08_008: The concept of derivative as instantaneous rate of change underpins the Fundamental Theorem — integration accumulates the rate.

## FORWARD_NODE_IDS
c12_app_cbse_04_007, c12_app_cbse_04_008

## FORWARD_REASONS
c12_app_cbse_04_007: Properties of definite integrals (P1–P8) are shortcuts to evaluate integrals **without finding antiderivatives** — they build directly on the definition and FTC established here.  
c12_app_cbse_04_008: Consumer/Producer surplus are **direct applications** of definite integrals as area between curves and horizontal lines — they require setting up and evaluating \(\int_0^{x_0} f(x)\,dx - p_0 x_0\) which uses this node's evaluation skills.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_11_001, c11_app_cbse_08_008

## CROSS_SUBJECT_REASONS
c11_app_cbse_11_001: Financial Mathematics (Class 11) covers marginal cost/revenue concepts — definite integrals generalize "total = ∫ marginal" to continuous functions, linking discrete sums to continuous accumulation.  
c11_app_cbse_08_008: Derivative as instantaneous rate of change (Class 11) is the conceptual inverse of definite integral as accumulated change — the FTC bridges these two views.

## CHAIN_DESCRIPTION
c11_app_cbse_08_008 -> c12_app_cbse_04_003 -> c12_app_cbse_04_006 -> c12_app_cbse_04_007 -> c12_app_cbse_04_008

## THIS_FORMULA
\(\int_a^b f(x)\,dx = F(b) - F(a)\) where \(F'(x) = f(x)\) and \(f\) is continuous on \([a, b]\).

## FORMULA_VARIABLES
- \(f(x)\): integrand (continuous function on \([a, b]\))  
- \(a\): lower limit of integration  
- \(b\): upper limit of integration  
- \(F(x)\): any antiderivative of \(f(x)\) (i.e., \(F'(x) = f(x)\))  
- \(dx\): variable of integration (dummy variable)  
- \(\int_a^b f(x)\,dx\): definite integral, a real number (net signed area)

## FORMULA_UNITS
If \(f(x)\) has units U (e.g., rupees/unit, m/s, kg/m) and \(x\) has units V (e.g., units, seconds, meters), then \(\int_a^b f(x)\,dx\) has units U × V (e.g., rupees, meters, kg).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_physics_01_001 | In physics, displacement = \(\int_{t_1}^{t_2} v(t)\,dt\) where \(v(t)\) is velocity. This is the exact same structure: accumulate rate (velocity) over time to get net change (displacement).  
c12_economics_02_003 | In economics, Total Cost = \(\int_0^Q MC(q)\,dq + FC\). Marginal Cost is the derivative of Total Cost; definite integral recovers Total Variable Cost. This mirrors the bakery example in the walkthrough.

## PREREQ_CONCEPT
Antiderivative (indefinite integral) as a family of functions \(F(x) + C\), and the fact that differentiation and integration are inverse operations.

## PREREQ_BEFORE
The student must be able to find antiderivatives of basic algebraic, exponential, and logarithmic functions using substitution, partial fractions, and integration by parts (nodes c12_app_cbse_04_003, 004, 005).

## PREREQ_STUCK
If stuck on finding \(F(x)\), review the specific integration technique needed: substitution for composite functions, partial fractions for rational functions, by parts for products. Do not practice definite integrals until indefinite integration is fluent.

## WORKED_EXAMPLE_1
PROBLEM: A company's marginal cost function is \(MC(x) = 3x^2 - 12x + 20\) (in rupees per unit). Fixed cost is ₹500. Find the total cost of producing 10 units.  
STEPS:  
- Step 1: Total Variable Cost (TVC) from 0 to 10 units is \(\int_0^{10} MC(x)\,dx = \int_0^{10} (3x^2 - 12x + 20)\,dx\).  
- Step 2: Find antiderivative: \(F(x) = x^3 - 6x^2 + 20x\). (No +C for definite integral.)  
- Step 3: Evaluate at limits: \(F(10) = 1000 - 600 + 200 = 600\); \(F(0) = 0\).  
- Step 4: TVC = \(600 - 0 = 600\) rupees.  
- Step 5: Total Cost = TVC + Fixed Cost = \(600 + 500 = 1100\) rupees.  
REASONING: Marginal cost is the derivative of total variable cost. By FTC, the definite integral of MC from 0 to Q gives the total variable cost incurred in producing the first Q units. Fixed cost is added separately because it is incurred even at zero production.  
ANSWER: ₹1100

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(\int_1^4 \frac{2x+3}{x^2+3x+2}\,dx\).  
STEPS:  
- Step 1: Factor denominator: \(x^2+3x+2 = (x+1)(x+2)\). Use partial fractions: \(\frac{2x+3}{(x+1)(x+2)} = \frac{A}{x+1} + \frac{B}{x+2}\).  
- Step 2: Solve for A, B: \(2x+3 = A(x+2) + B(x+1) = (A+B)x + (2A+B)\). So \(A+B=2\), \(2A+B=3\) → \(A=1, B=1\).  
- Step 3: Integrand becomes \(\frac{1}{x+1} + \frac{1}{x+2}\). Antiderivative: \(\ln|x+1| + \ln|x+2| = \ln|(x+1)(x+2)|\).  
- Step 4: Evaluate: \([\ln|(x+1)(x+2)|]_1^4 = \ln|5\cdot6| - \ln|2\cdot3| = \ln 30 - \ln 6 = \ln\left(\frac{30}{6}\right) = \ln 5\).  
- Step 5: Final answer: \(\ln 5\) (exact form, no decimal approximation unless asked).  
REASONING: Partial fractions decompose the rational function into integrable pieces. The absolute values in log are essential because the antiderivative of 1/x is \(\ln|x|\). Limits are positive so absolute values can be dropped after substitution, but keeping them is safer.  
ANSWER: \(\ln 5\)

## WORKED_EXAMPLE_3
PROBLEM: The rate of change of temperature in a cold storage (in °C per hour) is given by \(T'(t) = 4 - 0.2t\) for \(t \in [0, 20]\). If initial temperature is 5°C, find the temperature at \(t = 20\) hours. Also find the average temperature over this period.  
STEPS:  
- Step 1: Temperature change from 0 to 20 is \(\int_0^{20} (4 - 0.2t)\,dt\). Antiderivative: \(4t - 0.1t^2\).  
- Step 2: Evaluate: \(F(20) = 80 - 40 = 40\); \(F(0) = 0\). Change = 40°C.  
- Step 3: Temperature at \(t=20\): \(T(20) = T(0) + \text{change} = 5 + 40 = 45°C\).  
- Step 4: Average temperature = \(\frac{1}{20-0} \int_0^{20} T(t)\,dt\). But we don't have \(T(t)\) explicitly. Instead, use average value of rate? No — average temperature = \(\frac{1}{20} \int_0^{20} T(t)\,dt\). We need \(T(t) = 5 + 4t - 0.1t^2\).  
- Step 5: \(\int_0^{20} (5 + 4t - 0.1t^2)\,dt = [5t + 2t^2 - \frac{0.1}{3}t^3]_0^{20} = 100 + 800 - \frac{800}{3} = 900 - 266.67 = 633.33\).  
- Step 6: Average = \(633.33 / 20 = 31.67°C\).  
REASONING: Definite integral of rate gives net change (Step 2). To find average of the quantity itself (temperature), we integrate the quantity function \(T(t)\) and divide by interval length — this is the Mean Value Theorem for Integrals, a direct extension of FTC.  
ANSWER: Temperature at 20 hrs = 45°C; Average temperature = 31.67°C (approx).

## COMPETENCY_QUESTION_1
QUESTION: A startup's marginal profit (in ₹ lakhs per unit) is \(MP(x) = 50 - x^2\) for \(x \in [0, 10]\). The fixed cost is ₹200 lakhs.  
(a) Find the total profit function \(P(x)\) assuming \(P(0) = -200\).  
(b) Determine the production level that maximizes profit.  
(c) Calculate the maximum profit.  
COMPETENCY: Mathematical modeling and optimization using definite integrals (application of FTC + calculus optimization).  
STEPS:  
- Step 1: \(P(x) = \int_0^x (50 - t^2)\,dt - 200 = [50t - \frac{t^3}{3}]_0^x - 200 = 50x - \frac{x^3}{3} - 200\).  
- Step 2: Maximize \(P(x)\): \(P'(x) = 50 - x^2 = 0 \Rightarrow x = \sqrt{50} \approx 7.07\) (since \(x \ge 0\)).  
- Step 3: Verify max: \(P''(x) = -2x < 0\) for \(x > 0\).  
- Step 4: Max profit = \(P(\sqrt{50}) = 50\sqrt{50} - \frac{50\sqrt{50}}{3} - 200 = \frac{100\sqrt{50}}{3} - 200 \approx 235.7 - 200 = 35.7\) lakhs.  
ANSWER: (a) \(P(x) = 50x - \frac{x^3}{3} - 200\); (b) \(x = \sqrt{50} \approx 7.07\) units; (c) Max profit ≈ ₹35.7 lakhs.  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Evaluate \(\int_0^{\pi/2} \frac{\sin x}{\sin x + \cos x}\,dx\) using the property \(\int_0^a f(x)\,dx = \int_0^a f(a-x)\,dx\). (This is Property P4 from the next node, but can be derived here.)  
COMPETENCY: Analytical reasoning and symmetry exploitation in definite integrals (higher-order thinking, JEE-style).  
STEPS:  
- Step 1: Let \(I = \int_0^{\pi/2} \frac{\sin x}{\sin x + \cos x}\,dx\).  
- Step 2: Apply property with \(a = \pi/2\): \(I = \int_0^{\pi/2} \frac{\sin(\pi/2 - x)}{\sin(\pi/2 - x) + \cos(\pi/2 - x)}\,dx = \int_0^{\pi/2} \frac{\cos x}{\cos x + \sin x}\,dx\).  
- Step 3: Add the two expressions for I: \(2I = \int_0^{\pi/2} \frac{\sin x + \cos x}{\sin x + \cos x}\,dx = \int_0^{\pi/2} 1\,dx = \frac{\pi}{2}\).  
- Step 4: \(I = \frac{\pi}{4}\).  
- Step 5: Verify: The integrand is symmetric; the trick avoids finding an antiderivative (which would require Weierstrass substitution).  
ANSWER: \(\frac{\pi}{4}\)  
DIFFICULTY: hard