## ELI5
Slide a block down two ramps of the same height: on frictionless surfaces it arrives at the same speed whichever way it wound down - gravity keeps no diary of the route. A conservative force's work depends only on endpoints; round any closed loop and it nets zero, which is exactly the licence that lets a potential energy exist. Friction reads every metre travelled - non-conservative, and forever locked out of the potential-energy club.

## DEFINITION
A force is **conservative** if the work done by it on an object moving between two points depends only on the initial and final positions, not on the path taken; equivalently, the work done by a conservative force over any closed loop is zero. A force is **non-conservative** if the work done depends on the path taken, so the work over a closed loop is non-zero (typically negative for dissipative forces like friction). The SI unit of work (and energy) is the joule (J). Conservative forces allow the definition of a potential energy function \( V(\vec{r}) \) such that \( \vec{F} = -\nabla V \); non-conservative forces do not have an associated potential energy.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can (1) classify a given force as conservative or non-conservative by checking path-independence or the closed-loop work condition, (2) explain why friction and air resistance are non-conservative while gravity and spring forces are conservative, and (3) apply the work-energy theorem in the presence of both conservative and non-conservative forces to compute changes in mechanical energy.

## SCOPE_BOUNDARY
This node covers the definitions, mathematical criteria (path-independence, closed-loop work, existence of potential energy), and examples of conservative (gravitational, spring, electrostatic) and non-conservative (kinetic friction, air resistance, tension in a rope with friction) forces. It does NOT cover the derivation of potential energy functions for specific forces (covered in nodes 007, 008) or the full conservation of mechanical energy principle (node 010). It stays within one-dimensional and simple three-dimensional cases as per Class 11 NCERT.

## WALKTHROUGH
Observe a block sliding down two different ramps of the same height from rest: one smooth, one rough. On the smooth ramp, the block reaches the bottom with the same speed regardless of the ramp's shape (straight, curved, stepped) – only the vertical height matters. On the rough ramp, the final speed depends on the ramp's length and shape because friction does more work over a longer path. This path-dependence is the hallmark of a non-conservative force. Begin by asking: "If I move a book from the floor to a table via a straight lift versus a long winding path, does gravity do the same work? Does friction?" This connects to the work-energy theorem (node 005) and potential energy (nodes 007, 008). The key principle: **For a conservative force, \( W_{\text{closed}} = 0 \) and \( \vec{F} = -\nabla V \); for a non-conservative force, \( W_{\text{closed}} \neq 0 \) and no potential energy can be defined.**

Takeaway: mastery means testing forces by path-independence or the closed-loop condition, and sorting gravity and springs from friction and drag. Exam moves: classify-the-force questions and which-forces-allow-potential items. Check yourself: the winding path to the table taxes only the friction - gravity's bill is the same as the straight lift. Students miss it because work feels path-shaped by habit, when the definition splits the force kingdom in two: conservative forces keep accounts by endpoints alone, and non-conservative ones read the whole travelogue.

## DIAGNOSTIC_QUESTION_1
State the defining property of a conservative force in terms of work done over a closed path. What is the SI unit of work?

## DIAGNOSTIC_ANSWER_1
A conservative force does zero net work over any closed path (\( W_{\text{closed}} = 0 \)). The SI unit of work is the joule (J). A wrong answer (e.g., "work depends on path" or "unit is newton") reveals the student confuses conservative with non-conservative forces or confuses force and work units.

## DIAGNOSTIC_QUESTION_2
A block is moved from point A to point B along two different paths: Path 1 is a straight line, Path 2 is a longer curved path. The gravitational force does work \( W_1 \) and \( W_2 \) respectively. The kinetic friction force does work \( W'_1 \) and \( W'_2 \). Compare \( W_1 \) and \( W_2 \), and compare \( W'_1 \) and \( W'_2 \). Explain why.

## DIAGNOSTIC_ANSWER_2
For gravity (conservative), \( W_1 = W_2 \) because work depends only on vertical height difference. For kinetic friction (non-conservative), \( |W'_2| > |W'_1| \) (both negative) because friction opposes motion and its work magnitude is \( \mu_k mg \times \text{path length} \). A wrong answer (e.g., saying \( W_1 \neq W_2 \)) shows the student does not grasp path-independence of conservative forces.

## DIAGNOSTIC_QUESTION_3
A 2 kg block slides down a rough inclined plane of length 5 m and height 3 m. The coefficient of kinetic friction is 0.2. Calculate the work done by gravity and the work done by friction. Use \( g = 10 \, \text{m/s}^2 \).

## DIAGNOSTIC_ANSWER_3
**Given:** \( m = 2 \, \text{kg} \), \( L = 5 \, \text{m} \), \( h = 3 \, \text{m} \), \( \mu_k = 0.2 \), \( g = 10 \, \text{m/s}^2 \).  
**Step 1:** Work by gravity = \( mgh = 2 \times 10 \times 3 = 60 \, \text{J} \) (positive, independent of path length).  
**Step 2:** Normal force \( N = mg \cos\theta \). \( \cos\theta = \sqrt{L^2 - h^2}/L = 4/5 = 0.8 \). So \( N = 2 \times 10 \times 0.8 = 16 \, \text{N} \).  
**Step 3:** Friction force \( f_k = \mu_k N = 0.2 \times 16 = 3.2 \, \text{N} \).  
**Step 4:** Work by friction = \( -f_k \times L = -3.2 \times 5 = -16 \, \text{J} \) (negative, depends on path length).  
**Answer:** \( W_g = 60 \, \text{J} \), \( W_f = -16 \, \text{J} \). A wrong answer (e.g., using \( h \) for friction work) shows confusion between conservative and non-conservative work calculation.

## DIAGNOSTIC_QUESTION_4
A particle moves in a closed loop under the action of a force \( \vec{F} = (3x^2y)\hat{i} + (x^3)\hat{j} \) N. Determine if this force is conservative by computing the work done over the rectangular path with vertices (0,0), (2,0), (2,1), (0,1) and back to (0,0). (Hint: Compute \( \oint \vec{F} \cdot d\vec{r} \) or check if \( \partial F_y/\partial x = \partial F_x/\partial y \).)

## DIAGNOSTIC_ANSWER_4
Check the 2D condition: \( \partial F_x/\partial y = 3x^2 \), \( \partial F_y/\partial x = 3x^2 \). They are equal, so the force is conservative. Alternatively, compute line integral: along each segment, the total work sums to zero. A wrong answer (e.g., non-zero work) indicates the student cannot apply the curl condition or evaluate line integrals correctly.

## DIAGNOSTIC_QUESTION_5
A student claims: "Since the normal force does no work (it's perpendicular to displacement), it must be a conservative force." Evaluate this statement. Is the normal force conservative? Why or why not?

## DIAGNOSTIC_ANSWER_5
The statement is false. A force that does zero work for a particular displacement (because it's perpendicular) is not necessarily conservative. Conservativity requires zero work for *every* closed path. The normal force can do work if the surface moves (e.g., a block on an accelerating wedge). Moreover, the normal force is a constraint force that adjusts to prevent penetration; it cannot be expressed as the gradient of a scalar potential. A wrong evaluation shows the student confuses "zero work in a specific situation" with the general definition of a conservative force.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a spring, a block, and a rough horizontal surface to demonstrate that the spring force is conservative while kinetic friction is non-conservative. Describe the measurements you would take and the expected outcome.

## DIAGNOSTIC_ANSWER_6
**Experiment:** Compress the spring by distance \( x \) and release the block. Measure the maximum distance \( d \) the block travels before stopping. Repeat with different compression distances. For a conservative spring force, the initial spring potential energy \( \frac{1}{2}kx^2 \) equals the work done by friction \( -\mu_k mg d \). Plot \( x^2 \) vs \( d \); a straight line through the origin confirms spring energy is fully converted to friction work, showing spring force is conservative (energy stored and recovered) and friction is non-conservative (energy dissipated). A poor design (e.g., not varying \( x \), ignoring friction's path-dependence) reveals the student cannot link the concepts to a testable prediction.

## COMMON_MISCONCEPTION
Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force, tension in a pendulum string). They also believe that **if a force is constant in magnitude, it must be conservative** (e.g., kinetic friction has constant magnitude \( \mu_k N \) but is non-conservative). The exact error: confusing "work done in a specific displacement" with "work done over any closed path". For example, the tension in a pendulum string does no work because it's always perpendicular to velocity, but if the string is wound around a peg, tension can do work and is not derivable from a potential – it's a constraint force, not a conservative force in the sense of having a potential energy function.

## ON_FAILURE
1. Revisit the definition: "Work done over a closed loop is zero" – test this with a specific closed path for the force in question.  
2. For normal force/tension: imagine a scenario where the constraint moves (e.g., block on an accelerating cart) and compute work.  
3. For constant magnitude forces: compute work over a closed rectangular path for friction (non-zero) vs gravity (zero).  
4. Practice classifying forces using the two criteria: (a) path-independence of work, (b) existence of a potential energy function \( V \) such that \( \vec{F} = -\nabla V \).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_001, c11_phy_cbse_05_002, c11_phy_cbse_05_005, c11_phy_cbse_05_007, c11_phy_cbse_05_008, c11_phy_cbse_05_003

## PREREQUISITE_REASONS
c11_phy_cbse_05_001: Need the definition of work done by a constant force to understand work calculations.  
c11_phy_cbse_05_002: Need calculus-based work for variable forces to evaluate path integrals for conservative forces.  
c11_phy_cbse_05_005: Work-energy theorem provides the framework linking work to kinetic energy change.  
c11_phy_cbse_05_007: Gravitational potential energy is the prime example of a conservative force's potential energy.  
c11_phy_cbse_05_008: Spring potential energy is the second key example of a conservative force with a defined potential energy function.
c11_phy_cbse_05_003: Uses the spring force as the primary example of a conservative force (work depends only on endpoints, zero over closed loop) to define conservative vs non-conservative forces.  

## FORWARD_NODE_IDS
c11_phy_cbse_05_010, c11_phy_cbse_05_013, c12_phy_cbse_02_001, c12_phy_cbse_02_005, c12_phy_cbse_02_006, c12_phy_cbse_02_007, c12_phy_cbse_05_007, c12_phy_cbse_06_002, c12_phy_cbse_14_003

## FORWARD_REASONS
c11_phy_cbse_05_010: Conservation of mechanical energy requires identifying which forces are conservative so that total mechanical energy (K+V) is conserved when only conservative forces do work.  
c11_phy_cbse_05_013: In collisions, distinguishing conservative (elastic) vs non-conservative (inelastic) interactions relies on whether kinetic energy is conserved, which ties back to the nature of the forces during collision.
c12_phy_cbse_02_001: Defines conservative forces and potential energy — electrostatic force is conservative, enabling potential definition.  
c12_phy_cbse_02_005: Conservative forces and potential energy – establishes path-independence.  
c12_phy_cbse_02_006: Conservative force concept ensures path-independence of potential energy.  
c12_phy_cbse_02_007: Conservative and Non-Conservative Forces — electrostatic force is conservative, enabling potential definition.  
c12_phy_cbse_05_007: Conservative vs non-conservative forces — hysteresis loss is a non-conservative, dissipative process; connects to work done in a closed cycle.  
c12_phy_cbse_06_002: Conservation of mechanical energy — the fundamental principle from which Lenz's law derives; without it, the negative sign has no physical basis.  
c12_phy_cbse_14_003: Conservative forces and potential energy concepts underlie the relationship between electric field and potential barrier (E = -dV/dx).  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_05_001, c11_math_cbse_05_002, c11_math_cbse_05_003
## CROSS_SUBJECT_REASONS
c11_math_ch05_001: Line integrals of vector fields (work done) are used to compute work along a path and check path-independence.  
c11_math_ch05_002: The condition \( \partial F_y/\partial x = \partial F_x/\partial y \) (zero curl in 2D) is a mathematical test for a force being conservative.  
c11_math_ch05_003: Potential energy function \( V(x,y) \) is a scalar field whose gradient gives the conservative force; this connects to partial derivatives and exact differentials.
c11_math_cbse_05_001: Cross-subject support: Complex numbers are an extension of the real number system, defined as numbers of the form... supplies tools/facts used directly in this node.  
c11_math_cbse_05_002: Cross-subject support: A complex number is a number of the form \( z = a + ib \), where \( a \) and \( b \) are r... supplies tools/facts used directly in this node.  
c11_math_cbse_05_003: Cross-subject support: Addition and subtraction of complex numbers are performed by separately adding or subtract... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_05_005 -> c11_phy_cbse_05_009 -> c11_phy_cbse_05_010

## THIS_FORMULA
Conservative force condition: \( W_{\text{closed}} = \oint \vec{F} \cdot d\vec{r} = 0 \)  OR  \( \vec{F} = -\nabla V \) (i.e., \( F_x = -\frac{\partial V}{\partial x}, F_y = -\frac{\partial V}{\partial y}, F_z = -\frac{\partial V}{\partial z} \))  OR  \( \frac{\partial F_y}{\partial x} = \frac{\partial F_x}{\partial y} \) (in 2D). Non-conservative: \( W_{\text{closed}} \neq 0 \).

## FORMULA_VARIABLES
\( \vec{F} \) = force vector (N), \( d\vec{r} \) = displacement vector (m), \( W \) = work done (J), \( V \) = potential energy function (J), \( \nabla \) = gradient operator (1/m), \( x,y,z \) = coordinates (m).

## FORMULA_UNITS
N (newton), m (metre), J (joule)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch05_001 | Line integrals compute work done by a force along a path; path-independence is the defining property of conservative forces.  
c11_math_ch05_002 | The 2D curl condition \( \partial F_y/\partial x = \partial F_x/\partial y \) is a mathematical test for a force field to be conservative (exact differential).  
c11_math_ch05_003 | Potential energy \( V \) is a scalar field; the force is its negative gradient \( \vec{F} = -\nabla V \), linking vector calculus to physics.

## PREREQ_CONCEPT
Work done by a force (constant and variable) and the work-energy theorem.

## PREREQ_BEFORE
The student must be able to calculate work done by a constant force (\( W = Fd\cos\theta \)) and by a variable force using integration (\( W = \int \vec{F} \cdot d\vec{r} \)), and state the work-energy theorem (\( \Delta K = W_{\text{net}} \)).

## PREREQ_STUCK
Review the calculation of work for constant and variable forces (nodes 001, 002) and the work-energy theorem (node 005). Practice computing line integrals for simple force fields.

## WORKED_EXAMPLE_1
PROBLEM: A 0.5 kg block is pushed against a horizontal spring (spring constant \( k = 200 \, \text{N/m} \)) compressing it by 0.1 m. The block is released on a rough horizontal surface with coefficient of kinetic friction \( \mu_k = 0.15 \). How far does the block travel before stopping? Use \( g = 10 \, \text{m/s}^2 \).
STEPS:
- Step 1: Identify the forces doing work: spring force (conservative) and kinetic friction (non-conservative). Initial and final kinetic energies are zero (starts and ends at rest).
- Step 2: Initial spring potential energy \( U_i = \frac{1}{2} k x^2 = \frac{1}{2} \times 200 \times (0.1)^2 = 1 \, \text{J} \). Final spring potential energy \( U_f = 0 \) (spring uncompressed).
- Step 3: Work done by friction \( W_f = -f_k d = -\mu_k m g d \). Here \( f_k = 0.15 \times 0.5 \times 10 = 0.75 \, \text{N} \).
- Step 4: Apply work-energy theorem including non-conservative work: \( \Delta K = W_{\text{spring}} + W_f \). Since \( \Delta K = 0 \), \( 0 = (U_i - U_f) + W_f = 1 - 0.75 d \).
- Step 5: Solve for \( d \): \( 0.75 d = 1 \Rightarrow d = 1 / 0.75 = 1.33 \, \text{m} \).
REASONING: The spring force is conservative, so its work equals the negative change in spring potential energy. Friction is non-conservative; its work is path-dependent (here, simply \( -f_k d \)) and dissipates the initial stored energy. The work-energy theorem accounts for both.
ANSWER: \( d = 1.33 \, \text{m} \)

## WORKED_EXAMPLE_2
PROBLEM: A 2 kg particle moves in the xy-plane under a force \( \vec{F} = (4xy)\hat{i} + (2x^2)\hat{j} \) N. Calculate the work done by this force as the particle moves from (0,0) to (2,2) along two paths: (a) straight line \( y = x \), (b) piecewise path: (0,0) → (2,0) → (2,2). Is the force conservative?
STEPS:
- Step 1: Check the 2D conservative condition: \( F_x = 4xy \), \( F_y = 2x^2 \). Compute \( \partial F_y/\partial x = 4x \), \( \partial F_x/\partial y = 4x \). They are equal, so the force is conservative. Work should be path-independent.
- Step 2: Path (a): \( y = x \), \( dy = dx \). \( \vec{F} \cdot d\vec{r} = 4x^2 dx + 2x^2 dx = 6x^2 dx \). Integrate from 0 to 2: \( W_a = \int_0^2 6x^2 dx = 2x^3|_0^2 = 16 \, \text{J} \).
- Step 3: Path (b): Segment 1: (0,0) to (2,0): \( y=0, dy=0 \). \( F_x = 0 \), so \( W_1 = 0 \). Segment 2: (2,0) to (2,2): \( x=2, dx=0 \). \( F_y = 2(4) = 8 \). \( W_2 = \int_0^2 8 dy = 16 \, \text{J} \). Total \( W_b = 16 \, \text{J} \).
- Step 4: Both paths give 16 J, confirming path-independence.
- Step 5: Find potential energy: \( F_x = -\partial V/\partial x \Rightarrow V = -2x^2 y + f(y) \). Then \( F_y = -\partial V/\partial y = 2x^2 - f'(y) = 2x^2 \Rightarrow f'(y)=0 \). So \( V = -2x^2 y + C \). Work = \( -\Delta V = -[V(2,2)-V(0,0)] = -[-16 - 0] = 16 \, \text{J} \).
REASONING: The equality of mixed partial derivatives guarantees the force is conservative, so work is path-independent. The potential energy function can be found by integrating the force components.
ANSWER: \( W = 16 \, \text{J} \) for both paths; the force is conservative.

## WORKED_EXAMPLE_3
PROBLEM: A 1 kg block slides from rest at point A (height 5 m) down a frictionless curved track to point B (height 2 m), then travels on a rough horizontal surface ( \( \mu_k = 0.2 \) ) for 3 m to point C, then up a frictionless incline to point D where it momentarily stops. Find the height of point D above the ground. Use \( g = 10 \, \text{m/s}^2 \).
STEPS:
- Step 1: Identify conservative forces (gravity) and non-conservative force (kinetic friction on horizontal part only). Mechanical energy is conserved on frictionless segments.
- Step 2: A to B (frictionless): \( mgh_A = mgh_B + K_B \Rightarrow K_B = mg(h_A - h_B) = 1 \times 10 \times (5-2) = 30 \, \text{J} \).
- Step 3: B to C (horizontal rough): Work by friction \( W_f = -\mu_k mg \times d = -0.2 \times 1 \times 10 \times 3 = -6 \, \text{J} \). \( K_C = K_B + W_f = 30 - 6 = 24 \, \text{J} \).
- Step 4: C to D (frictionless incline): \( K_C = mg(h_D - h_C) \). Here \( h_C = 2 \, \text{m} \) (same as B). So \( 24 = 1 \times 10 \times (h_D - 2) \Rightarrow h_D - 2 = 2.4 \Rightarrow h_D = 4.4 \, \text{m} \).
- Step 5: Alternatively, total initial energy = \( mgh_A = 50 \, \text{J} \). Total work by friction = -6 J. Final energy at D = \( mgh_D \). So \( mgh_D = mgh_A + W_f \Rightarrow 10 h_D = 50 - 6 = 44 \Rightarrow h_D = 4.4 \, \text{m} \).
- Step 6: Verify: D is lower than A (5 m) because friction dissipated 6 J. Physically reasonable.
REASONING: The problem combines conservative (gravity) and non-conservative (friction) forces. On frictionless segments, mechanical energy is conserved. On the rough segment, the work-energy theorem with non-conservative work gives the energy loss. The total work by friction equals the loss in mechanical energy.
ANSWER: \( h_D = 4.4 \, \text{m} \)

## COMPETENCY_QUESTION_1
QUESTION: A block of mass \( m \) is attached to a spring of spring constant \( k \) on a rough horizontal surface (\( \mu_k \)). The block is pulled to stretch the spring by \( x_0 \) and released from rest. It passes through the equilibrium position and continues to compress the spring until it stops at compression \( x_1 \). Derive an expression for \( x_1 \) in terms of \( x_0, m, k, \mu_k, g \). Explain why the spring force is conservative but friction is not, based on the work done over the full cycle from \( x_0 \) to \( x_1 \) and back to \( x_0 \).
COMPETENCY: Interpreting physical situations using formulas and explaining the nature of forces.
STEPS:
- Step 1: Apply work-energy theorem from initial (stretch \( x_0 \), v=0) to final (compression \( x_1 \), v=0). Forces: spring (conservative) and friction (non-conservative).
- Step 2: Initial spring PE = \( \frac{1}{2} k x_0^2 \), final spring PE = \( \frac{1}{2} k x_1^2 \). Work by friction = \( -\mu_k mg (x_0 + x_1) \) (distance traveled = \( x_0 + x_1 \)).
- Step 3: \( \Delta K = 0 = W_{\text{spring}} + W_{\text{friction}} = (\frac{1}{2} k x_0^2 - \frac{1}{2} k x_1^2) - \mu_k mg (x_0 + x_1) \).
- Step 4: Solve: \( \frac{1}{2} k (x_0^2 - x_1^2) = \mu_k mg (x_0 + x_1) \Rightarrow \frac{1}{2} k (x_0 - x_1) = \mu_k mg \Rightarrow x_1 = x_0 - \frac{2\mu_k mg}{k} \).
- Step 5: Over a full cycle (out and back to \( x_0 \)), spring work = 0 (conservative), friction work = \( -2\mu_k mg (x_0 + x_1) \neq 0 \) (non-conservative).
ANSWER: \( x_1 = x_0 - \frac{2\mu_k mg}{k} \). Spring force is conservative because its work over a closed loop is zero; friction is non-conservative because its work over a closed loop is negative (energy dissipated).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A particle of mass \( m \) moves in a vertical plane under gravity and a position-dependent force \( \vec{F} = (-\alpha y)\hat{i} + (-\alpha x)\hat{j} \) where \( \alpha > 0 \) is a constant. (a) Show that this force is conservative and find its potential energy function \( V(x,y) \) with \( V(0,0)=0 \). (b) The particle is released from rest at \( (x_0, 0) \). Find its speed when it reaches \( (0, y_0) \). (c) If a kinetic friction force \( \vec{f}_k = -\mu_k mg \hat{v} \) also acts, can mechanical energy be conserved? Explain.
COMPETENCY: Predicting outcomes from changing variables and applying the concept of conservative forces in 2D.
STEPS:
- Step 1: Check conservativity: \( F_x = -\alpha y \), \( F_y = -\alpha x \). \( \partial F_y/\partial x = -\alpha \), \( \partial F_x/\partial y = -\alpha \). Equal, so conservative.
- Step 2: Find V: \( F_x = -\partial V/\partial x \Rightarrow V = \alpha xy + f(y) \). \( F_y = -\partial V/\partial y = -\alpha x - f'(y) = -\alpha x \Rightarrow f'(y)=0 \). So \( V = \alpha xy \) (with V(0,0)=0).
- Step 3: (b) Initial energy: \( E_i = mg(0) + \alpha x_0 \cdot 0 = 0 \)? Wait: gravitational PE is \( mgy \). So total potential = \( mgy + \alpha xy \). At \( (x_0,0) \): \( V_i = 0 \). At \( (0,y_0) \): \( V_f = mg y_0 + 0 \). Conservation: \( 0 = \frac{1}{2}mv^2 + mgy_0 \Rightarrow v = \sqrt{2gy_0} \)? But initial total energy is 0, final is \( K + mgy_0 \). This gives imaginary v if y0>0. The problem likely implies the force \( \vec{F} \) is the only force besides gravity? Re-read: "under gravity and a position-dependent force". So total conservative force = gravity + F. Then potential energy = \( mgy + \alpha xy \). At (x0,0): V=0. At (0,y0): V = mg y0. Energy conservation: 0 = K + mg y0 => K = -mg y0, impossible for y0>0. So the particle cannot reach (0,y0) if y0>0 unless initial energy >0. The question says "released from rest at (x0,0)". So initial energy = 0. It can only go to points where V <= 0. For (0,y0), V = mg y0 >0, so unreachable. This is a trick! The student must recognize the constraint.
- Step 4: (c) With kinetic friction, mechanical energy is not conserved because friction is non-conservative. Work-energy theorem: \( \Delta K + \Delta V = W_{\text{friction}} < 0 \).
ANSWER: (a) Conservative; \( V(x,y) = \alpha xy \). (b) The particle cannot reach \( (0,y_0) \) if \( y_0 > 0 \) because total mechanical energy would need to increase without external work; the maximum y is 0. (c) No, kinetic friction is non-conservative (\( W_{\text{closed}} \neq 0 \)), so mechanical energy decreases.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A force is conservative if the work done by it on an object moving between two points depends only on the initial and final positions, not on the path taken; ______, the work done by a conservative force over any closed loop is zero.

## DIAGNOSTIC_ANSWER_7
equivalently

**A wrong answer ("therefore" or "moreover") reveals the student has swapped the definition's connective - equivalently, the closed-loop work of a conservative force is zero.** Equivalently is the definition's own connective, and the word is what the blank grades. Recall the endpoints-only rule before filling, and give the word exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a block sliding down two different ramps of the same ______ from rest: one smooth, one rough.

## DIAGNOSTIC_ANSWER_8
height

**A wrong answer ("length" or "angle") reveals the student has swapped the walkthrough's noun - the two ramps share the same height.** Height is the walkthrough's own noun, and the noun is what the blank grades. Recall the smooth-versus-rough pair before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can (1) classify a given force as conservative or non-conservative by checking path-independence or the closed-loop work condition, (2) explain why friction and air resistance are non-conservative while gravity and spring forces are conservative, and (3) apply the work-energy theorem in the presence of both conservative and.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ a block sliding down two different ramps of the same height from rest: one smooth, one rough.

## DIAGNOSTIC_ANSWER_10
Observe

**A wrong answer ("Imagine" or "Picture") reveals the student has swapped the walkthrough's opener - observe a block sliding down two ramps.** Observe is the walkthrough's own opening word, and the word is what the blank grades. Recall the friction contrast before filling, and fill the word exactly as written.
