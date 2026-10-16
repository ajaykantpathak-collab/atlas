## ELI5
Feather and coin, dropped together in a vacuum tube, land together - even on the Moon, where Apollo 15 proved it hammer against feather. Free fall is motion under gravity alone: acceleration fixed at g, about 9.8 m/s² near the surface (10 for quick estimates), independent of mass. Choose upward as positive and the kinematic equations carry a minus: v = u - gt and its siblings; the sign of g belongs to the axis you pick.

## DEFINITION
Free fall is the motion of an object under the influence of gravitational force only, with air resistance neglected, where the acceleration is constant and directed vertically downward with magnitude \( g = 9.8 \, \text{m/s}^2 \) (or \( 10 \, \text{m/s}^2 \) for approximation) near Earth's surface. The kinematic equations for uniformly accelerated motion apply with acceleration \( a = -g \) when the upward direction is chosen as positive.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently set up and solve free-fall problems by choosing a sign convention, identifying known/unknown variables, selecting the appropriate kinematic equation, and interpreting the physical meaning of negative signs in displacement, velocity, and acceleration. They can also explain why the time of ascent equals the time of descent for a projectile thrown vertically upward from and returning to the same height.

## SCOPE_BOUNDARY
This node covers vertical motion under constant gravitational acceleration only (free fall and vertical projection). It does NOT cover projectile motion at an angle (Chapter 4), motion with air resistance, variation of g with altitude, or orbital mechanics. All problems assume g is constant and air resistance is negligible.

## WALKTHROUGH
Observe a feather and a coin dropped simultaneously in a vacuum tube (or watch a video of Apollo 15 hammer-feather drop on the Moon) – they hit the ground together, proving acceleration is independent of mass. Begin by asking: "If we drop a ball from rest, how does its velocity change every second?" Guide students to recognize that velocity increases by 9.8 m/s each second downward. Connect this to the kinematic equations from node c11_phy_cbse_02_005 by substituting \( a = -g \) (upward positive). Emphasize that the sign of g depends entirely on the chosen coordinate system. End with the three key free-fall equations: \( v = u - gt \), \( y = ut - \frac{1}{2}gt^2 \), and \( v^2 = u^2 - 2gy \).

Takeaway: mastery means setting the sign convention first, selecting the equation by the missing variable, and reading negative answers as direction, not error. Exam moves: free-fall numericals and ascent-equals-descent items. Check yourself: a ball thrown up and caught returns with the same speed - the symmetry is the descent undoing the ascent under the same g. Students miss it because they fear the minus signs, when the definition hands the rule: pick the axis, keep every sign consistent, and the algebra reports the physics without complaint.

## DIAGNOSTIC_QUESTION_1
A ball is dropped from rest from a height of 20 m. What is the magnitude and direction of its acceleration at the instant it is released? State the SI unit.

## DIAGNOSTIC_ANSWER_1
The acceleration is \( 9.8 \, \text{m/s}^2 \) vertically downward. A wrong answer (e.g., "zero" or "upward") reveals the student confuses initial velocity (zero) with acceleration, or thinks acceleration requires initial motion. They may also incorrectly believe a stationary object has zero acceleration.

## DIAGNOSTIC_QUESTION_2
A student throws a ball vertically upward with initial speed 20 m/s. At the highest point of its motion, the ball's velocity is zero. Is the acceleration zero at that instant? Explain why or why not using the concept of force.

## DIAGNOSTIC_ANSWER_2
No, acceleration is not zero; it is \( 9.8 \, \text{m/s}^2 \) downward. The gravitational force \( mg \) still acts on the ball, so by Newton's second law \( a = F/m = g \) downward. A wrong answer ("acceleration is zero because velocity is zero") reveals the misconception that acceleration and velocity must have the same value or that zero velocity implies zero net force.

## DIAGNOSTIC_QUESTION_3
A stone is thrown vertically upward from the top of a 40 m high building with an initial velocity of 15 m/s. Take \( g = 10 \, \text{m/s}^2 \) and upward as positive. Calculate (a) the maximum height reached above the ground, and (b) the time taken to hit the ground.

## DIAGNOSTIC_ANSWER_3
(a) At max height, \( v = 0 \). Using \( v^2 = u^2 - 2g(y - y_0) \): \( 0 = 15^2 - 2(10)(y - 40) \) → \( y - 40 = 11.25 \) → \( y = 51.25 \, \text{m} \) above ground.
(b) Use \( y = y_0 + ut - \frac{1}{2}gt^2 \) with \( y = 0 \) (ground): \( 0 = 40 + 15t - 5t^2 \) → \( 5t^2 - 15t - 40 = 0 \) → \( t^2 - 3t - 8 = 0 \). Solving: \( t = \frac{3 \pm \sqrt{9 + 32}}{2} = \frac{3 \pm \sqrt{41}}{2} \). Positive root: \( t \approx 4.7 \, \text{s} \).
A wrong answer often comes from sign errors in the quadratic equation or forgetting to add the building height to the displacement.

## DIAGNOSTIC_QUESTION_4
Two balls are dropped from the same height at 1-second intervals. Ball A is dropped at \( t = 0 \), Ball B at \( t = 1 \, \text{s} \). Sketch the velocity-time graph for both balls from \( t = 0 \) to \( t = 3 \, \text{s} \) on the same axes. Explain whether the separation between them increases, decreases, or stays constant.

## DIAGNOSTIC_ANSWER_4
Both graphs are straight lines with slope \( -g \) (if upward positive) starting at different times. Ball A: \( v = -gt \) from \( t = 0 \). Ball B: \( v = 0 \) for \( t < 1 \), then \( v = -g(t-1) \) for \( t \ge 1 \). The separation increases because Ball A always has a greater downward speed than Ball B (by \( g \times 1 \, \text{s} = 9.8 \, \text{m/s} \)), so the distance between them grows. A wrong answer (constant separation) reveals the student thinks equal acceleration means equal velocity, confusing acceleration with velocity difference.

## DIAGNOSTIC_QUESTION_5
A student solves a free-fall problem: "A ball is thrown upward at 25 m/s. Find the time to reach maximum height." They write: \( v = u + gt \), \( 0 = 25 + 9.8t \), \( t = -2.55 \, \text{s} \). They say "time cannot be negative, so the answer is 2.55 s." Evaluate this solution. Is the final answer correct? Is the method correct?

## DIAGNOSTIC_ANSWER_5
The final answer (2.55 s) is numerically correct but the method is flawed. The equation \( v = u + gt \) uses \( g \) as a positive magnitude, but the sign convention is inconsistent. If upward is positive, acceleration is \( -g \), so the correct equation is \( v = u - gt \) → \( 0 = 25 - 9.8t \) → \( t = 2.55 \, \text{s} \). The student's method ignores the vector nature of acceleration and gets the right number for the wrong reason. This reveals a lack of understanding of sign conventions in vector equations.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using only a smartphone, a ruler, and a small heavy object (like a metal nut) to measure the value of \( g \) to within 5% accuracy. Describe the procedure, measurements needed, and the calculation. Identify the main source of error.

## DIAGNOSTIC_ANSWER_6
Procedure: Use the smartphone's slow-motion video (e.g., 240 fps) to record the nut falling from a known height \( h \) (measured with ruler). Count frames \( n \) from release to impact. Time \( t = n / \text{fps} \). Calculate \( g = 2h/t^2 \). Repeat 5 times and average. Main error: air resistance (minimal for heavy nut) and frame-counting uncertainty. A poor answer (e.g., "use stopwatch by hand") reveals inability to design a precise measurement using available tools and ignorance of human reaction time error (~0.2 s).

## COMMON_MISCONCEPTION
Students believe that "heavier objects fall faster" because they confuse gravitational force (\( mg \)) with acceleration (\( g \)). They reason: "More mass → more force → more acceleration," forgetting Newton's second law \( a = F/m = mg/m = g \). For example, when asked "Which hits the ground first: a 1 kg iron ball or a 10 kg iron ball dropped from the same height?" many answer the 10 kg ball, not realizing both have identical acceleration \( g \) in vacuum. This persists even after learning \( F = ma \) because they don't apply it to free fall.

## ON_FAILURE
1. Revisit node c9_physics_ch3_4 (Newton's Second Law: F = ma) and explicitly derive \( a = g \) for free fall: \( F_{\text{grav}} = mg \), so \( a = F/m = mg/m = g \).
2. Perform a thought experiment: "If two identical 1 kg balls fall side by side, they accelerate at g. Now glue them together mid-air – does the 2 kg combined ball suddenly accelerate faster? No, because nothing changed physically."
3. Watch the Apollo 15 hammer-feather drop video (feather and hammer hit Moon surface simultaneously) to visualize mass independence in vacuum.
4. Practice 5 numerical problems where mass is given but cancels out, reinforcing that mass does not appear in kinematic equations for free fall.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_02_005, c11_phy_cbse_02_004, c9_physics_ch2_8, c9_physics_ch3_4, c8_physics_ch3_11, c11_phy_cbse_02_003, c11_phy_cbse_02_006, c11_phy_cbse_02_007

## PREREQUISITE_REASONS
c11_phy_cbse_02_005: Provides the three kinematic equations for constant acceleration which are directly applied with a = -g.
c11_phy_cbse_02_004: Defines acceleration as rate of change of velocity, essential for understanding that g is an acceleration, not a force.
c9_physics_ch2_8: Derived equations of motion in Class 9; this node extends them to free fall with sign conventions.
c9_physics_ch3_4: Newton's second law (F = ma) explains why all masses have same acceleration g in free fall.
c8_physics_ch3_11: Introduced gravitational force as pull of Earth, establishing the cause of free fall acceleration.
c11_phy_cbse_02_003: Free fall is a primary application where \( x(t) \) is quadratic, \( v(t) \) is linear; finding instantaneous velocity at any height/time uses this node's methods.  
c11_phy_cbse_02_006: Free fall is a direct application of kinematic equations with \( a = g \).  
c11_phy_cbse_02_007: Free fall problems often involve two objects (e.g., two balls dropped at different times); relative velocity simplifies finding separation and collision time.  

## FORWARD_NODE_IDS
c11_phy_cbse_02_009, c11_phy_cbse_02_010, c11_phy_cbse_02_011
## FORWARD_REASONS
c11_phy_cbse_02_009: Stopping distance problems use \( v^2 = u^2 + 2as \) with deceleration; free fall mastery builds the sign-convention skill needed for braking problems.
c11_phy_cbse_02_010: Reaction time measurement uses free-fall of a ruler (Example 2.7 in NCERT); direct application of free-fall equations.
c11_phy_cbse_02_011: Word problems often combine free fall with relative velocity or multi-stage motion; this node provides the free-fall component.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_04_005, c10_math_cbse_04_006, c10_math_cbse_04_007, c9_math_ch1_4
## CROSS_SUBJECT_REASONS
c10_math_cbse_04_005: Quadratic formula derivation from completing the square is needed to solve \( \frac{1}{2}gt^2 - ut + h = 0 \) for time of flight.
c10_math_cbse_04_006: Direct application of quadratic formula \( t = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \) to find time when object hits ground.
c10_math_cbse_04_007: Discriminant analysis determines if/when object reaches a certain height (D > 0: two times, D = 0: max height, D < 0: never reaches).
c9_math_ch1_4: Distance formula via Pythagoras extends to 2D projectile motion (next chapter), but here it underpins the 1D displacement magnitude.

## CHAIN_DESCRIPTION
c9_physics_ch2_8 -> c11_phy_cbse_02_005 -> c11_phy_cbse_02_008 -> c11_phy_cbse_02_009

## THIS_FORMULA
\( v = u - gt \) (m/s); \( y = ut - \frac{1}{2}gt^2 \) (m); \( v^2 = u^2 - 2gy \) (m²/s²); where upward is positive, \( g = 9.8 \, \text{m/s}^2 \)

## FORMULA_VARIABLES
\( v \) = final velocity (m/s); \( u \) = initial velocity (m/s); \( g \) = acceleration due to gravity = 9.8 m/s² (magnitude); \( t \) = time (s); \( y \) = vertical displacement from start (m), positive upward

## FORMULA_UNITS
m/s, m/s², s, m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_04_005 | Quadratic formula solves time-of-flight equations like ½gt² - ut + h = 0 which arise when finding when a projectile hits the ground.
c10_math_cbse_04_007 | Discriminant D = u² - 2gh determines if a projected object reaches height h: D > 0 (reaches twice), D = 0 (max height), D < 0 (never reaches).
c9_math_ch1_4 | Distance formula √[(x₂-x₁)² + (y₂-y₁)²] reduces to |y₂-y₁| in 1D free fall, connecting coordinate geometry to displacement magnitude.

## PREREQ_CONCEPT
Newton's second law applied to gravitational force: \( a = F_{\text{grav}}/m = mg/m = g \), proving acceleration in free fall is independent of mass.

## PREREQ_BEFORE
Student must be able to write and use the three kinematic equations for constant acceleration (v = u + at, s = ut + ½at², v² = u² + 2as) with correct sign conventions for vector quantities.

## PREREQ_STUCK
If stuck, review c11_phy_cbse_02_005 (Kinematic Equations) and c9_physics_ch3_4 (Newton's Second Law) to see how mg force leads to g acceleration regardless of mass.

## WORKED_EXAMPLE_1
PROBLEM: A cricket ball is thrown vertically upward from a balcony 12 m above the ground with an initial speed of 18 m/s. Take g = 10 m/s² and upward as positive. Find (a) the maximum height above the ground reached by the ball, (b) the time taken to reach the maximum height, and (c) the velocity with which it hits the ground.
STEPS:
- Step 1: Identify given quantities: initial height y₀ = 12 m, initial velocity u = +18 m/s, acceleration a = -g = -10 m/s². Define upward as +y direction. Unknowns: y_max, t_up, v_ground.
- Step 2: For (a) maximum height, use v² = u² + 2a(y - y₀) with v = 0 at top. Substitute: 0 = (18)² + 2(-10)(y_max - 12).
- Step 3: Solve for y_max: 0 = 324 - 20(y_max - 12) → 20(y_max - 12) = 324 → y_max - 12 = 16.2 → y_max = 28.2 m above ground.
- Step 4: For (b) time to max height, use v = u + at with v = 0: 0 = 18 + (-10)t_up → t_up = 1.8 s.
- Step 5: For (c) velocity at ground, use v² = u² + 2a(y - y₀) with y = 0 (ground level): v² = (18)² + 2(-10)(0 - 12) = 324 + 240 = 564.
- Step 6: v = -√564 ≈ -23.75 m/s (negative sign indicates downward direction). Verify: speed at ground > initial speed, as expected from energy conservation.
REASONING: The sign convention (upward positive) makes acceleration negative throughout. At maximum height, velocity is momentarily zero but acceleration remains -g. The quadratic approach for time to ground would also work but using v² avoids sign ambiguity in the square root. The final velocity magnitude exceeds initial speed because the ball falls from a greater height (28.2 m) than the balcony (12 m).
ANSWER: (a) 28.2 m above ground, (b) 1.8 s, (c) 23.75 m/s downward (or -23.75 m/s)

## WORKED_EXAMPLE_2
PROBLEM: A helicopter is ascending vertically at a constant speed of 5 m/s. At a height of 80 m, a package is dropped from the helicopter. Take g = 10 m/s². Find (a) the time taken for the package to reach the ground, and (b) the velocity with which it hits the ground.
STEPS:
- Step 1: Identify initial conditions for the package: At the moment of release, the package has the same upward velocity as the helicopter: u = +5 m/s. Initial height y₀ = 80 m. Acceleration a = -g = -10 m/s². Upward is positive.
- Step 2: For (a) time to reach ground, use y = y₀ + ut + ½at² with y = 0 (ground): 0 = 80 + 5t + ½(-10)t² → 0 = 80 + 5t - 5t².
- Step 3: Rearrange into standard quadratic: 5t² - 5t - 80 = 0 → divide by 5: t² - t - 16 = 0.
- Step 4: Apply quadratic formula: t = [1 ± √(1 + 64)]/2 = [1 ± √65]/2. √65 ≈ 8.06. Positive root: t = (1 + 8.06)/2 = 4.53 s. (Negative root discarded as unphysical).
- Step 5: For (b) velocity at ground, use v = u + at: v = 5 + (-10)(4.53) = 5 - 45.3 = -40.3 m/s. The negative sign confirms downward direction.
- Step 6: Verify using v² = u² + 2a(y - y₀): v² = 25 + 2(-10)(-80) = 25 + 1600 = 1625. v = -√1625 ≈ -40.3 m/s. Consistent.
REASONING: The package initially continues upward due to its initial upward velocity (5 m/s) before falling down. This adds a small upward displacement before the descent, increasing total time compared to dropping from rest. The quadratic equation naturally captures both the upward and downward phases in one step. Sign convention is crucial: initial velocity positive, acceleration negative, displacement negative (final position below start).
ANSWER: (a) 4.53 s, (b) 40.3 m/s downward (or -40.3 m/s)

## WORKED_EXAMPLE_3
PROBLEM: Two stones are thrown simultaneously from the top of a 60 m high cliff. Stone A is thrown vertically upward at 20 m/s. Stone B is thrown vertically downward at 20 m/s. Take g = 10 m/s². Find (a) the time difference between their arrivals at the ground, and (b) the velocity of each stone when it hits the ground.
STEPS:
- Step 1: Set up coordinate system: Origin at ground level, upward positive. Cliff top at y₀ = +60 m. Stone A: u_A = +20 m/s. Stone B: u_B = -20 m/s. Both have a = -10 m/s².
- Step 2: For Stone A, use y = y₀ + u_A t + ½at² with y = 0: 0 = 60 + 20t - 5t² → 5t² - 20t - 60 = 0 → t² - 4t - 12 = 0.
- Step 3: Solve for t_A: t = [4 ± √(16 + 48)]/2 = [4 ± √64]/2 = [4 ± 8]/2. Positive root: t_A = 6 s. (Negative root t = -2 s discarded).
- Step 4: For Stone B: 0 = 60 + (-20)t - 5t² → 5t² + 20t - 60 = 0 → t² + 4t - 12 = 0. t = [-4 ± √(16 + 48)]/2 = [-4 ± 8]/2. Positive root: t_B = 2 s.
- Step 5: Time difference = t_A - t_B = 6 - 2 = 4 s. Stone B hits first (thrown downward).
- Step 6: Velocity of Stone A at ground: v_A = u_A + at_A = 20 + (-10)(6) = -40 m/s (40 m/s downward).
- Step 7: Velocity of Stone B at ground: v_B = u_B + at_B = -20 + (-10)(2) = -40 m/s (40 m/s downward).
- Step 8: Verify with v² = u² + 2a(y - y₀): For A: v² = 400 + 2(-10)(-60) = 400 + 1200 = 1600 → v = -40 m/s. For B: v² = 400 + 2(-10)(-60) = 1600 → v = -40 m/s. Both hit with same speed (energy conservation: same initial kinetic + potential energy).
REASONING: Despite different initial directions, both stones have the same initial kinetic energy (½m(20)²) and same initial potential energy (mg×60). By conservation of energy, they must have the same final kinetic energy at ground level, hence same speed. Stone A takes longer because it goes up first (2 s to max height, then falls from 80 m), while Stone B goes straight down. The 4 s difference equals twice the time to max height for Stone A (2 × 2 s = 4 s).
ANSWER: (a) 4 s (Stone B hits first), (b) Both hit at 40 m/s downward (v = -40 m/s)

## COMPETENCY_QUESTION_1
QUESTION: A student stands on a bridge 25 m above a river and throws a stone vertically upward at 15 m/s. At the exact same instant, another student on the riverbank throws a stone vertically upward at 20 m/s from ground level. Take g = 10 m/s². Will the stones collide in mid-air? If yes, find the time and height of collision. If no, explain why not.
COMPETENCY: Interpreting physical situations using formulas and solving multi-object kinematic problems
STEPS:
- Step 1: Set up coordinate system: Origin at ground (river level), upward positive. Stone 1 (from bridge): y₁₀ = 25 m, u₁ = +15 m/s. Stone 2 (from ground): y₂₀ = 0, u₂ = +20 m/s. Both have a = -10 m/s².
- Step 2: Write position equations: y₁(t) = 25 + 15t - 5t². y₂(t) = 0 + 20t - 5t².
- Step 3: For collision, y₁(t) = y₂(t) at same t > 0: 25 + 15t - 5t² = 20t - 5t².
- Step 4: Simplify: 25 + 15t = 20t → 25 = 5t → t = 5 s.
- Step 5: Check if both stones are still in air at t = 5 s. Stone 1: time to max height = u₁/g = 1.5 s. Time to fall from max height to ground: max height = 25 + (15²)/(2×10) = 25 + 11.25 = 36.25 m. Time to fall from 36.25 m: √(2×36.25/10) = √7.25 ≈ 2.69 s. Total time ≈ 1.5 + 2.69 = 4.19 s < 5 s. Stone 1 hits ground before 5 s.
- Step 6: Conclusion: No collision. Stone 1 hits the water at ~4.19 s, while the collision would have occurred at 5 s if both remained airborne.
ANSWER: No, the stones do not collide. Stone 1 hits the water at approximately 4.19 s, before the calculated collision time of 5 s.
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A hot-air balloon is rising vertically at a constant velocity of 4 m/s. When the balloon is at a height of 50 m, a sandbag is released from rest relative to the balloon. Take g = 10 m/s². (a) Find the maximum height reached by the sandbag above the ground. (b) Find the time taken for the sandbag to hit the ground. (c) A student claims: "Since the balloon is rising, the sandbag will initially rise further before falling." Evaluate this claim using physics principles.
COMPETENCY: Predicting outcomes from changing variables and evaluating physical reasoning
STEPS:
- Step 1: Identify initial conditions: At release, sandbag has same upward velocity as balloon: u = +4 m/s. Initial height y₀ = 50 m. Acceleration a = -10 m/s² (immediately after release, only gravity acts).
- Step 2: (a) Maximum height: v = 0 at top. Use v² = u² + 2a(y_max - y₀): 0 = 4² + 2(-10)(y_max - 50) → 16 = 20(y_max - 50) → y_max - 50 = 0.8 → y_max = 50.8 m.
- Step 3: (b) Time to ground: y = y₀ + ut + ½at² = 0 → 0 = 50 + 4t - 5t² → 5t² - 4t - 50 = 0. Quadratic formula: t = [4 ± √(16 + 1000)]/10 = [4 ± √1016]/10. √1016 ≈ 31.87. Positive root: t = (4 + 31.87)/10 = 3.587 s.
- Step 4: (c) Evaluate claim: The sandbag's initial velocity is +4 m/s (upward), so yes, it continues upward for a short time. Time to max height: t_up = u/g = 4/10 = 0.4 s. Extra height gained: Δy = ut - ½gt² = 4(0.4) - 5(0.16) = 1.6 - 0.8 = 0.8 m. So the claim is correct: the sandbag rises 0.8 m further before falling.
- Step 5: Physical reasoning: At the moment of release, the sandbag has inertia (Newton's first law) – it continues moving upward at 4 m/s. Gravity then decelerates it until v = 0 at 0.4 s, after which it accelerates downward. The balloon's upward motion only provides the initial velocity; once released, the sandbag is in free fall.
ANSWER: (a) 50.8 m, (b) 3.59 s, (c) The claim is correct. The sandbag rises an additional 0.8 m in 0.4 s before falling, because it retains the balloon's upward velocity at the instant of release.
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe a feather and a coin dropped ______ in a vacuum tube (or watch a video of Apollo 15 hammer-feather drop on the Moon) – they hit the ground together, proving acceleration is independent of mass.

## DIAGNOSTIC_ANSWER_7
simultaneously

**A wrong answer ("at once" or "side by side") reveals the student has paraphrased the walkthrough's adverb - the feather and coin are dropped simultaneously.** Simultaneously is the walkthrough's own adverb, and the adverb is what the blank grades. Recall the vacuum tube before filling, and give the adverb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a feather and a coin dropped simultaneously in a vacuum tube (or watch a video of Apollo ______ hammer-feather drop on the Moon) – they hit the ground together, proving acceleration is independent of mass.

## DIAGNOSTIC_ANSWER_8
15

**A wrong answer (11 or any other mission number) reveals the student has drifted from the walkthrough - the Moon demonstration is Apollo 15.** The 15 is the walkthrough's own mission figure. Recall the hammer-and-feather result before filling, and give the figure exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can independently set up and solve free-fall problems by choosing a sign convention, identifying known/unknown variables, selecting the appropriate kinematic equation, and interpreting the physical meaning of negative signs in displacement, velocity, and acceleration.
