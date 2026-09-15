import type { SimDef } from '../../engine/types';
import C10_MathematicsStatisticsSim from '../../../simulations/c6_12/C10_MathematicsStatisticsSim';

/** v3 wrapped master — C10_MathematicsStatisticsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicsstatisticssim: SimDef = {
    id: 'v3w_c10_mathematicsstatisticssim',
    title: 'Statistics',
    subtitle: 'This node covers solving word problems based on grouped and ungrouped frequency.',
    classLevel: 10, subject: 'mathematics', topic: 'Word Problems: Interpreting Frequency Distribution Tables',
    chapters: [],
    nodeIds: ['c10_math_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine your school conducts a health check-up and records the heights of 100 Class 10 students in a.', goal: 'Master Statistics.' },
    discovery: {
        question: 'The following table shows the literacy rate (in %) of 35 cities: | Literacy Rate | 45-55 | 55-65 | 65-75 | 75-85 | 85-95 |.',
        options: ['Step 1: Total frequency N = 3+10+11+8+3 = 35', 'cumulative frequency before median class', 'cumulative frequency of median class'],
        answer: 'Step 1: Total frequency N = 3+10+11+8+3 = 35',
        hook: 'Students consistently use the cumulative frequency OF the median class (cf = 24 in Diagnostic 3) instead of the.',
    },
    teaching: [
        { title: 'Word problems on interpreting frequency.', text: 'Word problems on interpreting frequency distribution tables require extracting statistical information (class intervals, frequencies, cumulative frequencies, class marks) from a given table and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_13_010', title: 'Word problems on interpreting frequency.',
          scaffold: { problem: 'The following table shows the daily pocket allowance (in ₹) of 50 students of a school.',
            steps: [
            { text: 'Identify what is given and what is asked. Given: grouped frequency table with one missing frequency f, class intervals.' },
            { text: 'Choose the step-deviation method because class marks are large and h is constant.' },
            { text: 'Construct the calculation table:' },
            { text: 'Apply step-deviation formula: Mean = a + h(Σfiui/Σfi). Substitute: 18 = 18 + 2 × ((-20 + f)/(44 + f)).' },
            { text: 'Solve for f: 0 = 2(-20 + f)/(44 + f) → 0 = -20 + f → f = 20.' },
            { text: 'Verify: Total N = 64. Σfixi = 7×12 + 6×14 + 9×16 + 13×18 + 20×20 + 5×22 + 4×24 = 84+84+144+234+400+110+96 = 1152.', faded: true, blankAnswer: 'f = 20' }
            ] } }
    ],
    explore: { component: C10_MathematicsStatisticsSim, prompt: 'Explore the interactive — Statistics' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_13_010', difficulty: 'standard',
          question: 'Word problems on interpreting frequency distribution tables require extracting.',
          hint: 'If stuck, immediately revisit c10_math_cbse_13_005 (Median of Grouped Data) and.',
          misconception: 'Students consistently use the cumulative frequency OF the median class (cf = 24 in Diagnostic 3) instead of the.',
          parts: [
                { id: 'a', prompt: 'The following table shows the literacy rate (in %) of 35 cities: | Literacy Rate | 45-55 | 55-65 | 65-75 | 75-85 | 85-95 |.', answer: 'Step 1: Total frequency N = 3+10+11+8+3 = 35',
                  options: ['Step 1: Total frequency N = 3+10+11+8+3 = 35', 'cumulative frequency before median class', 'cumulative frequency of median class'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently use the cumulative frequency OF the median class (cf = 24 in Diagnostic 3) instead of the cumulative frequency BEFORE.' }
          ],
            remediations: { 'students-consistently-use-the-cumulative': { steps: ['If a student makes this error, do NOT just say "check the formula." Instead: (1) Have them write the median formula.', '(2) Ask: "What does \'preceding\' mean?" (3) Make them rebuild the cumulative frequency column on paper, then physically.', '(5) Finally, have them solve one full problem while verbally justifying each substitution: "I am taking cf = 13 because.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
