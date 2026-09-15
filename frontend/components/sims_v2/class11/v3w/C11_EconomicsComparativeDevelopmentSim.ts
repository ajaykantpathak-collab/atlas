import type { SimDef } from '../../engine/types';
import C11_EconomicsComparativeDevelopmentSim from '../../../simulations/c6_12/C11_EconomicsComparativeDevelopmentSim';

/** v3 wrapped master — C11_EconomicsComparativeDevelopmentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicscomparativedevelopmentsim: SimDef = {
    id: 'v3w_c11_economicscomparativedevelopmentsim',
    title: 'Comparative Development',
    subtitle: 'Covers the historical overview (1947-2024), rationale for comparison, snapshot of.',
    classLevel: 11, subject: 'economics', topic: 'Comparative Analysis: India, Pakistan and China Background',
    chapters: [],
    nodeIds: ['c11_eco_cbse_08_001', 'c11_eco_cbse_08_007', 'c11_eco_cbse_08_011', 'c11_eco_cbse_01_009', 'c11_eco_cbse_08_003', 'c11_eco_cbse_08_004', 'c11_eco_cbse_08_005', 'c11_eco_cbse_08_006', 'c11_eco_cbse_08_008', 'c11_eco_cbse_08_010', 'c11_eco_cbse_06_009', 'c11_eco_cbse_01_001', 'c11_eco_cbse_01_002', 'c11_eco_cbse_01_005', 'c11_eco_cbse_01_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you\'re at a family dinner where three cousins — born the same year — share their life stories: one.', goal: 'Master Comparative Development.' },
    discovery: {
        question: 'Using Table 8.1 data, explain why China\'s population density (150 persons/sq.km) is lower than India\'s (473 persons/sq.km) even though their total populations.',
        options: ['Density = Population / Land Area', 'China\'s one-child policy', 'India\'s population problem is solved'],
        answer: 'Density = Population / Land Area',
        hook: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0.',
    },
    teaching: [
        { title: 'Comparative development analysis is the.', text: 'Comparative development analysis is the systematic examination of economic and human development trajectories across countries using standardized indicators (GDP growth, sectoral composition,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_001', title: 'Comparative development analysis is the.',
          scaffold: { problem: 'Using Table 8.2 data, calculate the Compound Annual Growth Rate (CAGR) of GDP for India and China over the full period 1980-2024, assuming.',
            steps: [
            { text: 'Identify the two sub-period growth rates for each country from Table 8.2.' },
            { text: 'Convert percentages to growth factors. India: 1.057 and 1.065. China: 1.103 and 1.050.' },
            { text: 'Compute weighted geometric mean for full period (1980-2024 = 44 years).' },
            { text: 'Calculate CAGR = (Full factor)^(1/44) - 1. India: (1.057^10 * 1.065^34)^(1/44) - 1 ≈ (1.74 * 8.0)^(1/44) - 1 ≈.' },
            { text: 'Contrast with simple average: India simple avg = (5.7 + 6.5)/2 = 6.1% (ignores compounding and missing decades).' },
            { text: 'Economic interpretation: 2.2% CAGR difference over 44 years means China\'s GDP per capita grew (1.022)^44 ≈ 2.56 times.', faded: true, blankAnswer: 'India CAGR ≈ 6.2%, China CAGR ≈ 8.4%. CAGR is superior.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_007', title: 'The Human Development Index (HDI) is a.',
          scaffold: { problem: 'Using Table 8.5 data, calculate the Education Index for India given: Mean Years of Schooling (MYS) = 6.9 years, Expected Years of Schooling.',
            steps: [
            { text: 'Identify the formula for Education Index components: MYSI = (MYS - 0) / (15 - 0); EYSI = (EYS - 0) / (18 - 0);.' },
            { text: 'Calculate MYSI for India: MYSI = (6.9 - 0) / 15 = 6.9 / 15 = 0.460' },
            { text: 'Calculate EYSI for India: EYSI = (12.2 - 0) / 18 = 12.2 / 18 = 0.678' },
            { text: 'Compute Education Index: (0.460 + 0.678) / 2 = 1.138 / 2 = 0.569' },
            { text: 'Interpret: India\'s Education Index of 0.569 indicates it has achieved 56.9% of the maximum possible education.', faded: true, blankAnswer: 'Education Index for India = 0.569 (MYSI = 0.460, EYSI =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_011', title: 'Lessons from Chinese and Pakistani.',
          scaffold: { problem: 'Using NCERT Table 8.4 (Trends in Output Growth), compute the percentage point change in industrial growth rate from 1980–90 to 2014–18 for.',
            steps: [
            { text: 'Extract industrial growth rates from Table 8.4: India (7.4, 6.9), China (10.8, 5.3), Pakistan (7.7, 4.8).' },
            { text: 'Calculate change: India = 6.9 - 7.4 = -0.5 pp; China = 5.3 - 10.8 = -5.5 pp; Pakistan = 4.8 - 7.7 = -2.9 pp.' },
            { text: 'Note China\'s absolute decline is largest (-5.5 pp) but its 2014–18 rate (5.3%) still exceeds India\'s (6.9%?' },
            { text: 'Interpret: China\'s early high growth (10.8% in 1980s) built a massive manufacturing base (38% GVA).' },
            { text: 'Connect to NCERT text: "China\'s growth is contributed by the manufacturing and service sectors" and "China has used the.', faded: true, blankAnswer: 'India: -0.5 pp; China: -5.5 pp; Pakistan: -2.9 pp. China\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_01_009', title: 'The Drain of Wealth theory, propounded.',
          scaffold: { problem: 'In 1900, India\'s merchandise exports were £180 million, imports £100 million.',
            steps: [
            { text: 'Identify all visible and invisible items from the problem statement.' },
            { text: 'Compute merchandise trade balance = X - M = 180 - 100 = £80 million (surplus).' },
            { text: 'Compute total invisible debits = 20+15+10+8+12 = £65 million. Net invisible balance = IC - Total Invisible Debits = 5 -.' },
            { text: 'Current account balance = Merchandise balance + Net invisible balance = 80 + (-60) = +£20 million.' },
            { text: 'Drain as % of NI = (60 / 500) × 100 = 12%. This exceeds Naoroji\'s 6-8% because by 1900, railway guarantees and debt.', faded: true, blankAnswer: '(a) £80 million surplus, (b) -£60 million, (c) +£20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_003', title: 'Demographic indicators are quantitative.',
          scaffold: { problem: 'Using Table 8.1 data, compute the approximate crude birth rate (CBR) for India if the crude death rate (CDR) is 7 per 1,000 and net.',
            steps: [
            { text: 'Identify given data: Growth rate = 0.81% per year, CDR = 7 per 1,000, NMR ≈ 0, Population = 1,428 million = 1,428,000.' },
            { text: 'Recall formula: Growth rate (%) = (CBR - CDR + NMR) / 10. Rearrange: CBR = (Growth rate × 10) + CDR - NMR.' },
            { text: 'Substitute values: CBR = (0.81 × 10) + 7 - 0 = 8.1 + 7 = 15.1 per 1,000.' },
            { text: 'Calculate annual live births: Births = CBR × Population (in thousands) = 15.1 × 1,428,000 = 21,562,800 ≈ 21.6 million.' },
            { text: 'Interpret economically: Despite below-replacement fertility (TFR 2.0), India adds ~21.6 million people annually due to.', faded: true, blankAnswer: 'CBR ≈ 15.1 per 1,000; Annual live births ≈ 21.6 million.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_08_004', title: 'Demographic transition is the.',
          scaffold: { problem: 'Using Table 8.1 data, compute the approximate number of females per 1000 males for India, China, and Pakistan.',
            steps: [
            { text: 'Extract sex ratios from Table 8.1: India 930, China 898, Pakistan 948 (females per 1000 males).' },
            { text: 'Compute deficit from biological norm (952): India deficit = 952 - 930 = 22; China deficit = 952 - 898 = 54; Pakistan.' },
            { text: 'Apply to female population: India female pop ≈ 1428m × (930/1930) ≈ 688m; missing women ≈ 688m × (22/930) ≈ 16.3.' },
            { text: 'Interpret: China\'s massive deficit reflects decades of sex-selective abortion under one-child policy; India\'s deficit.' },
            { text: 'Economic implications: Skewed sex ratios lead to marriage squeeze, trafficking, surplus male labour, and reduced female.', faded: true, blankAnswer: 'India: ~16.3 million missing women; China: ~40.1 million;.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_eco_cbse_08_007', title: 'Identify each idea',
          dissect: { specimen: 'Comparative Development', spots: [
            { id: 's1', label: 'Comparative development analysis is the', prompt: 'Which idea is this? — Comparative development analysis is the systematic examination of economic and human.', answer: 'Comparative development analysis is the', options: ['Comparative development analysis is the', 'The Human Development Index HDI', 'Lessons from Chinese and Pakistani', 'The Drain of Wealth theory'] },
            { id: 's2', label: 'The Human Development Index HDI', prompt: 'Which idea is this? — The Human Development Index (HDI) is a composite statistic of life expectancy, education.', answer: 'The Human Development Index HDI', options: ['The Human Development Index HDI', 'Comparative development analysis is the', 'Lessons from Chinese and Pakistani', 'The Drain of Wealth theory'] },
            { id: 's3', label: 'Lessons from Chinese and Pakistani', prompt: 'Which idea is this? — Lessons from Chinese and Pakistani reforms for India refer to the comparative policy.', answer: 'Lessons from Chinese and Pakistani', options: ['Lessons from Chinese and Pakistani', 'Comparative development analysis is the', 'The Human Development Index HDI', 'The Drain of Wealth theory'] },
            { id: 's4', label: 'The Drain of Wealth theory', prompt: 'Which idea is this? — The Drain of Wealth theory, propounded by Dadabhai Naoroji in his 1867 work *Poverty and.', answer: 'The Drain of Wealth theory', options: ['The Drain of Wealth theory', 'Comparative development analysis is the', 'The Human Development Index HDI', 'Lessons from Chinese and Pakistani'] },
            { id: 's5', label: 'Demographic indicators are quantitative measures', prompt: 'Which idea is this? — Demographic indicators are quantitative measures that describe the size, structure,.', answer: 'Demographic indicators are quantitative measures', options: ['Demographic indicators are quantitative measures', 'Comparative development analysis is the', 'The Human Development Index HDI', 'Lessons from Chinese and Pakistani'] },
            { id: 's6', label: 'Demographic transition is the historical', prompt: 'Which idea is this? — Demographic transition is the historical shift from high birth and death rates to low.', answer: 'Demographic transition is the historical', options: ['Demographic transition is the historical', 'Comparative development analysis is the', 'The Human Development Index HDI', 'Lessons from Chinese and Pakistani'] }
          ] } }
    ],
    explore: { component: C11_EconomicsComparativeDevelopmentSim, prompt: 'Explore the interactive — Comparative Development' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_001', difficulty: 'standard',
          question: 'Comparative development analysis is the systematic examination of economic and.',
          hint: 'Revisit Class 10 Development chapter (HDI, per capita income limitations) and Class 9.',
          misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s.',
          parts: [
                { id: 'a', prompt: 'What were the starting years of planned development for India, Pakistan, and China, and what common planning instrument did all three adopt?', answer: 'India (1951), Pakistan (1956), China (1953)',
                  options: ['India (1951), Pakistan (1956), China (1953)', 'China\'s higher GDP growth (Table 8'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s pre-1978.' },
                { id: 'b', prompt: 'Using Table 8.1, calculate how many years it would take for Pakistan\'s population to double at its 2021-23 annual growth rate of 1.96%, and compare with.', answer: 'Pakistan doubling time = 70/1.96 ≈ 35.7 years (Rule of 70)',
                  options: ['Pakistan doubling time = 70/1.96 ≈ 35.7 years (Rule of 70)', 'China\'s higher GDP growth (Table 8'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s pre-1978.' },
                { id: 'c', prompt: 'Table 8.3 shows China\'s industry sector employs 32% of workforce but contributes 38% to GVA, while India\'s industry employs 26% but contributes 28%.', answer: 'China industry productivity ratio = 38/32 = 1.1875',
                  options: ['China industry productivity ratio = 38/32 = 1.1875', 'China\'s higher GDP growth (Table 8'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe China\'s higher GDP growth (Table 8.2) is solely due to post-1978 market reforms, ignoring that China\'s pre-1978.' }
          ],
            remediations: { 'china-s-higher-gdp-growth': { steps: ['Re-read Table 8.5 footnote — China\'s poverty 0.0% (2023) vs India/Pakistan 21.9%.', 'Trace this to pre-1978 commune system (equitable food distribution) and rural health network (barefoot doctors).', 'Compare with India\'s pre-1991 license raj (growth 3.5% "Hindu rate") and Pakistan\'s dependence on remittances/volatile.', 'Practice writing: "China\'s growth *accelerated* post-1978, but its human development *foundation* was pre-1978." Use.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_007', difficulty: 'standard',
          question: 'The Human Development Index (HDI) is a composite statistic of life expectancy,.',
          hint: 'Review Class 10 Maths statistics (c10_math_cbse_13_001) for mean calculation methods, and.',
          misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate Health Index for India, China, and Pakistan using the HDI formula: Health Index = (LE - 20) / (85 - 20), where LE is life expectancy.', answer: 'Health Index = (LE - 20) / 65',
                  options: ['Health Index = (LE - 20) / 65', 'HDI ranking directly reflects current government policy effectiveness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.' }
          ],
            remediations: { 'hdi-ranking-directly-reflects-current': { steps: ['Re-read the textbook\'s Section 8.6 "Development Strategies — An Appraisal" paragraph on China: "Before the introduction.', 'Create a two-column table: "Pre-1978 Investments" (barefoot doctors, commune schools, land reform) vs "Post-1978.', 'Map each HDI component in Table 8.5 to the column that primarily drove it - life expectancy and schooling map to.', 'Practice explaining why Pakistan\'s post-1988 reforms failed to improve HDI despite similar policy shifts - answer: lack.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "China\'s one-child policy was the primary driver of its superior HDI performance compared to India and Pakistan." Use evidence from Table.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'HDI ranking directly reflects current government policy effectiveness'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe HDI ranking directly reflects current government policy effectiveness.' }
          ],
            remediations: { 'hdi-ranking-directly-reflects-current': { steps: ['Re-read the textbook\'s Section 8.6 "Development Strategies — An Appraisal" paragraph on China: "Before the introduction.', 'Create a two-column table: "Pre-1978 Investments" (barefoot doctors, commune schools, land reform) vs "Post-1978.', 'Map each HDI component in Table 8.5 to the column that primarily drove it - life expectancy and schooling map to.', 'Practice explaining why Pakistan\'s post-1988 reforms failed to improve HDI despite similar policy shifts - answer: lack.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_011', difficulty: 'standard',
          question: 'Lessons from Chinese and Pakistani reforms for India refer to the comparative.',
          hint: 'If stuck, revisit c11_eco_cbse_08_009 (China\'s reforms) and c11_eco_cbse_08_010.',
          misconception: 'Students believe India\'s 1991 reforms *failed* because China grew faster, ignoring that India\'s reforms were.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Lessons from Chinese and Pakistani reforms for India refer to the comparative policy',
                  options: ['Lessons from Chinese and Pakistani reforms for India refer to the comparative policy', 'Comparative development analysis is the systematic examination of economic and human', 'The Human Development Index (HDI) is a composite statistic of life expectancy, education', 'The Drain of Wealth theory, propounded by Dadabhai Naoroji in his 1867 work *Poverty and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe India\'s 1991 reforms *failed* because China grew faster, ignoring that India\'s reforms were crisis-forced (BoP crisis),.' }
          ],
            remediations: { 'india-s-1991-reforms-failed': { steps: ['Re-read NCERT Section 8.6 "DEVELOPMENT STRATEGIES — AN APPRAISAL" focusing on the *comparative* paragraphs for China,.', 'Create a 3-column table: Reform Trigger (voluntary/crisis), Pre-reform Foundation (health/education/land), Sequencing.', 'For each country, write one sentence explaining *why* the outcome followed from the trigger+foundation+sequencing.', 'Attempt Diagnostic Questions 4 and 5 again using this table.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_01_009', difficulty: 'standard',
          question: 'The Drain of Wealth theory, propounded by Dadabhai Naoroji in his 1867 work.',
          hint: 'Revisit c11_eco_cbse_01_008 (Foreign Trade) to see how export surplus was generated, and.',
          misconception: 'Students believe the Drain of Wealth was simply "Britain stealing gold from India" — a literal bullion drain.',
          parts: [
                { id: 'a', prompt: 'Using Naoroji\'s 1880 estimate that India\'s annual drain was £30-40 million against a national income of approximately £500 million, calculate the drain as a.', answer: 'Step 1: Naoroji\'s range: £30m/£500m = 6%',
                  options: ['Step 1: Naoroji\'s range: £30m/£500m = 6%', 'Britain stealing gold from India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Drain of Wealth was simply "Britain stealing gold from India" — a literal bullion drain.' }
          ],
            remediations: { 'the-drain-of-wealth-was': { steps: ['If the student conflates drain with literal gold outflow: (1) Have them trace a single transaction: Indian peasant pays.', 'No gold moves; real goods (grain, cotton) move from India to Britain.', '(2) Use the identity: Export Surplus = Net Invisible Debits + Capital Inflow.', 'Show historical data (1900): Export Surplus £80m, Invisible Debits £65m, Capital Inflow £15m.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_003', difficulty: 'standard',
          question: 'Demographic indicators are quantitative measures that describe the size,.',
          hint: 'If stuck, review c8_eco_ch2_6 (Birth Rate and Death Rate) for rate definitions and.',
          misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0.',
          parts: [
                { id: 'a', prompt: 'Using Table 8.1 data, explain why China\'s population density (150 persons/sq.km) is lower than India\'s (473 persons/sq.km) even though their total populations.', answer: 'Density = Population / Land Area',
                  options: ['Density = Population / Land Area', 'China\'s one-child policy', 'India\'s population problem is solved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0 means zero.' },
                { id: 'b', prompt: 'Compare the sex ratios of the three countries (India 930, China 898, Pakistan 948 females per 1,000 males).', answer: 'All three ratios below 1,000 indicate son preference',
                  options: ['All three ratios below 1,000 indicate son preference', 'poverty', 'illiteracy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0 means zero.' }
          ],
            remediations: { 'students-often-treat-population-growth': { steps: ['Revisit Class 8 node c8_eco_ch2_6 (Birth Rate and Death Rate) to distinguish crude rates from total fertility rate.', 'Draw a population pyramid for India (broad base) vs China (narrowing base) using age-group data from Class 8.', 'Calculate "population momentum" by applying current age-specific fertility rates to the actual age distribution — this.', 'Practice with the formula: Growth rate = (CBR – CDR)/10 + NMR/10, using CBR derived from age-specific rates × age.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Pakistan\'s high urbanisation rate (38%) compared to India (36%) indicates better economic development." Use Table 8.1 and Table 8.3.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'India\'s population problem is solved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0 means zero.' },
                { id: 'b', prompt: 'Construct a demographic profile for a hypothetical fourth country "Neighbourland" that would lie between India and China on all six Table 8.1 indicators.', answer: 'Profile: Population 1,000 million (between 240 and 1,411)',
                  options: ['Profile: Population 1,000 million (between 240 and 1,411)', 'India\'s population problem is solved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0 means zero.' },
                { id: 'c', prompt: 'Compare the sex ratios of the three countries (India 930, China 898, Pakistan 948 females per 1,000 males).', answer: 'All three ratios below 1,000 indicate son preference',
                  options: ['All three ratios below 1,000 indicate son preference', 'poverty', 'illiteracy', 'India\'s population problem is solved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "population growth rate" and "fertility rate" as interchangeable, thinking a fertility rate of 2.0 means zero.' }
          ],
            remediations: { 'students-often-treat-population-growth': { steps: ['Revisit Class 8 node c8_eco_ch2_6 (Birth Rate and Death Rate) to distinguish crude rates from total fertility rate.', 'Draw a population pyramid for India (broad base) vs China (narrowing base) using age-group data from Class 8.', 'Calculate "population momentum" by applying current age-specific fertility rates to the actual age distribution — this.', 'Practice with the formula: Growth rate = (CBR – CDR)/10 + NMR/10, using CBR derived from age-specific rates × age.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_004', difficulty: 'standard',
          question: 'Demographic transition is the historical shift from high birth and death rates.',
          hint: 'Review Class 8 Economics Chapter 2 (Dynamics of Population) nodes c8_eco_ch2_6 and.',
          misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off.".',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate annual population increase in millions for India and Pakistan using 2021-23 data: India population 1428 million, growth 0.81%;.', answer: 'Step 1: India increase = 1428 × 0.0081 = 11.57 million',
                  options: ['Step 1: India increase = 1428 × 0.0081 = 11.57 million', 'developed', 'better off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off." They confuse the.' }
          ],
            remediations: { 'a-declining-population-growth-rate': { steps: ['Revisit the demographic transition model diagram (Class 8, c8_eco_ch2_8) and label each country\'s approximate position.', 'Calculate old-age dependency ratio proxies: for China, note fertility 1.2 implies fewer future workers per retiree; for.', 'Read NCERT paragraph on "one-child norm implications" (page 139) and list three economic costs of rapid aging.', 'Practice interpreting population pyramids for each stage using c8_math_ch12_12 (line plots) to visualise age structure.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_08_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Pakistan\'s high fertility rate (3.4) and low urbanisation (38%) indicate it is in Stage 2 of demographic transition, so it will.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'developed', 'better off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a declining population growth rate automatically means a country is "developed" or "better off." They confuse the.' }
          ],
            remediations: { 'a-declining-population-growth-rate': { steps: ['Revisit the demographic transition model diagram (Class 8, c8_eco_ch2_8) and label each country\'s approximate position.', 'Calculate old-age dependency ratio proxies: for China, note fertility 1.2 implies fewer future workers per retiree; for.', 'Read NCERT paragraph on "one-child norm implications" (page 139) and list three economic costs of rapid aging.', 'Practice interpreting population pyramids for each stage using c8_math_ch12_12 (line plots) to visualise age structure.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
