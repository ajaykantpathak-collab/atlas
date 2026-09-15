import type { SimDef } from '../../engine/types';

/** v3 generated — c9_chem_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_chem_ch02_p1: SimDef = {
    id: 'v3_c9_chem_ch02_p1',
    title: 'Atoms and Molecules · Part 1/2',
    subtitle: 'Three particles, one neutral atom',
    classLevel: 9, subject: 'chemistry', topic: 'Atoms and Molecules · Part 1/2',
    chapters: ['c9_chem_ch02'],
    nodeIds: ['c9_chem_ch2_1', 'c9_chem_ch2_10', 'c9_chem_ch2_2', 'c9_chem_ch2_3', 'c9_chem_ch2_4', 'c9_chem_ch2_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an atomic detective', intro: 'Atoms were supposed to be indivisible — until ray tubes and beryllium targets cracked them open. Meet the electron, proton and neutron, and learn what each one actually weighs and where it hides.', goal: 'Compare electrons, protons and neutrons — charge, mass and location — and explain atomic neutrality through equal proton–electron charge.' },
    discovery: {
        question: 'An atom contains positively charged protons and negatively charged electrons — so why doesn\'t it have any overall charge?',
        options: ['Protons and electrons carry equal-but-opposite charge and come in equal numbers — they cancel exactly; neutrons add mass, not charge', 'Neutrons neutralise the charge inside the nucleus', 'Electrons are too light to matter', 'Atoms DO have charge, we just can\'t feel it'],
        answer: 'Protons and electrons carry equal-but-opposite charge and come in equal numbers — they cancel exactly; neutrons add mass, not charge',
        hook: 'The electron looks like a planet orbiting a nucleus, but it\'s a featherweight — 1/1837 of a proton\'s mass. And \'no charge\' ≠ \'no mass\': the neutral neutron packs the same heft as a proton.',
    },
    teaching: [
        { title: 'Subatomic Particles: Electrons, Protons and Neutrons', text: 'Subatomic particles are the fundamental constituents of an atom: electrons (negatively charged, negligible mass, orbit the nucleus), protons (positively charged, mass ~1 u, reside in nucleus), and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_chem_ch2_1', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Build the atom\'s ID card from three famous experiments — Thomson\'s cathode rays, Goldstein\'s canal rays, Chadwick\'s neutron — then use charge-to-mass ratios to explain why electrons bend sharply in fields while protons barely flinch.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c9_chem_ch2_10', title: 'Limitations of Atomic Models: Comparison',
          caseStudy: { intro: 'Observe a neon sign glowing with distinct colors (red for neon, blue for argon) – this is a real-world observation of line spectra that no early model could.',
            decisions: [{ prompt: 'State the one major experimental result that Thomson\'s plum pudding model could not explain, which led to Rutherford\'s nuclear model.', options: [
                { text: 'The gold foil (alpha particle scattering) experiment showed that most alpha particles', outcome: 'The gold foil (alpha particle scattering) experiment showed that most alpha particles passed.' },
                { text: 'it couldn\'t explain cathode rays', outcome: 'Not quite — Students often think Bohr\'s model "failed" because electrons don\'t actually move in circular orbits.', reveals: 'bohr-s-model-failed-because' },
                { text: 'failed', outcome: 'Not quite — Students often think Bohr\'s model "failed" because electrons don\'t actually move in circular orbits.', reveals: 'bohr-s-model-failed-because' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch2_2', title: 'Thomson\'s Model of the Atom: Plum Pudding Model',
          caseStudy: { intro: 'Imagine a glowing tube in a physics lab — a cathode ray tube — where invisible rays travel from the negative electrode (cathode) to the positive electrode.',
            decisions: [{ prompt: 'State the two main postulates of Thomson\'s Plum Pudding Model of the atom.', options: [
                { text: 'The two postulates are: (1) An atom consists of a uniformly distributed sphere of', outcome: 'The two postulates are: (1) An atom consists of a uniformly distributed sphere of positive charge.' },
                { text: 'electrons orbit the nucleus', outcome: 'Not quite — Students often think Thomson\'s model has electrons *orbiting* in the positive sphere, like a mini.', reveals: 'thomson-s-model-has-electrons' },
                { text: 'protons are in the center', outcome: 'Not quite — Students often think Thomson\'s model has electrons *orbiting* in the positive sphere, like a mini.', reveals: 'thomson-s-model-has-electrons' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch2_3', title: 'Rutherford\'s Model: Gold Foil Experiment and Nuclear Atom',
          caseStudy: { intro: 'Imagine firing a stream of tiny, positively charged particles (alpha particles from radium) at a sheet of gold foil so thin it\'s nearly transparent like the.',
            decisions: [{ prompt: 'State the three key observations Rutherford made in the gold foil experiment using alpha particles.', options: [
                { text: 'The three key observations: (1) Most alpha particles passed straight through the gold', outcome: 'The three key observations: (1) Most alpha particles passed straight through the gold foil with.' },
                { text: 'all particles bounced back', outcome: 'Not quite — Students often think the gold foil experiment "proved" electrons orbit the nucleus in fixed paths.', reveals: 'the-gold-foil-experiment-proved' },
                { text: 'most were deflected', outcome: 'Not quite — Students often think the gold foil experiment "proved" electrons orbit the nucleus in fixed paths.', reveals: 'the-gold-foil-experiment-proved' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch2_4', title: 'Bohr\'s Model of the Atom: Energy Levels and Orbits',
          caseStudy: { intro: 'Start with a neon tube light glowing in a dark room – ask why it emits specific colors instead of white light.',
            decisions: [{ prompt: 'State Bohr\'s first postulate regarding electron orbits and energy radiation.', options: [
                { text: 'Electrons revolve in fixed circular orbits around the nucleus without radiating energy', outcome: 'Electrons revolve in fixed circular orbits around the nucleus without radiating energy.' },
                { text: 'electrons move in elliptical orbits', outcome: 'Not quite — Students draw electrons as planets on fixed rings and think they "orbit" like satellites.', reveals: 'students-draw-electrons-as-planets' },
                { text: 'electrons radiate energy continuously', outcome: 'Not quite — Students draw electrons as planets on fixed rings and think they "orbit" like satellites.', reveals: 'students-draw-electrons-as-planets' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch2_5', title: 'Atomic Number and Mass Number: Definitions',
          scaffold: { problem: 'A neutral atom of an element has 17 protons and 18 neutrons. Identify the element, write its nuclear notation, and state the number.',
            steps: [
            { text: 'Atomic number Z = number of protons = 17. From the periodic table, element with Z=17 is Chlorine (Cl).' },
            { text: 'Mass number A = protons + neutrons = 17 + 18 = 35.' },
            { text: 'Write nuclear notation: superscript A (35) top-left, subscript Z (17) bottom-left of symbol → ^35_17 Cl.' },
            { text: 'For a neutral atom, number of electrons = number of protons = 17.' },
            { text: 'Verify: 17 protons (+17 charge), 17 electrons (−17 charge) → net charge 0. Mass number 35 matches 17+18.', faded: true, blankAnswer: 'Element: Chlorine (Cl); Notation: ^35_17 Cl; Electrons: 17.' }
            ] } },
        { type: 'case', nodeId: 'c9_chem_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Building an atom model for an exhibition, a student writes labels: \'Proton — positive, 1 u, in nucleus. Electron — negative, same mass as proton, orbiting. Neutron — neutral, so massless.\'',
            decisions: [{ prompt: 'Which labels need fixing?', options: [
                { text: 'Two of them: the electron\'s mass is only about 1/1837 of a proton\'s — nearly nothing — and the neutron, though uncharged, still weighs about 1 u, matching the proton. No charge never meant no mass.', outcome: 'This separates the two independent properties — charge and mass — that the labels tangled together.' },
                { text: 'All three labels are fine — orbiting like a planet gives the electron real mass, and neutral means weightless.', outcome: 'The solar-system picture misleads: deflection experiments show electrons curve sharply precisely because they are almost massless, and mass number counts protons plus neutrons.', reveals: 'electron-heavy-neutron-light' },
                { text: 'Only the neutron label is wrong — neutrons have mass, but the electron genuinely equals the proton in mass.', outcome: 'Half right, but electron and proton differ by a factor of 1837; equal charge does not imply equal mass.', reveals: 'electron-equals-proton' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch2_5', title: 'The bigger picture',
          caseStudy: { intro: 'Three particles run the whole show: protons and neutrons anchor the nucleus with mass, electrons zip around with equal-opposite charge. Balance the charges and the atom stays neutral.',
            decisions: [{ prompt: 'What comes next? Atoms and Molecules · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Atoms and Molecules · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch2_1', difficulty: 'standard',
          question: 'Subatomic particles are the fundamental constituents of an atom: electrons.',
          hint: 'Revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c7_chem_ch01_006.',
          misconception: 'Students often believe that because electrons orbit the nucleus, they must have significant mass like planets orbiting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Subatomic particles are the fundamental constituents of an atom: electrons (negatively',
                  options: ['Subatomic particles are the fundamental constituents of an atom: electrons (negatively', 'The limitations of atomic models refer to the specific experimental observations and', 'Thomson\'s Plum Pudding Model proposes that an atom is a uniform sphere of positive charge', 'Rutherford\'s nuclear model proposes that an atom consists of a tiny, dense, positively'],
                  hint: 'Revisit c8_chem_ch2_3 (Atoms: Smallest Unit of an Element) and c7_chem_ch01_006 (Conduction.',
                  misconception: 'Students often believe that because electrons orbit the nucleus, they must have significant mass like planets orbiting the sun.' }
          ],
            remediations: { 'because-electrons-orbit-the-nucleus': { steps: ['Show the actual numbers: electron mass = 9.1 × 10⁻³¹ kg, proton mass = 1.67 × 10⁻²⁷ kg.', 'Calculate the ratio (1/1837) on the board.', 'Use an analogy: if a proton is a 1 kg bag of rice, an electron is a single grain (~0.5 g).', 'Have the student re-write the comparison table with correct masses and explain why atomic mass ignores electrons.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_10', difficulty: 'standard',
          question: 'The limitations of atomic models refer to the specific experimental.',
          hint: 'Revisit the postulates of each model in nodes c9_chem_ch2_2 (Thomson), c9_chem_ch2_3.',
          misconception: 'Students often think Bohr\'s model "failed" because electrons don\'t actually move in circular orbits like planets.',
          parts: [
                { id: 'a', prompt: 'Explain why Rutherford\'s nuclear model, despite discovering the nucleus, was considered unstable according to classical electromagnetic theory.', answer: 'In Rutherford\'s model, electrons revolve around the nucleus in circular orbits',
                  options: ['In Rutherford\'s model, electrons revolve around the nucleus in circular orbits', 'it couldn\'t explain isotopes', 'failed'],
                  hint: 'Revisit the postulates of each model in nodes c9_chem_ch2_2 (Thomson), c9_chem_ch2_3 (Rutherford).',
                  misconception: 'Students often think Bohr\'s model "failed" because electrons don\'t actually move in circular orbits like planets.' }
          ],
            remediations: { 'bohr-s-model-failed-because': { steps: ['Have the student calculate the hydrogen emission wavelength for n=3→2 transition using Bohr\'s formula (1/λ = R(1/2².', 'Show that the same formula comes from Schrödinger\'s equation for hydrogen.', 'Explain: "Bohr got the *energies* right for hydrogen, but his *picture* of orbits was incomplete.', 'Ask student to list what Bohr got right (quantization, hydrogen spectrum) vs.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Bohr\'s model "failed" because electrons don\'t actually move in circular orbits like planets.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Bohr\'s model is completely wrong because it was replaced by the quantum mechanical model." Is this a fair assessment?', answer: 'No, it is not fair',
                  options: ['No, it is not fair', 'it\'s wrong because electrons don\'t orbit', 'failed'],
                  hint: 'Revisit the postulates of each model in nodes c9_chem_ch2_2 (Thomson), c9_chem_ch2_3 (Rutherford).',
                  misconception: 'Students often think Bohr\'s model "failed" because electrons don\'t actually move in circular orbits like planets.' }
          ],
            remediations: { 'bohr-s-model-failed-because': { steps: ['Have the student calculate the hydrogen emission wavelength for n=3→2 transition using Bohr\'s formula (1/λ = R(1/2².', 'Show that the same formula comes from Schrödinger\'s equation for hydrogen.', 'Explain: "Bohr got the *energies* right for hydrogen, but his *picture* of orbits was incomplete.', 'Ask student to list what Bohr got right (quantization, hydrogen spectrum) vs.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_2', difficulty: 'standard',
          question: 'Thomson\'s Plum Pudding Model proposes that an atom is a uniform sphere.',
          hint: 'Revisit c9_chem_ch2_1 (cathode ray experiment, e/m ratio, electron as universal particle).',
          misconception: 'Students often think Thomson\'s model has electrons *orbiting* in the positive sphere, like a mini solar system.',
          parts: [
                { id: 'a', prompt: 'Why did Thomson propose a *sphere of positive charge* rather than a central positive core? Explain using the experimental evidence available to him in 1898.', answer: 'Thomson knew only two things: (1) cathode rays are negatively charged particles',
                  options: ['Thomson knew only two things: (1) cathode rays are negatively charged particles', 'because positive charge repels positive charge'],
                  hint: 'Revisit c9_chem_ch2_1 (cathode ray experiment, e/m ratio, electron as universal particle) and.',
                  misconception: 'Students often think Thomson\'s model has electrons *orbiting* in the positive sphere, like a mini solar system.' },
                { id: 'b', prompt: 'A student draws Thomson\'s model for a lithium atom (atomic number 3). They draw a large circle labeled "+" and place three small "e⁻" dots inside.', answer: 'Yes, the diagram is correct for Thomson\'s model',
                  options: ['Yes, the diagram is correct for Thomson\'s model', 'electrons should be in orbits', 'there should be a nucleus'],
                  hint: 'Revisit c9_chem_ch2_1 (cathode ray experiment, e/m ratio, electron as universal particle) and.',
                  misconception: 'Students often think Thomson\'s model has electrons *orbiting* in the positive sphere, like a mini solar system.' },
                { id: 'c', prompt: 'Compare how Thomson\'s model and Rutherford\'s model explain the *stability* of the atom. Why does Thomson\'s model fail on this count?', answer: 'Thomson\'s model: Electrons are stationary in a positive sphere',
                  options: ['Thomson\'s model: Electrons are stationary in a positive sphere', 'both are stable', 'Thomson\'s model has orbits'],
                  hint: 'Revisit c9_chem_ch2_1 (cathode ray experiment, e/m ratio, electron as universal particle) and.',
                  misconception: 'Students often think Thomson\'s model has electrons *orbiting* in the positive sphere, like a mini solar system.' }
          ],
            remediations: { 'thomson-s-model-has-electrons': { steps: ['Show the student a side-by-side diagram: Thomson (electrons as dots *inside* a shaded sphere) vs.', 'Ask: "In which model do electrons move in paths?"', 'Read Thomson\'s original 1898 paper excerpt: "The electrons are at rest in the sphere..."', 'Have the student redraw Thomson\'s model for oxygen (8 electrons) with electrons randomly placed *inside*, not on rings.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_3', difficulty: 'standard',
          question: 'Rutherford\'s nuclear model proposes that an atom consists of a tiny, dense.',
          hint: 'If stuck, revisit c9_chem_ch2_1 (subatomic particles) to recall alpha particle identity.',
          misconception: 'Students often think the gold foil experiment "proved" electrons orbit the nucleus in fixed paths like planets.',
          parts: [
                { id: 'a', prompt: 'In the gold foil experiment, alpha particles (He²⁺ nuclei) are fired at gold foil.', answer: 'At the distance of closest approach, kinetic energy is zero',
                  options: ['At the distance of closest approach, kinetic energy is zero', 'proved'],
                  hint: 'If stuck, revisit c9_chem_ch2_1 (subatomic particles) to recall alpha particle identity and.',
                  misconception: 'Students often think the gold foil experiment "proved" electrons orbit the nucleus in fixed paths like planets.' },
                { id: 'b', prompt: 'Compare the predicted alpha particle scattering patterns for Thomson\'s plum pudding model versus Rutherford\'s nuclear model.', answer: 'In Thomson\'s model, positive charge is diffuse; maximum deflection is small',
                  options: ['In Thomson\'s model, positive charge is diffuse; maximum deflection is small', 'proved'],
                  hint: 'If stuck, revisit c9_chem_ch2_1 (subatomic particles) to recall alpha particle identity and.',
                  misconception: 'Students often think the gold foil experiment "proved" electrons orbit the nucleus in fixed paths like planets.' }
          ],
            remediations: { 'the-gold-foil-experiment-proved': { steps: ['If a student draws planetary orbits for Rutherford\'s model: (1) Ask them to recall the three observations of the gold.', '(2) Show that only the nucleus conclusion follows directly from scattering data.', '(3) Demonstrate with a simple simulation or video that an orbiting electron radiates energy (Larmor formula) and would.', '(4) Have them write: "Rutherford discovered the nucleus; he hypothesized electrons orbit, but this leads to instability.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_4', difficulty: 'standard',
          question: 'Bohr\'s model proposes that electrons revolve around the nucleus in fixed.',
          hint: 'Revisit c9_chem_ch2_3: Rutherford\'s gold foil experiment conclusions and the classical.',
          misconception: 'Students draw electrons as planets on fixed rings and think they "orbit" like satellites.',
          parts: [
                { id: 'a', prompt: 'An electron in a hydrogen atom jumps from n=3 to n=2. Does it absorb or emit energy? What determines the color of light produced?', answer: 'Emits energy (photon)',
                  options: ['Emits energy (photon)', 'absorbs', 'color depends on initial orbit only', 'white light emitted'],
                  hint: 'Revisit c9_chem_ch2_3: Rutherford\'s gold foil experiment conclusions and the classical physics.',
                  misconception: 'Students draw electrons as planets on fixed rings and think they "orbit" like satellites.' },
                { id: 'b', prompt: 'Compare the energy level spacing in hydrogen: Is the gap between n=1 and n=2 larger or smaller than between n=4 and n=5? Explain using Bohr\'s concept.', answer: 'Larger',
                  options: ['Larger', 'equal spacing', 'smaller for n=1→2', 'cannot compare without formula'],
                  hint: 'Revisit c9_chem_ch2_3: Rutherford\'s gold foil experiment conclusions and the classical physics.',
                  misconception: 'Students draw electrons as planets on fixed rings and think they "orbit" like satellites.' }
          ],
            remediations: { 'students-draw-electrons-as-planets': { steps: ['Use a ladder on the floor – student stands on rung 1 (ground state).', 'Give a "photon" (a colored ball) of specific energy – student jumps to rung 3 only if ball matches the rung gap.', 'Student drops ball (emits photon) when jumping down.', 'Emphasize: no standing between rungs, no sliding down – only jumps.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_5', difficulty: 'standard',
          question: 'Atomic number (Z) is the number of protons in the nucleus of an atom, which.',
          hint: 'Revisit c9_chem_ch2_1 (Subatomic Particles) to recall proton/neutron/electron properties.',
          misconception: 'Students frequently write the nuclear notation with atomic number as superscript and mass number as subscript (e.g.',
          parts: [
                { id: 'a', prompt: 'Why does the atomic number determine the identity of an element, but the mass number does not? Use the terms "protons" and "neutrons" in your explanation.', answer: 'Atomic number equals the number of protons, and the number of protons defines',
                  options: ['Atomic number equals the number of protons, and the number of protons defines', 'mass number also identifies the element', 'neutrons determine the element'],
                  hint: 'Revisit c9_chem_ch2_1 (Subatomic Particles) to recall proton/neutron/electron properties, and.',
                  misconception: 'Students frequently write the nuclear notation with atomic number as superscript and mass number as subscript (e.g., ^12_24 Mg instead.' },
                { id: 'b', prompt: 'Two atoms are represented as ^35_17 X and ^37_17 Y. (a) Are X and Y the same element? (b) What is the relationship between them?', answer: 'Are X and Y the same element?',
                  options: ['Are X and Y the same element?', 'they are different elements, or calculating neutrons as 17−35'],
                  hint: 'Revisit c9_chem_ch2_1 (Subatomic Particles) to recall proton/neutron/electron properties, and.',
                  misconception: 'Students frequently write the nuclear notation with atomic number as superscript and mass number as subscript (e.g., ^12_24 Mg instead.' }
          ],
            remediations: { 'students-frequently-write-the-nuclear': { steps: ['Draw a table with columns: Element, Z, A, Protons, Neutrons, Electrons (neutral), Notation.', 'Practice the "Z = protons, A = protons + neutrons" mantra with flashcards.', 'Use the periodic table to find Z, then give A and ask for neutrons (A − Z).', 'Explicitly contrast "mass number" (integer, specific isotope) vs "atomic mass" (decimal, periodic table average).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
