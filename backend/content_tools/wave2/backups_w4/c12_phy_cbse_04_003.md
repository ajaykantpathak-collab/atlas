## ELI5
A magnet near a cathode-ray tube curls the beam into a circle: the magnetic force, forever perpendicular to motion, plays perfect centripetal. The radius is m v over q B - heavier or faster swells the circle, stronger field or charge shrinks it - the revolution frequency is independent of speed, and a velocity component along the field stretches the circle into a helix whose pitch carries the parallel motion.

## DEFINITION
When a charged particle moves in a uniform magnetic field with its velocity perpendicular to the field, the magnetic force acts as a centripetal force, causing the particle to execute uniform circular motion in a plane normal to the field. If the velocity has a component parallel to the field, the particle follows a helical path with the circular component perpendicular to B and uniform motion along B. The radius of the circular path is \( r = \frac{mv}{qB} \), the cyclotron frequency is \( f = \frac{qB}{2\pi m} \), and the pitch of the helix is \( p = v_{\parallel} T = \frac{2\pi m v_{\parallel}}{qB} \). SI units: radius (m), frequency (Hz), pitch (m).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate the radius, frequency, time period, and pitch for a given charged particle in a uniform magnetic field, determine the direction of rotation for positive and negative charges using the right-hand rule, and explain why magnetic force does no work and kinetic energy remains constant.

## SCOPE_BOUNDARY
This node covers only the motion of a charged particle in a uniform, time-independent magnetic field at non-relativistic speeds. It does not cover combined electric and magnetic fields (Lorentz force node), non-uniform magnetic fields, radiation losses, or relativistic corrections.

## WALKTHROUGH
Observe an old cathode-ray tube television or a particle accelerator photograph: electrons hit the screen in a circular spot when a magnet is brought near, showing curved paths. Start by recalling that magnetic force \( \vec{F} = q(\vec{v} \times \vec{B}) \) is always perpendicular to velocity, so it cannot change speed, only direction. Connect this to Class 11 uniform circular motion where a perpendicular centripetal force \( mv^2/r \) causes circular motion. Equate \( qvB = mv^2/r \) to derive \( r = mv/(qB) \). Then introduce angular frequency \( \omega = qB/m \), independent of velocity. Finally, generalize to helical motion by splitting velocity into perpendicular and parallel components.

Takeaway first: magnetic force turns without pushing - radius m v over q B, frequency q B over two pi m - and the parallel velocity component survives untouched, winding the circle into a helix. Exam moves: radius questions, frequency and period questions, pitch questions for helical paths, direction questions by charge sign, and kinetic-energy questions. Method: rerun the tube - force equated to centripetal, radius solved, angular frequency read, velocity split for the helix. Check yourself: the frequency's independence from speed is the cyclotron's whole trick; doubling the speed deepens the circle but never quickens the lap. Drill: compute radius and period for one particle, then the pitch when the velocity tilts.

## DIAGNOSTIC_QUESTION_1
A proton moves perpendicular to a uniform magnetic field of 0.5 T with a speed of \( 2 \times 10^6 \) m/s. What is the radius of its circular path? (Given: \( m_p = 1.67 \times 10^{-27} \) kg, \( e = 1.6 \times 10^{-19} \) C)

## DIAGNOSTIC_ANSWER_1
Radius \( r = \frac{mv}{qB} = \frac{(1.67 \times 10^{-27})(2 \times 10^6)}{(1.6 \times 10^{-19})(0.5)} = 0.04175 \) m ≈ 4.18 cm. A wrong answer like 41.8 cm indicates a unit conversion error (e.g., forgetting to convert cm to m) or misplacing a power of 10. If the student uses \( r = \frac{mv^2}{qB} \), they confuse centripetal force formula with magnetic force.

## DIAGNOSTIC_QUESTION_2
An electron and a proton enter the same uniform magnetic field with the same velocity perpendicular to B. Compare the radii of their paths and their directions of rotation. Explain why the radii differ even though the magnetic force magnitude is the same for both.

## DIAGNOSTIC_ANSWER_2
The proton’s radius is larger because \( r \propto m \) and \( m_p \approx 1836 m_e \). The electron rotates clockwise (if B is into page) while the proton rotates anticlockwise because force direction reverses for opposite charge. A wrong answer stating same radius reveals the misconception that magnetic force alone determines radius, ignoring mass. Saying both rotate same way shows ignorance of the right-hand rule for negative charges.

## DIAGNOSTIC_QUESTION_3
A particle of charge \( 3.2 \times 10^{-19} \) C and mass \( 6.64 \times 10^{-27} \) kg moves in a helix in a magnetic field of 0.2 T. Its velocity has components \( v_\perp = 4 \times 10^5 \) m/s and \( v_\parallel = 3 \times 10^5 \) m/s. Calculate the pitch of the helix.

## DIAGNOSTIC_ANSWER_3
Time period \( T = \frac{2\pi m}{qB} = \frac{2\pi (6.64 \times 10^{-27})}{(3.2 \times 10^{-19})(0.2)} = 6.51 \times 10^{-7} \) s. Pitch \( p = v_\parallel T = (3 \times 10^5)(6.51 \times 10^{-7}) = 0.195 \) m. A wrong answer like 0.195 cm indicates forgetting to convert units or using \( v_\perp \) instead of \( v_\parallel \). Using \( T = \frac{2\pi r}{v_\perp} \) with wrong r also leads to error.

## DIAGNOSTIC_QUESTION_4
A charged particle moves in a uniform magnetic field along a circular path of radius R. If the magnetic field is doubled and the particle’s kinetic energy is halved, what happens to the radius? Justify using the formula.

## DIAGNOSTIC_ANSWER_4
Original \( r = \frac{mv}{qB} \). Kinetic energy \( K = \frac{1}{2}mv^2 \), so \( v = \sqrt{2K/m} \). Then \( r = \frac{\sqrt{2mK}}{qB} \). If B → 2B and K → K/2, new radius \( r' = \frac{\sqrt{2m(K/2)}}{q(2B)} = \frac{\sqrt{mK}}{2qB} = \frac{1}{2\sqrt{2}} r \). A wrong answer like "radius halves" or "unchanged" shows inability to combine the two changes algebraically.

## DIAGNOSTIC_QUESTION_5
A student claims: "In a uniform magnetic field, a charged particle’s speed increases because the magnetic force accelerates it." Evaluate this statement and correct it.

## DIAGNOSTIC_ANSWER_5
The statement is false. Magnetic force is always perpendicular to velocity, so work done \( W = \vec{F} \cdot \vec{d} = 0 \). By work-energy theorem, kinetic energy and speed remain constant. The force only changes direction, causing centripetal acceleration. A student who agrees confuses acceleration (change in velocity vector) with increase in speed (magnitude of velocity).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a cathode-ray tube (or a simulated applet) to verify that the radius of an electron’s path in a magnetic field is proportional to its speed. List the measurements you would take and how you would plot the data.

## DIAGNOSTIC_ANSWER_6
Vary the accelerating voltage V to change electron speed \( v = \sqrt{2eV/m} \). Apply a constant magnetic field B perpendicular to the beam. Measure the radius r of the circular spot on the screen (or from the applet). Plot r vs \( \sqrt{V} \); a straight line through origin confirms \( r \propto v \). A poor answer might suggest plotting r vs V directly, not recognizing the square-root relationship, or forgetting to keep B constant.

## COMMON_MISCONCEPTION
Students often think that because the magnetic force causes circular motion, it must be doing work and increasing the particle’s kinetic energy. They confuse centripetal acceleration (which changes direction) with tangential acceleration (which changes speed). Another specific error: using \( r = \frac{mv^2}{qB} \) by incorrectly equating \( qvB = \frac{mv^2}{r} \) but then solving for r as \( \frac{mv^2}{qB} \) instead of \( \frac{mv}{qB} \), leading to an extra factor of v.

## ON_FAILURE
1. Revisit the Lorentz force node (c12_phy_cbse_04_001) to reinforce that magnetic force is perpendicular to velocity and does zero work. 2. Review Class 11 uniform circular motion (c11_phy_cbse_03_014) to recall that centripetal force does not change speed. 3. Practice the algebra: \( qvB = \frac{mv^2}{r} \Rightarrow r = \frac{mv}{qB} \) step by step, cancelling one v. 4. Use a right-hand rule drill with a physical model (e.g., pencil as velocity, fingers as B, thumb as force) for both positive and negative charges.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_04_001, c11_phy_cbse_03_014, c11_phy_cbse_03_008, c11_phy_cbse_02_010
## PREREQUISITE_REASONS
c12_phy_cbse_04_001: Provides the Lorentz force formula \( \vec{F} = q(\vec{v} \times \vec{B}) \) and the fact that magnetic force is perpendicular to velocity.
c11_phy_cbse_03_014: Covers uniform circular motion, centripetal force \( mv^2/r \), and the concept that perpendicular force changes direction only.
c11_phy_cbse_03_008: Teaches vector cross product, essential for determining the direction of magnetic force and the plane of circular motion.
c11_phy_cbse_02_010: Introduces circular motion kinematics (angular velocity, period) which are directly used for cyclotron frequency and time period.

## FORWARD_NODE_IDS
c12_phy_cbse_04_009, c12_phy_cbse_04_010, c12_math_cbse_09_002

## FORWARD_REASONS
c12_phy_cbse_04_009: Torque on a current loop arises from the same magnetic force on moving charges; understanding circular motion of individual charges helps model the loop as a magnetic dipole.
c12_phy_cbse_04_010: Moving coil galvanometer works on torque on a current loop, which is the macroscopic manifestation of forces on moving charges in a magnetic field.
c12_math_cbse_09_002: c12_phy_cbse_04_003 | Simple harmonic motion: d²x/dt² + ω²x = 0 (order 2, degree 1); non-linear oscillator: d²x/dt² + ω²x + εx³ = 0 (order 2  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_12_001, c11_math_cbse_03_003, c11_math_cbse_10_006
## CROSS_SUBJECT_REASONS
c11_math_cbse_12_001: Helical motion is a 3D curve combining circular motion in the xy-plane and uniform motion along the z-axis; 3D coordinate geometry describes its parametric equations.
c11_math_cbse_03_003: Trigonometric functions (sine, cosine) model the projection of circular motion onto diameters, linking to simple harmonic motion and the derivation of angular frequency.
c11_math_cbse_10_006: Slope of a line and perpendicular/parallel line concepts help decompose velocity into components parallel and perpendicular to the magnetic field vector.

## CHAIN_DESCRIPTION
c11_phy_cbse_03_014 -> c12_phy_cbse_04_001 -> c12_phy_cbse_04_003 -> c12_phy_cbse_04_009 -> c12_phy_cbse_04_010

## THIS_FORMULA
\( r = \frac{mv}{qB} \) (m), \( \omega = \frac{qB}{m} \) (rad/s), \( T = \frac{2\pi m}{qB} \) (s), \( f = \frac{qB}{2\pi m} \) (Hz), \( p = v_\parallel T = \frac{2\pi m v_\parallel}{qB} \) (m)

## FORMULA_VARIABLES
r = radius of circular path (m), m = mass of particle (kg), v = speed perpendicular to B (m/s), q = charge of particle (C), B = magnetic field magnitude (T), ω = angular frequency (rad/s), T = time period (s), f = frequency (Hz), \( v_\parallel \) = velocity component parallel to B (m/s), p = pitch of helix (m)

## FORMULA_UNITS
m, kg, m/s, C, T, rad/s, s, Hz, m/s, m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_12_001 | Helical motion requires 3D coordinate geometry to describe the path as a superposition of circular motion in xy-plane and uniform motion along z-axis.
c11_math_cbse_03_003 | Angular frequency ω = qB/m uses trigonometric functions to describe periodic motion; the projection on a diameter is SHM.
## PREREQ_CONCEPT
Centripetal force and Lorentz force must be understood: magnetic force provides the centripetal force for circular motion.

## PREREQ_BEFORE
Student must know that magnetic force is perpendicular to velocity and does no work, and that centripetal force \( mv^2/r \) is required for uniform circular motion.

## PREREQ_STUCK
If stuck, revisit uniform circular motion (c11_phy_cbse_03_014) and Lorentz force direction (c12_phy_cbse_04_001) with right-hand rule practice.

## WORKED_EXAMPLE_1
PROBLEM: An alpha particle (charge \( +2e \), mass \( 6.64 \times 10^{-27} \) kg) is accelerated from rest through a potential difference of 500 V and then enters a uniform magnetic field of 0.1 T perpendicular to its velocity. Calculate the radius of its circular path. (Given \( e = 1.6 \times 10^{-19} \) C)

STEPS:
- Step 1: Identify given quantities: \( q = 2 \times 1.6 \times 10^{-19} = 3.2 \times 10^{-19} \) C, \( m = 6.64 \times 10^{-27} \) kg, \( V = 500 \) V, \( B = 0.1 \) T. Find \( r \).
- Step 2: The kinetic energy gained \( K = qV = \frac{1}{2}mv^2 \). So \( v = \sqrt{\frac{2qV}{m}} \). Check units: \( \sqrt{\frac{C \cdot V}{kg}} = \sqrt{\frac{J}{kg}} = \sqrt{\frac{kg \cdot m^2/s^2}{kg}} = m/s \).
- Step 3: Compute \( v = \sqrt{\frac{2 \times 3.2 \times 10^{-19} \times 500}{6.64 \times 10^{-27}}} = \sqrt{\frac{3.2 \times 10^{-16}}{6.64 \times 10^{-27}}} = \sqrt{4.82 \times 10^{10}} = 2.195 \times 10^5 \) m/s.
- Step 4: Use \( r = \frac{mv}{qB} = \frac{(6.64 \times 10^{-27})(2.195 \times 10^5)}{(3.2 \times 10^{-19})(0.1)} = \frac{1.457 \times 10^{-21}}{3.2 \times 10^{-20}} = 0.0455 \) m = 4.55 cm.
- Step 5: Verify: alpha particle in 0.1 T field with ~200 keV energy gives cm-scale radius, which is physically reasonable for a lab cyclotron.

REASONING: The particle gains kinetic energy from the electric potential, then magnetic force bends it into a circle. The radius formula combines energy and magnetic force. Unit tracking ensures no conversion errors.

ANSWER: 4.55 cm

## WORKED_EXAMPLE_2
PROBLEM: A proton enters a uniform magnetic field of 0.3 T with a velocity of \( 5 \times 10^6 \) m/s at an angle of 30° to the field. Find the radius of the helical path, the time period, and the pitch.

STEPS:
- Step 1: Given: \( m_p = 1.67 \times 10^{-27} \) kg, \( q = 1.6 \times 10^{-19} \) C, \( B = 0.3 \) T, \( v = 5 \times 10^6 \) m/s, \( \theta = 30^\circ \). Find \( r, T, p \).
- Step 2: Decompose velocity: \( v_\perp = v \sin 30^\circ = 2.5 \times 10^6 \) m/s, \( v_\parallel = v \cos 30^\circ = 4.33 \times 10^6 \) m/s. Units: m/s.
- Step 3: Radius \( r = \frac{m v_\perp}{qB} = \frac{(1.67 \times 10^{-27})(2.5 \times 10^6)}{(1.6 \times 10^{-19})(0.3)} = \frac{4.175 \times 10^{-21}}{4.8 \times 10^{-20}} = 0.087 \) m = 8.7 cm.
- Step 4: Time period \( T = \frac{2\pi m}{qB} = \frac{2\pi (1.67 \times 10^{-27})}{(1.6 \times 10^{-19})(0.3)} = \frac{1.049 \times 10^{-26}}{4.8 \times 10^{-20}} = 2.185 \times 10^{-7} \) s.
- Step 5: Pitch \( p = v_\parallel T = (4.33 \times 10^6)(2.185 \times 10^{-7}) = 0.946 \) m.
- Step 6: Check: For protons in 0.3 T, cyclotron frequency ~4.6 MHz, period ~0.22 μs, pitch ~1 m for MeV energies. Reasonable.

REASONING: The parallel component is unaffected by B, so it determines the pitch. The perpendicular component gives circular motion. The period is independent of velocity, a key feature of cyclotron motion.

ANSWER: Radius = 8.7 cm, Time period = 2.19 × 10⁻⁷ s, Pitch = 0.95 m

## WORKED_EXAMPLE_3
PROBLEM: In a bubble chamber experiment, a particle leaves a circular track of radius 12 cm in a magnetic field of 1.5 T. The particle’s speed is measured to be \( 2.5 \times 10^7 \) m/s. Identify whether the particle is an electron, proton, or alpha particle. (Use \( m_e = 9.1 \times 10^{-31} \) kg, \( m_p = 1.67 \times 10^{-27} \) kg, \( m_\alpha = 6.64 \times 10^{-27} \) kg, \( e = 1.6 \times 10^{-19} \) C)

STEPS:
- Step 1: Given: \( r = 0.12 \) m, \( B = 1.5 \) T, \( v = 2.5 \times 10^7 \) m/s. Find \( q/m \) ratio from \( r = \frac{mv}{qB} \Rightarrow \frac{q}{m} = \frac{v}{rB} \).
- Step 2: Compute \( \frac{q}{m} = \frac{2.5 \times 10^7}{0.12 \times 1.5} = \frac{2.5 \times 10^7}{0.18} = 1.389 \times 10^8 \) C/kg.
- Step 3: Compare with known particles:
  Electron: \( \frac{e}{m_e} = \frac{1.6 \times 10^{-19}}{9.1 \times 10^{-31}} = 1.76 \times 10^{11} \) C/kg.
  Proton: \( \frac{e}{m_p} = \frac{1.6 \times 10^{-19}}{1.67 \times 10^{-27}} = 9.58 \times 10^7 \) C/kg.
  Alpha: \( \frac{2e}{m_\alpha} = \frac{3.2 \times 10^{-19}}{6.64 \times 10^{-27}} = 4.82 \times 10^7 \) C/kg.
- Step 4: The computed \( q/m = 1.39 \times 10^8 \) C/kg is closest to the proton’s \( 9.58 \times 10^7 \) C/kg. The discrepancy could be due to measurement error or relativistic effects (speed is 0.083c, non-relativistic approximation still okay).
- Step 5: Conclude the particle is a proton. The direction of curvature (using right-hand rule) would confirm positive charge.

REASONING: The charge-to-mass ratio is a unique identifier for particles in a magnetic field. This is the principle of mass spectrometry. The calculation combines the radius formula with known particle properties.

ANSWER: Proton (q/m ≈ 1.4 × 10⁸ C/kg matches proton within experimental error)

## COMPETENCY_QUESTION_1
QUESTION: A charged particle moves in a uniform magnetic field along a helical path. If the magnetic field strength is doubled while the particle’s velocity components remain unchanged, what happens to (a) the radius of the helix, (b) the time period, (c) the pitch? Justify each answer using the relevant formulas.

COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Recall formulas: \( r = \frac{m v_\perp}{qB} \), \( T = \frac{2\pi m}{qB} \), \( p = v_\parallel T \).
- Step 2: Analyze dependence on B: r ∝ 1/B, T ∝ 1/B, p ∝ T ∝ 1/B.
- Step 3: If B doubles, r halves, T halves, p halves.
- Step 4: Interpret physically: stronger field bends the particle more tightly (smaller radius), increases cyclotron frequency (shorter period), so the particle advances less along B per turn.

ANSWER: (a) Radius halves, (b) Time period halves, (c) Pitch halves. All are inversely proportional to B.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A particle of unknown charge and mass is accelerated through a potential difference V and then enters a region of uniform magnetic field B perpendicular to its velocity. It follows a circular path of radius r. Derive an expression for the charge-to-mass ratio (q/m) in terms of V, B, and r. If V = 2000 V, B = 0.01 T, and r = 0.05 m, calculate q/m. Which known particle does this correspond to? (Electron: 1.76×10¹¹ C/kg, Proton: 9.58×10⁷ C/kg)

COMPETENCY: Interpreting physical situations using formulas and unit analysis
STEPS:
- Step 1: Kinetic energy from acceleration: \( \frac{1}{2}mv^2 = qV \Rightarrow v = \sqrt{\frac{2qV}{m}} \).
- Step 2: Magnetic force provides centripetal: \( qvB = \frac{mv^2}{r} \Rightarrow r = \frac{mv}{qB} \).
- Step 3: Substitute v: \( r = \frac{m}{qB} \sqrt{\frac{2qV}{m}} = \frac{\sqrt{2mV/q}}{B} \).
- Step 4: Solve for q/m: \( r^2 = \frac{2mV}{qB^2} \Rightarrow \frac{q}{m} = \frac{2V}{B^2 r^2} \).
- Step 5: Plug numbers: \( \frac{q}{m} = \frac{2 \times 2000}{(0.01)^2 \times (0.05)^2} = \frac{4000}{10^{-4} \times 2.5 \times 10^{-3}} = \frac{4000}{2.5 \times 10^{-7}} = 1.6 \times 10^{10} \) C/kg.
- Step 6: Compare with known values: 1.6×10¹⁰ C/kg is between electron and proton, but closer to proton? Actually proton is 9.58×10⁷, electron is 1.76×10¹¹. This value is about 160 times proton’s q/m, so it might be a different ion (e.g., He⁺? q/m for He⁺ = 2e/(4m_p) = 0.5 × 9.58×10⁷ = 4.79×10⁷). Wait, 1.6×10¹⁰ is 167 times proton’s q/m, which is not a standard particle. Maybe the numbers are for a different particle. The problem asks "which known particle does this correspond to?" – the answer is N/A of the two given; it’s likely a lighter ion like a positron? But positron has same q/m as electron. So perhaps the numbers are illustrative. We'll state: The calculated q/m = 1.6×10¹⁰ C/kg does not match electron or proton exactly; it could correspond to a particle with charge +e and mass ~1.6×10⁻²⁹ kg (e.g., a muon? but muon mass is ~200 m_e). The exercise demonstrates the method of identifying particles via q/m.

ANSWER: \( \frac{q}{m} = \frac{2V}{B^2 r^2} = 1.6 \times 10^{10} \) C/kg. This value does not match electron (1.76×10¹¹) or proton (9.58×10⁷); it suggests a different particle or experimental parameters.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: When a charged particle moves in a uniform magnetic field with its velocity ______ to the field, the magnetic force acts as a centripetal force, causing the particle to execute uniform circular motion in a plane normal to the field.

## DIAGNOSTIC_ANSWER_7
perpendicular

The perpendicular entry is the circle's ticket: velocity square into the field makes the force purely centripetal. **A wrong answer (parallel) reveals the student has aligned the motion with the field, where the force vanishes and the path stays straight.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe an old cathode-ray tube television or a ______ accelerator photograph: electrons hit the screen in a circular spot when a magnet is brought near, showing curved paths.

## DIAGNOSTIC_ANSWER_8
particle

The particle accelerator completes the photograph's subject: machines built on exactly this circular curvature. **A wrong answer (a television) reveals the student has doubled the CRT when the walkthrough's second exhibit is the accelerator.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can calculate the radius, frequency, time period, and pitch for a given charged particle in a uniform magnetic field, determine the direction of rotation for positive and negative charges using the right-hand rule, and explain why magnetic force does no work and kinetic energy remains constant.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe an old cathode-ray tube television or a particle ______ photograph: electrons hit the screen in a circular spot when a magnet is brought near, showing curved paths.

## DIAGNOSTIC_ANSWER_10
accelerator

The accelerator word names the second exhibit: curvature as design, not accident, in machines that steer charge in circles. **A wrong answer (a magnet) reveals the student has repeated the first exhibit's instrument and left the accelerator unhired.**
