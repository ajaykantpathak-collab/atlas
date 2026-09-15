import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch09_p1: SimDef = {
    id: 'v3_c12_bs_ch09_p1',
    title: 'Financial Management · Part 1/2',
    subtitle: 'Three questions decide every company\'s fate — where to invest, how to raise, what to pay out.',
    classLevel: 12, subject: 'business_studies', topic: 'Financial Management · Part 1/2',
    chapters: ['c12_bs_ch09'],
    nodeIds: ['c12_bs_cbse_09_001', 'c12_bs_cbse_09_002', 'c12_bs_cbse_09_003', 'c12_bs_cbse_09_004', 'c12_bs_cbse_09_005', 'c12_bs_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Chief Financial Officer', intro: 'Financial management is scarce money meeting unlimited demands — three decisions settle the argument.', goal: 'Define financial management and analyse the investment, financing and dividend decisions.' },
    discovery: {
        question: 'A startup raises ₹5 crore. Buy the AI server or expand sales? Raise the next round as equity or loan? Pay dividends or reinvest? What do these three questions have in common?',
        options: ['They are the three financial decisions — investment, financing and dividend — that together determine shareholder wealth', 'They are operational decisions handled by middle management', 'They are marketing questions about revenue growth', 'They are legal decisions requiring board approval only'],
        answer: 'They are the three financial decisions — investment, financing and dividend — that together determine shareholder wealth',
        hook: 'Every rupee faces the same three forks — where to deploy it, how to raise it, whether to distribute it. Students memorise them separately; they\'re one connected triage aimed at a single goal: maximising wealth.',
    },
    teaching: [
        { title: 'Financial Management: Meaning, Definition and Objectives', text: 'Financial Management is the process of planning, organizing, directing, and controlling the procurement and utilization of funds to maximize shareholders\' wealth through optimal investment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Act as CFO: allocate the ₹5 crore across competing investments, choose the debt-equity mix for the next raise, and decide the dividend — defending each call by its effect on shareholder wealth.',
        labels: ['Financial Management: Meaning, Definition', 'Financial Decisions: Investment, Financing', 'Investment Decision: Capital Budgeting', 'Financing Decision: Debt', 'Dividend Decision: Factors Affecting', 'Financial Planning: Meaning, Importance'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_001', title: 'Financial Management: Meaning, Definition and Objectives',
          caseStudy: { intro: 'Imagine you are the CFO of a startup that just raised ₹50 lakh from investors.',
            decisions: [{ prompt: 'Define "business finance" and state how it differs from "financial management" in one sentence each.', options: [
                { text: 'Business finance is the money required for carrying out business activities', outcome: 'Business finance is the money required for carrying out business activities (establishment.' },
                { text: 'financial management is arranging money', outcome: 'Not quite — Students believe "wealth maximization = profit maximization" and use them interchangeably.', reveals: 'wealth-maximization-profit-maximization-and' },
                { text: 'wealth maximization = profit maximization', outcome: 'Not quite — Students believe "wealth maximization = profit maximization" and use them interchangeably.', reveals: 'wealth-maximization-profit-maximization-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_002', title: 'Financial Decisions: Investment, Financing and Dividend Decisions',
          caseStudy: { intro: 'Imagine you are the CFO of a startup that just received ₹5 crore in funding.',
            decisions: [{ prompt: 'State the primary objective of financial management according to the wealth maximisation concept.', options: [
                { text: 'The primary objective is to maximise the market value of equity shares (shareholders\'', outcome: 'The primary objective is to maximise the market value of equity shares (shareholders\' wealth).' },
                { text: 'maximise profit', outcome: 'Not quite — Students often think the **Financing Decision** is only about "choosing the cheapest source".', reveals: 'the-financing-decision-is-only' },
                { text: 'choosing the cheapest source', outcome: 'Not quite — Students often think the **Financing Decision** is only about "choosing the cheapest source".', reveals: 'the-financing-decision-is-only' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_09_003', title: 'Investment Decision: Capital Budgeting and Evaluation',
          scaffold: { problem: 'A company is evaluating a project requiring an initial investment of ₹50,00,000.',
            steps: [
            { text: 'List cash flows including scrap value in Year 5. Year 5 cash inflow = ₹12,00,000 + ₹5,00,000 = ₹17,00,000.' },
            { text: 'Payback Period: Cumulative cash flows: Y1: 15,00,000; Y2: 33,00,000; Y3: 53,00,000. Payback occurs in Year 3.' },
            { text: 'NPV at 12%: PV factors: Y1=0.893, Y2=0.797, Y3=0.712, Y4=0.636, Y5=0.567.' },
            { text: 'PI = PV inflows / Initial outlay = 62.432 / 50 = 1.2486.' },
            { text: 'ARR: Depreciation = (50,00,000 - 5,00,000)/5 = ₹9,00,000/year.' },
            { text: 'Interpretation: NPV > 0, PI > 1, ARR > cost of capital (12%), Payback < life → Accept project.', faded: true, blankAnswer: '(a) Payback Period = 2.85 years; (b) NPV = ₹12.432 lakh.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_09_004', title: 'Financing Decision: Debt vs Equity and Capital Structure',
          scaffold: { problem: 'Zenith Manufacturing Ltd. has total capital employed of ₹50 crore financed entirely by equity (5 crore shares of ₹10 each).',
            steps: [
            { text: 'Identify given data — Total Capital = ₹50 crore, Current Equity = ₹50 crore (5 crore shares × ₹10), Debt = ₹0, EBIT.' },
            { text: 'Calculate current EPS (no debt) — EBIT ₹10 cr, Interest ₹0, EBT ₹10 cr, Tax 30% = ₹3 cr, EAT = ₹7 cr, Shares = 5.' },
            { text: 'Calculate ROI — ROI = (EBIT / Total Capital) × 100 = (10/50) × 100 = 20%. Cost of debt = 12%.' },
            { text: 'Calculate restructured EPS — New Debt = ₹20 cr, Interest = 12% of 20 cr = ₹2.4 cr, EBIT = ₹10 cr, EBT = 10 - 2.4 = ₹7.6.' },
            { text: 'Compare and conclude — EPS rises from ₹1.40 to ₹1.773 (increase of ₹0.373 or 26.6%).', faded: true, blankAnswer: '(a) Current EPS = ₹1.40; (b) Restructured EPS = ₹1.773; (c).' }
            ] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_005', title: 'Dividend Decision: Factors Affecting Dividend Decision',
          caseStudy: { intro: 'Imagine you are the CFO of a successful Indian startup that just earned ₹50 crore profit after tax.',
            decisions: [{ prompt: 'A student states: "Dividend decision is simply about how much profit to distribute to shareholders.', options: [
                { text: 'The error: The student treats dividend as a simple distribution of profit without', outcome: 'The error: The student treats dividend as a simple distribution of profit without recognising that.' },
                { text: 'Higher dividend = Better for shareholders', outcome: 'Not quite — Students believe "Higher dividend = Better for shareholders" and "Dividend is paid from profit,.', reveals: 'higher-dividend-better-for-shareholders' },
                { text: 'Company X earned ₹10 crore profit, so it can declare ₹10 crore dividend', outcome: 'Not quite — Students believe "Higher dividend = Better for shareholders" and "Dividend is paid from profit,.', reveals: 'higher-dividend-better-for-shareholders' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_006', title: 'Financial Planning: Meaning, Importance and Process',
          caseStudy: { intro: 'Imagine you\'re the CFO of a startup planning to launch a new electric scooter plant. You have ₹50 crore in hand but need to know: will this last 3 years?',
            decisions: [{ prompt: 'State the two twin objectives of financial planning as per NCERT.', options: [
                { text: 'The two twin objectives are: (a) To ensure availability of funds whenever required', outcome: 'The two twin objectives are: (a) To ensure availability of funds whenever required — estimating.' },
                { text: 'maximising profit', outcome: 'Not quite — Students think financial planning = making a budget. They write: "Financial planning is preparing.', reveals: 'financial-planning-making-a-budget' },
                { text: 'minimising cost', outcome: 'Not quite — Students think financial planning = making a budget. They write: "Financial planning is preparing.', reveals: 'financial-planning-making-a-budget' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A newly appointed finance executive tells the board: \'Financial management simply means maximising this year\'s profit — so take the highest-profit project and the cheapest loan available.\'',
            decisions: [{ prompt: 'Is that the right objective?', options: [
                { text: 'No — the objective is wealth maximisation: judge decisions by their effect on share value, which accounts for the timing of cash flows and risk, not just the accounting profit figure.', outcome: 'Two projects with equal profit differ if one\'s cash arrives later or is riskier; profit is a manipulable accounting number, wealth is the market\'s discounted verdict.' },
                { text: 'Yes — more profit automatically means more shareholder wealth, so the terms are interchangeable.', outcome: 'Profit ignores when cash arrives and how risky it is; a high-profit, high-risk bet can lower the share price while a steadier project raises it.', reveals: 'profit-max-is-wealth-max' },
                { text: 'Yes — and procuring funds at the lowest possible cost is the whole job.', outcome: 'Cheap money badly deployed still destroys value: an 8% loan funding a 6% project loses wealth whatever the rate.', reveals: 'cheapest-funds-is-the-goal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now think in the three decisions every CFO lives inside. Investment-financing-dividend is a three-part board classic — and the actual architecture of corporate finance careers.',
            decisions: [{ prompt: 'What comes next? Financial Management · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Financial Management · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_001', difficulty: 'standard',
          question: 'Financial Management is the process of planning, organizing, directing, and.',
          hint: 'Revisit Class 11 Accountancy node c11_acc_cbse_01_011 (Accounting Equation) and Class 11.',
          misconception: 'Students believe "wealth maximization = profit maximization" and use them interchangeably.',
          parts: [
                { id: 'a', prompt: 'Define "business finance" and state how it differs from "financial management" in one sentence each.', answer: 'Business finance is the money required for carrying out business activities',
                  options: ['Business finance is the money required for carrying out business activities', 'financial management is arranging money', 'wealth maximization = profit maximization', 'profit maximization'],
                  hint: 'Revisit Class 11 Accountancy node c11_acc_cbse_01_011 (Accounting Equation) and Class 11.',
                  misconception: 'Students believe "wealth maximization = profit maximization" and use them interchangeably.' },
                { id: 'b', prompt: '"GreenEnergy Ltd." plans to set up a solar plant requiring ₹200 crore. It has ₹80 crore internal accruals.', answer: 'Setting up the solar plant = investment decision (capital budgeting)',
                  options: ['Setting up the solar plant = investment decision (capital budgeting)', 'financing', 'debt is always better', 'wealth maximization = profit maximization'],
                  hint: 'Revisit Class 11 Accountancy node c11_acc_cbse_01_011 (Accounting Equation) and Class 11.',
                  misconception: 'Students believe "wealth maximization = profit maximization" and use them interchangeably.' },
                { id: 'c', prompt: 'Compare the impact on shareholders\' wealth of two scenarios for a firm with ROE = 15% and cost of equity = 12%: Scenario A: Retain 100% earnings, no dividend.', answer: 'Scenario A maximizes wealth',
                  options: ['Scenario A maximizes wealth', 'wealth maximization = profit maximization', 'profit maximization', '"wealth maximization = profit maximization" and use them interchangeably'],
                  hint: 'Revisit Class 11 Accountancy node c11_acc_cbse_01_011 (Accounting Equation) and Class 11.',
                  misconception: 'Students believe "wealth maximization = profit maximization" and use them interchangeably.' }
          ],
            remediations: { 'wealth-maximization-profit-maximization-and': { steps: ['Ask the student to calculate the present value of ₹100 received after 1 year at 10% discount rate (PV = ₹90.91).', 'Show two projects: Project A gives ₹100 profit in Year 1; Project B gives ₹100 profit in Year 5.', 'Explain that wealth maximization uses PV (discounted cash flows), profit maximization does not.', 'Revisit Class 11 Accounting node c11_acc_cbse_08_005 (Net Profit) and Class 12 Math node c12_math_cbse_13_005 (Present.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "wealth maximization = profit maximization" and use them interchangeably.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Financial management is only about raising funds at the lowest cost." Provide a counterexample where lowest-cost funds destroy.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'wealth maximization = profit maximization', 'profit maximization', '"wealth maximization = profit maximization" and use them interchangeably'],
                  hint: 'Revisit Class 11 Accountancy node c11_acc_cbse_01_011 (Accounting Equation) and Class 11.',
                  misconception: 'Students believe "wealth maximization = profit maximization" and use them interchangeably.' },
                { id: 'b', prompt: 'Create a realistic mini-case (3-4 sentences) involving a manufacturing company where the CFO must make a decision that simultaneously involves investment.', answer: 'Example case: "AutoParts Ltd',
                  options: ['Example case: "AutoParts Ltd', 'wealth maximization = profit maximization', 'profit maximization', '"wealth maximization = profit maximization" and use them interchangeably'],
                  hint: 'Revisit Class 11 Accountancy node c11_acc_cbse_01_011 (Accounting Equation) and Class 11.',
                  misconception: 'Students believe "wealth maximization = profit maximization" and use them interchangeably.' }
          ],
            remediations: { 'wealth-maximization-profit-maximization-and': { steps: ['Ask the student to calculate the present value of ₹100 received after 1 year at 10% discount rate (PV = ₹90.91).', 'Show two projects: Project A gives ₹100 profit in Year 1; Project B gives ₹100 profit in Year 5.', 'Explain that wealth maximization uses PV (discounted cash flows), profit maximization does not.', 'Revisit Class 11 Accounting node c11_acc_cbse_08_005 (Net Profit) and Class 12 Math node c12_math_cbse_13_005 (Present.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_002', difficulty: 'standard',
          question: 'Financial decisions are the three core choices a firm makes to allocate scarce.',
          hint: 'If stuck, revisit the distinction between owners\' funds and borrowed funds.',
          misconception: 'Students often think the **Financing Decision** is only about "choosing the cheapest source" (lowest interest rate).',
          parts: [
                { id: 'a', prompt: 'Compare the Investment Decision and the Financing Decision on: (a) focus of analysis, (b) impact on the balance sheet, (c) reversibility.', answer: 'focus of analysis, (',
                  options: ['focus of analysis, (', 'choosing the cheapest source'],
                  hint: 'If stuck, revisit the distinction between owners\' funds and borrowed funds (c11_bs_cbse_08_003) and.',
                  misconception: 'Students often think the **Financing Decision** is only about "choosing the cheapest source" (lowest interest rate).' }
          ],
            remediations: { 'the-financing-decision-is-only': { steps: ['If the student cannot articulate the risk-return trade-off in financing: (1) Revisit the EBIT-EPS table in the textbook.', '(2) Identify the ROI (3/30 = 10%) and compare to cost of debt (10%).', '(3) Conclude that when ROI = cost of debt, EPS is unchanged — the tipping point.', '(4) Then re-read the "Factors Affecting Financing Decisions" list and match each factor to the example.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_003', difficulty: 'standard',
          question: 'Capital Budgeting is the process of evaluating and selecting long-term.',
          hint: 'If stuck on discounting, revisit Class 11 Maths Geometric Progression.',
          misconception: 'Students often believe IRR is always the best measure because "it gives a percentage return which is easy to compare.".',
          parts: [
                { id: 'a', prompt: 'Project A costs ₹20,00,000 and yields cash inflows: Year 1: ₹5,00,000; Year 2: ₹6,00,000; Year 3: ₹7,00,000; Year 4: ₹8,00,000; Year 5: ₹9,00,000.', answer: 'Step 1: PV factors at 10%: Y1=0.909, Y2=0.826, Y3=0.751, Y4=0.683, Y5=0.621',
                  options: ['Step 1: PV factors at 10%: Y1=0.909, Y2=0.826, Y3=0.751, Y4=0.683, Y5=0.621', 'it gives a percentage return'],
                  hint: 'If stuck on discounting, revisit Class 11 Maths Geometric Progression (c11_math_cbse_09_005.',
                  misconception: 'Students often believe IRR is always the best measure because "it gives a percentage return which is easy to compare." They fail to realize.' },
                { id: 'b', prompt: 'Two mutually exclusive projects have the following NPV and IRR: Project X: NPV = ₹12 lakh, IRR = 18% Project Y: NPV = ₹15 lakh, IRR = 16% Cost of capital.', answer: 'Choose Project Y',
                  options: ['Choose Project Y', 'higher IRR is better', 'it gives a percentage return'],
                  hint: 'If stuck on discounting, revisit Class 11 Maths Geometric Progression (c11_math_cbse_09_005.',
                  misconception: 'Students often believe IRR is always the best measure because "it gives a percentage return which is easy to compare." They fail to realize.' }
          ],
            remediations: { 'irr-is-always-the-best': { steps: ['If a student confuses IRR vs NPV for mutually exclusive projects: (1) Revisit the reinvestment rate assumption — draw.', '(2) Solve a side-by-side NPV and IRR calculation for two projects of different scales (e.g., Project A: -100, +120.', 'Show NPV picks B (adds ₹100 value) while IRR picks A (20% vs 10%).', '(3) Re-do Diagnostic Question 4 with this new example.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_004', difficulty: 'standard',
          question: 'Financing decision refers to the process of determining the optimal mix.',
          hint: 'Revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds distinction) and.',
          misconception: 'Students believe "Trading on Equity" simply means "using debt to increase EPS" and therefore always recommend maximum.',
          parts: [
                { id: 'a', prompt: 'A company has ₹20 crore equity share capital and ₹10 crore 12% debentures. What is its debt-equity ratio and debt-to-total-capital ratio?', answer: 'Debt-equity ratio = Debt/Equity = 10/20 = 0.5 or 1:2',
                  options: ['Debt-equity ratio = Debt/Equity = 10/20 = 0.5 or 1:2', 'Trading on Equity', 'using debt to increase EPS'],
                  hint: 'Revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds distinction) and c11_acc_cbse_08_006.',
                  misconception: 'Students believe "Trading on Equity" simply means "using debt to increase EPS" and therefore always recommend maximum possible debt when.' },
                { id: 'b', prompt: '"Debt is always cheaper than equity because interest rates are lower than dividend expectations, so a company should maximize debt in its capital structure.".', answer: 'The statement ignores that increased debt raises financial risk (obligatory',
                  options: ['The statement ignores that increased debt raises financial risk (obligatory', 'Trading on Equity', 'using debt to increase EPS'],
                  hint: 'Revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds distinction) and c11_acc_cbse_08_006.',
                  misconception: 'Students believe "Trading on Equity" simply means "using debt to increase EPS" and therefore always recommend maximum possible debt when.' },
                { id: 'c', prompt: 'Company P has EBIT of ₹80 lakh, total investment ₹10 crore, and is considering two capital structures: (A) Zero debt, 10 lakh shares of ₹10 each; (B) ₹4 crore.', answer: 'ROI = 80,00,000 / 10,00,00,000 = 8%',
                  options: ['ROI = 80,00,000 / 10,00,00,000 = 8%', 'Trading on Equity', 'using debt to increase EPS'],
                  hint: 'Revisit c11_bs_cbse_08_003 (Owners\' Funds vs Borrowed Funds distinction) and c11_acc_cbse_08_006.',
                  misconception: 'Students believe "Trading on Equity" simply means "using debt to increase EPS" and therefore always recommend maximum possible debt when.' }
          ],
            remediations: { 'trading-on-equity-simply-means': { steps: ['If a student exhibits this misconception: Step 1 — Revisit the NCERT Example I and II side-by-side.', 'Calculate ROI for both (13.33% vs 6.67%) and compare to cost of debt (10%).', 'Have the student articulate in their own words: "When ROI > cost of debt, EPS rises with debt; when ROI < cost of debt.', 'Ask: "If EBIT drops by 50%, which structure suffers the largest % drop in EPS?" Step 3 — Introduce the concept of cost.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_005', difficulty: 'standard',
          question: 'The dividend decision is the financial management decision that determines what.',
          hint: 'If stuck, revisit c11_acc_cbse_08_005 (P&L preparation) to recompute PAT correctly, and.',
          misconception: 'Students believe "Higher dividend = Better for shareholders" and "Dividend is paid from profit, so as long as there.',
          parts: [
                { id: 'a', prompt: 'Two companies, A and B, both earn ₹20 crore PAT. Company A operates in a mature FMCG sector with stable demand; Company B is a high-growth tech startup.', answer: 'Company A (mature FMCG): (1) Stability of Earnings',
                  options: ['Company A (mature FMCG): (1) Stability of Earnings', 'Company A is bigger', 'Higher dividend = Better for shareholders', 'Company X earned ₹10 crore profit, so it can declare ₹10 crore dividend'],
                  hint: 'If stuck, revisit c11_acc_cbse_08_005 (P&L preparation) to recompute PAT correctly, and.',
                  misconception: 'Students believe "Higher dividend = Better for shareholders" and "Dividend is paid from profit, so as long as there is profit, dividend can.' },
                { id: 'b', prompt: 'A company reports PAT of ₹30 crore and has ₹5 crore cash balance. It has a loan agreement restricting dividend payout if debt-to-equity exceeds 1.5x.', answer: 'Step 1: Cash Flow Position',
                  options: ['Step 1: Cash Flow Position', 'PAT is ₹30 crore so ₹25 crore is fine', 'Higher dividend = Better for shareholders', 'Company X earned ₹10 crore profit, so it can declare ₹10 crore dividend'],
                  hint: 'If stuck, revisit c11_acc_cbse_08_005 (P&L preparation) to recompute PAT correctly, and.',
                  misconception: 'Students believe "Higher dividend = Better for shareholders" and "Dividend is paid from profit, so as long as there is profit, dividend can.' },
                { id: 'c', prompt: 'Analyse the following statement: "A company should always pay the maximum dividend possible because investors view dividend increases as good news and stock.', answer: 'The statement commits the fallacy of ignoring opportunity cost and tax asymmetry',
                  options: ['The statement commits the fallacy of ignoring opportunity cost and tax asymmetry', 'Higher dividend = Better for shareholders', 'Company X earned ₹10 crore profit, so it can declare ₹10 crore dividend'],
                  hint: 'If stuck, revisit c11_acc_cbse_08_005 (P&L preparation) to recompute PAT correctly, and.',
                  misconception: 'Students believe "Higher dividend = Better for shareholders" and "Dividend is paid from profit, so as long as there is profit, dividend can.' }
          ],
            remediations: { 'higher-dividend-better-for-shareholders': { steps: ['Revisit c11_acc_cbse_08_005 (Profit and Loss Account: Calculation of Net Profit) to distinguish accounting profit.', 'Revisit c11_acc_cbse_07_010 (Reserves: Meaning and Types) to understand "free reserves" vs "capital reserves" — only.', 'Revisit c12_bs_cbse_09_002 (Financial Decisions: Investment, Financing and Dividend) to see the interlinkage: Dividend.', 'Re-attempt Diagnostic Question 3 with a fresh company data set, explicitly checking: (a) Cash balance vs proposed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_006', difficulty: 'standard',
          question: 'Financial Planning is the process of preparing a financial blueprint of.',
          hint: 'Revisit c12_bs_cbse_09_002 (Financial Decisions) and c11_acc_cbse_08_001 (Financial.',
          misconception: 'Students think financial planning = making a budget. They write: "Financial planning is preparing budgets for the.',
          parts: [
                { id: 'a', prompt: 'A company forecasts 20% sales growth next year. Its current fixed assets are ₹100 crore, current assets ₹40 crore, and current liabilities ₹15 crore.', answer: 'Step 1: Projected sales = ₹200 crore × 1.20 = ₹240 crore',
                  options: ['Step 1: Projected sales = ₹200 crore × 1.20 = ₹240 crore', 'Confusing the two loses 1-2 marks in board', 'financial planning = making a budget'],
                  hint: 'Revisit c12_bs_cbse_09_002 (Financial Decisions) and c11_acc_cbse_08_001 (Financial Statements).',
                  misconception: 'Students think financial planning = making a budget. They write: "Financial planning is preparing budgets for the year." This is wrong.' }
          ],
            remediations: { 'financial-planning-making-a-budget': { steps: ['Ask them to read the NCERT lines: "Typically, financial planning is done for three to five years...', 'Give a concrete example: "A company deciding to build a ₹500 crore plant over 4 years — is that a budget?', 'Re-do Diagnostic Question 6 but for a 4-year college education fund — force them to separate the 4-year plan (financial.', 'Re-attempt Diagnostic Question 2 (True/False) and Question 4 (HUL vs startup) to verify the distinction is internalised.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
