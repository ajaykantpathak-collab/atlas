## ELI5
A balloon rubbed on winter hair lifts paper from across the room: the field around a point charge is the invisible scaffolding making that possible. Its strength falls with the square of the distance, its magnitude proportional to the source charge, and its direction is radial - outward for a positive source, inward for a negative one. The formula is Coulomb's force divided by the probe charge, leaving the source's own signature in space.

## DEFINITION
The electric field due to a point charge is the force per unit positive test charge experienced at a point in space, directed radially outward for a positive source charge and radially inward for a negative source charge. Its magnitude is given by \( E = \frac{1}{4\pi\varepsilon_0} \frac{|q|}{r^2} \), where \( q \) is the source charge, \( r \) is the distance from the charge, and \( \varepsilon_0 \) is the permittivity of free space. The SI unit is newton per coulomb (N/C) or volt per metre (V/m).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate the electric field vector at any point due to a single point charge or a system of point charges using superposition, correctly handling vector direction, sign of charge, and unit conversions. The student can also derive the expression from Coulomb's law and explain the physical significance of the inverse-square dependence.

## SCOPE_BOUNDARY
This node covers the electric field due to a single point charge and the superposition principle for multiple discrete point charges. It includes derivation from Coulomb's law, vector form, magnitude, direction, and numerical problems. It does NOT cover continuous charge distributions (line, surface, volume), electric dipoles, Gauss's law applications, or field lines — those are separate nodes.

## WALKTHROUGH
Imagine rubbing a balloon on your hair in a dry Delhi winter — the balloon attracts tiny paper bits from a distance without touching them. This "action at a distance" is mediated by the electric field. Start by recalling Coulomb's law for force between two point charges (node c12_phy_cbse_01_002). Now ask: what property of space around the source charge causes this force? Introduce a tiny positive test charge \( q_0 \), measure the force \( \vec{F} \) on it, and define \( \vec{E} = \vec{F}/q_0 \) in the limit \( q_0 \to 0 \). Substitute Coulomb's force expression to obtain \( \vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2} \hat{r} \). Emphasize that \( \hat{r} \) points from source to field point for positive \( q \), and opposite for negative \( q \). Practice with a simple numerical: find E at 10 cm from a +2 μC charge.

Takeaway first: a point charge's field is radial and inverse-square - outward for positive sources, inward for negative - and it follows from Coulomb's law by dividing away the probe. Exam moves: computation questions with unit conversions, direction questions from the source's sign, derivation questions from Coulomb's law, and conceptual questions on the inverse-square's meaning. Method: rerun the balloon - probe defined in the shrinking limit, Coulomb substituted, the radial unit vector aimed by the source's sign. Check yourself: the field exists at a point whether or not any probe ever visits; the test charge is the definition's measuring device, not the field's reason for being. Drill: compute the field at a stated distance from one charge, with direction, and explain the inverse-square's physical taste.

## DIAGNOSTIC_QUESTION_1
State the SI unit of electric field and write the formula for the magnitude of electric field due to a point charge \( q \) at distance \( r \).

## DIAGNOSTIC_ANSWER_1
SI unit: N/C (or V/m). Formula: \( E = \frac{1}{4\pi\varepsilon_0} \frac{|q|}{r^2} \). A wrong answer like "C/N" or missing absolute value on \( q \) reveals confusion between field and force, or ignorance that field magnitude is always positive while direction carries the sign information.

## DIAGNOSTIC_QUESTION_2
A point charge \( +Q \) produces an electric field \( \vec{E} \) at point P. If the charge is replaced by \( -2Q \) at the same location, how does the electric field at P change in magnitude and direction? Explain without calculation.

## DIAGNOSTIC_ANSWER_2
Magnitude doubles (factor of 2) because \( E \propto |q| \). Direction reverses (now radially inward) because the source charge is negative. A student who says "direction stays same" thinks field direction depends only on geometry, not charge sign. A student who says "magnitude halves" confuses the factor of 2 with inverse-square distance dependence.

## DIAGNOSTIC_QUESTION_3
Calculate the electric field at a point 15 cm from a point charge of \( -4.0 \mu C \) in air. Give magnitude and direction. Use \( \frac{1}{4\pi\varepsilon_0} = 9 \times 10^9 \, \text{N·m}^2/\text{C}^2 \).

## DIAGNOSTIC_ANSWER_3
Given: \( q = -4.0 \times 10^{-6} \, \text{C} \), \( r = 0.15 \, \text{m} \), \( k = 9 \times 10^9 \).
Step 1: \( E = k \frac{|q|}{r^2} = (9 \times 10^9) \frac{4.0 \times 10^{-6}}{(0.15)^2} \).
Step 2: \( (0.15)^2 = 0.0225 \).
Step 3: \( E = \frac{36 \times 10^3}{0.0225} = 1.6 \times 10^6 \, \text{N/C} \).
Direction: radially inward (toward the charge) because \( q \) is negative.
A wrong answer of \( 1.6 \times 10^5 \) N/C indicates a unit conversion error (cm to m). A positive direction indicates sign ignorance.

## DIAGNOSTIC_QUESTION_4
Two point charges \( +3 \mu C \) and \( -3 \mu C \) are placed 20 cm apart on the x-axis at \( x = -10 \) cm and \( x = +10 \) cm. Compare the electric field magnitude at the midpoint (x=0) with that at a point 10 cm to the right of the positive charge (x=20 cm). Which is larger and why?

## DIAGNOSTIC_ANSWER_4
At midpoint: both fields point toward the negative charge (to the right), so they add. Each has magnitude \( E = k \frac{3\mu C}{(0.1)^2} = 2.7 \times 10^6 \, \text{N/C} \). Total = \( 5.4 \times 10^6 \, \text{N/C} \).
At x=20 cm: distance to +3 μC is 0.3 m, to -3 μC is 0.1 m. Field from +3 μC points right (away), magnitude \( k \frac{3\mu C}{0.09} = 3 \times 10^5 \, \text{N/C} \). Field from -3 μC points left (toward it), magnitude \( k \frac{3\mu C}{0.01} = 2.7 \times 10^6 \, \text{N/C} \). Net = \( 2.4 \times 10^6 \, \text{N/C} \) left.
Midpoint field is larger. A student choosing x=20 cm likely ignores vector addition or misjudges distances.

## DIAGNOSTIC_QUESTION_5
A student writes: "The electric field due to a point charge is \( \vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2} \)." Is this expression correct as a vector equation? If not, correct it and explain the error.

## DIAGNOSTIC_ANSWER_5
The expression is incorrect as a vector equation because the right side lacks a direction vector. The correct vector form is \( \vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2} \hat{r} \), where \( \hat{r} \) is the unit vector pointing from the source charge to the field point. The student's version treats \( \vec{E} \) as a scalar. This error leads to sign mistakes when adding fields from multiple charges.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using household items to demonstrate that electric field magnitude decreases with distance from a point-like charged object. Describe the setup, what you would measure, and how you would verify the inverse-square relationship.

## DIAGNOSTIC_ANSWER_6
Rub a plastic ruler with wool to charge it. Suspend a small aluminum foil ball (test charge) on a thread. Bring the ruler near the ball at different measured distances \( r \) and observe the deflection angle \( \theta \). For small angles, \( \tan\theta \approx \theta \propto F \propto E \). Plot \( \theta \) vs \( 1/r^2 \); a straight line through origin confirms inverse-square law. A poor answer would use a large test object (disturbs field) or measure force directly without isolating distance dependence.

## COMMON_MISCONCEPTION
Students often think the electric field at a point due to a positive charge points *toward* the charge because "positive attracts positive". They confuse the force on a *positive test charge* (which is repelled) with the force on a *negative test charge* (which is attracted). The convention defines field direction as the force on a *positive* test charge, so for a positive source charge, the field points radially *outward*. This error causes consistent sign mistakes in vector addition problems.

## ON_FAILURE
1. Revisit node c12_phy_cbse_01_004 (Electric Field Definition) to reinforce the operational definition: \( \vec{E} = \lim_{q_0 \to 0} \frac{\vec{F}}{q_0} \) with \( q_0 > 0 \).
2. Draw a diagram: place a +Q at origin, a +q0 at (r,0). Show Coulomb repulsion → force on q0 is +x direction → E is +x direction.
3. Repeat with -Q at origin: force on +q0 is -x direction → E is -x direction.
4. Practice 5 vector addition problems from NCERT Exercise 1.8, 1.9 where both charges are on the same line, forcing explicit direction choice.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_01_002, c12_phy_cbse_01_004, c11_phy_cbse_03_003, c11_math_cbse_10_002, c9_math_ch1_4, c12_phy_cbse_01_003

## PREREQUISITE_REASONS
c12_phy_cbse_01_002: Coulomb's law provides the force expression that is divided by test charge to obtain electric field.
c12_phy_cbse_01_004: Defines electric field conceptually and introduces the test charge limit procedure.
c11_phy_cbse_03_003: Vector addition (analytical method) is essential for superposition of fields from multiple charges.
c11_math_cbse_10_002: Distance formula calculates separation \( r \) between source and field point in coordinate geometry problems.
c9_math_ch1_4: Derivation of distance formula using Pythagoras theorem underpins the \( r^2 \) in denominator.
c12_phy_cbse_01_003: The field of a point charge is the simplest application of field superposition; the formula \(E = kQ/r^2\) is derived by placing a test charge and using Coulomb's law + superposition.  

## FORWARD_NODE_IDS
c12_phy_cbse_01_006, c12_phy_cbse_01_007, c12_phy_cbse_01_011, c12_phy_cbse_01_012, c12_phy_cbse_01_008, c12_phy_cbse_01_009

## FORWARD_REASONS
c12_phy_cbse_01_006: Field lines are a pictorial representation of the vector field derived here; density represents magnitude \( 1/r^2 \).
c12_phy_cbse_01_007: Electric flux \( \Phi = \int \vec{E} \cdot d\vec{S} \) uses the point-charge field to derive Gauss's law.
c12_phy_cbse_01_011: Dipole field is the superposition of two point-charge fields; the \( 1/r^3 \) dependence emerges from this node's formula.
c12_phy_cbse_01_012: Continuous distributions are integrals of point-charge fields; the integrand is the expression derived here.
c12_phy_cbse_01_008: Electric field of a point charge E = q/(4πε₀r²) is used in the proof for spherical Gaussian surface.  
c12_phy_cbse_01_009: Electric field due to a point charge gives the 1/r² reference for comparison and the concept of radial field.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_002, c11_math_cbse_13_008, c11_math_cbse_03_003
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_002: Distance formula in 3D coordinates computes \( r \) for arbitrary source and field point positions.
c11_math_cbse_13_008: Derivative of polynomial functions (power rule) is used when differentiating potential \( V \propto 1/r \) to get \( E \propto 1/r^2 \) in later chapters.
c11_math_cbse_03_003: Trigonometric functions resolve field vectors into components when charges are not collinear.

## CHAIN_DESCRIPTION
c12_phy_cbse_01_002 -> c12_phy_cbse_01_004 -> c12_phy_cbse_01_005 -> c12_phy_cbse_01_006

## THIS_FORMULA
\( \vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2} \hat{r} \) (SI unit: N/C or V/m)

## FORMULA_VARIABLES
\( \vec{E} \) = electric field vector (N/C), \( q \) = source charge (C), \( r \) = distance from source to field point (m), \( \hat{r} \) = unit vector pointing from source charge to field point (dimensionless), \( \varepsilon_0 \) = permittivity of free space = \( 8.854 \times 10^{-12} \, \text{C}^2 \text{N}^{-1} \text{m}^{-2} \), \( \frac{1}{4\pi\varepsilon_0} \approx 9 \times 10^9 \, \text{N·m}^2/\text{C}^2 \).

## FORMULA_UNITS
N/C, V/m, C, m, C²/(N·m²), N·m²/C²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_002 | Distance formula calculates r = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²] for field point coordinates.
c11_math_cbse_03_003 | Trigonometric functions (sin, cos) resolve E vector into components for non-collinear charge configurations.
c11_math_cbse_13_008 | Power rule derivative d/dr (1/r) = -1/r² connects electric potential V ∝ 1/r to electric field E ∝ 1/r².
## PREREQ_CONCEPT
Coulomb's law for force between point charges and the definition of electric field as force per unit positive test charge.

## PREREQ_BEFORE
Student must be able to state Coulomb's law in vector form, compute force between two charges, and explain the test-charge limit definition of electric field.

## PREREQ_STUCK
If stuck on vector direction, review c11_phy_cbse_03_003 (analytical vector addition) and c12_phy_cbse_01_004 (test charge convention).

## WORKED_EXAMPLE_1
PROBLEM: A small sphere carrying a charge of \( +5.0 \mu C \) is fixed at the origin. Find the electric field at point P(3.0 cm, 4.0 cm) in the xy-plane. Express the answer in vector form using \( \hat{i} \) and \( \hat{j} \).
STEPS:
- Step 1: Identify given quantities: \( q = +5.0 \times 10^{-6} \, \text{C} \), coordinates of P: \( x = 0.030 \, \text{m}, y = 0.040 \, \text{m} \). Source at origin (0,0). \( k = 9 \times 10^9 \, \text{N·m}^2/\text{C}^2 \).
- Step 2: Calculate distance \( r = \sqrt{x^2 + y^2} = \sqrt{(0.030)^2 + (0.040)^2} = \sqrt{0.0009 + 0.0016} = \sqrt{0.0025} = 0.050 \, \text{m} \).
- Step 3: Determine unit vector \( \hat{r} \) from source to P: \( \hat{r} = \frac{x\hat{i} + y\hat{j}}{r} = \frac{0.030\hat{i} + 0.040\hat{j}}{0.050} = 0.6\hat{i} + 0.8\hat{j} \).
- Step 4: Compute magnitude \( E = k \frac{|q|}{r^2} = (9 \times 10^9) \frac{5.0 \times 10^{-6}}{(0.050)^2} = \frac{45 \times 10^3}{0.0025} = 1.8 \times 10^7 \, \text{N/C} \).
- Step 5: Multiply magnitude by unit vector: \( \vec{E} = (1.8 \times 10^7)(0.6\hat{i} + 0.8\hat{j}) = 1.08 \times 10^7 \hat{i} + 1.44 \times 10^7 \hat{j} \, \text{N/C} \).
REASONING: The electric field of a positive point charge is radially outward. The vector from source to field point gives the direction. We compute the distance using Pythagoras (math prerequisite), form the unit vector, compute magnitude from the inverse-square formula, then multiply. Unit analysis: \( k \) (N·m²/C²) × \( q \) (C) / \( r^2 \) (m²) = N/C, correct.
ANSWER: \( \vec{E} = (1.08 \times 10^7 \hat{i} + 1.44 \times 10^7 \hat{j}) \, \text{N/C} \)

## WORKED_EXAMPLE_2
PROBLEM: Two point charges are placed on the x-axis: \( q_1 = +8.0 \mu C \) at \( x = 0 \) and \( q_2 = -4.0 \mu C \) at \( x = 12 \, \text{cm} \). Find the point(s) on the x-axis where the net electric field is zero.
STEPS:
- Step 1: Sketch the configuration. \( q_1 \) positive at 0, \( q_2 \) negative at 0.12 m. Field from \( q_1 \) points away (right for x>0, left for x<0). Field from \( q_2 \) points toward it (right for x<0.12, left for x>0.12).
- Step 2: Identify regions where fields can cancel: (i) x < 0: both point left → cannot cancel. (ii) 0 < x < 0.12: \( E_1 \) points right, \( E_2 \) points right → both same direction → cannot cancel. (iii) x > 0.12: \( E_1 \) points right, \( E_2 \) points left → opposite directions, possible cancellation.
- Step 3: Let the point be at \( x = d \) where \( d > 0.12 \). Distance to \( q_1 \) is \( d \), to \( q_2 \) is \( d - 0.12 \).
- Step 4: Set magnitudes equal: \( k \frac{8.0 \times 10^{-6}}{d^2} = k \frac{4.0 \times 10^{-6}}{(d - 0.12)^2} \). Cancel \( k \) and \( 10^{-6} \): \( \frac{8}{d^2} = \frac{4}{(d - 0.12)^2} \).
- Step 5: Simplify: \( 2(d - 0.12)^2 = d^2 \). Take square root (positive since distances >0): \( \sqrt{2}(d - 0.12) = d \). Solve: \( \sqrt{2}d - 0.12\sqrt{2} = d \) → \( d(\sqrt{2} - 1) = 0.12\sqrt{2} \) → \( d = \frac{0.12 \times 1.414}{0.414} \approx 0.410 \, \text{m} = 41.0 \, \text{cm} \).
- Step 6: Verify: \( d = 0.410 \, \text{m} > 0.12 \, \text{m} \), consistent with region (iii). No other solutions.
REASONING: Electric field is a vector; cancellation requires opposite directions. We analyze each region qualitatively before algebra. The inverse-square law leads to a quadratic that simplifies via square root because both sides are perfect squares. Unit consistency: all distances in metres, charges in coulombs, k cancels.
ANSWER: \( x = 41.0 \, \text{cm} \) from \( q_1 \) (or 29.0 cm from \( q_2 \)) on the x-axis beyond \( q_2 \).

## WORKED_EXAMPLE_3
PROBLEM: A charged oil droplet of mass \( 2.0 \times 10^{-15} \, \text{kg} \) and charge \( -3.0 \mu C \) is placed in a uniform electric field \( \vec{E} = 5.0 \times 10^4 \, \text{N/C} \) directed vertically upward. Find the acceleration of the droplet (magnitude and direction). Ignore air resistance. Use \( g = 9.8 \, \text{m/s}^2 \).
STEPS:
- Step 1: Identify forces on droplet: (a) Electric force \( \vec{F}_e = q\vec{E} \). Since \( q = -3.0 \times 10^{-6} \, \text{C} \) and \( \vec{E} \) is upward, \( \vec{F}_e \) is downward. Magnitude: \( F_e = |q|E = (3.0 \times 10^{-6})(5.0 \times 10^4) = 0.15 \, \text{N} \). (b) Weight \( \vec{W} = m\vec{g} \) downward. Magnitude: \( W = (2.0 \times 10^{-15})(9.8) = 1.96 \times 10^{-14} \, \text{N} \).
- Step 2: Compare magnitudes: \( F_e = 0.15 \, \text{N} \), \( W \approx 2 \times 10^{-14} \, \text{N} \). Weight is negligible (13 orders of magnitude smaller). Net force \( \vec{F}_{net} \approx \vec{F}_e \) downward.
- Step 3: Apply Newton's second law: \( \vec{a} = \frac{\vec{F}_{net}}{m} \approx \frac{\vec{F}_e}{m} \). Magnitude: \( a = \frac{0.15}{2.0 \times 10^{-15}} = 7.5 \times 10^{13} \, \text{m/s}^2 \).
- Step 4: Direction: Both forces downward, so acceleration is vertically downward.
- Step 5: Check reasonableness: The electric force on a microcoulomb charge in a modest lab field is huge compared to weight of a microscopic droplet. Acceleration is enormous but plausible for a tiny mass.
REASONING: This problem combines electric field force (\( \vec{F} = q\vec{E} \)) from this node with Newton's second law (Class 11 mechanics). The negative charge experiences a force opposite to the field direction. Weight is negligible for microscopic charged particles in typical lab fields — a key insight for Millikan oil-drop experiment context.
ANSWER: \( a = 7.5 \times 10^{13} \, \text{m/s}^2 \) vertically downward.

## COMPETENCY_QUESTION_1
QUESTION: A point charge \( q \) is placed at the centre of a cube of side \( a \). A student claims: "The electric flux through each face of the cube is \( \frac{q}{6\varepsilon_0} \) because the total flux is \( q/\varepsilon_0 \) and there are 6 faces." Is this reasoning correct for the electric field magnitude at the centre of each face? Explain why or why not, and find the actual electric field magnitude at the centre of one face.
COMPETENCY: Interpreting physical situations using formulas and symmetry arguments
STEPS:
- Step 1: Recall Gauss's law: total flux through closed surface = \( q_{enc}/\varepsilon_0 \). For a cube enclosing charge \( q \), total flux = \( q/\varepsilon_0 \).
- Step 2: By symmetry, flux is equally distributed among the 6 faces only if the charge is at the centre. So flux per face = \( q/(6\varepsilon_0) \). This part is correct.
- Step 3: However, electric field magnitude is NOT uniform over a face. Flux \( \Phi = \int \vec{E} \cdot d\vec{A} \). At the centre of a face, distance from charge is \( a/2 \). The field is perpendicular to the face there, so \( E = \frac{1}{4\pi\varepsilon_0} \frac{q}{(a/2)^2} = \frac{1}{4\pi\varepsilon_0} \frac{4q}{a^2} = \frac{q}{\pi\varepsilon_0 a^2} \).
- Step 4: If the student incorrectly assumed uniform E over the face, they would compute \( E = \frac{\Phi}{A} = \frac{q/(6\varepsilon_0)}{a^2} = \frac{q}{6\varepsilon_0 a^2} \), which is wrong by a factor of \( 6/\pi \approx 1.91 \).
ANSWER: The flux reasoning is correct, but the electric field magnitude at the face centre is \( \frac{q}{\pi\varepsilon_0 a^2} \), not \( \frac{q}{6\varepsilon_0 a^2} \). The error is assuming uniform field over the face; Gauss's law gives total flux, not local field, unless symmetry makes E constant on the Gaussian surface (e.g., sphere).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two identical point charges \( +Q \) are fixed on the x-axis at \( x = -d \) and \( x = +d \). A third point charge \( -q \) (with \( q > 0 \)) is placed at the origin and displaced slightly along the y-axis by a small distance \( y \ll d \). Show that the net force on \( -q \) is restoring and proportional to \( -y \), and find the effective spring constant \( k_{eff} \) for small oscillations.
COMPETENCY: Predicting outcomes from changing variables and applying approximations
STEPS:
- Step 1: Draw the configuration. The two \( +Q \) charges are at \( (\pm d, 0) \). The test charge \( -q \) is at \( (0, y) \).
- Step 2: Distance from each \( +Q \) to \( -q \) is \( r = \sqrt{d^2 + y^2} \). The force from each \( +Q \) on \( -q \) is attractive, magnitude \( F = \frac{1}{4\pi\varepsilon_0} \frac{Qq}{d^2 + y^2} \).
- Step 3: By symmetry, x-components cancel. Net force is along y-direction. Each force has y-component \( F_y = -F \frac{y}{r} = -\frac{1}{4\pi\varepsilon_0} \frac{Qq y}{(d^2 + y^2)^{3/2}} \) (negative because directed toward origin).
- Step 4: Total y-force: \( F_{net,y} = 2 F_y = -\frac{1}{4\pi\varepsilon_0} \frac{2Qq y}{(d^2 + y^2)^{3/2}} \).
- Step 5: For \( y \ll d \), \( (d^2 + y^2)^{3/2} \approx d^3 (1 + \frac{3}{2}\frac{y^2}{d^2}) \approx d^3 \). Thus \( F_{net,y} \approx -\frac{1}{4\pi\varepsilon_0} \frac{2Qq}{d^3} y \).
- Step 6: This is Hooke's law \( F = -k_{eff} y \) with \( k_{eff} = \frac{1}{4\pi\varepsilon_0} \frac{2Qq}{d^3} \). The motion is simple harmonic for small \( y \).
ANSWER: The net force is restoring and linear in \( y \) for small displacements: \( F_y = -\left( \frac{1}{4\pi\varepsilon_0} \frac{2Qq}{d^3} \right) y \). Effective spring constant \( k_{eff} = \frac{1}{4\pi\varepsilon_0} \frac{2Qq}{d^3} \).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The electric field due to a point charge is the force per unit positive test charge ______ at a point in space, directed radially outward for a positive source charge and radially inward for a negative source charge.

## DIAGNOSTIC_ANSWER_7
experienced

Experienced is the probe's verb: the field is defined through the force a unit positive charge would feel upon arriving. **A wrong answer (produced twice) reveals the student has shifted the sentence from the felt force to the made field mid-definition.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine rubbing a balloon on your hair in a dry Delhi winter — the balloon ______ tiny paper bits from a distance without touching them.

## DIAGNOSTIC_ANSWER_8
attracts

The attracting verb is the balloon's demonstration: field lines reach out and haul the paper in without a touch. **A wrong answer (a repelling verb) reveals the student has flipped the balloon's charge story and the paper's response with it.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can calculate the electric field vector at any point due to a single point charge or a system of point charges using superposition, correctly handling vector direction, sign of charge, and unit conversions.

Mastery is the superposition competence: single-charge fields computed, multi-charge fields summed, directions and units carried intact. **A wrong answer (single charges only) reveals the student has stopped at the formula's simplest casting when the topic's promise explicitly extends to systems.**
