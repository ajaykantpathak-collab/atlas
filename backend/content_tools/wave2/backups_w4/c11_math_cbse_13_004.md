## ELI5
A toy car's position runs s(t) = t^3 - 4t + 5, and the average-velocity formula collapses to 0/0 at t = 2. Polynomials behave best: their limit is just direct substitution, p(a). Rational functions allow substitution wherever the denominator is alive; when both numerator and denominator die at a, factorise, cancel the shared (x - a), then substitute. Continuity is the licence - polynomials carry it everywhere.

## DEFINITION
The limit of a polynomial function \(p(x)\) as \(x\) approaches \(a\) is simply \(p(a)\), obtained by direct substitution. For a rational function \(f(x) = \frac{p(x)}{q(x)}\), if \(q(a) \neq 0\), the limit is \(\frac{p(a)}{q(a)}\) by direct substitution; if \(q(a) = 0\) and \(p(a) = 0\), the limit is evaluated by factorising numerator and denominator, cancelling the common factor \((x-a)\), and then substituting \(x = a\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can evaluate limits of polynomial functions by direct substitution, evaluate limits of rational functions by identifying and resolving the 0/0 indeterminate form through factorisation and cancellation, and apply the standard limit \(\lim_{x \to a} \frac{x^n - a^n}{x - a} = n a^{n-1}\) to solve related problems.

## SCOPE_BOUNDARY
Covers evaluation of limits for polynomial functions and rational functions (including those requiring factorisation to resolve 0/0 form) and the standard limit formula for \(\frac{x^n - a^n}{x - a}\). Does NOT cover limits of trigonometric functions, exponential/logarithmic functions, limits at infinity, or L'Hôpital's rule.

## WALKTHROUGH
Imagine you're calculating the instantaneous speed of a toy car at exactly 2 seconds, given its position function \(s(t) = t^3 - 4t + 5\). You need the limit of the average velocity as the time interval shrinks to zero — this leads to a rational function where direct substitution gives 0/0. Start by writing the limit expression \(\lim_{x \to a} f(x)\). For polynomials, simply replace \(x\) with \(a\). For rational functions, first try direct substitution; if you get a non-zero number, that's your answer. If you get 0/0, factorise numerator and denominator, cancel the common \((x-a)\) factor, then substitute. The key insight: polynomials are continuous everywhere, so their limits equal their function values; rational functions are continuous wherever the denominator is non-zero.

Takeaway: mastery means substituting first, recognising the 0/0 verdict, and factorising with cancellation before a second substitution. Exam moves: evaluate-the-limit questions and apply-the-standard-limit items with (x^n - a^n)/(x - a) = n times a^(n-1). Check yourself: confirm both parts vanish at a before cancelling anything - the flagged mix-up is cancelling a factor that only one side owns. Students miss it because they treat rational functions as polynomials, when the definition splits on the denominator: alive at a means substitute, dead at a means factor, and the cancellation is what resurrects the limit.

## DIAGNOSTIC_QUESTION_1
What is \(\lim_{x \to 3} (2x^2 - 5x + 7)\)?

## DIAGNOSTIC_ANSWER_1
The limit is \(2(3)^2 - 5(3) + 7 = 18 - 15 + 7 = 10\). A wrong answer (e.g., 22 or 4) reveals the student either misapplied the power (computing \(2 \times 3^2\) as 36 instead of 18) or forgot to substitute \(x = 3\) into every term, indicating they don't fully grasp that polynomial limits equal the function value at that point.

## DIAGNOSTIC_QUESTION_2
Why can we evaluate \(\lim_{x \to 2} \frac{x^2 - 4}{x - 2}\) by cancelling \((x-2)\) even though the original function is undefined at \(x = 2\)?

## DIAGNOSTIC_ANSWER_2
The limit depends on values of \(x\) *near* 2, not *at* 2. For all \(x \neq 2\), \(\frac{x^2 - 4}{x - 2} = \frac{(x-2)(x+2)}{x-2} = x+2\). Since the simplified expression \(x+2\) is continuous at \(x=2\), the limit equals \(2+2=4\). A wrong answer (e.g., "the limit doesn't exist because division by zero") reveals the student confuses the function's value at a point with its limit, not understanding that limits ignore the point itself.

## DIAGNOSTIC_QUESTION_3
Evaluate \(\lim_{x \to -1} \frac{x^3 + 1}{x + 1}\).

## DIAGNOSTIC_ANSWER_3
Direct substitution gives \(\frac{0}{0}\). Factorise numerator using sum of cubes: \(x^3 + 1 = (x+1)(x^2 - x + 1)\). Cancel \((x+1)\): limit \(= \lim_{x \to -1} (x^2 - x + 1) = (-1)^2 - (-1) + 1 = 1 + 1 + 1 = 3\). A wrong answer (e.g., 1 or "does not exist") reveals the student either cannot factorise \(x^3 + 1\) correctly or fails to recognise the 0/0 form as a signal to factorise.

## DIAGNOSTIC_QUESTION_4
Compare the methods for evaluating \(\lim_{x \to 2} \frac{x^2 - 4}{x - 2}\) and \(\lim_{x \to 2} \frac{x^2 - 4}{x - 3}\). What fundamental difference determines the approach?

## DIAGNOSTIC_ANSWER_4
For the first, direct substitution gives 0/0 (indeterminate), requiring factorisation and cancellation. For the second, direct substitution gives \(\frac{0}{-1} = 0\) (determinate), so the limit is 0 immediately. The difference is whether the denominator vanishes at the limit point. A wrong answer (e.g., "both need factorisation") reveals the student applies factorisation mechanically without checking if the denominator is actually zero, showing lack of conceptual understanding of when 0/0 occurs.

## DIAGNOSTIC_QUESTION_5
A student evaluates \(\lim_{x \to 3} \frac{x^2 - 9}{x - 3}\) as follows: "Substitute \(x = 3\): \(\frac{9 - 9}{3 - 3} = \frac{0}{0} = 0\)." Is this correct? Explain the error.

## DIAGNOSTIC_ANSWER_5
Incorrect. \(\frac{0}{0}\) is an **indeterminate form**, not equal to 0. It means the limit cannot be determined by direct substitution alone — further algebraic manipulation (factorisation) is needed. The correct limit is \(\lim_{x \to 3} (x+3) = 6\). This error reveals the student treats 0/0 as a numerical value rather than a signal that the expression needs simplification, a critical misconception about indeterminate forms.

## DIAGNOSTIC_QUESTION_6
Create a rational function \(f(x) = \frac{p(x)}{q(x)}\) where \(p(x)\) and \(q(x)\) are polynomials of degree 2, such that \(\lim_{x \to 2} f(x) = 5\) but \(f(2)\) is undefined.

## DIAGNOSTIC_ANSWER_6
Example: \(f(x) = \frac{(x-2)(x+3)}{x-2} = \frac{x^2 + x - 6}{x - 2}\). For \(x \neq 2\), \(f(x) = x+3\), so \(\lim_{x \to 2} f(x) = 5\), but \(f(2)\) is undefined (division by zero). A poor answer (e.g., \(\frac{x^2 - 4}{x - 2}\) giving limit 4) reveals the student cannot reverse-engineer the limit value to construct the numerator, showing they don't fully grasp the relationship between the cancelled factor and the resulting limit.

## COMMON_MISCONCEPTION
Students cancel \((x-a)\) factors **before** confirming that both numerator and denominator are zero at \(x = a\). For example, in \(\lim_{x \to 2} \frac{x^2 - 5x + 6}{x - 3}\), they factorise numerator as \((x-2)(x-3)\) and cancel \((x-3)\), getting limit \(= 0\). But direct substitution gives \(\frac{0}{-1} = 0\) — no cancellation was needed, and the cancelled factor \((x-3)\) wasn't a common zero! The error: blindly factorising and cancelling without first checking if the limit is actually in 0/0 form.

## ON_FAILURE
If a student cancels without verifying 0/0: (1) Make them always write "Direct substitution gives ___" as Step 1. (2) If the result is a number (including 0), STOP — that's the limit. (3) Only if it's 0/0 or ∞/∞, proceed to factorise. (4) Practice with mixed sets where some limits are determinate and some are 0/0, forcing the decision step. (5) Emphasise: "Cancelling changes the function's domain; only do it when the original limit is indeterminate."

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_001, c11_math_cbse_13_002, c9_math_ch4_7, c9_math_ch4_8, c10_math_cbse_02_007
## PREREQUISITE_REASONS
c11_math_cbse_13_001: Provides the intuitive foundation of what a limit means (approaching a value).
c11_math_cbse_13_002: Covers algebraic manipulation techniques (factorisation, rationalisation) needed to resolve indeterminate forms.
c9_math_ch4_7: Factorisation of quadratic expressions by splitting the middle term — essential for factorising polynomials in rational functions.
c9_math_ch4_8: Factorisation using algebraic identities (difference of squares, sum/difference of cubes) — needed for higher-degree polynomials.
c10_math_cbse_02_007: Division algorithm for polynomials — provides the theoretical basis for why \((x-a)\) is a factor when \(p(a)=0\).

## FORWARD_NODE_IDS
c11_math_cbse_13_005, c11_math_cbse_13_008, c11_math_cbse_13_006, c12_math_cbse_05_001, c12_math_cbse_05_002, c12_math_cbse_08_001

## FORWARD_REASONS
c11_math_cbse_13_005: Limits at infinity extend the techniques of polynomial/rational limits to end behaviour, using the same factorisation and leading-term analysis.
c11_math_cbse_13_008: Derivative by first principle \(\lim_{h \to 0} \frac{f(x+h)-f(x)}{h}\) is fundamentally a limit of a rational function (often 0/0), directly applying the factorisation skills from this node.
c11_math_cbse_13_006: Limits of polynomial/rational functions provides algebraic techniques to evaluate derivative limits  
c12_math_cbse_05_001: Limits of polynomial and rational functions are the most common types checked for continuity.  
c12_math_cbse_05_002: covers limits of polynomial and rational functions, the most common pieces in Class 12 continuity problems.  
c12_math_cbse_08_001: Limits of polynomial and rational functions are needed to evaluate the definite integral algebraically.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_eco_cbse_02_004
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: Instantaneous velocity and acceleration are defined as limits of average velocity/acceleration — rational functions where \(h \to 0\) creates 0/0 forms requiring the same algebraic resolution.
c11_economics_ch2_4: Marginal cost and marginal revenue are derivatives (limits of difference quotients) of polynomial cost/revenue functions, directly using limit evaluation of rational functions.
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_004: Cross-subject support: Land reforms refer to deliberate policy measures to change the ownership, tenancy, and man... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_13_002 -> c11_math_cbse_13_004 -> c11_math_cbse_13_008

## THIS_FORMULA
For polynomial \(p(x)\): \(\lim_{x \to a} p(x) = p(a)\). For rational function \(\frac{p(x)}{q(x)}\): if \(q(a) \neq 0\), \(\lim_{x \to a} \frac{p(x)}{q(x)} = \frac{p(a)}{q(a)}\); if \(p(a)=0\) and \(q(a)=0\), \(\lim_{x \to a} \frac{p(x)}{q(x)} = \lim_{x \to a} \frac{p(x)/(x-a)}{q(x)/(x-a)}\). Standard limit: \(\lim_{x \to a} \frac{x^n - a^n}{x - a} = n a^{n-1}\).

## FORMULA_VARIABLES
\(p(x), q(x)\) = polynomial functions; \(a\) = the point at which limit is evaluated; \(n\) = positive integer; \(x\) = variable approaching \(a\).

## FORMULA_UNITS
dimensionless (limits are pure numbers; if applied to physics, units come from the function's units)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Instantaneous velocity \(v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t}\) is a limit of a rational function in \(\Delta t\); polynomial position functions yield 0/0 forms resolved by factorisation.
c11_economics_ch2_4 | Marginal cost \(MC = \lim_{\Delta q \to 0} \frac{C(q+\Delta q) - C(q)}{\Delta q}\) for polynomial cost function \(C(q)\) is a rational function limit; the algebraic techniques are identical.

## PREREQ_CONCEPT
Factorisation of polynomials and the Factor Theorem: if \(p(a) = 0\), then \((x-a)\) is a factor of \(p(x)\).

## PREREQ_BEFORE
Student must be able to factorise quadratic and cubic polynomials using identities (\(a^2-b^2\), \(a^3\pm b^3\)) and splitting the middle term, and must understand that a rational function is undefined where its denominator is zero.

## PREREQ_STUCK
If stuck, revisit Class 9 factorisation (c9_math_ch4_7, c9_math_ch4_8) and Class 10 polynomial division (c10_math_cbse_02_007) to practise factorising \(x^n - a^n\) and general polynomials when given a known root.

## WORKED_EXAMPLE_1
PROBLEM: The position of a particle (in metres) at time \(t\) seconds is given by \(s(t) = t^3 - 6t^2 + 9t\). Find the instantaneous velocity at \(t = 2\) seconds using the limit definition \(v = \lim_{h \to 0} \frac{s(t+h) - s(t)}{h}\).

STEPS:
- Step 1: Write the difference quotient for \(t = 2\): \(v = \lim_{h \to 0} \frac{s(2+h) - s(2)}{h}\).
- Step 2: Compute \(s(2+h) = (2+h)^3 - 6(2+h)^2 + 9(2+h) = (8 + 12h + 6h^2 + h^3) - 6(4 + 4h + h^2) + 18 + 9h = 8 + 12h + 6h^2 + h^3 - 24 - 24h - 6h^2 + 18 + 9h = (8-24+18) + (12-24+9)h + (6-6)h^2 + h^3 = 2 - 3h + h^3\).
- Step 3: Compute \(s(2) = 2^3 - 6(2)^2 + 9(2) = 8 - 24 + 18 = 2\).
- Step 4: Form the numerator: \(s(2+h) - s(2) = (2 - 3h + h^3) - 2 = -3h + h^3 = h(-3 + h^2)\).
- Step 5: Write the limit: \(v = \lim_{h \to 0} \frac{h(-3 + h^2)}{h} = \lim_{h \to 0} (-3 + h^2) = -3\).
- Step 6: Interpret: The instantaneous velocity at \(t = 2\) s is \(-3\) m/s (negative means moving backward).

REASONING: The difference quotient for a polynomial position function always yields a rational function in \(h\) that gives 0/0 at \(h=0\). Factorising \(h\) from the numerator (which is guaranteed by \(s(t+h)-s(t)\) having zero constant term) cancels the denominator, leaving a polynomial in \(h\) whose limit is found by direct substitution.

ANSWER: \(-3\) m/s

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(\lim_{x \to 2} \frac{x^5 - 32}{x - 2}\) using the standard limit formula, and verify by factorisation.

STEPS:
- Step 1: Recognise the form \(\frac{x^n - a^n}{x - a}\) with \(n = 5\), \(a = 2\).
- Step 2: Apply the standard limit formula: \(\lim_{x \to a} \frac{x^n - a^n}{x - a} = n a^{n-1}\).
- Step 3: Substitute \(n = 5\), \(a = 2\): limit \(= 5 \times 2^{4} = 5 \times 16 = 80\).
- Step 4: Verify by factorisation: \(x^5 - 32 = x^5 - 2^5 = (x-2)(x^4 + 2x^3 + 4x^2 + 8x + 16)\) (using \(a^n - b^n\) factorisation).
- Step 5: Cancel \((x-2)\): \(\frac{x^5 - 32}{x - 2} = x^4 + 2x^3 + 4x^2 + 8x + 16\) for \(x \neq 2\).
- Step 6: Evaluate at \(x = 2\): \(16 + 16 + 16 + 16 + 16 = 80\). Both methods agree.

REASONING: The standard limit \(\lim_{x \to a} \frac{x^n - a^n}{x - a} = n a^{n-1}\) is derived from the factorisation \(x^n - a^n = (x-a)(x^{n-1} + a x^{n-2} + \dots + a^{n-1})\). It provides a shortcut for limits of this specific form, avoiding lengthy polynomial division. Verification by factorisation confirms the formula's correctness and reinforces the algebraic structure.

ANSWER: 80

## WORKED_EXAMPLE_3
PROBLEM: Find constants \(a\) and \(b\) such that \(\lim_{x \to 1} \frac{x^3 + ax^2 + bx + 6}{x^2 - 3x + 2} = 4\).

STEPS:
- Step 1: For the limit to exist finitely at \(x = 1\) where denominator is zero, numerator must also be zero at \(x = 1\) (otherwise limit would be infinite).
- Step 2: Set numerator at \(x = 1\) to zero: \(1^3 + a(1)^2 + b(1) + 6 = 0 \Rightarrow 1 + a + b + 6 = 0 \Rightarrow a + b = -7\). (Equation 1)
- Step 3: Factorise denominator: \(x^2 - 3x + 2 = (x-1)(x-2)\). Since \(x=1\) is a root, \((x-1)\) must be a factor of numerator.
- Step 4: Perform polynomial division of numerator by \((x-1)\) using synthetic division or factor theorem. Let \(p(x) = x^3 + ax^2 + bx + 6\). Since \(p(1)=0\), \(p(x) = (x-1)(x^2 + (a+1)x + (a+b+1))\).
- Step 5: Cancel \((x-1)\): \(\frac{p(x)}{(x-1)(x-2)} = \frac{x^2 + (a+1)x + (a+b+1)}{x-2}\) for \(x \neq 1\).
- Step 6: Take limit as \(x \to 1\): \(\frac{1 + (a+1) + (a+b+1)}{1-2} = \frac{2a + b + 3}{-1} = -(2a + b + 3)\).
- Step 7: Set this equal to 4: \(-(2a + b + 3) = 4 \Rightarrow 2a + b = -7\). (Equation 2)
- Step 8: Solve Equations 1 and 2: \(a + b = -7\) and \(2a + b = -7\). Subtract: \(a = 0\), then \(b = -7\).
- Step 9: Verify: Numerator \(= x^3 - 7x + 6 = (x-1)(x^2 + x - 6) = (x-1)(x+3)(x-2)\). Denominator \(= (x-1)(x-2)\). Cancel \((x-1)(x-2)\): limit \(= \lim_{x \to 1} (x+3) = 4\). Correct.

REASONING: This problem combines the concept that a finite limit at a denominator zero requires a matching numerator zero (Factor Theorem), with the algebraic technique of cancelling common factors and equating the resulting limit to the given value. It tests deep understanding of why factorisation works and how to reverse-engineer coefficients.

ANSWER: \(a = 0\), \(b = -7\)

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "For any rational function \(\frac{p(x)}{q(x)}\), if \(q(a) = 0\) then the limit \(\lim_{x \to a} \frac{p(x)}{q(x)}\) does not exist." Give a counterexample to disprove this claim, and explain the precise condition under which the limit exists finitely.

COMPETENCY: Error identification and correction

STEPS:
- Step 1: Identify the claim's flaw — it assumes denominator zero always means infinite/non-existent limit.
- Step 2: Construct a counterexample where both numerator and denominator are zero at \(x = a\).
- Step 3: Show the limit exists after cancellation.
- Step 4: State the precise condition: limit exists finitely iff the zero of the denominator is cancelled by a zero of the numerator of at least the same multiplicity.

ANSWER: Counterexample: \(\lim_{x \to 2} \frac{x^2 - 4}{x - 2}\). Here \(q(2) = 0\) but \(p(2) = 0\) too. Factorising: \(\frac{(x-2)(x+2)}{x-2} = x+2\) for \(x \neq 2\), so limit \(= 4\). The claim is false because it ignores the 0/0 indeterminate form where common factors cancel. The precise condition: if \(q(a) = 0\) and \(p(a) = 0\), and after cancelling all common \((x-a)\) factors the denominator is non-zero at \(x=a\), the limit exists finitely. If the denominator's zero has higher multiplicity than the numerator's, the limit is infinite (does not exist finitely).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The cost function (in rupees) for producing \(x\) units of a product is \(C(x) = 2x^3 - 15x^2 + 36x + 100\). The marginal cost at production level \(x = 3\) is defined as \(MC = \lim_{h \to 0} \frac{C(3+h) - C(3)}{h}\). Find the marginal cost at \(x = 3\) and interpret its meaning. Then, explain why the same result is obtained by differentiating \(C(x)\) and evaluating at \(x = 3\).

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Write the difference quotient for marginal cost at \(x = 3\).
- Step 2: Compute \(C(3+h)\) by expanding \((3+h)^3\) and \((3+h)^2\).
- Step 3: Compute \(C(3)\).
- Step 4: Form the numerator \(C(3+h) - C(3)\), factor out \(h\), cancel with denominator.
- Step 5: Take limit as \(h \to 0\).
- Step 6: Interpret the result as the approximate cost of producing the 4th unit.
- Step 7: Explain connection to derivative: the limit definition IS the derivative, so \(MC = C'(3)\).

ANSWER: \(C(3+h) = 2(27+27h+9h^2+h^3) - 15(9+6h+h^2) + 36(3+h) + 100 = 54+54h+18h^2+2h^3 - 135-90h-15h^2 + 108+36h + 100 = (54-135+108+100) + (54-90+36)h + (18-15)h^2 + 2h^3 = 127 + 0h + 3h^2 + 2h^3\). \(C(3) = 54 - 135 + 108 + 100 = 127\). Numerator \(= 3h^2 + 2h^3 = h(3h + 2h^2)\). Limit \(= \lim_{h \to 0} (3h + 2h^2) = 0\). Marginal cost at \(x=3\) is ₹0. This means at 3 units, the cost is momentarily not changing — it's a stationary point of the cost function. \(C'(x) = 6x^2 - 30x + 36\), so \(C'(3) = 54 - 90 + 36 = 0\). The limit definition of marginal cost IS the derivative; the algebraic limit process we performed is exactly how the derivative is computed from first principles.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: You need the limit of the average velocity as the time interval shrinks to zero — this leads to a rational function where direct ______ gives 0/0.

## DIAGNOSTIC_ANSWER_7
substitution

**A wrong answer ("factorisation" or "guessing") reveals the student has swapped the walkthrough's noun - the rational function collapses under direct substitution.** Substitution is the walkthrough's own noun, and the noun is what the blank grades. Recall the 0/0 verdict at t = 2 before filling, and give the noun exactly.
