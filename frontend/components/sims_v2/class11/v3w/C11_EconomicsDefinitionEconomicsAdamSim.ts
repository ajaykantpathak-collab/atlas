import type { SimDef } from '../../engine/types';
import C11_EconomicsDefinitionEconomicsAdamSim from '../../../simulations/c6_12/C11_EconomicsDefinitionEconomicsAdamSim';

/** v3 wrapped master — C11_EconomicsDefinitionEconomicsAdamSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_economicsdefinitioneconomicsadamsim: SimDef = {
    id: 'v3w_c11_economicsdefinitioneconomicsadamsim',
    title: 'Definition Economics Adam',
    subtitle: 'Covers the NCERT definitions of economic activity, worker, worker-population ratio, and.',
    classLevel: 11, subject: 'economics', topic: 'Workers and Employment: Key Definitions and Concepts',
    chapters: [],
    nodeIds: ['c11_eco_cbse_06_001', 'c11_eco_cbse_06_002', 'c11_eco_cbse_06_005', 'c11_eco_cbse_06_006', 'c11_eco_cbse_06_008', 'c11_eco_cbse_06_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing at a busy chowk in your town at 8 AM: a vegetable vendor arranging produce.', goal: 'Master Definition Economics Adam.' },
    discovery: {
        question: '**UNDERSTAND LEVEL:** Explain why the worker-population ratio for rural women (34.8%) is higher than for urban women (20.7%) in 2023-24 (Table 6.1), despite.',
        options: ['**Correct Answer:** Rural women participate more', 'self-employed = entrepreneur with capital and employees', 'casual worker = only construction/agricultural labour'],
        answer: '**Correct Answer:** Rural women participate more',
        hook: '**Specific Error:** Students believe "self-employed = entrepreneur with capital and employees" and "casual worker =.',
    },
    teaching: [
        { title: 'Economic activities are all human endeavours.', text: 'Economic activities are all human endeavours that contribute to the gross national product (GNP) through the production of goods and services for which payment is made or imputed; a worker is any.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_005', title: 'The formal sector comprises all public.',
          scaffold: { problem: 'According to PLFS 2022–23, India\'s workforce is 545 million. Rural workforce constitutes two-thirds. Male workers are 77% of total.',
            steps: [
            { text: 'Total workforce = 545 million. Rural = 2/3 × 545 = 363.33 million. Urban = 545 - 363.33 = 181.67 million.' },
            { text: 'Male workers = 77% of 545 = 419.65 million. Female workers = 545 - 419.65 = 125.35 million.' },
            { text: 'Rural female workers = 34.8% of rural population? Wait — worker-population ratio (WPR) is given, not share.' },
            { text: 'Rural female as % of total female = (90.83 / 127.16) × 100 = 71.4%.' },
            { text: 'Interpretation: 71% of female workers are in rural areas, consistent with high rural female WPR (34.8% vs urban 20.7%).', faded: true, blankAnswer: '(a) Rural: 363.33 million, Urban: 181.67 million; (b) Male:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_006', title: 'The informal sector comprises all.',
          scaffold: { problem: 'A survey of a Mumbai slum cluster finds 1,200 workers. 300 are self-employed (rag-pickers, vendors), 450 are casual construction workers,.',
            steps: [
            { text: 'Identify the formal sector criterion: public sector or private enterprise with ≥10 hired workers.' },
            { text: 'Classify each group: (a) Self-employed (no hired workers) → informal.' },
            { text: 'Count formal workers = 150 (garment factory only). Informal workers = 300 + 450 + 200 + 100 = 1,050.' },
            { text: 'Informal share = (1,050 / 1,200) × 100 = 87.5%.' },
            { text: 'Interpret: Despite two registered factories, 87.5% are informal because one factory is below the 10-worker threshold.', faded: true, blankAnswer: 'Informal sector share = 87.5% (1,050 out of 1,200 workers).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_06_008', title: 'Unemployment measurement in India.',
          scaffold: { problem: 'PLFS 2023-24 reports for a state: Total Population = 8.5 crore; Labour Force (Usual Status) = 3.8 crore; Employed (Usual Status) = 3.65.',
            steps: [
            { text: 'Identify given data: Population = 8.5 crore, Labour Force = 3.8 crore, Employed = 3.65 crore.' },
            { text: 'Calculate Unemployed = Labour Force - Employed = 3.8 - 3.65 = 0.15 crore.' },
            { text: 'Compute UR = (0.15 / 3.8) × 100 = 3.95%.' },
            { text: 'Compute WPR = (3.65 / 8.5) × 100 = 42.94%.' },
            { text: 'Compute LFPR = (3.8 / 8.5) × 100 = 44.71%.' },
            { text: 'Interpret: UR looks low (3.95%), but LFPR 44.71% means 55.29% of population is outside labour force.', faded: true, blankAnswer: 'UR = 3.95%, WPR = 42.94%, LFPR = 44.71%. Low UR masks low.' }
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
        { type: 'dissect', nodeId: 'c11_eco_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Definition Economics Adam', spots: [
            { id: 's1', label: 'Economic activities are all human', prompt: 'Which idea is this? — Economic activities are all human endeavours that contribute to the gross national.', answer: 'Economic activities are all human', options: ['Economic activities are all human', 'The Economically Active Population Labour', 'The formal sector comprises all', 'The informal sector comprises all'] },
            { id: 's2', label: 'The Economically Active Population Labour', prompt: 'Which idea is this? — The **Economically Active Population** (Labour Force) comprises all persons who are.', answer: 'The Economically Active Population Labour', options: ['The Economically Active Population Labour', 'Economic activities are all human', 'The formal sector comprises all', 'The informal sector comprises all'] },
            { id: 's3', label: 'The formal sector comprises all', prompt: 'Which idea is this? — The formal sector comprises all public sector establishments and private sector.', answer: 'The formal sector comprises all', options: ['The formal sector comprises all', 'Economic activities are all human', 'The Economically Active Population Labour', 'The informal sector comprises all'] },
            { id: 's4', label: 'The informal sector comprises all', prompt: 'Which idea is this? — The informal sector comprises all unincorporated private enterprises owned by individuals.', answer: 'The informal sector comprises all', options: ['The informal sector comprises all', 'Economic activities are all human', 'The Economically Active Population Labour', 'The formal sector comprises all'] },
            { id: 's5', label: 'Unemployment measurement in India refers', prompt: 'Which idea is this? — Unemployment measurement in India refers to the statistical methodologies used by the.', answer: 'Unemployment measurement in India refers', options: ['Unemployment measurement in India refers', 'Economic activities are all human', 'The Economically Active Population Labour', 'The formal sector comprises all'] }
          ] } }
    ],
    explore: { component: C11_EconomicsDefinitionEconomicsAdamSim, prompt: 'Explore the interactive — Definition Economics Adam' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_006', difficulty: 'standard',
          question: 'The informal sector comprises all unincorporated private enterprises owned by.',
          hint: 'Revisit c11_eco_cbse_06_001 (worker categories) and c11_eco_cbse_06_005 (formal/informal.',
          misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".',
          parts: [
                { id: 'a', prompt: 'Why does the textbook state that casualisation of workforce makes workers \'highly vulnerable\'?', answer: 'Casual workers are hired day-to-day without continuous employment contracts',
                  options: ['Casual workers are hired day-to-day without continuous employment contracts', 'low wages', 'informal sector = unorganised sector = illegal/unregistered businesses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' },
                { id: 'b', prompt: 'In 2019-20, India\'s total workforce was 535 million with 59 million formal sector workers. Calculate the informal sector workforce share.', answer: 'Step 1: 2019-20 informal = 535 - 59 = 476 million',
                  options: ['Step 1: 2019-20 informal = 535 - 59 = 476 million', 'informal sector = unorganised sector = illegal/unregistered businesses', '"informal sector = unorganised sector = illegal/unregistered businesses"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' },
                { id: 'c', prompt: 'Compare the vulnerability of three workers: (A) a self-employed handloom weaver, (B) a casual construction worker, (C) a regular salaried employee in a.', answer: 'Most vulnerable to least: B > A > C',
                  options: ['Most vulnerable to least: B > A > C', 'informal sector = unorganised sector = illegal/unregistered businesses', '"informal sector = unorganised sector = illegal/unregistered businesses"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' }
          ],
            remediations: { 'informal-sector-unorganised-sector-illegal': { steps: ['Re-read the formal sector definition in NCERT pg. 103: "All public sector establishments and those private sector.', 'Create a table with 5 examples (e.g., registered factory with 8 workers, unregistered factory with 12 workers, street.', 'Classify each using ONLY the 10-worker rule.', 'Check against the Ahmedabad case study (Box 6.2) — the mill workers lost formal status because the enterprise closed,.', 'Explain to a peer why a GST-registered startup with 9 employees is informal sector.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The decline in formal sector employment share from 11% to 8% would indicate worsening worker welfare, even if average informal wages.', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'informal sector = unorganised sector = illegal/unregistered businesses', '"informal sector = unorganised sector = illegal/unregistered businesses"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' },
                { id: 'b', prompt: 'Construct a hypothetical case study of a 35-year-old worker transitioning from a formal textile mill (permanent, 200 workers) to informal sector after mill.', answer: 'Case: Ahmedabad mill worker (from Box 6.2) becomes casual construction worker',
                  options: ['Case: Ahmedabad mill worker (from Box 6.2) becomes casual construction worker', 'informal sector = unorganised sector = illegal/unregistered businesses', '"informal sector = unorganised sector = illegal/unregistered businesses"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "informal sector = unorganised sector = illegal/unregistered businesses".' }
          ],
            remediations: { 'informal-sector-unorganised-sector-illegal': { steps: ['Re-read the formal sector definition in NCERT pg. 103: "All public sector establishments and those private sector.', 'Create a table with 5 examples (e.g., registered factory with 8 workers, unregistered factory with 12 workers, street.', 'Classify each using ONLY the 10-worker rule.', 'Check against the Ahmedabad case study (Box 6.2) — the mill workers lost formal status because the enterprise closed,.', 'Explain to a peer why a GST-registered startup with 9 employees is informal sector.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_008', difficulty: 'standard',
          question: 'Unemployment measurement in India refers to the statistical methodologies used.',
          hint: 'If stuck, revisit c11_eco_cbse_06_002 (Labour Force definition) and practice identifying.',
          misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.',
          parts: [
                { id: 'a', prompt: 'According to the NSO (PLFS), a person who worked for only 1 hour on at least one day during the reference week of 7 days is classified as which of the.', answer: 'Correct answer: (b) Employed',
                  options: ['Correct answer: (b) Employed', 'full-time work', 'Unemployment Rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.' },
                { id: 'b', prompt: 'In a village of 10,000 people, the PLFS data shows: Population = 10,000; Labour Force (Usual Status) = 4,200; Employed (Usual Status) = 4,050.', answer: 'Step 1: UR = (Unemployed / Labour Force) × 100',
                  options: ['Step 1: UR = (Unemployed / Labour Force) × 100', 'Unemployment Rate', 'unemployed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.' }
          ],
            remediations: { 'unemployment-rate-is-a-single': { steps: ['Create a comparison table with three columns: Usual Status (365 days), Current Weekly Status (7 days), Current Daily.', 'Take a hypothetical worker: works 4 months in agriculture, migrates 3 months for construction, unemployed 5 months.', 'Calculate UR for a village of 100 such workers using each method.', 'Discuss why government policy targets (like MGNREGA) use Usual Status but daily wage realities reflect CDS.'] } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The decline in India\'s Usual Status Unemployment Rate from 6.1% (2017-18) to 3.2% (2023-24) proves that the economy has generated.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'Unemployment Rate', 'unemployed', 'out of labour force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.' },
                { id: 'b', prompt: 'Design a mini-survey questionnaire (5 questions) to identify seasonal unemployment among migrant construction workers in an urban area, ensuring it captures.', answer: 'Good answer includes: (1) "In the last 7 days, how many days did you work for',
                  options: ['Good answer includes: (1) "In the last 7 days, how many days did you work for', 'Unemployment Rate', 'unemployed', 'out of labour force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Unemployment Rate" is a single, unambiguous number for India.' }
          ],
            remediations: { 'unemployment-rate-is-a-single': { steps: ['Create a comparison table with three columns: Usual Status (365 days), Current Weekly Status (7 days), Current Daily.', 'Take a hypothetical worker: works 4 months in agriculture, migrates 3 months for construction, unemployed 5 months.', 'Calculate UR for a village of 100 such workers using each method.', 'Discuss why government policy targets (like MGNREGA) use Usual Status but daily wage realities reflect CDS.'] } } },
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
            remediations: { 'students-often-equate-informal-sector': { steps: ['If a student misclassifies workers, have them create a 2×2 matrix: rows = ownership (public/private), columns = hired.', 'Place each worker in the matrix.', 'Public sector always formal.', 'Private sector formal only if ≥10 hired workers.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
