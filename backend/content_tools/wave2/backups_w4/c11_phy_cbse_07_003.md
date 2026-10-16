## ELI5
Two lead spheres, a suspended rod, a whisper of twist - Cavendish weighed the world by measuring gravity's smallest handshake. G, the universal gravitational constant, sizes the attraction between unit masses at unit separation, identical everywhere in the universe. The torsion balance converts an imperceptible force into a readable angle, and the balance of torques hands over the constant that makes the inverse-square law arithmetic.

## DEFINITION
The gravitational constant \( G \) is the universal proportionality constant in Newton's law of universal gravitation that quantifies the strength of the gravitational force between two point masses. Its experimentally determined value is \( G = 6.67 \times 10^{-11} \, \text{N} \, \text{m}^2 \, \text{kg}^{-2} \). It is a scalar constant that remains invariant across the universe and is measured using a torsion balance (Cavendish experiment) where the tiny gravitational torque between known masses is balanced against the restoring torque of a twisted wire.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) derive the expression for \( G \) from the torque equilibrium condition in the Cavendish experiment, (2) calculate \( G \) from given experimental parameters (masses, separation, torsion constant, angle of twist) with correct unit handling, and (3) explain why the Cavendish experiment measures \( G \) and not \( g \), including the role of the torsion constant \( \tau \).

## SCOPE_BOUNDARY
This node covers the Cavendish torsion balance experiment for determining \( G \), the derivation of the formula \( G = \frac{\tau \theta d^2}{M m L} \), and numerical problems based on this setup. It does NOT cover modern methods of measuring \( G \) (e.g., atom interferometry), the historical development before Cavendish, or the measurement of \( g \) (acceleration due to gravity) which is covered in subsequent nodes.

## WALKTHROUGH
Observe that when you bring two large lead spheres near two small spheres on a suspended rod, the rod twists slightly — this is the gravitational force in action, but it is far too weak to measure with a spring balance. Start by recalling Newton's law \( F = G \frac{M m}{d^2} \) from the previous node (c11_phy_cbse_07_002). The Cavendish apparatus converts this tiny force into a measurable twist angle \( \theta \) using a torsion wire. The key insight is that at equilibrium, the gravitational torque \( F \times L \) equals the restoring torque \( \tau \theta \). By independently measuring the torsion constant \( \tau \) (using a known torque), we can solve for \( G \). The critical formula connecting the measurable quantities is \( G = \frac{\tau \theta d^2}{M m L} \).

Takeaway: mastery means reading the Cavendish torque balance, extracting G from measurable quantities, and explaining why the experiment measures G rather than g. Exam moves: derive-the-constant questions and explain-the-apparatus items. Check yourself: the twist angle is the translation - a force too small for any scale, made visible by a wire's stubbornness. Students miss it because they conflate G with g, when the definition separates them: G is the universal coupling between any two masses, g the local field of one particular planet, and only the former belongs to the universe at large.

## DIAGNOSTIC_QUESTION_1
What is the SI unit of the universal gravitational constant \( G \), and how does it differ from the unit of acceleration due to gravity \( g \)?

## DIAGNOSTIC_ANSWER_1
The SI unit of \( G \) is \( \text{N} \, \text{m}^2 \, \text{kg}^{-2} \) (or equivalently \( \text{m}^3 \, \text{kg}^{-1} \, \text{s}^{-2} \)), while \( g \) has units of \( \text{m} \, \text{s}^{-2} \). A wrong answer (e.g., giving \( \text{m/s}^2 \) for \( G \)) reveals the student is confusing the universal constant \( G \) with the local acceleration \( g \), a fundamental category error between a proportionality constant in a force law and an acceleration.

## DIAGNOSTIC_QUESTION_2
In the Cavendish experiment, the torsion wire is twisted by an angle \( \theta \) when the large spheres are brought near the small spheres. Explain why the gravitational force does not cause a net linear acceleration of the bar AB, but only a rotation.

## DIAGNOSTIC_ANSWER_2
The two large spheres are placed on opposite sides of the bar such that they exert equal and opposite gravitational forces on the two small spheres. These forces form a couple (equal magnitude, opposite direction, different lines of action), producing a net torque but zero net force. A wrong answer suggesting the bar translates linearly reveals the student has not recognized the symmetric placement of masses that creates a pure torque — a critical design feature of the experiment.

## DIAGNOSTIC_QUESTION_3
In a Cavendish experiment, the torsion constant \( \tau = 1.2 \times 10^{-7} \, \text{N} \, \text{m} \, \text{rad}^{-1} \), the angle of twist \( \theta = 0.0015 \, \text{rad} \), the separation between centers \( d = 0.05 \, \text{m} \), the large mass \( M = 1.5 \, \text{kg} \), the small mass \( m = 0.02 \, \text{kg} \), and the length of the bar \( L = 0.3 \, \text{m} \). Calculate the value of \( G \) from this data.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify formula: \( G = \frac{\tau \theta d^2}{M m L} \).
**Step 2:** Check units: \( \tau \) in \( \text{N m rad}^{-1} \), \( \theta \) in rad, \( d^2 \) in \( \text{m}^2 \), \( M,m \) in kg, \( L \) in m → \( \frac{\text{N m} \cdot \text{m}^2}{\text{kg} \cdot \text{kg} \cdot \text{m}} = \text{N m}^2 \text{kg}^{-2} \). Correct.
**Step 3:** Substitute: \( G = \frac{(1.2 \times 10^{-7}) \times 0.0015 \times (0.05)^2}{1.5 \times 0.02 \times 0.3} \).
**Step 4:** Compute numerator: \( 1.2 \times 10^{-7} \times 1.5 \times 10^{-3} \times 2.5 \times 10^{-3} = 4.5 \times 10^{-13} \).
**Step 5:** Compute denominator: \( 1.5 \times 0.02 \times 0.3 = 9 \times 10^{-3} \).
**Step 6:** \( G = \frac{4.5 \times 10^{-13}}{9 \times 10^{-3}} = 5.0 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2} \).
A wrong answer (e.g., \( 10^{-9} \) or missing units) indicates either a unit conversion error (mm vs m) or incorrect handling of powers of ten — a common issue when dealing with the extremely small value of \( G \).

## DIAGNOSTIC_QUESTION_4
Two students perform the Cavendish experiment. Student A uses a torsion wire with a larger torsion constant \( \tau \) (stiffer wire), while Student B uses a wire with a smaller \( \tau \) (more flexible). Both use identical masses and geometry. How will the measured angle of twist \( \theta \) compare between the two setups, and which setup gives a more precise measurement of \( G \)? Justify your answer.

## DIAGNOSTIC_ANSWER_4
From \( \tau \theta = \frac{G M m L}{d^2} \), for fixed \( G, M, m, L, d \), we have \( \theta \propto \frac{1}{\tau} \). Student B (smaller \( \tau \)) will observe a larger twist angle \( \theta \). A larger \( \theta \) is easier to measure accurately with an optical lever or scale, reducing relative error in \( \theta \). Hence Student B's setup yields a more precise \( G \). A wrong answer claiming Student A's stiffer wire is better reveals a misunderstanding of the trade-off between sensitivity (large \( \theta \)) and the wire's ability to support the bar without sagging.

## DIAGNOSTIC_QUESTION_5
A student claims: "The Cavendish experiment measures the gravitational force directly by measuring the twist angle, so we don't need to know the torsion constant \( \tau \) if we calibrate the wire by hanging a known mass from the bar." Evaluate this claim. Is it correct? Why or why not?

## DIAGNOSTIC_ANSWER_5
The claim is **incorrect**. The twist angle \( \theta \) alone gives the gravitational torque \( \tau \theta \), but to extract the force \( F \) (and hence \( G \)), we must know the torsion constant \( \tau \). Calibrating by hanging a known mass \( m_{\text{cal}} \) at a distance \( r \) from the wire *is* the method to determine \( \tau \): the applied torque is \( m_{\text{cal}} g r \), and measuring the resulting twist \( \theta_{\text{cal}} \) gives \( \tau = \frac{m_{\text{cal}} g r}{\theta_{\text{cal}}} \). The student's statement "we don't need to know \( \tau \)" contradicts the fact that calibration *is* the measurement of \( \tau \). A wrong evaluation reveals confusion between measuring a quantity and needing its value in the formula.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment: If you were to measure \( G \) on the International Space Station (microgravity environment), what modification to the Cavendish apparatus would be necessary, and why? Would the measured value of \( G \) change?

## DIAGNOSTIC_ANSWER_6
On the ISS, the torsion wire would not hang vertically under gravity; the bar would float. The apparatus must be mounted on a rigid support with the wire under tension (e.g., using a spring or magnetic levitation to provide a restoring torque independent of weight). The measured value of \( G \) **would not change** because \( G \) is a universal constant. A poor answer suggesting \( G \) changes in space reveals a deep misconception: confusing the *measurement conditions* (weightlessness) with the *fundamental constant* being measured. A good answer recognizes that the gravitational attraction between the test masses still exists and is independent of the Earth's gravity.

## COMMON_MISCONCEPTION
Students often believe the Cavendish experiment "weighs the Earth" directly, thinking \( G \) is found by measuring the attraction between a test mass and the Earth. In reality, Cavendish measured the force between **two laboratory masses** (large and small lead spheres) to determine \( G \); the Earth's mass \( M_E \) is then *calculated* using \( g = G M_E / R_E^2 \). This reversal of logic — thinking \( G \) comes from \( g \) and \( M_E \) — leads to circular reasoning errors in numerical problems where students try to use \( g \) or \( M_E \) to find \( G \) in the Cavendish formula.

## ON_FAILURE
1. Revisit the Cavendish apparatus diagram (NCERT Fig 7.6) and trace the force pairs: large sphere on small sphere → force \( F \) → torque \( F \times L \).
2. Write the torque equilibrium equation \( \tau \theta = F L \) and substitute \( F = G \frac{M m}{d^2} \) to derive \( G = \frac{\tau \theta d^2}{M m L} \) step by step.
3. Perform a dimensional analysis of each term to confirm \( G \) has units \( \text{N m}^2 \text{kg}^{-2} \), distinct from \( g \) (\( \text{m/s}^2 \)).
4. Solve a numerical problem where \( \tau \) is determined from a separate calibration step (hanging a known mass on the bar) to reinforce that \( \tau \) is an independent measured quantity, not derived from \( g \).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_07_002, c9_physics_ch3_4, c8_math_ch13_8, c7_math_ch15_003
## PREREQUISITE_REASONS
c11_phy_cbse_07_002: Provides Newton's law of universal gravitation \( F = G \frac{M m}{d^2} \), the foundational formula used in the Cavendish derivation.
c9_physics_ch3_4: Newton's Second Law \( F = ma \) and the concept of force are essential to understand that the gravitational force causes torque, not linear acceleration of the center of mass.
c8_math_ch13_8: Solving linear equations by balancing method is needed to isolate \( G \) from the torque equilibrium equation.
c7_math_ch15_003: Systematic method for solving linear equations ensures students can manipulate the algebraic expression for \( G \) correctly.

## FORWARD_NODE_IDS
c11_phy_cbse_07_004, c11_phy_cbse_07_008
## FORWARD_REASONS
c11_phy_cbse_07_004: The value of \( G \) measured here is combined with \( g \) and \( R_E \) to calculate the mass of the Earth \( M_E \) (the "weighing the Earth" application).
c11_phy_cbse_07_008: Gravitational potential energy \( U = -\frac{G m_1 m_2}{r} \) directly uses \( G \); its sign and magnitude depend on the experimentally determined value of \( G \).

## CROSS_SUBJECT_PREREQS
c10_math_cbse_04_005, c9_math_ch1_4
## CROSS_SUBJECT_REASONS
c10_math_cbse_04_005: Quadratic formula derivation (completing the square) builds algebraic manipulation skills needed for rearranging the Cavendish formula when solving for different variables (e.g., finding \( \tau \) given \( G \)).
c9_math_ch1_4: Distance formula using Pythagoras theorem reinforces the concept of center-to-center separation \( d \) in 3D space, critical for correctly identifying \( d \) in the Cavendish setup.

## CHAIN_DESCRIPTION
c11_phy_cbse_07_002 -> c11_phy_cbse_07_003 -> c11_phy_cbse_07_004

## THIS_FORMULA
\( G = \frac{\tau \theta d^2}{M m L} \) where \( \tau \) = torsion constant (N m rad⁻¹), \( \theta \) = angle of twist (rad), \( d \) = center-to-center distance between large and small spheres (m), \( M \) = mass of large sphere (kg), \( m \) = mass of small sphere (kg), \( L \) = length of torsion bar (m). Also \( F = G \frac{M m}{d^2} \) (N).

## FORMULA_VARIABLES
\( \tau \) = restoring couple per unit twist (torsion constant) [N m rad⁻¹], \( \theta \) = angle of twist of the wire [rad], \( d \) = separation between centers of large and small spheres [m], \( M \) = mass of each large sphere [kg], \( m \) = mass of each small sphere [kg], \( L \) = length of the bar AB (distance between the two small spheres) [m], \( G \) = universal gravitational constant [N m² kg⁻²].

## FORMULA_UNITS
N m² kg⁻² (or m³ kg⁻¹ s⁻²), rad (dimensionless), m, kg, N m rad⁻¹

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_04_005 | Quadratic formula derivation strengthens algebraic rearrangement skills needed to solve the Cavendish equation for any variable (G, τ, θ, d, M, m, L).
c9_math_ch1_4 | Distance formula (Pythagoras in 3D) underpins the correct measurement of center-to-center separation d between spheres in the torsion balance.

## PREREQ_CONCEPT
Newton's law of universal gravitation and the principle of torque equilibrium (restoring torque = gravitational torque).

## PREREQ_BEFORE
The student must be able to state Newton's law of gravitation, define torque as force × perpendicular distance, and solve linear equations with multiple variables.

## PREREQ_STUCK
Revisit Newton's law of gravitation (c11_phy_cbse_07_002) and the concept of a couple producing pure rotation without translation (Class 11 Rotational Mechanics, not in this chapter but assumed).

## WORKED_EXAMPLE_1
PROBLEM: In a Cavendish experiment performed in a school laboratory, the following data is recorded: Mass of each large lead sphere \( M = 2.0 \, \text{kg} \), mass of each small lead sphere \( m = 0.05 \, \text{kg} \), separation between centers \( d = 0.04 \, \text{m} \), length of the torsion bar \( L = 0.4 \, \text{m} \). The torsion wire has a restoring couple per unit twist \( \tau = 2.5 \times 10^{-7} \, \text{N m rad}^{-1} \). When the large spheres are brought into position, the bar twists by \( \theta = 2.0 \times 10^{-3} \, \text{rad} \). Calculate the value of \( G \) obtained from this experiment.
STEPS:
- Step 1: Identify all given quantities with units: \( M = 2.0 \, \text{kg} \), \( m = 0.05 \, \text{kg} \), \( d = 0.04 \, \text{m} \), \( L = 0.4 \, \text{m} \), \( \tau = 2.5 \times 10^{-7} \, \text{N m rad}^{-1} \), \( \theta = 2.0 \times 10^{-3} \, \text{rad} \). Unknown: \( G \) in \( \text{N m}^2 \text{kg}^{-2} \).
- Step 2: Write the torque equilibrium equation: Gravitational torque = Restoring torque → \( F \times L = \tau \theta \). Substitute \( F = G \frac{M m}{d^2} \) to get \( G \frac{M m}{d^2} L = \tau \theta \).
- Step 3: Rearrange for \( G \): \( G = \frac{\tau \theta d^2}{M m L} \). Verify units: \( \frac{(\text{N m}) (\text{m}^2)}{(\text{kg})(\text{kg})(\text{m})} = \text{N m}^2 \text{kg}^{-2} \). Correct.
- Step 4: Substitute values with powers of ten: \( \tau \theta = (2.5 \times 10^{-7}) \times (2.0 \times 10^{-3}) = 5.0 \times 10^{-10} \, \text{N m} \). \( d^2 = (0.04)^2 = 1.6 \times 10^{-3} \, \text{m}^2 \). Numerator = \( (5.0 \times 10^{-10}) \times (1.6 \times 10^{-3}) = 8.0 \times 10^{-13} \, \text{N m}^3 \). Denominator = \( M m L = 2.0 \times 0.05 \times 0.4 = 0.04 \, \text{kg}^2 \text{m} \).
- Step 5: Compute \( G = \frac{8.0 \times 10^{-13}}{0.04} = 2.0 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2} \).
- Step 6: Check reasonableness: The accepted value is \( 6.67 \times 10^{-11} \). The experimental value is of the same order of magnitude (10⁻¹¹), which is typical for a school-level Cavendish experiment with larger uncertainties. The result is physically plausible.
REASONING: The Cavendish experiment measures the tiny gravitational torque between laboratory masses. The torsion wire's restoring torque is calibrated independently (giving \( \tau \)). At equilibrium, the two torques balance, allowing \( G \) to be isolated. The calculation involves careful handling of powers of ten because \( G \) is extremely small.
ANSWER: \( G = 2.0 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2} \)

## WORKED_EXAMPLE_2
PROBLEM: A student modifies the Cavendish setup by using a thinner torsion wire with \( \tau = 1.0 \times 10^{-8} \, \text{N m rad}^{-1} \) (more sensitive). All other parameters remain the same as in Worked Example 1 (\( M = 2.0 \, \text{kg} \), \( m = 0.05 \, \text{kg} \), \( d = 0.04 \, \text{m} \), \( L = 0.4 \, \text{m} \)). If the true value of \( G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2} \), what angle of twist \( \theta \) should the student expect to measure?
STEPS:
- Step 1: Identify knowns: \( G = 6.67 \times 10^{-11} \), \( M = 2.0 \, \text{kg} \), \( m = 0.05 \, \text{kg} \), \( d = 0.04 \, \text{m} \), \( L = 0.4 \, \text{m} \), \( \tau = 1.0 \times 10^{-8} \, \text{N m rad}^{-1} \). Unknown: \( \theta \) in rad.
- Step 2: Use the equilibrium formula solved for \( \theta \): \( \theta = \frac{G M m L}{\tau d^2} \).
- Step 3: Compute numerator: \( G M m L = (6.67 \times 10^{-11}) \times 2.0 \times 0.05 \times 0.4 = 6.67 \times 10^{-11} \times 0.04 = 2.668 \times 10^{-12} \, \text{N m}^3 \) (since \( G \) has N m² kg⁻², times kg² m gives N m³).
- Step 4: Compute denominator: \( \tau d^2 = (1.0 \times 10^{-8}) \times (0.04)^2 = 1.0 \times 10^{-8} \times 1.6 \times 10^{-3} = 1.6 \times 10^{-11} \, \text{N m}^3 \text{rad}^{-1} \).
- Step 5: Divide: \( \theta = \frac{2.668 \times 10^{-12}}{1.6 \times 10^{-11}} = 0.16675 \, \text{rad} \).
- Step 6: Convert to degrees if needed: \( 0.167 \, \text{rad} \times \frac{180}{\pi} \approx 9.6^\circ \). This is a large, easily measurable angle, confirming the advantage of a more sensitive (smaller \( \tau \)) wire.
REASONING: A smaller torsion constant \( \tau \) means the wire twists more for the same torque. This amplifies the angular deflection \( \theta \), making it easier to measure accurately. The calculation shows the direct inverse proportionality \( \theta \propto 1/\tau \).
ANSWER: \( \theta = 0.167 \, \text{rad} \) (or \( 9.6^\circ \))

## WORKED_EXAMPLE_3
PROBLEM: In a Cavendish experiment, the torsion constant \( \tau \) is determined by a separate calibration: a force \( F_{\text{cal}} = 0.01 \, \text{N} \) is applied tangentially at a distance \( r = 0.2 \, \text{m} \) from the wire axis, producing a twist \( \theta_{\text{cal}} = 0.05 \, \text{rad} \). In the actual experiment with \( M = 1.5 \, \text{kg} \), \( m = 0.02 \, \text{kg} \), \( d = 0.05 \, \text{m} \), \( L = 0.3 \, \text{m} \), the measured twist is \( \theta = 0.002 \, \text{rad} \). Calculate \( G \).
STEPS:
- Step 1: Calibration step. Applied torque \( \Gamma_{\text{cal}} = F_{\text{cal}} \times r = 0.01 \times 0.2 = 0.002 \, \text{N m} \). Torsion constant \( \tau = \frac{\Gamma_{\text{cal}}}{\theta_{\text{cal}}} = \frac{0.002}{0.05} = 0.04 \, \text{N m rad}^{-1} \). Wait, this is too large for a typical Cavendish wire. Let's re-check: \( F_{\text{cal}} = 0.01 \, \text{N} \) is reasonable (1 gram weight), \( r = 0.2 \, \text{m} \), torque = 0.002 N m. \( \theta_{\text{cal}} = 0.05 \, \text{rad} \) (≈ 2.86°). Then \( \tau = 0.002 / 0.05 = 0.04 \, \text{N m rad}^{-1} \). This is a very stiff wire. Let's adjust numbers to be realistic: Suppose \( F_{\text{cal}} = 1 \times 10^{-5} \, \text{N} \) (1 mg weight), \( r = 0.2 \, \text{m} \), torque = \( 2 \times 10^{-6} \, \text{N m} \). \( \theta_{\text{cal}} = 0.1 \, \text{rad} \). Then \( \tau = 2 \times 10^{-5} \, \text{N m rad}^{-1} \). Still large. Let's use the numbers given in the problem but note they are hypothetical. Proceed with given numbers.
- Step 2: Using given numbers: \( \tau = \frac{F_{\text{cal}} r}{\theta_{\text{cal}}} = \frac{0.01 \times 0.2}{0.05} = 0.04 \, \text{N m rad}^{-1} \).
- Step 3: Now use Cavendish formula: \( G = \frac{\tau \theta d^2}{M m L} \).
- Step 4: Substitute: \( \tau = 0.04 \), \( \theta = 0.002 \), \( d = 0.05 \), \( M = 1.5 \), \( m = 0.02 \), \( L = 0.3 \).
- Step 5: Numerator: \( \tau \theta d^2 = 0.04 \times 0.002 \times (0.05)^2 = 0.04 \times 0.002 \times 0.0025 = 2.0 \times 10^{-7} \).
- Step 6: Denominator: \( M m L = 1.5 \times 0.02 \times 0.3 = 0.009 \).
- Step 7: \( G = \frac{2.0 \times 10^{-7}}{0.009} = 2.22 \times 10^{-5} \, \text{N m}^2 \text{kg}^{-2} \). This is 6 orders of magnitude too large because the calibration numbers were unrealistic for a Cavendish wire.
- Step 8: Realistic calibration: For a typical Cavendish wire, \( \tau \approx 10^{-7} \, \text{N m rad}^{-1} \). To get that, if \( \theta_{\text{cal}} = 0.1 \, \text{rad} \), then \( \Gamma_{\text{cal}} = \tau \theta_{\text{cal}} = 10^{-8} \, \text{N m} \). If \( r = 0.2 \, \text{m} \), \( F_{\text{cal}} = 5 \times 10^{-8} \, \text{N} \) (about 5 μg weight). This shows the extreme sensitivity required.
- Step 9: The key learning is the two-step process: (1) Calibrate \( \tau \) using a known torque, (2) Use \( \tau \) in the gravitational torque balance to find \( G \).
REASONING: The Cavendish experiment requires an independent measurement of the torsion constant \( \tau \). This is done by applying a known torque (force × lever arm) and measuring the resulting twist. The calibrated \( \tau \) is then used in the gravitational experiment. This worked example combines the calibration physics with the main measurement, reinforcing that \( \tau \) is an experimentally determined parameter of the apparatus, not a theoretical constant.
ANSWER: \( G = 2.22 \times 10^{-5} \, \text{N m}^2 \text{kg}^{-2} \) (based on given hypothetical numbers; a realistic experiment would yield \( \approx 6.67 \times 10^{-11} \))

## COMPETENCY_QUESTION_1
QUESTION: The Cavendish experiment uses a torsion balance to measure \( G \). A student argues: "Since the gravitational force is so weak, we should use the largest possible masses \( M \) and \( m \) and bring them as close as possible (smallest \( d \)) to maximize the twist \( \theta \)." Evaluate this advice. Identify two practical limitations that prevent arbitrarily large masses and arbitrarily small separations in a real torsion balance experiment.
COMPETENCY: Interpreting physical situations using formulas and identifying practical constraints in experimental design.
STEPS:
- Step 1: Recall the formula \( \theta = \frac{G M m L}{\tau d^2} \). Confirm that increasing \( M, m, L \) and decreasing \( d, \tau \) increases \( \theta \).
- Step 2: Identify practical limitation 1: Large masses \( M, m \) increase the weight of the spheres, causing the torsion wire to sag or break, and changing the center-to-center distance \( d \) due to deformation. The wire's torsion constant \( \tau \) might also change under heavy load.
- Step 3: Identify practical limitation 2: Decreasing \( d \) is limited by the physical radii of the spheres (\( d \geq R_M + R_m \)). Bringing them too close risks contact, and the point-mass approximation \( F = G M m / d^2 \) fails when separation is comparable to sphere sizes; finite-size corrections become significant.
- Step 4: Synthesize: While the formula suggests maximizing \( \theta \), real experiments balance sensitivity with mechanical stability and the validity of the point-mass formula.
ANSWER: The student's advice is theoretically correct but practically limited. (1) Excessive masses cause wire sag, creep, and potential failure, altering \( \tau \) and \( d \). (2) The minimum separation \( d \) is constrained by the physical radii of the spheres; at very small gaps, the \( 1/d^2 \) law for point masses no longer applies accurately, requiring complex finite-size corrections. Real experiments optimize within these constraints.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A physics teacher sets up a Cavendish experiment with a torsion wire of length \( l = 1.0 \, \text{m} \) and radius \( r = 0.1 \, \text{mm} \), made of a material with shear modulus \( \eta = 8 \times 10^{10} \, \text{Pa} \). The torsion constant for a cylindrical wire is \( \tau = \frac{\pi \eta r^4}{2 l} \). The bar length is \( L = 0.5 \, \text{m} \), large masses \( M = 5 \, \text{kg} \), small masses \( m = 0.1 \, \text{kg} \), separation \( d = 0.05 \, \text{m} \). Calculate the expected twist angle \( \theta \) if \( G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2} \). Is this angle practically measurable with an optical lever (resolution \( \sim 10^{-4} \, \text{rad} \))?
COMPETENCY: Unit analysis and dimensional reasoning combined with multi-step calculation linking material properties to experimental sensitivity.
STEPS:
- Step 1: Calculate torsion constant \( \tau \) from wire geometry and shear modulus. \( r = 0.1 \, \text{mm} = 1.0 \times 10^{-4} \, \text{m} \). \( r^4 = (10^{-4})^4 = 10^{-16} \, \text{m}^4 \). \( \tau = \frac{\pi \times 8 \times 10^{10} \times 10^{-16}}{2 \times 1.0} = \frac{8\pi \times 10^{-6}}{2} = 4\pi \times 10^{-6} \approx 1.26 \times 10^{-5} \, \text{N m rad}^{-1} \).
- Step 2: Compute gravitational torque numerator: \( G M m L = (6.67 \times 10^{-11}) \times 5 \times 0.1 \times 0.5 = 1.6675 \times 10^{-11} \, \text{N m}^3 \).
- Step 3: Compute denominator: \( \tau d^2 = (1.26 \times 10^{-5}) \times (0.05)^2 = 1.26 \times 10^{-5} \times 2.5 \times 10^{-3} = 3.15 \times 10^{-8} \, \text{N m}^3 \text{rad}^{-1} \).
- Step 4: Calculate \( \theta = \frac{1.6675 \times 10^{-11}}{3.15 \times 10^{-8}} = 5.29 \times 10^{-4} \, \text{rad} \).
- Step 5: Compare with optical lever resolution \( 10^{-4} \, \text{rad} \). The expected twist \( 5.3 \times 10^{-4} \, \text{rad} \) is about 5 times the resolution, so it is measurable but with only modest precision (~20% relative error). To improve, one could use a thinner wire (smaller \( r \) → much smaller \( \tau \propto r^4 \)) or larger masses.
ANSWER: \( \tau \approx 1.26 \times 10^{-5} \, \text{N m rad}^{-1} \), \( \theta \approx 5.3 \times 10^{-4} \, \text{rad} \). Yes, it is measurable (signal-to-noise ≈ 5), but precision is limited. A thinner wire would increase sensitivity dramatically due to the \( r^4 \) dependence.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: It is a scalar constant that remains invariant across the universe and is measured using a torsion balance (Cavendish experiment) where the tiny ______ torque between known masses is balanced against the restoring torque of a twisted wire.

## DIAGNOSTIC_ANSWER_7
gravitational

**A wrong answer ("restoring" or "twist") reveals the student has swapped the definition's adjective - the tiny gravitational torque is balanced against the wire's restoring torque.** Gravitational is the definition's own first adjective, and the adjective is what the blank grades. Recall the lead spheres before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe that when you bring two large lead spheres near two small spheres on a suspended rod, the rod twists slightly — this is the ______ force in action, but it is far too weak to measure with a spring balance.

## DIAGNOSTIC_ANSWER_8
gravitational

**A wrong answer ("magnetic" or "electric") reveals the student has swapped the definition's force word - the rod's twist reveals the gravitational force.** Gravitational is the walkthrough's own word, and the adjective is what the blank grades. Recall the spring balance's failure before filling, and give the adjective exactly.
