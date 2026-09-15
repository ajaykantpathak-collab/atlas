import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch07_p2: SimDef = {
    id: 'v3_c12_chem_ch07_p2',
    title: 'Alcohols, Phenols and Ethers · Part 2/2',
    subtitle: 'Three bottles, one cloudy test tube — sorting alcohols by speed',
    classLevel: 12, subject: 'chemistry', topic: 'Alcohols, Phenols and Ethers · Part 2/2',
    chapters: ['c12_chem_ch07'],
    nodeIds: ['c12_chem_cbse_07_007', 'c12_chem_cbse_07_008', 'c12_chem_cbse_07_009', 'c12_chem_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Practical organic chemist', intro: 'Sanitiser, antiseptic, fuel — alcohols are everywhere, and one structural detail decides everything they do.', goal: 'Classify alcohols, phenols and ethers by structure and predict their characteristic reactions and tests.' },
    discovery: {
        question: 'Three unlabelled bottles — butan-1-ol, butan-2-ol, 2-methylpropan-2-ol. One reagent tells them apart in ten minutes. Which, and how?',
        options: ['Lucas reagent — tertiary clouds instantly, secondary in minutes, primary stays clear; the speed tracks carbocation stability', 'Fehling\'s solution — only primary alcohols reduce it', 'Sodium metal — only tertiary alcohols fizz', 'Litmus — alcohols are acids and turn it red at different rates'],
        answer: 'Lucas reagent — tertiary clouds instantly, secondary in minutes, primary stays clear; the speed tracks carbocation stability',
        hook: 'Alcohols look identical on paper — R–OH — but the crowd around the carbinol carbon changes everything: reactivity, oxidation products, even whether oxidation is possible at all. A tertiary alcohol can\'t become a ketone because there\'s no α-hydrogen to pull.',
    },
    teaching: [
        { title: 'Chemical Reactions of Alcohols: Dehydration and Oxidation', text: 'Dehydration of alcohols is an acid-catalyzed elimination reaction where a water molecule is removed from adjacent carbon atoms to form an alkene, proceeding via carbocation intermediates with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_07_007', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Run the alcohol classification lab: sort C₄H₁₀O\'s isomers into 1°, 2°, 3°, predict their Lucas test timings, and map what each class oxidises and dehydrates into — then extend the logic to phenols and ethers.',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_007', title: 'Chemical Reactions of Alcohols: Dehydration and Oxidation',
          caseStudy: { intro: 'Observe how heating ethanol with concentrated H₂SO₄ at 443 K produces ethene gas (bubbles) while at 413 K it gives diethyl ether — the same reagent, different.',
            decisions: [{ prompt: 'Write the major product when 3-methylbutan-2-ol undergoes acid-catalyzed dehydration with concentrated H₂SO₄.', options: [
                { text: 'Major product: 2-methylbut-2-ene (more substituted alkene)', outcome: 'Major product: 2-methylbut-2-ene (more substituted alkene). The secondary carbocation initially.' },
                { text: 'rate of reaction', outcome: 'Not quite — Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH →.', reveals: 'students-write-the-dehydration-of' },
                { text: 'carbocation stability governing SN1 rate', outcome: 'Not quite — Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH →.', reveals: 'students-write-the-dehydration-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_008', title: 'Chemical Reactions of Phenols: Electrophilic Substitution',
          caseStudy: { intro: 'Observe how a few drops of bromine water added to phenol in a test tube instantly form a white precipitate of 2,4,6-tribromophenol — a reaction so fast.',
            decisions: [{ prompt: 'Write the structures of the two main products formed when phenol is treated with dilute nitric acid at 298 K, and explain why they can.', options: [
                { text: 'The products are o-nitrophenol (intramolecular H-bonding, steam volatile) and', outcome: 'The products are o-nitrophenol (intramolecular H-bonding, steam volatile) and p-nitrophenol.' },
                { text: 'o-nitrophenol has higher boiling point', outcome: 'Not quite — Students write the nitration of phenol with concentrated HNO₃ as giving only p-nitrophenol.', reveals: 'students-write-the-nitration-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Three unlabelled bottles hold butan-1-ol, butan-2-ol and 2-methylpropan-2-ol. With Lucas reagent one clouds instantly, one after ~6 minutes, one stays clear — and a student concludes \'they\'re all C₄H₁₀O, so the timing is just error\'.',
            decisions: [{ prompt: 'How should she decode the observations?', options: [
                { text: 'Instant = the tertiary alcohol, ~6 min = secondary, clear = primary: Lucas runs through carbocations, whose stability runs 3° > 2° > 1°, so timing is the classification showing itself.', outcome: 'Class is decided by carbons bonded to the –OH carbon, not molecular formula — the test orders the three isomers exactly.' },
                { text: 'Same formula means same class — the timing differences are noise and the bottles are interchangeable.', outcome: 'C₄H₁₀O has two primary, one secondary and one tertiary isomer; identical formula says nothing about the carbinol carbon\'s substitution.', reveals: 'same-formula-same-alcohol-class' },
                { text: 'Instant clouding means primary — the simplest structure reacts first.', outcome: 'Primary alcohols give no room-temperature Lucas reaction at all; the instant response belongs to the stable tertiary carbocation.', reveals: 'primary-fastest-lucas' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'You can now identify an alcohol\'s class from its behaviour alone and predict its reaction products. This chapter is organic chemistry\'s most reliable mark-bank.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_007', difficulty: 'standard',
          question: 'Dehydration of alcohols is an acid-catalyzed elimination reaction where a water.',
          hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization.',
          misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O.',
          parts: [
                { id: 'a', prompt: 'Write the major product when 3-methylbutan-2-ol undergoes acid-catalyzed dehydration with concentrated H₂SO₄. Explain why this is the major product.', answer: 'Major product: 2-methylbut-2-ene (more substituted alkene)',
                  options: ['Major product: 2-methylbut-2-ene (more substituted alkene)', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization (c11_chem_cbse_04_005) and.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'b', prompt: 'Why does PCC in CH₂Cl₂ oxidize primary alcohols to aldehydes while acidified KMnO₄ oxidizes them to carboxylic acids?', answer: 'PCC is a mild, anhydrous oxidant in non-aqueous CH₂Cl₂',
                  options: ['PCC is a mild, anhydrous oxidant in non-aqueous CH₂Cl₂', 'PCC is weaker so it stops', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization (c11_chem_cbse_04_005) and.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'c', prompt: 'A student treats butan-2-ol with (a) Cu/573 K, (b) acidified K₂Cr₂O₇, (c) PCC. Write the organic product(s) for each case with balanced equations.', answer: 'Cu/573 K, (',
                  options: ['Cu/573 K, (', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization (c11_chem_cbse_04_005) and.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'd', prompt: 'Compare the dehydration of 1-methylcyclohexanol and butan-1-ol. Which gives a single alkene product and which gives a mixture?', answer: '1-Methylcyclohexanol (tertiary) gives only 1-methylcyclohexene',
                  options: ['1-Methylcyclohexanol (tertiary) gives only 1-methylcyclohexene', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization (c11_chem_cbse_04_005) and.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' }
          ],
            remediations: { 'students-write-the-dehydration-of': { steps: ['Revisit carbocation stability and rearrangements: c11_chem_cbse_04_005 (VSEPR/hybridization) and c11_chem_cbse_04_006.', 'Practice drawing 3-step dehydration mechanisms for 10 different alcohols (primary, secondary, tertiary, with/without.', 'Make a reagent table: Oxidizing agent | Medium | 1° alcohol product | 2° alcohol product | 3° alcohol product — fill.', 'Redo Diagnostic Questions 1–5 after 48 hours; if any error persists, watch NPTEL lecture on alcohol oxidation.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O.',
          parts: [
                { id: 'a', prompt: 'In the Lucas test, 2-methylpropan-2-ol (tert-butyl alcohol) produces immediate turbidity, butan-2-ol takes 5–10 minutes, and butan-1-ol shows no turbidity.', answer: 'Lucas reagent (ZnCl₂/conc',
                  options: ['Lucas reagent (ZnCl₂/conc', 'reactivity order', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization (c11_chem_cbse_04_005) and.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' },
                { id: 'b', prompt: 'Design a two-step sequence to convert 2-methylpropan-1-ol (isobutyl alcohol) to 2-methylpropanal (isobutyraldehyde) without over-oxidation to the acid.', answer: 'Step 1: Oxidize with PCC in CH₂Cl₂ at 0–25°C → 2-methylpropanal (aldehyde)',
                  options: ['Step 1: Oxidize with PCC in CH₂Cl₂ at 0–25°C → 2-methylpropanal (aldehyde)', 'rate of reaction', 'carbocation stability governing SN1 rate'],
                  hint: 'If stuck on carbocation rearrangements, review Class 11 hybridization (c11_chem_cbse_04_005) and.',
                  misconception: 'Students write the dehydration of ethanol with conc. H₂SO₄ as a single-step equation: CH₃CH₂OH → CH₂=CH₂ + H₂O, ignoring the three-step.' }
          ],
            remediations: { 'students-write-the-dehydration-of': { steps: ['Revisit carbocation stability and rearrangements: c11_chem_cbse_04_005 (VSEPR/hybridization) and c11_chem_cbse_04_006.', 'Practice drawing 3-step dehydration mechanisms for 10 different alcohols (primary, secondary, tertiary, with/without.', 'Make a reagent table: Oxidizing agent | Medium | 1° alcohol product | 2° alcohol product | 3° alcohol product — fill.', 'Redo Diagnostic Questions 1–5 after 48 hours; if any error persists, watch NPTEL lecture on alcohol oxidation.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_008', difficulty: 'standard',
          question: 'Phenols undergo electrophilic aromatic substitution reactions where the –OH.',
          hint: 'Review Class 11 NCERT Section 13.5 (Electrophilic Substitution Reactions) and resonance.',
          misconception: 'Students write the nitration of phenol with concentrated HNO₃ as giving only p-nitrophenol, forgetting that.',
          parts: [
                { id: 'a', prompt: 'Write the structures of the two main products formed when phenol is treated with dilute nitric acid at 298 K, and explain why they can be separated by steam.', answer: 'The products are o-nitrophenol (intramolecular H-bonding, steam volatile) and',
                  options: ['The products are o-nitrophenol (intramolecular H-bonding, steam volatile) and', 'o-nitrophenol has higher boiling point'],
                  hint: 'Review Class 11 NCERT Section 13.5 (Electrophilic Substitution Reactions) and resonance structures.',
                  misconception: 'Students write the nitration of phenol with concentrated HNO₃ as giving only p-nitrophenol, forgetting that concentrated HNO₃ (often with.' }
          ],
            remediations: { 'students-write-the-nitration-of': { steps: ['Revisit resonance structures of phenol (c11_chem_cbse_04_011) — draw all 5 resonance forms showing electron density.', 'Practice predicting products for 5 substituted phenols (p-cresol, m-nitrophenol, p-methoxyphenol, etc.) using.', 'Re-do diagnostic questions 2 and 3, then attempt JEE-style question: "Predict major product of bromination.', 'If still stuck, review Class 11 electrophilic aromatic substitution mechanism (arenium ion formation) in NCERT Class 11.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_009', difficulty: 'standard',
          question: 'Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion.',
          hint: 'Review resonance in phenoxide (c11_chem_cbse_04_011) and electrophilic substitution.',
          misconception: 'Students often write the Reimer-Tiemann reaction as phenol + CHCl₃ + NaOH → salicylaldehyde **without showing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion with carbon',
                  options: ['Kolbe\'s reaction is the electrophilic aromatic substitution of phenoxide ion with carbon', 'Alcohols are organic compounds in', 'Alcohols can be prepared from haloalkanes via nucleophilic substitution (SN1/SN2) using', 'Preparation of alcohols from carbonyl compounds involves the reduction of the carbonyl'],
                  hint: 'Review resonance in phenoxide (c11_chem_cbse_04_011) and electrophilic substitution basics.',
                  misconception: 'Students often write the Reimer-Tiemann reaction as phenol + CHCl₃ + NaOH → salicylaldehyde **without showing the dichlorocarbene.' }
          ],
            remediations: { 'students-often-write-the-reimer': { steps: ['If the student cannot draw the carbene mechanism, have them revisit **c11_chem_cbse_04_011 (Resonance Structures)**.', 'For Kolbe\'s, review **c12_chem_cbse_07_008 (Electrophilic Substitution of Phenols)** to reinforce why phenoxide is more.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_010', difficulty: 'standard',
          question: 'Williamson synthesis is a nucleophilic substitution (SN2) reaction where.',
          hint: 'If stuck, review c12_chem_cbse_07_001 (alcohol/halide classification) and Class 11.',
          misconception: '**Misconception:** "Williamson synthesis works for all alkyl halides — you just mix alkoxide and alkyl halide.".',
          parts: [
                { id: 'a', prompt: 'A student attempts to prepare tert-butyl ethyl ether by reacting sodium ethoxide with tert-butyl bromide.', answer: '**Correct answer:** The major product is 2-methylprop-1-ene (isobutylene)',
                  options: ['**Correct answer:** The major product is 2-methylprop-1-ene (isobutylene)', 'SN1 occurs'],
                  hint: 'If stuck, review c12_chem_cbse_07_001 (alcohol/halide classification) and Class 11 haloalkanes SN2.',
                  misconception: '**Misconception:** "Williamson synthesis works for all alkyl halides — you just mix alkoxide and alkyl halide." **Reality:** Williamson.' }
          ],
            remediations: { 'misconception-williamson-synthesis-works-for': { steps: ['If the student cannot predict elimination vs substitution: 1.', 'Revisit **c12_chem_cbse_07_001** (classification of alcohols/halides as 1°, 2°, 3°) — identify the α-carbon.', 'Review **SN2 steric requirements** (backside attack needs accessible α-carbon) from Class 11 haloalkanes chapter.', 'Practice: Given 5 alkyl halides (CH₃Br, CH₃CH₂Br, (CH₃)₂CHBr, (CH₃)₃CBr, C₆H₅Br), predict SN2/E2/no reaction with NaOEt.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
