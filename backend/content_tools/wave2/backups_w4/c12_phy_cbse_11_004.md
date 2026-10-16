## ELI5
A cricket ball at thirty metres a second flies perfectly straight - no diffraction, no fringes - while an electron at a million metres a second diffracts like X-rays: the difference is the de Broglie wavelength, h over m v. Every moving particle carries a wave; only when that wavelength approaches the obstacles' size does the wave nature show. Matter and light share the same duality, read in opposite directions.

## DEFINITION
The de Broglie hypothesis states that every moving particle of matter with momentum \( p \) has an associated wave character, with wavelength \( \lambda = \frac{h}{p} = \frac{h}{mv} \), where \( h \) is Planck's constant, \( m \) is the particle's mass, and \( v \) is its speed. This wavelength is called the de Broglie wavelength and establishes wave-particle duality for matter.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can calculate de Broglie wavelength for any particle given its mass and velocity (or kinetic energy), explain why macroscopic objects do not exhibit observable wave properties, and relate the de Broglie relation to the photon momentum formula \( p = \frac{h}{\lambda} \) as a consistency check.

## SCOPE_BOUNDARY
Covers the de Broglie hypothesis, the formula \( \lambda = h/p \), its application to electrons and macroscopic objects, and the symmetry with photon wave-particle duality. Does NOT cover Davisson-Germer experiment details, electron diffraction patterns, or Heisenberg uncertainty principle — those are separate nodes.

## WALKTHROUGH
Observe a cricket ball thrown at 30 m/s — it travels in a straight line, shows no diffraction or interference. Now consider an electron in a cathode ray tube moving at \( 10^6 \) m/s: it produces diffraction patterns like X-rays. The difference? De Broglie wavelength. Start by recalling photon momentum \( p = h/\lambda \) from the photoelectric effect. De Broglie proposed the reverse: if light (energy) has particle momentum, matter (particles) should have wave wavelength. Calculate \( \lambda \) for both cricket ball and electron to see the massive difference. The key formula \( \lambda = h/(mv) \) emerges from this symmetry argument.

Takeaway first: de Broglie's wavelength is h over momentum - the symmetry argument that if waves carry momentum, particles must carry wavelength - and macroscopic objects' wavelengths are absurdly small to prove it invisible. Exam moves: wavelength computations from mass and velocity or from kinetic energy, accelerated-particle questions via h over root two m e V, and explain questions on the cricket ball's invisibility. Method: rerun the ball and the electron - two wavelengths computed, one absurdly small, one usefully large. Check yourself: the wavelength does not care about charge - the flagged error imports electric intuition into a relation that reads momentum alone. Drill: compute the de Broglie wavelength of one electron and one ball, and explain the eleven-order gap.

## DIAGNOSTIC_QUESTION_1
State the de Broglie wavelength formula with all symbols defined and their SI units. What is the de Broglie wavelength of a 0.15 kg cricket ball moving at 30 m/s? (Use \( h = 6.63 \times 10^{-34} \) J·s)

## DIAGNOSTIC_ANSWER_1
Formula: \( \lambda = \frac{h}{p} = \frac{h}{mv} \). \( h = 6.63 \times 10^{-34} \) J·s, \( m \) in kg, \( v \) in m/s, \( \lambda \) in m. For cricket ball: \( p = 0.15 \times 30 = 4.5 \) kg·m/s. \( \lambda = \frac{6.63 \times 10^{-34}}{4.5} = 1.47 \times 10^{-34} \) m. A wrong answer (e.g., forgetting to multiply mass and velocity, or using wrong units for h) reveals the student cannot compute momentum or handle powers of ten correctly.

## DIAGNOSTIC_QUESTION_2
An electron and a proton have the same kinetic energy. Which has the larger de Broglie wavelength? Explain your reasoning without calculating numerical values.

## DIAGNOSTIC_ANSWER_2
The electron has the larger de Broglie wavelength. For same kinetic energy \( K = \frac{p^2}{2m} \), momentum \( p = \sqrt{2mK} \). Since \( \lambda = h/p \), \( \lambda \propto 1/\sqrt{m} \). Electron mass is ~1/1836 of proton mass, so electron's momentum is smaller, giving larger wavelength. A wrong answer (e.g., saying proton has larger wavelength because it's heavier) reveals confusion between mass and momentum in the de Broglie relation.

## DIAGNOSTIC_QUESTION_3
An electron is accelerated through a potential difference of 100 V. Calculate its de Broglie wavelength. (Given: \( m_e = 9.11 \times 10^{-31} \) kg, \( e = 1.6 \times 10^{-19} \) C, \( h = 6.63 \times 10^{-34} \) J·s)

## DIAGNOSTIC_ANSWER_3
Step 1: Kinetic energy gained \( K = eV = 1.6 \times 10^{-19} \times 100 = 1.6 \times 10^{-17} \) J.  
Step 2: Momentum \( p = \sqrt{2m_e K} = \sqrt{2 \times 9.11 \times 10^{-31} \times 1.6 \times 10^{-17}} = \sqrt{2.9152 \times 10^{-47}} = 5.40 \times 10^{-24} \) kg·m/s.  
Step 3: \( \lambda = h/p = \frac{6.63 \times 10^{-34}}{5.40 \times 10^{-24}} = 1.23 \times 10^{-10} \) m = 0.123 nm.  
A wrong answer (e.g., using \( \lambda = h/(mv) \) without finding v from K, or using V directly in formula) reveals inability to connect acceleration voltage to kinetic energy and momentum.

## DIAGNOSTIC_QUESTION_4
A graph of de Broglie wavelength \( \lambda \) versus accelerating voltage \( V \) for electrons is plotted. What is the shape of this graph? Derive the relationship and state whether it is linear, parabolic, hyperbolic, or inverse square root.

## DIAGNOSTIC_ANSWER_4
For non-relativistic electrons: \( K = eV = p^2/(2m) \Rightarrow p = \sqrt{2meV} \). Then \( \lambda = h/p = \frac{h}{\sqrt{2me}} \cdot \frac{1}{\sqrt{V}} \). So \( \lambda \propto V^{-1/2} \). The graph of \( \lambda \) vs \( V \) is a rectangular hyperbola-like curve (inverse square root). A wrong answer (e.g., linear or \( 1/V \)) reveals the student does not know how to combine \( K = eV \) with \( \lambda = h/\sqrt{2mK} \).

## DIAGNOSTIC_QUESTION_5
A student claims: "De Broglie wavelength depends on the charge of the particle because the formula uses momentum, and momentum depends on how the particle was accelerated." Evaluate this statement. Is it correct? Why or why not?

## DIAGNOSTIC_ANSWER_5
The statement is incorrect. De Broglie wavelength \( \lambda = h/p \) depends only on momentum \( p \) (mass × velocity), not on charge. Charge determines how a particle can be accelerated (e.g., by electric fields), but once the particle has a certain momentum, its wavelength is fixed regardless of its charge. A neutron and electron with same momentum have same de Broglie wavelength. The student confuses the method of achieving momentum with the wavelength formula itself.

## DIAGNOSTIC_QUESTION_6
Design a simple thought experiment to demonstrate that macroscopic objects (like a car) do not exhibit measurable wave properties, using the de Broglie formula. Specify the mass, speed, and calculate the wavelength. Compare it to a typical atomic spacing (~0.1 nm) and explain the implication.

## DIAGNOSTIC_ANSWER_6
Take a car of mass 1000 kg moving at 10 m/s. \( p = 10^4 \) kg·m/s. \( \lambda = 6.63 \times 10^{-34} / 10^4 = 6.63 \times 10^{-38} \) m. This is ~28 orders of magnitude smaller than atomic spacing (10^-10 m). Diffraction requires slit width comparable to wavelength — impossible to construct. A poor answer (e.g., not calculating, or saying "car is too big" without quantitative comparison) shows lack of understanding of the scale of Planck's constant and the condition for observable wave effects.

## COMMON_MISCONCEPTION
Students often think de Broglie wavelength depends on the particle's charge because they associate electron acceleration with electric potential (eV). They write \( \lambda = \frac{h}{\sqrt{2meV}} \) and treat charge e as a variable in the formula, forgetting that for a given kinetic energy, charge does not appear. They also confuse phase velocity with particle velocity, thinking the wave travels faster than the particle.

## ON_FAILURE
Revisit the derivation of \( \lambda = h/\sqrt{2mK} \) from \( K = p^2/2m \) and \( \lambda = h/p \). Practice calculating wavelength for (a) electron at 100 eV, (b) proton at 100 eV, (c) dust particle at 1 m/s. Compare numerical values. Then explicitly write: "Charge determines how energy is given, but wavelength depends only on momentum." Use node c11_phy_cbse_05_004 (Kinetic Energy) and c11_phy_cbse_02_001 (Momentum) for review.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_11_003, c11_phy_cbse_05_004, c11_phy_cbse_02_001, c11_phy_cbse_14_002, c12_phy_cbse_11_002

## PREREQUISITE_REASONS
c12_phy_cbse_11_003: Photon momentum \( p = h/\lambda \) provides the symmetry argument de Broglie used.
c11_phy_cbse_05_004: Kinetic energy formula \( K = p^2/2m \) needed to connect accelerating voltage to momentum.
c11_phy_cbse_02_001: Momentum definition \( p = mv \) is the particle attribute in de Broglie relation.
c11_phy_cbse_14_002: Wave speed and wavelength concepts from Class 11 waves chapter.
c12_phy_cbse_11_002: de Broglie hypothesis uses the photon relations \(E = h\nu, p = h/\lambda\) as symmetry argument to propose \(\lambda = h/p\) for matter particles.  

## FORWARD_NODE_IDS
c12_phy_cbse_11_005, c12_phy_cbse_11_006

## FORWARD_REASONS
c12_phy_cbse_11_005: Davisson-Germer experiment confirms de Broglie wavelength via electron diffraction.
c12_phy_cbse_11_006: Heisenberg uncertainty principle uses de Broglie wave packet concept.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_03_003
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Derivative of polynomial functions used in deriving kinetic energy from work-energy theorem.
c11_math_cbse_03_003: Trigonometric functions appear in wave description (sin, cos) for matter waves.

## CHAIN_DESCRIPTION
c12_phy_cbse_11_003 -> c12_phy_cbse_11_004 -> c12_phy_cbse_11_005

## THIS_FORMULA
\( \lambda = \frac{h}{p} = \frac{h}{mv} = \frac{h}{\sqrt{2mK}} \) (for non-relativistic particles); \( \lambda = \frac{h}{\sqrt{2meV}} \) (for particle accelerated through voltage V)

## FORMULA_VARIABLES
\( \lambda \) = de Broglie wavelength (m), \( h \) = Planck's constant = \( 6.63 \times 10^{-34} \) J·s, \( p \) = momentum (kg·m/s), \( m \) = mass (kg), \( v \) = speed (m/s), \( K \) = kinetic energy (J), \( e \) = charge (C), \( V \) = accelerating voltage (V)

## FORMULA_UNITS
m, J·s, kg·m/s, kg, m/s, J, C, V

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_008 | Derivative used in work-energy theorem derivation connecting force to kinetic energy change.
c11_math_cbse_03_003 | Sine/cosine functions describe matter wave oscillations in space (wavefunction).
## PREREQ_CONCEPT
Momentum and kinetic energy relationship: \( K = \frac{p^2}{2m} \) and photon momentum \( p = \frac{h}{\lambda} \).

## PREREQ_BEFORE
Student must be able to calculate momentum from mass and velocity, and kinetic energy from accelerating voltage for charged particles.

## PREREQ_STUCK
If stuck, review kinetic energy and momentum from Class 11 (c11_phy_cbse_05_004, c11_phy_cbse_02_001) and photon momentum from c12_phy_cbse_11_003.

## WORKED_EXAMPLE_1
PROBLEM: An electron gun in an old TV picture tube accelerates electrons through 500 V. Calculate the de Broglie wavelength of these electrons. (Given: \( m_e = 9.11 \times 10^{-31} \) kg, \( e = 1.6 \times 10^{-19} \) C, \( h = 6.63 \times 10^{-34} \) J·s)
STEPS:
- Step 1: Identify given: V = 500 V, electron charge e, mass m_e, Planck's constant h. Find λ.
- Step 2: Kinetic energy gained by electron: K = eV = (1.6 × 10^{-19} C)(500 V) = 8.0 × 10^{-17} J.
- Step 3: Momentum from kinetic energy: p = √(2 m_e K) = √(2 × 9.11 × 10^{-31} × 8.0 × 10^{-17}) = √(1.4576 × 10^{-46}) = 1.207 × 10^{-23} kg·m/s.
- Step 4: de Broglie wavelength: λ = h/p = (6.63 × 10^{-34}) / (1.207 × 10^{-23}) = 5.49 × 10^{-11} m = 0.0549 nm.
- Step 5: Check: This is X-ray wavelength scale, consistent with electron diffraction experiments. Answer in meters with correct significant figures.
REASONING: The electron gains kinetic energy equal to the work done by the electric field (eV). This kinetic energy determines its momentum, which in turn determines the de Broglie wavelength. The calculation chains eV → K → p → λ.
ANSWER: 5.49 × 10^{-11} m (or 0.0549 nm)

## WORKED_EXAMPLE_2
PROBLEM: A neutron (mass = 1.675 × 10^{-27} kg) moves with a speed of 2000 m/s. Find its de Broglie wavelength. Compare it with the wavelength of an electron moving at the same speed. (h = 6.63 × 10^{-34} J·s, m_e = 9.11 × 10^{-31} kg)
STEPS:
- Step 1: For neutron: p_n = m_n v = (1.675 × 10^{-27})(2000) = 3.35 × 10^{-24} kg·m/s.
- Step 2: λ_n = h/p_n = (6.63 × 10^{-34}) / (3.35 × 10^{-24}) = 1.98 × 10^{-10} m = 0.198 nm.
- Step 3: For electron at same speed: p_e = m_e v = (9.11 × 10^{-31})(2000) = 1.822 × 10^{-27} kg·m/s.
- Step 4: λ_e = h/p_e = (6.63 × 10^{-34}) / (1.822 × 10^{-27}) = 3.64 × 10^{-7} m = 364 nm (visible light range).
- Step 4: Compare: λ_e / λ_n = m_n / m_e ≈ 1839. Electron wavelength is ~1840 times larger because its mass is ~1840 times smaller.
REASONING: At same speed, momentum is proportional to mass. Since λ = h/p, wavelength is inversely proportional to mass. The neutron is much heavier, so its wavelength is much smaller for the same speed.
ANSWER: Neutron: 1.98 × 10^{-10} m (0.198 nm); Electron: 3.64 × 10^{-7} m (364 nm). Electron wavelength is ~1840 times larger.

## WORKED_EXAMPLE_3
PROBLEM: In an electron microscope, electrons are accelerated through 10 kV. Calculate the de Broglie wavelength. Then determine the minimum resolvable distance if the microscope's resolution is approximately equal to the electron wavelength. Compare this to an optical microscope using green light (λ = 550 nm). By what factor is the electron microscope's resolution better?
STEPS:
- Step 1: V = 10,000 V. K = eV = (1.6 × 10^{-19})(10^4) = 1.6 × 10^{-15} J.
- Step 2: p = √(2 m_e K) = √(2 × 9.11 × 10^{-31} × 1.6 × 10^{-15}) = √(2.9152 × 10^{-45}) = 5.40 × 10^{-23} kg·m/s.
- Step 3: λ_e = h/p = (6.63 × 10^{-34}) / (5.40 × 10^{-23}) = 1.23 × 10^{-11} m = 0.0123 nm.
- Step 4: Optical microscope resolution ≈ λ_light = 550 nm = 5.5 × 10^{-7} m.
- Step 5: Resolution improvement factor = λ_light / λ_e = (5.5 × 10^{-7}) / (1.23 × 10^{-11}) ≈ 4.47 × 10^4.
- Step 6: Electron microscope resolves ~45,000 times smaller details than optical microscope with green light.
REASONING: Higher accelerating voltage gives electrons more kinetic energy, larger momentum, and smaller de Broglie wavelength. The resolution limit of a microscope is fundamentally limited by the wavelength of the probing radiation/particles. This example shows why electron microscopes achieve atomic-scale resolution.
ANSWER: λ_e = 1.23 × 10^{-11} m (0.0123 nm); Resolution improvement factor ≈ 4.5 × 10^4 times better than green light optical microscope.

## COMPETENCY_QUESTION_1
QUESTION: A proton and an alpha particle are both accelerated from rest through the same potential difference V. Find the ratio of their de Broglie wavelengths \( \lambda_p / \lambda_\alpha \). (Mass of alpha particle ≈ 4 × mass of proton, charge of alpha particle = 2 × charge of proton)
COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Both gain kinetic energy K = qV. For proton: K_p = eV. For alpha: K_α = 2eV.
- Step 2: de Broglie wavelength λ = h/√(2mK). So λ ∝ 1/√(mK).
- Step 3: For proton: λ_p ∝ 1/√(m_p × eV). For alpha: λ_α ∝ 1/√(4m_p × 2eV) = 1/√(8 m_p eV).
- Step 4: Ratio λ_p / λ_α = √(8 m_p eV) / √(m_p eV) = √8 = 2√2 ≈ 2.83.
- Step 5: Proton's wavelength is larger because its mass-to-charge ratio is smaller.
ANSWER: \( \lambda_p / \lambda_\alpha = 2\sqrt{2} \) (≈ 2.83)
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a hypothetical experiment, a beam of particles with de Broglie wavelength 0.1 nm is incident on a crystal with atomic plane spacing 0.2 nm. The first-order diffraction maximum occurs at angle θ. If the particle's kinetic energy is doubled while keeping the same crystal, what happens to the diffraction angle θ? Explain using the de Broglie relation and Bragg's law (nλ = 2d sinθ).
COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Bragg's law for first order: λ = 2d sinθ. So sinθ = λ/(2d).
- Step 2: de Broglie wavelength λ = h/√(2mK). So λ ∝ 1/√K.
- Step 3: If K is doubled, λ becomes λ' = λ/√2.
- Step 4: New sinθ' = λ'/(2d) = (λ/√2)/(2d) = (1/√2) sinθ.
- Step 5: Since sinθ' < sinθ, the angle θ' decreases. The diffraction peak moves closer to the central maximum.
ANSWER: The diffraction angle θ decreases. Specifically, sinθ_new = sinθ_original / √2.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: This wavelength is called the de Broglie wavelength and ______ wave-particle duality for matter.

## DIAGNOSTIC_ANSWER_7
establishes

The establishes verb is the hypothesis's claim: one wavelength formula and matter joins light in the wave-particle club. **A wrong answer (questions) reveals the student has made the formula a sceptic when de Broglie built it as a manifesto.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a cricket ball thrown at 30 m/s — it travels in a straight line, shows no ______ or interference.

## DIAGNOSTIC_ANSWER_8
diffraction

The diffraction is the ball's missing trick: no bending, no fringes, because its wavelength is far smaller than anything it meets. **A wrong answer (spin) reveals the student has listed a rotation property where the sentence lists wave behaviours.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe a cricket ball thrown at ______ m/s — it travels in a straight line, shows no diffraction or interference.

## DIAGNOSTIC_ANSWER_9
30

The thirty is the ball's pace: fast enough to feel real, slow enough to keep its wavelength unmeasurably small. **A wrong answer (another speed) reveals the student has re-thrown the ball and recomputed an invisibility that was the point.** The thirty is the ball's pace: fast enough to feel real, slow enough to keep its wavelength invisible.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe a cricket ball thrown at 30 m/s — it travels in a straight line, shows no diffraction or ______.

## DIAGNOSTIC_ANSWER_10
interference

The interference completes the missing pair: diffraction and interference are the two wave calling-cards the ball never shows. **A wrong answer (momentum) reveals the student has listed a particle virtue where the sentence misses wave virtues.**
