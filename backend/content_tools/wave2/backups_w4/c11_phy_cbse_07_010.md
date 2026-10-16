## ELI5
Throw the cricket ball up and it returns; launch the rocket fast enough and it never does. Escape velocity is the threshold: kinetic energy exactly cancels the gravitational debt, and the object coasts to infinity with nothing left. It is the square root of twice g times R - independent of the projectile's mass, larger from higher launches, and not a magic switch that turns gravity off.

## DEFINITION
Escape velocity is the minimum speed required for an object to escape the gravitational influence of a massive body (like Earth) without any further propulsion, reaching infinity with zero residual kinetic energy. Its SI unit is metres per second (m/s). It is derived by equating the initial kinetic energy to the magnitude of the gravitational potential energy at the surface, assuming no non-conservative forces.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can derive the escape velocity formula from energy conservation principles, calculate escape velocity for any celestial body given its mass and radius, and explain why escape velocity is independent of the mass of the projected object but depends on the launch height.

## SCOPE_BOUNDARY
This node covers the derivation of escape velocity from Earth's surface using conservation of mechanical energy, the formula \(v_e = \sqrt{2GM/R} = \sqrt{2gR}\), and its numerical value for Earth (11.2 km/s). It does NOT cover escape velocity from an arbitrary height (though the formula is extended), relativistic effects, atmospheric drag, or multi-body gravitational fields.

## WALKTHROUGH
Imagine throwing a cricket ball upward from a rooftop in Delhi – it goes up, slows down, and falls back. Now imagine a rocket launched from Sriharikota: with enough initial speed, it never returns. The threshold speed is the escape velocity. To find it, we start with the work-energy theorem: the initial kinetic energy must overcome the negative gravitational potential energy binding the object to Earth. We set the total mechanical energy at launch (surface) equal to the total energy at infinity (zero potential, zero kinetic for minimum speed). This yields \( \frac{1}{2}mv_e^2 - \frac{GMm}{R} = 0 \), giving \(v_e = \sqrt{2GM/R}\). Substituting \(g = GM/R^2\) gives the practical form \(v_e = \sqrt{2gR}\).

Takeaway: mastery means deriving the threshold from the energy ledger, computing it for any world, and explaining the mass-independence. Exam moves: derive-escape-velocity questions and compare-planets items. Check yourself: past the threshold gravity still pulls - it just never collects enough to bring you home; the escape is from the debt, not the force. Students miss it because the phrase suggests freedom from gravity, when the definition's arithmetic is a budget: spend exactly the binding energy and infinity arrives at zero speed, broke but free. One budget, one departure - and the ledger closes at infinity.

## DIAGNOSTIC_QUESTION_1
State the formula for escape velocity from the surface of a planet of mass M and radius R. Write the SI unit of each quantity in the formula.

## DIAGNOSTIC_ANSWER_1
The formula is \(v_e = \sqrt{\frac{2GM}{R}}\). SI units: \(v_e\) in m/s, \(G\) in N·m²/kg² (or m³·kg⁻¹·s⁻²), \(M\) in kg, \(R\) in m. A wrong answer (e.g., missing the factor 2, or using \(g\) instead of \(G\)) reveals the student has memorised the formula without understanding its derivation from energy conservation, or confuses escape velocity with orbital velocity (\(v_o = \sqrt{GM/R}\)).

## DIAGNOSTIC_QUESTION_2
Why is escape velocity independent of the mass of the projected object? Explain using the energy conservation equation.

## DIAGNOSTIC_ANSWER_2
In the energy equation \(\frac{1}{2}mv_e^2 = \frac{GMm}{R}\), the mass \(m\) of the projectile appears on both sides and cancels out. Thus \(v_e\) depends only on \(M\) and \(R\) of the planet. A student who thinks heavier objects need more speed to escape is confusing force (which is proportional to \(m\)) with energy per unit mass; they have not realised that gravitational potential energy is also proportional to \(m\), so the required kinetic energy per unit mass is unchanged.

## DIAGNOSTIC_QUESTION_3
Calculate the escape velocity from the surface of Mars given: mass of Mars \(M = 6.42 \times 10^{23}\) kg, radius of Mars \(R = 3.39 \times 10^6\) m, \(G = 6.67 \times 10^{-11}\) N·m²/kg². Express your answer in km/s.

## DIAGNOSTIC_ANSWER_3
Step 1: Identify formula \(v_e = \sqrt{2GM/R}\).  
Step 2: Substitute values: \(v_e = \sqrt{\frac{2 \times 6.67 \times 10^{-11} \times 6.42 \times 10^{23}}{3.39 \times 10^6}}\).  
Step 3: Compute numerator: \(2 \times 6.67 \times 6.42 \times 10^{12} = 85.6 \times 10^{12} = 8.56 \times 10^{13}\).  
Step 4: Divide by \(R\): \(\frac{8.56 \times 10^{13}}{3.39 \times 10^6} = 2.525 \times 10^7\).  
Step 5: Square root: \(\sqrt{2.525 \times 10^7} = 5.025 \times 10^3\) m/s = 5.03 km/s.  
A wrong answer (e.g., 11.2 km/s) indicates the student used Earth's parameters instead of Mars', or made a unit conversion error (forgetting to convert m/s to km/s).

## DIAGNOSTIC_QUESTION_4
A projectile is fired from Earth's surface with speed 15 km/s. Ignoring atmospheric drag and other celestial bodies, will it escape Earth's gravity? If yes, what will be its speed at infinity? Use \(v_e = 11.2\) km/s for Earth.

## DIAGNOSTIC_ANSWER_4
Yes, because 15 km/s > 11.2 km/s. At infinity, total energy is conserved: \(\frac{1}{2}m(15)^2 - \frac{1}{2}m(11.2)^2 = \frac{1}{2}mv_\infty^2\). So \(v_\infty = \sqrt{15^2 - 11.2^2} = \sqrt{225 - 125.44} = \sqrt{99.56} \approx 9.98\) km/s. A student who answers "no" or calculates \(v_\infty = 15 - 11.2 = 3.8\) km/s is incorrectly subtracting speeds instead of using energy conservation (kinetic energies subtract, not speeds).

## DIAGNOSTIC_QUESTION_5
A student claims: "If we launch a rocket from a mountain top (height h above sea level), the escape velocity is less than 11.2 km/s because g is smaller there." Evaluate this statement. Is the reasoning fully correct?

## DIAGNOSTIC_ANSWER_5
The conclusion is correct (escape velocity decreases with height), but the reasoning is incomplete. Escape velocity at height \(h\) is \(v_e(h) = \sqrt{\frac{2GM}{R+h}} = v_e(\text{surface}) \sqrt{\frac{R}{R+h}}\). It decreases because the gravitational potential well is shallower (potential energy magnitude is smaller), not merely because \(g\) is smaller. The student has confused the *cause* (reduced potential energy magnitude) with a *correlated effect* (reduced g). A fully correct explanation must reference the \(1/r\) dependence of potential energy.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to demonstrate that escape velocity is the same for a 1 kg iron ball and a 1000 kg rocket, assuming no air resistance. Describe the setup, measurements, and how you would conclude the independence of mass.

## DIAGNOSTIC_ANSWER_6
Setup: In a vacuum chamber (to eliminate air resistance), use a spring-loaded launcher to project a 1 kg iron ball and a 1000 kg rocket model vertically upward with the *same* initial speed \(v\). Measure the maximum height reached by each using a laser rangefinder. Repeat for increasing speeds until the object does not return (i.e., it hits the top of the chamber with non-zero speed). The minimum speed at which both objects escape the chamber (or reach a predefined "infinity" boundary) will be identical. This shows that the gravitational deceleration \(g\) is independent of mass, so the kinematic condition for escape depends only on initial speed, not mass. A poor answer might involve measuring force or acceleration instead of the kinematic outcome, missing the energy-conservation perspective.

## COMMON_MISCONCEPTION
Students often think escape velocity is the speed needed to "break free" of gravity completely, implying gravity becomes zero at that speed. In reality, gravity extends to infinity; escape velocity means the object has just enough kinetic energy to reach infinity with zero speed, but gravitational force still acts on it all the way (though it approaches zero). Another error: confusing escape velocity with orbital velocity; they think a satellite orbiting at 7.9 km/s has "escaped" because it doesn't fall, not realising it is still bound in a closed orbit.

## ON_FAILURE
If a student holds the above misconceptions:  
1. Re-derive escape velocity from the energy equation \(\frac{1}{2}mv^2 + U(r) = E\), plotting \(U(r) = -GMm/r\) and showing that for \(E \ge 0\) the object can reach \(r \to \infty\). Emphasise that at \(E=0\), \(v_\infty = 0\) but \(F \neq 0\).  
2. Contrast with orbital velocity: for a circular orbit, \(v_o = \sqrt{GM/R}\); total energy \(E = -\frac{GMm}{2R} < 0\) (bound). Show numerically that \(v_e = \sqrt{2} v_o\).  
3. Use a PhET simulation "Gravity and Orbits" to launch a projectile at 11.2 km/s and 7.9 km/s; observe that the former goes to infinity (simulation boundary) while the latter orbits.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_07_002, c11_phy_cbse_07_004, c11_phy_cbse_07_008, c11_phy_cbse_07_009, c9_physics_ch4_3, c9_physics_ch4_5, c9_physics_ch4_6, c9_physics_ch4_7, c9_physics_ch4_8, c11_phy_cbse_07_005, c11_phy_cbse_07_007

## PREREQUISITE_REASONS
c11_phy_cbse_07_002: Newton's law of gravitation provides the force \(F = GMm/r^2\) and potential energy \(U = -GMm/r\) used in the derivation.
c11_phy_cbse_07_004: The relation \(g = GM/R^2\) allows expressing escape velocity as \(\sqrt{2gR}\), a common exam form.
c11_phy_cbse_07_008: Gravitational potential energy \(U = -GMm/r\) is the central term in the energy conservation equation.
c11_phy_cbse_07_009: Gravitational potential \(V = -GM/r\) (energy per unit mass) directly gives \(v_e = \sqrt{-2V}\).
c9_physics_ch4_3: Work-energy theorem (\(W = \Delta K\)) is the starting point for equating work done against gravity to kinetic energy.
c9_physics_ch4_5: Kinetic energy formula \(K = \frac{1}{2}mv^2\) appears on the left side of the energy equation.
c9_physics_ch4_6: Gravitational potential energy concept (near Earth \(mgh\) and general \(-GMm/r\)) is the right side.
c9_physics_ch4_7: Mechanical energy conservation (\(K+U = \text{constant}\)) is the principle used to equate surface and infinity energies.
c9_physics_ch4_8: Law of conservation of energy justifies setting initial total energy equal to final total energy.
c11_phy_cbse_07_005: Escape velocity derivation uses the gravitational potential at altitude \(h\), which depends on \(g_h\).  
c11_phy_cbse_07_007: Escape velocity derivation uses surface \(g\); rotation reduces effective \(g\) at the equator, lowering the required escape speed slightly (advantage for equatorial launches).  

## FORWARD_NODE_IDS
c11_phy_cbse_07_011, c11_phy_cbse_07_012, c11_phy_cbse_07_014
## FORWARD_REASONS
c11_phy_cbse_07_011: Orbital velocity \(v_o = \sqrt{GM/R}\) is derived similarly; comparing \(v_e = \sqrt{2}v_o\) is a key exam question.
c11_phy_cbse_07_012: Geostationary satellites orbit at a height where orbital period matches Earth's rotation; their orbital velocity is related to escape velocity at that height.
c11_phy_cbse_07_014: Total energy of an orbiting satellite is \(E = -\frac{GMm}{2r}\); the condition for escape (\(E \ge 0\)) directly uses the escape velocity concept.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_04_005, c10_math_cbse_04_006, c8_math_ch2_3, c8_math_ch2_7, c8_math_ch2_9
## CROSS_SUBJECT_REASONS
c10_math_cbse_04_005: Quadratic formula derivation (completing the square) underpins solving for velocity when energy equations yield \(v^2\) terms.
c10_math_cbse_04_006: Direct application of quadratic formula appears when solving for speed in energy conservation problems with non-zero final speed.
c8_math_ch2_3: Exponential notation (powers of 10) is essential for handling \(G = 6.67 \times 10^{-11}\), \(M \sim 10^{24}\), \(R \sim 10^6\).
c8_math_ch2_7: Multiplying powers with same base (\(10^a \times 10^b = 10^{a+b}\)) is used constantly in numerical calculations.
c8_math_ch2_9: Power of a power (\((10^a)^b = 10^{ab}\)) is used when squaring velocities or taking square roots of scientific notation numbers.

## CHAIN_DESCRIPTION
c11_phy_cbse_07_002 -> c11_phy_cbse_07_010 -> c11_phy_cbse_07_011

## THIS_FORMULA
\(v_e = \sqrt{\frac{2GM}{R}} = \sqrt{2gR}\) (m/s)

## FORMULA_VARIABLES
\(v_e\) = escape velocity (m/s), \(G\) = universal gravitational constant (6.67 × 10⁻¹¹ N·m²/kg²), \(M\) = mass of the celestial body (kg), \(R\) = radius of the celestial body (m), \(g\) = acceleration due to gravity at the surface (m/s²)

## FORMULA_UNITS
m/s, N·m²/kg², kg, m, m/s²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_04_005 | The derivation involves solving a quadratic in velocity (v² = 2GM/R) which uses square roots and algebraic manipulation taught in quadratic equations.
c8_math_ch2_7 | Multiplying powers of 10 is used when computing numerical values: e.g., 2 × (6.67×10⁻¹¹) × (6×10²⁴) / (6.4×10⁶) requires adding/subtracting exponents.

## PREREQ_CONCEPT
Conservation of mechanical energy in a gravitational field, specifically that total energy \(E = K + U\) is constant and \(U(r) = -GMm/r\).

## PREREQ_BEFORE
The student must be able to write the gravitational potential energy formula for a mass at distance r from Earth's centre, state the work-energy theorem, and set up an energy conservation equation between two points.

## PREREQ_STUCK
If stuck, revisit gravitational potential energy (c11_phy_cbse_07_008) and the work-energy theorem (c9_physics_ch4_3), focusing on the sign convention: potential energy is negative, zero at infinity.

## WORKED_EXAMPLE_1
PROBLEM: The mass of Earth is \(6.0 \times 10^{24}\) kg and its radius is \(6.4 \times 10^6\) m. Calculate the escape velocity from Earth's surface. Use \(G = 6.67 \times 10^{-11}\) N·m²/kg². Express your answer in km/s.

STEPS:
- Step 1: Identify given quantities: \(M = 6.0 \times 10^{24}\) kg, \(R = 6.4 \times 10^6\) m, \(G = 6.67 \times 10^{-11}\) N·m²/kg². Find \(v_e\) in km/s.
- Step 2: Write the formula \(v_e = \sqrt{\frac{2GM}{R}}\). Check units: \(GM/R\) has units (N·m²/kg² × kg)/m = (kg·m/s²·m²/kg)/m = m²/s². Square root gives m/s. Correct.
- Step 3: Substitute values: \(v_e = \sqrt{\frac{2 \times 6.67 \times 10^{-11} \times 6.0 \times 10^{24}}{6.4 \times 10^6}}\).
- Step 4: Compute numerator: \(2 \times 6.67 \times 6.0 = 80.04\). Powers of 10: \(10^{-11} \times 10^{24} = 10^{13}\). Numerator = \(80.04 \times 10^{13} = 8.004 \times 10^{14}\).
- Step 5: Divide by \(R\): \(\frac{8.004 \times 10^{14}}{6.4 \times 10^6} = 1.2506 \times 10^8\) m²/s².
- Step 6: Square root: \(\sqrt{1.2506 \times 10^8} = \sqrt{1.2506} \times 10^4 \approx 1.118 \times 10^4\) m/s = 11.18 km/s ≈ 11.2 km/s.
- Step 7: Verify reasonableness: Known value is 11.2 km/s. The calculation matches.

REASONING: The escape velocity is derived by setting initial kinetic energy equal to the magnitude of gravitational potential energy at the surface. The calculation uses scientific notation carefully to avoid errors with large exponents. The final conversion from m/s to km/s (divide by 1000) is a common exam step.

ANSWER: 11.2 km/s

## WORKED_EXAMPLE_2
PROBLEM: A rocket is launched from the surface of a planet with mass \(M = 4.0 \times 10^{24}\) kg and radius \(R = 5.0 \times 10^6\) m. The rocket's initial speed is 10 km/s. Will it escape the planet's gravity? If not, what maximum height from the surface will it reach? Ignore atmosphere and other bodies. Use \(G = 6.67 \times 10^{-11}\) N·m²/kg².

STEPS:
- Step 1: Calculate escape velocity for this planet: \(v_e = \sqrt{\frac{2GM}{R}} = \sqrt{\frac{2 \times 6.67 \times 10^{-11} \times 4.0 \times 10^{24}}{5.0 \times 10^6}}\).
- Step 2: Numerator: \(2 \times 6.67 \times 4.0 = 53.36\). \(10^{-11} \times 10^{24} = 10^{13}\). So \(53.36 \times 10^{13} = 5.336 \times 10^{14}\).
- Step 3: Divide by R: \(\frac{5.336 \times 10^{14}}{5.0 \times 10^6} = 1.0672 \times 10^8\).
- Step 4: Square root: \(\sqrt{1.0672 \times 10^8} = 1.033 \times 10^4\) m/s = 10.33 km/s.
- Step 5: Compare: Initial speed = 10 km/s < 10.33 km/s. So it will NOT escape.
- Step 6: Find max height using energy conservation: \(\frac{1}{2}mv_i^2 - \frac{GMm}{R} = 0 - \frac{GMm}{R+h}\) (at max height, v=0).
- Step 7: Cancel m: \(\frac{1}{2}v_i^2 = GM \left(\frac{1}{R} - \frac{1}{R+h}\right) = GM \frac{h}{R(R+h)}\).
- Step 8: Substitute \(v_i = 10^4\) m/s, \(GM = 6.67 \times 10^{-11} \times 4.0 \times 10^{24} = 2.668 \times 10^{14}\).
- Step 9: \(\frac{1}{2}(10^4)^2 = 5 \times 10^7 = 2.668 \times 10^{14} \frac{h}{(5.0 \times 10^6)(5.0 \times 10^6 + h)}\).
- Step 10: Solve for h: \(5 \times 10^7 \times 5.0 \times 10^6 (5.0 \times 10^6 + h) = 2.668 \times 10^{14} h\).
- Step 11: \(1.25 \times 10^{14} (5.0 \times 10^6 + h) = 2.668 \times 10^{14} h\).
- Step 12: \(6.25 \times 10^{20} + 1.25 \times 10^{14} h = 2.668 \times 10^{14} h\).
- Step 13: \(6.25 \times 10^{20} = 1.418 \times 10^{14} h\).
- Step 14: \(h = \frac{6.25 \times 10^{20}}{1.418 \times 10^{14}} = 4.41 \times 10^6\) m = 4410 km.

REASONING: Since initial speed is less than escape velocity, total energy is negative, so the rocket reaches a finite maximum height where kinetic energy becomes zero. The energy conservation equation is solved for h. Note that we used the exact form of potential energy \(-GMm/r\), not the approximate \(mgh\), because h is comparable to R.

ANSWER: No, it will not escape. Maximum height reached = 4.41 × 10⁶ m (4410 km) above the surface.

## WORKED_EXAMPLE_3
PROBLEM: The escape velocity from Earth's surface is 11.2 km/s. A spacecraft is in a circular orbit around Earth at a height of 400 km (typical ISS orbit). What additional speed (Δv) must be imparted to the spacecraft to escape Earth's gravity, assuming the boost is applied tangentially in the direction of motion? Use \(R_E = 6400\) km, \(g = 9.8\) m/s².

STEPS:
- Step 1: Find orbital radius: \(r = R_E + h = 6400 + 400 = 6800\) km = \(6.8 \times 10^6\) m.
- Step 2: Calculate orbital velocity at this height: \(v_o = \sqrt{\frac{GM}{r}}\). Use \(g = GM/R_E^2\) so \(GM = g R_E^2\).
- Step 3: \(GM = 9.8 \times (6.4 \times 10^6)^2 = 9.8 \times 40.96 \times 10^{12} = 4.014 \times 10^{14}\) m³/s².
- Step 4: \(v_o = \sqrt{\frac{4.014 \times 10^{14}}{6.8 \times 10^6}} = \sqrt{5.903 \times 10^7} = 7.68 \times 10^3\) m/s = 7.68 km/s.
- Step 5: Calculate escape velocity at this height: \(v_e(r) = \sqrt{\frac{2GM}{r}} = \sqrt{2} v_o = 1.414 \times 7.68 = 10.86\) km/s.
- Step 6: Additional speed needed: \(\Delta v = v_e(r) - v_o = 10.86 - 7.68 = 3.18\) km/s.
- Step 7: Check: At surface, \(v_e = 11.2\) km/s, \(v_o = 7.9\) km/s, \(\Delta v = 3.3\) km/s. At higher altitude, both are lower but ratio remains \(\sqrt{2}\). Answer is consistent.

REASONING: This problem combines orbital velocity and escape velocity concepts. The key is recognising that for a circular orbit, kinetic energy is half the magnitude of potential energy, so total energy is negative. To escape, total energy must become zero or positive, requiring an increase in kinetic energy by a factor of 2 (i.e., speed by \(\sqrt{2}\)). The Δv is the difference between escape velocity and orbital velocity at that orbit.

ANSWER: Δv = 3.18 km/s (or 3180 m/s)

## COMPETENCY_QUESTION_1
QUESTION: A planet has twice the mass of Earth and twice the radius of Earth. An astronaut on this planet throws a ball vertically upward with a speed equal to Earth's escape velocity (11.2 km/s). Will the ball escape the planet's gravity? Justify your answer with a calculation.

COMPETENCY: Interpreting physical situations using formulas and proportional reasoning

STEPS:
- Step 1: Write escape velocity formula for the planet: \(v_{e,planet} = \sqrt{\frac{2G(2M_E)}{2R_E}} = \sqrt{\frac{2GM_E}{R_E}} = v_{e,Earth}\).
- Step 2: Compare: The astronaut throws at 11.2 km/s, which equals Earth's escape velocity. Since the planet's escape velocity is also 11.2 km/s, the throw speed exactly equals the planet's escape velocity.
- Step 3: Conclusion: Yes, the ball will just escape (reach infinity with zero speed).

ANSWER: Yes, the ball will escape. The planet's escape velocity is \(\sqrt{\frac{2G(2M)}{2R}} = \sqrt{\frac{2GM}{R}} = 11.2\) km/s, same as Earth's. The throw speed equals this value, so total energy is zero, allowing escape.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A projectile is fired from Earth's surface at an angle of 30° to the horizontal with a speed of 11.2 km/s (Earth's escape velocity). Ignoring air resistance and Earth's rotation, will it escape? Explain why the direction of projection does not matter for escape speed (in the absence of atmosphere).

COMPETENCY: Predicting outcomes from changing variables and applying conservation laws

STEPS:
- Step 1: Recall escape velocity derivation: \(\frac{1}{2}mv_e^2 - \frac{GMm}{R} = 0\). The derivation uses only speed (magnitude of velocity), not direction, because kinetic energy is a scalar: \(K = \frac{1}{2}mv^2\).
- Step 2: Gravitational force is conservative and central; work done by gravity depends only on initial and final radial positions, not on the path taken.
- Step 3: Therefore, for any launch direction (as long as it doesn't hit the ground), if initial speed ≥ \(v_e\), total energy ≥ 0, and the projectile escapes.
- Step 4: At 30° with 11.2 km/s, speed = escape speed, so total energy = 0. It will escape, following a parabolic trajectory (in the two-body approximation).

ANSWER: Yes, it will escape. Escape velocity depends only on the magnitude of initial velocity (speed), not its direction, because kinetic energy is a scalar and gravitational potential energy depends only on radial distance. The projectile's path will be a parabola (if exactly \(v_e\)) or hyperbola (if greater), but it will not return.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Escape velocity is the minimum speed required for an object to escape the ______ influence of a massive body (like Earth) without any further propulsion, reaching infinity with zero residual kinetic energy.

## DIAGNOSTIC_ANSWER_7
gravitational

**A wrong answer ("atmospheric" or "surface") reveals the student has swapped the definition's adjective - the escape is from the gravitational influence.** Gravitational is the definition's own adjective, and the adjective is what the blank grades. Recall the zero-residual-speed clause before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: ______ throwing a cricket ball upward from a rooftop in Delhi – it goes up, slows down, and falls back.

## DIAGNOSTIC_ANSWER_8
Imagine

**A wrong answer ("Watch" or "Picture") reveals the student has swapped the walkthrough's opener - imagine throwing the cricket ball upward.** Imagine is the walkthrough's own opening word, and the word is what the blank grades. Recall the rooftop setting before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_9
What is Escape velocity? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Escape velocity is the minimum speed required for an object to escape the gravitational influence of a massive body (like Earth) without any further propulsion, reaching infinity with zero residual kinetic energy.

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: escape velocity is the minimum speed required for an object to escape the gravitational influence of a massive body without any further propulsion, reaching infinity with zero residual kinetic energy.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Escape velocity?

## DIAGNOSTIC_ANSWER_10
Students often think escape velocity is the speed needed to "break free" of gravity completely, implying gravity becomes zero at that speed.

**A wrong answer (gravity switches off at escape velocity) reveals the student holds the flagged mix-up.** Gravity never becomes zero at any finite speed - the threshold only means the total energy reaches zero, so the inward pull weakens faster than the object slows, and no return ticket exists.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can derive the escape velocity formula from energy conservation principles, calculate escape velocity for any celestial body given its mass and radius, and explain why escape velocity is independent of the mass of the projected object but depends on the launch height.
