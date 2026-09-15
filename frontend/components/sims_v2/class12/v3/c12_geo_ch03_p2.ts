import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch03_p2: SimDef = {
    id: 'v3_c12_geo_ch03_p2',
    title: 'Human Development · Part 2/2',
    subtitle: 'GDP doubled, choices shrank — the difference that defines development',
    classLevel: 12, subject: 'geography', topic: 'Human Development · Part 2/2',
    chapters: ['c12_geo_ch03'],
    nodeIds: ['c12_geo_cbse_03_007', 'c12_geo_cbse_03_008', 'c12_geo_cbse_03_009', 'c12_geo_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Development analyst', intro: 'Mahbub ul Haq asked a dangerous question: what if a country gets richer and its people get less free? The answer built the HDI era.', goal: 'Distinguish growth from human development and apply the capability lens of health, education and access to resources.' },
    discovery: {
        question: 'A city doubles its GDP per capita in a decade — while infant mortality stays flat and female literacy falls. Mahbub ul Haq\'s verdict?',
        options: ['Growth without development — choices actually shrank; development is qualitative and value-positive, and this city moved backwards on health and education', 'Full development — GDP doubled', 'Partial development — money first, people later', 'No development needed — wealth is enough'],
        answer: 'Growth without development — choices actually shrank; development is qualitative and value-positive, and this city moved backwards on health and education',
        hook: 'Growth is quantitative and value-neutral — it can even be negative; development must expand what people can be and do. And the trap: HDI measures the average, not the spread — a rising rank can hide deepening deprivation for those the average forgets.',
    },
    teaching: [
        { title: 'Other Human Development Indicators: GDI, GEM, HPI', text: 'The Gender-related Development Index (GDI) adjusts the Human Development Index (HDI) for gender inequalities in the three basic dimensions of human development: health (life expectancy), education.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit a nation\'s true progress: separate growth from development, run the three capability tests — health, education, resources — then interrogate whether an HDI rise means everyone got freer.',
        labels: ['Other Human Development Indicators', 'Human Development in India', 'International Comparisons of Human', 'Sustainable Development and Human'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_03_007', title: 'Other Human Development Indicators: GDI, GEM, HPI',
          scaffold: { problem: 'Calculate GDI for a hypothetical country with the following 2005 data: Female life expectancy = 72 years, Male = 68 years; Female adult.',
            steps: [
            { text: 'Compute dimension indices for EACH gender separately using goalpost formula: Index = (Actual - Minimum) / (Maximum.' },
            { text: 'Compute Female Education Index = (2/3 × Adult Literacy Index) + (1/3 × Gross Enrolment Index).' },
            { text: 'Compute Income Index using log formula: Index = (log(Actual) - log(Min)) / (log(Max) - log(Min)).' },
            { text: 'Apply harmonic mean penalty for EACH dimension: Equally Distributed Index (EDI) = 2 / (1/I_female + 1/I_male).' },
            { text: 'GDI = (1/3) × (Health EDI + Education EDI + Income EDI) = (1/3) × (0.7485 + 0.7319 + 0.6569) = (1/3) × 2.1373 = 0.7124.', faded: true, blankAnswer: 'GDI = 0.712. For comparison, HDI (using average.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_03_008', title: 'Human Development in India: National and State-level Variations',
          scaffold: { problem: 'Using the 2021 state-level data below, compute the HDI for Maharashtra and Tamil Nadu and explain the difference.',
            steps: [
            { text: 'Compute Health Index for each state using (LE-20)/65. Maharashtra: (72.5-20)/65 = 0.808. Tamil Nadu: (73-20)/65 = 0.815.' },
            { text: 'Compute MYS Index (MYS/15) and EYS Index (EYS/15). Maharashtra: MYS=9.2/15=0.613, EYS=12.5/15=0.833.' },
            { text: 'Compute Education Index as geometric mean of MYS and EYS indices. Maharashtra: √(0.613×0.833) = √0.511 = 0.715.' },
            { text: 'Compute Income Index using (ln(GNIpc)-ln(100))/(ln(75000)-ln(100)).' },
            { text: 'Compute HDI as geometric mean of three indices. Maharashtra: (0.808×0.715×0.646)^(1/3) = (0.373)^(1/3) = 0.720.' },
            { text: 'Interpret: Tamil Nadu edges out Maharashtra despite lower income because of higher education index (driven by both MYS.', faded: true, blankAnswer: 'Tamil Nadu HDI ≈ 0.731, Maharashtra HDI ≈ 0.720. Tamil Nadu.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_009', title: 'International Comparisons of Human Development',
          caseStudy: { intro: 'Begin with a real-world observation: "Look at the 2025 HDI rankings — Norway (0.966) ranks #2 while India (0.685) ranks #130, yet India\'s economy is 10x larger.',
            decisions: [{ prompt: 'According to the 2025 Human Development Report, what is the HDI score threshold that separates "Very High" from "High" human development.', options: [
                { text: 'Correct answer: The threshold is 0.800', outcome: 'Correct answer: The threshold is 0.800; 74 countries are in the Very High category (HDI ≥ 0.800).' },
                { text: 'high HDI countries are rich', outcome: 'Not quite — Students believe that "high HDI countries are rich because they have high HDI" — reversing.', reveals: 'high-hdi-countries-are-rich' },
                { text: '"high HDI countries are rich', outcome: 'Not quite — Students believe that "high HDI countries are rich because they have high HDI" — reversing.', reveals: 'high-hdi-countries-are-rich' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_010', title: 'Sustainable Development and Human Development Goals',
          caseStudy: { intro: 'Observe your neighbourhood: a new metro station reduces travel time (productivity), but the construction dust aggravates asthma in children (health cost).',
            decisions: [{ prompt: 'Define sustainable development in the specific context of human development as used in the UN Human Development Reports.', options: [
                { text: 'Sustainable development in human development means expanding people\'s capabilities', outcome: 'Sustainable development in human development means expanding people\'s capabilities (health.' },
                { text: 'planting trees', outcome: 'Not quite — Students equate sustainable development solely with environmental protection (tree planting.', reveals: 'students-equate-sustainable-development-solely' },
                { text: 'equates it only with environmental conservation (e', outcome: 'Not quite — Students equate sustainable development solely with environmental protection (tree planting.', reveals: 'students-equate-sustainable-development-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning at a state policy cell, you\'re asked which of two districts deserves a \'model development\' citation. District A has higher per-capita income; District B has lower income but better life expectancy, higher literacy, and stronger public services.',
            decisions: [{ prompt: 'What does the human development framework say?', options: [
                { text: 'Cite District B — growth is quantitative and value-neutral while development is qualitative and value-positive; the capability approach counts health and education as capabilities in themselves, so lower income can still mean higher development, as Kerala shows against richer states.', outcome: 'The chapter\'s core claim: development happens only when capabilities enlarge real choices — B\'s life expectancy and literacy are development; A\'s income is only growth.' },
                { text: 'Cite District A — higher income means higher development; health and literacy follow money automatically.', outcome: 'That\'s the income approach the chapter refutes: positive growth does not always lead to development, and identical-income states can sit far apart on human development once you look at capabilities.', reveals: 'income-equals-development' },
                { text: 'Declare it a tie — since the comparison mixes economic and social indicators, no ranking is possible.', outcome: 'False neutrality misses the framework: the capability approach exists precisely to rank such cases — B\'s superior health and education outcomes make it more developed despite lower income.', reveals: 'mixed-indicators-mean-tie' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You can now read development as enlarged choice, not enlarged output — and catch the \'growth without development\' trap that fools headline-readers.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_007', difficulty: 'standard',
          question: 'The Gender-related Development Index (GDI) adjusts the Human Development Index.',
          hint: 'If stuck on GDI penalty calculation, revisit harmonic mean vs arithmetic mean with.',
          misconception: 'Students think GDI = (Female HDI + Male HDI)/2. Actually GDI calculates dimension indices separately for each gender.',
          parts: [
                { id: 'a', prompt: 'A country has HDI = 0.720. Its female life expectancy = 72, male = 68. Female adult literacy = 65%, male = 80%. Female gross enrolment = 70%, male = 85%.', answer: 'GDI will be LOWER than HDI',
                  options: ['GDI will be LOWER than HDI', 'GDI higher', 'GDI = (Female HDI + Male HDI)/2'],
                  hint: 'If stuck on GDI penalty calculation, revisit harmonic mean vs arithmetic mean with numerical.',
                  misconception: 'Students think GDI = (Female HDI + Male HDI)/2. Actually GDI calculates dimension indices separately for each gender, applies harmonic mean.' },
                { id: 'b', prompt: 'Country X: Female parliamentary seats = 12%, Female legislators/senior officials/managers = 8%, Female professional/technical workers = 35%, Gender income.', answer: '**Country X:** Political index = 12/50 = 0.24 (max 50% seats)',
                  options: ['**Country X:** Political index = 12/50 = 0.24 (max 50% seats)', 'GDI = (Female HDI + Male HDI)/2'],
                  hint: 'If stuck on GDI penalty calculation, revisit harmonic mean vs arithmetic mean with numerical.',
                  misconception: 'Students think GDI = (Female HDI + Male HDI)/2. Actually GDI calculates dimension indices separately for each gender, applies harmonic mean.' },
                { id: 'c', prompt: 'Compare the following two statements and identify which is correct and why: Statement A: "GDI is simply the HDI calculated separately for women and men, then.', answer: 'Statement B is correct',
                  options: ['Statement B is correct', 'GDI = (Female HDI + Male HDI)/2'],
                  hint: 'If stuck on GDI penalty calculation, revisit harmonic mean vs arithmetic mean with numerical.',
                  misconception: 'Students think GDI = (Female HDI + Male HDI)/2. Actually GDI calculates dimension indices separately for each gender, applies harmonic mean.' }
          ],
            remediations: { 'gdi-female-hdi-male-hdi': { steps: ['Revisit c12_geo_cbse_03_005 (HDI calculation) — ensure you can compute dimension indices from raw data.', 'Study harmonic mean vs arithmetic mean: take pairs (0.9,0.7), (0.8,0.8), (0.6,0.9) — compute both means, observe how.', 'Re-read NCERT box on GDI (p.18): "The GDI adjusts the HDI for gender inequality...', 'it uses the same variables but computes them separately for men and women." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think GDI = (Female HDI + Male HDI)/2. Actually GDI calculates dimension indices separately for each gender.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "A country with Very High HDI (>0.800) will always have low HPI (<10%) and high GEM (>0.700)." Provide a counterexample or logical.', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'GDI = (Female HDI + Male HDI)/2'],
                  hint: 'If stuck on GDI penalty calculation, revisit harmonic mean vs arithmetic mean with numerical.',
                  misconception: 'Students think GDI = (Female HDI + Male HDI)/2. Actually GDI calculates dimension indices separately for each gender, applies harmonic mean.' }
          ],
            remediations: { 'gdi-female-hdi-male-hdi': { steps: ['Revisit c12_geo_cbse_03_005 (HDI calculation) — ensure you can compute dimension indices from raw data.', 'Study harmonic mean vs arithmetic mean: take pairs (0.9,0.7), (0.8,0.8), (0.6,0.9) — compute both means, observe how.', 'Re-read NCERT box on GDI (p.18): "The GDI adjusts the HDI for gender inequality...', 'it uses the same variables but computes them separately for men and women." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_008', difficulty: 'standard',
          question: 'Human Development in India refers to the national and sub-national (state/UT).',
          hint: 'Revisit c12_geo_cbse_03_005 worked examples; practice with goalpost normalization and.',
          misconception: 'Students think "high per capita income = high HDI" for Indian states.',
          parts: [
                { id: 'a', prompt: 'What was India\'s HDI value and global rank in the 2025 Human Development Report (reflecting 2023 data), and how did the value change from 2022?', answer: 'India\'s HDI value was 0.685 in 2023 (rank 130 out of 193), up from 0.676 in 2022',
                  options: ['India\'s HDI value was 0.685 in 2023 (rank 130 out of 193), up from 0.676 in 2022', 'high per capita income = high HDI', 'developed', '"high per capita income = high HDI" for Indian states'],
                  hint: 'Revisit c12_geo_cbse_03_005 worked examples; practice with goalpost normalization and geometric.',
                  misconception: 'Students think "high per capita income = high HDI" for Indian states.' },
                { id: 'b', prompt: 'Given the following 2021 state-level data, calculate the approximate HDI for State X and State Y using the geometric mean method (assume equal weights).', answer: 'Step 1: Compute dimension indices',
                  options: ['Step 1: Compute dimension indices', 'high per capita income = high HDI', 'developed', '"high per capita income = high HDI" for Indian states'],
                  hint: 'Revisit c12_geo_cbse_03_005 worked examples; practice with goalpost normalization and geometric.',
                  misconception: 'Students think "high per capita income = high HDI" for Indian states.' }
          ],
            remediations: { 'high-per-capita-income-high': { steps: ['Revisit node c12_geo_cbse_03_005 (HDI calculation) and re-do the geometric mean worked example with two imaginary.', 'Open the latest India HDR statistical tables (UNDP website) and plot a scatter of state income index vs HDI — observe.', 'Read the "Inequality-adjusted HDI (IHDI)" section in the same report to see how disparity *within* states further.', 'Re-attempt Diagnostic Question 3 with new numbers until the geometric mean logic is intuitive.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_009', difficulty: 'standard',
          question: 'International comparisons of human development involve analyzing and ranking.',
          hint: 'If unclear on HDI components or thresholds, immediately review c12_geo_cbse_03_005.',
          misconception: 'Students believe that "high HDI countries are rich because they have high HDI" — reversing causality.',
          parts: [
                { id: 'a', prompt: 'According to the 2025 Human Development Report, what is the HDI score threshold that separates "Very High" from "High" human development countries, and how.', answer: 'Correct answer: The threshold is 0.800',
                  options: ['Correct answer: The threshold is 0.800', 'high HDI countries are rich', '"high HDI countries are rich'],
                  hint: 'If unclear on HDI components or thresholds, immediately review c12_geo_cbse_03_005 (components) and.',
                  misconception: 'Students believe that "high HDI countries are rich because they have high HDI" — reversing causality.' },
                { id: 'b', prompt: 'Compare the typical characteristics of "Very High HDI" countries and "Low HDI" countries across three dimensions: (a) social-sector expenditure priority, (b).', answer: 'Correct analysis: (a) Very High HDI: high % of GDP on health/education',
                  options: ['Correct analysis: (a) Very High HDI: high % of GDP on health/education', 'culture', 'high HDI countries are rich', '"high HDI countries are rich'],
                  hint: 'If unclear on HDI components or thresholds, immediately review c12_geo_cbse_03_005 (components) and.',
                  misconception: 'Students believe that "high HDI countries are rich because they have high HDI" — reversing causality.' }
          ],
            remediations: { 'high-hdi-countries-are-rich': { steps: ['Revisit c12_geo_cbse_03_005 (HDI components/calculation) — verify you can compute HDI from raw indicators.', 'Revisit c12_geo_cbse_03_006 (Country classification) — memorise the four thresholds and 2025 country counts using.', 'Create a 2×2 matrix: Rows = HDI category (Very High vs Low); Columns = Expenditure (Social vs Defence), Governance.', 'Re-attempt Diagnostic Q4 and Q5. If still stuck, watch UNDP\'s "HDI Explained" 5-min video and map top-10 vs bottom-10.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_03_010', difficulty: 'standard',
          question: 'Sustainable development in human geography refers to a development paradigm.',
          hint: 'Re-read the "Four Pillars" section in NCERT Chapter 3 and the Capability Approach.',
          misconception: 'Students equate sustainable development solely with environmental protection (tree planting, pollution control) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sustainable development in human geography refers to a development paradigm that meets',
                  options: ['Sustainable development in human geography refers to a development paradigm that meets', 'Human development is a qualitative, value-positive process of enlarging people\'s freedoms', 'Human development is a qualitative, value-positive process of enlarging people\'s freedoms', 'The four pillars of human development—equity, sustainability, productivity, and'],
                  hint: 'Re-read the "Four Pillars" section in NCERT Chapter 3 and the Capability Approach in Table 3.1.',
                  misconception: 'Students equate sustainable development solely with environmental protection (tree planting, pollution control) and treat the SDGs as 17.' }
          ],
            remediations: { 'students-equate-sustainable-development-solely': { steps: ['Revisit node c12_geo_cbse_03_003 (Four Pillars) and create a 2x2 matrix: rows = pillars, columns = SDGs 1-17; tick.', 'Take your district\'s latest District Development Report; pick one infrastructure project and trace its impact across.', 'Re-attempt Diagnostic Question 3 with your district\'s data. If groundwater data unavailable, use CGWB block-level.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
