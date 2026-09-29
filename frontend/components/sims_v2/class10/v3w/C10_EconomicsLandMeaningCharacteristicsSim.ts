import type { SimDef } from '../../engine/types';
import C10_EconomicsLandMeaningCharacteristicsSim from '../../../simulations/c6_12/C10_EconomicsLandMeaningCharacteristicsSim';

/** v3 wrapped master — C10_EconomicsLandMeaningCharacteristicsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_economicslandmeaningcharacteristicssim: SimDef = {
    id: 'v3w_c10_economicslandmeaningcharacteristicssim',
    title: 'Production Across Countries: MNCs and Global Production Chains',
    subtitle: 'This node covers the definition and functioning of MNCs, the concept of global production.',
    classLevel: 10, subject: 'economics', topic: 'Production Across Countries: MNCs and Global Production Chains',
    chapters: [],
    nodeIds: ['c10_eco_cbse_04_001', 'c10_eco_cbse_04_004', 'c10_eco_cbse_04_006', 'c10_eco_cbse_02_005', 'c10_eco_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you hold a smartphone assembled in India. Its processor was designed in the USA, the memory chips.', goal: 'Master Production Across Countries: MNCs and Global Production Chains.' },
    discovery: {
        question: 'Define a Multinational Corporation (MNC) and give one example of an Indian MNC.',
        options: ['An MNC is a company that owns or controls production in two or more countries', 'a company that exports to other countries', 'global production chain'],
        answer: 'An MNC is a company that owns or controls production in two or more countries',
        hook: 'Students often think "global production chain" means the final product is simply imported from one foreign country.',
    },
    teaching: [
        { title: 'A Multinational Corporation (MNC) is a.', text: 'A Multinational Corporation (MNC) is a company that owns or controls production of goods or services in at least one country other than its home country.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_eco_cbse_04_001', title: 'A Multinational Corporation (MNC) is a.',
          scaffold: { problem: 'An MNC manufactures electric scooters. The battery cells require advanced chemical engineering and are produced in South Korea (skilled.',
            steps: [
            { text: 'Identify the three production stages and their labour requirements (hours and wage rates) in the current global chain.' },
            { text: 'Calculate labour cost for each stage in its current country: Battery = 200 hrs × $40 = $8,000; Body = 500 hrs × $3 =.' },
            { text: 'Sum to get total current labour cost per scooter = $8,000 + $1,500 + $1,500 = $11,000.' },
            { text: 'Calculate hypothetical battery cost in India: 300 hrs × $15 = $4,500. Compare with current $8,000.' },
            { text: 'Interpret economically: Although India\'s skilled labour is cheaper per hour, lower productivity (more hours needed).', faded: true, blankAnswer: 'Total current labour cost = $11,000 per scooter. Moving.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_04_004', title: 'Liberalisation of foreign trade and.',
          scaffold: { problem: 'An Indian automobile component manufacturer imported specialised steel worth $100,000 in 1990-91 when the peak customs duty was 150%.',
            steps: [
            { text: 'Identify the given data: import value = $100,000; duty rates: 150% (1990-91) and 30% (1997-98); exchange rates: ₹25/$.' },
            { text: 'Calculate customs duty in rupees for 1990-91: Duty = Import value × duty rate × exchange rate = $100,000 × 150% × ₹25/$.' },
            { text: 'Calculate customs duty in rupees for 1997-98: Duty = $100,000 × 30% × ₹40/$ = $100,000 × 0.3 × 40 = ₹1,20,00,000.' },
            { text: 'Compute savings: ₹3,75,00,000 - ₹1,20,00,000 = ₹2,55,00,000 (₹2.55 crore).' },
            { text: 'Interpret economically: The firm saves ₹2.55 crore on the same import volume, lowering its cost of production.', faded: true, blankAnswer: 'Customs duty savings = ₹2,55,00,000 (₹2.55 crore).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_04_006', title: 'The positive impact of globalisation on.',
          scaffold: { problem: 'In 1995, a consumer in Delhi could buy only two brands of colour TVs — a domestic brand at ₹18,000 (poor reliability) and an imported Sony.',
            steps: [
            { text: 'Identify the pre-globalisation consumer basket: 2 options, high price (₹18k-₹45k), low quality variance.' },
            { text: 'Identify the post-globalisation basket: 15 options, wide price range (₹8k-₹60k), high quality variance due to.' },
            { text: 'Apply consumer surplus concept: Consumer surplus = Willingness to pay - Actual price.' },
            { text: 'Note the domestic brand\'s response: Price fell from ₹18k to ₹10k AND quality improved — this is the "competitive.' },
            { text: 'Conclude: Globalisation benefited consumers through (a) direct access to global brands at lower tariffs, (b) indirect.', faded: true, blankAnswer: 'Consumer welfare increased significantly due to (1) 7.5x.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_02_005', title: 'Unemployment in the three sectors.',
          scaffold: { problem: 'In a village, 8 workers cultivate a 4-hectare paddy field. The total output is 40 quintals.',
            steps: [
            { text: 'Understand that disguised unemployment exists when marginal product of labour is zero or negative.' },
            { text: 'Calculate marginal product (MP) for each worker removed. MP = change in output / change in labour.' },
            { text: 'From 8 to 6 workers (remove 2): output falls from 40 to 38, so MP of 7th and 8th workers combined = 2 quintals for 2.' },
            { text: 'From 6 to 5 workers (remove 1): output falls from 38 to 35, MP of 6th worker = 3 quintals.' },
            { text: 'From 5 to 4 workers (remove 1): output falls from 35 to 30, MP of 5th worker = 5 quintals.' },
            { text: 'Since MP is positive for all workers down to 4, there is no disguised unemployment in this scenario (all workers.', faded: true, blankAnswer: '0 disguisedly unemployed workers. Marginal products: 8th.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_eco_cbse_03_008', title: 'Informal credit dependence refers to.',
          scaffold: { problem: 'A sharecropper in West Bengal needs ₹25,000 for paddy cultivation.',
            steps: [
            { text: 'Identify the moneylender\'s terms: Principal = ₹25,000, Monthly rate = 4% = 0.04, Tenure = 6 months, Simple interest, no.' },
            { text: 'Calculate moneylender interest: Monthly interest = 0.04 × ₹25,000 = ₹1,000. Total for 6 months = ₹1,000 × 6 = ₹6,000.' },
            { text: 'Identify bank KCC terms: Annual rate = 7% = 0.07. Monthly rate = 0.07/12 ≈ 0.005833.' },
            { text: 'Calculate bank interest on declining balance: Month 1: 0.005833 × ₹25,000 = ₹145.83.' },
            { text: 'Compare: Moneylender = ₹6,000; Bank = ₹583.33. Ratio = 10.3x. Yet sharecropper chooses moneylender because: (a) no land.', faded: true, blankAnswer: 'Moneylender interest = ₹6,000; Bank interest = ₹583.33;.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_eco_cbse_04_004', title: 'Identify each idea',
          dissect: { specimen: 'Production Across Countries: MNCs and Global Production Chains', spots: [
            { id: 's1', label: 'A Multinational Corporation MNC is', prompt: 'Which idea is this? — A Multinational Corporation (MNC) is a company that owns or controls production of goods.', answer: 'A Multinational Corporation MNC is', options: ['A Multinational Corporation MNC is', 'Liberalisation of foreign trade and', 'The positive impact of globalisation', 'Unemployment in the three sectors'] },
            { id: 's2', label: 'Liberalisation of foreign trade and', prompt: 'Which idea is this? — Liberalisation of foreign trade and foreign investment policy refers to the deliberate.', answer: 'Liberalisation of foreign trade and', options: ['Liberalisation of foreign trade and', 'A Multinational Corporation MNC is', 'The positive impact of globalisation', 'Unemployment in the three sectors'] },
            { id: 's3', label: 'The positive impact of globalisation', prompt: 'Which idea is this? — The positive impact of globalisation on Indian consumers refers to increased access to a.', answer: 'The positive impact of globalisation', options: ['The positive impact of globalisation', 'A Multinational Corporation MNC is', 'Liberalisation of foreign trade and', 'Unemployment in the three sectors'] },
            { id: 's4', label: 'Unemployment in the three sectors', prompt: 'Which idea is this? — Unemployment in the three sectors refers to the situation where individuals who are.', answer: 'Unemployment in the three sectors', options: ['Unemployment in the three sectors', 'A Multinational Corporation MNC is', 'Liberalisation of foreign trade and', 'The positive impact of globalisation'] },
            { id: 's5', label: 'Informal credit dependence refers to', prompt: 'Which idea is this? — Informal credit dependence refers to the reliance of low-income households on.', answer: 'Informal credit dependence refers to', options: ['Informal credit dependence refers to', 'A Multinational Corporation MNC is', 'Liberalisation of foreign trade and', 'The positive impact of globalisation'] }
          ] } }
    ],
    explore: { component: C10_EconomicsLandMeaningCharacteristicsSim, prompt: 'Explore the interactive — Production Across Countries: MNCs and Global Production Chains' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_001', difficulty: 'standard',
          question: 'A Multinational Corporation (MNC) is a company that owns or controls production.',
          hint: 'If stuck, revisit Factors of Production (c8_eco_ch1_2) and Types of Markets: Local,.',
          misconception: 'Students often think "global production chain" means the final product is simply imported from one foreign country.',
          parts: [
                { id: 'a', prompt: 'Define a Multinational Corporation (MNC) and give one example of an Indian MNC.', answer: 'An MNC is a company that owns or controls production in two or more countries',
                  options: ['An MNC is a company that owns or controls production in two or more countries', 'a company that exports to other countries', 'global production chain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "global production chain" means the final product is simply imported from one foreign country.' },
                { id: 'b', prompt: 'An MNC produces sports shoes. The design stage needs 100 hours of skilled labour at $30/hour in the USA.', answer: 'Step 1: Design cost = 100 hrs × $30 = $3,000',
                  options: ['Step 1: Design cost = 100 hrs × $30 = $3,000', 'global production chain', 'foreign trade'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "global production chain" means the final product is simply imported from one foreign country.' }
          ],
            remediations: { 'global-production-chain-means-the': { steps: ['If a student holds this misconception, do this 3-step remediation: (1) Show a real iPhone component map (Apple\'s.', '(2) Give a fill-in-the-blank diagram of a car\'s global production chain with stages (engine, tyres, electronics,.', '(3) Ask the student to explain in one sentence why the same MNC does not make engines and tyres in the same country.', 'This forces them to articulate factor-specific location logic.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_004', difficulty: 'standard',
          question: 'Liberalisation of foreign trade and foreign investment policy refers to the.',
          hint: 'If stuck, revisit c9_eco_ch1_11 (India\'s Post-1991 Economic Reforms: Liberalisation) and.',
          misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.',
          parts: [
                { id: 'a', prompt: 'Suppose the peak customs duty on a product was 150% in 1990-91. The 1992-93 budget announced a phased reduction to 65% by 1994-95 and 30% by 1997-98.', answer: 'Step 1: Total reduction = 150% - 30% = 120 percentage points over 7 years',
                  options: ['Step 1: Total reduction = 150% - 30% = 120 percentage points over 7 years', 'foreign investment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.' },
                { id: 'b', prompt: 'Compare the impact of removing quantitative restrictions (QRs) versus reducing tariffs on domestic producers.', answer: 'Removing QRs creates more immediate competitive pressure',
                  options: ['Removing QRs creates more immediate competitive pressure', 'Tariff reduction is more immediate', 'foreign investment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.' }
          ],
            remediations: { 'students-often-equate-liberalisation-with': { steps: ['If a student conflates liberalisation with instant free trade, have them construct a timeline: 1991 (QRs removed on.', 'Ask: "If it was instant free trade, why did consumer goods QRs last till 2001?" For FDI/FPI confusion, give a table:.', '— e.g., Defence: 74% FDI (automatic up to 49%), FPI allowed in listed defence PSUs; Multi-brand retail: 51% FDI (with.', 'Have them explain why the caps differ — linking to strategic control vs.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Liberalisation of foreign investment policy in India has been more successful in attracting portfolio investment (FPI) than foreign.', answer: 'The assessment is partially accurate but incomplete',
                  options: ['The assessment is partially accurate but incomplete', 'True, FPI always exceeds FDI', 'False, FDI is always larger', 'foreign investment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.' },
                { id: 'b', prompt: 'Design a 3-step policy sequence for a hypothetical developing country that wants to liberalise its foreign trade and investment regime without causing sudden.', answer: 'Step 1: Remove QRs on capital goods and intermediate inputs (but keep tariffs)',
                  options: ['Step 1: Remove QRs on capital goods and intermediate inputs (but keep tariffs)', 'foreign investment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.' },
                { id: 'c', prompt: 'Compare the impact of removing quantitative restrictions (QRs) versus reducing tariffs on domestic producers.', answer: 'Removing QRs creates more immediate competitive pressure',
                  options: ['Removing QRs creates more immediate competitive pressure', 'Tariff reduction is more immediate', 'foreign investment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "liberalisation" with "free trade" and assume all barriers were removed at once in 1991.' }
          ],
            remediations: { 'students-often-equate-liberalisation-with': { steps: ['If a student conflates liberalisation with instant free trade, have them construct a timeline: 1991 (QRs removed on.', 'Ask: "If it was instant free trade, why did consumer goods QRs last till 2001?" For FDI/FPI confusion, give a table:.', '— e.g., Defence: 74% FDI (automatic up to 49%), FPI allowed in listed defence PSUs; Multi-brand retail: 51% FDI (with.', 'Have them explain why the caps differ — linking to strategic control vs.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_006', difficulty: 'standard',
          question: 'The positive impact of globalisation on Indian consumers refers to increased.',
          hint: 'If stuck, revisit "Competition in Markets: Many Sellers, Many Buyers".',
          misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.',
          parts: [
                { id: 'a', prompt: 'Compare the impact of globalisation on a large Indian IT services firm (e.g., TCS) versus a small traditional handloom weaver in Varanasi.', answer: 'The IT firm benefits more',
                  options: ['Correct answer: The IT firm benefits more', 'IT firms are bigger so they win', 'globalisation benefits consumers ONLY through cheaper imported goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.' }
          ],
            remediations: { 'globalisation-benefits-consumers-only-through': { steps: ['Revisit node c10_eco_cbse_04_001 (MNCs and Global Production) to see how MNCs set up production IN India, not just.', 'Use the "Maruti vs Hyundai" case: In 1998, Hyundai entered with Santro — modern engine, better mileage.', 'Apply same logic to consumers: The benefit is not just buying a Hyundai, but buying a BETTER Maruti at a LOWER price.', 'Practice writing: "Globalisation disciplined domestic producers through contestable markets, raising quality floor for.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Globalisation has been uniformly beneficial for all Indian producers because it opened up export markets." Provide two arguments.', answer: 'Correct evaluation: The statement is false',
                  options: ['Correct evaluation: The statement is false', 'some producers lost money', 'globalisation benefits consumers ONLY through cheaper imported goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.' },
                { id: 'b', prompt: 'Construct a short scenario (3-4 sentences) showing how globalisation benefited an Indian consumer in a tier-2 city (e.g., Indore, Coimbatore) through a service.', answer: 'Expected answer: Example',
                  options: ['Expected answer: Example', 'globalisation benefits consumers ONLY through cheaper imported goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.' },
                { id: 'c', prompt: 'Compare the impact of globalisation on a large Indian IT services firm (e.g., TCS) versus a small traditional handloom weaver in Varanasi.', answer: 'The IT firm benefits more',
                  options: ['Correct answer: The IT firm benefits more', 'IT firms are bigger so they win', 'globalisation benefits consumers ONLY through cheaper imported goods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe globalisation benefits consumers ONLY through cheaper imported goods.' }
          ],
            remediations: { 'globalisation-benefits-consumers-only-through': { steps: ['Revisit node c10_eco_cbse_04_001 (MNCs and Global Production) to see how MNCs set up production IN India, not just.', 'Use the "Maruti vs Hyundai" case: In 1998, Hyundai entered with Santro — modern engine, better mileage.', 'Apply same logic to consumers: The benefit is not just buying a Hyundai, but buying a BETTER Maruti at a LOWER price.', 'Practice writing: "Globalisation disciplined domestic producers through contestable markets, raising quality floor for.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_005', difficulty: 'standard',
          question: 'Unemployment in the three sectors refers to the situation where individuals who.',
          hint: 'If stuck, review c10_eco_cbse_02_001 (sector classification) and c8_eco_ch1_4 (labour and.',
          misconception: 'Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real problem is sectoral.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Unemployment in the three sectors refers to the situation where individuals who are',
                  options: ['Unemployment in the three sectors refers to the situation where individuals who are', 'A Multinational Corporation (MNC) is a company that owns or controls production of goods', 'Liberalisation of foreign trade and foreign investment policy refers to the deliberate', 'The positive impact of globalisation on Indian consumers refers to increased access to a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real problem is sectoral mismatch: the primary.' }
          ],
            remediations: { 'unemployment-in-india-is-mainly': { steps: ['Revisit the definition of marginal product (from c8_eco_ch1_4 Labour as a Factor of Production) using a farm example:.', 'Identify when marginal product becomes zero — those extra workers are disguisedly unemployed.', 'Contrast with a factory where a new machine replaces 10 workers — those workers are structurally unemployed if they.', 'Use a table comparing the three sectors\' unemployment types, causes, and examples.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real problem is sectoral.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Rapid growth of the tertiary sector in India has solved the unemployment problem." Use sectoral employment and GDP share data to.', answer: 'The statement is false',
                  options: ['The statement is false', 'lack of jobs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think unemployment in India is mainly due to "lack of jobs" overall, but the real problem is sectoral mismatch: the primary.' }
          ],
            remediations: { 'unemployment-in-india-is-mainly': { steps: ['Revisit the definition of marginal product (from c8_eco_ch1_4 Labour as a Factor of Production) using a farm example:.', 'Identify when marginal product becomes zero — those extra workers are disguisedly unemployed.', 'Contrast with a factory where a new machine replaces 10 workers — those workers are structurally unemployed if they.', 'Use a table comparing the three sectors\' unemployment types, causes, and examples.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_008', difficulty: 'standard',
          question: 'Informal credit dependence refers to the reliance of low-income households on.',
          hint: 'If stuck, revisit c10_eco_cbse_03_005 (Terms of Credit) and create a table: Term | Formal.',
          misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with.',
          parts: [
                { id: 'a', prompt: 'Calculate the total interest paid over 2 years on a ₹20,000 loan from: (a) a moneylender charging 3% per month simple interest with no principal repayment, and.', answer: '**Step 1:** Moneylender: Monthly interest = 3% × ₹20,000 = ₹600',
                  options: ['**Step 1:** Moneylender: Monthly interest = 3% × ₹20,000 = ₹600', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'b', prompt: 'Compare the credit access barriers for: (i) a tenant farmer in Punjab leasing 2 hectares, (ii) a street vendor in Mumbai with daily cash flow but no shop.', answer: '(i) Tenant farmer: **Collateral barrier**',
                  options: ['(i) Tenant farmer: **Collateral barrier**', 'high interest rates', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' }
          ],
            remediations: { 'poor-people-prefer-informal-credit': { steps: ['** Revisit c10_eco_cbse_03_005 (Terms of Credit) — list the 4 formal credit terms (interest rate, collateral,.', '** Use the ₹20,000/2-year calculation from Diagnostic 3 — redo it with compound interest for the moneylender (5%.', '** Read the RBI\'s "Priority Sector Lending — Weaker Sections" circular (2023) — note the 40% ANBC target for weaker.'] } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Self-Help Groups (SHGs) solve the poor\'s credit problem by replacing moneylenders with banks." Use the concepts of social collateral,.', answer: 'The statement is **partially correct but incomplete**',
                  options: ['The statement is **partially correct but incomplete**', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'b', prompt: 'Design a credit product for a seasonal migrant construction worker in Delhi who earns ₹600/day for 8 months/year, has no ID proof in Delhi, and sends.', answer: '**Product:** "Migrant Flexi-Loan"',
                  options: ['**Product:** "Migrant Flexi-Loan"', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' },
                { id: 'c', prompt: 'Compare the credit access barriers for: (i) a tenant farmer in Punjab leasing 2 hectares, (ii) a street vendor in Mumbai with daily cash flow but no shop.', answer: '(i) Tenant farmer: **Collateral barrier**',
                  options: ['(i) Tenant farmer: **Collateral barrier**', 'high interest rates', 'poor people prefer informal credit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "poor people prefer informal credit because it\'s easier/faster" — confusing **preference** with **exclusion**.' }
          ],
            remediations: { 'poor-people-prefer-informal-credit': { steps: ['** Revisit c10_eco_cbse_03_005 (Terms of Credit) — list the 4 formal credit terms (interest rate, collateral,.', '** Use the ₹20,000/2-year calculation from Diagnostic 3 — redo it with compound interest for the moneylender (5%.', '** Read the RBI\'s "Priority Sector Lending — Weaker Sections" circular (2023) — note the 40% ANBC target for weaker.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
