## ELI5
A hydrogen discharge tube glows pink in a dark lab - discrete colours, not a continuum - and Bohr's model prices the atom's allowed energies: E-n equals minus thirteen point six electron volts over n squared. The minus sign is the binding - zero means the electron has escaped to infinity - and the levels crowd together as n climbs, converging at the ionisation limit. Each jump between levels pays or collects exactly the energy gap as light.

## DEFINITION
The energy levels of a hydrogen atom are the discrete, quantized values of total energy that the electron can possess while in a stationary orbit around the nucleus, given by \(E_n = -\frac{13.6 \text{ eV}}{n^2}\) (or \(-\frac{2.18 \times 10^{-18} \text{ J}}{n^2}\)), where \(n = 1, 2, 3, \dots\) is the principal quantum number. The SI unit of energy is the joule (J), though electronvolt (eV) is conventionally used for atomic scales. The negative sign indicates the electron is bound to the nucleus; zero energy corresponds to a free electron at rest infinitely far from the proton.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) write the energy level formula with correct sign and units, (2) calculate the energy of any level \(n\) and the energy difference between two levels, (3) compute the corresponding photon wavelength/frequency for a transition, (4) explain the physical meaning of negative energy, ground state, ionization energy, and the convergence of levels at high \(n\).

## SCOPE_BOUNDARY
Covers: Bohr model derivation of \(E_n = -13.6/n^2\) eV for hydrogen-like ions (single electron), ground state (\(n=1\)), excited states (\(n>1\)), ionization energy (13.6 eV for hydrogen), energy level diagram, and numerical problems on excitation/ionization. Does NOT cover: multi-electron atoms, fine structure/hyperfine splitting, quantum mechanical orbitals (Schrödinger equation), de Broglie's standing wave explanation (node c12_phy_cbse_12_005), or detailed line spectra calculations (node c12_phy_cbse_12_004).

## WALKTHROUGH
Observe a hydrogen discharge tube in a dark lab: it emits a distinct pinkish glow, not a continuous rainbow. This discrete spectrum implies the electron loses energy in specific packets. Recall Bohr's second postulate from the previous node: angular momentum is quantized (\(L = n\hbar\)). Combine this with the Coulomb force providing centripetal acceleration (\(mv^2/r = ke^2/r^2\)) to find allowed radii \(r_n\). Then compute total energy \(E = K + U = \frac{1}{2}mv^2 - ke^2/r\). Substitute \(r_n\) to discover \(E_n \propto -1/n^2\). The negative sign emerges naturally because the potential energy zero is set at infinite separation — a bound electron must have negative total energy.

Takeaway first: the energy levels are negative and n-squared governed - ground state minus thirteen point six, ionisation at zero - and transitions between them price the hydrogen spectrum's every line. Exam moves: formula-statement questions with sign and units, energy-difference and photon-wavelength computations, and meaning questions on negative energy, ground state and ionisation. Method: rerun the discharge tube - the pink glow's discreteness noticed, the quantised orbits derived, the energies computed and found negative. Check yourself: the flagged error drops the minus sign; a positive energy level would describe a free electron and dissolve the atom's binding. Drill: compute two levels' energies, the photon wavelength of the jump between them, and the ionisation energy from the ground state.

## DIAGNOSTIC_QUESTION_1
State the formula for the energy of an electron in the \(n\)-th stationary orbit of a hydrogen atom. Give the value of the ground state energy in both eV and joules.

## DIAGNOSTIC_ANSWER_1
\(E_n = -\frac{13.6 \text{ eV}}{n^2} = -\frac{2.18 \times 10^{-18} \text{ J}}{n^2}\). Ground state (\(n=1\)): \(E_1 = -13.6 \text{ eV} = -2.18 \times 10^{-18} \text{ J}\). A wrong answer (e.g., missing the negative sign, writing \(E_n = +13.6/n^2\), or using 13.6 J) reveals the student has memorized the magnitude but not the physical meaning of the bound state or the unit conversion between eV and J.

## DIAGNOSTIC_QUESTION_2
Why is the energy of the electron in a hydrogen atom negative? What does \(E_n \to 0\) as \(n \to \infty\) physically represent?

## DIAGNOSTIC_ANSWER_2
The negative sign arises because the zero of potential energy is defined at infinite separation (\(r \to \infty\)). A bound electron has total energy \(E = K + U\); since \(|U| > K\) for a Coulomb potential, \(E < 0\). \(E_n \to 0^-\) as \(n \to \infty\) means the electron is barely bound — it can be freed with infinitesimal energy. A wrong answer (e.g., "negative energy means the electron has lost energy" or "zero energy means the electron is at rest at the nucleus") shows confusion between the arbitrary zero of potential and the binding condition.

## DIAGNOSTIC_QUESTION_3
Calculate the energy (in eV and joules) required to excite a hydrogen atom from the ground state (\(n=1\)) to the \(n=3\) level. Use \(1 \text{ eV} = 1.60 \times 10^{-19} \text{ J}\).

## DIAGNOSTIC_ANSWER_3
Step 1: \(E_1 = -13.6 \text{ eV}\). Step 2: \(E_3 = -13.6/9 = -1.511 \text{ eV}\). Step 3: \(\Delta E = E_3 - E_1 = (-1.511) - (-13.6) = 12.089 \text{ eV}\). Step 4: \(\Delta E = 12.089 \times 1.60 \times 10^{-19} = 1.934 \times 10^{-18} \text{ J}\). A wrong answer (e.g., \(13.6 - 1.51 = 12.09\) but forgetting to convert to joules, or using \(E_1 - E_3\) and getting negative) indicates sign errors in energy difference or unit conversion slips.

## DIAGNOSTIC_QUESTION_4
Compare the energy spacing between \(n=1\) and \(n=2\) with that between \(n=2\) and \(n=3\). Which is larger? Explain why the spacing decreases as \(n\) increases, using the functional form of \(E_n\).

## DIAGNOSTIC_ANSWER_4
\(\Delta E_{12} = E_2 - E_1 = (-3.4) - (-13.6) = 10.2 \text{ eV}\). \(\Delta E_{23} = E_3 - E_2 = (-1.51) - (-3.4) = 1.89 \text{ eV}\). \(\Delta E_{12} > \Delta E_{23}\). Because \(E_n \propto -1/n^2\), the difference \(\Delta E = 13.6(1/n_f^2 - 1/n_i^2)\) shrinks as \(n\) grows. For large \(n\), \(\Delta E \approx \frac{27.2}{n^3} \Delta n\), showing \(1/n^3\) dependence. A wrong answer claiming equal spacing reveals the student thinks energy levels are like a harmonic oscillator (linear in \(n\)) rather than an inverse-square sequence.

## DIAGNOSTIC_QUESTION_5
A student writes: "The ionization energy of hydrogen from the \(n=2\) state is 13.6 eV because ionization always requires 13.6 eV." Evaluate this statement and give the correct ionization energy from \(n=2\).

## DIAGNOSTIC_ANSWER_5
The statement is incorrect. Ionization energy is the energy needed to go from a given state to \(E=0\) (free electron at rest). For \(n=2\), \(E_2 = -3.4 \text{ eV}\), so ionization energy \(= 0 - E_2 = 3.4 \text{ eV}\). The 13.6 eV value applies only to the ground state (\(n=1\)). The error shows the student confuses "ionization energy of hydrogen" (usually quoted for ground state) with the state-dependent ionization threshold.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment: You have a container of hydrogen gas at room temperature (300 K). Estimate the fraction of atoms in the \(n=2\) state versus the ground state using the Boltzmann factor \(e^{-\Delta E/k_B T}\) (with \(k_B = 8.62 \times 10^{-5} \text{ eV/K}\)). What does this imply for observing absorption lines at room temperature?

## DIAGNOSTIC_ANSWER_6
\(\Delta E = 10.2 \text{ eV}\), \(k_B T \approx 0.0259 \text{ eV}\). Boltzmann factor \(= e^{-10.2/0.0259} \approx e^{-394} \approx 10^{-171}\). Essentially zero atoms in \(n=2\) at 300 K. Thus, almost all atoms are in ground state; absorption spectra will show only Lyman series (transitions from \(n=1\)). A poor answer (e.g., "about half are in n=2") reveals ignorance of thermal equilibrium statistics and the huge gap between atomic energy scales (eV) and thermal energy (meV).

## COMMON_MISCONCEPTION
Students often write \(E_n = +13.6/n^2\) eV, omitting the negative sign, and then claim "energy increases with \(n\)" because \(13.6/n^2\) decreases. They fail to realize that \(-13.6 \text{ eV} < -3.4 \text{ eV} < 0\), so the energy *algebraically* increases (becomes less negative) as \(n\) increases. This sign error propagates to transition calculations: they compute \(\Delta E = E_i - E_f\) with positive values and get the wrong sign for photon energy, or they think ionization from \(n=2\) requires 13.6 eV because they treat the magnitude as the binding energy for all levels.

## ON_FAILURE
1. Revisit node **c12_phy_cbse_12_002** (Bohr postulates) to re-derive \(E_n\) from \(K = \frac{1}{2}mv^2\) and \(U = -ke^2/r\), explicitly tracking the negative sign from the attractive Coulomb potential. 2. Draw a vertical energy axis with \(E=0\) at the top and negative values downward; plot \(E_1, E_2, E_3\) to visualize that "higher \(n\)" means "higher (less negative) energy". 3. Practice: "If \(E_1 = -13.6\) eV, how much energy to reach \(E=0\)? (13.6 eV). If \(E_2 = -3.4\) eV, how much to reach \(E=0\)? (3.4 eV)." 4. Re-diagnostic: Ask the student to compute ionization energy from \(n=3\) and explain why it is smaller than from \(n=1\).

## PREREQUISITE_NODE_IDS
c12_phy_cbse_12_002, c11_phy_cbse_05_010, c11_phy_cbse_04_003, c11_phy_cbse_05_007, c11_phy_cbse_01_006, c12_phy_cbse_12_001

## PREREQUISITE_REASONS
c12_phy_cbse_12_002: Bohr's quantization postulate (\(L = n\hbar\)) and the Coulomb force equation are the starting point for deriving \(r_n\) and \(E_n\).  
c11_phy_cbse_05_010: Conservation of mechanical energy (\(E = K + U\)) is used to express total energy in terms of \(r\) and then substitute \(r_n\).  
c11_phy_cbse_04_003: Newton's second law (\(F = ma\)) provides the centripetal force condition \(mv^2/r = ke^2/r^2\) linking \(v\) and \(r\).  
c11_phy_cbse_05_007: Gravitational potential energy (\(U = -GMm/r\)) is the classical analogue for the Coulomb potential energy (\(U = -ke^2/r\)), helping students accept the negative sign.  
c11_phy_cbse_01_006: Dimensional analysis verifies that \(ke^2/r\) has dimensions of energy (J) and that the final formula \(E_n \propto me^4/\hbar^2\) is dimensionally consistent.
c12_phy_cbse_12_001: Energy levels (Eₙ = -13.6 eV/n²) are derived by combining Rutherford's Coulomb force with Bohr's quantization condition.  

## FORWARD_NODE_IDS
c12_phy_cbse_12_004, c12_phy_cbse_12_005
## FORWARD_REASONS
c12_phy_cbse_12_004: The energy differences \(\Delta E = E_{n_i} - E_{n_f}\) directly give photon energies \(h\nu\) for the Lyman, Balmer, Paschen series — the line spectra node computes wavelengths from these levels.  
c12_phy_cbse_12_005: de Broglie's standing wave condition (\(2\pi r_n = n\lambda\)) yields the same quantization \(m v_n r_n = n\hbar\), providing a wave-mechanical justification for the energy levels derived here.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_09_001, c11_math_cbse_13_004
## CROSS_SUBJECT_REASONS
c11_math_cbse_09_001: The energy levels \(E_n = -13.6/n^2\) form a discrete sequence indexed by integer \(n\); understanding sequence behavior (convergence, monotonicity) helps analyze level spacing.  
c11_math_cbse_13_004: The limit \(\lim_{n\to\infty} E_n = 0\) is a rational function limit; the concept of a horizontal asymptote at \(E=0\) explains the continuum of unbound states above zero.

## CHAIN_DESCRIPTION
c12_phy_cbse_12_002 -> c12_phy_cbse_12_003 -> c12_phy_cbse_12_004

## THIS_FORMULA
\(E_n = -\frac{13.6 \text{ eV}}{n^2} = -\frac{2.18 \times 10^{-18} \text{ J}}{n^2}\)  (for hydrogen, \(Z=1\)); for hydrogen-like ions: \(E_n = -\frac{13.6 Z^2}{n^2} \text{ eV}\).

## FORMULA_VARIABLES
\(E_n\) = total energy of electron in \(n\)-th level (J or eV); \(n\) = principal quantum number (positive integer, dimensionless); \(Z\) = atomic number (dimensionless); 13.6 eV = ground state binding energy of hydrogen (exact value: \(13.5984 \text{ eV}\)); \(2.18 \times 10^{-18} \text{ J}\) = same in SI.

## FORMULA_UNITS
eV, J

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_09_001 | Energy levels form a discrete sequence \(E_n\) with \(n \in \mathbb{N}\); sequence analysis (monotonic increase, convergence to 0) is a direct application of Class 11 sequences.  
c11_math_cbse_13_004 | The limit \(\lim_{n\to\infty} (-13.6/n^2) = 0\) uses limit of rational functions; the ionization threshold corresponds to this limit.
## PREREQ_CONCEPT
Bohr's quantization of angular momentum (\(L = n\hbar\)) combined with classical centripetal force balance and conservation of energy in a \(1/r\) potential.

## PREREQ_BEFORE
Student must be able to derive \(r_n = n^2 a_0\) from \(m v r = n\hbar\) and \(m v^2/r = k e^2/r^2\), and then compute \(E = \frac{1}{2}mv^2 - k e^2/r\).

## PREREQ_STUCK
If stuck, re-watch the derivation in node **c12_phy_cbse_12_002** (Bohr postulates → \(r_n\) → \(E_n\)) and review **c11_phy_cbse_05_010** (conservation of mechanical energy) for the \(K+U\) sign convention.

## WORKED_EXAMPLE_1
**PROBLEM:** A hydrogen atom is in the \(n=2\) state. (a) Calculate its energy in eV and joules. (b) What is the minimum energy (in eV) required to ionize the atom from this state? (c) If a photon of energy 3.0 eV is incident on this atom, can it be ionized? Explain.

**STEPS:**
- Step 1: Identify formula \(E_n = -13.6/n^2\) eV. Given \(n=2\).
- Step 2: Compute \(E_2 = -13.6/4 = -3.40\) eV. Convert to joules: \(-3.40 \times 1.60 \times 10^{-19} = -5.44 \times 10^{-19}\) J.
- Step 3: Ionization energy = \(0 - E_2 = 3.40\) eV. (Energy needed to bring electron from \(E_2\) to \(E=0\).)
- Step 4: Compare photon energy (3.0 eV) with ionization energy (3.40 eV). Since 3.0 eV < 3.40 eV, the photon cannot ionize the atom from \(n=2\).
- Step 5: Check if 3.0 eV can cause excitation to a higher bound level: \(E_3 = -1.51\) eV, so \(\Delta E_{2\to3} = 1.89\) eV. The 3.0 eV photon *can* excite to \(n=3\) (and even to \(n=4\) which needs 2.55 eV), but not ionize.

**REASONING:** The negative sign in \(E_n\) is crucial: ionization energy is the *magnitude* of \(E_n\) for that state. Photon energy must match or exceed the ionization threshold for ionization; otherwise it may cause a bound-bound transition if it matches an energy difference.

**ANSWER:** (a) \(E_2 = -3.40 \text{ eV} = -5.44 \times 10^{-19} \text{ J}\). (b) Ionization energy = 3.40 eV. (c) No, 3.0 eV < 3.40 eV; the photon can excite the atom to \(n=3\) or \(n=4\) but not ionize it.

## WORKED_EXAMPLE_2
**PROBLEM:** In a hydrogen discharge tube, electrons are accelerated through a potential difference of 12.5 V and collide with ground-state hydrogen atoms. Determine the highest energy level \(n\) that can be populated by these collisions. (Assume the electron transfers all its kinetic energy to the atom.)

**STEPS:**
- Step 1: Kinetic energy of incident electron = \(e \times V = 12.5 \text{ eV}\).
- Step 2: Ground state energy \(E_1 = -13.6 \text{ eV}\). Excitation energies: \(\Delta E_{1\to n} = 13.6(1 - 1/n^2)\) eV.
- Step 3: Compute for successive \(n\):  
  \(n=2\): \(\Delta E = 13.6 \times 3/4 = 10.2 \text{ eV}\) (possible, 10.2 < 12.5).  
  \(n=3\): \(\Delta E = 13.6 \times 8/9 = 12.09 \text{ eV}\) (possible, 12.09 < 12.5).  
  \(n=4\): \(\Delta E = 13.6 \times 15/16 = 12.75 \text{ eV}\) (not possible, 12.75 > 12.5).
- Step 4: The highest reachable level is \(n=3\).
- Step 5: After excitation, the atom will de-excite, emitting photons of the Balmer series (if it goes to \(n=2\)) and Lyman series (if it goes to \(n=1\)).

**REASONING:** Electron impact excitation is a key mechanism in gas discharge tubes. The incident electron's kinetic energy (in eV, numerically equal to the accelerating voltage) sets the maximum excitation energy. The discrete level structure means only specific \(n\) are accessible.

**ANSWER:** The highest level that can be populated is \(n = 3\).

## WORKED_EXAMPLE_3
**PROBLEM:** A doubly ionized lithium ion (\(\text{Li}^{2+}\), \(Z=3\)) is in its ground state. (a) Calculate its ground state energy in eV. (b) Find the wavelength of the photon emitted when it transitions from \(n=3\) to \(n=2\). (Use \(hc = 1240 \text{ eV·nm}\).)

**STEPS:**
- Step 1: For hydrogen-like ions, \(E_n = -\frac{13.6 Z^2}{n^2}\) eV. Here \(Z=3\).
- Step 2: (a) Ground state (\(n=1\)): \(E_1 = -13.6 \times 9 = -122.4 \text{ eV}\).
- Step 3: (b) \(E_3 = -122.4/9 = -13.6 \text{ eV}\); \(E_2 = -122.4/4 = -30.6 \text{ eV}\).
- Step 4: Photon energy \(\Delta E = E_3 - E_2 = (-13.6) - (-30.6) = 17.0 \text{ eV}\).
- Step 5: Wavelength \(\lambda = \frac{hc}{\Delta E} = \frac{1240 \text{ eV·nm}}{17.0 \text{ eV}} = 72.9 \text{ nm}\).
- Step 6: Check region: 72.9 nm is in the extreme ultraviolet (EUV), consistent with higher \(Z\) shifting lines to shorter wavelengths.

**REASONING:** The \(Z^2\) scaling in Bohr energy formula arises because Coulomb force \(\propto Z\) and radius \(\propto 1/Z\), making energy \(\propto Z^2\). This example combines the hydrogen-like formula (extension of the hydrogen node) with photon energy-wavelength conversion.

**ANSWER:** (a) \(E_1 = -122.4 \text{ eV}\). (b) \(\lambda = 72.9 \text{ nm}\) (EUV).

## COMPETENCY_QUESTION_1
**QUESTION:** A student argues: "Since the energy of the hydrogen atom is \(E_n = -13.6/n^2\) eV, the energy difference between \(n=1\) and \(n=2\) is \(13.6(1/4 - 1) = -10.2\) eV. The negative sign means energy is released, so the emitted photon has energy \(-10.2\) eV." Identify the error in the student's reasoning and state the correct photon energy.

**COMPETENCY:** Interpreting physical situations using formulas; identifying sign convention errors.

**STEPS:**
- Step 1: Recognize that photon energy is always positive (\(E_\gamma = h\nu > 0\)).
- Step 2: The transition energy is \(|E_f - E_i|\) or \(E_i - E_f\) (since \(E_i > E_f\) for emission). Here \(E_1 = -13.6\), \(E_2 = -3.4\); \(E_2 > E_1\), so \(\Delta E = E_2 - E_1 = 10.2 \text{ eV}\).
- Step 3: The student computed \(E_1 - E_2 = -10.2 \text{ eV}\) and misinterpreted the negative sign as "photon energy is negative".
- Step 4: Correct photon energy = 10.2 eV.

**ANSWER:** The error is treating the algebraic difference \(E_1 - E_2\) as the photon energy. Photon energy is the absolute value of the energy difference: \(10.2 \text{ eV}\). The negative sign in \(E_1 - E_2\) only indicates the atom loses energy; the photon carries away positive energy.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** The first line of the Lyman series in hydrogen corresponds to the \(n=2 \to n=1\) transition. In a hypothetical universe where the electron mass is doubled (\(m_e' = 2m_e\)) but all other constants (\(e, \hbar, \epsilon_0\)) remain the same, what would be the wavelength of this line? (In our universe, \(\lambda_{21} = 121.6 \text{ nm}\).)

**COMPETENCY:** Predicting outcomes from changing variables; dimensional reasoning and scaling laws.

**STEPS:**
- Step 1: Recall Bohr energy formula derivation: \(E_n \propto m e^4 / \hbar^2\). So \(E_n \propto m\).
- Step 2: If \(m\) doubles, all \(|E_n|\) double. Thus \(\Delta E_{21}\) doubles.
- Step 3: Photon energy \(E_\gamma = hc/\lambda\), so \(\lambda \propto 1/E_\gamma \propto 1/m\).
- Step 4: New wavelength \(\lambda' = \lambda / 2 = 121.6 / 2 = 60.8 \text{ nm}\).
- Step 5: Verify: The Rydberg constant \(R_\infty \propto m\), so \(1/\lambda \propto m\) — consistent.

**ANSWER:** The wavelength would be 60.8 nm (half the original value).

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The SI unit of energy is the joule (J), though electronvolt (eV) is ______ used for atomic scales.

## DIAGNOSTIC_ANSWER_7
conventionally

Conventionally used is the eV's status: joules own the SI, but atomic scales speak electron volts by custom and convenience. **A wrong answer (rarely) reveals the student has exiled the unit every atomic energy table actually speaks.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a hydrogen ______ tube in a dark lab: it emits a distinct pinkish glow, not a continuous rainbow.

## DIAGNOSTIC_ANSWER_8
discharge

The discharge tube is the spectrum's source: hydrogen's pink glow is the atom announcing its energy levels in light. **A wrong answer (a bulb) reveals the student has substituted a continuum lamp for the discrete-line tube.** The discharge tube is the spectrum's source: hydrogen's pink glow is the atom announcing its levels.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe a hydrogen discharge tube in a dark lab: it emits a distinct pinkish glow, not a ______ rainbow.

## DIAGNOSTIC_ANSWER_9
continuous

The continuous rainbow is what the tube refuses to show: discrete lines are the evidence the energy levels are quantised. **A wrong answer (a brighter) reveals the student has intensified the glow while missing the point of its gaps.** The continuous rainbow is what the tube refuses: discrete lines are the quantisation's evidence.
