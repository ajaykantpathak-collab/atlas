## ELI5
A neon sign burns red-orange while a filament bulb glows white: Bohr's model explains the difference with three audacious postulates. Electrons occupy stationary orbits without radiating; angular momentum is quantised in units of h over two pi, deciding which orbits survive; and light is emitted only in jumps, each photon carrying exactly the energy gap between states. Classical physics sputtered at every clause; the spectra demanded all three.

## DEFINITION
Bohr's model of the hydrogen atom is based on three postulates: (1) Electrons revolve in certain discrete, stable orbits called stationary states without radiating energy, each with a definite total energy. (2) The angular momentum of the electron in these orbits is quantized, i.e., \(L = n\frac{h}{2\pi}\) where \(n = 1,2,3,\dots\) is the principal quantum number and \(h\) is Planck's constant. (3) Radiation is emitted or absorbed only when an electron transitions between stationary states; the photon energy equals the energy difference: \(h\nu = E_i - E_f\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
Student can state all three Bohr postulates verbatim using NCERT terminology, explain why each postulate was a radical departure from classical physics, and apply the quantization condition \(L = n\frac{h}{2\pi}\) to identify allowed orbits for a given quantum number \(n\). Student can also explain how the third postulate links energy differences to spectral line frequencies.

## SCOPE_BOUNDARY
This node covers **only** the three Bohr postulates and their immediate physical interpretation. It does NOT cover derivation of orbital radii, energy levels, spectral series formulas (Lyman, Balmer, etc.), de Broglie's wave explanation, or limitations of the model — those are handled in subsequent nodes (c12_phy_cbse_12_003, c12_phy_cbse_12_004, c12_phy_cbse_12_005).

## WALKTHROUGH
Start with a real-world observation: a neon sign glowing with distinct colours (red-orange) while an incandescent bulb emits white light. Ask: "Why do different gases emit only specific colours?" Connect to Class 11's atomic spectra discussion (if covered) or the flame test in chemistry (Na gives yellow, Cu gives green). Introduce the crisis: Rutherford's nuclear model predicts electrons should spiral into the nucleus while emitting a continuous rainbow, contradicting the observed line spectra. Present Bohr's 1913 solution as three bold postulates that "patch" classical mechanics with quantum ideas. Emphasize Postulate 2's quantization of angular momentum — not energy or radius directly — because \(h\) has dimensions of angular momentum. End by writing the three postulates on the board with their equations, highlighting that Postulate 3 (\(h\nu = E_i - E_f\)) is the bridge to spectroscopy.

Takeaway first: Bohr's three postulates patch the collapsing Rutherford atom - stable orbits, quantised angular momentum, and photons priced at energy gaps. Exam moves: verbatim-statement questions, radical-departure questions against classical physics, quantisation questions identifying allowed orbits, and bridge questions linking postulate three to spectral lines. Method: rerun the neon sign - discrete colours witnessed, the spiralling-electron crisis recalled, the three postulates laid over the wreckage. Check yourself: the quantisation lands on angular momentum because h's dimensions are angular momentum's - not energy's, not radius's - which is why the postulate is shaped as it is. Drill: state all three postulates and explain why each was forced by experiment.

## DIAGNOSTIC_QUESTION_1
State Bohr's second postulate exactly as given in NCERT, including the formula and the meaning of each symbol.

## DIAGNOSTIC_ANSWER_1
**Correct answer:** "The electron revolves around the nucleus only in those orbits for which the angular momentum is an integral multiple of \(h/2\pi\). That is, \(L = n\frac{h}{2\pi}\), where \(n = 1,2,3,\dots\) is the principal quantum number and \(h = 6.63 \times 10^{-34}\,\text{J·s}\) is Planck's constant."  
**Wrong-answer diagnosis:** If a student writes \(L = n\frac{h}{\pi}\) or \(L = n\hbar\) without defining \(\hbar = h/2\pi\), they have memorized a variant but not the NCERT wording — this costs marks in board exams where exact phrasing matters. If they say "angular momentum is quantized" without the formula, they miss the quantitative condition needed for later derivations.

## DIAGNOSTIC_QUESTION_2
Why did Bohr choose to quantize *angular momentum* rather than, say, kinetic energy or orbital radius? Use dimensional analysis of Planck's constant \(h\) to justify your answer.

## DIAGNOSTIC_ANSWER_2
**Correct answer:** Planck's constant \(h\) has dimensions of angular momentum \([ML^2T^{-1}]\) (same as \(mvr\)). Quantizing a quantity requires a constant with the same dimensions; \(h\) naturally provides the quantum of angular momentum. Kinetic energy has dimensions \([ML^2T^{-2}]\) and radius has \([L]\), so \(h\) cannot directly quantize them without introducing additional constants.  
**Wrong-answer diagnosis:** A student who says "because angular momentum is conserved" confuses a dynamical principle with a quantization rule. Another who says "Bohr guessed it" misses the dimensional argument that makes the postulate *natural* — a point explicitly mentioned in NCERT's "Points to Ponder" #2.

## DIAGNOSTIC_QUESTION_3
A hydrogen atom electron is in the \(n=3\) stationary state. Calculate its angular momentum in SI units. (Use \(h = 6.63 \times 10^{-34}\,\text{J·s}\).)

## DIAGNOSTIC_ANSWER_3
**Steps:**  
1. Identify formula: \(L = n\frac{h}{2\pi}\)  
2. Substitute \(n=3\), \(h = 6.63 \times 10^{-34}\,\text{J·s}\)  
3. Compute: \(L = 3 \times \frac{6.63 \times 10^{-34}}{2 \times 3.1416} = 3 \times 1.055 \times 10^{-34} = 3.165 \times 10^{-34}\,\text{J·s}\)  
4. Unit check: \(\text{J·s} = \text{kg·m}^2\text{s}^{-1}\) — correct for angular momentum.  
**Answer:** \(L = 3.17 \times 10^{-34}\,\text{kg·m}^2\text{s}^{-1}\) (or \(\text{J·s}\)).  
**Wrong-answer diagnosis:** If a student uses \(L = n h\) (forgets \(2\pi\)), they get \(1.99 \times 10^{-33}\,\text{J·s}\) — a common error from misremembering the formula. If they use \(\hbar = h/2\pi\) but forget to multiply by \(n\), they get the ground-state value. Both reveal a lack of fluency with the exact postulate.

## DIAGNOSTIC_QUESTION_4
Compare the predictions of Rutherford's model and Bohr's model for: (a) stability of the atom, (b) nature of emitted spectrum (continuous vs. line), (c) energy of the electron in orbit. Present as a 3-row table.

## DIAGNOSTIC_ANSWER_4
**Correct answer:**  

| Aspect | Rutherford Model | Bohr Model |
|--------|------------------|------------|
| Stability | Unstable — accelerating electron radiates, spirals in | Stable — electron in stationary states does not radiate |
| Emitted Spectrum | Continuous (all frequencies) | Line spectrum (discrete frequencies) |
| Electron Energy | Any value (continuously decreasing) | Quantized: only specific values \(E_n = -13.6/n^2\,\text{eV}\) |

**Wrong-answer diagnosis:** If a student says Rutherford's model gives line spectra because "electrons are in orbits", they confuse the planetary picture with quantization. If they say Bohr's electron energy is continuous but "jumps" between levels, they contradict Postulate 1 (stationary states have definite energy). This table is a frequent board-exam "compare and contrast" question (2-3 marks).

## DIAGNOSTIC_QUESTION_5
A student claims: "Bohr's third postulate says a photon is emitted when an electron jumps from a higher to a lower orbit. Therefore, the frequency of the emitted photon equals the orbital frequency of the electron in the higher orbit." Evaluate this claim using the correspondence principle and the actual formula \(h\nu = E_i - E_f\).

## DIAGNOSTIC_ANSWER_5
**Correct answer:** The claim is **false** in general. The photon frequency \(\nu = (E_i - E_f)/h\) equals the *difference* in orbital energies divided by \(h\), not the orbital frequency \(f_{\text{orb}} = v/(2\pi r)\). Only in the limit of large \(n\) (correspondence principle) do the two frequencies approximately coincide. For low \(n\) (e.g., \(n=2 \to 1\)), \(\nu_{\text{photon}} \gg f_{\text{orb}}\).  
**Wrong-answer diagnosis:** A student who agrees with the claim is applying classical electromagnetic theory (which Bohr explicitly rejected in Postulate 1) — they think the electron radiates *at* its orbital frequency. This is exactly the classical error Bohr's model was designed to fix. NCERT Example 12.4 shows the classical prediction (\(6.6 \times 10^{15}\,\text{Hz}\)) differs from the actual Lyman-alpha frequency (\(2.47 \times 10^{15}\,\text{Hz}\)).

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to test whether an electron in a stationary state truly does not radiate. Describe the setup, what you would measure, and how the result would distinguish Bohr's Postulate 1 from classical electrodynamics.

## DIAGNOSTIC_ANSWER_6
**Expected answer:** Place a single hydrogen atom in a high-Q microwave cavity tuned to the predicted orbital frequency of the \(n=2\) state (approx. \(8 \times 10^{14}\,\text{Hz}\) — optical, so use an optical cavity). Monitor the cavity for spontaneous photon emission over a time much longer than the classical radiation lifetime (\(\sim 10^{-11}\,\text{s}\)). Classical theory predicts continuous radiation at the orbital frequency, causing the electron to spiral down in \(\sim 10^{-11}\,\text{s}\). Bohr's Postulate 1 predicts *no* radiation at that frequency; the atom stays in \(n=2\) indefinitely until a transition occurs. Detection of zero photons at the orbital frequency (but photons at transition frequencies like Lyman-alpha) confirms Postulate 1.  
**Poor-answer diagnosis:** A student who suggests "measure the electron's acceleration" misses that acceleration alone doesn't prove radiation — the key is detecting the *absence* of radiation at the orbital frequency. Another who says "use a cloud chamber" confuses particle tracks with electromagnetic emission.

## COMMON_MISCONCEPTION
**Misconception:** "Bohr's second postulate means the electron's *speed* is quantized as \(v_n = n\frac{h}{2\pi m r}\)" or "the radius is quantized as \(r_n = n^2 a_0\) directly from the postulate."  
**Why it's wrong:** The postulate **only** quantizes angular momentum \(L = m v r = n\frac{h}{2\pi}\). Speed and radius are *derived* quantities that require combining this with the Coulomb force equation \(mv^2/r = ke^2/r^2\). Students often treat the derived formulas \(v_n = e^2/(2\varepsilon_0 h n)\) and \(r_n = n^2 a_0\) as *additional* postulates, leading to circular reasoning in derivations. In JEE/NEET, this causes errors when asked to "derive \(r_n\) from Bohr's postulates" — they start with \(r_n = n^2 a_0\) instead of \(L = n\hbar\).

## ON_FAILURE
1. Revisit **c11_phy_cbse_06_005** (Angular Momentum: Definition and Conservation) to reinforce \(L = mvr\) and its dimensions.  
2. Re-read NCERT Section 12.4, focusing on the *order* of postulates: Postulate 2 gives \(L = n\hbar\); Postulate 1 says these are stationary states with definite energy; Postulate 3 gives \(h\nu = \Delta E\).  
3. Do a quick dimensional check: write down dimensions of \(h\), \(L\), \(E\), \(r\), \(v\). Verify only \(L\) matches \(h\).  
4. Re-attempt Diagnostic Question 2 and 3. If still stuck, watch a 5-minute animation of "Bohr model quantization" showing standing waves (de Broglie preview) to visualize why angular momentum is the natural choice.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_12_001, c11_phy_cbse_06_005, c11_phy_cbse_05_001, c11_math_cbse_09_001
## PREREQUISITE_REASONS
c12_phy_cbse_12_001: Rutherford's nuclear model is the starting point; Bohr's postulates modify it to fix instability and spectra.
c11_phy_cbse_06_005: Angular momentum definition (\(L = mvr\)) and conservation are essential for Postulate 2.
c11_phy_cbse_05_001: Work-energy theorem and potential energy concepts underpin the energy quantization in Postulate 3.
c11_math_cbse_09_001: Sequences and integer indexing (\(n = 1,2,3,\dots\)) provide the mathematical language for quantum numbers.

## FORWARD_NODE_IDS
c12_phy_cbse_12_003, c12_phy_cbse_12_004, c12_phy_cbse_12_005
## FORWARD_REASONS
c12_phy_cbse_12_003: Postulate 2 (\(L = n\hbar\)) combined with Coulomb force yields quantized radii and energy levels.
c12_phy_cbse_12_004: Postulate 3 (\(h\nu = E_i - E_f\)) with energy levels from c12_phy_cbse_12_003 produces line spectra formulas.
c12_phy_cbse_12_005: de Broglie's matter-wave hypothesis explains *why* angular momentum is quantized (standing waves on circular orbits).

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_06_005, c11_math_cbse_09_001, c10_phy_cbse_04_006
## CROSS_SUBJECT_REASONS
c11_phy_cbse_06_005: Angular momentum quantization directly uses \(L = mvr\) from rotational dynamics.
c11_math_cbse_09_001: The principal quantum number \(n\) is a positive integer — the language of sequences/series.
c10_phy_cbse_04_006: Refraction/Snell's law involves discrete transitions (though not quantum); reinforces the idea of discrete allowed states in wave phenomena.

## CHAIN_DESCRIPTION
c12_phy_cbse_12_001 (Rutherford model) → c12_phy_cbse_12_002 (Bohr postulates) → c12_phy_cbse_12_003 (Energy levels) → c12_phy_cbse_12_004 (Line spectra) → c12_phy_cbse_12_005 (de Broglie explanation)

## THIS_FORMULA
\(L = n\frac{h}{2\pi}\) (angular momentum quantization); \(h\nu = E_i - E_f\) (photon energy in transition)

## FORMULA_VARIABLES
\(L\) = angular momentum (kg·m²·s⁻¹ or J·s); \(n\) = principal quantum number (dimensionless, positive integer); \(h\) = Planck's constant (6.626 × 10⁻³⁴ J·s); \(\nu\) = photon frequency (Hz = s⁻¹); \(E_i, E_f\) = initial and final total energy of electron (J or eV)

## FORMULA_UNITS
J·s, Hz, J, eV, dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_phy_cbse_06_005 | Angular momentum \(L = mvr\) from rotational mechanics is the quantity quantized in Postulate 2.
c11_math_cbse_09_001 | Quantum number \(n\) is a positive integer indexing discrete stationary states — a direct application of sequences.
## PREREQ_CONCEPT
Quantization of angular momentum via Planck's constant; stationary states as non-radiating orbits.

## PREREQ_BEFORE
Student must know: (1) Rutherford's nuclear model and its failures (instability, continuous spectrum), (2) Definition of angular momentum \(L = mvr\) for circular motion, (3) Photon concept \(E = h\nu\) from dual nature of light (Class 12 Ch. 11 or Class 11 Chemistry).

## PREREQ_STUCK
If unsure about angular momentum or photon energy, review c11_phy_cbse_06_005 (Angular Momentum) and Class 12 Chapter 11 (Dual Nature) for \(E = h\nu\).

## WORKED_EXAMPLE_1
PROBLEM: In a hydrogen atom, the electron moves in a circular orbit of radius \(5.3 \times 10^{-11}\,\text{m}\) with speed \(2.2 \times 10^6\,\text{m/s}\). Verify whether this orbit satisfies Bohr's quantization condition for \(n=1\). (Mass of electron \(m_e = 9.1 \times 10^{-31}\,\text{kg}\), \(h = 6.63 \times 10^{-34}\,\text{J·s}\).)

STEPS:
- Step 1: Identify given quantities: \(r = 5.3 \times 10^{-11}\,\text{m}\), \(v = 2.2 \times 10^6\,\text{m/s}\), \(m_e = 9.1 \times 10^{-31}\,\text{kg}\), \(n=1\), \(h = 6.63 \times 10^{-34}\,\text{J·s}\).
- Step 2: Compute angular momentum \(L = m_e v r = (9.1 \times 10^{-31}) \times (2.2 \times 10^6) \times (5.3 \times 10^{-11}) = 1.06 \times 10^{-34}\,\text{kg·m}^2\text{s}^{-1}\).
- Step 3: Compute the quantized value for \(n=1\): \(L_1 = 1 \times \frac{h}{2\pi} = \frac{6.63 \times 10^{-34}}{2 \times 3.1416} = 1.055 \times 10^{-34}\,\text{J·s}\).
- Step 4: Compare: \(1.06 \times 10^{-34} \approx 1.055 \times 10^{-34}\) — they match within rounding. The orbit satisfies the condition for \(n=1\).
- Step 5: Physical check: This orbit is the Bohr radius \(a_0\); the speed matches the known ground-state speed. The agreement confirms the postulate.

REASONING: Bohr's second postulate requires the angular momentum to be exactly \(n\hbar\). We compute \(L\) from the given classical orbital parameters and compare with \(n\hbar\). The match verifies that the given orbit corresponds to the \(n=1\) stationary state.

ANSWER: Yes, the orbit satisfies Bohr's quantization condition for \(n=1\) (\(L \approx 1.055 \times 10^{-34}\,\text{J·s}\)).

## WORKED_EXAMPLE_2
PROBLEM: A hydrogen atom absorbs a photon of wavelength \(97.5\,\text{nm}\) and gets excited from the ground state (\(n=1\)). Determine the final quantum number \(n_f\) of the electron. (Use \(hc = 1240\,\text{eV·nm}\), ground state energy \(E_1 = -13.6\,\text{eV}\).)

STEPS:
- Step 1: Identify given: \(\lambda = 97.5\,\text{nm}\), \(E_1 = -13.6\,\text{eV}\), \(hc = 1240\,\text{eV·nm}\). Process: absorption → electron goes to higher \(n\).
- Step 2: Photon energy \(E_{\text{ph}} = \frac{hc}{\lambda} = \frac{1240}{97.5} = 12.72\,\text{eV}\).
- Step 3: Apply Bohr's third postulate for absorption: \(E_{\text{ph}} = E_f - E_i\). Here \(E_i = E_1 = -13.6\,\text{eV}\). So \(E_f = E_i + E_{\text{ph}} = -13.6 + 12.72 = -0.88\,\text{eV}\).
- Step 4: Use hydrogen energy formula (known from later derivation, but given here): \(E_n = -\frac{13.6}{n^2}\,\text{eV}\). Set \(-\frac{13.6}{n_f^2} = -0.88\) → \(n_f^2 = \frac{13.6}{0.88} = 15.45\) → \(n_f \approx 3.93\).
- Step 5: \(n_f\) must be integer. Closest integer is 4. Check: \(E_4 = -13.6/16 = -0.85\,\text{eV}\). Difference \(E_4 - E_1 = 12.75\,\text{eV}\) → \(\lambda = 1240/12.75 = 97.25\,\text{nm} \approx 97.5\,\text{nm}\). Consistent.
- Step 6: Conclude \(n_f = 4\).

REASONING: Absorption raises energy. Photon energy equals energy gap. We use the known \(E_n \propto 1/n^2\) (derived from postulates in next node) to find which \(n\) matches the absorbed photon. The slight discrepancy is due to rounding of \(hc\) and \(13.6\,\text{eV}\).

ANSWER: \(n_f = 4\) (transition \(1 \to 4\), part of Lyman series).

## WORKED_EXAMPLE_3
PROBLEM: A muonic hydrogen atom consists of a proton and a muon (mass \(m_\mu = 207\,m_e\), same charge \(-e\)). Assuming Bohr's postulates apply with the reduced mass \(\mu = \frac{m_\mu m_p}{m_\mu + m_p} \approx m_\mu\) (since \(m_p \gg m_\mu\)), calculate the ground-state radius \(a_\mu\) and the ionization energy \(E_\mu\). Compare with electronic hydrogen (\(a_0 = 5.29 \times 10^{-11}\,\text{m}\), \(E_1 = -13.6\,\text{eV}\)).

STEPS:
- Step 1: Recall Bohr radius formula derivation: \(a_0 = \frac{4\pi\varepsilon_0 \hbar^2}{m_e e^2}\). For muonic hydrogen, replace \(m_e\) with \(\mu \approx m_\mu = 207\,m_e\).
- Step 2: Compute \(a_\mu = a_0 \times \frac{m_e}{\mu} = \frac{5.29 \times 10^{-11}}{207} = 2.56 \times 10^{-13}\,\text{m}\).
- Step 3: Recall ground-state energy: \(E_1 = -\frac{m_e e^4}{8\varepsilon_0^2 h^2}\). For muonic hydrogen, \(E_\mu = E_1 \times \frac{\mu}{m_e} = -13.6 \times 207 = -2815\,\text{eV} = -2.815\,\text{keV}\).
- Step 4: Verify units: radius in m, energy in eV. Both scale linearly with mass.
- Step 5: Physical interpretation: Muon is 207× heavier → orbit 207× smaller, binding 207× stronger. This is why muonic hydrogen X-rays are in keV range.
- Step 6: Note: This problem combines Bohr postulates (quantization condition) with reduced-mass correction — a JEE Advanced favorite.

REASONING: Bohr's postulates give \(r_n \propto 1/m\) and \(E_n \propto m\) when derived with Coulomb force. Replacing electron mass with muon mass scales the results. The reduced mass approximation is valid because proton is ~1836× heavier than electron, and muon is 207× heavier than electron, so proton is still ~9× heavier than muon.

ANSWER: \(a_\mu = 2.56 \times 10^{-13}\,\text{m}\); Ionization energy = \(2.82\,\text{keV}\) (or \(-2.82\,\text{keV}\) ground state energy).

## COMPETENCY_QUESTION_1
QUESTION: A student argues: "Bohr's first postulate says electrons in stationary orbits don't radiate. But an accelerating charge *must* radiate according to Maxwell's equations. So Bohr's model is internally inconsistent — it uses classical orbits (acceleration) but ignores classical radiation." How would you respond? Use the concept of "domain of applicability" and the correspondence principle.

COMPETENCY: Evaluating theoretical consistency and domain of applicability of physical models

STEPS:
- Step 1: Acknowledge the student's correct observation: classical EM theory does predict radiation from accelerating charges.
- Step 2: Explain that Bohr *explicitly* postulated an exception for atomic-scale systems — this is the "quantum postulate" that classical laws break down at atomic scales.
- Step 3: Note that the model is *semi-classical*: it uses classical mechanics for orbital motion (Coulomb force, centripetal acceleration) but imposes a quantum condition (quantized \(L\)) and a quantum radiation rule (Postulate 3).
- Step 4: The correspondence principle (Bohr, 1920) states that for large \(n\), quantum predictions must merge with classical ones. Indeed, for \(n \to \infty\), the radiation frequency from transitions \(n \to n-1\) approaches the orbital frequency, and the radiation power matches the classical Larmor formula. The "inconsistency" vanishes in the classical limit.
- Step 5: Conclude: The model is not *internally* inconsistent — it's a hybrid with clearly stated postulates that replace classical EM at small scales. It was a deliberate, successful "patch" until full quantum mechanics.

ANSWER: Bohr's model is a semi-classical theory that *intentionally* violates classical EM at atomic scales via Postulate 1. This is not an internal inconsistency but a domain restriction: classical EM applies to macroscopic charges, while atomic systems obey quantum postulates. The correspondence principle ensures the model reproduces classical physics in the \(n \to \infty\) limit, validating the patch.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a hypothetical universe, Planck's constant \(h\) is twice its actual value (\(h' = 2h\)). All other constants (\(e, m_e, \varepsilon_0\)) remain unchanged. Using Bohr's postulates, determine how the following would change for hydrogen: (a) Bohr radius \(a_0\), (b) ground-state energy \(E_1\), (c) angular momentum of \(n=1\) state, (d) wavelength of the Lyman-alpha line (\(n=2 \to 1\)). Justify each answer with the relevant formula.

COMPETENCY: Dimensional scaling and formula manipulation under changed fundamental constants

STEPS:
- Step 1: Write formulas from Bohr model (derived in next node but based on postulates):
  \(a_0 = \frac{4\pi\varepsilon_0 \hbar^2}{m_e e^2}\) where \(\hbar = h/2\pi\).
  \(E_1 = -\frac{m_e e^4}{8\varepsilon_0^2 h^2}\).
  \(L_1 = \hbar = h/2\pi\).
  \(\lambda_{\text{Lyman-}\alpha} = \frac{hc}{E_2 - E_1} = \frac{hc}{13.6(1 - 1/4)} = \frac{hc}{10.2\,\text{eV}}\) but \(13.6\,\text{eV} \propto 1/h^2\).
- Step 2: Substitute \(h' = 2h\) → \(\hbar' = 2\hbar\).
- Step 3: (a) \(a_0' \propto \hbar'^2 \propto (2\hbar)^2 = 4\hbar^2\) → \(a_0' = 4 a_0\).
- Step 4: (b) \(E_1' \propto 1/h'^2 \propto 1/(4h^2)\) → \(E_1' = E_1/4 = -3.4\,\text{eV}\).
- Step 5: (c) \(L_1' = \hbar' = 2\hbar = 2 L_1\).
- Step 6: (d) Energy gap \(\Delta E \propto 1/h^2\) → \(\Delta E' = \Delta E/4\). Photon energy \(h'\nu' = \Delta E'\) → \((2h)\nu' = \Delta E/4\) → \(\nu' = \Delta E/(8h) = \nu/8\). Wavelength \(\lambda' = c/\nu' = 8\lambda\). So \(\lambda' = 8 \times 121.6\,\text{nm} = 972.8\,\text{nm}\).
- Step 7: Check consistency: Larger \(h\) → larger quantum of action → larger orbits, weaker binding, longer wavelengths.

ANSWER: (a) \(a_0' = 4 a_0 = 2.12 \times 10^{-10}\,\text{m}\); (b) \(E_1' = -3.4\,\text{eV}\); (c) \(L_1' = 2.11 \times 10^{-34}\,\text{J·s}\); (d) \(\lambda' = 973\,\text{nm}\) (infrared).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Bohr's model of the hydrogen atom is based on three ______: (1) Electrons revolve in certain discrete, stable orbits called stationary states without radiating energy, each with a definite total energy.

## DIAGNOSTIC_ANSWER_7
postulates

The postulates complete the model's skeleton: three bold assumptions, each defying classical expectation. **A wrong answer (laws) reveals the student has promoted the assumptions to derivations, which is exactly what they are not.** The postulates complete the skeleton: three assumptions, each defying a classical instinct.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Start with a real-world ______: a neon sign glowing with distinct colours (red-orange) while an incandescent bulb emits white light.

## DIAGNOSTIC_ANSWER_8
observation

The observation opens the spectra's mystery: the neon's discrete colours against the bulb's continuum is the crisis Bohr answered. **A wrong answer (an experiment) reveals the student has formalised a street-side sighting into laboratory procedure.**

## DIAGNOSTIC_QUESTION_9
What is Bohr's model of the hydrogen atom? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Bohr's model of the hydrogen atom is based on three postulates: (1) Electrons revolve in certain discrete, stable orbits called stationary states without radiating energy, each with a definite total energy.

The definition's count is three: stationary states, quantised angular momentum, and photon-priced jumps. **A wrong answer (another count) reveals the student has padded or trimmed the postulate list the model stands on.**

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Bohr's model of the hydrogen atom is based on three postulates: (______) Electrons revolve in certain discrete, stable orbits called stationary states without radiating energy, each with a definite total energy.

## DIAGNOSTIC_ANSWER_10
1

The one numbers the first postulate: stationary states come first, quantisation second, transitions third - the list's order is its logic. **A wrong answer (another numeral) reveals the student has renumbered the scaffolding and misplaced the stability clause.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
Student can also explain how the third postulate links energy differences to spectral line frequencies.

Mastery is the bridge to spectroscopy: the third postulate converts energy gaps into the frequencies spectral lines display. **A wrong answer (stopping at the orbits) reveals the student has built the ladder without mentioning the light it emits.**
