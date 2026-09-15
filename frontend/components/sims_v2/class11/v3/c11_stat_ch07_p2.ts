import type { SimDef } from '../../engine/types';

/** v3 generated — c11_stat_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_stat_ch07_p2: SimDef = {
    id: 'v3_c11_stat_ch07_p2',
    title: 'Correlation · Part 2/2',
    subtitle: 'Separate moving together from making happen.',
    classLevel: 11, subject: 'statistics', topic: 'Correlation · Part 2/2',
    chapters: ['c11_stat_ch07'],
    nodeIds: ['c11_stat_cbse_07_007', 'c11_stat_cbse_07_008', 'c11_stat_cbse_07_009', 'c11_stat_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sceptic interrogating a suspicious correlation', intro: 'Bigger feet, better readers — the correlation is real, the causation is an illusion called age.', goal: 'Distinguish correlation from causation and read r\'s limits correctly.' },
    discovery: {
        question: 'Districts with more hospitals report more disease — therefore hospitals cause disease. Where\'s the fallacy?',
        options: ['A third variable — population density and urbanisation drive both; correlation measures co-movement, not causation', 'Nowhere — the correlation proves it', 'The hospitals were built badly', 'Correlation only works one way'],
        answer: 'A third variable — population density and urbanisation drive both; correlation measures co-movement, not causation',
        hook: 'And r = 0.92 says \'strong and positive\' but not automatically \'linear\' — the coefficient can\'t see the curve your scatter diagram can.',
    },
    teaching: [
        { title: 'Spearman\'s Rank Correlation Coefficient: Formula and Calculation', text: 'Spearman\'s rank correlation coefficient (denoted by ρ or rₛ) is a non-parametric measure of the strength and direction of the monotonic relationship between two variables.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_stat_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Explain how shoe size correlates with reading skill in children (the hidden variable: age), then test what r alone can and cannot claim.',
        labels: ['Spearman\'s Rank Correlation Coefficient', 'Rank Correlation with Repeated', 'Properties and Limitations', 'Distinction Between Correlation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_07_007', title: 'Spearman\'s Rank Correlation Coefficient: Formula and Calculation',
          scaffold: { problem: 'The marks of 8 students in Economics and Statistics are given below. Calculate Spearman\'s rank correlation coefficient and interpret.',
            steps: [
            { text: 'Assign ranks to Economics marks (highest = 1). Sorted: 70(1), 65(2), 60(3), 55(4), 50(5), 45(6), 40(7), 35(8).' },
            { text: 'Assign ranks to Statistics marks (highest = 1). Sorted: 75(1), 70(2), 65(3), 60(4), 55(5), 50(6), 45(7), 30(8).' },
            { text: 'Compute rank differences dᵢ = R_Eco - R_Stat: (6-6)=0, (3-3)=0, (8-8)=0, (5-5)=0, (1-1)=0, (4-4)=0, (7-7)=0, (2-2)=0.' },
            { text: 'Σdᵢ² = 0. n = 8.' },
            { text: 'Apply formula: rₛ = 1 - (6×0)/[8(64-1)] = 1 - 0 = 1.', faded: true, blankAnswer: 'rₛ = 1 (Perfect positive rank correlation)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_07_008', title: 'Rank Correlation with Repeated Ranks: Adjustment Formula',
          scaffold: { problem: 'Ten students are ranked by two judges in a dance competition. Judge A\'s ranks: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.',
            steps: [
            { text: 'Identify the tied group in Judge B\'s ranks. The value 3 appears twice, so $m_y = 2$. Judge A has no ties.' },
            { text: 'Compute the correction factor for Judge B: $\\frac{1}{12}(m_y^3 - m_y) = \\frac{1}{12}(8 - 2) = 0.5$.' },
            { text: 'Calculate rank differences $d = R_A - R_B$ for each student: 0, -1, 0, 0, 0, 0, 0, 0, 0, 0.' },
            { text: 'Substitute into the adjusted formula: $r_s = 1 - \\frac{6(1) + 0 + 0.5}{10(100-1)} = 1 - \\frac{6.5}{990} = 1 - 0.006565.' },
            { text: 'Interpret: The near-perfect positive correlation (0.993) indicates the judges agree almost completely; the single.', faded: true, blankAnswer: '$r_s = 0.993$ (rounded to three decimal places)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_stat_cbse_07_009', title: 'Properties and Limitations of Correlation Coefficient',
          scaffold: { problem: 'A researcher collects data on daily temperature (X, in °C) and ice cream sales (Y, in ₹ thousands) for 7 summer days: (25, 12), (28, 15).',
            steps: [
            { text: 'Recognize the claim confuses correlation with causation (Limitation 3).' },
            { text: 'Identify the confounding variable: "season" or "weather conditions" — summer brings both heat and ice cream demand.' },
            { text: 'Note r = 0.98 only measures linear co-movement in the observed summer range (Property 1: range [-1,1]; high value.' },
            { text: 'Apply Limitation 5 (range restriction): the correlation is computed only for summer temperatures; extrapolating.' },
            { text: 'Conclude: high r supports association, not causation; policy requires controlled experiment or causal model, not just.', faded: true, blankAnswer: 'Violates Limitation 3 (correlation ≠ causation) and.' }
            ] } },
        { type: 'case', nodeId: 'c11_stat_cbse_07_010', title: 'Distinction Between Correlation and Causation',
          caseStudy: { intro: 'Imagine reading a newspaper headline: "Ice cream sales correlate strongly with drowning deaths — should we ban ice cream to save lives?" This absurd example.',
            decisions: [{ prompt: 'A student calculates Karl Pearson\'s correlation coefficient between the number of fire engines sent to a fire (X) and the damage caused.', options: [
                { text: 'The error is confusing correlation with causation', outcome: 'The error is confusing correlation with causation. The positive correlation arises because larger.' },
                { text: 'proves', outcome: 'Not quite — Students believe that a high correlation coefficient (|r| > 0.8) combined with a low p-value (p <.', reveals: 'a-high-correlation-coefficient-r' },
                { text: 'a high correlation coefficient (|r| > 0', outcome: 'Not quite — Students believe that a high correlation coefficient (|r| > 0.8) combined with a low p-value (p <.', reveals: 'a-high-correlation-coefficient-r' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Reading a scatter study, a student reports: \'r = 0.85 between shoe size and reading ability — bigger feet improve reading.\' He also calls a steep straight-line scatter \'non-linear, since the changes aren\'t equal.\'',
            decisions: [{ prompt: 'What does correlation actually measure?', options: [
                { text: 'Hold the two boundaries: correlation quantifies co-movement, not cause — the shoe-size link runs through a third variable (age), and zero correlation doesn\'t mean no relation (U-shaped patterns can hide). And \'linear\' means constant RATIO of change — any slope qualifies; Y = 50 + 2.5X is linear though changes aren\'t equal and the line doesn\'t pass through the origin.', outcome: 'The report corrects: r measures direction and strength of linear association — causation needs more, and linearity is about constant slope, not equal steps.' },
                { text: 'Keep the causal read — 0.85 is too strong to be coincidence.', outcome: 'Strength isn\'t direction of cause: co-movement can\'t distinguish X→Y, Y→X, a common cause, or coincidence — here age drives both.', reveals: 'correlation-implies-causation' },
                { text: 'Keep \'non-linear\' — the variables aren\'t rising at the same rate.', outcome: 'Linear means constant ratio, not 1:1 — a steep straight scatter is perfectly linear; non-linearity shows as curvature.', reveals: 'linear-means-equal-rates' }
            ] }] } },
        { type: 'case', nodeId: 'c11_stat_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'Correlation hears two things move together — it never hears which one is talking, or whether a third is conducting.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_007', difficulty: 'standard',
          question: 'Spearman\'s rank correlation coefficient (denoted by ρ or rₛ) is.',
          hint: 'Review the ranking procedure (assigning ranks 1 to n) and the interpretation of Karl.',
          misconception: 'Students frequently apply the formula directly to raw data values (e.g., marks, prices) without first converting them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Spearman\'s rank correlation coefficient (denoted by ρ or rₛ) is a non-parametric measure',
                  options: ['Spearman\'s rank correlation coefficient (denoted by ρ or rₛ) is a non-parametric measure', 'Correlation is a statistical measure that quantifies the direction and strength of the', 'Correlation is classified into four types based on direction and pattern: (1) **Positive', 'A scatter diagram is a graphical tool that plots paired values of two variables (X and Y)'],
                  hint: 'Review the ranking procedure (assigning ranks 1 to n) and the interpretation of Karl Pearson\'s.',
                  misconception: 'Students frequently apply the formula directly to raw data values (e.g., marks, prices) without first converting them to ranks.' }
          ],
            remediations: { 'students-frequently-apply-the-formula': { steps: ['Ask the student to rank a simple dataset (e.g., 5 students\' heights) in ascending and descending order to practice.', 'Give a dataset with clear ranks and have them compute dᵢ and Σdᵢ² manually.', 'Explicitly contrast: "Pearson uses raw values (x, y); Spearman uses ranks (R₁, R₂)." 4.', 'Provide a worked example where raw data gives one correlation and ranks give another, highlighting the monotonic vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently apply the formula directly to raw data values (e.g., marks, prices) without first converting them.',
          parts: [
                { id: 'a', prompt: 'A student calculates Spearman\'s rank correlation for data with tied ranks using the formula rₛ = 1 - (6 Σ d²)/[n(n²-1)] without any adjustment.', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', 'the formula works for any data', 'Spearman'],
                  hint: 'Review the ranking procedure (assigning ranks 1 to n) and the interpretation of Karl Pearson\'s.',
                  misconception: 'Students frequently apply the formula directly to raw data values (e.g., marks, prices) without first converting them to ranks.' }
          ],
            remediations: { 'students-frequently-apply-the-formula': { steps: ['Ask the student to rank a simple dataset (e.g., 5 students\' heights) in ascending and descending order to practice.', 'Give a dataset with clear ranks and have them compute dᵢ and Σdᵢ² manually.', 'Explicitly contrast: "Pearson uses raw values (x, y); Spearman uses ranks (R₁, R₂)." 4.', 'Provide a worked example where raw data gives one correlation and ranks give another, highlighting the monotonic vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_008', difficulty: 'standard',
          question: 'When two or more observations in a series have the same value, they are.',
          hint: 'Revisit the ranking procedure in c11_stat_cbse_07_007, specifically the step where equal.',
          misconception: 'Students often believe that assigning average ranks to tied observations (e.g., giving two 85s the rank 2.5) is the.',
          parts: [
                { id: 'a', prompt: 'A student calculates Spearman\'s $r_s$ for a dataset with ties but forgets to add the correction factor.', answer: 'The calculated $r_s$ will be higher (more positive) than the correct value',
                  options: ['The calculated $r_s$ will be higher (more positive) than the correct value', 'unchanged', 'assigning average ranks to tied observations (e'],
                  hint: 'Revisit the ranking procedure in c11_stat_cbse_07_007, specifically the step where equal values.',
                  misconception: 'Students often believe that assigning average ranks to tied observations (e.g., giving two 85s the rank 2.5) is the complete adjustment.' },
                { id: 'b', prompt: 'Given the following ranks for Variable X: 1, 2.5, 2.5, 4, 5 and Variable Y: 1, 2, 3, 4, 5. Compute the correction factor for Variable X only.', answer: 'Variable X has one tied group of size $m=2$ (the two 2.5s)',
                  options: ['Variable X has one tied group of size $m=2$ (the two 2.5s)', 'assigning average ranks to tied observations (e'],
                  hint: 'Revisit the ranking procedure in c11_stat_cbse_07_007, specifically the step where equal values.',
                  misconception: 'Students often believe that assigning average ranks to tied observations (e.g., giving two 85s the rank 2.5) is the complete adjustment.' },
                { id: 'c', prompt: 'Compare the effect of a single tie of size $m=3$ in Variable X versus two separate ties of size $m=2$ each in Variable X on the magnitude of the total.', answer: 'For $m=3$: $\\frac{27-3}{12}=2$',
                  options: ['For $m=3$: $\\frac{27-3}{12}=2$', 'assigning average ranks to tied observations (e'],
                  hint: 'Revisit the ranking procedure in c11_stat_cbse_07_007, specifically the step where equal values.',
                  misconception: 'Students often believe that assigning average ranks to tied observations (e.g., giving two 85s the rank 2.5) is the complete adjustment.' }
          ],
            remediations: { 'assigning-average-ranks-to-tied': { steps: ['If a student omits the correction factor, have them: (1) Write out the sum of squared ranks for the tied data and for.', 'This step-by-step algebraic verification makes the invisible distortion visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_009', difficulty: 'standard',
          question: 'The correlation coefficient (r) is a pure number between -1 and +1 that.',
          hint: 'Revisit c11_stat_cbse_07_004 (formula derivation) and c11_stat_cbse_07_005/006.',
          misconception: 'Students believe "high correlation implies causation" and "r = 0 implies no relationship whatsoever." The first error.',
          parts: [
                { id: 'a', prompt: 'State the exact range of Karl Pearson\'s correlation coefficient and explain what values at the extremes (+1, -1, 0) indicate about the relationship between.', answer: 'The correlation coefficient r always lies in the closed interval [-1, +1]',
                  options: ['The correlation coefficient r always lies in the closed interval [-1, +1]', 'no relationship at all', 'high correlation implies causation', 'r = 0 implies no relationship whatsoever'],
                  hint: 'Revisit c11_stat_cbse_07_004 (formula derivation) and c11_stat_cbse_07_005/006 (computation.',
                  misconception: 'Students believe "high correlation implies causation" and "r = 0 implies no relationship whatsoever." The first error arises from seeing.' },
                { id: 'b', prompt: 'A student computes correlation between height (in cm) and weight (in kg) for a class and gets r = 0.68.', answer: 'The new correlation coefficient remains exactly 0.68',
                  options: ['The new correlation coefficient remains exactly 0.68', 'it will change because units changed', 'high correlation implies causation', 'r = 0 implies no relationship whatsoever'],
                  hint: 'Revisit c11_stat_cbse_07_004 (formula derivation) and c11_stat_cbse_07_005/006 (computation.',
                  misconception: 'Students believe "high correlation implies causation" and "r = 0 implies no relationship whatsoever." The first error arises from seeing.' },
                { id: 'c', prompt: 'Given the following data pairs: (1, 2), (2, 4), (3, 6), (4, 8), (5, 10), (100, 1). Calculate the correlation coefficient with and without the last point.', answer: 'Without (100,1): points lie perfectly on y=2x, so r = +1',
                  options: ['Without (100,1): points lie perfectly on y=2x, so r = +1', 'r decreases slightly', 'r becomes 0', 'high correlation implies causation'],
                  hint: 'Revisit c11_stat_cbse_07_004 (formula derivation) and c11_stat_cbse_07_005/006 (computation.',
                  misconception: 'Students believe "high correlation implies causation" and "r = 0 implies no relationship whatsoever." The first error arises from seeing.' },
                { id: 'd', prompt: 'A study finds r = 0.92 between "number of fire engines sent to a fire" and "damage caused by the fire (in rupees)".', answer: 'This violates Limitation 3: correlation does not imply causation',
                  options: ['This violates Limitation 3: correlation does not imply causation', 'outliers', 'non-linearity', 'r is too high to be trusted'],
                  hint: 'Revisit c11_stat_cbse_07_004 (formula derivation) and c11_stat_cbse_07_005/006 (computation.',
                  misconception: 'Students believe "high correlation implies causation" and "r = 0 implies no relationship whatsoever." The first error arises from seeing.' }
          ],
            remediations: { 'high-correlation-implies-causation-and': { steps: ['Draw a scatter plot of Y = X² for X ∈ {-2,-1,0,1,2} and compute r=0 together — visually prove a perfect relationship.', 'Present the fire engine/damage example and ask "What third variable explains both?" — guide to "fire severity."', 'Have student write in their own words: "r measures linear co-movement only; causation requires temporal precedence.', 'Give a dataset with an outlier that flips r from +0.9 to -0.7; have them recompute with/without it to feel the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_stat_cbse_07_010', difficulty: 'standard',
          question: 'Correlation is a statistical measure that quantifies the degree to which two.',
          hint: 'Revisit c11_stat_cbse_07_009 (Properties and Limitations of Correlation Coefficient) and.',
          misconception: 'Students believe that a high correlation coefficient (|r| > 0.8) combined with a low p-value (p < 0.05) "proves".',
          parts: [
                { id: 'a', prompt: 'A student calculates Karl Pearson\'s correlation coefficient between the number of fire engines sent to a fire (X) and the damage caused by the fire (Y) and.', answer: 'The error is confusing correlation with causation',
                  options: ['The error is confusing correlation with causation', 'proves', 'a high correlation coefficient (|r| > 0'],
                  hint: 'Revisit c11_stat_cbse_07_009 (Properties and Limitations of Correlation Coefficient) and explicitly.',
                  misconception: 'Students believe that a high correlation coefficient (|r| > 0.8) combined with a low p-value (p < 0.05) "proves" causation.' },
                { id: 'b', prompt: 'Given the following pairs of variables, identify which correlation is most likely spurious (no direct or indirect causal link) and justify your choice: (i).', answer: '(iii) is the classic spurious correlation example',
                  options: ['(iii) is the classic spurious correlation example', 'proves', 'a high correlation coefficient (|r| > 0'],
                  hint: 'Revisit c11_stat_cbse_07_009 (Properties and Limitations of Correlation Coefficient) and explicitly.',
                  misconception: 'Students believe that a high correlation coefficient (|r| > 0.8) combined with a low p-value (p < 0.05) "proves" causation.' }
          ],
            remediations: { 'a-high-correlation-coefficient-r': { steps: ['Ask the student: "If r = 0.9 between shoe size and reading ability in children, does bigger feet cause better reading?".', 'Have them draw three causal diagrams: X → Y, Y → X, Z → X and Z → Y.', 'Give them 5 correlation headlines (e.g., "More doctors → more diseases") and ask them to label each as direct, reverse.', 'Emphasise: "Correlation is a pattern in data; causation is a claim about mechanism.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
