import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch10 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch10: SimDef = {
    id: 'v3_c11_app_ch10',
    title: 'Descriptive Statistics',
    subtitle: 'This node covers the computation and interpretation of central tendency (Arithmetic Mean.',
    classLevel: 11, subject: 'app', topic: 'Descriptive Statistics',
    chapters: ['c11_app_ch10'],
    nodeIds: ['c11_app_cbse_10_001', 'c11_app_cbse_10_002', 'c11_app_cbse_10_003', 'c11_app_cbse_10_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'You just got your Class 11 term exam results for five subjects: English 78, Math 92, Physics 85, Chemistry.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Descriptive Statistics', text: 'Descriptive Statistics is the branch of statistics concerned with organizing, summarizing, and presenting raw data in a meaningful way using measures of central tendency (mean, median, mode).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_10_001', title: 'Descriptive Statistics',
          scaffold: { problem: 'The following data shows the marks obtained by 60 students in an Applied Mathematics test (Max Marks 50). Find the Mean, Median, and Mode.',
            steps: [
            { text: 'Verify class intervals are continuous (exclusive). They are (0-10, 10-20...).' },
            { text: '**Mean Calculation (Direct Method):** Compute $f_i x_i$: 25, 150, 500, 525, 450. Sum = 1650.' },
            { text: '**Median Calculation:** Find $N/2 = 30$. Construct Cumulative Frequency (cf): 5, 15, 35, 50, 60.' },
            { text: '**Mode Calculation:** Modal Class = 20-30 (Max freq 20). $l=20, f_1=20, f_0=10, f_2=15, h=10$.' },
            { text: '**Interpret Skewness:** Mean (27.5) $\\approx$ Median (27.5) > Mode (26.67).', faded: true, blankAnswer: 'Mean = 27.5, Median = 27.5, Mode = 26.67. The distribution.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_10_002', title: 'Measures of central tendency are three.',
          caseStudy: { intro: '1. Mean — share-and-divide: marks 70, 80, 90 → mean = 240/3 = 80. 2.',
            decisions: [{ prompt: 'Find the mean of 70, 80, 90, 60, 50.', options: [
                { text: 'Mean = (70+80+90+60+50)/5 = 350/5 = 70', outcome: 'Mean = (70+80+90+60+50)/5 = 350/5 = 70.' },
                { text: '\'average\' always means the mean', outcome: 'Not quite — Students think \'average\' always means the mean. Each middle answers a different question — the mean.', reveals: 'average-always-means-the-mean' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_10_004', title: 'You made it',
          caseStudy: { intro: 'You finished Descriptive Statistics — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_10_001', difficulty: 'standard',
          question: 'Descriptive Statistics is the branch of statistics concerned with organizing.',
          hint: 'Review "Organising Data" (Section 10.2 of NCERT) specifically: conversion of inclusive.',
          misconception: '**Misconception:** "Standard Deviation and Mean Deviation measure the same thing (average distance from center),.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Descriptive Statistics is the branch of statistics concerned with organizing,',
                  options: ['Descriptive Statistics is the branch of statistics concerned with organizing,', 'Measures of central tendency are three summary statistics: the mean (sum of values ÷ count', 'Measures of dispersion quantify spread around the centre: range (max − min) is the crudest', 'The Coefficient of Variation is relative dispersion'],
                  hint: 'Review "Organising Data" (Section 10.2 of NCERT) specifically: conversion of inclusive classes.',
                  misconception: '**Misconception:** "Standard Deviation and Mean Deviation measure the same thing (average distance from center), so they are.' }
          ],
            remediations: { 'misconception-standard-deviation-and-mean': { steps: ['**Visualize the Weighting:** Draw a number line with the Mean at center.', 'Plot the 5 data points from the example above (four at -8, one at +32).', 'Calculate the "Area of Squares" (deviation^2) for each point.', 'Show physically that the square for +32 (area 1024) dwarfs the four squares for -8 (area 64 each, total 256).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_10_002', difficulty: 'standard',
          question: 'Measures of central tendency are three summary statistics: the mean (sum.',
          hint: 'Work step by step.',
          misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything.',
          parts: [
                { id: 'a', prompt: 'Find the mean of 70, 80, 90, 60, 50.', answer: 'Mean = (70+80+90+60+50)/5 = 350/5 = 70',
                  options: ['Mean = (70+80+90+60+50)/5 = 350/5 = 70', '\'average\' always means the mean'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything (and gets dragged.' },
                { id: 'b', prompt: 'Find the median of 3, 8, 5, 1, 9.', answer: 'Order: 1, 3, 5, 8, 9 → median = 5, the middle value',
                  options: ['Order: 1, 3, 5, 8, 9 → median = 5, the middle value', '\'average\' always means the mean'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything (and gets dragged.' },
                { id: 'c', prompt: 'Find the median of 4, 7, 10, 12.', answer: 'Ordered, the two middles are 7 and 10 → median = (7+10)/2 = 8.5',
                  options: ['Ordered, the two middles are 7 and 10 → median = (7+10)/2 = 8.5', '\'average\' always means the mean'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything (and gets dragged.' },
                { id: 'd', prompt: 'Salaries: ₹20k, ₹22k, ₹24k, ₹200k. Which measure is fairest and why?', answer: 'Median (₹23k) — the ₹200k outlier drags the mean to ₹66.5k',
                  options: ['Median (₹23k) — the ₹200k outlier drags the mean to ₹66.5k', '\'average\' always means the mean'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything (and gets dragged.' }
          ],
            remediations: { 'average-always-means-the-mean': { steps: ['Always order the data before hunting the median, and ask whether an outlier is present — if yes, the median is the.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything.',
          parts: [
                { id: 'a', prompt: 'When is the mode the only usable central measure?', answer: 'For categorical data',
                  options: ['For categorical data', '\'average\' always means the mean'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything (and gets dragged.' },
                { id: 'b', prompt: 'What must you be able to do to master this topic?', answer: 'Compute all three measures and defend a choice',
                  options: ['Compute all three measures and defend a choice', '\'average\' always means the mean'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'average\' always means the mean. Each middle answers a different question — the mean shares everything (and gets dragged.' }
          ],
            remediations: { 'average-always-means-the-mean': { steps: ['Always order the data before hunting the median, and ask whether an outlier is present — if yes, the median is the.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_10_003', difficulty: 'standard',
          question: 'Measures of dispersion quantify spread around the centre: range (max − min).',
          hint: 'Work step by step.',
          misconception: 'Students compare datasets by mean alone — \'both average 40, so equal\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Measures of dispersion quantify spread around the centre: range (max − min) is the crudest',
                  options: ['Measures of dispersion quantify spread around the centre: range (max − min) is the crudest', 'Descriptive Statistics is the branch of statistics concerned with organizing,', 'Measures of central tendency are three summary statistics: the mean (sum of values ÷ count', 'The Coefficient of Variation is relative dispersion'],
                  hint: 'Recall the definition.',
                  misconception: 'Students compare datasets by mean alone — \'both average 40, so equal\'.' }
          ],
            remediations: { 'students-compare-datasets-by-mean': { steps: ['Compute deviations from the mean first (xᵢ − x̄), square them, average, then root.', 'If a comparison question has equal means, it is asking about σ — compute spread, not the centre again.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_10_004', difficulty: 'standard',
          question: 'The Coefficient of Variation is relative dispersion — CV = (σ ÷ x̄) × 100,.',
          hint: 'Work step by step.',
          misconception: 'Students compare raw standard deviations across datasets with different means — \'σ=5 beats σ=4\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Coefficient of Variation is relative dispersion',
                  options: ['The Coefficient of Variation is relative dispersion', 'Descriptive Statistics is the branch of statistics concerned with organizing,', 'Measures of central tendency are three summary statistics: the mean (sum of values ÷ count', 'Measures of dispersion quantify spread around the centre: range (max − min) is the crudest'],
                  hint: 'Recall the definition.',
                  misconception: 'Students compare raw standard deviations across datasets with different means — \'σ=5 beats σ=4\'.' }
          ],
            remediations: { 'students-compare-raw-standard-deviations': { steps: ['Always normalise by the mean: CV = σ/x̄ × 100.', 'If the question compares different units or different-scale means, CV is the only valid comparison — compute it for.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
