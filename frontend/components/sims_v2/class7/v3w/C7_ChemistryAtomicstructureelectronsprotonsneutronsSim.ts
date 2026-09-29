import type { SimDef } from '../../engine/types';
import C7_ChemistryAtomicstructureelectronsprotonsneutronsSim from '../../../simulations/c6_12/C7_ChemistryAtomicstructureelectronsprotonsneutronsSim';

/** v3 wrapped master — C7_ChemistryAtomicstructureelectronsprotonsneutronsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_chemistryatomicstructureelectronsprotonsneutronssim: SimDef = {
    id: 'v3w_c7_chemistryatomicstructureelectronsprotonsneutronssim',
    title: 'Introduction to Metals and Non-metals: Examples',
    subtitle: 'Covers the identification, basic categorization, and common examples of metals and.',
    classLevel: 7, subject: 'chemistry', topic: 'Introduction to Metals and Non-metals: Examples',
    chapters: [],
    nodeIds: ['c7_chem_ch01_001', 'c7_chem_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When walking through your school kitchen or examining household utensils in India, you notice that pressure.', goal: 'Master Introduction to Metals and Non-metals: Examples.' },
    discovery: {
        question: 'Which of the following is a liquid non-metal commonly found in laboratory thermometers?',
        options: ['Bromine is the correct answer', 'Mercury', 'all shiny materials are metals and all dull materials are non-metals'],
        answer: 'Bromine is the correct answer',
        hook: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
    },
    teaching: [
        { title: 'Metals are naturally occurring chemical.', text: 'Metals are naturally occurring chemical elements that are typically lustrous, malleable, ductile, and good conductors of heat and electricity (such as iron, copper, and aluminium), whereas non-metals.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_chem_ch01_001', title: 'Metals are naturally occurring chemical.',
          scaffold: { problem: 'A student collects four unknown substances from the laboratory: Substance A (shiny grey solid, bends without breaking), Substance B (yellow.',
            steps: [
            { text: 'Examine the physical state and appearance of Substance A (shiny grey solid, bends).' },
            { text: 'Conclude that Substance A is a metal because it is malleable and lustrous.' },
            { text: 'Examine Substances B, C, and D: B is a brittle yellow powder (sulfur), C is a liquid metal (mercury - wait, let\'s look.' },
            { text: 'Group Substance A (metal), Substance B (non-metal), Substance C (metal - mercury), and Substance D (non-metal).' },
            { text: 'Verify classifications against standard chemical properties (lustre, state, malleability).', faded: true, blankAnswer: 'Substance A: Metal, Substance B: Non-metal, Substance C:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_chem_ch01_006', title: 'Metals are good conductors of.',
          scaffold: { problem: 'A technician in a workshop near Delhi needs to wire a heavy-duty electrical heating appliance.',
            steps: [
            { text: 'Identify the goal, which is to find materials that allow electric current to pass through them efficiently (electrical.' },
            { text: 'Examine the given list of materials: copper, sulfur, aluminium, and plastic.' },
            { text: 'Classify each material as a metal or non-metal. Copper and aluminium are metals; sulfur and plastic are non-metals.' },
            { text: 'Recall that metals are good electrical conductors due to free-moving electrons, while non-metals (sulfur and plastic).' },
            { text: 'Conclude that the technician must select the copper wire and the aluminium wire for effective electrical conduction.', faded: true, blankAnswer: 'Copper and aluminium wires, because they are metallic.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_chem_ch01_006', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Metals and Non-metals: Examples', spots: [
            { id: 's1', label: 'Metals are naturally occurring chemical', prompt: 'Which idea is this? — Metals are naturally occurring chemical elements that are typically lustrous, malleable,.', answer: 'Metals are naturally occurring chemical', options: ['Metals are naturally occurring chemical', 'Metals are good conductors of'] },
            { id: 's2', label: 'Metals are good conductors of', prompt: 'Which idea is this? — Metals are good conductors of electricity, allowing electric current to pass through them.', answer: 'Metals are good conductors of', options: ['Metals are good conductors of', 'Metals are naturally occurring chemical'] }
          ] } }
    ],
    explore: { component: C7_ChemistryAtomicstructureelectronsprotonsneutronsSim, prompt: 'Explore the interactive — Introduction to Metals and Non-metals: Examples' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_chem_ch01_001', difficulty: 'standard',
          question: 'Metals are naturally occurring chemical elements that are typically lustrous,.',
          hint: 'Review Class 6 material on properties of materials, specifically focusing on lustre,.',
          misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a liquid non-metal commonly found in laboratory thermometers?', answer: 'Bromine is the correct answer',
                  options: ['Bromine is the correct answer', 'Mercury', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' },
                { id: 'b', prompt: 'Classify the following elements into metals and non-metals: Iron, Carbon, Oxygen, Aluminium.', answer: 'Iron and Aluminium are metals',
                  options: ['Iron and Aluminium are metals', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' }
          ],
            remediations: { 'all-shiny-materials-are-metals': { steps: ['To fix this, guide the student to test another property beyond appearance, such as malleability or electrical.', 'Have them gently press graphite with a pencil lead or test if iodine conducts electricity, showing that appearance.'] } } },
        { type: 'subpart', nodeId: 'c7_chem_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All metals are solid at room temperature." Is this statement scientifically accurate? Justify your reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' },
                { id: 'b', prompt: 'Design a simple classification test using everyday kitchen items to distinguish between an iron spoon (metal) and a piece of chalk (non-metal/calcium.', answer: 'A good answer proposes: 1',
                  options: ['A good answer proposes: 1', 'all shiny materials are metals and all dull materials are non-metals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that all shiny materials are metals and all dull materials are non-metals.' }
          ],
            remediations: { 'all-shiny-materials-are-metals': { steps: ['To fix this, guide the student to test another property beyond appearance, such as malleability or electrical.', 'Have them gently press graphite with a pencil lead or test if iodine conducts electricity, showing that appearance.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
