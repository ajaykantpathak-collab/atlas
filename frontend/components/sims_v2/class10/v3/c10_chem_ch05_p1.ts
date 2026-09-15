import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch05_p1: SimDef = {
    id: 'v3_c10_chem_ch05_p1',
    title: 'Periodic Classification of Elements · Part 1/2',
    subtitle: 'Hunt the number patterns that predicted the periodic table',
    classLevel: 10, subject: 'chemistry', topic: 'Periodic Classification of Elements · Part 1/2',
    chapters: ['c10_chem_ch05'],
    nodeIds: ['c10_chem_cbse_05_001', 'c10_chem_cbse_05_002', 'c10_chem_cbse_05_003', 'c10_chem_cbse_05_004', 'c10_chem_cbse_05_005', 'c10_chem_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a 19th-century chemist racing to organise the elements', intro: 'Fifty-six known elements, no table, no order — just scattered facts. Your job: find the hidden rhythm that makes similar elements fall into place.', goal: 'State Dobereiner\'s and Newlands\' rules precisely — atomic weight, not atomic number — and pinpoint where each fails.' },
    discovery: {
        question: 'Take lithium (7), sodium (23) and potassium (39). Sodium\'s mass, 23, is almost exactly the average of 7 and 39 — and all three metals behave alike. Coincidence?',
        options: ['No — it\'s a real pattern: Dobereiner found triads where the middle element\'s mass averages the other two', 'Yes — atomic mass has nothing to do with chemical behaviour', 'No — but only because all three are stored in oil', 'It\'s a coincidence that works for these three but for no other elements'],
        answer: 'No — it\'s a real pattern: Dobereiner found triads where the middle element\'s mass averages the other two',
        hook: 'Before the periodic table existed, chemists were already hearing its rhythm — threes that averaged out, then eighths that repeated. The table was discovered by listening for patterns.',
    },
    teaching: [
        { title: 'Early Attempts at Classification: Dobereiner\'s Triads', text: 'Dobereiner\'s Triads (1817) is an early classification system where elements with similar chemical properties are arranged in groups of three (triads) such that the atomic mass of the middle element.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_05_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Rebuild classification history: test Dobereiner\'s triads, lay out Newlands\' octaves, and find the exact elements where each scheme breaks.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_05_001', title: 'Early Attempts at Classification: Dobereiner\'s Triads',
          scaffold: { problem: 'A student finds three elements X, Y, Z with atomic masses 12, 28, 44 respectively. They have similar chemical properties.',
            steps: [
            { text: 'Identify the three atomic masses in increasing order: 12 (X), 28 (Y), 44 (Z).' },
            { text: 'Recall Dobereiner\'s rule: Atomic mass of middle element ≈ average of the other two.' },
            { text: 'Calculate average of X and Z: (12 + 44) / 2 = 56 / 2 = 28.' },
            { text: 'Compare calculated average (28) with actual atomic mass of Y (28). They are equal.' },
            { text: 'Conclude: Since the condition holds exactly, X, Y, Z form a Dobereiner\'s triad.', faded: true, blankAnswer: 'Yes, they form a Dobereiner\'s triad because 28 = (12.' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_002', title: 'Newlands\' Law of Octaves and Its Limitations',
          caseStudy: { intro: 'Imagine you are organizing your spice rack: you notice that every eighth spice jar has a similar aroma — turmeric, then seven others, then cumin smells earthy.',
            decisions: [{ prompt: 'State Newlands\' Law of Octaves in your own words and specify up to which element it was found applicable.', options: [
                { text: 'Correct answer: Newlands\' Law of Octaves states that when elements are arranged in', outcome: 'Correct answer: Newlands\' Law of Octaves states that when elements are arranged in increasing order.' },
                { text: 'it works for all elements', outcome: 'Not quite — Students often write "Newlands arranged elements by atomic number" instead of atomic weight — this.', reveals: 'students-often-write-newlands-arranged' },
                { text: 'it is based on atomic number', outcome: 'Not quite — Students often write "Newlands arranged elements by atomic number" instead of atomic weight — this.', reveals: 'students-often-write-newlands-arranged' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_003', title: 'Mendeleev\'s Periodic Table: Achievements and Basis (Atomic Mass)',
          caseStudy: { intro: 'Imagine you are organizing a library of 63 books where each book represents an element.',
            decisions: [{ prompt: 'State Mendeleev\'s Periodic Law in the exact wording used in CBSE textbooks.', options: [
                { text: 'Correct answer: "The physical and chemical properties of elements are a periodic function', outcome: 'Correct answer: "The physical and chemical properties of elements are a periodic function of their.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students believe Mendeleev\'s table was perfect and had no anomalies.', reveals: 'mendeleev-s-table-was-perfect' },
                { text: 'Mendeleev\'s table was perfect and had no anomalies', outcome: 'Not quite — Students believe Mendeleev\'s table was perfect and had no anomalies.', reveals: 'mendeleev-s-table-was-perfect' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_004', title: 'Mendeleev\'s Periodic Table: Limitations (Anomalous Pairs, Isotopes)',
          caseStudy: { intro: 'Imagine you are sorting a deck of cards by weight, but two cards with nearly identical weights have completely different pictures, while two cards with very.',
            decisions: [{ prompt: 'State the fundamental basis on which Mendeleev arranged elements in his periodic table, and name the specific property that caused.', options: [
                { text: 'Mendeleev arranged elements in order of increasing **atomic mass**', outcome: 'Mendeleev arranged elements in order of increasing **atomic mass**.' },
                { text: 'atomic number', outcome: 'Not quite — Students often think "anomalous pair" means the two elements have similar atomic masses.', reveals: 'anomalous-pair-means-the-two' },
                { text: 'valency', outcome: 'Not quite — Students often think "anomalous pair" means the two elements have similar atomic masses.', reveals: 'anomalous-pair-means-the-two' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_006', title: 'Periods in the Modern Periodic Table: Trends Across a Period',
          caseStudy: { intro: 'Imagine you are arranging books on a shelf by thickness — Period 2 is like a thin shelf with 8 books (Li to Ne), Period 3 is a thicker shelf with 8 books (Na.',
            decisions: [{ prompt: 'State the number of electron shells in elements of Period 3 and explain why this number remains constant across the period.', options: [
                { text: 'Elements in Period 3 have 3 electron shells (K, L, M)', outcome: 'Elements in Period 3 have 3 electron shells (K, L, M). The number remains constant because all.' },
                { text: 'shells increase', outcome: 'Not quite — Students write "atomic size increases across a period because atomic number increases" — they.', reveals: 'students-write-atomic-size-increases' },
                { text: '2 shells', outcome: 'Not quite — Students write "atomic size increases across a period because atomic number increases" — they.', reveals: 'students-write-atomic-size-increases' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For the school science quiz, a team is given three element cards — chlorine (35.5), bromine (80), iodine (127) — and told that early chemists grouped similar elements in threes. They must decide if these three really fit that old rule before the next round.',
            decisions: [{ prompt: 'How can the team check whether these three elements genuinely form a triad?', options: [
                { text: 'Average the atomic masses of the lightest and heaviest: (35.5 + 127) / 2 = 81.25, which is close to bromine\'s 80. Chlorine, bromine and iodine also share chemical properties — coloured, reactive non-metals — so they genuinely form a Dobereiner-style triad.', outcome: 'The triad rule puts the middle element\'s mass near the mean of the other two, and all three must actually resemble each other chemically — both checks pass here.' },
                { text: 'They form a triad simply because there are three of them — any three elements make a triad.', outcome: 'Three elements are a triad only if their properties are similar and the middle atomic mass is approximately the average of the other two.', reveals: 'any-three-is-triad' },
                { text: 'They cannot be a triad because the average, 81.25, does not equal 80 exactly, and the rule demands a perfect match.', outcome: 'The rule expects an approximate match, not a perfect one — bromine\'s 80 is close enough to 81.25, and the shared chemistry confirms the grouping.', reveals: 'triad-needs-exact-average' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every failed scheme taught chemists something. Triads showed mass patterns, octaves showed repetition — and their failures cleared the road for Mendeleev\'s leap.',
            decisions: [{ prompt: 'What comes next? Periodic Classification of Elements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Periodic Classification of Elements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_001', difficulty: 'standard',
          question: 'Dobereiner\'s Triads (1817) is an early classification system where elements.',
          hint: 'If stuck, revisit Class 9 node c9_chem_ch2_5 (Atomic Number and Mass Number) to recall.',
          misconception: 'Students often write "Dobereiner arranged elements in increasing order of atomic mass" — confusing triads with.',
          parts: [
                { id: 'a', prompt: 'The elements sulphur (S, atomic mass 32), selenium (Se, atomic mass 79), and tellurium (Te, atomic mass 128) have similar properties.', answer: 'Average of S and Te = (32 + 128)/2 = 80',
                  options: ['Average of S and Te = (32 + 128)/2 = 80', 'No, because 79 ≠ 80 exactly', 'approximately', 'Dobereiner arranged elements in increasing order of atomic mass'],
                  hint: 'If stuck, revisit Class 9 node c9_chem_ch2_5 (Atomic Number and Mass Number) to recall how atomic.',
                  misconception: 'Students often write "Dobereiner arranged elements in increasing order of atomic mass" — confusing triads with Newlands\' Octaves.' },
                { id: 'b', prompt: 'Given the triad: Lithium (7), Sodium (A), Potassium (39). Calculate the atomic mass A of sodium that satisfies Dobereiner\'s rule.', answer: 'Step 1: Write rule: A = (7 + 39)/2',
                  options: ['Step 1: Write rule: A = (7 + 39)/2', 'Dobereiner arranged elements in increasing order of atomic mass', 'distinguish between'],
                  hint: 'If stuck, revisit Class 9 node c9_chem_ch2_5 (Atomic Number and Mass Number) to recall how atomic.',
                  misconception: 'Students often write "Dobereiner arranged elements in increasing order of atomic mass" — confusing triads with Newlands\' Octaves.' }
          ],
            remediations: { 'students-often-write-dobereiner-arranged': { steps: ['Give the student three index cards labeled Li (7), Na (23), K (39).', 'Guide them to compute (7+39)/2 = 23.', 'Repeat with Ca (40), Sr (88), Ba (137) → (40+137)/2 = 88.5 ≈ 88.', 'Emphasize: "Only these specific triplets work; we cannot extend the chain to Rb, Cs, Fr." This isolates the triad.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "Dobereiner arranged elements in increasing order of atomic mass" — confusing triads with.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Dobereiner\'s triads work for all elements because atomic mass always increases regularly." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'Dobereiner arranged elements in increasing order of atomic mass', 'distinguish between'],
                  hint: 'If stuck, revisit Class 9 node c9_chem_ch2_5 (Atomic Number and Mass Number) to recall how atomic.',
                  misconception: 'Students often write "Dobereiner arranged elements in increasing order of atomic mass" — confusing triads with Newlands\' Octaves.' }
          ],
            remediations: { 'students-often-write-dobereiner-arranged': { steps: ['Give the student three index cards labeled Li (7), Na (23), K (39).', 'Guide them to compute (7+39)/2 = 23.', 'Repeat with Ca (40), Sr (88), Ba (137) → (40+137)/2 = 88.5 ≈ 88.', 'Emphasize: "Only these specific triplets work; we cannot extend the chain to Rb, Cs, Fr." This isolates the triad.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_002', difficulty: 'standard',
          question: 'Newlands\' Law of Octaves states that when elements are arranged in order.',
          hint: 'If stuck, revisit c9_chem_ch2_5 (atomic weight definition) and c6_chemistry_ch04_008.',
          misconception: 'Students often write "Newlands arranged elements by atomic number" instead of atomic weight — this is the #1.',
          parts: [
                { id: 'a', prompt: 'Why did Newlands place cobalt (Co) and nickel (Ni) in the same slot in his table?', answer: 'Correct answer: Newlands forced Co and Ni into the same slot',
                  options: ['Correct answer: Newlands forced Co and Ni into the same slot', 'Co and Ni have similar properties', 'octave', 'group of 8 elements'],
                  hint: 'If stuck, revisit c9_chem_ch2_5 (atomic weight definition) and c6_chemistry_ch04_008 (metal.',
                  misconception: 'Students often write "Newlands arranged elements by atomic number" instead of atomic weight — this is the #1 mark-losing error in board.' }
          ],
            remediations: { 'students-often-write-newlands-arranged': { steps: ['Write the exact definition from NCERT: "When elements are arranged in order of increasing atomic weights, the.', 'Draw the 7-column table for elements 1–20 on paper. Use different colored pens for metals/non-metals — visually see.', 'Add Fe, Co, Ni cards — physically try to place them without breaking columns.', 'Write the four limitations as bullet points with the specific element names (Co, Ni, Fe, Ca).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_003', difficulty: 'standard',
          question: 'Mendeleev\'s Periodic Law states that the physical and chemical properties.',
          hint: 'Revisit Class 9 node c9_chem_ch2_5 (Atomic Number and Mass Number) and c9_chem_ch3_6.',
          misconception: 'Students believe Mendeleev\'s table was perfect and had no anomalies.',
          parts: [
                { id: 'a', prompt: 'Why did Mendeleev leave gaps in his periodic table instead of forcing all known elements into a continuous sequence? Explain using the concept of periodicity.', answer: 'Correct answer: Mendeleev left gaps',
                  options: ['Correct answer: Mendeleev left gaps', 'he didn\'t know all elements', 'Mendeleev\'s table was perfect and had no anomalies'],
                  hint: 'Revisit Class 9 node c9_chem_ch2_5 (Atomic Number and Mass Number) and c9_chem_ch3_6 (Writing.',
                  misconception: 'Students believe Mendeleev\'s table was perfect and had no anomalies.' },
                { id: 'b', prompt: 'Mendeleev predicted the existence of Eka-silicon (later named Germanium).', answer: 'Correct answer with steps: Step 1: Identify group',
                  options: ['Correct answer with steps: Step 1: Identify group', 'Mendeleev\'s table was perfect and had no anomalies'],
                  hint: 'Revisit Class 9 node c9_chem_ch2_5 (Atomic Number and Mass Number) and c9_chem_ch3_6 (Writing.',
                  misconception: 'Students believe Mendeleev\'s table was perfect and had no anomalies.' }
          ],
            remediations: { 'mendeleev-s-table-was-perfect': { steps: ['Give the student 10 element cards with atomic mass, valency, and property (metal/non-metal).', 'Ask them to arrange strictly by atomic mass.', 'Ask them to group by valency/properties.', 'Show the conflict: Te and I swap places if grouped by properties.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_004', difficulty: 'standard',
          question: 'Mendeleev\'s Periodic Table, arranged by increasing atomic mass, fails.',
          hint: 'If stuck, review c10_chem_cbse_05_003 (Mendeleev\'s achievements and basis) and.',
          misconception: 'Students often think "anomalous pair" means the two elements have similar atomic masses.',
          parts: [
                { id: 'a', prompt: 'State the fundamental basis on which Mendeleev arranged elements in his periodic table, and name the specific property that caused anomalies in this.', answer: 'Mendeleev arranged elements in order of increasing **atomic mass**',
                  options: ['Mendeleev arranged elements in order of increasing **atomic mass**', 'atomic number', 'valency', 'anomalous pair'],
                  hint: 'If stuck, review c10_chem_cbse_05_003 (Mendeleev\'s achievements and basis) and c9_chem_ch2_8.',
                  misconception: 'Students often think "anomalous pair" means the two elements have similar atomic masses.' },
                { id: 'b', prompt: 'Cobalt (Co, atomic mass 58.93) and Nickel (Ni, atomic mass 58.69) form another anomalous pair.', answer: 'Strict atomic mass order: Ni (58.69) before Co (58.93)',
                  options: ['Strict atomic mass order: Ni (58.69) before Co (58.93)', 'property over mass', 'anomalous pair', '"anomalous pair" means the two elements have similar atomic masses'],
                  hint: 'If stuck, review c10_chem_cbse_05_003 (Mendeleev\'s achievements and basis) and c9_chem_ch2_8.',
                  misconception: 'Students often think "anomalous pair" means the two elements have similar atomic masses.' }
          ],
            remediations: { 'anomalous-pair-means-the-two': { steps: ['Revisit the definition of "anomalous pair" — it is a **violation of the atomic mass sequence**, not just proximity.', 'Take the Ar/K data: write atomic masses side by side (Ar=39.9, K=39.1).', 'Ask: "If I follow mass strictly, K comes first.', 'But K is alkali metal, Ar is noble gas.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_005', difficulty: 'standard',
          question: 'The Modern Periodic Law states that the physical and chemical properties.',
          hint: 'Review c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and practice writing.',
          misconception: 'Students often think that the group number equals the total number of electrons in the outermost shell for all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Modern Periodic Law states that the physical and chemical properties of elements are',
                  options: ['The Modern Periodic Law states that the physical and chemical properties of elements are', 'Dobereiner\'s Triads (1817) is an early classification system where elements with similar', 'Newlands\' Law of Octaves states that when elements are arranged in order of increasing', 'Mendeleev\'s Periodic Law states that the physical and chemical properties of elements are'],
                  hint: 'Review c9_chem_ch2_6 (Electron Distribution in Shells: 2n² Rule) and practice writing.',
                  misconception: 'Students often think that the group number equals the total number of electrons in the outermost shell for all elements, including.' }
          ],
            remediations: { 'the-group-number-equals-the': { steps: ['Revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency) to reinforce shell filling order (2,8,18,32).', 'Practice writing electronic configurations for Z=1 to 30 and mapping to period/group using the rule: Period = highest.', 'Use a blank periodic table to place elements 1–30 by configuration, noting where the simple valence-electron rule.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_05_006', difficulty: 'standard',
          question: 'A period in the Modern Periodic Table is a horizontal row of elements arranged.',
          hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency).',
          misconception: 'Students write "atomic size increases across a period because atomic number increases" — they confuse \'more protons.',
          parts: [
                { id: 'a', prompt: 'State the number of electron shells in elements of Period 3 and explain why this number remains constant across the period.', answer: 'Elements in Period 3 have 3 electron shells (K, L, M)',
                  options: ['Elements in Period 3 have 3 electron shells (K, L, M)', 'shells increase', '2 shells', 'atomic size increases across a period'],
                  hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency) — practice.',
                  misconception: 'Students write "atomic size increases across a period because atomic number increases" — they confuse \'more protons + more electrons\' with.' },
                { id: 'b', prompt: 'Why does atomic radius decrease from sodium (Na) to chlorine (Cl) in Period 3 even though the number of electrons increases?', answer: 'Atomic radius decreases',
                  options: ['Atomic radius decreases', 'more electrons = larger size', 'shielding increases', 'atomic size increases across a period'],
                  hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency) — practice.',
                  misconception: 'Students write "atomic size increases across a period because atomic number increases" — they confuse \'more protons + more electrons\' with.' },
                { id: 'c', prompt: 'Element X is in Period 2 and forms an oxide X₂O₃. Identify X and predict whether its oxide is acidic, basic, or amphoteric. Justify using periodic trends.', answer: 'X is Boron (B, atomic number 5)',
                  options: ['X is Boron (B, atomic number 5)', 'atomic size increases across a period'],
                  hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency) — practice.',
                  misconception: 'Students write "atomic size increases across a period because atomic number increases" — they confuse \'more protons + more electrons\' with.' },
                { id: 'd', prompt: 'Compare the atomic radii of magnesium (Mg) and aluminium (Al) in Period 3. Which is smaller and by approximately how much (in pm)? Explain the anomaly if any.', answer: 'Al (143 pm) is smaller than Mg (160 pm) by ~17 pm',
                  options: ['Al (143 pm) is smaller than Mg (160 pm) by ~17 pm', 'Al has more electrons so larger', 'atomic size increases across a period'],
                  hint: 'If stuck, revisit c9_chem_ch2_6 (electron distribution) and c9_chem_ch2_7 (valency) — practice.',
                  misconception: 'Students write "atomic size increases across a period because atomic number increases" — they confuse \'more protons + more electrons\' with.' }
          ],
            remediations: { 'students-write-atomic-size-increases': { steps: ['Draw Bohr models for Na (2,8,1) and Cl (2,8,7) side-by-side — count shells (both 3).', 'Circle valence shell — note same n=3.', 'Write nuclear charges (+11 vs +17).', 'Ask "Which nucleus pulls the valence shell tighter?"'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
