## ELI5
A balloon inflates: you know how its volume grows with radius and how its radius grows with time - but the question asks how volume grows with time. The chain rule stitches the two known rates together: differentiate the outer layer with respect to the inner, the inner with respect to the true variable, and multiply. Layered functions surrender one layer at a time, and longer chains simply multiply more links.

## DEFINITION
The chain rule states that if a function \( y = f(x) \) is a composite of two functions \( u \) and \( v \) such that \( f = v \circ u \) (i.e., \( f(x) = v(u(x)) \)), and if \( t = u(x) \) with both \( \frac{dt}{dx} \) and \( \frac{dv}{dt} \) existing, then the derivative of \( f \) with respect to \( x \) is \( \frac{df}{dx} = \frac{dv}{dt} \cdot \frac{dt}{dx} \). This extends to longer chains: for \( f = w \circ v \circ u \), \( \frac{df}{dx} = \frac{dw}{dv} \cdot \frac{dv}{du} \cdot \frac{du}{dx} \), provided all derivatives exist.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly identify the inner and outer functions in a composite, apply the chain rule step-by-step to differentiate polynomial, trigonometric, exponential, and logarithmic composites, and simplify the final expression entirely in terms of the original variable \( x \). They can also extend the rule to three or more functions and use it in implicit and parametric differentiation.

## SCOPE_BOUNDARY
This node covers the chain rule for differentiation of composite functions of the form \( v(u(x)) \) and its extension to three functions. It includes algebraic, trigonometric, exponential, and logarithmic functions as per NCERT Class 12 syllabus. It does NOT cover differentiation of inverse trigonometric functions (node c12_math_cbse_05_008), logarithmic differentiation (node c12_math_cbse_05_009), parametric differentiation (node c12_math_cbse_05_010), or higher-order derivatives (node c12_math_cbse_05_011), though the chain rule is a prerequisite for those.

## WALKTHROUGH
Imagine you are calculating how fast the volume of a spherical balloon changes as you pump air into it. The volume \( V = \frac{4}{3}\pi r^3 \) depends on radius \( r \), but the radius itself increases with time \( t \) as \( r = 2t + 1 \) (metres). To find \( \frac{dV}{dt} \), you cannot just differentiate \( V \) with respect to \( r \) and stop; you must account for how \( r \) changes with \( t \). This is exactly the chain rule: \( \frac{dV}{dt} = \frac{dV}{dr} \cdot \frac{dr}{dt} \). Start by writing \( V \) as a function of \( r \) and \( r \) as a function of \( t \). Differentiate the outer function \( V(r) \) with respect to \( r \), then multiply by the derivative of the inner function \( r(t) \) with respect to \( t \). The key insight is that the derivative of a composite function is the product of the derivatives of each layer, evaluated at the appropriate points.

Takeaway first: the chain rule is rate multiplication across layers - df by dx equals df by dt times dt by dx - and every composite, however fancy, is differentiated link by link. Exam moves: identify questions naming inner and outer functions, computation questions across polynomial, trig, exponential and logarithmic composites, and extension questions into three-link chains, implicit and parametric differentiation. Method: rerun the balloon - volume's derivative times radius's derivative, evaluated at the right radius - then simplify everything back into x. Check yourself: never leave the intermediate variable in the final answer; the chain is scaffolding, not the building. Drill: differentiate one two-layer and one three-layer composite, writing each link's derivative separately.

## DIAGNOSTIC_QUESTION_1
State the chain rule formula for \( y = f(g(x)) \) using Leibniz notation, and specify the condition required for it to hold.

## DIAGNOSTIC_ANSWER_1
The chain rule states \( \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} \) where \( u = g(x) \). The condition is that both \( \frac{du}{dx} \) and \( \frac{dy}{du} \) must exist. A wrong answer (e.g., writing \( \frac{dy}{dx} = \frac{dy}{du} + \frac{du}{dx} \) or omitting the existence condition) reveals confusion between the chain rule and the sum rule, or a lack of awareness that differentiability of each component is necessary.

## DIAGNOSTIC_QUESTION_2
Explain why the derivative of \( \sin(x^2) \) is \( 2x \cos(x^2) \) and not \( \cos(x^2) \) or \( 2x \cos(2x) \). Identify the inner and outer functions.

## DIAGNOSTIC_ANSWER_2
Let \( u = x^2 \) (inner) and \( y = \sin u \) (outer). Then \( \frac{dy}{du} = \cos u = \cos(x^2) \) and \( \frac{du}{dx} = 2x \). By the chain rule, \( \frac{dy}{dx} = \cos(x^2) \cdot 2x = 2x \cos(x^2) \). A wrong answer like \( \cos(x^2) \) shows the student forgot to multiply by the derivative of the inner function. \( 2x \cos(2x) \) indicates they incorrectly differentiated \( \sin(x^2) \) as if the argument were \( 2x \), confusing the chain rule with the derivative of \( \sin(2x) \).

## DIAGNOSTIC_QUESTION_3
Differentiate \( y = \tan(3x^2 + 5) \) with respect to \( x \). Show all steps.

## DIAGNOSTIC_ANSWER_3
Let \( u = 3x^2 + 5 \), then \( y = \tan u \).
\( \frac{dy}{du} = \sec^2 u = \sec^2(3x^2 + 5) \)
\( \frac{du}{dx} = 6x \)
\( \frac{dy}{dx} = \sec^2(3x^2 + 5) \cdot 6x = 6x \sec^2(3x^2 + 5) \).
A wrong answer like \( \sec^2(3x^2 + 5) \) (missing \( 6x \)) or \( 6x \sec^2(3x^2) \) (incorrect inner function) shows failure to correctly apply the chain rule or to keep the inner function intact when differentiating the outer function.

## DIAGNOSTIC_QUESTION_4
Compare the derivatives of \( f(x) = \sin(x^3) \) and \( g(x) = (\sin x)^3 \). Are they the same? Explain the structural difference that leads to different derivatives.

## DIAGNOSTIC_ANSWER_4
\( f(x) = \sin(x^3) \): outer = sin, inner = \( x^3 \). \( f'(x) = \cos(x^3) \cdot 3x^2 = 3x^2 \cos(x^3) \).
\( g(x) = (\sin x)^3 \): outer = \( u^3 \), inner = \( \sin x \). \( g'(x) = 3(\sin x)^2 \cdot \cos x = 3 \sin^2 x \cos x \).
They are different because the order of composition is reversed. A student who claims they are the same misunderstands that composition is not commutative; the chain rule applies to the specific layering of functions.

## DIAGNOSTIC_QUESTION_5
A student differentiates \( y = e^{\sin x} \) as follows: \( \frac{dy}{dx} = e^{\sin x} \cdot \cos x \cdot \cos x \). Identify the error and correct it.

## DIAGNOSTIC_ANSWER_5
The student incorrectly applied the chain rule twice on the exponent: they differentiated \( \sin x \) to get \( \cos x \), then multiplied by another \( \cos x \) as if the exponent were \( \sin^2 x \). The correct derivative is \( \frac{dy}{dx} = e^{\sin x} \cdot \cos x \). The error reveals a misunderstanding of when to stop applying the chain rule; the student treated \( \sin x \) as a composite function itself and differentiated it again unnecessarily.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (with numbers) where the chain rule is needed to find the rate of change of a quantity that depends on another quantity which itself changes with time. Provide the functions and ask for the derivative at a specific instant.

## DIAGNOSTIC_ANSWER_6
Example: The temperature \( T \) (in °C) of a metal rod at distance \( x \) (in cm) from one end is \( T(x) = 20 + 5\sqrt{x} \). The rod expands so that \( x \) changes with time \( t \) (in seconds) as \( x(t) = t^2 + 4 \). Find the rate of change of temperature with respect to time when \( t = 1 \) s.
Solution: \( \frac{dT}{dt} = \frac{dT}{dx} \cdot \frac{dx}{dt} = \frac{5}{2\sqrt{x}} \cdot 2t = \frac{5t}{\sqrt{t^2+4}} \). At \( t=1 \), \( \frac{dT}{dt} = \frac{5}{\sqrt{5}} = \sqrt{5} \) °C/s.
A poor answer might give only the formula without a context, or misuse the chain rule (e.g., adding derivatives). This tests the ability to construct a meaningful composite scenario.

## COMMON_MISCONCEPTION
Students often write \( \frac{d}{dx} \sin(x^2) = \cos(x^2) \) (forgetting the inner derivative \( 2x \)) or \( \frac{d}{dx} \sin(x^2) = \cos(2x) \cdot 2x \) (incorrectly differentiating the outer function as if the argument were \( 2x \)). Another frequent error is misidentifying the inner function in nested compositions: for \( \sin^3(\cos x) \), they may treat \( \sin(\cos x) \) as the inner function and cube as outer, but then forget to apply the chain rule again on \( \sin(\cos x) \), leading to missing a factor of \( -\sin x \). The core issue is not systematically peeling layers: identify the outermost operation, differentiate it keeping the inner part unchanged, then multiply by the derivative of the inner part, repeating until the variable \( x \) is reached.

## ON_FAILURE
If a student makes the above errors, guide them through a "layer-peeling" exercise:
1. Write the function as a composition of two functions: \( y = f(u), u = g(x) \).
2. Explicitly state \( f(u) \) and \( g(x) \).
3. Compute \( \frac{dy}{du} \) and \( \frac{du}{dx} \) separately.
4. Multiply them and substitute back \( u = g(x) \).
For nested compositions (three functions), introduce an intermediate variable: \( y = f(v), v = g(u), u = h(x) \). Practice with \( y = \sin^3(\cos x) \): let \( u = \cos x \), \( v = \sin u \), \( y = v^3 \). Then \( \frac{dy}{dv} = 3v^2 \), \( \frac{dv}{du} = \cos u \), \( \frac{du}{dx} = -\sin x \). Multiply: \( 3\sin^2(\cos x) \cdot \cos(\cos x) \cdot (-\sin x) \). Repeat this structured approach for 5-10 problems until the student consistently identifies all layers.

## PREREQUISITE_NODE_IDS
c12_math_cbse_05_004, c12_math_cbse_05_005, c11_math_cbse_13_009, c11_math_cbse_13_010, c12_math_cbse_05_003

## PREREQUISITE_REASONS
c12_math_cbse_05_004: Differentiability definition and condition are needed to understand when the chain rule can be applied (both functions must be differentiable).
c12_math_cbse_05_005: Differentiability at a point ensures the derivative exists locally, which is required for the chain rule's limit argument.
c11_math_cbse_13_009: Algebra of derivatives (sum, product, quotient rules) provides the foundation for combining derivatives; chain rule extends this to composition.
c11_math_cbse_13_010: Derivatives of trigonometric functions (sin, cos, tan) are essential because chain rule is frequently applied to trigonometric composites like sin(x^2), cos(3x), etc.
c12_math_cbse_05_003: Chain rule for differentiation is the differential analogue of the composition theorem for continuity (Theorem 2).  

## FORWARD_NODE_IDS
c12_math_cbse_05_007, c12_math_cbse_05_008, c12_math_cbse_05_009, c12_math_cbse_05_010, c12_math_cbse_05_011
## FORWARD_REASONS
c12_math_cbse_05_007: Implicit differentiation often requires differentiating composite functions like \( \sin(xy) \) or \( e^{x+y} \), using the chain rule with respect to \( x \) treating \( y \) as a function of \( x \).
c12_math_cbse_05_008: Derivatives of inverse trigonometric functions (e.g., \( \sin^{-1}(2x) \)) are derived using the chain rule.
c12_math_cbse_05_009: Logarithmic differentiation uses the chain rule on \( \ln f(x) \) to differentiate functions of the form \( [u(x)]^{v(x)} \).
c12_math_cbse_05_010: Parametric differentiation \( \frac{dy}{dx} = \frac{dy/dt}{dx/dt} \) is a direct application of the chain rule.
c12_math_cbse_05_011: Second order derivatives of composite functions require applying the chain rule twice (and product rule).

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_009, c11_math_cbse_13_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_009: The algebra of derivatives (sum, product, quotient) is the prerequisite toolkit; chain rule completes it for composite functions, which appear in physics (e.g., velocity as derivative of position composed with time).
c11_math_cbse_13_010: Derivatives of trigonometric functions are used in physics for oscillatory motion; chain rule allows differentiation of composite arguments like \( \sin(\omega t + \phi) \).

## CROSS_SUBJECT
c11_math_cbse_13_009 | Chain rule extends the product/quotient rules to composite functions, essential for physics rates of change (e.g., acceleration as derivative of velocity which is itself a function of position).
c11_math_cbse_13_010 | Trigonometric derivatives with chain rule model simple harmonic motion in physics where displacement is \( \sin(\omega t) \) and velocity requires \( \frac{d}{dt} \sin(\omega t) = \omega \cos(\omega t) \).
## CHAIN_DESCRIPTION
c11_math_cbse_13_009 -> c12_math_cbse_05_006 -> c12_math_cbse_05_007

## THIS_FORMULA
If \( y = f(u) \) and \( u = g(x) \), then \( \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} \), provided both derivatives exist. For three functions: \( y = f(v), v = g(u), u = h(x) \), then \( \frac{dy}{dx} = \frac{dy}{dv} \cdot \frac{dv}{du} \cdot \frac{du}{dx} \).

## FORMULA_VARIABLES
y = dependent variable (outer function output), u = intermediate variable (inner function output), x = independent variable. dy/du = derivative of outer function with respect to inner variable, du/dx = derivative of inner function with respect to x.

## FORMULA_UNITS
dimensionless (derivatives are ratios of same units, e.g., m/s per m = 1/s)

## COMPUTATION_TYPE
algebraic

## PREREQ_CONCEPT
Understanding of function composition and basic derivatives of polynomial, trigonometric, exponential, and logarithmic functions.

## PREREQ_BEFORE
The student must be able to differentiate standard functions (polynomials, sin, cos, tan, e^x, log x) and identify composite functions by spotting an "inner" function inside an "outer" function.

## PREREQ_STUCK
If stuck, revisit Class 11 derivatives of standard functions (c11_math_cbse_13_010) and practice identifying inner/outer functions in expressions like \( \sin(2x+1) \), \( e^{x^2} \), \( \ln(x^3+1) \).

## WORKED_EXAMPLE_1
PROBLEM: The radius \( r \) (in cm) of a circular oil spill increases with time \( t \) (in minutes) as \( r(t) = 3t + 2 \). The area \( A \) of the spill is \( A = \pi r^2 \). Find the rate at which the area is increasing when \( t = 4 \) minutes.
STEPS:
- Step 1: Identify the composite relationship: \( A \) is a function of \( r \), and \( r \) is a function of \( t \). We need \( \frac{dA}{dt} \).
- Step 2: Apply the chain rule: \( \frac{dA}{dt} = \frac{dA}{dr} \cdot \frac{dr}{dt} \).
- Step 3: Compute \( \frac{dA}{dr} = \frac{d}{dr}(\pi r^2) = 2\pi r \).
- Step 4: Compute \( \frac{dr}{dt} = \frac{d}{dt}(3t + 2) = 3 \).
- Step 5: Multiply: \( \frac{dA}{dt} = 2\pi r \cdot 3 = 6\pi r \). Substitute \( r = 3(4) + 2 = 14 \) cm. So \( \frac{dA}{dt} = 6\pi \times 14 = 84\pi \) cm²/min.
REASONING: The chain rule connects the rate of change of area with respect to radius and the rate of change of radius with respect to time. We differentiate the outer function (area w.r.t. radius) and multiply by the derivative of the inner function (radius w.r.t. time). The final answer is expressed in terms of time by substituting \( r(t) \).
ANSWER: \( 84\pi \) cm²/min (approximately 263.9 cm²/min).

## WORKED_EXAMPLE_2
PROBLEM: Differentiate \( y = \cos^3(2x^2 + 1) \) with respect to \( x \).
STEPS:
- Step 1: Identify the layers: outermost is cube, middle is cosine, innermost is \( 2x^2 + 1 \). Set \( u = 2x^2 + 1 \), \( v = \cos u \), \( y = v^3 \).
- Step 2: Apply extended chain rule: \( \frac{dy}{dx} = \frac{dy}{dv} \cdot \frac{dv}{du} \cdot \frac{du}{dx} \).
- Step 3: Compute each derivative: \( \frac{dy}{dv} = 3v^2 = 3\cos^2 u \), \( \frac{dv}{du} = -\sin u \), \( \frac{du}{dx} = 4x \).
- Step 4: Multiply: \( \frac{dy}{dx} = 3\cos^2 u \cdot (-\sin u) \cdot 4x = -12x \cos^2(2x^2 + 1) \sin(2x^2 + 1) \).
- Step 5: Verify by checking that all layers are accounted for and the answer is in terms of \( x \) only.
REASONING: For a triple composition, we introduce two intermediate variables. The chain rule extends naturally: differentiate the outermost layer (cube), keep the inner part (cosine) unchanged, multiply by derivative of cosine (which is -sine), keep its inner part (quadratic) unchanged, multiply by derivative of quadratic (4x). This systematic peeling avoids missing factors.
ANSWER: \( -12x \cos^2(2x^2 + 1) \sin(2x^2 + 1) \).

## WORKED_EXAMPLE_3
PROBLEM: A particle moves along a curve such that its \( x \)-coordinate is \( x = t^2 \) and its \( y \)-coordinate is \( y = \sin(t^3) \). Find the slope of the tangent to the path at \( t = 1 \).
STEPS:
- Step 1: Slope \( \frac{dy}{dx} = \frac{dy/dt}{dx/dt} \) (parametric form, chain rule).
- Step 2: Compute \( \frac{dx}{dt} = \frac{d}{dt}(t^2) = 2t \).
- Step 3: Compute \( \frac{dy}{dt} \) using chain rule: \( y = \sin(u), u = t^3 \). \( \frac{dy}{du} = \cos u = \cos(t^3) \), \( \frac{du}{dt} = 3t^2 \). So \( \frac{dy}{dt} = \cos(t^3) \cdot 3t^2 = 3t^2 \cos(t^3) \).
- Step 4: Form the ratio: \( \frac{dy}{dx} = \frac{3t^2 \cos(t^3)}{2t} = \frac{3t}{2} \cos(t^3) \) (for \( t \neq 0 \)).
- Step 5: Evaluate at \( t = 1 \): \( \frac{dy}{dx} = \frac{3}{2} \cos(1) \).
- Step 6: Interpret: slope ≈ \( \frac{3}{2} \times 0.5403 = 0.8105 \).
REASONING: Parametric differentiation is a direct application of the chain rule: \( \frac{dy}{dx} = \frac{dy}{dt} \cdot \frac{dt}{dx} = \frac{dy/dt}{dx/dt} \). We first find the derivatives of \( x \) and \( y \) with respect to the parameter \( t \), using the chain rule for \( y = \sin(t^3) \). Then we divide to eliminate \( dt \).
ANSWER: \( \frac{3}{2} \cos(1) \) (approximately 0.8105).

## COMPETENCY_QUESTION_1
QUESTION: The temperature \( T \) (in °C) inside a chemical reactor varies with pressure \( P \) (in atm) as \( T(P) = 50 \ln(P + 1) \). The pressure changes with time \( t \) (in minutes) as \( P(t) = 2e^{0.1t} - 1 \). Find the rate of change of temperature with respect to time when \( t = 10 \) minutes. Explain why the chain rule is necessary here and what would happen if you tried to substitute \( P(t) \) into \( T(P) \) first and then differentiate.
COMPETENCY: Translating real-world situations to mathematical expressions and justifying the use of the chain rule.
STEPS:
- Step 1: Recognize that \( T \) is a function of \( P \) and \( P \) is a function of \( t \), so \( T \) is a composite function of \( t \).
- Step 2: Apply chain rule: \( \frac{dT}{dt} = \frac{dT}{dP} \cdot \frac{dP}{dt} \).
- Step 3: Compute \( \frac{dT}{dP} = \frac{50}{P+1} \).
- Step 4: Compute \( \frac{dP}{dt} = 2 \cdot 0.1 e^{0.1t} = 0.2 e^{0.1t} \).
- Step 5: At \( t = 10 \), \( P = 2e^{1} - 1 = 2e - 1 \). Then \( \frac{dT}{dt} = \frac{50}{2e} \cdot 0.2 e = 5 \) °C/min.
- Step 6: Explain: Substituting first gives \( T(t) = 50 \ln(2e^{0.1t}) = 50(\ln 2 + 0.1t) \), whose derivative is \( 50 \times 0.1 = 5 \). Both methods yield the same result, but the chain rule is more efficient when the composite is complex and avoids algebraic simplification errors.
ANSWER: Rate of change = 5 °C/min. The chain rule directly uses the given functions without needing to simplify the composite; substituting first is also valid but may be algebraically messy for more complicated functions.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A student claims that the derivative of \( f(x) = \sin( \ln(x^2 + 1) ) \) is \( f'(x) = \cos( \ln(x^2 + 1) ) \cdot \frac{1}{x^2 + 1} \). Identify the error, correct it, and explain the general principle for differentiating a triple composition.
COMPETENCY: Error identification and correction in multi-layer chain rule application.
STEPS:
- Step 1: Identify the three layers: outer = sin, middle = ln, inner = \( x^2 + 1 \).
- Step 2: The student differentiated sin and ln but forgot to differentiate the innermost layer \( x^2 + 1 \).
- Step 3: Correct derivative: \( f'(x) = \cos( \ln(x^2 + 1) ) \cdot \frac{1}{x^2 + 1} \cdot 2x = \frac{2x \cos( \ln(x^2 + 1) )}{x^2 + 1} \).
- Step 4: General principle: For \( y = f(g(h(x))) \), \( \frac{dy}{dx} = f'(g(h(x))) \cdot g'(h(x)) \cdot h'(x) \). Each layer must be differentiated exactly once, moving from outside to inside.
- Step 5: Verify by checking that all three factors correspond to the three layers.
ANSWER: The error is missing the factor \( 2x \) from the derivative of \( x^2 + 1 \). The correct derivative is \( \frac{2x \cos( \ln(x^2 + 1) )}{x^2 + 1} \). The general rule: differentiate the outermost function, keep the rest unchanged, multiply by derivative of the next layer, keep the rest unchanged, continue until the variable \( x \) is reached.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are calculating how fast the volume of a spherical balloon ______ as you pump air into it.

## DIAGNOSTIC_ANSWER_7
changes

The changing verb is the problem's pulse: the balloon's volume moves, and the chain rule exists to price exactly that motion. **A wrong answer (a static word) reveals the student has frozen the scene the walkthrough keeps inflating.** The changes verb is the question's engine: the volume does not merely grow, it grows at a rate the chain rule must price.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
They can also extend the rule to three or more functions and use it in implicit and parametric differentiation.

Mastery is the reach of the rule: three-link chains, implicit curves and parametric pairs are all the same multiplication worn differently. **A wrong answer (naming only two-layer cases) reveals the student has learned the first verse of the rule and skipped the refrains.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are ______ how fast the volume of a spherical balloon changes as you pump air into it.

## DIAGNOSTIC_ANSWER_9
calculating

The calculating verb is the assignment: the walkthrough does not describe the balloon, it interrogates it - at what rate, exactly. **A wrong answer (an observing verb) reveals the student has watched the inflation while the question demands its speed.**
