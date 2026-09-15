import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch06_p2: SimDef = {
    id: 'v3_c11_eco_ch06_p2',
    title: 'Employment: Growth, Informalisation and Other Issues · Part 2/2',
    subtitle: 'Sort workers from seekers and ask who the statistics leave out.',
    classLevel: 11, subject: 'economics', topic: 'Employment: Growth, Informalisation and Other Issues · Part 2/2',
    chapters: ['c11_eco_ch06'],
    nodeIds: ['c11_eco_cbse_06_007', 'c11_eco_cbse_06_008', 'c11_eco_cbse_06_009', 'c11_eco_cbse_06_010', 'c11_eco_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a labour statistician classifying a busy chowk', intro: 'Vendor, clerk, daily-wage painter, unpaid homemaker — decide which of them the national accounts can see.', goal: 'Distinguish labour force from workforce and classify employment types correctly.' },
    discovery: {
        question: 'A graduate registers at an employment exchange and is still searching. Is she in the workforce?',
        options: ['No — she\'s in the labour force, which is workforce plus those seeking work', 'Yes — registering makes her a worker by definition', 'Yes — she counts toward the worker-population ratio', 'No — she is economically inactive until hired'],
        answer: 'No — she\'s in the labour force, which is workforce plus those seeking work',
        hook: 'Labour force = workforce + seekers — swap them and both the WPR and the unemployment rate come out wrong.',
    },
    teaching: [
        { title: 'Unemployment: Types (Frictional, Structural, Cyclical, Seasonal)', text: 'Unemployment refers to a situation where individuals who are willing and able to work at the prevailing wage rate cannot find employment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_06_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute a village\'s worker-population ratio and female casual share, then argue whether unpaid home work belongs in national income.',
        labels: ['Unemployment: Types (Frictional, Structural,', 'Unemployment: Measurement and Indicators', 'Employment in Formal', 'Government Employment Generation Programmes', 'Quality of Employment: Wages,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_007', title: 'Unemployment: Types (Frictional, Structural, Cyclical, Seasonal)',
          scaffold: { problem: 'In a hypothetical Indian state, the 2023-24 Periodic Labour Force Survey reports: Total population (15+ years) = 8.2 crore; Labour Force.',
            steps: [
            { text: 'Identify given data — Population (15+) = 8.2 crore = 82 million; LFPR = 52%; WPR = 48%.' },
            { text: 'Calculate labour force — Labour Force = Population × LFPR = 82 million × 0.52 = 42.64 million.' },
            { text: 'Calculate employed persons — Employed = Population × WPR = 82 million × 0.48 = 39.36 million.' },
            { text: 'Calculate unemployed persons — Unemployed = Labour Force - Employed = 42.64 - 39.36 = 3.28 million.' },
            { text: 'Calculate unemployment rate — U% = (Unemployed / Labour Force) × 100 = (3.28 / 42.64) × 100 = 7.69%.' },
            { text: 'Calculate structurally unemployed — Structural = 35% of unemployed = 0.35 × 3.28 = 1.148 million.' },
            { text: 'Calculate frictional unemployed — Frictional = 40% of unemployed = 0.40 × 3.28 = 1.312 million.' },
            { text: 'Calculate natural rate of unemployment — NRU = Frictional% + Structural% = 40% + 35% = 75% of unemployed.' },
            { text: 'Calculate cyclical unemployment rate — Cyclical% = Actual U% - NRU = 7.69% - 5.77% = 1.92%.' },
            { text: 'Interpret — Cyclical rate of 1.92% (or 1.15% of labour force) is positive but moderate.', faded: true, blankAnswer: '(a) Labour force = 42.64 million; (b) Unemployed = 3.28.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_008', title: 'Unemployment: Measurement and Indicators in India',
          scaffold: { problem: 'PLFS 2023-24 reports for a state: Total Population = 8.5 crore; Labour Force (Usual Status) = 3.8 crore; Employed (Usual Status) = 3.65.',
            steps: [
            { text: 'Identify given data: Population = 8.5 crore, Labour Force = 3.8 crore, Employed = 3.65 crore.' },
            { text: 'Calculate Unemployed = Labour Force - Employed = 3.8 - 3.65 = 0.15 crore.' },
            { text: 'Compute UR = (0.15 / 3.8) × 100 = 3.95%.' },
            { text: 'Compute WPR = (3.65 / 8.5) × 100 = 42.94%.' },
            { text: 'Compute LFPR = (3.8 / 8.5) × 100 = 44.71%.' },
            { text: 'Interpret: UR looks low (3.95%), but LFPR 44.71% means 55.29% of population is outside labour force.', faded: true, blankAnswer: 'UR = 3.95%, WPR = 42.94%, LFPR = 44.71%. Low UR masks low.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_009', title: 'Employment in Formal and Informal Sectors: Comparison',
          scaffold: { problem: 'According to PLFS 2019-20, India\'s total workforce was 535 million, with 59 million in the formal sector.',
            steps: [
            { text: 'Identify given data: 2011-12: Total=476M, Formal=30M; 2019-20: Total=535M, Formal=59M. Period = 8 years.' },
            { text: 'Calculate absolute changes: Total employment change = 535-476 = 59M. Formal employment change = 59-30 = 29M.' },
            { text: 'Calculate annualised growth rates using compound annual growth rate (CAGR) formula: g = (End/Start)^(1/n) - 1.' },
            { text: 'Calculate informal sector employment each year: 2011-12 informal = 476-30 = 446M. 2019-20 informal = 535-59 = 476M.' },
            { text: 'Interpret: Formal sector grew faster (8.9%) than total (1.48%), but from a very small base.', faded: true, blankAnswer: 'Total employment CAGR: 1.48% per year; Formal sector CAGR.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_010', title: 'Government Employment Generation Programmes (MGNREGA, etc.)',
          scaffold: { problem: 'A block has 15 Gram Panchayats. In 2023-24, total households with job cards = 45,000. Households demanding work = 18,000.',
            steps: [
            { text: 'Identify given data: Demand=18,000, Provided=15,500, Person-days=5,89,000, Wage Exp=₹13.54 cr, Material Exp=₹9.03.' },
            { text: 'Work provision rate = (Households Provided / Households Demanded) × 100 = (15,500 / 18,000) × 100.' },
            { text: 'Average days = Total Person-days / Households Provided = 5,89,000 / 15,500.' },
            { text: 'Actual wage-material ratio = (Wage Exp / Material Exp) × 100 = (13.54 / 9.03) × 100.' },
            { text: 'Average wage paid = Total Wage Exp (in ₹) / Total Person-days = (13.54 × 10^7) / 5,89,000. Compare with ₹230.', faded: true, blankAnswer: '(a) 86.11%, (b) 38 days, (c) Wage% = 60.0% (13.54/22.57).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_011', title: 'Quality of Employment: Wages, Working Conditions and Social Security',
          scaffold: { problem: 'Using PLFS 2022-23 data, the average monthly earnings (nominal) for regular salaried workers in urban India is ₹18,500.',
            steps: [
            { text: 'Identify given data — NW_2023 = ₹18,500, CPI_2023 = 175, NW_2012 = ₹12,000, CPI_2012 = 130, base year = 2012' },
            { text: 'Apply real wage formula for 2022-23: RW_2023 = (18500 / 175) × 100 = ₹10,571.43 (2012 prices)' },
            { text: 'Apply real wage formula for 2011-12: RW_2012 = (12000 / 130) × 100 = ₹9,230.77 (2012 prices)' },
            { text: 'Compare: Real wage increased from ₹9,230.77 to ₹10,571.43 — absolute gain = ₹1,340.66' },
            { text: 'Calculate CAGR: (10571.43 / 9230.77)^(1/11) - 1 = (1.1452)^(0.0909) - 1 = 1.0124 - 1 = 0.0124 = 1.24% per annum', faded: true, blankAnswer: 'Real wage 2022-23 = ₹10,571.43 (2012 prices); Real wage.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class conducts a neighbourhood employment survey for a statistics project. Respondents: a Zomato delivery partner on per-order pay, a tailor running his own shop with one hired assistant, a homemaker cooking for a paying-guest family living in her house (unpaid), and a freelance coder paid per project. The class argues over who counts as a \'worker\' and of which type.',
            decisions: [{ prompt: 'Classify them per the official definitions.', options: [
                { text: 'Delivery partner and per-project coder = casual wage labour (paid per engagement, no job security — skill level doesn\'t change status). The tailor = self-employed (owns account, hires help). The unpaid homemaker is NOT counted as a worker — unpaid household work stays outside GNP-valued economic activity, a real gendered blind spot of the statistics.', outcome: 'Worker status follows payment and engagement regularity, not glamour or skill — gig work is casual work, and unpaid care work is invisible to the count.' },
                { text: 'The delivery partner and coder are self-employed entrepreneurs — they choose their hours and work for themselves.', outcome: 'They don\'t own the means of engagement — they\'re paid per task with no security; \'flexibility\' isn\'t ownership, so they\'re casual wage workers.', reveals: 'gig-means-self-employed' },
                { text: 'The homemaker counts as a worker — feeding paying guests is clearly productive work.', outcome: 'Productive but unpaid family/household work is excluded from worker statistics — that\'s exactly the blind spot the chapter flags, not a reason it gets counted.', reveals: 'unpaid-care-is-counted' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_06_011', title: 'You made it',
          caseStudy: { intro: 'Officially, work counts when it enters the market — which is why a breakfast cooked at home vanishes from GNP while the same meal at a stall doesn\'t.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_007', difficulty: 'standard',
          question: 'Unemployment refers to a situation where individuals who are willing and able.',
          hint: 'Revisit c11_eco_cbse_06_002 — practice classifying 10 individuals (student, retiree.',
          misconception: 'Students believe **"cyclical unemployment is the only \'real\' unemployment" and that frictional/structural/seasonal are.',
          parts: [
                { id: 'a', prompt: 'Why does structural unemployment persist even when the economy is at full employment and aggregate demand is strong?', answer: 'Structural unemployment persists at full employment',
                  options: ['Structural unemployment persists at full employment', 'because demand is low', 'cyclical unemployment is the only \'real\' unemployment'],
                  hint: 'Revisit c11_eco_cbse_06_002 — practice classifying 10 individuals (student, retiree, discouraged.',
                  misconception: 'Students believe **"cyclical unemployment is the only \'real\' unemployment" and that frictional/structural/seasonal are \'not serious\'.' }
          ],
            remediations: { 'cyclical-unemployment-is-the-only': { steps: ['Draw a 2×2 matrix: Demand-side vs Supply-side causes on rows; Short-run vs Long-run duration on columns.', 'For each cell, ask: "Can RBI repo rate cut fix this?" Cyclical = Yes; others = No.', 'Read the Ahmedabad textile mill case study (NCERT Box 6.2) — 130,000 workers displaced over 10 years.', 'Practice classifying 5 news headlines (e.g., "IT layoffs amid global recession", "Farmers idle post-harvest", "Graduate.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"cyclical unemployment is the only \'real\' unemployment" and that frictional/structural/seasonal are.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s high informal sector share (89% of workforce) means disguised unemployment in agriculture is actually structural unemployment.', answer: 'The statement is partially correct but analytically imprecise',
                  options: ['The statement is partially correct but analytically imprecise', 'they are the same thing', 'cyclical unemployment is the only \'real\' unemployment'],
                  hint: 'Revisit c11_eco_cbse_06_002 — practice classifying 10 individuals (student, retiree, discouraged.',
                  misconception: 'Students believe **"cyclical unemployment is the only \'real\' unemployment" and that frictional/structural/seasonal are \'not serious\'.' },
                { id: 'b', prompt: 'Construct a 4×4 matrix with rows = unemployment types (Frictional, Structural, Cyclical, Seasonal) and columns = (Primary Cause, Typical Duration, Policy.', answer: '| Type | Primary Cause | Typical Duration | Policy Response | Indian Example |',
                  options: ['| Type | Primary Cause | Typical Duration | Policy Response | Indian Example |', 'cyclical unemployment is the only \'real\' unemployment'],
                  hint: 'Revisit c11_eco_cbse_06_002 — practice classifying 10 individuals (student, retiree, discouraged.',
                  misconception: 'Students believe **"cyclical unemployment is the only \'real\' unemployment" and that frictional/structural/seasonal are \'not serious\'.' }
          ],
            remediations: { 'cyclical-unemployment-is-the-only': { steps: ['Draw a 2×2 matrix: Demand-side vs Supply-side causes on rows; Short-run vs Long-run duration on columns.', 'For each cell, ask: "Can RBI repo rate cut fix this?" Cyclical = Yes; others = No.', 'Read the Ahmedabad textile mill case study (NCERT Box 6.2) — 130,000 workers displaced over 10 years.', 'Practice classifying 5 news headlines (e.g., "IT layoffs amid global recession", "Farmers idle post-harvest", "Graduate.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_008', difficulty: 'standard',
          question: 'Unemployment measurement in India refers to the statistical methodologies used.',
          hint: 'If stuck, revisit c11_eco_cbse_06_002 (Labour Force definition) and practice identifying.',
          misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.',
          parts: [
                { id: 'a', prompt: 'According to the NSO (PLFS), a person who worked for only 1 hour on at least one day during the reference week of 7 days is classified as which of the.', answer: 'Correct answer: (b) Employed',
                  options: ['Correct answer: (b) Employed', 'full-time work', 'Unemployment Rate', 'unemployed'],
                  hint: 'If stuck, revisit c11_eco_cbse_06_002 (Labour Force definition) and practice identifying who.',
                  misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.' },
                { id: 'b', prompt: 'In a village of 10,000 people, the PLFS data shows: Population = 10,000; Labour Force (Usual Status) = 4,200; Employed (Usual Status) = 4,050.', answer: 'Step 1: UR = (Unemployed / Labour Force) × 100',
                  options: ['Step 1: UR = (Unemployed / Labour Force) × 100', 'Unemployment Rate', 'unemployed', 'out of labour force'],
                  hint: 'If stuck, revisit c11_eco_cbse_06_002 (Labour Force definition) and practice identifying who.',
                  misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.' }
          ],
            remediations: { 'unemployment-rate-is-a-single': { steps: ['Create a comparison table with three columns: Usual Status (365 days), Current Weekly Status (7 days), Current Daily.', 'Take a hypothetical worker: works 4 months in agriculture, migrates 3 months for construction, unemployed 5 months.', 'Calculate UR for a village of 100 such workers using each method.', 'Discuss why government policy targets (like MGNREGA) use Usual Status but daily wage realities reflect CDS.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_009', difficulty: 'standard',
          question: 'The formal sector comprises all public sector establishments and private sector.',
          hint: 'Revisit c11_eco_cbse_06_004 (Worker status categories) and c11_eco_cbse_06_001 (Who is.',
          misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers.',
          parts: [
                { id: 'a', prompt: 'Define the formal sector as per the NCERT classification used in Indian employment statistics. State the two main criteria.', answer: 'The formal sector includes all public sector establishments and private sector',
                  options: ['The formal sector includes all public sector establishments and private sector', 'registered'],
                  hint: 'Revisit c11_eco_cbse_06_004 (Worker status categories) and c11_eco_cbse_06_001 (Who is a worker?).',
                  misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers are informal while.' },
                { id: 'b', prompt: 'Explain why a self-employed software consultant working from home with no hired workers is classified as informal sector, while a peon in a government office.', answer: 'Classification depends on enterprise characteristics, not individual earnings',
                  options: ['Classification depends on enterprise characteristics, not individual earnings', 'formal', 'high-paying', 'skilled'],
                  hint: 'Revisit c11_eco_cbse_06_004 (Worker status categories) and c11_eco_cbse_06_001 (Who is a worker?).',
                  misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers are informal while.' },
                { id: 'c', prompt: 'In 2019-20, India had 535 million total workers and 59 million formal sector workers. Calculate the percentage of workers in the informal sector.', answer: 'Step 1: Informal workers 2019-20 = 535 - 59 = 476 million',
                  options: ['Step 1: Informal workers 2019-20 = 535 - 59 = 476 million', 'jobless growth', 'formal sector grows proportionally'],
                  hint: 'Revisit c11_eco_cbse_06_004 (Worker status categories) and c11_eco_cbse_06_001 (Who is a worker?).',
                  misconception: 'Students often equate "informal sector" with "illegal" or "unregistered" activities, and assume all low-income workers are informal while.' }
          ],
            remediations: { 'students-often-equate-informal-sector': { steps: ['If a student misclassifies workers, have them create a 2×2 matrix: rows = ownership (public/private), columns = hired.', 'Place each worker in the matrix.', 'Public sector always formal.', 'Private sector formal only if ≥10 hired workers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_010', difficulty: 'standard',
          question: 'Government Employment Generation Programmes are state-initiated schemes that.',
          hint: 'Revisit c11_eco_cbse_06_007 (Unemployment Types) to distinguish seasonal/disguised from.',
          misconception: 'Students believe MGNREGA is merely a "cash transfer" or "welfare scheme" because it guarantees wages, ignoring that.',
          parts: [
                { id: 'a', prompt: 'In a Gram Panchayat, 1,200 households demanded work under MGNREGA in 2023-24. 950 households were provided employment.', answer: 'Total person-days generated, (',
                  options: ['Total person-days generated, (', 'cash transfer', 'welfare scheme', 'MGNREGA pays people to dig holes and fill them'],
                  hint: 'Revisit c11_eco_cbse_06_007 (Unemployment Types) to distinguish seasonal/disguised from open.',
                  misconception: 'Students believe MGNREGA is merely a "cash transfer" or "welfare scheme" because it guarantees wages, ignoring that **wages are paid *only*.' }
          ],
            remediations: { 'mgnrega-is-merely-a-cash': { steps: ['Show the **MGNREGA MIS Report (nrega.nic.in)** → "Asset Created" dashboard: filter by state, see photos of completed.', 'Calculate: In 2022-23, 7.6 crore assets geo-tagged.', 'If it were "digging holes", asset count would be near zero.', 'Explain the **60:40 ratio**: Wage component = 60% of *total district expenditure*, not per work.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_011', difficulty: 'standard',
          question: 'Quality of employment refers to the multidimensional assessment of a job beyond.',
          hint: 'If stuck, revisit c11_eco_cbse_06_004 (casualisation trends) and c10_math_cbse_13_005.',
          misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.',
          parts: [
                { id: 'a', prompt: 'Define \'real wage\' and explain how it differs from \'nominal wage\' in the context of assessing employment quality.', answer: 'Real wage = Nominal wage / Consumer Price Index (CPI) × 100 (base year)',
                  options: ['Real wage = Nominal wage / Consumer Price Index (CPI) × 100 (base year)', 'real wage is just wage after tax'],
                  hint: 'If stuck, revisit c11_eco_cbse_06_004 (casualisation trends) and c10_math_cbse_13_005 (median from.',
                  misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.' },
                { id: 'b', prompt: 'A construction worker in Delhi earned ₹400/day in 2018-19 and ₹500/day in 2023-24. The CPI (base 2012=100) was 140 in 2018-19 and 180 in 2023-24.', answer: 'Step 1: Real wage 2018-19 = (400/140)×100 = ₹285.71 (2012 prices)',
                  options: ['Step 1: Real wage 2018-19 = (400/140)×100 = ₹285.71 (2012 prices)', 'real wage increased'],
                  hint: 'If stuck, revisit c11_eco_cbse_06_004 (casualisation trends) and c10_math_cbse_13_005 (median from.',
                  misconception: 'Students equate \'employment generation\' with \'quality employment creation\', assuming any job reduces poverty.' }
          ],
            remediations: { 'students-equate-employment-generation-with': { steps: ['Revisit the three-pillar framework (wages, conditions, social security) using the delivery partner vs bank clerk.', 'Calculate real wages for MGNREGA (₹250/day × 26 days = ₹6,500/mo) vs state minimum wage for unskilled (e.g., Delhi.', 'Map each pillar to statutory entitlements: Minimum Wages Act (wages), Factories Act/Shops Act (conditions), EPF/ESI.', 'Apply to gig work case study — identify which Acts apply and which don\'t.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
