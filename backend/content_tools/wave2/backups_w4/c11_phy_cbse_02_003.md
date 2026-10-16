## ELI5
The bicycle's speedometer reads 15 km/h now, 18 after the pedal push, 10 at the breaker - each a what-is-happening-right-now number. Instantaneous velocity shrinks the interval to nothing: the chord's slope on the x-t graph melts into the tangent's slope, or dx/dt from the position function. Speed is that velocity with the sign stripped - magnitude only, always non-negative.

## DEFINITION
Instantaneous velocity is the rate of change of position with respect to time at a specific instant, defined mathematically as the limit of average velocity as the time interval approaches zero: \( v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt} \). Its SI unit is metre per second (m/s). Instantaneous speed is the magnitude of instantaneous velocity, always non-negative, with the same SI unit (m/s). For one-dimensional motion along the x-axis, the sign of instantaneous velocity indicates direction (positive for +x direction, negative for -x direction), while instantaneous speed carries no directional information.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can calculate instantaneous velocity from a given position-time function \( x(t) \) using differentiation, determine instantaneous velocity graphically as the slope of the tangent to an x-t curve at a given point, and explain why instantaneous speed always equals the magnitude of instantaneous velocity while average speed may exceed the magnitude of average velocity.

## SCOPE_BOUNDARY
This node covers the definition, graphical interpretation, and numerical/calculus methods for finding instantaneous velocity and speed for rectilinear motion. It does NOT cover acceleration (covered in c11_phy_cbse_02_004), kinematic equations for uniformly accelerated motion (c11_phy_cbse_02_005), or motion in two/three dimensions. The calculus used is limited to basic differentiation of polynomial functions of time.

## WALKTHROUGH
Imagine you are riding a bicycle on a straight road from your home to school. Your speedometer shows 15 km/h at one moment, then 18 km/h a few seconds later when you pedal harder, then drops to 10 km/h as you approach a speed breaker. The speedometer reads your *instantaneous speed* — how fast you are moving *right now*, not averaged over the whole trip. In Class 9, you learned average velocity \( v_{avg} = \frac{\Delta x}{\Delta t} \) over a finite interval. To find the velocity *at an instant*, we shrink that interval until it becomes infinitesimally small. Graphically, on an x-t graph, the average velocity over an interval is the slope of the chord; as the interval shrinks to zero, the chord becomes the tangent at that point. The slope of this tangent *is* the instantaneous velocity. If you have the mathematical function \( x(t) \), you differentiate it: \( v(t) = \frac{dx}{dt} \). The magnitude of this velocity gives instantaneous speed.

Takeaway: mastery means differentiating x(t) for instant velocities, reading tangents off graphs, and keeping the speed-versus-velocity sign discipline. Exam moves: find-the-instantaneous-velocity questions and tangent-slope items. Check yourself: a chord joins two times, a tangent touches one - quoting a chord slope as an instant is the classic slip. Students miss it because Class 10 lived on averages, when the definition's limit is the new machinery: shrink the interval, watch the secant settle into the tangent, and the what-right-now answer emerges from the how-on-average machinery.

## DIAGNOSTIC_QUESTION_1
Define instantaneous velocity and state its SI unit. How does it differ from average velocity in terms of the time interval considered?

## DIAGNOSTIC_ANSWER_1
Instantaneous velocity is the limit of average velocity as the time interval \( \Delta t \) approaches zero: \( v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt} \). Its SI unit is m/s. Average velocity uses a finite \( \Delta t \) (e.g., 5 s), giving the overall rate over that interval, while instantaneous velocity gives the rate at a specific instant \( t \). A wrong answer (e.g., "instantaneous velocity is velocity at an instant" without the limiting process or calculus definition) reveals the student memorised a phrase but does not grasp the mathematical foundation — the concept of a limit — which is essential for deriving kinematic equations later.

## DIAGNOSTIC_QUESTION_2
A particle moves along the x-axis with position given by \( x(t) = 4t^2 - 3t + 2 \) (x in metres, t in seconds). Explain why the instantaneous speed at \( t = 2 \) s is equal to the magnitude of instantaneous velocity at that instant, but the average speed over \( t = 0 \) to \( 2 \) s may not equal the magnitude of average velocity over the same interval.

## DIAGNOSTIC_ANSWER_2
At any instant, instantaneous speed \( = |v(t)| \) by definition, since speed is the magnitude of the velocity vector. In 1D, velocity has only one component, so \( |v| \) is simply the absolute value. For the given function, \( v(t) = 8t - 3 \); at \( t = 2 \) s, \( v = 13 \) m/s, speed \( = 13 \) m/s — they are equal. However, average velocity \( = \frac{x(2)-x(0)}{2-0} = \frac{12-2}{2} = 5 \) m/s. The particle moves forward, stops momentarily (if velocity changes sign), or reverses; total path length \( \geq |\text{displacement}| \), so average speed \( \geq |\text{average velocity}| \). A wrong answer (e.g., claiming they are always equal) shows the student confuses the *instantaneous* equality (which holds because direction doesn't change in an infinitesimal interval) with the *average* case where direction changes over a finite interval.

## DIAGNOSTIC_QUESTION_3
The position of a car moving on a straight road is given by \( x(t) = 2t^3 - 15t^2 + 36t + 10 \) (x in metres, t in seconds). Calculate the instantaneous velocity and instantaneous speed at \( t = 3 \) s. Show all steps with units.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify given: \( x(t) = 2t^3 - 15t^2 + 36t + 10 \) m, \( t = 3 \) s. Find \( v(3) \) and speed at \( t = 3 \) s.
**Step 2:** Formula: \( v(t) = \frac{dx}{dt} \). Differentiate each term: \( \frac{d}{dt}(2t^3) = 6t^2 \), \( \frac{d}{dt}(-15t^2) = -30t \), \( \frac{d}{dt}(36t) = 36 \), \( \frac{d}{dt}(10) = 0 \). So \( v(t) = 6t^2 - 30t + 36 \) m/s.
**Step 3:** Substitute \( t = 3 \) s: \( v(3) = 6(9) - 30(3) + 36 = 54 - 90 + 36 = 0 \) m/s.
**Step 4:** Instantaneous speed \( = |v(3)| = |0| = 0 \) m/s.
**Step 5:** Physical check: At \( t = 3 \) s, the car momentarily stops (velocity zero) before reversing direction. Speed is zero, consistent.
**Answer:** Instantaneous velocity = 0 m/s, instantaneous speed = 0 m/s.
A wrong answer (e.g., forgetting to differentiate, or giving speed as -0 m/s) reveals the student either doesn't know differentiation rules for polynomials or doesn't understand that speed is a magnitude (non-negative).

## DIAGNOSTIC_QUESTION_4
The x-t graph of a particle in rectilinear motion is a parabola opening upward. At \( t = 2 \) s, the tangent to the curve makes an angle of \( 30^\circ \) with the positive time axis. At \( t = 5 \) s, the tangent makes an angle of \( 120^\circ \) with the positive time axis. Determine the instantaneous velocity at both instants and explain the physical meaning of the sign difference.

## DIAGNOSTIC_ANSWER_4
The slope of the tangent on an x-t graph gives instantaneous velocity: \( v = \tan\theta \), where \( \theta \) is the angle with the positive t-axis.
At \( t = 2 \) s: \( \theta = 30^\circ \), \( v = \tan 30^\circ = \frac{1}{\sqrt{3}} \approx 0.577 \) m/s (positive).
At \( t = 5 \) s: \( \theta = 120^\circ \), \( v = \tan 120^\circ = \tan(180^\circ - 60^\circ) = -\tan 60^\circ = -\sqrt{3} \approx -1.732 \) m/s (negative).
Positive velocity means the particle moves in the +x direction (increasing x); negative velocity means it moves in the -x direction (decreasing x). The parabola opening upward implies the particle first slows down in +x direction, momentarily stops at the vertex, then speeds up in -x direction. A wrong answer (e.g., taking \( \tan 120^\circ \) as positive) shows the student doesn't understand that angles > 90° on an x-t graph correspond to negative slopes (velocity in negative x direction), a critical skill for interpreting motion graphs in board exams.

## DIAGNOSTIC_QUESTION_5
A student claims: "For a particle moving in a straight line, if the instantaneous velocity is zero at some instant, the instantaneous acceleration must also be zero at that instant." Evaluate this statement. Is it true or false? Justify with a concrete example from free fall.

## DIAGNOSTIC_ANSWER_5
**False.** Instantaneous velocity and instantaneous acceleration are independent at a given instant. Velocity is the rate of change of position; acceleration is the rate of change of velocity. A particle can be momentarily at rest (\( v = 0 \)) while its velocity is *changing* (non-zero acceleration).
**Example:** A ball thrown vertically upward with \( u = 20 \) m/s. At the highest point, \( v = 0 \) m/s. But acceleration \( a = -g = -9.8 \) m/s² (downward). The ball is momentarily at rest but accelerating downward — it immediately starts moving down.
A student who says "true" confuses "zero velocity" with "constant velocity" (which would imply zero acceleration). This is a classic Class 11 misconception addressed in NCERT Points to Ponder #4. The error stems from thinking "if it's not moving, no force acts" — confusing velocity with acceleration.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a smartphone and a metre scale to measure the instantaneous speed of a toy car at a specific point on a ramp. Describe the procedure, the data you would collect, and how you would calculate the instantaneous speed from your data. (Hint: Use the concept of shrinking time intervals.)

## DIAGNOSTIC_ANSWER_6
**Procedure:** Place a metre scale along a ramp. Mark a point P (e.g., 50 cm from start). Use a smartphone's slow-motion video (240 fps or 480 fps) to record the toy car rolling down from rest. In the video, note the time stamps when the car's front crosses positions \( x_1 = 48 \) cm, \( x_2 = 49 \) cm, \( x_3 = 50 \) cm (point P), \( x_4 = 51 \) cm, \( x_5 = 52 \) cm.
**Data:** Frame numbers or time stamps for each position. Convert to time \( t \) using frame rate.
**Calculation:** Compute average velocities over shrinking intervals centred at P:
\( v_{avg1} = \frac{x_5 - x_1}{t_5 - t_1} \) (interval 4 cm),
\( v_{avg2} = \frac{x_4 - x_2}{t_4 - t_2} \) (interval 2 cm),
\( v_{avg3} = \frac{x_3 - x_3}{t_3 - t_3} \) — wait, use symmetric intervals: \( \frac{x_4 - x_2}{t_4 - t_2} \), then \( \frac{x_3.5 - x_2.5}{t_3.5 - t_2.5} \) if interpolating.
As interval \( \Delta x \to 0 \), \( v_{avg} \to \) instantaneous speed at P.
**Good answer criteria:** Uses symmetric intervals around P, mentions limiting process, acknowledges smartphone frame rate limits \( \Delta t \) resolution.
**Poor answer:** Just measures total time over total distance (gives average speed), or uses only two points far apart. Reveals the student doesn't grasp the *limiting process* central to the definition of instantaneous velocity.

## COMMON_MISCONCEPTION
Students often believe that "instantaneous velocity is just average velocity over a very small time interval, like 0.01 s." They treat \( \Delta t \) as a small but *finite* number (e.g., 0.01 s) rather than understanding it as a *limit* where \( \Delta t \to 0 \). This leads to two errors: (1) They think numerical approximation with a small \( \Delta t \) *is* the definition, not an approximation. (2) They fail to recognise that for non-uniform motion, any finite \( \Delta t \) gives only an approximation, and the exact value requires the limiting process or calculus. For example, given \( x = t^3 \), a student might compute \( \frac{(2.01)^3 - (1.99)^3}{0.02} \approx 12.0001 \) and say "instantaneous velocity at t=2 is 12.0001 m/s" instead of recognising the exact value is \( 3t^2 = 12 \) m/s from differentiation. This misconception persists because Class 10 only dealt with average quantities; the concept of a limit is new.

## ON_FAILURE
**Step 1:** Revisit the numerical method in NCERT Table 2.1. Have the student compute \( \frac{\Delta x}{\Delta t} \) for \( x = t^3 \) at \( t = 2 \) s with \( \Delta t = 2, 1, 0.5, 0.1, 0.01, 0.001 \) s. Ask them to observe the trend and predict the limiting value. **Step 2:** Draw the x-t graph of \( x = t^3 \). Draw chords for each \( \Delta t \) and show how they approach the tangent. **Step 3:** Introduce the derivative as the *exact* slope of the tangent. Practice differentiating \( t^n \) using the power rule \( \frac{d}{dt}(t^n) = n t^{n-1} \). **Step 4:** Give a position function \( x(t) = 3t^2 - 4t + 5 \) and ask: "Find instantaneous velocity at t=2 s using (a) the limit definition with a table, (b) differentiation. Compare." This bridges numerical intuition to calculus precision.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_02_001, c11_phy_cbse_02_002, c9_math_ch2_6, c9_physics_ch2_6, c9_physics_ch2_3, c9_physics_ch2_4
## PREREQUISITE_REASONS
c11_phy_cbse_02_001: Provides the definition of position, displacement, and coordinate system — essential for defining \( x(t) \) and \( \Delta x \).
c11_phy_cbse_02_002: Defines average velocity \( v_{avg} = \frac{\Delta x}{\Delta t} \); instantaneous velocity is the limit of this as \( \Delta t \to 0 \).
c9_math_ch2_6: Introduces slope of a line (slope-intercept form); instantaneous velocity is the slope of the tangent, a direct extension.
c9_physics_ch2_6: Teaches interpretation of distance-time graphs; slope of chord = average velocity, slope of tangent = instantaneous velocity.
c9_physics_ch2_3: Defines velocity as a vector with magnitude and direction; needed to distinguish velocity (signed) from speed (magnitude).
c9_physics_ch2_4: Distinguishes uniform (constant velocity) and non-uniform motion; instantaneous velocity is crucial *only* for non-uniform motion.

## FORWARD_NODE_IDS
c11_phy_cbse_02_004, c11_phy_cbse_02_005, c11_phy_cbse_02_006, c11_phy_cbse_02_008, c11_phy_cbse_02_007, c11_phy_cbse_02_009, c11_phy_cbse_02_011, c12_phy_cbse_04_001, c12_phy_cbse_06_003

## FORWARD_REASONS
c11_phy_cbse_02_004: Instantaneous acceleration is defined identically as the limit of average acceleration (\( a = \frac{dv}{dt} \)); the same limiting process and graphical interpretation (slope of v-t tangent) apply.
c11_phy_cbse_02_005: Kinematic equations are derived by integrating \( a = \frac{dv}{dt} \) and \( v = \frac{dx}{dt} \); understanding \( v = \frac{dx}{dt} \) is prerequisite for the calculus derivation in c11_phy_cbse_02_006.
c11_phy_cbse_02_006: Explicitly uses calculus to derive equations of motion; requires fluency with \( v = \frac{dx}{dt} \) and \( a = \frac{dv}{dt} \).
c11_phy_cbse_02_008: Free fall is a primary application where \( x(t) \) is quadratic, \( v(t) \) is linear; finding instantaneous velocity at any height/time uses this node's methods.
c11_phy_cbse_02_007: Instantaneous velocity as a vector (with sign/direction) is the direct prerequisite; relative velocity is vector subtraction of two instantaneous velocities.  
c11_phy_cbse_02_009: Instantaneous velocity concept needed to identify initial velocity v₀ at the moment brakes are applied.  
c11_phy_cbse_02_011: Instantaneous velocity defines initial/final conditions in kinematic equations.  
c12_phy_cbse_04_001: Instantaneous velocity — the \(\vec{v}\) in Lorentz force is the instantaneous velocity vector.  
c12_phy_cbse_06_003: Instantaneous velocity vector is needed for the direction of motion in the formula \( \mathcal{E} = \int (\vec{v} \times \vec{B}) \cdot d\vec{l} \).  

## CROSS_SUBJECT_PREREQS
c9_math_ch2_6, c10_math_cbse_07_001, c9_math_ch1_4
## CROSS_SUBJECT_REASONS
c9_math_ch2_6: Slope-intercept form \( y = mx + c \) teaches that slope \( m \) represents rate of change; on an x-t graph, slope = velocity. This is the geometric foundation for \( v = \frac{dx}{dt} \).
c10_math_cbse_07_001: Distance formula uses coordinates; position \( x(t) \) is a coordinate on an axis, and \( \Delta x \) is a coordinate difference — the same mathematical structure.
c9_math_ch1_4: Distance formula derivation via Pythagoras extends to displacement in 1D as \( |\Delta x| \); reinforces that displacement is a signed quantity in 1D (coordinate difference), not just distance.

## CHAIN_DESCRIPTION
c11_phy_cbse_02_001 -> c11_phy_cbse_02_002 -> c11_phy_cbse_02_003 -> c11_phy_cbse_02_004 -> c11_phy_cbse_02_005

## THIS_FORMULA
\( v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt} \) (m/s); Instantaneous speed \( = |v| \) (m/s)

## FORMULA_VARIABLES
\( v \) = instantaneous velocity (m/s), \( x \) = position coordinate (m), \( t \) = time (s), \( \Delta x \) = displacement in interval \( \Delta t \) (m), \( \Delta t \) = time interval (s), \( \frac{dx}{dt} \) = derivative of position with respect to time (m/s)

## FORMULA_UNITS
m/s (metre per second) for both instantaneous velocity and instantaneous speed

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch2_6 | The slope of a line (m = Δy/Δx) in coordinate geometry directly maps to velocity (v = Δx/Δt) on a position-time graph; the tangent slope gives instantaneous rate of change.
c10_math_cbse_07_001 | Distance formula √[(x₂-x₁)²+(y₂-y₁)²] in 2D reduces to |x₂-x₁| in 1D; displacement Δx = x₂-x₁ is a coordinate difference, making position a coordinate function x(t).

## PREREQ_CONCEPT
Average velocity (\( v_{avg} = \frac{\Delta x}{\Delta t} \)) and its graphical interpretation as the slope of a chord on an x-t graph.

## PREREQ_BEFORE
The student must be able to compute average velocity from position data, plot and interpret x-t graphs, and understand that the slope of a line represents a rate of change.

## PREREQ_STUCK
If stuck, revisit c11_phy_cbse_02_002 (Average Velocity and Average Speed) and c9_physics_ch2_6 (Distance-Time Graphs) to reinforce the chord-slope connection before attempting the limiting process.

## WORKED_EXAMPLE_1
PROBLEM: A particle moves along the x-axis such that its position varies with time as \( x(t) = 5t^2 - 20t + 15 \) (x in metres, t in seconds). Find (a) the instantaneous velocity at \( t = 3 \) s, (b) the instantaneous speed at \( t = 3 \) s, (c) the time when the particle momentarily comes to rest, and (d) the position at that instant.
STEPS:
- Step 1: Identify the given position function \( x(t) = 5t^2 - 20t + 15 \) m and the target instant \( t = 3 \) s. Recall that instantaneous velocity \( v(t) = \frac{dx}{dt} \).
- Step 2: Differentiate \( x(t) \) term by term using the power rule \( \frac{d}{dt}(t^n) = n t^{n-1} \): \( \frac{d}{dt}(5t^2) = 10t \), \( \frac{d}{dt}(-20t) = -20 \), \( \frac{d}{dt}(15) = 0 \). Thus \( v(t) = 10t - 20 \) m/s.
- Step 3: Substitute \( t = 3 \) s into \( v(t) \): \( v(3) = 10(3) - 20 = 30 - 20 = 10 \) m/s. The positive sign indicates motion in the +x direction.
- Step 4: Instantaneous speed is the magnitude of velocity: speed \( = |v(3)| = |10| = 10 \) m/s.
- Step 5: For the particle to be momentarily at rest, \( v(t) = 0 \). Solve \( 10t - 20 = 0 \) → \( t = 2 \) s.
- Step 6: Find position at \( t = 2 \) s: \( x(2) = 5(2)^2 - 20(2) + 15 = 20 - 40 + 15 = -5 \) m. The particle is at x = -5 m (5 m on the negative side of the origin) when it stops.
REASONING: The derivative gives the exact rate of change at an instant. The particle's velocity changes linearly with time (since acceleration is constant, \( a = \frac{dv}{dt} = 10 \) m/s²). At \( t = 2 \) s, velocity crosses zero from negative to positive — the particle reverses direction. The position at that instant is the turning point.
ANSWER: (a) 10 m/s, (b) 10 m/s, (c) 2 s, (d) -5 m

## WORKED_EXAMPLE_2
PROBLEM: The position of a motorcycle moving on a straight highway is recorded at regular intervals: at \( t = 4.0 \) s, \( x = 32.0 \) m; at \( t = 4.1 \) s, \( x = 33.64 \) m; at \( t = 4.01 \) s, \( x = 32.1601 \) m; at \( t = 4.001 \) s, \( x = 32.016001 \) m. Estimate the instantaneous velocity at \( t = 4.0 \) s using the method of shrinking intervals. Comment on the pattern and deduce the likely position function \( x(t) \).
STEPS:
- Step 1: Organise the data in a table centred at \( t = 4.0 \) s with decreasing \( \Delta t \):
  \( \Delta t = 0.1 \) s: \( t_1 = 3.95 \) s? Wait, the given points are not symmetric. Use the given pairs: (4.0, 4.1), (4.0, 4.01), (4.0, 4.001). These are forward differences. Better: compute average velocity over each interval starting at 4.0 s.
- Step 2: Compute average velocity for each interval:
  Interval 4.0 to 4.1 s: \( \Delta x = 33.64 - 32.0 = 1.64 \) m, \( \Delta t = 0.1 \) s, \( v_{avg} = \frac{1.64}{0.1} = 16.4 \) m/s.
  Interval 4.0 to 4.01 s: \( \Delta x = 32.1601 - 32.0 = 0.1601 \) m, \( \Delta t = 0.01 \) s, \( v_{avg} = \frac{0.1601}{0.01} = 16.01 \) m/s.
  Interval 4.0 to 4.001 s: \( \Delta x = 32.016001 - 32.0 = 0.016001 \) m, \( \Delta t = 0.001 \) s, \( v_{avg} = \frac{0.016001}{0.001} = 16.001 \) m/s.
- Step 3: Observe the limiting value: As \( \Delta t \) decreases (0.1 → 0.01 → 0.001 s), \( v_{avg} \) approaches 16.000... m/s. The instantaneous velocity at \( t = 4.0 \) s is 16 m/s.
- Step 4: Deduce \( x(t) \). The values suggest \( x(4) = 32 \), and \( v(4) = 16 \). Notice \( 32 = 2 \times 4^2 \), \( 33.64 = 2 \times (4.1)^2 \), \( 32.1601 = 2 \times (4.01)^2 \), \( 32.016001 = 2 \times (4.001)^2 \). So \( x(t) = 2t^2 \) m.
- Step 5: Verify: If \( x(t) = 2t^2 \), then \( v(t) = \frac{dx}{dt} = 4t \). At \( t = 4 \) s, \( v = 4 \times 4 = 16 \) m/s. Matches the limit.
- Step 6: The method of shrinking intervals (numerical limit) converges to the exact derivative value. This is how instantaneous velocity is found experimentally when the function is unknown.
REASONING: The numerical method mimics the definition \( v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} \). The data given follows a perfect quadratic \( x = 2t^2 \), so the forward differences converge cleanly to the derivative. In real experiments, measurement errors would require curve fitting or symmetric intervals for better accuracy.
ANSWER: Instantaneous velocity at \( t = 4.0 \) s ≈ 16 m/s; position function \( x(t) = 2t^2 \) m.

## WORKED_EXAMPLE_3
PROBLEM: A ball is thrown vertically upward from a building roof 20 m above ground with initial velocity 25 m/s. Take upward as +y direction, origin at ground. The position function is \( y(t) = 20 + 25t - 5t^2 \) (y in metres, t in seconds, g = 10 m/s²). Find (a) the instantaneous velocity function \( v(t) \), (b) the time and height at maximum height, (c) the instantaneous speed when the ball is at half the maximum height (above launch point), (d) the velocity when it hits the ground.
STEPS:
- Step 1: Given \( y(t) = 20 + 25t - 5t^2 \) m. Differentiate: \( v(t) = \frac{dy}{dt} = 25 - 10t \) m/s.
- Step 2: At maximum height, \( v = 0 \). Solve \( 25 - 10t = 0 \) → \( t = 2.5 \) s. Height: \( y(2.5) = 20 + 25(2.5) - 5(2.5)^2 = 20 + 62.5 - 31.25 = 51.25 \) m above ground. Max height above launch = \( 51.25 - 20 = 31.25 \) m.
- Step 3: Half max height above launch = \( 31.25 / 2 = 15.625 \) m. Position \( y = 20 + 15.625 = 35.625 \) m. Solve \( 20 + 25t - 5t^2 = 35.625 \) → \( 5t^2 - 25t + 15.625 = 0 \) → \( t^2 - 5t + 3.125 = 0 \). Discriminant \( D = 25 - 12.5 = 12.5 \). \( t = \frac{5 \pm \sqrt{12.5}}{2} \). Two times: \( t_1 \approx 0.73 \) s (going up), \( t_2 \approx 4.27 \) s (coming down).
- Step 4: Instantaneous speed at half max height: \( |v(t_1)| = |25 - 10(0.73)| = |17.7| = 17.7 \) m/s; \( |v(t_2)| = |25 - 10(4.27)| = |-17.7| = 17.7 \) m/s. Speed is the same going up and down at the same height (energy conservation).
- Step 5: When ball hits ground, \( y = 0 \). Solve \( 20 + 25t - 5t^2 = 0 \) → \( 5t^2 - 25t - 20 = 0 \) → \( t^2 - 5t - 4 = 0 \). \( t = \frac{5 \pm \sqrt{25 + 16}}{2} = \frac{5 \pm \sqrt{41}}{2} \). Positive root: \( t = \frac{5 + 6.403}{2} \approx 5.70 \) s.
- Step 6: Velocity at impact: \( v(5.70) = 25 - 10(5.70) = 25 - 57.0 = -32.0 \) m/s. Negative sign means downward. Instantaneous speed = 32.0 m/s.
REASONING: This combines instantaneous velocity (derivative of position), finding extrema (v=0), solving quadratic equations for time at a given position, and interpreting sign of velocity as direction. The speed symmetry at equal heights reflects the conservative nature of gravity (kinetic energy depends only on height). This is a comprehensive Class 11 problem linking c11_phy_cbse_02_003 with c11_phy_cbse_02_004 (acceleration = -g) and energy concepts.
ANSWER: (a) \( v(t) = 25 - 10t \) m/s, (b) t = 2.5 s, height = 51.25 m (31.25 m above launch), (c) 17.7 m/s (at both times), (d) velocity = -32.0 m/s, speed = 32.0 m/s

## COMPETENCY_QUESTION_1
QUESTION: A particle's position is given by \( x(t) = t^3 - 6t^2 + 9t \) (x in m, t in s). At \( t = 1 \) s and \( t = 3 \) s, the instantaneous velocity is zero. A student argues: "Since velocity is zero at both instants, the particle is at rest at both times, so its acceleration must also be zero at both times." Evaluate this reasoning. Calculate the acceleration at \( t = 1 \) s and \( t = 3 \) s, and explain the physical difference between the two instants.
COMPETENCY: Interpreting physical situations using formulas and calculus; distinguishing between velocity and acceleration at an instant.
STEPS:
- Step 1: Find velocity function by differentiating \( x(t) \): \( v(t) = 3t^2 - 12t + 9 \).
- Step 2: Verify \( v(1) = 3 - 12 + 9 = 0 \) and \( v(3) = 27 - 36 + 9 = 0 \). The student is correct about velocity.
- Step 3: Find acceleration function: \( a(t) = \frac{dv}{dt} = 6t - 12 \).
- Step 4: Calculate \( a(1) = 6(1) - 12 = -6 \) m/s². Calculate \( a(3) = 6(3) - 12 = +6 \) m/s².
- Step 5: Interpret: At \( t = 1 \) s, \( v = 0 \), \( a = -6 \) m/s². The particle is momentarily at rest but accelerating in the -x direction — it will start moving in the -x direction. At \( t = 3 \) s, \( v = 0 \), \( a = +6 \) m/s² — it will start moving in the +x direction. These are turning points of the motion.
- Step 6: The student's error: confusing "velocity is zero" with "velocity is constant". Zero velocity does not imply zero acceleration. Acceleration is the rate of change of velocity; if velocity is changing (crossing zero), acceleration is non-zero.
ANSWER: Acceleration at t=1 s is -6 m/s²; at t=3 s is +6 m/s². The particle reverses direction at both instants but in opposite senses. The student's reasoning is incorrect — zero velocity does not imply zero acceleration.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two cars A and B move along a straight road. Car A's position: \( x_A(t) = 2t^2 \) m. Car B's position: \( x_B(t) = 20t - 50 \) m. (a) Find the time(s) when they have the same instantaneous velocity. (b) At that instant, which car is ahead? (c) A traffic camera at \( x = 50 \) m records the speed of each car as it passes. Find the speed recorded for each car. (d) If the speed limit is 60 km/h, which car(s) exceed the limit at the camera?
COMPETENCY: Multi-concept application: instantaneous velocity from derivatives, solving equations, unit conversion, physical interpretation of position and velocity.
STEPS:
- Step 1: Find instantaneous velocities: \( v_A(t) = \frac{dx_A}{dt} = 4t \) m/s. \( v_B(t) = \frac{dx_B}{dt} = 20 \) m/s (constant velocity).
- Step 2: Set equal: \( 4t = 20 \) → \( t = 5 \) s. At t = 5 s, both have instantaneous velocity 20 m/s.
- Step 3: Positions at t = 5 s: \( x_A(5) = 2(25) = 50 \) m. \( x_B(5) = 20(5) - 50 = 50 \) m. They are at the same position (50 m) — they meet at this instant!
- Step 4: Speed at camera (x = 50 m): Car A reaches x=50 at t=5 s (from above). Speed = |v_A(5)| = 20 m/s. Car B reaches x=50 at t=5 s. Speed = |v_B| = 20 m/s (constant).
- Step 5: Convert speed limit: 60 km/h = \( 60 \times \frac{1000}{3600} = \frac{50}{3} \approx 16.67 \) m/s.
- Step 6: Compare: 20 m/s > 16.67 m/s. Both cars exceed the speed limit at the camera.
- Step 7: Physical insight: Car A accelerates from rest (v=0 at t=0), car B moves at constant 20 m/s. They meet at x=50 m, t=5 s. At that exact moment, their velocities are equal (20 m/s). The camera catches both speeding.
ANSWER: (a) t = 5 s, (b) They are at the same position (50 m), (c) Both record 20 m/s, (d) Both exceed the 60 km/h (16.67 m/s) limit.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Instantaneous speed is the ______ of instantaneous velocity, always non-negative, with the same SI unit (m/s).

## DIAGNOSTIC_ANSWER_7
magnitude

**A wrong answer ("direction" or "average") reveals the student has swapped the definition's noun - instantaneous speed is the magnitude of instantaneous velocity.** Magnitude is the definition's own noun, and the noun is what the blank grades. Recall the non-negative rule before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are riding a bicycle on a ______ road from your home to school.

## DIAGNOSTIC_ANSWER_8
straight

**A wrong answer ("busy" or "winding") reveals the student has swapped the walkthrough's adjective - the bicycle rides a straight road.** Straight is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the speedometer readings before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_9
What is Instantaneous velocity? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Instantaneous speed is the magnitude of instantaneous velocity, always non-negative, with the same SI unit (m/s).

**A wrong answer (defining velocity when asked for speed) reveals the student has swapped the headwords.** The lesson's own sentence: instantaneous speed is the magnitude of instantaneous velocity, always non-negative, with the same SI unit - magnitude is the operating word.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Instantaneous velocity?

## DIAGNOSTIC_ANSWER_10
This misconception persists because Class 10 only dealt with average quantities; the concept of a limit is new.

**A wrong answer (treating instantaneous as a fast average) reveals the student is missing the limit idea - the flagged gap from Class 10.** The instant is not a small interval but a limiting one: the chord's slope approaches the tangent's as the interval dies.
