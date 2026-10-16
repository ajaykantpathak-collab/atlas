## ELI5
Click a pen, release a door closer - the spring's bite grows with every millimetre. Its force is F = -kx, always homing toward equilibrium, so its work is the signed area of a triangle-topped graph: W = ½k(x_i² - x_f²). Stretch it and the spring does negative work; let it return and the stored effort pays back positive, to the exact joule.

## DEFINITION
The work done by a spring force is the negative of the change in elastic potential energy stored in the spring, calculated as the integral of the variable restoring force \(F_s = -kx\) over the displacement from initial position \(x_i\) to final position \(x_f\). It is a scalar quantity measured in joules (J), given by \(W_s = \frac{1}{2}k(x_i^2 - x_f^2)\), where \(k\) is the spring constant (N/m) and \(x\) is displacement from the equilibrium position. The negative sign indicates the spring force always opposes the displacement, doing negative work when the spring is stretched or compressed from equilibrium, and positive work when returning toward equilibrium.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate the work done by a spring force for any given initial and final displacements using both the integral formula and the area-under-graph method, correctly handling the sign convention. The student can also determine the spring constant from a force-displacement graph and use it to compute work done in a multi-step problem involving a block-spring system on a rough surface.

## SCOPE_BOUNDARY
This node covers work done by an ideal massless spring obeying Hooke's law (\(F = -kx\)) in one dimension, including both extension and compression from equilibrium. It does NOT cover non-Hookean springs, springs with mass, three-dimensional spring motion, or the work-energy theorem application (covered in c11_phy_cbse_05_006). The node focuses purely on the spring force work calculation, not the potential energy definition (covered in c11_phy_cbse_05_008).

## WALKTHROUGH
Observe a common door closer or a spring-loaded pen in your classroom — when you push the door or click the pen, you feel a resisting force that increases the more you compress the spring. This is Hooke's law in action: the spring force is not constant but grows linearly with displacement. To find the work done by this variable force, we cannot use \(W = Fd\) directly; we must integrate. Start by drawing the \(F\) vs \(x\) graph — a straight line through origin with slope \(-k\). The work done is the signed area under this line between \(x_i\) and \(x_f\), forming a trapezoid (or triangle if starting from equilibrium). This geometric approach connects directly to the calculus method taught in c11_phy_cbse_05_002. The key insight: the spring force always points toward equilibrium, so its work is negative when the block moves away from equilibrium and positive when moving toward it.

Takeaway: mastery means computing spring work by integral or by trapezoid area, keeping the sign honest, and extracting k from a force-displacement graph. Exam moves: spring-work numericals and find-the-constant items. Check yourself: the sign follows the direction home - away from equilibrium costs the spring's account, homing pays it back. Students miss it because they apply W = Fd with the final force, when the definition integrates the growing pull: the squared displacements in the formula are that accumulation, compressed into one line.

## DIAGNOSTIC_QUESTION_1
State the formula for work done by a spring force when a block attached to a spring moves from displacement \(x_i\) to \(x_f\). Define each symbol and its SI unit.

## DIAGNOSTIC_ANSWER_1
The work done by the spring force is \(W_s = \frac{1}{2}k(x_i^2 - x_f^2)\) joules (J), where \(k\) is the spring constant (N/m), \(x_i\) and \(x_f\) are initial and final displacements from equilibrium (m). A wrong answer like \(W_s = \frac{1}{2}k(x_f^2 - x_i^2)\) reveals the student has confused the work done BY the spring with the work done ON the spring (or the potential energy change), missing the crucial negative sign convention.

## DIAGNOSTIC_QUESTION_2
A spring with \(k = 200 \text{ N/m}\) is compressed from \(x = 0\) to \(x = -0.1 \text{ m}\). Is the work done by the spring force positive, negative, or zero? Explain using the direction of force and displacement.

## DIAGNOSTIC_ANSWER_2
The work done by the spring force is NEGATIVE. During compression, the displacement is in the negative x-direction, while the spring force \(F_s = -kx\) points in the positive x-direction (restoring toward equilibrium). Force and displacement are in opposite directions, so \(W = \int F \cdot dx < 0\). A student answering "positive" is likely confusing the work done BY the spring with the work done BY the external agent (which is positive), or incorrectly thinking "compression stores energy so work must be positive."

## DIAGNOSTIC_QUESTION_3
A 0.5 kg block is attached to a spring (\(k = 400 \text{ N/m}\)) on a frictionless horizontal surface. The block is pulled to \(x = +0.15 \text{ m}\) and released from rest. Calculate the work done by the spring force as the block moves from \(x = +0.15 \text{ m}\) to \(x = 0\). Show all steps with units.

## DIAGNOSTIC_ANSWER_3
Given: \(k = 400 \text{ N/m}\), \(x_i = +0.15 \text{ m}\), \(x_f = 0 \text{ m}\).
Step 1: Formula \(W_s = \frac{1}{2}k(x_i^2 - x_f^2)\).
Step 2: Substitute: \(W_s = \frac{1}{2}(400)[(0.15)^2 - 0^2] = 200 \times 0.0225\).
Step 3: Compute: \(W_s = +4.5 \text{ J}\).
Unit check: \(\text{N/m} \times \text{m}^2 = \text{N·m} = \text{J}\). ✓
The work is positive because the spring force (toward negative x) and displacement (toward negative x) are in the same direction as the block returns to equilibrium. A wrong sign indicates the student used \(x_f^2 - x_i^2\) or misunderstood the direction of force during return motion.

## DIAGNOSTIC_QUESTION_4
The force-displacement graph for a spring is a straight line passing through (0,0) and (0.2 m, -10 N). A block moves from \(x = 0.1 \text{ m}\) to \(x = 0.2 \text{ m}\). Determine the work done by the spring force using the graphical method. Compare with the formula method.

## DIAGNOSTIC_ANSWER_4
Graph: Slope = \(-10 / 0.2 = -50 \text{ N/m} = -k\), so \(k = 50 \text{ N/m}\).
Area under graph from 0.1 to 0.2 m is a trapezoid below x-axis (negative work).
\(F(0.1) = -5 \text{ N}\), \(F(0.2) = -10 \text{ N}\).
Area = \(\frac{1}{2}(5 + 10) \times 0.1 = -0.75 \text{ J}\) (negative because below axis).
Formula: \(W_s = \frac{1}{2}(50)[(0.1)^2 - (0.2)^2] = 25[0.01 - 0.04] = 25 \times (-0.03) = -0.75 \text{ J}\). Matches.
A student getting +0.75 J has taken the magnitude of area but ignored the sign convention (force and displacement both positive x-direction, but force is negative). This reveals confusion about signed area interpretation.

## DIAGNOSTIC_QUESTION_5
A student claims: "The work done by a spring force over a complete cycle (from \(x = +A\) to \(x = -A\) and back to \(x = +A\)) is zero, so the spring force is conservative. But if I calculate work from \(x = +A\) to \(x = -A\) directly using the formula, I get zero too. Does this mean the spring force does no work during half a cycle?" Evaluate this claim.

## DIAGNOSTIC_ANSWER_5
The claim is FALSE. Work from \(x = +A\) to \(x = -A\): \(W = \frac{1}{2}k[A^2 - (-A)^2] = 0\). This is correct mathematically but physically misleading. The spring force DOES work during this motion: negative work from \(+A\) to 0 (force opposite to displacement) and positive work from 0 to \(-A\) (force same direction as displacement). These two contributions cancel exactly. The student's error is equating "net work zero" with "no work done at each stage." This reveals a misunderstanding of the difference between total work over a path and work done during segments of that path. The spring force is conservative because the net work over ANY closed loop is zero, not because it does zero work during half-cycles.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a spring, a block, and a rough horizontal surface to verify that the work done by the spring force depends only on the initial and final positions, not the path taken. Describe the procedure, measurements needed, and how you would analyze the data.

## DIAGNOSTIC_ANSWER_6
Procedure: (1) Attach a spring (\(k\) known) to a block on a rough surface. (2) Pull block to \(x_i = +0.2 \text{ m}\) and release; measure stopping position \(x_f\) using a scale. (3) Repeat but this time push the block past equilibrium to \(x = -0.1 \text{ m}\) before letting it go (same initial \(x_i\), different path). (4) Measure final \(x_f\) again. (5) Calculate \(W_s = \frac{1}{2}k(x_i^2 - x_f^2)\) for both trials. (6) Also calculate work done by friction \(W_f = -\mu mg \times \text{total path length}\) (different for each path). (7) Use work-energy theorem: \(W_s + W_f = \Delta K = 0\) (starts and ends at rest). If \(W_s\) is same for both trials despite different path lengths (and different \(W_f\)), it confirms spring work is path-independent. A poor answer would ignore friction or fail to measure total path length, showing the student doesn't understand how to isolate the spring force work in a non-conservative system.

## COMMON_MISCONCEPTION
Students believe the work done by a spring force is always negative because "springs oppose motion." They fail to distinguish between stretching/compressing AWAY from equilibrium (where spring force opposes displacement → negative work) and moving TOWARD equilibrium (where spring force aids displacement → positive work). For example, when a block is released from \(x = +A\) and moves to \(x = 0\), the spring force is in the negative x-direction and so is the displacement — the work is POSITIVE (+½kA²). This error stems from memorizing "spring force is restoring" without analyzing the relative directions of force and displacement vectors during each phase of motion.

## ON_FAILURE
If a student insists spring work is always negative, guide them through this physical demonstration: (1) Hold a spring vertically with a mass attached at equilibrium. (2) Pull the mass down 5 cm and release — ask "As the mass moves UP toward equilibrium, is the spring force UP or DOWN? Is displacement UP or DOWN? Same direction → positive work." (3) Then ask "As the mass continues UP past equilibrium to the top, what happens to force and displacement directions? Opposite → negative work." (4) Have them calculate work for each segment using \(W = \frac{1}{2}k(x_i^2 - x_f^2)\) with actual numbers. (5) Finally, show the F-x graph: area above x-axis = positive work, below = negative work. This visual + kinesthetic approach resolves the sign confusion.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_001, c11_phy_cbse_05_002, c9_physics_ch4_1, c9_physics_ch4_6, c11_phy_cbse_05_005, c11_phy_cbse_05_006

## PREREQUISITE_REASONS
c11_phy_cbse_05_001: Provides the fundamental definition of work \(W = Fd\cos\theta\) and the concept of positive/negative work based on angle between force and displacement.
c11_phy_cbse_05_002: Introduces the calculus method for variable forces (\(W = \int F dx\)) and the graphical interpretation (area under F-x curve), which is essential for deriving the spring work formula.
c9_physics_ch4_1: Class 9 foundation of work definition \(W = Fs\) and conditions for zero/positive/negative work.
c9_physics_ch4_6: Class 9 introduction to potential energy concept, specifically elastic potential energy in springs, which motivates why spring force work is path-independent.
c11_phy_cbse_05_005: REASONING: This problem combines the spring work formula (this node) with the work-energy theorem (c11_phy_cbse_05_005) and energy conservation (c11_phy_cbse_05_010). The spring force does negative work during compression, reducing kinetic  
c11_phy_cbse_05_006: ings with mass, three-dimensional spring motion, or the work-energy theorem application (covered in c11_phy_cbse_05_006). The node focuses purely on the spring force work calculation, not the potential energy definition (covered in c11_phy_  

## FORWARD_NODE_IDS
c11_phy_cbse_05_008, c11_phy_cbse_05_009, c11_phy_cbse_05_010
## FORWARD_REASONS
c11_phy_cbse_05_008: Directly defines spring potential energy \(V(x) = \frac{1}{2}kx^2\) as the negative of work done by spring force, building on the work formula derived here.
c11_phy_cbse_05_009: Uses the spring force as the primary example of a conservative force (work depends only on endpoints, zero over closed loop) to define conservative vs non-conservative forces.
c11_phy_cbse_05_010: Applies conservation of mechanical energy to spring-block systems, requiring the spring work/potential energy relationship established in this node and the next.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_07_001, c11_math_cbse_07_002, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c11_math_ch07_001: Introduction to integrals as area under curve — the geometric basis for \(W = \int F dx\) used in spring work calculation.
c11_math_ch07_002: Definite integrals \(\int_a^b f(x)dx\) — the mathematical tool to compute work done by variable force \(F(x) = -kx\) between limits \(x_i\) and \(x_f\).
c10_math_cbse_07_001: Distance formula and coordinate geometry — provides the framework for describing 1D displacement along x-axis with sign conventions essential for spring problems.
c11_math_cbse_07_001: Cross-subject support: The Fundamental Principle of Counting (Multiplication Principle) states that if an event c... supplies tools/facts used directly in this node.  
c11_math_cbse_07_002: Cross-subject support: For any non-negative integer \(n\), the factorial notation \(n!\) (read as "n factorial")... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_05_001 -> c11_phy_cbse_05_002 -> c11_phy_cbse_05_003 -> c11_phy_cbse_05_008 -> c11_phy_cbse_05_010

## THIS_FORMULA
\(W_s = \int_{x_i}^{x_f} F_s dx = \int_{x_i}^{x_f} (-kx) dx = \frac{1}{2}k(x_i^2 - x_f^2)\) (J), where \(k\) = spring constant (N/m), \(x_i, x_f\) = initial/final displacement from equilibrium (m)

## FORMULA_VARIABLES
\(W_s\) = work done by spring force (J), \(k\) = spring constant (N/m), \(x_i\) = initial displacement from equilibrium (m), \(x_f\) = final displacement from equilibrium (m), \(F_s = -kx\) = spring restoring force (N), \(x\) = instantaneous displacement (m)

## FORMULA_UNITS
J (joule), N/m (newton per meter), m (meter), N (newton)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch07_001 | The definite integral \(\int_{x_i}^{x_f} (-kx) dx\) computes the signed area under the F-x graph, which is the work done by the variable spring force. This is the direct application of integral calculus to physics.
c11_math_ch07_002 | The fundamental theorem of calculus connects the antiderivative \(-\frac{1}{2}kx^2\) to the definite integral, yielding the work formula \(\frac{1}{2}k(x_i^2 - x_f^2)\). This shows why spring work depends only on endpoints.
c10_math_cbse_07_001 | The coordinate geometry concept of signed displacement along an axis (positive/negative x) is essential for correctly assigning signs to \(x_i\) and \(x_f\) in the work formula, especially when the block crosses the equilibrium position.

## PREREQ_CONCEPT
The student must understand that for a variable force, work is calculated as the definite integral of force over displacement (\(W = \int F dx\)), and that this equals the signed area under the force-displacement graph.

## PREREQ_BEFORE
The student should be able to: (1) state Hooke's law \(F = -kx\) and identify \(k\) from a graph, (2) compute the area of a triangle and trapezoid, (3) evaluate a simple definite integral \(\int x dx\), and (4) apply the sign convention for work based on force and displacement directions.

## PREREQ_STUCK
If stuck, revisit c11_phy_cbse_05_002 (Variable Force Using Calculus) for the integration method and graphical interpretation, and c11_phy_cbse_05_001 for the sign convention of work. Practice drawing F-x graphs for springs and identifying positive/negative areas.

## WORKED_EXAMPLE_1
PROBLEM: A spring-loaded toy gun has a spring constant \(k = 800 \text{ N/m}\). The spring is compressed by 5.0 cm from its equilibrium position to launch a 20 g plastic pellet. Calculate the work done by the spring force on the pellet as the spring expands from maximum compression to the equilibrium position. Assume the spring is massless and the pellet detaches at equilibrium.

STEPS:
- Step 1: Identify given quantities: \(k = 800 \text{ N/m}\), \(x_i = -0.050 \text{ m}\) (compression is negative displacement), \(x_f = 0 \text{ m}\) (equilibrium). Find: \(W_s\) (work by spring force).
- Step 2: Select formula: \(W_s = \frac{1}{2}k(x_i^2 - x_f^2)\). Check units: \(\text{N/m} \times \text{m}^2 = \text{N·m} = \text{J}\).
- Step 3: Substitute with units: \(W_s = \frac{1}{2}(800 \text{ N/m})[(-0.050 \text{ m})^2 - (0 \text{ m})^2]\).
- Step 4: Compute: \((-0.050)^2 = 0.0025 \text{ m}^2\). \(W_s = 400 \times 0.0025 = 1.0 \text{ J}\).
- Step 5: Verify: The spring force and displacement are both in the positive direction during expansion, so work should be positive. 1.0 J is reasonable for a toy gun spring. Answer: \(W_s = +1.0 \text{ J}\).

REASONING: The spring force \(F_s = -kx\) points toward equilibrium (positive x-direction when compressed). As the pellet moves from \(x_i = -0.05 \text{ m}\) to \(x_f = 0\), both force and displacement are positive, so the spring does positive work, converting stored elastic potential energy into kinetic energy of the pellet. The formula automatically handles the sign because \(x_i^2 > x_f^2\).

ANSWER: \(+1.0 \text{ J}\)

## WORKED_EXAMPLE_2
PROBLEM: A 2.0 kg block on a rough horizontal surface (\(\mu_k = 0.25\)) is attached to a spring (\(k = 500 \text{ N/m}\)). The block is pulled to \(x = +0.20 \text{ m}\) and released from rest. It passes through equilibrium and stops at \(x = -0.10 \text{ m}\). Calculate the work done by the spring force during this entire motion from \(x = +0.20 \text{ m}\) to \(x = -0.10 \text{ m}\).

STEPS:
- Step 1: Given: \(k = 500 \text{ N/m}\), \(x_i = +0.20 \text{ m}\), \(x_f = -0.10 \text{ m}\). Find: \(W_s\).
- Step 2: Formula: \(W_s = \frac{1}{2}k(x_i^2 - x_f^2)\). Note: This formula holds regardless of the path or other forces (friction) because spring force is conservative.
- Step 3: Substitute: \(W_s = \frac{1}{2}(500)[(0.20)^2 - (-0.10)^2] = 250[0.040 - 0.010]\).
- Step 4: Compute: \(W_s = 250 \times 0.030 = 7.5 \text{ J}\).
- Step 5: Interpret: The spring force does positive work overall (7.5 J) because the block ends closer to equilibrium than it started (\(|x_f| < |x_i|\)). The net displacement is toward equilibrium. Friction does negative work separately, but does not affect \(W_s\).
- Step 6: Verify with segments: From +0.20 to 0: \(W_1 = \frac{1}{2}(500)[0.04 - 0] = +10 \text{ J}\). From 0 to -0.10: \(W_2 = \frac{1}{2}(500)[0 - 0.01] = -2.5 \text{ J}\). Total = +7.5 J. Matches.

REASONING: The spring force work depends only on initial and final positions, not the path. Even though the block goes past equilibrium and friction acts, the spring work is computed directly from endpoints. The positive net work means the spring force transferred energy to the block overall, but friction dissipated more energy (block stops).

ANSWER: \(+7.5 \text{ J}\)

## WORKED_EXAMPLE_3
PROBLEM: A 1.5 kg block slides on a frictionless horizontal surface with speed \(v = 4.0 \text{ m/s}\) toward a spring (\(k = 600 \text{ N/m}\)) fixed at one end. The block hits the spring at its equilibrium position. (a) What is the maximum compression of the spring? (b) What is the work done by the spring force from first contact to maximum compression? (c) What is the block's speed when the spring is compressed by half the maximum amount?

STEPS:
- Step 1: (a) Use conservation of mechanical energy (no friction). Initial kinetic energy = maximum spring potential energy. \(\frac{1}{2}mv^2 = \frac{1}{2}kx_{\text{max}}^2\).
- Step 2: Solve for \(x_{\text{max}}\): \(x_{\text{max}} = v\sqrt{m/k} = 4.0 \times \sqrt{1.5/600} = 4.0 \times \sqrt{0.0025} = 4.0 \times 0.05 = 0.20 \text{ m}\).
- Step 3: (b) Work by spring from \(x_i = 0\) to \(x_f = -0.20 \text{ m}\): \(W_s = \frac{1}{2}k(0^2 - (-0.20)^2) = \frac{1}{2}(600)(-0.04) = -12 \text{ J}\). Negative because spring opposes compression.
- Step 4: (c) At half compression, \(x = -0.10 \text{ m}\). Work by spring from 0 to -0.10 m: \(W_s = \frac{1}{2}(600)(0 - 0.01) = -3.0 \text{ J}\).
- Step 5: Apply work-energy theorem: \(W_s = \Delta K = \frac{1}{2}m(v^2 - v_i^2)\). \(-3.0 = \frac{1}{2}(1.5)(v^2 - 16)\).
- Step 6: Solve: \(-3.0 = 0.75(v^2 - 16) \rightarrow v^2 - 16 = -4 \rightarrow v^2 = 12 \rightarrow v = \sqrt{12} = 3.46 \text{ m/s}\).

REASONING: This problem combines the spring work formula (this node) with the work-energy theorem (c11_phy_cbse_05_005) and energy conservation (c11_phy_cbse_05_010). The spring force does negative work during compression, reducing kinetic energy. At half the maximum compression, the spring has done 1/4 of its total negative work (since work \(\propto x^2\)), so the block retains 3/4 of its initial kinetic energy.

ANSWER: (a) \(0.20 \text{ m}\), (b) \(-12 \text{ J}\), (c) \(3.5 \text{ m/s}\) (or \(2\sqrt{3} \text{ m/s}\))

## COMPETENCY_QUESTION_1
QUESTION: A student stretches a spring from \(x = 0\) to \(x = +A\) slowly (quasi-statically) by applying an external force \(F_{\text{ext}}\). She then releases it, and the spring pulls the block back to \(x = 0\). The student argues: "The work done by the spring force during stretching is \(-\frac{1}{2}kA^2\), and during return it is \(+\frac{1}{2}kA^2\). The total work over the round trip is zero, so the spring force is conservative. But the external force did \(+\frac{1}{2}kA^2\) during stretching and zero during return (since she just let go). So the total work by external force is \(+\frac{1}{2}kA^2\), not zero. Does this mean the external force is non-conservative?" Analyze this reasoning and explain the flaw.

COMPETENCY: Interpreting physical situations using formulas and distinguishing between conservative forces and external agents

STEPS:
- Step 1: Identify the two forces: spring force (internal, conservative) and external force (applied by student).
- Step 2: Recall definition: A force is conservative if the work done by THAT force over any closed path is zero.
- Step 3: Check spring force: \(W_{\text{spring, round trip}} = 0\) → conservative. Correct.
- Step 4: Check external force: The student applied force only during stretching, not during return. The external force did not act over a closed path — it acted only on the outward leg. The definition of conservative force requires the SAME force to act over the entire closed loop.
- Step 5: If the student had pushed the block back (applying force over the return path), the external force would have done negative work, and total could be zero (if done quasi-statically). But she didn't — she released it.
- Step 6: Conclusion: The external force in this scenario is not a well-defined force field acting over a closed loop; it's a time-dependent applied force. The concept of conservative/non-conservative applies to force fields (like spring, gravity), not to arbitrary external interventions.

ANSWER: The student's reasoning is flawed because the definition of a conservative force applies to a force that exists as a field throughout the motion (like the spring force). The external force was only applied during half the cycle; it did not act over a closed path. Therefore, the "non-zero work over a closed path" test cannot be applied to the external force in this scenario. The spring force remains conservative; the external force is simply an external agent that added energy to the system.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A block of mass \(m\) is attached to two identical springs (each with spring constant \(k\)) fixed on opposite sides, as shown. The block is at equilibrium at \(x = 0\). The block is displaced to \(x = +d\) and released from rest on a frictionless surface. Derive an expression for the work done by the net spring force as the block moves from \(x = +d\) to \(x = -d/2\). Then find the block's speed at \(x = -d/2\) in terms of \(m, k, d\).

COMPETENCY: Applying the work formula to a multi-spring system and connecting to kinetic energy via work-energy theorem

STEPS:
- Step 1: Analyze forces. Left spring (attached at negative x) is stretched when block is at +d: displacement of left spring = \(d\), force \(F_L = -k(d)\) (negative direction). Right spring is compressed by \(d\): force \(F_R = -k(d)\) (also negative). Net force \(F_{\text{net}} = -2kd\).
- Step 2: Generalize for any \(x\): Left spring displacement = \(x\), force = \(-kx\). Right spring displacement = \(x\), force = \(-kx\). Net spring force \(F_{\text{net}} = -2kx\). Effective spring constant \(k_{\text{eff}} = 2k\).
- Step 3: Work by net spring force from \(x_i = +d\) to \(x_f = -d/2\): \(W_s = \frac{1}{2}k_{\text{eff}}(x_i^2 - x_f^2) = \frac{1}{2}(2k)[d^2 - (d/2)^2] = k[d^2 - d^2/4] = \frac{3}{4}kd^2\).
- Step 4: Apply work-energy theorem: \(W_s = \Delta K = \frac{1}{2}mv^2 - 0\).
- Step 5: Solve for \(v\): \(\frac{3}{4}kd^2 = \frac{1}{2}mv^2 \rightarrow v^2 = \frac{3kd^2}{2m} \rightarrow v = d\sqrt{\frac{3k}{2m}}\).

ANSWER: Work done by net spring force = \(\frac{3}{4}kd^2\); Speed at \(x = -d/2\) = \(d\sqrt{\frac{3k}{2m}}\)

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The negative sign indicates the spring force always opposes the ______, doing negative work when the spring is stretched or compressed from equilibrium, and positive work when returning toward equilibrium.

## DIAGNOSTIC_ANSWER_7
displacement

**A wrong answer ("force" or "motion") reveals the student has swapped the definition's noun - the spring force always opposes the displacement.** Displacement is the definition's own noun, and the noun is what the blank grades. Recall the toward-equilibrium rule before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a common door closer or a spring-loaded pen in your classroom — when you push the door or click the pen, you feel a resisting force that increases the more you ______ the spring.

## DIAGNOSTIC_ANSWER_8
compress

**A wrong answer ("stretch" or "pull") reveals the student has swapped the walkthrough's verb - the resisting force grows the more you compress the spring.** Compress is the walkthrough's own verb, and the verb is what the blank grades. Recall the pen-click feel before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can calculate the work done by a spring force for any given initial and final displacements using both the integral formula and the area-under-graph method, correctly handling the sign convention.

**A wrong answer (formula only) reveals the student has under-answered the mastery criterion.** Full mastery adds: use the area-under-graph method alongside the integral, handle the sign convention correctly, and determine the spring constant from a force-displacement graph for multi-step problems.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe a common door closer or a spring-loaded pen in your ______ — when you push the door or click the pen, you feel a resisting force that increases the more you compress the spring.

## DIAGNOSTIC_ANSWER_10
classroom

**A wrong answer ("lab" or "study") reveals the student has swapped the walkthrough's noun - the door closer and pen sit in the classroom.** Classroom is the walkthrough's own noun, and the noun is what the blank grades. Recall the increasing-resistance feel before filling, and give the noun exactly.
