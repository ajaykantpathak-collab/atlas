import type { SimDef } from '../../engine/types';
import C6_BiologyLeafStructureTypesSim from '../../../simulations/c6_12/C6_BiologyLeafStructureTypesSim';

/** v3 wrapped master — C6_BiologyLeafStructureTypesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_biologyleafstructuretypessim: SimDef = {
    id: 'v3w_c6_biologyleafstructuretypessim',
    title: 'How Do Plants Make Food? Understanding Photosynthesis',
    subtitle: 'This node covers the fundamental concept and the basic ingredients/products of.',
    classLevel: 6, subject: 'biology', topic: 'How Do Plants Make Food? Understanding Photosynthesis',
    chapters: [],
    nodeIds: ['c6_biology_ch10_002', 'c6_biology_ch10_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why you need to eat lunch to have energy to play, but the tree in your garden just.', goal: 'Master How Do Plants Make Food? Understanding Photosynthesis.' },
    discovery: {
        question: 'If a plant is kept in a completely dark room for a long time, why does it struggle to survive?',
        options: ['The plant cannot perform photosynthesis', 'thirsty', 'needs space'],
        answer: 'The plant cannot perform photosynthesis',
        hook: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as.',
    },
    teaching: [
        { title: 'Photosynthesis is the process by which green.', text: 'Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce sugar (food) and oxygen.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_biology_ch10_002', title: 'Photosynthesis is the process by which.',
          scaffold: { problem: 'A farmer has two identical tomato plants. Plant A is placed in a sunny window and watered daily.',
            steps: [
            { text: 'Identify inputs for Plant A (Sunlight + Water + CO2).' },
            { text: 'Identify inputs for Plant B (Only Water + CO2, no Sunlight).' },
            { text: 'Compare the ability of each plant to perform photosynthesis.' },
            { text: 'Conclude that Plant A will produce food while Plant B will fail to produce food.', faded: true, blankAnswer: 'Plant A will grow, but Plant B will wither because it.' }
            ] } },
        { type: 'case', nodeId: 'c6_biology_ch10_005', title: 'Plant sexual reproduction is the.',
          caseStudy: { intro: 'Have you ever wondered why a bright, colourful flower eventually disappears and a small fruit or seed pod appears in its place?',
            decisions: [{ prompt: 'What is the name of the fine, dust-like substance produced by the male part of a flower?', options: [
                { text: 'It is called pollen', outcome: 'It is called pollen. If a student answers "seed" or "nectar," they are confusing the reproductive.' },
                { text: 'nectar', outcome: 'Not quite — Students often think that the "dust" (pollen) is "dirt" or "waste" that the plant wants to get rid.', reveals: 'the-dust-pollen-is-dirt' }
            ] }] } }
    ],
    explore: { component: C6_BiologyLeafStructureTypesSim, prompt: 'Explore the interactive — How Do Plants Make Food? Understanding Photosynthesis' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch10_002', difficulty: 'standard',
          question: 'Photosynthesis is the process by which green plants use sunlight, water, and.',
          hint: 'Review the function of roots vs. leaves in plant anatomy.',
          misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as.',
          parts: [
                { id: 'a', prompt: 'What are the three main things a plant needs to carry out the process of photosynthesis?', answer: 'A plant needs sunlight, water, and carbon dioxide',
                  options: ['A plant needs sunlight, water, and carbon dioxide', 'fertilizer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as if they were eating a.' },
                { id: 'b', prompt: 'If a plant is kept in a completely dark room for a long time, why does it struggle to survive?', answer: 'The plant cannot perform photosynthesis',
                  options: ['The plant cannot perform photosynthesis', 'thirsty', 'needs space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that plants get their "food" from the soil, treating roots like mouths that suck up nutrients as if they were eating a.' }
          ],
            remediations: { 'plants-get-their-food-from': { steps: ['First, ask the student what happens if they keep a slice of bread in the soil—does it grow?', 'Then, explain that roots are like straws for water, but the leaf is the "kitchen." Ask them to trace the path of.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch10_005', difficulty: 'standard',
          question: 'Plant sexual reproduction is the process in flowering plants where male and.',
          hint: 'Review the "Diversity in Plants" section regarding identifying flower features.',
          misconception: 'Students often think that the "dust" (pollen) is "dirt" or "waste" that the plant wants to get rid of, rather than a.',
          parts: [
                { id: 'a', prompt: 'What is the name of the fine, dust-like substance produced by the male part of a flower?', answer: 'It is called pollen',
                  options: ['It is called pollen', 'nectar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "dust" (pollen) is "dirt" or "waste" that the plant wants to get rid of, rather than a vital component for.' }
          ],
            remediations: { 'the-dust-pollen-is-dirt': { steps: ['Take the student to observe a flower and point out the pollen again.', 'Explain that just as a baby animal needs a parent to grow, a seed needs the pollen to "start" its growth process.', 'Ask them to imagine the pollen as a "message" that must be delivered to the female part of the flower to trigger seed.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
