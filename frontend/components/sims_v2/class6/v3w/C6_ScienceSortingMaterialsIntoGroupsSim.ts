import type { SimDef } from '../../engine/types';
import C6_ScienceSortingMaterialsIntoGroupsSim from '../../../simulations/c6_12/C6_ScienceSortingMaterialsIntoGroupsSim';

/** v3 wrapped master — C6_ScienceSortingMaterialsIntoGroupsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencesortingmaterialsintogroupssim: SimDef = {
    id: 'v3w_c6_sciencesortingmaterialsintogroupssim',
    title: 'What Are Materials and Why We Classify Them',
    subtitle: 'Covers the definition of materials/matter and the logic of classification based on.',
    classLevel: 6, subject: 'science', topic: 'What Are Materials and Why We Classify Them',
    chapters: [],
    nodeIds: ['c6_chemistry_ch04_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are looking at your school bag. Why is it made of fabric or plastic, but not glass?', goal: 'Master What Are Materials and Why We Classify Them.' },
    discovery: {
        question: 'What are the two essential characteristics that define anything as "matter"?',
        options: ['Matter must occupy space (volume) and have mass', 'it must be solid', 'transparent'],
        answer: 'Matter must occupy space (volume) and have mass',
        hook: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t.',
    },
    teaching: [
        { title: 'Materials are substances used to create.', text: 'Materials are substances used to create objects, and matter is anything that occupies space (volume) and has mass.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_chemistry_ch04_001', title: 'Materials are substances used to create.',
          caseStudy: { intro: 'Imagine you are looking at your school bag. Why is it made of fabric or plastic, but not glass? To understand this, start by listing every object in your room.',
            decisions: [{ prompt: 'What are the two essential characteristics that define anything as "matter"?', options: [
                { text: 'Matter must occupy space (volume) and have mass', outcome: 'Matter must occupy space (volume) and have mass. A wrong answer—such as "it must be solid"—reveals.' },
                { text: 'it must be solid', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' },
                { text: 'transparent', outcome: 'Not quite — Students often confuse "transparent" with "colorless." They might think a colored glass is opaque.', reveals: 'students-often-confuse-transparent-with' }
            ] }] } }
    ],
    explore: { component: C6_ScienceSortingMaterialsIntoGroupsSim, prompt: 'Explore the interactive — What Are Materials and Why We Classify Them' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_chemistry_ch04_001', difficulty: 'standard',
          question: 'Materials are substances used to create objects, and matter is anything that.',
          hint: 'Review the definitions of adjectives describing physical appearance and texture.',
          misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t.',
          parts: [
                { id: 'a', prompt: 'What are the two essential characteristics that define anything as "matter"?', answer: 'Matter must occupy space (volume) and have mass',
                  options: ['Matter must occupy space (volume) and have mass', 'it must be solid', 'transparent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' },
                { id: 'b', prompt: 'If you have a steel spoon and a wooden spoon, why might you classify them differently in a "shiny vs. dull" test?', answer: 'Steel is lustrous (shiny), whereas wood is non-lustrous (dull)',
                  options: ['Steel is lustrous (shiny), whereas wood is non-lustrous (dull)', 'appearance', 'lustre'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "transparent" with "colorless." They might think a colored glass is opaque because it isn\'t perfectly clear.' }
          ],
            remediations: { 'students-often-confuse-transparent-with': { steps: ['First, ask the student to look through a piece of colored cellophane paper at a light source.', 'Ask: "Can you see the light even though it is colored?" Explain that if light passes through, it is transparent,.', 'Then, have them compare this to a piece of wood, which blocks all light, to solidify the difference between transparent.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
