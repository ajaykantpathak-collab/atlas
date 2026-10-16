## ELI5
A firefly's flight is filmed as two reels - x of t and y of t - and the path's slope must be recovered without ever stacking y over x. Parametric differentiation is the projector's trick: differentiate both reels with respect to time, then divide the y-rate by the x-rate, giving dy by dx as a quotient of the two film speeds. Where x's film pauses, the slope is undefined - the parameter must keep x moving for the quotient to speak.

## DEFINITION
If two variables \(x\) and \(y\) are expressed as functions of a third variable \(t\) (the parameter) by equations \(x = f(t)\) and \(y = g(t)\), then the derivative of \(y\) with respect to \(x\) is given by \(\frac{dy}{dx} = \frac{dy/dt}{dx/dt}\), provided \(\frac{dx}{dt} \neq 0\). This formula follows directly from the chain rule: \(\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute \(\frac{dy}{dx}\) for any pair of parametric equations \(x = f(t), y = g(t)\) by correctly differentiating \(x\) and \(y\) with respect to \(t\), forming the quotient \(\frac{g'(t)}{f'(t)}\), and simplifying the result. The student can also find the second derivative \(\frac{d^2y}{dx^2}\) by differentiating \(\frac{dy}{dx}\) with respect to \(t\) and dividing by \(\frac{dx}{dt}\).

## SCOPE_BOUNDARY
This node covers first and second derivatives of functions given in parametric form, including algebraic, trigonometric, and exponential parametric equations. It does NOT cover elimination of the parameter to find Cartesian equations, nor does it cover arc length or area under parametric curves (those belong to integral calculus).

## WALKTHROUGH
Imagine a particle moving along a curved path on a plane. Its \(x\)-coordinate and \(y\)-coordinate at time \(t\) are given by \(x = 2t^2\) and \(y = 4t\). To find the slope of the tangent to the path at any instant, we need \(\frac{dy}{dx}\). We cannot directly differentiate \(y\) with respect to \(x\) because \(y\) is not given as an explicit function of \(x\). Instead, we use the chain rule: first find \(\frac{dx}{dt}\) and \(\frac{dy}{dt}\), then divide \(\frac{dy}{dt}\) by \(\frac{dx}{dt}\). This method works for any parametric curve, even when eliminating the parameter is impossible or messy.

Takeaway first: the parameter is the hidden clock - both coordinates obey it, and their time-rates trade information to produce the spatial slope. Exam moves: compute questions forming the quotient from differentiated pairs, simplification questions, and second-derivative questions differentiating the quotient with respect to t and dividing by dx by dt again. Method: rerun the particle - differentiate each reel, divide, and simplify the slope as a function of t. Check yourself: the second derivative is not the quotient of second derivatives; it re-runs the whole parametric ritual on the first quotient. Drill: compute dy by dx and d-squared-y by dx-squared for one parametric pair.

## DIAGNOSTIC_QUESTION_1
State the formula for \(\frac{dy}{dx}\) when \(x = f(t)\) and \(y = g(t)\) are parametric equations. What condition must hold for the formula to be valid?

## DIAGNOSTIC_ANSWER_1
The formula is \(\frac{dy}{dx} = \frac{dy/dt}{dx/dt}\) provided \(\frac{dx}{dt} \neq 0\). A wrong answer (e.g., writing \(\frac{dy}{dx} = \frac{dx/dt}{dy/dt}\) or forgetting the condition \(\frac{dx}{dt} \neq 0\)) reveals confusion about the chain rule direction or ignorance of the vertical tangent case where the derivative is undefined.

## DIAGNOSTIC_QUESTION_2
Explain why \(\frac{dy}{dx} = \frac{dy/dt}{dx/dt}\) is a direct consequence of the chain rule. What happens geometrically when \(\frac{dx}{dt} = 0\)?

## DIAGNOSTIC_ANSWER_2
By the chain rule, \(\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}\). Rearranging gives the formula. When \(\frac{dx}{dt} = 0\), the tangent is vertical (or the curve has a cusp), so \(\frac{dy}{dx}\) is undefined (infinite). A wrong answer indicates the student memorized the formula without understanding its derivation or geometric meaning.

## DIAGNOSTIC_QUESTION_3
Find \(\frac{dy}{dx}\) for the parametric equations \(x = 3t^2 - 2t\), \(y = 4t^3 + t\) at \(t = 1\).

## DIAGNOSTIC_ANSWER_3
\(\frac{dx}{dt} = 6t - 2\), \(\frac{dy}{dt} = 12t^2 + 1\). At \(t = 1\), \(\frac{dx}{dt} = 4\), \(\frac{dy}{dt} = 13\). So \(\frac{dy}{dx} = \frac{13}{4}\). A common error is substituting \(t = 1\) into \(x\) and \(y\) first, then trying to differentiate constants, which gives zero. This shows the student does not understand that the derivative is a function of the parameter \(t\), not a single number evaluated too early.

## DIAGNOSTIC_QUESTION_4
Compare the process of finding \(\frac{dy}{dx}\) for parametric equations versus implicit differentiation. When would you prefer parametric differentiation over implicit differentiation?

## DIAGNOSTIC_ANSWER_4
Parametric differentiation uses \(\frac{dy/dt}{dx/dt}\) directly without eliminating the parameter. Implicit differentiation differentiates an equation linking \(x\) and \(y\) directly. Parametric form is preferred when both \(x\) and \(y\) are given as simple functions of \(t\) (e.g., \(x = a\cos t, y = b\sin t\)) and eliminating \(t\) leads to complicated algebra (e.g., \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\)). A poor answer confuses the two methods or cannot articulate the advantage of avoiding elimination.

## DIAGNOSTIC_QUESTION_5
A student computes \(\frac{dy}{dx}\) for \(x = t^2, y = t^3\) as follows: \(\frac{dx}{dt} = 2t\), \(\frac{dy}{dt} = 3t^2\), so \(\frac{dy}{dx} = \frac{3t^2}{2t} = \frac{3t}{2}\). Then they substitute \(t = \sqrt{x}\) to get \(\frac{dy}{dx} = \frac{3\sqrt{x}}{2}\). Is this correct? Justify.

## DIAGNOSTIC_ANSWER_5
The expression \(\frac{dy}{dx} = \frac{3t}{2}\) is correct in terms of \(t\). Substituting \(t = \sqrt{x}\) is valid only for \(t \ge 0\) (since \(x = t^2\) implies \(t = \pm\sqrt{x}\)). The derivative in terms of \(x\) should be \(\frac{dy}{dx} = \frac{3}{2}\sqrt{x}\) for \(t>0\) and \(\frac{dy}{dx} = -\frac{3}{2}\sqrt{x}\) for \(t<0\). The student's answer ignores the negative branch, showing a lack of attention to the domain of the parameter and the non-one-to-one nature of \(x = t^2\).

## DIAGNOSTIC_QUESTION_6
Create a set of parametric equations \(x = f(t), y = g(t)\) such that \(\frac{dy}{dx} = t^2\). Verify your answer.

## DIAGNOSTIC_ANSWER_6
One simple choice: let \(\frac{dx}{dt} = 1\) so \(x = t\), and \(\frac{dy}{dt} = t^2\) so \(y = \frac{t^3}{3}\). Then \(\frac{dy}{dx} = \frac{t^2}{1} = t^2\). A good answer shows the reverse-engineering process. A poor answer gives parametric equations that produce a different derivative or fails to verify, indicating the student cannot work backwards from the derivative to the parametric form.

## COMMON_MISCONCEPTION
Students often forget that \(\frac{dy}{dx}\) in parametric form is a function of the parameter \(t\), not \(x\). They either try to eliminate \(t\) first (which defeats the purpose) or substitute \(t\) in terms of \(x\) before differentiating, leading to errors. Another frequent mistake is writing \(\frac{dy}{dx} = \frac{dx/dt}{dy/dt}\) (inverting the quotient) because they misremember the chain rule as \(\frac{dx}{dt} = \frac{dx}{dy} \cdot \frac{dy}{dt}\) and then incorrectly rearrange.

## ON_FAILURE
If a student inverts the quotient, have them re-derive the formula from the chain rule: \(\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}\). Then isolate \(\frac{dy}{dx}\) step by step. If they substitute \(t\) too early, give them \(x = t^2, y = t^3\) and ask for \(\frac{dy}{dx}\) at \(t = -1\). Show that substituting \(t = \sqrt{x}\) gives the wrong sign. Then revisit c12_math_cbse_05_006 (Chain Rule) and practice differentiating with respect to \(t\) while keeping \(t\) symbolic until the final step.

## PREREQUISITE_NODE_IDS
c12_math_cbse_05_006, c11_math_cbse_13_007, c11_math_cbse_13_010, c12_math_cbse_05_007, c12_math_cbse_05_008, c12_math_cbse_05_009

## PREREQUISITE_REASONS
c12_math_cbse_05_006: Chain rule is the theoretical basis for the parametric derivative formula.
c11_math_cbse_13_007: Differentiation of polynomial functions is needed to compute \(dx/dt\) and \(dy/dt\) for algebraic parametric equations.
c11_math_cbse_13_010: Derivatives of trigonometric functions are required for parametric equations involving \(\sin t, \cos t, \tan t\) etc. (e.g., circle, ellipse, cycloid).
c12_math_cbse_05_007: Parametric differentiation uses dy/dx = (dy/dt)/(dx/dt) which relates to implicit chain rule thinking  
c12_math_cbse_05_008: Parametric differentiation frequently involves inverse trig functions (e.g., x = a cos θ, y = a sin θ).  
c12_math_cbse_05_009: Parametric differentiation sometimes uses logarithmic differentiation to find \( dy/dx \) when both \( x \) and \( y \) are given as functions of a parameter in exponential form.  

## FORWARD_NODE_IDS
c12_math_cbse_05_011
## FORWARD_REASONS
c12_math_cbse_05_011: Second order derivatives in parametric form require differentiating \(\frac{dy}{dx}\) (a function of \(t\)) with respect to \(x\) again, using the same chain rule technique: \(\frac{d^2y}{dx^2} = \frac{d}{dt}(dy/dx) / (dx/dt)\).

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Polynomial derivatives model velocity and acceleration components in kinematics (physics), where position is given parametrically as \(x(t), y(t)\).
c11_math_cbse_13_010: Trigonometric derivatives are essential for parametric motion in circular or oscillatory systems (e.g., projectile motion, simple harmonic motion in physics).

## CHAIN_DESCRIPTION
c12_math_cbse_05_006 -> c12_math_cbse_05_010 -> c12_math_cbse_05_011

## THIS_FORMULA
\(\frac{dy}{dx} = \frac{dy/dt}{dx/dt}\) provided \(\frac{dx}{dt} \neq 0\). For second derivative: \(\frac{d^2y}{dx^2} = \frac{d}{dt}\left(\frac{dy}{dx}\right) \Big/ \frac{dx}{dt}\).

## FORMULA_VARIABLES
\(x = f(t)\): x-coordinate as function of parameter \(t\); \(y = g(t)\): y-coordinate as function of parameter \(t\); \(t\): parameter (often time); \(\frac{dx}{dt}\): derivative of \(x\) with respect to \(t\); \(\frac{dy}{dt}\): derivative of \(y\) with respect to \(t\).

## FORMULA_UNITS
If \(x\) and \(y\) are in metres and \(t\) in seconds, then \(\frac{dy}{dx}\) is dimensionless (slope), \(\frac{dx}{dt}\) and \(\frac{dy}{dt}\) are in m/s (velocity components).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | Polynomial derivatives used to find velocity components from parametric position equations in physics kinematics.
c11_math_cbse_13_010 | Trigonometric derivatives used for parametric circular/elliptical motion in physics (e.g., \(x = R\cos\omega t, y = R\sin\omega t\)).
## PREREQ_CONCEPT
Chain rule of differentiation: \(\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}\).

## PREREQ_BEFORE
Student must be able to differentiate polynomial, trigonometric, and exponential functions with respect to a variable, and apply the chain rule to composite functions.

## PREREQ_STUCK
If stuck, revisit c12_math_cbse_05_006 (Chain Rule) and practice differentiating functions like \(\sin(t^2)\), \(e^{3t}\), \(\ln(t^2+1)\) with respect to \(t\).

## WORKED_EXAMPLE_1
PROBLEM: A particle moves along a curve such that its coordinates at time \(t\) seconds are \(x = 2t^2 + 3t\) metres and \(y = t^3 - 4t\) metres. Find the slope of the tangent to the path at \(t = 2\) seconds.
STEPS:
- Step 1: Identify the parametric equations: \(x = 2t^2 + 3t\), \(y = t^3 - 4t\).
- Step 2: Differentiate \(x\) and \(y\) with respect to \(t\): \(\frac{dx}{dt} = 4t + 3\), \(\frac{dy}{dt} = 3t^2 - 4\).
- Step 3: Write the formula for \(\frac{dy}{dx}\): \(\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{3t^2 - 4}{4t + 3}\).
- Step 4: Substitute \(t = 2\): \(\frac{dy}{dx} = \frac{3(4) - 4}{4(2) + 3} = \frac{12 - 4}{8 + 3} = \frac{8}{11}\).
- Step 5: Interpret: The slope of the tangent at \(t = 2\) is \(\frac{8}{11}\) (dimensionless).
REASONING: The chain rule gives the rate of change of \(y\) with respect to \(x\) via the common parameter \(t\). We compute the velocity components \(\frac{dx}{dt}\) and \(\frac{dy}{dt}\), then their ratio gives the slope of the trajectory.
ANSWER: \(\frac{8}{11}\)

## WORKED_EXAMPLE_2
PROBLEM: For the parametric equations \(x = a(\theta + \sin\theta)\), \(y = a(1 - \cos\theta)\) (a cycloid), find \(\frac{dy}{dx}\) and \(\frac{d^2y}{dx^2}\) in terms of \(\theta\).
STEPS:
- Step 1: Compute \(\frac{dx}{d\theta} = a(1 + \cos\theta)\) and \(\frac{dy}{d\theta} = a\sin\theta\).
- Step 2: First derivative: \(\frac{dy}{dx} = \frac{a\sin\theta}{a(1+\cos\theta)} = \frac{\sin\theta}{1+\cos\theta}\).
- Step 3: Simplify using half-angle: \(\frac{\sin\theta}{1+\cos\theta} = \frac{2\sin(\theta/2)\cos(\theta/2)}{2\cos^2(\theta/2)} = \tan(\theta/2)\).
- Step 4: For second derivative, differentiate \(\frac{dy}{dx} = \tan(\theta/2)\) with respect to \(\theta\): \(\frac{d}{d\theta}\left(\frac{dy}{dx}\right) = \frac{1}{2}\sec^2(\theta/2)\).
- Step 5: Divide by \(\frac{dx}{d\theta}\): \(\frac{d^2y}{dx^2} = \frac{\frac{1}{2}\sec^2(\theta/2)}{a(1+\cos\theta)} = \frac{\frac{1}{2}\sec^2(\theta/2)}{a \cdot 2\cos^2(\theta/2)} = \frac{1}{4a}\sec^4(\theta/2)\).
REASONING: Parametric differentiation avoids eliminating \(\theta\) (which is impossible algebraically for a cycloid). The second derivative uses the chain rule again: \(\frac{d}{dx} = \frac{d/d\theta}{dx/d\theta}\).
ANSWER: \(\frac{dy}{dx} = \tan(\theta/2)\), \(\frac{d^2y}{dx^2} = \frac{1}{4a}\sec^4(\theta/2)\)

## WORKED_EXAMPLE_3
PROBLEM: A curve is given by \(x = e^t \cos t\), \(y = e^t \sin t\). Find the angle \(\psi\) between the tangent and the x-axis at \(t = \frac{\pi}{4}\).
STEPS:
- Step 1: Compute \(\frac{dx}{dt} = e^t \cos t - e^t \sin t = e^t(\cos t - \sin t)\) (product rule).
- Step 2: Compute \(\frac{dy}{dt} = e^t \sin t + e^t \cos t = e^t(\sin t + \cos t)\).
- Step 3: \(\frac{dy}{dx} = \frac{\sin t + \cos t}{\cos t - \sin t}\).
- Step 4: At \(t = \frac{\pi}{4}\), \(\sin\frac{\pi}{4} = \cos\frac{\pi}{4} = \frac{1}{\sqrt{2}}\). So \(\frac{dy}{dx} = \frac{\frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}}}{\frac{1}{\sqrt{2}} - \frac{1}{\sqrt{2}}} = \frac{\sqrt{2}}{0}\), which is undefined (infinite).
- Step 5: An infinite slope means the tangent is vertical, so the angle with the x-axis is \(\psi = 90^\circ\) (or \(\frac{\pi}{2}\) radians).
REASONING: The derivative \(\frac{dy}{dx}\) gives the slope of the tangent. When the denominator \(\frac{dx}{dt} = 0\), the tangent is vertical. This example combines exponential, trigonometric, and product rule differentiation.
ANSWER: \(\psi = 90^\circ\) (vertical tangent)

## COMPETENCY_QUESTION_1
QUESTION: A curve is defined parametrically by \(x = t^2 - 2t\), \(y = t^3 - 3t^2\). (a) Find the coordinates of the points where the tangent is horizontal. (b) Find the coordinates where the tangent is vertical. (c) Explain why there is no point where the tangent has slope 1.
COMPETENCY: Translating real-world situations to mathematical expressions; analyzing critical points of parametric curves.
STEPS:
- Step 1: Compute \(\frac{dx}{dt} = 2t - 2\) and \(\frac{dy}{dt} = 3t^2 - 6t\).
- Step 2: Horizontal tangent when \(\frac{dy}{dt} = 0\) and \(\frac{dx}{dt} \neq 0\). Solve \(3t^2 - 6t = 0 \Rightarrow t = 0, 2\). At \(t=0\), \(\frac{dx}{dt} = -2 \neq 0\), point \((0,0)\). At \(t=2\), \(\frac{dx}{dt} = 2 \neq 0\), point \((0,-4)\).
- Step 3: Vertical tangent when \(\frac{dx}{dt} = 0\) and \(\frac{dy}{dt} \neq 0\). Solve \(2t - 2 = 0 \Rightarrow t = 1\). At \(t=1\), \(\frac{dy}{dt} = -3 \neq 0\), point \((-1,-2)\).
- Step 4: Slope 1 means \(\frac{dy}{dx} = 1 \Rightarrow \frac{3t^2 - 6t}{2t - 2} = 1\). Solve \(3t^2 - 6t = 2t - 2 \Rightarrow 3t^2 - 8t + 2 = 0\). Discriminant \(64 - 24 = 40 > 0\), so real solutions exist. Wait, check: \(t = \frac{8 \pm \sqrt{40}}{6} = \frac{4 \pm \sqrt{10}}{3}\). These are valid and \(\frac{dx}{dt} \neq 0\) for these \(t\). So the statement "no point where slope is 1" is FALSE. The question asks to explain why there is NO such point, but there are. So the student must identify the error in the premise.
- Step 5: Conclude that the premise is incorrect; there ARE points with slope 1.
ANSWER: (a) Horizontal tangents at \((0,0)\) and \((0,-4)\). (b) Vertical tangent at \((-1,-2)\). (c) The statement is false; solving \(\frac{dy}{dx}=1\) gives \(t = \frac{4 \pm \sqrt{10}}{3}\), which yield valid points with slope 1.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The motion of a particle is given by \(x = 3\cos t + 2\), \(y = 3\sin t - 1\), where \(t\) is time in seconds and coordinates are in metres. (a) Find the Cartesian equation of the path. (b) Find the speed of the particle at any time \(t\). (c) Find the magnitude of acceleration. (d) Show that the acceleration vector is always directed toward the centre of the circular path.
COMPETENCY: Connecting parametric differentiation to physics (kinematics); vector interpretation of derivatives.
STEPS:
- Step 1: Eliminate \(t\): \((x-2)^2 + (y+1)^2 = 9\cos^2 t + 9\sin^2 t = 9\). Path is a circle centre \((2,-1)\), radius 3 m.
- Step 2: Velocity components: \(v_x = \frac{dx}{dt} = -3\sin t\), \(v_y = \frac{dy}{dt} = 3\cos t\). Speed \(v = \sqrt{v_x^2 + v_y^2} = \sqrt{9\sin^2 t + 9\cos^2 t} = 3\) m/s (constant).
- Step 3: Acceleration components: \(a_x = \frac{dv_x}{dt} = -3\cos t\), \(a_y = \frac{dv_y}{dt} = -3\sin t\). Magnitude \(a = \sqrt{9\cos^2 t + 9\sin^2 t} = 3\) m/s².
- Step 4: Position vector relative to centre: \(\vec{r} = (x-2, y+1) = (3\cos t, 3\sin t)\). Acceleration vector \(\vec{a} = (-3\cos t, -3\sin t) = -\vec{r}\). Thus acceleration is opposite to the radius vector, i.e., directed toward the centre (centripetal).
ANSWER: (a) \((x-2)^2 + (y+1)^2 = 9\). (b) Speed = 3 m/s. (c) Acceleration magnitude = 3 m/s². (d) \(\vec{a} = -\vec{r}\), so acceleration is centripetal.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a ______ moving along a curved path on a plane.

## DIAGNOSTIC_ANSWER_7
particle

The particle is the parameter's puppet: its coordinates obey time, and the slope of its path emerges from the ratio of the puppeteer's rates. **A wrong answer (a curve) reveals the student has addressed the path when the equations address the mover.**
