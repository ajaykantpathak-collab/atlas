import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch06_p1: SimDef = {
    id: 'v3_c11_eco_ch06_p1',
    title: 'Employment: Growth, Informalisation and Other Issues · Part 1/2',
    subtitle: 'Sort workers from seekers and ask who the statistics leave out.',
    classLevel: 11, subject: 'economics', topic: 'Employment: Growth, Informalisation and Other Issues · Part 1/2',
    chapters: ['c11_eco_ch06'],
    nodeIds: ['c11_eco_cbse_06_001', 'c11_eco_cbse_06_002', 'c11_eco_cbse_06_003', 'c11_eco_cbse_06_004', 'c11_eco_cbse_06_005', 'c11_eco_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a labour statistician classifying a busy chowk', intro: 'Vendor, clerk, daily-wage painter, unpaid homemaker — decide which of them the national accounts can see.', goal: 'Distinguish labour force from workforce and classify employment types correctly.' },
    discovery: {
        question: 'A graduate registers at an employment exchange and is still searching. Is she in the workforce?',
        options: ['No — she\'s in the labour force, which is workforce plus those seeking work', 'Yes — registering makes her a worker by definition', 'Yes — she counts toward the worker-population ratio', 'No — she is economically inactive until hired'],
        answer: 'No — she\'s in the labour force, which is workforce plus those seeking work',
        hook: 'Labour force = workforce + seekers — swap them and both the WPR and the unemployment rate come out wrong.',
    },
    teaching: [
        { title: 'Workers and Employment: Key Definitions and Concepts', text: 'Economic activities are all human endeavours that contribute to the gross national product (GNP) through the production of goods and services for which payment is made or imputed; a worker is any.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute a village\'s worker-population ratio and female casual share, then argue whether unpaid home work belongs in national income.',
        labels: ['Workers and Employment: Key', 'Economically Active Population: Labour', 'Participation in GDP: Sectoral', 'Growth of Employment: Trends', 'Informalisation of Indian Workforce', 'Informal Sector: Characteristics'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_001', title: 'Workers and Employment: Key Definitions and Concepts',
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
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_002', title: 'Economically Active Population: Labour Force and Workforce',
          scaffold: { problem: 'In a village of 5,000 residents, 1,800 are employed in farming, 200 run small shops, 150 work as casual construction labourers, 50 are.',
            steps: [
            { text: 'Identify economic activities — farming, shop-keeping, casual construction are economic activities (produce.' },
            { text: 'Identify unemployed seeking work — 50 registered at exchange = unemployed.' },
            { text: 'Labour Force = Workforce + Unemployed = 2,150 + 50 = 2,200.' },
            { text: 'WPR = (Workforce ÷ Total Population) × 100 = (2,150 ÷ 5,000) × 100 = 43%.' },
            { text: 'Unemployment Rate = (Unemployed ÷ Labour Force) × 100 = (50 ÷ 2,200) × 100 = 2.27%.' },
            { text: 'Verify: Not in labour force = students (300) + retired (400) + homemakers (5,000 - 2,150 - 50 - 300 - 400 = 1,100).', faded: true, blankAnswer: '(a) Workforce = 2,150 persons; (b) Labour Force = 2,200.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_003', title: 'Participation in GDP: Sectoral Distribution of Workforce',
          scaffold: { problem: 'According to PLFS 2023–24, India\'s rural workforce is 365 million and urban workforce is 180 million.',
            steps: [
            { text: 'Identify given data: Rural workforce = 365M, Urban workforce = 180M.' },
            { text: 'Calculate rural sector workers: Primary = 365M × 0.644 = 235.06M; Secondary = 365M × 0.214 = 78.11M; Tertiary = 365M.' },
            { text: 'Calculate urban sector workers: Primary = 180M × 0.067 = 12.06M; Secondary = 180M × 0.324 = 58.32M; Tertiary = 180M.' },
            { text: 'Sum for national totals: Primary = 235.06 + 12.06 = 247.12M; Secondary = 78.11 + 58.32 = 136.43M; Tertiary = 68.62.' },
            { text: 'Total workforce = 365 + 180 = 545M (matches text). Verify sum: 247.12 + 136.43 + 178.24 = 561.79M (rounding difference.' },
            { text: 'Compute national shares: Primary = (247.12/545)×100 = 45.3%; Secondary = (136.43/545)×100 = 25.0%; Tertiary.', faded: true, blankAnswer: 'National workers: Primary ~247M, Secondary ~136M, Tertiary.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_004', title: 'Growth of Employment: Trends Since Independence',
          scaffold: { problem: 'Using Table 6.3 data, calculate the compound annual growth rate (CAGR) of tertiary sector employment between 1993–94 and 2011–12.',
            steps: [
            { text: 'Identify the concept — need absolute tertiary employment in both years, then CAGR formula.' },
            { text: 'Calculate absolute tertiary workers: 1993–94 = 20% × 340M = 68M; 2011–12 = 26.8% × 470M = 125.96M.' },
            { text: 'Apply CAGR formula: (End/Start)^(1/n) – 1. Here n = 2011–12 – 1993–94 = 18 years (approx). Ratio = 125.96 / 68 = 1.8524.' },
            { text: 'Compute 1.8524^(1/18) = 1.0347 → CAGR = 3.47% per annum.' },
            { text: 'Interpret — tertiary employment grew at 3.47% p.a., faster than overall employment (~1.5–2%), confirming services.', faded: true, blankAnswer: '3.47% per annum (tertiary sector employment CAGR, 1993–94.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_005', title: 'Informalisation of Indian Workforce: Formal vs Informal Sector',
          scaffold: { problem: 'According to PLFS 2022–23, India\'s workforce is 545 million. Rural workforce constitutes two-thirds. Male workers are 77% of total.',
            steps: [
            { text: 'Total workforce = 545 million. Rural = 2/3 × 545 = 363.33 million. Urban = 545 - 363.33 = 181.67 million.' },
            { text: 'Male workers = 77% of 545 = 419.65 million. Female workers = 545 - 419.65 = 125.35 million.' },
            { text: 'Rural female workers = 34.8% of rural population? Wait — worker-population ratio (WPR) is given, not share.' },
            { text: 'Rural female as % of total female = (90.83 / 127.16) × 100 = 71.4%.' },
            { text: 'Interpretation: 71% of female workers are in rural areas, consistent with high rural female WPR (34.8% vs urban 20.7%).', faded: true, blankAnswer: '(a) Rural: 363.33 million, Urban: 181.67 million; (b) Male.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_006', title: 'Informal Sector: Characteristics and Vulnerability of Workers',
          scaffold: { problem: 'A survey of a Mumbai slum cluster finds 1,200 workers. 300 are self-employed (rag-pickers, vendors), 450 are casual construction workers.',
            steps: [
            { text: 'Identify the formal sector criterion: public sector or private enterprise with ≥10 hired workers.' },
            { text: 'Classify each group: (a) Self-employed (no hired workers) → informal.' },
            { text: 'Count formal workers = 150 (garment factory only). Informal workers = 300 + 450 + 200 + 100 = 1,050.' },
            { text: 'Informal share = (1,050 / 1,200) × 100 = 87.5%.' },
            { text: 'Interpret: Despite two registered factories, 87.5% are informal because one factory is below the 10-worker threshold.', faded: true, blankAnswer: 'Informal sector share = 87.5% (1,050 out of 1,200 workers).' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class conducts a neighbourhood employment survey for a statistics project. Respondents: a Zomato delivery partner on per-order pay, a tailor running his own shop with one hired assistant, a homemaker cooking for a paying-guest family living in her house (unpaid), and a freelance coder paid per project. The class argues over who counts as a \'worker\' and of which type.',
            decisions: [{ prompt: 'Classify them per the official definitions.', options: [
                { text: 'Delivery partner and per-project coder = casual wage labour (paid per engagement, no job security — skill level doesn\'t change status). The tailor = self-employed (owns account, hires help). The unpaid homemaker is NOT counted as a worker — unpaid household work stays outside GNP-valued economic activity, a real gendered blind spot of the statistics.', outcome: 'Worker status follows payment and engagement regularity, not glamour or skill — gig work is casual work, and unpaid care work is invisible to the count.' },
                { text: 'The delivery partner and coder are self-employed entrepreneurs — they choose their hours and work for themselves.', outcome: 'They don\'t own the means of engagement — they\'re paid per task with no security; \'flexibility\' isn\'t ownership, so they\'re casual wage workers.', reveals: 'gig-means-self-employed' },
                { text: 'The homemaker counts as a worker — feeding paying guests is clearly productive work.', outcome: 'Productive but unpaid family/household work is excluded from worker statistics — that\'s exactly the blind spot the chapter flags, not a reason it gets counted.', reveals: 'unpaid-care-is-counted' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Officially, work counts when it enters the market — which is why a breakfast cooked at home vanishes from GNP while the same meal at a stall doesn\'t.',
            decisions: [{ prompt: 'What comes next? Employment: Growth, Informalisation and Other Issues · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Employment: Growth, Informalisation and Other Issues · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_001', difficulty: 'standard',
          question: 'Economic activities are all human endeavours that contribute to the gross.',
          hint: 'Revisit c9_eco_ch1_7 (Factors of Production: Labour) and c10_eco_cbse_02_005 (Problems.',
          misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND LEVEL:** Explain why the worker-population ratio for rural women (34.8%) is higher than for urban women (20.7%) in 2023-24 (Table 6.1), despite.', answer: '**Correct Answer:** Rural women participate more',
                  options: ['**Correct Answer:** Rural women participate more', 'self-employed = entrepreneur with capital and employees', 'casual worker = only construction/agricultural labour'],
                  hint: 'Revisit c9_eco_ch1_7 (Factors of Production: Labour) and c10_eco_cbse_02_005 (Problems.',
                  misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker = only.' }
          ],
            remediations: { 'specific-error-students-believe-self': { steps: ['**Step-by-Step Remediation:** 1.', '**Re-read NCERT Section 6.4** with a highlighter: mark every example given (cement shop owner, construction worker.', '**Create a 2×2 matrix** on paper: Rows = Control over enterprise (High/Low), Columns = Regularity of income.', 'Place: cement owner (High, Irregular), civil engineer (Low, Regular), construction worker (Low, Irregular), beedi.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker.',
          parts: [
                { id: 'a', prompt: '**CREATE LEVEL:** Design a 5-question survey module to identify whether a respondent qualifies as a \'worker\' per NCERT definition.', answer: '**Expected Criteria for Good Answer:** 1',
                  options: ['**Expected Criteria for Good Answer:** 1', 'Were you available for work but did not find any?', 'family gain', 'self-employed = entrepreneur with capital and employees'],
                  hint: 'Revisit c9_eco_ch1_7 (Factors of Production: Labour) and c10_eco_cbse_02_005 (Problems.',
                  misconception: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker = only.' }
          ],
            remediations: { 'specific-error-students-believe-self': { steps: ['**Step-by-Step Remediation:** 1.', '**Re-read NCERT Section 6.4** with a highlighter: mark every example given (cement shop owner, construction worker.', '**Create a 2×2 matrix** on paper: Rows = Control over enterprise (High/Low), Columns = Regularity of income.', 'Place: cement owner (High, Irregular), civil engineer (Low, Regular), construction worker (Low, Irregular), beedi.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_002', difficulty: 'standard',
          question: 'The **Economically Active Population** (Labour Force) comprises all persons who.',
          hint: 'Revisit node c11_eco_cbse_06_001 "Workers and Employment: Key Definitions and Concepts".',
          misconception: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.',
          parts: [
                { id: 'a', prompt: 'Analyse the trend in Table 6.3: Share of casual wage labourers rose from 23.2% (1972–73) to 31.8% (1993–94) then fell to 19.9% (2023–24), while regular.', answer: 'Phase 1 (1972–1994): **Casualisation**',
                  options: ['Phase 1 (1972–1994): **Casualisation**', 'growth', 'Labour Force = Workforce', '**"Labour Force = Workforce"** and use the terms interchangeably'],
                  hint: 'Revisit node c11_eco_cbse_06_001 "Workers and Employment: Key Definitions and Concepts" and.',
                  misconception: 'Students often think **"Labour Force = Workforce"** and use the terms interchangeably.' }
          ],
            remediations: { 'labour-force-workforce-and-use': { steps: ['Draw a Venn diagram — outer circle = Population; inner circle = Labour Force (Working + Seeking); core = Workforce.', 'Take a concrete dataset: Population = 1000, Workforce = 400, Unemployed seeking = 50.', 'Practice classifying 10 individuals (e.g., student, retired, job-seeker, housewife, farmer) into the three circles.', 'Re-read NCERT §6.2 "Those activities which contribute to GNP...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_003', difficulty: 'standard',
          question: 'Sectoral distribution of workforce refers to the percentage distribution of.',
          hint: 'Revise Class 10 Chapter 2 (Sectors of the Indian Economy) exercises on sector.',
          misconception: 'Students often equate "sectoral shift in workforce" with "sectoral shift in GDP" and assume a rising tertiary share.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sectoral distribution of workforce refers to the percentage distribution of a country\'s',
                  options: ['Sectoral distribution of workforce refers to the percentage distribution of a country\'s', 'Economic activities are all human endeavours that contribute to the gross national', 'The **Economically Active Population** (Labour Force) comprises all persons who are', 'Growth of employment refers to the rate of change in the total number of workers engaged'],
                  hint: 'Revise Class 10 Chapter 2 (Sectors of the Indian Economy) exercises on sector classification and.',
                  misconception: 'Students often equate "sectoral shift in workforce" with "sectoral shift in GDP" and assume a rising tertiary share automatically means.' }
          ],
            remediations: { 'students-often-equate-sectoral-shift': { steps: ['Re-read Table 6.2 and Chart 6.2 side-by-side: note rural primary (64.4%) vs urban tertiary (60.9%) and connect.', 'Calculate GDP per worker for each sector using latest Economic Survey data: Primary GDP ÷ Primary workers, etc.', 'The huge gap (primary ~1/5 of tertiary) makes the productivity lag tangible.', 'Plot Table 6.3 secondary share (1972–2024) on graph paper: the flat line post-2011 visually proves stagnation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_004', difficulty: 'standard',
          question: 'Growth of employment refers to the rate of change in the total number.',
          hint: 'Revisit c11_eco_cbse_06_003 (sectoral distribution) and c11_eco_cbse_06_002.',
          misconception: 'Students believe "sectoral shift from primary to tertiary means agriculture jobs disappeared." In reality, Table 6.3.',
          parts: [
                { id: 'a', prompt: 'Calculate the employment elasticity for the tertiary sector between 1993–94 and 2011–12 using Table 6.3 data. Tertiary share: 20% → 26.8%.', answer: 'Step 1: Tertiary workforce 1993–94 = 20% × 340 = 68 million',
                  options: ['Step 1: Tertiary workforce 1993–94 = 20% × 340 = 68 million', 'sectoral shift from primary to tertiary means agriculture jobs disappeared', '"sectoral shift from primary to tertiary means agriculture jobs disappeared'],
                  hint: 'Revisit c11_eco_cbse_06_003 (sectoral distribution) and c11_eco_cbse_06_002 (worker-population.',
                  misconception: 'Students believe "sectoral shift from primary to tertiary means agriculture jobs disappeared." In reality, Table 6.3 shows primary sector.' }
          ],
            remediations: { 'sectoral-shift-from-primary-to': { steps: ['Re-read Table 6.3 *vertically* (down a column) for absolute workforce size context — use Exercise Q11 (1972–73 rural.', 'Calculate primary sector absolute workers: 1972 = 74.3% of ~195M = 145M; 2023 = 46.1% of ~545M = 251M.', 'Plot this on graph paper — X-axis: Year, Y-axis: Absolute workers (primary vs. non-primary).', 'Discuss: "If agriculture employs more people, why is its share falling?" → Denominator (total workforce) grew faster.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_005', difficulty: 'standard',
          question: 'The formal sector comprises all public sector establishments and private sector.',
          hint: 'Revisit c11_eco_cbse_06_001 (worker definitions) and c11_eco_cbse_06_004 (status-wise.',
          misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector.',
          parts: [
                { id: 'a', prompt: 'Define the formal sector as per the NCERT classification used in Indian employment statistics. State the exact hired-worker threshold and ownership condition.', answer: 'The formal sector includes all public sector establishments and private sector',
                  options: ['The formal sector includes all public sector establishments and private sector', '20 workers', 'only government jobs', 'informal sector = unorganised sector = illegal/unregistered businesses'],
                  hint: 'Revisit c11_eco_cbse_06_001 (worker definitions) and c11_eco_cbse_06_004 (status-wise trends Table.',
                  misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector includes legally.' },
                { id: 'b', prompt: 'Explain why a self-employed street vendor selling vegetables is classified as an informal sector worker even though they work regularly every day.', answer: 'The vendor operates an own-account enterprise with zero hired workers',
                  options: ['The vendor operates an own-account enterprise with zero hired workers', 'because they don\'t pay taxes', 'informal sector = unorganised sector = illegal/unregistered businesses', 'crack down on illegality'],
                  hint: 'Revisit c11_eco_cbse_06_001 (worker definitions) and c11_eco_cbse_06_004 (status-wise trends Table.',
                  misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector includes legally.' },
                { id: 'c', prompt: 'In 2019–20, India\'s total workforce was 535 million, with 59 million in the formal sector. Calculate the informal sector workforce percentage.', answer: 'Step 1: Informal workers = 535 – 59 = 476 million',
                  options: ['Step 1: Informal workers = 535 – 59 = 476 million', 'informal sector = unorganised sector = illegal/unregistered businesses', 'crack down on illegality', 'extend social security to small enterprises'],
                  hint: 'Revisit c11_eco_cbse_06_001 (worker definitions) and c11_eco_cbse_06_004 (status-wise trends Table.',
                  misconception: 'Students think "informal sector = unorganised sector = illegal/unregistered businesses." In reality, informal sector includes legally.' }
          ],
            remediations: { 'informal-sector-unorganised-sector-illegal': { steps: ['Re-read Box 6.1 and the definition paragraph in Section 6.7. Highlight the two criteria: (a) public sector OR private.', 'Take 5 local enterprises (kirana shop, govt school, construction site, freelance coder, factory with 15 workers).', 'Plot a 2×2 matrix: rows = enterprise type (public/private), columns = hired workers (<10, ≥10). Place each example.', 'Verify with teacher that "registered but <10 workers" falls in informal sector.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_006', difficulty: 'standard',
          question: 'The informal sector comprises all unincorporated private enterprises owned.',
          hint: 'Revisit c11_eco_cbse_06_001 (worker categories) and c11_eco_cbse_06_005 (formal/informal.',
          misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".',
          parts: [
                { id: 'a', prompt: 'Why does the textbook state that casualisation of workforce makes workers \'highly vulnerable\'?', answer: 'Casual workers are hired day-to-day without continuous employment contracts',
                  options: ['Casual workers are hired day-to-day without continuous employment contracts', 'low wages', 'informal sector = unorganised sector = illegal/unregistered businesses', '"informal sector = unorganised sector = illegal/unregistered businesses"'],
                  hint: 'Revisit c11_eco_cbse_06_001 (worker categories) and c11_eco_cbse_06_005 (formal/informal definition.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' },
                { id: 'b', prompt: 'In 2019-20, India\'s total workforce was 535 million with 59 million formal sector workers. Calculate the informal sector workforce share.', answer: 'Step 1: 2019-20 informal = 535 - 59 = 476 million',
                  options: ['Step 1: 2019-20 informal = 535 - 59 = 476 million', 'informal sector = unorganised sector = illegal/unregistered businesses', '"informal sector = unorganised sector = illegal/unregistered businesses"'],
                  hint: 'Revisit c11_eco_cbse_06_001 (worker categories) and c11_eco_cbse_06_005 (formal/informal definition.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' },
                { id: 'c', prompt: 'Compare the vulnerability of three workers: (A) a self-employed handloom weaver, (B) a casual construction worker, (C) a regular salaried employee in.', answer: 'Most vulnerable to least: B > A > C',
                  options: ['Most vulnerable to least: B > A > C', 'informal sector = unorganised sector = illegal/unregistered businesses', '"informal sector = unorganised sector = illegal/unregistered businesses"'],
                  hint: 'Revisit c11_eco_cbse_06_001 (worker categories) and c11_eco_cbse_06_005 (formal/informal definition.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' }
          ],
            remediations: { 'informal-sector-unorganised-sector-illegal': { steps: ['Re-read the formal sector definition in NCERT pg. 103: "All public sector establishments and those private sector.', 'Create a table with 5 examples (e.g., registered factory with 8 workers, unregistered factory with 12 workers, street.', 'Classify each using ONLY the 10-worker rule.', 'Check against the Ahmedabad case study (Box 6.2) — the mill workers lost formal status because the enterprise closed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
