import type { SimDef } from '../../engine/types';
import C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim from '../../../simulations/c6_12/C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim';

/** v3 wrapped master — C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencelivingcreaturesexploringtheircharacteristicssim: SimDef = {
    id: 'v3w_c6_sciencelivingcreaturesexploringtheircharacteristicssim',
    title: 'What Are Materials and Why We Classify Them',
    subtitle: 'This node covers the biological necessity of oxygen for respiration and carbon for.',
    classLevel: 6, subject: 'science', topic: 'What Are Materials and Why We Classify Them',
    chapters: [],
    nodeIds: ['c6_chemistry_ch04_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why we can build a house out of iron, but our own bodies are made of something.', goal: 'Master What Are Materials and Why We Classify Them.' },
    discovery: {
        question: 'Why would a human be unable to survive for more than a few minutes without oxygen?',
        options: ['Oxygen is required for cells to perform respiration and extract energy from food', 'it keeps us cool', 'more important'],
        answer: 'Oxygen is required for cells to perform respiration and extract energy from food',
        hook: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than.',
    },
    teaching: [
        { title: 'Non-metals are materials that are essential.', text: 'Non-metals are materials that are essential for supporting biological life processes, serving as the fundamental building blocks of cells and providing the gases necessary for energy production.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_chemistry_ch04_006', title: 'Non-metals are materials that are.',
          scaffold: { problem: 'A student has a list of items: Iron nail, Oxygen gas, Gold ring, Carbon-based sugar, Copper wire.',
            steps: [
            { text: 'Examine the function of each item.' },
            { text: 'Identify Iron, Gold, and Copper as metals used for building or tools.' },
            { text: 'Identify Oxygen and Carbon (in sugar) as items required for biological energy and structure.' },
            { text: 'Group them based on these two categories.', faded: true, blankAnswer: 'Structural: Iron nail, Gold ring, Copper wire;.' }
            ] } }
    ],
    explore: { component: C6_ScienceLivingCreaturesExploringTheirCharacteristicsSim, prompt: 'Explore the interactive — What Are Materials and Why We Classify Them' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_006', difficulty: 'standard',
          question: 'Non-metals are materials that are essential for supporting biological life.',
          hint: 'Review the definitions of lustrous and non-lustrous materials in Chapter 4.',
          misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than.',
          parts: [
                { id: 'a', prompt: 'Name two non-metals that are absolutely essential for keeping an animal alive.', answer: 'Oxygen and carbon',
                  options: ['Oxygen and carbon', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' },
                { id: 'b', prompt: 'Why would a human be unable to survive for more than a few minutes without oxygen?', answer: 'Oxygen is required for cells to perform respiration and extract energy from food',
                  options: ['Oxygen is required for cells to perform respiration and extract energy from food', 'it keeps us cool', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' },
                { id: 'c', prompt: 'If you were to analyze the "backbone" of a human cell, which non-metal would you find at the center of every protein and DNA strand?', answer: 'Carbon',
                  options: ['Carbon', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' }
          ],
            remediations: { 'because-metals-are-hard': { steps: ['Ask the student to list five things they do in a day (walking, eating, breathing, thinking).', 'Then, ask them to identify which of those are possible if they stop breathing.', 'Guide them to see that "breathing" (oxygen) and "eating" (carbon-based food) are the foundations for all the other.', 'Explain that "important" is not just about what is hard or strong, but about what makes life possible.'] } } },
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than.',
          parts: [
                { id: 'a', prompt: 'Is it accurate to say that "metals are more important than non-metals because we build houses with them"? Why or why not?', answer: 'No, it is inaccurate',
                  options: ['No, it is inaccurate', 'more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than non-metals.' }
          ],
            remediations: { 'because-metals-are-hard': { steps: ['Ask the student to list five things they do in a day (walking, eating, breathing, thinking).', 'Then, ask them to identify which of those are possible if they stop breathing.', 'Guide them to see that "breathing" (oxygen) and "eating" (carbon-based food) are the foundations for all the other.', 'Explain that "important" is not just about what is hard or strong, but about what makes life possible.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
