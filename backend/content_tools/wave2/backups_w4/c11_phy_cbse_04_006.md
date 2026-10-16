## ELI5
The bowler delivers and recoils a whisper; on a frictionless icy lake the bookkeeping is exact - before release, total momentum zero; after, ball forward plus bowler backward still zero. Conservation of momentum: an isolated system's total vector momentum never changes, however violent the collision or explosion inside. Kinetic energy may scatter into heat; momentum does not budge.

## DEFINITION
The law of conservation of momentum states that for an isolated system (no net external force), the total vector momentum remains constant in time: \(\sum \vec{p}_{\text{initial}} = \sum \vec{p}_{\text{final}}\). Momentum \(\vec{p} = m\vec{v}\) is a vector quantity measured in kg·m/s. The law follows directly from Newton's second and third laws and holds for all collisions and explosions in isolated systems, regardless of whether kinetic energy is conserved.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
Student can identify whether a given physical system is isolated, set up vector momentum conservation equations for 1D and 2D collisions/explosions, solve for unknown velocities or masses, and distinguish between elastic and inelastic outcomes using kinetic energy comparison.

## SCOPE_BOUNDARY
Covers conservation of linear momentum for isolated systems of particles in Classical Mechanics: 1D and 2D collisions (elastic and perfectly inelastic), explosions, recoil problems, and rocket propulsion (variable mass systems). Does NOT cover relativistic momentum, angular momentum conservation, or systems with significant external impulses during interaction.

## WALKTHROUGH
Watch a cricket bowler deliver a ball: the ball gains forward momentum while the bowler experiences a tiny backward recoil. Now imagine the same interaction on a frictionless icy lake — the total momentum of bowler+ball system before release (zero) equals total momentum after. Begin by identifying the system boundaries: are external forces (friction, gravity component along motion) negligible during the brief interaction? If yes, apply \(\sum \vec{p}_i = \sum \vec{p}_f\) as a vector equation. Break into x and y components. For 1D problems, choose a sign convention. Always verify isolation assumption before writing the conservation equation.

Takeaway: mastery means testing the isolation assumption, writing the conservation equation in components with a sign convention, and sorting elastic from inelastic by the energy ledger. Exam moves: collision numericals and explosion-recoil items. Check yourself: isolation is about the interaction's brevity - during the crash, internal forces swamp the external whispers. Students miss it because they conserve speed or energy by instinct, when the definition conserves the vector sum of mass times velocity: directions count, components conserve separately, and a perfectly sticky collision keeps momentum while quietly burning kinetic energy as heat. Verify the isolation claim before trusting the equation - brief is the watchword.

## DIAGNOSTIC_QUESTION_1
State the law of conservation of linear momentum and write its mathematical form for a two-body isolated system. What is the SI unit of momentum?

## DIAGNOSTIC_ANSWER_1
The total linear momentum of an isolated system remains constant: \(\vec{p}_{1i} + \vec{p}_{2i} = \vec{p}_{1f} + \vec{p}_{2f}\). SI unit: kg·m/s. A wrong answer (e.g., "momentum is conserved always" or unit as N·s without recognizing it equals kg·m/s) reveals confusion about the isolation condition or dimensional analysis.

## DIAGNOSTIC_QUESTION_2
A 0.15 kg cricket ball moving at 40 m/s is caught by a fielder who brings it to rest in 0.1 s. Explain why the momentum of the ball alone is not conserved, but the momentum of the ball+fielder+Earth system is conserved. Identify the external impulse.

## DIAGNOSTIC_ANSWER_2
The ball experiences a large external impulse from the fielder's hands (force × time = change in momentum = 6 N·s). The ball alone is not isolated. However, the ball+fielder+Earth system experiences no net external horizontal force during the catch, so its total momentum is conserved. The external impulse is the friction force from the ground on the fielder's feet, but if the catch is quick, this impulse is small. A wrong answer indicates failure to distinguish system boundaries and the role of external forces.

## DIAGNOSTIC_QUESTION_3
A 50 g bullet moving horizontally at 400 m/s embeds into a 2 kg wooden block initially at rest on a smooth horizontal table. Calculate the speed of the combined block+bullet system just after impact. Show all steps with units.

## DIAGNOSTIC_ANSWER_3
Given: \(m_b = 0.05\ \text{kg}\), \(u_b = 400\ \text{m/s}\), \(M = 2\ \text{kg}\), \(u_B = 0\). System isolated horizontally (smooth table). Conservation: \(m_b u_b + M u_B = (m_b + M) v\). \((0.05 \times 400) + 0 = (2.05) v\). \(20 = 2.05 v\). \(v = 9.76\ \text{m/s}\). Units: kg·m/s = kg·(m/s) ✓. A wrong answer (e.g., forgetting to add masses, using 2 kg instead of 2.05 kg) reveals algebraic error or misunderstanding of perfectly inelastic collision.

## DIAGNOSTIC_QUESTION_4
Two identical balls of mass m approach each other with speeds 3v and v on a frictionless surface. They collide elastically. Without calculation, predict the final velocities and explain your reasoning using momentum and kinetic energy conservation.

## DIAGNOSTIC_ANSWER_4
Initial total momentum: \(m(3v) + m(-v) = 2mv\). Initial KE: \(\frac{1}{2}m(9v^2) + \frac{1}{2}m(v^2) = 5mv^2\). For identical masses in elastic 1D collision, velocities exchange in centre-of-mass frame. Result: first ball moves at \(-v\), second at \(3v\) (they exchange velocities relative to CM). Total final momentum: \(m(-v) + m(3v) = 2mv\) ✓. KE: \(5mv^2\) ✓. A wrong prediction (e.g., both stop, or stick together) shows confusion between elastic and inelastic outcomes or failure to apply both conservation laws.

## DIAGNOSTIC_QUESTION_5
A student solves a recoil problem: "A 100 kg gun fires a 10 g bullet at 800 m/s. Find recoil speed." They write: \(0 = 0.01 \times 800 + 100 \times v \Rightarrow v = -0.08\ \text{m/s}\). Is this correct? If not, identify the error and give the correct answer.

## DIAGNOSTIC_ANSWER_5
(1) The mass conversion is right — 10 g equals 0.01 kg, (2) The momentum sum is right — 0.01 times 800 gives 8 kg m/s and 100 times minus 0.08 gives minus 8 kg m/s, (3) The total momentum is zero, so the student's recoil speed of minus 0.08 m/s is correct, (4) The negative sign only shows the gun recoils opposite to the bullet. A wrong evaluation claiming a sign error or a mass-conversion error shows the student has not carefully checked units and the sign convention.

## DIAGNOSTIC_QUESTION_6
Design a simple classroom experiment using low-friction carts on a track to verify momentum conservation in a perfectly inelastic collision. Specify measurements needed, how to ensure isolation, and how to analyse data.

## DIAGNOSTIC_ANSWER_6
Use two carts with Velcro pads (stick on collision). Measure masses \(m_1, m_2\). Give cart 1 initial velocity \(u_1\) (photogate), cart 2 at rest. After collision, measure combined velocity \(v\) (photogate). Check \(m_1 u_1 \approx (m_1+m_2)v\). Ensure isolation: level track (no gravity component), minimal friction (air track or low-friction wheels), collision time short so friction impulse negligible. Analyse: plot \(m_1 u_1\) vs \((m_1+m_2)v\) for multiple trials; slope should be 1. A poor design ignores friction or uses single trial without error analysis.

## COMMON_MISCONCEPTION
Students believe momentum is conserved in every collision, ignoring external forces like friction or gravity components along the motion direction. Example: "A car hits a wall and stops — momentum is not conserved, so the law is wrong." They fail to recognize the car+wall+Earth system is isolated, or that the wall exerts an external impulse on the car alone. Another error: treating momentum as a scalar in 2D problems, adding magnitudes instead of vector components.

## ON_FAILURE
1. Revisit Newton's third law (c11_phy_cbse_04_004): action-reaction pairs are internal to the system. 2. Practice identifying system boundaries: draw a dashed circle around interacting objects; any force crossing the circle is external. 3. Do vector addition drills: resolve momenta into x/y components before summing. 4. Use PhET "Collision Lab" simulation: toggle external friction on/off to see momentum conservation fail/succeed. 5. Solve 5 recoil problems where you must explicitly state "system is isolated because..."

## PREREQUISITE_NODE_IDS
c11_phy_cbse_04_003, c11_phy_cbse_04_004, c11_phy_cbse_04_005, c9_physics_ch3_6, c9_math_ch1_4

## PREREQUISITE_REASONS
c11_phy_cbse_04_003: Newton's second law gives \(\vec{F}_{\text{net}} = d\vec{p}/dt\), the foundation for momentum change.
c11_phy_cbse_04_004: Newton's third law ensures internal forces cancel in pairs (\(\vec{F}_{12} = -\vec{F}_{21}\)), making total momentum constant when \(\vec{F}_{\text{ext}} = 0\).
c11_phy_cbse_04_005: Defines momentum \(\vec{p} = m\vec{v}\) and impulse \(\vec{J} = \Delta \vec{p}\), the quantities being conserved.
c9_physics_ch3_6: Prior introduction to momentum definition and conservation statement in Class 9.
c9_math_ch1_4: c9_math_ch1_4 | Distance formula and coordinate geometry — used to set up 2D collision coordinate systems and compute angles from velocity components.  

## FORWARD_NODE_IDS
c11_phy_cbse_04_007, c11_phy_cbse_04_014, c11_phy_cbse_06_003

## FORWARD_REASONS
c11_phy_cbse_04_007: Equilibrium of a particle (\(\sum \vec{F} = 0\)) is the static limit of momentum conservation (\(d\vec{p}/dt = 0\)).
c11_phy_cbse_04_014: Free-body diagram problems often involve impulsive forces where momentum conservation simplifies analysis before/after impact.
c11_phy_cbse_06_003: Scalar product (dot product) is already taught; students must distinguish **a**·**b** = ab cosθ (scalar) from **a** × **b** = ab sinθ **n̂** (vector).  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_004, c11_math_cbse_10_005
## CROSS_SUBJECT_REASONS
c11_math_ch10_004: Vector addition and components — essential for 2D momentum conservation where \(\sum p_x\) and \(\sum p_y\) are separately conserved.
c11_math_ch10_005: Scalar (dot) product — used in kinetic energy calculation \(K = \frac{1}{2}mv^2 = \frac{p^2}{2m}\) to distinguish elastic vs inelastic collisions.
c11_math_cbse_10_004: Cross-subject support: If a point P(x, y) divides the line segment joining two points A(x₁, y₁) and B(x₂, y₂) ext... supplies tools/facts used directly in this node.  
c11_math_cbse_10_005: Cross-subject support: The area of a triangle with vertices at coordinates A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) is... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_04_003 -> c11_phy_cbse_04_004 -> c11_phy_cbse_04_005 -> c11_phy_cbse_04_006 -> c11_phy_cbse_04_007 -> c11_phy_cbse_04_014

## THIS_FORMULA
\(\sum \vec{p}_{\text{initial}} = \sum \vec{p}_{\text{final}}\) or \(m_1\vec{u}_1 + m_2\vec{u}_2 = m_1\vec{v}_1 + m_2\vec{v}_2\) for two-body isolated system. For perfectly inelastic: \((m_1+m_2)\vec{v} = m_1\vec{u}_1 + m_2\vec{u}_2\). SI units: kg·m/s.

## FORMULA_VARIABLES
\(m_1, m_2\) = masses of bodies (kg), \(\vec{u}_1, \vec{u}_2\) = initial velocities (m/s), \(\vec{v}_1, \vec{v}_2\) = final velocities (m/s), \(\vec{p}\) = momentum (kg·m/s). All velocities are vectors; components treated separately.

## FORMULA_UNITS
kg, m/s, kg·m/s, N·s (impulse), J (kinetic energy for elasticity check)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch10_004 | Vector components in 2D collisions: \(p_{xi} = p_{xf}\) and \(p_{yi} = p_{yf}\) are independent scalar equations derived from vector conservation.
c11_math_ch10_005 | Dot product for kinetic energy: \(K = \frac{1}{2}m(\vec{v}\cdot\vec{v}) = \frac{p^2}{2m}\) connects momentum magnitude to energy for elasticity classification.
c9_math_ch1_4 | Distance formula and coordinate geometry — used to set up 2D collision coordinate systems and compute angles from velocity components.

## PREREQ_CONCEPT
Newton's third law ensures internal forces cancel pairwise; Newton's second law links net external force to rate of change of total momentum. If \(\vec{F}_{\text{ext}} = 0\), then \(d\vec{P}_{\text{total}}/dt = 0\).

## PREREQ_BEFORE
Student must be able to: (1) calculate momentum of a moving object with correct units, (2) add momentum vectors using components, (3) state Newton's third law and identify action-reaction pairs, (4) define an isolated system.

## PREREQ_STUCK
If stuck, revisit c11_phy_cbse_04_004 (Newton's third law) to see how \(\vec{F}_{12} = -\vec{F}_{21}\) leads to \(\Delta \vec{p}_1 + \Delta \vec{p}_2 = 0\) during interaction, and c11_phy_cbse_04_005 for impulse-momentum theorem practice.

## WORKED_EXAMPLE_1
PROBLEM: A 60 kg astronaut floating at rest in space throws a 2 kg tool kit at 10 m/s away from the spaceship. With what velocity does the astronaut recoil? Assume no external forces.
STEPS:
- Step 1: Identify system = astronaut + tool kit. No external forces in space → isolated system. Initial total momentum = 0 (both at rest).
- Step 2: Define direction: tool kit thrown in +x direction. Let astronaut recoil velocity be \(v_a\) (expected negative).
- Step 3: Apply conservation: \(m_a u_a + m_t u_t = m_a v_a + m_t v_t\). \(0 = (60)v_a + (2)(10)\).
- Step 4: Solve: \(60 v_a = -20\) → \(v_a = -20/60 = -1/3 = -0.333\ \text{m/s}\). Units: kg·m/s = kg·(m/s) ✓.
- Step 5: Interpret: Astronaut recoils at 0.333 m/s opposite to tool kit (negative sign). Magnitude is small because astronaut mass ≫ tool kit mass. Physically reasonable.
REASONING: In an isolated system, total momentum remains zero. The tool kit gains +20 kg·m/s momentum, so astronaut must gain -20 kg·m/s. The large mass of astronaut results in small recoil speed.
ANSWER: \(v_a = -0.333\ \text{m/s}\) (opposite to tool kit direction)

## WORKED_EXAMPLE_2
PROBLEM: A 0.02 kg bullet travelling horizontally at 400 m/s strikes a 5 kg wooden block resting on a smooth horizontal surface and emerges at 100 m/s in the same direction. Find the speed of the block just after the bullet exits.
STEPS:
- Step 1: System = bullet + block. Horizontal surface smooth → no external horizontal force during brief collision. Isolated in x-direction.
- Step 2: Choose +x as bullet's initial direction. Given: \(m_b = 0.02\ \text{kg}\), \(u_b = 400\ \text{m/s}\), \(v_b = 100\ \text{m/s}\), \(M = 5\ \text{kg}\), \(u_B = 0\). Find \(v_B\).
- Step 3: Conservation of x-momentum: \(m_b u_b + M u_B = m_b v_b + M v_B\).
- Step 4: Substitute: \((0.02 \times 400) + 0 = (0.02 \times 100) + 5 v_B\). \(8 = 2 + 5 v_B\). \(5 v_B = 6\).
- Step 5: Compute: \(v_B = 6/5 = 1.2\ \text{m/s}\). Units: kg·m/s = kg·(m/s) ✓. Check: bullet lost momentum (8→2), block gained 6 kg·m/s. Total conserved.
REASONING: The bullet transfers part of its momentum to the block. Since the bullet continues forward, the collision is partially inelastic (kinetic energy not conserved). Momentum conservation alone suffices to find block speed.
ANSWER: \(v_B = 1.2\ \text{m/s}\) in the bullet's original direction

## WORKED_EXAMPLE_3
PROBLEM: Two identical balls of mass 0.2 kg approach each other on a frictionless horizontal surface. Ball A moves east at 6 m/s, Ball B moves north at 8 m/s. They collide and stick together. Find the velocity (magnitude and direction) of the combined mass after collision.
STEPS:
- Step 1: System = two balls. Frictionless surface → no external horizontal force. Isolated in horizontal plane. Perfectly inelastic collision (stick together).
- Step 2: Set coordinate system: +x = east, +y = north. \(m = 0.2\ \text{kg}\) each. \(\vec{u}_A = (6, 0)\ \text{m/s}\), \(\vec{u}_B = (0, 8)\ \text{m/s}\). Combined mass \(M = 0.4\ \text{kg}\).
- Step 3: Initial momentum components: \(p_{xi} = m u_{Ax} + m u_{Bx} = 0.2 \times 6 + 0 = 1.2\ \text{kg·m/s}\). \(p_{yi} = m u_{Ay} + m u_{By} = 0 + 0.2 \times 8 = 1.6\ \text{kg·m/s}\).
- Step 4: Final momentum: \(\vec{p}_f = M \vec{v}_f = (0.4 v_x, 0.4 v_y)\). Conservation: \(0.4 v_x = 1.2\), \(0.4 v_y = 1.6\).
- Step 5: Solve: \(v_x = 3\ \text{m/s}\), \(v_y = 4\ \text{m/s}\). Magnitude: \(v = \sqrt{3^2 + 4^2} = 5\ \text{m/s}\). Direction: \(\theta = \tan^{-1}(v_y/v_x) = \tan^{-1}(4/3) = 53.1^\circ\) north of east.
- Step 6: Verify energy loss: Initial KE = \(0.5(0.2)(36) + 0.5(0.2)(64) = 3.6 + 6.4 = 10\ \text{J}\). Final KE = \(0.5(0.4)(25) = 5\ \text{J}\). KE lost = 5 J → perfectly inelastic. Physically consistent.
REASONING: 2D momentum conservation requires separate x and y component equations. The perfectly inelastic condition (common final velocity) provides the extra constraint to solve for both components. The 3-4-5 triangle emerges naturally from the 6-8 initial speeds scaled by mass ratio.
ANSWER: \(5\ \text{m/s}\) at \(53.1^\circ\) north of east

## COMPETENCY_QUESTION_1
QUESTION: A 2000 kg truck moving east at 15 m/s collides with a 1000 kg car moving north at 20 m/s at an intersection. The vehicles lock together. (a) Find the velocity (magnitude and direction) of the wreckage just after collision. (b) A traffic investigator measures skid marks and finds the wreckage slid 12 m before stopping. If the coefficient of kinetic friction is 0.7, was the truck speeding? (Speed limit = 50 km/h). Justify.
COMPETENCY: Interpreting physical situations using formulas and Predicting outcomes from changing variables
STEPS:
- Step 1: Recognize perfectly inelastic 2D collision. System isolated during brief impact (friction impulse negligible during collision time).
- Step 2: Apply momentum conservation in x (east) and y (north) separately to find wreckage velocity \(\vec{v}\).
- Step 3: Use work-energy theorem: friction force does work to stop wreckage. \(f_k d = \frac{1}{2} M v^2\) to find \(v\) from skid distance.
- Step 4: Compare calculated truck speed from (a) with speed limit converted to m/s.
- Step 5: Conclude whether truck exceeded limit.
ANSWER: (a) \(p_x = 2000 \times 15 = 30,000\ \text{kg·m/s}\), \(p_y = 1000 \times 20 = 20,000\ \text{kg·m/s}\). \(M = 3000\ \text{kg}\). \(v_x = 10\ \text{m/s}\), \(v_y = 6.67\ \text{m/s}\). \(v = \sqrt{10^2 + 6.67^2} = 12.0\ \text{m/s}\) at \(\tan^{-1}(6.67/10) = 33.7^\circ\) north of east. (b) From skid: \(v = \sqrt{2 \mu g d} = \sqrt{2 \times 0.7 \times 10 \times 12} = 12.96\ \text{m/s}\). Slight discrepancy due to rounding/investigator error. Truck speed from (a) = 15 m/s = 54 km/h > 50 km/h. Yes, truck was speeding.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A rocket of initial mass \(M_0 = 10,000\ \text{kg}\) (including 8,000 kg fuel) is at rest in space. It ejects exhaust gas at constant speed \(u = 2000\ \text{m/s}\) relative to the rocket. The fuel burns at constant rate \(dm/dt = -200\ \text{kg/s}\). (a) Derive the rocket's velocity as a function of time during burn. (b) Calculate the velocity when all fuel is exhausted. (c) Explain why momentum conservation applies to the rocket+exhaust system even though mass is ejected.
COMPETENCY: Unit analysis and dimensional reasoning and Applying concepts to new physical situations
STEPS:
- Step 1: Identify system = rocket + all ejected mass. No external forces in space → isolated.
- Step 2: Apply momentum conservation to rocket at time t and t+dt. Rocket mass \(m\), velocity \(v\). Ejected mass \(dm\) (negative) at velocity \(v - u\).
- Step 3: Set up differential equation: \(m dv = u dm\). Integrate from \(t=0\) to \(t\).
- Step 4: Solve for \(v(t)\) using \(m = M_0 + (dm/dt) t\).
- Step 5: Find burn time \(t_f = 8000/200 = 40\ \text{s}\), then \(v(t_f)\).
- Step 6: Explain: internal forces (rocket pushes gas, gas pushes rocket) sum to zero; total momentum of all particles remains zero.
ANSWER: (a) \(m dv = u dm\) → \(\int_0^v dv = u \int_{M_0}^m dm/m\) → \(v = u \ln(M_0/m)\). With \(m = M_0 - 200t\): \(v(t) = 2000 \ln\left(\frac{10000}{10000-200t}\right)\ \text{m/s}\). (b) At \(t = 40\ \text{s}\), \(m = 2000\ \text{kg}\). \(v = 2000 \ln(10000/2000) = 2000 \ln 5 = 2000 \times 1.609 = 3218\ \text{m/s}\). (c) The rocket and exhaust gases form an isolated system. The force on rocket by gas is equal and opposite to force on gas by rocket (Newton's 3rd law). Total momentum of all particles (rocket + every ejected gas molecule) remains zero.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The law follows directly from Newton's second and third laws and holds for all ______ and explosions in isolated systems, regardless of whether kinetic energy is conserved.

## DIAGNOSTIC_ANSWER_7
collisions

**A wrong answer ("explosions" alone) reveals the student has swapped the definition's paired noun - the law covers all collisions and explosions in isolated systems.** Collisions is the definition's own first noun of the pair, and the noun is what the blank grades. Recall the kinetic-energy clause before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Watch a cricket bowler deliver a ball: the ball gains forward momentum while the bowler ______ a tiny backward recoil.

## DIAGNOSTIC_ANSWER_8
experiences

**A wrong answer ("avoids" or "escapes") reveals the student has swapped the walkthrough's verb - the bowler experiences a tiny backward recoil.** Experiences is the walkthrough's own verb, and the verb is what the blank grades. Recall the forward-gaining ball before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Student can identify whether a given physical system is isolated, set up vector momentum conservation equations for 1D and 2D collisions/explosions, solve for unknown velocities or masses, and distinguish between elastic and inelastic outcomes using kinetic energy comparison.
