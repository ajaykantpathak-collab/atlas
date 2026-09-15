import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch01_p2: SimDef = {
    id: 'v3_c10_chem_ch01_p2',
    title: 'Chemical Reactions and Equations',
    subtitle: 'Learn to read reactions like sentences — and balance them so no atom goes missing.',
    classLevel: 10, subject: 'chemistry', topic: 'Chemical Reactions and Equations · Part 2/2',
    chapters: ['c10_chem_ch01'],
    nodeIds: ['c10_chem_cbse_01_007', 'c10_chem_cbse_01_008', 'c10_chem_cbse_01_009', 'c10_chem_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lab chemist documenting an experiment', intro: 'Your iron nail left in copper sulphate turned coppery brown overnight. Your job: write the equation that explains where the copper came from.', goal: 'Identify reaction types on sight and balance any equation without losing an atom.' },
    discovery: {
        question: 'You burn 10g of magnesium and the ash weighs MORE than 10g. Where did the extra mass come from?',
        options: ['Oxygen from the air joined the magnesium', 'Burning creates matter', 'The scale is wrong', 'Heat adds weight'],
        answer: 'Oxygen from the air joined the magnesium',
        hook: 'Most students think burning makes things disappear. Mass is never created or destroyed — the missing mass was in the air all along.',
    },
    teaching: [
        { title: 'Oxidation and Reduction Reactions: Definitions and Examples', text: 'Oxidation is the gain of oxygen or loss of hydrogen by a substance, or the loss of electrons by an atom/ion; reduction is the loss of oxygen or gain of hydrogen by a substance, or the gain.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_01_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Balance three equations in the lab — start with the unbalanced skeleton and place coefficients until every atom counts.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_007', title: 'Oxidation and Reduction Reactions: Definitions and Examples',
          caseStudy: { intro: 'Begin with a real-world observation: an iron nail left in the rain develops a reddish-brown coating (rust), while a copper vessel turns green over time.',
            decisions: [{ prompt: 'State the classical definition of oxidation and reduction in terms of oxygen and hydrogen transfer.', options: [
                { text: 'Oxidation is gain of oxygen or loss of hydrogen', outcome: 'Oxidation is gain of oxygen or loss of hydrogen; reduction is loss of oxygen or gain of hydrogen.' },
                { text: 'oxidation is loss of oxygen', outcome: 'Not quite — Students consistently confuse the oxidising agent with the species that is oxidised.', reveals: 'students-consistently-confuse-the-oxidising' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_008', title: 'Redox Reactions: Simultaneous Oxidation and Reduction',
          caseStudy: { intro: 'Observe an iron nail left in the open during monsoon — it develops a reddish-brown coating (rust).',
            decisions: [{ prompt: 'Define a redox reaction and state what happens to the oxidising agent and the reducing agent during the reaction.', options: [
                { text: 'A redox reaction is a reaction in', outcome: 'A redox reaction is a reaction in which oxidation and reduction occur simultaneously.' },
                { text: 'oxidising agent gets oxidised', outcome: 'Not quite — Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they.', reveals: 'oxidising-agent-gets-oxidised-and' },
                { text: 'reducing agent gets reduced', outcome: 'Not quite — Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they.', reveals: 'oxidising-agent-gets-oxidised-and' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_009', title: 'Effects of Oxidation in Everyday Life: Corrosion of Metals',
          caseStudy: { intro: 'Observe a rusted iron gate or a green-coated copper statue in your neighborhood — both are familiar examples of metals "rotting" due to oxidation.',
            decisions: [{ prompt: 'Define corrosion and write the chemical formula of rust. State the two essential conditions required for rusting of iron.', options: [
                { text: 'Corrosion is the gradual destruction of metals by electrochemical reaction with', outcome: 'Corrosion is the gradual destruction of metals by electrochemical reaction with environment.' },
                { text: 'rust is Fe₂O₃ only', outcome: 'Not quite — Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think.', reveals: 'students-write-the-rust-formula' },
                { text: 'only air is needed', outcome: 'Not quite — Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think.', reveals: 'students-write-the-rust-formula' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_010', title: 'Effects of Oxidation: Rancidity of Food and Prevention',
          caseStudy: { intro: 'Begin with a real-world observation: open a packet of chips or namkeen left exposed to air for two days — the stale, paint-like smell is rancidity.',
            decisions: [{ prompt: 'What is the chemical process responsible for the development of unpleasant smell and taste in butter left uncovered at room temperature for.', options: [
                { text: 'Rancidity — the aerial oxidation of unsaturated fatty acids present in butterfat,', outcome: 'Rancidity — the aerial oxidation of unsaturated fatty acids present in butterfat, producing.' },
                { text: 'bacterial decomposition', outcome: 'Not quite — Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture".', reveals: 'students-often-write-rancidity-is' },
                { text: 'fermentation', outcome: 'Not quite — Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture".', reveals: 'students-often-write-rancidity-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school project, Kavya leaves an iron nail standing in blue copper sulphate solution overnight. In the morning the blue has faded to pale green and the nail has a reddish-brown coat. Her lab partner says the colour just \'soaked into the nail\' like dye.',
            decisions: [{ prompt: 'What actually happened, and how can she prove it was a chemical change?', options: [
                { text: 'Iron displaced copper from the solution — iron is more reactive, so it went into solution as iron sulphate (the green tint) while copper metal deposited on the nail (the reddish-brown coat). A new substance formed on the nail and the solution\'s composition changed — both signs of chemical change, plus the tube warms slightly.', outcome: 'The colour change, the deposited new metal, and the heat given off together confirm a displacement reaction, not staining.' },
                { text: 'Her partner is right — only colours moved around, which is a physical change like mixing paint.', outcome: 'A physical change makes no new substance; here copper metal actually left the solution and iron entered it, so the reaction is chemical.', reveals: 'colour-change-is-physical' },
                { text: 'The nail simply rusted in the water overnight, and the colour fading is a coincidence.', outcome: 'Rust is iron oxide, which needs oxygen and would not explain copper appearing on the nail or the solution turning green.', reveals: 'all-discolouration-is-rust' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'A balanced equation is a promise: atoms are never lost, only rearranged. Every industry from steel to medicine runs on that promise.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_007', difficulty: 'standard',
          question: 'Oxidation is the gain of oxygen or loss of hydrogen by a substance, or the loss.',
          hint: 'If stuck, revisit c10_chem_cbse_01_005 (displacement reactions) and c9_chem_ch3_5 (ionic.',
          misconception: 'Students consistently confuse the oxidising agent with the species that is oxidised.',
          parts: [
                { id: 'a', prompt: 'State the classical definition of oxidation and reduction in terms of oxygen and hydrogen transfer.', answer: 'Oxidation is gain of oxygen or loss of hydrogen',
                  options: ['Oxidation is gain of oxygen or loss of hydrogen', 'oxidation is loss of oxygen'],
                  hint: 'If stuck, revisit c10_chem_cbse_01_005 (displacement reactions) and c9_chem_ch3_5 (ionic.',
                  misconception: 'Students consistently confuse the oxidising agent with the species that is oxidised.' },
                { id: 'b', prompt: 'In the reaction Fe₂O₃ + 3CO → 2Fe + 3CO₂, explain why Fe₂O₃ is said to be reduced and CO is oxidised, using the classical definition.', answer: 'Fe₂O₃ loses oxygen (loss of oxygen = reduction) to form Fe',
                  options: ['Fe₂O₃ loses oxygen (loss of oxygen = reduction) to form Fe', 'Fe₂O₃ gains oxygen'],
                  hint: 'If stuck, revisit c10_chem_cbse_01_005 (displacement reactions) and c9_chem_ch3_5 (ionic.',
                  misconception: 'Students consistently confuse the oxidising agent with the species that is oxidised.' },
                { id: 'c', prompt: 'Identify the oxidised and reduced species in the reaction: Zn + CuSO₄ → ZnSO₄ + Cu. Use the electronic definition (electron transfer).', answer: 'Zn → Zn²⁺ + 2e⁻ (oxidation, loss of electrons)',
                  options: ['Zn → Zn²⁺ + 2e⁻ (oxidation, loss of electrons)', 'Cu is oxidised because it becomes Cu²⁺'],
                  hint: 'If stuck, revisit c10_chem_cbse_01_005 (displacement reactions) and c9_chem_ch3_5 (ionic.',
                  misconception: 'Students consistently confuse the oxidising agent with the species that is oxidised.' },
                { id: 'd', prompt: 'Compare the two reactions: (i) 2Mg + O₂ → 2MgO and (ii) H₂ + Cl₂ → 2HCl. In which reaction does oxidation occur according to the classical definition?', answer: 'Classical: Reaction (i)',
                  options: ['Classical: Reaction (i)', 'only reaction (i) shows oxidation'],
                  hint: 'If stuck, revisit c10_chem_cbse_01_005 (displacement reactions) and c9_chem_ch3_5 (ionic.',
                  misconception: 'Students consistently confuse the oxidising agent with the species that is oxidised.' }
          ],
            remediations: { 'students-consistently-confuse-the-oxidising': { steps: ['Write the half-reactions explicitly: Na → Na⁺ + e⁻ (oxidation) and Cl₂ + 2e⁻ → 2Cl⁻ (reduction).', 'Label each half-reaction "oxidation" or "reduction".', 'Identify the reactant in the oxidation half-reaction — that is the reducing agent.', 'Practise with 5 reactions from NCERT Exemplar, saying aloud "Cl₂ is reduced, so Cl₂ is the oxidising agent" until the.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_008', difficulty: 'standard',
          question: 'A redox reaction is a chemical reaction in which oxidation (loss of electrons.',
          hint: 'Review oxidation state rules (oxygen = -2, hydrogen = +1, group 1 = +1, group 2 = +2) and.',
          misconception: 'Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they focus on the.',
          parts: [
                { id: 'a', prompt: 'Define a redox reaction and state what happens to the oxidising agent and the reducing agent during the reaction.', answer: 'A redox reaction is a reaction in',
                  options: ['A redox reaction is a reaction in', 'oxidising agent gets oxidised', 'reducing agent gets reduced'],
                  hint: 'Review oxidation state rules (oxygen = -2, hydrogen = +1, group 1 = +1, group 2 = +2) and practice.',
                  misconception: 'Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they focus on the agent\'s name rather than.' },
                { id: 'b', prompt: 'Compare the reactions: (i) 2Mg(s) + O₂(g) → 2MgO(s) (ii) Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g) In which reaction does the same element undergo both oxidation.', answer: 'Neither reaction shows disproportionation (same element oxidised and reduced)',
                  options: ['Neither reaction shows disproportionation (same element oxidised and reduced)', 'oxidising agent gets oxidised', 'reducing agent gets reduced'],
                  hint: 'Review oxidation state rules (oxygen = -2, hydrogen = +1, group 1 = +1, group 2 = +2) and practice.',
                  misconception: 'Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they focus on the agent\'s name rather than.' }
          ],
            remediations: { 'oxidising-agent-gets-oxidised-and': { steps: ['Revisit the definitions in c10_chem_cbse_01_007 — write "Oxidising agent = electron acceptor = gets reduced" and.', 'For 5 different redox reactions from the textbook, explicitly write: "Substance X loses e⁻ → X is reducing agent →.', 'Use the mnemonic "OIL RIG" (Oxidation Is Loss, Reduction Is Gain) and "LEO says GER" (Loss of Electrons is Oxidation.', 'Practice identifying agents in the displacement reactions from c10_chem_cbse_01_005 until the pattern is automatic.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they focus on the.',
          parts: [
                { id: 'a', prompt: 'A student writes the following for the reaction Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s): "Fe is the oxidising agent because it reacts with CuSO₄." Evaluate this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'oxidising agent gets oxidised', 'reducing agent gets reduced'],
                  hint: 'Review oxidation state rules (oxygen = -2, hydrogen = +1, group 1 = +1, group 2 = +2) and practice.',
                  misconception: 'Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they focus on the agent\'s name rather than.' },
                { id: 'b', prompt: 'Design a simple activity using materials available in a school laboratory to demonstrate that oxidation and reduction occur simultaneously in the reaction.', answer: 'Heat copper turnings with conc',
                  options: ['Heat copper turnings with conc', 'oxidising agent gets oxidised', 'reducing agent gets reduced'],
                  hint: 'Review oxidation state rules (oxygen = -2, hydrogen = +1, group 1 = +1, group 2 = +2) and practice.',
                  misconception: 'Students often think "oxidising agent gets oxidised" and "reducing agent gets reduced" because they focus on the agent\'s name rather than.' }
          ],
            remediations: { 'oxidising-agent-gets-oxidised-and': { steps: ['Revisit the definitions in c10_chem_cbse_01_007 — write "Oxidising agent = electron acceptor = gets reduced" and.', 'For 5 different redox reactions from the textbook, explicitly write: "Substance X loses e⁻ → X is reducing agent →.', 'Use the mnemonic "OIL RIG" (Oxidation Is Loss, Reduction Is Gain) and "LEO says GER" (Loss of Electrons is Oxidation.', 'Practice identifying agents in the displacement reactions from c10_chem_cbse_01_005 until the pattern is automatic.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_009', difficulty: 'standard',
          question: 'Corrosion is the gradual deterioration of a metal due to electrochemical.',
          hint: 'Revisit the definitions of oxidation and reduction in terms of electron transfer.',
          misconception: 'Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think rusting is a simple.',
          parts: [
                { id: 'a', prompt: 'Define corrosion and write the chemical formula of rust. State the two essential conditions required for rusting of iron.', answer: 'Corrosion is the gradual destruction of metals by electrochemical reaction with',
                  options: ['Corrosion is the gradual destruction of metals by electrochemical reaction with', 'rust is Fe₂O₃ only', 'only air is needed'],
                  hint: 'Revisit the definitions of oxidation and reduction in terms of electron transfer.',
                  misconception: 'Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think rusting is a simple combination reaction.' },
                { id: 'b', prompt: 'Explain why rusting is classified as an oxidation reaction. Why does an iron nail rust faster in salt water than in pure water?', answer: 'Rusting is oxidation',
                  options: ['Rusting is oxidation', 'salt reacts with iron', 'rusting is not redox'],
                  hint: 'Revisit the definitions of oxidation and reduction in terms of electron transfer.',
                  misconception: 'Students write the rust formula as Fe₂O₃ (anhydrous) instead of Fe₂O₃·xH₂O (hydrated), and think rusting is a simple combination reaction.' }
          ],
            remediations: { 'students-write-the-rust-formula': { steps: ['Revisit the classic 3-test-tube rusting experiment (c7_chem_ch02_005) — perform it physically or watch a video.', 'Write the two half-reactions (Fe → Fe²⁺ + 2e⁻ and O₂ + 2H₂O + 4e⁻ → 4OH⁻) and combine them step-by-step to derive the.', 'Compare a rusted nail (flaky) with an aluminium foil (shiny) — discuss why Al₂O₃ protects but Fe₂O₃ doesn\'t.', 'For galvanization, draw a diagram of scratched galvanized iron showing Zn²⁺ ions entering solution and electrons.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_01_010', difficulty: 'standard',
          question: 'Rancidity is the slow oxidation of fats and oils (triglycerides) in food.',
          hint: 'Revisit c10_chem_cbse_01_007 for oxidation definition and c9_chem_ch3_4 for covalent.',
          misconception: 'Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture" in board exams.',
          parts: [
                { id: 'a', prompt: 'Compare the role of BHA (butylated hydroxyanisole) added to packaged snacks with the role of nitrogen gas flushing in preventing rancidity.', answer: 'Nitrogen flushing removes the reactant (oxygen) from the environment',
                  options: ['Nitrogen flushing removes the reactant (oxygen) from the environment', 'remove oxygen', 'slow down reaction'],
                  hint: 'Revisit c10_chem_cbse_01_007 for oxidation definition and c9_chem_ch3_4 for covalent bonding.',
                  misconception: 'Students often write "rancidity is caused by bacteria" or "rancidity happens because of moisture" in board exams.' }
          ],
            remediations: { 'students-often-write-rancidity-is': { steps: ['Show two butter samples — one kept in fridge (covered), one on windowsill (open). After 3 days, smell both.', 'Ask: "Which one smells like old paint? Did bacteria grow on the fridge sample?" Guide to: no visible mould, yet smell.', 'Write the word equation: Fat + Oxygen → Aldehydes/Ketones (rancid smell).', 'Emphasise: no water, no bacteria needed — only air and unsaturated bonds.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
