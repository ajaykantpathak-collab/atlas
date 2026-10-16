## ELI5
A bank pays continuous interest while a fixed annual withdrawal drains the account: dP by dt equals nought point zero five P minus five hundred - the dependent variable and its derivative appearing only to the first power, never multiplied. That is a first-order linear differential equation. Its universal solvent is the integrating factor, e to the integral of P of x; multiply through, the left side fuses into one derivative, integrate both sides, and the account's balance law emerges.

## DEFINITION
A first-order linear differential equation is an equation of the form \(\frac{dy}{dx} + P(x)y = Q(x)\), where \(P\) and \(Q\) are functions of \(x\) only (or constants). It is called linear because the dependent variable \(y\) and its derivative \(\frac{dy}{dx}\) appear only to the first power and are not multiplied together.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can identify a linear differential equation, compute the integrating factor correctly, set up the solution formula \(y \cdot \text{I.F.} = \int Q \cdot \text{I.F.} \, dx + C\), perform the integration (including by parts if needed), and simplify to obtain the general or particular solution. They can also convert equations of the form \(\frac{dx}{dy} + P_1(y)x = Q_1(y)\) into standard form and solve them.

## SCOPE_BOUNDARY
Covers first-order linear differential equations in the standard form \(\frac{dy}{dx} + Py = Q\) and the symmetric form \(\frac{dx}{dy} + P_1x = Q_1\). Does NOT cover higher-order linear equations, Bernoulli equations, or systems of linear differential equations. All functions \(P, Q\) are assumed continuous on the interval of interest.

## WALKTHROUGH
Imagine you deposit ₹10,000 in a bank that offers 5% continuous interest, but you also withdraw ₹500 every year. The rate of change of your principal \(P\) is \(\frac{dP}{dt} = 0.05P - 500\). This is a linear differential equation because the derivative and the variable appear linearly. To solve it, we first write it as \(\frac{dP}{dt} - 0.05P = -500\). The integrating factor is \(e^{\int -0.05 \, dt} = e^{-0.05t}\). Multiplying both sides by this factor turns the left side into the derivative of \(P e^{-0.05t}\). Integrating both sides gives the amount at any time \(t\). The key insight: multiplying by the integrating factor makes the left-hand side an exact derivative, which we can then integrate directly.

Takeaway first: the integrating factor converts the equation's left side into an exact derivative - that is its entire job - and the solution formula is one integration away. Exam moves: identification questions testing linearity, integrating-factor questions computing e to the integral of P, solution questions running the formula including by-parts integrations, and conversion questions for x-as-function-of-y forms. Method: rerun the account - standardise the equation, compute the factor, multiply, recognise the fused derivative, integrate. Check yourself: the formula's shape is y times I F equals the integral of Q times I F plus C - dividing by the factor rather than multiplying it into the integral is the standard misremembering. Drill: solve one linear equation completely and convert one dy-by-dx-first equation into standard form.

## DIAGNOSTIC_QUESTION_1
State the integrating factor for the differential equation \(\frac{dy}{dx} + \frac{2}{x}y = x^2\) (where \(x > 0\)).

## DIAGNOSTIC_ANSWER_1
The integrating factor is \(e^{\int \frac{2}{x} dx} = e^{2 \ln x} = x^2\). A wrong answer like \(e^{2x}\) or \(2 \ln x\) reveals the student does not know how to integrate \(\frac{2}{x}\) or misapplies the exponential-logarithm relationship.

The integrating factor is e to the integral of P: here that is e to the integral of two over x, which collapses to e to the two log x, which is x squared. **A wrong answer like e to the two x reveals the student has integrated the two over x as if it were the constant two - the logarithm's integral is the whole point of this choice of P.**

## DIAGNOSTIC_QUESTION_2
Explain why the equation \(\frac{dy}{dx} + y^2 = x\) is NOT a linear differential equation, even though it has \(\frac{dy}{dx}\) and \(y\) terms.

## DIAGNOSTIC_ANSWER_2
The term \(y^2\) makes the equation nonlinear because the dependent variable \(y\) appears with power 2. In a linear DE, \(y\) and its derivatives must appear only to the first power and not multiplied together. A student who says "it has \(y^2\) so it's nonlinear" but cannot articulate the exact condition (first power, no products) shows a superficial understanding.

## DIAGNOSTIC_QUESTION_3
Find the general solution of \(\frac{dy}{dx} + y \tan x = \sec x\) for \(0 < x < \frac{\pi}{2}\).

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify \(P = \tan x\), \(Q = \sec x\).  
**Step 2:** Integrating factor \(= e^{\int \tan x \, dx} = e^{\ln \sec x} = \sec x\).  
**Step 3:** Multiply: \(\sec x \frac{dy}{dx} + y \sec x \tan x = \sec^2 x\).  
**Step 4:** Left side is \(\frac{d}{dx}(y \sec x)\). Integrate: \(y \sec x = \int \sec^2 x \, dx = \tan x + C\).  
**Step 5:** \(y = \sin x + C \cos x\).  
A wrong answer like \(y = \tan x + C\) reveals the student forgot to divide by the integrating factor after integration.

## DIAGNOSTIC_QUESTION_4
Compare the solution processes for \(\frac{dy}{dx} + Py = Q\) and \(\frac{dx}{dy} + P_1x = Q_1\). What is the structural similarity and the key difference in the formula?

## DIAGNOSTIC_ANSWER_4
Both use an integrating factor: for the first, \(\text{I.F.} = e^{\int P \, dx}\) and solution is \(y \cdot \text{I.F.} = \int Q \cdot \text{I.F.} \, dx + C\); for the second, \(\text{I.F.} = e^{\int P_1 \, dy}\) and solution is \(x \cdot \text{I.F.} = \int Q_1 \cdot \text{I.F.} \, dy + C\). The similarity is the method; the difference is the variable of integration and which variable is treated as dependent. A student who writes the same formula for both (e.g., always integrating with respect to \(x\)) shows they haven't grasped the role reversal.

## DIAGNOSTIC_QUESTION_5
A student solves \(\frac{dy}{dx} + \frac{y}{x} = x\) and writes: \(\text{I.F.} = e^{\int \frac{1}{x} dx} = e^{\ln x} = x\). Then \(y \cdot x = \int x \cdot x \, dx = \frac{x^3}{3} + C\), so \(y = \frac{x^2}{3} + C\). Is this correct? If not, identify the error.

## DIAGNOSTIC_ANSWER_5
The solution is incorrect. The error is in the final step: \(y = \frac{x^2}{3} + \frac{C}{x}\), not \(y = \frac{x^2}{3} + C\). The constant \(C\) must also be divided by the integrating factor \(x\). A student who misses this reveals they treat the constant as an additive term after division, not understanding that the constant comes from the indefinite integral before dividing by I.F.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (in Indian context) that leads to a linear differential equation of the form \(\frac{dy}{dx} + Py = Q\) with \(P\) and \(Q\) as non-constant functions of \(x\). Write the differential equation and define all variables.

## DIAGNOSTIC_ANSWER_6
Example: A cylindrical water tank of cross-sectional area \(A = 2 \, \text{m}^2\) has water flowing in at a rate of \(10 \, \text{m}^3/\text{h}\) and leaking out through a hole at a rate proportional to the square root of the water height \(h\). However, to keep it linear, assume the leak rate is proportional to \(h\) (e.g., viscous flow). Let \(h(t)\) be height in metres at time \(t\) hours. Inflow rate = \(10/A = 5 \, \text{m/h}\). Outflow rate = \(k h\) with \(k = 0.2 \, \text{h}^{-1}\). Then \(\frac{dh}{dt} = 5 - 0.2h\) or \(\frac{dh}{dt} + 0.2h = 5\). Here \(P = 0.2\), \(Q = 5\) (constants). For non-constant \(P, Q\): Suppose the inflow rate varies as \(10 + 2t\) and the leak coefficient varies as \(0.1 + 0.05t\). Then \(\frac{dh}{dt} + (0.1+0.05t)h = 5 + t\). A poor answer gives constant \(P, Q\) or a nonlinear equation, showing the student cannot translate a varying-rate scenario into the linear form.

## COMMON_MISCONCEPTION
Students often write the solution as \(y = \frac{1}{\text{I.F.}} \int Q \cdot \text{I.F.} \, dx + C\) instead of \(y = \frac{1}{\text{I.F.}} \left( \int Q \cdot \text{I.F.} \, dx + C \right)\). They place the constant \(C\) outside the division by the integrating factor. For example, in \(\frac{dy}{dx} + \frac{y}{x} = x\), they get \(y = \frac{x^2}{3} + C\) instead of \(y = \frac{x^2}{3} + \frac{C}{x}\). This happens because they treat the constant of integration as an additive term after multiplying by the reciprocal of I.F., forgetting that the constant arises from the indefinite integral *before* dividing by I.F.

## ON_FAILURE
1. Re-derive the integrating factor method from scratch: start with \(\frac{dy}{dx} + Py = Q\), multiply by unknown \(g(x)\), set \(g' = Pg\) to get \(g = e^{\int P dx}\).  
2. Show that \(\frac{d}{dx}(y g) = Q g\) leads to \(y g = \int Q g \, dx + C\). Emphasize that \(C\) is added *inside* the expression before dividing by \(g\).  
3. Practice two problems where \(P\) is a function of \(x\) (e.g., \(\frac{dy}{dx} + \frac{2}{x}y = x^3\)) and explicitly write the step \(y \cdot \text{I.F.} = \int Q \cdot \text{I.F.} \, dx + C\) before dividing.  
4. Use the diagnostic question 5 as a checkpoint: if the student still writes \(y = \frac{x^2}{3} + C\), have them substitute back into the original DE to see it fails unless \(C=0\).

## PREREQUISITE_NODE_IDS
c12_math_cbse_09_001, c12_math_cbse_09_003, c12_math_cbse_09_005, c11_math_cbse_13_007, c11_math_cbse_13_009, c12_math_cbse_09_002, c12_math_cbse_09_004, c12_math_cbse_09_006

## PREREQUISITE_REASONS
c12_math_cbse_09_001: Need to know what a differential equation is and its order/degree to recognise first-order linear type.
c12_math_cbse_09_003: Understanding general vs particular solutions is essential because the linear DE method yields a general solution with an arbitrary constant.
c12_math_cbse_09_005: Variable separable method builds the intuition of separating variables and integrating; the integrating factor method extends this idea.
c11_math_cbse_13_007: Derivative of polynomial functions — required to differentiate the integrating factor and verify the product rule step.
c11_math_cbse_13_009: Algebra of derivatives (product rule) — crucial to understand why multiplying by I.F. makes the LHS an exact derivative.
c12_math_cbse_09_002: Linear DEs (dy/dx + Py = Q) are first order first degree — degree identification confirms applicability.  
c12_math_cbse_09_004: Linear DEs \(\frac{dy}{dx}+Py=Q\) are solved using integrating factor; their general solutions have one constant.  
c12_math_cbse_09_006: Linear differential equations \(\frac{dy}{dx} + Py = Q\) are the next standard solution method; many problems require identifying whether a DE is homogeneous or linear (or both) to choose the appropriate technique.  

## FORWARD_NODE_IDS
c12_math_cbse_09_008
## FORWARD_REASONS
c12_math_cbse_09_008: Exact differential equations generalise the idea of an integrating factor; the linear DE method is a special case where the integrating factor depends only on one variable.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_08_010, c11_stat_cbse_08_005
## CROSS_SUBJECT_REASONS
c11_stat_cbse_08_010: Inflation rate calculation uses continuous growth models, which are described by linear differential equations (e.g., \(\frac{dP}{dt} = rP\)).
c11_stat_cbse_08_005: Laspeyre's price index involves weighted averages of price relatives; continuous-time analogues lead to linear differential equations in economic dynamics.

## CHAIN_DESCRIPTION
c12_math_cbse_09_001 -> c12_math_cbse_09_007 -> c12_math_cbse_09_008

## THIS_FORMULA
\(\frac{dy}{dx} + P(x)y = Q(x)\); Integrating Factor \(\text{I.F.} = e^{\int P(x) \, dx}\); General solution: \(y \cdot \text{I.F.} = \int Q(x) \cdot \text{I.F.} \, dx + C\)

## FORMULA_VARIABLES
\(y\) = dependent variable, \(x\) = independent variable, \(P(x)\) = coefficient function of \(x\), \(Q(x)\) = forcing function of \(x\), \(\text{I.F.}\) = integrating factor, \(C\) = arbitrary constant.

## FORMULA_UNITS
Dimensionless (pure mathematical equation). If \(x\) is time (seconds), \(y\) is distance (metres), then \(P\) has units \(\text{s}^{-1}\) and \(Q\) has units \(\text{m/s}\).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_stat_cbse_08_010 | Linear differential equations model continuous inflation where the rate of price change is proportional to the current price plus external factors.
c11_stat_cbse_08_005 | Index number construction uses weighted averages; continuous-time economic models use linear DEs to describe how indices evolve.
## PREREQ_CONCEPT
Product rule of differentiation and integration of standard functions (especially \(\int \tan x \, dx\), \(\int \cot x \, dx\), \(\int \frac{1}{x} \, dx\)).

## PREREQ_BEFORE
Student must be able to compute integrals like \(\int \tan x \, dx = \ln|\sec x|\) and \(\int \frac{1}{x} \, dx = \ln|x|\) fluently, and apply the product rule \(\frac{d}{dx}(u v) = u'v + uv'\).

## PREREQ_STUCK
If stuck, revisit Class 11 derivative rules (c11_math_cbse_13_009) and integration of trigonometric/logarithmic functions from Class 12 Integral Calculus (not in prior nodes but assumed).

## WORKED_EXAMPLE_1
PROBLEM: A bacteria culture grows at a rate proportional to its current population, but a constant harvesting rate of 100 bacteria per hour is applied. If the initial population is 5000 and the growth constant is 0.1 per hour, find the population after 2 hours. (Use \(e^{0.2} \approx 1.2214\), \(e^{-0.2} \approx 0.8187\)).

STEPS:
- Step 1: Let \(N(t)\) be population at time \(t\) hours. Growth rate = \(0.1 N\), harvesting rate = 100. So \(\frac{dN}{dt} = 0.1N - 100\).
- Step 2: Rewrite as linear DE: \(\frac{dN}{dt} - 0.1N = -100\). Here \(P = -0.1\), \(Q = -100\).
- Step 3: Integrating factor \(\text{I.F.} = e^{\int -0.1 \, dt} = e^{-0.1t}\).
- Step 4: Multiply: \(e^{-0.1t} \frac{dN}{dt} - 0.1 e^{-0.1t} N = -100 e^{-0.1t}\). Left side is \(\frac{d}{dt}(N e^{-0.1t})\).
- Step 5: Integrate: \(N e^{-0.1t} = \int -100 e^{-0.1t} \, dt = \frac{-100}{-0.1} e^{-0.1t} + C = 1000 e^{-0.1t} + C\).
- Step 6: Solve for \(N\): \(N = 1000 + C e^{0.1t}\). Use initial condition \(N(0)=5000\): \(5000 = 1000 + C \Rightarrow C = 4000\).
- Step 7: \(N(t) = 1000 + 4000 e^{0.1t}\). At \(t=2\): \(N(2) = 1000 + 4000 e^{0.2} \approx 1000 + 4000 \times 1.2214 = 1000 + 4885.6 = 5885.6 \approx 5886\) bacteria.

REASONING: The harvesting term makes the equation non-homogeneous. The integrating factor method handles the constant forcing term \(-100\) by integrating it directly. The constant \(C\) is determined from the initial population.

ANSWER: Approximately 5886 bacteria after 2 hours.

## WORKED_EXAMPLE_2
PROBLEM: Solve the differential equation \(\frac{dy}{dx} + \frac{y}{x \ln x} = \frac{1}{x}\) for \(x > 1\), given that \(y = 0\) when \(x = e\).

STEPS:
- Step 1: Identify \(P(x) = \frac{1}{x \ln x}\), \(Q(x) = \frac{1}{x}\).
- Step 2: Compute integrating factor: \(\text{I.F.} = e^{\int \frac{1}{x \ln x} \, dx}\). Let \(u = \ln x\), \(du = \frac{1}{x} dx\). Then \(\int \frac{1}{x \ln x} dx = \int \frac{1}{u} du = \ln|u| = \ln(\ln x)\) (since \(x>1\)). So \(\text{I.F.} = e^{\ln(\ln x)} = \ln x\).
- Step 3: Multiply the DE by \(\ln x\): \(\ln x \frac{dy}{dx} + \frac{y}{x} = \frac{\ln x}{x}\).
- Step 4: Recognise left side as \(\frac{d}{dx}(y \ln x)\). So \(\frac{d}{dx}(y \ln x) = \frac{\ln x}{x}\).
- Step 5: Integrate both sides: \(y \ln x = \int \frac{\ln x}{x} dx\). Use substitution \(u = \ln x\), \(du = \frac{1}{x} dx\): \(\int u \, du = \frac{u^2}{2} = \frac{(\ln x)^2}{2} + C\).
- Step 6: \(y \ln x = \frac{(\ln x)^2}{2} + C \Rightarrow y = \frac{\ln x}{2} + \frac{C}{\ln x}\).
- Step 7: Apply initial condition \(y(e)=0\): \(0 = \frac{\ln e}{2} + \frac{C}{\ln e} = \frac{1}{2} + C \Rightarrow C = -\frac{1}{2}\).
- Step 8: Particular solution: \(y = \frac{\ln x}{2} - \frac{1}{2 \ln x} = \frac{(\ln x)^2 - 1}{2 \ln x}\).

REASONING: The integrating factor involves a logarithmic integral, which simplifies nicely. The integration of \(\frac{\ln x}{x}\) is a standard form. The constant \(C\) is divided by \(\ln x\) because it comes from the integral before dividing by I.F.

ANSWER: \(y = \frac{(\ln x)^2 - 1}{2 \ln x}\).

## WORKED_EXAMPLE_3
PROBLEM: A tank initially contains 100 litres of brine with 20 kg of salt. Brine containing 0.5 kg of salt per litre flows in at 5 L/min. The well-stirred mixture flows out at 3 L/min. Set up and solve the differential equation for the amount of salt \(S(t)\) in the tank at time \(t\) minutes. Find the salt amount when the tank is full (capacity 200 L).

STEPS:
- Step 1: Volume at time \(t\): \(V(t) = 100 + (5-3)t = 100 + 2t\) litres. Tank is full when \(V=200 \Rightarrow 100+2t=200 \Rightarrow t=50\) min.
- Step 2: Rate of salt in = (concentration in) × (flow rate in) = \(0.5 \times 5 = 2.5\) kg/min.
- Step 3: Rate of salt out = (concentration in tank) × (flow rate out) = \(\frac{S(t)}{V(t)} \times 3 = \frac{3S}{100+2t}\) kg/min.
- Step 4: Differential equation: \(\frac{dS}{dt} = 2.5 - \frac{3S}{100+2t}\). Rewrite as \(\frac{dS}{dt} + \frac{3}{100+2t} S = 2.5\).
- Step 5: Simplify \(P(t) = \frac{3}{2(50+t)}\). Integrating factor: \(\text{I.F.} = e^{\int \frac{3}{2(50+t)} dt} = e^{\frac{3}{2} \ln(50+t)} = (50+t)^{3/2}\).
- Step 6: Multiply: \((50+t)^{3/2} \frac{dS}{dt} + \frac{3}{2}(50+t)^{1/2} S = 2.5 (50+t)^{3/2}\). Left side is \(\frac{d}{dt}[S (50+t)^{3/2}]\).
- Step 7: Integrate: \(S (50+t)^{3/2} = \int 2.5 (50+t)^{3/2} dt = 2.5 \cdot \frac{2}{5} (50+t)^{5/2} + C = (50+t)^{5/2} + C\).
- Step 8: \(S(t) = (50+t) + C (50+t)^{-3/2}\). Initial condition: \(S(0)=20\): \(20 = 50 + C (50)^{-3/2} \Rightarrow C = -30 \times 50^{3/2} = -30 \times 50\sqrt{50} = -1500\sqrt{50}\).
- Step 9: At \(t=50\): \(S(50) = 100 + C (100)^{-3/2} = 100 - 1500\sqrt{50} \times \frac{1}{1000} = 100 - 1.5 \sqrt{50} = 100 - 1.5 \times 7.071 = 100 - 10.6065 = 89.3935\) kg.

REASONING: This is a classic mixing problem leading to a linear DE with variable coefficients. The integrating factor is a power function. The constant \(C\) is determined from the initial salt amount. The volume changes linearly, so the coefficient of \(S\) is a rational function.

ANSWER: Approximately 89.39 kg of salt when the tank is full.

## COMPETENCY_QUESTION_1
QUESTION: A student claims that the differential equation \(\frac{dy}{dx} + \frac{y}{x} = x^2\) can be solved by separating variables as \(\frac{dy}{y} = (x^2 - \frac{1}{x}) dx\). Is the student correct? Justify your answer and solve the equation correctly.

COMPETENCY: Error identification and correction
STEPS:
- Step 1: Recognize that the equation is linear, not separable, because the term \(\frac{y}{x}\) couples \(y\) and \(x\) additively, not multiplicatively.
- Step 2: Attempt to separate: \(\frac{dy}{dx} = x^2 - \frac{y}{x}\). The right side cannot be written as \(f(x)g(y)\).
- Step 3: Apply integrating factor method: \(P = \frac{1}{x}\), \(\text{I.F.} = e^{\int \frac{1}{x} dx} = x\).
- Step 4: \(y \cdot x = \int x \cdot x^2 dx = \int x^3 dx = \frac{x^4}{4} + C\).
- Step 5: \(y = \frac{x^3}{4} + \frac{C}{x}\).
ANSWER: The student is incorrect. The equation is not separable. The correct general solution is \(y = \frac{x^3}{4} + \frac{C}{x}\).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The differential equation \(\frac{dx}{dy} + \frac{x}{y} = y^2\) describes a curve passing through \((1,1)\). Find the equation of the curve. Also, explain why we cannot directly use the formula for \(\frac{dy}{dx} + Py = Q\) without modification.

COMPETENCY: Translating real-world situations to mathematical expressions (and comparing methods)
STEPS:
- Step 1: Identify the dependent variable is \(x\), independent is \(y\). The equation is linear in \(x\): \(\frac{dx}{dy} + \frac{1}{y} x = y^2\).
- Step 2: Integrating factor with respect to \(y\): \(\text{I.F.} = e^{\int \frac{1}{y} dy} = y\).
- Step 3: Solution: \(x \cdot y = \int y \cdot y^2 dy = \int y^3 dy = \frac{y^4}{4} + C\).
- Step 4: \(x = \frac{y^3}{4} + \frac{C}{y}\).
- Step 5: Use point \((1,1)\): \(1 = \frac{1}{4} + C \Rightarrow C = \frac{3}{4}\).
- Step 6: Equation: \(x = \frac{y^3}{4} + \frac{3}{4y}\) or \(4xy = y^4 + 3\).
- Step 7: Explanation: The formula \(y \cdot \text{I.F.} = \int Q \cdot \text{I.F.} dx + C\) assumes \(y\) is dependent and \(x\) independent. Here roles are reversed, so we must integrate with respect to \(y\) and the I.F. is a function of \(y\).
ANSWER: The curve is \(4xy = y^4 + 3\). The standard formula applies only when the derivative is \(\frac{dy}{dx}\); for \(\frac{dx}{dy}\) we swap the roles of \(x\) and \(y\) in the integrating factor and integration variable.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you deposit ₹10,000 in a bank that offers 5% ______ interest, but you also withdraw ₹500 every year.

## DIAGNOSTIC_ANSWER_7
continuous

Continuous is the interest's accrual mode: the rate depends on the current balance at every instant, which is what writes the derivative into the equation. **A wrong answer (a simple word) reveals the student has switched to yearly interest and erased the differential equation the walkthrough exists to solve.**
