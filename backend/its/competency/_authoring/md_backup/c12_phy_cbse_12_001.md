## DEFINITION
Rutherford's nuclear model of the atom states that the entire positive charge and nearly all the mass of an atom are concentrated in a tiny, dense nucleus (radius ~10⁻¹⁵ m), while electrons revolve around this nucleus at distances ~10⁻¹⁰ m, making the atom mostly empty space. The alpha-particle scattering experiment (Geiger-Marsden, 1911) provided the empirical evidence: a narrow beam of 5.5 MeV α-particles (He²⁺ nuclei) directed at a thin gold foil showed most particles passing through undeviated, but a few (1 in 8000) scattered at angles >90°, which could only be explained by a concentrated central charge.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) describe the Geiger-Marsden experimental setup and observations with correct terminology (impact parameter, scattering angle, distance of closest approach), (2) derive the distance of closest approach formula using conservation of energy, and (3) calculate the upper limit on nuclear size for a given α-particle energy and target atomic number Z.

## SCOPE_BOUNDARY
This node covers: (a) the historical alpha-scattering experiment and its key observations, (b) the concept of impact parameter and its relation to scattering angle, (c) derivation of distance of closest approach for head-on collision, (d) Rutherford's nuclear model and its implication of atomic structure (empty space, tiny nucleus). It does NOT cover: Bohr's postulates, hydrogen energy levels, line spectra, or de Broglie's explanation (these are in subsequent nodes c12_phy_cbse_12_002–005).

## WALKTHROUGH
Imagine holding a thin gold leaf used in Indian traditional sweets (varak) — it is so thin that light passes through, yet it is made of gold atoms. Now picture firing tiny, fast, positively charged helium nuclei (α-particles) at this foil. Most zip through as if the foil were empty space, but a few bounce straight back. This shocking result — like firing a cannonball at tissue paper and having it rebound — forces us to conclude that the atom's mass and positive charge are squeezed into a minuscule nucleus. We begin by measuring the α-particle's kinetic energy (from its radioactive source) and the scattering angles (using a ZnS screen and microscope). The key physical principle is conservation of energy: the initial kinetic energy converts entirely to electrostatic potential energy at the distance of closest approach. From this, we derive the formula that gives us the nuclear size upper bound.

## DIAGNOSTIC_QUESTION_1
State the two key experimental observations from the Geiger-Marsden alpha-scattering experiment that contradicted Thomson's plum pudding model.

## DIAGNOSTIC_ANSWER_1
Correct answer: (1) Most α-particles passed through the gold foil with little or no deflection (indicating atoms are mostly empty space). (2) A very small fraction (~1 in 8000) were scattered at large angles >90°, some even backwards (indicating a concentrated, massive, positively charged nucleus).  
A wrong answer (e.g., "α-particles were absorbed" or "all particles deflected slightly") reveals the student confuses Rutherford's experiment with Thomson's model predictions or misunderstands the rarity of large-angle scattering. The plum pudding model predicted only small deflections because positive charge was diffuse; the observation of rare but violent large-angle scattering is the smoking gun for a tiny nucleus.

## DIAGNOSTIC_QUESTION_2
Explain why the impact parameter *b* determines the scattering angle θ, and describe the relationship between *b* and θ for a given α-particle energy and target nucleus.

## DIAGNOSTIC_ANSWER_2
Correct answer: The impact parameter *b* is the perpendicular distance from the nucleus to the initial velocity vector of the α-particle. A smaller *b* means the α-particle approaches closer to the nucleus, experiences a stronger Coulomb repulsion, and is deflected through a larger angle θ. For a head-on collision (*b* = 0), θ = 180° (backscattering). As *b* increases, θ decreases monotonically; for very large *b*, θ → 0.  
A wrong answer (e.g., "larger *b* gives larger θ" or "θ is independent of *b*") reveals the student has not visualized the hyperbolic trajectory in a repulsive 1/r² force field. The inverse relationship is crucial: the experimental distribution of scattering angles directly maps the distribution of impact parameters, which in turn reveals the nuclear cross-section.

## DIAGNOSTIC_QUESTION_3
An α-particle with kinetic energy 7.7 MeV is fired directly at a gold nucleus (Z = 79). Calculate the distance of closest approach *d*. Use 1/(4πε₀) = 9.0 × 10⁹ N·m²/C² and e = 1.6 × 10⁻¹⁹ C. Express your answer in metres and in fermi (1 fm = 10⁻¹⁵ m).

## DIAGNOSTIC_ANSWER_3
**Step 1:** Identify givens: K = 7.7 MeV = 7.7 × 10⁶ eV = 7.7 × 10⁶ × 1.6 × 10⁻¹⁹ J = 1.232 × 10⁻¹² J. Z = 79, charge of α-particle = 2e.  
**Step 2:** Formula for head-on collision (conservation of energy): K = (1/4πε₀) × (2e)(Ze)/d → d = (1/4πε₀) × 2Ze²/K.  
**Step 3:** Substitute: d = (9.0 × 10⁹) × 2 × 79 × (1.6 × 10⁻¹⁹)² / (1.232 × 10⁻¹²).  
**Step 4:** Compute numerator: 9.0e9 × 2 × 79 × 2.56e-38 = 9.0 × 2 × 79 × 2.56 × 10⁻²⁹ = 3632.64 × 10⁻²⁹ = 3.63264 × 10⁻²⁶.  
**Step 5:** Divide: d = 3.63264 × 10⁻²⁶ / 1.232 × 10⁻¹² = 2.948 × 10⁻¹⁴ m = 29.5 fm.  
Answer: d ≈ 2.95 × 10⁻¹⁴ m = 29.5 fm.  
A wrong answer (e.g., forgetting the factor 2 for α-particle charge, or using Z=1 for gold, or unit errors in MeV→J) reveals the student is not tracking the charge product (2e)(Ze) or is careless with energy unit conversion — a frequent JEE trap.

## DIAGNOSTIC_QUESTION_4
The Geiger-Marsden experiment used a gold foil of thickness 2.1 × 10⁻⁷ m. Given that the atomic radius of gold is ~1.4 × 10⁻¹⁰ m, estimate how many atomic layers thick the foil was. Why is it important that the foil be thin enough for *single scattering* to dominate?

## DIAGNOSTIC_ANSWER_4
**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m.  
**Step 2:** Number of layers = foil thickness / atomic diameter = (2.1 × 10⁻⁷) / (2.8 × 10⁻¹⁰) = 750 layers (approx).  
**Step 3:** Single scattering dominance means each α-particle encounters at most one nucleus. If the foil were thick, multiple scattering would blur the angular distribution, and the simple Rutherford formula (derived for one Coulomb encounter) would not match the data. The observed agreement between theory and experiment (Fig. 12.3) validates the single-scattering assumption.  
Answer: ~750 atomic layers; single scattering ensures the trajectory is a simple hyperbola from one nucleus, making the theoretical prediction clean and testable.  
A wrong answer (e.g., "thin foil reduces absorption" or "multiple scattering increases large-angle events") reveals the student confuses scattering with absorption or misunderstands that multiple small-angle scatterings can mimic a single large-angle event, corrupting the nuclear size inference.

## DIAGNOSTIC_QUESTION_5
A student claims: "Rutherford's model explains why atoms are stable because the electrostatic attraction between the nucleus and electrons provides the centripetal force for circular orbits, just like gravity keeps planets in orbit." Evaluate this statement. Is the student correct? Why or why not?

## DIAGNOSTIC_ANSWER_5
The student is **incorrect**. While it is true that the Coulomb force provides the centripetal force (Fe = Fc) for a *classical* circular orbit, Rutherford's model **fails to explain atomic stability**. According to classical electromagnetism, an accelerating charge (the electron in circular motion) must radiate electromagnetic waves, lose energy, and spiral into the nucleus in ~10⁻¹¹ s. The model predicts a continuous spectrum, not the observed line spectra. Stability and discrete spectra require Bohr's quantum postulates (node c12_phy_cbse_12_002).  
A wrong evaluation (e.g., "yes, it's stable like the solar system") reveals the student has not grasped the fundamental difference between gravitational and electromagnetic forces: orbiting charges radiate; orbiting masses do not (in Newtonian gravity). This is the central dilemma that forced Bohr's quantum leap.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment: If you repeated the Geiger-Marsden experiment using a thin foil of solid hydrogen (Z = 1) at 14 K instead of gold (Z = 79), how would the scattering pattern change? Predict qualitatively the distance of closest approach for a 5.5 MeV α-particle and the fraction of particles scattered at >90°.

## DIAGNOSTIC_ANSWER_6
**Expected answer:**  
- Distance of closest approach *d* ∝ Z. For hydrogen (Z=1), *d* is 79× smaller than for gold: ~0.37 fm (vs 29.5 fm for gold). This is *smaller* than the proton radius (~0.84 fm), meaning the α-particle would penetrate the nucleus — nuclear forces would dominate, and Rutherford's pure Coulomb formula breaks down.  
- Scattering cross-section ∝ Z². For hydrogen, the probability of large-angle scattering drops by 79² ≈ 6241×. The fraction scattered >90° would be ~1 in 8000 / 6241 ≈ 1 in 50 million — essentially unobservable.  
- The α-particle (mass 4 u) is heavier than the target proton (1 u), so the target recoils significantly; the "stationary nucleus" assumption fails.  
A poor answer (e.g., "same pattern but weaker" or "no scattering because hydrogen is light") reveals the student misses the Z² dependence of the cross-section, the breakdown of the point-nucleus Coulomb model at small *d*, and the recoil effect — all critical for JEE-level analysis of scattering experiments.

## COMMON_MISCONCEPTION
Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact force**, like a billiard ball hitting a wall. In reality, the α-particle **never touches the nucleus**; it is stopped and turned back by the *Coulomb repulsion* when its kinetic energy is fully converted to electrostatic potential energy at the distance of closest approach *d*. The nucleus is not a hard sphere; *d* is an upper bound on the nuclear radius, not the radius itself. This misconception leads to errors in JEE problems where students use nuclear radius formulas instead of the energy-conservation derivation, or assume the α-particle loses energy via nuclear forces rather than pure electrostatics.

## ON_FAILURE
If the student holds the "contact collision" misconception:  
1. Revisit the energy-conservation derivation (Worked Example 3) step by step, emphasizing that at *d*, velocity = 0 and force is purely electrostatic (F = k·2Ze²/d²).  
2. Watch a simulation of Rutherford scattering (e.g., PhET "Rutherford Scattering") to visualize the hyperbolic trajectory — the particle curves away *before* reaching the nucleus.  
3. Solve a problem: "Calculate the Coulomb force at *d* for the gold foil example. Is it large enough to stop the α-particle without contact?" (Answer: F ≈ 230 N — enormous for a subatomic particle, but purely electrostatic).  
4. Re-read NCERT Section 12.2.1: "The α-particle reverses its motion without ever actually touching the gold nucleus."

## PREREQUISITE_NODE_IDS
c11_phy_cbse_05_005, c11_phy_cbse_05_010, c11_phy_cbse_04_012, c11_phy_cbse_02_005, c11_phy_cbse_01_006
## PREREQUISITE_REASONS
c11_phy_cbse_05_005: Work-Energy Theorem derivation — essential for equating initial kinetic energy to final potential energy at distance of closest approach.  
c11_phy_cbse_05_010: Conservation of Mechanical Energy — the core principle used to derive *d* = (1/4πε₀)·2Ze²/K.  
c11_phy_cbse_04_012: Circular Motion Dynamics — provides the concept of centripetal force, later used in Rutherford's electron orbit equation (Fe = Fc).  
c11_phy_cbse_02_005: Kinematic Equations for Uniformly Accelerated Motion — basis for understanding trajectory analysis, though the actual trajectory is hyperbolic (non-uniform acceleration).  
c11_phy_cbse_01_006: Dimensional Analysis — critical for verifying the distance of closest approach formula and catching unit errors in MeV-to-Joule conversion.

## FORWARD_NODE_IDS
c12_phy_cbse_12_002, c12_phy_cbse_12_003, c12_phy_cbse_12_004, c12_phy_cbse_12_005

## FORWARD_REASONS
c12_phy_cbse_12_002: Bohr's postulates directly address the two failures of Rutherford's model identified here (instability and line spectra).  
c12_phy_cbse_12_003: Energy levels (Eₙ = -13.6 eV/n²) are derived by combining Rutherford's Coulomb force with Bohr's quantization condition.  
c12_phy_cbse_12_004: Line spectra (Lyman, Balmer, Paschen) arise from transitions between the quantized energy levels of the Bohr model.  
c12_phy_cbse_12_005: de Broglie's matter-wave hypothesis explains *why* angular momentum is quantized (standing waves on circular orbits), completing the physical picture.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_13_009, c10_math_cbse_04_005, c10_math_cbse_08_001, c10_math_cbse_08_004
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Derivative of Polynomial Functions — used in calculus-based derivation of work done by variable Coulomb force (W = ∫F·dr).  
c11_math_cbse_13_009: Algebra of Derivatives (Product Rule) — needed for differentiating energy expressions when analyzing orbit stability.  
c10_math_cbse_04_005: Quadratic Formula Derivation — the distance of closest approach derivation involves solving a quadratic in *d* when the α-particle has non-zero impact parameter.  
c10_math_cbse_08_001: Trigonometric Ratios in Right Triangle — used in geometry of scattering trajectory (impact parameter *b*, scattering angle θ, and asymptotic angles).  
c10_math_cbse_08_004: Trigonometric Ratios of 30° and 60° — standard angles appear in scattering cross-section calculations (e.g., cot(θ/2) relations).

## CHAIN_DESCRIPTION
c11_phy_cbse_05_010 -> c12_phy_cbse_12_001 -> c12_phy_cbse_12_002

## THIS_FORMULA
Distance of closest approach (head-on collision): d = (1/4πε₀) × (2Ze²)/K  
Coulomb force between α-particle and nucleus: F = (1/4πε₀) × (2e)(Ze)/r²  
Relation for electron orbit (Rutherford model): (1/4πε₀) × e²/r² = mv²/r  
Total energy of electron in hydrogen-like atom: E = - (1/4πε₀) × e²/(2r)

## FORMULA_VARIABLES
d = distance of closest approach (m); ε₀ = permittivity of free space = 8.85 × 10⁻¹² C²/N·m²; Z = atomic number of target nucleus (dimensionless); e = elementary charge = 1.6 × 10⁻¹⁹ C; K = kinetic energy of α-particle (J); r = distance between α-particle and nucleus (m); m = electron mass = 9.1 × 10⁻³¹ kg; v = electron orbital speed (m/s); E = total energy of electron (J).

## FORMULA_UNITS
m, C²/N·m², C, J, kg, m/s, N

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_008 | Calculus (integration of variable force) is used to derive work done by Coulomb force, which underpins the energy-conservation derivation of distance of closest approach.  
c10_math_cbse_04_005 | Quadratic formula solves for distance of closest approach when impact parameter b ≠ 0 (non-head-on collision).  
c10_math_cbse_08_001 | Trigonometry (sine, cosine, cotangent) relates impact parameter b, scattering angle θ, and distance of closest approach in the hyperbolic trajectory.  
c11_math_cbse_13_009 | Product rule for derivatives appears when differentiating the total energy expression E = K + U to find stable orbit conditions in the Rutherford model.
## PREREQ_CONCEPT
Conservation of mechanical energy applied to a system of two charged particles interacting via Coulomb's law.

## PREREQ_BEFORE
The student must be able to state the work-energy theorem, convert MeV to joules, and write the electrostatic potential energy formula for two point charges.

## PREREQ_STUCK
If stuck, review c11_phy_cbse_05_010 (Conservation of Mechanical Energy) and practice MeV↔Joule conversions using 1 eV = 1.6 × 10⁻¹⁹ J.

## WORKED_EXAMPLE_1
PROBLEM: In a Rutherford scattering experiment, α-particles of kinetic energy 5.5 MeV are incident on a thin gold foil (Z = 79). The detector counts 1000 particles per minute at a scattering angle of 30°. If the detector is moved to 90°, and the scattering follows the Rutherford formula N(θ) ∝ 1/sin⁴(θ/2), how many particles per minute will be detected at 90°? Assume the solid angle and beam intensity remain constant.

STEPS:
- Step 1: Identify given: K = 5.5 MeV (not needed for ratio), θ₁ = 30°, N₁ = 1000 min⁻¹, θ₂ = 90°. Rutherford scattering formula: N(θ) = C / sin⁴(θ/2) where C is constant for fixed K, Z, thickness, solid angle.
- Step 2: Compute sin(θ₁/2) = sin(15°) = 0.2588; sin⁴(15°) = (0.2588)⁴ = 0.00448.
- Step 3: Compute sin(θ₂/2) = sin(45°) = 0.7071; sin⁴(45°) = (0.7071)⁴ = 0.25.
- Step 4: Ratio N₂/N₁ = sin⁴(θ₁/2) / sin⁴(θ₂/2) = 0.00448 / 0.25 = 0.01792.
- Step 5: N₂ = 1000 × 0.01792 = 17.92 ≈ 18 particles per minute.

REASONING: The Rutherford differential cross-section (derived from Coulomb force and hyperbolic trajectory) predicts that the number of particles scattered into a given solid angle falls as 1/sin⁴(θ/2). This steep angular dependence is the hallmark of a 1/r² force and was the key evidence for the nuclear model. The calculation uses only the angular dependence — the energy, Z, and foil thickness cancel in the ratio.

ANSWER: 18 particles per minute (at 90°).

## WORKED_EXAMPLE_2
PROBLEM: An α-particle with kinetic energy 6.0 MeV approaches a copper nucleus (Z = 29) with an impact parameter b = 2.0 × 10⁻¹⁴ m. Calculate the scattering angle θ. Use 1/(4πε₀) = 9.0 × 10⁹ N·m²/C², e = 1.6 × 10⁻¹⁹ C.

STEPS:
- Step 1: Convert K = 6.0 MeV = 6.0 × 10⁶ × 1.6 × 10⁻¹⁹ J = 9.6 × 10⁻¹³ J.
- Step 2: Use the exact Rutherford relation between impact parameter b and scattering angle θ for a repulsive Coulomb force: b = (1/4πε₀) × (Ze)(2e) / (2K) × cot(θ/2). Derived from conservation of energy and angular momentum.
- Step 3: Compute constant factor: (1/4πε₀) × 2Ze² / (2K) = (9.0 × 10⁹) × 2 × 29 × (1.6 × 10⁻¹⁹)² / (2 × 9.6 × 10⁻¹³).
- Step 4: Numerator: 9.0e9 × 2 × 29 × 2.56e-38 = 1.336 × 10⁻²⁶. Denominator: 1.92 × 10⁻¹². Factor = 1.336e-26 / 1.92e-12 = 6.96 × 10⁻¹⁵ m.
- Step 5: cot(θ/2) = b / factor = (2.0 × 10⁻¹⁴) / (6.96 × 10⁻¹⁵) = 2.874.
- Step 6: θ/2 = cot⁻¹(2.874) = 19.2° → θ = 38.4°.

REASONING: For non-head-on collisions, the trajectory is a hyperbola. The impact parameter b and scattering angle θ are related through the Coulomb force geometry. The formula b = (k·2Ze²/2K) cot(θ/2) comes from integrating the equations of motion (or using angular momentum conservation L = mvb = mv'd_perp). This is a standard JEE-level problem testing the full scattering kinematics.

ANSWER: θ ≈ 38.4°.

## WORKED_EXAMPLE_3
PROBLEM: A beam of α-particles (K = 7.7 MeV) is incident on a thin foil of an unknown element. The experiment measures the distance of closest approach for head-on collisions as d = 2.5 × 10⁻¹⁴ m. Identify the element (find Z). If the same experiment were done with protons (K = 7.7 MeV) instead of α-particles, what would be the new distance of closest approach for the same element?

STEPS:
- Step 1: For α-particle (charge 2e), head-on: d_α = (1/4πε₀) × (2e)(Ze) / K. Given d_α = 2.5 × 10⁻¹⁴ m, K = 1.232 × 10⁻¹² J.
- Step 2: Solve for Z: Z = d_α × K / [(1/4πε₀) × 2e²] = (2.5e-14 × 1.232e-12) / (9.0e9 × 2 × (1.6e-19)²).
- Step 3: Compute denominator: 9.0e9 × 2 × 2.56e-38 = 4.608e-28. Numerator: 3.08e-26. Z = 3.08e-26 / 4.608e-28 = 66.8 ≈ 67.
- Step 4: Element with Z = 67 is Holmium (Ho).
- Step 5: For proton (charge e), same K, same Z: d_p = (1/4πε₀) × (e)(Ze) / K = ½ × d_α (since charge product is halved).
- Step 6: d_p = 2.5 × 10⁻¹⁴ / 2 = 1.25 × 10⁻¹⁴ m.

REASONING: The distance of closest approach scales linearly with the product of charges (q₁q₂). For α-particle (2e) on nucleus (Ze), product = 2Ze². For proton (e) on same nucleus, product = Ze² — exactly half. Thus d_p = d_α/2. This problem combines element identification (using the periodic table) with scaling reasoning — a common competitive exam pattern.

ANSWER: Element is Holmium (Z = 67); distance of closest approach for protons = 1.25 × 10⁻¹⁴ m.

## COMPETENCY_QUESTION_1
QUESTION: In the Geiger-Marsden experiment, the gold foil thickness was 2.1 × 10⁻⁷ m and the density of gold is 19.3 g/cm³. The atomic mass of gold is 197 u. (a) Calculate the number of gold nuclei per unit area (nuclei/m²) in the foil. (b) If the incident α-particle beam has a cross-sectional area of 1 mm² and intensity 10⁸ particles/s, estimate the rate of α-particles scattered at angles >90° (use the fact that 1 in 8000 scatter at >90°). (c) Explain why the single-scattering assumption is valid for this foil thickness.

COMPETENCY: Interpreting physical situations using formulas and estimating orders of magnitude

STEPS:
- Step 1: (a) Number of nuclei per unit volume = (density × Avogadro's number) / atomic mass = (19300 kg/m³ × 6.022 × 10²³) / (0.197 kg/mol) = 5.90 × 10²⁸ m⁻³. Nuclei per unit area = volume density × thickness = 5.90e28 × 2.1e-7 = 1.24 × 10²² m⁻².
- Step 2: (b) Beam area = 1 mm² = 10⁻⁶ m². Incident rate = 10⁸ s⁻¹. Total nuclei in beam path = 1.24e22 × 10⁻⁶ = 1.24 × 10¹⁶. Fraction scattered >90° = 1/8000. Scattered rate = 10⁸ / 8000 = 1.25 × 10⁴ s⁻¹ = 12,500 per second.
- Step 3: (c) Single scattering valid because probability of an α-particle encountering two nuclei is (number of layers) × (cross-section per nucleus) ≪ 1. Cross-section for >90° scattering ≈ πd² where d ≈ 30 fm. π(30e-15)² ≈ 2.8e-27 m². Probability per layer ≈ 2.8e-27 × 5.9e28 × (atomic spacing) ≈ 0.001. With 750 layers, total probability ≈ 0.75 — borderline but acceptable for the thin foil used. The experiment's agreement with theory confirms validity.

ANSWER: (a) 1.24 × 10²² nuclei/m²; (b) 1.25 × 10⁴ particles/s scattered at >90°; (c) The foil is thin enough that the probability of multiple large-angle scatterings is small (<1), and the observed angular distribution matches the single-scattering Rutherford formula.

DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A student argues: "Rutherford's model is wrong because it predicts the electron should radiate and spiral into the nucleus, but atoms are stable. Therefore, the nucleus cannot exist." Identify the logical flaw in this argument and explain what the correct conclusion should be.

COMPETENCY: Evaluating scientific models and identifying logical fallacies

STEPS:
- Step 1: The argument commits the fallacy of denying the antecedent / false dilemma. It assumes: "If Rutherford's nuclear model is correct, then classical electromagnetism must fully describe the electron's motion." But the premise "classical EM applies at atomic scales" is exactly what the stability contradiction disproves.
- Step 2: The correct logic: Experimental fact 1: Large-angle scattering → nucleus exists (Rutherford). Experimental fact 2: Atoms are stable + line spectra → classical EM fails at atomic scale. Conclusion: The nuclear model is correct *but incomplete* — it needs quantum mechanics (Bohr's postulates, then full QM) to describe electron dynamics.
- Step 3: The nucleus's existence is independently confirmed by scattering (a classical Coulomb interaction at distances > nuclear size). The electron's behavior requires new physics. These are separate domains: the nucleus is probed by α-particles (classical particles); the electron requires quantum description.
- Step 4: Modern view: Rutherford discovered the nucleus; Bohr/Quantum Mechanics explained the electrons. Both are correct in their domains.

ANSWER: The flaw is assuming that the failure of classical EM for electrons invalidates the nuclear model. The nuclear model is supported by scattering data (which uses classical Coulomb force at large distances). The electron instability problem shows classical EM is inadequate for bound electrons — leading to quantum theory, not to discarding the nucleus.

DIFFICULTY: medium