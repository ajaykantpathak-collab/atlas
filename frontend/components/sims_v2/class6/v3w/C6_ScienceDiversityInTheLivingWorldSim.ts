import type { SimDef } from '../../engine/types';
import C6_ScienceDiversityInTheLivingWorldSim from '../../../simulations/c6_12/C6_ScienceDiversityInTheLivingWorldSim';

/** v3 wrapped master — C6_ScienceDiversityInTheLivingWorldSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencediversityinthelivingworldsim: SimDef = {
    id: 'v3w_c6_sciencediversityinthelivingworldsim',
    title: 'Diversity In The Living World',
    subtitle: 'This node covers the biological necessity of oxygen for respiration and carbon for.',
    classLevel: 6, subject: 'science', topic: 'Are Non-metals Essential for Life?',
    chapters: [],
    nodeIds: ['c6_chemistry_ch04_001', 'c6_biology_ch10_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why we can build a house out of iron, but our own bodies are made of something.', goal: 'Master Diversity In The Living World.' },
    discovery: {
        question: 'Why would a human be unable to survive for more than a few minutes without oxygen?',
        options: ['Oxygen is required for cells to perform respiration and extract energy from food', 'it keeps us cool', 'more important'],
        answer: 'Oxygen is required for cells to perform respiration and extract energy from food',
        hook: 'Students often assume that because metals are hard, shiny, and used for construction, they are "more important" than.',
    },
    teaching: [
        { title: 'Non-metals are materials that are essential.', text: 'Non-metals are materials that are essential for supporting biological life processes, serving as the fundamental building blocks of cells and providing the gases necessary for energy production.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_chemistry_ch04_006', title: 'Non-metals are materials that are.',
          scaffold: { problem: 'A student has a list of items: Iron nail, Oxygen gas, Gold ring, Carbon-based sugar, Copper wire.',
            steps: [
            { text: 'Examine the function of each item.' },
            { text: 'Identify Iron, Gold, and Copper as metals used for building or tools.' },
            { text: 'Identify Oxygen and Carbon (in sugar) as items required for biological energy and structure.' },
            { text: 'Group them based on these two categories.', faded: true, blankAnswer: 'Structural: Iron nail, Gold ring, Copper wire;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_biology_ch10_004', title: 'Plant respiration is the process by.',
          scaffold: { problem: 'A gardener waters a potted plant so heavily that the soil remains completely waterlogged for a week.',
            steps: [
            { text: 'Identify the main issue—the air pockets in the soil are replaced by water.' },
            { text: 'Recall that roots need oxygen from soil air pockets to respire.' },
            { text: 'Conclude that without oxygen, root cells cannot release energy from food.' },
            { text: 'Explain that without energy, the root cells die and cannot absorb nutrients.' },
            { text: 'Relate this to the wilting of the plant.', faded: true, blankAnswer: 'The plant wilts because the roots are suffocating from a.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_biology_ch10_004', title: 'Identify each idea',
          dissect: { specimen: 'Diversity In The Living World', spots: [
            { id: 's1', label: 'Non-metals are materials that are', prompt: 'Which idea is this? — Non-metals are materials that are essential for supporting biological life processes,.', answer: 'Non-metals are materials that are', options: ['Non-metals are materials that are', 'Plant respiration is the process'] },
            { id: 's2', label: 'Plant respiration is the process', prompt: 'Which idea is this? — Plant respiration is the process by which all living plant cells take in oxygen and.', answer: 'Plant respiration is the process', options: ['Plant respiration is the process', 'Non-metals are materials that are'] }
          ] } }
    ],
    explore: { component: C6_ScienceDiversityInTheLivingWorldSim, prompt: 'Explore the interactive — Diversity In The Living World' },
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
            remediations: { 'because-metals-are-hard': { steps: ['Ask the student to list five things they do in a day (walking, eating, breathing, thinking).', 'Then, ask them to identify which of those are possible if they stop breathing.', 'Guide them to see that "breathing" (oxygen) and "eating" (carbon-based food) are the foundations for all the other.', 'Explain that "important" is not just about what is hard or strong, but about what makes life possible.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_004', difficulty: 'standard',
          question: 'Plant respiration is the process by which all living plant cells take in oxygen.',
          hint: 'Review the concept that all living cells, regardless of being in a plant or animal,.',
          misconception: 'Students often confuse photosynthesis (which requires light and produces oxygen) with respiration (which occurs always.',
          parts: [
                { id: 'a', prompt: 'If a plant is kept in a sealed dark box, will it still release carbon dioxide? Why?', answer: 'Yes, the plant will release carbon dioxide',
                  options: ['Yes, the plant will release carbon dioxide', 'respiration is dependent on light or photosynthesis'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse photosynthesis (which requires light and produces oxygen) with respiration (which occurs always and uses oxygen).' }
          ],
            remediations: { 'students-often-confuse-photosynthesis-which': { steps: ['Ask the student to list what they do to get energy (eat food and breathe).', 'Explain that plants also "eat" (make food) but must "breathe" (respire) to turn that food into usable energy.', 'Draw a diagram showing a single cell in a root and a single cell in a leaf, labeling the intake of Oxygen and release.', 'Emphasize that "Living = Respiration" for every organism on Earth.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
