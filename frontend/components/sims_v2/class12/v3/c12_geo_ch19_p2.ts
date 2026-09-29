import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch19_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch19_p2: SimDef = {
    id: 'v3_c12_geo_ch19_p2',
    title: 'Data Processing · Part 2/2',
    subtitle: '1,500 readings, one mean, zero validity — the step they skipped',
    classLevel: 12, subject: 'geography', topic: 'Data Processing · Part 2/2',
    chapters: ['c12_geo_ch19'],
    nodeIds: ['c12_geo_cbse_19_007', 'c12_geo_cbse_19_008', 'c12_geo_cbse_19_009', 'c12_geo_cbse_19_010', 'c12_geo_cbse_19_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geographical researcher', intro: 'Thousands of weather readings are useless until a process turns them into a claim. That process is this chapter.', goal: 'Sequence the six steps of geographical data processing and defend each against the shortcuts that corrupt results.' },
    discovery: {
        question: 'A researcher averages 1,500 temperature readings from 50 Rajasthan stations and declares \'the May average.\' Sound method — or a skipped step?',
        options: ['Skipped — without classifying arid west from semi-arid east and tabulating first, one mean mashes unlike regions into a meaningless number', 'Sound — more data means better accuracy', 'Only needs a median', 'Should\'ve used 100 stations'],
        answer: 'Skipped — without classifying arid west from semi-arid east and tabulating first, one mean mashes unlike regions into a meaningless number',
        hook: 'Processing is a six-step pipeline — define, collect, classify, tabulate, analyse, interpret — and computing isn\'t step one. Mix feet with metres or dug wells with tube wells before tabulation and the numbers lie fluently. Mean without dispersion is how \'1100 mm means grow rice\' becomes a drought-year disaster.',
    },
    teaching: [
        { title: 'Measures of Dispersion: Quartile Deviation and Mean Deviation', text: 'Quartile Deviation (QD) is half the difference between the upper quartile (Q3) and lower quartile (Q1), measuring the spread of the middle 50% of geographical data.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_19_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the pipeline end to end: frame a monsoon question, clean and classify district rainfall, build the frequency table, and refuse to conclude until variability has had its say.',
        labels: ['Measures of Dispersion: Quartile', 'Measures of Relative Position', 'Measures of Correlation: Karl', 'Rank Correlation: Spearman\'s Method', 'Data Transformation and Normalisation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_007', title: 'Measures of Dispersion: Quartile Deviation and Mean Deviation',
          scaffold: { problem: 'The following data shows the average monthly temperature (°C) for 10 meteorological stations in the Western Ghats: 22, 24, 19, 26, 21, 23.',
            steps: [
            { text: 'Arrange the data in ascending order: 18, 19, 20, 21, 22, 23, 24, 25, 26, 27.' },
            { text: 'Find median (M): N=10 (even), median = average of 5th and 6th values = (22+23)/2 = 22.5°C.' },
            { text: 'Find Q1 (position (N+1)/4 = 2.75th value): interpolate between 2nd (19) and 3rd (20) => 19 + 0.75*(20-19) = 19.75°C.' },
            { text: 'Find Q3 (position 3(N+1)/4 = 8.25th value): interpolate between 8th (25) and 9th (26) => 25 + 0.25*(26-25) = 25.25°C.' },
            { text: 'Quartile Deviation = (Q3 - Q1)/2 = (25.25 - 19.75)/2 = 2.75°C.' },
            { text: 'Mean Deviation about Median: Compute absolute deviations from 22.5: |18-22.5|=4.5, |19-22.5|=3.5, |20-22.5|=2.5.', faded: true, blankAnswer: 'QD = 2.75°C, MD about median = 2.5°C.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_008', title: 'Measures of Relative Position: Percentiles and Quartiles',
          scaffold: { problem: 'The annual rainfall (mm) at 9 stations in the Malwa Plateau is: 720, 850, 900, 950, 980, 1020, 1100, 1150, 1200.',
            steps: [
            { text: 'Verify data is arranged in ascending order (it is). N = 9.' },
            { text: 'Apply ungrouped positional formulas: Q₁ position = (9+1)/4 = 2.5 → interpolate between 2nd and 3rd values.' },
            { text: 'Q₁ = (850 + 900)/2 = 875 mm. Q₂ = 5th value = 980 mm. Q₃ = (1100 + 1150)/2 = 1125 mm.' },
            { text: 'IQR = Q₃ – Q₁ = 1125 – 875 = 250 mm.' },
            { text: 'Interpretation: The middle 50% of stations receive between 875–1125 mm rainfall.', faded: true, blankAnswer: 'Q₁ = 875 mm, Q₂ = 980 mm, Q₃ = 1125 mm, IQR = 250 mm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_009', title: 'Measures of Correlation: Karl Pearson\'s Coefficient',
          scaffold: { problem: 'Compute Karl Pearson\'s r for the relationship between altitude (m) and average annual temperature (°C) for 6 Himalayan stations: Altitude.',
            steps: [
            { text: 'Verify both variables are continuous and paired. List X (altitude) and Y (temperature).' },
            { text: 'Calculate means: X̄ = (500+1000+1500+2000+2500+3000)/6 = 1750 m. Ȳ = (25+20+16+11+7+2)/6 = 13.5°C.' },
            { text: 'Compute deviations from mean: dx = X - 1750 = -1250, -750, -250, 250, 750, 1250.' },
            { text: 'Compute cross-products dx·dy and squared deviations: dx·dy = -14375, -4875, -625, -625, -4875, -14375 → Σdx·dy.' },
            { text: 'Apply formula: r = -39750 / √(4375000 × 361.5) = -39750 / √1581562500 = -39750 / 39768.86 ≈ -0.9995.' },
            { text: 'Interpret: r ≈ -1.0 indicates near-perfect negative linear relationship — temperature drops linearly with altitude.', faded: true, blankAnswer: 'r ≈ -0.9995 (strong negative linear correlation). For every.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_010', title: 'Rank Correlation: Spearman\'s Method',
          scaffold: { problem: 'Compute Spearman\'s ρ for the following data on 7 districts: District-wise rank in Literacy Rate (2011) and rank in Female Work.',
            steps: [
            { text: 'Verify both variables are already ranked (1 to 7). No ties present.' },
            { text: 'Compute difference d = R₁ - R₂ for each district: (1-2)=-1, (2-1)=+1, (3-4)=-1, (4-3)=+1, (5-6)=-1, (6-5)=+1, (7-7)=0.' },
            { text: 'Square each d: 1, 1, 1, 1, 1, 1, 0. Sum Σd² = 6.' },
            { text: 'Apply formula for no ties: ρ = 1 - [6 × 6 / 7(49 - 1)] = 1 - 36 / (7 × 48) = 1 - 36/336 = 1 - 0.10714 = 0.89286 ≈ 0.89.' },
            { text: 'Interpret: Strong positive monotonic relationship — districts with higher literacy ranks tend to have higher female.', faded: true, blankAnswer: 'ρ = 0.89 (strong positive monotonic correlation).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_011', title: 'Data Transformation and Normalisation Techniques',
          scaffold: { problem: 'For 6 districts in Vidarbha, Maharashtra, you have annual rainfall (mm): [720, 850, 680, 920, 780, 1150] and soybean yield (quintals/ha).',
            steps: [
            { text: 'Examine distributions. Rainfall: range 680–1150, roughly symmetric (mean ≈ 850, median ≈ 815).' },
            { text: 'Apply log transformation to soybean yield (all positive, right-skewed).' },
            { text: 'Normalise both to z-scores for correlation. Rainfall: mean = 850, SD ≈ 158.1 → z: [-0.82, 0.00, -1.08, 0.44, -0.44.' },
            { text: 'Compute Pearson\'s r on z-scores. Σ(z_rain × z_logyield) = 0.67 + 0.00 + 1.39 + 0.31 + 0.18 + 2.91 = 5.46.' },
            { text: 'Verify. Scatterplot of z-scores shows linear trend. High r confirms strong positive relationship.', faded: true, blankAnswer: 'Preprocessed correlation r = 0.91 (strong positive).' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_19_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate analysing air quality in 30 cities bins PM2.5 values ranging 12–180 µg/m³ into three equal 20-wide classes — landing 27 cities in \'Low\' and emptying the top classes. He says equal intervals are \'the fair method.\'',
            decisions: [{ prompt: 'What does data classification say about his scheme?', options: [
                { text: 'Fix it — classification must match the phenomenon and the data\'s distribution: for skewed data use quantiles or natural breaks aligned to health thresholds, because equal intervals that erase the polluted minority destroy exactly the discrimination the study exists to show.', outcome: 'The chapter\'s rule is fit-for-purpose grouping: chronological for processes, spatial for patterns, qualitative for attributes, quantitative for magnitudes — and quantitative classes must respect the distribution\'s shape.' },
                { text: 'Keep it — equal intervals are the definition of objective classification.', outcome: 'Equal-width bins feel neutral but hide the signal: when the data cluster at one end, the classes stop distinguishing anything — objectivity that erases variation isn\'t analysis.', reveals: 'equal-intervals-always-fair' },
                { text: 'Switch to classifying cities qualitatively as \'clean/moderate/dirty\' to dodge the binning problem.', outcome: 'That swaps the axis instead of fixing it: PM2.5 is a magnitude with a continuous scale — the repair is better quantitative breaks, not relabelling it an attribute.', reveals: 'qualitative-dodges-skew' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_19_011', title: 'You made it',
          caseStudy: { intro: 'You can now move from a pile of readings to a defensible conclusion — knowing exactly which step saves the analysis from itself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_007', difficulty: 'standard',
          question: 'Quartile Deviation (QD) is half the difference between the upper quartile (Q3).',
          hint: 'If stuck on quartile location, revisit the median formula for grouped data.',
          misconception: 'Students often think quartile deviation and mean deviation are interchangeable because both measure dispersion.',
          parts: [
                { id: 'a', prompt: 'Explain why mean deviation about the median is preferred over mean deviation about the mean for skewed geographical distributions like district-wise population.', answer: 'For skewed distributions, the median is a more representative central value',
                  options: ['For skewed distributions, the median is a more representative central value', 'mean deviation about mean is always better', 'quartile deviation and mean deviation are interchangeable'],
                  hint: 'If stuck on quartile location, revisit the median formula for grouped data (c12_geo_cbse_19_004).',
                  misconception: 'Students often think quartile deviation and mean deviation are interchangeable because both measure dispersion.' },
                { id: 'b', prompt: 'Given the following ungrouped data of annual rainfall (in mm) for 7 districts in Rajasthan: 450, 520, 380, 610, 490, 550, 420. Calculate the quartile deviation.', answer: 'Arrange in ascending order: 380, 420, 450, 490, 520, 550',
                  options: ['Arrange in ascending order: 380, 420, 450, 490, 520, 550', 'quartile deviation and mean deviation are interchangeable'],
                  hint: 'If stuck on quartile location, revisit the median formula for grouped data (c12_geo_cbse_19_004).',
                  misconception: 'Students often think quartile deviation and mean deviation are interchangeable because both measure dispersion.' },
                { id: 'c', prompt: 'Compare the quartile deviation and mean deviation for the same dataset: which is more affected by an extreme value like 1200 mm added to the Rajasthan rainfall.', answer: 'Mean deviation is more affected',
                  options: ['Mean deviation is more affected', 'quartile deviation and mean deviation are interchangeable'],
                  hint: 'If stuck on quartile location, revisit the median formula for grouped data (c12_geo_cbse_19_004).',
                  misconception: 'Students often think quartile deviation and mean deviation are interchangeable because both measure dispersion.' }
          ],
            remediations: { 'quartile-deviation-and-mean-deviation': { steps: ['If the student confuses the two measures, have them: 1) Take a small dataset (5-7 values) with an obvious outlier.', '2) Compute both QD and MD.', '3) Remove the outlier and recompute.', '4) Observe which measure changes more.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think quartile deviation and mean deviation are interchangeable because both measure dispersion.',
          parts: [
                { id: 'a', prompt: 'Design a geographical investigation to compare the dispersion of literacy rates across districts of two Indian states (e.g., Kerala and Bihar) using quartile.', answer: 'Collect district-wise literacy rates for both states',
                  options: ['Collect district-wise literacy rates for both states', 'quartile deviation and mean deviation are interchangeable'],
                  hint: 'If stuck on quartile location, revisit the median formula for grouped data (c12_geo_cbse_19_004).',
                  misconception: 'Students often think quartile deviation and mean deviation are interchangeable because both measure dispersion.' }
          ],
            remediations: { 'quartile-deviation-and-mean-deviation': { steps: ['If the student confuses the two measures, have them: 1) Take a small dataset (5-7 values) with an obvious outlier.', '2) Compute both QD and MD.', '3) Remove the outlier and recompute.', '4) Observe which measure changes more.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_008', difficulty: 'standard',
          question: 'Percentiles and quartiles are measures of relative position that divide.',
          hint: 'If stuck on positional formulas, revisit the median derivation in c12_geo_cbse_19_004 and.',
          misconception: 'Students often confuse the percentile rank formula (percentage of scores below a value) with the percentile value.',
          parts: [
                { id: 'a', prompt: 'Define the first quartile (Q1) in a geographical dataset arranged in ascending order. What percentage of observations lie below Q1?', answer: 'Q1 is the value below',
                  options: ['Q1 is the value below', '50% lie below Q1'],
                  hint: 'If stuck on positional formulas, revisit the median derivation in c12_geo_cbse_19_004 and the ogive.',
                  misconception: 'Students often confuse the percentile rank formula (percentage of scores below a value) with the percentile value formula (value at a given.' }
          ],
            remediations: { 'students-often-confuse-the-percentile': { steps: ['Revisit c12_geo_cbse_19_004 (median calculation) to reinforce positional logic and cumulative frequency construction.', 'Practice with a tiny dataset (N=7) to manually verify Q1, Q2, Q3 positions using (N+1)/4, (N+1)/2, 3(N+1)/4.', 'Draw a number line marking quartile positions to visualize "25%, 50%, 75% below".', 'Re-do Diagnostic Question 3 with N=8 (even) to practice interpolation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_009', difficulty: 'standard',
          question: 'Karl Pearson\'s Coefficient of Correlation (r) is a parametric statistical.',
          hint: 'If stuck on deviation calculations, revisit c12_geo_cbse_19_005 (indirect method for.',
          misconception: 'Students often believe that a high r (e.g., 0.9) implies a cause-effect relationship.',
          parts: [
                { id: 'a', prompt: 'What is the range of Karl Pearson\'s Coefficient of Correlation (r) and what do the extreme values signify?', answer: 'Correct answer: r lies between -1 and +1 inclusive',
                  options: ['Correct answer: r lies between -1 and +1 inclusive', '0 to 1', 'r = 0 means no relationship at all', 'a high r (e'],
                  hint: 'If stuck on deviation calculations, revisit c12_geo_cbse_19_005 (indirect method for mean) and.',
                  misconception: 'Students often believe that a high r (e.g., 0.9) implies a cause-effect relationship.' },
                { id: 'b', prompt: 'Given paired data for 5 districts: Fertilizer use (kg/ha): 50, 60, 70, 80, 90; Wheat yield (quintals/ha): 20, 22, 25, 28, 30.', answer: 'Step 1: X̄ = 70, Ȳ = 25',
                  options: ['Step 1: X̄ = 70, Ȳ = 25', 'a high r (e'],
                  hint: 'If stuck on deviation calculations, revisit c12_geo_cbse_19_005 (indirect method for mean) and.',
                  misconception: 'Students often believe that a high r (e.g., 0.9) implies a cause-effect relationship.' },
                { id: 'c', prompt: 'A student computes r = 0.85 between "Number of hospitals in a district" and "Literacy rate (%)" across 20 districts and concludes "Building more hospitals.', answer: 'Correct analysis: Correlation ≠ causation',
                  options: ['Correct analysis: Correlation ≠ causation', 'a high r (e'],
                  hint: 'If stuck on deviation calculations, revisit c12_geo_cbse_19_005 (indirect method for mean) and.',
                  misconception: 'Students often believe that a high r (e.g., 0.9) implies a cause-effect relationship.' }
          ],
            remediations: { 'a-high-r-e': { steps: ['Revisit c12_geo_cbse_19_004 (mean) and c12_geo_cbse_19_006 (standard deviation) to recall that r is a standardized.', 'Draw scatter plots for three cases: (a) X causes Y, (b) Y causes X, (c) Z causes both — all can give same r.', 'Practice writing interpretations using "associated with", "co-varies with", "linear relationship" — never "causes".', 'Redo Diagnostic Question 4 with a new dataset (e.g., ice cream sales vs. drowning deaths) to internalize the fallacy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_010', difficulty: 'standard',
          question: 'Spearman\'s Rank Correlation Coefficient (ρ or rₛ) is a non-parametric.',
          hint: 'If stuck on ranking, review the "Frequency Distribution: Construction and Class.',
          misconception: 'Students often believe Spearman\'s ρ can only be calculated when there are **no tied ranks**, and they either discard.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Spearman\'s Rank Correlation Coefficient (ρ or rₛ) is a non-parametric statistical measure',
                  options: ['Spearman\'s Rank Correlation Coefficient (ρ or rₛ) is a non-parametric statistical measure', 'Data processing in geographical analysis refers to the systematic sequence of', 'Data classification in geography is the systematic process of grouping raw geographical', 'Frequency distribution is a statistical table that organizes raw geographical data into'],
                  hint: 'If stuck on ranking, review the "Frequency Distribution: Construction and Class Intervals" node.',
                  misconception: 'Students often believe Spearman\'s ρ can only be calculated when there are **no tied ranks**, and they either discard tied observations.' }
          ],
            remediations: { 'spearman-s-can-only-be': { steps: ['Revisit **c12_geo_cbse_19_009** (Karl Pearson\'s Coefficient) to recall the concept of correlation and the difference.', 'Practice ranking a small dataset (n=6) with deliberate ties (e.g., 10, 20, 20, 30, 40, 50) — compute average ranks.', 'Re-do **Worked Example 2** (with ties) step-by-step, checking the correction factor calculation.', 'Take the **Re-diagnostic**: Compute ρ for the dataset in Diagnostic Question 3 but change District C\'s yield rank to 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_011', difficulty: 'standard',
          question: 'Data transformation and normalisation are statistical preprocessing techniques.',
          hint: 'If stuck, revisit c12_geo_cbse_19_006 (Measures of Dispersion) to practice SD and.',
          misconception: 'Students often believe that **normalisation (scaling to 0–1 or z-scores) "fixes" skewness** — they apply min-max.',
          parts: [
                { id: 'a', prompt: 'Given the following raw data for 5 districts: Annual Rainfall (mm): [850, 920, 780, 1100, 950]; Groundwater Depth (m): [8, 12, 5, 25, 10].', answer: '**Correct answer with steps:** 1',
                  options: ['**Correct answer with steps:** 1', 'normal', 'the distribution is now "normal"'],
                  hint: 'If stuck, revisit c12_geo_cbse_19_006 (Measures of Dispersion) to practice SD and skewness.',
                  misconception: 'Students often believe that **normalisation (scaling to 0–1 or z-scores) "fixes" skewness** — they apply min-max or z-score to right-skewed.' }
          ],
            remediations: { 'normalisation-scaling-to-0-1': { steps: ['If the student confuses normalisation with transformation: (1) Give them a tiny right-skewed dataset (5 values: 2, 3.', '(2) Have them compute min-max and z-score — show skewness coefficient unchanged.', '(3) Have them compute log10 — show skewness reduced.', '(4) Refer back to c12_geo_cbse_19_006 (Measures of Dispersion) to review skewness calculation, and c12_geo_cbse_19_009.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
