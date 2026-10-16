## ELI5
Imagine you are making a sandwich: the bread is the inner function, and the filling is the outer function. To find how the final sandwich changes when you tweak the bread, you must check how the filling reacts to the bread *and* how the bread itself changes. The Chain Rule is exactly this: "Derivative of Outside (evaluated at Inside) × Derivative of Inside." The most common mix-up is forgetting to multiply by the derivative of the inside function — like calculating the filling's reaction but ignoring that the bread thickness actually changed.

## DEFINITION
The Chain Rule states that if a function $y = f(u)$ is differentiable at $u = g(x)$ and $u = g(x)$ is differentiable at $x$, then the composite function $y = f(g(x))$ is differentiable at $x$ and its derivative is $\frac{dy}{dx} = f'(g(x)) \cdot g'(x)$. In Leibniz notation, if $y = f(u)$ and $u = g(x)$, then $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must correctly identify the inner function $u = g(x)$ and outer function $y = f(u)$ in a composite algebraic function, compute their individual derivatives, and multiply them to obtain $\frac{dy}{dx}$, simplifying the final expression completely. They must do this for at least three distinct structures: polynomial powers, rational functions with powers, and nested radicals, without skipping the "multiply by $g'(x)$" step.

## SCOPE_BOUNDARY
This node covers the application of the Chain Rule to differentiate algebraic functions involving composite structures: powers of polynomials $(ax^n+b)^m$, rational functions with powers $\left(\frac{p(x)}{q(x)}\right)^n$, and nested radicals $\sqrt{g(x)}$. It does NOT cover derivatives of trigonometric, exponential, or logarithmic functions using the Chain Rule, nor does it cover implicit differentiation or higher-order derivatives.

## WALKTHROUGH
Suppose you are designing a water tank where the volume $V$ depends on the radius $r$ as $V = \frac{4}{3}\pi r^3$, but the radius itself expands with time $t$ as $r = 2t+1$. To find how fast the volume changes at $t=2$ seconds, you need $\frac{dV}{dt}$. You cannot differentiate $V$ directly with respect to $t$ because $V$ is written in terms of $r$. Start by identifying the outer function $V(r) = \frac{4}{3}\pi r^3$ and inner function $r(t) = 2t+1$. Differentiate the outer function with respect to $r$ to get $\frac{dV}{dr} = 4\pi r^2$, and the inner function with respect to $t$ to get $\frac{dr}{dt} = 2$. Multiply them: $\frac{dV}{dt} = 4\pi r^2 \cdot 2 = 8\pi r^2$. Finally, substitute $r = 2(2)+1 = 5$ to get $8\pi(25) = 200\pi$ cm³/s. The key insight: the Chain Rule breaks a complicated rate of change into manageable pieces — how the outer changes with the middle, times how the middle changes with the inner.

Takeaway: mastery means peeling composites outer-then-inner and multiplying the rates. Exam moves: related-rates questions on the water-tank scene. Check yourself: dV/dt equals dV/dr times dr/dt - the tank's response is the chain of the radius's response and the geometry's sensitivity. Students miss it because two derivatives look like two answers, when the expanding tank shows the design: change propagates through the chain, and the chain rule is disciplined bookkeeping of who depends on whom.

## DIAGNOSTIC_QUESTION_1
State the Chain Rule formula for the derivative of a composite function $y = f(g(x))$ using prime notation, and explain in one sentence what $f'(g(x))$ represents.

## DIAGNOSTIC_ANSWER_1
The Chain Rule formula is $\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$. The term $f'(g(x))$ represents the derivative of the outer function $f$ evaluated at the inner function $g(x)$ — i.e., how fast the outer function changes with respect to its input, where that input is the inner function. A wrong answer (e.g., writing $f'(x) \cdot g'(x)$ or omitting $g'(x)$) reveals the student does not distinguish between differentiating the outer function at $x$ versus at $g(x)$, or thinks the derivative of a composite is just the product of derivatives at $x$.

## DIAGNOSTIC_QUESTION_2
A student differentiates $y = (3x^2 - 5)^4$ and writes $\frac{dy}{dx} = 4(3x^2 - 5)^3$. Is this correct? Explain why or why not, identifying the exact step the student missed.

## DIAGNOSTIC_ANSWER_2
No, it is incorrect. The student applied the Power Rule to the outer function correctly ($4u^3$ where $u = 3x^2-5$) but forgot to multiply by the derivative of the inner function $g'(x) = 6x$. The correct derivative is $4(3x^2-5)^3 \cdot 6x = 24x(3x^2-5)^3$. A wrong explanation (e.g., "the power should be 3" or "the coefficient is wrong") reveals the student does not recognize the missing multiplication by $g'(x)$ as the core Chain Rule step — they are treating the composite function as if the inner function were just $x$.

## DIAGNOSTIC_QUESTION_3
Differentiate $y = \sqrt{2x^3 + 7x - 1}$ with respect to $x$ using the Chain Rule. Show all steps clearly.

## DIAGNOSTIC_ANSWER_3
Step 1: Rewrite $y = (2x^3 + 7x - 1)^{1/2}$. Step 2: Identify outer $f(u) = u^{1/2}$ and inner $u = g(x) = 2x^3 + 7x - 1$. Step 3: $f'(u) = \frac{1}{2}u^{-1/2}$, $g'(x) = 6x^2 + 7$. Step 4: $\frac{dy}{dx} = \frac{1}{2}(2x^3 + 7x - 1)^{-1/2} \cdot (6x^2 + 7)$. Step 5: Simplify: $\frac{dy}{dx} = \frac{6x^2 + 7}{2\sqrt{2x^3 + 7x - 1}}$. A wrong answer (e.g., missing the denominator 2, or forgetting $6x^2+7$) reveals the student either misapplies the power rule for fractional exponents or omits the inner derivative — the two most frequent Chain Rule errors with radicals.

## DIAGNOSTIC_QUESTION_4
Compare the derivatives of $y_1 = (x^2 + 1)^3$ and $y_2 = x^6 + 3x^4 + 3x^2 + 1$. Are they equal? Explain why this must be true algebraically, and what this tells you about when the Chain Rule is *necessary* versus when you could expand first.

## DIAGNOSTIC_ANSWER_4
Yes, they are equal. $y_2$ is the expanded form of $y_1$ (binomial expansion of $(x^2+1)^3$). Differentiating $y_1$ via Chain Rule: $3(x^2+1)^2 \cdot 2x = 6x(x^2+1)^2 = 6x(x^4+2x^2+1) = 6x^5+12x^3+6x$. Differentiating $y_2$ term-by-term: $6x^5+12x^3+6x$. They match. This shows the Chain Rule is *always* valid, but expanding first is only practical for low powers — for $y = (x^2+1)^{20}$, expansion is impossible, so the Chain Rule is necessary. A wrong answer (e.g., "they are different because one uses Chain Rule") reveals the student views the Chain Rule as a different *operation* rather than a *method* to differentiate composites that yields the same result as expanding.

## DIAGNOSTIC_QUESTION_5
A student claims: "For $y = \frac{1}{(2x-3)^2}$, I can just use the Quotient Rule with numerator 1 and denominator $(2x-3)^2$. The Chain Rule is not needed." Evaluate this claim. Is the student correct that the Chain Rule is *not needed*? Is the Quotient Rule approach valid? Justify.

## DIAGNOSTIC_ANSWER_5
The student is partially correct in that the Quotient Rule *can* be applied, but incorrect that the Chain Rule is "not needed." The denominator $(2x-3)^2$ is itself a composite function; differentiating it *requires* the Chain Rule (or expanding). Using Quotient Rule: $y = \frac{1}{u}$ where $u = (2x-3)^2$, so $y' = \frac{0 \cdot u - 1 \cdot u'}{u^2} = -\frac{u'}{u^2}$. Here $u' = 2(2x-3) \cdot 2 = 4(2x-3)$ *using the Chain Rule*. So the Chain Rule is embedded inside the Quotient Rule step. Rewriting $y = (2x-3)^{-2}$ and using Chain Rule directly is simpler: $y' = -2(2x-3)^{-3} \cdot 2 = -4(2x-3)^{-3}$. Both methods require the Chain Rule for the inner derivative. A wrong evaluation (e.g., "Quotient Rule avoids Chain Rule") reveals the student does not see that *any* differentiation of a composite structure invokes the Chain Rule, regardless of the outer rule used.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (Indian context) involving a composite algebraic function where the Chain Rule is essential to find a rate of change. Define the variables, give the function, state what rate is asked, and solve it completely.

## DIAGNOSTIC_ANSWER_6
*Example problem:* A spherical balloon is being inflated such that its radius $r$ (in cm) increases with time $t$ (in seconds) as $r(t) = \sqrt{t+4}$. The volume of a sphere is $V = \frac{4}{3}\pi r^3$. Find the rate of change of volume with respect to time when $t = 5$ s.
*Solution:* $V(r) = \frac{4}{3}\pi r^3$, $r(t) = (t+4)^{1/2}$. $\frac{dV}{dr} = 4\pi r^2$, $\frac{dr}{dt} = \frac{1}{2}(t+4)^{-1/2}$. At $t=5$, $r = \sqrt{9} = 3$, $\frac{dr}{dt} = \frac{1}{2}(9)^{-1/2} = \frac{1}{6}$. $\frac{dV}{dt} = 4\pi(3)^2 \cdot \frac{1}{6} = 36\pi \cdot \frac{1}{6} = 6\pi$ cm³/s.
*Criteria for a good answer:* Correct composite structure, clear identification of inner/outer, correct derivatives, correct substitution, correct units. A poor answer (e.g., missing $\frac{dr}{dt}$, wrong power on $r$, substituting $t$ into $r$ formula incorrectly) reveals the student cannot translate a physical scenario into a composite function and apply the Chain Rule systematically.

## COMMON_MISCONCEPTION
Students often believe the Chain Rule is only needed when they see an explicit "function inside a function" like $(3x+1)^5$, but they fail to recognize that *any* function with an inner expression other than $x$ is composite — including $\sqrt{x^2+1}$, $\frac{1}{(2x-3)^2}$, $(x^2+1)^{-3}$, and even $\sin(x^2)$ (though trig is later). They then either (a) differentiate only the outer function and stop, writing $5(3x+1)^4$ instead of $5(3x+1)^4 \cdot 3$, or (b) incorrectly "distribute" the derivative inside, e.g., $\frac{d}{dx}(x^2+1)^3 = (2x)^3 = 8x^3$. The root cause is not recognizing that the derivative of the inner function *must* appear as a multiplicative factor because the rate of change of the outer function is with respect to its *own* input, not $x$.

## ON_FAILURE
1. Have the student explicitly write $u = \text{inner expression}$ and $y = \text{outer function in } u$ for every problem, no matter how simple. 2. Make them compute $\frac{dy}{du}$ and $\frac{du}{dx}$ *separately* on paper before multiplying. 3. Use a "checklist" sticky note: □ Identify $u$ □ Find $dy/du$ □ Find $du/dx$ □ Multiply □ Substitute back $u$ □ Simplify. 4. Give 5 problems where the inner derivative is a constant (e.g., $(5x-2)^3$), then 5 where it is non-constant (e.g., $(x^2+3x)^4$), then 5 with radicals/negative powers. 5. After each, ask: "What would happen if you forgot the $du/dx$ factor? Show with $x=1$ numerically." This builds the habit and the intuition simultaneously.

## PREREQUISITE_NODE_IDS
c11_app_cbse_08_008, c11_app_cbse_08_005, c11_app_cbse_08_004

## PREREQUISITE_REASONS
c11_app_cbse_08_008: Provides the definition of derivative, first principles, and basic differentiation rules (power, sum, constant multiple) which are the building blocks for differentiating the outer and inner functions separately.
c11_app_cbse_08_005: Understanding types of functions (especially polynomial, rational, and radical functions) is essential to recognize the algebraic structures that form composite functions.
c11_app_cbse_08_004: Domain and range knowledge ensures the student knows where the composite function and its derivative are defined (e.g., denominator ≠ 0, radicand ≥ 0 for even roots).

## FORWARD_NODE_IDS
c11_app_cbse_08_010

## FORWARD_REASONS
c11_app_cbse_08_010: Finding the equation of a tangent line requires the derivative of the function at a point; many tangent problems involve composite algebraic functions (e.g., $y = (x^2-2)^3$ at $x=1$) where the Chain Rule is needed to compute the slope $f'(a)$.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_08_008 -> c11_app_cbse_08_009 -> c11_app_cbse_08_010

## THIS_FORMULA
$\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$ or $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$ where $u = g(x)$

## FORMULA_VARIABLES
$f$: outer function; $g$: inner function; $x$: independent variable; $u = g(x)$: intermediate variable; $f'(g(x))$: derivative of outer function evaluated at inner function; $g'(x)$: derivative of inner function with respect to $x$

## FORMULA_UNITS
If $y$ has units $U_y$ and $x$ has units $U_x$, then $\frac{dy}{dx}$ has units $U_y / U_x$. The Chain Rule preserves units: $\frac{dy}{du}$ has units $U_y / U_u$, $\frac{du}{dx}$ has units $U_u / U_x$, product has units $U_y / U_x$.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_phy_cbse_02_003 | In Physics, velocity is the derivative of position with respect to time. If position is given as a composite function of time (e.g., $s(t) = (2t^2+3)^3$), the Chain Rule is required to find instantaneous velocity. This node provides the mathematical tool for such physics problems.
c11_che_cbse_04_001 | In Chemical Kinetics, rate laws often involve concentration terms raised to powers (e.g., rate $= k[A]^2$). If concentration $[A]$ changes with time as a function $[A](t)$, the Chain Rule gives $\frac{d(\text{rate})}{dt} = 2k[A] \cdot \frac{d[A]}{dt}$, linking mathematical differentiation to reaction rate analysis.

## PREREQ_CONCEPT
The derivative of a function at a point (from first principles or basic rules) and the concept of a composite function $f(g(x))$.

## PREREQ_BEFORE
The student must be able to differentiate polynomial, rational, and radical functions using the power rule, sum/difference rule, and constant multiple rule, and must be able to decompose a given algebraic expression into an outer function $f(u)$ and inner function $u = g(x)$.

## PREREQ_STUCK
Review the power rule for derivatives ($\frac{d}{dx}x^n = nx^{n-1}$) including negative and fractional exponents, and practice identifying the "inside" and "outside" of composite expressions like $(2x+1)^3$, $\sqrt{x^2+4}$, $\frac{1}{(x-3)^2}$.

## WORKED_EXAMPLE_1
PROBLEM: The volume $V$ (in cm³) of a spherical air bubble rising in a lake is related to its radius $r$ (in cm) by $V = \frac{4}{3}\pi r^3$. Due to decreasing pressure, the radius increases with time $t$ (in seconds) as $r(t) = 0.5\sqrt{t+4}$. Find the rate of change of volume with respect to time when $t = 12$ s.
STEPS:
- Step 1: Identify the composite structure. Volume $V$ is a function of radius $r$: $V(r) = \frac{4}{3}\pi r^3$. Radius $r$ is a function of time $t$: $r(t) = 0.5(t+4)^{1/2}$. We need $\frac{dV}{dt}$ at $t=12$.
- Step 2: Apply the Chain Rule: $\frac{dV}{dt} = \frac{dV}{dr} \cdot \frac{dr}{dt}$.
- Step 3: Differentiate the outer function $V(r)$ with respect to $r$: $\frac{dV}{dr} = \frac{4}{3}\pi \cdot 3r^2 = 4\pi r^2$.
- Step 4: Differentiate the inner function $r(t)$ with respect to $t$: $\frac{dr}{dt} = 0.5 \cdot \frac{1}{2}(t+4)^{-1/2} \cdot 1 = \frac{1}{4\sqrt{t+4}}$.
- Step 5: Evaluate at $t=12$: $r(12) = 0.5\sqrt{16} = 0.5 \times 4 = 2$ cm. $\frac{dr}{dt}\big|_{t=12} = \frac{1}{4\sqrt{16}} = \frac{1}{16}$ cm/s.
- Step 6: Compute $\frac{dV}{dt} = 4\pi (2)^2 \cdot \frac{1}{16} = 16\pi \cdot \frac{1}{16} = \pi$ cm³/s.
REASONING: The Chain Rule separates the physics (how volume changes with radius) from the geometry (how radius changes with time). Each derivative is computed in its natural variable, then multiplied. The constant $\frac{4}{3}\pi$ is carried through correctly, and the power rule for fractional exponents is applied to $r(t)$.
ANSWER: The rate of change of volume at $t = 12$ s is $\pi$ cm³/s.

## WORKED_EXAMPLE_2
PROBLEM: Differentiate $y = \frac{(2x-1)^3}{(x+2)^2}$ with respect to $x$. Simplify your answer.
STEPS:
- Step 1: Recognize this as a quotient of two composite functions. Let $u = (2x-1)^3$ and $v = (x+2)^2$. We need $\frac{dy}{dx} = \frac{u'v - uv'}{v^2}$.
- Step 2: Find $u'$ using Chain Rule. Outer: $u_1(w) = w^3$, Inner: $w = 2x-1$. $u' = 3(2x-1)^2 \cdot 2 = 6(2x-1)^2$.
- Step 3: Find $v'$ using Chain Rule. Outer: $v_1(z) = z^2$, Inner: $z = x+2$. $v' = 2(x+2)^1 \cdot 1 = 2(x+2)$.
- Step 4: Apply Quotient Rule: $\frac{dy}{dx} = \frac{[6(2x-1)^2](x+2)^2 - (2x-1)^3[2(x+2)]}{(x+2)^4}$.
- Step 5: Simplify by factoring common terms. Numerator: $2(x+2)(2x-1)^2[3(x+2) - (2x-1)] = 2(x+2)(2x-1)^2[3x+6-2x+1] = 2(x+2)(2x-1)^2(x+7)$.
- Step 6: Cancel $(x+2)$: $\frac{dy}{dx} = \frac{2(2x-1)^2(x+7)}{(x+2)^3}$.
REASONING: This problem combines the Quotient Rule with the Chain Rule — a common board exam pattern. The Chain Rule is applied *inside* the Quotient Rule to differentiate the numerator and denominator separately. Factoring before expanding avoids messy algebra and reduces errors.
ANSWER: $\frac{dy}{dx} = \frac{2(2x-1)^2(x+7)}{(x+2)^3}$

## WORKED_EXAMPLE_3
PROBLEM: A rectangular sheet of metal has length $L(t) = 2t^2 + 3$ cm and breadth $B(t) = \sqrt{t+1}$ cm at time $t$ seconds (due to thermal expansion). The area $A = L \times B$. Find the rate of change of area with respect to time at $t = 3$ s.
STEPS:
- Step 1: Write area as a function of $t$: $A(t) = L(t) \cdot B(t) = (2t^2+3) \cdot (t+1)^{1/2}$.
- Step 2: Recognize this as a product of two functions, where the second is composite. Use Product Rule: $A'(t) = L'(t)B(t) + L(t)B'(t)$.
- Step 3: Compute $L'(t) = \frac{d}{dt}(2t^2+3) = 4t$.
- Step 4: Compute $B'(t)$ using Chain Rule. $B(t) = (t+1)^{1/2}$. Outer: $u^{1/2}$, Inner: $u = t+1$. $B'(t) = \frac{1}{2}(t+1)^{-1/2} \cdot 1 = \frac{1}{2\sqrt{t+1}}$.
- Step 5: Evaluate all components at $t=3$: $L(3) = 2(9)+3 = 21$, $B(3) = \sqrt{4} = 2$, $L'(3) = 12$, $B'(3) = \frac{1}{2\sqrt{4}} = \frac{1}{4}$.
- Step 6: Compute $A'(3) = L'(3)B(3) + L(3)B'(3) = 12 \cdot 2 + 21 \cdot \frac{1}{4} = 24 + 5.25 = 29.25$ cm²/s.
REASONING: This problem integrates the Product Rule (from basic differentiation) with the Chain Rule (for the radical function). It models a real physical situation where two dimensions change simultaneously. The Chain Rule is essential for $B'(t)$ because breadth is a composite function of $t$.
ANSWER: The rate of change of area at $t = 3$ s is $29.25$ cm²/s (or $\frac{117}{4}$ cm²/s).

## COMPETENCY_QUESTION_1
QUESTION: The total cost $C$ (in rupees) of producing $x$ units of a product is given by $C(x) = 500 + 20(3x+2)^2$. Find the marginal cost when 4 units are produced. Interpret the result in the context of production.
COMPETENCY: Application of Chain Rule in economics (marginal analysis) with interpretation.
STEPS:
- Step 1: Marginal cost is the derivative of total cost with respect to $x$: $MC = \frac{dC}{dx}$.
- Step 2: Differentiate $C(x) = 500 + 20(3x+2)^2$. Constant 500 differentiates to 0. For the second term, use Chain Rule: outer $20u^2$, inner $u = 3x+2$.
- Step 3: $\frac{dC}{dx} = 20 \cdot 2(3x+2)^1 \cdot \frac{d}{dx}(3x+2) = 40(3x+2) \cdot 3 = 120(3x+2)$.
- Step 4: Evaluate at $x=4$: $MC(4) = 120(3\cdot4+2) = 120(12+2) = 120 \times 14 = 1680$ rupees per unit.
- Step 5: Interpretation: When 4 units are already produced, producing the 5th unit will cost approximately ₹1680 additional.
ANSWER: Marginal cost at $x=4$ is ₹1680 per unit. This means the cost of producing the next (5th) unit is approximately ₹1680.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A particle moves along a straight line such that its displacement $s$ (in meters) from a fixed point at time $t$ (in seconds) is given by $s(t) = \frac{(t^2+1)^3}{(2t-1)^2}$. Find the velocity of the particle at $t = 2$ s. Also, determine whether the particle is accelerating or decelerating at that instant.
COMPETENCY: Multi-step differentiation combining Quotient Rule and Chain Rule, with physical interpretation of velocity and acceleration.
STEPS:
- Step 1: Velocity $v(t) = \frac{ds}{dt}$. Use Quotient Rule: $s = \frac{u}{v}$ where $u = (t^2+1)^3$, $v = (2t-1)^2$.
- Step 2: Find $u'$ using Chain Rule: $u' = 3(t^2+1)^2 \cdot 2t = 6t(t^2+1)^2$.
- Step 3: Find $v'$ using Chain Rule: $v' = 2(2t-1)^1 \cdot 2 = 4(2t-1)$.
- Step 4: Apply Quotient Rule: $v(t) = \frac{u'v - uv'}{v^2} = \frac{6t(t^2+1)^2(2t-1)^2 - (t^2+1)^3 \cdot 4(2t-1)}{(2t-1)^4}$.
- Step 5: Simplify by factoring $(t^2+1)^2(2t-1)$: $v(t) = \frac{(t^2+1)^2(2t-1)[6t(2t-1) - 4(t^2+1)]}{(2t-1)^4} = \frac{(t^2+1)^2[12t^2 - 6t - 4t^2 - 4]}{(2t-1)^3} = \frac{(t^2+1)^2(8t^2 - 6t - 4)}{(2t-1)^3}$.
- Step 6: Evaluate at $t=2$: $v(2) = \frac{(4+1)^2(32 - 12 - 4)}{(4-1)^3} = \frac{25 \cdot 16}{27} = \frac{400}{27} \approx 14.81$ m/s.
- Step 7: For acceleration, differentiate $v(t)$ again (or note sign of $v'$ at $t=2$). Since $v(2) > 0$ and the expression for $v(t)$ is positive and increasing near $t=2$ (check derivative or test $t=2.1$), acceleration $a(2) > 0$. The particle is accelerating.
ANSWER: Velocity at $t=2$ s is $\frac{400}{27}$ m/s. The particle is accelerating at this instant.
DIFFICULTY: hard