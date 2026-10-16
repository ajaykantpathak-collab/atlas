## ELI5
A smoke detector's whisper of americium ionises the air beside it: radioactivity is the unstable nucleus's spontaneous tumble toward stability, emitting alpha particles, beta electrons or positrons, or gamma photons. Alpha sheds two protons and two neutrons, beta-minus turns a neutron into a proton, beta-plus the reverse, and gamma only lowers the nucleus's excitement - the element untouched. Activity is counted in becquerels, one decay each second.

## DEFINITION
Radioactivity is the spontaneous nuclear process in which an unstable atomic nucleus transforms into a more stable configuration by emitting alpha particles (helium nuclei, \(^4_2\text{He}\)), beta particles (electrons \(^0_{-1}e\) or positrons \(^0_{+1}e\) with accompanying neutrinos/antineutrinos), or gamma rays (high-energy photons \(\gamma\)). The SI unit of activity (decays per second) is the becquerel (Bq), where 1 Bq = 1 decay/s.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can write balanced nuclear equations for α, β⁻, β⁺, and γ decays, identify the daughter nucleus (Z, A) from the parent, and explain how each decay changes the neutron-to-proton ratio to move toward the valley of stability. They can also calculate the Q-value of a decay given atomic masses.

## SCOPE_BOUNDARY
Covers the three natural radioactive decay modes (α, β, γ), their nuclear equations, particle properties (charge, mass, penetration), and Q-value calculation using atomic masses. Does NOT cover the law of radioactive decay (half-life, mean life, decay constant), which is the next node (c12_phy_cbse_13_007). Does not cover artificial radioactivity or decay series.

## WALKTHROUGH
Observe a smoke detector at home — it contains a tiny americium-241 source that emits alpha particles to ionize air. When smoke enters, the ionization current drops, triggering the alarm. This real-world device relies on α-decay. Begin by recalling nuclear notation \(^A_ZX\) from c12_phy_cbse_13_001: the superscript A is total nucleons, subscript Z is protons. For α-decay, the nucleus loses 2 protons and 2 neutrons; for β⁻, a neutron converts to a proton + electron + antineutrino; for β⁺, a proton converts to a neutron + positron + neutrino; γ-decay only changes the energy state. Use mass-energy equivalence (c12_phy_cbse_13_003) to compute the energy released (Q-value) from the mass difference between initial and final atoms.

Takeaway first: radioactivity is the nucleus's self-medication - each decay mode adjusts the neutron-to-proton ratio toward the valley of stability, gamma merely cooling the patient. Exam moves: balanced-equation questions for all four decays, daughter-nucleus identification questions, ratio-trend questions, and Q-value computations from masses. Method: rerun the smoke detector - alpha source ionising air, notation recalled, each decay's bookkeeping done. Check yourself: the flagged error lets gamma change the element - gamma carries energy only, so Z and A stand still while the nucleus exhales. Drill: write one balanced equation per decay mode and compute one Q-value.

## DIAGNOSTIC_QUESTION_1
Write the nuclear equation for the α-decay of \(^{226}_{88}\text{Ra}\). Identify the daughter nucleus.

## DIAGNOSTIC_ANSWER_1
\(^{226}_{88}\text{Ra} \rightarrow ^{222}_{86}\text{Rn} + ^{4}_{2}\text{He}\). The daughter is radon-222 (\(^{222}_{86}\text{Rn}\)). A wrong answer (e.g., wrong Z or A) reveals the student does not conserve nucleon number and proton number separately in nuclear reactions.

## DIAGNOSTIC_QUESTION_2
In β⁻ decay, a neutron transforms into a proton, an electron, and an antineutrino. Explain why the atomic number Z increases by 1 while the mass number A remains unchanged.

## DIAGNOSTIC_ANSWER_2
The neutron (n) → proton (p) + electron (e⁻) + antineutrino (\(\bar{\nu}_e\)). The proton stays in the nucleus, increasing Z by 1; the electron is emitted as the β⁻ particle. Total nucleons (A) unchanged because a nucleon merely changes type. A wrong answer (e.g., "A decreases") shows confusion between losing a nucleon and converting one.

## DIAGNOSTIC_QUESTION_3
Given atomic masses: \(m(^{14}_{6}\text{C}) = 14.003242\,\text{u}\), \(m(^{14}_{7}\text{N}) = 14.003074\,\text{u}\). Calculate the Q-value (in MeV) for the β⁻ decay of carbon-14. Use 1 u = 931.5 MeV/c².

## DIAGNOSTIC_ANSWER_3
Step 1: Write decay: \(^{14}_{6}\text{C} \rightarrow ^{14}_{7}\text{N} + e^- + \bar{\nu}_e\).  
Step 2: Q = [m(¹⁴C) - m(¹⁴N)]c². (Atomic masses include electrons; the emitted electron is accounted for because the daughter atom has one extra electron.)  
Step 3: Δm = 14.003242 u - 14.003074 u = 0.000168 u.  
Step 4: Q = 0.000168 u × 931.5 MeV/u = 0.1565 MeV ≈ 156.5 keV.  
A wrong sign or using nuclear masses without electron correction reveals misunderstanding of atomic vs nuclear mass in Q-value calculations.

## DIAGNOSTIC_QUESTION_4
Compare the penetration ability of α, β, and γ radiation through paper, aluminum foil (3 mm), and lead (1 cm). Which radiation is stopped by each? Explain the physical reason for the order.

## DIAGNOSTIC_ANSWER_4
Paper stops α (high charge +2e, large mass → strong ionization, short range). Aluminum foil (3 mm) stops β (charge -e, small mass → moderate ionization). Lead (1 cm) significantly attenuates γ (no charge, no mass → weak interaction, high penetration). A wrong ordering indicates confusion between ionizing power and penetration depth.

## DIAGNOSTIC_QUESTION_5
A student writes the β⁺ decay of \(^{22}_{11}\text{Na}\) as: \(^{22}_{11}\text{Na} \rightarrow ^{22}_{10}\text{Ne} + e^+\). Is this equation complete? If not, what is missing and why must it be included for conservation laws?

## DIAGNOSTIC_ANSWER_5
Incomplete. Missing: electron neutrino (\(\nu_e\)). The correct equation: \(^{22}_{11}\text{Na} \rightarrow ^{22}_{10}\text{Ne} + e^+ + \nu_e\). The neutrino carries away missing energy, momentum, and lepton number (Lₑ: 0 → +1 for e⁺ and -1 for \(\nu_e\)? Actually lepton number: e⁺ has Lₑ = -1, \(\nu_e\) has Lₑ = +1, total 0). Without it, energy/momentum and lepton number conservation would be violated. A student omitting the neutrino thinks only charge and nucleon number matter.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a Geiger-Müller counter, a set of absorbers (paper, aluminum, lead), and a mixed α-β-γ source to identify which radiation type is which. Describe the procedure and expected count-rate pattern.

## DIAGNOSTIC_ANSWER_6
Procedure: Place source near GM tube, record background-subtracted count rate R₀. Insert paper → count rate drops sharply (α stopped). Remove paper, insert 3 mm Al → further drop (β stopped). Remove Al, insert 1 cm Pb → count rate reduces but not to zero (γ attenuated). The remaining counts are γ. A poor answer lacks systematic absorber sequencing or fails to link count-rate changes to specific radiation properties.

## COMMON_MISCONCEPTION
Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay. They write equations like \(^{A}_{Z}X \rightarrow ^{A-4}_{Z-2}Y + \gamma\). In reality, γ-decay only lowers the nuclear energy state; Z and A are unchanged. The error arises from treating γ as a "particle" that carries away nucleons, rather than a photon carrying only energy and momentum.

## ON_FAILURE
If the student confuses γ-decay with transmutation: (1) Review c12_phy_cbse_13_001 nuclear notation — emphasize that γ has Z=0, A=0. (2) Write three decay equations side-by-side on paper, highlighting what changes (Z, A) in each. (3) Use the "valley of stability" diagram: α and β move the nucleus toward stability; γ only de-excites an already-stable (or metastable) nucleus. (4) Re-attempt Diagnostic Question 5 and 6.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_13_001, c12_phy_cbse_13_003, c10_phy_cbse_03_007, c11_phy_cbse_01_006, c12_phy_cbse_13_002, c12_phy_cbse_13_004

## PREREQUISITE_REASONS
c12_phy_cbse_13_001: Need nuclear notation (Z, A) and isotope concepts to write decay equations.
c12_phy_cbse_13_003: Mass-energy equivalence (E=mc²) is essential for Q-value calculations.
c10_phy_cbse_03_007: Class 10 introduction to nuclear fission/fusion gives prior exposure to nuclear reactions and energy release.
c11_phy_cbse_01_006: Dimensional analysis ensures nuclear equations balance in mass number and charge (units of nucleon count and charge).
c12_phy_cbse_13_002: Alpha decay Q-value calculation uses mass defect/binding energy differences; nuclear force determines alpha particle stability.  
c12_phy_cbse_13_004: Radioactive decay of fission products (beta chains) is a direct consequence of fission; understanding fragments leads to decay series.  

## FORWARD_NODE_IDS
c12_phy_cbse_13_007
## FORWARD_REASONS
c12_phy_cbse_13_007: Understanding the decay modes (α, β, γ) is prerequisite for the statistical law of decay (half-life, mean life, activity) because the decay constant λ depends on the specific decay channel.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_chem_cbse_01_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative concept (rate of change) underpins the decay rate dN/dt = -λN in the next node.
c11_chem_cbse_01_001: Chemical kinetics (rate laws, first-order reactions) provides the mathematical model identical to radioactive decay law.

## CHAIN_DESCRIPTION
c12_phy_cbse_13_001 -> c12_phy_cbse_13_006 -> c12_phy_cbse_13_007

## THIS_FORMULA
Q = [m_parent - m_daughter - m_emitted] c² (for α: m_emitted = m_He; for β⁻: Q = [m_parent - m_daughter] c² using atomic masses; for β⁺: Q = [m_parent - m_daughter - 2m_e] c²; for γ: Q = E_excitation). Activity unit: 1 Bq = 1 s⁻¹.

## FORMULA_VARIABLES
Q = total energy released (J or MeV), m_parent = atomic mass of parent nucleus (u or kg), m_daughter = atomic mass of daughter nucleus (u or kg), m_emitted = mass of emitted particle (u or kg), c = speed of light (3×10⁸ m/s), 1 u = 931.5 MeV/c² = 1.6605×10⁻²⁷ kg.

## FORMULA_UNITS
MeV, u, kg, m/s, J, Bq (s⁻¹)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | Derivative dN/dt models the instantaneous decay rate, linking to decay constant λ.
c11_chem_cbse_01_001 | First-order kinetics in chemistry (rate = k[A]) is mathematically identical to radioactive decay law (R = λN).
## PREREQ_CONCEPT
Conservation of nucleon number (A) and proton number (Z) in nuclear reactions, and mass-energy equivalence (E=mc²).

## PREREQ_BEFORE
Student can write nuclear symbols \(^A_ZX\), balance simple nuclear equations, and convert mass defect to energy using 1 u = 931.5 MeV.

## PREREQ_STUCK
Revisit c12_phy_cbse_13_001 for nuclear notation and c12_phy_cbse_13_003 for mass-energy conversion; practice balancing equations like \(^{14}_6C \rightarrow ? + e^-\).

## WORKED_EXAMPLE_1
PROBLEM: Uranium-238 decays by α-emission to thorium-234. Given atomic masses: m(²³⁸U) = 238.050788 u, m(²³⁴Th) = 234.043601 u, m(⁴He) = 4.002603 u. Calculate the kinetic energy of the α-particle (Q_α) in MeV. Assume the daughter nucleus recoil energy is negligible.
STEPS:
- Step 1: Write the balanced nuclear equation: \(^{238}_{92}\text{U} \rightarrow ^{234}_{90}\text{Th} + ^{4}_{2}\text{He}\).
- Step 2: Identify given atomic masses in u: m_U = 238.050788 u, m_Th = 234.043601 u, m_He = 4.002603 u.
- Step 3: Compute total mass of products: m_Th + m_He = 234.043601 + 4.002603 = 238.046204 u.
- Step 4: Find mass defect: Δm = m_U - (m_Th + m_He) = 238.050788 - 238.046204 = 0.004584 u.
- Step 5: Convert to energy using 1 u = 931.5 MeV/c²: Q = 0.004584 × 931.5 = 4.270 MeV.
- Step 6: Since thorium recoil is small, almost all Q goes to α-particle kinetic energy: K_α ≈ Q = 4.27 MeV.
REASONING: In α-decay, the Q-value is the total kinetic energy shared between α and daughter. Because the α is much lighter, it carries >98% of the kinetic energy. Using atomic masses automatically accounts for the 2 electrons lost with the α (He atom has 2 electrons) and the 2 extra electrons on the Th atom (initially U had 92 electrons, Th has 90 + 2 from He = 92).
ANSWER: Q_α = 4.27 MeV (K_α ≈ 4.27 MeV)

## WORKED_EXAMPLE_2
PROBLEM: Phosphorus-32 undergoes β⁻ decay to sulfur-32. Atomic masses: m(³²P) = 31.973907 u, m(³²S) = 31.972071 u. Calculate the maximum kinetic energy of the emitted electron (endpoint energy) in MeV.
STEPS:
- Step 1: Write decay: \(^{32}_{15}\text{P} \rightarrow ^{32}_{16}\text{S} + e^- + \bar{\nu}_e\).
- Step 2: For β⁻ decay using atomic masses, Q = [m_parent - m_daughter] c² because the daughter atom has one more electron than the parent, exactly balancing the emitted electron.
- Step 3: Δm = m(³²P) - m(³²S) = 31.973907 - 31.972071 = 0.001836 u.
- Step 4: Q = 0.001836 u × 931.5 MeV/u = 1.710 MeV.
- Step 5: This Q is shared between electron and antineutrino. The maximum electron kinetic energy (when antineutrino gets zero) equals Q = 1.71 MeV.
REASONING: The continuous β-spectrum arises because the antineutrino carries away variable energy. The endpoint energy is the total Q-value. Atomic masses simplify the calculation by including atomic electrons.
ANSWER: Maximum electron kinetic energy = 1.71 MeV

## WORKED_EXAMPLE_3
PROBLEM: A nucleus of \(^{40}_{19}\text{K}\) can decay by both β⁻ to \(^{40}_{20}\text{Ca}\) and β⁺/EC to \(^{40}_{18}\text{Ar}\). Given atomic masses: m(⁴⁰K) = 39.963998 u, m(⁴⁰Ca) = 39.962591 u, m(⁴⁰Ar) = 39.962383 u. Determine which decays are energetically allowed and calculate their Q-values.
STEPS:
- Step 1: Check β⁻ decay: \(^{40}_{19}\text{K} \rightarrow ^{40}_{20}\text{Ca} + e^- + \bar{\nu}_e\). Q_β⁻ = [m_K - m_Ca] × 931.5 MeV/u.
- Step 2: Δm_β⁻ = 39.963998 - 39.962591 = 0.001407 u. Q_β⁻ = 0.001407 × 931.5 = 1.311 MeV > 0 → allowed.
- Step 3: Check β⁺ decay: \(^{40}_{19}\text{K} \rightarrow ^{40}_{18}\text{Ar} + e^+ + \nu_e\). For β⁺ using atomic masses, Q_β⁺ = [m_K - m_Ar - 2m_e] c². (Atomic mass of Ar includes 18 electrons; K has 19. The emitted positron requires an extra electron mass equivalent, hence -2m_e.)
- Step 4: m_e = 0.00054858 u. Δm_β⁺ = 39.963998 - 39.962383 - 2×0.00054858 = 0.001615 - 0.001097 = 0.000518 u.
- Step 5: Q_β⁺ = 0.000518 × 931.5 = 0.482 MeV > 0 → β⁺ allowed.
- Step 6: Electron capture (EC) always allowed if β⁺ is allowed, with Q_EC = [m_K - m_Ar] c² = 0.001615 × 931.5 = 1.504 MeV.
REASONING: β⁺ decay requires at least 2m_e (1.022 MeV) mass difference; here the atomic mass difference is 1.504 MeV, so β⁺ is allowed but with lower Q than EC. Both β⁻ and β⁺/EC branches exist for ⁴⁰K.
ANSWER: β⁻ allowed (Q=1.31 MeV); β⁺ allowed (Q=0.48 MeV); EC allowed (Q=1.50 MeV)

## COMPETENCY_QUESTION_1
QUESTION: A radioactive source emits three types of radiation. In a magnetic field perpendicular to the beam, one component bends left, one bends right, and one goes straight. In an electric field, the straight component is unaffected, while the other two deflect in opposite directions. Identify each component as α, β⁻, or γ. Justify using charge and mass.
COMPETENCY: Interpreting physical situations using Lorentz force and particle properties
STEPS:
- Step 1: Recall Lorentz force F = q(v × B). Direction depends on sign of q.
- Step 2: γ has q=0 → no deflection in B or E → goes straight.
- Step 3: α has q=+2e, β⁻ has q=-e. In B-field, opposite charges bend opposite ways.
- Step 4: In E-field, same: opposite charges deflect opposite directions.
- Step 5: The component bending left in B and right in E (or vice versa) is β⁻; the other is α.
ANSWER: Straight = γ; bends opposite to α in both fields = β⁻; the remaining = α.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The isotope \(^{64}_{29}\text{Cu}\) decays by β⁻ (39%), β⁺ (19%), and EC (42%). Given atomic masses: m(⁶⁴Cu) = 63.929764 u, m(⁶⁴Zn) = 63.929142 u, m(⁶⁴Ni) = 63.927966 u. (a) Calculate Q-values for each branch. (b) Explain why all three branches can coexist despite β⁺ requiring 2m_e threshold. (c) If a 1 mg sample of pure ⁶⁴Cu is prepared, what is its initial activity in Bq? (Half-life = 12.7 h).
COMPETENCY: Multi-step calculation combining nuclear decay energetics, branching ratios, and activity definition
STEPS:
- Step 1 (a): β⁻ to ⁶⁴Zn: Q_β⁻ = (m_Cu - m_Zn)×931.5 = (63.929764-63.929142)×931.5 = 0.000622×931.5 = 0.579 MeV.
- Step 2: β⁺ to ⁶⁴Ni: Q_β⁺ = (m_Cu - m_Ni - 2m_e)×931.5. m_e=0.00054858 u. Δm = 63.929764 - 63.927966 - 0.001097 = 0.000701 u. Q_β⁺ = 0.000701×931.5 = 0.653 MeV.
- Step 3: EC to ⁶⁴Ni: Q_EC = (m_Cu - m_Ni)×931.5 = (0.001798)×931.5 = 1.675 MeV.
- Step 4 (b): All Q > 0. β⁺ is allowed because m_Cu - m_Ni = 1.675 MeV > 1.022 MeV (2m_ec²). Branching ratios depend on nuclear matrix elements, not just Q.
- Step 5 (c): N = (1 mg / 63.93 g/mol) × 6.022×10²³ = 9.42×10¹⁸ atoms. λ = ln2 / T½ = 0.693 / (12.7×3600 s) = 1.52×10⁻⁵ s⁻¹. Activity R = λN = 1.52×10⁻⁵ × 9.42×10¹⁸ = 1.43×10¹⁴ Bq.
REASONING: Combines Q-value calculations for three decay modes with the definition of activity R = λN. The coexistence of β⁺ and EC is common when the mass difference exceeds 2m_e but the β⁺ phase space is smaller.
ANSWER: (a) Q_β⁻=0.58 MeV, Q_β⁺=0.65 MeV, Q_EC=1.68 MeV. (b) Mass difference 1.68 MeV > 1.02 MeV threshold. (c) Initial activity = 1.4×10¹⁴ Bq.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The SI unit of activity (decays per second) is the ______ (Bq), where 1 Bq = 1 decay/s.

## DIAGNOSTIC_ANSWER_7
becquerel

The becquerel is activity's unit: decays per second, named and numbered in the definition's own breath. **A wrong answer (a curie) reveals the student has answered with the older, larger unit the SI retired.** The becquerel is activity's unit: decays per second, named and numbered in the definition's own breath.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a smoke detector at home — it contains a tiny americium-241 source that emits alpha ______ to ionize air.

## DIAGNOSTIC_ANSWER_8
particles

The alpha particles complete the detector's mechanism: americium's decay ionises the air, and smoke bends the current into an alarm. **A wrong answer (beta) reveals the student has swapped the source's emission and kept the gadget's praise.**

## DIAGNOSTIC_QUESTION_9
What is Radioactivity? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
The SI unit of activity (decays per second) is the becquerel (Bq), where 1 Bq = 1 decay/s.

The definition answers only the unit: the walkthrough quotes the becquerel as radioactivity's SI measure of activity. **A wrong answer describing decay modes reveals the student has answered a unit question with the phenomenon's biography.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Radioactivity?

## DIAGNOSTIC_ANSWER_10
Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.

The flagged error lets gamma renovate the nucleus: gamma-decay is the nucleus sighing out excess energy - same Z, same A, calmer tenant. **A wrong answer that changes the element under gamma reveals the student has lent gamma the transmuting powers of its alpha and beta siblings.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can write balanced nuclear equations for α, β⁻, β⁺, and γ decays, identify the daughter nucleus (Z, A) from the parent, and explain how each decay changes the neutron-to-proton ratio to move toward the valley of stability.

Mastery is the balanced-ledger skill: all four decay equations written, daughters identified, ratios explained toward stability. **A wrong answer (alpha only) reveals the student has learned one quarter of the ledger and called it the book.**
