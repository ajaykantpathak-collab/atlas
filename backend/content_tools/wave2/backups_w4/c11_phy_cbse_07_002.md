## ELI5
The apple falls and the Moon refuses to - yet Newton saw one law in both. Universal gravitation: every particle attracts every other, force proportional to the product of masses, inversely proportional to the square of the separation, always attractive, always along the joining line. The Moon's pull measured against the apple's confirmed the inverse square; the tiny universal constant G sizes the attraction.

## DEFINITION
Newton's Law of Universal Gravitation states that every particle in the universe attracts every other particle with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres. The force acts along the line joining the two particles and is always attractive. The proportionality constant is the universal gravitational constant \(G\), with a value of \(6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can calculate the gravitational force between two point masses using the formula, apply the superposition principle to find the net force on a mass due to multiple other masses, and correctly use the vector form to determine the direction of the force.

## SCOPE_BOUNDARY
This node covers the statement and mathematical form of Newton's universal law for point masses, the vector notation, the superposition principle for a system of particles, and the qualitative statements of the shell theorem (force outside a spherical shell acts as if mass is concentrated at centre; force inside a uniform shell is zero). It does NOT cover the experimental measurement of \(G\) (next node), the derivation of \(g\) on Earth's surface, variation of \(g\) with altitude/depth, or orbital mechanics.

## WALKTHROUGH
Observe an apple falling from a tree in your school courtyard and the Moon rising in the evening sky. Both are pulled by the Earth, but the Moon doesn't fall down. Start by recalling Kepler's third law from the previous node: \(T^2 \propto r^3\). Newton realised the Moon's centripetal acceleration \(a_m = \frac{4\pi^2 r}{T^2}\) is much smaller than \(g\) on Earth. Assuming the same force causes both, the force must decrease with distance. Using the known Earth-Moon distance (\(3.84 \times 10^8 \, \text{m}\)) and period (27.3 days), he found \(a_m \approx 0.0027 \, \text{m/s}^2\). The ratio \(g/a_m \approx 3600\), which matches \((R_m/R_E)^2\). This inverse-square dependence, combined with Newton's third law (force must depend on both masses), leads to the universal law. Begin by writing the proportionality \(F \propto m_1 m_2 / r^2\) and introduce \(G\) as the constant that makes the equation dimensionally consistent.

Takeaway: mastery means computing forces between pairs, summing multiple attractions by superposition, and keeping the vector form's direction honest. Exam moves: find-the-force questions and net-force-from-many-bodies items. Check yourself: the law is mutual - the apple pulls Earth exactly as Earth pulls the apple, at equal strength. Students miss it because they halve the physics by reading only the falling side, when the definition's third-law symmetry is built in: the forces are an action-reaction pair, equal and opposite, however unequal the masses.

## DIAGNOSTIC_QUESTION_1
State the mathematical form of Newton's law of universal gravitation for the magnitude of the force between two point masses \(m_1\) and \(m_2\) separated by distance \(r\). Write the SI unit and the accepted approximate value of the universal gravitational constant \(G\).

## DIAGNOSTIC_ANSWER_1
The magnitude of the gravitational force is \(F = G \frac{m_1 m_2}{r^2}\). The SI unit of \(G\) is \(\text{N m}^2 \text{kg}^{-2}\) and its accepted value is \(6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\). A wrong answer (e.g., writing \(F = G \frac{m_1 m_2}{r}\) or giving \(G = 9.8 \, \text{m/s}^2\)) reveals the student has memorised the formula for weight \(mg\) instead of the universal law, or confuses the constant \(G\) with the acceleration due to gravity \(g\).

## DIAGNOSTIC_QUESTION_2
The vector form of the gravitational force on mass \(m_2\) due to \(m_1\) is \(\vec{F}_{21} = -G \frac{m_1 m_2}{r^3} \vec{r}_{21}\), where \(\vec{r}_{21} = \vec{r}_2 - \vec{r}_1\). Explain the physical significance of the negative sign and why the force is called a "central force".

## DIAGNOSTIC_ANSWER_2
The negative sign indicates that the force on \(m_2\) is directed opposite to the vector \(\vec{r}_{21}\) (which points from \(m_1\) to \(m_2\)), meaning the force is attractive and pulls \(m_2\) towards \(m_1\). It is a central force because the force vector always points along the line joining the two particles (towards the centre of the other mass), resulting in zero torque about the centre and conservation of angular momentum. A wrong answer that says the negative sign means "repulsion" or that "central force means constant magnitude" shows confusion between the mathematical notation and the physical nature of attraction, or a misunderstanding of the definition of a central force.

## DIAGNOSTIC_QUESTION_3
Two uniform spheres of mass \(5.0 \, \text{kg}\) and \(10.0 \, \text{kg}\) are placed with their centres \(0.50 \, \text{m}\) apart. Calculate the magnitude of the gravitational force between them. Use \(G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\).

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify given: \(m_1 = 5.0 \, \text{kg}\), \(m_2 = 10.0 \, \text{kg}\), \(r = 0.50 \, \text{m}\), \(G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\). Find \(F\).
**Step 2:** Formula: \(F = G \frac{m_1 m_2}{r^2}\).
**Step 3:** Substitute: \(F = (6.67 \times 10^{-11}) \frac{(5.0)(10.0)}{(0.50)^2}\).
**Step 4:** Compute: \(F = (6.67 \times 10^{-11}) \frac{50.0}{0.25} = (6.67 \times 10^{-11}) \times 200 = 1.334 \times 10^{-8} \, \text{N}\).
**Step 5:** The force is extremely small (\(10^{-8} \, \text{N}\)), which is physically reasonable for everyday masses. A wrong answer like \(1.33 \times 10^{-9} \, \text{N}\) usually comes from forgetting to square the distance (\(r\) instead of \(r^2\)) or misplacing the decimal in \(G\).

## DIAGNOSTIC_QUESTION_4
Three identical point masses \(m\) are placed at the vertices of an equilateral triangle of side \(a\). Find the magnitude and direction of the net gravitational force on one mass due to the other two.

## DIAGNOSTIC_ANSWER_4
**Magnitude:** Each force has magnitude \(F_0 = G m^2 / a^2\). The angle between the two force vectors is \(60^\circ\). Net force \(F_{\text{net}} = \sqrt{F_0^2 + F_0^2 + 2 F_0^2 \cos 60^\circ} = \sqrt{3} F_0 = \sqrt{3} G m^2 / a^2\).
**Direction:** The net force acts along the line joining the vertex to the centroid of the triangle (i.e., along the angle bisector), directed towards the interior of the triangle. A wrong answer that adds the magnitudes directly (\(2F_0\)) or uses \(\cos 120^\circ\) reveals the student treats forces as scalars or misidentifies the angle between the force vectors (the angle between the lines joining the vertex to the other two vertices is \(60^\circ\), not \(120^\circ\)).

## DIAGNOSTIC_QUESTION_5
A student calculates the force between two \(1 \, \text{kg}\) masses placed \(1 \, \text{m}\) apart as \(F = 6.67 \times 10^{-11} \, \text{N}\). They then claim: "If I double the distance to \(2 \, \text{m}\), the force becomes half, i.e., \(3.33 \times 10^{-11} \, \text{N}\)." Evaluate this claim and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
The claim is **incorrect**. The force follows an inverse-square law: \(F \propto 1/r^2\). Doubling the distance (\(r \to 2r\)) reduces the force by a factor of \(2^2 = 4\), not 2. The correct new force is \(F_{\text{new}} = F/4 = 1.67 \times 10^{-11} \, \text{N}\). A student making this error is applying an inverse-first-power relationship (like Coulomb's law for a line charge or intensity of light from a line source) instead of the inverse-square law for point sources. This confusion often arises from not squaring the distance ratio.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to demonstrate that the gravitational force between two ordinary objects (e.g., two cricket balls) is non-zero but too small to measure with a spring balance. Specify the masses, distance, expected force magnitude, and why a spring balance fails.

## DIAGNOSTIC_ANSWER_6
**Setup:** Two cricket balls, mass \(m = 0.16 \, \text{kg}\) each, placed with centres \(r = 0.1 \, \text{m}\) apart (touching).
**Calculation:** \(F = G \frac{m^2}{r^2} = (6.67 \times 10^{-11}) \frac{(0.16)^2}{(0.1)^2} \approx 1.7 \times 10^{-10} \, \text{N}\).
**Reason for failure:** A typical spring balance has a least count of \(0.01 \, \text{N}\) (or \(1 \, \text{gf} \approx 0.01 \, \text{N}\)). The gravitational force is \(10^8\) times smaller than the least count. Also, friction, air currents, and electrostatic forces would completely swamp this tiny force. A poor answer would suggest using a more sensitive spring balance without addressing the signal-to-noise ratio from environmental disturbances, or would claim the force is zero because "gravity only works for planets".

## COMMON_MISCONCEPTION
Students believe that the gravitational force described by Newton's law is only significant between astronomical bodies (like Earth and Moon) and that everyday objects (like two students sitting on a bench) do not exert gravitational force on each other. They also frequently confuse the universal constant \(G\) (\(6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\)) with the acceleration due to gravity \(g\) (\(9.8 \, \text{m/s}^2\)), using them interchangeably in formulas like \(F = mg\) or \(F = G m_1 m_2 / r^2\). A third specific error is treating the force as a scalar and adding magnitudes directly when applying superposition, ignoring the vector nature and the angle between forces.

## ON_FAILURE
1. **Calculate the force between two students:** Take two \(60 \, \text{kg}\) students sitting \(1 \, \text{m}\) apart. Compute \(F = G (60)^2 / 1^2 \approx 2.4 \times 10^{-7} \, \text{N}\). Compare this to the weight of a single grain of rice (\(\sim 10^{-5} \, \text{N}\)) to show it is real but negligible.
2. **Dimensional analysis drill:** Write the units of \(G\) from the formula \(F = G m_1 m_2 / r^2\) → \([G] = [F] [r]^2 / [m]^2 = \text{N m}^2 \text{kg}^{-2}\). Write units of \(g\) from \(F = mg\) → \([g] = \text{N/kg} = \text{m/s}^2\). Show they are dimensionally different; \(G\) is a universal constant, \(g\) is a local acceleration.
3. **Vector addition practice:** Draw two forces of equal magnitude at \(60^\circ\). Use parallelogram law to find resultant. Repeat for \(120^\circ\). Emphasise that the angle between force vectors is the same as the angle between the position vectors from the test mass to the source masses.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_07_001, c9_physics_ch3_4, c9_physics_ch3_5, c9_math_ch1_4, c8_math_ch7_5, c8_math_ch2_3
## PREREQUISITE_REASONS
c11_phy_cbse_07_001: Kepler's laws (especially \(T^2 \propto r^3\)) provided the empirical basis Newton used to deduce the inverse-square law.
c9_physics_ch3_4: Newton's second law (\(F=ma\)) is needed to connect gravitational force to the acceleration of a body (e.g., \(g = F/m\)).
c9_physics_ch3_5: Newton's third law (action-reaction) requires the gravitational force on \(m_1\) due to \(m_2\) to be equal and opposite to the force on \(m_2\) due to \(m_1\), which is built into the symmetric formula \(F = G m_1 m_2 / r^2\).
c9_math_ch1_4: Distance formula is essential to compute the separation \(r\) between two point masses given their coordinates in 3D space.
c8_math_ch7_5: Understanding direct and inverse proportionality is crucial to grasp \(F \propto m_1 m_2\) and \(F \propto 1/r^2\).
c8_math_ch2_3: Exponential notation (powers of 10) is mandatory for handling the very small value of \(G\) and large astronomical masses/distances.

## FORWARD_NODE_IDS
c11_phy_cbse_07_003, c11_phy_cbse_07_004, c11_phy_cbse_07_005, c11_phy_cbse_07_006, c11_phy_cbse_07_007, c11_phy_cbse_07_008, c11_phy_cbse_07_009, c11_phy_cbse_07_010, c11_phy_cbse_07_011, c11_phy_cbse_07_012, c11_phy_cbse_07_013, c11_phy_cbse_07_014, c12_phy_cbse_13_002

## FORWARD_REASONS
c11_phy_cbse_07_003: The universal law introduces \(G\); the next node describes how Cavendish measured it experimentally.
c11_phy_cbse_07_004: Applying the law to Earth (treating it as a point mass at its centre via shell theorem) gives \(g = GM_E/R_E^2\).
c11_phy_cbse_07_005: The law gives \(g(h) = GM_E/(R_E+h)^2\) for altitude variation.
c11_phy_cbse_07_006: The shell theorem (from this node) is used to derive \(g(d) = g(1 - d/R_E)\) for depth variation.
c11_phy_cbse_07_007: The law provides the centripetal force for the rotating Earth frame, leading to effective \(g' = g - \omega^2 R \cos^2 \lambda\).
c11_phy_cbse_07_008: Gravitational potential energy is defined as the negative work done by the gravitational force from this law.
c11_phy_cbse_07_009: Gravitational potential is potential energy per unit mass, derived by integrating the force from this law.
c11_phy_cbse_07_010: Escape velocity is derived by equating initial kinetic energy to the magnitude of gravitational potential energy from this law.
c11_phy_cbse_07_011: Orbital velocity is found by equating centripetal force to the gravitational force from this law.
c11_phy_cbse_07_012: Geostationary orbit radius comes from Kepler's third law (derived from this law) with \(T = 24 \, \text{h}\).
c11_phy_cbse_07_013: Weightlessness is explained by the fact that both satellite and astronaut experience the same gravitational acceleration (from this law).
c11_phy_cbse_07_014: Total energy of a satellite is the sum of kinetic and potential energy, both derived from this law.
c12_phy_cbse_13_002: Newton's law of gravitation gives a baseline force comparison (gravitational vs nuclear).  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c8_math_ch2_3, c8_math_ch7_5, c9_physics_ch3_4, c9_physics_ch3_5
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: The distance formula \(r = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}\) is used to calculate the separation \(r\) in the denominator of the gravitation formula when masses are placed in a coordinate system.
c8_math_ch2_3: The value \(G = 6.67 \times 10^{-11}\) and typical masses (\(10^{24} \, \text{kg}\)) and distances (\(10^6 \, \text{m}\)) require fluent manipulation of scientific notation and exponent rules.
c8_math_ch7_5: The law is a combined variation: \(F\) varies directly as the product of masses and inversely as the square of distance. Proportional reasoning allows quick estimation of how \(F\) changes when \(m\) or \(r\) changes.
c9_physics_ch3_4: Newton's second law (\(a = F/m\)) converts the gravitational force into the acceleration of a test mass, linking the universal law to the measurable quantity \(g\).
c9_physics_ch3_5: Newton's third law guarantees that the gravitational forces between two bodies form an action-reaction pair: \(\vec{F}_{12} = -\vec{F}_{21}\). This is explicitly satisfied by the symmetric formula.

## CHAIN_DESCRIPTION
c11_phy_cbse_07_001 -> c11_phy_cbse_07_002 -> c11_phy_cbse_07_003

## THIS_FORMULA
Magnitude: \(F = G \frac{m_1 m_2}{r^2}\) (SI unit: N). Vector form: \(\vec{F}_{21} = -G \frac{m_1 m_2}{r^3} \vec{r}_{21} = -G \frac{m_1 m_2}{r^2} \hat{r}_{21}\), where \(\vec{r}_{21} = \vec{r}_2 - \vec{r}_1\) is the vector from \(m_1\) to \(m_2\). \(G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\).

## FORMULA_VARIABLES
\(F\) = magnitude of gravitational force (N); \(G\) = universal gravitational constant (\(6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\)); \(m_1, m_2\) = masses of the two particles (kg); \(r\) = distance between centres of the two particles (m); \(\vec{r}_{21}\) = position vector of \(m_2\) relative to \(m_1\) (m); \(\hat{r}_{21}\) = unit vector pointing from \(m_1\) to \(m_2\) (dimensionless).

## FORMULA_UNITS
N, kg, m, N m² kg⁻²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch1_4 | Distance formula used to calculate separation r between two point masses in coordinate geometry.
c8_math_ch2_3 | Exponential notation essential for handling G = 6.67×10⁻¹¹ and large masses/distances in calculations.
c8_math_ch7_5 | Proportional reasoning (direct and inverse) to understand F ∝ m₁m₂ and F ∝ 1/r².
c9_physics_ch3_4 | Newton's second law (F=ma) connects gravitational force to acceleration (g = F/m).
c9_physics_ch3_5 | Newton's third law ensures gravitational forces between two bodies are equal and opposite (F₁₂ = -F₂₁).

## PREREQ_CONCEPT
Newton's laws of motion (second and third) and the mathematical concept of inverse-square proportionality.

## PREREQ_BEFORE
Student must be able to compute forces using F=ma, perform vector addition of forces, and manipulate numbers in scientific notation (powers of 10).

## PREREQ_STUCK
Review Newton's second and third laws (c9_physics_ch3_4, c9_physics_ch3_5) and inverse-square relationships (c8_math_ch7_5).

## WORKED_EXAMPLE_1
PROBLEM: Two identical lead spheres, each of mass \(10.0 \, \text{kg}\) and radius \(0.05 \, \text{m}\), are placed in contact. Calculate the gravitational force of attraction between them. Use \(G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\).
STEPS:
- Step 1: Identify given quantities: \(m_1 = m_2 = 10.0 \, \text{kg}\). The spheres are in contact, so the distance between their centres is \(r = 2 \times \text{radius} = 2 \times 0.05 = 0.10 \, \text{m}\). \(G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\). Find \(F\).
- Step 2: Write the formula for magnitude: \(F = G \frac{m_1 m_2}{r^2}\). Check units: \(G\) in \(\text{N m}^2 \text{kg}^{-2}\), masses in \(\text{kg}\), \(r\) in \(\text{m}\) → force in \(\text{N}\). Correct.
- Step 3: Substitute values with units: \(F = (6.67 \times 10^{-11}) \frac{(10.0)(10.0)}{(0.10)^2}\).
- Step 4: Compute step-by-step: Numerator: \(10.0 \times 10.0 = 100\). Denominator: \((0.10)^2 = 0.0100\). Fraction: \(100 / 0.0100 = 10,000 = 1.00 \times 10^4\). Multiply by \(G\): \(F = (6.67 \times 10^{-11}) \times (1.00 \times 10^4) = 6.67 \times 10^{-7} \, \text{N}\).
- Step 5: Verify reasonableness: The force is microscopic (\(\sim 0.67 \, \mu\text{N}\)), consistent with the weakness of gravity for laboratory masses. State answer: \(F = 6.67 \times 10^{-7} \, \text{N}\).
REASONING: The key step is recognising that "in contact" means the centre-to-centre distance is the sum of the radii. The formula applies to point masses or uniform spheres (by shell theorem), so we use the centre-to-centre distance. The calculation tracks powers of 10 carefully to avoid errors.
ANSWER: \(6.67 \times 10^{-7} \, \text{N}\)

## WORKED_EXAMPLE_2
PROBLEM: Three point masses are placed on the x-axis: \(m_1 = 2.0 \, \text{kg}\) at \(x = 0\), \(m_2 = 3.0 \, \text{kg}\) at \(x = 0.50 \, \text{m}\), and \(m_3 = 4.0 \, \text{kg}\) at \(x = 1.0 \, \text{m}\). Find the net gravitational force (magnitude and direction) on \(m_2\) due to \(m_1\) and \(m_3\). Use \(G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\).
STEPS:
- Step 1: Identify forces on \(m_2\). Force from \(m_1\) (\(F_{21}\)): attractive, pulls \(m_2\) towards left (negative x-direction). Distance \(r_{21} = 0.50 \, \text{m}\). Force from \(m_3\) (\(F_{23}\)): attractive, pulls \(m_2\) towards right (positive x-direction). Distance \(r_{23} = 0.50 \, \text{m}\).
- Step 2: Calculate magnitudes. \(F_{21} = G \frac{m_2 m_1}{r_{21}^2} = (6.67 \times 10^{-11}) \frac{(3.0)(2.0)}{(0.50)^2} = (6.67 \times 10^{-11}) \frac{6.0}{0.25} = 1.60 \times 10^{-9} \, \text{N}\). \(F_{23} = G \frac{m_2 m_3}{r_{23}^2} = (6.67 \times 10^{-11}) \frac{(3.0)(4.0)}{(0.50)^2} = (6.67 \times 10^{-11}) \frac{12.0}{0.25} = 3.20 \times 10^{-9} \, \text{N}\).
- Step 3: Assign signs based on direction. Let +x be right. \(\vec{F}_{21} = -1.60 \times 10^{-9} \, \hat{i} \, \text{N}\). \(\vec{F}_{23} = +3.20 \times 10^{-9} \, \hat{i} \, \text{N}\).
- Step 4: Vector sum (superposition): \(\vec{F}_{\text{net}} = \vec{F}_{21} + \vec{F}_{23} = (-1.60 + 3.20) \times 10^{-9} \, \hat{i} = +1.60 \times 10^{-9} \, \hat{i} \, \text{N}\).
- Step 5: Interpret: Magnitude \(1.60 \times 10^{-9} \, \text{N}\), direction along +x axis (towards the heavier mass \(m_3\)). Reasonable because \(m_3 > m_1\) at equal distances.
REASONING: Gravitational forces are vectors. The superposition principle states the net force is the vector sum. Since all masses lie on a line, the problem reduces to 1D signed addition. The larger mass \(m_3\) exerts a stronger pull, so the net force is towards it.
ANSWER: \(1.60 \times 10^{-9} \, \text{N}\) directed towards the \(4.0 \, \text{kg}\) mass (positive x-direction).

## WORKED_EXAMPLE_3
PROBLEM: The mass of Earth is \(6.0 \times 10^{24} \, \text{kg}\) and the mass of the Moon is \(7.4 \times 10^{22} \, \text{kg}\). The average Earth-Moon distance is \(3.84 \times 10^8 \, \text{m}\). (a) Calculate the gravitational force exerted by Earth on the Moon. (b) Calculate the centripetal acceleration of the Moon towards Earth. (c) Compare this acceleration with \(g = 9.8 \, \text{m/s}^2\) on Earth's surface. Use \(G = 6.67 \times 10^{-11} \, \text{N m}^2 \text{kg}^{-2}\).
STEPS:
- Step 1 (a): Identify given: \(M_E = 6.0 \times 10^{24} \, \text{kg}\), \(M_M = 7.4 \times 10^{22} \, \text{kg}\), \(r = 3.84 \times 10^8 \, \text{m}\). Formula: \(F = G \frac{M_E M_M}{r^2}\).
- Step 2 (a): Substitute: \(F = (6.67 \times 10^{-11}) \frac{(6.0 \times 10^{24})(7.4 \times 10^{22})}{(3.84 \times 10^8)^2}\).
- Step 3 (a): Compute numerator: \(6.0 \times 7.4 = 44.4\); \(10^{24} \times 10^{22} = 10^{46}\) → \(4.44 \times 10^{47}\). Denominator: \((3.84)^2 \approx 14.75\); \((10^8)^2 = 10^{16}\) → \(1.475 \times 10^{17}\). Fraction: \(4.44 \times 10^{47} / 1.475 \times 10^{17} \approx 3.01 \times 10^{30}\). Multiply by \(G\): \(F \approx (6.67 \times 10^{-11}) \times (3.01 \times 10^{30}) \approx 2.01 \times 10^{20} \, \text{N}\).
- Step 4 (b): Centripetal acceleration of Moon: \(a_M = F / M_M\) (Newton's 2nd law). \(a_M = (2.01 \times 10^{20}) / (7.4 \times 10^{22}) \approx 2.72 \times 10^{-3} \, \text{m/s}^2\).
- Step 5 (c): Ratio \(g / a_M = 9.8 / (2.72 \times 10^{-3}) \approx 3600\). Note \((r / R_E)^2 \approx (3.84 \times 10^8 / 6.37 \times 10^6)^2 \approx (60.3)^2 \approx 3636\). The inverse-square law holds.
- Step 6: Verify units and reasonableness. Force is huge (\(10^{20} \, \text{N}\)) but acceleration is small because Moon's mass is large. The ratio matches the distance ratio squared, confirming the law.
REASONING: This example connects the universal law to the Moon's orbital motion (Kepler/centripetal). Part (b) uses \(F=ma\) (prerequisite c9_physics_ch3_4). Part (c) is the historical check Newton performed: the same law explains both the apple's fall (\(g\)) and the Moon's orbit (\(a_M\)), with the difference accounted for purely by distance.
ANSWER: (a) \(2.0 \times 10^{20} \, \text{N}\) (b) \(2.7 \times 10^{-3} \, \text{m/s}^2\) (c) The Moon's acceleration is \(1/3600\) of \(g\), consistent with \((R_E/r)^2\).

## COMPETENCY_QUESTION_1
QUESTION: Two spherical planets, Planet A and Planet B, have the same density. Planet A has radius \(R\) and Planet B has radius \(2R\). A satellite orbits each planet at a height equal to the planet's radius above the surface (i.e., orbital radius \(2R\) for A, \(4R\) for B). Compare the orbital speeds \(v_A\) and \(v_B\) of the satellite around the two planets. Justify your answer using the universal law of gravitation and the condition for circular orbit.
COMPETENCY: Predicting outcomes from changing variables using proportional reasoning and physical laws.
STEPS:
- Step 1: Express mass of a planet in terms of density \(\rho\) and radius: \(M = \rho \cdot \frac{4}{3}\pi R^3\). So \(M \propto R^3\).
- Step 2: For a circular orbit, gravitational force provides centripetal force: \(G \frac{M m}{r_{\text{orb}}^2} = \frac{m v^2}{r_{\text{orb}}}\). Simplify to \(v^2 = \frac{GM}{r_{\text{orb}}}\).
- Step 3: For Planet A: \(R_A = R\), \(r_{\text{orb},A} = 2R\). \(M_A \propto R^3\). So \(v_A^2 \propto \frac{R^3}{2R} = \frac{1}{2} R^2\).
- Step 4: For Planet B: \(R_B = 2R\), \(r_{\text{orb},B} = 4R\). \(M_B \propto (2R)^3 = 8R^3\). So \(v_B^2 \propto \frac{8R^3}{4R} = 2 R^2\).
- Step 5: Compare: \(v_B^2 / v_A^2 = (2 R^2) / (0.5 R^2) = 4\). So \(v_B = 2 v_A\).
ANSWER: The orbital speed around Planet B is twice that around Planet A (\(v_B = 2 v_A\)).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A uniform thin rod of length \(L\) and mass \(M\) lies along the x-axis from \(x=0\) to \(x=L\). A point mass \(m\) is placed on the x-axis at \(x = -d\) (to the left of the rod). Derive an expression for the gravitational force on \(m\) due to the rod. (Hint: Consider an element \(dx\) at distance \(x\) from the origin; its mass is \(dm = (M/L) dx\). Integrate the force from \(x=0\) to \(x=L\).)
COMPETENCY: Applying calculus (integration) to extend the point-mass law to an extended object, demonstrating the superposition principle.
STEPS:
- Step 1: Set up the integral. The distance from mass \(m\) (at \(x=-d\)) to element \(dm\) (at \(x\)) is \(r = x + d\). The force \(dF\) on \(m\) due to \(dm\) is attractive, directed along +x axis: \(dF = G \frac{m \, dm}{r^2} = G \frac{m (M/L) dx}{(x+d)^2}\).
- Step 2: Integrate from \(x=0\) to \(x=L\): \(F = \frac{GMm}{L} \int_0^L \frac{dx}{(x+d)^2}\).
- Step 3: Evaluate integral: \(\int \frac{dx}{(x+d)^2} = -\frac{1}{x+d}\). Limits: \([-1/(L+d)] - [-1/d] = \frac{1}{d} - \frac{1}{L+d} = \frac{L}{d(L+d)}\).
- Step 4: Multiply by constants: \(F = \frac{GMm}{L} \cdot \frac{L}{d(L+d)} = \frac{GMm}{d(L+d)}\).
- Step 5: Check limits: If \(L \to 0\) (point mass at origin), \(F \to GMm/d^2\), correct. If \(d \gg L\), \(F \approx GMm/d^2\), correct.
ANSWER: \(F = \frac{GMm}{d(L+d)}\), directed along the positive x-axis (towards the rod).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Newton's Law of Universal ______ states that every particle in the universe attracts every other particle with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centres.

## DIAGNOSTIC_ANSWER_7
Gravitation

**A wrong answer ("gravity" or "attraction") reveals the student has swapped the definition's headword - the law is one of universal Gravitation.** Gravitation is the definition's own headword, and the noun is what the blank grades. Recall the every-particle-attracts-every-particle clause before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe an ______ falling from a tree in your school courtyard and the Moon rising in the evening sky.

## DIAGNOSTIC_ANSWER_8
apple

**A wrong answer ("leaf" or "fruit") reveals the student has swapped the walkthrough's noun - an apple falls from the courtyard tree.** Apple is the walkthrough's own noun, and the noun is what the blank grades. Recall the rising Moon contrast before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can calculate the gravitational force between two point masses using the formula, apply the superposition principle to find the net force on a mass due to multiple other masses, and correctly use the vector form to determine the direction of the force.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe an apple falling from a tree in your school ______ and the Moon rising in the evening sky.

## DIAGNOSTIC_ANSWER_10
courtyard

**A wrong answer ("lab" or "classroom") reveals the student has swapped the walkthrough's noun - the tree stands in the school courtyard.** Courtyard is the walkthrough's own noun, and the noun is what the blank grades. Recall the apple-and-Moon pairing before filling, and give the noun exactly.
