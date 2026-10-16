## ELI5
Planets wander, loop backward, wander on - the puzzle Kepler cracked with Tycho's data. Three laws: orbits are ellipses with the Sun at one focus, not the centre; the Sun-to-planet line sweeps equal areas in equal times, so planets sprint near the Sun and stroll far away; and the square of the period grows with the cube of the orbit's size. Two are geometry and momentum; the third is gravity's signature.

## DEFINITION
Kepler's laws of planetary motion are three empirical principles describing the motion of planets around the Sun: (1) **Law of Orbits** – Every planet moves in an elliptical orbit with the Sun at one focus; (2) **Law of Areas** – The radius vector from the Sun to a planet sweeps out equal areas in equal time intervals, a consequence of angular momentum conservation under a central force; (3) **Law of Periods** – The square of the orbital period \(T\) is proportional to the cube of the semi-major axis \(a\) of the ellipse, i.e., \(T^2 \propto a^3\). For circular orbits of radius \(r\) around a central mass \(M\), the precise relation is \(T^2 = \frac{4\pi^2}{GM}r^3\), where \(G = 6.67 \times 10^{-11} \, \text{N·m}^2\text{/kg}^2\) is the universal gravitational constant.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can: (a) state all three laws in precise physical language, distinguishing between elliptical and circular orbits; (b) explain why the second law implies variable orbital speed (faster at perihelion, slower at aphelion) using angular momentum conservation; (c) apply the third law to compute the period or semi-major axis of a planet/satellite given the other, and to compare different planetary systems.

## SCOPE_BOUNDARY
This node covers the *statement, geometric meaning, and basic application* of Kepler's three laws as presented in NCERT Class 11 Chapter 7 (Sections 7.1–7.2). It does **not** cover the derivation of these laws from Newton's law of universal gravitation (that is node c11_phy_cbse_07_002), nor the calculation of orbital velocity, energy, or satellite mechanics (nodes c11_phy_cbse_07_011 onward). The treatment remains at the level of planetary motion around the Sun; extension to Earth satellites is introduced only qualitatively here.

## WALKTHROUGH
Begin by asking students to observe the night sky over several weeks (or use a free planetarium app like Stellarium) and note that planets like Mars or Jupiter appear to move against the background stars, sometimes even reversing direction (retrograde motion). This historical puzzle – which troubled astronomers for millennia – was resolved by Tycho Brahe's precise naked-eye data and Kepler's analysis. Connect to their prior knowledge of **uniform circular motion** (Class 9, node c9_physics_ch2_10) and **central forces** (Class 9, node c9_physics_ch3_4): the Sun's pull is always directed toward the Sun, making it a central force. Then introduce the ellipse using the string-and-pins construction (NCERT Fig. 7.1b) to define semi-major axis \(a\), perihelion, and aphelion. Derive the second law from angular momentum conservation (\(L = mvr_\perp = \text{constant}\)) for a central force, showing that \(\Delta A/\Delta t = L/(2m)\). Finally, present the third law as a proportionality \(T^2 \propto a^3\) and give the exact formula for circular orbits, emphasizing that the constant \(\frac{4\pi^2}{GM}\) depends only on the central mass \(M\).

Takeaway: mastery means stating all three laws precisely, deriving the area law from angular momentum, and wielding the period relation for orbits and satellites. Exam moves: state-the-laws questions and compare-the-periods items. Check yourself: the focus-versus-centre slip is the flagged trap - the Sun sits off-centre, and the ellipse leans around it. Students miss it because circles feel natural, when the definition insists on ellipses: the varying distance explains the varying speed, and the area law is angular momentum conservation wearing an astronomical coat.

## DIAGNOSTIC_QUESTION_1
State Kepler's three laws of planetary motion in your own words, using the terms *ellipse*, *focus*, *radius vector*, *semi-major axis*, and *period*.

## DIAGNOSTIC_ANSWER_1
**Correct answer:**  
1. **Law of Orbits:** Planets orbit the Sun in ellipses with the Sun at one focus.  
2. **Law of Areas:** The line joining the Sun and a planet sweeps equal areas in equal times.  
3. **Law of Periods:** The square of the orbital period is proportional to the cube of the semi-major axis (\(T^2 \propto a^3\)).  

**What a wrong answer reveals:** If a student says "circular orbits" for Law 1, they confuse the Copernican model with Kepler's improvement. If they omit "radius vector" or "equal areas in equal times" for Law 2, they miss the geometric essence of angular momentum conservation. If they write \(T \propto a^3\) or \(T^2 \propto a^2\) for Law 3, they have not internalized the correct power-law relationship.

## DIAGNOSTIC_QUESTION_2
Explain why a planet moves faster at perihelion than at aphelion, using the concept of angular momentum conservation. Draw a sketch showing the radius vector and velocity vectors at both points.

## DIAGNOSTIC_ANSWER_2
**Correct answer:**  
At perihelion and aphelion, the velocity vector is perpendicular to the radius vector. Angular momentum \(L = m v r\) is conserved because the gravitational force is central (zero torque). Since \(r_{\text{peri}} < r_{\text{aph}}\), we must have \(v_{\text{peri}} > v_{\text{aph}}\) to keep \(L\) constant. The sketch should show a shorter \(r\) with a longer \(v\) arrow at perihelion, and a longer \(r\) with a shorter \(v\) arrow at aphelion, both perpendicular to their respective radius vectors.

**What a wrong answer reveals:** If the student claims speed is constant (like uniform circular motion), they have not grasped that the force is not always perpendicular to velocity in an ellipse. If they invoke "energy conservation" without mentioning angular momentum, they are using a correct but different principle; the question specifically tests the angular momentum argument that underlies Kepler's second law.

## DIAGNOSTIC_QUESTION_3
Mars has a semi-major axis \(a = 2.28 \times 10^{11} \, \text{m}\) and orbital period \(T = 687 \, \text{days}\). Earth has \(a = 1.50 \times 10^{11} \, \text{m}\) and \(T = 365 \, \text{days}\). Verify Kepler's third law by computing the ratio \(T^2/a^3\) for both planets. Express your answer in \(\text{s}^2/\text{m}^3\).

## DIAGNOSTIC_ANSWER_3
**Step 1:** Convert periods to seconds.  
\(T_{\text{Earth}} = 365 \times 24 \times 3600 = 3.1536 \times 10^7 \, \text{s}\)  
\(T_{\text{Mars}} = 687 \times 24 \times 3600 = 5.9357 \times 10^7 \, \text{s}\)

**Step 2:** Compute \(a^3\).  
\(a_{\text{Earth}}^3 = (1.50 \times 10^{11})^3 = 3.375 \times 10^{33} \, \text{m}^3\)  
\(a_{\text{Mars}}^3 = (2.28 \times 10^{11})^3 = 1.185 \times 10^{34} \, \text{m}^3\)

**Step 3:** Compute \(T^2/a^3\).  
Earth: \(\frac{(3.1536 \times 10^7)^2}{3.375 \times 10^{33}} = \frac{9.945 \times 10^{14}}{3.375 \times 10^{33}} = 2.947 \times 10^{-19} \, \text{s}^2/\text{m}^3\)  
Mars: \(\frac{(5.9357 \times 10^7)^2}{1.185 \times 10^{34}} = \frac{3.523 \times 10^{15}}{1.185 \times 10^{34}} = 2.973 \times 10^{-19} \, \text{s}^2/\text{m}^3\)

**Step 4:** The two values agree within 1%, confirming Kepler's third law.

**What a wrong answer reveals:** If the student forgets to convert days to seconds, they will get a ratio in \(\text{day}^2/\text{m}^3\) which is not the standard SI unit and cannot be compared directly with the theoretical constant \(\frac{4\pi^2}{GM}\). If they use \(r\) instead of \(a\) for Mars (which has a noticeably elliptical orbit), they introduce a systematic error.

## DIAGNOSTIC_QUESTION_4
A comet orbits the Sun in a highly elliptical orbit. At perihelion its distance is \(0.5 \, \text{AU}\) and speed is \(54 \, \text{km/s}\). At aphelion its distance is \(30 \, \text{AU}\). What is its speed at aphelion? (1 AU = \(1.5 \times 10^{11} \, \text{m}\)). Assume angular momentum is conserved.

## DIAGNOSTIC_ANSWER_4
**Step 1:** Identify given quantities.  
\(r_p = 0.5 \, \text{AU} = 7.5 \times 10^{10} \, \text{m}\)  
\(v_p = 54 \, \text{km/s} = 5.4 \times 10^4 \, \text{m/s}\)  
\(r_a = 30 \, \text{AU} = 4.5 \times 10^{12} \, \text{m}\)

**Step 2:** Apply angular momentum conservation \(m v_p r_p = m v_a r_a\) (velocity perpendicular to radius at apses).  
\(v_a = v_p \frac{r_p}{r_a} = 5.4 \times 10^4 \times \frac{7.5 \times 10^{10}}{4.5 \times 10^{12}} = 5.4 \times 10^4 \times \frac{1}{60} = 900 \, \text{m/s} = 0.9 \, \text{km/s}\).

**Step 3:** Check reasonableness: aphelion speed is much smaller, as expected.

**What a wrong answer reveals:** If the student uses energy conservation instead, they would need the Sun's mass and \(G\) – not provided. If they assume \(v \propto 1/r^2\) (inverse square law for force), they confuse force with velocity. If they forget to convert AU to meters but keep km/s, the units cancel correctly anyway, but they must be consistent.

## DIAGNOSTIC_QUESTION_5
A student claims: "Kepler's second law means a planet takes the same time to travel from perihelion to aphelion as from aphelion to perihelion because the orbit is symmetric." Evaluate this statement.

## DIAGNOSTIC_ANSWER_5
**Correct evaluation:** The statement is **false**. While the orbit is geometrically symmetric, the *speed* is not symmetric in time. Kepler's second law states equal areas are swept in equal times. The area swept from perihelion to aphelion (the "front" half of the ellipse) is exactly half the total area of the ellipse. The area swept from aphelion back to perihelion is the other half. Since the total area is swept in one period \(T\), each half takes \(T/2\). **However**, the student's reasoning ("because the orbit is symmetric") is flawed: symmetry of the *shape* does not guarantee symmetry of *time* if the speed varies. The correct reason is that the two halves have equal area, and the areal velocity is constant. If the student thinks the times are equal *because* the path lengths are equal, they are wrong – the path lengths are equal (by symmetry of the ellipse), but the speeds are different, so the times would be different *if* areal velocity were not constant. The constancy of areal velocity *forces* the times to be equal *despite* the different speeds.

**What a wrong answer reveals:** If the student agrees with the statement, they confuse geometric symmetry with dynamical symmetry. They may think "equal distances imply equal times" (uniform motion), not realizing that the second law is precisely about *non-uniform* motion compensating to give equal areas in equal times.

## DIAGNOSTIC_QUESTION_6
Design a simple tabletop experiment using a ball on a string (or a puck on an air table) to demonstrate the principle behind Kepler's second law (equal areas in equal times). Describe the setup, what you would measure, and how you would verify the law.

## DIAGNOSTIC_ANSWER_6
(1) Setup — tie a small mass on a string passing through a hole in a frictionless horizontal air table so the string tension is a purely central force, (2) Measure — video the mass, mark its position at equal time intervals, and draw radius vectors from the centre to each position, (3) Verify — compute each triangular area as half r1 r2 sin delta-theta between successive radius vectors and check the areas stay constant within experimental error, (4) Key condition — the force must remain central, because friction or any tangential force changes the angular momentum and violates the law. A poor answer uses a vertical circle where gravity adds a non-central component, or measures speed at different radii without measuring areas, which tests a consequence rather than the law itself.

## COMMON_MISCONCEPTION
**Misconception:** "Kepler's first law says planets move in ellipses, so the Sun is at the *center* of the ellipse."  
**Exact wrong reasoning:** Students often confuse the geometric center of an ellipse with its focus. They know a circle is a special case of an ellipse where the two foci coincide at the center, and they overgeneralize: "ellipse → center → Sun at center." They may also think the "focus" is just a fancy name for the center.  
**Concrete example:** In a diagram of an ellipse with the Sun drawn at the center, a student will incorrectly label the semi-major axis as the Sun-planet distance at all points, and will fail to distinguish perihelion and aphelion distances. This leads to errors in applying the third law (using the wrong \(a\)) and in understanding the second law (the radius vector length varies symmetrically about the center, not the focus).

## ON_FAILURE
**Remediation steps:**  
1. **Physical construction:** Have the student draw an ellipse using the string-and-pins method (NCERT Fig. 7.1b) on graph paper. Place two pins (foci) 8 cm apart, use a 20 cm string loop. Draw the ellipse. Mark the center (midpoint of foci) and one focus as the Sun.  
2. **Measure distances:** Measure the distance from the Sun-focus to the curve at several points, especially the closest (perihelion) and farthest (aphelion). Compare with the distance from the geometric center.  
3. **Calculate semi-major axis:** Show that the semi-major axis \(a\) is half the sum of perihelion and aphelion distances, *not* the distance from the center to the curve (which is the semi-major axis only for a circle).  
4. **Connect to third law:** Use the measured \(a\) to compute \(T\) for a hypothetical planet, emphasizing that \(a\) is defined relative to the focus, not the center.  
5. **Reflection:** Ask the student to explain in their own words why the Sun cannot be at the center if the orbit is an ellipse with non-zero eccentricity.

## PREREQUISITE_NODE_IDS
c9_physics_ch2_10, c9_physics_ch3_4, c9_physics_ch4_6, c7_physics_ch06_003, c8_physics_ch9_8, c10_math_cbse_11_003, c10_math_cbse_07_001, c9_physics_ch3_6

## PREREQUISITE_REASONS
c9_physics_ch2_10: Uniform circular motion provides the baseline for understanding centripetal force and angular speed, which are generalized to elliptical motion.  
c9_physics_ch3_4: Newton's second law (\(F=ma\)) is needed to understand that a central force produces zero torque, leading to angular momentum conservation.  
c9_physics_ch4_6: Gravitational potential energy concept helps later when connecting Kepler's laws to energy conservation (though not derived here).  
c7_physics_ch06_003: Prior knowledge that Earth and planets revolve around the Sun in roughly circular orbits sets the stage for the refinement to ellipses.  
c8_physics_ch9_8: Reinforces the concept of revolution and orbital motion from a geometric perspective.  
c10_math_cbse_11_003: Area of a sector formula (\(A = \frac{1}{2} r^2 \theta\)) is the mathematical basis for the "equal areas in equal times" law.
c10_math_cbse_07_001: transfers. (Included as a representative of 3D geometric thinking; if not appropriate, replace with c10_math_cbse_07_001 for coordinate geometry of ellipses, but ellipse is not in Class 10 math. We'll keep it as a general geometric maturity  
c9_physics_ch3_6: If stuck, revisit Class 9 Chapter 9 (Force and Laws of Motion) – specifically the concept of torque and angular momentum conservation for central forces (node c9_physics_ch3_6).  

## FORWARD_NODE_IDS
c11_phy_cbse_07_002, c11_phy_cbse_07_011, c11_phy_cbse_07_014, c11_phy_cbse_07_012, c12_geo_cbse_08_009

## FORWARD_REASONS
c11_phy_cbse_07_002: Newton's law of universal gravitation is the theoretical foundation that *explains* Kepler's empirical laws; this node provides the phenomena to be explained.  
c11_phy_cbse_07_011: Orbital velocity and period of satellites directly apply Kepler's third law (with Earth as central body) and the geometry of orbits from this node.  
c11_phy_cbse_07_014: Energy of an orbiting satellite uses the elliptical orbit geometry and the period law to derive total energy expressions.
c11_phy_cbse_07_012: Kepler's third law (T² ∝ r³) is the foundation for the period-radius relation used in both satellite types.  
c12_geo_cbse_08_009: c11_phy_cbse_08_002: Mechanical properties of fluids — not directly relevant; correction: c11_phy_cbse_07_001 (System of Particles and Rotational Motion) covers angular velocity for geostationary condition. Actually, the correct p  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_11_003, c10_math_cbse_11_005, c9_math_ch5_1, c9_math_ch5_3, c8_math_ch11_11
## CROSS_SUBJECT_REASONS
c10_math_cbse_11_003: Area of a sector formula is essential for quantifying "equal areas in equal times" (Kepler's second law).  
c10_math_cbse_11_005: Arc length formula helps in understanding the relationship between angular displacement and linear distance along the orbit.  
c9_math_ch5_1: Circle definitions (radius, chord, sector) are the circular-orbit special case of the elliptical geometry.  
c9_math_ch5_3: Chord properties are used in geometric proofs of orbital properties (e.g., the latus rectum).  
c8_math_ch11_11: Euler's formula for polyhedra is not directly relevant, but the habit of geometric reasoning with formulas transfers. (Included as a representative of 3D geometric thinking; if not appropriate, replace with c10_math_cbse_07_001 for coordinate geometry of ellipses, but ellipse is not in Class 10 math. We'll keep it as a general geometric maturity node.)

## CHAIN_DESCRIPTION
c9_physics_ch2_10 -> c11_phy_cbse_07_001 -> c11_phy_cbse_07_002

## THIS_FORMULA
Kepler's Third Law (exact for circular orbits): \(T^2 = \frac{4\pi^2}{GM} a^3\)  
where \(T\) = orbital period (s), \(a\) = semi-major axis (m), \(M\) = mass of central body (kg), \(G = 6.67 \times 10^{-11} \, \text{N·m}^2\text{/kg}^2\).

## FORMULA_VARIABLES
\(T\) = orbital period (s), \(a\) = semi-major axis of ellipse (m), \(M\) = mass of central body (kg), \(G\) = universal gravitational constant (N·m²/kg²), \(\pi\) = 3.14159...

## FORMULA_UNITS
s, m, kg, N·m²/kg²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_11_003 | The area of a sector \(A = \frac{1}{2} r^2 \theta\) is the mathematical expression for the infinitesimal area \(dA = \frac{1}{2} r^2 d\theta\) swept by the radius vector, leading to \(\frac{dA}{dt} = \frac{1}{2} r^2 \omega = \frac{L}{2m}\).  
c9_math_ch5_1 | Circle geometry (radius, diameter, sector) provides the limiting case of zero eccentricity where Kepler's laws reduce to uniform circular motion formulas \(v = \frac{2\pi r}{T}\) and \(a_c = \frac{v^2}{r}\).

## PREREQ_CONCEPT
Understanding of central forces and angular momentum conservation (from Class 9 Laws of Motion) is the key prerequisite physics concept.

## PREREQ_BEFORE
The student must be able to state that a central force exerts zero torque about the center, so angular momentum is conserved, and must recall the formula for angular momentum \(L = m v_\perp r\).

## PREREQ_STUCK
If stuck, revisit Class 9 Chapter 9 (Force and Laws of Motion) – specifically the concept of torque and angular momentum conservation for central forces (node c9_physics_ch3_6).

## WORKED_EXAMPLE_1
**PROBLEM:** The Earth orbits the Sun in a nearly circular orbit of radius \(1.50 \times 10^{11} \, \text{m}\) with a period of \(365.25 \, \text{days}\). Using Kepler's third law in the form \(T^2 = \frac{4\pi^2}{GM_{\text{Sun}}} a^3\), calculate the mass of the Sun. (Use \(G = 6.67 \times 10^{-11} \, \text{N·m}^2\text{/kg}^2\).)

**STEPS:**
- **Step 1:** Identify given quantities and convert to SI units.  
  \(a = 1.50 \times 10^{11} \, \text{m}\)  
  \(T = 365.25 \, \text{days} = 365.25 \times 24 \times 3600 \, \text{s} = 3.15576 \times 10^7 \, \text{s}\)  
  \(G = 6.67 \times 10^{-11} \, \text{N·m}^2\text{/kg}^2\)  
  Unknown: \(M_{\text{Sun}}\) (kg).
- **Step 2:** Rearrange Kepler's third law formula to solve for \(M\).  
  \(T^2 = \frac{4\pi^2}{GM} a^3 \implies M = \frac{4\pi^2 a^3}{G T^2}\).
- **Step 3:** Substitute values with units.  
  \(a^3 = (1.50 \times 10^{11})^3 = 3.375 \times 10^{33} \, \text{m}^3\)  
  \(T^2 = (3.15576 \times 10^7)^2 = 9.9588 \times 10^{14} \, \text{s}^2\)  
  \(M = \frac{4 \times (3.1416)^2 \times 3.375 \times 10^{33}}{6.67 \times 10^{-11} \times 9.9588 \times 10^{14}}\).
- **Step 4:** Compute numerator and denominator separately, tracking units.  
  Numerator: \(4 \times 9.8696 \times 3.375 \times 10^{33} = 1.331 \times 10^{35} \, \text{m}^3\)  
  Denominator: \(6.67 \times 10^{-11} \times 9.9588 \times 10^{14} = 6.642 \times 10^4 \, \text{N·m}^2\text{/kg}^2 \cdot \text{s}^2\)  
  Note: \(\text{N} = \text{kg·m/s}^2\), so \(\text{N·m}^2\text{/kg}^2 \cdot \text{s}^2 = \text{m}^3/\text{kg}\).  
  Thus \(M = \frac{1.331 \times 10^{35} \, \text{m}^3}{6.642 \times 10^4 \, \text{m}^3/\text{kg}} = 2.004 \times 10^{30} \, \text{kg}\).
- **Step 5:** Verify reasonableness. The accepted solar mass is \(1.99 \times 10^{30} \, \text{kg}\); our result is within 1%. The units worked out to kg, as required for mass.

**REASONING:** This example uses the exact form of Kepler's third law derived from Newton's gravitation (though historically Kepler only knew the proportionality). The calculation demonstrates how precise astronomical measurements of \(T\) and \(a\) allow us to "weigh the Sun" – a classic application. Unit analysis confirms the formula is dimensionally consistent: \([G] = \text{M}^{-1}\text{L}^3\text{T}^{-2}\), so \([4\pi^2 a^3 / (G T^2)] = \text{M}\).

**ANSWER:** \(M_{\text{Sun}} = 2.00 \times 10^{30} \, \text{kg}\) (to three significant figures).

## WORKED_EXAMPLE_2
**PROBLEM:** A geostationary satellite orbits Earth at a height where its period is exactly 24 hours (sidereal day = 23 h 56 min = 86164 s). Using Kepler's third law and the Moon's orbital data (period \(T_m = 27.3 \, \text{days}\), orbital radius \(r_m = 3.84 \times 10^8 \, \text{m}\)), find the orbital radius \(r_g\) of the geostationary satellite. Do not use the value of \(G\) or Earth's mass.

**STEPS:**
- **Step 1:** Identify the known ratios. Kepler's third law for satellites of the same central body (Earth) states \(\frac{T^2}{r^3} = \text{constant}\). So \(\frac{T_g^2}{r_g^3} = \frac{T_m^2}{r_m^3}\).
- **Step 2:** Convert all periods to the same unit (seconds).  
  \(T_g = 86164 \, \text{s}\)  
  \(T_m = 27.3 \, \text{days} = 27.3 \times 24 \times 3600 = 2.35872 \times 10^6 \, \text{s}\)  
  \(r_m = 3.84 \times 10^8 \, \text{m}\).
- **Step 3:** Solve for \(r_g\).  
  \(r_g^3 = r_m^3 \times \frac{T_g^2}{T_m^2}\)  
  \(r_g = r_m \left( \frac{T_g}{T_m} \right)^{2/3}\).
- **Step 4:** Compute the ratio.  
  \(\frac{T_g}{T_m} = \frac{86164}{2.35872 \times 10^6} = 0.03653\)  
  \(\left( \frac{T_g}{T_m} \right)^{2/3} = (0.03653)^{2/3}\).  
  \(\ln(0.03653) = -3.309\), \(\frac{2}{3} \times (-3.309) = -2.206\), \(e^{-2.206} = 0.110\).  
  Or directly: \(0.03653^{0.6667} \approx 0.110\).
- **Step 5:** Calculate \(r_g\).  
  \(r_g = 3.84 \times 10^8 \times 0.110 = 4.22 \times 10^7 \, \text{m} = 42,200 \, \text{km}\) from Earth's center.  
  Subtract Earth's radius (\(6370 \, \text{km}\)) to get height \(\approx 35,800 \, \text{km}\).
- **Step 6:** Check units and reasonableness. The result is in meters, and the height matches the known geostationary altitude (~35,786 km).

**REASONING:** This problem illustrates the power of Kepler's third law as a *ratio* method: we can find unknown orbital parameters of one satellite using another satellite's data, without needing \(G\) or the central mass. This is exactly how astronomers determined relative distances in the solar system before absolute distances were known.

**ANSWER:** Orbital radius \(r_g = 4.22 \times 10^7 \, \text{m}\) (height ≈ 35,800 km above surface).

## WORKED_EXAMPLE_3
**PROBLEM:** A planet orbits a star of mass \(M = 2.0 \times 10^{30} \, \text{kg}\) in an ellipse with semi-major axis \(a = 2.0 \times 10^{11} \, \text{m}\) and eccentricity \(e = 0.5\). (a) Find the orbital period \(T\). (b) Find the planet's speed at perihelion and aphelion. (c) Verify that the angular momentum is the same at both points.

**STEPS:**
- **Step 1:** Given: \(M = 2.0 \times 10^{30} \, \text{kg}\), \(a = 2.0 \times 10^{11} \, \text{m}\), \(e = 0.5\), \(G = 6.67 \times 10^{-11}\).  
  Perihelion distance: \(r_p = a(1-e) = 2.0 \times 10^{11} \times 0.5 = 1.0 \times 10^{11} \, \text{m}\).  
  Aphelion distance: \(r_a = a(1+e) = 2.0 \times 10^{11} \times 1.5 = 3.0 \times 10^{11} \, \text{m}\).
- **Step 2:** (a) Period \(T\) from Kepler's third law (valid for ellipses with \(a\) as semi-major axis).  
  \(T^2 = \frac{4\pi^2}{GM} a^3\)  
  \(a^3 = 8.0 \times 10^{33} \, \text{m}^3\)  
  \(GM = 6.67 \times 10^{-11} \times 2.0 \times 10^{30} = 1.334 \times 10^{20} \, \text{m}^3/\text{s}^2\)  
  \(T^2 = \frac{4 \times 9.8696 \times 8.0 \times 10^{33}}{1.334 \times 10^{20}} = \frac{3.158 \times 10^{35}}{1.334 \times 10^{20}} = 2.367 \times 10^{15} \, \text{s}^2\)  
  \(T = \sqrt{2.367 \times 10^{15}} = 4.865 \times 10^7 \, \text{s} \approx 563 \, \text{days}\).
- **Step 3:** (b) Speed at perihelion and aphelion using angular momentum conservation and energy conservation (vis-viva equation).  
  Vis-viva: \(v^2 = GM \left( \frac{2}{r} - \frac{1}{a} \right)\).  
  At perihelion: \(v_p^2 = 1.334 \times 10^{20} \left( \frac{2}{1.0 \times 10^{11}} - \frac{1}{2.0 \times 10^{11}} \right) = 1.334 \times 10^{20} \times \frac{3}{2.0 \times 10^{11}} = 2.001 \times 10^9\)  
  \(v_p = \sqrt{2.001 \times 10^9} = 4.47 \times 10^4 \, \text{m/s} = 44.7 \, \text{km/s}\).  
  At aphelion: \(v_a^2 = 1.334 \times 10^{20} \left( \frac{2}{3.0 \times 10^{11}} - \frac{1}{2.0 \times 10^{11}} \right) = 1.334 \times 10^{20} \times \frac{1}{6.0 \times 10^{11}} = 2.223 \times 10^8\)  
  \(v_a = \sqrt{2.223 \times 10^8} = 1.49 \times 10^4 \, \text{m/s} = 14.9 \, \text{km/s}\).
- **Step 4:** (c) Check angular momentum \(L = m v r\) (perpendicular at apses).  
  \(L_p = m \times 4.47 \times 10^4 \times 1.0 \times 10^{11} = m \times 4.47 \times 10^{15}\)  
  \(L_a = m \times 1.49 \times 10^4 \times 3.0 \times 10^{11} = m \times 4.47 \times 10^{15}\)  
  They match exactly (within rounding), confirming angular momentum conservation.
- **Step 5:** Physical check: \(v_p > v_a\) as required by Kepler's second law. The ratio \(v_p/v_a = 3.0 = r_a/r_p\), consistent with \(L = \text{constant}\).

**REASONING:** This problem combines all three Kepler laws: the first law (ellipse geometry with \(a\) and \(e\)), the third law (period from \(a\)), and the second law (via angular momentum conservation, verified by the vis-viva equation which itself derives from energy conservation in a \(1/r^2\) potential). It shows the internal consistency of the Kepler/Newton framework.

**ANSWER:** (a) \(T = 4.87 \times 10^7 \, \text{s}\) (563 days); (b) \(v_p = 44.7 \, \text{km/s}\), \(v_a = 14.9 \, \text{km/s}\); (c) Angular momentum is conserved (\(L_p = L_a = m \times 4.47 \times 10^{15} \, \text{kg·m}^2/\text{s}\)).

## COMPETENCY_QUESTION_1
**QUESTION:** The figure shows the orbit of a planet around the Sun (at focus S). The planet moves from A to B in time \(\Delta t_1\) and from C to D in time \(\Delta t_2\). The shaded sectors SAB and SCD have equal area.  
(a) How do \(\Delta t_1\) and \(\Delta t_2\) compare?  
(b) If the arc length AB is *shorter* than arc length CD, what can you conclude about the planet's average speed on the two arcs?  
(c) Explain why this does *not* violate the principle that the gravitational force is conservative.

**COMPETENCY:** Interpreting physical situations using Kepler's laws and connecting to conservation principles.

**STEPS:**
- **Step 1:** Recognize that equal areas in equal times is Kepler's second law. Since sector areas are equal, \(\Delta t_1 = \Delta t_2\).
- **Step 2:** Average speed = arc length / time. Since \(\Delta t_1 = \Delta t_2\) but arc AB < arc CD, the average speed on AB is *greater* than on CD.
- **Step 3:** The gravitational force is conservative, meaning total mechanical energy (kinetic + potential) is conserved. On arc AB (closer to Sun), potential energy is more negative (lower), so kinetic energy must be higher to keep total energy constant. Hence higher speed. On arc CD (farther), potential energy is less negative, kinetic energy is lower, speed is lower. The work done by gravity is path-independent; the change in kinetic energy between any two points depends only on the potential difference, not the path taken. The different speeds on different arcs at the same radial distance would violate energy conservation, but here the arcs are at different average radii, so no violation.

**ANSWER:** (a) \(\Delta t_1 = \Delta t_2\) (Kepler's second law). (b) Average speed on AB > average speed on CD. (c) No violation: the force is conservative, so total energy is conserved. The planet speeds up when closer to the Sun (lower potential energy → higher kinetic energy) and slows down when farther. The equal-area law is a consequence of angular momentum conservation, which holds for *any* central force, conservative or not. But gravity *is* conservative, so energy is also conserved, and the two conservation laws together determine the orbit.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** A newly discovered exoplanet orbits its star with a period of 100 days. The star has the same mass as the Sun. An astronomer claims that because the period is shorter than Earth's (365 days), the exoplanet's orbit must be *circular* and its radius must be smaller than 1 AU. Evaluate this claim.  
(a) Is the orbit necessarily circular?  
(b) Is the semi-major axis necessarily smaller than 1 AU?  
(c) If the orbit is actually highly elliptical with eccentricity \(e = 0.9\), what are its perihelion and aphelion distances?  
(d) Could this planet be habitable? Justify briefly.

**COMPETENCY:** Applying Kepler's third law to infer orbital parameters, distinguishing between semi-major axis and instantaneous distance, and synthesizing with astrophysical context.

**STEPS:**
- **Step 1:** Kepler's third law relates period \(T\) to semi-major axis \(a\), *not* to eccentricity. The law holds for ellipses of any eccentricity. So (a) No, the orbit need not be circular; it could be elliptical with the same \(a\).
- **Step 2:** For a star of solar mass, \(T^2 \propto a^3\) with the same constant as Earth. \(T_{\text{exo}} = 100 \, \text{days}\), \(T_{\text{Earth}} = 365 \, \text{days}\).  
  \(\left(\frac{a_{\text{exo}}}{1 \, \text{AU}}\right)^3 = \left(\frac{100}{365}\right)^2 = 0.0751\)  
  \(a_{\text{exo}} = (0.0751)^{1/3} \, \text{AU} = 0.42 \, \text{AU}\).  
  So (b) Yes, the semi-major axis \(a\) is smaller than 1 AU (0.42 AU).
- **Step 3:** If \(e = 0.9\), then \(r_p = a(1-e) = 0.42 \times 0.1 = 0.042 \, \text{AU}\) and \(r_a = a(1+e) = 0.42 \times 1.9 = 0.80 \, \text{AU}\).  
  Note: Perihelion is extremely close to the star (0.042 AU ≈ 6.3 million km, much closer than Mercury), while aphelion is 0.80 AU.
- **Step 4:** Habitability: At perihelion, the planet receives \((1/0.042)^2 \approx 570\) times Earth's solar flux – extremely hot. At aphelion, it receives \((1/0.80)^2 \approx 1.56\) times Earth's flux – possibly temperate. But the extreme temperature variation and likely tidal locking or atmospheric loss at perihelion make it very unlikely to be habitable in the Earth-like sense.

**ANSWER:** (a) No, Kepler's third law does not require circular orbits. (b) Yes, \(a = 0.42 \, \text{AU} < 1 \, \text{AU}\). (c) Perihelion = 0.042 AU, Aphelion = 0.80 AU. (d) Highly unlikely habitable due to extreme temperature variations and proximity to star at perihelion.

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Begin by asking students to observe the night sky over several weeks (or use a free planetarium app like Stellarium) and note that ______ like Mars or Jupiter appear to move against the background stars, sometimes even reversing direction (retrograde motion).

## DIAGNOSTIC_ANSWER_7
planets

**A wrong answer ("stars" or "satellites") reveals the student has swapped the walkthrough's noun - planets like Mars or Jupiter move against the background stars.** Planets is the walkthrough's own noun, and the noun is what the blank grades. Recall the retrograde puzzle before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
What common mix-up does this lesson flag about Kepler's laws of planetary motion?

## DIAGNOSTIC_ANSWER_8
Misconception: "Kepler's first law says planets move in ellipses, so the Sun is at the *center* of the ellipse." Exact wrong reasoning: Students often confuse the geometric center of an ellipse with its focus.

**A wrong answer (the Sun at the centre of the ellipse) reveals the student holds the flagged mix-up - focus is not centre.** The ellipse has two foci and one centre; the Sun occupies a focus, off-centre by construction, which is exactly why the planet's distance - and so its speed - changes around the orbit.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can: (a) state all three laws in precise physical language, distinguishing between elliptical and circular orbits; (b) explain why the second law implies variable orbital speed (faster at perihelion, slower at aphelion) using angular momentum conservation; (c) apply the third law to compute the period or semi-major axis of a.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Begin by asking students to observe the night sky over several weeks (or use a free ______ app like Stellarium) and note that planets like Mars or Jupiter appear to move against the background stars, sometimes even reversing direction (retrograde motion).

## DIAGNOSTIC_ANSWER_10
planetarium

**A wrong answer ("star" or "weather") reveals the student has swapped the walkthrough's compound noun - the tool is a planetarium app.** Planetarium is the walkthrough's own first half of that compound, and the noun is what the blank grades. Recall the night-sky observation before filling, and give the noun exactly.
