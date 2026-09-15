import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch03_p1: SimDef = {
    id: 'v3_c11_chem_ch03_p1',
    title: 'Classification of Elements and Periodicity · Part 1/3',
    subtitle: 'Test why properties outrank mass, and how atomic number fixed the table\'s anomalies.',
    classLevel: 11, subject: 'chemistry', topic: 'Classification of Elements and Periodicity · Part 1/3',
    chapters: ['c11_chem_ch03'],
    nodeIds: ['c11_chem_cbse_03_001', 'c11_chem_cbse_03_002', 'c11_chem_cbse_03_003', 'c11_chem_cbse_03_004', 'c11_chem_cbse_03_005', 'c11_chem_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chemist stress-testing the periodic table\'s logic', intro: 'A drawer of unlabelled reagent bottles and a table with gaps — your job is to make order defend itself.', goal: 'Distinguish atomic-weight ordering from the modern atomic-number law and use both to place elements.' },
    discovery: {
        question: 'Mendeleev placed tellurium (heavier) before iodine (lighter), breaking his own atomic-weight rule. What justified the swap?',
        options: ['Their chemical properties demanded those group positions', 'He made a measurement error that was quietly corrected later', 'Tellurium had originally been assigned the wrong symbol', 'Heavier elements were always placed later no matter what'],
        answer: 'Their chemical properties demanded those group positions',
        hook: 'Mendeleev trusted properties over his own rule — Moseley\'s X-rays later proved atomic number was the real ordering all along.',
    },
    teaching: [
        { title: 'Need for Classification: Mendeleev\'s Periodic Table', text: 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing atomic weights such that elements with similar physical and chemical properties recur periodically, forming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_03_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Slot four unknown elements into a Mendeleev-style group, predict a missing element\'s chloride formula, then place element 35 in the modern table.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_001', title: 'Need for Classification: Mendeleev\'s Periodic Table',
          caseStudy: { intro: 'Imagine you are in a typical Indian chemistry laboratory with dozens of reagent bottles: sodium, potassium, calcium, magnesium, chlorine, bromine, iodine.',
            decisions: [{ prompt: 'State Mendeleev\'s Periodic Law in your own words, and give one example of how he applied it to correct the atomic weight of an element.', options: [
                { text: 'Mendeleev\'s Periodic Law: The physical and chemical properties of elements are periodic', outcome: 'Mendeleev\'s Periodic Law: The physical and chemical properties of elements are periodic functions.' },
                { text: 'properties are periodic functions of atomic numbers', outcome: 'Not quite — Students often believe Mendeleev strictly followed increasing atomic weight order.', reveals: 'mendeleev-strictly-followed-increasing-atomic' },
                { text: 'he corrected beryllium\'s atomic weight from 13.5 to 9', outcome: 'Not quite — Students often believe Mendeleev strictly followed increasing atomic weight order.', reveals: 'mendeleev-strictly-followed-increasing-atomic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_002', title: 'Modern Periodic Law and Table',
          caseStudy: { intro: 'Observe that in a school laboratory, sodium and potassium react explosively with water, while magnesium and calcium react slowly with hot water.',
            decisions: [{ prompt: 'State the Modern Periodic Law. How many periods and groups are there in the modern periodic table?', options: [
                { text: 'The Modern Periodic Law: The physical and chemical properties of elements are periodic', outcome: 'The Modern Periodic Law: The physical and chemical properties of elements are periodic functions.' },
                { text: 'atomic mass as basis', outcome: 'Not quite — Students often think the modern periodic table is arranged strictly by increasing atomic mass.', reveals: 'the-modern-periodic-table-is' },
                { text: 'in terms of Mendeleev\'s law and hasn\'t grasped the shift to atomic number', outcome: 'Not quite — Students often think the modern periodic table is arranged strictly by increasing atomic mass.', reveals: 'the-modern-periodic-table-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_005', title: 'Types of Elements: s, p, d, f Blocks',
          caseStudy: { intro: 'Look at a periodic table chart on your classroom wall. Notice the two tall columns on the far left (Groups 1 & 2), the six columns on the far right (Groups.',
            decisions: [{ prompt: 'State the general outer electronic configuration of s-block, p-block, d-block, and f-block elements.', options: [
                { text: 's-block: ns¹⁻² (Groups 1–2)', outcome: 's-block: ns¹⁻² (Groups 1–2); p-block: ns²np¹⁻⁶ (Groups 13–18); d-block: (n−1)d¹⁻¹⁰ns⁰⁻² (Groups.' },
                { text: 'block = group', outcome: 'Not quite — Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium.', reveals: 'block-group' },
                { text: '"block = group"', outcome: 'Not quite — Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium.', reveals: 'block-group' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_006', title: 'Trends: Atomic Radius Across Period and Down Group',
          scaffold: { problem: 'Using the concept of effective nuclear charge, explain the trend in atomic radii across Period 3: Na (186 pm), Mg (160 pm), Al (143 pm),.',
            steps: [
            { text: 'Write electronic configurations: Na = [Ne]3s¹, Cl = [Ne]3s²3p⁵. Both have n=3 valence shell.' },
            { text: 'Identify core electrons: For both, core = 1s²2s²2p⁶ = 10 electrons (n=1,2 shells).' },
            { text: 'Apply Slater\'s rules for Na (3s¹ valence): σ = (0 × 0.35) + (8 × 0.85) + (2 × 1.00) = 6.8 + 2 = 8.8.' },
            { text: 'Apply Slater\'s rules for Cl (3s²3p⁵ valence, 7 valence electrons): σ = (6 × 0.35) + (8 × 0.85) + (2 × 1.00) = 2.1 + 6.8.' },
            { text: 'Compare: Z_eff increases from 2.2 (Na) to 6.1 (Cl) while n remains 3.' },
            { text: 'Verify trend consistency: Each step adds one proton (+1 Z) and one valence electron (+0.35 σ), net ΔZ_eff ≈ +0.65 per.', faded: true, blankAnswer: 'Atomic radius decreases across Period 3 because Z_eff.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a chemistry-day exhibit your team rebuilds Mendeleev\'s card-sorting method: each card carries an element\'s atomic weight plus its oxide and hydride formulae. Sorting by weight puts tellurium (127.6) before iodine (126.9) — but Te\'s compounds look like sulphur\'s family while iodine\'s look like chlorine\'s. A member insists: \'Atomic weight is the law; never swap the order.\'',
            decisions: [{ prompt: 'What did Mendeleev actually do here?', options: [
                { text: 'He inverted them — placing Te in Group VI with S/Se and iodine in Group VII with Cl/Br — because chemical behaviour (valency, compound formulae) was his primary classifier and atomic weight only the ordering aid. The same inversions (Ar/K, Co/Ni) exposed the limit of weight-based ordering and pointed toward atomic number.', outcome: 'Mendeleev\'s genius was trusting chemistry over arithmetic; the \'anomalous pairs\' later became evidence that atomic number, not weight, is the real ordering parameter.' },
                { text: 'The member is right — periodic law means strict weight order, so Te stays before I even if properties mismatch.', outcome: 'That misreads the law: Mendeleev broke weight order whenever chemistry demanded it — properties were the function, weight just the rough index.', reveals: 'weight-order-is-absolute' },
                { text: 'Leave both out of the table — elements that don\'t fit the order get discarded.', outcome: 'Mendeleev did the opposite: he left deliberate gaps for unknown elements (eka-aluminium, eka-silicon) but never dropped a known one for misbehaving.', reveals: 'misfits-get-discarded' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'The periodic table works because electron configurations repeat — atomic number just made the pattern honest.',
            decisions: [{ prompt: 'What comes next? Classification of Elements and Periodicity · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Classification of Elements and Periodicity · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_001', difficulty: 'standard',
          question: 'Mendeleev\'s Periodic Table arranges the known chemical elements in order.',
          hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross.',
          misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.',
          parts: [
                { id: 'a', prompt: 'Why did Mendeleev leave gaps in his periodic table and assign temporary names like eka-aluminium and eka-silicon?', answer: 'Mendeleev left gaps',
                  options: ['Mendeleev left gaps', 'he left gaps for aesthetic symmetry', 'he used atomic number to predict', 'atomic weight'],
                  hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross Method) and.',
                  misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.' },
                { id: 'b', prompt: 'Given the following data for four elements A, B, C, D, arrange them in a Mendeleev-style group and predict the formula of the chloride of the missing element.', answer: 'Step 1: All elements form M₂O₃ and MCl₃, indicating valency 3 → same group',
                  options: ['Step 1: All elements form M₂O₃ and MCl₃, indicating valency 3 → same group', 'atomic weight', 'atomic number', 'Mendeleev strictly followed increasing atomic weight order'],
                  hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross Method) and.',
                  misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.' }
          ],
            remediations: { 'mendeleev-strictly-followed-increasing-atomic': { steps: ['If a student insists Mendeleev never changed atomic weight order, give them a mini-card set: Te (127.6, forms H₂Te.', 'They will see Te belongs to Group VI (like S, Se) and I to Group VII (like Cl, Br), forcing Te before I despite higher.', 'For the "perfect prediction" myth, show the actual vs predicted melting point of eka-silicon (germanium): predicted.', 'Have them calculate % error for atomic weight of eka-aluminium: (70-68)/70 × 100 = 2.9%.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Mendeleev\'s prediction of eka-aluminium (gallium) was 100% accurate in all properties." Use the data from Table 3.3 (NCERT).', answer: 'The statement is false',
                  options: ['The statement is false', '100% accurate', 'completely wrong', 'atomic weight'],
                  hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross Method) and.',
                  misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.' }
          ],
            remediations: { 'mendeleev-strictly-followed-increasing-atomic': { steps: ['If a student insists Mendeleev never changed atomic weight order, give them a mini-card set: Te (127.6, forms H₂Te.', 'They will see Te belongs to Group VI (like S, Se) and I to Group VII (like Cl, Br), forcing Te before I despite higher.', 'For the "perfect prediction" myth, show the actual vs predicted melting point of eka-silicon (germanium): predicted.', 'Have them calculate % error for atomic weight of eka-aluminium: (70-68)/70 × 100 = 2.9%.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_002', difficulty: 'standard',
          question: 'The Modern Periodic Law states that the physical and chemical properties.',
          hint: 'Revisit Class 9 atomic structure (c9_chem_ch2_5, c9_chem_ch2_6) and Class 10 modern.',
          misconception: 'Students often think the modern periodic table is arranged strictly by increasing atomic mass, confusing it with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Modern Periodic Law states that the physical and chemical properties of elements are',
                  options: ['The Modern Periodic Law states that the physical and chemical properties of elements are', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)', 'Electronic configuration is the distribution of electrons in an atom\'s orbitals,'],
                  hint: 'Revisit Class 9 atomic structure (c9_chem_ch2_5, c9_chem_ch2_6) and Class 10 modern periodic table.',
                  misconception: 'Students often think the modern periodic table is arranged strictly by increasing atomic mass, confusing it with Mendeleev\'s table.' }
          ],
            remediations: { 'the-modern-periodic-table-is': { steps: ['If a student confuses atomic mass and atomic number, have them list the first 20 elements with both atomic number and.', 'Then ask them to predict properties based on atomic number vs mass.', 'For block misidentification, practice writing electronic configurations for elements across periods 4 and 5.', 'Use the aufbau diagram to trace the last electron added.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_003', difficulty: 'standard',
          question: 'In the Modern Periodic Table, **periods** are the seven horizontal rows.',
          hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and.',
          misconception: '**Misconception:** "The group number equals the number of valence electrons for all elements." **Specific error:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)',
                  options: ['In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'The Modern Periodic Law states that the physical and chemical properties of elements are', 'Electronic configuration is the distribution of electrons in an atom\'s orbitals,'],
                  hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and Class 11.',
                  misconception: '**Misconception:** "The group number equals the number of valence electrons for all elements." **Specific error:** Students apply the.' }
          ],
            remediations: { 'misconception-the-group-number-equals': { steps: ['Have the student write electronic configurations for the first transition series (Sc–Zn) and tabulate:.', 'Highlight where the sum matches (Sc–Mn) and where it deviates (Fe–Zn, especially Cr, Cu).', 'Explain that d-block group numbers are **assigned by IUPAC based on chemical analogy** (vertical similarity.', 'Contrast with s/p-blocks where group number **predicts** valence electrons.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_004', difficulty: 'standard',
          question: 'Electronic configuration is the distribution of electrons in an atom\'s.',
          hint: 'Review Class 11 Physics Chapter "Atoms" or Class 9 Chemistry "Structure of Atom" for.',
          misconception: 'Students write electronic configurations in filling order (e.g., 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶5s²4d¹⁰5p⁶6s²4f¹⁴5d¹⁰6p⁶...).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electronic configuration is the distribution of electrons in an atom\'s orbitals,',
                  options: ['Electronic configuration is the distribution of electrons in an atom\'s orbitals,', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'The Modern Periodic Law states that the physical and chemical properties of elements are', 'In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)'],
                  hint: 'Review Class 11 Physics Chapter "Atoms" or Class 9 Chemistry "Structure of Atom" for quantum.',
                  misconception: 'Students write electronic configurations in filling order (e.g., 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶5s²4d¹⁰5p⁶6s²4f¹⁴5d¹⁰6p⁶...) but fail to reorder.' }
          ],
            remediations: { 'students-write-electronic-configurations-in': { steps: ['Write the configuration in filling order using the (n+l) rule diagram (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...).', 'Regroup all subshells by increasing n: collect all n=1, then n=2, then n=3, etc.', 'Within each n, order by l: s, p, d, f.', 'Verify total electrons = Z. Practice with Z=26 (Fe): Filling: 1s²2s²2p⁶3s²3p⁶4s²3d⁶.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_005', difficulty: 'standard',
          question: 'Elements are classified into s, p, d, and f blocks based on the subshell (s,.',
          hint: 'Review the aufbau diagram (n+l rule) and practice writing configurations for the first 36.',
          misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without.',
          parts: [
                { id: 'a', prompt: 'State the general outer electronic configuration of s-block, p-block, d-block, and f-block elements.', answer: 's-block: ns¹⁻² (Groups 1–2)',
                  options: ['s-block: ns¹⁻² (Groups 1–2)', 'block = group', '"block = group"'],
                  hint: 'Review the aufbau diagram (n+l rule) and practice writing configurations for the first 36 elements.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' },
                { id: 'b', prompt: 'Why is helium placed in the p-block (Group 18) even though its electron configuration is 1s²?', answer: 'Helium has a completely filled valence shell (1s²) with no p orbitals in n=1',
                  options: ['Helium has a completely filled valence shell (1s²) with no p orbitals in n=1', 'helium belongs to s-block', 'block = group', '"block = group"'],
                  hint: 'Review the aufbau diagram (n+l rule) and practice writing configurations for the first 36 elements.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' },
                { id: 'c', prompt: 'An element has the ground-state configuration [Kr] 4d¹⁰ 5s² 5p³. Identify its block, group, period, and atomic number.', answer: 'Last electron enters 5p → p-block',
                  options: ['Last electron enters 5p → p-block', 'block = group', '"block = group"'],
                  hint: 'Review the aufbau diagram (n+l rule) and practice writing configurations for the first 36 elements.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' }
          ],
            remediations: { 'block-group': { steps: ['Revisit the aufbau diagram (n+l rule) from c11_chem_cbse_03_004.', 'Write configurations for Z=19 to 36 step by step, circling the *new* orbital each time.', 'Colour-code: s (red), p (blue), d (green), f (orange) on a blank periodic table.', 'Practice: Given configuration, identify block *only* by the highest (n+l) orbital that is partially filled or just.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_006', difficulty: 'standard',
          question: 'Atomic radius is the distance from the nucleus to the outermost electron cloud.',
          hint: 'If stuck, revisit c11_chem_cbse_03_004 (electronic configuration) and c9_chem_ch2_6.',
          misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron.',
          parts: [
                { id: 'a', prompt: 'Explain why atomic radius decreases from Li (152 pm) to F (64 pm) across Period 2, even though the number of electrons increases from 3 to 9.', answer: 'Across Period 2, electrons fill the same n=2 shell (2s, 2p)',
                  options: ['Across Period 2, electrons fill the same n=2 shell (2s, 2p)', 'more electrons = larger size', 'more electrons = larger atom'],
                  hint: 'If stuck, revisit c11_chem_cbse_03_004 (electronic configuration) and c9_chem_ch2_6 (electron.',
                  misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron count rises.' },
                { id: 'b', prompt: 'Compare atomic radii down Group 1: Li (152 pm), Na (186 pm), K (231 pm), Rb (244 pm), Cs (262 pm).', answer: 'From K (n=4) to Rb (n=5), the 4d¹⁰ electrons are added',
                  options: ['From K (n=4) to Rb (n=5), the 4d¹⁰ electrons are added', 'each step adds a shell so increase should be constant', 'more electrons = larger atom'],
                  hint: 'If stuck, revisit c11_chem_cbse_03_004 (electronic configuration) and c9_chem_ch2_6 (electron.',
                  misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron count rises.' }
          ],
            remediations: { 'more-electrons-larger-atom-and': { steps: ['Draw Period 2 atoms (Li to Ne) with nucleus (+Z) and shells (n=1, n=2).', 'For each, write Z and count core electrons (1s² = 2).', 'Calculate Z_eff ≈ Z - 2 for valence electrons.', 'Plot Z_eff vs atomic radius from Table 3.6(a).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
