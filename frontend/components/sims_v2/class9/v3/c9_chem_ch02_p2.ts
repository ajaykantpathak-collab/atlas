import type { SimDef } from '../../engine/types';

/** v3 generated — c9_chem_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_chem_ch02_p2: SimDef = {
    id: 'v3_c9_chem_ch02_p2',
    title: 'Atoms and Molecules · Part 2/2',
    subtitle: 'Three particles, one neutral atom',
    classLevel: 9, subject: 'chemistry', topic: 'Atoms and Molecules · Part 2/2',
    chapters: ['c9_chem_ch02'],
    nodeIds: ['c9_chem_ch2_6', 'c9_chem_ch2_7', 'c9_chem_ch2_8', 'c9_chem_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an atomic detective', intro: 'Atoms were supposed to be indivisible — until ray tubes and beryllium targets cracked them open. Meet the electron, proton and neutron, and learn what each one actually weighs and where it hides.', goal: 'Compare electrons, protons and neutrons — charge, mass and location — and explain atomic neutrality through equal proton–electron charge.' },
    discovery: {
        question: 'An atom contains positively charged protons and negatively charged electrons — so why doesn\'t it have any overall charge?',
        options: ['Protons and electrons carry equal-but-opposite charge and come in equal numbers — they cancel exactly; neutrons add mass, not charge', 'Neutrons neutralise the charge inside the nucleus', 'Electrons are too light to matter', 'Atoms DO have charge, we just can\'t feel it'],
        answer: 'Protons and electrons carry equal-but-opposite charge and come in equal numbers — they cancel exactly; neutrons add mass, not charge',
        hook: 'The electron looks like a planet orbiting a nucleus, but it\'s a featherweight — 1/1837 of a proton\'s mass. And \'no charge\' ≠ \'no mass\': the neutral neutron packs the same heft as a proton.',
    },
    teaching: [
        { title: 'Electron Distribution in Shells: 2n^2 Rule', text: 'The 2n² rule (Bohr-Bury scheme) states that the maximum number of electrons that can be accommodated in a given electron shell (energy level) is 2n², where n is the principal quantum number (shell.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_chem_ch2_6', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Build the atom\'s ID card from three famous experiments — Thomson\'s cathode rays, Goldstein\'s canal rays, Chadwick\'s neutron — then use charge-to-mass ratios to explain why electrons bend sharply in fields while protons barely flinch.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_chem_ch2_6', title: 'Electron Distribution in Shells: 2n^2 Rule',
          scaffold: { problem: 'Write the electronic configuration of magnesium (atomic number 12) using the 2n² rule and explain why the configuration is not 2,10.',
            steps: [
            { text: 'Identify the atomic number Z = 12, so total electrons = 12.' },
            { text: 'List shell capacities using 2n²: K (n=1) = 2, L (n=2) = 8, M (n=3) = 18.' },
            { text: 'Fill shells in order: K gets 2 electrons (remaining 10). L gets 8 electrons (remaining 2).' },
            { text: 'Write configuration as 2,8,2.' },
            { text: 'Verify sum = 2+8+2 = 12. Explain that 2,10 would violate the octet rule for the outermost shell (L would have 10, but.', faded: true, blankAnswer: 'Electronic configuration of Mg = 2,8,2' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch2_7', title: 'Valency: Definition and Determination from Electron Configuration',
          scaffold: { problem: 'Element A has atomic number 13. Element B has atomic number 9.',
            steps: [
            { text: 'Write electron distribution for A (Z=13) using 2n² rule. K=2, L=8, M=3. Total = 13. Valence electrons = 3 (M-shell).' },
            { text: 'Apply valency rule for A: V=3 ≤ 4, so valency = 3. A loses 3 electrons to achieve Ne configuration (2,8).' },
            { text: 'Write electron distribution for B (Z=9). K=2, L=7. Valence electrons = 7 (L-shell).' },
            { text: 'Apply valency rule for B: V=7 ≥ 5, so valency = 8−7 = 1. B gains 1 electron to achieve Ne configuration (2,10) i.e.' },
            { text: 'Cross valencies: A³⁺ and B¹⁻ → formula A₁B₃ or AB₃. Verify charge: (+3) + 3×(−1) = 0. Neutral compound.', faded: true, blankAnswer: 'Valency of A = 3, Valency of B = 1. Compound formula = AB₃.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch2_8', title: 'Isotopes: Definition and Examples',
          scaffold: { problem: 'A farmer uses urea (CO(NH₂)₂) fertiliser enriched with nitrogen-15 (¹⁵N) to track nitrogen uptake in rice crops in Punjab.',
            steps: [
            { text: 'Identify the atomic number of nitrogen from the periodic table: Z = 7.' },
            { text: 'Use the formula: Neutrons = Mass Number - Atomic Number = 15 - 7 = 8 neutrons.' },
            { text: 'Compare with normal ¹⁴N: Neutrons = 14 - 7 = 7 neutrons.' },
            { text: 'State that chemical properties depend on electron configuration.' },
            { text: 'Conclude that urea with ¹⁵N will react, dissolve, and be absorbed by plants exactly like normal urea; only physical.', faded: true, blankAnswer: '¹⁵N has 8 neutrons. Chemical behaviour is identical because.' }
            ] } },
        { type: 'case', nodeId: 'c9_chem_ch2_9', title: 'Isobars: Definition and Examples',
          caseStudy: { intro: 'Start by showing students two different elements - argon gas in fluorescent tubes and calcium in milk/chalk - and ask how they could possibly be related.',
            decisions: [{ prompt: 'Define isobars and give one example with proper nuclear notation.', options: [
                { text: 'Isobars are atoms of different elements with the same mass number but different atomic', outcome: 'Isobars are atoms of different elements with the same mass number but different atomic numbers.' },
                { text: 'same mass number', outcome: 'Not quite — Students confuse isobars with isotopes by thinking "same mass number" applies to the same element.', reveals: 'students-confuse-isobars-with-isotopes' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch2_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Building an atom model for an exhibition, a student writes labels: \'Proton — positive, 1 u, in nucleus. Electron — negative, same mass as proton, orbiting. Neutron — neutral, so massless.\'',
            decisions: [{ prompt: 'Which labels need fixing?', options: [
                { text: 'Two of them: the electron\'s mass is only about 1/1837 of a proton\'s — nearly nothing — and the neutron, though uncharged, still weighs about 1 u, matching the proton. No charge never meant no mass.', outcome: 'This separates the two independent properties — charge and mass — that the labels tangled together.' },
                { text: 'All three labels are fine — orbiting like a planet gives the electron real mass, and neutral means weightless.', outcome: 'The solar-system picture misleads: deflection experiments show electrons curve sharply precisely because they are almost massless, and mass number counts protons plus neutrons.', reveals: 'electron-heavy-neutron-light' },
                { text: 'Only the neutron label is wrong — neutrons have mass, but the electron genuinely equals the proton in mass.', outcome: 'Half right, but electron and proton differ by a factor of 1837; equal charge does not imply equal mass.', reveals: 'electron-equals-proton' }
            ] }] } },
        { type: 'case', nodeId: 'c9_chem_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Three particles run the whole show: protons and neutrons anchor the nucleus with mass, electrons zip around with equal-opposite charge. Balance the charges and the atom stays neutral.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch2_6', difficulty: 'standard',
          question: 'The 2n² rule (Bohr-Bury scheme) states that the maximum number of electrons.',
          hint: 'If stuck, revisit Bohr\'s model (c9_chem_ch2_4) to recall shell numbers and the concept.',
          misconception: 'Students often think the 2n² rule directly gives the number of electrons in each shell for all elements.',
          parts: [
                { id: 'a', prompt: 'Compare the electronic configurations of argon (Z=18) and potassium (Z=19).', answer: 'Argon: 2,8,8 (M shell has 8, outermost is full with octet)',
                  options: ['Argon: 2,8,8 (M shell has 8, outermost is full with octet)', 'M shell is full at 8'],
                  hint: 'If stuck, revisit Bohr\'s model (c9_chem_ch2_4) to recall shell numbers and the concept of atomic.',
                  misconception: 'Students often think the 2n² rule directly gives the number of electrons in each shell for all elements.' }
          ],
            remediations: { 'the-2n-rule-directly-gives': { steps: ['Have the student write the 2n² capacities for n=1 to 4 (2, 8, 18, 32).', 'Using a periodic table, write the atomic numbers of elements 1–20.', 'For each element, fill shells sequentially: put 2 in K, 8 in L, then for M shell, ask "Is this the outermost shell?".', 'Practice with argon (Z=18) and potassium (Z=19) side by side to see the transition.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_7', difficulty: 'standard',
          question: 'Valency is the combining capacity of an atom of an element, numerically equal.',
          hint: 'Review c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and practice writing.',
          misconception: 'Students consistently calculate valency of oxygen (Z=8, config 2,6) as 6 instead of 2, and nitrogen (Z=7, config 2,5).',
          parts: [
                { id: 'a', prompt: 'State the valency of an element with atomic number 15 and write its electron distribution showing the valence shell.', answer: 'Atomic number 15 is phosphorus',
                  options: ['Atomic number 15 is phosphorus', 'valency = valence electrons'],
                  hint: 'Review c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and practice writing.',
                  misconception: 'Students consistently calculate valency of oxygen (Z=8, config 2,6) as 6 instead of 2, and nitrogen (Z=7, config 2,5) as 5 instead of 3.' },
                { id: 'b', prompt: 'Explain why both sodium (Z=11) and chlorine (Z=17) form ions with a noble gas configuration, but sodium forms a cation while chlorine forms an anion.', answer: 'Sodium (2,8,1) has 1 valence electron',
                  options: ['Sodium (2,8,1) has 1 valence electron', 'sodium gains 7 electrons', 'chlorine loses 7'],
                  hint: 'Review c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and practice writing.',
                  misconception: 'Students consistently calculate valency of oxygen (Z=8, config 2,6) as 6 instead of 2, and nitrogen (Z=7, config 2,5) as 5 instead of 3.' },
                { id: 'c', prompt: 'Compare the valency of carbon (Z=6) and silicon (Z=14). Both have 4 valence electrons. Why do they show the same valency despite different periods?', answer: 'Carbon: 2,4 → valence e⁻ = 4 → valency = 4',
                  options: ['Carbon: 2,4 → valence e⁻ = 4 → valency = 4', 'silicon has valency 8'],
                  hint: 'Review c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and practice writing.',
                  misconception: 'Students consistently calculate valency of oxygen (Z=8, config 2,6) as 6 instead of 2, and nitrogen (Z=7, config 2,5) as 5 instead of 3.' }
          ],
            remediations: { 'students-consistently-calculate-valency-of': { steps: ['Revisit the octet rule using noble gas configurations — write electron distributions of Ne (2,8) and Ar (2,8,8) and.', 'For any element with V=5,6,7, explicitly calculate "electrons needed to reach 8" = 8−V.', 'Practice 10 elements (Z=3–18) using a table: columns for Z, config, V, electrons needed, valency.', 'Verify by writing formulas of known compounds (H₂O, NH₃, CH₄, NaCl, MgO) and checking if valencies cross-balance.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_8', difficulty: 'standard',
          question: 'Isotopes are atoms of the same element that have the same atomic number (same.',
          hint: 'If stuck, revisit c9_chem_ch2_5 (Atomic Number and Mass Number) and practice converting.',
          misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.',
          parts: [
                { id: 'a', prompt: 'Write the nuclear notation (symbol with mass number and atomic number) for an isotope of carbon that has 8 neutrons.', answer: 'The nuclear notation is ¹⁴₆C',
                  options: ['The nuclear notation is ¹⁴₆C', 'different elements', 'all carbon is carbon-12, not understanding that isotopes vary in neutron count', 'isotopes are "different elements"'],
                  hint: 'If stuck, revisit c9_chem_ch2_5 (Atomic Number and Mass Number) and practice converting between.',
                  misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.' },
                { id: 'b', prompt: 'Chlorine exists as two isotopes: ³⁵₁₇Cl (75% abundance) and ³⁷₁₇Cl (25% abundance).', answer: 'Chemical properties depend on electron configuration',
                  options: ['Chemical properties depend on electron configuration', 'different elements', 'isotopes are "different elements"'],
                  hint: 'If stuck, revisit c9_chem_ch2_5 (Atomic Number and Mass Number) and practice converting between.',
                  misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.' },
                { id: 'c', prompt: 'A sample of oxygen contains three isotopes: ¹⁶₈O (99.76%), ¹⁷₈O (0.04%), and ¹⁸₈O (0.20%). Calculate the average atomic mass of oxygen in this sample.', answer: 'Step 1: Convert percentages to decimals: 0.9976, 0.0004, 0.0020',
                  options: ['Step 1: Convert percentages to decimals: 0.9976, 0.0004, 0.0020', 'different elements', 'isotopes are "different elements"'],
                  hint: 'If stuck, revisit c9_chem_ch2_5 (Atomic Number and Mass Number) and practice converting between.',
                  misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.' },
                { id: 'd', prompt: 'Compare the following pairs and identify which are isotopes of each other: (a) ¹⁴₆C and ¹⁴₇N, (b) ¹²₆C and ¹⁴₆C, (c) ⁴⁰₁₈Ar and ⁴⁰₂₀Ca, (d) ¹H and ²H.', answer: '¹⁴₆C and ¹⁴₇N, (',
                  options: ['¹⁴₆C and ¹⁴₇N, (', 'same mass number', 'same atomic number', 'different elements'],
                  hint: 'If stuck, revisit c9_chem_ch2_5 (Atomic Number and Mass Number) and practice converting between.',
                  misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.' }
          ],
            remediations: { 'isotopes-are-different-elements-because': { steps: ['Revisit c9_chem_ch2_5 (Atomic Number and Mass Number) – practice writing nuclear notation for 10 elements, explicitly.', 'Use a physical analogy: "Same ID card (atomic number), different backpack weight (neutrons)." Draw two atoms.', 'Complete a table: Isotope | Protons | Neutrons | Electrons | Mass Number.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Deuterium (²H) and Tritium (³H) are isotopes of hydrogen.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'different elements', 'isotopes are "different elements"'],
                  hint: 'If stuck, revisit c9_chem_ch2_5 (Atomic Number and Mass Number) and practice converting between.',
                  misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.' },
                { id: 'b', prompt: 'Design a simple experiment using only school-lab equipment (balance, graduated cylinder, water) to demonstrate that heavy water (D₂O) has a higher density than.', answer: 'Procedure: Measure 50 mL of normal water and 50 mL of heavy water (if available)',
                  options: ['Procedure: Measure 50 mL of normal water and 50 mL of heavy water (if available)', 'different elements', 'isotopes are "different elements"'],
                  hint: 'If stuck, revisit c9_chem_ch2_5 (Atomic Number and Mass Number) and practice converting between.',
                  misconception: 'Students often think isotopes are "different elements" because they have different mass numbers.' }
          ],
            remediations: { 'isotopes-are-different-elements-because': { steps: ['Revisit c9_chem_ch2_5 (Atomic Number and Mass Number) – practice writing nuclear notation for 10 elements, explicitly.', 'Use a physical analogy: "Same ID card (atomic number), different backpack weight (neutrons)." Draw two atoms.', 'Complete a table: Isotope | Protons | Neutrons | Electrons | Mass Number.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c9_chem_ch2_9', difficulty: 'standard',
          question: 'Isobars are atoms of different elements that have the same mass number (total.',
          hint: 'Review c9_chem_ch2_5 (Atomic Number and Mass Number) and c9_chem_ch2_8 (Isotopes).',
          misconception: 'Students confuse isobars with isotopes by thinking "same mass number" applies to the same element.',
          parts: [
                { id: 'a', prompt: 'Identify which of the following pairs are isobars: (a) ¹⁴₆C and ¹⁴₇N, (b) ³⁵₁₇Cl and ³⁷₁₇Cl, (c) ⁴⁰₁₉K and ⁴⁰₂₀Ca, (d) ¹H and ²H. Show your reasoning for each.', answer: '¹⁴₆C and ¹⁴₇N, (',
                  options: ['¹⁴₆C and ¹⁴₇N, (', 'same mass number', 'same element'],
                  hint: 'Review c9_chem_ch2_5 (Atomic Number and Mass Number) and c9_chem_ch2_8 (Isotopes) - practice.',
                  misconception: 'Students confuse isobars with isotopes by thinking "same mass number" applies to the same element.' }
          ],
            remediations: { 'students-confuse-isobars-with-isotopes': { steps: ['Have the student write the nuclear notation for 3 isotope pairs (e.g., carbon-12/carbon-14, chlorine-35/chlorine-37).', 'Circle the atomic number (Z) in each.', 'Ask "Same element or different element?" for each pair.', 'Connect to electron configuration: write e⁻ config for each isobar pair to prove different valence electrons.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
