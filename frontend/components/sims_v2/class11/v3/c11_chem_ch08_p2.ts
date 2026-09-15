import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch08_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch08_p2: SimDef = {
    id: 'v3_c11_chem_ch08_p2',
    title: 'Redox Reactions · Part 2/2',
    subtitle: 'Track electrons with oxidation numbers even where oxygen never appears.',
    classLevel: 11, subject: 'chemistry', topic: 'Redox Reactions · Part 2/2',
    chapters: ['c11_chem_ch08'],
    nodeIds: ['c11_chem_cbse_08_007', 'c11_chem_cbse_08_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a redox auditor tracing electron transfers', intro: 'A nail rusts and a copper wire grows a coat of silver — count who lost electrons and who collected them.', goal: 'Define oxidation and reduction beyond oxygen and assign oxidation numbers correctly.' },
    discovery: {
        question: 'Hydrogen burns in chlorine — H2 + Cl2 → 2HCl — with no oxygen anywhere in sight. Is anything being oxidised?',
        options: ['Yes — hydrogen loses electrons to chlorine; oxidation needs no oxygen', 'No — oxidation requires oxygen by definition', 'Only chlorine is oxidised, since it gains the hydrogen', 'Neither — this is just a combination reaction'],
        answer: 'Yes — hydrogen loses electrons to chlorine; oxidation needs no oxygen',
        hook: 'Oxygen lent its name to oxidation, but electron loss is the real event — no O2 required.',
    },
    teaching: [
        { title: 'Disproportionation and Comproportionation Reactions', text: 'Disproportionation is a redox reaction in which a single element in one oxidation state simultaneously undergoes oxidation and reduction to form two different products with higher and lower oxidation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_08_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Assign oxidation numbers across sulfur\'s compounds and explain why the two nitrogens in NH4NO3 carry different oxidation states.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_007', title: 'Disproportionation and Comproportionation Reactions',
          scaffold: { problem: 'Chlorine gas is passed through cold dilute NaOH solution. Write the balanced ionic equation for the disproportionation reaction and.',
            steps: [
            { text: 'Identify reactants and products. Cl₂ (oxidation state 0) reacts with OH⁻ to form Cl⁻ (-1) and ClO⁻ (+1).' },
            { text: 'Write half-reactions. Reduction: Cl₂ + 2e⁻ → 2Cl⁻. Oxidation: Cl₂ + 4OH⁻ → 2ClO⁻ + 2H₂O + 2e⁻.' },
            { text: 'Add half-reactions. Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O. (Balanced for atoms and charge).' },
            { text: 'Mole ratio from equation: 1 mol Cl₂ gives 1 mol Cl⁻ and 1 mol ClO⁻.' },
            { text: 'Calculate moles of Cl₂ = 7.1 g / 71 g/mol = 0.1 mol. Thus 0.1 mol NaCl and 0.1 mol NaClO formed.' },
            { text: 'Mass NaCl = 0.1 × 58.5 = 5.85 g. Mass NaClO = 0.1 × 74.5 = 7.45 g.', faded: true, blankAnswer: 'Ionic equation: Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O. Products.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_08_008', title: 'Applications of Redox Reactions',
          scaffold: { problem: 'A 0.5 g sample of impure iron wire (containing Fe and inert impurities) is dissolved in dilute H₂SO₄ to convert all iron to Fe²⁺.',
            steps: [
            { text: 'Identify the redox reaction: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (n-factor = 6); Fe²⁺ → Fe³⁺ + e⁻ (n-factor = 1).' },
            { text: 'Calculate equivalents of K₂Cr₂O₇ used = Molarity × Volume(L) × n-factor = 0.02 × 0.0224 × 6 = 0.002688 eq.' },
            { text: 'Equivalents of Fe²⁺ in 25 mL aliquot = equivalents of K₂Cr₂O₇ = 0.002688 eq (by equivalence principle).' },
            { text: 'Equivalents of Fe²⁺ in 100 mL total solution = 0.002688 × (100/25) = 0.010752 eq.' },
            { text: 'Moles of Fe = Equivalents / n-factor = 0.010752 / 1 = 0.010752 mol. Mass of pure Fe = 0.010752 × 56 = 0.6021 g.' },
            { text: 'Percentage purity = (mass pure Fe / mass sample) × 100 = (0.6021 / 0.5) × 100 = 120.4% → IMPOSSIBLE!', faded: true, blankAnswer: '60.2% (assuming 1.0 g sample; with 0.5 g sample the data.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a redox worksheet you must spot what\'s oxidised in three reactions: (a) 2Cu + O2 → 2CuO, (b) H2 + Cl2 → 2HCl, (c) 2Na + Cl2 → 2NaCl. A teammate marks only (a): \'Oxidation needs oxygen — the other two have no O2, so they aren\'t redox.\'',
            decisions: [{ prompt: 'Which reactions are redox, and what is oxidised in each?', options: [
                { text: 'All three are redox. (a) Cu gains oxygen. (b) H2 is oxidised — it gains the electronegative element Cl (equivalently loses electrons); Cl2 is reduced. (c) Na is oxidised — loss of electrons to the electronegative Cl. The classical definition covers O-gain, H-loss, electropositive-loss, electronegative-gain — oxygen isn\'t required.', outcome: 'Oxygen-transfer is only the oldest face of oxidation; the broader classical criteria and electron-loss view catch every redox reaction.' },
                { text: 'Only (a) — no oxygen, no oxidation; the other two are just combination reactions.', outcome: 'H2 + Cl2 and Na + Cl2 involve clear electron transfer and electronegative-element gain — textbook redox with zero oxygen involved.', reveals: 'oxidation-needs-oxygen' },
                { text: 'In (b) chlorine is oxidised because it \'takes\' the hydrogen — taking something must be oxidation.', outcome: 'Backwards: gaining an electronegative element (Cl) oxidises H2; chlorine itself is reduced by gaining electrons/hydrogen-company.', reveals: 'gainer-is-oxidised' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_08_008', title: 'You made it',
          caseStudy: { intro: 'Oxidation numbers are bookkeeping, not real charges — but they catch every electron that changes hands.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_007', difficulty: 'standard',
          question: 'Disproportionation is a redox reaction in which a single element in one.',
          hint: 'Review oxidation number rules (especially for peroxides, superoxides, and transition.',
          misconception: 'Students often think any reaction where the same element appears in reactants and products with different oxidation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Disproportionation is a redox reaction in',
                  options: ['Disproportionation is a redox reaction in', 'Classical oxidation is defined as a chemical process involving addition of oxygen or an', 'Oxidation number (oxidation state) is a signed integer assigned to an atom in a chemical', 'The half-reaction method (ion-electron method) balances redox reactions by separating the'],
                  hint: 'Review oxidation number rules (especially for peroxides, superoxides, and transition metal.',
                  misconception: 'Students often think any reaction where the same element appears in reactants and products with different oxidation states.' }
          ],
            remediations: { 'any-reaction-where-the-same': { steps: ['Write oxidation states of ALL atoms in reactants and products.', 'Identify the element of interest.', 'Check if that element\'s oxidation state increases in one product AND decreases in another.', 'If yes, it\'s disproportionation; if only one change, it\'s not. Practice with KClO₃ decomposition vs.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_08_008', difficulty: 'standard',
          question: 'Applications of redox reactions encompass the practical utilization.',
          hint: 'Revisit c11_chem_cbse_08_003 (half-reaction method) and c11_chem_cbse_08_004 (oxidation.',
          misconception: 'Students confuse the n-factor of K₂Cr₂O₇ in acidic medium: they often use n-factor = 3 (thinking each Cr gains 3.',
          parts: [
                { id: 'a', prompt: 'Compare the thermodynamic feasibility of extracting iron from Fe₂O₃ using carbon (coke) versus aluminium (thermite process) at high temperatures, using.', answer: 'Carbon reduction: Fe₂O₃ + 3C → 2Fe + 3CO; ΔG becomes negative above ~700°C',
                  options: ['Carbon reduction: Fe₂O₃ + 3C → 2Fe + 3CO; ΔG becomes negative above ~700°C', 'Al is more reactive so it always works better'],
                  hint: 'Revisit c11_chem_cbse_08_003 (half-reaction method) and c11_chem_cbse_08_004 (oxidation number.',
                  misconception: 'Students confuse the n-factor of K₂Cr₂O₇ in acidic medium: they often use n-factor = 3 (thinking each Cr gains 3 electrons, Cr₂O₇²⁻ →.' }
          ],
            remediations: { 'students-confuse-the-n-factor': { steps: ['Write the balanced half-reaction for the oxidising agent in the specific medium (e.g., Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺.', 'Count total electrons on the left side – that is the n-factor (here, 6).', 'Equivalent weight = Molar mass / n-factor.', 'Practice with a table: Agent | Half-reaction | e⁻ gained | n-factor | Eq. wt.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
