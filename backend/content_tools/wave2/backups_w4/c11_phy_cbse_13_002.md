## ELI5
The grandfather clock's pendulum keeps the purest time in physics: simple harmonic motion, displacement a clean cosine of time, restoring force exactly proportional and always homeward - F = -kx. Amplitude sets the width, omega the pace, phase the head start. Differentiate twice and the acceleration obeys the same homecoming law; anything less linear is merely periodic.

## DEFINITION
Simple Harmonic Motion (SHM) is a special type of periodic oscillatory motion where the displacement of a particle from its equilibrium position varies sinusoidally with time, given by \( x(t) = A \cos(\omega t + \phi) \) or equivalently \( x(t) = A \sin(\omega t + \phi) \), where \( A \) is the amplitude (maximum displacement, unit: metre), \( \omega \) is the angular frequency (unit: rad/s), and \( \phi \) is the phase constant (unit: radian). Equivalently, SHM is defined by the restoring force law \( F = -kx \) (or acceleration \( a = -\omega^2 x \)), where the force is directly proportional to the displacement and always directed towards the mean position.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can identify whether a given displacement function or force law represents SHM, extract the amplitude, angular frequency, and phase constant from the equation, and distinguish SHM from other periodic motions (e.g., superposition of two SHMs with incommensurate frequencies).

## SCOPE_BOUNDARY
This node covers the mathematical definition of SHM via the sinusoidal displacement function and the linear restoring force law \( F = -kx \). It includes the parameters \( A, \omega, \phi \) and their physical meanings. It does NOT cover velocity/acceleration expressions, energy in SHM, spring-mass or pendulum derivations, damped/forced oscillations, or the reference circle construction (these are in subsequent nodes).

## WALKTHROUGH
Observe a swinging pendulum in a grandfather clock or a mass oscillating on a spring in a school laboratory. Notice that the motion repeats after a fixed time and the object moves symmetrically about a central point. Ask: "What mathematical function describes this to-and-fro motion?" Start by measuring displacement from the centre at regular time intervals. Plot displacement vs time – the graph resembles a sine/cosine wave. Connect this to the periodic functions studied in Class 11 Mathematics (trigonometric functions). Introduce the defining equation \( x = A \cos(\omega t + \phi) \) and explain each parameter. Then show that differentiating twice gives \( a = -\omega^2 x \), which leads to the force law \( F = -m\omega^2 x = -kx \). Emphasise that SHM is the *simplest* oscillatory motion because the restoring force is exactly linear.

Takeaway: mastery means recognising SHM from its equation or force law, extracting amplitude, frequency and phase, and testing the linear restoring force. Exam moves: identify-the-SHM questions and extract-the-parameters items. Check yourself: the minus sign in F = -kx is the whole identity - pull displaced, push home. Students miss it because every sway looks harmonic, when the definition's proportionality is the filter: large-angle pendulums and bouncing balls carry non-linear or discontinuous restoring forces, and only the exact linear law earns the name simple harmonic.

## DIAGNOSTIC_QUESTION_1
State the defining equation for displacement in SHM and name each symbol with its SI unit.

## DIAGNOSTIC_ANSWER_1
The defining equation is \( x(t) = A \cos(\omega t + \phi) \). Here \( x \) is displacement from mean position (metre, m), \( A \) is amplitude (metre, m), \( \omega \) is angular frequency (radian per second, rad/s), \( t \) is time (second, s), and \( \phi \) is phase constant (radian, rad). A wrong answer (e.g., writing \( x = A \sin(\omega t) \) without phase, or confusing \( \omega \) with frequency \( \nu \)) reveals the student has not internalised the general form with phase constant or the distinction between angular frequency and ordinary frequency.

## DIAGNOSTIC_QUESTION_2
A particle moves according to \( x(t) = 5 \cos(2t) + 3 \sin(2t) \). Is this SHM? Explain why or why not without solving for a single sinusoidal function.

## DIAGNOSTIC_ANSWER_2
Yes, it is SHM. The function is a linear combination of sine and cosine with the *same* angular frequency \( \omega = 2 \) rad/s. Any such linear combination \( A \cos \omega t + B \sin \omega t \) can be rewritten as a single sinusoid \( D \cos(\omega t + \phi) \) with \( D = \sqrt{A^2+B^2} \) and \( \phi = \tan^{-1}(-B/A) \), which is the standard SHM form. A wrong answer (e.g., saying it is not SHM because it has two terms) shows the student does not recognise that superposition of same-frequency sinusoids yields another sinusoid of that frequency – a key property of linear SHM.

## DIAGNOSTIC_QUESTION_3
The displacement of a particle is given by \( x(t) = 0.04 \cos(10\pi t + \pi/3) \) metre. Calculate the amplitude, period, frequency, and phase constant. Show unit analysis.

## DIAGNOSTIC_ANSWER_3
Given: \( x(t) = 0.04 \cos(10\pi t + \pi/3) \) m.
- Amplitude \( A = 0.04 \) m (coefficient of cosine).
- Angular frequency \( \omega = 10\pi \) rad/s.
- Period \( T = \frac{2\pi}{\omega} = \frac{2\pi}{10\pi} = 0.2 \) s. Unit check: rad/(rad/s) = s.
- Frequency \( \nu = \frac{1}{T} = \frac{1}{0.2} = 5 \) Hz. Unit check: 1/s = Hz.
- Phase constant \( \phi = \pi/3 \) rad (the constant added to \( \omega t \)).
A wrong answer (e.g., \( T = 10\pi/2\pi = 5 \) s) reveals confusion between \( \omega \) and \( \nu \) or incorrect inversion of the period formula.

## DIAGNOSTIC_QUESTION_4
Two displacement functions are given: (i) \( x_1 = A \cos(\omega t) \) and (ii) \( x_2 = A \cos(\omega t) + B \cos(2\omega t) \). Which represents SHM? Which is periodic but not SHM? Justify using the definition of SHM and the concept of periodicity.

## DIAGNOSTIC_ANSWER_4
(i) \( x_1 = A \cos(\omega t) \) is SHM because it is a single sinusoid with angular frequency \( \omega \). (ii) \( x_2 = A \cos(\omega t) + B \cos(2\omega t) \) is periodic (period \( T = 2\pi/\omega \)) but **not** SHM because it contains two different angular frequencies (\( \omega \) and \( 2\omega \)). SHM requires *exactly one* angular frequency; the superposition of two different frequencies yields a non-sinusoidal periodic function. A wrong answer (e.g., claiming both are SHM) shows the student equates "periodic" with "simple harmonic" and misses the single-frequency requirement.

## DIAGNOSTIC_QUESTION_5
A student claims: "Any motion that repeats after a fixed time interval is SHM." Evaluate this statement. Give a counterexample from the NCERT textbook (or your own) that is periodic but not SHM.

## DIAGNOSTIC_ANSWER_5
The statement is **false**. Periodicity is necessary but not sufficient for SHM. SHM additionally requires the restoring force to be linear in displacement (\( F \propto -x \)) or equivalently the displacement to be a single sinusoidal function of time. Counterexample: Uniform circular motion is periodic but not oscillatory (hence not SHM). Another example: a ball bouncing elastically on a floor – its motion is periodic (parabolic segments) but the force is constant (\( mg \)) except at impact, not proportional to displacement. A wrong evaluation (e.g., agreeing with the statement) reveals the student conflates "periodic motion" with "simple harmonic motion" and has not grasped the defining linearity condition.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a spring and a mass to verify whether the oscillation is SHM. What measurements would you take, and how would you analyse the data to confirm the linear force law \( F = -kx \)?

## DIAGNOSTIC_ANSWER_6
Hang a spring vertically, attach a mass, and let it oscillate with small amplitude. Use a motion sensor or video analysis to record displacement \( x(t) \). Plot \( x \) vs \( t \); fit to \( A \cos(\omega t + \phi) \). If the fit is excellent (residuals near zero), the motion is sinusoidal → SHM. Alternatively, measure the period \( T \) for different amplitudes; in SHM, \( T \) is independent of amplitude (isochronism). To directly test \( F = -kx \), hang different known masses and measure static extension \( x \); plot \( F = mg \) vs \( x \). A straight line through origin confirms Hooke's law. A poor answer (e.g., just saying "measure time period") shows the student does not connect the definition to experimental verification of the linear restoring force.

## COMMON_MISCONCEPTION
Students often think that **any oscillatory motion is SHM** (e.g., a simple pendulum at large angles, a ball bouncing on a floor, or a nonlinear spring). They confuse "periodic" with "simple harmonic" and do not realise that SHM strictly requires the restoring force to be *exactly* proportional to displacement (\( F = -kx \)). For instance, a pendulum's restoring torque is \( -mgL \sin\theta \), which is linear only for small \( \theta \) (\( \sin\theta \approx \theta \)). At large amplitudes, the motion is periodic but not SHM because the force law contains \( \theta^3 \) and higher terms.

## ON_FAILURE
1. Revisit the definition: SHM ⇔ \( F = -kx \) ⇔ \( x = A \cos(\omega t + \phi) \).  
2. Perform the "pendulum at large angle" thought experiment: plot \( \sin\theta \) vs \( \theta \) for \( \theta = 10^\circ, 30^\circ, 60^\circ \). See the deviation from linearity.  
3. Use a spring with a known nonlinear force (e.g., rubber band) and observe that the \( x-t \) graph is not a perfect sine wave.  
4. Practice identifying SHM from given functions: pick out the single-frequency sinusoids.  
5. Memorise the two equivalent definitions (displacement form and force form) and the condition "single angular frequency".

## PREREQUISITE_NODE_IDS
c11_phy_cbse_13_001, c9_math_ch8_1, c9_math_ch8_2, c10_math_cbse_08_001, c10_math_cbse_08_006, c9_math_ch8_4

## PREREQUISITE_REASONS
c11_phy_cbse_13_001: Understanding periodic and oscillatory motion definitions (period, frequency, equilibrium position) is essential before specialising to SHM.  
c9_math_ch8_1: Sequences and series background helps in understanding periodic functions as infinite sums (Fourier series context).  
c9_math_ch8_2: Explicit and recursive rules for sequences build the idea of a function repeating at regular intervals.  
c10_math_cbse_08_001: Trigonometric ratios (sin, cos) are the mathematical functions used to describe SHM.  
c10_math_cbse_08_006: Trigonometric identity \( \sin^2\theta + \cos^2\theta = 1 \) is used to combine sine and cosine into a single sinusoid with phase.
c9_math_ch8_4: c9_math_ch8_4 | Arithmetic progression concept of common difference helps understand constant phase increment \( \omega \Delta t \) in SHM.  

## FORWARD_NODE_IDS
c11_phy_cbse_13_003, c11_phy_cbse_13_004, c11_phy_cbse_13_005, c11_phy_cbse_13_006, c11_phy_cbse_13_009, c11_phy_cbse_13_007, c11_phy_cbse_13_008, c11_phy_cbse_13_010, c12_phy_cbse_07_006, c12_phy_cbse_07_008, c12_phy_cbse_14_001, c12_phy_cbse_05_002

## FORWARD_REASONS
c11_phy_cbse_13_003: Velocity and acceleration in SHM are derived by differentiating the displacement definition.  
c11_phy_cbse_13_004: Energy expressions use the displacement and velocity from the SHM definition.  
c11_phy_cbse_13_005: Simple pendulum derivation uses the small-angle approximation to show its motion satisfies the SHM force law.  
c11_phy_cbse_13_006: Spring-mass system directly implements \( F = -kx \), the force-law definition of SHM.  
c11_phy_cbse_13_009: Phase constant \( \phi \) and initial phase are fully developed from the definition \( x = A \cos(\omega t + \phi) \).
c11_phy_cbse_13_007: SHM definition provides the undamped reference (x = A cos(ωt+φ), F = -kx) that damping modifies.  
c11_phy_cbse_13_008: SHM definition provides the natural frequency ω₀ = √(k/m) which is the reference point for forced oscillations.  
c11_phy_cbse_13_010: Defines SHM and the force law F = –kx — core to identifying restoring force in problems.  
c12_phy_cbse_07_006: Defines SHM, the foundation for understanding oscillatory behavior in LC circuits.  
c12_phy_cbse_07_008: The definition and mathematical description of Simple Harmonic Motion (SHM) provides the direct analogy: LC oscillations are the electrical equivalent of SHM.  
c12_phy_cbse_14_001: SHM displacement/velocity/acceleration relations are analogous to electron wavefunctions in periodic potentials.  
c12_phy_cbse_05_002: alence) with torque in uniform field (this node) and simple harmonic motion (Class 11 oscillations, c11_phy_cbse_13_002). The restoring torque is magnetic, leading to angular SHM.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_001, c11_math_cbse_03_002, c11_math_cbse_03_003, c11_math_cbse_03_004, c11_math_cbse_03_005
## CROSS_SUBJECT_REASONS
c11_math_ch03_001: Trigonometric functions (sine, cosine) and their graphs are the mathematical language of SHM.  
c11_math_ch03_002: Domain and range of trigonometric functions determine the amplitude bounds \( [-A, A] \).  
c11_math_ch03_003: Compound angle formulas \( \cos(\omega t + \phi) \) are used to expand the SHM equation.  
c11_math_ch03_004: Transformation formulas convert between \( A \cos(\omega t) + B \sin(\omega t) \) and \( D \cos(\omega t + \phi) \).  
c11_math_ch03_005: Trigonometric equations help solve for time when displacement reaches a given value.
c11_math_cbse_03_001: Cross-subject support: An angle is a measure of rotation of a ray about its initial point, where the amount of ro... supplies tools/facts used directly in this node.  
c11_math_cbse_03_002: Cross-subject support: The conversion between degree measure and radian measure is based on the equivalence of a... supplies tools/facts used directly in this node.  
c11_math_cbse_03_003: Cross-subject support: For any angle \(x\) measured in radians, let \(P(a, b)\) be the point on the unit circle \... supplies tools/facts used directly in this node.  
c11_math_cbse_03_004: Cross-subject support: Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of sid... supplies tools/facts used directly in this node.  
c11_math_cbse_03_005: Cross-subject support: Trigonometric functions of any angle are defined using the unit circle: supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_13_001 -> c11_phy_cbse_13_002 -> c11_phy_cbse_13_003

## THIS_FORMULA
\( x(t) = A \cos(\omega t + \phi) \)  (displacement in SHM)  
\( F = -kx \)  (restoring force law for SHM)  
\( \omega = \sqrt{k/m} \)  (angular frequency for spring-mass system)  
\( T = 2\pi/\omega = 2\pi\sqrt{m/k} \)  (period)

## FORMULA_VARIABLES
\( x \) = displacement from mean position (m)  
\( A \) = amplitude, maximum displacement (m)  
\( \omega \) = angular frequency (rad/s)  
\( t \) = time (s)  
\( \phi \) = phase constant / initial phase (rad)  
\( F \) = restoring force (N)  
\( k \) = force constant / spring constant (N/m)  
\( m \) = mass of oscillating particle (kg)  
\( T \) = time period (s)  
\( \nu \) = frequency (Hz = s⁻¹)

## FORMULA_UNITS
m, rad/s, s, rad, N, N/m, kg, Hz

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch03_001 | Trigonometric functions sin and cos are the basis of the SHM displacement equation; their periodicity \( 2\pi \) directly gives the relation \( \omega = 2\pi/T \).  
c11_math_ch03_004 | The transformation \( A \cos\theta + B \sin\theta = \sqrt{A^2+B^2} \cos(\theta - \delta) \) is used to write any linear combination of sine and cosine (same frequency) as a single SHM with a phase constant.  
c9_math_ch8_4 | Arithmetic progression concept of common difference helps understand constant phase increment \( \omega \Delta t \) in SHM.

## PREREQ_CONCEPT
Periodic motion, equilibrium position, restoring force, and basic trigonometric functions (sine, cosine).

## PREREQ_BEFORE
The student must be able to plot and interpret \( y = A \cos(\omega t + \phi) \), identify its amplitude, period, and phase shift, and understand that a restoring force directed toward equilibrium is necessary for oscillations.

## PREREQ_STUCK
Review Class 11 Mathematics trigonometric functions (Chapter 3) – specifically graphing \( y = a \cos(bx + c) \) and the compound angle formulas.

## WORKED_EXAMPLE_1
PROBLEM: A vertical spring-mass system oscillates with a displacement given by \( x(t) = 0.12 \cos(8\pi t + \pi/6) \) metre. Determine (a) the amplitude, (b) the angular frequency, (c) the time period, (d) the frequency, (e) the phase constant, and (f) the displacement at \( t = 0.05 \) s.  
STEPS:
- Step 1: Identify the given equation and compare with standard form \( x(t) = A \cos(\omega t + \phi) \).  
- Step 2: Extract amplitude \( A = 0.12 \) m. Unit: metre.  
- Step 3: Extract angular frequency \( \omega = 8\pi \) rad/s. Unit: rad/s.  
- Step 4: Compute period \( T = 2\pi/\omega = 2\pi/(8\pi) = 0.25 \) s. Unit check: rad/(rad/s) = s.  
- Step 5: Compute frequency \( \nu = 1/T = 1/0.25 = 4 \) Hz. Unit check: 1/s = Hz.  
- Step 6: Extract phase constant \( \phi = \pi/6 \) rad.  
- Step 7: Find displacement at \( t = 0.05 \) s: \( x = 0.12 \cos(8\pi \times 0.05 + \pi/6) = 0.12 \cos(0.4\pi + \pi/6) \). Compute \( 0.4\pi = 2\pi/5 = 72^\circ \), \( \pi/6 = 30^\circ \), sum = 102°. \( \cos 102^\circ \approx -0.2079 \). \( x \approx 0.12 \times (-0.2079) = -0.0249 \) m.  
REASONING: The standard SHM equation directly yields all parameters. The phase constant shifts the starting point; evaluating at a specific time requires careful angle calculation in radians or degrees consistently.  
ANSWER: (a) 0.12 m, (b) 8π rad/s, (c) 0.25 s, (d) 4 Hz, (e) π/6 rad, (f) -0.025 m (approx).

## WORKED_EXAMPLE_2
PROBLEM: A particle is subjected to a force \( F = -4x \) newton, where \( x \) is in metres. The particle has mass 0.5 kg. (a) Show that the motion is SHM. (b) Find the angular frequency, period, and frequency. (c) If the particle is released from rest at \( x = 0.1 \) m, write the displacement equation \( x(t) \).  
STEPS:
- Step 1: Check force law: \( F = -4x \) is of the form \( F = -kx \) with \( k = 4 \) N/m. Hence motion is SHM.  
- Step 2: Use \( \omega = \sqrt{k/m} = \sqrt{4/0.5} = \sqrt{8} = 2\sqrt{2} \) rad/s. Unit: sqrt(N/m / kg) = sqrt(kg·m/s² / m / kg) = sqrt(1/s²) = 1/s = rad/s.  
- Step 3: Period \( T = 2\pi/\omega = 2\pi/(2\sqrt{2}) = \pi/\sqrt{2} \approx 2.22 \) s.  
- Step 4: Frequency \( \nu = 1/T = \sqrt{2}/\pi \approx 0.45 \) Hz.  
- Step 5: Initial conditions: at \( t = 0 \), \( x = 0.1 \) m, \( v = 0 \) (released from rest).  
- Step 6: General solution \( x(t) = A \cos(\omega t + \phi) \). At \( t = 0 \), \( x(0) = A \cos\phi = 0.1 \). Velocity \( v(t) = -A\omega \sin(\omega t + \phi) \), so \( v(0) = -A\omega \sin\phi = 0 \) ⇒ \( \sin\phi = 0 \) ⇒ \( \phi = 0 \) or \( \pi \).  
- Step 7: With \( \phi = 0 \), \( A = 0.1 \) m. With \( \phi = \pi \), \( A = -0.1 \) m (amplitude taken positive, so choose \( \phi = 0, A = 0.1 \)).  
- Step 8: Displacement equation: \( x(t) = 0.1 \cos(2\sqrt{2} \, t) \) m.  
REASONING: The force law \( F = -kx \) is the defining condition for SHM. The constants \( \omega, T, \nu \) follow from \( k \) and \( m \). Initial conditions determine \( A \) and \( \phi \).  
ANSWER: (a) Yes, \( F = -kx \) with \( k = 4 \) N/m. (b) \( \omega = 2\sqrt{2} \) rad/s, \( T = \pi/\sqrt{2} \) s ≈ 2.22 s, \( \nu = \sqrt{2}/\pi \) Hz ≈ 0.45 Hz. (c) \( x(t) = 0.1 \cos(2\sqrt{2} \, t) \) m.

## WORKED_EXAMPLE_3
PROBLEM: The displacement of a particle is given by \( x(t) = 3 \cos(2t) + 4 \sin(2t) \) cm. (a) Prove this represents SHM and find its amplitude and phase constant. (b) Write the expression for velocity \( v(t) \) and acceleration \( a(t) \). (c) Find the maximum speed and maximum acceleration. (d) Determine the force law if the particle's mass is 200 g.  
STEPS:
- Step 1: Recognize that \( x(t) \) is a linear combination of \( \cos(2t) \) and \( \sin(2t) \) with the same angular frequency \( \omega = 2 \) rad/s. Hence it is SHM.  
- Step 2: Combine into single cosine: \( A = \sqrt{3^2 + 4^2} = 5 \) cm = 0.05 m. Phase constant \( \phi \) satisfies \( \cos\phi = 3/5 \), \( \sin\phi = -4/5 \) (since \( A\cos(\omega t + \phi) = A\cos\phi \cos\omega t - A\sin\phi \sin\omega t \)). Thus \( \phi = -\tan^{-1}(4/3) \approx -0.927 \) rad (or \( 2\pi - 0.927 \)).  
- Step 3: Displacement: \( x(t) = 5 \cos(2t - 0.927) \) cm.  
- Step 4: Velocity \( v(t) = dx/dt = -5 \times 2 \sin(2t - 0.927) = -10 \sin(2t - 0.927) \) cm/s.  
- Step 5: Acceleration \( a(t) = dv/dt = -10 \times 2 \cos(2t - 0.927) = -20 \cos(2t - 0.927) \) cm/s².  
- Step 6: Maximum speed \( v_{\text{max}} = A\omega = 5 \times 2 = 10 \) cm/s = 0.1 m/s. Maximum acceleration \( a_{\text{max}} = A\omega^2 = 5 \times 4 = 20 \) cm/s² = 0.2 m/s².  
- Step 7: Force law: \( F = m a \). Mass \( m = 200 \) g = 0.2 kg. \( F = 0.2 \times (-20 \cos(2t - 0.927)) \) N = \( -4 \cos(2t - 0.927) \) N. But \( x = 0.05 \cos(2t - 0.927) \) m, so \( F = -80 x \) N. Hence \( k = 80 \) N/m.  
REASONING: Combining sine and cosine of same frequency yields SHM with modified amplitude and phase. Derivatives give velocity and acceleration; their maxima are \( A\omega \) and \( A\omega^2 \). The force law is extracted from \( F = ma = -m\omega^2 x \).  
ANSWER: (a) Amplitude = 5 cm, phase constant ≈ -0.927 rad. (b) \( v(t) = -10 \sin(2t - 0.927) \) cm/s, \( a(t) = -20 \cos(2t - 0.927) \) cm/s². (c) \( v_{\text{max}} = 10 \) cm/s, \( a_{\text{max}} = 20 \) cm/s². (d) \( F = -80x \) N (k = 80 N/m).

## COMPETENCY_QUESTION_1
QUESTION: A student records the displacement of an oscillating object at different times and obtains the following data: \( t = 0 \) s, \( x = 5 \) cm; \( t = 0.25 \) s, \( x = 0 \) cm; \( t = 0.5 \) s, \( x = -5 \) cm; \( t = 0.75 \) s, \( x = 0 \) cm; \( t = 1.0 \) s, \( x = 5 \) cm. The student claims the motion is SHM with amplitude 5 cm and period 1 s. Is the claim fully justified? What additional check must be performed to confirm SHM?  
COMPETENCY: Interpreting physical situations using formulas and identifying necessary vs sufficient conditions.  
STEPS:
- Step 1: Observe that the data points match a cosine function with amplitude 5 cm and period 1 s (since \( x(1) = x(0) \)).  
- Step 2: Note that the data is consistent with SHM, but a few discrete points cannot *prove* the motion is sinusoidal for all times.  
- Step 3: The defining requirement for SHM is that the *entire* displacement function is a single sinusoid (or equivalently \( a = -\omega^2 x \) for all \( x \)).  
- Step 4: Additional check: measure many more points to verify the continuous curve is exactly \( x = 5 \cos(2\pi t) \) cm, or verify the force law by measuring acceleration at each displacement and checking \( a \propto -x \).  
ANSWER: The claim is plausible but not fully justified by only five data points. The data fits one period of a cosine wave, but SHM requires the motion to be exactly sinusoidal at all times. The student must either record a dense time-series to confirm the functional form or verify the linear restoring force law \( F = -kx \) independently.  
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two particles execute SHM along the same line with equations \( x_1 = 4 \cos(2t) \) cm and \( x_2 = 4 \sin(2t) \) cm. (a) What is the phase difference between them? (b) At what time \( t \) do they first have the same displacement after \( t = 0 \)? (c) If they are attached to the same spring (massless) fixed at one end, can they oscillate independently with these equations? Explain.  
COMPETENCY: Predicting outcomes from changing variables and applying superposition principle.  
STEPS:
- Step 1: Rewrite \( x_2 = 4 \sin(2t) = 4 \cos(2t - \pi/2) \). Phase of \( x_1 \) is \( 2t \), phase of \( x_2 \) is \( 2t - \pi/2 \). Phase difference = \( \pi/2 \) rad (90°).  
- Step 2: Set \( x_1 = x_2 \): \( 4 \cos(2t) = 4 \sin(2t) \) ⇒ \( \tan(2t) = 1 \) ⇒ \( 2t = \pi/4, 5\pi/4, \dots \). First positive \( t = \pi/8 \approx 0.393 \) s.  
- Step 3: For a single spring-mass system, the equation of motion is \( m\ddot{x} = -kx \). Its general solution is \( x = A \cos(\omega t + \phi) \) with \( \omega = \sqrt{k/m} \). Two independent solutions with the same \( \omega \) but different phases can be superposed, but the *system* can only have one resultant motion at a time. The two given motions are two possible initial conditions, not simultaneous independent oscillations of the same mass.  
- Step 4: If two separate masses are on the same spring (e.g., one on each side), they could oscillate with a phase difference, but the spring would couple them. The problem says "attached to the same spring", implying one mass. Hence they cannot oscillate independently; the actual motion is a single SHM determined by initial conditions.  
ANSWER: (a) Phase difference = \( \pi/2 \) rad. (b) First same displacement at \( t = \pi/8 \) s ≈ 0.393 s. (c) No, a single mass on a spring can only execute one SHM at a time; the two equations represent two different possible initial conditions, not simultaneous motions.  
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe a swinging pendulum in a grandfather clock or a mass ______ on a spring in a school laboratory.

## DIAGNOSTIC_ANSWER_7
oscillating

**A wrong answer ("hanging" or "swinging") reveals the student has paraphrased the walkthrough's participle - a mass oscillating on a spring.** Oscillating is the walkthrough's own participle, and the participle is what the blank grades. Recall the grandfather clock before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Simple Harmonic Motion (SHM)?

## DIAGNOSTIC_ANSWER_8
Students often think that any oscillatory motion is SHM (e.g., a simple pendulum at large angles, a ball bouncing on a floor, or a nonlinear spring).

**A wrong answer (every oscillation is SHM) reveals the student holds the flagged mix-up.** SHM demands a restoring force exactly proportional to displacement - large-angle pendulums bend the rule, bouncing balls break it outright, and only the linear homecoming law qualifies.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can identify whether a given displacement function or force law represents SHM, extract the amplitude, angular frequency, and phase constant from the equation, and distinguish SHM from other periodic motions (e.g., superposition of two SHMs with incommensurate frequencies).

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe a swinging pendulum in a ______ clock or a mass oscillating on a spring in a school laboratory.

## DIAGNOSTIC_ANSWER_10
grandfather

**A wrong answer ("school" or "wall") reveals the student has swapped the walkthrough's adjective - the pendulum hangs in a grandfather clock.** Grandfather is the walkthrough's own adjective for that clock, and the adjective is what the blank grades. Recall the spring-mass companion before filling, and give the adjective exactly.
