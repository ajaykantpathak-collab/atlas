## ELI5
The market spring balance sags 5 cm under a 1 kg bag of tomatoes - that sag is a battery too. Elastic potential energy is U = ½kx², stored by deforming a spring from equilibrium, the price of fighting its restoring pull F = -kx. Configuration, not height, is the vault here; release the bag and the spring spends every joule launching it back.

## DEFINITION
The elastic potential energy of a spring is the energy stored in a spring due to its deformation (extension or compression) from its equilibrium position, given by the formula $U = \frac{1}{2}kx^2$ where $k$ is the spring constant (SI unit: N/m) and $x$ is the displacement from equilibrium (SI unit: m). It is a scalar quantity measured in joules (J) and represents the work done by an external agent against the conservative spring force $F_s = -kx$ to stretch or compress the spring, assuming the spring obeys Hooke's law and is massless.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) calculate the elastic potential energy stored in a spring given $k$ and $x$, including unit conversions; (2) apply conservation of mechanical energy to spring-block systems to find maximum compression/extension or speed at equilibrium; (3) determine work done by spring force over arbitrary displacements using $W_s = -\frac{1}{2}k(x_f^2 - x_i^2)$; (4) solve problems involving springs with friction by correctly applying the work-energy theorem instead of energy conservation.

## SCOPE_BOUNDARY
This node covers: Hooke's law ($F_s = -kx$), derivation of spring potential energy $U = \frac{1}{2}kx^2$, work done by spring force, energy conservation in ideal spring-block systems (horizontal and vertical), and spring problems with friction using work-energy theorem. It does NOT cover: springs with mass (effective mass correction), non-linear springs (non-Hookean behavior), coupled oscillators, or damped/forced oscillations (these are in Class 11 Oscillations chapter).

## WALKTHROUGH
Observe a common spring balance used in Indian vegetable markets — when you hang a 1 kg tomato bag, the spring stretches by about 5 cm. This visible stretch stores energy that would launch the tomatoes upward if released suddenly. Begin by measuring the spring constant $k$ using Hooke's law: hang known masses, measure extension $x$, plot $F$ vs $x$, the slope gives $k$. Connect this to the previous node on gravitational potential energy — just as $mgh$ stores energy by height, $\frac{1}{2}kx^2$ stores energy by configuration. The key formula emerges from integrating the variable spring force: $W = \int F\,dx = \int -kx\,dx = -\frac{1}{2}kx^2$, so the stored potential energy is the negative of this work.

Takeaway: mastery means computing U from k and x, recovering k from a force-extension graph, and wiring spring energy into conservation problems. Exam moves: find-the-stored-energy questions and maximum-compression items. Check yourself: the energy scales with the square - double the stretch, quadruple the store, the spring's own square law. Students miss it because they half-remember mgh, when the definition's formula is configuration-based: the spring keeps no record of height, only of shape, and every joule of shape is spendable the instant equilibrium calls.

## DIAGNOSTIC_QUESTION_1
State the formula for elastic potential energy of a spring and write the SI units of each variable. What is the physical significance of the spring constant $k$?

## DIAGNOSTIC_ANSWER_1
The elastic potential energy is $U = \frac{1}{2}kx^2$ where $k$ is the spring constant in N/m (newton per metre) and $x$ is displacement from equilibrium in m (metre); $U$ is in J (joule). The spring constant $k$ measures the stiffness of the spring — a larger $k$ means a stiffer spring requiring more force per unit extension. A wrong answer (e.g., writing $U = kx$ or giving $k$ in N) reveals confusion between force and energy, or misunderstanding that $k$ is a property of the spring, not the deformation.

## DIAGNOSTIC_QUESTION_2
A spring of force constant $k = 200\ \text{N/m}$ is compressed by 10 cm. A student calculates the stored energy as $U = kx = 200 \times 0.1 = 20\ \text{J}$. Identify the error and explain why the factor of $\frac{1}{2}$ appears in the correct formula.

## DIAGNOSTIC_ANSWER_2
The student used $U = kx$ (force formula) instead of $U = \frac{1}{2}kx^2$ (energy formula). The correct energy is $\frac{1}{2} \times 200 \times (0.1)^2 = 1\ \text{J}$. The factor $\frac{1}{2}$ arises because the spring force varies linearly from $0$ to $kx$ — the average force over the displacement is $\frac{1}{2}kx$, so work done (energy stored) = average force $\times$ displacement = $\frac{1}{2}kx \times x = \frac{1}{2}kx^2$. A wrong answer reveals the student treats the variable spring force as constant, confusing Hooke's law force $F = kx$ with the energy integral.

## DIAGNOSTIC_QUESTION_3
A block of mass $2\ \text{kg}$ moving at $4\ \text{m/s}$ on a smooth horizontal surface collides with a spring of constant $k = 500\ \text{N/m}$ fixed to a wall. Calculate the maximum compression of the spring. Use $g = 10\ \text{m/s}^2$ if needed.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify given: $m = 2\ \text{kg}$, $v = 4\ \text{m/s}$, $k = 500\ \text{N/m}$, smooth surface $\Rightarrow$ no friction.  
**Step 2:** At maximum compression, kinetic energy is fully converted to spring potential energy: $\frac{1}{2}mv^2 = \frac{1}{2}kx_{\text{max}}^2$.  
**Step 3:** Cancel $\frac{1}{2}$: $mv^2 = kx_{\text{max}}^2 \Rightarrow x_{\text{max}} = v\sqrt{\frac{m}{k}}$.  
**Step 4:** Substitute: $x_{\text{max}} = 4 \times \sqrt{\frac{2}{500}} = 4 \times \sqrt{0.004} = 4 \times 0.0632 = 0.253\ \text{m} = 25.3\ \text{cm}$.  
**Step 5:** Verify units: $\sqrt{\text{kg}/(\text{N/m})} = \sqrt{\text{kg}/(\text{kg}\cdot\text{m/s}^2 \cdot \text{m}^{-1})} = \sqrt{\text{s}^2} = \text{s}$, multiplied by m/s gives m — correct.  
A wrong answer (e.g., $x = mv/k = 0.016\ \text{m}$) reveals using force balance $kx = mv$ instead of energy conservation, confusing static equilibrium with dynamic collision.

## DIAGNOSTIC_QUESTION_4
A vertical spring of constant $k = 100\ \text{N/m}$ hangs from a ceiling. A $0.5\ \text{kg}$ mass is attached gently and lowered to equilibrium. Then the mass is pulled down an additional $5\ \text{cm}$ and released. Compare the total mechanical energy of the system at the release point and at the equilibrium position. Explain any difference in gravitational potential energy.

## DIAGNOSTIC_ANSWER_4
At release point (displacement $x = x_0 + 0.05\ \text{m}$ where $x_0 = mg/k = 0.05\ \text{m}$ is equilibrium stretch), total energy $E = \frac{1}{2}k(x_0 + 0.05)^2 - mg(x_0 + 0.05)$ (taking equilibrium as zero for gravitational PE). At equilibrium position, $E = \frac{1}{2}kx_0^2 - mgx_0 + \frac{1}{2}mv_{\text{max}}^2$. By conservation, these are equal. The gravitational PE decreases by $mg(0.05)$ while spring PE increases by $\frac{1}{2}k[(x_0+0.05)^2 - x_0^2] = \frac{1}{2}k(2x_0\cdot0.05 + 0.05^2) = mg(0.05) + \frac{1}{2}k(0.05)^2$. The extra $\frac{1}{2}k(0.05)^2$ becomes kinetic energy at equilibrium. A wrong answer (claiming total energy differs) reveals not recognizing that gravity is conservative and the system's total mechanical energy (spring + gravitational + kinetic) is conserved when only conservative forces act.

## DIAGNOSTIC_QUESTION_5
A student solves Example 5.9 (car-spring with friction) and writes: "Work done by friction = $-\mu mg x_{\text{max}}$, so $\frac{1}{2}mv^2 = \frac{1}{2}kx_{\text{max}}^2 - \mu mg x_{\text{max}}$." They then solve the quadratic and get two positive roots. They pick the larger root as "maximum compression." Evaluate this reasoning.

## DIAGNOSTIC_ANSWER_5
The reasoning is **incorrect** in picking the larger root. The quadratic $\frac{1}{2}kx^2 - \mu mg x - \frac{1}{2}mv^2 = 0$ has two roots: one positive (physical compression) and one negative (unphysical extension). The larger positive root would correspond to a hypothetical second compression after the spring expands and the block returns — but friction dissipates energy continuously, so the block stops at the first compression. The correct root is the **smaller positive root** (or the only positive root if the other is negative). Picking the larger root reveals misunderstanding that the work-energy theorem gives the net work up to the **first** stopping point, not subsequent oscillations. The equation models energy balance at the instant the block first comes to rest.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a spring, a set of known masses, a metre scale, and a stopwatch to verify that the elastic potential energy stored in a spring is $\frac{1}{2}kx^2$. Describe the procedure, measurements, and how you would analyse the data.

## DIAGNOSTIC_ANSWER_6
**Procedure:** (1) Hang spring vertically, measure natural length $L_0$. (2) Add mass $m$, measure extension $x = L - L_0$. Repeat for 5-6 masses to get $k = mg/x$ (slope of $F$ vs $x$ graph). (3) For a fixed mass $m$, pull down additional distance $A$ and release. Measure maximum height $h$ above equilibrium reached by the mass using a scale behind the spring. (4) By energy conservation: initial spring PE (at $x = x_0 + A$) + gravitational PE = final gravitational PE at max height. $\frac{1}{2}k(x_0+A)^2 - mg(x_0+A) = mgh$ (taking equilibrium as zero). Since $kx_0 = mg$, this simplifies to $\frac{1}{2}kA^2 = mgh$. (5) Plot $h$ vs $A^2$; slope should be $\frac{k}{2mg}$. A linear graph through origin verifies $U \propto x^2$. A poor answer (e.g., just measuring static extensions) reveals confusion between verifying Hooke's law ($F \propto x$) and verifying the energy formula ($U \propto x^2$).

## COMMON_MISCONCEPTION
Students often believe that the potential energy of a vertical spring-mass system is simply $\frac{1}{2}kx^2$ where $x$ is measured from the **unstretched** length of the spring. They forget to include gravitational potential energy, or they incorrectly set the zero of spring potential energy at the equilibrium position without adjusting the gravitational potential energy reference. For example, in a vertical spring problem, a student writes total energy as $\frac{1}{2}kx^2 + \frac{1}{2}mv^2$ (using $x$ from unstretched length) and omits $mgx$ term, leading to incorrect energy conservation equations. This error stems from treating the spring in isolation rather than as part of a spring-Earth system, and from not recognizing that the equilibrium position shifts due to gravity ($x_0 = mg/k$), making the effective potential $\frac{1}{2}k(x-x_0)^2 + \text{constant}$.

## ON_FAILURE
**Step 1:** Re-derive the total potential energy for a vertical spring from scratch. Take the unstretched spring position as $y=0$ (upward positive). Spring force $F_s = -ky$, gravitational force $F_g = -mg$. Total force $F = -ky - mg = -k(y + mg/k)$. Let $y' = y + mg/k$ be displacement from equilibrium. Then $F = -ky'$.  
**Step 2:** Integrate to get potential energy: $U = -\int F\,dy' = \frac{1}{2}ky'^2 + C$. Choose $C$ so $U=0$ at $y'=0$ (equilibrium).  
**Step 3:** Verify that this $U = \frac{1}{2}ky'^2$ already includes **both** spring and gravitational potential energy. The gravitational PE term $mgy$ is absorbed into the shifted coordinate.  
**Step 4:** Practice 3 vertical spring problems: (a) mass lowered gently to equilibrium, (b) mass released from unstretched position, (c) mass pulled down from equilibrium and released. In each, write energy conservation using $y'$ and confirm results match using separate spring + gravitational PE.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_003, c11_phy_cbse_05_007, c11_phy_cbse_05_005, c9_physics_ch4_6, c8_physics_ch3_7, c11_phy_cbse_05_004, c11_phy_cbse_05_006

## PREREQUISITE_REASONS
c11_phy_cbse_05_003: Work done by spring force is derived here using integration of $F_s = -kx$, directly leading to the potential energy formula $U = -W_s = \frac{1}{2}kx^2$.
c11_phy_cbse_05_007: Gravitational potential energy $mgh$ provides the model for defining potential energy of a conservative force; the spring potential energy is developed by analogy.
c11_phy_cbse_05_005: Work-energy theorem ($K_f - K_i = W_{\text{net}}$) is essential for solving spring problems with friction where mechanical energy is not conserved.
c9_physics_ch4_6: Class 9 introduction to elastic potential energy as "stored energy in stretched/compressed spring" builds the intuitive foundation.
c8_physics_ch3_7: Class 8 identification of spring force as a contact force that can change shape introduces the concept of elastic deformation storing energy.
c11_phy_cbse_05_004: Spring potential energy interchanges with kinetic energy in oscillations; again K is essential.  
c11_phy_cbse_05_006: Spring potential energy is derived directly by applying this theorem to the variable spring force \(F=-kx\).  

## FORWARD_NODE_IDS
c11_phy_cbse_05_009, c11_phy_cbse_05_010, c11_phy_cbse_05_013, c11_phy_cbse_05_014, c12_phy_cbse_06_006, c12_phy_cbse_07_008

## FORWARD_REASONS
c11_phy_cbse_05_009: Spring force is the archetypal conservative force; its potential energy function $U = \frac{1}{2}kx^2$ is used to define and illustrate conservative vs non-conservative forces.
c11_phy_cbse_05_010: Conservation of mechanical energy is demonstrated using spring-block systems as the primary example of $K + U = \text{constant}$.
c11_phy_cbse_05_013: Elastic collisions are modelled using a "spring" interaction between colliding bodies; spring potential energy explains temporary kinetic energy storage during collision.
c11_phy_cbse_05_014: In 1D elastic collisions, the relative velocity reversal is derived using energy conservation where spring potential energy mediates the interaction.
c12_phy_cbse_06_006: Spring potential energy \( \frac{1}{2} k x^2 \) is the mechanical analogue; \( L \) is electrical inertia like \( k \), \( I \) is like displacement \( x \).  
c12_phy_cbse_07_008: Potential energy of a spring ($\frac{1}{2}kx^2$) is the mechanical analog of capacitor energy ($\frac{q^2}{2C}$).  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_05_001, c11_math_cbse_05_004, c11_math_cbse_05_005, c11_math_cbse_05_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_05_001: Integration of variable force $F(x) = -kx$ to find work done requires definite integral $\int -kx\,dx$, a direct application of integral calculus.
c11_math_cbse_05_004: The quadratic equation $\frac{1}{2}kx^2 - \mu mg x - \frac{1}{2}mv^2 = 0$ arises in friction problems; solving for $x$ uses quadratic formula and root selection.
c11_math_cbse_05_005: Area under $F$-$x$ graph (triangle) gives work done; geometric interpretation of integral as area verifies $\frac{1}{2}kx^2$.
c11_math_cbse_05_008: Differential equation $m\frac{d^2x}{dt^2} = -kx$ for spring motion connects to simple harmonic motion; solution $x = A\sin(\omega t)$ uses calculus.

## CHAIN_DESCRIPTION
c11_phy_cbse_05_003 -> c11_phy_cbse_05_008 -> c11_phy_cbse_05_010: Work done by spring force leads to spring potential energy formula, which enables conservation of mechanical energy in spring systems.

## THIS_FORMULA
$U = \frac{1}{2}kx^2$ (J), where $k$ = spring constant (N/m), $x$ = displacement from equilibrium (m); Spring force: $F_s = -kx$ (N); Work done by spring force: $W_s = -\frac{1}{2}k(x_f^2 - x_i^2)$ (J)

## FORMULA_VARIABLES
$U$ = elastic potential energy (J), $k$ = spring constant (N/m), $x$ = displacement from equilibrium position (m), $F_s$ = spring restoring force (N), $W_s$ = work done by spring force (J), $x_i$ = initial displacement (m), $x_f$ = final displacement (m)

## FORMULA_UNITS
J (joule), N/m (newton per metre), m (metre), N (newton)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_05_001 | Definite integration of variable force $F(x) = -kx$ over displacement gives work done $W = \int_{x_i}^{x_f} -kx\,dx = -\frac{1}{2}k(x_f^2 - x_i^2)$, directly yielding the potential energy formula.
c11_math_cbse_05_004 | Quadratic equations arise when solving for maximum compression with friction: $\frac{1}{2}kx^2 - \mu mg x - \frac{1}{2}mv^2 = 0$; discriminant analysis determines if the block reaches the spring.
c11_math_cbse_05_005 | Area under $F$-$x$ graph (straight line through origin) is a triangle; area = $\frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2}x \times kx = \frac{1}{2}kx^2$, geometrically verifying the integral result.
c11_math_cbse_05_008 | The differential equation of motion $m\ddot{x} + kx = 0$ describes SHM; its solution $x = A\cos(\omega t + \phi)$ with $\omega = \sqrt{k/m}$ connects energy $\frac{1}{2}kA^2$ to amplitude.

## PREREQ_CONCEPT
Work done by a variable force using integration ($W = \int F\,dx$) and the definition of potential energy for a conservative force ($\Delta U = -W_{\text{conservative}}$).

## PREREQ_BEFORE
The student must be able to set up and evaluate definite integrals of linear functions, and understand that potential energy is defined only for conservative forces where work done is path-independent.

## PREREQ_STUCK
If stuck, review "Work Done by Spring Force" (c11_phy_cbse_05_003) for the integration derivation, and "Potential Energy: Gravitational" (c11_phy_cbse_05_007) for the conservative force–potential energy relationship.

## WORKED_EXAMPLE_1
PROBLEM: A spring gun has a spring of force constant $k = 400\ \text{N/m}$. A ball of mass $20\ \text{g}$ is loaded by compressing the spring by $5\ \text{cm}$. The gun is fired horizontally from a height of $1.2\ \text{m}$ above ground. Find: (a) the speed of the ball as it leaves the gun, (b) the horizontal distance travelled before hitting the ground. Ignore friction in the gun barrel. Use $g = 10\ \text{m/s}^2$.

STEPS:
- Step 1: Identify given quantities with units: $k = 400\ \text{N/m}$, $m = 20\ \text{g} = 0.02\ \text{kg}$, $x = 5\ \text{cm} = 0.05\ \text{m}$, $h = 1.2\ \text{m}$, $g = 10\ \text{m/s}^2$. Unknowns: $v$ (speed at launch), $R$ (horizontal range).
- Step 2: For (a), apply conservation of mechanical energy inside the gun: initial spring potential energy = final kinetic energy of ball. $\frac{1}{2}kx^2 = \frac{1}{2}mv^2$. Solve for $v$: $v = x\sqrt{k/m}$.
- Step 3: Substitute values: $v = 0.05 \times \sqrt{400 / 0.02} = 0.05 \times \sqrt{20000} = 0.05 \times 141.42 = 7.07\ \text{m/s}$. Unit check: $\sqrt{\text{N/m} / \text{kg}} = \sqrt{(\text{kg}\cdot\text{m/s}^2)/\text{m} / \text{kg}} = \sqrt{1/\text{s}^2} = 1/\text{s}$, times m gives m/s — correct.
- Step 4: For (b), treat as projectile motion. Time of fall: $h = \frac{1}{2}gt^2 \Rightarrow t = \sqrt{2h/g} = \sqrt{2 \times 1.2 / 10} = \sqrt{0.24} = 0.49\ \text{s}$. Horizontal range: $R = v t = 7.07 \times 0.49 = 3.46\ \text{m}$.
- Step 5: Verify physical reasonableness: Spring gun firing a light ball at ~7 m/s reaching ~3.5 m horizontally from 1.2 m height is plausible for a toy spring gun. Answer: (a) $7.07\ \text{m/s}$, (b) $3.46\ \text{m}$.

REASONING: The spring's stored elastic potential energy is fully converted to kinetic energy of the ball (no friction). After launch, the ball follows projectile motion under gravity. The horizontal velocity remains constant (no air resistance), so range = horizontal velocity × time of flight. Time of flight depends only on vertical height and $g$.

ANSWER: (a) $7.07\ \text{m/s}$, (b) $3.46\ \text{m}$

## WORKED_EXAMPLE_2
PROBLEM: A block of mass $1.5\ \text{kg}$ slides on a rough horizontal surface ($\mu_k = 0.2$) with initial speed $3\ \text{m/s}$. It encounters a spring of constant $k = 250\ \text{N/m}$ fixed to a wall. Find the maximum compression of the spring. Use $g = 10\ \text{m/s}^2$.

STEPS:
- Step 1: Given: $m = 1.5\ \text{kg}$, $v_i = 3\ \text{m/s}$, $\mu_k = 0.2$, $k = 250\ \text{N/m}$, $g = 10\ \text{m/s}^2$. Unknown: $x_{\text{max}}$. Friction is present, so mechanical energy is NOT conserved; use work-energy theorem.
- Step 2: Work-energy theorem: $K_f - K_i = W_{\text{spring}} + W_{\text{friction}}$. At max compression, $K_f = 0$, $K_i = \frac{1}{2}mv_i^2$. $W_{\text{spring}} = -\frac{1}{2}kx_{\text{max}}^2$, $W_{\text{friction}} = -\mu_k mg x_{\text{max}}$.
- Step 3: Substitute: $0 - \frac{1}{2}mv_i^2 = -\frac{1}{2}kx_{\text{max}}^2 - \mu_k mg x_{\text{max}}$. Multiply by $-2$: $mv_i^2 = kx_{\text{max}}^2 + 2\mu_k mg x_{\text{max}}$.
- Step 4: Rearrange into standard quadratic: $kx_{\text{max}}^2 + 2\mu_k mg x_{\text{max}} - mv_i^2 = 0$. Plug numbers: $250 x^2 + 2(0.2)(1.5)(10)x - 1.5(9) = 0 \Rightarrow 250x^2 + 6x - 13.5 = 0$.
- Step 5: Solve quadratic: $x = \frac{-6 \pm \sqrt{36 + 4(250)(13.5)}}{2(250)} = \frac{-6 \pm \sqrt{36 + 13500}}{500} = \frac{-6 \pm \sqrt{13536}}{500} = \frac{-6 \pm 116.34}{500}$. Positive root: $x = \frac{110.34}{500} = 0.221\ \text{m} = 22.1\ \text{cm}$.
- Step 6: Verify: Without friction, $x = v\sqrt{m/k} = 3\sqrt{1.5/250} = 0.232\ \text{m}$. With friction, compression is less ($0.221\ \text{m}$), which is physically correct. Unit check: all terms in quadratic have units of J (energy) — correct.

REASONING: Friction is a non-conservative force, so we cannot use $K_i = U_{\text{spring}}$. Instead, the work-energy theorem accounts for work done by all forces (spring + friction). The spring force does negative work (opposing compression), friction does negative work (opposing motion). The quadratic arises because friction work is linear in $x$ while spring work is quadratic.

ANSWER: $22.1\ \text{cm}$

## WORKED_EXAMPLE_3
PROBLEM: A vertical spring of force constant $k = 200\ \text{N/m}$ hangs from a rigid support. A block of mass $0.5\ \text{kg}$ is attached to the spring and released from rest when the spring is unstretched. Find: (a) the maximum extension of the spring, (b) the speed of the block when the spring extension is half the maximum extension. Use $g = 10\ \text{m/s}^2$.

STEPS:
- Step 1: Given: $k = 200\ \text{N/m}$, $m = 0.5\ \text{kg}$, $g = 10\ \text{m/s}^2$. Released from unstretched position ($x=0$ where $x$ is extension from natural length). Initial velocity $v_i = 0$. Unknowns: $x_{\text{max}}$, $v$ at $x = x_{\text{max}}/2$.
- Step 2: Choose reference for potential energy. Let gravitational PE = 0 at the unstretched position ($x=0$). At any extension $x$, spring PE = $\frac{1}{2}kx^2$, gravitational PE = $-mgx$ (since block descends by $x$). Total mechanical energy $E = \frac{1}{2}kx^2 - mgx + \frac{1}{2}mv^2$.
- Step 3: Initial energy (at $x=0, v=0$): $E_i = 0$. By conservation, $E = 0$ always. At maximum extension, $v=0$: $\frac{1}{2}kx_{\text{max}}^2 - mgx_{\text{max}} = 0 \Rightarrow x_{\text{max}}(\frac{1}{2}kx_{\text{max}} - mg) = 0$. Non-zero root: $x_{\text{max}} = 2mg/k = 2(0.5)(10)/200 = 10/200 = 0.05\ \text{m} = 5\ \text{cm}$.
- Step 4: At $x = x_{\text{max}}/2 = 0.025\ \text{m}$, energy conservation: $\frac{1}{2}k(0.025)^2 - mg(0.025) + \frac{1}{2}mv^2 = 0$. Solve for $v^2$: $\frac{1}{2}mv^2 = mg(0.025) - \frac{1}{2}k(0.025)^2$. Substitute $mg = 5\ \text{N}$, $k = 200\ \text{N/m}$: $\frac{1}{2}mv^2 = 5(0.025) - 100(0.000625) = 0.125 - 0.0625 = 0.0625\ \text{J}$.
- Step 5: $v^2 = 2 \times 0.0625 / 0.5 = 0.25 \Rightarrow v = 0.5\ \text{m/s}$. Unit check: J/kg = m²/s², sqrt gives m/s — correct.
- Step 6: Verify using equilibrium position $x_0 = mg/k = 0.025\ \text{m}$. At $x = x_0$, speed should be maximum. $v_{\text{max}} = \sqrt{2mgx_0 - kx_0^2/m} = \sqrt{2(5)(0.025) - 200(0.025)^2/0.5} = \sqrt{0.25 - 0.25} = 0$? Wait — recalc: $v_{\text{max}}^2 = 2gx_0 - kx_0^2/m = 2(10)(0.025) - 200(0.000625)/0.5 = 0.5 - 0.25 = 0.25 \Rightarrow v_{\text{max}} = 0.5\ \text{m/s}$. At $x = x_0 = x_{\text{max}}/2$, speed is indeed maximum. Answer consistent.

REASONING: For vertical springs, both spring and gravitational potential energy must be included. Choosing the unstretched position as zero for both simplifies initial energy to zero. The equilibrium extension is $x_0 = mg/k$, and the block oscillates between $x=0$ and $x=2x_0$. The speed is maximum at the equilibrium position $x_0$, which coincides with half the maximum extension in this specific release-from-unstretched case.

ANSWER: (a) $5\ \text{cm}$, (b) $0.5\ \text{m/s}$

## COMPETENCY_QUESTION_1
QUESTION: A spring of constant $k$ is compressed by a distance $x_0$ and used to launch a block of mass $m$ up a rough inclined plane of angle $\theta$ and coefficient of kinetic friction $\mu_k$. The block is initially at rest against the compressed spring. Derive an expression for the maximum distance $d$ the block travels up the incline before stopping. Explain why the spring's potential energy is not simply converted to gravitational potential energy $mgd\sin\theta$.

COMPETENCY: Predicting outcomes from changing variables and identifying energy transformations in multi-force systems

STEPS:
- Step 1: Identify initial and final states. Initial: spring compressed $x_0$, block at rest. Final: spring at natural length (or still compressed if block loses contact earlier — assume it loses contact at natural length), block at rest at distance $d$ up incline.
- Step 2: Apply work-energy theorem (not conservation) because friction is non-conservative. Net work = change in kinetic energy = 0 (starts and ends at rest).
- Step 3: Work done by spring: $W_s = +\frac{1}{2}kx_0^2$ (spring force on block is in direction of motion during expansion). Work by gravity: $W_g = -mgd\sin\theta$. Work by friction: $W_f = -\mu_k mg\cos\theta \cdot d$.
- Step 4: $W_s + W_g + W_f = 0 \Rightarrow \frac{1}{2}kx_0^2 = mgd(\sin\theta + \mu_k\cos\theta)$.
- Step 5: Solve for $d$: $d = \frac{kx_0^2}{2mg(\sin\theta + \mu_k\cos\theta)}$.
- Step 6: The spring PE is not simply converted to gravitational PE because friction dissipates part of it as heat. The work-energy theorem accounts for all energy transfers.

ANSWER: $d = \frac{kx_0^2}{2mg(\sin\theta + \mu_k\cos\theta)}$. The spring potential energy is converted into both gravitational potential energy ($mgd\sin\theta$) and thermal energy due to friction ($\mu_k mgd\cos\theta$). Ignoring friction would overestimate the distance.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two identical springs of constant $k$ are connected (a) in series, (b) in parallel. A block of mass $m$ is attached and the system oscillates vertically. Find the effective spring constant $k_{\text{eff}}$ for each case, and the ratio of time periods $T_{\text{series}}/T_{\text{parallel}}$. Then, for the same amplitude $A$, find the ratio of maximum elastic potential energies stored in the springs: $U_{\text{series, max}} / U_{\text{parallel, max}}$.

COMPETENCY: Interpreting physical situations using formulas and combining concepts (series/parallel springs, SHM period, energy in oscillations)

STEPS:
- Step 1: For springs in series, effective $k$: $1/k_{\text{eff}} = 1/k + 1/k = 2/k \Rightarrow k_{\text{eff, series}} = k/2$. For parallel: $k_{\text{eff, parallel}} = k + k = 2k$.
- Step 2: Time period of vertical spring-mass system: $T = 2\pi\sqrt{m/k_{\text{eff}}}$. $T_{\text{series}} = 2\pi\sqrt{m/(k/2)} = 2\pi\sqrt{2m/k}$. $T_{\text{parallel}} = 2\pi\sqrt{m/(2k)} = 2\pi\sqrt{m/2k}$.
- Step 3: Ratio $T_{\text{series}}/T_{\text{parallel}} = \sqrt{2m/k} / \sqrt{m/2k} = \sqrt{4} = 2$.
- Step 4: Maximum elastic potential energy in oscillation: $U_{\text{max}} = \frac{1}{2}k_{\text{eff}}A^2$ (total energy, assuming amplitude $A$ measured from equilibrium).
- Step 5: $U_{\text{series, max}} = \frac{1}{2}(k/2)A^2 = \frac{1}{4}kA^2$. $U_{\text{parallel, max}} = \frac{1}{2}(2k)A^2 = kA^2$.
- Step 6: Ratio $U_{\text{series, max}} / U_{\text{parallel, max}} = (\frac{1}{4}kA^2) / (kA^2) = 1/4$.
- Step 7: Physical interpretation: For the same amplitude, the softer series system stores less energy because the effective spring constant is smaller.

ANSWER: (a) $k_{\text{eff, series}} = k/2$, $k_{\text{eff, parallel}} = 2k$; (b) $T_{\text{series}}/T_{\text{parallel}} = 2$; (c) $U_{\text{series, max}} / U_{\text{parallel, max}} = 1/4$.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe a common spring ______ used in Indian vegetable markets — when you hang a 1 kg tomato bag, the spring stretches by about 5 cm.

## DIAGNOSTIC_ANSWER_7
balance

**A wrong answer ("scale" or "meter") reveals the student has swapped the walkthrough's compound noun - the device is a spring balance.** Balance is the walkthrough's own second half of that compound, and the noun is what the blank grades. Recall the tomato bag before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a common spring balance used in Indian ______ markets — when you hang a 1 kg tomato bag, the spring stretches by about 5 cm.

## DIAGNOSTIC_ANSWER_8
vegetable

**A wrong answer ("flower" or "fruit") reveals the student has swapped the walkthrough's adjective - the markets are Indian vegetable markets.** Vegetable is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the 5 cm stretch before filling, and give the adjective exactly.
