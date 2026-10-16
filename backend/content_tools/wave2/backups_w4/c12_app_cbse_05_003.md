## ELI5
Think of a differential equation like a recipe that tells you how fast something is changing — like how quickly your savings grow with interest, or how fast a hot cup of chai cools down. The **order** is simply the "highest level of change" mentioned in that recipe. If the recipe only talks about the rate of change (first derivative), it's order 1. If it talks about the rate of change of the rate of change (second derivative), it's order 2 — like acceleration is the rate of change of velocity. **Most common mix-up**: Students confuse "order" with the power (exponent) of the derivative — that's actually the **degree**, which comes later.

## DEFINITION
The order of a differential equation is the order of the highest-order derivative of the dependent variable with respect to the independent variable that appears in the equation. It is always a positive integer (1, 2, 3, …).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly identify the order of any given ordinary differential equation by locating the highest derivative present, regardless of the equation's complexity, presence of parameters, or whether the degree is defined. The student can also explain why the order is always defined for any differential equation, unlike the degree.

## SCOPE_BOUNDARY
This node covers **only** the definition, identification, and interpretation of the order of an ordinary differential equation. It includes worked examples with algebraic, trigonometric, exponential, and logarithmic functions. It does **not** cover degree of a differential equation (next node), general/particular solutions, formation of differential equations, or solution methods.

## WALKTHROUGH
Imagine you're analyzing the motion of a toy car on a track. You have an equation that relates its position, velocity, and acceleration. To understand the complexity of this motion model, the very first question you ask is: "What is the highest derivative here?" That question — "what's the highest level of change?" — is exactly what **order** answers. We'll start by scanning equations like a detective looking for the highest derivative notation: \( \frac{dy}{dx} \), \( \frac{d^2y}{dx^2} \), \( \frac{d^3y}{dx^3} \), etc. The key insight: **order is purely about the derivative's order (the number of times you differentiated), never about powers, coefficients, or whether the equation is polynomial in derivatives**. That last part is degree's job.

Takeaway: mastery means the highest derivative spotted through any disguise of coefficients and parameters. Exam moves: identification questions scan increasingly decorated equations for the top derivative; explanation questions justify why order is always defined while degree may not be; trap questions include squares and sines of lower derivatives to tempt misreads. Method: cover every term except the derivative notations and ask which is most differentiated — the equation's decoration is irrelevant to the count. Drill: three decorated equations, one scan each, one order apiece. Powers belong to degree; altitude belongs to order — never let the exponent impersonate the height.

## DIAGNOSTIC_QUESTION_1
What is the order of the differential equation \( \frac{d^3y}{dx^3} + 2\frac{d^2y}{dx^2} - 5\frac{dy}{dx} + 6y = e^x \)?

## DIAGNOSTIC_ANSWER_1
The order is 3 because the highest derivative present is \( \frac{d^3y}{dx^3} \) (third derivative). A wrong answer like 1 or 2 reveals the student is either looking at the first derivative only, or confusing order with the number of terms, or mistakenly thinking the order is the power of the highest derivative (which would be degree, not order).

## DIAGNOSTIC_QUESTION_2
A student claims: "The differential equation \( \left(\frac{d^2y}{dx^2}\right)^3 + \frac{dy}{dx} = \sin x \) has order 3 because the second derivative is cubed." Is the student correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
The student is **incorrect**. The order is 2, not 3. The order is determined solely by the **highest derivative** (\( \frac{d^2y}{dx^2} \)), which is of order 2. The exponent 3 is the **power** of that derivative, which relates to **degree** (if defined), not order. This error reveals the classic confusion between order (derivative level) and degree (power of highest derivative).

## DIAGNOSTIC_QUESTION_3
Find the order of the differential equation: \( y = x\frac{dy}{dx} + \sqrt{a^2\left(1 + \left(\frac{dy}{dx}\right)^2\right)} \), where \( a \) is a constant.

## DIAGNOSTIC_ANSWER_3
The order is 1. The only derivative present is \( \frac{dy}{dx} \) (first derivative). The constant \( a \) and the square root do not introduce any higher derivatives. A wrong answer (e.g., 2) suggests the student thinks squaring the derivative or having a square root raises the order — it does not. Order depends only on the **highest derivative notation**, not algebraic operations on it.

## DIAGNOSTIC_QUESTION_4
Consider the family of curves \( y = Ae^{2x} + Be^{3x} \), where \( A \) and \( B \) are arbitrary constants. What is the order of the differential equation obtained by eliminating \( A \) and \( B \)? Justify without forming the full equation.

## DIAGNOSTIC_ANSWER_4
The order is 2. A family of curves with \( n \) arbitrary constants yields a differential equation of order \( n \) upon elimination. Here there are 2 arbitrary constants (\( A \) and \( B \)), so the resulting differential equation must be of order 2. A student who answers 1 or 3 is likely guessing or confusing the number of constants with the powers in the exponents. This tests the conceptual link between arbitrary constants and order.

## DIAGNOSTIC_QUESTION_5
Evaluate this statement: "A differential equation of order 3 must contain the third derivative \( \frac{d^3y}{dx^3} \) explicitly, and cannot be formed from a family of curves with only 2 arbitrary constants." Is it true or false? Defend your answer.

## DIAGNOSTIC_ANSWER_5
The statement is **true** on both counts. (1) By definition, order 3 means the highest derivative is the third derivative — it must appear (explicitly or implicitly after simplification). (2) Eliminating \( n \) arbitrary constants requires \( n \) differentiations, yielding an \( n \)-th order differential equation. Two constants can only yield order 2. A false judgment reveals misunderstanding of the definition of order or the formation process linking constants to order.

## DIAGNOSTIC_QUESTION_6
Create a differential equation of order 2 that models the following real-world situation: "The rate of change of the acceleration of a particle moving along a straight line is proportional to its displacement from the origin." Define all variables.

## DIAGNOSTIC_ANSWER_6
Let \( x(t) \) be displacement at time \( t \). Velocity \( v = \frac{dx}{dt} \), acceleration \( a = \frac{d^2x}{dt^2} \). Rate of change of acceleration \( = \frac{da}{dt} = \frac{d^3x}{dt^3} \). Wait — the statement says "rate of change of acceleration" which is **jerk** (third derivative). But the question asks for order 2. So we must reinterpret: perhaps "acceleration is proportional to displacement" → \( \frac{d^2x}{dt^2} = -kx \) (simple harmonic motion), which is order 2. A good answer recognizes the mismatch and constructs a valid order-2 model like \( \frac{d^2x}{dt^2} = -kx \). A poor answer writes \( \frac{d^3x}{dt^3} = kx \) (order 3), missing the constraint.

## COMMON_MISCONCEPTION
**The exponent of the highest derivative determines the order.**  
Students frequently see \( \left(\frac{d^2y}{dx^2}\right)^3 \) and say "order 3" because of the cube. They confuse **order** (which derivative: 1st, 2nd, 3rd…) with **degree** (the power of that derivative when the equation is polynomial in derivatives). This happens because both are numbers, both relate to the highest derivative, and the notation \( \frac{d^ny}{dx^n} \) vs \( \left(\frac{d^ny}{dx^n}\right)^m \) looks similar. The brain shortcuts: "highest number I see = order". But order is the **subscript** (n), degree is the **superscript** (m).

## ON_FAILURE
1. Have the student write down the definition of order **in their own words** without using the word "derivative" — e.g., "how many times we differentiated the dependent variable to get the highest one."  
2. Give 5 equations with mixed derivative orders and powers (e.g., \( \left(\frac{dy}{dx}\right)^4 \), \( \frac{d^2y}{dx^2} + \left(\frac{dy}{dx}\right)^2 \), \( \left(\frac{d^3y}{dx^3}\right)^2 \)) and ask them to circle the **highest derivative notation only**, ignoring powers.  
3. Use color coding: highlight \( \frac{d^ny}{dx^n} \) in **blue** (order = n), highlight exponents on derivatives in **red** (degree candidate).  
4. Re-test with DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_3. If still wrong, revisit **c11_app_cbse_08_008** (Instantaneous rate of change and derivative) to reinforce what a derivative *is* before classifying its order.

## PREREQUISITE_NODE_IDS
c12_app_cbse_05_002, c11_app_cbse_08_008, c11_app_cbse_08_009

## PREREQUISITE_REASONS
c12_app_cbse_05_002: Provides the foundational definition of a differential equation (involving derivatives of dependent w.r.t. independent variable) — without this, "order of a differential equation" has no object.
c11_app_cbse_08_008: Defines the derivative as instantaneous rate of change and introduces notation \( \frac{dy}{dx} \) — essential to recognize \( \frac{d^ny}{dx^n} \) as n-th derivative.
c11_app_cbse_08_009: Covers chain rule and higher-order derivatives implicitly through differentiation of algebraic functions — needed to understand that \( \frac{d^2y}{dx^2} \) comes from differentiating \( \frac{dy}{dx} \).

## FORWARD_NODE_IDS
c12_app_cbse_05_004, c12_app_cbse_05_005, c12_app_cbse_05_008

## FORWARD_REASONS
c12_app_cbse_05_004: Degree of a differential equation is defined only after order is known; degree is the power of the highest-order derivative (when polynomial) — order is the prerequisite classifier.
c12_app_cbse_05_005: General and particular solutions depend on order — an n-th order ODE has n arbitrary constants in its general solution; order determines the solution structure.
c12_app_cbse_05_008: Steps to form a differential equation require differentiating n times for n parameters, yielding an n-th order equation — order is the direct output of the formation process.

## CROSS_SUBJECT_PREREQS
c11_app_cbse_12_001, c11_app_cbse_12_005

## CROSS_SUBJECT_REASONS
c11_app_cbse_12_001: Straight line equations (e.g., \( y = mx + c \)) involve parameters (m, c); eliminating them by differentiation yields \( \frac{d^2y}{dx^2} = 0 \), a second-order differential equation — connects coordinate geometry to order of DE.
c11_app_cbse_12_005: Circle equation \( (x-h)^2 + (y-k)^2 = r^2 \) has 3 parameters; eliminating them requires 3 differentiations, giving a third-order differential equation — shows how geometric families link to order.

## CHAIN_DESCRIPTION
c11_app_cbse_08_008 -> c12_app_cbse_05_002 -> c12_app_cbse_05_003 -> c12_app_cbse_05_004 -> c12_app_cbse_05_005

## THIS_FORMULA
Order of a differential equation = order of the highest derivative of the dependent variable w.r.t. the independent variable present in the equation.

## FORMULA_VARIABLES
- Dependent variable: typically y (or x, P, T, etc.) — the quantity that changes.
- Independent variable: typically x (or t, etc.) — the variable with respect to which differentiation occurs.
- Derivative notation: \( \frac{dy}{dx} \) (order 1), \( \frac{d^2y}{dx^2} \) (order 2), \( \frac{d^3y}{dx^3} \) (order 3), ..., \( \frac{d^ny}{dx^n} \) (order n).

## FORMULA_UNITS
N/A — order is a dimensionless positive integer (1, 2, 3, …).

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c12_phy_cbse_03_001 | In physics, Newton's second law \( F = m\frac{d^2x}{dt^2} \) is a second-order differential equation in position x(t); order 2 corresponds to acceleration being the highest derivative.
c12_che_cbse_04_001 | In chemical kinetics, rate laws like \( \frac{d[A]}{dt} = -k[A] \) are first-order differential equations; order of reaction ≠ order of DE, but the DE order is 1.
c12_eco_cbse_02_001 | In economics, the Solow growth model \( \frac{dk}{dt} = sf(k) - (\delta + n)k \) is a first-order differential equation in capital per worker k(t).

## PREREQ_CONCEPT
Understanding what a derivative represents (rate of change) and recognizing derivative notation up to third order (\( \frac{dy}{dx}, \frac{d^2y}{dx^2}, \frac{d^3y}{dx^3} \)).

## PREREQ_BEFORE
Student must be able to look at an equation and correctly identify \( \frac{d^2y}{dx^2} \) as "second derivative", \( \frac{d^3y}{dx^3} \) as "third derivative", etc., without confusing the superscript in \( \left(\frac{d^2y}{dx^2}\right)^3 \) with the order.

## PREREQ_STUCK
Review **c11_app_cbse_08_008** (Instantaneous rate of change and derivative) and **c11_app_cbse_08_009** (Derivatives of algebraic functions using chain rule) to practice identifying and computing first and second derivatives.

## WORKED_EXAMPLE_1
PROBLEM: A population of bacteria grows such that the rate of change of the growth rate is proportional to the population size. If \( P(t) \) is the population at time \( t \), write the differential equation and state its order.

STEPS:
- Step 1: Identify the variables — dependent variable is \( P \) (population), independent variable is \( t \) (time).
- Step 2: Translate "growth rate" → first derivative \( \frac{dP}{dt} \).
- Step 3: Translate "rate of change of the growth rate" → derivative of \( \frac{dP}{dt} \) → second derivative \( \frac{d^2P}{dt^2} \).
- Step 4: "Proportional to population size" → \( \frac{d^2P}{dt^2} = kP \), where \( k \) is a constant of proportionality.
- Step 5: The highest derivative is \( \frac{d^2P}{dt^2} \) (second derivative), so the order is 2.

REASONING: The phrase "rate of change of the growth rate" explicitly describes the second derivative. Order is determined solely by the highest derivative present, which is \( \frac{d^2P}{dt^2} \). The constant \( k \) and the dependent variable \( P \) do not affect the order.

ANSWER: Differential equation: \( \frac{d^2P}{dt^2} = kP \); Order = 2.

## WORKED_EXAMPLE_2
PROBLEM: Determine the order of the differential equation: \( \log\left(\frac{d^2y}{dx^2}\right) = \frac{dy}{dx} + x \).

STEPS:
- Step 1: Scan the equation for all derivative terms — we see \( \frac{d^2y}{dx^2} \) inside the logarithm and \( \frac{dy}{dx} \) on the right.
- Step 2: Recognize that \( \frac{d^2y}{dx^2} \) is the second derivative (order 2), and \( \frac{dy}{dx} \) is the first derivative (order 1).
- Step 3: The logarithm is a function applied to the second derivative — it does not change the fact that the highest derivative involved is of order 2.
- Step 4: No derivative of order 3 or higher appears anywhere.
- Step 5: Conclude that the order is 2, because the highest-order derivative present is \( \frac{d^2y}{dx^2} \).

REASONING: Functions like log, sin, exp, or powers applied to derivatives do not alter the order of the derivative itself. Order is a property of the derivative operator, not the algebraic form it appears in. The equation is not polynomial in derivatives, so degree is not defined — but order is always defined.

ANSWER: Order = 2.

## WORKED_EXAMPLE_3
PROBLEM: The family of curves \( y = c_1 e^{2x} + c_2 e^{-3x} + c_3 \sin x \) represents the general solution of a differential equation. What is the order of that differential equation? Explain why without forming the equation.

STEPS:
- Step 1: Count the number of arbitrary constants in the given family of curves — there are three: \( c_1, c_2, c_3 \).
- Step 2: Recall the fundamental principle: a family of curves with \( n \) independent arbitrary constants satisfies an \( n \)-th order differential equation.
- Step 3: Each arbitrary constant requires one differentiation to eliminate; three constants need three differentiations, producing a third derivative.
- Step 4: The resulting differential equation will contain \( \frac{d^3y}{dx^3} \) as the highest derivative, with no arbitrary constants remaining.
- Step 5: Therefore, the order of the differential equation is 3.

REASONING: The number of essential arbitrary constants in the general solution equals the order of the differential equation. This is a direct consequence of the formation process (differentiate n times to eliminate n constants). No need to actually differentiate — the count of constants gives the order immediately.

ANSWER: Order = 3.

## COMPETENCY_QUESTION_1
QUESTION: A student writes the differential equation for simple harmonic motion as \( \frac{d^2x}{dt^2} + \omega^2 x = 0 \) and claims its order is 2 because "there are two terms with derivatives." Another student says it's order 2 because "the highest derivative is the second derivative." Which student is correct? Justify your answer and explain why the other reasoning is flawed.

COMPETENCY: Conceptual Understanding & Critical Reasoning

STEPS:
- Step 1: Identify the highest derivative in the equation — it is \( \frac{d^2x}{dt^2} \), which is the second derivative.
- Step 2: Recall the definition: order = order of the highest derivative present.
- Step 3: Evaluate Student 1's reason: "two terms with derivatives" — but there is only ONE derivative term (\( \frac{d^2x}{dt^2} \)); \( x \) is not a derivative. So the premise is factually wrong.
- Step 4: Evaluate Student 2's reason: "highest derivative is the second derivative" — this matches the definition exactly.
- Step 5: Conclude Student 2 is correct; Student 1 misidentifies the terms and uses an incorrect criterion (counting terms).

ANSWER: Student 2 is correct. The order is 2 because the highest derivative is \( \frac{d^2x}{dt^2} \) (second derivative). Student 1 is wrong because (a) there is only one derivative term, not two, and (b) order is not determined by the number of derivative terms but by the highest order among them.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the differential equation \( \left(\frac{d^3y}{dx^3}\right)^2 + \left(\frac{d^2y}{dx^2}\right)^3 + \frac{dy}{dx} = e^x \).  
(a) State its order.  
(b) Is its degree defined? If yes, state it; if no, explain why.  
(c) If we differentiate this entire equation once with respect to \( x \), what will be the order of the new equation? Justify.

COMPETENCY: Analytical Reasoning & Multi-concept Integration (Order, Degree, Differentiation)

STEPS:
- Step 1 (a): Identify the highest derivative — \( \frac{d^3y}{dx^3} \) (third derivative) → Order = 3.
- Step 2 (b): Check if the equation is a polynomial in derivatives — yes, all derivative terms have positive integer powers (2, 3, 1). The highest-order derivative is \( \frac{d^3y}{dx^3} \), raised to power 2 → Degree = 2.
- Step 3 (c): Differentiating the entire equation once increases the order of every derivative by 1: \( \frac{d^3y}{dx^3} \to \frac{d^4y}{dx^4} \), \( \frac{d^2y}{dx^2} \to \frac{d^3y}{dx^3} \), \( \frac{dy}{dx} \to \frac{d^2y}{dx^2} \). The new highest derivative is \( \frac{d^4y}{dx^4} \) → New order = 4.
- Step 4: Justify: Differentiation raises the order of each derivative term by exactly 1, so the maximum order increases by 1.

ANSWER: (a) Order = 3. (b) Yes, degree is defined and equals 2 (polynomial in derivatives, highest power of highest-order derivative is 2). (c) New order = 4, because differentiating once increases the order of the highest derivative from 3 to 4.

DIFFICULTY: hard