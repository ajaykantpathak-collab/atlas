import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch02_p2: SimDef = {
    id: 'v3_c11_chem_ch02_p2',
    title: 'Structure of Atom · Part 2/3',
    subtitle: 'See how crossed fields proved cathode rays are particles and pinned down e/m.',
    classLevel: 11, subject: 'chemistry', topic: 'Structure of Atom · Part 2/3',
    chapters: ['c11_chem_ch02'],
    nodeIds: ['c11_chem_cbse_02_007', 'c11_chem_cbse_02_008', 'c11_chem_cbse_02_009', 'c11_chem_cbse_02_010', 'c11_chem_cbse_02_011', 'c11_chem_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physicist reproducing Thomson\'s cathode-ray measurements', intro: 'A glowing beam in a vacuum tube — light or matter? Your fields will decide.', goal: 'Explain why field deflection proves particle nature and how crossed fields yield the charge-to-mass ratio.' },
    discovery: {
        question: 'Atoms are mostly empty space — so why can\'t you walk through a wall?',
        options: ['Electron clouds repel each other electromagnetically', 'Nuclei collide head-on', 'Atoms are actually solid', 'Walls are quantum-locked'],
        answer: 'Electron clouds repel each other electromagnetically',
        hook: 'Solidity is an illusion of repulsion. Rutherford\'s gold foil proved it a century ago.',
    },
    teaching: [
        { title: 'Photoelectric Effect: Einstein\'s Explanation', text: 'The photoelectric effect is the phenomenon where electrons are ejected from a metal surface when electromagnetic radiation of sufficient frequency (above a metal-specific threshold frequency ν₀).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_02_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Place 4 electrons in the atom — which shell fills first?',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_007', title: 'Photoelectric Effect: Einstein\'s Explanation',
          scaffold: { problem: 'A photoelectric cell uses caesium (work function = 1.9 eV). Light of wavelength 400 nm is incident on it.',
            steps: [
            { text: 'Calculate photon energy in joules: E = hc/λ = (6.626×10⁻³⁴ × 3.00×10⁸) / (400×10⁻⁹) = 4.970×10⁻¹⁹ J.' },
            { text: 'Convert photon energy to eV: E = 4.970×10⁻¹⁹ / 1.602×10⁻¹⁹ = 3.10 eV.' },
            { text: 'Apply Einstein\'s equation: K_max = E − W₀ = 3.10 eV − 1.9 eV = 1.20 eV.' },
            { text: 'Stopping potential: eV_s = K_max → V_s = K_max/e = 1.20 V (since 1 eV energy corresponds to 1 V stopping potential for.' },
            { text: 'Convert K_max to joules: K_max = 1.20 × 1.602×10⁻¹⁹ = 1.922×10⁻¹⁹ J.' },
            { text: 'Calculate maximum speed: v_max = √(2K_max/m_e) = √(2 × 1.922×10⁻¹⁹ / 9.109×10⁻³¹) = 6.49×10⁵ m/s.', faded: true, blankAnswer: '(a) 3.10 eV, (b) 1.20 eV, (c) 1.20 V, (d) 6.49 × 10⁵ m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_008', title: 'Bohr\'s Model of Hydrogen Atom',
          scaffold: { problem: 'A hydrogen atom in its ground state (n=1) absorbs a photon of wavelength 97.5 nm. To which energy level (n_f) is the electron excited?',
            steps: [
            { text: 'Identify knowns: n_i = 1 (ground state), λ = 97.5 nm = 97.5 × 10⁻⁹ m, absorption so n_f > n_i.' },
            { text: 'Use Rydberg formula for absorption: 1/λ = R_∞(1/n_i² - 1/n_f²). Rearrange: 1/n_f² = 1/n_i² - 1/(λR_∞).' },
            { text: 'Compute 1/(λR_∞) = 1/[(97.5×10⁻⁹)(1.097×10⁷)] = 1/1.0696 = 0.9350.' },
            { text: '1/n_f² = 1/1² - 0.9350 = 1 - 0.9350 = 0.0650 → n_f² = 1/0.0650 = 15.38 → n_f ≈ 3.92.' },
            { text: 'n must be integer; closest is n_f = 4. Verify: 1/λ = R_∞(1 - 1/16) = 1.097×10⁷ × 15/16 = 1.028×10⁷ m⁻¹ → λ = 97.3.', faded: true, blankAnswer: 'n_f = 4 (transition from n=1 to n=4, Lyman-γ line)' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_009', title: 'Limitations of Bohr\'s Model',
          caseStudy: { intro: 'Observe a high-resolution hydrogen spectrum in a spectroscopy lab or a YouTube video of the Balmer series – you will see that some "single" lines (like H-alpha.',
            decisions: [{ prompt: 'State the two fundamental postulates of Bohr\'s model that are contradicted by the Heisenberg uncertainty principle.', options: [
                { text: 'The two postulates are: (i) the electron moves in a well-defined circular orbit of fixed', outcome: 'The two postulates are: (i) the electron moves in a well-defined circular orbit of fixed radius.' },
                { text: 'Bohr said energy is quantized', outcome: 'Not quite — Students often think Bohr\'s model fails only because "it doesn\'t work for atoms with more than one.', reveals: 'bohr-s-model-fails-only' },
                { text: 'it doesn\'t work for atoms with more than one electron', outcome: 'Not quite — Students often think Bohr\'s model fails only because "it doesn\'t work for atoms with more than one.', reveals: 'bohr-s-model-fails-only' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_010', title: 'de Broglie\'s Hypothesis: Wave-Particle Duality',
          scaffold: { problem: 'In an electron microscope, electrons are accelerated through 10 kV.',
            steps: [
            { text: 'Identify given values: V = 10,000 V, e = 1.602 × 10⁻¹⁹ C, mₑ = 9.11 × 10⁻³¹ kg, h = 6.626 × 10⁻³⁴ J·s' },
            { text: 'Calculate kinetic energy gained by electron: KE = eV = (1.602 × 10⁻¹⁹)(10⁴) = 1.602 × 10⁻¹⁵ J' },
            { text: 'Find velocity from KE = ½mv²: v = √(2KE/m) = √(2 × 1.602 × 10⁻¹⁵ / 9.11 × 10⁻³¹) = 5.93 × 10⁷ m/s' },
            { text: 'Calculate de Broglie wavelength: λ = h/(mv) = 6.626 × 10⁻³⁴ / (9.11 × 10⁻³¹ × 5.93 × 10⁷) = 1.23 × 10⁻¹¹ m = 0.0123 nm' },
            { text: 'Compare with light microscope: Resolution ∝ λ. Light λ ≈ 500 nm = 5 × 10⁻⁷ m.', faded: true, blankAnswer: 'λ = 1.23 × 10⁻¹¹ m (0.0123 nm). Theoretical resolution.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_011', title: 'Heisenberg\'s Uncertainty Principle',
          scaffold: { problem: 'In a scanning tunnelling microscope (STM), the position of an electron is determined to within 0.05 nm.',
            steps: [
            { text: 'Identify given values — Δx = 0.05 nm = 5 × 10⁻¹¹ m, m = 9.11 × 10⁻³¹ kg, h = 6.626 × 10⁻³⁴ J s.' },
            { text: 'Write the uncertainty principle formula — Δx Δp ≥ h/4π. Since Δp = m Δv, substitute to get Δx · m Δv ≥ h/4π.' },
            { text: 'Rearrange for minimum Δv — Δv ≥ h / (4π m Δx).' },
            { text: 'Substitute numerical values — Δv ≥ (6.626 × 10⁻³⁴) / (4 × 3.1416 × 9.11 × 10⁻³¹ × 5 × 10⁻¹¹).' },
            { text: 'Calculate — Δv ≥ 1.16 × 10⁶ m s⁻¹. Interpret: This uncertainty is ~0.4% of the speed of light, huge for an electron.', faded: true, blankAnswer: 'Minimum uncertainty in velocity = 1.16 × 10⁶ m s⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_012', title: 'Quantum Mechanical Model: Orbitals',
          scaffold: { problem: 'In a potassium atom (Z=19), the valence electron occupies the 4s orbital rather than the 3d orbital.',
            steps: [
            { text: 'Identify the competing orbitals for the 19th electron: 3d (n=3, l=2) and 4s (n=4, l=0).' },
            { text: 'Apply the (n+l) rule: for 3d, n+l = 3+2 = 5; for 4s, n+l = 4+0 = 4. Lower (n+l) means lower energy, so 4s fills first.' },
            { text: 'Verify with effective nuclear charge concept: 4s orbital has greater penetration (non-zero ψ at nucleus) than 3d (ψ=0.' },
            { text: 'Calculate approximate energy of 4s electron: E(4s) = -13.6 × (2.2)² / 4² = -13.6 × 4.84 / 16 = -4.11 eV.' },
            { text: 'Calculate approximate energy of 3d electron: E(3d) = -13.6 × (1.3)² / 3² = -13.6 × 1.69 / 9 = -2.55 eV.' },
            { text: 'Compare: E(4s) = -4.11 eV < E(3d) = -2.55 eV (more negative = lower energy), confirming 4s is energetically favored.', faded: true, blankAnswer: '4s fills before 3d because (n+l)₄ₛ = 4 < (n+l)₃𝒹 = 5.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In the physics-chemistry lab your teacher brings a discharge tube and a bar magnet. The glowing beam bends when the magnet approaches and drifts toward the positive plate of an electric field. A student objects: \'It\'s just a ray like light — it travels straight and makes things glow, so it\'s an electromagnetic wave, not particles.\'',
            decisions: [{ prompt: 'Which observation settles the debate?', options: [
                { text: 'Deflection by electric and magnetic fields — EM waves are electrically neutral and can\'t be bent by a field; only a stream of charged particles (electrons, negative) responds, curving toward the positive plate. Straight-line travel and fluorescence are shared with light, but field deflection is exclusively particle behaviour.', outcome: 'Same shadow-casting, opposite physics: the beam\'s response to fields was the decisive evidence that cathode rays are charged matter, not radiation.' },
                { text: 'The straight-line travel and sharp shadows — only waves can do that, so it must be light-like.', outcome: 'Particles moving fast also travel straight and cast shadows; the test that separates waves from particles is field deflection, which this beam fails the \'wave\' prediction on.', reveals: 'straight-line-means-wave' },
                { text: 'Neither — you can\'t tell particles from waves in a school lab at all.', outcome: 'A magnet and a charged plate are exactly the apparatus that settled it historically; school-lab deflection reproduces Thomson\'s evidence directly.', reveals: 'particle-vs-wave-untestable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'Protons, neutrons, electron clouds, orbitals — the atom stopped being a billiard ball the day you finished this.',
            decisions: [{ prompt: 'What comes next? Structure of Atom · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Structure of Atom · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_007', difficulty: 'standard',
          question: 'The photoelectric effect is the phenomenon where electrons are ejected from.',
          hint: 'If stuck, revisit c11_chem_cbse_02_006 (Planck\'s Quantum Theory) and practice E = hν and.',
          misconception: 'Students often write the photoelectric equation as K_max = h(ν − ν₀) and then incorrectly substitute ν and ν₀ in Hz but.',
          parts: [
                { id: 'a', prompt: 'The stopping potential for a metal is measured as 1.2 V for incident light of frequency 8.0 × 10¹⁴ Hz, and 2.8 V for frequency 1.2 × 10¹⁵ Hz.', answer: 'Step 1: eV_s = hν − W₀ (Einstein\'s equation with stopping potential V_s)',
                  options: ['Step 1: eV_s = hν − W₀ (Einstein\'s equation with stopping potential V_s)', 'frequency difference', 'energy difference'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_006 (Planck\'s Quantum Theory) and practice E = hν and E = hc/λ.',
                  misconception: 'Students often write the photoelectric equation as K_max = h(ν − ν₀) and then incorrectly substitute ν and ν₀ in Hz but forget to multiply.' }
          ],
            remediations: { 'students-often-write-the-photoelectric': { steps: ['If a student makes this error: (1) Have them write the dimensional analysis: [h] = J s, [ν] = s⁻¹ → [hν] = J.', '(2) Give a numerical drill: "Calculate h(ν − ν₀) for ν = 7×10¹⁴ Hz, ν₀ = 4×10¹⁴ Hz, h = 6.6×10⁻³⁴ J s" — force explicit.', '(3) Ask: "If ν = ν₀, what is K_max?', 'Does your formula give zero?" This exposes the missing h factor.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the photoelectric equation as K_max = h(ν − ν₀) and then incorrectly substitute ν and ν₀ in Hz but.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "If the frequency of incident light is doubled, the maximum kinetic energy of photoelectrons also doubles." Is this statement always true, sometimes.', answer: 'Sometimes true',
                  options: ['Sometimes true', 'always true', 'frequency difference', 'energy difference'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_006 (Planck\'s Quantum Theory) and practice E = hν and E = hc/λ.',
                  misconception: 'Students often write the photoelectric equation as K_max = h(ν − ν₀) and then incorrectly substitute ν and ν₀ in Hz but forget to multiply.' },
                { id: 'b', prompt: 'Design a thought experiment to prove that the photoelectric effect is instantaneous (no time lag) even for extremely low intensity light, and explain what this.', answer: 'Place a freshly cleaned potassium plate (ν₀ = 5.0×10¹⁴ Hz) in vacuum',
                  options: ['Place a freshly cleaned potassium plate (ν₀ = 5.0×10¹⁴ Hz) in vacuum', 'measure current after 1 hour', 'eventually some electrons appear', 'instantaneous per photon'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_006 (Planck\'s Quantum Theory) and practice E = hν and E = hc/λ.',
                  misconception: 'Students often write the photoelectric equation as K_max = h(ν − ν₀) and then incorrectly substitute ν and ν₀ in Hz but forget to multiply.' }
          ],
            remediations: { 'students-often-write-the-photoelectric': { steps: ['If a student makes this error: (1) Have them write the dimensional analysis: [h] = J s, [ν] = s⁻¹ → [hν] = J.', '(2) Give a numerical drill: "Calculate h(ν − ν₀) for ν = 7×10¹⁴ Hz, ν₀ = 4×10¹⁴ Hz, h = 6.6×10⁻³⁴ J s" — force explicit.', '(3) Ask: "If ν = ν₀, what is K_max?', 'Does your formula give zero?" This exposes the missing h factor.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_008', difficulty: 'standard',
          question: 'Bohr\'s model of the hydrogen atom postulates that the electron moves.',
          hint: 'If stuck, review Rutherford\'s alpha scattering experiment (c11_chem_cbse_02_003) and.',
          misconception: 'Students treat Bohr orbits as physical trajectories the electron "follows" like a planet, and think the electron moves.',
          parts: [
                { id: 'a', prompt: 'State Bohr\'s quantization condition for angular momentum and write the formula for the radius of the nth orbit in hydrogen atom.', answer: 'Bohr\'s quantization condition: m_e v r = n h/2π (n = 1, 2, 3...)',
                  options: ['Bohr\'s quantization condition: m_e v r = n h/2π (n = 1, 2, 3...)', 'n=2 orbit holds 8 electrons'],
                  hint: 'If stuck, review Rutherford\'s alpha scattering experiment (c11_chem_cbse_02_003) and Planck\'s.',
                  misconception: 'Students treat Bohr orbits as physical trajectories the electron "follows" like a planet, and think the electron moves classically between.' },
                { id: 'b', prompt: 'Calculate the wavelength (in nm) of the photon emitted when an electron in He⁺ ion transitions from n = 4 to n = 2.', answer: 'Step 1: Energy for hydrogen-like ion E_n = -Z²R_H/n²',
                  options: ['Step 1: Energy for hydrogen-like ion E_n = -Z²R_H/n²', 'n=2 orbit holds 8 electrons'],
                  hint: 'If stuck, review Rutherford\'s alpha scattering experiment (c11_chem_cbse_02_003) and Planck\'s.',
                  misconception: 'Students treat Bohr orbits as physical trajectories the electron "follows" like a planet, and think the electron moves classically between.' },
                { id: 'c', prompt: 'The Balmer series lies in the visible region, while Lyman is UV and Paschen is IR.', answer: 'Energy levels E_n = -R_H/n² get closer as n increases (|E_n| ∝ 1/n²)',
                  options: ['Energy levels E_n = -R_H/n² get closer as n increases (|E_n| ∝ 1/n²)', 'higher n means higher energy', 'n=2 orbit holds 8 electrons'],
                  hint: 'If stuck, review Rutherford\'s alpha scattering experiment (c11_chem_cbse_02_003) and Planck\'s.',
                  misconception: 'Students treat Bohr orbits as physical trajectories the electron "follows" like a planet, and think the electron moves classically between.' }
          ],
            remediations: { 'students-treat-bohr-orbits-as': { steps: ['Revisit Rutherford\'s model (c11_chem_cbse_02_003) and its instability problem — calculate the classical radiation.', 'Derive r_n and E_n step-by-step from Coulomb force = centripetal force + quantized angular momentum.', 'Do not memorize — derive every time until the n² and 1/n² dependencies are intuitive.', 'Draw the energy level diagram with n=1 to ∞, label Lyman/Balmer/Paschen transitions, and compute 3 wavelengths for each.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_009', difficulty: 'standard',
          question: 'Bohr\'s model of the hydrogen atom successfully explains the stability and line.',
          hint: 'Review node c11_chem_cbse_02_008 (Bohr\'s Model of Hydrogen Atom) focusing on postulates.',
          misconception: 'Students often think Bohr\'s model fails only because "it doesn\'t work for atoms with more than one electron." The.',
          parts: [
                { id: 'a', prompt: 'A high-resolution spectrograph reveals that the H-alpha line (Balmer series, n=3 to n=2) is actually a doublet with a separation of about 0.14 nm.', answer: 'Step 1: Bohr energy for n=2: E₂ = -2.18×10⁻¹⁸/4 = -5.45×10⁻¹⁹ J',
                  options: ['Step 1: Bohr energy for n=2: E₂ = -2.18×10⁻¹⁸/4 = -5.45×10⁻¹⁹ J', 'it doesn\'t work for atoms with more than one electron', 'Bohr\'s model fails only'],
                  hint: 'Review node c11_chem_cbse_02_008 (Bohr\'s Model of Hydrogen Atom) focusing on postulates iii and.',
                  misconception: 'Students often think Bohr\'s model fails only because "it doesn\'t work for atoms with more than one electron." The specific error is not.' },
                { id: 'b', prompt: 'Compare the predictions of Bohr\'s model and the quantum mechanical model for the ground state of hydrogen.', answer: 'electron location, (',
                  options: ['electron location, (', 'it doesn\'t work for atoms with more than one electron', 'Bohr\'s model fails only'],
                  hint: 'Review node c11_chem_cbse_02_008 (Bohr\'s Model of Hydrogen Atom) focusing on postulates iii and.',
                  misconception: 'Students often think Bohr\'s model fails only because "it doesn\'t work for atoms with more than one electron." The specific error is not.' }
          ],
            remediations: { 'bohr-s-model-fails-only': { steps: ['If a student cannot distinguish between the model\'s mathematical success for hydrogen-like ions and its physical.', '(2) Ask: "If the electron is in a single circular orbit at n=3, how can it emit two different photons when falling.', '(4) Then introduce electron spin as the missing quantum number.', '(5) Finally, use the uncertainty principle calculation from Diagnostic Question 6 to show the orbit concept itself.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_010', difficulty: 'standard',
          question: 'de Broglie\'s hypothesis states that all matter exhibits wave-particle duality.',
          hint: 'Review c11_chem_cbse_02_007 (Photoelectric Effect) to see how Einstein used p = h/λ for.',
          misconception: 'Students think de Broglie wavelength λ = h/mv applies only when the particle is "moving fast" or "has high kinetic.',
          parts: [
                { id: 'a', prompt: 'Why does a baseball (mass 0.15 kg, speed 40 m/s) not exhibit observable diffraction while an electron (mass 9.11 × 10⁻³¹ kg, speed 10⁶ m/s) does?', answer: 'Baseball: λ = 6.626×10⁻³⁴/(0.15×40) ≈ 1.1×10⁻³⁴ m',
                  options: ['Baseball: λ = 6.626×10⁻³⁴/(0.15×40) ≈ 1.1×10⁻³⁴ m', 'moving fast', 'has high kinetic energy'],
                  hint: 'Review c11_chem_cbse_02_007 (Photoelectric Effect) to see how Einstein used p = h/λ for photons.',
                  misconception: 'Students think de Broglie wavelength λ = h/mv applies only when the particle is "moving fast" or "has high kinetic energy".' },
                { id: 'b', prompt: 'An electron is accelerated through a potential difference of 100 V. Calculate its de Broglie wavelength. (e = 1.602 × 10⁻¹⁹ C, mₑ = 9.11 × 10⁻³¹ kg)', answer: 'Step 1: Kinetic energy gained = eV = 1.602×10⁻¹⁹ × 100 = 1.602×10⁻¹⁷ J',
                  options: ['Step 1: Kinetic energy gained = eV = 1.602×10⁻¹⁹ × 100 = 1.602×10⁻¹⁷ J', 'moving fast', 'has high kinetic energy'],
                  hint: 'Review c11_chem_cbse_02_007 (Photoelectric Effect) to see how Einstein used p = h/λ for photons.',
                  misconception: 'Students think de Broglie wavelength λ = h/mv applies only when the particle is "moving fast" or "has high kinetic energy".' },
                { id: 'c', prompt: 'Derive Bohr\'s angular momentum quantisation condition (mvr = nh/2π) from de Broglie\'s standing wave requirement for an electron in a circular orbit.', answer: 'For a standing wave, circumference = nλ → 2πr = n(h/mv) → mvr = nh/2π',
                  options: ['For a standing wave, circumference = nλ → 2πr = n(h/mv) → mvr = nh/2π', 'moving fast', 'has high kinetic energy'],
                  hint: 'Review c11_chem_cbse_02_007 (Photoelectric Effect) to see how Einstein used p = h/λ for photons.',
                  misconception: 'Students think de Broglie wavelength λ = h/mv applies only when the particle is "moving fast" or "has high kinetic energy".' }
          ],
            remediations: { 'de-broglie-wavelength-h-mv': { steps: ['Calculate λ for an electron at 10⁶ m/s (thermal speed at room temp) → ~7 Å, easily detectable.', 'Calculate λ for a virus (mass 10⁻¹⁸ kg) at 1 mm/s → ~10⁻¹⁹ m, still undetectable.', 'Emphasise it\'s the MASS, not speed, that dominates.', 'Show λ ∝ 1/m at constant KE: heavier particles always have shorter λ regardless of speed.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_011', difficulty: 'standard',
          question: 'Heisenberg\'s Uncertainty Principle states that it is fundamentally impossible.',
          hint: 'If stuck, review c11_chem_cbse_02_010 — specifically the wave packet concept.',
          misconception: 'Students think the uncertainty principle is about measurement error or instrument limitations — "if we had better.',
          parts: [
                { id: 'a', prompt: 'An electron is confined within a region of 100 pm (1 × 10⁻¹⁰ m). Calculate the minimum uncertainty in its velocity.', answer: 'Step 1: Δx = 1 × 10⁻¹⁰ m (given)',
                  options: ['Step 1: Δx = 1 × 10⁻¹⁰ m (given)', 'if we had better microscopes, we could know both'],
                  hint: 'If stuck, review c11_chem_cbse_02_010 — specifically the wave packet concept: superposition.',
                  misconception: 'Students think the uncertainty principle is about measurement error or instrument limitations — "if we had better microscopes, we could.' },
                { id: 'b', prompt: 'Compare the uncertainty in velocity for an electron (mass 9.11 × 10⁻³¹ kg) and a cricket ball (mass 0.15 kg) when both are localised to Δx = 1 nm.', answer: 'For electron: Δv ≥ 5.79 × 10⁴ m s⁻¹ (huge, comparable to orbital speeds)',
                  options: ['For electron: Δv ≥ 5.79 × 10⁴ m s⁻¹ (huge, comparable to orbital speeds)', 'if we had better microscopes, we could know both'],
                  hint: 'If stuck, review c11_chem_cbse_02_010 — specifically the wave packet concept: superposition.',
                  misconception: 'Students think the uncertainty principle is about measurement error or instrument limitations — "if we had better microscopes, we could.' }
          ],
            remediations: { 'the-uncertainty-principle-is-about': { steps: ['Revisit de Broglie hypothesis (c11_chem_cbse_02_010) — a particle with definite momentum is a pure sine wave extending.', 'Visualise wave packets — superposition of waves creates localisation (small Δx) but spreads momentum values (large Δp).', 'Do the "single-slit diffraction" thought experiment: narrower slit (smaller Δx) → wider diffraction pattern (larger.', 'Practice numerical problems using the exact formula Δx Δp ≥ h/4π, not approximations.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_012', difficulty: 'standard',
          question: 'An atomic orbital is a three-dimensional region of space around the nucleus.',
          hint: 'If stuck, review the derivation of de Broglie wavelength for an electron in Bohr\'s orbit.',
          misconception: 'Students confuse "orbital" with "orbit" and think electrons move in defined paths within the orbital boundary surface.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An atomic orbital is a three-dimensional region of space around the nucleus where the',
                  options: ['An atomic orbital is a three-dimensional region of space around the nucleus where the', 'The electron is a fundamental subatomic particle carrying a unit negative charge (-1.602', 'The charge-to-mass ratio (e/m) of an electron is the quotient of the electron\'s', 'Rutherford\'s nuclear model of atom proposes that an atom consists of a tiny, dense,'],
                  hint: 'If stuck, review the derivation of de Broglie wavelength for an electron in Bohr\'s orbit.',
                  misconception: 'Students confuse "orbital" with "orbit" and think electrons move in defined paths within the orbital boundary surface.' }
          ],
            remediations: { 'students-confuse-orbital-with-orbit': { steps: ['Revisit Heisenberg uncertainty principle (c11_chem_cbse_02_011)—do Problem 2.15 from NCERT to see Δv for Δx = 0.1 Å.', 'Draw the quantum number tree for n=1 to 4 on paper: n → l values → mₗ values → count orbitals.', 'Plot radial probability distributions for 1s, 2s, 2p using the formula P(r) = 4πr²|R(r)|² (qualitative sketch).', 'Make a table of (n+l) for all orbitals up to n=7; sort by (n+l), then by n.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
