## ELI5
A metro card's balance should fall smoothly - the moment a machine docks an extra fifty at one station, the graph tears: you cannot draw it without lifting your pen. Continuity at a point is precisely the absence of that tear: the limit as you approach equals the value when you arrive. Three conditions, really - the value exists, the two-sided limit exists, and the two agree. Continuous on an interval means no tear anywhere, with one-sided checks at the endpoints.

## DEFINITION
A real-valued function \(f\) is **continuous at a point** \(c\) in its domain if \(\lim_{x \to c} f(x) = f(c)\). This requires three conditions: (i) \(f(c)\) is defined, (ii) \(\lim_{x \to c} f(x)\) exists (i.e., left-hand limit equals right-hand limit), and (iii) the limit equals the function value. A function is **continuous on an interval** if it is continuous at every point of that interval; for endpoints, the appropriate one-sided limit must equal the function value.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can: (1) state the three conditions for continuity at a point and verify them for any given function (polynomial, rational, piecewise, trigonometric) at a specific point; (2) identify points of discontinuity and classify them as removable, jump, or infinite by analysing left-hand limit, right-hand limit, and function value; (3) find unknown parameters in a piecewise function to make it continuous at a given point.

## SCOPE_BOUNDARY
This node covers the definition of continuity at a point, continuity on an interval, and algebraic verification of continuity for elementary functions (polynomials, rational, trigonometric, absolute value, greatest integer). It does **not** cover algebra of continuous functions (sum/difference/product/quotient/composition) — that is node `c12_math_cbse_05_003` — nor differentiability (node `c12_math_cbse_05_004` onward).

## WALKTHROUGH
Imagine a prepaid metro card: you tap in, the balance decreases smoothly as you travel, but if the machine malfunctions and suddenly deducts ₹50 extra at a specific station, the balance function "jumps" — you cannot draw its graph without lifting your pen. That jump is a discontinuity. To analyse it mathematically, we first recall from Class 11 (`c11_math_cbse_13_001`–`c11_math_cbse_13_005`) how to find left-hand and right-hand limits. Write down the function, pick the point \(c\), compute \(f(c)\), then compute \(\lim_{x \to c^-} f(x)\) and \(\lim_{x \to c^+} f(x)\). If all three are equal, the function is continuous at \(c\); otherwise it is discontinuous. The key insight: **continuity is exactly the equality of the limit and the function value**.

Takeaway first: continuity is one equation - limit equals value - wearing three conditions, and discontinuity is any of the three failing. Exam moves: verification questions at a point for any function type, classification questions labelling removable, jump or infinite discontinuities, and parameter questions tuning a piecewise function to continuous. Method: rerun the card - compute the value, then both one-sided limits, and compare all three numbers before pronouncing. Check yourself: the two one-sided limits matching is not enough; the function's actual value must join them or a hole remains. Drill: test one piecewise function at its joint, then find the parameter that would heal it.

## DIAGNOSTIC_QUESTION_1
State the three conditions that must hold for a function \(f\) to be continuous at \(x = c\).

## DIAGNOSTIC_ANSWER_1
The three conditions are: (1) \(f(c)\) is defined, (2) \(\lim_{x \to c} f(x)\) exists (i.e., \(\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x)\)), and (3) \(\lim_{x \to c} f(x) = f(c)\). A wrong answer that omits condition (1) or (2) reveals the student thinks continuity only requires the limit to equal the function value, ignoring that the limit must first exist and the function must be defined at the point.

## DIAGNOSTIC_QUESTION_2
Explain why the function \(f(x) = \frac{x^2 - 1}{x - 1}\) is **not** continuous at \(x = 1\) even though its limit as \(x \to 1\) exists and equals 2.

## DIAGNOSTIC_ANSWER_2
The function is not defined at \(x = 1\) because the denominator becomes zero. Condition (1) of continuity fails: \(f(1)\) does not exist. The limit exists (after simplifying, \(\lim_{x \to 1} \frac{(x-1)(x+1)}{x-1} = 2\)), but without a function value, continuity cannot hold. A student who says "it is continuous because the limit equals 2" has confused the existence of a limit with continuity; they missed that \(f(c)\) must be defined.

## DIAGNOSTIC_QUESTION_3
Check the continuity of the function \(f(x) = \begin{cases} 2x + 3, & x \le 2 \\ x^2 - 1, & x > 2 \end{cases}\) at \(x = 2\). Show all steps.

## DIAGNOSTIC_ANSWER_3
**Step 1:** \(f(2) = 2(2) + 3 = 7\) (using the first piece because \(x \le 2\)).  
**Step 2:** Left-hand limit: \(\lim_{x \to 2^-} f(x) = \lim_{x \to 2^-} (2x + 3) = 2(2) + 3 = 7\).  
**Step 3:** Right-hand limit: \(\lim_{x \to 2^+} f(x) = \lim_{x \to 2^+} (x^2 - 1) = 2^2 - 1 = 3\).  
**Step 4:** Since left-hand limit (7) ≠ right-hand limit (3), \(\lim_{x \to 2} f(x)\) does not exist.  
**Conclusion:** \(f\) is **not continuous** at \(x = 2\) (jump discontinuity).  
A wrong answer that only checks \(f(2)\) and one-sided limit, or incorrectly uses the same formula for both sides, reveals the student does not systematically verify all three conditions.

## DIAGNOSTIC_QUESTION_4
Consider \(f(x) = \frac{|x - 3|}{x - 3}\) for \(x \ne 3\) and \(f(3) = 0\). Is \(f\) continuous at \(x = 3\)? Justify by computing left-hand and right-hand limits.

## DIAGNOSTIC_ANSWER_4
For \(x < 3\), \(|x-3| = -(x-3)\), so \(f(x) = -1\). Left-hand limit = \(-1\).  
For \(x > 3\), \(|x-3| = x-3\), so \(f(x) = 1\). Right-hand limit = \(1\).  
Since left-hand limit ≠ right-hand limit, the limit does not exist. \(f(3)=0\) is defined but irrelevant. Hence \(f\) is **discontinuous** at \(x = 3\) (jump discontinuity).  
A student who simplifies \(|x-3|/(x-3)\) to 1 for all \(x \ne 3\) ignores the sign change and incorrectly concludes the limit is 1. This shows they do not handle absolute value piecewise.

## DIAGNOSTIC_QUESTION_5
A student claims: "The function \(f(x) = \begin{cases} \frac{\sin x}{x}, & x \ne 0 \\ 1, & x = 0 \end{cases}\) is discontinuous at \(x = 0\) because \(\frac{\sin x}{x}\) is not defined at \(x = 0\)." Evaluate this claim.

## DIAGNOSTIC_ANSWER_5
The claim is **false**. Continuity at \(x = 0\) depends on the *defined* value \(f(0)=1\) and the limit \(\lim_{x \to 0} \frac{\sin x}{x} = 1\). Since the limit exists and equals the defined value, the function **is continuous** at \(x = 0\). The student incorrectly thinks the formula \(\frac{\sin x}{x}\) must be valid at \(x=0\); they confuse the expression with the function. This reveals a misunderstanding that a function can be defined piecewise to "fill the hole".

## DIAGNOSTIC_QUESTION_6
Construct a piecewise function \(f(x)\) with two different formulas on \(x < 1\) and \(x \ge 1\) that is continuous at \(x = 1\). Your function must involve a parameter \(k\) in the second piece. State the condition on \(k\) for continuity.

## DIAGNOSTIC_ANSWER_6
Example: \(f(x) = \begin{cases} x^2 + 2, & x < 1 \\ kx + 1, & x \ge 1 \end{cases}\).  
For continuity at \(x=1\): \(f(1) = k(1)+1 = k+1\). Left-hand limit = \(\lim_{x \to 1^-} (x^2+2) = 3\). Right-hand limit = \(\lim_{x \to 1^+} (kx+1) = k+1\).  
Set left-hand limit = right-hand limit = function value: \(3 = k+1 \Rightarrow k = 2\).  
A poor answer might give a function without a parameter, or set the wrong equality (e.g., equate only the formulas without evaluating at 1), showing they don't connect the parameter to the limit equality.

## COMMON_MISCONCEPTION
**Misconception:** "If a function is defined at a point, it is automatically continuous there."  
**Exact wrong step:** Students check only \(f(c)\) exists and skip limit evaluation. For example, for \(f(x) = \begin{cases} x+1, & x \ne 2 \\ 5, & x = 2 \end{cases}\), they see \(f(2)=5\) and say "continuous" without computing \(\lim_{x \to 2} f(x) = 3\). They also often forget that for piecewise functions, the limit must be checked from **both sides** using the correct piece. Another frequent error: when the function involves \(|x-a|\), they treat \(|x-a|\) as \(x-a\) for all \(x\), missing the sign change at \(x=a\), leading to wrong one-sided limits.

## ON_FAILURE
1. Revisit **Class 11 limits**: `c11_math_cbse_13_001` (intuitive idea), `c11_math_cbse_13_002` (algebraic methods), `c11_math_cbse_13_003` (trigonometric limits), `c11_math_cbse_13_004` (polynomial/rational limits), `c11_math_cbse_13_005` (limits at infinity). Practice evaluating left-hand and right-hand limits separately for piecewise functions.  
2. Re-do the three-condition checklist for **five** different functions (polynomial, rational, absolute value, greatest integer, trigonometric) at a point where the formula changes. Write each condition explicitly: "f(c) = ...", "LHL = ...", "RHL = ...", "Limit = ...", "Conclusion".  
3. For absolute value functions, always rewrite \(|x-a|\) as \(x-a\) for \(x \ge a\) and \(-(x-a)\) for \(x < a\) **before** taking limits.  
4. Re-diagnostic: Check continuity of \(f(x) = \begin{cases} \frac{x^2-4}{x-2}, & x \ne 2 \\ k, & x = 2 \end{cases}\) at \(x=2\) and find \(k\) that makes it continuous.

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_001, c11_math_cbse_13_002, c11_math_cbse_13_003, c11_math_cbse_13_004, c11_math_cbse_02_005, c11_math_cbse_02_006, c11_math_cbse_02_007, c11_math_cbse_02_008, c11_math_cbse_02_009, c11_math_cbse_02_010, c11_math_cbse_13_005

## PREREQUISITE_REASONS
c11_math_cbse_13_001: Provides the intuitive foundation of limits needed to understand "approaching a point".
c11_math_cbse_13_002: Algebraic methods for evaluating limits (factorisation, rationalisation) are essential for computing \(\lim_{x \to c} f(x)\).
c11_math_cbse_13_003: Limits of trigonometric functions (e.g., \(\lim_{x \to 0} \frac{\sin x}{x} = 1\)) appear in continuity problems.
c11_math_cbse_13_004: Limits of polynomial and rational functions are the most common types checked for continuity.
c11_math_cbse_02_005: Definition of a function, domain, and range — needed to know where \(f(c)\) is defined.
c11_math_cbse_02_006: Identity and constant functions — basic continuous functions.
c11_math_cbse_02_007: Polynomial functions — all polynomials are continuous everywhere.
c11_math_cbse_02_008: Rational and modulus functions — rational functions have discontinuities where denominator is zero; modulus functions require piecewise handling.
c11_math_cbse_02_009: Signum and greatest integer functions — classic examples of discontinuous functions.
c11_math_cbse_02_010: Algebra of real functions — used when combining functions in piecewise definitions.
c11_math_cbse_13_005: discontinuity. To analyse it mathematically, we first recall from Class 11 (`c11_math_cbse_13_001`–`c11_math_cbse_13_005`) how to find left-hand and right-hand limits. Write down the function, pick the point \(c\), compute \(f(c)\), then co  

## FORWARD_NODE_IDS
c12_math_cbse_05_002, c12_math_cbse_05_003, c12_math_cbse_05_004, c12_math_cbse_05_005, c12_math_cbse_05_012, c12_math_cbse_05_013, c12_math_cbse_02_002

## FORWARD_REASONS
c12_math_cbse_05_002: Builds directly on the definition by formalising left-hand and right-hand limits and their role in continuity at a point.
c12_math_cbse_05_003: Uses the fact that continuity is preserved under algebraic operations (sum, difference, product, quotient, composition) — relies on knowing what continuity means.
c12_math_cbse_05_004: Differentiability requires continuity; the definition of derivative uses the limit of the difference quotient, which assumes function values exist near the point.
c12_math_cbse_05_005: Differentiability at a point is checked using the same limit-based approach as continuity, but with an extra condition (equality of left-hand and right-hand derivatives).
c12_math_cbse_05_012: Need the definition of continuity on a closed interval to verify condition 1.  
c12_math_cbse_05_013: Continuity definition is needed to check the hypothesis "continuous on [a,b]".  
c12_math_cbse_02_002: c12_math_cbse_05_001 | In calculus (integrals), ∫ dx/√(a² – x²) = sin⁻¹(x/a) + C requires the principal branch to give a unique antiderivative.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_001, c11_math_cbse_02_005
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_001: The concept of a limit (approaching a value) is fundamental in physics for defining instantaneous velocity and acceleration as limits of average rates.
c11_math_cbse_02_005: Functions model physical quantities (position, temperature, cost); continuity of these models corresponds to physically realistic smooth changes without sudden jumps.

## CHAIN_DESCRIPTION
c11_math_cbse_13_001 -> c12_math_cbse_05_001 -> c12_math_cbse_05_002

## THIS_FORMULA
\(\lim_{x \to c} f(x) = f(c)\) (with the understanding that \(\lim_{x \to c} f(x)\) exists, i.e., \(\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x)\))

## FORMULA_VARIABLES
\(f\) = real-valued function; \(c\) = point in the domain of \(f\); \(x\) = variable approaching \(c\); \(f(c)\) = value of the function at \(c\); \(\lim_{x \to c} f(x)\) = limit of \(f(x)\) as \(x\) approaches \(c\).

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_001 | Limits are used in physics to define instantaneous velocity as the limit of average velocity when time interval tends to zero.
c11_math_cbse_02_005 | Functions represent physical relationships (e.g., displacement-time); continuity ensures no teleportation or gaps in motion.
## PREREQ_CONCEPT
Limits of a function (left-hand limit, right-hand limit, and existence of limit) from Class 11.

## PREREQ_BEFORE
The student must be able to evaluate left-hand and right-hand limits of polynomial, rational, trigonometric, and absolute-value functions algebraically.

## PREREQ_STUCK
If stuck, revisit Class 11 limit evaluation techniques (factorisation, rationalisation, standard trigonometric limits) and practice piecewise limit problems from `c11_math_cbse_13_002` and `c11_math_cbse_13_003`.

## WORKED_EXAMPLE_1
**PROBLEM:** A taxi charges ₹25 for the first kilometre and ₹15 for each additional kilometre or part thereof. The fare function is \(F(x) = \begin{cases} 25, & 0 < x \le 1 \\ 25 + 15\lceil x-1 \rceil, & x > 1 \end{cases}\) where \(x\) is distance in km and \(\lceil \cdot \rceil\) is the ceiling function (least integer greater than or equal). Check if \(F\) is continuous at \(x = 1\) and \(x = 2\).

**STEPS:**
- Step 1: Identify the pieces. At \(x=1\), the first piece gives \(F(1)=25\). For \(x>1\), the ceiling function applies.
- Step 2: Check continuity at \(x=1\).  
  \(F(1) = 25\).  
  Left-hand limit (using first piece): \(\lim_{x \to 1^-} F(x) = 25\).  
  Right-hand limit: for \(x>1\) and \(x \to 1^+\), \(x-1\) is a small positive number, so \(\lceil x-1 \rceil = 1\). Thus \(\lim_{x \to 1^+} F(x) = 25 + 15(1) = 40\).  
  Since left-hand limit (25) ≠ right-hand limit (40), the limit does not exist. \(F\) is **discontinuous** at \(x=1\) (jump of ₹15).
- Step 3: Check continuity at \(x=2\).  
  \(F(2)\): since \(2>1\), \(F(2) = 25 + 15\lceil 2-1 \rceil = 25 + 15(1) = 40\).  
  Left-hand limit: for \(x \to 2^-\), \(1 < x < 2\) so \(0 < x-1 < 1\), ceiling = 1. Limit = \(25 + 15(1) = 40\).  
  Right-hand limit: for \(x \to 2^+\), \(x-1\) slightly >1, ceiling = 2. Limit = \(25 + 15(2) = 55\).  
  Left-hand limit (40) ≠ right-hand limit (55), so limit does not exist. \(F\) is **discontinuous** at \(x=2\) (jump of ₹15).
- Step 4: Interpret: The fare jumps at every integer kilometre because the ceiling function adds a full kilometre charge as soon as you exceed the previous integer.
- Step 5: Conclusion: \(F\) is discontinuous at all positive integers; continuous elsewhere.

**REASONING:** The ceiling function \(\lceil x-1 \rceil\) is a step function that jumps at integer values of \(x\). At each integer, the right-hand limit uses the next higher integer value, causing a jump discontinuity. This matches the real-world fact that taxi fares increase in discrete steps.

**ANSWER:** Discontinuous at \(x=1\) and \(x=2\) (and all positive integers). Jump discontinuity of ₹15 at each integer km.

## WORKED_EXAMPLE_2
**PROBLEM:** Find the value of \(k\) for which the function  
\(f(x) = \begin{cases} \frac{\sin 3x}{x}, & x < 0 \\ k, & x = 0 \\ \frac{\tan 2x}{x}, & x > 0 \end{cases}\)  
is continuous at \(x = 0\).

**STEPS:**
- Step 1: For continuity at \(x=0\), we need \(f(0) = \lim_{x \to 0^-} f(x) = \lim_{x \to 0^+} f(x)\).
- Step 2: Compute left-hand limit: \(\lim_{x \to 0^-} \frac{\sin 3x}{x}\).  
  Use standard limit \(\lim_{u \to 0} \frac{\sin u}{u} = 1\). Let \(u = 3x\). As \(x \to 0\), \(u \to 0\).  
  \(\frac{\sin 3x}{x} = 3 \cdot \frac{\sin 3x}{3x} = 3 \cdot \frac{\sin u}{u} \to 3 \times 1 = 3\).  
  So LHL = 3.
- Step 3: Compute right-hand limit: \(\lim_{x \to 0^+} \frac{\tan 2x}{x}\).  
  \(\tan 2x = \frac{\sin 2x}{\cos 2x}\). \(\frac{\tan 2x}{x} = \frac{\sin 2x}{x \cos 2x} = 2 \cdot \frac{\sin 2x}{2x} \cdot \frac{1}{\cos 2x}\).  
  As \(x \to 0\), \(\frac{\sin 2x}{2x} \to 1\) and \(\cos 2x \to 1\). So RHL = \(2 \times 1 \times 1 = 2\).
- Step 4: For continuity, we need LHL = RHL = f(0). But LHL = 3 and RHL = 2. They are **not equal**.  
  Therefore, **no value of \(k\)** can make \(f\) continuous at \(x=0\) because the left-hand and right-hand limits themselves differ.
- Step 5: Conclusion: The function has an irremovable (jump) discontinuity at \(x=0\) regardless of \(k\).

**REASONING:** Continuity requires the two one-sided limits to be equal first. Here the trigonometric limits give different values (3 vs 2) because the coefficients of \(x\) inside sine and tangent are different. No single \(f(0)\) can bridge this gap.

**ANSWER:** No such \(k\) exists; the function is discontinuous at \(x=0\) for all \(k\).

## WORKED_EXAMPLE_3
**PROBLEM:** A company's cost function for producing \(x\) units is  
\(C(x) = \begin{cases} 5000 + 20x, & 0 \le x \le 100 \\ ax^2 + bx + c, & x > 100 \end{cases}\)  
where the quadratic part models economies of scale. The company wants the cost function to be continuous **and** have a continuous marginal cost (derivative) at \(x = 100\). Given that the marginal cost just before 100 is ₹20/unit, find \(a, b, c\) if the quadratic is \(C(x) = a(x-100)^2 + 20(x-100) + 7000\) for \(x > 100\). (Hint: This form already ensures continuity of value and derivative at 100 if parameters match.)

**STEPS:**
- Step 1: Understand the given quadratic form. For \(x > 100\), \(C(x) = a(x-100)^2 + 20(x-100) + 7000\).  
  This is written in a shifted form centred at \(x=100\).
- Step 2: Enforce continuity of cost at \(x=100\).  
  Left value: \(C(100) = 5000 + 20(100) = 5000 + 2000 = 7000\).  
  Right limit: \(\lim_{x \to 100^+} C(x) = a(0)^2 + 20(0) + 7000 = 7000\).  
  So continuity of value holds **automatically** for any \(a\).
- Step 3: Enforce continuity of marginal cost (derivative) at \(x=100\).  
  Left derivative (for \(x \le 100\)): \(C'(x) = 20\). So \(C'(100^-) = 20\).  
  Right derivative (for \(x > 100\)): \(C'(x) = 2a(x-100) + 20\). So \(C'(100^+) = 2a(0) + 20 = 20\).  
  This matches **automatically** for any \(a\).
- Step 4: The problem statement says the quadratic is given in that specific form. The parameters \(a, b, c\) in the standard form \(ax^2 + bx + c\) can be found by expanding:  
  \(C(x) = a(x^2 - 200x + 10000) + 20x - 2000 + 7000\)  
  \(= ax^2 + (-200a + 20)x + (10000a + 5000)\).
- Step 5: So \(a\) is free (any real number), \(b = -200a + 20\), \(c = 10000a + 5000\).  
  If we also require the quadratic to be concave up (increasing marginal cost), choose \(a > 0\). For example, \(a = 0.01\) gives \(b = 0\), \(c = 5100\).
- Step 6: Verify: With \(a=0.01\), \(C(x) = 0.01x^2 + 5100\) for \(x>100\). At \(x=100\), value = \(0.01(10000)+5100 = 100+5100=5200\)? Wait, earlier we had 7000. Let's recalc: \(c = 10000(0.01)+5000 = 100+5000=5100\). Then \(C(100) = 0.01(10000)+0+5100 = 100+5100=5200\). But left value is 7000. There's a mismatch because the constant term in the shifted form was 7000, not 5000. Let's correct: The shifted form constant is 7000. Expansion: \(a(x-100)^2 + 20(x-100) + 7000 = ax^2 -200ax +10000a +20x -2000 +7000 = ax^2 + (-200a+20)x + (10000a+5000)\). At \(x=100\): \(a(10000) + (-200a+20)100 + 10000a+5000 = 10000a -20000a+2000+10000a+5000 = 7000\). Correct. So \(c = 10000a+5000\). For \(a=0.01\), \(c = 100+5000=5100\). Then \(C(100) = 0.01(10000) + 0 + 5100 = 100+5100=5200\)? Wait, \(b = -200(0.01)+20 = -2+20=18\). So \(C(x) = 0.01x^2 + 18x + 5100\). At \(x=100\): \(0.01(10000)+1800+5100 = 100+1800+5100 = 7000\). Yes, matches. Earlier I forgot the \(bx\) term. Good.

**REASONING:** The shifted form \(a(x-100)^2 + 20(x-100) + 7000\) is constructed so that at \(x=100\), the value is 7000 and the derivative is 20, regardless of \(a\). This guarantees both continuity and differentiability at the junction. The free parameter \(a\) controls the curvature (rate of change of marginal cost) for \(x>100\).

**ANSWER:** \(a\) can be any real number (typically \(a > 0\) for increasing marginal cost); \(b = -200a + 20\); \(c = 10000a + 5000\). Example: \(a = 0.01 \Rightarrow b = 18, c = 5100\).

## COMPETENCY_QUESTION_1
**QUESTION:** A student defines a function \(f(x) = \frac{x^2 - 4}{x - 2}\) and says "This function is discontinuous at \(x = 2\) because the denominator is zero." Another student says "But if you simplify, it becomes \(x+2\), which is continuous everywhere, so the original function is also continuous everywhere." Who is correct? Explain the error in each statement and give the correct classification of the discontinuity at \(x=2\).

**COMPETENCY:** Error identification and correction; interpreting algebraic simplification in the context of domain and continuity.

**STEPS:**
- Step 1: Identify the domain of the original function: \(x \ne 2\).
- Step 2: Simplify \(\frac{x^2-4}{x-2} = \frac{(x-2)(x+2)}{x-2} = x+2\) **for \(x \ne 2\)**.
- Step 3: The original function is not defined at \(x=2\), so it cannot be continuous there (condition 1 fails).
- Step 4: The limit as \(x \to 2\) exists and equals 4.
- Step 5: The discontinuity is removable because defining \(f(2)=4\) would make it continuous.
- Step 6: The first student is correct that it is discontinuous at \(x=2\), but the reason "denominator is zero" is incomplete (e.g., \(\frac{x}{x}\) at \(x=0\) has denominator zero but limit exists). The second student incorrectly assumes simplification extends the domain; the simplified expression \(x+2\) represents a **different function** with a larger domain.

**ANSWER:** The first student is correct that \(f\) is discontinuous at \(x=2\), but the reasoning is incomplete. The second student is wrong because simplification does not change the domain of the original function. The discontinuity is **removable**; if we define \(f(2)=4\), the new function becomes continuous at \(x=2\).

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** A water tank is being filled at a rate that changes at the 30-minute mark. The volume of water (in litres) at time \(t\) minutes is given by  
\(V(t) = \begin{cases} 5t^2, & 0 \le t \le 30 \\ at + b, & t > 30 \end{cases}\)  
The tank has a sensor that triggers an alarm if the volume function has a sudden jump (discontinuity). Find the relationship between \(a\) and \(b\) that ensures no alarm is triggered at \(t = 30\). If the flow rate after 30 minutes is constant at 300 L/min, find the exact values of \(a\) and \(b\).

**COMPETENCY:** Translating real-world situations to mathematical expressions; applying continuity and differentiability concepts to a physical model.

**STEPS:**
- Step 1: No alarm means \(V(t)\) must be continuous at \(t=30\).
- Step 2: Continuity requires \(V(30)\) from first piece = limit from second piece as \(t \to 30^+\).
- Step 3: \(V(30) = 5(30)^2 = 5 \times 900 = 4500\) L.
- Step 4: For \(t > 30\), \(V(t) = at + b\). Right-hand limit = \(a(30) + b = 30a + b\).
- Step 5: Set equal: \(30a + b = 4500\). This is the relationship.
- Step 6: Flow rate after 30 min is derivative of \(V\) for \(t>30\): \(V'(t) = a\). Given constant flow rate = 300 L/min, so \(a = 300\).
- Step 7: Substitute \(a = 300\) into relationship: \(30(300) + b = 4500 \Rightarrow 9000 + b = 4500 \Rightarrow b = -4500\).
- Step 8: Check: \(V(t) = 300t - 4500\) for \(t>30\). At \(t=30\), this gives \(9000 - 4500 = 4500\), matching. The negative \(b\) is acceptable because the linear formula only applies for \(t>30\); at \(t=15\) it would give negative volume, but that's outside its domain.
- Step 9: Also note that the derivative from left at \(t=30\) is \(V'(t) = 10t \Rightarrow V'(30) = 300\), so the flow rate is also continuous (differentiable) at \(t=30\).

**ANSWER:** Relationship: \(30a + b = 4500\). With constant flow rate 300 L/min: \(a = 300\), \(b = -4500\). The volume function is continuous and differentiable at \(t=30\).

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A function is continuous on an interval if it is continuous at every point of that interval; for endpoints, the ______ one-sided limit must equal the function value.

## DIAGNOSTIC_ANSWER_7
appropriate

Appropriate is the endpoint's rule: one-sided limits replace the two-sided one at interval edges, matched to which side actually exists. **A wrong answer (a two-sided word) reveals the student has demanded an approach from outside the interval where the function is not even defined.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a prepaid metro card: you tap in, the balance decreases smoothly as you travel, but if the machine malfunctions and suddenly deducts ₹50 extra at a ______ station, the balance function "jumps" — you cannot draw its graph without lifting your pen.

## DIAGNOSTIC_ANSWER_8
specific

The specific station is where the tear lives: continuity is tested point by point, and the malfunction names the point. **A wrong answer (every station) reveals the student has generalized a single jump into a system-wide failure.** The specific station is the test point: continuity is judged location by location, and the malfunction has named this one.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine a prepaid metro card: you tap in, the balance decreases smoothly as you travel, but if the machine malfunctions and suddenly deducts ₹______ extra at a specific station, the balance function "jumps" — you cannot draw its graph without lifting your pen.

## DIAGNOSTIC_ANSWER_9
50

The deducted amount is the jump's height: the tear in the balance graph is exactly that many rupees deep. **A wrong answer (another figure) reveals the student has resized the discontinuity and with it the lesson's picture.** The deducted amount is the tear's depth: the graph's jump is exactly the extra rupees the machine stole.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can: (1) state the three conditions for continuity at a point and verify them for any given function (polynomial, rational, piecewise, trigonometric) at a specific point; (2) identify points of discontinuity and classify them as removable, jump, or infinite by analysing left-hand limit, right-hand limit, and function value.

## DIAGNOSTIC_QUESTION_11
Fill in the blank: Imagine a prepaid metro card: you tap in, the balance decreases smoothly as you travel, but if the machine ______ and suddenly deducts ₹50 extra at a specific station, the balance function "jumps" — you cannot draw its graph without lifting your pen.

## DIAGNOSTIC_ANSWER_11
malfunctions

The malfunction is the discontinuity's cause: smooth decline turns to cliff exactly where the machine fails. **A wrong answer (an update) reveals the student has blamed a lawful rule change for an unlawful tear - piecewise functions can be perfectly continuous at their seams.**
