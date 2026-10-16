## ELI5
A car's speedometer reads three t squared plus two at every instant, and the journey's position is wanted: integration is the art of un-differentiating. Any function whose derivative matches the speed works - t cubed plus two t - but constants are invisible to differentiation, so a family of answers differs only by an added C. The integral sign collects that whole family, and every Class 11 derivative formula read right-to-left becomes an integral formula.

## DEFINITION
Integration is the inverse process of differentiation: given a function \(f(x)\), we seek a function \(F(x)\) such that \(F'(x) = f(x)\) for all \(x\) in an interval. The family of all such functions is denoted by \(\int f(x)\,dx = F(x) + C\), where \(C\) is an arbitrary constant called the constant of integration.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) identify the integrand and variable of integration, (2) write the correct antiderivative using standard derivative formulas in reverse, (3) include the constant of integration \(C\) and explain its necessity, and (4) verify an antiderivative by differentiating it back to the original function.

## SCOPE_BOUNDARY
This node covers the conceptual foundation of indefinite integration as the inverse of differentiation, the notation \(\int f(x)\,dx\), the role of the constant of integration, and the basic standard integrals derived from known derivatives (polynomials, trigonometric, exponential, logarithmic). It does NOT cover methods of integration (substitution, parts, partial fractions) or definite integrals — those are in subsequent nodes.

## WALKTHROUGH
Imagine you are given the velocity of a car at every instant, \(v(t) = 3t^2 + 2\), and you want to find its position function \(s(t)\). Since velocity is the derivative of position, you need to "undo" differentiation. Start by writing the derivative you know: \(\frac{d}{dt}(t^3) = 3t^2\) and \(\frac{d}{dt}(2t) = 2\). So a function whose derivative is \(3t^2 + 2\) is \(t^3 + 2t\). But adding any constant (like the initial position) gives the same derivative, so the general position is \(s(t) = t^3 + 2t + C\). This is integration: we write \(\int (3t^2 + 2)\,dt = t^3 + 2t + C\). The key insight is that every derivative formula you learned in Class 11 can be read backwards to get an integral formula.

Takeaway first: integration is differentiation reversed, and the arbitrary constant is the confession that differentiation forgets where the journey started. Exam moves: identification questions naming integrand and variable, formula questions reversing standard derivatives, constant questions explaining C's necessity, and verification questions differentiating the antiderivative back. Method: rerun the car - build t cubed plus two t term by term, then admit the whole family with plus C. Check yourself: an omitted C is not a style slip but a wrong answer - it loses every member of the family but one. Drill: integrate three simple functions and verify each by differentiating back.

## DIAGNOSTIC_QUESTION_1
What is the most general antiderivative of \(f(x) = \cos x\)? Write the answer in the standard notation for an indefinite integral.

## DIAGNOSTIC_ANSWER_1
\(\int \cos x\,dx = \sin x + C\). A wrong answer like "\(\sin x\)" (missing \(+C\)) reveals the student does not understand that antiderivatives form a family of functions differing by a constant. A wrong answer like "\(-\sin x + C\)" reveals confusion between the derivative of \(\sin x\) and \(\cos x\).

## DIAGNOSTIC_QUESTION_2
Explain why \(\int x^2\,dx = \frac{x^3}{3} + C\) but \(\int \frac{1}{x}\,dx = \ln|x| + C\). Why does the power rule \(\frac{x^{n+1}}{n+1}\) fail for \(n = -1\)?

## DIAGNOSTIC_ANSWER_2
The power rule for integration comes from reversing \(\frac{d}{dx}\left(\frac{x^{n+1}}{n+1}\right) = x^n\), which requires division by \(n+1\). For \(n = -1\), this would be division by zero, so the formula is invalid. Instead, we use the known derivative \(\frac{d}{dx}\ln|x| = \frac{1}{x}\). A student who writes \(\frac{x^0}{0} + C\) or \(x^0 + C\) is mechanically applying the power rule without checking the condition \(n \neq -1\).

## DIAGNOSTIC_QUESTION_3
Find \(\int (4x^3 - 6x + 5)\,dx\). Show each step of reversing the derivative rules.

## DIAGNOSTIC_ANSWER_3
Step 1: \(\int 4x^3\,dx = 4 \cdot \frac{x^4}{4} = x^4\) (reverse of \(\frac{d}{dx}x^4 = 4x^3\)).  
Step 2: \(\int -6x\,dx = -6 \cdot \frac{x^2}{2} = -3x^2\) (reverse of \(\frac{d}{dx}(-3x^2) = -6x\)).  
Step 3: \(\int 5\,dx = 5x\) (reverse of \(\frac{d}{dx}(5x) = 5\)).  
Step 4: Combine and add \(+C\): \(\int (4x^3 - 6x + 5)\,dx = x^4 - 3x^2 + 5x + C\).  
A wrong answer like \(x^4 - 3x + 5x + C\) reveals the student integrated \(-6x\) as \(-6 \cdot x\) instead of \(-6 \cdot \frac{x^2}{2}\).

## DIAGNOSTIC_QUESTION_4
Two students compute \(\int \sec^2 x\,dx\). Student A writes \(\tan x + C\). Student B writes \(-\cot x + C\). Are both correct? Justify your answer by differentiating each result.

## DIAGNOSTIC_ANSWER_4
Only Student A is correct. Differentiating \(\tan x + C\) gives \(\sec^2 x\). Differentiating \(-\cot x + C\) gives \(\csc^2 x\), not \(\sec^2 x\). A student who thinks both are correct confuses the derivatives of \(\tan x\) and \(\cot x\). The correct antiderivative of \(\sec^2 x\) is \(\tan x + C\); the antiderivative of \(\csc^2 x\) is \(-\cot x + C\).

## DIAGNOSTIC_QUESTION_5
A student writes \(\int e^{2x}\,dx = e^{2x} + C\). Is this correct? If not, find the error and give the correct antiderivative.

## DIAGNOSTIC_ANSWER_5
Incorrect. Differentiating \(e^{2x} + C\) gives \(2e^{2x}\) by the chain rule, not \(e^{2x}\). The student forgot to compensate for the inner derivative \(2\). The correct antiderivative is \(\frac{1}{2}e^{2x} + C\) because \(\frac{d}{dx}\left(\frac{1}{2}e^{2x}\right) = \frac{1}{2} \cdot 2e^{2x} = e^{2x}\). This reveals the common error of ignoring the chain rule when integrating composite functions — a preview of the substitution method.

## DIAGNOSTIC_QUESTION_6
Create a function \(f(x)\) whose antiderivative is \(\frac{x^5}{5} + 3x + C\). Then create a different function \(g(x)\) that has the same antiderivative family.

## DIAGNOSTIC_ANSWER_6
\(f(x) = x^4 + 3\) because \(\frac{d}{dx}\left(\frac{x^5}{5} + 3x\right) = x^4 + 3\).  
\(g(x)\) must be identical to \(f(x)\) because the derivative of a function is unique. If a student suggests \(g(x) = x^4 + 3 + 5\) (or any other constant added), they misunderstand that the derivative of a constant is zero, so adding a constant to the integrand changes the antiderivative. The only way two functions have the same antiderivative family is if they are exactly the same function. This tests understanding of the uniqueness of derivatives.

## COMMON_MISCONCEPTION
Students often write \(\int \frac{1}{x}\,dx = \ln x + C\) (without absolute value) because they only consider \(x > 0\). In Class 12, the domain of \(\frac{1}{x}\) includes negative \(x\), and \(\ln x\) is undefined for \(x \le 0\). The correct antiderivative is \(\ln|x| + C\), which works for all \(x \neq 0\). Another frequent error: writing \(\int \cos(2x)\,dx = \sin(2x) + C\) instead of \(\frac{1}{2}\sin(2x) + C\), forgetting to divide by the inner derivative \(2\). This is the chain rule in reverse and is the most common mistake when integrating composite functions by inspection.

## ON_FAILURE
If a student misses the constant \(C\), have them differentiate \(F(x) = x^2\) and \(G(x) = x^2 + 5\) and observe both give \(2x\). Then ask: "If I only give you \(2x\), which one is the original? Both are possible, so we write \(x^2 + C\)."  
For the chain rule error, have them differentiate \(\sin(2x)\) and see the extra factor \(2\). Then ask: "What must we multiply by to cancel that \(2\)?" Guide them to \(\frac{1}{2}\sin(2x)\).  
For the absolute value in \(\ln|x|\), have them differentiate \(\ln(-x)\) for \(x < 0\) using the chain rule: \(\frac{d}{dx}\ln(-x) = \frac{1}{-x} \cdot (-1) = \frac{1}{x}\). This shows \(\ln|x|\) works on both sides.

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_009, c11_math_cbse_13_010
## PREREQUISITE_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions is needed to reverse the power rule for integration.
c11_math_cbse_13_008: Derivative using first principles builds the conceptual link between derivative and antiderivative.
c11_math_cbse_13_009: Algebra of derivatives (sum, difference, product rules) is used to integrate sums/differences term by term.
c11_math_cbse_13_010: Derivatives of trigonometric functions are directly reversed to get standard trigonometric integrals.

## FORWARD_NODE_IDS
c12_math_cbse_07_002, c12_math_cbse_07_003, c12_math_cbse_07_004, c12_math_cbse_07_005, c12_math_cbse_07_006, c12_math_cbse_07_007, c12_math_cbse_07_008, c12_math_cbse_07_009, c12_eco_cbse_03_004

## FORWARD_REASONS
c12_math_cbse_07_002: Integration by substitution builds directly on the idea of reversing the chain rule, which is first encountered here when integrating \(\cos(2x)\) etc.
c12_math_cbse_07_003: Partial fractions decomposes rational functions into simpler terms whose integrals are found using the basic formulas from this node.
c12_math_cbse_07_004: Integration by parts is derived from the product rule of differentiation; understanding basic antiderivatives is essential to apply it.
c12_math_cbse_07_005: Standard trigonometric integrals are the direct reversal of the trigonometric derivatives learned in Class 11 and used here.
c12_math_cbse_07_006: Exponential and logarithmic integrals come from reversing \(\frac{d}{dx}e^x = e^x\) and \(\frac{d}{dx}\ln x = \frac{1}{x}\) established in this node.
c12_math_cbse_07_007: Integration as inverse of differentiation provides the antiderivative concept, which the limit-of-sum definition will later be connected to via the Fundamental Theorem.  
c12_math_cbse_07_008: Integration as Inverse of Differentiation - provides the foundational concept that integration reverses differentiation.  
c12_math_cbse_07_009: Integration as inverse of differentiation provides the concept of antiderivatives and standard integral formulas.  
c12_eco_cbse_03_004: c12_math_cbse_07_001 | Integrals used in deriving cost functions from production functions via cost minimization  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_03_004, c12_phy_cbse_02_001
## CROSS_SUBJECT_REASONS
c11_phy_cbse_03_004: Velocity as derivative of position; finding position from velocity is a direct application of integration as inverse of differentiation.
c12_phy_cbse_02_001: Electric field as derivative of potential; finding potential from field uses indefinite integration with constant determined by boundary conditions.

## CHAIN_DESCRIPTION
c11_math_cbse_13_007 -> c12_math_cbse_07_001 -> c12_math_cbse_07_002

## THIS_FORMULA
\(\int f(x)\,dx = F(x) + C\) where \(F'(x) = f(x)\)

## FORMULA_VARIABLES
\(f(x)\) = integrand (the function to be integrated); \(x\) = variable of integration; \(F(x)\) = any antiderivative of \(f(x)\); \(C\) = arbitrary constant of integration.

## FORMULA_UNITS
Dimensionless (mathematical operation). In applied problems, if \(f(x)\) has units (e.g., m/s), then \(\int f(x)\,dx\) has units of \(f(x) \times\) units of \(x\) (e.g., m).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_phy_cbse_03_004 | Velocity is the derivative of position; integrating velocity gives position up to an additive constant (initial position).
c12_phy_cbse_02_001 | Electric field \(E = -\frac{dV}{dx}\); integrating \(E\) gives potential \(V\) up to a constant (reference potential).
## PREREQ_CONCEPT
The derivative rules for polynomials, trigonometric, exponential, and logarithmic functions from Class 11.

## PREREQ_BEFORE
The student must be able to differentiate \(x^n\), \(\sin x\), \(\cos x\), \(e^x\), \(\ln x\), and their linear combinations fluently.

## PREREQ_STUCK
If stuck, revisit Class 11 derivative formulas (c11_math_cbse_13_007, c11_math_cbse_13_010) and practice writing them backwards: "If \(\frac{d}{dx}(\sin x) = \cos x\), then \(\int \cos x\,dx = \sin x + C\)."

## WORKED_EXAMPLE_1
PROBLEM: A particle moves along a straight line with acceleration \(a(t) = 6t - 4\) m/s². If its initial velocity is 5 m/s, find the velocity function \(v(t)\). (This requires integrating acceleration to get velocity, then using the initial condition to find \(C\).)
STEPS:
- Step 1: Write the integral for velocity: \(v(t) = \int a(t)\,dt = \int (6t - 4)\,dt\).
- Step 2: Integrate term by term: \(\int 6t\,dt = 6 \cdot \frac{t^2}{2} = 3t^2\); \(\int -4\,dt = -4t\).
- Step 3: Combine and add constant: \(v(t) = 3t^2 - 4t + C\).
- Step 4: Use initial condition \(v(0) = 5\): \(5 = 3(0)^2 - 4(0) + C \Rightarrow C = 5\).
- Step 5: Write the final velocity function: \(v(t) = 3t^2 - 4t + 5\) m/s.
REASONING: Acceleration is the derivative of velocity, so velocity is the antiderivative of acceleration. The constant of integration represents the initial velocity, which is determined by the given condition.
ANSWER: \(v(t) = 3t^2 - 4t + 5\) m/s

## WORKED_EXAMPLE_2
PROBLEM: Find \(\int \left( \frac{2}{x} + 3e^x - \sin x \right) dx\).
STEPS:
- Step 1: Separate the integral: \(\int \frac{2}{x}\,dx + \int 3e^x\,dx - \int \sin x\,dx\).
- Step 2: Apply standard formulas: \(\int \frac{2}{x}\,dx = 2 \int \frac{1}{x}\,dx = 2\ln|x|\); \(\int 3e^x\,dx = 3e^x\); \(\int \sin x\,dx = -\cos x\).
- Step 3: Combine: \(2\ln|x| + 3e^x - (-\cos x) + C = 2\ln|x| + 3e^x + \cos x + C\).
- Step 4: Verify by differentiating: \(\frac{d}{dx}(2\ln|x| + 3e^x + \cos x + C) = \frac{2}{x} + 3e^x - \sin x\), which matches the integrand.
- Step 5: State the final answer with the constant.
REASONING: The integral of a sum/difference is the sum/difference of integrals (linearity). Each term uses a basic antiderivative formula derived from the corresponding derivative rule. The constant \(C\) is added only once at the end.
ANSWER: \(2\ln|x| + 3e^x + \cos x + C\)

## WORKED_EXAMPLE_3
PROBLEM: Find \(\int \left( \sqrt{x} + \frac{1}{\sqrt{x}} \right) dx\). (This requires rewriting the integrand using rational exponents before applying the power rule.)
STEPS:
- Step 1: Rewrite using exponents: \(\sqrt{x} = x^{1/2}\), \(\frac{1}{\sqrt{x}} = x^{-1/2}\).
- Step 2: Write the integral: \(\int (x^{1/2} + x^{-1/2})\,dx\).
- Step 3: Apply power rule \(\int x^n\,dx = \frac{x^{n+1}}{n+1}\) for \(n \neq -1\):
  - For \(x^{1/2}\): \(\frac{x^{1/2+1}}{1/2+1} = \frac{x^{3/2}}{3/2} = \frac{2}{3}x^{3/2}\).
  - For \(x^{-1/2}\): \(\frac{x^{-1/2+1}}{-1/2+1} = \frac{x^{1/2}}{1/2} = 2x^{1/2}\).
- Step 4: Combine and add \(C\): \(\frac{2}{3}x^{3/2} + 2x^{1/2} + C\).
- Step 5: Optionally rewrite in radical form: \(\frac{2}{3}x\sqrt{x} + 2\sqrt{x} + C\).
- Step 6: Verify by differentiating: \(\frac{d}{dx}\left(\frac{2}{3}x^{3/2} + 2x^{1/2}\right) = \frac{2}{3} \cdot \frac{3}{2}x^{1/2} + 2 \cdot \frac{1}{2}x^{-1/2} = x^{1/2} + x^{-1/2} = \sqrt{x} + \frac{1}{\sqrt{x}}\).
REASONING: The power rule for integration works for any real exponent except \(-1\). Rewriting radicals as rational exponents makes the rule directly applicable. The constant \(C\) is essential because the derivative of any constant is zero.
ANSWER: \(\frac{2}{3}x^{3/2} + 2x^{1/2} + C\) or \(\frac{2}{3}x\sqrt{x} + 2\sqrt{x} + C\)

## COMPETENCY_QUESTION_1
QUESTION: A student claims that \(\int \tan x\,dx = \sec^2 x + C\) because "the derivative of \(\tan x\) is \(\sec^2 x\)". Identify the error in the student's reasoning and find the correct antiderivative of \(\tan x\). Explain how you would derive it using a substitution that converts \(\tan x\) into a form \(\frac{f'(x)}{f(x)}\).
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Recognize the student confused the function with its derivative.
- Step 2: Recall \(\frac{d}{dx}\tan x = \sec^2 x\), so \(\int \sec^2 x\,dx = \tan x + C\), not the other way.
- Step 3: Write \(\tan x = \frac{\sin x}{\cos x}\).
- Step 4: Notice the numerator \(\sin x\) is (up to a sign) the derivative of the denominator \(\cos x\): \(\frac{d}{dx}\cos x = -\sin x\).
- Step 5: Use substitution \(u = \cos x\), \(du = -\sin x\,dx\) to get \(\int \tan x\,dx = \int \frac{\sin x}{\cos x}\,dx = -\int \frac{du}{u} = -\ln|u| + C = -\ln|\cos x| + C = \ln|\sec x| + C\).
ANSWER: The student reversed the relationship: derivative of \(\tan x\) is \(\sec^2 x\), so antiderivative of \(\sec^2 x\) is \(\tan x + C\). The correct antiderivative of \(\tan x\) is \(-\ln|\cos x| + C\) or \(\ln|\sec x| + C\).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The marginal cost function of producing \(x\) units of a product is \(MC(x) = 3x^2 - 12x + 15\) (in rupees per unit). The fixed cost is ₹200. Find the total cost function \(C(x)\) and the cost of producing 10 units. Interpret the constant of integration in this context.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Marginal cost is the derivative of total cost: \(MC(x) = C'(x)\).
- Step 2: Integrate to find total cost: \(C(x) = \int (3x^2 - 12x + 15)\,dx = x^3 - 6x^2 + 15x + K\).
- Step 3: Fixed cost is the cost when \(x = 0\): \(C(0) = 200\). Substitute: \(200 = 0 - 0 + 0 + K \Rightarrow K = 200\).
- Step 4: Total cost function: \(C(x) = x^3 - 6x^2 + 15x + 200\).
- Step 5: Cost of 10 units: \(C(10) = 1000 - 600 + 150 + 200 = 750\) rupees.
- Step 6: Interpret \(K\): The constant of integration represents the fixed cost (cost incurred even when zero units are produced).
ANSWER: \(C(x) = x^3 - 6x^2 + 15x + 200\); cost of 10 units = ₹750. The constant \(K\) is the fixed cost.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Since velocity is the derivative of position, you need to "undo" ______.

## DIAGNOSTIC_ANSWER_7
differentiation

Differentiation is the operation being undone: the sentence's whole point is that integration runs the familiar machine in reverse. **A wrong answer (a function word) reveals the student has named the material when the blank asks for the process being reversed.**

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Integration?

## DIAGNOSTIC_ANSWER_8
This is the chain rule in reverse and is the most common mistake when integrating composite functions by inspection.

The flagged error is the missing constant's cousin: composite integrands need the chain rule run backwards, and inspection alone rarely spots the inner function's derivative. **A wrong answer that integrates the outside while ignoring the inside reveals the student has read the formula left-to-right where integration demands the reverse commute.**
