## ELI5
Descend a mine and gravity slims down - the paradox dissolves with the shell theorem: the shells above you pull zero, only the smaller sphere beneath counts. At depth, g equals the surface value times one minus depth over the radius, sliding linearly toward zero at the centre, where the Earth surrounds you symmetrically and cancels itself. Above the surface the inverse square thins the field; below, the shrinking core does it by subtraction.

## DEFINITION
The acceleration due to gravity at a depth \(d\) below the Earth's surface, denoted \(g(d)\), is the gravitational acceleration experienced by a test mass at that depth, assuming the Earth is a sphere of uniform density. It is given by \(g(d) = g \left(1 - \frac{d}{R_E}\right)\), where \(g = \frac{GM_E}{R_E^2}\) is the surface value, \(R_E\) is the Earth's radius, and \(d\) is the depth. The SI unit is \(\text{m/s}^2\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the formula \(g(d) = g(1 - d/R_E)\) from the shell theorem and uniform density assumption, and can calculate \(g\) at any given depth or find the depth where \(g\) reduces to a specified fraction of its surface value.

## SCOPE_BOUNDARY
This node covers the variation of \(g\) with depth for a uniform density sphere only. It does NOT cover non-uniform density models (e.g., Preliminary Reference Earth Model), the effect of Earth's rotation (covered in c11_phy_cbse_07_007), or gravitational potential at depth (covered in c11_phy_cbse_07_009).

## WALKTHROUGH
Imagine you are standing at the bottom of a deep mine shaft, say the Kolar Gold Fields in Karnataka, which go down several kilometres. You might wonder: does gravity get stronger because you are closer to the Earth's centre, or weaker because there is less mass below you? To resolve this, we recall the shell theorem from Newton's law: a uniform spherical shell exerts zero net gravitational force on a particle inside it. The Earth can be thought of as concentric shells. At depth \(d\), the outer shells (thickness \(d\)) exert no force; only the inner sphere of radius \(R_E - d\) matters. Using the mass of this inner sphere and Newton's law, we derive a simple linear relationship.

Takeaway: mastery means deriving the depth formula through the shell theorem, and solving for the depth where gravity hits any chosen fraction. Exam moves: g-at-depth questions and centre-of-the-Earth items. Check yourself: closer to the centre is not closer to the pull - the mass between you and the centre is all that votes. Students miss it because the inverse-square intuition whispers stronger, when the definition's geometry rules underground: depth subtracts shells, the linear law is the shell theorem's receipt, and at the very centre the field cancels to nothing.

## DIAGNOSTIC_QUESTION_1
State the formula for acceleration due to gravity at a depth \(d\) below the Earth's surface, assuming uniform density. Define each symbol and give its SI unit.

## DIAGNOSTIC_ANSWER_1
The formula is \(g(d) = g \left(1 - \frac{d}{R_E}\right)\). Here, \(g(d)\) is acceleration due to gravity at depth \(d\) (m/s²), \(g = GM_E/R_E^2\) is the surface gravity (m/s²), \(d\) is the depth below the surface (m), and \(R_E\) is the Earth's radius (m). A wrong answer (e.g., \(g(d) = g(1 + d/R_E)\) or \(g(d) = GM_E/(R_E-d)^2\)) reveals the student has not grasped the shell theorem or mistakenly treats the entire Earth's mass as concentrated at the centre even for interior points.

## DIAGNOSTIC_QUESTION_2
Explain why the gravitational force on a particle inside a uniform spherical shell is zero. How does this lead to the result that only the mass interior to the particle's position contributes to \(g\) at depth?

## DIAGNOSTIC_ANSWER_2
For a particle inside a uniform spherical shell, every mass element attracts the particle, but the forces from opposite regions cancel due to symmetry: the solid angle subtended by a surface element is proportional to \(1/r^2\), while the gravitational force is also proportional to \(1/r^2\), making the force per unit solid angle constant. Opposite elements produce equal and opposite forces. Thus, at depth \(d\), the outer shells (radius > \(R_E-d\)) contribute zero net force. Only the inner sphere of radius \(R_E-d\) contributes, acting as if its mass is concentrated at the centre. A wrong answer (e.g., "mass above pulls up") indicates confusion between force direction and net force cancellation.

## DIAGNOSTIC_QUESTION_3
Calculate the acceleration due to gravity at a depth of 1600 km, given \(R_E = 6400\) km and \(g = 9.8\) m/s². Express your answer in m/s².

## DIAGNOSTIC_ANSWER_3
Given: \(d = 1600\) km = \(1.6 \times 10^6\) m, \(R_E = 6400\) km = \(6.4 \times 10^6\) m, \(g = 9.8\) m/s².  
Step 1: Compute fraction \(d/R_E = 1600/6400 = 0.25\).  
Step 2: Apply formula \(g(d) = g(1 - d/R_E) = 9.8 \times (1 - 0.25) = 9.8 \times 0.75\).  
Step 3: \(g(d) = 7.35\) m/s².  
A wrong answer (e.g., 12.25 m/s² using \(g(1+d/R_E)\) or 9.8 m/s²) shows the student either used the altitude formula or thinks \(g\) is constant inside the Earth.

## DIAGNOSTIC_QUESTION_4
A graph of \(g\) vs. distance from Earth's centre \(r\) is plotted for \(0 \le r \le 2R_E\). Describe the shape of the graph for \(r < R_E\) and \(r > R_E\). Why is the graph continuous at \(r = R_E\)?

## DIAGNOSTIC_ANSWER_4
For \(r < R_E\) (inside), \(g(r) = \frac{GM_E}{R_E^3}r\) — a straight line through the origin with slope \(GM_E/R_E^3\). For \(r > R_E\) (outside), \(g(r) = \frac{GM_E}{r^2}\) — a hyperbola decreasing as \(1/r^2\). At \(r = R_E\), both formulas give \(g = GM_E/R_E^2\), so the graph is continuous. The slope, however, changes abruptly (from positive to negative), indicating a kink. A wrong answer (e.g., "graph is discontinuous" or "graph is flat inside") reveals misunderstanding of the linear increase inside and the inverse-square decrease outside.

## DIAGNOSTIC_QUESTION_5
A student claims: "At the centre of the Earth (\(d = R_E\)), \(g\) should be infinite because \(r=0\) in Newton's law \(F = GMm/r^2\)." Evaluate this claim and correct the error.

## DIAGNOSTIC_ANSWER_5
The claim is false. Newton's law \(F = GMm/r^2\) applies to point masses or spheres where the test particle is *outside* the sphere. At the centre, the particle is *inside* the Earth; the shell theorem applies. The mass interior to \(r=0\) is zero, so \(g=0\). The student incorrectly uses the point-mass formula for an interior point. A wrong evaluation (e.g., agreeing with the student) shows failure to distinguish between the point-mass formula and the shell theorem for extended bodies.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to measure the variation of \(g\) with depth using a simple pendulum. What would you measure, and how would you isolate the effect of depth from other factors like temperature or air buoyancy?

## DIAGNOSTIC_ANSWER_6
Take a seconds pendulum (period \(T = 2\) s at surface) down a vertical mine shaft. At each depth \(d\), measure the period \(T(d)\) using a precise stopwatch or electronic timer. Since \(T = 2\pi\sqrt{L/g}\), we get \(g(d) = 4\pi^2 L / T(d)^2\). To isolate depth effects: (1) Use a vacuum chamber to eliminate air buoyancy and damping; (2) Use a low-expansion material (e.g., invar) for the rod to minimize temperature-induced length changes; (3) Control temperature or correct for thermal expansion. Plot \(g(d)\) vs. \(d\) and verify linearity. A poor answer (e.g., "just measure time" without addressing confounding factors) shows lack of experimental design awareness.

## COMMON_MISCONCEPTION
Students often think \(g\) *increases* with depth because "you are closer to the centre of the Earth." They misapply the point-mass formula \(g = GM/r^2\) with \(r = R_E - d\), forgetting that the mass \(M\) attracting the particle also decreases as the outer shells no longer contribute. Another error is assuming the outer shells pull *upward*, reducing weight, but not realizing the net force from a uniform shell is exactly zero, not just upward.

## ON_FAILURE
1. Revisit the shell theorem proof (NCERT Section 7.3, two special cases). Draw a diagram of a point inside a spherical shell and show force cancellation using symmetry.  
2. Practice the derivation: \(M_{\text{inside}} = \rho \cdot \frac{4}{3}\pi (R_E-d)^3\), then \(g(d) = G M_{\text{inside}} / (R_E-d)^2\).  
3. Compare with altitude formula: \(g(h) = g/(1+h/R_E)^2 \approx g(1-2h/R_E)\). Note the factor of 2 difference in the linear term — depth decreases \(g\) half as fast as altitude for small \(h,d \ll R_E\).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_07_002, c11_phy_cbse_07_004, c11_phy_cbse_07_005

## PREREQUISITE_REASONS
c11_phy_cbse_07_002: Newton's law of universal gravitation provides the force law \(F = GMm/r^2\) and the shell theorem (two special cases) which are essential for the derivation.  
c11_phy_cbse_07_004: Acceleration due to gravity on Earth's surface establishes \(g = GM_E/R_E^2\) and the concept of surface gravity used as the reference value in the depth formula.
c11_phy_cbse_07_005: Variation with depth uses a similar shell theorem approach; understanding altitude variation prepares for depth variation.  

## FORWARD_NODE_IDS
c11_phy_cbse_07_007, c11_phy_cbse_07_008, c11_phy_cbse_07_009
## FORWARD_REASONS
c11_phy_cbse_07_007: Variation of \(g\) due to rotation combines with depth/altitude variations to give effective \(g\); the depth formula provides the baseline \(g\) before rotation correction.  
c11_phy_cbse_07_008: Gravitational potential energy inside the Earth uses the same shell theorem and mass-interior concept to derive \(U(r)\).  
c11_phy_cbse_07_009: Gravitational potential at depth is derived by integrating \(g(d)\); the linear \(g(d)\) leads to a quadratic potential inside.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_12_004, c9_math_ch2_1
## CROSS_SUBJECT_REASONS
c10_math_cbse_12_004: Volume of a sphere (\(V = \frac{4}{3}\pi r^3\)) is used to compute the mass of the inner sphere \(M_{\text{inside}} = \rho V\).  
c9_math_ch2_1: The formula \(g(d) = g - (g/R_E)d\) is a linear polynomial in \(d\); understanding slope and intercept helps interpret the linear decrease.

## CHAIN_DESCRIPTION
c11_phy_cbse_07_002 -> c11_phy_cbse_07_004 -> c11_phy_cbse_07_006 -> c11_phy_cbse_07_007

## THIS_FORMULA
\(g(d) = g \left(1 - \frac{d}{R_E}\right)\) where \(g = \frac{GM_E}{R_E^2}\) (m/s²)

## FORMULA_VARIABLES
\(g(d)\) = acceleration due to gravity at depth \(d\) (m/s²); \(g\) = acceleration due to gravity at surface (m/s²); \(d\) = depth below surface (m); \(R_E\) = radius of Earth (m); \(G\) = universal gravitational constant (N·m²/kg²); \(M_E\) = mass of Earth (kg)

## FORMULA_UNITS
m/s², m, m, N·m²/kg², kg

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_12_004 | Volume of sphere formula \(V = \frac{4}{3}\pi r^3\) is used to find the mass of the inner sphere of radius \(R_E - d\) assuming uniform density \(\rho\).
c9_math_ch2_1 | The depth formula \(g(d) = g(1 - d/R_E)\) is a linear polynomial in \(d\); its graph is a straight line with negative slope \(-g/R_E\) and intercept \(g\).

## PREREQ_CONCEPT
Shell theorem (gravitational field inside a uniform spherical shell is zero) and superposition principle for gravitational forces.

## PREREQ_BEFORE
Student must be able to state Newton's law of gravitation, recall the shell theorem results, and write the formula for \(g\) on Earth's surface.

## PREREQ_STUCK
Review the shell theorem in NCERT Section 7.3 (two special cases) and the derivation of \(g = GM_E/R_E^2\) in Section 7.5.

## WORKED_EXAMPLE_1
PROBLEM: The Kolar Gold Fields in Karnataka have mines reaching a depth of 3.2 km. Assuming Earth's radius \(R_E = 6400\) km and surface gravity \(g = 9.8\) m/s², calculate the acceleration due to gravity at the bottom of the mine. Also find the percentage decrease in \(g\) compared to the surface.

STEPS:
- Step 1: Identify given quantities: \(d = 3.2\) km = \(3200\) m, \(R_E = 6400\) km = \(6.4 \times 10^6\) m, \(g = 9.8\) m/s².
- Step 2: Write the formula for \(g\) at depth: \(g(d) = g \left(1 - \frac{d}{R_E}\right)\). Check units: \(d\) and \(R_E\) must be in same units (both metres or both km).
- Step 3: Substitute values using km for convenience: \(d/R_E = 3.2 / 6400 = 0.0005\).
- Step 4: Compute \(g(d) = 9.8 \times (1 - 0.0005) = 9.8 \times 0.9995 = 9.7951\) m/s².
- Step 5: Percentage decrease = \(\frac{g - g(d)}{g} \times 100\% = \frac{d}{R_E} \times 100\% = 0.05\%\). Verify: \(g(d)\) is slightly less than \(g\), physically reasonable.

REASONING: The shell theorem tells us that only the mass of the inner sphere of radius \(R_E - d\) contributes to gravity at depth \(d\). For small \(d \ll R_E\), the decrease is linear and very small. The mine depth is only 0.05% of Earth's radius, so \(g\) changes by 0.05%.

ANSWER: \(g(d) = 9.7951\) m/s²; percentage decrease = 0.05%.

## WORKED_EXAMPLE_2
PROBLEM: At what depth below the Earth's surface does the acceleration due to gravity become 50% of its surface value? Assume uniform density and \(R_E = 6400\) km.

STEPS:
- Step 1: Given \(g(d) = 0.5 g\). Formula: \(g(d) = g(1 - d/R_E)\).
- Step 2: Set up equation: \(0.5 g = g(1 - d/R_E)\).
- Step 3: Cancel \(g\) (non-zero): \(0.5 = 1 - d/R_E\).
- Step 4: Solve for \(d/R_E\): \(d/R_E = 1 - 0.5 = 0.5\).
- Step 5: Compute \(d = 0.5 \times R_E = 0.5 \times 6400\) km = 3200 km.
- Step 6: Check: At half the radius, the inner sphere has half the radius, so its mass is \((1/2)^3 = 1/8\) of total mass, but distance is halved, so \(g \propto M/r^2 = (1/8)/(1/2)^2 = 1/2\). Correct.

REASONING: The linear formula directly gives the depth for any fractional reduction. The result \(d = R_E/2\) means halfway to the centre, gravity is halved. This is a unique feature of the uniform density model.

ANSWER: Depth \(d = 3200\) km (or \(3.2 \times 10^6\) m).

## WORKED_EXAMPLE_3
PROBLEM: Compare the acceleration due to gravity at a height \(h = 100\) km above the surface with that at a depth \(d = 100\) km below the surface. Use \(R_E = 6400\) km, \(g = 9.8\) m/s². Which is larger and by what percentage difference?

STEPS:
- Step 1: Write formulas: \(g(h) = g \left(1 + \frac{h}{R_E}\right)^{-2}\) (exact) or \(g(h) \approx g(1 - 2h/R_E)\) for \(h \ll R_E\). \(g(d) = g(1 - d/R_E)\).
- Step 2: Compute \(h/R_E = d/R_E = 100/6400 = 0.015625\).
- Step 3: Calculate \(g(h)\) using binomial approximation: \(g(h) \approx 9.8 \times (1 - 2 \times 0.015625) = 9.8 \times (1 - 0.03125) = 9.8 \times 0.96875 = 9.49375\) m/s².
- Step 4: Calculate \(g(d)\) exactly: \(g(d) = 9.8 \times (1 - 0.015625) = 9.8 \times 0.984375 = 9.646875\) m/s².
- Step 5: Compare: \(g(d) > g(h)\). Difference = \(9.646875 - 9.49375 = 0.153125\) m/s².
- Step 6: Percentage difference relative to surface \(g\): \(\frac{0.153125}{9.8} \times 100\% \approx 1.56\%\). (Or relative to \(g(d)\): ~1.59%).

REASONING: Gravity decreases twice as fast with altitude as with depth for small distances because at altitude the distance increases *and* the entire Earth's mass still acts, while at depth the distance decreases *but* the effective mass decreases proportionally more. The factor of 2 in the linear term (\(2h/R_E\) vs \(d/R_E\)) is a key distinction.

ANSWER: \(g(h) \approx 9.494\) m/s², \(g(d) \approx 9.647\) m/s²; \(g(d)\) is larger by about 0.153 m/s² (1.56% of surface \(g\)).

## COMPETENCY_QUESTION_1
QUESTION: A uniform spherical planet of radius \(R\) has a narrow tunnel drilled along a diameter. A particle is released from rest at the surface into the tunnel. Describe the motion of the particle. Is it simple harmonic? If yes, derive the time period in terms of \(g\) and \(R\). (Ignore rotation and friction.)

COMPETENCY: Interpreting physical situations using formulas; Predicting outcomes from changing variables.

STEPS:
- Step 1: Recognize that inside the planet, \(g(r) = \frac{GM}{R^3}r\) directed toward centre, where \(r\) is distance from centre.
- Step 2: The force on particle of mass \(m\) is \(F = -mg(r) = -\frac{GMm}{R^3}r = -kr\), where \(k = \frac{GMm}{R^3}\). This is Hooke's law.
- Step 3: Motion is simple harmonic with angular frequency \(\omega = \sqrt{k/m} = \sqrt{GM/R^3}\).
- Step 4: Time period \(T = 2\pi/\omega = 2\pi\sqrt{R^3/GM}\). Using \(g = GM/R^2\), we get \(T = 2\pi\sqrt{R/g}\).

ANSWER: The particle executes simple harmonic motion about the centre with time period \(T = 2\pi\sqrt{R/g}\). For Earth, \(T \approx 84\) minutes.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The Earth's density is not uniform; it increases towards the core. The PREM model gives a density profile \(\rho(r)\). How would the actual \(g(d)\) curve differ from the straight line \(g(1-d/R_E)\)? Sketch qualitatively and explain. Would \(g\) initially increase or decrease just below the surface?

COMPETENCY: Unit analysis and dimensional reasoning; Applying concepts to non-ideal real-world models.

STEPS:
- Step 1: Recall that for a non-uniform sphere, \(g(r) = G M(r)/r^2\), where \(M(r) = \int_0^r 4\pi r'^2 \rho(r') dr'\).
- Step 2: Near the surface, the crust density (\(\sim 2700\) kg/m³) is less than the mean density (\(\sim 5500\) kg/m³). So as we go down a little, we enter denser mantle (\(\sim 3300\) kg/m³).
- Step 3: The mass interior \(M(r)\) increases faster than \(r^3\) because \(\rho\) increases. Thus \(g(r) = GM(r)/r^2\) may initially *increase* with depth.
- Step 4: Sketch: \(g\) starts at 9.8 m/s² at surface, rises slightly to a maximum around the core-mantle boundary (~2900 km depth), then decreases to zero at centre. The uniform-density line is a straight line from 9.8 to 0.
- Step 5: Just below surface, actual \(g\) increases because the added mass in the denser mantle outweighs the \(1/r^2\) decrease.

ANSWER: Actual \(g(d)\) initially increases with depth, reaching a maximum near the core-mantle boundary, then falls to zero at the centre. The uniform-density straight line underestimates \(g\) at intermediate depths. Just below the surface, \(g\) increases.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are standing at the bottom of a deep mine shaft, say the Kolar Gold Fields in ______, which go down several kilometres.

## DIAGNOSTIC_ANSWER_7
Karnataka

**A wrong answer ("Delhi" or "Dhanbad") reveals the student has swapped the walkthrough's proper noun - the mine is the Kolar Gold Fields in Karnataka.** Karnataka is the walkthrough's own state name, and the name is what the blank grades. Recall the several-kilometres depth before filling, and give the name exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are standing at the bottom of a deep mine shaft, say the Kolar Gold Fields in Karnataka, which go down several ______.

## DIAGNOSTIC_ANSWER_8
kilometres

**A wrong answer ("metres" or "miles") reveals the student has swapped the walkthrough's unit - the shaft goes down several kilometres.** Kilometres is the walkthrough's own unit, and the unit is what the blank grades. Recall the mine setting before filling, and give the unit exactly.
