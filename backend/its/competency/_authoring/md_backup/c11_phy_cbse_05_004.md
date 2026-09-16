## DEFINITION
Kinetic energy is the energy possessed by a body due to its motion, defined as the work needed to accelerate a body of mass \( m \) from rest to velocity \( \vec{v} \). For a particle of mass \( m \) moving with speed \( v \), its kinetic energy \( K \) is given by \( K = \frac{1}{2} m v^2 \). It is a scalar quantity, always non-negative, with SI unit joule (J) and dimensions \([ML^2T^{-2}]\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can calculate kinetic energy from given mass and speed, correctly handle unit conversions (e.g., km/h to m/s), and explain why kinetic energy is a scalar while momentum is a vector. They can also relate kinetic energy to the work-energy theorem: the net work done on an object equals its change in kinetic energy.

## SCOPE_BOUNDARY
This node covers the classical definition and formula of kinetic energy for a point mass or rigid body in translational motion, its scalar nature, SI units, and its connection to the work-energy theorem. It does NOT cover rotational kinetic energy (Chapter 7), relativistic kinetic energy, or systems with variable mass.

## WALKTHROUGH
Observe a cricket ball and a tennis ball thrown at the same speed — the cricket ball hurts more because it has more mass. Now imagine the same cricket ball thrown at different speeds — the faster one does more damage. This shows kinetic energy depends on both mass and speed. In Class 9 you learned \( v^2 - u^2 = 2as \) and multiplied by \( m/2 \) to get \( \frac{1}{2}mv^2 - \frac{1}{2}mu^2 = mas = Fs = W \). The quantity \( \frac{1}{2}mv^2 \) is kinetic energy, and the change in it equals the net work done. Start by measuring mass (kg) and speed (m/s), then apply \( K = \frac{1}{2}mv^2 \).

## DIAGNOSTIC_QUESTION_1
Write the SI unit of kinetic energy and state whether it is a scalar or vector quantity.

## DIAGNOSTIC_ANSWER_1
The SI unit of kinetic energy is joule (J). It is a scalar quantity. A wrong answer (e.g., "newton" or "vector") reveals confusion between force/energy or between kinetic energy and momentum (which is a vector). Students often mistakenly think kinetic energy has direction because velocity has direction, forgetting the \( v^2 = \vec{v} \cdot \vec{v} \) dot product makes it scalar.

## DIAGNOSTIC_QUESTION_2
A truck of mass 2000 kg and a bicycle of mass 20 kg are both moving at 10 m/s. Which has more kinetic energy? Explain why the factor \( \frac{1}{2} \) appears in the formula \( K = \frac{1}{2}mv^2 \) but not in momentum \( p = mv \).

## DIAGNOSTIC_ANSWER_2
The truck has more kinetic energy (100,000 J vs 1,000 J) because kinetic energy is proportional to mass. The \( \frac{1}{2} \) arises from integrating \( F = ma \) over displacement: \( W = \int F\,dx = \int m \frac{dv}{dt} dx = \int m v\,dv = \frac{1}{2}mv^2 \). Momentum comes from integrating force over time: \( \int F\,dt = \int m \frac{dv}{dt} dt = mv \). A wrong answer (e.g., "they are equal" or "the \( \frac{1}{2} \) is arbitrary") shows lack of understanding of the work-energy derivation versus impulse-momentum derivation.

## DIAGNOSTIC_QUESTION_3
A 1500 kg car accelerates from 36 km/h to 72 km/h. Calculate the change in its kinetic energy. (Use 1 km/h = 5/18 m/s)

## DIAGNOSTIC_ANSWER_3
Step 1: Convert speeds: \( u = 36 \times \frac{5}{18} = 10 \) m/s, \( v = 72 \times \frac{5}{18} = 20 \) m/s.
Step 2: \( \Delta K = \frac{1}{2}m(v^2 - u^2) = \frac{1}{2} \times 1500 \times (20^2 - 10^2) = 750 \times (400 - 100) = 750 \times 300 = 225,000 \) J.
Step 3: Unit check: kg × (m/s)² = kg·m²/s² = J. Correct.
Answer: 225 kJ. A wrong answer often comes from forgetting to convert km/h to m/s (giving 225,000 × (18/5)² ≈ 2.9 MJ) or using \( \Delta K = \frac{1}{2}m(v-u)^2 \) (incorrectly squaring the difference).

## DIAGNOSTIC_QUESTION_4
Two identical balls are thrown with the same speed, one vertically upward and one at 30° to the horizontal. Compare their kinetic energies at the instant of release and at the highest point of their trajectories. Ignore air resistance.

## DIAGNOSTIC_ANSWER_4
At release: both have same speed → same kinetic energy (scalar, independent of direction). At highest point: the vertical ball has zero speed → \( K = 0 \). The angled ball has horizontal speed \( v \cos 30° \) → \( K = \frac{1}{2}m(v \cos 30°)^2 = \frac{3}{4} \times \frac{1}{2}mv^2 \). A wrong answer (e.g., "same at highest point" or "vertical ball has more at release") reveals the misconception that kinetic energy depends on direction of velocity or that potential energy conversion is identical for both.

## DIAGNOSTIC_QUESTION_5
A student claims: "If the momentum of a body is doubled, its kinetic energy also doubles." Evaluate this statement and give the correct relationship.

## DIAGNOSTIC_ANSWER_5
The statement is false. \( p = mv \), \( K = \frac{1}{2}mv^2 = \frac{p^2}{2m} \). If momentum doubles (\( p' = 2p \)), kinetic energy becomes \( K' = \frac{(2p)^2}{2m} = 4 \frac{p^2}{2m} = 4K \). Kinetic energy quadruples, not doubles. A wrong evaluation (e.g., "true" or "kinetic energy halves") shows confusion between linear and quadratic dependence, and inability to combine \( p \) and \( K \) formulas algebraically.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a school laboratory setup (trolley, light gate, masses, runway) to verify that kinetic energy is proportional to the square of velocity. Outline the procedure, measurements, and how you would analyze the data.

## DIAGNOSTIC_ANSWER_6
Procedure: Place trolley on friction-compensated runway. Attach a card of known length. Use a light gate to measure time \( t \) for card to pass → velocity \( v = \text{length}/t \). Vary starting height to change \( v \). Measure \( v \) and compute \( K = \frac{1}{2}mv^2 \). Plot \( K \) vs \( v \) (curved) and \( K \) vs \( v^2 \) (straight line through origin). Slope = \( \frac{1}{2}m \). A poor answer (e.g., "measure speed and energy directly" or no graph analysis) reveals lack of experimental design skills and misunderstanding of how to test a quadratic relationship.

## COMMON_MISCONCEPTION
Students often treat kinetic energy as a vector because it depends on velocity, which is a vector. They write \( K = \frac{1}{2}m\vec{v}^2 \) and think direction matters, or they add kinetic energies vectorially in collision problems. Another error: using \( \Delta K = \frac{1}{2}m(\Delta v)^2 \) instead of \( \Delta K = \frac{1}{2}m(v_f^2 - v_i^2) \). For example, a body slowing from 10 m/s to 5 m/s: they compute \( \frac{1}{2}m(5)^2 \) instead of \( \frac{1}{2}m(5^2 - 10^2) \), getting positive change instead of negative.

## ON_FAILURE
1. Revisit the scalar product: show \( \vec{v} \cdot \vec{v} = v^2 \) has no direction. 
2. Use the work-energy theorem derivation: \( W = \int \vec{F} \cdot d\vec{s} = \int m \frac{d\vec{v}}{dt} \cdot \vec{v}\,dt = \int m \vec{v} \cdot d\vec{v} = \frac{1}{2}m v^2 \). Emphasize the dot product at each step. 
3. Practice numerical problems where velocity changes direction (e.g., rebound) and require \( \Delta K = K_f - K_i \) with speeds, not velocity vectors. 
4. Contrast with momentum: \( \Delta \vec{p} = m(\vec{v}_f - \vec{v}_i) \) is vector; \( \Delta K = \frac{1}{2}m(v_f^2 - v_i^2) \) is scalar.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_001, c9_physics_ch4_1, c9_physics_ch4_5, c9_math_ch4_1
## PREREQUISITE_REASONS
c11_phy_cbse_05_001: Work definition (W = F·s) is the foundation for deriving kinetic energy via work-energy theorem.
c9_physics_ch4_1: Class 9 work definition and formula (W = Fs) provides the basic concept of work as force × displacement.
c9_physics_ch4_5: Class 9 kinetic energy formula and derivation (using v²-u²=2as) is the direct prior exposure to this topic.
c9_math_ch4_1: Algebraic identities (a+b)², (a-b)² are needed for expanding squares in kinetic energy calculations and derivations.

## FORWARD_NODE_IDS
c11_phy_cbse_05_005, c11_phy_cbse_05_006, c11_phy_cbse_05_007, c11_phy_cbse_05_008, c11_phy_cbse_05_011, c11_phy_cbse_05_012, c12_phy_cbse_06_004, c12_phy_cbse_07_008, c12_phy_cbse_11_002, c12_phy_cbse_11_004, c12_phy_cbse_13_003

## FORWARD_REASONS
c11_phy_cbse_05_005: Work-energy theorem derivation uses kinetic energy definition as the central quantity (Kf - Ki = W).
c11_phy_cbse_05_006: Work-energy theorem for variable force extends the same kinetic energy concept to integral form.
c11_phy_cbse_05_007: Gravitational potential energy converts to/from kinetic energy; total mechanical energy conservation requires K.
c11_phy_cbse_05_008: Spring potential energy interchanges with kinetic energy in oscillations; again K is essential.
c11_phy_cbse_05_011: Kinetic energy concept — power relates to rate of change of kinetic energy.  
c11_phy_cbse_05_012: Kinetic energy definition needed for work-energy theorem connection (P = dK/dt).  
c12_phy_cbse_06_004: Kinetic energy ½mv² analogy helps understand magnetic energy ½LI² and the inertia concept.  
c12_phy_cbse_07_008: Kinetic energy ($\frac{1}{2}mv^2$) is the mechanical analog of inductor energy ($\frac{1}{2}Li^2$).  
c12_phy_cbse_11_002: Kinetic energy definition and formula — prerequisite for interpreting \(K_{\text{max}}\) physically.  
c12_phy_cbse_11_004: Kinetic energy formula \( K = p^2/2m \) needed to connect accelerating voltage to momentum.  
c12_phy_cbse_13_003: Kinetic energy concept (\(K = \frac{1}{2}mv^2\)) provides the energy foundation; here rest energy \(E_0 = mc^2\) is the zero-velocity limit.  

## CROSS_SUBJECT_PREREQS
c9_math_ch4_1, c9_math_ch2_1
## CROSS_SUBJECT_REASONS
c9_math_ch4_1: Algebraic identities (a² - b² = (a-b)(a+b)) are used in deriving kinetic energy change and in solving problems involving differences of squares of velocities.
c9_math_ch2_1: Linear polynomials and equations model the relationship between work and kinetic energy change (W = ΔK = ½mv² - ½mu²), which is a quadratic in v but linear in v².

## CHAIN_DESCRIPTION
c9_physics_ch4_5 -> c11_phy_cbse_05_004 -> c11_phy_cbse_05_005

## THIS_FORMULA
K = ½ m v² (Joule, J) where m in kg, v in m/s

## FORMULA_VARIABLES
K = kinetic energy (J), m = mass (kg), v = speed (m/s)

## FORMULA_UNITS
J, kg, m/s

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch4_1 | Algebraic identities (a² - b²) used in kinetic energy difference calculations and in deriving work-energy theorem from kinematic equations.
c9_math_ch2_1 | Linear equations in v² allow treating kinetic energy as a linear function of v², useful for graphical analysis (K vs v² is straight line).

## PREREQ_CONCEPT
Work done by a constant force (W = F·s cosθ) and the kinematic relation v² - u² = 2as.

## PREREQ_BEFORE
Student must be able to compute work done by a force, convert between km/h and m/s, and manipulate algebraic expressions involving squares.

## PREREQ_STUCK
If stuck, review c11_phy_cbse_05_001 (Work Done by a Force) and Class 9 kinematic equations (v² - u² = 2as) and algebraic identities (a² - b²).

## WORKED_EXAMPLE_1
PROBLEM: A 50 g bullet is fired from a rifle with a muzzle velocity of 800 m/s. Calculate its kinetic energy in joules and in kilojoules. If the bullet penetrates a wooden block and emerges with half its initial speed, what is the work done by the resistive force of the wood?
STEPS:
- Step 1: Identify given: m = 50 g = 0.050 kg, v_i = 800 m/s, v_f = 400 m/s. Find K_i, K_f, and W_resistive.
- Step 2: Use K = ½ m v². Check units: kg × (m/s)² = kg·m²/s² = J.
- Step 3: K_i = ½ × 0.050 × (800)² = 0.025 × 640,000 = 16,000 J = 16.0 kJ.
- Step 4: K_f = ½ × 0.050 × (400)² = 0.025 × 160,000 = 4,000 J = 4.0 kJ.
- Step 5: Work-energy theorem: W_net = ΔK = K_f - K_i = 4,000 - 16,000 = -12,000 J = -12 kJ. The resistive force does negative work of magnitude 12 kJ.
REASONING: The work done by the resistive force equals the change in kinetic energy (work-energy theorem). The negative sign indicates energy is removed from the bullet. Unit conversion from g to kg is critical.
ANSWER: Initial K = 16.0 kJ, Final K = 4.0 kJ, Work done by wood = -12.0 kJ.

## WORKED_EXAMPLE_2
PROBLEM: A 1200 kg car is moving at 54 km/h. The driver applies brakes and the car stops in 20 m. Assuming constant braking force, find the magnitude of the braking force. (Use g = 10 m/s² if needed)
STEPS:
- Step 1: Convert speed: u = 54 × (5/18) = 15 m/s, v = 0. Mass m = 1200 kg. Displacement s = 20 m.
- Step 2: Change in kinetic energy: ΔK = 0 - ½ × 1200 × (15)² = -600 × 225 = -135,000 J.
- Step 3: Work done by braking force F (opposite to displacement): W = -F × s (since force opposes motion, θ = 180°, cosθ = -1).
- Step 4: Work-energy theorem: W = ΔK → -F × 20 = -135,000 → F = 135,000 / 20 = 6,750 N.
- Step 5: Check: F = 6750 N ≈ 688 kgf, reasonable for a car braking force. Units: J/m = N. Correct.
REASONING: The work-energy theorem directly relates the net work (done by braking force) to the kinetic energy change. No need to find acceleration or time. The negative signs cancel because both work and ΔK are negative.
ANSWER: Braking force = 6,750 N.

## WORKED_EXAMPLE_3
PROBLEM: A 2 kg block slides down a smooth inclined plane of length 5 m and height 3 m. At the bottom, it moves on a rough horizontal surface with coefficient of kinetic friction μ_k = 0.2. How far does it travel on the horizontal surface before stopping? (g = 10 m/s²)
STEPS:
- Step 1: On incline: only gravity does work. Normal force does no work. Loss in potential energy = gain in kinetic energy. ΔU = mgh = 2 × 10 × 3 = 60 J. So K_bottom = 60 J.
- Step 2: On horizontal rough surface: friction does negative work. Friction force f = μ_k mg = 0.2 × 2 × 10 = 4 N.
- Step 3: Work done by friction over distance d: W_fric = -f d = -4d.
- Step 4: Work-energy theorem on horizontal part: W_fric = ΔK = 0 - K_bottom = -60 J.
- Step 5: -4d = -60 → d = 15 m.
- Step 6: Verify: Initial potential energy 60 J fully dissipated by friction over 15 m (4 N × 15 m = 60 J). Consistent.
REASONING: This combines gravitational potential energy (next node) with kinetic energy and work-energy theorem. The smooth incline conserves mechanical energy; the rough horizontal dissipates kinetic energy via friction. The problem tests understanding that kinetic energy at the bottom equals mgh, and that work done by friction = force × distance (with negative sign).
ANSWER: The block travels 15 m on the horizontal surface before stopping.

## COMPETENCY_QUESTION_1
QUESTION: A particle of mass m moves along the x-axis under a force F(x) = kx, where k is a positive constant. At x = 0, its speed is v₀. Find its kinetic energy as a function of x. Is the force conservative? Justify.
COMPETENCY: Interpreting physical situations using formulas and identifying conservative forces from work-energy considerations.
STEPS:
- Step 1: Recognize that force is variable (depends on x). Work-energy theorem in integral form: W = ∫ F dx = ΔK.
- Step 2: Compute work done from 0 to x: W = ∫₀ˣ kx' dx' = ½ k x².
- Step 3: ΔK = K(x) - K(0) = ½ k x². K(0) = ½ m v₀².
- Step 4: K(x) = ½ m v₀² + ½ k x².
- Step 5: To check if conservative: work done over a closed loop (0 → x → 0) is W = ∫₀ˣ kx dx + ∫ₓ⁰ kx dx = ½ kx² - ½ kx² = 0. Also, force can be derived from potential V(x) = -½ k x² (since F = -dV/dx = kx). So yes, conservative.
ANSWER: K(x) = ½ m v₀² + ½ k x². The force is conservative because work done over a closed path is zero and it can be expressed as negative gradient of a potential energy function V(x) = -½ k x².
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two bodies of masses m₁ and m₂ (m₁ > m₂) have equal kinetic energies. They are brought to rest by applying the same constant retarding force F. Compare the distances they travel before stopping and the times taken to stop. Explain the physical reason for any difference.
COMPETENCY: Predicting outcomes from changing variables and applying work-energy theorem with kinematics.
STEPS:
- Step 1: Equal kinetic energy: K₁ = K₂ = K. Work done by retarding force: W = -F s = ΔK = -K → s = K/F. Since K and F are same for both, stopping distance s is the same.
- Step 2: Time to stop: Use impulse-momentum: F t = Δp = p_initial (since final p = 0). So t = p/F. But p = √(2mK). Since m₁ > m₂, p₁ > p₂ → t₁ > t₂. The heavier body takes longer to stop.
- Step 3: Physical reason: Same kinetic energy means same work needed to stop (same distance for same force). But heavier body has larger momentum (p = √(2mK)), so it requires more impulse (F t) to bring momentum to zero, hence more time.
ANSWER: Stopping distances are equal. The heavier body (m₁) takes longer to stop. Reason: Work-energy theorem fixes distance via energy; impulse-momentum theorem fixes time via momentum, which depends on mass.
DIFFICULTY: hard