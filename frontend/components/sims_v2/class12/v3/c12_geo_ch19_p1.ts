import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch19_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch19_p1: SimDef = {
    id: 'v3_c12_geo_ch19_p1',
    title: 'Data Processing · Part 1/2',
    subtitle: '1,500 readings, one mean, zero validity — the step they skipped',
    classLevel: 12, subject: 'geography', topic: 'Data Processing · Part 1/2',
    chapters: ['c12_geo_ch19'],
    nodeIds: ['c12_geo_cbse_19_001', 'c12_geo_cbse_19_002', 'c12_geo_cbse_19_003', 'c12_geo_cbse_19_004', 'c12_geo_cbse_19_005', 'c12_geo_cbse_19_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geographical researcher', intro: 'Thousands of weather readings are useless until a process turns them into a claim. That process is this chapter.', goal: 'Sequence the six steps of geographical data processing and defend each against the shortcuts that corrupt results.' },
    discovery: {
        question: 'A researcher averages 1,500 temperature readings from 50 Rajasthan stations and declares \'the May average.\' Sound method — or a skipped step?',
        options: ['Skipped — without classifying arid west from semi-arid east and tabulating first, one mean mashes unlike regions into a meaningless number', 'Sound — more data means better accuracy', 'Only needs a median', 'Should\'ve used 100 stations'],
        answer: 'Skipped — without classifying arid west from semi-arid east and tabulating first, one mean mashes unlike regions into a meaningless number',
        hook: 'Processing is a six-step pipeline — define, collect, classify, tabulate, analyse, interpret — and computing isn\'t step one. Mix feet with metres or dug wells with tube wells before tabulation and the numbers lie fluently. Mean without dispersion is how \'1100 mm means grow rice\' becomes a drought-year disaster.',
    },
    teaching: [
        { title: 'Data Processing: Need and Steps in Geographical Analysis', text: 'Data processing in geographical analysis refers to the systematic sequence of transforming raw spatial and attribute data into meaningful information through defined steps: problem definition, data.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_19_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the pipeline end to end: frame a monsoon question, clean and classify district rainfall, build the frequency table, and refuse to conclude until variability has had its say.',
        labels: ['Data Processing: Need', 'Data Classification: Types (Chronological,', 'Frequency Distribution: Construction', 'Measures of Central Tendency', 'Measures of Dispersion: Range,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_19_001', title: 'Data Processing: Need and Steps in Geographical Analysis',
          caseStudy: { intro: 'Begin with a real-world observation: a Class 12 student notices that the India Meteorological Department releases daily rainfall figures for hundreds.',
            decisions: [{ prompt: 'A student downloads daily maximum temperature records for 50 weather stations across Rajasthan for the month of May.', options: [
                { text: 'The student skipped **classification** (grouping data by homogeneous regions) and', outcome: 'The student skipped **classification** (grouping data by homogeneous regions) and **tabulation**.' },
                { text: 'more data points always improve accuracy', outcome: 'Not quite — Students believe "data processing = calculating mean/median/mode" and treat.', reveals: 'data-processing-calculating-mean-median' },
                { text: 'data processing = calculating mean/median/mode', outcome: 'Not quite — Students believe "data processing = calculating mean/median/mode" and treat.', reveals: 'data-processing-calculating-mean-median' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_19_002', title: 'Data Classification: Types (Chronological, Spatial, Qualitative, Quantitative)',
          caseStudy: { intro: 'Imagine you have collected monthly rainfall data (in mm) for 10 years from your district\'s meteorological station — that\'s 120 raw numbers.',
            decisions: [{ prompt: 'A student has collected the following data for 5 villages in a block: Village name, Population (2011), Dominant crop (wheat/rice/millet).', options: [
                { text: 'Correct answer: Qualitative classification for dominant crop (nominal categories: wheat,', outcome: 'Correct answer: Qualitative classification for dominant crop (nominal categories: wheat, rice.' },
                { text: 'chronological', outcome: 'Not quite — Students think "classification" just means "making groups" and use equal intervals for everything.', reveals: 'classification-just-means-making-groups' },
                { text: 'classification', outcome: 'Not quite — Students think "classification" just means "making groups" and use equal intervals for everything.', reveals: 'classification-just-means-making-groups' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_003', title: 'Frequency Distribution: Construction and Class Intervals',
          scaffold: { problem: 'The monthly average relative humidity (%) for 12 months in Kolkata is:',
            steps: [
            { text: 'Identify the variable (relative humidity, continuous, in %) and N = 12.' },
            { text: 'Compute range = max − min = 88 − 65 = 23.' },
            { text: 'Apply Sturges\' rule: k = 1 + 3.322 log₁₀ 12 ≈ 1 + 3.322 × 1.079 ≈ 4.59 → round up to 5 classes.' },
            { text: 'Class width = 23 / 5 = 4.6 → round up to 5% for convenience.' },
            { text: 'Set lower limit of first class = 64 (slightly below min 65). Intervals: 64–69, 69–74, 74–79, 79–84, 84–89.' },
            { text: 'Tally frequencies: 64–69: 3 (Jan, Feb, Dec), 69–74: 2 (Mar, Nov), 74–79: 1 (Apr), 79–84: 2 (Oct, Sep), 84–89: 4 (May.' },
            { text: 'Compute midpoints: 66.5, 71.5, 76.5, 81.5, 86.5. Class boundaries are the limits (continuous).' },
            { text: 'Interpret: Bimodal tendency — dry winter (64–69) and wet monsoon (84–89) clusters.', faded: true, blankAnswer: 'Frequency distribution table with intervals, tallies.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_004', title: 'Measures of Central Tendency: Mean, Median and Mode',
          scaffold: { problem: 'The following data shows the decadal population growth rate (%) for 10 districts in the Vidarbha region of Maharashtra: 12.3, 15.7, 9.8.',
            steps: [
            { text: 'List the 10 growth rates (x) and choose assumed mean A = 14.0 (close to the centre of the data range).' },
            { text: 'Calculate deviation d = x – A for each district: –1.7, 1.7, –4.2, 4.2, 0.5, –2.4, 2.9, –0.6, –3.8, 3.8.' },
            { text: 'Sum the deviations: Σd = (–1.7+1.7) + (–4.2+4.2) + 0.5 + (–2.4+2.9) + (–0.6) + (–3.8+3.8) = 0 + 0 + 0.5 + 0.5 – 0.6 + 0.' },
            { text: 'Apply indirect mean formula: X̄ = A + Σd/N = 14.0 + 0.4/10 = 14.0 + 0.04 = 14.04%.' },
            { text: 'Verify with direct method: Σx = 140.4, N=10 → 14.04%. Interpretation: The average decadal growth rate for Vidarbha.', faded: true, blankAnswer: 'Mean decadal population growth rate = 14.04% (indirect.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_005', title: 'Measures of Central Tendency: Computation Methods',
          scaffold: { problem: 'Compute the mean annual rainfall (in mm) for the Malwa Plateau using the indirect (assumed mean) method.',
            steps: [
            { text: 'Choose an assumed mean \\(A = 800\\) (a round number near the centre of the data range).' },
            { text: 'Calculate deviations \\(d = x - A\\) for each district: 179, 283, 33, 96, 91, 25, 177.' },
            { text: 'Sum the deviations: \\(\\sum d = 884\\).' },
            { text: 'Apply formula \\(\\bar{X} = A + \\frac{\\sum d}{N} = 800 + \\frac{884}{7} = 800 + 126.29 = 926.29\\) mm.' },
            { text: 'Verify with direct method: \\(\\sum x = 6484\\), \\(\\bar{X} = 6484/7 = 926.29\\) mm — matches.', faded: true, blankAnswer: 'Mean annual rainfall = 926.29 mm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_006', title: 'Measures of Dispersion: Range, Variance and Standard Deviation',
          scaffold: { problem: 'Compute range, variance, and standard deviation for the following ungrouped data: annual rainfall (mm) in 7 districts of Vidarbha: 920.',
            steps: [
            { text: 'Identify max = 1120, min = 880 → Range = 1120 − 880 = 240 mm. This shows absolute spread but ignores distribution shape.' },
            { text: 'Compute mean: Σx = 920+1050+880+1120+950+1010+890 = 6820; N = 7 → x̄ = 6820/7 = 974.29 mm.' },
            { text: 'Find deviations (x − x̄): -54.29, 75.71, -94.29, 145.71, -24.29, 35.71, -84.29.' },
            { text: 'Square deviations: 2947.4, 5732.0, 8890.6, 21231.3, 590.0, 1275.2, 7104.8. Sum = 47771.3.' },
            { text: 'Variance = 47771.3 / 7 = 6824.5 mm². Standard deviation = √6824.5 = 82.61 mm.' },
            { text: 'Interpretation: Rainfall varies by ~83 mm around mean 974 mm. Coefficient of variation = (82.61/974.29)×100 = 8.5%.', faded: true, blankAnswer: 'Range = 240 mm, Variance = 6824.5 mm², Standard Deviation.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_19_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A teammate analysing air quality in 30 cities bins PM2.5 values ranging 12–180 µg/m³ into three equal 20-wide classes — landing 27 cities in \'Low\' and emptying the top classes. He says equal intervals are \'the fair method.\'',
            decisions: [{ prompt: 'What does data classification say about his scheme?', options: [
                { text: 'Fix it — classification must match the phenomenon and the data\'s distribution: for skewed data use quantiles or natural breaks aligned to health thresholds, because equal intervals that erase the polluted minority destroy exactly the discrimination the study exists to show.', outcome: 'The chapter\'s rule is fit-for-purpose grouping: chronological for processes, spatial for patterns, qualitative for attributes, quantitative for magnitudes — and quantitative classes must respect the distribution\'s shape.' },
                { text: 'Keep it — equal intervals are the definition of objective classification.', outcome: 'Equal-width bins feel neutral but hide the signal: when the data cluster at one end, the classes stop distinguishing anything — objectivity that erases variation isn\'t analysis.', reveals: 'equal-intervals-always-fair' },
                { text: 'Switch to classifying cities qualitatively as \'clean/moderate/dirty\' to dodge the binning problem.', outcome: 'That swaps the axis instead of fixing it: PM2.5 is a magnitude with a continuous scale — the repair is better quantitative breaks, not relabelling it an attribute.', reveals: 'qualitative-dodges-skew' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_19_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now move from a pile of readings to a defensible conclusion — knowing exactly which step saves the analysis from itself.',
            decisions: [{ prompt: 'What comes next? Data Processing · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data Processing · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_001', difficulty: 'standard',
          question: 'Data processing in geographical analysis refers to the systematic sequence.',
          hint: 'If unable to define meaningful classes for a dataset, revisit Class 11 topographical map.',
          misconception: 'Students believe "data processing = calculating mean/median/mode" and treat classification/tabulation as optional.',
          parts: [
                { id: 'a', prompt: 'You are given the following ungrouped dataset: Annual rainfall (mm) for 7 districts of Marathwada region: 680, 720, 650, 810, 590, 770, 640.', answer: 'Step 1: Problem definition',
                  options: ['Step 1: Problem definition', 'data processing = calculating mean/median/mode', 'data processing', 'why is assumed mean method preferred for large datasets?'],
                  hint: 'If unable to define meaningful classes for a dataset, revisit Class 11 topographical map.',
                  misconception: 'Students believe "data processing = calculating mean/median/mode" and treat classification/tabulation as optional formatting.' }
          ],
            remediations: { 'data-processing-calculating-mean-median': { steps: ['Revisit Class 11 "Map Reading" (c11_geo_cbse_22_005): practice converting raw contour values into slope classes — same.', 'Do a mini-project: take 30 days of your city\'s AQI from CPCB website, classify into "Good/Moderate/Poor", tabulate.', 'Redo Diagnostic Q3 with your own dataset.', 'Check: Can you explain why the class interval width must be constant for frequency distribution?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "data processing = calculating mean/median/mode" and treat classification/tabulation as optional.',
          parts: [
                { id: 'a', prompt: 'A Class 12 project concludes: "Since the mean annual rainfall of District X is 1100 mm, farmers should grow rice." Evaluate this conclusion using the concept.', answer: 'The conclusion skips **dispersion analysis** (measure of variability) and',
                  options: ['The conclusion skips **dispersion analysis** (measure of variability) and', 'need for median', 'data processing = calculating mean/median/mode', 'data processing'],
                  hint: 'If unable to define meaningful classes for a dataset, revisit Class 11 topographical map.',
                  misconception: 'Students believe "data processing = calculating mean/median/mode" and treat classification/tabulation as optional formatting.' }
          ],
            remediations: { 'data-processing-calculating-mean-median': { steps: ['Revisit Class 11 "Map Reading" (c11_geo_cbse_22_005): practice converting raw contour values into slope classes — same.', 'Do a mini-project: take 30 days of your city\'s AQI from CPCB website, classify into "Good/Moderate/Poor", tabulate.', 'Redo Diagnostic Q3 with your own dataset.', 'Check: Can you explain why the class interval width must be constant for frequency distribution?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_002', difficulty: 'standard',
          question: 'Data classification in geography is the systematic process of grouping raw.',
          hint: 'If stuck on choosing classification type, revisit c11_psy_cbse_02_009 (data types) and.',
          misconception: 'Students think "classification" just means "making groups" and use equal intervals for everything.',
          parts: [
                { id: 'a', prompt: 'Given the decadal population data for Maharashtra (1951: 3.2 Cr, 1961: 3.9 Cr, 1971: 5.0 Cr, 1981: 6.3 Cr, 1991: 7.9 Cr, 2001: 9.7 Cr, 2011: 11.2 Cr).', answer: 'Correct steps: (1) List decades chronologically: 1951-61, 1961-71, ..., 2001-11',
                  options: ['Correct steps: (1) List decades chronologically: 1951-61, 1961-71, ..., 2001-11', 'classification', 'making groups'],
                  hint: 'If stuck on choosing classification type, revisit c11_psy_cbse_02_009 (data types) and ask: "Is.',
                  misconception: 'Students think "classification" just means "making groups" and use equal intervals for everything.' }
          ],
            remediations: { 'classification-just-means-making-groups': { steps: ['Revisit node c12_geo_cbse_19_001 (Data Processing: Need and Steps) — focus on "organisation of data" step.', 'Take a real dataset (e.g., district-wise rice yield from Punjab Agricultural University website).', 'Classify it in ALL four ways on paper: (a) chronological (year-wise), (b) spatial (district-wise), (c) qualitative.', 'Compare which classification answers which question.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_003', difficulty: 'standard',
          question: 'Frequency distribution is a statistical table that organizes raw geographical.',
          hint: 'If stuck on class width or boundaries, review c11_math_cbse_15_001 (Statistics) for the.',
          misconception: 'Students believe class intervals must always be of equal width and that the number of classes is arbitrary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Frequency distribution is a statistical table that organizes raw geographical data into',
                  options: ['Frequency distribution is a statistical table that organizes raw geographical data into', 'Data processing in geographical analysis refers to the systematic sequence of', 'Data classification in geography is the systematic process of grouping raw geographical', 'Measures of central tendency are statistical techniques that identify a single'],
                  hint: 'If stuck on class width or boundaries, review c11_math_cbse_15_001 (Statistics) for the.',
                  misconception: 'Students believe class intervals must always be of equal width and that the number of classes is arbitrary.' }
          ],
            remediations: { 'class-intervals-must-always-be': { steps: ['If a student cannot construct a proper frequency distribution: 1.', 'Revisit c12_geo_cbse_19_002 (Data Classification) to recall why we classify data.', 'Practice range and class width calculation with 3 simple datasets (temperature, rainfall, elevation) using both.', 'Draw a number line, mark min/max, and physically partition it into intervals — visualize boundaries vs limits.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_004', difficulty: 'standard',
          question: 'Measures of central tendency are statistical techniques that identify a single.',
          hint: 'If stuck on grouped mean/median, go back to c12_geo_cbse_19_003 and practice: (1) finding.',
          misconception: 'Students often believe **"mean is always the best average"** and mechanically apply the direct method formula (Σx/N).',
          parts: [
                { id: 'a', prompt: 'The following table shows the wage rates (Rs./day) of 99 factory workers grouped into classes.', answer: '**Step 1:** Find midpoints (x) of each class: 60, 80, 100, 120, 140',
                  options: ['**Step 1:** Find midpoints (x) of each class: 60, 80, 100, 120, 140', 'mean is always the best average'],
                  hint: 'If stuck on grouped mean/median, go back to c12_geo_cbse_19_003 and practice: (1) finding.',
                  misconception: 'Students often believe **"mean is always the best average"** and mechanically apply the direct method formula (Σx/N) even for grouped data.' },
                { id: 'b', prompt: 'A geography student computes the median for the following grouped data and gets 82.5. Verify if this is correct and identify the median class.', answer: '**Step 1:** N = Σf = 50',
                  options: ['**Step 1:** N = Σf = 50', 'mean is always the best average'],
                  hint: 'If stuck on grouped mean/median, go back to c12_geo_cbse_19_003 and practice: (1) finding.',
                  misconception: 'Students often believe **"mean is always the best average"** and mechanically apply the direct method formula (Σx/N) even for grouped data.' }
          ],
            remediations: { 'mean-is-always-the-best': { steps: ['**Revisit c12_geo_cbse_19_003 (Frequency Distribution)** — practice constructing frequency tables with midpoints and.', '**Re-do the indirect method for mean** using the Malwa Plateau rainfall example (Table 2.1 in NCERT) step-by-step.', 'Verify you get the same result as the direct method.', '**Practice median class identification** with 3–4 different grouped datasets until you can instantly locate the class.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_005', difficulty: 'standard',
          question: 'Measures of Central Tendency: Computation Methods refer to the specific.',
          hint: 'If stuck, revisit c12_geo_cbse_19_003 (Frequency Distribution) and practise making.',
          misconception: 'Students often believe that the median for grouped data is simply the midpoint of the median class (e.g., 2500 for.',
          parts: [
                { id: 'a', prompt: 'Calculate the mean wage rate for the grouped data below using the direct method. Show all steps.', answer: 'Step 1: Find midpoints (x): 60, 80, 100, 120, 140',
                  options: ['Step 1: Find midpoints (x): 60, 80, 100, 120, 140', 'the median for grouped data is simply the midpoint of the median class (e'],
                  hint: 'If stuck, revisit c12_geo_cbse_19_003 (Frequency Distribution) and practise making a frequency.',
                  misconception: 'Students often believe that the median for grouped data is simply the midpoint of the median class (e.g., 2500 for class 2000‑3000).' }
          ],
            remediations: { 'the-median-for-grouped-data': { steps: ['If a student cannot correctly identify the median class or misapplies the interpolation formula: 1.', 'Revisit c12_geo_cbse_19_003 (Frequency Distribution) to practise constructing cumulative frequency tables.', 'Use a small dataset (e.g., 10 villages’ populations) and manually locate the median by listing all values, then compare.', 'Re‑attempt Diagnostic Question 4 with a fresh dataset, checking each step against the NCERT worked example (Table 2.4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_006', difficulty: 'standard',
          question: 'Measures of dispersion quantify the spread or variability of geographical data.',
          hint: 'If stuck on shortcut method, revisit **c12_geo_cbse_19_005** Table 2.3 — practice coding.',
          misconception: 'Students often confuse **population vs sample formulas**: they use N−1 (sample) for census data like "all districts.',
          parts: [
                { id: 'a', prompt: 'Define range, variance, and standard deviation. State the formula for standard deviation of ungrouped data using the direct method.', answer: 'Range = Maximum value − Minimum value',
                  options: ['Range = Maximum value − Minimum value', 'all districts of a state'],
                  hint: 'If stuck on shortcut method, revisit **c12_geo_cbse_19_005** Table 2.3 — practice coding.',
                  misconception: 'Students often confuse **population vs sample formulas**: they use N−1 (sample) for census data like "all districts of a state" (which is.' },
                { id: 'b', prompt: 'Two regions have the same mean annual temperature (25°C). Region X has standard deviation 1.2°C; Region Y has standard deviation 4.8°C.', answer: 'Region X has low variability',
                  options: ['Region X has low variability', 'both are same because mean is same', 'all districts of a state'],
                  hint: 'If stuck on shortcut method, revisit **c12_geo_cbse_19_005** Table 2.3 — practice coding.',
                  misconception: 'Students often confuse **population vs sample formulas**: they use N−1 (sample) for census data like "all districts of a state" (which is.' },
                { id: 'c', prompt: 'Calculate the range, variance, and standard deviation for the following ungrouped data: monthly rainfall (mm) in a Karnataka district: 120, 150, 90, 180, 110.', answer: '**Step 1:** Arrange data: 90, 110, 120, 140, 150, 180',
                  options: ['**Step 1:** Arrange data: 90, 110, 120, 140, 150, 180', 'all districts of a state'],
                  hint: 'If stuck on shortcut method, revisit **c12_geo_cbse_19_005** Table 2.3 — practice coding.',
                  misconception: 'Students often confuse **population vs sample formulas**: they use N−1 (sample) for census data like "all districts of a state" (which is.' },
                { id: 'd', prompt: 'Given a grouped frequency distribution of wheat yield (kg/ha) for 50 farms in Punjab, the assumed mean method gives Σfd = 120, Σf = 50, class interval i = 10.', answer: '**Step 1:** σ = i × √[ (Σfd²/Σf) − (Σfd/Σf)² ] but we only have Σfd',
                  options: ['**Step 1:** σ = i × √[ (Σfd²/Σf) − (Σfd/Σf)² ] but we only have Σfd', 'all districts of a state'],
                  hint: 'If stuck on shortcut method, revisit **c12_geo_cbse_19_005** Table 2.3 — practice coding.',
                  misconception: 'Students often confuse **population vs sample formulas**: they use N−1 (sample) for census data like "all districts of a state" (which is.' }
          ],
            remediations: { 'students-often-confuse-population-vs': { steps: ['Revisit **c12_geo_cbse_19_004** and **c12_geo_cbse_19_005** to reinforce mean calculation — dispersion builds on it.', 'Practice coding (u = (x−A)/i) with a simple dataset (e.g., 5 temperatures) until shortcut method feels automatic.', 'Draw a number line: mark mean, then ±1σ, ±2σ — visualize that 68% data lies within ±1σ for normal distributions.', 'Re-attempt Diagnostic Q3 and Q4 with a peer-check: verify units at each step (raw → squared → rooted).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
