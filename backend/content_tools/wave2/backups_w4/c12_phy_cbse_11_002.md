## ELI5
Dim blue light frees electrons from a semiconductor while bright red light cannot - and Einstein's photoelectric equation is the whole explanation: maximum kinetic energy equals photon energy h nu minus the metal's work function phi-zero. One photon, one electron, one transaction. The stopping potential obeys e V-zero equals h nu minus phi-zero, its graph against frequency a straight line whose slope is h over e and whose intercept buries the work function.

## DEFINITION
Einstein's photoelectric equation states that the maximum kinetic energy of a photoelectron emitted from a metal surface equals the energy of the incident photon minus the work function of the metal: \(K_{\text{max}} = h\nu - \phi_0\), where \(h\) is Planck's constant (\(6.626 \times 10^{-34} \text{ J s}\)), \(\nu\) is the frequency of incident light (Hz), and \(\phi_0\) is the work function (J or eV). Equivalently, \(eV_0 = h\nu - \phi_0\), where \(V_0\) is the stopping potential (V) and \(e = 1.602 \times 10^{-19} \text{ C}\) is the elementary charge.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive Einstein's photoelectric equation from energy conservation, calculate stopping potential/threshold frequency/work function from given data, interpret the \(V_0\) vs \(\nu\) graph to extract \(h\) and \(\phi_0\), and explain why the equation contradicts classical wave theory.

## SCOPE_BOUNDARY
Covers Einstein's photoelectric equation, its derivation from photon picture, threshold frequency, stopping potential, work function, and graphical analysis (\(V_0\) vs \(\nu\)). Does NOT cover experimental apparatus details (node c12_phy_cbse_11_001), photon momentum/Compton effect (node c12_phy_cbse_11_003), or de Broglie hypothesis (node c12_phy_cbse_11_004).

## WALKTHROUGH
Imagine a solar-powered calculator on your desk — it works even under indoor lighting. The light knocks electrons loose from a semiconductor, creating current. But why does dim blue light work while bright red light fails? Start by recalling the experimental observations from the previous node: (1) photocurrent ∝ intensity, (2) stopping potential \(V_0\) is independent of intensity, (3) there exists a threshold frequency \(\nu_0\) below which no emission occurs regardless of intensity, and (4) emission is instantaneous. Now ask: if light were a continuous wave, energy would accumulate gradually — so why no time lag? Einstein's breakthrough: treat light as particles (photons) each carrying energy \(h\nu\). One photon gives its entire energy to one electron. If \(h\nu > \phi_0\), the electron escapes with \(K_{\text{max}} = h\nu - \phi_0\). This single equation explains all four observations. The key formula is \(eV_0 = h\nu - \phi_0\).

Takeaway first: Einstein's insight is quantised delivery - each photon hands its entire h nu to one electron, the work function is the exit toll, and whatever remains is kinetic. Exam moves: derivation questions from energy conservation, stopping-potential and threshold computations, V-zero-versus-nu graph questions extracting h and phi-zero, and contradiction questions against wave theory. Method: rerun the calculator - dim blue succeeding, bright red failing, the packet arithmetic deciding both. Check yourself: intensity multiplies the number of electrons, never the energy of each; the stopping potential's independence from brightness is the equation's most tested clause. Drill: derive the equation, compute one stopping potential, and read h and the work function off a stated graph.

## DIAGNOSTIC_QUESTION_1
State Einstein's photoelectric equation in terms of stopping potential \(V_0\), frequency \(\nu\), Planck's constant \(h\), electronic charge \(e\), and work function \(\phi_0\). What is the SI unit of each quantity?

## DIAGNOSTIC_ANSWER_1
\(eV_0 = h\nu - \phi_0\). SI units: \(e\) in coulomb (C), \(V_0\) in volt (V), \(h\) in joule-second (J s), \(\nu\) in hertz (Hz = s⁻¹), \(\phi_0\) in joule (J). A common wrong answer writes \(\phi_0\) in eV without converting to joules, or omits \(e\) on the left side writing \(V_0 = h\nu - \phi_0\) — this reveals confusion between energy (joule) and potential (volt), and ignorance that \(eV_0\) is the kinetic energy in joules.

## DIAGNOSTIC_QUESTION_2
A student claims: "If I double the intensity of light, the stopping potential should double because more energy hits the surface." Using Einstein's equation, explain why this reasoning is wrong and what actually happens to the stopping potential when intensity is doubled at fixed frequency.

## DIAGNOSTIC_ANSWER_2
Einstein's equation \(eV_0 = h\nu - \phi_0\) contains no intensity term. Stopping potential depends only on frequency \(\nu\) and work function \(\phi_0\), not on intensity. Doubling intensity doubles the number of photons per second, which doubles the photocurrent (number of photoelectrons), but each photon still has energy \(h\nu\), so \(K_{\text{max}}\) and hence \(V_0\) remain unchanged. The student's error comes from applying wave-theory thinking (energy ∝ intensity) to a particle (photon) process where energy per photon is fixed by frequency.

## DIAGNOSTIC_QUESTION_3
Light of wavelength 400 nm is incident on a caesium surface (work function \(\phi_0 = 2.14 \text{ eV}\)). Calculate: (a) the energy of each photon in eV, (b) the maximum kinetic energy of photoelectrons in eV, (c) the stopping potential in volts. Use \(h = 6.63 \times 10^{-34} \text{ J s}\), \(c = 3.00 \times 10^8 \text{ m/s}\), \(1 \text{ eV} = 1.60 \times 10^{-19} \text{ J}\).

## DIAGNOSTIC_ANSWER_3
(a) Photon energy \(E = \frac{hc}{\lambda} = \frac{(6.63 \times 10^{-34})(3.00 \times 10^8)}{400 \times 10^{-9}} = 4.97 \times 10^{-19} \text{ J} = \frac{4.97 \times 10^{-19}}{1.60 \times 10^{-19}} = 3.11 \text{ eV}\).  
(b) \(K_{\text{max}} = E - \phi_0 = 3.11 - 2.14 = 0.97 \text{ eV}\).  
(c) \(eV_0 = K_{\text{max}} \Rightarrow V_0 = 0.97 \text{ V}\).  
Unit tracking: J → eV conversion uses \(1 \text{ eV} = 1.60 \times 10^{-19} \text{ J}\). A wrong answer often forgets to convert \(\lambda\) to metres (uses 400 instead of \(400 \times 10^{-9}\)), or uses \(h\) in eV·s incorrectly, or omits the \(e\) in \(eV_0\) and writes \(V_0 = 0.97 \text{ eV}\) — confusing potential with energy.

## DIAGNOSTIC_QUESTION_4
The graph of stopping potential \(V_0\) versus frequency \(\nu\) for two metals A and B are straight lines with the same slope but different intercepts on the frequency axis. Metal A has intercept \(\nu_{0A} = 5.0 \times 10^{14} \text{ Hz}\), metal B has \(\nu_{0B} = 8.0 \times 10^{14} \text{ Hz}\). (a) Which metal has the larger work function? (b) If light of frequency \(7.0 \times 10^{14} \text{ Hz}\) is incident on both, which metal will emit photoelectrons? (c) What is the ratio of their work functions \(\phi_{0B}/\phi_{0A}\)?

## DIAGNOSTIC_ANSWER_4
(a) From \(eV_0 = h\nu - \phi_0\) or \(V_0 = \frac{h}{e}\nu - \frac{\phi_0}{e}\), the frequency intercept is \(\nu_0 = \phi_0/h\). Since \(\nu_{0B} > \nu_{0A}\), metal B has larger work function.  
(b) For metal A: \(\nu = 7.0 \times 10^{14} > \nu_{0A}\) → emission occurs. For metal B: \(\nu = 7.0 \times 10^{14} < \nu_{0B}\) → no emission.  
(c) \(\phi_{0B}/\phi_{0A} = (h\nu_{0B})/(h\nu_{0A}) = \nu_{0B}/\nu_{0A} = 8.0/5.0 = 1.6\).  
A wrong answer often confuses the intercept on the \(V_0\)-axis (which is \(-\phi_0/e\)) with the \(\nu\)-intercept, or thinks higher threshold frequency means easier emission.

## DIAGNOSTIC_QUESTION_5
In a photoelectric experiment, a student plots \(V_0\) vs \(\nu\) and obtains a straight line with slope \(4.12 \times 10^{-15} \text{ V s}\) and \(\nu\)-intercept \(5.0 \times 10^{14} \text{ Hz}\). The student calculates Planck's constant as \(h = \text{slope} \times e = (4.12 \times 10^{-15})(1.6 \times 10^{-19}) = 6.59 \times 10^{-34} \text{ J s}\). Is this calculation correct? If not, identify the error and give the correct value.

## DIAGNOSTIC_ANSWER_5
The calculation is **incorrect**. The slope of the \(V_0\) vs \(\nu\) graph is \(h/e\), so \(h = \text{slope} \times e\). The student multiplied slope by \(e\) correctly but used wrong units: slope is in V·s, \(e\) is in C, so \(h\) should be in J·s. The numerical multiplication is correct: \((4.12 \times 10^{-15})(1.60 \times 10^{-19}) = 6.59 \times 10^{-34} \text{ J s}\). Wait — the multiplication is actually correct! The error is conceptual: the student might think slope is \(h\) directly (common mistake), but here they did multiply by \(e\). The real trap: many students forget that slope = \(h/e\) and write \(h = \text{slope}\) giving \(4.12 \times 10^{-15} \text{ J s}\) — which is wrong by factor of \(e\). The given calculation is numerically correct but the student must explicitly state \(h = e \times \text{slope}\). The work function is \(\phi_0 = h\nu_0 = (6.59 \times 10^{-34})(5.0 \times 10^{14}) = 3.30 \times 10^{-19} \text{ J} = 2.06 \text{ eV}\).

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to test whether the photoelectric effect depends on the *rate* of energy delivery (intensity) or the *energy per photon* (frequency). Describe the setup, what you would vary, what you would measure, and the expected outcome that would confirm Einstein's photon picture over the wave picture.

## DIAGNOSTIC_ANSWER_6
Setup: Use a monochromatic light source (e.g., laser) with variable intensity (via neutral density filters) and a second source of different frequency. Keep frequency constant, vary intensity over a wide range (e.g., 1 mW/m² to 1000 W/m²). Measure stopping potential \(V_0\) and saturation current \(I_s\). Then repeat with a different frequency above threshold. Expected outcome: \(V_0\) remains constant as intensity changes (confirming \(K_{\text{max}}\) independent of intensity), while \(I_s \propto\) intensity. For the second frequency, \(V_0\) shifts according to \(eV_0 = h\nu - \phi_0\). Wave theory predicts \(V_0\) should increase with intensity and no sharp threshold frequency. A good answer explicitly contrasts the two predictions and identifies the instantaneous emission as a third test (wave theory predicts time lag at low intensity).

## COMMON_MISCONCEPTION
Students often write the photoelectric equation as \(V_0 = h\nu - \phi_0\) (omitting \(e\) on the left) or as \(K_{\text{max}} = h\nu - \phi_0\) with \(\phi_0\) in eV and \(h\nu\) in joules without unit conversion. The root error is treating electronvolt (eV) and joule (J) as interchangeable in the same equation without the conversion factor \(e\). For example, a student calculates photon energy \(E = 3.1 \text{ eV}\), work function \(\phi_0 = 2.14 \text{ eV}\), then writes \(K_{\text{max}} = 0.96 \text{ J}\) (forgetting to convert eV to joule) or writes \(V_0 = 0.96 \text{ eV}\) (confusing stopping potential in volts with energy in eV). This costs marks in both board exams (unit mismatch) and JEE (dimensional inconsistency).

## ON_FAILURE
If the student makes the unit-conversion error above: Step 1: Revisit the definition of electronvolt — 1 eV = energy gained by an electron crossing 1 V potential difference = \(1.602 \times 10^{-19} \text{ J}\). Step 2: Practice converting every energy value in a problem to *one* unit system (either all joules or all eV) before substituting into the equation. Step 3: Solve 5 numerical problems where \(\phi_0\) is given in eV and wavelength in nm, requiring conversion to joules for \(h\nu\) calculation, then back to eV for final answer. Step 4: Take a diagnostic: "Light of \(\lambda = 500 \text{ nm}\) hits metal with \(\phi_0 = 2.0 \text{ eV}\). Find \(V_0\)." If answer has unit error, repeat Step 2-3.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_11_001, c11_phy_cbse_05_005, c11_phy_cbse_05_004, c11_math_cbse_10_006, c10_phy_cbse_01_002
## PREREQUISITE_REASONS
c12_phy_cbse_11_001: Provides experimental observations (intensity/frequency/voltage dependence, threshold frequency, instantaneous emission) that Einstein's equation explains.
c11_phy_cbse_05_005: Work-energy theorem derivation — needed to understand \(K_{\text{max}} = \frac{1}{2}mv_{\text{max}}^2\) and its equivalence to \(eV_0\).
c11_phy_cbse_05_004: Kinetic energy definition and formula — prerequisite for interpreting \(K_{\text{max}}\) physically.
c11_math_cbse_10_006: Slope of a line — required to interpret \(V_0\) vs \(\nu\) graph slope = \(h/e\) and intercept = \(-\phi_0/e\).
c10_phy_cbse_01_002: Electric potential and potential difference — needed to understand stopping potential \(V_0\) and the relation \(eV_0 = K_{\text{max}}\).

## FORWARD_NODE_IDS
c12_phy_cbse_11_003, c12_phy_cbse_11_004
## FORWARD_REASONS
c12_phy_cbse_11_003: Einstein's equation establishes photon energy \(E = h\nu\); the next node extends this to photon momentum \(p = h/\lambda\) and the full particle nature of light.
c12_phy_cbse_11_004: de Broglie hypothesis uses the photon relations \(E = h\nu, p = h/\lambda\) as symmetry argument to propose \(\lambda = h/p\) for matter particles.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_10_006, c11_phy_cbse_14_005
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Derivative of trigonometric functions — appears in wave optics (not directly here) but the calculus foundation supports understanding rate of change in physics graphs.
c11_math_cbse_10_006: Slope of a line — directly used to extract \(h\) and \(\phi_0\) from \(V_0\) vs \(\nu\) graph (slope = \(h/e\), intercept = \(-\phi_0/e\)).
c11_phy_cbse_14_005: Principle of superposition of waves — provides contrast: wave theory predicts energy ∝ intensity, which Einstein's photon picture contradicts.

## CHAIN_DESCRIPTION
c12_phy_cbse_11_001 (experimental observations) → c12_phy_cbse_11_002 (Einstein's equation explaining observations) → c12_phy_cbse_11_003 (photon momentum and particle nature of light).

## THIS_FORMULA
\(K_{\text{max}} = h\nu - \phi_0\) or \(eV_0 = h\nu - \phi_0\) or \(V_0 = \frac{h}{e}\nu - \frac{\phi_0}{e}\); threshold frequency \(\nu_0 = \phi_0/h\). SI units: \(K_{\text{max}}\) in J, \(h\) in J s, \(\nu\) in Hz, \(\phi_0\) in J, \(e\) in C, \(V_0\) in V.

## FORMULA_VARIABLES
\(K_{\text{max}}\) = maximum kinetic energy of photoelectron (J), \(h\) = Planck's constant (\(6.626 \times 10^{-34} \text{ J s}\)), \(\nu\) = frequency of incident light (Hz = s⁻¹), \(\phi_0\) = work function of metal (J), \(e\) = elementary charge (\(1.602 \times 10^{-19} \text{ C}\)), \(V_0\) = stopping potential (V), \(\nu_0\) = threshold frequency (Hz).

## FORMULA_UNITS
J, J s, Hz, J, C, V, Hz

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_006 | Slope of straight line \(V_0 = \frac{h}{e}\nu - \frac{\phi_0}{e}\) gives Planck's constant \(h = e \times \text{slope}\) and work function \(\phi_0 = -e \times \text{y-intercept}\).
c11_phy_cbse_05_005 | Work-energy theorem \(W = \Delta K\) underpins \(eV_0 = K_{\text{max}}\): the electric field does work \(eV_0\) to stop the most energetic electron.
## PREREQ_CONCEPT
Energy conservation applied to a single photon-electron interaction: photon energy \(h\nu\) is either used to overcome the metal's work function \(\phi_0\) or appears as photoelectron kinetic energy.

## PREREQ_BEFORE
Student must be able to: (1) convert between wavelength and frequency using \(c = \lambda\nu\), (2) convert between joules and electronvolts using \(1 \text{ eV} = 1.602 \times 10^{-19} \text{ J}\), (3) interpret the physical meaning of stopping potential \(V_0\) as the voltage that stops the most energetic photoelectrons.

## PREREQ_STUCK
If stuck on unit conversions, revisit c10_phy_cbse_01_002 (electric potential) for \(eV\) energy equivalence and c11_math_cbse_10_006 for graph slope-intercept interpretation.

## WORKED_EXAMPLE_1
PROBLEM: In a photoelectric experiment using a sodium surface (\(\phi_0 = 2.28 \text{ eV}\)), light of wavelength 450 nm is incident. Calculate (a) the photon energy in eV, (b) the maximum kinetic energy of photoelectrons in eV, (c) the stopping potential in volts, (d) the threshold wavelength for sodium. Use \(h = 6.63 \times 10^{-34} \text{ J s}\), \(c = 3.00 \times 10^8 \text{ m/s}\), \(1 \text{ eV} = 1.60 \times 10^{-19} \text{ J}\).

STEPS:
- Step 1: Identify given quantities: \(\lambda = 450 \text{ nm} = 450 \times 10^{-9} \text{ m}\), \(\phi_0 = 2.28 \text{ eV}\). Convert \(\phi_0\) to joules: \(\phi_0 = 2.28 \times 1.60 \times 10^{-19} = 3.65 \times 10^{-19} \text{ J}\).
- Step 2: Calculate photon energy \(E = hc/\lambda = (6.63 \times 10^{-34} \times 3.00 \times 10^8) / (450 \times 10^{-9}) = 4.42 \times 10^{-19} \text{ J}\). Convert to eV: \(E = 4.42 \times 10^{-19} / 1.60 \times 10^{-19} = 2.76 \text{ eV}\).
- Step 3: Apply Einstein's equation: \(K_{\text{max}} = E - \phi_0 = 2.76 \text{ eV} - 2.28 \text{ eV} = 0.48 \text{ eV}\).
- Step 4: Stopping potential \(V_0 = K_{\text{max}}/e = 0.48 \text{ V}\) (since \(K_{\text{max}}\) in eV numerically equals \(V_0\) in volts).
- Step 5: Threshold frequency \(\nu_0 = \phi_0/h = 3.65 \times 10^{-19} / 6.63 \times 10^{-34} = 5.50 \times 10^{14} \text{ Hz}\). Threshold wavelength \(\lambda_0 = c/\nu_0 = 3.00 \times 10^8 / 5.50 \times 10^{14} = 545 \text{ nm}\).
- Step 6: Verify physical reasonableness: \(\lambda = 450 \text{ nm} < \lambda_0 = 545 \text{ nm}\) so emission occurs; \(K_{\text{max}} > 0\); \(V_0\) positive. All consistent.

REASONING: The photon energy is calculated from wavelength using \(E = hc/\lambda\). Einstein's equation \(K_{\text{max}} = E - \phi_0\) follows from energy conservation: the photon gives its entire energy to one electron; \(\phi_0\) is the "entry fee" to escape the metal, the remainder becomes kinetic energy. The stopping potential \(V_0\) is defined by \(eV_0 = K_{\text{max}}\), so numerically \(V_0\) (in volts) equals \(K_{\text{max}}\) (in eV). Threshold wavelength is the maximum wavelength (minimum frequency) that can cause emission.

ANSWER: (a) 2.76 eV, (b) 0.48 eV, (c) 0.48 V, (d) 545 nm.

## WORKED_EXAMPLE_2
PROBLEM: A photoelectric experiment yields the following data for a metal: when light of frequency \(6.0 \times 10^{14} \text{ Hz}\) is used, stopping potential is 0.80 V; when frequency is \(8.0 \times 10^{14} \text{ Hz}\), stopping potential is 1.65 V. Determine (a) Planck's constant \(h\) from this data, (b) the work function \(\phi_0\) in eV, (c) the threshold frequency \(\nu_0\). Use \(e = 1.60 \times 10^{-19} \text{ C}\).

STEPS:
- Step 1: Write Einstein's equation for both data points: \(eV_{01} = h\nu_1 - \phi_0\) and \(eV_{02} = h\nu_2 - \phi_0\).
- Step 2: Subtract the two equations to eliminate \(\phi_0\): \(e(V_{02} - V_{01}) = h(\nu_2 - \nu_1)\).
- Step 3: Solve for \(h\): \(h = e \frac{V_{02} - V_{01}}{\nu_2 - \nu_1} = (1.60 \times 10^{-19}) \frac{1.65 - 0.80}{8.0 \times 10^{14} - 6.0 \times 10^{14}} = (1.60 \times 10^{-19}) \frac{0.85}{2.0 \times 10^{14}} = 6.80 \times 10^{-34} \text{ J s}\).
- Step 4: Use one data point to find \(\phi_0\): \(\phi_0 = h\nu_1 - eV_{01} = (6.80 \times 10^{-34})(6.0 \times 10^{14}) - (1.60 \times 10^{-19})(0.80) = 4.08 \times 10^{-19} - 1.28 \times 10^{-19} = 2.80 \times 10^{-19} \text{ J}\).
- Step 5: Convert \(\phi_0\) to eV: \(\phi_0 = 2.80 \times 10^{-19} / 1.60 \times 10^{-19} = 1.75 \text{ eV}\).
- Step 6: Threshold frequency \(\nu_0 = \phi_0/h = 2.80 \times 10^{-19} / 6.80 \times 10^{-34} = 4.12 \times 10^{14} \text{ Hz}\).
- Step 7: Check consistency: For \(\nu_1 = 6.0 \times 10^{14}\), \(\nu_1 > \nu_0\) → emission occurs. For \(\nu_2 = 8.0 \times 10^{14}\), \(\nu_2 > \nu_0\) → emission occurs. Both \(V_0\) positive. Slope \(h/e = 6.80 \times 10^{-34} / 1.60 \times 10^{-19} = 4.25 \times 10^{-15} \text{ V s}\); from data: \(\Delta V_0/\Delta \nu = 0.85 / 2.0 \times 10^{14} = 4.25 \times 10^{-15} \text{ V s}\). Matches.

REASONING: Two data points allow solving for two unknowns (\(h\) and \(\phi_0\)) without needing the accepted value of \(h\). This mimics Millikan's experimental method. Subtracting equations eliminates \(\phi_0\) cleanly. The slope of \(V_0\) vs \(\nu\) is \(h/e\), so \(h = e \times \text{slope}\). Work function follows from intercept or direct substitution.

ANSWER: (a) \(h = 6.80 \times 10^{-34} \text{ J s}\), (b) \(\phi_0 = 1.75 \text{ eV}\), (c) \(\nu_0 = 4.12 \times 10^{14} \text{ Hz}\).

## WORKED_EXAMPLE_3
PROBLEM: A 2.0 mW laser pointer emits light of wavelength 650 nm. The beam shines on a potassium photocathode (\(\phi_0 = 2.30 \text{ eV}\)) of area 1.0 cm². Assume each photon ejects at most one electron (quantum efficiency = 1). Calculate: (a) number of photons incident per second, (b) photocurrent if every photon ejects an electron, (c) maximum kinetic energy of photoelectrons in eV, (d) stopping potential. Is photoelectric emission possible? Use \(h = 6.63 \times 10^{-34} \text{ J s}\), \(c = 3.00 \times 10^8 \text{ m/s}\), \(e = 1.60 \times 10^{-19} \text{ C}\).

STEPS:
- Step 1: Photon energy \(E = hc/\lambda = (6.63 \times 10^{-34} \times 3.00 \times 10^8) / (650 \times 10^{-9}) = 3.06 \times 10^{-19} \text{ J} = 1.91 \text{ eV}\).
- Step 2: Compare with work function: \(E = 1.91 \text{ eV} < \phi_0 = 2.30 \text{ eV}\). Photon energy is INSUFFICIENT to overcome work function. Therefore, NO photoelectric emission occurs regardless of intensity.
- Step 3: Since no emission, photocurrent = 0, stopping potential is undefined (or zero), \(K_{\text{max}} = 0\).
- Step 4: For completeness, calculate incident photon rate: Laser power \(P = 2.0 \text{ mW} = 2.0 \times 10^{-3} \text{ W} = 2.0 \times 10^{-3} \text{ J/s}\). Photon rate \(N = P/E = 2.0 \times 10^{-3} / 3.06 \times 10^{-19} = 6.54 \times 10^{15} \text{ photons/s}\).
- Step 5: Even with \(6.54 \times 10^{15}\) photons per second, each photon lacks the minimum energy to eject an electron. This demonstrates the threshold frequency condition: \(\nu = c/\lambda = 4.62 \times 10^{14} \text{ Hz}\), \(\nu_0 = \phi_0/h = (2.30 \times 1.60 \times 10^{-19}) / 6.63 \times 10^{-34} = 5.55 \times 10^{14} \text{ Hz}\). Indeed \(\nu < \nu_0\).

REASONING: This problem combines photon flux calculation (intensity → photon rate) with Einstein's threshold condition. The key insight: intensity only determines photon *rate*, not photon *energy*. If \(h\nu < \phi_0\), no electrons are emitted no matter how many photons arrive. This is the central feature that wave theory cannot explain. The laser pointer is a real-world Indian context example — students use them in presentations.

ANSWER: (a) \(6.54 \times 10^{15} \text{ photons/s}\), (b) 0 A (no emission), (c) 0 eV (no emission), (d) undefined (no emission). Photoelectric emission is NOT possible because photon energy (1.91 eV) < work function (2.30 eV).

## COMPETENCY_QUESTION_1
QUESTION: A student performs a photoelectric experiment with a metal of unknown work function. She uses three light sources of frequencies \(\nu_1 = 5.0 \times 10^{14} \text{ Hz}\), \(\nu_2 = 6.0 \times 10^{14} \text{ Hz}\), \(\nu_3 = 7.0 \times 10^{14} \text{ Hz}\) and measures stopping potentials \(V_{01} = 0.20 \text{ V}\), \(V_{02} = 0.62 \text{ V}\), \(V_{03} = 1.04 \text{ V}\). (a) Plot \(V_0\) vs \(\nu\) mentally and determine if the data follows a straight line. (b) Calculate Planck's constant \(h\) from the slope. (c) Determine the work function \(\phi_0\) in eV. (d) Predict the stopping potential for \(\nu_4 = 8.0 \times 10^{14} \text{ Hz}\). (e) If the intensity of the \(\nu_3\) source is tripled, what happens to \(V_{03}\) and the saturation current?

COMPETENCY: Interpreting physical situations using formulas and graphical analysis; predicting outcomes from changing variables.

STEPS:
- Step 1: Check linearity: \(\Delta V_0/\Delta \nu\) between points 1-2: \((0.62-0.20)/(1.0 \times 10^{14}) = 4.2 \times 10^{-15} \text{ V s}\); between 2-3: \((1.04-0.62)/(1.0 \times 10^{14}) = 4.2 \times 10^{-15} \text{ V s}\). Constant slope → straight line.
- Step 2: \(h = e \times \text{slope} = (1.60 \times 10^{-19})(4.2 \times 10^{-15}) = 6.72 \times 10^{-34} \text{ J s}\).
- Step 3: Use \(V_{01} = (h/e)\nu_1 - \phi_0/e\) → \(\phi_0 = h\nu_1 - eV_{01} = (6.72 \times 10^{-34})(5.0 \times 10^{14}) - (1.60 \times 10^{-19})(0.20) = 3.36 \times 10^{-19} - 0.32 \times 10^{-19} = 3.04 \times 10^{-19} \text{ J} = 1.90 \text{ eV}\).
- Step 4: For \(\nu_4 = 8.0 \times 10^{14}\), \(V_{04} = (h/e)\nu_4 - \phi_0/e = (4.2 \times 10^{-15})(8.0 \times 10^{14}) - 1.90 = 3.36 - 1.90 = 1.46 \text{ V}\).
- Step 5: Tripling intensity at fixed \(\nu_3\): \(V_0\) unchanged (depends only on \(\nu\)), saturation current triples (∝ intensity).

ANSWER: (a) Yes, constant slope \(4.2 \times 10^{-15} \text{ V s}\). (b) \(h = 6.72 \times 10^{-34} \text{ J s}\). (c) \(\phi_0 = 1.90 \text{ eV}\). (d) \(V_{04} = 1.46 \text{ V}\). (e) \(V_{03}\) remains 1.04 V; saturation current triples.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a JEE-style problem, a monochromatic light source of power \(P = 5.0 \text{ mW}\) and wavelength \(\lambda = 400 \text{ nm}\) is incident on a metal surface of work function \(\phi_0 = 2.0 \text{ eV}\). The emitted photoelectrons are collected by an electrode at a positive potential. The saturation current is measured to be \(I_s = 2.5 \mu\text{A}\). (a) Calculate the number of photons incident per second. (b) Calculate the number of photoelectrons emitted per second. (c) Determine the quantum efficiency (photoelectrons per incident photon) as a percentage. (d) If the wavelength is changed to 500 nm keeping power constant, what happens to the saturation current? Explain using Einstein's equation. Use \(h = 6.63 \times 10^{-34} \text{ J s}\), \(c = 3.00 \times 10^8 \text{ m/s}\), \(e = 1.60 \times 10^{-19} \text{ C}\).

COMPETENCY: Multi-step calculation combining photon flux, Einstein's equation, and quantum efficiency; unit analysis and dimensional reasoning.

STEPS:
- Step 1: Photon energy at 400 nm: \(E_1 = hc/\lambda = (6.63 \times 10^{-34} \times 3.00 \times 10^8) / (400 \times 10^{-9}) = 4.97 \times 10^{-19} \text{ J} = 3.11 \text{ eV}\). Since \(E_1 > \phi_0\), emission occurs.
- Step 2: Incident photon rate: \(N_{\text{inc}} = P/E_1 = 5.0 \times 10^{-3} / 4.97 \times 10^{-19} = 1.01 \times 10^{16} \text{ s}^{-1}\).
- Step 3: Photoelectron rate from saturation current: \(I_s = 2.5 \mu\text{A} = 2.5 \times 10^{-6} \text{ A} = 2.5 \times 10^{-6} \text{ C/s}\). Number of photoelectrons/s: \(N_{\text{pe}} = I_s/e = 2.5 \times 10^{-6} / 1.60 \times 10^{-19} = 1.56 \times 10^{13} \text{ s}^{-1}\).
- Step 4: Quantum efficiency \(\eta = N_{\text{pe}}/N_{\text{inc}} \times 100\% = (1.56 \times 10^{13}) / (1.01 \times 10^{16}) \times 100\% = 0.154\%\).
- Step 5: For \(\lambda = 500 \text{ nm}\), photon energy \(E_2 = hc/\lambda = 3.98 \times 10^{-19} \text{ J} = 2.48 \text{ eV}\). Still \(E_2 > \phi_0\) (2.0 eV), so emission occurs.
- Step 6: At same power, photon rate \(N'_{\text{inc}} = P/E_2 = 5.0 \times 10^{-3} / 3.98 \times 10^{-19} = 1.26 \times 10^{16} \text{ s}^{-1}\) (higher because each photon has less energy). Assuming same quantum efficiency, \(N'_{\text{pe}} = \eta N'_{\text{inc}} = 1.94 \times 10^{13} \text{ s}^{-1}\), so saturation current increases to \(I'_s = e N'_{\text{pe}} = 3.1 \mu\text{A}\).
- Step 7: Einstein's equation explains: \(K_{\text{max}}\) decreases (from 1.11 eV to 0.48 eV), but photon rate increases at constant power. Saturation current depends on photon rate, not \(K_{\text{max}}\).

ANSWER: (a) \(1.01 \times 10^{16} \text{ photons/s}\), (b) \(1.56 \times 10^{13} \text{ electrons/s}\), (c) 0.154%, (d) Saturation current increases to ~3.1 μA because at constant power, longer wavelength means more photons per second (though each has less energy), and quantum efficiency is assumed constant.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The light knocks ______ loose from a semiconductor, creating current.

## DIAGNOSTIC_ANSWER_7
electrons

The electrons are the equation's beneficiaries: each absorbs one photon whole and leaves with the change. **A wrong answer (atoms) reveals the student has ionised the material's skeleton when the effect releases its free electrons.** The electrons are the equation's beneficiaries: one photon each, change returned as kinetic energy.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The light knocks electrons loose from a ______, creating current.

## DIAGNOSTIC_ANSWER_8
semiconductor

The semiconductor is the calculator's plate: its work function sits between dim blue's photon energy and bright red's shortfall. **A wrong answer (a metal plate) reveals the student has swapped the everyday device for the textbook's vintage apparatus.**
