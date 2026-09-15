import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch03_p3 (1 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch03_p3: SimDef = {
    id: 'v3_c11_chem_ch03_p3',
    title: 'Classification of Elements and Periodicity · Part 3/3',
    subtitle: 'Test why properties outrank mass, and how atomic number fixed the table\'s anomalies.',
    classLevel: 11, subject: 'chemistry', topic: 'Classification of Elements and Periodicity · Part 3/3',
    chapters: ['c11_chem_ch03'],
    nodeIds: ['c11_chem_cbse_03_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chemist stress-testing the periodic table\'s logic', intro: 'A drawer of unlabelled reagent bottles and a table with gaps — your job is to make order defend itself.', goal: 'Distinguish atomic-weight ordering from the modern atomic-number law and use both to place elements.' },
    discovery: {
        question: 'Mendeleev placed tellurium (heavier) before iodine (lighter), breaking his own atomic-weight rule. What justified the swap?',
        options: ['Their chemical properties demanded those group positions', 'He made a measurement error that was quietly corrected later', 'Tellurium had originally been assigned the wrong symbol', 'Heavier elements were always placed later no matter what'],
        answer: 'Their chemical properties demanded those group positions',
        hook: 'Mendeleev trusted properties over his own rule — Moseley\'s X-rays later proved atomic number was the real ordering all along.',
    },
    teaching: [
        { title: 'Anomalous Properties of Second Period Elements', text: 'The anomalous properties of second period elements refer to the distinct deviations in physical and chemical behavior exhibited by the first member of each group (Li, Be, B, C, N, O, F) compared.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_03_013', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Slot four unknown elements into a Mendeleev-style group, predict a missing element\'s chloride formula, then place element 35 in the modern table.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_013', title: 'Anomalous Properties of Second Period Elements',
          caseStudy: { intro: 'Begin by showing a student a piece of lithium metal (soft, silvery) and a strip of magnesium ribbon (harder, higher melting).',
            decisions: [{ prompt: 'State the two fundamental reasons why the first element of each group in the second period shows anomalous behavior compared to the rest.', options: [
                { text: 'The two fundamental reasons are: (1) exceptionally small atomic size leading to high', outcome: 'The two fundamental reasons are: (1) exceptionally small atomic size leading to high.' },
                { text: 'small size', outcome: 'Not quite — Students often think the anomalous behavior is only due to "small size" and forget the crucial role.', reveals: 'the-anomalous-behavior-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a chemistry-day exhibit your team rebuilds Mendeleev\'s card-sorting method: each card carries an element\'s atomic weight plus its oxide and hydride formulae. Sorting by weight puts tellurium (127.6) before iodine (126.9) — but Te\'s compounds look like sulphur\'s family while iodine\'s look like chlorine\'s. A member insists: \'Atomic weight is the law; never swap the order.\'',
            decisions: [{ prompt: 'What did Mendeleev actually do here?', options: [
                { text: 'He inverted them — placing Te in Group VI with S/Se and iodine in Group VII with Cl/Br — because chemical behaviour (valency, compound formulae) was his primary classifier and atomic weight only the ordering aid. The same inversions (Ar/K, Co/Ni) exposed the limit of weight-based ordering and pointed toward atomic number.', outcome: 'Mendeleev\'s genius was trusting chemistry over arithmetic; the \'anomalous pairs\' later became evidence that atomic number, not weight, is the real ordering parameter.' },
                { text: 'The member is right — periodic law means strict weight order, so Te stays before I even if properties mismatch.', outcome: 'That misreads the law: Mendeleev broke weight order whenever chemistry demanded it — properties were the function, weight just the rough index.', reveals: 'weight-order-is-absolute' },
                { text: 'Leave both out of the table — elements that don\'t fit the order get discarded.', outcome: 'Mendeleev did the opposite: he left deliberate gaps for unknown elements (eka-aluminium, eka-silicon) but never dropped a known one for misbehaving.', reveals: 'misfits-get-discarded' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_03_013', title: 'You made it',
          caseStudy: { intro: 'The periodic table works because electron configurations repeat — atomic number just made the pattern honest.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_013', difficulty: 'standard',
          question: 'The anomalous properties of second period elements refer to the distinct.',
          hint: 'Revisit the orbital filling diagram for n=2 (c11_chem_cbse_03_004) and the definition.',
          misconception: 'Students often think the anomalous behavior is only due to "small size" and forget the crucial role of unavailable.',
          parts: [
                { id: 'a', prompt: 'Predict the formula of the stable fluoride anion of silicon and germanium. Justify your prediction using the concept of maximum covalency.', answer: 'Silicon (second period?',
                  options: ['Silicon (second period?', 'small size', 'says both form MF₆²⁻ ignores the orbital restriction on second period elements'],
                  hint: 'Revisit the orbital filling diagram for n=2 (c11_chem_cbse_03_004) and the definition of charge.',
                  misconception: 'Students often think the anomalous behavior is only due to "small size" and forget the crucial role of unavailable d‑orbitals.' }
          ],
            remediations: { 'the-anomalous-behavior-is-only': { steps: ['If a student cannot explain the covalency limit, have them draw the valence orbital diagram for carbon (2s, 2pₓ, 2pᵧ.', 'Ask: "How many hybrid orbitals can carbon make?', 'How many can silicon make?" Then show that sp³d² requires d‑orbitals.', 'Use the periodic table to highlight that second period elements have n=2, so l max = 1 (no d orbitals).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the anomalous behavior is only due to "small size" and forget the crucial role of unavailable.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The diagonal relationship between Li and Mg arises because their atomic radii are nearly identical." Is this sufficient?', answer: 'The statement is insufficient',
                  options: ['The statement is insufficient', 'small size'],
                  hint: 'Revisit the orbital filling diagram for n=2 (c11_chem_cbse_03_004) and the definition of charge.',
                  misconception: 'Students often think the anomalous behavior is only due to "small size" and forget the crucial role of unavailable d‑orbitals.' },
                { id: 'b', prompt: 'Design a simple experiment using household materials to demonstrate that beryllium chloride (BeCl₂) is more covalent than magnesium chloride (MgCl₂).', answer: 'A good answer: Dissolve equal amounts of BeCl₂ and MgCl₂ in ethanol',
                  options: ['A good answer: Dissolve equal amounts of BeCl₂ and MgCl₂ in ethanol', 'small size'],
                  hint: 'Revisit the orbital filling diagram for n=2 (c11_chem_cbse_03_004) and the definition of charge.',
                  misconception: 'Students often think the anomalous behavior is only due to "small size" and forget the crucial role of unavailable d‑orbitals.' }
          ],
            remediations: { 'the-anomalous-behavior-is-only': { steps: ['If a student cannot explain the covalency limit, have them draw the valence orbital diagram for carbon (2s, 2pₓ, 2pᵧ.', 'Ask: "How many hybrid orbitals can carbon make?', 'How many can silicon make?" Then show that sp³d² requires d‑orbitals.', 'Use the periodic table to highlight that second period elements have n=2, so l max = 1 (no d orbitals).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
