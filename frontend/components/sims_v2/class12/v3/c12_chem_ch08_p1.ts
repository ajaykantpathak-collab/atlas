import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch08_p1: SimDef = {
    id: 'v3_c12_chem_ch08_p1',
    title: 'Aldehydes, Ketones and Carboxylic Acids · Part 1/2',
    subtitle: 'The reagent that knows when to stop — PCC\'s secret is dry solvent',
    classLevel: 12, subject: 'chemistry', topic: 'Aldehydes, Ketones and Carboxylic Acids · Part 1/2',
    chapters: ['c12_chem_ch08'],
    nodeIds: ['c12_chem_cbse_08_001', 'c12_chem_cbse_08_002', 'c12_chem_cbse_08_003', 'c12_chem_cbse_08_004', 'c12_chem_cbse_08_005', 'c12_chem_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Synthetic chemist', intro: 'Every aldehyde in perfume and every ketone in medicine starts as an alcohol. Choosing the oxidant is choosing the product.', goal: 'Select reagents to prepare aldehydes, ketones and carboxylic acids from alcohols, and explain the role of medium and α-hydrogens.' },
    discovery: {
        question: 'Pour excess PCC on a primary alcohol and it still refuses to become a carboxylic acid — while aqueous K₂Cr₂O₇ sails straight past the aldehyde. What\'s protecting the aldehyde?',
        options: ['PCC runs in anhydrous CH₂Cl₂ — no water means no aldehyde hydrate, and over-oxidation needs that gem-diol to proceed', 'PCC is simply too weak to oxidise twice', 'The aldehyde evaporates before it can react', 'Primary alcohols can\'t form acids at all'],
        answer: 'PCC runs in anhydrous CH₂Cl₂ — no water means no aldehyde hydrate, and over-oxidation needs that gem-diol to proceed',
        hook: 'Students rank oxidants as \'strong\' or \'weak\' and stop there. The real switch is the solvent: in water the aldehyde hydrates and gets eaten; in dry dichloromethane it can\'t hydrate, so it survives. Medium beats muscle — a classic exam trap.',
    },
    teaching: [
        { title: 'Preparation of Aldehydes and Ketones: From Alcohols', text: 'Aldehydes are prepared by controlled oxidation or dehydrogenation of primary alcohols, while ketones are prepared by oxidation or dehydrogenation of secondary alcohols; tertiary alcohols do not yield.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_08_001', title: 'Your mission',
          mission: { widget: 'ph', validate: 'ph:probe=25',
            instruction: 'On the lab: probe a pH below 4 — acid or base?.',
        context: 'Play selector-in-chief for the carbonyl factory: pick the reagent that lands a primary alcohol on aldehyde (not acid), oxidise secondaries to ketones, and explain why tertiary alcohols opt out entirely.',
            observePrompt: 'What did the ph interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_08_002', title: 'Preparation of Aldehydes: Rosenmund Reduction',
          caseStudy: { intro: 'Imagine you are in a pharmaceutical lab needing pure benzaldehyde for a synthesis — but direct oxidation of toluene gives benzoic acid, and reducing benzoic.',
            decisions: [{ prompt: 'Write the balanced chemical equation for the Rosenmund reduction of propanoyl chloride (CH₃CH₂COCl).', options: [
                { text: 'CH₃CH₂COCl + H₂ → CH₃CH₂CHO + HCl (g)', outcome: 'CH₃CH₂COCl + H₂ → CH₃CH₂CHO + HCl (g). Catalyst: Pd/BaSO₄ (poisoned with quinoline or sulfur).' },
                { text: 'reduction of acid chloride with LiAlH₄', outcome: 'Not quite — Students often write the catalyst as "Pd/BaSO₄" but forget the poison (quinoline/sulfur), then.', reveals: 'students-often-write-the-catalyst' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_08_004', title: 'Physical Properties of Aldehydes and Ketones',
          caseStudy: { intro: 'Observe that formalin (aqueous methanal) is a liquid used to preserve biological specimens in school labs, while acetone (propanone) is a common nail polish.',
            decisions: [{ prompt: 'State the physical state of methanal, ethanal, and propanone at room temperature.', options: [
                { text: 'Methanal is a gas, ethanal is a volatile liquid, and propanone is a liquid at room', outcome: 'Methanal is a gas, ethanal is a volatile liquid, and propanone is a liquid at room temperature.' },
                { text: 'ethanal is a gas', outcome: 'Not quite — Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each.', reveals: 'aldehydes-and-ketones-can-form' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A lab task: turn benzyl alcohol into benzaldehyde — and stop there. The intern reaches for acidified K₂Cr₂O₇ and heat, reasoning \'an oxidant is an oxidant\'.',
            decisions: [{ prompt: 'Will that reagent give the aldehyde?', options: [
                { text: 'No — aqueous dichromate over-oxidises the aldehyde (via its hydrate) to benzoic acid; use PCC in anhydrous CH₂Cl₂, which cannot form the hydrate and halts at the aldehyde.', outcome: 'Reagent and medium decide the stopping point: primary alcohol → aldehyde only under anhydrous selective oxidation or Cu/573 K dehydrogenation.' },
                { text: 'Yes — a primary alcohol always stops at the aldehyde no matter the oxidant.', outcome: 'In water the aldehyde hydrates to a gem-diol that oxidises onward — so strong aqueous oxidants deliver the carboxylic acid, not the aldehyde.', reveals: 'any-oxidant-stops-at-aldehyde' },
                { text: 'Skip oxidation entirely — use a tertiary alcohol instead, since it oxidises straight to a ketone.', outcome: 'Tertiary alcohols have no α-hydrogen; strong acid dehydrates them to alkenes — no carbonyl at all, and the substrate was a primary alcohol anyway.', reveals: 'tertiary-oxidises-to-ketone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now control oxidation like a dial, not a sledgehammer — PCC vs dichromate vs copper is the difference between aldehyde, acid and alkene. Carbonyl prep is a guaranteed three-marker.',
            decisions: [{ prompt: 'What comes next? Aldehydes, Ketones and Carboxylic Acids · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Aldehydes, Ketones and Carboxylic Acids · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'ph', prompt: 'Explore the ph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'ph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_001', difficulty: 'standard',
          question: 'Aldehydes are prepared by controlled oxidation or dehydrogenation of primary.',
          hint: 'If stuck, review **c10_chem_cbse_04_006** (Functional Groups) and practice drawing all.',
          misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give.',
          parts: [
                { id: 'a', prompt: 'Compare the products when (i) ethanol vapour is passed over heated copper at 573 K and (ii) ethanol is heated with acidified K₂Cr₂O₇.', answer: '**Answer:** (i) Cu/573 K → dehydrogenation: CH₃CH₂OH → CH₃CHO + H₂ (g)',
                  options: ['**Answer:** (i) Cu/573 K → dehydrogenation: CH₃CH₂OH → CH₃CHO + H₂ (g)', 'dehydrogenation', 'oxidation'],
                  hint: 'If stuck, review **c10_chem_cbse_04_006** (Functional Groups) and practice drawing all isomers.',
                  misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give nothing." **Why it\'s.' }
          ],
            remediations: { 'misconception-primary-alcohols-always-give': { steps: ['If a student cannot classify alcohols or predict products: 1.', 'Revisit **c10_chem_cbse_04_006** (Functional Groups) to practice identifying 1°, 2°, 3° alcohols from structures.', 'Revisit **c11_chem_cbse_08_001** and **c11_chem_cbse_08_002** (Oxidation Number) to calculate oxidation state changes.', 'Do a **re-diagnostic**: Draw CH₃CH₂CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Using excess PCC on a primary alcohol will give the carboxylic acid because PCC is an oxidising agent." Evaluate this statement.', answer: '**Answer:** False',
                  options: ['**Answer:** False', 'strong'],
                  hint: 'If stuck, review **c10_chem_cbse_04_006** (Functional Groups) and practice drawing all isomers.',
                  misconception: '**Misconception:** "Primary alcohols always give aldehydes on oxidation; secondary always give ketones; tertiary give nothing." **Why it\'s.' }
          ],
            remediations: { 'misconception-primary-alcohols-always-give': { steps: ['If a student cannot classify alcohols or predict products: 1.', 'Revisit **c10_chem_cbse_04_006** (Functional Groups) to practice identifying 1°, 2°, 3° alcohols from structures.', 'Revisit **c11_chem_cbse_08_001** and **c11_chem_cbse_08_002** (Oxidation Number) to calculate oxidation state changes.', 'Do a **re-diagnostic**: Draw CH₃CH₂CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_002', difficulty: 'standard',
          question: 'Rosenmund reduction is the catalytic hydrogenation of an acyl chloride (acid.',
          hint: 'Review c11_chem_cbse_08_001 (redox basics) and c11_chem_cbse_04_007 (carbonyl sp².',
          misconception: 'Students often write the catalyst as "Pd/BaSO₄" but forget the poison (quinoline/sulfur), then claim the product is the.',
          parts: [
                { id: 'a', prompt: 'Write the balanced chemical equation for the Rosenmund reduction of propanoyl chloride (CH₃CH₂COCl). Name the catalyst system and the gaseous byproduct.', answer: 'CH₃CH₂COCl + H₂ → CH₃CH₂CHO + HCl (g)',
                  options: ['CH₃CH₂COCl + H₂ → CH₃CH₂CHO + HCl (g)', 'reduction of acid chloride with LiAlH₄'],
                  hint: 'Review c11_chem_cbse_08_001 (redox basics) and c11_chem_cbse_04_007 (carbonyl sp² hybridisation).',
                  misconception: 'Students often write the catalyst as "Pd/BaSO₄" but forget the poison (quinoline/sulfur), then claim the product is the alcohol because.' }
          ],
            remediations: { 'students-often-write-the-catalyst': { steps: ['If the student cannot recall the catalyst composition or the poisoning role: (1) Revisit c11_chem_cbse_07_008 (Le.', '(2) Watch a 5-min video on "heterogeneous catalyst poisoning" (e.g., Lindlar\'s catalyst analogy).', '(3) Re-do Diagnostic Questions 1 and 2, then write the Rosenmund equation from memory with all conditions.', '(4) Check c12_chem_cbse_08_001 for comparison: oxidation of primary alcohol stops at aldehyde only with PCC — different.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_003', difficulty: 'standard',
          question: 'Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd).',
          hint: 'Review the tetrahedral intermediate formation and collapse in nucleophilic acyl.',
          misconception: 'Students often write the reaction of acyl chloride with Grignard reagent as stopping at the ketone (RCOCl + RMgX →.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd) to avoid',
                  options: ['Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd) to avoid', 'Aldehydes are prepared by controlled oxidation or dehydrogenation of primary alcohols,', 'Rosenmund reduction is the catalytic hydrogenation of an acyl chloride (acid chloride) to', 'Physical properties of aldehydes and ketones refer to their observable characteristics'],
                  hint: 'Review the tetrahedral intermediate formation and collapse in nucleophilic acyl substitution.',
                  misconception: 'Students often write the reaction of acyl chloride with Grignard reagent as stopping at the ketone (RCOCl + RMgX → RCOR), ignoring that the.' }
          ],
            remediations: { 'students-often-write-the-reaction': { steps: ['Revisit nucleophilic addition mechanism (c12_chem_cbse_08_005) and draw the tetrahedral intermediate for both acyl.', 'Practice writing the two-step sequence for nitrile: addition → imine salt → hydrolysis.', 'Use molecular models to see steric hindrance: the ketone carbonyl is more accessible than the acyl chloride carbonyl?', 'Actually, electronic factors dominate.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_004', difficulty: 'standard',
          question: 'Physical properties of aldehydes and ketones refer to their observable.',
          hint: 'Review Class 11 Chemical Bonding (c11_chem_cbse_04_010) for bond polarity and States.',
          misconception: 'Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each other because they.',
          parts: [
                { id: 'a', prompt: 'Why are lower aldehydes and ketones (methanal, ethanal, propanone) miscible with water in all proportions, but solubility decreases rapidly as the alkyl chain.', answer: 'Lower members have small hydrocarbon chains',
                  options: ['Lower members have small hydrocarbon chains', 'aldehydes/ketones form hydrogen bonds with each other in water'],
                  hint: 'Review Class 11 Chemical Bonding (c11_chem_cbse_04_010) for bond polarity and States of Matter.',
                  misconception: 'Students often believe that aldehydes and ketones can form intermolecular hydrogen bonds with each other because they contain an oxygen.' }
          ],
            remediations: { 'aldehydes-and-ketones-can-form': { steps: ['If the student cannot distinguish dipole-dipole from H-bonding, have them draw the Lewis structure of propanal and.', 'Then draw ethanol and show the O-H bond.', 'Use a simple demonstration: place a drop of acetone and a drop of ethanol on a watch glass; acetone evaporates faster.', 'Revisit Class 11 node c11_chem_cbse_04_010 (polarity of bonds) and c11_chem_cbse_05_003 (hydrogen bonding in states.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_005', difficulty: 'standard',
          question: 'Nucleophilic addition reaction is the characteristic reaction of aldehydes and.',
          hint: 'If stuck, revisit c11_chem_cbse_04_011 (resonance in carbonyl) and c11_chem_cbse_04_012.',
          misconception: 'Students often write the product of ammonia derivative addition (e.g., 2,4-DNPH, hydroxylamine, semicarbazide) as the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Nucleophilic addition reaction is the characteristic reaction of aldehydes and ketones',
                  options: ['Nucleophilic addition reaction is the characteristic reaction of aldehydes and ketones', 'Aldehydes are prepared by controlled oxidation or dehydrogenation of primary alcohols,', 'Rosenmund reduction is the catalytic hydrogenation of an acyl chloride (acid chloride) to', 'Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd) to avoid'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_011 (resonance in carbonyl) and c11_chem_cbse_04_012 (dipole.',
                  misconception: 'Students often write the product of ammonia derivative addition (e.g., 2,4-DNPH, hydroxylamine, semicarbazide) as the carbinolamine.' }
          ],
            remediations: { 'students-often-write-the-product': { steps: ['If the student cannot draw the dehydration step: (1) Revisit Class 11 resonance and acid-base concepts.', '(2) Practice writing the mechanism for imine formation from acetone + NH₃: attack → carbinolamine → protonate OH → lose.', '(3) Re-diagnostic: "Draw the complete mechanism for reaction of cyclohexanone with hydroxylamine to form cyclohexanone.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_08_006', difficulty: 'standard',
          question: 'Aldol condensation is a base-catalyzed reaction where aldehydes or ketones.',
          hint: 'If stuck on enolate formation, review Class 11 ionic equilibrium (Ka, pKa of carbonyl α-H.',
          misconception: 'Students write the enolate as CH₃-CH⁻-CHO (carbanion on α-carbon) without showing resonance stabilization CH₃-CH=CH-O⁻.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Aldol condensation is a base-catalyzed reaction where aldehydes or ketones containing at',
                  options: ['Aldol condensation is a base-catalyzed reaction where aldehydes or ketones containing at', 'Aldehydes are prepared by controlled oxidation or dehydrogenation of primary alcohols,', 'Rosenmund reduction is the catalytic hydrogenation of an acyl chloride (acid chloride) to', 'Ketones are prepared from acyl chlorides by reaction with dialkylcadmium (R₂Cd) to avoid'],
                  hint: 'If stuck on enolate formation, review Class 11 ionic equilibrium (Ka, pKa of carbonyl α-H ~17-20).',
                  misconception: 'Students write the enolate as CH₃-CH⁻-CHO (carbanion on α-carbon) without showing resonance stabilization CH₃-CH=CH-O⁻, and then draw the.' }
          ],
            remediations: { 'students-write-the-enolate-as': { steps: ['Revisit c12_chem_cbse_08_005 (Nucleophilic Addition) — confirm understanding of carbonyl electrophilicity and.', 'Review Class 11 enolate chemistry: acidity of α-H, resonance stabilization of enolate (c11_chem_cbse_07_009.', 'Practice drawing the enolate resonance structures for 5 different carbonyls (ethanal, propanone, butan-2-one.', 'Re-do Diagnostic Questions 1-3 with explicit enolate resonance arrows.'], labTask: { instruction: 'On the interactive: probe a pH below 4 — acid or base? — then check.', widget: 'ph', validate: 'ph:probe=25' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
