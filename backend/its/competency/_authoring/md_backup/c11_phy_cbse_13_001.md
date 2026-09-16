## DEFINITION
Periodic motion is a motion that repeats itself identically after a fixed interval of time called the period (T). Oscillatory motion is a special type of periodic motion where a particle moves to and fro about a stable equilibrium position under the action of a restoring force. The frequency (ν) is the reciprocal of the period (ν = 1/T) measured in hertz (Hz). Displacement in oscillations refers to the change with time of any physical quantity (position, angle, voltage, pressure) from its equilibrium value and can be represented by a sinusoidal function of time.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can distinguish between periodic and oscillatory motion with examples, define period and frequency with correct SI units, identify the equilibrium position in a given oscillatory system, and express displacement as a sinusoidal function of time (e.g., x = A cos ωt) recognizing that displacement is not limited to spatial position.

## SCOPE_BOUNDARY
This node covers definitions of periodic motion, oscillatory motion, period, frequency, and the generalized concept of displacement. It does NOT cover simple harmonic motion (SHM) definitions, velocity/acceleration in SHM, energy in SHM, spring-mass systems, simple pendulum derivations, damped/forced oscillations, or phase constant details. Those are addressed in subsequent nodes (c11_phy_cbse_13_002 onwards).

## WALKTHROUGH
Observe a ceiling fan rotating at constant speed — its motion repeats but the blade does not move to and fro about a fixed point; it is periodic but not oscillatory. Now observe a swing in a playground: the child moves back and forth about the lowest point (equilibrium). Use a stopwatch to measure the time for 10 complete to-and-fro motions of the swing; divide by 10 to get the period T. Recall from Class 7 (c7_physics_ch04_002) that the pendulum's period depends on length. The number of oscillations per second is the frequency ν = 1/T. Generalize: the voltage across a capacitor in an AC circuit also oscillates — its displacement is voltage, not position.

## DIAGNOSTIC_QUESTION_1
A student claims that the motion of the Earth around the Sun is oscillatory because it repeats every year. Is the student correct? Justify your answer using the definitions of periodic and oscillatory motion.

## DIAGNOSTIC_ANSWER_1
No, the student is incorrect. The Earth's orbital motion is periodic (repeats after a fixed interval of 1 year) but not oscillatory because the Earth does not move to and fro about an equilibrium position; it undergoes circular/elliptical motion without a restoring force directed toward a fixed mean position. A wrong answer reveals the misconception that all periodic motions are oscillatory.

## DIAGNOSTIC_QUESTION_2
The displacement of a particle in an oscillatory system is given by x(t) = 0.05 cos(10πt) where x is in meters and t in seconds. What is the physical meaning of the number 0.05 and the term 10π? Explain why this displacement function represents an oscillatory motion.

## DIAGNOSTIC_ANSWER_2
0.05 m is the amplitude (maximum displacement from equilibrium). 10π rad/s is the angular frequency ω, related to period by T = 2π/ω = 0.2 s. The cosine function varies between -1 and +1, so x(t) moves symmetrically about zero (equilibrium), confirming to-and-fro motion. A wrong answer indicates the student cannot link the mathematical form to the physical concepts of amplitude, equilibrium, and periodic repetition.

## DIAGNOSTIC_QUESTION_3
A quartz crystal in a digital watch vibrates with a frequency of 32,768 Hz. Calculate its period of vibration in microseconds (μs). Show unit conversion steps.

## DIAGNOSTIC_ANSWER_3
Given ν = 32,768 Hz = 32,768 s⁻¹. Period T = 1/ν = 1/32,768 s ≈ 3.0518 × 10⁻⁵ s. Convert to μs: 1 s = 10⁶ μs, so T = 3.0518 × 10⁻⁵ × 10⁶ μs = 30.518 μs ≈ 30.5 μs. A wrong answer (e.g., forgetting unit conversion or misplacing decimal) reveals difficulty with reciprocal relationship and metric prefixes.

## DIAGNOSTIC_QUESTION_4
Figure shows four x-t graphs. Graph A: straight line with positive slope. Graph B: parabola opening upward. Graph C: repeating sinusoidal curve. Graph D: repeating sawtooth pattern (sharp peaks). Which graphs represent periodic motion? For the periodic ones, which represent oscillatory motion? Explain your reasoning.

## DIAGNOSTIC_ANSWER_4
Graphs C and D are periodic (repeat after a fixed interval). Graph C is oscillatory (sinusoidal, symmetric about an equilibrium position, implying a restoring force). Graph D is periodic but not oscillatory (the motion is not symmetric to-and-fro about a mean position; it resembles a particle moving with constant velocity and instantly reversing, which requires infinite force). A wrong answer shows inability to distinguish oscillatory from non-oscillatory periodic motion based on symmetry and physical plausibility.

## DIAGNOSTIC_QUESTION_5
A student writes the displacement of an oscillating simple pendulum as θ(t) = 0.2 sin(5t) where θ is in degrees and t in seconds. Evaluate the correctness of this equation. If incorrect, provide the correct form with proper units.

## DIAGNOSTIC_ANSWER_5
The equation is incorrect because the argument of a trigonometric function must be in radians (dimensionless). 5t has units of rad/s × s = rad, but 0.2 is in degrees. The amplitude should be in radians: 0.2° = 0.2 × π/180 ≈ 0.00349 rad. Correct form: θ(t) = 0.00349 sin(5t) rad. A wrong evaluation indicates the student overlooks the radian requirement for angular arguments in calculus-based physics.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using household items to demonstrate the difference between periodic motion that is oscillatory and periodic motion that is not oscillatory. List materials, procedure, and the observations that distinguish the two.

## DIAGNOSTIC_ANSWER_6
Materials: a thread with a small stone (pendulum), a rotating stool or a bicycle wheel mounted on an axle. Procedure: (1) Displace the pendulum slightly and release; observe to-and-fro motion about the lowest point. (2) Spin the bicycle wheel; observe continuous rotation. Observations: The pendulum moves back and forth about an equilibrium position (oscillatory). The wheel repeats its orientation after each full turn but does not have an equilibrium position it returns to after displacement; it is periodic but not oscillatory. A poor answer fails to identify the equilibrium position or the restoring force as the distinguishing feature.

## COMMON_MISCONCEPTION
Students often believe that any motion that repeats is oscillatory. For example, they classify the rotation of a ceiling fan or the motion of a bouncing ball (which loses height) as oscillatory. The first lacks an equilibrium position with a restoring force; the second is not perfectly periodic due to energy loss. They also restrict displacement to spatial position only, not recognizing voltage, pressure, or angle as displacement variables.

## ON_FAILURE
Step 1: Set up a simple pendulum (string + nut) and a rotating object (e.g., a spinning top). Step 2: Displace the pendulum and the top from their rest states. Step 3: Observe that the pendulum experiences a force pulling it back to the center (restoring force), while the top continues spinning without a preferred equilibrium orientation. Step 4: Write the definition: "Oscillatory motion = periodic motion + equilibrium position + restoring force." Step 5: List three non-position displacements: AC voltage, sound pressure, pendulum angle.

## PREREQUISITE_NODE_IDS
c7_physics_ch04_002, c6_physics_ch08_033, c9_physics_ch2_10, c10_math_cbse_08_001
## PREREQUISITE_REASONS
c7_physics_ch04_002: Introduces the simple pendulum as an example of periodic/oscillatory motion and the concept of period.
c6_physics_ch08_033: Establishes the pendulum as a time-measuring device, linking period to time measurement.
c9_physics_ch2_10: Covers uniform circular motion, which is periodic but not oscillatory, providing a contrast.
c10_math_cbse_08_001: Provides the trigonometric functions (sin, cos) used to represent displacement in oscillations.

## FORWARD_NODE_IDS
c11_phy_cbse_13_002, c11_phy_cbse_13_003, c11_phy_cbse_13_009, c11_phy_cbse_13_005, c11_phy_cbse_13_010, c12_phy_cbse_14_001

## FORWARD_REASONS
c11_phy_cbse_13_002: Builds on the definition of oscillatory motion to introduce SHM as the simplest form where restoring force is proportional to displacement.
c11_phy_cbse_13_003: Uses the displacement function x(t) = A cos(ωt+φ) to derive velocity and acceleration expressions.
c11_phy_cbse_13_009: Expands the phase concept (ωt+φ) introduced here to include initial phase constant and its determination.
c11_phy_cbse_13_005: Defines periodic motion and period T, which is the quantity we derive.  
c11_phy_cbse_13_010: Defines periodic/oscillatory motion — needed to recognize SHM in word problems.  
c12_phy_cbse_14_001: Periodic and oscillatory motion concepts underlie the quantum mechanical wave nature of electrons in crystals.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c10_math_cbse_08_006
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios (sin, cos) are the mathematical basis for describing sinusoidal displacement in oscillations.
c10_math_cbse_08_006: The identity sin²θ + cos²θ = 1 is used later to prove energy conservation in SHM and to combine sine and cosine terms into a single sinusoidal function.

## CHAIN_DESCRIPTION
c7_physics_ch04_002 -> c11_phy_cbse_13_001 -> c11_phy_cbse_13_002

## THIS_FORMULA
ν = 1/T  (Hz = s⁻¹) ; T = 2π/ω  (s) ; x(t) = A cos(ωt + φ)  (m or rad or V, etc.)

## FORMULA_VARIABLES
ν = frequency (Hz = s⁻¹), T = period (s), ω = angular frequency (rad/s), A = amplitude (m, rad, V, etc.), φ = phase constant (rad), x(t) = displacement as function of time (same unit as A).

## FORMULA_UNITS
Hz, s, rad/s, m, rad, V

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric functions (sin, cos) model the time variation of displacement in oscillatory systems.
c10_math_cbse_08_006 | Pythagorean trigonometric identity enables conversion between sine/cosine forms and energy conservation proofs.

## PREREQ_CONCEPT
Understanding of periodic motion from Class 7 (pendulum) and uniform circular motion from Class 9, plus familiarity with trigonometric functions from Class 10 Maths.

## PREREQ_BEFORE
Student must be able to interpret a graph of a periodic function, compute period from frequency and vice versa, and recognize sin/cos as bounded oscillating functions.

## PREREQ_STUCK
Revisit c7_physics_ch04_002 (simple pendulum period) and c10_math_cbse_08_001 (trigonometric ratios) to refresh the connection between repetitive motion and sinusoidal functions.

## WORKED_EXAMPLE_1
PROBLEM: A human heart beats 72 times per minute. Calculate the frequency in Hz and the period in seconds. If the heartbeat is modeled as a sinusoidal pressure variation with amplitude 16 kPa, write the displacement function p(t) assuming zero phase constant.
STEPS:
- Step 1: Identify given: beats per minute = 72 min⁻¹. Convert to per second: 72/60 = 1.2 s⁻¹. This is frequency ν = 1.2 Hz.
- Step 2: Period T = 1/ν = 1/1.2 s = 0.8333 s.
- Step 3: Amplitude A = 16 kPa = 16,000 Pa. Angular frequency ω = 2πν = 2π × 1.2 = 7.54 rad/s.
- Step 4: Displacement function: p(t) = A cos(ωt) = 16,000 cos(7.54t) Pa.
- Step 5: Verify: At t=0, p=16,000 Pa (max). At t=T/4=0.208 s, ωt=π/2, p=0. At t=T/2=0.417 s, ωt=π, p=-16,000 Pa (min). Physically reasonable.
REASONING: Heartbeat is a periodic pressure oscillation. Frequency is cycles per second. The sinusoidal model captures the periodic rise and fall of pressure. The zero phase constant means we start measuring at maximum pressure (systole).
ANSWER: ν = 1.2 Hz, T = 0.833 s, p(t) = 16,000 cos(7.54t) Pa.

## WORKED_EXAMPLE_2
PROBLEM: The voltage across a capacitor in an AC circuit is given by V(t) = 311 cos(100πt) volts. Determine (a) the amplitude, (b) the frequency, (c) the period, (d) the voltage at t = 2.5 ms.
STEPS:
- Step 1: Identify amplitude A = 311 V (coefficient of cosine).
- Step 2: Angular frequency ω = 100π rad/s. Frequency ν = ω/(2π) = (100π)/(2π) = 50 Hz.
- Step 3: Period T = 1/ν = 1/50 = 0.02 s = 20 ms.
- Step 4: At t = 2.5 ms = 0.0025 s, phase = ωt = 100π × 0.0025 = 0.25π = π/4 rad. V = 311 cos(π/4) = 311 × (√2/2) ≈ 219.9 V.
- Step 5: Check: t = 2.5 ms is 1/8 of period (20 ms/8 = 2.5 ms). At T/8, phase = 2π/8 = π/4. Cosine of π/4 is √2/2. Voltage positive and less than amplitude. Consistent.
REASONING: AC voltage is a classic example of non-mechanical oscillation. The angular frequency 100π rad/s corresponds to 50 Hz mains supply in India. The calculation uses the standard relation between ω, ν, and T.
ANSWER: (a) 311 V, (b) 50 Hz, (c) 20 ms, (d) 220 V (approx).

## WORKED_EXAMPLE_3
PROBLEM: A particle moves along the x-axis with displacement x(t) = 0.1 sin(20t) + 0.1 cos(20t) meters. (a) Show that this motion is simple harmonic. (b) Find its amplitude and period. (c) If the mass of the particle is 0.5 kg, find the maximum restoring force acting on it.
STEPS:
- Step 1: Recognize that a linear combination of sin and cos with same ω is SHM. Rewrite as single sinusoid: x(t) = D sin(20t + φ) where D = √(0.1² + 0.1²) = 0.1√2 ≈ 0.1414 m. φ = tan⁻¹(0.1/0.1) = π/4.
- Step 2: Amplitude A = D = 0.1414 m. Angular frequency ω = 20 rad/s. Period T = 2π/ω = 2π/20 = 0.314 s.
- Step 3: For SHM, acceleration a = -ω²x. Maximum acceleration magnitude a_max = ω²A = (20)² × 0.1414 = 400 × 0.1414 = 56.56 m/s².
- Step 4: Maximum restoring force F_max = m × a_max = 0.5 kg × 56.56 m/s² = 28.28 N.
- Step 5: Alternatively, use force law F = -kx with k = mω² = 0.5 × 400 = 200 N/m. F_max = kA = 200 × 0.1414 = 28.28 N. Both methods agree.
- Step 6: Verify units: ω in rad/s, A in m, m in kg → F in N. Physically plausible for a small mass on a stiff spring.
REASONING: The given x(t) is a superposition of two SHMs of same frequency, which results in another SHM of that frequency. The amplitude is found by phasor addition. The restoring force is derived from the SHM force law F = -mω²x, linking back to Newton's second law.
ANSWER: (a) Yes, it is SHM with x(t) = 0.141 sin(20t + π/4) m. (b) Amplitude = 0.141 m, Period = 0.314 s. (c) Maximum restoring force = 28.3 N.

## COMPETENCY_QUESTION_1
QUESTION: A student observes a horizontal spring-mass system on a frictionless table. The mass is pulled 5 cm to the right and released. The student records the position every 0.1 s and plots x vs t. The graph shows a cosine curve starting at +5 cm at t=0. (a) Is this motion periodic? Oscillatory? Justify. (b) If the period is 2 s, write the displacement function x(t). (c) The student claims the velocity is maximum at the extreme positions. Evaluate this claim.
COMPETENCY: Interpreting physical situations using formulas and graphs
STEPS:
- Step 1: The motion repeats (cosine curve) so it is periodic. It moves to and fro about x=0 (equilibrium) so it is oscillatory.
- Step 2: Amplitude A = 0.05 m. Period T = 2 s → ω = 2π/T = π rad/s. At t=0, x=+A, so phase constant φ=0. x(t) = 0.05 cos(πt) m.
- Step 3: Velocity v(t) = dx/dt = -0.05π sin(πt). At extremes (x=±A), sin(πt)=0 → v=0. At mean position (x=0), sin(πt)=±1 → |v| max = 0.05π m/s. The claim is false; velocity is zero at extremes and maximum at mean position.
ANSWER: (a) Yes, periodic and oscillatory. (b) x(t) = 0.05 cos(πt) m. (c) Claim is incorrect; velocity is zero at extremes, maximum at mean position.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In an experiment, a cylindrical block of wood (cross-section A, mass m) floats vertically in a liquid of density ρ. The block is pushed down slightly and released. It oscillates vertically. (a) Explain why the motion is oscillatory (identify equilibrium and restoring force). (b) Derive the expression for the period of oscillation in terms of m, A, ρ, g. (c) If the block is replaced by one of same mass but half the cross-sectional area, how does the period change? Justify.
COMPETENCY: Predicting outcomes from changing variables and applying physical principles to new situations
STEPS:
- Step 1: At equilibrium, weight mg = buoyant force ρgV_submerged. When pushed down by x, extra buoyant force = ρgAx upward. This is a restoring force proportional to displacement (F = -ρgAx). Hence oscillatory.
- Step 2: Equation of motion: m d²x/dt² = -ρgAx → ω² = ρgA/m. Period T = 2π√(m/(ρgA)).
- Step 3: New cross-section A' = A/2. T' = 2π√(m/(ρg(A/2))) = √2 × T. Period increases by factor √2.
- Step 4: Reason: Smaller area means less buoyant force for same displacement, so weaker restoring force, longer period.
ANSWER: (a) Equilibrium at floating position; restoring force = extra buoyancy ∝ displacement. (b) T = 2π√(m/(ρgA)). (c) Period increases by factor √2.
DIFFICULTY: hard