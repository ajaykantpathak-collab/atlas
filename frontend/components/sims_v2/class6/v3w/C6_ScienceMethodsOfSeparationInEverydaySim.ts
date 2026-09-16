import type { SimDef } from '../../engine/types';
import C6_ScienceMethodsOfSeparationInEverydaySim from '../../../simulations/c6_12/C6_ScienceMethodsOfSeparationInEverydaySim';

/** v3 wrapped master — C6_ScienceMethodsOfSeparationInEverydaySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencemethodsofseparationineverydaysim: SimDef = {
    id: 'v3w_c6_sciencemethodsofseparationineverydaysim',
    title: 'Methods Of Separation In Everyday',
    subtitle: 'This node covers everyday examples of heat movement like cooking, clothing, and.',
    classLevel: 6, subject: 'science', topic: 'Applications of Heat Transfer in Daily Life',
    chapters: [],
    nodeIds: ['c6_physics_ch07_019'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why the handle of your frying pan is often made of wood or plastic instead of metal?', goal: 'Master Methods Of Separation In Everyday.' },
    discovery: {
        question: 'If you touch a cold windowpane on a sunny day and it feels warm, which process is primarily responsible for the heat reaching the glass from the sun?',
        options: ['The process is radiation', 'conduction', 'insulators'],
        answer: 'The process is radiation',
        hook: 'Students often believe that "insulators" create cold or stop heat entirely.',
    },
    teaching: [
        { title: 'Heat transfer in daily life refers to the.', text: 'Heat transfer in daily life refers to the natural movement of thermal energy through conduction, convection, and radiation, which we use to regulate temperature, cook food, and maintain comfort.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_physics_ch07_026', title: 'Heat transfer in daily life refers to.',
          caseStudy: { intro: 'Have you ever wondered why the handle of your frying pan is often made of wood or plastic instead of metal?',
            decisions: [{ prompt: 'If you touch a cold windowpane on a sunny day and it feels warm, which process is primarily responsible for the heat reaching the glass.', options: [
                { text: 'The process is radiation', outcome: 'The process is radiation. A wrong answer like "conduction" suggests the student thinks the sun must.' },
                { text: 'conduction', outcome: 'Not quite — Students often believe that "insulators" create cold or stop heat entirely.', reveals: 'insulators-create-cold-or-stop' },
                { text: 'insulators', outcome: 'Not quite — Students often believe that "insulators" create cold or stop heat entirely.', reveals: 'insulators-create-cold-or-stop' }
            ] }] } }
    ],
    explore: { component: C6_ScienceMethodsOfSeparationInEverydaySim, prompt: 'Explore the interactive — Methods Of Separation In Everyday' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch07_026', difficulty: 'standard',
          question: 'Heat transfer in daily life refers to the natural movement of thermal energy.',
          hint: 'Review the definitions of conduction (solids), convection (fluids), and radiation.',
          misconception: 'Students often believe that "insulators" create cold or stop heat entirely.',
          parts: [
                { id: 'a', prompt: 'If you touch a cold windowpane on a sunny day and it feels warm, which process is primarily responsible for the heat reaching the glass from the sun?', answer: 'The process is radiation',
                  options: ['The process is radiation', 'conduction', 'insulators'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' },
                { id: 'b', prompt: 'A metal spoon is placed in a bowl of hot dal. After one minute, the handle of the spoon becomes hot. Explain the movement of heat in this scenario.', answer: 'The heat moves through the spoon via conduction',
                  options: ['The heat moves through the spoon via conduction', 'insulators', '"insulators" create cold or stop heat entirely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' }
          ],
            remediations: { 'insulators-create-cold-or-stop': { steps: ['Ask the student: "If you put ice in a woollen mitten, does it melt faster or slower than on a table?" When they answer.', 'Explain that insulators are like "slow-motion" zones for heat transfer.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch07_026', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "insulators" create cold or stop heat entirely.',
          parts: [
                { id: 'a', prompt: 'If you are holding a hot cup of tea, why does a woollen tea cozy keep the tea hot longer than a metal cover?', answer: 'Wool acts as an insulator',
                  options: ['Wool acts as an insulator', 'insulators', '"insulators" create cold or stop heat entirely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "insulators" create cold or stop heat entirely.' }
          ],
            remediations: { 'insulators-create-cold-or-stop': { steps: ['Ask the student: "If you put ice in a woollen mitten, does it melt faster or slower than on a table?" When they answer.', 'Explain that insulators are like "slow-motion" zones for heat transfer.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
