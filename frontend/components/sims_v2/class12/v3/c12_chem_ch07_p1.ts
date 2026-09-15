import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch07_p1: SimDef = {
    id: 'v3_c12_chem_ch07_p1',
    title: 'Alcohols, Phenols and Ethers · Part 1/2',
    subtitle: 'Three bottles, one cloudy test tube — sorting alcohols by speed',
    classLevel: 12, subject: 'chemistry', topic: 'Alcohols, Phenols and Ethers · Part 1/2',
    chapters: ['c12_chem_ch07'],
    nodeIds: ['c12_chem_cbse_07_001', 'c12_chem_cbse_07_002', 'c12_chem_cbse_07_003', 'c12_chem_cbse_07_004', 'c12_chem_cbse_07_005', 'c12_chem_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Practical organic chemist', intro: 'Sanitiser, antiseptic, fuel — alcohols are everywhere, and one structural detail decides everything they do.', goal: 'Classify alcohols, phenols and ethers by structure and predict their characteristic reactions and tests.' },
    discovery: {
        question: 'Three unlabelled bottles — butan-1-ol, butan-2-ol, 2-methylpropan-2-ol. One reagent tells them apart in ten minutes. Which, and how?',
        options: ['Lucas reagent — tertiary clouds instantly, secondary in minutes, primary stays clear; the speed tracks carbocation stability', 'Fehling\'s solution — only primary alcohols reduce it', 'Sodium metal — only tertiary alcohols fizz', 'Litmus — alcohols are acids and turn it red at different rates'],
        answer: 'Lucas reagent — tertiary clouds instantly, secondary in minutes, primary stays clear; the speed tracks carbocation stability',
        hook: 'Alcohols look identical on paper — R–OH — but the crowd around the carbinol carbon changes everything: reactivity, oxidation products, even whether oxidation is possible at all. A tertiary alcohol can\'t become a ketone because there\'s no α-hydrogen to pull.',
    },
    teaching: [
        { title: 'Classification of Alcohols: Primary, Secondary, Tertiary', text: 'Alcohols are organic compounds in which a hydroxyl (–OH) group is attached to an sp³ hybridised carbon atom of an aliphatic system; they are classified as primary (1°), secondary (2°), or tertiary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_07_001', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Run the alcohol classification lab: sort C₄H₁₀O\'s isomers into 1°, 2°, 3°, predict their Lucas test timings, and map what each class oxidises and dehydrates into — then extend the logic to phenols and ethers.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_002', title: 'Preparation of Alcohols: From Haloalkanes and Alkenes',
          caseStudy: { intro: 'Observe how adding water to an alkene in the presence of acid yields an alcohol — this is the industrial route to ethanol from ethene.',
            decisions: [{ prompt: 'Write the balanced chemical equation for the preparation of propan-2-ol from 2-bromopropane using aqueous NaOH.', options: [
                { text: 'CH3CHBrCH3 + NaOH(aq) → CH3CH(OH)CH3 + NaBr', outcome: 'CH3CHBrCH3 + NaOH(aq) → CH3CH(OH)CH3 + NaBr. Mechanism: SN1 because 2-bromopropane is a secondary.' },
                { text: 'add H2O', outcome: 'Not quite — Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without.', reveals: 'students-often-write-the-hydration' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_003', title: 'Preparation of Alcohols: From Carbonyl Compounds',
          scaffold: { problem: 'A perfume chemist needs to convert cinnamaldehyde (C₆H₅–CH=CH–CHO, an α,β-unsaturated aldehyde) to cinnamyl alcohol (C₆H₅–CH=CH–CH₂OH).',
            steps: [
            { text: 'Identify functional groups — conjugated aldehyde (–CHO) and alkene (C=C). Target: reduce only –CHO to –CH₂OH.' },
            { text: 'Recall selectivity — NaBH₄ reduces aldehydes/ketones but not isolated alkenes; LiAlH₄ also does not reduce isolated.' },
            { text: 'Choose NaBH₄ in methanol at 0°C → 25°C. It delivers hydride to the carbonyl carbon via 1,2-addition; the conjugated.' },
            { text: 'Write equation: C₆H₅–CH=CH–CHO + NaBH₄ → (after H₂O workup) C₆H₅–CH=CH–CH₂OH + NaBO₂ + H₂ (simplified).' },
            { text: 'Verify — product retains C=C (UV absorption ~280 nm unchanged), IR shows loss of aldehyde C=O stretch (1700 cm⁻¹), gain.', faded: true, blankAnswer: 'NaBH₄ in MeOH, 0°C → rt. Product: cinnamyl alcohol.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_005', title: 'Physical Properties of Alcohols and Phenols',
          caseStudy: { intro: 'Observe how ethanol (in hand sanitizer) evaporates quickly but leaves a cooling sensation, while water evaporates slower — both have –OH groups but different.',
            decisions: [{ prompt: 'State the primary reason why ethanol (C₂H₅OH) has a higher boiling point than propane (C₃H₈) despite having nearly the same molecular mass.', options: [
                { text: 'Ethanol has an –OH group enabling intermolecular hydrogen bonding, a strong dipole-dipole', outcome: 'Ethanol has an –OH group enabling intermolecular hydrogen bonding, a strong dipole-dipole.' },
                { text: 'ethanol has higher molecular mass', outcome: 'Not quite — Students often believe that phenols have lower boiling points than alcohols of similar mass because.', reveals: 'phenols-have-lower-boiling-points' },
                { text: 'nonpolar', outcome: 'Not quite — Students often believe that phenols have lower boiling points than alcohols of similar mass because.', reveals: 'phenols-have-lower-boiling-points' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_006', title: 'Chemical Reactions of Alcohols: With Metals, Acids',
          scaffold: { problem: '2.3 g of ethanol is reacted with excess sodium metal. Calculate the volume of hydrogen gas evolved at STP (molar volume = 22.4 L/mol).',
            steps: [
            { text: 'Write the balanced equation: 2CH₃CH₂OH + 2Na → 2CH₃CH₂ONa + H₂.' },
            { text: 'Calculate moles of ethanol: molar mass = 46 g/mol → 2.3/46 = 0.05 mol.' },
            { text: 'From stoichiometry, 2 mol ethanol give 1 mol H₂ → 0.05 mol ethanol gives 0.025 mol H₂.' },
            { text: 'Volume at STP = moles × 22.4 L/mol = 0.025 × 22.4 = 0.56 L = 560 mL.' },
            { text: 'Verify: 0.05 mol ethanol is a small amount; 560 mL H₂ is reasonable. Check units: g → mol → mol → L.', faded: true, blankAnswer: '0.56 L (560 mL) of H₂ gas at STP.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Three unlabelled bottles hold butan-1-ol, butan-2-ol and 2-methylpropan-2-ol. With Lucas reagent one clouds instantly, one after ~6 minutes, one stays clear — and a student concludes \'they\'re all C₄H₁₀O, so the timing is just error\'.',
            decisions: [{ prompt: 'How should she decode the observations?', options: [
                { text: 'Instant = the tertiary alcohol, ~6 min = secondary, clear = primary: Lucas runs through carbocations, whose stability runs 3° > 2° > 1°, so timing is the classification showing itself.', outcome: 'Class is decided by carbons bonded to the –OH carbon, not molecular formula — the test orders the three isomers exactly.' },
                { text: 'Same formula means same class — the timing differences are noise and the bottles are interchangeable.', outcome: 'C₄H₁₀O has two primary, one secondary and one tertiary isomer; identical formula says nothing about the carbinol carbon\'s substitution.', reveals: 'same-formula-same-alcohol-class' },
                { text: 'Instant clouding means primary — the simplest structure reacts first.', outcome: 'Primary alcohols give no room-temperature Lucas reaction at all; the instant response belongs to the stable tertiary carbocation.', reveals: 'primary-fastest-lucas' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now identify an alcohol\'s class from its behaviour alone and predict its reaction products. This chapter is organic chemistry\'s most reliable mark-bank.',
            decisions: [{ prompt: 'What comes next? Alcohols, Phenols and Ethers · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Alcohols, Phenols and Ethers · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_001', difficulty: 'standard',
          question: 'Alcohols are organic compounds in which a hydroxyl (–OH) group is attached.',
          hint: 'If unable to identify the carbinol carbon or count its carbon neighbours, revisit Class.',
          misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3.',
          parts: [
                { id: 'a', prompt: 'Consider the structure (CH₃)₃C–OH. Without drawing, explain why this must be a tertiary alcohol and why it cannot be oxidised by mild oxidising agents like PCC.', answer: 'The carbinol carbon is bonded to three methyl groups',
                  options: ['The carbinol carbon is bonded to three methyl groups', 'there are three carbons total'],
                  hint: 'If unable to identify the carbinol carbon or count its carbon neighbours, revisit Class 10 node.',
                  misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3 carbons so it\'s.' },
                { id: 'b', prompt: 'A student claims: "All secondary alcohols have the general formula R–CH(OH)–R\' where R and R\' are different alkyl groups." Analyse this statement and correct.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'secondary', 'chiral', 'unsymmetrical'],
                  hint: 'If unable to identify the carbinol carbon or count its carbon neighbours, revisit Class 10 node.',
                  misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3 carbons so it\'s.' }
          ],
            remediations: { 'students-often-classify-alcohols-by': { steps: ['Revisit Class 10 node c10_chem_cbse_04_004 (Hydrocarbons: Saturated and Unsaturated) to review carbon valency and how.', 'Practice with molecular models or paper cut-outs: build CH₃OH, CH₃CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH; physically point to the.', 'Re-attempt Diagnostic Question 3 (isomer drawing) — if still incorrect, watch a 5-minute video on "identifying.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following claim: "tert-Butyl alcohol (2-methylpropan-2-ol) is a tertiary alcohol, so it should give a positive Lucas test immediately, but it will.', answer: 'The claim is fully correct',
                  options: ['The claim is fully correct', 'it gives a mixture of alkenes', 'Lucas test is slow'],
                  hint: 'If unable to identify the carbinol carbon or count its carbon neighbours, revisit Class 10 node.',
                  misconception: 'Students often classify alcohols by counting the total number of carbon atoms in the molecule (e.g., "propanol has 3 carbons so it\'s.' }
          ],
            remediations: { 'students-often-classify-alcohols-by': { steps: ['Revisit Class 10 node c10_chem_cbse_04_004 (Hydrocarbons: Saturated and Unsaturated) to review carbon valency and how.', 'Practice with molecular models or paper cut-outs: build CH₃OH, CH₃CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH; physically point to the.', 'Re-attempt Diagnostic Question 3 (isomer drawing) — if still incorrect, watch a 5-minute video on "identifying.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_002', difficulty: 'standard',
          question: 'Alcohols can be prepared from haloalkanes via nucleophilic substitution.',
          hint: 'Review carbocation stability and Markovnikov\'s rule from Class 11 hydrocarbons (if.',
          misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s.',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the preparation of propan-2-ol from 2-bromopropane using aqueous NaOH.', answer: 'CH3CHBrCH3 + NaOH(aq) → CH3CH(OH)CH3 + NaBr',
                  options: ['CH3CHBrCH3 + NaOH(aq) → CH3CH(OH)CH3 + NaBr', 'add H2O'],
                  hint: 'Review carbocation stability and Markovnikov\'s rule from Class 11 hydrocarbons (if covered).',
                  misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s rule, and they confuse.' },
                { id: 'b', prompt: 'Predict the major alcohol product when 3-methylbut-1-ene undergoes (a) acid-catalyzed hydration and (b) hydroboration-oxidation.', answer: 'acid-catalyzed hydration and (',
                  options: ['acid-catalyzed hydration and (', 'add H2O'],
                  hint: 'Review carbocation stability and Markovnikov\'s rule from Class 11 hydrocarbons (if covered).',
                  misconception: 'Students often write the hydration of an unsymmetrical alkene as simply "add H2O" without considering Markovnikov\'s rule, and they confuse.' }
          ],
            remediations: { 'students-often-write-the-hydration': { steps: ['If stuck on regioselectivity, revisit c11_chem_cbse_04_007 (Hybridisation: sp, sp2, sp3) to understand carbocation.', 'For mechanism steps, review c12_chem_cbse_07_001 (Classification of Alcohols) to recall primary/secondary/tertiary.', 'Practice drawing carbocation intermediates and 1,2-hydride shifts using paper models.', 'Re-do Diagnostic Question 3 with explicit carbocation drawings.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_003', difficulty: 'standard',
          question: 'Preparation of alcohols from carbonyl compounds involves the reduction of the.',
          hint: 'If unable to predict product, revisit Class 11 nucleophilic addition mechanism.',
          misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing.',
          parts: [
                { id: 'a', prompt: 'Name the reducing agent that can reduce a carboxylic acid to a primary alcohol but cannot be replaced by NaBH₄ for this conversion.', answer: 'Lithium aluminium hydride (LiAlH₄) reduces carboxylic acids to primary alcohols',
                  options: ['Lithium aluminium hydride (LiAlH₄) reduces carboxylic acids to primary alcohols', 'NaBH₄ reduces carboxylic acids to alcohols', 'LiAlH₄ reduces aldehydes to alkanes'],
                  hint: 'If unable to predict product, revisit Class 11 nucleophilic addition mechanism.',
                  misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing reagent strength and.' },
                { id: 'b', prompt: 'Explain why sodium borohydride (NaBH₄) reduces aldehydes and ketones but does not reduce esters under normal conditions, whereas lithium aluminium hydride.', answer: 'NaBH₄ is a milder hydride donor',
                  options: ['NaBH₄ is a milder hydride donor', 'steric hindrance', 'NaBH₄ is not strong enough', 'NaBH₄ reduces carboxylic acids to alcohols'],
                  hint: 'If unable to predict product, revisit Class 11 nucleophilic addition mechanism.',
                  misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing reagent strength and.' },
                { id: 'c', prompt: 'Predict the major organic product (structure and IUPAC name) when 3-methylbutan-2-one is treated with (i) NaBH₄ followed by H₂O, and (ii) CH₃MgBr followed.', answer: '(i) NaBH₄ reduction: 3-methylbutan-2-ol (secondary alcohol)',
                  options: ['(i) NaBH₄ reduction: 3-methylbutan-2-ol (secondary alcohol)', 'NaBH₄ reduces carboxylic acids to alcohols', 'LiAlH₄ reduces aldehydes to alkanes'],
                  hint: 'If unable to predict product, revisit Class 11 nucleophilic addition mechanism.',
                  misconception: 'Students write "NaBH₄ reduces carboxylic acids to alcohols" or "LiAlH₄ reduces aldehydes to alkanes" — confusing reagent strength and.' }
          ],
            remediations: { 'students-write-nabh-reduces-carboxylic': { steps: ['Revisit c12_chem_cbse_07_001 (classification of alcohols) to firmly link product structure (1°/2°/3°) to starting.', 'Make a 3×3 table: rows = aldehyde, ketone, carboxylic acid/ester; columns = NaBH₄, LiAlH₄, H₂/Pd; fill with "reacts →.', 'Practice 5 Grignard reactions: vary carbonyl (HCHO, CH₃CHO, CH₃COCH₃) and Grignard (CH₃MgBr, C₂H₅MgBr, PhMgBr); write.', 'Re-diagnostic: Attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_5 again; if error persists, review Class 11.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_004', difficulty: 'standard',
          question: 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly.',
          hint: 'Revisit c11_chem_cbse_04_011 (Resonance Structures) for diazonium ion stability and.',
          misconception: 'Students write the cumene process as: "Cumene + O₂ → Phenol + Acetone" in one step, omitting the hydroperoxide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an',
                  options: ['Phenols are aromatic compounds where a hydroxyl (–OH) group is directly attached to an', 'Alcohols are organic compounds in', 'Alcohols can be prepared from haloalkanes via nucleophilic substitution (SN1/SN2) using', 'Preparation of alcohols from carbonyl compounds involves the reduction of the carbonyl'],
                  hint: 'Revisit c11_chem_cbse_04_011 (Resonance Structures) for diazonium ion stability and.',
                  misconception: 'Students write the cumene process as: "Cumene + O₂ → Phenol + Acetone" in one step, omitting the hydroperoxide intermediate and the.' }
          ],
            remediations: { 'students-write-the-cumene-process': { steps: ['If the student cannot draw the cumene hydroperoxide structure or the phenyl migration step: (1) Revisit.', '(2) Review c11_chem_cbse_07_006 (Le Chatelier\'s Principle) for equilibrium in acid-catalysed steps.', '(3) Practice: Draw the radical initiation (RO• abstracting benzylic H), propagation (O₂ addition), and termination.', '(4) Re-diagnostic: Ask student to write the mechanism for acid-catalysed dehydration of 2-methylpropan-2-ol.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_005', difficulty: 'standard',
          question: 'Physical properties of alcohols and phenols refer to their observable.',
          hint: 'Revisit c11_chem_cbse_05_003 (Hydrogen Bonding in States of Matter) and practice.',
          misconception: 'Students often believe that phenols have lower boiling points than alcohols of similar mass because the aromatic ring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical properties of alcohols and phenols refer to their observable characteristics',
                  options: ['Physical properties of alcohols and phenols refer to their observable characteristics', 'Alcohols are organic compounds in', 'Alcohols can be prepared from haloalkanes via nucleophilic substitution (SN1/SN2) using', 'Preparation of alcohols from carbonyl compounds involves the reduction of the carbonyl'],
                  hint: 'Revisit c11_chem_cbse_05_003 (Hydrogen Bonding in States of Matter) and practice identifying.',
                  misconception: 'Students often believe that phenols have lower boiling points than alcohols of similar mass because the aromatic ring is "rigid".' }
          ],
            remediations: { 'phenols-have-lower-boiling-points': { steps: ['If the student confuses the role of the aromatic ring, have them revisit c11_chem_cbse_05_003 (Hydrogen Bonding.', 'Perform a quick demo: compare evaporation rates of phenol (solid, sublimes slowly) and cyclohexanol (liquid, bp 434 K).', 'Then draw resonance structures of phenol showing partial positive charge on oxygen, reinforcing its H-bond donor.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_006', difficulty: 'standard',
          question: 'Alcohols react with active metals (Na, K, Al) to form alkoxides and hydrogen.',
          hint: 'If stuck on acidity trends, revisit c11_chem_cbse_07_009 (Ka/Kb) and draw resonance.',
          misconception: 'Students often write the esterification of a tertiary alcohol with a carboxylic acid as a straightforward substitution.',
          parts: [
                { id: 'a', prompt: 'Explain why tertiary alcohols (e.g., tert-butanol) do not undergo esterification with carboxylic acids under standard Fischer conditions (conc.', answer: 'Tertiary alcohols have bulky alkyl groups that hinder nucleophilic attack on the',
                  options: ['Tertiary alcohols have bulky alkyl groups that hinder nucleophilic attack on the', 'tertiary alcohols are less acidic'],
                  hint: 'If stuck on acidity trends, revisit c11_chem_cbse_07_009 (Ka/Kb) and draw resonance structures.',
                  misconception: 'Students often write the esterification of a tertiary alcohol with a carboxylic acid as a straightforward substitution, ignoring that conc.' }
          ],
            remediations: { 'students-often-write-the-esterification': { steps: ['Revisit c12_chem_cbse_07_001 (classification of alcohols) to recall 1°/2°/3° structures.', 'Review c11_chem_cbse_07_009 (Ka/Kb) for acid strength concepts.', 'Perform a mental experiment: draw the mechanism of Fischer esterification for a tertiary alcohol — see the carbocation.', 'Re-attempt Diagnostic Question 2 and 5 with this mechanistic view.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
