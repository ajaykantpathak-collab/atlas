## ELI5
The raindrop stops accelerating mid-fall - drag has caught up with weight. Stokes' law prices the drag on a small sphere: six pi times viscosity, radius and speed. Terminal velocity arrives when weight equals drag plus buoyancy, and it scales with the square of the radius - the fat drop lands hardest. Valid only in the slow, laminar lane.

## DEFINITION
Stokes' Law states that the viscous drag force \(F\) on a small sphere of radius \(a\) moving with velocity \(v\) through a fluid of coefficient of viscosity \(\eta\) under laminar flow conditions is \(F = 6\pi\eta a v\). Terminal velocity \(v_t\) is the constant maximum velocity attained by a falling sphere when the net force becomes zero: \(v_t = \frac{2a^2(\rho - \sigma)g}{9\eta}\), where \(\rho\) is the density of the sphere, \(\sigma\) is the density of the fluid, and \(g\) is acceleration due to gravity.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate terminal velocity for a sphere falling through a viscous fluid given radius, densities, and viscosity; can derive the expression for terminal velocity by equating viscous drag, buoyant force, and weight; and can identify the conditions under which Stokes' Law is valid (laminar flow, small Reynolds number, spherical object).

## SCOPE_BOUNDARY
Covers Stokes' Law for viscous drag on a sphere, derivation of terminal velocity using force balance (weight = viscous drag + buoyant force), and conditions for validity (laminar flow, incompressible fluid, rigid sphere, no wall effects). Does NOT cover derivation of Stokes' Law from Navier-Stokes equations, non-spherical objects, turbulent drag (quadratic drag), or compressible flow effects.

## WALKTHROUGH
Watch a raindrop falling on a window pane during monsoon — it doesn't accelerate indefinitely but reaches a steady speed. This is terminal velocity. Begin by recalling viscosity (c11_phy_cbse_09_009): adjacent fluid layers exert shear forces proportional to velocity gradient. Now imagine a small steel ball dropped in a tall cylinder of glycerine. Initially gravity accelerates it, but as speed increases, viscous drag grows linearly with velocity (Stokes' Law). Simultaneously, Archimedes' principle gives an upward buoyant force. At terminal velocity, weight = viscous drag + buoyant force. Write the force balance equation, substitute \(F = 6\pi\eta a v_t\) and buoyant force \(= \frac{4}{3}\pi a^3\sigma g\), solve for \(v_t\). The key insight: terminal velocity scales with \(a^2\) — doubling radius quadruples terminal speed.

Takeaway: mastery means deriving terminal velocity from the three-force balance, computing it for given spheres and fluids, and listing the validity conditions. Exam moves: find-the-terminal-velocity questions and check-the-conditions items. Check yourself: the radius enters squared - doubling it quadruples the cruising speed, which is why drizzle and downpour fall differently. Students miss it because they forget buoyancy in the balance, when the definition's equation has three terms: weight down, drag up, buoyancy up, and only their deadlock sets the steady speed.

## DIAGNOSTIC_QUESTION_1
State Stokes' Law for viscous drag force on a sphere. Write the formula with all variables and their SI units. What are the three essential conditions for its validity?

## DIAGNOSTIC_ANSWER_1
Stokes' Law: \(F = 6\pi\eta a v\) where \(F\) = viscous drag force (N), \(\eta\) = coefficient of viscosity (Pa·s or N·s/m²), \(a\) = radius of sphere (m), \(v\) = velocity of sphere relative to fluid (m/s). Conditions: (1) Laminar flow (low Reynolds number, typically Re < 1), (2) Sphere is small compared to container dimensions (no wall effects), (3) Fluid is incompressible and homogeneous, sphere is rigid and smooth. A wrong answer missing any condition reveals the student thinks Stokes' Law applies universally to all falling objects, ignoring the laminar flow requirement.

## DIAGNOSTIC_QUESTION_2
A student argues: "Terminal velocity formula has \(g\) in it, so if we do the experiment on the Moon where \(g\) is 1/6th, terminal velocity will also become 1/6th." Is this reasoning correct? Explain using the force balance equation.

## DIAGNOSTIC_ANSWER_2
The reasoning is partially correct but incomplete. From force balance: \(mg = 6\pi\eta a v_t + \frac{4}{3}\pi a^3\sigma g\). Substituting \(m = \frac{4}{3}\pi a^3\rho\) gives \(v_t = \frac{2a^2(\rho - \sigma)g}{9\eta}\). Yes, \(v_t \propto g\) directly, so on Moon \(v_t\) becomes 1/6th. However, the student misses that \(\rho\) and \(\sigma\) are intrinsic densities (unchanged), but if the fluid were a gas, its density \(\sigma\) would also change with gravity (atmospheric scale height), making the relationship more complex. A wrong answer stating "exactly 1/6th" without qualification reveals confusion between intrinsic density and weight-dependent pressure effects.

## DIAGNOSTIC_QUESTION_3
A spherical raindrop of radius 1.5 mm falls through air at 20°C. Density of water = 1000 kg/m³, density of air = 1.2 kg/m³, viscosity of air = 1.8 × 10⁻⁵ Pa·s. Calculate its terminal velocity. Is Stokes' Law valid here? (Check Reynolds number: Re = \(\frac{\rho_{air} v_t a}{\eta}\)).

## DIAGNOSTIC_ANSWER_3
Given: \(a = 1.5 \times 10^{-3}\) m, \(\rho = 1000\) kg/m³, \(\sigma = 1.2\) kg/m³, \(\eta = 1.8 \times 10^{-5}\) Pa·s, \(g = 9.8\) m/s².
Step 1: Compute \(v_t = \frac{2a^2(\rho - \sigma)g}{9\eta} = \frac{2(1.5\times10^{-3})^2(1000 - 1.2)(9.8)}{9(1.8\times10^{-5})}\)
Step 2: \(a^2 = 2.25\times10^{-6}\) m², \(\rho - \sigma \approx 998.8\) kg/m³
Step 3: Numerator = \(2 \times 2.25\times10^{-6} \times 998.8 \times 9.8 = 4.41\times10^{-2}\)
Step 4: Denominator = \(9 \times 1.8\times10^{-5} = 1.62\times10^{-4}\)
Step 5: \(v_t = \frac{4.41\times10^{-2}}{1.62\times10^{-4}} = 272\) m/s ≈ 980 km/h.
Step 6: Check Re = \(\frac{\sigma v_t a}{\eta} = \frac{1.2 \times 272 \times 1.5\times10^{-3}}{1.8\times10^{-5}} = 27,200\).
Re >> 1, so Stokes' Law is NOT valid — flow is turbulent. Actual terminal velocity of raindrops is ~9 m/s. A wrong answer giving 272 m/s without checking Re reveals the student applies formulas blindly without verifying validity conditions.

## DIAGNOSTIC_QUESTION_4
Two identical steel balls (radius \(r\), density \(\rho_s\)) are dropped simultaneously: one in glycerine (viscosity \(\eta_g\), density \(\sigma_g\)), the other in water (viscosity \(\eta_w\), density \(\sigma_w\)). Given \(\eta_g \gg \eta_w\) and \(\sigma_g > \sigma_w\). Compare their terminal velocities qualitatively. Which reaches terminal velocity faster?

## DIAGNOSTIC_ANSWER_4
From \(v_t = \frac{2r^2(\rho_s - \sigma)g}{9\eta}\): In glycerine, higher \(\eta\) decreases \(v_t\), higher \(\sigma\) decreases \((\rho_s - \sigma)\) further decreasing \(v_t\). Both effects make \(v_{t,glycerine} \ll v_{t,water}\). Time to reach terminal velocity depends on acceleration phase: \(a(t) = g - \frac{6\pi\eta r}{m}v - \frac{\sigma}{\rho_s}g\). Higher \(\eta\) means stronger velocity-dependent drag, so the ball in glycerine approaches terminal velocity faster (shorter relaxation time \(\tau = \frac{m}{6\pi\eta r} = \frac{2\rho_s r^2}{9\eta}\)). A wrong answer saying "water reaches terminal velocity faster because it's less viscous" confuses terminal speed with approach time — it actually takes longer in water because drag builds up more slowly.

## DIAGNOSTIC_QUESTION_5
A student measures terminal velocity of a 2 mm radius glass bead (\(\rho = 2500\) kg/m³) in a liquid of unknown viscosity. They get \(v_t = 4.2\) cm/s. The liquid density is 1200 kg/m³. They calculate \(\eta = 0.85\) Pa·s. Later they realize the beaker diameter was only 10 mm. Is their calculated viscosity correct? If not, is it an overestimate or underestimate?

## DIAGNOSTIC_ANSWER_5
The calculated viscosity is an OVERESTIMATE (incorrectly high). Wall effect: when container diameter is comparable to sphere diameter (here beaker = 10 mm, sphere = 4 mm, ratio = 2.5 < 10), the fluid cannot flow freely around the sphere, increasing drag beyond Stokes' prediction. The Faxén correction: \(F_{actual} = F_{Stokes}(1 + 2.1\frac{a}{R} + \cdots)\) where \(R\) = container radius. Since actual drag > Stokes' drag, for the same measured \(v_t\), the formula \(\eta = \frac{2a^2(\rho-\sigma)g}{9v_t}\) yields a higher \(\eta\) than true. Correct \(\eta\) would be lower. A wrong answer saying "underestimate" or "no effect" reveals ignorance of wall correction — a critical practical consideration in viscometry.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using Stokes' Law to determine the coefficient of viscosity of honey at room temperature. List apparatus, procedure, measurements needed, and how you'll verify laminar flow condition. What precautions would you take for temperature control?

## DIAGNOSTIC_ANSWER_6
Apparatus: Tall transparent cylinder (diameter ≥ 5 cm), honey, steel balls of 3-4 different radii (1-3 mm), stopwatch, metre scale, thermometer, magnet for ball retrieval. Procedure: (1) Measure honey temperature, record. (2) Fill cylinder with honey, let air bubbles rise. (3) Drop smallest ball, measure time \(t\) to fall distance \(h\) after reaching terminal velocity (ignore first 10 cm). (4) Compute \(v_t = h/t\). (5) Repeat for each ball radius \(a\). (6) Plot \(v_t\) vs \(a^2\) — slope = \(\frac{2(\rho-\sigma)g}{9\eta}\) gives \(\eta\). Verify laminar flow: Check Re = \(\frac{\sigma v_t a}{\eta} < 1\) for all balls. Precautions: (a) Use water bath to maintain constant temperature (±0.5°C) since honey viscosity is highly temperature-sensitive. (b) Ensure balls are spherical and smooth. (c) Cylinder diameter > 10× ball diameter to avoid wall effects. (d) Clean balls between trials. A poor answer omits temperature control or Re verification, revealing lack of experimental rigor.

## COMMON_MISCONCEPTION
Students believe Stokes' Law (\(F = 6\pi\eta a v\)) applies to ALL objects falling through fluids, including skydivers, cars, or raindrops of any size. They miss that the linear drag law ONLY holds for very low Reynolds numbers (Re < 1), which requires tiny objects (radius < ~0.5 mm in air), very viscous fluids, or very low speeds. For larger objects, drag becomes quadratic (\(F \propto v^2\)). Example: A student calculates terminal velocity of a 5 cm radius ball in air using Stokes' Law and gets ~5000 m/s, not realizing Re would be ~10⁵, making the formula completely invalid.

## ON_FAILURE
If student applies Stokes' Law blindly: (1) Have them compute Reynolds number Re = \(\frac{\rho_{fluid} v a}{\eta}\) for their problem. (2) Show that Re > 1 means turbulent flow — use the "cream in coffee" analogy: stir slowly (laminar, Stokes regime) vs stir fast (turbulent, vortices). (3) Give a worked example: 1 mm steel ball in glycerine (Re ~ 0.01, valid) vs 1 cm ball in air (Re ~ 1000, invalid). (4) Make them redo the problem using the condition check as Step 0. (5) Emphasize: "Stokes' Law is for 'creeping flow' — if you can see vortices or hear sound, it's not creeping."

## PREREQUISITE_NODE_IDS
c11_phy_cbse_09_009, c11_phy_cbse_09_006, c9_physics_ch3_4, c9_physics_ch4_5, c11_math_cbse_02_001
## PREREQUISITE_REASONS
c11_phy_cbse_09_009: Defines coefficient of viscosity \(\eta\) and laminar flow — essential for understanding the drag force origin.
c11_phy_cbse_09_006: Archimedes' principle gives buoyant force \(\frac{4}{3}\pi a^3\sigma g\) needed in terminal velocity force balance.
c9_physics_ch3_4: Newton's Second Law (\(F=ma\)) used to set up equation of motion before terminal velocity is reached.
c9_physics_ch4_5: Kinetic energy concept helps understand energy dissipation into heat via viscous forces.
c11_math_cbse_02_001: Requires The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all o... - this node (Stokes' Law states that the viscous drag force \(F\) on a small sphere of radius \(a\) mov...) builds directly on that foundation.  
## FORWARD_NODE_IDS
c11_phy_cbse_09_011
## FORWARD_REASONS
c11_phy_cbse_09_011: Reynolds Number quantifies the laminar/turbulent transition; Stokes' Law validity (Re < 1) is the low-Re limit of the Reynolds number concept.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_001, c10_math_cbse_04_005
## CROSS_SUBJECT_REASONS
c11_math_ch2_1: Linear/quadratic equations used to solve for terminal velocity and verify Reynolds number conditions.
c10_math_cbse_04_005: Quadratic formula derivation (completing the square) parallels the algebraic steps in deriving \(v_t\) from force balance equation \(mg - \frac{4}{3}\pi a^3\sigma g - 6\pi\eta a v = m\frac{dv}{dt}\).
c11_math_cbse_02_001: Cross-subject support: The Cartesian product of two non-empty sets A and B, denoted by A × B, is the set of all o... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_phy_cbse_09_009 -> c11_phy_cbse_09_010 -> c11_phy_cbse_09_011: Viscosity defines \(\eta\) and laminar flow; Stokes' Law uses \(\eta\) to give drag force and terminal velocity; Reynolds Number generalizes the flow regime boundary.

## THIS_FORMULA
Stokes' Law: \(F = 6\pi\eta a v\) (N). Terminal velocity: \(v_t = \frac{2a^2(\rho - \sigma)g}{9\eta}\) (m/s). Conditions: Re = \(\frac{\sigma v a}{\eta} < 1\), sphere radius \(a \ll\) container dimensions, incompressible fluid, rigid smooth sphere.

## FORMULA_VARIABLES
\(F\) = viscous drag force (N), \(\eta\) = coefficient of viscosity (Pa·s = N·s/m²), \(a\) = radius of sphere (m), \(v\) = velocity of sphere relative to fluid (m/s), \(v_t\) = terminal velocity (m/s), \(\rho\) = density of sphere material (kg/m³), \(\sigma\) = density of fluid (kg/m³), \(g\) = acceleration due to gravity (9.8 m/s²), Re = Reynolds number (dimensionless).

## FORMULA_UNITS
N, Pa·s, m, m/s, kg/m³, m/s², dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_ch2_1 | Algebraic manipulation of \(v_t = \frac{2a^2(\rho-\sigma)g}{9\eta}\) requires solving for any variable, checking dimensional consistency: \([a^2] = m^2\), \([\rho] = kg/m^3\), \([g] = m/s^2\), \([\eta] = kg/(m·s)\) → \([v_t] = m/s\).
c10_math_cbse_04_005 | Quadratic formula structure appears when solving the differential equation \(m\frac{dv}{dt} = mg - \frac{4}{3}\pi a^3\sigma g - 6\pi\eta a v\) for velocity as function of time: \(v(t) = v_t(1 - e^{-t/\tau})\) where \(\tau = \frac{m}{6\pi\eta a}\).

## PREREQ_CONCEPT
Viscosity and laminar flow (c11_phy_cbse_09_009): the internal friction coefficient \(\eta\) and the condition that fluid layers slide smoothly without mixing.

## PREREQ_BEFORE
Student must be able to state the definition of coefficient of viscosity, its SI unit, and explain why drag force is proportional to velocity (not velocity squared) in laminar flow.

## PREREQ_STUCK
Revisit c11_phy_cbse_09_009: focus on the velocity profile in a pipe (parabolic) and the shear stress formula \(\tau = \eta \frac{dv}{dy}\). Understand that Stokes' Law is the 3D analogue for a sphere.

## WORKED_EXAMPLE_1
PROBLEM: A spherical pollen grain of radius 25 μm and density 1200 kg/m³ falls through air at 25°C. Density of air = 1.18 kg/m³, viscosity of air = 1.85 × 10⁻⁵ Pa·s. Calculate its terminal velocity. Verify if Stokes' Law is applicable. (g = 9.8 m/s²)
STEPS:
- Step 1: Identify given quantities with units: \(a = 25 \times 10^{-6}\) m, \(\rho = 1200\) kg/m³, \(\sigma = 1.18\) kg/m³, \(\eta = 1.85 \times 10^{-5}\) Pa·s, \(g = 9.8\) m/s². Find \(v_t\) and check Re.
- Step 2: Write terminal velocity formula: \(v_t = \frac{2a^2(\rho - \sigma)g}{9\eta}\). Check units: \([a^2] = m^2\), \([\rho-\sigma] = kg/m^3\), \([g] = m/s^2\), \([\eta] = kg/(m·s)\) → \([v_t] = \frac{m^2 \cdot kg/m^3 \cdot m/s^2}{kg/(m·s)} = m/s\). Correct.
- Step 3: Substitute values: \(a^2 = (25\times10^{-6})^2 = 6.25\times10^{-10}\) m². \(\rho - \sigma \approx 1198.82\) kg/m³. Numerator = \(2 \times 6.25\times10^{-10} \times 1198.82 \times 9.8 = 1.464\times10^{-5}\). Denominator = \(9 \times 1.85\times10^{-5} = 1.665\times10^{-4}\).
- Step 4: Compute \(v_t = \frac{1.464\times10^{-5}}{1.665\times10^{-4}} = 0.0879\) m/s = 8.79 cm/s.
- Step 5: Check Reynolds number: Re = \(\frac{\sigma v_t a}{\eta} = \frac{1.18 \times 0.0879 \times 25\times10^{-6}}{1.85\times10^{-5}} = \frac{2.59\times10^{-6}}{1.85\times10^{-5}} = 0.14\).
- Step 6: Since Re = 0.14 < 1, Stokes' Law is valid. The pollen grain reaches terminal velocity quickly and falls slowly, which matches observation of pollen staying airborne for long periods.
REASONING: The force balance at terminal velocity equates weight (downward) to viscous drag + buoyant force (both upward). The small radius makes \(a^2\) term tiny, giving low \(v_t\). Low \(v_t\) and small \(a\) keep Re small, justifying the linear drag assumption. Unit tracking at Step 2 prevents errors like forgetting to convert μm to m.
ANSWER: \(v_t = 0.088\) m/s (or 8.8 cm/s). Stokes' Law is valid (Re = 0.14 < 1).

## WORKED_EXAMPLE_2
PROBLEM: In a viscometer experiment, a steel ball (radius 1.5 mm, density 7800 kg/m³) falls through a liquid of density 1200 kg/m³. It travels 30 cm in 12.5 seconds after reaching terminal velocity. Calculate the coefficient of viscosity of the liquid. The cylinder diameter is 4 cm. Check for wall effect.
STEPS:
- Step 1: Given: \(a = 1.5 \times 10^{-3}\) m, \(\rho = 7800\) kg/m³, \(\sigma = 1200\) kg/m³, distance \(h = 0.30\) m, time \(t = 12.5\) s, cylinder radius \(R = 0.02\) m. Find \(\eta\).
- Step 2: Compute terminal velocity: \(v_t = h/t = 0.30 / 12.5 = 0.024\) m/s.
- Step 3: Check wall effect ratio: \(a/R = 1.5/20 = 0.075\). Since \(a/R < 0.1\), wall correction is small but we'll apply Faxén correction: \(F_{actual} = F_{Stokes}(1 + 2.1\frac{a}{R})\). Correction factor = \(1 + 2.1 \times 0.075 = 1.1575\). Effective drag is 15.75% higher.
- Step 4: Rearrange terminal velocity formula for \(\eta\): \(\eta = \frac{2a^2(\rho - \sigma)g}{9v_t}\). Substitute values: \(a^2 = 2.25\times10^{-6}\) m², \(\rho - \sigma = 6600\) kg/m³. Numerator = \(2 \times 2.25\times10^{-6} \times 6600 \times 9.8 = 2.91\times10^{-1}\).
- Step 5: Without wall correction: \(\eta = \frac{0.291}{9 \times 0.024} = \frac{0.291}{0.216} = 1.347\) Pa·s.
- Step 6: With wall correction: actual drag is higher, so for same \(v_t\), true \(\eta\) is lower by correction factor: \(\eta_{true} = \frac{1.347}{1.1575} = 1.164\) Pa·s.
- Step 7: Verify Re = \(\frac{\sigma v_t a}{\eta} = \frac{1200 \times 0.024 \times 1.5\times10^{-3}}{1.164} = 0.037 < 1\). Laminar flow confirmed.
REASONING: The experiment directly measures \(v_t\) from distance/time. The formula is inverted to find \(\eta\). Wall correction is crucial in precise viscometry — ignoring it overestimates viscosity by ~16% here. Re check validates the Stokes regime assumption.
ANSWER: \(\eta = 1.16\) Pa·s (with wall correction). Without correction: 1.35 Pa·s.

## WORKED_EXAMPLE_3
PROBLEM: A spherical oil droplet of radius 10 μm and density 900 kg/m³ falls through air in a Millikan oil-drop apparatus. The droplet carries a charge \(q\) and is subjected to an upward electric field \(E = 5 \times 10^4\) N/C. The droplet reaches terminal velocity \(v_t = 0.012\) m/s downward when the field is ON. When the field is OFF, terminal velocity is \(v_{t0} = 0.025\) m/s downward. Given \(\eta_{air} = 1.8 \times 10^{-5}\) Pa·s, \(\sigma_{air} = 1.2\) kg/m³, \(g = 9.8\) m/s². Find the charge \(q\) on the droplet.
STEPS:
- Step 1: Identify forces in both cases. Field OFF: weight = viscous drag + buoyant force → \(mg = 6\pi\eta a v_{t0} + \frac{4}{3}\pi a^3\sigma g\). Field ON (upward E): weight + electric force (upward if q positive) = viscous drag + buoyant force → \(mg - qE = 6\pi\eta a v_t + \frac{4}{3}\pi a^3\sigma g\).
- Step 2: Subtract the two equations: \(qE = 6\pi\eta a (v_{t0} - v_t)\). The buoyant force and weight cancel out! This is the key insight — we don't need \(\rho\) or \(\sigma\) explicitly.
- Step 3: Compute \(v_{t0} - v_t = 0.025 - 0.012 = 0.013\) m/s.
- Step 4: Substitute: \(q = \frac{6\pi\eta a (v_{t0} - v_t)}{E} = \frac{6\pi \times 1.8\times10^{-5} \times 10\times10^{-6} \times 0.013}{5\times10^4}\).
- Step 5: Calculate stepwise: \(6\pi \approx 18.85\). \(\eta a = 1.8\times10^{-5} \times 10^{-5} = 1.8\times10^{-10}\). Product = \(18.85 \times 1.8\times10^{-10} \times 0.013 = 4.41\times10^{-11}\).
- Step 6: \(q = \frac{4.41\times10^{-11}}{5\times10^4} = 8.82\times10^{-16}\) C.
- Step 7: Express in elementary charges: \(e = 1.6\times10^{-19}\) C. \(n = \frac{8.82\times10^{-16}}{1.6\times10^{-19}} = 5512.5\). Not an integer — suggests measurement error or the droplet radius is not exactly 10 μm. (In real Millikan experiment, radius is determined from \(v_{t0}\) using Stokes' Law).
- Step 8: Verify Re for both cases: Re₀ = \(\frac{\sigma v_{t0} a}{\eta} = \frac{1.2 \times 0.025 \times 10^{-5}}{1.8\times10^{-5}} = 1.67\times10^{-5} < 1\). Re = \(\frac{1.2 \times 0.012 \times 10^{-5}}{1.8\times10^{-5}} = 8\times10^{-6} < 1\). Valid.
REASONING: This combines Stokes' Law with electrostatics — a classic Millikan oil-drop experiment. The clever subtraction eliminates the need for droplet density and buoyancy, directly relating charge to the change in terminal velocity. This demonstrates how Stokes' Law enables fundamental physics measurements.
ANSWER: \(q = 8.8 \times 10^{-16}\) C (approximately 5500 e). Note: Non-integer multiple indicates experimental uncertainty in radius or velocity measurements.

## COMPETENCY_QUESTION_1
QUESTION: A student drops a 3 mm radius glass marble (\(\rho = 2500\) kg/m³) into a tall jar of honey (\(\eta = 10\) Pa·s, \(\sigma = 1400\) kg/m³). They measure the time to fall 20 cm after the marble reaches terminal velocity and get 4.2 s. They then drop the same marble into water (\(\eta = 0.001\) Pa·s, \(\sigma = 1000\) kg/m³) in an identical jar and measure 0.15 s for the same 20 cm. The student concludes: "Honey is 10,000 times more viscous than water, so terminal velocity should be 10,000 times smaller. But my measured ratio is only \(0.15/4.2 \approx 0.036\), which is about 1/28, not 1/10,000. Stokes' Law must be wrong." Identify the flaw in the student's reasoning and calculate the expected terminal velocity ratio using the correct formula.
COMPETENCY: Interpreting physical situations using formulas and identifying hidden assumptions
STEPS:
- Step 1: Recognize the student assumed \(v_t \propto 1/\eta\) only, ignoring the \((\rho - \sigma)\) factor and the fact that water's low viscosity makes Re >> 1, invalidating Stokes' Law.
- Step 2: Write the full terminal velocity formula: \(v_t = \frac{2a^2(\rho - \sigma)g}{9\eta}\).
- Step 3: Compute theoretical ratio if both obeyed Stokes' Law: \(\frac{v_{t,water}}{v_{t,honey}} = \frac{\eta_{honey}}{\eta_{water}} \times \frac{\rho - \sigma_{water}}{\rho - \sigma_{honey}} = \frac{10}{0.001} \times \frac{2500 - 1000}{2500 - 1400} = 10,000 \times \frac{1500}{1100} = 13,636\).
- Step 4: Check Re for water case: \(v_{t,Stokes} = \frac{2(0.003)^2(1500)(9.8)}{9(0.001)} = 29.4\) m/s. Re = \(\frac{1000 \times 29.4 \times 0.003}{0.001} = 88,200 \gg 1\). Stokes' Law invalid in water!
- Step 5: In water, drag is quadratic: \(F_d = \frac{1}{2}C_d \rho_{water} A v^2\). Terminal velocity is much lower than Stokes' prediction, so measured ratio is larger (less difference).
- Step 6: The student's error: applying Stokes' Law outside its validity regime (Re < 1) for water.
ANSWER: The flaw is assuming Stokes' Law applies in water. For the marble in water, Re ≈ 88,000 >> 1, so drag is quadratic, not linear. Stokes' Law predicts \(v_t \approx 29.4\) m/s in water, but actual \(v_t \approx 1.33\) m/s (from 0.20/0.15). The measured ratio ~28 is consistent with turbulent drag in water vs laminar drag in honey.
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A cloud physics researcher studies raindrop formation. They model a raindrop growing by condensation while falling at terminal velocity. The drop radius increases at rate \(\frac{da}{dt} = k\) (constant). Initially \(a(0) = a_0\). The drop density \(\rho = 1000\) kg/m³, air density \(\sigma = 1.2\) kg/m³, air viscosity \(\eta = 1.8 \times 10^{-5}\) Pa·s. (a) Derive the differential equation for velocity \(v(t)\) assuming Stokes' Law holds at all times (quasi-steady approximation). (b) Solve for \(v(t)\) given \(v(0) = v_{t0} = \frac{2a_0^2(\rho-\sigma)g}{9\eta}\). (c) For \(a_0 = 0.1\) mm, \(k = 1\) μm/s, find the time when Re = 1 (Stokes' Law breaks down).
COMPETENCY: Mathematical modeling of physical systems and predicting regime transitions
STEPS:
- Step 1: Write force balance at any instant: \(m\frac{dv}{dt} = mg - \frac{4}{3}\pi a^3\sigma g - 6\pi\eta a v\). Mass \(m = \frac{4}{3}\pi a^3\rho\). Radius \(a(t) = a_0 + kt\).
- Step 2: Quasi-steady approximation: assume acceleration term \(m\frac{dv}{dt}\) is negligible compared to drag (valid if radius changes slowly). Then \(v(t) \approx v_t(t) = \frac{2a(t)^2(\rho-\sigma)g}{9\eta}\).
- Step 3: Substitute \(a(t) = a_0 + kt\): \(v(t) = \frac{2(\rho-\sigma)g}{9\eta}(a_0 + kt)^2\). This is the solution under quasi-steady assumption.
- Step 4: Check when Re = 1: Re = \(\frac{\sigma v a}{\eta} = \frac{\sigma}{\eta} \cdot \frac{2(\rho-\sigma)g}{9\eta} a^3 = \frac{2\sigma(\rho-\sigma)g}{9\eta^2} a^3\). Set = 1.
- Step 5: Solve for \(a_{crit}\): \(a_{crit}^3 = \frac{9\eta^2}{2\sigma(\rho-\sigma)g}\). Plug values: \(\eta = 1.8\times10^{-5}\), \(\sigma = 1.2\), \(\rho-\sigma \approx 998.8\), \(g = 9.8\). \(a_{crit}^3 = \frac{9(3.24\times10^{-10})}{2(1.2)(998.8)(9.8)} = \frac{2.916\times10^{-9}}{23530} = 1.24\times10^{-13}\). \(a_{crit} = 4.98\times10^{-5}\) m = 0.05 mm.
- Step 6: Wait — \(a_0 = 0.1\) mm > \(a_{crit}\)! So even initially Re > 1. Recompute: For \(a_0 = 0.1\) mm = \(10^{-4}\) m, \(v_{t0} = \frac{2(10^{-4})^2(998.8)(9.8)}{9(1.8\times10^{-5})} = 1.21\) m/s. Re₀ = \(\frac{1.2 \times 1.21 \times 10^{-4}}{1.8\times10^{-5}} = 8.07 > 1\). Stokes' Law never valid for this drop!
- Step 7: The model assumption fails from the start. Real raindrops > 0.1 mm are in turbulent regime.
ANSWER: (a) \(m\frac{dv}{dt} = \frac{4}{3}\pi\rho(a_0+kt)^3 g - \frac{4}{3}\pi\sigma(a_0+kt)^3 g - 6\pi\eta(a_0+kt)v\). (b) Quasi-steady: \(v(t) = \frac{2(\rho-\sigma)g}{9\eta}(a_0+kt)^2\). (c) For \(a_0 = 0.1\) mm, Re₀ ≈ 8 > 1, so Stokes' Law is already invalid at t=0. The critical radius for Re=1 is ~0.05 mm.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Watch a raindrop falling on a window pane during monsoon — it doesn't ______ indefinitely but reaches a steady speed.

## DIAGNOSTIC_ANSWER_7
accelerate

**A wrong answer ("fall" or "descend") reveals the student has swapped the walkthrough's verb - the raindrop does not accelerate indefinitely.** Accelerate is the walkthrough's own verb, and the verb is what the blank grades. Recall the steady speed that follows before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can calculate terminal velocity for a sphere falling through a viscous fluid given radius, densities, and viscosity; can derive the expression for terminal velocity by equating viscous drag, buoyant force, and weight; and can identify the conditions under which Stokes' Law is valid (laminar flow, small Reynolds number.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Watch a raindrop falling on a window pane during monsoon — it doesn't accelerate ______ but reaches a steady speed.

## DIAGNOSTIC_ANSWER_9
indefinitely

**A wrong answer ("slowly" or "slightly") reveals the student has paraphrased the walkthrough's adverb - the acceleration stops indefinitely, not for a while.** Indefinitely is the walkthrough's own adverb, and the adverb is what the blank grades. Recall the reached steady speed before filling, and give the adverb exactly.
