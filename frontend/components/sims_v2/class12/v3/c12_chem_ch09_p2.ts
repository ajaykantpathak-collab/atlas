import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch09_p2: SimDef = {
    id: 'v3_c12_chem_ch09_p2',
    title: 'Amines · Part 2/2',
    subtitle: 'A phenyl ring counts as one — the counting rule that fixes amine classification',
    classLevel: 12, subject: 'chemistry', topic: 'Amines · Part 2/2',
    chapters: ['c12_chem_ch09'],
    nodeIds: ['c12_chem_cbse_09_007', 'c12_chem_cbse_09_008', 'c12_chem_cbse_09_009', 'c12_chem_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Medicinal chemist', intro: 'From the burn of chilli to the dyes in your clothes, nitrogen\'s lone pair runs the show. Amines are ammonia, upgraded.', goal: 'Classify amines by substitution on nitrogen and connect structure to basicity and characteristic reactions.' },
    discovery: {
        question: 'Aniline\'s nitrogen touches a phenyl ring and two hydrogens — a student calls it \'tertiary\' because the ring has two carbons near the N. What\'s the actual class?',
        options: ['Primary — classification counts carbon groups bonded to N (one phenyl = one group), so only one of ammonia\'s hydrogens was replaced', 'Tertiary — the ring contributes two bonds to nitrogen', 'Secondary — one ring plus one hydrogen equals two', 'Quaternary — the ring counts double'],
        answer: 'Primary — classification counts carbon groups bonded to N (one phenyl = one group), so only one of ammonia\'s hydrogens was replaced',
        hook: 'Amines are ammonia with hydrogens swapped for carbon groups — count the swaps, not the atoms. A phenyl ring is ONE substituent however big it looks. This single counting rule unlocks the whole chapter\'s nomenclature and the diazonium chemistry that follows.',
    },
    teaching: [
        { title: 'Chemical Reactions of Amines: Basicity', text: 'Basicity of amines refers to their ability to act as Lewis bases by donating the lone pair of electrons on the nitrogen atom to accept a proton (H⁺) from an acid, forming an ammonium salt (R-NH₃⁺.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_09_007', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Sort the nitrogen world: draw every C₃H₉N isomer, stamp each as 1°/2°/3° and simple or mixed, then chase the lone pair through basicity battles and the reactions that make dyes and drugs.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_007', title: 'Chemical Reactions of Amines: Basicity',
          scaffold: { problem: 'The pKb values for three amines are: ethylamine (C₂H₅NH₂) = 3.29, diethylamine ((C₂H₅)₂NH) = 3.00, triethylamine ((C₂H₅)₃N) = 3.25.',
            steps: [
            { text: 'Recall pKb = –log₁₀ Kb, so Kb = 10^(–pKb). Calculate each: Ethylamine: Kb = 10^(–3.29) = 5.13 × 10⁻⁴.' },
            { text: 'Compare Kb values: larger Kb = stronger base. Order: Diethylamine (1.00×10⁻³) > Triethylamine (5.62×10⁻⁴) > Ethylamine.' },
            { text: 'For gas phase, only inductive effect matters: three ethyl groups donate more electron density than two, which donate.' },
            { text: 'In aqueous phase, the conjugate acids are solvated. (C₂H₅)₃NH⁺ has three bulky ethyl groups that sterically hinder.' },
            { text: 'Verify with NCERT Table 9.3: the given pKb values match the order (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃.', faded: true, blankAnswer: '(a) Kb(C₂H₅NH₂) = 5.13×10⁻⁴, Kb((C₂H₅)₂NH) = 1.00×10⁻³.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Labelling a bottle of aniline, a student writes \'tertiary amine\' — nitrogen, he argues, is attached to three atoms: two ring carbons and a hydrogen.',
            decisions: [{ prompt: 'Is aniline a tertiary amine?', options: [
                { text: 'No — classify by how many of ammonia\'s hydrogens are replaced by carbon groups: the phenyl ring is one group and two H remain, so C₆H₅NH₂ is a primary amine.', outcome: 'You count attached groups, not total bonds at nitrogen; counting the ring\'s two carbons separately is the exact slip being tested.' },
                { text: 'Yes — the atom count on nitrogen is three, and that decides the class.', outcome: 'By that rule NH₃ itself would be tertiary; the class tracks substitution of H on ammonia, not the atom tally on N.', reveals: 'count-bonds-not-groups' },
                { text: 'No — it\'s a secondary amine, and (CH₃)₂NH is mixed because it carries two methyl groups.', outcome: 'Two identical methyls make dimethylamine simple, not mixed; \'mixed\' needs differing groups — and aniline with two H is primary regardless.', reveals: 'two-groups-means-mixed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'You can now read any amine\'s structure and predict its class, basicity and reactions. Amines close the organic syllabus — and they carry the heaviest mechanism weight.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_007', difficulty: 'standard',
          question: 'Basicity of amines refers to their ability to act as Lewis bases by donating.',
          hint: 'If stuck, review c11_chem_cbse_07_009 (Ionisation of Acids and Bases) for Kb/pKb, and.',
          misconception: 'Students often memorize the aqueous basicity order for methylamines as "secondary > primary > tertiary" and for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Basicity of amines refers to their ability to act as Lewis bases by donating the lone',
                  options: ['Basicity of amines refers to their ability to act as Lewis bases by donating the lone', 'Amines are organic derivatives of ammonia (NH₃) in', 'IUPAC nomenclature of amines systematically names amines by identifying the parent alkane', 'Reduction of nitro compounds is a key laboratory and industrial method for preparing'],
                  hint: 'If stuck, review c11_chem_cbse_07_009 (Ionisation of Acids and Bases) for Kb/pKb, and.',
                  misconception: 'Students often memorize the aqueous basicity order for methylamines as "secondary > primary > tertiary" and for ethylamines as "secondary >.' }
          ],
            remediations: { 'students-often-memorize-the-aqueous': { steps: ['If a student cannot explain the aqueous vs.', 'gas phase order, have them: (1) Revisit c11_chem_cbse_04_007 (Hybridisation) to recall sp³ geometry and bond angles.', 'Then re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_008', difficulty: 'standard',
          question: 'The carbylamine reaction (isocyanide test) is a qualitative chemical test where.',
          hint: 'If stuck, revisit c12_chem_cbse_09_001 and practice classifying 10 amine structures.',
          misconception: 'Students frequently write the product as **nitrile (R–C≡N)** instead of **isocyanide (R–N≡C)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The carbylamine reaction (isocyanide test) is a qualitative chemical test where primary',
                  options: ['The carbylamine reaction (isocyanide test) is a qualitative chemical test where primary', 'Amines are organic derivatives of ammonia (NH₃) in', 'IUPAC nomenclature of amines systematically names amines by identifying the parent alkane', 'Reduction of nitro compounds is a key laboratory and industrial method for preparing'],
                  hint: 'If stuck, revisit c12_chem_cbse_09_001 and practice classifying 10 amine structures (including.',
                  misconception: 'Students frequently write the product as **nitrile (R–C≡N)** instead of **isocyanide (R–N≡C)**.' }
          ],
            remediations: { 'students-frequently-write-the-product': { steps: ['Revisit **c12_chem_cbse_09_001** (Classification of Amines) and draw the structures of primary, secondary, tertiary.', 'Review the reaction stoichiometry: write the equation for methylamine → methyl isocyanide, balancing Cl and H atoms.', 'Watch a lab demonstration video of the carbylamine test (note the colourless reaction mixture but *overpowering smell*).', 'Re-attempt **DIAGNOSTIC_QUESTION_2** and **DIAGNOSTIC_QUESTION_5** — if you still confuse nitrile/isocyanide.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently write the product as **nitrile (R–C≡N)** instead of **isocyanide (R–N≡C)**.',
          parts: [
                { id: 'a', prompt: 'A student performs the carbylamine test on aniline (C₆H₅NH₂) using aqueous KOH instead of alcoholic KOH. Will the test work? Evaluate and explain.', answer: 'No, the test will not work (or will be very slow/inefficient)',
                  options: ['No, the test will not work (or will be very slow/inefficient)', 'it works the same'],
                  hint: 'If stuck, revisit c12_chem_cbse_09_001 and practice classifying 10 amine structures (including.',
                  misconception: 'Students frequently write the product as **nitrile (R–C≡N)** instead of **isocyanide (R–N≡C)**.' }
          ],
            remediations: { 'students-frequently-write-the-product': { steps: ['Revisit **c12_chem_cbse_09_001** (Classification of Amines) and draw the structures of primary, secondary, tertiary.', 'Review the reaction stoichiometry: write the equation for methylamine → methyl isocyanide, balancing Cl and H atoms.', 'Watch a lab demonstration video of the carbylamine test (note the colourless reaction mixture but *overpowering smell*).', 'Re-attempt **DIAGNOSTIC_QUESTION_2** and **DIAGNOSTIC_QUESTION_5** — if you still confuse nitrile/isocyanide.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_009', difficulty: 'standard',
          question: 'Diazonium salts are a class of organic compounds with the general formula.',
          hint: 'If stuck, review resonance in aniline (c12_chem_cbse_09_007) and the carbylamine test.',
          misconception: 'Students often think that the diazonium group (–N₂⁺) can be directly replaced by –NO₂ by simply adding NaNO₂/Cu (like.',
          parts: [
                { id: 'a', prompt: 'Compare the Sandmeyer reaction and the Gattermann reaction for introducing chlorine or bromine into an aromatic ring via diazonium salts.', answer: 'Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX',
                  options: ['Sandmeyer uses CuCl/CuBr (Cu⁺ salts) in corresponding HX', 'both give same yield', 'copper powder is a catalyst'],
                  hint: 'If stuck, review resonance in aniline (c12_chem_cbse_09_007) and the carbylamine test.',
                  misconception: 'Students often think that the diazonium group (–N₂⁺) can be directly replaced by –NO₂ by simply adding NaNO₂/Cu (like Sandmeyer).' }
          ],
            remediations: { 'the-diazonium-group-n-can': { steps: ['If the student cannot write the diazotisation equation or predict substitution products: (1) Revisit node.', '9.x) to see charge delocalization; (3) Make a table of 7 reactions (Cl, Br, I, F, CN, OH, H, NO₂) with reagents.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_010', difficulty: 'standard',
          question: 'A coupling reaction is an electrophilic aromatic substitution where.',
          hint: 'If stuck, revisit Class 11 Hydrocarbons chapter: electrophilic substitution mechanism and.',
          misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving.',
          parts: [
                { id: 'a', prompt: 'Why does coupling of benzenediazonium chloride with phenol require mildly alkaline conditions (NaOH), whereas coupling with aniline requires mildly acidic.', answer: 'Phenol (pKa ~10) is deprotonated to phenoxide (–O⁻) in mild alkali',
                  options: ['Phenol (pKa ~10) is deprotonated to phenoxide (–O⁻) in mild alkali', 'both need acid'],
                  hint: 'If stuck, revisit Class 11 Hydrocarbons chapter: electrophilic substitution mechanism and resonance.',
                  misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving Ar–N=N–NH–Ar\').' },
                { id: 'b', prompt: 'Compare the coupling reactivity of benzenediazonium chloride with phenol vs. nitrobenzene.', answer: 'Phenol couples readily',
                  options: ['Phenol couples readily', 'nitrobenzene couples at meta'],
                  hint: 'If stuck, revisit Class 11 Hydrocarbons chapter: electrophilic substitution mechanism and resonance.',
                  misconception: 'Students often write the coupling product as Ar–N=N–Ar\' with the –N=N– bond attached to the nitrogen of aniline (giving Ar–N=N–NH–Ar\').' }
          ],
            remediations: { 'students-often-write-the-coupling': { steps: ['Revisit c12_chem_cbse_09_009 (Diazonium Salts) and draw the resonance structures of aniline and phenol showing electron.', 'Write the mechanism of electrophilic aromatic substitution (from Class 11 hydrocarbons) showing the arenium ion.', 'Practice 5 coupling reactions with different substrates (phenol, o-cresol, p-cresol, aniline, p-toluidine) and predict.', 'Re-diagnostic: "Draw the product of coupling benzenediazonium chloride with 2-naphthol and explain why coupling occurs.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
