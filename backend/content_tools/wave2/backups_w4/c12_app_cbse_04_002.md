## ELI5
Imagine you know exactly how fast a car is accelerating at every moment (the derivative). Integration is the reverse detective work: given the acceleration data, can you figure out the car's total distance traveled? Just like a family of cars starting from different initial positions but accelerating identically will trace parallel paths, the indefinite integral gives a "family of functions" separated only by a constant starting point $C$. **Most common mix-up:** Forgetting $+C$ because you treat integration as a single answer rather than a whole family of parallel curves.

## DEFINITION
Integration is the inverse process of differentiation; if $\frac{d}{dx}[F(x)] = f(x)$, then the indefinite integral of $f(x)$ with respect to $x$ is $F(x) + C$, where $C$ is an arbitrary constant representing the family of all antiderivatives. The definite integral $\int_a^b f(x)dx$ represents the net signed area bounded by the curve $y=f(x)$, the x-axis, and the ordinates $x=a$ and $x=b$, and evaluates to a unique number $F(b)-F(a)$ by the Fundamental Theorem of Calculus.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to (1) distinguish between indefinite and definite integrals and explain the geometric meaning of each, (2) correctly write the $+C$ for indefinite integrals and justify its necessity using the constant-multiple rule of differentiation, and (3) set up the definite integral for a given area/business problem (consumer/producer surplus) with correct limits and integrand.

## SCOPE_BOUNDARY
This node introduces the core concept of integration as anti-differentiation, the notation $\int f(x)dx$, the geometrical interpretation as a family of curves, standard integral formulas derived from derivative rules, and the definition of definite integral as a limit of area. It does NOT cover techniques of integration (substitution, partial fractions, by parts), properties of definite integrals, or consumer/producer surplus calculations — those are covered in subsequent nodes c12_app_cbse_04_003 through c12_app_cbse_04_008.

## WALKTHROUGH
Start with a real-world question: "A company's marginal revenue is $MR = 80 + 20x + 3x^2$. If revenue at 2 units is ₹240, what is the total revenue function?" This mirrors Example 2 in NCERT. Students already know differentiation from Class 11 (c11_app_cbse_08_008); now we reverse it. Step 1: Recognize $MR = \frac{dR}{dx}$. Step 2: Integrate term-by-term using power rule $\int x^n dx = \frac{x^{n+1}}{n+1} + C$. Step 3: Use the condition $R(2)=240$ to solve for $C$. Step 4: Interpret $C=32$ as the fixed revenue component (e.g., licensing fee). Key insight: Integration recovers the original function up to an additive constant, and initial/boundary conditions pin down that constant.

Takeaway: mastery means indefinite and definite integrals distinguished and conditions used to pin the constant. Exam moves: distinction questions contrast the family-plus-C with the single number between limits; computation questions integrate term by term and solve for the constant from a given value; setup questions translate a business condition into limits and integrand. Method: the condition is the detective — revenue known at one quantity pins the constant exactly. Drill: one marginal revenue, one known revenue point, one licensing fee. The arbitrary constant was never arbitrary once business spoke. Pair every indefinite exercise with a definite one on the same integrand, and the contrast — a family versus a number, a constant kept versus a constant cancelled — becomes visible in a single page of working.

## DIAGNOSTIC_QUESTION_1
If $\frac{d}{dx}(x^3 + 5x^2 - 7x + 12) = 3x^2 + 10x - 7$, write the indefinite integral $\int (3x^2 + 10x - 7) dx$ and explain why the answer is not simply $x^3 + 5x^2 - 7x$.

## DIAGNOSTIC_ANSWER_1
Correct answer: $\int (3x^2 + 10x - 7) dx = x^3 + 5x^2 - 7x + C$. The $+C$ is mandatory because the derivative of any constant is zero; thus $x^3 + 5x^2 - 7x + 12$, $x^3 + 5x^2 - 7x - 5$, and infinitely many other functions all have the same derivative $3x^2 + 10x - 7$. A student who omits $+C$ treats the antiderivative as unique, confusing the indefinite integral (family of curves) with a particular integral (one specific curve). This error costs 1 mark in CBSE board marking scheme and leads to wrong particular solutions in differential equations later.

## DIAGNOSTIC_QUESTION_2
A student writes: $\int \frac{1}{x} dx = \ln x + C$. Is this correct for all $x$ in the domain of the integrand? If not, correct it and explain why the correction is necessary using the derivative definition.

## DIAGNOSTIC_ANSWER_2
Correct answer: $\int \frac{1}{x} dx = \ln|x| + C$. The integrand $\frac{1}{x}$ is defined for $x \neq 0$ (both positive and negative), but $\ln x$ is only defined for $x > 0$. For $x < 0$, let $x = -u (u>0)$; then $\frac{d}{dx}\ln|x| = \frac{d}{dx}\ln(-x) = \frac{1}{-x} \cdot (-1) = \frac{1}{x}$. A student who writes $\ln x + C$ ignores the negative domain, a classic board exam error that also breaks substitution methods later (e.g., $\int \frac{2x}{x^2-1}dx$ where $x^2-1$ can be negative). NCERT explicitly proves the absolute value case on page 3b.5.

## DIAGNOSTIC_QUESTION_3
The marginal cost of producing $x$ units is $MC = 10 + 0.5x$. Fixed costs are ₹500. Find the total cost function $C(x)$ and the cost of producing 20 units.

## DIAGNOSTIC_ANSWER_3
Step 1: $C(x) = \int MC \, dx = \int (10 + 0.5x) dx = 10x + 0.25x^2 + C$. Step 2: Fixed cost = $C(0) = 500 \Rightarrow C = 500$. So $C(x) = 10x + 0.25x^2 + 500$. Step 3: $C(20) = 10(20) + 0.25(400) + 500 = 200 + 100 + 500 = ₹800$. A student who forgets to use the fixed cost condition to find $C$ leaves the answer as $10x + 0.25x^2 + C$, losing the "particular integral" mark. Another common error: integrating $0.5x$ as $0.5x^2$ instead of $0.25x^2$ (forgetting to divide by new power 2).

## DIAGNOSTIC_QUESTION_4
Compare the geometrical meaning of $\int_0^2 (x^2) dx$ and $\int (x^2) dx$. Sketch rough graphs to illustrate the difference between "a number" and "a family of curves."

## DIAGNOSTIC_ANSWER_4
$\int_0^2 x^2 dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3}$ is a single number: the net area under $y=x^2$ from $x=0$ to $x=2$. $\int x^2 dx = \frac{x^3}{3} + C$ is a family of cubic curves $y = \frac{x^3}{3} + C$; each value of $C$ shifts the curve vertically. The definite integral equals the difference in $y$-values of any two members of this family at $x=2$ and $x=0$. A student who confuses them might try to "evaluate" an indefinite integral at limits or add $+C$ to a definite integral. In competitive exams like JEE, this distinction is tested via "area under curve" vs "find the curve given slope" problems.

## DIAGNOSTIC_QUESTION_5
A student claims: "Since $\int e^x dx = e^x + C$ and $\int e^{-x} dx = -e^{-x} + C$, then $\int e^{2x} dx$ should be $e^{2x} + C$ by the same pattern." Evaluate this claim and provide the correct integral with justification.

## DIAGNOSTIC_ANSWER_5
The claim is false. The pattern $\int e^{kx} dx = \frac{1}{k}e^{kx} + C$ comes from the chain rule: $\frac{d}{dx}e^{kx} = k e^{kx}$. For $k=2$, $\int e^{2x} dx = \frac{1}{2}e^{2x} + C$. The student incorrectly assumes the derivative of $e^{2x}$ is $e^{2x}$ (forgetting the inner derivative 2). This is a high-frequency error in both board exams (1-mark MCQ) and JEE (where $\int e^{ax+b} dx$ appears in substitution problems). The correct reasoning: differentiate $\frac{1}{2}e^{2x}$ to get $\frac{1}{2} \cdot 2 e^{2x} = e^{2x}$, verifying the integral.

## DIAGNOSTIC_QUESTION_6
Create a real-world business scenario (Indian context) where a company knows its marginal profit function $MP(x)$ and needs to find the total profit function $P(x)$. Specify $MP(x)$, an initial condition, and ask for $P(x)$ and the breakeven quantity. Solve your own problem.

## DIAGNOSTIC_ANSWER_6
Scenario: A Delhi-based startup sells eco-friendly notebooks. Marginal profit (in ₹) is $MP(x) = 50 - 2x$, where $x$ is thousands of notebooks sold. Initial loss (setup costs) at $x=0$ is ₹20,000, so $P(0) = -20$. Find $P(x)$ and breakeven $x$.
Solution: $P(x) = \int (50 - 2x) dx = 50x - x^2 + C$. $P(0) = C = -20 \Rightarrow P(x) = 50x - x^2 - 20$. Breakeven: $50x - x^2 - 20 = 0 \Rightarrow x^2 - 50x + 20 = 0 \Rightarrow x = \frac{50 \pm \sqrt{2500 - 80}}{2} \approx 0.4$ or $49.6$ thousand units. A good answer includes correct integration, use of initial condition, quadratic solution, and interpretation (breakeven at ~400 and ~49,600 units). A poor answer forgets $C$, misinterprets negative profit, or solves quadratic incorrectly.

## COMMON_MISCONCEPTION
**Misconception:** "The indefinite integral $\int f(x)dx$ is just the area under the curve from 0 to $x$." 
**Why it's wrong:** Students confuse the indefinite integral (a family of functions $F(x)+C$) with the area function $A(x) = \int_0^x f(t)dt$, which is *one specific* antiderivative with $A(0)=0$. The indefinite integral has an arbitrary $C$; the area function has $C$ fixed by the lower limit. For example, $\int 2x dx = x^2 + C$, but the area from 0 to $x$ is exactly $x^2$ (so $C=0$). If the lower limit were 1, the area function would be $x^2 - 1$ ($C=-1$). This confusion causes errors in applying the Fundamental Theorem: students write $\int_a^b f(x)dx = F(b) - F(a) + C$ (adding $C$ to a definite integral) or fail to see that *any* antiderivative works for definite integrals because $C$ cancels out.

## ON_FAILURE
1. Revisit Class 11 differentiation rules (c11_app_cbse_08_008, c11_app_cbse_08_009): verify $\frac{d}{dx}(x^n) = nx^{n-1}$, $\frac{d}{dx}e^x = e^x$, $\frac{d}{dx}\ln x = 1/x$ by deriving them from first principles or known limits.
2. Practice "reverse differentiation" drills: given $f(x)$, find $F(x)$ such that $F'(x)=f(x)$, then check by differentiating back. Do 10 problems each for polynomials, exponentials, and logarithms.
3. Graph 3 members of the family $y = \int 2x dx = x^2 + C$ for $C = -2, 0, 3$ on the same axes. Observe vertical shifts. Then compute $\int_1^3 2x dx$ using each antiderivative: $(3^2+C) - (1^2+C) = 8$ always. This visual+algebraic proof cements why $C$ vanishes in definite integrals.
4. Re-attempt Diagnostic Questions 1–5 after 24 hours.

## PREREQUISITE_NODE_IDS
c11_app_cbse_08_008, c11_app_cbse_08_009, c11_app_cbse_11_001

## PREREQUISITE_REASONS
c11_app_cbse_08_008: Instantaneous rate of change and derivative — integration is defined as the inverse of differentiation; students must fluently recall derivative rules to "reverse" them.
c11_app_cbse_08_009: Derivatives of algebraic functions using chain rule — needed to understand why $\int e^{ax+b} dx = \frac{1}{a}e^{ax+b}+C$ (chain rule in reverse) and to later apply substitution method.
c11_app_cbse_11_001: Financial Mathematics — provides context of marginal cost/revenue, fixed cost, total cost/revenue functions used in Examples 2, 6, and business applications in this chapter.

## FORWARD_NODE_IDS
c12_app_cbse_04_003, c12_app_cbse_04_004, c12_app_cbse_04_005, c12_app_cbse_04_006, c12_app_cbse_04_007, c12_app_cbse_04_008

## FORWARD_REASONS
c12_app_cbse_04_003: Integration by substitution — builds directly on standard integrals and the chain rule reversal introduced here.
c12_app_cbse_04_004: Integration by partial fractions — requires fluency with basic integrals (log, rational functions) established in this node.
c12_app_cbse_04_005: Integration by parts — uses product rule reversal; needs understanding of indefinite integral notation and $+C$.
c12_app_cbse_04_006: Definite integral — formalizes the area interpretation and Fundamental Theorem stated here.
c12_app_cbse_04_007: Properties of definite integrals — extends definite integral concept with symmetry and limit-change properties.
c12_app_cbse_04_008: Consumer/Producer surplus — applies definite integrals to business economics using demand/supply curves from Class 11 Financial Mathematics.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_008, c11_app_cbse_11_001

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_008: The derivative concept from Class 11 Calculus is the direct foundation; integration is its inverse. The chain rule understanding is critical for substitution method later.
c11_app_cbse_11_001: Financial Mathematics introduces marginal cost, marginal revenue, fixed cost, total cost/revenue — the primary application context for integration in this chapter (Examples 2, 6, 17–20).

## CHAIN_DESCRIPTION
c11_app_cbse_08_008 -> c12_app_cbse_04_002 -> c12_app_cbse_04_003

## THIS_FORMULA
Indefinite Integral: $\int f(x) dx = F(x) + C$ where $\frac{d}{dx}F(x) = f(x)$.
Definite Integral: $\int_a^b f(x) dx = F(b) - F(a)$ where $F$ is any antiderivative of $f$.
Standard Integrals: $\int x^n dx = \frac{x^{n+1}}{n+1} + C (n \neq -1)$, $\int e^x dx = e^x + C$, $\int a^x dx = \frac{a^x}{\ln a} + C$, $\int \frac{1}{x} dx = \ln|x| + C$.

## FORMULA_VARIABLES
$f(x)$: integrand (function being integrated); $x$: variable of integration; $F(x)$: antiderivative/primitive of $f(x)$; $C$: arbitrary constant of integration; $a, b$: lower and upper limits of integration (constants); $n$: real number $\neq -1$; $a$ (in $a^x$): base $> 0, a \neq 1$.

## FORMULA_UNITS
If $x$ is quantity (units) and $f(x)$ is marginal cost (₹/unit), then $\int f(x)dx$ is total cost (₹). Definite integral $\int_a^b f(x)dx$ has units of (integrand units) $\times$ (x units), e.g., (₹/unit) $\times$ units = ₹.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_app_cbse_08_008 | Derivative rules (power, exponential, log, chain) are the "forward" operations that integration reverses; every standard integral formula comes directly from a derivative formula.
c11_app_cbse_11_001 | Marginal analysis (MC, MR) and total functions (C, R) provide the business/economics interpretation: integration accumulates marginal quantities to get totals, with fixed costs as the constant of integration.

## PREREQ_CONCEPT
Fluency with differentiation rules (power rule, exponential, logarithmic, chain rule) from Class 11 Calculus.

## PREREQ_BEFORE
Student must be able to differentiate $x^n$, $e^x$, $a^x$, $\ln x$, and composite functions like $e^{2x+3}$ or $\ln(x^2+1)$ correctly and quickly.

## PREREQ_STUCK
If stuck, review Class 11 derivative formulas (c11_app_cbse_08_008, c11_app_cbse_08_009) and practice "differentiate then integrate back" cycles until they are inverse operations in your mind.

## WORKED_EXAMPLE_1
PROBLEM: A company's marginal revenue function is $MR(x) = 100 - 4x + 0.5x^2$ (in ₹ per unit). If the revenue from selling 0 units is ₹0 (no fixed revenue), find the total revenue function $R(x)$ and the revenue from selling 10 units.
STEPS:
- Step 1: Recognize that marginal revenue is the derivative of total revenue: $MR(x) = \frac{dR}{dx}$.
- Step 2: Integrate $MR(x)$ term by term using the power rule $\int x^n dx = \frac{x^{n+1}}{n+1} + C$: $R(x) = \int (100 - 4x + 0.5x^2) dx = 100x - 2x^2 + \frac{0.5}{3}x^3 + C = 100x - 2x^2 + \frac{x^3}{6} + C$.
- Step 3: Apply the initial condition $R(0) = 0$: $0 = 0 - 0 + 0 + C \Rightarrow C = 0$.
- Step 4: Write the particular total revenue function: $R(x) = 100x - 2x^2 + \frac{x^3}{6}$.
- Step 5: Evaluate $R(10) = 100(10) - 2(100) + \frac{1000}{6} = 1000 - 200 + 166.67 = ₹966.67$.
REASONING: Integration recovers the total function from its marginal (derivative). The constant $C$ represents fixed revenue (e.g., licensing, franchise fee), which is zero here. Each term is integrated independently using the reverse power rule.
ANSWER: $R(x) = 100x - 2x^2 + \frac{x^3}{6}$; $R(10) = ₹966.67$.

## WORKED_EXAMPLE_2
PROBLEM: Find the indefinite integral $\int \left( 3e^{2x} + \frac{5}{x} - 4x^3 + 7 \right) dx$ and verify your answer by differentiation.
STEPS:
- Step 1: Split the integral using linearity: $\int 3e^{2x} dx + \int \frac{5}{x} dx - \int 4x^3 dx + \int 7 dx$.
- Step 2: Apply standard formulas: $\int e^{ax} dx = \frac{1}{a}e^{ax} + C$, $\int \frac{1}{x} dx = \ln|x| + C$, $\int x^n dx = \frac{x^{n+1}}{n+1} + C$, $\int k dx = kx + C$.
- Step 3: Compute each term: $\int 3e^{2x} dx = 3 \cdot \frac{1}{2}e^{2x} = \frac{3}{2}e^{2x}$; $\int \frac{5}{x} dx = 5\ln|x|$; $\int -4x^3 dx = -x^4$; $\int 7 dx = 7x$.
- Step 4: Combine and add single $+C$: $\frac{3}{2}e^{2x} + 5\ln|x| - x^4 + 7x + C$.
- Step 5: Verify by differentiating: $\frac{d}{dx}\left(\frac{3}{2}e^{2x} + 5\ln|x| - x^4 + 7x + C\right) = 3e^{2x} + \frac{5}{x} - 4x^3 + 7$, matching the integrand.
REASONING: Linearity of integration allows term-by-term integration. The chain rule reversal for $e^{2x}$ introduces factor $1/2$. Absolute value in $\ln|x|$ ensures domain matches $1/x$ ($x \neq 0$). Verification by differentiation is the ultimate check.
ANSWER: $\frac{3}{2}e^{2x} + 5\ln|x| - x^4 + 7x + C$.

## WORKED_EXAMPLE_3
PROBLEM: The marginal cost of producing $x$ kg of organic mangoes is $MC(x) = 20 + 0.1\sqrt{x}$ (₹/kg). Fixed costs (land lease, equipment) are ₹10,000. Find the total cost function $C(x)$, the average cost function $AC(x)$, and the production level where average cost is minimized.
STEPS:
- Step 1: Integrate $MC(x)$ to get $C(x)$: $C(x) = \int (20 + 0.1x^{1/2}) dx = 20x + 0.1 \cdot \frac{x^{3/2}}{3/2} + C = 20x + \frac{0.2}{3}x^{3/2} + C = 20x + \frac{1}{15}x^{3/2} + C$.
- Step 2: Use fixed cost $C(0) = 10000 \Rightarrow C = 10000$. So $C(x) = 20x + \frac{1}{15}x^{3/2} + 10000$.
- Step 3: Average cost $AC(x) = \frac{C(x)}{x} = 20 + \frac{1}{15}x^{1/2} + \frac{10000}{x}$ for $x > 0$.
- Step 4: Minimize $AC(x)$: differentiate $AC'(x) = \frac{1}{30}x^{-1/2} - \frac{10000}{x^2}$. Set $AC'(x) = 0$: $\frac{1}{30\sqrt{x}} = \frac{10000}{x^2} \Rightarrow x^2 = 300,000\sqrt{x} \Rightarrow x^{3/2} = 300,000 \Rightarrow x = (300,000)^{2/3} = (3 \times 10^5)^{2/3} = 3^{2/3} \times 10^{10/3} \approx 2.08 \times 10^3 \approx 2080$ kg.
- Step 5: Verify minimum: $AC''(x) = -\frac{1}{60}x^{-3/2} + \frac{20000}{x^3} > 0$ for $x \approx 2080$ (since second term dominates), confirming minimum.
- Step 6: Minimum average cost $AC(2080) \approx 20 + \frac{1}{15}\sqrt{2080} + \frac{10000}{2080} \approx 20 + 3.04 + 4.81 = ₹27.85$/kg.
REASONING: This combines integration (total from marginal), function construction (average cost), and calculus optimization (minimizing average cost) — a typical board + JEE multi-concept problem. The fixed cost becomes the integration constant. Minimizing average cost uses derivative of a quotient, connecting back to Class 11 differentiation.
ANSWER: $C(x) = 20x + \frac{1}{15}x^{3/2} + 10000$; $AC(x) = 20 + \frac{1}{15}\sqrt{x} + \frac{10000}{x}$; minimum at $x \approx 2080$ kg with $AC_{min} \approx ₹27.85$/kg.

## COMPETENCY_QUESTION_1
QUESTION: A student argues: "Since $\int_0^2 x^2 dx = \frac{8}{3}$ and $\int_0^2 2x dx = 4$, then $\int_0^2 (x^2 + 2x) dx$ should be $\frac{8}{3} + 4 = \frac{20}{3}$." Is the student's reasoning correct? Justify your answer using the properties of definite integrals, and explain whether the same logic applies to indefinite integrals $\int (x^2 + 2x) dx$.
COMPETENCY: Conceptual Understanding & Property Application
STEPS:
- Step 1: Recall the linearity property of definite integrals: $\int_a^b [f(x) + g(x)] dx = \int_a^b f(x) dx + \int_a^b g(x) dx$.
- Step 2: Verify the student's computation: $\int_0^2 x^2 dx = [x^3/3]_0^2 = 8/3$; $\int_0^2 2x dx = [x^2]_0^2 = 4$; sum = $8/3 + 12/3 = 20/3$.
- Step 3: Directly compute $\int_0^2 (x^2 + 2x) dx = [x^3/3 + x^2]_0^2 = 8/3 + 4 = 20/3$. Results match.
- Step 4: For indefinite integrals: $\int (x^2 + 2x) dx = \int x^2 dx + \int 2x dx = x^3/3 + x^2 + C_1 + C_2 = x^3/3 + x^2 + C$. The same linearity holds, but only one $+C$ is written for the sum.
- Step 5: Conclude: Student's reasoning is correct for both definite and indefinite integrals due to linearity of integration (which comes from linearity of differentiation).
ANSWER: Yes, the student is correct. Definite integrals are linear: $\int_a^b (f+g) = \int_a^b f + \int_a^b g$. Indefinite integrals are also linear: $\int (f+g) = \int f + \int g$, with a single combined constant $C$. This property is derived from $\frac{d}{dx}[F(x)+G(x)] = f(x)+g(x)$.
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: The demand function for a product is $p = 100 - x - x^2$ (price $p$ in ₹, quantity $x$ in units). The supply function is $p = 10 + 2x + x^2$. Find the equilibrium price and quantity. Then calculate the consumer's surplus and producer's surplus at equilibrium. Interpret the economic meaning of each surplus.
COMPETENCY: Problem Solving & Mathematical Modeling (multi-concept: integration, quadratic equations, area interpretation, economics)
STEPS:
- Step 1: Find equilibrium by setting demand = supply: $100 - x - x^2 = 10 + 2x + x^2 \Rightarrow 2x^2 + 3x - 90 = 0 \Rightarrow (2x+15)(x-6) = 0 \Rightarrow x = 6$ (reject negative). Equilibrium quantity $x_0 = 6$.
- Step 2: Equilibrium price $p_0 = 100 - 6 - 36 = 58$ (or $10 + 12 + 36 = 58$).
- Step 3: Consumer's Surplus $CS = \int_0^{x_0} (demand) dx - p_0 x_0 = \int_0^6 (100 - x - x^2) dx - 58 \times 6$.
- Step 4: Compute $\int_0^6 (100 - x - x^2) dx = [100x - x^2/2 - x^3/3]_0^6 = 600 - 18 - 72 = 510$. $CS = 510 - 348 = 162$.
- Step 5: Producer's Surplus $PS = p_0 x_0 - \int_0^{x_0} (supply) dx = 348 - \int_0^6 (10 + 2x + x^2) dx$.
- Step 6: Compute $\int_0^6 (10 + 2x + x^2) dx = [10x + x^2 + x^3/3]_0^6 = 60 + 36 + 72 = 168$. $PS = 348 - 168 = 180$.
- Step 7: Interpretation: CS = ₹162 is the total gain to consumers who were willing to pay more than ₹58 but only paid ₹58. PS = ₹180 is the total gain to producers who were willing to supply at less than ₹58 but received ₹58.
ANSWER: Equilibrium: $x_0 = 6$ units, $p_0 = ₹58$. Consumer's Surplus = ₹162. Producer's Surplus = ₹180.
DIFFICULTY: medium