import type { SimDef } from '../../engine/types';
import C6_MathematicsSimplificationBracketsSim from '../../../simulations/c6_12/C6_MathematicsSimplificationBracketsSim';

/** v3 wrapped master — C6_MathematicsSimplificationBracketsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicssimplificationbracketssim: SimDef = {
    id: 'v3w_c6_mathematicssimplificationbracketssim',
    title: 'Introduction to Ratio',
    subtitle: 'This node covers the definition of ratios, representation (colon, fraction, words), and.',
    classLevel: 6, subject: 'mathematics', topic: 'Introduction to Ratio',
    chapters: [],
    nodeIds: ['c6_math_ch06_062', 'c6_math_ch03_029'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are making lemonade and you need to mix 2 cups of sugar for every 6 cups of water.', goal: 'Master Introduction to Ratio.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'A ratio is a way to compare two quantities.', text: 'A ratio is a way to compare two quantities of the same kind by showing how many times one quantity contains the other, usually written as a fraction or with a colon.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c6_math_ch03_041', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Ratio', spots: [
            { id: 's1', label: 'A ratio is a way', prompt: 'Which idea is this? — A ratio is a way to compare two quantities of the same kind by showing how many times one.', answer: 'A ratio is a way', options: ['A ratio is a way', 'Simplifying complex fraction problems is'] },
            { id: 's2', label: 'Simplifying complex fraction problems is', prompt: 'Which idea is this? — Simplifying complex fraction problems is the process of solving expressions containing.', answer: 'Simplifying complex fraction problems is', options: ['Simplifying complex fraction problems is', 'A ratio is a way'] }
          ] } }
    ],
    explore: { component: C6_MathematicsSimplificationBracketsSim, prompt: 'Explore the interactive — Introduction to Ratio' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch03_041', difficulty: 'standard',
          question: 'Simplifying complex fraction problems is the process of solving expressions.',
          hint: 'Review finding the Least Common Multiple (LCM) of two or more numbers.',
          misconception: 'Students often add or subtract numerators and denominators separately (e.g., 1/2 + 1/3 = 2/5).',
          parts: [
                { id: 'a', prompt: 'Why do we find a common denominator before adding or subtracting fractions like 1/3 and 1/4?', answer: 'We need a common denominator',
                  options: ['We need a common denominator', 'fractions are just numbers to be added like whole numbers (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often add or subtract numerators and denominators separately (e.g., 1/2 + 1/3 = 2/5).' }
          ],
            remediations: { 'students-often-add-or-subtract': { steps: ['If a student adds numerators and denominators, take two paper strips of equal length.', 'Fold one into halves and one into thirds.', 'Show them that 1/2 + 1/3 is physically larger than 2/5.', 'Then, guide them to fold both into 6ths to show that 1/2 = 3/6 and 1/3 = 2/6, leading to 5/6, not 2/5.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
