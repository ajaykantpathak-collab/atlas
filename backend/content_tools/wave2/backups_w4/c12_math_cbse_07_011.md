## ELI5
A car's velocity is two t over one plus t squared, and the distance over an hour is wanted: the numerator is the denominator's derivative, so substitute u equals one plus t squared, du equals two t dt, and change the limits with the variable - at t zero, u one; at t one, u two. The integral collapses to the log of u between one and two, which is log two. Changing the limits spares the back-substitution; the Fundamental Theorem and the chain rule stand behind the method.

## DEFINITION
Evaluation of a definite integral by substitution is a technique where the variable of integration \(x\) is replaced by a new variable \(t\) via a differentiable substitution \(x = g(t)\) (or \(t = h(x)\)), transforming the integral \(\int_a^b f(x)\,dx\) into \(\int_{g^{-1}(a)}^{g^{-1}(b)} f(g(t))\,g'(t)\,dt\). The limits of integration are changed accordingly to the new variable, the antiderivative is found in terms of \(t\), and the result is evaluated at the new upper and lower limits. This method relies on the chain rule and the Fundamental Theorem of Calculus.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly choose a substitution that simplifies the integrand, change the limits of integration to match the new variable, perform the integration in the new variable, and evaluate the definite integral without reverting to the original variable. The student can also identify when a substitution is appropriate and avoid common errors such as forgetting to change limits or mishandling the differential \(dx\).

## SCOPE_BOUNDARY
This node covers the method of substitution for definite integrals as per NCERT Class 12 Chapter 7 (Section 7.9). It includes changing limits directly, evaluating integrals with trigonometric, algebraic, and exponential functions. It does NOT cover improper integrals, integrals requiring multiple substitutions in one problem, or integrals where the substitution is not one-to-one on the interval (though such cases may appear in competitive exams, they are beyond the board scope).

## WALKTHROUGH
Imagine you are calculating the total distance traveled by a car whose velocity is given by \(v(t) = \frac{2t}{1+t^2}\) m/s from \(t=0\) to \(t=1\). The distance is \(\int_0^1 \frac{2t}{1+t^2}\,dt\). You notice the numerator \(2t\) is the derivative of the denominator \(1+t^2\). This suggests the substitution \(u = 1+t^2\). Start by writing the integral, then set \(u = 1+t^2\) so \(du = 2t\,dt\). Next, change the limits: when \(t=0\), \(u=1\); when \(t=1\), \(u=2\). The integral becomes \(\int_1^2 \frac{du}{u}\). Integrate to get \(\ln u\), then evaluate \(\ln 2 - \ln 1 = \ln 2\). The key insight is that changing limits avoids the extra step of back-substitution and reduces algebraic errors.

Takeaway first: substitution in definite integrals trades back-substitution for limit conversion - both limits must be translated into the new variable before evaluating. Exam moves: choice questions picking the substitution, limit-conversion questions, evaluation questions entirely in the new variable, and error questions on forgotten limits or mishandled differentials. Method: rerun the drive - spot the derivative pairing, build du, translate both limits, integrate the log, evaluate. Check yourself: evaluating in the new variable and then not converting the limits double-counts the translation; pick one convention and execute it fully. Drill: evaluate one definite integral by substitution with converted limits and once more by back-substitution, confirming agreement.

## DIAGNOSTIC_QUESTION_1
State the correct transformation of limits when evaluating \(\int_0^{\pi/2} \sin x \cos x\,dx\) using the substitution \(u = \sin x\).

## DIAGNOSTIC_ANSWER_1
When \(x = 0\), \(u = \sin 0 = 0\); when \(x = \pi/2\), \(u = \sin(\pi/2) = 1\). The new limits are \(0\) and \(1\). A wrong answer like keeping the original limits \(0\) to \(\pi/2\) reveals the student does not understand that the variable of integration has changed and limits must correspond to the new variable. Another error is using \(u = \cos x\) which would give limits \(1\) to \(0\) (reversed), indicating confusion about the direction of the substitution.

## DIAGNOSTIC_QUESTION_2
Explain why the substitution \(u = x^2\) is not directly valid for evaluating \(\int_{-1}^{1} x^3\,dx\) without splitting the interval, even though the integrand is an odd function and the integral is zero.

## DIAGNOSTIC_ANSWER_2
The substitution \(u = x^2\) is not one-to-one on \([-1, 1]\) because both \(x = 1\) and \(x = -1\) map to \(u = 1\), and \(x = 0\) maps to \(u = 0\). The differential \(du = 2x\,dx\) changes sign at \(x = 0\), so the integral must be split into \([-1,0]\) and \([0,1]\) to apply substitution correctly. A student who ignores this and writes limits \(u=1\) to \(u=1\) (getting zero) gets the right answer for the wrong reason; they miss the requirement that the substitution function must be invertible on the interval. This is a common competitive-exam trap.

## DIAGNOSTIC_QUESTION_3
Evaluate \(\int_0^1 \frac{x}{\sqrt{1+x^2}}\,dx\) using the substitution \(u = 1+x^2\). Show all steps including limit change.

## DIAGNOSTIC_ANSWER_3
Let \(u = 1+x^2\), then \(du = 2x\,dx\) so \(x\,dx = \frac{1}{2}du\). Limits: when \(x=0\), \(u=1\); when \(x=1\), \(u=2\). The integral becomes \(\int_1^2 \frac{1}{2} \frac{du}{\sqrt{u}} = \frac{1}{2} \int_1^2 u^{-1/2}\,du = \frac{1}{2} \left[ 2u^{1/2} \right]_1^2 = \left[ \sqrt{u} \right]_1^2 = \sqrt{2} - 1\). A wrong answer often comes from forgetting the factor \(1/2\) (giving \(2\sqrt{2}-2\)) or not changing limits and back-substituting incorrectly (e.g., writing \(\sqrt{1+x^2}\) evaluated from \(0\) to \(1\) but missing the factor). The correct answer is \(\sqrt{2}-1\).

## DIAGNOSTIC_QUESTION_4
Compare the two approaches for evaluating \(\int_0^{\pi/4} \tan x \sec^2 x\,dx\): (A) substitute \(u = \tan x\), (B) substitute \(u = \sec x\). Which is more efficient and why?

## DIAGNOSTIC_ANSWER_4
Both work, but (A) is more efficient. With \(u = \tan x\), \(du = \sec^2 x\,dx\), limits: \(x=0 \to u=0\), \(x=\pi/4 \to u=1\). Integral becomes \(\int_0^1 u\,du = \frac{1}{2}\). With \(u = \sec x\), \(du = \sec x \tan x\,dx\), the integrand \(\tan x \sec^2 x\,dx = \sec x \cdot \sec x \tan x\,dx = u\,du\), limits: \(x=0 \to u=1\), \(x=\pi/4 \to u=\sqrt{2}\). Integral becomes \(\int_1^{\sqrt{2}} u\,du = \frac{1}{2}(2-1) = \frac{1}{2}\). Approach (A) avoids square roots in limits and is simpler. A student who chooses (B) without recognizing the extra complexity shows lack of strategic thinking about substitution choice.

## DIAGNOSTIC_QUESTION_5
A student evaluates \(\int_0^1 \frac{2x}{1+x^2}\,dx\) as follows: "Let \(u = 1+x^2\), then \(du = 2x\,dx\). The integral becomes \(\int \frac{du}{u} = \ln|u| = \ln(1+x^2)\). Evaluating from 0 to 1 gives \(\ln 2 - \ln 1 = \ln 2\)." Identify the error in the student's working and explain why it is still accidentally correct in this case.

## DIAGNOSTIC_ANSWER_5
The error is that the student did not change the limits of integration when switching to \(u\); they kept the integral in terms of \(u\) but then back-substituted to \(x\) before evaluating. The correct method is to change limits: \(x=0 \to u=1\), \(x=1 \to u=2\), then evaluate \(\int_1^2 \frac{du}{u} = \ln 2 - \ln 1 = \ln 2\). The answer is accidentally correct because the back-substitution step recovered the original antiderivative. However, this habit leads to mistakes when the antiderivative in \(u\) is not easily back-substituted or when the limits are not symmetric. The student should be penalized in board exams for not following the prescribed method (changing limits).

## DIAGNOSTIC_QUESTION_6
Create a definite integral problem that requires the substitution \(u = \sin x\) and has a non-trivial limit change (i.e., not 0 to \(\pi/2\)). Provide the integral, the substitution steps, and the final answer.

## DIAGNOSTIC_ANSWER_6
Example: \(\int_{\pi/6}^{\pi/3} \frac{\cos x}{\sin^2 x}\,dx\). Let \(u = \sin x\), \(du = \cos x\,dx\). Limits: \(x=\pi/6 \to u=1/2\), \(x=\pi/3 \to u=\sqrt{3}/2\). Integral becomes \(\int_{1/2}^{\sqrt{3}/2} u^{-2}\,du = \left[ -u^{-1} \right]_{1/2}^{\sqrt{3}/2} = -\frac{2}{\sqrt{3}} + 2 = 2 - \frac{2}{\sqrt{3}}\). A good answer demonstrates correct limit change, integration of negative power, and simplification. A poor answer might forget the negative sign from \(u^{-2}\) integration or mishandle the fractional limits.

## COMMON_MISCONCEPTION
Students often forget to change the limits of integration when performing substitution, instead keeping the original \(x\)-limits and either back-substituting at the end or (worse) evaluating the antiderivative in \(u\) at the \(x\)-limits. For example, in \(\int_0^1 2x e^{x^2}\,dx\) with \(u=x^2\), they write \(\int_0^1 e^u\,du\) and then plug \(u=1\) and \(u=0\) (which accidentally works because the limits happen to be the same numerically) or they write \([e^{x^2}]_0^1\) without showing the limit change. The specific error is writing the new integral with the old limits: \(\int_0^1 e^u\,du\) instead of \(\int_0^1 e^u\,du\) with limits \(0\) and \(1\) (which are the same here) but in general \(\int_a^b f(g(x))g'(x)\,dx \neq \int_a^b f(u)\,du\). The limits must be \(g(a)\) and \(g(b)\). This mistake costs marks in board exams and leads to wrong answers in JEE when limits are not numerically equal.

## ON_FAILURE
If a student consistently forgets to change limits, have them practice the following drill: For each of five integrals, write the substitution \(u = g(x)\), compute \(du\), and explicitly write the new limits \(u_{\text{lower}} = g(a)\), \(u_{\text{upper}} = g(b)\) before writing the transformed integral. Then integrate and evaluate. Use integrals where \(g(a) \neq a\) and \(g(b) \neq b\) (e.g., \(\int_1^2 \frac{x}{x^2+1}\,dx\) with \(u=x^2+1\), limits become \(2\) and \(5\)). After the drill, give a diagnostic question where the limits change non-trivially and ask the student to explain why the limits changed. This builds the habit of limit transformation as a mandatory step.

## PREREQUISITE_NODE_IDS
c12_math_cbse_07_002, c12_math_cbse_07_008, c12_math_cbse_07_009, c12_math_cbse_07_010, c12_math_cbse_07_003, c12_math_cbse_07_007, c12_phy_cbse_02_003

## PREREQUISITE_REASONS
c12_math_cbse_07_002: Integration by substitution for indefinite integrals is the direct prerequisite; the same substitution techniques apply but with definite limits.
c12_math_cbse_07_008: Fundamental Theorem of Calculus Part 1 connects the area function to the antiderivative, justifying the evaluation step.
c12_math_cbse_07_009: Fundamental Theorem of Calculus Part 2 provides the formula \(F(b)-F(a)\) used to evaluate the definite integral after substitution.
c12_math_cbse_07_010: Properties of definite integrals (especially P3 and P4) are often used in conjunction with substitution to simplify integrals further.
c12_math_cbse_07_003: Substitution in definite integrals often transforms integrands into rational functions requiring partial fractions.  
c12_math_cbse_07_007: Evaluation by substitution changes variables in the definite integral, which is justified by the limit-of-sum definition under a change of partition.  
c12_phy_cbse_02_003: c12_phy_cbse_02_003 | Work done by a variable force: \(W = \int F(x)\,dx\) often requires substitution to evaluate definite integrals (e.g., spring force \(F = -kx\)).  

## FORWARD_NODE_IDS


## FORWARD_REASONS
N/A

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions (power rule) is needed to compute \(du/dx\) for algebraic substitutions.
c11_math_cbse_13_008: Derivative using first principles underpins the chain rule, which is the theoretical basis for the substitution method.

## CHAIN_DESCRIPTION
c12_math_cbse_07_002 -> c12_math_cbse_07_011 -> N/A

## THIS_FORMULA
\(\int_a^b f(g(x)) g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du\) where \(u = g(x)\)

## FORMULA_VARIABLES
\(a\) = lower limit of integration in \(x\); \(b\) = upper limit of integration in \(x\); \(g(x)\) = substitution function (differentiable and one-to-one on \([a,b]\)); \(f\) = integrand function; \(u\) = new variable of integration; \(g(a), g(b)\) = new limits of integration.

## FORMULA_UNITS
dimensionless (depends on the physical context of the integral; the integral inherits units of \(f(x) \times dx\))

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | Work done by a variable force: \(W = \int F(x)\,dx\) often requires substitution to evaluate definite integrals (e.g., spring force \(F = -kx\)).
 c12_chem_cbse_04_002 | Reaction kinetics: Integrated rate laws for second-order reactions involve integrals of the form \(\int \frac{dx}{(a-x)^2}\) which are evaluated using substitution.
## PREREQ_CONCEPT
The chain rule for differentiation and the Fundamental Theorem of Calculus.

## PREREQ_BEFORE
The student must be able to perform u-substitution for indefinite integrals and evaluate definite integrals using the Fundamental Theorem of Calculus.

## PREREQ_STUCK
Review the substitution method for indefinite integrals (c12_math_cbse_07_002) and practice changing limits with simple algebraic substitutions before attempting trigonometric or exponential ones.

## WORKED_EXAMPLE_1
PROBLEM: A particle moves along a straight line with velocity \(v(t) = \frac{3t^2}{(1+t^3)^2}\) m/s. Find the displacement from \(t = 0\) to \(t = 2\) seconds.
STEPS:
- Step 1: Displacement = \(\int_0^2 v(t)\,dt = \int_0^2 \frac{3t^2}{(1+t^3)^2}\,dt\).
- Step 2: Identify substitution: let \(u = 1+t^3\). Then \(du = 3t^2\,dt\).
- Step 3: Change limits: when \(t = 0\), \(u = 1+0 = 1\); when \(t = 2\), \(u = 1+8 = 9\).
- Step 4: Rewrite integral in \(u\): \(\int_1^9 \frac{du}{u^2} = \int_1^9 u^{-2}\,du\).
- Step 5: Integrate: \(\left[ -u^{-1} \right]_1^9 = -\frac{1}{9} - (-1) = 1 - \frac{1}{9} = \frac{8}{9}\).
REASONING: The numerator \(3t^2\) is exactly the derivative of the inner function \(1+t^3\), making the substitution \(u = 1+t^3\) natural. Changing limits directly to \(u\) avoids back-substitution and simplifies evaluation. The negative power integrates to \(-u^{-1}\), and evaluating at the new limits gives the displacement.
ANSWER: \(\frac{8}{9}\) m

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(\int_0^{\pi/4} \frac{\sin x + \cos x}{9 + 16 \sin 2x}\,dx\).
STEPS:
- Step 1: Recognize \(\sin 2x = 2\sin x\cos x\). The denominator is \(9 + 32\sin x\cos x\). Notice derivative of \(\sin x - \cos x\) is \(\cos x + \sin x\), which is the numerator. Let \(t = \sin x - \cos x\).
- Step 2: Then \(dt = (\cos x + \sin x)\,dx\). The numerator becomes \(dt\).
- Step 3: Express denominator in terms of \(t\): \(t^2 = \sin^2 x + \cos^2 x - 2\sin x\cos x = 1 - \sin 2x\), so \(\sin 2x = 1 - t^2\). Then \(9 + 16\sin 2x = 9 + 16(1 - t^2) = 25 - 16t^2\).
- Step 4: Change limits: when \(x = 0\), \(t = \sin 0 - \cos 0 = -1\); when \(x = \pi/4\), \(t = \sin(\pi/4) - \cos(\pi/4) = \frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2} = 0\).
- Step 5: Integral becomes \(\int_{-1}^0 \frac{dt}{25 - 16t^2} = \int_{-1}^0 \frac{dt}{5^2 - (4t)^2}\).
- Step 6: Use standard integral \(\int \frac{dx}{a^2 - x^2} = \frac{1}{2a} \ln \left|\frac{a+x}{a-x}\right|\). Here \(a=5\), \(x=4t\), so \(dx = 4\,dt\) → \(dt = \frac{dx}{4}\). But we can directly apply formula: \(\int \frac{dt}{25 - 16t^2} = \frac{1}{2 \cdot 5 \cdot 4} \ln \left|\frac{5+4t}{5-4t}\right| = \frac{1}{40} \ln \left|\frac{5+4t}{5-4t}\right|\).
- Step 7: Evaluate from \(-1\) to \(0\): \(\frac{1}{40} \left[ \ln \left|\frac{5+0}{5-0}\right| - \ln \left|\frac{5-4}{5+4}\right| \right] = \frac{1}{40} \left[ \ln 1 - \ln \left(\frac{1}{9}\right) \right] = \frac{1}{40} (0 + \ln 9) = \frac{\ln 9}{40} = \frac{\ln 3}{20}\).
REASONING: The substitution \(t = \sin x - \cos x\) is chosen because its derivative matches the numerator. The denominator is then expressed in terms of \(t\) using the identity \(\sin 2x = 1 - (\sin x - \cos x)^2\). This transforms the integral into a standard rational form. The limits change from \(x\) to \(t\) correctly, and the integral is evaluated using the logarithmic form of the inverse hyperbolic tangent (or partial fractions).
ANSWER: \(\frac{\ln 3}{20}\)

## WORKED_EXAMPLE_3
PROBLEM: Evaluate \(\int_0^1 \frac{x e^{x^2}}{(1+e^{x^2})^2}\,dx\).
STEPS:
- Step 1: Observe the integrand: \(x e^{x^2}\) in numerator, \((1+e^{x^2})^2\) in denominator. The derivative of \(e^{x^2}\) is \(2x e^{x^2}\), so let \(u = 1 + e^{x^2}\).
- Step 2: Then \(du = 2x e^{x^2}\,dx\), so \(x e^{x^2}\,dx = \frac{1}{2} du\).
- Step 3: Change limits: when \(x = 0\), \(u = 1 + e^0 = 2\); when \(x = 1\), \(u = 1 + e^1 = 1+e\).
- Step 4: Integral becomes \(\int_2^{1+e} \frac{1}{2} \frac{du}{u^2} = \frac{1}{2} \int_2^{1+e} u^{-2}\,du\).
- Step 5: Integrate: \(\frac{1}{2} \left[ -u^{-1} \right]_2^{1+e} = -\frac{1}{2} \left( \frac{1}{1+e} - \frac{1}{2} \right) = \frac{1}{2} \left( \frac{1}{2} - \frac{1}{1+e} \right)\).
- Step 6: Simplify: \(\frac{1}{4} - \frac{1}{2(1+e)} = \frac{1+e - 2}{4(1+e)} = \frac{e-1}{4(1+e)}\).
REASONING: The substitution \(u = 1+e^{x^2}\) captures the composite function in the denominator and its derivative appears in the numerator up to a constant factor. Changing limits directly to \(u\) yields a simple power integral. The final expression is simplified by combining fractions.
ANSWER: \(\frac{e-1}{4(1+e)}\)

## COMPETENCY_QUESTION_1
QUESTION: The rate of change of temperature in a rod is given by \(\frac{dT}{dx} = \frac{2x}{(1+x^2)^2}\) °C/m, where \(x\) is the distance in meters from one end. If the temperature at \(x=0\) is 20°C, find the temperature at \(x=1\) m. Also, explain why the substitution \(u = 1+x^2\) is appropriate here.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Temperature difference \(T(1) - T(0) = \int_0^1 \frac{2x}{(1+x^2)^2}\,dx\).
- Step 2: Use substitution \(u = 1+x^2\), \(du = 2x\,dx\). Limits: \(x=0 \to u=1\); \(x=1 \to u=2\).
- Step 3: Integral becomes \(\int_1^2 u^{-2}\,du = \left[ -u^{-1} \right]_1^2 = -\frac{1}{2} + 1 = \frac{1}{2}\).
- Step 4: \(T(1) = T(0) + \frac{1}{2} = 20.5\) °C.
- Step 5: Justification: The numerator is the derivative of the inner function \(1+x^2\), making the substitution natural and the integrand a simple power of \(u\).
ANSWER: Temperature at \(x=1\) m is 20.5°C. The substitution works because \(du = 2x\,dx\) exactly matches the numerator.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Evaluate \(\int_0^{\pi/2} \frac{\sin x \cos x}{\sqrt{1 + \sin^4 x}}\,dx\). (Hint: Use substitution \(u = \sin^2 x\).) Then, using the result, find the value of \(\int_0^{\pi/2} \frac{\sin x \cos x}{\sqrt{1 + \cos^4 x}}\,dx\) without performing a new integration. Explain the symmetry used.
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: Let \(u = \sin^2 x\), then \(du = 2\sin x \cos x\,dx\). Limits: \(x=0 \to u=0\); \(x=\pi/2 \to u=1\). Integral \(I = \int_0^1 \frac{du/2}{\sqrt{1+u^2}} = \frac{1}{2} \int_0^1 \frac{du}{\sqrt{1+u^2}}\).
- Step 2: \(\int \frac{du}{\sqrt{1+u^2}} = \ln|u + \sqrt{1+u^2}|\). Evaluate: \(\frac{1}{2} \left[ \ln(u + \sqrt{1+u^2}) \right]_0^1 = \frac{1}{2} \ln(1+\sqrt{2})\).
- Step 3: For the second integral, use substitution \(x \to \frac{\pi}{2} - x\). Then \(\sin x \to \cos x\), \(\cos x \to \sin x\), \(dx \to -dx\), limits swap: \(0 \to \pi/2\), \(\pi/2 \to 0\). The integral becomes \(\int_{\pi/2}^0 \frac{\cos x \sin x}{\sqrt{1+\cos^4 x}} (-dx) = \int_0^{\pi/2} \frac{\sin x \cos x}{\sqrt{1+\cos^4 x}}\,dx\), which is exactly the same form as the first integral with \(\sin\) and \(\cos\) swapped. But the original integral is symmetric under this swap because the integration limits are symmetric. Hence the value is the same: \(\frac{1}{2} \ln(1+\sqrt{2})\).
ANSWER: Both integrals equal \(\frac{1}{2} \ln(1+\sqrt{2})\).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This method relies on the chain rule and the ______ Theorem of Calculus.

## DIAGNOSTIC_ANSWER_7
Fundamental

Fundamental names the theorem: the evaluation licence at the end of every substitution belongs to the Fundamental Theorem of Calculus. **A wrong answer (any qualifying adjective) reveals the student has left the theorem unnamed where the method's legality is certified.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The key insight is that changing limits avoids the extra step of back-______ and reduces algebraic errors.

## DIAGNOSTIC_ANSWER_8
substitution

Back-substitution is the step the converted limits delete: evaluate in u at u-limits and the return trip to x never happens. **A wrong answer (differentiating) reveals the student has misread the deleted step as a calculus operation rather than a variable renaming.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly choose a substitution that simplifies the integrand, change the limits of integration to match the new variable, perform the integration in the new variable, and evaluate the definite integral without reverting to the original variable.
