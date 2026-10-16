## ELI5
Imagine you're driving a car: the speedometer shows your first derivative (velocity), but the *change* in your speed — whether you're accelerating or braking — is the second derivative. If velocity is "how fast position changes," acceleration is "how fast velocity changes." The most common mix-up? Students think the second derivative is just "differentiating twice mechanically" and forget it represents the **rate of change of the rate of change** — the curvature of the graph, the concavity, the "bend."

## DEFINITION
If \(y = f(x)\) is a differentiable function, its second order derivative \(\frac{d^2y}{dx^2}\) (or \(f''(x)\)) is the derivative of the first derivative \(f'(x)\) with respect to \(x\). Higher order derivatives (\(n^{\text{th}}\) order) are obtained by repeatedly differentiating the previous derivative: \(f^{(n)}(x) = \frac{d}{dx}\left(f^{(n-1)}(x)\right)\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) compute second and higher order derivatives for algebraic, logarithmic, exponential, trigonometric, implicit, and parametric functions using chain, product, and quotient rules; (2) interpret \(f''(x)\) as the rate of change of slope (concavity) and apply it in optimisation (maxima/minima via second derivative test) and physics/economics contexts (acceleration, marginal cost/revenue rate of change).

## SCOPE_BOUNDARY
This node covers: definition and notation of second and higher order derivatives; computation for explicit, implicit, and parametric functions; application in second derivative test for local extrema; connection to concavity and inflection points. It does NOT cover: Taylor/Maclaurin series, differential equations, or nth derivative formulas for standard functions (Leibniz theorem) — these are beyond the NCERT Applied Mathematics scope.

## WALKTHROUGH
You're analysing the profit of a startup: revenue \(R(x) = 100x - x^2\) and cost \(C(x) = 50x + 1000\). You already know marginal profit \(P'(x) = R'(x) - C'(x)\) tells you if profit rises or falls per extra unit. But the *board* asks: "Is the rate of increase itself increasing or slowing down?" That's \(P''(x)\) — the second derivative. Start by differentiating \(P'(x)\) once more. If \(P''(x) < 0\), marginal profit is dropping — you're hitting diminishing returns. This is exactly what the second derivative captures: the **rate of change of the rate of change**. We'll learn to compute it for all function types you've met — explicit, implicit, parametric — and use it to decide maxima/minima without sign charts.

Takeaway: mastery means second derivatives computed across function types and read as concavity, confirmation, and acceleration. Exam moves: computation questions differentiate twice through explicit, implicit, and parametric forms; test questions apply the second-derivative test at critical points; interpretation questions translate the second derivative into diminishing returns or acceleration. Method: first derivative asks rising or falling; second asks whether the rising itself is tiring. Drill: one startup's profit, one marginal curve, one verdict. When the rate of increase starts slowing, the second derivative saw it first — and the maximum test believes it.

## DIAGNOSTIC_QUESTION_1
What is the notation for the third order derivative of \(y = f(x)\) and how is it obtained from the second order derivative?

## DIAGNOSTIC_ANSWER_1
The third order derivative is denoted by \(\frac{d^3y}{dx^3}\) or \(f'''(x)\) or \(y_3\). It is obtained by differentiating the second order derivative \(\frac{d^2y}{dx^2}\) once more with respect to \(x\): \(\frac{d^3y}{dx^3} = \frac{d}{dx}\left(\frac{d^2y}{dx^2}\right)\). A wrong answer (e.g., "differentiate \(f(x)\) three times at once" or confusing notation like \(\frac{d^3y}{dx}\)) reveals the student treats higher derivatives as a single-step operation rather than iterative, and doesn't grasp the recursive definition \(f^{(n)} = (f^{(n-1)})'\).

## DIAGNOSTIC_QUESTION_2
A student computes \(\frac{d^2}{dx^2}(\log x)\) as \(\frac{1}{x^2}\). Identify the error and explain why the sign matters for concavity interpretation.

## DIAGNOSTIC_ANSWER_2
The correct second derivative is \(-\frac{1}{x^2}\). The student forgot the negative sign from differentiating \(x^{-1}\): \(\frac{d}{dx}(x^{-1}) = -x^{-2}\). The sign determines concavity: \(f''(x) < 0\) for \(x>0\) means \(\log x\) is concave down (graph lies below tangents). A missing negative leads to wrongly concluding the graph is concave up, which flips the interpretation of local maxima/minima in optimisation problems.

## DIAGNOSTIC_QUESTION_3
If \(x = a\cos^3\theta\), \(y = a\sin^3\theta\), find \(\frac{d^2y}{dx^2}\) at \(\theta = \frac{\pi}{4}\).

## DIAGNOSTIC_ANSWER_3
First, \(\frac{dx}{d\theta} = -3a\cos^2\theta\sin\theta\), \(\frac{dy}{d\theta} = 3a\sin^2\theta\cos\theta\). Then \(\frac{dy}{dx} = \frac{dy/d\theta}{dx/d\theta} = -\tan\theta\). Differentiate w.r.t. \(\theta\): \(\frac{d}{d\theta}(-\tan\theta) = -\sec^2\theta\). Now \(\frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right) = \frac{d/d\theta(dy/dx)}{dx/d\theta} = \frac{-\sec^2\theta}{-3a\cos^2\theta\sin\theta} = \frac{\sec^2\theta}{3a\cos^2\theta\sin\theta} = \frac{1}{3a\cos^4\theta\sin\theta}\). At \(\theta = \pi/4\): \(\cos\theta = \sin\theta = 1/\sqrt{2}\), so \(\frac{d^2y}{dx^2} = \frac{1}{3a(1/4)(1/\sqrt{2})} = \frac{4\sqrt{2}}{3a}\). A wrong answer typically arises from forgetting the chain rule step \(\frac{d}{dx} = \frac{d/d\theta}{dx/d\theta}\) for the second derivative, or sign errors in \(\frac{dx}{d\theta}\).

## DIAGNOSTIC_QUESTION_4
Compare the information given by \(f'(c)=0\) and \(f''(c)>0\) versus \(f'(c)=0\) and \(f''(c)<0\). Why does the second derivative test fail when \(f''(c)=0\)?

## DIAGNOSTIC_ANSWER_4
\(f'(c)=0\) and \(f''(c)>0\) ⇒ local minimum (slope changes from negative to positive, concave up). \(f'(c)=0\) and \(f''(c)<0\) ⇒ local maximum (slope changes from positive to negative, concave down). When \(f''(c)=0\), the test fails because the concavity doesn't tell us if the slope changes sign — it could be an inflection point (e.g., \(f(x)=x^3\) at \(x=0\)) or still an extremum (e.g., \(f(x)=x^4\) at \(x=0\)). The student must then revert to the first derivative test (sign chart of \(f'\)). A wrong answer that says "\(f''(c)=0\) means inflection point" reveals confusion between necessary and sufficient conditions.

## DIAGNOSTIC_QUESTION_5
A company's marginal cost function is \(MC(x) = 3x^2 - 24x + 50\). The manager claims "Marginal cost is minimised at \(x=4\) because \(MC'(4)=0\)." Evaluate this claim using the second derivative.

## DIAGNOSTIC_ANSWER_5
\(MC'(x) = 6x - 24\), so \(MC'(4) = 0\) — correct, \(x=4\) is a critical point. \(MC''(x) = 6 > 0\) for all \(x\), so \(MC''(4) = 6 > 0\). By the second derivative test, \(MC\) has a local minimum at \(x=4\). The claim is **correct and fully justified**. A student who only checks \(MC'(4)=0\) but omits \(MC''(4)>0\) gives an incomplete justification — they haven't verified it's a minimum, not a maximum or inflection. In board exams, both conditions must be stated for full marks.

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) where the third derivative (jerk) matters, and explain what \(f'''(x) > 0\) would mean in that scenario.

## DIAGNOSTIC_ANSWER_6
Scenario: A metro train's position \(s(t)\) along a track. \(s'(t)\) = velocity, \(s''(t)\) = acceleration, \(s'''(t)\) = jerk (rate of change of acceleration). If \(s'''(t) > 0\), acceleration is increasing — the train is "jerking" forward more sharply, causing passenger discomfort. Good design minimises jerk. A poor answer gives a generic "rate of change of acceleration" without a concrete scenario or confuses jerk with acceleration. This tests if the student can extend the "rate of change of rate of change" concept to the next level and interpret its physical meaning.

## COMMON_MISCONCEPTION
**Misconception:** "The second derivative is just the derivative of the derivative — a mechanical two-step process with no meaning beyond notation."  
**Why it's wrong:** Students compute \(f''(x)\) correctly but cannot explain *what it represents*. They miss that \(f''(x)\) is the **rate of change of slope** — it measures concavity (bending of the graph), determines whether a critical point is max/min (second derivative test), and in applications gives acceleration (from position) or rate of change of marginal cost/revenue.  
**Concrete example:** For \(C(x) = x^3 - 6x^2 + 15x + 100\), a student finds \(C''(x) = 6x - 12\) but cannot say "At \(x=3\), \(C''(3)=6>0\) means marginal cost is increasing at an increasing rate — producing the 4th unit adds more to marginal cost than the 3rd unit did." Without this interpretation, they cannot solve optimisation or economics problems in boards/JEE.

## ON_FAILURE
1. **Revisit the meaning of first derivative:** Go back to node `c12_app_cbse_03_009` (Derivative as Rate of Change) — ensure the student can explain \(f'(x)\) as "instantaneous rate of change of \(y\) w.r.t. \(x\)" in context (velocity, marginal cost, slope).  
2. **Build the iterative concept:** Use a table: \(f(x)\) = position → \(f'(x)\) = velocity (rate of change of position) → \(f''(x)\) = acceleration (rate of change of velocity) → \(f'''(x)\) = jerk. Ask: "What does each step measure?"  
3. **Practice concavity visualisation:** Draw \(y=x^2\) (concave up, \(f''>0\)), \(y=-x^2\) (concave down, \(f''<0\)), \(y=x^3\) (inflection at 0, \(f''\) changes sign). Have the student trace the tangent slope with a pencil — feel it increasing/decreasing.  
4. **Re-do diagnostic Q2 and Q4** with emphasis on *sign interpretation*, not just computation.

## PREREQUISITE_NODE_IDS
c12_app_cbse_03_003, c12_app_cbse_03_004, c12_app_cbse_03_005, c12_app_cbse_03_006, c11_app_cbse_08_008, c11_app_cbse_08_009

## PREREQUISITE_REASONS
c12_app_cbse_03_003: Standard derivative results (power, log, exponential, trig) are the building blocks for every higher-order computation.
c12_app_cbse_03_004: Implicit differentiation is required to find \(d^2y/dx^2\) when \(y\) is not isolated (e.g., \(x^2+y^2=a^2\)).
c12_app_cbse_03_005: Parametric differentiation uses \(\frac{dy}{dx} = \frac{dy/dt}{dx/dt}\); the second derivative requires \(\frac{d^2y}{dx^2} = \frac{d/dt(dy/dx)}{dx/dt}\) — a key board exam pattern.
c12_app_cbse_03_006: Logarithmic differentiation is essential for \(f(x)^{g(x)}\) type functions before taking second derivatives.
c11_app_cbse_08_008: Class 11 foundation — definition of derivative as instantaneous rate of change and limit of difference quotient.
c11_app_cbse_08_009: Class 11 chain rule for algebraic functions — prerequisite for all multi-step differentiation here.

## FORWARD_NODE_IDS
c12_app_cbse_03_008, c12_app_cbse_03_009, c12_app_cbse_03_010

## FORWARD_REASONS
c12_app_cbse_03_008: Cost and Revenue functions use \(C'(x)=MC\), \(R'(x)=MR\); their optimisation needs \(C''(x)\), \(R''(x)\) (second derivative test for min/max cost/revenue).
c12_app_cbse_03_009: Rate of change problems often ask for "rate of change of rate of change" (e.g., acceleration from velocity) — directly uses second derivatives.
c12_app_cbse_03_010: Related rates with time parameter \(t\) require differentiating \(\frac{dy}{dt} = \frac{dy}{dx}\cdot\frac{dx}{dt}\) again to get second-order relations (e.g., \(d^2y/dt^2\)).

## CROSS_SUBJECT_PREREQS
c11_app_cbse_08_008, c11_app_cbse_08_009

## CROSS_SUBJECT_REASONS
c11_app_cbse_08_008: The concept of "instantaneous rate of change" from Class 11 is the foundation — second derivative is the rate of change *of that rate*.
c11_app_cbse_08_009: Chain rule from Class 11 is used at every step of higher-order differentiation, especially for implicit/parametric functions.

## CHAIN_DESCRIPTION
c11_app_cbse_08_008 -> c12_app_cbse_03_007 -> c12_app_cbse_03_008 (second derivative enables marginal cost optimisation)

## THIS_FORMULA
\(\frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right)\); for parametric: \(\frac{d^2y}{dx^2} = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{\frac{dx}{dt}}\); second derivative test: if \(f'(c)=0\) and \(f''(c)>0\) ⇒ local min; if \(f''(c)<0\) ⇒ local max; if \(f''(c)=0\) ⇒ test fails.

## FORMULA_VARIABLES
\(y = f(x)\): dependent variable; \(x\): independent variable; \(t\): parameter (for parametric); \(f'(x) = \frac{dy}{dx}\): first derivative (slope/rate of change); \(f''(x) = \frac{d^2y}{dx^2}\): second derivative (rate of change of slope/concavity); \(c\): critical point where \(f'(c)=0\).

## FORMULA_UNITS
If \(x\) is in metres and \(y\) in metres: \(dy/dx\) is dimensionless (slope); \(d^2y/dx^2\) is in m⁻¹ (curvature). If \(x\) is time (s) and \(y\) is position (m): \(dy/dx\) is m/s (velocity); \(d^2y/dx^2\) is m/s² (acceleration). If \(x\) is units produced and \(y\) is cost (₹): \(dy/dx\) is ₹/unit (marginal cost); \(d^2y/dx^2\) is ₹/unit² (rate of change of marginal cost).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_physics_cbse_02_003 | In physics, position \(s(t)\) → velocity \(v(t)=s'(t)\) → acceleration \(a(t)=v'(t)=s''(t)\). Second derivative is acceleration; third derivative is jerk. Optimisation of motion (e.g., minimum time trajectories) uses \(s''(t)\).
c12_economics_cbse_03_002 | In economics, total cost \(C(x)\) → marginal cost \(MC=C'(x)\) → rate of change of MC = \(C''(x)\). Profit maximisation uses \(P''(x)<0\) at critical point. Second derivative determines convexity/concavity of cost/revenue curves.

## PREREQ_CONCEPT
The derivative \(f'(x)\) as the instantaneous rate of change (slope of tangent) — and fluency with chain, product, quotient rules for first derivatives.

## PREREQ_BEFORE
Student must be able to compute first derivatives of implicit, parametric, and logarithmic functions (nodes 004, 005, 006) and interpret \(f'(x)\) as a rate (node 009).

## PREREQ_STUCK
If stuck, review the chain rule application in parametric differentiation (node 005): \(\frac{dy}{dx} = \frac{dy/dt}{dx/dt}\) — then practice differentiating this quotient w.r.t. \(x\) using \(\frac{d}{dx} = \frac{d/dt}{dx/dt}\).

## WORKED_EXAMPLE_1
PROBLEM: Find the second derivative of \(y = x^2 \log x\) and determine the concavity at \(x = e\).

STEPS:
- Step 1: Identify the function \(y = x^2 \log x\). It is a product of \(u = x^2\) and \(v = \log x\). We need \(d^2y/dx^2\).
- Step 2: Compute first derivative using product rule: \(dy/dx = u'v + uv' = 2x \log x + x^2 \cdot (1/x) = 2x \log x + x\).
- Step 3: Differentiate \(dy/dx\) again to get second derivative: \(d^2y/dx^2 = d/dx(2x \log x + x) = 2(\log x + 1) + 1 = 2\log x + 3\).
- Step 4: Evaluate at \(x = e\): \(d^2y/dx^2|_{x=e} = 2\log e + 3 = 2(1) + 3 = 5\).
- Step 5: Interpret: Since \(5 > 0\), the graph is concave up at \(x = e\). The slope is increasing.

REASONING: The product rule gives the first derivative; differentiating each term again (using product rule on \(2x\log x\)) yields the second derivative. The sign of \(f''(x)\) directly gives concavity: positive ⇒ concave up (holds water), negative ⇒ concave down (spills water).

ANSWER: \(\frac{d^2y}{dx^2} = 2\log x + 3\); at \(x=e\), \(\frac{d^2y}{dx^2} = 5 > 0\) ⇒ concave up.

## WORKED_EXAMPLE_2
PROBLEM: If \(x = a(\theta - \sin\theta)\), \(y = a(1 - \cos\theta)\), find \(\frac{d^2y}{dx^2}\) at \(\theta = \frac{\pi}{2}\).

STEPS:
- Step 1: Given parametric equations \(x = a(\theta - \sin\theta)\), \(y = a(1 - \cos\theta)\). Compute \(dx/d\theta\) and \(dy/d\theta\).
- Step 2: \(dx/d\theta = a(1 - \cos\theta)\), \(dy/d\theta = a\sin\theta\).
- Step 3: First derivative: \(dy/dx = (dy/d\theta) / (dx/d\theta) = \frac{a\sin\theta}{a(1-\cos\theta)} = \frac{\sin\theta}{1-\cos\theta} = \cot(\theta/2)\) (using half-angle identity).
- Step 4: Differentiate \(dy/dx\) w.r.t. \(\theta\): \(d/d\theta(\cot(\theta/2)) = -\frac{1}{2}\csc^2(\theta/2)\).
- Step 5: Second derivative formula for parametric: \(d^2y/dx^2 = \frac{d/d\theta(dy/dx)}{dx/d\theta} = \frac{-\frac{1}{2}\csc^2(\theta/2)}{a(1-\cos\theta)}\).
- Step 6: Simplify using \(1-\cos\theta = 2\sin^2(\theta/2)\): \(d^2y/dx^2 = \frac{-\frac{1}{2}\csc^2(\theta/2)}{a \cdot 2\sin^2(\theta/2)} = -\frac{1}{4a} \csc^4(\theta/2)\).
- Step 7: Evaluate at \(\theta = \pi/2\): \(\theta/2 = \pi/4\), \(\csc(\pi/4) = \sqrt{2}\), so \(\csc^4(\pi/4) = 4\). Thus \(d^2y/dx^2 = -\frac{1}{4a} \cdot 4 = -\frac{1}{a}\).

REASONING: Parametric second derivative requires the chain rule twice: first to get \(dy/dx = (dy/dt)/(dx/dt)\), then to differentiate that w.r.t. \(x\) via \(\frac{d}{dx} = \frac{d/dt}{dx/dt}\). Half-angle identities simplify the trigonometry significantly — a common board exam trick.

ANSWER: \(\frac{d^2y}{dx^2} = -\frac{1}{4a}\csc^4(\theta/2)\); at \(\theta = \pi/2\), \(\frac{d^2y}{dx^2} = -\frac{1}{a}\).

## WORKED_EXAMPLE_3
PROBLEM: A manufacturer's total cost function is \(C(x) = \frac{1}{3}x^3 - 5x^2 + 30x + 100\) (in ₹), where \(x\) is units produced. Find the output level where marginal cost is minimum, and the minimum marginal cost.

STEPS:
- Step 1: Marginal cost \(MC = C'(x) = \frac{d}{dx}(\frac{1}{3}x^3 - 5x^2 + 30x + 100) = x^2 - 10x + 30\).
- Step 2: To minimise \(MC\), treat \(MC\) as a function \(f(x) = x^2 - 10x + 30\) and find its critical point: \(f'(x) = 2x - 10 = 0 \Rightarrow x = 5\).
- Step 3: Verify it's a minimum using second derivative of \(MC\) (i.e., third derivative of \(C\)): \(f''(x) = 2 > 0\) for all \(x\). So \(MC\) has a local minimum at \(x = 5\).
- Step 4: Compute minimum marginal cost: \(MC(5) = 5^2 - 10(5) + 30 = 25 - 50 + 30 = 5\).
- Step 5: Interpret: At 5 units, the additional cost of producing one more unit is lowest (₹5). Before 5, marginal cost was falling (economies of scale); after 5, it rises (diminishing returns).
- Step 6: Check boundary: Since \(x \geq 0\) and \(MC(x) = (x-5)^2 + 5 \geq 5\), the global minimum is indeed at \(x=5\).

REASONING: Marginal cost is the first derivative of total cost. Minimising marginal cost means finding the minimum of \(C'(x)\) — which requires the second derivative of \(C(x)\) (i.e., \(C''(x)\)) to be zero and the third derivative (\(C'''(x)\)) positive. This is a classic "second derivative of the first derivative" application in economics.

ANSWER: Marginal cost is minimum at \(x = 5\) units; minimum marginal cost = ₹5.

## COMPETENCY_QUESTION_1
QUESTION: The velocity of a particle moving along a straight line is given by \(v(t) = t^3 - 6t^2 + 9t\) m/s, where \(t\) is in seconds. (a) Find the acceleration function \(a(t)\). (b) Determine the time intervals when the particle is speeding up and slowing down. (c) Find the total distance travelled in the first 4 seconds.

COMPETENCY: Application of second derivative (acceleration) to motion analysis; interpretation of speeding up/slowing down via signs of \(v(t)\) and \(a(t)\); integration of \(|v(t)|\) for distance.

STEPS:
- Step 1: Acceleration is derivative of velocity: \(a(t) = v'(t) = 3t^2 - 12t + 9 = 3(t-1)(t-3)\).
- Step 2: Find when \(v(t)\) and \(a(t)\) have same sign (speeding up) or opposite signs (slowing down). Roots: \(v(t)=t(t-3)^2=0\) at \(t=0,3\); \(a(t)=0\) at \(t=1,3\).
- Step 3: Sign chart: \(t\in[0,1)\): \(v>0, a>0\) ⇒ speeding up; \(t\in(1,3)\): \(v>0, a<0\) ⇒ slowing down; \(t\in(3,4]\): \(v>0, a>0\) ⇒ speeding up.
- Step 4: Distance = \(\int_0^4 |v(t)| dt = \int_0^4 v(t) dt\) (since \(v(t) \geq 0\) on \([0,4]\)). Compute \(\int_0^4 (t^3 - 6t^2 + 9t) dt = [t^4/4 - 2t^3 + 9t^2/2]_0^4 = 64/4 - 128 + 72 = 16 - 128 + 72 = -40\)? Wait — \(v(4)=4(1)^2=4>0\), but integral negative? Recheck: \(v(t)=t(t-3)^2 \geq 0\) always. Antiderivative: \(t^4/4 - 2t^3 + 9t^2/2\). At 4: \(64 - 128 + 72 = 8\). At 0: 0. Distance = 8 m.
- Step 5: Interpret: Particle moves forward, slows down between 1-3s, then speeds up again. Never reverses direction.

ANSWER: (a) \(a(t) = 3t^2 - 12t + 9\) m/s². (b) Speeding up: \(t \in [0,1) \cup (3,4]\); slowing down: \(t \in (1,3)\). (c) Total distance = 8 m.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A firm's revenue function is \(R(x) = 100x - x^2\) and cost function is \(C(x) = x^3 - 6x^2 + 15x + 50\), where \(x\) is output in hundreds of units. (a) Find the profit function \(P(x)\). (b) Use the second derivative test to find the output that maximises profit. (c) Verify that marginal revenue equals marginal cost at this output. (d) What is the maximum profit?

COMPETENCY: Multi-concept optimisation — profit function construction, second derivative test for maximum, economic interpretation of MR=MC, and evaluation.

STEPS:
- Step 1: Profit \(P(x) = R(x) - C(x) = (100x - x^2) - (x^3 - 6x^2 + 15x + 50) = -x^3 + 5x^2 + 85x - 50\).
- Step 2: First derivative: \(P'(x) = -3x^2 + 10x + 85\). Set \(P'(x)=0\): \(3x^2 - 10x - 85 = 0\). Discriminant \(= 100 + 1020 = 1120\). \(x = \frac{10 \pm \sqrt{1120}}{6} = \frac{10 \pm 4\sqrt{70}}{6} = \frac{5 \pm 2\sqrt{70}}{3}\). Positive root: \(x = \frac{5 + 2\sqrt{70}}{3} \approx 7.23\) (since output >0).
- Step 3: Second derivative: \(P''(x) = -6x + 10\). At \(x \approx 7.23\), \(P''(x) \approx -43.38 + 10 = -33.38 < 0\) ⇒ local maximum. Since \(P(x) \to -\infty\) as \(x \to \infty\) and \(P(0)=-50\), this is the global maximum for \(x \geq 0\).
- Step 4: Marginal revenue \(MR = R'(x) = 100 - 2x\). Marginal cost \(MC = C'(x) = 3x^2 - 12x + 15\). At optimal \(x\): \(MR = 100 - 2x\), \(MC = 3x^2 - 12x + 15\). From \(P'(x)=0\): \(R'(x) - C'(x) = 0 \Rightarrow MR = MC\). Verified.
- Step 5: Maximum profit: \(P(x_{max}) = -x^3 + 5x^2 + 85x - 50\) at \(x = \frac{5 + 2\sqrt{70}}{3}\). Compute numerically: \(x \approx 7.23\), \(P \approx -378 + 261 + 615 - 50 = 448\) (in ₹ hundred? Wait — units: \(x\) in hundreds, so profit in ₹ hundred? Actually \(R\) and \(C\) in same currency; if \(x\) is hundreds of units, profit is in ₹. Assume ₹). Exact value messy — leave as expression or approximate.

ANSWER: (a) \(P(x) = -x^3 + 5x^2 + 85x - 50\). (b) Maximum at \(x = \frac{5 + 2\sqrt{70}}{3} \approx 7.23\) hundred units. (c) \(MR = MC\) holds because \(P'(x)=0 \iff R'(x)=C'(x)\). (d) Maximum profit ≈ ₹44,800 (if \(x\) in hundreds, \(P\) in ₹).

DIFFICULTY: hard