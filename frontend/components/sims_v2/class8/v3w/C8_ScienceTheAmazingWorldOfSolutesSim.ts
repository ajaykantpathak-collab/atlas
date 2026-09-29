import type { SimDef } from '../../engine/types';
import C8_ScienceTheAmazingWorldOfSolutesSim from '../../../simulations/c6_12/C8_ScienceTheAmazingWorldOfSolutesSim';

/** v3 wrapped master — C8_ScienceTheAmazingWorldOfSolutesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_sciencetheamazingworldofsolutessim: SimDef = {
    id: 'v3w_c8_sciencetheamazingworldofsolutessim',
    title: 'Solution: Definition and Components (Solute + Solvent)',
    subtitle: 'This node covers the definition of a solution, the distinction between solute and.',
    classLevel: 8, subject: 'science', topic: 'Solution: Definition and Components (Solute + Solvent)',
    chapters: [],
    nodeIds: ['c8_physics_ch5_1'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Observe a glass of nimbu pani (lemonade) being made at home: sugar crystals disappear when stirred into.', goal: 'Master Solution: Definition and Components (Solute + Solvent).' },
    discovery: {
        question: 'Air is a solution of gases. Which gas is the solvent and which are solutes? Explain why air qualifies as a solution even though all components are gases.',
        options: ['In air, nitrogen (~78%) is the solvent', 'oxygen is the solvent', 'the solute is always the solid and the solvent is always the liquid'],
        answer: 'In air, nitrogen (~78%) is the solvent',
        hook: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom.',
    },
    teaching: [
        { title: 'A solution is a homogeneous mixture of two.', text: 'A solution is a homogeneous mixture of two or more substances where the particles are uniformly distributed at the molecular level and do not settle out.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch5_1', title: 'A solution is a homogeneous mixture of.',
          scaffold: { problem: 'Identify the solute and solvent in each of the following solutions: (a) Carbonated water (CO₂ gas dissolved in water), (b) 14-carat gold.',
            steps: [
            { text: 'Recall the definition — solvent is the component in larger amount; solute is the component in smaller amount.' },
            { text: 'For (a) carbonated water: Water is the liquid in large volume (~99%), CO₂ is the gas in small volume.' },
            { text: 'For (b) 14-carat gold: 14/24 = 58.3% gold, rest copper/silver. Gold is the majority component.' },
            { text: 'For (c) vinegar: 5% acetic acid, 95% water. Water is in larger amount. Solvent = water, solute = acetic acid.' },
            { text: 'For (d) bronze: Typically 88% copper, 12% tin. Copper is the majority. Solvent = copper, solute = tin.', faded: true, blankAnswer: '(a) Solute: CO₂, Solvent: H₂O; (b) Solute: Cu/Ag, Solvent:.' }
            ] } }
    ],
    explore: { component: C8_ScienceTheAmazingWorldOfSolutesSim, prompt: 'Explore the interactive — Solution: Definition and Components (Solute + Solvent)' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch5_1', difficulty: 'standard',
          question: 'A solution is a homogeneous mixture of two or more substances where the.',
          hint: 'Revisit Class 6 "Testing Substances with Natural Indicators" (c6_physics_ch02_008) and.',
          misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom.',
          parts: [
                { id: 'a', prompt: 'Air is a solution of gases. Which gas is the solvent and which are solutes? Explain why air qualifies as a solution even though all components are gases.', answer: 'In air, nitrogen (~78%) is the solvent',
                  options: ['In air, nitrogen (~78%) is the solvent', 'oxygen is the solvent', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' },
                { id: 'b', prompt: 'Compare brass (an alloy of copper and zinc) and salt water. Both are solutions.', answer: 'Similarities: Both are homogeneous at molecular level',
                  options: ['Similarities: Both are homogeneous at molecular level', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' }
          ],
            remediations: { 'the-solute-is-always-the': { steps: ['Show three solutions — salt water (solid-liquid), vinegar (liquid-liquid: acetic acid in water), and air (gas-gas).', 'Ask: "Which is the solvent in each?" Guide them to compare amounts, not states.', 'Have them read labels on household products (e.g., hand sanitizer: 70% alcohol, 30% water — alcohol is solvent).', 'Practice with 5 varied examples until they consistently apply "larger amount = solvent."'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom.',
          parts: [
                { id: 'a', prompt: 'A classmate claims: "In a solution of 20 g sugar in 100 g water, sugar is the solvent because it is the solid." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'the solid is always the solute', 'the liquid is always the solvent', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' },
                { id: 'b', prompt: 'Design a simple kitchen experiment to demonstrate that a solution is homogeneous.', answer: 'Materials: Salt, water, two transparent glasses, spoon, food colour (optional)',
                  options: ['Materials: Salt, water, two transparent glasses, spoon, food colour (optional)', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' },
                { id: 'c', prompt: 'Compare brass (an alloy of copper and zinc) and salt water. Both are solutions.', answer: 'Similarities: Both are homogeneous at molecular level',
                  options: ['Similarities: Both are homogeneous at molecular level', 'the solute is always the solid and the solvent is always the liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "the solute is always the solid and the solvent is always the liquid" because most classroom examples are.' }
          ],
            remediations: { 'the-solute-is-always-the': { steps: ['Show three solutions — salt water (solid-liquid), vinegar (liquid-liquid: acetic acid in water), and air (gas-gas).', 'Ask: "Which is the solvent in each?" Guide them to compare amounts, not states.', 'Have them read labels on household products (e.g., hand sanitizer: 70% alcohol, 30% water — alcohol is solvent).', 'Practice with 5 varied examples until they consistently apply "larger amount = solvent."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
