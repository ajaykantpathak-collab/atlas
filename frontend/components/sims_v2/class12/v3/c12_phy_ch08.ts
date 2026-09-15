import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch08 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch08: SimDef = {
    id: 'v3_c12_phy_ch08',
    title: 'Electromagnetic Waves',
    subtitle: 'No charges crossed — the needle still moved',
    classLevel: 12, subject: 'physics', topic: 'Electromagnetic Waves',
    chapters: ['c12_phy_ch08'],
    nodeIds: ['c12_phy_cbse_08_001', 'c12_phy_cbse_08_002', 'c12_phy_cbse_08_003', 'c12_phy_cbse_08_004', 'c12_phy_cbse_08_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field theorist', intro: 'Current flows to the capacitor plates and stops — but the magnetic field doesn\'t notice the gap.', goal: 'Understand displacement current — the missing term that made Ampere\'s law consistent.' },
    discovery: {
        question: 'Inside a charging capacitor, no charge crosses the gap — yet a compass needle between the plates still deflects. Where is the \'current\'?',
        options: ['In the changing field — a time-varying electric flux acts exactly like a current, i_d = ε₀ dΦE/dt, and produces real magnetism', 'Charges tunnel across', 'The compass is wrong', 'Stray wire field'],
        answer: 'In the changing field — a time-varying electric flux acts exactly like a current, i_d = ε₀ dΦE/dt, and produces real magnetism',
        hook: 'Ampere\'s law gave two answers for one point until Maxwell fixed it — a loop through the wire saw current, a loop through the gap saw none, yet B must be unique. Displacement current isn\'t a trick; the field it makes deflects needles identically.',
    },
    teaching: [
        { title: 'Displacement Current: Maxwell\'s Correction', text: 'Displacement current is a term introduced by Maxwell to generalize Ampere\'s circuital law, defined as the product of vacuum permittivity (ε₀) and the rate of change of electric flux through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_08_001', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Repair Ampere\'s law yourself: find the contradiction between two surfaces on one loop, compute a displacement current from a sinusoidal field, and defend why i_d is as real as conduction current.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_001', title: 'Displacement Current: Maxwell\'s Correction',
          scaffold: { problem: 'A parallel plate capacitor with circular plates of radius 12 cm is being charged by a constant current of 0.15 A.',
            steps: [
            { text: 'Identify given: \\( i_c = 0.15 \\, \\text{A} \\), plate radius \\( r = 0.12 \\, \\text{m} \\), plate area \\( A = \\pi r^2 = \\pi.' },
            { text: 'For a parallel plate capacitor, \\( C = \\varepsilon_0 A / d \\). But \\( d \\) is not given!' },
            { text: 'For (a), we need \\( dV/dt \\). From \\( i_c = C \\, dV/dt \\) and \\( C = \\varepsilon_0 A / d \\), we have \\( dV/dt = i_c.' },
            { text: '(b) Displacement current \\( i_d = \\varepsilon_0 d\\Phi_E/dt = \\varepsilon_0 A (dE/dt) \\).' },
            { text: '(c) Kirchhoff\'s junction rule (sum of currents at a junction = 0) holds if we include displacement current.', faded: true, blankAnswer: '(a) \\( dV/dt = 1.87 \\times 10^{10} \\, \\text{V/s} \\); (b) \\.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_08_002', title: 'Maxwell\'s Equations: Qualitative Understanding',
          caseStudy: { intro: 'Begin with a real-world observation: a mobile phone receives signals inside a building where no wires connect it to the tower.',
            decisions: [{ prompt: 'State the four Maxwell\'s equations in vacuum in integral form.', options: [
                { text: 'The four equations: (1) ∮ **E**·d**A** = Q/ε₀, (2) ∮ **B**·d**A** = 0, (3) ∮ **E**·d**l**', outcome: 'The four equations: (1) ∮ **E**·d**A** = Q/ε₀, (2) ∮ **B**·d**A** = 0, (3) ∮ **E**·d**l**.' },
                { text: 'magnetic charges exist, confusing analogy with electric charges', outcome: 'Not quite — Students often think Maxwell\'s equations are only four separate laws for static cases (Coulomb\'s.', reveals: 'maxwell-s-equations-are-only' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_003', title: 'Electromagnetic Spectrum: Regions and Wavelengths',
          scaffold: { problem: 'A 5G mobile network operates at 28 GHz. Calculate: (a) wavelength in mm, (b) photon energy in eV, (c) how many such photons per second are.',
            steps: [
            { text: 'Identify given: ν = 28 GHz = 28 × 10⁹ Hz, P = 1 W = 1 J/s, c = 3 × 10⁸ m/s, h = 6.63 × 10⁻³⁴ J·s, 1 eV = 1.6 × 10⁻¹⁹ J' },
            { text: '(a) λ = c/ν = (3 × 10⁸) / (28 × 10⁹) = 0.0107 m = 10.7 mm. Unit check: m/s ÷ 1/s = m ✓' },
            { text: '(b) E = hν = (6.63 × 10⁻³⁴)(28 × 10⁹) = 1.856 × 10⁻²³ J. Convert to eV: (1.856 × 10⁻²³)/(1.6 × 10⁻¹⁹) = 1.16 × 10⁻⁴ eV' },
            { text: '(c) Number of photons N = Power / Energy per photon = 1 J/s ÷ 1.856 × 10⁻²³ J = 5.39 × 10²² photons/s' },
            { text: 'Verify reasonableness: 28 GHz is in microwave band (λ ~ cm), photon energy ~10⁻⁴ eV is non-ionising, 10²² photons/s for.', faded: true, blankAnswer: '(a) 10.7 mm, (b) 1.16 × 10⁻⁴ eV, (c) 5.39 × 10²² photons/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_004', title: 'Properties of Electromagnetic Waves',
          scaffold: { problem: 'A plane electromagnetic wave of frequency 50.0 MHz travels in vacuum along the +x direction.',
            steps: [
            { text: 'Identify given: \\(f = 50.0 \\times 10^6 \\text{ Hz}\\), \\(\\mathbf{E} = 6.0 \\hat{\\mathbf{j}} \\text{ V/m}\\) (amplitude \\(E_0.' },
            { text: 'Use \\(c = 3.00 \\times 10^8 \\text{ m/s}\\). Direction: \\(\\mathbf{E} \\times \\mathbf{B}\\) must point along \\(+x\\).' },
            { text: 'Compute \\(B_0 = E_0 / c = 6.0 / (3.00 \\times 10^8) = 2.0 \\times 10^{-8} \\text{ T}\\).' },
            { text: 'Find \\(\\omega = 2\\pi f = 2\\pi \\times 50.0 \\times 10^6 = 3.14 \\times 10^8 \\text{ rad/s}\\).' },
            { text: 'Write \\(\\mathbf{E}(x,t) = 6.0 \\sin(1.05 x - 3.14 \\times 10^8 t) \\hat{\\mathbf{j}} \\text{ V/m}\\).' },
            { text: 'Average intensity \\(I = \\frac{1}{2}\\varepsilon_0 c E_0^2 = \\frac{1}{2} \\times 8.85 \\times 10^{-12} \\times 3.00 \\times.', faded: true, blankAnswer: '(a) \\(\\mathbf{B} = 2.0 \\times 10^{-8} \\hat{\\mathbf{k}}.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_08_005', title: 'Applications of EM Waves: Radio, Microwaves, X-Rays',
          scaffold: { problem: 'A cellular phone operates at 900 MHz (GSM band). (a) Calculate the wavelength of these radio waves in air.',
            steps: [
            { text: 'Identify given: ν = 900 MHz = 9×10⁸ Hz, P = 1 W. Find λ, photons/s, compare E_photon vs k_BT.' },
            { text: 'Use c = νλ → λ = c/ν = (3×10⁸ m/s) / (9×10⁸ Hz) = 0.333 m = 33.3 cm.' },
            { text: 'Photon energy E = hν = (6.63×10⁻³⁴)(9×10⁸) = 5.967×10⁻²⁵ J.' },
            { text: 'Photons per second = Power / Energy per photon = 1 J/s / 5.967×10⁻²⁵ J = 1.676×10²⁴ photons/s.' },
            { text: 'Thermal energy k_BT = (1.38×10⁻²³)(300) = 4.14×10⁻²¹ J. Ratio E_photon / k_BT = 1.44×10⁻⁴ << 1.' },
            { text: 'Since photon energy ≪ thermal energy, classical wave description suffices; quantum effects negligible.', faded: true, blankAnswer: '(a) λ = 33.3 cm; (b) 1.68×10²⁴ photons/s; (c) E_photon.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_08_001', title: 'A real-world call',
          caseStudy: { intro: 'The same electromagnetic physics that powers MRI machines also powers missile guidance. A physics graduate can build either.',
            decisions: [{ prompt: 'Does the scientist share responsibility for the use?', options: [
                { text: 'No — knowledge is neutral, choices belong to users', outcome: 'The purist position; historically incomplete — the physicists who built the first atomic bomb disagreed with it afterward.' },
                { text: 'Yes — you can\'t un-know what your work enables', outcome: 'The responsibility position; but almost no physics is use-specific — the same math does both.' },
                { text: 'Share responsibility for foreseeable misuse', outcome: 'Most ethics codes\' actual answer — you\'re accountable for what you could reasonably predict, not for every possible use.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab partner insists there\'s no magnetic field between a charging capacitor\'s plates \'because no conduction current flows through the gap — Ampere\'s law gives zero.\'',
            decisions: [{ prompt: 'What term of the Ampere-Maxwell law answers him?', options: [
                { text: 'The displacement current, ε₀dΦ_E/dt — the growing electric flux between the plates plays the current\'s role and produces the same B the wire does; without that term Ampere\'s law contradicts itself depending on which surface you choose.', outcome: 'The chapter\'s fix: the same loop bounded by a surface through the wire and one through the gap must give one answer — the displacement term is what makes that possible, and it\'s the symmetry that lets EM waves exist.' },
                { text: 'He\'s right — no charge crosses the gap, so no B can exist there.', outcome: 'That picks one surface and ignores the paradox it creates — the wire\'s surface gives nonzero B for the identical loop; Maxwell\'s term exists because the answer can\'t depend on the surface you drew.', reveals: 'no-charge-no-field' },
                { text: 'There\'s a small leakage current through the dielectric — that\'s the real source.', outcome: 'An ideal capacitor\'s gap carries no conduction current at all, and the field still exists — the term is a changing electric flux, not a leak; inventing one misses the mechanism.', reveals: 'leakage-explains-gap' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_08_005', title: 'You made it',
          caseStudy: { intro: 'You can now see Maxwell\'s fix — the symmetry that says changing E makes B, and the gap conducts \'current\' without a single charge crossing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_001', difficulty: 'standard',
          question: 'Displacement current is a term introduced by Maxwell to generalize Ampere\'s.',
          hint: 'Review Class 10 magnetic field of a straight wire (c10_phy_cbse_02_002) and Class 12.',
          misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no.',
          parts: [
                { id: 'a', prompt: 'In a charging capacitor, the conduction current \\( i_c \\) in the connecting wires is 2.0 A.', answer: 'The magnetic fields at P and M are equal in magnitude',
                  options: ['The magnetic fields at P and M are equal in magnitude', 'B is zero at M', 'not real', 'fictitious'],
                  hint: 'Review Class 10 magnetic field of a straight wire (c10_phy_cbse_02_002) and Class 12 Gauss\'s law.',
                  misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no actual charges.' }
          ],
            remediations: { 'displacement-current-is-a-fictitious': { steps: ['Revisit Class 10 electromagnetic induction (c10_phy_cbse_02_008): changing magnetic flux → electric field.', 'Perform the capacitor thought experiment: draw two surfaces for the same Amperian loop, compute B from each using.', 'Derive \\( i_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\) step-by-step from Gauss\'s law \\( \\Phi_E = Q/\\varepsilon_0 \\) and \\.', 'Redo Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Displacement current is just a mathematical trick; it doesn\'t produce a real magnetic field because no charges are moving." Evaluate this.', answer: 'The statement is false',
                  options: ['The statement is false', 'fictitious', 'no actual charges move', 'Between capacitor plates, \\( i_d = 0 \\)'],
                  hint: 'Review Class 10 magnetic field of a straight wire (c10_phy_cbse_02_002) and Class 12 Gauss\'s law.',
                  misconception: 'Students believe displacement current is a "fictitious" current that does not produce a real magnetic field because "no actual charges.' }
          ],
            remediations: { 'displacement-current-is-a-fictitious': { steps: ['Revisit Class 10 electromagnetic induction (c10_phy_cbse_02_008): changing magnetic flux → electric field.', 'Perform the capacitor thought experiment: draw two surfaces for the same Amperian loop, compute B from each using.', 'Derive \\( i_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\) step-by-step from Gauss\'s law \\( \\Phi_E = Q/\\varepsilon_0 \\) and \\.', 'Redo Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_002', difficulty: 'standard',
          question: 'Maxwell\'s equations in vacuum are a set of four fundamental equations that.',
          hint: 'If stuck, re-read NCERT Section 8.2 (Displacement Current) and study Figures 8.1 and 8.2.',
          misconception: 'Students often think Maxwell\'s equations are only four separate laws for static cases (Coulomb\'s law, no magnetic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how',
                  options: ['Maxwell\'s equations in vacuum are a set of four fundamental equations that describe how', 'Displacement current is a term introduced by Maxwell to generalize Ampere\'s circuital', 'The electromagnetic spectrum is the continuous distribution of electromagnetic waves', 'An electromagnetic wave is a self-propagating transverse wave consisting of mutually'],
                  hint: 'If stuck, re-read NCERT Section 8.2 (Displacement Current) and study Figures 8.1 and 8.2 carefully.',
                  misconception: 'Students often think Maxwell\'s equations are only four separate laws for static cases (Coulomb\'s law, no magnetic monopoles, Faraday\'s law.' }
          ],
            remediations: { 'maxwell-s-equations-are-only': { steps: ['If the student cannot articulate the symmetry between Faraday\'s law and the Ampere-Maxwell law, have them revisit.', 'Then, explicitly write both dynamic equations side by side: ∮ **E**·d**l** = -dΦ_B/dt and ∮ **B**·d**l** = μ₀ε₀ dΦ_E/dt.', 'Ask: "What happens if E changes?', 'What happens if that B changes?'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_003', difficulty: 'standard',
          question: 'The electromagnetic spectrum is the continuous distribution of electromagnetic.',
          hint: 'If stuck on unit conversions, revisit c10_math_cbse_01_011 (decimal expansions) and.',
          misconception: 'Students believe "higher frequency means higher speed" for EM waves in vacuum.',
          parts: [
                { id: 'a', prompt: 'A microwave oven operates at 2.45 GHz. Calculate: (a) the wavelength in cm, (b) the photon energy in eV.', answer: 'the wavelength in cm, (',
                  options: ['the wavelength in cm, (', 'higher frequency means higher speed', 'Gamma rays travel faster than radio waves', 'frequency doesn\'t change in medium'],
                  hint: 'If stuck on unit conversions, revisit c10_math_cbse_01_011 (decimal expansions) and practice.',
                  misconception: 'Students believe "higher frequency means higher speed" for EM waves in vacuum.' }
          ],
            remediations: { 'higher-frequency-means-higher-speed': { steps: ['Revisit c11_phy_cbse_14_002 (wave speed formula) and c12_phy_cbse_08_002 (Maxwell\'s equations predicting constant c).', 'Perform a thought experiment: "If gamma rays travelled faster, light from distant stars would arrive colour-separated.', 'Practice 5 conversion problems: given ν, find λ; given λ, find E in eV.', 'Re-diagnostic: "Calculate speed of 100 MHz radio wave and 10¹⁹ Hz gamma ray in vacuum.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_004', difficulty: 'standard',
          question: 'An electromagnetic wave is a self-propagating transverse wave consisting.',
          hint: 'If stuck on the wave derivation, review c12_phy_cbse_08_002 (Maxwell’s Equations) and.',
          misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit).',
          parts: [
                { id: 'a', prompt: 'State the mutual orientation of the electric field **E**, magnetic field **B**, and propagation vector **k** in a plane electromagnetic wave travelling.', answer: '**E**, **B**, and **k** are mutually perpendicular (orthogonal triad)',
                  options: ['**E**, **B**, and **k** are mutually perpendicular (orthogonal triad)', 'out of phase'],
                  hint: 'If stuck on the wave derivation, review c12_phy_cbse_08_002 (Maxwell’s Equations) and.',
                  misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit) because they see.' },
                { id: 'b', prompt: 'A plane EM wave in vacuum has electric field amplitude \\(E_0 = 120 \\text{ N/C}\\).', answer: 'From Maxwell’s equations, the wave speed \\(c = E_0/B_0\\)',
                  options: ['From Maxwell’s equations, the wave speed \\(c = E_0/B_0\\)', 'they are just proportional', 'out of phase'],
                  hint: 'If stuck on the wave derivation, review c12_phy_cbse_08_002 (Maxwell’s Equations) and.',
                  misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit) because they see.' },
                { id: 'c', prompt: 'A radio station broadcasts at \\(f = 98.3 \\text{ MHz}\\) with an average intensity \\(I = 2.5 \\times 10^{-6} \\text{ W/m}^2\\) at a certain distance.', answer: 'the wavelength \\(\\lambda\\), (',
                  options: ['the wavelength \\(\\lambda\\), (', 'out of phase'],
                  hint: 'If stuck on the wave derivation, review c12_phy_cbse_08_002 (Maxwell’s Equations) and.',
                  misconception: 'Students often think the electric and magnetic fields in an EM wave are “out of phase” (like in a driven RLC circuit) because they see.' }
          ],
            remediations: { 'the-electric-and-magnetic-fields': { steps: ['Revisit c11_phy_cbse_14_001 (Transverse vs Longitudinal Waves) to reinforce perpendicular oscillations.', 'Re-derive the plane wave solution from Maxwell’s equations in vacuum (c12_phy_cbse_08_002) step by step: start with.', 'Substitute sinusoidal trial functions to get \\(k E_0 = \\omega B_0\\) and \\(k B_0 = \\mu_0\\varepsilon_0 \\omega E_0\\) →.', 'Redo Diagnostic Q2 and Q3 with this derivation fresh in mind.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_08_005', difficulty: 'standard',
          question: 'Electromagnetic waves are self-propagating oscillations of mutually.',
          hint: 'If stuck on wavelength/frequency conversion, review c11_phy_cbse_14_002 (v = νλ).',
          misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV >.',
          parts: [
                { id: 'a', prompt: 'State the frequency range and production mechanism for radio waves as per NCERT Class 12.', answer: 'Radio waves: frequency range 500 kHz to 1000 MHz',
                  options: ['Radio waves: frequency range 500 kHz to 1000 MHz', 'higher frequency always means more dangerous'],
                  hint: 'If stuck on wavelength/frequency conversion, review c11_phy_cbse_14_002 (v = νλ).',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' },
                { id: 'b', prompt: 'A microwave oven operates at 2.45 GHz. Explain why this specific frequency is chosen, referencing the interaction with water molecules.', answer: '2.45 GHz matches the resonant rotational transition frequency of water molecules',
                  options: ['2.45 GHz matches the resonant rotational transition frequency of water molecules', 'microwaves have more energy', 'higher frequency always means more dangerous'],
                  hint: 'If stuck on wavelength/frequency conversion, review c11_phy_cbse_14_002 (v = νλ).',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' },
                { id: 'c', prompt: 'An X-ray tube operates at 50 kV. Calculate the minimum wavelength of X-rays produced (in nm).', answer: '**Step 1:** Electron kinetic energy = eV = (1.6×10⁻¹⁹ C)(50×10³ V) = 8.0×10⁻¹⁵ J',
                  options: ['**Step 1:** Electron kinetic energy = eV = (1.6×10⁻¹⁹ C)(50×10³ V) = 8.0×10⁻¹⁵ J', 'higher frequency always means more dangerous'],
                  hint: 'If stuck on wavelength/frequency conversion, review c11_phy_cbse_14_002 (v = νλ).',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' },
                { id: 'd', prompt: 'Compare the penetration ability of radio waves (λ = 10 m), microwaves (λ = 3 cm), and X-rays (λ = 0.1 nm) through: (a) a brick wall, (b) human soft tissue, (c).', answer: 'a brick wall, (',
                  options: ['a brick wall, (', 'X-rays pass through everything', 'penetrating power', 'higher frequency always means more dangerous'],
                  hint: 'If stuck on wavelength/frequency conversion, review c11_phy_cbse_14_002 (v = νλ).',
                  misconception: 'Students believe "higher frequency always means more dangerous" and incorrectly rank hazards as: gamma > X-ray > UV > microwave > radio.' }
          ],
            remediations: { 'higher-frequency-always-means-more': { steps: ['Revisit c12_phy_cbse_08_003 (EM Spectrum) — memorize Table 8.1 wavelength ranges, production, detection for radio.', 'Revisit c12_phy_cbse_08_004 (Properties) — review E₀/B₀ = c, energy density u = ½ε₀E² + ½B²/μ₀, and that all EM waves.', 'Do the "microwave vs radio photon energy" calculation: E_radio (100 MHz) = 4.1×10⁻⁷ eV vs E_microwave (2.45 GHz).', 'Plot on log scale to visualize the ionization threshold (~10 eV).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
