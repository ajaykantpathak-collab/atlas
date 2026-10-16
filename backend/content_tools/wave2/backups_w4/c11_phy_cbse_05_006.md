## ELI5
The spring toy car is pushed by a force that fades as the spring relaxes - variable force, so the work is the area under F(x), the integral. The theorem survives unchanged: that area equals the gain in kinetic energy. Draw the graph, set the limits, integrate, and the final speed falls out of the half-mv-squared formula - the same ledger, now fed by curves instead of constants.

## DEFINITION
The work-energy theorem for a variable force states that the change in kinetic energy of a particle equals the net work done by the resultant variable force acting on it as it moves from an initial position to a final position. Mathematically, \(K_f - K_i = W_{\text{net}} = \int_{x_i}^{x_f} F_{\text{net}}(x) \, dx\), where \(K = \frac{1}{2}mv^2\) is kinetic energy in joules (J), \(F_{\text{net}}(x)\) is the net force as a function of displacement in newtons (N), and the integral represents the area under the force-displacement graph.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
Student can set up the definite integral for work done by a given variable force \(F(x)\), evaluate it correctly with proper limits, equate it to the change in kinetic energy, and solve for unknowns (final speed, displacement, or force constant) while tracking units throughout.

## SCOPE_BOUNDARY
Covers one-dimensional motion under a net force that varies with position \(F(x)\); includes forces like spring force (\(-kx\)), inverse-distance forces (\(k/x\)), and piecewise-defined forces. Does NOT cover variable forces that depend on time or velocity explicitly (those require differential equations), nor does it cover three-dimensional path integrals (line integrals) which are beyond Class 11 scope.

## WALKTHROUGH
Watch a spring-loaded toy car released from a compressed spring on a smooth floor: the spring force decreases linearly as the spring expands, so the force is not constant. To find the car's speed when the spring reaches natural length, you cannot use \(W = Fd\) because \(F\) changes. Instead, you break the motion into tiny displacements \(\Delta x\) where force is nearly constant, sum the work pieces \(\sum F(x)\Delta x\), and take the limit as \(\Delta x \to 0\) to get the integral \(\int F(x)dx\). This integral equals the change in kinetic energy \(\frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2\). Start by drawing the force-displacement graph, identify the function \(F(x)\), set up the integral with correct limits, and equate to \(\Delta K\).

Takeaway: mastery means setting up the integral for a given F(x), evaluating with correct limits, and solving the work-energy equation for speeds or displacements. Exam moves: variable-force numericals and graph-area items. Check yourself: the theorem never asks the force to be constant - only the bookkeeping changes, from rectangle to curve. Students miss it because they freeze the force at its initial value, when the definition integrates the whole story: every sliver of displacement contributes its sliver of work, and the kinetic energy pays the exact total.

## DIAGNOSTIC_QUESTION_1
State the work-energy theorem for a variable force in one dimension, defining all symbols and giving the SI unit of each term.

## DIAGNOSTIC_ANSWER_1
The theorem: \(K_f - K_i = \int_{x_i}^{x_f} F_{\text{net}}(x) \, dx\). \(K_f, K_i\) are final and initial kinetic energies (J), \(F_{\text{net}}(x)\) is net force as a function of position (N), \(x_i, x_f\) are initial and final positions (m), and the integral yields work in joules (J). A wrong answer (e.g., writing \(W = F\Delta x\) or omitting the integral) reveals the student still thinks work is only force times distance and has not internalized the limiting process for variable forces.

## DIAGNOSTIC_QUESTION_2
A block moves along the x-axis under a force \(F(x) = 3x^2\) N from \(x = 1\) m to \(x = 3\) m. Explain why the work done cannot be calculated by multiplying the force at the midpoint by the displacement, and describe the correct geometric interpretation.

## DIAGNOSTIC_ANSWER_2
Force varies with \(x\), so \(F\) is not constant; using a single force value ignores how \(F\) changes across the displacement. The correct interpretation: work done equals the area under the \(F(x)\) vs. \(x\) curve from \(x=1\) to \(x=3\). A student who says "use average force" without justification (e.g., for linear forces only) shows they don't understand that the integral is the exact area, not an approximation, and that the "average force" shortcut only works for linear \(F(x)\).

## DIAGNOSTIC_QUESTION_3
A 2 kg object initially at rest at \(x=0\) is acted upon by a net force \(F(x) = 4x\) N. Calculate its speed at \(x = 2\) m. Show all steps with units.

## DIAGNOSTIC_ANSWER_3
Step 1: \(W = \int_0^2 4x \, dx = 4 \left[ \frac{x^2}{2} \right]_0^2 = 4 \times \frac{4}{2} = 8\) J.  
Step 2: \(\Delta K = \frac{1}{2} m v_f^2 - 0 = \frac{1}{2}(2)v_f^2 = v_f^2\).  
Step 3: \(v_f^2 = 8 \Rightarrow v_f = \sqrt{8} = 2\sqrt{2} \approx 2.83\) m/s.  
Unit check: N·m = J = kg·m²/s², so \(v_f\) in m/s. A wrong answer (e.g., 4 m/s) usually comes from forgetting the 1/2 in kinetic energy or integrating incorrectly (e.g., treating \(4x\) as constant).

## DIAGNOSTIC_QUESTION_4
The force-displacement graph for a particle is a straight line passing through (0, 0) and (4 m, 8 N). The particle's mass is 0.5 kg and its initial speed at \(x=0\) is 2 m/s. Determine its kinetic energy at \(x=4\) m without explicitly integrating, and explain the shortcut used.

## DIAGNOSTIC_ANSWER_4
The graph is a triangle: base = 4 m, height = 8 N. Area = \(\frac{1}{2} \times 4 \times 8 = 16\) J = work done. Initial \(K_i = \frac{1}{2}(0.5)(2)^2 = 1\) J. \(K_f = K_i + W = 1 + 16 = 17\) J. The shortcut: for a linear force \(F(x) = kx\), the area is a triangle, so work = \(\frac{1}{2} F_{\text{max}} \Delta x\). A student who sets up \(\int_0^4 2x \, dx\) and integrates correctly gets the same answer but misses the geometric insight that the integral of a linear function is exactly the triangle area.

## DIAGNOSTIC_QUESTION_5
A student solves a problem where \(F(x) = \frac{k}{x}\) acts from \(x_i = 1\) m to \(x_f = e\) m (e ≈ 2.718). They write \(W = k \ln(e) = k\) J and claim the work done is \(k\) joules. Evaluate whether this is dimensionally consistent if \(k = 5\) N·m. If not, correct the student's expression for \(k\)'s units.

## DIAGNOSTIC_ANSWER_5
\(F = k/x\) so \(k = F \cdot x\) has units N·m = J. The integral \(\int \frac{k}{x} dx = k \ln(x)\) gives \(k \ln(e) = k\). Since \(k\) is in joules, the work is \(k\) joules, which is dimensionally consistent. The student's claim is correct. A wrong evaluation would say "\(\ln(e)\) is dimensionless so work has units of \(k\)" and then question \(k\)'s units; this shows confusion about the units of the argument of \(\ln\) (must be dimensionless, so \(x\) is implicitly divided by 1 m) and the fact that \(k\) itself carries the energy units.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a spring, a dynamics cart, and a motion sensor (or smartphone video analysis) to verify the work-energy theorem for the variable spring force \(F = -kx\). List the measurements needed, the graph to plot, and how you would extract the spring constant \(k\) from the data.

## DIAGNOSTIC_ANSWER_6
Measurements: cart mass \(m\), spring compression \(x_i\) (initial), and cart speed \(v\) at several positions \(x\) as the spring expands. Plot \(v^2\) vs. \(x^2\). From \(\frac{1}{2}mv^2 = \frac{1}{2}k(x_i^2 - x^2)\), we get \(v^2 = \frac{k}{m}(x_i^2 - x^2)\). The slope of \(v^2\) vs. \(x^2\) is \(-k/m\), giving \(k\). A poor answer would only say "measure speed and compression" without specifying the linearization (\(v^2\) vs. \(x^2\)) or how to isolate \(k\), indicating the student cannot translate the theorem into a testable graphical method.

## COMMON_MISCONCEPTION
Students often believe the work-energy theorem for variable forces is a new, separate principle from the constant-force version. They memorize the integral formula \(\int F dx\) but fail to see it as the exact limit of the Riemann sum \(\sum F \Delta x\) they used for constant forces. Consequently, they treat the integral as a "magic formula" and make errors like using the wrong limits (e.g., time limits instead of position limits) or forgetting that the force in the integral must be the net force component along the displacement.

## ON_FAILURE
Have the student physically replicate the Riemann-sum process: draw a large \(F(x)\) vs. \(x\) graph on graph paper for a simple force (e.g., \(F=2x\)), shade rectangular strips of width 0.5 m, compute the sum of areas, then halve the strip width and recompute. Show the sums approach the integral value. Then explicitly write \(\Delta K = \sum F \Delta x \to \int F dx\) to connect the discrete approximation to the continuous theorem. Finally, re-derive the theorem from \(dK/dt = F v\) to reinforce it's the same Newton's second law, just integrated over position instead of time.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_002, c11_phy_cbse_05_004, c11_phy_cbse_05_005
## PREREQUISITE_REASONS
c11_phy_cbse_05_002: Provides the definition and calculation of work done by a variable force using calculus, which is the right-hand side of the theorem.
c11_phy_cbse_05_004: Defines kinetic energy \(K = \frac{1}{2}mv^2\), the left-hand side of the theorem.
c11_phy_cbse_05_005: Derives the work-energy theorem for constant force; this node generalizes that derivation to variable forces using the same Newton's second law logic.

## FORWARD_NODE_IDS
c11_phy_cbse_05_007, c11_phy_cbse_05_008, c11_phy_cbse_05_010, c11_phy_cbse_05_011, c11_phy_cbse_05_003

## FORWARD_REASONS
c11_phy_cbse_05_007: Gravitational potential energy is introduced by applying the work-energy theorem to the constant (but position-dependent) weight force, showing the pattern for conservative forces.
c11_phy_cbse_05_008: Spring potential energy is derived directly by applying this theorem to the variable spring force \(F=-kx\).
c11_phy_cbse_05_010: Conservation of mechanical energy is proved by combining the work-energy theorem with the definition of potential energy for conservative forces.
c11_phy_cbse_05_011: sion P = F·v. It does NOT cover the detailed derivation of work-energy theorem for variable forces (c11_phy_cbse_05_006) or the analysis of collisions (c11_phy_cbse_05_013 onward). It also does not cover electrical power (P = VI) which is i  
c11_phy_cbse_05_003: ings with mass, three-dimensional spring motion, or the work-energy theorem application (covered in c11_phy_cbse_05_006). The node focuses purely on the spring force work calculation, not the potential energy definition (covered in c11_phy_  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_07_001, c10_math_cbse_07_002
## CROSS_SUBJECT_REASONS
c10_math_cbse_07_001: Distance formula and coordinate geometry provide the foundation for setting up position variables \(x_i, x_f\) and displacement along a line.
c10_math_cbse_07_002: Applications of distance formula in word problems build the algebraic manipulation skills needed to solve for unknowns in the work-energy equation.

## CHAIN_DESCRIPTION
c11_phy_cbse_05_002 -> c11_phy_cbse_05_006 -> c11_phy_cbse_05_008

## THIS_FORMULA
\(K_f - K_i = \int_{x_i}^{x_f} F_{\text{net}}(x) \, dx\) where \(K = \frac{1}{2}mv^2\) (J), \(F_{\text{net}}(x)\) in N, \(x\) in m.

## FORMULA_VARIABLES
\(K_f\) = final kinetic energy (J), \(K_i\) = initial kinetic energy (J), \(m\) = mass (kg), \(v\) = speed (m/s), \(F_{\text{net}}(x)\) = net force component along displacement as a function of position (N), \(x_i\) = initial position (m), \(x_f\) = final position (m).

## FORMULA_UNITS
J (joule), N (newton), m (metre), kg (kilogram), m/s (metre per second)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch05_001 | Definite integration as limit of a sum (Riemann sums) is the mathematical tool used to compute work done by a variable force; the physics concept of summing \(F \Delta x\) directly mirrors the mathematical definition of the definite integral.
c11_math_ch05_002 | Fundamental theorem of calculus allows evaluating the work integral \(\int F(x) dx\) by finding an antiderivative, turning the area calculation into algebraic substitution of limits.

## PREREQ_CONCEPT
Work done by a variable force calculated as a definite integral \(\int F(x) dx\) and kinetic energy \(K = \frac{1}{2}mv^2\).

## PREREQ_BEFORE
Student must be able to set up and evaluate a definite integral for a given force function \(F(x)\) and compute kinetic energy from mass and speed.

## PREREQ_STUCK
Review the Riemann sum interpretation of work (c11_phy_cbse_05_002) and the derivation of \(K = \frac{1}{2}mv^2\) (c11_phy_cbse_05_004).

## WORKED_EXAMPLE_1
PROBLEM: A 200 g toy car is launched from a horizontal spring (k = 50 N/m) compressed by 10 cm on a smooth floor. Find the car's speed when the spring reaches its natural length. (Take 1 m = 100 cm)

STEPS:
- Step 1: Identify given: m = 200 g = 0.2 kg, k = 50 N/m, initial compression x_i = 10 cm = 0.1 m, final position x_f = 0 (natural length). Initial speed v_i = 0.
- Step 2: Net force is the spring force F(x) = -kx. Work done by spring from x_i to 0: W = ∫_{0.1}^{0} (-kx) dx = -k [x²/2]_{0.1}^{0} = -50 (0 - 0.01/2) = 50 × 0.005 = 0.25 J. (Positive because force and displacement are in same direction during expansion.)
- Step 3: Apply work-energy theorem: ΔK = W. Final K = ½ m v_f² = 0.25 J.
- Step 4: Solve for v_f: v_f² = (2 × 0.25) / 0.2 = 0.5 / 0.2 = 2.5 m²/s². v_f = √2.5 ≈ 1.58 m/s.
- Step 5: Check units: N/m × m² = N·m = J; J / kg = m²/s²; sqrt gives m/s. Speed is reasonable for a toy car.

REASONING: The spring force is variable (linear in x), so we must integrate. The work done by the spring equals the kinetic energy gained because the floor is smooth (no friction). The integral limits go from the initial compression to the equilibrium position; the negative sign in Hooke's law and the reversed limits combine to give positive work.

ANSWER: 1.58 m/s

## WORKED_EXAMPLE_2
PROBLEM: A 5 kg block slides on a rough horizontal surface with coefficient of kinetic friction μ_k = 0.2. It encounters a variable force F(x) = 10x N (in the direction of motion) from x = 0 to x = 2 m. If its initial speed at x=0 is 3 m/s, find its speed at x=2 m. (g = 10 m/s²)

STEPS:
- Step 1: Given: m = 5 kg, μ_k = 0.2, F_applied(x) = 10x N, x_i = 0, x_f = 2 m, v_i = 3 m/s. Friction force f = μ_k m g = 0.2 × 5 × 10 = 10 N (opposite to motion).
- Step 2: Net force F_net(x) = F_applied(x) - f = 10x - 10 N. Work done by net force: W_net = ∫_0^2 (10x - 10) dx = [5x² - 10x]_0^2 = (5×4 - 20) - 0 = 0 J.
- Step 3: Work-energy theorem: K_f - K_i = W_net = 0. So K_f = K_i.
- Step 4: K_i = ½ × 5 × 3² = 22.5 J. Thus K_f = 22.5 J = ½ × 5 × v_f².
- Step 5: v_f² = (2 × 22.5)/5 = 9 → v_f = 3 m/s. The block's speed is unchanged because the positive work done by the applied force exactly cancels the negative work done by friction over this interval.

REASONING: The net force is the sum of the variable applied force and the constant friction force. Integrating the net force gives the net work. The result W_net = 0 means the kinetic energy doesn't change, so the final speed equals the initial speed. This illustrates that even with a variable force, the theorem only cares about the net work.

ANSWER: 3 m/s

## WORKED_EXAMPLE_3
PROBLEM: A particle of mass 2 kg moves along the x-axis under a force F(x) = 6/x² N (directed towards positive x) from x = 1 m to x = 3 m. Its speed at x = 1 m is 4 m/s. Find its speed at x = 3 m.

STEPS:
- Step 1: Identify: m = 2 kg, F(x) = 6/x² N, x_i = 1 m, x_f = 3 m, v_i = 4 m/s. Force is variable (inverse square).
- Step 2: Work done by the force: W = ∫_1^3 (6/x²) dx = 6 ∫_1^3 x^{-2} dx = 6 [ -1/x ]_1^3 = 6 ( -1/3 + 1 ) = 6 × (2/3) = 4 J.
- Step 3: Initial kinetic energy: K_i = ½ × 2 × 4² = 16 J.
- Step 4: Apply theorem: K_f = K_i + W = 16 + 4 = 20 J.
- Step 5: K_f = ½ m v_f² → 20 = ½ × 2 × v_f² → v_f² = 20 → v_f = √20 = 2√5 ≈ 4.47 m/s.
- Step 6: Verify: Force is positive, so work is positive, kinetic energy increases, speed increases from 4 to 4.47 m/s. Units: N·m = J, consistent.

REASONING: The inverse-square force is integrated using the power rule. The work done is positive because the force is in the direction of displacement. The theorem directly gives the final kinetic energy, from which speed is found. This example combines a non-linear variable force with the standard kinetic energy formula.

ANSWER: 4.47 m/s (or 2√5 m/s)

## COMPETENCY_QUESTION_1
QUESTION: A 1 kg block is attached to a spring (k = 100 N/m) fixed at one end. The block is pulled to stretch the spring by 5 cm and released from rest on a frictionless surface. At the instant the spring passes through its natural length, the block detaches from the spring and continues onto a rough horizontal patch with μ_k = 0.1. How far does the block travel on the rough patch before stopping? (g = 10 m/s²)

COMPETENCY: Applying the work-energy theorem in segments with different forces (variable spring force then constant friction) and connecting energy across the transition point.

STEPS:
- Step 1: On the smooth part, only the spring force does work. Initial spring potential energy = ½ k x² = ½ × 100 × (0.05)² = 0.125 J. This converts entirely to kinetic energy at natural length (x=0): K = 0.125 J.
- Step 2: On the rough patch, friction is the only horizontal force. Work done by friction = -f d = -μ_k m g d = -0.1 × 1 × 10 × d = -d J.
- Step 3: Apply work-energy theorem on the rough patch: ΔK = W_friction. Final K = 0 (stops), so 0 - 0.125 = -d → d = 0.125 m.
- Step 4: The block travels 12.5 cm on the rough patch before stopping.

ANSWER: 0.125 m (or 12.5 cm)

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A particle of mass m moves along the x-axis under a net force F(x) = A x + B/x, where A and B are positive constants. The particle starts from rest at x = x₀. Derive an expression for its speed v as a function of position x (x > 0). Discuss the condition on A and B for the speed to be real for all x > x₀.

COMPETENCY: Deriving a general velocity-position relation from the work-energy theorem for a composite variable force and analyzing the physical constraints on the constants.

STEPS:
- Step 1: Work done from x₀ to x: W = ∫_{x₀}^x (A x' + B/x') dx' = A (x² - x₀²)/2 + B ln(x/x₀).
- Step 2: Work-energy theorem: ½ m v² - 0 = W (since starts from rest).
- Step 3: v(x) = √[ (2/m) { A(x² - x₀²)/2 + B ln(x/x₀) } ] = √[ (A/m)(x² - x₀²) + (2B/m) ln(x/x₀) ].
- Step 4: For v to be real for all x > x₀, the expression under the square root must be ≥ 0. At x = x₀ it is 0. For x > x₀, (x² - x₀²) > 0 and ln(x/x₀) > 0. Since A, B > 0, both terms are positive, so the expression is always positive. The condition is simply A > 0 and B > 0 (given). If B were negative, there could be a region where the log term dominates and makes the expression negative.

ANSWER: v(x) = √[ (A/m)(x² - x₀²) + (2B/m) ln(x/x₀) ]; condition: A > 0 and B > 0 ensures real speed for all x > x₀.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The work-energy theorem for a variable force states that the change in kinetic energy of a particle equals the net work done by the ______ variable force acting on it as it moves from an initial position to a final position.

## DIAGNOSTIC_ANSWER_7
resultant

**A wrong answer ("constant" or "applied") reveals the student has swapped the definition's adjective - the work is done by the resultant variable force.** Resultant is the definition's own adjective, and the adjective is what the blank grades. Recall the net-work language before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Watch a spring-loaded toy car released from a ______ spring on a smooth floor: the spring force decreases linearly as the spring expands, so the force is not constant.

## DIAGNOSTIC_ANSWER_8
compressed

**A wrong answer ("stretched" or "loose") reveals the student has swapped the walkthrough's participle - the toy car is released from a compressed spring.** Compressed is the walkthrough's own participle, and the participle is what the blank grades. Recall the linearly-fading force before filling, and fill the word exactly as written.
