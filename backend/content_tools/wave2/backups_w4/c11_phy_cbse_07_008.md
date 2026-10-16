## ELI5
The textbook reaches the shelf and banks mgh - but aim for the space station and that arithmetic fails, because g thins with distance. The general account: potential energy is minus G times the masses over their separation, assembled from infinity, zero chosen there. The minus is the binding: energy must be paid in to pull the pair apart, and the negative account is what holds every orbit together.

## DEFINITION
Gravitational potential energy of a system of two point masses is the work done by an external agent in assembling them from infinite separation to their current separation, with the zero of potential energy conventionally chosen at infinite separation. It is a scalar quantity measured in joules (J) and is always negative for a bound system, indicating that work must be done to separate the masses to infinity.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to calculate the gravitational potential energy for a system of two or more point masses using the formula \(U = -\frac{G m_1 m_2}{r}\), correctly apply the sign convention (zero at infinity), and distinguish between the exact formula for arbitrary separations and the approximate \(mgh\) formula valid only near Earth's surface where \(g\) is constant.

## SCOPE_BOUNDARY
This node covers the definition and calculation of gravitational potential energy for discrete point masses, the principle of superposition for multi-particle systems, the conventional choice of zero at infinity, and the derivation of the near-Earth approximation \(U = mgh\). It does not cover continuous mass distributions (requiring calculus), general relativistic corrections, or potential energy in non-inertial frames.

## WALKTHROUGH
Imagine lifting a 1 kg textbook from the classroom floor to a shelf 2 m high. You do work against gravity, storing energy in the book-Earth system. Near Earth's surface, we approximate this as \(mgh\) because gravity is nearly constant. But what if we lift the book to the height of the International Space Station (400 km)? Gravity weakens significantly, so \(mgh\) fails. We must instead calculate the work done against the variable force \(F = \frac{GM_Em}{r^2}\) by integrating from Earth's surface to the final distance. This integration yields the exact formula \(U = -\frac{GM_Em}{r}\), which reduces to \(mgh\) when \(h \ll R_E\). The negative sign appears because we define zero energy at infinite separation, making bound systems have negative energy.

Takeaway: mastery means computing U for pairs and for multi-body systems pair by pair, and knowing when mgh is a faithful shortcut. Exam moves: find-the-potential-energy questions and when-does-mgh-fail items. Check yourself: the shelf height borrows the constant-g licence - it is the exact formula's local edition, not a rival. Students miss it because the negative sign feels like a bookkeeping accident, when the definition's zero-at-infinity makes it the whole meaning: negative energy is bound energy, and the depth below zero is precisely the escape bill.

## DIAGNOSTIC_QUESTION_1
State the exact formula for the gravitational potential energy of two point masses \(m_1\) and \(m_2\) separated by distance \(r\), including the sign convention. What is its SI unit?

## DIAGNOSTIC_ANSWER_1
The formula is \(U = -\frac{G m_1 m_2}{r}\) with the zero of potential energy at \(r \to \infty\). The SI unit is joule (J). A wrong answer (e.g., missing the negative sign, using \(U = mgh\), or stating the unit as newton) reveals the student has not internalized the convention that bound systems have negative potential energy or is confusing the near-Earth approximation with the universal formula.

## DIAGNOSTIC_QUESTION_2
Two students debate the sign of gravitational potential energy. Student A says: "Potential energy is always positive because energy is a scalar magnitude." Student B says: "Gravitational potential energy is negative because the force is attractive." Who is correct and why? Explain the physical significance of the negative sign.

## DIAGNOSTIC_ANSWER_2
Student B is correct. The negative sign arises from the choice of zero at infinite separation. Since gravity is attractive, an external agent must do positive work to separate the masses to infinity, meaning the system's energy at finite separation is lower (more negative) than at infinity. A wrong answer indicates the student treats potential energy as an absolute positive quantity like kinetic energy, not understanding that only differences in potential energy are physically meaningful and the zero point is arbitrary.

## DIAGNOSTIC_QUESTION_3
Calculate the gravitational potential energy of a system consisting of a 5.0 kg mass and a 10.0 kg mass separated by 2.0 m. Use \(G = 6.67 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2\). Express your answer in scientific notation with proper units.

## DIAGNOSTIC_ANSWER_3
Given: \(m_1 = 5.0 \, \text{kg}\), \(m_2 = 10.0 \, \text{kg}\), \(r = 2.0 \, \text{m}\), \(G = 6.67 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2\).
Formula: \(U = -\frac{G m_1 m_2}{r}\)
Substitution: \(U = -\frac{(6.67 \times 10^{-11}) \times 5.0 \times 10.0}{2.0}\)
Calculation: \(U = -\frac{3.335 \times 10^{-9}}{2.0} = -1.6675 \times 10^{-9} \, \text{J}\)
Rounding to two significant figures: \(U = -1.7 \times 10^{-9} \, \text{J}\).
A wrong answer (e.g., positive sign, missing \(G\), unit error) reveals computational carelessness or confusion between the formula for force and potential energy.

## DIAGNOSTIC_QUESTION_4
A 2 kg satellite is in a circular orbit of radius \(R\) around Earth. Its gravitational potential energy is \(U_1\). It is then moved to a new circular orbit of radius \(2R\). Its potential energy becomes \(U_2\). Compare \(U_1\) and \(U_2\): which is larger (less negative)? By what factor does the magnitude of potential energy change? Explain why the potential energy increases even though the satellite moves to a higher orbit.

## DIAGNOSTIC_ANSWER_4
\(U_1 = -\frac{GM_Em}{R}\), \(U_2 = -\frac{GM_Em}{2R} = \frac{1}{2}U_1\). Since \(U_1\) is negative, \(U_2\) is less negative (e.g., \(-10 \, \text{J}\) vs \(-5 \, \text{J}\)), so \(U_2 > U_1\). The magnitude of potential energy halves. Potential energy increases (becomes less negative) because work is done by an external agent (rocket thrust) to move the satellite against gravity, adding energy to the system. A wrong answer (e.g., saying \(U_2\) is more negative) shows the student thinks "higher orbit = more negative" by incorrectly applying \(mgh\) logic where \(h\) increases.

## DIAGNOSTIC_QUESTION_5
A student solves a problem: "Find the change in gravitational potential energy when a 1 kg mass is lifted from Earth's surface (\(R_E = 6400 \, \text{km}\)) to a height \(h = 6400 \, \text{km}\)." The student uses \(\Delta U = mgh\) with \(g = 9.8 \, \text{m/s}^2\) and gets \(\Delta U = 6.27 \times 10^7 \, \text{J}\). Evaluate this solution. Is it correct? If not, what is the correct approach and approximate correct value?

## DIAGNOSTIC_ANSWER_5
The solution is incorrect because \(h = R_E\) is not "small compared to \(R_E\)"; the approximation \(g = \text{constant}\) fails. The correct approach uses the exact formula: \(\Delta U = GM_Em\left(\frac{1}{R_E} - \frac{1}{R_E+h}\right)\). With \(h = R_E\), \(\Delta U = GM_Em\left(\frac{1}{R_E} - \frac{1}{2R_E}\right) = \frac{GM_Em}{2R_E} = \frac{1}{2}mgR_E\). Using \(g = 9.8\), \(R_E = 6.4 \times 10^6 \, \text{m}\), correct \(\Delta U \approx 3.14 \times 10^7 \, \text{J}\). The student's answer is twice the correct value. A wrong evaluation indicates the student does not recognize the domain of validity for the \(mgh\) approximation.

## DIAGNOSTIC_QUESTION_6
Design a simple thought experiment or graphical method to demonstrate that the gravitational potential energy between two masses varies as \(1/r\), not as \(1/r^2\) (like force). Your explanation must be understandable to a Class 11 student without using calculus.

## DIAGNOSTIC_ANSWER_6
A good answer: Plot the gravitational force \(F\) vs \(r\) (hyperbola \(1/r^2\)) and the potential energy \(U\) vs \(r\) (hyperbola \(1/r\)) on the same graph for \(r > 0\). Show that the area under the \(F-r\) curve from \(r_1\) to \(r_2\) (work done) equals \(U(r_2) - U(r_1)\). Alternatively, use the fact that work done \(W = \int F \, dr\); since \(F \propto 1/r^2\), its integral is \(\propto -1/r\). A poor answer (e.g., "force and energy both depend on \(r\) so they are the same") reveals the student confuses the functional forms of force and its integral.

## COMMON_MISCONCEPTION
Students often believe gravitational potential energy is a property of a single object (e.g., "the satellite has potential energy") rather than a property of the *system* of interacting masses. They also frequently apply \(U = mgh\) universally, ignoring that this approximation requires \(h \ll R_E\) and \(g\) constant. A concrete error: when asked for the potential energy of a satellite at height \(h = R_E\), a student calculates \(mgR_E\) using surface \(g\), obtaining a positive value, missing both the negative sign and the factor of 1/2 from the exact formula.

## ON_FAILURE
1. Revisit Class 9 Work-Energy theorem (node c9_physics_ch4_3) to reinforce that potential energy is defined for a *system* via work done by conservative forces.
2. Perform a graphical activity: Plot \(F = k/r^2\) and shade area under curve from \(r_1\) to \(r_2\). Show this area equals \(k(1/r_1 - 1/r_2)\), which is \(-\Delta U\). This visualizes why \(U \propto -1/r\).
3. Explicitly compare the two formulas: Write \(U_{\text{exact}} = -\frac{GMm}{R+h}\) and \(U_{\text{approx}} = -\frac{GMm}{R} + mgh\). Show Taylor expansion for \(h \ll R\) to derive the approximation and its limits.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_07_002, c9_physics_ch4_1, c9_physics_ch4_3, c9_physics_ch4_6, c9_physics_ch4_7, c11_phy_cbse_07_003, c11_phy_cbse_07_004, c11_phy_cbse_07_006

## PREREQUISITE_REASONS
c11_phy_cbse_07_002: Newton's Law of Universal Gravitation provides the force law \(F = GMm/r^2\) whose integration yields potential energy.
c9_physics_ch4_1: Work definition \(W = \int F \cdot dr\) is the mathematical tool to derive potential energy from force.
c9_physics_ch4_3: Work-Energy Theorem connects work done by gravity to kinetic energy change, motivating potential energy.
c9_physics_ch4_6: Introduces gravitational potential energy near Earth as \(mgh\), which is the limiting case of the general formula.
c9_physics_ch4_7: Conservation of mechanical energy (\(K+U=\text{constant}\)) is the primary application of gravitational potential energy.
c11_phy_cbse_07_003: Gravitational potential energy \( U = -\frac{G m_1 m_2}{r} \) directly uses \( G \); its sign and magnitude depend on the experimentally determined value of \( G \).  
c11_phy_cbse_07_004: Requires The acceleration due to gravity (g) at the Earth's surface is the uniform acceleration exp... - this node (Gravitational potential energy of a system of two point masses is the work done by an exte...) builds directly on that foundation.  
c11_phy_cbse_07_006: Gravitational potential energy inside the Earth uses the same shell theorem and mass-interior concept to derive \(U(r)\).  

## FORWARD_NODE_IDS
c11_phy_cbse_07_009, c11_phy_cbse_07_010, c11_phy_cbse_07_011, c11_phy_cbse_07_014, c12_phy_cbse_02_001, c12_phy_cbse_02_002

## FORWARD_REASONS
c11_phy_cbse_07_009: Gravitational potential (\(V = U/m\)) is defined directly from potential energy per unit mass.
c11_phy_cbse_07_010: Escape velocity derivation uses conservation of energy: \(\frac{1}{2}mv^2 + U = 0\) at infinity.
c11_phy_cbse_07_011: Orbital velocity uses force balance, but total energy of satellite (\(E = K+U\)) requires potential energy.
c11_phy_cbse_07_014: Energy of an orbiting satellite explicitly calculates \(K\), \(U\), and \(E = -GMm/2r\).
c12_phy_cbse_02_001: Defines gravitational potential energy — direct analogy for electrostatic potential energy.  
c12_phy_cbse_02_002: Gravitational potential V = -GM/r provides the exact mathematical analogy (inverse-square force → 1/r potential), helping students transfer understanding from mechanics to electrostatics.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c10_math_cbse_01_001
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula \(\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\) is used to compute separation \(r\) between particles in coordinate geometry problems.
c10_math_cbse_01_001: Fundamental Theorem of Arithmetic and prime factorization build the algebraic manipulation skills needed for simplifying expressions like \(GMm(1/r_1 - 1/r_2)\).

## CHAIN_DESCRIPTION
c11_phy_cbse_07_002 -> c11_phy_cbse_07_008 -> c11_phy_cbse_07_009

## THIS_FORMULA
\(U = -\frac{G m_1 m_2}{r}\) (for two point masses, zero at infinity); for a system of particles, \(U_{\text{total}} = \sum_{\text{pairs}} -\frac{G m_i m_j}{r_{ij}}\). Near Earth's surface (\(h \ll R_E\)): \(\Delta U \approx mgh\).

## FORMULA_VARIABLES
\(U\) = gravitational potential energy (J); \(G\) = universal gravitational constant (\(6.67 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2\)); \(m_1, m_2\) = masses of the two particles (kg); \(r\) = separation between their centres (m); \(m\) = mass of test particle (kg); \(M_E\) = mass of Earth (kg); \(R_E\) = radius of Earth (m); \(h\) = height above Earth's surface (m); \(g\) = acceleration due to gravity at surface (\(9.8 \, \text{m/s}^2\)).

## FORMULA_UNITS
J (joule), N·m²/kg², kg, m, m/s²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_physics_ch4_1 | Work done by a variable force (\(W = \int F \, dr\)) is the integral calculus bridge; the gravitational force \(F \propto 1/r^2\) integrates to \(U \propto -1/r\).
c9_physics_ch4_3 | Work-energy theorem (\(W_{\text{net}} = \Delta K\)) combined with \(W_{\text{grav}} = -\Delta U\) establishes conservation of mechanical energy for gravitational systems.

## PREREQ_CONCEPT
Work done by a variable conservative force and the definition of potential energy as negative of work done by that force.

## PREREQ_BEFORE
The student must be able to state the work-energy theorem, identify conservative forces, and recall the near-Earth potential energy formula \(U = mgh\) with its limitations.

## PREREQ_STUCK
If stuck, review Class 9 Work and Energy (nodes c9_physics_ch4_1, c9_physics_ch4_3, c9_physics_ch4_6) focusing on the relationship \(W_{\text{conservative}} = -\Delta U\) and the approximation \(g = \text{constant}\).

## WORKED_EXAMPLE_1
PROBLEM: Two identical lead spheres, each of mass 10 kg, are placed with their centres 0.5 m apart in a school laboratory. Calculate the gravitational potential energy of this two-sphere system. Use \(G = 6.67 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2\).
STEPS:
- Step 1: Identify given quantities: \(m_1 = 10 \, \text{kg}\), \(m_2 = 10 \, \text{kg}\), \(r = 0.5 \, \text{m}\), \(G = 6.67 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2\). Required: \(U\) in joules.
- Step 2: Select the formula for a pair of point masses: \(U = -\frac{G m_1 m_2}{r}\). Check units: \(\frac{\text{N·m}^2/\text{kg}^2 \times \text{kg} \times \text{kg}}{\text{m}} = \text{N·m} = \text{J}\). Correct.
- Step 3: Substitute values with units: \(U = -\frac{(6.67 \times 10^{-11}) \times 10 \times 10}{0.5}\).
- Step 4: Compute numerator: \(6.67 \times 10^{-11} \times 100 = 6.67 \times 10^{-9}\). Divide by 0.5: \(\frac{6.67 \times 10^{-9}}{0.5} = 1.334 \times 10^{-8}\). Apply negative sign: \(U = -1.334 \times 10^{-8} \, \text{J}\).
- Step 5: Verify reasonableness: The energy is very small (order \(10^{-8} \, \text{J}\)) because \(G\) is tiny and masses are modest. Negative sign indicates bound system. Answer: \(-1.33 \times 10^{-8} \, \text{J}\) (3 significant figures).
REASONING: The gravitational potential energy of a two-particle system depends only on their masses and separation. The negative sign confirms that work must be supplied to separate them to infinity. The small magnitude reflects the weakness of gravity compared to other forces.
ANSWER: \(-1.33 \times 10^{-8} \, \text{J}\)

## WORKED_EXAMPLE_2
PROBLEM: A 500 kg weather satellite is launched from Earth's surface (\(R_E = 6400 \, \text{km}\)) to a circular orbit at height \(h = 1600 \, \text{km}\). Calculate the change in gravitational potential energy of the satellite-Earth system. Use \(g = 9.8 \, \text{m/s}^2\) at the surface. Compare with the approximate value using \(\Delta U = mgh\).
STEPS:
- Step 1: Given: \(m = 500 \, \text{kg}\), \(R_E = 6.4 \times 10^6 \, \text{m}\), \(h = 1.6 \times 10^6 \, \text{m}\), \(g = 9.8 \, \text{m/s}^2\). Required: \(\Delta U = U_f - U_i\).
- Step 2: Exact formula: \(\Delta U = GM_Em\left(\frac{1}{R_E} - \frac{1}{R_E+h}\right)\). Use \(GM_E = gR_E^2\) to avoid needing \(M_E\) and \(G\) separately.
- Step 3: Substitute \(GM_E = 9.8 \times (6.4 \times 10^6)^2 = 9.8 \times 4.096 \times 10^{13} = 4.014 \times 10^{14} \, \text{N·m}^2/\text{kg}\).
- Step 4: Compute \(\frac{1}{R_E} - \frac{1}{R_E+h} = \frac{1}{6.4 \times 10^6} - \frac{1}{8.0 \times 10^6} = (1.5625 - 1.25) \times 10^{-7} = 0.3125 \times 10^{-7} \, \text{m}^{-1}\).
- Step 5: \(\Delta U = (4.014 \times 10^{14}) \times 500 \times (0.3125 \times 10^{-7}) = 6.27 \times 10^9 \, \text{J}\).
- Step 6: Approximate \(\Delta U_{\text{approx}} = mgh = 500 \times 9.8 \times 1.6 \times 10^6 = 7.84 \times 10^9 \, \text{J}\).
- Step 7: Compare: Exact \(\Delta U = 6.27 \times 10^9 \, \text{J}\); Approximate = \(7.84 \times 10^9 \, \text{J}\). The approximation overestimates by 25% because \(h\) is not \(\ll R_E\) (here \(h = 0.25 R_E\)).
REASONING: The exact formula accounts for the weakening of gravity with altitude. The approximation \(mgh\) assumes constant \(g\), which is only valid for \(h \ll R_E\). Using \(GM_E = gR_E^2\) simplifies calculation without needing \(G\) and \(M_E\) separately.
ANSWER: Exact \(\Delta U = 6.27 \times 10^9 \, \text{J}\); Approximate \(\Delta U = 7.84 \times 10^9 \, \text{J}\) (overestimates by 25%)

## WORKED_EXAMPLE_3
PROBLEM: Three particles of masses 2 kg, 3 kg, and 4 kg are placed at the vertices of an equilateral triangle of side 1 m. Find the total gravitational potential energy of the system. Use \(G = 6.67 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2\).
STEPS:
- Step 1: Identify the three pairs: (2,3), (3,4), (4,2). All separations \(r = 1 \, \text{m}\). Given \(G\).
- Step 2: Total \(U = \sum_{\text{pairs}} -\frac{G m_i m_j}{r}\). Since \(r\) is same for all pairs, \(U = -\frac{G}{r}(m_1m_2 + m_2m_3 + m_3m_1)\).
- Step 3: Compute sum of products: \(2 \times 3 = 6\); \(3 \times 4 = 12\); \(4 \times 2 = 8\). Sum = \(26 \, \text{kg}^2\).
- Step 4: Substitute: \(U = -\frac{6.67 \times 10^{-11}}{1} \times 26 = -1.7342 \times 10^{-9} \, \text{J}\).
- Step 5: Round to two significant figures (limited by \(G\)): \(U = -1.7 \times 10^{-9} \, \text{J}\).
- Step 6: Verify: All terms negative, magnitude plausible for small masses at 1 m.
REASONING: Gravitational potential energy obeys superposition; the total energy of a multi-particle system is the sum of pairwise potential energies. Each pair contributes a negative term. The calculation is algebraic, not vectorial, because potential energy is a scalar.
ANSWER: \(-1.7 \times 10^{-9} \, \text{J}\)

## COMPETENCY_QUESTION_1
QUESTION: A comet of mass \(m\) orbits the Sun in a highly elliptical orbit. At its closest approach (perihelion), its distance from the Sun is \(r_p\) and speed is \(v_p\). At its farthest point (aphelion), distance is \(r_a\) and speed is \(v_a\). Given that angular momentum is conserved (\(m v_p r_p = m v_a r_a\)), show that the total mechanical energy \(E = \frac{1}{2}mv^2 - \frac{GM_Sm}{r}\) is the same at both points. What does the sign of \(E\) tell you about the orbit?
COMPETENCY: Interpreting physical situations using formulas and conservation laws
STEPS:
- Step 1: Write expressions for total energy at perihelion (\(E_p\)) and aphelion (\(E_a\)).
- Step 2: Use angular momentum conservation to relate \(v_a\) to \(v_p\): \(v_a = v_p (r_p/r_a)\).
- Step 3: Substitute \(v_a\) into \(E_a\) and simplify to show \(E_a = E_p\).
- Step 4: Interpret the sign: If \(E < 0\), the orbit is bound (elliptical); if \(E \geq 0\), the orbit is unbound (parabolic/hyperbolic).
ANSWER: 
\(E_p = \frac{1}{2}mv_p^2 - \frac{GM_Sm}{r_p}\)
\(E_a = \frac{1}{2}mv_a^2 - \frac{GM_Sm}{r_a} = \frac{1}{2}m v_p^2 (r_p/r_a)^2 - \frac{GM_Sm}{r_a}\)
Using the vis-viva equation or direct algebra with Kepler's laws, one can show they are equal. The negative total energy confirms a bound elliptical orbit. If \(E\) were zero or positive, the comet would escape the Sun.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A 1000 kg spacecraft is in a circular orbit of radius \(2R_E\) around Earth. Mission control wants to move it to a higher circular orbit of radius \(4R_E\) using a two-impulse Hohmann transfer. (a) Calculate the total energy in the initial and final orbits. (b) Determine the change in potential energy and kinetic energy separately. (c) Explain why the total energy increases (becomes less negative) even though the spacecraft's speed decreases in the higher orbit. Use \(g = 9.8 \, \text{m/s}^2\), \(R_E = 6400 \, \text{km}\).
COMPETENCY: Predicting outcomes from changing variables and multi-concept integration (energy, orbits, work)
STEPS:
- Step 1: Recall total energy in circular orbit: \(E = -\frac{GM_Em}{2r}\). Kinetic energy \(K = -E = \frac{GM_Em}{2r}\). Potential energy \(U = 2E = -\frac{GM_Em}{r}\).
- Step 2: Compute \(GM_E = gR_E^2 = 9.8 \times (6.4 \times 10^6)^2 = 4.01 \times 10^{14} \, \text{N·m}^2/\text{kg}\).
- Step 3: Initial orbit \(r_i = 2R_E = 1.28 \times 10^7 \, \text{m}\). \(E_i = -\frac{4.01 \times 10^{14} \times 1000}{2 \times 1.28 \times 10^7} = -1.57 \times 10^{10} \, \text{J}\).
- Step 4: Final orbit \(r_f = 4R_E = 2.56 \times 10^7 \, \text{m}\). \(E_f = -\frac{4.01 \times 10^{14} \times 1000}{2 \times 2.56 \times 10^7} = -7.83 \times 10^9 \, \text{J}\).
- Step 5: \(\Delta U = U_f - U_i = -\frac{GM_Em}{r_f} - (-\frac{GM_Em}{r_i}) = GM_Em(\frac{1}{r_i} - \frac{1}{r_f}) = 4.01 \times 10^{14} \times 1000 \times (\frac{1}{1.28 \times 10^7} - \frac{1}{2.56 \times 10^7}) = 3.13 \times 10^{10} \, \text{J}\) (increase).
- Step 6: \(\Delta K = K_f - K_i = \frac{GM_Em}{2}(\frac{1}{r_f} - \frac{1}{r_i}) = -1.57 \times 10^{10} \, \text{J}\) (decrease).
- Step 7: \(\Delta E = \Delta K + \Delta U = 1.57 \times 10^{10} \, \text{J}\). Total energy increases because the increase in potential energy (positive work done by thrusters) is larger in magnitude than the decrease in kinetic energy. The spacecraft slows down but gains more potential energy.
ANSWER: (a) \(E_i = -1.57 \times 10^{10} \, \text{J}\), \(E_f = -7.83 \times 10^9 \, \text{J}\). (b) \(\Delta U = +3.13 \times 10^{10} \, \text{J}\), \(\Delta K = -1.57 \times 10^{10} \, \text{J}\). (c) Total energy increases because the thrusters do positive work to raise the orbit; potential energy increases more than kinetic energy decreases.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Gravitational potential energy of a system of two point masses is the work done by an external agent in assembling them from infinite separation to their current separation, with the zero of potential energy ______ chosen at infinite separation.

## DIAGNOSTIC_ANSWER_7
conventionally

**A wrong answer ("arbitrarily" or "formally") reveals the student has paraphrased the definition's adverb - the zero of potential energy is conventionally chosen at infinity.** Conventionally is the definition's own adverb, and the adverb is what the blank grades. Recall the assembling-from-infinity clause before filling, and give the adverb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: You do work ______ gravity, storing energy in the book-Earth system.

## DIAGNOSTIC_ANSWER_8
against

**A wrong answer ("with" or "for") reveals the student has swapped the walkthrough's preposition - you do work against gravity.** Against is the walkthrough's own word, and the word is what the blank grades. Recall the stored energy before filling, and give the word exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: But what if we lift the book to the height of the International Space Station (______ km)?

## DIAGNOSTIC_ANSWER_9
400

**A wrong answer (36 or any other figure) reveals the student has drifted from the walkthrough - the space station orbits about 400 km up.** The 400 is the walkthrough's own altitude figure. Recall the failure of mgh there before filling, and give the figure exactly.
