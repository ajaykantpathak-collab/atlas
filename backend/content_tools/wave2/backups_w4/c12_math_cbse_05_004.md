## ELI5
A car's speedometer at an instant: average speed over a shrinking window approaches a limit, and that limit is the derivative. Differentiability at a point demands the limit exist finitely - equivalently, the slope approaching from the left equals the slope from the right. At a sharp corner like the absolute-value graph at zero, the two slopes disagree (one falls, one climbs), so no derivative exists there: the car turned too sharply for any single instantaneous speed to be honest.

## DEFINITION
A function \( f \) is differentiable at a point \( c \) in its domain if the limit \( \lim_{h \to 0} \frac{f(c+h) - f(c)}{h} \) exists finitely. Equivalently, the left-hand derivative \( \lim_{h \to 0^-} \frac{f(c+h) - f(c)}{h} \) and the right-hand derivative \( \lim_{h \to 0^+} \frac{f(c+h) - f(c)}{h} \) must both exist, be finite, and be equal. The common value is denoted \( f'(c) \) or \( \frac{d}{dx}f(x)\big|_{x=c} \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can compute left-hand and right-hand derivatives for piecewise functions, determine differentiability at a point by comparing them, and explain why differentiability implies continuity but the converse is false using a counterexample like \( f(x)=|x| \) at \( x=0 \).

## SCOPE_BOUNDARY
This node covers the definition of differentiability at a point, left-hand and right-hand derivatives, the necessary and sufficient condition for differentiability (equality of left and right derivatives), and the theorem that differentiability implies continuity. It does NOT cover differentiation rules (chain rule, product rule), derivatives of specific functions (trigonometric, exponential, logarithmic), implicit/parametric differentiation, or higher-order derivatives — those are in subsequent nodes.

## WALKTHROUGH
Imagine a car moving along a straight road; its position at time \( t \) is \( s(t) \). The average speed over a tiny interval \( h \) is \( \frac{s(t+h)-s(t)}{h} \). The instantaneous speed at time \( t \) is the limit of this average as \( h \to 0 \) — that is exactly the derivative. But what if the car makes a sharp turn (like \( |x| \) at 0)? The speed from the left and right don't match, so the derivative doesn't exist. Start by writing the difference quotient \( \frac{f(c+h)-f(c)}{h} \), then evaluate the left-hand limit (\( h \to 0^- \)) and right-hand limit (\( h \to 0^+ \)) separately. If both are finite and equal, \( f \) is differentiable at \( c \); otherwise it is not. This connects directly to the continuity check you did in the previous node: if \( f \) is differentiable at \( c \), it must be continuous there, but continuity alone is not enough.

Takeaway first: the derivative is a two-sided agreement on slope, and corners are where the agreement fails - differentiability implies continuity, but continuity alone permits corners. Exam moves: computation questions on one-sided derivatives of piecewise functions, verdict questions at a point, and explain questions using the absolute-value counterexample on the converse. Method: rerun the drive - write the difference quotient, take both one-sided limits, compare - and then run the same ritual on modulus at zero. Check yourself: a function can be continuous everywhere and differentiable nowhere-in-particular corners; passing the continuity test earns nothing toward the derivative. Drill: compute both one-sided derivatives at one seam and state the differentiability verdict.

## DIAGNOSTIC_QUESTION_1
State the definition of the derivative of a function \( f \) at a point \( x = c \) using the limit of the difference quotient. Write the expressions for the left-hand derivative and right-hand derivative.

## DIAGNOSTIC_ANSWER_1
The derivative is \( f'(c) = \lim_{h \to 0} \frac{f(c+h)-f(c)}{h} \). Left-hand derivative: \( f'_-(c) = \lim_{h \to 0^-} \frac{f(c+h)-f(c)}{h} \). Right-hand derivative: \( f'_+(c) = \lim_{h \to 0^+} \frac{f(c+h)-f(c)}{h} \). A wrong answer (e.g., writing \( \lim_{x \to c} \frac{f(x)-f(c)}{x-c} \) without specifying \( h \to 0 \), or confusing left/right limits) shows the student hasn't internalised the precise limit definition and the role of \( h \) approaching 0 from both sides.

## DIAGNOSTIC_QUESTION_2
Explain why the existence of \( \lim_{h \to 0} \frac{f(c+h)-f(c)}{h} \) forces \( \lim_{x \to c} f(x) = f(c) \). Use the identity \( f(x)-f(c) = \frac{f(x)-f(c)}{x-c} \cdot (x-c) \) in your reasoning.

## DIAGNOSTIC_ANSWER_2
If \( f'(c) \) exists, then \( \lim_{x \to c} \frac{f(x)-f(c)}{x-c} = f'(c) \) (finite). Then \( \lim_{x \to c} [f(x)-f(c)] = \lim_{x \to c} \left[ \frac{f(x)-f(c)}{x-c} \cdot (x-c) \right] = f'(c) \cdot 0 = 0 \), so \( \lim_{x \to c} f(x) = f(c) \). A wrong answer (e.g., "because derivative exists" without the product-of-limits step) reveals the student doesn't see the algebraic link between the difference quotient and the continuity condition.

## DIAGNOSTIC_QUESTION_3
Check whether the function \( f(x) = \begin{cases} x^2, & x \le 1 \\ 2x-1, & x > 1 \end{cases} \) is differentiable at \( x = 1 \). Compute both one-sided derivatives explicitly.

## DIAGNOSTIC_ANSWER_3
Left-hand derivative: \( f'_-(1) = \lim_{h \to 0^-} \frac{(1+h)^2 - 1}{h} = \lim_{h \to 0^-} \frac{1+2h+h^2-1}{h} = \lim_{h \to 0^-} (2+h) = 2 \).
Right-hand derivative: \( f'_+(1) = \lim_{h \to 0^+} \frac{2(1+h)-1 - 1}{h} = \lim_{h \to 0^+} \frac{2+2h-2}{h} = \lim_{h \to 0^+} 2 = 2 \).
Both equal 2, so \( f \) is differentiable at \( x=1 \) with \( f'(1)=2 \). A common error is using the wrong piece for the limit (e.g., using \( x^2 \) for the right-hand limit) or forgetting to subtract \( f(1)=1 \) correctly.

## DIAGNOSTIC_QUESTION_4
The function \( f(x) = |x-2| \) is continuous at \( x=2 \) but not differentiable there. Identify the left-hand and right-hand derivatives at \( x=2 \) and explain why they differ. Then sketch the graph near \( x=2 \) and describe the geometric feature that causes non-differentiability.

## DIAGNOSTIC_ANSWER_4
For \( x<2 \), \( f(x)=2-x \); for \( x>2 \), \( f(x)=x-2 \). At \( x=2 \), \( f(2)=0 \).
\( f'_-(2) = \lim_{h \to 0^-} \frac{|2+h-2|-0}{h} = \lim_{h \to 0^-} \frac{-h}{h} = -1 \).
\( f'_+(2) = \lim_{h \to 0^+} \frac{h}{h} = 1 \).
Since \( -1 \ne 1 \), \( f \) is not differentiable at 2. The graph has a sharp corner (cusp) at \( (2,0) \) — the tangent from the left has slope -1, from the right slope 1. A wrong answer that claims the derivative is 0 or doesn't compute both sides shows the student doesn't connect the absolute value's piecewise definition to the one-sided limits.

## DIAGNOSTIC_QUESTION_5
A student argues: "The function \( f(x) = x^{1/3} \) is continuous at \( x=0 \), so it must be differentiable there." Evaluate this claim. Compute \( f'(0) \) using the definition and state whether the derivative exists as a finite number.

## DIAGNOSTIC_ANSWER_5
\( f'(0) = \lim_{h \to 0} \frac{h^{1/3} - 0}{h} = \lim_{h \to 0} \frac{1}{h^{2/3}} = +\infty \). The limit is not finite, so \( f \) is not differentiable at 0. The student's claim is false: continuity is necessary but not sufficient for differentiability. This counterexample shows a vertical tangent (infinite slope). A wrong answer that says "derivative is 0" or "derivative exists because function is continuous" reveals the misconception that continuity implies differentiability, and/or an algebraic error in simplifying \( h^{1/3}/h \).

## DIAGNOSTIC_QUESTION_6
Construct a function that is continuous at \( x=0 \) but not differentiable at \( x=0 \), different from \( |x| \) and \( x^{1/3} \). Define it piecewise, verify continuity, and show the one-sided derivatives are unequal (or infinite).

## DIAGNOSTIC_ANSWER_6
Example: \( f(x) = \begin{cases} x \sin(1/x), & x \ne 0 \\ 0, & x = 0 \end{cases} \).
Continuity: \( |x \sin(1/x)| \le |x| \to 0 \), so \( \lim_{x \to 0} f(x) = 0 = f(0) \).
Derivative at 0: \( f'(0) = \lim_{h \to 0} \frac{h \sin(1/h)}{h} = \lim_{h \to 0} \sin(1/h) \), which does not exist (oscillates between -1 and 1).
Thus \( f \) is continuous but not differentiable at 0. A poor answer might give a function that isn't continuous, or one where the derivative exists, showing the student cannot design a counterexample that satisfies the precise conditions.

## COMMON_MISCONCEPTION
Students often believe that if a function is continuous at a point, it is automatically differentiable there. They write "f is continuous at c, therefore f is differentiable at c" without checking the one-sided derivatives. Another error: when computing the difference quotient for a piecewise function, they use the same algebraic expression for both left and right limits instead of the appropriate piece. For example, for \( f(x)=|x| \) at 0, they might write \( \frac{|h|}{h} \) and incorrectly simplify to 1 for both sides, missing that \( |h| = -h \) for \( h<0 \).

## ON_FAILURE
If a student confuses continuity with differentiability, first revisit the definition of continuity (c12_math_cbse_05_001) and work through the proof that differentiability ⇒ continuity (Theorem 3 in NCERT). Then explicitly compute left and right derivatives for \( f(x)=|x| \) at 0, showing the algebraic step \( |h|/h = -1 \) for \( h<0 \) and \( =1 \) for \( h>0 \). Next, practice piecewise functions: give \( f(x) = \begin{cases} x^2 & x \le 0 \\ x & x > 0 \end{cases} \) and have the student compute \( f'_-(0) \) and \( f'_+(0) \) using the correct piece each time. Finally, ask them to state in their own words: "Continuity is necessary but not sufficient for differentiability."

## PREREQUISITE_NODE_IDS
c12_math_cbse_05_001, c12_math_cbse_05_002, c11_math_cbse_13_006, c11_math_cbse_13_008, c12_math_cbse_05_003

## PREREQUISITE_REASONS
c12_math_cbse_05_001: Continuity definition is needed because differentiability implies continuity; students must know how to check continuity first.
c12_math_cbse_05_002: Left-hand and right-hand limits are the direct analogues of left-hand and right-hand derivatives; the same limit-evaluation skills apply.
c11_math_cbse_13_006: Intuitive idea of derivative as rate of change / slope of tangent provides the conceptual foundation.
c11_math_cbse_13_008: Derivative using first principles (limit of difference quotient) is the exact computational tool used here.
c12_math_cbse_05_003: Differentiability requires continuity; the algebra of continuous functions helps identify where a function is continuous before checking differentiability.  

## FORWARD_NODE_IDS
c12_math_cbse_05_005, c12_math_cbse_05_006, c12_math_cbse_05_007, c12_math_cbse_05_012, c12_math_cbse_05_013

## FORWARD_REASONS
c12_math_cbse_05_005: Differentiability at a Point builds directly on this definition to examine more complex functions and the algebra of derivatives.
c12_math_cbse_05_006: Chain Rule requires the concept of differentiability of composite functions, which rests on the existence of the derivative at a point.
c12_math_cbse_05_007: Derivatives of Implicit Functions uses the differentiability condition to differentiate both sides of an equation.
c12_math_cbse_05_012: Need the definition of differentiability to understand condition 2.  
c12_math_cbse_05_013: Differentiability definition and condition are needed to check the hypothesis "differentiable on (a,b)".  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: The intuitive idea of derivative as instantaneous rate of change is used in physics (velocity, acceleration) and economics (marginal cost/revenue).
c11_math_cbse_13_008: First-principle derivative calculation is the mathematical foundation for deriving formulas in physics (e.g., \( v = ds/dt \)) and economics (marginal analysis).

## CHAIN_DESCRIPTION
c11_math_cbse_13_008 -> c12_math_cbse_05_004 -> c12_math_cbse_05_005

## THIS_FORMULA
\( f'(c) = \lim_{h \to 0} \frac{f(c+h) - f(c)}{h} \) (exists finitely) ⇔ \( f'_-(c) = \lim_{h \to 0^-} \frac{f(c+h)-f(c)}{h} \) and \( f'_+(c) = \lim_{h \to 0^+} \frac{f(c+h)-f(c)}{h} \) both exist finitely and \( f'_-(c) = f'_+(c) \).

## FORMULA_VARIABLES
\( f \): real-valued function; \( c \): point in domain of \( f \); \( h \): increment (non-zero, tending to 0); \( f'(c) \): derivative at \( c \); \( f'_-(c), f'_+(c) \): left-hand and right-hand derivatives.

## FORMULA_UNITS
Dimensionless (if \( f \) and \( x \) are pure numbers); otherwise units of \( f \) divided by units of \( x \) (e.g., m/s if \( f \) is position in metres and \( x \) is time in seconds).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_006 | Derivative as instantaneous rate of change underpins velocity/acceleration in physics and marginal cost/revenue in economics.
c11_math_cbse_13_008 | First-principle limit computation is the rigorous method used to derive derivative formulas in all quantitative sciences.
## PREREQ_CONCEPT
Limit of a function (especially one-sided limits) and continuity at a point.

## PREREQ_BEFORE
The student must be able to evaluate one-sided limits of algebraic expressions and determine continuity of piecewise functions at a boundary point.

## PREREQ_STUCK
Revisit one-sided limits (c12_math_cbse_05_002) and the definition of continuity (c12_math_cbse_05_001); then practice the difference quotient \( \frac{f(c+h)-f(c)}{h} \) for simple polynomials (c11_math_cbse_13_008).

## WORKED_EXAMPLE_1
PROBLEM: A toy car moves along a straight track. Its position (in cm) at time \( t \) (in seconds) is given by \( s(t) = \begin{cases} t^2, & 0 \le t \le 2 \\ 4t-4, & t > 2 \end{cases} \). Is the velocity (instantaneous rate of change of position) well-defined at \( t = 2 \) seconds? If yes, find it.

STEPS:
- Step 1: Identify the function and the point. We need to check differentiability of \( s(t) \) at \( t=2 \). The position at \( t=2 \) is \( s(2) = 2^2 = 4 \) cm (using the first piece).
- Step 2: Write the left-hand derivative (for \( h \to 0^- \), we use \( t=2+h \le 2 \), so the first piece \( t^2 \)).
  \( s'_-(2) = \lim_{h \to 0^-} \frac{(2+h)^2 - 4}{h} = \lim_{h \to 0^-} \frac{4+4h+h^2-4}{h} = \lim_{h \to 0^-} (4+h) = 4 \) cm/s.
- Step 3: Write the right-hand derivative (for \( h \to 0^+ \), we use \( t=2+h > 2 \), so the second piece \( 4t-4 \)).
  \( s'_+(2) = \lim_{h \to 0^+} \frac{[4(2+h)-4] - 4}{h} = \lim_{h \to 0^+} \frac{8+4h-4-4}{h} = \lim_{h \to 0^+} \frac{4h}{h} = 4 \) cm/s.
- Step 4: Compare. Both one-sided derivatives exist, are finite, and equal 4 cm/s. Therefore \( s \) is differentiable at \( t=2 \) and the velocity is 4 cm/s.
- Step 5: Verify continuity (optional but good practice): \( \lim_{t \to 2^-} s(t) = 4 \), \( \lim_{t \to 2^+} s(t) = 4 \), \( s(2)=4 \), so continuous — consistent with differentiability.

REASONING: The derivative represents instantaneous velocity. For a piecewise position function, we must use the correct piece for each one-sided limit. The algebraic simplification cancels \( h \) in the denominator, leaving a finite limit. Equality of the two one-sided limits guarantees a unique tangent line (no corner or cusp) at \( t=2 \).

ANSWER: Yes, the velocity is well-defined at \( t=2 \) seconds and equals 4 cm/s.

## WORKED_EXAMPLE_2
PROBLEM: The cost (in rupees) of producing \( x \) units of a product is \( C(x) = \begin{cases} 100 + 5x, & 0 \le x \le 100 \\ 200 + 3x, & x > 100 \end{cases} \). Determine if the marginal cost (derivative of cost) exists at \( x = 100 \) units. Interpret the result economically.

STEPS:
- Step 1: Evaluate \( C(100) \) using the first piece: \( C(100) = 100 + 5(100) = 600 \) ₹.
- Step 2: Left-hand derivative at \( x=100 \) (for \( h \to 0^- \), \( x=100+h \le 100 \), use \( 100+5x \)).
  \( C'_-(100) = \lim_{h \to 0^-} \frac{[100+5(100+h)] - 600}{h} = \lim_{h \to 0^-} \frac{600+5h-600}{h} = \lim_{h \to 0^-} 5 = 5 \) ₹/unit.
- Step 3: Right-hand derivative at \( x=100 \) (for \( h \to 0^+ \), \( x=100+h > 100 \), use \( 200+3x \)).
  \( C'_+(100) = \lim_{h \to 0^+} \frac{[200+3(100+h)] - 600}{h} = \lim_{h \to 0^+} \frac{500+3h-600}{h} = \lim_{h \to 0^+} \frac{-100+3h}{h} \).
  As \( h \to 0^+ \), numerator → -100, denominator → 0⁺, so the limit is \( -\infty \) (not finite).
- Step 4: Since the right-hand derivative is not finite (it diverges to \( -\infty \)), \( C \) is not differentiable at \( x=100 \). Marginal cost does not exist at this production level.
- Step 5: Economic interpretation: The cost function has a discontinuity in its slope (actually a jump in the function value? Wait: check continuity: \( \lim_{x \to 100^+} C(x) = 200+300=500 \), but \( C(100)=600 \). So the function is not even continuous at 100! This is a poorly designed cost function — but the problem asks to check differentiability, and we find it fails because the right-hand limit of the difference quotient is infinite. In reality, a cost function should be continuous; this example shows why differentiability fails if there's a jump.)

REASONING: Marginal cost is the derivative of the total cost function. We compute one-sided derivatives using the appropriate piecewise formula. The right-hand limit diverges because the function itself has a jump discontinuity at \( x=100 \) (left limit 600, right limit 500). A function must be continuous to be differentiable; here continuity fails, so differentiability fails automatically. The algebraic step shows the numerator does not tend to 0, causing the quotient to blow up.

ANSWER: Marginal cost does not exist at \( x = 100 \) units because the right-hand derivative is infinite (the cost function is not even continuous there).

## WORKED_EXAMPLE_3
PROBLEM: Consider \( f(x) = \begin{cases} x^2 \sin(1/x), & x \ne 0 \\ 0, & x = 0 \end{cases} \). Show that \( f \) is differentiable at \( x=0 \) and find \( f'(0) \). Then discuss whether \( f' \) is continuous at 0.

STEPS:
- Step 1: Check continuity at 0 (prerequisite for differentiability). For \( x \ne 0 \), \( |x^2 \sin(1/x)| \le x^2 \to 0 \) as \( x \to 0 \). So \( \lim_{x \to 0} f(x) = 0 = f(0) \). Continuous.
- Step 2: Compute derivative at 0 using definition: \( f'(0) = \lim_{h \to 0} \frac{f(h)-f(0)}{h} = \lim_{h \to 0} \frac{h^2 \sin(1/h)}{h} = \lim_{h \to 0} h \sin(1/h) \).
- Step 3: Since \( |\sin(1/h)| \le 1 \), \( |h \sin(1/h)| \le |h| \to 0 \). By Sandwich Theorem, \( \lim_{h \to 0} h \sin(1/h) = 0 \). Thus \( f'(0) = 0 \).
- Step 4: For \( x \ne 0 \), compute \( f'(x) \) using product and chain rules (anticipating next nodes): \( f'(x) = 2x \sin(1/x) + x^2 \cos(1/x) \cdot (-1/x^2) = 2x \sin(1/x) - \cos(1/x) \).
- Step 5: Check continuity of \( f' \) at 0: \( \lim_{x \to 0} f'(x) = \lim_{x \to 0} [2x \sin(1/x) - \cos(1/x)] \). The first term → 0, but \( \cos(1/x) \) oscillates between -1 and 1, so the limit does not exist. Hence \( f' \) is not continuous at 0.
- Step 6: Conclusion: \( f \) is differentiable at 0 (with derivative 0), but its derivative function is discontinuous at 0. This shows differentiability does not imply continuous differentiability.

REASONING: This example combines the definition of derivative (first principles) with limit evaluation using the Sandwich Theorem. It also previews the concept that a derivative can exist at a point without being continuous there — a subtle point often tested in competitive exams. The oscillatory term \( \cos(1/x) \) prevents the limit of \( f'(x) \) from existing.

ANSWER: \( f \) is differentiable at \( x=0 \) with \( f'(0)=0 \), but \( f' \) is not continuous at 0.

## COMPETENCY_QUESTION_1
QUESTION: A civil engineer designs a roller-coaster track modeled by \( y = f(x) = \begin{cases} -\frac{1}{10}x^2 + 4, & x \le 0 \\ \frac{1}{10}x^2 + 4, & x > 0 \end{cases} \) (height in metres, horizontal distance in metres). 
(a) Is the track smooth (differentiable) at the join \( x=0 \)? Justify by computing left and right derivatives.
(b) If not smooth, what physical problem would a roller-coaster car face at that point?
(c) Modify the second piece to \( ax^2+4 \) so that the track becomes smooth at \( x=0 \). Find the required value of \( a \).

COMPETENCY: Translating real-world situations to mathematical expressions; applying derivative definition to check smoothness; designing a function to meet a differentiability condition.

STEPS:
- Step 1: Compute \( f(0) = 4 \) from first piece. Check continuity: both pieces give 4 at 0, so continuous.
- Step 2: Left-hand derivative at 0: \( f'_-(0) = \lim_{h \to 0^-} \frac{-\frac{1}{10}h^2+4 - 4}{h} = \lim_{h \to 0^-} -\frac{1}{10}h = 0 \).
- Step 3: Right-hand derivative at 0: \( f'_+(0) = \lim_{h \to 0^+} \frac{\frac{1}{10}h^2+4 - 4}{h} = \lim_{h \to 0^+} \frac{1}{10}h = 0 \).
- Step 4: Both equal 0, so \( f \) is differentiable at 0. The track is smooth! (Wait, the problem expected non-smooth? Let's adjust the first piece to have non-zero slope at 0. Better: \( f(x) = \begin{cases} -x+4, & x \le 0 \\ x+4, & x > 0 \end{cases} \) gives a corner. But the given quadratic pieces both have derivative 0 at 0. Let's change the problem to make it non-smooth initially.)
Revised problem: \( f(x) = \begin{cases} -x+4, & x \le 0 \\ \frac{1}{10}x^2+4, & x > 0 \end{cases} \).
Then \( f'_-(0) = -1 \), \( f'_+(0) = 0 \). Not differentiable.
(c) Modify second piece to \( ax^2+bx+4 \). For differentiability at 0, need continuity (already 4) and \( f'_+(0) = b = f'_-(0) = -1 \). So \( b=-1 \), \( a \) can be any real. Choose \( a=1/10 \) for same curvature? Actually the problem says "modify the second piece to \( ax^2+4 \)" — that forces \( b=0 \), so cannot match slope -1. Let's allow linear term: \( ax^2+bx+4 \). Then answer: \( b=-1 \), \( a \) arbitrary.
But to keep it simple, let's use the original quadratic pieces and ask: "Is the track smooth? Yes, because both derivatives are 0." That's a valid competency question too. Let's stick with the original quadratic pieces and note that it IS smooth.

Actually, the original quadratic pieces: \( f(x) = \begin{cases} -\frac{1}{10}x^2+4 & x\le 0 \\ \frac{1}{10}x^2+4 & x>0 \end{cases} \).
Left derivative: \( -\frac{1}{5}x \) at 0 = 0.
Right derivative: \( \frac{1}{5}x \) at 0 = 0.
So it is smooth. The physical problem (b) would be "N/A, it's smooth." (c) is moot. Let's change to make it non-smooth: \( f(x) = \begin{cases} -2x+4 & x\le 0 \\ \frac{1}{10}x^2+4 & x>0 \end{cases} \). Then left derivative = -2, right = 0. Not smooth. Car would experience a sudden jerk (infinite acceleration) at the corner. To fix, change second piece to \( ax^2+bx+4 \) with \( b = -2 \) (so right derivative = -2). Choose \( a=1/10 \) for same curvature. So \( f(x) = \frac{1}{10}x^2 -2x +4 \) for \( x>0 \).

Let's write the question with the non-smooth version.

ANSWER:
(a) \( f(0)=4 \). Left derivative: \( \lim_{h \to 0^-} \frac{-2h+4-4}{h} = -2 \). Right derivative: \( \lim_{h \to 0^+} \frac{\frac{1}{10}h^2+4-4}{h} = 0 \). Since \( -2 \ne 0 \), not differentiable at \( x=0 \). Track is not smooth.
(b) The roller-coaster car would experience a sudden change in direction (a sharp corner), causing a large jerk (infinite acceleration) which is unsafe and uncomfortable.
(c) Let the modified second piece be \( g(x) = ax^2 + bx + 4 \) for \( x>0 \). Continuity at 0 requires \( g(0)=4 \) (satisfied). Differentiability requires \( g'(0) = b = f'_-(0) = -2 \). So \( b = -2 \). The parameter \( a \) can be any real number; choosing \( a = \frac{1}{10} \) preserves the original curvature. Thus \( g(x) = \frac{1}{10}x^2 - 2x + 4 \) for \( x>0 \) makes the track smooth at \( x=0 \).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let \( f(x) = |x^2 - 4| \). 
(a) Write \( f(x) \) as a piecewise function without absolute value.
(b) Find all points where \( f \) is not differentiable. Justify by computing one-sided derivatives at each candidate point.
(c) Sketch the graph of \( f \) and mark the non-differentiable points. Explain the geometric feature at each such point.

COMPETENCY: Analyzing piecewise functions arising from absolute values; identifying all points of non-differentiability; connecting algebraic conditions to geometric features (corners/cusps).

STEPS:
- Step 1: \( x^2 - 4 \ge 0 \) when \( x \le -2 \) or \( x \ge 2 \); \( x^2 - 4 < 0 \) when \( -2 < x < 2 \).
  So \( f(x) = \begin{cases} x^2 - 4, & x \le -2 \\ 4 - x^2, & -2 < x < 2 \\ x^2 - 4, & x \ge 2 \end{cases} \).
- Step 2: Check differentiability at the boundaries \( x = -2 \) and \( x = 2 \) (inside intervals it's polynomial, hence differentiable).
  At \( x = -2 \): \( f(-2)=0 \).
  Left derivative (\( x<-2 \)): \( f'_-(x) = 2x \), so \( f'_-(-2) = -4 \).
  Right derivative (\( x>-2 \)): \( f'_+(x) = -2x \), so \( f'_+(-2) = 4 \).
  Since \( -4 \ne 4 \), not differentiable at \( x=-2 \).
  At \( x = 2 \): \( f(2)=0 \).
  Left derivative (\( x<2 \)): \( f'_-(x) = -2x \), so \( f'_-(2) = -4 \).
  Right derivative (\( x>2 \)): \( f'_+(x) = 2x \), so \( f'_+(2) = 4 \).
  Since \( -4 \ne 4 \), not differentiable at \( x=2 \).
- Step 3: Graph: parabola \( y=x^2-4 \) opening upward, but the part between -2 and 2 is reflected upward (since absolute value). The graph has V-shaped corners at \( (-2,0) \) and \( (2,0) \). At each corner, the left and right tangents have slopes of opposite signs, creating a sharp point.

ANSWER:
(a) \( f(x) = \begin{cases} x^2 - 4, & x \le -2 \\ 4 - x^2, & -2 < x < 2 \\ x^2 - 4, & x \ge 2 \end{cases} \)
(b) \( f \) is not differentiable at \( x = -2 \) and \( x = 2 \). At both points, left-hand and right-hand derivatives are finite but unequal (\( \pm 4 \)).
(c) The graph consists of two upward-opening parabolic arms (\( x \le -2 \) and \( x \ge 2 \)) and an inverted parabolic segment (\( -2 < x < 2 \)). The points \( (-2,0) \) and \( (2,0) \) are sharp corners where the slope jumps from negative to positive (at -2) and from positive to negative (at 2) — actually at -2: left slope -4, right slope +4; at 2: left slope -4, right slope +4. Wait: at 2, left derivative is -4, right is +4. So both corners point downward? The absolute value of a parabola that opens upward and has zeros at ±2 creates a W-shape with minima at ±2 and a maximum at 0. The corners at ±2 are pointed downward. The slopes: left of -2 is negative, right of -2 is positive; left of 2 is negative, right of 2 is positive. So both corners are "V" shapes pointing down.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The speed from the left and right don't match, so the ______ doesn't exist.

## DIAGNOSTIC_ANSWER_7
derivative

The derivative is what the mismatch kills: two slopes approaching from either side that never agree leave nothing to report. **A wrong answer (a limit of the function) reveals the student has confused the slope's existence with the curve's continuity.**
