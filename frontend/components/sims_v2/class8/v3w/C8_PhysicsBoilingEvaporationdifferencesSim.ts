import type { SimDef } from '../../engine/types';
import C8_PhysicsBoilingEvaporationdifferencesSim from '../../../simulations/c6_12/C8_PhysicsBoilingEvaporationdifferencesSim';

/** v3 wrapped master — C8_PhysicsBoilingEvaporationdifferencesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_physicsboilingevaporationdifferencessim: SimDef = {
    id: 'v3w_c8_physicsboilingevaporationdifferencessim',
    title: 'Separation of Solutions: Evaporation and Distillation',
    subtitle: 'Covers simple evaporation (open container heating) and simple distillation (using a.',
    classLevel: 8, subject: 'physics', topic: 'Separation of Solutions: Evaporation and Distillation',
    chapters: [],
    nodeIds: ['c8_physics_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you have a glass of saltwater from the Arabian Sea and you want to get both the salt and the water.', goal: 'Master Separation of Solutions: Evaporation and Distillation.' },
    discovery: {
        question: 'What is the main difference between evaporation and distillation in terms of what is collected at the end of the process?',
        options: ['In evaporation, only the solid solute is collected as residue', 'both collect the solvent', 'distillation separates *any* mixture, e'],
        answer: 'In evaporation, only the solid solute is collected as residue',
        hook: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to.',
    },
    teaching: [
        { title: 'Evaporation is a separation technique where.', text: 'Evaporation is a separation technique where a soluble solid is recovered from a solution by heating the solvent until it vaporizes, leaving the solid residue behind.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch5_9', title: 'Evaporation is a separation technique.',
          scaffold: { problem: 'A student collects 500 mL of seawater from Marina Beach, Chennai. The seawater contains 3.5 g of dissolved salts per 100 mL.',
            steps: [
            { text: 'Identify given quantities: Volume of seawater = 500 mL, Concentration of salts = 3.5 g / 100 mL.' },
            { text: 'Convert concentration to consistent units: 3.5 g / 100 mL = 0.035 g/mL.' },
            { text: 'Substitute values: mass = 0.035 g/mL × 500 mL.' },
            { text: 'Compute: 0.035 × 500 = 17.5 g. Units: (g/mL) × mL = g. The water vapour escapes into the atmosphere, so only solid salt.' },
            { text: 'Verify: 500 mL is 5 times 100 mL, so salt = 5 × 3.5 g = 17.5 g. Physically reasonable for a shallow dish evaporation.', faded: true, blankAnswer: '17.5 g of salt. The water vapour is not collected because.' }
            ] } }
    ],
    explore: { component: C8_PhysicsBoilingEvaporationdifferencesSim, prompt: 'Explore the interactive — Separation of Solutions: Evaporation and Distillation' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch5_9', difficulty: 'standard',
          question: 'Evaporation is a separation technique where a soluble solid is recovered from a.',
          hint: 'Review c8_physics_ch5_1 and c8_physics_ch5_2 for solution components, and.',
          misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to.',
          parts: [
                { id: 'a', prompt: 'What is the main difference between evaporation and distillation in terms of what is collected at the end of the process?', answer: 'In evaporation, only the solid solute is collected as residue',
                  options: ['In evaporation, only the solid solute is collected as residue', 'both collect the solvent', 'distillation separates *any* mixture, e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to get pure water and.' },
                { id: 'b', prompt: 'A student has 250 mL of a copper sulphate solution with a concentration of 16 g per 100 mL. She heats it to complete evaporation.', answer: 'Step 1: Identify given: volume = 250 mL, concentration = 16 g/100 mL',
                  options: ['Step 1: Identify given: volume = 250 mL, concentration = 16 g/100 mL', 'distillation separates *any* mixture, e', 'a mixture of sand and water can be distilled to get pure water and sand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to get pure water and.' }
          ],
            remediations: { 'distillation-separates-any-mixture': { steps: ['Show a demo: Boil muddy water in a test tube with a delivery tube into a cool test tube.', 'Ask: "Where did the mud go?" (It\'s in the first tube).', 'Contrast with filtration: Filter muddy water — same result but faster.', 'Then boil saltwater with same setup — collect clear liquid, taste (safe) or test with conductivity.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch5_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to.',
          parts: [
                { id: 'a', prompt: 'A student wants to separate a mixture of sand and saltwater. He proposes: "First filter to remove sand, then distill the filtrate to get pure water and salt.".', answer: 'The plan is partially correct but inefficient',
                  options: ['The plan is partially correct but inefficient', 'distillation separates *any* mixture, e', 'a mixture of sand and water can be distilled to get pure water and sand'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think distillation separates *any* mixture, e.g., they believe a mixture of sand and water can be distilled to get pure water and.' }
          ],
            remediations: { 'distillation-separates-any-mixture': { steps: ['Show a demo: Boil muddy water in a test tube with a delivery tube into a cool test tube.', 'Ask: "Where did the mud go?" (It\'s in the first tube).', 'Contrast with filtration: Filter muddy water — same result but faster.', 'Then boil saltwater with same setup — collect clear liquid, taste (safe) or test with conductivity.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
