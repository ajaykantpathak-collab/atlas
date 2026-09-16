## DEFINITION
In electrostatic equilibrium, a **conductor** is a material containing mobile charge carriers (free electrons in metals) that redistribute themselves such that the electric field inside the conductor is zero, the conductor becomes an equipotential volume, and any net charge resides entirely on its surface with surface charge density σ (C/m²). An **insulator** (dielectric) lacks mobile charge carriers; charges remain bound to atoms/molecules and cannot move freely, so the electric field inside can be non-zero and charge distribution is fixed.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
Student can: (1) Explain why the electric field inside a conductor in electrostatic equilibrium must be zero using the concept of mobile charges and force equilibrium; (2) Derive the relation E = σ/ε₀ at the surface of a charged conductor using a Gaussian pillbox; (3) Apply electrostatic shielding to predict field inside a cavity; (4) Calculate surface charge density given the electric field just outside a conductor.

## SCOPE_BOUNDARY
Covers electrostatic properties of conductors (field inside, surface field, potential constancy, charge residence on surface, shielding) and contrast with insulators. Does NOT cover: dielectric polarization (next node c12_phy_cbse_02_008), capacitance calculations (c12_phy_cbse_02_009 onwards), or current electricity (Class 10/12 later chapters). Assumes knowledge of Gauss's law (Class 11) and potential concepts (previous nodes in this chapter).

## WALKTHROUGH
Imagine touching a metal car door after sliding across the seat on a dry day — you feel a spark. That spark is excess charge on your body (a conductor) discharging through the air. Now consider a hollow metal box (Faraday cage) used to protect sensitive electronics in a lightning storm: the lightning's enormous electric field exists outside, but inside the cavity the field is zero. Why? Because free electrons in the metal instantly rearrange to cancel any internal field. Start by visualizing a neutral metal sphere placed in a uniform external field E₀. Free electrons drift opposite to E₀, creating induced surface charges that produce an opposing field E_ind inside. In equilibrium, E₀ + E_ind = 0 everywhere inside. Next, use a Gaussian pillbox straddling the surface to prove E = σ/ε₀ normal to the surface. Finally, argue that since E=0 inside, potential V is constant (∇V = -E = 0), making the entire conductor an equipotential volume. This logic extends to cavities: any cavity inside a conductor, even with external fields, has E=0 if no charges are inside the cavity.

## DIAGNOSTIC_QUESTION_1
State the value of the electrostatic electric field inside a conductor in static equilibrium and give the physical reason in one sentence.

## DIAGNOSTIC_ANSWER_1
The electric field inside a conductor in electrostatic equilibrium is zero. Reason: If E were non-zero, free charges would experience a force (F = qE) and move, constituting a current, contradicting the static equilibrium condition. A wrong answer (e.g., "E is non-zero but small") reveals the student thinks conductors merely "reduce" field rather than cancel it completely, confusing conductors with dielectrics.

## DIAGNOSTIC_QUESTION_2
A solid conducting sphere of radius R carries a net charge +Q. A student claims: "The charge +Q is distributed uniformly throughout the volume of the sphere because the sphere is solid." Is this claim correct? Explain why or why not using Gauss's law.

## DIAGNOSTIC_ANSWER_2
The claim is incorrect. In electrostatic equilibrium, excess charge resides only on the outer surface of a conductor, not in its volume. Proof: Draw a Gaussian sphere of radius r < R inside the conductor. Since E = 0 everywhere inside, flux = 0 ⇒ enclosed charge = 0. This holds for any r < R, so no net charge exists in the interior; all +Q must be on the surface at r = R. A wrong answer indicates the student conflates "solid conductor" with "uniform volume charge distribution" (true only for insulating spheres).

## DIAGNOSTIC_QUESTION_3
A hollow conducting spherical shell has inner radius a and outer radius b. A point charge +q is placed at the center of the cavity. Calculate the surface charge density on the inner surface (at r = a) and on the outer surface (at r = b). Express answers in terms of q, a, b, and ε₀.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Gaussian sphere of radius r where a < r < b (inside conductor material). E = 0 ⇒ flux = 0 ⇒ total enclosed charge = 0. Enclosed charge = q (point charge) + q_inner = 0 ⇒ q_inner = -q.
**Step 2:** Inner surface area = 4πa² ⇒ σ_inner = q_inner / (4πa²) = -q / (4πa²).
**Step 3:** Conductor is neutral overall (no net charge given) ⇒ q_inner + q_outer = 0 ⇒ q_outer = +q.
**Step 4:** Outer surface area = 4πb² ⇒ σ_outer = +q / (4πb²).
**Units:** C/m². A wrong answer (e.g., σ_inner = 0) shows the student forgets that the point charge induces opposite charge on the cavity wall to keep E=0 in the conductor.

## DIAGNOSTIC_QUESTION_4
Two identical conducting spheres A and B carry charges +4 μC and -2 μC respectively. They are brought into contact and then separated. What is the final charge on each sphere? Now, if instead of identical spheres, sphere A has radius R and sphere B has radius 2R, what are the final charges after contact and separation? Explain the physical principle that determines the final distribution.

## DIAGNOSTIC_ANSWER_4
**Case 1 (identical radii R):** Total charge = +2 μC. By symmetry and equal potential after contact, charge splits equally: each gets +1 μC.
**Case 2 (radii R and 2R):** After contact, they form a single conductor ⇒ same potential V. For spheres far apart, V = kQ₁/R₁ = kQ₂/R₂ ⇒ Q₁/R = Q₂/(2R) ⇒ Q₂ = 2Q₁. Charge conservation: Q₁ + Q₂ = +2 μC ⇒ Q₁ + 2Q₁ = 2 ⇒ Q₁ = 2/3 μC, Q₂ = 4/3 μC.
**Principle:** Conductors in contact reach common potential; charge redistributes to satisfy V₁ = V₂. A wrong answer (e.g., still equal split for unequal radii) reveals the student thinks charge always splits equally, ignoring capacitance/potential dependence on geometry.

## DIAGNOSTIC_QUESTION_5
A student writes: "The electric field just outside a charged conductor is E = σ/ε₀ directed normal to the surface. This formula is derived assuming the conductor is a flat infinite plane, so it cannot be used for a curved conductor like a sphere." Evaluate this statement. Is the formula valid for a curved surface? Justify.

## DIAGNOSTIC_ANSWER_5
The statement is **false**. The formula E = σ/ε₀ (normal to surface) is **exact for any shaped conductor** in electrostatic equilibrium, not just flat planes. Derivation uses a Gaussian pillbox of infinitesimal height straddling the surface: flux = E·dA (through top) + 0 (through bottom, inside conductor) = σ dA / ε₀ ⇒ E = σ/ε₀. The curvature only affects how σ varies from point to point, but the local relation E = σ/ε₀ holds at every point. A student who thinks it's only for flat surfaces misunderstands the pillbox derivation — the pillbox height is infinitesimal, so curvature is negligible locally.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using household items to demonstrate electrostatic shielding (Faraday cage effect). List materials, procedure, and the expected observation that proves the interior field is zero.

## DIAGNOSTIC_ANSWER_6
**Materials:** Metal mesh strainer or aluminum foil wrapped around a cardboard box (cage), a small battery-operated AM radio (or a phone receiving a call), a source of strong electromagnetic noise (e.g., electric drill, hair dryer, or lightning — but safely: a piezoelectric gas lighter spark near the cage).
**Procedure:** (1) Turn on the radio and tune to a station with static. (2) Bring the noise source close — static increases. (3) Place the radio inside the metal cage (ensure no gaps). (4) Bring the noise source close again.
**Observation:** Static/noise disappears or drastically reduces when the radio is inside the closed metal cage, even though the noise source is outside.
**Reason:** The cage's free charges rearrange to cancel external fields inside the cavity. A poor answer (e.g., "put phone in microwave") uses a device not designed for low-frequency EM shielding or misses the key requirement of a conductive enclosure with no large apertures.

## COMMON_MISCONCEPTION
**Misconception:** "If a conductor has a cavity with no charge inside, the electric field in the cavity is zero **only if the conductor is spherical**." 
**Why it's wrong:** Students recall the spherical shell result (E=0 inside a uniformly charged sphere) and generalize incorrectly. The zero-field-in-cavity theorem holds for **any shape conductor** with any external field configuration, proved by: (1) E=0 in conductor material ⇒ conductor is equipotential; (2) Cavity surface is an equipotential surface; (3) Laplace's equation ∇²V=0 in charge-free cavity with constant boundary condition ⇒ V constant throughout cavity ⇒ E=0. The spherical symmetry is not required; the result is a consequence of uniqueness theorem for Laplace's equation. Students often write "E=0 only for spherical cavity" in board exams and lose marks.

## ON_FAILURE
If the student holds the spherical-only misconception: (1) Revisit **c12_phy_cbse_02_004** (Equipotential Surfaces) to recall that a conductor's surface is equipotential regardless of shape. (2) Revisit **c11_phy_cbse_01_006** (Dimensional Analysis) and **c11_phy_cbse_03_007** (Scalar Product) to understand ∇V = -E mathematically. (3) Perform the "Faraday cage" thought experiment: a metal box of any shape in a uniform field — free charges move to the outer surface only, leaving cavity field zero. (4) Re-diagnostic: Ask "Why is the field inside a **rectangular** metal box zero when placed in a uniform electric field?" Expect answer: "Charges rearrange on outer surface to make the box an equipotential; cavity surface is then also equipotential; with no charge inside, V=constant ⇒ E=0."

## PREREQUISITE_NODE_IDS
c12_phy_cbse_02_001, c12_phy_cbse_02_004, c12_phy_cbse_02_005, c10_phy_cbse_01_004, c6_physics_ch03_014, c11_phy_cbse_01_006, c11_phy_cbse_03_007, c11_phy_cbse_05_009
## PREREQUISITE_REASONS
c12_phy_cbse_02_001: Defines electrostatic potential V, needed to understand "conductor is equipotential volume".
c12_phy_cbse_02_004: Equipotential surfaces properties — conductor surface is an equipotential surface.
c12_phy_cbse_02_005: Potential energy of charge systems — basis for work done in moving charges on conductors.
c10_phy_cbse_01_004: Resistance and conductors/insulators distinction — prior knowledge of materials that allow charge flow.
c6_physics_ch03_014: Electrical Conductors and Insulators — basic classification from primary school.
c11_phy_cbse_01_006: Dimensional Analysis — to verify E = σ/ε₀ has correct units (N/C = (C/m²)/(C²/N·m²)).
c11_phy_cbse_03_007: Scalar (Dot) Product — for flux integral Φ = ∫ E·dA in Gauss's law derivation.
c11_phy_cbse_05_009: Conservative and Non-Conservative Forces — electrostatic force is conservative, enabling potential definition.

## FORWARD_NODE_IDS
c12_phy_cbse_02_008, c12_phy_cbse_02_009, c12_phy_cbse_02_010, c12_phy_cbse_02_013

## FORWARD_REASONS
c12_phy_cbse_02_008: Dielectrics and Polarization — contrasts conductor (free charges) with dielectric (bound charges) behavior in external fields.
c12_phy_cbse_02_009: Capacitor: Definition and Capacitance — capacitors use two conductors; understanding conductor properties (equipotential, surface charge) is essential.
c12_phy_cbse_02_010: Parallel Plate Capacitor — directly applies E = σ/ε₀ and conductor surface charge distribution to derive capacitance.
c12_phy_cbse_02_013: The principle that charge resides on the outer surface of a hollow conductor is the core working principle.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_008, c9_math_ch1_4, c10_math_cbse_07_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives: Intuitive Idea — electric field is negative gradient of potential (E = -dV/dr), a derivative concept.
c11_math_cbse_13_008: Derivative Using First Principle — rigorous foundation for E = -∇V used in equipotential arguments.
c9_math_ch1_4: Distance Formula: Derivation Using Pythagoras Theorem — used in calculating distances for point charges and Gaussian surfaces.
c10_math_cbse_07_001: Distance Formula: Derivation Using Pythagoras Theorem — same, for coordinate geometry in electrostatic problems.

## CHAIN_DESCRIPTION
c12_phy_cbse_02_004 (equipotentials) → c12_phy_cbse_02_007 (conductors charge distribution) → c12_phy_cbse_02_008 (dielectrics) and c12_phy_cbse_02_009 (capacitors)

## THIS_FORMULA
E = σ/ε₀ (electric field just outside a charged conductor, normal to surface); V = constant (throughout conductor volume and surface); σ = Q/A (surface charge density, C/m²); ε₀ = 8.85×10⁻¹² C²/(N·m²) (permittivity of free space)

## FORMULA_VARIABLES
E = electric field magnitude just outside conductor surface (N/C or V/m); σ = surface charge density (C/m²); ε₀ = permittivity of free space (8.85×10⁻¹² C²·N⁻¹·m⁻²); V = electrostatic potential (V); Q = total charge on conductor surface (C); A = surface area (m²)

## FORMULA_UNITS
N/C, V/m, C/m², C²·N⁻¹·m⁻², V, C, m²

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_006 | Electric field is the negative gradient of potential (E = -∇V), a core calculus concept linking physics to derivatives.
c11_math_cbse_13_008 | Derivative from first principles provides the rigorous mathematical basis for the relation between potential and field used in conductor equipotential arguments.
c9_math_ch1_4 | Distance formula (Pythagoras) is essential for computing distances from point charges to Gaussian surfaces and for coordinate geometry in electrostatics.
c10_math_cbse_07_001 | Same distance formula used in Class 10 coordinate geometry for solving electrostatic problems involving point charges and conductors.
## PREREQ_CONCEPT
Gauss's law (∮ E·dA = Q_enc/ε₀) and the definition of electrostatic potential (V = -∫ E·dl) are the foundational physics concepts required.

## PREREQ_BEFORE
Student must be able to apply Gauss's law to symmetric charge distributions and understand that potential difference is the negative line integral of electric field.

## PREREQ_STUCK
If stuck, revisit Gauss's law applications (Class 11 Chapter 1, not in provided nodes but standard curriculum) and the equipotential surface properties (c12_phy_cbse_02_004).

## WORKED_EXAMPLE_1
PROBLEM: A solid copper sphere of radius 5.0 cm is given a charge of +2.0 μC. (a) What is the electric field at a point 2.0 cm from the center (inside the conductor)? (b) What is the surface charge density on the sphere? (c) What is the electric field just outside the surface? (d) What is the potential of the sphere relative to infinity? (Use ε₀ = 8.85×10⁻¹² C²/N·m², k = 9×10⁹ N·m²/C²)

STEPS:
- Step 1: Identify given: R = 5.0 cm = 0.050 m, Q = +2.0 μC = 2.0×10⁻⁶ C, r_inside = 2.0 cm = 0.020 m < R. For a conductor in electrostatic equilibrium, E_inside = 0 everywhere. So (a) E = 0 N/C.
- Step 2: Surface charge density σ = Q / (4πR²) = (2.0×10⁻⁶ C) / [4π(0.050 m)²] = 2.0×10⁻⁶ / (4π×0.0025) = 2.0×10⁻⁶ / 0.031416 ≈ 6.37×10⁻⁵ C/m².
- Step 3: Electric field just outside surface: E = σ/ε₀ = (6.37×10⁻⁵ C/m²) / (8.85×10⁻¹² C²/N·m²) = 7.20×10⁶ N/C. Alternatively, E = kQ/R² = (9×10⁹)(2×10⁻⁶)/(0.05)² = 1.8×10⁴/0.0025 = 7.2×10⁶ N/C. Directed radially outward.
- Step 4: Potential of sphere (same everywhere on/in conductor): V = kQ/R = (9×10⁹ N·m²/C²)(2.0×10⁻⁶ C) / 0.050 m = 18×10³ / 0.050 = 3.6×10⁵ V = 360 kV.
- Step 5: Check units: σ in C/m², ε₀ in C²/N·m² → σ/ε₀ = N/C. V = kQ/R → (N·m²/C²)(C)/m = N·m/C = J/C = V. All consistent.

REASONING: The conductor's free charges reside entirely on the outer surface, making E=0 inside. The surface charge density is uniform due to spherical symmetry. The field just outside is given by the local σ/ε₀ relation (or equivalently by Coulomb's law for a sphere). Potential is constant throughout and equals the surface potential.

ANSWER: (a) 0 N/C; (b) 6.37×10⁻⁵ C/m²; (c) 7.20×10⁶ N/C radially outward; (d) 3.6×10⁵ V (360 kV)

## WORKED_EXAMPLE_2
PROBLEM: A hollow conducting spherical shell has inner radius 3.0 cm and outer radius 5.0 cm. A point charge of -4.0 μC is placed at the center of the cavity. The shell itself carries a net charge of +10.0 μC. Find: (a) the charge on the inner surface of the shell; (b) the charge on the outer surface; (c) the surface charge density on the outer surface; (d) the electric field at a distance 10.0 cm from the center.

STEPS:
- Step 1: Gaussian surface inside conductor material (radius r where 3 cm < r < 5 cm). E = 0 ⇒ flux = 0 ⇒ Q_enc = 0. Q_enc = q_point + q_inner = -4.0 μC + q_inner = 0 ⇒ q_inner = +4.0 μC. (a) Charge on inner surface = +4.0 μC.
- Step 2: Net charge on shell = q_inner + q_outer = +10.0 μC ⇒ q_outer = +10.0 - (+4.0) = +6.0 μC. (b) Charge on outer surface = +6.0 μC.
- Step 3: Outer surface area = 4πR_outer² = 4π(0.050 m)² = 0.031416 m². σ_outer = q_outer / area = (6.0×10⁻⁶ C) / 0.031416 m² = 1.91×10⁻⁴ C/m². (c) σ_outer = 1.91×10⁻⁴ C/m².
- Step 4: At r = 10.0 cm = 0.10 m (outside shell), total enclosed charge = q_point + q_shell = -4.0 μC + 10.0 μC = +6.0 μC. E = kQ_total/r² = (9×10⁹)(6.0×10⁻⁶)/(0.10)² = 54×10³ / 0.01 = 5.4×10⁶ N/C radially outward. (d) E = 5.4×10⁶ N/C outward.

REASONING: The point charge induces equal and opposite charge on the inner cavity wall to maintain E=0 in the conductor. The remainder of the shell's net charge resides on the outer surface. External field depends only on total enclosed charge (shell theorem).

ANSWER: (a) +4.0 μC; (b) +6.0 μC; (c) 1.91×10⁻⁴ C/m²; (d) 5.4×10⁶ N/C radially outward

## WORKED_EXAMPLE_3
PROBLEM: Two conducting spheres of radii 2.0 cm and 6.0 cm are connected by a long thin conducting wire. Initially, the smaller sphere has a charge of +12 μC and the larger sphere is neutral. After electrostatic equilibrium is reached, find: (a) the final charge on each sphere; (b) the common potential; (c) the surface charge density on each sphere; (d) the ratio of electric field magnitudes just outside their surfaces.

STEPS:
- Step 1: After connection, the two spheres form a single conductor ⇒ same potential V. Let Q₁, Q₂ be final charges on radii R₁=0.020 m, R₂=0.060 m. V = kQ₁/R₁ = kQ₂/R₂ ⇒ Q₁/R₁ = Q₂/R₂ ⇒ Q₂ = Q₁(R₂/R₁) = Q₁(0.060/0.020) = 3Q₁.
- Step 2: Charge conservation: Q₁ + Q₂ = 12 μC ⇒ Q₁ + 3Q₁ = 12 ⇒ 4Q₁ = 12 ⇒ Q₁ = 3.0 μC, Q₂ = 9.0 μC. (a) Q₁ = 3.0 μC, Q₂ = 9.0 μC.
- Step 3: Common potential V = kQ₁/R₁ = (9×10⁹)(3.0×10⁻⁶)/0.020 = 27×10³/0.020 = 1.35×10⁶ V = 1.35 MV. (b) V = 1.35 MV.
- Step 4: Surface charge densities: σ₁ = Q₁/(4πR₁²) = (3.0×10⁻⁶)/[4π(0.020)²] = 3.0×10⁻⁶/0.005027 = 5.97×10⁻⁴ C/m². σ₂ = Q₂/(4πR₂²) = (9.0×10⁻⁶)/[4π(0.060)²] = 9.0×10⁻⁶/0.04524 = 1.99×10⁻⁴ C/m². (c) σ₁ = 5.97×10⁻⁴ C/m², σ₂ = 1.99×10⁻⁴ C/m².
- Step 5: Electric fields just outside: E₁ = σ₁/ε₀ = kQ₁/R₁² = (9×10⁹)(3×10⁻⁶)/(0.020)² = 27×10³/0.0004 = 6.75×10⁷ N/C. E₂ = σ₂/ε₀ = kQ₂/R₂² = (9×10⁹)(9×10⁻⁶)/(0.060)² = 81×10³/0.0036 = 2.25×10⁷ N/C. Ratio E₁/E₂ = (Q₁/R₁²)/(Q₂/R₂²) = (3/0.0004)/(9/0.0036) = 67500/25000 = 2.7. Alternatively, since V same, E = V/R ⇒ E₁/E₂ = R₂/R₁ = 3. Wait: V = kQ/R, E = kQ/R² = V/R. Yes, E₁/E₂ = R₂/R₁ = 3. (d) Ratio = 3:1.

REASONING: Connected conductors reach common potential. Charge redistributes in proportion to radii (capacitance of isolated sphere ∝ R). Smaller sphere has higher curvature, hence higher surface charge density and higher electric field at surface for the same potential.

ANSWER: (a) Small sphere: 3.0 μC, Large sphere: 9.0 μC; (b) 1.35 MV; (c) σ_small = 5.97×10⁻⁴ C/m², σ_large = 1.99×10⁻⁴ C/m²; (d) E_small : E_large = 3 : 1

## COMPETENCY_QUESTION_1
QUESTION: A neutral conducting spherical shell has a point charge +q placed at its center (inside the cavity). The shell is then grounded (connected to earth) momentarily and the ground connection is removed. After this, the point charge +q is removed from the cavity. What is the final charge on the shell and where does it reside? Explain the sequence of charge movements.

COMPETENCY: Predicting outcomes from changing variables (grounding, charge removal) and applying electrostatic shielding principles.

STEPS:
- Step 1: Initially, +q at center induces -q on inner surface, +q on outer surface (shell neutral overall).
- Step 2: Grounding connects outer surface to earth (infinite reservoir). Potential of shell becomes zero. Since potential at infinity is zero, and shell is equipotential, the outer surface charge +q flows to earth to make potential zero. Now shell has net charge -q (all on inner surface).
- Step 3: Ground removed. Shell is isolated with net charge -q on inner surface.
- Step 4: Point charge +q removed from cavity. The induced -q on inner surface is no longer held; since the shell is isolated, the -q redistributes to the outer surface (because E must be zero inside conductor material). Final state: shell has net charge -q on its outer surface, inner surface neutral.

ANSWER: Final charge on shell = -q, residing entirely on the outer surface. Inner surface has zero charge.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A parallel-plate capacitor is charged to a potential difference V₀ and then disconnected from the battery. The plates are large conducting sheets. A student claims: "The electric field between the plates is E = σ/ε₀, and this field is produced solely by the charges on the inner surfaces of the plates. The outer surfaces of the plates have zero charge density." Evaluate this claim. Is it correct for an isolated capacitor? What if the capacitor plates are not infinite but have finite size with fringing fields?

COMPETENCY: Interpreting physical situations using formulas and analyzing boundary conditions (finite vs infinite plates, isolated vs connected).

STEPS:
- Step 1: For an isolated capacitor (disconnected), total charge on each plate is fixed. Let plate 1 have +Q, plate 2 have -Q.
- Step 2: By Gauss's law and conductor properties, charge resides on surfaces. For two parallel plates close together, almost all charge resides on the inner surfaces facing each other. Outer surfaces have negligible charge (exactly zero for infinite plates).
- Step 3: Field between plates: E = σ/ε₀ where σ = Q/A (inner surface density). Field outside: zero (for infinite plates) because contributions from +σ and -σ cancel.
- Step 4: For finite plates, fringing fields exist at edges. Some charge resides on outer surfaces and edges. The field between plates is not perfectly uniform, and there is a small field outside. The claim "outer surfaces have zero charge density" is approximately true for large plates with small separation (d² << A) but not exact.
- Step 5: Conclusion: The claim is correct for ideal infinite parallel plates, but for real finite plates it is an approximation; fringing fields mean some charge on outer surfaces and non-zero external field.

ANSWER: The claim is exact only for infinite parallel plates. For finite plates (real capacitors), fringing fields cause a small charge density on outer surfaces and a non-zero field outside, though the approximation is excellent when plate separation ≪ plate dimensions.

DIFFICULTY: hard