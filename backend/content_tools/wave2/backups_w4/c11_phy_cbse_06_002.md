## ELI5
A Diwali rocket bursts mid-flight, fragments spraying everywhere - yet their centre of mass sails on the original parabola as if nothing happened. The rule: total mass times the centre-of-mass acceleration equals the net external force. Internal explosions cancel by Newton's third law and cannot vote; only external forces steer the system's dot. The whole art of extended bodies begins here - track the dot, and the chaos inside stays inside.

## DEFINITION
The motion of the centre of mass of a system of particles is governed by the equation \( M \vec{A}_{cm} = \vec{F}_{ext} \), where \( M \) is the total mass of the system, \( \vec{A}_{cm} \) is the acceleration of the centre of mass, and \( \vec{F}_{ext} \) is the vector sum of all external forces acting on the system. The centre of mass moves as if the entire mass of the system were concentrated at that point and all external forces were applied there, regardless of the internal motions or rotations of individual particles.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the velocity and acceleration of the centre of mass for a given system of particles, apply \( M \vec{A}_{cm} = \vec{F}_{ext} \) to predict the trajectory of the centre of mass under external forces (e.g., gravity), and explain why internal forces (like explosion forces or mutual gravitational attraction) do not alter the centre-of-mass motion.

## SCOPE_BOUNDARY
This node covers the derivation of centre-of-mass velocity and acceleration from the position vector definition, the proof that internal forces cancel in pairs (Newton's third law), the equation of motion for the centre of mass, and the principle of conservation of linear momentum when net external force is zero. It does NOT cover angular momentum, torque, rotational dynamics, or moment of inertia (those are in subsequent nodes c11_phy_cbse_06_004 onwards).

## WALKTHROUGH
Observe a firework rocket launched during Diwali: it follows a parabolic path, then explodes into many coloured fragments that scatter in all directions. Surprisingly, the centre of mass of all fragments continues along the *original* parabolic path as if the explosion never happened. Begin by asking: "What force acts on the rocket before and after explosion?" (Gravity, external). "What forces cause the fragments to fly apart?" (Internal chemical forces). Write the position vector of the centre of mass \( \vec{R}_{cm} = \frac{\sum m_i \vec{r}_i}{M} \), differentiate twice with respect to time, and identify \( \vec{F}_{ext} = M \vec{A}_{cm} \). Emphasise that the summation of internal forces vanishes because they occur in equal and opposite pairs. Conclude that for any system — rigid or deforming — the centre of mass obeys Newton's second law with only external forces.

Takeaway: mastery means differentiating the centre-of-mass position to velocity and acceleration, and applying the external-force law to explosions and collapsing systems. Exam moves: predict-the-trajectory questions and why-internal-forces-fail items. Check yourself: a shell fired upward explodes at the top - the dot still rises and falls on schedule, whatever the fragments do. Students miss it because the drama commands attention, when the definition's law is blind to it: internal forces come in cancelling pairs, and only the outside world can move the dot.

## DIAGNOSTIC_QUESTION_1
State the formula for the velocity of the centre of mass of a system of n particles and give its SI unit.

## DIAGNOSTIC_ANSWER_1
\( \vec{V}_{cm} = \frac{\sum_{i=1}^n m_i \vec{v}_i}{M} \), SI unit: m/s. A wrong answer (e.g., omitting the denominator M or using scalar addition) reveals the student has not grasped that centre-of-mass velocity is a mass-weighted average, not a simple arithmetic mean.

## DIAGNOSTIC_QUESTION_2
A child sits at one end of a long trolley moving uniformly on a smooth horizontal floor. The child gets up and runs about on the trolley. What happens to the speed of the centre of mass of the (trolley + child) system? Explain why.

## DIAGNOSTIC_ANSWER_2
The speed of the centre of mass remains unchanged (equal to the initial trolley speed V). The forces between child and trolley are internal; no external horizontal force acts, so \( \vec{F}_{ext} = 0 \Rightarrow \vec{A}_{cm} = 0 \). A student who says the speed changes confuses internal motion with centre-of-mass motion and ignores that frictionless floor implies zero external horizontal force.

## DIAGNOSTIC_QUESTION_3
Two particles of masses 2 kg and 3 kg move along the x-axis with velocities \( 4 \hat{i} \) m/s and \( -2 \hat{i} \) m/s respectively. Calculate the velocity of their centre of mass.

## DIAGNOSTIC_ANSWER_3
Given: \( m_1 = 2 \) kg, \( \vec{v}_1 = 4 \hat{i} \) m/s; \( m_2 = 3 \) kg, \( \vec{v}_2 = -2 \hat{i} \) m/s. Total mass \( M = 5 \) kg.
\( \vec{V}_{cm} = \frac{2 \times 4 \hat{i} + 3 \times (-2 \hat{i})}{5} = \frac{8 \hat{i} - 6 \hat{i}}{5} = \frac{2 \hat{i}}{5} = 0.4 \hat{i} \) m/s.
Unit check: (kg·m/s)/kg = m/s ✓. A wrong sign or arithmetic error shows the student cannot handle vector addition with signs or mass-weighting.

## DIAGNOSTIC_QUESTION_4
A projectile of mass 5 kg is fired at 60° with speed 100 m/s. At the highest point it explodes into two fragments of masses 2 kg and 3 kg. The 2 kg fragment comes to rest immediately after explosion. Find the velocity of the 3 kg fragment just after explosion. (Take g = 10 m/s², ignore air resistance.)

## DIAGNOSTIC_ANSWER_4
At highest point, projectile velocity is purely horizontal: \( v_x = 100 \cos 60° = 50 \) m/s.
Initial momentum: \( \vec{p}_i = 5 \times 50 \hat{i} = 250 \hat{i} \) kg·m/s.
After explosion: 2 kg fragment has \( \vec{v}_1 = 0 \), 3 kg fragment has \( \vec{v}_2 \).
Conservation of momentum (no external horizontal force): \( 250 \hat{i} = 2 \times 0 + 3 \vec{v}_2 \Rightarrow \vec{v}_2 = \frac{250}{3} \hat{i} \approx 83.3 \hat{i} \) m/s.
A student who uses energy conservation or ignores the horizontal-only momentum conservation reveals confusion between elastic/inelastic processes and the vector nature of momentum.

## DIAGNOSTIC_QUESTION_5
A student argues: "When a bomb at rest explodes into two pieces, the pieces fly in opposite directions with equal speeds because momentum is conserved." Evaluate this statement and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
The statement is **false**. Momentum conservation gives \( m_1 \vec{v}_1 + m_2 \vec{v}_2 = 0 \Rightarrow \vec{v}_2 = -\frac{m_1}{m_2} \vec{v}_1 \). Speeds are equal **only if masses are equal** (\( m_1 = m_2 \)). For unequal masses, the lighter piece has greater speed. A student who agrees has oversimplified momentum conservation to "equal and opposite speeds" instead of "equal and opposite momenta".

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a low-friction trolley, a ball, and a spring-loaded launcher to demonstrate that the centre of mass of the (trolley + ball) system moves with constant velocity when the ball is launched internally. Describe the measurements needed.

## DIAGNOSTIC_ANSWER_6
Place a ball in a spring launcher fixed on a trolley on a smooth horizontal track. Release the spring so the ball shoots forward and the trolley recoils backward. Use a smartphone camera to record the motion. Track positions of trolley centre and ball frame-by-frame. Compute \( x_{cm} = \frac{m_{trolley} x_{trolley} + m_{ball} x_{ball}}{M} \) for each frame. Plot \( x_{cm} \) vs time; it should be a straight line (constant velocity). A poor design would omit mass measurements, use a rough surface (external friction), or fail to track both objects simultaneously.

## COMMON_MISCONCEPTION
Students believe that if a system breaks apart (explosion, collision, separation), the centre of mass *accelerates* or *changes its path* because "the pieces are moving differently now". They conflate the complex internal motions of fragments with the motion of the centre of mass, forgetting that internal forces sum to zero. For example, in the firework rocket, they think the centre of mass "falls straight down" or "speeds up" after explosion, whereas it continues the original parabola under gravity alone.

## ON_FAILURE
Step 1: Revisit the derivation \( M \vec{A}_{cm} = \sum \vec{F}_{ext} + \sum \vec{F}_{int} \) and explicitly write the internal force pairs \( \vec{F}_{ij} = -\vec{F}_{ji} \) to show their sum is zero. Step 2: Use the "exploding projectile" simulation (PhET or similar) — pause at explosion, mark the centre of mass of all fragments, and step forward frame by frame to see it follow the original parabola. Step 3: Solve a problem where a moving object splits into two unequal masses; calculate fragment velocities using momentum conservation, then compute the centre-of-mass velocity before and after to verify it is unchanged.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_06_001, c9_physics_ch3_4, c9_physics_ch3_5, c9_physics_ch3_6
## PREREQUISITE_REASONS
c11_phy_cbse_06_001: Provides the definition and calculation of centre of mass position vector, which is the starting point for differentiating to get velocity and acceleration.
c9_physics_ch3_4: Newton's second law (F = ma) for a single particle is extended to systems of particles here.
c9_physics_ch3_5: Newton's third law (action-reaction pairs) is essential to prove internal forces cancel.
c9_physics_ch3_6: Conservation of momentum for a system of particles is the direct consequence when F_ext = 0.

## FORWARD_NODE_IDS
c11_phy_cbse_06_004, c11_phy_cbse_06_005, c11_phy_cbse_06_014, c11_phy_cbse_06_003

## FORWARD_REASONS
c11_phy_cbse_06_004: Torque and angular momentum require understanding that translational motion of the centre of mass separates from rotational motion about the centre of mass.
c11_phy_cbse_06_005: Angular momentum conservation builds on linear momentum conservation (F_ext = 0 ⇔ τ_ext = 0 analogies).
c11_phy_cbse_06_014: Rolling motion combines translation of centre of mass (this node) with rotation about centre of mass (later nodes).
c11_phy_cbse_06_003: Motion of centre of mass introduces **V** = **P**/M, leading to **L** = **R** × **P** + Σ**r**'_i × **p**'_i.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_001, c11_math_cbse_10_002, c11_math_cbse_10_003
## CROSS_SUBJECT_REASONS
c11_math_ch10_1: Vector algebra (addition, scalar multiplication) is needed to handle position, velocity, and acceleration vectors of the centre of mass.
c11_math_ch10_2: Dot and cross products appear in later rotational nodes; vector differentiation is used here.
c11_math_ch10_3: Differentiation of vector functions (d𝐫/dt = 𝐯, d𝐯/dt = 𝐚) is the mathematical tool to go from position to velocity to acceleration of the centre of mass.
c11_math_cbse_10_001: Cross-subject support: In the Cartesian coordinate system, a point is uniquely identified by an ordered pair (x,... supplies tools/facts used directly in this node.  
c11_math_cbse_10_002: Cross-subject support: The distance between two points \(P(x1, y1)\) and \(Q(x2, y2)\) in the Cartesian plane is... supplies tools/facts used directly in this node.  
c11_math_cbse_10_003: Cross-subject support: The section formula for internal division gives the coordinates of a point P(x, y) that di... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_06_001 -> c11_phy_cbse_06_002 -> c11_phy_cbse_06_004 (Centre of mass definition → Motion of centre of mass → Torque and rotational dynamics)

## THIS_FORMULA
\( \vec{V}_{cm} = \frac{\sum m_i \vec{v}_i}{M} \), \( \vec{A}_{cm} = \frac{\sum m_i \vec{a}_i}{M} \), \( M \vec{A}_{cm} = \vec{F}_{ext} \) (SI units: m/s, m/s², N)

## FORMULA_VARIABLES
\( \vec{V}_{cm} \) = velocity of centre of mass (m/s), \( \vec{A}_{cm} \) = acceleration of centre of mass (m/s²), \( m_i \) = mass of i-th particle (kg), \( \vec{v}_i \) = velocity of i-th particle (m/s), \( \vec{a}_i \) = acceleration of i-th particle (m/s²), \( M = \sum m_i \) = total mass (kg), \( \vec{F}_{ext} \) = net external force on the system (N)

## FORMULA_UNITS
m/s, m/s², kg, N

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch10_1 | Vector addition and scalar multiplication are used to compute the mass-weighted sum of position/velocity vectors for the centre of mass.
c11_math_ch10_3 | Differentiation of vector functions with respect to time converts the centre-of-mass position vector into velocity and acceleration vectors.

## PREREQ_CONCEPT
Newton's second and third laws for a system of particles, and the definition of centre of mass position vector.

## PREREQ_BEFORE
The student must be able to calculate the centre of mass position for a discrete system of particles and state Newton's second and third laws.

## PREREQ_STUCK
If stuck, review c11_phy_cbse_06_001 (centre of mass formula) and Class 9 Newton's laws (c9_physics_ch3_4, c9_physics_ch3_5) — especially the vector form and action-reaction pairs.

## WORKED_EXAMPLE_1
PROBLEM: A 4 kg block moving at 10 m/s on a smooth horizontal surface explodes into two fragments of masses 1 kg and 3 kg. The 1 kg fragment moves forward at 20 m/s relative to the ground. Find the velocity of the 3 kg fragment and the velocity of the centre of mass before and after the explosion.
STEPS:
- Step 1: Identify given quantities: m₁ = 1 kg, m₂ = 3 kg, M = 4 kg, initial velocity Vᵢ = 10 m/s (forward), v₁ = 20 m/s (forward). Find v₂ and V_cm before/after.
- Step 2: Apply conservation of linear momentum (no external horizontal force): M Vᵢ = m₁ v₁ + m₂ v₂.
- Step 3: Substitute values with units: (4 kg)(10 m/s) = (1 kg)(20 m/s) + (3 kg) v₂ → 40 kg·m/s = 20 kg·m/s + 3 kg·v₂.
- Step 4: Solve for v₂: 3 kg·v₂ = 20 kg·m/s → v₂ = 6.67 m/s (forward). Compute V_cm before = 10 m/s; after = (1×20 + 3×6.67)/4 = 40/4 = 10 m/s.
- Step 5: Verify: V_cm unchanged (10 m/s) as expected because F_ext = 0. Units consistent: kg·m/s / kg = m/s. Answer physically reasonable (lighter piece faster, heavier slower).
REASONING: The explosion forces are internal, so total momentum is conserved. The centre-of-mass velocity equals total momentum divided by total mass, so it remains constant when F_ext = 0. This example shows the separation of internal dynamics (fragment velocities change) from centre-of-mass motion (unchanged).
ANSWER: Velocity of 3 kg fragment = 6.67 m/s forward; V_cm before = 10 m/s forward; V_cm after = 10 m/s forward.

## WORKED_EXAMPLE_2
PROBLEM: Two particles of masses 2 kg and 5 kg are connected by a light spring and placed on a smooth horizontal table. The 2 kg mass is pulled aside and released, so both masses oscillate. At a certain instant, the 2 kg mass has velocity 3 m/s to the right and the 5 kg mass has velocity 1 m/s to the left. Find the velocity of the centre of mass and the total kinetic energy of the system relative to the centre of mass frame.
STEPS:
- Step 1: Given: m₁ = 2 kg, v₁ = +3 m/s; m₂ = 5 kg, v₂ = -1 m/s. M = 7 kg. Find V_cm and K_rel (kinetic energy in CM frame).
- Step 2: Compute V_cm = (m₁v₁ + m₂v₂)/M = (2×3 + 5×(-1))/7 = (6 - 5)/7 = 1/7 ≈ 0.143 m/s (right).
- Step 3: Find velocities in CM frame: v₁' = v₁ - V_cm = 3 - 0.143 = 2.857 m/s; v₂' = v₂ - V_cm = -1 - 0.143 = -1.143 m/s.
- Step 4: Compute K_rel = ½ m₁(v₁')² + ½ m₂(v₂')² = 0.5×2×(2.857)² + 0.5×5×(1.143)² = 8.16 + 3.27 = 11.43 J.
- Step 5: Verify total lab-frame KE = ½×2×3² + ½×5×1² = 9 + 2.5 = 11.5 J; CM-frame KE = ½ M V_cm² = 0.5×7×(0.143)² ≈ 0.07 J; Sum = 11.43 + 0.07 ≈ 11.5 J ✓ (K_total = K_cm + K_rel).
REASONING: The spring forces are internal, so V_cm is constant. The kinetic energy separates into translational KE of the centre of mass plus internal (vibrational) KE about the centre of mass — a key concept for later thermodynamics and rigid-body dynamics.
ANSWER: V_cm = 0.143 m/s to the right; Kinetic energy relative to CM = 11.43 J.

## WORKED_EXAMPLE_3
PROBLEM: A 60 kg astronaut floating in space (no external forces) throws a 2 kg tool at 8 m/s away from the spaceship. The astronaut is initially at rest relative to the spaceship. (a) Find the astronaut's recoil velocity. (b) How far does the astronaut drift in 10 s? (c) Where is the centre of mass of the (astronaut + tool) system relative to the spaceship after 10 s?
STEPS:
- Step 1: System: astronaut (m_A = 60 kg) + tool (m_T = 2 kg). Initial total momentum = 0 (both at rest relative to spaceship). No external forces → momentum conserved.
- Step 2: (a) Let v_A = astronaut velocity, v_T = +8 m/s (away from ship). Conservation: 0 = m_A v_A + m_T v_T → v_A = - (m_T/m_A) v_T = - (2/60)×8 = -0.267 m/s (toward ship).
- Step 3: (b) Distance drifted in 10 s: d_A = |v_A| × t = 0.267 m/s × 10 s = 2.67 m toward spaceship.
- Step 4: (c) Tool distance from ship: d_T = v_T × t = 8 × 10 = 80 m away. Centre of mass position from ship: X_cm = (m_A d_A + m_T d_T)/M with signs. Take ship as origin, away positive. X_cm = (60×(-2.67) + 2×80)/62 = (-160 + 160)/62 = 0 m.
- Step 5: (c continued) Centre of mass remains at the spaceship (origin) because it started at rest there and F_ext = 0. This holds even though both objects moved.
- Step 6: Verify units: kg·m/s / kg = m/s; m/s × s = m. Physically reasonable: light tool moves fast, heavy astronaut moves slow; CM stays put.
REASONING: This classic "astronaut throwing a tool" problem demonstrates that internal forces (astronaut pushing tool) cannot move the centre of mass of an isolated system. The centre of mass remains fixed in the inertial frame (spaceship frame) while the parts move apart with momenta equal in magnitude and opposite in direction.
ANSWER: (a) -0.267 m/s (toward spaceship); (b) 2.67 m toward spaceship; (c) Centre of mass remains at the spaceship (0 m displacement).

## COMPETENCY_QUESTION_1
QUESTION: A uniform rod of mass M and length L lies on a smooth horizontal table. A small insect of mass m starts at one end and crawls to the other end with constant speed u relative to the rod. The rod is free to move. Describe the motion of the centre of mass of the (rod + insect) system and find the displacement of the rod when the insect reaches the other end.
COMPETENCY: Predicting outcomes from changing variables and applying conservation principles to a deformable system
STEPS:
- Step 1: Recognise no external horizontal forces → centre of mass of (rod + insect) system remains stationary (initially at rest).
- Step 2: Let x_R be rod displacement (left negative), x_I be insect displacement relative to ground. Insect displacement relative to rod = L = x_I - x_R.
- Step 3: Centre of mass fixed: M x_R + m x_I = 0 (initial CM at origin).
- Step 4: Solve: x_I = L + x_R → M x_R + m(L + x_R) = 0 → (M+m)x_R = -mL → x_R = -mL/(M+m).
- Step 5: Rod moves opposite to insect's crawl by distance mL/(M+m). CM stays fixed.
ANSWER: Centre of mass remains stationary at its initial position. Rod displacement = -mL/(M+m) (opposite to insect's direction).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A firework rocket of mass 0.5 kg is launched vertically upward with initial speed 50 m/s. At its maximum height, it explodes into three fragments of masses 0.1 kg, 0.2 kg, and 0.2 kg. The 0.1 kg fragment moves horizontally at 30 m/s. The 0.2 kg fragment moves vertically downward at 20 m/s. Find the velocity (magnitude and direction) of the third fragment immediately after explosion. (g = 10 m/s²)
COMPETENCY: Interpreting physical situations using vector momentum conservation in 2D
STEPS:
- Step 1: At max height, rocket velocity = 0. So initial momentum = 0. Explosion forces internal → total momentum conserved = 0.
- Step 2: Define axes: x horizontal, y vertical upward. Fragment 1 (0.1 kg): v₁ = 30 î m/s. Fragment 2 (0.2 kg): v₂ = -20 ĵ m/s. Fragment 3 (0.2 kg): v₃ = ?
- Step 3: Momentum conservation: 0.1(30 î) + 0.2(-20 ĵ) + 0.2 v₃ = 0 → 3 î - 4 ĵ + 0.2 v₃ = 0.
- Step 4: Solve: 0.2 v₃ = -3 î + 4 ĵ → v₃ = -15 î + 20 ĵ m/s.
- Step 5: Magnitude = √(15² + 20²) = 25 m/s. Direction: angle θ = tan⁻¹(20/15) = 53.1° above negative x-axis (i.e., 126.9° from +x axis).
ANSWER: Third fragment velocity = 25 m/s at 53.1° above the horizontal toward the negative x-direction (or 126.9° from +x axis).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The centre of mass moves as if the entire mass of the system were ______ at that point and all external forces were applied there, regardless of the internal motions or rotations of individual particles.

## DIAGNOSTIC_ANSWER_7
concentrated

**A wrong answer ("assembled" or "placed") reveals the student has paraphrased the definition's participle - the mass is concentrated at that point.** Concentrated is the definition's own participle, and the participle is what the blank grades. Recall the regardless-of-internal-motions clause before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a firework rocket launched during Diwali: it follows a parabolic path, then explodes into many coloured fragments that scatter in all ______.

## DIAGNOSTIC_ANSWER_8
directions

**A wrong answer ("places" or "patterns") reveals the student has swapped the walkthrough's noun - the fragments scatter in all directions.** Directions is the walkthrough's own noun, and the noun is what the blank grades. Recall the unchanged parabola before filling, and give the noun exactly.
