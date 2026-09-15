import type { SimDef } from '../../engine/types';
import C6_MathematicsConsolidatingSenseNumbernessSim from '../../../simulations/c6_12/C6_MathematicsConsolidatingSenseNumbernessSim';

/** v3 wrapped master — C6_MathematicsConsolidatingSenseNumbernessSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_mathematicsconsolidatingsensenumbernesssim: SimDef = {
    id: 'v3w_c6_mathematicsconsolidatingsensenumbernesssim',
    title: 'Consolidating Sense Numberness',
    subtitle: 'This node covers basic arithmetic problem solving (addition, subtraction, and.',
    classLevel: 6, subject: 'mathematics', topic: 'Problem Solving with Fractions',
    chapters: [],
    nodeIds: ['c6_math_ch03_038'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you have a 12-litre bucket of water, and you use 2/3 of it to water your garden.', goal: 'Master Consolidating Sense Numberness.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Problem solving with fractions is the.', text: 'Problem solving with fractions is the application of fraction operations—like identifying parts of a whole, comparing sizes, or calculating quantities—to find solutions for real-world situations.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_math_ch03_038', title: 'Problem solving with fractions is the.',
          scaffold: { problem: 'A shopkeeper has 40 kg of sugar. He sells 3/5 of it in the morning. How many kilograms of sugar are left for the afternoon?',
            steps: [
            { text: 'Identify total (40 kg) and fraction sold (3/5).' },
            { text: 'Find the value of one part by dividing 40 by the denominator 5 (40 ÷ 5 = 8 kg).' },
            { text: 'Find the amount sold by multiplying the value of one part by the numerator 3 (8 × 3 = 24 kg).' },
            { text: 'Subtract the amount sold from the total to find the amount left (40 - 24 = 16 kg).' },
            { text: 'Verify: 2/5 of 40 is 16. Since 3/5 were sold, 2/5 remain.', faded: true, blankAnswer: '16 kg' }
            ] } }
    ],
    explore: { component: C6_MathematicsConsolidatingSenseNumbernessSim, prompt: 'Explore the interactive — Consolidating Sense Numberness' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch03_038', difficulty: 'standard',
          question: 'Problem solving with fractions is the application of fraction operations—like.',
          hint: 'Review c6_math_fractional_units to re-visualize how to divide a quantity into equal.',
          misconception: 'Students often confuse the "share" with the "whole." For example, if asked to find 2/3 of 12, they might answer 2 or 3.',
          parts: [
                { id: 'a', prompt: 'A rope is 15 metres long. If you cut off 1/3 of it, how many metres did you cut off?', answer: 'You cut off 5 metres',
                  options: ['You cut off 5 metres', 'the fraction is a length rather than a relative share'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the "share" with the "whole." For example, if asked to find 2/3 of 12, they might answer 2 or 3 because they see.' }
          ],
            remediations: { 'students-often-confuse-the-share': { steps: ['If a student fails, have them draw a rectangle and divide it into the number of parts shown by the denominator.', 'Ask them to shade the number of parts shown by the numerator.', 'Then, ask them to write the total number (e.g., 12) inside the rectangle and ask, "If the whole rectangle is 12, what.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
