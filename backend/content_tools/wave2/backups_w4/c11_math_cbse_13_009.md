## ELI5
Roller-coaster design meets a track height h(x) = (2x^2 + 3x)(x - 4): the power rule handles each factor, but the product needs its own rule. The algebra of derivatives supplies it: sums and differences differentiate term by term, and the product rule says (uv)' = u'v + uv' - each function pairs with the other's derivative. The flagged trap: (uv)' is never u'v'. When expanding is impossible, as with sqrt(x) times sin x, the rule is the only door.

## DEFINITION
The algebra of derivatives provides rules to differentiate combinations of functions without using the first principle each time. If \(f(x)\) and \(g(x)\) are differentiable functions, then:
- **Sum Rule**: \(\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)\)
- **Difference Rule**: \(\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)\)
- **Product Rule**: \(\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)\)

These rules hold for all \(x\) where \(f'(x)\) and \(g'(x)\) exist.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly apply the sum, difference, and product rules to differentiate polynomial, rational, and algebraic functions (including those with fractional/negative powers), and can identify when to use each rule in multi-step problems such as differentiating \(x^2 \sin x\) or \((3x^2 - 5x + 2)(x^3 + 4)\).

## SCOPE_BOUNDARY
Covers sum, difference, and product rules for derivatives of algebraic functions (polynomials, rational functions with negative/fractional exponents). Does NOT cover quotient rule (often taught separately), chain rule, or derivatives of trigonometric/exponential/logarithmic functions (those are in later nodes).

## WALKTHROUGH
Imagine you are designing a roller coaster track where the height at any point is given by \(h(x) = (2x^2 + 3x)(x - 4)\). To find the slope (steepness) at any point, you need the derivative. You already know how to differentiate \(2x^2+3x\) and \(x-4\) separately using the power rule from the previous node. But how do you differentiate their product? You could expand first, but what if the functions were \(\sqrt{x}\) and \(\sin x\)? Expanding isn't always possible. This is where the product rule becomes essential. Start by writing the product rule formula: \((uv)' = u'v + uv'\). Identify \(u\) and \(v\), differentiate each separately using known rules, then substitute back. The key insight is that the derivative of a product is NOT the product of derivatives — you must cross-multiply each derivative with the other function.

Takeaway: mastery means picking sum, difference or product rule by the shape of the expression, differentiating each factor separately, and assembling without cross-sign slips. Exam moves: differentiate-the-product questions and multi-rule combinations like x^2 sin x or factored polynomials. Check yourself: the derivative of a product is not the product of derivatives - every term must carry one derivative and one survivor. Students miss it because they rush and write u'v', when the definition's cross-multiplication is the whole content: each factor takes its turn being differentiated while the other waits intact.

## DIAGNOSTIC_QUESTION_1
State the product rule for differentiation of two functions \(u(x)\) and \(v(x)\). Write it in both Leibniz notation \(\frac{d}{dx}(uv)\) and prime notation \((uv)'\).

## DIAGNOSTIC_ANSWER_1
Correct answer: \(\frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x)\) or \((uv)' = u'v + uv'\).  
A wrong answer like \((uv)' = u'v'\) reveals the student thinks the derivative of a product is the product of derivatives — a fundamental misconception that must be corrected before proceeding.

## DIAGNOSTIC_QUESTION_2
Explain why the derivative of \(f(x) = x^2 \cdot x^3\) is NOT \(2x \cdot 3x^2 = 6x^3\). Compute the correct derivative using the product rule and verify it matches the derivative obtained by simplifying \(f(x)\) first.

## DIAGNOSTIC_ANSWER_2
Correct explanation: The product rule gives \((x^2 \cdot x^3)' = (2x)(x^3) + (x^2)(3x^2) = 2x^4 + 3x^4 = 5x^4\). Simplifying first: \(f(x) = x^5\), so \(f'(x) = 5x^4\). The naive multiplication of derivatives gives \(6x^3\), which is wrong because the derivative of a product is not the product of derivatives. If a student says "it's \(6x^3\) because you multiply derivatives", they have not understood the cross-term structure of the product rule.

## DIAGNOSTIC_QUESTION_3
Differentiate \(y = (3x^2 - 5x + 2)(x^3 + 4)\) using the product rule. Show all steps and simplify the final answer.

## DIAGNOSTIC_ANSWER_3
Steps:  
Let \(u = 3x^2 - 5x + 2\), \(v = x^3 + 4\).  
\(u' = 6x - 5\), \(v' = 3x^2\).  
\(y' = u'v + uv' = (6x - 5)(x^3 + 4) + (3x^2 - 5x + 2)(3x^2)\).  
Expand: \((6x^4 + 24x - 5x^3 - 20) + (9x^4 - 15x^3 + 6x^2)\).  
Combine: \(15x^4 - 20x^3 + 6x^2 + 24x - 20\).  
A wrong answer missing the cross terms (e.g., only \(u'v\) or only \(uv'\)) shows the student applies the rule partially. An expansion error like \(6x \cdot x^3 = 6x^3\) (should be \(6x^4\)) reveals algebraic weakness in power rules.

## DIAGNOSTIC_QUESTION_4
Compare the effort required to differentiate \(f(x) = (x^2 + 1)(x^3 - 2x)\) by (a) expanding first, then differentiating, versus (b) using the product rule directly. Which method is more efficient for \(g(x) = (\sqrt{x} + 2)(x^2 - 3)\)? Justify.

## DIAGNOSTIC_ANSWER_4
For \(f(x)\), expanding gives \(x^5 - 2x^3 + x^3 - 2x = x^5 - x^3 - 2x\), derivative \(5x^4 - 3x^2 - 2\). Product rule: \((2x)(x^3-2x) + (x^2+1)(3x^2-2) = 2x^4-4x^2 + 3x^4-2x^2+3x^2-2 = 5x^4 - 3x^2 - 2\). Both are similar effort.  
For \(g(x) = (\sqrt{x} + 2)(x^2 - 3)\), expanding gives \(x^{2.5} - 3x^{0.5} + 2x^2 - 6\), which requires differentiating fractional powers — still doable but product rule avoids expanding radicals. Product rule: \((\frac{1}{2\sqrt{x}})(x^2-3) + (\sqrt{x}+2)(2x)\). This is often simpler because you don't need to rewrite \(\sqrt{x}\) as \(x^{1/2}\) and expand. A student who says "always expand" misses that product rule is more versatile for non-polynomial functions.

## DIAGNOSTIC_QUESTION_5
A student differentiates \(h(x) = (x^2 + 3x)(2x - 1)\) and writes:  
\(h'(x) = (2x + 3)(2) = 4x + 6\).  
Identify the error, explain why it is wrong, and give the correct derivative.

## DIAGNOSTIC_ANSWER_5
Error: The student differentiated the first factor and multiplied by the derivative of the second factor, i.e., \(u' \cdot v'\), instead of \(u'v + uv'\). This is the "product of derivatives" misconception.  
Correct: \(u = x^2+3x\), \(v = 2x-1\), \(u' = 2x+3\), \(v' = 2\).  
\(h'(x) = (2x+3)(2x-1) + (x^2+3x)(2) = (4x^2+4x-3) + (2x^2+6x) = 6x^2 + 10x - 3\).  
If the student only computes \(u'v\) or \(uv'\), they are applying the rule incompletely.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (e.g., from physics, economics, or geometry) where the rate of change of a product of two quantities is needed. Define the quantities, write the product function, and set up the derivative using the product rule (do not solve).

## DIAGNOSTIC_ANSWER_6
Example: A rectangular garden's length increases at 2 m/year and width at 1 m/year. At a certain time, length = 10 m, width = 5 m. Find the rate of change of area.  
Let \(L(t) = 10 + 2t\), \(W(t) = 5 + t\). Area \(A(t) = L(t)W(t)\).  
\(\frac{dA}{dt} = L'(t)W(t) + L(t)W'(t) = 2(5+t) + (10+2t)(1)\).  
A poor answer would give unrelated quantities (e.g., speed and time) or forget to define functions of time. A good answer shows understanding that product rule applies when two changing quantities multiply to give a third quantity of interest.

## COMMON_MISCONCEPTION
The most persistent error is \((uv)' = u'v'\) — students multiply the derivatives instead of using the cross-sum \(u'v + uv'\). For example, differentiating \((x^2+1)(x^3-2x)\) as \((2x)(3x^2-2) = 6x^3 - 4x\) (missing the \(uv'\) term entirely and also misapplying the rule as product of derivatives). Another error is forgetting the second term: writing only \(u'v\) or only \(uv'\). This happens because the pattern "derivative of first times second plus first times derivative of second" is not internalized. Students also confuse the product rule with the chain rule when one function is composite, e.g., differentiating \((x^2+1)^2\) as product instead of using chain rule.

## ON_FAILURE
If a student writes \((uv)' = u'v'\), immediately stop and do this:  
1. Take a simple product \(f(x) = x \cdot x = x^2\). Ask: "What is \(f'(x)\)?" They'll say \(2x\).  
2. Now apply their wrong rule: \(u=x, v=x\), so \(u'=1, v'=1\), their rule gives \(1 \cdot 1 = 1\).  
3. Show the contradiction: \(2x \neq 1\).  
4. Then derive the correct rule using first principles for \(x \cdot x\): \(\lim_{h\to0} \frac{(x+h)^2 - x^2}{h} = 2x\).  
5. Show how \(u'v + uv'\) gives \(1\cdot x + x\cdot 1 = 2x\).  
6. Practice 3 products where they must write the rule in words: "derivative of first times second PLUS first times derivative of second" before using symbols.

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_007, c11_math_cbse_13_008, c11_math_cbse_13_005, c11_math_cbse_13_006

## PREREQUISITE_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions provides the basic power rule and constant multiple rule needed to differentiate each factor in the product.
c11_math_cbse_13_008: Derivative using first principle is the foundation from which the product rule is derived; understanding the limit definition helps justify why the product rule has the cross-term structure.
c11_math_cbse_13_005: Algebra of derivatives uses limit laws that are identical to those for limits at infinity (sum, product, quotient rules).  
c11_math_cbse_13_006: Algebra of derivatives extends the concept to sums, products, quotients using limit properties  

## FORWARD_NODE_IDS
c11_math_cbse_13_010, c12_ca_cbse_03_001, c12_chem_cbse_03_007, c12_eco_cbse_03_009, c12_eco_cbse_04_005, c12_eco_cbse_06_008, c12_math_cbse_05_006, c12_math_cbse_05_007, c12_math_cbse_05_009, c12_math_cbse_05_011, c12_math_cbse_06_001, c12_math_cbse_06_002, c12_math_cbse_06_003, c12_math_cbse_06_004, c12_math_cbse_06_005, c12_math_cbse_06_006, c12_math_cbse_06_007, c12_math_cbse_06_008, c12_math_cbse_07_001, c12_math_cbse_07_002, c12_math_cbse_07_004, c12_math_cbse_07_008, c12_math_cbse_07_009, c12_math_cbse_08_003, c12_math_cbse_09_001, c12_math_cbse_09_003, c12_math_cbse_09_004, c12_math_cbse_09_005, c12_math_cbse_09_006, c12_math_cbse_09_007, c12_math_cbse_09_008, c12_phy_cbse_06_004, c12_phy_cbse_13_007, c12_math_cbse_07_005

## FORWARD_REASONS
c11_math_cbse_13_010: Derivatives of trigonometric functions require the product rule when differentiating functions like \(x^2 \sin x\) or \(\sin x \cos x\), which combine algebraic and trigonometric factors.
c12_ca_cbse_03_001: Algebra of Derivatives: Sum, Difference, Product Rules — payroll formulas are algebraic combinations (sum of earnings, sum of deductions).  
c12_chem_cbse_03_007: Algebraic manipulation of logarithmic/exponential equations for half-life derivation.  
c12_eco_cbse_03_009: Algebra of derivatives (sum, product rules) is used to derive MR = P + Q(dP/dQ) from TR = P(Q)×Q.  
c12_eco_cbse_04_005: Algebra of derivatives (sum rule) used when TC = TVC + TFC and MC = d(TVC)/dQ.  
c12_eco_cbse_06_008: Algebra of derivatives (sum, product rules) used to derive MR from piecewise linear demand.  
c12_math_cbse_05_006: Algebra of derivatives (sum, product, quotient rules) provides the foundation for combining derivatives; chain rule extends this to composition.  
c12_math_cbse_05_007: Algebra of derivatives (sum, product, quotient rules) needed for differentiating polynomial and rational implicit relations  
c12_math_cbse_05_009: Algebra of derivatives (sum, product rules) is used when differentiating \( v(x) \ln u(x) \).  
c12_math_cbse_05_011: Sum, product, quotient rules are used repeatedly in second differentiation.  
c12_math_cbse_06_001: Chain rule (sum, product, quotient, and composite function rules) is essential for differentiating V(r(t)) with respect to t.  
c12_math_cbse_06_002: Algebra of derivatives (sum, product, quotient) needed for differentiating complex functions.  
c12_math_cbse_06_003: Algebra of derivatives (sum, product, chain rules) — required to differentiate rational, trigonometric, and composite functions in this node.  
c12_math_cbse_06_004: Algebra of derivatives (sum, product rules) — required for differentiating polynomials, trigonometric, exponential functions in this chapter.  
c12_math_cbse_06_005: Need sum/difference/product/quotient/chain rules for differentiating complex curves.  
c12_math_cbse_06_006: Need sum/difference/product/quotient rules for derivatives of composite functions in approximation problems.  
c12_math_cbse_06_007: Algebra of derivatives (sum, product rules) required for differentiating composite functions like V(x) = x(30-2x)(20-2x)  
c12_math_cbse_06_008: Algebra of derivatives (sum, product, quotient rules) required to differentiate composite functions in this node.  
c12_math_cbse_07_001: Algebra of derivatives (sum, difference, product rules) is used to integrate sums/differences term by term.  
c12_math_cbse_07_002: Algebra of Derivatives: Sum, Difference, Product Rules is needed to differentiate composite functions for substitution.  
c12_math_cbse_07_004: Product rule of differentiation is the direct source of the integration by parts formula; must be thoroughly understood.  
c12_math_cbse_07_008: Algebra of Derivatives - needed for chain rule application when upper limit is a function of x.  
c12_math_cbse_07_009: Algebra of derivatives (sum, product rules) is used when finding antiderivatives of combined functions.  
c12_math_cbse_08_003: Algebra of derivatives (sum, difference, product rules) — used when differentiating to find maxima/minima for sketching curves accurately.  
c12_math_cbse_09_001: Algebra of derivatives (sum, product rules) is used when verifying solutions in later nodes.  
c12_math_cbse_09_003: Product rule, chain rule, sum/difference rules are used every time we differentiate a proposed solution with arbitrary constants.  
c12_math_cbse_09_004: Sum, product, chain rules — essential when general solution has products like \(x e^{kx}\) or composite functions.  
c12_math_cbse_09_005: Algebra of derivatives (sum, product, chain rule) is used when differentiating implicit solutions to verify.  
c12_math_cbse_09_006: Product rule for differentiation is essential to correctly compute \(dy/dx = v + x dv/dx\) when substituting \(y = vx\).  
c12_math_cbse_09_007: Algebra of derivatives (product rule) — crucial to understand why multiplying by I.F. makes the LHS an exact derivative.  
c12_math_cbse_09_008: Algebra of derivatives (sum, product rules) — essential for differentiating terms like \(xy^2\) when checking exactness and finding \(g(y)\).  
c12_phy_cbse_06_004: Algebra of derivatives needed for combining emfs in multi-coil systems.  
c12_phy_cbse_13_007: Algebra of derivatives (sum, product, chain rule) used in solving the differential equation.  
c12_math_cbse_07_005: 4. Re-attempt Diagnostic Questions 1, 3, and 5. If errors persist, revisit the chain rule in differentiation (c11_math_cbse_13_009) to reinforce where the factor 1/a comes from.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_eco_cbse_02_004
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: In kinematics, velocity is derivative of position; when position is given as product of two time-dependent quantities (e.g., \(x(t) = t^2 \sin t\)), product rule is needed to find velocity.
c11_economics_ch2_4: In marginal analysis, revenue = price × quantity; if both price and quantity are functions of time, the rate of change of revenue uses the product rule.
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_004: Cross-subject support: Land reforms refer to deliberate policy measures to change the ownership, tenancy, and man... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_13_007 -> c11_math_cbse_13_009 -> c11_math_cbse_13_010

## THIS_FORMULA
Sum: \(\frac{d}{dx}[f(x)+g(x)] = f'(x)+g'(x)\); Difference: \(\frac{d}{dx}[f(x)-g(x)] = f'(x)-g'(x)\); Product: \(\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)\)

## FORMULA_VARIABLES
f(x), g(x) = differentiable functions of x; f'(x), g'(x) = their derivatives with respect to x

## FORMULA_UNITS
dimensionless (pure mathematical operators)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Product rule used to differentiate position functions that are products of time-dependent quantities (e.g., damped oscillation x = e^{-kt} cos ωt)
c11_economics_ch2_4 | Marginal revenue = derivative of (price × quantity); both price and quantity may be functions of output, requiring product rule

## PREREQ_CONCEPT
Power rule for derivatives (d/dx x^n = n x^{n-1}) and limit definition of derivative.

## PREREQ_BEFORE
Student must be able to differentiate polynomials and simple rational functions (like 1/x, √x) using the power rule, and understand the limit definition of derivative.

## PREREQ_STUCK
If stuck, revisit the power rule for negative and fractional exponents (from derivative of polynomial functions node) and the first principle derivation of derivative of x^2 (from derivative using first principle node).

## WORKED_EXAMPLE_1
PROBLEM: The volume of a cuboid is given by \(V(x) = (2x^2 + 3x)(x - 4)\) cubic metres, where \(x\) is a design parameter in metres. Find the rate of change of volume with respect to \(x\) when \(x = 2\) m.  
STEPS:
- Step 1: Identify the two functions: \(u(x) = 2x^2 + 3x\) and \(v(x) = x - 4\).
- Step 2: Differentiate each function using the power rule: \(u'(x) = 4x + 3\), \(v'(x) = 1\).
- Step 3: Apply the product rule: \(V'(x) = u'(x)v(x) + u(x)v'(x) = (4x+3)(x-4) + (2x^2+3x)(1)\).
- Step 4: Expand and simplify: \((4x^2 - 16x + 3x - 12) + (2x^2 + 3x) = 4x^2 - 13x - 12 + 2x^2 + 3x = 6x^2 - 10x - 12\).
- Step 5: Evaluate at \(x = 2\): \(V'(2) = 6(4) - 10(2) - 12 = 24 - 20 - 12 = -8\) m³/m. The negative sign means volume decreases as \(x\) increases at this point.
REASONING: The product rule is essential because the volume is expressed as a product of two functions of \(x\). We differentiate each factor separately (using the power rule from the previous node) and combine them via the cross-sum formula. The final derivative is a polynomial, which we evaluate at the given \(x\).
ANSWER: \(-8\) m³/m

## WORKED_EXAMPLE_2
PROBLEM: Differentiate \(y = \left(\frac{1}{x} + x^2\right)(3x - 5)\) with respect to \(x\). Express the answer as a single simplified fraction.  
STEPS:
- Step 1: Rewrite \(\frac{1}{x}\) as \(x^{-1}\). So \(u(x) = x^{-1} + x^2\), \(v(x) = 3x - 5\).
- Step 2: Differentiate: \(u'(x) = -x^{-2} + 2x = -\frac{1}{x^2} + 2x\), \(v'(x) = 3\).
- Step 3: Apply product rule: \(y' = u'v + uv' = \left(-\frac{1}{x^2} + 2x\right)(3x-5) + (x^{-1}+x^2)(3)\).
- Step 4: Expand each part: First part: \(-\frac{3x}{x^2} + \frac{5}{x^2} + 6x^2 - 10x = -\frac{3}{x} + \frac{5}{x^2} + 6x^2 - 10x\). Second part: \(\frac{3}{x} + 3x^2\).
- Step 5: Combine: \(-\frac{3}{x} + \frac{5}{x^2} + 6x^2 - 10x + \frac{3}{x} + 3x^2 = \frac{5}{x^2} + 9x^2 - 10x\).
- Step 6: Write as single fraction: \(\frac{5 + 9x^4 - 10x^3}{x^2}\).
REASONING: The function contains a rational term \(1/x\), which we convert to \(x^{-1}\) to use the power rule. The product rule handles the multiplication of the two binomials. Careful algebra with negative exponents and combining fractions is required to simplify to a single rational expression.
ANSWER: \(\frac{9x^4 - 10x^3 + 5}{x^2}\)

## WORKED_EXAMPLE_3
PROBLEM: A company's revenue \(R\) (in ₹) from selling \(x\) units is \(R(x) = (500 - 2x)(x)\) where the first factor is price per unit and the second is quantity sold. Find the marginal revenue when \(x = 100\) units. Interpret the result.  
STEPS:
- Step 1: Recognize \(R(x) = (500 - 2x) \cdot x\). Let \(u = 500 - 2x\), \(v = x\).
- Step 2: Differentiate: \(u' = -2\), \(v' = 1\).
- Step 3: Apply product rule: \(R'(x) = u'v + uv' = (-2)(x) + (500 - 2x)(1) = -2x + 500 - 2x = 500 - 4x\).
- Step 4: Evaluate at \(x = 100\): \(R'(100) = 500 - 4(100) = 500 - 400 = 100\).
- Step 5: Interpret: Marginal revenue at 100 units is ₹100 per unit. This means selling the 101st unit will increase total revenue by approximately ₹100.
- Step 6: Verify by expanding first: \(R(x) = 500x - 2x^2\), derivative \(500 - 4x\), same result.
REASONING: This combines economics context with calculus. Revenue is price × quantity, both functions of \(x\). The product rule directly gives the marginal revenue function. The interpretation connects the derivative to the real-world concept of marginal change.
ANSWER: ₹100 per unit

## COMPETENCY_QUESTION_1
QUESTION: A student claims that the derivative of \(f(x) = (x^3 + 2x)(\sqrt{x} + 1)\) can be found by differentiating each factor and multiplying: \(f'(x) = (3x^2 + 2)\left(\frac{1}{2\sqrt{x}}\right)\). Is this correct? If not, find the correct derivative and explain the student's error.  
COMPETENCY: Error identification and correction  
STEPS:
- Step 1: Identify the student's method: they computed \(u' \cdot v'\).
- Step 2: State the correct product rule: \(f'(x) = u'v + uv'\).
- Step 3: Compute correctly: \(u = x^3+2x\), \(v = x^{1/2}+1\); \(u' = 3x^2+2\), \(v' = \frac{1}{2}x^{-1/2}\).
- Step 4: Apply rule: \(f'(x) = (3x^2+2)(\sqrt{x}+1) + (x^3+2x)\left(\frac{1}{2\sqrt{x}}\right)\).
- Step 5: Simplify if required (optional for this competency).
ANSWER: The student is incorrect. The derivative of a product is NOT the product of derivatives. The correct derivative is \((3x^2+2)(\sqrt{x}+1) + (x^3+2x)\left(\frac{1}{2\sqrt{x}}\right)\). The error is using \((uv)' = u'v'\) instead of \(u'v + uv'\).
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: The total cost \(C\) (in ₹) of producing \(x\) items is given by \(C(x) = (0.01x^2 + 5x + 100)(1 + 0.001x)\), where the first factor is the variable cost per item and the second factor accounts for a small tax multiplier. Find the marginal cost when \(x = 200\). Then, determine whether the marginal cost is increasing or decreasing at this production level by examining the derivative of the marginal cost.  
COMPETENCY: Translating real-world situations to mathematical expressions and analyzing higher-order behavior  
STEPS:
- Step 1: Identify \(u(x) = 0.01x^2 + 5x + 100\), \(v(x) = 1 + 0.001x\).
- Step 2: Compute derivatives: \(u' = 0.02x + 5\), \(v' = 0.001\).
- Step 3: Apply product rule for marginal cost \(C'(x) = u'v + uv'\).
- Step 4: Evaluate \(C'(200)\) numerically.
- Step 5: Find \(C''(x)\) by differentiating \(C'(x)\) (using sum and product rules again).
- Step 6: Evaluate \(C''(200)\) to determine if marginal cost is increasing (\(C''>0\)) or decreasing (\(C''<0\)).
ANSWER:  
\(C'(x) = (0.02x+5)(1+0.001x) + (0.01x^2+5x+100)(0.001)\).  
At \(x=200\): \(u=0.01(40000)+1000+100=400+1000+100=1500\); \(v=1+0.2=1.2\); \(u'=4+5=9\); \(v'=0.001\).  
\(C'(200) = 9(1.2) + 1500(0.001) = 10.8 + 1.5 = 12.3\) ₹/item.  
\(C''(x) = (0.02)(1+0.001x) + (0.02x+5)(0.001) + (0.02x+5)(0.001) + (0.01x^2+5x+100)(0)\) (derivative of constant 0.001 is 0).  
Simplify: \(C''(x) = 0.02 + 0.00002x + 0.00002x + 0.005 = 0.025 + 0.00004x\).  
At \(x=200\): \(C''(200) = 0.025 + 0.008 = 0.033 > 0\). Marginal cost is increasing at 200 units.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The algebra of derivatives provides rules to ______ combinations of functions without using the first principle each time.

## DIAGNOSTIC_ANSWER_7
differentiate

**A wrong answer ("combine" or "simplify") reveals the student has paraphrased the definition's verb - the algebra provides rules to differentiate combinations of functions.** Differentiate is the definition's own verb, and the verb is what the blank grades. Recall the roller-coaster track before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To find the slope (steepness) at any point, you need the ______.

## DIAGNOSTIC_ANSWER_8
derivative

**A wrong answer ("slope" or "formula") reveals the student has swapped the walkthrough's noun - to find the steepness you need the derivative.** Derivative is the walkthrough's own noun, and the noun is what the blank grades. Recall the height function h(x) before filling, and give the noun exactly.
