## ELI5
The fan's blades run at constant speed yet accelerate every instant - because acceleration is a change of velocity, and direction is half of velocity. For uniform circular motion the change points inward: centripetal acceleration, magnitude v²/R (equivalently ω²R), aimed at the centre. The speed never wavers; the arrow keeps rotating, and the inward pull is the price of the circle.

## DEFINITION
Centripetal acceleration is the acceleration experienced by an object moving in uniform circular motion, directed radially inward toward the centre of the circle, with magnitude \(a_c = \frac{v^2}{R} = \omega^2 R\), where \(v\) is the constant linear speed (m/s), \(R\) is the radius of the circular path (m), and \(\omega\) is the angular speed (rad/s). It arises solely due to the continuous change in the direction of the velocity vector, while its magnitude remains constant.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can derive the magnitude and direction of centripetal acceleration from the geometry of velocity vectors, compute \(a_c\) using \(v^2/R\) or \(\omega^2 R\) in multi-step problems involving period/frequency conversions, and explain why the acceleration vector is not constant despite constant magnitude.

## SCOPE_BOUNDARY
Covers uniform circular motion only: constant speed, circular path, centripetal acceleration derivation using vector geometry, and relationships among \(v\), \(\omega\), \(T\), \(\nu\), \(R\). Does NOT cover non-uniform circular motion (tangential acceleration), banking of roads, conical pendulum, or vertical circular motion (those are in later chapters).

## WALKTHROUGH
Observe a ceiling fan running at constant speed: the blades move in a circle, yet they are accelerating because their velocity direction changes at every instant. To begin, draw the circular path and mark two nearby positions P and P′. Draw velocity vectors \(\vec{v}\) and \(\vec{v}'\) tangent to the circle at those points. Using the triangle law of vector addition, find \(\Delta \vec{v} = \vec{v}' - \vec{v}\). Notice that \(\Delta \vec{v}\) points toward the centre. As \(\Delta t \to 0\), the average acceleration \(\Delta \vec{v}/\Delta t\) becomes the instantaneous centripetal acceleration \(\vec{a}_c\), always directed radially inward. Relate the arc length \(\Delta s \approx v \Delta t\) to the angle \(\Delta \theta\) and radius \(R\) to obtain \(a_c = v^2/R\).

Takeaway: mastery means deriving the inward direction from the vector triangle, computing magnitudes with period and frequency conversions, and explaining why a constant-magnitude acceleration is not a constant vector. Exam moves: find-the-centripetal-acceleration questions and convert-period-to-omega items. Check yourself: kill the inward pull and the object departs along the tangent - the circle exists only because something keeps bending the velocity. Students miss it because zero speed change reads as zero acceleration, when the definition locates acceleration in the direction turn: steady speed, rotating velocity, and the centre-bound arrow is the tell.

## DIAGNOSTIC_QUESTION_1
State the formula for centripetal acceleration in terms of linear speed \(v\) and radius \(R\), and give its SI unit.

## DIAGNOSTIC_ANSWER_1
\(a_c = \frac{v^2}{R}\); SI unit is m/s². A wrong answer (e.g., \(a_c = vR\) or unit m/s) reveals confusion between acceleration and velocity, or failure to square the speed.

a_c = v²/R, SI unit m/s². **A wrong answer (vR, or unit m/s) reveals the student confused acceleration with velocity or skipped the square.** The magnitude grows with the square of the speed and shrinks with the radius - the geometry fixes both.

## DIAGNOSTIC_QUESTION_2
In uniform circular motion, the speed is constant. Why is there still an acceleration? Explain using the vector nature of velocity.

## DIAGNOSTIC_ANSWER_2
Velocity is a vector; its direction changes continuously along the circular path. Acceleration is the rate of change of velocity, so a change in direction alone produces acceleration directed toward the centre. A wrong answer (e.g., "no acceleration because speed is constant") reveals the misconception that acceleration only occurs when speed changes.

## DIAGNOSTIC_QUESTION_3
A particle moves in a circle of radius 0.5 m with a constant speed of 4 m/s. Calculate its centripetal acceleration and angular speed.

## DIAGNOSTIC_ANSWER_3
Given: \(R = 0.5\ \text{m}\), \(v = 4\ \text{m/s}\).
Step 1: \(a_c = \frac{v^2}{R} = \frac{16}{0.5} = 32\ \text{m/s}^2\).
Step 2: \(\omega = \frac{v}{R} = \frac{4}{0.5} = 8\ \text{rad/s}\).
Answer: \(a_c = 32\ \text{m/s}^2\), \(\omega = 8\ \text{rad/s}\). A wrong answer (e.g., using \(v/R\) for acceleration) reveals formula confusion.

## DIAGNOSTIC_QUESTION_4
Two particles A and B move in uniform circular motion. Particle A has radius \(R\) and speed \(v\). Particle B has radius \(2R\) and speed \(2v\). Compare their centripetal accelerations.

## DIAGNOSTIC_ANSWER_4
\(a_{c,A} = \frac{v^2}{R}\); \(a_{c,B} = \frac{(2v)^2}{2R} = \frac{4v^2}{2R} = 2\frac{v^2}{R} = 2a_{c,A}\). Particle B has twice the centripetal acceleration. A wrong answer (e.g., "same" or "four times") reveals inability to handle combined scaling of \(v\) and \(R\).

## DIAGNOSTIC_QUESTION_5
A student claims: "In uniform circular motion, the acceleration vector is constant because its magnitude \(v^2/R\) is constant." Evaluate this statement.

## DIAGNOSTIC_ANSWER_5
The statement is false. Although the magnitude of centripetal acceleration is constant, its direction continuously changes — always pointing toward the centre. A vector is constant only if both magnitude and direction are constant. A wrong evaluation (e.g., "true") reveals confusion between scalar constancy and vector constancy.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a conical pendulum (a bob on a string moving in a horizontal circle) to verify that centripetal acceleration is proportional to the square of the angular speed. Describe the measurements needed and the graph to plot.

## DIAGNOSTIC_ANSWER_6
Measure the period \(T\) for different string lengths \(L\) (or different radii \(R\)) by timing 20 revolutions. Compute \(\omega = 2\pi/T\) and \(a_c = \omega^2 R\) (using geometry to find \(R = L \sin\theta\)). Plot \(a_c\) vs \(\omega^2\); the slope should equal \(R\). A poor answer (e.g., "measure speed with a stopwatch") reveals lack of understanding of how to isolate variables and use graphical verification.

## COMMON_MISCONCEPTION
Students often think that because the speed is constant in uniform circular motion, the acceleration is zero. They confuse "constant speed" with "constant velocity" and forget that acceleration is the rate of change of the velocity vector, not just its magnitude. For example, a car turning a corner at constant 30 km/h is accelerating because its direction changes.

## ON_FAILURE
1. Revisit the definition of acceleration as \(\vec{a} = \frac{d\vec{v}}{dt}\) (from c11_phy_cbse_03_009). 2. Draw velocity vectors at three points on a circle and perform vector subtraction \(\vec{v}_2 - \vec{v}_1\) graphically to see the resultant points inward. 3. Use a simple simulation (e.g., PhET "Ladybug Revolution") to visualise velocity and acceleration vectors in real time. 4. Practice deriving \(a_c = v^2/R\) from similar triangles until the geometric reasoning is clear.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_03_001, c11_phy_cbse_03_009, c9_physics_ch2_10, c9_physics_ch2_3, c9_physics_ch2_5, c11_phy_cbse_03_008, c11_phy_cbse_03_011, c11_phy_cbse_03_012, c11_phy_cbse_03_013

## PREREQUISITE_REASONS
c11_phy_cbse_03_001: Understanding vectors (magnitude, direction, addition/subtraction) is essential for deriving centripetal acceleration from velocity vectors.
c11_phy_cbse_03_009: Position and displacement vectors in a plane provide the framework for describing circular motion geometry.
c9_physics_ch2_10: Prior introduction to uniform circular motion in Class 9 gives the basic idea of circular motion and centripetal force.
c9_physics_ch2_3: Velocity as a vector quantity (magnitude and direction) is the foundation for understanding why direction change implies acceleration.
c9_physics_ch2_5: Acceleration definition and units are needed to interpret centripetal acceleration as a physical quantity.
c11_phy_cbse_03_008: Uniform circular motion requires centripetal force and angular velocity vectors; cross product relates v = ω × r.  
c11_phy_cbse_03_011: Uniform circular motion uses the same vector decomposition and constant acceleration concepts but in a radial/tangential frame.  
c11_phy_cbse_03_012: Uniform circular motion uses similar parametric-to-Cartesian elimination techniques (though for a circle, not a parabola), reinforcing the mathematical method.  
c11_phy_cbse_03_013: Uniform circular motion uses the concept of centripetal acceleration derived from vector change, similar to how projectile range/height uses vector components. Both topics apply vector resolution to analyze 2D motion.  

## FORWARD_NODE_IDS
c12_phy_cbse_04_003

## FORWARD_REASONS
This is the last node in Chapter 3 (Motion in a Plane). Subsequent chapters (e.g., Laws of Motion) will apply centripetal acceleration to dynamics (centripetal force), but no further kinematics nodes in this chapter depend on it.
c12_phy_cbse_04_003: Covers uniform circular motion, centripetal force \( mv^2/r \), and the concept that perpendicular force changes direction only.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c10_math_cbse_08_006, c9_math_ch5_1, c8_math_ch9_5
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios (sin, cos) are used to resolve velocity components and relate angle to arc length in the derivation.
c10_math_cbse_08_006: The identity \(\sin^2\theta + \cos^2\theta = 1\) underpins the Pythagorean relation used in magnitude calculations.
c9_math_ch5_1: Circle terminology (radius, chord, arc, tangent) is essential for the geometric construction of the derivation.
c8_math_ch9_5: Pythagoras theorem is used in the similar-triangles derivation of \(a_c = v^2/R\).

## CHAIN_DESCRIPTION
c11_phy_cbse_03_001 -> c11_phy_cbse_03_009 -> c11_phy_cbse_03_014 -> none

## THIS_FORMULA
\(a_c = \frac{v^2}{R} = \omega^2 R = 4\pi^2 \nu^2 R = \frac{4\pi^2 R}{T^2}\) (SI unit: m/s²)

## FORMULA_VARIABLES
\(a_c\) = centripetal acceleration (m/s²), \(v\) = linear speed (m/s), \(R\) = radius of circular path (m), \(\omega\) = angular speed (rad/s), \(\nu\) = frequency (Hz = s⁻¹), \(T\) = time period (s)

## FORMULA_UNITS
m/s², m/s, m, rad/s, Hz, s

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric ratios resolve velocity into components and relate linear speed to angular speed via \(v = \omega R\).
c9_math_ch5_1 | Circle geometry (tangent perpendicular to radius) is used to establish that velocity is perpendicular to the position vector, making the velocity-change triangle similar to the position triangle.

## PREREQ_CONCEPT
Vector subtraction and the limit definition of instantaneous acceleration (\(\vec{a} = \lim_{\Delta t \to 0} \frac{\Delta \vec{v}}{\Delta t}\)) are the core mathematical tools needed to derive centripetal acceleration.

## PREREQ_BEFORE
The student must be able to perform vector subtraction graphically (tail-to-tip or parallelogram method) and understand that acceleration is the rate of change of the velocity vector, not just speed.

## PREREQ_STUCK
If stuck, review vector subtraction (c11_phy_cbse_03_001) and the graphical method for finding \(\Delta \vec{v}\) (c11_phy_cbse_03_009). Practice drawing velocity vectors at two close points on a circle and finding the direction of \(\Delta \vec{v}\).

## WORKED_EXAMPLE_1
PROBLEM: A ceiling fan blade of length 0.6 m rotates at 1200 revolutions per minute (rpm). Calculate the centripetal acceleration of the tip of the blade. Express your answer in m/s² and also as a multiple of \(g\) (take \(g = 9.8\ \text{m/s}^2\)).

STEPS:
- Step 1: Identify given quantities: radius \(R = 0.6\ \text{m}\) (blade length), frequency \(\nu = 1200\ \text{rpm} = \frac{1200}{60} = 20\ \text{Hz}\). Find: \(a_c\) in m/s² and in \(g\)'s.
- Step 2: Choose formula linking \(a_c\) to frequency and radius: \(a_c = 4\pi^2 \nu^2 R\).
- Step 3: Substitute values with units: \(a_c = 4 \times (3.1416)^2 \times (20)^2 \times 0.6\ \text{m/s}^2\).
- Step 4: Compute stepwise: \(\pi^2 \approx 9.87\); \(4\pi^2 \approx 39.48\); \(\nu^2 = 400\); \(39.48 \times 400 = 15792\); \(15792 \times 0.6 = 9475.2\ \text{m/s}^2\).
- Step 5: Convert to \(g\)'s: \(\frac{9475.2}{9.8} \approx 967\ g\).
- Step 6: Check reasonableness: Fan tips experience huge acceleration (hundreds of g), consistent with high rpm. Final answer: \(a_c \approx 9.5 \times 10^3\ \text{m/s}^2\) or \(967\ g\).

REASONING: The fan rotates at constant angular speed, so uniform circular motion applies. Frequency is given in rpm, so conversion to Hz is necessary. The formula \(a_c = 4\pi^2 \nu^2 R\) directly uses frequency and radius, avoiding an intermediate calculation of \(v\) or \(\omega\).

ANSWER: \(a_c \approx 9.5 \times 10^3\ \text{m/s}^2\) (or \(9475\ \text{m/s}^2\)), which is about \(967\ g\).

## WORKED_EXAMPLE_2
PROBLEM: A cyclist rides on a circular track of radius 50 m at a constant speed of 10 m/s. (a) What is the magnitude of the centripetal acceleration? (b) If the cyclist and bicycle have a total mass of 80 kg, what is the magnitude of the net force acting on them? (c) What provides this force?

STEPS:
- Step 1: Given: \(R = 50\ \text{m}\), \(v = 10\ \text{m/s}\), \(m = 80\ \text{kg}\). Find: \(a_c\), net force \(F_c\), and force provider.
- Step 2: Use \(a_c = \frac{v^2}{R}\) for magnitude of centripetal acceleration.
- Step 3: Substitute: \(a_c = \frac{10^2}{50} = \frac{100}{50} = 2\ \text{m/s}^2\).
- Step 4: Apply Newton's second law for uniform circular motion: \(F_c = m a_c = 80 \times 2 = 160\ \text{N}\).
- Step 5: Direction of \(F_c\) is same as \(a_c\): toward the centre of the circular track.
- Step 6: Identify the physical force: The friction force between the tyres and the road (or the component of normal reaction if the track is banked) provides the necessary centripetal force. Since the track is flat (implied), it is static friction.

REASONING: Part (a) is direct kinematics. Part (b) connects kinematics to dynamics via \(F = ma\) (from Laws of Motion chapter). Part (c) requires identifying the real force that plays the role of centripetal force in this specific situation — a common board exam question type.

ANSWER: (a) \(a_c = 2\ \text{m/s}^2\) toward centre. (b) \(F_c = 160\ \text{N}\) toward centre. (c) Static friction between tyres and road provides the centripetal force.

## WORKED_EXAMPLE_3
PROBLEM: A particle moves in a circle of radius \(R\) with constant angular speed \(\omega\). At \(t = 0\), its position vector is \(\vec{r}(0) = R\hat{i}\). Write the position vector \(\vec{r}(t)\), velocity vector \(\vec{v}(t)\), and acceleration vector \(\vec{a}(t)\) as functions of time. Verify that \(\vec{a}(t) = -\omega^2 \vec{r}(t)\).

STEPS:
- Step 1: The angle swept at time \(t\) is \(\theta = \omega t\). Position vector: \(\vec{r}(t) = R\cos(\omega t)\hat{i} + R\sin(\omega t)\hat{j}\).
- Step 2: Velocity is derivative of position: \(\vec{v}(t) = \frac{d\vec{r}}{dt} = -R\omega\sin(\omega t)\hat{i} + R\omega\cos(\omega t)\hat{j}\).
- Step 3: Speed magnitude: \(v = \sqrt{(-R\omega\sin)^2 + (R\omega\cos)^2} = R\omega\) (constant, as expected).
- Step 4: Acceleration is derivative of velocity: \(\vec{a}(t) = \frac{d\vec{v}}{dt} = -R\omega^2\cos(\omega t)\hat{i} - R\omega^2\sin(\omega t)\hat{j}\).
- Step 5: Factor out \(-\omega^2\): \(\vec{a}(t) = -\omega^2 [R\cos(\omega t)\hat{i} + R\sin(\omega t)\hat{j}] = -\omega^2 \vec{r}(t)\).
- Step 6: Magnitude: \(a = \omega^2 R = \frac{v^2}{R}\). Direction: opposite to \(\vec{r}(t)\), i.e., radially inward. This confirms the centripetal acceleration formula and its vector nature.

REASONING: This example uses calculus (differentiation) to derive the vector expressions from the parametric equation of a circle. It combines the concepts of position vector (c11_phy_cbse_03_009), uniform circular motion, and the definition of acceleration as the time derivative of velocity. The result \(\vec{a} = -\omega^2 \vec{r}\) shows explicitly that acceleration is always directed opposite to the position vector (toward the centre) and has constant magnitude \(\omega^2 R\).

ANSWER: \(\vec{r}(t) = R\cos(\omega t)\hat{i} + R\sin(\omega t)\hat{j}\); \(\vec{v}(t) = -R\omega\sin(\omega t)\hat{i} + R\omega\cos(\omega t)\hat{j}\); \(\vec{a}(t) = -R\omega^2\cos(\omega t)\hat{i} - R\omega^2\sin(\omega t)\hat{j} = -\omega^2 \vec{r}(t)\). Magnitude \(a = \omega^2 R = v^2/R\), direction radially inward.

## COMPETENCY_QUESTION_1
QUESTION: A car moves on a horizontal circular road of radius 100 m. The coefficient of static friction between the tyres and the road is 0.4. (a) Find the maximum speed the car can have without skidding. (b) If the car travels at half this maximum speed, what is its centripetal acceleration? (c) Explain why the friction force is static, not kinetic, when the car is not skidding.

COMPETENCY: Interpreting physical situations using formulas and identifying the role of forces in circular motion.

STEPS:
- Step 1: Understand that the centripetal force required for circular motion is provided entirely by static friction on a horizontal road.
- Step 2: Maximum static friction \(f_{s,\text{max}} = \mu_s N = \mu_s mg\). This equals the required centripetal force \(m v_{\text{max}}^2 / R\).
- Step 3: Solve for \(v_{\text{max}}\): \(\mu_s mg = m v_{\text{max}}^2 / R \Rightarrow v_{\text{max}} = \sqrt{\mu_s g R}\).
- Step 4: Substitute \(\mu_s = 0.4\), \(g = 9.8\ \text{m/s}^2\), \(R = 100\ \text{m}\): \(v_{\text{max}} = \sqrt{0.4 \times 9.8 \times 100} = \sqrt{392} \approx 19.8\ \text{m/s}\).
- Step 5: Half of maximum speed: \(v = 9.9\ \text{m/s}\). Centripetal acceleration \(a_c = v^2/R = (9.9)^2 / 100 \approx 0.98\ \text{m/s}^2\).
- Step 6: Explain: The contact patch of the tyre does not slide relative to the road; it grips. Static friction acts to prevent relative motion. Kinetic friction would imply sliding (skidding), which is not happening.

ANSWER: (a) \(v_{\text{max}} \approx 19.8\ \text{m/s}\) (≈ 71 km/h). (b) \(a_c \approx 0.98\ \text{m/s}^2\). (c) The tyre rolls without slipping at the contact point; static friction provides the necessary centripetal force without dissipation.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A simple pendulum of length \(L = 1.0\ \text{m}\) is made to move in a horizontal circle (conical pendulum) such that the string makes a constant angle \(\theta = 30^\circ\) with the vertical. (a) Find the radius \(R\) of the circular path. (b) Derive an expression for the period \(T\) of this conical pendulum in terms of \(L\), \(\theta\), and \(g\). (c) Calculate \(T\) for the given values. (d) If the length is doubled while keeping \(\theta\) the same, how does the period change?

COMPETENCY: Predicting outcomes from changing variables and applying vector resolution to circular motion dynamics.

STEPS:
- Step 1: Geometry: Radius \(R = L \sin\theta = 1.0 \times \sin 30^\circ = 0.5\ \text{m}\).
- Step 2: Forces on bob: Tension \(T\) along string, weight \(mg\) downward. Vertical equilibrium: \(T \cos\theta = mg\). Horizontal: \(T \sin\theta = m a_c = m \omega^2 R\).
- Step 3: Divide horizontal by vertical: \(\tan\theta = \frac{\omega^2 R}{g}\). Substitute \(R = L \sin\theta\): \(\tan\theta = \frac{\omega^2 L \sin\theta}{g} \Rightarrow \omega^2 = \frac{g}{L \cos\theta}\).
- Step 4: Period \(T = \frac{2\pi}{\omega} = 2\pi \sqrt{\frac{L \cos\theta}{g}}\).
- Step 5: Substitute \(L = 1.0\ \text{m}\), \(\theta = 30^\circ\), \(g = 9.8\ \text{m/s}^2\): \(\cos 30^\circ = \sqrt{3}/2 \approx 0.866\). \(T = 2\pi \sqrt{\frac{1.0 \times 0.866}{9.8}} = 2\pi \sqrt{0.0884} \approx 2\pi \times 0.297 \approx 1.87\ \text{s}\).
- Step 6: If \(L\) is doubled to \(2.0\ \text{m}\) with same \(\theta\), \(T \propto \sqrt{L}\), so new period \(T' = \sqrt{2} \times T \approx 1.414 \times 1.87 \approx 2.64\ \text{s}\). Period increases by factor \(\sqrt{2}\).

ANSWER: (a) \(R = 0.5\ \text{m}\). (b) \(T = 2\pi \sqrt{\frac{L \cos\theta}{g}}\). (c) \(T \approx 1.87\ \text{s}\). (d) Period increases by factor \(\sqrt{2}\) (to about 2.64 s).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: It arises solely due to the ______ change in the direction of the velocity vector, while its magnitude remains constant.

## DIAGNOSTIC_ANSWER_7
continuous

**A wrong answer ("sudden" or "partial") reveals the student has paraphrased the definition's adjective - the change in direction is continuous.** Continuous is the definition's own adjective, and the adjective is what the blank grades. Recall the every-instant turning before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ceiling fan running at constant speed: the blades move in a circle, yet they are ______ because their velocity direction changes at every instant.

## DIAGNOSTIC_ANSWER_8
accelerating

**A wrong answer ("turning" or "moving") reveals the student has paraphrased the walkthrough's participle - the blades are accelerating because their direction changes.** Accelerating is the walkthrough's own participle, and the participle is what the blank grades. Recall the constant speed clause before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_9
What is Centripetal acceleration? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
It arises solely due to the continuous change in the direction of the velocity vector, while its magnitude remains constant.

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: it arises solely due to the continuous change in the direction of the velocity vector, while its magnitude remains constant - quote it with the sole-cause clause intact.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Centripetal acceleration?

## DIAGNOSTIC_ANSWER_10
Students often think that because the speed is constant in uniform circular motion, the acceleration is zero.

**A wrong answer (zero acceleration for constant speed) reveals the student holds the flagged mix-up.** Speed is a magnitude; velocity is magnitude plus direction - the direction turns every instant, and that turn is the acceleration, aimed at the centre.
