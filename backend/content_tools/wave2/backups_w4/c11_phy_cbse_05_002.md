## ELI5
Stretch a spring balance slowly and the pull grows as you go - constant-force arithmetic is dead. For a changing force, work is the integral of F(x) over the path: chop the trip into slivers where the force is nearly constant, sum F times each sliver, and let the slivers shrink. The answer is the area under the force-distance curve - a rectangle for constants, curved country otherwise.

## DEFINITION
Work done by a variable force is the definite integral of the force component along the displacement over the path of motion: \( W = \int_{x_i}^{x_f} F(x) \, dx \), where \( F(x) \) is the magnitude of the force component in the direction of displacement as a function of position \( x \). Its SI unit is joule (J), equivalent to newton-metre (N·m). This calculates the total energy transferred when force magnitude or direction changes continuously during displacement.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can set up and evaluate the definite integral \( \int F(x) \, dx \) for a given variable force function \( F(x) \) over specified limits, interpret the result as the area under the \( F \)-\( x \) graph, and apply the work-energy theorem \( \Delta K = W \) to find final speed or kinetic energy.

## SCOPE_BOUNDARY
Covers one-dimensional variable forces where force is a function of position \( F(x) \) only; includes graphical interpretation (area under curve) and analytical integration. Does NOT cover variable forces dependent on time \( F(t) \), velocity \( F(v) \), or multi-dimensional path integrals requiring vector line integrals (those are beyond Class 11 scope).

## WALKTHROUGH
Observe a spring balance being stretched slowly: the force you apply increases steadily from zero to a maximum value. Unlike pushing a box with constant force, here the force *changes* with displacement. To find total work, we cannot simply multiply final force by distance. Instead, break the stretch into tiny steps \( \Delta x \) where force is nearly constant, compute \( F(x) \Delta x \) for each step, and sum them. As \( \Delta x \to 0 \), this sum becomes the integral \( \int F(x) \, dx \). This connects directly to the Class 9 concept of work as area under a force-displacement graph (rectangle for constant force, now a curve for variable force). The key formula emerges: \( W = \int_{x_i}^{x_f} F(x) \, dx \).

Takeaway: mastery means setting up the integral with honest limits, reading work as area under the F-x graph, and chaining to the work-energy theorem for speeds. Exam moves: integrate-the-force questions and area-under-graph items. Check yourself: the final force alone never settles the account - the flagged mix-up - only the whole journey's accumulation does. Students miss it because constant-force habits die hard, when the definition's machinery is built for change: the sliver-sum survives every force law, and the graph's area is its picture, signed below the axis.

## DIAGNOSTIC_QUESTION_1
State the mathematical expression for work done by a one-dimensional variable force \( F(x) \) when an object moves from position \( x_i \) to \( x_f \). Write the SI unit of the result.

## DIAGNOSTIC_ANSWER_1
The work done is \( W = \int_{x_i}^{x_f} F(x) \, dx \). The SI unit is joule (J). A wrong answer like \( W = F \cdot \Delta x \) (using only final force) reveals the student still treats variable force as constant. Writing unit as newton (N) instead of joule shows confusion between force and work dimensions.

## DIAGNOSTIC_QUESTION_2
A force \( F(x) = 3x^2 \) N acts on a block moving along the x-axis from \( x = 1 \) m to \( x = 3 \) m. Explain why we cannot calculate work as \( W = F(3) \times (3 - 1) \) and what physical quantity the integral \( \int_1^3 3x^2 \, dx \) actually represents.

## DIAGNOSTIC_ANSWER_2
We cannot use \( F(3) \times \Delta x \) because the force is not constant; it varies from 3 N at \( x=1 \) to 27 N at \( x=3 \). Using the final force overestimates the work. The integral represents the *exact* total work done, geometrically equal to the area under the \( F \)-\( x \) curve between \( x=1 \) and \( x=3 \). A student who says "the integral gives average force times distance" partially understands but misses that the integral *is* the limit of the Riemann sum, not an approximation.

## DIAGNOSTIC_QUESTION_3
A force \( F(x) = (5x + 2) \) N acts on a 2 kg block initially at rest at \( x = 0 \). Calculate the work done by this force as the block moves to \( x = 4 \) m, and find the block's speed at \( x = 4 \) m using the work-energy theorem.

## DIAGNOSTIC_ANSWER_3
Work done: \( W = \int_0^4 (5x + 2) \, dx = \left[ \frac{5x^2}{2} + 2x \right]_0^4 = \frac{5(16)}{2} + 8 = 40 + 8 = 48 \) J.
By work-energy theorem: \( W = \Delta K = \frac{1}{2} m v_f^2 - 0 \).
\( 48 = \frac{1}{2} \times 2 \times v_f^2 \Rightarrow v_f^2 = 48 \Rightarrow v_f = \sqrt{48} = 4\sqrt{3} \approx 6.93 \) m/s.
A student who forgets to integrate and uses \( F(4) \times 4 = 22 \times 4 = 88 \) J makes the constant-force error. A student who integrates correctly but writes \( v_f = 48 \) m/s forgets the \( \frac{1}{2}mv^2 \) formula.

## DIAGNOSTIC_QUESTION_4
The force-displacement graph for a variable force is a straight line passing through (0, 10 N) and (5 m, 0 N). Without performing integration, determine the work done from \( x = 0 \) to \( x = 5 \) m. Explain how the sign of work would change if the force values were negative (below the x-axis) for the same displacement.

## DIAGNOSTIC_ANSWER_4
The graph forms a right triangle with base 5 m and height 10 N. Work done = area = \( \frac{1}{2} \times 5 \times 10 = 25 \) J. If the force values are negative (graph below x-axis), the area is still 25 J but work done is \( -25 \) J because the force opposes displacement. A student who answers 25 J for the negative-force case without the minus sign fails to understand that work is a signed scalar; the integral \( \int F(x) \, dx \) automatically accounts for sign via the function's sign.

## DIAGNOSTIC_QUESTION_5
A student solves a problem: "Force \( F(x) = 4x^3 \) N acts from \( x = 1 \) m to \( x = 2 \) m. Work done = \( \int_1^2 4x^3 \, dx = [x^4]_1^2 = 16 - 1 = 15 \) J." Another student claims the answer should be 15 N. Evaluate both responses and identify the conceptual error in the second student's claim.

## DIAGNOSTIC_ANSWER_5
The first student is correct: the integration yields 15 J. The second student's claim of 15 N is dimensionally wrong; work/energy has units of joule (N·m), not newton. The error reveals confusion between force (N) and work (J). Even if the integral of force over distance gives a number, the *physical quantity* is work, so the unit must be joule. A student writing "15" without units makes an incomplete answer; writing "15 N" makes a conceptual error about dimensions.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a spring, a force sensor (or spring balance), and a ruler to verify that the work done in stretching a spring from \( x = 0 \) to \( x = x_0 \) equals \( \frac{1}{2} k x_0^2 \). Describe the measurements, the graph to plot, and how to calculate work from the graph.

## DIAGNOSTIC_ANSWER_6
Fix one end of a spring. Attach a force sensor to the free end. Stretch the spring slowly in small steps (e.g., 1 cm increments). At each extension \( x \), record the force \( F \) from the sensor. Plot \( F \) (y-axis) vs \( x \) (x-axis). The graph should be a straight line through origin (Hooke's law: \( F = kx \)). The work done is the area under this line from 0 to \( x_0 \): a triangle of area \( \frac{1}{2} \times x_0 \times (k x_0) = \frac{1}{2} k x_0^2 \). A poor answer might suggest measuring only final force and multiplying by \( x_0 \), or plotting force vs time instead of force vs displacement.

## COMMON_MISCONCEPTION
Students often treat variable force problems by plugging the *final* force value into \( W = F \cdot d \), ignoring that force changes continuously. For example, given \( F(x) = 2x \) from 0 to 3 m, they compute \( W = F(3) \times 3 = 6 \times 3 = 18 \) J instead of \( \int_0^3 2x \, dx = 9 \) J. They confuse the *instantaneous* force at the endpoint with the *average* force over the interval. This stems from over-reliance on the constant-force formula \( W = Fd \) and not recognizing that integration is the generalization of "force times distance" for non-constant forces.

## ON_FAILURE
1. Revisit the Riemann sum concept: divide displacement into 5-10 small intervals \( \Delta x \), compute \( F(x_i) \Delta x \) for each, sum them, and compare with the integral result. 2. Plot \( F(x) \) vs \( x \) on graph paper; shade the area under the curve and count squares to visually confirm the integral value. 3. Practice 3-4 problems where the force function is simple (linear, quadratic) and compute both the "wrong way" (final force × distance) and the "right way" (integration) to see the discrepancy. 4. Review Class 11 Maths integration techniques (power rule, definite integrals) if the calculus step itself is the blocker.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_001
## PREREQUISITE_REASONS
c11_phy_cbse_05_001: Defines work for constant force \( W = Fd \cos\theta \) and introduces the force-displacement graph area interpretation. This node generalizes that concept to variable forces using calculus.

## FORWARD_NODE_IDS
c11_phy_cbse_05_003, c11_phy_cbse_05_006, c11_phy_cbse_05_009, c12_phy_cbse_02_012, c12_phy_cbse_04_004, c12_phy_cbse_06_006

## FORWARD_REASONS
c11_phy_cbse_05_003: Spring force \( F = -kx \) is the primary example of a variable force; its work calculation \( \int -kx \, dx = -\frac{1}{2}kx^2 \) directly applies the integral formula from this node.
c11_phy_cbse_05_006: The work-energy theorem for variable force \( \Delta K = \int F(x) \, dx \) is proved using the integration method developed here.
c11_phy_cbse_05_009: Need calculus-based work for variable forces to evaluate path integrals for conservative forces.  
c12_phy_cbse_02_012: Introduces integration for work done by a variable force, directly used in deriving \( U = \int (q/C)\,dq \).  
c12_phy_cbse_04_004: Integration of variable force (calculus) prepares for integrating dB over a current distribution.  
c12_phy_cbse_06_006: Explains integration for variable force; the back emf varies with \( dI/dt \), so work integral requires calculus.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_04_005, c10_math_cbse_02_007
## CROSS_SUBJECT_REASONS
c10_math_cbse_04_005: Quadratic formula and completing the square build algebraic manipulation skills needed to handle polynomial force functions like \( F(x) = ax^2 + bx + c \) before integration.
c10_math_cbse_02_007: Division algorithm for polynomials reinforces polynomial operations, essential when integrating polynomial force functions term-by-term.

## CHAIN_DESCRIPTION
c11_phy_cbse_05_001 -> c11_phy_cbse_05_002 -> c11_phy_cbse_05_003, c11_phy_cbse_05_006

## THIS_FORMULA
\( W = \int_{x_i}^{x_f} F(x) \, dx \) (J)

## FORMULA_VARIABLES
\( W \) = work done (J), \( F(x) \) = variable force component in direction of displacement as function of position (N), \( x_i \) = initial position (m), \( x_f \) = final position (m), \( dx \) = infinitesimal displacement (m)

## FORMULA_UNITS
J, N, m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch07_001: Integration as limit of sum (Riemann integral) provides the mathematical foundation for \( \int F(x) \, dx \).
c11_math_ch07_002: Fundamental Theorem of Calculus connects definite integral to antiderivative, enabling evaluation of work integrals analytically.

## PREREQ_CONCEPT
Work done by a constant force \( W = Fd \cos\theta \) and its graphical interpretation as rectangular area under \( F \)-\( x \) graph.

## PREREQ_BEFORE
Student must be able to compute definite integrals of polynomial functions (power rule) and understand the geometric meaning of a definite integral as signed area under a curve.

## PREREQ_STUCK
Review definite integration of polynomials from Class 11 Maths (Chapter 7: Integrals) and the force-displacement graph area concept from node c11_phy_cbse_05_001.

## WORKED_EXAMPLE_1
PROBLEM: A force \( F(x) = (3x^2 - 4x + 5) \) N acts on a particle moving along the x-axis. Calculate the work done by this force as the particle moves from \( x = 1 \) m to \( x = 4 \) m.
STEPS:
- Step 1: Identify given: \( F(x) = 3x^2 - 4x + 5 \) N, \( x_i = 1 \) m, \( x_f = 4 \) m. Find: \( W \) in joules.
- Step 2: Write the work integral: \( W = \int_{1}^{4} (3x^2 - 4x + 5) \, dx \). Check units: integrand is N, \( dx \) is m, so result is N·m = J.
- Step 3: Find antiderivative term-by-term: \( \int 3x^2 \, dx = x^3 \), \( \int -4x \, dx = -2x^2 \), \( \int 5 \, dx = 5x \). So \( \int F(x) \, dx = x^3 - 2x^2 + 5x \).
- Step 4: Evaluate definite integral: \( W = [x^3 - 2x^2 + 5x]_{1}^{4} = (64 - 32 + 20) - (1 - 2 + 5) = 52 - 4 = 48 \) J.
- Step 5: Verify: The force is positive throughout [1, 4] (check: \( F(1)=4 \), \( F(4)=37 \)), so work should be positive. 48 J is reasonable for a force averaging ~20 N over 3 m.
REASONING: The integral sums the infinitesimal work \( F(x)dx \) over each tiny displacement. Since \( F(x) \) is a polynomial, we integrate term-by-term using the power rule. The definite integral automatically accounts for the varying force magnitude at each position.
ANSWER: 48 J

## WORKED_EXAMPLE_2
PROBLEM: A 0.5 kg block slides on a frictionless horizontal surface. A variable force \( F(x) = 6x \) N acts on it, where \( x \) is in metres. The block starts from rest at \( x = 0 \). Find its speed at \( x = 2 \) m.
STEPS:
- Step 1: Given: \( m = 0.5 \) kg, \( F(x) = 6x \) N, \( v_i = 0 \) at \( x_i = 0 \), find \( v_f \) at \( x_f = 2 \) m.
- Step 2: Compute work done by variable force: \( W = \int_{0}^{2} 6x \, dx = [3x^2]_{0}^{2} = 3(4) - 0 = 12 \) J.
- Step 3: Apply work-energy theorem: \( W = \Delta K = \frac{1}{2} m v_f^2 - \frac{1}{2} m v_i^2 \). Since \( v_i = 0 \), \( 12 = \frac{1}{2} (0.5) v_f^2 \).
- Step 4: Solve for \( v_f \): \( 12 = 0.25 v_f^2 \Rightarrow v_f^2 = 48 \Rightarrow v_f = \sqrt{48} = 4\sqrt{3} \approx 6.93 \) m/s.
- Step 5: Check units and reasonableness: Work in J, mass in kg, speed in m/s. Force increases from 0 to 12 N over 2 m; average force ~6 N, work ~12 J, kinetic energy ~12 J for 0.5 kg gives ~7 m/s. Consistent.
REASONING: This combines the variable-force work integral with the work-energy theorem. The force is not constant, so we must integrate to find total work, which equals the change in kinetic energy. The initial kinetic energy is zero, so all work goes into final kinetic energy.
ANSWER: \( 4\sqrt{3} \) m/s ≈ 6.93 m/s

## WORKED_EXAMPLE_3
PROBLEM: A 2 kg particle moves along the x-axis under a force \( F(x) = 10 - 2x \) N. At \( x = 0 \), its velocity is 3 m/s in the +x direction. Find (a) the work done by the force from \( x = 0 \) to \( x = 6 \) m, (b) the velocity at \( x = 6 \) m, and (c) the position where the particle momentarily comes to rest (if it does).
STEPS:
- Step 1: Given: \( m = 2 \) kg, \( F(x) = 10 - 2x \) N, \( v(0) = 3 \) m/s. Find: (a) \( W_{0 \to 6} \), (b) \( v(6) \), (c) \( x \) where \( v = 0 \).
- Step 2: (a) Work integral: \( W = \int_{0}^{6} (10 - 2x) \, dx = [10x - x^2]_{0}^{6} = (60 - 36) - 0 = 24 \) J.
- Step 3: (b) Initial KE: \( K_i = \frac{1}{2} (2) (3)^2 = 9 \) J. Work-energy: \( K_f = K_i + W = 9 + 24 = 33 \) J. So \( \frac{1}{2} (2) v_f^2 = 33 \Rightarrow v_f^2 = 33 \Rightarrow v_f = \sqrt{33} \approx 5.74 \) m/s (positive, still moving forward).
- Step 4: (c) Particle stops when \( K = 0 \). Total work needed to stop: \( W_{stop} = -K_i = -9 \) J. Set \( \int_{0}^{x_s} (10 - 2x) \, dx = -9 \). \( [10x - x^2]_{0}^{x_s} = 10x_s - x_s^2 = -9 \).
- Step 5: Solve quadratic: \( x_s^2 - 10x_s - 9 = 0 \Rightarrow x_s = \frac{10 \pm \sqrt{100 + 36}}{2} = \frac{10 \pm \sqrt{136}}{2} = 5 \pm \sqrt{34} \). Positive root: \( 5 + \sqrt{34} \approx 10.83 \) m. (The negative root is unphysical as particle moves forward initially).
- Step 6: Verify: Force becomes zero at \( x = 5 \) m, negative after. Particle slows after \( x = 5 \) m, stops at ~10.83 m. Consistent.
REASONING: This problem requires applying the work integral, then the work-energy theorem twice: first to find velocity at a given position, then to find the position where kinetic energy becomes zero. The force changes sign at \( x = 5 \) m, so work done is positive up to 5 m, then negative. The total work from 0 to 6 m is still positive (24 J) because the positive work from 0 to 5 m outweighs the negative work from 5 to 6 m.
ANSWER: (a) 24 J, (b) \( \sqrt{33} \) m/s ≈ 5.74 m/s, (c) \( 5 + \sqrt{34} \) m ≈ 10.83 m

## COMPETENCY_QUESTION_1
QUESTION: A force \( F(x) = \frac{10}{(x+1)^2} \) N acts on a particle moving along the x-axis from \( x = 0 \) to \( x = 4 \) m. The particle has mass 1 kg and initial speed 2 m/s at \( x = 0 \). Without performing the integration, explain whether the work done will be positive, negative, or zero. Then calculate the exact work done and the final speed of the particle.
COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables
STEPS:
- Step 1: Analyze the force function: \( F(x) = \frac{10}{(x+1)^2} \). For all \( x \geq 0 \), denominator is positive, so \( F(x) > 0 \). Force is in +x direction, displacement is in +x direction. Work must be positive.
- Step 2: Set up integral: \( W = \int_{0}^{4} \frac{10}{(x+1)^2} \, dx \).
- Step 3: Integrate: Let \( u = x+1 \), \( du = dx \). Limits: \( u(0)=1 \), \( u(4)=5 \). \( W = \int_{1}^{5} 10 u^{-2} \, du = 10 \left[ \frac{u^{-1}}{-1} \right]_{1}^{5} = -10 \left( \frac{1}{5} - 1 \right) = -10 \left( -\frac{4}{5} \right) = 8 \) J.
- Step 4: Apply work-energy theorem: \( W = \Delta K = \frac{1}{2} m v_f^2 - \frac{1}{2} m v_i^2 \). \( 8 = \frac{1}{2}(1)v_f^2 - \frac{1}{2}(1)(4) \Rightarrow 8 = 0.5 v_f^2 - 2 \Rightarrow 0.5 v_f^2 = 10 \Rightarrow v_f^2 = 20 \Rightarrow v_f = \sqrt{20} = 2\sqrt{5} \approx 4.47 \) m/s.
- Step 5: Interpret: Force decreases with distance but remains positive, so work is positive and speed increases from 2 to 4.47 m/s.
ANSWER: Work done = 8 J (positive). Final speed = \( 2\sqrt{5} \) m/s ≈ 4.47 m/s.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A 1.5 kg block is attached to a horizontal spring (spring constant \( k = 200 \) N/m) fixed at one end. The block is pulled to stretch the spring by 0.1 m and released from rest on a frictionless surface. At the instant the block passes through the equilibrium position (\( x = 0 \)), a variable external force \( F_{\text{ext}}(x) = 50x \) N (where \( x \) is displacement from equilibrium) begins to act in the +x direction. Find the maximum displacement \( x_{\text{max}} \) reached by the block on the +x side. (Hint: Use work-energy theorem from \( x = 0 \) to \( x = x_{\text{max}} \), accounting for both spring force and external force.)
COMPETENCY: Combining multiple physics concepts (spring force, variable external force, work-energy theorem) to solve a multi-step problem
STEPS:
- Step 1: At \( x = 0 \), spring is unstretched. Block has KE from initial release. Initial spring PE = \( \frac{1}{2} k (0.1)^2 = 0.5 \times 200 \times 0.01 = 1 \) J. This converts entirely to KE at \( x = 0 \): \( K_0 = 1 \) J.
- Step 2: From \( x = 0 \) to \( x = x_{\text{max}} \), two forces act: spring force \( F_s = -kx = -200x \) N (restoring) and external force \( F_{\text{ext}} = 50x \) N (in +x direction). Net force \( F_{\text{net}} = (50x - 200x) = -150x \) N.
- Step 3: Work done by net force from 0 to \( x_{\text{max}} \): \( W_{\text{net}} = \int_{0}^{x_{\text{max}}} (-150x) \, dx = -150 \left[ \frac{x^2}{2} \right]_{0}^{x_{\text{max}}} = -75 x_{\text{max}}^2 \).
- Step 4: At \( x_{\text{max}} \), block momentarily stops, so \( K_{\text{max}} = 0 \). Work-energy: \( W_{\text{net}} = \Delta K = 0 - K_0 = -1 \) J.
- Step 5: Equate: \( -75 x_{\text{max}}^2 = -1 \Rightarrow x_{\text{max}}^2 = \frac{1}{75} \Rightarrow x_{\text{max}} = \frac{1}{\sqrt{75}} = \frac{1}{5\sqrt{3}} \approx 0.115 \) m.
- Step 6: Check: Without external force, max displacement would be 0.1 m (amplitude). External force \( 50x \) opposes the spring's restoring force partially (net restoring force constant reduced from 200 to 150 N/m), so amplitude increases slightly to ~0.115 m. Reasonable.
ANSWER: \( \frac{1}{5\sqrt{3}} \) m ≈ 0.115 m
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Its SI unit is joule (J), ______ to newton-metre (N·m).

## DIAGNOSTIC_ANSWER_7
equivalent

**A wrong answer ("equal" or "similar") reveals the student has paraphrased the definition's adjective - the joule is equivalent to the newton-metre.** Equivalent is the definition's own adjective, and the adjective is what the blank grades. Recall the SI-unit pairing before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a spring balance being ______ slowly: the force you apply increases steadily from zero to a maximum value.

## DIAGNOSTIC_ANSWER_8
stretched

**A wrong answer ("pushed" or "pulled") reveals the student has paraphrased the walkthrough's participle - the spring balance is being stretched slowly.** Stretched is the walkthrough's own participle, and the participle is what the blank grades. Recall the steadily rising force before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_9
What is Work done by a variable force? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Its SI unit is joule (J), equivalent to newton-metre (N·m).

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: its SI unit is joule (J), equivalent to newton-metre (N·m) - and the full concept is work as the definite integral of the force component along the displacement.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Work done by a variable force?

## DIAGNOSTIC_ANSWER_10
They confuse the *instantaneous* force at the endpoint with the *average* force over the interval.

**A wrong answer (using the endpoint force throughout) reveals the student holds the flagged mix-up.** The instantaneous endpoint value and the journey average differ - only the accumulated area under F(x) carries the true work, which is why the integral exists.
