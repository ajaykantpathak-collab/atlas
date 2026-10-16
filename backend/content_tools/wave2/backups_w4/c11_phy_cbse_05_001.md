## ELI5
The coolie trudges the platform, suitcase overhead, sweating past the physics definition: the upward force never tilts toward the horizontal walk, so its work is zero. Work is the dot product W = Fd cos θ - the force's component along the displacement, times the displacement. Positive when the force helps, negative when it fights, zero when it merely holds. 1 joule is 1 newton pushed through 1 metre.

## DEFINITION
Work done by a constant force is defined as the scalar product of the force vector and the displacement vector of the point of application of the force. Mathematically, \( W = \vec{F} \cdot \vec{d} = F d \cos\theta \), where \( F \) is the magnitude of the force, \( d \) is the magnitude of the displacement, and \( \theta \) is the angle between the force and displacement vectors. Work is a scalar quantity measured in joules (J), where 1 J = 1 N·m. Work is done only when the force has a component along the direction of displacement.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can calculate the work done by a constant force in any orientation relative to displacement, correctly determining the sign (positive, negative, or zero) and explaining the physical meaning of each case. They can also identify situations where no work is done despite a non-zero force.

## SCOPE_BOUNDARY
This node covers the definition and calculation of work done by a **constant force** using the dot product. It includes the sign conventions, zero-work conditions, and the distinction between physics work and everyday usage. It does **NOT** cover work done by variable forces (calculus-based), work-energy theorem, kinetic energy, or power — these are addressed in subsequent nodes.

## WALKTHROUGH
Observe a coolie carrying a heavy suitcase on his head while walking horizontally on a railway platform — he sweats and gets tired, yet in physics the work done by his upward force on the suitcase is zero. This surprises students because the force (upward) and displacement (horizontal) are perpendicular. Start by asking: "What must be measured to decide if work is done?" Guide them to recognise that both force and displacement are vectors, and only the component of force along displacement matters. Introduce the dot product as the mathematical tool that extracts this component. Conclude with the formula \( W = F d \cos\theta \) and emphasise that \( \cos\theta \) determines the sign: positive for \( \theta < 90^\circ \), negative for \( \theta > 90^\circ \), zero for \( \theta = 90^\circ \).

Takeaway: mastery means computing work for any angle, signing it by the geometry, and spotting the zero-work traps - holding, carrying, perpendicular pushes. Exam moves: calculate-the-work questions and is-work-done items. Check yourself: effort is not work - the tired coolie proves effort is biology, while work demands a force with a share along the motion. Students miss it because they equate exertion with work, when the definition's cos θ is the whole verdict: the angle alone decides help, fight, or irrelevance.

## DIAGNOSTIC_QUESTION_1
A porter carries a 20 kg load on his head and walks 50 m on a level road at constant speed. What is the work done by the porter's upward force on the load? State the SI unit of your answer.

## DIAGNOSTIC_ANSWER_1
The work done is 0 J. The upward force (normal reaction balancing weight) is perpendicular to the horizontal displacement, so \( \theta = 90^\circ \) and \( \cos 90^\circ = 0 \). A wrong answer (e.g., calculating \( mgh \) or \( F \times d \)) reveals the student is using the everyday meaning of "work" (effort) instead of the physics definition, or they incorrectly assume force and displacement are parallel.

## DIAGNOSTIC_QUESTION_2
A block is pulled by a force of 10 N at an angle of 60° to the horizontal. The block moves 4 m horizontally. Explain why the work done by the force is not simply 10 N × 4 m = 40 J. What is the actual work done?

## DIAGNOSTIC_ANSWER_2
Work done is \( W = F d \cos\theta = 10 \times 4 \times \cos 60^\circ = 40 \times 0.5 = 20 \) J. The formula \( F \times d \) only applies when force and displacement are parallel (\( \theta = 0^\circ \)). Here, only the horizontal component \( F \cos\theta \) contributes to work. A student giving 40 J ignores the angle and treats work as a simple product of magnitudes, missing the vector nature of force and displacement.

## DIAGNOSTIC_QUESTION_3
A constant force \( \vec{F} = (3\hat{i} + 4\hat{j}) \) N acts on a particle that undergoes a displacement \( \vec{d} = (2\hat{i} - 1\hat{j}) \) m. Calculate the work done by the force. Show unit analysis.

## DIAGNOSTIC_ANSWER_3
\( W = \vec{F} \cdot \vec{d} = (3)(2) + (4)(-1) = 6 - 4 = 2 \) J. Units: N × m = J. Steps: (1) Identify components: \( F_x=3, F_y=4, d_x=2, d_y=-1 \). (2) Dot product: \( F_x d_x + F_y d_y \). (3) Compute: 6 + (-4) = 2. (4) Units: N·m = J. (5) Positive work means force component along displacement dominates. A wrong answer (e.g., 10 J from magnitude product) shows the student multiplied magnitudes instead of using the dot product, or mishandled the negative sign in the y-component.

## DIAGNOSTIC_QUESTION_4
A satellite orbits Earth in a perfectly circular orbit. The gravitational force on the satellite is always directed radially inward. Is the work done by gravity on the satellite positive, negative, or zero over one complete orbit? Justify using the definition of work.

## DIAGNOSTIC_ANSWER_4
Zero. At every instant, the gravitational force is radial while the instantaneous displacement is tangential — they are perpendicular (\( \theta = 90^\circ \)). Since \( \cos 90^\circ = 0 \), the work done at each instant is zero, so the total work over any path segment, including a full orbit, is zero. A student answering "negative because gravity pulls inward" confuses force direction with displacement direction; they must recognise that work depends on the angle between the two vectors at each point, not just the force direction.

## DIAGNOSTIC_QUESTION_5
A student argues: "When I push a wall and it doesn't move, I am applying a large force, so I am doing a lot of work." Evaluate this statement using the physics definition of work. What is the actual work done?

## DIAGNOSTIC_ANSWER_5
The statement is incorrect. Work done is \( W = F d \cos\theta \). Since the wall does not move, displacement \( d = 0 \), so \( W = 0 \) regardless of the force magnitude. The student confuses physiological effort (muscle contraction consuming chemical energy) with mechanical work on the wall. A wrong evaluation indicates the student has not internalised that displacement is a necessary condition for work to be done in physics.

## DIAGNOSTIC_QUESTION_6
Design a simple classroom demonstration using a spring balance, a wooden block, and a protractor to show that work done by a force depends on the angle between force and displacement. Describe the procedure, measurements, and how you would calculate work for three different angles.

## DIAGNOSTIC_ANSWER_6
Procedure: (1) Attach spring balance to block on a smooth table. (2) Pull the block horizontally (0°) for 0.5 m, note force reading \( F \). (3) Repeat at 60° and 90° (pulling upward at 90° so block doesn't lift). (4) Calculate work: \( W = F d \cos\theta \). At 0°: \( W = F \times 0.5 \); at 60°: \( W = F \times 0.5 \times 0.5 = 0.25F \); at 90°: \( W = 0 \). A poor answer would omit the angle variation, use the same force for all angles without adjusting for vertical component, or fail to mention that at 90° the block must not move vertically. This reveals the student cannot translate the formula into an experimental design.

## COMMON_MISCONCEPTION
Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the angle dependence. For example, they think a weightlifter holding a 150 kg barbell stationary overhead does work because the force is large and the effort is visible. They also confuse the sign of work: they assume friction always does negative work (true for kinetic friction opposing motion) but forget that static friction can do positive work (e.g., on a block on an accelerating truck). The core error is treating work as a scalar magnitude of force times distance, rather than a dot product.

## ON_FAILURE
1. Revisit the definition: "No displacement, no work." Demonstrate by pushing a heavy table that doesn't move — ask: "Did I do work on the table?" (Answer: No, \( d=0 \)).  
2. Use a force sensor and motion sensor (or spring balance and meter scale) to pull a cart at 0°, 45°, 90° for the same displacement. Record force and compute \( W = F d \cos\theta \). Plot \( W \) vs \( \theta \) — the cosine dependence becomes visible.  
3. Practice identifying \( \theta \) in diagrams: draw force and displacement vectors tail-to-tail, measure the angle between them, then compute \( \cos\theta \). Emphasise that \( \theta \) is the angle between the vectors, not the angle of the force with the horizontal unless displacement is horizontal.

## PREREQUISITE_NODE_IDS
c9_physics_ch4_1, c9_physics_ch4_2, c9_physics_ch2_1, c10_math_cbse_08_001
## PREREQUISITE_REASONS
c9_physics_ch4_1: Provides the basic definition \( W = Fs \) for parallel force and displacement, which this node generalises using the dot product.
c9_physics_ch4_2: Introduces the perpendicular force-displacement case (zero work), a special case of \( \cos 90^\circ = 0 \).
c9_physics_ch2_1: Establishes the distinction between distance and displacement — work uses displacement, not path length.
c10_math_cbse_08_001: Supplies trigonometric ratios (specifically \( \cos\theta \)) needed to compute the component of force along displacement.

## FORWARD_NODE_IDS
c11_phy_cbse_05_002, c11_phy_cbse_05_003, c11_phy_cbse_05_004, c11_phy_cbse_05_005, c11_phy_cbse_05_007, c11_phy_cbse_05_009, c11_phy_cbse_05_011, c11_phy_cbse_05_012, c12_phy_cbse_02_001, c12_phy_cbse_02_003, c12_phy_cbse_02_004, c12_phy_cbse_02_005, c12_phy_cbse_02_006, c12_phy_cbse_02_010, c12_phy_cbse_03_003, c12_phy_cbse_04_010, c12_phy_cbse_06_001, c12_phy_cbse_06_006, c12_phy_cbse_12_002, c12_phy_cbse_14_007

## FORWARD_REASONS
c11_phy_cbse_05_002: Variable force work requires integrating the constant-force definition over infinitesimal displacements.
c11_phy_cbse_05_003: Spring force work is a key application of variable-force integration, building directly on the dot product concept.
c11_phy_cbse_05_004: Kinetic energy is defined via the work-energy theorem, which starts from the work done by a net force.
c11_phy_cbse_05_005: The work-energy theorem derivation for constant force uses \( W = \vec{F} \cdot \vec{d} \) and Newton's second law.
c11_phy_cbse_05_007: Work done by a force (W = F·d) is the foundation for defining potential energy as negative of work done by conservative force.  
c11_phy_cbse_05_009: Need the definition of work done by a constant force to understand work calculations.  
c11_phy_cbse_05_011: Work definition (W = F·d) is the foundation — power is work per time.  
c11_phy_cbse_05_012: Work done by a force definition (W = F·d) is the basis for average power.  
c12_phy_cbse_02_001: Defines work done by a force, including variable forces — needed for the integration in potential definition.  
c12_phy_cbse_02_003: Work-energy theorem and conservative forces — underpins potential definition.  
c12_phy_cbse_02_004: Work done by a force (W = ∫F·dr) is needed to prove zero work on equipotentials.  
c12_phy_cbse_02_005: Work done by a force – foundation for energy transfer.  
c12_phy_cbse_02_006: Work done by a force (and torque) definition underpins the derivation.  
c12_phy_cbse_02_010: Work-energy theorem underpins the energy stored derivation and the work done by battery.  
c12_phy_cbse_03_003: Work-energy concepts help understand energy dissipation during collisions (Joule heating).  
c12_phy_cbse_04_010: Work done by a force and the concept of torsional potential energy (½ kφ²) helps understand the spring's restoring torque.  
c12_phy_cbse_06_001: Work done by a force — emf is work done per unit charge (ε = W/q), connecting to energy concepts.  
c12_phy_cbse_06_006: Defines work done by a force; here the "force" is the external voltage doing work against back emf.  
c12_phy_cbse_12_002: Work-energy theorem and potential energy concepts underpin the energy quantization in Postulate 3.  
c12_phy_cbse_14_007: Work-energy theorem and power (P=VI) are needed to compute power dissipation in resistor and Zener.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios (cosine) are essential for resolving force components and evaluating \( \cos\theta \) in the work formula.
c10_math_cbse_07_001: Coordinate geometry and distance formula underpin the vector component method for dot product (\( \vec{F} \cdot \vec{d} = F_x d_x + F_y d_y \)).

## CHAIN_DESCRIPTION
c9_physics_ch4_1 -> c11_phy_cbse_05_001 -> c11_phy_cbse_05_002

## THIS_FORMULA
\( W = \vec{F} \cdot \vec{d} = F d \cos\theta \) (SI unit: joule, J = N·m)

## FORMULA_VARIABLES
\( W \) = work done (J), \( \vec{F} \) = constant force vector (N), \( \vec{d} \) = displacement vector (m), \( F \) = magnitude of force (N), \( d \) = magnitude of displacement (m), \( \theta \) = angle between force and displacement vectors (degrees or radians)

## FORMULA_UNITS
J (joule), N (newton), m (metre), dimensionless (cosθ)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric ratio cosθ gives the component of force along displacement; without it, the dot product cannot be evaluated for non-parallel vectors.
c10_math_cbse_07_001 | Distance formula and coordinate geometry allow computation of displacement magnitude and vector components, enabling the algebraic dot product \( F_x d_x + F_y d_y \).

## PREREQ_CONCEPT
Understanding that displacement is a vector (not distance) and that force is a vector; both have magnitude and direction.

## PREREQ_BEFORE
Student must be able to resolve a vector into components and compute the dot product of two vectors given their components.

## PREREQ_STUCK
Review vector resolution and dot product from Class 11 Chapter 3 (Motion in a Plane) or Class 10 Maths coordinate geometry.

## WORKED_EXAMPLE_1
PROBLEM: A woman pushes a shopping cart with a force of 35 N directed at 25° below the horizontal. The cart moves 12 m horizontally on a smooth floor. Calculate the work done by the woman on the cart. Show all steps with units.

STEPS:
- Step 1: Identify given quantities: \( F = 35 \, \text{N} \), \( \theta = 25^\circ \) (angle below horizontal, so between force and horizontal displacement), \( d = 12 \, \text{m} \). Required: \( W \) in joules.
- Step 2: Formula: \( W = F d \cos\theta \). Check units: N × m × (dimensionless) = N·m = J. ✓
- Step 3: Substitute: \( W = (35 \, \text{N}) \times (12 \, \text{m}) \times \cos 25^\circ \).
- Step 4: Compute: \( \cos 25^\circ \approx 0.9063 \). \( W = 35 \times 12 \times 0.9063 = 380.646 \, \text{J} \).
- Step 5: Verify: Force has a forward component, so work should be positive. 380 J is reasonable for a 35 N push over 12 m. Round to 2 significant figures: 380 J (or 3.8 × 10² J).

REASONING: Only the horizontal component of the force (\( F \cos\theta \)) does work because displacement is horizontal. The vertical component presses the cart down but causes no vertical displacement, so it contributes zero work. The dot product automatically selects the correct component.

ANSWER: 380 J (or 3.8 × 10² J)

## WORKED_EXAMPLE_2
PROBLEM: A constant force \( \vec{F} = (4\hat{i} - 3\hat{j} + 2\hat{k}) \, \text{N} \) acts on a particle that moves from point \( (1, 2, -1) \, \text{m} \) to \( (4, -1, 3) \, \text{m} \). Find the work done by the force.

STEPS:
- Step 1: Given: \( \vec{F} = 4\hat{i} - 3\hat{j} + 2\hat{k} \, \text{N} \). Initial position \( \vec{r}_i = (1, 2, -1) \, \text{m} \), final position \( \vec{r}_f = (4, -1, 3) \, \text{m} \). Find displacement \( \vec{d} = \vec{r}_f - \vec{r}_i \).
- Step 2: Compute displacement: \( \vec{d} = (4-1)\hat{i} + (-1-2)\hat{j} + (3 - (-1))\hat{k} = 3\hat{i} - 3\hat{j} + 4\hat{k} \, \text{m} \).
- Step 3: Work done \( W = \vec{F} \cdot \vec{d} = F_x d_x + F_y d_y + F_z d_z \). Units: N × m = J.
- Step 4: Substitute components: \( W = (4)(3) + (-3)(-3) + (2)(4) = 12 + 9 + 8 \).
- Step 5: Sum: \( W = 29 \, \text{J} \).
- Step 6: Verify: Positive work means the force has a net component along the displacement. The calculation is consistent.

REASONING: The dot product in component form directly gives work without needing the angle. Displacement is the vector difference of final and initial positions. Each component product contributes to the scalar work.

ANSWER: 29 J

## WORKED_EXAMPLE_3
PROBLEM: A 2 kg block slides down a rough inclined plane of length 5 m and angle 30° with the horizontal. The coefficient of kinetic friction is 0.2. Calculate the work done by (a) gravity, (b) friction, (c) normal force. Use \( g = 10 \, \text{m/s}^2 \).

STEPS:
- Step 1: Draw free-body diagram. Forces: weight \( mg = 20 \, \text{N} \) downward, normal \( N \) perpendicular to plane, friction \( f = \mu N \) up the plane. Displacement \( d = 5 \, \text{m} \) down the plane.
- Step 2: Work by gravity: Angle between weight (vertical) and displacement (30° to horizontal) is 60° (since weight is 90° from horizontal, displacement is 30° from horizontal → difference = 60°). \( W_g = mg d \cos 60^\circ = 20 \times 5 \times 0.5 = 50 \, \text{J} \). Alternatively, component of weight along plane = \( mg \sin 30^\circ = 10 \, \text{N} \), \( W_g = 10 \times 5 = 50 \, \text{J} \).
- Step 3: Normal force \( N = mg \cos 30^\circ = 20 \times \frac{\sqrt{3}}{2} = 10\sqrt{3} \, \text{N} \). Friction \( f = \mu N = 0.2 \times 10\sqrt{3} = 2\sqrt{3} \, \text{N} \). Friction acts up the plane, displacement down the plane → \( \theta = 180^\circ \), \( \cos 180^\circ = -1 \). \( W_f = f d \cos 180^\circ = (2\sqrt{3}) \times 5 \times (-1) = -10\sqrt{3} \approx -17.3 \, \text{J} \).
- Step 4: Normal force is perpendicular to displacement (\( \theta = 90^\circ \)), so \( W_N = 0 \).
- Step 5: Net work \( W_{\text{net}} = 50 - 17.3 + 0 = 32.7 \, \text{J} \). This equals the change in kinetic energy (Work-Energy Theorem).

REASONING: Gravity does positive work because its component along the plane is in the direction of motion. Friction does negative work because it opposes motion. Normal force does zero work as it is always perpendicular to displacement on a rigid surface. This example combines force resolution, friction, and work sign conventions.

ANSWER: (a) 50 J, (b) -17.3 J (or -10√3 J), (c) 0 J

## COMPETENCY_QUESTION_1
QUESTION: A coolie carries a 30 kg load on his head and walks 20 m up a flight of stairs inclined at 30° to the horizontal. He then walks 40 m horizontally on the terrace. Calculate the total work done by the coolie on the load during the entire journey. Explain why the work done during the horizontal walk is zero even though the coolie feels tired.

COMPETENCY: Interpreting physical situations using formulas and distinguishing physics work from physiological effort

STEPS:
- Step 1: Understand the two segments: (i) up the stairs (displacement at 30° to horizontal), (ii) horizontal (displacement horizontal). The force exerted by the coolie is vertically upward (balancing weight) in both segments.
- Step 2: Identify the angle between force (vertical up) and displacement for each segment. On stairs: displacement is 30° above horizontal → angle with vertical = 60°. On horizontal: displacement horizontal → angle with vertical = 90°.
- Step 3: Compute work for each segment: \( W_1 = mg d_1 \cos 60^\circ = 30 \times 10 \times 20 \times 0.5 = 3000 \, \text{J} \). \( W_2 = mg d_2 \cos 90^\circ = 0 \).
- Step 4: Total work = 3000 J. Explain: On horizontal walk, force is vertical, displacement horizontal → perpendicular → zero work. The coolie tires because muscles contract internally (chemical energy converted to heat), but no mechanical work is done on the load.

ANSWER: Total work done = 3000 J. Horizontal segment contributes 0 J because force and displacement are perpendicular.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A block of mass 5 kg is pulled up a rough incline (θ = 37°, μ = 0.25) by a force of 50 N applied parallel to the incline. The block moves 4 m up the incline. Calculate the work done by (a) the applied force, (b) gravity, (c) friction, (d) normal force. Then find the net work done on the block and predict whether its kinetic energy increases or decreases. Use \( g = 10 \, \text{m/s}^2 \), \( \sin 37^\circ = 0.6 \), \( \cos 37^\circ = 0.8 \).

COMPETENCY: Predicting outcomes from changing variables and applying work-energy concepts to multi-force scenarios

STEPS:
- Step 1: List forces and their angles with displacement (up the incline). Applied force: parallel, θ = 0°. Gravity: component down incline = mg sinθ, opposite to displacement → θ = 180°. Friction: down incline (opposes motion) → θ = 180°. Normal: perpendicular → θ = 90°.
- Step 2: Compute magnitudes. \( mg = 50 \, \text{N} \). \( N = mg \cos 37^\circ = 50 \times 0.8 = 40 \, \text{N} \). \( f = \mu N = 0.25 \times 40 = 10 \, \text{N} \). Gravity component along incline = \( mg \sin 37^\circ = 50 \times 0.6 = 30 \, \text{N} \).
- Step 3: Work by each force over d = 4 m:
  (a) \( W_F = 50 \times 4 \times \cos 0^\circ = 200 \, \text{J} \)
  (b) \( W_g = 30 \times 4 \times \cos 180^\circ = -120 \, \text{J} \)
  (c) \( W_f = 10 \times 4 \times \cos 180^\circ = -40 \, \text{J} \)
  (d) \( W_N = 0 \)
- Step 4: Net work \( W_{\text{net}} = 200 - 120 - 40 = 40 \, \text{J} \).
- Step 5: By Work-Energy Theorem, \( \Delta K = W_{\text{net}} = 40 \, \text{J} > 0 \), so kinetic energy increases. The block speeds up.

ANSWER: (a) 200 J, (b) -120 J, (c) -40 J, (d) 0 J. Net work = 40 J. Kinetic energy increases.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Work done by a constant force is defined as the scalar product of the force vector and the ______ vector of the point of application of the force.

## DIAGNOSTIC_ANSWER_7
displacement

**A wrong answer ("force" or "position") reveals the student has swapped the definition's second vector - the dot product pairs the force with the displacement vector.** Displacement is the definition's own noun, and the noun is what the blank grades. Recall the coolie's horizontal walk before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a coolie carrying a heavy suitcase on his head while walking ______ on a railway platform — he sweats and gets tired, yet in physics the work done by his upward force on the suitcase is zero.

## DIAGNOSTIC_ANSWER_8
horizontally

**A wrong answer ("slowly" or "briskly") reveals the student has paraphrased the walkthrough's adverb - the coolie walks horizontally on the platform.** Horizontally is the walkthrough's own adverb, and the adverb is what the blank grades. Recall the zero-work verdict before filling, and give the adverb exactly.

## DIAGNOSTIC_QUESTION_9
What is Work done by a constant force? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Work done by a constant force is defined as the scalar product of the force vector and the displacement vector of the point of application of the force.

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: work done by a constant force is defined as the scalar product of the force vector and the displacement vector of the point of application of the force.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Work done by a constant force?

## DIAGNOSTIC_ANSWER_10
Students believe that "work is done whenever a force is applied," ignoring the requirement of displacement and the angle dependence.

**A wrong answer (force alone means work) reveals the student holds the flagged mix-up.** Work needs a displacement with a force component along it - the wall that never moves, the suitcase held level, and every perpendicular push donate exactly zero.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can calculate the work done by a constant force in any orientation relative to displacement, correctly determining the sign (positive, negative, or zero) and explaining the physical meaning of each case.

**A wrong answer (magnitude only) reveals the student has under-answered the mastery criterion.** Full mastery adds: determine the sign - positive when the force helps the motion, negative when it opposes, zero at right angles - and explain the physical meaning of each case.
