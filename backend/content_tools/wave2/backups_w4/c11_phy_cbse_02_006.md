## ELI5
A ball rolls down an incline, speed climbing steadily - and the three kinematic equations can be earned, not memorised, by integrating. Start from a = dv/dt; with a constant, one integration gives v = u + at, the constant of integration pinned by the start: at t = 0, v = u. Integrate v = ds/dt once more for s = ut + ½at²; eliminate t with the chain rule for v² = u² + 2as. Calculus also reaches where algebra cannot - changing acceleration.

## DEFINITION
The equations of motion for uniformly accelerated rectilinear motion are derived using calculus by integrating the definitions of instantaneous acceleration \( a = \frac{dv}{dt} \) and instantaneous velocity \( v = \frac{dx}{dt} \), yielding the three kinematic equations: \( v = u + at \), \( s = ut + \frac{1}{2}at^2 \), and \( v^2 = u^2 + 2as \), where \( u \) is initial velocity, \( v \) is final velocity, \( a \) is constant acceleration, \( t \) is time, and \( s \) is displacement.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive all three kinematic equations step-by-step from the differential definitions of velocity and acceleration, correctly handle integration constants using initial conditions, and explain why this method extends to non-uniform acceleration while the algebraic method does not.

## SCOPE_BOUNDARY
Covers derivation of kinematic equations for constant acceleration using differential and integral calculus. Does not cover motion with variable acceleration (though the method is introduced as extendable), relativistic effects, or motion in two/three dimensions.

## WALKTHROUGH
Observe a ball rolling down an inclined plane in the school lab: its speed increases steadily. In Class 10 you used algebra to relate \( v, u, a, t, s \). Now we start from the instantaneous definitions: acceleration is the derivative of velocity, \( a = \frac{dv}{dt} \). Since \( a \) is constant, integrate with respect to time from \( t=0 \) to \( t \) to get \( v = u + at \). Next, velocity is the derivative of displacement, \( v = \frac{ds}{dt} \). Substitute \( v = u + at \) and integrate again to get \( s = ut + \frac{1}{2}at^2 \). Finally, eliminate \( t \) by using the chain rule \( a = v\frac{dv}{ds} \) and integrate to obtain \( v^2 = u^2 + 2as \). Each integration step introduces a constant fixed by initial conditions (\( t=0, v=u, s=0 \)).

Takeaway: mastery means reproducing all three integrations with the constants fixed by initial conditions, and stating why the method outruns the algebraic one. Exam moves: derive-the-equations questions and variable-acceleration items where integration still works. Check yourself: every integration constant is a piece of the story - the starting velocity and position write themselves into the answer. Students miss it because they treat the equations as given, when the definitions are the source: differentiate back and each formula dissolves into a dv/dt and a v equals ds over dt.

## DIAGNOSTIC_QUESTION_1
State the differential definition of instantaneous acceleration and write the integral form that leads to the first kinematic equation \( v = u + at \) for constant acceleration.

## DIAGNOSTIC_ANSWER_1
Instantaneous acceleration is defined as \( a = \frac{dv}{dt} \). For constant \( a \), integrating both sides with respect to time from \( 0 \) to \( t \) gives \( \int_{u}^{v} dv = \int_{0}^{t} a \, dt \), yielding \( v - u = at \) or \( v = u + at \). A wrong answer (e.g., writing \( a = \frac{\Delta v}{\Delta t} \) without the limit) reveals the student confuses average acceleration with the instantaneous definition needed for calculus derivation.

## DIAGNOSTIC_QUESTION_2
Explain why the constant of integration when deriving \( s = ut + \frac{1}{2}at^2 \) is set to zero, and what physical assumption this corresponds to.

## DIAGNOSTIC_ANSWER_2
When integrating \( v = \frac{ds}{dt} = u + at \), we get \( s = ut + \frac{1}{2}at^2 + C \). At \( t=0 \), the displacement \( s=0 \) (origin chosen at starting point), so \( C=0 \). This assumes we measure displacement from the initial position. If a student says the constant is zero because "integration constants are always zero," they misunderstand the role of initial conditions in fixing constants.

## DIAGNOSTIC_QUESTION_3
A particle moves along a straight line with acceleration given by \( a = 6t \) m/s² (where \( t \) is in seconds). If its initial velocity is 2 m/s and initial displacement is 0, find its velocity and displacement at \( t = 3 \) s using calculus.

## DIAGNOSTIC_ANSWER_3
Given \( a = \frac{dv}{dt} = 6t \). Integrate: \( \int_{2}^{v} dv = \int_{0}^{3} 6t \, dt \) → \( v - 2 = 3t^2 \big|_0^3 = 27 \) → \( v = 29 \) m/s. Next, \( v = \frac{ds}{dt} = 2 + 3t^2 \). Integrate: \( \int_{0}^{s} ds = \int_{0}^{3} (2 + 3t^2) dt \) → \( s = 2t + t^3 \big|_0^3 = 6 + 27 = 33 \) m. A wrong answer (e.g., using constant-acceleration formulas) reveals the student does not recognize that the calculus method is required for non-constant acceleration.

## DIAGNOSTIC_QUESTION_4
Compare the algebraic derivation (using average velocity) and the calculus derivation of \( v^2 = u^2 + 2as \). Identify the step in the calculus derivation that uses the chain rule and explain why this step is valid only when acceleration is a function of velocity or displacement, not time.

## DIAGNOSTIC_ANSWER_4
In calculus derivation, we write \( a = \frac{dv}{dt} = \frac{dv}{ds} \frac{ds}{dt} = v \frac{dv}{ds} \). This chain rule step expresses acceleration in terms of velocity and displacement, allowing integration with respect to \( s \): \( \int_{u}^{v} v \, dv = \int_{0}^{s} a \, ds \). It is valid because \( v = \frac{ds}{dt} \) and we treat \( v \) as a function of \( s \). If acceleration were given as a function of time only, we could not directly integrate \( a \, ds \) without knowing \( s(t) \). A wrong answer (e.g., saying the chain rule is always applicable regardless of variable dependence) shows confusion about the functional relationships between kinematic variables.

## DIAGNOSTIC_QUESTION_5
A student derives \( s = ut + \frac{1}{2}at^2 \) by integrating \( v = u + at \) but forgets to change the limits of integration when substituting \( v = \frac{ds}{dt} \). They write \( \int_{0}^{s} ds = \int_{0}^{t} (u + at) dt \) and obtain the correct result. Evaluate whether the method is mathematically rigorous and explain why the limits are correct despite the substitution.

## DIAGNOSTIC_ANSWER_5
The method is rigorous because the limits correspond to the same physical instants: at \( t=0 \), \( s=0 \); at time \( t \), displacement is \( s \). The substitution \( v = \frac{ds}{dt} \) does not change the variable of integration (it remains \( dt \)), so the limits stay as time limits. The student's approach is correct. If a student claims the limits must be changed to velocity limits, they misunderstand that the integral is still with respect to time, not velocity.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a smartphone's accelerometer and a toy car on a ramp to verify the calculus-derived equation \( v^2 = u^2 + 2as \) for constant acceleration. Outline the measurements needed and how you would process the data.

## DIAGNOSTIC_ANSWER_6
Place the smartphone on the toy car to record acceleration \( a(t) \). Verify \( a \) is constant. Use the phone's GPS or video analysis to measure displacement \( s \) and final velocity \( v \) (or compute \( v \) by integrating \( a \) over time). Plot \( v^2 \) vs \( s \); the slope should be \( 2a \) and intercept \( u^2 \). A poor answer (e.g., "measure speed with a speedometer") shows lack of understanding of how to obtain instantaneous velocity and displacement from raw acceleration data.

## COMMON_MISCONCEPTION
Students often think the calculus derivation is just a fancy rewrite of the algebraic derivation and that the constant acceleration assumption is used only at the end. In reality, the step \( a = \frac{dv}{dt} \) with \( a \) constant allows us to pull \( a \) out of the integral \( \int a \, dt = a \int dt \). If acceleration were not constant, we could not do this, and the kinematic equations would not hold. They also mistakenly believe the integration constant is always zero, not realizing it represents the initial displacement \( s_0 \) which may be non-zero.

## ON_FAILURE
1. Revisit the definition of derivative as a limit: \( a = \lim_{\Delta t \to 0} \frac{\Delta v}{\Delta t} \). 2. Practice integrating simple functions with initial conditions: e.g., given \( a(t) = 4t \), \( v(0)=3 \), find \( v(t) \). 3. Explicitly write the definite integrals with limits for each derivation step, labeling the lower limit as initial condition and upper limit as variable. 4. Compare with the algebraic derivation to see where constant acceleration is used (pulling \( a \) out of the integral). 5. Solve a problem where \( s_0 \neq 0 \) to see the constant of integration become \( s_0 \).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_02_003, c11_phy_cbse_02_004, c9_physics_ch2_8, c9_math_ch8_5, c11_phy_cbse_02_005

## PREREQUISITE_REASONS
c11_phy_cbse_02_003: Understanding instantaneous velocity as derivative of position is needed to start the derivation \( v = \frac{dx}{dt} \).
c11_phy_cbse_02_004: Understanding instantaneous acceleration as derivative of velocity is needed for \( a = \frac{dv}{dt} \).
c9_physics_ch2_8: Class 9 algebraic derivation of kinematic equations provides the target equations to be derived.
c9_math_ch8_5: Knowledge of arithmetic progression (constant difference) parallels constant acceleration (constant change in velocity per unit time).
c11_phy_cbse_02_005: Calculus derivation generalises the algebraic equations to non-uniform acceleration; this node provides the constant-acceleration base case.  

## FORWARD_NODE_IDS
c11_phy_cbse_02_007, c11_phy_cbse_02_008, c11_phy_cbse_02_009, c11_phy_cbse_02_010, c11_phy_cbse_02_011
## FORWARD_REASONS
c11_phy_cbse_02_007: Relative velocity uses vector addition of velocities derived from kinematic equations.
c11_phy_cbse_02_008: Free fall is a direct application of kinematic equations with \( a = g \).
c11_phy_cbse_02_009: Stopping distance uses \( v^2 = u^2 + 2as \) with \( v=0 \).
c11_phy_cbse_02_010: Reaction time problems combine constant velocity and constant acceleration phases.
c11_phy_cbse_02_011: Word problems require selecting and applying the appropriate kinematic equation.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_05_001, c11_math_cbse_05_002
## CROSS_SUBJECT_REASONS
c11_math_ch5_1: Limits and derivatives (definition of derivative as limit of difference quotient) underlie the definitions of instantaneous velocity and acceleration.
c11_math_ch5_2: Integration as anti-derivative and definite integrals with limits are used to obtain velocity from acceleration and displacement from velocity.
c11_math_cbse_05_001: Cross-subject support: Complex numbers are an extension of the real number system, defined as numbers of the form... supplies tools/facts used directly in this node.  
c11_math_cbse_05_002: Cross-subject support: A complex number is a number of the form \( z = a + ib \), where \( a \) and \( b \) are r... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_02_003 -> c11_phy_cbse_02_004 -> c11_phy_cbse_02_006 -> c11_phy_cbse_02_008

## THIS_FORMULA
\( v = u + at \), \( s = ut + \frac{1}{2}at^2 \), \( v^2 = u^2 + 2as \) (for constant acceleration \( a \))

## FORMULA_VARIABLES
\( u \) = initial velocity (m/s), \( v \) = final velocity (m/s), \( a \) = constant acceleration (m/s²), \( t \) = time (s), \( s \) = displacement (m)

## FORMULA_UNITS
m/s, m/s², s, m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch5_1 | The derivative \( \frac{dv}{dt} \) is defined as a limit; understanding limits is essential to grasp instantaneous acceleration.
c11_math_ch5_2 | The definite integral \( \int_{u}^{v} dv = \int_{0}^{t} a \, dt \) computes the change in velocity; integration techniques are used throughout the derivation.

## PREREQ_CONCEPT
Instantaneous velocity and acceleration as derivatives of position and velocity respectively.

## PREREQ_BEFORE
The student must be able to compute simple derivatives and integrals of polynomial functions and apply initial conditions to determine constants of integration.

## PREREQ_STUCK
Review differentiation and integration of polynomials from Class 11 Mathematics (Limits and Derivatives, Integrals) and the definitions of instantaneous velocity and acceleration from earlier nodes in this chapter.

## WORKED_EXAMPLE_1
PROBLEM: A car starts from rest and accelerates uniformly at 2.5 m/s² along a straight road. Using calculus, derive the expression for its displacement as a function of time and calculate the displacement after 10 seconds.
STEPS:
- Step 1: Identify given quantities: initial velocity \( u = 0 \) m/s, constant acceleration \( a = 2.5 \) m/s², time \( t = 10 \) s. We need displacement \( s \) at \( t = 10 \) s.
- Step 2: Start from the definition of acceleration as derivative of velocity: \( a = \frac{dv}{dt} \). Since \( a \) is constant, integrate with respect to time from 0 to \( t \): \( \int_{u}^{v} dv = \int_{0}^{t} a \, dt \).
- Step 3: Perform integration: \( v - u = a t \). With \( u = 0 \), we get \( v = a t \).
- Step 4: Now use velocity as derivative of displacement: \( v = \frac{ds}{dt} = a t \). Integrate with respect to time from 0 to \( t \): \( \int_{0}^{s} ds = \int_{0}^{t} a t \, dt \).
- Step 5: Perform integration: \( s = \frac{1}{2} a t^2 \). Substitute \( a = 2.5 \) m/s² and \( t = 10 \) s: \( s = \frac{1}{2} \times 2.5 \times 100 = 125 \) m.
REASONING: The calculus derivation proceeds by integrating the differential definitions step by step. The first integration gives velocity as a function of time; the second integration gives displacement. The constants of integration are determined by the initial conditions (starting from rest at origin).
ANSWER: 125 m

## WORKED_EXAMPLE_2
PROBLEM: A particle moves along the x-axis with acceleration given by \( a = 4 - 2t \) m/s² (where \( t \) is in seconds). At \( t = 0 \), its velocity is 3 m/s and its position is 5 m. Find the velocity and position as functions of time, and determine the maximum velocity attained.
STEPS:
- Step 1: Given \( a(t) = 4 - 2t \). Since acceleration is not constant, we must use calculus: \( a = \frac{dv}{dt} \).
- Step 2: Integrate acceleration to get velocity: \( \int_{3}^{v} dv = \int_{0}^{t} (4 - 2t) \, dt \) → \( v - 3 = 4t - t^2 \) → \( v(t) = 3 + 4t - t^2 \).
- Step 3: Find maximum velocity: set derivative of \( v(t) \) (which is acceleration) to zero: \( a = 4 - 2t = 0 \) → \( t = 2 \) s. Maximum velocity \( v_{max} = 3 + 4(2) - 4 = 7 \) m/s.
- Step 4: Integrate velocity to get position: \( v = \frac{dx}{dt} = 3 + 4t - t^2 \). Integrate from 0 to \( t \): \( \int_{5}^{x} dx = \int_{0}^{t} (3 + 4t - t^2) \, dt \) → \( x - 5 = 3t + 2t^2 - \frac{t^3}{3} \).
- Step 5: Position function: \( x(t) = 5 + 3t + 2t^2 - \frac{t^3}{3} \).
REASONING: This example shows the power of calculus derivation: it works for non-uniform acceleration. We integrate the given acceleration function to get velocity, then integrate velocity to get position. The maximum velocity occurs when acceleration changes sign (from positive to negative).
ANSWER: \( v(t) = 3 + 4t - t^2 \) m/s, \( x(t) = 5 + 3t + 2t^2 - \frac{t^3}{3} \) m, maximum velocity = 7 m/s at \( t = 2 \) s.

## WORKED_EXAMPLE_3
PROBLEM: A ball is thrown vertically upward from a building of height 20 m with an initial speed of 15 m/s. Take \( g = 10 \) m/s² downward. Using the calculus-derived equation \( v^2 = u^2 + 2as \), find (a) the maximum height above the ground reached by the ball, and (b) the speed with which it hits the ground.
STEPS:
- Step 1: Set up coordinate system: ground as origin, upward positive. Initial position \( y_0 = 20 \) m, initial velocity \( u = +15 \) m/s, acceleration \( a = -g = -10 \) m/s².
- Step 2: At maximum height, velocity \( v = 0 \). Use \( v^2 = u^2 + 2a(y - y_0) \): \( 0 = 15^2 + 2(-10)(y_{max} - 20) \).
- Step 3: Solve for \( y_{max} \): \( 0 = 225 - 20(y_{max} - 20) \) → \( 20(y_{max} - 20) = 225 \) → \( y_{max} - 20 = 11.25 \) → \( y_{max} = 31.25 \) m above ground.
- Step 4: When ball hits ground, \( y = 0 \). Use same equation: \( v^2 = 15^2 + 2(-10)(0 - 20) = 225 + 400 = 625 \).
- Step 5: Take square root: \( v = \pm 25 \) m/s. Since ball is moving downward, velocity is negative: \( v = -25 \) m/s. Speed = 25 m/s.
REASONING: The equation \( v^2 = u^2 + 2as \) is derived by eliminating time using the chain rule. It directly relates velocity and displacement, making it ideal for problems where time is not asked. The sign convention (upward positive) ensures correct signs for acceleration and displacement.
ANSWER: (a) 31.25 m above ground, (b) 25 m/s downward.

## COMPETENCY_QUESTION_1
QUESTION: A student claims that the equation \( s = ut + \frac{1}{2}at^2 \) can be derived by simply multiplying the average velocity \( \frac{u+v}{2} \) by time \( t \) and substituting \( v = u + at \). They argue that calculus is unnecessary. Explain why the calculus derivation is still important, and give a physical situation where the algebraic method fails but the calculus method succeeds.
COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Acknowledge that for constant acceleration, both methods yield the same equations.
- Step 2: Explain that the algebraic method relies on the property that average velocity equals \( \frac{u+v}{2} \) only when acceleration is constant.
- Step 3: Describe a situation with non-constant acceleration, e.g., a car with acceleration \( a = kt \) (increasing linearly with time). The algebraic method cannot be used because average velocity is not \( \frac{u+v}{2} \).
- Step 4: Show that calculus method still works: integrate \( a = kt \) to get \( v \), then integrate \( v \) to get \( s \).
ANSWER: The calculus derivation is fundamental because it starts from the definitions of instantaneous velocity and acceleration and does not assume constant acceleration until the integration step where \( a \) is taken out of the integral. For non-uniform acceleration, the algebraic method fails, but the calculus method (integrating \( a(t) \)) still provides the correct kinematic relations.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a physics lab, a student uses a motion sensor to record the position of a cart on an inclined track at discrete time intervals. The data shows the position follows \( x(t) = 0.2t^3 + 0.5t^2 + 1 \) (in meters, with \( t \) in seconds). The student wants to find the acceleration at \( t = 2 \) s. (a) Can the student use the kinematic equation \( v^2 = u^2 + 2as \) to find acceleration? (b) How should they find the acceleration using calculus? (c) What is the acceleration at \( t = 2 \) s?
COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Recognize that the given position function is cubic in time, meaning acceleration is not constant (since \( a = \frac{d^2x}{dt^2} = 1.2t + 1 \)).
- Step 2: The equation \( v^2 = u^2 + 2as \) is derived assuming constant acceleration, so it cannot be used here.
- Step 3: To find acceleration, differentiate position twice: \( v = \frac{dx}{dt} = 0.6t^2 + t \), then \( a = \frac{dv}{dt} = 1.2t + 1 \).
- Step 4: Evaluate at \( t = 2 \) s: \( a(2) = 1.2(2) + 1 = 3.4 \) m/s².
ANSWER: (a) No, because acceleration is not constant. (b) Differentiate the position function twice with respect to time. (c) 3.4 m/s².
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe a ball rolling down an ______ plane in the school lab: its speed increases steadily.

## DIAGNOSTIC_ANSWER_7
inclined

**A wrong answer ("sloped" or "tilted") reveals the student has paraphrased the walkthrough's adjective - the ball rolls down an inclined plane.** Inclined is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the steadily climbing speed before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can derive all three kinematic equations step-by-step from the differential definitions of velocity and acceleration, correctly handle integration constants using initial conditions, and explain why this method extends to non-uniform acceleration while the algebraic method does not.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe a ball rolling down an inclined plane in the school lab: its speed ______ steadily.

## DIAGNOSTIC_ANSWER_9
increases

**A wrong answer ("decreases" or "changes") reveals the student has swapped the walkthrough's verb - on the incline the speed increases steadily.** Increases is the walkthrough's own verb, and the verb is what the blank grades. Recall the constant acceleration before filling, and give the verb exactly.
