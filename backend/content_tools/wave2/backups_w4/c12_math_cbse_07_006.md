## ELI5
Three formulas anchor the exponential-logarithmic table: e to the x integrates to itself; a general base a to the x integrates to itself divided by log a; and one over x integrates to log of the absolute value of x. The pharmacist totalling a drug's absorption into the bloodstream meets the first whenever the rate decays exponentially. The absolute value protects the log against negative inputs, and the log-a divisor corrects the base's own steepness.

## DEFINITION
The standard integrals of exponential and logarithmic functions are the antiderivatives derived directly from the derivatives of \(e^x\), \(a^x\) (\(a>0, a\neq 1\)), and \(\ln x\). They are:
\[
\int e^x \,dx = e^x + C,\quad \int a^x \,dx = \frac{a^x}{\ln a} + C,\quad \int \frac{1}{x} \,dx = \ln|x| + C.
\]
These formulas hold for all \(x\) in the domains of the integrands (for \(\frac{1}{x}\), \(x \neq 0\)) and are the building blocks for integrating more complex expressions involving exponentials and logarithms.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly write and apply the three standard integrals, combine them with algebraic simplification and the sum/difference rule, and recognise when a simple substitution (e.g., \(u = kx\)) is needed to match the standard forms. They can also explain why the absolute value appears in \(\int \frac{1}{x}\,dx\) and why the factor \(\frac{1}{\ln a}\) appears in \(\int a^x\,dx\).

## SCOPE_BOUNDARY
This node covers only the **indefinite** integrals of \(e^x\), \(a^x\), and \(1/x\) and their direct algebraic combinations (sums, differences, constant multiples). It does **not** cover definite integrals, integration by substitution beyond a linear change of variable, integration by parts, partial fractions, or integrals requiring trigonometric identities. Those are handled in later nodes.

## WALKTHROUGH
Imagine you are a pharmacist calculating the total amount of a drug absorbed into the bloodstream. The absorption rate is proportional to the current concentration, leading to an exponential rate function \(R(t) = 50 e^{-0.2t}\) mg/hour. To find the total drug absorbed from \(t=0\) to \(t=T\), you must integrate \(R(t)\). This is exactly the kind of problem where the standard integral \(\int e^{kt}\,dt = \frac{1}{k}e^{kt}+C\) becomes essential. Start by recalling that integration is the inverse of differentiation (c12_math_cbse_07_001). Write down the derivative of \(e^x\) and \(a^x\) from Class 12 differentiation (Chapter 5). Notice that \(\frac{d}{dx}e^x = e^x\) immediately gives \(\int e^x\,dx = e^x+C\). For \(a^x\), the derivative is \(a^x\ln a\), so dividing by \(\ln a\) yields the integral. For \(\frac{1}{x}\), the derivative of \(\ln|x|\) is \(\frac{1}{x}\) for all \(x\neq 0\), giving \(\int \frac{1}{x}\,dx = \ln|x|+C\). The key insight is that every integral formula comes from reversing a known derivative.

Takeaway first: each formula is a derivative read backwards - e to the x differentiates to itself, a to the x carries a log-a factor that integration must cancel, and the log's derivative is one over x with an absolute value for safety. Exam moves: application questions on all three standards, explanation questions on the absolute value and the log-a divisor, and combination questions mixing them with the sum rule. Method: rerun the pharmacy - the absorption rate decays exponentially, so total absorbed is the antiderivative divided by the decay constant. Check yourself: the base must be positive and different from one for the a-to-the-x formula to mean anything; the conditions are part of the formula, not decoration. Drill: integrate one e-to-the-kt, one two-to-the-t, and one reciprocal, explaining each adjustment.

## DIAGNOSTIC_QUESTION_1
Write the three standard integrals for exponential and logarithmic functions exactly as they appear in the NCERT textbook, including the constant of integration.

## DIAGNOSTIC_ANSWER_1
Correct answer:  
\(\int e^x\,dx = e^x + C\)  
\(\int a^x\,dx = \frac{a^x}{\ln a} + C\)  (with \(a>0, a\neq 1\))  
\(\int \frac{1}{x}\,dx = \ln|x| + C\)  

A wrong answer typically reveals one of three errors: (1) forgetting the constant \(C\); (2) writing \(\int a^x\,dx = \frac{a^{x+1}}{x+1}+C\) (misapplying the power rule); or (3) writing \(\int \frac{1}{x}\,dx = \ln x + C\) (omitting the absolute value). The absolute value is crucial because the domain of \(1/x\) includes negative numbers, and \(\ln x\) is undefined for \(x<0\).

## DIAGNOSTIC_QUESTION_2
Explain **why** \(\int a^x\,dx = \frac{a^x}{\ln a} + C\) by showing the differentiation step that verifies it. Why does the formula fail if \(a=1\)?

## DIAGNOSTIC_ANSWER_2
Correct answer:  
Differentiate \(\frac{a^x}{\ln a}\):  
\(\frac{d}{dx}\left(\frac{a^x}{\ln a}\right) = \frac{1}{\ln a}\cdot \frac{d}{dx}(a^x) = \frac{1}{\ln a}\cdot a^x \ln a = a^x\).  
Hence \(\frac{a^x}{\ln a}\) is an antiderivative of \(a^x\).  
If \(a=1\), then \(a^x = 1\) and \(\ln a = 0\), making the denominator zero. The integral of \(1\) is simply \(x+C\), which is the correct separate formula.

A wrong answer often shows that the student does not connect the integral to the derivative of \(a^x\), or they think the power rule \(\int x^n\,dx = \frac{x^{n+1}}{n+1}\) applies to \(a^x\). This misconception arises from confusing the variable in the base vs. the exponent.

## DIAGNOSTIC_QUESTION_3
Evaluate \(\int \left(3^x + \frac{2}{x} - 5e^x\right)\,dx\). Show every step, including the constant of integration.

## DIAGNOSTIC_ANSWER_3
Step-by-step solution:  
\(\int \left(3^x + \frac{2}{x} - 5e^x\right)\,dx = \int 3^x\,dx + \int \frac{2}{x}\,dx - \int 5e^x\,dx\)  (sum/difference rule)  
\(= \frac{3^x}{\ln 3} + 2\ln|x| - 5e^x + C\).  

A common error is to write \(\int 3^x\,dx = \frac{3^{x+1}}{x+1}\) or to forget the factor \(2\) in \(2\ln|x|\). Another error is omitting the absolute value in \(\ln|x|\) or forgetting the constant \(C\). Each of these indicates a gap in applying the standard formulas mechanically without understanding the linearity of integration.

## DIAGNOSTIC_QUESTION_4
Compare the integrals \(\int e^{2x}\,dx\) and \(\int e^x\,dx\). A student writes \(\int e^{2x}\,dx = e^{2x} + C\). Is this correct? If not, find the correct integral and explain the source of the error using the chain rule.

## DIAGNOSTIC_ANSWER_4
The student's answer is incorrect.  
Correct integral: \(\int e^{2x}\,dx = \frac{1}{2}e^{2x} + C\).  
Verification: \(\frac{d}{dx}\left(\frac{1}{2}e^{2x}\right) = \frac{1}{2}\cdot e^{2x}\cdot 2 = e^{2x}\).  
The error comes from ignoring the chain rule: the derivative of \(e^{2x}\) is \(2e^{2x}\), so the antiderivative must be divided by \(2\). This is a classic case where a simple substitution \(u=2x\) is needed. Students who answer \(e^{2x}+C\) are treating the exponent as if it were just \(x\), not recognising the inner function \(2x\).

## DIAGNOSTIC_QUESTION_5
A student evaluates \(\int_{-2}^{-1} \frac{1}{x}\,dx\) as \(\left[\ln x\right]_{-2}^{-1} = \ln(-1) - \ln(-2)\). Identify the mistake and give the correct evaluation.

## DIAGNOSTIC_ANSWER_5
The mistake is using \(\ln x\) instead of \(\ln|x|\) for the antiderivative. The function \(\frac{1}{x}\) is defined on \([-2,-1]\) (negative interval), but \(\ln x\) is undefined for negative \(x\). The correct antiderivative is \(\ln|x|\).  
Correct evaluation:  
\(\int_{-2}^{-1} \frac{1}{x}\,dx = \left[\ln|x|\right]_{-2}^{-1} = \ln|-1| - \ln|-2| = \ln 1 - \ln 2 = 0 - \ln 2 = -\ln 2\).  

A wrong answer reveals that the student has memorised \(\int \frac{1}{x}\,dx = \ln x + C\) without understanding the domain restriction. This is a critical error that leads to nonsensical expressions like \(\ln(-1)\) in definite integrals.

## DIAGNOSTIC_QUESTION_6
Create an integral problem that requires **both** \(\int e^x\,dx\) and \(\int \frac{1}{x}\,dx\) in its solution, and solve it completely. The integrand should be a single rational expression that you simplify by splitting into two terms.

## DIAGNOSTIC_ANSWER_6
Example problem: Evaluate \(\int \frac{x e^x + 1}{x}\,dx\).  
Solution:  
\(\int \frac{x e^x + 1}{x}\,dx = \int \left(e^x + \frac{1}{x}\right)\,dx = \int e^x\,dx + \int \frac{1}{x}\,dx = e^x + \ln|x| + C\).  

A good answer shows the algebraic split \(\frac{x e^x + 1}{x} = e^x + \frac{1}{x}\) and then applies both standard integrals. A poor answer either fails to split the fraction, tries to use substitution unnecessarily, or writes \(\ln x\) without absolute value. This tests whether the student can recognise the standard forms hidden inside a combined expression.

## COMMON_MISCONCEPTION
**Misconception 1:** "\(\int a^x\,dx = \frac{a^{x+1}}{x+1}+C\)" – Students apply the power rule for \(x^n\) to \(a^x\), confusing the variable base with constant base.  
**Misconception 2:** "\(\int \frac{1}{x}\,dx = \ln x + C\)" – Omitting the absolute value. This causes errors when the integration interval includes negative numbers (e.g., definite integrals from \(-2\) to \(-1\)).  
**Misconception 3:** "\(\int e^{kx}\,dx = e^{kx}+C\)" – Forgetting to divide by \(k\) (the derivative of the inner function). This is a chain rule oversight.  
**Why they are wrong:** Each misconception ignores the derivative that the integral is supposed to reverse. The power rule is for \(x^n\) (variable base, constant exponent); \(a^x\) has constant base, variable exponent. The absolute value ensures the antiderivative is valid on both sides of the vertical asymptote at \(x=0\). The factor \(1/k\) compensates for the inner derivative \(k\) when differentiating \(e^{kx}\).

## ON_FAILURE
If a student exhibits any of the above misconceptions:
1. **For Misconception 1:** Ask them to differentiate \(\frac{a^{x+1}}{x+1}\) using the quotient rule and see it does not yield \(a^x\). Then differentiate \(\frac{a^x}{\ln a}\) to confirm it works. Revisit the derivative of \(a^x\) from Class 12 Chapter 5 (Continuity and Differentiability).
2. **For Misconception 2:** Have them evaluate \(\int_{-3}^{-1} \frac{1}{x}\,dx\) using both \(\ln x\) and \(\ln|x|\). Show that \(\ln x\) gives an undefined expression while \(\ln|x|\) gives a real number. Emphasise that the domain of \(1/x\) is \(x\neq 0\), so the antiderivative must also be defined for \(x<0\).
3. **For Misconception 3:** Use substitution \(u=kx\) explicitly: \(\int e^{kx}\,dx = \frac{1}{k}\int e^u\,du = \frac{1}{k}e^u+C = \frac{1}{k}e^{kx}+C\). Practice 5–10 problems of the form \(\int e^{ax+b}\,dx\) until the factor \(1/a\) becomes automatic.
After remediation, give a re‑diagnostic: "Evaluate \(\int (2e^{3x} + \frac{4}{x})\,dx\)" and check for the three errors.

## PREREQUISITE_NODE_IDS
c12_math_cbse_07_001, c11_math_cbse_13_006, c11_math_cbse_09_005, c12_math_cbse_07_002

## PREREQUISITE_REASONS
c12_math_cbse_07_001: Establishes integration as the inverse of differentiation, which is the logical basis for deriving standard integrals from known derivatives.
c11_math_cbse_13_006: Provides the intuitive idea of a derivative as a rate of change; needed to understand that integration reverses this process.
c11_math_cbse_09_005: Geometric progression introduces exponential growth patterns (constant ratio), building the conceptual foundation for exponential functions \(a^x\) before their calculus treatment.
c12_math_cbse_07_002: c12_math_cbse_07_001 -> c12_math_cbse_07_006 -> c12_math_cbse_07_002  

## FORWARD_NODE_IDS
c12_math_cbse_07_007, c12_math_cbse_07_009, c12_math_cbse_07_005

## FORWARD_REASONS
c12_math_cbse_07_007: Definite integrals apply the same antiderivatives with limits; the standard integrals are the first step in evaluating any definite integral involving exponentials or logarithms.
c12_math_cbse_07_009: The student should be able to compute indefinite integrals of standard forms (from nodes c12_math_cbse_07_001 to c12_math_cbse_07_006) and understand the geometric meaning of a definite integral as area (node c12_math_cbse_07_007).  
c12_math_cbse_07_005: c11_math_cbse_13_010 -> c12_math_cbse_07_005 -> c12_math_cbse_07_006  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_09_005, c11_math_cbse_13_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_09_005: Geometric progression models exponential growth/decay in economics (compound interest) and biology (population growth); the integral of \(a^x\) computes total accumulated growth over a continuous interval.
c11_math_cbse_13_006: The derivative concept from calculus is used in physics to relate velocity and displacement; exponential integrals appear in radioactive decay (\(N = N_0 e^{-\lambda t}\)) and charging/discharging capacitors.

## CHAIN_DESCRIPTION
c12_math_cbse_07_001 -> c12_math_cbse_07_006 -> c12_math_cbse_07_002

## THIS_FORMULA
\(\int e^x\,dx = e^x + C\); \(\int a^x\,dx = \frac{a^x}{\ln a} + C\ (a>0, a\neq 1)\); \(\int \frac{1}{x}\,dx = \ln|x| + C\)

## FORMULA_VARIABLES
\(x\) = variable of integration (real number, \(x \neq 0\) for \(1/x\)); \(a\) = constant base of exponential function (\(a>0, a\neq 1\)); \(C\) = arbitrary constant of integration.

## FORMULA_UNITS
dimensionless (pure mathematical functions; units depend on the applied context, e.g., mg, meters, rupees)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_09_005 | Geometric progression (exponential growth) is used in economics for compound interest calculations; the integral of \(a^x\) gives the continuous accumulation of interest.
c11_math_cbse_13_006 | Derivative as rate of change connects to physics: velocity is derivative of displacement; integrating exponential velocity (e.g., resistive motion) uses \(\int e^{kt}\,dt\).
## PREREQ_CONCEPT
Integration as the inverse of differentiation, and the derivatives of \(e^x\), \(a^x\), and \(\ln x\).

## PREREQ_BEFORE
The student must be able to differentiate \(e^x\), \(a^x\), and \(\ln x\) correctly, and understand the meaning of the constant of integration.

## PREREQ_STUCK
Review the derivatives of exponential and logarithmic functions from Class 12 Chapter 5 (Continuity and Differentiability) or the node c12_math_cbse_07_001 (Integration as Inverse of Differentiation).

## WORKED_EXAMPLE_1
PROBLEM: The rate of growth of a bacteria culture (in thousands per hour) is given by \(\frac{dP}{dt} = 200 e^{0.15t}\). If the initial population is 5000, find the population function \(P(t)\).

STEPS:
- Step 1: Identify that we need to integrate the rate function to get the population: \(P(t) = \int 200 e^{0.15t}\,dt\).
- Step 2: Factor out the constant: \(200 \int e^{0.15t}\,dt\).
- Step 3: Use the standard integral \(\int e^{kt}\,dt = \frac{1}{k}e^{kt}+C\) with \(k=0.15\): \(\int e^{0.15t}\,dt = \frac{1}{0.15}e^{0.15t}+C = \frac{20}{3}e^{0.15t}+C\).
- Step 4: Multiply by 200: \(P(t) = 200 \cdot \frac{20}{3}e^{0.15t} + C = \frac{4000}{3}e^{0.15t} + C\).
- Step 5: Apply initial condition \(P(0)=5\) (since population is in thousands): \(5 = \frac{4000}{3}e^{0} + C = \frac{4000}{3} + C \Rightarrow C = 5 - \frac{4000}{3} = \frac{15-4000}{3} = -\frac{3985}{3}\).
- Step 6: Write final answer: \(P(t) = \frac{4000}{3}e^{0.15t} - \frac{3985}{3}\) (in thousands).

REASONING: The problem translates a real‑world rate into an integral. The standard integral \(\int e^{kt}\,dt\) is used with a linear substitution (or directly with the factor \(1/k\)). The constant of integration is determined by the initial condition, a crucial step in applied problems.

ANSWER: \(P(t) = \frac{4000}{3}e^{0.15t} - \frac{3985}{3}\) thousand bacteria.

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(\int \left(\frac{5^x}{\ln 5} + \frac{3}{x} - 2e^x\right)\,dx\).

STEPS:
- Step 1: Split the integral using linearity: \(\int \frac{5^x}{\ln 5}\,dx + \int \frac{3}{x}\,dx - \int 2e^x\,dx\).
- Step 2: Recognise that \(\frac{5^x}{\ln 5}\) is already the standard antiderivative of \(5^x\), so its integral is \(\frac{5^x}{(\ln 5)^2}\)? Wait – careful! The integrand is \(\frac{5^x}{\ln 5}\), not \(5^x\). So \(\int \frac{5^x}{\ln 5}\,dx = \frac{1}{\ln 5}\int 5^x\,dx = \frac{1}{\ln 5}\cdot \frac{5^x}{\ln 5} = \frac{5^x}{(\ln 5)^2}\).
- Step 3: \(\int \frac{3}{x}\,dx = 3\ln|x|\).
- Step 4: \(\int 2e^x\,dx = 2e^x\).
- Step 5: Combine and add constant: \(\frac{5^x}{(\ln 5)^2} + 3\ln|x| - 2e^x + C\).

REASONING: This example tests whether the student distinguishes between the integrand \(a^x\) and its antiderivative \(\frac{a^x}{\ln a}\). The first term is already divided by \(\ln 5\), so integrating it introduces another factor of \(\frac{1}{\ln 5}\). The absolute value in \(\ln|x|\) is maintained.

ANSWER: \(\frac{5^x}{(\ln 5)^2} + 3\ln|x| - 2e^x + C\).

## WORKED_EXAMPLE_3
PROBLEM: Evaluate \(\int \frac{e^{2x}}{1+e^{2x}}\,dx\).

STEPS:
- Step 1: Observe that the derivative of the denominator \(1+e^{2x}\) is \(2e^{2x}\), which is a constant multiple of the numerator. This suggests the substitution \(u = 1+e^{2x}\).
- Step 2: Let \(u = 1+e^{2x}\). Then \(du = 2e^{2x}\,dx \Rightarrow e^{2x}\,dx = \frac{1}{2}du\).
- Step 3: Substitute: \(\int \frac{e^{2x}}{1+e^{2x}}\,dx = \int \frac{1}{u} \cdot \frac{1}{2}du = \frac{1}{2}\int \frac{1}{u}\,du\).
- Step 4: Apply the standard integral \(\int \frac{1}{u}\,du = \ln|u|+C\): \(\frac{1}{2}\ln|u|+C\).
- Step 5: Back‑substitute \(u = 1+e^{2x}\): \(\frac{1}{2}\ln(1+e^{2x})+C\). (Since \(1+e^{2x}>0\) always, absolute value is optional but good practice.)
- Step 6: Verify by differentiating: \(\frac{d}{dx}\left[\frac{1}{2}\ln(1+e^{2x})\right] = \frac{1}{2}\cdot \frac{1}{1+e^{2x}}\cdot 2e^{2x} = \frac{e^{2x}}{1+e^{2x}}\). Correct.

REASONING: This problem combines the exponential integral with the logarithmic integral via substitution. The key insight is recognising the numerator as (a constant times) the derivative of the denominator, which is a classic pattern for \(\int \frac{f'(x)}{f(x)}\,dx = \ln|f(x)|+C\).

ANSWER: \(\frac{1}{2}\ln(1+e^{2x}) + C\).

## COMPETENCY_QUESTION_1
QUESTION: A radioactive substance decays according to the differential equation \(\frac{dN}{dt} = -kN\), where \(N\) is the mass (in grams) at time \(t\) (in years) and \(k>0\) is a constant. If the initial mass is \(N_0\), find \(N(t)\). Then determine the half‑life \(T_{1/2}\) (the time when \(N = N_0/2\)) in terms of \(k\). Interpret the result.

COMPETENCY: Translating a real‑world situation into a mathematical model, solving a separable differential equation using standard integrals, and interpreting the physical meaning of the result.

STEPS:
- Step 1: Separate variables: \(\frac{dN}{N} = -k\,dt\).
- Step 2: Integrate both sides: \(\int \frac{1}{N}\,dN = \int -k\,dt \Rightarrow \ln|N| = -kt + C\).
- Step 3: Since mass is positive, \(|N|=N\). Exponentiate: \(N = e^{-kt+C} = e^C e^{-kt}\). Let \(e^C = N_0\) (initial mass at \(t=0\)).
- Step 4: So \(N(t) = N_0 e^{-kt}\).
- Step 5: For half‑life, set \(N = N_0/2\): \(\frac{N_0}{2} = N_0 e^{-k T_{1/2}} \Rightarrow \frac{1}{2} = e^{-k T_{1/2}} \Rightarrow \ln(1/2) = -k T_{1/2} \Rightarrow T_{1/2} = \frac{\ln 2}{k}\).

ANSWER: \(N(t) = N_0 e^{-kt}\); half‑life \(T_{1/2} = \frac{\ln 2}{k}\). The half‑life is inversely proportional to the decay constant \(k\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Evaluate \(\int e^x (\sin x + \cos x)\,dx\) **without** using integration by parts. (Hint: Recognise the integrand as the derivative of a product.)

COMPETENCY: Pattern recognition and reverse differentiation; connecting the product rule to integration.

STEPS:
- Step 1: Recall the product rule: \(\frac{d}{dx}[e^x \sin x] = e^x \sin x + e^x \cos x = e^x(\sin x + \cos x)\).
- Step 2: Therefore, the integrand is exactly the derivative of \(e^x \sin x\).
- Step 3: By the fundamental theorem of calculus, \(\int e^x(\sin x + \cos x)\,dx = e^x \sin x + C\).
- Step 4: Verify by differentiating the result: \(\frac{d}{dx}(e^x \sin x + C) = e^x \sin x + e^x \cos x = e^x(\sin x + \cos x)\). Matches.

ANSWER: \(e^x \sin x + C\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are a pharmacist calculating the total amount of a drug ______ into the bloodstream.

## DIAGNOSTIC_ANSWER_7
absorbed

Absorbed is the accumulator's job: rate integrated over time totals the drug that has entered the blood. **A wrong answer (remaining) reveals the student has answered the inventory question where the walkthrough totals the intake.** Absorbed is the total being sought: the rate integrated over the window lands on the cumulative drug in the blood.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a pharmacist ______ the total amount of a drug absorbed into the bloodstream.

## DIAGNOSTIC_ANSWER_8
calculating

The calculating verb is the pharmacist's shift: the totals exist to be computed, and the standard integral is the tool. **A wrong answer (prescribing) reveals the student has jumped from the maths to the medicine cabinet.** The calculating verb is the pharmacist's task: the totals exist to be computed from the decay rate by the standard integral.
