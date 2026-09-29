import type { SimDef } from '../../engine/types';
import C11_EconomicsEmploymentInformalisationSim from '../../../simulations/c6_12/C11_EconomicsEmploymentInformalisationSim';

/** v3 wrapped master — C11_EconomicsEmploymentInformalisationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicsemploymentinformalisationsim: SimDef = {
    id: 'v3w_c11_economicsemploymentinformalisationsim',
    title: 'Economically Active Population: Labour Force and Workforce',
    subtitle: 'Covers: definitions of economic activity/worker/workforce/unemployed, worker-population.',
    classLevel: 11, subject: 'economics', topic: 'Economically Active Population: Labour Force and Workforce',
    chapters: [],
    nodeIds: ['c11_eco_cbse_06_002', 'c11_eco_cbse_06_004', 'c11_eco_cbse_06_005', 'c11_eco_cbse_06_009', 'c11_eco_cbse_06_001', 'c11_eco_cbse_06_003', 'c11_eco_cbse_06_006', 'c11_eco_cbse_06_007', 'c11_eco_cbse_06_008', 'c11_eco_cbse_06_010', 'c11_eco_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing at a busy Delhi Metro station at 8 AM: you see office-goers with ID cards, a street.', goal: 'Master Economically Active Population: Labour Force and Workforce.' },
    discovery: {
        question: 'Analyse the trend in Table 6.3: Share of casual wage labourers rose from 23.2% (1972–73) to 31.8% (1993–94) then fell to 19.9% (2023–24), while regular.',
        options: ['Phase 1 (1972–1994): **Casualisation**', 'growth', 'Labour Force = Workforce'],
        answer: 'Phase 1 (1972–1994): **Casualisation**',
        hook: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.',
    },
    teaching: [
        { title: 'The **Economically Active Population**.', text: 'The **Economically Active Population** (Labour Force) comprises all persons who are either **working** (workforce) or **seeking/available for work** (unemployed) during a specified reference period.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_002', title: 'The **Economically Active Population**.',
          scaffold: { problem: 'In a village of 5,000 residents, 1,800 are employed in farming, 200 run small shops, 150 work as casual construction labourers, 50 are.',
            steps: [
            { text: 'Identify economic activities — farming, shop-keeping, casual construction are economic activities (produce.' },
            { text: 'Identify unemployed seeking work — 50 registered at exchange = unemployed.' },
            { text: 'Labour Force = Workforce + Unemployed = 2,150 + 50 = 2,200.' },
            { text: 'WPR = (Workforce ÷ Total Population) × 100 = (2,150 ÷ 5,000) × 100 = 43%.' },
            { text: 'Unemployment Rate = (Unemployed ÷ Labour Force) × 100 = (50 ÷ 2,200) × 100 = 2.27%.' },
            { text: 'Verify: Not in labour force = students (300) + retired (400) + homemakers (5,000 - 2,150 - 50 - 300 - 400 = 1,100) =.', faded: true, blankAnswer: '(a) Workforce = 2,150 persons; (b) Labour Force = 2,200.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_004', title: 'Growth of employment refers to the rate.',
          scaffold: { problem: 'Using Table 6.3 data, calculate the compound annual growth rate (CAGR) of tertiary sector employment between 1993–94 and 2011–12.',
            steps: [
            { text: 'Identify the concept — need absolute tertiary employment in both years, then CAGR formula.' },
            { text: 'Calculate absolute tertiary workers: 1993–94 = 20% × 340M = 68M; 2011–12 = 26.8% × 470M = 125.96M.' },
            { text: 'Apply CAGR formula: (End/Start)^(1/n) – 1. Here n = 2011–12 – 1993–94 = 18 years (approx). Ratio = 125.96 / 68 = 1.8524.' },
            { text: 'Compute 1.8524^(1/18) = 1.0347 → CAGR = 3.47% per annum.' },
            { text: 'Interpret — tertiary employment grew at 3.47% p.a., faster than overall employment (~1.5–2%), confirming services as.', faded: true, blankAnswer: '3.47% per annum (tertiary sector employment CAGR, 1993–94.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_005', title: 'The formal sector comprises all public.',
          scaffold: { problem: 'According to PLFS 2022–23, India\'s workforce is 545 million. Rural workforce constitutes two-thirds. Male workers are 77% of total.',
            steps: [
            { text: 'Total workforce = 545 million. Rural = 2/3 × 545 = 363.33 million. Urban = 545 - 363.33 = 181.67 million.' },
            { text: 'Male workers = 77% of 545 = 419.65 million. Female workers = 545 - 419.65 = 125.35 million.' },
            { text: 'Rural female workers = 34.8% of rural population? Wait — worker-population ratio (WPR) is given, not share.' },
            { text: 'Rural female as % of total female = (90.83 / 127.16) × 100 = 71.4%.' },
            { text: 'Interpretation: 71% of female workers are in rural areas, consistent with high rural female WPR (34.8% vs urban 20.7%).', faded: true, blankAnswer: '(a) Rural: 363.33 million, Urban: 181.67 million; (b) Male:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_009', title: 'The formal sector comprises all public.',
          scaffold: { problem: 'According to PLFS 2019-20, India\'s total workforce was 535 million, with 59 million in the formal sector.',
            steps: [
            { text: 'Identify given data: 2011-12: Total=476M, Formal=30M; 2019-20: Total=535M, Formal=59M. Period = 8 years.' },
            { text: 'Calculate absolute changes: Total employment change = 535-476 = 59M. Formal employment change = 59-30 = 29M.' },
            { text: 'Calculate annualised growth rates using compound annual growth rate (CAGR) formula: g = (End/Start)^(1/n) - 1.' },
            { text: 'Calculate informal sector employment each year: 2011-12 informal = 476-30 = 446M. 2019-20 informal = 535-59 = 476M.' },
            { text: 'Interpret: Formal sector grew faster (8.9%) than total (1.48%), but from a very small base.', faded: true, blankAnswer: 'Total employment CAGR: 1.48% per year; Formal sector CAGR:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_001', title: 'Economic activities are all human.',
          scaffold: { problem: 'According to PLFS 2023-24, India\'s rural male worker-population ratio is 56.3% and rural female WPR is 34.8%.',
            steps: [
            { text: 'Identify given data — Rural Male WPR = 56.3%, Rural Female WPR = 34.8%; Rural male population = 2,50,000; Rural female.' },
            { text: 'Recall formula — Number of workers = (WPR ÷ 100) × Population for each subgroup.' },
            { text: 'Calculate male workers = (56.3 ÷ 100) × 2,50,000 = 0.563 × 2,50,000 = 1,40,750.' },
            { text: 'Calculate female workers = (34.8 ÷ 100) × 2,30,000 = 0.348 × 2,30,000 = 80,040.' },
            { text: 'Total rural workers = 1,40,750 + 80,040 = 2,20,790. Total rural population = 2,50,000 + 2,30,000 = 4,80,000.' },
            { text: 'District overall rural WPR = (2,20,790 ÷ 4,80,000) × 100 = 45.998% ≈ 46.0%.' },
            { text: 'Interpret — District WPR (46.0%) is slightly higher than all-India rural average (45.6%, Table 6.1), suggesting.', faded: true, blankAnswer: 'Male workers = 1,40,750; Female workers = 80,040; Overall.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_003', title: 'Sectoral distribution of workforce.',
          scaffold: { problem: 'According to PLFS 2023–24, India\'s rural workforce is 365 million and urban workforce is 180 million.',
            steps: [
            { text: 'Identify given data: Rural workforce = 365M, Urban workforce = 180M.' },
            { text: 'Calculate rural sector workers: Primary = 365M × 0.644 = 235.06M; Secondary = 365M × 0.214 = 78.11M; Tertiary = 365M ×.' },
            { text: 'Calculate urban sector workers: Primary = 180M × 0.067 = 12.06M; Secondary = 180M × 0.324 = 58.32M; Tertiary = 180M ×.' },
            { text: 'Sum for national totals: Primary = 235.06 + 12.06 = 247.12M; Secondary = 78.11 + 58.32 = 136.43M; Tertiary = 68.62 +.' },
            { text: 'Total workforce = 365 + 180 = 545M (matches text). Verify sum: 247.12 + 136.43 + 178.24 = 561.79M (rounding difference.' },
            { text: 'Compute national shares: Primary = (247.12/545)×100 = 45.3%; Secondary = (136.43/545)×100 = 25.0%; Tertiary =.', faded: true, blankAnswer: 'National workers: Primary ~247M, Secondary ~136M, Tertiary.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_eco_cbse_06_004', title: 'Identify each idea',
          dissect: { specimen: 'Economically Active Population: Labour Force and Workforce', spots: [
            { id: 's1', label: 'The Economically Active Population Labour', prompt: 'Which idea is this? — The **Economically Active Population** (Labour Force) comprises all persons who are.', answer: 'The Economically Active Population Labour', options: ['The Economically Active Population Labour', 'Growth of employment refers to', 'The formal sector comprises all', 'Economic activities are all human'] },
            { id: 's2', label: 'Growth of employment refers to', prompt: 'Which idea is this? — Growth of employment refers to the rate of change in the total number of workers engaged.', answer: 'Growth of employment refers to', options: ['Growth of employment refers to', 'The Economically Active Population Labour', 'The formal sector comprises all', 'Economic activities are all human'] },
            { id: 's3', label: 'The formal sector comprises all', prompt: 'Which idea is this? — The formal sector comprises all public sector establishments and private sector.', answer: 'The formal sector comprises all', options: ['The formal sector comprises all', 'The Economically Active Population Labour', 'Growth of employment refers to', 'Economic activities are all human'] },
            { id: 's4', label: 'Economic activities are all human', prompt: 'Which idea is this? — Economic activities are all human endeavours that contribute to the gross national.', answer: 'Economic activities are all human', options: ['Economic activities are all human', 'The Economically Active Population Labour', 'Growth of employment refers to', 'The formal sector comprises all'] },
            { id: 's5', label: 'Sectoral distribution of workforce refers', prompt: 'Which idea is this? — Sectoral distribution of workforce refers to the percentage distribution of a country\'s.', answer: 'Sectoral distribution of workforce refers', options: ['Sectoral distribution of workforce refers', 'The Economically Active Population Labour', 'Growth of employment refers to', 'The formal sector comprises all'] }
          ] } }
    ],
    explore: { component: C11_EconomicsEmploymentInformalisationSim, prompt: 'Explore the interactive — Economically Active Population: Labour Force and Workforce' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_002', difficulty: 'standard',
          question: 'The **Economically Active Population** (Labour Force) comprises all persons who.',
          hint: 'Revisit node c11_eco_cbse_06_001 "Workers and Employment: Key Definitions and Concepts".',
          misconception: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'Analyse the trend in Table 6.3: Share of casual wage labourers rose from 23.2% (1972–73) to 31.8% (1993–94) then fell to 19.9% (2023–24), while regular.', answer: 'Phase 1 (1972–1994): **Casualisation**',
                  options: ['Phase 1 (1972–1994): **Casualisation**', 'growth', 'Labour Force = Workforce'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.' }
          ],
            remediations: { 'labour-force-workforce-and-use': { steps: ['Draw a Venn diagram — outer circle = Population; inner circle = Labour Force (Working + Seeking); core = Workforce.', 'Take a concrete dataset: Population = 1000, Workforce = 400, Unemployed seeking = 50.', 'Practice classifying 10 individuals (e.g., student, retired, job-seeker, housewife, farmer) into the three circles.', 'Re-read NCERT §6.2 "Those activities which contribute to GNP...'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Informalisation of the workforce is inevitable during early stages of economic development and should not be a policy concern." Use.', answer: 'The statement is **flawed**',
                  options: ['The statement is **flawed**', 'Labour Force = Workforce', '**"Labour Force = Workforce"** and use the terms interchangeably'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.' },
                { id: 'b', prompt: 'Analyse the trend in Table 6.3: Share of casual wage labourers rose from 23.2% (1972–73) to 31.8% (1993–94) then fell to 19.9% (2023–24), while regular.', answer: 'Phase 1 (1972–1994): **Casualisation**',
                  options: ['Phase 1 (1972–1994): **Casualisation**', 'growth', 'Labour Force = Workforce', '**"Labour Force = Workforce"** and use the terms interchangeably'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.' }
          ],
            remediations: { 'labour-force-workforce-and-use': { steps: ['Draw a Venn diagram — outer circle = Population; inner circle = Labour Force (Working + Seeking); core = Workforce.', 'Take a concrete dataset: Population = 1000, Workforce = 400, Unemployed seeking = 50.', 'Practice classifying 10 individuals (e.g., student, retired, job-seeker, housewife, farmer) into the three circles.', 'Re-read NCERT §6.2 "Those activities which contribute to GNP...'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_004', difficulty: 'standard',
          question: 'Growth of employment refers to the rate of change in the total number of.',
          hint: 'Revisit c11_eco_cbse_06_003 (sectoral distribution) and c11_eco_cbse_06_002.',
          misconception: 'Students believe "sectoral shift from primary to tertiary means agriculture jobs disappeared." In reality, Table 6.3.',
          parts: [
                { id: 'a', prompt: 'Calculate the employment elasticity for the tertiary sector between 1993–94 and 2011–12 using Table 6.3 data. Tertiary share: 20% → 26.8%.', answer: 'Step 1: Tertiary workforce 1993–94 = 20% × 340 = 68 million',
                  options: ['Step 1: Tertiary workforce 1993–94 = 20% × 340 = 68 million', 'sectoral shift from primary to tertiary means agriculture jobs disappeared', '"sectoral shift from primary to tertiary means agriculture jobs disappeared'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "sectoral shift from primary to tertiary means agriculture jobs disappeared." In reality, Table 6.3 shows primary sector.' }
          ],
            remediations: { 'sectoral-shift-from-primary-to': { steps: ['Re-read Table 6.3 *vertically* (down a column) for absolute workforce size context — use Exercise Q11 (1972–73 rural.', 'Calculate primary sector absolute workers: 1972 = 74.3% of ~195M = 145M; 2023 = 46.1% of ~545M = 251M.', 'Plot this on graph paper — X-axis: Year, Y-axis: Absolute workers (primary vs. non-primary).', 'Discuss: "If agriculture employs more people, why is its share falling?" → Denominator (total workforce) grew faster.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "sectoral shift from primary to tertiary means agriculture jobs disappeared." In reality, Table 6.3.',
          parts: [
                { id: 'a', prompt: 'Construct a 3-panel infographic storyboard for a Class 11 exhibition titled "India\'s Employment Journey 1972–2024." Panel 1: Sectoral shift.', answer: 'Panel 1 (Sectoral): Data',
                  options: ['Panel 1 (Sectoral): Data', 'sectoral shift from primary to tertiary means agriculture jobs disappeared', '"sectoral shift from primary to tertiary means agriculture jobs disappeared'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "sectoral shift from primary to tertiary means agriculture jobs disappeared." In reality, Table 6.3 shows primary sector.' }
          ],
            remediations: { 'sectoral-shift-from-primary-to': { steps: ['Re-read Table 6.3 *vertically* (down a column) for absolute workforce size context — use Exercise Q11 (1972–73 rural.', 'Calculate primary sector absolute workers: 1972 = 74.3% of ~195M = 145M; 2023 = 46.1% of ~545M = 251M.', 'Plot this on graph paper — X-axis: Year, Y-axis: Absolute workers (primary vs. non-primary).', 'Discuss: "If agriculture employs more people, why is its share falling?" → Denominator (total workforce) grew faster.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_005', difficulty: 'standard',
          question: 'The formal sector comprises all public sector establishments and private sector.',
          hint: 'Revisit c11_eco_cbse_06_001 (worker definitions) and c11_eco_cbse_06_004 (status-wise.',
          misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector.',
          parts: [
                { id: 'a', prompt: 'Define the formal sector as per the NCERT classification used in Indian employment statistics. State the exact hired-worker threshold and ownership condition.', answer: 'The formal sector includes all public sector establishments and private sector',
                  options: ['The formal sector includes all public sector establishments and private sector', '20 workers', 'only government jobs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector includes legally.' },
                { id: 'b', prompt: 'Explain why a self-employed street vendor selling vegetables is classified as an informal sector worker even though they work regularly every day.', answer: 'The vendor operates an own-account enterprise with zero hired workers',
                  options: ['The vendor operates an own-account enterprise with zero hired workers', 'because they don\'t pay taxes', 'informal sector = unorganised sector = illegal/unregistered businesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector includes legally.' },
                { id: 'c', prompt: 'In 2019–20, India\'s total workforce was 535 million, with 59 million in the formal sector. Calculate the informal sector workforce percentage.', answer: 'Step 1: Informal workers = 535 – 59 = 476 million',
                  options: ['Step 1: Informal workers = 535 – 59 = 476 million', 'informal sector = unorganised sector = illegal/unregistered businesses', 'crack down on illegality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector includes legally.' }
          ],
            remediations: { 'informal-sector-unorganised-sector-illegal': { steps: ['Re-read Box 6.1 and the definition paragraph in Section 6.7. Highlight the two criteria: (a) public sector OR private.', 'Take 5 local enterprises (kirana shop, govt school, construction site, freelance coder, factory with 15 workers).', 'Plot a 2×2 matrix: rows = enterprise type (public/private), columns = hired workers (<10, ≥10). Place each example.', 'Verify with teacher that "registered but <10 workers" falls in informal sector.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Casualisation of workforce is acceptable if it raises workers\' earnings, as argued by some economists." Use the Ahmedabad textile mill.', answer: 'The statement ignores non-wage dimensions of employment quality',
                  options: ['The statement ignores non-wage dimensions of employment quality', 'informal sector = unorganised sector = illegal/unregistered businesses', 'crack down on illegality', 'extend social security to small enterprises'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector includes legally.' }
          ],
            remediations: { 'informal-sector-unorganised-sector-illegal': { steps: ['Re-read Box 6.1 and the definition paragraph in Section 6.7. Highlight the two criteria: (a) public sector OR private.', 'Take 5 local enterprises (kirana shop, govt school, construction site, freelance coder, factory with 15 workers).', 'Plot a 2×2 matrix: rows = enterprise type (public/private), columns = hired workers (<10, ≥10). Place each example.', 'Verify with teacher that "registered but <10 workers" falls in informal sector.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_009', difficulty: 'standard',
          question: 'The formal sector comprises all public sector establishments and private sector.',
          hint: 'Revisit c11_eco_cbse_06_004 (Worker status categories) and c11_eco_cbse_06_001 (Who is a.',
          misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers.',
          parts: [
                { id: 'a', prompt: 'Define the formal sector as per the NCERT classification used in Indian employment statistics. State the two main criteria.', answer: 'The formal sector includes all public sector establishments and private sector',
                  options: ['The formal sector includes all public sector establishments and private sector', 'registered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers are informal while.' },
                { id: 'b', prompt: 'Explain why a self-employed software consultant working from home with no hired workers is classified as informal sector, while a peon in a government office.', answer: 'Classification depends on enterprise characteristics, not individual earnings',
                  options: ['Classification depends on enterprise characteristics, not individual earnings', 'formal', 'high-paying'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers are informal while.' },
                { id: 'c', prompt: 'In 2019-20, India had 535 million total workers and 59 million formal sector workers. Calculate the percentage of workers in the informal sector.', answer: 'Step 1: Informal workers 2019-20 = 535 - 59 = 476 million',
                  options: ['Step 1: Informal workers 2019-20 = 535 - 59 = 476 million', 'jobless growth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers are informal while.' }
          ],
            remediations: { 'students-often-equate-informal-sector': { steps: ['If a student misclassifies workers, have them create a 2×2 matrix: rows = ownership (public/private), columns = hired.', 'Place each worker in the matrix.', 'Public sector always formal.', 'Private sector formal only if ≥10 hired workers.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_001', difficulty: 'standard',
          question: 'Economic activities are all human endeavours that contribute to the gross.',
          hint: 'Revisit c9_eco_ch1_7 (Factors of Production: Labour) and c10_eco_cbse_02_005 (Problems of.',
          misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker =.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND LEVEL:** Explain why the worker-population ratio for rural women (34.8%) is higher than for urban women (20.7%) in 2023-24 (Table 6.1), despite.', answer: '**Correct Answer:** Rural women participate more',
                  options: ['**Correct Answer:** Rural women participate more', 'self-employed = entrepreneur with capital and employees', 'casual worker = only construction/agricultural labour'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker = only.' }
          ],
            remediations: { 'specific-error-students-believe-self': { steps: ['**Step-by-Step Remediation:** 1.', '**Re-read NCERT Section 6.4** with a highlighter: mark every example given (cement shop owner, construction worker,.', '**Create a 2×2 matrix** on paper: Rows = Control over enterprise (High/Low), Columns = Regularity of income.', 'Place: cement owner (High, Irregular), civil engineer (Low, Regular), construction worker (Low, Irregular), beedi.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker =.',
          parts: [
                { id: 'a', prompt: '**CREATE LEVEL:** Design a 5-question survey module to identify whether a respondent qualifies as a \'worker\' per NCERT definition.', answer: '**Expected Criteria for Good Answer:** 1',
                  options: ['**Expected Criteria for Good Answer:** 1', 'Were you available for work but did not find any?', 'family gain', 'self-employed = entrepreneur with capital and employees'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker = only.' }
          ],
            remediations: { 'specific-error-students-believe-self': { steps: ['**Step-by-Step Remediation:** 1.', '**Re-read NCERT Section 6.4** with a highlighter: mark every example given (cement shop owner, construction worker,.', '**Create a 2×2 matrix** on paper: Rows = Control over enterprise (High/Low), Columns = Regularity of income.', 'Place: cement owner (High, Irregular), civil engineer (Low, Regular), construction worker (Low, Irregular), beedi.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_003', difficulty: 'standard',
          question: 'Sectoral distribution of workforce refers to the percentage distribution of a.',
          hint: 'Revise Class 10 Chapter 2 (Sectors of the Indian Economy) exercises on sector.',
          misconception: 'Students often equate "sectoral shift in workforce" with "sectoral shift in GDP" and assume a rising tertiary share.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sectoral distribution of workforce refers to the percentage distribution of a country\'s',
                  options: ['Sectoral distribution of workforce refers to the percentage distribution of a country\'s', 'The **Economically Active Population** (Labour Force) comprises all persons who are', 'Growth of employment refers to the rate of change in the total number of workers engaged', 'The formal sector comprises all public sector establishments and private sector'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "sectoral shift in workforce" with "sectoral shift in GDP" and assume a rising tertiary share automatically means.' }
          ],
            remediations: { 'students-often-equate-sectoral-shift': { steps: ['Re-read Table 6.2 and Chart 6.2 side-by-side: note rural primary (64.4%) vs urban tertiary (60.9%) and connect to.', 'Calculate GDP per worker for each sector using latest Economic Survey data: Primary GDP ÷ Primary workers, etc.', 'The huge gap (primary ~1/5 of tertiary) makes the productivity lag tangible.', 'Plot Table 6.3 secondary share (1972–2024) on graph paper: the flat line post-2011 visually proves stagnation.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
