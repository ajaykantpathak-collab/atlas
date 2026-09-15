import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch09_p1: SimDef = {
    id: 'v3_c12_chem_ch09_p1',
    title: 'Amines · Part 1/2',
    subtitle: 'A phenyl ring counts as one — the counting rule that fixes amine classification',
    classLevel: 12, subject: 'chemistry', topic: 'Amines · Part 1/2',
    chapters: ['c12_chem_ch09'],
    nodeIds: ['c12_chem_cbse_09_001', 'c12_chem_cbse_09_002', 'c12_chem_cbse_09_003', 'c12_chem_cbse_09_004', 'c12_chem_cbse_09_005', 'c12_chem_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Medicinal chemist', intro: 'From the burn of chilli to the dyes in your clothes, nitrogen\'s lone pair runs the show. Amines are ammonia, upgraded.', goal: 'Classify amines by substitution on nitrogen and connect structure to basicity and characteristic reactions.' },
    discovery: {
        question: 'Aniline\'s nitrogen touches a phenyl ring and two hydrogens — a student calls it \'tertiary\' because the ring has two carbons near the N. What\'s the actual class?',
        options: ['Primary — classification counts carbon groups bonded to N (one phenyl = one group), so only one of ammonia\'s hydrogens was replaced', 'Tertiary — the ring contributes two bonds to nitrogen', 'Secondary — one ring plus one hydrogen equals two', 'Quaternary — the ring counts double'],
        answer: 'Primary — classification counts carbon groups bonded to N (one phenyl = one group), so only one of ammonia\'s hydrogens was replaced',
        hook: 'Amines are ammonia with hydrogens swapped for carbon groups — count the swaps, not the atoms. A phenyl ring is ONE substituent however big it looks. This single counting rule unlocks the whole chapter\'s nomenclature and the diazonium chemistry that follows.',
    },
    teaching: [
        { title: 'Classification of Amines: Primary, Secondary, Tertiary', text: 'Amines are organic derivatives of ammonia (NH₃) in which one, two, or all three hydrogen atoms are replaced by alkyl or aryl groups, classified as primary (RNH₂/ArNH₂), secondary (R₂NH/RNHR\'),.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_09_001', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Sort the nitrogen world: draw every C₃H₉N isomer, stamp each as 1°/2°/3° and simple or mixed, then chase the lone pair through basicity battles and the reactions that make dyes and drugs.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_09_002', title: 'Nomenclature of Amines: IUPAC Rules',
          caseStudy: { intro: 'Observe a medicine strip of "Cetirizine" (an antihistamine) — its chemical name contains "diamine" and "chloro" substituents.',
            decisions: [{ prompt: 'Write the IUPAC name of CH₃CH₂CH₂NH₂.', options: [
                { text: 'Propan-1-amine', outcome: 'Propan-1-amine. A wrong answer like "propylamine" reveals the student is using common naming.' },
                { text: 'propylamine', outcome: 'Not quite — Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller.', reveals: 'students-often-name-secondary-amines' },
                { text: 'propanamine', outcome: 'Not quite — Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller.', reveals: 'students-often-name-secondary-amines' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_003', title: 'Preparation of Amines: Reduction of Nitro Compounds',
          scaffold: { problem: 'In a lab preparation, 12.3 g of nitrobenzene (C₆H₅NO₂, molar mass 123 g/mol) is reduced to aniline using Sn/HCl.',
            steps: [
            { text: 'Calculate moles of nitrobenzene = mass / molar mass = 12.3 g / 123 g/mol = 0.1 mol.' },
            { text: 'From balanced equation, 1 mol nitrobenzene requires 3 mol Sn. So theoretical moles of Sn = 0.1 × 3 = 0.3 mol.' },
            { text: 'Theoretical mass of Sn = 0.3 mol × 118.7 g/mol = 35.61 g.' },
            { text: 'Since yield is 85%, actual mass needed = theoretical / 0.85 = 35.61 / 0.85 = 41.89 g.' },
            { text: 'Round to appropriate significant figures: 41.9 g of Sn.', faded: true, blankAnswer: '41.9 g of Sn' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_004', title: 'Preparation of Amines: Gabriel Phthalimide Synthesis',
          scaffold: { problem: 'A student wants to prepare pure butan-1-amine (CH₃CH₂CH₂CH₂NH₂) in the lab using Gabriel synthesis.',
            steps: [
            { text: 'Identify the three stages: (a) formation of potassium phthalimide, (b) N-alkylation, (c) alkaline hydrolysis.' },
            { text: 'Write balanced equations for each stage with states and conditions.' },
            { text: 'Determine limiting reagent. Both phthalimide and 1-bromobutane are 0.1 mol, so 1:1 stoichiometry in alkylation step.' },
            { text: 'Molar mass of butan-1-amine (C₄H₁₁N) = 73.14 g/mol. Theoretical mass = 0.1 mol × 73.14 g/mol = 7.314 g.' },
            { text: 'Actual yield at 85% = 0.85 × 7.314 g = 6.22 g (rounded to 6.2 g).', faded: true, blankAnswer: 'Sequence as above; theoretical yield 7.31 g, actual yield.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_09_005', title: 'Preparation of Amines: Hoffmann Bromamide Degradation',
          scaffold: { problem: 'An organic compound A (C₄H₉NO) on treatment with Br₂/NaOH gives compound B (C₃H₉N).',
            steps: [
            { text: 'Identify functional groups. A (C₄H₉NO) has one N, one O — likely an amide (C₃H₇CONH₂ = butanamide, MW = 87 g/mol).' },
            { text: 'Write Hoffmann degradation: C₃H₇CONH₂ + Br₂ + 4NaOH → C₃H₇NH₂ + Na₂CO₃ + 2NaBr + 2H₂O. Carbon count: 4 → 3, consistent.' },
            { text: 'Stoichiometry: 1 mol A → 1 mol B. Moles of A = 8.9 g / 87 g/mol = 0.1023 mol.' },
            { text: 'Moles of B = 0.1023 mol. Mass of B = 0.1023 mol × 59 g/mol = 6.036 g ≈ 6.04 g.' },
            { text: 'Verify: Mass loss = 8.9 – 6.04 = 2.86 g ≈ CO₂ (44 g/mol × 0.1023 = 4.5 g) + 2HBr etc. — consistent with byproducts.', faded: true, blankAnswer: 'A = butanamide (CH₃CH₂CH₂CONH₂), B = propanamine.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_09_006', title: 'Physical Properties of Amines: Boiling Point and Solubility',
          caseStudy: { intro: 'Observe a bottle of methylamine (gas, fishy smell) versus aniline (liquid, darkens on standing) in the lab — the difference hits you immediately.',
            decisions: [{ prompt: 'A student writes: "Tertiary amines have higher boiling points than primary amines because they have more alkyl groups which increase van.', options: [
                { text: 'No', outcome: 'No. The statement is incorrect because tertiary amines lack N–H bonds and cannot form.' },
                { text: 'more alkyl groups = higher b.p', outcome: 'Not quite — Students often confuse the boiling point trend in amines with that in alkanes: they think "more.', reveals: 'students-often-confuse-the-boiling' },
                { text: 'more alkyl groups = higher boiling point', outcome: 'Not quite — Students often confuse the boiling point trend in amines with that in alkanes: they think "more.', reveals: 'students-often-confuse-the-boiling' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Labelling a bottle of aniline, a student writes \'tertiary amine\' — nitrogen, he argues, is attached to three atoms: two ring carbons and a hydrogen.',
            decisions: [{ prompt: 'Is aniline a tertiary amine?', options: [
                { text: 'No — classify by how many of ammonia\'s hydrogens are replaced by carbon groups: the phenyl ring is one group and two H remain, so C₆H₅NH₂ is a primary amine.', outcome: 'You count attached groups, not total bonds at nitrogen; counting the ring\'s two carbons separately is the exact slip being tested.' },
                { text: 'Yes — the atom count on nitrogen is three, and that decides the class.', outcome: 'By that rule NH₃ itself would be tertiary; the class tracks substitution of H on ammonia, not the atom tally on N.', reveals: 'count-bonds-not-groups' },
                { text: 'No — it\'s a secondary amine, and (CH₃)₂NH is mixed because it carries two methyl groups.', outcome: 'Two identical methyls make dimethylamine simple, not mixed; \'mixed\' needs differing groups — and aniline with two H is primary regardless.', reveals: 'two-groups-means-mixed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read any amine\'s structure and predict its class, basicity and reactions. Amines close the organic syllabus — and they carry the heaviest mechanism weight.',
            decisions: [{ prompt: 'What comes next? Amines · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Amines · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_001', difficulty: 'standard',
          question: 'Amines are organic derivatives of ammonia (NH₃) in which one, two, or all three.',
          hint: 'If unable to draw correct amine structures, review c11_chem_cbse_04_003 (Lewis.',
          misconception: 'Students often classify amines by counting the total number of carbon atoms attached to nitrogen (e.g., calling.',
          parts: [
                { id: 'a', prompt: 'Compare the bond angles in NH₃, CH₃NH₂, and (CH₃)₃N. Predict the trend and justify using hybridisation and lone pair repulsion.', answer: 'All are sp³ hybridised with a lone pair',
                  options: ['All are sp³ hybridised with a lone pair', 'angles increase because alkyl groups are larger'],
                  hint: 'If unable to draw correct amine structures, review c11_chem_cbse_04_003 (Lewis structures) and.',
                  misconception: 'Students often classify amines by counting the total number of carbon atoms attached to nitrogen (e.g., calling CH₃NHCH₃ primary because.' }
          ],
            remediations: { 'students-often-classify-amines-by': { steps: ['Revisit c11_chem_cbse_04_003 (Lewis structures) to practice drawing NH₃ and its derivatives with correct valence.', 'Use physical models: start with NH₃ (3 H, 1 lone pair), replace one H with CH₃ → CH₃NH₂ (primary); replace second H →.', 'Re-diagnostic: Given CH₃CH₂NHCH₂CH₃, state classification and simple/mixed in 30 seconds.', 'If wrong, repeat model-building with ethyl groups.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_002', difficulty: 'standard',
          question: 'IUPAC nomenclature of amines systematically names amines by identifying the.',
          hint: 'If stuck, review Class 10 IUPAC naming of alkanes (c10_chem_cbse_04_008) and amine.',
          misconception: 'Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller group as parent).',
          parts: [
                { id: 'a', prompt: 'Write the IUPAC name of CH₃CH₂CH₂NH₂.', answer: 'Propan-1-amine',
                  options: ['Propan-1-amine', 'propylamine', 'propanamine'],
                  hint: 'If stuck, review Class 10 IUPAC naming of alkanes (c10_chem_cbse_04_008) and amine classification.',
                  misconception: 'Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller group as parent) because they think the.' },
                { id: 'b', prompt: 'Name the following amine: (CH₃)₂CHNH₂.', answer: 'Propan-2-amine',
                  options: ['Propan-2-amine', 'isopropylamine', '2-aminopropane'],
                  hint: 'If stuck, review Class 10 IUPAC naming of alkanes (c10_chem_cbse_04_008) and amine classification.',
                  misconception: 'Students often name secondary amines like CH₃NHCH₂CH₃ as "N-ethylmethanamine" (choosing the smaller group as parent) because they think the.' }
          ],
            remediations: { 'students-often-name-secondary-amines': { steps: ['If the student consistently picks the wrong parent chain: 1) Revisit c10_chem_cbse_04_008 (IUPAC alkane naming).', '2) Draw 5 secondary amine structures, circle the largest alkyl group in each, write parent alkanamine name, then add.', '3) Use the "parent = largest alkyl group" rule as a checklist.', '4) Re-attempt Diagnostic Question 3 and 5.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_003', difficulty: 'standard',
          question: 'Reduction of nitro compounds is a key laboratory and industrial method for.',
          hint: 'Review Class 11 redox balancing (c11_chem_cbse_08_003) and oxidation number rules.',
          misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen.',
          parts: [
                { id: 'a', prompt: 'What is the change in oxidation state of nitrogen when nitrobenzene (C₆H₅NO₂) is reduced to aniline (C₆H₅NH₂)?', answer: 'In nitrobenzene, nitrogen is in +3 oxidation state (each O is –2, total –4',
                  options: ['In nitrobenzene, nitrogen is in +3 oxidation state (each O is –2, total –4', 'hydrogen adds across the double bond'],
                  hint: 'Review Class 11 redox balancing (c11_chem_cbse_08_003) and oxidation number rules.',
                  misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen adds across the.' },
                { id: 'b', prompt: 'Why is iron scrap with HCl preferred over tin with HCl for industrial reduction of nitrobenzene?', answer: 'Fe/HCl is preferred',
                  options: ['Fe/HCl is preferred', 'iron is cheaper', 'hydrogen adds across the double bond'],
                  hint: 'Review Class 11 redox balancing (c11_chem_cbse_08_003) and oxidation number rules.',
                  misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen adds across the.' },
                { id: 'c', prompt: 'Write the balanced chemical equation for the reduction of 1-nitropropane (CH₃CH₂CH₂NO₂) to 1-aminopropane using Sn/HCl. Include states.', answer: 'CH₃CH₂CH₂NO₂(l) + 6[H] → CH₃CH₂CH₂NH₂(l) + 2H₂O(l)',
                  options: ['CH₃CH₂CH₂NO₂(l) + 6[H] → CH₃CH₂CH₂NH₂(l) + 2H₂O(l)', 'hydrogen adds across the double bond'],
                  hint: 'Review Class 11 redox balancing (c11_chem_cbse_08_003) and oxidation number rules.',
                  misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen adds across the.' },
                { id: 'd', prompt: 'Compare the products of catalytic hydrogenation of nitrobenzene vs. reduction with Zn/NH₄Cl (neutral medium). Are they the same? Explain.', answer: 'Both give aniline as the major product',
                  options: ['Both give aniline as the major product', 'they are identical', 'hydrogen adds across the double bond'],
                  hint: 'Review Class 11 redox balancing (c11_chem_cbse_08_003) and oxidation number rules.',
                  misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen adds across the.' }
          ],
            remediations: { 'reduction-of-nitro-compounds-with': { steps: ['Revisit Class 11 redox balancing (c11_chem_cbse_08_003, c11_chem_cbse_08_004) to practice half-reaction method for.', 'Write the half-reactions: NO₂⁻ + 6H⁺ + 6e⁻ → NH₂⁻ + 2H₂O (in acid) and combine with oxidation of Sn or Fe.', 'Do a stoichiometry drill: calculate grams of Sn needed for 10 g nitrobenzene (molar mass 123 g/mol).', 'Re-diagnostic: Ask the student to explain why Fe/HCl regenerates acid but Sn/HCl does not.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen.',
          parts: [
                { id: 'a', prompt: 'A student writes the reduction of nitrobenzene with H₂/Pd as: C₆H₅NO₂ + H₂ → C₆H₅NH₂ + H₂O. Is this equation balanced? If not, correct it.', answer: 'Not balanced',
                  options: ['Not balanced', 'hydrogen adds across the double bond'],
                  hint: 'Review Class 11 redox balancing (c11_chem_cbse_08_003) and oxidation number rules.',
                  misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen adds across the.' },
                { id: 'b', prompt: 'Design a small-scale lab experiment to confirm that the product of nitrobenzene reduction with Sn/HCl is aniline.', answer: 'Reagents: nitrobenzene, Sn granules, conc',
                  options: ['Reagents: nitrobenzene, Sn granules, conc', 'hydrogen adds across the double bond'],
                  hint: 'Review Class 11 redox balancing (c11_chem_cbse_08_003) and oxidation number rules.',
                  misconception: 'Students often think that reduction of nitro compounds with H₂/Pd gives a secondary or tertiary amine because "hydrogen adds across the.' }
          ],
            remediations: { 'reduction-of-nitro-compounds-with': { steps: ['Revisit Class 11 redox balancing (c11_chem_cbse_08_003, c11_chem_cbse_08_004) to practice half-reaction method for.', 'Write the half-reactions: NO₂⁻ + 6H⁺ + 6e⁻ → NH₂⁻ + 2H₂O (in acid) and combine with oxidation of Sn or Fe.', 'Do a stoichiometry drill: calculate grams of Sn needed for 10 g nitrobenzene (molar mass 123 g/mol).', 'Re-diagnostic: Ask the student to explain why Fe/HCl regenerates acid but Sn/HCl does not.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_004', difficulty: 'standard',
          question: 'Gabriel phthalimide synthesis is a laboratory method for preparing pure primary.',
          hint: 'Review Class 12 Haloalkanes chapter (SN2 vs SN1, reactivity order RI > RBr > RCl, steric.',
          misconception: 'Students often think Gabriel synthesis works for *any* primary amine, including aromatic ones like aniline.',
          parts: [
                { id: 'a', prompt: 'What is the nucleophile in the key C–N bond-forming step of Gabriel phthalimide synthesis, and what is its structure?', answer: 'The nucleophile is the potassium salt of phthalimide (phthalimide anion)',
                  options: ['The nucleophile is the potassium salt of phthalimide (phthalimide anion)', 'phthalimide itself'],
                  hint: 'Review Class 12 Haloalkanes chapter (SN2 vs SN1, reactivity order RI > RBr > RCl, steric hindrance).',
                  misconception: 'Students often think Gabriel synthesis works for *any* primary amine, including aromatic ones like aniline.' },
                { id: 'b', prompt: 'Why does Gabriel synthesis reliably stop at the primary amine and not produce secondary/tertiary amines or quaternary ammonium salts, unlike direct ammonolysis.', answer: 'In Gabriel synthesis, the nitrogen is part of a cyclic imide (phthalimide)',
                  options: ['In Gabriel synthesis, the nitrogen is part of a cyclic imide (phthalimide)', 'because excess ammonia is used'],
                  hint: 'Review Class 12 Haloalkanes chapter (SN2 vs SN1, reactivity order RI > RBr > RCl, steric hindrance).',
                  misconception: 'Students often think Gabriel synthesis works for *any* primary amine, including aromatic ones like aniline.' }
          ],
            remediations: { 'gabriel-synthesis-works-for-any': { steps: ['Revisit SN2 mechanism requirements (backside attack, primary > secondary, no tertiary/aryl) using Class 12 Haloalkanes.', 'Draw the phthalimide anion resonance structures to see why nitrogen is nucleophilic but becomes non-nucleophilic after.', 'Practice 5 synthesis-design problems: given a target primary amine, pick the correct alkyl halide (or say "not.', 'Redo Diagnostic Questions 3 and 5 until the alkyl/aryl distinction is automatic.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_005', difficulty: 'standard',
          question: 'Hoffmann bromamide degradation is a reaction where a primary amide (R–CONH₂).',
          hint: 'Review amide hydrolysis (acidic/basic), nucleophilic substitution at carbonyl, and the.',
          misconception: 'Students often write the product as R–CH₂NH₂ (same carbon count) instead of R–NH₂ (one carbon less), because they.',
          parts: [
                { id: 'a', prompt: 'Explain why the amine product in Hoffmann degradation has one carbon less than the starting amide. What happens to the carbonyl carbon?', answer: 'The carbonyl carbon is lost as CO₂ (captured as Na₂CO₃/NaHCO₃ in basic medium)',
                  options: ['The carbonyl carbon is lost as CO₂ (captured as Na₂CO₃/NaHCO₃ in basic medium)', 'carbon is lost as CO', 'no carbon loss'],
                  hint: 'Review amide hydrolysis (acidic/basic), nucleophilic substitution at carbonyl, and the concept.',
                  misconception: 'Students often write the product as R–CH₂NH₂ (same carbon count) instead of R–NH₂ (one carbon less), because they confuse Hoffmann.' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['Revisit the mechanism stepwise: (1) Write amide + Br₂/NaOH → N-bromoamide.', '(2) Base abstracts N–H → anion.', '(3) Rearrangement: R migrates to N with Br⁻ loss → isocyanate R–N=C=O.', '(4) Hydrolysis: isocyanate + 2NaOH → R–NH₂ + Na₂CO₃ + H₂O.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_09_006', difficulty: 'standard',
          question: 'Physical properties of amines refer to the observable characteristics (state.',
          hint: 'If unable to predict boiling point order, revisit c11_chem_cbse_05_003 and draw the.',
          misconception: 'Students often confuse the boiling point trend in amines with that in alkanes: they think "more alkyl groups = higher.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Aniline (C₆H₅NH₂) is more soluble in water than cyclohexylamine (C₆H₁₁NH₂) because the phenyl group is planar and packs better." Evaluate.', answer: 'The claim is false',
                  options: ['The claim is false', 'planarity', 'more alkyl groups = higher boiling point'],
                  hint: 'If unable to predict boiling point order, revisit c11_chem_cbse_05_003 and draw the H-bonding.',
                  misconception: 'Students often confuse the boiling point trend in amines with that in alkanes: they think "more alkyl groups = higher boiling point" and.' }
          ],
            remediations: { 'students-often-confuse-the-boiling': { steps: ['Revisit c11_chem_cbse_05_003 (Hydrogen Bonding in States of Matter) — draw H-bonding diagrams for primary, secondary.', 'Revisit c11_chem_cbse_05_001 (Intermolecular Forces) — list forces in order of strength: H-bonding > dipole-dipole >.', 'Do a side-by-side comparison: butan-1-amine (two N–H) vs N-methylpropan-2-amine (one N–H) vs N,N-dimethylethanamine.', 'Re-attempt Diagnostic Question 3. If still wrong, watch a 5-min animation of H-bonding networks in liquid amines.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
