## ELI5
A roller-coaster track must be smooth - no jerk at any weld - and differentiability is the engineer's word for smooth. At any junction of a piecewise track, compute the slope approaching from the left and from the right: if both exist, are finite, and agree, the track flows and the derivative exists; if they quarrel, riders feel a corner. The absolute-value graph is the classic kink, and piecewise polynomials are the practice ground.

## DEFINITION
A function \( f \) is differentiable at a point \( x = c \) in its domain if both the left-hand derivative (LHD) and right-hand derivative (RHD) exist finitely and are equal. That is,  
\[
\lim_{h \to 0^-} \frac{f(c+h) - f(c)}{h} = \lim_{h \to 0^+} \frac{f(c+h) - f(c)}{h} = f'(c).
\]  
If this common limit exists, it is called the derivative of \( f \) at \( c \), denoted by \( f'(c) \) or \( \frac{d}{dx}f(x)\big|_{x=c} \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly compute left-hand and right-hand derivatives for piecewise-defined functions, determine differentiability at a point by comparing LHD and RHD, and justify why a function fails to be differentiable (corner, cusp, vertical tangent, discontinuity). The student can also apply the theorem "differentiability implies continuity" to check continuity first as a necessary condition.

## SCOPE_BOUNDARY
This node covers differentiability at a single point using the limit definition of derivative (first principles). It includes piecewise functions, absolute value functions, greatest integer function, and functions with sharp corners or cusps. It does NOT cover differentiation rules (chain rule, product rule, implicit differentiation, parametric derivatives, second-order derivatives) which are in later nodes. It also does not cover differentiability on an interval (only at a point).

## WALKTHROUGH
Imagine you are designing a roller-coaster track for an amusement park in Mumbai. The track must be smooth — no sudden jerks — so the slope of the track (derivative) must not change abruptly at any joint. If the track is described by a piecewise function, you need to check whether the slope from the left matches the slope from the right at each junction. That is exactly differentiability at a point! We start by recalling the limit definition of derivative from Class 11 (c11_math_cbse_13_008). We then compute the left-hand limit of the difference quotient and the right-hand limit separately. If they are equal and finite, the function has a unique tangent there. If not, there is a corner or cusp — the roller-coaster would jerk! We will practise with functions like \( |x| \) and piecewise polynomials.

Takeaway first: differentiability is slope-continuity - the left and right difference quotients must converge to one finite number - and its failure modes have names: corner, cusp, vertical tangent, discontinuity. Exam moves: computation questions on one-sided derivatives, verdict questions at junctions, justification questions naming the failure mode, and necessary-condition questions using differentiability implies continuity as a first filter. Method: rerun the track - at each weld, slope in, slope out, compare - and then test the modulus kink to see the failure in miniature. Check yourself: run the continuity check first; a discontinuous point ends the differentiability question before slopes are even computed. Drill: test one piecewise junction for differentiability and name what would have to change for smoothness.

## DIAGNOSTIC_QUESTION_1
State the precise condition for a function \( f \) to be differentiable at \( x = c \) using left-hand and right-hand derivatives.

## DIAGNOSTIC_ANSWER_1
The function \( f \) is differentiable at \( x = c \) if both \( \lim_{h \to 0^-} \frac{f(c+h)-f(c)}{h} \) and \( \lim_{h \to 0^+} \frac{f(c+h)-f(c)}{h} \) exist finitely and are equal. A common wrong answer is to only check that the derivative formula from differentiation rules gives the same value from both sides without verifying the limit definition, or to confuse differentiability with continuity (thinking continuity is sufficient). This reveals the student does not understand that differentiability requires the limit of the difference quotient to exist from both sides and be equal, which is stricter than continuity.

## DIAGNOSTIC_QUESTION_2
Explain why the function \( f(x) = |x| \) is continuous at \( x = 0 \) but not differentiable at \( x = 0 \). Use the definitions of continuity and differentiability in your explanation.

## DIAGNOSTIC_ANSWER_2
\( f(x)=|x| \) is continuous at 0 because \( \lim_{x\to 0}|x| = 0 = f(0) \). However, the left-hand derivative is \( \lim_{h\to 0^-}\frac{|h|-0}{h} = \lim_{h\to 0^-}\frac{-h}{h} = -1 \), while the right-hand derivative is \( \lim_{h\to 0^+}\frac{h}{h} = 1 \). Since LHD ≠ RHD, the derivative does not exist. A wrong answer might claim it is differentiable because the function is continuous, or might incorrectly compute the derivative as 0 by misapplying the power rule. This shows the student confuses continuity with differentiability or does not handle the piecewise definition correctly.

## DIAGNOSTIC_QUESTION_3
Determine whether the function \( f(x) = \begin{cases} x^2, & x \le 1 \\ 2x - 1, & x > 1 \end{cases} \) is differentiable at \( x = 1 \). Show all steps.

## DIAGNOSTIC_ANSWER_3
First check continuity: \( f(1)=1 \), LHL = \( \lim_{x\to 1^-}x^2 = 1 \), RHL = \( \lim_{x\to 1^+}(2x-1)=1 \). Continuous.  
LHD = \( \lim_{h\to 0^-}\frac{f(1+h)-f(1)}{h} = \lim_{h\to 0^-}\frac{(1+h)^2-1}{h} = \lim_{h\to 0^-}\frac{2h+h^2}{h} = 2 \).  
RHD = \( \lim_{h\to 0^+}\frac{f(1+h)-f(1)}{h} = \lim_{h\to 0^+}\frac{(2(1+h)-1)-1}{h} = \lim_{h\to 0^+}\frac{2h}{h} = 2 \).  
LHD = RHD = 2, so \( f \) is differentiable at \( x=1 \) with \( f'(1)=2 \).  
A common error is to differentiate each piece separately (\( 2x \) and \( 2 \)) and plug \( x=1 \) getting 2 and 2, then conclude differentiability without checking continuity or the limit definition. While the answer matches here, the method is not rigorous for board exams. Another error is forgetting to check continuity first.

## DIAGNOSTIC_QUESTION_4
Compare the differentiability of \( f(x) = x^{2/3} \) and \( g(x) = x^{1/3} \) at \( x = 0 \). Which has a vertical tangent? Which has a cusp? Justify using limits.

## DIAGNOSTIC_ANSWER_4
For \( f(x)=x^{2/3} \), \( f'(0) = \lim_{h\to 0}\frac{h^{2/3}}{h} = \lim_{h\to 0}h^{-1/3} \). As \( h\to 0^+ \), limit is \( +\infty \); as \( h\to 0^- \), \( h^{-1/3} \) is negative (cube root of negative) and magnitude \( \to +\infty \), so limit is \( -\infty \). LHD ≠ RHD (both infinite, opposite signs) → cusp.  
For \( g(x)=x^{1/3} \), \( g'(0) = \lim_{h\to 0}\frac{h^{1/3}}{h} = \lim_{h\to 0}h^{-2/3} = +\infty \) from both sides. Both LHD and RHD are \( +\infty \) → vertical tangent (not differentiable in the usual sense because derivative is not finite).  
A wrong answer might say both are not differentiable because derivative is infinite, without distinguishing cusp vs vertical tangent, or might incorrectly apply power rule \( \frac{2}{3}x^{-1/3} \) and say it's undefined at 0 without limit analysis.

## DIAGNOSTIC_QUESTION_5
A student claims: "If a function is continuous at a point, it must be differentiable there." Evaluate this claim and provide a counterexample. Then state the correct theorem relating differentiability and continuity.

## DIAGNOSTIC_ANSWER_5
The claim is false. Counterexample: \( f(x)=|x| \) at \( x=0 \) is continuous but not differentiable (as shown in Q2). The correct theorem: "If a function is differentiable at a point, then it is continuous at that point." Differentiability ⇒ Continuity, but the converse is not true. A wrong answer might give a discontinuous function as counterexample (which doesn't address the claim) or might state the converse theorem incorrectly. This reveals confusion about logical implication direction.

## DIAGNOSTIC_QUESTION_6
Construct a piecewise function \( f(x) \) defined on \( \mathbb{R} \) that is continuous everywhere but not differentiable at exactly two points: \( x = -1 \) and \( x = 2 \). Define the function explicitly and verify your claims.

## DIAGNOSTIC_ANSWER_6
Example: \( f(x) = |x+1| + |x-2| \). This is continuous everywhere (sum of continuous functions). At \( x=-1 \), the term \( |x+1| \) has a corner, while \( |x-2| \) is differentiable. LHD = -1 + (-1) = -2? Wait, compute properly:  
For \( x<-1 \): \( f(x) = -(x+1) + -(x-2) = -2x+1 \), slope -2.  
For \( -1<x<2 \): \( f(x) = (x+1) + -(x-2) = 3 \), slope 0.  
So LHD at -1 = -2, RHD = 0 → not differentiable.  
At \( x=2 \): for \( -1<x<2 \), slope 0; for \( x>2 \), \( f(x) = (x+1)+(x-2)=2x-1 \), slope 2. LHD=0, RHD=2 → not differentiable.  
Any function with corners at exactly those two points works. A poor answer might give a function with more non-differentiable points, or a discontinuous function, or fail to verify.

## COMMON_MISCONCEPTION
Students often think that if the derivatives of the pieces of a piecewise function match at the boundary, the function is differentiable there, without checking continuity first. For example, for \( f(x) = \begin{cases} x^2+1, & x \le 1 \\ 2x, & x > 1 \end{cases} \), they compute \( f'(x) = 2x \) for \( x\le1 \) giving 2 at x=1, and \( f'(x)=2 \) for \( x>1 \) giving 2, and conclude differentiability. But \( f(1)=2 \) while RHL = \( \lim_{x\to1^+}2x = 2 \), LHL = \( \lim_{x\to1^-}(x^2+1)=2 \), so it IS continuous and differentiable here. However, if the function were \( f(x) = \begin{cases} x^2+2, & x \le 1 \\ 2x, & x > 1 \end{cases} \), the derivatives still match (2 and 2) but \( f(1)=3 \) while RHL=2 → discontinuous, hence not differentiable. The misconception is that matching derivative formulas guarantees differentiability; continuity must be verified first because the limit definition of derivative requires \( f(c) \) to be defined and the limit of \( f(x) \) to equal \( f(c) \).

## ON_FAILURE
If a student makes this error, guide them through the following steps:  
1. Revisit the definition of derivative at a point: \( f'(c) = \lim_{h\to 0} \frac{f(c+h)-f(c)}{h} \). Emphasize that \( f(c) \) must exist and the limit must exist.  
2. Show that if \( f \) is not continuous at \( c \), then \( \lim_{h\to 0} f(c+h) \neq f(c) \), so the numerator \( f(c+h)-f(c) \) does not tend to 0, making the limit impossible to be finite (unless denominator also does something special, but it doesn't).  
3. Practice 3-4 piecewise functions where derivatives of pieces match but function is discontinuous at the joint.  
4. Then practice functions where function is continuous but derivatives don't match (corners).  
5. Finally, give a mixed set and ask the student to first check continuity, then compute LHD and RHD using the limit definition, not just differentiation rules.

## PREREQUISITE_NODE_IDS
c12_math_cbse_05_004, c12_math_cbse_05_002, c11_math_cbse_13_008, c11_math_cbse_13_006, c12_math_cbse_05_001

## PREREQUISITE_REASONS
c12_math_cbse_05_004: Provides the general definition of differentiability and the condition LHD = RHD, which is the foundation for this node's pointwise analysis.
c12_math_cbse_05_002: Covers left-hand and right-hand limits, essential for computing LHD and RHD as limits of difference quotients.
c11_math_cbse_13_008: Derivative using first principles (limit definition) is the direct prerequisite for computing LHD and RHD.
c11_math_cbse_13_006: Intuitive idea of derivative as slope of tangent helps visualize why corners/cusps break differentiability.
c12_math_cbse_05_001: Differentiability at a point is checked using the same limit-based approach as continuity, but with an extra condition (equality of left-hand and right-hand derivatives).  

## FORWARD_NODE_IDS
c12_math_cbse_05_006, c12_math_cbse_05_012, c12_math_cbse_05_013
## FORWARD_REASONS
c12_math_cbse_05_006: Chain rule requires understanding of differentiability of composite functions, which builds on pointwise differentiability.
c12_math_cbse_05_012: Rolle's Theorem requires differentiability on an open interval, which relies on differentiability at each point.
c12_math_cbse_05_013: Mean Value Theorem similarly requires differentiability at each point of an interval.

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_02_003, c12_eco_cbse_02_005
## CROSS_SUBJECT_REASONS
c12_physics_cbse_02_003: Velocity as derivative of displacement; non-differentiable points correspond to instantaneous changes in velocity (infinite acceleration), e.g., a ball bouncing.
c12_economics_cbse_02_005: Marginal cost as derivative of total cost; non-differentiable points indicate kinks in cost curves (e.g., fixed cost changes at a production threshold).
c12_phy_cbse_02_003: Cross-subject support: The electrostatic potential at a point due to an electric dipole is the work done per unit... supplies tools/facts used directly in this node.  
c12_eco_cbse_02_005: Cross-subject support: The Marginal Rate of Substitution (MRS) is the rate at which a consumer is willing to give... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_13_008 -> c12_math_cbse_05_004 -> c12_math_cbse_05_005 -> c12_math_cbse_05_006

## THIS_FORMULA
LHD = \( \lim_{h \to 0^-} \frac{f(c+h) - f(c)}{h} \), RHD = \( \lim_{h \to 0^+} \frac{f(c+h) - f(c)}{h} \); \( f \) differentiable at \( c \) iff LHD = RHD = finite number \( f'(c) \).

## FORMULA_VARIABLES
\( f \) = function, \( c \) = point in domain, \( h \) = small increment, \( f'(c) \) = derivative at \( c \).

## FORMULA_UNITS
dimensionless (derivative units = units of f / units of x)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | Velocity is derivative of position; a sharp corner in position-time graph means infinite acceleration (non-differentiable).
 c12_eco_cbse_02_005 | Marginal cost is derivative of total cost; a kink in cost function (e.g., due to bulk discount threshold) means marginal cost jumps.
## PREREQ_CONCEPT
Limit definition of derivative (first principles) and one-sided limits.

## PREREQ_BEFORE
Student must be able to evaluate limits of algebraic expressions, especially rationalizing numerators, and compute one-sided limits for piecewise functions.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_13_008 (Derivative Using First Principle) and c12_math_cbse_05_002 (Continuity at a Point: Left and Right Limits) to practice limit evaluation and one-sided limits.

## WORKED_EXAMPLE_1
PROBLEM: A toy car moves along a straight track. Its position (in metres) at time \( t \) seconds is given by \( s(t) = \begin{cases} t^2, & 0 \le t \le 2 \\ 4t - 4, & t > 2 \end{cases} \). Determine if the velocity (derivative of position) exists at \( t = 2 \) seconds. If it exists, find it.

STEPS:
- Step 1: Check continuity at \( t = 2 \). \( s(2) = 2^2 = 4 \). LHL = \( \lim_{t\to 2^-} t^2 = 4 \). RHL = \( \lim_{t\to 2^+} (4t-4) = 4 \). Since LHL = RHL = s(2), the function is continuous at \( t=2 \).
- Step 2: Compute left-hand derivative (LHD) at \( t=2 \) using definition: LHD = \( \lim_{h\to 0^-} \frac{s(2+h)-s(2)}{h} \). For \( h<0 \), \( 2+h < 2 \), so use \( s(t)=t^2 \). \( s(2+h) = (2+h)^2 = 4 + 4h + h^2 \). \( s(2)=4 \). Difference quotient = \( \frac{4+4h+h^2-4}{h} = \frac{4h+h^2}{h} = 4+h \). Limit as \( h\to 0^- \) is 4.
- Step 3: Compute right-hand derivative (RHD) at \( t=2 \): RHD = \( \lim_{h\to 0^+} \frac{s(2+h)-s(2)}{h} \). For \( h>0 \), \( 2+h > 2 \), so use \( s(t)=4t-4 \). \( s(2+h) = 4(2+h)-4 = 8+4h-4 = 4+4h \). \( s(2)=4 \). Difference quotient = \( \frac{4+4h-4}{h} = \frac{4h}{h} = 4 \). Limit as \( h\to 0^+ \) is 4.
- Step 4: Compare LHD and RHD. Both equal 4. Therefore, \( s \) is differentiable at \( t=2 \) and \( s'(2) = 4 \) m/s.
- Step 5: Interpret: The velocity at exactly 2 seconds is 4 m/s. The motion is smooth (no jerk) at that instant.

REASONING: Differentiability at a point requires continuity first, then equality of the left and right limits of the difference quotient. We used the piecewise definition to substitute the correct expression for \( s(2+h) \) depending on the sign of \( h \). This is the rigorous first-principles method required for board exams.

ANSWER: Yes, velocity exists at \( t=2 \) s and equals 4 m/s.

## WORKED_EXAMPLE_2
PROBLEM: Check the differentiability of \( f(x) = \begin{cases} x^2 \sin\frac{1}{x}, & x \neq 0 \\ 0, & x = 0 \end{cases} \) at \( x = 0 \).

STEPS:
- Step 1: Check continuity at \( x=0 \). \( f(0)=0 \). Need \( \lim_{x\to 0} x^2 \sin\frac{1}{x} \). Since \( -1 \le \sin\frac{1}{x} \le 1 \), we have \( -x^2 \le x^2 \sin\frac{1}{x} \le x^2 \). By Sandwich Theorem, limit = 0 = f(0). So continuous.
- Step 2: Compute derivative at 0 using definition: \( f'(0) = \lim_{h\to 0} \frac{f(h)-f(0)}{h} = \lim_{h\to 0} \frac{h^2 \sin\frac{1}{h} - 0}{h} = \lim_{h\to 0} h \sin\frac{1}{h} \).
- Step 3: Evaluate the limit. Again, \( -|h| \le h \sin\frac{1}{h} \le |h| \). As \( h\to 0 \), both bounds go to 0. By Sandwich Theorem, \( \lim_{h\to 0} h \sin\frac{1}{h} = 0 \).
- Step 4: Since the limit exists finitely (and is the same from both sides), \( f \) is differentiable at 0 with \( f'(0) = 0 \).
- Step 5: Note: Even though \( \sin\frac{1}{x} \) oscillates wildly near 0, the factor \( x^2 \) (and then \( h \) in the difference quotient) suppresses it. This is a classic example where the derivative exists but the derivative function \( f'(x) \) for \( x\neq 0 \) is not continuous at 0.

REASONING: This example tests the limit definition with an oscillatory function. The key is to use the Sandwich (Squeeze) Theorem because the limit of \( \sin\frac{1}{h} \) does not exist, but multiplied by \( h \) (which goes to 0) the product goes to 0. This is a common JEE Advanced pattern.

ANSWER: \( f \) is differentiable at \( x=0 \) and \( f'(0) = 0 \).

## WORKED_EXAMPLE_3
PROBLEM: Find the values of \( a \) and \( b \) such that the function \( f(x) = \begin{cases} ax + b, & x < 1 \\ x^2 + 3x, & x \ge 1 \end{cases} \) is differentiable at \( x = 1 \).

STEPS:
- Step 1: For differentiability at \( x=1 \), \( f \) must be continuous at \( x=1 \). Continuity condition: \( \lim_{x\to 1^-} f(x) = \lim_{x\to 1^+} f(x) = f(1) \). LHL = \( a(1)+b = a+b \). RHL = \( 1^2+3(1)=4 \). \( f(1)=4 \). So \( a+b = 4 \). (Equation 1)
- Step 2: Compute LHD at \( x=1 \): \( \lim_{h\to 0^-} \frac{f(1+h)-f(1)}{h} \). For \( h<0 \), \( 1+h < 1 \), so \( f(1+h) = a(1+h)+b = a+ah+b \). \( f(1)=4 \). Difference quotient = \( \frac{a+ah+b-4}{h} = \frac{(a+b-4) + ah}{h} \). Using Equation 1, \( a+b-4=0 \), so this becomes \( \frac{ah}{h} = a \). Limit as \( h\to 0^- \) is \( a \).
- Step 3: Compute RHD at \( x=1 \): \( \lim_{h\to 0^+} \frac{f(1+h)-f(1)}{h} \). For \( h>0 \), \( 1+h > 1 \), so \( f(1+h) = (1+h)^2 + 3(1+h) = 1 + 2h + h^2 + 3 + 3h = 4 + 5h + h^2 \). \( f(1)=4 \). Difference quotient = \( \frac{4+5h+h^2-4}{h} = \frac{5h+h^2}{h} = 5+h \). Limit as \( h\to 0^+ \) is 5.
- Step 4: For differentiability, LHD = RHD → \( a = 5 \).
- Step 5: Substitute into Equation 1: \( 5 + b = 4 \) → \( b = -1 \).
- Step 6: Verify: With \( a=5, b=-1 \), \( f(x) = 5x-1 \) for \( x<1 \). At \( x=1 \), LHL = 4, RHL = 4, continuous. LHD = 5, RHD = 5. Differentiable.

REASONING: This is a typical board exam problem (2-3 marks) where unknown parameters are determined by imposing continuity and differentiability conditions. We must use the limit definition of derivative, not just differentiate the pieces, because the derivative of the left piece at 1 is only valid if the function is defined by that piece in a neighborhood, which it isn't. The limit definition automatically handles the boundary.

ANSWER: \( a = 5 \), \( b = -1 \).

## COMPETENCY_QUESTION_1
QUESTION: A function \( f \) is defined by \( f(x) = \begin{cases} x^2 + ax + b, & x \le 1 \\ 2x + 3, & x > 1 \end{cases} \). It is known that \( f \) is differentiable at \( x = 1 \). Find \( a \) and \( b \). Then, using the values obtained, check whether \( f' \) (the derivative function) is continuous at \( x = 1 \). Justify your answer.

COMPETENCY: Translating real-world situations to mathematical expressions (here, differentiability as a smoothness condition) and analyzing properties of the derivative function.

STEPS:
- Step 1: Impose continuity at \( x=1 \): \( f(1) = 1+a+b \), RHL = \( 2(1)+3=5 \). So \( 1+a+b=5 \) → \( a+b=4 \).
- Step 2: Compute LHD at 1 using definition: For \( h<0 \), \( f(1+h) = (1+h)^2 + a(1+h) + b = 1+2h+h^2+a+ah+b \). \( f(1)=5 \). Difference quotient = \( \frac{1+2h+h^2+a+ah+b-5}{h} = \frac{(a+b-4) + (2+a)h + h^2}{h} \). Using \( a+b=4 \), this simplifies to \( (2+a) + h \). Limit = \( 2+a \).
- Step 3: Compute RHD at 1: For \( h>0 \), \( f(1+h) = 2(1+h)+3 = 5+2h \). Difference quotient = \( \frac{5+2h-5}{h} = 2 \). Limit = 2.
- Step 4: Set LHD = RHD: \( 2+a = 2 \) → \( a = 0 \). Then \( b = 4 \).
- Step 5: Now find \( f'(x) \) for \( x<1 \) and \( x>1 \): For \( x<1 \), \( f(x)=x^2+4 \) → \( f'(x)=2x \). For \( x>1 \), \( f(x)=2x+3 \) → \( f'(x)=2 \). At \( x=1 \), \( f'(1)=2 \) (from LHD=RHD=2).
- Step 6: Check continuity of \( f' \) at 1: \( \lim_{x\to 1^-} f'(x) = \lim_{x\to 1^-} 2x = 2 \). \( \lim_{x\to 1^+} f'(x) = 2 \). \( f'(1)=2 \). So \( f' \) is continuous at 1.

ANSWER: \( a=0, b=4 \). The derivative function \( f' \) is continuous at \( x=1 \).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the function \( f(x) = |x^2 - 4| \).  
(a) Identify all points where \( f \) might not be differentiable.  
(b) Check differentiability at each of these points using left-hand and right-hand derivatives.  
(c) Sketch the graph of \( f \) and indicate the nature of non-differentiability (corner, cusp, vertical tangent).  
(d) Suppose a particle moves along the x-axis with velocity \( v(t) = f(t) \). At what times does the acceleration not exist? Explain physically.

COMPETENCY: Comparing and justifying, and connecting mathematical concepts to physical interpretation (velocity/acceleration).

STEPS:
- Step 1: \( f(x) = |x^2-4| = |(x-2)(x+2)| \). The expression inside absolute value changes sign at \( x=-2 \) and \( x=2 \). These are the only points where non-differentiability can occur (corners).
- Step 2: Write piecewise definition:  
  For \( x \le -2 \): \( x^2-4 \ge 0 \) → \( f(x) = x^2-4 \).  
  For \( -2 < x < 2 \): \( x^2-4 < 0 \) → \( f(x) = -(x^2-4) = 4-x^2 \).  
  For \( x \ge 2 \): \( x^2-4 \ge 0 \) → \( f(x) = x^2-4 \).
- Step 3: Check at \( x=-2 \):  
  Continuity: \( f(-2)=0 \). LHL = \( (-2)^2-4=0 \), RHL = \( 4-(-2)^2=0 \). Continuous.  
  LHD: \( \lim_{h\to 0^-} \frac{f(-2+h)-0}{h} \). For \( h<0 \), \( -2+h < -2 \) → use \( f(x)=x^2-4 \). \( f(-2+h) = (-2+h)^2-4 = 4-4h+h^2-4 = -4h+h^2 \). Quotient = \( \frac{-4h+h^2}{h} = -4+h \) → -4.  
  RHD: For \( h>0 \), \( -2+h > -2 \) (and <2 for small h) → use \( f(x)=4-x^2 \). \( f(-2+h) = 4-(-2+h)^2 = 4-(4-4h+h^2) = 4h-h^2 \). Quotient = \( \frac{4h-h^2}{h} = 4-h \) → 4.  
  LHD = -4, RHD = 4 → not equal → corner at \( x=-2 \).
- Step 4: Check at \( x=2 \):  
  Continuity: \( f(2)=0 \). LHL = \( 4-4=0 \), RHL = \( 4-4=0 \). Continuous.  
  LHD: For \( h<0 \), \( 2+h < 2 \) → use \( 4-x^2 \). \( f(2+h) = 4-(2+h)^2 = 4-(4+4h+h^2) = -4h-h^2 \). Quotient = \( \frac{-4h-h^2}{h} = -4-h \) → -4.  
  RHD: For \( h>0 \), \( 2+h > 2 \) → use \( x^2-4 \). \( f(2+h) = (2+h)^2-4 = 4+4h+h^2-4 = 4h+h^2 \). Quotient = \( \frac{4h+h^2}{h} = 4+h \) → 4.  
  LHD = -4, RHD = 4 → corner at \( x=2 \).
- Step 5: Graph: Parabola \( y=x^2-4 \) opening upward for \( |x|\ge 2 \), inverted parabola \( y=4-x^2 \) for \( |x|<2 \). Corners at (-2,0) and (2,0).
- Step 6: Physical interpretation: \( v(t)=f(t) \). Acceleration \( a(t)=v'(t) \). At \( t=-2 \) and \( t=2 \), velocity has corners, so derivative (acceleration) does not exist. Physically, this means the force (mass × acceleration) would be infinite/undefined at those instants — an idealized model of a sudden jerk.

ANSWER: (a) \( x=-2, 2 \). (b) Not differentiable at both; LHD=-4, RHD=4 at each. (c) Corners at (-2,0) and (2,0). (d) Acceleration does not exist at \( t=-2 \) and \( t=2 \) seconds (corners in velocity graph imply infinite jerk).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a roller-______ track for an amusement park in Mumbai.

## DIAGNOSTIC_ANSWER_7
coaster

The coaster completes the compound noun: the track whose smoothness the whole differentiability test exists to certify. **A wrong answer (a road) reveals the student has repaved the walkthrough's amusement park into a highway.** The coaster completes the compound: amusement-park tracks are the chapter's stand-in for smooth curves and honest derivatives.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can correctly compute left-hand and right-hand derivatives for piecewise-defined functions, determine differentiability at a point by comparing LHD and RHD, and justify why a function fails to be differentiable (corner, cusp, vertical tangent, discontinuity).

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are ______ a roller-coaster track for an amusement park in Mumbai.

## DIAGNOSTIC_ANSWER_9
designing

Designing is the engineer's verb: the track is being drafted, which is why the slopes at the welds matter before any car rides. **A wrong answer (a riding verb) reveals the student has boarded a track that the walkthrough is still drawing.**
