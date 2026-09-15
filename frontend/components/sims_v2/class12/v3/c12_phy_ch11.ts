import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch11 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch11: SimDef = {
    id: 'v3_c12_phy_ch11',
    title: 'Dual Nature of Radiation and Matter',
    subtitle: 'Brighter didn\'t help — bluer did',
    classLevel: 12, subject: 'physics', topic: 'Dual Nature of Radiation and Matter',
    chapters: ['c12_phy_ch11'],
    nodeIds: ['c12_phy_cbse_11_001', 'c12_phy_cbse_11_002', 'c12_phy_cbse_11_003', 'c12_phy_cbse_11_004', 'c12_phy_cbse_11_005', 'c12_phy_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Photoelectric experimentalist', intro: 'A solar calculator and a dusk-sensing streetlight run on the same shock: light ejects electrons by frequency, not brightness.', goal: 'Interpret photoelectric experiments — threshold frequency, stopping potential, and intensity\'s real role.' },
    discovery: {
        question: 'Blast zinc with a blinding white torch — nothing. Shine a feeble UV lamp — electrons pour out instantly. What is light actually delivering?',
        options: ['Frequency — each photon carries hν; below threshold no intensity helps because energy arrives in packets, not a continuous wash', 'More light overall', 'Heat buildup', 'UV is stronger'],
        answer: 'Frequency — each photon carries hν; below threshold no intensity helps because energy arrives in packets, not a continuous wash',
        hook: 'Brighter light means more electrons, not faster ones — doubling intensity doubles saturation current but leaves stopping potential untouched. K_max answers to frequency alone: that\'s the result wave theory can never explain, and the graph where the curves split.',
    },
    teaching: [
        { title: 'Photoelectric Effect: Experimental Observations', text: 'The photoelectric effect is the phenomenon where electrons (photoelectrons) are emitted from a metal surface when electromagnetic radiation of sufficient frequency (above the threshold frequency).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_11_001', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Run the photoelectric experiment mentally: predict how photocurrent shifts with intensity versus frequency, hold stopping potential against brighter light, and spot the \'yellow beats green\' report that can\'t be true.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_001', title: 'Photoelectric Effect: Experimental Observations',
          scaffold: { problem: 'In a photoelectric experiment using a sodium surface (work function φ₀ = 2.28 eV), monochromatic light of wavelength 450 nm is incident.',
            steps: [
            { text: 'Identify given quantities: λ = 450 nm = 450 × 10⁻⁹ m, φ₀ = 2.28 eV, I = 5.0 mW/m² = 5.0 × 10⁻³ W/m², A = 2.0 cm² = 2.0.' },
            { text: 'Photon energy E = hc/λ. Substitute: E = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (450 × 10⁻⁹) = 4.42 × 10⁻¹⁹ J.' },
            { text: 'Check threshold condition: E (2.76 eV) > φ₀ (2.28 eV) ⇒ emission occurs.' },
            { text: 'Kₘₐₓ = E - φ₀ = 2.76 eV - 2.28 eV = 0.48 eV. In joules: Kₘₐₓ = 0.48 × 1.6 × 10⁻¹⁹ = 7.68 × 10⁻²⁰ J.' },
            { text: 'Stopping potential V₀ = Kₘₐₓ/e = 0.48 eV / e = 0.48 V (since 1 eV is energy gained by electron across 1 V).' },
            { text: 'Power on emitter P = I × A = (5.0 × 10⁻³) × (2.0 × 10⁻⁴) = 1.0 × 10⁻⁶ W = 1.0 × 10⁻⁶ J/s.', faded: true, blankAnswer: '(a) 2.76 eV (b) Yes, emission occurs (c) Kₘₐₓ = 0.48.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_002', title: 'Einstein\'s Photoelectric Equation',
          scaffold: { problem: 'In a photoelectric experiment using a sodium surface (\\(\\phi_0 = 2.28 \\text{ eV}\\)), light of wavelength 450 nm is incident.',
            steps: [
            { text: 'Identify given quantities: \\(\\lambda = 450 \\text{ nm} = 450 \\times 10^{-9} \\text{ m}\\), \\(\\phi_0 = 2.28 \\text{ eV}\\).' },
            { text: 'Calculate photon energy \\(E = hc/\\lambda = (6.63 \\times 10^{-34} \\times 3.00 \\times 10^8) / (450 \\times 10^{-9}) = 4.42.' },
            { text: 'Apply Einstein\'s equation: \\(K_{\\text{max}} = E - \\phi_0 = 2.76 \\text{ eV} - 2.28 \\text{ eV} = 0.48 \\text{ eV}\\).' },
            { text: 'Stopping potential \\(V_0 = K_{\\text{max}}/e = 0.48 \\text{ V}\\) (since \\(K_{\\text{max}}\\) in eV numerically equals.' },
            { text: 'Threshold frequency \\(\\nu_0 = \\phi_0/h = 3.65 \\times 10^{-19} / 6.63 \\times 10^{-34} = 5.50 \\times 10^{14} \\text{.' },
            { text: 'Verify physical reasonableness: \\(\\lambda = 450 \\text{ nm} < \\lambda_0 = 545 \\text{ nm}\\) so emission occurs.', faded: true, blankAnswer: '(a) 2.76 eV, (b) 0.48 eV, (c) 0.48 V, (d) 545 nm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_003', title: 'Particle Nature of Light: Photons',
          scaffold: { problem: 'A sodium vapour street lamp emits 100 W of yellow light (λ = 589 nm).',
            steps: [
            { text: 'Identify given: P_elec = 100 W, efficiency η = 0.10 → P_light = 10.0 W. λ = 589 nm = 589 × 10⁻⁹ m.' },
            { text: 'Photon energy E = hc/λ. Substitute: E = (6.63×10⁻³⁴ × 3.00×10⁸) / (589×10⁻⁹) = 3.37×10⁻¹⁹ J.' },
            { text: 'Photon flux N = P_light / E = 10.0 / (3.37×10⁻¹⁹) = 2.97×10¹⁹ photons/s.' },
            { text: 'Photon momentum p = h/λ = E/c = 3.37×10⁻¹⁹ / 3.00×10⁸ = 1.12×10⁻²⁷ kg·m/s.' },
            { text: 'Force on perfect absorber = rate of momentum transfer = N × p = (2.97×10¹⁹) × (1.12×10⁻²⁷) = 3.33×10⁻⁸ N.', faded: true, blankAnswer: '(a) 2.11 eV, (b) 2.97 × 10¹⁹ photons/s, (c) 1.12 × 10⁻²⁷.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_004', title: 'de Broglie Hypothesis: Wave-Particle Duality',
          scaffold: { problem: 'An electron gun in an old TV picture tube accelerates electrons through 500 V. Calculate the de Broglie wavelength of these electrons.',
            steps: [
            { text: 'Identify given: V = 500 V, electron charge e, mass m_e, Planck\'s constant h. Find λ.' },
            { text: 'Kinetic energy gained by electron: K = eV = (1.6 × 10^{-19} C)(500 V) = 8.0 × 10^{-17} J.' },
            { text: 'Momentum from kinetic energy: p = √(2 m_e K) = √(2 × 9.11 × 10^{-31} × 8.0 × 10^{-17}) = √(1.4576 × 10^{-46}) = 1.207.' },
            { text: 'de Broglie wavelength: λ = h/p = (6.63 × 10^{-34}) / (1.207 × 10^{-23}) = 5.49 × 10^{-11} m = 0.0549 nm.' },
            { text: 'Check: This is X-ray wavelength scale, consistent with electron diffraction experiments.', faded: true, blankAnswer: '5.49 × 10^{-11} m (or 0.0549 nm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_005', title: 'Davisson-Germer Experiment: Electron Diffraction',
          scaffold: { problem: 'In a Davisson-Germer experiment, electrons are accelerated through 54 V and strike a nickel crystal.',
            steps: [
            { text: 'Identify given quantities: \\(V = 54 \\, \\text{V}\\), \\(\\phi = 50^\\circ\\), \\(d = 0.91 \\, \\text{Å} = 0.91 \\times 10^{-10}.' },
            { text: 'Compute de Broglie wavelength \\(\\lambda_{\\text{dB}} = h / \\sqrt{2 m_e e V}\\).' },
            { text: 'Relate scattering angle \\(\\phi\\) to Bragg angle \\(\\theta\\). For planes parallel to surface, \\(\\phi = 2\\theta\\).' },
            { text: 'Compute Bragg wavelength \\(\\lambda_{\\text{Bragg}} = 2d \\sin\\theta / n = 2 \\times 0.91\\times10^{-10} \\times \\sin.' },
            { text: 'Compare: \\(\\lambda_{\\text{dB}} = \\lambda_{\\text{Bragg}} = 1.67 \\, \\text{Å}\\).', faded: true, blankAnswer: '\\(\\lambda_{\\text{dB}} = \\lambda_{\\text{Bragg}} = 1.67.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_11_006', title: 'Heisenberg\'s Uncertainty Principle',
          scaffold: { problem: 'In a hydrogen atom, the electron is confined to a region of roughly 0.053 nm (Bohr radius).',
            steps: [
            { text: 'Identify given: Δx ≈ 0.053 nm = 5.3 × 10⁻¹¹ m. We need minimum kinetic energy K_min.' },
            { text: 'Use uncertainty principle: Δp_min ≈ ħ/(2Δx) = (1.055 × 10⁻³⁴) / (2 × 5.3 × 10⁻¹¹) = 9.95 × 10⁻²⁵ kg·m/s.' },
            { text: 'Minimum momentum magnitude p_min ≈ Δp_min (since average momentum is zero in bound state). Kinetic energy K = p²/(2m).' },
            { text: 'K_min = (Δp_min)² / (2mₑ) = (9.95 × 10⁻²⁵)² / (2 × 9.11 × 10⁻³¹) = 9.90 × 10⁻⁴⁹ / 1.822 × 10⁻³⁰ = 5.43 × 10⁻¹⁹ J.' },
            { text: 'Convert to eV: K_min = (5.43 × 10⁻¹⁹) / (1.602 × 10⁻¹⁹) = 3.39 eV.', faded: true, blankAnswer: 'K_min ≈ 3.4 eV' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A photo-sensor project fails under a blazing red lamp, so a teammate suggests \'double the brightness — more light means more energy per electron.\'',
            decisions: [{ prompt: 'What does Einstein\'s equation say is actually missing?', options: [
                { text: 'Frequency, not brightness — Kmax = hν − φ₀ has no intensity term; if red light sits below the threshold frequency, no electron gets out at any brightness, while doubling intensity would only multiply the count of electrons, never their energy.', outcome: 'The chapter\'s core: one photon pays one electron — energy per photon is set by frequency, so the fix is bluer light, not brighter light.' },
                { text: 'He\'s right — intensity is the total energy delivered, so raising it must raise the electrons\' energy.', outcome: 'That\'s the wave picture Einstein displaced — energy arrives in photon packets of hν; a billion weak photons still can\'t do what one above-threshold photon does.', reveals: 'brightness-equals-energy' },
                { text: 'Keep the red lamp but let it run longer — the electrons just need time to accumulate enough energy.', outcome: 'There is no accumulation — the photon-electron exchange is instantaneous, which is exactly the classical impasse the photon model solved; waiting doesn\'t raise hν.', reveals: 'time-accumulates-energy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_11_006', title: 'You made it',
          caseStudy: { intro: 'You can now read the photoelectric evidence — and see exactly where the wave picture broke and the photon was forced on physics.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_001', difficulty: 'standard',
          question: 'The photoelectric effect is the phenomenon where electrons (photoelectrons) are.',
          hint: 'If stuck, revisit c10_phy_cbse_01_001 (electric current), c10_phy_cbse_01_002 (potential.',
          misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If we increase the intensity of incident light, the maximum kinetic energy of photoelectrons increases because more energy is delivered.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'higher intensity means higher energy per photon'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_001 (electric current), c10_phy_cbse_01_002 (potential.',
                  misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness should increase the.' },
                { id: 'b', prompt: 'Monochromatic light of frequency 7.5 × 10¹⁴ Hz is incident on a caesium surface (work function φ₀ = 2.14 eV). The stopping potential measured is 0.95 V.', answer: 'Calculate the maximum kinetic energy of photoelectrons in joules',
                  options: ['Calculate the maximum kinetic energy of photoelectrons in joules', 'V₀ doubles', 'V₀ becomes zero', 'higher intensity means higher energy per photon'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_001 (electric current), c10_phy_cbse_01_002 (potential.',
                  misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness should increase the.' }
          ],
            remediations: { 'higher-intensity-means-higher-energy': { steps: ['If the student holds the intensity-Kₘₐₓ misconception: (1) Revisit the definition of intensity in wave optics.', '(2) Perform the "simulated photoelectric effect" PhET interactive (University of Colorado) — vary intensity slider.', '(3) Re-derive Kₘₐₓ = eV₀ from the experimental definition: V₀ is the voltage that stops the *most energetic* electron.', 'Ask: "Does making the light brighter give any single electron more energy?" (4) Re-attempt Diagnostic Question 3(b) and.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness.',
          parts: [
                { id: 'a', prompt: 'An experimentalist reports: "For a certain metal, when green light (λ = 530 nm) is used, the stopping potential is 0.8 V.', answer: 'The claim is impossible',
                  options: ['The claim is impossible', 'higher intensity means higher energy per photon'],
                  hint: 'If stuck, revisit c10_phy_cbse_01_001 (electric current), c10_phy_cbse_01_002 (potential.',
                  misconception: 'Students often think "higher intensity means higher energy per photon" and therefore predict that increasing brightness should increase the.' }
          ],
            remediations: { 'higher-intensity-means-higher-energy': { steps: ['If the student holds the intensity-Kₘₐₓ misconception: (1) Revisit the definition of intensity in wave optics.', '(2) Perform the "simulated photoelectric effect" PhET interactive (University of Colorado) — vary intensity slider.', '(3) Re-derive Kₘₐₓ = eV₀ from the experimental definition: V₀ is the voltage that stops the *most energetic* electron.', 'Ask: "Does making the light brighter give any single electron more energy?" (4) Re-attempt Diagnostic Question 3(b) and.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_002', difficulty: 'standard',
          question: 'Einstein\'s photoelectric equation states that the maximum kinetic energy of.',
          hint: 'If stuck on unit conversions, revisit c10_phy_cbse_01_002 (electric potential) for \\(eV\\).',
          misconception: 'Students often write the photoelectric equation as \\(V_0 = h\\nu - \\phi_0\\) (omitting \\(e\\) on the left) or.',
          parts: [
                { id: 'a', prompt: 'The graph of stopping potential \\(V_0\\) versus frequency \\(\\nu\\) for two metals A and B are straight lines with the same slope but different intercepts on the.', answer: 'Which metal has the larger work function?',
                  options: ['Which metal has the larger work function?', 'higher threshold frequency means easier emission'],
                  hint: 'If stuck on unit conversions, revisit c10_phy_cbse_01_002 (electric potential) for \\(eV\\) energy.',
                  misconception: 'Students often write the photoelectric equation as \\(V_0 = h\\nu - \\phi_0\\) (omitting \\(e\\) on the left) or as \\(K_{\\text{max}} = h\\nu.' }
          ],
            remediations: { 'students-often-write-the-photoelectric': { steps: ['Revisit the definition of electronvolt — 1 eV = energy gained by an electron crossing 1 V potential difference.', 'Practice converting every energy value in a problem to *one* unit system (either all joules or all eV) before.', 'Solve 5 numerical problems where \\(\\phi_0\\) is given in eV and wavelength in nm, requiring conversion to joules for.', 'Take a diagnostic: "Light of \\(\\lambda = 500 \\text{ nm}\\) hits metal with \\(\\phi_0 = 2.0 \\text{ eV}\\).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_003', difficulty: 'standard',
          question: 'A photon is the fundamental quantum (particle) of electromagnetic radiation.',
          hint: 'If stuck, re-read NCERT Section 11.6 (Einstein\'s Photoelectric Equation) and work through.',
          misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels.',
          parts: [
                { id: 'a', prompt: 'State the energy and momentum of a single photon of frequency ν and wavelength λ in vacuum. Give the SI units of each quantity.', answer: 'Energy E = hν = hc/λ (unit: joule, J)',
                  options: ['Energy E = hν = hc/λ (unit: joule, J)', 'higher intensity light means higher energy photons', 'more energetic'],
                  hint: 'If stuck, re-read NCERT Section 11.6 (Einstein\'s Photoelectric Equation) and work through Example.',
                  misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels "more energetic." They.' },
                { id: 'b', prompt: 'A helium–neon laser emits 2.0 mW of monochromatic light at λ = 632.8 nm.', answer: 'the energy of one photon in joules and eV, and (',
                  options: ['the energy of one photon in joules and eV, and (', 'higher intensity light means higher energy photons', 'more energetic'],
                  hint: 'If stuck, re-read NCERT Section 11.6 (Einstein\'s Photoelectric Equation) and work through Example.',
                  misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels "more energetic." They.' },
                { id: 'c', prompt: 'Two monochromatic sources A and B emit the same power (5.0 mW). Source A emits red light (λ = 650 nm), source B emits blue light (λ = 450 nm).', answer: '(i) E_B > E_A because E ∝ 1/λ (blue has shorter λ)',
                  options: ['(i) E_B > E_A because E ∝ 1/λ (blue has shorter λ)', 'higher momentum per photon', 'higher intensity light means higher energy photons', 'more energetic'],
                  hint: 'If stuck, re-read NCERT Section 11.6 (Einstein\'s Photoelectric Equation) and work through Example.',
                  misconception: 'Students often think "higher intensity light means higher energy photons" because in daily life brighter light feels "more energetic." They.' }
          ],
            remediations: { 'higher-intensity-light-means-higher': { steps: ['Revisit node **c12_phy_cbse_11_002** (Einstein\'s Photoelectric Equation) — specifically the step where K_max = hν – φ₀.', 'Re-do **Worked Example 1** below, but *first* predict what happens to photon energy if intensity doubles (answer.', 'Perform the "Photon Flux" mini-lab: Use a laser pointer (known P, λ), calculate N = P/(hc/λ), then verify order.', 'Re-attempt Diagnostic Question 2 and 4, explaining each step aloud.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_004', difficulty: 'standard',
          question: 'The de Broglie hypothesis states that every moving particle of matter with.',
          hint: 'If stuck, review kinetic energy and momentum from Class 11 (c11_phy_cbse_05_004.',
          misconception: 'Students often think de Broglie wavelength depends on the particle\'s charge because they associate electron.',
          parts: [
                { id: 'a', prompt: 'An electron and a proton have the same kinetic energy. Which has the larger de Broglie wavelength? Explain your reasoning without calculating numerical values.', answer: 'The electron has the larger de Broglie wavelength',
                  options: ['The electron has the larger de Broglie wavelength', 'proton has larger wavelength'],
                  hint: 'If stuck, review kinetic energy and momentum from Class 11 (c11_phy_cbse_05_004.',
                  misconception: 'Students often think de Broglie wavelength depends on the particle\'s charge because they associate electron acceleration with electric.' }
          ],
            remediations: { 'de-broglie-wavelength-depends-on': { steps: ['Revisit the derivation of \\( \\lambda = h/\\sqrt{2mK} \\) from \\( K = p^2/2m \\) and \\( \\lambda = h/p \\).', 'Practice calculating wavelength for (a) electron at 100 eV, (b) proton at 100 eV, (c) dust particle at 1 m/s.', 'Then explicitly write: "Charge determines how energy is given, but wavelength depends only on momentum." Use node.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_005', difficulty: 'standard',
          question: 'The Davisson-Germer experiment (1927) demonstrated the wave nature of electrons.',
          hint: 'If stuck, revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) and Class 11 wave.',
          misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface.',
          parts: [
                { id: 'a', prompt: 'In the Davisson-Germer experiment, the nickel crystal acts as a three-dimensional diffraction grating.', answer: 'Bragg\'s law arises from reflection off successive crystal planes',
                  options: ['Bragg\'s law arises from reflection off successive crystal planes', 'the factor 2 is because there are two slits'],
                  hint: 'If stuck, revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) and Class 11 wave.',
                  misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface (glancing angle).' },
                { id: 'b', prompt: 'The Davisson-Germer experiment originally used a polycrystalline nickel target, but after an accidental heating (which created a single large crystal), they.', answer: 'A polycrystalline target consists of many randomly oriented microcrystals',
                  options: ['A polycrystalline target consists of many randomly oriented microcrystals', 'polycrystalline has no planes'],
                  hint: 'If stuck, revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) and Class 11 wave.',
                  misconception: 'Students often think the angle \\(\\theta\\) in Bragg\'s law is the angle between the incident beam and the crystal surface (glancing angle).' }
          ],
            remediations: { 'the-angle-theta-in-bragg': { steps: ['Revisit the de Broglie hypothesis node (c12_phy_cbse_11_004) to solidify \\(\\lambda = h/p\\) and its derivation from \\(p.', 'Review Class 11 wave optics: interference from multiple slits (c11_phy_cbse_14_005) and the concept of path difference.', 'Draw the crystal planes, incident beam, and reflected beam; label the glancing angle \\(\\alpha\\) and Bragg angle.', 'Practice converting between them.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_11_006', difficulty: 'standard',
          question: 'Heisenberg\'s Uncertainty Principle states that it is fundamentally impossible.',
          hint: 'Revisit de Broglie hypothesis (c12_phy_cbse_11_004) for λ = h/p and wave packet idea.',
          misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with.',
          parts: [
                { id: 'a', prompt: 'State Heisenberg\'s Uncertainty Principle for position and momentum, giving the exact mathematical inequality with the reduced Planck constant ħ.', answer: 'Δx Δp ≥ ħ/2, where ħ = h/(2π) = 1.055 × 10⁻³⁴ J·s',
                  options: ['Δx Δp ≥ ħ/2, where ħ = h/(2π) = 1.055 × 10⁻³⁴ J·s', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Revisit de Broglie hypothesis (c12_phy_cbse_11_004) for λ = h/p and wave packet idea; review.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' },
                { id: 'b', prompt: 'A student argues: "The uncertainty principle is just because our measuring instruments disturb the particle.', answer: 'The principle is fundamental, not instrumental',
                  options: ['The principle is fundamental, not instrumental', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Revisit de Broglie hypothesis (c12_phy_cbse_11_004) for λ = h/p and wave packet idea; review.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' },
                { id: 'c', prompt: 'An electron is confined within a region of size Δx = 0.10 nm (typical atomic radius). Calculate the minimum uncertainty in its velocity (Δv_min).', answer: 'Step 1: Δx = 0.10 nm = 1.0 × 10⁻¹⁰ m',
                  options: ['Step 1: Δx = 0.10 nm = 1.0 × 10⁻¹⁰ m', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Revisit de Broglie hypothesis (c12_phy_cbse_11_004) for λ = h/p and wave packet idea; review.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' },
                { id: 'd', prompt: 'Compare the minimum uncertainty in velocity for (a) an electron (mₑ = 9.11 × 10⁻³¹ kg) and (b) a dust particle (m = 1.0 × 10⁻⁹ kg), both confined to Δx = 1.0.', answer: 'an electron (mₑ = 9.11 × 10⁻³¹ kg) and (',
                  options: ['an electron (mₑ = 9.11 × 10⁻³¹ kg) and (', 'observer effect', 'the uncertainty principle arises'],
                  hint: 'Revisit de Broglie hypothesis (c12_phy_cbse_11_004) for λ = h/p and wave packet idea; review.',
                  misconception: 'Students often believe the uncertainty principle arises because the act of measurement (e.g., hitting an electron with a photon) disturbs.' }
          ],
            remediations: { 'the-uncertainty-principle-arises-because': { steps: ['If the student holds the "measurement disturbance" misconception, have them revisit the wave packet concept from.', 'Perform the single-slit diffraction thought experiment (Diagnostic 6) step-by-step: draw the slit, the diffracted.', 'Then re-attempt Diagnostic Question 2.', 'If they still confuse h and ħ/2, drill the formula Δx Δp ≥ ħ/2 with 5 numerical examples, emphasising the factor 1/2.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
