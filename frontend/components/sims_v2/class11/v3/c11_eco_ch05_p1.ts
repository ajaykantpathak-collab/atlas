import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eco_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eco_ch05_p1: SimDef = {
    id: 'v3_c11_eco_ch05_p1',
    title: 'Rural Development · Part 1/2',
    subtitle: 'Diagnose why villages lag a booming GDP — credit, productivity and missing non-farm links.',
    classLevel: 11, subject: 'economics', topic: 'Rural Development · Part 1/2',
    chapters: ['c11_eco_ch05'],
    nodeIds: ['c11_eco_cbse_05_001', 'c11_eco_cbse_05_002', 'c11_eco_cbse_05_003', 'c11_eco_cbse_05_004', 'c11_eco_cbse_05_005', 'c11_eco_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a rural development officer auditing a district', intro: 'The sowing is in June, the payment in October — four months of costs, and the moneylender charges 5% a month.', goal: 'Explain rural development as structural correction and analyse the rural credit gap.' },
    discovery: {
        question: 'A Maharashtra village: 70% of households farm, 15% have institutional credit, the nearest cold storage is 40 km away — while India\'s GDP grows 7%. Why is the village stuck?',
        options: ['A structural mismatch — about 42% of the workforce produces only 15% of GDP', 'Villagers refuse to adopt new farming techniques', 'Rural poverty is just what happens before cities develop', 'Credit is available; farmers simply choose not to borrow'],
        answer: 'A structural mismatch — about 42% of the workforce produces only 15% of GDP',
        hook: 'Rural development isn\'t charity or more roads — it\'s fixing a workforce trapped where productivity is lowest.',
    },
    teaching: [
        { title: 'Rural Development: Meaning, Scope and Importance', text: 'Rural development is a comprehensive strategy aimed at improving the economic and social well-being of people living in rural areas by addressing structural deficiencies in infrastructure, credit.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eco_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute farm versus non-farm output per worker, then test whether more bank branches or Jan-Dhan accounts equal real credit access.',
        labels: ['Rural Development: Meaning, Scope', 'Credit in Rural Areas', 'Rural Banking: Cooperative Credit', 'Rural Banking: Commercial Banks', 'Microcredit Programmes and Self-Help', 'Agricultural Diversification: Need'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eco_cbse_05_001', title: 'Rural Development: Meaning, Scope and Importance',
          caseStudy: { intro: 'Imagine you are visiting a village in Maharashtra where 70% of households depend on farming but only 15% have access to institutional credit, the nearest cold.',
            decisions: [{ prompt: 'Define rural development as used in the NCERT Class 11 textbook, and list any four specific focus areas it encompasses.', options: [
                { text: 'Rural development is a comprehensive plan of action for developing rural areas lagging in', outcome: 'Rural development is a comprehensive plan of action for developing rural areas lagging.' },
                { text: 'building roads', outcome: 'Not quite — Students equate rural development solely with "agricultural development" or "building rural roads,".', reveals: 'students-equate-rural-development-solely' },
                { text: 'giving loans', outcome: 'Not quite — Students equate rural development solely with "agricultural development" or "building rural roads,".', reveals: 'students-equate-rural-development-solely' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_002', title: 'Credit in Rural Areas: Sources and Need',
          scaffold: { problem: 'A marginal farmer in Vidarbha, Maharashtra cultivates 1.5 hectares of rainfed cotton.',
            steps: [
            { text: 'Identify the principal (P = ₹80,000), time (T = 6 months = 0.5 years), and interest rates for each source.' },
            { text: 'Calculate interest for Option A (Moneylender): Monthly rate = 4%.' },
            { text: 'Calculate interest for Option B (KCC): Annual rate = 7%, but with 2% subvention for prompt repayment, effective rate.' },
            { text: 'Calculate interest for Option C (SHG): Annual rate = 18%. Simple Interest = 80,000 × 18 × 0.5 / 100 = ₹7,200.' },
            { text: 'Compare: KCC (₹2,000) < SHG (₹7,200) < Moneylender (₹19,200). KCC is cheapest by a factor of 9.6x vs moneylender.' },
            { text: 'Analyse why farmer might still choose moneylender: (i) No land title for KCC collateral; (ii) KCC requires crop.', faded: true, blankAnswer: 'Moneylender: ₹19,200 (48% p.a.); KCC: ₹2,000 (5% p.a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_003', title: 'Rural Banking: Cooperative Credit Societies',
          scaffold: { problem: 'A PACS in Karnataka has 1,200 members. Total loans outstanding = ₹4.8 crore. Opening overdues = ₹1.2 crore.',
            steps: [
            { text: 'Identify stock vs flow variables — Opening overdues (₹1.2 cr) is stock; Current demand (₹2.0 cr) and Collection (₹1.5.' },
            { text: 'Calculate Total Demand for Gross Overdue Ratio = Current Demand + Opening Overdues not in current demand = ₹2.0.' },
            { text: 'Gross Overdue Ratio = (1.7 / 2.8) × 100 = 60.7%. This exceeds 20% benchmark severely.' },
            { text: 'Current DCB Ratio = (Current Demand - Current Collection) / Current Demand × 100 = (2.0 - 1.5) / 2.0 × 100 = 25%.' },
            { text: 'Net Overdue Ratio — assume ₹0.6 cr of opening overdues are >3 years. Provision = 30% × 0.6 = ₹0.18 cr.' },
            { text: 'Viability check — Net Worth = ₹80 lakh (>0, passes); DCB = 25% (<60%, fails); Gross Overdue = 60.7% (>20%, fails).', faded: true, blankAnswer: '(a) Gross Overdue Ratio = 60.7%; (b) Current DCB Ratio.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_004', title: 'Rural Banking: Commercial Banks and Regional Rural Banks',
          scaffold: { problem: 'A Regional Rural Bank in Madhya Pradesh has total deposits of ₹120 crore as on March 31, 2024.',
            steps: [
            { text: 'Identify total advances = 45 + 15 + 10 + 20 + 10 = ₹100 crore. Total deposits = ₹120 crore (given).' },
            { text: 'Calculate CD Ratio = (Total Advances / Total Deposits) × 100 = (100 / 120) × 100 = 83.33%.' },
            { text: 'Identify priority sector advances: Small/marginal farmers (₹45 cr), agricultural labourers (₹15 cr), rural artisans.' },
            { text: 'PSL Achievement % = (Priority Sector Advances / Total Advances) × 100 = (70 / 100) × 100 = 70%.' },
            { text: 'Agriculture lending = Crop loans to small/marginal farmers (₹45 cr) only. Agriculture % = (45 / 100) × 100 = 45%.' },
            { text: 'Interpretation: RRB meets agriculture target but fails overall PSL target — suggests need to increase lending.', faded: true, blankAnswer: '(a) CD Ratio = 83.33%; (b) PSL Achievement = 70% (below 75%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_005', title: 'Microcredit Programmes and Self-Help Groups (SHGs)',
          scaffold: { problem: '"Jyoti SHG" in Odisha has 14 members. Each saves ₹200/month. After 10 months, the group starts internal lending at 2.5% per month (simple.',
            steps: [
            { text: 'Calculate monthly savings flow: 14 members × ₹200 = ₹2,800/month.' },
            { text: 'Calculate savings corpus (principal) after 10 months: ₹2,800 × 10 = ₹28,000.' },
            { text: 'Calculate monthly internal lending interest: ₹28,000 × 2.5% = ₹700/month.' },
            { text: 'Total internal interest income over 8 months: ₹700 × 8 = ₹5,600.' },
            { text: 'Annualise internal interest income: ₹700 × 12 = ₹8,400/year.' },
            { text: 'Bank loan sanctioned = 6 × ₹28,000 = ₹1,68,000.' },
            { text: 'Annual bank interest cost = ₹1,68,000 × 10% = ₹16,800.' },
            { text: 'Net annual surplus = ₹8,400 - ₹16,800 = -₹8,400 (deficit).' },
            { text: 'Compare with transaction costs: deficit exceeds ₹5,000, so group cannot sustain this leverage at these rates.' },
            { text: 'Policy insight: either internal rate must rise, leverage must fall, or bank rate must drop for viability.', faded: true, blankAnswer: '(a) ₹28,000; (b) ₹5,600; (c) ₹1,68,000; (d) ₹16,800; (e).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_eco_cbse_05_006', title: 'Agricultural Diversification: Need and Benefits',
          scaffold: { problem: 'A marginal farmer in Karnataka owns 1.2 hectares of rainfed land.',
            steps: [
            { text: 'Identify current baseline — Net farm income = ₹30,000/year; 3 workers underemployed 245 days (disguised unemployment).' },
            { text: 'Analyze Option A (Floriculture lease + wage) — Lease income = ₹25,000/year (fixed, no risk).' },
            { text: 'Analyze Option B (Dairy) — Milk revenue = 2 cows × 10 liters × ₹35 × 365 = ₹255,500/year.' },
            { text: 'Compare risk profiles — Option A: Lease rent guaranteed; wage depends on company continuity.' },
            { text: 'Evaluate labor absorption — Option A employs 1 worker off-farm, 3 remain underemployed.' },
            { text: 'Consider capital constraint — Option A requires zero capital. Option B requires loan access (SHG/bank) and repayment.' },
            { text: 'Synthesize recommendation — For risk-averse household with no collateral: Option A better (₹105,000 vs ₹70,600, zero.', faded: true, blankAnswer: 'Option A: ₹105,000/year (Year 1). Option B: ₹70,600/year.' }
            ] } },
        { type: 'case', nodeId: 'c11_eco_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'A village can develop faster if young people leave for city jobs and send money home — or slower if they stay and build local work. Both paths help the village; neither helps it the same way.',
            decisions: [{ prompt: 'Is migration progress or a slow emptying?', options: [
                { text: 'Progress — remittances fund what the village can\'t', outcome: 'Remittances genuinely build schools and houses; the cost is paid in missing sons and daughters.' },
                { text: 'Emptying — the village loses its builders', outcome: 'Also true — the people who could create local opportunity are precisely the ones who leave.' },
                { text: 'The real failure is making them choose', outcome: 'Rural development\'s actual goal: a village where staying is a real option, not a sacrifice.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For an NSS field project your team must draft a development plan for a village where nearly everyone farms, yields are low, the nearest cold storage is 40 km away, and most loans come from the moneylender. A teammate\'s draft says: \'Rural development = better seeds + one new road. Done.\'',
            decisions: [{ prompt: 'What does the plan miss?', options: [
                { text: 'Rural development is a structural fix, not a farming upgrade: the village mirrors India\'s mismatch — ~42% of the workforce producing ~15% of GVA. The plan needs credit access (institutional loans, not just KCC cards on paper), infrastructure (cold storage, roads), human capital (health, schools) and diversification into allied/non-farm work (dairy, poultry, processing) — because Rabi-season underemployment and disguised unemployment won\'t be solved by seeds alone.', outcome: 'Agricultural development ⊂ rural development; ignoring non-farm linkages and credit adequacy leaves the productivity gap untouched.' },
                { text: 'The draft is sufficient — rural development is essentially agricultural development: better inputs and a road cover it.', outcome: 'That reduces a structural problem to farm inputs; with 42% of workers trapped in low-productivity agriculture, diversification and credit are the point, not extras.', reveals: 'rural-equals-agriculture' },
                { text: 'Add one more scheme — issue Kisan Credit Cards to every household and credit problems disappear.', outcome: 'Access isn\'t adequacy: collateral rules, consumption-loan diversion and default cycles persist; cards without viable non-farm income just deepen debt.', reveals: 'credit-access-equals-adequacy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eco_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Access isn\'t adequacy — an account that can\'t lend and a bank that demands land as collateral both leave the moneylender in business.',
            decisions: [{ prompt: 'What comes next? Rural Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Rural Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_001', difficulty: 'standard',
          question: 'Rural development is a comprehensive strategy aimed at improving the economic.',
          hint: 'Revisit Class 10 Chapter 2 "Sectors of the Indian Economy" — specifically the disguised.',
          misconception: 'Students equate rural development solely with "agricultural development" or "building rural roads," ignoring that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural development is a comprehensive strategy aimed at improving the economic and social',
                  options: ['Rural development is a comprehensive strategy aimed at improving the economic and social', 'Rural credit refers to the financial capital advanced to households and enterprises in', 'Cooperative Credit Societies are member-owned, democratically controlled financial', 'Rural banking in India refers to the institutional framework comprising Commercial Banks'],
                  hint: 'Revisit Class 10 Chapter 2 "Sectors of the Indian Economy" — specifically the disguised.',
                  misconception: 'Students equate rural development solely with "agricultural development" or "building rural roads," ignoring that the core problem is the.' }
          ],
            remediations: { 'students-equate-rural-development-solely': { steps: ['Revisit the workforce-GVA share calculation (Diagnostic Q3) to internalise the productivity gap magnitude.', 'Create a two-column table: "Pre-1969 Rural Credit" vs "Post-1969 Institutional Structure" using textbook details.', 'Map each rural development focus area (human capital, land reforms, infrastructure, poverty alleviation) to one.', 'Explain aloud why "agricultural development ≠ rural development" using the diversification imperative (Kharif.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_002', difficulty: 'standard',
          question: 'Rural credit refers to the financial capital advanced to households and.',
          hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the.',
          misconception: 'Students believe "more bank branches = better rural credit access" because they equate physical presence with effective.',
          parts: [
                { id: 'a', prompt: 'A farmer borrows ₹1,00,000 from a moneylender at 3% per month simple interest for 6 months to purchase seeds and fertiliser.', answer: 'Total interest = ₹1,00,000 × 3% × 6 = ₹18,000',
                  options: ['Total interest = ₹1,00,000 × 3% × 6 = ₹18,000', 'more bank branches = better rural credit access'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the comparison.',
                  misconception: 'Students believe "more bank branches = better rural credit access" because they equate physical presence with effective delivery.' },
                { id: 'b', prompt: 'A Primary Agricultural Credit Society (PACS) in Punjab has 500 members. Total deposits mobilised = ₹2 crore. Total loans advanced = ₹5 crore.', answer: 'Deposit-loan ratio = Deposits/Loans = 2/5 = 0.4 (or 40%)',
                  options: ['Deposit-loan ratio = Deposits/Loans = 2/5 = 0.4 (or 40%)', 'lending without deposit mobilisation', 'misallocation toward large borrowers', 'more bank branches = better rural credit access'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the comparison.',
                  misconception: 'Students believe "more bank branches = better rural credit access" because they equate physical presence with effective delivery.' },
                { id: 'c', prompt: 'Compare the credit delivery mechanism of a Commercial Bank branch and an SHG in a Tamil Nadu village for a woman needing ₹25,000 for a dairy cow.', answer: 'Commercial Bank: Requires land/gold collateral or third-party guarantee',
                  options: ['Commercial Bank: Requires land/gold collateral or third-party guarantee', 'SHG interest is lower', 'more bank branches = better rural credit access'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the comparison.',
                  misconception: 'Students believe "more bank branches = better rural credit access" because they equate physical presence with effective delivery.' }
          ],
            remediations: { 'more-bank-branches-better-rural': { steps: ['Revisit Class 10 node c10_eco_cbse_03_006 (Formal and Informal Credit Sources) — list the 4 terms of credit (interest.', 'Use the "3 Cs of Credit" framework (Character, Capacity, Collateral) from c7_eco_ch04_006 to analyse why a specific.', 'Calculate the bank\'s cost-to-income ratio for a ₹25,000 crop loan vs ₹25 lakh tractor loan (assume processing cost.', 'Read NCERT Box 5.1 (Kudumbashree) and identify how SHGs bypass all three filters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "more bank branches = better rural credit access" because they equate physical presence with effective.',
          parts: [
                { id: 'a', prompt: '"Jan-Dhan Yojana has solved the financial exclusion problem in rural India because 50 crore accounts were opened and ₹2 lakh crore mobilised." Evaluate this.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'financial inclusion', 'credit inclusion', 'more bank branches = better rural credit access'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 3 "Money and Credit" — specifically the comparison.',
                  misconception: 'Students believe "more bank branches = better rural credit access" because they equate physical presence with effective delivery.' }
          ],
            remediations: { 'more-bank-branches-better-rural': { steps: ['Revisit Class 10 node c10_eco_cbse_03_006 (Formal and Informal Credit Sources) — list the 4 terms of credit (interest.', 'Use the "3 Cs of Credit" framework (Character, Capacity, Collateral) from c7_eco_ch04_006 to analyse why a specific.', 'Calculate the bank\'s cost-to-income ratio for a ₹25,000 crop loan vs ₹25 lakh tractor loan (assume processing cost.', 'Read NCERT Box 5.1 (Kudumbashree) and identify how SHGs bypass all three filters.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_003', difficulty: 'standard',
          question: 'Cooperative Credit Societies are member-owned, democratically controlled.',
          hint: 'Revisit c10_eco_cbse_03_006 (formal/informal credit comparison table) and.',
          misconception: 'Students believe cooperative credit societies failed because "farmers don\'t repay loans" — treating high overdues as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cooperative Credit Societies are member-owned, democratically controlled financial',
                  options: ['Cooperative Credit Societies are member-owned, democratically controlled financial', 'Rural development is a comprehensive strategy aimed at improving the economic and social', 'Rural credit refers to the financial capital advanced to households and enterprises in', 'Rural banking in India refers to the institutional framework comprising Commercial Banks'],
                  hint: 'Revisit c10_eco_cbse_03_006 (formal/informal credit comparison table) and c11_eco_cbse_05_002.',
                  misconception: 'Students believe cooperative credit societies failed because "farmers don\'t repay loans" — treating high overdues as a borrower-character.' }
          ],
            remediations: { 'cooperative-credit-societies-failed-because': { steps: ['Distinguish stock vs flow — draw a timeline showing Kharif loan (June), Rabi loan (Nov), recovery (Mar), and how unpaid.', 'Calculate "current demand collection balance (DCB) ratio" = (Current year demand - Current year collection) / Current.', 'Map each overdue driver to institutional fix: weather risk → crop insurance linkage; consumption gap → KCC consumption.', 'Re-read NCERT Box 5.1 (Kudumbashree) — note how thrift-first model (savings before credit) solves the diversion problem.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_004', difficulty: 'standard',
          question: 'Rural banking in India refers to the institutional framework comprising.',
          hint: 'If stuck, revisit Class 10 Economics Chapter 3 (Money and Credit) — specifically nodes.',
          misconception: 'Students often believe that Regional Rural Banks (RRBs) are simply "smaller versions of Commercial Banks".',
          parts: [
                { id: 'a', prompt: 'Explain why the "multi-agency approach" was adopted for rural credit in India after 1969, and why Commercial Banks alone were considered insufficient despite.', answer: 'The multi-agency approach was adopted',
                  options: ['The multi-agency approach was adopted', 'Commercial Banks refused to lend to rural areas', 'RRBs were created to replace Commercial Banks', 'smaller versions of Commercial Banks'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 3 (Money and Credit) — specifically nodes.',
                  misconception: 'Students often believe that Regional Rural Banks (RRBs) are simply "smaller versions of Commercial Banks" or "subsidiaries of Commercial.' },
                { id: 'b', prompt: 'A Commercial Bank has total deposits of ₹500 crore and advances of ₹400 crore. Its Rural Branch has deposits of ₹50 crore and advances of ₹30 crore.', answer: 'Overall CD Ratio = (400/500) × 100 = 80%',
                  options: ['Overall CD Ratio = (400/500) × 100 = 80%', 'smaller versions of Commercial Banks', 'subsidiaries of Commercial Banks'],
                  hint: 'If stuck, revisit Class 10 Economics Chapter 3 (Money and Credit) — specifically nodes.',
                  misconception: 'Students often believe that Regional Rural Banks (RRBs) are simply "smaller versions of Commercial Banks" or "subsidiaries of Commercial.' }
          ],
            remediations: { 'regional-rural-banks-rrbs-are': { steps: ['Re-read the RRB Act, 1976 provisions — note the ownership percentages and "notified area" restriction.', 'Create a comparison table: Commercial Bank vs RRB on 5 parameters (Ownership, Area of Operation, Target Group, Capital.', 'Solve a case: "An RRB in Uttar Pradesh wants to open a branch in Delhi — can it?', 'Review NABARD\'s role as "apex refinancing body" — it refinances RRBs and Commercial Banks for rural lending, but does.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_005', difficulty: 'standard',
          question: 'Microcredit programmes are institutional mechanisms that provide small.',
          hint: 'Revisit c11_eco_cbse_05_002 (sources and need for rural credit) and c10_eco_cbse_03_006.',
          misconception: 'Students believe SHGs are merely "mini-banks" that lend at low interest rates because they get cheap funds from banks.',
          parts: [
                { id: 'a', prompt: 'Define a Self-Help Group (SHG) in the context of rural microcredit and state the typical size, composition, and primary financial activity it undertakes before.', answer: 'An SHG is an informal group of 10–20 (usually women) from similar socio-economic',
                  options: ['An SHG is an informal group of 10–20 (usually women) from similar socio-economic', 'SHG is a bank branch', 'SHG requires collateral', 'mini-banks'],
                  hint: 'Revisit c11_eco_cbse_05_002 (sources and need for rural credit) and c10_eco_cbse_03_006 (formal.',
                  misconception: 'Students believe SHGs are merely "mini-banks" that lend at low interest rates because they get cheap funds from banks.' },
                { id: 'b', prompt: 'An SHG with 12 members has been saving ₹150 per member per month for 18 months.', answer: 'Step 1: Monthly savings = 12 members × ₹150 = ₹1,800',
                  options: ['Step 1: Monthly savings = 12 members × ₹150 = ₹1,800', 'net owned funds', 'mini-banks'],
                  hint: 'Revisit c11_eco_cbse_05_002 (sources and need for rural credit) and c10_eco_cbse_03_006 (formal.',
                  misconception: 'Students believe SHGs are merely "mini-banks" that lend at low interest rates because they get cheap funds from banks.' },
                { id: 'c', prompt: 'Compare the interest rate structure in the three-tier microcredit flow: (a) bank to SHG, (b) SHG to member, (c) moneylender to borrower.', answer: 'Typical rates: (a) bank to SHG ~9–11% p.a',
                  options: ['Typical rates: (a) bank to SHG ~9–11% p.a', 'SHG charges lower than bank', 'no tension exists', 'mini-banks'],
                  hint: 'Revisit c11_eco_cbse_05_002 (sources and need for rural credit) and c10_eco_cbse_03_006 (formal.',
                  misconception: 'Students believe SHGs are merely "mini-banks" that lend at low interest rates because they get cheap funds from banks.' }
          ],
            remediations: { 'shgs-are-merely-mini-banks': { steps: ['Re-read the Kudumbashree box (NCERT p. 78) and note the interest rates mentioned.', 'Calculate the annualised rate for 2% monthly simple interest (24%) and compare to bank rate (9%).', 'List three costs the SHG bears that a bank does not (doorstep collection, weekly meetings, no collateral verification).', 'Explain why zero-interest internal lending would erode the corpus and break the bank linkage discipline.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eco_cbse_05_006', difficulty: 'standard',
          question: 'Agricultural diversification refers to the strategic shift of rural workforce.',
          hint: 'Revisit Class 10 Economics Chapter 2, Topic "Disguised Unemployment in Agriculture and.',
          misconception: 'Students believe diversification means "growing more crop varieties on the same land" and that it is only for.',
          parts: [
                { id: 'a', prompt: 'A farmer in a rainfed region of Rajasthan grows bajra during Kharif but has no irrigation for Rabi.', answer: 'Switching Kharif crops only changes *what* is grown in the same 4-month window',
                  options: ['Switching Kharif crops only changes *what* is grown in the same 4-month window', 'higher income from goats', 'growing more crop varieties on the same land'],
                  hint: 'Revisit Class 10 Economics Chapter 2, Topic "Disguised Unemployment in Agriculture and the Service.',
                  misconception: 'Students believe diversification means "growing more crop varieties on the same land" and that it is only for medium/large farmers with.' },
                { id: 'b', prompt: 'In 2019, India\'s livestock sector supported 70 million small/marginal farmers and landless laborers. Poultry accounted for 61% of livestock population.', answer: 'Step 1: Revenue = 50 birds × ₹200 = ₹10,000 per 4-month cycle',
                  options: ['Step 1: Revenue = 50 birds × ₹200 = ₹10,000 per 4-month cycle', 'growing more crop varieties on the same land'],
                  hint: 'Revisit Class 10 Economics Chapter 2, Topic "Disguised Unemployment in Agriculture and the Service.',
                  misconception: 'Students believe diversification means "growing more crop varieties on the same land" and that it is only for medium/large farmers with.' }
          ],
            remediations: { 'diversification-means-growing-more-crop': { steps: ['If a student equates diversification with crop rotation: 1.', 'Have them re-read NCERT Section 5.5 first paragraph: "Diversification includes two aspects — one relates to change.', 'Use the Bundelkhand case (Diagnostic Q6): Ask "How does crop rotation help a landless laborer?" Answer: It doesn\'t.', 'Show Box 5.2 (TANWA): Women landless laborers doing vermicompost, mushroom, soap — zero land, pure workforce.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
