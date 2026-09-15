import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch02_p1: SimDef = {
    id: 'v3_c11_chem_ch02_p1',
    title: 'Structure of Atom · Part 1/3',
    subtitle: 'See how crossed fields proved cathode rays are particles and pinned down e/m.',
    classLevel: 11, subject: 'chemistry', topic: 'Structure of Atom · Part 1/3',
    chapters: ['c11_chem_ch02'],
    nodeIds: ['c11_chem_cbse_02_001', 'c11_chem_cbse_02_002', 'c11_chem_cbse_02_003', 'c11_chem_cbse_02_004', 'c11_chem_cbse_02_005', 'c11_chem_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physicist reproducing Thomson\'s cathode-ray measurements', intro: 'A glowing beam in a vacuum tube — light or matter? Your fields will decide.', goal: 'Explain why field deflection proves particle nature and how crossed fields yield the charge-to-mass ratio.' },
    discovery: {
        question: 'Atoms are mostly empty space — so why can\'t you walk through a wall?',
        options: ['Electron clouds repel each other electromagnetically', 'Nuclei collide head-on', 'Atoms are actually solid', 'Walls are quantum-locked'],
        answer: 'Electron clouds repel each other electromagnetically',
        hook: 'Solidity is an illusion of repulsion. Rutherford\'s gold foil proved it a century ago.',
    },
    teaching: [
        { title: 'Subatomic Particles: Discovery of Electron', text: 'The electron is a fundamental subatomic particle carrying a unit negative charge (-1.602 × 10⁻¹⁹ C) and negligible mass (9.109 × 10⁻³¹ kg), discovered through cathode ray experiments where streams.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_02_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Place 4 electrons in the atom — which shell fills first?',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_001', title: 'Subatomic Particles: Discovery of Electron',
          scaffold: { problem: 'In a cathode ray tube, electrons are accelerated through a potential difference of 2000 V.',
            steps: [
            { text: 'Identify knowns: V = 2000 V, B = 0.02 T, e/m = 1.76 × 10¹¹ C/kg. The kinetic energy gained = eV = ½mv².' },
            { text: 'Calculate velocity from energy: v = √(2eV/m) = √(2 × (e/m) × V) = √(2 × 1.76×10¹¹ × 2000) = √(7.04×10¹⁴) ≈ 2.65×10⁷ m/s.' },
            { text: 'In magnetic field, centripetal force = magnetic force: mv²/r = evB → r = mv/(eB) = v/((e/m)B).' },
            { text: 'Substitute values: r = (2.65×10⁷) / (1.76×10¹¹ × 0.02) = (2.65×10⁷) / (3.52×10⁹) ≈ 7.53×10⁻³ m = 7.53 mm.' },
            { text: 'Verify units: (m/s) / ((C/kg)·T) = (m/s) / ((C/kg)·(N·s/C·m)) = (m/s) / (N/kg·m) → kg·m/N = m. Correct.', faded: true, blankAnswer: 'Radius ≈ 7.5 mm' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_002', title: 'Charge to Mass Ratio of Electron',
          scaffold: { problem: 'In a Thomson e/m apparatus, the deflection plates are 5.0 cm long and separated by 2.0 cm.',
            steps: [
            { text: 'Calculate the electric field strength E = V/d = 200 V / 0.020 m = 1.00 × 10⁴ V m⁻¹.' },
            { text: 'At null deflection, electron speed v = E/B = (1.00 × 10⁴) / 0.010 = 1.00 × 10⁶ m s⁻¹.' },
            { text: 'With only magnetic field, the centripetal force is provided by the magnetic force: m v²/r = e v B → e/m = v/(B r).' },
            { text: 'Substitute v = 1.00 × 10⁶ m s⁻¹, B = 0.010 T, r = 0.040 m → e/m = (1.00 × 10⁶) / (0.010 × 0.040) = 2.50 × 10⁹ C kg⁻¹.' },
            { text: 'Compare with accepted value 1.76 × 10¹¹ C kg⁻¹; the discrepancy is due to simplified geometry (the magnetic field.', faded: true, blankAnswer: '2.50 × 10⁹ C kg⁻¹ (experimental value under the given.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_003', title: 'Rutherford\'s Nuclear Model of Atom',
          scaffold: { problem: 'In a Rutherford scattering experiment, alpha particles of kinetic energy 7.5 MeV are fired at a thin platinum foil (Z = 78).',
            steps: [
            { text: 'Convert alpha particle kinetic energy to joules: K = 7.5 MeV = 7.5 × 10⁶ eV × 1.6×10⁻¹⁹ J/eV = 1.2×10⁻¹² J.' },
            { text: 'Identify charges: alpha particle q₁ = +2e = 3.2×10⁻¹⁹ C; platinum nucleus q₂ = +78e = 1.248×10⁻¹⁷ C.' },
            { text: 'Apply energy conservation for head-on collision: initial K = final U = (1/4πε₀)(q₁q₂)/r₀.' },
            { text: 'Calculate r₀ = (9×10⁹ × 3.2×10⁻¹⁹ × 1.248×10⁻¹⁷) / (1.2×10⁻¹²) = 2.99×10⁻¹⁴ m ≈ 30 fm.' },
            { text: 'Maximum potential energy U_max = K = 1.2×10⁻¹² J (by energy conservation).' },
            { text: 'Force at r₀: F = (1/4πε₀)(q₁q₂)/r₀² = K/r₀ = (1.2×10⁻¹²)/(2.99×10⁻¹⁴) = 40.1 N.', faded: true, blankAnswer: '(a) r₀ = 3.0×10⁻¹⁴ m (30 fm), (b) U_max = 1.2×10⁻¹² J (7.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_004', title: 'Atomic Number and Mass Number',
          scaffold: { problem: 'A sample of chlorine gas contains two isotopes: \\(^{35}_{17}\\text{Cl}\\) (75.77% abundance) and \\(^{37}_{17}\\text{Cl}\\) (24.23% abundance).',
            steps: [
            { text: 'Identify the data: Isotope 1: mass = 35 u, abundance = 75.77% = 0.7577.' },
            { text: 'Recall the formula for average atomic mass = Σ (isotopic mass × fractional abundance).' },
            { text: 'Compute contribution of each isotope: (35 × 0.7577) = 26.5195 u; (37 × 0.2423) = 8.9651 u.' },
            { text: 'Sum the contributions: 26.5195 + 8.9651 = 35.4846 u ≈ 35.5 u.' },
            { text: 'Verify atomic number: Both isotopes have 17 protons → Z = 17 for chlorine. Neutrons differ: 35–17=18 and 37–17=20.' },
            { text: 'Interpret: The non-integer average mass (35.5 u) reflects the natural mixture; Z=17 confirms same element.', faded: true, blankAnswer: 'Average atomic mass = 35.5 u (approx). Atomic number Z = 17.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_005', title: 'Isotopes and Isobars',
          scaffold: { problem: 'Naturally occurring boron consists of two isotopes: ¹⁰₅B (19.9% abundance, mass 10.0129 u) and ¹¹₅B (80.1% abundance, mass 11.0093 u).',
            steps: [
            { text: 'Identify given data - Isotope 1: mass m₁ = 10.0129 u, abundance f₁ = 19.9% = 0.199; Isotope 2: mass m₂ = 11.0093.' },
            { text: 'Recall formula for average atomic mass = Σ(mᵢ × fᵢ) = (m₁ × f₁) + (m₂ × f₂).' },
            { text: 'Calculate contribution of each isotope: Contribution₁ = 10.0129 × 0.199 = 1.9925671 u; Contribution₂ = 11.0093 × 0.801.' },
            { text: 'Sum contributions: Average mass = 1.9925671 + 8.8184493 = 10.8110164 u ≈ 10.81 u.' },
            { text: 'Compare with periodic table (10.81 u) - matches. Interpret: The weighted average is closer to 11B because it has higher.', faded: true, blankAnswer: '10.81 u (matches periodic table)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_006', title: 'Electromagnetic Spectrum and Planck\'s Quantum Theory',
          scaffold: { problem: 'A microwave oven operates at 2.45 GHz. Calculate the wavelength of this radiation in cm, the energy of one photon in joules, and the number.',
            steps: [
            { text: 'Identify given values: ν = 2.45 GHz = 2.45 × 10⁹ Hz; c = 3.00 × 10⁸ m s⁻¹; h = 6.626 × 10⁻³⁴ J s; Power = 800 W = 800.' },
            { text: 'Calculate wavelength λ = c/ν = (3.00 × 10⁸) / (2.45 × 10⁹) = 0.1224 m = 12.24 cm.' },
            { text: 'Calculate energy of one photon E = hν = (6.626 × 10⁻³⁴) × (2.45 × 10⁹) = 1.623 × 10⁻²⁴ J.' },
            { text: 'Calculate number of photons per second n = Power / E = 800 / (1.623 × 10⁻²⁴) = 4.93 × 10²⁶ photons/s.' },
            { text: 'Verify units: λ in cm, E in J, n in s⁻¹. Check order of magnitude: microwave photons have very low energy, so huge.' },
            { text: 'Interpret: This huge photon flux explains why microwaves heat food efficiently despite low per-photon energy.', faded: true, blankAnswer: 'λ = 12.24 cm; E = 1.62 × 10⁻²⁴ J; n = 4.93 × 10²⁶ photons.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In the physics-chemistry lab your teacher brings a discharge tube and a bar magnet. The glowing beam bends when the magnet approaches and drifts toward the positive plate of an electric field. A student objects: \'It\'s just a ray like light — it travels straight and makes things glow, so it\'s an electromagnetic wave, not particles.\'',
            decisions: [{ prompt: 'Which observation settles the debate?', options: [
                { text: 'Deflection by electric and magnetic fields — EM waves are electrically neutral and can\'t be bent by a field; only a stream of charged particles (electrons, negative) responds, curving toward the positive plate. Straight-line travel and fluorescence are shared with light, but field deflection is exclusively particle behaviour.', outcome: 'Same shadow-casting, opposite physics: the beam\'s response to fields was the decisive evidence that cathode rays are charged matter, not radiation.' },
                { text: 'The straight-line travel and sharp shadows — only waves can do that, so it must be light-like.', outcome: 'Particles moving fast also travel straight and cast shadows; the test that separates waves from particles is field deflection, which this beam fails the \'wave\' prediction on.', reveals: 'straight-line-means-wave' },
                { text: 'Neither — you can\'t tell particles from waves in a school lab at all.', outcome: 'A magnet and a charged plate are exactly the apparatus that settled it historically; school-lab deflection reproduces Thomson\'s evidence directly.', reveals: 'particle-vs-wave-untestable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'Protons, neutrons, electron clouds, orbitals — the atom stopped being a billiard ball the day you finished this.',
            decisions: [{ prompt: 'What comes next? Structure of Atom · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Structure of Atom · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_001', difficulty: 'standard',
          question: 'The electron is a fundamental subatomic particle carrying a unit negative.',
          hint: 'If stuck on force directions, review Class 11 Physics Chapter 4: Moving Charges and.',
          misconception: 'Students often think cathode rays are electromagnetic waves (like light) because they travel in straight lines and.',
          parts: [
                { id: 'a', prompt: 'Why does the charge-to-mass ratio (e/m) of cathode rays remain constant regardless of the gas used in the discharge tube or the electrode material?', answer: 'Because cathode rays are streams of electrons',
                  options: ['Because cathode rays are streams of electrons', 'because the voltage is the same'],
                  hint: 'If stuck on force directions, review Class 11 Physics Chapter 4: Moving Charges and Magnetism.',
                  misconception: 'Students often think cathode rays are electromagnetic waves (like light) because they travel in straight lines and cause fluorescence.' }
          ],
            remediations: { 'cathode-rays-are-electromagnetic-waves': { steps: ['Revisit Class 9 "Subatomic Particles" (c9_chem_ch2_1) to recall electron properties.', 'Use a magnet and a CRT monitor (or simulation) to see beam deflection — this directly shows particle behavior.', 'Practice Fleming\'s left-hand rule for magnetic force direction on negative charges.', 'Write the force balance equation eE = evB repeatedly until the condition for no deflection is internalized.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_002', difficulty: 'standard',
          question: 'The charge-to-mass ratio (e/m) of an electron is the quotient of the electron\'s.',
          hint: 'If stuck, review the discovery of electron node (c11_chem_cbse_02_001) for cathode ray.',
          misconception: 'Students often believe the magnetic force on the electron beam is always perpendicular to the velocity, so it cannot.',
          parts: [
                { id: 'a', prompt: 'State the accepted value of the charge-to-mass ratio of an electron with its SI units.', answer: '1.758820 × 10¹¹ C kg⁻¹',
                  options: ['1.758820 × 10¹¹ C kg⁻¹', '9.11 × 10⁻³¹ kg', '1.6 × 10⁻¹⁹ C'],
                  hint: 'If stuck, review the discovery of electron node (c11_chem_cbse_02_001) for cathode ray properties.',
                  misconception: 'Students often believe the magnetic force on the electron beam is always perpendicular to the velocity, so it cannot change the speed.' }
          ],
            remediations: { 'the-magnetic-force-on-the': { steps: ['Revisit the Lorentz force equations: write Fₑ = qE and Fₘ = qv × B on a card, explicitly substituting q = –e for.', 'Draw the three mutually perpendicular vectors (v, E, B) for the crossed-field setup; use the right-hand rule for v ×.', 'Practice the algebra: from eE = evB → v = E/B, then substitute into mv²/r = evB → e/m = E/(B²r).', 'Do this derivation three times from memory.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_003', difficulty: 'standard',
          question: 'Rutherford\'s nuclear model of atom proposes that an atom consists of a tiny.',
          hint: 'Review Class 11 Physics Chapter 1 (Electric Charges and Fields) for Coulomb\'s law and.',
          misconception: 'Students believe Rutherford\'s model "solved" the atomic structure problem and that electrons orbit like planets.',
          parts: [
                { id: 'a', prompt: 'In Rutherford\'s alpha-scattering experiment, what was the approximate thickness of the gold foil used, and why was gold specifically chosen?', answer: 'The gold foil was approximately 100 nm thick (about 400 atomic layers)',
                  options: ['The gold foil was approximately 100 nm thick (about 400 atomic layers)', '1 mm thick', 'aluminium foil', 'solved'],
                  hint: 'Review Class 11 Physics Chapter 1 (Electric Charges and Fields) for Coulomb\'s law and Chapter 6.',
                  misconception: 'Students believe Rutherford\'s model "solved" the atomic structure problem and that electrons orbit like planets in stable paths.' },
                { id: 'b', prompt: 'An alpha particle with kinetic energy 5.0 MeV approaches a gold nucleus (Z=79) head-on.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'solved', 'nucleus is small', 'nucleus is a point'],
                  hint: 'Review Class 11 Physics Chapter 1 (Electric Charges and Fields) for Coulomb\'s law and Chapter 6.',
                  misconception: 'Students believe Rutherford\'s model "solved" the atomic structure problem and that electrons orbit like planets in stable paths.' },
                { id: 'c', prompt: 'Compare the Rutherford and Thomson models on these three criteria: (a) distribution of positive charge, (b) explanation of alpha-scattering results, (c).', answer: 'distribution of positive charge, (',
                  options: ['distribution of positive charge, (', 'Rutherford explains stability', 'solved', 'nucleus is small'],
                  hint: 'Review Class 11 Physics Chapter 1 (Electric Charges and Fields) for Coulomb\'s law and Chapter 6.',
                  misconception: 'Students believe Rutherford\'s model "solved" the atomic structure problem and that electrons orbit like planets in stable paths.' }
          ],
            remediations: { 'rutherford-s-model-solved-the': { steps: ['Revisit Class 10 physics: accelerating charges radiate (electromagnetic induction chapter).', 'Calculate the classical radiation power for an electron in a 5×10⁻¹¹ m orbit using Larmor formula P = (e²a²)/(6πε₀c³).', 'Compare 10⁻⁸ s collapse time with actual atomic lifetime (>10¹⁰ years).', 'Read NCERT Section 2.2.5 "Drawbacks of Rutherford Model" — note the explicit statement: "Calculations show that.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Rutherford\'s model "solved" the atomic structure problem and that electrons orbit like planets.',
          parts: [
                { id: 'a', prompt: 'Design a thought experiment: If you could vary the atomic number Z of the foil material while keeping foil thickness constant (in atoms per unit area), how.', answer: '**Expected answer:** Fraction scattered at >90° ∝ Z²',
                  options: ['**Expected answer:** Fraction scattered at >90° ∝ Z²', 'solved', 'nucleus is small', 'nucleus is a point'],
                  hint: 'Review Class 11 Physics Chapter 1 (Electric Charges and Fields) for Coulomb\'s law and Chapter 6.',
                  misconception: 'Students believe Rutherford\'s model "solved" the atomic structure problem and that electrons orbit like planets in stable paths.' }
          ],
            remediations: { 'rutherford-s-model-solved-the': { steps: ['Revisit Class 10 physics: accelerating charges radiate (electromagnetic induction chapter).', 'Calculate the classical radiation power for an electron in a 5×10⁻¹¹ m orbit using Larmor formula P = (e²a²)/(6πε₀c³).', 'Compare 10⁻⁸ s collapse time with actual atomic lifetime (>10¹⁰ years).', 'Read NCERT Section 2.2.5 "Drawbacks of Rutherford Model" — note the explicit statement: "Calculations show that.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_004', difficulty: 'standard',
          question: 'Atomic number (Z) is the number of protons in the nucleus of an atom, which.',
          hint: 'If stuck, revisit Rutherford\'s nuclear model (c11_chem_cbse_02_003) and the discovery.',
          misconception: 'Students frequently write the nuclear symbol with the mass number (A) as subscript and atomic number (Z) as superscript.',
          parts: [
                { id: 'a', prompt: 'Two species are given: \\(^{14}_{6}\\text{C}\\) and \\(^{14}_{7}\\text{N}\\). Are they isotopes, isobars, or neither?', answer: 'They are isobars',
                  options: ['They are isobars', 'same mass number = isotopes'],
                  hint: 'If stuck, revisit Rutherford\'s nuclear model (c11_chem_cbse_02_003) and the discovery of subatomic.',
                  misconception: 'Students frequently write the nuclear symbol with the mass number (A) as subscript and atomic number (Z) as superscript (e.g.' }
          ],
            remediations: { 'students-frequently-write-the-nuclear': { steps: ['Draw a large nucleus on the board with "p⁺" and "n⁰" labelled.', 'Write \\(^{A}_{Z}\\text{X}\\) vertically: "A on top (mass = heavy = top), Z at bottom (atomic = fundamental = bottom)".', 'Use a table: Species | Z | A | n = A–Z | e⁻ (neutral) | e⁻ (ion).', 'Have the student explain aloud why Na⁺ has 10 electrons but still Z=11.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_005', difficulty: 'standard',
          question: 'Isotopes are atoms of the same element having identical atomic number (Z) but.',
          hint: 'If stuck on particle counts, revisit c11_chem_cbse_02_004 Problems 2.1 and 2.2 and create.',
          misconception: 'Students write isotopic notation as ¹⁷₃⁵Cl (swapping superscript/subscript) and calculate neutrons as Z - A instead.',
          parts: [
                { id: 'a', prompt: 'Write the complete symbol (ᴬᶻX) for an atom with 17 protons, 18 neutrons, and 17 electrons. Identify the element name.', answer: 'Answer: ³⁵₁₇Cl (Chlorine-35)',
                  options: ['Answer: ³⁵₁₇Cl (Chlorine-35)', 'isotopes have different valency', 'different mass means different combining capacity'],
                  hint: 'If stuck on particle counts, revisit c11_chem_cbse_02_004 Problems 2.1 and 2.2 and create a 5-row.',
                  misconception: 'Students write isotopic notation as ¹⁷₃⁵Cl (swapping superscript/subscript) and calculate neutrons as Z - A instead of A - Z.' },
                { id: 'b', prompt: 'A sample of element X has two isotopes: ⁶³X (69% abundance) and ⁶⁵X (31% abundance). Calculate the average atomic mass of X. Identify X from the periodic table.', answer: 'Average mass = (63 × 0.69) + (65 × 0.31) = 43.47 + 20.15 = 63.62 u ≈ 63.5 u',
                  options: ['Average mass = (63 × 0.69) + (65 × 0.31) = 43.47 + 20.15 = 63.62 u ≈ 63.5 u', 'isotopes have different valency', 'different mass means different combining capacity'],
                  hint: 'If stuck on particle counts, revisit c11_chem_cbse_02_004 Problems 2.1 and 2.2 and create a 5-row.',
                  misconception: 'Students write isotopic notation as ¹⁷₃⁵Cl (swapping superscript/subscript) and calculate neutrons as Z - A instead of A - Z.' },
                { id: 'c', prompt: 'Compare the species: ⁴⁰₁₈Ar, ⁴⁰₂₀Ca, ³⁹₁₉K⁺. Which are isobars? Which are isoelectronic? Justify using subatomic particle counts.', answer: 'Isobars: ⁴⁰₁₈Ar and ⁴⁰₂₀Ca (same A=40, different Z)',
                  options: ['Isobars: ⁴⁰₁₈Ar and ⁴⁰₂₀Ca (same A=40, different Z)', 'isotopes have different valency', 'different mass means different combining capacity'],
                  hint: 'If stuck on particle counts, revisit c11_chem_cbse_02_004 Problems 2.1 and 2.2 and create a 5-row.',
                  misconception: 'Students write isotopic notation as ¹⁷₃⁵Cl (swapping superscript/subscript) and calculate neutrons as Z - A instead of A - Z.' }
          ],
            remediations: { 'students-write-isotopic-notation-as': { steps: ['Revisit c11_chem_cbse_02_004 - practice writing ᴬᶻX for 10 elements, verifying Z from periodic table.', 'Draw nuclear diagrams for ³⁵Cl and ³⁷Cl showing 17p⁺/18n⁰ vs 17p⁺/20n⁰, same 17e⁻ shells.', 'Solve 5 Problems of type "Given Z, A, charge → find p⁺, n⁰, e⁻" using table: Species | Z | A | Charge | p⁺ | n⁰ | e⁻.', 'Explain aloud why ³⁵Cl and ³⁷Cl form identical compounds (NaCl) but ³⁵Cl₂ diffuses faster.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_006', difficulty: 'standard',
          question: 'Electromagnetic spectrum is the continuous range of all possible frequencies.',
          hint: 'Review Class 9 Physics chapter on Light (refraction, prism) and Class 10 Math chapter.',
          misconception: 'Students often think "higher intensity light always ejects more energetic photoelectrons" because they equate.',
          parts: [
                { id: 'a', prompt: 'State the SI units of frequency, wavelength, and wavenumber. Write the equation relating speed of light, frequency, and wavelength.', answer: 'Frequency: hertz (Hz = s⁻¹)',
                  options: ['Frequency: hertz (Hz = s⁻¹)', 'higher intensity light always ejects more energetic photoelectrons'],
                  hint: 'Review Class 9 Physics chapter on Light (refraction, prism) and Class 10 Math chapter on Real.',
                  misconception: 'Students often think "higher intensity light always ejects more energetic photoelectrons" because they equate brightness with photon.' },
                { id: 'b', prompt: 'A student claims: "Increasing the brightness of a light source increases the energy of each photon." Explain why this is incorrect using Planck\'s quantum.', answer: 'Photon energy E = hν depends only on frequency (ν), not on intensity',
                  options: ['Photon energy E = hν depends only on frequency (ν), not on intensity', 'higher intensity light always ejects more energetic photoelectrons'],
                  hint: 'Review Class 9 Physics chapter on Light (refraction, prism) and Class 10 Math chapter on Real.',
                  misconception: 'Students often think "higher intensity light always ejects more energetic photoelectrons" because they equate brightness with photon.' },
                { id: 'c', prompt: 'Calculate the frequency and wavenumber of yellow light of wavelength 580 nm. (c = 3.00 × 10⁸ m s⁻¹)', answer: 'λ = 580 nm = 5.80 × 10⁻⁷ m',
                  options: ['λ = 580 nm = 5.80 × 10⁻⁷ m', 'higher intensity light always ejects more energetic photoelectrons'],
                  hint: 'Review Class 9 Physics chapter on Light (refraction, prism) and Class 10 Math chapter on Real.',
                  misconception: 'Students often think "higher intensity light always ejects more energetic photoelectrons" because they equate brightness with photon.' },
                { id: 'd', prompt: 'The black-body radiation curve at 5000 K peaks at a certain wavelength. If temperature is doubled to 10000 K, how does the peak wavelength change?', answer: 'λ_max halves (shifts to shorter wavelength)',
                  options: ['λ_max halves (shifts to shorter wavelength)', 'higher intensity light always ejects more energetic photoelectrons'],
                  hint: 'Review Class 9 Physics chapter on Light (refraction, prism) and Class 10 Math chapter on Real.',
                  misconception: 'Students often think "higher intensity light always ejects more energetic photoelectrons" because they equate brightness with photon.' }
          ],
            remediations: { 'higher-intensity-light-always-ejects': { steps: ['Revisit the photoelectric effect observations: (i) emission is instantaneous, (ii) kinetic energy depends on frequency.', 'Use the analogy of a vending machine — each photon is a coin of fixed value hν; intensity is number of coins per.', 'Practice numerical problems where intensity and frequency are varied independently (e.g., NCERT Problems 2.7, 2.8).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
