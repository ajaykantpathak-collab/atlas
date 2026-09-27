import type { SimDef } from '../../engine/types';

/** v3 hand-authored — c11_app_ch10_p1 (1 node). Covers Descriptive
 * Statistics: central tendency vs dispersion, SD vs MD, coefficient of
 * variation. Diagnostics are LaTeX-dense so this sim was written by hand
 * to close the last uncovered node. */
export const c11_app_ch10_p1: SimDef = {
    id: 'v3_c11_app_ch10_p1',
    title: 'Descriptive Statistics · Consistency Detective',
    subtitle: 'Use spread — not just the average — to decide who is really consistent.',
    classLevel: 11, subject: 'applied_mathematics', topic: 'Descriptive Statistics',
    chapters: ['c11_app_ch10'],
    nodeIds: ['c11_app_cbse_10_001'],
    emoji: '📊', theme: { bg: 'from-slate-800 to-teal-900', accent: 'teal', scene: 'senior' },

    scenario: { role: 'a sports analyst hired by a school cricket coach', intro: 'Two players have the same batting average, but the coach can only pick one for the finals. Your job: prove who is consistent and who is a gamble.', goal: 'Use measures of dispersion — range, mean deviation, standard deviation, and coefficient of variation — to separate average performance from reliable performance.' },
    discovery: {
        question: 'Player A scores 45, 48, 42, 50, 40. Player B scores 120, 0, 105, 0, 0. Both average 45. Which single measure proves A is more reliable?',
        options: ['Standard deviation — it measures how far scores stray from the mean', 'The mean — equal means mean equal reliability', 'The highest score — B\'s 120 beats A\'s 50', 'The number of matches played'],
        answer: 'Standard deviation — it measures how far scores stray from the mean',
        hook: 'Same average, totally different story — dispersion is what separates "consistent" from "lucky".',
    },
    teaching: [
        { title: 'Central Tendency Is Only Half the Picture', text: 'Mean, median and mode locate the centre of data — but two datasets can share a mean while being wildly different in spread. Descriptive statistics adds dispersion measures to see the full shape.', emoji: '🎯', bgColor: 'from-teal-400 to-cyan-500' },
        { title: 'Dispersion: Range, MD, Variance, SD', text: 'Range is max minus min. Mean deviation averages |x − centre|. Variance squares deviations before averaging; standard deviation is its square root — back in original units.', emoji: '📏', bgColor: 'from-cyan-400 to-sky-500' },
        { title: 'SD Punishes Outliers More Than MD', text: 'Squaring deviations before averaging gives large deviations disproportionate weight — SD is not just "MD with squares", it is a different philosophy: big misses cost much more.', emoji: '⚖️', bgColor: 'from-sky-400 to-blue-500' },
        { title: 'Coefficient of Variation', text: 'CV = (σ / x̄) × 100 — a unit-free percentage that lets you compare variability across datasets with different units or very different means, like comparing exam marks to salaries.', emoji: '📐', bgColor: 'from-blue-400 to-indigo-500' },
    ],
    predict: { question: 'After 500 coin flips, the heads proportion settles closest to...', options: ['50%', '25%', '90%', 'it stays random'], answer: '50%', verifyWidget: 'sampler', verifyPrompt: 'Now try it - was your prediction right?' },
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_10_001', title: 'Two Players, One Average',
          caseStudy: { intro: 'Your coach shows you two batsmen\'s last five innings. A: 45, 48, 42, 50, 40. B: 120, 0, 105, 0, 0. Both average exactly 45.',
            decisions: [{ prompt: 'Which quantity should you compute first to argue for Player A?', options: [
                { text: 'Standard deviation of each player\'s scores', outcome: 'Correct — A\'s SD is small (scores hug the mean), B\'s is huge. Consistency proved numerically.' },
                { text: 'Each player\'s highest score', outcome: 'Not quite — the highest score rewards B\'s lucky centuries and ignores his ducks. That is exactly the trap of using peaks instead of spread.' },
                { text: 'The mean of each player', outcome: 'Not quite — the means are identical at 45. The mean alone cannot see reliability.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_10_001', title: 'The Squaring Trap',
          caseStudy: { intro: 'A junior analyst on your team says: "Mean deviation and standard deviation are the same thing — SD just squares the deviations to get rid of minus signs."',
            decisions: [{ prompt: 'Is the junior analyst right?', options: [
                { text: 'No — squaring before averaging weights outliers far more heavily than MD does', outcome: 'Correct — for data 10,10,10,10,50 the single large deviation dominates SD but barely moves MD. Squaring is a weighting choice, not a sign trick.' },
                { text: 'Yes — both measure average distance from the centre', outcome: 'Not quite — they differ in HOW deviations are weighted. Linear (MD) vs squared (SD) changes which datasets look "spread out".' },
                { text: 'Yes — you can convert one into the other with a formula', outcome: 'Not quite — no fixed conversion exists; they answer related but distinct questions about spread.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_10_001', title: 'Comparing Across Units',
          caseStudy: { intro: 'The school board asks: "Which is more variable — students\' heights (cm) or their exam marks (out of 100)?" The two datasets have different units and very different means.',
            decisions: [{ prompt: 'Which measure makes this comparison valid?', options: [
                { text: 'Coefficient of variation — it normalises SD by the mean', outcome: 'Correct — CV = σ/x̄ × 100 removes units and scale, so a height-CV of 4% vs marks-CV of 18% is a fair comparison.' },
                { text: 'Standard deviation of each dataset', outcome: 'Not quite — raw SDs are in different units (cm vs marks); comparing them directly is meaningless.' },
                { text: 'The range of each dataset', outcome: 'Not quite — same problem: different units, plus range is sensitive to a single extreme value.' }
            ] }] } },
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_10_001', difficulty: 'standard',
          question: 'Dispersion fundamentals',
          hint: 'Recall the ELI5 cricket example — average hides spread.',
          misconception: 'Students believe the mean fully describes a dataset and ignore spread entirely.',
          parts: [
            { id: 'a', prompt: 'Define the Coefficient of Variation and state its formula.', answer: 'CV is a relative measure of dispersion: (standard deviation ÷ mean) × 100',
              options: ['CV is a relative measure of dispersion: (standard deviation ÷ mean) × 100', '(mean ÷ standard deviation) × 100', 'standard deviation × 100', '(range ÷ mean) × 100'],
              hint: 'Think of it as "spread per unit of average" — that is why it is unit-free.',
              misconception: 'Students invert the formula to mean/SD or forget the ×100 scaling.' },
            { id: 'b', prompt: 'For the data 10, 10, 10, 10, 50 the mean is 18. Without computing, which is larger here: mean deviation or standard deviation?', answer: 'Standard deviation — squaring amplifies the single large deviation of 32',
              options: ['Standard deviation — squaring amplifies the single large deviation of 32', 'Mean deviation — it always exceeds SD', 'They are always equal', 'Cannot be compared without the full calculation'],
              hint: 'One deviation (32) is huge relative to the others — squaring exaggerates exactly that.',
              misconception: 'Students treat SD and MD as interchangeable measures of "average distance".' },
            { id: 'c', prompt: 'Two factories have the same mean daily wage. Factory X has CV 8%, Factory Y has CV 15%. Which workforce has more consistent wages?', answer: 'Factory X — lower CV means less relative variability',
              options: ['Factory X — lower CV means less relative variability', 'Factory Y — higher CV means more spread out and thus more consistent', 'Cannot tell — CV depends on the units', 'Both are equally consistent since means are equal'],
              hint: 'CV is relative spread — smaller is tighter, regardless of units.',
              misconception: 'Students read CV as an absolute measure or assume equal means imply equal spread.' }
          ],
            remediations: { 'the-mean-fully-describes-a-dataset': { steps: ['Compute the mean of 10,10,10,10,50 (18) and of 16,18,20,17,19 (18).', 'Ask: are these two datasets the same? Obviously not — so what differs?', 'Introduce deviation from the mean; show |x−18| for each.', 'Square the deviations and see how the 32 explodes — that is why SD exists.'], labTask: { instruction: 'Sample two Players, One Average — what does the spread look like?', widget: 'sampler', validate: 'sampler:trials>99' , labels: ['Descriptive Statistics', 'Two Players, One Average', 'The Squaring Trap', 'Comparing Across Units'] } } } }
    ],
    explore: { lab: 'sampler', prompt: 'Run the trials — watch a pattern emerge from randomness.' },
    predict: { question: 'Applied maths loves patterns in data — after 500 trials, a fair proportion settles closest to...', options: ['50%','25%','90%','it stays random'], answer: '50%', verifyWidget: 'sampler', verifyPrompt: 'Now run the trials - was your prediction right?' },
    reflect: { prompts: ['Why can two datasets with the same mean need different decisions?', 'Explain CV to a friend using the cricket example.'] },
    successLine: 'You can now read spread, not just the average! 🌟', tryAgainLine: 'Revisit the spread idea, then retry.',
};
