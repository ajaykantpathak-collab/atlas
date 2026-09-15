import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch08_p2: SimDef = {
    id: 'v3_c12_chem_ch08_p2',
    title: 'Aldehydes, Ketones and Carboxylic Acids · Part 2/2',
    subtitle: 'The reagent that knows when to stop — PCC\'s secret is dry solvent',
    classLevel: 12, subject: 'chemistry', topic: 'Aldehydes, Ketones and Carboxylic Acids · Part 2/2',
    chapters: ['c12_chem_ch08'],
    nodeIds: ['c12_chem_cbse_08_007', 'c12_chem_cbse_08_008', 'c12_chem_cbse_08_009', 'c12_chem_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Synthetic chemist', intro: 'Every aldehyde in perfume and every ketone in medicine starts as an alcohol. Choosing the oxidant is choosing the product.', goal: 'Select reagents to prepare aldehydes, ketones and carboxylic acids from alcohols, and explain the role of medium and α-hydrogens.' },
    discovery: {
        question: 'Pour excess PCC on a primary alcohol and it still refuses to become a carboxylic acid — while aqueous K₂Cr₂O₇ sails straight past the aldehyde. What\'s protecting the aldehyde?',
        options: ['PCC runs in anhydrous CH₂Cl₂ — no water means no aldehyde hydrate, and over-oxidation needs that gem-diol to proceed', 'PCC is simply too weak to oxidise twice', 'The aldehyde evaporates before it can react', 'Primary alcohols can\'t form acids at all'],
        answer: 'PCC runs in anhydrous CH₂Cl₂ — no water means no aldehyde hydrate, and over-oxidation needs that gem-diol to proceed',
        hook: 'Students rank oxidants as \'strong\' or \'weak\' and stop there. The real switch is the solvent: in water the aldehyde hydrates and gets eaten; in dry dichloromethane it can\'t hydrate, so it survives. Medium beats muscle — a classic exam trap.',
    },
    teaching: [
        { title: 'Cannizzaro Reaction: Disproportionation', text: 'The Cannizzaro reaction is a base-catalysed disproportionation reaction where non-α-hydrogen aldehydes (e.g., formaldehyde, benzaldehyde) undergo simultaneous oxidation and reduction in concentrated.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_08_007', title: 'Your mission',
          mission: { widget: 'ph', validate: 'ph:probe=25',
            instruction: 'On the lab: probe a pH below 4 — acid or base?.',
        context: 'Play selector-in-chief for the carbonyl factory: pick the reagent that lands a primary alcohol on aldehyde (not acid), oxidise secondaries to ketones, and explain why tertiary alcohols opt out entirely.',
            observePrompt: 'What did the ph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_08_008', title: 'Preparation of Carboxylic Acids: From Alcohols and Nitriles',
          scaffold: { problem: '4.6 g of ethanol (C₂H₅OH) is oxidised by excess acidified K₂Cr₂O₇. Calculate the mass of ethanoic acid (CH₃COOH) formed assuming 85% yield.',
            steps: [
            { text: 'Write balanced equation: 3C₂H₅OH + 2K₂Cr₂O₇ + 8H₂SO₄ → 3CH₃COOH + 2Cr₂(SO₄)₃ + 2K₂SO₄ + 11H₂O.' },
            { text: 'Calculate moles of ethanol = mass / molar mass = 4.6 g / 46 g/mol = 0.10 mol.' },
            { text: 'Theoretical moles of ethanoic acid = 0.10 mol (1:1 ratio).' },
            { text: 'Actual moles at 85% yield = 0.10 × 0.85 = 0.085 mol.' },
            { text: 'Mass of ethanoic acid = moles × molar mass = 0.085 mol × 60 g/mol = 5.1 g.', faded: true, blankAnswer: '5.1 g of ethanoic acid.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_08_009', title: 'Reactions of Carboxylic Acids: Acidity and Substituent Effects',
          scaffold: { problem: 'Arrange the following carboxylic acids in increasing order of acid strength: acetic acid (CH₃COOH), chloroacetic acid (ClCH₂COOH).',
            steps: [
            { text: 'Recall that lower pKa = stronger acid. List all given pKa values.' },
            { text: 'Identify the substituent effect in each: CH₃COOH has electron-donating CH₃ (+I); α-halo acids have -I effect; β-chloro.' },
            { text: 'Compare electronegativities: F (4.0) > Cl (3.0) > Br (2.8) → -I strength: F > Cl > Br.' },
            { text: 'Account for distance: α-substituent (directly on C-2) has stronger effect than β-substituent (on C-3).' },
            { text: 'Rank by pKa: CH₃COOH (4.76) < ClCH₂CH₂COOH (4.52) < BrCH₂COOH (2.90) < ClCH₂COOH (2.86) < FCH₂COOH (2.66).', faded: true, blankAnswer: 'Increasing acidity: CH₃COOH < ClCH₂CH₂COOH < BrCH₂COOH <.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_08_010', title: 'Reactions of Carboxylic Acids: Esterification and Reduction',
          scaffold: { problem: 'A perfumery lab needs to prepare 50.0 g of ethyl butanoate (CH₃CH₂CH₂COOCH₂CH₃, molar mass 116.16 g/mol) by Fischer esterification.',
            steps: [
            { text: 'Calculate moles of target ester: 50.0 g / 116.16 g/mol = 0.430 mol. This is the desired product amount at equilibrium.' },
            { text: 'Write equilibrium expression. Let initial moles: butanoic acid = a, ethanol = 1.2a.' },
            { text: 'We want x = 0.430 mol at equilibrium. Solve for a: 4.0 = (0.430)² / ((a-0.430)(1.2a-0.430)).' },
            { text: 'Mass of butanoic acid = 0.593 mol × 88.11 g/mol = 52.2 g. Mass of ethanol = 1.2 × 0.593 mol × 46.07 g/mol = 32.8 g.' },
            { text: 'Practical modification to exceed equilibrium yield: Remove water as it forms using a Dean-Stark trap (azeotropic.', faded: true, blankAnswer: 'Butanoic acid required: 52.2 g; Ethanol required: 32.8.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab task: turn benzyl alcohol into benzaldehyde — and stop there. The intern reaches for acidified K₂Cr₂O₇ and heat, reasoning \'an oxidant is an oxidant\'.',
            decisions: [{ prompt: 'Will that reagent give the aldehyde?', options: [
                { text: 'No — aqueous dichromate over-oxidises the aldehyde (via its hydrate) to benzoic acid; use PCC in anhydrous CH₂Cl₂, which cannot form the hydrate and halts at the aldehyde.', outcome: 'Reagent and medium decide the stopping point: primary alcohol → aldehyde only under anhydrous selective oxidation or Cu/573 K dehydrogenation.' },
                { text: 'Yes — a primary alcohol always stops at the aldehyde no matter the oxidant.', outcome: 'In water the aldehyde hydrates to a gem-diol that oxidises onward — so strong aqueous oxidants deliver the carboxylic acid, not the aldehyde.', reveals: 'any-oxidant-stops-at-aldehyde' },
                { text: 'Skip oxidation entirely — use a tertiary alcohol instead, since it oxidises straight to a ketone.', outcome: 'Tertiary alcohols have no α-hydrogen; strong acid dehydrates them to alkenes — no carbonyl at all, and the substrate was a primary alcohol anyway.', reveals: 'tertiary-oxidises-to-ketone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'You now control oxidation like a dial, not a sledgehammer — PCC vs dichromate vs copper is the difference between aldehyde, acid and alkene. Carbonyl prep is a guaranteed three-marker.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'ph', prompt: 'Explore the ph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'ph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_007', difficulty: 'standard',
          question: 'The Cannizzaro reaction is a base-catalysed disproportionation reaction where.',
          hint: 'Revisit c12_chem_cbse_08_005 for nucleophilic addition mechanism steps; revisit.',
          misconception: 'Students write the Cannizzaro reaction as a simple acid-base reaction: "RCHO + OH⁻ → RCH₂O⁻ + CO₂" or similar, treating.',
          parts: [
                { id: 'a', prompt: 'In the Cannizzaro reaction of benzaldehyde with concentrated NaOH, one molecule is oxidised to benzoate and another reduced to benzyl alcohol.', answer: 'Oxidation: C₆H₅CHO + 3 OH⁻ → C₆H₅COO⁻ + 2 H₂O + 2 e⁻',
                  options: ['Oxidation: C₆H₅CHO + 3 OH⁻ → C₆H₅COO⁻ + 2 H₂O + 2 e⁻', 'stronger base'],
                  hint: 'Revisit c12_chem_cbse_08_005 for nucleophilic addition mechanism steps; revisit.',
                  misconception: 'Students write the Cannizzaro reaction as a simple acid-base reaction: "RCHO + OH⁻ → RCH₂O⁻ + CO₂" or similar, treating it as hydroxide.' },
                { id: 'b', prompt: 'Predict the major organic products when a mixture of formaldehyde and benzaldehyde is treated with concentrated NaOH (crossed Cannizzaro).', answer: 'Products: methanol (from formaldehyde reduction) and benzoate (from benzaldehyde',
                  options: ['Products: methanol (from formaldehyde reduction) and benzoate (from benzaldehyde', 'aromatic aldehydes react faster'],
                  hint: 'Revisit c12_chem_cbse_08_005 for nucleophilic addition mechanism steps; revisit.',
                  misconception: 'Students write the Cannizzaro reaction as a simple acid-base reaction: "RCHO + OH⁻ → RCH₂O⁻ + CO₂" or similar, treating it as hydroxide.' },
                { id: 'c', prompt: 'Glyoxal (OHC-CHO) undergoes intramolecular Cannizzaro reaction. Write the product and mechanism.', answer: 'Product: glycolic acid (HOCH₂COOH) or its salt',
                  options: ['Product: glycolic acid (HOCH₂COOH) or its salt', 'any H on adjacent carbon qualifies as α-H'],
                  hint: 'Revisit c12_chem_cbse_08_005 for nucleophilic addition mechanism steps; revisit.',
                  misconception: 'Students write the Cannizzaro reaction as a simple acid-base reaction: "RCHO + OH⁻ → RCH₂O⁻ + CO₂" or similar, treating it as hydroxide.' }
          ],
            remediations: { 'students-write-the-cannizzaro-reaction': { steps: ['If student cannot identify α-hydrogen absence: revisit c12_chem_cbse_08_006 (Aldol Condensation) — practice drawing.', 'If mechanism is unclear: revisit c12_chem_cbse_08_005 (Nucleophilic Addition) — draw hydroxide addition to carbonyl.', 'Re-diagnostic: give 2-methylpropanal and p-nitrobenzaldehyde — ask which undergoes Cannizzaro and why.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the Cannizzaro reaction as a simple acid-base reaction: "RCHO + OH⁻ → RCH₂O⁻ + CO₂" or similar, treating.',
          parts: [
                { id: 'a', prompt: 'A student writes the Cannizzaro reaction of formaldehyde as: 2 HCHO + NaOH → CH₃OH + HCOONa.', answer: 'Statement is incorrect',
                  options: ['Statement is incorrect', 'no external reagent', 'not redox'],
                  hint: 'Revisit c12_chem_cbse_08_005 for nucleophilic addition mechanism steps; revisit.',
                  misconception: 'Students write the Cannizzaro reaction as a simple acid-base reaction: "RCHO + OH⁻ → RCH₂O⁻ + CO₂" or similar, treating it as hydroxide.' }
          ],
            remediations: { 'students-write-the-cannizzaro-reaction': { steps: ['If student cannot identify α-hydrogen absence: revisit c12_chem_cbse_08_006 (Aldol Condensation) — practice drawing.', 'If mechanism is unclear: revisit c12_chem_cbse_08_005 (Nucleophilic Addition) — draw hydroxide addition to carbonyl.', 'Re-diagnostic: give 2-methylpropanal and p-nitrobenzaldehyde — ask which undergoes Cannizzaro and why.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_008', difficulty: 'standard',
          question: 'Carboxylic acids are prepared from primary alcohols via oxidation using strong.',
          hint: 'If stuck on balancing oxidation equations, revisit c11_chem_cbse_08_003 (half-reaction.',
          misconception: 'Students often write the oxidation of primary alcohol with K₂Cr₂O₇/H₂SO₄ as RCH₂OH + [O] → RCHO (stopping at aldehyde).',
          parts: [
                { id: 'a', prompt: 'Explain why oxidation of a primary alcohol with PCC (pyridinium chlorochromate) gives an aldehyde, but with KMnO₄/H⁺ gives a carboxylic acid, even though both.', answer: 'PCC is a mild, anhydrous oxidant that stops at the aldehyde',
                  options: ['PCC is a mild, anhydrous oxidant that stops at the aldehyde', 'PCC is weaker'],
                  hint: 'If stuck on balancing oxidation equations, revisit c11_chem_cbse_08_003 (half-reaction method).',
                  misconception: 'Students often write the oxidation of primary alcohol with K₂Cr₂O₇/H₂SO₄ as RCH₂OH + [O] → RCHO (stopping at aldehyde) because they.' }
          ],
            remediations: { 'students-often-write-the-oxidation': { steps: ['Revisit c12_chem_cbse_08_001 (Preparation of Aldehydes from Alcohols) to see PCC vs strong oxidants.', 'Review Class 11 Redox (c11_chem_cbse_08_001, c11_chem_cbse_08_003) for balancing oxidation half-reactions of alcohols.', 'Draw the mechanism of nitrile hydrolysis: nucleophilic attack of OH⁻ on C≡N → tetrahedral imidate → proton transfer →.', 'Re-do Diagnostic Q3 and Q6 after drawing mechanisms.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_009', difficulty: 'standard',
          question: 'Carboxylic acid acidity is quantified by its acid dissociation constant (Ka).',
          hint: 'Revisit Class 11 Ionic Equilibrium (c11_chem_cbse_07_011, c11_chem_cbse_07_012) for.',
          misconception: 'Students write: "Carboxylic acid is stronger than phenol because carboxylate has two resonance structures while.',
          parts: [
                { id: 'a', prompt: 'Define pKa and state its relationship with acid strength. If acid X has pKa = 2.0 and acid Y has pKa = 5.0, which is stronger and by approximately what factor.', answer: 'pKa = -log₁₀Ka; smaller pKa means larger Ka, hence stronger acid',
                  options: ['pKa = -log₁₀Ka; smaller pKa means larger Ka, hence stronger acid', 'Y is stronger because 5 > 2'],
                  hint: 'Revisit Class 11 Ionic Equilibrium (c11_chem_cbse_07_011, c11_chem_cbse_07_012) for Ka/pKa/pH.',
                  misconception: 'Students write: "Carboxylic acid is stronger than phenol because carboxylate has two resonance structures while phenoxide has five." This.' }
          ],
            remediations: { 'students-write-carboxylic-acid-is': { steps: ['If the student cannot explain why carboxylate is better stabilized than phenoxide: (1) Revisit c11_chem_cbse_04_011.', '(2) Revisit c11_chem_cbse_07_011 (Ionisation of Acids and Bases) — recalculate pH of 0.1 M acetic acid vs 0.1 M phenol.', '(3) Re-diagnostic: Ask "Draw the resonance hybrid of phenoxide and show where the negative charge resides.', 'Compare with carboxylate." If they still place charge on oxygen in phenoxide, they need to re-learn resonance rules.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_010', difficulty: 'standard',
          question: 'Esterification is the nucleophilic acyl substitution reaction where.',
          hint: 'If stuck on mechanism, revisit c11_chem_cbse_04_003 (resonance in carboxylate) and.',
          misconception: 'Students write the esterification mechanism as: RCOOH + R\'OH → RCOOR\' + H₂O with H₂SO₄ written ABOVE the arrow, and.',
          parts: [
                { id: 'a', prompt: 'Explain why sodium borohydride (NaBH₄) cannot reduce a carboxylic acid to a primary alcohol, while LiAlH₄ can.', answer: 'NaBH₄ is a mild hydride donor (reduces aldehydes/ketones only)',
                  options: ['NaBH₄ is a mild hydride donor (reduces aldehydes/ketones only)', 'NaBH₄ is not strong enough'],
                  hint: 'If stuck on mechanism, revisit c11_chem_cbse_04_003 (resonance in carboxylate) and.',
                  misconception: 'Students write the esterification mechanism as: RCOOH + R\'OH → RCOOR\' + H₂O with H₂SO₄ written ABOVE the arrow, and think the mechanism.' },
                { id: 'b', prompt: 'A student carries out esterification of benzoic acid (C₆H₅COOH) with methanol (CH₃OH) using conc. H₂SO₄. After refluxing for 1 hour, they distil the product.', answer: 'Product: methyl benzoate (C₆H₅COOCH₃)',
                  options: ['Product: methyl benzoate (C₆H₅COOCH₃)', 'reflux to evaporate water', 'distil immediately'],
                  hint: 'If stuck on mechanism, revisit c11_chem_cbse_04_003 (resonance in carboxylate) and.',
                  misconception: 'Students write the esterification mechanism as: RCOOH + R\'OH → RCOOR\' + H₂O with H₂SO₄ written ABOVE the arrow, and think the mechanism.' }
          ],
            remediations: { 'students-write-the-esterification-mechanism': { steps: ['If mechanism steps are confused: (1) Revisit c11_chem_cbse_04_003 (Covalent Bond: Lewis Structures) to practise drawing.', '(2) Revisit c12_chem_cbse_08_005 (Nucleophilic Addition Reaction) to review tetrahedral intermediate formation.', '(3) Do this re-diagnostic: "Draw the complete mechanism for CH₃COOH + CH₃OH → CH₃COOCH₃ + H₂O with conc.', 'H₂SO₄, showing all proton transfers and the tetrahedral intermediate.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
