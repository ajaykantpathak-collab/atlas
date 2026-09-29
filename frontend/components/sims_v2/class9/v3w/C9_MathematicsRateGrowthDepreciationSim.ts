import type { SimDef } from '../../engine/types';
import C9_MathematicsRateGrowthDepreciationSim from '../../../simulations/c6_12/C9_MathematicsRateGrowthDepreciationSim';

/** v3 wrapped master — C9_MathematicsRateGrowthDepreciationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_mathematicsrategrowthdepreciationsim: SimDef = {
    id: 'v3w_c9_mathematicsrategrowthdepreciationsim',
    title: 'Growth and Decay as Linear Relationships',
    subtitle: 'This node covers only linear (constant rate) growth and decay, including discrete and.',
    classLevel: 9, subject: 'mathematics', topic: 'Growth and Decay as Linear Relationships',
    chapters: [],
    nodeIds: ['c9_math_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine Rohan saves ₹50 every week from his pocket money. He already has ₹200 in his piggy bank.', goal: 'Master Growth and Decay as Linear Relationships.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'A linear growth or decay relationship occurs.', text: 'A linear growth or decay relationship occurs when a quantity changes by a constant absolute amount for each unit increase in the independent variable (usually time).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_math_ch2_4', title: 'A linear growth or decay relationship.',
          scaffold: { problem: 'A village pond initially has 10,000 litres of water. During a dry season, water evaporates at a constant rate of 250 litres per day.',
            steps: [
            { text: 'Identify the initial volume (when d=0): V = 10,000 litres.' },
            { text: 'Identify the rate of change: water decreases by 250 litres per day, so rate = -250 litres/day.' },
            { text: 'Write the linear equation: V = 10000 - 250d.' },
            { text: 'Substitute d = 12: V = 10000 - 250×12 = 10000 - 3000 = 7000 litres.' },
            { text: 'Find when V = 0: 0 = 10000 - 250d => 250d = 10000 => d = 40 days.', faded: true, blankAnswer: 'Volume after 12 days = 7000 litres; pond dries after 40.' }
            ] } }
    ],
    explore: { component: C9_MathematicsRateGrowthDepreciationSim, prompt: 'Explore the interactive — Growth and Decay as Linear Relationships' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch2_4', difficulty: 'standard',
          question: 'A linear growth or decay relationship occurs when a quantity changes by a.',
          hint: 'Review c9_math_ch2_3 (Linear Patterns in Real-Life Situations) and c8_math_ch2_2.',
          misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor.',
          parts: [
                { id: 'a', prompt: 'A water tank initially contains 500 litres. Water leaks out at a constant rate of 12 litres per hour.', answer: 'Equation: \\(V = 500 - 12t\\)',
                  options: ['Equation: \\(V = 500 - 12t\\)', '"decay" always means multiplying by a factor (like 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor (like 0.9 each year).' },
                { id: 'b', prompt: 'Two plants grow linearly. Plant A: height = \\(10 + 2t\\) cm. Plant B: height = \\(5 + 3t\\) cm (\\(t\\) in weeks).', answer: 'Set \\(10 + 2t = 5 + 3t \\Rightarrow t = 5\\) weeks',
                  options: ['Set \\(10 + 2t = 5 + 3t \\Rightarrow t = 5\\) weeks', '"decay" always means multiplying by a factor (like 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor (like 0.9 each year).' }
          ],
            remediations: { 'students-often-confuse-linear-decay': { steps: ['Have the student make a table of values for the car\'s value year by year using constant subtraction (500000, 480000,.', 'Plot these points to see they lie on a straight line.', 'Contrast with a table for 10% depreciation (multiply by 0.9 each year) and plot to see the curve.', 'Emphasize: "constant amount subtracted" → linear; "constant percentage multiplied" → exponential.'] } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor.',
          parts: [
                { id: 'a', prompt: 'Create a real-life problem (Indian context) that involves linear decay.', answer: 'Example: "A scooter\'s value depreciates by ₹3,000 per year',
                  options: ['Example: "A scooter\'s value depreciates by ₹3,000 per year', '"decay" always means multiplying by a factor (like 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor (like 0.9 each year).' },
                { id: 'b', prompt: 'Two plants grow linearly. Plant A: height = \\(10 + 2t\\) cm. Plant B: height = \\(5 + 3t\\) cm (\\(t\\) in weeks).', answer: 'Set \\(10 + 2t = 5 + 3t \\Rightarrow t = 5\\) weeks',
                  options: ['Set \\(10 + 2t = 5 + 3t \\Rightarrow t = 5\\) weeks', '"decay" always means multiplying by a factor (like 0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse linear decay with exponential decay: they think "decay" always means multiplying by a factor (like 0.9 each year).' }
          ],
            remediations: { 'students-often-confuse-linear-decay': { steps: ['Have the student make a table of values for the car\'s value year by year using constant subtraction (500000, 480000,.', 'Plot these points to see they lie on a straight line.', 'Contrast with a table for 10% depreciation (multiply by 0.9 each year) and plot to see the curve.', 'Emphasize: "constant amount subtracted" → linear; "constant percentage multiplied" → exponential.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
