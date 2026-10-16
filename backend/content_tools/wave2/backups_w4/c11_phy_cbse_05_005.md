## ELI5
Pedal and the bicycle gains speed; brake and friction drains it - and the theorem prices both: net work equals the change in kinetic energy. One kinematic equation, multiplied by m/2 and dressed with Newton's second law, becomes the final kinetic energy minus the initial - that difference is the net work. Every force's contribution lands in one ledger, sign included - positive deposits speed, negative withdrawals.

## DEFINITION
The work-energy theorem states that the net work done by all forces acting on a particle equals the change in its kinetic energy: \(W_{\text{net}} = \Delta K = K_f - K_i = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2\). The SI unit of work and kinetic energy is the joule (J), where 1 J = 1 N·m = 1 kg·m²/s².

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the work-energy theorem for a constant force in one and three dimensions starting from the kinematic equation \(v^2 - u^2 = 2as\) and Newton's second law, and can apply it to compute speed changes when the net work is known.

## SCOPE_BOUNDARY
This node covers the derivation of the work-energy theorem for a constant net force using vector algebra and the kinematic equation \(v^2 - u^2 = 2\mathbf{a}\cdot\mathbf{d}\). It does NOT cover the variable-force derivation (which uses calculus and is treated in node c11_phy_cbse_05_006) nor the theorem's application to systems of particles or non-inertial frames.

## WALKTHROUGH
Imagine a bicycle moving on a level road: when you pedal, you do positive work and the bicycle speeds up; when you apply brakes, friction does negative work and the bicycle slows down. This everyday observation connects force, displacement, and speed change. To quantify it, we start with the familiar kinematic equation \(v^2 - u^2 = 2as\) from Class 9. Multiply both sides by \(m/2\) and substitute \(ma = F_{\text{net}}\) (Newton's second law). The left side becomes the difference in \(\frac{1}{2}mv^2\), which we define as kinetic energy; the right side becomes \(F_{\text{net}} \cdot s\), which we define as net work. Generalising to three dimensions using the scalar product gives \(K_f - K_i = \mathbf{F}_{\text{net}} \cdot \mathbf{d} = W_{\text{net}}\), the work-energy theorem.

Takeaway: mastery means deriving the theorem from the squared-speed kinematic relation, generalising by the dot product, and computing speed changes from work budgets. Exam moves: derive-the-theorem questions and find-the-final-speed items. Check yourself: the theorem tracks the net - a push and a drag can fight to a draw and leave the speed untouched. Students miss it because they credit each force separately, when the definition's ledger is collective: only the net work reaches the kinetic energy, and signs are the accounting.

## DIAGNOSTIC_QUESTION_1
State the work-energy theorem in words and give its mathematical expression for a particle of mass \(m\) whose velocity changes from \(v_i\) to \(v_f\). What is the SI unit of the quantity on each side?

## DIAGNOSTIC_ANSWER_1
The work-energy theorem: "The net work done on a particle equals its change in kinetic energy." Mathematically, \(W_{\text{net}} = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2\). Both sides have the SI unit joule (J). A wrong answer (e.g., stating \(W = mv\) or omitting the 1/2 factor) reveals confusion between momentum and kinetic energy or a missing factor from the derivation.

## DIAGNOSTIC_QUESTION_2
Explain why the work-energy theorem uses the *net* force (or the sum of works of all forces) rather than the work done by a single force. Give an example where a single force does work but the kinetic energy does not change.

## DIAGNOSTIC_ANSWER_2
The theorem equates the *total* work done by all forces to the change in kinetic energy. If only one force acts, its work equals \(\Delta K\). However, if multiple forces act, individual works can cancel (e.g., pushing a box at constant velocity: applied force does positive work, friction does equal negative work, net work = 0, \(\Delta K = 0\)). A student who thinks any single force's work equals \(\Delta K\) ignores the vector nature of force addition and the scalar addition of work.

## DIAGNOSTIC_QUESTION_3
A 1500 kg car accelerates from 10 m/s to 25 m/s on a straight road. The net force acting on the car is constant. Calculate the net work done on the car. If the car travels 200 m during this acceleration, find the magnitude of the net force.

## DIAGNOSTIC_ANSWER_3
Step 1: \(\Delta K = \frac{1}{2}m(v_f^2 - v_i^2) = \frac{1}{2} \times 1500 \times (25^2 - 10^2) = 750 \times (625 - 100) = 750 \times 525 = 393,750 \text{ J}\).  
Step 2: \(W_{\text{net}} = \Delta K = 3.94 \times 10^5 \text{ J}\).  
Step 3: \(W_{\text{net}} = F_{\text{net}} \cdot d\) (force parallel to displacement) \(\Rightarrow F_{\text{net}} = W_{\text{net}}/d = 393,750 / 200 = 1968.75 \text{ N} \approx 1.97 \times 10^3 \text{ N}\).  
A wrong answer (e.g., using \(v_f - v_i\) instead of squares, or forgetting the 1/2) shows algebraic carelessness or confusion with impulse-momentum.

## DIAGNOSTIC_QUESTION_4
A block slides down a rough inclined plane of angle \(\theta\). The forces acting are gravity, normal, and friction. The block starts from rest and reaches speed \(v\) after traveling distance \(L\) along the plane. Write the work-energy equation for this motion, explicitly showing the work done by each force. Which force does zero work? Why?

## DIAGNOSTIC_ANSWER_4
\(W_g + W_N + W_f = \Delta K\). \(W_g = mgL\sin\theta\) (positive), \(W_N = 0\) (normal force is perpendicular to displacement), \(W_f = -fL\) (negative). So \(mgL\sin\theta - fL = \frac{1}{2}mv^2\). The normal force does zero work because it is everywhere perpendicular to the displacement. A student who claims normal force does work \(mgL\cos\theta\) confuses the component of gravity with the normal force or misapplies the dot product.

## DIAGNOSTIC_QUESTION_5
A student argues: "Since kinetic energy is always positive, the net work done on a body must always be positive." Evaluate this statement and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
The statement is false. Kinetic energy is always positive, but the *change* in kinetic energy (\(\Delta K = K_f - K_i\)) can be negative if the body slows down. Net work equals \(\Delta K\), so net work can be negative (e.g., braking car). A student who thinks work must be positive confuses the sign of a quantity with the sign of its change.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a dynamics cart, a track, a force sensor, and a motion sensor to verify the work-energy theorem for a constant force. Outline the measurements, the graph you would plot, and how you would extract the net work and change in kinetic energy.

## DIAGNOSTIC_ANSWER_6
Attach the force sensor to the cart and pull with a constant force (or use a hanging mass over a pulley). Record force \(F\) and position \(x\) simultaneously. Plot \(F\) vs \(x\); the area under the curve (rectangle for constant \(F\)) gives \(W_{\text{net}}\). From the motion sensor, obtain initial and final velocities \(v_i, v_f\) and compute \(\Delta K = \frac{1}{2}m(v_f^2 - v_i^2)\). Compare the two values. A poor answer might omit the need for constant force, forget to subtract initial kinetic energy, or confuse the force sensor reading with net force (ignoring friction).

## COMMON_MISCONCEPTION
Students often believe the work-energy theorem applies *only* when a single constant force acts, or they think the theorem is \(W = \frac{1}{2}mv^2\) (using only final speed). They also confuse the scalar sum of works with the vector sum of forces: they might compute work done by each force separately but then add them as vectors, or they might use the magnitude of the net force without considering the angle between net force and displacement. Another error is assuming the theorem gives the same information as Newton's second law, not realizing it loses directional and temporal details.

## ON_FAILURE
If the student struggles, first have them re-derive \(v^2 - u^2 = 2as\) from the definitions of acceleration and average velocity. Then, using a free-body diagram, identify all forces and compute each work as \(W = Fd\cos\theta\). Sum the works *as scalars* to get \(W_{\text{net}}\). Compute \(\Delta K\) from measured speeds. Emphasize that the theorem is a scalar equation: directions are already accounted for in the cosine factor of each work term. Practice with a block on an incline where gravity, friction, and normal force all act.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_001, c11_phy_cbse_05_004, c9_physics_ch2_8, c9_physics_ch4_3, c9_physics_ch4_5
## PREREQUISITE_REASONS
c11_phy_cbse_05_001: Provides the definition of work \(W = \mathbf{F}\cdot\mathbf{d}\) and the scalar product, essential for the right-hand side of the theorem.
c11_phy_cbse_05_004: Defines kinetic energy \(K = \frac{1}{2}mv^2\), which becomes the left-hand side of the theorem.
c9_physics_ch2_8: Supplies the kinematic equation \(v^2 - u^2 = 2as\) that is the starting point of the derivation.
c9_physics_ch4_3: Introduces the work-energy theorem statement at Class 9 level, building familiarity.
c9_physics_ch4_5: Derives the kinetic energy formula from work done, reinforcing the connection.

## FORWARD_NODE_IDS
c11_phy_cbse_05_006, c11_phy_cbse_05_010, c11_phy_cbse_05_013, c11_phy_cbse_05_014, c11_phy_cbse_05_007, c11_phy_cbse_05_008, c11_phy_cbse_05_009, c11_phy_cbse_05_011, c11_phy_cbse_05_012, c12_phy_cbse_02_001, c12_phy_cbse_02_005, c12_phy_cbse_02_012, c12_phy_cbse_11_002, c12_phy_cbse_12_001, c12_phy_cbse_13_003, c12_phy_cbse_02_004, c12_phy_cbse_04_001, c11_phy_cbse_05_003

## FORWARD_REASONS
c11_phy_cbse_05_006: Extends the theorem to variable forces using calculus, building directly on the constant-force derivation.
c11_phy_cbse_05_010: Uses the work-energy theorem to define conservative forces and derive conservation of mechanical energy.
c11_phy_cbse_05_013: Applies the theorem (with momentum conservation) to analyze collisions and classify them as elastic/inelastic.
c11_phy_cbse_05_014: Solves one-dimensional collision problems using both momentum and kinetic energy conservation derived from the theorem.
c11_phy_cbse_05_007: Work-energy theorem (ΔK = W_net) connects work done by gravity to kinetic energy change, motivating potential energy.  
c11_phy_cbse_05_008: Work-energy theorem ($K_f - K_i = W_{\text{net}}$) is essential for solving spring problems with friction where mechanical energy is not conserved.  
c11_phy_cbse_05_009: Work-energy theorem provides the framework linking work to kinetic energy change.  
c11_phy_cbse_05_011: Work-energy theorem — connects work to energy change, so power is rate of energy change.  
c11_phy_cbse_05_012: Work-energy theorem derivation provides the link between work and kinetic energy change.  
c12_phy_cbse_02_001: Derives work-energy theorem — connects work done to energy change, foundational for potential energy definition.  
c12_phy_cbse_02_005: Work-energy theorem – connects external work to energy change.  
c12_phy_cbse_02_012: Work-energy theorem connects external work to stored potential energy.  
c12_phy_cbse_11_002: Work-energy theorem derivation — needed to understand \(K_{\text{max}} = \frac{1}{2}mv_{\text{max}}^2\) and its equivalence to \(eV_0\).  
c12_phy_cbse_12_001: Work-Energy Theorem derivation — essential for equating initial kinetic energy to final potential energy at distance of closest approach.  
c12_phy_cbse_13_003: Work-energy theorem (\(W = \Delta K\)) extends to \(W = \Delta E\) where \(\Delta E\) includes rest mass energy changes.  
c12_phy_cbse_02_004: If stuck, revisit the definition of potential difference (c12_phy_cbse_02_001) and the work-energy theorem for electrostatic forces (c11_phy_cbse_05_005). Practice drawing contour maps for simple functions like z = x² + y².  
c12_phy_cbse_04_001: 3. Work-energy theorem review (c11_phy_cbse_05_005): Write \(W = \Delta K = \int \vec{F} \cdot d\vec{s}\). Show that if \(\vec{F} \perp \vec{v}\), then \(\vec{F} \cdot \ve  
c11_phy_cbse_05_003: REASONING: This problem combines the spring work formula (this node) with the work-energy theorem (c11_phy_cbse_05_005) and energy conservation (c11_phy_cbse_05_010). The spring force does negative work during compression, reducing kinetic  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c10_math_cbse_04_005
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: The distance formula and Pythagoras theorem underlie the scalar product \(\mathbf{F}\cdot\mathbf{d} = Fd\cos\theta\) used in the three-dimensional derivation.
c10_math_cbse_04_005: Quadratic equations appear when solving for speeds from the work-energy equation (e.g., \(v_f^2 = v_i^2 + 2\frac{W}{m}\)).

## CHAIN_DESCRIPTION
c9_physics_ch2_8 -> c11_phy_cbse_05_005 -> c11_phy_cbse_05_006

## THIS_FORMULA
\(W_{\text{net}} = \Delta K = K_f - K_i = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2\) (J)

## FORMULA_VARIABLES
\(W_{\text{net}}\) = net work done by all forces (J), \(\Delta K\) = change in kinetic energy (J), \(K_f, K_i\) = final and initial kinetic energy (J), \(m\) = mass of particle (kg), \(v_f, v_i\) = final and initial speed (m/s)

## FORMULA_UNITS
J, kg, m/s

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch1_4 | The scalar product \(\mathbf{F}\cdot\mathbf{d}\) uses the cosine of the angle between vectors, which relies on the distance formula and Pythagoras theorem in coordinate geometry.
c10_math_cbse_04_005 | Solving for velocity from the work-energy equation often requires taking square roots, and quadratic equations arise when the theorem is combined with other constraints (e.g., in collision problems).

## PREREQ_CONCEPT
Newton's second law (\(F=ma\)) and the kinematic equation \(v^2-u^2=2as\) for constant acceleration.

## PREREQ_BEFORE
The student must be able to compute work done by a constant force using \(W = Fd\cos\theta\) and kinetic energy using \(K = \frac{1}{2}mv^2\), and must recall the derivation of \(v^2-u^2=2as\).

## PREREQ_STUCK
Review the derivation of \(v^2-u^2=2as\) from \(v = u+at\) and \(s = ut+\frac{1}{2}at^2\), and practice computing dot products for work.

## WORKED_EXAMPLE_1
PROBLEM: A 2000 kg truck accelerates uniformly from 5 m/s to 15 m/s over a distance of 100 m on a level road. The net force on the truck is constant. (a) Calculate the net work done on the truck. (b) Find the magnitude of the net force. (c) If the engine provides a forward force of 5000 N, what is the magnitude of the total resistive force (friction + air resistance)?

STEPS:
- Step 1: Identify given: \(m = 2000 \text{ kg}\), \(v_i = 5 \text{ m/s}\), \(v_f = 15 \text{ m/s}\), \(d = 100 \text{ m}\), \(F_{\text{engine}} = 5000 \text{ N}\) forward. Find \(W_{\text{net}}\), \(F_{\text{net}}\), \(F_{\text{resistive}}\).
- Step 2: Use work-energy theorem: \(W_{\text{net}} = \Delta K = \frac{1}{2}m(v_f^2 - v_i^2)\).
- Step 3: Compute \(\Delta K = 0.5 \times 2000 \times (15^2 - 5^2) = 1000 \times (225 - 25) = 1000 \times 200 = 200,000 \text{ J}\). So \(W_{\text{net}} = 2.00 \times 10^5 \text{ J}\).
- Step 4: Net work also equals \(F_{\text{net}} \cdot d\) (force parallel to displacement). \(F_{\text{net}} = W_{\text{net}} / d = 200,000 / 100 = 2000 \text{ N}\) forward.
- Step 5: Net force = engine force - resistive force (since they oppose). \(F_{\text{net}} = F_{\text{engine}} - F_{\text{resistive}} \Rightarrow 2000 = 5000 - F_{\text{resistive}} \Rightarrow F_{\text{resistive}} = 3000 \text{ N}\).
- Step 6: Check units: work in J (N·m), forces in N, speeds in m/s. All consistent. The resistive force is less than engine force, so net acceleration forward – physically reasonable.

REASONING: The work-energy theorem directly links the speed change to the net work. Since the net force is constant, \(W_{\text{net}} = F_{\text{net}} d\). The engine force is given, so the resistive force is found by subtracting the net force from the engine force (they act in opposite directions).

ANSWER: (a) \(W_{\text{net}} = 2.00 \times 10^5 \text{ J}\) (b) \(F_{\text{net}} = 2000 \text{ N}\) forward (c) \(F_{\text{resistive}} = 3000 \text{ N}\) opposite to motion.

## WORKED_EXAMPLE_2
PROBLEM: A 0.5 kg block is pushed against a horizontal spring (spring constant \(k = 200 \text{ N/m}\)) compressing it by 0.1 m. The block is released on a rough horizontal surface with coefficient of kinetic friction \(\mu_k = 0.2\). Use the work-energy theorem to find the speed of the block when it leaves the spring (i.e., when the spring returns to its natural length). Take \(g = 10 \text{ m/s}^2\).

STEPS:
- Step 1: Identify forces doing work during the release: spring force (variable, but we know its work from spring potential energy) and kinetic friction (constant). Normal and gravity do no work (perpendicular to displacement).
- Step 2: Work done by spring from compression \(x_i = 0.1 \text{ m}\) to \(x_f = 0\): \(W_{\text{spring}} = \frac{1}{2}k x_i^2 - \frac{1}{2}k x_f^2 = \frac{1}{2} \times 200 \times (0.1)^2 = 1 \text{ J}\). (Positive because spring force is in direction of motion during release.)
- Step 3: Work done by friction: \(W_{\text{fric}} = -f_k d = -\mu_k mg \times x_i = -0.2 \times 0.5 \times 10 \times 0.1 = -0.1 \text{ J}\). (Displacement \(d = 0.1 \text{ m}\) while in contact with spring.)
- Step 4: Net work \(W_{\text{net}} = W_{\text{spring}} + W_{\text{fric}} = 1 - 0.1 = 0.9 \text{ J}\).
- Step 5: By work-energy theorem, \(W_{\text{net}} = \Delta K = \frac{1}{2}mv_f^2 - 0\) (starts from rest). So \(\frac{1}{2} \times 0.5 \times v_f^2 = 0.9 \Rightarrow 0.25 v_f^2 = 0.9 \Rightarrow v_f^2 = 3.6 \Rightarrow v_f = \sqrt{3.6} \approx 1.90 \text{ m/s}\).
- Step 6: Check: without friction, \(v_f = \sqrt{k/m} x_i = \sqrt{200/0.5} \times 0.1 = 20 \times 0.1 = 2 \text{ m/s}\). Friction reduces it slightly to 1.9 m/s – reasonable.

REASONING: The work-energy theorem handles both constant and variable forces if we can compute their works. The spring work is known from its potential energy formula (derived in later node, but usable here). Friction work is constant force × distance with a negative sign. The net work gives the kinetic energy at the moment the block loses contact with the spring.

ANSWER: \(v_f \approx 1.90 \text{ m/s}\)

## WORKED_EXAMPLE_3
PROBLEM: A 50 g arrow is shot vertically upward from a bow. The bowstring exerts an average force of 200 N on the arrow over a draw distance of 0.6 m. Assuming no air resistance, use the work-energy theorem to find (a) the speed of the arrow as it leaves the bow, (b) the maximum height reached by the arrow. Take \(g = 10 \text{ m/s}^2\).

STEPS:
- Step 1: Given: \(m = 0.05 \text{ kg}\), \(F_{\text{bow}} = 200 \text{ N}\) (upward), draw distance \(d = 0.6 \text{ m}\). During the launch, two forces do work: bowstring (positive) and gravity (negative).
- Step 2: Work by bowstring: \(W_{\text{bow}} = F_{\text{bow}} \cdot d = 200 \times 0.6 = 120 \text{ J}\).
- Step 3: Work by gravity during launch: \(W_g = -mgd = -0.05 \times 10 \times 0.6 = -0.3 \text{ J}\).
- Step 4: Net work during launch: \(W_{\text{net,launch}} = 120 - 0.3 = 119.7 \text{ J}\). This equals the kinetic energy as the arrow leaves the bow: \(K_{\text{launch}} = \frac{1}{2}mv_{\text{launch}}^2 = 119.7 \text{ J}\).
- Step 5: Solve for launch speed: \(v_{\text{launch}} = \sqrt{2K/m} = \sqrt{2 \times 119.7 / 0.05} = \sqrt{4788} \approx 69.2 \text{ m/s}\).
- Step 6: After leaving the bow, only gravity does work. At maximum height, final speed = 0. Work-energy from launch to max height: \(W_g = \Delta K = 0 - K_{\text{launch}} = -119.7 \text{ J}\). But \(W_g = -mgh_{\text{max}} \Rightarrow mgh_{\text{max}} = 119.7 \Rightarrow h_{\text{max}} = 119.7 / (0.05 \times 10) = 119.7 / 0.5 = 239.4 \text{ m}\).
- Step 7: Check: Initial kinetic energy 119.7 J converts entirely to potential energy \(mgh = 0.05 \times 10 \times 239.4 = 119.7 \text{ J}\). Consistent.

REASONING: The problem is split into two phases: launch (bowstring + gravity) and free flight (gravity only). The work-energy theorem is applied to each phase separately. The net work during launch gives the initial kinetic energy for the second phase. Gravity's work is computed as \(-mg\Delta y\) in both phases.

ANSWER: (a) \(v_{\text{launch}} \approx 69.2 \text{ m/s}\) (b) \(h_{\text{max}} \approx 239 \text{ m}\)

## COMPETENCY_QUESTION_1
QUESTION: A particle of mass \(m\) moves along the x-axis under a constant net force \(F\). At \(t=0\), it is at \(x=0\) with velocity \(v_0\). Derive an expression for its kinetic energy as a function of position \(x\) using the work-energy theorem. Then, using \(K = \frac{1}{2}mv^2\), obtain \(v(x)\) and show that it matches the kinematic equation \(v^2 = v_0^2 + 2\frac{F}{m}x\). Explain why the work-energy theorem and Newton's second law give the same result for this case.

COMPETENCY: Interpreting physical situations using formulas and connecting work-energy theorem to kinematics.

STEPS:
- Step 1: Net work done from 0 to x is \(W_{\text{net}} = Fx\) (force constant and parallel to displacement).
- Step 2: By work-energy theorem, \(K(x) - K(0) = Fx\). \(K(0) = \frac{1}{2}mv_0^2\).
- Step 3: So \(K(x) = \frac{1}{2}mv_0^2 + Fx\).
- Step 4: Substitute \(K(x) = \frac{1}{2}mv(x)^2\): \(\frac{1}{2}mv^2 = \frac{1}{2}mv_0^2 + Fx\).
- Step 5: Multiply by \(2/m\): \(v^2 = v_0^2 + 2\frac{F}{m}x\). Since \(a = F/m\), this is \(v^2 = v_0^2 + 2ax\), the standard kinematic equation.
- Step 6: Explanation: The work-energy theorem is derived from Newton's second law and the kinematic equation for constant acceleration; they are mathematically equivalent for constant forces. The theorem is a scalar integration of the vector equation \(F=ma\) over displacement, losing time and direction information but retaining energy information.

ANSWER: \(K(x) = \frac{1}{2}mv_0^2 + Fx\); \(v(x) = \sqrt{v_0^2 + 2\frac{F}{m}x}\). Both methods yield the same relation because the work-energy theorem for constant forces is a direct consequence of Newton's second law combined with the definition of work and the kinematic equation.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A 2 kg block slides down a rough inclined plane of length 5 m and angle 30°. The coefficient of kinetic friction is 0.1. The block starts from rest at the top. (a) Draw a free-body diagram and compute the work done by gravity, normal force, and friction. (b) Use the work-energy theorem to find the speed at the bottom. (c) If the same block is projected up the same plane with an initial speed of 10 m/s, how far up the plane will it go before stopping? (Use \(g = 10 \text{ m/s}^2\)).

COMPETENCY: Predicting outcomes from changing variables and applying the work-energy theorem to both down and up motion on an incline with friction.

STEPS:
- Step 1: Forces: gravity \(mg\) downward, normal \(N = mg\cos\theta\) perpendicular to plane, friction \(f = \mu_k N = \mu_k mg\cos\theta\) opposing motion.
- Step 2: Displacement down the plane: \(d = 5 \text{ m}\). Work by gravity: \(W_g = mgd\sin\theta = 2 \times 10 \times 5 \times \sin30° = 100 \times 0.5 = 50 \text{ J}\). Work by normal: \(W_N = 0\) (perpendicular). Work by friction: \(W_f = -f d = -\mu_k mg\cos\theta \times d = -0.1 \times 2 \times 10 \times \cos30° \times 5 = -2 \times 0.866 \times 5 = -8.66 \text{ J}\).
- Step 3: Net work \(W_{\text{net}} = 50 - 8.66 = 41.34 \text{ J}\). By work-energy theorem, \(K_{\text{bottom}} = W_{\text{net}} = \frac{1}{2}mv^2 \Rightarrow v = \sqrt{2 \times 41.34 / 2} = \sqrt{41.34} \approx 6.43 \text{ m/s}\).
- Step 4: For upward projection: initial \(K = \frac{1}{2} \times 2 \times 10^2 = 100 \text{ J}\). At max distance \(x\) up the plane, final \(K = 0\). Forces doing work: gravity (\(-mgx\sin\theta\)) and friction (\(-\mu_k mg\cos\theta \cdot x\)). Net work \(W_{\text{net}} = -mgx(\sin\theta + \mu_k\cos\theta)\).
- Step 5: \(W_{\text{net}} = \Delta K = -100 \text{ J}\). So \(mgx(\sin\theta + \mu_k\cos\theta) = 100\). \(x = 100 / [2 \times 10 \times (0.5 + 0.1 \times 0.866)] = 100 / [20 \times (0.5 + 0.0866)] = 100 / [20 \times 0.5866] = 100 / 11.732 \approx 8.52 \text{ m}\).
- Step 6: Check: The distance up the plane is greater than the length of the incline (5 m), meaning the block would leave the incline if it were only 5 m long. But the problem asks for distance along the plane, so 8.52 m is the theoretical stopping point on an extended plane.

ANSWER: (a) \(W_g = 50 \text{ J}\), \(W_N = 0\), \(W_f = -8.66 \text{ J}\) (b) \(v \approx 6.43 \text{ m/s}\) (c) \(x \approx 8.52 \text{ m}\) up the plane.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The SI unit of work and ______ energy is the joule (J), where 1 J = 1 N·m = 1 kg·m²/s².

## DIAGNOSTIC_ANSWER_7
kinetic

**A wrong answer ("potential" or "internal") reveals the student has swapped the definition's adjective - the joule prices work and kinetic energy alike.** Kinetic is the definition's own adjective, and the adjective is what the blank grades. Recall the unit equality before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a bicycle moving on a level road: when you pedal, you do ______ work and the bicycle speeds up; when you apply brakes, friction does negative work and the bicycle slows down.

## DIAGNOSTIC_ANSWER_8
positive

**A wrong answer ("negative" or "zero") reveals the student has swapped the walkthrough's adjective - pedalling does positive work and the bicycle speeds up.** Positive is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the braking contrast before filling, and give the adjective exactly.
