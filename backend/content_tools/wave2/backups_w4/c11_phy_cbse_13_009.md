## ELI5
Push the swing from the end and it starts at full stretch; push from the middle and it starts at full speed - same swing, different phase. The phase constant phi is the clock's head start inside the cosine, fixing where in the cycle t = zero finds the oscillator. Amplitude and frequency shared; phi is the private biography of the start.

## DEFINITION
In Simple Harmonic Motion described by \( x(t) = A \cos(\omega t + \phi) \), the **phase** is the time-dependent argument \( (\omega t + \phi) \) measured in radians that completely specifies the state of the oscillator (displacement and velocity direction) at any instant \( t \). The **phase constant** (or initial phase) \( \phi \) is the value of the phase at \( t = 0 \); it determines the initial displacement \( x_0 = A \cos \phi \) and initial velocity \( v_0 = -\omega A \sin \phi \). Two SHMs with identical amplitude \( A \) and angular frequency \( \omega \) but different phase constants are said to have a **phase difference** \( \Delta \phi = \phi_1 - \phi_2 \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can: (1) extract the phase constant from a given displacement equation or initial conditions, (2) calculate the phase difference between two SHMs and interpret its physical meaning (in phase, out of phase, quadrature), (3) sketch the reference circle for a given SHM showing the initial position corresponding to \( \phi \), and (4) convert between cosine and sine representations while correctly adjusting the phase constant.

## SCOPE_BOUNDARY
Covers: definition of phase and phase constant in the standard SHM equation \( x = A \cos(\omega t + \phi) \); determination of \( \phi \) from initial displacement and velocity; phase difference between two oscillators; reference circle interpretation; conversion between \( \cos \) and \( \sin \) forms. Does NOT cover: phase in damped/forced oscillations (node c11_phy_cbse_13_007, c11_phy_cbse_13_008); phase of velocity/acceleration relative to displacement (covered in node c11_phy_cbse_13_003); superposition of SHMs with different frequencies (beyond NCERT scope).

## WALKTHROUGH
Observe a swing in a playground: when you push a child from rest at the extreme position, the motion starts at maximum displacement; when you give a push at the mean position, it starts with maximum speed. Both are SHM with the same amplitude and frequency but different "starting points." This starting point is quantified by the phase constant \( \phi \). Begin by writing the general SHM equation \( x = A \cos(\omega t + \phi) \). At \( t = 0 \), \( x_0 = A \cos \phi \) and \( v_0 = -\omega A \sin \phi \). Use these two equations to find \( \phi \) given any pair of initial conditions. Connect to the reference circle (node c11_phy_cbse_13_003): \( \phi \) is the angle the radius vector makes with the positive x-axis at \( t = 0 \). Practice converting \( x = A \sin(\omega t + \alpha) \) to cosine form using \( \sin \theta = \cos(\theta - \pi/2) \) to see how the phase constant shifts by \( \pi/2 \).

Takeaway: mastery means reading the phase constant from initial conditions, and translating a start at extreme or mean into phi. Exam moves: find-the-phase questions and match-the-start items. Check yourself: starting at the extreme sets cosine on the nose - phi zero; starting at the mean with full speed demands ninety degrees of head start. Students miss it because the phase looks like decoration, when the definition's argument carries the whole state: displacement and velocity both read off it, and two identical swings differ only by their phi.

## DIAGNOSTIC_QUESTION_1
A particle executes SHM described by \( x(t) = 5 \cos(4\pi t + \pi/3) \) where \( x \) is in cm and \( t \) in s. What is the phase of the motion at \( t = 0.25 \) s? Express your answer in radians.

## DIAGNOSTIC_ANSWER_1
The phase is \( \omega t + \phi = 4\pi(0.25) + \pi/3 = \pi + \pi/3 = 4\pi/3 \) rad. A wrong answer like \( \pi/3 \) reveals the student confuses phase constant with instantaneous phase; an answer of \( 120^\circ \) reveals failure to work in radians as required by the argument of trigonometric functions in physics formulas.

## DIAGNOSTIC_QUESTION_2
Two SHMs are given by \( x_1 = A \cos(\omega t) \) and \( x_2 = A \cos(\omega t + \pi/2) \). At \( t = 0 \), particle 1 is at \( x = +A \) and particle 2 is at \( x = 0 \) moving in the negative direction. Explain why the phase difference \( \pi/2 \) does NOT mean particle 2 is "ahead" by a quarter period in the sense of reaching the extreme position first.

## DIAGNOSTIC_ANSWER_2
Particle 2 at \( t=0 \) is at the mean position moving negatively; it reaches the negative extreme at \( t = T/4 \). Particle 1 starts at the positive extreme and reaches the mean position at \( t = T/4 \). They are in quadrature: when one is at extreme, the other is at mean position. A student who says "particle 2 leads by \( T/4 \)" misunderstands that phase lead means reaching a given phase value earlier; here particle 2 reaches zero displacement with negative velocity earlier, but particle 1 reaches maximum displacement earlier. The phase difference only indicates a constant offset in the argument, not a simple time lead for all events.

## DIAGNOSTIC_QUESTION_3
A block on a spring executes SHM with amplitude 10 cm and angular frequency \( 2\pi \) rad/s. At \( t = 0 \), the block is at \( x = 5 \) cm and moving towards the positive extreme. Find the phase constant \( \phi \) (in radians, \( -\pi < \phi \leq \pi \)) and write the displacement equation.

## DIAGNOSTIC_ANSWER_3
Given: \( A = 0.10 \) m, \( \omega = 2\pi \) rad/s, \( x_0 = 0.05 \) m, \( v_0 > 0 \).  
\( \cos \phi = x_0/A = 0.5 \Rightarrow \phi = \pm \pi/3 \).  
\( v_0 = -\omega A \sin \phi > 0 \Rightarrow \sin \phi < 0 \Rightarrow \phi = -\pi/3 \) (since \( \sin(-\pi/3) = -\sqrt{3}/2 < 0 \)).  
Equation: \( x(t) = 0.10 \cos(2\pi t - \pi/3) \) m.  
A wrong sign for \( \phi \) (choosing \( +\pi/3 \)) reveals the student forgot to use the velocity sign to resolve the quadrant ambiguity of the inverse cosine.

## DIAGNOSTIC_QUESTION_4
The displacement of a particle is given by \( x(t) = 3 \sin(2t) + 4 \cos(2t) \) (SI units). Rewrite this in the standard form \( x(t) = D \cos(2t + \phi) \) and find \( D \) and \( \phi \). Then determine the earliest time \( t > 0 \) when the particle first reaches the positive extreme position.

## DIAGNOSTIC_ANSWER_4
\( D = \sqrt{3^2 + 4^2} = 5 \) m.  
\( 3 \sin 2t + 4 \cos 2t = 5 \left( \frac{3}{5} \sin 2t + \frac{4}{5} \cos 2t \right) \).  
Let \( \cos \phi = 4/5 \), \( \sin \phi = 3/5 \Rightarrow \phi = \arctan(3/4) \approx 0.6435 \) rad.  
Then \( x = 5 \cos(2t - \phi) \) (since \( \cos(A-B) = \cos A \cos B + \sin A \sin B \)). Wait: \( 5 \cos(2t - \phi) = 5(\cos 2t \cos \phi + \sin 2t \sin \phi) = 5(\cos 2t \cdot 4/5 + \sin 2t \cdot 3/5) = 4 \cos 2t + 3 \sin 2t \). So \( \phi = -0.6435 \) rad in the form \( D \cos(2t + \phi) \).  
Positive extreme when \( \cos(2t + \phi) = 1 \Rightarrow 2t + \phi = 0 \Rightarrow t = -\phi/2 = 0.32175 \) s.  
A student who writes \( \phi = +\arctan(3/4) \) misses the sign convention in the cosine addition formula; a student who sets \( 2t + \phi = 2\pi \) for the first extreme finds the second occurrence, not the earliest.

## DIAGNOSTIC_QUESTION_5
A student writes the SHM equation for a system starting from rest at \( x = -A \) as \( x = A \cos(\omega t + \pi/2) \). Evaluate this answer. If incorrect, provide the correct phase constant and explain the error.

## DIAGNOSTIC_ANSWER_5
Incorrect. At \( t=0 \), \( x = A \cos(\pi/2) = 0 \), not \( -A \). Starting from rest at \( x = -A \) means \( x_0 = -A \), \( v_0 = 0 \).  
\( \cos \phi = -1 \Rightarrow \phi = \pi \) (or \( -\pi \)).  
\( v_0 = -\omega A \sin \phi = 0 \) satisfied.  
Correct equation: \( x = A \cos(\omega t + \pi) = -A \cos(\omega t) \).  
The student likely confused "starting from negative extreme" with "phase = \( \pi/2 \)" (which corresponds to starting from mean position). This reveals a lack of connection between the reference circle angle and the initial physical configuration.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a smartphone's accelerometer (or a pendulum with a position sensor) to demonstrate that two identical oscillators started with different initial displacements but the same initial velocity (zero) have different phase constants. Describe the procedure, the data to record, and how to extract \( \phi \) from the data.

## DIAGNOSTIC_ANSWER_6
Procedure: Use two identical spring-mass systems (or one system tested twice). In trial 1, pull mass to \( x = +A \) and release from rest. In trial 2, pull to \( x = +A/2 \) and release from rest. Record \( x(t) \) using sensor. Fit data to \( x = A \cos(\omega t + \phi) \) (known \( A, \omega \)). For trial 1: \( x_0 = A \Rightarrow \phi = 0 \). For trial 2: \( x_0 = A/2 \Rightarrow \phi = \pm \pi/3 \); since \( v_0 = 0 \), \( \sin \phi = 0 \) — contradiction! Wait: releasing from rest at \( x = A/2 \) is NOT an extreme position, so \( v_0 = 0 \) but \( x_0 \neq \pm A \). This is impossible for SHM because at \( v=0 \), \( x \) must be \( \pm A \). Correction: To have \( v_0 = 0 \) and different \( x_0 \), the amplitude must be different. Better: Same amplitude, different release points: trial 1 release from \( +A \) (\( \phi=0 \)), trial 2 release from \( -A \) (\( \phi=\pi \)). Or same \( x_0 \) but different \( v_0 \): push from mean position with different speeds. A good answer recognizes that \( v_0=0 \) forces \( x_0 = \pm A \), so phase constant can only be 0 or \( \pi \) for zero initial velocity. This tests deep understanding of the \( (x_0, v_0) \) to \( (A, \phi) \) mapping.

## COMMON_MISCONCEPTION
Students believe the phase constant \( \phi \) is always the "initial angle on the reference circle" without realizing that the reference circle angle is measured from the **positive x-axis** in the **anticlockwise** direction. They often: (1) take \( \phi = \cos^{-1}(x_0/A) \) and ignore the sign of \( v_0 \), leading to quadrant errors (e.g., choosing \( \phi = +\pi/3 \) when \( \phi = -\pi/3 \) is correct); (2) confuse the phase constant in \( x = A \sin(\omega t + \alpha) \) with that in \( x = A \cos(\omega t + \phi) \), forgetting the \( \pi/2 \) shift; (3) think a phase difference of \( \pi \) means "one oscillator is half a period behind" for all time, not realizing it means they are always in opposite states (when one is at +A, the other is at -A).

## ON_FAILURE
Step 1: Draw the reference circle. Mark the initial radius vector at angle \( \phi \) from +x axis (anticlockwise). The projection on x-axis gives \( x_0 \); the tangential velocity direction gives sign of \( v_0 \). Step 2: Given \( x_0, v_0 \), compute \( \tan \phi = -v_0/(\omega x_0) \) (derived from \( v_0 = -\omega A \sin \phi, x_0 = A \cos \phi \)). Use the signs of \( \sin \phi \) and \( \cos \phi \) to place \( \phi \) in the correct quadrant. Step 3: Practice converting between forms: \( A \cos(\omega t + \phi) = A \sin(\omega t + \phi + \pi/2) \). Step 4: For two SHMs, compute \( \Delta \phi = \phi_1 - \phi_2 \) and interpret: \( \Delta \phi = 0 \) (in phase), \( \pi \) (opposite phase), \( \pi/2 \) (quadrature). Use the PHET "Masses and Springs" simulation to visualize phase differences.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_13_002, c11_phy_cbse_13_003, c9_math_ch8_1, c11_phy_cbse_13_001

## PREREQUISITE_REASONS
c11_phy_cbse_13_002: Defines SHM and the standard equation \( x = A \cos(\omega t + \phi) \); this node builds on that definition to deepen understanding of \( \phi \).
c11_phy_cbse_13_003: Derives velocity and acceleration in SHM; the expression \( v = -\omega A \sin(\omega t + \phi) \) is essential to link \( \phi \) to initial velocity.
c9_math_ch8_1: Covers trigonometric functions and identities (sin, cos, phase shifts); needed to manipulate and convert between sine and cosine forms of SHM.
c11_phy_cbse_13_001: Expands the phase concept (ωt+φ) introduced here to include initial phase constant and its determination.  

## FORWARD_NODE_IDS
c11_phy_cbse_13_010, c11_phy_cbse_13_007, c11_phy_cbse_13_008

## FORWARD_REASONS
c11_phy_cbse_13_010: Word problems on SHM applications require extracting phase constants from initial conditions, converting between sine/cosine forms, and interpreting phase differences — all skills developed in this node.
c11_phy_cbse_13_007: Phase constant φ in x = A cos(ωt+φ) carries over to damped solution x = A₀e^(-bt/2m) cos(ω't+φ).  
c11_phy_cbse_13_008: Phase constant φ determines the phase lag between driving force and displacement, crucial for understanding power transfer at resonance.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_001, c11_math_cbse_03_002
## CROSS_SUBJECT_REASONS
c11_math_ch3_1: Trigonometric functions (sin, cos, tan) and their graphs; the phase constant is an angle in these functions, and converting between forms uses identities like \( \sin(\theta + \pi/2) = \cos \theta \).
c11_math_ch3_2: Inverse trigonometric functions; finding \( \phi \) from \( \cos \phi = x_0/A \) requires \( \cos^{-1} \) and quadrant determination using the sign of \( \sin \phi \).
c11_math_cbse_03_001: Cross-subject support: An angle is a measure of rotation of a ray about its initial point, where the amount of ro... supplies tools/facts used directly in this node.  
c11_math_cbse_03_002: Cross-subject support: The conversion between degree measure and radian measure is based on the equivalence of a... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_13_002 -> c11_phy_cbse_13_009 -> c11_phy_cbse_13_010

## THIS_FORMULA
Phase: \( \theta(t) = \omega t + \phi \) (rad); Phase constant: \( \phi = \theta(0) \) (rad); Displacement: \( x(t) = A \cos(\omega t + \phi) \) (m); Velocity: \( v(t) = -\omega A \sin(\omega t + \phi) \) (m/s); Initial conditions: \( x_0 = A \cos \phi \), \( v_0 = -\omega A \sin \phi \); Phase difference: \( \Delta \phi = \phi_1 - \phi_2 \) (rad)

## FORMULA_VARIABLES
\( \theta(t) \) = instantaneous phase (rad), \( \omega \) = angular frequency (rad/s), \( t \) = time (s), \( \phi \) = phase constant / initial phase (rad), \( A \) = amplitude (m), \( x(t) \) = displacement (m), \( v(t) \) = velocity (m/s), \( x_0 \) = initial displacement (m), \( v_0 \) = initial velocity (m/s), \( \Delta \phi \) = phase difference between two SHMs (rad)

## FORMULA_UNITS
rad, rad/s, s, m, m/s

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch3_1 | Trigonometric identities \( \cos(\alpha \pm \beta) \), \( \sin(\alpha \pm \beta) \) are used to convert between \( A \cos(\omega t + \phi) \) and \( A \sin(\omega t + \alpha) \) forms; the phase shift of \( \pi/2 \) between sine and cosine is a direct application.
c11_math_ch3_2 | Inverse trigonometric functions \( \cos^{-1}, \sin^{-1}, \tan^{-1} \) are used to find \( \phi \) from initial conditions; quadrant determination (principal value vs. general solution) is critical for correct phase constant.

## PREREQ_CONCEPT
The standard SHM equation \( x = A \cos(\omega t + \phi) \) and the expressions for velocity and acceleration derived from it.

## PREREQ_BEFORE
Student must be able to differentiate \( \cos(\omega t + \phi) \) to get \( v(t) \), and understand the reference circle representation of SHM.

## PREREQ_STUCK
Revisit node c11_phy_cbse_13_003 for velocity derivation and node c11_phy_cbse_13_002 for the reference circle construction.

## WORKED_EXAMPLE_1
PROBLEM: A particle executes SHM with amplitude 8 cm and frequency 2 Hz. At \( t = 0 \), its displacement is 4 cm and it is moving in the negative x-direction. (a) Find the phase constant \( \phi \) in radians (principal value \( -\pi < \phi \leq \pi \)). (b) Write the displacement equation \( x(t) \). (c) Find the earliest time \( t > 0 \) when the particle crosses the mean position moving in the positive direction.

STEPS:
- Step 1: Identify given quantities with units. Amplitude \( A = 8 \text{ cm} = 0.08 \text{ m} \). Frequency \( \nu = 2 \text{ Hz} \Rightarrow \omega = 2\pi\nu = 4\pi \text{ rad/s} \). Initial displacement \( x_0 = 4 \text{ cm} = 0.04 \text{ m} \). Initial velocity \( v_0 < 0 \) (negative direction).
- Step 2: Use initial conditions to find \( \phi \). \( x_0 = A \cos \phi \Rightarrow \cos \phi = x_0/A = 0.04/0.08 = 0.5 \Rightarrow \phi = \pm \pi/3 \). \( v_0 = -\omega A \sin \phi \). Since \( v_0 < 0 \) and \( -\omega A < 0 \), we need \( \sin \phi > 0 \). \( \sin(\pi/3) = \sqrt{3}/2 > 0 \), \( \sin(-\pi/3) = -\sqrt{3}/2 < 0 \). Therefore \( \phi = \pi/3 \).
- Step 3: Write displacement equation. \( x(t) = 0.08 \cos(4\pi t + \pi/3) \) m. (Or in cm: \( x(t) = 8 \cos(4\pi t + \pi/3) \) cm).
- Step 4: Find earliest \( t > 0 \) when particle crosses mean position (\( x = 0 \)) moving positively (\( v > 0 \)). \( x = 0 \Rightarrow \cos(4\pi t + \pi/3) = 0 \Rightarrow 4\pi t + \pi/3 = \pi/2, 3\pi/2, \dots \). First crossing: \( 4\pi t + \pi/3 = \pi/2 \Rightarrow 4\pi t = \pi/6 \Rightarrow t = 1/24 \text{ s} \approx 0.0417 \text{ s} \). Check velocity sign: \( v = -\omega A \sin(\pi/2) = -\omega A < 0 \) — negative! So this crossing is in negative direction. Next crossing: \( 4\pi t + \pi/3 = 3\pi/2 \Rightarrow 4\pi t = 7\pi/6 \Rightarrow t = 7/24 \text{ s} \approx 0.292 \text{ s} \). Velocity: \( v = -\omega A \sin(3\pi/2) = -\omega A(-1) = +\omega A > 0 \). This is the required crossing.
- Step 5: Verify physical reasonableness. Period \( T = 1/\nu = 0.5 \text{ s} \). Mean position crossings occur every \( T/4 = 0.125 \text{ s} \). From \( t=0 \) (at \( x=+A/2 \) moving negative), it goes to \( x=0 \) at \( t=T/12 \approx 0.0417 \text{ s} \) (negative crossing), then to \( -A \) at \( t=T/4=0.125 \text{ s} \), then back through \( x=0 \) at \( t=5T/12 \approx 0.208 \text{ s} \)? Wait: \( 7/24 = 0.2917 \), \( 5/12 = 0.4167 \). Let's recheck. At \( t=0 \), phase = \( \pi/3 \) (60°). Mean position at phase = \( \pi/2 \) (90°) and \( 3\pi/2 \) (270°). From 60° to 90° is 30° = \( T/12 \). From 60° to 270° is 210° = \( 7T/12 \). But 210° > 180°, so it goes past the negative extreme. The first positive-direction crossing is indeed at phase \( 3\pi/2 \) (270°), which is \( 7T/12 = 7/24 \text{ s} \). Correct.
- Step 6: State final answers with units. (a) \( \phi = \pi/3 \) rad. (b) \( x(t) = 0.08 \cos(4\pi t + \pi/3) \) m. (c) \( t = 7/24 \text{ s} \approx 0.292 \text{ s} \).

REASONING: The phase constant is determined by both initial displacement (giving cosine value) and initial velocity sign (giving sine sign), resolving the quadrant ambiguity. The earliest positive-direction mean crossing corresponds to the phase reaching \( 3\pi/2 \) (where cosine is zero and sine is -1, making velocity positive).

ANSWER: (a) \( \phi = \pi/3 \) rad; (b) \( x(t) = 0.08 \cos(4\pi t + \pi/3) \) m; (c) \( t = 7/24 \text{ s} \approx 0.292 \text{ s} \).

## WORKED_EXAMPLE_2
PROBLEM: Two particles P and Q execute SHM along the same line with the same amplitude \( A = 5 \text{ cm} \) and angular frequency \( \omega = 3 \text{ rad/s} \). Their displacements are given by \( x_P = 5 \cos(3t) \) cm and \( x_Q = 5 \sin(3t + \pi/6) \) cm. (a) Express \( x_Q \) in cosine form \( A \cos(\omega t + \phi_Q) \) and find \( \phi_Q \). (b) Find the phase difference \( \Delta \phi = \phi_P - \phi_Q \). (c) At \( t = 0 \), which particle is ahead in phase? (d) Find the first time \( t > 0 \) when both particles have the same displacement.

STEPS:
- Step 1: Identify given equations and convert to common form. \( x_P = 5 \cos(3t) \Rightarrow \phi_P = 0 \). \( x_Q = 5 \sin(3t + \pi/6) \). Use identity \( \sin \theta = \cos(\theta - \pi/2) \). So \( x_Q = 5 \cos(3t + \pi/6 - \pi/2) = 5 \cos(3t - \pi/3) \). Thus \( \phi_Q = -\pi/3 \).
- Step 2: Compute phase difference. \( \Delta \phi = \phi_P - \phi_Q = 0 - (-\pi/3) = \pi/3 \) rad. (P leads Q by \( \pi/3 \)).
- Step 3: Determine which particle is ahead at \( t=0 \). Phase of P at \( t=0 \): \( \theta_P(0) = \phi_P = 0 \). Phase of Q at \( t=0 \): \( \theta_Q(0) = \phi_Q = -\pi/3 \). Since \( \theta_P > \theta_Q \), P is ahead in phase. (On reference circle, P's radius vector is at angle 0, Q's is at \( -\pi/3 \) i.e., clockwise from P).
- Step 4: Find first \( t > 0 \) when \( x_P = x_Q \). \( 5 \cos(3t) = 5 \cos(3t - \pi/3) \). Cosine equality: \( \cos \alpha = \cos \beta \Rightarrow \alpha = \pm \beta + 2n\pi \). Case 1: \( 3t = 3t - \pi/3 + 2n\pi \Rightarrow \pi/3 = 2n\pi \) — no solution for integer n. Case 2: \( 3t = -(3t - \pi/3) + 2n\pi \Rightarrow 3t = -3t + \pi/3 + 2n\pi \Rightarrow 6t = \pi/3 + 2n\pi \Rightarrow t = \pi/18 + n\pi/3 \). First \( t > 0 \) at \( n=0 \): \( t = \pi/18 \text{ s} \approx 0.1745 \text{ s} \).
- Step 5: Verify. At \( t = \pi/18 \), \( 3t = \pi/6 \). \( x_P = 5 \cos(\pi/6) = 5 \cdot \sqrt{3}/2 \approx 4.33 \text{ cm} \). \( x_Q = 5 \cos(\pi/6 - \pi/3) = 5 \cos(-\pi/6) = 5 \cos(\pi/6) = 4.33 \text{ cm} \). Equal. Check if earlier crossing possible? The equation \( \cos \alpha = \cos \beta \) gives all solutions; \( n=0 \) gives smallest positive t.
- Step 6: State answers. (a) \( x_Q = 5 \cos(3t - \pi/3) \) cm, \( \phi_Q = -\pi/3 \) rad. (b) \( \Delta \phi = \pi/3 \) rad (P leads). (c) Particle P is ahead. (d) \( t = \pi/18 \) s.

REASONING: Converting both equations to the same trigonometric function (cosine) allows direct comparison of phase constants. The phase difference is constant in time. The condition for equal displacement uses the general solution of \( \cos \alpha = \cos \beta \).

ANSWER: (a) \( \phi_Q = -\pi/3 \) rad; (b) \( \Delta \phi = \pi/3 \) rad (P leads Q); (c) Particle P; (d) \( t = \pi/18 \) s ≈ 0.175 s.

## WORKED_EXAMPLE_3
PROBLEM: A 200 g block is attached to a spring of spring constant 50 N/m on a frictionless horizontal surface. The block is pulled to \( x = 6 \text{ cm} \) and given an initial velocity of \( 20 \text{ cm/s} \) towards the equilibrium position. (a) Find the amplitude \( A \) and phase constant \( \phi \) of the resulting SHM. (b) Write the displacement equation \( x(t) \). (c) Find the maximum speed and the time when it first occurs. (d) If a second identical block-spring system is started from rest at \( x = -6 \text{ cm} \), find the phase difference between the two systems at any time \( t \).

STEPS:
- Step 1: Identify given quantities and compute angular frequency. Mass \( m = 0.2 \text{ kg} \), \( k = 50 \text{ N/m} \). \( \omega = \sqrt{k/m} = \sqrt{50/0.2} = \sqrt{250} = 5\sqrt{10} \approx 15.811 \text{ rad/s} \). Initial displacement \( x_0 = +0.06 \text{ m} \). Initial velocity \( v_0 = -0.20 \text{ m/s} \) (towards equilibrium from positive x means negative direction).
- Step 2: Find amplitude \( A \) using energy conservation or \( A^2 = x_0^2 + (v_0/\omega)^2 \). \( v_0/\omega = -0.20 / 15.811 \approx -0.01265 \text{ m} \). \( A = \sqrt{(0.06)^2 + (0.01265)^2} = \sqrt{0.0036 + 0.000160} = \sqrt{0.00376} \approx 0.06132 \text{ m} = 6.13 \text{ cm} \).
- Step 3: Find phase constant \( \phi \). \( \cos \phi = x_0/A = 0.06 / 0.06132 \approx 0.9785 \Rightarrow \phi \approx \pm 0.209 \text{ rad} \) (≈ ±12°). \( \sin \phi = -v_0/(\omega A) = -(-0.20) / (15.811 \times 0.06132) = 0.20 / 0.9696 \approx 0.2063 > 0 \). So \( \phi \) is in first quadrant: \( \phi \approx +0.209 \text{ rad} \). (Exact: \( \tan \phi = -v_0/(\omega x_0) = 0.20/(15.811 \times 0.06) \approx 0.2108 \Rightarrow \phi \approx 0.208 \text{ rad} \)).
- Step 4: Write displacement equation. \( x(t) = 0.0613 \cos(15.811 t + 0.209) \) m.
- Step 5: Find maximum speed and first occurrence time. \( v_{\text{max}} = \omega A = 15.811 \times 0.06132 \approx 0.9696 \text{ m/s} \). Maximum speed occurs at mean position \( x=0 \) with positive or negative velocity. First occurrence after \( t=0 \): phase \( \theta = \omega t + \phi = \pi/2 \) (for \( v = -\omega A \sin \theta = -\omega A \) i.e., negative max) or \( 3\pi/2 \) (for positive max). At \( t=0 \), \( \theta = \phi \approx 0.209 \). Moving towards equilibrium from positive x means velocity is negative, so it's heading towards negative max speed first. \( \omega t + \phi = \pi/2 \Rightarrow t = (\pi/2 - \phi)/\omega = (1.5708 - 0.209)/15.811 \approx 1.3618/15.811 \approx 0.0861 \text{ s} \).
- Step 6: Second system: starts from rest at \( x = -6 \text{ cm} = -0.06 \text{ m} \). \( v_0 = 0 \), \( x_0 = -0.06 \). Amplitude \( A_2 = 0.06 \text{ m} \) (since \( v_0=0 \)). \( \cos \phi_2 = x_0/A_2 = -1 \Rightarrow \phi_2 = \pi \) (or \( -\pi \)). Phase difference \( \Delta \phi = \phi_1 - \phi_2 = 0.209 - \pi \approx -2.933 \text{ rad} \) (or \( 2\pi - 2.933 = 3.350 \text{ rad} \)). Magnitude \( |\Delta \phi| \approx 2.93 \text{ rad} \) (≈ 168°). Since phase difference is constant, this is the phase difference at any time \( t \).
- Step 7: Verify. System 1: \( x_0=+6 \text{ cm}, v_0=-20 \text{ cm/s} \). System 2: \( x_0=-6 \text{ cm}, v_0=0 \). Different initial conditions → different \( \phi \). Energy of system 1: \( E_1 = \frac{1}{2}k A_1^2 = 0.5 \times 50 \times (0.0613)^2 \approx 0.094 \text{ J} \). Energy of system 2: \( E_2 = 0.5 \times 50 \times (0.06)^2 = 0.09 \text{ J} \). Different amplitudes, so phase difference is constant but they are not "identical" in energy. The question says "identical block-spring system" meaning same m and k, not same initial energy. Correct.
- Step 8: State final answers. (a) \( A \approx 6.13 \text{ cm} \), \( \phi \approx 0.209 \text{ rad} \). (b) \( x(t) = 6.13 \cos(15.8 t + 0.209) \) cm. (c) \( v_{\text{max}} \approx 0.970 \text{ m/s} \) at \( t \approx 0.0861 \text{ s} \). (d) \( \Delta \phi \approx -2.93 \text{ rad} \) (or \( 3.35 \text{ rad} \)).

REASONING: This problem combines SHM dynamics (ω from k,m), initial condition analysis for A and φ, and phase difference between two independent oscillators. The key is using \( A^2 = x_0^2 + (v_0/\omega)^2 \) and \( \tan \phi = -v_0/(\omega x_0) \) to avoid quadrant errors.

ANSWER: (a) \( A = 6.13 \text{ cm} \), \( \phi = 0.209 \text{ rad} \); (b) \( x(t) = 6.13 \cos(15.8 t + 0.209) \) cm; (c) \( v_{\text{max}} = 0.970 \text{ m/s} \) at \( t = 0.0861 \text{ s} \); (d) \( \Delta \phi = -2.93 \text{ rad} \) (or \( 3.35 \text{ rad} \)).

## COMPETENCY_QUESTION_1
QUESTION: A particle executes SHM described by \( x = A \cos(\omega t + \phi) \). At \( t = 0 \), the particle is at \( x = A/\sqrt{2} \) and its velocity is \( v = -\omega A/\sqrt{2} \). (a) Determine the phase constant \( \phi \). (b) The particle is observed at a later time \( t_1 \) when its phase is \( 5\pi/4 \). What is its displacement and velocity at \( t_1 \)? (c) Another particle executes SHM with the same \( A \) and \( \omega \) but with phase constant \( \phi' = \phi + \pi \). At \( t = 0 \), what is the separation between the two particles? Will this separation remain constant? Justify.

COMPETENCY: Interpreting physical situations using formulas; predicting outcomes from changing variables; unit analysis and dimensional reasoning

STEPS:
- Step 1: Understand the physical situation. Given initial conditions at t=0, find φ using both x₀ and v₀.
- Step 2: Identify relevant principle. x₀ = A cos φ, v₀ = -ωA sin φ. Use both to find φ uniquely.
- Step 3: Apply and solve (a). cos φ = 1/√2, sin φ = 1/√2 (since v₀ negative → sin φ positive). φ = π/4.
- Step 4: Apply and solve (b). At phase = 5π/4, x = A cos(5π/4) = -A/√2. v = -ωA sin(5π/4) = -ωA(-1/√2) = +ωA/√2.
- Step 5: Apply and solve (c). Second particle: x' = A cos(ωt + φ + π) = -A cos(ωt + φ) = -x(t). At t=0, x'₀ = -x₀ = -A/√2. Separation = |x₀ - x'₀| = |A/√2 - (-A/√2)| = A√2. Separation = |x - (-x)| = 2|x|, which varies with time (0 to 2A). Not constant.
- Step 6: Interpret physically. Phase difference of π means the two particles are always on opposite sides of the mean position at equal distances (antiphase). Their separation oscillates between 0 (when both at mean position) and 2A (when both at extremes).

ANSWER: (a) \( \phi = \pi/4 \) rad. (b) At \( t_1 \): \( x = -A/\sqrt{2} \), \( v = +\omega A/\sqrt{2} \). (c) Separation at t=0 is \( A\sqrt{2} \). Separation is NOT constant; it varies as \( 2A|\cos(\omega t + \phi)| \) between 0 and 2A. The particles are in antiphase (phase difference π).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A vertical spring-mass system oscillates with amplitude 4 cm and angular frequency 5 rad/s. At \( t = 0 \), the mass is at \( y = 2 \text{ cm} \) (above equilibrium) and moving downward. A second identical system (same m, k) is started at \( t = 0 \) from \( y = -2 \text{ cm} \) moving upward. (a) Write the displacement equations for both systems taking upward as positive. (b) Find the phase difference between the two oscillations. (c) Determine the first time \( t > 0 \) when both masses are at the same position. (d) At that instant, are they moving in the same direction? Explain using the phase difference.

COMPETENCY: Analyzing multi-concept problems; synthesizing initial conditions with phase relationships; evaluating dynamic behavior

STEPS:
- Step 1: Understand the physical situation. Two identical vertical spring-mass systems (same ω=5 rad/s, A=4 cm=0.04 m). System 1: y₀=+0.02 m, v₀<0 (downward). System 2: y₀=-0.02 m, v₀>0 (upward). Upward positive.
- Step 2: Find φ for each. System 1: cos φ₁ = y₀/A = 0.02/0.04 = 0.5 → φ₁ = ±π/3. v₀ = -ωA sin φ₁ < 0 → sin φ₁ > 0 → φ₁ = +π/3. System 2: cos φ₂ = -0.02/0.04 = -0.5 → φ₂ = ±2π/3. v₀ > 0 → -ωA sin φ₂ > 0 → sin φ₂ < 0 → φ₂ = -2π/3 (or 4π/3, but principal value -π<φ≤π gives -2π/3).
- Step 3: Write equations. y₁(t) = 0.04 cos(5t + π/3) m. y₂(t) = 0.04 cos(5t - 2π/3) m.
- Step 4: Phase difference Δφ = φ₁ - φ₂ = π/3 - (-2π/3) = π rad. They are in antiphase.
- Step 5: Find first t>0 when y₁ = y₂. 0.04 cos(5t + π/3) = 0.04 cos(5t - 2π/3). cos α = cos β → α = ±β + 2nπ. Case 1: 5t+π/3 = 5t-2π/3+2nπ → π=2nπ → no solution for smallest t. Case 2: 5t+π/3 = -(5t-2π/3)+2nπ → 5t+π/3 = -5t+2π/3+2nπ → 10t = π/3+2nπ → t = π/30 + nπ/5. First t>0 at n=0: t = π/30 ≈ 0.1047 s.
- Step 6: Check velocities at that t. Phase of 1: θ₁ = 5(π/30)+π/3 = π/6+π/3 = π/2. v₁ = -ωA sin(π/2) = -ωA < 0 (downward). Phase of 2: θ₂ = 5(π/30)-2π/3 = π/6-2π/3 = -π/2. v₂ = -ωA sin(-π/2) = +ωA > 0 (upward). Velocities are opposite.
- Step 7: Explain using phase difference. Since Δφ = π, the two motions are mirror images: y₂(t) = -y₁(t). When y₁ = y₂, we have y₁ = -y₁ → y₁ = 0. So they meet only at the equilibrium position. At equilibrium, their velocities are equal in magnitude but opposite in direction because one is moving down through equilibrium while the other moves up (antiphase means when one is at +x moving down, the other is at -x moving up; at equilibrium they cross in opposite directions).

ANSWER: (a) \( y_1 = 0.04 \cos(5t + \pi/3) \) m, \( y_2 = 0.04 \cos(5t - 2\pi/3) \) m. (b) \( \Delta \phi = \pi \) rad (antiphase). (c) \( t = \pi/30 \) s ≈ 0.105 s. (d) No, they move in opposite directions. At the meeting point (equilibrium), one moves downward, the other upward. The phase difference of π ensures their velocities are always opposite: \( v_2 = -v_1 \).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe a swing in a playground: when you push a child from rest at the extreme position, the motion starts at maximum ______; when you give a push at the mean position, it starts with maximum speed.

## DIAGNOSTIC_ANSWER_7
displacement

**A wrong answer ("maximum speed" or "zero displacement") reveals the student has swapped the walkthrough's condition - the push from rest at the extreme position starts at maximum displacement.** Displacement is the walkthrough's own condition noun, and the noun is what the blank grades. Recall the mean-position alternative before filling, and give the noun exactly.
